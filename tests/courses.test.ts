import { describe, expect, it } from 'vitest';
import { Course, Track } from '../src/track/track';
import { BallPhysics } from '../src/physics/ball';
import { MATERIALS } from '../src/physics/materials';
import { Run } from '../src/game/run';
import { Autopilot } from '../src/game/autopilot';
import { CATALOG } from '../src/commerce/catalog';

/**
 * Course validation: every course in the catalog must be completable by the
 * autopilot (which only uses player inputs) within a time limit.
 */
describe('courses are completable', () => {
  for (const c of CATALOG) {
    it(`${c.world}: ${c.name}`, () => {
      const tr = new Track(c.layout());
      const run = new Run(tr, MATERIALS[c.materialId]);
      const ap = new Autopilot(tr);
      run.launch();
      for (let f = 0; f < 60 * 300 && run.phase !== 'finished'; f++) {
        run.update(1 / 60, ap.decide(run.ball));
        run.pendingEvents.length = 0;
      }
      expect(run.phase).toBe('finished');
      expect(run.falls).toBeLessThanOrEqual(2);
      if (c.id === 'wood') expect(run.falls).toBe(0);
    });
  }
});

describe('the ball cannot leave the gutter (except by falling into a gap)', () => {
  const wood = CATALOG.find((c) => c.id === 'wood')!;
  for (const steer of [-1, 0, 1]) {
    it(`steering held at ${steer} through Timberline Run`, () => {
      const tr = new Track(wood.layout());
      const run = new Run(tr, MATERIALS.wood);
      const ap = new Autopilot(tr);
      run.launch();
      const W = tr.profile.a + tr.profile.rc;
      const nearGap = (s: number) => { for (let d = -60; d <= 10; d += 2) if (tr.isGap(s + d)) return true; return false; };
      let escapes = 0;
      for (let f = 0; f < 60 * 150 && run.phase !== 'finished'; f++) {
        const a = ap.decide(run.ball);
        run.update(1 / 60, { ...a, steer });
        run.pendingEvents.length = 0;
        const pr = run.ball.proj;
        // escaping = beside the gutter at or above floor level (a ball that fell through a gap is below it)
        // (flying above the containment ceiling after a big jump is allowed: that's the beam-rescue mechanic)
        if (run.phase === 'running' && !nearGap(pr.s) && pr.y > 0 && pr.y < tr.profile.H + 2.6 && Math.abs(pr.x) > W + 0.05) escapes++;
      }
      expect(escapes).toBe(0);
    });
  }
});

describe('High Road branch (Timberline Run)', () => {
  const lay = CATALOG.find((c) => c.id === 'wood')!.layout();
  const attempt = (v0: number, jumps: number) => {
    const course = new Course(lay);
    const kick = course.main.segmentStarts.find((g) => g.label === 'highKicker')!.s;
    const b = new BallPhysics(course, MATERIALS.wood);
    const HR = course.all.findIndex((t) => t.layout.id === 'highroad');
    b.placeAt(kick - 40, v0);
    let jumped = false, t2 = -1, topT = 0, backOnMain = false, rode = false;
    for (let i = 0; i < 240 * 30; i++) {
      let jump = false;
      if (jumps > 0 && !jumped && b.activeIndex === 0 && b.mainProj.s > kick + 14) { jump = true; jumped = true; if (jumps > 1) t2 = i + 60; }
      if (i === t2) jump = true;
      const steer = Math.max(-1, Math.min(1, -b.proj.x * 0.5 - b.v.dot(b.proj.R) * 0.3));
      b.step(1 / 240, { steer, magnet: false, jump, driveLevel: 1 }); b.events.length = 0;
      if (b.activeIndex === HR && b.contact && b.proj.y > 0 && b.proj.y < 3) topT += 1 / 240;
      if (topT > 4) rode = true;
      if (rode && b.activeIndex === 0 && b.contact && b.mainProj.y < 3) { backOnMain = true; break; }
    }
    return { rode, backOnMain, brS: +b.projs[HR].s.toFixed(0), act: b.activeIndex, mainS: +b.mainProj.s.toFixed(0), mainY: +b.mainProj.y.toFixed(1) };
  };
  it('without a jump you stay on the main gutter', () => { expect(attempt(26, 0).rode).toBe(false); });
  it('a single jump is not enough', () => { expect(attempt(26, 1).rode).toBe(false); });
  it('a double jump off the ramp reaches the High Road, which drops you back into the main gutter', () => {
    for (const v0 of [22, 32]) { const r = attempt(v0, 2); expect(r.rode).toBe(true); expect(r.backOnMain).toBe(true); }
  });
});

describe('The Burrow: full tube with a split (Timberline Run)', () => {
  const lay = CATALOG.find((c) => c.id === 'wood')!.layout();
  const course = new Course(lay);
  const at = (label: string) => course.main.segmentStarts.find((g) => g.label === label)!.s;
  const SKY = course.all.findIndex((t) => t.layout.id === 'skylight');
  const ride = (from: number, v0: number, ctl: (b: BallPhysics, t: number) => { steer: number; magnet?: boolean }, until: (b: BallPhysics) => boolean, secs = 40) => {
    const b = new BallPhysics(course, MATERIALS.wood);
    b.placeAt(from, v0);
    let minDepth = 1e9, maxY = -1e9, skyMax = -1, t = 0;
    for (let i = 0; i < 240 * secs; i++) {
      t = i / 240;
      const c = ctl(b, t);
      b.step(1 / 240, { steer: c.steer, magnet: !!c.magnet, jump: false, driveLevel: 1 }); b.events.length = 0;
      // deepest inside any hollow (at a junction the two pipes' hollows are one)
      let dep = -1e9;
      for (let k = 0; k < b.tracks.length; k++) { const p = b.projs[k]; p.project(b.p.x, b.p.y, b.p.z); if (Math.abs(p.along) < 3) dep = Math.max(dep, b.tracks[k].channelDepthLocal(p.s, p.x, p.y)); }
      minDepth = Math.min(minDepth, dep);
      maxY = Math.max(maxY, b.proj.y);
      // (the two pipes share a hollow for 50 m at each end; count only the separate middle)
      if (b.activeIndex === SKY && b.proj.s < course.all[SKY].length - 55) skyMax = Math.max(skyMax, b.proj.s);
      if (until(b)) return { done: true, minDepth, maxY, skyMax, b, t };
    }
    return { done: false, minDepth, maxY, skyMax, b, t };
  };
  const follow = (target: number) => (b: BallPhysics) => ({ steer: Math.max(-1, Math.min(1, (target - b.proj.x) * 0.5 - b.v.dot(b.proj.R) * 0.3)) });

  it('the gutter curls into a closed pipe and opens again', () => {
    expect(course.main.tubeAt(at('burrowIn'))).toBe(0);
    expect(course.main.tubeAt(at('darkLine') + 20)).toBe(1);
    expect(course.main.tubeAt(at('burrowOut') + 30)).toBe(0);
  });

  it('rolls straight through the dark pipe and comes out the far end', () => {
    const r = ride(at('burrowIn') - 20, 24, follow(-2.5), (b) => b.activeIndex === 0 && b.mainProj.s > at('burrowOut') + 30);
    expect(r.done).toBe(true);
    expect(r.minDepth).toBeGreaterThan(0.5);   // never left the hollow
    expect(r.skyMax).toBeLessThan(60);         // stayed on the dark line
  });

  it('steering hard rolls you up the wall and over the roof of the pipe', () => {
    const r = ride(at('burrow') + 5, 24, () => ({ steer: 1, magnet: true }), () => false, 3);
    expect(r.maxY).toBeGreaterThan(9);         // the roof is ~13 m up
    expect(r.minDepth).toBeGreaterThan(0.5);
  });

  it('breaking right at the split takes the Skylight, which merges back into the pipe', () => {
    // a player breaking right: hold full right through the split (you ride up
    // the right wall and over the divider), then steer for the middle of the Skylight
    const toSky = (b: BallPhysics) => {
      const p = b.projs[SKY];
      if (p.s > -25 && p.s < 75 && Math.abs(p.along) < 3) return { steer: 1 };
      if (p.s >= 75 && p.s < 140 && Math.abs(p.along) < 3) return { steer: Math.max(-1, Math.min(1, -p.x * 0.6 - b.v.dot(p.R) * 0.35)) };
      return follow(0)(b);
    };
    const r = ride(at('burrowSplit') - 25, 24, toSky,
      (b) => b.activeIndex === 0 && b.mainProj.s > at('burrowOut') + 30);
    expect(r.skyMax).toBeGreaterThan(200);     // rode the Skylight's separate middle section
    expect(r.done).toBe(true);
    expect(r.minDepth).toBeGreaterThan(0.5);
  });
});
