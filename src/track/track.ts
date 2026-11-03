import { Quaternion, Vector3 } from 'three';
import { DEFAULT_PROFILE, GutterProfile, shellSDF } from './profile';

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
  shift?: number;     // lateral offset applied smoothly across segment (metres, + = right)
  tunnel?: boolean;   // closed roof
  gap?: boolean;      // no gutter here (must be jumped)
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
}

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
  readonly gap: Uint8Array;
  readonly obstacles: Obstacle[];
  readonly hints: HintSpec[];
  readonly checkpoints: number[];
  readonly segmentStarts: { s: number; label?: string }[] = [];
  readonly layout: CourseLayout;

  constructor(layout: CourseLayout) {
    this.layout = layout;
    this.profile = layout.profile ?? DEFAULT_PROFILE;
    const total = layout.segments.reduce((a, s) => a + s.len, 0);
    this.n = Math.floor(total / this.ds) + 1;
    this.length = (this.n - 1) * this.ds;
    this.P = new Float64Array(this.n * 3);
    this.T = new Float64Array(this.n * 3);
    this.U = new Float64Array(this.n * 3);
    this.R = new Float64Array(this.n * 3);
    this.tunnel = new Uint8Array(this.n);
    this.gap = new Uint8Array(this.n);
    this.build();
    const base = (label?: string) => {
      if (!label) return 0;
      const seg = this.segmentStarts.find((g) => g.label === label);
      if (!seg) throw new Error(`Unknown segment label ${label}`);
      return seg.s;
    };
    this.obstacles = layout.obstacles.map((o) => ({ ...o, s: base(o.at) + o.s, y: o.y ?? 0, kind: o.kind ?? 'block' }));
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

  private idx(s: number): number {
    return Math.max(0, Math.min(this.n - 1, Math.round(s / this.ds)));
  }

  private isSteepOrInverted(s: number): boolean {
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
    let yaw = 0, pitch = 0, bank = 0;
    let shiftPrev = 0;
    let sGlobal = 0;
    let i = 0;
    const ss = (x: number) => x * x * x * (x * (x * 6 - 15) + 10); // smootherstep

    const writeSample = (k: number, tunnel: boolean, gap: boolean) => {
      this.P[k * 3] = pos.x; this.P[k * 3 + 1] = pos.y; this.P[k * 3 + 2] = pos.z;
      this.T[k * 3] = t.x; this.T[k * 3 + 1] = t.y; this.T[k * 3 + 2] = t.z;
      this.U[k * 3] = u.x; this.U[k * 3 + 1] = u.y; this.U[k * 3 + 2] = u.z;
      this.R[k * 3] = r.x; this.R[k * 3 + 1] = r.y; this.R[k * 3 + 2] = r.z;
      this.tunnel[k] = tunnel ? 1 : 0;
      this.gap[k] = gap ? 1 : 0;
    };
    const frameAt = (yw: number, pt: number, bk: number) => {
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
    i = 1;
    for (const seg of this.layout.segments) {
      this.segmentStarts.push({ s: sGlobal, label: seg.label });
      const y0 = yaw, p0 = pitch, b0 = bank;
      const dy = seg.yaw ?? 0;
      const p1 = seg.pitch ?? pitch;
      const b1 = seg.bank ?? bank;
      const loopAdd = seg.loop ? 360 : 0;
      const shift = seg.shift ?? 0;
      shiftPrev = 0;
      const steps = Math.round(seg.len / this.ds);
      for (let k = 1; k <= steps && i < this.n; k++) {
        const uu = k / steps;
        const um = (k - 0.5) / steps;
        // midpoint orientation for integration accuracy
        frameAt(y0 + dy * ss(um), p0 + (p1 - p0 + loopAdd) * ss(um), b0 + (b1 - b0) * ss(um));
        // Integrate along the un-banked forward direction (bank does not change path)
        pos.addScaledVector(t, this.ds);
        const sh = shift * ss(uu);
        pos.addScaledVector(r, sh - shiftPrev);
        shiftPrev = sh;
        frameAt(y0 + dy * ss(uu), p0 + (p1 - p0 + loopAdd) * ss(uu), b0 + (b1 - b0) * ss(uu));
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
  isGap(s: number) { return this.gap[this.idx(s)] === 1; }

  /**
   * Signed distance of a point given in track-local coordinates (s, x, y) to
   * the gutter shell plus obstacles. Returns positive outside material.
   */
  sdfLocal(s: number, x: number, y: number, includeObstacles = true, visibleOnly = false): number {
    let d = 1e6;
    if (s >= -2 && s <= this.length + 2 && !this.isGap(s)) d = shellSDF(x, y, this.profile, this.isTunnel(s), visibleOnly);
    // End caps: a wall at the very start so the ball cannot roll backwards off
    if (s < 0.5) d = Math.min(d, Math.max(s - 0.5, -s - 2, Math.abs(x) - 5, y - 4));
    // ...and a soft end wall after the run-out
    if (s > this.length - 0.5) d = Math.min(d, Math.max(this.length - 0.5 - s, s - this.length - 2, Math.abs(x) - 5, y - 4));
    if (includeObstacles) {
      for (let o = 0; o < this.obstacles.length; o++) {
        const ob = this.obstacles[o];
        const ds = s - ob.s;
        if (ds > ob.ls + 2 || ds < -ob.ls - 2) continue;
        d = Math.min(d, boxSDF(ds, x - ob.x, y - (ob.y + ob.h / 2), ob.ls / 2, ob.w / 2, ob.h / 2, 0.06));
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
      d = Math.min(d, boxSDF(ds, x - ob.x, y - (ob.y + ob.h / 2), ob.ls / 2, ob.w / 2, ob.h / 2, 0.06));
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
