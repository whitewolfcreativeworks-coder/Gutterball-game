import { PerspectiveCamera, Vector3, Quaternion, Matrix4 } from 'three';
import type { BallPhysics } from '../physics/ball';
import type { Track } from '../track/track';

/**
 * Chase camera. Follows the *track frame* at the ball's position rather than
 * the ball's velocity (which can be erratic during impacts), with:
 *  - critically damped smoothing of position and orientation,
 *  - look-ahead along the course so upcoming obstacles stay visible,
 *  - partial banking with the track (full banking through loops so the
 *    inversion reads correctly, but heavily smoothed),
 *  - jump framing (pulls back when airborne) and FOV widening at speed.
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
  shake = 0;

  constructor(aspect: number) {
    this.cam = new PerspectiveCamera(70, aspect, 0.1, 6000);
  }

  resize(aspect: number) {
    this.cam.aspect = aspect;
    // Portrait screens are narrow: widen vertical FOV so the gutter fits.
    this.baseFov = aspect < 0.75 ? 78 : aspect < 1.2 ? 72 : 62;
    this.cam.updateProjectionMatrix();
  }
  private baseFov = 70;

  snap() { this.initialised = false; }

  update(b: BallPhysics, track: Track, dt: number) {
    const s = Math.max(0, b.proj.s);
    track.frameAtS(s, this.P, this.T, this.U, this.R);
    const speed = b.v.length();
    // Up vector: blend between world up and track up. In loops (U.y < 0.3) follow the track fully.
    const inv = this.U.y < 0.35;
    const bankFollow = inv ? 0.95 : 0.55;
    const desiredUp = new Vector3(0, 1, 0).lerp(this.U, bankFollow).normalize();
    // Camera rides behind along the track and above along its up vector
    const back = 7.8 + Math.min(4, speed * 0.1);
    this.airPull += ((b.airborne ? 1 : 0) - this.airPull) * Math.min(1, dt * 2.5);
    const height = 3.8 + this.airPull * 1.4;
    const behindS = Math.max(0, s - back);
    track.frameAtS(behindS, this.P2, this.T2, this.U2, this.R2);
    // lateral: follow ball partly so walls stay in view
    const lat = b.proj.x * 0.55;
    const vert = Math.max(0, b.proj.y - 0.4) * 0.5;
    const camUp = new Vector3(0, 1, 0).lerp(this.U2, bankFollow).normalize();
    const desiredPos = this.P2.clone().addScaledVector(this.R2, lat).addScaledVector(this.U2, vert).addScaledVector(camUp, height);
    // Look ahead along the track
    const ahead = Math.min(14, 5 + speed * 0.3);
    track.frameAtS(s + ahead, this.P2, this.T2, this.U2, this.R2);
    const desiredLook = b.p.clone().lerp(this.P2.addScaledVector(this.U2, 0.8).addScaledVector(this.R2, b.proj.x * 0.3), 0.45);

    if (!this.initialised) {
      this.pos.copy(desiredPos); this.look.copy(desiredLook); this.up.copy(desiredUp);
      this.initialised = true;
    } else {
      const kp = 1 - Math.exp(-dt * 9);
      const kl = 1 - Math.exp(-dt * 12);
      const ku = 1 - Math.exp(-dt * (inv ? 3.5 : 2.5));
      this.pos.lerp(desiredPos, kp);
      this.look.lerp(desiredLook, kl);
      this.up.lerp(desiredUp, ku).normalize();
    }
    // keep the camera from drifting too far from the ball (high-speed catch-up)
    const d = this.pos.distanceTo(b.p);
    if (d > 16) this.pos.lerp(desiredPos, 0.5);

    this.cam.position.copy(this.pos);
    if (this.shake > 0) {
      this.cam.position.x += (Math.random() - 0.5) * this.shake * 0.12;
      this.cam.position.y += (Math.random() - 0.5) * this.shake * 0.12;
      this.shake = Math.max(0, this.shake - dt * 4);
    }
    this.cam.up.copy(this.up);
    this.cam.lookAt(this.look);
    const fov = this.baseFov + Math.min(12, Math.max(0, speed - 12) * 0.45);
    if (Math.abs(this.cam.fov - fov) > 0.05) {
      this.cam.fov += (fov - this.cam.fov) * Math.min(1, dt * 2);
      this.cam.updateProjectionMatrix();
    }
    void Quaternion; void Matrix4;
  }
}
