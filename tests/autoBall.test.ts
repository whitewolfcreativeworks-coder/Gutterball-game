import { describe, expect, it } from 'vitest';
import { Course } from '../src/track/track';
import { MATERIALS } from '../src/physics/materials';
import { BallPhysics } from '../src/physics/ball';
import { Run } from '../src/game/run';
import { Autopilot } from '../src/game/autopilot';
import { ProPilot } from '../src/game/proPilot';
import { CATALOG } from '../src/commerce/catalog';

function ride(id: string, pro: boolean) {
  const c = CATALOG.find((x) => x.id === id)!;
  const course = new Course(c.layout());
  const run = new Run(course, MATERIALS[c.materialId]);
  const ap = new Autopilot(course.main), pp = new ProPilot();
  run.launch();
  run.ball.v.addScaledVector(run.ball.proj.T, 20);
  let boosts = 0, turbos = 0;
  for (let f = 0; f < 60 * 300 && run.phase !== 'finished'; f++) {
    const f0 = run.falls;
    run.update(1 / 60, pro ? pp.decide(run.ball, 1 / 60) : ap.decide(run.ball));
    if (run.falls > f0) pp.crashed(run.ball);
    for (const e of run.pendingEvents) { if (e.type === 'HOLO_BOOST') boosts++; if (e.type === 'TURBO_START') turbos++; }
    run.pendingEvents.length = 0;
  }
  return { run, boosts, turbos };
}

describe('AUTO BALL (the pro driver)', () => {
  let totalBoosts = 0, totalTurbos = 0;
  for (const c of CATALOG) {
    it(`${c.world}: a pro run reaches the finish, faster than the basic autopilot`, () => {
      const pro = ride(c.id, true), basic = ride(c.id, false);
      expect(pro.run.phase).toBe('finished');
      expect(pro.run.falls).toBeLessThanOrEqual(2);
      expect(pro.run.finishTime).toBeLessThan(basic.run.finishTime);
      totalBoosts += pro.boosts; totalTurbos += pro.turbos;
    }, 120000);
  }
  it('across the worlds it hits pads (hologram boosts) and fires turbo', () => {
    expect(totalBoosts).toBeGreaterThan(10);
    expect(totalTurbos).toBeGreaterThan(3);
  });

  it('the look-ahead never changes the course', () => {
    const c = CATALOG.find((x) => x.id === 'wood')!;
    const course = new Course(c.layout());
    const run = new Run(course, MATERIALS.wood);
    run.launch();
    const tr = course.main;
    // just before the first pad, aimed at it
    run.ball.placeAt(tr.pads[0].s - 30, 30);
    const before = { ghost: tr.ghost.join(), hit: tr.padHit.join(), used: tr.holoUsed.join() };
    const times = course.all.map((t) => t.time);
    const pb = new BallPhysics(course, MATERIALS.wood, run.ball.tune);
    pb.copyStateFrom(run.ball);
    pb.predict = true;
    expect(pb.p.distanceTo(run.ball.p)).toBe(0);
    expect(pb.v.distanceTo(run.ball.v)).toBe(0);
    const pilot = new ProPilot();
    for (let k = 0; k < 300; k++) { pb.step(1 / 75, pilot.decide(pb, 1 / 75)); pb.events.length = 0; }
    course.all.forEach((t, i) => { t.time = times[i]; });
    expect(pb.proj.s).toBeGreaterThan(tr.pads[0].s);
    expect(tr.ghost.join()).toBe(before.ghost);
    expect(tr.padHit.join()).toBe(before.hit);
    expect(tr.holoUsed.join()).toBe(before.used);
  });

  it('a copied ball follows the same path as the real one (the line is honest)', () => {
    const c = CATALOG.find((x) => x.id === 'concrete')!;
    const course = new Course(c.layout());
    const a = new BallPhysics(course, MATERIALS.concrete);
    a.placeAt(300, 28, 1.5);
    for (let k = 0; k < 120; k++) a.step(1 / 240, { steer: 0.3, magnet: false, jump: false, driveLevel: 1 });
    const b = new BallPhysics(course, MATERIALS.concrete);
    b.copyStateFrom(a);
    const t0 = course.all.map((t) => t.time);
    for (let k = 0; k < 480; k++) a.step(1 / 240, { steer: -0.2, magnet: false, jump: false, driveLevel: 1 });
    course.all.forEach((t, i) => { t.time = t0[i]; });
    for (let k = 0; k < 480; k++) b.step(1 / 240, { steer: -0.2, magnet: false, jump: false, driveLevel: 1 });
    expect(b.p.distanceTo(a.p)).toBeLessThan(1e-6);
  });
});
