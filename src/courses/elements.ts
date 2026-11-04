import type { BranchSpec, Segment } from '../track/track';

/**
 * Course element library: coaster and track elements expressed as turtle
 * segments. Each world's course is composed from these, following its course
 * style (docs/WORLD_MATH.md, "Course styles").
 *
 * Conventions: yaw + = left, bank + = tilt toward left, pitch - = downhill.
 * Every helper returns to bank 0 unless stated, so they can be chained.
 */
type Fx = Segment['fx'];
type Seg = Segment;

/** A straight run. */
export const run = (len: number, pitch: number, extra: Partial<Seg> = {}): Seg[] => [{ len, pitch, ...extra }];

/** A drop that eases back to a gentle slope. */
export const drop = (len: number, pitch: number, after = -4, extra: Partial<Seg> = {}): Seg[] => [
  { len, pitch, ...extra }, { len: Math.max(20, len * 0.4), pitch: after },
];

/** Camelback / airtime hill: climb then fall away. A short crest throws the ball (ejector); a long crest floats it. */
export const camel = (len: number, rise: number, fall: number, fx: Fx = { pulse: 1 }): Seg[] => [
  { len: len * 0.45, pitch: rise, fx }, { len: len * 0.55, pitch: fall },
];

/** A train of bunny hops (rhythm and haptics showcase). */
export const hops = (n: number, len: number, amp: number, base = -6): Seg[] => {
  const out: Seg[] = [];
  for (let i = 0; i < n; i++) out.push({ len: len / 2, pitch: base + amp, fx: { pulse: 1 } }, { len: len / 2, pitch: base - amp });
  out.push({ len: 16, pitch: base });
  return out;
};

/** A banked turn (yaw degrees; + = left), returning to bank 0. */
export const turn = (len: number, yaw: number, bank: number, pitch: number, extra: Partial<Seg> = {}): Seg[] => [
  { len, yaw, bank: Math.sign(yaw) * Math.abs(bank), pitch, ...extra }, { len: 24, bank: 0, pitch },
];

/** An outward-banked turn: the bank tilts AWAY from the turn (the ball is flung toward the lip). */
export const outerbank = (len: number, yaw: number, bank: number, pitch: number): Seg[] => [
  { len, yaw, bank: -Math.sign(yaw) * Math.abs(bank), pitch, fx: { twist: -Math.sign(yaw) } }, { len: 24, bank: 0, pitch },
];

/** Helix: turns x 360 degrees at constant bank and slope. */
export const helix = (turns: number, radius: number, bank: number, pitch: number, dir = 1, extra: Partial<Seg> = {}): Seg[] => [
  { len: 2 * Math.PI * radius * turns, yaw: 360 * turns * dir, bank: bank * dir, pitch, fx: { twist: 1.5 * dir, flow: -1 }, ...extra },
  { len: 30, bank: 0, pitch },
];

/** Wild-mouse hairpin: a tight 180 with little bank (the ball rides the outer wall). */
export const hairpin = (dir: number, len = 52, bank = 14, pitch = -6, extra: Partial<Seg> = {}): Seg[] => [
  { len, yaw: 180 * dir, bank: bank * dir, pitch, fx: { twist: 2 * dir }, ...extra }, { len: 12, bank: 0, pitch },
];

/** Bobsleigh "labyrinth": fast alternating S-curves. */
export const labyrinth = (n: number, amp: number, len: number, bank: number, pitch: number, startDir = 1): Seg[] => {
  const out: Seg[] = [];
  let d = startDir;
  // turns of +amp, -2amp, +2amp, ..., ending with an amp turn back to the original heading
  for (let i = 0; i < n; i++) { out.push({ len, yaw: amp * d * (i === 0 || i === n - 1 ? 1 : 2), bank: bank * d, pitch, fx: { twist: d } }); d = -d; }
  out.push({ len: 20, bank: 0, pitch });
  return out;
};

/** Bobsleigh "Kreisel": a near-circle at very high bank (the ball rides almost horizontal on the wall). */
export const kreisel = (deg: number, len: number, bank: number, pitch: number, dir = 1): Seg[] => [
  { len: 30, bank: bank * dir * 0.5, pitch },
  { len, yaw: deg * dir, bank: bank * dir, pitch, fx: { twist: 2 * dir, flow: -1.5 } },
  { len: 36, bank: 0, pitch },
];

/** A vertical loop (lateral shift so it clears itself). Needs speed: preceded by a drop in the courses. */
export const loop = (len: number, shift: number, extra: Partial<Seg> = {}): Seg[] => [
  { len: 18, pitch: -2 }, { len, loop: true, shift, pitch: -2, fx: { pulse: 0.8, twist: 1 }, ...extra }, { len: 22, pitch: -5 },
];

/** A cascade of loops, each a fraction of the last (shrinking loops need less speed at the top). */
export const cascade = (first: number, ratio: number, count: number, startShift = 13): Seg[] => {
  const out: Seg[] = [];
  let len = first, sh = startShift;
  for (let i = 0; i < count; i++) {
    out.push({ len: 14, pitch: -3 }, { len, loop: true, shift: sh, pitch: -3, fx: { pulse: 1, twist: sh > 0 ? 1 : -1 } });
    len = Math.max(34, len * ratio); sh = -sh;
  }
  out.push({ len: 24, pitch: -6 });
  return out;
};

/** A 360 roll around the path (heartline roll). In a tube it's a weightless float; in the open it needs the magnet. */
export const roll = (len: number, pitch: number, turns = 1, extra: Partial<Seg> = {}): Seg[] => [
  { len, pitch, roll: turns, fx: { twist: 2.5 }, ...extra },
];

/** A corkscrew: a loop stretched along the path with a sideways shift. */
export const corkscrew = (len: number, shift: number, yaw = 20, extra: Partial<Seg> = {}): Seg[] => [
  { len, loop: true, yaw, shift, pitch: -6, fx: { twist: -2, pulse: 0.6 }, ...extra }, { len: 30, pitch: -7 },
];

/** A Koch-curve run: the L-system F -> F+F--F+F at `level`, turns of +60/-120/+60, total length `len`. */
export const koch = (level: number, len: number, pitch: number, turnLen = 14): Seg[] => {
  let prog = 'F';
  for (let i = 0; i < level; i++) prog = prog.replace(/F/g, 'F+F--F+F');
  const nF = (prog.match(/F/g) ?? []).length;
  const fLen = Math.max(8, len / nF);
  const out: Seg[] = [];
  let pending = 0;
  const flush = () => { if (pending) { out.push({ len: turnLen, yaw: pending, bank: Math.sign(pending) * 30, pitch, fx: { twist: Math.sign(pending) * 2 } }); pending = 0; } };
  for (const ch of prog) {
    if (ch === 'F') { flush(); out.push({ len: fLen, bank: 0, pitch }); }
    else pending += ch === '+' ? 60 : -60;
  }
  flush();
  return out;
};

/** A jump: kicker, gap, landing (receiving gutter slightly lower). */
export const jump = (speedish: number, gapLen: number, kickPitch = 9, extra: Partial<Seg> = {}): Seg[] => [
  { len: 22, pitch: -10 }, { len: 14 + speedish * 0.1, pitch: kickPitch, label: extra.label, fx: { flow: -1 } },
  { len: gapLen, pitch: -10, gap: true }, { len: 32, pitch: -9, fx: { flow: -1 } },
];

/**
 * A side route for a split: S-curve out, a middle run, S-curve back. It's
 * symmetric, so it returns to the main line's heading and offset. It must
 * start on a straight stretch of the main course with constant slope; the
 * engine snaps the end and works out the junctions.
 */
export const sideArm = (dir: number, yaw: number, legLen: number, midLen: number, pitch: number, mid: Seg[] = [], extra: Partial<Seg> = {}): Seg[] => [
  { len: legLen, yaw: yaw * dir, pitch, ...extra }, { len: legLen, yaw: -yaw * dir, pitch, ...extra },
  ...(mid.length ? mid : [{ len: midLen, pitch, ...extra }]),
  { len: legLen, yaw: -yaw * dir, pitch, ...extra }, { len: legLen, yaw: yaw * dir, pitch, ...extra },
];

/** Branch spec helper for a side arm leaving at `at` (a main-course straight). */
export const branch = (id: string, name: string, at: string, segments: Seg[], s = 2): BranchSpec => ({
  id, name, at, s, offset: [0, 0], junction: 'auto', rejoin: 'auto', segments, hints: [],
});

/** Length of the main-course straight a side arm needs (with margin for the merge). */
export const armSpan = (legLen: number, midLen: number) => legLen * 4 + midLen + 30;

// ---------------------------------------------------------------------------
// Second-act elements (v2): more variety per course.
// ---------------------------------------------------------------------------

/** Vortex / funnel: a helix that tightens as it falls, like water down a drain. */
export const vortex = (turns: number, r0: number, r1: number, bank: number, pitch: number, dir = 1, extra: Partial<Seg> = {}): Seg[] => {
  const out: Seg[] = [];
  const steps = Math.max(2, Math.round(turns * 4));
  for (let i = 0; i < steps; i++) {
    const r = r0 + (r1 - r0) * (i / (steps - 1));
    const t = turns / steps;
    out.push({ len: 2 * Math.PI * r * t, yaw: 360 * t * dir, bank: bank * dir * (0.8 + 0.2 * i / (steps - 1)), pitch: pitch - i * 0.6, fx: { twist: (1.5 + i * 0.3) * dir, flow: -1 - i * 0.2 }, ...extra });
  }
  out.push({ len: 30, bank: 0, pitch });
  return out;
};

/** Sweeper: a fast, lightly banked bend. The built-up outer wall carries you round at speed. */
export const sweeper = (len: number, yaw: number, pitch: number, bank = 12): Seg[] => [
  { len, yaw, bank: Math.sign(yaw) * bank, pitch, fx: { twist: Math.sign(yaw) * 0.8, flow: -0.5 } }, { len: 20, bank: 0, pitch },
];

/** Wave turn: climb steeply into a high-banked turn, stall, and fall out of it. */
export const wave = (dir: number, len = 80, bank = 70): Seg[] => [
  { len: len * 0.5, yaw: 45 * dir, bank: bank * dir, pitch: 10, fx: { twist: dir, pulse: 0.8 } },
  { len: len * 0.5, yaw: 45 * dir, bank: bank * dir, pitch: -24, fx: { flow: -1.5 } },
  { len: 26, bank: 0, pitch: -6 },
];

/** Pretzel: two linked helices turning opposite ways. */
export const pretzel = (radius: number, bank: number, pitch: number, extra: Partial<Seg> = {}): Seg[] => [
  { len: 2 * Math.PI * radius * 0.75, yaw: 270, bank, pitch, fx: { twist: 1.5, flow: -1 }, ...extra },
  { len: 28, bank: 0, pitch, ...extra },
  { len: 2 * Math.PI * radius * 0.75, yaw: -270, bank: -bank, pitch, fx: { twist: -1.5, flow: -1 }, ...extra },
  { len: 30, bank: 0, pitch },
];

/** Terraces: a staircase of short steep drops and flats. */
export const terraces = (n: number, dropLen = 16, dropPitch = -28, flat = 18): Seg[] => {
  const out: Seg[] = [];
  for (let i = 0; i < n; i++) out.push({ len: dropLen, pitch: dropPitch, fx: { flow: -1 } }, { len: flat, pitch: -3, fx: { pulse: 1 } });
  return out;
};

/** A covered tunnel run with an optional curve (dark section, open floor). */
export const tunnelRun = (len: number, yaw: number, pitch: number, bank = 20): Seg[] => [
  { len: len * 0.5, yaw: yaw / 2, bank: Math.sign(yaw) * bank, pitch, tunnel: true, fx: { flow: -2 } },
  { len: len * 0.5, yaw: yaw / 2, bank: Math.sign(yaw) * bank, pitch, tunnel: true, fx: { flow: -2 } },
  { len: 20, bank: 0, pitch, tunnel: true },
];

type Ob = { at: string; s: number; x: number; ls: number; w: number; h: number; kind?: 'block' | 'barrier' | 'post' | 'gate' };
/** Obstacle fields for a labelled straight: zigzag blocks, post slalom, gate pairs. */
export const field = (at: string, pattern: 'zigzag' | 'posts' | 'gates' | 'colonnade', n: number, start = 14, gap = 22): Ob[] => {
  const out: Ob[] = [];
  for (let i = 0; i < n; i++) {
    const s = start + i * gap, side = i % 2 ? 1 : -1;
    if (pattern === 'zigzag') out.push({ at, s, x: 3.5 * side, ls: 2.1, w: 5.2, h: 1.7 });
    else if (pattern === 'posts') out.push({ at, s, x: 2.4 * side, ls: 1.3, w: 2.0, h: 2.3, kind: 'post' });
    else if (pattern === 'gates') out.push({ at, s, x: -4.2, ls: 2, w: 4.4, h: 2.0, kind: 'gate' }, { at, s, x: 4.2, ls: 2, w: 4.4, h: 2.0, kind: 'gate' });
    else out.push({ at, s, x: -4.6, ls: 1.4, w: 1.8, h: 2.6, kind: 'post' }, { at, s, x: 4.6, ls: 1.4, w: 1.8, h: 2.6, kind: 'post' });
  }
  return out;
};
