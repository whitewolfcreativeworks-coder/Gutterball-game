# Gutterball — World Mathematics (design bible)

**Idea.** Each world is built on one piece of established mathematics. That math is the world's DNA. It draws the walls (an animated fractal shader), and it shapes the course itself: turn angles, branching, how splits divide, scale steps, and the shape of tubes and rooms. Material physics (friction, bounce, fluid and granular behaviour), sound and haptics then make it feel physically different. One idea per world, expressed everywhere, so no world is a reskin of another.

## Ground rules

- **We write all shader and course code ourselves from public mathematics.**
  - Formulas are free to use. Much published fractal code is not.
  - Shadertoy shaders are CC BY-NC-SA (non-commercial) unless the author states otherwise.
  - Marble Marcher is GPL-2.0.
  - Copies of Shadertoy code on other sites are often relicensed without the right to do so. Study techniques; never copy code.
- **Shipped components must be permissive:** MIT, BSD, Apache-2.0 or CC0. Each one is recorded in `docs/ASSETS.md`.
- **GPL or non-commercial tools are workshop-only.** Examples: Mandelbulber, flame editors, Blender. We ship only their output, after checking each tool's terms on output.
- **Geometry rule from the research:** use the fractal for the *topology* (angles, branching factor, scale steps). Smooth it with our spline turtle. Cap recursion at 2–3 levels for anything you ride on: infinite detail is unrideable.

## Shared technical rules (all twelve wall shaders)

1. **Precision.**
   - Wrap the along-course coordinate on the CPU (`s mod P`, with P a power of the world's scale factor: 3^k for Menger, 2^k for Hilbert…). Iterations then run on bounded values.
   - Coordinates stay highp. mediump at s = 1000 m would step about 0.5 m.
2. **Seamless pipes.** The across-wall period must divide the pipe circumference exactly. This is already done for Wood: `kx` is snapped so the pattern wraps round the tube.
3. **Anti-aliasing.**
   - Use `fwidth()` as the pixel footprint.
   - Drop iterations or octaves whose features are smaller than about 2 px, cross-fading the last one.
   - Draw lines as `smoothstep(w − fw, w + fw, d)`.
   - This is the main defence against moiré on grazing-angle tube walls. It matters most for Menger, Hilbert and Voronoi, which are hard-edged patterns.
4. **Temporal stability.**
   - The pattern scrolls with the surface; no "swimming".
   - Parameters ease slowly.
   - Prefer seamless loops: zoom by the world's scale factor and wrap, or rotate by its symmetry angle.
   - Avoid parameter jumps that change topology (Julia, KIFS), because they flicker.
5. **Palette.**
   - Cosine palettes, `a + b·cos(2π(c·t + d))`: four vec3 per world.
   - Palette cycling comes free by adding time to t.
   - Drive t from continuous values (smooth iteration count, trap distance), never integer counts.
6. **Comfort and readability.**
   - The floor or racing line stays calmer and lower-contrast than the walls and roof.
   - Ball and obstacles always contrast with the pattern.
   - No flashing faster than 3 Hz and no large saturated-red flashes (photosensitivity guidance).
   - Intensity sliders already exist. Add a photosensitivity note in Settings.
7. **Budget.**
   - About 10–30 loop iterations per pixel.
   - Evaluate the fractal once per pixel, plus one cheap parallax layer.
   - The hardest pieces are baked to textures: reaction-diffusion (or a small live simulation), fractal flames, DLA frost.
8. **Same frame for everyone.** Every world keeps the shared systems:
   - layered parallax, warp rings in tubes, mist streaks;
   - pneumatic tubes, calm currents at splits, Y-junctions, the rolling tube camera.

---

## 1 · WOOD — Kali set *(free; built)*

- **Math:** p ← |p| / (p·p) − c, with orbit traps. Folding plus inversion gives swirling nested cells.
- **Walls:** organic filaments in warm amber and orange. Built: two parallax layers, hue cycling, warp rings.
- **Course geometry:** gentle meanders with mirrored S-pairs, plus classic coaster vocabulary: drops, camelbacks, banks, corkscrew, loop.
- **Signature:** launch-tube split (The Plunge / Daybreak), The Burrow with the Skylight, the High Road, the bridge roof, the spiral tube.
- **Role:** the introduction and the reference for everything else.

## 2 · CONCRETE — Menger sponge / Sierpinski carpet

- **Math:** scale 1/3. The carpet keeps 8 of 9 squares (dimension ≈ 1.893); the sponge keeps 20 of 27 cubes (≈ 2.727). There are three orthogonal families of square tunnels.
- **Walls:**
  - Carpet test per level: a hole wherever `floor(p·3^i) mod 3 == (1,1)`.
  - Box-fold distance for bevels and fake ambient occlusion.
  - Level of detail by footprint.
  - Animate by a fractional zoom ×3^t, wrapped, which gives an endless dive into the sponge.
  - Brutalist grey with a cyan-blue glow.
- **Course geometry:**
  - **Square-section tubes.** New profile: flat walls and a flat roof.
  - **90° turns only,** with crisp switchbacks along aqueducts.
  - **Splits in threes:** the 3×3 face of a block with a void centre means through the middle or one of two side corridors.
  - **Zoom-in climax:** the same sequence repeats at 1/3 scale, tighter and faster.
  - A diagonal slice shows hexagram cross-sections, a surprise reveal window.
- **Obstacles:** cubes and cube-holes in square grids; gates are carpet holes you must thread.
- **Feel:** precise and hard. Rough, abrasive friction; sharp echoes in square tunnels.

## 3 · SHEET METAL — Mandelbox / kaleidoscopic IFS

- **Math:**
  - Box fold, sphere fold, then scale and translate (Lowe, 2010).
  - KIFS: abs folds, plane reflections, rotation, then scale (Knighty).
  - Distance estimate ≈ |p| / |dr|.
- **Walls:**
  - 2-D folds with orbit-trap banding, giving brushed and riveted chrome.
  - Rotate the fold angle very slowly; small changes produce big pattern changes.
  - Electric blue and violet.
- **Course geometry:**
  - Box rooms (sharp 90°) alternate with sphere-fold chambers (loops, inversion bowls).
  - **Mirrored twin tracks** from the kaleidoscope's fold planes: a split into two mirror-image routes that reflect each other and merge.
  - Loops inside tubes.
- **Obstacles:** symmetric pairs mirrored across the centreline.
- **Feel:** fast and ringing. Magnet-heavy (it's metal); inverted sections.

## 4 · ICE — hexagonal frost / dendrites

- **Math:** six-fold symmetry (D6), with branches every 60°. Side branches run parallel to the neighbouring arms and shrink by about 0.4–0.5 per level. 2-D DLA has dimension ≈ 1.71.
- **Walls:**
  - Fold into a 30° wedge, then a branch IFS with crisp segment distances.
  - Each hex cell gets jittered branch lengths from a hash; domain-warped "rime" frost on top.
  - Animation: crystals grow along the walls as you pass. Pale cyan and violet.
- **Course geometry:**
  - **A central spine with spurs splitting off at 60°,** getting shorter downstream: every split is a 60° fork.
  - Long sweeping 60° and 120° drift turns.
  - **Hexagonal ice caves:** a new hex-section tube profile.
- **Obstacles:** ice crystals in hex clusters; spurs dead-end into the magnet-rescue zone.
- **Feel:** low friction and long drifts. Silence broken by sharp cracks.

## 5 · WATER — domain-warped flow + caustics

- **Math:**
  - Domain warping, `f(p + k·fbm(p + k·fbm(p)))` (Quilez).
  - Flow noise with rotating gradients (Perlin–Neyret).
  - Two-layer flow maps cross-faded half a cycle apart.
  - Caustics from sharpened F2 − F1 Voronoi ridges.
- **Walls:** liquid light. Caustics stream at the water's flow speed, ridge sharpness fades with distance, aqua and blue.
- **Course geometry:**
  - **Sine-generated meanders:** heading varies sinusoidally with distance (Langbein–Leopold). Natural wavelength is about 10–14 channel widths, bend radius about 2–3 widths (approximate).
  - **Braided channels:** many splits that rejoin, like a river delta.
  - Waterfalls as drops; flumes and underwater tube sections.
- **Obstacles:** rocks that split the current; whirlpool bowls.
- **Feel:** buoyancy, drag and currents (already in the physics); muffled sound underwater.

## 6 · GLASS — Apollonian gasket

- **Math:**
  - Mutually tangent circles; repeated circle inversion. Gasket dimension ≈ 1.306.
  - Descartes' theorem: k₄ = k₁ + k₂ + k₃ ± 2√(k₁k₂ + k₂k₃ + k₃k₁).
  - Integer gaskets such as (−1, 2, 2, 3) keep every curvature an integer.
- **Walls:**
  - Inversion loop per pixel (10–30 iterations), coloured by inversion count.
  - Thin rim highlights; fake refraction.
  - A slowly moving Möbius transform makes it "breathe" seamlessly. Pink and mint.
- **Course geometry:**
  - **A chain of circular bowls,** each a loop or banked spiral.
  - The track hands off at **tangency points.**
  - Each next bowl is **smaller, with its radius given by Descartes,** a natural descending-scale sequence.
  - **Bubble tubes:** circular rooms threaded by pipes. It's transparent, so you see the whole gasket around you.
- **Obstacles:** glass spheres sized by the same curvatures.
- **Feel:** bright, sharp impacts and delicate ringing; exposed heights.

## 7 · RUBBER — reaction–diffusion (Gray–Scott)

- **Math:**
  - A′ = D_A∇²A − AB² + f(1 − A); B′ = D_B∇²B + AB² − (k + f)B.
  - Constants: D_A = 1, D_B = 0.5, f ≈ 0.055, k ≈ 0.062.
  - The (f, k) map (Pearson / Munafo xmorphia) picks spots, mitosis, coral or labyrinths.
- **Walls:**
  - A **live simulation:** a 256² or 512² tile with wrapped edges, 8–20 steps per frame, ping-ponged on the GPU and sampled onto the walls with crisp thresholds.
  - Shift (f, k) by course section: spots, then mitosis, then labyrinth.
  - Fallback where half-float render targets aren't available: a pre-baked loop or a cheap band-passed noise fake.
  - Neon magenta and cyan.
- **Course geometry:**
  - **A labyrinth of uniform-width corridors,** like a Turing stripe pattern.
  - **Mitosis splits:** a track pinches and divides like a dividing cell, then divides again.
  - Spot-field obstacle courses.
- **Feel:** grippy, elastic rebounds and squeaks.

## 8 · SAND — fractal ripples + girih star tilings

- **Math:**
  - Multi-scale asymmetric ripples: gentle windward slope, steep lee slope.
  - Girih tiles (decagon, hexagon, bowtie, rhombus, pentagon), with **all angles multiples of 36°**.
  - Self-similar subdivision by the golden ratio φ ≈ 1.618 (Lu & Steinhardt, 2007).
  - Angle of repose ≈ 30–34°.
- **Walls:**
  - Rippled dunes in motion (windblown), overlaid with glowing 10-point star patterns from polar folds and Hankin rays.
  - A quasiperiodic version is a stretch goal. Gold and orange.
- **Course geometry:**
  - **36° and 72° turns.**
  - **Decagonal courtyard loops** in the ruins.
  - Ramps up dune faces at about 30°.
  - Golden-ratio scale steps between sections.
- **Obstacles:** ruin columns on a decagonal pattern; drifting sand banks (loose versus packed lanes, already in the physics).
- **Feel:** momentum management, dry scraping.

## 9 · MUD — multi-scale Voronoi cracks

- **Math:**
  - Worley noise; crack distance is F2 − F1, or exact distance to the cell edges.
  - Cells average 6 sides and meet at Y-junctions near 120°.
  - Fresh cracks form T-junctions at 90° that drift toward Y over drying cycles (recalled from research, to verify).
- **Walls:**
  - Clay plates with a second, finer crack level inside each plate.
  - Each plate domes and curls with depth shading.
  - Cracks **grow** over time (the threshold widens); the seed points never move. Green and teal glow in the cracks.
- **Course geometry:**
  - **The track runs along a crack network.**
  - **Every junction is a three-way choice** at about 120°.
  - Polygonal cell rooms; sticky slow sections against slick fast ones.
- **Obstacles:** raised clay plates; sinkholes.
- **Feel:** viscous, sudden grip changes (already in the physics), wet squelches.

## 10 · POLISHED STONE — Julia-set marble

- **Math:**
  - z ← z² + c, with smooth iteration count.
  - Distance estimate 0.5·|z|·log|z| / |dz|, giving thin veins.
  - Marble turbulence from fBm fed into c.
- **Walls:**
  - White and gold marble veins.
  - c drifts slowly on a small circle near the Mandelbrot boundary; large moves flicker.
  - Tiled by mirrored windows; the most precision-sensitive world, so highp throughout.
- **Course geometry:**
  - **Equipotential sweeps:** smooth curving lines that circle the set.
  - **External-ray dives:** steep radial plunges.
  - **Pinch points become narrow technical passages.**
  - Dendritic Julia sets (c = i) branch in threes, giving 3-way temple forks.
  - Many tunnels (temple corridors).
- **Feel:** fast, precise and hard; crisp echoes.

## 11 · STEEL GRATING — Hilbert / space-filling curves

- **Math:**
  - Hilbert curve: 90° turns only; each level subdivides 4-fold at half scale; path length doubles per level; nearby points stay nearby.
  - The Moore curve is the closed-loop version.
  - Variants: Peano (3×3) and Gosper (hexagonal).
- **Walls:**
  - Per-pixel Hilbert index (an O(n) bit loop) draws **circuit traces.**
  - Light pulses travel along the trace by index, like data flowing.
  - Lower n with distance, because grids moiré badly. Orange and amber on black.
- **Course geometry:**
  - **Zigzag hairpin sequences:** pairs of 180° U-turns, the signature.
  - The density increases level by level toward a **switchback finale.**
  - Grating platforms at each level; open grating over deep drops.
- **Obstacles:** a periodic rattle-strip rhythm synced to the curve; gates at turn nodes.
- **Feel:** rhythmic chatter and bouncing (already in the physics).

## 12 · SNOW — Koch snowflake + fractal flames

- **Math:**
  - Koch: turns of +60°, −120°, +60°; scale 1/3; 4 segments per level; dimension ≈ 1.262.
  - Perimeter grows ×4/3 per level while area converges to 8/5 of the starting triangle.
  - Fractal flames: chaos game with nonlinear variations and log-density tone mapping (Draves).
- **Walls:**
  - **Koch fold distance estimator** (per pixel, crisp), morphing its fold angle; 60° is Koch, other angles give Cesàro variants.
  - A **baked fractal-flame glow layer** behind it (flames can't run per pixel). Ice blue and lilac.
- **Course geometry:**
  - **Notched turn sequences:** a straight, a 60° kink out, a 120° kink back.
  - The perimeter grows as you go: each section adds notches at 1/3 scale.
  - An "anti-snowflake" inward variant.
  - Swirling spiral sections from the flame layer.
- **Feel:** soft compression, packed versus powder lanes (already in the physics), wind.

---

## New engine pieces this needs

| Piece | For |
|---|---|
| Profile variants: **square** and **hexagonal** tube cross-sections (same SDF approach, with matching mesh rings) | Concrete, Ice (also usable elsewhere) |
| **Course-from-math generators:** each world's topology rule outputs a segment list (angles, branch points, scale steps) that our turtle smooths, with branches solved to rejoin as before | all eleven new courses |
| **N-way splits:** junctions with 3 routes | Concrete, Mud, Stone |
| **Pattern library:** one shader module per world, sharing the precision, wrap, fwidth and palette helpers | all |
| **GPU ping-pong simulation** with a half-float check and a fallback | Rubber |
| **Offline bake pipeline:** flames and frost to texture loops, with provenance logged | Snow, Ice |
| **Wrapped along-course coordinate** (CPU `s mod P`) | all |

## Status

- **Step 1 done (wall patterns):** all twelve wall patterns are implemented, each with its own colour discipline. The `psy` setting controls how far colours cycle: Rubber and Glass go full spectrum; Ice, Stone, Concrete and Sand keep their palettes. Patterns were tuned apart so no two worlds share the same visual complexity and density.
- **Glass still needs its own design pass:** see-through tubes wash out the pattern.
- **Rubber:** uses the band-passed-noise labyrinth for now. The live reaction-diffusion simulation is still to come.

## Build order (proposal)

1. **The pattern library and all twelve wall shaders.** Fast to see, and lets you compare the worlds side by side early.
2. **Concrete:** square tubes, 90° switchbacks, three-way splits. It's the most different from Wood, so it proves the concept.
3. **Mud:** the crack-network course with three-way 120° choices.
4. Then one world at a time, each with its own layout and signature features, tuned by your playtesting like Wood was.

## Sources

- Inigo Quilez's articles (palettes, domain warping, Voronoi edges, fwidth filtering, orbit traps, Apollonian), iquilezles.org/articles. His shader code is mostly on Shadertoy under the non-commercial licence, so read the maths only.
- Syntopia (Mikael Hvidtfeldt Christensen), *Distance Estimated 3D Fractals* (folding, KIFS, Mandelbox), blog.hvidtfeldts.net.
- Karl Sims, Reaction–Diffusion tutorial, karlsims.com/rd.html. Pearson / Munafo xmorphia, mrob.com/pub/comp/xmorphia.
- Draves & Reckase, *The Fractal Flame Algorithm*, flam3.com/flame_draves.pdf.
- Lu & Steinhardt, *Decagonal and Quasi-crystalline Tilings in Medieval Islamic Architecture*, Science 315 (2007).
- Shaker, Togelius & Nelson, *Procedural Content Generation in Games*, ch. 5 (grammars and L-systems), pcgbook.com.
- Voncken (2017), L-system maze generation (Radboud bachelor thesis).
- Marble Marcher, Community Edition (GPL-2.0, study only): the marble collides with the fractal's distance estimator, and animated parameters reshape the course.
- Yale circle-inversion fractals; the Apollonian gasket construction (blancosilva.github.io).

**To verify before relying on them:** Shadertoy's exact default-licence wording; half-float render-target support across iOS devices; meander ratios; the T-to-Y crack-junction paper.
