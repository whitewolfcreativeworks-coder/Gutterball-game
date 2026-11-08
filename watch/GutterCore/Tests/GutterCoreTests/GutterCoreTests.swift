import XCTest
@testable import GutterCore

final class GutterCoreTests: XCTestCase {

    func testFramesAreOrthonormal() {
        let t = WatchCourse.build()
        for i in stride(from: 0, to: t.n, by: 7) {
            XCTAssertEqual(t.T[i].length, 1, accuracy: 1e-6)
            XCTAssertEqual(t.U[i].length, 1, accuracy: 1e-6)
            XCTAssertEqual(t.T[i].dot(t.U[i]), 0, accuracy: 1e-6)
            XCTAssertEqual(t.T[i].cross(t.U[i]).dot(t.R[i]), 1, accuracy: 1e-5) // forward x up = right
        }
    }

    func testProfileInsideAndOutside() {
        let p = GutterProfile()
        XCTAssertGreaterThan(innerSignedDistance(0, 1, p), 0)
        XCTAssertLessThan(innerSignedDistance(0, -1, p), 0)
        XCTAssertLessThan(innerSignedDistance(p.halfWidth + 1, 3, p), 0)
        // a closed tube: the roof is solid, the middle is open
        XCTAssertGreaterThan(shellSDF(0, p.H, p, curl: 1, openSky: false), 1)
        XCTAssertLessThan(shellSDF(0, p.H + p.halfWidth + 0.1, p, curl: 1, openSky: false), 0.3)
    }

    func testLaunchSpeedRisesWithThePull() {
        XCTAssertLessThan(launchSpeed(0), launchSpeed(0.5))
        XCTAssertLessThan(launchSpeed(0.5), launchSpeed(1))
        XCTAssertEqual(launchSpeed(1), 36, accuracy: 0.01)
    }

    func testPullingTheCrownDrawsTheBallBack() {
        let run = Run(track: WatchCourse.build())
        run.setPull(0.5)
        run.ball.proj.project(run.ball.p)
        XCTAssertEqual(run.ball.proj.s, run.startS - 0.5 * Run.pullLength, accuracy: 0.05)
        run.fire()
        XCTAssertEqual(run.phase, .running)
        XCTAssertEqual(run.ball.v.length, launchSpeed(0.5), accuracy: 0.01)
    }

    func testTheCourseCanBeRiddenToTheFinish() {
        for pull in [1.0, 0.35] {
            let run = Run(track: WatchCourse.build())
            let ap = Autopilot()
            run.setPull(pull); run.fire()
            var t = 0.0
            while run.phase != .finished && t < 180 {
                run.update(1.0 / 60, ap.decide(run.ball))
                run.events.removeAll()
                t += 1.0 / 60
            }
            XCTAssertEqual(run.phase, .finished, "pull \(pull): reached s=\(run.ball.proj.s) of \(run.track.length)")
            XCTAssertLessThanOrEqual(run.falls, 1, "pull \(pull)")
            XCTAssertLessThan(run.finishTime, 120)
        }
    }

    func testTheBallRollsRatherThanSlides() {
        let run = Run(track: WatchCourse.build())
        run.setPull(0.8); run.fire()
        for _ in 0..<(60 * 2) { run.update(1.0 / 60, BallInput()); run.events.removeAll() }
        let b = run.ball
        XCTAssertTrue(b.contact)
        // rolling: spin ~ n x v / r
        let expected = b.n.cross(b.v) / b.tune.radius
        XCTAssertGreaterThan(b.w.dot(expected) / max(1e-6, expected.lengthSquared), 0.7)
    }

    func testTheSafetyNetCatchesYouAndPutsYouBack() {
        let t = WatchCourse.build()
        var s = 0.0
        for i in stride(from: t.n / 4, to: t.n - 200, by: 1) {
            if (i - 60..<i + 200).allSatisfy({ t.netOn[$0] }) { s = Double(i) * t.ds; break }
        }
        XCTAssertGreaterThan(s, 0, "a netted stretch exists")
        let b = BallPhysics(track: t)
        b.placeAt(s: s, speed: 0)
        let f = t.frame(at: s)
        // (the lid keeps the ball between the walls, so it can only reach the net through the floor)
        b.p = f.P - f.U * 2.5
        b.v = f.T * 18
        var caught = false, back = false
        for _ in 0..<(120 * 7) {
            b.step(1.0 / 120, BallInput())
            if b.events.contains(.netCatch) { caught = true }
            b.events.removeAll()
            if caught && !b.netLift && b.contact && b.proj.y > 0 && abs(b.proj.x) < t.profile.halfWidth { back = true; break }
        }
        XCTAssertTrue(caught)
        XCTAssertTrue(back)
    }

    func testTubesKeepYouMoving() {
        for start in [500.0, 1250.0] {
            let run = Run(track: WatchCourse.build())
            run.setPull(0.8); run.fire()
            run.ball.placeAt(s: start, speed: 26)
            var log = "start \(start):"
            var minV = 1e9
            for k in 0..<(60 * 6) {
                run.update(1.0 / 60, Autopilot().decide(run.ball))
                run.events.removeAll()
                let b = run.ball
                if k % 30 == 0 { log += String(format: " [s=%.0f v=%.1f x=%.1f y=%.1f tk=%.2f c=%d]", b.proj.s, b.v.length, b.proj.x, b.proj.y, run.track.tubeAt(b.proj.s), b.contact ? 1 : 0) }
                if k > 30 { minV = min(minV, b.v.length) }
            }
            print(log)
            XCTAssertGreaterThan(minV, 15, log)
        }
    }

    func testTubesAreReallyClosedPipes() {
        let t = WatchCourse.build()
        let closed = (0..<t.n).filter { t.tubeK[$0] > 0.99 }.count
        XCTAssertGreaterThan(Double(closed) * t.ds, 300)
    }
}
