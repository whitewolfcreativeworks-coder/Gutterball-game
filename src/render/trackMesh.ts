import {
  BoxGeometry, BackSide, Object3D, ShaderMaterial, UniformsLib, MeshBasicMaterial, BufferAttribute, BufferGeometry, CylinderGeometry, DoubleSide, Group, InstancedMesh, Matrix4,
  Mesh, MeshStandardMaterial, MeshPhysicalMaterial, Quaternion, Vector3, Color, CanvasTexture, SRGBColorSpace, PlaneGeometry, TorusGeometry, AdditiveBlending, EdgesGeometry, LineSegments, LineBasicMaterial,
} from 'three';
import { TrackProjector, type Track } from '../track/track';
import { profileRing, halfWidth } from '../track/profile';
import type { MaterialProfile } from '../physics/materials';
import { SKY_THEMES } from './sky';
import { surfaceMaps, TILE } from './textures';
import { applyFractal, FRACTAL_THEMES, FractalUniforms } from './fractal';

/**
 * Builds the visible gutter from the same frames and profile the physics
 * uses, so what you see is exactly what the ball rolls on.
 */
export function buildTrackGroup(track: Track, mat: MaterialProfile, groundHeight: (x: number, z: number) => number, isBranch = false, junctions?: { s0: number; s1: number; other: Track }[], allTracks?: Track[], quality: 'low' | 'high' = 'high'): Group {
  const g = new Group();
  const vis = mat.visual;
  const maps = surfaceMaps(vis.surface, vis.tint);
  const glass = vis.transparent && vis.surface === 'glass';
  const surfaceMat = glass && quality === 'high'
    // REAL GLASS (three.js physical transmission): the world behind is refracted
    // through the gutter, tinted by its thickness, with bright fresnel edges,
    // a clearcoat and a faint oil-slick iridescence
    ? new MeshPhysicalMaterial({
      color: 0xffffff, roughness: 0.04, metalness: 0, transmission: 1, thickness: 0.9, ior: 1.5,
      attenuationColor: new Color(vis.tint).multiplyScalar(0.55), attenuationDistance: 2.2,
      clearcoat: 1, clearcoatRoughness: 0.03, specularIntensity: 1,
      side: DoubleSide, normalMap: maps.normalMap, envMapIntensity: 1.4,
    })
    : glass
    ? new MeshPhysicalMaterial({ color: vis.tint, roughness: vis.roughness, metalness: 0, transmission: 0.0, transparent: true, opacity: vis.opacity ?? 0.4, side: DoubleSide, normalMap: maps.normalMap, depthWrite: true, envMapIntensity: 0.35 })
    : new MeshStandardMaterial({
      map: maps.map, normalMap: maps.normalMap, roughnessMap: maps.roughnessMap, roughness: 1, metalness: vis.metalness,
      transparent: !!vis.transparent && vis.surface !== 'grating', opacity: vis.opacity ?? 1,
      alphaTest: maps.alphaMap ? 0.5 : 0, side: DoubleSide,
    });
  if (maps.alphaMap) (surfaceMat as MeshStandardMaterial).alphaMap = maps.alphaMap;
  if (maps.map) { (surfaceMat as MeshStandardMaterial).color?.set(0xffffff); }

  const prof = track.profile;
  // Ring of the cross-section at a given tube curl: inner surface (part 0),
  // then the rim, outer shell and other rim (part 1). Every curl gives the same
  // vertex count, so rows of an open gutter and a closed pipe stitch together.
  type RingPt = { x: number; y: number; nx: number; ny: number; u: number; part: 0 | 1 };
  const ringCache2 = new Map<string, RingPt[]>();
  const ringFor = (curl: number, hL = prof.H, hR = prof.H, widen = 1): RingPt[] => {
    const kc = Math.round(curl * 200), kl = Math.round(hL * 4), kr = Math.round(hR * 4), kw = Math.round(widen * 50);
    const key = `${kc}|${kl}|${kr}|${kw}`;
    const hit = ringCache2.get(key);
    if (hit) return hit;
    const pw = kw === 50 ? prof : { ...prof, a: prof.a * (kw / 50) };
    const { pts: inner, nrm: nIn } = profileRing(pw, kc / 200, 12, 14, kl / 4, kr / 4);
    const outer = inner.map((p, i) => [p[0] - nIn[i][0] * prof.th, p[1] - nIn[i][1] * prof.th] as [number, number]);
    const ring: RingPt[] = [];
    let u = 0;
    for (let i = 0; i < inner.length; i++) {
      if (i > 0) u += Math.hypot(inner[i][0] - inner[i - 1][0], inner[i][1] - inner[i - 1][1]);
      ring.push({ x: inner[i][0], y: inner[i][1], nx: nIn[i][0], ny: nIn[i][1], u, part: 0 });
    }
    // across-coordinate measured from the floor centre (stable as the walls curl)
    const mid = Math.floor(inner.length / 2);
    const u0 = ring[mid].u;
    for (const r of ring) r.u -= u0;
    u -= u0;
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
    ringCache2.set(key, ring);
    return ring;
  };
  const nInner = profileRing(prof, 0, 12, 14).pts.length;

  // Junction carving: drop triangles of this track that lie inside the other
  // track's hollow, so a split pipe is a real opening, not two pipes crossing.
  const carve = (junctions ?? []).map((j) => ({ ...j, proj: new TrackProjector(j.other) }));
  const carved = (ax: number, ay: number, az: number, s: number) => {
    for (const c of carve) {
      if (s < c.s0 || s > c.s1) continue;
      c.proj.relocate(ax, ay, az);
      c.proj.project(ax, ay, az);
      if (Math.abs(c.proj.along) > 1.5 || c.proj.s < 0.2 || c.proj.s > c.other.length - 0.2) continue;
      if (c.other.channelDepthLocal(c.proj.s, c.proj.x, c.proj.y) > 0.03) return true;
    }
    return false;
  };

  const P = new Vector3(), T = new Vector3(), U = new Vector3(), R = new Vector3();
  const positions: number[] = [], normals: number[] = [], uvs: number[] = [], indices: number[] = [], fxuvs: number[] = [], fxmodes: number[] = [];
  const shellPositions: number[] = [], shellNormals: number[] = [], shellUvs: number[] = [], shellIdx: number[] = [];
  const M = ringFor(0).length;
  let runStart = -1;
  const emitRun = (from: number, to: number, step: number) => {
    const baseS = positions.length / 3;
    const baseO = shellPositions.length / 3;
    let rows = 0;
    const rowS: number[] = [];
    for (let i = from; i <= to; i += step) {
      track.sample(i, P, T, U, R);
      const s = i * track.ds;
      const ring = ringFor(track.tubeK[i], track.wallL[i], track.wallR[i], track.widen[i]);
      rowS.push(s);
      for (let k = 0; k < M; k++) {
        const r = ring[k];
        const wx = P.x + R.x * r.x + U.x * r.y, wy = P.y + R.y * r.x + U.y * r.y, wz = P.z + R.z * r.x + U.z * r.y;
        const nx = R.x * r.nx + U.x * r.ny, ny = R.y * r.nx + U.y * r.ny, nz = R.z * r.nx + U.z * r.ny;
        if (r.part === 0) {
          positions.push(wx, wy, wz); normals.push(nx, ny, nz); uvs.push((r.u + 24) / TILE, s / TILE); fxuvs.push(r.u, s);
          fxmodes.push(track.fxMode[i * 3], track.fxMode[i * 3 + 1], track.fxMode[i * 3 + 2], track.tubeK[i]);
        } else {
          shellPositions.push(wx, wy, wz); shellNormals.push(nx, ny, nz); shellUvs.push((r.u + 24) / TILE, s / TILE);
        }
      }
      rows++;
    }
    const nShell = M - nInner;
    const keep = (arr: number[], base: number, a: number, b: number, c: number, s: number) => {
      if (!carve.length) return true;
      const ia = (a - base) * 3, ib = (b - base) * 3, ic = (c - base) * 3;
      const off = base * 3;
      const cx = (arr[off + ia] + arr[off + ib] + arr[off + ic]) / 3;
      const cy = (arr[off + ia + 1] + arr[off + ib + 1] + arr[off + ic + 1]) / 3;
      const cz = (arr[off + ia + 2] + arr[off + ib + 2] + arr[off + ic + 2]) / 3;
      return !carved(cx, cy, cz, s);
    };
    for (let rI = 0; rI < rows - 1; rI++) {
      const sRow = (rowS[rI] + rowS[rI + 1]) / 2;
      const inCarve = carve.some((c) => sRow >= c.s0 - 1 && sRow <= c.s1 + 1);
      for (let k = 0; k < nInner - 1; k++) {
        const a = baseS + rI * nInner + k, b = a + 1, c = a + nInner, d = c + 1;
        if (!inCarve || keep(positions, baseS, a, b, c, sRow)) indices.push(a, b, c);
        if (!inCarve || keep(positions, baseS, b, d, c, sRow)) indices.push(b, d, c);
      }
      for (let k = 0; k < nShell - 1; k++) {
        const a = baseO + rI * nShell + k, b = a + 1, c = a + nShell, d = c + 1;
        if (!inCarve || keep(shellPositions, baseO, a, b, c, sRow)) shellIdx.push(a, b, c);
        if (!inCarve || keep(shellPositions, baseO, b, d, c, sRow)) shellIdx.push(b, d, c);
      }
    }
  };
  for (let i = 0; i < track.n; i++) {
    const isGap = track.gap[i] === 1;
    if (!isGap && runStart < 0) runStart = i;
    if ((isGap || i === track.n - 1) && runStart >= 0) {
      const end = isGap ? i - 1 : i;
      // finer rows where the walls are curling or a junction is carved
      let a = runStart;
      while (a < end) {
        const fine = (track.tubeK[a] > 0 && track.tubeK[a] < 1) || carve.some((c) => a * track.ds >= c.s0 - 2 && a * track.ds <= c.s1 + 2);
        let b = a;
        while (b < end) {
          const f2 = (track.tubeK[b] > 0 && track.tubeK[b] < 1) || carve.some((c) => b * track.ds >= c.s0 - 2 && b * track.ds <= c.s1 + 2);
          if (f2 !== fine) break;
          b++;
        }
        let st = fine ? 1 : 2;
        let to = b - ((b - a) % st);
        if (to <= a) { to = b; st = 1; }
        emitRun(a, to, st);
        a = to;
      }
      runStart = -1;
    }
  }

  const geo = new BufferGeometry();
  geo.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
  geo.setAttribute('normal', new BufferAttribute(new Float32Array(normals), 3));
  geo.setAttribute('uv', new BufferAttribute(new Float32Array(uvs), 2));
  geo.setAttribute('fxuv', new BufferAttribute(new Float32Array(fxuvs), 2));
  geo.setAttribute('fxmode', new BufferAttribute(new Float32Array(fxmodes), 4));
  geo.setIndex(indices);
  geo.computeTangents?.();
  const surf = new Mesh(geo, surfaceMat);
  surf.receiveShadow = true;
  surf.name = 'gutterSurface';
  g.add(surf);
  // Animated fractal glow layer (see fractal.ts)
  const theme = FRACTAL_THEMES[mat.id] ?? FRACTAL_THEMES.wood;
  const centerU = 0;
  const fx: FractalUniforms = { uFxTime: { value: 0 }, uFxIntensity: { value: 0.5 }, uFxSpeed: { value: 0 }, uFxTravel: { value: 0 }, uFxBallDark: { value: 0 } };
  const closed = ringFor(1).filter((r) => r.part === 0);
  applyFractal(surfaceMat, theme, centerU, fx, closed[closed.length - 1].u - closed[0].u);
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
  if (mat.medium === 'water') { const lq = buildLiquid(track, mat); g.add(lq); g.userData.water = lq.userData.water; }

  // ---- Ribs arching over the gutter: they stream past and sell the speed ----
  g.add(buildRibs(track, mat, theme));

  // ---- Supports / trestles ----
  g.add(buildSupports(track, mat, groundHeight, allTracks ?? [track]));

  // ---- Tunnel roofs (covered bridges) ----
  g.add(buildRoofs(track, mat));

  // ---- Obstacles ----
  g.add(buildObstacles(track, mat));
  if (track.pads.length) g.add(buildPads(track));
  // ---- Chain-lift strips ----
  const chain = buildLiftChains(track);
  if (chain) { g.add(chain); g.userData.chain = chain.material; }

  // ---- Start & finish arches ----
  if (!isBranch || track.layout.finishLine) {
    g.add(buildArch(track, isBranch ? 2 : 3, isBranch ? track.layout.name.toUpperCase() : 'START', mat));
    g.add(buildArch(track, track.length - 62, 'FINISH', mat));
    for (const sg of track.layout.signs ?? []) { const st = track.segmentStarts.find((x) => x.label === sg.at); if (st) g.add(buildArch(track, st.s + sg.s, sg.text, mat)); }
    for (let c = 1; c < track.checkpoints.length; c++) if (track.tubeAt(track.checkpoints[c]) === 0) g.add(buildCheckpointPosts(track, track.checkpoints[c]));
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
    if (track.gap[i] || track.tunnel[i] || track.openSky[i] || track.tubeK[i] > 0) continue; // keep fork zones and tubes clear
    if (Math.max(track.wallL[i], track.wallR[i]) > prof.H + 0.4 || track.widen[i] > 1.02) continue; // no arches over built-up corners or bowls
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
  const pos: number[] = [], uv: number[] = [], tan: number[] = [], nrm: number[] = [], idx: number[] = [];
  const P = new Vector3(), T = new Vector3(), U = new Vector3(), R = new Vector3();
  let row = 0;
  for (let i = 0; i < track.n; i += 2) {
    if (track.gap[i]) { row = -1; continue; }
    track.sample(i, P, T, U, R);
    // half-width of the water surface at this depth (inside the fillet; wider in bowls)
    const prof = track.profileAt(i * track.ds);
    const W = depth >= prof.rc ? prof.a + prof.rc : prof.a + Math.sqrt(prof.rc * prof.rc - (prof.rc - depth) ** 2);
    for (const side of [-1, 1]) {
      pos.push(P.x + R.x * W * side + U.x * depth, P.y + R.y * W * side + U.y * depth, P.z + R.z * W * side + U.z * depth);
      uv.push(side < 0 ? 0 : 1, i * track.ds);
      tan.push(T.x, T.y, T.z);
      nrm.push(U.x, U.y, U.z);
    }
    const base = pos.length / 3 - 2;
    if (row > 0) idx.push(base - 2, base, base - 1, base - 1, base, base + 1);
    row = row < 0 ? 1 : row + 1;
  }
  const geo = new BufferGeometry();
  geo.setAttribute('position', new BufferAttribute(new Float32Array(pos), 3));
  geo.setAttribute('uv', new BufferAttribute(new Float32Array(uv), 2));
  geo.setAttribute('aTan', new BufferAttribute(new Float32Array(tan), 3));
  geo.setAttribute('normal', new BufferAttribute(new Float32Array(nrm), 3));
  geo.setIndex(idx);
  const sky = SKY_THEMES[mat.id] ?? SKY_THEMES.water;
  const sunDir = new Vector3().setFromSphericalCoords(1, (90 - mat.visual.sky.elevation) * Math.PI / 180, mat.visual.sky.azimuth * Math.PI / 180);
  const water = new Color(mat.visual.water ?? 0x3fb7c9);
  const m = new ShaderMaterial({
    transparent: true, depthWrite: false, side: DoubleSide, fog: true,
    uniforms: {
      ...UniformsLib.fog,
      uTime: { value: 0 },
      uDeep: { value: water.clone().multiplyScalar(0.35).lerp(new Color(0x05304a), 0.4) },
      uShallow: { value: water.clone().lerp(new Color(0x9ff5e6), 0.35) },
      uZenith: { value: new Color(sky.zenith) },
      uHorizon: { value: new Color(sky.horizon ?? mat.visual.fog) },
      uSun: { value: sunDir },
      uSunCol: { value: new Color(sky.sunColor) },
      uWidth: { value: 6 },
    },
    vertexShader: /* glsl */ `
      attribute vec3 aTan;
      varying vec2 vUv; varying vec3 vN; varying vec3 vT; varying vec3 vW;
      #include <fog_pars_vertex>
      void main() {
        vUv = uv;
        vN = normalize(mat3(modelMatrix) * normal);
        vT = normalize(mat3(modelMatrix) * aTan);
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vW = wp.xyz;
        vec4 mvPosition = viewMatrix * wp;
        gl_Position = projectionMatrix * mvPosition;
        #include <fog_vertex>
      }`,
    fragmentShader: /* glsl */ `
      uniform float uTime, uWidth;
      uniform vec3 uDeep, uShallow, uZenith, uHorizon, uSun, uSunCol;
      varying vec2 vUv; varying vec3 vN; varying vec3 vT; varying vec3 vW;
      #include <fog_pars_fragment>
      float h21(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float vn(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
        return mix(mix(h21(i), h21(i + vec2(1, 0)), f.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), f.x), f.y); }
      // wave height: a few travelling wave trains flowing downstream, plus fine ripples
      float H(vec2 q) {
        float t = uTime;
        float h = 0.0;
        h += 0.10 * sin(q.y * 0.55 - t * 3.2 + sin(q.x * 0.9) * 1.5);
        h += 0.06 * sin(q.y * 1.3 + q.x * 0.7 - t * 4.1);
        h += 0.05 * sin(q.y * 0.9 - q.x * 1.1 - t * 2.7);
        h += 0.045 * (vn(q * vec2(1.6, 0.7) - vec2(0.0, t * 2.4)) - 0.5);
        h += 0.02 * (vn(q * vec2(4.0, 2.2) - vec2(t * 0.3, t * 5.0)) - 0.5);
        return h;
      }
      void main() {
        vec2 q = vec2((vUv.x - 0.5) * 2.0 * uWidth, vUv.y);   // metres: across, along
        float e = 0.08;
        float hx = (H(q + vec2(e, 0.0)) - H(q - vec2(e, 0.0))) / (2.0 * e);
        float hy = (H(q + vec2(0.0, e)) - H(q - vec2(0.0, e))) / (2.0 * e);
        vec3 N0 = normalize(vN), T = normalize(vT), Rr = normalize(cross(T, N0));
        vec3 N = normalize(N0 - Rr * hx * 2.2 - T * hy * 2.2);
        vec3 V = normalize(cameraPosition - vW);
        if (dot(N, V) < 0.0) N = -N;
        float ndv = clamp(dot(N, V), 0.0, 1.0);
        float fres = 0.02 + 0.98 * pow(1.0 - ndv, 5.0);
        vec3 Rf = reflect(-V, N);
        vec3 skyC = mix(uHorizon, uZenith, pow(clamp(Rf.y, 0.0, 1.0), 0.4));
        float spec = pow(max(dot(Rf, normalize(uSun)), 0.0), 260.0) * 6.0 + pow(max(dot(Rf, normalize(uSun)), 0.0), 30.0) * 0.25;
        // body: shallow and bright at the banks, deep in the middle; caustic shimmer
        float across = abs(vUv.x - 0.5) * 2.0;
        vec3 body = mix(uDeep, uShallow, smoothstep(0.35, 1.0, across));
        float caus = pow(vn(q * 1.7 + vec2(0.0, -uTime * 1.5)) * vn(q * 2.3 + vec2(uTime * 0.4, -uTime * 2.0)), 2.0);
        body += uShallow * caus * 0.6;
        vec3 col = mix(body, skyC, fres) + uSunCol * spec;
        // foam: along the banks and on the crests, churned by the flow
        float hh = H(q);
        float fn = vn(q * vec2(2.5, 1.2) - vec2(0.0, uTime * 3.0));
        float foam = smoothstep(0.82, 0.98, across + fn * 0.12) + smoothstep(0.12, 0.2, hh + fn * 0.06) * 0.6;
        col = mix(col, vec3(0.95, 0.98, 1.0), clamp(foam, 0.0, 1.0) * 0.85);
        float alpha = clamp(0.62 + fres * 0.35 + foam * 0.3, 0.0, 0.95);
        gl_FragColor = vec4(col, alpha);
        #include <fog_fragment>
      }`,
  });
  const mesh = new Mesh(geo, m);
  mesh.name = 'liquid';
  mesh.renderOrder = 2;
  mesh.userData.water = m;
  return mesh;
}

/**
 * Is the vertical column at (x, z) from yLow up to yHigh free of every gutter
 * (so a support leg there doesn't stab through a pipe or gutter below it)?
 */
function makeColumnTest(tracks: Track[]) {
  const cell = 12;
  const grid = new Map<string, Array<[Track, number]>>();
  for (const t of tracks) for (let i = 0; i < t.n; i += 2) {
    const k = `${Math.floor(t.P[i * 3] / cell)},${Math.floor(t.P[i * 3 + 2] / cell)}`;
    let l = grid.get(k); if (!l) grid.set(k, (l = [])); l.push([t, i]);
  }
  return (self: Track, sSelf: number, x: number, z: number, yLow: number, yHigh: number) => {
    const cx = Math.floor(x / cell), cz = Math.floor(z / cell);
    for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) {
      const l = grid.get(`${cx + dx},${cz + dz}`);
      if (!l) continue;
      for (const [t, i] of l) {
        if (t === self && Math.abs(i * t.ds - sSelf) < 25) continue;
        // the gutter's body is centred half-way up its walls along its own "up"
        // (off to one side of the floor line when it's banked)
        const top = t.tubeK[i] > 0 ? t.profile.H + t.profile.a + t.profile.rc : t.profile.H;
        const hU = top / 2;
        const cxw = t.P[i * 3] + t.U[i * 3] * hU, cyw = t.P[i * 3 + 1] + t.U[i * 3 + 1] * hU, czw = t.P[i * 3 + 2] + t.U[i * 3 + 2] * hU;
        const rad = Math.max(t.profile.a + t.profile.rc, hU) + 1.5;
        if (Math.hypot(cxw - x, czw - z) < rad && cyw + rad > yLow && cyw - rad < yHigh) return false;
      }
    }
    return true;
  };
}

function buildSupports(track: Track, mat: MaterialProfile, groundHeight: (x: number, z: number) => number, allTracks: Track[]) {
  const colFree = makeColumnTest(allTracks);
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
      if (!colFree(track, s, top.x, top.z, gy, top.y - 0.5)) continue;
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
      if (h > 0.5 && h < 400 && li < count && colFree(track, s, bottom.x, bottom.z, gy, bottom.y - 0.5)) {
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
        if (!colFree(track, s, P.x, P.z, P.y - hh - 1, P.y - hh + 1)) continue;
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

/**
 * Obstacles must read instantly against walls that are full of motion, so
 * they are the opposite of everything around them: STATIC (never animated),
 * one flat saturated colour chosen opposite the world's palette on the
 * colour wheel, a thick black outline that separates them from bright and
 * dark backgrounds alike, and no fog, so they stay crisp at the far end of a tube.
 */
function buildObstacles(track: Track, mat: MaterialProfile) {
  const g = new Group();
  const theme = FRACTAL_THEMES[mat.id] ?? FRACTAL_THEMES.wood;
  const hsl = { h: 0, s: 0, l: 0 };
  new Color(theme.a).getHSL(hsl);
  const hazard = new Color().setHSL((hsl.h + 0.5) % 1, 1.0, 0.52);
  const face = new MeshBasicMaterial({ color: hazard, fog: false });
  const top = new MeshBasicMaterial({ color: hazard.clone().lerp(new Color(0xffffff), 0.35), fog: false });
  const outline = new MeshBasicMaterial({ color: 0x000000, side: BackSide, fog: false });
  const P = new Vector3(), T = new Vector3(), U = new Vector3(), R = new Vector3();
  const movers: Mesh[] = [];
  const slotMat = new MeshBasicMaterial({ color: 0x050505, fog: false });
  // hologram look (after a trigger pad): see-through glowing cyan with bright edges
  const holo = new MeshBasicMaterial({ color: 0x33e8ff, transparent: true, opacity: 0.28, blending: AdditiveBlending, depthWrite: false, fog: false, toneMapped: false });
  const holoUsed = new MeshBasicMaterial({ color: 0x33e8ff, transparent: true, opacity: 0.08, blending: AdditiveBlending, depthWrite: false, fog: false, toneMapped: false });
  const holoEdge = new LineBasicMaterial({ color: 0xaaffff, transparent: true, opacity: 0.9, blending: AdditiveBlending, depthWrite: false, fog: false, toneMapped: false });
  const all: Mesh[] = [];
  const solid = [face, face, top, face, face, face];
  for (let k = 0; k < track.obstacles.length; k++) {
    const o = track.obstacles[k];
    track.frameAtS(o.s, P, T, U, R);
    const geo = new BoxGeometry(o.w, o.h, o.ls);
    // box face order: +x, -x, +y (top), -y, +z, -z
    const mesh = new Mesh(geo, solid);
    const basis = new Matrix4().makeBasis(R, U, T.clone().negate());
    mesh.quaternion.setFromRotationMatrix(basis);
    mesh.position.copy(P).addScaledVector(R, o.x).addScaledVector(U, o.y + o.h / 2);
    mesh.castShadow = true;
    mesh.name = 'obstacle';
    // thick black outline (inverted hull)
    const hull = new Mesh(new BoxGeometry(o.w + 0.36, o.h + 0.36, o.ls + 0.36), outline);
    mesh.add(hull);
    const edges = new LineSegments(new EdgesGeometry(geo), holoEdge);
    edges.visible = false;
    mesh.add(edges);
    mesh.userData.holo = { k, hull, edges, state: 0 };
    all.push(mesh);
    g.add(mesh);
    if (o.move) {
      mesh.userData.mover = { ob: o, base: mesh.position.clone(), R: R.clone() };
      movers.push(mesh);
    }
    if (o.move && Math.abs(o.move.amp) > 1) {
      // MOVING: it slides along a dark slot in the floor that shows its range,
      // so you can judge it from far away
      const slotW = o.w + 2 * Math.abs(o.move.amp) + 0.6;
      const slot = new Mesh(new BoxGeometry(slotW, 0.06, o.ls + 0.8), slotMat);
      slot.quaternion.copy(mesh.quaternion);
      slot.position.copy(P).addScaledVector(R, o.x).addScaledVector(U, o.y + 0.04);
      g.add(slot);
      // bright end stops at both ends of the travel
      for (const sgn of [-1, 1]) {
        const stop = new Mesh(new BoxGeometry(0.25, 0.5, o.ls + 0.8), top);
        stop.quaternion.copy(mesh.quaternion);
        stop.position.copy(P).addScaledVector(R, o.x + sgn * (slotW / 2)).addScaledVector(U, o.y + 0.25);
        g.add(stop);
      }
    }
  }
  g.userData.movers = movers;
  g.userData.holo = { meshes: all, solid, holo, holoUsed, holoEdge };
  return g;
}

/**
 * Trigger pads: glowing diamond panels high on the wall. Amber and pulsing
 * while they wait; cyan once you've rolled over them.
 */
function buildPads(track: Track) {
  const g = new Group();
  const tex = padTexture();
  const chevTex = chevTexCache ?? (chevTexCache = chevronTexture());
  const idle = new MeshBasicMaterial({ map: tex, color: 0xffb020, transparent: true, opacity: 0.9, blending: AdditiveBlending, depthWrite: false, side: DoubleSide, fog: false, toneMapped: false });
  const lit = new MeshBasicMaterial({ map: tex, color: 0x40f0ff, transparent: true, opacity: 1, blending: AdditiveBlending, depthWrite: false, side: DoubleSide, fog: false, toneMapped: false });
  const P = new Vector3(), T = new Vector3(), U = new Vector3(), R = new Vector3();
  const meshes: Mesh[] = [];
  track.pads.forEach((pd, k) => {
    track.frameAtS(pd.s, P, T, U, R);
    const W = track.halfWidthAt(pd.s);
    const m = new Mesh(new PlaneGeometry(pd.len, pd.tall), idle);
    // faces into the channel: x along the course, y up the wall
    const basis = new Matrix4().makeBasis(T.clone().multiplyScalar(-pd.side), U, R.clone().multiplyScalar(-pd.side));
    m.quaternion.setFromRotationMatrix(basis);
    m.position.copy(P).addScaledVector(R, pd.side * (W - 0.05)).addScaledVector(U, pd.y);
    m.userData.pad = k;
    m.renderOrder = 2;
    meshes.push(m);
    g.add(m);
    // guide arrows: three chevrons on the surface tracing the line from the
    // floor up the wall to the pad, pulsing toward it
    const prof = track.profileAt(pd.s);
    const arcTop = prof.a + (prof.rc * Math.PI) / 2 + (pd.y - prof.rc);
    const at = (j: number) => {
      const sj = pd.s - 36 + j * 11;
      const u = prof.a * 0.35 + (arcTop - pd.tall * 0.3 - prof.a * 0.35) * Math.pow(j / 3, 0.85);
      return { sj, u };
    };
    const surf = (sj: number, u: number, pos: Vector3, nrm: Vector3) => {
      const pf = track.profileAt(sj);
      track.frameAtS(sj, P, T, U, R);
      let x: number, y: number, nx: number, ny: number;
      const fil = (pf.rc * Math.PI) / 2;
      if (u <= pf.a) { x = u; y = 0; nx = 0; ny = 1; }
      else if (u <= pf.a + fil) { const th = (u - pf.a) / pf.rc; x = pf.a + pf.rc * Math.sin(th); y = pf.rc - pf.rc * Math.cos(th); nx = -Math.sin(th); ny = Math.cos(th); }
      else { x = pf.a + pf.rc; y = pf.rc + (u - pf.a - fil); nx = -1; ny = 0; }
      pos.copy(P).addScaledVector(R, pd.side * x).addScaledVector(U, y);
      nrm.copy(R).multiplyScalar(pd.side * nx).addScaledVector(U, ny).normalize();
      pos.addScaledVector(nrm, 0.04);
    };
    const chevs: Mesh[] = [];
    const pos = new Vector3(), nrm = new Vector3(), nxt = new Vector3(), n2 = new Vector3();
    for (let j = 0; j < 3; j++) {
      const { sj, u } = at(j);
      const i = Math.round(sj / track.ds);
      if (sj < 2 || track.tubeK[i] > 0 || track.tunnel[i] || track.isGap(sj)) continue;
      const b2 = at(j + 1);
      surf(b2.sj, b2.u, nxt, n2);
      surf(sj, u, pos, nrm);
      const dir = nxt.sub(pos);
      dir.addScaledVector(nrm, -dir.dot(nrm)).normalize();
      const X = new Vector3().crossVectors(dir, nrm);
      const cm = new Mesh(new PlaneGeometry(2.2, 2.2), new MeshBasicMaterial({ map: chevTex, color: 0xffb020, transparent: true, opacity: 0.5, blending: AdditiveBlending, depthWrite: false, side: DoubleSide, fog: false, toneMapped: false }));
      cm.quaternion.setFromRotationMatrix(new Matrix4().makeBasis(X, dir, nrm));
      cm.position.copy(pos);
      cm.userData.j = j;
      chevs.push(cm);
      g.add(cm);
    }
    m.userData.chevs = chevs;
  });
  g.userData.pads = { meshes, idle, lit };
  return g;
}

/** A single chevron pointing "up" the texture (+y). */
function chevronTexture() {
  const cv = document.createElement('canvas');
  cv.width = 128; cv.height = 128;
  const c = cv.getContext('2d')!;
  c.fillStyle = '#000'; c.fillRect(0, 0, 128, 128);
  c.strokeStyle = '#fff'; c.lineWidth = 20; c.lineCap = 'round'; c.lineJoin = 'round';
  c.beginPath(); c.moveTo(22, 92); c.lineTo(64, 40); c.lineTo(106, 92); c.stroke();
  const t = new CanvasTexture(cv);
  t.colorSpace = SRGBColorSpace;
  return t;
}
let chevTexCache: CanvasTexture | null = null;

function padTexture() {
  const cv = document.createElement('canvas');
  cv.width = 256; cv.height = 128;
  const c = cv.getContext('2d')!;
  c.fillStyle = '#000'; c.fillRect(0, 0, 256, 128);
  c.strokeStyle = '#fff'; c.lineJoin = 'round';
  // outer frame
  c.lineWidth = 8; c.strokeRect(10, 10, 236, 108);
  // centre diamond
  c.lineWidth = 10;
  c.beginPath(); c.moveTo(128, 22); c.lineTo(172, 64); c.lineTo(128, 106); c.lineTo(84, 64); c.closePath(); c.stroke();
  c.fillStyle = '#fff'; c.beginPath(); c.moveTo(128, 44); c.lineTo(150, 64); c.lineTo(128, 84); c.lineTo(106, 64); c.closePath(); c.fill();
  // chevrons both sides
  c.lineWidth = 8;
  for (const [x, d] of [[40, 1], [62, 1], [216, -1], [194, -1]] as const) {
    c.beginPath(); c.moveTo(x - 10 * d, 40); c.lineTo(x + 10 * d, 64); c.lineTo(x - 10 * d, 88); c.stroke();
  }
  const t = new CanvasTexture(cv);
  t.colorSpace = SRGBColorSpace;
  return t;
}

/**
 * A chain up the middle of every lift hill: dark links with bright dogs
 * that crawl uphill at the chain's speed.
 */
function buildLiftChains(track: Track): Mesh | null {
  const pos: number[] = [], uv: number[] = [], idx: number[] = [];
  const P = new Vector3(), T = new Vector3(), U = new Vector3(), R = new Vector3();
  let run = false, base = 0;
  for (let i = 0; i < track.n; i += 2) {
    const on = track.lift[i] > 0;
    if (!on) { run = false; continue; }
    track.frameAtS(i * track.ds, P, T, U, R);
    const v0 = pos.length / 3;
    for (const sx of [-0.6, 0.6]) {
      const q = P.clone().addScaledVector(R, sx).addScaledVector(U, 0.035);
      pos.push(q.x, q.y, q.z); uv.push(sx < 0 ? 0 : 1, i * track.ds);
    }
    if (run) idx.push(base, base + 1, v0, base + 1, v0 + 1, v0);
    base = v0; run = true;
  }
  if (!idx.length) return null;
  const geo = new BufferGeometry();
  geo.setAttribute('position', new BufferAttribute(new Float32Array(pos), 3));
  geo.setAttribute('uv', new BufferAttribute(new Float32Array(uv), 2));
  geo.setIndex(idx);
  const m = new ShaderMaterial({
    uniforms: { uScroll: { value: 0 } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: `uniform float uScroll; varying vec2 vUv;
      void main(){
        float s = vUv.y - uScroll;
        float link = step(0.5, fract(s / 0.6));                 // alternating links
        float dog = step(0.92, fract(s / 4.8));                 // a bright dog every few metres
        float edge = smoothstep(0.0, 0.12, vUv.x) * smoothstep(1.0, 0.88, vUv.x);
        vec3 c = mix(vec3(0.05), vec3(0.16), link) + vec3(1.0, 0.75, 0.15) * dog * 1.6;
        gl_FragColor = vec4(c * edge, 1.0);
      }`,
    side: DoubleSide,
  });
  const mesh = new Mesh(geo, m);
  mesh.name = 'liftChain';
  return mesh;
}

/** Slide the moving obstacles to where the physics has them now (and run the lift chains). */
export function updateMovingObstacles(root: Object3D, track: Track) {
  const ch = root.userData?.chain as ShaderMaterial | undefined;
  const wtr = root.userData?.water as ShaderMaterial | undefined;
  if (wtr) wtr.uniforms.uTime.value = track.time;
  if (ch) ch.uniforms.uScroll.value = track.time * 20; // the chain runs at lift speed
  root.traverse((o) => {
    const h = o.userData?.holo;
    if (h && h.meshes) {
      const t = track.time;
      h.holo.opacity = 0.22 + 0.08 * Math.sin(t * 9) + 0.05 * Math.sin(t * 23.7);
      h.holoEdge.opacity = 0.75 + 0.25 * Math.sin(t * 13);
      for (const m of h.meshes as Mesh[]) {
        const st = m.userData.holo;
        const want = track.ghost[st.k] ? (track.holoUsed[st.k] ? 2 : 1) : 0;
        if (want === st.state) continue;
        st.state = want;
        m.material = want === 0 ? h.solid : want === 1 ? h.holo : h.holoUsed;
        st.hull.visible = want === 0;
        st.edges.visible = want === 1;
        m.castShadow = want === 0;
      }
    }
    const pd = o.userData?.pads;
    if (pd) {
      pd.idle.opacity = 0.6 + 0.35 * (0.5 + 0.5 * Math.sin(track.time * 5));
      for (const m of pd.meshes as Mesh[]) {
        const hit = track.padHit[m.userData.pad] === 1;
        m.material = hit ? pd.lit : pd.idle;
        for (const c of m.userData.chevs as Mesh[]) {
          c.visible = !hit;
          if (!hit) (c.material as MeshBasicMaterial).opacity = 0.35 + 0.6 * Math.max(0, Math.sin(track.time * 5 - c.userData.j * 1.1));
        }
      }
    }
    const ms = o.userData?.movers as Mesh[] | undefined;
    if (!ms) return;
    for (const m of ms) {
      const mv = m.userData.mover;
      m.position.copy(mv.base).addScaledVector(mv.R, track.obstacleX(mv.ob) - mv.ob.x);
    }
  });
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
