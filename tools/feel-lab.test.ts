/**
 * FEEL LAB: how connected is the ball to the gutter?
 * Rides every world with the pro pilot's steering but no beam and no jumps
 * (a player just carving the course), and counts per world and pace:
 *  hops    - times the ball left the surface for > 0.1 s (designed gaps excluded)
 *  air     - total seconds off the surface (gaps excluded)
 *  long    - flights over 1 s
 *  recalls - times the recall beam had to fetch the ball
 * Writes FEEL_LAB_OUT (default feel-lab.json).
 */
import { it } from 'vitest';
import { writeFileSync } from 'node:fs';
import { Course } from '../src/track/track';
import { MATERIALS } from '../src/physics/materials';
import { INSANE_TUNING } from '../src/physics/ball';
import { Run } from '../src/game/run';
import { ProPilot } from '../src/game/proPilot';
import { CATALOG } from '../src/commerce/catalog';

const MODES = [
  { name: 'middle', pace: 0.5, insane: false },
  { name: 'rip', pace: 1, insane: false },
  { name: 'insane', pace: 1, insane: true },
];
const WORLDS = process.env.FEEL_WORLDS?.split(',');

it('feel lab', () => {
  const out: Record<string, Record<string, unknown>> = {};
  for (const c of CATALOG) {
    if (WORLDS && !WORLDS.includes(c.id)) continue;
    const row: Record<string, unknown> = {};
    for (const m of MODES) {
      const course = new Course(c.layout());
      const run = new Run(course, MATERIALS[c.materialId], { ...(m.insane ? INSANE_TUNING : {}), ...JSON.parse(process.env.FEEL_TUNE ?? '{}') });
      const pp = new ProPilot(); pp.pace = m.pace; pp.insane = m.insane;
      run.launch(); run.ball.v.addScaledVector(run.ball.proj.T, 20);
      const b = run.ball;
      const detail: string[] = []; let take = '';
      let hops = 0, air = 0, long = 0, recalls = 0, cur = 0, wasRecall = false, speed = 0, frames = 0;
      for (let f = 0; f < 60 * 300 && run.phase !== 'finished'; f++) {
        const inp = pp.decide(b, 1 / 60);
        if (!process.env.FEEL_JUMPS) inp.jump = false; inp.magnet = false;
        const falls0 = run.falls;
        run.update(1 / 60, inp);
        run.pendingEvents.length = 0;
        if (run.falls > falls0) pp.crashed(b);
        const rec = !!(b as any).recalling;
        if (rec && !wasRecall) recalls++;
        wasRecall = rec;
        const tr = b.track, s = b.proj.s;
        const gapish = tr.isGap(s) || tr.isGap(s + 25) || tr.isGap(s - 25);
        if (!rec && b.sinceContact > 0.02 && !gapish) { if (cur === 0) { const lab = [...tr.segmentStarts].reverse().find((g) => g.label && g.s <= s); take = `${tr === course.main ? '' : 'b:'}${lab?.label}+${Math.round(s - (lab?.s ?? 0))} x${(b.proj.x / tr.halfWidthAt(s)).toFixed(1)} y${b.proj.y.toFixed(1)} nU${b.n.dot(b.proj.U).toFixed(2)} v${Math.round(b.v.length())}`; } cur += 1 / 60; }
        else if (cur > 0) { if (cur > 0.1) { hops++; detail.push(`${cur.toFixed(2)}s ${take}`); } if (cur > 1) long++; air += cur; cur = 0; }
        speed += b.v.length(); frames++;
      }
      row[m.name] = { done: run.phase === 'finished', time: +run.finishTime.toFixed(1), falls: run.falls, hops, air: +air.toFixed(1), long, recalls, kmh: Math.round(speed / frames * 3.6), ...(process.env.FEEL_DETAIL ? { detail } : {}) };
    }
    out[c.id] = row;
  }
  writeFileSync(process.env.FEEL_LAB_OUT ?? 'feel-lab.json', JSON.stringify(out, null, 1));
}, 1800000);
