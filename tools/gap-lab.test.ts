/**
 * GAP LAB: can a ball make every designed jump without the beam?
 * For each gap on each course's main line, launch the ball 45 m before the gap
 * at a range of speeds, centred, hands off (no beam), and record whether it
 * lands on the far side. Writes GAP_LAB_OUT (default gap-lab.json).
 */
import { it } from 'vitest';
import { writeFileSync } from 'node:fs';
import { Course } from '../src/track/track';
import { MATERIALS } from '../src/physics/materials';
import { Run } from '../src/game/run';
import { CATALOG } from '../src/commerce/catalog';

const SPEEDS = (process.env.GAP_SPEEDS ?? '14,20,26,32,40,50,60').split(',').map(Number);

it('gap lab', () => {
  const out: Record<string, Record<string, string>> = {};
  for (const c of CATALOG) {
    const geo = new Course(c.layout());
    geo.all.forEach((tr, ti) => {
    const gaps: [number, number][] = [];
    let st = -1;
    for (let i = 0; i <= tr.n; i++) { const g = i < tr.n && tr.gap[i] === 1; if (g && st < 0) st = i; if (!g && st >= 0) { gaps.push([st * tr.ds, i * tr.ds]); st = -1; } }
    for (const [g0, g1] of gaps) {
      const row: Record<string, string> = {};
      for (const v0 of SPEEDS) for (const jumper of [false, true]) {
        const run = new Run(geo, (MATERIALS as any)[c.materialId]);
        run.launch();
        run.ball.placeAt(g0 - 45, v0, 0, ti);
        let jumped = false;
        let res = 'timeout', maxY = 0;
        for (let f = 0; f < 60 * 8; f++) {
          const jumpNow = jumper && !jumped && run.ball.track === tr && run.ball.proj.s > g0 - 3;
          if (jumpNow) jumped = true;
          run.update(1 / 60, { steer: 0, magnet: false, jump: jumpNow, driveLevel: 1 } as any);
          const b = run.ball;
          if (b.track === tr) maxY = Math.max(maxY, b.proj.y);
          if (run.falls > 0 || (b as any).recalling) { res = 'FAIL'; break; }
          if (b.track === tr && b.proj.s > g1 + 8 && b.sinceContact < 0.05) { res = 'ok'; break; }
        }
        row[v0 + (jumper ? 'J' : '')] = res + ` peak${maxY.toFixed(1)}`;
      }
      out[`${c.id}${ti ? '/b' + ti : ''}@${Math.round(g0)} len${Math.round(g1 - g0)}`] = row;
    }
    });
  }
  writeFileSync(process.env.GAP_LAB_OUT ?? 'gap-lab.json', JSON.stringify(out, null, 1));
}, 600000);
