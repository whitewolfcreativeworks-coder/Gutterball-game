import { beforeEach, describe, expect, it } from 'vitest';
import { AdAccountingServer, Creative } from '../src/commerce/adAccounting';
import { COMMERCE_CONFIG } from '../src/commerce/config';
import { DevEntitlementSimulator, EntitlementService, memoryStore } from '../src/commerce/entitlements';
import { CATALOG } from '../src/commerce/catalog';

const AD: Creative = { adId: 'a1', campaignId: 'c1', advertiser: 'Test', title: 'Test', durationMs: 25000, rateMicrosPerSecond: 2000, sample: true };
const AD2: Creative = { ...AD, adId: 'a2', campaignId: 'c2', durationMs: 12000 };

class FakeClock { t = 1_700_000_000_000; now() { return this.t; } advance(ms: number) { this.t += ms; } }

/** Simulates honest playback: a heartbeat every second while playing. */
function watch(srv: AdAccountingServer, clock: FakeClock, player: string, adId: string, seconds: number) {
  const s = srv.createSession(player, adId);
  srv.heartbeat(s.sessionId, player, 0, true);
  let media = 0;
  for (let i = 0; i < seconds; i++) { clock.advance(1000); media += 1000; srv.heartbeat(s.sessionId, player, media, true); }
  return { s, media };
}

describe('Ad Room accounting', () => {
  let clock: FakeClock;
  let srv: AdAccountingServer;
  beforeEach(() => { clock = new FakeClock(); srv = new AdAccountingServer([AD, AD2], clock, undefined, () => 0.5); });

  it('credits partial views: stop at 11 s of a 25 s ad credits & bills exactly 11 s', () => {
    const { s, media } = watch(srv, clock, 'p', 'a1', 11);
    const st = srv.stop(s.sessionId, 'p', media, false);
    expect(st.outcome).toBe('SETTLED');
    expect(st.creditedMs).toBe(11000);
    expect(st.billableMs).toBe(11000);
    expect(st.chargeMicros).toBe(22000);
    expect(st.completed).toBe(false);
    expect(srv.balanceMs('p')).toBe(11000);
  });

  it('accumulates across ads toward the reward threshold (20+11+19+25 = 75 s)', () => {
    for (const [ad, sec] of [['a1', 20], ['a2', 11], ['a1', 19], ['a1', 25]] as const) {
      const { s, media } = watch(srv, clock, 'p', ad, sec);
      srv.stop(s.sessionId, 'p', media, false);
    }
    expect(srv.balanceMs('p')).toBe(75000);
    const r = srv.redeem('p', 'req-1');
    expect(r.expiresAt - r.issuedAt).toBe(COMMERCE_CONFIG.rewardDurationDays * 86400_000);
    expect(srv.balanceMs('p')).toBe(0);
  });

  it('allows only one active session per player', () => {
    srv.createSession('p', 'a1');
    expect(() => srv.createSession('p', 'a2')).toThrow(/already active/);
    // another player is unaffected
    expect(() => srv.createSession('q', 'a2')).not.toThrow();
  });

  it('does not credit paused time', () => {
    const s = srv.createSession('p', 'a1');
    srv.heartbeat(s.sessionId, 'p', 0, true);
    clock.advance(3000); srv.heartbeat(s.sessionId, 'p', 3000, true);   // 3 s played
    srv.heartbeat(s.sessionId, 'p', 3000, false);                       // pause
    clock.advance(20000); srv.heartbeat(s.sessionId, 'p', 3000, false); // 20 s paused
    srv.heartbeat(s.sessionId, 'p', 3000, true);                        // resume
    clock.advance(2000); srv.heartbeat(s.sessionId, 'p', 5000, true);
    const st = srv.stop(s.sessionId, 'p', 5000, false);
    expect(st.creditedMs).toBe(5000);
  });

  it('ignores a manipulated client counter: media advancing faster than real time invalidates', () => {
    const s = srv.createSession('p', 'a1');
    srv.heartbeat(s.sessionId, 'p', 0, true);
    clock.advance(1000);
    srv.heartbeat(s.sessionId, 'p', 25000, true); // claims 25 s after 1 s
    const st = srv.stop(s.sessionId, 'p', 25000, true);
    expect(st.outcome).toBe('INVALIDATED');
    expect(st.creditedMs).toBe(0);
    expect(srv.balanceMs('p')).toBe(0);
  });

  it('tolerates frame jitter: chunky media reports are not fraud and catch up to real time', () => {
    const s = srv.createSession('p', 'a1');
    srv.heartbeat(s.sessionId, 'p', 0, true);
    // media advances in uneven chunks (janky device), real time steady at 1 s per heartbeat
    const media = [400, 2400, 2400, 2400, 5600, 6000];
    for (const m of media) { clock.advance(1000); srv.heartbeat(s.sessionId, 'p', m, true); }
    const st = srv.stop(s.sessionId, 'p', 6000, false);
    expect(st.outcome).toBe('SETTLED');
    expect(st.creditedMs).toBe(6000);
  });

  it('never credits more than real time even with slow heartbeats', () => {
    const s = srv.createSession('p', 'a1');
    srv.heartbeat(s.sessionId, 'p', 0, true);
    clock.advance(4000);
    srv.heartbeat(s.sessionId, 'p', 4000, true);
    const st = srv.stop(s.sessionId, 'p', 4000, false);
    expect(st.creditedMs).toBeLessThanOrEqual(4050);
  });

  it('does not credit replayed (seeked-back) media twice', () => {
    const { s } = watch(srv, clock, 'p', 'a1', 10);
    srv.heartbeat(s.sessionId, 'p', 0, true); // seek back to start
    for (let i = 1; i <= 10; i++) { clock.advance(1000); srv.heartbeat(s.sessionId, 'p', i * 1000, true); }
    const st = srv.stop(s.sessionId, 'p', 10000, false);
    expect(st.creditedMs).toBe(10000);
  });

  it('caps credit at the creative duration', () => {
    const { s } = watch(srv, clock, 'p', 'a2', 20);
    const st = srv.stop(s.sessionId, 'p', 20000, true);
    expect(st.creditedMs).toBe(12000);
    expect(st.completed).toBe(true);
  });

  it('settlement is idempotent: repeated stop/settle never duplicates credits or charges', () => {
    const { s, media } = watch(srv, clock, 'p', 'a1', 8);
    const a = srv.stop(s.sessionId, 'p', media, false);
    const b = srv.stop(s.sessionId, 'p', media, false);
    const c = srv.settle(s.sessionId, 'p');
    expect(b).toEqual(a); expect(c).toEqual(a);
    expect(srv.ledger.filter((e) => e.type === 'PLAYER_CREDIT')).toHaveLength(1);
    expect(srv.ledger.filter((e) => e.type === 'ADVERTISER_CHARGE')).toHaveLength(1);
    expect(srv.reconcile().ok).toBe(true);
  });

  it('settled sessions cannot be reused', () => {
    const { s, media } = watch(srv, clock, 'p', 'a1', 3);
    srv.stop(s.sessionId, 'p', media, false);
    expect(() => srv.heartbeat(s.sessionId, 'p', 5000, true)).toThrow(/SETTLED/);
  });

  it('rejects invalid or foreign session ids', () => {
    expect(() => srv.heartbeat('nope', 'p', 0, true)).toThrow(/Invalid session/);
    const s = srv.createSession('p', 'a1');
    expect(() => srv.heartbeat(s.sessionId, 'mallory', 0, true)).toThrow(/Invalid session/);
  });

  it('expired (abandoned) sessions settle on validated time only', () => {
    const { s } = watch(srv, clock, 'p', 'a1', 6);
    clock.advance(COMMERCE_CONFIG.sessionTimeoutSeconds * 1000 + 1000);
    expect(srv.activeSession('p')).toBeUndefined();
    expect(srv.settle(s.sessionId, 'p').creditedMs).toBe(6000);
    // player can start a new session afterwards
    expect(() => srv.createSession('p', 'a2')).not.toThrow();
  });

  it('redemption is idempotent and requires balance', () => {
    expect(() => srv.redeem('p', 'r0')).toThrow(/Not enough/);
    for (let k = 0; k < 4; k++) { const { s, media } = watch(srv, clock, 'p', 'a1', 25); srv.stop(s.sessionId, 'p', media, true); }
    const r1 = srv.redeem('p', 'same');
    const r2 = srv.redeem('p', 'same');
    expect(r2).toEqual(r1);
    expect(srv.ledger.filter((e) => e.type === 'REWARD_ISSUED')).toHaveLength(1);
  });

  it('rewards expire by server time, not device time', () => {
    for (let k = 0; k < 3; k++) { const { s, media } = watch(srv, clock, 'p', 'a1', 25); srv.stop(s.sessionId, 'p', media, true); }
    srv.redeem('p', 'x');
    expect(srv.activeRewards('p')).toHaveLength(1);
    clock.advance(COMMERCE_CONFIG.rewardDurationDays * 86400_000 + 1);
    expect(srv.activeRewards('p')).toHaveLength(0);
  });

  it('reversals are appended, not edits, and reconcile', () => {
    const { s, media } = watch(srv, clock, 'p', 'a1', 10);
    srv.stop(s.sessionId, 'p', media, false);
    const before = srv.ledger.length;
    srv.reverse(s.sessionId, 'fraud review');
    srv.reverse(s.sessionId, 'fraud review'); // idempotent
    expect(srv.ledger.length).toBe(before + 2);
    expect(srv.balanceMs('p')).toBe(0);
    expect(srv.campaignReport('c1').chargesMicros).toBe(0);
  });

  it('rate limits mechanical session spamming', () => {
    let invalid = 0;
    for (let k = 0; k < COMMERCE_CONFIG.maxSessionsPerHour + 5; k++) {
      const { s, media } = watch(srv, clock, 'bot', 'a2', 2);
      if (srv.stop(s.sessionId, 'bot', media, false).outcome === 'INVALIDATED') invalid++;
    }
    expect(invalid).toBeGreaterThan(0);
  });

  it('campaign report distinguishes completed, partial and billable', () => {
    let r = watch(srv, clock, 'p', 'a2', 12); srv.stop(r.s.sessionId, 'p', r.media, true);
    r = watch(srv, clock, 'p', 'a2', 4); srv.stop(r.s.sessionId, 'p', r.media, false);
    const rep = srv.campaignReport('c2');
    expect(rep.completedViews).toBe(1);
    expect(rep.partialViews).toBe(1);
    expect(rep.billableSeconds).toBe(16);
    expect(rep.simulated).toBe(true);
  });
});

describe('Entitlements', () => {
  it('wood is free; locked courses are not entitled', async () => {
    const svc = new EntitlementService(new DevEntitlementSimulator(memoryStore()), ['wood']);
    await svc.init();
    expect(svc.isEntitled('wood')).toBe(true);
    expect(svc.isEntitled('ice')).toBe(false);
  });

  it('simulated purchase persists and restores; duplicate purchase is a no-op', async () => {
    const store = memoryStore();
    const svc = new EntitlementService(new DevEntitlementSimulator(store), ['wood']);
    await svc.init();
    const r = await svc.purchase('ice', 'com.gutterball.course.ice');
    expect(r.ok).toBe(true);
    expect(r.entitlement?.source).toBe('simulated');
    const again = await svc.purchase('ice', 'com.gutterball.course.ice');
    expect(again.alreadyOwned).toBe(true);
    const svc2 = new EntitlementService(new DevEntitlementSimulator(store), ['wood']);
    await svc2.init();
    expect(svc2.isEntitled('ice')).toBe(true);
  });

  it('a locally edited ownership flag without a valid receipt is ignored', async () => {
    const store = memoryStore();
    store.setItem('gb.dev.simulatedEntitlements.v1', JSON.stringify([{ courseId: 'metal', productId: 'com.gutterball.course.metal', source: 'simulated', grantedAt: 1, receipt: 'SIM.metal|com.gutterball.course.metal|1.deadbeef' }, { courseId: 'glass', productId: 'x', source: 'app-store', grantedAt: 1 }]));
    const svc = new EntitlementService(new DevEntitlementSimulator(store), ['wood']);
    await svc.init();
    expect(svc.isEntitled('metal')).toBe(false);
    expect(svc.isEntitled('glass')).toBe(false);
  });

  it('store failure leaves the course locked', async () => {
    const sim = new DevEntitlementSimulator(memoryStore());
    sim.failNext = true;
    const svc = new EntitlementService(sim, ['wood']);
    await svc.init();
    const r = await svc.purchase('sand', 'com.gutterball.course.sand');
    expect(r.ok).toBe(false);
    expect(svc.isEntitled('sand')).toBe(false);
  });

  it('catalog: 12 worlds, only wood free, each paid world has a product id and price', () => {
    expect(CATALOG).toHaveLength(12);
    expect(CATALOG.filter((c) => c.free).map((c) => c.id)).toEqual(['wood']);
    for (const c of CATALOG.filter((c) => !c.free)) {
      expect(c.productId).toMatch(/^com\.gutterball\.course\./);
      expect(c.displayPriceUsd).toBe(COMMERCE_CONFIG.coursePriceUsd);
    }
  });
});
