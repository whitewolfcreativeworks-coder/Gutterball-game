import type { BallInput } from '../physics/ball';
import { steerFromRoll, tiltFromGravity, wrap180 } from './tilt';

/**
 * Input: device tilt (steer / jump / magnet) + swipe up/down (launch and
 * propulsion). Keyboard exists only for desktop development. There are no
 * on-screen or touch steering controls: Gutterball is a tilt game.
 *
 * Tilt is measured relative to a calibrated neutral pose, captured at launch
 * and on demand, so players can hold the phone however they like.
 *
 *   roll  (left/right)   -> steer
 *   pitch back (top of phone toward you, a quick flick)  -> jump
 *   pitch forward (top away from you, held)               -> magnet
 *   swipe up / down       -> propulsion level up / down (first swipe up launches)
 *
 * Jump requires a *flick* (fast change past a threshold) so ordinary slow
 * re-gripping doesn't trigger it; magnet uses a threshold with hysteresis.
 */
export type InputMode = 'tilt' | 'keyboard';

export interface InputSettings {
  sensitivity: number;   // 0.5..3 (higher = less tilt for full steering)
  deadzone: number;      // degrees
  maxTilt: number;       // degrees for full steer at sensitivity 1
  jumpThreshold: number; // degrees past neutral (backward)
  magnetThreshold: number; // degrees past neutral (forward)
  invertSteer: boolean;
  keepView: boolean;     // keep the game view fixed if the OS rotates the screen mid-run
}

export const DEFAULT_INPUT_SETTINGS: InputSettings = {
  sensitivity: 1.3, deadzone: 1, maxTilt: 16, jumpThreshold: 16, magnetThreshold: 13, invertSteer: false, keepView: true,
};

/** Current screen rotation in window.orientation semantics (90 = device turned counter-clockwise). */
export function screenAngle(): number {
  const wo = (window as any).orientation;
  if (typeof wo === 'number') return wo;
  const so: any = (screen as any).orientation;
  if (so && typeof so.angle === 'number') return so.angle > 180 ? so.angle - 360 : so.angle;
  return 0;
}

export class InputManager {
  mode: InputMode = 'keyboard';
  settings: InputSettings = { ...DEFAULT_INPUT_SETTINGS };
  sensorAvailable = false;
  sensorPermission: 'unknown' | 'granted' | 'denied' = 'unknown';
  driveLevel = 1;
  /** Degrees the display is being counter-rotated (touch gestures are rotated to match). */
  displayRotation = 0;
  onLaunch?: () => void;
  onDriveChange?: (lvl: number) => void;
  onRestart?: () => void;
  onPause?: () => void;

  private keys = new Set<string>();
  private steerSmooth = 0;
  private jumpQueued = false;
  // tilt
  private hasMotion = false;      // accelerometer gravity available
  private hasOrientation = false; // orientation (Euler) events available
  private g = [0, 0, 0];          // low-passed gravity, "up" convention
  private motionSign = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) ? -1 : 1;
  private signVotes = 0;
  private signLocked = false;
  private lockAngle = 0;          // screen rotation captured at calibration
  private roll = 0; private pitch = 0;
  private roll0 = 0; private pitch0 = 60;
  private beta = 0; private gamma = 0;
  private pitchHistory: Array<[number, number]> = [];
  private jumpArmed = true;
  private magnetTilt = false;
  // touch
  private touchStart: { x: number; y: number; t: number; id: number } | null = null;
  enabled = true;

  constructor(private el: HTMLElement) {
    window.addEventListener('keydown', (e) => this.onKey(e, true));
    window.addEventListener('keyup', (e) => this.onKey(e, false));
    el.addEventListener('touchstart', (e) => this.onTouchStart(e), { passive: false });
    el.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: false });
    el.addEventListener('touchend', (e) => this.onTouchEnd(e), { passive: false });
    el.addEventListener('touchcancel', (e) => this.onTouchEnd(e), { passive: false });
    el.addEventListener('pointerdown', (e) => { if (e.pointerType === 'mouse') this.onMouseDown(e); });
    window.addEventListener('pointerup', (e) => { if (e.pointerType === 'mouse') this.onMouseUp(e); });
    window.addEventListener('deviceorientation', (e) => this.onOrientation(e));
    window.addEventListener('devicemotion', (e) => this.onMotion(e));
    if (matchMedia('(pointer: coarse)').matches) this.mode = 'tilt';
  }

  /** Must be called from a user gesture on iOS. */
  async requestSensors(): Promise<boolean> {
    const DOE: any = (window as any).DeviceOrientationEvent;
    const DME: any = (window as any).DeviceMotionEvent;
    if (!DOE && !DME) { this.sensorPermission = 'denied'; return false; }
    try {
      // Both requests must start inside the same user gesture
      const reqs: Promise<string>[] = [];
      if (DME && typeof DME.requestPermission === 'function') reqs.push(DME.requestPermission());
      if (DOE && typeof DOE.requestPermission === 'function') reqs.push(DOE.requestPermission());
      const res = await Promise.all(reqs.map((p) => p.catch(() => 'denied')));
      this.sensorPermission = res.length === 0 || res.some((r) => r === 'granted') ? 'granted' : 'denied';
    } catch {
      this.sensorPermission = 'denied';
    }
    if (this.sensorPermission === 'granted') {
      // wait briefly for a reading to confirm real hardware
      await new Promise((r) => setTimeout(r, 300));
      if (this.hasMotion || this.hasOrientation) { this.mode = 'tilt'; this.calibrate(); return true; }
    }
    return false;
  }

  /** Neutral = how the player is holding the device right now (also fixes the steering axis). */
  calibrate() {
    this.lockAngle = screenAngle();
    this.updateTilt();
    this.roll0 = this.roll;
    this.pitch0 = this.pitch;
    this.pitchHistory.length = 0;
    this.jumpArmed = true;
    this.magnetTilt = false;
  }

  private onMotion(e: DeviceMotionEvent) {
    const a = e.accelerationIncludingGravity;
    if (!a || a.x == null || a.y == null || a.z == null) return;
    const sgn = this.motionSign;
    const x = a.x * sgn, y = a.y * sgn, z = a.z * sgn;
    if (!this.hasMotion) { this.g = [x, y, z]; this.hasMotion = true; this.sensorAvailable = true; }
    // Low-pass to remove hand jitter while staying responsive (~60 Hz events)
    const k = 0.35;
    this.g[0] += (x - this.g[0]) * k; this.g[1] += (y - this.g[1]) * k; this.g[2] += (z - this.g[2]) * k;
    this.updateTilt();
    this.afterTilt();
  }

  private onOrientation(e: DeviceOrientationEvent) {
    if (e.beta == null || e.gamma == null) return;
    this.beta = e.beta; this.gamma = e.gamma;
    if (!this.hasOrientation) { this.hasOrientation = true; this.sensorAvailable = true; }
    // Confirm the accelerometer sign convention using gamma where gamma is reliable
    if (this.hasMotion && !this.signLocked && this.lockAngle === 0 && Math.abs(e.gamma) > 8 && Math.abs(e.gamma) < 50 && Math.abs(e.beta) < 60) {
      const r = tiltFromGravity(this.g[0], this.g[1], this.g[2], 0).roll;
      if (Math.abs(r) > 5) {
        this.signVotes += Math.sign(r) === Math.sign(e.gamma) ? 1 : -1;
        if (this.signVotes <= -12) { this.motionSign *= -1; this.g = this.g.map((v) => -v); this.signVotes = 0; this.signLocked = true; this.calibrate(); }
        if (this.signVotes >= 12) this.signLocked = true;
      }
    }
    if (!this.hasMotion) { this.updateTilt(); this.afterTilt(); }
  }

  private updateTilt() {
    if (this.hasMotion) {
      const t = tiltFromGravity(this.g[0], this.g[1], this.g[2], this.lockAngle);
      this.roll = t.roll; this.pitch = t.pitch;
    } else if (this.hasOrientation) {
      this.roll = this.gamma; this.pitch = this.beta;
    }
  }

  private afterTilt() {
    const now = performance.now();
    const dp = wrap180(this.pitch - this.pitch0);
    this.pitchHistory.push([now, dp]);
    while (this.pitchHistory.length && now - this.pitchHistory[0][0] > 300) this.pitchHistory.shift();
    if (this.mode !== 'tilt') return;
    // Jump: backward flick (top toward player => pitch increases)
    const oldest = this.pitchHistory[0]?.[1] ?? dp;
    if (this.jumpArmed && dp > this.settings.jumpThreshold && dp - oldest > this.settings.jumpThreshold * 0.6) {
      this.jumpQueued = true;
      this.jumpArmed = false;
    }
    if (!this.jumpArmed && dp < this.settings.jumpThreshold * 0.4) this.jumpArmed = true;
    // Magnet: forward tilt held (hysteresis)
    if (!this.magnetTilt && dp < -this.settings.magnetThreshold) this.magnetTilt = true;
    else if (this.magnetTilt && dp > -this.settings.magnetThreshold * 0.55) this.magnetTilt = false;
  }

  private onKey(e: KeyboardEvent, down: boolean) {
    if (!this.enabled) return;
    const k = e.key.toLowerCase();
    if (down && !this.keys.has(k)) {
      if (k === ' ' ) this.jumpQueued = true;
      if (k === 'arrowup' || k === 'w') this.swipe(1);
      if (k === 'arrowdown' || k === 's') this.swipe(-1);
      if (k === 'r') this.onRestart?.();
      if (k === 'escape' || k === 'p') this.onPause?.();
      if (k === 'enter') this.onLaunch?.();
      if (k === 'c') this.calibrate();
    }
    if (['arrowleft', 'arrowright', 'arrowup', 'arrowdown', ' '].includes(k)) e.preventDefault();
    if (down) this.keys.add(k); else this.keys.delete(k);
    if (down && this.mode !== 'tilt') this.mode = 'keyboard';
  }

  private swipe(dir: number) {
    if (dir > 0 && this.onLaunch) {
      // launch takes precedence (game decides if it's in ready state)
      const consumed = (this.onLaunch as any)() === true;
      if (consumed) return;
    }
    const lvl = Math.max(0, Math.min(2, this.driveLevel + dir));
    if (lvl !== this.driveLevel) { this.driveLevel = lvl; this.onDriveChange?.(lvl); }
  }

  // Touch is used only for swipe gestures (launch / propulsion). Taps do nothing.
  private onTouchStart(e: TouchEvent) {
    if (!this.enabled) return;
    e.preventDefault();
    const t = e.changedTouches[0];
    this.touchStart = { x: t.clientX, y: t.clientY, t: performance.now(), id: t.identifier };
  }
  private onTouchMove(e: TouchEvent) { e.preventDefault(); }
  private onTouchEnd(e: TouchEvent) {
    e.preventDefault();
    const st = this.touchStart;
    if (st) {
      const t = Array.from(e.changedTouches).find((x) => x.identifier === st.id);
      if (t) {
        const [dx, dy] = this.rot(t.clientX - st.x, t.clientY - st.y);
        const dtm = performance.now() - st.t;
        if (Math.abs(dy) > 40 && Math.abs(dy) > Math.abs(dx) * 1.2 && dtm < 600) this.swipe(dy < 0 ? 1 : -1);
      }
    }
    if (e.touches.length === 0) this.touchStart = null;
  }

  /** Screen-space delta -> game-view delta when the view is counter-rotated. */
  private rot(dx: number, dy: number): [number, number] {
    const a = (-this.displayRotation * Math.PI) / 180;
    const c = Math.cos(a), s = Math.sin(a);
    return [dx * c - dy * s, dx * s + dy * c];
  }

  private mouseStart: { x: number; y: number; t: number } | null = null;
  private onMouseDown(e: PointerEvent) { this.mouseStart = { x: e.clientX, y: e.clientY, t: performance.now() }; }
  private onMouseUp(e: PointerEvent) {
    if (!this.mouseStart) return;
    const dy = e.clientY - this.mouseStart.y, dx = e.clientX - this.mouseStart.x;
    if (Math.abs(dy) > 60 && Math.abs(dy) > Math.abs(dx)) this.swipe(dy < 0 ? 1 : -1);
    this.mouseStart = null;
  }

  sample(dt: number): BallInput {
    let steer = 0;
    let magnet = false;
    if (this.mode === 'tilt') {
      const r = wrap180(this.roll - this.roll0);
      steer = steerFromRoll(r, this.settings.deadzone, this.settings.maxTilt, this.settings.sensitivity);
      magnet = this.magnetTilt;
    }
    // keyboard always works
    const kl = this.keys.has('arrowleft') || this.keys.has('a');
    const kr = this.keys.has('arrowright') || this.keys.has('d');
    if (kl || kr) steer = (kr ? 1 : 0) - (kl ? 1 : 0);
    if (this.keys.has('shift') || this.keys.has('m') || this.keys.has('f')) magnet = true;
    if (this.settings.invertSteer) steer = -steer;
    steer = Math.max(-1, Math.min(1, steer));
    // light smoothing (sensor noise); keyboard ramps
    const k = this.mode === 'keyboard' ? 10 : 30;
    this.steerSmooth += (steer - this.steerSmooth) * Math.min(1, dt * k);
    const jump = this.jumpQueued;
    this.jumpQueued = false;
    return { steer: this.steerSmooth, magnet, jump, driveLevel: this.driveLevel };
  }

  /** Debug readout for the calibration screen. */
  tiltReadout() {
    const roll = wrap180(this.roll - this.roll0);
    return { pitch: wrap180(this.pitch - this.pitch0), roll, steer: steerFromRoll(roll, this.settings.deadzone, this.settings.maxTilt, this.settings.sensitivity), has: this.hasMotion || this.hasOrientation, source: this.hasMotion ? 'gravity' : this.hasOrientation ? 'orientation' : 'none' };
  }
}
