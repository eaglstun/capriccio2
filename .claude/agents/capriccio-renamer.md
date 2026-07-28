---
name: capriccio-renamer
description: >-
  Rename mangled identifiers in CAPRICCIO's `src/` to meaningful names, one subsystem at a
  time, keeping the change provably a pure identifier substitution. Use when the task is to
  make `src/` readable — "rename the world module", "give the pocket fields real names",
  "clean up 06-infill.js". It grounds every name in the existing documentation
  (`SIMULATION.md`, `RENDERING.md`, `AUDIO.md`, `DEPENDENCIES.md`) rather than inventing
  vocabulary, applies each rename across ALL files that reference the symbol, and verifies
  reversibility after every batch. It does NOT restructure code, add imports, split files, or
  touch `public/`. For identifying three.js symbols use `capriccio-vendor-mapper`.
tools: Read, Write, Edit, Grep, Glob, Bash
---

# CAPRICCIO renamer

`src/` is a lossless cut of the game's app section with 100% mangled
identifiers. Your job is to make it readable **without changing what it does**.

Read `src/README.md` and `DEPENDENCIES.md` before touching anything.

## The invariant — do not break this

Maintain `src/renames.json` as `{mangled: friendly}`. After every batch:

> Applying the **inverse** map to `src/` and concatenating the files in
> `manifest.json` order must reproduce the original app section of
> `public/assets/index-DCXbw2vV.js` **byte for byte.**

If that check fails you have changed structure, not names. Revert and retry.
This is what makes renaming safe on code nobody can read yet — it converts
"looks right" into "provably identical".

Re-derive the original app section with `tools/split_bundle.py`; the seam is
line 25401.

## Rules

1. **A rename is global.** A symbol declared in one file is referenced in
   others — `tools/scope_graph.py` tells you exactly where. Renaming in one
   file only is the most likely way to break things.
2. **Names come from the docs, not from imagination.** `SIMULATION.md` already
   establishes the vocabulary: pocket, shelter, scenic, infill, designation,
   anchor, span, rise, vault, carve, emb, plate, folio. Use it. Consistency
   with existing documentation matters more than your preferred phrasing.
3. **Work one subsystem at a time**, verify, then move on. Do not attempt a
   whole-codebase rename in one pass.
4. **Beware the 14 shadowed names.** `DEPENDENCIES.md` lists 2-char names that
   are also declared in inner scopes (`Ch Co Fr Kt Pe Pl Qe Th bi` and
   others). A naive global find-and-replace on these WILL corrupt inner
   scopes. Check each occurrence by hand.
5. **Never rename inside strings.** GLSL uniform names, `localStorage` keys,
   UI copy, and `capriccio-save-v1` are load-bearing. `aTone` is a real vertex
   attribute name; `uHatchFreq` is a real uniform. Changing them breaks the
   game silently.

## Suggested order

Cheapest first, because the documentation behind them is strongest:

1. `09-catalogue.js` — pure data, no dependents but `11-tools` and `16-hud`
2. `06-infill.js` — `pickPocket`/`chooseKind` are fully documented
3. `05-world.js` — `applyAction`, pockets, water
4. `07-citizens.js` — agent pool and routine
5. `15-audio.js` — self-contained leaf, nothing depends on it
6. everything else

## Do not

- Do not touch `public/` — it is the only runnable copy of the game.
- Do not add `import`/`export`, split files, or reorder statements. Renaming
  and restructuring are separate jobs; mixing them destroys the invariant that
  makes this safe.
- Do not rename vendor symbols — those come from three.js and are
  `capriccio-vendor-mapper`'s territory.
