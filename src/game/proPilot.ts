import type { BallInput, BallPhysics } from '../physics/ball';
import { Vector3 } from 'three';

/**
 * AUTO BALL: a "pro" driver for showing off a course. It uses exactly the
 * player's controls (steer, jump, magnet, push swipes), nothing more, but it
 * plays like someone who knows every line:
 *  - keeps the speed up with swipe pushes, and chains three pushes + the
 *    booster into TURBO on long straight stretches;
 *  - climbs the wall to hit each trigger pad, then aims straight THROUGH
 *    the holograms for their boosts;
 *  - threads the solid obstacles, jumps gaps at the edge, catches air over
 *    crests;
 *  - holds the magnet through loops and inversions, and beams itself home
 *    after big air.
 * `trick` names what it's doing (for the HUD).
 */
export type Trick = '' | 'PUSH' | 'TURBO' | 'PAD' | 'HOLOGRAM' | 'AIR' | 'GAP' | 'BEAM' | 'GRIP' | 'DODGE';

export class ProPilot {
  private lastTargetX = 0;
  private pushT = 0;
  private airT = 0;
  private padK = -1;
  // after a crash it rides carefully for a while (so one mistake never repeats)
  private lastP = new Vector3(NaN, 0, 0);
  private lastTrack = -1;
  private cautiousTo = -1;
  trick: Trick = '';
  private trickHold = 0;

  /** A copy with the same plan (for the look-ahead). */
  clone(): ProPilot {
    const c = new ProPilot();
    c.lastTargetX = this.lastTargetX; c.pushT = this.pushT; c.airT = this.airT; c.padK = this.padK;
    c.trick = this.trick; c.trickHold = this.trickHold;
    c.lastP.copy(this.lastP); c.lastTrack = this.lastTrack; c.cautiousTo = this.cautiousTo;
    return c;
  }

  /** The game tells it when the run reset after a fall: ride gently for the next 600 m. */
  crashed(ball: BallPhysics) { this.cautiousTo = ball.proj.s + 600; this.lastTrack = ball.activeIndex; }

  private say(t: Trick, hold = 0.9) {
    if (t === '') return;
    this.trick = t; this.trickHold = hold;
  }

  /**
   * The fastest it's wise to be going over the next `horizon` metres: tight
   * corners (by their radius), gaps and fly-off zones ahead all cap it. There
   * are no brakes in Gutterball, so a pro simply stops pushing in time.
   */
  safeSpeed(ball: BallPhysics, horizon: number): number {
    const tr = ball.track, s = ball.proj.s;
    let v = 80;
    for (let d = 0; d < horizon && v > 20; d += 5) {
      const q = s + d;
      if (q > tr.length) break;
      const i0 = tr.idx(q - 6), i1 = tr.idx(q + 6);
      const dx = tr.T[i1 * 3] - tr.T[i0 * 3], dy = tr.T[i1 * 3 + 1] - tr.T[i0 * 3 + 1], dz = tr.T[i1 * 3 + 2] - tr.T[i0 * 3 + 2];
      const kappa = Math.hypot(dx, dy, dz) / 12;
      if (kappa > 1e-4 && tr.tubeAt(q) < 0.5) v = Math.min(v, Math.sqrt(22 / kappa) + d * 0.08);
      if (tr.isGap(q)) v = Math.min(v, 46 + d * 0.05);
      if (tr.openSky[tr.idx(q)]) v = Math.min(v, 44 + d * 0.05);
    }
    return v;
  }

  decide(ball: BallPhysics, dt: number): BallInput {
    const tr = ball.track, pr = ball.proj, s = pr.s;
    const speed = Math.max(4, ball.v.length());
    const vLat = ball.v.dot(pr.R);
    const W = tr.halfWidthAt(s);
    this.pushT -= dt; this.airT -= dt;
    this.trickHold -= dt; if (this.trickHold <= 0) this.trick = '';
    const tube = tr.tubeAt(s) > 0.5;
    // a jump in position = a reset after a fall: ease off for the next 500 m
    if (Number.isFinite(this.lastP.x) && this.lastP.distanceTo(ball.p) > 15) { this.cautiousTo = s + 500; this.lastTrack = ball.activeIndex; }
    this.lastP.copy(ball.p);
    const careful = ball.activeIndex === this.lastTrack && s < this.cautiousTo;

    // ---- the line: dodge solid blocks, aim through holograms ----
    const look = Math.min(55, speed * 1.7);
    const blocked = (x: number) => {
      for (let oi = 0; oi < tr.obstacles.length; oi++) {
        if (tr.ghost[oi]) continue;
        const o = tr.obstacles[oi];
        const ds = o.s - s;
        if (ds < -1 || ds > look) continue;
        const ox = tr.obstacleX(o, tr.time + Math.max(0, ds) / speed);
        if (Math.abs(x - ox) < o.w / 2 + ball.tune.radius + (o.move ? 0.9 : 0.5)) return ds;
      }
      return -1;
    };
    let holoX: number | null = null;
    for (let oi = 0; oi < tr.obstacles.length; oi++) {
      if (!tr.ghost[oi] || tr.holoUsed[oi]) continue;
      const o = tr.obstacles[oi], ds = o.s - s;
      if (ds > 0 && ds < look) { holoX = tr.obstacleX(o, tr.time + ds / speed); break; }
    }
    const k = W / 4.2;
    const candidates = [0, -2.2, 2.2, -3.2, 3.2, -1.2, 1.2].map((c) => c * k);
    let best = 0, bestScore = -1e9;
    for (const c of candidates) {
      const b = blocked(c);
      const score = (b < 0 ? 100 : b) - Math.abs(c - this.lastTargetX) * 0.8 - Math.abs(c) * 0.3 - (holoX !== null ? Math.abs(c - holoX) * 3 : 0);
      if (score > bestScore) { bestScore = score; best = c; }
    }
    let targetX = holoX !== null && blocked(holoX) < 0 ? holoX : best;
    if (holoX !== null && targetX === holoX) this.say('HOLOGRAM');
    else if (Math.abs(best) > 0.5 && blocked(0) >= 0) this.say('DODGE', 0.5);

    // a gap coming up: line up dead straight in the middle for the jump
    let gapAhead = false;
    for (let d = 0; d < Math.max(60, speed * 2); d += 3) if (tr.isGap(s + d)) { gapAhead = true; break; }
    if (gapAhead && blocked(0) < 0) targetX = 0;

    // ---- trigger pads: climb the wall to roll over the next one ----
    let climb = 0;
    if (!tube && !gapAhead && !careful) {
      for (let pk = 0; pk < tr.pads.length; pk++) {
        if (tr.padHit[pk]) continue;
        const pd = tr.pads[pk], ds = pd.s - s;
        if (ds < -pd.len || ds > Math.max(45, speed * 1.9)) continue;
        // nothing solid in the way up the wall
        if (blocked(pd.side * (W - 1.5)) >= 0 && blocked(pd.side * (W - 1.5)) < ds) continue;
        // ride smoothly up the wall: a target height that rises as the pad nears, held with
        // gentle feedback (push into the wall, ease off when climbing fast), so the ball
        // rolls along the wall over the pad instead of launching off it
        const yT = pd.y * Math.max(0.3, Math.min(1, 1 - (ds - 8) / Math.max(20, speed * 1.2)));
        const vUp = ball.v.dot(pr.U);
        climb = pd.side * Math.max(-1, Math.min(1, 0.45 + 0.55 * (yT - pr.y) - 0.3 * vUp));
        this.padK = pk;
        break;
      }
    }

    // ---- jumps ----
    let jump = false;
    for (let d = 0; d < speed * 0.3; d += 1) if (tr.isGap(s + d)) { jump = true; this.say('GAP'); break; }
    if (blocked(pr.x) >= 0 && blocked(pr.x) < speed * 0.3 && bestScore < 100) jump = true;
    // air over a crest: the gutter drops away ahead, nothing closed or solid coming up
    if (!jump && !careful && climb === 0 && ball.contact && this.airT <= 0 && speed > 24 && !tube && Math.abs(pr.x) < W * 0.4) {
      const i0 = tr.idx(s), i1 = tr.idx(s + 10);
      const dT = new Vector3(tr.T[i1 * 3] - tr.T[i0 * 3], tr.T[i1 * 3 + 1] - tr.T[i0 * 3 + 1], tr.T[i1 * 3 + 2] - tr.T[i0 * 3 + 2]);
      const drop = dT.dot(pr.U);
      let clear = true;
      for (let d = 0; d < 60 && clear; d += 4) {
        const q = s + d;
        if (tr.tubeAt(q) > 0.05 || tr.isTunnel(q) || tr.isGap(q) || tr.isSteepOrInverted(q) || tr.openSky[tr.idx(q)]) clear = false;
      }
      if (drop < -0.07 && clear && blocked(pr.x) < 0) { jump = true; this.airT = 3; this.say('AIR', 1.2); }
    }

    // ---- magnet: grip through inversions, beam home after big air ----
    let magnet = false;
    for (let d = -5; d < 25; d += 5) {
      const i = Math.max(0, Math.min(tr.n - 1, Math.round((s + d) / tr.ds)));
      if (tr.U[i * 3 + 1] < 0.55) { magnet = true; break; }
    }
    if (magnet) this.say('GRIP', 0.4);
    // (never over a gap: the beam would pull you down into it. Wait till you're across.)
    let overGap = false;
    for (let d = -4; d < 30; d += 2) if (tr.isGap(s + d)) { overGap = true; break; }
    if (ball.airborne && ball.airborneTime > 0.35 && climb === 0 && !overGap) { magnet = true; this.say('BEAM', 0.5); }

    // ---- speed: swipe pushes, and TURBO on long open stretches ----
    let push = 0;
    const straight = (() => {
      const i0 = tr.idx(s), i1 = tr.idx(s + 40);
      return tr.T[i0 * 3] * tr.T[i1 * 3] + tr.T[i0 * 3 + 1] * tr.T[i1 * 3 + 1] + tr.T[i0 * 3 + 2] * tr.T[i1 * 3 + 2] > 0.96;
    })();
    const safeNear = Math.min(careful ? 0 : 99, this.safeSpeed(ball, Math.max(120, speed * 3.5)));
    const turboOk = !careful && this.safeSpeed(ball, 480) >= 70 && straight && !tube;
    if (ball.contact && climb === 0 && !magnet) {
      if (ball.turboArmed && turboOk) { push = 1; this.say('TURBO', 1.4); }
      else if (ball.pushCombo >= 3 && ball.turboTime <= 0 && turboOk) magnet = true; // charge the booster
      else if (this.pushT <= 0 && speed < Math.min(44, safeNear - 3) && ball.turboTime <= 0) { push = 1; this.pushT = 0.42; if (!this.trick) this.say('PUSH', 0.4); }
    }
    if (magnet && ball.magnetEnergy < 0.08 && !ball.airborne) magnet = false;

    // ---- steering ----
    let steer: number;
    if (climb !== 0) {
      steer = climb;                      // toward the wall: ride up to the pad
      if (!this.trick || this.trick === 'PUSH') this.say('PAD', 0.6);
    } else {
      steer = Math.max(-1, Math.min(1, (targetX - pr.x) * 0.55 - vLat * (gapAhead ? 0.7 : 0.35)));
    }
    this.lastTargetX = targetX;
    return { steer, jump, magnet, driveLevel: 2, push };
  }
}
