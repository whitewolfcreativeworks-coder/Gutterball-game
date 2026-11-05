import { BallInput, BallPhysics, BallTuning } from '../physics/ball';
import type { MaterialProfile } from '../physics/materials';
import { Course, Track } from '../track/track';
import type { SensoryEvent } from '../core/events';

export type RunPhase = 'ready' | 'running' | 'finished' | 'respawning';

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
    // finish
    const finishS = tr.length - 62;
    if (this.phase === 'running' && onMain && mp.s > finishS) {
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
    const fell = pr.y < -14 || Math.abs(pr.x) > 40 || Math.abs(pr.along) > 30;
    // outside the gutter (beside it, or underneath after dropping through a gap):
    // the tractor beam gets a few seconds to haul you back in, then you respawn
    const outside = Math.abs(pr.x) > W + 0.6 && pr.y < b.track.profile.H;
    this.outsideTimer = outside ? this.outsideTimer + this.fixedDt : 0;
    // dropped into a gap: once you're below the floor you've fallen (no hovering under the gutter)
    let insideAny = false; // (at a tube junction the ball can be below one pipe's floor yet inside the other)
    for (let k = 0; k < b.tracks.length && !insideAny; k++) { const p = b.projs[k]; if (Math.abs(p.along) < 3 && b.tracks[k].channelDepthLocal(p.s, p.x, p.y) > -0.3) insideAny = true; }
    const under = !insideAny && (pr.y < -2.5 || (pr.y < -0.8 && !b.track.isGap(pr.s)));
    this.underTimer = under ? this.underTimer + this.fixedDt : 0;
    if (this.underTimer > 0.25) { this.underTimer = 0; this.fail(); return; }
    if ((off && b.airborneTime > 0.9 && !b.magnetActive) || fell || (b.airborneTime > 6) || this.outsideTimer > 2.5) {
      this.outsideTimer = 0;
      this.fail();
      return;
    }
    // stuck (wedged against an obstacle)
    if (b.v.length() < 0.6) this.stuckTimer += this.fixedDt; else this.stuckTimer = 0;
    if (this.stuckTimer > 1.5) { this.stuckTimer = 0; this.fail(); }
  }

  fail() {
    this.falls++;
    this.respawnTimer = 0.18; // a blink, not a wait
    this.setPhase('respawning');
  }

  get progress() { return Math.max(0, Math.min(1, this.ball.mainProj.s / (this.track.length - 62))); }
}
