import { Color, Material } from 'three';

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
  kind: 0 | 1 | 2;     // 0 Kali set, 1 Julia set, 2 kaleidoscopic fold
  a: number;           // primary colour
  b: number;           // secondary colour
  scale: number;       // pattern size (bigger = smaller detail)
  flow: number;        // streaming speed along the course
  strength: number;    // per-world base strength
  c: [number, number]; // fractal parameter
}

export const FRACTAL_THEMES: Record<string, FractalTheme> = {
  wood:     { kind: 0, a: 0xffc060, b: 0xff5a10, scale: 0.12, flow: 0.55, strength: 0.55, c: [0.52, 0.62] },
  concrete: { kind: 2, a: 0x37e0d0, b: 0x1a6cff, scale: 0.150, flow: 0.6, strength: 0.6, c: [0.6, 0.4] },
  metal:    { kind: 1, a: 0x4fc3ff, b: 0xd04cff, scale: 0.210, flow: 0.8, strength: 0.7, c: [-0.74, 0.18] },
  ice:      { kind: 0, a: 0x7dffea, b: 0x9a7dff, scale: 0.12, flow: 0.45, strength: 0.6, c: [0.45, 0.7] },
  water:    { kind: 2, a: 0x5ff4ff, b: 0x2a7dff, scale: 0.135, flow: 0.9, strength: 0.5, c: [0.55, 0.5] },
  glass:    { kind: 1, a: 0xff5ec4, b: 0x5effd2, scale: 0.180, flow: 0.6, strength: 0.75, c: [0.285, 0.01] },
  rubber:   { kind: 0, a: 0xff2bd6, b: 0x2bf0ff, scale: 0.12, flow: 0.8, strength: 1.0, c: [0.5, 0.55] },
  sand:     { kind: 2, a: 0xffd36b, b: 0xff7a2b, scale: 0.120, flow: 0.4, strength: 0.45, c: [0.7, 0.5] },
  mud:      { kind: 0, a: 0x8dff5a, b: 0x2bffb0, scale: 0.12, flow: 0.5, strength: 0.6, c: [0.58, 0.48] },
  stone:    { kind: 1, a: 0xffd27a, b: 0xffffff, scale: 0.195, flow: 0.4, strength: 0.5, c: [-0.4, 0.6] },
  grating:  { kind: 2, a: 0xff7a1a, b: 0xffd04a, scale: 0.165, flow: 0.9, strength: 0.7, c: [0.65, 0.35] },
  snow:     { kind: 0, a: 0x7dd8ff, b: 0xe0a0ff, scale: 0.12, flow: 0.5, strength: 0.55, c: [0.48, 0.66] },
};

export interface FractalUniforms {
  uFxTime: { value: number };
  uFxIntensity: { value: number };
  uFxSpeed: { value: number };
  uFxTravel: { value: number }; // distance the ball has travelled (metres)
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
varying vec2 vFxUv;
varying vec4 vFxMode;

vec2 fxMirror(vec2 p) { return abs(mod(p, 4.0) - 2.0) - 1.0; }

float fxPattern(vec2 p) {
#if FX_KIND == 0
  // Kali set: p = |p| / dot(p,p) - c
  // orbit trap: glowing filaments
  vec2 c = uFxC + 0.05 * vec2(sin(uFxTime * 0.31), cos(uFxTime * 0.23));
  float trap = 10.0;
  for (int i = 0; i < 7; i++) {
    p = abs(p) / max(dot(p, p), 1e-3) - c;
    trap = min(trap, abs(p.x * p.y) * 4.0 + abs(length(p) - 1.0) * 0.5);
  }
  return pow(clamp(1.0 - trap * 2.2, 0.0, 1.0), 1.5);
#elif FX_KIND == 1
  // Julia set, smooth escape-time
  vec2 z = p * 1.4;
  vec2 c = uFxC + 0.04 * vec2(cos(uFxTime * 0.27), sin(uFxTime * 0.19));
  float n = 0.0;
  for (int i = 0; i < 24; i++) {
    z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
    if (dot(z, z) > 16.0) break;
    n += 1.0;
  }
  // glowing escape bands; the set interior stays dark
  float bands = 0.5 + 0.5 * cos(n * 0.55 - uFxTime * 0.8);
  return n > 23.5 ? 0.05 : bands * smoothstep(1.0, 6.0, n);
#else
  // Kaleidoscopic folding ribbons
  float a = uFxTime * 0.15;
  float acc = 0.0;
  for (int i = 0; i < 7; i++) {
    p = abs(p) - uFxC;
    float ca = cos(a + float(i) * 0.7), sa = sin(a + float(i) * 0.7);
    p = mat2(ca, -sa, sa, ca) * p * 1.35;
    acc += 0.02 / max(abs(p.y), 0.012);
  }
  return clamp(acc * 0.35, 0.0, 1.0);
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
  float wall = max(smoothstep(1.4, 3.8, abs(across)), tube * 0.5);
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
  float f = clamp(f1 + f2 * mix(0.35, 0.7, tube), 0.0, 1.4);

  // psychedelic colour: hue cycles in time, along the course and through the
  // pattern itself (full spectrum in tubes, a gentle shimmer in the open)
  vec3 col = mix(uFxB, uFxA, clamp(f1, 0.0, 1.0));
  col = mix(col, mix(uFxA, uFxB, 0.5) * 1.2, clamp(f2, 0.0, 1.0) * 0.4);
  float psy = mix(0.35, 1.0, tube);
  col = fxHue(col, psy * (uFxTime * 0.9 + vFxUv.y * 0.025 - uFxTravel * 0.01 + f1 * 2.5 + cos(across * 6.2832 / uFxRing) * 1.5));
  col = max(col, 0.0);

  // WARP RINGS: bright bands around the pipe rushing at you with your speed
  float ring = pow(0.5 + 0.5 * sin((vFxUv.y + uFxTravel * 1.0) * 0.45 + uFxTime * 3.0), 10.0) * (0.25 + tube * 1.1);
  vec3 ringCol = fxHue(uFxA, uFxTime * 1.3 + vFxUv.y * 0.05);

  float pulse = (0.85 + 0.15 * sin(uFxTime * 2.0 + vFxUv.y * 0.6)) * (1.0 + push * 0.45 * breathe);
  float k = (0.07 + 0.93 * wall) * f * pulse * (0.75 + 0.5 * uFxSpeed) * (1.0 + 1.3 * tube);
  return (col * k + ringCol * ring * (0.4 + 0.6 * uFxSpeed) * (0.3 + 0.7 * wall)) * uFxIntensity * 2.2;
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
      uFxC: { value: theme.c }, uFxCenter: { value: centerAcross }, uFxRing: { value: ring },
    });
    sh.vertexShader = 'attribute vec2 fxuv;\nattribute vec4 fxmode;\nvarying vec2 vFxUv;\nvarying vec4 vFxMode;\n' + sh.vertexShader.replace('#include <uv_vertex>', '#include <uv_vertex>\n vFxUv = fxuv; vFxMode = fxmode;');
    // inside a tube the wood itself goes dark so the projection owns the walls (dome-screen look)
    sh.fragmentShader = GLSL + sh.fragmentShader
      .replace('#include <map_fragment>', '#include <map_fragment>\n diffuseColor.rgb *= 1.0 - 0.72 * vFxMode.w;')
      .replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\n totalEmissiveRadiance += fxColor();');
  };
  mat.customProgramCacheKey = () => `fx${theme.kind}`;
  mat.needsUpdate = true;
}
