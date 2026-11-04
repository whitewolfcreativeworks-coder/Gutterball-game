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
    { len: 70, pitch: -26, label: 'firstDrop' },
    { len: 35, pitch: -3 },
    { len: 30, pitch: 12, label: 'hill1' },
    { len: 26, pitch: -18 },
    { len: 25, pitch: -5 },
    { len: 125, yaw: 110, bank: 55, pitch: -9, label: 'firstTurn' },
    { len: 30, bank: 0, pitch: -6 },
    { len: 55, pitch: -7, label: 'barrier' },
    { len: 135, yaw: -150, bank: -62, pitch: -10, label: 'rightTurn' },
    { len: 30, bank: 0, pitch: -7 },
    { len: 60, pitch: -8, label: 'offset' },
    { len: 60, pitch: -8, label: 'slalom' },
    { len: 22, pitch: -10 },
    { len: 14, pitch: 9, label: 'kicker' },
    { len: 9, pitch: -8, gap: true, label: 'gap1' },
    { len: 30, pitch: -10, label: 'landing1' },
    { len: 75, yaw: 45, bank: 25, pitch: -7, tunnel: true, label: 'bridge' },
    { len: 75, yaw: -45, bank: -25, pitch: -7, tunnel: true },
    { len: 25, bank: 0, pitch: -6, tunnel: true },
    { len: 70, pitch: -34, label: 'steepDrop' },
    { len: 32, pitch: -5 },
    { len: 160, yaw: 180, bank: 75, pitch: -8, label: 'wallRide' },
    { len: 50, yaw: 10, bank: 0, pitch: -7 },
    { len: 95, loop: true, yaw: 25, shift: -12, pitch: -6, label: 'corkscrew' },
    { len: 40, pitch: -8 },
    { len: 230, yaw: -450, bank: -48, pitch: -11, label: 'spiral' },
    { len: 45, bank: 0, yaw: 0, pitch: -8 },
    // HIGH ROAD fork: an open-sky launch ramp; the main gutter carries on below
    { len: 40, pitch: -6, openSky: true, label: 'forkRun' },
    { len: 18, pitch: 7, openSky: true, label: 'highKicker' },
    { len: 40, pitch: -18, openSky: true, label: 'valley' },
    { len: 70, pitch: -10 },
    { len: 40, pitch: 8, label: 'hill2' },
    { len: 30, pitch: -16 },
    { len: 90, pitch: -8, label: 'rejoin' },
    { len: 70, pitch: -22, label: 'preLoop' },
    { len: 25, pitch: -2 },
    { len: 80, loop: true, shift: 11.5, pitch: -2, label: 'loop' },
    { len: 30, pitch: -6 },
    { len: 30, pitch: 12, label: 'hill3' },
    { len: 25, pitch: -20 },
    { len: 22, pitch: -9 },
    { len: 15, pitch: 10, label: 'kicker2' },
    { len: 14, pitch: -12, gap: true, shift: 1.2, label: 'gap2' },
    { len: 35, pitch: -9, label: 'landing2' },
    { len: 125, yaw: 55, bank: 40, pitch: -8, label: 'finale' },
    { len: 95, yaw: -55, bank: -40, pitch: -8, label: 'finale2' },
    { len: 55, bank: 0, pitch: -4, label: 'finish' },
    { len: 60, pitch: 3, label: 'runout' },
  ],
  obstacles: [
    // Central barrier: climb either wall or jump it
    { at: 'barrier', s: 28, x: 0, ls: 1.4, w: 3.8, h: 1.3, kind: 'barrier' },
    // Offset blocks
    { at: 'offset', s: 14, x: -2.8, ls: 1.8, w: 4.0, h: 1.2 },
    { at: 'offset', s: 40, x: 2.8, ls: 1.8, w: 4.0, h: 1.2 },
    // Slalom posts
    { at: 'slalom', s: 10, x: -1.8, ls: 1.0, w: 1.5, h: 1.7, kind: 'post' },
    { at: 'slalom', s: 27, x: 1.8, ls: 1.0, w: 1.5, h: 1.7, kind: 'post' },
    { at: 'slalom', s: 44, x: -1.8, ls: 1.0, w: 1.5, h: 1.7, kind: 'post' },
    // Finale: gate, low centre block, offset pair
    { at: 'finale', s: 30, x: -3.3, ls: 1.6, w: 3.2, h: 1.4, kind: 'gate' },
    { at: 'finale', s: 30, x: 3.3, ls: 1.6, w: 3.2, h: 1.4, kind: 'gate' },
    { at: 'finale', s: 66, x: 0, ls: 1.4, w: 3.0, h: 1.0, kind: 'barrier' },
    { at: 'finale', s: 100, x: -2.5, ls: 1.6, w: 3.6, h: 1.2 },
    { at: 'finale2', s: 22, x: 2.5, ls: 1.6, w: 3.6, h: 1.2 },
    { at: 'finale2', s: 55, x: 0, ls: 1.4, w: 4.0, h: 1.2, kind: 'barrier' },
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
        { len: 20, pitch: -3, label: 'catch' },
        { len: 45, yaw: 55, bank: 45, pitch: -9, label: 'swingOut' },
        { len: 20, pitch: 8, label: 'crest' },
        { len: 18, pitch: -10 },
        { len: 90, yaw: -110, bank: -55, pitch: -9, label: 'swingBack' },
        { len: 20, pitch: 6 },
        { len: 18, pitch: -10 },
        { len: 45, yaw: 55, bank: 45, pitch: -9, label: 'returnArc' },
        { len: 25, bank: 0, pitch: -16, label: 'dropOff' },
      ],
      hints: [],
    },
  ],
};
