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
export type Trick = '' | 'PUSH' | 'TURBO' | 'PAD' | 'HOLOGRAM' | 'AIR' | 'GAP' | 'BEAM' | 'GRIP' | 'DODGE' | 'GAS' | 'CARVE' | 'BRAKE';

const PP_TMP = new Vector3();

export class ProPilot {
  private lastTargetX = 0;
  private pushT = 0;
  private airT = 0;
  private padK = -1;
  private brakeT = 0;
  /**
   * PACE, 0 = chill .. 1 = rip. Chill rolls the line calmly (no pushing, no
   * showing off), good for studying a course. Rip runs it like a racer:
   * harder pushes and turbo, the booster held on clear stretches, air then
   * an early beam back down, and turns carved high on the outside wall
   * instead of fought. Everything still respects the look-ahead safe speed.
   */
  pace = 0.6;
  /** INSANE: flat out everywhere (the ball runs INSANE_TUNING); the beam and the net catch the rest. */
  insane = false;
  // after a crash it rides carefully for a while (so one mistake never repeats)
  private lastP = new Vector3(NaN, 0, 0);
  private lastTrack = -1;
  private cautiousTo = -1;
  trick: Trick = '';
  private trickHold = 0;

  /** A copy with the same plan (for the look-ahead). */
  clone(): ProPilot {
    const c = new ProPilot();
    c.lastTargetX = this.lastTargetX; c.pushT = this.pushT; c.airT = this.airT; c.padK = this.padK; c.brakeT = this.brakeT;
    c.trick = this.trick; c.trickHold = this.trickHold;
    c.lastP.copy(this.lastP); c.lastTrack = this.lastTrack; c.cautiousTo = this.cautiousTo; c.pace = this.pace; c.insane = this.insane;
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
    let v = this.insane ? 180 : 130;
    for (let d = 0; d < horizon && v > 20; d += 5) {
      const q = s + d;
      if (q > tr.length) break;
      const i0 = tr.idx(q - 6), i1 = tr.idx(q + 6);
      const dx = tr.T[i1 * 3] - tr.T[i0 * 3], dy = tr.T[i1 * 3 + 1] - tr.T[i0 * 3 + 1], dz = tr.T[i1 * 3 + 2] - tr.T[i0 * 3 + 2];
      const kappa = Math.hypot(dx, dy, dz) / 12;
      // corners: inside the containment walls a hot ball just rides higher up the wall,
      // so a ripper carries much more there; only open-sky corners can throw you off
      const contained = !tr.openSky[tr.idx(q)];
      const latG = this.insane ? 150 : 14 + 80 * Math.pow(this.pace, 1.3) + (contained ? 260 * Math.pow(this.pace, 2) : 0);
      if (kappa > 1e-4 && tr.tubeAt(q) < 0.5) v = Math.min(v, Math.sqrt(latG / kappa) + d * 0.08);
      if (tr.isGap(q)) v = Math.min(v, (this.insane ? 90 : 46 + 6 * this.pace) + d * 0.05);
      if (tr.openSky[tr.idx(q)]) v = Math.min(v, (this.insane ? 85 : 44 + 26 * this.pace) + d * 0.05);
    }
    return v;
  }

  /** How fast it can go into an open-sky corner ahead (one with no walls to hold it) before it flies off. */
  flyOffSpeed(ball: BallPhysics, horizon: number): number {
    const tr = ball.track, s = ball.proj.s;
    let v = 999;
    for (let d = 0; d < horizon; d += 5) {
      const q = s + d;
      if (q > tr.length) break;
      if (tr.isSteepOrInverted(q) || tr.tubeAt(q) > 0.5) return 999;   // a loop or tube first: keep the speed
      if (tr.isGap(q)) return 999;                                          // a gap first: it needs the speed
      if (!tr.openSky[tr.idx(q)]) continue;
      const i0 = tr.idx(q - 6), i1 = tr.idx(q + 6);
      const kappa = Math.hypot(tr.T[i1 * 3] - tr.T[i0 * 3], tr.T[i1 * 3 + 1] - tr.T[i0 * 3 + 1], tr.T[i1 * 3 + 2] - tr.T[i0 * 3 + 2]) / 12;
      if (kappa > 0.008) v = Math.min(v, Math.sqrt((30 + 60 * this.pace) / kappa) + d * 0.08);
    }
    return v;
  }

  decide(ball: BallPhysics, dt: number): BallInput {
    const tr = ball.track, pr = ball.proj, s = pr.s;
    const speed = Math.max(4, ball.v.length());
    const vLat = ball.v.dot(pr.R);
    const W = tr.halfWidthAt(s);
    this.pushT -= dt; this.airT -= dt; this.brakeT -= dt;
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
    if (!tube && !gapAhead && !careful && this.pace >= 0.25) {
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
    for (let d = 0; d < speed * 0.3; d += 1) if (tr.isGap(s + d)) {
      // flying fast, a short gap is just a skim: the ball drops only centimetres crossing it,
      // and a jump would only throw it high (and long) off the far side
      let len = 0; while (len < 80 && tr.isGap(s + d + len)) len += 1;
      const sink = 4.9 * (len / speed) ** 2;
      if ((this.insane || this.pace >= 0.7) && sink < 0.45) { this.say('GAP'); break; }
      jump = true; this.say('GAP'); break;
    }
    if (blocked(pr.x) >= 0 && blocked(pr.x) < speed * 0.3 && bestScore < 100) jump = true;
    // air over a crest: the gutter drops away ahead, nothing closed or solid coming up
    if (!jump && !careful && (this.insane || (this.pace >= 0.5 && this.pace < 0.85)) && climb === 0 && ball.contact && this.airT <= 0 && speed > 24 && !tube && Math.abs(pr.x) < W * 0.4) {
      const i0 = tr.idx(s), i1 = tr.idx(s + 10);
      const dT = PP_TMP.set(tr.T[i1 * 3] - tr.T[i0 * 3], tr.T[i1 * 3 + 1] - tr.T[i0 * 3 + 1], tr.T[i1 * 3 + 2] - tr.T[i0 * 3 + 2]);
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
    // (ripping: beam back down sooner. Air is slow, the gutter is fast)
    if (ball.airborne && ball.airborneTime > 0.4 - 0.25 * this.pace && climb === 0 && !overGap) { magnet = true; this.say('BEAM', 0.5); }
    // ripping: a little hop off the surface? stick straight back down (air is slow, the throttle needs the track)
    if (!ball.contact && this.pace >= 0.7 && climb === 0 && !overGap && pr.y < 4.5 && pr.y > -0.5 && Math.abs(pr.x) < W) magnet = true;

    // ---- speed: swipe pushes, and TURBO on long open stretches ----
    let push = 0;
    const straight = (() => {
      const i0 = tr.idx(s), i1 = tr.idx(s + 40);
      return tr.T[i0 * 3] * tr.T[i1 * 3] + tr.T[i0 * 3 + 1] * tr.T[i1 * 3 + 1] + tr.T[i0 * 3 + 2] * tr.T[i1 * 3 + 2] > 0.96;
    })();
    const safeNear = Math.min(careful && !this.insane ? 30 : 999, this.safeSpeed(ball, Math.max(120, speed * 3.5)));
    const turboOk = this.insane ? straight && !tube : !careful && this.pace >= 0.4 && this.safeSpeed(ball, 480) >= 70 - 15 * this.pace && straight && !tube;
    const pushCap = this.insane ? 110 : 26 + 60 * this.pace;
    // the swipe-back brake: a calm rider scrubs speed before a corner it can't carry
    let brake = 0;
    // (only where too much speed would throw it off the course: an open-sky edge or a gap ahead,
    // never before loops and climbs, which need every bit of speed)
    if (!this.insane && this.pace <= 0.6 && ball.contact && this.brakeT <= 0 && speed > this.flyOffSpeed(ball, Math.max(80, speed * 2.5)) + 9) {
      brake = 0.7; this.brakeT = 0.45; this.say('BRAKE', 0.6);
    }
    if (ball.contact && climb === 0 && !magnet && this.pace >= 0.15) {
      if (ball.turboArmed && turboOk) { push = 1; this.say('TURBO', 1.4); }
      else if (ball.pushCombo >= 3 && ball.turboTime <= 0 && turboOk) magnet = true; // charge the booster
      else if (this.pushT <= 0 && speed < Math.min(pushCap, safeNear - 3) && ball.turboTime <= 0) {
        push = Math.min(1, 0.5 + this.pace); this.pushT = 0.6 - 0.25 * this.pace; if (!this.trick) this.say('PUSH', 0.4);
      }
      // (the throttle is decided below: it can be held while you swipe too)
    }
    // ---- THE THROTTLE: the beam held on the track is the gas ----
    // The slider sets how hard: from just past chill it rides the throttle more and
    // more; at RIP it's pinned, lifting only for corners it can't carry, solid blocks
    // dead ahead, and to refill. (You can hold it while you swipe, too.)
    // (inside a closed tube nothing can throw you out: ripping stays on the gas)
    const safeHere = tube && this.pace >= 0.7 ? 999 : safeNear;
    // (gas on the floor of the gutter, never halfway up a wall: the throttle presses you onto
    // whatever you're riding, so on a wall it would drive you up and over the top)
    const onFloor = pr.y < (tube ? 3.6 : 3.2);
    if (!magnet && ball.contact && onFloor && climb === 0 && (this.insane || this.pace >= 0.2) && blocked(pr.x) < 0
      && speed < Math.min(safeHere - (this.insane ? 0 : 4 * (1 - this.pace)), this.insane ? 999 : 25 + 95 * this.pace)
      && ball.magnetEnergy > (this.insane ? 0.08 : ball.magnetActive ? 0.25 - 0.22 * this.pace : 0.4 - 0.34 * this.pace)) {
      magnet = true; this.say('GAS', 0.4);
    }
    if (magnet && ball.magnetEnergy < 0.08 && !ball.airborne) magnet = false;

    // ---- steering ----
    let steer: number;
    if (climb !== 0) {
      steer = climb;                      // toward the wall: ride up to the pad
      if (!this.trick || this.trick === 'PUSH') this.say('PAD', 0.6);
    } else {
      // ripping through a turn: let it ride up the outside wall (the banking carries the speed)
      if (this.pace >= 0.5 && !tube && !gapAhead && holoX === null && blocked(0) < 0) {
        const i0 = tr.idx(s), i1 = tr.idx(s + 15);
        const turnR = (tr.T[i1 * 3] - tr.T[i0 * 3]) * pr.R.x + (tr.T[i1 * 3 + 1] - tr.T[i0 * 3 + 1]) * pr.R.y + (tr.T[i1 * 3 + 2] - tr.T[i0 * 3 + 2]) * pr.R.z;
        if (Math.abs(turnR) > 0.06) { targetX = -Math.sign(turnR) * W * 0.4 * Math.min(1, Math.abs(turnR) / 0.2) * this.pace; if (!this.trick) this.say('CARVE', 0.4); }
      }
      steer = Math.max(-1, Math.min(1, (targetX - pr.x) * 0.55 - vLat * (gapAhead ? 0.7 : 0.35)));
    }
    this.lastTargetX = targetX;
    return { steer, jump, magnet: brake ? false : magnet, driveLevel: 2, push: brake ? 0 : push, brake };
  }
}
