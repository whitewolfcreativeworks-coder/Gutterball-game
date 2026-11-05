import { describe, expect, it } from 'vitest';
import { Course } from '../src/track/track';
import { CATALOG } from '../src/commerce/catalog';
import { pickThemedTubes } from '../src/render/tubeThemes';

describe('tube themes', () => {
  it('only some tubes get a theme: at least one per course that has tubes, never more than three', () => {
    const seen = new Set<string>();
    const lines: string[] = [];
    for (const c of CATALOG) {
      const course = new Course(c.layout());
      const themed = pickThemedTubes(course, c.id);
      const tubes = course.all.reduce((a, t) => { let n = 0, on = false, st = 0; for (let i = 0; i < t.n; i++) { const v = t.tubeK[i] > 0.9; if (v && !on) st = i; if (!v && on && (i - st) * t.ds >= 90) n++; on = v; } return a + n; }, 0);
      if (tubes > 0) expect(themed.length, c.id).toBeGreaterThan(0);
      expect(themed.length).toBeLessThanOrEqual(3);
      expect(themed.length).toBeLessThan(Math.max(2, tubes));
      for (const t of themed) { seen.add(t.theme); expect(t.s1 - t.s0).toBeGreaterThanOrEqual(90); }
      lines.push(`${c.id}: ${tubes} tubes, themed ${themed.map((t) => `${t.theme}@${Math.round(t.s0)}${t.track === course.main ? '' : '(route)'}`).join(' ')}`);
    }
    expect(seen.size).toBe(4);
  });
});
