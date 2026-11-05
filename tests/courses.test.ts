import { describe, expect, it } from 'vitest';
import { Course, Track } from '../src/track/track';
import { BallPhysics } from '../src/physics/ball';
import { MATERIALS } from '../src/physics/materials';
import { Run } from '../src/game/run';
import { Autopilot } from '../src/game/autopilot';
import { CATALOG } from '../src/commerce/catalog';

/**
 * Course validation: every course in the catalog must be completable by the
 * autopilot (which only uses player inputs) within a time limit.
 */
describe('courses are completable', () => {
  for (const c of CATALOG) {
    it(`${c.world}: ${c.name}`, () => {
      const tr = new Track(c.layout());
      const run = new Run(tr, MATERIALS[c.materialId]);
      const ap = new Autopilot(tr);
      run.launch();
      for (let f = 0; f < 60 * 300 && run.phase !== 'finished'; f++) {
        run.update(1 / 60, ap.decide(run.ball));
        run.pendingEvents.length = 0;
      }
      expect(run.phase).toBe('finished');
      expect(run.falls).toBeLessThanOrEqual(2);
      if (c.id === 'wood') expect(run.falls).toBe(0);
    });
  }
});

describe('the ball cannot leave the gutter (except by falling into a gap)', () => {
  const wood = CATALOG.find((c) => c.id === 'wood')!;
  for (const steer of [-1, 0, 1]) {
    it(`steering held at ${steer} through Timberline Run`, () => {
      const tr = new Track(wood.layout());
      const run = new Run(tr, MATERIALS.wood);
      const ap = new Autopilot(tr);
      run.launch();
      const W = tr.profile.a + tr.profile.rc;
      const nearGap = (s: number) => { for (let d = -60; d <= 10; d += 2) if (tr.isGap(s + d)) return true; return false; };
      let escapes = 0;
      for (let f = 0; f < 60 * 150 && run.phase !== 'finished'; f++) {
        const a = ap.decide(run.ball);
        run.update(1 / 60, { ...a, steer });
        run.pendingEvents.length = 0;
        const pr = run.ball.proj;
        // escaping = beside the gutter at or above floor level (a ball that fell through a gap is below it)
        // (flying above the containment ceiling after a big jump is allowed: that's the beam-rescue mechanic)
        // (built-up walls are open above their tops by design: clear one and you fly, the
        // beam brings you home; a NORMAL wall must never let the ball slip out)
        const Wl = run.ball.track.halfWidthAt(pr.s); void W;
        const near = (k: number) => { const [l, r] = run.ball.track.wallsAt(pr.s + k); return Math.max(l, r); };
        const raisedHere = Math.max(near(-40), near(-20), near(0), near(20)) > tr.profile.H + 0.3;
        if (run.phase === "running" && !nearGap(pr.s) && !raisedHere && pr.y > 0 && pr.y < tr.profile.H + 2.6 && Math.abs(pr.x) > Wl + 0.05) escapes++;
      }
      expect(escapes).toBe(0);
    });
  }
});

describe('High Road branch (Timberline Run)', () => {
  const lay = CATALOG.find((c) => c.id === 'wood')!.layout();
  const attempt = (v0: number, jumps: number) => {
    const course = new Course(lay);
    const kick = course.main.segmentStarts.find((g) => g.label === 'highKicker')!.s;
    const b = new BallPhysics(course, MATERIALS.wood);
    const HR = course.all.findIndex((t) => t.layout.id === 'highroad');
    b.placeAt(kick - 40, v0);
    let jumped = false, t2 = -1, topT = 0, backOnMain = false, rode = false;
    for (let i = 0; i < 240 * 30; i++) {
      let jump = false;
      if (jumps > 0 && !jumped && b.activeIndex === 0 && b.mainProj.s > kick + 14) { jump = true; jumped = true; if (jumps > 1) t2 = i + 60; }
      if (i === t2) jump = true;
      const steer = Math.max(-1, Math.min(1, -b.proj.x * 0.5 - b.v.dot(b.proj.R) * 0.3));
      b.step(1 / 240, { steer, magnet: false, jump, driveLevel: 1 }); b.events.length = 0;
      if (b.activeIndex === HR && b.contact && b.proj.y > 0 && b.proj.y < 3) topT += 1 / 240;
      if (topT > 4) rode = true;
      if (rode && b.activeIndex === 0 && b.contact && b.mainProj.y < 3) { backOnMain = true; break; }
    }
    return { rode, backOnMain, brS: +b.projs[HR].s.toFixed(0), act: b.activeIndex, mainS: +b.mainProj.s.toFixed(0), mainY: +b.mainProj.y.toFixed(1) };
  };
  it('without a jump you stay on the main gutter', () => { expect(attempt(26, 0).rode).toBe(false); });
  it('at moderate speed a single jump is not enough', () => { expect(attempt(22, 1).rode).toBe(false); });
  it('at moderate speed a double jump reaches the High Road, which drops you back into the main gutter', () => {
    const r = attempt(22, 2); expect(r.rode).toBe(true); expect(r.backOnMain).toBe(true);
  });
  it('at high speed one jump off the ramp is enough (speed is rewarded)', () => {
    const r = attempt(32, 1); expect(r.rode).toBe(true); expect(r.backOnMain).toBe(true);
  });
});

describe('tractor beam picks the track beneath you', () => {
  it('a toss above the High Road comes down onto the High Road, not the main gutter far below', () => {
    const course = new Course(CATALOG.find((c) => c.id === 'wood')!.layout());
    const HR = course.all.findIndex((t) => t.layout.id === 'highroad');
    const b = new BallPhysics(course, MATERIALS.wood);
    b.placeAt(60, 20, 0, HR);
    b.p.addScaledVector(b.proj.U, 12); b.v.addScaledVector(b.proj.U, 6);
    let landedOn = -1;
    for (let i = 0; i < 240 * 3 && landedOn < 0; i++) {
      b.step(1 / 240, { steer: 0, magnet: true, jump: false, driveLevel: 0 }); b.events.length = 0;
      if (i > 20 && b.contact) landedOn = b.activeIndex;
    }
    expect(landedOn).toBe(HR);
  });
});

describe('The Burrow: full tube with a split (Timberline Run)', () => {
  const lay = CATALOG.find((c) => c.id === 'wood')!.layout();
  const course = new Course(lay);
  const at = (label: string) => course.main.segmentStarts.find((g) => g.label === label)!.s;
  const SKY = course.all.findIndex((t) => t.layout.id === 'skylight');
  const ride = (from: number, v0: number, ctl: (b: BallPhysics, t: number) => { steer: number; magnet?: boolean }, until: (b: BallPhysics) => boolean, secs = 40) => {
    const b = new BallPhysics(course, MATERIALS.wood);
    b.placeAt(from, v0);
    let minDepth = 1e9, maxY = -1e9, skyMax = -1, t = 0;
    for (let i = 0; i < 240 * secs; i++) {
      t = i / 240;
      const c = ctl(b, t);
      b.step(1 / 240, { steer: c.steer, magnet: !!c.magnet, jump: false, driveLevel: 1 }); b.events.length = 0;
      // deepest inside any hollow (at a junction the two pipes' hollows are one)
      let dep = -1e9;
      for (let k = 0; k < b.tracks.length; k++) { const p = b.projs[k]; p.project(b.p.x, b.p.y, b.p.z); if (Math.abs(p.along) < 3) dep = Math.max(dep, b.tracks[k].channelDepthLocal(p.s, p.x, p.y)); }
      minDepth = Math.min(minDepth, dep);
      maxY = Math.max(maxY, b.proj.y);
      // (the two pipes share a hollow for 50 m at each end; count only the separate middle)
      if (b.activeIndex === SKY && b.proj.s < course.all[SKY].length - 55) skyMax = Math.max(skyMax, b.proj.s);
      if (until(b)) return { done: true, minDepth, maxY, skyMax, b, t };
    }
    return { done: false, minDepth, maxY, skyMax, b, t };
  };
  const follow = (target: number) => (b: BallPhysics) => ({ steer: Math.max(-1, Math.min(1, (target - b.proj.x) * 0.5 - b.v.dot(b.proj.R) * 0.3)) });

  it('the gutter curls into a closed pipe and opens again', () => {
    expect(course.main.tubeAt(at('burrowIn'))).toBe(0);
    expect(course.main.tubeAt(at('darkLine') + 20)).toBe(1);
    expect(course.main.tubeAt(at('burrowOut') + 30)).toBe(0);
  });

  it('rolls straight through the dark pipe and comes out the far end', () => {
    const r = ride(at('burrowIn') - 20, 24, follow(-2.5), (b) => b.activeIndex === 0 && b.mainProj.s > at('burrowOut') + 30);
    expect(r.done).toBe(true);
    expect(r.minDepth).toBeGreaterThan(0.5);   // never left the hollow
    expect(r.skyMax).toBeLessThan(60);         // stayed on the dark line
  });

  it('steering hard rolls you up the wall and over the roof of the pipe', () => {
    const r = ride(at('burrow') + 5, 24, () => ({ steer: 1, magnet: true }), () => false, 3);
    expect(r.maxY).toBeGreaterThan(9);         // the roof is ~13 m up
    expect(r.minDepth).toBeGreaterThan(0.5);
  });

  it('breaking right at the split takes the Skylight, which merges back into the pipe', () => {
    // a player breaking right: hold full right through the split (you ride up
    // the right wall and over the divider), then steer for the middle of the Skylight
    const toSky = (b: BallPhysics) => {
      const p = b.projs[SKY];
      if (p.s > -25 && p.s < 75 && Math.abs(p.along) < 3) return { steer: 1 };
      if (p.s >= 75 && p.s < 140 && Math.abs(p.along) < 3) return { steer: Math.max(-1, Math.min(1, -p.x * 0.6 - b.v.dot(p.R) * 0.35)) };
      return follow(0)(b);
    };
    const r = ride(at('burrowSplit') - 25, 24, toSky,
      (b) => b.activeIndex === 0 && b.mainProj.s > at('burrowOut') + 30);
    expect(r.skyMax).toBeGreaterThan(200);     // rode the Skylight's separate middle section
    expect(r.done).toBe(true);
    expect(r.minDepth).toBeGreaterThan(0.5);
  });
});

describe('runs through The Burrow never respawn by mistake', () => {
  it('Run rules accept both routes through the split', () => {
    const lay = CATALOG.find((c) => c.id === 'wood')!.layout();
    for (const route of ['dark', 'sky']) {
      const course = new Course(lay);
      const run = new Run(course, MATERIALS.wood);
      const SKY = course.all.findIndex((t) => t.layout.id === 'skylight');
      const at = (l: string) => course.main.segmentStarts.find((g) => g.label === l)!.s;
      run.launch();
      run.ball.placeAt(at('burrowSplit') - 25, 24);
      for (let f = 0; f < 60 * 25 && run.ball.mainProj.s < at('burrowOut') + 30; f++) {
        const b = run.ball, p = b.projs[SKY];
        let steer = Math.max(-1, Math.min(1, (route === 'dark' ? -2.5 - b.proj.x : -b.proj.x) * 0.5 - b.v.dot(b.proj.R) * 0.3));
        if (route === 'sky' && p.s > -25 && p.s < 75 && Math.abs(p.along) < 3) steer = 1;
        else if (route === 'sky' && p.s >= 75 && p.s < 140 && Math.abs(p.along) < 3) steer = Math.max(-1, Math.min(1, -p.x * 0.6 - b.v.dot(p.R) * 0.35));
        run.update(1 / 60, { steer, magnet: false, jump: false, driveLevel: 1 });
        run.pendingEvents.length = 0;
      }
      expect(run.falls).toBe(0);
      expect(run.ball.mainProj.s).toBeGreaterThan(at('burrowOut') + 30);
    }
  });
});

describe('Launch tube split (Timberline Run)', () => {
  const lay = CATALOG.find((c) => c.id === 'wood')!.layout();
  const course = new Course(lay);
  const at = (l: string) => course.main.segmentStarts.find((g) => g.label === l)!.s;
  const DAY = course.all.findIndex((t) => t.layout.id === 'daybreak');
  const go = (route: 'dark' | 'day') => {
    const b = new BallPhysics(course, MATERIALS.wood);
    b.placeAt(6, 0);
    b.v.addScaledVector(b.proj.T, 7);
    let dayMax = -1;
    for (let i = 0; i < 240 * 40; i++) {
      const p = b.projs[DAY];
      const mp = route === 'dark' ? b.mainProj : b.proj;   // going straight = holding the main pipe's centre
      let steer = Math.max(-1, Math.min(1, -mp.x * 0.5 - b.v.dot(mp.R) * 0.3));
      if (route === 'day' && p.s > -25 && p.s < 75 && Math.abs(p.along) < 3) steer = -1;
      else if (route === 'day' && p.s >= 75 && p.s < 140 && Math.abs(p.along) < 3) steer = Math.max(-1, Math.min(1, -p.x * 0.6 - b.v.dot(p.R) * 0.35));
      b.step(1 / 240, { steer, magnet: false, jump: false, driveLevel: 1 }); b.events.length = 0;
      if (b.activeIndex === DAY && b.proj.s < course.all[DAY].length - 55) dayMax = Math.max(dayMax, b.proj.s);
      if (b.activeIndex === 0 && b.mainProj.s > at('launchOut') + 20) return { done: true, dayMax };
    }
    return { done: false, dayMax };
  };
  it('staying put takes The Plunge and comes out onto the course', () => { const r = go('dark'); expect(r.done).toBe(true); expect(r.dayMax).toBeLessThan(60); });
  it('holding left takes Daybreak, which merges back into the pipe', () => { const r = go('day'); expect(r.done).toBe(true); expect(r.dayMax).toBeGreaterThan(200); });
});

describe('every world: branches rejoin cleanly and can be ridden', () => {
  for (const c of CATALOG) {
    if (c.id === 'wood') continue;
    it(`${c.world}: ${c.name}`, () => {
      const course = new Course(c.layout());
      for (const e of course.rejoinError) expect(e).toBeLessThan(6);
      // ride each branch from just past its split to back on the main course
      for (let bi = 1; bi < course.all.length; bi++) {
        const br = course.all[bi];
        const j = course.junctions.find((x) => x.b === bi)!;
        const b = new BallPhysics(course, MATERIALS[c.materialId]);
        b.placeAt(j.bS[1] + 4, 22, 0, bi);
        let ok = false, minDepth = 1e9;
        for (let i = 0; i < 240 * 40; i++) {
          const steer = Math.max(-1, Math.min(1, -b.proj.x * 0.5 - b.v.dot(b.proj.R) * 0.3));
          b.step(1 / 240, { steer, magnet: false, jump: false, driveLevel: 1 }); b.events.length = 0;
          let dep = -1e9;
          for (let k = 0; k < b.tracks.length; k++) { const p = b.projs[k]; p.project(b.p.x, b.p.y, b.p.z); if (Math.abs(p.along) < 3) dep = Math.max(dep, b.tracks[k].channelDepthLocal(p.s, p.x, p.y)); }
          minDepth = Math.min(minDepth, dep);
          if (b.activeIndex === 0 && b.mainProj.s > (course.junctions.filter((x) => x.b === bi).pop()!.aS[1] + 20)) { ok = true; break; }
        }
        expect(ok, `${br.layout.id} rejoins`).toBe(true);
        expect(minDepth, `${br.layout.id} stays in the gutter`).toBeGreaterThan(-0.3);
      }
    });
  }
});

describe('quick reset', () => {
  it('flung far off course, the ball blinks back into the gutter where it left, at speed', () => {
    const course = new Course(CATALOG.find((c) => c.id === 'wood')!.layout());
    const run = new Run(course, MATERIALS.wood);
    run.launch();
    const s0 = 900;
    run.ball.placeAt(s0, 34);
    for (let f = 0; f < 30; f++) run.update(1 / 60, { steer: 0, magnet: false, jump: false, driveLevel: 1 } as any);
    const sLeft = run.ball.mainProj.s;
    // something goes haywire: the ball is thrown 80 m sideways
    run.ball.p.addScaledVector(run.ball.proj.R, 80);
    let t = 0;
    for (let f = 0; f < 60 && !(run.phase === 'running' && t > 0.05 && run.ball.proj.x ** 2 < 4 && Math.abs(run.ball.proj.along) < 1); f++) { run.update(1 / 60, { steer: 0, magnet: false, jump: false, driveLevel: 1 } as any); t += 1 / 60; }
    expect(t).toBeLessThan(0.6);
    expect(Math.abs(run.ball.mainProj.s - sLeft)).toBeLessThan(40);
    expect(run.ball.v.length()).toBeGreaterThan(20);
    expect(run.falls).toBe(1);
  });
});

describe('flow: no jolting turns', () => {
  it('every course turns no tighter than the flow limit (outside loops, rolls and solved segments)', async () => {
    const { FLOW } = await import('../src/track/track');
    for (const c of CATALOG) {
      const tr = new Track(c.layout());
      const segs = tr.layout.segments;
      let worst = Infinity, at = '';
      tr.segmentStarts.forEach((g, k) => {
        const seg = segs[k];
        if (seg.loop || seg.roll || seg.exact) return;
        const i0 = Math.round(g.s / tr.ds) + 2, i1 = Math.round((g.s + seg.len) / tr.ds) - 2;
        for (let i = i0; i < i1; i++) {
          const rate = Math.abs(tr.angles[(i + 1) * 3] - tr.angles[(i - 1) * 3]) / (2 * tr.ds) * Math.PI / 180; // rad per m
          if (rate > 1e-6 && 1 / rate < worst) { worst = 1 / rate; at = `${c.id} #${k} ${seg.label ?? ''}`; }
        }
      });
      expect(worst, at).toBeGreaterThan(FLOW.turnR * 0.95);
    }
  });
});

describe('no obstacle is perfectly still', () => {
  it('every obstacle drifts at least a little, so a ball can never sit wedged against one', () => {
    for (const c of CATALOG) {
      const tr = new Track(c.layout());
      for (const o of tr.obstacles) {
        expect(o.move, `${c.id} obstacle at ${o.s.toFixed(0)}`).toBeTruthy();
        expect(Math.abs(o.move!.amp)).toBeGreaterThan(0.2);
      }
    }
  });
});
