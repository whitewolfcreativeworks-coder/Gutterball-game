// Headless smoke test: serves dist/, drives the game in Chrome (SwiftShader WebGL),
// captures screenshots and fails on any page error.
import puppeteer from 'puppeteer-core';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const root = new URL('../dist/', import.meta.url).pathname;
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.webmanifest': 'application/manifest+json' };
const server = createServer(async (req, res) => {
  const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const file = p === '/' ? 'index.html' : p;
  try { const f = await readFile(join(root, file)); res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' }); res.end(f); }
  catch { res.writeHead(404); res.end(); }
}).listen(4173);

const chrome = process.env.CHROME ?? '/usr/bin/google-chrome';
const browser = await puppeteer.launch({ executablePath: chrome, headless: true, args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required', '--proxy-bypass-list=<-loopback>;localhost;127.0.0.1', '--no-proxy-server'] });
const errors = [];
const shots = (process.env.SHOTS ?? 'menu,play,preview-ice,preview-metal,adroom').split(',');
async function page(url, w = Number(process.env.W ?? 300), h = Number(process.env.H ?? 650)) {
  const p = await browser.newPage();
  await p.setViewport({ width: w, height: h, deviceScaleFactor: 1, isMobile: false });
  p.on('pageerror', (e) => errors.push(`${url}: ${e.message}`));
  p.on('console', (m) => { if (m.type() === 'error') errors.push(`${url}: console: ${m.text()}`); });
  await p.goto(`http://127.0.0.1:4173/${url}`, { waitUntil: 'load' });
  return p;
}
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
try {
  if (shots.includes('menu')) { const p = await page(''); await wait(5000); await p.screenshot({ path: 'screenshots/menu.png' }); await p.close(); }
  if (shots.includes('play')) {
    const p = await page('?play=wood&mode=keyboard&launch=1&quality=low');
    await wait(9000);
    await p.screenshot({ path: 'screenshots/play-1.png' });
    await p.keyboard.down('ArrowLeft'); await wait(1500); await p.keyboard.up('ArrowLeft');
    await p.screenshot({ path: 'screenshots/play-2-steer.png' });
    await p.keyboard.press('Space'); await wait(350);
    await p.keyboard.down('Shift'); await wait(250);
    await p.screenshot({ path: 'screenshots/play-3-jump-magnet.png' });
    await p.keyboard.up('Shift');
    const st = await p.evaluate(() => { const g = window.__gutterball.game; return { s: g.run.ball.proj.s, v: g.run.ball.v.length(), phase: g.run.phase, fps: g.fps }; });
    console.log('play state', JSON.stringify(st));
    await p.close();
  }
  for (const [name, at] of [['vista', 690], ['wallride', 905], ['loop', 1445], ['spiral', 1150]]) if (shots.includes(name)) {
    const p = await page(`?play=wood&mode=keyboard&quality=low&fixed=1&at=${at}&v=20`); await p.waitForFunction(() => window.__gutterball?.game?.run?.time > 1.2, { timeout: 300000, polling: 500 }); await p.screenshot({ path: `screenshots/wood-${name}.png` }); await p.close();
  }
  for (const w of ['ice', 'metal', 'water']) if (shots.includes('preview-' + w)) {
    const p = await page(`?preview=${w}&quality=low`); await wait(9000); await p.screenshot({ path: `screenshots/preview-${w}.png` }); await p.close();
  }
  if (shots.includes('adroom')) {
    const p = await page('?screen=adroom');
    await wait(1500);
    await p.evaluate(() => document.querySelector('[data-act=adStart]').click()); await wait(4200);
    await p.screenshot({ path: 'screenshots/adroom-playing.png' });
    await p.evaluate(() => document.querySelector('[data-act=adStop]').click()); await wait(500);
    await p.screenshot({ path: 'screenshots/adroom-stopped.png' });
    const led = await p.evaluate(() => window.__gutterball.adServer.ledger.map((e) => e.type + ':' + e.ms));
    console.log('ledger', led.join(' '));
    await p.close();
  }
} finally {
  await browser.close();
  server.close();
}
if (errors.length) { console.error('ERRORS:\n' + errors.join('\n')); process.exit(1); }
console.log('smoke ok');
