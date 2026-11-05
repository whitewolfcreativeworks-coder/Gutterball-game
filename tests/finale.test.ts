import { describe, expect, it } from 'vitest';
import { Scene } from 'three';
import { Course } from '../src/track/track';
import { BallPhysics } from '../src/physics/ball';
import { MATERIALS } from '../src/physics/materials';
import { CATALOG } from '../src/commerce/catalog';
import { Finale, FINALE_FOR_WORLD, type FinaleKind } from '../src/finale/finale';

const quietAudio = new Proxy({}, { get: () => () => {} }) as any;

describe('finish contraptions play out on their own', () => {
  for (const kind of ['plinko', 'dominoes', 'hoop', 'chimes', 'funnel'] as FinaleKind[]) {
    it(kind, () => {
      const entry = CATALOG.find((c) => FINALE_FOR_WORLD[c.id] === kind)!;
      const course = new Course(entry.layout());
      const ball = new BallPhysics(course, MATERIALS[entry.materialId]);
      ball.placeAt(course.main.length - 60, 30);
      const f = new Finale(new Scene(), course.main, ball, kind, quietAudio, { a: 0xff8800, b: 0x0088ff });
      let t = 0;
      while (!f.done && t < 40) { f.update(1 / 60); t += 1 / 60; }
      expect(f.done, `${kind} finished`).toBe(true);
      expect(t).toBeLessThan(kind === 'plinko' ? 30 : 22);
      expect(Number.isFinite(ball.p.x + ball.p.y + ball.p.z)).toBe(true);
      if (kind === 'plinko') expect([100, 500, 1000, 2500, 10000]).toContain(f.score);
      f.dispose();
    });
  }
});
