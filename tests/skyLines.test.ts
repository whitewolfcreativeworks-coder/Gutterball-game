import { describe, expect, it } from 'vitest';
import { Course } from '../src/track/track';
import { MATERIALS } from '../src/physics/materials';
import { BallPhysics } from '../src/physics/ball';
import { Run } from '../src/game/run';
import { ProPilot } from '../src/game/proPilot';
import { CATALOG } from '../src/commerce/catalog';
import { SKY } from '../src/courses/skyLines';

describe('SKY LINES (rolled into, never flown into)', () => {
  it('every sky line forks off the main course and closes back onto it', () => {
    for (const [wid, defs] of Object.entries(SKY)) {
      const c = CATALOG.find((x) => x.id === wid)!;
      const course = new Course(c.layout());
      for (const d of defs) { expect(d.fork, `${d.id} has a ramp`).toBeTruthy(); expect(course.branches.some((b) => b.layout.id === d.id)).toBe(true); }
      // (sky lines are added last, so theirs are the last closing errors)
      for (const e of course.rejoinError.slice(-defs.length)) expect(e).toBeLessThan(6);
    }
  });
  for (const [wid, defs] of Object.entries(SKY)) for (const d of defs) {
    it(`${wid}: keep ${d.fork! > 0 ? 'left' : 'right'} at the fork and you roll up into ${d.name} and back onto the main course`, () => {
      const c = CATALOG.find((x) => x.id === wid)!;
      const course = new Course(c.layout());
      const at = course.main.segmentStarts.find((g) => g.label === d.at)!.s + d.s;
      const b = new BallPhysics(course, MATERIALS[c.materialId]);
      b.placeAt(at - 60, 40);
      const SKYI = course.all.findIndex((t) => t.layout.id === d.id);
      let rode = 0, back = false;
      for (let i = 0; i < 240 * 40 && !back; i++) {
        // hug the fork side until on the sky line, then ride its middle
        const want = b.activeIndex === SKYI ? 0 : -d.fork! * (b.track.halfWidthAt(b.proj.s) - 1.5);
        const steer = Math.max(-1, Math.min(1, (want - b.proj.x) * 0.5 - b.v.dot(b.proj.R) * 0.3));
        b.step(1 / 240, { steer, magnet: b.track.isSteepOrInverted(b.proj.s), jump: false, driveLevel: 2 }); b.events.length = 0;
        if (b.activeIndex === SKYI && b.contact) rode += 1 / 240;
        if (rode > 3 && b.activeIndex === 0 && b.contact) back = true;
      }
      expect(rode).toBeGreaterThan(3);
      expect(back).toBe(true);
    }, 60000);
  }
  it('the Auto Ball still finishes every world with sky lines', () => {
    for (const wid of Object.keys(SKY)) for (const pace of [0, 1]) {
      const c = CATALOG.find((x) => x.id === wid)!;
      const run = new Run(new Course(c.layout()), MATERIALS[c.materialId]);
      const pp = new ProPilot(); pp.pace = pace;
      run.launch(); run.ball.v.addScaledVector(run.ball.proj.T, 20);
      for (let f = 0; f < 60 * 300 && run.phase !== 'finished'; f++) { const f0 = run.falls; run.update(1 / 60, pp.decide(run.ball, 1 / 60)); if (run.falls > f0) pp.crashed(run.ball); run.pendingEvents.length = 0; }
      expect(run.phase).toBe('finished');
    }
  }, 120000);
});
