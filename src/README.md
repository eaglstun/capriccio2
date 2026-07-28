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

## It is now a module tree

18 ES modules, **210 import bindings, 107 exported names**, every local import
verified to resolve against an actual export. 89 identifiers renamed, including
all 48 three.js symbols, so imports read as real code:

```js
import { Vector3, Mesh, BoxGeometry } from "three";
import { clamp, seededRng, terrainHeightAt } from "./01-materials.js";
```

**Still not built or run.** Nothing has executed these modules — `three` is not
installed, there is no bundler config, and the boot sequence in
`17-bootstrap.js` has not been exercised. Resolving is not the same as
running.

`public/` remains the only _known-working_ copy of the game. Serve from there.

### Two things to know before trusting it

**`_runtime.js` is a shim.** `defineField` (124 calls) is esbuild's
`__publicField`, emitted because the original source used class-field syntax.
It is not part of three.js and must never be imported from it. Once the class
bodies are rewritten to real field syntax, every call site and that file can
be deleted.

**`DynamicDrawUsage` is imported under its mangled name `Lu`**, because a local
in `07-citizens.js` shadows it. Renaming it globally would have corrupted that
scope.

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

## Next steps

**Scope analysis is done** — see `../DEPENDENCIES.md`. The headline: **there
are no dependency cycles.** Every cross-file reference points backwards, so
this file order is already a valid topological order and `import`/`export` can
be added without any circular-import handling.

Remaining, in order:

1. **Map the vendor surface.** App code touches only **64 distinct three.js
   symbols**. Identify them and the vendored 751KB can be replaced with named
   imports from `three@0.180`. → agent `capriccio-vendor-mapper`
2. **Progressive renaming**, one subsystem at a time, preserving reversibility
   via `renames.json`. → agent `capriccio-renamer`
3. **Emit `import`/`export`.** Cheap once 1 and 2 are done, because the graph
   is acyclic and the dependency lists are small (most files need fewer than
   ten names).
4. **A build** that produces a bundle behaving identically to `public/`.

Until step 4 lands, `public/` is the source of truth and this directory is for
reading.

## Regenerating the analysis

```sh
python3 tools/split_bundle.py --analyse    # section report
python3 tools/split_bundle.py --write      # emit src/, verify reassembly
python3 tools/scope_graph.py --shadows     # dependency graph + shadow audit
python3 tools/scope_graph.py --json g.json # machine-readable graph
```
