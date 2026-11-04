# Build status — first playable (2026-11-03)

Legend: ✅ done & verified here · 🟡 done, not verifiable in this environment · ⬜ not started / planned

## Objective A — playable Gutterball

| Item | Status | Evidence |
|---|---|---|
| 3D game, metallic ball, broad U gutter | ✅ | screenshots/, smoke test |
| Downhill movement, stable rolling physics | ✅ | tests: rolling-sphere acceleration law, `ωr ≈ v` |
| Lateral steering (force, no teleport) | ✅ | test: no position jumps |
| Wall climbing driven by speed & curvature | ✅ | test: faster → higher on outside wall |
| Jump (threshold, debounce, cooldown, coyote time, momentum kept) | ✅ | tests |
| Magnetic traction + airborne capture, tractor beam VFX & sound | ✅ | tests: bounded force, moderate capture; loop screenshots |
| Vertical loop, spiral, banked 52° wall ride, covered-bridge tunnel, 2 gaps | ✅ | course test, screenshots |
| Full tubes ("The Burrow"): gutter walls curl closed into a pipe you can roll all the way round; camera rolls with you | ✅ | tests: ride through, roll over the roof; screenshots tube-*.png |
| Tube split + merge (Y-junctions): the pipe splits into the Dark Line and the Skylight (bursts out into daylight), which merge back | ✅ | tests: both routes; branch layout solved numerically to rejoin within ~2 m |
| Obstacles (barrier, offset blocks, slalom posts, gates) | ✅ | autopilot avoids them; physics collides |
| Complete wooden course "Timberline Run" (1.9 km, ~90 s) | ✅ | completes with 0 falls under autopilot |
| Completion, results, best time, checkpoints, fast respawn, restart | ✅ | |
| Shared sensory event system | ✅ | `src/core/events.ts` |
| Physics-driven procedural audio | 🟡 | implemented; **not listened to** — headless Chrome has no audio output here |
| Haptics | 🟡 | Android Vibration API path implemented; iOS Safari has no vibration API (optional iOS 18 tick driver is **unverified**); Core Haptics needs the native wrapper |
| Tilt controls with calibration, swipe propulsion | 🟡 | implemented; **not tested on a real phone** (no device here). Touch-drag and keyboard fallbacks work |
| Attractive environment (sky, forest valley, trestles, fog) | ✅ | screenshots |
| Performance on phones | 🟡 | unknown until tried on a device; Settings → Graphics → "Battery saver" halves the cost |

| Eleven hand-composed courses, each with its own course style (bobsleigh, duelling looper, Apollonian loop cascade, wild-mouse stack, dive coaster, ski jump, river run, dune terrain, crack delta, rebound labyrinth, storm drain), from an element library; 3-way and 2-way splits with automatic junctions and rejoins | ✅ | tests: every world completes; every branch rides back onto the main course; self-intersection scan |

## Objective B — commercial foundation

| Item | Status |
|---|---|
| Course menu, Wood free forever, 11 worlds at provisional $0.99 | ✅ |
| Live in-engine course previews (never grant ownership) | ✅ |
| Entitlement abstraction + purchase **simulator**, restore, forged-flag rejection | ✅ tested |
| Real StoreKit / Play Billing | ⬜ needs native build + store accounts |
| Ad Room: manual start, one session, stop-anytime partial credit, no autoplay/queue, pause on background | ✅ tested |
| Time-based credits, random temporary cosmetic rewards with disclosed odds, expiry | ✅ tested |
| Server-authoritative accounting rules, idempotent settlement, append-only ledger, reversals, reconciliation | ✅ as a pure module running *in the browser* (simulation) |
| Production backend, real ads, real billing, device attestation | ⬜ API contract & fraud model in AD_ROOM.md |

## The twelve worlds

All 12 material profiles (physics, medium models, acoustics, haptics, visuals) are implemented and every course is completable. Wood is hand-designed; the other 11 courses are **procedurally assembled prototypes** — playable, distinct in feel, but not yet hand-crafted, and their scenery is simpler.

## Verified vs. not

- ✅ Type-check, 50 unit tests, production build, headless-Chrome runs with zero page errors (menu, gameplay with keyboard input, previews, Ad Room flow).
- 🟡 Not verified: real iPhone/iPad/Android behaviour (sensors, audio latency, haptics, frame rate), audio by ear.
- ⬜ No native iOS/Android builds were produced (no macOS/Xcode/SDK/signing here).

## Known issues / next steps

1. Tune tilt thresholds and sensitivity on real devices (first thing to do with your phone).
2. Listen-test and tune the procedural audio mix per material.
3. Hand-design the next worlds (Ice and Sheet Metal first, per brief).
4. Native wrapper (Capacitor) for Core Haptics + StoreKit; see MOBILE.md.
5. Camera inside tight loops sits close to the surface; consider a dedicated loop camera.
6. Rotating hazards and split pathways are designed for but not yet in a course.
