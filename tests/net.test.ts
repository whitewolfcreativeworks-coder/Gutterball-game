import { describe, expect, it } from 'vitest';
import { Vector3 } from 'three';
import { Course } from '../src/track/track';
import { BallPhysics } from '../src/physics/ball';
import { MATERIALS } from '../src/physics/materials';
import { Run } from '../src/game/run';
import { CATALOG } from '../src/commerce/catalog';

const NONE = { steer: 0, magnet: false, jump: false, driveLevel: 1 } as any;
const cover: Record<string, number> = {};

describe('the safety net', () => {
  it('runs under much of every course', () => {
    for (const c of CATALOG) {
      const t = new Course(c.layout()).main;
      let on = 0; for (let i = 0; i < t.n; i++) on += t.netOn[i];
      cover[c.id] = on / t.n;
      expect(cover[c.id], c.id).toBeGreaterThan(0.25);
    }
  });

  function drop(id: string, from: 'side' | 'under', frac: number) {
    const c = CATALOG.find((x) => x.id === id)!;
    const course = new Course(c.layout());
    const tr = course.main;
    // a netted spot well inside a netted stretch
    let s = 0;
    for (let i = Math.floor(tr.n * frac); i < tr.n - 200; i++) {
      let ok = true; for (let j = i - 60; j < i + 200; j++) if (!tr.netOn[j]) { ok = false; break; }
      if (ok) { s = i * tr.ds; break; }
    }
    expect(s, `${id} netted spot`).toBeGreaterThan(0);
    const b = new BallPhysics(course, MATERIALS[c.materialId]);
    b.placeAt(s, 0);
    const P = new Vector3(), T = new Vector3(), U = new Vector3(), R = new Vector3();
    tr.frameAtS(s, P, T, U, R);
    const W = tr.halfWidthAt(s);
    if (from === 'side') b.p.copy(P).addScaledVector(R, W + 5).addScaledVector(U, 2);
    else b.p.copy(P).addScaledVector(U, -3);
    b.v.copy(T).multiplyScalar(18);
    const evs = new Set<string>();
    let back = false;
    for (let i = 0; i < 240 * 7 && !back; i++) {
      b.step(1 / 240, NONE); for (const e of b.events) evs.add(e.type); b.events.length = 0;
      back = !b.netLift && evs.has('NET_CATCH') && b.contact && b.proj.y > 0 && Math.abs(b.proj.x) < W && b.track === tr;
    }
    return { back, evs, s, b };
  }

  for (const id of ['wood', 'concrete', 'ice', 'snow'])
    for (const from of ['side', 'under'] as const)
      it(`${id}: fall off ${from === 'side' ? 'the side' : 'through the floor'}, land in the net, get lifted back into the gutter`, () => {
        const r = drop(id, from, 0.3);
        expect(r.evs.has('NET_CATCH')).toBe(true);
        expect(r.back).toBe(true);
        expect(r.b.proj.s).toBeGreaterThan(r.s + 10);
      });

  it('falling into the net is not a fall: the run just carries on', () => {
    const c = CATALOG.find((x) => x.id === 'wood')!;
    const course = new Course(c.layout());
    const run = new Run(course, MATERIALS.wood);
    run.launch();
    const tr = course.main;
    let s = 0; for (let i = Math.floor(tr.n * 0.4); i < tr.n; i++) if (tr.netOn[i] && tr.netOn[i + 200] && tr.netOn[i - 40]) { s = i * tr.ds; break; }
    run.ball.placeAt(s, 0);
    const P = new Vector3(), T = new Vector3(), U = new Vector3(), R = new Vector3();
    tr.frameAtS(s, P, T, U, R);
    run.ball.p.copy(P).addScaledVector(R, -(tr.halfWidthAt(s) + 6)).addScaledVector(U, 1);
    run.ball.v.copy(T).multiplyScalar(20);
    for (let f = 0; f < 60 * 6; f++) { run.update(1 / 60, NONE); run.pendingEvents.length = 0; }
    expect(run.falls).toBe(0);
    expect(run.ball.proj.y).toBeGreaterThan(0);
  });
});
