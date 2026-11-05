/**
 * PINBALL INTRO, the physics. A small pinball table in 2-D table coordinates:
 * u across (right +), w up the table (0 = the flipper end, L = the top).
 *
 * Layout (W = 20, L = 40, ball radius r):
 *  - outer walls and a round top arch; a plunger lane down the right side
 *  - two flippers at the bottom, inlane guides leading onto them, a drain
 *    between them
 *  - three pop bumpers that kick the ball away
 *  - THE CAVE: a tunnel mouth up the middle. Shoot the ball into it and the
 *    race begins.
 * Kind to beginners: a drained ball comes back to the plunger, and after two
 * drains (or ~40 s) a tractor beam guides the ball into the cave.
 */
export type PinEvent = { type: 'bumper' | 'flipper' | 'wall' | 'plunger' | 'drain' | 'cave' | 'assist'; strength: number; index?: number };

export const PIN = {
  W: 20, L: 40,
  laneX: 7.2,          // the plunger lane's inner wall
  laneTop: 27,         // where the lane opens onto the playfield
  gravity: 9,          // down-table acceleration (m/s^2): a toy table, snappy
  flipLen: 3.7, flipR: 0.5,
  flipRest: -0.52, flipUp: 0.45, flipSpeed: 26,
  bumperR: 1.5, bumperKick: 13,
  caveU: -0.4, caveW: 32, caveHalf: 2.3, caveDepth: 2.6,
  restitution: 0.5,
};
const C = (-PIN.W / 2 + PIN.laneX) / 2; // playfield centre line (left of the lane)

export interface Seg { ax: number; ay: number; bx: number; by: number; oneWay?: boolean }

export class PinballSim {
  readonly r: number;
  u = 0; w = 0; vu = 0; vw = 0;
  phase: 'plunger' | 'pull' | 'play' | 'cave' | 'done' = 'plunger';
  pull = 0;                       // plunger draw 0..1
  inLane = true;
  drains = 0;
  time = 0;
  assist = false;
  caveT = 0;
  readonly walls: Seg[] = [];
  readonly gate: Seg;             // closes the lane top once the ball is out
  readonly bumpers: { u: number; w: number; flash: number }[] = [];
  readonly flippers: { pu: number; pw: number; side: -1 | 1; a: number; av: number }[] = [];
  bumperHits = 0;
  events: PinEvent[] = [];

  constructor(r: number) {
    this.r = r;
    const { W, L, laneX, laneTop } = PIN;
    const hw = W / 2;
    const seg = (ax: number, ay: number, bx: number, by: number) => this.walls.push({ ax, ay, bx, by });
    // outer walls
    seg(-hw, -6, -hw, L - hw);
    seg(hw, -6, hw, L - hw);
    // the top arch (centre (0, L - hw), radius hw)
    const N = 18;
    for (let i = 0; i < N; i++) {
      const a0 = (Math.PI * i) / N, a1 = (Math.PI * (i + 1)) / N;
      seg(hw * Math.cos(a0), L - hw + hw * Math.sin(a0), hw * Math.cos(a1), L - hw + hw * Math.sin(a1));
    }
    // plunger lane wall and its floor
    seg(laneX, 0, laneX, laneTop);
    seg(laneX, 0, hw, 0);
    this.gate = { ax: laneX, ay: laneTop, bx: hw, by: laneTop + 3.2, oneWay: true };
    // flippers: pivots either side of the centre line
    const pw = 6, off = 4.7;
    this.flippers.push({ pu: C - off, pw, side: -1, a: PIN.flipRest, av: 0 });
    this.flippers.push({ pu: C + off, pw, side: 1, a: PIN.flipRest, av: 0 });
    // inlane guides down onto the flippers, and the walls that close the outlanes
    seg(-hw, 13, C - off - 0.2, pw + 0.4);
    seg(laneX, 13, C + off + 0.2, pw + 0.4);
    // the cave: a tunnel mouth facing down the table
    const cu = PIN.caveU, cw = PIN.caveW, ch = PIN.caveHalf + 0.6;
    seg(cu - ch, cw, cu - ch, cw + PIN.caveDepth);
    seg(cu + ch, cw, cu + ch, cw + PIN.caveDepth);
    // a peaked roof: nothing can come to rest on top of the cave
    seg(cu - ch, cw + PIN.caveDepth, cu, cw + PIN.caveDepth + 1.8);
    seg(cu, cw + PIN.caveDepth + 1.8, cu + ch, cw + PIN.caveDepth);
    // pop bumpers
    this.bumpers.push({ u: C - 5.2, w: 22, flash: 0 }, { u: C + 4.6, w: 23.5, flash: 0 }, { u: C - 3.6, w: 30.5, flash: 0 });
    this.toPlunger();
  }

  /** Flipper tip in table coordinates. */
  flipperTip(f: { pu: number; pw: number; side: number; a: number }) {
    // side -1 (left) points right-and-down; side +1 points left-and-down
    const ang = f.side < 0 ? f.a : Math.PI - f.a;
    return { u: f.pu + Math.cos(ang) * PIN.flipLen, w: f.pw + Math.sin(ang) * PIN.flipLen };
  }

  toPlunger() {
    this.phase = 'plunger'; this.inLane = true; this.pull = 0;
    this.u = (PIN.laneX + PIN.W / 2) / 2; this.w = this.r + 0.6; this.vu = 0; this.vw = 0;
  }

  /** Swipe up: draw the plunger back, then let it fly. */
  fire() { if (this.phase === 'plunger') { this.phase = 'pull'; this.pull = 0; } }

  step(dt: number, flipL: boolean, flipR: boolean) {
    this.events.length = 0;
    const n = Math.max(1, Math.ceil(dt / (1 / 480)));
    const h = dt / n;
    for (let i = 0; i < n; i++) this.sub(h, flipL, flipR);
  }

  private sub(h: number, flipL: boolean, flipR: boolean) {
    this.time += h;
    for (const b of this.bumpers) b.flash = Math.max(0, b.flash - h * 4);
    // flippers swing toward up/rest
    for (const f of this.flippers) {
      const want = (f.side < 0 ? flipL : flipR) ? PIN.flipUp : PIN.flipRest;
      const prev = f.a;
      const d = want - f.a;
      const stepA = Math.sign(d) * Math.min(Math.abs(d), PIN.flipSpeed * h);
      if (want === PIN.flipUp && prev === PIN.flipRest && stepA > 0) this.events.push({ type: 'flipper', strength: 1, index: f.side });
      f.a += stepA;
      f.av = stepA / h;
    }
    if (this.phase === 'plunger') { this.toPlungerHold(); return; }
    if (this.phase === 'pull') {
      this.pull = Math.min(1, this.pull + h / 0.32);
      this.w = this.r + 0.6 - this.pull * 0.9;
      if (this.pull >= 1) {
        this.phase = 'play';
        this.vw = 33 + Math.random() * 4; this.vu = 0;
        this.events.push({ type: 'plunger', strength: 1 });
      }
      return;
    }
    if (this.phase === 'cave') {
      // into the tunnel: on up the cave
      this.caveT += h;
      this.vu += (PIN.caveU - this.u) * 20 * h;
      this.vw = Math.max(this.vw, 14);
      this.u += this.vu * h; this.w += this.vw * h;
      if (this.caveT > 0.45) this.phase = 'done';
      return;
    }
    if (this.phase === 'done') return;

    // ---- free play ----
    this.vw -= PIN.gravity * h;
    if (!this.assist && (this.drains >= 2 || this.time > 40)) { this.assist = true; this.events.push({ type: 'assist', strength: 1 }); }
    if (this.assist && !this.inLane) {
      // the tractor beam: steer it in under the cave mouth, then up into it
      // (from above the cave, round the side and in from below)
      let tu: number, tw: number;
      if (this.w > PIN.caveW - 1) { tu = PIN.caveU + (this.u > PIN.caveU ? 6.5 : -6.5) - this.u; tw = PIN.caveW - 6 - this.w; }
      else if (Math.abs(this.u - PIN.caveU) > 1 && this.w > PIN.caveW - 5) { tu = PIN.caveU - this.u; tw = PIN.caveW - 6 - this.w; }
      else { tu = PIN.caveU - this.u; tw = PIN.caveW + 1 - this.w; }
      const d = Math.hypot(tu, tw) || 1;
      this.vu += ((tu / d) * 30 - this.vu * 1.2) * h;
      this.vw += ((tw / d) * 30 + PIN.gravity - this.vw * 1.2) * h;
    }
    this.u += this.vu * h; this.w += this.vw * h;
    if (this.inLane && this.u < PIN.laneX - this.r - 0.2 && this.w > PIN.laneTop) this.inLane = false;
    if (this.inLane && this.w < this.r + 0.6 && this.vw <= 0) { this.toPlunger(); return; } // fell back: shoot again

    // collisions
    const r = this.r;
    for (const s of this.walls) this.collideSeg(s, r, 0, 0, 0);
    if (!this.inLane) this.collideSeg(this.gate, r, 0, 0, 0);
    for (const f of this.flippers) {
      const tip = this.flipperTip(f);
      const hit = this.collideSeg({ ax: f.pu, ay: f.pw, bx: tip.u, by: tip.w }, r + PIN.flipR, f.av * (f.side < 0 ? 1 : -1), f.pu, f.pw);
      if (hit > 2 && Math.abs(f.av) > 1) this.events.push({ type: 'flipper', strength: Math.min(1, hit / 20) });
    }
    for (let k = 0; k < this.bumpers.length; k++) {
      const b = this.bumpers[k];
      const du = this.u - b.u, dw = this.w - b.w, d = Math.hypot(du, dw);
      const min = r + PIN.bumperR;
      if (d < min && d > 1e-6) {
        const nu = du / d, nw = dw / d;
        this.u = b.u + nu * min; this.w = b.w + nw * min;
        const vn = this.vu * nu + this.vw * nw;
        const out = Math.max(PIN.bumperKick, -vn * 0.8 + PIN.bumperKick * 0.6);
        this.vu += (out - vn) * nu; this.vw += (out - vn) * nw;
        b.flash = 1; this.bumperHits++;
        this.events.push({ type: 'bumper', strength: 1, index: k });
      }
    }
    // speed limit (keeps the toy stable)
    const sp = Math.hypot(this.vu, this.vw);
    if (sp > 45) { this.vu *= 45 / sp; this.vw *= 45 / sp; }
    // the cave
    if (Math.abs(this.u - PIN.caveU) < PIN.caveHalf && this.w > PIN.caveW - r * 0.3 && this.w < PIN.caveW + 2 && this.vw > 0) {
      this.phase = 'cave'; this.caveT = 0; this.events.push({ type: 'cave', strength: 1 });
    }
    // drained
    if (this.w < -3) { this.drains++; this.events.push({ type: 'drain', strength: 1 }); this.toPlunger(); }
  }

  private toPlungerHold() { this.w = this.r + 0.6; this.vu = 0; this.vw = 0; }

  /**
   * Ball vs a segment (thickness `rad` around the line). The segment may be
   * rotating about (ou, ow) at angular speed av (flippers): the surface
   * velocity is added to the bounce. Returns the impact speed.
   */
  private collideSeg(s: Seg, rad: number, av: number, ou: number, ow: number): number {
    const ex = s.bx - s.ax, ey = s.by - s.ay;
    const len2 = ex * ex + ey * ey;
    let t = ((this.u - s.ax) * ex + (this.w - s.ay) * ey) / len2;
    t = Math.max(0, Math.min(1, t));
    const px = s.ax + ex * t, py = s.ay + ey * t;
    let nu = this.u - px, nw = this.w - py;
    const d = Math.hypot(nu, nw);
    if (d >= rad || d < 1e-9) return 0;
    nu /= d; nw /= d;
    if (s.oneWay) {
      // the gate only blocks from the playfield side (its left/upper side)
      const side = (this.u - s.ax) * ey - (this.w - s.ay) * ex;
      if (side > 0) return 0;
    }
    this.u = px + nu * rad; this.w = py + nw * rad;
    // surface velocity of a rotating segment at the contact point
    const su = av ? -av * (py - ow) : 0, sw = av ? av * (px - ou) : 0;
    const rvu = this.vu - su, rvw = this.vw - sw;
    const vn = rvu * nu + rvw * nw;
    if (vn >= 0) return 0;
    const e = PIN.restitution;
    this.vu -= (1 + e) * vn * nu; this.vw -= (1 + e) * vn * nw;
    // a little rolling friction along walls
    if (!av) { const tu = -nw, tw = nu; const vt = this.vu * tu + this.vw * tw; this.vu -= vt * 0.02 * tu; this.vw -= vt * 0.02 * tw; }
    if (!av && -vn > 6) this.events.push({ type: 'wall', strength: Math.min(1, -vn / 25) });
    return -vn;
  }
}
