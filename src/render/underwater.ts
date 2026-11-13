import {
  AdditiveBlending, BufferAttribute, BufferGeometry, Color, ConeGeometry, DoubleSide, Group, InstancedBufferAttribute, InstancedMesh,
  Matrix4, Mesh, PlaneGeometry, Points, Quaternion, Scene, ShaderMaterial, SphereGeometry, Vector3,
} from 'three';

/**
 * UNDERWATER (the Water world): the whole course runs along the bottom of a
 * psychedelic aquarium.
 *  - Overhead, the water's surface: a bright, rippling mirror of light with
 *    caustic patterns dancing across it, and shafts of sunlight slanting
 *    down through the blue.
 *  - Drifting plankton glints all around you (they stream past with your
 *    speed, so you feel the water).
 *  - Schools of glowing fish sweep by in shifting rainbow colours, tails
 *    beating; jellyfish pulse along, trailing light.
 * Everything follows the camera, so it costs the same anywhere on the course.
 * All shapes are made here, in code.
 */
export class Underwater {
  readonly group = new Group();
  private surface: Mesh; private surfMat: ShaderMaterial;
  private rays: Mesh[] = []; private rayMat: ShaderMaterial;
  private motes: Points; private moteMat: ShaderMaterial;
  private fish: InstancedMesh; private fishMat: ShaderMaterial;
  private schools: { c: Vector3; dir: Vector3; turn: number; r: number; n: number; first: number; spread: number[] }[] = [];
  private jellies: { g: Group; mat: ShaderMaterial; p: Vector3; v: Vector3; phase: number }[] = [];
  private m4 = new Matrix4(); private q = new Quaternion(); private s = new Vector3(); private t = new Vector3(); private u = new Vector3();

  constructor(private scene: Scene, quality: 'low' | 'high') {
    // ---- the surface overhead ----
    this.surfMat = new ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uCam: { value: new Vector3() } },
      vertexShader: `varying vec2 vW; void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xz; gl_Position = projectionMatrix * viewMatrix * w; }`,
      fragmentShader: `uniform float uTime; uniform vec3 uCam; varying vec2 vW;
        float wave(vec2 p){ return sin(p.x * 0.09 + uTime * 0.7) * cos(p.y * 0.07 - uTime * 0.5) + 0.5 * sin((p.x + p.y) * 0.17 + uTime * 1.3); }
        void main(){
          vec2 p = vW * 0.6;
          // caustic net: thin bright lines where ripples focus the light
          float c = 0.0;
          for (int i = 0; i < 3; i++) { float fi = float(i); vec2 q = p * (0.06 + fi * 0.035) + vec2(uTime * (0.08 + fi * 0.03), -uTime * 0.05 * fi);
            c += pow(1.0 - abs(sin(q.x * 6.2832 + sin(q.y * 4.0 + uTime))) * abs(sin(q.y * 6.2832 + sin(q.x * 3.0 - uTime))), 6.0); }
          float h = wave(vW);
          float d = length(vW - uCam.xz);
          float fade = exp(-d * 0.0035);
          vec3 deep = vec3(0.03, 0.32, 0.45), bright = vec3(0.55, 0.95, 1.0);
          vec3 col = mix(deep, bright, 0.45 + 0.25 * h) + vec3(0.6, 1.0, 1.0) * c * 0.35;
          // the sun's bright window straight up
          col += vec3(1.0, 0.98, 0.85) * exp(-d * 0.012) * 0.8;
          gl_FragColor = vec4(col, fade);
        }`,
      transparent: true, depthWrite: false, side: DoubleSide, fog: false, toneMapped: false,
    });
    const sg = new PlaneGeometry(2400, 2400, 1, 1); sg.rotateX(Math.PI / 2);
    this.surface = new Mesh(sg, this.surfMat); this.surface.frustumCulled = false; this.surface.renderOrder = -2;
    this.group.add(this.surface);

    // ---- shafts of sunlight ----
    this.rayMat = new ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `uniform float uTime; varying vec2 vUv;
        void main(){ float edge = sin(vUv.x * 3.14159); float a = pow(edge, 3.0) * smoothstep(0.0, 0.6, vUv.y) * 0.16;
          a *= 0.7 + 0.3 * sin(uTime * 0.6 + vUv.x * 9.0);
          gl_FragColor = vec4(vec3(0.75, 1.0, 0.95) * a, a); }`,
      transparent: true, depthWrite: false, side: DoubleSide, blending: AdditiveBlending, fog: false, toneMapped: false,
    });
    for (let k = 0; k < (quality === 'high' ? 9 : 5); k++) {
      const g = new ConeGeometry(14 + (k % 3) * 6, 220, 16, 1, true); g.translate(0, -110, 0);
      const r = new Mesh(g, this.rayMat); r.frustumCulled = false;
      r.userData = { ang: k * 2.4, dist: 30 + (k * 37) % 90, tilt: 0.25 + (k % 4) * 0.06 };
      this.rays.push(r); this.group.add(r);
    }

    // ---- plankton motes (wrap round the camera) ----
    const N = quality === 'high' ? 2600 : 1400, BOX = 140;
    const pos = new Float32Array(N * 3), hue = new Float32Array(N);
    for (let i = 0; i < N; i++) { pos[i * 3] = Math.random() * BOX; pos[i * 3 + 1] = Math.random() * BOX; pos[i * 3 + 2] = Math.random() * BOX; hue[i] = Math.random(); }
    const mg = new BufferGeometry(); mg.setAttribute('position', new BufferAttribute(pos, 3)); mg.setAttribute('hue', new BufferAttribute(hue, 1));
    this.moteMat = new ShaderMaterial({
      uniforms: { uCam: { value: new Vector3() }, uBox: { value: BOX }, uTime: { value: 0 } },
      vertexShader: `attribute float hue; uniform vec3 uCam; uniform float uBox, uTime; varying float vH; varying float vD;
        void main(){ vec3 p = position + vec3(sin(uTime * 0.3 + hue * 20.0), uTime * 0.6, cos(uTime * 0.25 + hue * 13.0)) * 2.0;
          p = mod(p - uCam + uBox * 0.5, uBox) + uCam - uBox * 0.5;
          vec4 mv = viewMatrix * vec4(p, 1.0); gl_Position = projectionMatrix * mv; vD = -mv.z;
          gl_PointSize = (1.5 + 2.5 * fract(hue * 7.0)) * 60.0 / max(1.0, -mv.z); vH = hue; }`,
      fragmentShader: `uniform float uTime; varying float vH; varying float vD;
        void main(){ vec2 c = gl_PointCoord - 0.5; float d = dot(c, c); if (d > 0.25) discard;
          vec3 col = 0.55 + 0.45 * cos(6.2832 * (vH + uTime * 0.05 + vec3(0.0, 0.33, 0.67)));
          float a = (1.0 - d * 4.0) * smoothstep(80.0, 20.0, vD) * 0.8;
          gl_FragColor = vec4(col * 1.4, a); }`,
      transparent: true, depthWrite: false, blending: AdditiveBlending, fog: false, toneMapped: false,
    });
    this.motes = new Points(mg, this.moteMat); this.motes.frustumCulled = false;
    this.group.add(this.motes);

    // ---- fish ----
    const fg = fishGeometry();
    const nSchools = quality === 'high' ? 7 : 4, per = 22;
    const phase = new Float32Array(nSchools * per), tint = new Float32Array(nSchools * per);
    for (let i = 0; i < phase.length; i++) { phase[i] = Math.random() * 6.28; tint[i] = Math.floor(i / per) / nSchools + Math.random() * 0.08; }
    fg.setAttribute('aPhase', new InstancedBufferAttribute(phase, 1));
    fg.setAttribute('aTint', new InstancedBufferAttribute(tint, 1));
    this.fishMat = new ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `attribute float aPhase; attribute float aTint; uniform float uTime; varying float vT; varying float vX; varying vec3 vN;
        void main(){ vec3 p = position;
          // the tail beats: the back of the body swings side to side
          float k = smoothstep(0.1, -1.4, p.z);
          p.x += sin(uTime * 11.0 + aPhase) * 0.35 * k;
          vT = aTint; vX = p.z; vN = normalize(normalMatrix * mat3(instanceMatrix) * normal);
          gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(p, 1.0); }`,
      fragmentShader: `uniform float uTime; varying float vT; varying float vX; varying vec3 vN;
        void main(){ vec3 col = 0.55 + 0.45 * cos(6.2832 * (vT + vX * 0.12 + uTime * 0.12 + vec3(0.0, 0.33, 0.67)));
          float rim = pow(1.0 - abs(vN.z), 2.0);
          gl_FragColor = vec4(col * (0.55 + 1.2 * rim) + vec3(0.2) * rim, 1.0); }`,
      side: DoubleSide, fog: false, toneMapped: false,
    });
    this.fish = new InstancedMesh(fg, this.fishMat, nSchools * per);
    this.fish.frustumCulled = false;
    this.group.add(this.fish);
    for (let k = 0; k < nSchools; k++) this.schools.push({ c: new Vector3(1e9, 0, 0), dir: new Vector3(1, 0, 0), turn: 0, r: 0, n: per, first: k * per, spread: Array.from({ length: per * 3 }, () => Math.random() * 2 - 1) });

    // ---- jellyfish ----
    for (let k = 0; k < (quality === 'high' ? 6 : 3); k++) {
      const mat = new ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uHue: { value: k / 6 } },
        vertexShader: `uniform float uTime; varying vec3 vN; varying float vY; void main(){ vec3 p = position; float pulse = 1.0 + 0.18 * sin(uTime * 3.0) * (1.0 - p.y);
          p.xz *= pulse; vN = normalize(normalMatrix * normal); vY = p.y; gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0); }`,
        fragmentShader: `uniform float uTime, uHue; varying vec3 vN; varying float vY;
          void main(){ vec3 col = 0.55 + 0.45 * cos(6.2832 * (uHue + uTime * 0.08 + vY * 0.3 + vec3(0.0, 0.33, 0.67)));
            float rim = pow(1.0 - abs(vN.z), 2.0); gl_FragColor = vec4(col * (0.4 + 1.6 * rim), 0.25 + 0.6 * rim); }`,
        transparent: true, depthWrite: false, blending: AdditiveBlending, side: DoubleSide, fog: false, toneMapped: false,
      });
      const g = new Group();
      const bell = new Mesh(new SphereGeometry(2.2, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), mat);
      g.add(bell);
      // trailing tentacles: thin glowing ribbons
      for (let j = 0; j < 7; j++) {
        const tg = new PlaneGeometry(0.14, 7, 1, 8); tg.translate(0, -3.5, 0);
        const t = new Mesh(tg, mat);
        const a = (j / 7) * Math.PI * 2;
        t.position.set(Math.cos(a) * 1.4, 0, Math.sin(a) * 1.4); t.rotation.y = -a;
        t.userData.a = a;
        g.add(t);
      }
      g.visible = false;
      this.group.add(g);
      this.jellies.push({ g, mat, p: new Vector3(1e9, 0, 0), v: new Vector3(), phase: Math.random() * 6 });
    }
    scene.add(this.group);
  }

  /** Called every frame with the camera's position and the way it's looking. */
  update(cam: Vector3, look: Vector3, time: number, dt: number) {
    this.surfMat.uniforms.uTime.value = time; (this.surfMat.uniforms.uCam.value as Vector3).copy(cam);
    this.surface.position.set(cam.x, cam.y + 120, cam.z);
    this.rayMat.uniforms.uTime.value = time;
    for (const r of this.rays) {
      const u = r.userData;
      const a = u.ang + time * 0.02;
      r.position.set(cam.x + Math.cos(a) * u.dist + look.x * 50, cam.y + 110, cam.z + Math.sin(a) * u.dist + look.z * 50);
      r.rotation.set(u.tilt * Math.sin(time * 0.1 + u.ang), 0, u.tilt * Math.cos(time * 0.13 + u.ang));
    }
    this.moteMat.uniforms.uTime.value = time; (this.moteMat.uniforms.uCam.value as Vector3).copy(cam);
    this.fishMat.uniforms.uTime.value = time;
    const fwd = this.u.set(look.x, 0, look.z);
    if (fwd.lengthSq() < 1e-6) fwd.set(0, 0, -1);
    fwd.normalize();
    // schools: a centre that cruises on a gentle curve; respawn ahead of you when left behind
    for (const sc of this.schools) {
      const d = sc.c.distanceTo(cam);
      if (d > 240 || !Number.isFinite(d)) {
        const side = Math.random() < 0.5 ? -1 : 1;
        sc.c.copy(cam).addScaledVector(fwd, 90 + Math.random() * 110);
        sc.c.x += -fwd.z * side * (25 + Math.random() * 50); sc.c.z += fwd.x * side * (25 + Math.random() * 50);
        sc.c.y += -6 + Math.random() * 30;
        sc.dir.set(-fwd.z * -side, 0, fwd.x * -side).addScaledVector(fwd, -0.4 + Math.random() * 0.8).normalize();
        sc.turn = (Math.random() - 0.5) * 0.5; sc.r = 4 + Math.random() * 5;
      }
      sc.dir.applyAxisAngle(Y, sc.turn * dt);
      sc.c.addScaledVector(sc.dir, 9 * dt);
      for (let i = 0; i < sc.n; i++) {
        const k = sc.first + i, sp = sc.spread;
        const wob = Math.sin(time * 1.3 + i) * 0.6;
        this.t.set(sp[i * 3] * sc.r + wob, sp[i * 3 + 1] * sc.r * 0.45, sp[i * 3 + 2] * sc.r).add(sc.c);
        this.q.setFromUnitVectors(Z, sc.dir);
        this.s.setScalar(1.4 + 0.4 * Math.abs(sp[i * 3 + 1]));
        this.m4.compose(this.t, this.q, this.s);
        this.fish.setMatrixAt(k, this.m4);
      }
    }
    this.fish.instanceMatrix.needsUpdate = true;
    // jellyfish drift up and along, pulsing
    for (const j of this.jellies) {
      if (j.p.distanceTo(cam) > 200 || !Number.isFinite(j.p.x)) {
        j.p.copy(cam).addScaledVector(fwd, 60 + Math.random() * 120);
        j.p.x += (Math.random() - 0.5) * 120; j.p.z += (Math.random() - 0.5) * 120; j.p.y += 8 + Math.random() * 25;
        j.v.set((Math.random() - 0.5) * 1.5, 0.6 + Math.random() * 0.8, (Math.random() - 0.5) * 1.5);
        j.g.visible = true;
      }
      const thrust = Math.max(0, Math.sin(time * 3 + j.phase)) * 1.6;
      j.p.addScaledVector(j.v, dt * (0.5 + thrust));
      j.g.position.copy(j.p);
      j.mat.uniforms.uTime.value = time + j.phase;
      for (const t of j.g.children) if (t.userData.a !== undefined) t.rotation.x = Math.sin(time * 2 + t.userData.a * 3 + j.phase) * 0.25;
    }
  }

  dispose() {
    this.scene.remove(this.group);
    this.group.traverse((o) => { const m = o as Mesh; if (m.geometry) m.geometry.dispose(); });
  }
}
const Y = new Vector3(0, 1, 0), Z = new Vector3(0, 0, 1);

/** A stylised fish (nose along +z): a tapered body and a forked tail. */
function fishGeometry(): BufferGeometry {
  const pts: number[] = [];
  const tri = (a: number[], b: number[], c: number[]) => pts.push(...a, ...b, ...c);
  // body: a diamond lozenge from nose (z=1) to tail root (z=-1), flattened sideways
  const nose = [0, 0, 1.1], top = [0, 0.38, 0.1], bot = [0, -0.32, 0.1], l = [-0.16, 0, 0.1], r = [0.16, 0, 0.1], root = [0, 0, -0.9];
  for (const [a, b] of [[top, r], [r, bot], [bot, l], [l, top]]) { tri(nose, a, b); tri(root, b, a); }
  // tail fin
  tri([0, 0, -0.85], [0, 0.45, -1.5], [0, 0.05, -1.25]); tri([0, 0, -0.85], [0, -0.05, -1.25], [0, -0.45, -1.5]);
  // a dorsal fin
  tri([0, 0.3, 0.3], [0, 0.6, -0.2], [0, 0.25, -0.35]);
  const g = new BufferGeometry();
  g.setAttribute('position', new BufferAttribute(new Float32Array(pts), 3));
  g.computeVertexNormals();
  return g;
}
void Color;
