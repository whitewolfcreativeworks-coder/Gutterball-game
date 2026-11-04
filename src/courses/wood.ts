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
    // LAUNCH TUBE: you start inside a pipe. It splits almost at once:
    // stay in the dark for THE PLUNGE, or hold LEFT for DAYBREAK, which bursts
    // out into daylight and dives back in (same solved geometry as the Burrow,
    // mirrored). Then the pipe opens onto the first big drop.
    { len: 24, pitch: -3, tube: true, label: 'start', fx: { flow: -0.5 } },
    { len: 40, pitch: -12, tube: true, label: 'launchDrop', fx: { flow: -1.5, twist: 1 } },
    { len: 30, pitch: -12, tube: true, label: 'launchSplit', fx: { pulse: 1 } },
    { len: 153, pitch: -13.4, tube: true, label: 'plunge', fx: { flow: -2.5, twist: 1.2 } },
    { len: 142, pitch: -6.3, tube: true, label: 'plungeRun', fx: { twist: -2, pulse: 0.5 } },
    { len: 45, pitch: -4.04, tube: true, label: 'launchMerge', fx: { pulse: 1 } },
    { len: 30, pitch: -7, tube: true },
    { len: 40, pitch: -3, label: 'launchOut', fx: { flow: 1 } },
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
    { len: 230, yaw: -450, bank: -48, pitch: -11, tube: true, label: 'spiral', fx: { twist: 2, flow: -1.5 } },
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
    // THE BURROW: the gutter's walls curl over and close into a full pipe.
    // Roll all the way round inside it. Halfway down the pipe splits: stay in
    // the dark (left) or break right for the SKYLIGHT, which bursts out into an
    // open gutter in daylight and dives back into the pipe further down.
    { len: 30, pitch: -7, label: 'burrowIn', fx: { flow: -1 } },
    { len: 45, pitch: -12, tube: true, label: 'burrow', fx: { twist: 1.5, flow: -1.5 } },
    { len: 30, pitch: -12, tube: true, label: 'burrowSplit', fx: { pulse: 1 } },
    { len: 153, pitch: -13.4, tube: true, label: 'darkLine', fx: { flow: -2.5, twist: -1 } },
    { len: 142, pitch: -6.3, tube: true, label: 'darkRun', fx: { twist: 2, pulse: 0.5 } },
    { len: 45, pitch: -4.04, tube: true, label: 'burrowMerge', fx: { pulse: 1 } },
    { len: 30, pitch: -7, tube: true },
    { len: 40, pitch: -8, label: 'burrowOut', fx: { flow: 1 } },
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
    { at: 'launchDrop', s: 4, text: 'The pipe splits! Hold LEFT hard for Daybreak' },
    { at: 'plunge', s: 20, text: 'The Plunge' },
    { at: 'firstDrop', s: 4, text: 'Hold on!' },
    { at: 'spiral', s: 0, text: 'Spiral tube!' },
    { at: 'hill1', s: 20, text: 'Airtime!' },
    { at: 'firstTurn', s: 10, text: 'Tilt to steer through the bank' },
    { at: 'barrier', s: 0, text: 'Barrier — go around, or tilt the top toward you to JUMP' },
    { at: 'slalom', s: 0, text: 'Weave between the posts' },
    { at: 'kicker', s: -14, text: 'Gap! JUMP' },
    { at: 'bridge', s: 5, text: 'Double-jump up and ride the roof!' },
    { at: 'steepDrop', s: 2, text: 'Big drop — hold the MAGNET to boost' },
    { at: 'wallRide', s: 0, text: 'Near-vertical bank — MAGNET grip' },
    { at: 'corkscrew', s: 0, text: 'Corkscrew!' },
    { at: 'forkRun', s: 0, text: 'HIGH ROAD ahead: jump off the ramp (double-jump if you are slow)' },
    { at: 'preLoop', s: 10, text: 'Loop — hold MAGNET at the top' },
    { at: 'kicker2', s: -20, text: 'Big jump: JUMP, then MAGNET to pull back in' },
    { at: 'burrowIn', s: 0, text: 'The Burrow — the walls close over you' },
    { at: 'burrowIn', s: 22, text: 'Steer hard to roll up the wall and over the top' },
    { at: 'burrow', s: 6, text: 'The pipe splits! Hold RIGHT hard for the Skylight' },
    { at: 'darkLine', s: 10, text: 'The Dark Line' },
    { at: 'finale', s: 0, text: 'Final run' },
    { at: 'finish', s: 15, text: 'Finish!' },
  ],
  branches: [
    {
      id: 'daybreak',
      name: 'Daybreak',
      at: 'launchSplit',
      s: 4,
      offset: [0, 0],
      junction: 63,              // the launch pipe splits in two here...
      rejoin: { at: 'launchMerge', s: 45 }, // ...and the two pipes merge back here
      // (the Skylight's solved layout, mirrored left: lands exactly back on the main pipe)
      segments: [
        { len: 70, yaw: 31.3, pitch: -4.8, tube: true, warp: 34, label: 'dayIn', fx: { twist: 1.5 } },
        { len: 60, yaw: -31.3, pitch: -6.1, tube: true, warp: 34, fx: { flow: -1.5 } },
        { len: 29.3, pitch: -6, label: 'dayOpen', fx: { flow: 1 } },
        { len: 16, pitch: 6, openSky: true, label: 'dayKick', fx: { pulse: 1 } },
        { len: 20, pitch: -13.8, openSky: true, fx: { flow: -1 } },
        { len: 65.8, yaw: -25.6, bank: -25, pitch: -10.2, label: 'daySwing', fx: { twist: -1 } },
        { len: 89.8, yaw: 25.6, bank: 0, pitch: -21.8, tube: true, label: 'dayDive', fx: { flow: -2.5 } },
        { len: 30, pitch: -4.04, tube: true, fx: { pulse: 1 } },
      ],
      hints: [],
    },
    {
      id: 'skylight',
      name: 'Skylight',
      at: 'burrowSplit',
      s: 4,
      offset: [0, 0],
      junction: 63,              // the pipe splits in two here...
      rejoin: { at: 'burrowMerge', s: 45 }, // ...and the two pipes merge back here
      // (layout solved numerically so the Skylight lands exactly back on the main pipe)
      segments: [
        { len: 70, yaw: -31.3, pitch: -4.8, tube: true, warp: 34, label: 'skyIn', fx: { twist: 1.5 } },
        { len: 60, yaw: 31.3, pitch: -6.1, tube: true, warp: 34, fx: { flow: -1.5 } },
        { len: 29.3, pitch: -6, label: 'skyOpen', fx: { flow: 1 } },
        { len: 16, pitch: 6, openSky: true, label: 'skyKick', fx: { pulse: 1 } },
        { len: 20, pitch: -13.8, openSky: true, fx: { flow: -1 } },
        { len: 65.8, yaw: 25.6, bank: 25, pitch: -10.2, label: 'skySwing', fx: { twist: -1 } },
        { len: 89.8, yaw: -25.6, bank: 0, pitch: -21.8, tube: true, label: 'skyDive', fx: { flow: -2.5 } },
        { len: 30, pitch: -4.04, tube: true, fx: { pulse: 1 } },
      ],
      hints: [],
    },
    {
      id: 'highroad',
      name: 'High Road',
      at: 'highKicker',
      s: 62,                     // where a jump off the ramp peaks
      offset: [0, 10.5],         // high above the main gutter, which drops away beneath it
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
