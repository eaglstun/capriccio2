---
name: capriccio
description:
  Inspect and reverse-engineer CAPRICCIO, the Piranesi city-builder build in
  this repo. Use when investigating how the game works — its pockets, citizens,
  world, save format, requests, rendering — or when running, serving, or probing
  it in a browser. Covers the `window.CAP` debug API and the `CAPX` probe
  helpers.
---

# CAPRICCIO investigation

A generated Piranesi city-builder, shipped as a minified production bundle with
no source.

| doc                  | contents                                                            |
| -------------------- | ------------------------------------------------------------------- |
| `CLAUDE.md`          | provenance, how to serve it, hard rules                             |
| `PLAN.md`            | the phased investigation and what worked                            |
| `FINDINGS.md`        | static analysis, save format, full building catalogue               |
| `docs/SIMULATION.md` | the runtime model — pockets, agents, growth, all five stat formulas |
| `docs/RENDERING.md`  | how the engraving look works (triplanar hatching)                   |
| `docs/AUDIO.md`      | the procedural soundscape                                           |
| `docs/CHARACTERS.md` | the cast and the rules the citizen writing follows                  |
| `docs/COMMENTS.md`   | every comment that survived minification — the only stated intent   |
| `tools/probe.js`     | `CAPX` introspection helpers                                        |

**The shaders are the most readable code in the bundle.** GLSL lives in template
strings and minifiers don't strip comments inside strings — the original
author's comments survive verbatim around lines 25400–25900. When you need to
know intent rather than behavior, read there.

## Rule zero: don't read the bundle

Identifiers are 100% mangled. The build exposes **`window.CAP`**, a 33-key debug
handle onto every subsystem. Any question about behavior is answered faster
there than in source.

Read source only to find _constants and strings_ the minifier preserved — object
literals with string keys (like the building catalogue `La` at line 28877)
survive perfectly intact.

## Serving it

```sh
cd public && python3 -m http.server 8123 --bind 127.0.0.1
```

Must be served from `public/` as web root — the bundle requests `/assets/...`
absolutely. The `type="module"` tag means it is **refused if the MIME type is
wrong**; it must come back `text/javascript`.

- `http://127.0.0.1:8123` — play
- `http://127.0.0.1:8123/?fresh` — wipe the save on boot

## Probing

Paste `tools/probe.js` into the console to define `CAPX`, then:

```js
CAPX.snapshot(); // whole-sim summary: time, res, agents, pockets, structures
CAPX.occupancy(); // which pockets are inhabited, and their qualities
CAPX.probe(CAP.x); // keys + prototype methods + collection sizes of any subsystem
CAPX.clip(obj); // JSON.stringify that collapses three.js objects to tags
CAPX.save(); // force a save and summarize the blob
```

**The highest-value technique is diffing:**

```js
const before = CAPX.snapshot();
// ...perform one action in the UI...
CAPX.diff(before);
```

One action, one diff, and you learn exactly what it touched. This beats reading
code by a wide margin for a minified target.

## Two traps

1. **Never `JSON.stringify` a three.js object raw.** `CAP.scene` serializes to
   megabytes and blows the output limit. Always go through `CAPX.clip`.
2. **Don't dump function `.toString()` bodies** into tool output — the content
   filter flags them as cookie/query-string data and blocks the whole result.

## The model in one paragraph

You place _architecture_, not buildings. Architecture emits **pockets** —
habitable voids scored on `shelter`, `light`, `scenic`, `area`, and distance to
water. Citizens occupy pockets. The five HUD meters aggregate over occupied
pockets. Agents are a fixed pool of 132 slots with ~46 `active`, drawn as 3
`InstancedMesh`es, running a `home → towork → work` daily routine on a nav
graph. The save is an **action log**, not a snapshot: starting ruins are seeded
separately, and only player actions are persisted and replayed.

## Don't

Don't edit `public/assets/index-DCXbw2vV.js`. It is a build artifact and the
only copy of the game; there is no source to regenerate it from. Write findings
to separate files.
