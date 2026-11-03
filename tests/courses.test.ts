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
