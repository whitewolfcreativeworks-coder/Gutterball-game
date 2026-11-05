# Gutterball for Apple Watch: "Wrist Run"

A small, native watchOS version of Gutterball. It has one short course of about a minute, built to work well on a tiny screen and with the watch's motion sensors and Taptic Engine.

## How you play

| Action | How |
|---|---|
| Pull the plunger back | Turn the Digital Crown. Each notch clicks, and a power meter fills. |
| Fire | Tap the screen. |
| Steer | Turn your wrist left or right. |
| Jump | Push your hand down. |
| Tractor beam | Lift your hand back. Hold it for as long as you need the beam. |

Taps and holds work as backups: tap to jump, touch and hold for the beam.

- **Neutral pose:** "straight" is however you're holding your arm at the moment you fire.
- **Settings:** the menu has **Flip steering** and **Flip jump / beam** in case your wrist or crown setup feels backwards.

The course has:
- sweeping banked turns
- two neon tubes, the second a long spiral
- a kicker jump over a gap
- a plunge
- a slalom of drifting blocks
- a checkered finish (your best time is saved)

The safety net hangs under the course wherever it's level and open. Fall into it and the tractor beam lifts you back into the gutter.

## What's in here

| Path | What it is |
|---|---|
| `GutterCore/` | A Swift package with the gutter geometry and ball physics, ported from the web game (`src/track`, `src/physics`). Pure Swift and Foundation, with an XCTest suite. |
| `App/` | The SwiftUI + SceneKit watch app: game loop, chase camera, wrist and crown controls, haptics and HUD. |
| `project.yml` | [XcodeGen](https://github.com/yonaskolb/XcodeGen) spec that generates `Gutterball.xcodeproj`. |

The physics core includes:
- the turtle-built track and the analytic gutter SDF with the tube curl
- rolling friction and spin
- tube flow; on the watch the tube also settles you back to the bottom when you aren't steering
- jump and tractor beam
- the safety net and the beam lift
- the plunger launch and the quick reset

## Build and run (on a Mac)

```sh
brew install xcodegen
cd watch
xcodegen generate
open Gutterball.xcodeproj
```

**Simulator:** pick the **GutterballWatch** scheme and an Apple Watch simulator, then run. The simulator has no motion sensors, so to watch it drive itself, add `-autoplay` to the scheme's launch arguments. You can add `-at 500` to start inside the first tube.

**Your own watch:** in the target's *Signing & Capabilities*, choose your Apple Developer team. Change the bundle identifier if you need to. Then run on your paired watch.

Requirements: Xcode 16 or later, watchOS 10 or later.

## Continuous integration

`.github/workflows/watch.yml` runs on GitHub's macOS runners for every change under `watch/`:
1. Runs the `GutterCore` tests.
2. Builds the app for the watch simulator.
3. Boots an Apple Watch simulator and plays the app in `-autoplay` mode: the plunger, a race, both tubes and the safety net.
4. Takes screenshots, uploads them as an artifact and also prints them into the log.

## Notes

- **No sound yet.** The watch speaker is small and haptics carry the feel. Audio could be added with `AVAudioEngine`.
- **SceneKit:** SceneKit still runs on watchOS, but Apple is moving away from it. If it's ever removed, the renderer here is small enough to replace.
