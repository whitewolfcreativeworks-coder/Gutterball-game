// Captures the plunger launcher at rest and pulled back (headless, slow on SwiftShader).
import puppeteer from 'puppeteer-core';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
const root = new URL('../dist/', import.meta.url).pathname;
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png' };
const server = createServer(async (req, res) => {
  const p = decodeURIComponent(new URL(req.url, 'http://x').pathname); const file = p === '/' ? 'index.html' : p;
  try { const f = await readFile(join(root, file)); res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' }); res.end(f); } catch { res.writeHead(404); res.end(); }
}).listen(4176);
const browser = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', headless: true, protocolTimeout: 600000, args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--no-proxy-server'] });
const p = await browser.newPage();
await p.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
p.on('pageerror', (e) => console.log('ERR', e.message));
await p.goto(`http://127.0.0.1:4176/?play=${process.env.WORLD ?? 'wood'}&mode=keyboard&quality=low&fixed=1`, { waitUntil: 'load' });
await p.waitForFunction(() => window.__gutterball?.game?.intro, { timeout: 300000, polling: 500 });
await new Promise((r) => setTimeout(r, 6000));
await p.screenshot({ path: 'screenshots/plunger-1.png' });
await p.evaluate(() => window.__gutterball.game.intro.setPull(0.85));
await p.waitForFunction(() => window.__gutterball.game.intro.pull > 0.8, { timeout: 500000, polling: 1000 });
await new Promise((r) => setTimeout(r, 3000));
await p.screenshot({ path: 'screenshots/plunger-2.png' });
await browser.close(); server.close();
