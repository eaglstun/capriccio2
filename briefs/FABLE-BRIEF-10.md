# Brief 10 — B3, new things to furnish the city with

`FEATURES.md` B3 has sat as a single paragraph since it was written: _"Adding
catalogue entries is safe as long as existing keys are untouched and envelopes
for existing types do not change. New keys, new geometry, new hints."_ True, and
not enough to build from. This is the rest of it.

**Scope: three new FURNISH ornaments, one of them driven by `three-nebula`.**

---

## Why FURNISH and not a new vault or span

The catalogue has seven tools and 22 entries. Ornament is the right place to
add, and the reason is structural rather than aesthetic.

A new `vault`, `span` or `anchor` type would need its own envelope, and
**envelopes govern what the city grows** — pockets are computed from action
geometry, infill fills pockets, citizens live in infill. A new structural type
is a balance change wearing a costume. That is a real thing to do one day, with
measurements; it is not this pass.

Ornament is where the game is thinnest anyway. There are four entries — statue,
fountain, lantern, cypress — against three in every other category, and they are
the things a player places when the city already works and they are decorating
it. That is exactly the stretch of the game `FEATURES.md` identified as least
directed.

**Ornaments are not free, and the brief should not pretend they are.** A statue
pushes a `niche` pocket (`04-builders.ts`, `buildOrnament`), a fountain
registers a water source, a lantern attaches glow geometry that feeds BELONGING
and a little GRANDEUR. Whatever you add, decide deliberately what it emits and
say so.

---

## What to build

Three entries under `emb` in `BUILD_CATALOGUE` (`09-catalogue.ts`), each with a
new `key`, a `label`, and a `hint` in the house voice.

### 1. The Brazier — the one that uses `three-nebula`

A standing fire. Sheet metal, salvaged, burning something nobody asks about.

This is the one worth building first, and it earns the particle dependency:

- **Night shipped** (`db32dc7`) and the dark hours are now a real event. Almost
  everything that lights them is cold — sodium, mercury, halogen, neon. A fire
  is the only warm light a player can place.
- Embers are the exact thing a bounded particle emitter is good at, and the
  exact thing that is tedious and unconvincing to fake with geometry.
- The setting already has trash fires as scenery. This makes one of them yours.

It should feed LIGHT and BELONGING roughly as the lantern does, and read as
**warm against cold** — the same argument A7 made for giving citizens a warm
outline against the neon.

### 2 and 3 — your call, with a constraint

Two more ornaments. The constraint is that they should not all be light sources;
the category is already lantern-heavy and adding three more glowing things makes
the night noisier rather than richer.

Directions worth considering, not instructions: something that reads as **found
rather than placed** (a salvage stack, a marker cairn, a stripped sign left
standing); something **horizontal**, since every existing ornament is a vertical
on a plinth; something that **means an absence** — the cypress is already "the
shape of one, in polymer", and that joke has more in it.

Follow `docs/CHARACTERS.md`. The verbs matter: you FURNISH, you never "build a
decoration". Words tied to dead things die — that rule produced SALVAGE from
TIMBER and it applies to whatever you name these.

---

## `three-nebula` — the rules

### It is render-only. This is not negotiable.

The save is an action log, and replay must be deterministic or loading a save
gives a different city. **A particle may never touch world state** — not
pockets, not nav, not infill, not the action log, not a stat meter.

The test is concrete: `CAP.chronicleRoundTrip()` must still return `ok: true`,
and the fresh-city numbers must not move. If a particle system can change
either, it is wired in wrong.

### No shipped binary assets

Standing constraint, and this is exactly where it usually gets broken: every
`three-nebula` example loads a sprite PNG. **Generate the particle texture
procedurally on a canvas** and build a `CanvasTexture` from it. The game already
does runtime canvas work — see the billboard atlas at the end of `C_` in
`05-world.ts` — so there is a pattern to follow.

### Bounded, pooled, and culled

A player can place fifty braziers. Fifty independent emitters running at full
rate is a frame-rate bug waiting to happen.

- One shared system with a fixed particle budget, not one system per brazier
- Emit only for braziers within some distance of the camera, and only when they
  are actually on screen
- Dial the rate down or off in daylight — embers you cannot see still cost

### It may already be set up when you land

The Chronicle work in `briefs/FABLE-BRIEF-9.md` also specifies `three-nebula`,
for dust as each action replays, and it is being built in parallel with this. If
a nebula setup already exists in the tree when your branch merges, **reuse it —
do not stand up a second one.** Two particle systems with two budgets is the
outcome nobody wants.

### The other three libraries

`postprocessing` is reserved for the Chronicle's own effect chain and should not
be touched here. `three-gpu-pathtracer` has no business in this brief.
`jolt-physics` is not used in this project — structures are static and replay
must stay deterministic; see brief 9 for the full reasoning.

---

## The touchpoints

Adding an `emb` entry is a small, well-defined edit across a known set of files.
Trace `cypress` to find them all — it is the cleanest existing example because
it is pure geometry with no pocket and no water source:

| file              | what                                                                  |
| ----------------- | --------------------------------------------------------------------- |
| `09-catalogue.ts` | the `emb` array — `key`, `label`, `hint`                              |
| `04-builders.ts`  | `buildOrnament` — the `i.kind === ...` branch, geometry, cost         |
| `03-geometry.ts`  | any new mesh helper, in the style of `buildTree`                      |
| `11-tools.ts`     | `costOf` and the draft/preview path, if the cost is not stock         |
| `16-hud.ts`       | the FURNISH palette, if entries are not enumerated from the catalogue |

Check that last one rather than assuming — if the palette is generated from
`BUILD_CATALOGUE`, three new entries appear for free and there is nothing to do.

**Do not add new types to the seeded ruins** (`Ah()` in `05-world.ts`). The
fresh-city verification numbers are a baseline the whole project checks against;
seeding a new ornament would move them and the change would look like a
regression forever after.

---

## Still frozen

Existing catalogue `key` values, and the envelopes of existing types.
`pickPocket` and the five stat formulas. `applyAction` and the pocket model stay
deterministic, and every builder keeps seeding its PRNG from the action id —
that is what makes a replayed city identical.

`legacy/` is never edited. Never run `split_bundle.py --write`; never delete
`src/.hand-edited`. No shipped binary assets and no runtime fetches.

New geometry must be **merged** — the draw-call budget is real, and
`CAP.status()` reports `draws` and `tris` so you can check what you cost.

---

## Verify

- `yarn typecheck` clean, `yarn build` green, **bundle delta reported** — say
  what `three-nebula` costs, since that is the whole question about it
- `yarn format:check` clean
- **Fresh city still reports 24 structures, 48 pockets, 1331 navNodes, 46 pop,
  kinds 12/34/1/1.** Nothing here may move these
- `CAP.chronicleRoundTrip()` still `ok: true` — call it twice and compare the
  second and third, since the first of a session reports a known pre-existing
  one-pocket boot discrepancy that is not yours
- Place all three ornaments, reload, and confirm the city rebuilds identically —
  this is what "deterministic replay" means in practice, and it is the test that
  catches a builder that forgot to seed from the action id
- **Place a dozen braziers and watch the frame rate**, then check `draws` and
  `tris` before and after. Report both numbers
- **Look at it at night.** That is what the brazier is for, and daylight will
  tell you nothing about whether it works

Back up the save first: `localStorage.getItem('capriccio-save-v1')` written to
disk is the only copy in existence. `?fresh` deletes the save on load — never
put it on `:8123`; use `:8125` for a clean original.
