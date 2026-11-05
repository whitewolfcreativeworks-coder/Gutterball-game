import Foundation

/// Launch speed (m/s) for a plunger pull 0..1: a tap sends you off at 10, a full pull at 36.
public func launchSpeed(_ pull: Double) -> Double { 10 + 26 * pow(max(0, min(1, pull)), 0.9) }

/// One run down the course: the plunger, the race, the finish.
public final class Run {
    public enum Phase { case plunger, running, finished }
    public let track: Track
    public let ball: BallPhysics
    public let fixedDt = 1.0 / 120.0
    public private(set) var phase: Phase = .plunger
    public private(set) var time = 0.0
    public private(set) var falls = 0
    public private(set) var finishTime = 0.0
    /// How far the plunger is pulled back (0..1).
    public private(set) var pull = 0.0
    public static let pullLength = 3.0
    public let startS = 6.0
    /// Events since the caller last cleared them (ball events plus run events).
    public var events: [SensoryEvent] = []
    public var onFinish: (() -> Void)?
    public var onFall: (() -> Void)?

    private var acc = 0.0
    private var lastGood: (s: Double, v: Double) = (6, 0)
    private var underTimer = 0.0, stuckTimer = 0.0
    private var pendingJump = false

    public init(track: Track) {
        self.track = track
        ball = BallPhysics(track: track)
        reset()
    }

    public func reset() {
        phase = .plunger; time = 0; falls = 0; finishTime = 0; pull = 0; acc = 0
        track.time = 0
        ball.placeAt(s: startS, speed: 0)
        lastGood = (startS, 0)
        events.removeAll()
    }

    /// Turn the crown: pull the plunger back (the ball comes back with it).
    public func setPull(_ p: Double) {
        guard phase == .plunger else { return }
        pull = max(0, min(1, p))
        ball.placeAt(s: startS - pull * Run.pullLength, speed: 0)
    }

    /// Let go: away down the gutter, and the clock starts.
    public func fire() {
        guard phase == .plunger else { return }
        let sp = launchSpeed(pull)
        ball.placeAt(s: startS, speed: sp)
        phase = .running
        time = 0
    }

    /// Advance real time `dt` (fixed 120 Hz physics steps inside).
    public func update(_ dt: Double, _ input: BallInput) {
        if input.jump { pendingJump = true }
        guard phase == .running else { return }
        acc += min(dt, 0.1)
        while acc >= fixedDt {
            acc -= fixedDt
            var inp = input
            inp.jump = pendingJump
            pendingJump = false
            ball.step(fixedDt, inp)
            time += fixedDt
            events.append(contentsOf: ball.events)
            ball.events.removeAll()
            check()
            if phase != .running { break }
        }
    }

    private func check() {
        let b = ball, pr = b.proj, tr = track
        if pr.s > tr.length - 40 {
            phase = .finished; finishTime = time
            onFinish?()
            return
        }
        if b.contact && tr.channelDepthLocal(pr.s, pr.x, pr.y) > 0.3 && !tr.isGap(pr.s) && abs(pr.along) < 3 {
            lastGood = (pr.s, b.v.length)
        }
        if !(b.p.isFinite && b.v.isFinite) { fail(); return }
        // a safety net below you (or its beam carrying you) catches you: not a fall
        let netted = b.netLift || (tr.netAt(pr.s) && abs(pr.x) < Net.half + 3 && pr.y > -Net.depth - 3 && abs(pr.along) < 3)
        if netted { underTimer = 0; stuckTimer = 0; return }
        let inside = tr.channelDepthLocal(pr.s, pr.x, pr.y) > -0.3
        let under = !inside && (pr.y < -2.5 || (pr.y < -0.8 && !tr.isGap(pr.s)))
        underTimer = under ? underTimer + fixedDt : 0
        let lost = pr.y < -30 || abs(pr.x) > 60 || abs(pr.along) > 60 || b.airborneTime > 10
        if underTimer > 0.4 || lost { fail(); return }
        stuckTimer = b.v.length < 0.6 ? stuckTimer + fixedDt : 0
        if stuckTimer > 2 { fail() }
    }

    /// Quick reset: straight back into the middle of the gutter where you were, going fast.
    private func fail() {
        falls += 1
        underTimer = 0; stuckTimer = 0
        var s = lastGood.s
        while s < track.length - 50 && (track.isGap(s) || track.isSteepOrInverted(s)) { s += 5 }
        ball.placeAt(s: s, speed: max(20, min(45, lastGood.v)))
        onFall?()
    }

    /// 0..1 along the course.
    public var progress: Double { max(0, min(1, ball.proj.s / (track.length - 40))) }
}

/// A simple driver (for tests and the demo): stays in the middle and slaloms round the blocks.
public struct Autopilot {
    public init() {}
    public func decide(_ b: BallPhysics) -> BallInput {
        let pr = b.proj, tr = b.track
        var target = 0.0
        for o in tr.obstacles {
            let ds = o.s - pr.s
            if ds > -1 && ds < 40 {
                let ox = tr.obstacleX(o)
                if abs(ox) < o.w / 2 + 2 { target = ox > 0 ? -3.2 : 3.2 } else if abs(target) < 0.1 { target = 0 }
                break
            }
        }
        let vLat = b.v.dot(pr.R)
        let steer = max(-1, min(1, (target - pr.x) * 0.35 - vLat * 0.15))
        let magnet = !b.contact && (b.airborneTime > 0.8 || pr.y < -1)
        return BallInput(steer: steer, jump: false, magnet: magnet)
    }
}
