# Engineering decisions

Each entry: what was decided, why, and what would change the decision.

## 1. Web stack (TypeScript + Three.js + Vite) instead of Godot for the first build

The brief suggests Godot. For this first cycle I chose a web stack:

- **It can be verified here.** The build environment is headless Linux. A browser game can be type-checked, unit-tested, built and *driven in headless Chrome with screenshots* in this environment. A Godot project could be written but its mobile exports (iOS especially) could not be produced or tested here.
- **You can play it on your iPhone immediately** from a URL, no signing, no TestFlight.
- **The path to native is short**: the same build is wrapped with Capacitor (WKWebView / Android WebView) to get App Store / Play distribution, StoreKit / Play Billing, and native Core Haptics (see MOBILE.md).
- **Bundle size** is small (~180 KB gzipped JS, zero downloaded image assets — all textures are procedural).

Would change if: GPU budgets on target devices prove too tight for WebGL, or native audio latency becomes a problem. The physics, track, sensory bus and commerce logic are plain TypeScript with no rendering dependency and could be ported to GDScript/C# with the tests as the spec.

## 2. Custom physics instead of Jolt/Rapier

A general rigid-body engine collides a sphere against *triangles*. A swept gutter mesh has thousands of seams; fast spheres catch on edges ("ghost collisions"), and fixing that needs mesh smoothing hacks and high iteration counts.

Gutterball has exactly one dynamic body moving inside one analytic surface. So the track is represented as a **signed distance function** in track-local coordinates (distance along, lateral, height). Contact normals are exact gradients of a smooth function: there are no seams. One sphere vs. one SDF at 240 Hz costs microseconds. Tunnelling is prevented by small steps relative to ball radius (at 60 m/s a step is 0.25 m < 0.36 m radius) plus up-to-3 projection iterations.

Rapier would still be the right call if many dynamic bodies (debris, rotating hazards) are added later — it can be used for *those*, with the ball/track contact kept analytic.

## 3. Track frames by "turtle" angles, not parallel transport

Parallel transport accumulates holonomy (twist) on non-planar curves; after a banked climbing turn the "up" vector drifts. Instead each sample's frame is built from stored yaw (about world up), pitch (about local right) and bank (about forward) angles, eased with smootherstep inside each segment. Frames are exactly orthonormal, never twist, and pitching through 360° produces a correct inverted loop. Curvature is continuous across segment boundaries (smootherstep has zero derivative at the ends). Tests assert orthonormality and that the frame returns upright after a loop.

## 4. Steering through a "gyro core"

A real ball can't steer itself. The design fiction: an internal reaction wheel applies torque to the shell. Steering and propulsion are therefore **torques that act through traction** (65%) plus a small direct field force (35%) so low-grip worlds remain playable. Result: steering bites on rubber, and on ice the ball spins up and drifts — material differences emerge from the same controller. Jumps are an explicit impulse along the contact normal (the brief's intended mechanic).

## 5. Magnet = force with limits, never a snap

Airborne attraction is an acceleration toward the closest point on the track shell (from the same SDF), with range falloff, damping of motion away from the surface, and an approach-speed limiter near contact. In contact it adds normal load (more traction, holds inverted). It drains an energy meter and recharges while rolling. Tests check per-step velocity change stays small while flying and capture impacts stay moderate.

## 6. Procedural audio over sample loops

No licensed samples were needed: rolling is filtered noise through each material's resonant bands, with gain, spectral tilt and rotation-rate amplitude modulation driven by speed, normal load, slip and contact state. Impacts are modal synthesis with per-hit randomisation (no identical repeats). This satisfies "not a single loop pitched by speed" and keeps the build asset-free. Recorded samples can be layered later through the same event interface.

## 7. Haptics in tiers

Web Vibration API (Android browsers) = "basic"; an opportunistic iOS 18 switch-control tick (unverified, strong transients only) = "tick"; nothing = "none". The advanced tier (Core Haptics patterns with amplitude/sharpness) is designed in (`HapticDriver` interface, `window.__GUTTERBALL_NATIVE_HAPTICS__` injection point) and is delivered by the native wrapper. A duty-cycle governor prevents continuous buzzing.

## 8. Commerce logic is pure and clock-injected

The Ad Room accounting (`src/commerce/adAccounting.ts`) runs in the browser *as a simulation* today, but it is written exactly as a server module: injected clock, injected storage, integer micro-dollars and milliseconds, idempotent settlement, append-only ledger. Moving it behind an HTTPS API changes the transport, not the rules — and the 17 accounting tests come along as the spec.

## 9. Provisional numbers live in one file

`src/commerce/config.ts` holds every commercial parameter (price, reward threshold, durations, caps, simulated rate). Nothing else hard-codes them.

## Full tubes and Y-junctions (The Burrow)

- **Tubes are a profile parameter, not a separate track type.** Each sample carries a `tubeK` curl (0 open gutter … 1 closed pipe), eased over ~24 m. Above the wall tops the walls curl inward along a circle of radius W centred at (0, H); at curl 1 both sides meet overhead (a stadium-shaped pipe ~13 m tall). Physics (`shellSDF`) and the mesh (`profileRing`, constant vertex count at every curl) use the same curve, so you see exactly what you roll on.
- **Steering and camera in a pipe follow the ball around it.** Inside a tube "right" is `T × n` (your right around the pipe), and the camera's up vector points from the ball to the pipe's axis, so riding up the wall and over the roof turns the world around you.
- **Splits/merges are junctions between two tracks.** For a stretch at each joined end the solid is (walls of A minus hollow of B) ∪ (walls of B minus hollow of A): `sdf = min(max(dA, cB), max(dB, cA))`. A plain max of shell SDFs is wrong (the *outside* of one pipe would punch a hole in the other's floor). The mesh carves triangles that lie inside the other track's hollow.
- **Rejoining branches are solved, then snapped.** The Skylight's segment lengths/pitches were found by a small numerical search so its end lands on the main pipe with matching angles; the remaining ~2 m is spread along the branch as a smooth correction (< 0.5° of slope).
- **Taking the Skylight is a skill choice.** Momentum carries you straight, so you hold right hard before the split, ride up the right wall and cross the divider. Doing nothing keeps you on the Dark Line.

- **Tubes are pneumatic.** Rolling round the walls of a pipe costs speed (climbing trades speed for height), so inside a tube an air current pushes you along the course (9 m/s², fading out near 46 m/s). It's the same kind of fiction as the magnet booster.
- **More tubes.** Timberline Run now starts inside a pipe that splits at once (The Plunge, or Daybreak to the left: the Skylight's solved layout mirrored, so it rejoins just as exactly). The big spiral is a tube. Every prototype world starts in a pipe, and its covered sections are tubes.
- **Supports, trees and terrain keep clear of pipes.** A support leg is dropped if its column would pass through any gutter or pipe below (measured from the pipe's body, which sits off to one side when banked). The ground under a spiral follows the lowest pass, and tall trees keep their distance.
