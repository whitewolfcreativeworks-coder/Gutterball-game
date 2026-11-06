// Screenshot at a spot on a course: SHOTS="world:at:name,world:at:name" (headless, slow on SwiftShader).
import puppeteer from 'puppeteer-core';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
const root = new URL('../dist/', import.meta.url).pathname;
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png' };
const port = 4180 + Math.floor(Math.random() * 100);
const server = createServer(async (req, res) => {
  const p = decodeURIComponent(new URL(req.url, 'http://x').pathname); const file = p === '/' ? 'index.html' : p;
  try { const f = await readFile(join(root, file)); res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' }); res.end(f); } catch { res.writeHead(404); res.end(); }
}).listen(port);
const browser = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', headless: true, protocolTimeout: 900000, args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--no-proxy-server'] });
for (const spec of (process.env.SHOTS ?? '').split(',').filter(Boolean)) {
  const [world, at, name, wait] = spec.split(':');
  const p = await browser.newPage();
  await p.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  p.on('pageerror', (e) => console.log('ERR', e.message));
  await p.goto(`http://127.0.0.1:${port}/?play=${world}&mode=keyboard&quality=low&fixed=1&at=${at}&v=24${process.env.AUTO ? '&auto=1' : ''}`, { waitUntil: 'load' });
  if (process.env.DROP) {
    // knock the ball off the side of the gutter (to see the safety net catch it)
    await p.waitForFunction(() => window.__gutterball?.game?.run?.time > 0.05, { timeout: 900000, polling: 1000 });
    await p.evaluate(() => { const b = window.__gutterball.game.run.ball; b.v.addScaledVector(b.proj.R, 14).addScaledVector(b.proj.U, 9); });
  }
  await p.waitForFunction((w) => window.__gutterball?.game?.run?.time > w, { timeout: 900000, polling: 1000 }, Number(wait ?? 0.8));
  await p.screenshot({ path: `screenshots/${name}.png` });
  console.log('shot', name);
  await p.close();
}
await browser.close(); server.close();
