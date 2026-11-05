import { AdditiveBlending, Group, Mesh, MeshBasicMaterial, SphereGeometry, Vector3 } from 'three';

/** The ghost of a previous run: a see-through glowing ball with a soft halo. */
export class GhostView {
  readonly group = new Group();
  private core: MeshBasicMaterial;
  private halo: MeshBasicMaterial;
  constructor(radius: number) {
    this.core = new MeshBasicMaterial({ color: 0xbfe8ff, transparent: true, opacity: 0.35, blending: AdditiveBlending, depthWrite: false, fog: false, toneMapped: false });
    this.halo = new MeshBasicMaterial({ color: 0x5fb8ff, transparent: true, opacity: 0.12, blending: AdditiveBlending, depthWrite: false, fog: false, toneMapped: false });
    this.group.add(new Mesh(new SphereGeometry(radius, 24, 16), this.core));
    this.group.add(new Mesh(new SphereGeometry(radius * 1.6, 16, 12), this.halo));
    this.group.visible = false;
    this.group.renderOrder = 3;
  }
  update(p: Vector3 | null, time: number, camPos: Vector3) {
    if (!p) { this.group.visible = false; return; }
    this.group.visible = true;
    this.group.position.copy(p);
    // fades out when it's right on top of you (so it never hides your own ball)
    const near = Math.min(1, Math.max(0, (camPos.distanceTo(p) - 4) / 6));
    this.core.opacity = (0.26 + 0.08 * Math.sin(time * 6)) * near;
    this.halo.opacity = 0.12 * near;
  }
}
