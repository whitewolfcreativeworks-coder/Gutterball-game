import { Quaternion, Vector3 } from 'three';
import type { RollingState, SensoryEvent, SensoryState } from '../core/events';
import { Track, TrackProjector, type Junction } from '../track/track';
import { halfWidth } from '../track/profile';
import type { MaterialProfile } from './materials';

/**
 * Ball dynamics.
 *
 * A rigid sphere (I = 2/5 m r^2) integrated with semi-implicit Euler at a
 * fixed 240 Hz step. Contact is resolved against the analytic track SDF:
 *   1. positional projection out of penetration,
 *   2. a normal impulse (restitution above a speed threshold),
 *   3. a Coulomb friction impulse at the contact point that couples linear
 *      and angular velocity. If the impulse needed to make the contact point
 *      stick exceeds mu_s * N the ball slides with mu_k * N instead.
 *
 * Rolling vs sliding therefore *emerges* from the simulation — it is not an
 * animation state. Visual spin, audio and haptics read the same numbers.
 *
 * Gameplay fiction (documented in docs/PHYSICS.md): the ball contains a
 * "gyro core" — an internal reaction-wheel that can apply torque to the
 * shell. Steering and propulsion work through that torque, so they act
 * *through traction*: on ice the core spins the ball and it drifts; on rubber
 * it bites. A small direct "field" force (35%) keeps low-grip worlds
 * playable. The track carries a magnetically responsive under-layer, which
 * is what the magnet attracts — the same fiction on every material.
 */

export interface BallInput {
  steer: number;        // -1..1 (right positive)
  magnet: boolean;
  jump: boolean;        // edge-triggered request
  driveLevel: number;   // 0 coast, 1 cruise, 2 push
  push?: number;        // 0..1 strength of a swipe-up push this frame (edge)
}

export interface BallTuning {
  radius: number;
  mass: number;
  gravity: number;
  steerAccel: number;
  steerDirectFrac: number;
  airSteerAccel: number;
  driveAccel: [number, number, number];
  driveCap: [number, number, number];
  airDrag: number;          // k in a = -k|v|v
  jumpSpeed: number;
  jumpCooldown: number;
  coyoteTime: number;
  magnetPressG: number;     // extra normal acceleration in contact, in g
  magnetBoostAccel: number; // forward push while the magnet is held on the track
  magnetBoostCap: number;   // boost fades out approaching this speed
  magnetAccel: number;      // max airborne attraction m/s^2
  magnetRange: number;      // metres
  magnetDrain: number;      // energy per second (energy 0..1)
  magnetRegen: number;
  magnetMinRestart: number;
  tubeFlowAccel: number;    // pneumatic push inside tubes (m/s^2)
  tubeFlowCap: number;      // ...fading out near this speed
  gutterCruise: number;     // open-gutter speed above which you ease back down (after a tube)
  turboDuration: number;    // seconds of turbo
  turboChargeTime: number;  // seconds holding the booster (with a full combo) to arm turbo
}

export const DEFAULT_TUNING: BallTuning = {
  radius: 1.15,
  mass: 1,
  gravity: 9.81,
  steerAccel: 17,
  steerDirectFrac: 0.6,
  airSteerAccel: 7.5,
  driveAccel: [0, 2.6, 3.6],
  driveCap: [0, 30, 38],
  airDrag: 0.0006,
  jumpSpeed: 7.2,
  jumpCooldown: 0.55,
  coyoteTime: 0.12,
  magnetPressG: 4.2,
  magnetBoostAccel: 14,
  magnetBoostCap: 62,
  magnetAccel: 62,
  magnetRange: 26,
  magnetDrain: 0.1,
  magnetRegen: 0.45,
  magnetMinRestart: 0.05,
  tubeFlowAccel: 24,
  tubeFlowCap: 72,
  gutterCruise: 46,
  turboDuration: 7,
  turboChargeTime: 1.0,
};

const tmpA = new Vector3();
const tmpB = new Vector3();
const tmpC = new Vector3();
const jTmp = new Vector3();
const tmpQv = new Vector3();
const tmpQv2 = new Vector3();
const jA = new Vector3();
const jB = new Vector3();
const tmpQ = new Quaternion();
const WORLD_UP = new Vector3(0, 1, 0);

export class BallPhysics {
  readonly p = new Vector3();
  readonly v = new Vector3();
  readonly w = new Vector3();
  readonly q = new Quaternion();
  readonly tune: BallTuning;
  /** Projector for the gutter the ball is currently on (main course or a branch). */
  proj: TrackProjector;
  /** The gutter the ball is currently on. */
  track: Track;
  readonly tracks: Track[];
  readonly projs: TrackProjector[];
  /** Where two tracks share one hollow (tube splits / merges). */
  junctions: Junction[] = [];
  /** Projection onto the main course (progress, checkpoints, finish). */
  get mainProj() { return this.projs[0]; }
  activeIndex = 0;
  // ---- Turbo combo: 3 swipes, hold the magnet booster, flick again ----
  pushCombo = 0;          // swipes in the current combo (0..3)
  comboTimer = 0;         // the combo fades if you stop swiping
  turboCharge = 0;        // seconds the booster has been held with a full combo
  turboArmed = false;
  turboArmTimer = 0;      // window to fire once armed
  turboTime = 0;          // seconds of turbo remaining
  material: MaterialProfile;

  // Contact state
  readonly n = new Vector3(0, 1, 0);     // last contact normal (world)
  contact = false;
  contactSource: 'track' | 'obstacle' = 'track';
  sinceContact = 1;
  airborne = true;
  airborneTime = 0;
  normalAccel = 0;
  slipSpeed = 0;
  rollingState: RollingState = 'airborne';
  jumpTimer = 0;
  // Magnet
  magnetActive = false;
  magnetEngaged = false; // wanted & energy
  magnetEnergy = 1;
  magnetForce = 0;
  readonly magnetTarget = new Vector3();
  magnetHasTarget = false;
  magnetSuppress = 0;
  boosting = false;
  pushTimer = 0;
  airJumpsLeft = 0;
  private magnetRamp = 0;
  wasMagnetAirborne = false;
  // Medium
  submersion = 0;
  inTunnel = false;
  lastSeamIndex = -1;
  driveLevel = 1;
  t = 0;
  events: SensoryEvent[] = [];
  readonly I: number;

  constructor(tracks: Track | Track[] | { all: Track[]; junctions?: Junction[] }, material: MaterialProfile, tune: Partial<BallTuning> = {}) {
    this.tune = { ...DEFAULT_TUNING, ...tune };
    this.material = material;
    if (tracks instanceof Track) this.tracks = [tracks];
    else if (Array.isArray(tracks)) this.tracks = tracks;
    else { this.tracks = tracks.all; this.junctions = tracks.junctions ?? []; }
    this.projs = this.tracks.map((t) => new TrackProjector(t));
    this.track = this.tracks[0];
    this.proj = this.projs[0];
    this.I = 0.4 * this.tune.mass * this.tune.radius * this.tune.radius;
  }

  /** Place the ball at rest (or with a speed) on the floor at arc length s. */
  placeAt(s: number, speed = 0, x = 0, trackIndex = 0) {
    const P = new Vector3(), T = new Vector3(), U = new Vector3(), R = new Vector3();
    this.activeIndex = Math.min(trackIndex, this.tracks.length - 1);
    this.track = this.tracks[this.activeIndex]; this.proj = this.projs[this.activeIndex];
    this.track.frameAtS(s, P, T, U, R);
    this.p.copy(P).addScaledVector(U, this.tune.radius + 0.002).addScaledVector(R, x);
    this.v.copy(T).multiplyScalar(speed);
    // rolling without slipping: w = (n x v) / r
    this.w.copy(U).cross(this.v).multiplyScalar(1 / this.tune.radius);
    this.n.copy(U);
    this.proj.reset(s);
    this.proj.project(this.p.x, this.p.y, this.p.z);
    for (let i = 0; i < this.projs.length; i++) { if (i === this.activeIndex) continue; this.projs[i].relocate(this.p.x, this.p.y, this.p.z); this.projs[i].project(this.p.x, this.p.y, this.p.z); }
    this.contact = true;
    this.airborne = false;
    this.sinceContact = 0;
    this.airborneTime = 0;
    this.magnetEnergy = 1;
    this.magnetActive = false;
    this.magnetEngaged = false;
    this.jumpTimer = 0;
    this.lastSeamIndex = -1;
    this.rollingState = 'rolling';
    this.pushCombo = 0; this.comboTimer = 0; this.turboCharge = 0; this.turboArmed = false; this.turboTime = 0;
  }

  /** Top-speed multiplier: 2x during turbo, easing back over its last second. */
  turboMul() { return 1 + Math.min(1, this.turboTime); }

  private emit(type: SensoryEvent['type'], intensity: number, magnitude?: number, source?: string) {
    this.events.push({ type, t: this.t, intensity: Math.max(0, Math.min(1, intensity)), magnitude, source, material: this.material.id });
  }

  /**
   * Local SDF and world-space normal at the ball centre. Inside a junction
   * the hollow is the union of both tracks' hollows (max of the two SDFs), so
   * a tube can split in two and you roll into whichever side you steer for.
   */
  private sdfAndNormal(out: Vector3, includeObstacles = true, visibleOnly = false): number {
    const d = this.sdfTrack(this.activeIndex, out, includeObstacles, visibleOnly);
    if (!this.junctions.length) return d;
    const ai = this.activeIndex, sA = this.proj.s;
    for (const j of this.junctions) {
      let other = -1, oS: [number, number] | null = null;
      if (j.a === ai && sA >= j.aS[0] && sA <= j.aS[1]) { other = j.b; oS = j.bS; }
      else if (j.b === ai && sA >= j.bS[0] && sA <= j.bS[1]) { other = j.a; oS = j.aS; }
      if (other < 0 || !oS) continue;
      const po = this.projs[other];
      po.project(this.p.x, this.p.y, this.p.z);
      const tl = this.tracks[other].length;
      if (po.s < Math.max(0.3, oS[0]) || po.s > Math.min(tl - 0.3, oS[1]) || Math.abs(po.along) > 3) continue;
      // Junction solid = (walls of A minus hollow of B) + (walls of B minus hollow of A):
      //   sdf = min( max(dA, cB), max(dB, cA) ),  c = depth inside a hollow.
      const cA = this.depthTrack(ai, jA, false), cB = this.depthTrack(other, jB, false);
      const dB = this.sdfTrack(other, jTmp, includeObstacles, visibleOnly);
      const t1 = Math.max(d, cB), t2 = Math.max(dB, cA);
      if (t1 <= t2) {
        if (cB > d) this.depthTrack(other, out, true);
        return t1;
      }
      if (cA > dB) this.depthTrack(ai, out, true); else out.copy(jTmp);
      return t2;
    }
    return d;
  }

  /** Depth inside a track's hollow; optional world gradient (points deeper inside). */
  private depthTrack(index: number, grad: Vector3, withGrad: boolean): number {
    const pr = this.projs[index], tr = this.tracks[index];
    const f = (a: number, b: number, c: number) => tr.channelDepthLocal(a, b, c);
    const d = f(pr.s, pr.x, pr.y);
    if (!withGrad) return d;
    const e = 0.01;
    const gs = (f(pr.s + e, pr.x, pr.y) - f(pr.s - e, pr.x, pr.y)) / (2 * e);
    const gx = (f(pr.s, pr.x + e, pr.y) - f(pr.s, pr.x - e, pr.y)) / (2 * e);
    const gy = (f(pr.s, pr.x, pr.y + e) - f(pr.s, pr.x, pr.y - e)) / (2 * e);
    grad.set(0, 0, 0).addScaledVector(pr.T, gs).addScaledVector(pr.R, gx).addScaledVector(pr.U, gy);
    const l = grad.length();
    if (l > 1e-6) grad.multiplyScalar(1 / l); else grad.copy(pr.U);
    return d;
  }

  private sdfTrack(index: number, out: Vector3, includeObstacles: boolean, visibleOnly: boolean): number {
    const pr = this.projs[index];
    const tr = this.tracks[index];
    const s = pr.s, x = pr.x, y = pr.y;
    const f = (a: number, b: number, c: number) => tr.sdfLocal(a, b, c, includeObstacles, visibleOnly);
    const d = f(s, x, y);
    const e = 0.01;
    const gs = (f(s + e, x, y) - f(s - e, x, y)) / (2 * e);
    const gx = (f(s, x + e, y) - f(s, x - e, y)) / (2 * e);
    const gy = (f(s, x, y + e) - f(s, x, y - e)) / (2 * e);
    out.set(0, 0, 0).addScaledVector(pr.T, gs).addScaledVector(pr.R, gx).addScaledVector(pr.U, gy);
    const len = out.length();
    if (len > 1e-6) out.multiplyScalar(1 / len);
    else out.copy(pr.U);
    return d;
  }

  step(dt: number, input: BallInput) {
    const tu = this.tune;
    const m = tu.mass;
    const r = tu.radius;
    const mat = this.material;
    this.t += dt;
    this.driveLevel = input.driveLevel;
    this.selectTrack();
    const pr = this.proj;
    const grounded = this.sinceContact <= tu.coyoteTime;

    // ---- Tunnel enter/exit events (acoustics) ----
    const tun = (this.track.isTunnel(pr.s) || this.track.isTube(pr.s)) && Math.abs(pr.x) < halfWidth(this.track.profile) + 0.5;
    if (tun !== this.inTunnel) { this.emit(tun ? 'TUNNEL_ENTER' : 'TUNNEL_EXIT', 1); this.inTunnel = tun; }

    // ---- Forces -> velocity ----
    const acc = tmpA.set(0, -tu.gravity, 0);
    // Air drag (game-scaled)
    const sp = this.v.length();
    acc.addScaledVector(this.v, -tu.airDrag * sp);

    // Medium: water (buoyancy, drag toward flow)
    this.updateMedium(acc, dt);

    // Tangent-plane axes from last contact normal
    const n = this.n;
    const Tt = tmpB.copy(pr.T).addScaledVector(n, -pr.T.dot(n));
    if (Tt.lengthSq() < 1e-6) Tt.copy(pr.T);
    Tt.normalize();
    const Rt = tmpC.copy(pr.R).addScaledVector(n, -pr.R.dot(n));
    if (Rt.lengthSq() < 1e-6) Rt.copy(pr.R);
    Rt.normalize();
    // Inside a tube the camera rolls with you, so "right" is always to your
    // right around the pipe: steering carries you up the wall and over the top.
    if (this.track.tubeAt(pr.s) > 0.5) { Rt.copy(Tt).cross(n); if (Rt.lengthSq() < 1e-6) Rt.copy(pr.R); Rt.normalize(); }

    if (grounded) {
      // Steering through the gyro core (torque) + direct field component
      // steering stops adding sideways speed past ~12 m/s, so a held tilt
      // carries you up a wall instead of spinning you round a pipe like a centrifuge
      const vlat = this.v.dot(Rt);
      const latFade = Math.max(0, Math.min(1, 1 - (Math.sign(input.steer) * vlat - 9) / 5));
      const st = input.steer * tu.steerAccel * latFade;
      acc.addScaledVector(Rt, st * tu.steerDirectFrac);
      // Grip assist: sideways sliding settles quickly when you ease off the
      // tilt, so the ball goes where you point it instead of wandering.
      acc.addScaledVector(Rt, -vlat * 1.6 * (1 - Math.min(1, Math.abs(input.steer))));
      // Δω = (n × dir)/r * Δv ; scale 3.5 so friction delivers ~the requested linear accel
      const gyro = st * (1 - tu.steerDirectFrac) * 3.5 / r * dt;
      const axis = new Vector3().copy(n).cross(Rt);
      this.w.addScaledVector(axis, gyro);
      // Propulsion (never braking): fades out approaching the level's cap speed
      const lvl = Math.max(0, Math.min(2, input.driveLevel | 0));
      const vf = this.v.dot(Tt);
      const fade = Math.max(0, Math.min(1, (tu.driveCap[lvl] * this.turboMul() - vf) / 6));
      const da = tu.driveAccel[lvl] * fade;
      if (da > 0) {
        acc.addScaledVector(Tt, da * 0.3);
        const ax2 = new Vector3().copy(n).cross(Tt);
        this.w.addScaledVector(ax2, da * 0.7 * 3.5 / r * dt);
      }
    } else {
      // In the air you can still steer; holding the magnet gives extra authority
      // so you can line up your landing while the beam pulls you down.
      acc.addScaledVector(this.track.tubeAt(pr.s) > 0.5 ? Rt : pr.R, input.steer * (this.magnetActive ? tu.airSteerAccel * 1.8 : tu.airSteerAccel));
    }

    // ---- Pneumatic tubes: an air current carries you along inside a pipe ----
    {
      const tk = this.track.tubeAt(pr.s);
      const vf = this.v.dot(pr.T);
      const turboK = this.turboMul();
      // the current goes calm approaching and through a split, so you have time to pick a side
      let calm = false;
      for (const j of this.junctions) {
        if (j.bS[0] !== 0) continue; // only split starts (not merges)
        if (this.activeIndex === j.a && pr.s > j.aS[0] - 60 && pr.s < j.aS[1]) calm = true;
        if (this.activeIndex === j.b && pr.s < j.bS[1]) calm = true;
      }
      if (tk > 0.3) {
        // WARP: tubes fire you along at up to ~260 km/h (a gentle 100 km/h current near splits)
        const capHere = this.track.warpCap[Math.max(0, Math.min(this.track.n - 1, Math.round(pr.s / this.track.ds)))] || tu.tubeFlowCap;
        const fade = Math.max(0, Math.min(1, ((calm ? Math.min(28, capHere) : capHere) * turboK - vf) / 10));
        acc.addScaledVector(pr.T, tu.tubeFlowAccel * (turboK > 1 ? 1.6 : 1) * fade * Math.min(1, (tk - 0.3) / 0.5));
      } else if (vf > tu.gutterCruise * turboK && !this.boosting) {
        // back out in the open gutter the air brakes ease you down to cruising speed (~1 s)
        acc.addScaledVector(pr.T, -(vf - tu.gutterCruise * turboK) * 1.6);
      }
      // turbo drives you on toward double cruising speed in the open too
      if (turboK > 1 && tk <= 0.3) {
        const tf = Math.max(0, Math.min(1, (tu.gutterCruise * turboK - vf) / 10));
        acc.addScaledVector(pr.T, 16 * tf * (turboK - 1));
      }
    }

    // ---- Swipe push: a physical shove that rolls the ball faster ----
    // Swipes stack into a combo of up to three. With a full combo, holding the
    // magnet booster for a second ARMS turbo; the next flick fires it: every top
    // speed doubles for a few seconds.
    this.pushTimer -= dt;
    this.comboTimer -= dt;
    if (this.comboTimer <= 0 && !this.turboArmed) { this.pushCombo = 0; this.turboCharge = 0; }
    if (this.turboArmed) { this.turboArmTimer -= dt; if (this.turboArmTimer <= 0) { this.turboArmed = false; this.pushCombo = 0; this.turboCharge = 0; } }
    if (this.turboTime > 0) { this.turboTime -= dt; if (this.turboTime <= 0) { this.turboTime = 0; this.emit('TURBO_END', 1); } }
    if (input.push && input.push > 0 && grounded && this.pushTimer <= 0) {
      const fwd = tmpA.copy(Tt);
      if (this.turboArmed) {
        // TURBO!
        this.turboArmed = false; this.pushCombo = 0; this.turboCharge = 0;
        this.turboTime = tu.turboDuration;
        const dv = 14;
        this.v.addScaledVector(fwd, dv);
        this.w.addScaledVector(new Vector3().copy(n).cross(fwd), dv / r);
        this.emit('TURBO_START', 1, dv);
      } else {
        this.pushCombo = Math.min(3, this.pushCombo + 1);
        this.comboTimer = 6;
        // each swipe in a combo shoves a little harder
        const dv = (4 + 5 * Math.min(1, input.push)) * (1 + 0.2 * (this.pushCombo - 1));
        this.v.addScaledVector(fwd, dv);
        this.w.addScaledVector(new Vector3().copy(n).cross(fwd), dv / r);
        this.emit('PUSH', Math.min(1, input.push), dv);
      }
      this.pushTimer = 0.25;
    }

    // ---- Jump ----
    this.jumpTimer -= dt;
    if (input.jump && grounded && this.jumpTimer <= 0) {
      // impulse away from the local surface; existing momentum preserved
      this.v.addScaledVector(n, tu.jumpSpeed);
      this.jumpTimer = tu.jumpCooldown;
      this.sinceContact = tu.coyoteTime + 0.01;
      this.magnetSuppress = 0.22;
      this.airJumpsLeft = 1;
      this.emit('JUMP', 1, tu.jumpSpeed);
    } else if (input.jump && !grounded && this.airJumpsLeft > 0 && this.jumpTimer <= tu.jumpCooldown - 0.18) {
      // Double jump: a second flick in the air pushes the ball higher (away from
      // the gutter floor below), cancelling some of the fall, and adds a forward flip.
      this.airJumpsLeft--;
      const up = tmpA.copy(pr.U).multiplyScalar(0.6).addScaledVector(WORLD_UP, 0.4).normalize();
      const vUp = this.v.dot(up);
      this.v.addScaledVector(up, Math.max(0, -vUp) * 0.6 + tu.jumpSpeed * 0.85);
      this.w.addScaledVector(pr.R, 18); // forward flip
      this.magnetSuppress = 0.18;
      this.jumpTimer = tu.jumpCooldown;
      this.emit('DOUBLE_JUMP', 1, tu.jumpSpeed * 0.85);
    }

    // ---- Magnet ----
    this.magnetSuppress -= dt;
    this.updateMagnet(acc, input, dt);

    this.v.addScaledVector(acc, dt);
    this.p.addScaledVector(this.v, dt);

    // ---- Collision resolution ----
    this.selectTrack();
    let touched = false;
    let impactSpeed = 0;
    let impactSource: 'track' | 'obstacle' = 'track';
    let normalImpulseTotal = 0;
    for (let iter = 0; iter < 3; iter++) {
      const nn = tmpA;
      const d = this.sdfAndNormal(nn);
      const pen = r - d;
      if (pen <= 0) break;
      // classify source
      const obd = this.track.nearestObstacleDist(pr.s, pr.x, pr.y);
      const src: 'track' | 'obstacle' = obd <= d + 0.02 ? 'obstacle' : 'track';
      touched = true;
      this.p.addScaledVector(nn, pen);
      const vn = this.v.dot(nn);
      if (vn < 0) {
        if (-vn > impactSpeed) { impactSpeed = -vn; impactSource = src; }
        const e = this.magnetActive && src === 'track' ? 0 : -vn > mat.restitutionThreshold ? (src === 'obstacle' ? Math.max(mat.restitution, 0.35) : mat.restitution) : 0; // magnet: lands and sticks, no bounce
        const Jn = -(1 + e) * m * vn;
        this.v.addScaledVector(nn, Jn / m);
        normalImpulseTotal += Jn;
        this.frictionImpulse(nn, Jn, dt);
      }
      this.n.copy(nn);
      this.contactSource = src;
      this.proj.project(this.p.x, this.p.y, this.p.z);
    }

    // Resting contact within a small skin still counts as touching (for audio & rolling)
    if (!touched) {
      const d = this.sdfAndNormal(tmpA, true);
      if (d < r + 0.015 && this.v.dot(tmpA) < 0.2) { touched = true; this.n.copy(tmpA); }
    }

    // Smoothed normal force (m/s^2)
    const instN = normalImpulseTotal / (m * dt);
    this.normalAccel += (instN - this.normalAccel) * Math.min(1, dt * 30);

    if (touched) {
      this.sinceContact = 0;
      // Rolling resistance (opposes tangential velocity, scales with normal load)
      this.rollingResistance(dt);
      // Spin damping about the normal (drilling friction)
      const wn = this.w.dot(this.n);
      this.w.addScaledVector(this.n, -wn * Math.min(1, mat.spinDamping * dt));
    } else {
      this.sinceContact += dt;
    }

    // ---- Airborne state machine (debounced) ----
    const nowAir = this.sinceContact > 0.06;
    if (nowAir && !this.airborne) {
      this.airborne = true;
      this.emit('AIRBORNE_START', Math.min(1, sp / 30), sp);
    } else if (!nowAir && this.airborne) {
      this.airborne = false;
      this.emit('AIRBORNE_END', Math.min(1, impactSpeed / 10), impactSpeed);
      if (this.magnetActive || this.wasMagnetAirborne) this.emit('MAGNETIC_CAPTURE', 1, impactSpeed);
      this.wasMagnetAirborne = false;
    }
    this.airborneTime = this.airborne ? this.airborneTime + dt : 0;
    if (impactSpeed > 1.0) this.emit('COLLISION_IMPACT', Math.min(1, impactSpeed / 12), impactSpeed, impactSource);
    this.contact = touched;

    // ---- Rolling state from contact-point slip ----
    let state: RollingState = 'airborne';
    if (touched) {
      const vc = tmpB.copy(this.w).cross(tmpC.copy(this.n).multiplyScalar(-r)).add(this.v);
      vc.addScaledVector(this.n, -vc.dot(this.n));
      this.slipSpeed = vc.length();
      state = this.slipSpeed < 0.25 ? 'rolling' : this.slipSpeed < 2.5 ? 'sliding' : 'skidding';
    } else this.slipSpeed = 0;
    if (state !== this.rollingState) {
      if (state === 'rolling') this.emit('ROLLING_CONTACT', 1);
      else if (state !== 'airborne' && this.rollingState !== 'sliding' && this.rollingState !== 'skidding') this.emit('SLIDING_CONTACT', Math.min(1, this.slipSpeed / 5), this.slipSpeed);
      this.rollingState = state;
    }

    // ---- Seam crossings (joints between planks/panels/bars) ----
    if (touched && this.contactSource === 'track' && mat.seamSpacing > 0) {
      const si = Math.floor(pr.s / mat.seamSpacing);
      if (si !== this.lastSeamIndex && this.lastSeamIndex >= 0) {
        const inten = Math.min(1, (sp / 25) * (0.5 + Math.min(1.5, this.normalAccel / tu.gravity) * 0.5));
        this.emit('SURFACE_SEAM_CROSSING', inten, sp);
        if (mat.medium === 'grating') {
          const kick = (mat.mediumParams?.kick ?? 0.05) * Math.min(sp, 30);
          this.v.addScaledVector(this.n, kick * (0.6 + 0.4 * Math.random()));
        }
      }
      this.lastSeamIndex = si;
    }

    // ---- Orientation integration from angular velocity ----
    const wl = this.w.length();
    if (wl > 1e-6) {
      tmpQ.setFromAxisAngle(tmpA.copy(this.w).multiplyScalar(1 / wl), wl * dt);
      this.q.premultiply(tmpQ).normalize();
    }
  }

  /**
   * Choose which gutter the ball is on: the one whose surface is nearest
   * (with a little hysteresis so it doesn't flicker at junctions).
   */
  private selectTrack() {
    const x = this.p.x, y = this.p.y, z = this.p.z;
    if (this.tracks.length === 1) { this.proj.project(x, y, z); return; }
    let best = this.activeIndex, bestD = Infinity;
    for (let i = 0; i < this.tracks.length; i++) {
      const pr = this.projs[i];
      pr.project(x, y, z);
      // a branch far away (or beyond its ends) can't be the one we're on
      if (Math.abs(pr.along) > 3 || Math.abs(pr.x) > 30 || Math.abs(pr.y) > 40) continue;
      let d = this.tracks[i].sdfLocal(pr.s, pr.x, pr.y, false, true);
      // being inside a track's hollow beats being merely near its outside
      if (this.tracks[i].channelDepthLocal(pr.s, pr.x, pr.y) < -0.05) d += 4;
      if (i === this.activeIndex) d -= 0.3;
      if (d < bestD) { bestD = d; best = i; }
    }
    if (best !== this.activeIndex) {
      this.activeIndex = best;
      this.track = this.tracks[best];
      this.proj = this.projs[best];
      this.lastSeamIndex = -1;
    }
  }

  /** Coulomb friction at the contact point; couples v and w. */
  private frictionImpulse(nn: Vector3, Jn: number, dt: number) {
    const m = this.tune.mass, r = this.tune.radius, mat = this.material;
    const rc = tmpB.copy(nn).multiplyScalar(-r); // centre -> contact
    const vc = tmpC.copy(this.w).cross(rc).add(this.v);
    vc.addScaledVector(nn, -vc.dot(nn));
    const vt = vc.length();
    if (vt < 1e-6) return;
    // effective mass for tangential impulse on a solid sphere: m / (1 + m r^2 / I) = 2m/7
    const mEff = m / (1 + (m * r * r) / this.I);
    let Jreq = mEff * vt;
    // Normal impulse budget includes the resting load this step
    const gripMul = this.gripMultiplier();
    const Jmax = mat.muStatic * gripMul * Jn;
    let J: number;
    if (Jreq <= Jmax) J = Jreq;
    else J = mat.muKinetic * gripMul * Jn;
    const dir = vc.multiplyScalar(-1 / vt); // opposing slip
    this.v.addScaledVector(dir, J / m);
    // angular: Δw = (rc × J dir) / I
    const tq = new Vector3().copy(rc).cross(dir).multiplyScalar(J / this.I);
    this.w.add(tq);
  }

  private gripMultiplier(): number {
    const mat = this.material;
    if (mat.medium === 'mud') {
      const gv = mat.mediumParams?.gripVariation ?? 0.5;
      const s = this.proj.s;
      const noise = 0.5 + 0.5 * Math.sin(s * 0.23) * Math.sin(s * 0.071 + 1.3);
      return 1 - gv * noise;
    }
    const clamp = this.magnetActive && this.sinceContact <= 0.05 ? 1.8 : 1; // the field clamps you to the surface
    if (mat.medium === 'water') return (1 - 0.5 * this.submersion) * clamp;
    return clamp;
  }

  private rollingResistance(dt: number) {
    const mat = this.material;
    const pr = this.proj;
    let crr = mat.rollingResistance;
    let viscous = 0;
    const ax = Math.abs(pr.x);
    if (mat.medium === 'sand') {
      const loose = ax > (mat.mediumParams?.firmHalfWidth ?? 1.1);
      crr *= loose ? (mat.mediumParams?.looseFactor ?? 2) : 1;
      viscous += (mat.mediumParams?.sinkDrag ?? 0.05) * (loose ? 1.6 : 1);
    } else if (mat.medium === 'mud') {
      viscous += mat.mediumParams?.viscous ?? 0.3;
    } else if (mat.medium === 'snow') {
      if (ax > (mat.mediumParams?.packedHalfWidth ?? 1.4)) viscous += mat.mediumParams?.powderDrag ?? 0.08;
      else viscous += 0.015;
    }
    const vt = tmpB.copy(this.v).addScaledVector(this.n, -this.v.dot(this.n));
    const spd = vt.length();
    if (spd < 1e-4) return;
    const N = Math.max(this.normalAccel, 0);
    const dv = Math.min(spd, (crr * N + viscous * spd) * dt);
    this.v.addScaledVector(vt, -dv / spd);
    // keep spin consistent with the slowed rolling
    const wr = new Vector3().copy(this.n).cross(vt).multiplyScalar(-dv / spd / this.tune.radius);
    this.w.add(wr);
  }

  private updateMedium(acc: Vector3, dt: number) {
    const mat = this.material;
    const pr = this.proj;
    let sub = 0;
    if (mat.medium === 'water' && !this.track.isGap(pr.s) && Math.abs(pr.x) < halfWidth(this.track.profile)) {
      const depth = mat.mediumParams?.depth ?? 1.2;
      const r = this.tune.radius;
      sub = Math.max(0, Math.min(1, (depth - (pr.y - r)) / (2 * r)));
      if (sub > 0) {
        const flow = mat.mediumParams?.flow ?? 8;
        const drag = mat.mediumParams?.drag ?? 1.5;
        const buoy = mat.mediumParams?.buoyancy ?? 0.25;
        acc.addScaledVector(WORLD_UP, this.tune.gravity * buoy * sub);
        // drag relative to the moving water
        const rel = new Vector3().copy(pr.T).multiplyScalar(flow).sub(this.v);
        acc.addScaledVector(rel, drag * sub * 0.5);
        // angular damping in fluid
        this.w.multiplyScalar(1 - Math.min(0.5, 2 * sub * dt));
      }
    }
    if (sub > 0.05 && this.submersion <= 0.05) this.emit('WATER_ENTRY', Math.min(1, this.v.length() / 12), this.v.length());
    if (sub <= 0.05 && this.submersion > 0.05) this.emit('WATER_EXIT', 0.6);
    this.submersion = sub;
  }

  private updateMagnet(acc: Vector3, input: BallInput, dt: number) {
    const tu = this.tune;
    const want = input.magnet && this.magnetSuppress <= 0;
    // Energy limits the ON-TRACK booster/clamp. The tractor beam in the air
    // always answers (it is how you save yourself); at low energy it still
    // pulls at 65 % strength.
    const inAir = this.sinceContact > 0.03;
    if (want && !this.magnetEngaged && (inAir || this.magnetEnergy > tu.magnetMinRestart)) this.magnetEngaged = true;
    if (!want) this.magnetEngaged = false;
    if (this.magnetEngaged && !inAir && this.magnetEnergy <= 0) this.magnetEngaged = false;
    const active = this.magnetEngaged;
    if (!active) this.magnetRamp = 0;
    const engagedNow = active && !this.magnetActive;
    if (active !== this.magnetActive) {
      this.emit(active ? 'MAGNET_ENGAGED' : 'MAGNET_RELEASED', 1);
      this.magnetActive = active;
    }
    this.magnetHasTarget = false;
    this.magnetForce = 0;
    this.boosting = false;
    if (active) {
      this.magnetEnergy = Math.max(0, this.magnetEnergy - tu.magnetDrain * (inAir ? 1.6 : 1) * dt);
      const nn = new Vector3();
      let d = this.sdfAndNormal(nn, false, true);
      const prj = this.proj, prof = this.track.profile;
      const Wc = halfWidth(prof);
      const inTube = this.track.tubeAt(prj.s) > 0.85;
      const outside = !inTube && (Math.abs(prj.x) > Wc - this.tune.radius * 0.5 || prj.y > prof.H);
      const grounded0 = this.sinceContact <= 0.03;
      if (!inTube && !outside && !grounded0 && Math.abs(prj.along) < 3 && !this.track.isGap(prj.s)) {
        // In the air inside the channel: aim at the gutter surface directly
        // beneath the ball (keeps your lateral line; never a far wall or the rim).
        const ax = Math.abs(prj.x);
        const ys = ax <= prof.a ? 0 : prof.rc - Math.sqrt(Math.max(0, prof.rc * prof.rc - (Math.min(ax, Wc) - prof.a) ** 2));
        this.magnetTarget.copy(prj.P).addScaledVector(prj.R, prj.x).addScaledVector(prj.U, ys);
        nn.copy(this.p).sub(this.magnetTarget);
        const dl = nn.length();
        if (dl > 1e-4) nn.multiplyScalar(1 / dl); else nn.copy(prj.U);
        d = Math.max(0, dl - this.tune.radius);
      }
      if (outside && Math.abs(prj.along) < 3 && !this.track.isGap(prj.s)) {
        // Rescue: above the rim or beside the gutter, the beam pulls you back
        // INTO the channel (towards the floor), never onto the outside of a wall.
        const tx = Math.max(-(Wc - 1.6), Math.min(Wc - 1.6, prj.x));
        // beside and below the rim: first lift over the rim, then into the channel
        const besideLow = Math.abs(prj.x) > Wc && prj.y < prof.H + 1.5;
        this.magnetTarget.copy(prj.P).addScaledVector(prj.R, besideLow ? Math.sign(prj.x) * (Wc - 1) : tx).addScaledVector(prj.U, besideLow ? prof.H + 3 : 0.05);
        nn.copy(this.p).sub(this.magnetTarget);
        d = nn.length();
        if (d > 1e-4) nn.multiplyScalar(1 / d); else nn.copy(prj.U);
        d = Math.max(0, d - this.tune.radius);
      }
      if (d < tu.magnetRange) {
        // Closest point on the track shell (or the rescue point)
        if (!outside && (grounded0 || inTube)) this.magnetTarget.copy(this.p).addScaledVector(nn, -d);
        this.magnetHasTarget = true;
        const grounded = this.sinceContact <= 0.03;
        if (grounded) {
          // press into surface: raises normal load -> more traction, holds inverted
          acc.addScaledVector(nn, -tu.magnetPressG * tu.gravity);
          // ...and holds you where you are on a wall: it cancels most of the pull of
          // gravity *around* the gutter (a rolling ball would otherwise just roll
          // down the wall), but never the downhill pull along the course.
          {
            const g = tmpQv.set(0, -tu.gravity, 0);
            g.addScaledVector(nn, -g.dot(nn));
            const fwd0 = tmpQv2.copy(this.proj.T).addScaledVector(nn, -this.proj.T.dot(nn));
            if (fwd0.lengthSq() > 1e-6) { fwd0.normalize(); g.addScaledVector(fwd0, -g.dot(fwd0)); }
            acc.addScaledVector(g, -0.9);
          }
          // kill any small hop off the surface: you stay locked on
          const off = this.v.dot(nn);
          if (off > 0) this.v.addScaledVector(nn, -off * Math.min(1, dt * 25));
          // BOOSTER: on the track the field also drives the ball forward along the course
          const fwd = new Vector3().copy(this.proj.T).addScaledVector(nn, -this.proj.T.dot(nn));
          if (fwd.lengthSq() > 1e-6) {
            fwd.normalize();
            const vf = this.v.dot(fwd);
            const fade = Math.max(0, Math.min(1, (tu.magnetBoostCap * this.turboMul() - vf) / 8));
            acc.addScaledVector(fwd, tu.magnetBoostAccel * fade);
            // spin the ball up to match, so it keeps rolling rather than skidding
            this.w.addScaledVector(new Vector3().copy(nn).cross(fwd), (tu.magnetBoostAccel * fade * dt) / this.tune.radius);
            this.boosting = fade > 0.05 || this.turboTime > 0;
            // a full swipe combo + holding the booster charges turbo
            if (this.pushCombo >= 3 && !this.turboArmed && this.turboTime <= 0) {
              this.turboCharge += dt;
              this.comboTimer = Math.max(this.comboTimer, 0.5);
              if (this.turboCharge >= tu.turboChargeTime) { this.turboArmed = true; this.turboArmTimer = 4; this.emit('TURBO_ARMED', 1); }
            }
          }
          this.magnetForce = 0.85;
        } else {
          this.wasMagnetAirborne = true;
          const fall = 1 - smoothstep(tu.magnetRange * 0.55, tu.magnetRange, d);
          // LUNGE: the instant the beam locks on you get yanked toward the surface
          if (engagedNow) this.v.addScaledVector(nn, -Math.min(5, 2 + d * 0.25));
          this.magnetRamp = Math.min(1, this.magnetRamp + dt / 0.1);
          const a = tu.magnetAccel * fall * (0.5 + 0.5 * this.magnetRamp) * (0.65 + 0.35 * Math.min(1, this.magnetEnergy * 4));
          acc.addScaledVector(nn, -a);
          // damp velocity directed away from the surface (prevents orbiting)
          const away = this.v.dot(nn);
          if (away > 0) acc.addScaledVector(nn, -away * 4 * fall);
          // approach limiter: a hard, fast pull that still lands cleanly
          const closing = -away;
          const vmax = 9 + 4 * Math.max(0, d - this.tune.radius);
          if (closing > vmax) acc.addScaledVector(nn, Math.min(140, (closing - vmax) * 14));
          this.magnetForce = Math.min(1, a / tu.magnetAccel);
        }
      }
    } else if (this.sinceContact <= 0.05) {
      this.magnetEnergy = Math.min(1, this.magnetEnergy + tu.magnetRegen * dt);
    } else {
      this.magnetEnergy = Math.min(1, this.magnetEnergy + tu.magnetRegen * 0.35 * dt);
    }
  }

  snapshot(): SensoryState {
    const pr = this.proj;
    return {
      t: this.t,
      speed: this.v.length(),
      angularSpeed: this.w.length(),
      contact: this.contact,
      rollingState: this.rollingState,
      normalAccel: this.normalAccel,
      slipSpeed: this.slipSpeed,
      material: this.material.id,
      airborneTime: this.airborneTime,
      magnetActive: this.magnetActive,
      magnetForce: this.magnetForce,
      magnetEnergy: this.magnetEnergy,
      boosting: this.boosting,
      pushCombo: this.pushCombo,
      turboArmed: this.turboArmed,
      turboActive: this.turboTime > 0,
      submersion: this.submersion,
      inTunnel: this.inTunnel,
      lateral: pr.x,
      height: pr.y,
      s: pr.s,
      driveLevel: this.driveLevel,
    };
  }
}

function smoothstep(a: number, b: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}
