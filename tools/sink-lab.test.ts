/**
 * SINK LAB: where does a course eat the ball's momentum? Rides each world on
 * AUTO (chill and rip) and records, every 5 m of the main course, the speed,
 * how far up the wall the ball is, and which layout segment it's on, with
 * that segment's shape. Writes SINK_LAB_OUT (JSON) for analysis.
 */
import { it } from 'vitest';
import { writeFileSync } from 'node:fs';
import { Course } from '../src/track/track';
import { MATERIALS } from '../src/physics/materials';
import { INSANE_TUNING } from '../src/physics/ball';
import { Run } from '../src/game/run';
import { ProPilot } from '../src/game/proPilot';
import { CATALOG } from '../src/commerce/catalog';

const WORLDS = process.env.SINK_WORLDS?.split(',');
const MODES = (process.env.SINK_MODES ?? 'chill,rip').split(',');
const PACE: Record<string, [number, boolean]> = { chill: [0, false], middle: [0.5, false], rip: [1, false], insane: [1, true] };

it('sink lab', () => {
  const out: Record<string, unknown> = {};
  for (const c of CATALOG) {
    if (WORLDS && !WORLDS.includes(c.id)) continue;
    const course = new Course(c.layout());
    const tr = course.main;
    const segs = tr.layout.segments.map((g, k) => ({ k, s: Math.round(tr.segmentStarts[k].s), label: g.label, len: g.len, pitch: g.pitch, yaw: g.yaw, bank: g.bank, tube: g.tube, gap: g.gap, loop: g.loop, roll: g.roll, lift: g.lift, wall: g.wall }));
    const res: Record<string, unknown> = { segs };
    for (const m of MODES) {
      const [pace, insane] = PACE[m];
      const run = new Run(new Course(c.layout()), MATERIALS[c.materialId], insane ? INSANE_TUNING : {});
      const pp = new ProPilot(); pp.pace = pace; pp.insane = insane;
      run.launch(); run.ball.v.addScaledVector(run.ball.proj.T, 20);
      const b = run.ball;
      const line: (number[] | null)[] = [];
      for (let f = 0; f < 60 * 300 && run.phase !== 'finished'; f++) {
        const inp = pp.decide(b, 1 / 60);
        const f0 = run.falls; run.update(1 / 60, inp); if (run.falls > f0) pp.crashed(b);
        run.pendingEvents.length = 0;
        if (b.activeIndex !== 0) continue;
        const k = Math.floor(b.mainProj.s / 5);
        if (k >= 0 && !line[k]) line[k] = [Math.round(b.v.length() * 3.6), +b.proj.x.toFixed(1), +b.proj.y.toFixed(1), inp.magnet ? 1 : 0];
      }
      res[m] = { time: +run.finishTime.toFixed(1), done: run.phase === 'finished', line };
    }
    out[c.id] = res;
  }
  writeFileSync(process.env.SINK_LAB_OUT ?? 'sink-lab.json', JSON.stringify(out));
}, 3600000);
