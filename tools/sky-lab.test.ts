/**
 * SKY LAB: where do fast balls fly when they pop off, and where would a sky
 * line catch them? Rides one world at the given paces (like the line lab)
 * and prints each big flight in the main course's frame: arc length,
 * right/up offset, and the flight's heading relative to the course and its
 * pitch, every 0.1 s. Those numbers place a sky line's catch deck.
 *
 *   SKY_WORLD=wood SKY_MODES=rip,insane npx vitest run --config tools/vitest.config.ts sky-lab
 */
import { it } from 'vitest';
import { appendFileSync, writeFileSync } from 'node:fs';
const OUT = process.env.SKY_OUT ?? 'sky-lab.txt';
const log = (...a: unknown[]) => appendFileSync(OUT, a.join(' ') + '\n');
import { Vector3 } from 'three';
import { Course, TrackProjector } from '../src/track/track';
import { MATERIALS } from '../src/physics/materials';
import { INSANE_TUNING } from '../src/physics/ball';
import { Run } from '../src/game/run';
import { ProPilot } from '../src/game/proPilot';
import { CATALOG } from '../src/commerce/catalog';

const MODES: Record<string, { pace: number; insane: boolean }> = {
  chill: { pace: 0, insane: false }, middle: { pace: 0.5, insane: false }, rip: { pace: 1, insane: false }, insane: { pace: 1, insane: true },
};

it.runIf(!!process.env.SKY_WORLD)('sky lab', () => {
  writeFileSync(OUT, '');
  const c = CATALOG.find((x) => x.id === process.env.SKY_WORLD)!;
  const minPeak = +(process.env.SKY_MIN_PEAK ?? 4);
  for (const name of (process.env.SKY_MODES ?? 'rip,insane').split(',')) {
    const m = MODES[name];
    const course = new Course(c.layout());
    const main = course.main;
    const pj = new TrackProjector(main);
    const run = new Run(course, MATERIALS[c.materialId], m.insane ? INSANE_TUNING : {});
    const pp = new ProPilot(); pp.pace = m.pace; pp.insane = m.insane;
    run.launch(); run.ball.v.addScaledVector(run.ball.proj.T, 20);
    const b = run.ball;
    let flight: { t0: number; rows: string[]; peak: number; s0: number; y0: number } | null = null;
    let lastAir = false;
    for (let f = 0; f < 60 * 300 && run.phase !== 'finished'; f++) {
      const t = f / 60;
      const inp = pp.decide(b, 1 / 60);
      const falls0 = run.falls;
      run.update(1 / 60, inp);
      run.pendingEvents.length = 0;
      if (run.falls > falls0) pp.crashed(b);
      const air = !b.contact && !b.netLift;
      if (air && !lastAir) { pj.reset(b.mainProj.s); flight = { t0: t, rows: [], peak: 0, s0: b.mainProj.s, y0: b.p.y }; }
      if (flight && air && f % 6 === 0 && t - flight.t0 < 6) {
        pj.project(b.p.x, b.p.y, b.p.z);
        const i = main.idx(pj.s) * 3;
        const v = b.v, sp = v.length();
        const yaw = Math.atan2(-v.x, -v.z) * 180 / Math.PI, pitch = Math.asin(v.y / sp) * 180 / Math.PI;
        let dy = yaw - main.angles[i]; dy = ((dy + 540) % 360) - 180;
        flight.peak = Math.max(flight.peak, b.p.y - flight.y0);
        flight.rows.push(`  t=${(t - flight.t0).toFixed(1)} s=${pj.s.toFixed(0)} x=${pj.x.toFixed(1)} y=${pj.y.toFixed(1)} track=${b.track.layout.id}${b.activeIndex ? `[s${b.proj.s.toFixed(0)} x${b.proj.x.toFixed(1)} y${b.proj.y.toFixed(1)} c${b.contact ? 1 : 0} m${inp.magnet ? 1 : 0}]` : ` m${inp.magnet ? 1 : 0}`} v=${(sp * 3.6).toFixed(0)}kmh yawOff=${dy.toFixed(1)} pitch=${pitch.toFixed(1)} mainPitch=${main.angles[i + 1].toFixed(1)} mainBank=${main.angles[i + 2].toFixed(0)}`);
      }
      if (flight && (!air || run.falls > falls0)) {
        const dur = t - flight.t0;
        if (process.env.SKY_DEBUG) log("flight", dur.toFixed(2), flight.rows.length);
        if (dur > 0.8 && flight.rows.length > 6) {
          const yMax = Math.max(...flight.rows.map((r) => +(r.match(/ y=(-?[\d.]+)/)![1])));
          if (yMax >= minPeak) {
            log(`${name} flight from s=${flight.s0.toFixed(0)} for ${dur.toFixed(1)} s, ${run.falls > falls0 ? 'LOST' : 'landed on ' + b.track.layout.id + ' s=' + b.proj.s.toFixed(0)}`);
            log(flight.rows.join('\n'));
          }
        }
        flight = null;
      }
      lastAir = air;
    }
  }
});

// keep Vector3 import used (tree-shaking lint)
void Vector3;
