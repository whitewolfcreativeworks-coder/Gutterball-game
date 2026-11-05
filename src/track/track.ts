import { Quaternion, Vector3 } from 'three';
import { DEFAULT_PROFILE, GutterProfile, shellSDF, channelDepth } from './profile';

/**
 * Track construction by "turtle" integration.
 *
 * The centreline is integrated from heading (yaw about world up), pitch
 * (about the local right axis) and bank (roll about the forward axis). Every
 * angle is eased with smootherstep inside its segment, so curvature and bank
 * rate are continuous at segment boundaries — no kinks, no snag points.
 *
 * Because orientation is built from stored angles rather than re-derived from
 * vectors, frames never accumulate twist, and pitching through 360 degrees
 * produces a correct inverted loop.
 *
 * Local frame per sample:  T = forward, U = gutter "up" (floor normal),
 * R = right.  Coordinates: Three.js, world +Y up, default forward = -Z.
 */

export interface Segment {
  len: number;
  yaw?: number;       // total heading change in degrees (+ = left)
  pitch?: number;     // pitch at end of segment, degrees (- = downhill)
  bank?: number;      // bank at end of segment, degrees (+ = tilt toward left)
  loop?: boolean;     // add a full 360-degree pitch rotation through the segment
  roll?: number;      // add whole 360-degree rolls around the path (heartline/inline roll; + = to the left)
  shift?: number;     // lateral offset applied smoothly across segment (metres, + = right)
  tunnel?: boolean;   // closed roof
  gap?: boolean;      // no gutter here (must be jumped)
  openSky?: boolean;  // containment walls stop above the rim (fly-off-course zone)
  tube?: boolean;     // the walls curl over and close into a full pipe
  lift?: number;      // chain lift: carries the ball uphill at this speed (m/s)
  wall?: { L?: number; R?: number }; // extra wall height (m) on each side here (vert walls)
  widen?: number;     // the floor widens by this factor (funnel bowls; eased in and out)
  exact?: boolean;    // keep this segment exactly as written (solved geometry): no flow limits
  steep?: boolean;    // a deliberate plunge (lift-hill drops) may go past the normal steepness limit
  warp?: number;      // top speed the tube's air current pushes you to here (m/s; default: full warp)
  /**
   * Fractal motion for this section (visual only):
   *  flow  +1 = streams WITH you at your speed (feels locked to the ball),
   *        -1 = streams AGAINST you (rushes toward you), 0 = none;
   *  pulse 0..1 push-pull breathing (the pattern zooms in and out);
   *  twist  spin around the gutter (+/- direction, ~1 = moderate).
   */
  fx?: { flow?: number; pulse?: number; twist?: number };
  label?: string;
}

export interface ObstacleSpec {
  at?: string;        // optional segment label; s is then relative to that segment's start
  s: number;          // arc length of centre
  x: number;          // lateral centre
  y?: number;         // bottom height above floor (default 0)
  ls: number;         // length along track
  w: number;          // width
  h: number;          // height
  kind?: 'block' | 'barrier' | 'gate' | 'post';
  /** Moving obstacle: slides side to side, x = x0 + amp * sin(2π t / period + phase). */
  move?: { amp: number; period: number; phase?: number };
}

export interface HintSpec { at?: string; s: number; text: string; }

export interface CourseLayout {
  id: string;
  name: string;
  segments: Segment[];
  obstacles: ObstacleSpec[];
  hints: HintSpec[];
  checkpointEvery?: number;
  profile?: GutterProfile;
  startPos?: [number, number, number];
  /** Starting heading/pitch/bank in degrees (branches inherit these from their fork). */
  startAngles?: [number, number, number];
  /** Open ends have no end wall (branches you jump into / drop out of). */
  openStart?: boolean;
  openEnd?: boolean;
  /** Signs over the track (fork arches): label text at a segment-relative position. */
  signs?: { at: string; s: number; text: string }[];
  /** This gutter ends at its own finish line (the main course, and alternate routes). */
  finishLine?: boolean;
  /** Alternative routes that leave this course (and rejoin it, or run to their own finish). */
  branches?: BranchSpec[];
}

/** A branch gutter that starts near a point on the main course, offset in that point's frame. */
export interface BranchSpec {
  id: string;
  name: string;
  at: string;               // segment label on the parent course
  /** Parent route (branch id) this one forks from; default: the main course. */
  from?: string;
  /** An alternate ROUTE: never rejoins, runs all the way to its own finish line. */
  toFinish?: boolean;
  s: number;                // offset from that segment's start
  offset: [number, number]; // [right, up] metres from the main floor centre
  /** Extra pitch (degrees) at the branch start relative to the main course. */
  pitchOffset?: number;
  segments: Segment[];
  obstacles?: ObstacleSpec[];
  hints?: HintSpec[];
  /**
   * Y-junction length (metres). At a joined end the branch and the main course
   * share one hollow for this distance, so you can roll from one into the other
   * (a tube that splits in two, or two tubes that merge back into one).
   */
  junction?: number | 'auto';
  /** Snap the branch's end onto this main-course point: the branch merges back in. */
  rejoin?: { at: string; s: number } | 'auto';
}

/** A stretch where two tracks share their hollow (free space is the union of both). */
export interface Junction { a: number; b: number; aS: [number, number]; bS: [number, number]; }

export interface Obstacle extends ObstacleSpec { y: number; kind: 'block' | 'barrier' | 'gate' | 'post'; }

export class Track {
  readonly ds = 0.5;
  readonly n: number;
  readonly length: number;
  readonly profile: GutterProfile;
  // Packed per-sample data
  readonly P: Float64Array; // positions
  readonly T: Float64Array; // forward
  readonly U: Float64Array; // up
  readonly R: Float64Array; // right
  readonly tunnel: Uint8Array;
  /** yaw, pitch, bank in degrees per sample (lets branches inherit orientation). */
  readonly angles: Float64Array;
  readonly gap: Uint8Array;
  readonly openSky: Uint8Array;
  /** 0 = open gutter .. 1 = closed tube, eased over ~24 m at each end. */
  readonly tubeK: Float32Array;
  /** Per-sample tube current top speed (0 = default warp). */
  readonly warpCap: Float32Array;
  /** Per-sample chain-lift speed (0 = none). */
  readonly lift: Float32Array;
  /** Wall height (m above the floor) on the left and right, per sample: raised on the outside of corners. */
  readonly wallL: Float32Array;
  /** Explicit extra wall height per sample (from Segment.wall). */
  private wallXL: Float32Array; private wallXR: Float32Array;
  /** Floor-width factor per sample (1 = the standard gutter). */
  readonly widen: Float32Array;
  readonly wallR: Float32Array;
  /** Per-sample fractal motion [flow, pulse, twist], smoothed between sections. */
  readonly fxMode: Float32Array;
  readonly obstacles: Obstacle[];
  readonly hints: HintSpec[];
  readonly checkpoints: number[];
  readonly segmentStarts: { s: number; label?: string }[] = [];
  readonly layout: CourseLayout;

  constructor(layout: CourseLayout) {
    this.layout = { ...layout, segments: applyFlowLimits(layout.segments) };
    layout = this.layout;
    this.profile = layout.profile ?? DEFAULT_PROFILE;
    const total = layout.segments.reduce((a, s) => a + s.len, 0);
    this.n = Math.floor(total / this.ds) + 1;
    this.length = (this.n - 1) * this.ds;
    this.P = new Float64Array(this.n * 3);
    this.T = new Float64Array(this.n * 3);
    this.U = new Float64Array(this.n * 3);
    this.R = new Float64Array(this.n * 3);
    this.tunnel = new Uint8Array(this.n);
    this.angles = new Float64Array(this.n * 3);
    this.gap = new Uint8Array(this.n);
    this.openSky = new Uint8Array(this.n);
    this.fxMode = new Float32Array(this.n * 3);
    this.tubeK = new Float32Array(this.n);
    this.warpCap = new Float32Array(this.n);
    this.lift = new Float32Array(this.n);
    this.wallXL = new Float32Array(this.n); this.wallXR = new Float32Array(this.n);
    this.widen = new Float32Array(this.n).fill(1);
    this.build();
    {
      // the walls curl closed gradually: box filter (+-12 m), then ease
      const src = this.tubeK.slice();
      const win = 24;
      for (let i = 0; i < this.n; i++) {
        let a = 0, w = 0;
        for (let j = i - win; j <= i + win; j++) { a += src[Math.max(0, Math.min(this.n - 1, j))]; w++; }
        const k = a / w;
        this.tubeK[i] = k < 0.002 ? 0 : k > 0.998 ? 1 : k * k * (3 - 2 * k);
      }
    }
    this.wallL = new Float32Array(this.n).fill(this.profile.H);
    this.wallR = new Float32Array(this.n).fill(this.profile.H);
    // ease the floor width in and out over ~30 m
    {
      const src = this.widen.slice(), win = Math.round(15 / this.ds);
      for (let i = 0; i < this.n; i++) {
        let a = 0, c = 0;
        for (let j = Math.max(0, i - win); j <= Math.min(this.n - 1, i + win); j++) { a += src[j]; c++; }
        this.widen[i] = a / c;
      }
    }
    this.raiseCornerWalls();
    // blend fractal motion across ~16 m so sections morph into each other
    {
      const src = this.fxMode.slice();
      const win = 16;
      for (let i = 0; i < this.n; i++) {
        let a = 0, b = 0, c = 0, w = 0;
        for (let j = Math.max(0, i - win); j <= Math.min(this.n - 1, i + win); j++) { a += src[j * 3]; b += src[j * 3 + 1]; c += src[j * 3 + 2]; w++; }
        this.fxMode[i * 3] = a / w; this.fxMode[i * 3 + 1] = b / w; this.fxMode[i * 3 + 2] = c / w;
      }
    }
    const base = (label?: string) => {
      if (!label) return 0;
      const seg = this.segmentStarts.find((g) => g.label === label);
      if (!seg) throw new Error(`Unknown segment label ${label}`);
      return seg.s;
    };
    // every obstacle drifts at least a little, side to side and very slowly, so a
    // ball can never sit wedged against one (sliders keep their own motion)
    this.obstacles = layout.obstacles.map((o, k) => ({
      ...o, s: base(o.at) + o.s, y: o.y ?? 0, kind: o.kind ?? 'block',
      move: o.move ?? { amp: 0.35, period: 9 + (k % 5) * 1.3, phase: k * 1.7 },
    }));
    this.hints = layout.hints.map((h) => ({ ...h, s: base(h.at) + h.s })).sort((a, b) => a.s - b.s);
    const every = layout.checkpointEvery ?? 160;
    this.checkpoints = [6];
    for (let s = every; s < this.length - 40; s += every) {
      // never place a checkpoint inside a gap, loop or tunnel-roofed section start
      let c = s;
      while (c < this.length - 40 && (this.gap[this.idx(c)] || this.isSteepOrInverted(c))) c += 5;
      if (c < this.length - 40) this.checkpoints.push(c);
    }
  }

  /**
   * Bank the corners like a racing line: in a turn of radius R a ball at
   * cruising speed v rides up the wall to the angle where tan(theta) = v^2 / (gR).
   * Where that is steep, the OUTSIDE wall (and its lip) is built up so you
   * can carry your speed high round the corner instead of hitting the rim.
   */
  private raiseCornerWalls() {
    // sized for thumb-push speeds (~245 km/h): the line a fast ball takes round each bend
    const n = this.n, ds = this.ds, v = 68, g = 9.81, maxExtra = 12;
    const extraL = new Float32Array(n), extraR = new Float32Array(n);
    for (let i = 2; i < n - 2; i++) {
      if (this.tubeK[i] > 0.02 || this.tunnel[i] || this.gap[i]) continue;
      const dyaw = (this.angles[(i + 2) * 3] - this.angles[(i - 2) * 3]) / (4 * ds);   // deg per metre (+ = left)
      if (Math.abs(dyaw) < 0.05) continue;
      const kappa = Math.abs(dyaw) * Math.PI / 180;
      const theta = Math.atan(v * v * kappa / g) * 180 / Math.PI;
      const bankHelp = this.angles[i * 3 + 2] * Math.sign(dyaw);                          // bank tilted toward the inside helps
      const e = Math.max(0, Math.min(1, (theta - bankHelp - 40) / 30)) * maxExtra;
      if (dyaw > 0) extraR[i] = e; else extraL[i] = e;                                     // left turn: ball is flung right
    }
    // build up ahead of and after each corner (max over +-14 m), then taper smoothly (box +-10 m)
    const spread = (src: Float32Array) => {
      const m = new Float32Array(n), out = new Float32Array(n), w1 = 28, w2 = 20;
      for (let i = 0; i < n; i++) { let mx = 0; for (let j = Math.max(0, i - w1); j <= Math.min(n - 1, i + w1); j++) mx = Math.max(mx, src[j]); m[i] = mx; }
      for (let i = 0; i < n; i++) { let a = 0, c = 0; for (let j = Math.max(0, i - w2); j <= Math.min(n - 1, i + w2); j++) { a += m[j]; c++; } out[i] = a / c; }
      return out;
    };
    // explicit walls (vert walls) win where they are taller
    for (let i = 0; i < n; i++) { extraL[i] = Math.max(extraL[i], this.wallXL[i]); extraR[i] = Math.max(extraR[i], this.wallXR[i]); }
    const sl = spread(extraL), sr = spread(extraR);
    for (let i = 0; i < n; i++) {
      const open = 1 - Math.min(1, this.tubeK[i] * 20);                                   // never inside or entering tubes
      if (this.tunnel[i]) continue;
      this.wallL[i] = this.profile.H + sl[i] * open;
      this.wallR[i] = this.profile.H + sr[i] * open;
    }
  }

  /** The cross-section at arc length s (wider in funnel bowls). */
  profileAt(s: number): GutterProfile {
    const w = this.widenAt(s);
    if (w < 1.0005) return this.profile;
    return { ...this.profile, a: this.profile.a * w };
  }
  /**
   * Floor-width factor at s, interpolated linearly between samples. It must be
   * continuous along the course: any step in the width is a tiny wall across
   * the track to the collision normal, and a fast ball would run into it.
   */
  widenAt(s: number): number {
    const f = Math.max(0, Math.min(this.n - 1.001, s / this.ds));
    const i = Math.floor(f), u = f - i;
    return this.widen[i] + (this.widen[i + 1] - this.widen[i]) * u;
  }
  private profScratch: GutterProfile = { ...DEFAULT_PROFILE };
  /** Same as profileAt, without allocating (for the hot collision path). */
  private profileAtFast(s: number): GutterProfile {
    const w = this.widenAt(s);
    if (w < 1.0005) return this.profile;
    const p = this.profScratch;
    p.a = this.profile.a * w; p.rc = this.profile.rc; p.H = this.profile.H; p.th = this.profile.th; p.lip = this.profile.lip;
    return p;
  }
  /** Half-width of the channel at arc length s. */
  halfWidthAt(s: number) { const p = this.profileAt(s); return p.a + p.rc; }

  /** Visible wall heights [left, right] at arc length s. */
  wallsAt(s: number): [number, number] { return [this.wallAt(this.wallL, s), this.wallAt(this.wallR, s)]; }
  /** Wall height interpolated along the course (a stepped wall top is a row of tiny ledges to the collision normal). */
  private wallAt(arr: Float32Array, s: number) {
    const f = Math.max(0, Math.min(this.n - 1.001, s / this.ds));
    const i = Math.floor(f), u = f - i;
    return arr[i] + (arr[i + 1] - arr[i]) * u;
  }

  private idx(s: number): number {
    return Math.max(0, Math.min(this.n - 1, Math.round(s / this.ds)));
  }

  isSteepOrInverted(s: number): boolean {
    const i = this.idx(s);
    return this.U[i * 3 + 1] < 0.85;
  }

  private build() {
    const qYaw = new Quaternion();
    const qPitch = new Quaternion();
    const qRoll = new Quaternion();
    const q = new Quaternion();
    const Y = new Vector3(0, 1, 0);
    const X = new Vector3(1, 0, 0);
    const Z = new Vector3(0, 0, 1);
    const t = new Vector3();
    const u = new Vector3();
    const r = new Vector3();
    const pos = new Vector3(...(this.layout.startPos ?? [0, 0, 0]));
    let [yaw, pitch, bank] = this.layout.startAngles ?? [0, 0, 0];
    let shiftPrev = 0;
    let sGlobal = 0;
    let i = 0;
    const ss = (x: number) => x * x * x * (x * (x * 6 - 15) + 10); // smootherstep

    let curOpen = false;
    let curFx: [number, number, number] = [0, 0, 0];
    const writeSample = (k: number, tunnel: boolean, gap: boolean) => {
      this.openSky[k] = curOpen ? 1 : 0;
      this.fxMode[k * 3] = curFx[0]; this.fxMode[k * 3 + 1] = curFx[1]; this.fxMode[k * 3 + 2] = curFx[2];
      this.angles[k * 3] = curYaw; this.angles[k * 3 + 1] = curPitch; this.angles[k * 3 + 2] = curBank;
      this.P[k * 3] = pos.x; this.P[k * 3 + 1] = pos.y; this.P[k * 3 + 2] = pos.z;
      this.T[k * 3] = t.x; this.T[k * 3 + 1] = t.y; this.T[k * 3 + 2] = t.z;
      this.U[k * 3] = u.x; this.U[k * 3 + 1] = u.y; this.U[k * 3 + 2] = u.z;
      this.R[k * 3] = r.x; this.R[k * 3 + 1] = r.y; this.R[k * 3 + 2] = r.z;
      this.tunnel[k] = tunnel ? 1 : 0;
      this.gap[k] = gap ? 1 : 0;
    };
    let curYaw = yaw, curPitch = pitch, curBank = bank;
    const frameAt = (yw: number, pt: number, bk: number) => {
      curYaw = yw; curPitch = pt; curBank = bk;
      const d = Math.PI / 180;
      qYaw.setFromAxisAngle(Y, yw * d);
      qPitch.setFromAxisAngle(X, pt * d);
      qRoll.setFromAxisAngle(Z, bk * d);
      q.copy(qYaw).multiply(qPitch).multiply(qRoll);
      t.set(0, 0, -1).applyQuaternion(q);
      u.set(0, 1, 0).applyQuaternion(q);
      r.set(1, 0, 0).applyQuaternion(q);
    };

    frameAt(yaw, pitch, bank);
    writeSample(0, false, false);
    this.tubeK[0] = this.layout.segments[0]?.tube ? 1 : 0;
    i = 1;
    for (const seg of this.layout.segments) {
      this.segmentStarts.push({ s: sGlobal, label: seg.label });
      const y0 = yaw, p0 = pitch, b0 = bank;
      const dy = seg.yaw ?? 0;
      const p1 = seg.pitch ?? pitch;
      const b1 = seg.bank ?? bank;
      const loopAdd = seg.loop ? 360 : 0;
      const rollAdd = (seg.roll ?? 0) * 360;
      const shift = seg.shift ?? 0;
      shiftPrev = 0;
      const steps = Math.round(seg.len / this.ds);
      for (let k = 1; k <= steps && i < this.n; k++) {
        const uu = k / steps;
        const um = (k - 0.5) / steps;
        // midpoint orientation for integration accuracy
        frameAt(y0 + dy * ss(um), p0 + (p1 - p0 + loopAdd) * ss(um), b0 + (b1 - b0 + rollAdd) * ss(um));
        // Integrate along the un-banked forward direction (bank does not change path)
        pos.addScaledVector(t, this.ds);
        const sh = shift * ss(uu);
        pos.addScaledVector(r, sh - shiftPrev);
        shiftPrev = sh;
        frameAt(y0 + dy * ss(uu), p0 + (p1 - p0 + loopAdd) * ss(uu), b0 + (b1 - b0 + rollAdd) * ss(uu));
        curOpen = !!seg.openSky || !!this.layout.openStart;
        curFx = [seg.fx?.flow ?? 0, seg.fx?.pulse ?? 0, seg.fx?.twist ?? 0];
        this.tubeK[i] = seg.tube ? 1 : 0;
        this.warpCap[i] = seg.warp ?? 0;
        this.lift[i] = seg.lift ?? 0;
        this.wallXL[i] = seg.wall?.L ?? 0; this.wallXR[i] = seg.wall?.R ?? 0;
        this.widen[i] = seg.widen ?? 1;
        writeSample(i, !!seg.tunnel, !!seg.gap);
        i++;
        sGlobal += this.ds;
      }
      yaw = y0 + dy;
      pitch = p1; // loops return to same pitch modulo 360
      bank = b1;
    }
    // Fill any remaining (rounding) samples
    for (; i < this.n; i++) {
      pos.addScaledVector(t, this.ds);
      this.tubeK[i] = this.tubeK[i - 1];
      writeSample(i, false, false);
    }
  }

  /** Read sample vectors into targets. */
  sample(i: number, P: Vector3, T?: Vector3, U?: Vector3, R?: Vector3) {
    const k = Math.max(0, Math.min(this.n - 1, i)) * 3;
    P.set(this.P[k], this.P[k + 1], this.P[k + 2]);
    T?.set(this.T[k], this.T[k + 1], this.T[k + 2]);
    U?.set(this.U[k], this.U[k + 1], this.U[k + 2]);
    R?.set(this.R[k], this.R[k + 1], this.R[k + 2]);
  }

  /** Interpolated frame at arc length s. */
  frameAtS(s: number, P: Vector3, T: Vector3, U: Vector3, R: Vector3) {
    const f = Math.max(0, Math.min(this.n - 1.0001, s / this.ds));
    const i = Math.floor(f);
    const a = f - i;
    const k0 = i * 3, k1 = (i + 1) * 3;
    const L = (arr: Float64Array, out: Vector3) =>
      out.set(arr[k0] + (arr[k1] - arr[k0]) * a, arr[k0 + 1] + (arr[k1 + 1] - arr[k0 + 1]) * a, arr[k0 + 2] + (arr[k1 + 2] - arr[k0 + 2]) * a);
    L(this.P, P); L(this.T, T).normalize(); L(this.U, U).normalize(); L(this.R, R).normalize();
  }

  isTunnel(s: number) { return this.tunnel[this.idx(s)] === 1; }
  /** Tube closure 0..1 at arc length s (interpolated). */
  tubeAt(s: number) {
    const f = Math.max(0, Math.min(this.n - 1.0001, s / this.ds));
    const i = Math.floor(f), a = f - i;
    return this.tubeK[i] + (this.tubeK[i + 1] - this.tubeK[i]) * a;
  }
  isTube(s: number) { return this.tubeAt(s) > 0.7; }
  /** Depth inside the open channel (> 0 inside), or -1e6 off this track. */
  channelDepthLocal(s: number, x: number, y: number): number {
    const s0 = this.layout.openStart ? 0 : -2, s1 = this.layout.openEnd ? this.length : this.length + 2;
    if (s < s0 || s > s1) return -1e6;
    return channelDepth(x, y, this.profileAtFast(s), this.tubeAt(s));
  }
  isGap(s: number) { return this.gap[this.idx(s)] === 1; }

  /**
   * Signed distance of a point given in track-local coordinates (s, x, y) to
   * the gutter shell plus obstacles. Returns positive outside material.
   */
  /** Simulation clock for moving obstacles (advanced by the ball physics). */
  time = 0;
  /** Lateral centre of an obstacle at time t (default: now). */
  obstacleX(ob: ObstacleSpec, t = this.time): number {
    return ob.move ? ob.x + ob.move.amp * Math.sin((2 * Math.PI * t) / ob.move.period + (ob.move.phase ?? 0)) : ob.x;
  }
  /** Lateral velocity of an obstacle now (m/s along R). */
  obstacleVX(ob: ObstacleSpec): number {
    if (!ob.move) return 0;
    const w = (2 * Math.PI) / ob.move.period;
    return ob.move.amp * w * Math.cos(w * this.time + (ob.move.phase ?? 0));
  }
  /** Lateral velocity of the obstacle nearest a local point (0 for static ones). */
  nearestObstacleVX(s: number, x: number, y: number): number {
    let d = 1e6, vx = 0;
    for (const ob of this.obstacles) {
      const ds = s - ob.s;
      if (Math.abs(ds) > ob.ls + 3) continue;
      const dd = boxSDF(ds, x - this.obstacleX(ob), y - (ob.y + ob.h / 2), ob.ls / 2, ob.w / 2, ob.h / 2, 0.06);
      if (dd < d) { d = dd; vx = this.obstacleVX(ob); }
    }
    return vx;
  }

  sdfLocal(s: number, x: number, y: number, includeObstacles = true, visibleOnly = false): number {
    let d = 1e6;
    const s0 = this.layout.openStart ? 0 : -2, s1 = this.layout.openEnd ? this.length : this.length + 2;
    if (s >= s0 && s <= s1 && !this.isGap(s)) { const ii = this.idx(s); d = shellSDF(x, y, this.profileAtFast(s), this.isTunnel(s), visibleOnly, this.openSky[ii] === 1, this.tubeAt(s), this.wallAt(this.wallL, s), this.wallAt(this.wallR, s)); }
    else if (!visibleOnly && s >= s0 && s <= s1 && this.isGap(s)) {
      // Over a gap there is no floor, but the invisible side walls continue:
      // you can fall into a gap, never escape sideways out of the course.
      const W = this.profile.a + this.profile.rc;
      d = Math.max(Math.abs(x) - (W + this.profile.th), W - Math.abs(x));
    }
    // End caps: a wall at the very start so the ball cannot roll backwards off
    const W0 = this.profile.a + this.profile.rc + 0.8;
    if (!this.layout.openStart && s < 0.5) d = Math.min(d, Math.max(s - 0.5, -s - 2, Math.abs(x) - W0, y - 4));
    // ...and a soft end wall after the run-out
    if (!this.layout.openEnd && s > this.length - 0.5) d = Math.min(d, Math.max(this.length - 0.5 - s, s - this.length - 2, Math.abs(x) - W0, y - 4));
    if (includeObstacles) {
      for (let o = 0; o < this.obstacles.length; o++) {
        const ob = this.obstacles[o];
        const ds = s - ob.s;
        if (ds > ob.ls + 2 || ds < -ob.ls - 2) continue;
        d = Math.min(d, boxSDF(ds, x - this.obstacleX(ob), y - (ob.y + ob.h / 2), ob.ls / 2, ob.w / 2, ob.h / 2, 0.06));
      }
    }
    return d;
  }

  /** Index of the obstacle the local point is closest to (for material/audio). */
  nearestObstacleDist(s: number, x: number, y: number): number {
    let d = 1e6;
    for (const ob of this.obstacles) {
      const ds = s - ob.s;
      if (Math.abs(ds) > ob.ls + 3) continue;
      d = Math.min(d, boxSDF(ds, x - this.obstacleX(ob), y - (ob.y + ob.h / 2), ob.ls / 2, ob.w / 2, ob.h / 2, 0.06));
    }
    return d;
  }
}

/** Rounded box SDF (half extents hx, hy, hz, rounding r). */
export function boxSDF(px: number, py: number, pz: number, hx: number, hy: number, hz: number, r: number): number {
  const qx = Math.abs(px) - hx + r;
  const qy = Math.abs(py) - hy + r;
  const qz = Math.abs(pz) - hz + r;
  const ox = Math.max(qx, 0), oy = Math.max(qy, 0), oz = Math.max(qz, 0);
  return Math.hypot(ox, oy, oz) + Math.min(Math.max(qx, qy, qz), 0) - r;
}

/**
 * Tracks the ball's projection onto the centreline. Keeps a hint index so
 * the search is local (essential where the track passes near itself, e.g.
 * through loops).
 */
export class TrackProjector {
  hint = 0;
  readonly P = new Vector3();
  readonly T = new Vector3();
  readonly U = new Vector3();
  readonly R = new Vector3();
  s = 0; x = 0; y = 0; along = 0;
  private c = new Vector3();
  private t = new Vector3();
  constructor(private track: Track) {}

  reset(s: number) { this.hint = Math.round(s / this.track.ds); }

  /** Global (coarse) search for the nearest sample — used when the ball teleports. */
  relocate(px: number, py: number, pz: number) {
    const tr = this.track;
    let best = 0, bd = Infinity;
    for (let i = 0; i < tr.n; i += 4) {
      const k = i * 3;
      const d = (px - tr.P[k]) ** 2 + (py - tr.P[k + 1]) ** 2 + (pz - tr.P[k + 2]) ** 2;
      if (d < bd) { bd = d; best = i; }
    }
    this.hint = best;
  }

  /** Project world point p; fills s, x, y and the interpolated frame. */
  project(px: number, py: number, pz: number) {
    const tr = this.track;
    const along = (i: number) => {
      const k = i * 3;
      return (px - tr.P[k]) * tr.T[k] + (py - tr.P[k + 1]) * tr.T[k + 1] + (pz - tr.P[k + 2]) * tr.T[k + 2];
    };
    let i = Math.max(0, Math.min(tr.n - 2, this.hint));
    let guard = 0;
    while (i > 0 && along(i) < 0 && guard++ < 400) i--;
    guard = 0;
    while (i < tr.n - 2 && along(i + 1) > 0 && guard++ < 400) i++;
    const a0 = along(i);
    const a1 = along(i + 1);
    let f = a0 - a1 !== 0 ? a0 / (a0 - a1) : 0;
    // Beyond the ends we extrapolate linearly
    if (i === 0 && a0 < 0) f = a0 / tr.ds;
    if (i === tr.n - 2 && a1 > 0) f = 1 + a1 / tr.ds;
    const fc = Math.max(0, Math.min(1, f));
    this.hint = i;
    this.s = (i + f) * tr.ds;
    tr.frameAtS((i + fc) * tr.ds, this.P, this.T, this.U, this.R);
    this.c.set(px, py, pz).sub(this.P);
    this.along = this.c.dot(this.T);
    this.x = this.c.dot(this.R);
    this.y = this.c.dot(this.U);
  }

  /** World point from local (s,x,y) using the current frame (valid near current s). */
  toWorld(dsAlong: number, x: number, y: number, out: Vector3) {
    return out.copy(this.P).addScaledVector(this.T, dsAlong).addScaledVector(this.R, x).addScaledVector(this.U, y);
  }
}

/** A course = the main gutter plus any branch gutters. */
export class Course {
  readonly main: Track;
  readonly branches: Track[] = [];
  readonly all: Track[];
  readonly junctions: Junction[] = [];
  /** Distance (m) each rejoining branch had to be nudged to meet the main course exactly. */
  readonly rejoinError: number[] = [];
  /** Distance along the course from the start to where each gutter begins (0 for the main course). */
  readonly startS: number[] = [0];
  constructor(layout: CourseLayout) {
    this.main = new Track({ ...layout, finishLine: true });
    for (const b of layout.branches ?? []) {
      // the parent gutter: the main course, or another route (splits can split again)
      const pi = b.from ? this.branches.findIndex((t) => t.layout.id === b.from) + 1 : 0;
      if (b.from && pi === 0) throw new Error(`Unknown parent route ${b.from} (list parents before their children)`);
      const parent = pi === 0 ? this.main : this.branches[pi - 1];
      const seg = parent.segmentStarts.find((g) => g.label === b.at);
      if (!seg) throw new Error(`Unknown branch anchor ${b.at}`);
      const s = seg.s + b.s;
      const P = new Vector3(), T = new Vector3(), U = new Vector3(), R = new Vector3();
      parent.frameAtS(s, P, T, U, R);
      const i = Math.round(s / parent.ds) * 3;
      const ang = parent.angles;
      const start = P.clone().addScaledVector(R, b.offset[0]).addScaledVector(U, b.offset[1]);
      const br = new Track({
        id: b.id, name: b.name, segments: b.segments, obstacles: b.obstacles ?? [], hints: b.hints ?? [],
        startPos: [start.x, start.y, start.z], startAngles: [ang[i], ang[i + 1] + (b.pitchOffset ?? 0), ang[i + 2]],
        openStart: true, openEnd: !b.toFinish, finishLine: !!b.toFinish, checkpointEvery: b.toFinish ? 220 : 1e9,
      });
      const bi = this.branches.length + 1;
      this.startS.push(this.startS[pi] + s);
      if (b.toFinish) {
        // where a route runs alongside, the parent gutter is open above its walls
        // too, so a big air can carry you across from one to the other
        for (let i = Math.round(s / parent.ds); i < Math.min(parent.n, Math.round((s + 420) / parent.ds)); i++) if (parent.tubeK[i] === 0 && !parent.tunnel[i]) parent.openSky[i] = 1;
      }
      let sEnd = -1;
      if (b.rejoin && !b.toFinish) {
        // Merge: spread a tiny correction along the branch so its end lands
        // exactly on the main course (the layout is designed to close to within
        // a few metres; the correction is a fraction of a degree of slope).
        if (b.rejoin === 'auto') {
          // the main-course point nearest the branch's end (searched downstream of the fork)
          const k0 = (br.n - 1) * 3;
          let bestD = Infinity;
          for (let i = Math.round(s / parent.ds) + 20; i < parent.n; i++) {
            const d = (parent.P[i * 3] - br.P[k0]) ** 2 + (parent.P[i * 3 + 1] - br.P[k0 + 1]) ** 2 + (parent.P[i * 3 + 2] - br.P[k0 + 2]) ** 2;
            if (d < bestD) { bestD = d; sEnd = i * parent.ds; }
          }
        } else {
          const rj = b.rejoin;
          const rs = parent.segmentStarts.find((g) => g.label === rj.at);
          if (!rs) throw new Error(`Unknown rejoin anchor ${rj.at}`);
          sEnd = rs.s + rj.s;
        }
        parent.frameAtS(sEnd, P, T, U, R);
        const k = (br.n - 1) * 3;
        const dx = P.x - br.P[k], dy = P.y - br.P[k + 1], dz = P.z - br.P[k + 2];
        this.rejoinError.push(Math.hypot(dx, dy, dz));
        for (let j = 0; j < br.n; j++) {
          const u = j / (br.n - 1);
          const w = u * u * u * (u * (u * 6 - 15) + 10);
          br.P[j * 3] += dx * w; br.P[j * 3 + 1] += dy * w; br.P[j * 3 + 2] += dz * w;
        }
      }
      if (b.junction) {
        let J0: number, J1: number;
        if (b.junction === 'auto') {
          // share the hollow until the two gutters have fully separated (centrelines > ~15 m apart)
          const sep = (i: number) => {
            let best = Infinity;
            const k = i * 3, from = Math.max(0, Math.round(s / parent.ds) - 40);
            for (let j = from; j < parent.n; j += 2) {
              const d = (parent.P[j * 3] - br.P[k]) ** 2 + (parent.P[j * 3 + 1] - br.P[k + 1]) ** 2 + (parent.P[j * 3 + 2] - br.P[k + 2]) ** 2;
              if (d < best) best = d;
            }
            return Math.sqrt(best);
          };
          let i0 = 0; while (i0 < br.n - 1 && sep(i0) < 15) i0 += 4;
          let i1 = br.n - 1; while (i1 > 0 && sep(i1) < 15) i1 -= 4;
          if (b.toFinish) i1 = br.n - 1;
          J0 = Math.min(br.length * 0.45, i0 * br.ds + 4);
          J1 = Math.min(br.length * 0.45, (br.n - 1 - i1) * br.ds + 4);
        } else { J0 = J1 = b.junction; }
        this.junctions.push({ a: pi, b: bi, aS: [s - 2, s + J0 + 2], bS: [0, J0] });
        if (sEnd >= 0) this.junctions.push({ a: pi, b: bi, aS: [sEnd - J1 - 2, sEnd + 2], bS: [br.length - J1, br.length] });
      }
      this.branches.push(br);
    }
    this.all = [this.main, ...this.branches];
  }
}


/**
 * FLOW LIMITS: the course should flow like a pinball tube, not jolt like a
 * coaster's quick jinks. Every segment is checked against limits a fast ball
 * can carry speed through, and stretched where it is tighter:
 *
 *  - turns: the sharpest point of a turn (the turtle's easing makes the
 *    middle ~1.875x tighter than average) is at least FLOW.turnR
 *  - crests (nose going down): radius at least FLOW.crestR, so you float
 *    rather than get flung; sags (nose coming up): at least FLOW.sagR
 *  - bank: changes no faster than FLOW.bankRate degrees per metre
 *  - steepness: no steeper than FLOW.maxDown degrees, except deliberate
 *    `steep` plunges (lift-hill drops)
 *
 * Loops, rolls and `exact` (solved) segments are left exactly as written.
 */
export const FLOW = { turnR: 32, crestR: 30, sagR: 22, bankRate: 2.5, maxDown: -55, peak: 1.875 };

export function applyFlowLimits(segs: Segment[]): Segment[] {
  const D = Math.PI / 180;
  let pitch = 0, bank = 0;
  return segs.map((seg) => {
    const p1raw = seg.pitch ?? pitch;
    const out: Segment = { ...seg };
    if (!seg.loop && !seg.roll && !seg.exact) {
      const p1 = seg.steep ? p1raw : Math.max(FLOW.maxDown, p1raw);
      out.pitch = seg.pitch === undefined ? undefined : p1;
      const dp = p1 - pitch;
      const b1 = seg.bank ?? bank;
      const need = Math.max(
        FLOW.peak * Math.abs(seg.yaw ?? 0) * D * FLOW.turnR,
        FLOW.peak * Math.abs(dp) * D * (dp < 0 ? FLOW.crestR : FLOW.sagR),
        Math.abs(b1 - bank) / FLOW.bankRate,
      );
      if (need > seg.len) out.len = Math.ceil(need);
    }
    pitch = out.pitch ?? pitch;
    bank = seg.bank ?? bank;
    return out;
  });
}
