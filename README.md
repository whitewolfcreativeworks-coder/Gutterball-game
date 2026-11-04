# Gutterball

A mobile-first 3D physics game: steer a polished steel ball down an enormous wooden U-shaped gutter — banked turns, wall rides, jumps, a spiral, a vertical loop, and full tubes that split into alternative routes — using device tilt and a magnetic tractor beam. Physics, sound and haptics are driven from one shared simulation.

**Status:** first playable build. See [docs/STATUS.md](docs/STATUS.md) for exactly what is done, what is verified, and what isn't.

## Play

**On iPhone / iPad:** open https://whitewolfcreativeworks-coder.github.io/Gutterball-game/ in Safari, tap Timberline Run, allow motion access, swipe up to launch. Steering is by tilt only.

Local development:

```bash
npm install
npm run dev        # http://localhost:5173  (add --host to open it from your phone on the same Wi-Fi)
```

| Action | Phone / tablet (tilt only) | Keyboard (desktop testing) |
|---|---|---|
| Launch, then push the ball faster | swipe up (faster swipe = harder push), or **tap with a thumb near the left/right edge** | ↑ / W |
| Turbo | 3 pushes, hold the magnet booster ~1 s, then push again: double top speed for 7 s | ↑×3, hold Shift, ↑ |
| Steer | tilt left / right | ← → / A D |
| Jump | tilt the top toward you | Space |
| Magnet (hold): tractor beam in the air, booster on the track | tilt the top away from you | Shift / M |
| Double jump | a second quick flick in the air | Space twice |
| Pause / restart | ❚❚ button | Esc / R |

Debug URL parameters: `?play=wood`, `?preview=ice`, `?screen=adroom`, `?quality=low`, `?at=900` (teleport along the course), `?fixed=1` (fixed 60 Hz frame step).

## Build & test

```bash
npm test           # 72 unit tests: physics, track frames, accounting, entitlements, every course completable
npm run typecheck
npm run build      # static site in dist/ (relative paths; host anywhere)
npm run smoke      # headless Chrome run with screenshots in screenshots/ (needs Chrome; set CHROME=path)
```

## What's inside

- **Physics** — analytic gutter SDF (no triangle seams to snag on), turtle-integrated track frames that survive loops without twist, a 240 Hz rigid sphere with Coulomb friction coupling spin and slide. → [docs/PHYSICS.md](docs/PHYSICS.md)
- **Physical sensory engine** — one event stream (`ROLLING_CONTACT`, `COLLISION_IMPACT`, `MAGNETIC_CAPTURE`, …) drives procedural Web Audio synthesis and haptics. → [docs/SENSORY.md](docs/SENSORY.md)
- **Twelve worlds** — Wood (free) plus eleven hand-composed courses, each with its own course style (see docs/WORLD_MATH.md), wall mathematics and material profile: friction, rolling resistance, bounce, fluid/granular models, acoustics and haptic texture.
- **Commerce foundation** — course catalog, entitlement service with a purchase *simulator*, and the optional Ad Room with server-authoritative, idempotent, append-only accounting. → [docs/COMMERCE.md](docs/COMMERCE.md), [docs/AD_ROOM.md](docs/AD_ROOM.md)
- **Mobile packaging** — browser build now; native iOS/Android path via Capacitor. → [docs/MOBILE.md](docs/MOBILE.md)
- **Engineering decisions** → [docs/DECISIONS.md](docs/DECISIONS.md) · **Assets & licences** → [docs/ASSETS.md](docs/ASSETS.md)

## Repository layout

```
src/track      gutter profile SDF, track builder & projection
src/physics    ball dynamics, material profiles
src/core       sensory event bus contract
src/courses    Timberline Run + prototype course generator
src/game       run rules, game orchestration, autopilot
src/render     textures, track mesh, world/terrain, ball & beam, camera
src/audio      procedural audio engine
src/haptics    haptic tiers & comfort governor
src/input      tilt / swipe / touch / keyboard
src/commerce   catalog, entitlements, Ad Room accounting & client
tests/         vitest suites
scripts/       headless smoke test
docs/          design & engineering documentation
```
