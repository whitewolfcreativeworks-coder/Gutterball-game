import type { BallInput } from '../physics/ball';

/**
 * Input: device tilt + swipe gestures (primary), touch-drag (alternative and
 * accessibility) and keyboard (desktop testing).
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
export type InputMode = 'tilt' | 'touch' | 'keyboard';

export interface InputSettings {
  sensitivity: number;   // 0.5..2
  deadzone: number;      // degrees
  maxTilt: number;       // degrees for full steer
  jumpThreshold: number; // degrees past neutral (backward)
  magnetThreshold: number; // degrees past neutral (forward)
  invertSteer: boolean;
}

export const DEFAULT_INPUT_SETTINGS: InputSettings = {
  sensitivity: 1, deadzone: 2.5, maxTilt: 24, jumpThreshold: 16, magnetThreshold: 13, invertSteer: false,
};

export class InputManager {
  mode: InputMode = 'keyboard';
  settings: InputSettings = { ...DEFAULT_INPUT_SETTINGS };
  sensorAvailable = false;
  sensorPermission: 'unknown' | 'granted' | 'denied' = 'unknown';
  driveLevel = 1;
  onLaunch?: () => void;
  onDriveChange?: (lvl: number) => void;
  onRestart?: () => void;
  onPause?: () => void;

  private keys = new Set<string>();
  private steerSmooth = 0;
  private jumpQueued = false;
  private magnetHeld = false;
  // tilt
  private beta = 0; private gamma = 0; private hasOrientation = false;
  private beta0 = 60; private gamma0 = 0;
  private pitchHistory: Array<[number, number]> = [];
  private jumpArmed = true;
  private magnetTilt = false;
  // touch
  private touchStart: { x: number; y: number; t: number; id: number } | null = null;
  private touchSteer = 0;
  private holdTimer: number | null = null;
  private touchMagnet = false;
  private lastTap = 0;
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
    if (matchMedia('(pointer: coarse)').matches) this.mode = 'touch';
  }

  /** Must be called from a user gesture on iOS. */
  async requestSensors(): Promise<boolean> {
    const DOE: any = (window as any).DeviceOrientationEvent;
    if (!DOE) { this.sensorPermission = 'denied'; return false; }
    try {
      if (typeof DOE.requestPermission === 'function') {
        const r = await DOE.requestPermission();
        this.sensorPermission = r === 'granted' ? 'granted' : 'denied';
      } else {
        this.sensorPermission = 'granted';
      }
    } catch {
      this.sensorPermission = 'denied';
    }
    if (this.sensorPermission === 'granted') {
      // wait briefly for a reading to confirm real hardware
      await new Promise((r) => setTimeout(r, 250));
      if (this.hasOrientation) { this.mode = 'tilt'; this.calibrate(); return true; }
    }
    return false;
  }

  calibrate() { this.beta0 = this.beta; this.gamma0 = this.gamma; this.jumpArmed = true; }

  private screenAngle() {
    const so: any = (screen as any).orientation;
    return (so && typeof so.angle === 'number' ? so.angle : (window as any).orientation) || 0;
  }

  private onOrientation(e: DeviceOrientationEvent) {
    if (e.beta == null || e.gamma == null) return;
    // Map to portrait-relative pitch/roll depending on screen rotation
    const a = this.screenAngle();
    let pitch = e.beta, roll = e.gamma;
    if (a === 90) { pitch = -e.gamma; roll = e.beta; }
    else if (a === -90 || a === 270) { pitch = e.gamma; roll = -e.beta; }
    else if (a === 180) { pitch = -e.beta; roll = -e.gamma; }
    this.beta = pitch; this.gamma = roll;
    if (!this.hasOrientation) { this.hasOrientation = true; this.sensorAvailable = true; this.beta0 = pitch; this.gamma0 = roll; }
    const now = performance.now();
    this.pitchHistory.push([now, pitch - this.beta0]);
    while (this.pitchHistory.length && now - this.pitchHistory[0][0] > 300) this.pitchHistory.shift();
    if (this.mode !== 'tilt') return;
    const dp = pitch - this.beta0;
    // Jump: backward flick (top toward player => beta increases)
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

  private onTouchStart(e: TouchEvent) {
    if (!this.enabled) return;
    e.preventDefault();
    if (e.touches.length >= 2) { this.touchMagnet = true; return; }
    const t = e.changedTouches[0];
    this.touchStart = { x: t.clientX, y: t.clientY, t: performance.now(), id: t.identifier };
    this.touchSteer = 0;
    if (this.mode === 'touch') {
      // long press = magnet (touch mode)
      this.holdTimer = window.setTimeout(() => { this.touchMagnet = true; }, 260);
    }
  }
  private onTouchMove(e: TouchEvent) {
    e.preventDefault();
    if (!this.touchStart) return;
    const t = Array.from(e.changedTouches).find((x) => x.identifier === this.touchStart!.id);
    if (!t) return;
    const dx = t.clientX - this.touchStart.x;
    const dy = t.clientY - this.touchStart.y;
    if (Math.hypot(dx, dy) > 14 && this.holdTimer) { clearTimeout(this.holdTimer); this.holdTimer = null; }
    if (this.mode === 'touch') {
      const w = Math.max(200, window.innerWidth * 0.35);
      this.touchSteer = Math.max(-1, Math.min(1, dx / w));
    }
  }
  private onTouchEnd(e: TouchEvent) {
    e.preventDefault();
    if (e.touches.length < 2 && this.touchMagnet && !this.holdTimer) { /* release below */ }
    if (this.holdTimer) { clearTimeout(this.holdTimer); this.holdTimer = null; }
    const st = this.touchStart;
    if (st) {
      const t = Array.from(e.changedTouches).find((x) => x.identifier === st.id);
      if (t) {
        const dx = t.clientX - st.x, dy = t.clientY - st.y, dtm = performance.now() - st.t;
        const vy = dy / Math.max(1, dtm);
        if (Math.abs(dy) > 50 && Math.abs(dy) > Math.abs(dx) * 1.4 && Math.abs(vy) > 0.35 && dtm < 450) {
          this.swipe(dy < 0 ? 1 : -1);
        } else if (this.mode === 'touch' && Math.hypot(dx, dy) < 12 && dtm < 220 && !this.touchMagnet) {
          // tap = jump in touch mode
          this.jumpQueued = true;
          const now = performance.now();
          this.lastTap = now;
        }
      }
    }
    if (e.touches.length === 0) { this.touchStart = null; this.touchSteer = 0; this.touchMagnet = false; }
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
      let r = this.gamma - this.gamma0;
      const dz = this.settings.deadzone;
      r = Math.abs(r) < dz ? 0 : (r - Math.sign(r) * dz);
      steer = (r / (this.settings.maxTilt - dz)) * this.settings.sensitivity;
      magnet = this.magnetTilt;
    }
    if (this.mode === 'touch') { steer = this.touchSteer * this.settings.sensitivity; magnet = this.touchMagnet; }
    // keyboard always works
    const kl = this.keys.has('arrowleft') || this.keys.has('a');
    const kr = this.keys.has('arrowright') || this.keys.has('d');
    if (kl || kr) steer = (kr ? 1 : 0) - (kl ? 1 : 0);
    if (this.keys.has('shift') || this.keys.has('m') || this.keys.has('f')) magnet = true;
    if (this.touchMagnet) magnet = true;
    if (this.settings.invertSteer) steer = -steer;
    steer = Math.max(-1, Math.min(1, steer));
    // light smoothing (sensor noise); keyboard ramps
    const k = this.mode === 'keyboard' ? 10 : 18;
    this.steerSmooth += (steer - this.steerSmooth) * Math.min(1, dt * k);
    const jump = this.jumpQueued;
    this.jumpQueued = false;
    return { steer: this.steerSmooth, magnet, jump, driveLevel: this.driveLevel };
  }

  /** Debug readout for the calibration screen. */
  tiltReadout() { return { pitch: this.beta - this.beta0, roll: this.gamma - this.gamma0, has: this.hasOrientation }; }
}
