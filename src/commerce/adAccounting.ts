import { COMMERCE_CONFIG } from './config';

/**
 * Ad Room accounting — reference implementation of the server-authoritative
 * model described in docs/AD_ROOM.md.
 *
 * In this build it runs *inside the browser* as a development simulation
 * (MockAdServer). The logic is written as a pure, clock-injected module so
 * the identical rules can be moved behind a real HTTPS API unchanged.
 *
 * Core rules:
 *  - The server never trusts client-reported elapsed time. Credit for each
 *    heartbeat interval is min(server-measured wall time, media-time
 *    advance), only while the client reports "playing", capped at the
 *    creative's duration. Paused, buffering, backgrounded, seeking
 *    backwards or replaying earn nothing.
 *  - One active session per player. A new start while one is active is
 *    refused.
 *  - Session lifecycle: CREATED -> PLAYING <-> PAUSED -> STOPPED|COMPLETED
 *    -> PENDING_VALIDATION -> SETTLED|INVALIDATED. Terminal states can't be
 *    reopened, so sessions can't be replayed.
 *  - Settlement is idempotent: player credit and advertiser billing are
 *    written once, from the *same* validated duration, to an append-only
 *    ledger. Corrections are REVERSAL entries, never edits.
 *  - All money is integer micro-dollars; all time is integer milliseconds.
 */

export type SessionState = 'CREATED' | 'PLAYING' | 'PAUSED' | 'STOPPED' | 'COMPLETED' | 'PENDING_VALIDATION' | 'SETTLED' | 'INVALIDATED' | 'EXPIRED';

export interface Creative {
  adId: string;
  campaignId: string;
  advertiser: string;
  title: string;
  durationMs: number;
  rateMicrosPerSecond: number;
  sample: true; // every creative in this build is a clearly labelled sample
}

export interface AdSession {
  sessionId: string;
  playerId: string;
  adId: string;
  campaignId: string;
  state: SessionState;
  createdAt: number;
  lastHeartbeatServer: number;
  lastMediaMs: number;
  maxMediaMs: number;     // furthest media position credited (prevents replay credit)
  eligibleMs: number;     // validated playback time
  playWallMs: number;     // server wall time spent in PLAYING (between playing heartbeats)
  heartbeats: number;
  suspicious: string[];   // validation notes
  settlement?: Settlement;
}

export interface Settlement {
  sessionId: string;
  outcome: 'SETTLED' | 'INVALIDATED';
  creditedMs: number;
  billableMs: number;
  rateMicrosPerSecond: number;
  chargeMicros: number;
  completed: boolean;
  reasons: string[];
  settledAt: number;
}

export type LedgerType = 'PLAYER_CREDIT' | 'ADVERTISER_CHARGE' | 'REDEMPTION' | 'REWARD_ISSUED' | 'REVERSAL';

export interface LedgerEntry {
  id: number;
  type: LedgerType;
  ts: number;
  playerId: string;
  sessionId?: string;
  campaignId?: string;
  ms?: number;            // signed eligible milliseconds (credits +, redemptions -)
  micros?: number;        // signed micro-dollars (charges +)
  rewardId?: string;
  ref?: number;           // entry referenced by a reversal
  note?: string;
  simulated: true;
}

export interface RewardDef {
  id: string;
  name: string;
  kind: 'skin' | 'beam' | 'trail';
  value: string;
  weight: number; // relative odds (disclosed in UI)
}

export const REWARD_TABLE: RewardDef[] = [
  { id: 'skin-rolypoly', name: 'Roly-Poly Shell', kind: 'skin', value: 'rolypoly', weight: 20 },
  { id: 'skin-gold', name: 'Gold Chrome Ball', kind: 'skin', value: 'gold', weight: 18 },
  { id: 'skin-copper', name: 'Copper Ball', kind: 'skin', value: 'copper', weight: 18 },
  { id: 'skin-obsidian', name: 'Obsidian Ball', kind: 'skin', value: 'obsidian', weight: 12 },
  { id: 'beam-magenta', name: 'Magenta Tractor Beam', kind: 'beam', value: 'magenta', weight: 12 },
  { id: 'beam-gold', name: 'Gold Tractor Beam', kind: 'beam', value: 'gold', weight: 10 },
  { id: 'trail-aurora', name: 'Aurora Rolling Trail', kind: 'trail', value: 'aurora', weight: 10 },
];

export interface ActiveReward { rewardId: string; def: RewardDef; issuedAt: number; expiresAt: number; ledgerId: number; }

export interface Clock { now(): number; }

export interface Storage {
  load(): any | null;
  save(state: any): void;
}

export class AccountingError extends Error {
  constructor(public code: string, message: string) { super(message); }
}

export interface ServerState {
  sessions: Record<string, AdSession>;
  ledger: LedgerEntry[];
  rewards: ActiveReward[];
  idempotency: Record<string, any>;
  nextLedgerId: number;
  nextSession: number;
  sessionStarts: Record<string, number[]>;
}

export class AdAccountingServer {
  private st: ServerState;
  readonly creatives: Map<string, Creative>;
  constructor(creatives: Creative[], private clock: Clock, private storage?: Storage, private random: () => number = Math.random) {
    this.creatives = new Map(creatives.map((c) => [c.adId, c]));
    this.st = storage?.load() ?? { sessions: {}, ledger: [], rewards: [], idempotency: {}, nextLedgerId: 1, nextSession: 1, sessionStarts: {} };
  }

  private persist() { this.storage?.save(this.st); }

  private append(e: Omit<LedgerEntry, 'id' | 'ts' | 'simulated'>): LedgerEntry {
    const entry: LedgerEntry = { ...e, id: this.st.nextLedgerId++, ts: this.clock.now(), simulated: true };
    this.st.ledger.push(Object.freeze(entry) as LedgerEntry);
    return entry;
  }

  get ledger(): readonly LedgerEntry[] { return this.st.ledger; }

  /** Expire stale sessions (no heartbeat within timeout) — they are then settled on what was validated. */
  private sweep() {
    const now = this.clock.now();
    for (const s of Object.values(this.st.sessions)) {
      if ((s.state === 'PLAYING' || s.state === 'PAUSED' || s.state === 'CREATED') && now - s.lastHeartbeatServer > COMMERCE_CONFIG.sessionTimeoutSeconds * 1000) {
        s.state = 'STOPPED';
        s.suspicious.push('timeout');
        this.settleInternal(s);
      }
    }
  }

  activeSession(playerId: string): AdSession | undefined {
    this.sweep();
    return Object.values(this.st.sessions).find((s) => s.playerId === playerId && ['CREATED', 'PLAYING', 'PAUSED'].includes(s.state));
  }

  /** Manual start only: there is no queue and no "next" API. */
  createSession(playerId: string, adId: string): AdSession {
    const cr = this.creatives.get(adId);
    if (!cr) throw new AccountingError('UNKNOWN_AD', 'Unknown advertisement');
    if (this.activeSession(playerId)) throw new AccountingError('SESSION_ACTIVE', 'Another viewing session is already active');
    const now = this.clock.now();
    const starts = (this.st.sessionStarts[playerId] ??= []).filter((t) => now - t < 3600_000);
    starts.push(now);
    this.st.sessionStarts[playerId] = starts;
    const s: AdSession = {
      sessionId: `S${this.st.nextSession++}-${Math.floor(this.random() * 1e9).toString(36)}`,
      playerId, adId, campaignId: cr.campaignId, state: 'CREATED',
      createdAt: now, lastHeartbeatServer: now, lastMediaMs: 0, maxMediaMs: 0, eligibleMs: 0, playWallMs: 0, heartbeats: 0,
      suspicious: [],
    };
    if (starts.length > COMMERCE_CONFIG.maxSessionsPerHour) s.suspicious.push('rate');
    this.st.sessions[s.sessionId] = s;
    this.persist();
    return { ...s };
  }

  private get(sessionId: string, playerId: string) {
    const s = this.st.sessions[sessionId];
    if (!s || s.playerId !== playerId) throw new AccountingError('INVALID_SESSION', 'Invalid session');
    return s;
  }

  /**
   * Playback evidence. `mediaMs` is the player's media position, `playing`
   * whether media is actually advancing (not paused/buffering/hidden).
   * Client-side timestamps are deliberately not part of the contract.
   */
  heartbeat(sessionId: string, playerId: string, mediaMs: number, playing: boolean): AdSession {
    this.sweep();
    const s = this.get(sessionId, playerId);
    if (!['CREATED', 'PLAYING', 'PAUSED'].includes(s.state)) throw new AccountingError('SESSION_CLOSED', `Session is ${s.state}`);
    const cr = this.creatives.get(s.adId)!;
    const now = this.clock.now();
    const wall = Math.max(0, now - s.lastHeartbeatServer);
    const media = Math.max(0, Math.min(cr.durationMs, mediaMs));
    const advance = media - s.lastMediaMs;
    if (playing && s.state === 'PLAYING') {
      // Real time spent playing, measured by the server only
      s.playWallMs += wall;
      if (advance < 0) s.suspicious.push('seek-back');
      // Only media beyond the furthest credited position counts (no replay credit)
      const fresh = Math.max(0, media - s.maxMediaMs);
      // Cumulative cap: total credit can never exceed total real playing time
      const room = Math.max(0, s.playWallMs + 50 - s.eligibleMs);
      const credit = Math.min(fresh, room);
      s.eligibleMs = Math.min(cr.durationMs, s.eligibleMs + credit);
      s.maxMediaMs = Math.max(s.maxMediaMs, s.maxMediaMs + credit);
      // Sustained over-reporting (not a single janky frame) is treated as manipulation
      if (media > s.playWallMs * 1.25 + 1500 && !s.suspicious.includes('impossible-advance')) s.suspicious.push('impossible-advance');
    }
    s.lastMediaMs = media;
    s.lastHeartbeatServer = now;
    s.heartbeats++;
    s.state = playing ? 'PLAYING' : 'PAUSED';
    this.persist();
    return { ...s };
  }

  /** Player stops (anytime) or media ends. Settles immediately in this simulation. */
  stop(sessionId: string, playerId: string, mediaMs: number, completed: boolean): Settlement {
    const s = this.get(sessionId, playerId);
    if (s.settlement) return s.settlement; // idempotent
    if (['PLAYING', 'PAUSED', 'CREATED'].includes(s.state)) {
      // final evidence counts like a heartbeat (only if still playing)
      this.heartbeat(sessionId, playerId, mediaMs, s.state === 'PLAYING');
    }
    const cr = this.creatives.get(s.adId)!;
    s.state = completed && s.maxMediaMs >= cr.durationMs - 300 ? 'COMPLETED' : 'STOPPED';
    return this.settleInternal(s);
  }

  /** Re-request settlement (e.g. client retry after network loss). Never double-writes. */
  settle(sessionId: string, playerId: string): Settlement {
    const s = this.get(sessionId, playerId);
    if (s.settlement) return s.settlement;
    if (!['STOPPED', 'COMPLETED'].includes(s.state)) throw new AccountingError('NOT_STOPPED', 'Session still active');
    return this.settleInternal(s);
  }

  private settleInternal(s: AdSession): Settlement {
    if (s.settlement) return s.settlement;
    const cr = this.creatives.get(s.adId)!;
    s.state = 'PENDING_VALIDATION';
    const reasons: string[] = [];
    let ok = true;
    if (s.suspicious.includes('impossible-advance')) { ok = false; reasons.push('Media advanced faster than real time'); }
    if (s.suspicious.includes('rate')) { ok = false; reasons.push('Session start rate exceeded — held for review'); }
    let creditedMs = Math.floor(s.eligibleMs);
    if (creditedMs < COMMERCE_CONFIG.minCreditSeconds * 1000) { creditedMs = 0; reasons.push('Below minimum eligible duration'); }
    // daily cap (by server day)
    const dayStart = Math.floor(this.clock.now() / 86400_000) * 86400_000;
    const today = this.st.ledger.filter((e) => e.type === 'PLAYER_CREDIT' && e.playerId === s.playerId && e.ts >= dayStart).reduce((a, e) => a + (e.ms ?? 0), 0);
    const room = Math.max(0, COMMERCE_CONFIG.dailyCapSeconds * 1000 - today);
    if (creditedMs > room) { creditedMs = room; reasons.push('Daily viewing cap reached'); }
    if (!ok) creditedMs = 0;
    const billableMs = creditedMs; // symmetry: same validated duration governs both sides
    const chargeMicros = Math.round((billableMs * cr.rateMicrosPerSecond) / 1000);
    const settlement: Settlement = {
      sessionId: s.sessionId, outcome: ok ? 'SETTLED' : 'INVALIDATED', creditedMs, billableMs,
      rateMicrosPerSecond: cr.rateMicrosPerSecond, chargeMicros, completed: s.maxMediaMs >= cr.durationMs - 300,
      reasons, settledAt: this.clock.now(),
    };
    if (ok && creditedMs > 0) {
      this.append({ type: 'PLAYER_CREDIT', playerId: s.playerId, sessionId: s.sessionId, campaignId: s.campaignId, ms: creditedMs });
      this.append({ type: 'ADVERTISER_CHARGE', playerId: s.playerId, sessionId: s.sessionId, campaignId: s.campaignId, ms: billableMs, micros: chargeMicros });
    }
    s.state = ok ? 'SETTLED' : 'INVALIDATED';
    s.settlement = settlement;
    this.persist();
    return settlement;
  }

  /** Reverse a settled session (e.g. later fraud finding). Appends compensating entries. */
  reverse(sessionId: string, note: string) {
    const entries = this.st.ledger.filter((e) => e.sessionId === sessionId && (e.type === 'PLAYER_CREDIT' || e.type === 'ADVERTISER_CHARGE'));
    const already = this.st.ledger.some((e) => e.type === 'REVERSAL' && e.sessionId === sessionId);
    if (already || !entries.length) return;
    for (const e of entries) this.append({ type: 'REVERSAL', playerId: e.playerId, sessionId, campaignId: e.campaignId, ms: e.type === 'PLAYER_CREDIT' ? -(e.ms ?? 0) : undefined, micros: e.micros ? -e.micros : undefined, ref: e.id, note });
    this.persist();
  }

  balanceMs(playerId: string): number {
    return this.st.ledger.filter((e) => e.playerId === playerId && (e.type === 'PLAYER_CREDIT' || e.type === 'REDEMPTION' || (e.type === 'REVERSAL' && e.ms !== undefined))).reduce((a, e) => a + (e.ms ?? 0), 0);
  }

  totalCreditedMs(playerId: string): number {
    return this.st.ledger.filter((e) => e.playerId === playerId && e.type === 'PLAYER_CREDIT').reduce((a, e) => a + (e.ms ?? 0), 0);
  }

  /** Redeem threshold seconds for one random temporary reward. Idempotent on requestId. */
  redeem(playerId: string, requestId: string): ActiveReward {
    const prior = this.st.idempotency[`redeem:${requestId}`];
    if (prior) return prior;
    const need = COMMERCE_CONFIG.rewardThresholdSeconds * 1000;
    if (this.balanceMs(playerId) < need) throw new AccountingError('INSUFFICIENT', 'Not enough eligible viewing time');
    const total = REWARD_TABLE.reduce((a, r) => a + r.weight, 0);
    let pick = this.random() * total;
    let def = REWARD_TABLE[0];
    for (const r of REWARD_TABLE) { pick -= r.weight; if (pick <= 0) { def = r; break; } }
    const red = this.append({ type: 'REDEMPTION', playerId, ms: -need, rewardId: def.id });
    const now = this.clock.now();
    const issued = this.append({ type: 'REWARD_ISSUED', playerId, rewardId: def.id, ref: red.id });
    const ar: ActiveReward = { rewardId: def.id, def, issuedAt: now, expiresAt: now + COMMERCE_CONFIG.rewardDurationDays * 86400_000, ledgerId: issued.id };
    this.st.rewards.push(ar);
    this.st.idempotency[`redeem:${requestId}`] = ar;
    this.persist();
    return ar;
  }

  /** Active rewards by *server* time (device clock is irrelevant). */
  activeRewards(playerId: string): ActiveReward[] {
    const now = this.clock.now();
    const mine = new Set(this.st.ledger.filter((e) => e.type === 'REWARD_ISSUED' && e.playerId === playerId).map((e) => e.id));
    return this.st.rewards.filter((r) => mine.has(r.ledgerId) && r.expiresAt > now);
  }

  campaignReport(campaignId: string) {
    const sessions = Object.values(this.st.sessions).filter((s) => s.campaignId === campaignId);
    const settled = sessions.filter((s) => s.settlement);
    const charges = this.st.ledger.filter((e) => e.campaignId === campaignId && (e.type === 'ADVERTISER_CHARGE' || (e.type === 'REVERSAL' && e.micros !== undefined)));
    const billableMs = this.st.ledger.filter((e) => e.campaignId === campaignId && e.type === 'ADVERTISER_CHARGE').reduce((a, e) => a + (e.ms ?? 0), 0);
    const completedViews = settled.filter((s) => s.settlement!.outcome === 'SETTLED' && s.settlement!.completed).length;
    const partialViews = settled.filter((s) => s.settlement!.outcome === 'SETTLED' && !s.settlement!.completed && s.settlement!.creditedMs > 0).length;
    return {
      campaignId,
      started: sessions.length,
      completedViews,
      partialViews,
      invalidated: settled.filter((s) => s.settlement!.outcome === 'INVALIDATED').length,
      billableSeconds: billableMs / 1000,
      avgWatchSeconds: settled.length ? settled.reduce((a, s) => a + s.settlement!.creditedMs, 0) / settled.length / 1000 : 0,
      chargesMicros: charges.reduce((a, e) => a + (e.micros ?? 0), 0),
      simulated: true as const,
    };
  }

  /** Ledger reconciliation: totals derived two ways must agree. */
  reconcile(): { ok: boolean; issues: string[] } {
    const issues: string[] = [];
    const seen = new Set<string>();
    for (const s of Object.values(this.st.sessions)) {
      if (!s.settlement || s.settlement.outcome !== 'SETTLED' || s.settlement.creditedMs === 0) continue;
      const credits = this.st.ledger.filter((e) => e.sessionId === s.sessionId && e.type === 'PLAYER_CREDIT');
      const charges = this.st.ledger.filter((e) => e.sessionId === s.sessionId && e.type === 'ADVERTISER_CHARGE');
      if (credits.length !== 1 || charges.length !== 1) issues.push(`${s.sessionId}: expected exactly one credit and one charge`);
      else if (credits[0].ms !== charges[0].ms || credits[0].ms !== s.settlement.creditedMs) issues.push(`${s.sessionId}: credit/charge duration mismatch`);
      else if (charges[0].micros !== s.settlement.chargeMicros) issues.push(`${s.sessionId}: charge mismatch`);
      if (seen.has(s.sessionId)) issues.push(`${s.sessionId}: duplicate`);
      seen.add(s.sessionId);
    }
    return { ok: issues.length === 0, issues };
  }

  /** Dev only */
  resetAll() {
    this.st = { sessions: {}, ledger: [], rewards: [], idempotency: {}, nextLedgerId: 1, nextSession: 1, sessionStarts: {} };
    this.persist();
  }
}
