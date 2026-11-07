import { describe, expect, it } from 'vitest';
import { Course } from '../src/track/track';
import { MATERIALS } from '../src/physics/materials';
import { INSANE_TUNING } from '../src/physics/ball';
import { Run } from '../src/game/run';
import { ProPilot } from '../src/game/proPilot';
import { CATALOG } from '../src/commerce/catalog';
import { SKY } from '../src/courses/skyLines';

/** Ride a world with the Auto Ball; which gutters did it ride? */
function ride(id: string, pace: number, insane: boolean) {
  const c = CATALOG.find((x) => x.id === id)!;
  const course = new Course(c.layout());
  const run = new Run(course, MATERIALS[c.materialId], insane ? INSANE_TUNING : {});
  const pp = new ProPilot(); pp.pace = pace; pp.insane = insane;
  run.launch(); run.ball.v.addScaledVector(run.ball.proj.T, 20);
  const rode = new Set<string>();
  for (let f = 0; f < 60 * 300 && run.phase !== 'finished'; f++) {
    const f0 = run.falls;
    run.update(1 / 60, pp.decide(run.ball, 1 / 60));
    if (run.falls > f0) pp.crashed(run.ball);
    run.pendingEvents.length = 0;
    if (run.ball.contact) rode.add(run.ball.track.layout.id);
  }
  return { run, rode };
}

describe('SKY LINES', () => {
  it('every sky line closes back onto its main course', () => {
    for (const [wid, defs] of Object.entries(SKY)) {
      const c = CATALOG.find((x) => x.id === wid)!;
      const course = new Course(c.layout());
      for (const d of defs) expect(course.branches.some((b) => b.layout.id === d.id)).toBe(true);
      // (sky lines are added last, so theirs are the last closing errors)
      for (const e of course.rejoinError.slice(-defs.length)) expect(e).toBeLessThan(6);
    }
  });
  for (const [wid, defs] of Object.entries(SKY)) {
    it(`${wid}: a ripping ball flies into ${defs.map((d) => d.name).join(', ')} and finishes; a chill one stays below`, () => {
      const fast = ride(wid, 1, true);
      expect(fast.run.phase).toBe('finished');
      for (const d of defs) expect(fast.rode.has(d.id)).toBe(true);
      const calm = ride(wid, 0, false);
      expect(calm.run.phase).toBe('finished');
      expect(calm.run.falls).toBe(0);
    }, 120000);
  }
});
