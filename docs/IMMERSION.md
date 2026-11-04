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
