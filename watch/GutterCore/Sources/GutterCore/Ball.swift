import Foundation

/// Player input for one physics step.
public struct BallInput {
    public var steer: Double = 0      // -1 left .. +1 right
    public var jump = false           // true for the step the jump was asked for
    public var magnet = false         // held: tractor beam / grip
    public init(steer: Double = 0, jump: Bool = false, magnet: Bool = false) { self.steer = steer; self.jump = jump; self.magnet = magnet }
}

public struct BallTuning {
    public var radius = 1.15, mass = 1.0, gravity = 9.81
    public var steerAccel = 20.0, airSteerAccel = 13.0
    public var jumpSpeed = 8.6, jumpCooldown = 0.55, coyoteTime = 0.12
    public var magnetPressG = 4.2, magnetAccel = 95.0, magnetRange = 60.0
    public var magnetDrain = 0.12, magnetRegen = 0.45
    public var tubeFlowAccel = 22.0, tubeFlowCap = 48.0, cruise = 42.0, tubeSettle = 1.6
    public var airDrag = 0.0006
    // wood-like surface
    public var restitution = 0.3, restitutionThreshold = 2.5
    public var mu = 0.55, rollingResistance = 0.012
    public init() {}
}

/// What the physics did this step: the one source of truth for haptics, sound and visuals.
public enum SensoryEvent: Equatable {
    case airborneStart, airborneEnd(Double), impact(Double, obstacle: Bool)
    case jump, magnetOn, magnetOff, capture, netCatch, seam(Double), tubeEnter, tubeExit
}

public final class BallPhysics {
    public var tune = BallTuning()
    public let track: Track
    public let proj: TrackProjector
    public var p = Vec3.zero, v = Vec3.zero, w = Vec3.zero
    public var q = Quat.identity
    public private(set) var n = Vec3.up
    public private(set) var contact = false
    public private(set) var airborne = false
    public private(set) var airborneTime = 0.0
    public private(set) var sinceContact = 0.0
    public private(set) var magnetActive = false
    public private(set) var magnetEnergy = 1.0
    public private(set) var magnetTarget = Vec3.zero
    public private(set) var magnetHasTarget = false
    public private(set) var netLift = false
    public var events: [SensoryEvent] = []

    private var jumpCooldown = 0.0
    private var seamAcc = 0.0
    private var inTube = false
    private var netTime = 0.0
    private var liftTime = 0.0, liftDur = 1.15, liftVf = 14.0
    private var liftPath: [(s: Double, x: Double, y: Double)] = []

    public init(track: Track) {
        self.track = track
        proj = TrackProjector(track)
        placeAt(s: 6, speed: 0)
    }

    /// Put the ball in the gutter at arc length s, rolling forward at `speed`, `x` metres off centre.
    public func placeAt(s: Double, speed: Double, x: Double = 0) {
        let f = track.frame(at: s)
        p = f.P + f.U * (tune.radius + 0.002) + f.R * x
        v = f.T * speed
        n = f.U
        w = n.cross(v) / tune.radius
        proj.reset(s); proj.project(p)
        contact = true; airborne = false; sinceContact = 0; airborneTime = 0
        netLift = false; netTime = 0
    }

    // MARK: - collision field

    /// Distance to the nearest surface and its outward normal, from the track's local field.
    private func sdfAndNormal() -> (d: Double, n: Vec3) {
        let pr = proj, tr = track
        let s = pr.s, x = pr.x, y = pr.y
        let e = 0.02
        let d = tr.sdfLocal(s, x, y)
        let gx = tr.sdfLocal(s, x + e, y) - tr.sdfLocal(s, x - e, y)
        let gy = tr.sdfLocal(s, x, y + e) - tr.sdfLocal(s, x, y - e)
        let gs = tr.sdfLocal(s + e, x, y) - tr.sdfLocal(s - e, x, y)
        let nrm = (pr.R * gx + pr.U * gy + pr.T * gs).normalized
        return (d, nrm)
    }

    private func emit(_ e: SensoryEvent) { events.append(e) }

    // MARK: - step

    public func step(_ dt: Double, _ input: BallInput) {
        track.time += dt
        let tu = tune, r = tu.radius, m = tu.mass
        proj.project(p)
        let pr = proj
        var acc = Vec3(0, -tu.gravity, 0)

        // steering: along the surface when rolling, a gentler push in the air
        if contact {
            let rt = (pr.R - n * pr.R.dot(n)).normalized
            acc += rt * (input.steer * tu.steerAccel)
        } else {
            acc += pr.R * (input.steer * tu.airSteerAccel)
        }
        // tubes carry you along on an air current; out in the open, speed eases back to a cruise
        let tk = track.tubeAt(pr.s)
        let vf = v.dot(pr.T)
        if tk > 0.3 && vf < tu.tubeFlowCap {
            acc += pr.T * (tu.tubeFlowAccel * min(1, (tu.tubeFlowCap - vf) / 10) * min(1, (tk - 0.3) / 0.5))
        } else if tk <= 0.3 && vf > tu.cruise {
            acc += pr.T * (-(vf - tu.cruise) * 1.2)
        }
        // in a tube, when you're not steering, the current settles you back toward the bottom
        // of the pipe (on the watch: no wild laps round the roof unless you ask for them)
        if tk > 0.7 && abs(input.steer) < 0.3 && !netLift {
            let off = pr.R * (-pr.x) + pr.U * (tu.radius - pr.y)
            let d = off.length
            if d > 0.3 { acc += off.normalized * min(14, d * tu.tubeSettle * 1.6) * (tk - 0.7) / 0.3 }
            // and damps the side-to-side swing a little
            acc -= pr.R * (v.dot(pr.R) * 0.6 * (tk - 0.7) / 0.3)
        }
        acc -= v * (v.length * tu.airDrag)
        let nowTube = tk > 0.7
        if nowTube != inTube { emit(nowTube ? .tubeEnter : .tubeExit); inTube = nowTube }

        // jump: a kick away from the surface
        jumpCooldown -= dt
        if input.jump && jumpCooldown <= 0 && (contact || sinceContact < tu.coyoteTime) && !netLift {
            v += n * tu.jumpSpeed
            jumpCooldown = tu.jumpCooldown
            emit(.jump)
        }

        updateMagnet(&acc, input, dt)
        updateNetCatch(dt)

        v += acc * dt
        p += v * dt
        applyNetLift(dt)

        // ---- collisions ----
        var touched = false
        var impact = 0.0, impactObstacle = false
        for _ in 0..<3 {
            proj.project(p)
            let (d, nrm) = sdfAndNormal()
            let pen = r - d
            if pen <= 0 { if d < r + 0.03 { touched = true; n = nrm }; break }
            p += nrm * pen
            let vn = v.dot(nrm)
            if vn < 0 {
                if -vn > impact { impact = -vn; impactObstacle = isNearObstacle() }
                let e = magnetActive ? 0 : (-vn > tu.restitutionThreshold ? tu.restitution : 0)
                v -= nrm * ((1 + e) * vn)
                friction(nrm, jn: -(1 + e) * vn * m)
            }
            touched = true
            n = nrm
        }
        containBall()
        if touched {
            // rolling resistance
            let sp = v.length
            if sp > 0.05 { v -= v * min(1, tu.rollingResistance * tu.gravity * dt / sp) }
            sinceContact = 0
            // texture: a tick every few metres while rolling (the wood's joints)
            seamAcc += sp * dt
            if seamAcc > 4 { seamAcc = 0; emit(.seam(min(1, sp / 40))) }
        } else {
            sinceContact += dt
        }
        let nowAir = sinceContact > 0.06
        if nowAir && !airborne { airborne = true; emit(.airborneStart) }
        else if !nowAir && airborne { airborne = false; emit(.airborneEnd(min(1, impact / 10))) }
        if impact > 2.5 && !airborne { emit(.impact(min(1, impact / 12), obstacle: impactObstacle)) }
        airborneTime = airborne ? airborneTime + dt : 0
        contact = touched

        // spin the ball's orientation by its angular velocity
        let wl = w.length
        if wl > 1e-6 { q = (Quat(axis: w / wl, angle: wl * dt) * q).normalized }
    }

    private func isNearObstacle() -> Bool {
        for o in track.obstacles where abs(proj.s - o.s) < o.ls + 2 { return true }
        return false
    }

    /// Coulomb friction at the contact: spins the ball up to rolling, or lets it slide.
    private func friction(_ nrm: Vec3, jn: Double) {
        let tu = tune, r = tu.radius, m = tu.mass
        let I = 0.4 * m * r * r
        let rv = nrm * (-r)                      // centre -> contact point
        let vc = v + w.cross(rv)
        let vt = vc - nrm * vc.dot(nrm)
        let vtl = vt.length
        if vtl < 1e-5 { return }
        let jNeed = vtl * m * (2.0 / 7.0)        // impulse that would make it roll
        let j = min(jNeed, tu.mu * max(jn, 0) + 0.02 * m * vtl)
        let J = vt * (-j / vtl)
        v += J / m
        w += rv.cross(J) / I
    }

    /// Hold the magnet: on the track it presses you into the surface (more grip on the
    /// walls); in the air it's a tractor beam pulling you back down into the gutter.
    private func updateMagnet(_ acc: inout Vec3, _ input: BallInput, _ dt: Double) {
        let tu = tune
        let inAir = sinceContact > 0.03
        let active = input.magnet && (inAir || magnetEnergy > 0.02) && !netLift
        if active != magnetActive { emit(active ? .magnetOn : .magnetOff); magnetActive = active }
        magnetHasTarget = false
        if !active { magnetEnergy = min(1, magnetEnergy + tu.magnetRegen * dt); return }
        magnetEnergy = max(0, magnetEnergy - tu.magnetDrain * (inAir ? 1.6 : 1) * dt)
        let pr = proj
        if !inAir {
            acc -= n * (tu.magnetPressG * tu.gravity)
            return
        }
        // aim at the gutter floor below you (a little toward the middle)
        let target = pr.P + pr.R * (max(-3, min(3, pr.x)) * 0.2) + pr.U * tu.radius
        let dv = target - p
        let dist = dv.length
        if dist > tu.magnetRange || dist < 1e-3 { return }
        let dir = dv / dist
        let closing = v.dot(dir)
        if closing > 18 { acc -= dir * ((closing - 18) * 4) }
        else { acc += dir * (tu.magnetAccel * min(1, dist / 3) * (magnetEnergy > 0 ? 1 : 0.65)) }
        magnetTarget = target
        magnetHasTarget = true
    }

    // MARK: - the safety net

    private func updateNetCatch(_ dt: Double) {
        if netLift { return }
        let pr = proj, tr = track
        let inNet = tr.netAt(pr.s) && pr.y < -Net.depth + 3.2 && pr.y < -0.3 && abs(pr.along) < 2
        if inNet && sinceContact < 0.08 {
            // a soft net: it soaks up the bounce and the sideways roll; you keep going forward
            let va = v.dot(pr.T)
            let k = 1 - exp(-7 * dt)
            v = (v - pr.T * va) * (1 - k) + pr.T * va
        }
        if inNet && sinceContact < 0.25 && netTime == 0 { emit(.netCatch); netTime = 1e-6 }
        if netTime > 0 {
            if !inNet && sinceContact > 0.5 { netTime = 0; return }
            netTime += dt
            if netTime > 0.6 { startNetLift() }
        }
    }

    private func startNetLift() {
        let pr = proj, tr = track
        let W = tr.profile.halfWidth, rim = tr.profile.H, r = tune.radius
        let side: Double = pr.x >= 0 ? 1 : -1
        let vf = max(14, min(40, v.dot(pr.T)))
        let s0 = pr.s
        let out = side * max(W + 3.5, abs(pr.x) * 0.8)
        liftPath = [
            (s0, pr.x, pr.y),
            (s0 + vf * 0.25, out, pr.y + 2),
            (s0 + vf * 0.55, side * (W + 3), rim + 3.2),
            (s0 + vf * 0.85, side * 1.5, rim + 1.6),
            (min(tr.length - 2, s0 + vf * 1.15), 0, r + 0.05),
        ]
        liftVf = vf; liftTime = 0; netLift = true
        emit(.magnetOn)
    }

    private func liftPoint(_ t: Double) -> Vec3 {
        let qp = liftPath, nseg = qp.count - 1
        let f = max(0, min(0.9999, t)) * Double(nseg)
        let i = Int(f), u = f - Double(i)
        func at(_ k: Int) -> (s: Double, x: Double, y: Double) { qp[max(0, min(nseg, k))] }
        func cr(_ p0: Double, _ p1: Double, _ p2: Double, _ p3: Double) -> Double {
            0.5 * (2 * p1 + (-p0 + p2) * u + (2 * p0 - 5 * p1 + 4 * p2 - p3) * u * u + (-p0 + 3 * p1 - 3 * p2 + p3) * u * u * u)
        }
        let a = at(i - 1), b = at(i), c = at(i + 1), d = at(i + 2)
        let s = cr(a.s, b.s, c.s, d.s), x = cr(a.x, b.x, c.x, d.x), y = cr(a.y, b.y, c.y, d.y)
        let fr = track.frame(at: s)
        return fr.P + fr.R * x + fr.U * y
    }

    private func applyNetLift(_ dt: Double) {
        guard netLift, let last = liftPath.last else { return }
        liftTime += dt
        let t = liftTime / liftDur
        let np = liftPoint(t)
        v = (np - p) / max(dt, 1e-4)
        p = np
        let lf = track.frame(at: last.s)
        magnetTarget = lf.P + lf.R * last.x + lf.U * last.y
        magnetHasTarget = true
        if t >= 1 {
            v = lf.T * liftVf - lf.U * 1
            netLift = false; netTime = 0
            emit(.capture)
        }
    }

    /// THE LID (as in the phone game): the ball can rise at most about a ball's height
    /// above the walls, and never past them sideways (pipes hold you anyway).
    public static let lidOver = 1.6
    private func containBall() {
        if netLift { return }
        proj.project(p)
        let tr = track, pr = proj
        if abs(pr.along) > 3 || pr.s < 0 || pr.s > tr.length || tr.tubeAt(pr.s) > 0.5 { return }
        let prof = tr.profile, W = prof.halfWidth
        let cap = prof.H + BallPhysics.lidOver
        var moved = false
        if pr.y > cap {
            p += pr.U * (cap - pr.y)
            let vu = v.dot(pr.U)
            if vu > 0 { v -= pr.U * vu }
            moved = true
        }
        let xMax = W - tune.radius
        if pr.y > prof.rc * 0.5 && abs(pr.x) > xMax {
            let sgn: Double = pr.x > 0 ? 1 : -1
            p += pr.R * (sgn * xMax - pr.x)
            let vx = v.dot(pr.R)
            if vx * sgn > 0 { v -= pr.R * vx }
            moved = true
        }
        if moved { proj.project(p) }
    }
}
