import {
  AdditiveBlending, BufferAttribute, BufferGeometry, Color, CylinderGeometry, DoubleSide, Group, Line, LineBasicMaterial,
  Mesh, MeshPhysicalMaterial, PointLight, RingGeometry, ShaderMaterial, SphereGeometry, Vector3, Matrix4, Quaternion,
} from 'three';
import type { BallPhysics } from '../physics/ball';
import { ballMaps } from './textures';
import { TractorBeam } from './beam';

export const BEAM_COLORS: Record<string, number> = { cyan: 0x47e6ff, magenta: 0xff4fd8, gold: 0xffc84a, lime: 0x8dff5a };

/** Steel ball + magnetic tractor beam + optional rolling trail. */
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
    this.ball.position.copy(b.p);
    this.ball.quaternion.copy(b.q);
    this.glow.position.copy(b.p);
    this.light.position.copy(b.p);
    const target = b.magnetActive ? 0.4 + 0.6 * b.magnetForce : 0;
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
}
