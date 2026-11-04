import type { SensoryEvent, SensoryState } from '../core/events';
import type { MaterialProfile } from '../physics/materials';

/**
 * Physics-to-haptics mapping with capability-aware drivers.
 *
 * Tiers (from the brief):
 *   advanced — fine-grained patterns (native Core Haptics / Android
 *              VibrationEffect via a future native wrapper; see docs)
 *   basic    — short pulses: the Web Vibration API (Android Chrome & co.)
 *   none     — no actuator (most iPads, desktop, iOS Safari without a tick
 *              driver): gameplay is identical, nothing errors.
 *
 * A comfort governor caps duty cycle and prioritises events so vibration is
 * never continuous or overwhelming.
 */
export type HapticTier = 'advanced' | 'basic' | 'tick' | 'none';

export interface HapticDriver {
  tier: HapticTier;
  /** Pulse for `ms` at 0..1 intensity (drivers without amplitude approximate it via duration). */
  pulse(ms: number, intensity: number): void;
}

class VibrationDriver implements HapticDriver {
  tier: HapticTier = 'basic';
  pulse(ms: number, intensity: number) {
    // No amplitude control: scale duration with intensity
    const d = Math.max(4, Math.round(ms * (0.4 + 0.6 * intensity)));
    // Browsers only allow vibration after the user has interacted with the page
    const ua = (navigator as any).userActivation;
    if (ua && !ua.hasBeenActive) return;
    try { navigator.vibrate(d); } catch { /* ignore */ }
  }
}

/**
 * iOS 18+ Safari exposes a native "switch" checkbox control that produces a
 * system haptic tick when toggled. Toggling it programmatically is an
 * undocumented behaviour; we use it opportunistically for strong transients
 * only, and it must never be relied on. Unverified on real hardware in this
 * build — see docs/STATUS.md.
 */
class IOSSwitchTickDriver implements HapticDriver {
  tier: HapticTier = 'tick';
  private label: HTMLLabelElement;
  private last = 0;
  constructor() {
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.setAttribute('switch', '');
    input.id = 'gb-haptic-switch';
    input.style.cssText = 'position:fixed;left:-100px;top:-100px;opacity:0;pointer-events:none;';
    this.label = document.createElement('label');
    this.label.htmlFor = input.id;
    this.label.style.cssText = 'position:fixed;left:-100px;top:-100px;opacity:0;pointer-events:none;';
    document.body.append(input, this.label);
  }
  pulse(_ms: number, intensity: number) {
    const now = performance.now();
    if (intensity < 0.35 || now - this.last < 70) return;
    this.last = now;
    this.label.click();
  }
}

class NullDriver implements HapticDriver { tier: HapticTier = 'none'; pulse() { /* no actuator */ } }

export function detectHaptics(): HapticDriver {
  // A native wrapper (Capacitor) can inject an advanced driver here.
  const injected = (window as any).__GUTTERBALL_NATIVE_HAPTICS__ as HapticDriver | undefined;
  if (injected) return injected;
  if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') return new VibrationDriver();
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isPad = /iPad/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (isIOS && !isPad) return new IOSSwitchTickDriver();
  return new NullDriver();
}

export class HapticEngine {
  enabled = true;
  intensity = 1;
  driver: HapticDriver;
  private mat?: MaterialProfile;
  private budget = 1;       // comfort governor: fraction of time allowed to vibrate
  private rollTimer = 0;
  private lastPulseAt = 0;
  private busyUntil = 0;

  constructor(driver?: HapticDriver) { this.driver = driver ?? detectHaptics(); }

  configure(mat: MaterialProfile) { this.mat = mat; }

  get tier() { return this.enabled ? this.driver.tier : 'none'; }

  private fire(ms: number, intensity: number, priority: number) {
    if (!this.enabled || this.driver.tier === 'none') return;
    const now = performance.now();
    // Respect actuator: don't overlap pulses unless higher priority
    if (now < this.busyUntil && priority < 2) return;
    // Duty-cycle governor (max ~25% over a rolling window)
    const cost = ms / 1000;
    if (this.budget < cost && priority < 3) return;
    this.budget -= cost;
    this.busyUntil = now + ms + 12;
    this.lastPulseAt = now;
    this.driver.pulse(ms, Math.min(1, intensity * this.intensity));
  }

  update(st: SensoryState, events: SensoryEvent[], dt: number) {
    this.budget = Math.min(0.3, this.budget + dt * 0.25);
    if (!this.mat) return;
    const h = this.mat.haptic;
    // Discrete physical events (highest priority)
    for (const e of events) {
      switch (e.type) {
        case 'COLLISION_IMPACT':
          if (e.intensity > 0.08) this.fire(12 + 30 * e.intensity * h.impactScale, e.intensity, 3);
          break;
        case 'AIRBORNE_END':
          if (e.intensity > 0.1) this.fire(10 + 24 * e.intensity * h.impactScale, e.intensity, 3);
          break;
        case 'MAGNETIC_CAPTURE': this.fire(40, 1, 3); break;
        case 'TURBO_ARMED': this.fire(20, 0.7, 2); break;
        case 'TURBO_START': this.fire(70, 1, 3); break;
        case 'MAGNET_ENGAGED': this.fire(22, 0.8, 2); break;
        case 'JUMP': this.fire(10, 0.5, 2); break;
        case 'PUSH': this.fire(12 + 10 * e.intensity, 0.6, 2); break;
        case 'DOUBLE_JUMP': this.fire(16, 0.7, 2); break;
        case 'SURFACE_SEAM_CROSSING':
          if (h.seamPulse > 0 && e.intensity > 0.15) this.fire(h.seamPulse, e.intensity, 1);
          break;
        case 'WATER_ENTRY': this.fire(30, 0.6, 2); break;
      }
    }
    // Continuous rolling texture -> sparse micro-pulses (never continuous buzz)
    if (st.contact && h.rollTexture > 0.05 && st.speed > 3) {
      const roughness = h.rollTexture * Math.min(1, st.speed / 25) * Math.min(1.5, Math.sqrt(Math.max(0, st.normalAccel) / 9.81));
      const slide = st.rollingState === 'rolling' ? 1 : 1.4;
      this.rollTimer -= dt * roughness * slide * 9;
      if (this.rollTimer <= 0) {
        this.rollTimer = 0.6 + Math.random() * 0.8;
        this.fire(5 + 4 * roughness, roughness, 0);
      }
    }
    // Warp rumble: at tube speeds the whole device trembles (gently, rate-limited)
    if (st.inTunnel && st.speed > 42) {
      if (performance.now() - this.lastPulseAt > 180 - Math.min(80, (st.speed - 42) * 3)) this.fire(6, Math.min(0.7, (st.speed - 42) / 40), 0);
    }
    // Magnet hum: light periodic texture
    if (st.magnetActive && st.magnetForce > 0.3) {
      if (performance.now() - this.lastPulseAt > 110) this.fire(8, Math.min(1, st.magnetForce * 0.9), 0);
    }
  }

  test() { this.fire(40, 1, 3); }
}
