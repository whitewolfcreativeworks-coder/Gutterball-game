import { describe, expect, it } from 'vitest';
import { Track, CourseLayout } from '../src/track/track';
import { BallPhysics, BallInput } from '../src/physics/ball';
import { MATERIALS } from '../src/physics/materials';
import { innerSignedDistance, shellSDF, DEFAULT_PROFILE, halfWidth } from '../src/track/profile';
import type { SensoryEvent } from '../src/core/events';

const straight = (pitch = -8, len = 600, extra: Partial<CourseLayout> = {}): CourseLayout => ({
  id: 't', name: 't', segments: [{ len: 20, pitch: -2 }, { len, pitch }], obstacles: [], hints: [], ...extra,
});
const idle: BallInput = { steer: 0, magnet: false, jump: false, driveLevel: 0 };
const DT = 1 / 240;
function sim(b: BallPhysics, seconds: number, input: BallInput | ((t: number) => BallInput), each?: (t: number) => void) {
  const events: SensoryEvent[] = [];
  for (let i = 0, n = Math.round(seconds / DT); i < n; i++) {
    const inp = typeof input === 'function' ? input(i * DT) : input;
    b.step(DT, inp);
    events.push(...b.events); b.events.length = 0;
    each?.(i * DT);
  }
  return events;
}

describe('gutter profile SDF', () => {
  it('is positive inside, negative in the shell, symmetric', () => {
    const p = DEFAULT_PROFILE;
    expect(innerSignedDistance(0, 1, p)).toBeCloseTo(1, 5);
    expect(innerSignedDistance(0, -0.1, p)).toBeLessThan(0);
    expect(innerSignedDistance(1.3, 2, p)).toBeCloseTo(innerSignedDistance(-1.3, 2, p), 9);
    expect(shellSDF(0, -0.1, p)).toBeLessThan(0); // inside material
    expect(shellSDF(0, 1, p)).toBeGreaterThan(0.9);
  });
  it('is continuous across floor/fillet/wall joins (no seams to snag on)', () => {
    const p = DEFAULT_PROFILE;
    let prev = innerSignedDistance(-halfWidth(p) + 0.36, p.H - 0.1, p);
    // walk the ball centre along the offset surface and check distance stays ~0.36
    for (let a = 0; a <= 1; a += 0.001) {
      const ang = Math.PI + a * Math.PI / 2;
      const x = -p.a + (p.rc - 0.36) * Math.cos(ang), y = p.rc + (p.rc - 0.36) * Math.sin(ang);
      const d = innerSignedDistance(x, y, p);
      expect(Math.abs(d - 0.36)).toBeLessThan(1e-6);
      prev = d;
    }
    void prev;
  });
});

describe('track frames', () => {
  it('stay orthonormal and untwisted through turns, banks and loops', () => {
    const tr = new Track({ id: 'f', name: 'f', obstacles: [], hints: [], segments: [
      { len: 40, pitch: -6 }, { len: 120, yaw: 150, bank: 40, pitch: -8 }, { len: 40, bank: 0 }, { len: 78, loop: true, shift: 10, pitch: -2 }, { len: 40, pitch: -6 },
    ] });
    for (let i = 0; i < tr.n; i++) {
      const k = i * 3;
      const T = [tr.T[k], tr.T[k + 1], tr.T[k + 2]], U = [tr.U[k], tr.U[k + 1], tr.U[k + 2]], R = [tr.R[k], tr.R[k + 1], tr.R[k + 2]];
      const dot = (a: number[], b: number[]) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
      expect(Math.abs(dot(T, U))).toBeLessThan(1e-9);
      expect(Math.abs(dot(T, R))).toBeLessThan(1e-9);
      expect(Math.abs(dot(T, T) - 1)).toBeLessThan(1e-9);
    }
    // the loop really inverts
    let minUy = 1;
    for (let i = 0; i < tr.n; i++) minUy = Math.min(minUy, tr.U[i * 3 + 1]);
    expect(minUy).toBeLessThan(-0.95);
    // and the end returns upright (no accumulated twist)
    expect(tr.U[(tr.n - 1) * 3 + 1]).toBeGreaterThan(0.99);
  });
});

describe('ball physics', () => {
  it('accelerates downhill like a rolling sphere: a = (5/7) g sin(theta) minus losses', () => {
    const tr = new Track({ id: 'd', name: 'd', obstacles: [], hints: [], segments: [{ len: 20, pitch: -8 }, { len: 400, pitch: -8 }] });
    const b = new BallPhysics(tr, MATERIALS.wood);
    b.placeAt(30, 1);
    sim(b, 3, idle);
    const ideal = (5 / 7) * 9.81 * Math.sin((8 * Math.PI) / 180); // 0.975 m/s^2
    const a = (b.v.length() - 1) / 3;
    expect(a).toBeLessThan(ideal);
    expect(a).toBeGreaterThan(ideal * 0.75);
  });

  it('rolls without slipping on wood: |w| r ~= |v|', () => {
    const tr = new Track(straight(-8));
    const b = new BallPhysics(tr, MATERIALS.wood);
    b.placeAt(25, 5);
    sim(b, 2, idle);
    expect(b.rollingState).toBe('rolling');
    expect(Math.abs(b.w.length() * b.tune.radius - b.v.length())).toBeLessThan(0.2);
  });

  it('slides much longer on ice than wood when launched without spin', () => {
    const slideTime = (mat: string) => {
      const tr = new Track(straight(-2));
      const b = new BallPhysics(tr, MATERIALS[mat]);
      b.placeAt(25, 15);
      b.w.set(0, 0, 0);
      let t = 0;
      for (let i = 0; i < 240 * 6; i++) { b.step(DT, idle); if (b.rollingState !== 'rolling') t += DT; }
      return t;
    };
    const wood = slideTime('wood'), ice = slideTime('ice');
    expect(wood).toBeLessThan(1.5);
    expect(ice).toBeGreaterThan(wood * 3);
  });

  it('steers by force with no position jumps', () => {
    const tr = new Track(straight(-7));
    const b = new BallPhysics(tr, MATERIALS.wood);
    b.placeAt(25, 10);
    let maxStep = 0;
    let last = b.p.clone();
    sim(b, 1.2, { ...idle, steer: 1 }, () => { maxStep = Math.max(maxStep, b.p.distanceTo(last) - b.v.length() * DT); last = b.p.clone(); });
    expect(b.proj.x).toBeGreaterThan(1);
    expect(maxStep).toBeLessThan(0.03); // only tiny contact corrections, never a jump
  });

  it('climbs the outside wall of a turn higher at higher speed (curvature + speed, no steering)', () => {
    const tr = new Track({ id: 'c', name: 'c', obstacles: [], hints: [], segments: [{ len: 30, pitch: -2 }, { len: 160, yaw: 120, pitch: -2 }, { len: 60, pitch: -2 }] });
    const climb = (speed: number) => {
      const b = new BallPhysics(tr, MATERIALS.wood);
      b.placeAt(28, speed);
      let maxY = 0, maxOut = 0;
      sim(b, 160 / speed + 1, idle, () => { if (b.proj.s < 190) { maxY = Math.max(maxY, b.proj.y); maxOut = Math.max(maxOut, b.proj.x); } });
      return { maxY, maxOut };
    };
    const slow = climb(8), fast = climb(22);
    expect(fast.maxOut).toBeGreaterThan(slow.maxOut); // left turn -> ball drifts right (outside)
    expect(fast.maxY).toBeGreaterThan(slow.maxY + 0.3);
  });

  it('jump leaves the surface and preserves forward momentum', () => {
    const tr = new Track(straight(-6));
    const b = new BallPhysics(tr, MATERIALS.wood);
    b.placeAt(25, 15);
    sim(b, 0.5, idle);
    const vf0 = b.v.dot(b.proj.T);
    const ev = sim(b, 0.02, { ...idle, jump: true });
    sim(b, 0.15, idle);
    expect(b.airborne).toBe(true);
    expect(Math.abs(b.v.dot(b.proj.T) - vf0)).toBeLessThan(1.0);
    const all = [...ev, ...sim(b, 2, idle)];
    expect(all.some((e) => e.type === 'JUMP')).toBe(true);
    expect(all.some((e) => e.type === 'AIRBORNE_END')).toBe(true);
  });

  it('jump is debounced by a cooldown', () => {
    const tr = new Track(straight(-6));
    const b = new BallPhysics(tr, MATERIALS.wood);
    b.placeAt(25, 10);
    let jumps = 0;
    for (let i = 0; i < 240; i++) { b.step(DT, { ...idle, jump: true }); jumps += b.events.filter((e) => e.type === 'JUMP').length; b.events.length = 0; }
    expect(jumps).toBeLessThanOrEqual(2);
  });

  it('magnet pulls the ball back smoothly (accelerates, never snaps)', () => {
    const tr = new Track(straight(-6));
    const b = new BallPhysics(tr, MATERIALS.wood);
    b.placeAt(40, 12);
    b.p.addScaledVector(b.proj.U, 6); // 6 m above the floor
    b.v.addScaledVector(b.proj.U, 2);  // moving away
    b.proj.project(b.p.x, b.p.y, b.p.z);
    let maxDvAir = 0, captured = false, landing = 0;
    let lastV = b.v.clone();
    const ev = sim(b, 2, { ...idle, magnet: true }, () => {
      if (!b.contact && !captured) maxDvAir = Math.max(maxDvAir, b.v.distanceTo(lastV));
      if (b.contact && !captured) { captured = true; landing = b.v.distanceTo(lastV); }
      lastV = b.v.clone();
    });
    expect(captured).toBe(true);
    expect(ev.some((e) => e.type === 'MAGNET_ENGAGED')).toBe(true);
    // a force, not a snap: per-step velocity change while flying is small (accel * dt)
    expect(maxDvAir).toBeLessThan(0.8); // stronger beam (v2), still a force over many steps, not a jump
    // the approach limiter keeps the capture impact moderate
    expect(landing).toBeLessThan(12);
  });

  it('does not tunnel through the walls at very high speed', () => {
    const tr = new Track(straight(-4));
    const b = new BallPhysics(tr, MATERIALS.metal);
    b.placeAt(30, 40);
    b.v.addScaledVector(b.proj.R, 45); // slam sideways at 45 m/s
    let maxX = 0;
    sim(b, 1.5, idle, () => { maxX = Math.max(maxX, Math.abs(b.proj.x)); });
    expect(maxX).toBeLessThan(halfWidth(tr.profile));
  });

  it('emits seam crossings on wood at the joint spacing', () => {
    const tr = new Track(straight(-3));
    const b = new BallPhysics(tr, MATERIALS.wood);
    b.placeAt(25, 12);
    const s0 = b.proj.s;
    const ev = sim(b, 2, idle);
    const n = ev.filter((e) => e.type === 'SURFACE_SEAM_CROSSING').length;
    const expected = (b.proj.s - s0) / MATERIALS.wood.seamSpacing;
    expect(Math.abs(n - expected)).toBeLessThan(2);
  });

  it('traverses a vertical loop with the magnet', () => {
    const tr = new Track({ id: 'l', name: 'l', obstacles: [], hints: [], segments: [{ len: 20, pitch: -3 }, { len: 60, pitch: -15 }, { len: 25, pitch: -2 }, { len: 78, loop: true, shift: 10.5, pitch: -2 }, { len: 60, pitch: -5 }] });
    const b = new BallPhysics(tr, MATERIALS.wood);
    b.placeAt(22, 14);
    let fell = false;
    sim(b, 12, (t) => ({ ...idle, magnet: b.proj.U.y < 0.6 || b.airborne, driveLevel: 1 }), () => { if (b.proj.y < -3 || Math.abs(b.proj.x) > 8) fell = true; });
    expect(fell).toBe(false);
    expect(b.proj.s).toBeGreaterThan(105 + 78);
  });

  it('water applies buoyancy, drag and a current', () => {
    const tr = new Track(straight(-1));
    const b = new BallPhysics(tr, MATERIALS.water);
    b.placeAt(25, 0);
    const ev = sim(b, 4, idle);
    expect(b.submersion).toBeGreaterThan(0.5);
    // the flow carries the ball even on a near-flat channel
    expect(b.v.dot(b.proj.T)).toBeGreaterThan(5);
    void ev;
  });
});

describe('double jump', () => {
  it('a second jump in the air sends the ball higher than a single jump', () => {
    const run = (double: boolean) => {
      const tr = new Track(straight(-6));
      const b = new BallPhysics(tr, MATERIALS.wood);
      b.placeAt(25, 12);
      sim(b, 0.3, idle);
      sim(b, 1 / 240, { ...idle, jump: true });
      let maxY = 0, evs: string[] = [];
      for (let i = 0; i < 240 * 2.5; i++) {
        const t = i / 240;
        b.step(DT, { ...idle, jump: double && Math.abs(t - 0.35) < 0.003 });
        evs.push(...b.events.map((e) => e.type)); b.events.length = 0;
        maxY = Math.max(maxY, b.proj.y);
      }
      return { maxY, evs };
    };
    const single = run(false), dbl = run(true);
    expect(dbl.evs).toContain('DOUBLE_JUMP');
    expect(dbl.maxY).toBeGreaterThan(single.maxY + 1.5);
  });
  it('only one extra jump per flight', () => {
    const tr = new Track(straight(-6));
    const b = new BallPhysics(tr, MATERIALS.wood);
    b.placeAt(25, 12);
    sim(b, 0.3, idle);
    const evs: string[] = [];
    for (let i = 0; i < 240 * 1.2; i++) { b.step(DT, { ...idle, jump: i % 60 === 0 }); evs.push(...b.events.map((e) => e.type)); b.events.length = 0; if (b.contact && i > 30) break; }
    expect(evs.filter((e) => e === 'DOUBLE_JUMP').length).toBeLessThanOrEqual(1);
  });
});

describe('magnet booster', () => {
  it('holding the magnet on the track accelerates the ball much faster than rolling', () => {
    const speedAfter = (magnet: boolean) => {
      const tr = new Track(straight(-3));
      const b = new BallPhysics(tr, MATERIALS.wood);
      b.placeAt(25, 10);
      sim(b, 2, { ...idle, magnet });
      return b.v.length();
    };
    const rolling = speedAfter(false), boosted = speedAfter(true);
    expect(boosted).toBeGreaterThan(rolling + 8);
  });
  it('the boost drains magnet energy', () => {
    const tr = new Track(straight(-3));
    const b = new BallPhysics(tr, MATERIALS.wood);
    b.placeAt(25, 10);
    sim(b, 3, { ...idle, magnet: true });
    expect(b.magnetEnergy).toBeLessThan(0.8);
  });
});

describe('magnet clamp', () => {
  // A full tube; put the ball on a surface point at angle (deg) around the pipe, moving slowly forward
  const tube = () => new Track({ id: 't', name: 't', segments: [{ len: 20, pitch: -3, tube: true }, { len: 300, pitch: -3, tube: true }], obstacles: [], hints: [] });
  const onSurface = (b: BallPhysics, tr: Track, deg: number, speed: number) => {
    b.placeAt(60, speed);
    const pr = b.proj, H = tr.profile.H, W = tr.profile.a + tr.profile.rc, r = b.tune.radius;
    const a = (deg - 90) * Math.PI / 180; // 90 = right wall at rim height, 180 = roof
    const x = (W - r) * Math.cos(a), y = H + (W - r) * Math.sin(a);
    b.p.copy(pr.P).addScaledVector(pr.R, x).addScaledVector(pr.U, y);
    b.n.set(0, 0, 0).addScaledVector(pr.R, -Math.cos(a)).addScaledVector(pr.U, -Math.sin(a)).normalize();
    b.w.copy(b.n).cross(b.v).multiplyScalar(1 / r);
    b.sinceContact = 0; b.contact = true; b.airborne = false;
    b.proj.project(b.p.x, b.p.y, b.p.z);
  };
  const hold = (magnet: boolean, deg: number) => {
    const tr = tube();
    const b = new BallPhysics(tr, MATERIALS.wood);
    onSurface(b, tr, deg, 6);
    let minH = 1e9, attached = 0;
    for (let i = 0; i < 240 * 1.5; i++) {
      b.step(1 / 240, { steer: 0, magnet, jump: false, driveLevel: 0 }); b.events.length = 0;
      minH = Math.min(minH, b.proj.y);
      if (b.contact) attached++;
    }
    return { minH, attachedFrac: attached / 360 };
  };
  it('holds you on the roof of a pipe at low speed (and you fall without it)', () => {
    const on = hold(true, 180), off = hold(false, 180);
    expect(on.minH).toBeGreaterThan(10);
    expect(on.attachedFrac).toBeGreaterThan(0.95);
    expect(off.minH).toBeLessThan(5);
  });
  it('holds you high on a vertical wall', () => {
    const on = hold(true, 95);
    expect(on.minH).toBeGreaterThan(5.5);
    expect(on.attachedFrac).toBeGreaterThan(0.95);
  });
  it('yanks you out of the air onto the gutter fast, and lands without bouncing', () => {
    const tr = new Track(straight(-6));
    const b = new BallPhysics(tr, MATERIALS.wood);
    b.placeAt(80, 20);
    b.p.addScaledVector(b.proj.U, 7); b.sinceContact = 1; b.contact = false; b.airborne = true;
    let t = 0, landed = -1, bounced = false;
    sim(b, 2, { steer: 0, magnet: true, jump: false, driveLevel: 0 }, (tt) => {
      t = tt;
      if (landed < 0 && b.contact) landed = tt;
      if (landed >= 0 && tt > landed + 0.05 && !b.contact) bounced = true;
    });
    void t;
    expect(landed).toBeGreaterThan(0);
    expect(landed).toBeLessThan(0.6);   // 7 m in well under a second (free fall takes ~1.2 s)
    expect(bounced).toBe(false);
  });
});

describe('turbo combo', () => {
  it('3 swipes + holding the booster arms turbo; the next flick doubles top speed', () => {
    const tr = new Track(straight(-4, 3000));
    const b = new BallPhysics(tr, MATERIALS.wood);
    b.placeAt(25, 20);
    const events: string[] = [];
    const step = (inp: Partial<BallInput>, secs: number) => {
      for (let i = 0; i < Math.round(secs * 240); i++) { b.step(1 / 240, { ...idle, ...inp }); for (const e of b.events) events.push(e.type); b.events.length = 0; inp = { ...inp, push: 0 }; }
    };
    // three swipes, a moment apart
    for (let k = 0; k < 3; k++) step({ push: 1 }, 0.4);
    expect(b.pushCombo).toBe(3);
    // hold the magnet booster on the track
    step({ magnet: true }, 1.3);
    expect(b.turboArmed).toBe(true);
    expect(events).toContain('TURBO_ARMED');
    // let it settle to normal max speed with the booster for comparison
    const before = b.v.length();
    step({ push: 1 }, 0.1);
    expect(b.turboTime).toBeGreaterThan(0);
    expect(events).toContain('TURBO_START');
    let peak = 0;
    step({ magnet: true }, 6);
    peak = b.v.length();
    expect(peak).toBeGreaterThan(Math.max(before, 62) * 1.35);   // well past the normal booster cap
    // turbo ends and you ease back down
    step({}, 6);
    expect(b.turboTime).toBe(0);
    expect(events).toContain('TURBO_END');
    expect(b.v.length()).toBeLessThan(peak * 0.8);
  });
  it('a broken combo (too slow between swipes) does not arm turbo', () => {
    const tr = new Track(straight(-4, 3000));
    const b = new BallPhysics(tr, MATERIALS.wood);
    b.placeAt(25, 20);
    for (let k = 0; k < 3; k++) { b.step(1 / 240, { ...idle, push: 1 }); for (let i = 0; i < 240 * 7; i++) b.step(1 / 240, idle); }
    expect(b.pushCombo).toBeLessThan(3);
  });
});

describe('built-up corners', () => {
  it('a fast ball rides high round an unbanked corner, past the old lip height, keeping its speed', () => {
    const tr = new Track({ id: 't', name: 't', segments: [{ len: 20, pitch: -2 }, { len: 60, pitch: -4 }, { len: 90, yaw: 120, pitch: -4 }, { len: 60, pitch: -4 }], obstacles: [], hints: [] });
    const extra = Math.max(...Array.from(tr.wallR)) - tr.profile.H;
    expect(extra).toBeGreaterThan(4);                           // outside (right) wall is built up
    expect(Math.max(...Array.from(tr.wallL))).toBeCloseTo(tr.profile.H, 3);   // inside stays normal
    const b = new BallPhysics(tr, MATERIALS.wood);
    b.placeAt(50, 42);
    let maxY = 0;
    sim(b, 3, idle, () => { maxY = Math.max(maxY, b.proj.y); });
    expect(maxY).toBeGreaterThan(tr.profile.H);                // rode above where the old lip was
    expect(b.v.length()).toBeGreaterThan(30);                  // and carried its speed through
  });
  it('tractor beam brings a very high toss home to the centre of the gutter', () => {
    const tr = new Track(straight(-4));
    const b = new BallPhysics(tr, MATERIALS.wood);
    b.placeAt(40, 30);
    b.p.addScaledVector(b.proj.U, 40).addScaledVector(b.proj.R, -3); // 40 m up, off to one side
    b.v.addScaledVector(b.proj.U, 15).addScaledVector(b.proj.R, 3);   // still climbing, drifting sideways
    b.proj.project(b.p.x, b.p.y, b.p.z);
    let landedAt = -1, x = 99, t = 0;
    sim(b, 3, { ...idle, magnet: true }, () => { t += 1 / 240; if (b.contact && landedAt < 0) { landedAt = t; x = b.proj.x; } });
    expect(landedAt).toBeGreaterThan(0);
    expect(landedAt).toBeLessThan(1.6);
    expect(Math.abs(x)).toBeLessThan(1.5);
    expect(b.v.length()).toBeGreaterThan(24); // forward momentum kept
  });
});
