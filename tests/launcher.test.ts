import { describe, expect, it } from 'vitest';
import { Scene } from 'three';
import { Course } from '../src/track/track';
import { MATERIALS } from '../src/physics/materials';
import { Run } from '../src/game/run';
import { CATALOG } from '../src/commerce/catalog';
import { PlungerLauncher, launchSpeed, PULL_LEN } from '../src/finale/launcher';

const audio = { plungerTick() {}, plungerRelease() {} } as any;
const haptics = { tap() {} } as any;
const NONE = { steer: 0, magnet: false, jump: false, driveLevel: 1 } as any;

function make(id = 'wood') {
  const c = CATALOG.find((x) => x.id === id)!;
  const course = new Course(c.layout());
  const run = new Run(course, MATERIALS[c.materialId]);
  const pl = new PlungerLauncher(new Scene(), course, run.ball, audio, haptics, 0xffaa00);
  return { course, run, pl };
}

describe('the plunger launcher', () => {
  it('pulling draws the ball back with the rod; letting go fires with that power', () => {
    const { run, pl, course } = make();
    const s0 = course.main.checkpoints[0];
    pl.setPull(0.6);
    for (let i = 0; i < 30; i++) pl.update(1 / 60);
    expect(pl.pull).toBeGreaterThan(0.55);
    expect(run.ball.proj.s).toBeCloseTo(s0 - pl.pull * PULL_LEN, 1);
    pl.release();
    for (let i = 0; i < 10 && !pl.done; i++) pl.update(1 / 60);
    expect(pl.done).toBe(true);
    expect(pl.power).toBeGreaterThan(0.55);
  });

  it('a tiny tug is not a launch; a quick swipe fires a strong one; holding a key winds it up', () => {
    const a = make().pl;
    a.setPull(0.02); a.update(1 / 60); a.release();
    expect(a.phase).toBe('ready');
    const b = make().pl;
    b.fire();
    for (let i = 0; i < 60 && !b.done; i++) b.update(1 / 60);
    expect(b.done).toBe(true); expect(b.power).toBeGreaterThan(0.75);
    const c = make().pl;
    c.holdKey(true);
    for (let i = 0; i < 70; i++) c.update(1 / 60);
    c.holdKey(false);
    for (let i = 0; i < 10 && !c.done; i++) c.update(1 / 60);
    expect(c.done).toBe(true); expect(c.power).toBeGreaterThan(0.8);
  });

  it('launch speed rises with the pull', () => {
    expect(launchSpeed(0)).toBeLessThan(launchSpeed(0.5));
    expect(launchSpeed(0.5)).toBeLessThan(launchSpeed(1));
    expect(launchSpeed(1)).toBeCloseTo(36, 0);
  });

  it('every world: a full-power shot heads cleanly down the course; even a weak one gets going', () => {
    for (const c of CATALOG) {
      for (const pull of [1, 0.1]) {
        const { run } = make(c.id);
        run.launch();
        run.ball.v.addScaledVector(run.ball.proj.T, launchSpeed(pull) - 7);
        for (let f = 0; f < 60 * 6; f++) { run.update(1 / 60, NONE); run.pendingEvents.length = 0; }
        expect(run.falls, `${c.id} pull ${pull}`).toBe(0);
        expect(run.ball.mainProj.s, `${c.id} pull ${pull}`).toBeGreaterThan(pull === 1 ? 100 : 40);
      }
    }
  });
});
