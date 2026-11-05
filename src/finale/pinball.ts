import {
  AdditiveBlending, BoxGeometry, CanvasTexture, Color, CylinderGeometry, Group, InstancedMesh, Matrix4, Mesh, MeshBasicMaterial,
  MeshStandardMaterial, Object3D, PerspectiveCamera, PlaneGeometry, Quaternion, Scene, SRGBColorSpace, TorusGeometry, Vector3,
} from 'three';
import type { BallPhysics } from '../physics/ball';
import type { Course } from '../track/track';
import type { AudioEngine } from '../audio/audioEngine';
import { PinballSim, PIN, type Seg } from './pinballSim';

/**
 * PINBALL INTRO: every race starts on a little pinball table parked just
 * behind the start of the course. Swipe up to fire the plunger, keep the ball
 * alive with the flippers (PUSH buttons, tilt or arrow keys), and shoot it into
 * the glowing cave at the top: the cave drops you onto the course and the race
 * begins. A drained ball comes back to the plunger; after a couple of drains a
 * tractor beam helps it in. Skippable at any time.
 */
const TILT = (8 * Math.PI) / 180;

export class PinballIntro {
  readonly sim: PinballSim;
  readonly group = new Group();
  private table = new Group();
  private O = new Vector3(); private Xr = new Vector3(); private D = new Vector3(); private Nn = new Vector3();
  private flipperMeshes: Group[] = [];
  private bumperCaps: MeshStandardMaterial[] = [];
  private plunger!: Group;
  private caveGlow!: MeshBasicMaterial;
  private camPos = new Vector3(); private camLook = new Vector3();
  private camInit = false;
  private t = 0;
  private tmp = new Vector3(); private tmp2 = new Vector3();
  done = false;
  /** On-screen PUSH buttons (the game also reads tilt / arrow keys). */
  buttons = { left: false, right: false };

  constructor(private scene: Scene, course: Course, private ball: BallPhysics, private audio: AudioEngine, accent: number) {
    this.sim = new PinballSim(ball.tune.radius);
    // ---- place the table behind the start, its cave lined up with the gutter ----
    const tr = course.main;
    const P0 = new Vector3(), T0 = new Vector3(), U0 = new Vector3(), R0 = new Vector3();
    tr.frameAtS(0, P0, T0, U0, R0);
    const Zf = new Vector3(T0.x, 0, T0.z).normalize();
    const Up = new Vector3(0, 1, 0);
    this.Xr.crossVectors(Zf, Up).normalize();
    this.D.copy(Zf).multiplyScalar(Math.cos(TILT)).addScaledVector(Up, Math.sin(TILT));
    this.Nn.crossVectors(this.Xr, this.D).normalize();
    const place = (lift: number) => this.O.copy(P0).addScaledVector(Zf, -14).addScaledVector(Up, 2.5 + lift)
      .addScaledVector(this.Xr, -PIN.caveU).addScaledVector(this.D, -PIN.caveW);
    // never park it inside another part of the course: lift it clear if needed
    let lift = 0;
    for (let tries = 0; tries < 4; tries++) {
      place(lift);
      if (!this.blocked(course)) break;
      lift += 22;
    }
    // ---- build it ----
    const m = new Matrix4().makeBasis(this.Xr, this.Nn, this.D.clone().negate());
    this.table.quaternion.setFromRotationMatrix(m);
    this.table.position.copy(this.O);
    this.group.add(this.table);
    this.build(accent);
    scene.add(this.group);
    // the table reads crisp and saturated, never washed out by the world's fog
    this.group.traverse((o) => { const mm = (o as Mesh).material as any; if (mm && 'fog' in mm) mm.fog = false; });
    this.digGround();
    this.syncBall(1 / 60);
  }

  /** Is any other part of the course passing through where the table would sit? */
  private blocked(course: Course): boolean {
    const P = new Vector3(), T = new Vector3(), U = new Vector3(), R = new Vector3();
    for (const t of course.all) {
      for (let s = t === course.main ? 40 : 0; s < t.length; s += 6) {
        t.frameAtS(s, P, T, U, R);
        const d = P.sub(this.O);
        const u = d.dot(this.Xr), w = d.dot(this.D), h = d.dot(this.Nn);
        if (Math.abs(u) < 18 && w > -14 && w < PIN.L + 8 && h > -14 && h < 16) return true;
      }
    }
    return false;
  }

  /** Table coordinates (u, w, height above the playfield) to world. */
  private world(u: number, w: number, h: number, out: Vector3) {
    return out.copy(this.O).addScaledVector(this.Xr, u).addScaledVector(this.D, w).addScaledVector(this.Nn, h);
  }

  private build(accent: number) {
    const tb = this.table;
    const L = (o: Object3D, u: number, h: number, w: number) => { o.position.set(u, h, -w); tb.add(o); return o; };
    // playfield
    const field = new Mesh(new PlaneGeometry(PIN.W + 1, PIN.L + 7), new MeshStandardMaterial({ map: fieldTexture(accent), emissiveMap: fieldTexture(accent), emissive: new Color(0xffffff), emissiveIntensity: 0.3, roughness: 0.28, metalness: 0.35 }));
    field.rotation.x = -Math.PI / 2;
    L(field, 0, 0, (PIN.L - 6) / 2);
    // cabinet: a deep body under the playfield, and legs
    const cab = new MeshStandardMaterial({ color: 0x15121c, roughness: 0.6, metalness: 0.3 });
    const trim = new MeshStandardMaterial({ color: new Color(accent), emissive: new Color(accent), emissiveIntensity: 0.6, roughness: 0.4 });
    L(new Mesh(new BoxGeometry(PIN.W + 2.4, 3.2, PIN.L + 8), cab), 0, -1.75, (PIN.L - 6) / 2);
    for (const sx of [-1, 1]) {
      L(new Mesh(new BoxGeometry(0.5, 0.35, PIN.L + 8), trim), sx * (PIN.W / 2 + 1.0), 0.6, (PIN.L - 6) / 2);
      for (const sw of [-4, PIN.L - 2]) {
        const leg = new Mesh(new CylinderGeometry(0.45, 0.6, 16, 10), cab);
        L(leg, sx * (PIN.W / 2 - 0.5), -11, sw);
      }
    }
    // chrome rails along every wall
    const chrome = new MeshStandardMaterial({ color: 0xe8e8f0, roughness: 0.18, metalness: 1 });
    const rail = (s: Seg, mat = chrome, hgt = 1.5) => {
      const ex = s.bx - s.ax, ey = s.by - s.ay, len = Math.hypot(ex, ey);
      const mesh = new Mesh(new BoxGeometry(len + 0.3, hgt, 0.32), mat);
      mesh.rotation.y = Math.atan2(ey, ex);
      L(mesh, (s.ax + s.bx) / 2, hgt / 2, (s.ay + s.by) / 2);
    };
    for (const s of this.sim.walls) rail(s);
    rail(this.sim.gate, new MeshStandardMaterial({ color: 0xff3355, emissive: new Color(0xff3355), emissiveIntensity: 0.8 }), 0.6);
    // pop bumpers
    for (const b of this.sim.bumpers) {
      const body = new Mesh(new CylinderGeometry(PIN.bumperR, PIN.bumperR * 1.05, 1.3, 24), new MeshStandardMaterial({ color: 0xf2f2f2, roughness: 0.3, metalness: 0.4 }));
      L(body, b.u, 0.65, b.w);
      const capMat = new MeshStandardMaterial({ color: new Color(accent), emissive: new Color(accent), emissiveIntensity: 0.5, roughness: 0.3 });
      const cap = new Mesh(new CylinderGeometry(PIN.bumperR * 0.95, PIN.bumperR * 0.95, 0.35, 24), capMat);
      L(cap, b.u, 1.45, b.w);
      const ring = new Mesh(new TorusGeometry(PIN.bumperR + 0.2, 0.16, 8, 32), chrome);
      ring.rotation.x = Math.PI / 2;
      L(ring, b.u, 0.25, b.w);
      this.bumperCaps.push(capMat);
    }
    // flippers
    const flipMat = new MeshStandardMaterial({ color: 0xffffff, roughness: 0.3, metalness: 0.1 });
    const rubber = new MeshStandardMaterial({ color: 0xff2a4a, roughness: 0.6 });
    for (const f of this.sim.flippers) {
      const g = new Group();
      const body = new Mesh(new BoxGeometry(PIN.flipLen, 0.9, PIN.flipR * 1.6), flipMat);
      body.position.x = PIN.flipLen / 2; g.add(body);
      const band = new Mesh(new BoxGeometry(PIN.flipLen, 0.5, PIN.flipR * 1.9), rubber);
      band.position.x = PIN.flipLen / 2; g.add(band);
      for (const [x, rr] of [[0, PIN.flipR * 1.25], [PIN.flipLen, PIN.flipR * 0.8]] as const) {
        const end = new Mesh(new CylinderGeometry(rr, rr, 0.9, 16), flipMat); end.position.x = x; g.add(end);
      }
      L(g, f.pu, 0.5, f.pw);
      this.flipperMeshes.push(g);
    }
    // plunger
    this.plunger = new Group();
    const rod = new Mesh(new CylinderGeometry(0.35, 0.35, 3.2, 12), chrome); rod.rotation.x = Math.PI / 2; rod.position.z = 1.6; this.plunger.add(rod);
    const knob = new Mesh(new CylinderGeometry(0.75, 0.75, 0.6, 16), new MeshStandardMaterial({ color: 0xff2a4a, roughness: 0.4 })); knob.rotation.x = Math.PI / 2; knob.position.z = 3.3; this.plunger.add(knob);
    const laneU = (PIN.laneX + PIN.W / 2) / 2;
    L(this.plunger, laneU, 0.8, -0.6);
    // the cave: a glowing arch over a dark tunnel mouth
    const cu = PIN.caveU, cw = PIN.caveW, ch = PIN.caveHalf + 0.6;
    const rock = new MeshStandardMaterial({ color: 0x2c2633, roughness: 0.9 });
    L(new Mesh(new BoxGeometry(ch * 2 + 1.2, 3.2, PIN.caveDepth + 0.4), rock), cu, 1.6, cw + PIN.caveDepth / 2 + 0.6);
    const mouth = new Mesh(new PlaneGeometry(ch * 2 - 0.2, 2.9), new MeshBasicMaterial({ color: 0x000000 }));
    L(mouth, cu, 1.45, cw + 0.38);
    this.caveGlow = new MeshBasicMaterial({ color: 0x40f0ff, transparent: true, opacity: 0.9, blending: AdditiveBlending, depthWrite: false, toneMapped: false });
    const arch = new Mesh(new TorusGeometry(ch, 0.32, 10, 28, Math.PI), this.caveGlow);
    L(arch, cu, 0.1, cw + 0.3);
    const sign = new Mesh(new PlaneGeometry(6.4, 1.6), new MeshBasicMaterial({ map: signTexture(), transparent: true, toneMapped: false }));
    sign.rotation.x = -0.45;
    L(sign, cu, 4.6, cw + 1.2);
  }

  /** The table hangs over the ground behind the start: dig a hollow under it, clear the trees. */
  private digGround() {
    const centre = this.world(0, PIN.L / 2 - 4, 0, new Vector3());
    const floorY = this.world(0, -8, -18, new Vector3()).y;
    const R0 = 38, R1 = 70;
    const m4 = new Matrix4(), pos = new Vector3(), q = new Quaternion(), sc = new Vector3();
    this.scene.traverse((o) => {
      const mesh = o as Mesh;
      if (mesh.name === 'terrain' && mesh.geometry) {
        const p = mesh.geometry.attributes.position;
        let changed = false;
        for (let i = 0; i < p.count; i++) {
          const d = Math.hypot(p.getX(i) - centre.x, p.getZ(i) - centre.z);
          if (d > R1) continue;
          const k = d < R0 ? 1 : 1 - (d - R0) / (R1 - R0);
          const y = p.getY(i);
          if (y > floorY) { p.setY(i, y + (floorY - y) * k * k * (3 - 2 * k)); changed = true; }
        }
        if (changed) { p.needsUpdate = true; mesh.geometry.computeVertexNormals(); }
      } else if ((o as InstancedMesh).isInstancedMesh) {
        const im = o as InstancedMesh;
        if (im.parent?.name !== 'scenery') return;
        let changed = false;
        for (let i = 0; i < im.count; i++) {
          im.getMatrixAt(i, m4); m4.decompose(pos, q, sc);
          if (Math.hypot(pos.x - centre.x, pos.z - centre.z) < R1 && pos.y > floorY - 5) { m4.compose(pos, q, sc.set(0, 0, 0)); im.setMatrixAt(i, m4); changed = true; }
        }
        if (changed) im.instanceMatrix.needsUpdate = true;
      }
    });
  }

  get phase() { return this.sim.phase; }
  fire() { if (this.sim.phase === 'plunger') this.sim.fire(); }

  update(dt: number, steer: number) {
    this.t += dt;
    const fl = this.buttons.left || steer < -0.35, fr = this.buttons.right || steer > 0.35;
    this.sim.step(dt, fl, fr);
    for (const e of this.sim.events) {
      if (e.type === 'bumper') this.audio.pop(false);
      else if (e.type === 'flipper') this.audio.clack2(0.5);
      else if (e.type === 'wall') this.audio.clink(e.strength * 0.7);
      else if (e.type === 'plunger') this.audio.whoosh(0.7);
      else if (e.type === 'cave') { this.audio.whoosh(1); this.audio.chime(784, 0.2); this.audio.chime(1175, 0.15); }
      else if (e.type === 'drain') this.audio.chime(220, 0.15);
    }
    // visuals
    this.sim.flippers.forEach((f, k) => { this.flipperMeshes[k].rotation.y = f.side < 0 ? f.a : Math.PI - f.a; });
    this.sim.bumpers.forEach((b, k) => { this.bumperCaps[k].emissiveIntensity = 0.5 + 3 * b.flash; });
    this.plunger.position.z = 0.6 + this.sim.pull * 1.4;
    this.caveGlow.opacity = 0.6 + 0.4 * Math.sin(this.t * 6) * (this.sim.assist ? 1.5 : 1);
    this.syncBall(dt);
    this.updateCamera(dt);
    if (this.sim.phase === 'done') this.done = true;
  }

  /** Put the game's ball where the table has it, rolling. */
  private syncBall(dt: number) {
    const b = this.ball, s = this.sim;
    this.world(s.u, s.w, s.r, b.p);
    b.v.copy(this.Xr).multiplyScalar(s.vu).addScaledVector(this.D, s.vw);
    b.n.copy(this.Nn);
    b.w.copy(this.Nn).cross(b.v).multiplyScalar(1 / s.r);
    b.contact = s.phase !== 'cave'; b.airborne = false; b.magnetActive = false; b.boosting = false;
    void dt;
  }

  private updateCamera(dt: number) {
    const s = this.sim;
    const C = (-PIN.W / 2 + PIN.laneX) / 2;
    // the player's view from the end of the table; it leans up the table with the ball
    const lookW = 14 + Math.max(0, Math.min(1, (s.w - 6) / 28)) * 10;
    // centred between the playfield and the plunger lane so both are in view
    this.world(0.6, -19, 21, this.tmp);
    this.world(0.4 + (s.u - C) * 0.12, lookW, 0, this.tmp2);
    if (s.phase === 'cave') {
      // dive into the cave after the ball
      const k = Math.min(1, s.caveT / 0.45);
      const e = k * k * (3 - 2 * k);
      this.tmp.lerp(this.world(PIN.caveU, PIN.caveW - 4, 2.2, new Vector3()), e);
      this.tmp2.lerp(this.world(PIN.caveU, PIN.caveW + 6, 1.4, new Vector3()), e);
    }
    if (!this.camInit) { this.camPos.copy(this.tmp); this.camLook.copy(this.tmp2); this.camInit = true; }
    const k = 1 - Math.exp(-dt * (s.phase === 'cave' ? 14 : 4));
    this.camPos.lerp(this.tmp, k); this.camLook.lerp(this.tmp2, k);
  }

  applyCamera(cam: PerspectiveCamera) {
    cam.position.copy(this.camPos);
    cam.up.set(0, 1, 0);
    cam.lookAt(this.camLook);
    const fov = cam.aspect < 0.8 ? 70 : 56;
    if (Math.abs(cam.fov - fov) > 0.1) { cam.fov += (fov - cam.fov) * 0.15; cam.updateProjectionMatrix(); }
  }

  dispose() {
    this.scene.remove(this.group);
    this.group.traverse((o) => { const m = o as Mesh; if (m.geometry) m.geometry.dispose(); });
  }
}

/** The playfield art: a dark field, neon lanes up to the cave, bumper halos, the title. */
function fieldTexture(accent: number) {
  const cv = document.createElement('canvas');
  cv.width = 512; cv.height = 1088;
  const c = cv.getContext('2d')!;
  const W = PIN.W + 1, H = PIN.L + 7;
  const X = (u: number) => ((u + W / 2) / W) * cv.width;
  const Y = (w: number) => cv.height - ((w + 6.5) / H) * cv.height;
  const acc = '#' + new Color(accent).getHexString();
  const g = c.createLinearGradient(0, 0, 0, cv.height);
  g.addColorStop(0, '#1a1030'); g.addColorStop(1, '#070a18');
  c.fillStyle = g; c.fillRect(0, 0, cv.width, cv.height);
  // star field
  for (let i = 0; i < 260; i++) { c.fillStyle = `rgba(255,255,255,${0.15 + Math.random() * 0.5})`; c.fillRect(Math.random() * cv.width, Math.random() * cv.height, 1.5, 1.5); }
  // lane arrows up the middle to the cave
  c.fillStyle = acc;
  for (let k = 0; k < 5; k++) {
    const w = 12 + k * 3.6, u = PIN.caveU;
    c.globalAlpha = 0.35 + k * 0.13;
    c.beginPath(); c.moveTo(X(u), Y(w + 1.6)); c.lineTo(X(u + 1.6), Y(w)); c.lineTo(X(u + 0.9), Y(w)); c.lineTo(X(u), Y(w + 0.9)); c.lineTo(X(u - 0.9), Y(w)); c.lineTo(X(u - 1.6), Y(w)); c.closePath(); c.fill();
  }
  c.globalAlpha = 1;
  // bumper halos
  c.strokeStyle = acc; c.lineWidth = 4;
  for (const [u, w] of [[-6.6, 22], [3.2, 23.5], [-5, 30.5]]) { c.beginPath(); c.arc(X(u), Y(w), (2.4 / W) * cv.width, 0, Math.PI * 2); c.stroke(); }
  // title
  c.save(); c.translate(X(-1.4), Y(9.5));
  c.fillStyle = '#ffffff'; c.font = 'bold 50px system-ui, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
  c.shadowColor = acc; c.shadowBlur = 18; c.fillText('GUTTERBALL', 0, 0);
  c.restore();
  // plunger lane stripes
  c.fillStyle = 'rgba(255,60,90,0.35)';
  for (let w = 2; w < 26; w += 3) c.fillRect(X(PIN.laneX + 0.6), Y(w + 1), X(PIN.W / 2 - 0.6) - X(PIN.laneX + 0.6), 6);
  const t = new CanvasTexture(cv);
  t.colorSpace = SRGBColorSpace;
  return t;
}

function signTexture() {
  const cv = document.createElement('canvas');
  cv.width = 512; cv.height = 128;
  const c = cv.getContext('2d')!;
  c.fillStyle = 'rgba(0,0,0,0.55)'; c.fillRect(0, 0, 512, 128);
  c.strokeStyle = '#40f0ff'; c.lineWidth = 6; c.strokeRect(6, 6, 500, 116);
  c.fillStyle = '#ffffff'; c.font = 'bold 54px system-ui, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
  c.shadowColor = '#40f0ff'; c.shadowBlur = 20; c.fillText('▲ SHOOT THE CAVE ▲', 256, 66, 480);
  const t = new CanvasTexture(cv);
  t.colorSpace = SRGBColorSpace;
  return t;
}
