import Foundation

/// "Wrist Run": the Apple Watch course. Short (about a minute), flowing, and
/// readable on a tiny screen: sweeping banked turns, two tubes (the hook),
/// a jump over a gap with the safety net under it, a plunge, and a short
/// slalom of drifting blocks. Every turn is wide and every change is eased.
public enum WatchCourse {
    public static func build() -> Track {
        var segs: [Segment] = []
        var marks: [String: Double] = [:]
        var s = 0.0
        func add(_ seg: Segment, _ label: String? = nil) {
            if let l = label { marks[l] = s }
            segs.append(seg); s += seg.len
        }
        add(Segment(40, pitch: -3))                                         // the plunger lane
        add(Segment(60, pitch: -10))
        add(Segment(90, yaw: 55, pitch: -8, bank: 16))                      // a sweeping left
        add(Segment(50, pitch: -6, bank: 0))
        add(Segment(90, yaw: -60, pitch: -9, bank: -18))                    // and a sweeping right
        add(Segment(40, pitch: -5, bank: 0))
        add(Segment(40, pitch: -6, tube: true), "tube1")                    // TUBE ONE
        add(Segment(200, yaw: 75, pitch: -7, tube: true))
        add(Segment(60, yaw: -25, pitch: -6, tube: true))
        add(Segment(50, pitch: -3))
        add(Segment(30, pitch: 5), "kicker")                                // a kicker...
        add(Segment(14, pitch: 0, gap: true, openSky: true), "gap")         // ...over the gap (net below)
        add(Segment(40, pitch: -8, openSky: true))
        add(Segment(55, pitch: -22))                                        // the plunge
        add(Segment(50, pitch: -5))
        add(Segment(100, yaw: 85, pitch: -6, bank: 24))                     // a big banked left
        add(Segment(50, pitch: -6, bank: 0))
        add(Segment(130, pitch: -5), "slalom")                              // drifting blocks
        add(Segment(40, pitch: -6, tube: true), "tube2")                    // TUBE TWO: a long spiral
        add(Segment(190, yaw: -125, pitch: -7, tube: true))
        add(Segment(50, pitch: -4))
        add(Segment(70, yaw: 40, pitch: -5, bank: 12))
        add(Segment(80, pitch: -3, bank: 0))                                // the finish straight
        add(Segment(60, pitch: 0))
        let sl = marks["slalom"] ?? 0
        let obstacles = [
            Obstacle(s: sl + 25, x: -2.2, period: 8, phase: 0),
            Obstacle(s: sl + 50, x: 2.4, period: 9.5, phase: 1.7),
            Obstacle(s: sl + 75, x: -0.8, amp: 1.6, period: 5.5, phase: 0.6),
            Obstacle(s: sl + 100, x: 2.0, period: 7, phase: 2.4),
        ]
        return Track(segments: segs, obstacles: obstacles)
    }
}
