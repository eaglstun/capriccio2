# src/ — the app section, cut into readable files

## What this is

A **lossless partition** of the game code extracted from
`public/assets/index-DCXbw2vV.js`. Nothing has been renamed, reordered, or
rewritten. Every byte is where it was; only the file boundaries are new.

Regenerate at any time:

```sh
python3 tools/split_bundle.py --write
```

The tool fails loudly rather than silently producing garbage: it verifies that
concatenating these files in `manifest.json` order reproduces the original app
section **byte for byte**, and it aborts if any anchor stops matching.

## What this is NOT

**These are not yet working ES modules.** They cannot be imported or built.
Every file references identifiers declared in other files, and there is not a
single `import` or `export` among them — because the original was one
concatenated scope and the identifiers are all mangled to one or two
characters. Wiring them up requires scope analysis that has not been done yet.

`public/` remains the only runnable copy of the game. Serve from there.

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
comments survived minification (see `../COMMENTS.md`).

## Next steps, roughly in order

1. **Scope analysis** — build the reference graph across files, then emit
   `import`/`export` so this becomes a real module tree.
2. **Progressive renaming** — with a module graph in place, rename mangled
   identifiers one subsystem at a time. `05-world.js` and `06-infill.js` have
   the best documentation behind them (`../SIMULATION.md`), so they are the
   cheapest to name.
3. **A build** that produces a bundle which behaves identically to `public/`.
   Until then, `public/` is the source of truth and this directory is for
   reading.
