import { BackSide, Color, Mesh, ShaderMaterial, SphereGeometry, Vector3 } from 'three';

/**
 * Panoramic sky dome: gradient sky, sun, drifting clouds, distant ridgelines
 * painted in each world's style, and per-world touches (stars, moon, aurora,
 * lightning, a neon skyline). It follows the camera (it is "infinitely far")
 * and ignores fog; the ridge bases melt into the fog colour so the real
 * terrain fades seamlessly into the painted horizon.
 *
 * Everything here is our own code from standard techniques: value noise,
 * fBm, cells for skylines and stars.
 */
export type RidgeStyle = 'peaks' | 'hills' | 'mesas' | 'skyline' | 'dunes' | 'stacks' | 'temple' | 'cranes';
const STYLE_ID: Record<RidgeStyle, number> = { peaks: 0, hills: 1, mesas: 2, skyline: 3, dunes: 4, stacks: 5, temple: 6, cranes: 7 };

export interface SkyTheme {
  zenith: number;          // sky colour overhead
  horizon?: number;        // defaults to the world's fog colour
  sunColor: number;
  sunSize: number;         // 1 = normal; > 1 big hazy sun or moon
  clouds: number;          // coverage 0..1
  cloudColor: number;
  cloudDark: number;       // underside / storm
  wind: number;            // cloud drift speed
  style: RidgeStyle;       // nearest ridge layer
  farStyle?: RidgeStyle;   // the two far layers (defaults by style)
  ridge: [number, number, number]; // far, middle, near
  ridgeHeight: number;     // height of the near ridge, radians above the horizon
  snow?: number;           // snow on far peaks 0..1
  stars?: number;          // 0..1
  moon?: number;           // 0..1 (uses the sun direction)
  aurora?: number;         // 0..1
  lightning?: number;      // flashes per minute
  lights?: number;         // window / warning lights 0..1
  lightColor?: number;
  glow?: number;           // horizon glow (synthwave, sunset band) 0..1
  glowColor?: number;
}

export const SKY_THEMES: Record<string, SkyTheme> = {
  // Timberline: high summer afternoon over forested ranges and far snow peaks
  wood: { zenith: 0x2f6fb8, sunColor: 0xfff0d0, sunSize: 1, clouds: 0.42, cloudColor: 0xffffff, cloudDark: 0x9aa8b8, wind: 6, style: 'hills', farStyle: 'peaks', ridge: [0x8fa9c4, 0x4f7468, 0x2c4a33], ridgeHeight: 0.09, snow: 0.8 },
  // Storm Drain: hazy city late afternoon, a skyline across the basin
  concrete: { zenith: 0x5a7fa6, sunColor: 0xffd9a8, sunSize: 1.4, clouds: 0.35, cloudColor: 0xf0e6dc, cloudDark: 0x8a8c94, wind: 4, style: 'skyline', farStyle: 'hills', ridge: [0xa7a9b0, 0x7c8089, 0x4c5058], ridgeHeight: 0.1, lights: 0.25, lightColor: 0xffd28a },
  // Foundry: furnace dusk, stacks
  metal: { zenith: 0x2a2850, sunColor: 0xff9a50, sunSize: 1.8, clouds: 0.3, cloudColor: 0xe0a080, cloudDark: 0x3a3048, wind: 3, style: 'stacks', farStyle: 'hills', ridge: [0x6c5a6e, 0x46384c, 0x231c2a], ridgeHeight: 0.13, lights: 0.6, lightColor: 0xff7a3a, glow: 0.5, glowColor: 0xff6a2a },
  // Glacier: polar twilight, jagged white peaks, aurora
  ice: { zenith: 0x0d2a52, sunColor: 0xdff4ff, sunSize: 1.2, clouds: 0.15, cloudColor: 0xdfeaf6, cloudDark: 0x6c8098, wind: 2, style: 'peaks', ridge: [0xa8c4dc, 0x7a9cbc, 0x4c6c8c], ridgeHeight: 0.12, snow: 1, stars: 0.35, aurora: 1 },
  // River Run: tropical noon, towering cumulus, peaks over green hills
  water: { zenith: 0x1d78c8, sunColor: 0xffffff, sunSize: 1, clouds: 0.55, cloudColor: 0xffffff, cloudDark: 0xa0b4c4, wind: 7, style: 'hills', farStyle: 'peaks', ridge: [0x8ab8c8, 0x3c8a64, 0x1e5a3a], ridgeHeight: 0.08 },
  // Apollonian Skyway: canyon sunset, buttes and mesas
  glass: { zenith: 0x3c3a78, sunColor: 0xffb070, sunSize: 1.6, clouds: 0.3, cloudColor: 0xffb8a0, cloudDark: 0x7a5070, wind: 3, style: 'mesas', ridge: [0xb88a84, 0x8a5048, 0x4c2a26], ridgeHeight: 0.11, glow: 0.6, glowColor: 0xff7848 },
  // Neon Rebound: night city, stars, a big moon, synthwave horizon
  rubber: { zenith: 0x080818, sunColor: 0xe8e8ff, sunSize: 1.5, clouds: 0.12, cloudColor: 0x5a4a8a, cloudDark: 0x140c24, wind: 2, style: 'skyline', farStyle: 'skyline', ridge: [0x2a2048, 0x1a1434, 0x0c0a1c], ridgeHeight: 0.12, stars: 1, moon: 1, lights: 1, lightColor: 0xff3ad8, glow: 1, glowColor: 0xff2bd6 },
  // Dune Run: white-hot sky, endless dune crests
  sand: { zenith: 0x4c8ac4, sunColor: 0xfff4d8, sunSize: 1.8, clouds: 0.08, cloudColor: 0xfff8ec, cloudDark: 0xd8c0a0, wind: 9, style: 'dunes', farStyle: 'mesas', ridge: [0xd8c0a0, 0xd0a068, 0xb07a40], ridgeHeight: 0.06 },
  // Crack Delta: jungle storm, heavy cloud, lightning
  mud: { zenith: 0x3a4648, sunColor: 0xd8e0c8, sunSize: 1.4, clouds: 0.85, cloudColor: 0x9aa494, cloudDark: 0x2c3430, wind: 10, style: 'hills', farStyle: 'hills', ridge: [0x6a7a6c, 0x3a5038, 0x1c2c1a], ridgeHeight: 0.1, lightning: 7 },
  // Temple Dive: clear golden morning, terraced hills and distant pyramids
  stone: { zenith: 0x3c78b8, sunColor: 0xffe8c0, sunSize: 1.1, clouds: 0.25, cloudColor: 0xfff4e8, cloudDark: 0xb0a090, wind: 4, style: 'temple', farStyle: 'hills', ridge: [0xc4b8a4, 0x9a8a70, 0x6a5a44], ridgeHeight: 0.09 },
  // Hilbert Works: smog dusk, cranes and gantries with warning lights
  grating: { zenith: 0x30343c, sunColor: 0xffb880, sunSize: 1.6, clouds: 0.5, cloudColor: 0x8a8a90, cloudDark: 0x2a2c32, wind: 5, style: 'cranes', farStyle: 'skyline', ridge: [0x5a5e66, 0x3a3e46, 0x1a1c22], ridgeHeight: 0.14, lights: 0.8, lightColor: 0xff3020, glow: 0.35, glowColor: 0xff9050 },
  // Koch Alpine: deep blue high-altitude sky, sharp snow peaks
  snow: { zenith: 0x14489a, sunColor: 0xffffff, sunSize: 1, clouds: 0.25, cloudColor: 0xffffff, cloudDark: 0xa8b8cc, wind: 8, style: 'peaks', ridge: [0xb8cce0, 0x8aa4c0, 0x5a7898], ridgeHeight: 0.14, snow: 1 },
};

const VERT = /* glsl */ `
varying vec3 vDir;
void main() {
  vDir = position;
  vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_Position = p.xyww; // always at the far plane
}`;

const FRAG = /* glsl */ `
uniform vec3 uZen, uHor, uSunDir, uSunCol, uCloudCol, uCloudDark, uR0, uR1, uR2, uLightCol, uGlowCol;
uniform float uSunSize, uClouds, uWind, uTime, uRidgeH, uSnow, uStars, uMoon, uAurora, uFlash, uLights, uGlow;
uniform int uStyle, uFarStyle;
varying vec3 vDir;

float h11(float n) { return fract(sin(n * 127.1) * 43758.5453); }
float h21(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vn(vec2 p) {
  vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(h21(i), h21(i + vec2(1, 0)), f.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), f.x), f.y);
}
float fbm(vec2 p) { float s = 0.0, a = 0.5; for (int i = 0; i < OCT; i++) { s += a * vn(p); p = p * 2.03 + 7.1; a *= 0.5; } return s; }
// seamless noise around the horizon: sample on a circle of azimuth
float ring(float az, float freq, float seed) { return fbm(vec2(cos(az), sin(az)) * freq + seed); }

// ridge height (radians above horizon) for a style; .y = 1 where lights can show
vec2 ridge(int style, float az, float seed, float H) {
  float n = ring(az, 3.0, seed);
  if (style == 0) { // jagged peaks
    float r = ring(az, 7.0, seed + 3.0);
    float k = 1.0 - abs(2.0 * ring(az, 5.0, seed + 9.0) - 1.0); // ridged noise
    return vec2(H * (0.25 + 0.55 * k * k + 0.25 * r), 0.0);
  }
  if (style == 1) return vec2(H * (0.25 + 0.6 * n + 0.08 * ring(az, 40.0, seed)), 0.0); // rounded, tree-fuzzed hills
  if (style == 2) { // mesas: flat tops, cliff sides
    float m = smoothstep(0.48, 0.53, n);
    return vec2(H * (0.15 + 0.15 * ring(az, 9.0, seed) + 0.75 * m), 0.0);
  }
  if (style == 4) return vec2(H * (0.35 + 0.175 * sin(az * 9.0 + 3.0 * n) + 0.3 * n), 0.0); // dunes
  // cell-based silhouettes: skyline, stacks, temples, cranes
  float cells = style == 3 ? 220.0 : style == 5 ? 90.0 : style == 6 ? 70.0 : 120.0;
  float u = (az + 3.14159265) / 6.2831853 * cells;
  float ci = floor(u), cf = fract(u);
  float r = h11(ci + seed * 13.0);
  float base = H * (0.12 + 0.2 * n);
  if (style == 3) { // skyline: blocks and towers
    float tall = r > 0.82 ? 1.0 + 1.4 * h11(ci + 5.0) : 0.35 + 0.6 * r;
    float edge = step(0.08, cf) * step(cf, 0.92);
    return vec2(base + H * 0.9 * tall * edge * smoothstep(0.25, 0.45, n + 0.2), edge);
  }
  if (style == 5) { // smokestacks and sheds
    float shed = H * 0.35 * step(0.3, r) * step(0.05, cf) * step(cf, 0.95);
    float stack = r > 0.7 ? H * (1.2 + 0.8 * h11(ci + 2.0)) * step(0.42, cf) * step(cf, 0.58) : 0.0;
    return vec2(base + max(shed, stack), stack > 0.0 ? 1.0 : 0.0);
  }
  if (style == 6) { // temple hills with stepped pyramids
    float pyr = r > 0.8 ? H * (0.9 + 0.5 * h11(ci + 3.0)) * max(0.0, 1.0 - abs(cf - 0.5) * 2.4) : 0.0;
    pyr = floor(pyr / (H * 0.12) + 0.5) * H * 0.12;
    return vec2(max(H * (0.2 + 0.45 * n), base + pyr), 0.0);
  }
  // cranes / gantries: thin lattice masts over low sheds
  float mast = r > 0.55 ? H * (1.1 + 0.9 * h11(ci + 4.0)) : 0.0;
  float m = step(abs(cf - 0.5), 0.03 + 0.05 * (1.0 - cf)) * mast;
  return vec2(base + H * 0.3 * step(0.4, r) * step(0.05, cf) * step(cf, 0.95) + m, mast > 0.0 ? 1.0 : 0.0);
}

void main() {
  vec3 d = normalize(vDir);
  float y = d.y;
  float az = atan(d.z, d.x);
  vec3 sun = normalize(uSunDir);
  float sd = max(dot(d, sun), 0.0);

  // ---- sky gradient ----
  vec3 c = mix(uHor, uZen, pow(clamp(y, 0.0, 1.0), 0.32)); // colour comes in quickly above the haze band
  c += uGlowCol * uGlow * exp(-max(y, 0.0) * 14.0) * 0.6;            // horizon band
  c += uSunCol * pow(sd, 6.0) * 0.18 * (1.0 - uMoon);                 // sun haze

  // ---- night: stars ----
  if (uStars > 0.0 && y > 0.0) {
    vec2 g = vec2(az * 160.0, asin(y) * 160.0);
    float st = h21(floor(g));
    float tw = 0.6 + 0.4 * sin(uTime * 3.0 + st * 40.0);
    float dotm = 1.0 - smoothstep(0.08, 0.3, length(fract(g) - 0.5));
    c += vec3(0.9, 0.9, 1.0) * step(0.994, st) * tw * uStars * smoothstep(0.02, 0.2, y) * dotm * 1.5;
  }
  // ---- aurora ----
  if (uAurora > 0.0 && y > 0.05) {
    float band = ring(az + uTime * 0.01, 2.0, 4.0);
    float h = 0.25 + 0.25 * band;
    float a = asin(y);
    float curtain = exp(-(a - h) * (a - h) * 81.0) * (0.5 + 0.5 * sin(az * 30.0 + uTime * 0.6 + band * 12.0));
    c += mix(vec3(0.1, 1.0, 0.55), vec3(0.4, 0.3, 1.0), smoothstep(0.0, 0.25, a - h)) * curtain * 0.55 * uAurora;
  }
  // ---- sun or moon disc ----
  float rad = 0.012 * uSunSize;
  float disc = smoothstep(cos(rad), cos(rad * 0.85), dot(d, sun));
  if (uMoon > 0.0) {
    float crater = 0.85 + 0.15 * vn(d.xy * 900.0);
    c = mix(c, vec3(0.92, 0.92, 1.0) * crater * 1.4, disc);
    c += vec3(0.5, 0.5, 0.8) * pow(sd, 120.0) * 0.4;
  } else {
    c += uSunCol * (disc * 5.0 + pow(sd, 400.0) * 1.2);
  }

  // ---- clouds: a drifting layer projected onto a high plane ----
  if (uClouds > 0.0 && y > 0.01) {
    vec2 p = d.xz / (y + 0.06) * 1.4 + vec2(uTime * uWind * 0.004, uTime * uWind * 0.0015);
    float n = fbm(p);
    float cov = smoothstep(1.0 - uClouds * 0.95 - 0.1, 1.0 - uClouds * 0.95 + 0.25, n);
    float thick = fbm(p * 1.7 + 3.0);
    vec3 cc = mix(uCloudDark, uCloudCol, clamp(0.35 + 0.9 * (n - thick * 0.5) + pow(sd, 3.0) * 0.4, 0.0, 1.0));
    cc += uSunCol * pow(sd, 8.0) * 0.35 * (1.0 - cov);  // silver lining
    cc *= 1.0 + uFlash * 2.5;                            // lightning lights the clouds from inside
    c = mix(c, cc, cov * smoothstep(0.01, 0.12, y));
  }
  if (uFlash > 0.0) c += vec3(0.6, 0.65, 0.8) * uFlash * 0.25;

  // ---- distant ridgelines: far, middle, near ----
  float ang = asin(clamp(y, -1.0, 1.0));
  vec2 sunH = normalize(vec2(sun.x, sun.z) + 1e-5);
  vec2 dH = normalize(vec2(d.x, d.z) + 1e-5);
  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    int st = i == 2 ? uStyle : uFarStyle;
    vec3 col = i == 0 ? uR0 : i == 1 ? uR1 : uR2;
    vec2 rh = ridge(st, az + fi * 1.7, 11.0 + fi * 23.0, uRidgeH * (i == 0 ? 0.85 : i == 1 ? 0.7 : 1.0));
    if (ang < rh.x) {
      // lit toward the sun
      col *= 0.85 + 0.3 * pow(max(dot(dH, sunH), 0.0), 2.0);
      if (i == 0 && uSnow > 0.0) col = mix(col, vec3(0.95, 0.97, 1.0), uSnow * smoothstep(rh.x * 0.62, rh.x * 0.78, ang));
      // lit windows and warning lights
      if (uLights > 0.0 && rh.y > 0.0) {
        float sc = 2400.0 / (fi + 1.0);
        vec2 w = vec2(az * sc, ang * sc);
        float lit = step(0.72, h21(floor(w))) * step(0.3, fract(w.x)) * step(0.3, fract(w.y));
        float tip = (st == 7 || st == 5) ? smoothstep(rh.x * 0.9, rh.x, ang) * 3.0 * step(0.5, fract(uTime * 0.7 + h11(floor(w.x * 0.05)))) : 1.0;
        col += uLightCol * lit * uLights * tip * 1.4;
      }
      // haze toward the base, melting into the fog
      col = mix(uHor, col, smoothstep(-0.005, rh.x * 0.6 + 0.004, ang) * (0.55 + 0.15 * fi));
      c = col;
    }
  }
  // below the horizon: the fog colour (the real terrain fades into it)
  c = mix(c, uHor, smoothstep(0.0, -0.04, ang));
  gl_FragColor = vec4(c, 1.0);
}`;

export class SkyDome {
  readonly mesh: Mesh;
  readonly material: ShaderMaterial;
  private flash = 0;
  private nextFlash = 3;
  private lightning: number;

  constructor(theme: SkyTheme, fog: number, sunDir: Vector3, quality: 'low' | 'high' = 'high') {
    const farStyle = theme.farStyle ?? (theme.style === 'skyline' || theme.style === 'stacks' || theme.style === 'cranes' ? 'hills' : 'peaks');
    const col = (h: number) => new Color(h);
    this.material = new ShaderMaterial({
      side: BackSide, depthWrite: false, depthTest: false, fog: false,
      uniforms: {
        uZen: { value: col(theme.zenith) }, uHor: { value: col(theme.horizon ?? fog) },
        uSunDir: { value: sunDir.clone() }, uSunCol: { value: col(theme.sunColor) }, uSunSize: { value: theme.sunSize },
        uCloudCol: { value: col(theme.cloudColor) }, uCloudDark: { value: col(theme.cloudDark) }, uClouds: { value: theme.clouds }, uWind: { value: theme.wind },
        uR0: { value: col(theme.ridge[0]) }, uR1: { value: col(theme.ridge[1]) }, uR2: { value: col(theme.ridge[2]) },
        uRidgeH: { value: theme.ridgeHeight }, uStyle: { value: STYLE_ID[theme.style] }, uFarStyle: { value: STYLE_ID[farStyle] },
        uSnow: { value: theme.snow ?? 0 }, uStars: { value: theme.stars ?? 0 }, uMoon: { value: theme.moon ?? 0 }, uAurora: { value: theme.aurora ?? 0 },
        uFlash: { value: 0 }, uLights: { value: theme.lights ?? 0 }, uLightCol: { value: col(theme.lightColor ?? 0xffffff) },
        uGlow: { value: theme.glow ?? 0 }, uGlowCol: { value: col(theme.glowColor ?? 0xffffff) }, uTime: { value: 0 },
      },
      defines: { OCT: quality === 'high' ? 5 : 3 },
      vertexShader: VERT, fragmentShader: FRAG,
    });
    this.mesh = new Mesh(new SphereGeometry(3000, 64, 32), this.material);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = -1000;
    this.mesh.name = 'skyDome';
    this.lightning = theme.lightning ?? 0;
  }

  /** Follow the camera and animate. Returns the current lightning flash (0..1) so the scene can flash too. */
  update(dt: number, time: number, camPos: Vector3): number {
    this.mesh.position.copy(camPos);
    const u = this.material.uniforms;
    u.uTime.value = time;
    if (this.lightning > 0) {
      this.nextFlash -= dt;
      if (this.nextFlash <= 0) { this.flash = 1; this.nextFlash = (60 / this.lightning) * (0.4 + Math.random() * 1.2); }
      // a double-strobe decay
      this.flash = Math.max(0, this.flash - dt * 5);
      const strobe = this.flash > 0.55 || (this.flash > 0.15 && this.flash < 0.35) ? this.flash : this.flash * 0.3;
      u.uFlash.value = strobe;
      return strobe;
    }
    return 0;
  }
}
