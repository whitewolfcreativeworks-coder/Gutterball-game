import { BallInput, BallPhysics, BallTuning } from '../physics/ball';
import type { MaterialProfile } from '../physics/materials';
import { Course, Track, NET } from '../track/track';
import type { SensoryEvent } from '../core/events';

export type RunPhase = 'ready' | 'running' | 'finished' | 'respawning';

/**
 * THE RECALL: flying off the course isn't a way to play. Out of the gutter in
 * the air for more than `after` seconds (or dropped clear of it, or flown
 * far ahead of where you left it), the tractor beam hauls the ball back in,
 * `ahead` metres past where it left, at `keep` of the speed it had there.
 * Designed jumps (gaps, kickers, flying into a sky line) land well inside that.
 */
export const RECALL = { after: 2.5, keep: 0.75, ahead: 20, shortcut: 120 };

/**
 * A single run on a course: owns the physics, fixed-step accumulator,
 * checkpoints, failure detection and completion. Rendering-agnostic so it
 * can be driven headlessly by tests and the preview bot.
 */
export class Run {
  readonly ball: BallPhysics;
  phase: RunPhase = 'ready';
  time = 0;              // run clock (starts at launch)
  falls = 0;
  checkpointIndex = 0;
  respawnTimer = 0;
  stuckTimer = 0;
  outsideTimer = 0;
  underTimer = 0;
  /** Seconds the ball has been out of every gutter's channel. */
  offTimer = 0;
  /** The last place the ball was safely in a gutter (for the quick reset). */
  private lastGood = { track: 0, s: 0, v: 0 };
  finishTime = 0;
  readonly fixedDt = 1 / 240;
  private acc = 0;
  pendingEvents: SensoryEvent[] = [];
  onPhase?: (p: RunPhase) => void;

  readonly track: Track;   // the main course (checkpoints, finish)
  readonly course: Course;
  constructor(course: Course | Track, material: MaterialProfile, tuning: Partial<BallTuning> = {}) {
    this.course = course instanceof Course ? course : ({ main: course, branches: [], all: [course] } as unknown as Course);
    this.track = this.course.main;
    this.ball = new BallPhysics(this.course, material, tuning);
    this.reset();
  }

  reset() {
    this.phase = 'ready';
    this.time = 0;
    this.falls = 0;
    this.checkpointIndex = 0;
    for (const tr of this.course.all) tr.resetHolograms();
    this.ball.placeAt(this.track.checkpoints[0], 0);
    this.lastGood = { track: 0, s: this.track.checkpoints[0], v: 0 };
  }

  launch() {
    if (this.phase !== 'ready') return;
    const T = this.track;
    const b = this.ball;
    b.v.addScaledVector(b.proj.T, 7);
    b.w.copy(b.n).cross(b.v).multiplyScalar(1 / b.tune.radius);
    void T;
    this.setPhase('running');
  }

  private setPhase(p: RunPhase) {
    this.phase = p;
    this.onPhase?.(p);
  }

  /** Advance by a frame time; runs whole fixed steps. Returns number of steps. */
  update(frameDt: number, input: BallInput): number {
    const dt = Math.min(frameDt, 0.1);
    let steps = 0;
    if (this.phase === 'ready') return 0;
    if (this.phase === 'respawning') {
      this.respawnTimer -= dt;
      if (this.respawnTimer <= 0) {
        // QUICK RESET: back in the middle of the gutter where you left it, at
        // the speed you had (never into a gap, a loop or an inverted section)
        const g = this.lastGood;
        const tr = this.course.all[g.track] ?? this.track;
        let s = Math.max(4, Math.min(tr.length - 70, g.s));
        let guard = 0;
        while (guard++ < 200 && s < tr.length - 70 && (tr.isGap(s) || tr.isGap(s + 8) || tr.isSteepOrInverted(s))) s += 3;
        if (tr.isGap(s) || tr.isSteepOrInverted(s)) { s = this.track.checkpoints[this.checkpointIndex]; this.ball.placeAt(s, 22, 0, 0); }
        else this.ball.placeAt(s, Math.max(22, Math.min(60, g.v)), 0, g.track);
        this.outsideTimer = 0; this.underTimer = 0; this.stuckTimer = 0;
        this.setPhase('running');
      }
      return 0;
    }
    this.acc += dt;
    const jumpEdge = input.jump;
    while (this.acc >= this.fixedDt) {
      this.acc -= this.fixedDt;
      const inp = steps === 0 ? input : { ...input, jump: false, push: 0 };
      this.ball.step(this.fixedDt, inp);
      steps++;
      if (this.phase === 'running') this.time += this.fixedDt;
      this.rules();
      if ((this.phase as RunPhase) === 'respawning') break;
    }
    void jumpEdge;
    if (this.ball.events.length) {
      this.pendingEvents.push(...this.ball.events);
      this.ball.events.length = 0;
    }
    return steps;
  }

  private rules() {
    const b = this.ball;
    const pr = b.proj;          // the gutter the ball is on now
    const mp = b.mainProj;      // progress along the main course
    const onMain = b.activeIndex === 0;
    const tr = this.track;
    // checkpoints (main course only)
    while (onMain && this.checkpointIndex + 1 < tr.checkpoints.length && mp.s > tr.checkpoints[this.checkpointIndex + 1] + 3) this.checkpointIndex++;
    if (b.recalling) return;   // the beam has it: nothing can fail, nothing can finish
    // finish
    const finishS = tr.length - 62;
    // the finish line of whichever route you're on (the main course or an alternate route)
    const ft = b.track;
    const onRoute = onMain || !!ft.layout.finishLine;
    if (this.phase === 'running' && ((onMain && mp.s > finishS) || (!onMain && onRoute && pr.s > ft.length - 62))) {
      this.finishRoute = b.activeIndex;
      this.finishTime = this.time;
      this.setPhase('finished');
    }
    if (this.phase === 'finished') {
      // gentle braking in the run-out (gameplay, not physics fiction)
      b.v.multiplyScalar(1 - 0.6 * this.fixedDt);
      b.w.multiplyScalar(1 - 0.6 * this.fixedDt);
      return;
    }
    // remember the last place we were safely rolling in a gutter
    if (b.contact && Number.isFinite(b.v.x) && Math.abs(pr.along) < 3 && b.track.channelDepthLocal(pr.s, pr.x, pr.y) > 0.3 && !b.track.isGap(pr.s))
      this.lastGood = { track: b.activeIndex, s: pr.s, v: b.v.length() };
    // a numerical glitch (wedged between surfaces, NaN): reset at once
    if (!Number.isFinite(b.p.x + b.p.y + b.p.z + b.v.x + b.v.y + b.v.z)) { this.fail(); return; }
    // failure: left the gutter and fell, or far away from the track
    const W = b.track.halfWidthAt(pr.s);
    const off = Math.abs(pr.x) > W + 1.5 && pr.y < b.track.profile.H - 1;
    // (v5) flying is part of the game: only reset when you are truly lost, far
    // below the course or very far from it, not while you're in the air steering back
    const fell = pr.y < -40 || Math.abs(pr.x) > 60 || Math.abs(pr.along) > 60;
    // outside the gutter (beside it, or underneath after dropping through a gap):
    // the tractor beam gets a few seconds to haul you back in, then you respawn
    const outside = Math.abs(pr.x) > W + 0.6 && pr.y < b.track.profile.H;
    this.outsideTimer = outside ? this.outsideTimer + this.fixedDt : 0;
    // dropped into a gap: once you're below the floor you've fallen (no hovering under the gutter)
    let insideAny = false; // (at a tube junction the ball can be below one pipe's floor yet inside the other)
    let inChannel = false; // ...and not just above it: high in the air over a gutter is still out of it
    for (let k = 0; k < b.tracks.length && !inChannel; k++) {
      const p = b.projs[k], tk = b.tracks[k];
      if (Math.abs(p.along) < 3 && tk.channelDepthLocal(p.s, p.x, p.y) > -0.3) {
        insideAny = true;
        const [wl, wr] = tk.wallsAt(p.s);
        if (p.y < Math.max(wl, wr, tk.profile.H) + 5 || tk.tubeAt(p.s) > 0.5) inChannel = true;
      }
    }
    // a safety net below (or its beam carrying you): let it catch you, that's not a fall
    const netted = b.netLift || (b.track.netAt(pr.s) && Math.abs(pr.x) < NET.half + 3 && pr.y > b.track.netYAt(pr.s) - 3 && Math.abs(pr.along) < 3);
    if (netted) { this.underTimer = 0; this.outsideTimer = 0; this.stuckTimer = 0; this.offTimer = 0; return; }
    // out of every gutter's channel (flying, or rolling along the outside or the top of a
    // wall), for longer than a moment: the beam brings you back. (Riding a tunnel's roof
    // is a designed line, not lost.)
    const onRoof = b.track.isTunnel(pr.s) && pr.y > b.track.profile.H - 0.6 && Math.abs(pr.x) < W + 0.5;
    this.offTimer = !inChannel && !onRoof ? this.offTimer + this.fixedDt : 0;
    if (this.offTimer > RECALL.after) { this.offTimer = 0; this.recall(); return; }
    const under = !insideAny && (pr.y < -2.5 || (pr.y < -0.8 && !b.track.isGap(pr.s)));
    this.underTimer = under ? this.underTimer + this.fixedDt : 0;
    if (this.underTimer > 0.25) { this.underTimer = 0; this.recall(); return; }
    const sinking = b.v.dot(pr.U) < -1; // coming down beside the gutter, not flying
    if ((off && sinking && b.airborneTime > 1.2) || fell || (this.outsideTimer > 2.5 && b.contact)) {
      this.outsideTimer = 0;
      this.recall();
      return;
    }
    // in the air too long, or flown far ahead of where you left the course: the beam takes you
    if (b.airborne && !b.netLift) {
      const g = this.lastGood, gp = b.projs[g.track];
      const gtr = this.course.all[g.track] ?? tr;
      const far = !!gp && (Math.abs(gp.x) > gtr.halfWidthAt(gp.s) + 6 || gp.y > 20 || Math.abs(gp.along) > 3);
      if (far && gp.s > g.s + RECALL.shortcut) { this.recall(); return; }
    }
    // stuck (wedged against an obstacle)
    // (braked to a stop on purpose is not stuck: a swipe up rolls you on)
    if (b.v.length() < 0.6 && b.sinceBrake > 6) this.stuckTimer += this.fixedDt; else this.stuckTimer = 0;
    if (this.stuckTimer > 1.5) { this.stuckTimer = 0; this.fail(); }
  }

  /** Lost the ball off the course: the tractor beam hauls it back in, a little past where it left, slower. */
  recall() {
    const b = this.ball;
    if (!Number.isFinite(b.p.x + b.p.y + b.p.z)) { this.fail(); return; }
    this.falls++;
    const g = this.lastGood;
    const tr = this.course.all[g.track] ?? this.track;
    // somewhere the beam can set you down from above: open gutter, no gap, no loop or roof
    const ok = (s: number) => !tr.isGap(s) && !tr.isGap(s + 8) && !tr.isSteepOrInverted(s) && tr.tubeAt(s) < 0.05 && !tr.isTunnel(s) && !tr.isTunnel(s + 6);
    let s = Math.max(4, Math.min(tr.length - 70, g.s + RECALL.ahead)), guard = 0;
    while (guard++ < 120 && s < tr.length - 70 && !ok(s)) s += 5;
    if (!ok(s)) { s = Math.max(4, g.s); guard = 0; while (guard++ < 120 && s > 4 && !ok(s)) s -= 5; }
    if (!ok(s)) { this.fail(); this.falls--; return; }
    // (a slip just through the floor or over the lip, right by the gutter, costs almost nothing;
    // flying off the course costs a quarter of your speed)
    const pr = b.proj, near = Math.abs(pr.x) < b.track.halfWidthAt(pr.s) + 3 && pr.y > -4 && pr.y < b.track.profile.H + 3;
    b.startRecall(g.track, s, Math.max(16, Math.min(near ? 90 : 60, g.v * (near ? 0.95 : RECALL.keep))));
    this.outsideTimer = 0; this.underTimer = 0; this.stuckTimer = 0; this.offTimer = 0;
  }

  fail() {
    this.falls++;
    this.respawnTimer = 0.18; // a blink, not a wait
    this.setPhase('respawning');
  }

  /** Which route the run finished on (0 = main course). */
  finishRoute = 0;
  /** Progress to the finish along the route you are on (counting the part of the course before its fork). */
  get progress() {
    const b = this.ball;
    const tr = b.track;
    if (b.activeIndex === 0 || !tr.layout.finishLine) return Math.max(0, Math.min(1, b.mainProj.s / (this.track.length - 62)));
    const s0 = this.course.startS?.[b.activeIndex] ?? 0;
    return Math.max(0, Math.min(1, (s0 + b.proj.s) / (s0 + tr.length - 62)));
  }
}
