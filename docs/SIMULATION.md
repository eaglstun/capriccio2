# How CAPRICCIO actually works

Recovered by live introspection against `window.CAP` (see `tools/probe.js`).
Everything here is observed from a running game, not inferred from source.

---

## The debug API

The build ships **`window.CAP`**, a 33-key debug handle onto every subsystem.
This is not a leftover — it is a deliberate seam, and it makes the whole game
inspectable without touching the minified source.

```text
scene camera controls engraving mats shared   ← three.js (r180, via __THREE__)
world time citizens requests infill state     ← the simulation
tools hud wander section                      ← interaction modes
act grow skip undo doSave snap post cam hour begin plateTest pathTest status
```

`CAP.act`, `CAP.grow`, and `CAP.skip` appear to let you drive the sim
programmatically. Untested as of writing.

---

## The central abstraction: **pockets**

This is the design insight the whole game rests on.

You never place a house. You place _architecture_ — walls, vaults, arches,
piers. The architecture **emits pockets**: habitable voids with measured
qualities. Citizens then move into pockets. That's the mechanical implementation
of the title screen's promise, _"the citizens will find their own uses for what
you leave them."_

A pocket:

```js
{
  kind: "interior",     // interior | terrace_p | niche | under_arch
  pos: [x, y, z],
  rotY: -1.29,
  area: 29.33,          // observed 6 → 35
  height: 15,
  shelter: 1,           // 0–1 quality scores
  light: 0.3,
  scenic: 0.55,
  idx: 0,
  structId: 13,         // which structure created this void
  navNode: 303,         // hook into the pathfinding graph
  occupiedBy: -1,       // agent index, or -1 for vacant
  waterDist: 1e9,       // 1e9 = no water reachable
  designation: null     // dwelling | trade | garden | gathering
}
```

Opening state — 48 pockets in the starting ruins:

| kind         | count |
| ------------ | ----- |
| `terrace_p`  | 34    |
| `interior`   | 12    |
| `niche`      | 1     |
| `under_arch` | 1     |

11 of 48 occupied. 24 have water access. 0 designated.

Quality distribution at start: shelter mean **0.29** (0.1–1.0), light mean
**0.80** (0.3–0.9), scenic mean **0.48** (0.3–0.6).

Note that shelter is the _scarce_ quality and light is abundant — you begin in
open ruins. So the early game pressure is toward roofing things, which is why
VAULT exists as its own verb. The stat meters (ACCESS / SHELTER / LIGHT /
BELONGING / GRANDEUR) are almost certainly aggregates over occupied pockets,
though the exact formula is not yet confirmed.

---

## Citizens

Class `F_`. Holds `world`, `infill`, `meshes`, `agents`, `population`, `dummy`.

**Rendered as 9 `InstancedMesh`es** — three body variants times three levels of
detail, indexed `lod * 3 + variant`, plus a `dummy` Object3D used to compose
per-instance matrices. That's the standard three.js instancing pattern: 46
people, 9 draw calls, and a mesh with no instances in it draws nothing.

It was 3 until levels of detail arrived. Each agent's level is chosen every
frame from its distance to the camera, at the END of the per-agent block rather
than the start — the position is only final there, because ambient life nudges
standing agents by up to 2.1m after the fact. `pickLevel` steps one level at a
time and uses a separate threshold for leaving and returning (23m out / 19m
back, then 46m / 38m), so an agent standing on a boundary cannot flicker.

The head is what changes: 3,108 triangles baked, ~1,161 clustered, 84 as a bare
ellipsoid on the same bounding box. Matching the bounding box is the point — at
the distance a swap happens a citizen is essentially an outline, so if the
outline matches, nothing visible changes. A full pool of 132 costs 448,000
triangles all-near and 27,000 all-far.

One trap worth knowing: the per-variant counter `o[]` strides work-node
assignment, so it is NOT the mesh write cursor. Reusing it as one would reassign
citizens to different workplaces the moment they changed distance.

**The agent array is an object pool.** 132 slots allocated, 46 with
`active: true`. `population` and the HUD's SOULS both read 46. Nobody is
allocated or freed at runtime; agents are switched on and off. That's a
deliberate no-GC-churn choice.

An agent:

```js
{
  active: true,
  pos: {x, y, z},
  path: [],            // nav-node route
  seg: 2, segT: 0,     // which path segment, and progress along it
  speed: 1.505,        // per-agent, randomized
  state: "work",       // work | towork | home
  homeNode: 408,       // nav graph node
  workNode: 456,
  offset: 0.592,       // per-agent phase, avoids synchronized movement
  bob: 103.0           // walk-bob animation phase
}
```

Methods: `spawnPoints`, `workPoints`, `gatherPoints`, `sync`, `goto`, `update`.

At day 1, 09:38, the census was **work: 40, towork: 6** — a morning commute,
mid-flow. The state machine is a daily routine driven by `CAP.time.hour`.

There is a `kind` field but every agent reads `null`, so it's either vestigial
or set later in the game.

---

## The world

Class `T_`. Methods:

```text
buildTerrain  seedNav  applyAction  buildStruct  rebuildStruct  rebuildAll
registerPocket  emitGroundPockets  seedGroundPockets
addDesignationMark  clearDesignationMarks  raycastTargets  waterDistAt
```

Collections at start: `pockets` 48, `structures` 24, `anchors` 3, `waterSources`
4, `designations` 0, `actions` 24.

### The starting ruins are seeded actions, not player actions

`world.actions` holds 24 entries but `state.playerActions` holds **0**. The
pre-existing Piranesian ruin is itself expressed as actions, seeded at world gen
— but it is deliberately kept out of the player log.

That's what makes the event-sourced save work: on load the game seeds the ruins
fresh, then replays only _your_ actions on top. The save stays small and the
ruins stay canonical.

Starting structure mix: `emb` 18, `anchor` 3, `wall` 1, `vault` 1, `span` 1.

### A structure's action

```js
{
  t: "wall", id: 12,
  ax: -88, az: -44,     // start
  bx:  30, bz: -44,     // end
  h: 23,                // height
  th: 3.2,              // thickness
  age: 0.55,            // weathering, 0–1
  openings: []          // carved passages (the CARVE verb writes here)
}
```

Two things worth noting. **`age`** is a per-structure weathering parameter — the
ruins render as ruins because they carry an age value, which means player-built
structures presumably start near 0 and could weather over time. And
**`openings`** being an array on the wall itself confirms CARVE is subtractive
editing of an existing structure, not a new object.

---

## Time

```js
{ hour: 9.646, day: 1, speed: 0.0263, paused: false }
```

`hour` is a float, so lighting can move continuously. `speed` ≈ 1/38.

---

## Requests

Class `$_`: `active`, `queue` (5 pending), `onDone`, `onNew`, `flavorIdx`.
Methods `resync`, `check`, `nextFlavor`.

These are the citizen petitions shown bottom-left, attributed to named people:

> _"The high terrace has been beyond us since the old stair fell. Tullia still
> talks of gardens up there."_ — Marcus, stonecutter

Completing one pays **favor** (`onDone` fires a toast with `+N favor`).
`doneRequests` is a Set persisted in the save. The title screen's _"Bring a way,
and water, to the high terrace"_ is the opening request.

---

## The stat meters — SOLVED, exactly

Recovered from source at line **30709** (`lv()`), then verified against a live
city: **all five predicted values matched the rendered bars exactly.**

Let `occ` = pockets where `occupiedBy >= 0`.

```text
ACCESS    = occ.filter(p => p.navNode >= 0).length / occ.length     // 0.3 if none
SHELTER   = mean(occ.shelter)                                        // 0.3 if none
LIGHT     = mean(occ.light)                                          // 0.5 if none
BELONGING = clamp(districts × 0.18
                + lanterns  × 0.05      // emb actions with kind === 'lantern'
                + infillN   × 0.015, 0, 1)
GRANDEUR  = clamp(Σ over structures:
                span                    → +0.14
                vault                   → +0.12
                rise                    → +0.08
                anchor, style 'giant'   → +0.08, 0, 1)
```

Verification run (13-action city, 19 occupied, 1 district, 4 lanterns, 19
infill, 36 structures):

| meter     | predicted | bar |     |
| --------- | --------- | --- | --- |
| ACCESS    | 100       | 100 | ✅  |
| SHELTER   | 11        | 11  | ✅  |
| LIGHT     | 90        | 90  | ✅  |
| BELONGING | 67        | 67  | ✅  |
| GRANDEUR  | 88        | 88  | ✅  |

### What this reveals about the design

**Three meters score inhabitation, two score construction.** ACCESS, SHELTER and
LIGHT read only _occupied_ pockets — quality nobody lives in counts for nothing.
You are scored on what people chose to inhabit, not on what you built. That
asymmetry is the whole game.

**GRANDEUR ignores most of what you can build.** Only spans, vaults, stairs, and
_giant_ piers count. Ordinary piers, columns, statues, fountains, cypresses,
passages and gates contribute exactly zero. It rewards **structure**, never
ornament — and it caps at 1.0, so roughly seven spans maxes it permanently. It
is the shallowest of the five.

**BELONGING is the only meter fed by ornament**, via lanterns at 0.05 each, and
it is dominated by `districts × 0.18` — so earning a new district name is worth
about 3.6 lanterns or 12 infill houses.

**`scenic` is tracked per-pocket but feeds no meter.** It is computed and stored
for every pocket and never displayed. Either it drives infill site selection or
it is vestigial.

### The meters update only on player action

`lv()` runs on action, not on a timer and not on the clock. `CAP.grow()` and
`CAP.skip()` change the underlying values without refreshing the bars — during
one test the true shelter mean moved 25.2 → 38.9 while SHELTER stayed pinned
at 25. After a page load the bars sit at a default **30** until the first action
fires. **When measuring, compute the value; never trust the bar.**

## Complete action schema

Every action type, recovered from a live player log:

```js
anchor    { t, id, x, z, topY, style }                    // style: pier|giant|column
emb       { t, id, kind, x, y, z, rotY }                  // kind: statue|fountain|lantern|cypress
vault     { t, id, x, z, w, l, h, rotY }
span      { t, id, kind, width, ax, ay, az, bx, by, bz }  // 3D endpoints — spans carry height
designate { t, id, kind, x, z, r }                        // a CIRCLE of radius r, not a tile
wall      { t, id, ax, az, bx, bz, h, th, age, openings }  // seeded ruins only
```

Two design notes. **Spans store `ay`/`by`** — they're true 3D segments between
pier tops, which is why the game can build layered arcades over itself.
**Designation is a circle with a radius**, not a painted region — you drop an
intent over an area and whatever pockets fall inside become eligible.

## Observed: 13 actions, one day

|                   | before | after  |
| ----------------- | ------ | ------ |
| player actions    | 0      | 13     |
| population        | 46     | **62** |
| pockets           | 48     | **92** |
| occupied          | 11     | 17     |
| with water access | 24     | **68** |
| designated        | 0      | 5      |
| stone             | 728    | 610    |
| timber            | 169    | 227    |

(The second resource was `timber` when this experiment was recorded; A14 renamed
the field to `salvage` — same economy, same numbers.)

13 actions produced **44 new pockets** — architecture emits habitable void at
roughly 3.4 pockets per action. Population rose 46 → 62 with no direct
population action taken: **people arrive because habitable space appeared.**

Water access nearly tripled (24 → 68), consistent with spans distributing it
along their length — the aqueduct hint, "carries water along its back," is
mechanically true.

Stone was spent while timber (now salvage) _accrued_ — the two resources have
different economies, and both tick as floats continuously.

At dusk the agent census flipped from `work: 46` to
`home: 53, tohome: 8, gather: 1`, confirming the daily routine runs off
`time.hour`.

## Driving the game from `CAP`

| call              | effect                                                                                                                                             |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CAP.act(action)` | applies an action object; **auto-assigns `id`**; returns `{action, result, meshes, navIds}`; appends to `playerActions` so it persists in the save |
| `CAP.grow()`      | advances infill one step — occupies more pockets and raises population                                                                             |
| `CAP.skip(hours)` | advances the clock (rolls the day over)                                                                                                            |
| `CAP.status()`    | `{structures, pockets, occupied, infill, navNodes, pop, res, request, districts, draws, tris}`                                                     |
| `CAP.undo()`      | undo last action                                                                                                                                   |
| `CAP.doSave()`    | force-write the save blob                                                                                                                          |

**`CAP.act` charges no resources.** Stone was unchanged across a vault
placement. It bypasses the cost check, so anything built this way is god-mode
and not economically comparable to real play. Note this whenever using it for
measurement.

### Confirmed by experiment

- **`occupied` and `infill` are always equal.** Pocket "occupancy" _is_ an
  infill building. The vernacular salvage-built houses are the occupancy.
- **Interiors do fill — they're just slower.** An earlier reading of
  `interior: 0/16` was a timing artifact, not a rule. Six `grow()` calls took it
  to 16/16.
- **Population caps at 132**, exactly the agent-pool size. It is a hard ceiling,
  not just an allocation detail.
- **One `vault` action emitted +5 pockets** and +1 structure.
- **Districts are emergent and re-derive as the city changes** —
  `["The Lantern Quarter"]` → `["The Candle Quarter", "The Cistern Quarter"]` →
  `["The Lantern Quarter", "The Cistern Quarter"]` across successive growth.
  Named from nearby embellishments.

### HUD meters lag

The formula (mean over occupied × 100) is confirmed repeatedly:

| computed    | bar     |
| ----------- | ------- |
| 11.2 / 90.0 | 11 / 90 |
| 27.3 / 80.1 | 27 / 80 |

But the bars **do not update on `grow()` or `skip()`**. During six growth steps
the computed shelter mean moved 25.2 → 38.9 while SHELTER stayed pinned at 25,
then later caught up. The meters are sampled on a slower cadence than the
simulation. When measuring, trust the computed value, not the bar.

## Plates — the etching mechanic (source, line 30690)

The PLATE mode renders the current view at **2000px**, captions it, and offers
it as `capriccio-plate-NN.png`. While it works it toasts:

> _"The burin bites the copper…"_

A burin is the engraving tool Piranesi actually cut copper with. The caption is
`${district name || cityName} · day N`, and taking a plate awards **+6 favor**.

Stored per plate:
`{ cam: [...camera position, ...orbit target], hour, caption, n }` — the camera
pose, not the image. Plates are replayable viewpoints. Only the last 16 survive
into the save (`plates.slice(-16)`).

So the game's screenshot button is diegetic: you are Piranesi, publishing
etchings of your own imaginary city, and the game pays you in favor for doing
it.

## The growth engine — `pickPocket()` (source line 28242)

This is how the city decides where to build itself. Every vacant, reachable
pocket is scored; the best one wins if it clears a threshold.

```text
score = shelter × 1.2
      + light   × 0.5
      + scenic  × 0.4
      + clamp(neighbours, 0, 3) × 0.8   // Σ (1 − dist/40) over infill within 40u
      + clamp(1 − dist(−18, 28)/130, 0, 1) × 1.4   // proximity to city centre
      + (waterDist < 45 ? 0.9 : waterDist < 90 ? 0.3 : 0)
      + (designation ? 2.4 : 0)
      + (kind === 'under_arch' ? 0.5 : 0)

build only if score > 1.6
```

**Designation is by far the strongest term at +2.4** — more than shelter, light
and scenic combined. INVITE is the most powerful verb in the game: it is the
player's direct steering wheel on where the city grows. Everything else is
influence; designation is instruction.

The `neighbours` term (up to +0.8) makes growth _clumpy_ — new building prefers
to sit near existing building — which is what produces districts rather than an
even scatter. Proximity to the centre at `(−18, 28)` carries +1.4, so the city
pulls inward.

The **1.6 threshold** means genuinely poor sites are never built on at all.
Growth stalls rather than sprawling into bad ground.

### `scenic` — answered

`scenic` never reaches a HUD meter, but it is not vestigial. It has two jobs:

1. **+0.4 weight in `pickPocket`** — pretty pockets get built on sooner.
2. **`gatherPoints()`**: every pocket with `scenic > 0.7` becomes a destination
   citizens congregate at (alongside `gathering` designations).

So scenic quality decides where people _hang out_. It is a real mechanic that is
simply never surfaced in the UI.

## Population — exact formula

```text
infill.capacity = (completed houses) × 4 + 8
population      = min(132, 14 + infill.capacity)
                = min(132, 22 + houses × 4)
```

Verified live: 10 completed houses → capacity 48 → population 62. ✅

**Only houses add capacity.** Stalls, gardens and shrines contribute exactly
zero. And since the agent pool caps at 132, **28 completed houses maxes the city
permanently** — every house after that is decoration.

## Infill construction

- Buildings have a `stage` from 0 → 1, advancing `0.12 / L_` per tick, with
  `building.scale.y = 0.18 + stage × 0.82` — so they visibly **rise out of the
  ground** as they are built, and carry a `scaffold` object until they finish.
- **At most 2 buildings may be under construction at once.**
- Growth is also gated on demand: it stops unless demand exceeds
  `items.length × 0.9`.
- `chooseKind()` maps designation → building: `garden→garden`, `trade→stall`,
  `dwelling→house`, `gathering→shrine`. Undesignated pockets get a kind from a
  **hash of `structId:idx`** — so it is deterministic, which is exactly what the
  event-sourced save requires. A `niche` always becomes a shrine.

### Gardens create water

When a `garden` finishes, its position is pushed onto `world.waterSources`.
Since `pickPocket` rewards `waterDist < 45` with +0.9, **a garden irrigates its
neighbourhood and makes the surrounding pockets more attractive to build on.**
That is a genuine positive feedback loop, and the only one found so far where
one infill building changes the terms for the next.

## Formerly open, now answered

**`folio` is a boolean**, not a collection — `false` on a fresh city. A flag,
almost certainly "has the folio view been opened / unlocked."

**`infill.serialize()` is deliberately minimal:**

```js
{ key: "15:house:1", kind: "house", stage: 1, pocketIdx: 19 }
```

Four fields per building. No geometry, no transform — the mesh is regenerated
from `kind` and the pocket it sits in. Combined with the deterministic
`chooseKind` hash, that is all the state needed to rebuild the city's vernacular
fabric exactly.

**`age` never applies to player structures.** Seeded ruins carry `age` 0.4–0.6;
every player-built structure has `age: null`. Nothing weathers over time — the
parameter exists solely to make the _starting_ ruins look ruined. Your
architecture stays permanently crisp against their decay, which is a deliberate
and rather pointed visual contrast.

**`agent.kind` is vestigial.** Null across all 132 slots in every state
observed. Cut feature.

## Still open

- What sets `folio` true, and what the folio view shows
- Whether `requests` can be exhausted, or generate indefinitely
- What the `wander` and `section` modes do mechanically (untested)
- Whether the vault footprint constants ever reconcile with their "paces"
  flavour text (see `FINDINGS.md`)
