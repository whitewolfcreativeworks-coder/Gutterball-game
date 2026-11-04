import type { CourseLayout } from '../track/track';

/**
 * WORLD 1 — WOOD (free). "Timberline Run".
 *
 * Built like a rollercoaster: a steep first drop, camelback airtime hills,
 * banks up to 75 degrees, a corkscrew, a spiral and a vertical loop.
 * Path choices: ride on top of the covered-bridge roof (double-jump up), or
 * take the HIGH ROAD — an elevated gutter above the launch ramp that swings
 * out on its own route and drops you back into the main gutter.
 */
export const WOOD_COURSE: CourseLayout = {
  id: 'wood',
  name: 'Timberline Run',
  checkpointEvery: 190,
  segments: [
    { len: 24, pitch: -3, label: 'start' },
    { len: 70, pitch: -26, label: 'firstDrop', fx: { flow: -1.5 } },
    { len: 35, pitch: -3 },
    { len: 30, pitch: 12, label: 'hill1', fx: { pulse: 1 } },
    { len: 26, pitch: -18 },
    { len: 25, pitch: -5 },
    { len: 125, yaw: 110, bank: 55, pitch: -9, label: 'firstTurn', fx: { twist: 1, flow: -0.5 } },
    { len: 30, bank: 0, pitch: -6 },
    { len: 55, pitch: -7, label: 'barrier', fx: { flow: 1 } },
    { len: 135, yaw: -150, bank: -62, pitch: -10, label: 'rightTurn', fx: { twist: -1.2, flow: -0.5 } },
    { len: 30, bank: 0, pitch: -7 },
    { len: 60, pitch: -8, label: 'offset', fx: { pulse: 0.7 } },
    { len: 60, pitch: -8, label: 'slalom', fx: { flow: 1, pulse: 0.4 } },
    { len: 22, pitch: -10 },
    { len: 14, pitch: 9, label: 'kicker', fx: { flow: -1 } },
    { len: 9, pitch: -8, gap: true, label: 'gap1' },
    { len: 30, pitch: -10, label: 'landing1', fx: { flow: -1 } },
    { len: 75, yaw: 45, bank: 25, pitch: -7, tunnel: true, label: 'bridge', fx: { flow: -2 } },
    { len: 75, yaw: -45, bank: -25, pitch: -7, tunnel: true },
    { len: 25, bank: 0, pitch: -6, tunnel: true },
    { len: 70, pitch: -34, label: 'steepDrop', fx: { flow: -2 } },
    { len: 32, pitch: -5 },
    { len: 160, yaw: 180, bank: 75, pitch: -8, label: 'wallRide', fx: { twist: 1.5 } },
    { len: 50, yaw: 10, bank: 0, pitch: -7 },
    { len: 95, loop: true, yaw: 25, shift: -12, pitch: -6, label: 'corkscrew', fx: { twist: -2, pulse: 0.6 } },
    { len: 40, pitch: -8 },
    { len: 230, yaw: -450, bank: -48, pitch: -11, label: 'spiral', fx: { twist: 1, flow: -1 } },
    { len: 45, bank: 0, yaw: 0, pitch: -8 },
    // HIGH ROAD fork: an open-sky launch ramp; the main gutter carries on below
    { len: 40, pitch: -6, openSky: true, label: 'forkRun', fx: { pulse: 1 } },
    { len: 18, pitch: 7, openSky: true, label: 'highKicker', fx: { pulse: 1 } },
    { len: 40, pitch: -18, openSky: true, label: 'valley', fx: { flow: -1 } },
    { len: 70, pitch: -10 },
    { len: 40, pitch: 8, label: 'hill2', fx: { pulse: 1 } },
    { len: 30, pitch: -16 },
    { len: 90, pitch: -8, label: 'rejoin', fx: { flow: 1 } },
    { len: 70, pitch: -22, label: 'preLoop', fx: { flow: -2 } },
    { len: 25, pitch: -2 },
    { len: 80, loop: true, shift: 11.5, pitch: -2, label: 'loop', fx: { pulse: 0.8, twist: 1 } },
    { len: 30, pitch: -6 },
    { len: 30, pitch: 12, label: 'hill3', fx: { pulse: 1 } },
    { len: 25, pitch: -20 },
    { len: 22, pitch: -9 },
    { len: 15, pitch: 10, label: 'kicker2', fx: { flow: -1 } },
    { len: 14, pitch: -12, gap: true, shift: 1.2, label: 'gap2' },
    { len: 35, pitch: -9, label: 'landing2' },
    { len: 125, yaw: 55, bank: 40, pitch: -8, label: 'finale', fx: { flow: -1, twist: 0.6 } },
    { len: 95, yaw: -55, bank: -40, pitch: -8, label: 'finale2', fx: { flow: -1, twist: -0.6 } },
    { len: 55, bank: 0, pitch: -4, label: 'finish', fx: { flow: 1 } },
    { len: 60, pitch: 3, label: 'runout' },
  ],
  obstacles: [
    // Central barrier: climb either wall or jump it
    { at: 'barrier', s: 28, x: 0.0, ls: 1.75, w: 5.13, h: 1.76, kind: 'barrier' },
    // Offset blocks
    { at: 'offset', s: 14, x: -3.58, ls: 2.25, w: 5.4, h: 1.62 },
    { at: 'offset', s: 40, x: 3.58, ls: 2.25, w: 5.4, h: 1.62 },
    // Slalom posts
    { at: 'slalom', s: 10, x: -2.3, ls: 1.25, w: 2.03, h: 2.29, kind: 'post' },
    { at: 'slalom', s: 27, x: 2.3, ls: 1.25, w: 2.03, h: 2.29, kind: 'post' },
    { at: 'slalom', s: 44, x: -2.3, ls: 1.25, w: 2.03, h: 2.29, kind: 'post' },
    // Finale: gate, low centre block, offset pair
    { at: 'finale', s: 30, x: -4.22, ls: 2.0, w: 4.32, h: 1.89, kind: 'gate' },
    { at: 'finale', s: 30, x: 4.22, ls: 2.0, w: 4.32, h: 1.89, kind: 'gate' },
    { at: 'finale', s: 66, x: 0.0, ls: 1.75, w: 4.05, h: 1.35, kind: 'barrier' },
    { at: 'finale', s: 100, x: -3.2, ls: 2.0, w: 4.86, h: 1.62 },
    { at: 'finale2', s: 22, x: 3.2, ls: 2.0, w: 4.86, h: 1.62 },
    { at: 'finale2', s: 55, x: 0.0, ls: 1.75, w: 5.4, h: 1.62, kind: 'barrier' },
  ],
  hints: [
    { at: 'start', s: 0, text: 'Swipe up to launch — swipe again to push' },
    { at: 'firstDrop', s: 4, text: 'Hold on!' },
    { at: 'hill1', s: 20, text: 'Airtime!' },
    { at: 'firstTurn', s: 10, text: 'Tilt to steer through the bank' },
    { at: 'barrier', s: 0, text: 'Barrier — go around, or tilt the top toward you to JUMP' },
    { at: 'slalom', s: 0, text: 'Weave between the posts' },
    { at: 'kicker', s: -14, text: 'Gap! JUMP' },
    { at: 'bridge', s: 5, text: 'Double-jump up and ride the roof!' },
    { at: 'steepDrop', s: 2, text: 'Big drop — hold the MAGNET to boost' },
    { at: 'wallRide', s: 0, text: 'Near-vertical bank — MAGNET grip' },
    { at: 'corkscrew', s: 0, text: 'Corkscrew!' },
    { at: 'forkRun', s: 0, text: 'HIGH ROAD ahead: jump off the ramp, then flick again (double jump) to reach it' },
    { at: 'preLoop', s: 10, text: 'Loop — hold MAGNET at the top' },
    { at: 'kicker2', s: -20, text: 'Big jump: JUMP, then MAGNET to pull back in' },
    { at: 'finale', s: 0, text: 'Final run' },
    { at: 'finish', s: 15, text: 'Finish!' },
  ],
  branches: [
    {
      id: 'highroad',
      name: 'High Road',
      at: 'highKicker',
      s: 40,                     // where a jump + double jump off the ramp peaks
      offset: [0, 5.5],          // above the main gutter, which drops away beneath it
      pitchOffset: -3.5,
      segments: [
        { len: 20, pitch: -3, label: 'catch', fx: { pulse: 1 } },
        { len: 45, yaw: 55, bank: 45, pitch: -9, label: 'swingOut', fx: { twist: 1.2 } },
        { len: 20, pitch: 8, label: 'crest' },
        { len: 18, pitch: -10 },
        { len: 90, yaw: -110, bank: -55, pitch: -9, label: 'swingBack', fx: { twist: -1.2, flow: -1 } },
        { len: 20, pitch: 6 },
        { len: 18, pitch: -10 },
        { len: 45, yaw: 55, bank: 45, pitch: -9, label: 'returnArc', fx: { twist: 1 } },
        { len: 25, bank: 0, pitch: -16, label: 'dropOff', fx: { flow: -2 } },
      ],
      hints: [],
    },
  ],
};
