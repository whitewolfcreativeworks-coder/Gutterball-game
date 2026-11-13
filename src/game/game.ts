import { ACESFilmicToneMapping, PCFSoftShadowMap, Scene, SRGBColorSpace, Vector3, WebGLRenderer, Group, Mesh, Material, Texture } from 'three';
import { Course, Track } from '../track/track';
import { MATERIALS, MaterialProfile } from '../physics/materials';
import { Run, RunPhase } from './run';
import { Autopilot } from './autopilot';
import { buildWorld, World } from '../render/world';
import { buildTrackGroup, updateMovingObstacles } from '../render/trackMesh';
import { Finale, FINALE_FOR_WORLD } from '../finale/finale';
import { PlungerLauncher, launchSpeed } from '../finale/launcher';
import { ProPilot } from './proPilot';
import { Ribbon, type LinePoint } from '../render/racingLine';
import { BallPhysics, DEFAULT_TUNING, INSANE_TUNING } from '../physics/ball';
import { TubeStreaks } from '../render/streaks';
import { TubeThemes } from '../render/tubeThemes';
import { Underwater } from '../render/underwater';
import { kelpTime } from '../render/world';
import { FogExp2, Color } from 'three';
import { FRACTAL_THEMES } from '../render/fractal';
import { BallView } from '../render/ballView';
import { GhostView } from '../render/ghostView';
import { GhostRecorder, ghostPos, type GhostRun } from './ghost';
import { ChaseCamera } from '../render/chaseCamera';
import { SpeedEffects } from '../render/speedFx';
import { RIB_SPACING } from '../render/trackMesh';
import { SensoryBus, SensoryEvent } from '../core/events';
import type { AudioEngine } from '../audio/audioEngine';
import type { HapticEngine } from '../haptics/haptics';
import type { InputManager } from '../input/input';
import type { CourseEntry } from '../commerce/catalog';
import type { BallInput } from '../physics/ball';

const FIXED_DT = typeof location !== 'undefined' && new URLSearchParams(location.search).has('fixed');

export type GameMode = 'play' | 'preview' | 'attract';

export interface Cosmetics { skin: string; beam: string; trail: boolean; }

export interface GameCallbacks {
  onHint?: (text: string) => void;
  onReplayDone?: () => void;
  onPhase?: (phase: RunPhase) => void;
  onHud?: (h: HudState) => void;
  onPreviewEnd?: () => void;
  /** The finish contraption has played out (score: Plinko points, 0 otherwise). */
  onFinaleDone?: (score: number, kind: string) => void;
}

export interface HudState {
  speedKmh: number; progress: number; time: number; magnetEnergy: number; magnetActive: boolean; pushCombo: number; turboArmed: boolean; turboActive: boolean;
  driveLevel: number; falls: number; phase: RunPhase; airborne: boolean; mode: GameMode;
}

/**
 * Orchestrates one loaded course: physics run, sensory bus, rendering,
 * audio and haptics. The bus is the only link between the simulation and the
 * output systems.
 */
export class Game {
  readonly renderer: WebGLRenderer;
  scene = new Scene();
  quality: 'low' | 'high';
  private world?: World;
  private trackGroup?: Group;
  private ballView?: BallView;
  readonly camera: ChaseCamera;
  private post: SpeedEffects;
  private lastRib = -1;
  private blur = 0;
  run?: Run;
  track?: Track;
  courseGeo?: Course;
  private branchGroups: Group[] = [];
  private streaks?: TubeStreaks;
  tubeThemes?: TubeThemes;
  underwater?: Underwater;
  private fogBase?: { color: Color; density: number };
  private fogDark = new Color(0x000000);
  private fogMix = 0;
  private hemiBase = -1;
  material?: MaterialProfile;
  course?: CourseEntry;
  mode: GameMode = 'attract';
  private autopilot?: Autopilot;
  private bus = new SensoryBus();
  private hintIndex = 0;
  private previewTimer = 0;
  private last = performance.now();
  private time = 0;
  paused = false;
  cb: GameCallbacks = {};
  finale?: Finale;
  private finaleReported = false;
  cosmetics: Cosmetics = { skin: 'steel', beam: 'cyan', trail: false };
  /** Player setting 0..1 for the animated fractal gutter glow. */
  fractalLevel = 0.6;
  /** Player setting 0..1 for speed blur, vignette and camera shake. */
  speedFx = 0.8;
  private frameTimes: number[] = [];
  fps = 60;
  // Adaptive resolution: keep frame pacing smooth on high-DPI tablets
  private dprCap = Math.min(devicePixelRatio, 2);
  private dpr = Math.min(devicePixelRatio, 1.6);
  private perfTimer = 0;

  constructor(private canvas: HTMLCanvasElement, private audio: AudioEngine, private haptics: HapticEngine, private input: InputManager) {
    const mobile = matchMedia('(pointer: coarse)').matches;
    this.quality = (new URLSearchParams(location.search).get('quality') as any) ?? (localStorage.getItem('gb.quality') as any) ?? 'high';
    this.renderer = new WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.88;
    this.renderer.shadowMap.enabled = this.quality === 'high';
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.camera = new ChaseCamera(innerWidth / innerHeight);
    this.post = new SpeedEffects(this.renderer, this.scene, this.camera.cam);
    this.resize();
    addEventListener('resize', () => this.resize());
    this.bus.subscribe((st, ev) => this.onSensory(st, ev));
    requestAnimationFrame(this.frame);
  }

  setQuality(q: 'low' | 'high') {
    this.quality = q;
    localStorage.setItem('gb.quality', q);
    this.renderer.shadowMap.enabled = q === 'high';
    this.dprCap = q === 'high' ? Math.min(devicePixelRatio, 2) : Math.min(devicePixelRatio, 1.25);
    this.dpr = Math.min(this.dpr, this.dprCap);
    this.renderer.setPixelRatio(this.dpr);
    if (this.course) this.load(this.course, this.mode);
  }

  resize() {
    // Size from the stage (it may be counter-rotated, swapping width and height)
    const st = this.canvas.parentElement;
    const w = st?.clientWidth || innerWidth, h = st?.clientHeight || innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.resize(w / h);
    this.post?.setSize(w, h);
  }

  private disposeScene() {
    this.scene.traverse((o) => {
      const m = o as Mesh;
      if (m.geometry) m.geometry.dispose();
      const mats = (Array.isArray(m.material) ? m.material : m.material ? [m.material] : []) as Material[];
      for (const mt of mats) {
        for (const v of Object.values(mt)) if (v instanceof Texture && !(v as any).__shared) { /* textures are cached/shared */ }
        mt.dispose();
      }
    });
    this.scene = new Scene();
  }

  load(course: CourseEntry, mode: GameMode) {
    this.finale = undefined;
    this.disposeScene();
    this.course = course;
    this.mode = mode;
    this.material = MATERIALS[course.materialId];
    this.courseGeo = new Course(course.layout());
    this.track = this.courseGeo.main;
    this.lastRib = -1;
    this.world = buildWorld(this.scene, this.renderer, this.courseGeo.all, this.material, this.quality);
    this.courseGeo.fitNets(this.world.groundHeight); // the safety net hangs above the ground
    this.hemiBase = -1;
    const cg = this.courseGeo;
    const carveFor = (idx: number) => cg.junctions.flatMap((j) =>
      j.a === idx ? [{ s0: j.aS[0], s1: j.aS[1], other: cg.all[j.b] }] : j.b === idx ? [{ s0: j.bS[0], s1: j.bS[1], other: cg.all[j.a] }] : []);
    this.trackGroup = buildTrackGroup(this.track, this.material, this.world.groundHeight, false, carveFor(0), cg.all, this.quality);
    this.scene.add(this.trackGroup);
    this.branchGroups = cg.branches.map((t, k) => { const g = buildTrackGroup(t, this.material!, this.world!.groundHeight, true, carveFor(k + 1), cg.all, this.quality); this.scene.add(g); return g; });
    this.post.setScene(this.scene, this.camera.cam);
    this.run = new Run(this.courseGeo, this.material);
    this.run.onPhase = (p) => {
      this.cb.onPhase?.(p);
      if (p === 'respawning') this.camera.shake = 0.3;
      if (p === 'running' && !this.noSnap) this.camera.snap();
      // across the line: hands off, the finish contraption takes over
      if (p === 'finished' && this.mode === 'play' && !this.replay) {
        this.lastRun = this.ghostRec.finish(course.id, this.run!.finishTime, this.run!.falls);
        this.startFinale();
      }
    };
    this.ballView = new BallView(this.run.ball.tune.radius);
    {
      // how bright this world's gutter reads: the surface tint (and fog for see-through worlds)
      const vis = this.material.visual, lum = (c: number) => { const k = new Color(c); return 0.3 * k.r + 0.59 * k.g + 0.11 * k.b; };
      this.ballView.setWorldBrightness(Math.max(lum(vis.tint), vis.transparent ? lum(vis.fog) : 0));
    }
    if (this.scene.fog instanceof FogExp2) { this.fogBase = { color: this.scene.fog.color.clone(), density: this.scene.fog.density }; }
    { const th = FRACTAL_THEMES[this.material.id] ?? FRACTAL_THEMES.wood; this.fogDark = new Color(th.b).multiplyScalar(0.035); }
    this.streaks = new TubeStreaks();
    { const th = FRACTAL_THEMES[this.material.id] ?? FRACTAL_THEMES.wood; this.streaks.setPalette(th.a, th.b, th.psy); }
    this.scene.add(this.streaks.mesh);
    this.tubeThemes = new TubeThemes(this.scene, this.courseGeo, course.id);
    // the Water world runs along the bottom of a psychedelic aquarium
    this.underwater = undefined;
    if (this.material.visual.underwater) {
      this.world.sky.mesh.visible = false;
      this.world.hemi.color.set(0x7fe8ff); this.world.hemi.groundColor.set(0x1a4a3a);
      this.underwater = new Underwater(this.scene, this.quality);
    }
    this.applyCosmetics();
    this.scene.add(this.ballView.group);
    this.ghostView = new GhostView(this.run.ball.tune.radius);
    this.scene.add(this.ghostView.group);
    this.scene.add(this.lineAhead.mesh, this.lineBehind.mesh);
    this.predBall = undefined; this.pred = null; this.predPts = []; this.trailPts = []; this.fallsSeen = 0; this.autoUsed = false;
    this.applyTuning();
    // compile every shader the course will use now, while loading, not the first time a
    // tube show, the net or a sky line comes into view (that was a visible hitch mid-ride)
    this.precompile();
    this.lineAhead.hide(); this.lineBehind.hide();
    if (this.lastRun?.course !== course.id) { this.lastRun = null; this.ghost = null; }
    this.replay = null;
    this.autopilot = mode !== 'play' ? new Autopilot(this.track) : undefined;
    this.hintIndex = 0; this.routeHint.clear();
    this.previewTimer = mode === 'preview' ? 18 : 0;
    this.audio.configure(this.material);
    this.haptics.configure(this.material);
    this.camera.snap();
    this.input.driveLevel = 1;
    if (mode !== 'play') {
      // Previews start part-way in so the world's signature feature appears quickly
      const startS = mode === 'preview' ? Math.min(this.track.length * 0.12, 220) : 6;
      this.run.launch();
      this.run.ball.placeAt(startS, 16);
    }
    this.paused = false;
    this.intro = null;
    if (mode === 'play') this.startIntro();
  }

  applyCosmetics() {
    if (!this.ballView) return;
    this.ballView.setSkin(this.cosmetics.skin);
    this.ballView.setBeamColor(this.cosmetics.beam);
    this.ballView.setTrail(this.cosmetics.trail);
  }

  /** Returns true if this call launched the ball. */
  launch(): boolean {
    if (this.mode !== 'play' || !this.run || this.run.phase !== 'ready' || this.paused) return false;
    if (this.intro) { this.intro.fire(); return true; } // the plunger
    this.input.calibrate();
    this.run.launch();
    this.ghostRec.reset();
    return true;
  }

  private startFinale() {
    if (!this.run || !this.track || !this.course || !this.material) return;
    this.endFinale();
    const th = FRACTAL_THEMES[this.material.id] ?? FRACTAL_THEMES.wood;
    // the finish machine waits at the end of whichever route you finished on
    const ft = this.run.ball.track.layout.finishLine ? this.run.ball.track : this.track;
    this.finale = new Finale(this.scene, ft, this.run.ball, FINALE_FOR_WORLD[this.course.id] ?? 'plinko', this.audio, { a: th.a, b: th.b });
    this.finaleReported = false;
  }
  private endFinale() { this.finale?.dispose(); this.finale = undefined; }
  /** Tap to skip the finish contraption. */
  skipFinale() { if (this.finale && !this.finaleReported) { this.finaleReported = true; this.cb.onFinaleDone?.(this.finale.score, this.finale.kind); } }

  restart(keepGhost = false) {
    if (!this.run || !this.track) return;
    this.endFinale();
    this.replay = null;
    this.ghostRec.reset();
    this.autoUsed = false; this.fallsSeen = 0; this.trailPts = []; this.predPts = []; this.pro = new ProPilot(); this.pro.pace = this.autoPace; this.pro.insane = this.insane;
    // run again: race the ghost of your last finished run
    if (!keepGhost && this.lastRun) this.ghost = this.lastRun;
    this.camera.cam.fov = 80; this.camera.cam.updateProjectionMatrix();
    this.run.reset();
    this.hintIndex = 0; this.routeHint.clear();
    this.camera.snap();
    this.input.driveLevel = 1;
    this.cb.onPhase?.('ready');
    this.showHints(0);
    this.startIntro();
  }

  private routeHint = new Map<number, number>();
  private showHints(s: number, route = 0) {
    if (!this.track || this.mode !== 'play') return;
    // each route has its own hints (the main course's, or an alternate route's)
    const tr = route === 0 ? this.track : this.courseGeo?.all[route];
    if (!tr) return;
    const hints = tr.hints;
    if (route !== 0) {
      let k = this.routeHint.get(route) ?? 0;
      while (k < hints.length && s >= hints[k].s) { this.cb.onHint?.(hints[k].text); k++; }
      this.routeHint.set(route, k);
      return;
    }
    while (this.hintIndex < hints.length && s >= hints[this.hintIndex].s) {
      this.cb.onHint?.(hints[this.hintIndex].text);
      this.hintIndex++;
    }
  }

  private onSensory(st: Parameters<Parameters<SensoryBus['subscribe']>[0]>[0], ev: SensoryEvent[]) {
    if (this.mode === 'attract') { this.audio.quiet(); return; }
    this.audio.update(st, ev, this.dtLast);
    if (this.mode === 'play') this.haptics.update(st, ev, this.dtLast);
    for (const e of ev) {
      if (e.type === 'MAGNETIC_CAPTURE') { this.ballView?.flashCapture(); this.camera.shake = Math.max(this.camera.shake, 0.55 * this.speedFx); this.camera.punch(9); }
      if (e.type === 'MAGNET_ENGAGED') { this.camera.shake = Math.max(this.camera.shake, 0.25 * this.speedFx); }
      if ((e.type === 'COLLISION_IMPACT' || e.type === 'AIRBORNE_END') && e.intensity > 0.3) { this.camera.shake = Math.max(this.camera.shake, e.intensity * 0.7 * this.speedFx); this.camera.punch(e.intensity * 6); }
      if (e.type === 'RECALL' && this.mode === 'play') this.cb.onHint?.('TRACTOR BEAM: back on the track');
      if (e.type === 'JUMP') this.camera.punch(4);
      if (e.type === 'DOUBLE_JUMP') this.camera.punch(8);
      if (e.type === 'TURBO_ARMED') { this.camera.punch(6); if (this.mode === 'play') this.cb.onHint?.('TURBO READY — FLICK!'); }
      if (e.type === 'TRIGGER_PAD') { this.camera.punch(3); if (this.mode === 'play') this.cb.onHint?.('HOLOGRAMS! ROLL THROUGH THEM FOR A BOOST'); }
      if (e.type === 'HOLO_BOOST') { this.camera.punch(10); this.camera.shake = Math.max(this.camera.shake, 0.3 * this.speedFx); }
      if (e.type === 'TURBO_START') { this.camera.punch(16); this.camera.shake = Math.max(this.camera.shake, 0.6 * this.speedFx); }
    }
  }
  private dtLast = 1 / 60;
  // ---- ghost runs ----
  private ghostRec = new GhostRecorder();
  /** Your last finished run on this course (raced as the ghost when you run again). */
  lastRun: GhostRun | null = null;
  /** The ghost you're racing (the last run, or a saved one). */
  ghost: GhostRun | null = null;
  ghostOn = true;
  /** A saved run being watched. */
  replay: GhostRun | null = null;
  private replayT = 0;
  private ghostView?: GhostView;
  private ghostP = new Vector3();
  /** Race a saved run as the ghost. */
  raceGhost(g: GhostRun) { this.ghost = g; this.ghostOn = true; this.restart(true); }
  /** Watch a saved run play back. */
  watch(g: GhostRun) {
    this.restart(true);
    this.endIntro();
    this.replay = g; this.replayT = 0;
    this.run?.launch();
  }
  stopReplay() { this.replay = null; }

  // ---- AUTO BALL ----
  /** A pro takes over after launch and shows the line: flip on or off at any time. */
  auto = false;
  /** Did Auto Ball drive any of this run? (Then it doesn't count as your best.) */
  autoUsed = false;
  private pro = new ProPilot();
  private predBall?: BallPhysics;
  private predPts: LinePoint[] = [];
  private predTimer = 0;
  private trailPts: LinePoint[] = [];
  private trailTimer = 0;
  private lineAhead = new Ribbon(140, 0.32);
  private lineBehind = new Ribbon(100, 0.22);
  private fallsSeen = 0;
  /** What the pro is doing right now (for the HUD). */
  get autoTrick() { return this.auto ? this.pro.trick : ''; }
  /** Auto Ball pace: 0 = chill (study the line) .. 1 = rip. */
  autoPace = (() => { try { const v = Number(localStorage.getItem('gb.autoPace')); return Number.isFinite(v) && localStorage.getItem('gb.autoPace') !== null ? v : 0.6; } catch { return 0.6; } })();
  setAutoPace(v: number) {
    this.autoPace = Math.max(0, Math.min(1, v));
    this.pro.pace = this.autoPace;
    try { localStorage.setItem('gb.autoPace', String(this.autoPace)); } catch { /* private mode */ }
  }
  /** INSANE: Auto Ball with the physics turned loose (never a counted run). */
  insane = false;
  /** 1 = real time; dips during insane-speed flips (slow-mo). */
  timeScale = 1;
  private uwLook = new Vector3();
  private fxFlowK = 0; private fxTwist = 0; private fxPush = 0;
  setInsane(on: boolean) {
    this.insane = on;
    if (on && !this.auto) this.setAuto(true);
    this.pro.insane = on;
    this.applyTuning();
  }
  /** The ball runs INSANE_TUNING only while INSANE Auto Ball is on; normal physics otherwise. */
  private applyTuning() {
    if (!this.run) return;
    const t = this.run.ball.tune as unknown as Record<string, unknown>;
    const src = { ...DEFAULT_TUNING, ...(this.insane && this.auto ? INSANE_TUNING : {}) } as unknown as Record<string, unknown>;
    for (const k of Object.keys(src)) { const v = src[k]; t[k] = Array.isArray(v) ? [...v] : v; }
    this.predBall = undefined; this.pred = null; // the look-ahead copies the new physics
  }
  setAuto(on: boolean) {
    this.auto = on;
    if (!on && this.insane) { this.insane = false; }
    this.pro = new ProPilot();
    this.pro.pace = this.autoPace;
    this.pro.insane = this.insane;
    this.applyTuning();
    this.predPts = []; this.trailPts = []; this.predTimer = 0;
    if (!on) { this.lineAhead.hide(); this.lineBehind.hide(); }
  }
  /**
   * Look ahead: copy the ball, let the pro drive the copy for ~1.8 s, and
   * keep the path. The copy never changes the course (no pads lit, no boosts
   * used), and the obstacle clock is put back afterwards.
   */
  private precompile() {
    try {
      const hidden: { visible: boolean }[] = [];
      this.scene.traverse((o) => { if (!o.visible) { hidden.push(o); o.visible = true; } });
      this.renderer.compile(this.scene, this.camera.cam);
      for (const o of hidden) o.visible = false;
    } catch { /* (headless: nothing to compile) */ }
  }

  /**
   * The racing line ahead: a look-ahead ball driven by a copy of the pro. It's
   * worked out a slice per frame (never all at once, which made a hitch every
   * quarter second), on its own copy of the obstacle clock.
   */
  private pred: { pilot: ProPilot; k: number; pts: LinePoint[]; t0: number[]; el: number } | null = null;
  private predictLine() {
    if (!this.run || !this.courseGeo || !this.material) return;
    const ball = this.run.ball;
    if (!this.predBall) this.predBall = new BallPhysics(this.courseGeo, this.material, ball.tune);
    const pb = this.predBall;
    pb.copyStateFrom(ball);
    pb.predict = true;
    this.pred = { pilot: this.pro.clone(), k: 0, pts: [], t0: this.courseGeo.all.map((t) => t.time), el: 0 };
  }
  private advancePrediction(maxSteps: number) {
    const st = this.pred, pb = this.predBall;
    if (!st || !pb || !this.courseGeo) return;
    const all = this.courseGeo.all;
    const saved = all.map((t) => t.time);
    all.forEach((t, i) => { t.time = st.t0[i] + st.el; });
    const dt = this.insane ? 1 / 120 : 1 / 75;
    const steps = this.insane ? 170 : 135;
    let n = 0, done = false;
    while (n < maxSteps && st.k < steps) {
      const inp = st.pilot.decide(pb, dt);
      pb.step(dt, inp);
      pb.events.length = 0;
      st.el += dt;
      if (!Number.isFinite(pb.p.x)) { done = true; break; }
      if (st.k % (this.insane ? 3 : 2) === 0) st.pts.push({ p: pb.p.clone(), speed: pb.v.length(), air: pb.airborne });
      st.k++; n++;
    }
    all.forEach((t, i) => { t.time = saved[i]; });
    if (done || st.k >= steps) { this.predPts = st.pts; this.pred = null; }
  }
  private updateAutoVisuals(dt: number) {
    if (!this.run) return;
    const b = this.run.ball;
    const live = this.auto && this.run.phase === 'running' && !this.finale && !this.intro && !this.replay;
    if (!live) { this.lineAhead.hide(); this.lineBehind.hide(); return; }
    this.predTimer -= dt;
    if (this.predTimer <= 0 && !this.pred) { this.predTimer = 0.22; this.predictLine(); }
    this.advancePrediction(this.insane ? 45 : 35);
    // start the line at the point nearest the ball now (the look-ahead is a moment old)
    let start = 0, bd = Infinity;
    for (let i = 0; i < Math.min(30, this.predPts.length); i++) { const d = this.predPts[i].p.distanceToSquared(b.p); if (d < bd) { bd = d; start = i; } }
    this.lineAhead.set(this.predPts, start, 'ahead');
    this.trailTimer -= dt;
    if (this.trailTimer <= 0) {
      this.trailTimer = 1 / 30;
      this.trailPts.push({ p: b.p.clone(), speed: b.v.length(), air: b.airborne });
      if (this.trailPts.length > 100) this.trailPts.shift();
    }
    // (a respawn jump breaks the trail)
    const last = this.trailPts[this.trailPts.length - 2];
    if (last && last.p.distanceTo(b.p) > 20) this.trailPts = this.trailPts.slice(-1);
    this.lineBehind.set(this.trailPts, 0, 'behind', 0.8);
  }
  // ---- the plunger ----
  /** The pinball-style launcher every race starts with (null once you're away, or when it's off). */
  intro: PlungerLauncher | null = null;
  private noSnap = false;
  introEnabled = true;
  private startIntro() {
    this.endIntro();
    if (!this.introEnabled || this.mode !== 'play' || !this.run || !this.courseGeo || !this.material) return;
    const th = FRACTAL_THEMES[this.material.id] ?? FRACTAL_THEMES.wood;
    this.intro = new PlungerLauncher(this.scene, this.courseGeo, this.run.ball, this.audio, this.haptics, th.a);
  }
  private endIntro() { this.intro?.dispose(); this.intro = null; }
  /** The plunger fired (or it was skipped): away down the gutter, and the race begins. */
  skipIntro() {
    if (!this.intro || !this.run) return;
    const it = this.intro;
    const power = it.done ? it.power : 0.7;
    const fromPlunger = it.done;
    this.endIntro();
    this.run.reset();
    this.input.calibrate();
    this.noSnap = fromPlunger;
    this.run.launch();
    this.noSnap = false;
    const b = this.run.ball;
    b.v.addScaledVector(b.proj.T, launchSpeed(power) - 7); // (launch() already gave it 7 m/s)
    b.w.copy(b.n).cross(b.v).multiplyScalar(1 / b.tune.radius);
    // the chase camera carries on from the plunger's view instead of jumping
    if (fromPlunger) this.camera.adopt(this.camera.cam.position, it.camLook, b.v); else this.camera.snap();
    this.ghostRec.reset();
  }
  private static padHintShown = false;

  private frame = (now: number) => {
    requestAnimationFrame(this.frame);
    // ?fixed=1 makes every frame exactly 1/60 s (deterministic captures on slow software GPUs)
    let dt = FIXED_DT ? 1 / 60 : Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    this.dtLast = dt;
    this.frameTimes.push(dt);
    if (this.frameTimes.length > 60) { this.frameTimes.shift(); this.fps = 1 / (this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length); }
    if (!FIXED_DT) {
      this.perfTimer += dt;
      if (this.perfTimer > 2) {
        this.perfTimer = 0;
        const next = this.fps < 50 ? Math.max(1, this.dpr - 0.2) : this.fps > 58.5 ? Math.min(this.dprCap, this.dpr + 0.1) : this.dpr;
        if (Math.abs(next - this.dpr) > 0.01) { this.dpr = next; this.renderer.setPixelRatio(this.dpr); this.resize(); }
      }
    }
    if (!this.run || !this.track || !this.ballView) return;
    // SLOW-MO FLIPS: at insane speed going over the top of a loop or a roll, time
    // stretches for a moment (like a backflip in slow motion), so the world
    // turns round you at a speed you can take in. The whole world slows
    // together: the ball, the clock, the camera.
    {
      const b0 = this.run.ball, tr0 = b0.track;
      const sp0 = b0.v.length();
      let flip = false;
      if (sp0 > 75 && this.mode === 'play' && !this.replay) for (let d = -5; d <= 25 && !flip; d += 5) if (tr0.isSteepOrInverted(b0.proj.s + d) && tr0.U[tr0.idx(b0.proj.s + d) * 3 + 1] < 0.2) flip = true;
      const want = flip ? Math.max(0.55, 1 - (sp0 - 75) / 120) : 1;
      this.timeScale += (want - this.timeScale) * Math.min(1, dt * (want < this.timeScale ? 6 : 2.5));
    }
    dt *= this.timeScale;
    this.time += dt;
    let input: BallInput;
    if (this.mode === 'play') {
      input = this.input.sample(dt);
      // AUTO BALL: once the ball is away, the pro drives
      if (this.auto && this.run.phase === 'running' && !this.intro && !this.replay && !this.paused) {
        input = this.pro.decide(this.run.ball, dt);
        this.autoUsed = true;
      }
    }
    else input = this.autopilot!.decide(this.run.ball);
    if (this.intro) {
      if (!this.paused) this.intro.update(dt);
      if (this.intro.done) this.skipIntro();
    } else if (this.finale) {
      if (!this.paused) this.finale.update(dt);
      if (this.finale.done && !this.finaleReported) { this.finaleReported = true; this.cb.onFinaleDone?.(this.finale.score, this.finale.kind); }
    } else if (!this.paused && this.replay) {
      // watching a saved run: the recording drives the ball
      this.replayT += dt;
      this.run.time = this.replayT;
      ghostPos(this.replay, this.replayT, this.ghostP);
      this.run.ball.followGhost(this.ghostP, dt);
      if (this.replayT > this.replay.time + 1) { this.replay = null; this.cb.onReplayDone?.(); }
    } else if (!this.paused) {
      this.run.update(dt, input);
      if (this.mode === 'play' && (this.run.phase === 'running' || this.run.phase === 'respawning')) this.ghostRec.sample(this.run.time, this.run.ball.p);
      if (this.mode !== 'play' && this.run.phase === 'finished') {
        this.run.reset(); this.run.launch(); this.run.ball.placeAt(6, 12);
      }
      if (this.mode !== 'play' && this.run.phase === 'ready') { this.run.launch(); }
    }
    const b = this.run.ball;
    {
      const g = this.ghost;
      const t = this.run.phase === 'ready' ? 0 : this.run.time;
      const show = g && this.ghostOn && this.mode === 'play' && !this.replay && !this.finale && !this.intro && t < g.time + 1.5;
      this.ghostView?.update(show ? ghostPos(g!, t, this.ghostP) : null, this.time, this.camera.cam.position);
    }
    const events = this.run.pendingEvents.splice(0);
    if (!this.paused && !this.finale) this.bus.publish(b.snapshot(), events);
    if (this.finale) this.audio.quiet();
    if (b.boosting && !this.paused) this.camera.punch(7 * this.speedFx); // booster widens the view
    else this.audio.quiet();
    this.showHints(b.activeIndex === 0 ? b.mainProj.s : b.proj.s, b.activeIndex);
    // the first trigger pad of the session gets a pointer
    if (this.mode === 'play' && !Game.padHintShown) {
      const tr = b.track;
      for (let k = 0; k < tr.pads.length; k++) {
        const ahead = tr.pads[k].s - b.proj.s;
        if (ahead > 20 && ahead < 75 && !tr.padHit[k]) {
          Game.padHintShown = true;
          this.cb.onHint?.(tr.pads[k].side > 0 ? 'CLIMB THE RIGHT WALL ▶ HIT THE GLOWING PAD' : '◀ CLIMB THE LEFT WALL — HIT THE GLOWING PAD');
          break;
        }
      }
    }
    this.ballView.update(b, dt, this.time);
    if (this.trackGroup) updateMovingObstacles(this.trackGroup, this.track);
    this.branchGroups.forEach((g, k) => updateMovingObstacles(g, this.courseGeo!.branches[k]));
    const fx = this.trackGroup?.userData.fx;
    if (fx) {
      fx.uFxTime.value = this.time;
      fx.uFxTravel.value += b.v.length() * dt;
      {
        // the pattern's motion where the ball is now, eased in time (see FractalUniforms)
        const tr = b.track, i = tr.idx(b.proj.s), tube = tr.tubeAt(b.proj.s);
        const flowK = tr.fxMode[i * 3] - (0.7 + 0.9 * tube);
        const twist = tr.fxMode[i * 3 + 2] + tube * 1.2 * Math.sin(this.time * 0.23);
        const k = Math.min(1, dt * 1.5);
        this.fxFlowK += (flowK - this.fxFlowK) * k; this.fxTwist += (twist - this.fxTwist) * k; this.fxPush += (tr.fxMode[i * 3 + 1] - this.fxPush) * k;
        fx.uFxPhase.value += b.v.length() * dt * this.fxFlowK;
        fx.uFxTwistPh.value += dt * this.fxTwist;
        // keep the numbers small (shader precision on phones); a wrap far ahead is never seen as a jump
        if (Math.abs(fx.uFxPhase.value) > 4096) fx.uFxPhase.value %= 4096;
        if (Math.abs(fx.uFxTwistPh.value) > 4096) fx.uFxTwistPh.value %= 4096;
        fx.uFxNow.value[0] = this.fxTwist; fx.uFxNow.value[1] = this.fxPush;
      }
      fx.uFxBallDark.value = this.ballView.darkness;
      fx.uFxIntensity.value = this.fractalLevel * (this.trackGroup!.userData.fxStrength ?? 0.6) * (b.turboTime > 0 ? 1.3 : 1);
      fx.uFxSpeed.value += (Math.min(1, b.v.length() / 30) - fx.uFxSpeed.value) * Math.min(1, dt * 3);
      for (const bg of this.branchGroups) {
        const f2 = bg.userData.fx;
        if (f2) { f2.uFxTime.value = fx.uFxTime.value; f2.uFxIntensity.value = fx.uFxIntensity.value; f2.uFxSpeed.value = fx.uFxSpeed.value; f2.uFxTravel.value = fx.uFxTravel.value; f2.uFxBallDark.value = fx.uFxBallDark.value; f2.uFxPhase.value = fx.uFxPhase.value; f2.uFxTwistPh.value = fx.uFxTwistPh.value; f2.uFxNow.value = fx.uFxNow.value; }
      }
    }
    this.camera.fx = this.speedFx;
    if (this.intro) this.intro.applyCamera(this.camera.cam);
    else if (this.finale) this.finale.applyCamera(this.camera.cam);
    else this.camera.update(b, b.track, dt);
    if (this.run.falls !== this.fallsSeen) { if (this.run.falls > this.fallsSeen && this.auto) this.pro.crashed(b); this.fallsSeen = this.run.falls; }
    this.camera.autoTarget = this.auto && this.run.phase === 'running' && !this.replay ? 1 : 0;
    this.updateAutoVisuals(this.paused ? 0 : dt);
    this.streaks?.update(b.track, b.proj.s, b.v.length(), dt, this.time, 0.5 + 0.5 * this.speedFx);
    if (!this.intro && !this.finale) this.tubeThemes?.update(b, this.paused ? 0 : dt, this.time, this.mode === 'play' && !this.paused ? (k) => this.audio.themeSound(k) : undefined, this.camera.cam);
    // depth: inside a tube the far end falls away into darkness (fog to near-black in the world's colour)
    if (this.fogBase && this.scene.fog instanceof FogExp2) {
      const tkF = Math.max(b.track.tubeAt(b.proj.s), b.track.tubeAt(b.proj.s + 10));
      this.fogMix += (tkF - this.fogMix) * Math.min(1, dt * 3);
      this.scene.fog.color.copy(this.fogBase.color).lerp(this.fogDark, this.fogMix);
      this.scene.fog.density = this.fogBase.density + (0.011 - this.fogBase.density) * this.fogMix * (this.fogBase.density < 0.011 ? 1 : 0);
    }
    // ribs overhead: whoosh as each one passes
    const rib = Math.floor(b.proj.s / RIB_SPACING);
    if (rib !== this.lastRib) {
      if (this.lastRib >= 0 && this.mode !== 'attract' && !this.paused && !b.track.isTunnel(b.proj.s)) this.audio.whoosh(Math.min(1, b.v.length() / 30));
      this.lastRib = rib;
    }
    // Shadow camera follows the ball
    if (this.world) {
      const sun = this.world.sun;
      sun.target.position.copy(b.p);
      sun.position.copy(b.p).addScaledVector(this.world.sunDir, 90);
      // sky dome follows the camera; storms flash the whole scene
      const flash = this.world.sky.update(dt, performance.now() / 1000, this.camera.cam.position);
      if (this.underwater) {
        this.camera.cam.getWorldDirection(this.uwLook);
        this.underwater.update(this.camera.cam.position, this.uwLook, this.time, dt);
        kelpTime.value = this.time;
      }
      if (this.hemiBase < 0) this.hemiBase = this.world.hemi.intensity;
      this.world.hemi.intensity = this.hemiBase * (1 + flash * 2.2);
    }
    const spd = b.v.length();
    this.blur += (Math.max(0, Math.min(1, (spd - 12) / 22)) - this.blur) * Math.min(1, dt * 3);
    if (this.quality === 'high' && this.speedFx > 0.01) {
      this.post.render(this.blur * this.speedFx, (0.18 + 0.32 * this.blur) * this.speedFx, b.magnetActive ? 1 : 0);
    } else {
      this.renderer.render(this.scene, this.camera.cam);
    }
    if (this.mode === 'preview' && !this.paused) {
      this.previewTimer -= dt;
      if (this.previewTimer <= 0) { this.previewTimer = 1e9; this.cb.onPreviewEnd?.(); }
    }
    this.cb.onHud?.({
      speedKmh: b.v.length() * 3.6, progress: this.run.progress, time: this.run.time, magnetEnergy: b.magnetEnergy,
      magnetActive: b.magnetActive, pushCombo: b.pushCombo, turboArmed: b.turboArmed, turboActive: b.turboTime > 0, driveLevel: this.mode === 'play' ? this.input.driveLevel : input.driveLevel, falls: this.run.falls,
      phase: this.run.phase, airborne: b.airborne, mode: this.mode,
    });
    void Vector3;
  };
}
