import Foundation

/// Gutter cross-section: a broad "U" (flat floor of half-width `a`, fillets of
/// radius `rc` into vertical walls of height `H`, shell thickness `th`, and a
/// small rounded bead `lip` at the wall tops). Local 2-D coordinates:
/// x = lateral (right +), y = height above the floor centre.
/// Physics never collides with triangles: it uses this analytic signed
/// distance, so the surface is perfectly smooth for a fast ball.
public struct GutterProfile {
    public var a = 2.8, rc = 3.6, H = 6.6, th = 0.32, lip = 0.45
    public init() {}
    public var halfWidth: Double { a + rc }
}

/// Containment walls continue this far above the rim (except in open-sky sections).
public let containAboveRim = 2.6

/// Signed distance to the inner gutter curve (walls extended upward). Positive = inside the channel.
public func innerSignedDistance(_ x: Double, _ y: Double, _ p: GutterProfile) -> Double {
    let ax = abs(x), W = p.a + p.rc
    var d: Double = ax <= p.a ? abs(y) : hypot(ax - p.a, y)
    let vx = ax - p.a, vy = y - p.rc
    if vx >= 0 && vy <= 0 { d = min(d, abs(hypot(vx, vy) - p.rc)) }
    else { d = min(d, hypot(ax - p.a, y), hypot(ax - W, y - p.rc)) }
    if y >= p.rc { d = min(d, abs(ax - W)) } else { d = min(d, hypot(ax - W, y - p.rc)) }
    let inside: Bool
    if ax <= p.a { inside = y > 0 }
    else if ax < W { inside = y >= p.rc || hypot(ax - p.a, y - p.rc) < p.rc }
    else { inside = false }
    return inside ? d : -d
}

/// Signed distance to the solid shell (positive = outside material).
/// `curl` 0..1 closes the walls over into a full pipe; `openSky` stops the
/// invisible containment walls just above the rim (you can fly off there).
public func shellSDF(_ x: Double, _ y: Double, _ p: GutterProfile, curl: Double, openSky: Bool, visibleOnly: Bool = false) -> Double {
    let din = innerSignedDistance(x, y, p)
    var sdf = max(din, -din - p.th)
    if visibleOnly { sdf = max(sdf, y - p.H) }
    else if openSky { sdf = max(sdf, y - (p.H + containAboveRim)) }
    let W = p.a + p.rc
    let phiMax = curl * Double.pi / 2
    if curl > 0 {
        // TUBE: above the walls they curl inward along a circle of radius W centred at (0, H)
        let ax = abs(x), dy = y - p.H
        let r = hypot(ax, dy), phi = atan2(dy, ax)
        var arcD: Double
        if phi >= 0 && phi <= phiMax { arcD = max(W - r, r - (W + p.th)) }
        else {
            func cap(_ a: Double) -> Double {
                let c = cos(a), sn = sin(a)
                let t = max(W, min(W + p.th, ax * c + dy * sn))
                return hypot(ax - c * t, dy - sn * t)
            }
            arcD = min(cap(0), cap(phiMax))
        }
        sdf = min(sdf, arcD)
    }
    // the rounded bead at the top of each wall (at the end of the curl while closing)
    let lipLen = p.lip * (1 - curl)
    if p.lip > 0 && lipLen > 0.01 {
        let ax0 = abs(x), dy0 = y - p.H
        let c = cos(phiMax), sn = sin(phiMax)
        let u = ax0 * c + dy0 * sn, v = -ax0 * sn + dy0 * c
        let cx = W - lipLen / 2 + p.th / 2
        let rb = min(0.14, p.th / 2 - 0.01)
        let qx = abs(u - cx) - (lipLen / 2 + p.th / 2) + rb
        let qy = abs(v - p.th / 2) - p.th / 2 + rb
        let lipD = hypot(max(qx, 0), max(qy, 0)) + min(max(qx, qy), 0) - rb
        sdf = min(sdf, lipD)
    }
    return sdf
}

/// How deep a point is inside the open channel (> 0 = inside). In a full tube, "inside" is the pipe.
public func channelDepth(_ x: Double, _ y: Double, _ p: GutterProfile, curl: Double) -> Double {
    let d = innerSignedDistance(x, y, p)
    if curl >= 0.999 && y > p.H { return min(d, p.a + p.rc - hypot(x, y - p.H)) }
    return d
}

/// Inner surface ring for the mesh (left lip -> right lip) with inward normals.
/// Always the same point count, so rings at different curls stitch into one mesh.
public func profileRing(_ p: GutterProfile, curl: Double, arcSteps: Int = 8, curlSteps: Int = 10) -> [(x: Double, y: Double, nx: Double, ny: Double)] {
    let W = p.a + p.rc
    let phiMax = curl * Double.pi / 2
    var right: [(x: Double, y: Double, nx: Double, ny: Double)] = []
    right.append((0, 0, 0, 1))
    right.append((p.a, 0, 0, 1))
    for i in 1..<arcSteps {
        let t = -Double.pi / 2 + Double(i) / Double(arcSteps) * (Double.pi / 2)
        let c = cos(t), s = sin(t)
        right.append((p.a + p.rc * c, p.rc + p.rc * s, -c, -s))
    }
    right.append((W, p.rc, -1, 0))
    right.append((W, p.H, -1, 0))
    for j in 1...curlSteps {
        let f = phiMax * Double(j) / Double(curlSteps)
        let c = cos(f), s = sin(f)
        right.append((W * c, p.H + W * s, -c, -s))
    }
    // left half mirrored (lip -> centre), then the right half (centre -> lip)
    var ring: [(x: Double, y: Double, nx: Double, ny: Double)] = []
    for q in right.reversed() where !(q.x == 0 && q.y == 0) { ring.append((-q.x, q.y, -q.nx, q.ny)) }
    ring.append(contentsOf: right)
    return ring
}
