import {
  AdditiveBlending, BufferAttribute, BufferGeometry, Color, DoubleSide, Group, Line, LineBasicMaterial, Mesh,
  Points, ShaderMaterial, Vector3, RingGeometry, MeshBasicMaterial, CircleGeometry,
} from 'three';

/**
 * Magnetic tractor-beam tether.
 *
 * A curved energy column from the gutter surface to the ball (a quadratic
 * Bézier that bends and lags behind the ball's motion, so it reads as a
 * physical connection), three helical field strands twisting around it,
 * particles streaming up into the ball, and a pulsing impact glow on the
 * surface. Brightness follows magnet force; a flash marks capture.
 */
const SEG = 28, RAD = 10, STRANDS = 3, STRAND_PTS = 72, PARTICLES = 60;

export class TractorBeam {
  readonly group = new Group();
  private core: Mesh;
  private coreGeo: BufferGeometry;
  private coreMat: ShaderMaterial;
  private strands: Line[] = [];
  private particles: Points;
  private pMat: ShaderMaterial;
  private impact: Mesh;
  private impactGlow: Mesh;
  private phase = new Float32Array(PARTICLES);
  readonly color = new Color(0x47e6ff);
  private ctrl = new Vector3();
  private initialised = false;

  constructor() {
    this.coreGeo = new BufferGeometry();
    const pos = new Float32Array((SEG + 1) * (RAD + 1) * 3);
    const uv = new Float32Array((SEG + 1) * (RAD + 1) * 2);
    const idx: number[] = [];
    for (let i = 0; i <= SEG; i++) for (let j = 0; j <= RAD; j++) {
      const k = i * (RAD + 1) + j;
      uv[k * 2] = j / RAD; uv[k * 2 + 1] = i / SEG;
      if (i < SEG && j < RAD) { const a = k, b = k + 1, c = k + RAD + 1, d = c + 1; idx.push(a, c, b, b, c, d); }
    }
    this.coreGeo.setAttribute('position', new BufferAttribute(pos, 3));
    this.coreGeo.setAttribute('uv', new BufferAttribute(uv, 2));
    this.coreGeo.setIndex(idx);
    this.coreMat = new ShaderMaterial({
      transparent: true, depthWrite: false, blending: AdditiveBlending, side: DoubleSide,
      uniforms: { uTime: { value: 0 }, uColor: { value: this.color }, uLevel: { value: 0 } },
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `uniform float uTime; uniform vec3 uColor; uniform float uLevel; varying vec2 vUv;
        void main(){
          // energy pulses travelling from the surface (v=0) up to the ball (v=1)
          float flow = 0.5 + 0.5 * sin(vUv.y * 34.0 - uTime * 22.0);
          float flow2 = 0.5 + 0.5 * sin(vUv.y * 11.0 - uTime * 9.0 + vUv.x * 6.283);
          float edge = pow(1.0 - abs(vUv.x * 2.0 - 1.0), 0.6);
          float ends = smoothstep(0.0, 0.08, vUv.y) * smoothstep(1.0, 0.9, vUv.y);
          float a = (0.35 + 0.65 * flow * flow2) * (0.45 + 0.55 * edge) * ends * uLevel;
          gl_FragColor = vec4(uColor * (1.0 + 1.6 * flow) + vec3(0.6) * flow * uLevel, a);
        }`,
    });
    this.core = new Mesh(this.coreGeo, this.coreMat);
    this.core.frustumCulled = false;
    this.group.add(this.core);

    for (let s = 0; s < STRANDS; s++) {
      const g = new BufferGeometry();
      g.setAttribute('position', new BufferAttribute(new Float32Array(STRAND_PTS * 3), 3));
      const l = new Line(g, new LineBasicMaterial({ color: this.color, transparent: true, opacity: 0.9, blending: AdditiveBlending, depthWrite: false }));
      l.frustumCulled = false;
      this.strands.push(l);
      this.group.add(l);
    }

    const pg = new BufferGeometry();
    pg.setAttribute('position', new BufferAttribute(new Float32Array(PARTICLES * 3), 3));
    for (let i = 0; i < PARTICLES; i++) this.phase[i] = Math.random();
    this.pMat = new ShaderMaterial({
      transparent: true, depthWrite: false, blending: AdditiveBlending,
      uniforms: { uColor: { value: this.color }, uLevel: { value: 0 } },
      vertexShader: `uniform float uLevel; void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_PointSize = clamp(90.0 / -mv.z, 2.0, 14.0) * uLevel; gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `uniform vec3 uColor; void main(){ vec2 d = gl_PointCoord - 0.5; float a = smoothstep(0.5, 0.0, length(d)); gl_FragColor = vec4(uColor * 1.6 + 0.4, a); }`,
    });
    this.particles = new Points(pg, this.pMat);
    this.particles.frustumCulled = false;
    this.group.add(this.particles);

    this.impact = new Mesh(new RingGeometry(0.35, 0.8, 40), new MeshBasicMaterial({ color: this.color, transparent: true, opacity: 0.9, blending: AdditiveBlending, depthWrite: false, side: DoubleSide }));
    this.impactGlow = new Mesh(new CircleGeometry(1.6, 40), new ShaderMaterial({
      transparent: true, depthWrite: false, blending: AdditiveBlending, side: DoubleSide,
      uniforms: { uColor: { value: this.color }, uLevel: { value: 0 } },
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `uniform vec3 uColor; uniform float uLevel; varying vec2 vUv; void main(){ float r = length(vUv - 0.5) * 2.0; gl_FragColor = vec4(uColor, pow(max(0.0, 1.0 - r), 2.0) * uLevel); }`,
    }));
    this.group.add(this.impact, this.impactGlow);
    this.group.visible = false;
  }

  private bez(p0: Vector3, c: Vector3, p1: Vector3, t: number, out: Vector3) {
    const u = 1 - t;
    return out.set(0, 0, 0).addScaledVector(p0, u * u).addScaledVector(c, 2 * u * t).addScaledVector(p1, t * t);
  }

  /**
   * @param ball ball centre; @param target surface anchor; @param vel ball velocity
   * @param level 0..1 brightness; @param radius ball radius
   */
  update(ball: Vector3, target: Vector3, normal: Vector3, vel: Vector3, level: number, radius: number, time: number, dt: number) {
    this.group.visible = level > 0.02;
    if (!this.group.visible) { this.initialised = false; return; }
    const span = ball.distanceTo(target);
    // Control point: midpoint pushed back against the motion, so the tether trails and bends
    const mid = new Vector3().addVectors(ball, target).multiplyScalar(0.5);
    const lag = vel.clone().multiplyScalar(-Math.min(0.12, 0.6 / Math.max(1, vel.length())) * Math.min(1, span / 3));
    const want = mid.add(lag);
    if (!this.initialised) { this.ctrl.copy(want); this.initialised = true; }
    this.ctrl.lerp(want, Math.min(1, dt * 10));
    const pos = this.coreGeo.attributes.position as BufferAttribute;
    const p = new Vector3(), q = new Vector3(), tan = new Vector3(), side = new Vector3(), bin = new Vector3();
    const ref = Math.abs(normal.y) < 0.9 ? new Vector3(0, 1, 0) : new Vector3(1, 0, 0);
    for (let i = 0; i <= SEG; i++) {
      const t = i / SEG;
      this.bez(target, this.ctrl, ball, t, p);
      this.bez(target, this.ctrl, ball, Math.min(1, t + 0.02), q);
      tan.subVectors(q, p);
      if (tan.lengthSq() < 1e-8) tan.copy(normal); tan.normalize();
      side.crossVectors(tan, ref).normalize();
      bin.crossVectors(tan, side).normalize();
      // wide at the surface, narrowing into the ball, breathing with the pulse
      const r = (0.55 * (1 - t) + radius * 0.55 * t) * (0.85 + 0.15 * Math.sin(time * 18 - t * 12)) * (0.6 + 0.4 * level);
      for (let j = 0; j <= RAD; j++) {
        const a = (j / RAD) * Math.PI * 2;
        const k = i * (RAD + 1) + j;
        pos.setXYZ(k, p.x + (side.x * Math.cos(a) + bin.x * Math.sin(a)) * r, p.y + (side.y * Math.cos(a) + bin.y * Math.sin(a)) * r, p.z + (side.z * Math.cos(a) + bin.z * Math.sin(a)) * r);
      }
    }
    pos.needsUpdate = true;
    // helical strands twisting around the column
    for (let s = 0; s < STRANDS; s++) {
      const sp = this.strands[s].geometry.attributes.position as BufferAttribute;
      for (let i = 0; i < STRAND_PTS; i++) {
        const t = i / (STRAND_PTS - 1);
        this.bez(target, this.ctrl, ball, t, p);
        this.bez(target, this.ctrl, ball, Math.min(1, t + 0.02), q);
        tan.subVectors(q, p).normalize();
        side.crossVectors(tan, ref).normalize();
        bin.crossVectors(tan, side).normalize();
        const a = t * span * 2.2 - time * 9 + (s / STRANDS) * Math.PI * 2;
        const r = (0.9 * (1 - t) + radius * 1.15 * t) * (0.7 + 0.3 * level);
        sp.setXYZ(i, p.x + (side.x * Math.cos(a) + bin.x * Math.sin(a)) * r, p.y + (side.y * Math.cos(a) + bin.y * Math.sin(a)) * r, p.z + (side.z * Math.cos(a) + bin.z * Math.sin(a)) * r);
      }
      sp.needsUpdate = true;
      (this.strands[s].material as LineBasicMaterial).opacity = 0.35 + 0.6 * level;
    }
    // particles streaming from the surface into the ball
    const pp = this.particles.geometry.attributes.position as BufferAttribute;
    for (let i = 0; i < PARTICLES; i++) {
      this.phase[i] = (this.phase[i] + dt * (0.9 + 0.8 * level) * (0.6 + (i % 7) * 0.08)) % 1;
      const t = this.phase[i];
      this.bez(target, this.ctrl, ball, t, p);
      const a = i * 2.39996 + time * 3;
      const r = 0.45 * (1 - t);
      pp.setXYZ(i, p.x + Math.cos(a) * r * 0.7, p.y + Math.sin(a) * r * 0.7, p.z + Math.sin(a * 1.3) * r * 0.7);
    }
    pp.needsUpdate = true;
    this.coreMat.uniforms.uTime.value = time;
    this.coreMat.uniforms.uLevel.value = level;
    this.pMat.uniforms.uLevel.value = level;
    // impact glow on the gutter surface
    const n = normal.clone().normalize();
    const look = new Vector3(0, 0, 1);
    this.impact.position.copy(target).addScaledVector(n, 0.03);
    this.impact.quaternion.setFromUnitVectors(look, n);
    this.impact.scale.setScalar((0.7 + level * 0.8) * (1 + 0.2 * Math.sin(time * 16)));
    (this.impact.material as MeshBasicMaterial).opacity = 0.4 + 0.5 * level;
    this.impactGlow.position.copy(target).addScaledVector(n, 0.02);
    this.impactGlow.quaternion.copy(this.impact.quaternion);
    this.impactGlow.scale.setScalar(0.8 + level);
    (this.impactGlow.material as ShaderMaterial).uniforms.uLevel.value = level * 0.9;
  }
}
