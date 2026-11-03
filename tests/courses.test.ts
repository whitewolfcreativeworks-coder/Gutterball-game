import { describe, expect, it } from 'vitest';
import { Track } from '../src/track/track';
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
        if (run.phase === 'running' && !nearGap(pr.s) && pr.y > 0 && Math.abs(pr.x) > W + 0.05) escapes++;
      }
      expect(escapes).toBe(0);
    });
  }
});
