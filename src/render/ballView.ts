import {
  AdditiveBlending, BackSide, MeshBasicMaterial, BufferAttribute, BufferGeometry, Color, CylinderGeometry, DoubleSide, Group, Line, LineBasicMaterial,
  Mesh, MeshPhysicalMaterial, PointLight, Points, PointsMaterial, RingGeometry, ShaderMaterial, SphereGeometry, Vector3, Matrix4, Quaternion,
} from 'three';
import type { BallPhysics } from '../physics/ball';
import { ballMaps } from './textures';
import { TractorBeam } from './beam';

export const BEAM_COLORS: Record<string, number> = { cyan: 0x47e6ff, magenta: 0xff4fd8, gold: 0xffc84a, lime: 0x8dff5a };

/**
 * HEAT: the steel heats up from rolling friction at speed. Below about
 * 200 km/h it stays cold; ripping it glows dull cherry red, then orange,
 * then yellow, and at INSANE speeds it goes WHITE HOT, throwing sparks off
 * the contact patch. It heats over a couple of seconds of hard rolling and
 * cools more slowly (faster in the air). Visual only: physics never changes.
 */
export const HEAT = { coldBelow: 55, whiteAt: 150, heatRate: 0.8, coolRate: 0.22, airCool: 0.45 };

/** Blackbody-ish colour for heat 0..1: dark red, red, orange, yellow, white. */
export function heatColor(h: number, out: Color): Color {
  const k = Math.max(0, Math.min(1, h));
  const stops: [number, number, number, number][] = [
    [0.0, 0.35, 0.02, 0.0], [0.3, 0.85, 0.08, 0.01], [0.55, 1.0, 0.36, 0.04], [0.78, 1.0, 0.75, 0.25], [1.0, 1.0, 0.97, 0.9],
  ];
  for (let i = 1; i < stops.length; i++) {
    if (k <= stops[i][0]) {
      const a = stops[i - 1], b = stops[i], u = (k - a[0]) / (b[0] - a[0]);
      return out.setRGB(a[1] + (b[1] - a[1]) * u, a[2] + (b[2] - a[2]) * u, a[3] + (b[3] - a[3]) * u);
    }
  }
  return out.setRGB(1, 0.97, 0.9);
}

/** Steel ball + magnetic tractor beam + optional rolling trail. */
const DARK_CHROME = new Color(0x22262e);

export class BallView {
  readonly group = new Group();
  readonly ball: Mesh;
  private beam: Mesh;
  private beamMat: ShaderMaterial;
  private ring: Mesh;
  private light: PointLight;
  private glow: Mesh;
  private trail?: Line;
  private trailPts: Vector3[] = [];
  private beamColor = new Color(BEAM_COLORS.cyan);
  private tether = new TractorBeam();
  private beamLevel = 0;
  private captureFlash = 0;
  private outline: Mesh;
  private worldLum = 0.3;   // how bright the world's gutter is (0 dark .. 1 white)
  private darkMix = 0;
  /** 0 = cold steel .. 1 = white hot. */
  heat = 0;
  private heatCol = new Color();
  private heatGlow: Mesh;
  private heatLight: PointLight;
  private sparks: Points;
  private sparkVel: Float32Array;
  private sparkLife: Float32Array;
  private sparkNext = 0;
  /**
   * Contrast with the medium: in bright worlds (stone, snow, sand, ice...) the
   * steel ball would reflect its light surroundings and disappear, so in the
   * open it turns dark gunmetal chrome; inside dark tubes it returns to bright
   * polished steel.
   */
  setWorldBrightness(lum: number) { this.worldLum = lum; }
  /** 0 = bright steel, 1 = dark chrome (the walls pair their contrast with this). */
  get darkness() { return this.darkMix; }

  constructor(radius: number) {
    const geo = new SphereGeometry(radius, 64, 48);
    const maps = ballMaps('steel');
    const mat = new MeshPhysicalMaterial({
      color: 0xffffff, metalness: 1, roughness: 1, map: maps.map, roughnessMap: maps.roughnessMap,
      clearcoat: 0.6, clearcoatRoughness: 0.05, envMapIntensity: 1.25,
    });
    this.ball = new Mesh(geo, mat);
    this.ball.castShadow = true;
    this.group.add(this.ball);
    // thin black silhouette outline (inverted hull): the ball's edge always reads against bright walls
    this.outline = new Mesh(new SphereGeometry(radius * 1.045, 48, 32), new MeshBasicMaterial({ color: 0x000000, side: BackSide, fog: false }));
    this.ball.add(this.outline);

    // Tractor beam: a unit cylinder from y=0..1, scaled/oriented each frame
    const bg = new CylinderGeometry(1, 1, 1, 24, 1, true);
    bg.translate(0, 0.5, 0);
    this.beamMat = new ShaderMaterial({
      transparent: true, depthWrite: false, blending: AdditiveBlending, side: DoubleSide,
      uniforms: { uTime: { value: 0 }, uColor: { value: this.beamColor }, uLevel: { value: 0 } },
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: `uniform float uTime; uniform vec3 uColor; uniform float uLevel; varying vec2 vUv;
        void main(){
          float bands = 0.55 + 0.45 * sin(vUv.y * 40.0 - uTime * 28.0);
          float rim = pow(1.0 - abs(sin(vUv.x * 3.14159)), 2.0) * 0.6 + 0.4;
          float fade = smoothstep(0.0, 0.12, vUv.y) * smoothstep(1.0, 0.85, vUv.y);
          float a = bands * rim * fade * uLevel * 0.85;
          gl_FragColor = vec4(uColor * (1.2 + bands), a);
        }`,
    });
    this.beam = new Mesh(bg, this.beamMat);
    this.beam.visible = false;
    this.beam.frustumCulled = false;
    this.group.add(this.beam);

    this.ring = new Mesh(new RingGeometry(0.25, 0.7, 32), new MeshPhysicalMaterial({ color: 0x000000, emissive: this.beamColor, emissiveIntensity: 3, transparent: true, opacity: 0.8, side: DoubleSide, depthWrite: false }));
    this.ring.visible = false;
    this.group.add(this.ring);

    this.glow = new Mesh(new SphereGeometry(radius * 1.35, 24, 16), new ShaderMaterial({
      transparent: true, depthWrite: false, blending: AdditiveBlending,
      uniforms: { uColor: { value: this.beamColor }, uLevel: { value: 0 } },
      vertexShader: `varying vec3 vN; varying vec3 vV; void main(){ vN = normalize(normalMatrix*normal); vec4 mv = modelViewMatrix*vec4(position,1.0); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }`,
      fragmentShader: `uniform vec3 uColor; uniform float uLevel; varying vec3 vN; varying vec3 vV; void main(){ float f = pow(1.0 - max(dot(vN, vV), 0.0), 2.5); gl_FragColor = vec4(uColor, f * uLevel); }`,
    }));
    this.group.add(this.glow);

    // heat halo (additive rim glow in the heat colour) and its light on the gutter
    this.heatGlow = new Mesh(new SphereGeometry(radius * 1.28, 24, 16), new ShaderMaterial({
      transparent: true, depthWrite: false, blending: AdditiveBlending,
      uniforms: { uColor: { value: new Color() }, uLevel: { value: 0 }, uTime: { value: 0 } },
      vertexShader: `varying vec3 vN; varying vec3 vV; void main(){ vN = normalize(normalMatrix*normal); vec4 mv = modelViewMatrix*vec4(position,1.0); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }`,
      fragmentShader: `uniform vec3 uColor; uniform float uLevel; uniform float uTime; varying vec3 vN; varying vec3 vV;
        void main(){ float f = pow(1.0 - max(dot(vN, vV), 0.0), 1.6); float shimmer = 0.85 + 0.15 * sin(uTime * 23.0 + vN.y * 9.0);
          gl_FragColor = vec4(uColor, f * uLevel * shimmer); }`,
    }));
    this.heatGlow.visible = false;
    this.group.add(this.heatGlow);
    this.heatLight = new PointLight(0xff6020, 0, 14, 2);
    this.group.add(this.heatLight);
    // sparks off the contact patch when it's really hot
    const NS = 140;
    const sg = new BufferGeometry();
    sg.setAttribute('position', new BufferAttribute(new Float32Array(NS * 3), 3));
    sg.setAttribute('color', new BufferAttribute(new Float32Array(NS * 3), 3));
    this.sparkVel = new Float32Array(NS * 3); this.sparkLife = new Float32Array(NS);
    this.sparks = new Points(sg, new PointsMaterial({ size: 0.16, vertexColors: true, transparent: true, depthWrite: false, blending: AdditiveBlending }));
    this.sparks.frustumCulled = false;
    this.group.add(this.sparks);

    this.light = new PointLight(this.beamColor, 0, 9, 2);
    this.group.add(this.light);
    this.group.add(this.tether.group);
    this.radius = radius;
  }

  setSkin(skin: string) {
    const maps = ballMaps(skin);
    const m = this.ball.material as MeshPhysicalMaterial;
    m.map = maps.map; m.roughnessMap = maps.roughnessMap;
    m.metalness = skin === 'rolypoly' ? 0.15 : 1;
    m.clearcoat = skin === 'rolypoly' ? 0.9 : 0.6;
    m.needsUpdate = true;
  }

  private radius = 0.75;
  setBeamColor(name: string) { this.beamColor.set(BEAM_COLORS[name] ?? BEAM_COLORS.cyan); this.tether.color.copy(this.beamColor); }

  setTrail(on: boolean, colorHex = 0x9fe8ff) {
    if (on && !this.trail) {
      const g = new BufferGeometry();
      g.setAttribute('position', new BufferAttribute(new Float32Array(90 * 3), 3));
      this.trail = new Line(g, new LineBasicMaterial({ color: colorHex, transparent: true, opacity: 0.7 }));
      this.trail.frustumCulled = false;
      this.group.add(this.trail);
    } else if (!on && this.trail) {
      this.group.remove(this.trail);
      this.trail = undefined;
    }
  }

  flashCapture() { this.captureFlash = 1; }

  update(b: BallPhysics, dt: number, time: number) {
    {
      const tk = b.track.tubeAt(b.proj.s);
      const want = Math.max(0, Math.min(1, (this.worldLum - 0.33) / 0.18)) * (1 - tk);
      this.darkMix += (want - this.darkMix) * Math.min(1, dt * 4);
      const m = this.ball.material as MeshPhysicalMaterial;
      m.color.setRGB(1, 1, 1).lerp(DARK_CHROME, this.darkMix);
      m.envMapIntensity = 1.25 - 0.75 * this.darkMix;
    }
    this.ball.position.copy(b.p);
    this.ball.quaternion.copy(b.q);
    this.updateHeat(b, dt, time);
    this.glow.position.copy(b.p);
    this.light.position.copy(b.p);
    const target = b.magnetActive || b.netLift || b.recalling ? 0.4 + 0.6 * b.magnetForce : 0;
    this.beamLevel += (target - this.beamLevel) * Math.min(1, dt * 14);
    this.captureFlash = Math.max(0, this.captureFlash - dt * 3);
    const lvl = this.beamLevel + this.captureFlash * 0.8;
    this.beamMat.uniforms.uTime.value = time;
    this.beamMat.uniforms.uLevel.value = lvl;
    (this.glow.material as ShaderMaterial).uniforms.uLevel.value = Math.min(1, lvl * 1.2);
    this.light.intensity = lvl * 28;
    // The old straight cylinder is replaced by the curved tether
    this.beam.visible = false;
    this.ring.visible = false;
    if (b.magnetHasTarget || lvl < 0.02) {
      const n = new Vector3().subVectors(b.p, b.magnetTarget);
      if (n.lengthSq() < 1e-6) n.copy(b.n); n.normalize();
      this.tether.update(b.p, b.magnetTarget, n, b.v, b.magnetHasTarget ? Math.min(1, lvl) : 0, this.radius, time, dt);
    }
    if (this.trail) {
      this.trailPts.unshift(b.p.clone());
      if (this.trailPts.length > 90) this.trailPts.pop();
      const arr = (this.trail.geometry.attributes.position as BufferAttribute);
      for (let i = 0; i < 90; i++) {
        const p = this.trailPts[Math.min(i, this.trailPts.length - 1)];
        arr.setXYZ(i, p.x, p.y, p.z);
      }
      arr.needsUpdate = true;
    }
    void Matrix4; void Quaternion;
  }

  private updateHeat(b: BallPhysics, dt: number, time: number) {
    const sp = b.v.length();
    const target = b.contact ? Math.max(0, Math.min(1, (sp - HEAT.coldBelow) / (HEAT.whiteAt - HEAT.coldBelow))) : 0;
    if (target > this.heat) this.heat += (target - this.heat) * Math.min(1, dt * HEAT.heatRate);
    else this.heat += (target - this.heat) * Math.min(1, dt * (b.contact ? HEAT.coolRate : HEAT.airCool));
    const h = this.heat;
    const m = this.ball.material as MeshPhysicalMaterial;
    const glow = h < 0.04 ? 0 : Math.pow((h - 0.04) / 0.96, 1.3);
    heatColor(h, this.heatCol);
    m.emissive.copy(this.heatCol);
    m.emissiveIntensity = glow * (1.2 + 2.6 * h);
    // white-hot steel stops looking like a mirror: the reflections wash out in its own light
    if (glow > 0) m.envMapIntensity *= 1 - 0.7 * h * h;
    this.heatGlow.visible = glow > 0.02;
    if (this.heatGlow.visible) {
      this.heatGlow.position.copy(b.p);
      const u = (this.heatGlow.material as ShaderMaterial).uniforms;
      (u.uColor.value as Color).copy(this.heatCol); u.uLevel.value = Math.min(1, glow * 1.3); u.uTime.value = time;
    }
    this.heatLight.position.copy(b.p);
    this.heatLight.color.copy(this.heatCol);
    this.heatLight.intensity = glow * 40;
    // sparks: thrown off the contact patch, more and brighter the hotter you are
    const pos = this.sparks.geometry.getAttribute('position') as BufferAttribute;
    const col = this.sparks.geometry.getAttribute('color') as BufferAttribute;
    const NS = this.sparkLife.length;
    if (b.contact && h > 0.55) {
      this.sparkNext += dt * (h - 0.5) * 360;
      while (this.sparkNext >= 1) {
        this.sparkNext -= 1;
        let i = 0, oldest = 1e9;
        for (let k = 0; k < NS; k++) if (this.sparkLife[k] < oldest) { oldest = this.sparkLife[k]; i = k; }
        const r = this.radius;
        pos.setXYZ(i, b.p.x - b.n.x * r * 0.9, b.p.y - b.n.y * r * 0.9, b.p.z - b.n.z * r * 0.9);
        const spread = 6 + 8 * h;
        this.sparkVel[i * 3] = -b.v.x * 0.25 + (Math.random() - 0.5) * spread + b.n.x * (2 + Math.random() * 4);
        this.sparkVel[i * 3 + 1] = -b.v.y * 0.25 + (Math.random() - 0.5) * spread + b.n.y * (2 + Math.random() * 4);
        this.sparkVel[i * 3 + 2] = -b.v.z * 0.25 + (Math.random() - 0.5) * spread + b.n.z * (2 + Math.random() * 4);
        this.sparkLife[i] = 0.25 + Math.random() * 0.35;
      }
    } else this.sparkNext = 0;
    let any = false;
    for (let i = 0; i < NS; i++) {
      if (this.sparkLife[i] <= 0) { col.setXYZ(i, 0, 0, 0); continue; }
      any = true;
      this.sparkLife[i] -= dt;
      this.sparkVel[i * 3 + 1] -= 9.8 * dt;
      pos.setXYZ(i, pos.getX(i) + this.sparkVel[i * 3] * dt, pos.getY(i) + this.sparkVel[i * 3 + 1] * dt, pos.getZ(i) + this.sparkVel[i * 3 + 2] * dt);
      const f = Math.max(0, Math.min(1, this.sparkLife[i] / 0.4));
      col.setXYZ(i, f, f * (0.45 + 0.5 * h) , f * 0.25 * h);
    }
    this.sparks.visible = any;
    if (any) { pos.needsUpdate = true; col.needsUpdate = true; }
  }
}
