import { describe, expect, it } from 'vitest';
import { Vector3 } from 'three';
import { GhostRecorder, ghostPos, encodeGhost, decodeGhost, GhostStore, GHOST_HZ, MAX_SAVED } from '../src/game/ghost';
import { Course } from '../src/track/track';
import { BallPhysics } from '../src/physics/ball';
import { MATERIALS } from '../src/physics/materials';
import { Run } from '../src/game/run';
import { Autopilot } from '../src/game/autopilot';
import { CATALOG } from '../src/commerce/catalog';

class MemStorage { m = new Map<string, string>(); getItem(k: string) { return this.m.get(k) ?? null; } setItem(k: string, v: string) { this.m.set(k, v); } }

function fakeRun(time: number, date: number) {
  const rec = new GhostRecorder();
  for (let t = 0; t <= time; t += 1 / 60) rec.sample(t, new Vector3(Math.sin(t) * 5, -t * 3, -t * 30));
  return { ...rec.finish('wood', time, 0), date };
}

describe('ghost runs', () => {
  it('records at 20 Hz and plays back smoothly in time', () => {
    const g = fakeRun(10, 1);
    expect(g.pts.length / 3).toBeCloseTo(10 * GHOST_HZ + 1, -1);
    const p = ghostPos(g, 4.37, new Vector3());
    expect(p.distanceTo(new Vector3(Math.sin(4.37) * 5, -4.37 * 3, -4.37 * 30))).toBeLessThan(0.05);
    // holds at the ends
    expect(ghostPos(g, 99, new Vector3()).z).toBeCloseTo(g.pts[g.pts.length - 1], 3);
  });

  it('encodes compactly and decodes to within 2 cm, including respawn jumps', () => {
    const g = fakeRun(60, 1);
    g.pts[300 * 3 + 2] -= 2000; // a teleport
    const s = encodeGhost(g);
    expect(s.length).toBeLessThan((g.pts.length / 3) * 9); // ~8 chars a sample vs 16 for raw float32
    const d = decodeGhost(s, { course: 'wood', time: 60, date: 1, falls: 0 });
    expect(d.pts.length).toBe(g.pts.length);
    let worst = 0;
    for (let i = 0; i < g.pts.length; i++) worst = Math.max(worst, Math.abs(d.pts[i] - g.pts[i]));
    expect(worst).toBeLessThan(0.02);
  });

  it('keeps only the 10 fastest runs per course', () => {
    const st = new GhostStore(new MemStorage());
    for (let k = 0; k < 14; k++) st.save(fakeRun(30 + ((k * 5) % 14), 100 + k));
    const l = st.list('wood');
    expect(l.length).toBe(MAX_SAVED);
    expect(l.map((r) => r.time)).toEqual([...l.map((r) => r.time)].sort((a, b) => a - b));
    expect(l[l.length - 1].time).toBe(39);
    expect(st.qualifies('wood', 50)).toBe(false);
    expect(st.save(fakeRun(50, 999))).toBe(0);
    expect(st.save(fakeRun(29, 998))).toBe(1);
    const back = st.load('wood', 998)!;
    expect(back.time).toBe(29);
    st.remove('wood', 998);
    expect(st.isSaved('wood', 998)).toBe(false);
  });

  it('a recorded run replays along the same gutter (watch mode)', () => {
    const c = CATALOG.find((x) => x.id === 'wood')!;
    const course = new Course(c.layout());
    const run = new Run(course, MATERIALS.wood);
    const ap = new Autopilot(course.main);
    const rec = new GhostRecorder();
    run.launch();
    for (let f = 0; f < 60 * 40; f++) { run.update(1 / 60, ap.decide(run.ball)); run.pendingEvents.length = 0; rec.sample(run.time, run.ball.p); }
    const g = rec.finish('wood', run.time, 0);
    const b = new BallPhysics(course, MATERIALS.wood);
    b.placeAt(6, 0);
    let maxOff = 0;
    for (let t = 0; t < 39; t += 1 / 60) {
      const p = ghostPos(g, t, new Vector3());
      b.followGhost(p, 1 / 60);
      maxOff = Math.max(maxOff, Math.abs(b.proj.x));
      expect(b.p.distanceTo(p)).toBeLessThan(1e-6);
    }
    expect(b.proj.s).toBeGreaterThan(300);
    expect(maxOff).toBeLessThan(40);
  });
});
