import SwiftUI
import SceneKit
import WatchKit
import GutterCore

/// What the HUD shows (published ~10 times a second).
struct Hud: Equatable {
    var phase: Run.Phase = .plunger
    var time = 0.0
    var speedKmh = 0.0
    var progress = 0.0
    var pull = 0.0
    var energy = 1.0
    var falls = 0
    var finishTime = 0.0
    var best = 0.0
    var newBest = false
}

/// Runs the game: physics at 120 Hz on SceneKit's render loop, wrist and
/// crown input, the chase camera, and haptics.
final class GameController: NSObject, ObservableObject, SCNSceneRendererDelegate {
    let run: Run
    let built: BuiltScene
    var scene: SCNScene { built.scene }
    var cameraNode: SCNNode { built.camera }

    @Published var hud = Hud()
    /// The Digital Crown, bound in the view: turning it pulls the plunger back.
    @Published var crown: Double = 0 { didSet { setPull(crown) } }

    private let motion = WristMotion()
    private let haptics = Haptics()
    private let lock = NSLock()
    private var touchJump = false, touchMagnet = false
    private var lastTime: TimeInterval = 0
    private var hudTimer = 0.0
    private var camPos = Vec3.zero, camLook = Vec3.zero, camUp = Vec3.up
    private var camInit = false
    private var lastNotch = 0
    /// Launched with -autoplay (simulator demos and screenshots): pulls, fires and drives itself.
    let autoplay = ProcessInfo.processInfo.arguments.contains("-autoplay")
    private var clock = 0.0
    private let pilot = Autopilot()

    override init() {
        let track = WatchCourse.build()
        run = Run(track: track)
        built = SceneBuilder.build(track: track)
        super.init()
        hud.best = UserDefaults.standard.double(forKey: "best")
        run.onFinish = { [weak self] in self?.finished() }
        run.onFall = { [weak self] in DispatchQueue.main.async { self?.haptics.play(.failure, priority: 2) } }
        placePlunger()
        updateCamera(1, snap: true)
    }

    func start() { motion.start() }
    func stop() { motion.stop() }

    // MARK: input (main thread)

    private func setPull(_ v: Double) {
        lock.lock(); defer { lock.unlock() }
        guard run.phase == .plunger else { return }
        run.setPull(v)
        // a ratchet click per notch (the crown's own detents add their feel too)
        let notch = Int(v * 12)
        if notch > lastNotch { haptics.play(.click) }
        lastNotch = notch
    }

    /// A tap: fire the plunger / jump / run again.
    func tap() {
        lock.lock(); defer { lock.unlock() }
        switch run.phase {
        case .plunger:
            if run.pull < 0.04 { run.setPull(0.6) }            // a tap with no pull: a decent shot anyway
            motion.calibrate()
            run.fire()
            haptics.play(.start, priority: 2)
        case .running: touchJump = true
        case .finished:
            run.reset(); lastNotch = 0
            DispatchQueue.main.async { self.crown = 0 }
            camInit = false
        }
    }
    /// Touch and hold: the tractor beam (a backup for lifting your hand).
    func setHold(_ on: Bool) { lock.lock(); touchMagnet = on; lock.unlock() }

    // MARK: the loop (SceneKit's render thread)

    func renderer(_ renderer: SCNSceneRenderer, updateAtTime time: TimeInterval) {
        let dt = lastTime == 0 ? 1.0 / 60 : min(0.05, time - lastTime)
        lastTime = time
        clock += dt
        lock.lock()
        if autoplay && run.phase == .plunger {
            // demo: wind the plunger back, then let it go
            if clock > 0.8 { run.setPull(min(0.85, (clock - 0.8) * 0.8)) }
            if clock > 2.2 {
                run.fire()
                // -at <metres> [-speed <m/s>]: start further down the course (screenshots of a tube, the gap, the net)
                let args = ProcessInfo.processInfo.arguments
                if let i = args.firstIndex(of: "-at"), i + 1 < args.count, let at = Double(args[i + 1]) {
                    var sp = 26.0
                    if let j = args.firstIndex(of: "-speed"), j + 1 < args.count, let v = Double(args[j + 1]) { sp = v }
                    run.ball.placeAt(s: at, speed: sp)
                    camInit = false
                }
            }
        }
        let wrist = motion.read()
        var input = BallInput(steer: wrist.steer, jump: wrist.jump || touchJump, magnet: wrist.magnet || touchMagnet)
        if autoplay { input = pilot.decide(run.ball) }
        if run.phase != .running { input = BallInput() }
        touchJump = false
        run.update(dt, input)
        let events = run.events
        run.events.removeAll()
        lock.unlock()

        if !events.isEmpty { DispatchQueue.main.async { for e in events { self.haptics.handle(e) } } }
        updateNodes()
        updateCamera(dt, snap: !camInit)
        camInit = true
        hudTimer -= dt
        if hudTimer <= 0 {
            hudTimer = 0.1
            let phase = run.phase, t = run.phase == .finished ? run.finishTime : run.time
            let kmh = run.ball.v.length * 3.6, prog = run.progress, pull = run.pull
            let energy = run.ball.magnetEnergy, falls = run.falls
            DispatchQueue.main.async {
                var h = self.hud
                h.phase = phase; h.time = t; h.speedKmh = kmh; h.progress = prog
                h.pull = pull; h.energy = energy; h.falls = falls
                if self.hud != h { self.hud = h }
            }
        }
    }

    private func finished() {
        let t = run.finishTime
        DispatchQueue.main.async {
            let best = UserDefaults.standard.double(forKey: "best")
            let isBest = best == 0 || t < best
            if isBest { UserDefaults.standard.set(t, forKey: "best") }
            self.hud.best = isBest ? t : best
            self.hud.newBest = isBest
            self.hud.finishTime = t
            self.haptics.play(.success, priority: 2)
        }
    }

    // MARK: visuals

    private func updateNodes() {
        let b = run.ball
        built.ball.position = v3(b.p)
        built.ball.orientation = SCNQuaternion(Float(b.q.x), Float(b.q.y), Float(b.q.z), Float(b.q.w))
        // tractor beam
        if b.magnetHasTarget && (b.magnetActive || b.netLift) {
            let d = b.magnetTarget - b.p
            let len = d.length
            built.beam.isHidden = len < 0.5
            built.beam.position = v3(b.p + d * 0.5)
            built.beam.scale = SCNVector3(1, Float(len), 1)
            built.beam.look(at: v3(b.magnetTarget), up: v3(.up), localFront: SCNVector3(0, 1, 0))
        } else { built.beam.isHidden = true }
        // drifting blocks
        let tr = run.track
        for (k, o) in tr.obstacles.enumerated() {
            let f = tr.frame(at: o.s)
            let fr = (P: f.P + f.R * tr.obstacleX(o) + f.U * (o.h / 2), T: f.T, U: f.U, R: f.R)
            SceneBuilder.orient(built.obstacles[k], at: fr)
        }
        placePlunger()
    }

    private func placePlunger() {
        let tr = run.track
        let f = tr.frame(at: run.startS)
        let back = run.phase == .plunger ? run.pull * Run.pullLength : 0
        let tipD = -(1.15 + 0.02 + back)
        let fr = (P: f.P + f.U * 1.15 + f.T * tipD, T: f.T, U: f.U, R: f.R)
        SceneBuilder.orient(built.plungerRod, at: fr)
    }

    /// Chase camera: low behind the ball, banking with the gutter; in a tube
    /// it rolls round with you; at the plunger it sits back to show the launcher.
    private func updateCamera(_ dt: Double, snap: Bool) {
        let b = run.ball, tr = run.track, pr = b.proj
        let s = max(0, pr.s)
        let f = tr.frame(at: s)
        var pos: Vec3, look: Vec3, up: Vec3
        if run.phase == .plunger {
            let sf = tr.frame(at: run.startS)
            pos = sf.P - sf.T * (17 + run.pull * 2) + sf.U * 6.5 + sf.R * 3
            look = sf.P + sf.T * 7
            up = .up
        } else {
            let speed = b.v.length
            let back = 6.8 + min(3.5, speed * 0.07)
            let fb = tr.frame(at: max(0, s - back))
            up = Vec3.up.lerp(f.U, 0.85).normalized
            pos = fb.P + fb.R * (pr.x * 0.6) + fb.U * (3.0 + max(0, pr.y - 0.75) * 0.55)
            let fa = tr.frame(at: s + min(16, 6 + speed * 0.3))
            look = b.p.lerp(fa.P + fa.U * 0.9, 0.5)
            let tk = tr.tubeAt(s)
            if tk > 0.01 {
                // in a tube "up" points from the ball to the pipe's axis, so the world turns round you
                var dx = -pr.x, dy = tr.profile.H - pr.y
                let l = max(1e-6, (dx * dx + dy * dy).squareRoot()); dx /= l; dy /= l
                let tubeUp = (f.R * dx + f.U * dy).normalized
                up = up.lerp(tubeUp, tk).normalized
                let tubePos = fb.P + fb.R * (pr.x + dx * 3) + fb.U * (pr.y + dy * 3)
                pos = pos.lerp(tubePos, tk)
            }
            // off the gutter (flying, in the net, on the beam), or rolling backwards: follow the ball itself
            let backwards = b.v.dot(f.T) < -3
            let off = backwards || abs(pr.x) > tr.profile.halfWidth + 0.5 || pr.y < -0.5 || (!b.contact && pr.y > tr.profile.H + 4)
            if off {
                let vh = Vec3(b.v.x, 0, b.v.z)
                let dir = vh.lengthSquared > 4 ? vh.normalized : Vec3(f.T.x, 0, f.T.z).normalized
                pos = b.p - dir * 9 + Vec3(0, 4, 0)
                look = b.p + dir * 3
                up = .up
            }
        }
        if snap { camPos = pos; camLook = look; camUp = up }
        else {
            let kp = 1 - exp(-dt * 9), kl = 1 - exp(-dt * 12), ku = 1 - exp(-dt * 5)
            camPos = camPos.lerp(pos, kp); camLook = camLook.lerp(look, kl); camUp = camUp.lerp(up, ku).normalized
        }
        built.camera.position = v3(camPos)
        built.camera.look(at: v3(camLook), up: v3(camUp), localFront: SCNVector3(0, 0, -1))
        // a wider view at speed
        let fov = 70 + min(16, max(0, b.v.length - 10) * 0.6)
        built.camera.camera?.fieldOfView = CGFloat(fov)
    }
}
