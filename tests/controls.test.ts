import { describe, expect, it } from 'vitest';
import { Color } from 'three';
import { Track, CourseLayout } from '../src/track/track';
import { BallPhysics, BallInput } from '../src/physics/ball';
import { MATERIALS } from '../src/physics/materials';
import { heatColor } from '../src/render/ballView';

const flat = (): CourseLayout => ({ id: 't', name: 't', segments: [{ len: 20, pitch: -1 }, { len: 800, pitch: -1 }], obstacles: [], hints: [] });
const idle: BallInput = { steer: 0, magnet: false, jump: false, driveLevel: 0 };
const DT = 1 / 240;
function ballAt(speed: number) {
  const tr = new Track(flat());
  const b = new BallPhysics([tr], MATERIALS.wood);
  b.placeAt(40, speed);
  for (let i = 0; i < 60; i++) b.step(DT, idle);   // settle onto the floor
  return b;
}
const run = (b: BallPhysics, sec: number, first: BallInput) => { b.step(DT, first); for (let i = 1; i < sec / DT; i++) b.step(DT, idle); };

describe('swipe controls', () => {
  it('a swipe back brakes a slice of speed, and enough of them stop the ball', () => {
    const b = ballAt(30);
    const v0 = b.v.length();
    run(b, 0.5, { ...idle, brake: 1 });
    const v1 = b.v.length();
    expect(v1).toBeLessThan(v0 - 5);
    expect(v1).toBeGreaterThan(v0 * 0.55);
    for (let k = 0; k < 14; k++) run(b, 0.4, { ...idle, brake: 1 });
    expect(b.v.length()).toBeLessThan(1.5);
  });
  it('a sideways swipe shoves the ball across the gutter that way', () => {
    const b = ballAt(30);
    const x0 = b.proj.x;
    run(b, 0.4, { ...idle, nudge: 1 });
    expect(b.proj.x).toBeGreaterThan(x0 + 0.8);
    const b2 = ballAt(30);
    run(b2, 0.4, { ...idle, nudge: -1 });
    expect(b2.proj.x).toBeLessThan(x0 - 0.8);
  });
  it('a forward swipe still pushes', () => {
    const b = ballAt(20);
    const v0 = b.v.length();
    run(b, 0.1, { ...idle, push: 1 });
    expect(b.v.length()).toBeGreaterThan(v0 + 5);
  });
});

describe('hot ball', () => {
  it('heats from dark red through orange and yellow to white', () => {
    const c = new Color();
    heatColor(0.1, c); expect(c.r).toBeGreaterThan(c.g * 3);
    heatColor(0.6, c); expect(c.g).toBeGreaterThan(0.35); expect(c.b).toBeLessThan(0.15);
    heatColor(1, c); expect(Math.min(c.r, c.g, c.b)).toBeGreaterThan(0.85);
  });
});
