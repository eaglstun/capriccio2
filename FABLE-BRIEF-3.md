# Brief 3 for Fable — modern ruins, and a world that was lived in

Pass 2 landed. The city reads as the end of humanity now. Two things are still
wrong, and one is structural.

**The ruins are still ancient.** You skinned them beautifully, but a Roman
barrel vault with a neon strip on it is still a Roman barrel vault. At the end
of humanity the ruins you inherit are **ours** — concrete, rebar, glass,
infrastructure — not Rome's.

Budget: **~30 minutes.** Size ceiling is 2MB but **loose** — the user's words:
_don't cut something that's really good just for the sake of file size._
Cut it only if it's not good.

---

## Priority 1 — re-model the ruins as modern ruins

Not a reskin. **Change the geometry.** The seeded starting ruin and everything
the player builds should read as late-industrial construction that has failed.

Think: collapsed parking structure, fallen overpass, gutted transit hall,
retaining walls, cooling towers, a shopping arcade with the roof gone. Poured
concrete with rebar showing at the breaks, spalled edges, exposed aggregate,
steel sections, shattered curtain-wall mullions with no glass left.

**Two mechanics must survive intact, because the game is built on them:**

1. **Arches / spans still read as arches.** `buildSpan` makes crossings on
   arches; that silhouette is the game's identity and the pockets under it are
   `under_arch`. A concrete viaduct arch, a subway vault, a highway underpass
   — all still arches. Do not turn them into flat beams.
2. **CARVE still works.** `carve` writes `openings` into walls and piers
   (`action.openings`). A carved opening must still read as a deliberate
   breach — a doorway cut through concrete, a service opening, a blown gap
   with rebar bent back. `Passage` and `Great Gate` must remain legible.

**Envelopes are frozen.** Footprints, heights, thicknesses and endpoints all
stay exactly as they are — pockets are computed from action geometry, so a
changed dimension is a changed game. Re-model _within_ the envelope.

Keep seeding detail from the action id (`seededRng(id * 7919 + k)`).

**Resolve this against pass 2:** you deliberately kept `courseH < 0.95`
materials (`stoneOld`) as Roman coursing, as evidence of a "before". That
conflicts with modern ruins. The ruins should now be modern. If you still want
a token of deep antiquity somewhere, make it small and deliberate — a single
fragment, a plinth, one column embedded in a concrete wall like spolia. Your
call; say what you chose.

## Priority 2 — more scenery, and evidence of life

The world is dressed but empty of _stuff_. Add, procedurally:

- **Landfill** — mounds of compacted refuse at the city edge, strata visible,
  gulls or drones over them. This is what a civilisation leaves most of.
- **Billboards still advertising.** Enormous, structurally sound, still lit,
  selling things to nobody. This is the best idea in the brief — the ads
  outlived the customers. Text is fine and encouraged (see below).
- **Fires in trash cans** — small, flickering, warm. Where the citizens
  gather. Emissive plus a cheap flicker; a point light only if the cost is
  justified.
- Fly-tipped piles, wrecked vehicles, shopping trolleys, pallet stacks,
  fencing, cable spools, shipping containers, road furniture ending in
  nothing.

**Runtime-generated `CanvasTexture` is explicitly permitted** — drawing text
and simple graphics into a canvas at load ships zero bytes and is not a binary
asset. Use it for billboard copy, signage, graffiti, hazard striping. Keep the
canvases small and few, and generate them once.

Ad copy is yours to write. It should be banal and cheerful — the horror is
that it's ordinary. Do not be arch about it.

## Priority 3 — the citizens are all dressed identically

They are three `InstancedMesh`es sharing one colour. Give them variety —
`InstancedMesh` supports per-instance colour via `setColorAt` / `instanceColor`,
which costs one buffer and no draw calls.

Derive appearance **deterministically from the agent index** so it is stable
across frames and reloads. Do not read or write any simulation field to do it,
and do not touch `agent.kind` — it is vestigial sim state, leave it alone.

Vary hue, value, and if cheap, silhouette — a bag, a coat, a hood. They should
look like a population, not a uniform.

---

## Frozen — unchanged from previous briefs

- `pickPocket` weights, the five stat formulas, `applyAction`, the pocket
  model, the save format, catalogue `key` values. Existing saves must load.
- `public/` is never edited. Never run `split_bundle.py --write`; never delete
  `src/.hand-edited`.
- No shipped binary assets, no runtime fetches. Procedural only.
  (Runtime-generated canvases are procedural. Downloaded images are not.)
- Keep the triplanar hatching.
- Do not hand-rename identifiers.

Verify after each block: `yarn build` green, and a fresh game still reports
**24 structures, 48 pockets, 1331 navNodes, 46 pop, kinds 12/34/1/1**. If a
number moves, revert.

Watch the draw-call count — it went 96 → 154 last pass. Report where it lands.
Merge static scenery into as few meshes as you can.

## Report back

What changed by file; bundle size; draws/tris; the `CAP.status()` numbers
confirmed in a browser (**do not claim it runs if you have not run it**);
what you chose not to do; screenshots if you can.
