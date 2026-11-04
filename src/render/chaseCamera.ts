import { PerspectiveCamera, Vector3, Quaternion } from 'three';
import type { BallPhysics } from '../physics/ball';
import type { Track } from '../track/track';

/**
 * Rollercoaster chase camera.
 *
 * Goal: the walls should rush past and the body should *feel* the ride.
 * Techniques (from motion-simulator and racing-game practice):
 *  - Low and close: the camera rides just above the ball so the walls fill
 *    the peripheral view (speed perception depends heavily on periphery).
 *  - Full banking with the track, plus an extra lean from lateral g-force,
 *    so the horizon swings through turns like a coaster car.
 *  - Vertical g: the view sinks under compression (bottom of a dip) and
 *    floats on crests / when airborne.
 *  - Speed-dependent field of view and high-frequency vibration; short FOV
 *    "punches" on jumps and landings.
 *  - Look-ahead along the course so obstacles stay readable.
 * Everything scales with the player's "speed effects" setting.
 */
export class ChaseCamera {
  readonly cam: PerspectiveCamera;
  private pos = new Vector3();
  private look = new Vector3();
  private up = new Vector3(0, 1, 0);
  private initialised = false;
  private P = new Vector3(); private T = new Vector3(); private U = new Vector3(); private R = new Vector3();
  private P2 = new Vector3(); private T2 = new Vector3(); private U2 = new Vector3(); private R2 = new Vector3();
  private airPull = 0;
  private lastV = new Vector3();
  private latG = 0;      // smoothed lateral acceleration (m/s^2, + = pushed right)
  private vertG = 0;     // smoothed normal-load excess in g
  private dip = 0;       // current vertical camera offset
  private fovPunch = 0;
  private magPull = 0;
  private t = 0;
  shake = 0;
  fx = 0.8;              // speed-effects strength 0..1
  private baseFov = 80;

  constructor(aspect: number) {
    this.cam = new PerspectiveCamera(80, aspect, 0.1, 6000);
  }

  resize(aspect: number) {
    this.cam.aspect = aspect;
    // Portrait screens are narrow: a wide vertical FOV keeps the walls in the periphery.
    this.baseFov = aspect < 0.75 ? 84 : aspect < 1.2 ? 76 : 66;
    this.cam.updateProjectionMatrix();
  }

  snap() { this.initialised = false; }
  punch(amount: number) { this.fovPunch = Math.max(this.fovPunch, amount); }

  update(b: BallPhysics, track: Track, dt: number) {
    this.t += dt;
    const fx = this.fx;
    const s = Math.max(0, b.proj.s);
    track.frameAtS(s, this.P, this.T, this.U, this.R);
    const speed = b.v.length();

    // --- g-forces from the ball's actual motion ---
    const acc = new Vector3().subVectors(b.v, this.lastV).multiplyScalar(1 / Math.max(dt, 1e-3));
    this.lastV.copy(b.v);
    if (!this.initialised) acc.set(0, 0, 0);
    const lat = acc.dot(this.R);
    this.latG += (Math.max(-40, Math.min(40, lat)) - this.latG) * Math.min(1, dt * 4);
    const vg = b.contact ? Math.max(-1, Math.min(3, b.normalAccel / 9.81 - 1)) : -0.6;
    this.vertG += (vg - this.vertG) * Math.min(1, dt * 5);

    // --- up vector: ride the bank like a coaster car, plus a g-force lean ---
    const inv = this.U.y < 0.35;
    const bankFollow = inv ? 0.95 : 0.85;
    const desiredUp = new Vector3(0, 1, 0).lerp(this.U, bankFollow).normalize();
    // --- inside a tube: the camera rides with the ball around the pipe ---
    // "Up" points from the ball toward the pipe's axis, so as you roll up the
    // wall and over the top the whole world turns around you.
    const tk = track.tubeAt(s);
    const Hc = track.profile.H;
    let tdx = -b.proj.x, tdy = Hc - b.proj.y;
    const tl = Math.hypot(tdx, tdy) || 1; tdx /= tl; tdy /= tl;
    if (tk > 0.001) {
      const tubeUp = this.R.clone().multiplyScalar(tdx).addScaledVector(this.U, tdy).normalize();
      desiredUp.lerp(tubeUp, tk).normalize();
    }
    const lean = Math.max(-0.22, Math.min(0.22, -this.latG * 0.012)) * fx; // radians
    desiredUp.applyQuaternion(new Quaternion().setFromAxisAngle(this.T, lean));

    // --- position: low and close behind along the track ---
    const back = 6.6 + Math.min(3.5, speed * 0.07);
    this.airPull += ((b.airborne ? 1 : 0) - this.airPull) * Math.min(1, dt * 2.5);
    const targetDip = (-this.vertG * 0.45 + this.airPull * 1.2) * fx;
    this.dip += (targetDip - this.dip) * Math.min(1, dt * 6);
    const height = 3.0 + this.dip;
    track.frameAtS(Math.max(0, s - back), this.P2, this.T2, this.U2, this.R2);
    const lat0 = b.proj.x * 0.6;
    const vert = Math.max(0, b.proj.y - 0.75) * 0.55;
    const camUp = new Vector3(0, 1, 0).lerp(this.U2, bankFollow).normalize();
    const desiredPos = this.P2.clone().addScaledVector(this.R2, lat0).addScaledVector(this.U2, vert).addScaledVector(camUp, height);
    if (tk > 0.001) {
      // 3 m from the ball toward the pipe's axis (always inside the pipe)
      const tubePos = this.P2.clone().addScaledVector(this.R2, b.proj.x + tdx * 3.0).addScaledVector(this.U2, b.proj.y + tdy * 3.0);
      desiredPos.lerp(tubePos, tk);
    }

    // --- look ahead along the course ---
    const ahead = Math.min(16, 6 + speed * 0.3);
    track.frameAtS(s + ahead, this.P2, this.T2, this.U2, this.R2);
    const aheadPt = this.P2.clone().addScaledVector(this.U2, 0.9).addScaledVector(this.R2, b.proj.x * 0.3);
    if (tk > 0.001) {
      const tubeAhead = this.P2.clone().addScaledVector(this.R2, b.proj.x * 0.7).addScaledVector(this.U2, Hc + (b.proj.y - Hc) * 0.7);
      aheadPt.lerp(tubeAhead, tk);
    }
    const desiredLook = b.p.clone().lerp(aheadPt, 0.5);

    if (!this.initialised) {
      this.pos.copy(desiredPos); this.look.copy(desiredLook); this.up.copy(desiredUp);
      this.initialised = true;
    } else {
      const kp = 1 - Math.exp(-dt * 10);
      const kl = 1 - Math.exp(-dt * 13);
      const ku = 1 - Math.exp(-dt * (inv ? 4 : tk > 0.5 ? 7 : 5));
      this.pos.lerp(desiredPos, kp);
      this.look.lerp(desiredLook, kl);
      this.up.lerp(desiredUp, ku);
      if (this.up.lengthSq() < 0.09) this.up.addScaledVector(this.R, 0.5); // never collapse when flipping over
      this.up.normalize();
    }
    if (this.pos.distanceTo(b.p) > 14) this.pos.lerp(desiredPos, 0.5);

    this.cam.position.copy(this.pos);
    // --- vibration: road rumble that grows with speed, plus impact shake ---
    const sp01 = Math.min(1, speed / 32);
    const rumble = (b.contact ? 0.012 + 0.05 * sp01 * sp01 : 0.004) * fx;
    const amp = rumble + this.shake * 0.14;
    if (amp > 0) {
      const t = this.t;
      const nx = Math.sin(t * 61.3) * 0.6 + Math.sin(t * 97.1 + 1.3) * 0.4;
      const ny = Math.sin(t * 73.7 + 0.7) * 0.6 + Math.sin(t * 113.9 + 2.1) * 0.4;
      this.cam.position.addScaledVector(this.R, nx * amp).addScaledVector(this.up, ny * amp);
    }
    this.shake = Math.max(0, this.shake - dt * 4);
    this.cam.up.copy(this.up);
    this.cam.lookAt(this.look);

    // --- field of view widens with speed; short punches on jumps/landings ---
    this.fovPunch = Math.max(0, this.fovPunch - dt * 18);
    // tractor beam yanking you through the air: the view narrows toward the surface (dolly-zoom pull)
    const pullT = b.magnetActive && !b.contact && b.magnetHasTarget ? 7 * b.magnetForce : 0;
    this.magPull += (pullT - this.magPull) * Math.min(1, dt * 8);
    // warp: at tube speeds the view stretches wider still
    const warp = tk * Math.min(16, Math.max(0, speed - 38) * 0.5) + (b.turboMul() - 1) * 10;
    const fov = this.baseFov + (Math.min(18, Math.max(0, speed - 10) * 0.75) + warp + this.fovPunch - this.magPull) * (0.4 + 0.6 * fx);
    if (Math.abs(this.cam.fov - fov) > 0.05) {
      this.cam.fov += (fov - this.cam.fov) * Math.min(1, dt * 4);
      this.cam.updateProjectionMatrix();
    }
  }
}
