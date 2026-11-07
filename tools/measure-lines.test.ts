/**
 * LINE LAB: measure how every world rides at every skill level.
 *
 * For each world and each Auto Ball mode (chill, middle, rip, insane) it rides
 * the course and records:
 *  - the speed line: speed at every 5 m of the main course
 *  - every POP-OFF (the ball leaving the gutter's channel): where, how fast,
 *    why (corner = out over a wall, crest = straight up off the floor,
 *    gap = a designed gap jump, jump = the driver jumped), where it flew
 *    (peak height, distance, sideways) and how it ended:
 *      save  - flew back into a gutter by itself / with air control and the beam
 *      catch - came down in the safety net and was lifted back
 *      loss  - a quick reset
 * Writes JSON to LINE_LAB_OUT (default: line-lab.json).
 *
 *   npx vitest run --config tools/vitest.config.ts
 */
import { it } from 'vitest';
import { writeFileSync } from 'node:fs';
import { Vector3 } from 'three';
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
] as const;

interface PopOff {
  track: string; s: number; mainS: number; speed: number; cause: string; openSky: boolean;
  outcome: 'save' | 'catch' | 'loss' | 'unfinished'; air: number; peak: number; dist: number; side: number;
  landTrack?: string; landS?: number;
}

it('line lab', () => {
  const out: Record<string, unknown> = {};
  for (const c of CATALOG) {
    const world: Record<string, unknown> = { name: c.world, course: c.name };
    const geo = new Course(c.layout());
    world.length = geo.main.length;
    // the main course's centreline (top-down) for the map, every 10 m
    world.path = Array.from({ length: Math.floor(geo.main.length / 10) }, (_, k) => {
      const i = geo.main.idx(k * 10) * 3; return [+geo.main.P[i].toFixed(1), +geo.main.P[i + 2].toFixed(1), +geo.main.P[i + 1].toFixed(1)];
    });
    world.labels = geo.main.segmentStarts.filter((g) => g.label).map((g) => [g.label, Math.round(g.s)]);
    world.openSky = (() => { const r: number[][] = []; let st = -1; for (let i = 0; i <= geo.main.n; i++) { const v = i < geo.main.n && geo.main.openSky[i] === 1; if (v && st < 0) st = i; if (!v && st >= 0) { r.push([Math.round(st * geo.main.ds), Math.round(i * geo.main.ds)]); st = -1; } } return r; })();
    world.tubes = (() => { const r: number[][] = []; let st = -1; for (let i = 0; i <= geo.main.n; i++) { const v = i < geo.main.n && geo.main.tubeK[i] > 0.5; if (v && st < 0) st = i; if (!v && st >= 0) { r.push([Math.round(st * geo.main.ds), Math.round(i * geo.main.ds)]); st = -1; } } return r; })();
    const modes: Record<string, unknown> = {};
    for (const m of MODES) {
      const course = new Course(c.layout());
      const run = new Run(course, MATERIALS[c.materialId], m.insane ? INSANE_TUNING : {});
      const pp = new ProPilot(); pp.pace = m.pace; pp.insane = m.insane;
      run.launch(); run.ball.v.addScaledVector(run.ball.proj.T, 20);
      const b = run.ball;
      const speedLine: number[] = [];
      const pops: PopOff[] = [];
      let cur: (PopOff & { p0: Vector3; t0: number; jumpT: number; netted: boolean; falls0: number }) | null = null;
      let lastJump = -9, wasInside = true, gas = 0, frames = 0;
      for (let f = 0; f < 60 * 300 && run.phase !== 'finished'; f++) {
        const t = f / 60;
        const inp = pp.decide(b, 1 / 60);
        if (inp.jump) lastJump = t;
        if (inp.magnet && b.contact) gas++;
        const falls0 = run.falls;
        run.update(1 / 60, inp);
        let netEv = false;
        for (const e of run.pendingEvents) { if (e.type === 'NET_CATCH') netEv = true; if (e.type === 'JUMP') lastJump = t; }
        run.pendingEvents.length = 0;
        if (run.falls > falls0) pp.crashed(b);
        frames++;
        // speed line along the main course
        if (b.activeIndex === 0) { const k = Math.floor(b.mainProj.s / 5); if (k >= 0 && speedLine[k] === undefined) speedLine[k] = Math.round(b.v.length() * 3.6); }
        // inside a gutter's channel?
        const pr = b.proj, tr = b.track;
        const [wl, wr] = tr.wallsAt(pr.s);
        const inside = Math.abs(pr.along) < 3 && tr.channelDepthLocal(pr.s, pr.x, pr.y) > -0.2 && pr.y < Math.max(wl, wr) + 1 && pr.y > -1.5;
        if (cur) {
          cur.air = t - cur.t0;
          const d = b.p.clone().sub(cur.p0);
          const up = d.y, horiz = Math.hypot(d.x, d.z);
          cur.peak = Math.max(cur.peak, +up.toFixed(1)); cur.dist = Math.max(cur.dist, +horiz.toFixed(0));
          if (netEv) cur.netted = true;
          if (run.falls > cur.falls0) { cur.outcome = 'loss'; }
          else if (inside && b.contact && !b.netLift) cur.outcome = cur.netted ? 'catch' : 'save';
          if (cur.outcome !== 'unfinished' || t - cur.t0 > 20) {
            if (cur.outcome !== 'loss') { cur.landTrack = tr.layout.id; cur.landS = Math.round(pr.s); }
            const { p0: _p, t0: _t, jumpT: _j, netted: _n, falls0: _f, ...rec } = cur;
            rec.air = +rec.air.toFixed(2);
            pops.push(rec); cur = null;
          }
        } else if (wasInside && !inside && !b.contact && run.phase === 'running') {
          // a pop-off: why?
          let cause = 'corner';
          const W = tr.halfWidthAt(pr.s);
          if (tr.isGap(pr.s) || tr.isGap(pr.s + 8)) cause = 'gap';
          else if (t - lastJump < 0.6) cause = 'jump';
          else if (Math.abs(pr.x) < W * 0.7 && pr.y > 0) cause = 'crest';
          else if (pr.y < 0) cause = 'under';
          cur = { track: tr.layout.id, s: Math.round(pr.s), mainS: Math.round(b.mainProj.s), speed: Math.round(b.v.length() * 3.6), cause,
            openSky: tr.openSky[tr.idx(pr.s)] === 1, outcome: 'unfinished', air: 0, peak: 0, dist: 0, side: Math.sign(pr.x),
            p0: b.p.clone(), t0: t, jumpT: lastJump, netted: false, falls0: run.falls };
        }
        wasInside = inside || b.contact;
      }
      modes[m.name] = {
        finished: run.phase === 'finished', time: +run.finishTime.toFixed(1), falls: run.falls,
        gasPct: Math.round(100 * gas / Math.max(1, frames)), speedLine, pops,
      };
    }
    world.modes = modes;
    out[c.id] = world;
  }
  writeFileSync(process.env.LINE_LAB_OUT ?? 'line-lab.json', JSON.stringify(out));
});
