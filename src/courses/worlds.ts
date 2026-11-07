import { skyLines } from './skyLines';
import type { BranchSpec, CourseLayout, HintSpec, ObstacleSpec, Segment } from '../track/track';
import { armSpan, berm, branch, dirtSection, funnelBowl, gullyJump, rollers, tabletop, liftHill, vertWall, pipeCorner, tubeRun, camel, cascade, corkscrew, drop, field, hairpin, helix, hops, jump, koch, kreisel, labyrinth, loop, outerbank, pretzel, roll, run, sideArm, sweeper, terraces, tunnelRun, turn, vortex, wave } from './elements';

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
/** A low skim over a gap: the slope barely changes, so a fast ball skims across a few metres up instead of launching. */
const skimGap = (gap: number): Seg[] => [
  { len: 22, pitch: -6 },
  { len: 16, pitch: 1, openSky: true, fx: { pulse: 1 } },
  { len: gap, pitch: -2, gap: true, openSky: true },
  { len: 60, pitch: -4, openSky: true, fx: { flow: -1 } },
  { len: 30, pitch: -7 },
];
const firstHint = H('start', 0, 'Swipe up, or tap the screen edges, to launch');
// ---------------------------------------------------------------------------
// ALTERNATE ROUTES (v7): a split is a choice of a whole different ride to the
// end. The route peels off gently from a long straight (easy to drift into),
// runs alongside a little lower for a while (close enough to jump across),
// then goes its own way through its own elements to its own finish.
// ---------------------------------------------------------------------------
const peel = (dir: number, pitch: number): Seg[] => [
  { len: 70, yaw: 22 * dir, pitch, fx: { pulse: 0.6 } },
  { len: 70, yaw: -22 * dir, pitch: pitch - 2 },
  { len: 160, pitch: pitch - 2, openSky: true, label: 'alongside', fx: { flow: 1 } },   // parallel: jump across if you dare
  { len: 90, yaw: 45 * dir, bank: 12 * dir, pitch: pitch - 3 },                          // and away it goes
  { len: 30, bank: 0, pitch: pitch - 3 },
];
const route = (id: string, name: string, at: string, segments: Seg[], obstacles: ObstacleSpec[] = [], hints: HintSpec[] = [], from?: string): BranchSpec => ({
  id, name, at, s: 2, offset: [0, 0], junction: 'auto', toFinish: true, from, segments: [...segments, ...FINISH()], obstacles, hints,
});
const sign = (at: string, route: string, dir: number) => ({ at, s: -30, text: dir > 0 ? `◀ ${route.toUpperCase()}` : `${route.toUpperCase()} ▶` });


// ---------------------------------------------------------------------------
// CONCRETE: storm-drain "tech". Square culverts, 90-degree box corners,
// stepped spillways; splits in threes (the Menger cross).
// ---------------------------------------------------------------------------
function concrete(): CourseLayout {
  const step = (): Seg[] => [{ len: 16, pitch: -30 }, { len: 14, pitch: -2, fx: { pulse: 1 } }];
  const box = (dir: number, pitch = -6): Seg[] => [{ len: 95, yaw: 90 * dir, bank: 10 * dir, pitch, fx: { twist: dir } }, { len: 26, bank: 0, pitch }];
  const legs = 34, mid = 50;
  const segs: Seg[] = [
    ...START(),
    ...L([...step(), ...step(), ...step()], 'spillway'),
    ...L(run(90, -6, { tube: true, fx: { flow: -1 } }), 'culvert'),
    ...L(box(1), 'corner1'), ...run(40, -6),
    ...L([...box(-1), ...box(1, -7)], 'chicane'), ...run(30, -7),
    ...L(roll(80, -8, 1, { tube: true }), 'tumble'), ...run(30, -8, { tube: true }),
    ...L(drop(40, -55, -6), 'shaft'),
    ...L(helix(1, 30, 20, -10, 1, { tube: true }), 'boxHelix'),
    ...run(40, -6),
    // THE SPONGE: a tube splits three ways (left / centre / right) and rejoins
    ...L(run(armSpan(legs, mid), -7, { fx: { pulse: 0.8, flow: -1 } }), 'sponge'),
    ...run(40, -7),
    ...run(30, -6),
    ...L(run(120, -5, { fx: { flow: 1 } }), 'aqueduct'),
    ...step(), ...step(),
    // ACT II — TREATMENT WORKS: the drain funnel, the sewer main, the weir
    ...L(drop(40, -24, -6), 'works'),
    ...L(funnelBowl(-1), 'drainFunnel'),
    ...run(30, -7),
    ...L(run(130, -6, { fx: { flow: 1 } }), 'filterBeds'), ...L(vertWall(1), 'skate1'), ...L(vertWall(-1), 'skate2'),
    ...L(tubeRun(220, 40, -7), 'sewerMain'),
    ...L(pipeCorner(150, -100, -7), 'weir'),
    ...L(terraces(5, 14, -30, 16), 'longSpill'),
    ...L([...box(-1), ...box(1)], 'chicane2'), ...run(30, -7),
    ...L(run(120, -6), 'outfall'),
    ...liftHill(70, -70, 0, { label: 'outfallShaft' }),
    ...FINISH(),
  ];
  const ob: ObstacleSpec[] = [
    { at: 'culvert', s: 40, x: -3.4, ls: 2.2, w: 5.2, h: 1.7 }, { at: 'culvert', s: 70, x: 3.4, ls: 2.2, w: 5.2, h: 1.7 },
    { at: 'aqueduct', s: 40, x: 0, ls: 1.8, w: 5.2, h: 1.7, kind: 'barrier' }, { at: 'aqueduct', s: 85, x: -3.6, ls: 2, w: 4.8, h: 1.7 },
  ];
  const arm = (dir: number) => sideArm(dir, 32, legs, mid, -7, [{ len: 22, pitch: -7, tube: true }, { len: 10, pitch: -8, gap: true }, { len: 18, pitch: -7, tube: true }], { tube: true });
  return {
    id: 'concrete', name: 'Storm Drain', checkpointEvery: 200, segments: segs, obstacles: [...ob, ...field('filterBeds', 'sliders', 4, 16, 28), ...field('outfall', 'gates', 3, 20, 34),],
    hints: [firstHint, H('works', 0, 'Act II: the Treatment Works'), H('drainFunnel', 0, 'THE BOWL: roll round, drop down the drain'), H('skate1', 0, 'Vert wall: ride it up!'), H('sewerMain', 0, 'Sewer main'), H('weir', 0, 'The weir: ride the high wall'), H('longSpill', 0, 'Long spillway'), H('spillway', 0, 'Spillway steps: each one bleeds speed'), H('corner1', -10, 'Box corner: turn in early'), H('tumble', 0, 'Square tumble'),
      H('shaft', 0, 'Shaft drop!'), H('sponge', -30, 'THE SPONGE: left, centre or right'), H('aqueduct', 0, 'Aqueduct')],
    signs: [sign('sponge', 'Sewer Express', 1)],
    branches: [route('routeSewer', 'Sewer Express', 'sponge', [
      ...peel(1, -7),
      ...L(tubeRun(260, 35, -8), 'sewerA'), ...pipeCorner(150, -90, -8),
      ...L(run(150, -7), 'sewerYard'), ...vertWall(-1), ...vertWall(1),
      ...L(funnelBowl(1), 'sewerBowl'),
      ...terraces(4, 16, -28, 16), ...tubeRun(220, -30, -8),
      ...liftHill(60, -60, 0, { label: 'sewerLift' }),
    ], [...field('sewerYard', 'sliders', 4, 18, 30)], [H('alongside', 0, 'SEWER EXPRESS: pipes all the way down'), H('sewerYard', 0, 'Junction yard: sliders'), H('sewerBowl', 0, 'The settling bowl')])],
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
    ...turn(90, 160, 40, -6, { tube: true, fx: { twist: 2 } }),                     // box-room turn, in a pipe
    ...L(drop(40, -22, -3), 'pair'), ...loop(80, -13), ...loop(72, 13),
    ...run(30, -6),
    // inverted ceiling ride in a tube: roll over, hold upside down (magnet), roll back
    ...L([{ len: 40, pitch: -6, bank: 180, tube: true, fx: { twist: 2 } }, { len: 70, pitch: -6, tube: true, fx: { flow: -2 } }, { len: 40, pitch: -6, bank: 0, tube: true }], 'ceiling'),
    ...run(30, -6),
    // DUELLING TWINS: mirrored arms with loops either side of the centre line
    ...L(run(armSpan(legs, 150), -6, { fx: { pulse: 0.6 } }), 'twins'),
    ...run(30, -6, { tube: true, fx: { flow: -3 } }), ...L(run(60, -6, { tube: true, fx: { flow: -3 } }), 'relaunch'),
    ...corkscrew(90, -12, 20, { tube: true }),
    ...L(roll(70, -6, 1, { tube: true }), 'zeroG'), ...run(30, -6, { tube: true }),
    ...drop(50, -24, -3), ...loop(95, 13),
    // ACT II — ROLLING MILL: wave turns, a second loop cascade, the pretzel
    ...run(30, -6),
    ...L(wave(1), 'mill'), ...L(wave(-1), 'mill2'),
    ...L(drop(50, -26, -3), 'millDrop'), ...L(cascade(96, 0.8, 3, 13), 'rollers'),
    ...L(pretzel(36, 60, -10, { tube: true }), 'pretzel'),
    ...L(run(60, -6, { tube: true, fx: { flow: -3 } }), 'boost2'),
    ...liftHill(80, -72, 0, { label: 'liftMill' }), ...run(30, -6),
    ...L(pipeCorner(160, 110, -6), 'conveyor'), ...L(funnelBowl(-1), 'sheetFunnel'),
    ...L(roll(80, -6, 2, { tube: true }), 'doubleRoll'), ...run(30, -6, { tube: true }),
    ...drop(50, -24, -3), ...loop(90, -13),
    ...FINISH(),
  ];
  // loops shift AWAY from the centre track first (shift + = right; the left twin is dir = +1)
  const twinMid = (dir: number): Seg[] => [{ len: 20, pitch: -6 }, { len: 70, loop: true, shift: -12 * dir, pitch: -6 }, { len: 20, pitch: -6 }, { len: 70, loop: true, shift: 12 * dir, pitch: -6 }, { len: 20, pitch: -6 }];
  return {
    id: 'metal', name: 'Foundry Loops', checkpointEvery: 220, segments: segs, obstacles: [...field('relaunch', 'sliders', 2, 18, 24)],
    hints: [firstHint, H('mill', 0, 'Act II: the Rolling Mill. Wave turns'), H('rollers', 0, 'Loop rollers'), H('pretzel', 0, 'The pretzel'), H('sheetFunnel', 0, 'Sheet-metal funnel'), H('liftMill', 0, 'Lift hill... hold on'), H('doubleRoll', 0, 'Double roll'), H('launch', 0, 'Magnetic launch!'), H('tophat', 0, 'Top hat: MAGNET at the crest'), H('pair', 0, 'Paired loops'),
      H('ceiling', 0, 'Inverted: hold the MAGNET'), H('twins', -20, 'DUELLING TWINS: pick a mirror'), H('relaunch', 0, 'Relaunch!'), H('zeroG', 0, 'Zero-g roll')],
    signs: [sign('twins', 'Magnet Mile', -1)],
    branches: [route('routeMagnet', 'Magnet Mile', 'twins', [
      ...peel(-1, -6),
      ...L(drop(50, -24, -3), 'magDrop'), ...cascade(100, 0.78, 4, -13),
      ...L(roll(80, -6, 2, { tube: true }), 'magRoll'), ...run(30, -6, { tube: true }),
      ...L(run(140, -6), 'magYard'), ...pipeCorner(170, 100, -6),
      ...L(gullyJump(14), 'magGap'), ...funnelBowl(-1),
      ...drop(50, -24, -3), ...loop(95, -13),
    ], [...field('magYard', 'sliders', 4, 16, 28)], [H('alongside', 0, 'MAGNET MILE: loops on loops'), H('magRoll', 0, 'Double roll'), H('magGap', -10, 'Gap: JUMP, then MAGNET')])],
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
    ...L(labyrinth(6, 40, 40, 40, -8, -1, { tube: true }), 'labyrinth2'),
    ...L(kreisel(330, 230, 78, -8), 'kreisel'),
    ...L(run(armSpan(34, 40), -8, { fx: { flow: -1 } }), 'fan'),
    ...run(40, -3),
    // ACT II — THE CREVASSE: ice-funnel vortex, serac hops, the reverse omega
    ...L(pipeCorner(160, -90, -8), 'crevasse'),
    ...L(vortex(1.75, 36, 18, 60, -9, 1, { tube: true }), 'iceFunnel'),
    ...run(30, -7),
    ...L(hops(5, 24, 4, -7), 'seracs'), ...L(funnelBowl(1), 'iceBowl'),
    ...L(labyrinth(5, 34, 40, 34, -8), 'labyrinth3'),
    ...L([{ len: 60, yaw: -45, bank: -30, pitch: -7 }, { len: 230, yaw: 270, bank: 72, pitch: -8, fx: { twist: 2 } }, { len: 60, yaw: -45, bank: -30, pitch: -7 }, { len: 24, bank: 0, pitch: -7 }], 'omega2'),
    ...L(sweeper(140, 80, -7), 'moraine'), ...sweeper(140, -80, -7),
    ...L(tubeRun(200, -35, -7), 'blueTunnel'),
    ...FINISH(),
  ];
  const needle = (dir: number, yaw: number, l: number, m: number, p: number) => sideArm(dir, yaw, l, m, p, [{ len: m * 0.4, pitch: p - 6 }, { len: m * 0.6, pitch: p }]);
  return {
    id: 'ice', name: 'Glacier Bobsleigh', checkpointEvery: 220, segments: segs, obstacles: [],
    hints: [firstHint, H('crevasse', 0, 'Act II: the Crevasse'), H('iceFunnel', 0, 'ICE FUNNEL'), H('seracs', 0, 'Seracs'), H('iceBowl', 0, 'Ice bowl'), H('omega2', 0, 'Reverse omega'), H('blueTunnel', 0, 'Blue tunnel'), H('labyrinth', 0, 'Labyrinth: drift through the S-curves'), H('omega', 0, 'Omega curve'), H('dendrite', -10, 'Frost needle: break right'),
      H('iceCave', 0, 'Ice cave'), H('kreisel', 0, 'THE KREISEL: ride the wall'), H('fan', -10, 'Dendrite fan: three lines')],
    signs: [sign('dendrite', 'Crevasse Run', -1)],
    branches: [route('routeCrevasse', 'Crevasse Run', 'dendrite', [
      ...peel(-1, -7),
      ...L(labyrinth(5, 26, 110, 30, -8, 1, { tube: true }), 'crevA'),
      ...L(funnelBowl(-1), 'crevBowl'),
      ...L(rollers(5, 26, 6), 'seracs2'), ...berm(1), ...tabletop(),
      ...tubeRun(240, 40, -8), ...vertWall(1),
      ...liftHill(70, -65, 0, { label: 'crevLift' }),
    ], [], [H('alongside', 0, 'CREVASSE RUN: into the ice'), H('crevBowl', 0, 'Ice bowl'), H('seracs2', 0, 'Pump the seracs')])],
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
    // ACT II — DELTA & CAVES: second rapids, the flume pretzel, the cave, the falls
    ...L(meander(4, 50, 80), 'delta'),
    ...L(hops(7, 24, 5, -7), 'rapids2'),
    ...L(pretzel(32, 40, -8, { tube: true }), 'flumes'),
    ...L(tubeRun(220, 45, -6), 'cave'),
    ...L(pipeCorner(150, -90, -6), 'bend'),
    ...L(terraces(4, 18, -32, 20), 'cascades'),
    ...L(funnelBowl(-1), 'whirlpool'),
    ...L(run(100, -4, { fx: { flow: 2 } }), 'estuary'),
    ...liftHill(70, -70, 0, { label: 'bigFalls' }),
    ...FINISH(),
  ];
  const braid = (dir: number, p: number) => sideArm(dir, 26, legs, 90, p, [{ len: 30, pitch: p - 3 }, { len: 30, pitch: p + 2 }, { len: 30, pitch: p }]);
  return {
    id: 'water', name: 'River Run', checkpointEvery: 220, segments: segs,
    obstacles: [...field('estuary', 'sliders', 3, 20, 26), { at: 'basin', s: 40, x: 0, ls: 2, w: 5, h: 1.6, kind: 'barrier' }],
    hints: [firstHint, H('delta', 0, 'Act II: the delta'), H('rapids2', 0, 'White water!'), H('flumes', 0, 'Flume pretzel'), H('cave', 0, 'The cave'), H('cascades', 0, 'Cascades'), H('whirlpool', 0, 'WHIRLPOOL: round and round and down'), H('bigFalls', 0, 'Up to the big falls...'), H('source', 0, 'Ride the current'), H('meanders', 0, 'Meanders: the flow pushes you wide'), H('rapids', 0, 'Rapids!'),
      H('braids', -10, 'Braided channels: find the fast one'), H('flume', 0, 'Flume'), H('waterfall', 0, 'Waterfall!')],
    signs: [sign('braids', 'Whitewater', -1)],
    branches: [route('routeWhite', 'Whitewater', 'braids', [
      ...peel(-1, -6),
      ...L(rollers(7, 24, 5, -7), 'rapidsX'), ...sweeper(150, -70, -6), ...sweeper(150, -60, -6),
      ...L(run(130, -5, { fx: { flow: 2 } }), 'logJam'), ...funnelBowl(1),
      ...L(tubeRun(240, -40, -7), 'underground'), ...terraces(4, 18, -30, 20),
      ...liftHill(70, -70, 0, { label: 'whiteFalls' }),
    ], [...field('logJam', 'sliders', 4, 16, 26)], [H('alongside', 0, 'WHITEWATER: the wild channel'), H('rapidsX', 0, 'Rapids!'), H('logJam', 0, 'Log jam'), H('underground', 0, 'Underground river')])],
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
    ...L(tubeRun(200, 30, -6), 'bridge'),
    ...L(drop(40, -20, -3), 'preview'), ...loop(85, -13), ...loop(62, 13),
    ...run(30, -8),
    ...L(drop(60, -28, -3), 'gasketDrop'),
    ...L(cascade(118, 0.72, 5, -13), 'gasket'),
    ...L(helix(1, 34, 50, -9, -1, { tube: true }), 'tangentHelix'),
    ...outerbank(90, 70, 20, -8),
    ...L(drop(55, -26, -3), 'finale'), ...loop(110, 13),
    // ACT II — PRISM HEIGHTS: high floaters, a second gasket, the crystal pretzel
    ...run(30, -6),
    ...L([...camel(90, 12, -14), ...camel(84, 11, -14), ...camel(78, 10, -14)], 'floaters'),
    ...L(pipeCorner(170, 100, -6), 'prismBend'), ...L(funnelBowl(1), 'crystalBowl'),
    ...liftHill(90, -70, 0, { label: 'skyLift' }), ...L(cascade(108, 0.75, 4, 13), 'gasket2'),
    ...L(pretzel(30, 55, -8, { tube: true }), 'crystal'),
    ...L(roll(80, -6, 1, { tube: true }), 'prismRoll'), ...run(30, -6, { tube: true }),
    ...L(wave(-1), 'glassWave'),
    ...FINISH(),
  ];
  return {
    id: 'glass', name: 'Apollonian Skyway', checkpointEvery: 230, segments: segs, obstacles: [],
    hints: [firstHint, H('floaters', 0, 'Act II: Prism Heights. Floaters'), H('skyLift', 0, 'Sky lift: here comes the drop'), H('gasket2', 0, 'The second gasket'), H('crystal', 0, 'Crystal pretzel'), H('crystalBowl', 0, 'Crystal bowl'), H('prismRoll', 0, 'Prism roll'), H('ridge', 0, 'The skyway: hold your line'), H('bigDrop', 0, 'Big loop'), H('preview', 0, 'Two tangent loops'),
      H('gasketDrop', 0, 'THE GASKET: loops inside loops, shrinking'), H('finale', 0, 'Final loop')],
  };
}

// ---------------------------------------------------------------------------
// RUBBER: rebound labyrinth. Bounce and grip: serpentine Turing channels,
// trampolines, bumper pillars, mitosis splits.
// ---------------------------------------------------------------------------
function rubber(): CourseLayout {
  const legs = 30;
  const serp = (n: number, tube = false): Seg[] => { const o: Seg[] = []; let d = 1; for (let i = 0; i < n; i++) { o.push({ len: 90, yaw: 40 * d * (i === 0 || i === n - 1 ? 1 : 2), bank: (tube ? 20 : 35) * d, pitch: -8, tube, fx: { twist: d * 1.5 } }); d = -d; } o.push({ len: 18, bank: 0, pitch: -7, tube }); return o; };
  const segs: Seg[] = [
    ...START(),
    ...L(serp(6, true), 'worm'),
    ...L(jump(30, 12, 12), 'trampoline'),
    ...L(turn(140, 160, 82, -8), 'gripWall'),
    ...L(hops(5, 22, 9, -8), 'ejectors'),
    ...L(run(armSpan(legs, 50), -8, { fx: { pulse: 1 } }), 'mitosis'),
    ...run(30, -8),
    ...L(serp(4, true), 'worm2'),
    ...L(run(armSpan(24, 30), -8, { fx: { pulse: 1 } }), 'mitosis2'),
    ...L(run(110, -7), 'spots'),
    ...L(jump(30, 14, 12), 'finalBounce'),
    // ACT II — BOUNCE HOUSE: double trampoline, the bumper colonnade, the spin bowl
    ...L(serp(5), 'worm3'),
    ...L(jump(30, 12, 12), 'tramp2'), ...L(jump(30, 13, 12), 'tramp3'),
    ...L(run(140, -7), 'bumpers'), ...L(vertWall(1), 'rampL'), ...L(vertWall(-1), 'rampR'),
    ...L(helix(1.25, 40, 50, -10, 1, { tube: true }), 'spinBowl'),
    ...L([...rollers(8, 22, 8), ...berm(1)], 'pumpTrack'),
    ...liftHill(60, -65, 0, { label: 'tower2' }), ...L(wave(1), 'rubberWave'),
    ...L(run(110, -7), 'slalom'),
    ...FINISH(),
  ];
  const spots: ObstacleSpec[] = [];
  for (let i = 0; i < 6; i++) spots.push({ at: 'spots', s: 14 + i * 15, x: ((i % 3) - 1) * 3.6, ls: 1.4, w: 1.8, h: 2.2, kind: 'post' });
  return {
    id: 'rubber', name: 'Neon Rebound', checkpointEvery: 220, segments: segs, obstacles: [...spots, ...field('bumpers', 'sliders', 5), ...field('slalom', 'posts', 4, 16, 22),],
    hints: [firstHint, H('worm3', 0, 'Act II: the Bounce House'), H('tramp2', 0, 'Double trampoline!'), H('bumpers', 0, 'Bumpers'), H('rampL', 0, 'Vert ramps!'), H('spinBowl', 0, 'SPIN BOWL'), H('pumpTrack', 0, 'Pump track!'), H('slalom', 0, 'Post slalom'), H('worm', 0, 'Rebound labyrinth'), H('trampoline', 0, 'Trampoline!'), H('gripWall', 0, 'Grip the wall'),
      H('mitosis', -10, 'MITOSIS: the channel divides'), H('spots', 0, 'Bumper field')],
    signs: [sign('mitosis', 'Trampoline Park', -1)],
    branches: [route('routeBounce', 'Trampoline Park', 'mitosis', [
      ...peel(-1, -8),
      ...L(rollers(8, 22, 8), 'bouncePump'), ...berm(-1),
      ...L(jump(30, 12, 12), 'trampA'), ...jump(30, 13, 12), ...vertWall(1), ...vertWall(-1),
      ...L(run(140, -7), 'bounceField'), ...helix(1.25, 40, 50, -10, -1, { tube: true }),
      ...tabletop(), ...gullyJump(14),
    ], [...field('bounceField', 'sliders', 5)], [H('alongside', 0, 'TRAMPOLINE PARK'), H('trampA', -10, 'Trampolines!'), H('bounceField', 0, 'Bumper sliders')])],
  };
}

// ---------------------------------------------------------------------------
// SAND: dune terrain coaster. Keep momentum: windward swells and steep slip
// faces; girih 36/72-degree kinks; the star courtyard.
// ---------------------------------------------------------------------------
function sand(): CourseLayout {
  const legs = 34;
  // (v8) dunes flow: a long glide down each face, no up-and-over hump
  const dune = (): Seg[] => [{ len: 50, pitch: -5, fx: { flow: 0.6 } }, { len: 30, pitch: -12, fx: { flow: -2 } }, { len: 20, pitch: -7 }];
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
    // ACT II — SANDSTORM CANYON: slot canyon, sweepers, the second star, the last dunes
    ...L(tubeRun(220, -40, -8), 'slotCanyon'),
    ...L(pipeCorner(150, 90, -7), 'canyonBend'), ...pipeCorner(150, -90, -7), ...L(vertWall(-1), 'duneWall'),
    ...L(girih([-1, -1, 1, 1, 1, -1]), 'ruins2'),
    ...L([...dune(), ...dune(), ...dune(), ...dune()], 'dunes2'), ...L([...rollers(5, 28, 7), ...berm(1), ...tabletop()], 'duneBMX'),
    ...L(run(120, -8), 'oasis'),
    ...L(helix(1, 32, 40, -11, -1, { tube: true }), 'minaret'),
    ...L(terraces(3, 18, -30, 18), 'stepwell'),
    ...liftHill(70, -62, 0, { label: 'finalFace' }),
    ...FINISH(),
  ];
  return {
    id: 'sand', name: 'Dune Run', checkpointEvery: 220, segments: segs,
    obstacles: [...field('oasis', 'posts', 4, 16, 24), { at: 'scour', s: 100, x: 0, ls: 2.1, w: 3.6, h: 1.7, move: { amp: 2.6, period: 3.4 } }, { at: 'scour', s: 40, x: -3.4, ls: 2, w: 5, h: 1.7 }, { at: 'scour', s: 75, x: 3.4, ls: 2, w: 5, h: 1.7 }],
    hints: [firstHint, H('slotCanyon', 0, 'Act II: the slot canyon'), H('canyonBend', 0, 'Ride the high wall'), H('dunes2', 0, 'Dune sea'), H('duneBMX', 0, 'Dune BMX: pump and jump'), H('duneWall', 0, 'Dune wall: ride it up'), H('minaret', 0, 'Minaret'), H('stepwell', 0, 'Stepwell'), H('dunes', 0, 'Dunes: keep your momentum'), H('ruins', 0, 'Ruins: 36-degree kinks'), H('greatFace', 0, 'The great slip face'),
      H('courtyard', -10, 'STAR COURTYARD: three exits'), H('horns', -8, 'Dune horns: JUMP')],
    signs: [sign('courtyard', 'Oasis Road', -1)],
    branches: [route('routeOasis', 'Oasis Road', 'courtyard', [
      ...peel(-1, -8),
      ...L([...dune(), ...dune(), ...dune()], 'oasisDunes'), ...berm(1),
      ...L(gullyJump(16), 'wadi'), ...tabletop(),
      ...L(tubeRun(240, 35, -8), 'kasbah'), ...funnelBowl(-1),
      ...L(run(130, -7), 'souk'), ...liftHill(70, -62, 0, { label: 'oasisFace' }),
    ], [...field('souk', 'posts', 5, 14, 22)], [H('alongside', 0, 'OASIS ROAD'), H('wadi', -10, 'Wadi: JUMP'), H('kasbah', 0, 'The kasbah'), H('souk', 0, 'The souk')])],
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
    ...L(run(160, -16, { tube: true, fx: { flow: -2 } }), 'mudslide'),
    ...L(run(armSpan(legs, mid), -12), 'delta1'),
    ...L(run(armSpan(legs, mid), -12), 'delta2'),
    ...L(run(armSpan(legs, mid), -12), 'delta3'),
    ...L([{ len: 30, pitch: -26 }, { len: 14, pitch: -4 }, { len: 30, pitch: -26 }, { len: 20, pitch: -8 }], 'doubleDip'),
    // ACT II — LANDSLIDE: terraced paddies, the sinkhole funnel, the long slide
    ...L(dirtSection(1), 'motocross'), ...L(terraces(5, 16, -30, 18), 'paddies'),
    ...L(pipeCorner(140, 90, -10), 'gully'), ...pipeCorner(140, -90, -10),
    ...L(funnelBowl(1), 'sinkFunnel'),
    ...L(run(130, -12), 'boulders'),
    ...L([{ len: 26, pitch: -16 }, { len: 26, pitch: 8, fx: { pulse: 1 } }, { len: 20, pitch: -10 }], 'sump2'),
    ...L(tubeRun(220, 40, -12), 'burrow'),
    ...liftHill(60, -60, 0, { label: 'ridge' }), ...L(run(200, -16, { tube: true, fx: { flow: -2 } }), 'landslide'),
    ...FINISH(),
  ];
  const fork = (dir: number) => sideArm(dir, 30, legs, mid, -12);
  return {
    id: 'mud', name: 'Crack Delta', checkpointEvery: 200, segments: segs, obstacles: [...field('boulders', 'sliders', 4, 16, 28), { at: 'trench', s: 50, x: 0, ls: 1.8, w: 5, h: 1.5, kind: 'barrier' }],
    hints: [firstHint, H('motocross', 0, 'MOTOCROSS: pump the rollers, carve the berms, jump the gully'), H('paddies', 0, 'Terraces'), H('sinkFunnel', 0, 'SINKHOLE: round and down'), H('boulders', 0, 'Boulders'), H('burrow', 0, 'Mud burrow'), H('landslide', 0, 'LANDSLIDE!'), H('fork1', -10, 'Crack fork: pick a side'), H('sinkhole', 0, 'Sinkhole!'), H('sump', 0, 'Sump: break free'),
      H('mudslide', 0, 'Mudslide'), H('delta1', -10, 'THE CRACK DELTA: fork after fork')],
    signs: [sign('fork1', 'Mudslide', 1)],
    branches: [
      route('routeSlide', 'Mudslide', 'fork1', [
        ...peel(1, -11),
        ...L(run(160, -16, { tube: true, fx: { flow: -2 } }), 'slideA'), ...dirtSection(-1),
        ...L(run(240, -10), 'swampFork'),
        ...funnelBowl(1), ...liftHill(60, -60, 0, { label: 'slideLift' }),
      ], [], [H('alongside', 0, 'MUDSLIDE: down the gully'), H('slideA', 0, 'The slide'), H('swampFork', -20, 'Fork again: drift RIGHT for the Swamp')]),
      // ...and the Mudslide splits again
      route('routeSwamp', 'Swamp', 'swampFork', [
        ...peel(-1, -10),
        ...L(rollers(6, 26, 7, -9), 'bog'), ...berm(1), ...L(tubeRun(220, 35, -10), 'mangrove'),
        ...L(run(130, -9), 'stumps'), ...vertWall(-1), ...gullyJump(14),
      ], [...field('stumps', 'sliders', 4, 16, 28)], [H('alongside', 0, 'THE SWAMP'), H('mangrove', 0, 'Mangrove tunnel'), H('stumps', 0, 'Stumps')], 'routeSlide'),
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
    ...L(turn(170, -180, 30, -5, { tube: true, fx: { twist: -2 } }), 'innerSweep'),
    ...L(camel(60, 12, -14), 'speedHill'), ...hops(4, 24, 6, -6),
    ...L(run(60, -5), 'finalGate'),
    // ACT II — THE COLONNADE: pillared hall, wave turns, the third dive, the spiral stair
    ...liftHill(90, -75, 0, { label: 'templeLift' }), ...L(run(150, -5), 'colonnade'),
    ...L(wave(1), 'templeWave'), ...L(wave(-1), 'templeWave2'),
    ...L([{ len: 60, pitch: -60, fx: { flow: -3 } }, { len: 50, pitch: -5 }], 'dive3'),
    ...L(pipeCorner(200, 140, -5), 'nave'), ...L(vertWall(1), 'altarWall'),
    ...L(helix(1.5, 36, 50, -10, -1, { tube: true }), 'spiralStair'),
    ...L([...camel(80, 10, -12), ...camel(74, 9, -12)], 'floaters2'),
    ...L(tubeRun(220, -40, -6), 'crypt'),
    ...FINISH(),
  ];
  const gate = (at: string, s: number): ObstacleSpec[] => [{ at, s, x: -4.2, ls: 2, w: 4.6, h: 2.2, kind: 'gate' }, { at, s, x: 4.2, ls: 2, w: 4.6, h: 2.2, kind: 'gate' }];
  return {
    id: 'stone', name: 'Temple Dive', checkpointEvery: 230, segments: segs,
    obstacles: [...field('colonnade', 'colonnade', 5, 14, 28), ...field('colonnade', 'sliders', 4, 28, 28, 1.6), ...gate('pinch', 30), ...gate('pinch', 90), ...gate('finalGate', 30)],
    hints: [firstHint, H('templeLift', 0, 'Act II: the temple lift'), H('colonnade', 0, 'The Colonnade'), H('templeWave', 0, 'Wave turns'), H('dive3', 0, 'THE THIRD DIVE'), H('nave', 0, 'The nave'), H('altarWall', 0, 'Vert wall'), H('spiralStair', 0, 'Spiral stair'), H('crypt', 0, 'The crypt'), H('lip', 0, 'The lip...'), H('radialDive', 0, 'THE RADIAL DIVE'), H('floaters', 0, 'Floater hills'),
      H('pinch', 0, 'Pinch gates, or take the outer lobe'), H('innerSweep', 0, 'Inner sweep'), H('finalGate', 0, 'Final gate')],
    signs: [sign('pinch', 'Catacombs', 1)],
    branches: [route('routeCatacomb', 'Catacombs', 'pinch', [
      ...peel(1, -6),
      ...L(tubeRun(260, -35, -7), 'catacombA'), ...helix(1.5, 36, 50, -10, 1, { tube: true }),
      ...L(run(140, -6), 'ossuary'), ...vertWall(-1),
      ...L(funnelBowl(1), 'well'),
      ...tubeRun(220, 30, -7), ...liftHill(80, -72, 0, { label: 'catacombDive' }),
    ], [...field('ossuary', 'colonnade', 4, 14, 30), ...field('ossuary', 'sliders', 3, 28, 30, 1.6)], [H('alongside', 0, 'THE CATACOMBS'), H('ossuary', 0, 'Ossuary'), H('well', 0, 'The well')])],
  };
}

// ---------------------------------------------------------------------------
// STEEL GRATING: wild-mouse switchback stack (Hilbert). Survive hairpins in rhythm.
// ---------------------------------------------------------------------------
function grating(): CourseLayout {
  const segs: Seg[] = [
    ...START(),
    ...L(tubeRun(200, 30, -6), 'rhythm'),
    ...L(hairpin(1, 230, 12, -6), 'hairpin1'), ...run(40, -6),
    ...L([{ len: 18, pitch: -28 }, { len: 14, pitch: -3 }, { len: 18, pitch: -28 }, { len: 18, pitch: -5 }], 'mouseDrops'),
    ...L([...hairpin(-1, 230), ...run(30, -7), ...hairpin(1, 230)], 'chain'),
    ...run(30, -7),
    ...L(helix(1, 26, 30, -12, -1, { tube: true }), 'stair'),
    ...L([...hairpin(1, 230, 14, -9), ...run(24, -12), ...hairpin(-1, 230, 14, -9), ...run(24, -12), ...hairpin(1, 230, 14, -9)], 'stack'),
    ...run(20, -8),
    ...L(jump(30, 11, 9), 'hatch'),
    ...L(run(160, -6, { fx: { flow: 2 } }), 'rattle'),
    ...hairpin(1, 230),
    // ACT II — CATWALKS: obstacle catwalk, the second stack, the double hatch
    ...liftHill(60, -55, 0, { label: 'mouseLift' }), ...L(run(150, -6), 'catwalk'),
    ...L(hairpin(-1, 230), 'chain2'),
    ...run(30, -7),
    ...L(terraces(4, 16, -28, 14), 'ladder'),
    ...run(30, -12), ...L(helix(1, 28, 30, -12, 1, { tube: true }), 'stair2'),
    ...L(jump(30, 11, 9), 'hatch2'), ...L(jump(30, 12, 9), 'hatch3'),
    ...L(pipeCorner(150, -120, -6), 'gantry'), ...L(vertWall(-1), 'bulkhead'),
    ...L(run(130, -6, { fx: { flow: 2 } }), 'rattle2'),
    ...FINISH(),
  ];
  return {
    id: 'grating', name: 'Hilbert Works', checkpointEvery: 200, segments: segs,
    obstacles: [...field('catwalk', 'zigzag', 6, 14, 22), ...field('rattle2', 'sliders', 4, 18, 26), { at: 'rattle', s: 50, x: -3.5, ls: 2, w: 5, h: 1.7 }, { at: 'rattle', s: 100, x: 3.5, ls: 2, w: 5, h: 1.7 }],
    hints: [firstHint, H('mouseLift', 0, 'Act II: the mouse lift'), H('catwalk', 0, 'Catwalks'), H('chain2', 0, 'Switchbacks'), H('ladder', 0, 'Ladder drops'), H('hatch2', -10, 'Double hatch: JUMP, JUMP'), H('gantry', 0, 'Gantry sweep'), H('bulkhead', 0, 'Bulkhead: ride it up'), H('rhythm', 0, 'Feel the rhythm'), H('hairpin1', -6, 'Hairpin! Ride the outer wall'), H('chain', 0, 'Switchback chain'),
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
    ...L(labyrinth(4, 22, 110, 22, -7), 'slalom'),
    ...run(20, -7),
    ...L(hops(6, 20, 4, -7), 'moguls'),
    ...L(run(90, -8, { tube: true, fx: { flow: -1.5 } }), 'drift'), ...run(20, -8),
    ...L([...sweeper(170, 55, -7), ...sweeper(170, -70, -7), ...sweeper(170, 55, -7)], 'kochCascade'),
    ...run(20, -7),
    ...L(helix(1, 36, 35, -10, 1, { tube: true }), 'peakHelix'),
    ...L([{ len: 80, pitch: -26, fx: { flow: -2 } }, { len: 20, pitch: 9, openSky: true, fx: { pulse: 1 } }, { len: 34, pitch: -24, gap: true, openSky: true }, { len: 60, pitch: -24, fx: { flow: -1 } }, { len: 40, pitch: -6 }], 'skiJump'),
    // ACT II — BACKCOUNTRY: tree slalom, the couloir, the pretzel, the small jump
    ...L([...rollers(5, 24, 6), ...berm(-1), ...run(70, -7), ...skimGap(12), ...run(40, -7), ...berm(1)], 'boardercross'), ...L(run(150, -7), 'trees'),
    ...L(labyrinth(4, 20, 100, 20, -8), 'slalom2'),
    ...L(tubeRun(220, 40, -9), 'couloir'),
    ...L(pretzel(34, 40, -9, { tube: true }), 'cornice'),
    ...L(hops(6, 22, 4, -7), 'moguls2'), ...liftHill(70, -60, 0, { label: 'chairlift' }),
    ...L(pipeCorner(160, -100, -8), 'traverse'), ...L(vertWall(1), 'halfpipe'),
    ...L([{ len: 60, pitch: -22, fx: { flow: -2 } }, { len: 18, pitch: 8, openSky: true, fx: { pulse: 1 } }, { len: 22, pitch: -20, gap: true, openSky: true }, { len: 50, pitch: -20, fx: { flow: -1 } }, { len: 30, pitch: -6 }], 'kicker'),
    ...FINISH(),
  ];
  return {
    id: 'snow', name: 'Koch Alpine', checkpointEvery: 220, segments: segs,
    obstacles: [...field('trees', 'posts', 6, 14, 22), { at: 'groomed', s: 50, x: -3.3, ls: 2, w: 5, h: 1.6 }],
    hints: [firstHint, H('boardercross', 0, 'Act II: boardercross. Pump the rollers'), H('trees', 0, 'Tree slalom'), H('couloir', 0, 'The couloir'), H('cornice', 0, 'Cornice pretzel'), H('halfpipe', 0, 'Half-pipe wall!'), H('kicker', 0, 'Kicker: JUMP, then MAGNET'), H('slalom', 0, 'Slalom: carve the long turns'), H('moguls', 0, 'Moguls'), H('kochCascade', 0, 'Giant slalom: ride the high line'),
      H('skiJump', 0, 'THE SKI JUMP: jump, then MAGNET to land')],
  };
}

const withSky = (f: () => CourseLayout) => (): CourseLayout => { const l = f(); return { ...l, branches: [...(l.branches ?? []), ...skyLines(l.id)] }; };
export const WORLD_LAYOUTS: Record<string, () => CourseLayout> = Object.fromEntries(
  Object.entries({ concrete, metal, ice, water, glass, rubber, sand, mud, stone, grating, snow }).map(([k, f]) => [k, withSky(f)]),
);
