# Brief 9 — the Chronicle

**The folio is what you chose to keep. The Chronicle is everything that
happened.**

The game is about choosing what survives: sixteen plates, and engraving a
seventeenth pushes the oldest out of the record forever. The Chronicle is the
other half of that — the complete history of what you built, automatic and far
too long to fit in sixteen images.

The mechanic falls out of the pairing:

> **You can engrave a plate from inside the Chronicle — but it still costs one
> of your sixteen.**

Scrub back to the city when it was smaller, or to the moment before you undid
something, and take the picture you should have taken at the time. You can
photograph the past. You still cannot keep everything.

A replay viewer on its own is a toy. This is the same decision the game is
already about, applied to time.

The full design rationale is in `CHRONICLE.md` and is not repeated here. This
brief is what to build next, and it assumes that document has been read.

---

## What already exists — do not rebuild it

**The replay engine shipped** in commit `b8b1307`. It is verified against a real
city in the browser, not asserted. Build on it; do not reimplement it.

`src/20-chronicle.ts` exports a `Chronicle` class, live at
`window.CAP.chronicle`:

| member         | behaviour                                                         |
| -------------- | ----------------------------------------------------------------- |
| `active`       | true between `enter()` and `exit()`                               |
| `index`        | how many player actions are currently applied, `0..length`        |
| `length`       | `playerActions.length` — the present                              |
| `enter()`      | snapshot infill, suppress autosave, hide citizens. Idempotent     |
| `scrubTo(k)`   | replay the first `k` actions. Clamped. Bones only                 |
| `exit()`       | rebuild in full, restore infill, re-sync citizens. Idempotent     |
| `captionAt(k)` | `"day 3"` where the action is stamped, an ordinal where it is not |

Two things it already guarantees, both measured:

**`playerActions` is only ever sliced, never mutated.** Nothing in the Chronicle
may append to it. That constraint continues into this brief.

**Autosave is suppressed for the whole visit.** This is the actual corruption
vector and it is worth understanding before touching any of this. The action log
is safe — it is read-only. But `saveGame` persists
`infill: InfillSystem.serialize()` from the **live** world, and autosave fires
both from the 8-second tick whenever `dirty` is set and again on tab-hide.
Either one landing mid-scrub writes a half-replayed city's infill over the real
one, permanently. `enter()` sets `oc`, the same suppress flag "start anew" uses.

Verified: scrubbed to zero, `dirty` forced true, `doSave()` called outright —
the save came back **byte-identical**.

Also new in that commit: `rebuildFromActions()` in `17-bootstrap.ts`. UNDO and
the Chronicle now call the same function, so there is exactly one definition of
"rebuild the world from these actions", both `seedGroundPockets` calls included.
Keep it that way.

`window.CAP.chronicleRoundTrip()` runs the mandated safety test and returns
`{ok, before, after}`. Run it after every change in this brief.

---

## What to build

### 1. The scrub UI

**Reachable from the folio, not from the tool bar.** The folio and the Chronicle
are one idea and the interface should say so. `#platectl` already holds
`#folio-strip`; the entry point belongs there.

The panel needs:

- **A scrub bar over the action log.** Range `0..chronicle.length`. Dragging
  calls `scrubTo`. This is the whole interaction; everything else is trim.
- **Play / pause, and a speed control.** Playback walks the index forward on a
  timer. Two or three speeds, not a continuous slider.
- **The current position labelled.** Use `captionAt(index)` verbatim — it
  already tells the truth about what it knows, saying `day 3` only where the
  action carries a stamp and falling back to an ordinal where it does not. Do
  not invent a day for an unstamped action. This is a game about the difference
  between what happened and what survives; the labelling should hold that line.
- **The folio strip stays visible.** The player must be able to see what a
  seventeenth plate would push out at the moment they decide to take it.
- **Exiting returns to the present, always.** `ESC` and an explicit control.

Scrubbing rebuilds the world, which is not free. Debounce or coalesce drag
input; do not call `scrubTo` once per pointer-move event.

Do not add a fail state, a timer, or an achievement. The Chronicle is a place to
look at what you did.

### 2. Engraving from the past

`Uh()` in `17-bootstrap.ts` renders from the current camera and scene, so it
already works on a replayed state. Two changes:

**The caption must state the historical moment.** It currently reads
`` `${cityName} · day ${te.day}` `` — the _present_ day. A plate that claims day
12 while showing the city as it was on day 3 is a lie the game should not tell.
Use the scrubbed position's own day where known, an ordinal where not.

**Mark it as a reconstruction.** A plate engraved from the past is not a record
of something seen; it is something rebuilt. The caption should show that,
quietly — one word. Add whatever field the plate object needs to carry it. The
save format is **no longer frozen** (nobody has played this, there are no saves
to protect), so adding a field is fine; `plates` entries are currently
`{cam, hour, caption, n}`.

Otherwise it behaves exactly like any other plate: it occupies a folio slot, it
evicts the oldest at seventeen, it pays the same clearance. **Do not make past
plates cheaper or free.** The cost is what makes it a decision.

---

## The look — where the new libraries go

Four packages are now installed: `postprocessing`, `three-nebula`,
`three-gpu-pathtracer`, `jolt-physics`. **Use two of them. Read this section
before reaching for any of them.**

### The existing post pass is hand-rolled. Respect it.

The game's signature look is a single custom `ShaderMaterial` on a fullscreen
quad (`00-shaders.ts`, `postMat`), not an `EffectComposer`. It already
hand-writes a VHS tracking band with RGB channel separation, rolling
displacement and dropout gating, plus `uDusk` / `uDawn` / `uNight` / `uPaper` /
`uLineWeight`. That is art direction, not a pile of generic effects.

**So the primary mechanism for making the past look like the past is a new
uniform on the shader that already exists** — a `uChronicle` in `0..1`, ramped
on enter and off on exit, pushing toward a desaturated, heavier-grain,
lower-generation signal. It costs nothing, it cannot fight the existing look
because it _is_ the existing look, and it reuses the vocabulary the tracking
band already established.

Everything below is layered on top of that, not instead of it.

### `postprocessing` — one Chronicle-only chain

Mount an `EffectComposer` chain **only while `chronicle.active`**, composited
after the engraving pass. Dispose it on exit. It must never run in the normal
game loop and must never touch `snap()` — plates have their own identity and the
realtime view is not to be redesigned by this brief.

A vignette, a grain, and a shallow depth of field focused on the structure
currently being replayed. Depth of field is the one that earns the dependency:
it is genuinely tedious to hand-roll and it reads as _looking at a record of a
thing_ rather than standing in it.

Keep the chain to three effects. If it starts growing, that is the signal to
stop.

### `three-nebula` — dust as each action lands

During **playback only** — not while the player drags the scrub bar — emit a
short burst of stone dust at the base of each structure as it appears. It gives
the replay a rhythm and makes each build legible as an event.

Two hard constraints:

- **Render-only.** Particles may never touch world state, pockets, nav or the
  action log. If a particle system can change what `chronicleRoundTrip()`
  reports, it is wired in wrong.
- **Bounded.** A fixed pool, cleared on `exit()`. A city with 200 actions
  scrubbed at speed must not accumulate emitters.

### `three-gpu-pathtracer` — optional, and only one use

There is exactly one place this is worth considering, and it is a **stretch, cut
it the moment it fights**: path-trace the luminance for a plate engraved from
the past, then feed that result through the **existing** dither so it still
looks like a plate.

That ordering is the whole point. The plate's identity is the 1-bit dithered
ink; the path tracer would only be supplying better tonal values underneath it.
Path-tracing _instead of_ the engraving look would replace the game's art
direction with a generic PBR render, which is not an improvement, it is a
different game.

Gate it behind a flag, give it a hard time budget, and fall back to the current
path on timeout. The engrave flow already pauses with "The laser bites the
substrate…", so there is a natural place for it to take a moment. If it cannot
be made to feel deliberate rather than slow, drop it — nothing else in this
brief depends on it.

### `jolt-physics` — not this feature

Structures are static, and replay must stay deterministic because the save is an
action log: non-deterministic replay means loading a save gives a different
city. The one entertaining use — debris tumbling as you scrub backward — fights
that directly, and it is 44 MB of WASM in `node_modules` for a cosmetic
flourish.

Leave it out of the Chronicle. It may well be right for something else later.

---

## Still frozen

`pickPocket`, the five stat formulas, `applyAction` itself, the pocket model,
catalogue `key` values, structure envelopes. `public/` is never edited — it is
the original artifact and the reference everything is verified against. Never
run `split_bundle.py --write`; never delete `src/.hand-edited`. No shipped
binary assets and no runtime fetches.

`applyAction` and the pocket model must stay deterministic. That was never a
compatibility constraint — it is what makes the action log a valid
representation of a city.

The **save format is not frozen**. Add fields the Chronicle needs.

---

## A pre-existing bug — report it, do not silently "fix" it

The first round trip of a session moves the pocket count by one (`52 -> 53`, a
single `terrace_p`). **This is not the Chronicle.** Boot seeds ground pockets
_before_ applying player actions (`17-bootstrap.ts:87`), while every rebuild
seeds _after_, and `seedGroundPockets` skips any pocket within 6.5 units of an
existing one — so the two orderings disagree. It is stable from the second
rebuild onward, and **UNDO has always done this**, via what is now literally the
same code path.

Fixing it means changing worldgen ordering, which this brief freezes. If the
work here makes a fix obviously correct and obviously contained, say so and
propose it separately. Do not fold it into a UI commit.

---

## Verify

Do not claim this works without scrubbing a real city end to end and then
checking the city is unchanged.

- `yarn typecheck` clean, `yarn build` green, bundle delta reported
- `yarn format:check` clean — CI enforces it, and so does the pre-commit hook
- **`CAP.chronicleRoundTrip()` returns `ok: true`** after every change. Note
  that the _first_ call in a session reports the one-pocket boot discrepancy
  above; call it twice and compare the second and third
- Scrub a real city to zero and back, exit, and confirm `CAP.status()` and the
  full pocket-kind tally are identical
- With the Chronicle open, force `state.dirty = true` and call `CAP.doSave()` —
  the save must stay **byte-identical**
- An old save with unstamped actions opens the Chronicle without error and
  captions ordinally. A save that straddles the enabler must caption each action
  correctly on its own terms
- A plate engraved from the past appears in the folio, evicts correctly at
  seventeen, carries the historical caption, and is marked a reconstruction
- Fresh city baseline: **24 structures, 48 pockets, 1331 navNodes, 46 pop, kinds
  12/34/1/1**

Back up the save before testing. `localStorage.getItem('capriccio-save-v1')`
written to disk is a few KB of JSON and it is the only copy in existence. Never
put `?fresh` on `:8123` — use `:8125` for a clean original.
