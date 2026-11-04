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

export const DEFAULT_PROFILE: GutterProfile = { a: 2.0, rc: 3.0, H: 5.2, th: 0.3, lip: 1.2 };

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
export function shellSDF(x: number, y: number, p: GutterProfile, closed = false, visibleOnly = false, openSky = false): number {
  const din = innerSignedDistance(x, y, p);
  let sdf = Math.max(din, -din - p.th);
  // Collision walls continue invisibly above the rim ("containment field"), so
  // the ball can never be thrown out of the gutter; only gaps can be fallen
  // into. `visibleOnly` gives the real surface (for the magnet and visuals).
  // In 'open sky' sections they stop a few metres above the rim: a big double
  // jump can fly off course there, and only the tractor beam saves you.
  if (visibleOnly) sdf = Math.max(sdf, y - p.H);
  else if (openSky) sdf = Math.max(sdf, y - (p.H + CONTAIN_ABOVE_RIM));
  if (p.lip > 0) {
    // Rolled lip: a slab overhanging the channel at the top of each wall
    const W = p.a + p.rc;
    const cx = W - p.lip / 2 + p.th / 2;
    const qx = Math.abs(Math.abs(x) - cx) - (p.lip / 2 + p.th / 2);
    const qy = Math.abs(y - (p.H + p.th / 2)) - p.th / 2;
    const lipD = Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0);
    sdf = Math.min(sdf, lipD);
  }
  if (closed) {
    const W = p.a + p.rc + p.th;
    const roof = Math.max(p.H - y, Math.abs(x) - W, y - (p.H + p.th * 2.5));
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
