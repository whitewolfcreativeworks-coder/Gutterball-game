import { CanvasTexture, RepeatWrapping, SRGBColorSpace, Texture, LinearSRGBColorSpace } from 'three';

/**
 * Procedural surface textures. Every world's track surface is generated at
 * load time from a height field, producing colour, normal and roughness maps.
 * No external image assets are required, which keeps the build small and
 * the licensing trivial (see docs/ASSETS.md).
 *
 * One texture tile covers TILE metres across and TILE metres along the track.
 */
export const TILE = 2.4;

export interface SurfaceMaps { map: Texture; normalMap: Texture; roughnessMap: Texture; alphaMap?: Texture; }

type RGB = [number, number, number];

function rng(seed: number) {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

/** Tileable value noise */
function makeNoise(size: number, cells: number, seed: number) {
  const r = rng(seed);
  const g = new Float32Array(cells * cells).map(() => r());
  return (u: number, v: number) => {
    const x = (u * cells) % cells, y = (v * cells) % cells;
    const x0 = Math.floor(x), y0 = Math.floor(y);
    const fx = x - x0, fy = y - y0;
    const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
    const i = (a: number, b: number) => g[((b + cells) % cells) * cells + ((a + cells) % cells)];
    const a = i(x0, y0) + (i(x0 + 1, y0) - i(x0, y0)) * sx;
    const b = i(x0, y0 + 1) + (i(x0 + 1, y0 + 1) - i(x0, y0 + 1)) * sx;
    return a + (b - a) * sy;
  };
}
function fbm(n: Array<(u: number, v: number) => number>, u: number, v: number) {
  let s = 0, a = 0.5, t = 0;
  for (const f of n) { s += f(u, v) * a; t += a; a *= 0.5; }
  return s / t;
}

interface Field { h: Float32Array; c: Float32Array; r: Float32Array; a?: Float32Array; }

function generate(kind: string, N: number, tint: RGB): Field {
  const h = new Float32Array(N * N);
  const c = new Float32Array(N * N * 3);
  const rgh = new Float32Array(N * N);
  let alpha: Float32Array | undefined;
  const n1 = [makeNoise(N, 8, 11), makeNoise(N, 16, 12), makeNoise(N, 32, 13), makeNoise(N, 64, 14)];
  const n2 = [makeNoise(N, 4, 21), makeNoise(N, 8, 22)];
  const r = rng(kind.length * 977);
  const plankRand = Array.from({ length: 64 }, () => r());
  const set = (i: number, hv: number, col: RGB, rv: number) => {
    h[i] = hv; c[i * 3] = col[0]; c[i * 3 + 1] = col[1]; c[i * 3 + 2] = col[2]; rgh[i] = rv;
  };
  const mul = (k: number, base: RGB = tint): RGB => [base[0] * k, base[1] * k, base[2] * k];
  if (kind === 'grating') alpha = new Float32Array(N * N);
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const u = x / N, v = y / N; // u = across, v = along
      const i = y * N + x;
      const nz = fbm(n1, u, v);
      switch (kind) {
        case 'wood': {
          const planks = 8;
          const pi = Math.floor(u * planks);
          const pu = u * planks - pi;
          const pr = plankRand[pi];
          // grain runs along v; stretched noise
          // grain: long, gently wavering lines along the plank (v), varied per plank
          const warp = fbm(n2, u * 2 + pr, v * 0.5) * 3.2;
          const grain = Math.sin((pu * 5.5 + warp + pr * 9) * Math.PI * 2) * 0.5 + 0.5;
          const ring = Math.pow(grain, 6);
          const fleck = Math.pow(n1[3](u, v * 0.25), 4);
          const groove = Math.min(1, Math.min(pu, 1 - pu) * 70); // gaps between planks
          const joint = Math.min(1, Math.min(v, 1 - v) * 90);     // cross joint at tile ends
          const shade = 0.86 + (pr - 0.5) * 0.28 - ring * 0.12 - fleck * 0.1 + (nz - 0.5) * 0.12;
          const k = shade * (0.4 + 0.6 * groove * joint);
          set(i, 0.5 + ring * 0.04 - (1 - groove) * 0.5 - (1 - joint) * 0.5 + nz * 0.03, mul(k), 0.5 + ring * 0.15 + (1 - groove) * 0.3);
          break;
        }
        case 'concrete': {
          const pores = Math.pow(n1[3](u, v), 6);
          const form = Math.min(1, Math.min(v, 1 - v) * 120);
          const k = 0.8 + (nz - 0.5) * 0.35 - pores * 0.4;
          set(i, nz * 0.4 - pores * 0.5 - (1 - form) * 0.3, mul(k * (0.8 + 0.2 * form)), 0.85 + pores * 0.1);
          break;
        }
        case 'metal': {
          const brushed = n1[3](u * 0.05, v * 1) * 0.5 + makeNoiseLine(v, 300) * 0.5;
          const pu = (u * 4) % 1;
          const seam = Math.min(1, Math.min(v, 1 - v) * 90) * Math.min(1, Math.min(pu, 1 - pu) * 90);
          // rivets along seams
          const rv = Math.hypot(((u * 16) % 1) - 0.5, (Math.min(v, 1 - v) * 16) - 0.4);
          const rivet = rv < 0.18 ? 1 - rv / 0.18 : 0;
          const k = 0.85 + brushed * 0.15 - (1 - seam) * 0.4 + rivet * 0.25;
          set(i, brushed * 0.1 - (1 - seam) * 0.6 + rivet * 0.6, mul(k), 0.25 + brushed * 0.12 + (1 - seam) * 0.3);
          break;
        }
        case 'ice': {
          const crack = Math.pow(1 - Math.abs(fbm(n2, u * 2, v * 2) * 2 - 1), 18);
          const k = 0.92 + (nz - 0.5) * 0.15 + crack * 0.25;
          set(i, -crack * 0.5 + nz * 0.15, mul(k), 0.04 + crack * 0.25 + nz * 0.05);
          break;
        }
        case 'aqueduct': {
          const tu = (u * 6) % 1, tv = (v * 6 + (Math.floor(u * 6) % 2) * 0.5) % 1;
          const grout = Math.min(1, Math.min(tu, 1 - tu, tv, 1 - tv) * 40);
          const k = 0.75 + nz * 0.3;
          const col: RGB = grout < 1 ? mul(0.6) : [0.32 * k + 0.4, 0.62 * k, 0.66 * k];
          set(i, grout * 0.4 + nz * 0.1, col, 0.4 + (1 - grout) * 0.4);
          break;
        }
        case 'glass': {
          const pu = (u * 2) % 1;
          const edge = Math.min(1, Math.min(v * 3 % 1, 1 - (v * 3 % 1)) * 120) * Math.min(1, Math.min(pu, 1 - pu) * 120);
          set(i, -(1 - edge) * 0.4, mul(1), 0.03 + (1 - edge) * 0.3);
          break;
        }
        case 'rubber': {
          const tread = (Math.sin((u * 12 + v * 4) * Math.PI * 2) > 0.6 ? 1 : 0);
          const k = 0.9 + (nz - 0.5) * 0.2 + tread * 0.12;
          set(i, tread * 0.25 + nz * 0.1, mul(k), 0.8 - tread * 0.1);
          break;
        }
        case 'sand': {
          const ripple = Math.sin((v * 18 + fbm(n2, u, v) * 4) * Math.PI * 2) * 0.5 + 0.5;
          const grains = n1[3](u * 4 % 1, v * 4 % 1);
          const k = 0.88 + ripple * 0.1 + (grains - 0.5) * 0.15;
          set(i, ripple * 0.3 + grains * 0.15, mul(k), 0.95);
          break;
        }
        case 'mud': {
          const wet = fbm(n2, u, v);
          const k = 0.7 + nz * 0.4 - (wet > 0.55 ? 0.15 : 0);
          set(i, nz * 0.5 + (wet > 0.55 ? -0.1 : 0), mul(k), wet > 0.55 ? 0.15 : 0.7);
          break;
        }
        case 'marble': {
          const vein = Math.pow(1 - Math.abs(Math.sin((u * 3 + v * 2 + fbm(n1, u, v) * 4) * Math.PI)), 14);
          const slab = Math.min(1, Math.min((v * 2) % 1, 1 - (v * 2) % 1) * 150);
          const k = 0.95 - vein * 0.35 + (nz - 0.5) * 0.06;
          set(i, -(1 - slab) * 0.4 - vein * 0.02, [tint[0] * k, tint[1] * k * 0.98, tint[2] * k * 0.95], 0.08 + vein * 0.1 + (1 - slab) * 0.3);
          break;
        }
        case 'grating': {
          const bu = (u * 16) % 1, bv = (v * 8) % 1;
          const bar = bu < 0.22 || bv < 0.18;
          const k = 0.8 + nz * 0.3;
          set(i, bar ? 0.5 : 0, mul(bar ? k : 0.2), bar ? 0.45 : 1);
          alpha![i] = bar ? 1 : 0;
          break;
        }
        case 'snow': {
          const sparkle = Math.pow(n1[3](u, v), 12);
          const k = 0.94 + (nz - 0.5) * 0.08 + sparkle * 0.1;
          set(i, nz * 0.4, mul(k), 0.9 - sparkle * 0.5);
          break;
        }
        default:
          set(i, nz, mul(1), 0.5);
      }
    }
  }
  return { h, c, r: rgh, a: alpha };
}

function makeNoiseLine(v: number, freq: number) {
  return (Math.sin(v * freq * 1.3) * Math.sin(v * freq * 0.37 + 1.7) + 1) * 0.5;
}

function toCanvas(N: number, fn: (i: number, data: Uint8ClampedArray, o: number) => void): HTMLCanvasElement | OffscreenCanvas {
  const cv: any = typeof OffscreenCanvas !== 'undefined' ? new OffscreenCanvas(N, N) : Object.assign(document.createElement('canvas'), { width: N, height: N });
  const ctx = cv.getContext('2d') as CanvasRenderingContext2D;
  const img = ctx.createImageData(N, N);
  for (let i = 0; i < N * N; i++) fn(i, img.data, i * 4);
  ctx.putImageData(img, 0, 0);
  return cv;
}

function tex(cv: any, srgb: boolean) {
  const t = new CanvasTexture(cv);
  t.wrapS = t.wrapT = RepeatWrapping;
  t.colorSpace = srgb ? SRGBColorSpace : LinearSRGBColorSpace;
  t.anisotropy = 8;
  t.needsUpdate = true;
  return t;
}

const cache = new Map<string, SurfaceMaps>();

export function surfaceMaps(kind: string, tintHex: number, N = 512): SurfaceMaps {
  const key = `${kind}:${tintHex}:${N}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const tint: RGB = [((tintHex >> 16) & 255) / 255, ((tintHex >> 8) & 255) / 255, (tintHex & 255) / 255];
  const f = generate(kind, N, tint);
  const lin = (x: number) => Math.max(0, Math.min(255, Math.round(x * 255)));
  const map = tex(toCanvas(N, (i, d, o) => { d[o] = lin(f.c[i * 3]); d[o + 1] = lin(f.c[i * 3 + 1]); d[o + 2] = lin(f.c[i * 3 + 2]); d[o + 3] = 255; }), true);
  const strength = 3.0;
  const normalMap = tex(toCanvas(N, (i, d, o) => {
    const x = i % N, y = (i / N) | 0;
    const hL = f.h[y * N + ((x - 1 + N) % N)], hR = f.h[y * N + ((x + 1) % N)];
    const hD = f.h[((y - 1 + N) % N) * N + x], hU = f.h[((y + 1) % N) * N + x];
    let nx = (hL - hR) * strength, ny = (hD - hU) * strength, nz = 1;
    const l = Math.hypot(nx, ny, nz); nx /= l; ny /= l; nz /= l;
    d[o] = lin(nx * 0.5 + 0.5); d[o + 1] = lin(ny * 0.5 + 0.5); d[o + 2] = lin(nz * 0.5 + 0.5); d[o + 3] = 255;
  }), false);
  const roughnessMap = tex(toCanvas(N, (i, d, o) => { const v = lin(f.r[i]); d[o] = v; d[o + 1] = v; d[o + 2] = v; d[o + 3] = 255; }), false);
  let alphaMap: Texture | undefined;
  if (f.a) alphaMap = tex(toCanvas(N, (i, d, o) => { const v = lin(f.a![i]); d[o] = v; d[o + 1] = v; d[o + 2] = v; d[o + 3] = 255; }), false);
  const res = { map, normalMap, roughnessMap, alphaMap };
  cache.set(key, res);
  return res;
}

/** Steel ball detail: subtle machining rings + a faint engraved band so spin is readable. */
export function ballMaps(skin: string): { map: Texture; roughnessMap: Texture } {
  const W = 512, H = 256;
  const mk = (fn: (u: number, v: number) => [number, number, number, number]) => {
    const cv: any = typeof OffscreenCanvas !== 'undefined' ? new OffscreenCanvas(W, H) : Object.assign(document.createElement('canvas'), { width: W, height: H });
    const ctx = cv.getContext('2d');
    const img = ctx.createImageData(W, H);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const [r, g, b, a] = fn(x / W, y / H);
      const o = (y * W + x) * 4;
      img.data[o] = r; img.data[o + 1] = g; img.data[o + 2] = b; img.data[o + 3] = a;
    }
    ctx.putImageData(img, 0, 0);
    return cv;
  };
  const band = (v: number) => Math.abs(v - 0.5) < 0.012 ? 1 : 0;
  const dot = (u: number, v: number) => (Math.hypot((u - 0.25) * 2, v - 0.5) < 0.045 || Math.hypot((u - 0.75) * 2, v - 0.5) < 0.045) ? 1 : 0;
  if (skin === 'rolypoly') {
    // A curled pill bug: dark segmented plates
    const segs = 9;
    const colour = mk((u, v) => {
      const s = (v * segs) % 1;
      const edge = s < 0.12 ? 0.45 : 1;
      const spec = 0.75 + 0.25 * Math.sin(u * Math.PI * 40) * 0.1;
      const k = edge * spec;
      return [Math.round(88 * k), Math.round(84 * k), Math.round(96 * k), 255];
    });
    const rough = mk((u, v) => { const s = (v * segs) % 1; const k = s < 0.12 ? 200 : 110; return [k, k, k, 255]; });
    return { map: tex(colour, true), roughnessMap: tex(rough, false) };
  }
  const tints: Record<string, [number, number, number]> = {
    steel: [235, 238, 242], gold: [255, 205, 120], copper: [240, 160, 120], obsidian: [70, 72, 80], aurora: [180, 230, 255],
  };
  const t = tints[skin] ?? tints.steel;
  const colour = mk((u, v) => {
    const b = band(v) + dot(u, v);
    const k = b ? 0.55 : 1;
    return [Math.round(t[0] * k), Math.round(t[1] * k), Math.round(t[2] * k), 255];
  });
  const rough = mk((u, v) => {
    const rings = (Math.sin(v * 900) * 0.5 + 0.5) * 14;
    const b = band(v) + dot(u, v);
    const k = 18 + rings + (b ? 120 : 0);
    return [k, k, k, 255];
  });
  return { map: tex(colour, true), roughnessMap: tex(rough, false) };
}
