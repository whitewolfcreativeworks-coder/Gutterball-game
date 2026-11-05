import { Vector3 } from 'three';

/**
 * Ghost runs: race your previous run, or save your best runs to race or
 * watch later.
 *
 * A ghost is just the ball's WORLD position sampled 20 times a second from
 * launch. Because it is world positions (not inputs), it follows whichever
 * route you took and never drifts out of sync, and a saved run still plays
 * back after the physics is tuned.
 */
export const GHOST_HZ = 20;
export const MAX_SAVED = 10;

export interface GhostRun {
  course: string;
  time: number;        // finish time (s)
  date: number;        // when it was run (ms since epoch)
  falls: number;
  pts: Float32Array;   // x,y,z per sample, sample k at t = k / GHOST_HZ
}

export class GhostRecorder {
  private pts: number[] = [];
  private next = 0;
  private lastT = -1;
  private last = new Vector3();
  reset() { this.pts = []; this.next = 0; this.lastT = -1; }
  /** Record the ball at run time t (call every frame while running). */
  sample(t: number, p: Vector3) {
    // each 1/20 s tick gets the position at exactly that time, interpolated
    // between frames (a respawn jump is not interpolated)
    const jump = this.lastT < 0 || this.last.distanceTo(p) > 12;
    while (t >= this.next) {
      const u = jump || t <= this.lastT ? 1 : (this.next - this.lastT) / (t - this.lastT);
      this.pts.push(this.last.x + (p.x - this.last.x) * u, this.last.y + (p.y - this.last.y) * u, this.last.z + (p.z - this.last.z) * u);
      this.next += 1 / GHOST_HZ;
    }
    this.lastT = t; this.last.copy(p);
  }
  get length() { return this.pts.length / 3; }
  finish(course: string, time: number, falls: number): GhostRun {
    return { course, time, date: Date.now(), falls, pts: new Float32Array(this.pts) };
  }
}

/** Where the ghost is at run time t (Catmull-Rom between samples; holds at the ends). */
export function ghostPos(g: GhostRun, t: number, out: Vector3): Vector3 {
  const n = g.pts.length / 3;
  if (n === 0) return out.set(0, 0, 0);
  const f = Math.max(0, Math.min(n - 1, t * GHOST_HZ));
  const i = Math.min(n - 2, Math.floor(f)), u = f - Math.max(0, i);
  if (n < 2) return out.set(g.pts[0], g.pts[1], g.pts[2]);
  const at = (k: number, c: number) => g.pts[Math.max(0, Math.min(n - 1, k)) * 3 + c];
  const u2 = u * u, u3 = u2 * u;
  const cr = (c: number) => {
    const p0 = at(i - 1, c), p1 = at(i, c), p2 = at(i + 1, c), p3 = at(i + 2, c);
    // a respawn is a jump: don't swing the curve through it
    if (Math.abs(p2 - p1) > 12) return u < 0.5 ? p1 : p2;
    return 0.5 * (2 * p1 + (-p0 + p2) * u + (2 * p0 - 5 * p1 + 4 * p2 - p3) * u2 + (-p0 + 3 * p1 - 3 * p2 + p3) * u3);
  };
  return out.set(cr(0), cr(1), cr(2));
}

// ---- compact storage: int16 deltas in 2 cm units, with an escape for jumps ----
const Q = 0.02;
const ESC = -32768;

export function encodeGhost(g: GhostRun): string {
  const n = g.pts.length / 3;
  const buf = new DataView(new ArrayBuffer(12 + n * 18));
  let o = 0;
  const f32 = (v: number) => { buf.setFloat32(o, v, true); o += 4; };
  const i16 = (v: number) => { buf.setInt16(o, v, true); o += 2; };
  let px = 0, py = 0, pz = 0; // reconstructed position (so rounding never accumulates)
  for (let k = 0; k < n; k++) {
    const x = g.pts[k * 3], y = g.pts[k * 3 + 1], z = g.pts[k * 3 + 2];
    const dx = Math.round((x - px) / Q), dy = Math.round((y - py) / Q), dz = Math.round((z - pz) / Q);
    if (k === 0 || Math.max(Math.abs(dx), Math.abs(dy), Math.abs(dz)) > 32000) {
      if (k > 0) { i16(ESC); i16(ESC); i16(ESC); }
      f32(x); f32(y); f32(z); px = x; py = y; pz = z;
    } else {
      i16(dx); i16(dy); i16(dz); px += dx * Q; py += dy * Q; pz += dz * Q;
    }
  }
  const bytes = new Uint8Array(buf.buffer, 0, o);
  let s = '';
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s);
}

export function decodeGhost(data: string, meta: Omit<GhostRun, 'pts'>): GhostRun {
  const raw = atob(data);
  const bytes = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
  const dv = new DataView(bytes.buffer);
  const pts: number[] = [];
  let o = 0, x = 0, y = 0, z = 0, first = true;
  while (o < bytes.length) {
    if (first) { x = dv.getFloat32(o, true); y = dv.getFloat32(o + 4, true); z = dv.getFloat32(o + 8, true); o += 12; first = false; }
    else {
      const dx = dv.getInt16(o, true), dy = dv.getInt16(o + 2, true), dz = dv.getInt16(o + 4, true); o += 6;
      if (dx === ESC && dy === ESC && dz === ESC) { x = dv.getFloat32(o, true); y = dv.getFloat32(o + 4, true); z = dv.getFloat32(o + 8, true); o += 12; }
      else { x += dx * Q; y += dy * Q; z += dz * Q; }
    }
    pts.push(x, y, z);
  }
  return { ...meta, pts: new Float32Array(pts) };
}

/** Saved runs: the 10 fastest per course, kept on this device. */
export interface SavedRunMeta { course: string; time: number; date: number; falls: number; }
interface Stored extends SavedRunMeta { data: string; }

export class GhostStore {
  constructor(private storage: Pick<Storage, 'getItem' | 'setItem'> | null = typeof localStorage !== 'undefined' ? localStorage : null) {}
  private key(course: string) { return `gb.runs.${course}`; }
  private read(course: string): Stored[] {
    try { const v = JSON.parse(this.storage?.getItem(this.key(course)) ?? '[]'); return Array.isArray(v) ? v : []; } catch { return []; }
  }
  private write(course: string, list: Stored[]): boolean {
    try { this.storage?.setItem(this.key(course), JSON.stringify(list)); return true; } catch { return false; }
  }
  list(course: string): SavedRunMeta[] {
    return this.read(course).map(({ data: _d, ...m }) => m);
  }
  load(course: string, date: number): GhostRun | null {
    const r = this.read(course).find((s) => s.date === date);
    if (!r) return null;
    try { const { data, ...m } = r; return decodeGhost(data, m); } catch { return null; }
  }
  /** Save a run; returns its rank (1 = fastest) or 0 if it isn't one of the 10 best (or didn't fit). */
  save(g: GhostRun): number {
    const list = this.read(g.course).filter((s) => s.date !== g.date);
    const entry: Stored = { course: g.course, time: g.time, date: g.date, falls: g.falls, data: encodeGhost(g) };
    list.push(entry);
    list.sort((a, b) => a.time - b.time);
    const kept = list.slice(0, MAX_SAVED);
    const rank = kept.indexOf(entry) + 1;
    if (rank === 0) return 0;
    return this.write(g.course, kept) ? rank : 0;
  }
  /** Would this time make the top 10? */
  qualifies(course: string, time: number): boolean {
    const l = this.read(course);
    return l.length < MAX_SAVED || time < l[l.length - 1].time;
  }
  isSaved(course: string, date: number) { return this.read(course).some((s) => s.date === date); }
  remove(course: string, date: number) { this.write(course, this.read(course).filter((s) => s.date !== date)); }
}
