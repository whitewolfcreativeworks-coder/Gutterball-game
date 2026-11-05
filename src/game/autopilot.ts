import type { BallInput, BallPhysics } from '../physics/ball';
import type { Track } from '../track/track';

/**
 * A simple bot used for course previews, automated course validation and
 * attract-mode. It uses the same input channel as the player — it cannot do
 * anything a player can't.
 */
export class Autopilot {
  private lastTargetX = 0;
  constructor(private track: Track) {}

  decide(ball: BallPhysics): BallInput {
    const tr = ball.track ?? this.track; // the route the ball is on now
    const pr = ball.proj;
    const s = pr.s;
    const speed = Math.max(4, ball.v.length());
    const vLat = ball.v.dot(pr.R);

    // Choose a lateral lane that avoids obstacles ahead
    let targetX = 0;
    let jump = false;
    const look = Math.min(45, speed * 1.6);
    const blocked = (x: number) => {
      for (const o of tr.obstacles) {
        const ds = o.s - s;
        if (ds < -1 || ds > look) continue;
        // where a moving block will be when we get there
        const ox = tr.obstacleX(o, tr.time + Math.max(0, ds) / speed);
        if (Math.abs(x - ox) < o.w / 2 + ball.tune.radius + (o.move ? 0.9 : 0.45)) return ds;
      }
      return -1;
    };
    const k = (tr.profile.a + tr.profile.rc) / 4.2;
    const candidates = [0, -2.2, 2.2, -3.2, 3.2, -1.2, 1.2].map((c) => c * k);
    let best = 0, bestScore = -1e9;
    for (const c of candidates) {
      const b = blocked(c);
      const score = (b < 0 ? 100 : b) - Math.abs(c - this.lastTargetX) * 0.8 - Math.abs(c) * 0.3;
      if (score > bestScore) { bestScore = score; best = c; }
    }
    targetX = best;
    this.lastTargetX = targetX;
    // If everything is blocked close ahead, jump
    if (blocked(pr.x) >= 0 && blocked(pr.x) < speed * 0.32 && bestScore < 100) jump = true;

    // Gaps
    for (let d = 0; d < speed * 0.35; d += 1) {
      if (tr.isGap(s + d)) { jump = true; break; }
    }

    // Inverted / steep sections ahead -> magnet
    let magnet = false;
    const P = { x: 0 };
    void P;
    for (let d = -5; d < 25; d += 5) {
      const i = Math.round((s + d) / tr.ds);
      const k = Math.max(0, Math.min(tr.n - 1, i)) * 3;
      const uy = tr.U[k + 1];
      if (uy < 0.55) { magnet = true; break; }
    }
    if (ball.airborne && ball.airborneTime > 0.25) magnet = true;
    if (ball.magnetEnergy < 0.08) magnet = false;

    const steer = Math.max(-1, Math.min(1, (targetX - pr.x) * 0.55 - vLat * 0.35));
    const driveLevel = speed < 14 ? 2 : 1;
    return { steer, jump, magnet, driveLevel };
  }
}
