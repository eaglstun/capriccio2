# The Chronicle — plan for the next Fable phase

A companion to `FEATURES.md`. This is one feature, specced on its own because it
carries a mechanic rather than being presentation.

---

## What it is

**The folio is what you chose to keep. The Chronicle is everything that
happened.**

The game's goal is choosing what survives — sixteen plates, and engraving a
seventeenth pushes the oldest out of the record forever. The Chronicle is the
other half of that: the complete history of what you built, automatic and far
too long to fit in sixteen images.

Each makes the other mean more. And the mechanic falls out of the pairing:

> **You can engrave a plate from inside the Chronicle — but it still costs one
> of your sixteen.**

Scrub back to the city when it was smaller, or to the moment before you undid
something, and take the picture you should have taken at the time. You can
photograph the past. You still cannot keep everything.

**That is the whole feature.** A replay viewer on its own is a toy; this is the
same decision the game is already about, applied to time.

---

## What is actually replayable — verified, not assumed

The save is an event-sourced action log and `World.applyAction` can replay it.
Two limits were measured and neither is negotiable without new data:

**1. Actions carry no timestamp.**

```js
{ t: "anchor", x: 20, z: 20, topY: 12, style: "pier", id: 1000 }
```

No day, no hour. The log is an **ordering**, not a timeline. Without the
enabler below, the Chronicle can say "the twenty-third thing you built" but not
"day 4".

**2. Infill is not in the action log.** The vernacular buildings and the
citizens are serialized separately, and the order they actually grew in depended
on the demand curve over time — which is recorded nowhere. **The organic growth
of the city is not reconstructable.** Any attempt would be a plausible fiction,
not the history.

---

## The enabler — do this first, it is cheap and time-critical

**Stamp `day` and `hour` onto every new action at creation.**

This is backward-compatible in both directions and does not require a save
version bump:

- Old saves load fine — the field is simply absent, and the Chronicle falls
  back to ordinal captions for those cities
- New saves load fine in older builds — an unknown field on an action object is
  ignored
- `loadGame` gates only on the top-level `v`, which does not change

**Take this now even if the rest is deferred.** Every city built before this
lands is permanently unreplayable in real game-time. Every city built after is
not. That asymmetry only gets worse with delay.

---

## Replay the bones, not the life — recommended

**Show only what the player built.** Architecture appears in order; no infill,
no citizens.

That is not a limitation dressed up as a choice. It is the honest thing to show:
the action log is the record of _your hand_. The buildings and the people were
never your doing — they were the city's response to what you left. A Chronicle
of bones says exactly that, and it cannot drift from the truth because it is
replaying the only thing that was actually recorded.

It should also look right: architecture without life is a Piranesi plate.

_Fallback if it reads too empty in practice:_ fade the present-day infill in at
low opacity as a ghost, clearly distinct from the built architecture. Do not
simulate a fake growth history.

---

## The danger — do not corrupt the live city

Replaying means rebuilding world state, and the player's actual city must
survive it untouched.

- Entering the Chronicle must not mutate the save
- Scrubbing must not mark the game dirty
- Exiting must restore the world **exactly** — all actions applied, infill
  restored, citizens re-synced, districts re-derived
- Nothing in the Chronicle may append to `playerActions`

**Verification is not optional here:** capture `CAP.status()` and the full
pocket-kind tally before entering, scrub to the beginning and back, exit, and
assert every number is identical. If the city is even one pocket different, the
feature is broken regardless of how it looks.

---

## Engraving from the past

The existing capture path (`Uh()` in `17-bootstrap.js`) renders from the current
camera and scene, so it works on a replayed state with two changes:

**1. The caption must state the historical moment**, not the present day. With
the enabler this is the action's own `day`; without it, an ordinal. A plate that
claims to be day 12 while showing the city as it was on day 3 is a lie the game
should not tell.

**2. Mark it as a reconstruction.** A plate engraved from the past is not a
record of something seen — it is something rebuilt. The caption should show
that, quietly. This is a game about the difference between what happened and
what survives; the distinction is worth one word.

Otherwise it behaves exactly like any other plate: it occupies a folio slot, it
pushes the oldest out at seventeen, and it pays the same clearance. **Do not
make past plates cheaper or free.** The cost is what makes it a decision.

---

## Interface

Reachable from the folio, not from the tool bar — they are one idea.

- A scrub bar over the action log, with play/pause and speed
- The current position labelled by day where known, ordinal where not
- **ENGRAVE available while scrubbed**, with the folio strip visible so the
  player can see what a seventeenth plate would push out
- Exiting returns to the present, always

Do not add a fail state, a timer, or an achievement. The Chronicle is a place to
look at what you did.

---

## Still frozen

`pickPocket`, the five stat formulas (GRANDEUR having been changed in the
previous phase), `applyAction` itself, the pocket model, catalogue `key` values,
structure envelopes. `public/` never edited. Never run `split_bundle.py --write`;
never delete `src/.hand-edited`. No shipped binary assets or runtime fetches.

**The save format gains exactly one thing:** `day` and `hour` on new action
objects. Nothing else.

---

## Verify

- `yarn build` green
- Fresh city: **24 structures, 48 pockets, 1331 navNodes, 46 pop, kinds
  12/34/1/1**
- **The round-trip test above** — enter, scrub to zero, scrub to end, exit, and
  every number identical
- An old save (no timestamps) opens the Chronicle without error and captions
  ordinally
- A plate engraved from the past appears in the folio, evicts correctly at
  seventeen, and carries the historical caption
- Bundle delta reported

Do not claim it works without scrubbing a real city end to end and then checking
the city is unchanged.
