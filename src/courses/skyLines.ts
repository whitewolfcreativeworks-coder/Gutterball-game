import type { BranchSpec, Segment } from '../track/track';

/**
 * SKY LINES: alternate tubes for the riders who fly.
 *
 * Measured with the line lab, a few places on each course throw fast balls
 * off the gutter: a crest that a ripping ball simply sails over, or the
 * outside wall of a corner that it rides up and over. Instead of losing the
 * ball there, a SKY LINE waits along the flight: a wide open catch deck,
 * higher up and farther along, aimed down the line the ball is actually
 * flying. Land on it and it curls into a tube that carries you on, up
 * high, and then sweeps down and merges back into the main course as a
 * Y-junction. Slower riders never leave the gutter and pass underneath.
 *
 * Two kinds:
 *  - a CREST catcher sits above and ahead of a crest, on the flight line;
 *  - a WALL-TOP entrance sits just outside and above the outer wall of a
 *    fast corner: ride up the wall, over the lip, and you drop into it.
 *
 * The deck is placed from the measured flights (`at`, `s`, `offset` in the
 * main course's frame, plus the flight's heading and pitch). The tube's
 * shape (two sweeping arcs and the merge slope) is SOLVED numerically
 * (tools/sky-solve.test.ts) so it lands exactly back on the main course,
 * heading the same way; the solved numbers live in `fit`.
 */
export interface SkyDef {
  id: string;
  name: string;
  /** Deck start: main-course segment label, metres from it, [right, up] from the floor centre. */
  at: string;
  s: number;
  offset: [number, number];
  /** Deck heading relative to the main course here (deg, + = left), and its world pitch. */
  yawOffset: number;
  pitch: number;
  /** The catch deck: long, wide and open. */
  deckLen: number;
  /** Floor widening on the deck (wider = easier to land on). */
  widen?: number;
  /** Where it merges back into the main course, and the main course's bank there (degrees). */
  merge: { at: string; s: number };
  mergeBank?: number;
  /** Arc lengths of the two tube sweeps (m). */
  lens: [number, number];
  /** Solved: [yaw1, pitch1, yaw2, pitch2, exit pitch, merge swing] in degrees. */
  fit: [number, number, number, number, number, number] | [number, number, number, number, number, number, number, number];
  /** Tube theme for the ride (fractal motion). */
  fx?: Segment['fx'];
  /**
   * (v13) A RAMP instead of a deck: the sky line forks off the main gutter as
   * a Y (+1 = to the left, -1 = to the right) and climbs away at `pitch`, so
   * you roll into it, never fly. `offset`, `yawOffset` and `widen` are unused.
   */
  fork?: 1 | -1;
}

/** Bank that suits a sweep: lean into the turn, more for tighter ones. */
const bankFor = (yaw: number, len: number) => Math.max(-55, Math.min(55, (yaw / Math.max(20, len)) * 60 * 2.2));

export function skyBody(d: SkyDef, fit = d.fit): Segment[] {
  const [y1, p1, y2, p2, pe, ym] = fit;
  // (a fit may carry its own sweep lengths: solved along with the angles)
  const L1 = fit[6] ?? d.lens[0], L2 = fit[7] ?? d.lens[1];
  const start: Segment[] = d.fork
    ? [
      // the ramp: peel off the main gutter to one side and climb away from it
      { exact: true, len: d.deckLen * 0.5, yaw: 24 * d.fork, pitch: d.pitch, bank: 12 * d.fork, label: `${d.id}Ramp`, fx: { pulse: 0.6 } },
      { exact: true, len: d.deckLen * 0.5, yaw: -24 * d.fork, pitch: d.pitch, bank: 0, fx: { flow: -1 } },
      { exact: true, len: 30, pitch: d.pitch, tube: true, fx: { flow: -1.5 } },
    ]
    : [
      // the catch deck: wide and open, aimed down the flight line
      { exact: true, len: d.deckLen, pitch: d.pitch, widen: d.widen ?? 1.7, label: `${d.id}Deck`, fx: { pulse: 1 } },
      { exact: true, len: 30, pitch: d.pitch, tube: true, fx: { flow: -1.5 } },
    ];
  return [
    ...start,
    // the sky tube: two long sweeps, high above the course
    { exact: true, len: L1, yaw: y1, pitch: p1, bank: bankFor(y1, L1), tube: true, label: `${d.id}Tube`, fx: d.fx ?? { twist: 1.2, flow: -1 } },
    { exact: true, len: L2, yaw: y2, pitch: p2, bank: bankFor(y2, L2), tube: true, fx: { flow: -2 } },
    // and down into the main course
    { exact: true, len: 40, pitch: pe, bank: (d.mergeBank ?? 0) * 0.5, tube: true, fx: { flow: 1 } },
    // the merge: alongside the main gutter at its level, swinging in from the side (a Y-junction)
    { exact: true, len: 70, yaw: ym, pitch: pe, bank: d.mergeBank ?? 0, label: `${d.id}Merge` },
  ];
}

export function skyLine(d: SkyDef): BranchSpec {
  if (d.fork) return {
    id: d.id, name: d.name, at: d.at, s: d.s, offset: [0, 0],
    segments: skyBody(d),
    rejoin: d.merge, junction: 'auto',
  };
  return {
    id: d.id, name: d.name, at: d.at, s: d.s, offset: d.offset,
    yawOffset: d.yawOffset, startPitch: d.pitch, startBank: 0,
    segments: skyBody(d),
    rejoin: d.merge, junction: 'auto', mergeOnly: true,
  };
}

/** Every world's sky lines (each world adds `...skyLines('<id>')` to its branches). */
export const SKY: Record<string, SkyDef[]> = {
  wood: [
    // THE CAMELS: fork left before the camelbacks onto the Treetop Line, a ramp that
    // holds its height while the course drops away beneath, then a sky tube that dives
    // down and merges onto the finish straight.
    {
      id: 'skyTreetop', name: 'Treetop Line', at: 'camels', s: 0, offset: [0, 0], yawOffset: 0, pitch: -1, deckLen: 140, fork: 1,
      merge: { at: 'finish', s: 50 }, lens: [57.66, 182.25], fit: [28.53, -19.63, -24.33, 4.47, -4.76, -4.24, 57.66, 182.25],
    },
  ],
  // (Rubber's Skyhook was a deck you flew into over tower two. With the lid the ball no
  // longer sails off that crest, and an extra tube must be one you can roll into,
  // so it's parked until it gets a ramp of its own.)
};

export const skyLines = (world: string): BranchSpec[] => (SKY[world] ?? []).map(skyLine);
