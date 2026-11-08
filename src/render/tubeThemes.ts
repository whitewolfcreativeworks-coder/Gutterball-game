import {
  AdditiveBlending, BufferAttribute, BufferGeometry, Camera, CanvasTexture, Color, CylinderGeometry, DoubleSide, Group, Matrix4, Mesh,
  PlaneGeometry, Points, RingGeometry, Scene, ShaderMaterial, SRGBColorSpace, Texture, Vector3,
} from 'three';
import type { Course, Track } from '../track/track';
import type { BallPhysics } from '../physics/ball';

/**
 * TUBE THEMES: now and then a tube puts on a show. Everything in a show is a
 * HOLOGRAM: light projected into the pipe, not a painted sticker. Shapes
 * glow and shimmer, with scrolling scanlines, a slight colour split at the
 * edges, glitch bands, and a faint projector beam from the wall. Lasers
 * are soft volumetric beams with hot cores that splash light where they
 * hit the wall.
 *
 *  lasers    a club light show: fans of laser beams sweeping round the tube
 *  fireworks holographic bursts: a flash, a shockwave ring, glittering sparks
 *  haunted   ghosts, skulls, bats and eyes flickering in and out
 *  pinball   JACKPOT, MULTIBALL, 1000… popping up like a pinball backglass
 *  deadday   Day of the Dead: papel picado banners strung across the pipe,
 *            sugar skulls, marigolds and candles glowing
 *  ducky     rubber duckies bobbing past and iridescent bubbles rising
 *
 * Only some tubes (about one in three, at most three per course) get a
 * theme, so the plain fractal tubes stay the main event.
 */
export type TubeTheme = 'lasers' | 'fireworks' | 'haunted' | 'pinball' | 'deadday' | 'ducky';
const ORDER: TubeTheme[] = ['lasers', 'fireworks', 'deadday', 'haunted', 'ducky', 'pinball'];
export interface ThemedTube { track: Track; s0: number; s1: number; theme: TubeTheme }

/** Which tubes get which theme (deterministic per course). */
export function pickThemedTubes(course: Course, worldId: string): ThemedTube[] {
  const ranges: { track: Track; s0: number; s1: number }[] = [];
  for (const t of course.all) {
    let start = -1;
    for (let i = 0; i <= t.n; i++) {
      const on = i < t.n && t.tubeK[i] > 0.9;
      if (on && start < 0) start = i;
      if (!on && start >= 0) {
        const s0 = start * t.ds, s1 = (i - 1) * t.ds;
        if (s1 - s0 >= 90) ranges.push({ track: t, s0, s1 });
        start = -1;
      }
    }
  }
  let h = 0;
  for (const c of worldId) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const out: ThemedTube[] = [];
  ranges.forEach((r, k) => {
    const pick = ranges.length <= 2 ? k === ranges.length - 1 : k % 3 === 1;
    if (pick && out.length < 3) out.push({ ...r, theme: ORDER[(h + out.length) % ORDER.length] });
  });
  return out;
}

// ---------------------------------------------------------------------------
// The hologram look (shared by every projected picture)
// ---------------------------------------------------------------------------
const HOLO_VERT = /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
const HOLO_FRAG = /* glsl */ `
uniform sampler2D uMap; uniform vec3 uTint; uniform float uOpacity, uTime, uGlitch, uSeed;
varying vec2 vUv;
float h1(float x){ return fract(sin(x * 91.7 + uSeed * 13.1) * 43758.5); }
void main(){
  vec2 uv = vUv;
  // glitch: now and then a horizontal band slips sideways
  float band = floor(uv.y * 14.0 + floor(uTime * 9.0) * 3.0);
  float slip = step(0.93 - uGlitch * 0.25, h1(band + floor(uTime * 7.0))) * (h1(band * 1.7) - 0.5) * 0.12;
  uv.x += slip;
  // chromatic split: red and blue pulled a little apart at the edges
  float sp = 0.006 + 0.01 * uGlitch;
  float r = texture2D(uMap, uv + vec2(sp, 0.0)).a;
  float g = texture2D(uMap, uv).a;
  float b = texture2D(uMap, uv - vec2(sp, 0.0)).a;
  vec3 base = texture2D(uMap, uv).rgb;
  vec3 col = base * uTint * g + vec3(r - g, 0.0, b - g) * 0.6 * uTint;
  // scanlines rolling upward, and a brighter sweep passing through
  float scan = 0.72 + 0.28 * sin((uv.y + uTime * 0.35) * 260.0);
  float sweep = smoothstep(0.08, 0.0, abs(fract(uv.y - uTime * 0.6) - 0.5)) * 0.8;
  float a = max(max(r, g), b);
  float flick = 0.88 + 0.12 * sin(uTime * 37.0 + uSeed * 5.0);
  gl_FragColor = vec4(col * (scan + sweep) * 1.6 * flick, a * uOpacity * (0.8 + 0.2 * scan));
}`;

function holoMaterial(map: Texture, tint = new Color(1, 1, 1)) {
  return new ShaderMaterial({
    uniforms: { uMap: { value: map }, uTint: { value: tint }, uOpacity: { value: 0 }, uTime: { value: 0 }, uGlitch: { value: 0 }, uSeed: { value: Math.random() } },
    vertexShader: HOLO_VERT, fragmentShader: HOLO_FRAG,
    transparent: true, blending: AdditiveBlending, depthWrite: false, side: DoubleSide, toneMapped: false, fog: false,
  });
}

/** A soft cone of light from the wall to a hologram (the projector's beam). */
const CONE_FRAG = /* glsl */ `uniform vec3 uTint; uniform float uOpacity, uTime; varying vec2 vUv;
void main(){ float along = vUv.y; float a = (1.0 - along) * 0.35 + 0.05;
  float dust = 0.7 + 0.3 * sin(vUv.x * 40.0 + uTime * 3.0) * sin(along * 30.0 - uTime * 5.0);
  gl_FragColor = vec4(uTint * dust, a * uOpacity * 0.35); }`;

/** A volumetric laser beam: brightest along its core, fading to its edge; a pulse runs along it. */
const BEAM_VERT = /* glsl */ `varying vec3 vN; varying vec3 vV; varying float vY;
void main(){ vN = normalize(normalMatrix * normal); vec4 mv = modelViewMatrix * vec4(position, 1.0); vV = normalize(-mv.xyz); vY = position.y; gl_Position = projectionMatrix * mv; }`;
const BEAM_FRAG = /* glsl */ `uniform vec3 uColor; uniform float uOpacity, uTime, uLen; varying vec3 vN; varying vec3 vV; varying float vY;
void main(){ float f = abs(dot(normalize(vN), normalize(vV)));
  float core = pow(f, 6.0) * 2.4 + pow(f, 1.5) * 0.45;
  float run = 0.75 + 0.25 * sin(vY * 1.4 - uTime * 18.0);
  float tip = smoothstep(uLen * 0.5, uLen * 0.42, abs(vY));
  gl_FragColor = vec4(uColor * core * run, core * uOpacity * tip); }`;

interface Burst { pts: Points; mat: ShaderMaterial; flash: Mesh; flashMat: ShaderMaterial; ring: Mesh; ringMat: ShaderMaterial; age: number; life: number }
interface Holo { mesh: Mesh; mat: ShaderMaterial; cone: Mesh; coneMat: ShaderMaterial; age: number; life: number; base: Vector3; wall: Vector3; kind: TubeTheme; scale: Vector3; bob: number }
interface LaserRing { tube: ThemedTube; sEmit: number; g: Group; beams: { m: Mesh; mat: ShaderMaterial; phase: number; speed: number; spread: number; hit: Mesh; hitMat: ShaderMaterial }[]; emitter: Vector3 }
interface Banner { tube: ThemedTube; g: Group; mats: ShaderMaterial[] }
interface Bubbles { tube: ThemedTube; pts: Points; mat: ShaderMaterial; base: Float32Array; off: Float32Array }

export class TubeThemes {
  readonly tubes: ThemedTube[];
  readonly group = new Group();
  private lasers: LaserRing[] = [];
  private bursts: Burst[] = [];
  private holos: Holo[] = [];
  private banners: Banner[] = [];
  private bubbles: Bubbles[] = [];
  private spawnT = 0;
  private P = new Vector3(); private T = new Vector3(); private U = new Vector3(); private R = new Vector3();
  private tmp = new Vector3(); private tmp2 = new Vector3();
  private tex: Partial<Record<TubeTheme, CanvasTexture[]>> = {};
  active: TubeTheme | null = null;

  constructor(private scene: Scene, course: Course, worldId: string) {
    this.tubes = pickThemedTubes(course, worldId);
    const has = (t: TubeTheme) => this.tubes.some((x) => x.theme === t);
    for (const tb of this.tubes) {
      if (tb.theme === 'lasers') this.buildLasers(tb);
      if (tb.theme === 'deadday') this.buildBanners(tb);
      if (tb.theme === 'ducky') this.buildBubbles(tb);
    }
    if (has('fireworks')) for (let k = 0; k < 7; k++) this.bursts.push(this.makeBurst());
    if (has('haunted')) this.tex.haunted = ['ghost', 'eyes', 'skull', 'bat', 'boo'].map(hauntTexture);
    if (has('pinball')) this.tex.pinball = ['JACKPOT', '1000', 'BONUS', 'EXTRA BALL', '500', 'MULTIBALL', '★', '▲▲▲', 'SUPER', '5000'].map(pinTexture);
    if (has('deadday')) this.tex.deadday = ['skull', 'skull2', 'marigold', 'candle', 'heart'].map(deadTexture);
    if (has('ducky')) this.tex.ducky = ['duck', 'duck2', 'duckBig', 'bubbles'].map(duckTexture);
    if (has('haunted') || has('pinball') || has('deadday') || has('ducky')) {
      const placeholder = this.tex.haunted?.[0] ?? this.tex.pinball?.[0] ?? this.tex.deadday?.[0] ?? this.tex.ducky![0];
      for (let k = 0; k < 14; k++) {
        const mat = holoMaterial(placeholder);
        const mesh = new Mesh(new PlaneGeometry(1, 1), mat); mesh.visible = false; mesh.frustumCulled = false;
        const coneMat = new ShaderMaterial({ uniforms: { uTint: { value: new Color(1, 1, 1) }, uOpacity: { value: 0 }, uTime: { value: 0 } }, vertexShader: HOLO_VERT, fragmentShader: CONE_FRAG, transparent: true, blending: AdditiveBlending, depthWrite: false, side: DoubleSide, toneMapped: false, fog: false });
        const coneGeo = new CylinderGeometry(0.6, 0.05, 1, 16, 1, true); coneGeo.translate(0, 0.5, 0);
        const cone = new Mesh(coneGeo, coneMat); cone.visible = false; cone.frustumCulled = false;
        this.group.add(mesh, cone);
        this.holos.push({ mesh, mat, cone, coneMat, age: 0, life: 0, base: new Vector3(), wall: new Vector3(), kind: 'haunted', scale: new Vector3(1, 1, 1), bob: 0 });
      }
    }
    scene.add(this.group);
  }

  /** Tube axis point and its frame at s. */
  private axisAt(t: Track, s: number, out: Vector3) {
    t.frameAtS(s, this.P, this.T, this.U, this.R);
    return out.copy(this.P).addScaledVector(this.U, t.profile.H);
  }
  private radius(t: Track, s: number) { return t.halfWidthAt(s); }
  /** A point on a circle round the tube axis: angle 0 = right wall, PI/2 = roof. */
  private wallPoint(t: Track, s: number, angle: number, frac: number, out: Vector3) {
    const C = this.axisAt(t, s, out);
    const r = this.radius(t, s) * frac;
    return C.addScaledVector(this.R, Math.cos(angle) * r).addScaledVector(this.U, Math.sin(angle) * r);
  }

  // ---- LASERS: fans of soft beams from emitters on the wall, splashing light where they land ----
  private buildLasers(tb: ThemedTube) {
    const cols = [0xff2a6a, 0x34ff88, 0x2aa8ff, 0xffe23a, 0xc24bff, 0x2affee];
    let k = 0;
    for (let s = tb.s0 + 16; s < tb.s1 - 10; s += 30, k++) {
      const g = new Group(); g.visible = false;
      const t = tb.track, rad = this.radius(t, s);
      const emitAng = -Math.PI / 2 + (k % 2 ? 0.9 : -0.9);           // low on one wall, then the other
      const emitter = this.wallPoint(t, s, emitAng, 0.94, new Vector3());
      const beams: LaserRing['beams'] = [];
      for (let b = 0; b < 5; b++) {
        const col = new Color(cols[(k * 2 + b) % cols.length]);
        const len = rad * 2.2;
        const mat = new ShaderMaterial({ uniforms: { uColor: { value: col }, uOpacity: { value: 1 }, uTime: { value: 0 }, uLen: { value: len } }, vertexShader: BEAM_VERT, fragmentShader: BEAM_FRAG, transparent: true, blending: AdditiveBlending, depthWrite: false, toneMapped: false, fog: false });
        const geo = new CylinderGeometry(0.16, 0.16, len, 12, 1, true); geo.translate(0, len / 2, 0);
        const m = new Mesh(geo, mat); m.frustumCulled = false; m.position.copy(emitter);
        const hitMat = new ShaderMaterial({ uniforms: { uColor: { value: col }, uOpacity: { value: 1 }, uTime: { value: 0 } }, vertexShader: HOLO_VERT,
          fragmentShader: `uniform vec3 uColor; uniform float uOpacity, uTime; varying vec2 vUv; void main(){ float d = length(vUv - 0.5) * 2.0; float a = exp(-d * d * 5.0) * 0.9 + exp(-d * d * 60.0); gl_FragColor = vec4(uColor * 1.6, a * uOpacity * (0.8 + 0.2 * sin(uTime * 31.0))); }`,
          transparent: true, blending: AdditiveBlending, depthWrite: false, side: DoubleSide, toneMapped: false, fog: false });
        const hit = new Mesh(new PlaneGeometry(1.8, 1.8), hitMat); hit.frustumCulled = false;
        g.add(m, hit);
        beams.push({ m, mat, phase: b * 0.42 + k * 0.9, speed: (b % 2 ? -1 : 1) * (0.7 + 0.25 * ((k + b) % 3)), spread: 0.55 + 0.12 * b, hit, hitMat });
      }
      this.group.add(g);
      this.lasers.push({ tube: tb, sEmit: s, g, beams, emitter });
    }
  }

  // ---- DAY OF THE DEAD: papel picado banners strung across the roof ----
  private buildBanners(tb: ThemedTube) {
    const flagTex = ['#ff3d7f', '#ffb000', '#2ad4ff', '#8a4dff', '#3dff8a', '#ff5a2a'].map(papelTexture);
    for (let s = tb.s0 + 12; s < tb.s1 - 8; s += 22) {
      const g = new Group(); g.visible = false;
      const mats: ShaderMaterial[] = [];
      const t = tb.track;
      t.frameAtS(s, this.P, this.T, this.U, this.R);
      const basis = new Matrix4().makeBasis(this.R, this.U, this.T);
      const n = 9;
      for (let i = 0; i < n; i++) {
        // a string of flags hanging in an arc across the upper pipe
        const a = Math.PI * (0.2 + 0.6 * (i + 0.5) / n);
        const p = this.wallPoint(t, s, a, 0.86 - 0.1 * Math.sin(Math.PI * (i + 0.5) / n), new Vector3());
        const mat = holoMaterial(flagTex[i % flagTex.length]);
        mat.uniforms.uOpacity.value = 0.95;
        const flag = new Mesh(new PlaneGeometry(1.5, 1.9), mat);
        flag.position.copy(p).addScaledVector(this.U, -0.8);
        flag.quaternion.setFromRotationMatrix(basis);
        flag.userData = { phase: i * 0.8 + s * 0.1, base: flag.position.clone() };
        flag.frustumCulled = false;
        g.add(flag); mats.push(mat);
      }
      this.group.add(g);
      this.banners.push({ tube: tb, g, mats });
    }
  }

  // ---- RUBBER DUCKY: iridescent bubbles rising through the pipe ----
  private buildBubbles(tb: ThemedTube) {
    const N = 260, t = tb.track;
    const base = new Float32Array(N * 3), off = new Float32Array(N * 2), pos = new Float32Array(N * 3), size = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const s = tb.s0 + Math.random() * (tb.s1 - tb.s0);
      const p = this.wallPoint(t, s, Math.random() * Math.PI * 2, Math.sqrt(Math.random()) * 0.8, new Vector3());
      base[i * 3] = p.x; base[i * 3 + 1] = p.y; base[i * 3 + 2] = p.z;
      off[i * 2] = Math.random() * 10; off[i * 2 + 1] = 0.6 + Math.random() * 1.2;
      size[i] = 0.5 + Math.random() * 1.6;
    }
    pos.set(base);
    const geo = new BufferGeometry();
    geo.setAttribute('position', new BufferAttribute(pos, 3));
    geo.setAttribute('size', new BufferAttribute(size, 1));
    const mat = new ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uOpacity: { value: 0 } },
      vertexShader: `attribute float size; varying float vS; void main(){ vS = size; vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = size * 140.0 / -mv.z; }`,
      fragmentShader: `uniform float uTime, uOpacity; varying float vS;
        void main(){ vec2 c = gl_PointCoord - 0.5; float d = length(c) * 2.0; if (d > 1.0) discard;
          float rim = smoothstep(0.7, 0.98, d) * (1.0 - smoothstep(0.98, 1.0, d));
          float hl = smoothstep(0.25, 0.0, length(c - vec2(-0.18, -0.18)));
          vec3 film = 0.5 + 0.5 * cos(6.2832 * (d * 1.3 + uTime * 0.2 + vS + vec3(0.0, 0.33, 0.67)));
          gl_FragColor = vec4(film * rim * 1.5 + hl, (rim * 0.9 + hl * 0.8 + 0.04) * uOpacity); }`,
      transparent: true, blending: AdditiveBlending, depthWrite: false, toneMapped: false, fog: false,
    });
    const pts = new Points(geo, mat); pts.visible = false; pts.frustumCulled = false;
    this.group.add(pts);
    this.bubbles.push({ tube: tb, pts, mat, base, off });
  }

  // ---- FIREWORKS: a flash, a shockwave ring and glittering sparks ----
  private makeBurst(): Burst {
    const N = 260;
    const dir = new Float32Array(N * 3), spd = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const u = Math.random() * 2 - 1, a = Math.random() * Math.PI * 2, r = Math.sqrt(1 - u * u);
      dir[i * 3] = r * Math.cos(a); dir[i * 3 + 1] = u; dir[i * 3 + 2] = r * Math.sin(a);
      spd[i] = 0.55 + Math.random() * 0.45;
    }
    const geo = new BufferGeometry();
    geo.setAttribute('position', new BufferAttribute(dir, 3));
    geo.setAttribute('spd', new BufferAttribute(spd, 1));
    const mat = new ShaderMaterial({
      uniforms: { uAge: { value: 0 }, uLife: { value: 1.4 }, uSize: { value: 5 }, uColor: { value: new Color(1, 0.5, 0.2) }, uColor2: { value: new Color(1, 1, 1) }, uTime: { value: 0 } },
      vertexShader: `attribute float spd; uniform float uAge, uSize, uLife, uTime; varying float vF; varying float vS;
        void main(){
          float k = 1.0 - exp(-uAge * 3.4);
          vec3 p = position * spd * k * uSize;
          p.y -= 1.4 * uAge * uAge;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = (1.6 + 3.0 * spd) * 110.0 / -mv.z * (1.0 - 0.45 * uAge / uLife);
          vF = 1.0 - uAge / uLife; vS = spd;
        }`,
      fragmentShader: `uniform vec3 uColor, uColor2; uniform float uTime; varying float vF; varying float vS;
        void main(){ vec2 c = gl_PointCoord - 0.5; float d = length(c) * 2.0; if (d > 1.0) discard;
          float core = exp(-d * d * 18.0), halo = exp(-d * d * 3.0) * 0.45;
          float glitter = 0.55 + 0.45 * step(0.5, fract(vS * 53.0 + uTime * 11.0));
          vec3 col = mix(uColor2, uColor, 0.6 + 0.4 * (1.0 - vF));
          gl_FragColor = vec4(col * (core * 2.2 + halo) * glitter, (core + halo) * vF * vF); }`,
      transparent: true, blending: AdditiveBlending, depthWrite: false, toneMapped: false, fog: false,
    });
    const pts = new Points(geo, mat);
    pts.visible = false; pts.frustumCulled = false;
    const flashMat = new ShaderMaterial({ uniforms: { uColor: { value: new Color(1, 1, 1) }, uOpacity: { value: 0 } }, vertexShader: HOLO_VERT,
      fragmentShader: `uniform vec3 uColor; uniform float uOpacity; varying vec2 vUv; void main(){ float d = length(vUv - 0.5) * 2.0; gl_FragColor = vec4(uColor * 2.0, (exp(-d * d * 4.0) + exp(-d * d * 40.0)) * uOpacity); }`,
      transparent: true, blending: AdditiveBlending, depthWrite: false, side: DoubleSide, toneMapped: false, fog: false });
    const flash = new Mesh(new PlaneGeometry(6, 6), flashMat); flash.visible = false; flash.frustumCulled = false;
    const ringMat = new ShaderMaterial({ uniforms: { uColor: { value: new Color(1, 1, 1) }, uOpacity: { value: 0 }, uTime: { value: 0 } }, vertexShader: HOLO_VERT,
      fragmentShader: `uniform vec3 uColor; uniform float uOpacity, uTime; varying vec2 vUv; void main(){ float scan = 0.7 + 0.3 * sin(vUv.x * 80.0 - uTime * 20.0); gl_FragColor = vec4(uColor * 1.8 * scan, uOpacity * scan); }`,
      transparent: true, blending: AdditiveBlending, depthWrite: false, side: DoubleSide, toneMapped: false, fog: false });
    const ring = new Mesh(new RingGeometry(0.92, 1, 64, 1), ringMat); ring.visible = false; ring.frustumCulled = false;
    this.group.add(pts, flash, ring);
    return { pts, mat, flash, flashMat, ring, ringMat, age: 0, life: 1.4 };
  }

  /** Called every frame: run the show for the tube the ball is in. */
  update(ball: BallPhysics, dt: number, time: number, sound?: (kind: TubeTheme | 'firework') => void, camera?: Camera) {
    const tr = ball.track, s = ball.proj.s;
    let here: ThemedTube | null = null;
    for (const tb of this.tubes) if (tb.track === tr && s > tb.s0 - 6 && s < tb.s1 + 4) here = tb;
    this.active = here?.theme ?? null;
    const near = (tb: ThemedTube, before = 90) => tb.track === tr && s > tb.s0 - before && s < tb.s1 + 10;
    // lasers
    for (const lr of this.lasers) {
      const on = near(lr.tube);
      lr.g.visible = on;
      if (!on) continue;
      const t = lr.tube.track;
      for (const b of lr.beams) {
        // sweep a fan across the pipe from the emitter
        const ang = Math.PI / 2 + Math.sin(time * b.speed + b.phase) * b.spread * 1.6;
        const target = this.wallPoint(t, lr.sEmit + Math.sin(time * 0.7 + b.phase) * 6, ang, 0.97, this.tmp);
        const dir = this.tmp2.subVectors(target, lr.emitter);
        const len = dir.length();
        b.m.quaternion.setFromUnitVectors(Y_AXIS, dir.multiplyScalar(1 / len));
        b.m.scale.set(1, len / b.mat.uniforms.uLen.value, 1);
        b.mat.uniforms.uTime.value = time;
        b.mat.uniforms.uOpacity.value = 0.8 + 0.2 * Math.sin(time * 19 + b.phase * 7);
        b.hit.position.copy(target);
        if (camera) b.hit.quaternion.copy(camera.quaternion);
        b.hitMat.uniforms.uTime.value = time;
      }
    }
    // papel picado: flutter
    for (const bn of this.banners) {
      const on = near(bn.tube);
      bn.g.visible = on;
      if (!on) continue;
      for (const f of bn.g.children) {
        const u = f.userData;
        f.position.copy(u.base).addScaledVector(this.U, Math.sin(time * 3 + u.phase) * 0.12);
        f.rotation.z = Math.sin(time * 2.3 + u.phase) * 0.08;
      }
      for (const m of bn.mats) m.uniforms.uTime.value = time;
    }
    // bubbles rise and wobble
    for (const bb of this.bubbles) {
      const on = near(bb.tube, 60);
      bb.pts.visible = on;
      if (!on) continue;
      const fade = here === bb.tube ? 1 : 0.5;
      bb.mat.uniforms.uOpacity.value += (fade - bb.mat.uniforms.uOpacity.value) * Math.min(1, dt * 3);
      bb.mat.uniforms.uTime.value = time;
      const pos = bb.pts.geometry.getAttribute('position') as BufferAttribute;
      const n = pos.count;
      bb.tube.track.frameAtS(s, this.P, this.T, this.U, this.R);
      for (let i = 0; i < n; i++) {
        const ph = bb.off[i * 2], sp = bb.off[i * 2 + 1];
        const rise = ((time * sp + ph) % 6) - 3;
        pos.setXYZ(i, bb.base[i * 3] + this.U.x * rise + Math.sin(time * 2 + ph) * 0.2, bb.base[i * 3 + 1] + this.U.y * rise, bb.base[i * 3 + 2] + this.U.z * rise + Math.cos(time * 1.7 + ph) * 0.2);
      }
      pos.needsUpdate = true;
    }
    // spawners
    this.spawnT -= dt;
    if (here && this.spawnT <= 0) {
      const rate = here.theme === 'fireworks' ? 0.38 : here.theme === 'pinball' ? 0.36 : here.theme === 'haunted' ? 0.5 : here.theme === 'deadday' ? 0.45 : here.theme === 'ducky' ? 0.4 : 1e9;
      if (rate < 1e9) {
        this.spawnT = rate * (0.7 + Math.random() * 0.6);
        const sAhead = s + 22 + Math.random() * 30;
        if (sAhead < here.s1 - 4) {
          if (here.theme === 'fireworks') this.spawnBurst(here.track, sAhead, sound);
          else this.spawnHolo(here.track, sAhead, here.theme, sound);
        }
      }
    }
    for (const b of this.bursts) {
      if (!b.pts.visible) continue;
      b.age += dt;
      b.mat.uniforms.uAge.value = b.age; b.mat.uniforms.uTime.value = time;
      const fk = Math.max(0, 1 - b.age / 0.18);
      b.flashMat.uniforms.uOpacity.value = fk;
      b.flash.visible = fk > 0;
      const rk = Math.min(1, b.age / 0.6);
      b.ring.scale.setScalar(0.5 + rk * 7);
      b.ringMat.uniforms.uOpacity.value = (1 - rk) * 0.9;
      b.ringMat.uniforms.uTime.value = time;
      if (camera) { b.flash.quaternion.copy(camera.quaternion); b.ring.quaternion.copy(camera.quaternion); }
      if (b.age > b.life) { b.pts.visible = false; b.flash.visible = false; b.ring.visible = false; }
    }
    for (const h of this.holos) {
      if (!h.mesh.visible) continue;
      h.age += dt;
      const k = h.age / h.life;
      if (k >= 1) { h.mesh.visible = false; h.cone.visible = false; continue; }
      const env = Math.min(1, h.age / 0.15) * Math.min(1, (1 - k) / 0.25);
      let op = env, glitch = 0.1;
      const pos = this.tmp.copy(h.base);
      if (h.kind === 'haunted') { op *= Math.random() < 0.1 ? 0.2 : 1; glitch = 0.8; }
      if (h.kind === 'pinball') { const pop = 1 + 0.35 * Math.max(0, 1 - h.age / 0.15); h.mesh.scale.copy(h.scale).multiplyScalar(pop); glitch = 0.3; }
      if (h.kind === 'ducky') { pos.y += Math.sin(time * 3 + h.bob) * 0.35; h.mesh.rotation.z = Math.sin(time * 2.4 + h.bob) * 0.15; }
      if (h.kind === 'deadday') { const pulse = 1 + 0.06 * Math.sin(time * 4 + h.bob); h.mesh.scale.copy(h.scale).multiplyScalar(pulse); }
      h.mesh.position.copy(pos);
      if (camera && h.kind !== 'ducky') h.mesh.quaternion.copy(camera.quaternion);
      else if (camera) { const z = h.mesh.rotation.z; h.mesh.quaternion.copy(camera.quaternion); h.mesh.rotateZ(z); }
      h.mat.uniforms.uOpacity.value = op;
      h.mat.uniforms.uTime.value = time;
      h.mat.uniforms.uGlitch.value = glitch;
      // the projector beam from the wall to the picture
      const d = this.tmp2.subVectors(h.mesh.position, h.wall);
      const l = d.length();
      if (l > 0.3) {
        h.cone.position.copy(h.wall);
        h.cone.quaternion.setFromUnitVectors(Y_AXIS, d.multiplyScalar(1 / l));
        h.cone.scale.set(h.scale.x * 0.7, l, h.scale.x * 0.7);
        h.cone.visible = true;
        h.coneMat.uniforms.uOpacity.value = op;
        h.coneMat.uniforms.uTime.value = time;
      }
    }
  }

  private spawnBurst(t: Track, s: number, sound?: (k: TubeTheme | 'firework') => void) {
    const b = this.bursts.find((x) => !x.pts.visible);
    if (!b) return;
    const ang = Math.random() * Math.PI * 2;
    this.wallPoint(t, s, ang, Math.random() * 0.4, b.pts.position);
    b.flash.position.copy(b.pts.position); b.ring.position.copy(b.pts.position);
    b.age = 0; b.life = 1.2 + Math.random() * 0.5;
    b.mat.uniforms.uLife.value = b.life;
    b.mat.uniforms.uSize.value = 4.6 + Math.random() * 2.6;
    const hue = Math.random();
    (b.mat.uniforms.uColor.value as Color).setHSL(hue, 1, 0.55);
    (b.mat.uniforms.uColor2.value as Color).setHSL((hue + 0.12) % 1, 1, 0.75);
    (b.flashMat.uniforms.uColor.value as Color).setHSL(hue, 0.6, 0.85);
    (b.ringMat.uniforms.uColor.value as Color).setHSL((hue + 0.5) % 1, 1, 0.65);
    b.pts.visible = true; b.flash.visible = true; b.ring.visible = true;
    sound?.('firework');
  }

  private spawnHolo(t: Track, s: number, kind: TubeTheme, sound?: (k: TubeTheme | 'firework') => void) {
    const h = this.holos.find((x) => !x.mesh.visible);
    const set = this.tex[kind];
    if (!h || !set) return;
    h.mat.uniforms.uMap.value = set[Math.floor(Math.random() * set.length)];
    const tint = kind === 'haunted' ? 0xb8ffe6 : kind === 'ducky' ? 0xfff2a0 : 0xffffff;
    (h.mat.uniforms.uTint.value as Color).set(tint);
    (h.coneMat.uniforms.uTint.value as Color).set(kind === 'haunted' ? 0x7fffd0 : kind === 'deadday' ? 0xff9a3c : kind === 'ducky' ? 0xffe34a : 0x9fd8ff);
    h.kind = kind;
    h.bob = Math.random() * 10;
    // on the upper walls and roof, where you look while rolling through (duckies bob low on the sides)
    const ang = kind === 'ducky' ? (Math.random() < 0.5 ? -0.25 : Math.PI + 0.25) + (Math.random() - 0.5) * 0.3 : Math.PI * (0.15 + Math.random() * 0.7);
    this.wallPoint(t, s, ang, kind === 'ducky' ? 0.66 : 0.72, h.base);
    this.wallPoint(t, s, ang, 0.98, h.wall);
    const sc = kind === 'haunted' ? 3.4 + Math.random() * 2 : kind === 'pinball' ? 4.4 + Math.random() * 1.4 : kind === 'ducky' ? 2.6 + Math.random() * 1.6 : 3.6 + Math.random() * 1.6;
    h.scale.set(sc * (kind === 'pinball' ? 2 : 1), sc, 1);
    h.mesh.scale.copy(h.scale);
    h.mesh.position.copy(h.base);
    h.age = 0; h.life = kind === 'haunted' ? 1.1 + Math.random() * 0.6 : kind === 'ducky' ? 2.2 : kind === 'deadday' ? 1.8 : 0.95;
    h.mesh.visible = true;
    sound?.(kind);
  }

  dispose() {
    this.scene.remove(this.group);
    this.group.traverse((o) => { const m = o as Mesh; if (m.geometry) m.geometry.dispose(); });
  }
}
const Y_AXIS = new Vector3(0, 1, 0);

// ---------------------------------------------------------------------------
// Hologram pictures (all drawn here, all original). White/coloured light on
// transparent: the hologram shader adds the scanlines and colour split.
// ---------------------------------------------------------------------------
function canvasTex(draw: (c: CanvasRenderingContext2D, w: number, h: number) => void, w = 256, h = 256) {
  const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
  const c = cv.getContext('2d')!;
  draw(c, w, h);
  const t = new CanvasTexture(cv); t.colorSpace = SRGBColorSpace;
  return t;
}

function hauntTexture(kind: string) {
  return canvasTex((c, w, h) => {
    c.fillStyle = '#fff'; c.strokeStyle = '#fff'; c.shadowColor = '#7fffd0'; c.shadowBlur = 16; c.lineWidth = 8;
    const cx = w / 2;
    if (kind === 'ghost') {
      c.beginPath(); c.moveTo(cx - 70, 210); c.lineTo(cx - 70, 110); c.arc(cx, 110, 70, Math.PI, 0); c.lineTo(cx + 70, 210);
      for (let k = 0; k < 4; k++) c.lineTo(cx + 70 - (k + 0.5) * 35, k % 2 ? 210 : 185);
      c.closePath(); c.globalAlpha = 0.55; c.fill(); c.globalAlpha = 1;
      c.globalCompositeOperation = 'destination-out'; c.shadowBlur = 0;
      c.beginPath(); c.ellipse(cx - 25, 105, 11, 17, 0, 0, Math.PI * 2); c.ellipse(cx + 25, 105, 11, 17, 0, 0, Math.PI * 2); c.fill();
      c.beginPath(); c.ellipse(cx, 150, 14, 18, 0, 0, Math.PI * 2); c.fill();
    } else if (kind === 'eyes') {
      for (const dx of [-45, 45]) { c.beginPath(); c.ellipse(cx + dx, 128, 30, 20, 0, 0, Math.PI * 2); c.fill(); }
      c.globalCompositeOperation = 'destination-out'; c.shadowBlur = 0;
      for (const dx of [-45, 45]) { c.beginPath(); c.ellipse(cx + dx + 6, 128, 8, 16, 0, 0, Math.PI * 2); c.fill(); }
    } else if (kind === 'skull') {
      c.globalAlpha = 0.75;
      c.beginPath(); c.arc(cx, 110, 72, Math.PI * 0.85, Math.PI * 2.15); c.lineTo(cx + 40, 200); c.lineTo(cx - 40, 200); c.closePath(); c.fill();
      c.globalAlpha = 1; c.globalCompositeOperation = 'destination-out'; c.shadowBlur = 0;
      c.beginPath(); c.arc(cx - 28, 112, 18, 0, Math.PI * 2); c.arc(cx + 28, 112, 18, 0, Math.PI * 2); c.fill();
      c.beginPath(); c.moveTo(cx, 135); c.lineTo(cx - 10, 158); c.lineTo(cx + 10, 158); c.closePath(); c.fill();
      for (let k = -2; k <= 2; k++) c.fillRect(cx + k * 14 - 4, 178, 8, 18);
    } else if (kind === 'bat') {
      c.beginPath(); c.moveTo(cx, 120);
      c.quadraticCurveTo(cx - 40, 70, cx - 110, 95); c.quadraticCurveTo(cx - 80, 115, cx - 85, 140); c.quadraticCurveTo(cx - 50, 125, cx - 30, 150); c.lineTo(cx, 140);
      c.lineTo(cx + 30, 150); c.quadraticCurveTo(cx + 50, 125, cx + 85, 140); c.quadraticCurveTo(cx + 80, 115, cx + 110, 95); c.quadraticCurveTo(cx + 40, 70, cx, 120);
      c.fill();
    } else {
      c.font = 'bold 110px system-ui, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('BOO', cx, h / 2);
    }
  });
}

function pinTexture(text: string) {
  return canvasTex((c, w, h) => {
    const hue = (text.length * 47) % 360;
    c.strokeStyle = `hsl(${hue},100%,60%)`; c.lineWidth = 10; c.shadowColor = c.strokeStyle; c.shadowBlur = 24;
    c.strokeRect(14, 14, w - 28, h - 28);
    c.fillStyle = '#fff';
    const size = text.length > 6 ? 70 : text.length > 3 ? 92 : 120;
    c.font = `900 ${size}px system-ui, sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText(text, w / 2, h / 2 + 4, w - 50);
  }, 512, 256);
}

/** Day of the Dead: sugar skulls, a marigold, a candle, a heart (original drawings). */
function deadTexture(kind: string) {
  return canvasTex((c, w, h) => {
    const cx = w / 2;
    c.shadowBlur = 18; c.lineWidth = 6;
    if (kind === 'skull' || kind === 'skull2') {
      const main = kind === 'skull' ? '#ffffff' : '#fff1d0';
      c.shadowColor = kind === 'skull' ? '#ff4fd8' : '#4fe3ff';
      c.fillStyle = main;
      c.beginPath(); c.arc(cx, 112, 80, Math.PI * 0.82, Math.PI * 2.18); c.quadraticCurveTo(cx + 50, 215, cx, 222); c.quadraticCurveTo(cx - 50, 215, cx - 61, 160); c.closePath(); c.fill();
      // flowers for eyes, a heart nose, a stitched smile: in colour
      const petals = (x: number, y: number, col: string) => {
        c.fillStyle = col;
        for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; c.beginPath(); c.ellipse(x + Math.cos(a) * 13, y + Math.sin(a) * 13, 9, 6, a, 0, Math.PI * 2); c.fill(); }
        c.fillStyle = '#ffd400'; c.beginPath(); c.arc(x, y, 8, 0, Math.PI * 2); c.fill();
      };
      petals(cx - 32, 115, kind === 'skull' ? '#ff2f8a' : '#2fb6ff');
      petals(cx + 32, 115, kind === 'skull' ? '#8a4dff' : '#ff8a2f');
      c.fillStyle = '#ff3d3d'; c.beginPath(); c.moveTo(cx, 168); c.bezierCurveTo(cx - 16, 150, cx - 4, 140, cx, 152); c.bezierCurveTo(cx + 4, 140, cx + 16, 150, cx, 168); c.fill();
      c.strokeStyle = '#3d1a6e'; c.lineWidth = 4; c.shadowBlur = 0;
      c.beginPath(); c.moveTo(cx - 34, 192); c.quadraticCurveTo(cx, 206, cx + 34, 192); c.stroke();
      for (let k = -3; k <= 3; k++) { c.beginPath(); c.moveTo(cx + k * 10, 188 + Math.abs(k)); c.lineTo(cx + k * 10, 203 - Math.abs(k)); c.stroke(); }
      c.fillStyle = kind === 'skull' ? '#2ad4ff' : '#ff4fd8';
      for (let k = 0; k < 5; k++) { c.beginPath(); c.arc(cx - 40 + k * 20, 62, 5, 0, Math.PI * 2); c.fill(); }
    } else if (kind === 'marigold') {
      c.shadowColor = '#ffb000';
      for (let ring = 3; ring >= 1; ring--) {
        c.fillStyle = ring === 3 ? '#ff7a00' : ring === 2 ? '#ffa300' : '#ffd000';
        const n = 10 + ring * 4, r = ring * 26;
        for (let k = 0; k < n; k++) { const a = k * 2 * Math.PI / n + ring; c.beginPath(); c.ellipse(cx + Math.cos(a) * r, 128 + Math.sin(a) * r, 16, 10, a, 0, Math.PI * 2); c.fill(); }
      }
      c.fillStyle = '#ffe680'; c.beginPath(); c.arc(cx, 128, 16, 0, Math.PI * 2); c.fill();
    } else if (kind === 'candle') {
      c.shadowColor = '#ffcc55';
      c.fillStyle = '#fff4d6'; c.fillRect(cx - 26, 120, 52, 110);
      c.fillStyle = '#ffb347'; c.beginPath(); c.moveTo(cx, 40); c.quadraticCurveTo(cx + 24, 85, cx, 112); c.quadraticCurveTo(cx - 24, 85, cx, 40); c.fill();
      c.fillStyle = '#fffbe0'; c.beginPath(); c.moveTo(cx, 70); c.quadraticCurveTo(cx + 10, 92, cx, 106); c.quadraticCurveTo(cx - 10, 92, cx, 70); c.fill();
    } else {
      c.shadowColor = '#ff2f6a'; c.fillStyle = '#ff2f6a';
      c.beginPath(); c.moveTo(cx, 210); c.bezierCurveTo(cx - 120, 130, cx - 70, 40, cx, 95); c.bezierCurveTo(cx + 70, 40, cx + 120, 130, cx, 210); c.fill();
      c.fillStyle = '#ffd400'; c.shadowBlur = 0;
      for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3; c.beginPath(); c.arc(cx + Math.cos(a) * 30, 130 + Math.sin(a) * 30, 7, 0, Math.PI * 2); c.fill(); }
    }
  });
}

/** Papel picado: a cut-paper flag with a lacy pattern punched through. */
function papelTexture(col: string) {
  return canvasTex((c, w, h) => {
    c.fillStyle = col; c.shadowColor = col; c.shadowBlur = 10;
    c.beginPath(); c.moveTo(10, 8); c.lineTo(w - 10, 8); c.lineTo(w - 10, h - 30);
    for (let k = 0; k < 8; k++) c.lineTo(w - 10 - (k + 0.5) * (w - 20) / 8, k % 2 ? h - 30 : h - 10);
    c.lineTo(10, h - 30); c.closePath(); c.fill();
    c.globalCompositeOperation = 'destination-out'; c.shadowBlur = 0;
    const cx = w / 2, cy = h / 2 - 8;
    c.beginPath(); c.arc(cx, cy, 34, 0, Math.PI * 2); c.fill();
    c.globalCompositeOperation = 'source-over'; c.fillStyle = col;
    for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3; c.beginPath(); c.ellipse(cx + Math.cos(a) * 18, cy + Math.sin(a) * 18, 12, 6, a, 0, Math.PI * 2); c.fill(); }
    c.globalCompositeOperation = 'destination-out';
    c.beginPath(); c.arc(cx, cy, 7, 0, Math.PI * 2); c.fill();
    for (let k = 0; k < 7; k++) { c.beginPath(); c.arc(30 + k * (w - 60) / 6, 30, 6, 0, Math.PI * 2); c.fill(); c.beginPath(); c.arc(30 + k * (w - 60) / 6, h - 52, 5, 0, Math.PI * 2); c.fill(); }
    for (const dx of [-70, 70]) { c.beginPath(); c.moveTo(cx + dx, cy - 22); c.lineTo(cx + dx + 14, cy); c.lineTo(cx + dx, cy + 22); c.lineTo(cx + dx - 14, cy); c.closePath(); c.fill(); }
  }, 256, 320);
}

/** Rubber duckies and a bubble cluster (original drawings). */
function duckTexture(kind: string) {
  return canvasTex((c, w, h) => {
    const cx = w / 2;
    if (kind === 'bubbles') {
      c.shadowColor = '#9ff6ff'; c.shadowBlur = 14; c.lineWidth = 5;
      for (let k = 0; k < 9; k++) {
        const x = 40 + ((k * 73) % 180), y = 40 + ((k * 51) % 180), r = 14 + (k % 4) * 9;
        c.strokeStyle = `hsl(${(k * 40) % 360},100%,75%)`; c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.stroke();
        c.fillStyle = 'rgba(255,255,255,0.9)'; c.beginPath(); c.arc(x - r * 0.35, y - r * 0.35, r * 0.18, 0, Math.PI * 2); c.fill();
      }
      return;
    }
    const big = kind === 'duckBig';
    c.save(); if (kind === 'duck2') { c.translate(w, 0); c.scale(-1, 1); }
    c.shadowColor = '#ffe14a'; c.shadowBlur = 20;
    // body and head
    c.fillStyle = big ? '#ffd21f' : '#ffe14a';
    c.beginPath(); c.ellipse(cx, 175, 92, 55, 0, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.moveTo(cx + 92, 150); c.quadraticCurveTo(cx + 118, 140, cx + 100, 172); c.fill();
    c.beginPath(); c.arc(cx - 40, 98, 50, 0, Math.PI * 2); c.fill();
    // wing
    c.fillStyle = '#ffc400'; c.beginPath(); c.ellipse(cx + 10, 172, 46, 26, -0.25, 0, Math.PI * 2); c.fill();
    // beak and eye
    c.fillStyle = '#ff7a1a'; c.beginPath(); c.ellipse(cx - 95, 108, 26, 11, 0.12, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#1a1a40'; c.shadowBlur = 0; c.beginPath(); c.arc(cx - 52, 88, 9, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#ffffff'; c.beginPath(); c.arc(cx - 55, 85, 3.5, 0, Math.PI * 2); c.fill();
    if (big) { c.fillStyle = '#2ad4ff'; c.beginPath(); c.arc(cx + 30, 120, 9, 0, Math.PI * 2); c.arc(cx + 52, 104, 6, 0, Math.PI * 2); c.fill(); }
    c.restore();
  });
}
