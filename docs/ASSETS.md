# Assets and licences

## Shipped assets

| Asset | Source | Licence |
|---|---|---|
| All track surface textures (12 materials: colour, normal, roughness, alpha) | generated at runtime, `src/render/textures.ts` | original, project-owned |
| Ball surface details & Roly-Poly skin | generated, `textures.ts` | original |
| Terrain, trees, rocks, buildings, mesas | generated geometry, `src/render/world.ts` | original |
| All sound (rolling, sliding, impacts, wind, magnet, ambience, music pad) | synthesised at runtime, `src/audio/audioEngine.ts` | original |
| Sample ad spots (fictional brands) | procedural canvas animation, `src/commerce/adRoom.ts` | original; brands are invented |
| App icon (`public/icon.svg`) | hand-written SVG | original |

No third-party images, models, sounds or fonts are bundled.

## Third-party code (npm)

| Package | Licence | Use |
|---|---|---|
| three (incl. `examples/jsm/objects/Sky.js`) | MIT | rendering, sky dome |
| vite | MIT | build (dev only) |
| typescript | Apache-2.0 | build (dev only) |
| vitest | MIT | tests (dev only) |
| puppeteer-core | Apache-2.0 | smoke test (dev only) |

## Web fonts

Bricolage Grotesque and IBM Plex Mono are loaded from Google Fonts (SIL Open Font License 1.1) at runtime; the UI falls back to system fonts offline. For the native build, self-host the font files (OFL permits redistribution) to avoid the network request.

## Candidate future sources (not yet used)

Poly Haven (CC0 HDRIs/textures/models), ambientCG (CC0 PBR materials), Kenney and Quaternius (CC0 models), freesound.org (check each sound's licence individually). Record each addition here with URL, author and licence.

## Shader code

All twelve world wall patterns (`src/render/fractal.ts`) are original code written from public mathematics: the Kali set, Sierpinski carpet, Mandelbox, hexagonal branch IFS, flow warp, Apollonian inversion, band-passed noise, girih star polygons, Voronoi (Worley) F2−F1, Julia distance estimate, Hilbert curve and Koch fold. No Shadertoy or GPL code was used.

- **"lowbias32" integer hash** by Chris Wellons, used for noise and Voronoi seeds. Public domain (Unlicense).
- **Hilbert curve xy↔d conversion:** the standard published bit-manipulation algorithm, reimplemented.
