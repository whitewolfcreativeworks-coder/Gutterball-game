import WatchKit
import GutterCore

/// The watch's Taptic Engine, driven by the same physics events as everything
/// else. The watch only has a fixed set of haptic "taps", so each physical
/// event picks the closest one, and a rate limit keeps it comfortable.
final class Haptics {
    var enabled = true
    private var lastAny = 0.0, lastSeam = 0.0

    private func now() -> Double { Date().timeIntervalSinceReferenceDate }

    func play(_ type: WKHapticType, priority: Int = 1) {
        guard enabled else { return }
        let t = now()
        // never more than ~8 a second; low-priority texture taps far less often
        if t - lastAny < (priority >= 2 ? 0.05 : 0.12) { return }
        lastAny = t
        WKInterfaceDevice.current().play(type)
    }

    func handle(_ e: SensoryEvent) {
        switch e {
        case .jump: play(.directionUp, priority: 2)
        case .airborneEnd(let i): if i > 0.3 { play(.click, priority: 2) }
        case .impact(let i, let obstacle): if obstacle || i > 0.55 { play(obstacle ? .retry : .click, priority: 2) }
        case .magnetOn: play(.directionDown, priority: 2)
        case .capture: play(.click, priority: 2)
        case .netCatch: play(.retry, priority: 2)
        case .tubeEnter: play(.start)
        case .seam(let i):
            // the wood's joints going by: a light tick, gentle and not too often
            let t = now()
            if i > 0.3 && t - lastSeam > 0.45 { lastSeam = t; play(.click) }
        default: break
        }
    }
}
