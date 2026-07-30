# Module structure of the app section

Produced by `tools/scope_graph.py`. Run it again after any change to `src/`.

## Headline: there are no cycles

Every cross-file reference points **backwards** in the emitted file order.
`00-shaders` depends on nothing; `17-bootstrap` depends on twelve files and
nothing depends on it. The split order is already a valid topological order,
which means:

- ES modules can be wired up with plain `import`/`export`. No circular-import
  gymnastics, no lazy accessors, no init-order hazards.
- The subsystems really are layered, not tangled. That is not typical of bundled
  game code and it makes everything downstream cheaper.

```text
shaders → materials → nav ─┐
                 └→ geometry → builders ─┐
                                world ───┼→ infill → citizens → save
                                         │              ↓
                        catalogue, overlays, tools, requests, modes,
                        plates, audio, hud
                                         ↓
                                   bootstrap
```

## The dependency table

168 top-level names across 18 files.

| file           | needs | from                                       |
| -------------- | ----- | ------------------------------------------ |
| `00-shaders`   | —     | (leaf)                                     |
| `01-materials` | 4     | shaders                                    |
| `02-nav`       | 3     | materials                                  |
| `03-geometry`  | 3     | materials                                  |
| `04-builders`  | 20    | geometry (16), materials (4)               |
| `05-world`     | 14    | materials (7), geometry (5), nav, builders |
| `06-infill`    | 8     | geometry (4), materials (3), world         |
| `07-citizens`  | 3     | materials (2), infill                      |
| `08-save`      | 2     | citizens                                   |
| `09-catalogue` | —     | (leaf)                                     |
| `10-overlays`  | 1     | materials                                  |
| `11-tools`     | 10    | citizens (4), catalogue (2), + 4 others    |
| `12-requests`  | 3     | materials, world, citizens                 |
| `13-modes`     | 1     | shaders                                    |
| `14-plates`    | —     | (leaf)                                     |
| `15-audio`     | —     | (leaf)                                     |
| `16-hud`       | 2     | catalogue, citizens                        |
| `17-bootstrap` | 28    | twelve files — the composition root        |

Three files are true leaves: `09-catalogue` (pure data), `14-plates`, and
`15-audio`. The audio system depending on _nothing_ is worth noting — it's fully
self-contained and could be lifted out and reused as-is.

`17-bootstrap` is the composition root: it constructs `T_` (world), `I_`
(infill), `F_` (citizens), `$_` (requests), `Z_` (tools), `sv` (hud), `ev`
(audio), the mode classes, and assembles `window.CAP`.

## The vendor surface is small

App code references **48 real three.js symbols** over 237 references, plus one
bundler helper. All 48 are identified in `VENDOR-MAP.md` at `certain` confidence
— none unidentified.

Most-used: `P`=`Vector3`(60), `le`=`BoxGeometry`(23), `he`=`Mesh`(17),
`pe`=`BufferAttribute`(16), `Fe`=`CylinderGeometry`(14),
`ve`=`BufferGeometry`(12), `rn`=`Group`(9), `Ht`=`Color`(6).

`K`(124 refs) is **not three.js** — it is esbuild/Vite's `__publicField` helper
for class-field initialisers. It vanishes when compiled from real source and
must not become an import.

That is the entire dependency on 751KB of vendored three.js: 47 named exports
from `three@0.180` plus `OrbitControls` from `three/addons`. `VENDOR-MAP.md`
ends with the import block ready to paste.

What is **absent** is as informative: no `Texture`/`TextureLoader`, no
`GLTFLoader`, no `AnimationMixer`, no `Points`/`Sprite`, no `Box3`/`Frustum`, no
`MeshStandardMaterial`. All geometry is generated in-process, all lighting is
Lambert plus the engraving `onBeforeCompile` hook, and **nothing ships as an
asset**. For a 5,500-line 3D game that is remarkable, and it is the other half
of why this fits on a floppy disk.

### These numbers were wrong until they were checked

This section previously claimed **64 symbols over 278 references**. Both figures
were artefacts of the 2-char heuristic:

- **False negatives.** Only 2-char names were counted, so `P` = `Vector3` — the
  single largest dependency at 60 references — was invisible.
- **False positives.** 17 of the 64 were app-local: 14 object-literal keys
  (`id`, `ax`, `ay`, `az`, `bx`, `by`, `bz`, `cx`, `x0`, `z0`…) which are not
  preceded by `.` and so slipped past the lookbehind, and 3 indented locals.

`scope_graph.py` now checks candidates against the names actually declared at
top level **in the vendor half** (including continuation declarators, which
three.js uses for its enum constants) and excludes object-key positions. It
independently reproduces 48/237 exactly.

## Method, and where to distrust it

All 130 originally-declared top-level names are **exactly two characters** — the
minifier spends 1-char names on frequent locals. So a 2-char token is a good
proxy for a top-level reference. Strings, template literals and comments are
masked before matching, so GLSL and UI copy contribute no phantom edges.

**This is a heuristic, not scope analysis.** The audit (`--shadows`) finds **14
of 168 names are also declared in an inner scope somewhere**, meaning edges
involving these may be false positives:

```text
Ch  Co  Fr  Kt  Pe  Pl  Qe  Th  bi   (+5 more)
```

Verify these by hand before relying on any edge that mentions them. Everything
else is sound.

## Keeping the split lossless through renaming

Once identifiers are renamed, the byte-identical reassembly check in
`split_bundle.py` no longer applies — so it must be replaced with a stronger
invariant, not dropped:

> Maintain `src/renames.json` as `{mangled: friendly}`. Applying the **inverse
> map** to `src/` and concatenating must still reproduce the original app
> section byte for byte.

That keeps every rename provably a pure identifier substitution. Any edit that
changes structure rather than names will fail the check immediately, which is
exactly what you want when working on code nobody can read yet.
