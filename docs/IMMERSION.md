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
