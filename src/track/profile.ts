/**
 * Gutter cross-section geometry.
 *
 * The gutter is a broad "U": a flat floor of half-width `a`, quarter-circle
 * fillets of radius `rc` that blend into vertical side walls, walls rising to
 * height `H` above the floor, and a solid shell of thickness `th`.
 *
 * Local 2-D coordinates: x = lateral (right positive), y = height above the
 * floor centre. The interior (where the ball lives) is "inside".
 *
 * Physics never collides against triangles — it evaluates this analytic
 * signed-distance function, so the surface is perfectly smooth with no seams
 * or triangle edges for a fast ball to snag on.
 */
export interface GutterProfile {
  a: number;   // flat floor half-width
  rc: number;  // fillet radius
  H: number;   // wall height above floor
  th: number;  // shell thickness
  lip: number; // inward-curling rim at the wall tops (keeps the ball in the gutter)
}

export const DEFAULT_PROFILE: GutterProfile = { a: 2.8, rc: 3.6, H: 6.6, th: 0.32, lip: 1.4 };

export const CONTAIN_ABOVE_RIM = 2.6;

export function halfWidth(p: GutterProfile): number {
  return p.a + p.rc;
}

/**
 * Signed distance to the inner gutter curve (floor + fillets + walls extended
 * to infinity). Positive = inside the open channel.
 */
export function innerSignedDistance(x: number, y: number, p: GutterProfile): number {
  const ax = Math.abs(x);
  const W = p.a + p.rc;
  // Distance to floor segment [(-a,0),(a,0)]
  let d: number;
  if (ax <= p.a) d = Math.abs(y);
  else d = Math.hypot(ax - p.a, y);
  // Distance to fillet arc: centre (a, rc), radius rc, angles [-90deg, 0]
  {
    const vx = ax - p.a;
    const vy = y - p.rc;
    if (vx >= 0 && vy <= 0) {
      d = Math.min(d, Math.abs(Math.hypot(vx, vy) - p.rc));
    } else {
      // closest endpoint
      d = Math.min(d, Math.hypot(ax - p.a, y), Math.hypot(ax - W, y - p.rc));
    }
  }
  // Distance to wall x = W, y >= rc
  if (y >= p.rc) d = Math.min(d, Math.abs(ax - W));
  else d = Math.min(d, Math.hypot(ax - W, y - p.rc));

  // Inside test
  let inside: boolean;
  if (ax <= p.a) inside = y > 0;
  else if (ax < W) inside = y >= p.rc || Math.hypot(ax - p.a, y - p.rc) < p.rc;
  else inside = false;
  return inside ? d : -d;
}

/**
 * Signed distance to the solid gutter shell (positive = outside material).
 * `closed` adds a roof (tunnel sections) at the wall tops.
 */
export function shellSDF(x: number, y: number, p: GutterProfile, closed = false, visibleOnly = false, openSky = false, curl = 0): number {
  const din = innerSignedDistance(x, y, p);
  let sdf = Math.max(din, -din - p.th);
  // Collision walls continue invisibly above the rim ("containment field"), so
  // the ball can never be thrown out of the gutter; only gaps can be fallen
  // into. `visibleOnly` gives the real surface (for the magnet and visuals).
  // In 'open sky' sections they stop a few metres above the rim: a big double
  // jump can fly off course there, and only the tractor beam saves you.
  if (visibleOnly) sdf = Math.max(sdf, y - p.H);
  else if (openSky) sdf = Math.max(sdf, y - (p.H + CONTAIN_ABOVE_RIM));
  const W = p.a + p.rc;
  const phiMax = curl * Math.PI / 2;
  if (curl > 0) {
    // TUBE: above the wall tops the walls curl inward along a circle of radius
    // W centred at (0, H). At curl = 1 both sides meet overhead and the gutter
    // becomes a closed pipe you can roll all the way around inside.
    const ax = Math.abs(x), dy = y - p.H;
    const r = Math.hypot(ax, dy);
    const phi = Math.atan2(dy, ax);
    let arcD: number;
    if (phi >= 0 && phi <= phiMax) arcD = Math.max(W - r, r - (W + p.th));
    else {
      const cap = (a: number) => {
        const c = Math.cos(a), sn = Math.sin(a);
        const t = Math.max(W, Math.min(W + p.th, ax * c + dy * sn));
        return Math.hypot(ax - c * t, dy - sn * t);
      };
      arcD = Math.min(cap(0), cap(phiMax));
    }
    sdf = Math.min(sdf, arcD);
  }
  const lipLen = p.lip * (1 - curl);
  if (p.lip > 0) {
    // Rolled lip: a flange overhanging the channel at the top of each wall
    // (at the end of the curl when the walls are curling into a tube).
    const ax0 = Math.abs(x), dy0 = y - p.H;
    const c = Math.cos(phiMax), sn = Math.sin(phiMax);
    const u = ax0 * c + dy0 * sn, v = -ax0 * sn + dy0 * c;
    const cx = W - lipLen / 2 + p.th / 2;
    const qx = Math.abs(u - cx) - (lipLen / 2 + p.th / 2);
    const qy = Math.abs(v - p.th / 2) - p.th / 2;
    const lipD = Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0);
    sdf = Math.min(sdf, lipD);
  }
  if (closed) {
    const Wr = W + p.th;
    const roof = Math.max(p.H - y, Math.abs(x) - Wr, y - (p.H + p.th * 2.5));
    sdf = Math.min(sdf, roof);
  }
  return sdf;
}

/** Sample the inner profile as a polyline for mesh generation (left wall top -> right wall top). */
export function profilePolyline(p: GutterProfile, arcSteps = 10): Array<[number, number]> {
  const pts: Array<[number, number]> = [];
  const W = p.a + p.rc;
  // Lip underside (left), then left wall top down to fillet
  if (p.lip > 0) pts.push([-W + p.lip, p.H]);
  pts.push([-W, p.H]);
  pts.push([-W, p.rc]);
  for (let i = 1; i < arcSteps; i++) {
    const t = Math.PI + (i / arcSteps) * (Math.PI / 2); // 180 -> 270 deg around (-a, rc)
    pts.push([-p.a + p.rc * Math.cos(t), p.rc + p.rc * Math.sin(t)]);
  }
  pts.push([-p.a, 0]);
  pts.push([0, 0]);
  pts.push([p.a, 0]);
  for (let i = 1; i < arcSteps; i++) {
    const t = -Math.PI / 2 + (i / arcSteps) * (Math.PI / 2); // -90 -> 0 around (a, rc)
    pts.push([p.a + p.rc * Math.cos(t), p.rc + p.rc * Math.sin(t)]);
  }
  pts.push([W, p.rc]);
  pts.push([W, p.H]);
  if (p.lip > 0) pts.push([W - p.lip, p.H]);
  return pts;
}

/**
 * How deep a point is inside the open channel (metres; > 0 = inside).
 * For a fully curled tube "inside" is the closed pipe; otherwise it is the
 * column between the walls (the invisible containment walls rise above them).
 */
export function channelDepth(x: number, y: number, p: GutterProfile, curl = 0): number {
  const d = innerSignedDistance(x, y, p);
  if (curl >= 0.999 && y > p.H) return Math.min(d, p.a + p.rc - Math.hypot(x, y - p.H));
  return d;
}

/** Height of the inside of the roof of a full tube above the floor. */
export function tubeTop(p: GutterProfile): number { return p.H + p.a + p.rc; }

/**
 * Inner surface ring for mesh generation at a given curl, with inward normals.
 * Always returns the same number of points (left lip -> right lip), so rings
 * at different curls can be stitched into one mesh as the gutter closes.
 */
export function profileRing(p: GutterProfile, curl: number, arcSteps = 12, curlSteps = 14): { pts: Array<[number, number]>; nrm: Array<[number, number]> } {
  const W = p.a + p.rc;
  const phiMax = curl * Math.PI / 2;
  const lipLen = p.lip * (1 - curl);
  const right: Array<[number, number, number, number]> = []; // x, y, nx, ny (right half, floor centre -> lip)
  right.push([0, 0, 0, 1]);
  right.push([p.a, 0, 0, 1]);
  for (let i = 1; i < arcSteps; i++) {
    const t = -Math.PI / 2 + (i / arcSteps) * (Math.PI / 2);
    const c = Math.cos(t), s = Math.sin(t);
    right.push([p.a + p.rc * c, p.rc + p.rc * s, -c, -s]);
  }
  right.push([W, p.rc, -1, 0]);
  right.push([W, p.H, -1, 0]);
  for (let j = 1; j <= curlSteps; j++) {
    const f = phiMax * (j / curlSteps);
    const c = Math.cos(f), s = Math.sin(f);
    right.push([W * c, p.H + W * s, -c, -s]);
  }
  {
    const c = Math.cos(phiMax), s = Math.sin(phiMax);
    right.push([W * c - c * lipLen, p.H + W * s - s * lipLen, s, -c]);
  }
  const pts: Array<[number, number]> = [], nrm: Array<[number, number]> = [];
  for (let i = right.length - 1; i >= 1; i--) { const q = right[i]; pts.push([-q[0], q[1]]); nrm.push([-q[2], q[3]]); }
  for (const q of right) { pts.push([q[0], q[1]]); nrm.push([q[2], q[3]]); }
  return { pts, nrm };
}
