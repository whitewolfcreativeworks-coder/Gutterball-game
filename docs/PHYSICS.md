# Physics

## Track geometry

**Cross-section** (`src/track/profile.ts`): flat floor half-width `a = 1.7 m`, fillet radius `rc = 2.5 m`, vertical walls to `H = 3.8 m`, shell thickness `0.28 m`. Total inner width 8.4 m vs. a 0.72 m ball (≈ 12 ball diameters). `innerSignedDistance(x, y)` is the exact distance to the floor/fillet/wall curve; `shellSDF` makes it a solid shell, optionally with a roof (tunnels).

**Centreline** (`src/track/track.ts`): a list of segments `{len, yaw, pitch, bank, loop, shift, tunnel, gap}` integrated at 0.5 m. Frames: `T` forward, `U` floor normal, `R` right. A ball's world position is projected to `(s, x, y)` by a local search from the previous sample (essential where the track passes near itself).

**Track SDF** `sdfLocal(s, x, y)` = gutter shell ∪ obstacles (rounded boxes in track coordinates) ∪ end caps; gaps remove the shell. The contact normal is the central-difference gradient, mapped to world space through the frame.

## Ball

Solid steel sphere, `r = 0.95 m`, `I = 2/5 m r²`. State: position, velocity, angular velocity, orientation quaternion (integrated from ω — the rendered spin *is* the simulated spin).

Fixed step 1/240 s (`Run` accumulates frame time).

Per step:
1. Forces → velocity: gravity, quadratic air drag (game-scaled), medium forces, steering/propulsion (gyro torque + field force), magnet, jump impulse.
2. Integrate position.
3. Up to 3 contact iterations: push out of penetration along the SDF normal; normal impulse with restitution above a speed threshold; Coulomb friction impulse at the contact point using the sphere's tangential effective mass `2m/7`. If the impulse to stop slip exceeds `μs·Jn`, apply `μk·Jn` instead (sliding).
4. Rolling resistance `Crr·N` and spin damping about the normal.
5. Classify: `rolling` (contact-point slip < 0.25 m/s), `sliding`, `skidding` (> 2.5 m/s), `airborne` (no contact for > 60 ms, debounced).
6. Emit sensory events.

Wall climbing is not scripted: in a turn the floor's centripetal impulse and gravity decide how high the ball rides (tested: faster = higher on the outside wall).

## Materials

`src/physics/materials.ts` — one profile per world. Physical fields: `muStatic`, `muKinetic`, `rollingResistance`, `restitution`, `restitutionThreshold`, `spinDamping`, `compliance`, `seamSpacing`, `medium`.

Medium models (practical approximations, as the brief allows):

| Medium | Model |
|---|---|
| water | submersion from depth; buoyancy fraction of g; drag toward a flow velocity along the channel; grip reduction; angular damping |
| sand | higher Crr + speed-proportional sinkage drag; loose sides vs. a firm centre line |
| mud | viscous drag; grip varies along the course (sudden slips) |
| snow | packed centre lane vs. draggy powder on the sides |
| grating | bar crossings every 0.3 m give small normal kicks (rattle/bounce) |

## Tuning values (provisional)

Steering 7.5 m/s² (35 % direct), air steer 2.6 m/s², propulsion levels 0 / 1.6 / 3.6 m/s² fading out at 0 / 22 / 31 m/s (never brakes), jump 7.2 m/s with 0.55 s cooldown and 0.12 s coyote time, magnet **clamp** in contact: 4.2 g press, 1.8× grip, no bounce, hops off the surface damped, and 90 % of gravity's pull *around* the gutter cancelled (so you hold your place on a wall or the roof of a pipe, while the downhill pull along the course is untouched), plus a forward boost of 14 m/s² fading out near 62 m/s; airborne: an instant lunge toward the surface on engage, then a 62 m/s² pull within 26 m (full strength after 0.1 s), closing speed limited to 9 m/s + 4 m/s per metre of distance; one double jump per flight. Energy (drain 0.1/s on the track, 0.16/s in the air; refills in ~2 s) limits only the on-track booster/clamp: the tractor beam in the air always engages and still pulls at 65 % with an empty meter. Steering 17 m/s² (60 % direct) with a grip assist that settles sideways sliding when you ease off the tilt; air steering 7.5 m/s² (×1.8 while the beam pulls). Tilt: jump on an 8° backward flick; magnet on a 9° forward tilt held for 80 ms, and blocked for 0.45 s after a jump flick, so the wrist springing back can't yank you out of your own jump; the neutral pose follows your grip (~4 s) while you're not jumping or holding the magnet. Inside tubes an air current pushes you along (9 m/s², fading out near 46 m/s).

## Validation

`tests/physics.test.ts`: profile continuity, frame orthonormality through loops, downhill acceleration vs. the rolling-sphere law `a = 5/7 g sinθ`, rolling constraint `|ω|r ≈ |v|`, ice slides far longer than wood, steering has no position jumps, outside-wall climb grows with speed, jump preserves forward momentum and is debounced, magnet is a bounded force, no tunnelling at 45 m/s lateral impact, seam event count matches distance, loop traversal, water buoyancy/current.

`tests/courses.test.ts`: every catalog course completes under the autopilot (which only uses player inputs).

## Built-up corners

- `Track.raiseCornerWalls()` finds corners where a ball at racing speed (55 m/s) would ride high up the wall. It takes the lean angle tanθ = v²κ/g, subtracts the bank the track already has, and raises the **outside** wall by up to 8 m. The rise is spread before and after the turn so the line flows. Tubes and tunnels are never raised.
- A raised wall ends in a smooth **overhang**, like a bobsleigh lip (radius 2.4 m, sweeping up to 110°), instead of the flat flange. A ball riding all the way up is curled back down, not stopped.
- **Spin transport.** While in contact, the ball's spin is rotated with the contact normal every step, as a ball rolling smoothly over a curve does. Without this, the jump from floor to wall made the ball skid and lose about 2/7 of its kinetic energy, and every wall ride bled speed. Test: a 120° unbanked corner entered at 42 m/s now exits at about 37 m/s (it was 20).

## Tractor beam (v2)

- **In the air** the beam aims at the **centre of the gutter**: the target is 20% of your sideways offset, so a toss always comes home to the middle of the floor. It pulls at up to 115 m/s², has a 60 m range (was 26) and works at full strength whatever the energy level.
- **Homing.** A side damper cancels drift across the gutter, and the climb is killed at once.
- **Soft landing.** Close to the surface the allowed closing speed falls to about 8 m/s. Once you are coming in faster than that, the beam stops pulling and brakes instead, so you land firmly without a slam.
- **On the track** (press, grip and booster) the beam is unchanged.
- **Test:** a ball tossed 40 m up, still climbing at 15 m/s and drifting sideways, lands in about 1.1 s within 1.5 m of the centre line, with its forward speed kept.

## Round 3 mechanics

- **Tractor beam on the track you're on.**
  - In contact (a floor, a wall, a roof, the outside of a pipe), the beam presses you onto that surface.
  - In the air it picks the track directly beneath you (the High Road, a branch, a covered section's roof) instead of always the main gutter.
- **Moving obstacles.** `ObstacleSpec.move = { amp, period, phase }` slides a block side to side: x = x0 + amp·sin(2πt/period + phase).
  - The clock is `Track.time`, advanced by the ball physics, so rendering and collision agree.
  - Collisions resolve against the block's velocity, so a sliding block shoves you.
  - A dark floor slot with bright end stops shows each block's range.
  - The autopilot predicts where a block will be when it arrives.
- **Spin carried across landings.** The take-off surface normal is kept through a flight. On touchdown the spin is rotated onto the new surface before friction acts. Landing on the far wall of a pipe no longer skids away a third of your speed.
- **Chain lifts.** `Segment.lift = speed` holds the ball at that speed along the course (hauling a slow ball, reining in a fast one) and keeps it centred, with a clack every 1.2 m.
  - `liftHill()` = chain climb → open-sky crest → near-free-fall tip-over → 55–75° plunge → pull-out.

## Round 4: lips, walls, skate-park features

- **Tiny lip.** The wall tops have a 0.45 m rounded bead. It replaces the 1.4 m flat flange, which popped fast balls riding high. The 110° overhang on built-up corners is retired too.
- **Raised walls** (built-up corners, vert walls):
  - They have no bead. As a raised wall tapers back down, a bead would sweep down onto a ball riding high like a ceiling.
  - Their invisible containment stops 2.6 m above the top. A ball hot enough to clear one flies out for real, and the tractor beam brings it home.
  - Corner walls are sized for thumb-push speeds: v = 68 m/s, up to +12 m.
- **Continuity rule.** Every per-sample quantity that shapes the collision surface (tube curl, wall heights, floor width) is interpolated linearly along the course. A value looked up by nearest sample changes in steps. To the finite-difference collision normal each step is a small wall across the track, and at 30+ m/s it stops the ball dead.
  - This was found when the funnel bowl's width steps knocked a 34 m/s ball down to 4 m/s.
  - Stepped wall heights may also have added to the "pop" high on built-up walls.
- **Vert wall** (`vertWall`): a 60° kink with a 28 m outside wall. The ball climbs as high as its speed allows, then drops back in. It climbs 10–40 m and keeps 70–80% of its speed.
- **Funnel bowl** (`funnelBowl`):
  - The floor widens 2.2× (per-segment `widen`, eased over ~30 m). Two long, steady banked sweeps follow.
  - A single segment per sweep matters: the turtle's easing makes the middle of a segment about 1.9× tighter than its average. That must stay well clear of the widened half-width, or the inside edge pinches.
  - Then a long unwinding curve, back to a normal gutter, and a 58° tube plunge "down the hole".

## Round 5: flying is part of the game

- **Aerial control.** In the air, steering carves your heading like a glider: it turns the horizontal velocity at full speed, at up to 0.7 rad/s × the boost.
  - It also pushes sideways at 13 m/s², and only across your motion, so steering never adds speed.
  - The tractor beam adds 40%.
  - A 1.6 s flight can be steered about 34 m to either side.
- **Patient reset.** The quick reset fires only when you are truly lost:
  - more than 60 m to the side, more than 60 m off along the course, or 40 m below it
  - airborne for more than 12 s
  - outside the gutter on the ground for more than 5 s
  - sinking beside it for more than 3.5 s without the beam
  - stuck, or a numerical glitch
- **BMX / motocross elements:** `rollers` (pump track), `berm`, `tabletop`, `gullyJump`, and the combined `dirtSection`.
  - Placed as Mud's motocross section, Sand's dune BMX, Snow's boardercross, Rubber's pump track and Wood's logging trail.
- **Contrast** (`FractalTheme.edge`) adds, on every gutter, scaled per world (Ice and Snow 1.0, Stone 0.7, Glass 0.65, Sand 0.6, Concrete 0.5, others 0.25):
  - dark contour lines with a neon core where the floor meets the curve and the curve meets the wall
  - a soft shadow in the curve
  - cross bands every 8 m, so you feel the surface rushing by
  - fractal glow on the floor

## Trigger pads and holograms

Every obstacle stretch has a glowing pad high on one wall before it:
- **Where:** usually 60–140 m ahead of the stretch, but anywhere from 20 to 300 m when a tube or drop is in the way.
- **What it is:** a panel on the vertical part of the wall. It is not in the collision field, so rolling over it adds no bump or drag, just a chime.
- **What it does:** it lights up and turns that stretch's obstacles (`Track.ghost`) into see-through cyan holograms that are skipped by `sdfLocal`.
- **The boost:** rolling through a hologram gives up to +6 m/s and a 2.2 s turbo. Each hologram boosts once.
- **Guide arrows:** three chevrons on the surface trace the line from the floor up to the pad.
- **Reset:** a new run makes everything solid again.

## The plunger launch

Every race starts with a pinball-style plunger built into the start of the gutter (`src/finale/launcher.ts`). It has a rubber-tipped rod against the ball, a spring, a chrome housing on the gutter floor, and a red knob sticking out the back.

| Input | What it does |
|---|---|
| Drag down | Pulls the knob back (the ball comes back with the rod, up to 3 m) |
| Hold Space or ↓ | Winds it back on desktop |
| Quick swipe up | Fires a strong shot for you |
| Let go | Fires |

- **Feedback while pulling:**
  - a ratchet click on each of 14 notches (sound and haptic tick)
  - the spring compresses
  - a row of floor lights and an on-screen power meter fill up
- **Release:** the rod snaps home in 0.06 s and plays a thwack, a metal clang and a spring boing, scaled by the pull.
- **Launch speed:** 10 m/s for a tap up to 36 m/s at full pull, straight down the gutter into the first section.
- **Camera:** behind the knob, and it tightens as the spring winds. The chase camera carries on from that view instead of jumping.
- **Run clock:** starts at the launch.
- **Opting out:** can be turned off in Settings, which brings back the plain swipe-up launch.

## The safety net

A wide, soft, glowing net hangs under the course: 48 m across and up to 10 m below the floor.
- **Fitted to the ground:** it is never below the terrain and can sit as close as 1.4 m under the floor. A 1-2-1 smoothing pass along the course keeps it free of steps.
- **Where there's no net:**
  - in loops, rolls and other steep or inverted sections
  - in tight turns (radius under 36 m)
  - wherever any gutter passes through the space under the course (checked with a spatial hash)
  - on stretches shorter than 40 m
- **How it works:**
  - it lives in the gutter's own local frame (`Track.netSurface`), so it follows every bend
  - it is a thin sheet in the collision field
  - while you're in it, it soaks up bounce and sideways roll but keeps your forward speed
- **Getting back:** 0.6 s after the catch, the tractor beam carries the ball along a guided spline in course coordinates. The path goes out beside the gutter, up over the rim, and down into the middle about one second ahead. The ball is set down at the forward speed it arrived with.
- **Run rules:** a ball in the net, or on the beam's path, is never counted as a fall.

## Tube themes

Now and then a tube puts on a show (`src/render/tubeThemes.ts`):
- **Lasers:** rings of sweeping beams.
- **Fireworks:** bursts ahead of you, with pops.
- **Haunted:** flickering ghost, eyes, skull, bat and BOO holograms.
- **Pinball:** JACKPOT, 1000, EXTRA BALL and similar holograms, with chimes.

At most three tubes per course get a theme (about one in three tubes, 90 m or longer), picked deterministically and varied by world. The plain fractal tubes stay the main event. All the art is drawn in code.

## The throttle (v9)

Holding the tractor beam on the track is the throttle, a twist of a dirt bike's grip.

| Setting | Was | Now |
|---|---|---|
| Beam push on the track | 14 m/s² | 24 m/s² |
| Beam fades out near | 62 m/s | 80 m/s |
| Open-gutter cruise speed | 46 m/s | 54 m/s |
| Brake above cruise | 1.6× the excess | 0.9× the excess |

The brake above cruise never applies while you're on the gas. Energy still drains while you hold it, so you ride it in bursts: give it gas on the straights, lift off before the corner, and let it recharge.

**INSANE** (Auto Ball only, never a counted run) swaps in `INSANE_TUNING`:
- a far stronger and longer-lasting throttle: 46 m/s² up to 150 m/s, with a third of the drain
- the cruise and tube caps opened right out
- harder pushes and higher jumps

The pro then runs flat out with only the loosest safe-speed check, and the beam and safety net catch the rest.

Measured across the twelve worlds (the averages are approximate):

| Mode | Average speed | Top speed |
|---|---|---|
| Chill | about 165 km/h | |
| Rip | about 235 km/h | 400–500 km/h |
| Insane | about 400 km/h | up to about 860 km/h |

Insane takes about 2.5× less time than Chill, and every course finishes in all three modes.
