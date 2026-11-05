// Captures a trigger pad and hologram obstacles on Wood (headless, slow on SwiftShader).
import puppeteer from 'puppeteer-core';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
const root = new URL('../dist/', import.meta.url).pathname;
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png' };
const server = createServer(async (req, res) => {
  const p = decodeURIComponent(new URL(req.url, 'http://x').pathname); const file = p === '/' ? 'index.html' : p;
  try { const f = await readFile(join(root, file)); res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' }); res.end(f); } catch { res.writeHead(404); res.end(); }
}).listen(4174);
const browser = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--no-proxy-server'] });
const shot = async (name, at, setup) => {
  const p = await browser.newPage();
  await p.setViewport({ width: 390, height: 780, deviceScaleFactor: 1 });
  p.on('pageerror', (e) => console.log('ERR', e.message));
  await p.goto(`http://127.0.0.1:4174/?play=wood&mode=keyboard&quality=low&fixed=1&at=${at}&v=20`, { waitUntil: 'load' });
  await p.waitForFunction(() => window.__gutterball?.game?.run?.time > 0.1, { timeout: 300000, polling: 500 });
  if (setup) await p.evaluate(setup);
  await p.waitForFunction(() => window.__gutterball.game.run.time > 1.0, { timeout: 300000, polling: 500 });
  await p.screenshot({ path: `screenshots/${name}.png` }); await p.close();
};
await shot('holo-pad', 725);
await shot('holo-obstacles', 850, () => { const g = window.__gutterball.game; g.run.course.main.triggerPad(0); });
await browser.close(); server.close();
