# Feature plan — the next round

Written from `docs/PROGRESSION.md`, which traced how the game actually plays out.
Nothing here is committed to yet; the point is to decide what to build and, more
importantly, **what to unfreeze**.

---

## What is actually weak

Evidence, not opinion. All of this came out of reading the progression.

**1. The mid-game is empty.** There are exactly five requests. They pay 300
clearance between them, and then they are gone forever. After that the only
thing to aim at is +6 per plate, indefinitely. A player who finishes the five
has no goals left and a city that can now grow to ~107 buildings — the biggest
stretch of the game is also the least directed.

**This is the real flaw.** Everything else on this list is polish.

**2. GRANDEUR is a dead meter.** It counts spans (0.14), vaults (0.12), stairs
(0.08) and giant piers (0.08), clamps at 1.0, and therefore **saturates after
about seven spans and never moves again**. Ornament — statues, fountains,
lanterns, cypresses, columns, passages, gates — contributes exactly zero. So
the meter most associated with Piranesi is the one that stops responding first
and ignores every decorative thing you build.

**3. There is no night.** The clock hard-resets 20.5 → 5.6. All the neon, the
failing signs, the trash fires and the lamp-family palette only ever appear at
dusk, briefly. The single largest unrealised asset in the build.

**4. Plates are stored and never seen again.** Each plate saves `{cam, hour,
caption, n}` — the full camera pose. Sixteen of them. The folio shows slots,
but you cannot revisit what you recorded.

**5. Undo exists; history does not.** The save is an action log and nothing
uses that fact except reload.

---

## The freeze decision — this is the call to make first

Eight passes stayed safe because seven things never moved: `pickPocket`, the
five stat formulas, `applyAction`, the pocket model, the save format, catalogue
`key` values, and structure envelopes. Every pass was checked against them.

Some features below need that relaxed. **Unfreezing is not the end of the
world, but it must be deliberate and narrow** — one named system at a time,
with the rest still enforced, and with a stated way to tell whether it broke.

Two things I would keep frozen regardless:

- **`applyAction` and the pocket model.** These are what make replay
  deterministic. Break them and old saves quietly rebuild into different
  cities.
- **Existing catalogue `key` values.** _Adding_ a key is safe; changing one
  orphans every save that used it.

---

## Tier A — additive, nothing needs unfreezing

### A1. The Chronicle — replay the city's growth ⭐ recommended

**The save is already an event-sourced action log.** Feeding it to
`applyAction` one entry at a time, with a delay, replays the entire history of
the city from empty ground to now.

That is a time-lapse of everything you built, and **the architecture already
supports it completely** — no new state, no new save fields, no simulation
change. It is the feature this codebase was accidentally designed for.

Thematically it is the best fit available: a game about what survives, which
can show you the record of how it got here.

- Scrub bar over the action log
- Play/pause, speed control
- The camera can follow each action as it lands, or hold a wide shot
- End frame is the present day

Cost: low. Risk: very low — it reads the log, it does not write.

### A2. Procedural requests — fill the mid-game

After the five hand-authored requests are done, generate more from world state:
"nobody in the Sodium Quarter can reach water", "the high terrace has no light
after dark", "the market has no shelter". Read pockets, find a deficiency,
phrase it as a citizen asking.

This directly fixes the biggest flaw. It touches `12-requests.js`, which is not
frozen.

The tone must hold — the existing five are quiet and specific and named. A
generator that produces "BUILD 3 VAULTS" would be worse than nothing.

### A3. The folio as an artifact

Plates already store the camera pose. So:

- Click a slot to return the camera to exactly that view
- Compare then/now from an identical position
- Export the set as a contact sheet

Cheap, and it makes the sixteen mean something between engraving them.

### A4. Ambient life

More agent states — pairs stopping to talk at gathering points, someone
lingering at a fire, queues at a stall. Currently the loop is home → work →
gather → home. This is presentation, not simulation, so it stays out of the
frozen systems.

---

## Tier B — each needs one narrow unfreeze

### B1. Night ⭐ recommended, and the unfreeze is small

Requires touching the day loop in `17-bootstrap.js` where the clock resets
20.5 → 5.6. That is _not_ one of the seven frozen systems — but it is timing,
and Fable has twice declined to touch it for exactly that reason, correctly.

Unfreeze it explicitly and the payoff is large: the neon, the failing signs,
the trash fires and the district palettes all finally carry a scene. The audio
already responds to `dusk`. The bell already rings. Everything is built and
waiting for the sun to actually go down.

Verification: population, pocket counts and stat values must be unchanged at
the same clock hour. Only the range of `hour` changes.

### B2. Give GRANDEUR something to do

Requires unfreezing one of the five stat formulas — the most invasive thing on
this list, and the one I would think hardest about.

The minimal version: keep the existing terms exactly, add a small ornament
term, raise the clamp. Old saves would score differently, which is the real
cost. It is worth deciding whether a dead meter is worse than a changed number.

**Alternative that needs no unfreeze:** leave GRANDEUR alone and let the
_ornament_ do something else — lanterns already feed BELONGING. That may be
the honest answer.

### B3. New building types

Adding catalogue entries is safe as long as existing keys are untouched and
envelopes for existing types do not change. New keys, new geometry, new hints.

---

## Suggested sequence

1. **A1 Chronicle** — highest payoff per unit of risk, needs no permission
2. **B1 Night** — one narrow, well-understood unfreeze, large visual payoff
3. **A2 Procedural requests** — fixes the real design flaw
4. **A3 Folio** — cheap, makes the goal legible
5. Then reconsider B2 with the game in a better state

---

## Open questions for you

1. **Do we unfreeze the day loop for night?** (I would say yes.)
2. **Do we touch GRANDEUR?** (I would say not yet.)
3. Is the Chronicle interesting to you, or is it a toy? It is the one I would
   build first, but it is a _viewer_, not a mechanic — it adds nothing to play.
4. Should procedural requests keep paying clearance, or become something else
   once the named five are done?
