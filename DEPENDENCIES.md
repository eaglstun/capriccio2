# Module structure of the app section

Produced by `tools/scope_graph.py`. Run it again after any change to `src/`.

## Headline: there are no cycles

Every cross-file reference points **backwards** in the emitted file order.
`00-shaders` depends on nothing; `17-bootstrap` depends on twelve files and
nothing depends on it. The split order is already a valid topological order,
which means:

- ES modules can be wired up with plain `import`/`export`. No circular-import
  gymnastics, no lazy accessors, no init-order hazards.
- The subsystems really are layered, not tangled. That is not typical of
  bundled game code and it makes everything downstream cheaper.

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
`15-audio`. The audio system depending on _nothing_ is worth noting — it's
fully self-contained and could be lifted out and reused as-is.

`17-bootstrap` is the composition root: it constructs `T_` (world), `I_`
(infill), `F_` (citizens), `$_` (requests), `Z_` (tools), `sv` (hud), `ev`
(audio), the mode classes, and assembles `window.CAP`.

## The vendor surface is small

App code references only **64 distinct symbols** from the three.js half, over
278 references. Most-used: `id`(25), `le`(23), `he`(17), `pe`(16), `Fe`(14),
`ve`(12), `cx`(12), `Lt`(11), `rn`(9), `Ht`(6).

That is the entire dependency on 751KB of vendored three.js. Identifying those
64 and replacing them with named imports from `three@0.180` would let the
vendor copy be dropped from source entirely.

## Method, and where to distrust it

All 130 originally-declared top-level names are **exactly two characters** —
the minifier spends 1-char names on frequent locals. So a 2-char token is a
good proxy for a top-level reference. Strings, template literals and comments
are masked before matching, so GLSL and UI copy contribute no phantom edges.

**This is a heuristic, not scope analysis.** The audit
(`--shadows`) finds **14 of 168 names are also declared in an inner scope
somewhere**, meaning edges involving these may be false positives:

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
