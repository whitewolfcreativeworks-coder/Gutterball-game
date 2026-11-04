import './ui/styles.css';
import { Game, HudState } from './game/game';
import { AudioEngine } from './audio/audioEngine';
import { HapticEngine } from './haptics/haptics';
import { InputManager } from './input/input';
import { screenAngle } from './input/input';
import { CATALOG, courseById, CourseEntry, formatPrice } from './commerce/catalog';
import { DevEntitlementSimulator, EntitlementService } from './commerce/entitlements';
import { AdPlayback, createMockServer, drawSampleAd, getPlayerId, SAMPLE_CREATIVES } from './commerce/adRoom';
import { REWARD_TABLE } from './commerce/adAccounting';
import { COMMERCE_CONFIG } from './commerce/config';
import { MATERIALS } from './physics/materials';
import type { RunPhase } from './game/run';

// ---------------------------------------------------------------------------
// Bootstrap
// ---------------------------------------------------------------------------
const canvas = document.getElementById('scene') as HTMLCanvasElement;
const stage = document.getElementById('stage')!;
const ui = document.getElementById('ui')!;
const audio = new AudioEngine();
const haptics = new HapticEngine();
const input = new InputManager(canvas);
const game = new Game(canvas, audio, haptics, input);
const entitlements = new EntitlementService(new DevEntitlementSimulator(), CATALOG.filter((c) => c.free).map((c) => c.id));
const adServer = createMockServer();
const playerId = getPlayerId();
const playback = new AdPlayback(adServer, playerId);

const settings = loadSettings();
applySettings();

(window as any).__gutterball = { game, audio, haptics, input, entitlements, adServer, playback }; // debugging & smoke tests

let screen = 'menu';
let detailCourse: CourseEntry | null = null;
let audioUnlocked = false;

document.addEventListener('pointerdown', async () => {
  if (audioUnlocked) return;
  audioUnlocked = true;
  await audio.unlock();
  if (game.material) audio.configure(game.material);
  audio.setMusic(settings.music);
  audio.setVolume(settings.volume);
}, { capture: true });

// ---------------------------------------------------------------------------
// Tiny DOM helpers
// ---------------------------------------------------------------------------
function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls?: string, html?: string) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}
const $ = <T extends HTMLElement = HTMLElement>(sel: string, root: ParentNode = ui) => root.querySelector(sel) as T;
let toastTimer = 0;
function toast(msg: string) {
  let t = $('.toast');
  if (!t) { t = el('div', 'toast'); ui.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => t.classList.remove('show'), 2600);
}
function swatch(c: CourseEntry) {
  const m = MATERIALS[c.materialId];
  const hex = '#' + m.visual.tint.toString(16).padStart(6, '0');
  return `background: radial-gradient(circle at 35% 35%, #fff8, ${hex} 45%, #0006 100%)`;
}
function fmtTime(t: number) {
  const m = Math.floor(t / 60), s = t - m * 60;
  return `${m}:${s.toFixed(1).padStart(4, '0')}`;
}
function ownedBadge(c: CourseEntry) {
  if (c.free) return '<span class="badge free">FREE</span>';
  if (entitlements.isEntitled(c.id)) return '<span class="badge owned">OWNED · SIM</span>';
  return `<span class="badge price">${formatPrice(c)}</span>`;
}

// ---------------------------------------------------------------------------
// Screens
// ---------------------------------------------------------------------------
const screens: Record<string, HTMLElement> = {};
function addScreen(name: string, node: HTMLElement) { node.classList.add('screen'); node.dataset.screen = name; screens[name] = node; ui.appendChild(node); }
function show(name: string) {
  screen = name;
  for (const [k, n] of Object.entries(screens)) n.classList.toggle('on', k === name || (name === 'detail' && k === 'hud'));
  input.enabled = name === 'hud';
}

// ----- Menu -----
const menu = el('div', 'menu');
addScreen('menu', menu);
function renderMenu() {
  const wood = courseById('wood');
  const best = localStorage.getItem('gb.best.wood');
  menu.innerHTML = `
    <h1 class="logo">Gutter<span>ball</span></h1>
    <div class="tag">A physical world you can hold in your hands</div>
    <div class="menu-spacer"></div>
    <button class="hero-play" data-act="play" data-id="wood">
      <div><span class="small">World 1 · Wood · Free forever</span><span class="big">${wood.name}</span><span class="small">${best ? 'Best ' + fmtTime(Number(best)) : 'Start here'}</span></div>
      <span class="go">▶</span>
    </button>
    <div class="section-h"><h2>Physical worlds</h2><small>Tap to preview</small></div>
    <div class="worlds">
      ${CATALOG.map((c, i) => `
        <button class="world" data-act="detail" data-id="${c.id}">
          <span class="swatch" style="${swatch(c)}"></span>
          <span class="num">${String(i + 1).padStart(2, '0')}</span>
          <span class="wname">${c.world}</span>
          <span class="wtag">${c.tagline}</span>
          ${ownedBadge(c)}
        </button>`).join('')}
    </div>
    <div class="nav">
      <button data-act="adroom">Ad Room<small>Optional</small></button>
      <button data-act="garage">Garage<small>Cosmetics</small></button>
      <button data-act="settings">Settings<small>Controls</small></button>
    </div>
    <div class="footnote">No ads during play · Wood is free forever · Other worlds are optional<br/>Development build — purchases &amp; ad credits are simulated</div>`;
}

// ----- HUD -----
const hud = el('div', 'hud passthrough');
hud.innerHTML = `
  <div class="top"><div class="progress"><i></i></div><div class="clock">0:00.0</div><button class="pausebtn" data-act="pause" aria-label="Pause">❚❚</button></div>
  <div class="preview-tag" style="display:none"><span class="p">PREVIEW</span><span class="d"></span></div>
  <div class="hint"></div>
  <div class="launch"><div class="arrow">↑</div><div class="txt">Swipe up to launch</div><div class="sub2"></div></div>
  <div class="bottom">
    <div><div class="speed">0<small>KM/H</small></div><div class="drive"><i></i><i></i><i></i></div></div>
    <div class="magring"><svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="27" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="5"/><circle class="arc" cx="32" cy="32" r="27" fill="none" stroke="#47e6ff" stroke-width="5" stroke-linecap="round" stroke-dasharray="169.6" stroke-dashoffset="0"/></svg><div class="lbl">MAG</div></div>
  </div>`;
addScreen('hud', hud);
let hintTimer = 0;
game.cb.onHint = (text) => {
  const h = $('.hint', hud);
  h.textContent = text;
  h.classList.add('show');
  clearTimeout(hintTimer);
  hintTimer = window.setTimeout(() => h.classList.remove('show'), 3200);
};
let lastHud = 0;
game.cb.onHud = (s: HudState) => {
  const now = performance.now();
  if (now - lastHud < 66) return; // ~15 Hz DOM updates
  lastHud = now;
  if (screen !== 'hud' && screen !== 'detail') return;
  ($('.progress i', hud) as HTMLElement).style.width = `${(s.progress * 100).toFixed(1)}%`;
  $('.clock', hud).textContent = fmtTime(s.time);
  $('.speed', hud).firstChild!.textContent = String(Math.round(s.speedKmh));
  hud.querySelectorAll('.drive i').forEach((d, i) => d.classList.toggle('on', i <= s.driveLevel));
  ($('.magring .arc', hud) as unknown as SVGCircleElement).style.strokeDashoffset = String(169.6 * (1 - s.magnetEnergy));
  $('.magring', hud).classList.toggle('active', s.magnetActive);
  const launchEl = $('.launch', hud);
  launchEl.style.display = s.phase === 'ready' && s.mode === 'play' ? 'block' : 'none';
  $('.pausebtn', hud).style.display = s.mode === 'play' ? 'grid' : 'none';
  $('.bottom', hud).style.opacity = s.mode === 'play' ? '1' : '0.7';
};
game.cb.onPhase = (p: RunPhase) => {
  if (game.mode !== 'play') return;
  if (p === 'finished') setTimeout(showResults, 1400);
  if (p === 'respawning') toast('Off the track — back to the last checkpoint');
};

function controlsHint() {
  if (input.mode === 'tilt') return 'Tilt left/right to steer · tilt the top toward you to jump · tilt it away for the magnet';
  return '← → steer · Space jump · Shift magnet · ↑/↓ propulsion (desktop testing)';
}

// ----- Pause -----
const pause = el('div', 'results');
addScreen('pause', pause);
function showPause() {
  if (game.mode !== 'play') return;
  game.paused = true;
  pause.innerHTML = `
    <div class="lbl">Paused</div><div class="big" style="font-size:56px">${game.course?.world}</div>
    <div class="note" style="margin:10px 0 26px">${controlsHint()}</div>
    <div class="row" style="width:min(420px,100%);flex-direction:column">
      <button class="btn primary" data-act="resume">Resume</button>
      <div class="row"><button class="btn" data-act="restart">Restart</button><button class="btn" data-act="calibrate">Recalibrate tilt</button></div>
      <div class="row"><button class="btn" data-act="settings">Settings</button><button class="btn" data-act="menu">Quit to menu</button></div>
    </div>`;
  show('pause');
}
input.onPause = () => { if (screen === 'hud') showPause(); else if (screen === 'pause') resume(); };
function resume() { game.paused = false; show('hud'); }

// ----- Results -----
const results = el('div', 'results');
addScreen('results', results);
function showResults() {
  if (!game.run || !game.course) return;
  const t = game.run.finishTime;
  const key = `gb.best.${game.course.id}`;
  const prev = Number(localStorage.getItem(key) ?? 'Infinity');
  const isBest = t < prev;
  if (isBest) localStorage.setItem(key, String(t));
  results.innerHTML = `
    <div class="lbl">${game.course.name} · complete</div>
    <div class="big">${fmtTime(t)}</div>
    <div class="lbl" style="color:${isBest ? 'var(--wood)' : 'var(--ink-faint)'}">${isBest ? 'New personal best' : 'Best ' + fmtTime(prev)}</div>
    <div class="stats"><div><b>${game.run.falls}</b>falls</div><div><b>${(game.track!.length / 1000).toFixed(2)} km</b>distance</div></div>
    <div class="row"><button class="btn primary" data-act="restart">Run again</button><button class="btn" data-act="menu">Menu</button></div>`;
  show('results');
}

// ----- Course detail (over live preview) -----
const detail = el('div', 'passthrough');
addScreen('detailSheet', detail);
function openDetail(c: CourseEntry) {
  detailCourse = c;
  game.load(c, 'preview');
  const pt = $('.preview-tag', hud);
  pt.style.display = 'flex';
  $('.d', pt).textContent = `${c.world} — ${c.previewFocus}`;
  renderDetail();
  screen = 'detail';
  for (const [k, n] of Object.entries(screens)) n.classList.toggle('on', k === 'hud' || k === 'detailSheet');
  input.enabled = false;
}
function renderDetail() {
  const c = detailCourse!;
  const owned = entitlements.isEntitled(c.id);
  const m = MATERIALS[c.materialId];
  detail.innerHTML = `
    <div class="sheet">
      <div class="grab"></div>
      <h3>${c.world}</h3>
      <p class="sub">${c.name} · ${c.tagline}. ${c.previewFocus}.</p>
      <div class="card">
        <div class="kv"><span>Grip (static / sliding)</span><span>${m.muStatic.toFixed(2)} / ${m.muKinetic.toFixed(2)}</span></div>
        <div class="kv"><span>Rolling resistance</span><span>${m.rollingResistance.toFixed(3)}</span></div>
        <div class="kv"><span>Bounce</span><span>${m.restitution.toFixed(2)}</span></div>
        <div class="kv"><span>Medium</span><span>${m.medium === 'none' ? 'solid surface' : m.medium}</span></div>
        <div class="kv"><span>Course</span><span>${c.status === 'designed' ? 'hand-designed' : 'prototype layout'}</span></div>
      </div>
      <div class="row">
        ${owned ? `<button class="btn primary" data-act="play" data-id="${c.id}">Play</button>` : `<button class="btn primary" data-act="buy" data-id="${c.id}">Buy ${formatPrice(c)} <span class="sim" style="margin-left:6px">simulated</span></button>`}
        <button class="btn" data-act="closeDetail">Back</button>
      </div>
      <div class="note">${c.free ? 'Included free, permanently — a complete course, not a trial.' : `Watching the preview never grants ownership. This development build uses a purchase <b>simulator</b>: no money is charged and no store is contacted. Real purchases will use the App Store / Google Play.`}</div>
    </div>`;
}
game.cb.onPreviewEnd = () => {
  if (screen !== 'detail' || !detailCourse) return;
  game.load(detailCourse, 'preview'); // loop the preview
};

// ----- Tilt setup (touch devices). Gutterball is played by tilting only. -----
const controls = el('div', 'passthrough');
addScreen('controls', controls);
let pendingPlay: CourseEntry | null = null;
const isTouchDevice = () => matchMedia('(pointer: coarse)').matches;
function showTiltSetup(c: CourseEntry, failed: boolean) {
  pendingPlay = c;
  const framed = window.top !== window.self;
  controls.innerHTML = `
    <div class="sheet">
      <div class="grab"></div>
      <h3>${failed ? 'Tilt sensors are off' : 'Steer by tilting'}</h3>
      <p class="sub">${failed
        ? (framed
          ? 'This page is running inside a preview frame that blocks the motion sensors, so tilt cannot work here. Open the game\'s own web link in Safari instead.'
          : 'The game needs motion access to steer. Tap "Enable tilt" and choose Allow. If you chose Don\'t Allow earlier, close this tab, reopen the game link in Safari, and allow it when asked.')
        : 'Hold the device comfortably — that position becomes neutral when you launch.'}</p>
      <div class="card">
        <div class="kv"><span>Steer</span><span>tilt left / right</span></div>
        <div class="kv"><span>Jump</span><span>tilt the top toward you</span></div>
        <div class="kv"><span>Magnet tractor beam</span><span>tilt the top away, hold</span></div>
        <div class="kv"><span>Launch / propulsion</span><span>swipe up / down</span></div>
      </div>
      <div class="row" style="flex-direction:column">
        <button class="btn primary" data-act="useTilt">${failed ? 'Try again' : 'Enable tilt and play'}</button>
        <button class="btn" data-act="menu">Back</button>
      </div>
      <div class="note">Tip: turn on Rotation Lock in Control Center so the screen never rotates while you steer.</div>
    </div>`;
  show('controls');
}
async function startPlay(c: CourseEntry) {
  if (!entitlements.isEntitled(c.id)) { openDetail(c); return; }
  $('.preview-tag', hud).style.display = 'none';
  game.load(c, 'play');
  $('.launch .sub2', hud).textContent = controlsHint();
  show('hud');
  game.cb.onHint?.(input.mode === 'tilt' ? 'Hold the device comfortably, then swipe up to launch' : 'Press ↑ to launch');
}

// ----- Ad Room -----
const adroom = el('div', 'panel');
addScreen('adroom', adroom);
let selectedAd = SAMPLE_CREATIVES[0].adId;
let adRaf = 0;
function renderAdRoom() {
  const bal = adServer.balanceMs(playerId) / 1000;
  const need = COMMERCE_CONFIG.rewardThresholdSeconds;
  const st = playback.state;
  const cr = playback.creative ?? SAMPLE_CREATIVES.find((c) => c.adId === selectedAd)!;
  const settle = playback.lastSettlement;
  const total = REWARD_TABLE.reduce((a, r) => a + r.weight, 0);
  const rewards = adServer.activeRewards(playerId);
  const report = adServer.campaignReport(cr.campaignId);
  adroom.innerHTML = `
    <div class="panel-head"><button class="back" data-act="menu">←</button><h2>Ad Room</h2><span class="sim">simulation</span></div>
    <div class="adbanner">DEVELOPMENT SIMULATION. These are sample spots for fictional brands — not real advertising. Credits are tracked by an in-app mock server and are <b>not production-verified</b>; no money moves. Ads never appear during gameplay.</div>
    <div class="player"><canvas width="640" height="360"></canvas>
      ${st === 'idle' ? `<div class="ov"><div><div style="font-weight:700;font-size:18px">${cr.title}</div><div class="note" style="margin:6px 0 12px">${cr.advertiser} · ${(cr.durationMs / 1000).toFixed(0)} s · nothing plays until you press Start</div><button class="btn magnet" data-act="adStart" style="padding:12px 28px">▶ Start</button></div></div>` : ''}
      ${st === 'ended' ? `<div class="ov"><div><div class="lbl" style="font-family:var(--mono);font-size:11px;letter-spacing:.14em;color:var(--ink-dim)">${settle?.completed ? 'WATCHED TO THE END' : 'STOPPED'}</div><div style="font-size:40px;font-weight:800">+${((settle?.creditedMs ?? 0) / 1000).toFixed(1)} s</div><div class="note">${settle?.outcome === 'SETTLED' ? 'credited (simulated)' : 'not credited'}${settle?.reasons.length ? ' · ' + settle.reasons.join('; ') : ''}</div><button class="btn" data-act="adDismiss" style="margin-top:12px;padding:10px 24px">Choose another</button></div></div>` : ''}
    </div>
    <div class="timers">
      <div><b class="t-el">${(playback.mediaMs / 1000).toFixed(1)}</b><small>played</small></div>
      <div><b class="t-cr">${(playback.serverEligibleMs / 1000).toFixed(1)}</b><small>eligible (server)</small></div>
      <div><b>${bal.toFixed(1)}</b><small>balance s</small></div>
    </div>
    ${st === 'playing' || st === 'paused' ? `<div class="row" style="margin-bottom:14px"><button class="btn" data-act="${st === 'playing' ? 'adPause' : 'adResume'}">${st === 'playing' ? 'Pause' : 'Resume'}</button><button class="btn danger" data-act="adStop">Stop — keep my seconds</button></div>` : ''}
    <div class="ads">${SAMPLE_CREATIVES.map((c) => `<button class="ad ${c.adId === selectedAd ? 'sel' : ''}" data-act="adSelect" data-id="${c.adId}" ${st === 'playing' || st === 'paused' ? 'disabled' : ''}><div class="t">${c.title.replace(' — Sample Spot', '')}</div><div class="a">${c.advertiser}</div><div class="d">${(c.durationMs / 1000).toFixed(0)} s · SAMPLE</div></button>`).join('')}</div>
    <div class="card">
      <h4>Rewards</h4>
      <div class="meter"><i style="width:${Math.min(100, (bal / need) * 100).toFixed(1)}%"></i></div>
      <div class="kv"><span>Progress to next reward</span><span>${Math.min(bal, need).toFixed(1)} / ${need} s</span></div>
      <button class="btn magnet" style="width:100%;margin-top:10px" data-act="redeem" ${bal >= need ? '' : 'disabled'}>Redeem ${need} s for a random ${COMMERCE_CONFIG.rewardDurationDays}-day cosmetic</button>
      <div class="note">Odds: ${REWARD_TABLE.map((r) => `${r.name} ${(r.weight / total * 100).toFixed(0)}%`).join(' · ')}. Cosmetic only — never affects physics. No cash value. Thresholds and durations are provisional.</div>
      ${rewards.length ? `<div style="margin-top:10px">${rewards.map((r) => `<div class="kv"><span>${r.def.name}</span><span>expires ${new Date(r.expiresAt).toLocaleDateString()}</span></div>`).join('')}</div>` : ''}
    </div>
    <div class="card">
      <h4>Advertiser view <span class="sim">simulated</span></h4>
      <div class="kv"><span>Campaign</span><span>${cr.advertiser.replace(' (fictional)', '')}</span></div>
      <div class="kv"><span>Sessions started</span><span>${report.started}</span></div>
      <div class="kv"><span>Completed / partial views</span><span>${report.completedViews} / ${report.partialViews}</span></div>
      <div class="kv"><span>Invalidated</span><span>${report.invalidated}</span></div>
      <div class="kv"><span>Billable seconds</span><span>${report.billableSeconds.toFixed(1)}</span></div>
      <div class="kv"><span>Avg qualifying watch</span><span>${report.avgWatchSeconds.toFixed(1)} s</span></div>
      <div class="kv"><span>Simulated charges (provisional rate)</span><span>$${(report.chargesMicros / 1e6).toFixed(4)}</span></div>
      <div class="note">Advertisers pay only for qualifying seconds actually played — a stop at 11 s of a 25 s spot bills 11 s. Measures playback, not attention.</div>
    </div>
    <div class="card"><h4>Ledger (append-only, simulated)</h4><div class="ledger">${adServer.ledger.slice(-14).reverse().map((e) => `#${e.id} ${e.type} ${e.ms !== undefined ? (e.ms / 1000).toFixed(1) + 's' : ''} ${e.micros !== undefined ? '$' + (e.micros / 1e6).toFixed(4) : ''} ${e.rewardId ?? ''}`).join('<br/>') || 'No entries yet.'}</div></div>`;
  drawAd();
}
function drawAd() {
  const cv = $('.player canvas', adroom) as HTMLCanvasElement | null;
  if (!cv) return;
  const ctx = cv.getContext('2d')!;
  const cr = playback.creative ?? SAMPLE_CREATIVES.find((c) => c.adId === selectedAd)!;
  drawSampleAd(ctx, cr, playback.mediaMs, cv.width, cv.height);
}
function adLoop() {
  adRaf = requestAnimationFrame(adLoop);
  playback.tick();
  if (playback.state === 'playing') {
    drawAd();
    const t = $('.t-el', adroom); if (t) t.textContent = (playback.mediaMs / 1000).toFixed(1);
  }
}
playback.onUpdate = () => { if (screen === 'adroom') renderAdRoom(); };

// ----- Garage -----
const garage = el('div', 'panel');
addScreen('garage', garage);
const COSMETIC_DEFAULT = { skin: 'steel', beam: 'cyan', trail: false };
function activeCosmeticOptions() {
  const act = adServer.activeRewards(playerId);
  const skins = ['steel', ...act.filter((r) => r.def.kind === 'skin').map((r) => r.def.value)];
  const beams = ['cyan', ...act.filter((r) => r.def.kind === 'beam').map((r) => r.def.value)];
  const trail = act.some((r) => r.def.kind === 'trail');
  return { skins: [...new Set(skins)], beams: [...new Set(beams)], trail, act };
}
function loadCosmetics() {
  let c = { ...COSMETIC_DEFAULT };
  try { c = { ...c, ...JSON.parse(localStorage.getItem('gb.cosmetics') ?? '{}') }; } catch { /* default */ }
  const o = activeCosmeticOptions();
  if (!o.skins.includes(c.skin)) c.skin = 'steel';
  if (!o.beams.includes(c.beam)) c.beam = 'cyan';
  if (!o.trail) c.trail = false;
  game.cosmetics = c;
  game.applyCosmetics();
}
function renderGarage() {
  const o = activeCosmeticOptions();
  const c = game.cosmetics;
  const nm = (k: string) => REWARD_TABLE.find((r) => r.value === k)?.name ?? (k === 'steel' ? 'Polished Steel (standard)' : k === 'cyan' ? 'Cyan (standard)' : k);
  garage.innerHTML = `
    <div class="panel-head"><button class="back" data-act="menu">←</button><h2>Garage</h2></div>
    <div class="card"><h4>Ball</h4>${o.skins.map((s) => `<label class="set"><span>${nm(s)}</span><input type="radio" name="skin" value="${s}" ${c.skin === s ? 'checked' : ''} data-cos="skin"></label>`).join('')}</div>
    <div class="card"><h4>Tractor beam</h4>${o.beams.map((s) => `<label class="set"><span>${nm(s)}</span><input type="radio" name="beam" value="${s}" ${c.beam === s ? 'checked' : ''} data-cos="beam"></label>`).join('')}</div>
    ${o.trail ? `<div class="card"><h4>Effects</h4><label class="set"><span>Aurora rolling trail</span><input class="toggle" type="checkbox" ${c.trail ? 'checked' : ''} data-cos="trail"></label></div>` : ''}
    <div class="note">Cosmetics change appearance only — the ball's collision shape, mass and handling never change. Extra options appear here as temporary rewards from the optional Ad Room.</div>`;
}

// ----- Settings -----
const settingsEl = el('div', 'panel');
addScreen('settings', settingsEl);
let settingsReturn = 'menu';
function renderSettings() {
  const s = input.settings;
  settingsEl.innerHTML = `
    <div class="panel-head"><button class="back" data-act="settingsBack">←</button><h2>Settings</h2></div>
    <div class="card"><h4>Controls</h4>
      <label class="set"><span>Mode</span><select data-set="mode"><option value="tilt" ${input.mode === 'tilt' ? 'selected' : ''}>Tilt</option><option value="keyboard" ${input.mode === 'keyboard' ? 'selected' : ''}>Keyboard (desktop)</option></select></label>
      <label class="set"><span>Steering sensitivity <span class="note sens-val" style="display:inline">(full lock at ${(s.maxTilt / s.sensitivity).toFixed(0)}°)</span></span><input id="set-sens" type="range" min="0.5" max="3" step="0.05" value="${s.sensitivity}" data-set="sensitivity"></label>
      <label class="set"><span>Tilt dead zone</span><input id="set-dz" type="range" min="0" max="5" step="0.25" value="${s.deadzone}" data-set="deadzone"></label>
      <label class="set"><span>Keep view steady if the screen rotates</span><input id="set-keep" class="toggle" type="checkbox" ${s.keepView ? 'checked' : ''} data-set="keepView"></label>
      <label class="set"><span>Jump flick threshold</span><input type="range" min="8" max="30" step="1" value="${s.jumpThreshold}" data-set="jumpThreshold"></label>
      <label class="set"><span>Magnet tilt threshold</span><input type="range" min="6" max="25" step="1" value="${s.magnetThreshold}" data-set="magnetThreshold"></label>
      <label class="set"><span>Invert steering</span><input class="toggle" type="checkbox" ${s.invertSteer ? 'checked' : ''} data-set="invertSteer"></label>
      <div class="calib" style="margin-top:10px"><div class="dot-area"><div class="dot"></div></div><div style="flex:1"><div class="note" style="margin:0 0 6px">Hold the device the way you like to play, then set neutral. Tilt like a steering wheel.</div><div class="meter" style="margin:0 0 8px;position:relative"><i class="steer-bar" style="position:absolute;left:50%;width:0"></i></div><button class="btn" data-act="enableTilt">Enable tilt sensors</button><button class="btn" style="margin-top:8px;width:100%" data-act="calibrate">Set neutral here</button></div></div>
    </div>
    <div class="card"><h4>Feel</h4>
      <label class="set"><span>Haptics <span class="note" style="display:inline">(${haptics.driver.tier === 'none' ? 'no actuator detected' : haptics.driver.tier})</span></span><input class="toggle" type="checkbox" ${settings.haptics ? 'checked' : ''} data-set="haptics"></label>
      <label class="set"><span>Haptic strength</span><input type="range" min="0.2" max="1" step="0.05" value="${settings.hapticStrength}" data-set="hapticStrength"></label>
      <button class="btn" style="width:100%;margin-top:6px" data-act="testHaptic">Test haptics</button>
      <label class="set"><span>Fractal glow on the gutter</span><input id="set-fx" type="range" min="0" max="1" step="0.05" value="${settings.fractal}" data-set="fractal"></label>
      <label class="set"><span>Speed effects (blur, shake)</span><input id="set-speedfx" type="range" min="0" max="1" step="0.05" value="${settings.speedFx}" data-set="speedFx"></label>
      <label class="set"><span>Volume</span><input type="range" min="0" max="1" step="0.05" value="${settings.volume}" data-set="volume"></label>
      <label class="set"><span>Music</span><input class="toggle" type="checkbox" ${settings.music ? 'checked' : ''} data-set="music"></label>
    </div>
    <div class="card"><h4>Graphics</h4>
      <label class="set"><span>Quality</span><select data-set="quality"><option value="high" ${game.quality === 'high' ? 'selected' : ''}>High (shadows)</option><option value="low" ${game.quality === 'low' ? 'selected' : ''}>Battery saver</option></select></label>
      <div class="kv"><span>Frame rate</span><span class="fps">${game.fps.toFixed(0)} fps</span></div>
    </div>
    <div class="card"><h4>Purchases</h4>
      <button class="btn" style="width:100%" data-act="restore">Restore purchases</button>
      <div class="note">Development build: purchases are simulated locally (${entitlements.provider.kind}).</div>
      <button class="btn danger" style="width:100%;margin-top:10px" data-act="resetSim">Reset simulated purchases &amp; Ad Room data</button>
    </div>
    <div class="note">Gutterball ${__APP_VERSION__} · <a href="https://github.com/whitewolfcreativeworks-coder/gutterball-game" style="color:inherit">source</a></div>`;
}
let calibRaf = 0;
function calibLoop() {
  calibRaf = requestAnimationFrame(calibLoop);
  if (screen !== 'settings') return;
  const d = $('.calib .dot', settingsEl);
  if (!d) return;
  const r = input.tiltReadout();
  const x = Math.max(-1, Math.min(1, r.roll / 30)) * 47, y = Math.max(-1, Math.min(1, -r.pitch / 30)) * 47;
  d.style.transform = `translate(${x}px, ${y}px)`;
  const bar = $('.steer-bar', settingsEl);
  if (bar) { const v = r.steer; bar.style.width = `${Math.abs(v) * 50}%`; bar.style.left = v < 0 ? `${50 - Math.abs(v) * 50}%` : '50%'; }
  const sv = $('.sens-val', settingsEl); if (sv) sv.textContent = `(full lock at ${(input.settings.maxTilt / input.settings.sensitivity).toFixed(0)}°)`;
  const f = $('.fps', settingsEl); if (f) f.textContent = `${game.fps.toFixed(0)} fps`;
}
calibLoop();

// ---------------------------------------------------------------------------
// Settings persistence
// ---------------------------------------------------------------------------
function loadSettings() {
  const def = { haptics: true, hapticStrength: 0.8, volume: 0.85, music: true, fractal: 0.6, speedFx: 0.8, input: undefined as any, mode: undefined as any, inputVersion: 0 };
  try { return { ...def, ...JSON.parse(localStorage.getItem('gb.settings') ?? '{}') }; } catch { return def; }
}
function saveSettings() {
  settings.input = input.settings;
  settings.mode = input.mode;
  localStorage.setItem('gb.settings', JSON.stringify(settings));
}
function applySettings() {
  // Settings saved by the first build used much less sensitive tilt defaults; drop them
  if (settings.input && (settings.input.keepView === undefined || (settings.inputVersion ?? 0) < 4)) settings.input = undefined;
  settings.inputVersion = 4;
  if (settings.input) input.settings = { ...input.settings, ...settings.input };
  if (settings.mode === 'keyboard' && !matchMedia('(pointer: coarse)').matches) input.mode = 'keyboard';
  haptics.enabled = settings.haptics;
  game.fractalLevel = settings.fractal;
  game.speedFx = settings.speedFx;
  haptics.intensity = settings.hapticStrength;
  audio.setVolume(settings.volume);
  audio.setMusic(settings.music);
}

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------
input.onLaunch = () => { const ok = game.launch(); if (ok) { viewLockAngle = screenAngle(); applyViewLock(); } return ok; };
input.onRestart = () => { if (screen === 'hud' || screen === 'results') { game.restart(); show('hud'); } };


ui.addEventListener('click', async (e) => {
  const t = (e.target as HTMLElement).closest('[data-act]') as HTMLElement | null;
  if (!t) return;
  const act = t.dataset.act!;
  const id = t.dataset.id;
  audio.ui('tap');
  switch (act) {
    case 'play': {
      const c = courseById(id!);
      if (!entitlements.isEntitled(c.id)) { openDetail(c); break; }
      if (!isTouchDevice()) { input.mode = 'keyboard'; startPlay(c); break; }
      // Touch device: tilt is required. Ask for motion access inside this tap (iOS rule).
      if (await input.requestSensors()) startPlay(c);
      else showTiltSetup(c, true);
      break;
    }
    case 'useTilt': {
      if (await input.requestSensors()) startPlay(pendingPlay!);
      else showTiltSetup(pendingPlay!, true);
      break;
    }
    case 'detail': openDetail(courseById(id!)); break;
    case 'closeDetail': goMenu(); break;
    case 'buy': {
      const c = courseById(id!);
      t.setAttribute('disabled', '');
      const r = await entitlements.purchase(c.id, c.productId!);
      if (r.ok) { toast(`${c.world} unlocked (simulated purchase — nothing charged)`); audio.ui('reward'); }
      else toast(r.error ?? 'Purchase failed');
      renderDetail();
      break;
    }
    case 'pause': showPause(); break;
    case 'resume': resume(); break;
    case 'restart': game.paused = false; game.restart(); show('hud'); break;
    case 'calibrate': input.calibrate(); toast('Neutral position set'); break;
    case 'enableTilt': { const ok = await input.requestSensors(); toast(ok ? 'Tilt sensors on' : 'Tilt sensors unavailable on this device'); saveSettings(); renderSettings(); break; }
    case 'menu': game.paused = false; goMenu(); break;
    case 'adroom': playback.dismiss(); renderAdRoom(); show('adroom'); cancelAnimationFrame(adRaf); adLoop(); break;
    case 'adSelect': selectedAd = id!; renderAdRoom(); break;
    case 'adStart': playback.start(SAMPLE_CREATIVES.find((c) => c.adId === selectedAd)!); if (playback.error) toast(playback.error); break;
    case 'adPause': playback.pause(); break;
    case 'adResume': playback.resume(); break;
    case 'adStop': playback.stop(); break;
    case 'adDismiss': playback.dismiss(); break;
    case 'redeem': {
      try {
        const r = adServer.redeem(playerId, `${playerId}-${Date.now()}`);
        audio.ui('reward');
        toast(`You got: ${r.def.name} for ${COMMERCE_CONFIG.rewardDurationDays} days — equip it in the Garage`);
      } catch (err) { toast((err as Error).message); }
      renderAdRoom();
      break;
    }
    case 'garage': renderGarage(); show('garage'); break;
    case 'settings': settingsReturn = screen === 'pause' ? 'pause' : 'menu'; renderSettings(); show('settings'); break;
    case 'settingsBack': saveSettings(); if (settingsReturn === 'pause') showPause(); else goMenu(); break;
    case 'testHaptic': haptics.test(); if (haptics.driver.tier === 'none') toast('No vibration hardware available here — gameplay is unaffected'); break;
    case 'restore': { const list = await entitlements.restore(); toast(`Restored ${list.length} simulated purchase(s)`); break; }
    case 'resetSim': (entitlements.provider as DevEntitlementSimulator).reset?.(); adServer.resetAll(); await entitlements.refresh(); loadCosmetics(); toast('Simulation data cleared'); renderSettings(); break;
  }
});

ui.addEventListener('input', (e) => {
  const t = e.target as HTMLInputElement;
  const k = t.dataset.set;
  if (k) {
    const v = t.type === 'checkbox' ? t.checked : t.type === 'range' ? Number(t.value) : t.value;
    if (k in input.settings) (input.settings as any)[k] = v;
    if (k === 'mode') { input.mode = v as any; if (v === 'tilt') input.requestSensors(); }
    if (k === 'keepView') applyViewLock();
    if (k === 'haptics') { settings.haptics = !!v; haptics.enabled = !!v; }
    if (k === 'hapticStrength') { settings.hapticStrength = Number(v); haptics.intensity = Number(v); }
    if (k === 'volume') { settings.volume = Number(v); audio.setVolume(Number(v)); }
    if (k === 'music') { settings.music = !!v; audio.setMusic(!!v); }
    if (k === 'quality') game.setQuality(v as any);
    if (k === 'fractal') { settings.fractal = Number(v); game.fractalLevel = Number(v); }
    if (k === 'speedFx') { settings.speedFx = Number(v); game.speedFx = Number(v); }
    saveSettings();
  }
  const cos = t.dataset.cos;
  if (cos) {
    const c = { ...game.cosmetics };
    if (cos === 'trail') c.trail = t.checked; else (c as any)[cos] = t.value;
    game.cosmetics = c;
    localStorage.setItem('gb.cosmetics', JSON.stringify(c));
    game.applyCosmetics();
  }
});

// ---------------------------------------------------------------------------
// View lock. Web pages can't lock screen orientation on iOS, so during a run we
// remember the screen rotation at launch and, if the OS rotates the display
// (because the player tilted far), rotate the stage back the other way.
// ---------------------------------------------------------------------------
let viewLockAngle: number | null = null;
let rotationTipShown = false;
function applyViewLock() {
  let rot = 0;
  const inRun = screen === 'hud' || screen === 'pause' || screen === 'results';
  if (viewLockAngle !== null && inRun && input.settings.keepView) {
    rot = -(((screenAngle() - viewLockAngle + 540) % 360) - 180);
    if (rot === -180) rot = 180;
  }
  stage.classList.toggle('rot90', rot === 90);
  stage.classList.toggle('rot-90', rot === -90);
  stage.classList.toggle('rot180', rot === 180);
  input.displayRotation = rot;
  game.resize();
  if (rot !== 0 && !rotationTipShown) {
    rotationTipShown = true;
    toast('Tip: turn on Rotation Lock in Control Center so the screen never rotates while you steer');
  }
}
addEventListener('orientationchange', () => setTimeout(applyViewLock, 50));
addEventListener('resize', () => setTimeout(applyViewLock, 50));
(window.screen as any).orientation?.addEventListener?.('change', () => setTimeout(applyViewLock, 50));

function goMenu() {
  detailCourse = null;
  viewLockAngle = null;
  $('.preview-tag', hud).style.display = 'none';
  if (game.mode !== 'attract' || game.course?.id !== 'wood') game.load(courseById('wood'), 'attract');
  renderMenu();
  show('menu');
}

entitlements.onChange(() => { if (screen === 'menu') renderMenu(); });

(async () => {
  await entitlements.init();
  loadCosmetics();
  goMenu();
  // deep links for testing: ?play=wood, ?preview=ice, ?screen=adroom
  const q = new URLSearchParams(location.search);
  if (q.get('play')) {
    input.mode = (q.get('mode') as any) ?? input.mode;
    startPlay(courseById(q.get('play')!));
    if (q.get('launch')) setTimeout(() => game.launch(), 600);
    const at = Number(q.get('at'));
    if (at > 0) setTimeout(() => { game.launch(); game.run?.ball.placeAt(at, Number(q.get('v') ?? 18), 0, Number(q.get('branch') ?? 0)); game.camera.snap(); }, 700);
  }
  else if (q.get('preview')) openDetail(courseById(q.get('preview')!));
  else if (q.get('screen') === 'adroom') { renderAdRoom(); show('adroom'); adLoop(); }
  else if (q.get('screen') === 'settings') { renderSettings(); show('settings'); }
})();

declare const __APP_VERSION__: string;
