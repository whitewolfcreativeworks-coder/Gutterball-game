import {
  BoxGeometry, CanvasTexture, Color, CylinderGeometry, DoubleSide, Group, InstancedMesh, LatheGeometry, Matrix4, Mesh,
  MeshBasicMaterial, MeshStandardMaterial, Object3D, PerspectiveCamera, PlaneGeometry, Quaternion, Scene, SphereGeometry,
  Sprite, SpriteMaterial, SRGBColorSpace, TorusGeometry, Vector2, Vector3,
} from 'three';
import type { BallPhysics } from '../physics/ball';
import type { Track } from '../track/track';
import type { AudioEngine } from '../audio/audioEngine';

/**
 * FINISH CONTRAPTIONS: after the finish line the player lets go and watches
 * a little chain-reaction machine at the end of the run-out. Five kinds:
 *
 *  plinko   — a giant peg board; the ball rattles down into a points slot
 *  dominoes — the ball tips a curving domino run; the last one fires a
 *             seesaw that flips a gold ball into a bucket and rings the bell
 *  hoop     — the ball lands on a seesaw that launches a gold ball through a hoop
 *  chimes   — the ball bounces down a xylophone stair playing a tune, then a bell
 *  funnel   — a wishing-well coin funnel: round and round, faster and faster, in
 *
 * Everything is scripted or simulated here (small 2-D physics for Plinko), in
 * a local frame at the end of the course: x right, y up, z forward (level).
 */
export type FinaleKind = 'plinko' | 'dominoes' | 'hoop' | 'chimes' | 'funnel';
export const FINALE_FOR_WORLD: Record<string, FinaleKind> = {
  wood: 'plinko', rubber: 'plinko', grating: 'plinko',
  concrete: 'dominoes', stone: 'dominoes', sand: 'dominoes',
  metal: 'hoop', mud: 'hoop',
  glass: 'chimes', ice: 'chimes',
  water: 'funnel', snow: 'funnel',
};

const G = 16; // a touch more than real gravity: snappier toy physics
const PLINKO_VALUES = [100, 500, 1000, 2500, 10000, 2500, 1000, 500, 100];
// "Mary Had a Little Lamb" (traditional, 1830s): E D C D E E E, D D D, E G G
const TUNE = [659.3, 587.3, 523.3, 587.3, 659.3, 659.3, 659.3, 587.3, 587.3, 587.3, 659.3, 784, 784];

export class Finale {
  readonly group = new Group();
  done = false;
  score = 0;
  private t = 0;
  private phase: 'rollout' | 'flight' | 'machine' | 'celebrate' = 'rollout';
  private O = new Vector3(); private X = new Vector3(); private Y = new Vector3(0, 1, 0); private Z = new Vector3();
  private s = 0; private v = 14;
  private flight = { from: new Vector3(), vel: new Vector3(), T: 0.9, t: 0 };
  private ballPos = new Vector3();            // local
  private ballVel = new Vector3();            // local
  private camPos = new Vector3(); private camLook = new Vector3();
  private camFrom = new Vector3(); private lookFrom = new Vector3(); private camBlend = 0;
  private celebrateT = 0;
  private confetti: Confetti;
  private r: number;
  private st: any = {};

  constructor(private scene: Scene, private track: Track, private ball: BallPhysics, readonly kind: FinaleKind, private audio: AudioEngine, private colors: { a: number; b: number }) {
    this.r = ball.tune.radius;
    // local frame at the end of the run-out, levelled
    const P = new Vector3(), T = new Vector3(), U = new Vector3(), R = new Vector3();
    track.frameAtS(track.length - 3, P, T, U, R);
    this.Z.set(T.x, 0, T.z).normalize();
    this.X.crossVectors(this.Y, this.Z).normalize(); // right-handed (x, y, z) so objects rotate rather than mirror
    this.O.copy(P);
    this.s = ball.mainProj.s;
    this.v = Math.max(16, Math.min(26, ball.v.length()));
    this.confetti = new Confetti(this.group);
    this.group.name = 'finale';
    scene.add(this.group);
    this.build();
  }

  // ----------------------------------------------------------------- helpers
  /** local -> world */
  W(x: number, y: number, z: number, out = new Vector3()) {
    return out.copy(this.O).addScaledVector(this.X, x).addScaledVector(this.Y, y).addScaledVector(this.Z, z);
  }
  private place(o: Object3D, x: number, y: number, z: number) {
    this.W(x, y, z, o.position);
    const m = new Matrix4().makeBasis(this.X, this.Y, this.Z);
    o.quaternion.setFromRotationMatrix(m);
    this.group.add(o);
    return o;
  }
  private mat(c: number | Color, emissive = 0) {
    return new MeshStandardMaterial({ color: c, roughness: 0.45, metalness: 0.1, emissive: c, emissiveIntensity: emissive });
  }
  private toyColor(i: number) { return new Color().setHSL((i * 0.13 + 0.02) % 1, 0.85, 0.55); }
  private platform(x: number, y: number, z: number, w: number, d: number) {
    const top = this.place(new Mesh(new BoxGeometry(w, 0.8, d), this.mat(0x2a2f3a)), x, y - 0.4, z);
    // legs down to the ground
    for (const [lx, lz] of [[-w / 2 + 1, -d / 2 + 1], [w / 2 - 1, -d / 2 + 1], [-w / 2 + 1, d / 2 - 1], [w / 2 - 1, d / 2 - 1]]) {
      const leg = new Mesh(new CylinderGeometry(0.35, 0.35, 120, 6), this.mat(0x1a1d24));
      this.place(leg, x + lx, y - 60.8, z + lz);
    }
    return top;
  }
  private label(text: string, color = '#ffffff', scale = 6): Object3D {
    if (typeof document === 'undefined') return new Group(); // (headless tests)
    const cv = document.createElement('canvas'); cv.width = 256; cv.height = 128;
    const c = cv.getContext('2d')!;
    c.font = 'bold 84px system-ui, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.lineWidth = 10; c.strokeStyle = 'rgba(0,0,0,0.85)'; c.strokeText(text, 128, 66);
    c.fillStyle = color; c.fillText(text, 128, 66);
    const tex = new CanvasTexture(cv); tex.colorSpace = SRGBColorSpace;
    const sp = new Sprite(new SpriteMaterial({ map: tex, depthTest: false, transparent: true }));
    sp.scale.set(scale, scale / 2, 1);
    sp.renderOrder = 10;
    return sp;
  }

  // ----------------------------------------------------------------- build
  private build() {
    const k = this.kind;
    if (k === 'plinko') this.buildPlinko();
    else if (k === 'dominoes') this.buildDominoes();
    else if (k === 'hoop') this.buildHoop();
    else if (k === 'chimes') this.buildChimes();
    else this.buildFunnel();
  }

  private buildPlinko() {
    const zb = 30, top = -4, rows = 9, dx = 4.0, dy = 3.4;
    const board = new Mesh(new BoxGeometry(40, rows * dy + 12, 0.6), this.mat(0x101420));
    this.place(board, 0, top - (rows * dy) / 2 - 3, zb + 0.6);
    const pegs: Vector2[] = [];
    const pegMat = this.mat(this.colors.a, 0.6);
    for (let i = 0; i < rows; i++) {
      const n = i % 2 ? 8 : 9;
      for (let j = 0; j < n; j++) {
        const x = (j - (n - 1) / 2) * dx, y = top - 2 - i * dy;
        pegs.push(new Vector2(x, y));
        const peg = new Mesh(new CylinderGeometry(0.35, 0.35, 2.4, 10), pegMat);
        peg.rotation.x = Math.PI / 2;
        const holder = new Group(); holder.add(peg);
        this.place(holder, x, y, zb - 0.6);
      }
    }
    const slotTop = top - 2 - rows * dy - 0.5, floor = slotTop - 4;
    const dividers: number[] = [];
    for (let j = 0; j <= 9; j++) {
      const x = (j - 4.5) * dx;
      dividers.push(x);
      this.place(new Mesh(new BoxGeometry(0.3, 4, 2.4), this.mat(0xdfe6ef)), x, slotTop - 2, zb - 0.6);
    }
    this.place(new Mesh(new BoxGeometry(9 * dx + 0.4, 0.5, 2.4), this.mat(0xdfe6ef)), 0, floor - 0.25, zb - 0.6);
    const slots: Mesh[] = [];
    PLINKO_VALUES.forEach((v, j) => {
      const glow = new Mesh(new BoxGeometry(dx - 0.4, 3.8, 0.2), this.mat(this.toyColor(j), 0.15));
      this.place(glow, (j - 4) * dx, slotTop - 2, zb + 0.2);
      slots.push(glow);
      const lb = this.label(v >= 1000 ? `${v / 1000}K` : String(v), '#ffffff', 3.2);
      this.place(lb, (j - 4) * dx, floor - 2.2, zb - 1.5);
    });
    // side rails
    for (const sx of [-(4.5 * dx + 0.3), 4.5 * dx + 0.3]) this.place(new Mesh(new BoxGeometry(0.6, rows * dy + 8, 2.4), this.mat(0xdfe6ef)), sx, top - (rows * dy) / 2 - 2, zb - 0.6);
    this.st = { zb, top, dx, pegs, dividers, slotTop, floor, slots, still: 0, lastClink: 0, landed: -1 };
    this.entry(new Vector3((Math.random() - 0.5) * 3, top + 1.5, zb - 1.5));
  }

  private buildDominoes() {
    const y = -6;
    this.platform(0, y, 40, 30, 60);
    // the domino path: an S-curve
    const pts: Vector3[] = [];
    let prev = new Vector3(0, y, 22), acc = 0;
    pts.push(prev.clone());
    for (let u = 0; u <= 1; u += 0.0005) {
      const p = new Vector3(8 * Math.sin(u * Math.PI * 2), y, 22 + u * 34);
      acc += p.distanceTo(prev); prev = p;
      if (acc >= 2.1) { pts.push(p.clone()); acc = 0; }
    }
    const dominoes: { m: Group; dir: Vector3; t0: number; fallen: boolean; q0: Quaternion }[] = [];
    pts.forEach((p, i) => {
      const nxt = pts[Math.min(pts.length - 1, i + 1)], prv = pts[Math.max(0, i - 1)];
      const dir = new Vector3().subVectors(nxt, prv).normalize();
      const piv = new Group();
      const d = new Mesh(new BoxGeometry(2.2, 3.4, 0.45), this.mat(this.toyColor(i)));
      d.position.set(0, 1.7, -0.22); // pivot at the front-bottom edge, so it tips forward onto the next
      piv.add(d);
      this.place(piv, p.x, p.y, p.z);
      piv.rotateY(Math.atan2(dir.x, dir.z));
      dominoes.push({ m: piv, dir, t0: -1, fallen: false, q0: piv.quaternion.clone() });
    });
    // seesaw at the end with a gold ball, and the bucket with its bell
    const last = pts[pts.length - 1];
    const sawPivot = new Vector3(last.x, y + 0.9, last.z + 4.5);
    const saw = new Group();
    const plank = new Mesh(new BoxGeometry(2, 0.4, 9), this.mat(0xffcc33));
    saw.add(plank);
    this.place(saw, sawPivot.x, sawPivot.y, sawPivot.z);
    saw.rotateX(0.25); // near end up (where the last domino lands), far end down under the gold ball
    this.place(new Mesh(new CylinderGeometry(0.2, 0.9, 1.8, 3), this.mat(0x444a58)), sawPivot.x, y + 0.1, sawPivot.z);
    const gold = new Mesh(new SphereGeometry(0.7, 20, 14), new MeshStandardMaterial({ color: 0xffd34a, metalness: 0.9, roughness: 0.2, emissive: 0x442200 }));
    const goldStart = new Vector3(sawPivot.x, sawPivot.y + 0.9 - 4.2 * Math.sin(0.25) + 0.0, sawPivot.z + 4.2);
    this.place(gold, goldStart.x, goldStart.y, goldStart.z);
    const bucketPos = new Vector3(sawPivot.x * 0.3, y + 2, sawPivot.z + 16);
    const bucket = new Mesh(new CylinderGeometry(2.4, 1.8, 3.2, 20, 1, true), new MeshStandardMaterial({ color: 0x3a8cff, side: DoubleSide, roughness: 0.4 }));
    this.place(bucket, bucketPos.x, bucketPos.y, bucketPos.z);
    const bell = this.makeBell(1.6);
    this.place(bell, bucketPos.x, bucketPos.y + 6, bucketPos.z + 0.5);
    this.st = { y, pts, dominoes, saw, sawPivot, gold, goldStart, bucketPos, bell, knocked: false, launched: -1 };
    this.entry(new Vector3(0, y + this.r, 12));
  }

  private makeBell(size: number) {
    const prof: Vector2[] = [];
    for (let i = 0; i <= 12; i++) { const u = i / 12; prof.push(new Vector2(size * (0.35 + 0.65 * Math.pow(u, 2.2)) + (i === 12 ? size * 0.12 : 0), size * 2 * (1 - u))); }
    const g = new Group();
    const b = new Mesh(new LatheGeometry(prof, 24), new MeshStandardMaterial({ color: 0xe8b84a, metalness: 0.95, roughness: 0.25, side: DoubleSide }));
    b.position.y = -size * 2;
    g.add(b);
    return g;
  }

  private buildHoop() {
    const y = -8;
    this.platform(0, y, 30, 18, 46);
    const piv = new Vector3(0, y + 1.2, 18);
    const saw = new Group();
    saw.add(new Mesh(new BoxGeometry(2.4, 0.5, 14), this.mat(0xff5a7a)));
    this.place(saw, piv.x, piv.y, piv.z);
    saw.rotateX(0.28); // near end up for the ball to land on, far end down under the gold ball
    this.place(new Mesh(new CylinderGeometry(0.2, 1.1, 2, 3), this.mat(0x444a58)), piv.x, y + 0.2, piv.z);
    const gold = new Mesh(new SphereGeometry(0.75, 20, 14), new MeshStandardMaterial({ color: 0xffd34a, metalness: 0.9, roughness: 0.2, emissive: 0x442200 }));
    const goldStart = new Vector3(0, piv.y + 0.95 - 6.3 * Math.sin(0.28), piv.z + 6.3);
    this.place(gold, goldStart.x, goldStart.y, goldStart.z);
    const basket = new Vector3(0, y + 4, 44);
    // hoop at the top of the gold ball's arc, on a pole
    const apex = new Vector3(0, y + 17, (goldStart.z + basket.z) / 2);
    const hoop = new Mesh(new TorusGeometry(2.2, 0.18, 10, 32), this.mat(0xff7a1a, 0.4));
    this.place(hoop, apex.x, apex.y, apex.z);
    this.place(new Mesh(new CylinderGeometry(0.2, 0.2, apex.y - y, 8), this.mat(0xdfe6ef)), 3.2, (apex.y + y) / 2, apex.z);
    const bk = new Mesh(new CylinderGeometry(2.2, 1.6, 2.6, 20, 1, true), new MeshStandardMaterial({ color: 0x48e07a, side: DoubleSide, roughness: 0.5 }));
    this.place(bk, basket.x, basket.y, basket.z);
    this.place(new Mesh(new CylinderGeometry(0.2, 0.2, 4, 8), this.mat(0xdfe6ef)), 0, y + 2, basket.z);
    this.st = { y, piv, saw, gold, goldStart, basket, apex, hoop, landed: false, launchT: -1 };
    this.entry(new Vector3(0, piv.y + 0.95 + 6.3 * Math.sin(0.28) + this.r - 0.3, piv.z - 6.3));
  }

  private buildChimes() {
    const n = TUNE.length;
    const bars: { m: Mesh; p: Vector3; glow: number }[] = [];
    for (let k = 0; k < n; k++) {
      const p = new Vector3((k % 2 ? 1.4 : -1.4), -3 - k * 1.7, 9 + k * 3.1);
      const m = new Mesh(new BoxGeometry(5.2 - k * 0.15, 0.45, 2.2), this.mat(this.toyColor(k), 0.25));
      this.place(m, p.x, p.y, p.z);
      // little posts
      for (const sx of [-1, 1]) this.place(new Mesh(new CylinderGeometry(0.12, 0.12, 1.2, 6), this.mat(0xdfe6ef)), p.x + sx * (2.2 - k * 0.07), p.y - 0.8, p.z);
      bars.push({ m, p, glow: 0 });
    }
    const last = bars[n - 1].p;
    const bellPos = new Vector3(0, last.y - 1.5, last.z + 6);
    const bell = this.makeBell(2.2);
    this.place(bell, bellPos.x, bellPos.y + 4.4, bellPos.z);
    this.platform(0, last.y - 6, last.z + 2, 16, 70);
    this.st = { bars, k: -1, hopT: 0, bell, bellPos, rung: false };
    this.entry(new Vector3(bars[0].p.x, bars[0].p.y + 0.22 + this.r, bars[0].p.z));
  }

  private buildFunnel() {
    const c = new Vector3(0, -12, 32), R = 16, rh = 2.2, depth = 9;
    const prof: Vector2[] = [];
    for (let i = 0; i <= 24; i++) { const u = i / 24; const r = rh + (R - rh) * u; prof.push(new Vector2(r, -depth * Math.pow(1 - u, 1.8))); }
    const funnel = new Mesh(new LatheGeometry(prof, 64), new MeshStandardMaterial({ color: this.colors.a, roughness: 0.25, metalness: 0.6, side: DoubleSide, emissive: this.colors.b, emissiveIntensity: 0.15 }));
    this.place(funnel, c.x, c.y, c.z);
    const rim = new Mesh(new TorusGeometry(R, 0.4, 10, 64), this.mat(0xffd34a, 0.3));
    rim.rotation.x = Math.PI / 2;
    const rh2 = new Group(); rh2.add(rim); this.place(rh2, c.x, c.y, c.z);
    this.platform(c.x, c.y - depth - 2, c.z, 10, 10);
    const R0 = R - this.r - 0.3;
    this.st = { c, R, rh, depth, R0, theta: Math.PI, rr: R0, L: 15 * R0, t: 0, fell: false };
    // enter at the rim, on the near side
    this.entry(new Vector3(c.x - 0.01, c.y + this.r * 0.7, c.z - R0));
  }

  /** Aim the flight from the end of the run-out so it lands exactly at `e` (local). */
  private entry(e: Vector3) { this.st.entry = e.clone(); }

  // ----------------------------------------------------------------- update
  update(dt: number) {
    this.t += dt;
    const b = this.ball;
    if (this.phase === 'rollout') {
      // roll on along the run-out, slowing a little, to the end of the gutter
      this.s += this.v * dt;
      this.v = Math.max(13, this.v - 2 * dt);
      const P = new Vector3(), T = new Vector3(), U = new Vector3(), R = new Vector3();
      this.track.frameAtS(Math.min(this.s, this.track.length - 3), P, T, U, R);
      b.p.copy(P).addScaledVector(U, this.r);
      b.v.copy(T).multiplyScalar(this.v);
      if (this.s >= this.track.length - 3) {
        this.phase = 'flight';
        this.toLocal(b.p, this.flight.from);
        const e = this.st.entry as Vector3;
        const Tf = this.flight.T = this.kind === 'plinko' || this.kind === 'funnel' ? 1.1 : 0.9;
        this.flight.vel.copy(e).sub(this.flight.from).addScaledVector(this.Y, 0.5 * G * Tf * Tf).multiplyScalar(1 / Tf);
        this.flight.t = 0;
        this.camFrom.copy(this.ballCamPos()); this.lookFrom.copy(b.p);
      }
    } else if (this.phase === 'flight') {
      this.flight.t += dt;
      const t = Math.min(this.flight.T, this.flight.t);
      this.ballPos.copy(this.flight.from).addScaledVector(this.flight.vel, t).addScaledVector(this.Y, -0.5 * G * t * t);
      this.ballVel.copy(this.flight.vel).addScaledVector(this.Y, -G * t);
      if (this.flight.t >= this.flight.T) { this.phase = 'machine'; this.machineStart(); }
    } else if (this.phase === 'machine') {
      this.machine(dt);
    } else {
      this.celebrateT += dt;
      if (this.celebrateT > 2.6) this.done = true;
    }
    if (this.phase !== 'rollout') {
      this.W(this.ballPos.x, this.ballPos.y, this.ballPos.z, b.p);
      b.v.set(0, 0, 0).addScaledVector(this.X, this.ballVel.x).addScaledVector(this.Y, this.ballVel.y).addScaledVector(this.Z, this.ballVel.z);
    }
    // spin the ball with its motion
    const sp = b.v.length();
    if (sp > 0.05) {
      const axis = new Vector3().crossVectors(this.Y, b.v).normalize();
      if (axis.lengthSq() > 0.5) b.q.premultiply(new Quaternion().setFromAxisAngle(axis, (sp / this.r) * dt));
    }
    b.magnetActive = false; b.magnetHasTarget = false;
    this.confetti.update(dt);
    this.updateCamera(dt);
  }

  private toLocal(w: Vector3, out: Vector3) {
    const d = new Vector3().subVectors(w, this.O);
    return out.set(d.dot(this.X), d.dot(this.Y), d.dot(this.Z));
  }
  private celebrate(at: Vector3, big = true) {
    this.phase = 'celebrate';
    this.celebrateT = 0;
    const w = this.W(at.x, at.y, at.z);
    this.confetti.burst(w, big ? 260 : 120, this.Y);
    this.audio.fanfare();
    this.audio.pop(true);
    setTimeout(() => { this.confetti.burst(this.W(at.x - 4, at.y + 6, at.z), 120, this.Y); this.audio.pop(); }, 350);
    setTimeout(() => { this.confetti.burst(this.W(at.x + 4, at.y + 7, at.z), 120, this.Y); this.audio.pop(); }, 650);
  }

  private machineStart() {
    this.audio.clink(Math.min(1, this.ballVel.length() / 14));
    if (this.kind === 'plinko') this.ballVel.set(this.ballVel.x * 0.3 + (Math.random() - 0.5) * 2, -2, 0);
    if (this.kind === 'dominoes') this.ballVel.set(0, 0, 9);
    if (this.kind === 'chimes') { this.st.k = 0; this.st.hopT = 0; this.hitBar(0); }
    if (this.kind === 'hoop') { this.st.landed = true; this.st.launchT = 0; this.audio.clack2(1); }
  }

  private machine(dt: number) {
    const st = this.st;
    switch (this.kind) {
      case 'plinko': {
        // small 2-D physics in the board plane, substepped
        const n = 6, h = dt / n, rr = this.r + 0.35;
        for (let i = 0; i < n; i++) {
          this.ballVel.y -= G * 2.0 * h; // brisk: a chip falls fast between pegs
          this.ballPos.x += this.ballVel.x * h; this.ballPos.y += this.ballVel.y * h;
          for (const pg of st.pegs as Vector2[]) {
            const dx = this.ballPos.x - pg.x, dy = this.ballPos.y - pg.y, d = Math.hypot(dx, dy);
            if (d < rr && d > 1e-4) {
              const nx = dx / d, ny = dy / d;
              this.ballPos.x += nx * (rr - d); this.ballPos.y += ny * (rr - d);
              const vn = this.ballVel.x * nx + this.ballVel.y * ny;
              if (vn < 0) {
                this.ballVel.x -= 1.6 * vn * nx; this.ballVel.y -= 1.6 * vn * ny;
                this.ballVel.x += (Math.random() - 0.5) * 1.2 + (Math.abs(nx) < 0.15 ? (Math.random() < 0.5 ? -1.5 : 1.5) : 0); // never balance on a peg
                if (this.t - st.lastClink > 0.06) { st.lastClink = this.t; this.audio.clink(Math.min(1, -vn / 10)); }
              }
            }
          }
          // rails, dividers, floor
          { const rail = 4.5 * st.dx; if (Math.abs(this.ballPos.x) > rail - this.r) { this.ballPos.x = Math.sign(this.ballPos.x) * (rail - this.r); this.ballVel.x *= -0.5; } }
          if (this.ballPos.y < st.slotTop) {
            for (const xd of st.dividers as number[]) {
              const dx = this.ballPos.x - xd;
              if (Math.abs(dx) < this.r + 0.15) { this.ballPos.x = xd + Math.sign(dx || 1) * (this.r + 0.15); this.ballVel.x *= -0.4; }
            }
          }
          if (this.ballPos.y < st.floor + this.r) {
            this.ballPos.y = st.floor + this.r;
            if (this.ballVel.y < -2) this.audio.clink(Math.min(1, -this.ballVel.y / 12));
            this.ballVel.y *= -0.35; this.ballVel.x *= 0.8;
          }
        }
        // wedged above the slots (against a rail or balanced on a peg): give the board a tap
        const slow = Math.hypot(this.ballVel.x, this.ballVel.y) < 1.2 && this.ballPos.y > st.slotTop;
        st.stall = slow ? (st.stall ?? 0) + dt : 0;
        if (st.stall > 0.3) { st.stall = 0; this.ballVel.set(-Math.sign(this.ballPos.x || 1) * (3 + Math.random() * 2), 3, 0); this.audio.clink(0.3); }
        const still = Math.hypot(this.ballVel.x, this.ballVel.y) < 0.6 && this.ballPos.y < st.floor + this.r + 0.2;
        st.still = still ? st.still + dt : 0;
        if (st.still > 0.4 || this.t > 30) {
          const j = Math.max(0, Math.min(8, Math.floor(this.ballPos.x / st.dx + 4.5)));
          this.score = PLINKO_VALUES[j];
          (st.slots[j].material as MeshStandardMaterial).emissiveIntensity = 2.5;
          const lb = this.label(`+${this.score}`, '#ffe14a', 10);
          this.place(lb, (j - 4) * st.dx, st.slotTop + 6, st.zb - 3);
          this.ballVel.set(0, 0, 0);
          this.celebrate(new Vector3((j - 4) * st.dx, st.slotTop + 2, st.zb - 3), this.score >= 2500);
        }
        break;
      }
      case 'dominoes': {
        // the ball rolls along the table to the first domino and stops against it
        const first = (st.pts as Vector3[])[0];
        if (!st.knocked) {
          this.ballPos.addScaledVector(this.ballVel, dt);
          this.ballPos.y = st.y + this.r;
          if (this.ballPos.z > first.z - this.r - 0.3) { st.knocked = true; st.wave = 0; this.ballVel.set(0, 0, 0); this.audio.clink(0.6); }
        }
        if (st.knocked) {
          st.wave += dt;
          const doms = st.dominoes as { m: Group; dir: Vector3; t0: number; fallen: boolean; q0: Quaternion }[];
          doms.forEach((d, i) => {
            const t0 = i * 0.085;
            if (st.wave >= t0) {
              if (d.t0 < 0) { d.t0 = st.wave; this.audio.clack2(0.5 + 0.5 * Math.random()); }
              const u = Math.min(1, (st.wave - d.t0) / 0.22);
              d.m.quaternion.copy(d.q0); // tip forward about its front edge
              d.m.rotateX(1.25 * u * u);
            }
          });
          const lastT = (doms.length - 1) * 0.085 + 0.22;
          if (st.wave > lastT && st.launched < 0) {
            st.launched = 0;
            st.saw.rotateX(-0.5); // the far end flips up
            this.audio.clack2(1);
            const from = st.goldStart as Vector3, to = (st.bucketPos as Vector3).clone().add(new Vector3(0, 1, 0));
            const T = 1.3;
            st.goldVel = to.clone().sub(from).addScaledVector(new Vector3(0, 1, 0), 0.5 * G * T * T).multiplyScalar(1 / T);
            st.goldT = T;
          }
          if (st.launched >= 0) {
            st.launched += dt;
            const t = Math.min(st.goldT, st.launched);
            const p = (st.goldStart as Vector3).clone().addScaledVector(st.goldVel, t).add(new Vector3(0, -0.5 * G * t * t, 0));
            this.W(p.x, p.y, p.z, st.gold.position);
            st.goldLocal = p;
            if (st.launched >= st.goldT && !st.rung) {
              st.rung = true;
              this.audio.bell(392);
              st.bellSwing = 1;
              this.celebrate(st.bucketPos.clone().add(new Vector3(0, 4, 0)));
            }
          }
        }
        break;
      }
      case 'hoop': {
        st.launchT += dt;
        // plank flips (near end down, far end up), the gold ball flies through the hoop into the basket
        const u = Math.min(1, st.launchT / 0.15);
        st.saw.rotation.set(0, 0, 0);
        const m = new Matrix4().makeBasis(this.X, this.Y, this.Z); st.saw.quaternion.setFromRotationMatrix(m);
        st.saw.rotateX(0.28 - 0.56 * u);
        this.ballPos.y = st.piv.y + 0.95 + 6.3 * Math.sin(0.28 - 0.56 * u) + this.r - 0.3;
        if (!st.goldVel) {
          const from = st.goldStart as Vector3, to = (st.basket as Vector3).clone().add(new Vector3(0, 0.6, 0));
          const ap = st.apex as Vector3;
          // pick the flight time so the arc's top passes through the hoop
          const vy = Math.sqrt(2 * G * (ap.y - from.y));
          const tUp = vy / G, tDown = Math.sqrt(2 * Math.max(0.1, ap.y - to.y) / G);
          st.goldT = tUp + tDown;
          st.goldVel = new Vector3(0, vy, (to.z - from.z) / st.goldT);
          this.audio.clack2(1);
        }
        const t = Math.min(st.goldT, Math.max(0, st.launchT - 0.08));
        const p = (st.goldStart as Vector3).clone().addScaledVector(st.goldVel, t).add(new Vector3(0, -0.5 * G * t * t, 0));
        this.W(p.x, p.y, p.z, st.gold.position);
        if (!st.swished && p.z > (st.apex as Vector3).z) { st.swished = true; this.audio.pop(); (st.hoop.material as MeshStandardMaterial).emissiveIntensity = 2; }
        if (t >= st.goldT) this.celebrate((st.basket as Vector3).clone().add(new Vector3(0, 3, 0)));
        break;
      }
      case 'chimes': {
        const bars = st.bars as { m: Mesh; p: Vector3; glow: number }[];
        for (const br of bars) { br.glow = Math.max(0, br.glow - dt * 2); (br.m.material as MeshStandardMaterial).emissiveIntensity = 0.25 + br.glow * 2; }
        const hop = 0.36;
        st.hopT += dt;
        const k = st.k as number;
        const from = bars[k].p.clone().add(new Vector3(0, 0.22 + this.r, 0));
        const last = k >= bars.length - 1;
        const to = last ? (st.bellPos as Vector3).clone().add(new Vector3(0, 0.5, -1.4)) : bars[k + 1].p.clone().add(new Vector3(0, 0.22 + this.r, 0));
        const T = last ? 0.55 : hop;
        const u = Math.min(1, st.hopT / T);
        const vel = to.clone().sub(from).add(new Vector3(0, 0.5 * G * T * T, 0)).multiplyScalar(1 / T);
        const tt = u * T;
        this.ballPos.copy(from).addScaledVector(vel, tt).add(new Vector3(0, -0.5 * G * tt * tt, 0));
        this.ballVel.copy(vel).add(new Vector3(0, -G * tt, 0));
        if (u >= 1) {
          if (last) {
            if (!st.rung) { st.rung = true; this.audio.bell(262); this.celebrate((st.bellPos as Vector3).clone().add(new Vector3(0, 6, 0))); this.ballVel.set(0, 0, 0); }
          } else { st.k = k + 1; st.hopT = 0; this.hitBar(k + 1); }
        }
        break;
      }
      case 'funnel': {
        // a coin funnel: angular momentum is kept, so the orbit speeds up as it shrinks
        st.t += dt;
        const c = st.c as Vector3;
        if (!st.fell) {
          st.rr = Math.max(st.rh, st.rr - (1.7 + 30 / (st.rr * st.rr)) * dt);
          const w = st.L / (st.rr * st.rr);
          st.theta += w * dt;
          const u = (st.rr - st.rh) / (st.R - st.rh);
          const y = c.y - st.depth * Math.pow(1 - u, 1.8) + this.r * 0.7;
          const px = c.x + Math.sin(st.theta) * st.rr, pz = c.z + Math.cos(st.theta) * st.rr;
          this.ballVel.set((px - this.ballPos.x) / dt, (y - this.ballPos.y) / dt, (pz - this.ballPos.z) / dt);
          this.ballPos.set(px, y, pz);
          this.audio.whir(1 - u);
          if (st.rr <= st.rh + 0.05) { st.fell = true; st.fallT = 0; this.audio.clink(0.8); }
        } else {
          st.fallT += dt;
          this.ballVel.set(0, -G * st.fallT, 0);
          this.ballPos.addScaledVector(this.ballVel, dt);
          if (st.fallT > 0.5 && this.phase === 'machine') {
            this.celebrate(new Vector3(c.x, c.y + 4, c.z));
            // fireworks over the funnel
            for (let i = 0; i < 4; i++) setTimeout(() => { this.confetti.burst(this.W(c.x + (Math.random() - 0.5) * 20, c.y + 18 + Math.random() * 8, c.z + (Math.random() - 0.5) * 10), 160, this.Y, true); this.audio.pop(true); }, 200 + i * 300);
          }
        }
        break;
      }
    }
  }

  private hitBar(k: number) {
    const st = this.st;
    st.bars[k].glow = 1;
    this.audio.chime(TUNE[k % TUNE.length]);
  }

  // ----------------------------------------------------------------- camera
  private ballCamPos() {
    const b = this.ball;
    return b.p.clone().addScaledVector(this.Z, -9).addScaledVector(this.Y, 3.5);
  }
  private machineCam(pos: Vector3, look: Vector3) {
    const st = this.st;
    const bp = this.ballPos;
    switch (this.kind) {
      case 'plinko': {
        const mid = st.top - 17;
        const fy = Math.max(st.floor + 6, Math.min(st.top - 4, bp.y));
        this.W(0, (mid + fy) / 2 + 2, st.zb - 44, pos); this.W(0, (mid + fy) / 2, st.zb, look); break;
      }
      case 'dominoes': {
        const doms = st.dominoes as { m: Group; t0: number }[];
        let idx = 0; for (let i = 0; i < doms.length; i++) if (doms[i].t0 >= 0) idx = i;
        const p = st.launched >= 0 && st.goldLocal ? st.goldLocal as Vector3 : (st.pts as Vector3[])[Math.min(idx + 2, st.pts.length - 1)];
        this.W(p.x - 14, st.y + 12, p.z - 14, pos); this.W(p.x, st.y + 1, p.z, look); break;
      }
      case 'hoop': this.W(-26, st.y + 12, (st.piv.z + st.basket.z) / 2 - 6, pos); this.W(0, st.y + 8, (st.piv.z + st.basket.z) / 2, look); break;
      case 'chimes': this.W(-16, bp.y + 7, bp.z - 12, pos); this.W(0, bp.y - 2, bp.z + 4, look); break;
      case 'funnel': this.W(0, st.c.y + 24, st.c.z - 26, pos); this.W(0, st.c.y - 3, st.c.z, look); break;
    }
  }
  private updateCamera(dt: number) {
    const want = new Vector3(), look = new Vector3();
    if (this.phase === 'rollout') { want.copy(this.ballCamPos()); look.copy(this.ball.p).addScaledVector(this.Z, 6); this.camBlend = 0; }
    else {
      this.camBlend = Math.min(1, this.camBlend + dt / 1.4);
      const e = this.camBlend * this.camBlend * (3 - 2 * this.camBlend);
      this.machineCam(want, look);
      want.lerpVectors(this.camFrom, want, e);
      look.lerpVectors(this.lookFrom, look, e);
    }
    if (this.camPos.lengthSq() === 0) { this.camPos.copy(want); this.camLook.copy(look); }
    const k = Math.min(1, dt * 5);
    this.camPos.lerp(want, k); this.camLook.lerp(look, k);
  }
  applyCamera(cam: PerspectiveCamera) {
    cam.position.copy(this.camPos);
    cam.up.set(0, 1, 0);
    cam.lookAt(this.camLook);
    if (Math.abs(cam.fov - 62) > 0.1) { cam.fov += (62 - cam.fov) * 0.1; cam.updateProjectionMatrix(); }
  }

  dispose() {
    this.scene.remove(this.group);
    this.group.traverse((o) => {
      const m = o as Mesh;
      m.geometry?.dispose();
      const mats = Array.isArray(m.material) ? m.material : m.material ? [m.material] : [];
      for (const mt of mats) { (mt as any).map?.dispose?.(); mt.dispose(); }
    });
  }
}

/** Confetti and firework sparks: one instanced mesh of little tumbling cards. */
class Confetti {
  private mesh: InstancedMesh;
  private parts: { p: Vector3; v: Vector3; r: Vector3; w: Vector3; life: number; spark: boolean }[] = [];
  private m = new Matrix4(); private q = new Quaternion(); private s = new Vector3();
  private readonly max = 900;
  constructor(parent: Group) {
    const geo = new PlaneGeometry(0.5, 0.3);
    this.mesh = new InstancedMesh(geo, new MeshBasicMaterial({ side: DoubleSide, toneMapped: false }), this.max);
    this.mesh.count = 0;
    this.mesh.frustumCulled = false;
    const c = new Color();
    for (let i = 0; i < this.max; i++) this.mesh.setColorAt(i, c.setHSL(Math.random(), 1, 0.6));
    parent.add(this.mesh);
  }
  burst(at: Vector3, n: number, up: Vector3, spark = false) {
    for (let i = 0; i < n && this.parts.length < this.max; i++) {
      const dir = new Vector3(Math.random() - 0.5, Math.random() * (spark ? 1 : 0.8) + (spark ? -0.5 : 0.6), Math.random() - 0.5).normalize();
      this.parts.push({ p: at.clone(), v: dir.multiplyScalar((spark ? 14 : 10) * (0.5 + Math.random())).addScaledVector(up, spark ? 0 : 4), r: new Vector3(Math.random() * 6, Math.random() * 6, Math.random() * 6), w: new Vector3(Math.random() * 8 - 4, Math.random() * 8 - 4, Math.random() * 8 - 4), life: spark ? 1.6 : 3.5, spark });
    }
  }
  update(dt: number) {
    this.parts = this.parts.filter((p) => (p.life -= dt) > 0);
    this.parts.forEach((p, i) => {
      p.v.y -= (p.spark ? 9 : 6) * dt;
      p.v.multiplyScalar(1 - (p.spark ? 0.6 : 1.6) * dt);
      p.p.addScaledVector(p.v, dt);
      p.r.addScaledVector(p.w, dt);
      this.q.setFromAxisAngle(this.s.copy(p.r).normalize(), p.r.length());
      const sc = Math.min(1, p.life * 2) * (p.spark ? 0.7 : 1);
      this.m.compose(p.p, this.q, this.s.set(sc, sc, sc));
      this.mesh.setMatrixAt(i, this.m);
    });
    this.mesh.count = this.parts.length;
    this.mesh.instanceMatrix.needsUpdate = true;
  }
}
