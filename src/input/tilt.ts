/**
 * Tilt sensing from the gravity vector.
 *
 * Why not the browser's alpha/beta/gamma angles? They are Euler angles, and
 * `gamma` (left/right) becomes unstable as a tablet is raised toward
 * upright — exactly how many people hold an iPad like a steering wheel.
 * Instead we read the accelerometer's gravity vector and compute:
 *
 *   roll  = atan2(-gx, hypot(gy, gz))   left/right tilt, valid for ANY hold:
 *           flat like a tray, upright like a wheel, or anywhere between
 *   pitch = atan2(gy, gz)               how far the top is raised (0 flat .. 90 upright)
 *
 * Both are measured in the *screen frame captured at calibration* (the
 * screen rotation at launch), so if the OS later rotates the display the
 * steering axis does not change.
 *
 * Vector convention: "up" (Android/W3C accelerationIncludingGravity: lying
 * face-up reads +z). iOS Safari reports the opposite sign; we start from a
 * platform guess and confirm it against the orientation event's gamma sign.
 */
export interface TiltReading { roll: number; pitch: number; }

const DEG = 180 / Math.PI;

/** Rotate device-frame gravity into the screen frame for a screen rotation `angleDeg` (window.orientation semantics). */
export function toScreenFrame(gx: number, gy: number, angleDeg: number): [number, number] {
  const a = (angleDeg * Math.PI) / 180;
  const c = Math.cos(a), s = Math.sin(a);
  return [gx * c - gy * s, gx * s + gy * c];
}

export function tiltFromGravity(gx: number, gy: number, gz: number, angleDeg: number): TiltReading {
  const [sx, sy] = toScreenFrame(gx, gy, angleDeg);
  return { roll: Math.atan2(-sx, Math.hypot(sy, gz)) * DEG, pitch: Math.atan2(sy, gz) * DEG };
}

/** Wrap an angle difference to [-180, 180). */
export function wrap180(d: number) { return ((((d + 180) % 360) + 360) % 360) - 180; }

/**
 * Map a roll offset (degrees from neutral) to steering -1..1.
 * Small dead zone, full lock at `maxTilt` scaled by sensitivity, and a mild
 * curve that makes the first few degrees precise without feeling sluggish.
 */
export function steerFromRoll(rollDeg: number, deadzone: number, maxTilt: number, sensitivity: number, curve = 0.72) {
  const a = Math.abs(rollDeg);
  if (a <= deadzone) return 0;
  const full = Math.max(deadzone + 1, maxTilt / Math.max(0.2, sensitivity));
  const t = Math.min(1, (a - deadzone) / (full - deadzone));
  return Math.sign(rollDeg) * Math.pow(t, curve);
}
