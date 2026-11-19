/**
 * TILT LAB: how does the ball answer a tilt? On straight open stretches, roll
 * at a few speeds, hold a full tilt for 1.2 s, then let go for 3 s. Records:
 *  up     - how far up the wall it went (m above the floor)
 *  reach  - how far across (share of the half-width)
 *  t50    - seconds from the tilt until it was halfway across
 *  swings - times it crossed the middle after you let go
 *  settle - seconds after letting go until it sat in the middle (< 0.6 m, < 1 m/s sideways)
 *  hops   - times it left the surface for > 0.08 s
 * Writes TILT_LAB_OUT (default tilt-lab.json).
 */
import { it } from 'vitest';
import { writeFileSync } from 'node:fs';
import { Course } from '../src/track/track';
import { MATERIALS } from '../src/physics/materials';
import { Run } from '../src/game/run';
import { CATALOG } from '../src/commerce/catalog';

const WORLDS = (process.env.TILT_WORLDS ?? 'wood,rubber,ice,concrete').split(',');
/** The first plain open stretch after 300 m: no pipe, roof, gap or obstacle, nearly level across, for 170 m. */
function plainSpot(course: Course): number {
  const tr = course.main;
  const U = new (require('three').Vector3)(), P = U.clone(), T = U.clone(), R = U.clone();
  const ok = (s: number) => { tr.frameAtS(s, P, T, U, R); return tr.tubeAt(s) === 0 && !tr.isTunnel(s) && !tr.isGap(s) && U.y > 0.93 && Math.abs(R.y) < 0.12 && !tr.obstacles.some((o) => Math.abs(o.s - s) < 4); };
  for (let s = 300; s < tr.length - 200; s += 10) { let good = true; for (let d = 0; d <= 170 && good; d += 5) good = ok(s + d); if (good) return s; }
  return 300;
}

it('tilt lab', () => {
  const out: Record<string, unknown> = {};
  for (const id of WORLDS) for (const v0 of [12, 30, 55]) {
    const c = CATALOG.find((x) => x.id === id)!;
    const course = new Course(c.layout());
    const at = plainSpot(course);
    const run = new Run(course, MATERIALS[c.materialId], JSON.parse(process.env.TILT_TUNE ?? '{}'));
    run.launch(); run.ball.placeAt(at, v0);
    const b = run.ball;
    const W = course.main.halfWidthAt(at);
    let up = 0, reach = 0, t50 = -1, swings = 0, settle = -1, hops = 0, air = 0, lastSide = 0;
    const T0 = 0.5, T1 = 1.7, T2 = 4.7;
    for (let f = 0; f < 60 * T2; f++) {
      const t = f / 60;
      // hold the speed roughly steady so every run is comparable
      const vf = b.v.dot(b.proj.T); if (vf < v0 * 0.9 || vf > v0 * 1.1) b.v.addScaledVector(b.proj.T, (v0 - vf) * 0.05);
      run.update(1 / 60, { steer: t >= T0 && t < T1 ? 1 : 0, magnet: false, jump: false, driveLevel: 0 } as any);
      run.pendingEvents.length = 0;
      const x = b.proj.x, y = b.proj.y;
      if (t >= T0) { up = Math.max(up, y - 1.15); reach = Math.max(reach, Math.abs(x) / W); if (t50 < 0 && Math.abs(x) > W * 0.5) t50 = t - T0; }
      if (b.sinceContact > 0.02) air += 1 / 60; else { if (air > 0.08) hops++; air = 0; }
      if (t >= T1) {
        const side = Math.sign(x);
        if (lastSide && side && side !== lastSide) swings++;
        if (side) lastSide = side;
        const vlat = Math.abs(b.v.dot(b.proj.R));
        if (Math.abs(x) < 0.6 && vlat < 1) { if (settle < 0) settle = t - T1; } else settle = -1;
      }
    }
    out[`${id}@${v0}`] = { at: Math.round(at), up: +up.toFixed(1), reach: +reach.toFixed(2), t50: +t50.toFixed(2), swings, settle: +settle.toFixed(2), hops };
  }
  writeFileSync(process.env.TILT_LAB_OUT ?? 'tilt-lab.json', JSON.stringify(out, null, 1));
}, 600000);
