import type { CourseLayout } from '../track/track';

/**
 * WORLD 1 — WOOD (free). "Timberline Run".
 *
 * Teaching order follows the brief: launch -> rolling -> steering -> wall
 * climbing -> obstacles -> jumping -> magnet -> combined -> dramatic finale.
 */
export const WOOD_COURSE: CourseLayout = {
  id: 'wood',
  name: 'Timberline Run',
  checkpointEvery: 170,
  segments: [
    { len: 24, pitch: -3, label: 'start' },
    { len: 55, pitch: -9, label: 'firstDrop' },
    { len: 30, pitch: -6 },
    { len: 110, yaw: 80, bank: 30, pitch: -7, label: 'firstTurn' },
    { len: 30, bank: 0, pitch: -6 },
    { len: 50, pitch: -6, label: 'barrier' },
    { len: 110, yaw: -105, bank: -24, pitch: -8, label: 'rightTurn' },
    { len: 30, bank: 0, pitch: -6 },
    { len: 55, pitch: -6, label: 'offset' },
    { len: 50, pitch: -5, label: 'slalom' },
    { len: 22, pitch: -7 },
    { len: 14, pitch: 7, label: 'kicker' },
    { len: 8, pitch: -6, gap: true, label: 'gap1' },
    { len: 30, pitch: -8, label: 'landing1' },
    { len: 70, yaw: 32, bank: 12, pitch: -6, tunnel: true, label: 'bridge' },
    { len: 70, yaw: -32, bank: -12, pitch: -6, tunnel: true },
    { len: 22, bank: 0, pitch: -5, tunnel: true },
    { len: 55, pitch: -17, label: 'steepDrop' },
    { len: 30, pitch: -5 },
    { len: 150, yaw: 150, bank: 52, pitch: -6, label: 'wallRide' },
    { len: 50, yaw: 8, bank: 0, pitch: -6 },
    { len: 230, yaw: -400, bank: -32, pitch: -9, label: 'spiral' },
    { len: 45, bank: 0, pitch: -12 },
    { len: 60, pitch: -15, label: 'preLoop' },
    { len: 25, pitch: -2 },
    { len: 78, loop: true, shift: 10.5, pitch: -2, label: 'loop' },
    { len: 30, pitch: -6 },
    { len: 30, pitch: -9 },
    { len: 15, pitch: 9, label: 'kicker2' },
    { len: 14, pitch: -12, gap: true, shift: 1.2, label: 'gap2' },
    { len: 35, pitch: -8, label: 'landing2' },
    { len: 120, yaw: 42, bank: 16, pitch: -6, label: 'finale' },
    { len: 90, yaw: -42, bank: -16, pitch: -6, label: 'finale2' },
    { len: 50, bank: 0, pitch: -4, label: 'finish' },
    { len: 60, pitch: 3, label: 'runout' },
  ],
  obstacles: [
    // Central barrier: climb either wall or jump it
    { at: 'barrier', s: 26, x: 0, ls: 1.2, w: 3.2, h: 1.1, kind: 'barrier' },
    // Offset blocks
    { at: 'offset', s: 12, x: -2.3, ls: 1.6, w: 3.4, h: 1.0 },
    { at: 'offset', s: 36, x: 2.3, ls: 1.6, w: 3.4, h: 1.0 },
    // Slalom posts
    { at: 'slalom', s: 8, x: -1.4, ls: 0.9, w: 1.3, h: 1.4, kind: 'post' },
    { at: 'slalom', s: 22, x: 1.4, ls: 0.9, w: 1.3, h: 1.4, kind: 'post' },
    { at: 'slalom', s: 36, x: -1.4, ls: 0.9, w: 1.3, h: 1.4, kind: 'post' },
    // Finale: gate, low centre block, offset pair
    { at: 'finale', s: 28, x: -2.6, ls: 1.4, w: 2.6, h: 1.2, kind: 'gate' },
    { at: 'finale', s: 28, x: 2.6, ls: 1.4, w: 2.6, h: 1.2, kind: 'gate' },
    { at: 'finale', s: 62, x: 0, ls: 1.2, w: 2.4, h: 0.8, kind: 'barrier' },
    { at: 'finale', s: 95, x: -2.0, ls: 1.4, w: 3.0, h: 1.0 },
    { at: 'finale2', s: 20, x: 2.0, ls: 1.4, w: 3.0, h: 1.0 },
    { at: 'finale2', s: 50, x: 0, ls: 1.2, w: 3.4, h: 1.0, kind: 'barrier' },
  ],
  hints: [
    { at: 'start', s: 0, text: 'Swipe up to launch' },
    { at: 'firstDrop', s: 25, text: 'Tilt left / right to steer' },
    { at: 'firstTurn', s: 15, text: 'Ride up the walls through the turns' },
    { at: 'barrier', s: 0, text: 'Barrier ahead — go around it, or tilt back to JUMP' },
    { at: 'slalom', s: 0, text: 'Weave between the posts' },
    { at: 'kicker', s: -14, text: 'Gap! Tilt back to JUMP' },
    { at: 'bridge', s: 5, text: 'The covered bridge — listen to it echo' },
    { at: 'wallRide', s: 0, text: 'Steep bank — tilt forward for MAGNET grip' },
    { at: 'spiral', s: 10, text: 'Spiral descent' },
    { at: 'preLoop', s: 10, text: 'Loop ahead — build speed, hold MAGNET at the top' },
    { at: 'kicker2', s: -20, text: 'Big jump: JUMP, then MAGNET to pull back in' },
    { at: 'finale', s: 0, text: 'Final run' },
    { at: 'finish', s: 15, text: 'Finish!' },
  ],
};
