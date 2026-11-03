import {
  AmbientLight, BufferAttribute, Color, ConeGeometry, CylinderGeometry, DirectionalLight, FogExp2, Group, HemisphereLight,
  IcosahedronGeometry, InstancedMesh, Matrix4, Mesh, MeshStandardMaterial, PlaneGeometry, PMREMGenerator, Quaternion,
  Scene, Vector3, WebGLRenderer, BoxGeometry, Texture, MathUtils, ShaderMaterial, BackSide, SphereGeometry,
} from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import type { Track } from '../track/track';
import type { MaterialProfile } from '../physics/materials';

/**
 * Environment: sky, sun, fog, terrain and scenery. Terrain heights are built
 * around the track so the gutter always rides high above a valley.
 */
export interface World {
  group: Group;
  sun: DirectionalLight;
  envMap: Texture;
  groundHeight: (x: number, z: number) => number;
  sunDir: Vector3;
}

function hash(x: number, z: number) {
  const s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453;
  return s - Math.floor(s);
}
function vnoise(x: number, z: number) {
  const xi = Math.floor(x), zi = Math.floor(z);
  const fx = x - xi, fz = z - zi;
  const sx = fx * fx * (3 - 2 * fx), sz = fz * fz * (3 - 2 * fz);
  const a = hash(xi, zi), b = hash(xi + 1, zi), c = hash(xi, zi + 1), d = hash(xi + 1, zi + 1);
  return a + (b - a) * sx + (c - a) * sz + (a - b - c + d) * sx * sz;
}
function fbm2(x: number, z: number) {
  let s = 0, a = 0.5, f = 1;
  for (let i = 0; i < 5; i++) { s += vnoise(x * f, z * f) * a; a *= 0.5; f *= 2.03; }
  return s;
}

export function buildWorld(scene: Scene, renderer: WebGLRenderer, track: Track, mat: MaterialProfile, quality: 'low' | 'high'): World {
  const group = new Group();
  const vis = mat.visual;

  // ---- Sky + sun ----
  const sky = new Sky();
  sky.scale.setScalar(4500);
  const u = sky.material.uniforms;
  u['turbidity'].value = vis.sky.turbidity;
  u['rayleigh'].value = vis.sky.rayleigh;
  u['mieCoefficient'].value = 0.005;
  u['mieDirectionalG'].value = 0.8;
  const phi = MathUtils.degToRad(90 - vis.sky.elevation);
  const theta = MathUtils.degToRad(vis.sky.azimuth);
  const sunDir = new Vector3().setFromSphericalCoords(1, phi, theta);
  u['sunPosition'].value.copy(sunDir);

  // Environment map for reflections: a controlled gradient sky (zenith, horizon,
  // ground) plus a sun disc. The physical Sky shader is HDR-bright and would
  // blow out image-based lighting, so it is used for the visible dome only.
  const pmrem = new PMREMGenerator(renderer);
  const envScene = new Scene();
  const zenith = new Color(vis.fog).lerp(new Color(0x3a6ea8), vis.sky.elevation < 2 ? 0.2 : 0.6);
  const horizon = new Color(vis.fog);
  const groundC = new Color(vis.ground).multiplyScalar(0.6);
  const envMat = new ShaderMaterial({
    side: BackSide, depthWrite: false,
    uniforms: { uZ: { value: zenith }, uH: { value: horizon }, uG: { value: groundC }, uSun: { value: sunDir.clone() }, uSunI: { value: vis.sky.elevation < 2 ? 2 : 14 } },
    vertexShader: `varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `uniform vec3 uZ, uH, uG, uSun; uniform float uSunI; varying vec3 vD;
      void main(){ vec3 d = normalize(vD); float y = d.y;
        vec3 c = y > 0.0 ? mix(uH, uZ, pow(y, 0.6)) : mix(uH * 0.9, uG, pow(-y, 0.35));
        float s = max(dot(d, normalize(uSun)), 0.0);
        c += vec3(1.0, 0.95, 0.85) * (pow(s, 900.0) * uSunI + pow(s, 12.0) * 0.25);
        gl_FragColor = vec4(c, 1.0); }`,
  });
  envScene.add(new Mesh(new SphereGeometry(100, 48, 24), envMat));
  const envMap = pmrem.fromScene(envScene, 0.0).texture;
  pmrem.dispose();
  scene.environment = envMap;
  scene.environmentIntensity = 1.0;
  group.add(sky);

  scene.fog = new FogExp2(vis.fog, vis.fogDensity);
  scene.background = new Color(vis.fog);

  const night = vis.sky.elevation < 2;
  const sun = new DirectionalLight(night ? 0x8aa0ff : 0xfff1dc, night ? 0.6 : 3.2);
  sun.position.copy(sunDir).multiplyScalar(80);
  sun.castShadow = quality === 'high';
  if (sun.castShadow) {
    sun.shadow.mapSize.set(2048, 2048);
    const c = sun.shadow.camera;
    c.left = -28; c.right = 28; c.top = 28; c.bottom = -28; c.near = 1; c.far = 220;
    sun.shadow.bias = -0.0004;
    sun.shadow.normalBias = 0.03;
  }
  group.add(sun, sun.target);
  group.add(new HemisphereLight(night ? 0x3040a0 : 0xdbeaff, new Color(vis.ground).lerp(new Color(vis.tint), 0.5), night ? 0.5 : 0.8));

  // ---- Terrain built around the track ----
  // Coarse list of track points for distance queries
  const pts: Array<[number, number, number]> = [];
  let minX = 1e9, maxX = -1e9, minZ = 1e9, maxZ = -1e9, minY = 1e9;
  for (let i = 0; i < track.n; i += 8) {
    const k = i * 3;
    const x = track.P[k], y = track.P[k + 1], z = track.P[k + 2];
    pts.push([x, y, z]);
    minX = Math.min(minX, x); maxX = Math.max(maxX, x); minZ = Math.min(minZ, z); maxZ = Math.max(maxZ, z); minY = Math.min(minY, y);
  }
  // uniform grid acceleration for nearest-track lookups
  const cell = 40;
  const gx0 = minX - 600, gz0 = minZ - 600;
  const gw = Math.ceil((maxX - minX + 1200) / cell), gh = Math.ceil((maxZ - minZ + 1200) / cell);
  const grid: number[][] = Array.from({ length: gw * gh }, () => []);
  pts.forEach((p, i) => {
    const cx = Math.floor((p[0] - gx0) / cell), cz = Math.floor((p[2] - gz0) / cell);
    grid[cz * gw + cx]?.push(i);
  });
  const nearest = (x: number, z: number): [number, number] => {
    const cx = Math.floor((x - gx0) / cell), cz = Math.floor((z - gz0) / cell);
    let best = 1e12, by = minY;
    for (let rad = 0; rad < 6; rad++) {
      for (let dz = -rad; dz <= rad; dz++) for (let dx = -rad; dx <= rad; dx++) {
        if (Math.max(Math.abs(dx), Math.abs(dz)) !== rad) continue;
        const list = grid[(cz + dz) * gw + (cx + dx)];
        if (!list) continue;
        for (const i of list) {
          const p = pts[i];
          const d = (p[0] - x) ** 2 + (p[2] - z) ** 2;
          if (d < best) { best = d; by = p[1]; }
        }
      }
      if (best < (rad * cell) ** 2) break;
    }
    return [Math.sqrt(best), by];
  };
  const valley = scenerySettings(vis.scenery);
  const groundHeight = (x: number, z: number) => {
    const [d, ty] = nearest(x, z);
    const n = fbm2(x * 0.004, z * 0.004);
    const far = minY - 30 + n * valley.mountain + Math.max(0, d - 120) * valley.rise;
    const near = ty - valley.clearance - n * 10;
    const t = MathUtils.smoothstep(d, 30, 220);
    return near * (1 - t) + Math.max(near, far) * t;
  };

  const size = Math.max(maxX - minX, maxZ - minZ) + 1400;
  const res = quality === 'high' ? 220 : 140;
  const tgeo = new PlaneGeometry(size, size, res, res);
  tgeo.rotateX(-Math.PI / 2);
  const cxm = (minX + maxX) / 2, czm = (minZ + maxZ) / 2;
  const tp = tgeo.attributes.position as BufferAttribute;
  const colors = new Float32Array(tp.count * 3);
  const base = new Color(vis.ground);
  const alt = new Color(valley.altColor ?? vis.ground);
  for (let i = 0; i < tp.count; i++) {
    const x = tp.getX(i) + cxm, z = tp.getZ(i) + czm;
    const y = groundHeight(x, z);
    tp.setXYZ(i, x, y, z);
    const k = MathUtils.clamp(fbm2(x * 0.02, z * 0.02) * 1.4 - 0.2, 0, 1);
    const c = base.clone().lerp(alt, k);
    colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
  }
  tgeo.setAttribute('color', new BufferAttribute(colors, 3));
  tgeo.computeVertexNormals();
  const terrain = new Mesh(tgeo, new MeshStandardMaterial({ vertexColors: true, roughness: 0.95, metalness: 0 }));
  terrain.receiveShadow = true;
  terrain.name = 'terrain';
  group.add(terrain);

  // ---- Scenery instances ----
  group.add(buildScenery(vis.scenery, groundHeight, nearest, [minX - 500, maxX + 500, minZ - 500, maxZ + 500], quality));

  scene.add(group);
  return { group, sun, envMap, groundHeight, sunDir };
}

function scenerySettings(s: string) {
  switch (s) {
    case 'forest': return { clearance: 26, mountain: 260, rise: 0.35, altColor: 0x5d7a3e };
    case 'glacier': case 'alpine': return { clearance: 30, mountain: 380, rise: 0.5, altColor: 0xc9d6e2 };
    case 'desert': case 'canyon': return { clearance: 40, mountain: 200, rise: 0.25, altColor: 0xb7784a };
    case 'tropical': case 'jungle': return { clearance: 22, mountain: 180, rise: 0.3, altColor: 0x356b33 };
    case 'neon': return { clearance: 40, mountain: 80, rise: 0.1, altColor: 0x101425 };
    default: return { clearance: 35, mountain: 120, rise: 0.2, altColor: 0x5a5a5a };
  }
}

function buildScenery(kind: string, gh: (x: number, z: number) => number, nearest: (x: number, z: number) => [number, number], b: number[], quality: 'low' | 'high') {
  const g = new Group();
  const count = quality === 'high' ? 3200 : 1500;
  const m4 = new Matrix4(), q = new Quaternion(), sc = new Vector3(), p = new Vector3();
  let rs = 12345;
  const rnd = () => { rs = (rs * 1664525 + 1013904223) >>> 0; return rs / 4294967296; };
  const place = (inst: InstancedMesh, minDist: number, sMin: number, sMax: number, yOff = 0, nearBias = 1) => {
    let n = 0;
    for (let tries = 0; tries < inst.count * 6 && n < inst.count; tries++) {
      // bias placement toward the track so the run feels dense
      const x = b[0] + rnd() * (b[1] - b[0]);
      const z = b[2] + rnd() * (b[3] - b[2]);
      const [d, ty] = nearest(x, z);
      if (d < minDist) continue;
      if (d > 260 && rnd() < 0.7 * nearBias) continue;
      const y = gh(x, z);
      if (y > ty - 3 && d < 25) continue;
      const s = sMin + rnd() * (sMax - sMin);
      p.set(x, y + yOff * s, z);
      q.setFromAxisAngle(new Vector3(0, 1, 0), rnd() * Math.PI * 2);
      sc.set(s, s * (0.8 + rnd() * 0.5), s);
      m4.compose(p, q, sc);
      inst.setMatrixAt(n++, m4);
    }
    inst.count = n;
    inst.instanceMatrix.needsUpdate = true;
  };
  if (kind === 'forest' || kind === 'alpine' || kind === 'glacier' || kind === 'jungle' || kind === 'tropical') {
    const conifer = kind !== 'tropical' && kind !== 'jungle';
    const leafColor = kind === 'alpine' || kind === 'glacier' ? 0x2f4a3a : kind === 'forest' ? 0x2e5a2c : 0x2f7a2a;
    const canopyGeo = conifer ? new ConeGeometry(2.6, 9, 7) : new IcosahedronGeometry(3.4, 0);
    canopyGeo.translate(0, conifer ? 8.5 : 8, 0);
    const trunkGeo = new CylinderGeometry(0.35, 0.5, conifer ? 5 : 8, 6);
    trunkGeo.translate(0, conifer ? 2.5 : 4, 0);
    const canopy = new InstancedMesh(canopyGeo, new MeshStandardMaterial({ color: leafColor, roughness: 0.9, flatShading: true }), count);
    const trunk = new InstancedMesh(trunkGeo, new MeshStandardMaterial({ color: 0x4b3320, roughness: 1 }), count);
    place(canopy, 10, 0.8, 1.9);
    // copy matrices
    for (let i = 0; i < canopy.count; i++) { canopy.getMatrixAt(i, m4); trunk.setMatrixAt(i, m4); }
    trunk.count = canopy.count; trunk.instanceMatrix.needsUpdate = true;
    canopy.castShadow = quality === 'high';
    if (kind === 'alpine' || kind === 'glacier') {
      // snow caps
      const capGeo = new ConeGeometry(1.4, 3.5, 7); capGeo.translate(0, 11.3, 0);
      const caps = new InstancedMesh(capGeo, new MeshStandardMaterial({ color: 0xf4f8fb, roughness: 0.9, flatShading: true }), canopy.count);
      for (let i = 0; i < canopy.count; i++) { canopy.getMatrixAt(i, m4); caps.setMatrixAt(i, m4); }
      g.add(caps);
    }
    g.add(canopy, trunk);
    // rocks
    const rocks = new InstancedMesh(new IcosahedronGeometry(1.5, 0), new MeshStandardMaterial({ color: 0x77736c, roughness: 1, flatShading: true }), 400);
    place(rocks, 8, 0.6, 3, 0.2);
    g.add(rocks);
  } else if (kind === 'city' || kind === 'industrial' || kind === 'temple' || kind === 'neon') {
    const col = kind === 'temple' ? 0xd9cfbd : kind === 'neon' ? 0x141a30 : kind === 'city' ? 0x9c9890 : 0x3b4048;
    const geo = kind === 'temple' ? new CylinderGeometry(1.4, 1.6, 18, 12) : new BoxGeometry(10, 30, 10);
    geo.translate(0, kind === 'temple' ? 9 : 15, 0);
    const mat = new MeshStandardMaterial({ color: col, roughness: 0.8, metalness: kind === 'industrial' ? 0.6 : 0, emissive: kind === 'neon' ? 0x2a1050 : 0x000000 });
    const inst = new InstancedMesh(geo, mat, kind === 'temple' ? 900 : 600);
    place(inst, 16, kind === 'temple' ? 0.8 : 0.6, kind === 'temple' ? 1.4 : 3.2);
    g.add(inst);
    if (kind === 'neon') {
      const strip = new InstancedMesh(new BoxGeometry(10.4, 0.4, 10.4), new MeshStandardMaterial({ color: 0xff2bd6, emissive: 0xff2bd6, emissiveIntensity: 2 }), inst.count);
      for (let i = 0; i < inst.count; i++) { inst.getMatrixAt(i, m4); m4.multiply(new Matrix4().makeTranslation(0, 22, 0)); strip.setMatrixAt(i, m4); }
      g.add(strip);
    }
  } else if (kind === 'desert' || kind === 'canyon') {
    const geo = new CylinderGeometry(6, 9, 40, 7);
    geo.translate(0, 18, 0);
    const mesas = new InstancedMesh(geo, new MeshStandardMaterial({ color: 0xb3693b, roughness: 1, flatShading: true }), 260);
    place(mesas, 30, 0.6, 2.4);
    const cactus = new InstancedMesh(new CylinderGeometry(0.4, 0.5, 4, 6).translate(0, 2, 0), new MeshStandardMaterial({ color: 0x4f7a3a, roughness: 0.9 }), 500);
    place(cactus, 8, 0.7, 1.6);
    g.add(mesas, cactus);
  }
  return g;
}
