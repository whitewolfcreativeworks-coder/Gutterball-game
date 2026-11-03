import { BallInput, BallPhysics, BallTuning } from '../physics/ball';
import type { MaterialProfile } from '../physics/materials';
import { Track } from '../track/track';
import type { SensoryEvent } from '../core/events';
import { halfWidth } from '../track/profile';

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
  finishTime = 0;
  readonly fixedDt = 1 / 240;
  private acc = 0;
  pendingEvents: SensoryEvent[] = [];
  onPhase?: (p: RunPhase) => void;

  constructor(readonly track: Track, material: MaterialProfile, tuning: Partial<BallTuning> = {}) {
    this.ball = new BallPhysics(track, material, tuning);
    this.reset();
  }

  reset() {
    this.phase = 'ready';
    this.time = 0;
    this.falls = 0;
    this.checkpointIndex = 0;
    this.ball.placeAt(this.track.checkpoints[0], 0);
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
        const s = this.track.checkpoints[this.checkpointIndex];
        this.ball.placeAt(s, 10);
        this.setPhase('running');
      }
      return 0;
    }
    this.acc += dt;
    const jumpEdge = input.jump;
    while (this.acc >= this.fixedDt) {
      this.acc -= this.fixedDt;
      const inp = steps === 0 ? input : { ...input, jump: false };
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
    const pr = b.proj;
    const tr = this.track;
    // checkpoints
    while (this.checkpointIndex + 1 < tr.checkpoints.length && pr.s > tr.checkpoints[this.checkpointIndex + 1] + 3) this.checkpointIndex++;
    // finish
    const finishS = tr.length - 62;
    if (this.phase === 'running' && pr.s > finishS) {
      this.finishTime = this.time;
      this.setPhase('finished');
    }
    if (this.phase === 'finished') {
      // gentle braking in the run-out (gameplay, not physics fiction)
      b.v.multiplyScalar(1 - 0.6 * this.fixedDt);
      b.w.multiplyScalar(1 - 0.6 * this.fixedDt);
      return;
    }
    // failure: left the gutter and fell, or far away from the track
    const W = halfWidth(tr.profile);
    const off = Math.abs(pr.x) > W + 1.5 && pr.y < tr.profile.H - 1;
    const fell = pr.y < -14 || Math.abs(pr.x) > 40 || Math.abs(pr.along) > 30;
    if ((off && b.airborneTime > 0.9 && !b.magnetActive) || fell || (b.airborneTime > 6)) {
      this.fail();
      return;
    }
    // stuck (wedged against an obstacle)
    if (b.v.length() < 0.6) this.stuckTimer += this.fixedDt; else this.stuckTimer = 0;
    if (this.stuckTimer > 3) { this.stuckTimer = 0; this.fail(); }
  }

  fail() {
    this.falls++;
    this.respawnTimer = 1.2;
    this.setPhase('respawning');
  }

  get progress() { return Math.max(0, Math.min(1, this.ball.proj.s / (this.track.length - 62))); }
}
