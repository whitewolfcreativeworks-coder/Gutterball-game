/**
 * GLITCH LAB: ride every world (pro pilot, middle and rip pace) and flag frames
 * where the ball does something no physical ball would:
 * *  snap  - the position jumps more than 0.8 m beyond where its velocity took it
 *  jolt  - the velocity changes by more than 6 m/s in one frame with no impact,
 *          jump, push, brake, boost, landing or recall to explain it
 *  spin  - the spin changes by more than 40 rad/s in one frame without an impact
 * Each flag carries the place (segment label + metres) so it can be looked at.
 * Writes GLITCH_LAB_OUT (default glitch-lab.json).
 */
import { it } from 'vitest';
import { writeFileSync } from 'node:fs';
import { Vector3 } from 'three';
import { Course } from '../src/track/track';
import { MATERIALS } from '../src/physics/materials';
import { Run } from '../src/game/run';
import { ProPilot } from '../src/game/proPilot';
import { CATALOG } from '../src/commerce/catalog';

const EXPLAINED = new Set(['COLLISION_IMPACT', 'JUMP', 'DOUBLE_JUMP', 'PUSH', 'NUDGE', 'BRAKE', 'HOLO_BOOST', 'TURBO_START', 'AIRBORNE_END', 'RECALL', 'NET_CATCH', 'MAGNETIC_CAPTURE', 'WATER_ENTRY', 'LIFT_CLACK', 'TRIGGER_PAD', 'MAGNET_ENGAGED']);
const WORLDS = process.env.GLITCH_WORLDS?.split(',');

it('glitch lab', () => {
  const out: Record<string, string[]> = {};
  for (const c of CATALOG) {
    if (WORLDS && !WORLDS.includes(c.id)) continue;
    const flags: string[] = [];
    for (const pace of [0.5, 1]) {
      const course = new Course(c.layout());
      const run = new Run(course, MATERIALS[c.materialId]);
      const pp = new ProPilot(); pp.pace = pace;
      run.launch(); run.ball.v.addScaledVector(run.ball.proj.T, 20);
      const b = run.ball;
      const p0 = new Vector3(), v0 = new Vector3(), w0 = new Vector3();
      let quiet = 0;
      for (let f = 0; f < 60 * 300 && run.phase !== 'finished'; f++) {
        p0.copy(b.p); v0.copy(b.v); w0.copy(b.w);
        const falls0 = run.falls;
        run.update(1 / 60, pp.decide(b, 1 / 60));
        if (run.falls > falls0) pp.crashed(b);
        let explained = run.falls > falls0 || (b as any).recalling || b.netLift;
        for (const e of run.pendingEvents) if (EXPLAINED.has(e.type)) explained = true;
        run.pendingEvents.length = 0;
        if (explained) { quiet = 6; continue; }
        if (quiet > 0) { quiet--; continue; }
        const tr = b.track, s = b.proj.s;
        const lab = [...tr.segmentStarts].reverse().find((g) => g.label && g.s <= s);
        const where = `${tr === course.main ? '' : tr.layout.id + ':'}${lab?.label ?? '?'}+${Math.round(s - (lab?.s ?? 0))} (s${Math.round(s)}) ${Math.round(b.v.length() * 3.6)}km/h pace${pace}`;
        const drift = b.p.clone().sub(p0).addScaledVector(b.v.clone().add(v0), -0.5 / 60).length();
        const dv = b.v.clone().sub(v0).length();
        const dw = b.w.clone().sub(w0).length();
        if (drift > 0.8) flags.push(`snap ${drift.toFixed(2)}m @ ${where}`);
        else if (dv > 6) flags.push(`jolt ${dv.toFixed(1)}m/s @ ${where} contact${b.contact ? 1 : 0} ${(b as any).contained}`);
        else if (dw > 40) flags.push(`spin ${dw.toFixed(0)}rad/s @ ${where}`);
      }
    }
    out[c.id] = flags;
  }
  writeFileSync(process.env.GLITCH_LAB_OUT ?? 'glitch-lab.json', JSON.stringify(out, null, 1));
}, 1800000);
