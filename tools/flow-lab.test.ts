/**
 * FLOW LAB: where does a course break the flow? Rides every world on AUTO at
 * chill, middle, rip and insane (as the player sees it) and scores each
 * labelled section of the main course:
 *  loss   - worst speed lost inside the section (share of the entry speed),
 *           not counting designed lift hills
 *  zig    - steering reversals per second (the line jittering left-right)
 *  slam   - hard hits on the walls/track per 100 m (impacts > 6 m/s)
 *  air    - seconds off the surface per 100 m (designed gaps excluded)
 *  brake  - brakes the driver needed
 *  slow   - seconds spent under 40% of the run's median speed
 * and a FLOW score (higher = worse) that blends them. Writes FLOW_LAB_OUT.
 *   FLOW_WORLDS=wood,ice to narrow; FLOW_TUNE='{...}' to try tunings.
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
  { name: 'chill', pace: 0, insane: false },
  { name: 'middle', pace: 0.5, insane: false },
  { name: 'rip', pace: 1, insane: false },
  { name: 'insane', pace: 1, insane: true },
];
const WORLDS = process.env.FLOW_WORLDS?.split(',');

interface Sec { label: string; s0: number; s1: number; vIn: number; vMin: number; vOut: number; loss: number; zig: number; slam: number; air: number; brake: number; slow: number; t: number; lift: boolean }

it('flow lab', () => {
  const out: Record<string, unknown> = {};
  for (const c of CATALOG) {
    if (WORLDS && !WORLDS.includes(c.id)) continue;
    const res: Record<string, unknown> = {};
    for (const m of MODES) {
      const course = new Course(c.layout());
      const tr = course.main;
      const labels = tr.segmentStarts.filter((g) => g.label).map((g) => ({ label: g.label!, s: g.s }));
      const lifts = new Set(labels.filter((l) => /lift|tower/i.test(l.label)).map((l) => l.label));
      const run = new Run(course, MATERIALS[c.materialId], { ...(m.insane ? INSANE_TUNING : {}), ...JSON.parse(process.env.FLOW_TUNE ?? '{}') });
      const pp = new ProPilot(); pp.pace = m.pace; pp.insane = m.insane;
      run.launch(); run.ball.v.addScaledVector(run.ball.proj.T, 20);
      const b = run.ball;
      const frames: { s: number; v: number; steer: number; air: boolean; brake: boolean; slam: boolean; main: boolean }[] = [];
      for (let f = 0; f < 60 * 300 && run.phase !== 'finished'; f++) {
        const inp = pp.decide(b, 1 / 60);
        const falls0 = run.falls;
        run.update(1 / 60, inp);
        if (run.falls > falls0) pp.crashed(b);
        let slam = false;
        for (const e of run.pendingEvents) if (e.type === 'COLLISION_IMPACT' && e.source !== 'obstacle' && (e.magnitude ?? 0) > 6) slam = true;
        run.pendingEvents.length = 0;
        const s = b.mainProj.s;
        frames.push({ s, v: b.v.length(), steer: inp.steer, air: b.sinceContact > 0.05 && !tr.isGap(s) && !tr.isGap(s + 20), brake: !!inp.brake, slam, main: b.activeIndex === 0 });
      }
      const vs = frames.map((f) => f.v).sort((a, b) => a - b);
      const med = vs[Math.floor(vs.length / 2)] ?? 1;
      const secs: Sec[] = [];
      for (let k = 0; k < labels.length; k++) {
        const s0 = labels[k].s, s1 = k + 1 < labels.length ? labels[k + 1].s : tr.length;
        const fr = frames.filter((f) => f.main && f.s >= s0 && f.s < s1);
        if (fr.length < 10) continue;
        let peak = fr[0].v, loss = 0, zig = 0, lastSign = 0, slam = 0, air = 0, brake = 0, slow = 0, vMin = Infinity;
        for (const f of fr) {
          peak = Math.max(peak, f.v); loss = Math.max(loss, 1 - f.v / peak); vMin = Math.min(vMin, f.v);
          if (Math.abs(f.steer) > 0.35) { const sg = Math.sign(f.steer); if (lastSign && sg !== lastSign) zig++; lastSign = sg; }
          if (f.slam) slam++; if (f.air) air += 1 / 60; if (f.brake) brake++; if (f.v < 0.4 * med) slow += 1 / 60;
        }
        const t = fr.length / 60, len = Math.max(20, s1 - s0);
        secs.push({ label: labels[k].label, s0: Math.round(s0), s1: Math.round(s1), vIn: Math.round(fr[0].v * 3.6), vMin: Math.round(vMin * 3.6), vOut: Math.round(fr[fr.length - 1].v * 3.6),
          loss: +loss.toFixed(2), zig: +(zig / t).toFixed(2), slam: +(slam * 100 / len).toFixed(2), air: +(air * 100 / len).toFixed(2), brake, slow: +slow.toFixed(1), t: +t.toFixed(1), lift: lifts.has(labels[k].label) });
      }
      res[m.name] = { done: run.phase === 'finished', time: +run.finishTime.toFixed(1), falls: run.falls, medKmh: Math.round(med * 3.6), secs };
    }
    out[c.id] = res;
  }
  writeFileSync(process.env.FLOW_LAB_OUT ?? 'flow-lab.json', JSON.stringify(out));
}, 3600000);
