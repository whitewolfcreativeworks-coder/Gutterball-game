# Immersion: making the ride feel like a ride

Goal from playtesting: you should feel the walls rush past, like a rollercoaster — close to motion sickness.

## What the research says

- Speed perception depends strongly on field of view and peripheral vision; with only the central 30° visible, people underestimated speed by about 41% ([Frontiers in Psychology, 2019](https://frontiersin.org/articles/10.3389/fpsyg.2019.02344/full)).
- Racing games sell speed with exaggerated motion blur, camera shake, field-of-view choices, objects passing close and shrinking fast, tunnelling particle effects, and strong audio ([Operation Sports](https://www.operationsports.com/why-is-speed-so-hard-to-capture-in-racing-games/)).

## What Gutterball does (all scaled by Settings → "Speed effects")

| Technique | Implementation |
|---|---|
| Peripheral optical flow | Animated fractal glow on the gutter walls streams along the course (`render/fractal.ts`), strongest in the periphery, faint on the floor |
| Objects passing close | Glowing ribs arch over the gutter every 7 m; each one whooshes past in alternating stereo |
| Low, close camera | Camera rides 2.5 m above the floor, ~6 m behind the ball |
| Coaster banking | Camera up-vector follows the track bank (85%), plus extra lean from measured lateral g |
| Vertical g | View sinks under compression at the bottom of dips, floats on crests and in the air |
| Speed FOV | Wide base FOV (84° portrait) widening up to +18° with speed; short FOV punches on jumps, double jumps and landings |
| Vibration | High-frequency road rumble that grows with speed², plus impact shake |
| Screen effects | Radial motion blur toward the vanishing point (centre stays sharp), vignette, slight colour fringing; magnet tints the edges |

## Fractal themes

Each world has its own fractal family and palette: Kali-set filaments (wood, ice, rubber, mud, snow), Julia-set bands (metal, glass, stone) and kaleidoscopic folds (concrete, water, sand, grating). Settings → "Fractal glow on the gutter" sets the strength (0 turns it off).

## Performance

Effects run on the GPU; resolution adapts automatically to hold ~60 fps. "Battery saver" quality disables post-processing and shadows.

## Dome-theatre mode: tubes as a psychedelic warp ride

Modelled on immersive dome theatres and flight rides (the Sphere in Las Vegas, teamLab-style projection rooms, 4D cinemas): fill the whole field of view with coherent motion, layer it for depth, cycle the colour, and add body cues.

| Technique | Implementation |
|---|---|
| Wrap-around projection | Inside a tube the wood darkens and the fractal owns every surface, floor included; the pattern wraps seamlessly round the pipe |
| Layered parallax | Two fractal layers at different scales flow at different speeds and twist in opposite directions |
| Vection (self-motion from optic flow) | Everything streams toward you, scaled by your real speed; warp rings rush past; glowing "mist" streaks hang in the pipe and stretch into lines as you fly through them |
| Psychedelic colour | Full-spectrum hue cycling in time, along the course and through the pattern (a gentler shimmer in the open gutter) |
| Breathing | Push-pull zoom of the pattern, stronger in tubes |
| Warp speed | Tubes are pneumatic: the air current fires you up to ~260 km/h; the field of view stretches up to 16° wider; air brakes ease you back to cruising speed (~165 km/h) when the pipe opens |
| "4D" body cues | Wind roar rises in tubes (the fans), and the device trembles at warp speed (rate-limited rumble) |

Splits stay fair: the current calms to ~100 km/h approaching and through a split, so there's time to pick a side, and branch tubes that lead into jumps have a lower warp cap.

## The outside world (sky dome)

`src/render/sky.ts` is a single shader that follows the camera. It paints, per world (`SKY_THEMES`):
- the gradient sky, sun or moon, and drifting fBm clouds;
- three distant ridgelines in the world's style: forest hills, jagged snow peaks, mesas, a city skyline with lit windows, smokestacks, stepped pyramids, cranes with blinking warning lights, or dune crests;
- extras: aurora (Ice), stars, moon and a synthwave glow (Rubber), lightning that flashes the clouds and the scene light (Mud).

The ridge bases melt into the fog colour, so the real terrain fades into the painted horizon. Supporting changes:
- Fog is lighter.
- The terrain extends ~1.8 km past the course.
- Lakes flood the lowest valleys in the forest, tropical, jungle and glacier worlds.

On low quality the noise drops from 5 octaves to 3.

## Soundtrack picker

`src/audio/music.ts` is our own step sequencer and synths: kick, snare, clap, rim, hats, bass, acid, reese, stabs, pads, leads, a reggae skank and organ bubble, and distorted guitar.

- **Genres:** Techno 128, House 124, Rave/drum & bass 172, Reggae (one-drop) 76, Rock 124, plus Ambient (the original pad) and Off (physical sounds only).
- **Structure:** 32-bar phrases with a 4-bar breakdown and a fill every 8 bars.
- **Speed-reactive:** the master low-pass opens with the ball's speed.
- **Mix:** low, about 0.22 × the user's music level, under the physical sounds.
- **Controls:** the ♪ button at the top left of the HUD (outside the thumb-tap zones), plus a genre and volume setting in Settings.
- No samples or third-party audio, so there is nothing to license.

## Finish contraptions

After the line the player lets go. The ball rolls off the end of the run-out into one of five machines, each with its own camera move, sounds and confetti or fireworks:
- **Plinko:** 2-D peg physics, landing in a points slot from 100 to 10K.
- **Dominoes:** a 30-piece S-curve, a seesaw, a gold ball into a bucket and a bell.
- **Hoop shot.**
- **Chime stairs:** plays "Mary Had a Little Lamb", a traditional, public-domain tune.
- **Wishing-well funnel:** a conserved-angular-momentum spiral.

Results appear when the machine finishes (Skip › jumps straight to them).

## Ghost runs

- **Recording:** each run is recorded as the ball's world position 20 times a second, interpolated to the exact tick. A ghost therefore follows whichever route you took.
- **Racing:** "Run again" races the ghost of your last finished run. A toggle before launch turns it off.
- **Saving:** "Save run" keeps your 10 fastest runs per course on the device, as int16 deltas in 2 cm units with an escape for respawn jumps (about 8 base64 characters a sample).
- **Saved runs:** from the list you can Race one or Watch it. When watching, the recording drives the ball (`BallPhysics.followGhost`), so the camera and sound behave as they did on the run.

## Auto Ball

Tap **AUTO** at any time, before the launch or mid-run, and a pro driver (`src/game/proPilot.ts`) takes over once the ball is away. Tap again and you have it back.

**What the pro does.** It uses only the player's controls, but plays like someone who knows the line:
- Keeps its speed up with swipe pushes, and chains push-push-push plus the booster into TURBO on long clear straights.
- Climbs the wall to roll over trigger pads. Height is held with gentle feedback, so it rolls along the wall instead of launching off it.
- Aims straight through holograms for their boosts, and threads the solid blocks.
- Lines up dead centre for gaps and jumps them at the edge. It catches air over crests, but never in open-sky stretches.
- Holds the magnet through inversions, and beams home after big air, though never over a gap, where the beam would pull it into the hole.
- Knows when not to push. A look-ahead safe speed (from corner radius, gaps and fly-off zones) caps its pushing, because there are no brakes.
- Rides gently for 600 m after a crash, so one mistake never repeats.

**The line.** Every 0.22 s the game copies the ball (`BallPhysics.copyStateFrom`) and lets the pro drive the copy for about 1.8 s:
- The copy runs in predict mode: it never lights pads or uses up hologram boosts, and the obstacle clock is put back afterwards.
- The result is drawn as a camera-facing glowing ribbon (`src/render/racingLine.ts`), coloured cyan when slow, through magenta, to gold at top speed, and brighter where the ball is airborne.
- A fading ribbon traces the line just taken.
- The camera eases back and up to show it, and a label names the move: PUSH, TURBO, PAD, HOLOGRAM, AIR, GAP, BEAM, GRIP or DODGE.

**Results.** Auto Ball runs don't count as a best time and aren't saved, but "Race the Auto Ball" races its ghost.

**Engine fix found on the way.** Flying over a gutter's gap now keeps the ball on that gutter. Before, a nearby route could claim it in mid-air, and the main course's landing then stopped counting for collisions.

**Pace (v8).** A slider beside AUTO runs from CHILL to RIP:
- **Chill:** no pushing and no show-off jumps; it rolls the line so you can study the course.
- **Rip:** runs it like a racer:
  - harder, faster pushes and turbo
  - the tractor beam held as a booster on clear stretches, keeping a reserve for saves
  - air followed by an early beam back down, because the gutter is faster than the air
  - turns carved high on the outside wall instead of fought

Every pace still respects the look-ahead safe speed. On every world Rip finishes faster than Chill, and both always finish.

**Rip and INSANE (v9).**
- **Rip** treats the beam as the throttle. It gives gas in bursts whenever it's safe, keeping a reserve for saves, and trusts the banked walls to carry far more speed through turns.
- **INSANE** (the button beside AUTO) turns the physics loose: no governors, a huge throttle, and flat out everywhere.
- Labels: GAS is the throttle; CARVE is riding the outside wall.

**Real ripping (v11).** The slider now really scales aggression:

| Mode | Average speed | Throttle held |
|---|---|---|
| Chill | about 167 km/h | none |
| Middle | about 240 km/h | |
| Rip | about 320 km/h, peaks around 500 | up to ~60% of the time |
| Insane | about 455 km/h | |

What made the difference:
1. **The game's throttle was too low for anyone to rip.** The beam on the track now pushes 30 m/s² up to 115 m/s (about 415 km/h). The open gutter cruises at 62 m/s, and a hard ceiling of 160 m/s (260 for Insane) keeps the physics sane.
2. **Rip was too timid:**
   - It lifted before any corner up to about 280 m ahead. Inside the containment walls a hot ball just rides higher up the wall, so Rip now carries speed there and only lifts for open-sky corners and gaps, and never inside closed tubes.
   - It no longer does show-off crest jumps, and it sticks straight back down after small hops, because air is slow and the throttle needs the track.
   - It can hold the gas while swiping.
   - It gives gas only on the floor of the gutter. On a wall, the throttle's press would drive the ball up and over the top.
   - After a crash it rides at a sensible 30 m/s instead of coasting.

The slider is always visible in a race, so you can set the pace first and then hit AUTO. It shows CHILL, CRUISE, FAST or RIP.

## The ball heats up (v11)

Rolling friction at speed heats the steel (visual only, `src/render/ballView.ts`):

- It stays cold below about 200 km/h (55 m/s).
- It turns white hot at about 540 km/h (150 m/s).
- It heats over a second or two of hard rolling and cools more slowly, faster in the air.

The colour runs through a blackbody ramp: dark cherry, red, orange, yellow, white. The heat shows in four ways:

- the steel's own emission, with its mirror reflections washing out as it glows;
- a shimmering halo;
- a light that tints the gutter around the ball;
- once it's orange-hot, sparks thrown off the contact patch.

The Apple Watch ball glows the same way, scaled to the watch's speeds.

## Slow-mo flips and the steady horizon (v11)

At insane speeds the track's frame swings round faster than the eye can follow. Two things fix it:

- **The camera's roll and turn rates are capped.** The cap tightens with speed, from about 5.5 rad/s for roll at 40 m/s down to 1.6 rad/s at 120 m/s, so the world sweeps round you instead of flicking.
- **Time stretches over the top of a loop or roll above 75 m/s.** It slows to as little as 0.55×, like a backflip in slow motion. The ball, the clock and the camera all slow together.

## Smoother graphics (v14)

- **No more flicker at section changes.** The fractal used to move by each section's own flow, multiplied by the whole distance travelled. Where the flow changed from one section to the next, the pattern sheared into a flickering moiré, worse the further you'd gone. Now the pattern's motion is worked out each frame from where the ball is (`uFxPhase`, `uFxTwistPh`, `uFxNow`), so the whole tube moves as one and changes smoothly over time. The phases wrap to stay small, which keeps shader precision on phones.
- **No garbage in the hot path.** The 240 Hz physics step and the Auto Ball's look-ahead steps were allocating vectors, about a thousand a frame with Auto on, which made garbage-collection hitches. They now use scratch vectors.
- **The racing line is spread out.** It used to be worked out in one go every quarter second (135–170 physics steps in a single frame, a hitch each time). Now it's done a slice per frame (35–45 steps), on its own copy of the obstacle clock.
- **Shaders compile while the course loads**, every hidden show, net and sky line included, not mid-ride the first time one comes into view.

## Tube shows are holograms (v14)

Everything a tube show projects is now a hologram, not a painted sticker. The pictures glow and have:
- scanlines rolling upward, with a brighter sweep passing through;
- a slight red/blue split at the edges;
- glitch bands that slip sideways now and then, and flicker;
- a faint projector cone of light from the wall.

The shows:
- **Lasers:** fans of soft, volumetric beams. Each has a hot core, a pulse running along it, and a glowing splash where it lands on the wall. They sweep from emitters low on alternating walls.
- **Fireworks:** a flash, then a scanning shockwave ring, then glittering sparks with soft halos that droop as they fade.
- **Haunted:** ghosts, eyes, skulls, bats and BOO, flickering and glitching.
- **Pinball:** JACKPOT, MULTIBALL, 1000 and the rest, popping up.
- **Day of the Dead (new):**
  - papel picado banners, strung across the upper pipe and fluttering;
  - sugar skulls with flower eyes and a heart nose, marigolds, candles and hearts;
  - a marimba pluck.
- **Rubber ducky (new):** duckies bobbing low on the sides, iridescent bubbles rising through the pipe, and a squeak.

All the art is drawn in code and is original.
