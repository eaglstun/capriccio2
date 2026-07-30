# CAPRICCIO — reverse-engineering plan

Goal: understand how this game works, well enough to explain its architecture,
its data model, and its simulation. We are doing **archaeology, not
decompilation** — there is no source map. We will recover _what it does_ and
_how it is structured_. We will never recover original names or comments.

## What we're working with

- One `index.html` + one JS bundle. No source, no `package.json`, no map.
- Vendor (three.js + inlined GLSL) is roughly the first ~25,000 lines. App code
  is roughly the last ~6,000. **This seam is estimated, not measured — Phase 2
  pins it down.**
- **Identifiers are 100% mangled.** 865 declarations in the app section, every
  one ≤2 chars. Reading top-down like source is a trap.
- **String literals survived** (339 unique). Minifiers can't touch string
  contents or object string-keys. These are our anchors, and they are the reason
  this is tractable at all.

## Phases

### Phase 0 — Play it, steal the save blob ⬅ START HERE

Build a few things in-game, then read `localStorage['capriccio-save-v1']`.

A save file is the game's data model _voluntarily serialized with its keys
intact_. This is the single highest-payoff move available: it likely hands us
the world schema, the building enum, and agent state in clean readable form, for
ten minutes of play. Everything downstream gets easier.

- [x] Save **schema** recovered statically — it's an **action log**, not a world
      snapshot (see `FINDINGS.md`)
- [ ] Serve and play the game
- [ ] Dump a real save blob to confirm action shape + `infill` + `folio`
- [ ] Derive agent state (not present in the save — must come from runtime)

### Phase 1 — Build the catalogue from strings

Pair the 339 surviving strings into a real spec: each building's name,
description, cost, and stat effects. Names sit adjacent to their numbers in
source, so this is mostly mechanical.

Output: a design document for a game that never had one.

- [x] Assemble the building catalogue — **done**, found as a clean object
      literal (`La`, line 28877). 7 categories, 22 buildings, all with labels
      and flavor text. See `FINDINGS.md`.
- [ ] Assemble the stat/action model (GRANDEUR / BELONGING / ACCESS / …)
- [ ] Resolve the vault footprint discrepancy (hints disagree with constants)

### Phase 2 — Find the exact vendor/app seam

Locate precisely where three.js ends and the game begins, so we never
accidentally read a quaternion class again. Narrows the reading surface from 31k
lines to ~6k.

- [ ] Identify seam line number
- [ ] Extract app-only slice to a working file

### Phase 3 — Live introspection over static reading

Run with devtools open, breakpoint the input handlers, walk the real objects.
Mangled names don't matter when the debugger shows you an object's actual shape.
This is how we get the simulation: what a citizen _is_, what it wants, how it
chooses a building.

**Shortcut found: the build ships `window.CAP`**, a 33-key debug handle onto
every subsystem. No breakpointing needed. See `docs/SIMULATION.md`.

- [x] Capture a live world object — class `T_`, 48 pockets / 24 structures
- [x] Capture a live agent object — pooled, 132 slots / 46 active
- [x] Recover the pocket model — the game's central abstraction
- [x] Diff a single build action to learn what it mutates (`CAPX.diff`)
- [x] **Derive the stat-meter formula — SOLVED exactly**, all five verified
      against live bars. Recovered from source line 30709, not guessed.

### What actually worked

The winning move was **hybrid**, not pure runtime introspection: once the live
HUD gave us `qualBars` as a preserved string, that string located the
computation in source (line 30709) in one grep — and reading 20 lines beat any
number of black-box experiments. Runtime told us _where to look_; source gave
the exact formula; runtime then _verified_ it.

Neither approach alone would have got there. Note this in `bundle-archaeology`.

### Phase 4 — Targeted component reads

Each anchored to a string we already hold:

| Component       | Anchor strings                               |
| --------------- | -------------------------------------------- |
| World / grid    | the save schema (from Phase 0)               |
| Agents / sim    | `Sleeping`, `Gathering`, `Wander`, `Patient` |
| Audio           | `bandpass`, `aTone`, `birdTimer`             |
| Render / camera | `KeyW`, `KeyA`, `camera`                     |
| UI / input      | `BUILD`, `CLOSE`, `SAVE PLATE`, `Escape`     |

## What the strings already told us

**Buildings:** Aqueduct, Basilica, Bridge, Bridge Row, Cistern, Cloister Hall,
Column, Cypress, Dwelling, Fountain, Gallery, Garden, Giant Pier, Great Gate,
High Row, Laurel, Lantern, Market Hall, Passage, Pier, Quarter, Stair, Stairs,
Statue, Switchback, Terrace, Undercroft, Vaults, Well

**Stats:** ACCESS, ADORN, BELONGING, GRANDEUR, LIGHT, SHELTER, SPAN

**Actions:** BUILD, CARVE, ESTABLISH, INVITE, POST, PLATE, RISE, SECTION, VAULT,
WANDER

**Agent states:** Sleeping, Gathering, Trade, Quiet, Patient, Wander

**Time/season:** Morning, afternoon, Spring, Ember, Bright

**Controls:** KeyW/A/S/D, KeyP, KeyZ, Shift, Space, Escape, arrow keys

**Audio is synthesized, not sampled** — `bandpass`, `aTone`, `birdTimer` are Web
Audio. Part of why the whole thing fits in 662KB.

**Typography:** Iowan Old Style, Palatino Linotype — deliberate old-print serif
choice, consistent with the Piranesi conceit.
