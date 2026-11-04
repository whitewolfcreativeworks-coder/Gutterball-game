import {
  BoxGeometry, BufferAttribute, BufferGeometry, CylinderGeometry, DoubleSide, Group, InstancedMesh, Matrix4,
  Mesh, MeshStandardMaterial, MeshPhysicalMaterial, Quaternion, Vector3, Color, CanvasTexture, SRGBColorSpace, PlaneGeometry, TorusGeometry,
} from 'three';
import type { Track } from '../track/track';
import { profilePolyline, halfWidth } from '../track/profile';
import type { MaterialProfile } from '../physics/materials';
import { surfaceMaps, TILE } from './textures';
import { applyFractal, FRACTAL_THEMES, FractalUniforms } from './fractal';

/**
 * Builds the visible gutter from the same frames and profile the physics
 * uses, so what you see is exactly what the ball rolls on.
 */
export function buildTrackGroup(track: Track, mat: MaterialProfile, groundHeight: (x: number, z: number) => number, isBranch = false): Group {
  const g = new Group();
  const vis = mat.visual;
  const maps = surfaceMaps(vis.surface, vis.tint);
  const surfaceMat = vis.transparent && vis.surface === 'glass'
    ? new MeshPhysicalMaterial({ color: vis.tint, roughness: vis.roughness, metalness: 0, transmission: 0.0, transparent: true, opacity: vis.opacity ?? 0.4, side: DoubleSide, normalMap: maps.normalMap, depthWrite: false })
    : new MeshStandardMaterial({
      map: maps.map, normalMap: maps.normalMap, roughnessMap: maps.roughnessMap, roughness: 1, metalness: vis.metalness,
      transparent: !!vis.transparent && vis.surface !== 'grating', opacity: vis.opacity ?? 1,
      alphaTest: maps.alphaMap ? 0.5 : 0, side: DoubleSide,
    });
  if (maps.alphaMap) (surfaceMat as MeshStandardMaterial).alphaMap = maps.alphaMap;
  if (maps.map) { (surfaceMat as MeshStandardMaterial).color?.set(0xffffff); }

  const prof = track.profile;
  const poly = profilePolyline(prof, 12);
  // Outer shell polyline: inner offset by thickness along outward normal
  const inner = poly;
  const nIn: Array<[number, number]> = inner.map((p, i) => {
    const a = inner[Math.max(0, i - 1)], b = inner[Math.min(inner.length - 1, i + 1)];
    const tx = b[0] - a[0], ty = b[1] - a[1];
    const l = Math.hypot(tx, ty) || 1;
    return [-ty / l, tx / l]; // left-hand normal => points into channel for our winding
  });
  // ensure normals point inward (toward +y at floor centre)
  const mid = Math.floor(inner.length / 2);
  if (nIn[mid][1] < 0) for (const n of nIn) { n[0] = -n[0]; n[1] = -n[1]; }
  const outer = inner.map((p, i) => [p[0] - nIn[i][0] * prof.th, p[1] - nIn[i][1] * prof.th] as [number, number]);
  // Full closed loop: inner (L->R), rim right, outer (R->L), rim left
  const ring: Array<{ x: number; y: number; nx: number; ny: number; u: number; part: 0 | 1 }> = [];
  let u = 0;
  for (let i = 0; i < inner.length; i++) {
    if (i > 0) u += Math.hypot(inner[i][0] - inner[i - 1][0], inner[i][1] - inner[i - 1][1]);
    ring.push({ x: inner[i][0], y: inner[i][1], nx: nIn[i][0], ny: nIn[i][1], u, part: 0 });
  }
  const rimR = outer[outer.length - 1];
  ring.push({ x: inner[inner.length - 1][0], y: inner[inner.length - 1][1], nx: 0, ny: 1, u, part: 1 });
  ring.push({ x: rimR[0], y: rimR[1], nx: 0, ny: 1, u: u + prof.th, part: 1 });
  u += prof.th;
  for (let i = outer.length - 1; i >= 0; i--) {
    if (i < outer.length - 1) u += Math.hypot(outer[i][0] - outer[i + 1][0], outer[i][1] - outer[i + 1][1]);
    ring.push({ x: outer[i][0], y: outer[i][1], nx: -nIn[i][0], ny: -nIn[i][1], u, part: 1 });
  }
  ring.push({ x: outer[0][0], y: outer[0][1], nx: 0, ny: 1, u, part: 1 });
  ring.push({ x: inner[0][0], y: inner[0][1], nx: 0, ny: 1, u: u + prof.th, part: 1 });

  const step = 2; // every 2 samples = 1 m
  const P = new Vector3(), T = new Vector3(), U = new Vector3(), R = new Vector3();
  const positions: number[] = [], normals: number[] = [], uvs: number[] = [], indices: number[] = [], fxuvs: number[] = [];
  const shellPositions: number[] = [], shellNormals: number[] = [], shellUvs: number[] = [], shellIdx: number[] = [];
  const M = ring.length;
  let runStart = -1;
  const rowsInner: number[] = [];
  const emitRun = (from: number, to: number) => {
    // inner surface rows: ring entries with part 0 go to surface mesh; others to shell mesh
    const baseS = positions.length / 3;
    const baseO = shellPositions.length / 3;
    let rows = 0;
    for (let i = from; i <= to; i += step) {
      track.sample(i, P, T, U, R);
      const s = i * track.ds;
      for (let k = 0; k < M; k++) {
        const r = ring[k];
        const wx = P.x + R.x * r.x + U.x * r.y, wy = P.y + R.y * r.x + U.y * r.y, wz = P.z + R.z * r.x + U.z * r.y;
        const nx = R.x * r.nx + U.x * r.ny, ny = R.y * r.nx + U.y * r.ny, nz = R.z * r.nx + U.z * r.ny;
        if (r.part === 0) {
          positions.push(wx, wy, wz); normals.push(nx, ny, nz); uvs.push(r.u / TILE, s / TILE); fxuvs.push(r.u, s);
        } else {
          shellPositions.push(wx, wy, wz); shellNormals.push(nx, ny, nz); shellUvs.push(r.u / TILE, s / TILE);
        }
      }
      rows++;
    }
    const nInner = inner.length;
    const nShell = M - nInner;
    for (let rI = 0; rI < rows - 1; rI++) {
      for (let k = 0; k < nInner - 1; k++) {
        const a = baseS + rI * nInner + k, b = a + 1, c = a + nInner, d = c + 1;
        indices.push(a, b, c, b, d, c);
      }
      for (let k = 0; k < nShell - 1; k++) {
        const a = baseO + rI * nShell + k, b = a + 1, c = a + nShell, d = c + 1;
        shellIdx.push(a, b, c, b, d, c);
      }
    }
  };
  for (let i = 0; i < track.n; i++) {
    const isGap = track.gap[i] === 1;
    if (!isGap && runStart < 0) runStart = i;
    if ((isGap || i === track.n - 1) && runStart >= 0) {
      const end = isGap ? i - 1 : i;
      if (end - runStart >= step) emitRun(runStart, end - ((end - runStart) % step));
      runStart = -1;
    }
  }
  void rowsInner;

  const geo = new BufferGeometry();
  geo.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
  geo.setAttribute('normal', new BufferAttribute(new Float32Array(normals), 3));
  geo.setAttribute('uv', new BufferAttribute(new Float32Array(uvs), 2));
  geo.setAttribute('fxuv', new BufferAttribute(new Float32Array(fxuvs), 2));
  geo.setIndex(indices);
  geo.computeTangents?.();
  const surf = new Mesh(geo, surfaceMat);
  surf.receiveShadow = true;
  surf.name = 'gutterSurface';
  g.add(surf);
  // Animated fractal glow layer (see fractal.ts)
  const theme = FRACTAL_THEMES[mat.id] ?? FRACTAL_THEMES.wood;
  const centerU = ring.find((r) => r.part === 0 && Math.abs(r.x) < 1e-6 && Math.abs(r.y) < 1e-6)?.u ?? 0;
  const fx: FractalUniforms = { uFxTime: { value: 0 }, uFxIntensity: { value: 0.5 }, uFxSpeed: { value: 0 } };
  applyFractal(surfaceMat, theme, centerU, fx);
  g.userData.fx = fx;
  g.userData.fxStrength = theme.strength;

  const shellGeo = new BufferGeometry();
  shellGeo.setAttribute('position', new BufferAttribute(new Float32Array(shellPositions), 3));
  shellGeo.setAttribute('normal', new BufferAttribute(new Float32Array(shellNormals), 3));
  shellGeo.setAttribute('uv', new BufferAttribute(new Float32Array(shellUvs), 2));
  shellGeo.setIndex(shellIdx);
  const shellColor = new Color(vis.tint).multiplyScalar(vis.surface === 'wood' ? 0.62 : 0.8);
  const shellMat = new MeshStandardMaterial({
    color: vis.surface === 'glass' ? 0xbfe8f0 : shellColor, map: vis.surface === 'glass' ? null : maps.map, roughness: Math.min(1, vis.roughness + 0.2), metalness: vis.metalness,
    transparent: !!vis.transparent, opacity: vis.surface === 'glass' ? 0.25 : (vis.opacity ?? 1), side: DoubleSide,
    alphaTest: maps.alphaMap ? 0.5 : 0, depthWrite: vis.surface !== 'glass',
  });
  if (maps.alphaMap) shellMat.alphaMap = maps.alphaMap;
  const shell = new Mesh(shellGeo, shellMat);
  shell.castShadow = vis.surface !== 'glass';
  shell.receiveShadow = true;
  g.add(shell);

  // ---- Liquid surface (water world) ----
  if (mat.medium === 'water') g.add(buildLiquid(track, mat));

  // ---- Ribs arching over the gutter: they stream past and sell the speed ----
  g.add(buildRibs(track, mat, theme));

  // ---- Supports / trestles ----
  g.add(buildSupports(track, mat, groundHeight));

  // ---- Tunnel roofs (covered bridges) ----
  g.add(buildRoofs(track, mat));

  // ---- Obstacles ----
  g.add(buildObstacles(track, mat));

  // ---- Start & finish arches ----
  if (!isBranch) {
    g.add(buildArch(track, 3, 'START', mat));
    g.add(buildArch(track, track.length - 62, 'FINISH', mat));
    for (let c = 1; c < track.checkpoints.length; c++) g.add(buildCheckpointPosts(track, track.checkpoints[c]));
  } else {
    g.add(buildArch(track, 2, track.layout.name.toUpperCase(), mat));
  }
  return g;
}

export const RIB_SPACING = 7;

function buildRibs(track: Track, mat: MaterialProfile, theme: { a: number }) {
  const prof = track.profile;
  const W = halfWidth(prof) + prof.th * 0.5;
  const geo = new TorusGeometry(1, 0.05, 6, 28, Math.PI);
  const m = new MeshStandardMaterial({
    color: mat.visual.surface === 'wood' ? 0x7a5230 : new Color(mat.visual.tint).multiplyScalar(0.7),
    emissive: new Color(theme.a), emissiveIntensity: 0.55, roughness: 0.6, metalness: mat.visual.metalness,
  });
  const P = new Vector3(), T = new Vector3(), U = new Vector3(), R = new Vector3();
  const mats: Matrix4[] = [];
  const archH = 2.6;
  for (let s = 20; s < track.length - 70; s += RIB_SPACING) {
    const i = Math.round(s / track.ds);
    if (track.gap[i] || track.tunnel[i] || track.openSky[i]) continue; // keep fork zones clear
    track.sample(i, P, T, U, R);
    if (U.y < 0.45) continue; // keep loops open
    // torus lies in its XY plane: x across (R), y up (U), scaled into a flat arch
    const basis = new Matrix4().makeBasis(R, U, T.clone().negate());
    basis.scale(new Vector3(W, archH, 1));
    basis.setPosition(P.clone().addScaledVector(U, prof.H + prof.th));
    mats.push(basis);
  }
  const inst = new InstancedMesh(geo, m, mats.length);
  mats.forEach((x, k) => inst.setMatrixAt(k, x));
  inst.instanceMatrix.needsUpdate = true;
  inst.name = 'ribs';
  return inst;
}

function buildLiquid(track: Track, mat: MaterialProfile) {
  const depth = mat.mediumParams?.depth ?? 1.2;
  const prof = track.profile;
  // half-width of the water surface at given depth (inside the fillet)
  const W = depth >= prof.rc ? prof.a + prof.rc : prof.a + Math.sqrt(prof.rc * prof.rc - (prof.rc - depth) ** 2);
  const pos: number[] = [], uv: number[] = [], idx: number[] = [];
  const P = new Vector3(), T = new Vector3(), U = new Vector3(), R = new Vector3();
  let row = 0;
  for (let i = 0; i < track.n; i += 2) {
    if (track.gap[i]) { row = -1; continue; }
    track.sample(i, P, T, U, R);
    for (const side of [-1, 1]) {
      pos.push(P.x + R.x * W * side + U.x * depth, P.y + R.y * W * side + U.y * depth, P.z + R.z * W * side + U.z * depth);
      uv.push(side < 0 ? 0 : 1, i * track.ds / 6);
    }
    const base = pos.length / 3 - 2;
    if (row > 0) idx.push(base - 2, base, base - 1, base - 1, base, base + 1);
    row = row < 0 ? 1 : row + 1;
  }
  const geo = new BufferGeometry();
  geo.setAttribute('position', new BufferAttribute(new Float32Array(pos), 3));
  geo.setAttribute('uv', new BufferAttribute(new Float32Array(uv), 2));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  const m = new MeshPhysicalMaterial({ color: mat.visual.water ?? 0x3fb7c9, roughness: 0.05, metalness: 0, transparent: true, opacity: 0.55, clearcoat: 1, side: DoubleSide, depthWrite: false });
  const mesh = new Mesh(geo, m);
  mesh.name = 'liquid';
  mesh.renderOrder = 2;
  return mesh;
}

function buildSupports(track: Track, mat: MaterialProfile, groundHeight: (x: number, z: number) => number) {
  const g = new Group();
  const legGeo = mat.visual.surface === 'wood' ? new BoxGeometry(0.35, 1, 0.35) : new CylinderGeometry(0.35, 0.45, 1, 10);
  const color = mat.visual.surface === 'wood' ? 0x6a4a2c : mat.visual.surface === 'glass' ? 0xdfe8ea : new Color(mat.visual.tint).multiplyScalar(0.55).getHex();
  const legMat = new MeshStandardMaterial({ color, roughness: 0.8, metalness: mat.visual.metalness * 0.6 });
  const spacing = 9;
  const count = Math.ceil(track.length / spacing) * 2;
  const legs = new InstancedMesh(legGeo, legMat, count);
  const crossGeo = new BoxGeometry(1, 0.3, 0.3);
  const cross = new InstancedMesh(crossGeo, legMat, Math.ceil(track.length / spacing) * 3);
  let li = 0, ci = 0;
  const P = new Vector3(), T = new Vector3(), U = new Vector3(), R = new Vector3();
  const m4 = new Matrix4(), q = new Quaternion(), sc = new Vector3(), pos = new Vector3();
  const W = halfWidth(track.profile) + track.profile.th * 0.5;
  for (let s = 10; s < track.length; s += spacing) {
    const i = Math.round(s / track.ds);
    if (track.gap[i]) continue;
    track.sample(i, P, T, U, R);
    if (U.y < 0.6) continue; // no legs under loops / steep banks — those are self-supporting
    const bottom = P.clone().addScaledVector(U, -track.profile.th);
    for (const side of [-1, 1]) {
      if (U.y < 0.93) break; // banked: legs would pierce the walls; the beam is supported by the centre post
      const top = bottom.clone().addScaledVector(R, side * (W - 0.6));
      const gy = groundHeight(top.x, top.z);
      const h = top.y - gy;
      if (h < 0.5 || h > 400) continue;
      pos.set(top.x, gy + h / 2, top.z);
      q.identity();
      sc.set(1, h, 1);
      m4.compose(pos, q, sc);
      if (li < count) legs.setMatrixAt(li++, m4);
    }
    if (U.y < 0.93) {
      // banked section: one central post under the keel
      const gy = groundHeight(bottom.x, bottom.z);
      const h = bottom.y - gy;
      if (h > 0.5 && h < 400 && li < count) {
        pos.set(bottom.x, gy + h / 2, bottom.z); q.identity(); sc.set(1.3, h, 1.3);
        m4.compose(pos, q, sc); legs.setMatrixAt(li++, m4);
      }
    }
    // cross beam under the gutter, aligned with the gutter's own frame
    const basis = new Matrix4().makeBasis(R, U, T.clone().negate());
    q.setFromRotationMatrix(basis);
    sc.set(W * 2 + 0.4, 1, 1);
    m4.compose(bottom.clone().addScaledVector(U, -0.2), q, sc);
    if (ci < cross.count) cross.setMatrixAt(ci++, m4);
    // horizontal braces between the legs every 12 m of height
    if (U.y > 0.93) {
      const gyc = groundHeight(P.x, P.z);
      const yawQ = new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), Math.atan2(-R.z, R.x));
      for (let hh = 10; hh < P.y - gyc - 4; hh += 12) {
        if (ci >= cross.count) break;
        m4.compose(new Vector3(P.x, P.y - hh, P.z), yawQ, sc);
        cross.setMatrixAt(ci++, m4);
      }
    }
  }
  legs.count = li; cross.count = ci;
  legs.castShadow = true;
  legs.instanceMatrix.needsUpdate = true; cross.instanceMatrix.needsUpdate = true;
  g.add(legs, cross);
  return g;
}

function buildRoofs(track: Track, mat: MaterialProfile) {
  // Covered-bridge roof as a flat, rideable deck: its top is exactly where the
  // physics roof is (H + 2.5 * th), so a ball that double-jumps up rolls on it.
  const g = new Group();
  const prof = track.profile;
  const W = halfWidth(prof) + prof.th;
  const top = prof.H + prof.th * 2.5;
  const maps = surfaceMaps(mat.visual.surface, mat.visual.tint);
  const deckMat = new MeshStandardMaterial({ map: maps.map, normalMap: maps.normalMap, roughnessMap: maps.roughnessMap, roughness: 1, color: 0xd8c0a0, side: DoubleSide });
  const underMat = new MeshStandardMaterial({ color: mat.visual.surface === 'wood' ? 0x4a3018 : 0x555555, roughness: 0.95, side: DoubleSide });
  const postMat = new MeshStandardMaterial({ color: 0x4a3018, roughness: 0.9 });
  const P = new Vector3(), T = new Vector3(), U = new Vector3(), R = new Vector3();
  const dPos: number[] = [], dUv: number[] = [], dIdx: number[] = [];
  const uPos: number[] = [], uIdx: number[] = [];
  const postGeo = new BoxGeometry(0.3, 1, 0.3);
  const railGeo = new BoxGeometry(0.18, 0.5, 1);
  const posts: Matrix4[] = [], rails: Matrix4[] = [];
  let prev = -1, prevU = -1;
  const xs = [-W, -W * 0.5, 0, W * 0.5, W];
  for (let i = 0; i < track.n; i += 2) {
    if (!track.tunnel[i]) { prev = -1; prevU = -1; continue; }
    track.sample(i, P, T, U, R);
    const s = i * track.ds;
    const base = dPos.length / 3;
    for (const x of xs) {
      dPos.push(P.x + R.x * x + U.x * top, P.y + R.y * x + U.y * top, P.z + R.z * x + U.z * top);
      dUv.push((x + W) / TILE, s / TILE);
    }
    if (prev >= 0) for (let k = 0; k < xs.length - 1; k++) { const a0 = prev + k, b0 = base + k; dIdx.push(a0, a0 + 1, b0, a0 + 1, b0 + 1, b0); }
    prev = base;
    const ub = uPos.length / 3;
    for (const x of [-W, W]) uPos.push(P.x + R.x * x + U.x * prof.H, P.y + R.y * x + U.y * prof.H, P.z + R.z * x + U.z * prof.H);
    if (prevU >= 0) uIdx.push(prevU, prevU + 1, ub, prevU + 1, ub + 1, ub);
    prevU = ub;
    const basis = new Matrix4().makeBasis(R, U, T.clone().negate());
    if ((i / 2) % 4 === 0) {
      for (const side of [-1, 1]) {
        const m = basis.clone().scale(new Vector3(1, top - prof.H * 0.5, 1));
        m.setPosition(P.clone().addScaledVector(R, side * (W + 0.1)).addScaledVector(U, (top + prof.H * 0.5) * 0.5));
        posts.push(m);
      }
    }
    // low edge rails on the deck so it reads as a path
    for (const side of [-1, 1]) {
      const m = basis.clone().scale(new Vector3(1, 1, track.ds * 2.05));
      m.setPosition(P.clone().addScaledVector(R, side * (W - 0.1)).addScaledVector(U, top + 0.25));
      rails.push(m);
    }
  }
  if (dPos.length) {
    const geo = new BufferGeometry();
    geo.setAttribute('position', new BufferAttribute(new Float32Array(dPos), 3));
    geo.setAttribute('uv', new BufferAttribute(new Float32Array(dUv), 2));
    geo.setIndex(dIdx);
    geo.computeVertexNormals();
    const deck = new Mesh(geo, deckMat);
    deck.castShadow = true; deck.receiveShadow = true;
    g.add(deck);
    const ug = new BufferGeometry();
    ug.setAttribute('position', new BufferAttribute(new Float32Array(uPos), 3));
    ug.setIndex(uIdx);
    ug.computeVertexNormals();
    g.add(new Mesh(ug, underMat));
    const im = new InstancedMesh(postGeo, postMat, posts.length);
    posts.forEach((m, k) => im.setMatrixAt(k, m));
    g.add(im);
    const rm = new InstancedMesh(railGeo, postMat, rails.length);
    rails.forEach((m, k) => rm.setMatrixAt(k, m));
    g.add(rm);
  }
  return g;
}

function stripeTexture() {
  const cv = document.createElement('canvas');
  cv.width = 128; cv.height = 128;
  const c = cv.getContext('2d')!;
  c.fillStyle = '#f3efe6'; c.fillRect(0, 0, 128, 128);
  c.fillStyle = '#c4352b';
  for (let k = -128; k < 256; k += 32) { c.beginPath(); c.moveTo(k, 0); c.lineTo(k + 16, 0); c.lineTo(k + 16 + 128, 128); c.lineTo(k + 128, 128); c.fill(); }
  const t = new CanvasTexture(cv);
  t.colorSpace = SRGBColorSpace;
  return t;
}

function buildObstacles(track: Track, mat: MaterialProfile) {
  const g = new Group();
  const stripes = stripeTexture();
  const P = new Vector3(), T = new Vector3(), U = new Vector3(), R = new Vector3();
  for (const o of track.obstacles) {
    track.frameAtS(o.s, P, T, U, R);
    const geo = new BoxGeometry(o.w, o.h, o.ls);
    const m = new MeshStandardMaterial({ map: stripes, roughness: 0.6, color: 0xffffff });
    const side = new MeshStandardMaterial({ color: mat.visual.surface === 'wood' ? 0x7a5230 : 0x555555, roughness: 0.7 });
    // stripes on front/back faces (+z/-z in box space), plain elsewhere
    const mesh = new Mesh(geo, [side, side, side, side, m, m]);
    const basis = new Matrix4().makeBasis(R, U, T.clone().negate());
    mesh.quaternion.setFromRotationMatrix(basis);
    mesh.position.copy(P).addScaledVector(R, o.x).addScaledVector(U, o.y + o.h / 2);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    g.add(mesh);
  }
  return g;
}

function labelTexture(text: string) {
  const cv = document.createElement('canvas');
  cv.width = 1024; cv.height = 160;
  const c = cv.getContext('2d')!;
  c.fillStyle = text === 'FINISH' ? '#1b1b1b' : '#2b4a2a';
  c.fillRect(0, 0, 1024, 160);
  if (text === 'FINISH') {
    for (let x = 0; x < 1024; x += 40) for (let y = 0; y < 160; y += 40) if (((x + y) / 40) % 2 === 0) { c.fillStyle = '#f2f2f2'; c.fillRect(x, y, 40, 40); }
    c.fillStyle = 'rgba(0,0,0,0.75)'; c.fillRect(280, 20, 464, 120);
  }
  c.fillStyle = '#ffffff';
  c.font = 'bold 96px system-ui, sans-serif';
  c.textAlign = 'center'; c.textBaseline = 'middle';
  c.fillText(text, 512, 84);
  const t = new CanvasTexture(cv);
  t.colorSpace = SRGBColorSpace;
  return t;
}

function buildArch(track: Track, s: number, text: string, mat: MaterialProfile) {
  const g = new Group();
  const P = new Vector3(), T = new Vector3(), U = new Vector3(), R = new Vector3();
  track.frameAtS(s, P, T, U, R);
  const W = halfWidth(track.profile) + 0.6;
  const postMat = new MeshStandardMaterial({ color: 0x4a3018, roughness: 0.8 });
  const H = track.profile.H + 3.2;
  for (const side of [-1, 1]) {
    const post = new Mesh(new BoxGeometry(0.5, H, 0.5), postMat);
    post.position.copy(P).addScaledVector(R, side * W).addScaledVector(U, H / 2);
    post.quaternion.setFromRotationMatrix(new Matrix4().makeBasis(R, U, T.clone().negate()));
    post.castShadow = true;
    g.add(post);
  }
  const banner = new Mesh(new PlaneGeometry(W * 2 + 0.5, 1.4), new MeshStandardMaterial({ map: labelTexture(text), side: DoubleSide, roughness: 0.7, emissive: 0x111111 }));
  banner.position.copy(P).addScaledVector(U, H - 0.7);
  banner.quaternion.setFromRotationMatrix(new Matrix4().makeBasis(R, U, T.clone().negate()));
  g.add(banner);
  void mat;
  return g;
}

function buildCheckpointPosts(track: Track, s: number) {
  const g = new Group();
  const P = new Vector3(), T = new Vector3(), U = new Vector3(), R = new Vector3();
  track.frameAtS(s, P, T, U, R);
  const W = halfWidth(track.profile) + 0.4;
  const m = new MeshStandardMaterial({ color: 0x35d0ff, emissive: 0x0a6a8a, roughness: 0.4 });
  for (const side of [-1, 1]) {
    const post = new Mesh(new CylinderGeometry(0.12, 0.12, 2.2, 8), m);
    post.position.copy(P).addScaledVector(R, side * W).addScaledVector(U, track.profile.H + 1.1);
    post.quaternion.setFromRotationMatrix(new Matrix4().makeBasis(R, U, T.clone().negate()));
    g.add(post);
  }
  return g;
}
