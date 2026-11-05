import { ACESFilmicToneMapping, PCFSoftShadowMap, Scene, SRGBColorSpace, Vector3, WebGLRenderer, Group, Mesh, Material, Texture } from 'three';
import { Course, Track } from '../track/track';
import { MATERIALS, MaterialProfile } from '../physics/materials';
import { Run, RunPhase } from './run';
import { Autopilot } from './autopilot';
import { buildWorld, World } from '../render/world';
import { buildTrackGroup, updateMovingObstacles } from '../render/trackMesh';
import { Finale, FINALE_FOR_WORLD } from '../finale/finale';
import { TubeStreaks } from '../render/streaks';
import { FogExp2, Color } from 'three';
import { FRACTAL_THEMES } from '../render/fractal';
import { BallView } from '../render/ballView';
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
    this.hemiBase = -1;
    const cg = this.courseGeo;
    const carveFor = (idx: number) => cg.junctions.flatMap((j) =>
      j.a === idx ? [{ s0: j.aS[0], s1: j.aS[1], other: cg.all[j.b] }] : j.b === idx ? [{ s0: j.bS[0], s1: j.bS[1], other: cg.all[j.a] }] : []);
    this.trackGroup = buildTrackGroup(this.track, this.material, this.world.groundHeight, false, carveFor(0), cg.all);
    this.scene.add(this.trackGroup);
    this.branchGroups = cg.branches.map((t, k) => { const g = buildTrackGroup(t, this.material!, this.world!.groundHeight, true, carveFor(k + 1), cg.all); this.scene.add(g); return g; });
    this.post.setScene(this.scene, this.camera.cam);
    this.run = new Run(this.courseGeo, this.material);
    this.run.onPhase = (p) => {
      this.cb.onPhase?.(p);
      if (p === 'respawning') this.camera.shake = 0.3;
      if (p === 'running') this.camera.snap();
      // across the line: hands off, the finish contraption takes over
      if (p === 'finished' && this.mode === 'play') this.startFinale();
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
    this.applyCosmetics();
    this.scene.add(this.ballView.group);
    this.autopilot = mode !== 'play' ? new Autopilot(this.track) : undefined;
    this.hintIndex = 0;
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
    this.input.calibrate();
    this.run.launch();
    return true;
  }

  private startFinale() {
    if (!this.run || !this.track || !this.course || !this.material) return;
    this.endFinale();
    const th = FRACTAL_THEMES[this.material.id] ?? FRACTAL_THEMES.wood;
    this.finale = new Finale(this.scene, this.track, this.run.ball, FINALE_FOR_WORLD[this.course.id] ?? 'plinko', this.audio, { a: th.a, b: th.b });
    this.finaleReported = false;
  }
  private endFinale() { this.finale?.dispose(); this.finale = undefined; }
  /** Tap to skip the finish contraption. */
  skipFinale() { if (this.finale && !this.finaleReported) { this.finaleReported = true; this.cb.onFinaleDone?.(this.finale.score, this.finale.kind); } }

  restart() {
    if (!this.run || !this.track) return;
    this.endFinale();
    this.camera.cam.fov = 80; this.camera.cam.updateProjectionMatrix();
    this.run.reset();
    this.hintIndex = 0;
    this.camera.snap();
    this.input.driveLevel = 1;
    this.cb.onPhase?.('ready');
    this.showHints(0);
  }

  private showHints(s: number) {
    if (!this.track || this.mode !== 'play') return;
    const hints = this.track.hints;
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
      if (e.type === 'JUMP') this.camera.punch(4);
      if (e.type === 'DOUBLE_JUMP') this.camera.punch(8);
      if (e.type === 'TURBO_ARMED') { this.camera.punch(6); if (this.mode === 'play') this.cb.onHint?.('TURBO READY — FLICK!'); }
      if (e.type === 'TURBO_START') { this.camera.punch(16); this.camera.shake = Math.max(this.camera.shake, 0.6 * this.speedFx); }
    }
  }
  private dtLast = 1 / 60;

  private frame = (now: number) => {
    requestAnimationFrame(this.frame);
    // ?fixed=1 makes every frame exactly 1/60 s (deterministic captures on slow software GPUs)
    const dt = FIXED_DT ? 1 / 60 : Math.min(0.05, (now - this.last) / 1000);
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
    this.time += dt;
    let input: BallInput;
    if (this.mode === 'play') input = this.input.sample(dt);
    else input = this.autopilot!.decide(this.run.ball);
    if (this.finale) {
      if (!this.paused) this.finale.update(dt);
      if (this.finale.done && !this.finaleReported) { this.finaleReported = true; this.cb.onFinaleDone?.(this.finale.score, this.finale.kind); }
    } else if (!this.paused) {
      this.run.update(dt, input);
      if (this.mode !== 'play' && this.run.phase === 'finished') {
        this.run.reset(); this.run.launch(); this.run.ball.placeAt(6, 12);
      }
      if (this.mode !== 'play' && this.run.phase === 'ready') { this.run.launch(); }
    }
    const b = this.run.ball;
    const events = this.run.pendingEvents.splice(0);
    if (!this.paused && !this.finale) this.bus.publish(b.snapshot(), events);
    if (this.finale) this.audio.quiet();
    if (b.boosting && !this.paused) this.camera.punch(7 * this.speedFx); // booster widens the view
    else this.audio.quiet();
    if (b.activeIndex === 0) this.showHints(b.mainProj.s);
    this.ballView.update(b, dt, this.time);
    if (this.trackGroup) updateMovingObstacles(this.trackGroup, this.track);
    this.branchGroups.forEach((g, k) => updateMovingObstacles(g, this.courseGeo!.branches[k]));
    const fx = this.trackGroup?.userData.fx;
    if (fx) {
      fx.uFxTime.value = this.time;
      fx.uFxTravel.value += b.v.length() * dt;
      fx.uFxBallDark.value = this.ballView.darkness;
      fx.uFxIntensity.value = this.fractalLevel * (this.trackGroup!.userData.fxStrength ?? 0.6) * (b.turboTime > 0 ? 1.3 : 1);
      fx.uFxSpeed.value += (Math.min(1, b.v.length() / 30) - fx.uFxSpeed.value) * Math.min(1, dt * 3);
      for (const bg of this.branchGroups) {
        const f2 = bg.userData.fx;
        if (f2) { f2.uFxTime.value = fx.uFxTime.value; f2.uFxIntensity.value = fx.uFxIntensity.value; f2.uFxSpeed.value = fx.uFxSpeed.value; f2.uFxTravel.value = fx.uFxTravel.value; f2.uFxBallDark.value = fx.uFxBallDark.value; }
      }
    }
    this.camera.fx = this.speedFx;
    if (this.finale) this.finale.applyCamera(this.camera.cam);
    else this.camera.update(b, b.track, dt);
    this.streaks?.update(b.track, b.proj.s, b.v.length(), dt, this.time, 0.5 + 0.5 * this.speedFx);
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
