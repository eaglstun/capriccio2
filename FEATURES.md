# Feature plan — the next round

Written from `docs/PROGRESSION.md`, which traced how the game actually plays
out. The point was to decide what to build and, more importantly, **what to
unfreeze**.

**Status: nearly all of it shipped.** This is now a record rather than a plan.
Every item carries the commit that built it, following the convention B1 and B2
already used. What is actually outstanding:

| item                      | state                                                                |
| ------------------------- | -------------------------------------------------------------------- |
| **A10 gamepad**           | **not started** — the only untouched item on the list                |
| **A3 folio**              | shipped in part; the contact-sheet export was not built              |
| **A1 Chronicle**          | **built** — engine `b8b1307`, UI + engraving from the past `122a22d` |
| **B3 new building types** | never scoped past a paragraph                                        |

Everything else below is built. The plans are kept as the record of why, which
is the same thing B1 and B2 do.

---

## What was actually weak

Evidence, not opinion. All of this came out of reading the progression.

**Read as the original diagnosis, not as current state.** Of the five below, 1
and 2 were fixed (`39d7fb7`, `d1d9ae3`), 3 was fixed (`db32dc7`), 4 was fixed in
part (`792390d`), and 5 is what the Chronicle is answering now.

**1. The mid-game is empty.** There are exactly five requests. They pay 300
clearance between them, and then they are gone forever. After that the only
thing to aim at is +6 per plate, indefinitely. A player who finishes the five
has no goals left and a city that can now grow to ~107 buildings — the biggest
stretch of the game is also the least directed.

**This is the real flaw.** Everything else on this list is polish.

**2. GRANDEUR is a dead meter.** It counts spans (0.14), vaults (0.12), stairs
(0.08) and giant piers (0.08), clamps at 1.0, and therefore **saturates after
about seven spans and never moves again**. Ornament — statues, fountains,
lanterns, cypresses, columns, passages, gates — contributes exactly zero. So the
meter most associated with Piranesi is the one that stops responding first and
ignores every decorative thing you build.

**3. There is no night.** The clock hard-resets 20.5 → 5.6. All the neon, the
failing signs, the trash fires and the lamp-family palette only ever appear at
dusk, briefly. The single largest unrealised asset in the build.

**4. Plates are stored and never seen again.** Each plate saves
`{cam, hour, caption, n}` — the full camera pose. Sixteen of them. The folio
shows slots, but you cannot revisit what you recorded.

**5. Undo exists; history does not.** The save is an action log and nothing uses
that fact except reload.

---

## What is still constrained — and what no longer is

**No one has played this yet. There are no saves in the world to protect.**
Every constraint that existed to preserve backward compatibility is lifted.

That is a real unblocking, but it does not lift everything, because several
items on the old frozen list were never about compatibility at all. Sort them:

### Lifted — these were compat constraints

- **The save format may change.** Add fields, rename fields, restructure it.
  Bump `v` and drop the old-version branch if that is cleaner.
- **Catalogue `key` values may change.** They are referenced by `chooseKind` and
  the builders, so it is a refactor — but a safe one, and no save will be
  orphaned.
- **Resource field names may change.** `res.timber` can genuinely become
  `res.salvage` rather than a label-only rename. See A14.

### Still constrained — these are correctness, not compat

- **`applyAction` and the pocket model must stay deterministic.** This was never
  about old saves. The save IS an action log, so if replay is not deterministic
  then saving and reloading gives you a _different city_ — the feature breaks
  against itself, today, with no history involved.
- **Every builder must keep seeding from the action id.** Same reason.
- **Structure envelopes still govern pockets.** Changing a footprint changes
  what the city grows, which is a gameplay decision rather than a bug — make it
  deliberately if at all, not as a side effect of restyling.
- **`public/` is never edited.** It is the original artifact and the reference
  everything is verified against.
- **Never run `split_bundle.py --write`**; never delete `src/.hand-edited`.
  `src/` is hand-edited and regenerating would silently destroy it.
- **No shipped binary assets or runtime fetches.** Procedural or nothing.

### The verification numbers still apply

A fresh city should still report **24 structures, 48 pockets, 1331 navNodes, 46
pop, kinds 12/34/1/1** unless a change is _meant_ to move them. They are the
cheapest signal that something drifted by accident, and that is worth keeping
whether or not anyone has a save.

## A0. The named citizens do not exist — and the tutorial sends you to find them — SHIPPED in `fbca02f`

**This is a bug, found in play.** In tutorial beat 6 the card says _"Marcus is
asking for a way up to the high terrace."_ The player goes looking for Marcus.

There is no Marcus. He is a string in `12-requests.js` and a string in
`19-tutorial.js`. Agents carry no name, no identity field of any kind, and
nothing links a request to a citizen. The same is true of Tullia and Livia.

It is a UX failure _caused by_ the writing being good: the prose is specific
enough ("Marcus, lattice technician", "Livia sits in it at noon") that it
implies a findable person, and then the tutorial explicitly points at him.

### Everything needed already exists

| what               | where                                           | status                      |
| ------------------ | ----------------------------------------------- | --------------------------- |
| per-agent colour   | `this.look[]` -> `setColorAt` / `instanceColor` | built, in use               |
| world-space labels | `labelsEl`, projects world -> screen            | built, draws district names |
| the request panel  | `requestEl` in `16-hud.js`                      | built, currently inert      |

No new systems. Three existing ones wired together.

### Design — one marked citizen at a time

**DECIDED: only whoever is currently asking is marked.** Not all four named
characters. One speaker, one marker, tied to `requests.active`.

That keeps the marking purposeful — it means "this person is talking to you"
rather than "this person has a name" — and avoids turning the plaza into a
nametag convention.

Three layers, in order of how much they fix:

**1. Click the request to find who asked.** The request panel becomes the
affordance: click it and the camera eases to the citizen who spoke. This is the
actual answer to "I could not find Marcus" and it should be built first, because
the other layers are useless without it — a distinctly coloured citizen is no
easier to find in a crowd of 132 if you do not know where to look.

**2. Give the current speaker a visible identity.** A distinct colour via
`look[]`, plus a small marker so they read as _someone_ rather than as a
differently-dressed extra. Findable once framed; not lit up like a quest marker
from across the map.

**3. Their name in world space.** Reuse the district-label system for a quiet
name above them. One label, because there is only ever one speaker.

### The handover

When a request completes, the marker leaves that citizen and appears on whoever
asks next, after the existing 9s delay. The previous speaker returns to being an
ordinary citizen — same colour rules as everyone else, no label, still walking
their route.

**When all five requests are done, nobody is marked at all.** That falls out of
the design rather than being special-cased, and it is thematically exact: the
citizens stop asking, and the last named person goes back into the crowd. Do not
add a fallback marker to fill the gap.

### Which agent is speaking?

**Must be derived, not stored — the save format is frozen** and cannot gain a
field. Derive from the active request's `id` (hash it to an agent index), so the
same request always maps to the same citizen across reloads.

Deriving from the request rather than from a fixed roster also means a
procedurally-generated request (A2) gets a speaker for free.

Do NOT reuse `agent.kind`. It is vestigial sim state, null on every agent, and
it should stay that way.

### They should keep walking

The speaker is still an ordinary agent: home, work, gather, home. Marcus having
a job and a route is what makes him a person rather than a signpost. That is
also why layer 1 matters — he is a moving target, and the camera has to do the
finding.

### The tutorial

Beat 6 should either move the camera to Marcus as it names him, or stop naming
him. Naming a person the player cannot locate is the specific failure being
fixed; do not leave it in place alongside the fix.

### Not frozen, but adjacent

`07-citizens.js` is not on the frozen list. The constraints that still apply:
the save format gains nothing, `applyAction` and the pocket model are untouched,
and identity must be deterministic so a reloaded city has the same Marcus.

## Tier A — additive, nothing needs unfreezing

### A1. The Chronicle — moved to its own plan, now IN PROGRESS

**The replay engine shipped in `0999045`** — `enter` / `scrubTo` / `exit` /
`captionAt`, live at `window.CAP.chronicle`, verified in the browser rather than
asserted. Two properties were measured: `playerActions` is only ever sliced, and
autosave is suppressed for the whole visit (the corruption vector was never the
action log, it was `saveGame` persisting live infill mid-scrub).

The scrub UI and engraving from the past are specced in
**`briefs/FABLE-BRIEF-9.md`** (`6c48a8b`) and are being built.

The enabler below was taken and is no longer pending: actions carry `day`/`hour`
as of `b87a06b`.

Specced separately in **`CHRONICLE.md`**, because it turned out to carry a
mechanic rather than being a viewer: the folio is what you chose to keep, the
Chronicle is everything that happened, and you can engrave a plate from inside
it at the cost of one of your sixteen.

Two things were verified while speccing it and both belong here:

- **Actions carry no timestamp.** The log is an ordering, not a timeline.
- **Infill is not in the action log**, and the order it grew in is recorded
  nowhere, so the organic growth of the city is not reconstructable.

`CHRONICLE.md` contains a time-critical enabler — stamping `day`/`hour` onto new
actions — that is worth taking even if the rest is deferred.

### A2. Procedural requests — fill the mid-game — SHIPPED in `39d7fb7`

After the five hand-authored requests are done, generate more from world state:
"nobody in the Sodium Quarter can reach water", "the high terrace has no light
after dark", "the market has no shelter". Read pockets, find a deficiency,
phrase it as a citizen asking.

This directly fixes the biggest flaw. It touches `12-requests.js`, which is not
frozen.

The tone must hold — the existing five are quiet and specific and named. A
generator that produces "BUILD 3 VAULTS" would be worse than nothing.

### A3. The folio as an artifact — SHIPPED IN PART in `792390d`

Plates already store the camera pose. So:

- Click a slot to return the camera to exactly that view — **built**
- Compare then/now from an identical position — **built**, falls out of the
  above
- Export the set as a contact sheet — **not built**

Cheap, and it makes the sixteen mean something between engraving them.

The contact sheet is the outstanding piece: there is no `contactSheet` anywhere
in `src/`. It is worth reconsidering alongside the Chronicle rather than on its
own, since both are about seeing the record as a whole.

### A6. The tracking band: RGB separation, not dither — SHIPPED in `5fc869a`

The slow band that rolls down the screen currently does two things — it
displaces the image sideways (correct, keep it) and then **re-renders that strip
as a 1-bit dithered plate** (the "style slab").

**Replace the dither inside the band with RGB channel separation.**

#### Why this is the better effect

A real VHS tracking error is a **timing** fault. The luma and chroma carriers
drift out of alignment, so the colour channels smear horizontally against each
other. That is what the artefact actually looks like. A halftone is a _printing_
artefact and belongs to a different medium entirely — inside a video-tape band
it reads as two unrelated ideas stacked.

The dither is not being retired. It stays where it belongs: on the end-of-
humanity fabric in the material pass, and as true Atkinson on the plates.

#### What already exists

The band is built and working. In `00-shaders.js`:

```glsl
float trackPos = fract(vUv.y + uTime * 0.023);
float bar   = smoothstep(0.0, 0.03, trackPos) * (1.0 - smoothstep(0.03, 0.10, trackPos));
float gate  = smoothstep(0.58, 0.74, vnoise(vec2(uTime * 0.19, 4.7)));
float tear  = bar * gate;
vec2  suv   = vUv + vec2(tear * (0.006 + 0.012 * jag), 0.0);
```

There is even a mild two-channel bleed already (`r` sampled +3px, `b` sampled
−3px, mixed by `tear * 0.85`). **That is the thing to develop.** The work is
deleting the slab and making the separation carry the band on its own.

#### The change

**Remove** the `STYLE SLAB` block entirely — the `step(trackPos, 0.085)` hard
edge, the luminance curve, the `bnThresh` lookup and the two-tone assignment.

**Develop the separation** in its place:

- Push it well past the current 3px inside the band — a real tear is a visible
  offset, not a hint
- **Separate all three channels, not two.** Sampling R and B in opposite
  directions while G stays put is the classic look; offsetting G slightly the
  other way adds a second-generation feel
- **Vertical offset as well as horizontal.** Tracking errors are a line-sync
  fault, so a small vertical component on one channel sells it
- **Scale the offset by `jag`**, the existing per-scanline hash, so the
  separation is ragged line to line rather than a clean smear
- Hard edges are still right at the band boundary — collage, not crossfade

#### Watch for

- **Do not separate the whole frame.** Only inside the band. A permanent
  aberration would fight the neon rim light, which is already coloured.
- **Sample the displaced `suv`,** not raw `vUv`, or the separation and the
  displacement will disagree and the band will look doubled.
- Clamp or wrap the sample coordinates; a large offset at the screen edge will
  otherwise smear whatever the sampler clamps to across the border.
- The band must still read at night, when most of the frame is near-black and
  only the neon is lit. Test it there specifically — that is the hardest case
  and the most likely to disappear.

#### Verify

`yarn build` green, fresh-city numbers unchanged, and **capture the band
mid-roll in daylight and at night**. It is intermittent — gated on noise — so a
screenshot at an arbitrary moment will usually miss it. Drive `uTime` or wait.

### A7. Citizens get their own outline colour — SHIPPED in `876f047`

The neon rim light currently treats every surface the same — hot pink near, cyan
far, whether it is a wall, a wrecked car or a person. **Give the citizens their
own outline colour** so the living things read differently from the scenery.

#### The problem, stated properly

Outlines are computed in the **screen-space post pass** from depth and normal
discontinuities. That pass sees a colour buffer and a depth buffer and has **no
idea what object any pixel belongs to**. There is nothing to branch on.

So this needs a mask, and the useful finding is that one is already available
for free.

#### The alpha channel of the intermediate target is unused

Verified:

- The offscreen target is created without a `format` override, so it is RGBA
- Every material writes `gl_FragColor = vec4(engraved, diffuseColor.a)`, and
  opaque materials give `1.0`
- The post pass reads only `.rgb` and outputs `vec4(color, 1.0)`

**So alpha is a spare per-pixel channel that currently carries no information.**

#### The approach

1. **The `figure` material writes a distinctive alpha** — say `0.5` — instead of
   `1.0`. It is opaque and blending is off, so this changes nothing about how it
   draws; the value simply lands in the buffer.
2. **The post pass samples `texture2D(tDiffuse, suv).a`** and, where it is near
   that value, uses a different outline colour.
3. Everything else is untouched.

**Test with a threshold, not equality.** The target uses `LinearFilter`, so
alpha is interpolated across edges — which is convenient, because the outline
lives exactly at those edges. A band like `a > 0.35 && a < 0.75` will catch the
silhouette; tune it against a real frame.

#### Alternative if that proves awkward

Do the citizen edge **in the material pass** as a fresnel rim on the figure
material, and leave the post-pass outline alone. Entirely local, no cross-pass
plumbing, no risk. The cost is that it reads as a rim glow rather than a crisp
silhouette line, because the material pass cannot see a neighbour's depth.

Try the alpha mask first; fall back to this if the mask fights anything.

#### What colour

Suggestion, not instruction: **something warm.** The palette is sodium, mercury,
halogen, pink and cyan — all of it lamps and signage. The citizens are the only
living things in the frame, and a warm outline against the cold neon would say
so without a word of UI. Amber or a warm white.

Avoid the district colours — those already mean something and reusing them would
muddy both.

#### Watch for

- **Plates are safe, but confirm it.** The post pass outputs `vec4(color, 1.0)`,
  so the intermediate alpha never reaches the exported PNG. Take a plate with
  citizens in frame and check they are not transparent.
- **The infill buildings must not pick this up.** Only the figure material
  writes the marker value.
- **Check it at night**, when the citizens are near-black shapes and their
  outline is most of what you can see of them.
- Do not let the citizen outline glow brighter than the neon; they should read
  as _different_, not as _important_.

#### Verify

`yarn build` green, fresh-city numbers unchanged, and screenshots of citizens
outlined distinctly in daylight and at night — plus one plate confirming the
export is unaffected.

### A8. A hint after Tullia asks for water — SHIPPED in `1bbf4c0`

The second request is the hardest thing in the game and nothing helps the player
with it.

> _"No water climbs so high. The spring across the great void mocks us every dry
> summer."_ — Tullia

To satisfy it the player must get a water source above y=14 on the far side of
the canyon. That means: know that **aqueducts carry water** and an ordinary
bridge does not, find the spring, and cross the void.

Measured, the distances are unforgiving:

| from                  | to                      | distance      |
| --------------------- | ----------------------- | ------------- |
| spring pool (126, −6) | high terrace (−28, −86) | **174 units** |
| spring pool           | massif rim (92, −10)    | 34            |
| massif rim            | high terrace            | **142**       |

Max span is **55** under 60 clearance, **95** at 60+, **150** at 150+. So even
the shortest leg of the crossing cannot be done in one span at any clearance the
player is likely to hold — **it has to be broken into legs with intermediate
piers**, and nothing in the game says so.

**Add a hint.** Requirements:

- It appears **only after the player has struggled** — some delay, or some
  number of growth ticks with the request unmet. Not on arrival; being told the
  answer immediately is worse than the current silence.
- It is **a citizen speaking**, not a tooltip. `docs/CHARACTERS.md` has the
  rules — a consequence, not an instruction. Something that gestures at
  aqueducts and at piers standing in the void without naming a tool or a button.
- It should not repeat endlessly. Once, or at most twice.

Keep the discovery. The hint should make the player think "oh — I could put a
pier _in_ the canyon", not hand them a recipe.

### A9. Stone is invisible, not scarce — SHIPPED in `3d80390`

**Found in play: "I couldn't figure out how to get more stone."**

There is nothing to find. Stone accrues automatically at **18 per game-hour**,
timber at 6, and both are **capped** — 2600 stone, 900 timber. No building
produces it, no citizen mines it, and no amount of play changes the rate.

That is a defensible design, but the UI never says it, so a player watching the
number fall reasonably assumes there is a source somewhere and goes looking for
a mechanic that does not exist.

**Make the rate and the cap legible.** Options, cheapest first:

- Show it as a rate — `700 STONE` becomes something that also conveys "+18/hr"
- Show the cap when near it, so stockpiling reads as pointless rather than
  broken
- A quiet line on first low-stone moment, in the citizens' register

Do **not** add a stone-producing building. The scarcity is a pacing device that
works; only its legibility is broken.

### A10. Gamepad support — NOT STARTED

Add Web Gamepad API support for the main view.

- Left stick: orbit. Right stick or triggers: zoom.
- Face buttons: cycle tool, confirm a placement, cancel.
- Shoulder buttons: cycle mode (BUILD / SECTION / WANDER / PLATE).
- **WANDER especially wants a stick** — first-person walking on a keyboard is
  the weakest input in the game.

Poll `navigator.getGamepads()` in the existing frame loop; do not add a second
loop. Detect on `gamepadconnected` and stay entirely dormant otherwise — no
prompts, no UI, nothing that appears for players without a pad.

Mouse and keyboard must keep working identically at all times; a connected pad
adds a path, it never takes one away.

### A11. The world reads as floating — SHIPPED in `4250a75`

Two related complaints, one cause.

**Measured:** the terrain plane is 600x600, so ground ends at **radius 300**.
The megastructure skyline sits at **radius 352-545**. There is a gap between
where the ground stops and where the backdrop begins, and at low camera angles
you can see the edge of the world.

**a) Extend the horizon.** Either grow the terrain plane, or add low hills
around the perimeter to close the gap between ground and skyline. Hills are
cheaper — they need no extra resolution in the playable area and can be a coarse
merged mesh, scene-only and never in `structGroup`.

Keep it _low_. The city should still feel like it sits on a plain; the point is
that the plain has an edge you cannot see over, not that it is ringed by
mountains.

**b) Clamp the camera above ground.** Nice-to-have, explicitly optional per the
user. The orbit camera can currently go below the terrain, which shows the
underside of the world. A simple clamp against `terrainHeightAt` plus a small
margin would fix it.

Do this one **after** the horizon — the horizon is the thing that actually
bothers the eye, and clamping the camera without extending the ground would just
hide one symptom of the same gap.

### A12. You cannot tell what is carvable — SHIPPED in `3809ce2`

Walls and vaults are both the new-era fabric, so both render in the same 1-bit
dither. Nothing distinguishes a surface that accepts a CARVE from one that does
not, and the player has to learn it by clicking and being refused.

**The actual rule**, from `draftAction`:

| carvable                             | not carvable                          |
| ------------------------------------ | ------------------------------------- |
| `wall` structures                    | spans, vaults, stairs                 |
| `giant` piers **not already carved** | ordinary piers, columns, all ornament |

Note the second row — a giant pier can take exactly one carve, and after that
its `carveAxis` is set and it is done.

**There is also a bug.** `BuildOverlays.markCarvables` only iterates
`e.action.t === "wall"`. **Giant piers are carvable and never marked**, so even
the existing guide is lying by omission. Fix that as part of this.

#### The design problem

The dither already means something — it separates the end-of-humanity fabric
from the first-era concrete (`courseH >= 0.95` vs below). Carvability is
_orthogonal_ to that: a player-built wall and a player-built vault are the same
era and the same material, and only one takes a carve.

So this needs a third signal that does not fight the era split.

#### Recommended: subtle always, emphatic in context

- **Always on, quietly** — carvable surfaces carry a slight difference in
  treatment, enough to learn the language over time without making the world
  look inconsistent. Surface relief, joint density, or a faint course marking
  that reads as "this is a face you could open".
- **Emphatic when CARVE is selected** — the existing dashed `markCarvables`
  overlay already does this job and should get louder, plus the giant piers it
  currently misses.

Do not make the always-on state loud. Carvability matters for one tool out of
seven, and a permanent hazard-stripe on every wall would cost more than it
gives.

#### Watch for

- **Do not reuse the era distinction.** Old fabric already means something.
- The signal must survive **at night**, when the fabric is mostly dark and the
  neon carries the frame.
- A giant pier that has already been carved must stop reading as carvable — the
  state is per-structure, not per-type.

### A13. Billboard text clips, and every sign is the same typeface — SHIPPED in `c061dbf`

**Two problems in the same place** — the runtime canvas atlas at the end of `C_`
in `05-world.js`.

#### a) The clipping is measurable

Cells are **512px wide**, text is centred at x=256, and **nothing measures
anything**. Every headline is drawn at a fixed `bold 52px Georgia` and hoped
for. Measured against the real font:

| headline            | width     |                  |
| ------------------- | --------- | ---------------- |
| EVERYDAY LOW PRICES | **688px** | overflows by 176 |
| MIRAMAR ESTATES     | **558px** | overflows by 46  |
| GRAND OPENING       | 492px     | fits, barely     |
| OPEN 24 HOURS       | 462px     | fits             |
| AZURE COAST         | 399px     | fits             |
| VISTAPHONE          | 379px     | fits             |
| SUNMIST             | 266px     | fits             |

All seven sub-lines fit (258–392px).

**Fix it properly, not by shortening the two strings.** Measure with
`measureText` and shrink the font until it fits, with a margin — so any future
copy is safe by construction rather than by luck. Something like: start at 52,
step down while `measureText(s).width > 512 - 2*margin`.

Do the same for the sub-line even though none currently overflow; the next
person to write a longer tagline should not have to know this.

#### b) Every sign is Georgia

Seven different companies across decades of a dead economy, all set in one
serif. Real signage is a jumble — that is most of what makes a strip look like a
strip.

Give each cell its own face. **System fonts only** — no webfonts, nothing
fetched, per the standing constraint. There is plenty of range in what is
already installed:

- a grotesque for the phone company (Helvetica, Arial)
- a fat condensed sans for the supermarket (Impact, Haettenschweiler)
- a geometric for the resort (Futura, Century Gothic, Avenir Next)
- a slab or typewriter for the motel (Courier, American Typewriter)
- keep a serif for one or two — Georgia earns its place among others

Vary weight, tracking and case too, not just family. A sign that is
`letter-spacing`-wide and thin reads as a completely different era from a fat
condensed one, even in the same family.

**Specify fallbacks** — `"Impact, Haettenschweiler, sans-serif"` — since the
game runs on machines that will not all have the same fonts. A missing font
silently falls back to the default and the variety quietly disappears, which is
exactly the kind of thing that will not show up on the machine it was built on.

### A14. TIMBER is the wrong word — SHIPPED in `1eb2cf8`

The second resource is still called **TIMBER**, which is a word for a material
nobody in this city uses. The buildings it pays for are corrugated sheet, tarps,
shipping containers and salvaged panel — the shanty modules from pass 3. Nothing
is made of wood.

This is the same drift already applied to FAVOR → CLEARANCE, and it follows the
rule in `docs/CHARACTERS.md`: **words tied to dead things die.** Timber died
with the forests.

#### Recommended: SALVAGE

It says the material comes from **taking apart what is already there**, which is
exactly what the infill looks like and exactly what a city at the end of
humanity would actually be built from. It also pairs correctly with STONE: one
quarried, one scavenged.

Alternatives if it does not sit right: SCRAP (blunter), SHEET (more technical),
COMPOSITE (colder). Avoid POLYMER — it competes with the cypress hint, which
already uses "in polymer".

#### Scope: rename it properly

No saves exist, so this is **not** a label-only change like CLEARANCE was.
Rename the field: `gameState.res.timber` becomes `res.salvage` throughout —
state, costs, the income tick, `costOf`, the affordability check, the save
object, the HUD id.

Also update `docs/PROGRESSION.md` and the how-to-play page, which both name it.

The material is separately `mats.timber` in code. Rename that too while in there
— and if the surfaces it draws still read as _planks_ rather than as salvaged
sheet, that is worth fixing at the same time, since the word and the look should
agree.

### A4. Ambient life — SHIPPED in `a0fcbb1`

More agent states — pairs stopping to talk at gathering points, someone
lingering at a fire, queues at a stall. Currently the loop is home → work →
gather → home. This is presentation, not simulation, so it stays out of the
frozen systems.

### A5. Two more score tracks — driving, and strange — SHIPPED in `f59ec7b`

The existing score is one loop: **Am9 – Fmaj9 – Cmaj9 – Gadd9** (i–VI–III–VII in
A minor) at ~67bpm, drums entering at 0:30, one borrowed Dadd9 late. It is good
and it is the _calm_ end of the range. Two more, and **neither may be more
tranquil than what exists.** More bass, more drums, and weird is welcome — it is
vaporwave.

Theory reference: `~/.claude/skills/guitar/references/theory.md`. Strudel
reference: `~/.claude/skills/strudel/` — **read its gotchas first**, two of them
silently produce no sound.

#### Keep the tonic, change the mode

All three tracks stay rooted on **A**, so any transition between them is a mode
change rather than a key change and can happen without a jarring pivot.

**Track 2 — A Dorian, driving.** Dorian is A B C D E F# G: natural minor with a
**raised 6th**. That F# turns the IV chord major, and `Am → D` is the single
most recognisable sound in the mode.

- Loop: `Am9 | D6/9 | Am9 | Gadd9` — the D major where the ear expects Dm
- ~78–84bpm, a real backbeat on 2 and 4, hats on sixteenths
- **The bass carries this one** — a riff, not roots. Root / 5th / b7 / octave,
  syncopated, well forward in the mix
- This is the track for a city that is actually growing

**Track 3 — the strange one.** Same tonic, harmony deliberately unstable. From
the theory reference's substitution and borrowed-chord material:

- Bar 1 is always `Am9` — the anchor
- Bars 2–4 are **chosen per cycle** from a set that all voice-lead from A minor:
  `Fmaj7#11` (lydian colour on VI), `Bm7b5` (the ii-half-diminished, tense),
  `Dm6` (iv6, Dorian-tinged), `Abmaj7` (chromatic, genuinely foreign)
- ~72bpm with a half-time feel, so it sits between the other two rather than
  simply slower
- Heavy detune, pitch drift, tape warble. Let it sag

#### Generative — the part that matters

"Generative" fails when it sounds random. The rule that prevents it:

> **Randomise rhythm and choice. Never randomise pitch outside the scale.** A
> random note in key sounds intentional. A random rhythm sounds broken.

So constrain pitch material to the mode and let Strudel vary everything else:

| technique                      | where                                                  |
| ------------------------------ | ------------------------------------------------------ |
| `chooseCycles(...)`            | which chord fills bars 2–4 of track 3                  |
| `.degradeBy(0.2)`              | hats, so the pattern breathes instead of ticking       |
| `.undegradeBy`                 | paired with the above for fills                        |
| `.euclid(5,8)` / `(3,8)`       | a shaker or rim that never lands square                |
| `.someCyclesBy(0.15, fn)`      | an occasional whole-cycle variation                    |
| `irand` + `.scale("A:dorian")` | a counter-melody that is always in key, never the same |
| `perlin`                       | slow filter and detune drift — the tape sag            |

Track 2 should be **mostly fixed with generative edges** (hats, fills). Track 3
should be **generative at its core** (the harmony itself moves).

#### Which track plays when

Do not shuffle. Bind it to the simulation, the way every other sound in this
game already is — see `docs/AUDIO.md`.

Suggested: **track 1 for a small city, track 2 as it grows, track 3 late or at
night.** The score then reports the state of the world like the wind and the
bell do. Cross-fade over several seconds; never cut.

#### Technical, and non-obvious

- **This project does NOT use `@strudel/web`.** It imports `@strudel/core`
  subpaths plus `superdough` directly, with `webaudioOutput` inlined — see the
  top of `src/18-music.js`. Keep that; the full bundle cost 908KB against 157KB
  for the subpath imports.
- **Tempo is `setCps`, never `.cps()`.** The control sets a per-hap value the
  scheduler never reads back, so the clock stays at the default and nothing
  audibly changes.
- **Sharps are `s`, not `#`** — `fs3`, not `f#3`. `#` fails to parse.
- **Synthesized only.** No `samples()`, no CDN fetches, no shipped audio.
- Build patterns after init, not at module top level.
- The construction arpeggio stays bound to the sim as it is.

#### Verify

`yarn build` green, fresh-city numbers unchanged, and **listen to all three** —
a pattern that throws at scheduler time fails silently to the eye. Report the
bundle delta; three tracks of pattern code should be a few KB, not another
dependency.

---

## Tier B — each needs one narrow unfreeze

### B1. Night — SHIPPED in `db32dc7`

**Status: built.** Everything under "The work" below is in the code: the clock
runs 5.6 → 29.6 (`DAY_END`), `os()` has its night branch, the post pass takes
`uNight` through `ke.setNight()`, the dark hours run at `NIGHT_RATE = 2.5`, and
`CAP.skip` wraps on `DAY_END`. The plan is kept below as the record of why.

**Decision: the day loop may be changed.** It is the only unfreeze granted; the
rest of the frozen list still stands.

#### What is actually there

Not a reset — an absence. One line in the frame loop:

```js
te.hour += t * te.speed;
te.hour > 20.5 && ((te.hour = 5.6), te.day++);
```

The day runs **5.6 to 20.5 and jumps straight back**. The hours between 20.5 and
5.6 are never visited. Night is not dark in this game; it does not exist.

And `os()`, the lighting function, normalises with a **clamp**:

```js
const t = clamp((i - 5.5) / 15, 0, 1);
```

So even if the clock were extended today, the sun would stop at the horizon and
hold — night would render as a permanent sunset, not as darkness. **Extending
the clock alone is not enough; `os()` needs a night branch.**

#### What already handles night correctly

Pleasantly, most of it. No change needed to any of these:

- **Citizens.** Their routine already reads
  `(hour > 19.6 || hour < 6) -> tohome`. Given real night hours they will walk
  home and stay there, and the streets will empty on their own.
- **Birds.** Gated on `dusk < 0.55`, so they fall silent as it darkens.
- **Wind.** Already rises with dusk.
- **The bell.** Rings on the hour and will keep ringing through the night, which
  is exactly right.
- **Growth.** `InfillSystem.grow(t, e)` is passed the hour and **never reads
  it** — growth is driven by a 2.2s real-time timer. So a longer day does not
  change how fast the city grows.

The neon, the failing signs, the trash fires, the lamp-family palette and the
district colours are all built and waiting for the sun to go down.

#### The work

1. **Extend the clock** past 20.5 through midnight to 5.6.
2. **Give `os()` a night branch** — sun below the horizon, ambient down hard,
   the paper/fog colour going cold and dark rather than holding at sunset.
3. **A night factor for the shaders.** `setDusk`/`setDawn` exist; night needs
   its own, so the post pass can lift the neon and drop everything else rather
   than reusing dusk past its intended range.
4. **Let artificial light take over.** Lanterns, signs and fires should be the
   only real light sources. This is the entire payoff.

#### Compress the night, do not run it at 1x

At the current speed a day is 9.4 real minutes. A literal 24 hours would be
**15.2 minutes**, with 5.8 of them dark — too long to sit through, and it slows
the day counter by 60% for everyone who does not care about night.

**Run the dark hours faster.** At roughly 2.5x, night lasts about 2.3 real
minutes and a full day comes to ~11.7 minutes — close to today's pacing with a
real night inside it. Tune to taste; the principle is that night should be an
event, not a wait.

`CAP.skip` wraps on the same 14.9-hour figure and must be updated with it.

#### Verify

Fresh city reports the same structures / pockets / navNodes / pop, and the four
meters other than GRANDEUR read identically **at the same clock hour**. Only the
range of `hour` and the lighting derived from it may change.

Watch a full cycle and confirm: the streets empty, the birds stop, the signs and
fires carry the scene, and the sun comes back.

### B2. GRANDEUR counts ornament — SHIPPED in `d1d9ae3`

**Status: built.** The formula in `17-bootstrap.js` matches the design below
weight for weight, both caps included; cypress and passage are absent from both
loops, so they score zero as intended. The plan is kept below as the record of
why. See the corrected verify figure at the end of this section.

**Decision: add ornament terms.** Keep the meter a count; make decoration count
toward it.

#### The trap this has to avoid

Naively adding ornament makes the problem _worse_. Measured on a fresh city:

- GRANDEUR already starts at **0.34** — the seeded ruins contain one span, one
  vault and one giant pier
- Headroom is 0.66, which is **about five player spans**
- The seeded ruins contain **18 ornaments, and 12 of them are cypresses**

So giving every ornament a flat value would push the _starting_ score up and cut
the remaining headroom — saturating sooner, not later. The fix has to rebalance
the structural weights at the same time.

#### The design: two halves, each capped

```
structure = clamp( spans       * 0.042
                 + vaults      * 0.036
                 + rises       * 0.025
                 + giant piers * 0.032 , 0, 0.60 )

ornament  = clamp( statues   * 0.026
                 + obelisks  * 0.026      // seeded only, not player-placeable
                 + fountains * 0.022
                 + gates     * 0.022      // the CARVE "Great Gate"
                 + columns   * 0.018      // the ESTABLISH column
                 + lanterns  * 0.005 , 0, 0.40 )

GRANDEUR  = structure + ornament          // sums to at most 1.0
```

Tuned so each cap needs a real city: **~14 spans** to max the structural half,
**~15 statues** to max the ornamental one.

**Neither half can max the meter alone.** Ten spans and no ornament stalls at
0.60. A plaza full of statues and no architecture stalls at 0.40. Grandeur now
requires a city that is both **built and adorned**, which is the point of adding
ornament at all.

Modelled against real cities:

| city                                    | GRANDEUR                  |
| --------------------------------------- | ------------------------- |
| fresh, seeded ruins only                | **0.20** (today: 0.34)    |
| a 13-action city                        | **0.38** (today: 0.88)    |
| mid game, built and adorned             | 0.79                      |
| 14 spans, no ornament at all            | 0.60 — the structural cap |
| plaza full of ornament, no architecture | 0.51                      |
| large city, both                        | **1.00**                  |

The second row is the one that matters. A thirteen-action city currently reads
**0.88** — effectively finished. Under this it reads **0.38**, with the rest of
the game still ahead of it.

#### Two things score zero, deliberately

- **Cypress: 0.** Twelve of the eighteen seeded ornaments are trees, so any
  value at all would let the starting scenery dominate the meter. There is also
  a straight argument for it: grandeur is built magnificence, and a tree is the
  one thing in the world nobody built.
- **Passage: 0.** A door through a wall is circulation, not monument. The _Great
  Gate_ is the ceremonial one and it scores.

**Lanterns score only 0.005** because they already feed BELONGING at 0.05 each.
Paying them fully into both meters would let one cheap object drive half the
HUD.

#### The cost is smaller than previously stated

An earlier draft of this plan implied changing a stat formula would break saves.
**It would not.** The meters are computed live from world state and GRANDEUR is
stored nowhere — the save holds actions, resources, plates and done-requests.
Changing the formula changes a displayed number on reload. No corruption, no
migration, no crash.

That is the whole cost: an existing city will show a different GRANDEUR than it
did yesterday.

#### Scope

This is the **only** one of the five formulas being touched. ACCESS, SHELTER,
LIGHT and BELONGING stay byte-identical, and so does everything else on the
frozen list.

Verify: fresh city reports GRANDEUR ≈ 0.20 with all other meters unchanged at
the same clock hour, and structures / pockets / navNodes / pop unchanged.

An earlier draft of this line said **0.27**, which the stated weights cannot
produce — the design table above says 0.20 for the seeded ruins, and that is the
right figure. Measured on a fresh city from the shipped code: **GRANDEUR
0.196**, structure half 0.110, ornament half 0.086, against ACCESS 1.0, SHELTER
0.111, LIGHT 0.900, BELONGING 0.545.

### B3. New building types — NOT STARTED

Adding catalogue entries is safe as long as existing keys are untouched and
envelopes for existing types do not change. New keys, new geometry, new hints.

---

## Suggested sequence — worked through

The original order, with what actually happened:

1. ~~**A0 Named citizens**~~ — built, `fbca02f`
2. ~~**A1 Chronicle**~~ — built; engine `b8b1307`, the rest `27b0103` +
   `122a22d`
3. ~~**B1 Night**~~ — built, `db32dc7`. The unfreeze was granted and used
4. ~~**A2 Procedural requests**~~ — built, `39d7fb7`
5. ~~**A3 Folio**~~ — built in part, `792390d`; contact-sheet export outstanding
6. ~~Then reconsider B2~~ — reconsidered and built, `d1d9ae3`

**What is left after the Chronicle:** A10 gamepad, the A3 contact sheet, and B3
new building types. That is the whole remaining backlog from this document.

---

## Open questions — answered

1. ~~**Do we unfreeze the day loop for night?**~~ **Yes**, and it shipped
   (`db32dc7`). It was the only unfreeze granted.
2. ~~**Do we touch GRANDEUR?**~~ Deferred at the time, then **yes** — shipped in
   `d1d9ae3`, measured at 0.196 on a fresh city against the designed 0.20.
3. ~~**Is the Chronicle interesting, or is it a toy?**~~ **Interesting**, and
   the framing in the question turned out to be wrong: specced properly it
   carries a mechanic rather than being a viewer, because engraving from the
   past still costs one of the sixteen. That is what `CHRONICLE.md` exists to
   argue.
4. **Should procedural requests keep paying clearance?** Still open. A2 shipped
   paying clearance; whether that is right once the named five are done has not
   been revisited.
