import SwiftUI

@main
struct GutterballWatchApp: App {
    var body: some Scene {
        WindowGroup { RootView() }
    }
}

/// The menu: play, your best time, and two settings for the wrist controls.
struct RootView: View {
    @State private var playing = false
    @AppStorage("best") private var best: Double = 0
    @AppStorage("invertSteer") private var invertSteer = false
    @AppStorage("invertTilt") private var invertTilt = false

    var body: some View {
        if playing {
            GameView(onExit: { playing = false })
        } else {
            ScrollView {
                VStack(spacing: 8) {
                    Text("GUTTERBALL").font(.system(size: 18, weight: .heavy)).foregroundColor(.orange)
                    Text("Wrist Run").font(.system(size: 12)).foregroundColor(.secondary)
                    Button { playing = true } label: {
                        Label("Play", systemImage: "play.fill").font(.system(size: 16, weight: .bold))
                    }
                    .tint(.orange)
                    if best > 0 { Text("Best \(String(format: "%.1f", best)) s").font(.system(size: 12)).foregroundColor(.secondary) }
                    VStack(alignment: .leading, spacing: 4) {
                        Text("Turn the crown to pull the plunger, tap to fire. Turn your wrist to steer, push your hand down to jump, lift it back for the tractor beam.")
                            .font(.system(size: 11)).foregroundColor(.secondary)
                        Toggle("Flip steering", isOn: $invertSteer).font(.system(size: 13))
                        Toggle("Flip jump / beam", isOn: $invertTilt).font(.system(size: 13))
                    }
                    .padding(.top, 4)
                }
            }
        }
    }
}
