import {
  AdditiveBlending, BoxGeometry, BufferAttribute, BufferGeometry, CanvasTexture, Color, Group, Matrix4, Mesh, MeshBasicMaterial,
  Points, Scene, ShaderMaterial, SRGBColorSpace, Sprite, SpriteMaterial, Vector3,
} from 'three';
import type { Course, Track } from '../track/track';
import type { BallPhysics } from '../physics/ball';

/**
 * Tube themes: now and then a tube puts on a show.
 *  lasers    — rings of laser beams sweeping round the tube
 *  fireworks — bursts going off in the tube ahead of you
 *  haunted   — ghostly holograms flicker in and out on the walls
 *  pinball   — pinball holograms pop up: JACKPOT, 1000, stars, arrows
 * Only some tubes (about one in three, never more than a couple per course)
 * get a theme, so the plain fractal tubes stay the main event.
 */
export type TubeTheme = 'lasers' | 'fireworks' | 'haunted' | 'pinball';
const ORDER: TubeTheme[] = ['lasers', 'fireworks', 'haunted', 'pinball'];
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

interface Burst { pts: Points; mat: ShaderMaterial; age: number; life: number }
interface Holo { spr: Sprite; mat: SpriteMaterial; age: number; life: number; base: Vector3; kind: TubeTheme }

export class TubeThemes {
  readonly tubes: ThemedTube[];
  readonly group = new Group();
  private laserGroups: { tube: ThemedTube; g: Group; beams: Group[] }[] = [];
  private bursts: Burst[] = [];
  private holos: Holo[] = [];
  private spawnT = 0;
  private P = new Vector3(); private T = new Vector3(); private U = new Vector3(); private R = new Vector3();
  private tex: Record<string, CanvasTexture[]> = {};
  active: TubeTheme | null = null;

  constructor(private scene: Scene, course: Course, worldId: string) {
    this.tubes = pickThemedTubes(course, worldId);
    for (const tb of this.tubes) if (tb.theme === 'lasers') this.buildLasers(tb);
    if (this.tubes.some((t) => t.theme === 'fireworks')) for (let k = 0; k < 7; k++) this.bursts.push(this.makeBurst());
    if (this.tubes.some((t) => t.theme === 'haunted' || t.theme === 'pinball')) {
      this.tex.haunted = ['ghost', 'eyes', 'skull', 'bat', 'boo'].map(hauntTexture);
      this.tex.pinball = ['JACKPOT', '1000', 'BONUS', 'EXTRA BALL', '500', 'MULTIBALL', '★', '▲▲▲', 'SUPER', '5000'].map(pinTexture);
      for (let k = 0; k < 12; k++) {
        const mat = new SpriteMaterial({ transparent: true, blending: AdditiveBlending, depthWrite: false, fog: false, toneMapped: false });
        const spr = new Sprite(mat); spr.visible = false;
        this.group.add(spr);
        this.holos.push({ spr, mat, age: 0, life: 0, base: new Vector3(), kind: 'haunted' });
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

  private buildLasers(tb: ThemedTube) {
    const g = new Group(); g.visible = false;
    const beams: Group[] = [];
    const cols = [0xff2060, 0x30ff70, 0x2aa8ff, 0xffe030, 0xd040ff];
    let k = 0;
    for (let s = tb.s0 + 14; s < tb.s1 - 8; s += 26, k++) {
      const C = this.axisAt(tb.track, s, new Vector3());
      const rad = this.radius(tb.track, s) * 0.96;
      const ring = new Group();
      ring.quaternion.setFromRotationMatrix(new Matrix4().makeBasis(this.R.clone().negate(), this.U, this.T));
      ring.position.copy(C);
      for (let b = 0; b < 3; b++) {
        const col = cols[(k + b) % cols.length];
        const core = new Mesh(new BoxGeometry(rad * 2, 0.07, 0.07), new MeshBasicMaterial({ color: col, transparent: true, opacity: 0.95, blending: AdditiveBlending, depthWrite: false, fog: false, toneMapped: false }));
        const glow = new Mesh(new BoxGeometry(rad * 2, 0.45, 0.45), new MeshBasicMaterial({ color: col, transparent: true, opacity: 0.18, blending: AdditiveBlending, depthWrite: false, fog: false, toneMapped: false }));
        const beam = new Group(); beam.add(core, glow);
        beam.userData = { phase: (b * Math.PI) / 3 + k * 0.7, speed: (b % 2 ? -1 : 1) * (0.9 + 0.35 * ((k + b) % 3)), tilt: 0.35 * Math.sin(k + b) };
        ring.add(beam); beams.push(beam);
      }
      g.add(ring);
    }
    this.group.add(g);
    this.laserGroups.push({ tube: tb, g, beams });
  }

  private makeBurst(): Burst {
    const N = 110;
    const dir = new Float32Array(N * 3), spd = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const u = Math.random() * 2 - 1, a = Math.random() * Math.PI * 2, r = Math.sqrt(1 - u * u);
      dir[i * 3] = r * Math.cos(a); dir[i * 3 + 1] = u; dir[i * 3 + 2] = r * Math.sin(a);
      spd[i] = 0.7 + Math.random() * 0.3;
    }
    const geo = new BufferGeometry();
    geo.setAttribute('position', new BufferAttribute(dir, 3));
    geo.setAttribute('spd', new BufferAttribute(spd, 1));
    const mat = new ShaderMaterial({
      uniforms: { uAge: { value: 0 }, uLife: { value: 1.2 }, uSize: { value: 4.5 }, uColor: { value: new Color(1, 0.5, 0.2) }, uColor2: { value: new Color(1, 1, 1) } },
      vertexShader: `attribute float spd; uniform float uAge, uSize, uLife; varying float vF; varying float vS;
        void main(){
          float k = 1.0 - exp(-uAge * 3.2);
          vec3 p = position * spd * k * uSize;
          p.y -= 1.6 * uAge * uAge;                    // the sparks droop as they fade
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = (1.2 + 2.2 * spd) * 90.0 / -mv.z * (1.0 - 0.5 * uAge / uLife);
          vF = 1.0 - uAge / uLife; vS = spd;
        }`,
      fragmentShader: `uniform vec3 uColor, uColor2; varying float vF; varying float vS;
        void main(){ vec2 c = gl_PointCoord - 0.5; float d = dot(c, c); if (d > 0.25) discard;
          float tw = 0.6 + 0.4 * step(0.5, fract(vS * 37.0 + vF * 9.0));
          gl_FragColor = vec4(mix(uColor2, uColor, 0.75 + 0.25 * (1.0 - vF)) * tw * 1.4, (1.0 - d * 4.0) * vF * vF); }`,
      transparent: true, blending: AdditiveBlending, depthWrite: false,
    });
    const pts = new Points(geo, mat);
    pts.visible = false; pts.frustumCulled = false;
    this.group.add(pts);
    return { pts, mat, age: 0, life: 1.2 };
  }

  /** Called every frame: run the show for the tube the ball is in. */
  update(ball: BallPhysics, dt: number, time: number, sound?: (kind: TubeTheme | 'firework') => void) {
    const tr = ball.track, s = ball.proj.s;
    let here: ThemedTube | null = null;
    for (const tb of this.tubes) if (tb.track === tr && s > tb.s0 - 6 && s < tb.s1 + 4) here = tb;
    this.active = here?.theme ?? null;
    // lasers: only drawn when you're in (or nearly in) their tube
    for (const lg of this.laserGroups) {
      const near = lg.tube.track === tr && s > lg.tube.s0 - 80 && s < lg.tube.s1 + 10;
      lg.g.visible = near;
      if (!near) continue;
      for (const b of lg.beams) {
        const u = b.userData;
        b.rotation.set(0, u.tilt * Math.sin(time * 0.8 + u.phase), u.phase + time * u.speed);
        const flick = 0.75 + 0.25 * Math.sin(time * 23 + u.phase * 5);
        b.scale.set(1, flick, flick);
      }
    }
    // spawners
    this.spawnT -= dt;
    if (here && this.spawnT <= 0) {
      const rate = here.theme === 'fireworks' ? 0.42 : here.theme === 'pinball' ? 0.38 : here.theme === 'haunted' ? 0.55 : 1e9;
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
      b.age += dt; b.mat.uniforms.uAge.value = b.age;
      if (b.age > b.life) b.pts.visible = false;
    }
    for (const h of this.holos) {
      if (!h.spr.visible) continue;
      h.age += dt;
      const k = h.age / h.life;
      if (k >= 1) { h.spr.visible = false; continue; }
      const env = Math.min(1, h.age / 0.12) * Math.min(1, (1 - k) / 0.25);
      if (h.kind === 'haunted') {
        // flickering, glitching apparitions
        const fl = Math.random() < 0.12 ? 0.15 : 1;
        h.mat.opacity = env * fl * 0.85;
        h.spr.position.copy(h.base).addScaledVector(this.R, (Math.random() < 0.08 ? (Math.random() - 0.5) * 0.8 : 0));
      } else {
        // pinball: pops in big and bright, then fades
        h.mat.opacity = env;
        const pop = 1 + 0.35 * Math.max(0, 1 - h.age / 0.15);
        h.spr.scale.copy(h.spr.userData.scale).multiplyScalar(pop);
      }
    }
  }

  private wallPoint(t: Track, s: number, angle: number, frac: number, out: Vector3) {
    const C = this.axisAt(t, s, out);
    const r = this.radius(t, s) * frac;
    return C.addScaledVector(this.R, Math.cos(angle) * r).addScaledVector(this.U, Math.sin(angle) * r);
  }

  private spawnBurst(t: Track, s: number, sound?: (k: TubeTheme | 'firework') => void) {
    const b = this.bursts.find((x) => !x.pts.visible);
    if (!b) return;
    const ang = Math.random() * Math.PI * 2;
    this.wallPoint(t, s, ang, Math.random() * 0.45, b.pts.position);
    b.age = 0; b.life = 1.1 + Math.random() * 0.5;
    b.mat.uniforms.uLife.value = b.life;
    b.mat.uniforms.uSize.value = 4.2 + Math.random() * 2.4;
    (b.mat.uniforms.uColor.value as Color).setHSL(Math.random(), 1, 0.55);
    (b.mat.uniforms.uColor2.value as Color).setHSL(Math.random(), 1, 0.7);
    b.pts.visible = true;
    sound?.('firework');
  }

  private spawnHolo(t: Track, s: number, kind: TubeTheme, sound?: (k: TubeTheme | 'firework') => void) {
    const h = this.holos.find((x) => !x.spr.visible);
    if (!h) return;
    const set = this.tex[kind === 'haunted' ? 'haunted' : 'pinball'];
    h.mat.map = set[Math.floor(Math.random() * set.length)];
    h.mat.color.set(kind === 'haunted' ? 0xb8ffe6 : 0xffffff);
    h.mat.needsUpdate = true;
    h.kind = kind;
    // on the upper walls and roof, where you look while rolling through
    const ang = Math.PI * (0.15 + Math.random() * 0.7);
    this.wallPoint(t, s, ang, 0.78, h.base);
    h.spr.position.copy(h.base);
    const sc = kind === 'haunted' ? 3.4 + Math.random() * 2 : 4.2 + Math.random() * 1.6;
    h.spr.scale.set(sc * (kind === 'pinball' ? 2 : 1), sc, 1);
    h.spr.userData.scale = h.spr.scale.clone();
    h.age = 0; h.life = kind === 'haunted' ? 1.1 + Math.random() * 0.6 : 0.9;
    h.spr.visible = true;
    sound?.(kind);
  }

  dispose() {
    this.scene.remove(this.group);
    this.group.traverse((o) => { const m = o as Mesh; if (m.geometry) m.geometry.dispose(); });
  }
}

// ---- hologram textures (drawn here, all original) ----
function canvasTex(draw: (c: CanvasRenderingContext2D, w: number, h: number) => void, w = 256, h = 256) {
  const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
  const c = cv.getContext('2d')!;
  draw(c, w, h);
  // hologram scanlines
  c.globalCompositeOperation = 'destination-out';
  c.fillStyle = 'rgba(0,0,0,0.35)';
  for (let y = 0; y < h; y += 4) c.fillRect(0, y, w, 1.5);
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
      c.fillStyle = '#000'; c.shadowBlur = 0;
      c.beginPath(); c.ellipse(cx - 25, 105, 11, 17, 0, 0, Math.PI * 2); c.ellipse(cx + 25, 105, 11, 17, 0, 0, Math.PI * 2); c.fill();
      c.beginPath(); c.ellipse(cx, 150, 14, 18, 0, 0, Math.PI * 2); c.fill();
    } else if (kind === 'eyes') {
      for (const dx of [-45, 45]) { c.beginPath(); c.ellipse(cx + dx, 128, 30, 20, 0, 0, Math.PI * 2); c.fill(); }
      c.fillStyle = '#000'; c.shadowBlur = 0;
      for (const dx of [-45, 45]) { c.beginPath(); c.ellipse(cx + dx + 6, 128, 8, 16, 0, 0, Math.PI * 2); c.fill(); }
    } else if (kind === 'skull') {
      c.globalAlpha = 0.7;
      c.beginPath(); c.arc(cx, 110, 72, Math.PI * 0.85, Math.PI * 2.15); c.lineTo(cx + 40, 200); c.lineTo(cx - 40, 200); c.closePath(); c.fill();
      c.globalAlpha = 1; c.fillStyle = '#000'; c.shadowBlur = 0;
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
