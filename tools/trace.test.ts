/** TRACE: one world on AUTO, every few frames between two points of the main course. TRACE="world:pace:s0:s1[:insane]" */
import { it } from 'vitest';
import { writeFileSync } from 'node:fs';
import { Course } from '../src/track/track';
import { MATERIALS } from '../src/physics/materials';
import { INSANE_TUNING } from '../src/physics/ball';
import { Run } from '../src/game/run';
import { ProPilot } from '../src/game/proPilot';
import { CATALOG } from '../src/commerce/catalog';
it('trace', () => {
  const L: string[] = [];
  for (const spec of (process.env.TRACE ?? '').split(',').filter(Boolean)) {
    const [id, paceS, s0S, s1S, ins] = spec.split(':');
    const s0 = +s0S, s1 = +s1S, pace = +paceS, insane = ins === 'insane';
    const c = CATALOG.find((x) => x.id === id)!;
    const course = new Course(c.layout());
    const run = new Run(course, MATERIALS[c.materialId], insane ? INSANE_TUNING : {});
    const pp = new ProPilot(); pp.pace = pace; pp.insane = insane;
    run.launch(); run.ball.v.addScaledVector(run.ball.proj.T, 20);
    const b = run.ball;
    L.push(`== ${spec}`);
    for (let f = 0; f < 60 * 300 && run.phase !== 'finished'; f++) {
      const inp = pp.decide(b, 1 / 60);
      const f0 = run.falls; run.update(1 / 60, inp); if (run.falls > f0) pp.crashed(b);
      const ev = run.pendingEvents.filter((e) => !['ROLLING_CONTACT', 'SURFACE_SEAM_CROSSING', 'SLIDING_CONTACT'].includes(e.type)).map((e) => e.type === 'COLLISION_IMPACT' ? `HIT:${e.source}${(e.magnitude ?? 0).toFixed(0)}` : e.type).join(',');
      run.pendingEvents.length = 0;
      const s = b.mainProj.s;
      if (s > s0 && s < s1 && (f % 3 === 0 || ev)) {
        const tr = b.track; const lab = [...tr.segmentStarts].reverse().find((g) => g.label && g.s <= b.proj.s);
        L.push(`${lab?.label}+${(b.proj.s - (lab?.s ?? 0)).toFixed(0)} trk${b.activeIndex} x${b.proj.x.toFixed(1)} y${b.proj.y.toFixed(1)} ${(b.v.length() * 3.6).toFixed(0)}kmh c${b.contact ? 1 : 0} st${inp.steer.toFixed(2)}${inp.magnet ? ' MAG' : ''}${inp.brake ? ' BRAKE' : ''}${inp.jump ? ' JUMP' : ''}${inp.push ? ' PUSH' : ''} ${b.contained} ${ev}`);
      }
      if (s > s1 + 30) break;
    }
  }
  writeFileSync(process.env.TRACE_OUT ?? 'trace.txt', L.join('\n'));
}, 900000);
