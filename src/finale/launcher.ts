import {
  AdditiveBlending, BoxGeometry, Color, CylinderGeometry, Curve, Group, Mesh, MeshBasicMaterial, MeshStandardMaterial,
  PerspectiveCamera, Scene, SphereGeometry, TubeGeometry, Vector3, Matrix4, CircleGeometry, DoubleSide,
} from 'three';
import type { BallPhysics } from '../physics/ball';
import type { Course } from '../track/track';
import type { AudioEngine } from '../audio/audioEngine';
import type { HapticEngine } from '../haptics/haptics';

/**
 * THE PLUNGER: every race starts with a pinball-style launcher built into the
 * start of the gutter. Pull the knob back (drag down, or hold Space / ↓),
 * the ratchet clicks and the spring winds up, a row of lights shows your
 * power; let go and the rod THWACKS the ball down the gutter, straight into
 * the first tube. The further you pull, the faster you leave.
 */
export const PULL_LEN = 3;          // how far the ball and rod travel back at full pull (m)
const ROD_LEN = 5.2;
const NOTCHES = 14;

/** Launch speed (m/s) for a given pull 0..1. */
export function launchSpeed(pull: number): number {
  return 10 + 26 * Math.pow(Math.max(0, Math.min(1, pull)), 0.9);
}

class Helix extends Curve<Vector3> {
  constructor(private turns: number, private radius: number) { super(); }
  getPoint(t: number, out = new Vector3()) {
    const a = t * this.turns * Math.PI * 2;
    return out.set(Math.cos(a) * this.radius, Math.sin(a) * this.radius, t);
  }
}

export class PlungerLauncher {
  phase: 'ready' | 'pulling' | 'release' | 'done' = 'ready';
  pull = 0;
  /** The pull the ball was launched with. */
  power = 0;
  done = false;
  private target = 0;
  private keyHeld = false;
  private auto = false;
  private releaseT = 0;
  private releaseFrom = 0;
  private lastNotch = 0;
  private t = 0;
  private group = new Group();
  private base = new Vector3(); private T = new Vector3(); private U = new Vector3(); private R = new Vector3();
  private s0: number;
  private rod = new Group();
  private spring!: Mesh;
  private housingD: number;
  private lights: MeshBasicMaterial[] = [];
  private camPosV = new Vector3(); private camLookV = new Vector3();
  private camInit = false;

  constructor(private scene: Scene, course: Course, private ball: BallPhysics, private audio: AudioEngine, private haptics: HapticEngine, accent: number) {
    const tr = course.main;
    this.s0 = tr.checkpoints[0];
    const P = new Vector3();
    tr.frameAtS(this.s0, P, this.T, this.U, this.R);
    const r = ball.tune.radius;
    this.base.copy(P).addScaledVector(this.U, r);
    this.housingD = -r - PULL_LEN - 1.1;
    this.build(accent, r);
    // the launch lane lights run up the floor ahead of the ball
    const disc = new CircleGeometry(0.42, 20);
    for (let k = 0; k < 10; k++) {
      const s = this.s0 + 3 + k * 2.6;
      const Pl = new Vector3(), Tl = new Vector3(), Ul = new Vector3(), Rl = new Vector3();
      tr.frameAtS(s, Pl, Tl, Ul, Rl);
      const m = new MeshBasicMaterial({ color: new Color().setHSL(0.33 - 0.33 * (k / 9), 1, 0.55), transparent: true, opacity: 0.15, blending: AdditiveBlending, depthWrite: false, toneMapped: false, side: DoubleSide });
      const d = new Mesh(disc, m);
      d.quaternion.setFromRotationMatrix(new Matrix4().makeBasis(Rl, Tl, Ul));
      d.position.copy(Pl).addScaledVector(Ul, 0.05);
      this.group.add(d);
      this.lights.push(m);
    }
    scene.add(this.group);
    this.update(0);
  }

  /** A point on the plunger's axis, d metres along the course from the ball's rest position. */
  private axis(d: number, out: Vector3) { return out.copy(this.base).addScaledVector(this.T, d); }

  private build(accent: number, r: number) {
    const chrome = new MeshStandardMaterial({ color: 0xeef0f6, roughness: 0.15, metalness: 1 });
    const dark = new MeshStandardMaterial({ color: 0x1b1b22, roughness: 0.5, metalness: 0.6 });
    const red = new MeshStandardMaterial({ color: 0xe0142e, roughness: 0.25, metalness: 0.2, emissive: new Color(0x400008) });
    const along = new Matrix4().makeBasis(this.R.clone().negate(), this.U, this.T); // right-handed, local z = along the course
    // the moving part: rubber tip, rod, knob (local z: 0 at the tip face, negative behind)
    const tip = new Mesh(new CylinderGeometry(0.78, 0.78, 0.5, 24), new MeshStandardMaterial({ color: 0x111111, roughness: 0.8 }));
    tip.rotation.x = Math.PI / 2; tip.position.z = -0.25; this.rod.add(tip);
    const cap = new Mesh(new CylinderGeometry(0.62, 0.62, 0.18, 24), chrome); cap.rotation.x = Math.PI / 2; cap.position.z = -0.58; this.rod.add(cap);
    const rod = new Mesh(new CylinderGeometry(0.2, 0.2, ROD_LEN, 12), chrome); rod.rotation.x = Math.PI / 2; rod.position.z = -0.5 - ROD_LEN / 2; this.rod.add(rod);
    const knobNeck = new Mesh(new CylinderGeometry(0.42, 0.55, 0.6, 16), red); knobNeck.rotation.x = Math.PI / 2; knobNeck.position.z = -0.5 - ROD_LEN; this.rod.add(knobNeck);
    const knob = new Mesh(new SphereGeometry(0.85, 24, 16), red); knob.scale.z = 0.8; knob.position.z = -0.5 - ROD_LEN - 0.75; this.rod.add(knob);
    this.rod.quaternion.setFromRotationMatrix(along);
    this.group.add(this.rod);
    // the fixed housing the rod slides through, standing on the gutter floor
    const hz = this.housingD;
    const housing = new Group();
    const block = new Mesh(new BoxGeometry(1.6, 1.6, 1.1), chrome); housing.add(block);
    const ring = new Mesh(new CylinderGeometry(0.4, 0.4, 1.16, 16), dark); ring.rotation.x = Math.PI / 2; housing.add(ring);
    const footH = Math.max(0.12, r - 0.8 + 0.05); const foot = new Mesh(new BoxGeometry(2.2, footH, 1.4), dark); foot.position.y = -r + footH / 2; housing.add(foot);
    const band = new Mesh(new BoxGeometry(1.64, 0.26, 1.14), new MeshStandardMaterial({ color: new Color(accent), emissive: new Color(accent), emissiveIntensity: 0.7 })); band.position.y = 0.5; housing.add(band);
    housing.quaternion.setFromRotationMatrix(along);
    this.axis(hz, housing.position);
    this.group.add(housing);
    // the spring between the housing and the tip (stretched along local z)
    const helix = new TubeGeometry(new Helix(9, 0.5), 220, 0.075, 6, false);
    this.spring = new Mesh(helix, chrome);
    this.spring.quaternion.setFromRotationMatrix(along);
    this.group.add(this.spring);
  }

  /** Drag: how far back the knob is held (0..1). */
  setPull(p: number) { if (this.phase === 'ready' || this.phase === 'pulling') { this.target = Math.max(0, Math.min(1, p)); this.phase = 'pulling'; } }
  /** Keyboard: hold to keep pulling. */
  holdKey(down: boolean) { if (down) { this.keyHeld = true; this.phase = this.phase === 'ready' ? 'pulling' : this.phase; } else if (this.keyHeld) { this.keyHeld = false; this.release(); } }
  /** Let go. */
  release() {
    if (this.phase !== 'pulling') return;
    if (this.pull < 0.04) { this.phase = 'ready'; this.target = 0; this.pull = 0; return; }
    this.phase = 'release'; this.releaseT = 0; this.releaseFrom = this.pull; this.power = this.pull;
  }
  /** A quick swipe up: a good strong pull and release, done for you. */
  fire() { if (this.phase === 'ready') { this.auto = true; this.phase = 'pulling'; this.target = 0.85; } }

  update(dt: number) {
    this.t += dt;
    if (this.phase === 'pulling') {
      if (this.keyHeld) this.target = Math.min(1, this.target + dt * 0.9);
      // the knob follows your finger, a little heavy (it's a spring)
      this.pull += (this.target - this.pull) * Math.min(1, dt * 14);
      if (this.auto && this.pull > this.target - 0.02) { this.auto = false; this.release(); }
    } else if (this.phase === 'release') {
      // the spring snaps the rod home in a few hundredths of a second
      this.releaseT += dt;
      const k = Math.min(1, this.releaseT / 0.06);
      this.pull = this.releaseFrom * (1 - k * k);
      if (k >= 1) {
        this.phase = 'done'; this.done = true;
        this.audio.plungerRelease(this.power);
        this.haptics.tap(30 + 40 * this.power, 0.6 + 0.4 * this.power, 3);
      }
    }
    // ratchet clicks as it winds back (softer ones easing forward)
    const notch = Math.floor(this.pull * NOTCHES + 1e-6);
    if (this.phase === 'pulling' && notch !== this.lastNotch) {
      if (notch > this.lastNotch) { this.audio.plungerTick(this.pull); this.haptics.tap(6, 0.25 + 0.5 * this.pull, 1); }
      this.lastNotch = notch;
    }
    if (this.phase !== 'pulling') this.lastNotch = notch;
    // pose: tip face just behind the ball, everything moves back with the pull
    const r = this.ball.tune.radius;
    const dTip = -r - 0.02 - this.pull * PULL_LEN;
    this.axis(dTip, this.rod.position);
    const springFront = dTip - 0.68, springBack = this.housingD + 0.65;
    this.axis(springBack, this.spring.position);
    this.spring.scale.set(1, 1, Math.max(0.2, springFront - springBack));
    // the ball rests against the tip (until the very end of the snap, when it flies)
    if (this.phase !== 'done') this.ball.placeAt(this.s0 - this.pull * PULL_LEN, 0);
    // power lights
    const p = this.phase === 'release' || this.phase === 'done' ? this.power : this.pull;
    this.lights.forEach((m, k) => {
      const on = p * 10 > k + 0.5;
      m.opacity = on ? 0.95 : 0.12 + 0.06 * Math.sin(this.t * 4 - k * 0.6);
    });
    this.updateCamera(dt);
  }

  private updateCamera(dt: number) {
    // behind the knob, a little up and to the side: the plunger, the ball and the course ahead in one view
    const pos = this.axis(-17.5 - this.pull * 2, new Vector3()).addScaledVector(this.U, 6.2).addScaledVector(this.R, 3.2);
    const look = this.axis(7, new Vector3()).addScaledVector(this.U, 0.2);
    if (!this.camInit) { this.camPosV.copy(pos); this.camLookV.copy(look); this.camInit = true; }
    const k = 1 - Math.exp(-dt * 6);
    this.camPosV.lerp(pos, k); this.camLookV.lerp(look, k);
  }
  get camPos() { return this.camPosV; }
  get camLook() { return this.camLookV; }

  applyCamera(cam: PerspectiveCamera) {
    cam.position.copy(this.camPosV);
    cam.up.set(0, 1, 0);
    cam.lookAt(this.camLookV);
    // the view tightens as the spring winds up
    const fov = (cam.aspect < 0.8 ? 72 : 60) - this.pull * 8;
    if (Math.abs(cam.fov - fov) > 0.05) { cam.fov += (fov - cam.fov) * 0.2; cam.updateProjectionMatrix(); }
  }

  dispose() {
    this.scene.remove(this.group);
    this.group.traverse((o) => { const m = o as Mesh; if (m.geometry) m.geometry.dispose(); });
  }
}
