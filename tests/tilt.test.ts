import { describe, expect, it } from 'vitest';
import { steerFromRoll, tiltFromGravity, wrap180 } from '../src/input/tilt';

// Build an "up" gravity vector (device frame) for a hold described by how far the
// top is raised from flat (pitch) and how far the device is rotated about its
// screen normal / tilted sideways (roll, + = right side down).
function up(pitchDeg: number, rollDeg: number): [number, number, number] {
  const p = (pitchDeg * Math.PI) / 180, r = (rollDeg * Math.PI) / 180;
  // start flat: up = +z; raise top by p (rotate about device x), then tilt right side down by r
  const y = Math.sin(p), z = Math.cos(p);
  return [-Math.sin(r), y * Math.cos(r), z * Math.cos(r)].map((v) => v * 9.81) as [number, number, number];
}

describe('tilt from gravity', () => {
  it('measures left/right tilt correctly for a flat, tray-style hold', () => {
    const [x, y, z] = up(10, 12);
    expect(tiltFromGravity(x, y, z, 0).roll).toBeCloseTo(12, 0);
  });

  it('measures steering-wheel rotation for an upright hold (where Euler gamma breaks down)', () => {
    for (const r of [-20, -5, 5, 20]) {
      const [x, y, z] = up(88, r);
      expect(tiltFromGravity(x, y, z, 0).roll).toBeCloseTo(r, 0);
    }
  });

  it('pitch rises as the top of the device comes toward the player', () => {
    const a = up(40, 0), b = up(60, 0);
    expect(tiltFromGravity(...b, 0).pitch).toBeGreaterThan(tiltFromGravity(...a, 0).pitch + 15);
  });

  it('roll and pitch are independent', () => {
    const a = tiltFromGravity(...up(45, 0), 0), b = tiltFromGravity(...up(65, 0), 0);
    expect(Math.abs(a.roll - b.roll)).toBeLessThan(0.5);
  });

  it('uses the screen frame captured at launch: a landscape hold steers on the landscape axis', () => {
    // Device turned 90 deg counter-clockwise (landscape), held at 45 deg, right side (of the landscape screen) dipped 10 deg.
    // In landscape, the screen's right edge is the device's bottom edge (-y).
    const p = (45 * Math.PI) / 180, r = (10 * Math.PI) / 180;
    // screen-frame up vector, then map back to device frame: screen x = -device y, screen y = device x
    const sx = -Math.sin(r), sy = Math.sin(p) * Math.cos(r), sz = Math.cos(p) * Math.cos(r);
    const gx = sy, gy = -sx;
    expect(tiltFromGravity(gx * 9.81, gy * 9.81, sz * 9.81, 90).roll).toBeCloseTo(10, 0);
  });
});

describe('steering curve', () => {
  it('has a small dead zone and reaches full lock at maxTilt / sensitivity', () => {
    expect(steerFromRoll(0.8, 1, 16, 1.3)).toBe(0);
    expect(steerFromRoll(16 / 1.3, 1, 16, 1.3)).toBeCloseTo(1, 5);
    expect(steerFromRoll(-30, 1, 16, 1.3)).toBe(-1);
  });
  it('is responsive near centre: 3 degrees already gives noticeable steering', () => {
    expect(steerFromRoll(3, 1, 16, 1.3)).toBeGreaterThan(0.18);
  });
  it('wraps angle differences', () => {
    expect(wrap180(350 - 10)).toBe(-20);
  });
});
