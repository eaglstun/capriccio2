# Brief 2 for Fable — from reskin to world

The first pass recoloured CAPRICCIO. It worked, but the **geometry is still
Piranesi**: Roman masonry, cypresses, timber market stalls. It reads as an
antique city under a neon filter.

This pass makes the _world_ vaporwave-dystopian — scenery, backdrop, effects —
while the game underneath stays exactly the same.

Budget: **~30 minutes of substantial work.** Work in priority order; commit
after each block so partial progress survives.

---

## Unchanged hard constraints

Everything in `FABLE-BRIEF.md` still applies. The important ones:

- **Gameplay is frozen.** `pickPocket` weights, the five stat formulas,
  `applyAction`, the pocket model, the save format, catalogue `key` values.
  Existing saves must load.
- **No binary assets.** No images, video, audio files, webfonts, runtime
  fetches. Everything procedural. Currently 821KB — **stop and report if you
  pass 2.0MB.**
- **`legacy/` is never edited.**
- **Never run `tools/split_bundle.py --write`.** `src/` is hand-edited now; a
  guard will refuse, and `src/DO-NOT-REGENERATE.md` explains why. Do not remove
  `src/.hand-edited`.
- **Do not hand-rename identifiers.**

Verification after every block: `yarn build` green, and a fresh game still
reports **24 structures, 48 pockets, 1331 navNodes, 46 pop, kinds 12/34/1/1**.
If a number moves you changed gameplay — revert it.

---

## Priority 1 — the buildings stop being Roman

This is the biggest visual gap and the highest-value work. The mesh builders
live in `src/04-builders.js` (`buildSpan`, `buildRise`, `buildVault`,
`buildWall`, `buildOrnament`, `buildAnchor`) and geometry helpers in
`src/03-geometry.js` (`MeshBuilder`, primitives, `setToneAttribute`).

**Keep every footprint, height, and collision-relevant dimension identical** —
the pockets a structure emits are computed from its action geometry, so changing
sizes changes gameplay. Change the _detailing_, not the envelope.

Suggestions, not a checklist — use judgement:

- **Masonry → panelling.** The wall-course branch in `masonry()` currently draws
  horizontal stone courses. Panel seams, vents, service hatches and inspection
  plates read far more corporate-brutalist for the same cost.
- **Neon accreted onto the architecture.** Thin emissive strips along span
  edges, arch intrados, stair stringers. Signage slabs on wall faces. This is
  what makes it read as _inhabited_ rather than _painted_.
- **Rooftop clutter** on vaults and piers: antenna masts, dish clusters, extract
  fans, tanks, cable runs slung between anchors. Low-poly, built from the
  existing `MeshBuilder` primitives.
- **Ornament** (`buildOrnament`): statue → monolith or a figure in chrome;
  fountain → coolant basin with vapour; lantern → a neon standard or a
  flickering strip; cypress → a synthetic palm or an aerial mast.
- **Infill huts** are the vernacular fabric — the mint-green sheds. Make them
  read as shanty modules: corrugation, tarps, satellite dishes, stacked
  containers. They are the most numerous object in the scene, so they carry the
  mood more than any hero building.

Deterministic detailing only. Every builder seeds its PRNG from the action id
(`seededRng(id * 7919 + k)`) — **keep using that seed**, because replaying a
save must reproduce the same city exactly.

## Priority 2 — a dystopian backdrop

The horizon is currently empty gradient. Give it depth:

- **A megastructure skyline** — distant blocks, towers, stacks, gantries. Flat
  silhouettes at distance are fine and cheap; two or three parallax layers read
  as enormous.
- **Smog banding** near the horizon, denser and dirtier than the current haze.
- **Something in the sky.** Orbital ring, second moon, a hanging arcology,
  drifting airships, a distant flare. Pick one or two — restraint.
- **Vertical light shafts** from the horizon, very cheap and very genre.

All procedural, all placed from a fixed seed so it is stable across reloads. It
must not move with the camera in a way that breaks the sense of scale.

## Priority 3 — effects

three.js r180 is available, and `three/addons` may be used — including
`postprocessing/*` if you want `EffectComposer`. That is allowed, but weigh it
against the size budget and against the fact that the game already has a
hand-rolled post pass in `00-shaders.js` that may be cheaper to extend.

Worth considering, in rough order of payoff:

- **Bloom on emissive neon.** The single biggest "this looks expensive" win.
- **Wet ground / reflection.** A mirrored plane or a cheap screen-space fake.
  Enormously on-genre. Watch the cost — a second render pass doubles draws.
- **VHS tracking artefacts**: occasional horizontal displacement bands, chroma
  bleed, a slow vertical roll. The scanline machinery is already there.
- **Rain or drifting particles** via `Points`. Cheap, atmospheric, must not
  fight the hatching.
- **Volumetric-feeling fog** — the scene already uses exp2 fog; graded
  colour-by-height would do a lot.

Keep the triplanar hatching. It is the thing that makes this look hand-made
rather than filtered, and it should survive as dither/texture on every new
surface too.

## Priority 4 — if time remains

- **Night.** The clock already drives dusk. A true night phase where the neon
  carries the scene would be spectacular, and the audio already responds to
  `dusk`.
- Flavour text: Marcus the stonecutter can become something else. Labels and
  hints may change; **`key` values may not**.
- Update `docs/RENDERING.md` with what the renderer now does — it currently
  describes the original engraving and is stale on this branch.

---

## Report back

- what changed, by file
- bundle size before/after
- the `CAP.status()` numbers, confirmed in a browser if you can drive one — **do
  not claim it runs if you have not run it**
- anything you chose not to do, and why
- screenshots if you can take them

If something would require touching the frozen list, don't. Describe what you
would have needed instead.
