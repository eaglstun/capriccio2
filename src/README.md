# src/ — the app section, cut into readable files

> **This tree is TypeScript.** Every module is `.ts`, checked by
> `yarn typecheck` (`tsc --noEmit`, currently **0 errors**) and transpiled by
> esbuild inside Vite. Much of the history below describes the `.js` tree it was
> converted from; that history is still true of how the code got here, but the
> filenames in it are one extension out of date. See **"The TypeScript
> conversion"** near the bottom.

## What this is

A **reversible reconstruction** of the game code from
`legacy/assets/index-DCXbw2vV.js`. Statements are verbatim and in original
order. What IS applied, all of it mechanically and all of it undoable:

- identifier renames from `renames.json` (89 so far)
- generated `import`/`export` blocks
- one relocation to `_hoisted.js` (see below)

`split_bundle.py` verifies by undoing all three and requiring the result to be
**byte-identical** to the original app section. That is what makes editing code
nobody can read safe: "looks right" becomes "provably the same program".

**That reversibility is historical now — do not try to use it.** Two things have
broken it, in order: the vaporwave reskin hand-edited `00`–`17` (see
`DO-NOT-REGENERATE.md`), and the TypeScript conversion renamed every module and
added type annotations the splitter cannot emit. `split_bundle.py --write` would
overwrite the entire tree with regenerated JavaScript. The marker file
`src/.hand-edited` makes it refuse; leave it there.

Historically the tool failed loudly rather than silently producing garbage: it
verified that concatenating these files in `manifest.json` order reproduces the
original app section **byte for byte**, and it aborts if any anchor stops
matching.

## It builds, and it runs

```sh
yarn install
yarn build        # -> dist/
```

**662,197 bytes** against the original deployed **662,267** — a 0.01%
difference. Loaded in a browser it renders the city, boots the simulation, and
logs **zero console errors**.

Fresh-state equivalence, rebuilt vs original, measured field by field on
separate origins so neither could see the other's save:

|                        | original        | rebuilt                                    |
| ---------------------- | --------------- | ------------------------------------------ |
| structures / pockets   | 24 / 48         | 24 / 48                                    |
| occupied / infill      | 9 / 9           | 9 / 9                                      |
| nav nodes              | 1331            | 1331                                       |
| population             | 46              | 46                                         |
| agent pool             | 132 (46 active) | 132 (46 active)                            |
| stone / timber / favor | 700 / 160 / 12  | 700 / 160 / 12 (timber now `salvage`, A14) |
| pocket kinds           | 12/34/1/1       | 12/34/1/1                                  |
| draw calls / triangles | 96 / 561,016    | no longer comparable — see below           |
| opening request        | reach-terrace   | reach-terrace                              |

Every row above still holds except the draw-call one, which has stopped being a
useful check for two separate reasons.

The rebuilt scene genuinely draws more than the original did: the apron hills
(A11) and the billboards (A13) added geometry the original never had, so a
divergence here is now expected rather than a symptom.

More importantly the figure is **not stable between samples**. Draw calls are
counted after frustum culling, so they move with the camera. Three fresh cities,
each with zero player actions, measured 146, 150 and 179 draws at
597,742–599,210 triangles. It cannot be an equality check against a single
number.

The `96 / 561,016` in the original column is left as recorded when it was taken;
it has not been re-measured against `legacy/`. The rows that _are_ stable —
structures, pockets, nav nodes, population, pocket kinds — held exactly on every
sample and remain the verification figures worth trusting.

18 modules + `_hoisted.ts`, plus `18-music.ts` and `19-tutorial.ts` which are
hand-written and were never in the bundle. 89 identifiers renamed including all
48 three.js symbols. `_runtime.ts` is no longer imported by anything — the
class-field rewrite it was waiting for has happened.

`legacy/` is still the reference copy — the artifact as Mollick deployed it.
`dist/` is the reconstruction.

### Three bugs that only running it could find

Static analysis said this was correct. It was not.

**1. `${}` interpolations were being masked.** `mask()` blanked entire template
literals, but interpolations are live code. `16-hud.js` calls `rv(t)` only from
inside `` `day ${rv(t)} · ${n[s]}` ``, so the reference was invisible, no import
was generated, and the game threw `ReferenceError: rv is not defined`.

**2. `scope_graph.py` had its own stale copy of `mask()`.** Fixing the shared
`jsmask.py` changed nothing there for an embarrassing while.

**3. `...spread` was read as property access.** The identifier regex used a
`(?<![.\w$])` lookbehind to skip `.prop` — but `...name` also ends in a dot.
Every spread-referenced identifier was invisible to both the renamer and the
graph, so `...yt` survived while every other `yt` became `gameState`, and
`CAP.status()` threw `ReferenceError: yt is not defined`.

### The cycle, and `_hoisted.js`

In one flat scope a `function` declaration is hoisted, so a caller can sit above
it. Split into modules that becomes a forward import — and because bootstrap
constructs `new Hud(...)`, hud importing `rv` from bootstrap made a real cycle.
Rollup evaluated bootstrap first and the game died with
`Cannot access 'Hud' before initialization`.

`rv` is therefore relocated to `_hoisted.js`, reproducing the hoisting the
original relied on. **The relocation is recorded in `manifest.json` and undone
by the integrity check**, so byte-identity with the original still holds.

## The split

Vendor (three.js r180 + OrbitControls) occupies bundle lines 1–25400 and is
deliberately **not** included here — it is a dependency, not source. The app is
lines 25401–30968: 174KB, 5,568 lines, 186 top-level statements.

| file              | lines | what                                                          |
| ----------------- | ----- | ------------------------------------------------------------- |
| `00-shaders.js`   | 517   | Engraving GLSL: post pass, hatching, masonry, sky, ink, paper |
| `01-materials.js` | 290   | The `onBeforeCompile` hook and the stone palette              |
| `02-nav.js`       | 157   | Navigation graph (spatial hash) + pocket registry             |
| `03-geometry.js`  | 597   | Geometry utilities: merging, primitives, weathering           |
| `04-builders.js`  | 641   | Mesh builders — span, rise, vault, wall, ornament             |
| `05-world.js`     | 615   | Terrain, structures, pockets, water, `applyAction`            |
| `06-infill.js`    | 276   | Vernacular buildings + the `pickPocket` growth engine         |
| `07-citizens.js`  | 355   | Agent pool, daily routine, pathing                            |
| `08-save.js`      | 28    | The event-sourced action log                                  |
| `09-catalogue.js` | 75    | Building catalogue (`La`) and footprints                      |
| `10-overlays.js`  | 129   | Dashed build guides, carvable marks                           |
| `11-tools.js`     | 375   | Placement tool state machine                                  |
| `12-requests.js`  | 118   | Citizen petitions and flavour text                            |
| `13-modes.js`     | 136   | SECTION (cut plane) and WANDER (first person)                 |
| `14-plates.js`    | 47    | The etching capture mechanic                                  |
| `15-audio.js`     | 134   | Procedural soundscape — no samples ship                       |
| `16-hud.js`       | 502   | Stylesheet and UI class                                       |
| `17-bootstrap.js` | 575   | Boot sequence, input wiring, `window.CAP`                     |

## How the boundaries were chosen

Not by heuristics. `tools/split_bundle.py` holds an explicit `ANCHORS` list — a
regex per section matched against the **first line** of a top-level statement.
Each anchor opens a section; following statements join it until the next anchor.
The list is a reviewable claim about the code rather than a guess, and if the
bundle ever changes, unmatched anchors abort the run.

Two things the splitter has to get right:

1. **GLSL lives in template literals and its lines start at column 0.** Naive
   "top-level statements start at column 0" detection cuts straight through the
   shaders. The scanner tracks string, template (including `${}`) and comment
   state.
2. **The seam.** `const j0 = \`` at line 25401 is the first app declaration — a
   fullscreen-quad vertex shader. Everything above it is OrbitControls pointer
   handlers and three.js.

## Reading order

Start at `05-world.js` and `06-infill.js` — between them they hold the actual
game. `00-shaders.js` is the most readable file in the project because GLSL
comments survived minification (see `../docs/COMMENTS.md`).

## Next steps

Steps 1–4 are done: vendor mapped, symbols renamed, modules emitted, build green
and behaviourally identical. What remains is quality, not correctness:

1. **Rename locals.** The top-level surface is named but method bodies are still
   `t`/`e`/`n`. This needs real per-function scope analysis — a parser, not a
   regex. Biggest readability win left by far.
2. ~~**Rewrite class fields.**~~ **Done.** All 137 `defineField(this, ...)` call
   sites (not 124 — the old count was low) across 15 classes are real class
   fields. `_runtime.ts` is unreferenced and can be deleted whenever someone is
   comfortable doing it.
3. **Fold `_hoisted.js` back** once `16-hud` and `17-bootstrap` no longer form a
   cycle — likely after bootstrap is split into declarations and init.
4. **Rename the remaining ~79 top-level symbols**, including the 14 shadowed
   ones (each needs manual verification).
5. **Behavioural diffing beyond fresh state** — replay an action log through
   both builds and compare, rather than only comparing world genesis.

## The TypeScript conversion

The tree was `.js` until it was converted in one pass. What that involved, and
what it deliberately did not:

**Settings are permissive on purpose.** `tsconfig.json` has `strict: false` and
`noImplicitAny: false`. The point of phase 1 was to make the tree compile as
real TypeScript and pick up three.js's types for free, not to annotate 10,000
lines of extracted bundle code. Turning those flags on, module by module, is
phase 2. **Do not add annotations to satisfy a flag that is still off.**

**Class fields were the whole job.** 849 of the initial errors were one problem:
TypeScript cannot see a property installed by `Object.defineProperty`, which is
what the `defineField` shim did, so every read of one was an error. Converting
the 137 call sites to real fields took it to 151 in a single pass.
`useDefineForClassFields: true` makes that a semantics-preserving change — it is
`[[Define]]`, exactly what the shim did.

Three fields use `declare` rather than a plain declaration — `World.sceneTick`,
`Citizens.look`, `Soundscape.bellShaper`. Those were never `defineField`ed; they
are assigned lazily and did not exist as own properties before first assignment.
`declare` emits nothing, so that stays true. **Do not "tidy" them into ordinary
fields** — that would newly define them as `undefined`.

**Two named types carry real contracts.** `StructureParts` in `03-geometry`
(what every builder returns; `anchorTop` is optional because only anchors set
it, which is why the world module tests for it) and `PlacedAction` in `11-tools`
(the record a placement commits — the shape the save stores). The per-tool
action union is genuinely a discriminated union on `t` and is left open; writing
it out is phase-2 work.

### Verified against the pre-conversion build

Not "it looked fine". The `main` build and the TypeScript build were both loaded
with the same 1,941-byte save on separate origins, and driven through the same
sequence — load, place a pier, undo:

|            | main (pre-conversion) | typescript         |
| ---------- | --------------------- | ------------------ |
| structures | 26 → 27 → 26          | 26 → 27 → 26       |
| nav nodes  | 1332 → 1333 → 1332    | 1332 → 1333 → 1332 |
| pockets    | 52 → 52 → 53          | 52 → 52 → 53       |
| anchors    | 4 → 5 → 4             | 4 → 5 → 4          |

Identical, including the quirk: **undo does not restore the pocket count.**
`undo` runs `rebuildAll`, which clears `pockets` and replays the action list —
but the boot-time `seedGroundPockets` calls are not part of that list and are
not replayed. Pre-existing, reproduced exactly on both builds, untouched here.

### One finding, left unfixed on purpose

`16-hud`'s `showPlate(t, e /* , evicted */)` has its third parameter commented
out, but `17-bootstrap:513` still passes a third argument — and lines 511–512
compute it to do so. Dead work feeding a parameter nobody reads. The signature
now declares it optional so the call typechecks; **the call site was left
alone**, because deleting live code is not a conversion's job.

## Regenerating the analysis

```sh
python3 tools/split_bundle.py --analyse    # section report
python3 tools/split_bundle.py --write      # emit src/, verify reassembly
python3 tools/scope_graph.py --shadows     # dependency graph + shadow audit
python3 tools/scope_graph.py --json g.json # machine-readable graph
```
