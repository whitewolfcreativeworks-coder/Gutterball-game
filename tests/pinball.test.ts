import { describe, expect, it } from 'vitest';
import { PinballSim, PIN } from '../src/finale/pinballSim';

const R = 1.15;
function play(sim: PinballSim, secs: number, flip: (t: number, s: PinballSim) => [boolean, boolean]) {
  const dt = 1 / 60;
  let maxOut = 0;
  for (let t = 0; t < secs && sim.phase !== 'done'; t += dt) {
    if (sim.phase === 'plunger') sim.fire();
    const [l, r] = flip(t, sim);
    sim.step(dt, l, r);
    if (sim.phase === 'play') maxOut = Math.max(maxOut, Math.abs(sim.u) - PIN.W / 2, sim.w - PIN.L);
  }
  return maxOut;
}

describe('pinball intro', () => {
  it('the plunger shoots the ball up the lane, round the arch and onto the playfield', () => {
    const sim = new PinballSim(R);
    sim.fire();
    let out = false;
    for (let i = 0; i < 60 * 4 && !out; i++) { sim.step(1 / 60, false, false); out = !sim.inLane; }
    expect(out).toBe(true);
    expect(sim.u).toBeLessThan(PIN.laneX);
  });

  it('flippers send the ball back up the table', () => {
    const sim = new PinballSim(R);
    sim.phase = 'play'; sim.inLane = false;
    const f = sim.flippers[0];
    const tip = sim.flipperTip(f);
    sim.u = (f.pu + tip.u) / 2; sim.w = (f.pw + tip.w) / 2 + R + PIN.flipR + 0.05; sim.vu = 0; sim.vw = -3;
    for (let i = 0; i < 30; i++) sim.step(1 / 240, true, false);
    expect(sim.vw).toBeGreaterThan(10);
  });

  it('the ball always stays on the table, and every intro reaches the cave (the beam helps)', () => {
    for (let seed = 0; seed < 12; seed++) {
      const sim = new PinballSim(R);
      // a clumsy player: random flipping
      let st = seed * 7919;
      const rnd = () => ((st = (st * 1103515245 + 12345) % 2147483648) / 2147483648);
      const maxOut = play(sim, 90, () => [rnd() < 0.3, rnd() < 0.3]);
      expect(maxOut).toBeLessThan(0.01);
      expect(sim.phase).toBe('done');
    }
  });

  it('pop bumpers kick the ball away', () => {
    const sim = new PinballSim(R);
    sim.phase = 'play'; sim.inLane = false;
    const b = sim.bumpers[0];
    sim.u = b.u; sim.w = b.w + PIN.bumperR + R + 1; sim.vu = 0; sim.vw = -8;
    for (let i = 0; i < 60; i++) sim.step(1 / 240, false, false);
    expect(sim.bumperHits).toBeGreaterThan(0);
    expect(sim.vw).toBeGreaterThan(5);
  });
});
