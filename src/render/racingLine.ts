import { AdditiveBlending, BufferAttribute, BufferGeometry, Mesh, ShaderMaterial, Vector3 } from 'three';

/** One point of a line: where, how fast, and whether the ball is in the air there. */
export interface LinePoint { p: Vector3; speed: number; air: boolean }

/**
 * A glowing ribbon through 3-D points that always faces the camera (so it
 * reads as a clean line from any angle, in tubes and loops too). Coloured by
 * speed, cyan when slow, through magenta, to gold at top speed, and
 * brighter where the ball is in the air. Used for Auto Ball's racing line
 * ahead and the trail behind.
 */
export class Ribbon {
  readonly mesh: Mesh;
  private geo = new BufferGeometry();
  private pos: Float32Array; private dir: Float32Array; private side: Float32Array; private col: Float32Array;
  private mat: ShaderMaterial;

  constructor(private max: number, width: number) {
    const n = max * 2;
    this.pos = new Float32Array(n * 3); this.dir = new Float32Array(n * 3);
    this.side = new Float32Array(n); this.col = new Float32Array(n * 4);
    for (let i = 0; i < max; i++) { this.side[i * 2] = -1; this.side[i * 2 + 1] = 1; }
    const idx: number[] = [];
    for (let i = 0; i < max - 1; i++) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
    this.geo.setIndex(idx);
    this.geo.setAttribute('position', new BufferAttribute(this.pos, 3));
    this.geo.setAttribute('dir', new BufferAttribute(this.dir, 3));
    this.geo.setAttribute('side', new BufferAttribute(this.side, 1));
    this.geo.setAttribute('color', new BufferAttribute(this.col, 4));
    this.geo.setDrawRange(0, 0);
    this.mat = new ShaderMaterial({
      uniforms: { uWidth: { value: width }, uTime: { value: 0 } },
      vertexShader: `attribute vec3 dir; attribute float side; attribute vec4 color; uniform float uWidth;
        varying vec4 vColor; varying float vSide;
        void main(){
          vec3 toCam = normalize(cameraPosition - position);
          vec3 s = cross(dir, toCam);
          float l = length(s);
          s = l > 1e-4 ? s / l : vec3(1.0, 0.0, 0.0);
          vec3 p = position + s * side * uWidth * (0.7 + 0.6 * color.a);
          vColor = color; vSide = side;
          gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
        }`,
      fragmentShader: `varying vec4 vColor; varying float vSide;
        void main(){
          float e = 1.0 - abs(vSide);
          gl_FragColor = vec4(vColor.rgb * (0.55 + 0.9 * e * e), vColor.a * smoothstep(0.0, 0.7, e));
        }`,
      transparent: true, blending: AdditiveBlending, depthWrite: false,
    });
    this.mesh = new Mesh(this.geo, this.mat);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 4;
  }

  /** Speed (m/s) to colour: cyan -> magenta -> gold. */
  private static color(speed: number, air: boolean, out: number[]) {
    const t = Math.max(0, Math.min(1, (speed - 15) / 45));
    let r: number, g: number, b: number;
    if (t < 0.5) { const k = t / 0.5; r = 0.2 + 0.8 * k; g = 0.9 - 0.6 * k; b = 1.0 - 0.1 * k; }
    else { const k = (t - 0.5) / 0.5; r = 1.0; g = 0.3 + 0.55 * k; b = 0.9 - 0.6 * k; }
    if (air) { r = r * 0.6 + 0.4; g = g * 0.6 + 0.4; b = b * 0.6 + 0.4; }
    out[0] = r; out[1] = g; out[2] = b;
  }

  /**
   * Draw the points from `start`. `fade` sets how the brightness runs along
   * the line: 'ahead' fades out toward the far end, 'behind' fades out toward the tail.
   */
  set(points: LinePoint[], start: number, fade: 'ahead' | 'behind', strength = 1) {
    const n = Math.min(this.max, points.length - start);
    if (n < 2) { this.geo.setDrawRange(0, 0); return; }
    const c = [0, 0, 0];
    const d = new Vector3();
    for (let i = 0; i < n; i++) {
      const pt = points[start + i];
      const nx = points[start + Math.min(n - 1, i + 1)].p, pv = points[start + Math.max(0, i - 1)].p;
      d.subVectors(nx, pv);
      if (d.lengthSq() < 1e-8) d.set(0, 0, -1);
      d.normalize();
      Ribbon.color(pt.speed, pt.air, c);
      const f = i / (n - 1);
      const a = (fade === 'ahead' ? Math.min(1, f * 6) * (1 - f) ** 0.7 : f ** 1.5) * strength * (pt.air ? 1 : 0.8);
      for (let k = 0; k < 2; k++) {
        const v = (i * 2 + k);
        this.pos[v * 3] = pt.p.x; this.pos[v * 3 + 1] = pt.p.y; this.pos[v * 3 + 2] = pt.p.z;
        this.dir[v * 3] = d.x; this.dir[v * 3 + 1] = d.y; this.dir[v * 3 + 2] = d.z;
        this.col[v * 4] = c[0]; this.col[v * 4 + 1] = c[1]; this.col[v * 4 + 2] = c[2]; this.col[v * 4 + 3] = a;
      }
    }
    for (const name of ['position', 'dir', 'color']) (this.geo.getAttribute(name) as BufferAttribute).needsUpdate = true;
    this.geo.setDrawRange(0, (n - 1) * 6);
  }

  hide() { this.geo.setDrawRange(0, 0); }
  dispose() { this.geo.dispose(); this.mat.dispose(); }
}
