/**
 * SKY SOLVE: fit each sky line's tube so it merges back into the main course.
 *
 * For every SkyDef of a world it builds the main course alone, then searches
 * the tube's two sweeps and the merge slope (Nelder-Mead) so the sky line's
 * end lands on the merge point, heading and pitched the same way, while
 * staying well clear of the main gutter until the merge. Prints the fitted
 * numbers to paste into `fit`, the closing error and the clearance.
 *
 *   SKY_WORLD=wood npx vitest run --config tools/vitest.config.ts sky-solve
 */
import { it } from 'vitest';
import { appendFileSync, writeFileSync } from 'node:fs';
import { Vector3 } from 'three';
import { Course, Track } from '../src/track/track';
import { CATALOG } from '../src/commerce/catalog';
import { SKY, skyBody, type SkyDef } from '../src/courses/skyLines';

const OUT = process.env.SKY_OUT ?? 'sky-lab.txt';
const log = (...a: unknown[]) => appendFileSync(OUT, a.join(' ') + '\n');
const D = Math.PI / 180;

function nelderMead(f: (x: number[]) => number, x0: number[], step: number[], iters = 600) {
  const n = x0.length;
  let pts = [x0.slice(), ...x0.map((_, i) => { const p = x0.slice(); p[i] += step[i]; return p; })];
  let vals = pts.map(f);
  for (let k = 0; k < iters; k++) {
    const ord = vals.map((v, i) => [v, i]).sort((a, b) => a[0] - b[0]).map((x) => x[1]);
    pts = ord.map((i) => pts[i]); vals = ord.map((i) => vals[i]);
    const c = Array(n).fill(0);
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) c[j] += pts[i][j] / n;
    const mv = (a: number) => c.map((cj, j) => cj + a * (pts[n][j] - cj));
    const r = mv(-1), fr = f(r);
    if (fr < vals[0]) { const e = mv(-2), fe = f(e); if (fe < fr) { pts[n] = e; vals[n] = fe; } else { pts[n] = r; vals[n] = fr; } }
    else if (fr < vals[n - 1]) { pts[n] = r; vals[n] = fr; }
    else {
      const cc = mv(0.5), fc = f(cc);
      if (fc < vals[n]) { pts[n] = cc; vals[n] = fc; }
      else for (let i = 1; i <= n; i++) { pts[i] = pts[i].map((v, j) => pts[0][j] + 0.5 * (v - pts[0][j])); vals[i] = f(pts[i]); }
    }
  }
  const b = vals.indexOf(Math.min(...vals));
  return { x: pts[b], v: vals[b] };
}

it.runIf(!!process.env.SKY_WORLD)('sky solve', () => {
  writeFileSync(OUT, '');
  const wid = process.env.SKY_WORLD!;
  const c = CATALOG.find((x) => x.id === wid)!;
  const defs = SKY[wid] ?? [];
  const ids = new Set(defs.map((d) => d.id));
  const layout = c.layout();
  const course = new Course({ ...layout, branches: (layout.branches ?? []).filter((b) => !ids.has(b.id)) });
  const main = course.main;
  const others = course.all;
  for (const d of defs.filter((x) => !process.env.SKY_ID || x.id === process.env.SKY_ID)) {
    const seg = main.segmentStarts.find((g) => g.label === d.at)!;
    const s0 = seg.s + d.s;
    const P = new Vector3(), T = new Vector3(), U = new Vector3(), R = new Vector3();
    main.frameAtS(s0, P, T, U, R);
    const start = P.clone().addScaledVector(R, d.offset[0]).addScaledVector(U, d.offset[1]);
    const i0 = Math.round(s0 / main.ds) * 3;
    const yaw0 = main.angles[i0] + d.yawOffset;
    const ms = main.segmentStarts.find((g) => g.label === d.merge.at)!.s + d.merge.s;
    const MP = new Vector3(), MT = new Vector3(), MU = new Vector3();
    main.frameAtS(ms, MP, MT, MU, R);
    log(`${d.id}: merge at main s=${ms.toFixed(0)}: bank ${main.angles[Math.round(ms / main.ds) * 3 + 2].toFixed(1)} pitch ${main.angles[Math.round(ms / main.ds) * 3 + 1].toFixed(1)}`);
    const build = (fit: number[]) => new Track({
      id: d.id, name: d.name, segments: skyBody(d, fit as SkyDef['fit']), obstacles: [], hints: [],
      startPos: [start.x, start.y, start.z], startAngles: [yaw0, d.pitch, 0], openStart: true, openEnd: true,
    });
    const clear = (br: Track) => {
      // closest approach to every other gutter, until the last 160 m (the descent into the merge)
      let worst = Infinity, at = 0;
      for (let i = 0; i < br.n; i += Math.max(1, Math.round(5 / br.ds))) {
        if (i * br.ds > br.length - 160) break;
        for (const o of others) {
          for (let j = 0; j < o.n; j += Math.max(1, Math.round(5 / o.ds))) {
            const dd = Math.hypot(o.P[j * 3] - br.P[i * 3], o.P[j * 3 + 1] - br.P[i * 3 + 1], o.P[j * 3 + 2] - br.P[i * 3 + 2]);
            if (dd < worst) { worst = dd; at = i * br.ds; }
          }
        }
      }
      return { worst, at };
    };
    // near the main gutter, the sky line must be level with it (arriving from the side, like
    // a Y-junction), never hovering just above it: its shell would sit in the main gutter's way
    const level = (br: Track) => {
      let pen = 0, worst = 0;
      const step = Math.max(1, Math.round(4 / br.ds)), mstep = Math.max(1, Math.round(3 / main.ds));
      const msLo = Math.round((s0 - 50) / main.ds), msHi = Math.min(main.n, Math.round((ms + 60) / main.ds));
      for (let i = Math.round((d.deckLen + 20) / br.ds); i < br.n; i += step) {
        let bd = Infinity, bj = 0;
        for (let j = msLo; j < msHi; j += mstep) {
          const dd = (main.P[j * 3] - br.P[i * 3]) ** 2 + (main.P[j * 3 + 1] - br.P[i * 3 + 1]) ** 2 + (main.P[j * 3 + 2] - br.P[i * 3 + 2]) ** 2;
          if (dd < bd) { bd = dd; bj = j; }
        }
        if (bd > 18 * 18) continue;
        const dx = br.P[i * 3] - main.P[bj * 3], dy = br.P[i * 3 + 1] - main.P[bj * 3 + 1], dz = br.P[i * 3 + 2] - main.P[bj * 3 + 2];
        const y = Math.abs(dx * main.U[bj * 3] + dy * main.U[bj * 3 + 1] + dz * main.U[bj * 3 + 2]);
        if (y > 1.2) { pen += (y - 1.2) ** 2; worst = Math.max(worst, y); }
      }
      return { pen, worst };
    };
    const err = (br: Track) => {
      const k = (br.n - 1) * 3;
      const pos = Math.hypot(br.P[k] - MP.x, br.P[k + 1] - MP.y, br.P[k + 2] - MP.z);
      // heading AND roll: the two cross-sections must line up, or the floors won't meet
      const ang = Math.acos(Math.max(-1, Math.min(1, br.T[k] * MT.x + br.T[k + 1] * MT.y + br.T[k + 2] * MT.z)))
        + Math.acos(Math.max(-1, Math.min(1, br.U[k] * MU.x + br.U[k + 1] * MU.y + br.U[k + 2] * MU.z)));
      return { pos, ang: ang / D };
    };
    const f = (x: number[]) => {
      const br = build(x);
      const e = err(br);
      let pen = 0;
      // keep the sweeps flowing (no hairpins) and the slopes sane
      const [L1, L2] = d.lens;
      for (const [yw, L] of [[x[0], L1], [x[2], L2]]) { const R = (L / Math.max(1e-3, Math.abs(yw) * D)); if (R < 70) pen += (70 - R) ** 2 * 0.5; }
      for (const p of [x[1], x[3], x[4]]) { if (p > 8) pen += (p - 8) ** 2 * 20; if (p < -28) pen += (-28 - p) ** 2 * 20; }
      let cl = 0;
      if (process.env.SKY_CLEAR !== '0') { const cc = clear(br); if (cc.worst < 16) cl = (16 - cc.worst) ** 2 * 8; }
      return e.pos ** 2 + (e.ang * 3) ** 2 + pen + cl + level(br).pen * 4;
    };
    // first fit without the (slow) clearance term, then polish with it
    const step = [20, 4, 20, 4, 4, 8];
    let best = nelderMead((x) => { const br = build(x); const e = err(br); return e.pos ** 2 + (e.ang * 3) ** 2; }, d.fit.slice(), step, 500);
    for (let r = 0; r < 3; r++) best = nelderMead(f, best.x, step.map((v) => v / (r + 1)), 400);
    const br = build(best.x);
    const e = err(br), cc = clear(br);
    const lv = level(br);
    log(`${d.id}: level-with-main worst ${lv.worst.toFixed(1)} m (pen ${lv.pen.toFixed(1)})`);
    log(`${d.id}: fit: [${best.x.map((v) => v.toFixed(2)).join(', ')}]  close ${e.pos.toFixed(2)} m, ${e.ang.toFixed(2)} deg; clearance ${cc.worst.toFixed(1)} m at ${cc.at.toFixed(0)} m; length ${br.length.toFixed(0)} m; merge s=${ms.toFixed(0)}`);
  }
});
