import { Color, Material } from 'three';
import { ShaderChunk } from 'three';

/**
 * Animated fractal glow layered into the gutter surface.
 *
 * The pattern is computed per pixel in the track's own surface coordinates
 * (metres across the profile, metres along the course), mirror-tiled so it
 * has no seams, and it streams along the course over time. That gives the
 * eye a continuous field of motion in the periphery (optical flow), which is
 * what makes a moving view feel fast — the walls appear to rush past.
 *
 * It is added as emissive light on top of the material (wood still looks
 * like wood), strongest on the walls and faint on the floor so the ball and
 * obstacles stay readable. Intensity is a player setting.
 */
export interface FractalTheme {
  kind: number;        // which world substrate pattern (see fxPattern)
  a: number;           // primary colour
  b: number;           // secondary colour
  scale: number;       // pattern size (bigger = smaller detail)
  flow: number;        // streaming speed along the course
  strength: number;    // per-world base strength
  c: [number, number]; // fractal parameter
  psy: number;         // how far colours cycle through the spectrum (0 = keep the world's palette, 1 = full rainbow)
}

export const FRACTAL_THEMES: Record<string, FractalTheme> = {
  // kind = the world's mathematical substrate (docs/WORLD_MATH.md)
  wood:     { kind: 0,  a: 0xffc060, b: 0xff5a10, scale: 0.12,  flow: 0.55, strength: 0.55, c: [0.52, 0.62], psy: 0.55 },   // Kali set
  concrete: { kind: 1,  a: 0x7ff3ff, b: 0x2a5cff, scale: 0.10,  flow: 0.5,  strength: 1.1, c: [0, 0], psy: 0.12 },         // Menger / Sierpinski carpet
  metal:    { kind: 2,  a: 0x9fdcff, b: 0xb04cff, scale: 0.13,  flow: 0.8,  strength: 0.8,  c: [0.12, -0.08], psy: 0.35 },  // Mandelbox
  ice:      { kind: 3,  a: 0x3fe0ff, b: 0x6a2cff, scale: 0.14,  flow: 0.45, strength: 0.7,   c: [0, 0], psy: 0.25 },         // hexagonal frost
  water:    { kind: 4,  a: 0x9ffcff, b: 0x1a6dff, scale: 0.11,  flow: 0.9,  strength: 0.6,  c: [0, 0], psy: 0.25 },         // caustic flow
  glass:    { kind: 5,  a: 0xff5cc8, b: 0x2affc4, scale: 0.12,  flow: 0.6,  strength: 1.0, c: [0, 0], psy: 0.85 },         // Apollonian gasket
  rubber:   { kind: 6,  a: 0xff2bd6, b: 0x2bf0ff, scale: 0.12,  flow: 0.8,  strength: 0.5,  c: [0, 0], psy: 1.0 },         // Turing labyrinth
  sand:     { kind: 7,  a: 0xffd36b, b: 0xff6a1b, scale: 0.11,  flow: 0.4,  strength: 0.65, c: [0, 0], psy: 0.12 },         // girih + dunes
  mud:      { kind: 8,  a: 0x8dff5a, b: 0x1d8f6a, scale: 0.12,  flow: 0.5,  strength: 0.75, c: [0, 0], psy: 0.15 },         // Voronoi cracks
  stone:    { kind: 9,  a: 0xffe7a8, b: 0xb8862a, scale: 0.11,  flow: 0.4,  strength: 1.05,  c: [-0.745, 0.113], psy: 0.08 },// Julia marble
  grating:  { kind: 10, a: 0xffb03a, b: 0xff4a1a, scale: 0.10,  flow: 0.9,  strength: 0.85, c: [0, 0], psy: 0.12 },         // Hilbert circuits
  snow:     { kind: 11, a: 0x7fb4ff, b: 0x6a4cff, scale: 0.12,  flow: 0.5,  strength: 0.55,  c: [0, 0], psy: 0.2 },         // Koch snowflake
};

export interface FractalUniforms {
  uFxTime: { value: number };
  uFxIntensity: { value: number };
  uFxSpeed: { value: number };
  uFxTravel: { value: number }; // distance the ball has travelled (metres)
  uFxBallDark: { value: number }; // 0 = bright steel ball, 1 = dark chrome ball (contrast pairing)
}

const GLSL = /* glsl */ `
uniform float uFxTime;
uniform float uFxIntensity;
uniform float uFxSpeed;
uniform vec3 uFxA;
uniform vec3 uFxB;
uniform float uFxScale;
uniform float uFxFlow;
uniform vec2 uFxC;
uniform float uFxCenter;
uniform float uFxTravel;
uniform float uFxRing; // distance all the way round the closed pipe
uniform float uFxPsy;
uniform float uFxBallDark;
varying vec2 vFxUv;
varying vec4 vFxMode;

vec2 fxMirror(vec2 p) { return abs(mod(p, 4.0) - 2.0) - 1.0; }

// ---- shared helpers (all written from public mathematics) ----
const float FX_PI = 3.14159265;
// integer hash: "lowbias32" mixing function (C. Wellons, public domain)
uint fxHu(uint x) { x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
vec2 fxHash2(vec2 c) {
  uint h = fxHu(uint(int(c.x) + 4096) * 1973u ^ fxHu(uint(int(c.y) + 4096) * 9277u));
  return vec2(float(h & 0xffffu), float(h >> 16)) / 65535.0;
}
float fxNoise(vec2 p) { // value noise
  vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  float a = fxHash2(i).x, b = fxHash2(i + vec2(1, 0)).x, c = fxHash2(i + vec2(0, 1)).x, d = fxHash2(i + vec2(1, 1)).x;
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
float fxFbm(vec2 p) { float v = 0.0, a = 0.5; for (int i = 0; i < 4; i++) { v += a * fxNoise(p); p = p * 2.03 + 7.1; a *= 0.5; } return v; }
float fxSeg(vec2 p, vec2 a, vec2 b) { vec2 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0.0, 1.0); return length(pa - ba * h); }
// anti-aliased line of half-width w around distance d (fw = pixel footprint in d units)
float fxLine(float d, float w, float fw) { return 1.0 - smoothstep(w - fw, w + fw, d); }
vec2 fxCmul(vec2 a, vec2 b) { return vec2(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x); }
// Hilbert curve index <-> cell on a 32x32 grid (standard bit algorithm)
int fxHxy2d(ivec2 c) {
  int x = c.x, y = c.y, d = 0;
  for (int s = 16; s > 0; s /= 2) {
    int rx = (x & s) > 0 ? 1 : 0, ry = (y & s) > 0 ? 1 : 0;
    d += s * s * ((3 * rx) ^ ry);
    if (ry == 0) { if (rx == 1) { x = 31 - x; y = 31 - y; } int t = x; x = y; y = t; }
  }
  return d;
}
ivec2 fxHd2xy(int d) {
  int x = 0, y = 0, t = d;
  for (int s = 1; s < 32; s *= 2) {
    int rx = 1 & (t / 2), ry = 1 & (t ^ rx);
    if (ry == 0) { if (rx == 1) { x = s - 1 - x; y = s - 1 - y; } int tt = x; x = y; y = tt; }
    x += s * rx; y += s * ry; t /= 4;
  }
  return ivec2(x, y);
}

/*
 * One pattern per world: the world's mathematical substrate (see docs/WORLD_MATH.md).
 * Input p is a mirror-tiled coordinate in [-1, 1]^2; output is a glow 0..~1.
 */
float fxPattern(vec2 p) {
  vec2 fwp = fwidth(p);
  float fw = max(fwp.x, fwp.y) + 1e-5;
  float t = uFxTime;
#if FX_KIND == 0
  // WOOD — Kali set: p <- |p| / (p.p) - c, glowing orbit-trap filaments
  vec2 c = uFxC + 0.05 * vec2(sin(t * 0.31), cos(t * 0.23));
  float trap = 10.0;
  for (int i = 0; i < 7; i++) {
    p = abs(p) / max(dot(p, p), 1e-3) - c;
    trap = min(trap, abs(p.x * p.y) * 4.0 + abs(length(p) - 1.0) * 0.5);
  }
  return pow(clamp(1.0 - trap * 2.2, 0.0, 1.0), 1.5);
#elif FX_KIND == 1
  // CONCRETE — Sierpinski carpet (2-D Menger sponge): at each 1/3 level the
  // centre square is a void. Glowing void edges, darker void interiors, and an
  // endless zoom into the sponge (scale x3 per cycle, seamless).
  float z = fract(t * 0.06);
  vec2 q = (p * 0.5 + 0.5) * pow(3.0, z);
  float glow = 0.0, inside = 0.0, alive = 1.0, sc = 1.0;
  for (int i = 0; i < 3; i++) {
    q *= 3.0; sc *= 3.0;
    vec2 cell = mod(floor(q), 3.0);
    vec2 f = fract(q) - 0.5;
    float hole = step(abs(cell.x - 1.0), 0.1) * step(abs(cell.y - 1.0), 0.1);
    float e = 0.5 - max(abs(f.x), abs(f.y));               // distance to the cell's edge (cell units)
    float lod = clamp(1.6 - fw * sc * 7.0, 0.0, 1.0);       // fade levels finer than ~2 px
    float lvl = 1.0 / (1.0 + float(i) * 0.5);
    glow += alive * hole * lod * lvl * (fxLine(e, 0.035, fw * sc * 1.5) + 0.35 * exp(-e * 10.0));
    inside = max(inside, alive * hole * lod * 0.07);
    alive *= 1.0 - hole;
  }
  return clamp(glow + inside + alive * 0.03, 0.0, 1.2);
#elif FX_KIND == 2
  // SHEET METAL — 2-D Mandelbox: box fold, sphere fold, scale and translate;
  // orbit traps banded into brushed, riveted chrome.
  vec2 zz = p * 2.4, c0 = zz;
  float trap = 1e9, ang = 0.15 * sin(t * 0.09);
  mat2 rot = mat2(cos(ang), -sin(ang), sin(ang), cos(ang));
  for (int i = 0; i < 9; i++) {
    zz = clamp(zz, -1.0, 1.0) * 2.0 - zz;
    float r2 = dot(zz, zz);
    if (r2 < 0.25) zz *= 4.0; else if (r2 < 1.0) zz /= r2;
    zz = rot * zz * -1.85 + c0 * 0.85 + uFxC;
    trap = min(trap, min(abs(zz.x), abs(zz.y)) * 0.6 + abs(length(zz) - 1.4) * 0.12);
  }
  float band = 0.5 + 0.5 * cos(log(trap + 1e-3) * 4.0 - t * 0.6);
  return clamp(exp(-trap * 5.0) * 1.1 + band * 0.25 * exp(-trap * 1.5), 0.0, 1.2);
#elif FX_KIND == 3
  // ICE — hexagonal frost: six-fold (D6) symmetry, a main arm with side
  // branches at 60 degrees, shrinking by half each generation (branch IFS).
  float a = atan(p.y, p.x), r = length(p);
  a = abs(mod(a + FX_PI / 6.0, FX_PI / 3.0) - FX_PI / 6.0);
  vec2 w = r * vec2(cos(a), sin(a));
  float grow = 0.75 + 0.25 * sin(t * 0.4);                   // crystals grow and recede
  float d = fxSeg(w, vec2(0.0), vec2(0.95 * grow, 0.0));
  float sc = 1.0;
  vec2 n = vec2(-0.8660254, 0.5);                            // normal of the 60-degree branch line
  for (int i = 0; i < 5; i++) {
    w.y = abs(w.y);
    vec2 o = vec2(0.32, 0.0);
    float k = dot(w - o, n);
    if (k > 0.0) w -= 2.0 * k * n;                           // fold the side branch onto the arm
    w = (w - o) * 2.0; sc *= 2.0;
    d = min(d, fxSeg(w, vec2(0.0), vec2(0.9 * grow, 0.0)) / sc);
  }
  // LIVE STARS: inside each crystal a kaleidoscopic fractal (folded inversions)
  // drifts and morphs as you pass, framed by the frost arms
  vec2 kz = p * 2.2;
  float kf = 0.0;
  vec2 kc = vec2(0.52 + 0.08 * sin(t * 0.37), 0.47 + 0.08 * cos(t * 0.29));
  for (int i = 0; i < 7; i++) {
    kz = abs(kz) / max(dot(kz, kz), 1e-3) - kc;
    kf += exp(-abs(length(kz) - 0.8) * 6.0);
  }
  float inside = exp(-d * 9.0) * smoothstep(1.05 * grow, 0.6 * grow, r);
  return clamp(fxLine(d, 0.004, fw * 1.2) + exp(-d * 45.0) * 0.55 + inside * (0.18 + 0.14 * kf) + fxFbm(p * 6.0) * 0.08, 0.0, 1.3);
#elif FX_KIND == 4
  // WATER — iterated flow warp and caustic ridges (bright where the warped
  // field folds over itself), drifting like light through moving water.
  vec2 q = p * 5.0;
  float cst = 0.0;
  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    q += 0.6 * vec2(sin(q.y * 1.3 + t * 0.9 + fi), cos(q.x * 1.1 - t * 0.7 + fi * 1.7)) / (1.0 + fi * 0.3);
    float rid = abs(sin(q.x * 1.7 + q.y * 0.6) * cos(q.y * 1.5 - q.x * 0.4));
    cst += exp(-rid * 9.0);
  }
  return clamp(cst * 0.26 - 0.2, 0.0, 1.2);
#elif FX_KIND == 5
  // GLASS — Apollonian gasket by repeated circle inversion (packed circles
  // inside circles); rims glow like edges of glass. It breathes slowly.
  vec2 zz = p * 1.25;
  float sc = 1.0, kk = 1.12 + 0.06 * sin(t * 0.25);
  for (int i = 0; i < 8; i++) {
    zz = -1.0 + 2.0 * fract(0.5 * zz + 0.5);
    float r2 = max(dot(zz, zz), 1e-4);
    float k = kk / r2;
    zz *= k; sc *= k;
  }
  float d = 0.25 * abs(zz.y) / sc;
  // where circles shrink below a pixel (the gasket's dense dust) fade to a dim average, not solid white
  float dens = clamp(log(sc * fw * 6.0 + 1.0) * 0.7, 0.0, 1.0);
  return clamp((fxLine(d, 0.003, fw * 1.2) + exp(-d * 90.0) * 0.35) * mix(1.0, 0.35, dens), 0.0, 1.2);
#elif FX_KIND == 6
  // RUBBER — Turing (reaction-diffusion-like) labyrinth: a band-passed noise
  // field cut into stripes of near-constant width that slowly crawl.
  float v = fxFbm(p * 2.6 + vec2(t * 0.05, 0.0)) - 0.62 * fxFbm(p * 5.3 + 3.7 - vec2(0.0, t * 0.04));
  float st = sin(v * 30.0 + t * 0.3);
  float fwS = fwidth(st) + 1e-3;
  return smoothstep(0.35 - fwS, 0.35 + fwS, st) * 0.8 + 0.12 * exp(-abs(st - 0.35) * 4.0);   // thinner bright stripes on dark
#elif FX_KIND == 7
  // SAND — ten-fold girih star (all angles multiples of 36 deg, Hankin rays)
  // over wind ripples with a gentle windward and steep lee slope.
  float r = length(p), a = atan(p.y, p.x);
  float seg = FX_PI / 5.0;
  a = abs(mod(a, seg) - seg * 0.5);
  vec2 q = r * vec2(cos(a), sin(a));
  // star polygons: vertex at the wedge edge (18 deg) joined to the vertex 3 (and 2) steps away
  vec2 v0 = 0.88 * vec2(cos(0.31416), sin(0.31416));
  float s1 = min(fxSeg(q, v0, 0.88 * vec2(0.0, -1.0)), fxSeg(q, v0, 0.88 * vec2(cos(2.1991), sin(2.1991))));
  vec2 u0 = 0.5 * vec2(cos(0.31416), sin(0.31416));
  float s2 = min(fxSeg(q, u0, 0.5 * vec2(cos(-0.94248), sin(-0.94248))), fxSeg(q, u0, 0.5 * vec2(cos(1.5708), sin(1.5708))));
  float star = min(min(s1, s2), abs(r - 0.93));
  float lines = fxLine(star, 0.007, fw * 1.2) + exp(-star * 45.0) * 0.3;
  float ph = p.x * 16.0 + 2.2 * sin(p.y * 3.1 + t * 0.2) - t * 0.8;
  float rip = fract(ph / 6.2832); rip = rip < 0.75 ? rip / 0.75 : (1.0 - rip) / 0.25;   // asymmetric dune profile
  return clamp(lines * 0.9 + pow(rip, 3.0) * 0.32, 0.0, 1.2);
#elif FX_KIND == 8
  // MUD — Voronoi cracks (F2 - F1), with a finer crack level inside each clay
  // plate; cracks widen and close as the mud dries (seed points never move).
  vec2 g = p * 3.0, ip = floor(g), fp = fract(g);
  float f1 = 8.0, f2 = 8.0;
  for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
    vec2 o = vec2(float(i), float(j));
    float dd = length(o + fxHash2(ip + o) * 0.9 + 0.05 - fp);
    if (dd < f1) { f2 = f1; f1 = dd; } else if (dd < f2) f2 = dd;
  }
  vec2 g2 = p * 8.3, ip2 = floor(g2), fp2 = fract(g2);
  float h1 = 8.0, h2 = 8.0;
  for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
    vec2 o = vec2(float(i), float(j));
    float dd = length(o + fxHash2(ip2 + o + 91.0) - fp2);
    if (dd < h1) { h2 = h1; h1 = dd; } else if (dd < h2) h2 = dd;
  }
  float wd = 0.035 + 0.02 * sin(t * 0.45);
  float big = fxLine(f2 - f1, wd, fw * 3.0 * 1.5);
  float small = fxLine(h2 - h1, wd * 0.6, fw * 8.3 * 1.5) * 0.5;
  return clamp(big + small * 0.8, 0.0, 1.2);
#elif FX_KIND == 9
  // POLISHED STONE — Julia set marble: distance estimate 0.5|z|log|z|/|z'|
  // draws thin veins; turbulence in c makes it flow like polished stone.
  vec2 zz = p * 1.45 + 0.08 * vec2(fxFbm(p * 2.0), fxFbm(p * 2.0 + 5.0));
  vec2 dz = vec2(1.0, 0.0);
  vec2 c = uFxC + 0.025 * vec2(cos(t * 0.17), sin(t * 0.13));
  float m2 = 0.0;
  for (int i = 0; i < 28; i++) {
    dz = 2.0 * fxCmul(zz, dz);
    zz = fxCmul(zz, zz) + c;
    m2 = dot(zz, zz);
    if (m2 > 1e4) break;
  }
  if (m2 <= 1e4) return 0.04;                                // inside the set: deep stone
  float d = 0.25 * sqrt(m2 / max(dot(dz, dz), 1e-12)) * log(m2);
  // veins: the set's edge plus nested equidistant veins around it (bands of log-distance)
  float lv = log(d + 1e-5) * 2.2;
  float bands = abs(fract(lv) - 0.5) * 2.0;
  return clamp(exp(-d * 40.0) * 0.9 + fxLine(d, 0.002, fw) * 0.6 + (1.0 - smoothstep(0.0, 0.12, bands)) * 0.3 * exp(-d * 3.0), 0.0, 1.2);
#elif FX_KIND == 10
  // STEEL GRATING — Hilbert space-filling curve drawn as circuit traces, with
  // pulses of light running along the curve like data.
  vec2 q = (p * 0.5 + 0.5) * 32.0;
  ivec2 cell = clamp(ivec2(floor(q)), ivec2(0), ivec2(31));
  vec2 f = fract(q) - 0.5;
  int d = fxHxy2d(cell);
  vec2 da = vec2(fxHd2xy(max(d - 1, 0)) - cell), db = vec2(fxHd2xy(min(d + 1, 1023)) - cell);
  float dist = min(fxSeg(f, vec2(0.0), da * 0.5), fxSeg(f, vec2(0.0), db * 0.5));
  float trace = fxLine(dist, 0.17, fw * 32.0 * 1.2);
  float pulse = pow(fract(float(d) / 90.0 - t * 0.45), 5.0);
  return clamp(trace * (0.45 + 0.75 * pulse) + exp(-dist * 4.0) * 0.3, 0.0, 1.2);
#else
  // SNOW — Koch snowflake: six-fold symmetry, each edge folded into the Koch
  // curve (+60, -120, +60 degree turns at 1/3 scale); a soft swirl glows behind.
  float a = atan(p.y, p.x), r = length(p);
  a = abs(mod(a + FX_PI / 6.0, FX_PI / 3.0) - FX_PI / 6.0);
  vec2 w = r * vec2(cos(a), sin(a));
  float R = 0.62, hw = R * 0.57735;
  vec2 zz = vec2(w.y / hw, (w.x - R) / hw);              // edge coordinates: along, outward
  float sc = 1.0;
  float ang = 1.0471976 * (1.0 + 0.06 * sin(t * 0.3));       // fold angle morphs around 60 deg
  vec2 n = vec2(-sin(ang), cos(ang));
  for (int i = 0; i < 5; i++) {
    zz.x = abs(zz.x);
    vec2 o = vec2(1.0 / 3.0, 0.0);
    float k = dot(zz - o, n);
    if (k > 0.0) zz -= 2.0 * k * n;
    zz = (zz - vec2(2.0 / 3.0, 0.0)) * 3.0; sc *= 3.0;
  }
  float d = length(zz - vec2(clamp(zz.x, -1.0, 1.0), 0.0)) / sc * hw;
  float swirl = 0.5 + 0.5 * sin(r * 9.0 - t * 0.8 + 3.0 * atan(p.y, p.x));
  return clamp(fxLine(d, 0.004, fw * 1.2) + exp(-d * 60.0) * 0.35 + swirl * 0.1, 0.0, 1.2);
#endif
}

// rotate a colour's hue (radians) around the grey axis
vec3 fxHue(vec3 c, float a) {
  const vec3 k = vec3(0.57735);
  float ca = cos(a);
  return c * ca + cross(k, c) * sin(a) + k * dot(k, c) * (1.0 - ca);
}

vec3 fxColor() {
  // metres from the floor centre (walls are far from it)
  float across = (vFxUv.x - uFxCenter);
  float tube = vFxMode.w;
  float wall = max(smoothstep(1.4, 3.8, abs(across)), tube * mix(0.35, 0.6, uFxBallDark));   // calmer floor under a bright ball
  // every section moves: a baseline rush toward you, much stronger in tubes
  float flowK = vFxMode.x - mix(0.7, 1.6, tube);
  float push = max(vFxMode.y, tube * 0.6);
  float twist = vFxMode.z + tube * 1.2 * sin(uFxTime * 0.23);
  float breathe = sin(uFxTime * 2.4 + vFxUv.y * 0.04);
  float zoom = 1.0 + push * 0.35 * breathe;

  // LAYER 1: the main fractal, streaming with the ride and spiralling (helical twist)
  float along = vFxUv.y - uFxTime * uFxFlow - uFxTravel * flowK;
  // across-scale chosen so the pattern wraps seamlessly all the way round a pipe
  float kx = 4.0 * 2.0 * max(1.0, floor(uFxRing * uFxScale / 8.0 + 0.5)) / uFxRing;
  vec2 p1 = vec2((across + uFxTime * twist * 1.6 + along * twist * 0.04) * kx, along * uFxScale) * zoom;
  float f1 = fxPattern(fxMirror(p1));
  // LAYER 2: a bigger, slower layer drifting the other way (parallax depth, like
  // the stacked projection layers of a dome show)
  vec2 p2 = vec2((across - uFxTime * twist * 1.6) * kx * 0.5, (vFxUv.y * 0.55 - uFxTravel * flowK * 0.4 + uFxTime * 0.5) * uFxScale) / zoom;
  float f2 = fxPattern(fxMirror(p2 + 0.37));
  // contrast: crush the gaps between features to black, keep the features bright
  // contrast pairing with the ball: a BRIGHT ball needs dark, high-contrast walls;
  // a DARK ball can sit against lighter, softer patterns
  f1 = pow(clamp(f1, 0.0, 1.4), mix(2.2, 1.3, uFxBallDark));
  float f = clamp(f1 + f2 * f2 * mix(0.18, 0.3, tube), 0.0, 1.4);   // the deep layer sits dim, behind
  // relief: shade the pattern from its own slope so features look raised (3-D emboss)
  vec2 gr = vec2(dFdx(f1), dFdy(f1));
  float relief = clamp(0.5 + dot(gr, vec2(0.7, -0.7)) * 5.0, 0.0, 1.0);

  // psychedelic colour: hue cycles in time, along the course and through the
  // pattern itself (full spectrum in tubes, a gentle shimmer in the open)
  vec3 col = mix(uFxB, uFxA, clamp(f1, 0.0, 1.0));
  col = mix(col, mix(uFxA, uFxB, 0.5) * 1.2, clamp(f2, 0.0, 1.0) * 0.4);
  float psy = uFxPsy * mix(0.6, 1.0, tube);
  col = fxHue(col, psy * (uFxTime * 0.9 + vFxUv.y * 0.025 - uFxTravel * 0.01 + f1 * 2.5 + cos(across * 6.2832 / uFxRing) * 1.5));
  col = max(col, 0.0) * (0.45 + 1.1 * relief);
  col = mix(col, vec3(1.0), 0.22 * uFxBallDark);   // pastel lift: lighter designs only when the ball is dark

  // WARP RINGS: bright bands around the pipe rushing at you with your speed
  float ring = pow(0.5 + 0.5 * sin((vFxUv.y + uFxTravel * 1.0) * 0.45 + uFxTime * 3.0), 10.0) * (0.25 + tube * 1.1);
  vec3 ringCol = fxHue(mix(uFxA, uFxB, 0.3), (uFxTime * 1.3 + vFxUv.y * 0.05) * uFxPsy);

  float pulse = (0.85 + 0.15 * sin(uFxTime * 2.0 + vFxUv.y * 0.6)) * (1.0 + push * 0.45 * breathe);
  float k = (0.04 + 0.96 * wall) * f * pulse * (0.75 + 0.5 * uFxSpeed) * (1.0 + 0.9 * tube);
  vec3 em = (col * k + ringCol * ring * (0.4 + 0.6 * uFxSpeed) * (0.3 + 0.7 * wall)) * uFxIntensity * 2.2;
  // soft ceiling: bright features stay saturated colour instead of blowing out to white
  float pk = max(em.r, max(em.g, em.b));
  return em / (1.0 + pk * 0.8);
}
`;

/**
 * Inject the fractal layer into a Standard/Physical material. The geometry
 * must carry an `fxuv` attribute in metres (across, along).
 */
export function applyFractal(mat: Material, theme: FractalTheme, centerAcross: number, shared: FractalUniforms, ring = 43) {
  const a = new Color(theme.a), b = new Color(theme.b);
  mat.defines = { ...(mat.defines ?? {}), FX_KIND: theme.kind };
  mat.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, shared, {
      uFxA: { value: a }, uFxB: { value: b }, uFxScale: { value: theme.scale }, uFxFlow: { value: theme.flow },
      uFxC: { value: theme.c }, uFxCenter: { value: centerAcross }, uFxRing: { value: ring }, uFxPsy: { value: theme.psy },
    });
    sh.vertexShader = 'attribute vec2 fxuv;\nattribute vec4 fxmode;\nvarying vec2 vFxUv;\nvarying vec4 vFxMode;\n' + sh.vertexShader.replace('#include <uv_vertex>', '#include <uv_vertex>\n vFxUv = fxuv; vFxMode = fxmode;');
    // inside a tube the wood itself goes dark so the projection owns the walls (dome-screen look)
    sh.fragmentShader = GLSL + sh.fragmentShader
      .replace('#include <map_fragment>', '#include <map_fragment>\n float fxLum = max(dot(diffuseColor.rgb, vec3(0.3, 0.59, 0.11)), 1e-3); diffuseColor.rgb *= mix(1.0, min(1.0, 0.045 / fxLum), vFxMode.w);\n diffuseColor.a = mix(diffuseColor.a, 1.0, vFxMode.w); // see-through gutters become projection screens inside tubes')
      .replace('#include <lights_fragment_end>', '#include <lights_fragment_end>\n reflectedLight.indirectSpecular *= 1.0 - 0.9 * vFxMode.w; reflectedLight.directSpecular *= 1.0 - 0.7 * vFxMode.w;')
      .replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\n totalEmissiveRadiance += fxColor();')
      // real-glass gutters stop being see-through inside tubes (the projection owns the walls)
      .replace('#include <transmission_fragment>', ShaderChunk.transmission_fragment.replace('material.transmission = transmission;', 'material.transmission = transmission * (1.0 - vFxMode.w);'));
  };
  mat.customProgramCacheKey = () => `fx${theme.kind}`;
  mat.needsUpdate = true;
}
