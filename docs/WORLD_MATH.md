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
7. **Ball contrast pairing (always).** The ball must stand out from every medium.
   - **Bright worlds** (Stone, Snow, Ice, Glass, Sand, Water, Concrete, Metal): in the open gutter the ball turns dark gunmetal chrome, and the walls may use lighter, pastel patterns.
   - **Dark worlds, and every tube:** the ball is bright polished steel, so the walls must be dark and high-contrast, with a calmer floor around the ball.
   - The ball always has a thin black silhouette outline.
   - The shaders read the ball's current finish (`uFxBallDark`) and pair their contrast with it automatically.
   - **Obstacles** are the one thing that never moves: one flat colour opposite the world's palette, with a thick black outline and no fog.
8. **Budget.**
   - About 10–30 loop iterations per pixel.
   - Evaluate the fractal once per pixel, plus one cheap parallax layer.
   - The hardest pieces are baked to textures: reaction-diffusion (or a small live simulation), fractal flames, DLA frost.
9. **Same frame for everyone.** Every world keeps the shared systems:
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

## Course styles: each world rides differently

Each world gets one coaster or track style that fits both its material physics and its math, plus one main **verb** (what you mostly *do* there), its own intensity curve, and one signature moment. This follows the research on coaster styles, bobsleigh tracks, Trackmania surface identities and pacing.

### Physics rules for a free ball (it isn't locked to rails like a coaster train)

- **The trough banks itself.** In a turn the ball settles on the wall where tan θ = v²/(gR). Wall height and cross-section matter more than the built-in bank.
- **Any crest faster than √(g·R) is a jump.** There are no up-stop wheels, and the magnet plays that role.
- **Inversions need a tube, speed, or the magnet.** A ball rolling without slipping needs about 2.7 r of starting height for a circular loop. Rolls produce no holding force: a beautiful float inside a tube, a fall in the open.
- **Shrinking loops absorb energy loss,** because a smaller loop needs less speed at the top. That's the physics behind Glass.
- **Unbanked hairpins become wall-rides,** so wall height is the hazard. That's the physics behind Grating.

### Pacing principles

- **Build an intensity curve, with rests** such as helices and slow sections.
- **One signature moment per course,** foreshadowed early and echoed at a smaller scale. That fits the fractal self-similarity.
- **Contrast:** open against enclosed, loud against quiet.
- **Teach, develop, test, conclude:** introduce the world's quirk safely, then build on it.
- **Make splits differ in kind** (fast and risky against long and safe), and readable about 2 s ahead.
- **Finish with a callback** to the signature, at full scale.

| World | Style | Verb | Intensity curve | Signature moment | Splits |
|---|---|---|---|---|---|
| Wood | Classic coaster intro (reference) | learn everything | big drop first, varied, loop finale | tube splits, corkscrew, loop | tube splits, High Road |
| Concrete | Storm-drain "tech": square culverts, 90° box corners, stepped spillways | manage momentum, brake by line | stop-start, rising | **The Sponge:** Menger cross with a 3-way split | always threes |
| Sheet metal | Launched duelling looper | magnetise and invert | launch, high throughout, relaunch | **interlocking twin loops;** hop to the mirror track | mirrored twins |
| Ice | Olympic bobsleigh run | drift and pick your line | builds all the way down | **The Kreisel:** a ~330° near-vertical-wall circle | 60° dendrite branches that rejoin |
| Water | River run / water coaster | read the current | calm, rapids, calm, plunge | **The Oxbow:** jump the neck of a meander | braided channels |
| Glass | Sky looper: Apollonian cascade | hold a precise line at height | exposed climb, then a shrinking cascade | **The Gasket:** tangent loops shrinking big → small | inner (small, fast) or outer circle |
| Rubber | Rebound labyrinth (pinball meets spinning mouse) | bounce and grip | playful, chaotic middle | **The Mitosis Chamber:** a blob pinches into two lanes | mitosis pinches |
| Sand | Dune terrain coaster | keep momentum, pick firm ground | long swells, slip-face plunges | **slip-face plunge into the girih star courtyard** (exits 72° apart) | firm against loose lanes, radial exits |
| Mud | Crack delta ("Plinko" descent) | choose at 120° forks | heavy and slow, bursts of drops | **The Crack Delta:** a cascade of Y-forks | many 120° forks |
| Polished stone | Hyper and dive coaster | hold top speed through pinch points | suspense hold, biggest drop, sweeps | **The Radial Dive:** teeter at a lip, then a near-vertical plunge | inner or outer lobe at pinch points |
| Steel grating | Wild-mouse switchback stack (Hilbert) | survive hairpins in rhythm | climb, frantic hairpins, drops | **The Hilbert Stack:** stacked hairpins with drop hatches | vertical shortcuts |
| Snow | Alpine slalom and ski jump | carve and fly | gentle, slalom, giant air | **The Ski Jump:** long flight, magnet landing | Koch notch cut-throughs, packed against powder |

**Distinctness:**
- **Inversions:** Metal and Glass. Wood has a few as the intro.
- **Big air:** Snow, Sand, Rubber and Stone.
- **Pure wall-riding:** Ice, Grating and Concrete.
- **Most decisions:** Mud, Water and Concrete.
- **Fastest:** Stone, then Ice and Metal. **Slowest:** Mud and Snow.

The detailed ride-order sequences for each world come from the research report. They are built world by world; see the course files under `src/courses/`.

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

## Second acts (v2)

Every course gained a second act built from the new elements in `src/courses/elements.ts`: vortex (a tightening helix), sweeper (a fast bend that uses the built-up wall), wave turn, pretzel, terraces, covered tunnel run, plus obstacle fields (zigzag, post slalom, gates, colonnade).

| World | Act II | New length |
|---|---|---|
| Wood | The Sawmill | 4.8 km |
| Concrete | Treatment Works | 3.0 km |
| Metal | Rolling Mill | 3.6 km |
| Ice | The Crevasse | 4.0 km |
| Water | Delta & Caves | 3.7 km |
| Glass | Prism Heights | 3.5 km |
| Rubber | Bounce House | 2.8 km |
| Sand | Sandstorm Canyon | 3.3 km |
| Mud | Landslide | 2.6 km |
| Stone | The Colonnade | 3.0 km |
| Grating | Catwalks | 3.0 km |
| Snow | Backcountry | 3.4 km |

Every course is checked so that no two passes of the gutter come within each other's walls.

## Round 3: tubes, pipe corners, lift hills

- **Tubes are the hook.** Every course has more tube: 25–46% of its length (it was 2–26%).
  - New `tubeRun` (long winding fractal tube).
  - `pipeCorner`: a fast bend inside a full pipe. With speed and a lean into the wall you ride up, over the top and down the far side.
  - Helices, vortices, pretzels, labyrinths and turns accept `{ tube: true }`.
- **Lift hills.** Classic coaster stomach drops in Wood (The Big One), Metal, Glass, Stone, Snow, Water, Grating, Sand, Concrete, Rubber and Mud.
- **Moving obstacles** (`field(..., 'sliders')`):
  - drifting logs on Water
  - rolling boulders on Mud
  - sliding crates on Grating
  - pillar-gap sliders in the Stone colonnade
  - the sliding log in Wood's Sawmill
- **Finishes.** Each world ends in a chain-reaction contraption (`src/finale/finale.ts`):
  - Plinko: Wood, Rubber, Grating
  - Domino chain: Concrete, Stone, Sand
  - Hoop shot: Metal, Mud
  - Chime stairs: Glass, Ice
  - Wishing-well funnel: Water, Snow

## Round 7: splits are routes

- **A split is a choice of a whole different ride to the end.** `BranchSpec.toFinish` makes a route that never rejoins:
  - it has its own finish line and FINISH arch, and its own finish machine
  - hints, progress and checkpoints all follow the route you're on
  - `from` lets a route fork off another route (splits split again)
- **Easy to choose.** Each route peels off a long straight with a gentle 22° S, under a sign arch, with a hint. Drift toward that side and you're on it.
- **Air transfers.** Every route runs alongside its parent for ~160 m, about 26 m to the side and roughly level. Both gutters are open above their walls there.
  - With a big air, steer across, and the beam lands you on the other route. Its finish becomes yours.
  - The physics picks whichever gutter you touch, and the beam aims at the gutter beneath you.
- **Routes:**

| World | Route | Fork | Character |
|---|---|---|---|
| Wood | Ridge Route | woodFork, before the Burrow | Rollers, berm, tabletop, pipe corner, rolling logs, vert wall, bowl, gully, lift hill |
| Concrete | Sewer Express | sponge | Pipes, pipe corner, slider yard, twin vert walls, settling bowl, spillway, lift |
| Metal | Magnet Mile | twins | Loop cascade, double roll, slider yard, pipe corner, gap jump, funnel, loop |
| Ice | Crevasse Run | dendrite | Tube labyrinth, ice bowl, serac rollers, berm, tabletop, blue tube, vert wall, lift |
| Water | Whitewater | braids | Rapids rollers, sweepers, log jam, bowl, underground river, cascades, falls |
| Rubber | Trampoline Park | mitosis | Pump track, berm, trampolines, vert ramps, bumper sliders, spiral, tabletop, gully |
| Sand | Oasis Road | courtyard | Dunes, berm, wadi jump, tabletop, kasbah tube, bowl, souk posts, dune face |
| Mud | Mudslide | fork1 | Slide pipe, dirt section, bowl, lift; forks again into **Swamp** (bog rollers, berm, mangrove tube, stump sliders, vert wall, gully) |
| Stone | Catacombs | pinch | Crypt tubes, spiral stair, ossuary colonnade, vert wall, the well, dive |

- **Tests:**
  - the autopilot rides every route from its fork to its own finish (at most two falls, finishing on a route)
  - no route overlaps another gutter
  - an air transfer from Wood's main gutter lands on the Ridge Route
  - the ball never passes *through* a wall (flying out over the top is allowed)
