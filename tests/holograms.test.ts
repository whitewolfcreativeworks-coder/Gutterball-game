import { describe, expect, it } from 'vitest';
import { Vector3 } from 'three';
import { Course } from '../src/track/track';
import { BallPhysics } from '../src/physics/ball';
import { MATERIALS } from '../src/physics/materials';
import { Run } from '../src/game/run';
import { CATALOG } from '../src/commerce/catalog';

const IN = { steer: 0, magnet: false, jump: false, driveLevel: 0 } as any;
const wood = CATALOG.find((c) => c.id === 'wood')!;

describe('trigger pads and hologram obstacles', () => {
  it('every world has trigger pads ahead of its obstacle stretches', () => {
    for (const c of CATALOG) {
      const course = new Course(c.layout());
      const pads = course.all.reduce((a, t) => a + t.pads.length, 0);
      const obs = course.all.reduce((a, t) => a + t.obstacles.length, 0);
      if (obs > 0) expect(pads, c.id).toBeGreaterThan(0);
      for (const t of course.all) for (const p of t.pads) {
        expect(p.obs.length).toBeGreaterThan(0);
        const firstOb = Math.min(...p.obs.map((o) => t.obstacles[o].s));
        expect(firstOb - p.s).toBeGreaterThanOrEqual(20);
        expect(p.y).toBeGreaterThan(t.profile.rc); // high on the vertical part of the wall
      }
    }
  });

  function rideOverPad(course: Course, removePad: boolean) {
    const tr = course.main;
    const pd = tr.pads[0];
    if (removePad) (tr.pads as any[]).length = 0;
    const b = new BallPhysics(course, MATERIALS.wood);
    b.placeAt(pd.s - 8, 0);
    const P = new Vector3(), T = new Vector3(), U = new Vector3(), R = new Vector3();
    tr.frameAtS(pd.s - 8, P, T, U, R);
    b.p.copy(P).addScaledVector(R, pd.side * (tr.halfWidthAt(pd.s - 8) - b.tune.radius - 0.01)).addScaledVector(U, pd.y);
    b.v.copy(T).multiplyScalar(30);
    const evs: string[] = [];
    for (let i = 0; i < 240 * 0.6; i++) { b.step(1 / 240, IN); for (const e of b.events) evs.push(e.type); b.events.length = 0; }
    return { b, evs, tr };
  }

  it('rolling over a pad lights it and turns the next obstacles into holograms, with no physical effect', () => {
    const a = rideOverPad(new Course(wood.layout()), false);
    expect(a.evs).toContain('TRIGGER_PAD');
    expect(a.tr.padHit[0]).toBe(1);
    for (const o of a.tr.pads[0].obs) expect(a.tr.ghost[o]).toBe(1);
    const c = rideOverPad(new Course(wood.layout()), true);
    // identical motion with and without the pad: it never bumps or drags you
    expect(a.b.p.distanceTo(c.b.p)).toBeLessThan(1e-9);
    expect(a.b.v.distanceTo(c.b.v)).toBeLessThan(1e-9);
  });

  function hitObstacle(ghost: boolean) {
    const course = new Course(wood.layout());
    const tr = course.main;
    const k = tr.obstacles.findIndex((o) => o.y === 0 && o.h > 1 && !tr.isSteepOrInverted(o.s) && !tr.isTube(o.s) && (!o.move || Math.abs(o.move.amp) < 1));
    const ob = tr.obstacles[k];
    if (ghost) tr.ghost[k] = 1;
    const b = new BallPhysics(course, MATERIALS.wood);
    b.placeAt(ob.s - ob.ls / 2 - 5, 25, tr.obstacleX(ob));
    const evs: { type: string; source?: string }[] = [];
    for (let i = 0; i < 240 * 0.6; i++) { b.step(1 / 240, IN); evs.push(...b.events); b.events.length = 0; }
    return { b, evs, tr, k, ob };
  }

  it('a solid obstacle stops you; its hologram lets you through with a speed boost', () => {
    const solid = hitObstacle(false);
    expect(solid.evs.some((e) => e.type === 'COLLISION_IMPACT' && e.source === 'obstacle')).toBe(true);
    const holo = hitObstacle(true);
    expect(holo.evs.some((e) => e.type === 'COLLISION_IMPACT' && e.source === 'obstacle')).toBe(false);
    expect(holo.evs.some((e) => e.type === 'HOLO_BOOST')).toBe(true);
    expect(holo.tr.holoUsed[holo.k]).toBe(1);
    expect(holo.b.turboTime).toBeGreaterThan(0);
    expect(holo.b.proj.s).toBeGreaterThan(holo.ob.s + holo.ob.ls);
    expect(holo.b.proj.s).toBeGreaterThan(solid.b.proj.s + 3);
  });

  it('a new run brings the obstacles back solid', () => {
    const course = new Course(wood.layout());
    const run = new Run(course.main, MATERIALS.wood);
    const tr = run.course.main;
    tr.triggerPad(0);
    expect(tr.ghost.some((g) => g === 1)).toBe(true);
    run.reset();
    expect(tr.ghost.every((g) => g === 0)).toBe(true);
    expect(tr.padHit.every((g) => g === 0)).toBe(true);
  });
});
