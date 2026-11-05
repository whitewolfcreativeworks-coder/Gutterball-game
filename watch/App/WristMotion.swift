import CoreMotion
import WatchKit

/// Wrist controls from the watch's motion sensors.
///  - Turn your wrist left / right (roll about your forearm) to steer.
///  - Push your hand down to jump.
///  - Lift your hand back to hold the tractor beam.
/// Everything is measured from a neutral pose set when you fire the plunger,
/// so however you hold your arm is "straight".
final class WristMotion {
    private let mm = CMMotionManager()
    private var neutral = (x: 0.0, y: 0.0)
    private var jumpArmed = true
    var invertSteer = UserDefaults.standard.bool(forKey: "invertSteer")
    var invertTilt = UserDefaults.standard.bool(forKey: "invertTilt")

    var available: Bool { mm.isDeviceMotionAvailable }

    func start() {
        guard mm.isDeviceMotionAvailable, !mm.isDeviceMotionActive else { return }
        mm.deviceMotionUpdateInterval = 1.0 / 60
        mm.startDeviceMotionUpdates()
    }
    func stop() { mm.stopDeviceMotionUpdates() }

    /// The way you're holding your arm right now becomes "straight ahead".
    func calibrate() {
        if let g = mm.deviceMotion?.gravity { neutral = (g.x, g.y) }
        jumpArmed = true
    }

    /// Read the wrist: steer -1..1, a jump edge, and whether the beam is held.
    func read() -> (steer: Double, jump: Bool, magnet: Bool) {
        guard let g = mm.deviceMotion?.gravity else { return (0, false, false) }
        // On the wrist the forearm runs along the watch's x axis (9 -> 3 o'clock):
        // rolling the wrist moves gravity along y; bending the hand down/up moves it along x.
        let dev = WKInterfaceDevice.current()
        let mirrored = (dev.wristLocation == .right) != (dev.crownOrientation == .left)
        var roll = g.y - neutral.y
        var tilt = g.x - neutral.x
        if mirrored { roll = -roll; tilt = -tilt }
        if invertSteer { roll = -roll }
        if invertTilt { tilt = -tilt }
        // steering: a small dead zone, then a smooth curve (about 25 degrees for full lock)
        let dz = 0.04
        let a = max(0, abs(roll) - dz) / 0.38
        let steer = max(-1, min(1, (roll < 0 ? -1 : 1) * (a * 0.6 + a * a * 0.4)))
        // hand down past ~20 degrees: one jump (re-arms once you come back up)
        var jump = false
        if tilt < -0.34 && jumpArmed { jump = true; jumpArmed = false }
        if tilt > -0.14 { jumpArmed = true }
        // hand lifted back past ~17 degrees: tractor beam, held as long as you hold it
        let magnet = tilt > 0.3
        return (steer, jump, magnet)
    }
}
