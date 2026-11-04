import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, LineBasicMaterial, LineSegments, Vector3 } from 'three';
import type { Track } from '../track/track';

/**
 * "Mist" streaks inside tubes: glowing particles hanging in the pipe that
 * you rush through, stretched into lines by your speed. They fill the whole
 * field of view with motion (the vection effect that makes dome theatres and
 * flight rides feel like flying), and fade out when the pipe opens up.
 */
export class TubeStreaks {
  readonly mesh: LineSegments;
  private n = 220;
  private sRel: Float32Array; private ang: Float32Array; private rad: Float32Array;
  private pos: Float32Array; private col: Float32Array;
  private P = new Vector3(); private T = new Vector3(); private U = new Vector3(); private R = new Vector3();
  private level = 0;
  private hue = 0;
  private colA = new Color(0xffffff); private colB = new Color(0xffffff); private psy = 1;
  /** The world's palette: streaks glow in its colours, cycling only as far as the world's psy. */
  setPalette(a: number, b: number, psy: number) { this.colA.set(a); this.colB.set(b); this.psy = psy; }

  constructor() {
    this.sRel = new Float32Array(this.n); this.ang = new Float32Array(this.n); this.rad = new Float32Array(this.n);
    for (let i = 0; i < this.n; i++) this.respawn(i, Math.random() * 90 - 10);
    this.pos = new Float32Array(this.n * 6);
    this.col = new Float32Array(this.n * 6);
    const g = new BufferGeometry();
    g.setAttribute('position', new BufferAttribute(this.pos, 3));
    g.setAttribute('color', new BufferAttribute(this.col, 3));
    this.mesh = new LineSegments(g, new LineBasicMaterial({ vertexColors: true, transparent: true, blending: AdditiveBlending, depthWrite: false, opacity: 0 }));
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 3;
  }

  private respawn(i: number, s: number) {
    this.sRel[i] = s;
    this.ang[i] = Math.random() * Math.PI * 2;
    this.rad[i] = 1.6 + Math.pow(Math.random(), 0.6) * 4.2;
  }

  update(track: Track, ballS: number, speed: number, dt: number, time: number, strength: number) {
    const tk = Math.max(track.tubeAt(ballS), track.tubeAt(ballS + 25) * 0.8);
    this.level += ((tk > 0.3 ? Math.min(1, (speed - 8) / 30) : 0) * strength - this.level) * Math.min(1, dt * 3);
    const mat = this.mesh.material as LineBasicMaterial;
    mat.opacity = this.level * 0.9;
    this.mesh.visible = this.level > 0.01;
    if (!this.mesh.visible) return;
    this.hue = (time * 0.12) % 1;
    const H = track.profile.H;
    const len = Math.min(9, 0.6 + speed * 0.11);
    const c = new Color();
    for (let i = 0; i < this.n; i++) {
      this.sRel[i] -= speed * dt;
      if (this.sRel[i] < -8) this.respawn(i, 70 + Math.random() * 20);
      const s0 = ballS + this.sRel[i];
      track.frameAtS(s0, this.P, this.T, this.U, this.R);
      const x = Math.cos(this.ang[i]) * this.rad[i], y = H + Math.sin(this.ang[i]) * this.rad[i] * 0.95;
      const ax = this.P.x + this.R.x * x + this.U.x * y, ay = this.P.y + this.R.y * x + this.U.y * y, az = this.P.z + this.R.z * x + this.U.z * y;
      const k = i * 6;
      this.pos[k] = ax; this.pos[k + 1] = ay; this.pos[k + 2] = az;
      this.pos[k + 3] = ax + this.T.x * len; this.pos[k + 4] = ay + this.T.y * len; this.pos[k + 5] = az + this.T.z * len;
      // fade in from the far end, out right next to the camera
      const fade = Math.max(0, Math.min(1, (90 - this.sRel[i]) / 30)) * Math.max(0, Math.min(1, (this.sRel[i] + 8) / 6));
      c.copy(this.colA).lerp(this.colB, (i % 7) / 6);
      if (this.psy > 0) { const hsl = { h: 0, s: 0, l: 0 }; c.getHSL(hsl); c.setHSL((hsl.h + (this.hue + i * 0.013) * this.psy) % 1, Math.max(0.6, hsl.s), Math.min(0.7, Math.max(0.5, hsl.l))); }
      c.multiplyScalar(fade);
      this.col[k] = c.r; this.col[k + 1] = c.g; this.col[k + 2] = c.b;
      this.col[k + 3] = c.r * 0.15; this.col[k + 4] = c.g * 0.15; this.col[k + 5] = c.b * 0.15;
    }
    this.mesh.geometry.attributes.position.needsUpdate = true;
    this.mesh.geometry.attributes.color.needsUpdate = true;
  }
}
