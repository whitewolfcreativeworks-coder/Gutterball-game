# The physical sensory engine

One source of truth: `BallPhysics` produces a `SensoryState` snapshot every frame and discrete `SensoryEvent`s (`src/core/events.ts`). `Game` publishes them on a `SensoryBus`; the audio engine, haptic engine and visual effects subscribe. None of them computes its own idea of what the ball is doing.

## Events

`ROLLING_CONTACT`, `SLIDING_CONTACT`, `SURFACE_SEAM_CROSSING`, `COLLISION_IMPACT` (with source `track`/`obstacle` and impact speed), `AIRBORNE_START`, `AIRBORNE_END`, `MAGNET_ENGAGED`, `MAGNET_RELEASED`, `MAGNETIC_CAPTURE`, `WATER_ENTRY`, `WATER_EXIT`, `JUMP`, `TUNNEL_ENTER`, `TUNNEL_EXIT`.

State includes speed, angular speed, contact, rolling state, smoothed normal force, slip speed, material, airborne time, magnet activity/force/energy, submersion, tunnel, lateral/height position.

## Audio (`src/audio/audioEngine.ts`, Web Audio)

Layer 1 — contact (dominant):
- **Rolling**: looped pink noise → the material's resonant band-pass filters (wood: 95/210/460/1100 Hz body modes) + a low structural rumble; gain ∝ speed^0.75 × √(normal load) × rolling factor × contact; a low-pass "brightness" opens with speed and load (spectral tilt, not a pitch shift); amplitude modulation at the ball's actual revolution rate.
- **Sliding**: separate scrape band (material-specific frequency/Q), gain ∝ slip; rubber adds a tonal squeal.
- **Impacts**: noise transient + material modal resonators, each hit randomised in frequency (±6 %) and decay; strength from the impact speed.
- **Seams**: tiny filtered clicks at joints (rate-limited).

Layer 2 — environment: wind ∝ speed² (louder airborne), convolution reverb that opens up in tunnels, underwater low-pass, occasional procedural birdsong in nature worlds, water bubbles.

Layer 3 — a quiet generative pad (toggle in Settings).

Magnet voice: rising activation sweep, modulated hum whose filter and pitch follow magnet force, capture "zap", short release.

Airborne: rolling layers go to zero within ~30 ms because contact is false; wind remains. Landing fires an impact and rolling returns.

iOS requires audio to start from a user gesture; the engine unlocks on the first tap.

## Haptics (`src/haptics/haptics.ts`)

Mapped from the same events: impacts and landings (pulse length/strength from impact speed × material `impactScale`), magnet engage and capture, jumps, seam pulses (material `seamPulse`), water entry, plus sparse rolling-texture micro-pulses whose rate follows speed × load × material `rollTexture` (wood gentle, ice nearly silent, grating rhythmic via seams).

Comfort governor: a ~25 % duty-cycle budget, actuator-busy tracking, priority classes (impacts beat texture), global strength slider and an off switch.

Tiers: `basic` (Vibration API — Android Chrome), `tick` (iOS 18 Safari switch control, unverified, strong transients only), `none` (iPad/desktop: no errors, identical gameplay), `advanced` (native wrapper injects a Core Haptics driver).

## Timing

Audio parameters use ~30 ms smoothing; events are synthesised in the same frame they're emitted, so sound and vibration of an impact are dispatched together (within one 16 ms frame plus device output latency).
