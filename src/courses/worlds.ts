import type { CourseLayout, HintSpec, ObstacleSpec, Segment } from '../track/track';
import { armSpan, branch, camel, cascade, corkscrew, drop, hairpin, helix, hops, jump, koch, kreisel, labyrinth, loop, outerbank, roll, run, sideArm, turn } from './elements';

/**
 * Hand-composed courses for the eleven purchasable worlds. Each follows its
 * course style from docs/WORLD_MATH.md ("Course styles"): its own coaster
 * style, main verb, intensity curve, signature moment and kind of split.
 */
type Seg = Segment;
const START = (): Seg[] => [
  { len: 24, pitch: -3, label: 'start', tube: true, fx: { flow: -0.5 } },
  { len: 46, pitch: -11, tube: true, fx: { flow: -2, twist: 1 } },
];
const FINISH = (): Seg[] => [{ len: 55, bank: 0, pitch: -4, label: 'finish', fx: { flow: 1 } }, { len: 60, pitch: 3, label: 'runout' }];
const H = (at: string, s: number, text: string): HintSpec => ({ at, s, text });
const L = (segs: Seg[], label: string): Seg[] => { segs[0] = { ...segs[0], label }; return segs; };
const firstHint = H('start', 0, 'Swipe up, or tap the screen edges, to launch');

// ---------------------------------------------------------------------------
// CONCRETE: storm-drain "tech". Square culverts, 90-degree box corners,
// stepped spillways; splits in threes (the Menger cross).
// ---------------------------------------------------------------------------
function concrete(): CourseLayout {
  const step = (): Seg[] => [{ len: 16, pitch: -30 }, { len: 14, pitch: -2, fx: { pulse: 1 } }];
  const box = (dir: number, pitch = -6): Seg[] => [{ len: 30, yaw: 90 * dir, bank: 10 * dir, pitch, fx: { twist: dir } }, { len: 26, bank: 0, pitch }];
  const legs = 34, mid = 50;
  const segs: Seg[] = [
    ...START(),
    ...L([...step(), ...step(), ...step()], 'spillway'),
    ...L(run(90, -6, { fx: { flow: 1 } }), 'culvert'),
    ...L(box(1), 'corner1'), ...run(40, -6),
    ...L([...box(-1), ...box(1, -7)], 'chicane'), ...run(30, -7),
    ...L(roll(80, -8, 1, { tube: true }), 'tumble'), ...run(30, -8, { tube: true }),
    ...L(drop(40, -55, -6), 'shaft'),
    ...L([...box(1, -10), ...box(1, -10), ...box(1, -10), ...box(1, -10)], 'boxHelix'),
    ...run(40, -6),
    // THE SPONGE: a tube splits three ways (left / centre / right) and rejoins
    ...L(run(armSpan(legs, mid), -7, { tube: true, fx: { pulse: 0.8, flow: -1 } }), 'sponge'),
    ...run(40, -7, { tube: true }),
    ...run(30, -6),
    ...L(run(120, -5, { fx: { flow: 1 } }), 'aqueduct'),
    ...step(), ...step(),
    ...FINISH(),
  ];
  const ob: ObstacleSpec[] = [
    { at: 'culvert', s: 40, x: -3.4, ls: 2.2, w: 5.2, h: 1.7 }, { at: 'culvert', s: 70, x: 3.4, ls: 2.2, w: 5.2, h: 1.7 },
    { at: 'aqueduct', s: 40, x: 0, ls: 1.8, w: 5.2, h: 1.7, kind: 'barrier' }, { at: 'aqueduct', s: 85, x: -3.6, ls: 2, w: 4.8, h: 1.7 },
  ];
  const arm = (dir: number) => sideArm(dir, 32, legs, mid, -7, [{ len: 22, pitch: -7, tube: true }, { len: 10, pitch: -8, gap: true }, { len: 18, pitch: -7, tube: true }], { tube: true });
  return {
    id: 'concrete', name: 'Storm Drain', checkpointEvery: 200, segments: segs, obstacles: ob,
    hints: [firstHint, H('spillway', 0, 'Spillway steps: each one bleeds speed'), H('corner1', -10, 'Box corner: turn in early'), H('tumble', 0, 'Square tumble'),
      H('shaft', 0, 'Shaft drop!'), H('sponge', -30, 'THE SPONGE: left, centre or right'), H('aqueduct', 0, 'Aqueduct')],
    branches: [branch('spongeL', 'Left Void', 'sponge', arm(1)), branch('spongeR', 'Right Void', 'sponge', arm(-1))],
  };
}

// ---------------------------------------------------------------------------
// SHEET METAL: launched duelling looper. Magnetise and invert; mirrored twins.
// ---------------------------------------------------------------------------
function metal(): CourseLayout {
  const legs = 34;
  const segs: Seg[] = [
    ...START(),
    ...L(run(80, -6, { tube: true, fx: { flow: -3 } }), 'launch'),              // pneumatic launch tube
    ...L(camel(70, 40, -45, { pulse: 1 }), 'tophat'), ...run(30, -6),
    ...L(drop(50, -24, -3), 'dropIn'), ...loop(100, 13),
    ...turn(90, 160, 85, -6, { fx: { twist: 2 } }),                                // box-room overbank
    ...L(drop(40, -22, -3), 'pair'), ...loop(80, -13), ...loop(72, 13),
    ...run(30, -6),
    // inverted ceiling ride in a tube: roll over, hold upside down (magnet), roll back
    ...L([{ len: 40, pitch: -6, bank: 180, tube: true, fx: { twist: 2 } }, { len: 70, pitch: -6, tube: true, fx: { flow: -2 } }, { len: 40, pitch: -6, bank: 0, tube: true }], 'ceiling'),
    ...run(30, -6),
    // DUELLING TWINS: mirrored arms with loops either side of the centre line
    ...L(run(armSpan(legs, 150), -6, { fx: { pulse: 0.6 } }), 'twins'),
    ...run(30, -6, { tube: true, fx: { flow: -3 } }), ...L(run(60, -6, { tube: true, fx: { flow: -3 } }), 'relaunch'),
    ...corkscrew(90, -12, 20),
    ...L(roll(70, -6, 1, { tube: true }), 'zeroG'), ...run(30, -6, { tube: true }),
    ...drop(50, -24, -3), ...loop(95, 13),
    ...FINISH(),
  ];
  // loops shift AWAY from the centre track first (shift + = right; the left twin is dir = +1)
  const twinMid = (dir: number): Seg[] => [{ len: 20, pitch: -6 }, { len: 70, loop: true, shift: -12 * dir, pitch: -6 }, { len: 20, pitch: -6 }, { len: 70, loop: true, shift: 12 * dir, pitch: -6 }, { len: 20, pitch: -6 }];
  return {
    id: 'metal', name: 'Foundry Loops', checkpointEvery: 220, segments: segs, obstacles: [],
    hints: [firstHint, H('launch', 0, 'Magnetic launch!'), H('tophat', 0, 'Top hat: MAGNET at the crest'), H('pair', 0, 'Paired loops'),
      H('ceiling', 0, 'Inverted: hold the MAGNET'), H('twins', -20, 'DUELLING TWINS: pick a mirror'), H('relaunch', 0, 'Relaunch!'), H('zeroG', 0, 'Zero-g roll')],
    branches: [branch('twinL', 'Mirror Left', 'twins', sideArm(1, 30, legs, 0, -6, twinMid(1))), branch('twinR', 'Mirror Right', 'twins', sideArm(-1, 30, legs, 0, -6, twinMid(-1)))],
  };
}

// ---------------------------------------------------------------------------
// ICE: Olympic bobsleigh run. Drift and pick your line; speed builds all the
// way; the Kreisel; 60-degree dendrite branches that rejoin.
// ---------------------------------------------------------------------------
function ice(): CourseLayout {
  const legs = 40;
  const segs: Seg[] = [
    ...START(),
    ...L(labyrinth(5, 28, 42, 30, -6), 'labyrinth'),
    ...turn(120, 100, 65, -7), ...turn(120, -100, 65, -7),
    ...L([{ len: 60, yaw: 45, bank: 30, pitch: -7 }, { len: 230, yaw: -270, bank: -72, pitch: -8, fx: { twist: -2 } }, { len: 60, yaw: 45, bank: 30, pitch: -7 }, { len: 24, bank: 0, pitch: -7 }], 'omega'),
    // FROST BRANCH: a 60-degree dendrite needle leaves and rejoins
    ...L(run(armSpan(legs, 60), -7, { fx: { flow: -1 } }), 'dendrite'),
    ...L(corkscrew(100, -12, 25, { tube: true }), 'iceCave'), ...run(30, -7, { tube: true }),
    ...L(labyrinth(6, 40, 40, 40, -8, -1), 'labyrinth2'),
    ...L(kreisel(330, 230, 78, -8), 'kreisel'),
    ...L(run(armSpan(34, 40), -8, { fx: { flow: -1 } }), 'fan'),
    ...run(40, -3),
    ...FINISH(),
  ];
  const needle = (dir: number, yaw: number, l: number, m: number, p: number) => sideArm(dir, yaw, l, m, p, [{ len: m * 0.4, pitch: p - 6 }, { len: m * 0.6, pitch: p }]);
  return {
    id: 'ice', name: 'Glacier Bobsleigh', checkpointEvery: 220, segments: segs, obstacles: [],
    hints: [firstHint, H('labyrinth', 0, 'Labyrinth: drift through the S-curves'), H('omega', 0, 'Omega curve'), H('dendrite', -10, 'Frost needle: break right'),
      H('iceCave', 0, 'Ice cave'), H('kreisel', 0, 'THE KREISEL: ride the wall'), H('fan', -10, 'Dendrite fan: three lines')],
    branches: [branch('needle', 'Frost Needle', 'dendrite', needle(-1, 30, legs, 60, -7)), branch('fanL', 'Left Arm', 'fan', needle(1, 30, 34, 40, -8)), branch('fanR', 'Right Arm', 'fan', needle(-1, 30, 34, 40, -8))],
  };
}

// ---------------------------------------------------------------------------
// WATER: river run. Read the current; meanders, rapids, braided channels,
// flume helix, waterfall.
// ---------------------------------------------------------------------------
function water(): CourseLayout {
  const legs = 36;
  const meander = (n: number, amp: number, len: number): Seg[] => { const o: Seg[] = []; let d = 1; for (let i = 0; i < n; i++) { o.push({ len, yaw: amp * d * (i === 0 || i === n - 1 ? 1 : 2), bank: 12 * d, pitch: -5, fx: { flow: 1.5 } }); d = -d; } o.push({ len: 20, bank: 0, pitch: -5 }); return o; };
  const segs: Seg[] = [
    ...START(),
    ...L(run(60, -3, { fx: { flow: 2 } }), 'source'),
    ...L(meander(5, 55, 85), 'meanders'),
    ...L(hops(6, 26, 4, -7), 'rapids'),
    ...L(run(armSpan(legs, 90), -6, { fx: { flow: 2 } }), 'braids'),
    ...run(30, -6),
    ...L(helix(1, 34, 35, -9, 1, { tube: true }), 'flume'),
    ...L(meander(3, 70, 100), 'oxbow'),
    ...L(drop(45, -40, -4), 'waterfall'),
    ...L(run(80, -3, { fx: { flow: 1 } }), 'basin'),
    ...FINISH(),
  ];
  const braid = (dir: number, p: number) => sideArm(dir, 26, legs, 90, p, [{ len: 30, pitch: p - 3 }, { len: 30, pitch: p + 2 }, { len: 30, pitch: p }]);
  return {
    id: 'water', name: 'River Run', checkpointEvery: 220, segments: segs,
    obstacles: [{ at: 'basin', s: 40, x: 0, ls: 2, w: 5, h: 1.6, kind: 'barrier' }],
    hints: [firstHint, H('source', 0, 'Ride the current'), H('meanders', 0, 'Meanders: the flow pushes you wide'), H('rapids', 0, 'Rapids!'),
      H('braids', -10, 'Braided channels: find the fast one'), H('flume', 0, 'Flume'), H('waterfall', 0, 'Waterfall!')],
    branches: [branch('braidL', 'West Channel', 'braids', braid(1, -6)), branch('braidR', 'East Channel', 'braids', braid(-1, -6))],
  };
}

// ---------------------------------------------------------------------------
// GLASS: sky looper. The Apollonian cascade: loops shrinking big to small.
// ---------------------------------------------------------------------------
function glass(): CourseLayout {
  const segs: Seg[] = [
    ...START(),
    ...L(run(70, -4, { openSky: false, fx: { flow: 0.5 } }), 'ridge'),
    ...L(drop(60, -26, -3), 'bigDrop'), ...loop(115, 13),
    ...L(hops(3, 44, 5, -6), 'bridge'),
    ...L(drop(40, -20, -3), 'preview'), ...loop(85, -13), ...loop(62, 13),
    ...run(30, -8),
    ...L(drop(60, -28, -3), 'gasketDrop'),
    ...L(cascade(118, 0.72, 5, -13), 'gasket'),
    ...L(helix(1, 30, 50, -9, -1), 'tangentHelix'),
    ...outerbank(90, 70, 20, -8),
    ...L(drop(55, -26, -3), 'finale'), ...loop(110, 13),
    ...FINISH(),
  ];
  return {
    id: 'glass', name: 'Apollonian Skyway', checkpointEvery: 230, segments: segs, obstacles: [],
    hints: [firstHint, H('ridge', 0, 'The skyway: hold your line'), H('bigDrop', 0, 'Big loop'), H('preview', 0, 'Two tangent loops'),
      H('gasketDrop', 0, 'THE GASKET: loops inside loops, shrinking'), H('finale', 0, 'Final loop')],
  };
}

// ---------------------------------------------------------------------------
// RUBBER: rebound labyrinth. Bounce and grip: serpentine Turing channels,
// trampolines, bumper pillars, mitosis splits.
// ---------------------------------------------------------------------------
function rubber(): CourseLayout {
  const legs = 30;
  const serp = (n: number): Seg[] => { const o: Seg[] = []; let d = 1; for (let i = 0; i < n; i++) { o.push({ len: 46, yaw: 75 * d * (i === 0 || i === n - 1 ? 1 : 2), bank: 35 * d, pitch: -8, fx: { twist: d * 1.5 } }); d = -d; } o.push({ len: 18, bank: 0, pitch: -7 }); return o; };
  const segs: Seg[] = [
    ...START(),
    ...L(serp(6), 'worm'),
    ...L(jump(30, 12, 12), 'trampoline'),
    ...L(turn(140, 160, 82, -8), 'gripWall'),
    ...L(hops(5, 22, 9, -8), 'ejectors'),
    ...L(run(armSpan(legs, 50), -8, { fx: { pulse: 1 } }), 'mitosis'),
    ...run(30, -8),
    ...L(serp(4), 'worm2'),
    ...L(run(armSpan(24, 30), -8, { fx: { pulse: 1 } }), 'mitosis2'),
    ...L(run(110, -7), 'spots'),
    ...L(jump(30, 14, 12), 'finalBounce'),
    ...FINISH(),
  ];
  const spots: ObstacleSpec[] = [];
  for (let i = 0; i < 6; i++) spots.push({ at: 'spots', s: 14 + i * 15, x: ((i % 3) - 1) * 3.6, ls: 1.4, w: 1.8, h: 2.2, kind: 'post' });
  return {
    id: 'rubber', name: 'Neon Rebound', checkpointEvery: 220, segments: segs, obstacles: spots,
    hints: [firstHint, H('worm', 0, 'Rebound labyrinth'), H('trampoline', 0, 'Trampoline!'), H('gripWall', 0, 'Grip the wall'),
      H('mitosis', -10, 'MITOSIS: the channel divides'), H('spots', 0, 'Bumper field')],
    branches: [branch('cellL', 'Left Cell', 'mitosis', sideArm(1, 28, legs, 50, -8)), branch('cellR', 'Right Cell', 'mitosis', sideArm(-1, 28, legs, 50, -8)),
      branch('cell2L', 'Left Daughter', 'mitosis2', sideArm(1, 30, 24, 30, -8)), branch('cell2R', 'Right Daughter', 'mitosis2', sideArm(-1, 30, 24, 30, -8))],
  };
}

// ---------------------------------------------------------------------------
// SAND: dune terrain coaster. Keep momentum: windward swells and steep slip
// faces; girih 36/72-degree kinks; the star courtyard.
// ---------------------------------------------------------------------------
function sand(): CourseLayout {
  const legs = 34;
  const dune = (): Seg[] => [{ len: 50, pitch: 3, fx: { flow: 0.6 } }, { len: 30, pitch: -30, fx: { flow: -2 } }, { len: 20, pitch: -6 }];
  const girih = (dirs: number[]): Seg[] => dirs.flatMap((d) => [{ len: 22, yaw: 36 * d, bank: 18 * d, pitch: -8 }, { len: 18, bank: 0, pitch: -8 }]);
  const segs: Seg[] = [
    ...START(),
    ...L(drop(50, -30, -6), 'slipFace'),
    ...L([...dune(), ...dune(), ...dune()], 'dunes'),
    ...L(girih([1, 1, -1, -1, -1, 1]), 'ruins'),
    ...L(helix(0.85, 30, 40, -12, 1, { tube: true }), 'tower'),
    ...L(run(110, -9, { fx: { flow: 1 } }), 'scour'),
    ...L(drop(70, -32, -8), 'greatFace'),
    ...L(run(armSpan(legs, 50), -8, { fx: { pulse: 1 } }), 'courtyard'),
    ...run(30, -8),
    ...L(jump(30, 13, 10), 'horns'),
    ...L(drop(60, -30, -5), 'lastFace'),
    ...FINISH(),
  ];
  return {
    id: 'sand', name: 'Dune Run', checkpointEvery: 220, segments: segs,
    obstacles: [{ at: 'scour', s: 40, x: -3.4, ls: 2, w: 5, h: 1.7 }, { at: 'scour', s: 75, x: 3.4, ls: 2, w: 5, h: 1.7 }],
    hints: [firstHint, H('dunes', 0, 'Dunes: keep your momentum'), H('ruins', 0, 'Ruins: 36-degree kinks'), H('greatFace', 0, 'The great slip face'),
      H('courtyard', -10, 'STAR COURTYARD: three exits'), H('horns', -8, 'Dune horns: JUMP')],
    branches: [branch('starL', 'West Exit', 'courtyard', sideArm(1, 36, legs, 50, -8)), branch('starR', 'East Exit', 'courtyard', sideArm(-1, 36, legs, 50, -8))],
  };
}

// ---------------------------------------------------------------------------
// MUD: crack delta ("Plinko"). Choose at forks again and again; sumps and
// sinkholes; the fastest part is the mudslide.
// ---------------------------------------------------------------------------
function mud(): CourseLayout {
  const legs = 26, mid = 24;
  const segs: Seg[] = [
    ...START(),
    ...L(run(80, -10, { fx: { flow: -0.5 } }), 'trench'),
    ...L(run(armSpan(legs, mid), -11), 'fork1'),
    ...L(drop(30, -40, -10), 'sinkhole'),
    ...L([{ len: 26, pitch: -16 }, { len: 26, pitch: 8, fx: { pulse: 1 } }, { len: 20, pitch: -10 }], 'sump'),
    ...L(run(160, -16, { fx: { flow: -2 } }), 'mudslide'),
    ...L(run(armSpan(legs, mid), -12), 'delta1'),
    ...L(run(armSpan(legs, mid), -12), 'delta2'),
    ...L(run(armSpan(legs, mid), -12), 'delta3'),
    ...L([{ len: 30, pitch: -26 }, { len: 14, pitch: -4 }, { len: 30, pitch: -26 }, { len: 20, pitch: -8 }], 'doubleDip'),
    ...FINISH(),
  ];
  const fork = (dir: number) => sideArm(dir, 30, legs, mid, -12);
  return {
    id: 'mud', name: 'Crack Delta', checkpointEvery: 200, segments: segs, obstacles: [{ at: 'trench', s: 50, x: 0, ls: 1.8, w: 5, h: 1.5, kind: 'barrier' }],
    hints: [firstHint, H('fork1', -10, 'Crack fork: pick a side'), H('sinkhole', 0, 'Sinkhole!'), H('sump', 0, 'Sump: break free'),
      H('mudslide', 0, 'Mudslide'), H('delta1', -10, 'THE CRACK DELTA: fork after fork')],
    branches: [
      branch('f1L', 'Left Crack', 'fork1', sideArm(1, 30, legs, mid, -11)), branch('f1R', 'Right Crack', 'fork1', sideArm(-1, 30, legs, mid, -11)),
      branch('d1L', 'Delta West', 'delta1', fork(1)), branch('d2R', 'Delta East', 'delta2', fork(-1)), branch('d3L', 'Delta West', 'delta3', fork(1)), branch('d3R', 'Delta East', 'delta3', fork(-1)),
    ],
  };
}

// ---------------------------------------------------------------------------
// POLISHED STONE: hyper and dive coaster. Hold top speed through pinch points.
// ---------------------------------------------------------------------------
function stone(): CourseLayout {
  const legs = 36;
  const segs: Seg[] = [
    ...START(),
    ...L(run(60, -1, { fx: { pulse: 1 } }), 'lip'),                                   // the hold at the lip
    ...L([{ len: 70, pitch: -72, fx: { flow: -3 } }, { len: 60, pitch: -6 }], 'radialDive'),
    ...L(turn(240, 180, 55, -5, { fx: { twist: 1.5 } }), 'sweep'),
    ...L([...camel(80, 10, -12), ...camel(76, 9, -12), ...camel(70, 8, -12)], 'floaters'),
    ...run(40, -6),
    ...L(run(armSpan(legs, 60), -6), 'pinch'),
    ...L([{ len: 50, pitch: -50, fx: { flow: -2 } }, { len: 40, pitch: -5 }], 'dive2'),
    ...L(turn(170, -180, 65, -5, { fx: { twist: -2 } }), 'innerSweep'),
    ...L(camel(60, 12, -14), 'speedHill'), ...hops(4, 24, 6, -6),
    ...L(run(60, -5), 'finalGate'),
    ...FINISH(),
  ];
  const gate = (at: string, s: number): ObstacleSpec[] => [{ at, s, x: -4.2, ls: 2, w: 4.6, h: 2.2, kind: 'gate' }, { at, s, x: 4.2, ls: 2, w: 4.6, h: 2.2, kind: 'gate' }];
  return {
    id: 'stone', name: 'Temple Dive', checkpointEvery: 230, segments: segs,
    obstacles: [...gate('pinch', 30), ...gate('pinch', 90), ...gate('finalGate', 30)],
    hints: [firstHint, H('lip', 0, 'The lip...'), H('radialDive', 0, 'THE RADIAL DIVE'), H('floaters', 0, 'Floater hills'),
      H('pinch', 0, 'Pinch gates, or take the outer lobe'), H('innerSweep', 0, 'Inner sweep'), H('finalGate', 0, 'Final gate')],
    branches: [branch('lobe', 'Outer Lobe', 'pinch', sideArm(-1, 32, legs, 60, -6))],
  };
}

// ---------------------------------------------------------------------------
// STEEL GRATING: wild-mouse switchback stack (Hilbert). Survive hairpins in rhythm.
// ---------------------------------------------------------------------------
function grating(): CourseLayout {
  const segs: Seg[] = [
    ...START(),
    ...L(run(90, -5, { fx: { flow: 1 } }), 'rhythm'),
    ...L(hairpin(1, 54, 12, -6), 'hairpin1'), ...run(40, -6),
    ...L([{ len: 18, pitch: -28 }, { len: 14, pitch: -3 }, { len: 18, pitch: -28 }, { len: 18, pitch: -5 }], 'mouseDrops'),
    ...L([...hairpin(-1), ...run(30, -7), ...hairpin(1), ...run(30, -7), ...hairpin(-1), ...run(30, -7), ...hairpin(1)], 'chain'),
    ...run(30, -7),
    ...L(helix(1, 22, 30, -12, -1), 'stair'),
    ...L([...hairpin(1, 46), ...run(16, -14), ...hairpin(-1, 46), ...run(16, -14), ...hairpin(1, 46), ...run(16, -14), ...hairpin(-1, 46), ...run(16, -14), ...hairpin(1, 46), ...run(16, -14), ...hairpin(-1, 46)], 'stack'),
    ...run(20, -8),
    ...L(jump(30, 11, 9), 'hatch'),
    ...L(run(160, -6, { fx: { flow: 2 } }), 'rattle'),
    ...hairpin(1, 54),
    ...FINISH(),
  ];
  return {
    id: 'grating', name: 'Hilbert Works', checkpointEvery: 200, segments: segs,
    obstacles: [{ at: 'rattle', s: 50, x: -3.5, ls: 2, w: 5, h: 1.7 }, { at: 'rattle', s: 100, x: 3.5, ls: 2, w: 5, h: 1.7 }],
    hints: [firstHint, H('rhythm', 0, 'Feel the rhythm'), H('hairpin1', -6, 'Hairpin! Ride the outer wall'), H('chain', 0, 'Switchback chain'),
      H('stack', 0, 'THE HILBERT STACK'), H('hatch', -10, 'Gap: JUMP')],
  };
}

// ---------------------------------------------------------------------------
// SNOW: alpine slalom and ski jump. Carve and fly.
// ---------------------------------------------------------------------------
function snow(): CourseLayout {
  const segs: Seg[] = [
    ...START(),
    ...L(run(90, -6, { fx: { flow: 0.5 } }), 'groomed'),
    ...L([...koch(1, 160, -7), ...koch(1, 140, -7)], 'slalom'),
    ...run(20, -7),
    ...L(hops(6, 20, 4, -7), 'moguls'),
    ...L(run(90, -8, { tube: true, fx: { flow: -1.5 } }), 'drift'), ...run(20, -8),
    ...L(koch(2, 300, -7), 'kochCascade'),
    ...run(20, -7),
    ...L(helix(1, 36, 35, -10, 1), 'peakHelix'),
    ...L([{ len: 80, pitch: -26, fx: { flow: -2 } }, { len: 20, pitch: 9, openSky: true, fx: { pulse: 1 } }, { len: 34, pitch: -24, gap: true, openSky: true }, { len: 60, pitch: -24, fx: { flow: -1 } }, { len: 40, pitch: -6 }], 'skiJump'),
    ...FINISH(),
  ];
  return {
    id: 'snow', name: 'Koch Alpine', checkpointEvery: 220, segments: segs,
    obstacles: [{ at: 'groomed', s: 50, x: -3.3, ls: 2, w: 5, h: 1.6 }],
    hints: [firstHint, H('slalom', 0, 'Koch slalom: carve the notches'), H('moguls', 0, 'Moguls'), H('kochCascade', 0, 'Koch cascade: notches inside notches'),
      H('skiJump', 0, 'THE SKI JUMP: jump, then MAGNET to land')],
  };
}

export const WORLD_LAYOUTS: Record<string, () => CourseLayout> = { concrete, metal, ice, water, glass, rubber, sand, mud, stone, grating, snow };
