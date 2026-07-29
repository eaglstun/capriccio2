# src/ — the app section, cut into readable files

## What this is

A **reversible reconstruction** of the game code from
`public/assets/index-DCXbw2vV.js`. Statements are verbatim and in original
order. What IS applied, all of it mechanically and all of it undoable:

- identifier renames from `renames.json` (89 so far)
- generated `import`/`export` blocks
- one relocation to `_hoisted.js` (see below)

`split_bundle.py` verifies by undoing all three and requiring the result to be
**byte-identical** to the original app section. That is what makes editing
code nobody can read safe: "looks right" becomes "provably the same program".

Regenerate at any time:

```sh
python3 tools/split_bundle.py --write
```

The tool fails loudly rather than silently producing garbage: it verifies that
concatenating these files in `manifest.json` order reproduces the original app
section **byte for byte**, and it aborts if any anchor stops matching.

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
| draw calls / triangles | 96 / 561,016    | 96 / 561,016                               |
| opening request        | reach-terrace   | reach-terrace                              |

18 modules + `_hoisted.js` + `_runtime.js`, 89 identifiers renamed including
all 48 three.js symbols.

`public/` is still the reference copy — the artifact as Mollick deployed it.
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

In one flat scope a `function` declaration is hoisted, so a caller can sit
above it. Split into modules that becomes a forward import — and because
bootstrap constructs `new Hud(...)`, hud importing `rv` from bootstrap made a
real cycle. Rollup evaluated bootstrap first and the game died with
`Cannot access 'Hud' before initialization`.

`rv` is therefore relocated to `_hoisted.js`, reproducing the hoisting the
original relied on. **The relocation is recorded in `manifest.json` and undone
by the integrity check**, so byte-identity with the original still holds.

## The split

Vendor (three.js r180 + OrbitControls) occupies bundle lines 1–25400 and is
deliberately **not** included here — it is a dependency, not source. The app
is lines 25401–30968: 174KB, 5,568 lines, 186 top-level statements.

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

Not by heuristics. `tools/split_bundle.py` holds an explicit `ANCHORS` list —
a regex per section matched against the **first line** of a top-level
statement. Each anchor opens a section; following statements join it until the
next anchor. The list is a reviewable claim about the code rather than a
guess, and if the bundle ever changes, unmatched anchors abort the run.

Two things the splitter has to get right:

1. **GLSL lives in template literals and its lines start at column 0.** Naive
   "top-level statements start at column 0" detection cuts straight through
   the shaders. The scanner tracks string, template (including `${}`) and
   comment state.
2. **The seam.** `const j0 = \`` at line 25401 is the first app declaration —
   a fullscreen-quad vertex shader. Everything above it is OrbitControls
   pointer handlers and three.js.

## Reading order

Start at `05-world.js` and `06-infill.js` — between them they hold the actual
game. `00-shaders.js` is the most readable file in the project because GLSL
comments survived minification (see `../docs/COMMENTS.md`).

## Next steps

Steps 1–4 are done: vendor mapped, symbols renamed, modules emitted, build
green and behaviourally identical. What remains is quality, not correctness:

1. **Rename locals.** The top-level surface is named but method bodies are
   still `t`/`e`/`n`. This needs real per-function scope analysis — a parser,
   not a regex. Biggest readability win left by far.
2. **Rewrite class fields.** Replace the 124 `defineField(this, ...)` calls
   with real class-field syntax, then delete `_runtime.js`.
3. **Fold `_hoisted.js` back** once `16-hud` and `17-bootstrap` no longer form
   a cycle — likely after bootstrap is split into declarations and init.
4. **Rename the remaining ~79 top-level symbols**, including the 14 shadowed
   ones (each needs manual verification).
5. **Behavioural diffing beyond fresh state** — replay an action log through
   both builds and compare, rather than only comparing world genesis.

## Regenerating the analysis

```sh
python3 tools/split_bundle.py --analyse    # section report
python3 tools/split_bundle.py --write      # emit src/, verify reassembly
python3 tools/scope_graph.py --shadows     # dependency graph + shadow audit
python3 tools/scope_graph.py --json g.json # machine-readable graph
```
