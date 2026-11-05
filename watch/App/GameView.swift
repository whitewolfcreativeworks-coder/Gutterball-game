import SwiftUI
import SceneKit
import GutterCore

/// The game screen: the 3-D view, a tiny HUD, and the controls.
///  - Plunger: turn the Digital Crown to pull back, tap to fire.
///  - Race: turn your wrist to steer, push your hand down to jump, lift it back for the beam.
///    (Tap = jump and touch-and-hold = beam also work.)
struct GameView: View {
    @StateObject private var game = GameController()
    @State private var touchStart: Date? = nil
    @State private var holding = false
    var onExit: () -> Void

    var body: some View {
        ZStack {
            SceneView(scene: game.scene, pointOfView: game.cameraNode, options: [.rendersContinuously],
                      preferredFramesPerSecond: 60, antialiasingMode: .none, delegate: game, technique: nil)
                .ignoresSafeArea()
            hudLayer
            // the whole screen is the touch surface
            Color.clear
                .contentShape(Rectangle())
                .gesture(DragGesture(minimumDistance: 0)
                    .onChanged { _ in
                        if touchStart == nil { touchStart = Date() }
                        if let t = touchStart, !holding, Date().timeIntervalSince(t) > 0.22, game.hud.phase == .running {
                            holding = true; game.setHold(true)
                        }
                    }
                    .onEnded { _ in
                        if holding { game.setHold(false) } else { game.tap() }
                        holding = false; touchStart = nil
                    })
        }
        .focusable(true)
        .digitalCrownRotation($game.crown, from: 0, through: 1, by: 0.02, sensitivity: .low, isContinuous: false, isHapticFeedbackEnabled: true)
        .onAppear { game.start() }
        .onDisappear { game.stop() }
        .navigationBarBackButtonHidden(true)
    }

    @ViewBuilder private var hudLayer: some View {
        let h = game.hud
        VStack(spacing: 2) {
            // progress bar + clock
            HStack(spacing: 4) {
                GeometryReader { g in
                    ZStack(alignment: .leading) {
                        Capsule().fill(Color.black.opacity(0.35))
                        Capsule().fill(Color.orange).frame(width: g.size.width * h.progress)
                    }
                }
                .frame(height: 4)
                Text(fmt(h.time)).font(.system(size: 13, weight: .semibold, design: .monospaced))
            }
            .padding(.horizontal, 10)
            Spacer()
            switch h.phase {
            case .plunger:
                VStack(spacing: 2) {
                    Text("Turn the crown ↓").font(.system(size: 14, weight: .bold))
                    Text("then tap to fire").font(.system(size: 11)).foregroundColor(.secondary)
                    // power meter
                    GeometryReader { g in
                        ZStack(alignment: .leading) {
                            Capsule().fill(Color.black.opacity(0.4))
                            Capsule().fill(LinearGradient(colors: [.green, .yellow, .red], startPoint: .leading, endPoint: .trailing))
                                .frame(width: max(6, g.size.width * h.pull))
                        }
                    }
                    .frame(height: 7).padding(.horizontal, 24)
                }
                .padding(.bottom, 6)
            case .running:
                HStack(alignment: .bottom) {
                    Text("\(Int(h.speedKmh.rounded()))").font(.system(size: 22, weight: .heavy)) + Text(" km/h").font(.system(size: 9))
                    Spacer()
                    // beam energy ring
                    ZStack {
                        Circle().stroke(Color.white.opacity(0.2), lineWidth: 3)
                        Circle().trim(from: 0, to: h.energy).stroke(Color.cyan, style: StrokeStyle(lineWidth: 3, lineCap: .round)).rotationEffect(.degrees(-90))
                    }
                    .frame(width: 22, height: 22)
                }
                .padding(.horizontal, 12).padding(.bottom, 4)
            case .finished:
                VStack(spacing: 3) {
                    Text("FINISH").font(.system(size: 13, weight: .heavy)).foregroundColor(.orange)
                    Text(fmt(h.finishTime)).font(.system(size: 26, weight: .heavy, design: .rounded))
                    Text(h.newBest ? "New best!" : "Best \(fmt(h.best))").font(.system(size: 11)).foregroundColor(h.newBest ? .yellow : .secondary)
                    HStack {
                        Button("Again") { game.tap() }.tint(.orange)
                        Button("Menu") { onExit() }
                    }
                    .font(.system(size: 13))
                }
                .padding(8)
                .background(Color.black.opacity(0.55))
                .cornerRadius(12)
                .padding(.bottom, 4)
            }
        }
        .foregroundColor(.white)
        .allowsHitTesting(h.phase == .finished)
    }

    private func fmt(_ t: Double) -> String {
        let m = Int(t) / 60, s = t - Double(m * 60)
        return String(format: "%d:%04.1f", m, s)
    }
}
