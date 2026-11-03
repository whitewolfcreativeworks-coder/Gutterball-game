import { AdAccountingServer, Creative, Settlement, AccountingError } from './adAccounting';
import { COMMERCE_CONFIG } from './config';

/**
 * Ad Room client + in-browser mock server.
 *
 * Sample creatives are procedurally animated "videos" for FICTIONAL brands,
 * each clearly labelled SAMPLE. No real advertising, no network, no money.
 *
 * Production swap: replace MockAdBackend with an HTTPS client implementing
 * the same methods against the API in docs/AD_ROOM.md; the UI and the
 * playback controller do not change.
 */
export const SAMPLE_CREATIVES: Creative[] = [
  { adId: 'sample-acorn', campaignId: 'camp-acorn', advertiser: 'Acorn & Pine Outfitters (fictional)', title: 'Trail Boots — Sample Spot', durationMs: 20000, rateMicrosPerSecond: COMMERCE_CONFIG.simulatedRateMicrosPerSecond, sample: true },
  { adId: 'sample-nimbus', campaignId: 'camp-nimbus', advertiser: 'Nimbus Fizz (fictional)', title: 'Sparkling Cloud Soda — Sample Spot', durationMs: 15000, rateMicrosPerSecond: COMMERCE_CONFIG.simulatedRateMicrosPerSecond, sample: true },
  { adId: 'sample-orbit', campaignId: 'camp-orbit', advertiser: 'Orbit Audio (fictional)', title: 'Headphones — Sample Spot', durationMs: 25000, rateMicrosPerSecond: COMMERCE_CONFIG.simulatedRateMicrosPerSecond, sample: true },
  { adId: 'sample-tidal', campaignId: 'camp-tidal', advertiser: 'Tidal Bikes (fictional)', title: 'E-Bike Launch — Sample Spot', durationMs: 12000, rateMicrosPerSecond: COMMERCE_CONFIG.simulatedRateMicrosPerSecond, sample: true },
];

export function getPlayerId() {
  let id = localStorage.getItem('gb.dev.playerId');
  if (!id) { id = 'dev-' + Math.random().toString(36).slice(2, 10); localStorage.setItem('gb.dev.playerId', id); }
  return id;
}

/**
 * In-browser "server". Its clock is the device's monotonic+wall clock —
 * which is exactly why this simulation cannot be trusted for real rewards
 * (a production server uses its own clock). Labelled throughout the UI.
 */
export function createMockServer() {
  const KEY = 'gb.dev.adServerState.v1';
  return new AdAccountingServer(SAMPLE_CREATIVES, { now: () => Date.now() }, {
    load: () => { try { return JSON.parse(localStorage.getItem(KEY) ?? 'null'); } catch { return null; } },
    save: (s) => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* storage full */ } },
  });
}

export type PlaybackState = 'idle' | 'playing' | 'paused' | 'ended';

/**
 * Single-session playback controller. Requires a deliberate start for each
 * ad; never auto-advances; pauses (and stops earning) when the page is
 * hidden; reports evidence by heartbeat once per second and on stop.
 */
export class AdPlayback {
  state: PlaybackState = 'idle';
  mediaMs = 0;
  sessionId?: string;
  creative?: Creative;
  serverEligibleMs = 0;
  lastSettlement?: Settlement;
  error?: string;
  private hb?: number;
  private lastTick = 0;
  onUpdate?: () => void;

  constructor(private server: AdAccountingServer, private playerId: string) {
    document.addEventListener('visibilitychange', () => { if (document.hidden && this.state === 'playing') this.pause(); });
    // Resume a crashed/abandoned session: settle whatever was validated.
    const active = server.activeSession(playerId);
    if (active) {
      try { this.lastSettlement = server.stop(active.sessionId, playerId, active.lastMediaMs, false); } catch { /* ignore */ }
    }
  }

  start(c: Creative) {
    if (this.state === 'playing' || this.state === 'paused') return; // one at a time
    this.error = undefined;
    try {
      const s = this.server.createSession(this.playerId, c.adId);
      this.sessionId = s.sessionId;
      this.creative = c;
      this.mediaMs = 0;
      this.serverEligibleMs = 0;
      this.lastSettlement = undefined;
      this.server.heartbeat(s.sessionId, this.playerId, 0, true);
      this.state = 'playing';
      this.lastTick = performance.now();
      this.hb = window.setInterval(() => this.heartbeat(), 1000);
    } catch (e) {
      this.error = e instanceof AccountingError ? e.message : String(e);
    }
    this.onUpdate?.();
  }

  /** Advance local media clock (call every animation frame). */
  tick() {
    const now = performance.now();
    const dt = now - this.lastTick;
    this.lastTick = now;
    if (this.state !== 'playing' || !this.creative) return;
    this.mediaMs = Math.min(this.creative.durationMs, this.mediaMs + dt);
    if (this.mediaMs >= this.creative.durationMs) this.finish(true);
  }

  private heartbeat() {
    if (!this.sessionId || (this.state !== 'playing' && this.state !== 'paused')) return;
    try {
      const s = this.server.heartbeat(this.sessionId, this.playerId, this.mediaMs, this.state === 'playing');
      this.serverEligibleMs = s.eligibleMs;
    } catch (e) { this.error = String((e as Error).message); }
    this.onUpdate?.();
  }

  pause() {
    if (this.state !== 'playing') return;
    this.heartbeat();
    this.state = 'paused';
    this.heartbeat();
    this.onUpdate?.();
  }

  resume() {
    if (this.state !== 'paused') return;
    this.state = 'playing';
    this.lastTick = performance.now();
    this.heartbeat();
    this.onUpdate?.();
  }

  /** Stop any time; validated partial playback is kept. */
  stop() { this.finish(false); }

  private finish(completed: boolean) {
    if (!this.sessionId) return;
    clearInterval(this.hb);
    try {
      if (this.state === 'paused') { this.state = 'playing'; }
      this.lastSettlement = this.server.stop(this.sessionId, this.playerId, this.mediaMs, completed);
    } catch (e) { this.error = String((e as Error).message); }
    this.state = 'ended';
    this.sessionId = undefined;
    this.onUpdate?.();
  }

  /** Return to the neutral selection state (no autoplay of anything). */
  dismiss() { this.state = 'idle'; this.creative = undefined; this.onUpdate?.(); }
}

/** Draws a sample creative frame into a canvas. Purely procedural and fictional. */
export function drawSampleAd(ctx: CanvasRenderingContext2D, c: Creative, mediaMs: number, w: number, h: number) {
  const t = mediaMs / 1000;
  const palettes: Record<string, [string, string, string]> = {
    'sample-acorn': ['#2f4a2a', '#d99a4e', '#f5ecd8'],
    'sample-nimbus': ['#2a5fb0', '#9fd8ff', '#ffffff'],
    'sample-orbit': ['#14101f', '#b04cff', '#f2e9ff'],
    'sample-tidal': ['#0d4f5a', '#3fe0c5', '#e9fffb'],
  };
  const [bg, ac, fg] = palettes[c.adId] ?? ['#222', '#888', '#fff'];
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, bg); g.addColorStop(1, '#000');
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  // animated shapes
  for (let i = 0; i < 14; i++) {
    const a = t * 0.6 + i * 0.45;
    const x = w / 2 + Math.cos(a * (1 + i * 0.07)) * w * 0.38;
    const y = h / 2 + Math.sin(a * 1.3 + i) * h * 0.3;
    ctx.globalAlpha = 0.18;
    ctx.fillStyle = ac;
    ctx.beginPath(); ctx.arc(x, y, 10 + 30 * Math.abs(Math.sin(a + i)), 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalAlpha = 1;
  const scene = Math.floor(t / 4) % 3;
  ctx.fillStyle = fg;
  ctx.textAlign = 'center';
  ctx.font = `700 ${Math.round(h * 0.11)}px system-ui, sans-serif`;
  const brand = c.advertiser.replace(' (fictional)', '');
  const lines = [brand, c.title.replace(' — Sample Spot', ''), 'Imagine your message here'];
  const k = Math.min(1, (t % 4) * 1.5);
  ctx.globalAlpha = k;
  ctx.fillText(lines[scene], w / 2, h * 0.52);
  ctx.globalAlpha = 1;
  // SAMPLE label (always visible)
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.fillRect(8, 8, 200, 28);
  ctx.fillStyle = '#ffd34d';
  ctx.font = '700 14px system-ui, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('SAMPLE — NOT A REAL AD', 16, 27);
}
