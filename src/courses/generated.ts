import type { CourseLayout, Segment, ObstacleSpec, HintSpec } from '../track/track';

/**
 * Prototype courses for the eleven purchasable worlds.
 *
 * These are procedurally assembled from a feature vocabulary weighted by
 * each world's physical identity (ice -> long sweeping drift turns, metal ->
 * loops & inversions, water -> gentle flumes, sand -> momentum management...).
 * They are playable and validated by the autopilot test, but they are
 * *prototypes*: hand-designed courses like Timberline Run are future work.
 */
interface Style {
  turns: number;      // 0..1 how often turns appear
  maxYaw: number;
  bank: number;
  drops: number;
  loops: number;      // count
  jumps: number;      // count
  tunnels: number;
  obstacles: number;  // density
  pitch: number;      // base downhill pitch
  narrow?: boolean;
}

const STYLES: Record<string, Style> = {
  concrete: { turns: 0.6, maxYaw: 90, bank: 22, drops: 0.5, loops: 0, jumps: 1, tunnels: 2, obstacles: 1.2, pitch: -7, narrow: true },
  metal:    { turns: 0.5, maxYaw: 120, bank: 40, drops: 0.6, loops: 2, jumps: 1, tunnels: 1, obstacles: 0.8, pitch: -7 },
  ice:      { turns: 0.85, maxYaw: 150, bank: 30, drops: 0.3, loops: 0, jumps: 1, tunnels: 1, obstacles: 0.4, pitch: -5 },
  water:    { turns: 0.6, maxYaw: 80, bank: 12, drops: 0.4, loops: 0, jumps: 0, tunnels: 2, obstacles: 0.3, pitch: -4 },
  glass:    { turns: 0.6, maxYaw: 110, bank: 30, drops: 0.6, loops: 1, jumps: 2, tunnels: 0, obstacles: 0.9, pitch: -7 },
  rubber:   { turns: 0.7, maxYaw: 120, bank: 35, drops: 0.6, loops: 1, jumps: 2, tunnels: 1, obstacles: 1.0, pitch: -9 },
  sand:     { turns: 0.4, maxYaw: 70, bank: 15, drops: 0.7, loops: 0, jumps: 1, tunnels: 1, obstacles: 0.6, pitch: -9 },
  mud:      { turns: 0.5, maxYaw: 70, bank: 15, drops: 0.7, loops: 0, jumps: 1, tunnels: 0, obstacles: 0.5, pitch: -10 },
  stone:    { turns: 0.7, maxYaw: 130, bank: 30, drops: 0.6, loops: 1, jumps: 1, tunnels: 3, obstacles: 1.2, pitch: -7, narrow: true },
  grating:  { turns: 0.5, maxYaw: 100, bank: 25, drops: 0.5, loops: 1, jumps: 2, tunnels: 1, obstacles: 1.0, pitch: -8 },
  snow:     { turns: 0.7, maxYaw: 120, bank: 25, drops: 0.6, loops: 0, jumps: 2, tunnels: 0, obstacles: 0.6, pitch: -8 },
};

const NAMES: Record<string, string> = {
  concrete: 'Aqueduct Brutal', metal: 'Foundry Loops', ice: 'Glacier Drift', water: 'Tropic Flume', glass: 'Canyon Glasswalk',
  rubber: 'Neon Grip', sand: 'Dune Run', mud: 'Jungle Slick', stone: 'Temple Marble', grating: 'Catwalk Chatter', snow: 'Powder Line',
};

export function generateLayout(id: string, seed = 7): CourseLayout {
  const st = STYLES[id];
  let s0 = seed * 9973 + id.length * 31;
  const rnd = () => { s0 = (s0 * 1103515245 + 12345) & 0x7fffffff; return s0 / 0x7fffffff; };
  const segs: Segment[] = [
    // every world starts inside a pipe and bursts out onto the course
    { len: 24, pitch: -3, label: 'start', tube: true, fx: { flow: -0.5 } },
    { len: 50, pitch: st.pitch - 2, tube: true, fx: { flow: -2, twist: 1 } },
    { len: 30, pitch: st.pitch, fx: { flow: 1 } },
  ];
  const obstacles: ObstacleSpec[] = [];
  const hints: HintSpec[] = [{ at: 'start', s: 0, text: 'Swipe up to launch' }];
  let loops = st.loops, jumps = st.jumps, tunnels = st.tunnels;
  let side = 1;
  let n = 0;
  const pieces = 14;
  for (let k = 0; k < pieces; k++) {
    const roll = rnd();
    const label = `p${n++}`;
    if (loops > 0 && k > 4 && roll < 0.25) {
      segs.push({ len: 60, pitch: st.pitch - 9, label: label + 'run' }, { len: 20, pitch: -2 }, { len: 78, loop: true, shift: 10.5 * side, pitch: -2, label }, { len: 30, pitch: st.pitch });
      hints.push({ at: label + 'run', s: 5, text: 'Loop ahead — hold MAGNET at the top' });
      loops--; side = -side; continue;
    }
    if (jumps > 0 && k > 2 && roll < 0.45) {
      segs.push({ len: 25, pitch: st.pitch - 3, label: label + 'pre' }, { len: 14, pitch: 7 }, { len: 8 + rnd() * 5, pitch: -8, gap: true, label }, { len: 30, pitch: st.pitch });
      hints.push({ at: label + 'pre', s: 0, text: 'Gap! Tilt back to JUMP' });
      jumps--; continue;
    }
    if (roll < st.turns) {
      const yaw = (40 + rnd() * (st.maxYaw - 40)) * side;
      const len = Math.abs(yaw) * 1.1 + 40;
      // covered sections are full tubes: roll round the walls through the turn
      const tube = tunnels > 0 && rnd() < 0.45;
      if (tube) tunnels--;
      segs.push({ len, yaw, bank: st.bank * Math.sign(yaw) * (0.7 + rnd() * 0.5), pitch: st.pitch, tube, label, fx: tube ? { twist: 1.5 * Math.sign(yaw), flow: -1 } : { flow: -0.5 } });
      segs.push({ len: 30, bank: 0, pitch: st.pitch });
      side = -side;
    } else if (roll < st.turns + st.drops * 0.4) {
      segs.push({ len: 45, pitch: st.pitch - 9, label }, { len: 30, pitch: st.pitch });
    } else {
      const tube = tunnels-- > 0;
      segs.push({ len: 60, pitch: st.pitch, tube, label, fx: tube ? { flow: -2, pulse: 0.5 } : { pulse: 0.6 } });
      const count = Math.round(st.obstacles * 2);
      for (let o = 0; o < count; o++) {
        const x = (rnd() < 0.5 ? -1 : 1) * (st.narrow ? 2.4 : 3.3);
        obstacles.push({ at: label, s: 14 + o * 24, x, ls: 2.0, w: st.narrow ? 4.0 : 5.1, h: 1.75 });
      }
    }
  }
  segs.push({ len: 50, bank: 0, pitch: -4, label: 'finish' }, { len: 60, pitch: 3, label: 'runout' });
  return { id, name: NAMES[id], segments: segs, obstacles, hints, checkpointEvery: 170 };
}
