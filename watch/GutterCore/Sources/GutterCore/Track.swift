import Foundation

/// One piece of course. Angles in degrees; every angle is eased with
/// smootherstep across its segment, so curvature and bank change smoothly.
public struct Segment {
    public var len: Double
    public var yaw: Double = 0        // total heading change (+ = left)
    public var pitch: Double? = nil   // pitch at the end (- = downhill)
    public var bank: Double? = nil    // bank at the end (+ = tilt toward the left)
    public var loop = false           // a full vertical loop through the segment
    public var tube = false           // the walls curl over into a full pipe
    public var gap = false            // no gutter here: jump it (the safety net is below)
    public var openSky = false        // containment stops above the rim (fly zone)
    public init(_ len: Double, yaw: Double = 0, pitch: Double? = nil, bank: Double? = nil,
                loop: Bool = false, tube: Bool = false, gap: Bool = false, openSky: Bool = false) {
        self.len = len; self.yaw = yaw; self.pitch = pitch; self.bank = bank
        self.loop = loop; self.tube = tube; self.gap = gap; self.openSky = openSky
    }
}

/// A block in the gutter: at arc length s, lateral centre x, gently drifting side to side.
public struct Obstacle {
    public var s: Double, x: Double, w: Double, h: Double, ls: Double
    public var amp: Double = 0.35, period: Double = 9, phase: Double = 0
    public init(s: Double, x: Double, w: Double = 1.6, h: Double = 1.6, ls: Double = 1.6, amp: Double = 0.35, period: Double = 9, phase: Double = 0) {
        self.s = s; self.x = x; self.w = w; self.h = h; self.ls = ls; self.amp = amp; self.period = period; self.phase = phase
    }
}

/// The safety net: a wide soft net under the gutter (in its local frame).
public enum Net {
    public static let half = 24.0, depth = 9.0, curve = 0.005, lip = 2.5
}

/// A gutter built by turtle integration of eased heading/pitch/bank.
/// Local frame per sample: T forward, U floor normal ("up"), R right.
public final class Track {
    public let ds = 0.5
    public let n: Int
    public let length: Double
    public let profile = GutterProfile()
    public private(set) var P: [Vec3], T: [Vec3], U: [Vec3], R: [Vec3]
    public private(set) var tubeK: [Double]
    public private(set) var gap: [Bool], openSky: [Bool]
    public private(set) var netOn: [Bool]
    public let obstacles: [Obstacle]
    /// Simulation clock for the drifting obstacles.
    public var time = 0.0

    public init(segments: [Segment], obstacles: [Obstacle] = [], start: Vec3 = .zero) {
        let total = segments.reduce(0) { $0 + $1.len }
        n = Int(total / ds) + 1
        length = Double(n - 1) * ds
        P = Array(repeating: .zero, count: n); T = P; U = P; R = P
        tubeK = Array(repeating: 0, count: n)
        gap = Array(repeating: false, count: n); openSky = gap; netOn = gap
        self.obstacles = obstacles
        build(segments, start: start)
        // the walls curl closed gradually: a +-12 m box filter, then eased
        let src = tubeK, win = 24
        for i in 0..<n {
            var a = 0.0, w = 0.0
            for j in (i - win)...(i + win) { a += src[max(0, min(n - 1, j))]; w += 1 }
            let k = a / w
            tubeK[i] = k < 0.002 ? 0 : k > 0.998 ? 1 : k * k * (3 - 2 * k)
        }
        placeNet()
    }

    private func build(_ segments: [Segment], start: Vec3) {
        func ss(_ x: Double) -> Double { x * x * x * (x * (x * 6 - 15) + 10) }
        var pos = start
        var yaw = 0.0, pitch = 0.0, bank = 0.0
        var t = Vec3(0, 0, -1), u = Vec3.up, r = Vec3(1, 0, 0)
        func orient(_ yw: Double, _ pt: Double, _ bk: Double) {
            let d = Double.pi / 180
            let q = Quat(axis: Vec3(0, 1, 0), angle: yw * d) * Quat(axis: Vec3(1, 0, 0), angle: pt * d) * Quat(axis: Vec3(0, 0, 1), angle: bk * d)
            t = q.rotate(Vec3(0, 0, -1)); u = q.rotate(Vec3(0, 1, 0)); r = q.rotate(Vec3(1, 0, 0))
        }
        func write(_ k: Int, _ seg: Segment?) {
            P[k] = pos; T[k] = t; U[k] = u; R[k] = r
            tubeK[k] = seg?.tube == true ? 1 : 0
            gap[k] = seg?.gap ?? false
            openSky[k] = seg?.openSky ?? false
        }
        orient(0, 0, 0)
        write(0, segments.first)
        var i = 1
        for seg in segments {
            let y0 = yaw, p0 = pitch, b0 = bank
            let p1 = seg.pitch ?? pitch, b1 = seg.bank ?? bank
            let loopAdd = seg.loop ? 360.0 : 0
            let steps = Int((seg.len / ds).rounded())
            var k = 1
            while k <= steps && i < n {
                let uu = Double(k) / Double(steps), um = (Double(k) - 0.5) / Double(steps)
                orient(y0 + seg.yaw * ss(um), p0 + (p1 - p0 + loopAdd) * ss(um), b0 + (b1 - b0) * ss(um))
                pos += t * ds
                orient(y0 + seg.yaw * ss(uu), p0 + (p1 - p0 + loopAdd) * ss(uu), b0 + (b1 - b0) * ss(uu))
                write(i, seg)
                i += 1; k += 1
            }
            yaw = y0 + seg.yaw; pitch = p1; bank = b1
        }
        while i < n { pos += t * ds; write(i, nil); tubeK[i] = tubeK[i - 1]; i += 1 }
    }

    // MARK: - lookups

    public func idx(_ s: Double) -> Int { max(0, min(n - 1, Int((s / ds).rounded()))) }

    /// Interpolated frame at arc length s.
    public func frame(at s: Double) -> (P: Vec3, T: Vec3, U: Vec3, R: Vec3) {
        let f = max(0, min(Double(n) - 1.0001, s / ds))
        let i = Int(f), a = f - Double(i)
        return (P[i].lerp(P[i + 1], a), T[i].lerp(T[i + 1], a).normalized, U[i].lerp(U[i + 1], a).normalized, R[i].lerp(R[i + 1], a).normalized)
    }
    public func tubeAt(_ s: Double) -> Double {
        let f = max(0, min(Double(n) - 1.0001, s / ds))
        let i = Int(f), a = f - Double(i)
        return tubeK[i] + (tubeK[i + 1] - tubeK[i]) * a
    }
    public func isGap(_ s: Double) -> Bool { gap[idx(s)] }
    public func isSteepOrInverted(_ s: Double) -> Bool { U[idx(s)].y < 0.85 }
    public func obstacleX(_ o: Obstacle) -> Double { o.x + o.amp * sin(2 * Double.pi * time / o.period + o.phase) }
    public func channelDepthLocal(_ s: Double, _ x: Double, _ y: Double) -> Double { channelDepth(x, y, profile, curl: tubeAt(s)) }

    /// Signed distance (local coordinates) to the gutter, obstacles and safety net. Positive = free space.
    public func sdfLocal(_ s: Double, _ x: Double, _ y: Double, includeNet: Bool = true) -> Double {
        var d = 1e6
        if s >= -2 && s <= length + 2 {
            let i = idx(s)
            if !gap[i] {
                d = shellSDF(x, y, profile, curl: tubeAt(s), openSky: openSky[i])
            } else {
                // over a gap: no floor, but the invisible side walls carry on
                let W = profile.halfWidth
                d = max(abs(x) - (W + profile.th), W - abs(x))
            }
        }
        // end walls: you can't roll backwards off the start or out past the finish
        let W0 = profile.halfWidth + 0.8
        if s < 0.5 { d = min(d, max(s - 0.5, -s - 2, abs(x) - W0, y - 4)) }
        if s > length - 0.5 { d = min(d, max(length - 0.5 - s, s - length - 2, abs(x) - W0, y - 4)) }
        for o in obstacles {
            let dsA = s - o.s
            if abs(dsA) > o.ls + 2 { continue }
            d = min(d, boxSDF(dsA, x - obstacleX(o), y - o.h / 2, o.ls / 2, o.w / 2, o.h / 2, 0.06))
        }
        if includeNet && s >= 0 && s <= length && netOn[idx(s)] {
            let ax = abs(x)
            if ax <= Net.half {
                let yN = netSurface(x)
                let slope = 2 * Net.curve * ax + (ax > Net.half - 3 ? 2 * Net.lip * (ax - (Net.half - 3)) / 9 : 0)
                d = min(d, abs(y - yN) / (1 + slope * slope).squareRoot() - 0.2)
            } else {
                d = min(d, hypot(ax - Net.half, y - netSurface(Net.half)) - 0.2)
            }
        }
        return d
    }

    /// Height (local y) of the safety net's surface at lateral x.
    public func netSurface(_ x: Double) -> Double {
        let ax = min(abs(x), Net.half)
        let edge = max(0, ax - (Net.half - 3)) / 3
        return -Net.depth + Net.curve * ax * ax + Net.lip * edge * edge
    }
    public func netAt(_ s: Double) -> Bool { netOn[idx(s)] }

    /// The net goes under every fairly level, gently curving stretch that has
    /// no other part of the course passing through the space below.
    private func placeNet() {
        var ok = Array(repeating: false, count: n)
        for i in 0..<n {
            if U[i].y < 0.85 { continue }
            let j0 = max(0, i - 8), j1 = min(n - 1, i + 8)
            let kappa = (T[j1] - T[j0]).length / (Double(j1 - j0) * ds)
            if kappa > 1 / (Net.half + 12) { continue }
            ok[i] = true
        }
        // the course passing through the net's space elsewhere (coarse check)
        var i = 0
        while i < n {
            if ok[i] {
                var hit = false
                var j = 0
                while j < n && !hit {
                    if abs(j - i) * Int(ds * 100) > 6000 {
                        let dv = P[j] - P[i]
                        let al = dv.dot(T[i]), lx = dv.dot(R[i]), ly = dv.dot(U[i])
                        if abs(al) < 14 && abs(lx) < Net.half + 6 && ly < 3 && ly > -Net.depth - 8 { hit = true }
                    }
                    j += 6
                }
                if hit { for k in max(0, i - 24)..<min(n, i + 24) { ok[k] = false } }
            }
            i += 4
        }
        // only runs of 40 m or more, pulled in 6 m at each end
        var st = -1
        for k in 0...n {
            let v = k < n && ok[k]
            if v && st < 0 { st = k }
            if !v && st >= 0 {
                let a = st + 12, b = k - 1 - 12
                if Double(b - a) * ds >= 40 { for q in a...b { netOn[q] = true } }
                st = -1
            }
        }
    }
}

/// Rounded box SDF (half extents hx, hy, hz, rounding r), axes (along, x, y).
public func boxSDF(_ px: Double, _ py: Double, _ pz: Double, _ hx: Double, _ hy: Double, _ hz: Double, _ r: Double) -> Double {
    let qx = abs(px) - hx + r, qy = abs(py) - hy + r, qz = abs(pz) - hz + r
    let outside = (max(qx, 0) * max(qx, 0) + max(qy, 0) * max(qy, 0) + max(qz, 0) * max(qz, 0)).squareRoot()
    return outside + min(max(qx, max(qy, qz)), 0) - r
}

/// Projects world points onto a track: arc length s, lateral x, height y, and along (off the ends).
public final class TrackProjector {
    public let track: Track
    public var hint = 0
    public private(set) var s = 0.0, x = 0.0, y = 0.0, along = 0.0
    public private(set) var P = Vec3.zero, T = Vec3(0, 0, -1), U = Vec3.up, R = Vec3(1, 0, 0)
    public init(_ track: Track) { self.track = track }

    public func reset(_ s: Double) { hint = Int((s / track.ds).rounded()) }

    public func project(_ p: Vec3) {
        let tr = track
        func alongAt(_ i: Int) -> Double { (p - tr.P[i]).dot(tr.T[i]) }
        var i = max(0, min(tr.n - 2, hint))
        var guardN = 0
        while i > 0 && alongAt(i) < 0 && guardN < 400 { i -= 1; guardN += 1 }
        guardN = 0
        while i < tr.n - 2 && alongAt(i + 1) > 0 && guardN < 400 { i += 1; guardN += 1 }
        let a0 = alongAt(i), a1 = alongAt(i + 1)
        var f = a0 - a1 != 0 ? a0 / (a0 - a1) : 0
        if i == 0 && a0 < 0 { f = a0 / tr.ds }
        if i == tr.n - 2 && a1 > 0 { f = 1 + a1 / tr.ds }
        let fc = max(0, min(1, f))
        hint = i
        s = (Double(i) + f) * tr.ds
        let fr = tr.frame(at: (Double(i) + fc) * tr.ds)
        P = fr.P; T = fr.T; U = fr.U; R = fr.R
        let c = p - P
        along = c.dot(T); x = c.dot(R); y = c.dot(U)
    }
}
