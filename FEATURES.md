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

---

## A0. The named citizens do not exist — and the tutorial sends you to find them ⭐ do first

**This is a bug, found in play.** In tutorial beat 6 the card says _"Marcus is
asking for a way up to the high terrace."_ The player goes looking for Marcus.

There is no Marcus. He is a string in `12-requests.js` and a string in
`19-tutorial.js`. Agents carry no name, no identity field of any kind, and
nothing links a request to a citizen. The same is true of Tullia and Livia.

It is a UX failure _caused by_ the writing being good: the prose is specific
enough ("Marcus, lattice technician", "Livia sits in it at noon") that it
implies a findable person, and then the tutorial explicitly points at him.

### Everything needed already exists

| what               | where                                           | status                      |
| ------------------ | ----------------------------------------------- | --------------------------- |
| per-agent colour   | `this.look[]` -> `setColorAt` / `instanceColor` | built, in use               |
| world-space labels | `labelsEl`, projects world -> screen            | built, draws district names |
| the request panel  | `requestEl` in `16-hud.js`                      | built, currently inert      |

No new systems. Three existing ones wired together.

### Design — one marked citizen at a time

**DECIDED: only whoever is currently asking is marked.** Not all four named
characters. One speaker, one marker, tied to `requests.active`.

That keeps the marking purposeful — it means "this person is talking to you"
rather than "this person has a name" — and avoids turning the plaza into a
nametag convention.

Three layers, in order of how much they fix:

**1. Click the request to find who asked.** The request panel becomes the
affordance: click it and the camera eases to the citizen who spoke. This is the
actual answer to "I could not find Marcus" and it should be built first, because
the other layers are useless without it — a distinctly coloured citizen is no
easier to find in a crowd of 132 if you do not know where to look.

**2. Give the current speaker a visible identity.** A distinct colour via
`look[]`, plus a small marker so they read as _someone_ rather than as a
differently-dressed extra. Findable once framed; not lit up like a quest marker
from across the map.

**3. Their name in world space.** Reuse the district-label system for a quiet
name above them. One label, because there is only ever one speaker.

### The handover

When a request completes, the marker leaves that citizen and appears on
whoever asks next, after the existing 9s delay. The previous speaker returns to
being an ordinary citizen — same colour rules as everyone else, no label, still
walking their route.

**When all five requests are done, nobody is marked at all.** That falls out of
the design rather than being special-cased, and it is thematically exact: the
citizens stop asking, and the last named person goes back into the crowd. Do not
add a fallback marker to fill the gap.

### Which agent is speaking?

**Must be derived, not stored — the save format is frozen** and cannot gain a
field. Derive from the active request's `id` (hash it to an agent index), so the
same request always maps to the same citizen across reloads.

Deriving from the request rather than from a fixed roster also means a
procedurally-generated request (A2) gets a speaker for free.

Do NOT reuse `agent.kind`. It is vestigial sim state, null on every agent, and
it should stay that way.

### They should keep walking

The speaker is still an ordinary agent: home, work, gather, home. Marcus having
a job and a route is what makes him a person rather than a signpost. That is
also why layer 1 matters — he is a moving target, and the camera has to do the
finding.

### The tutorial

Beat 6 should either move the camera to Marcus as it names him, or stop naming
him. Naming a person the player cannot locate is the specific failure being
fixed; do not leave it in place alongside the fix.

### Not frozen, but adjacent

`07-citizens.js` is not on the frozen list. The constraints that still apply:
the save format gains nothing, `applyAction` and the pocket model are untouched,
and identity must be deterministic so a reloaded city has the same Marcus.

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
### A5. Two more score tracks — driving, and strange

The existing score is one loop: **Am9 – Fmaj9 – Cmaj9 – Gadd9** (i–VI–III–VII in
A minor) at ~67bpm, drums entering at 0:30, one borrowed Dadd9 late. It is good
and it is the *calm* end of the range. Two more, and **neither may be more
tranquil than what exists.** More bass, more drums, and weird is welcome — it is
vaporwave.

Theory reference: `~/.claude/skills/guitar/references/theory.md`.
Strudel reference: `~/.claude/skills/strudel/` — **read its gotchas first**, two
of them silently produce no sound.

#### Keep the tonic, change the mode

All three tracks stay rooted on **A**, so any transition between them is a mode
change rather than a key change and can happen without a jarring pivot.

**Track 2 — A Dorian, driving.** Dorian is A B C D E F# G: natural minor with a
**raised 6th**. That F# turns the IV chord major, and `Am → D` is the single
most recognisable sound in the mode.

- Loop: `Am9 | D6/9 | Am9 | Gadd9` — the D major where the ear expects Dm
- ~78–84bpm, a real backbeat on 2 and 4, hats on sixteenths
- **The bass carries this one** — a riff, not roots. Root / 5th / b7 / octave,
  syncopated, well forward in the mix
- This is the track for a city that is actually growing

**Track 3 — the strange one.** Same tonic, harmony deliberately unstable. From
the theory reference's substitution and borrowed-chord material:

- Bar 1 is always `Am9` — the anchor
- Bars 2–4 are **chosen per cycle** from a set that all voice-lead from A minor:
  `Fmaj7#11` (lydian colour on VI), `Bm7b5` (the ii-half-diminished, tense),
  `Dm6` (iv6, Dorian-tinged), `Abmaj7` (chromatic, genuinely foreign)
- ~72bpm with a half-time feel, so it sits between the other two rather than
  simply slower
- Heavy detune, pitch drift, tape warble. Let it sag

#### Generative — the part that matters

"Generative" fails when it sounds random. The rule that prevents it:

> **Randomise rhythm and choice. Never randomise pitch outside the scale.**
> A random note in key sounds intentional. A random rhythm sounds broken.

So constrain pitch material to the mode and let Strudel vary everything else:

| technique | where |
|---|---|
| `chooseCycles(...)` | which chord fills bars 2–4 of track 3 |
| `.degradeBy(0.2)` | hats, so the pattern breathes instead of ticking |
| `.undegradeBy` | paired with the above for fills |
| `.euclid(5,8)` / `(3,8)` | a shaker or rim that never lands square |
| `.someCyclesBy(0.15, fn)` | an occasional whole-cycle variation |
| `irand` + `.scale("A:dorian")` | a counter-melody that is always in key, never the same |
| `perlin` | slow filter and detune drift — the tape sag |

Track 2 should be **mostly fixed with generative edges** (hats, fills). Track 3
should be **generative at its core** (the harmony itself moves).

#### Which track plays when

Do not shuffle. Bind it to the simulation, the way every other sound in this
game already is — see `docs/AUDIO.md`.

Suggested: **track 1 for a small city, track 2 as it grows, track 3 late or at
night.** The score then reports the state of the world like the wind and the
bell do. Cross-fade over several seconds; never cut.

#### Technical, and non-obvious

- **This project does NOT use `@strudel/web`.** It imports `@strudel/core`
  subpaths plus `superdough` directly, with `webaudioOutput` inlined — see the
  top of `src/18-music.js`. Keep that; the full bundle cost 908KB against
  157KB for the subpath imports.
- **Tempo is `setCps`, never `.cps()`.** The control sets a per-hap value the
  scheduler never reads back, so the clock stays at the default and nothing
  audibly changes.
- **Sharps are `s`, not `#`** — `fs3`, not `f#3`. `#` fails to parse.
- **Synthesized only.** No `samples()`, no CDN fetches, no shipped audio.
- Build patterns after init, not at module top level.
- The construction arpeggio stays bound to the sim as it is.

#### Verify

`yarn build` green, fresh-city numbers unchanged, and **listen to all three** —
a pattern that throws at scheduler time fails silently to the eye. Report the
bundle delta; three tracks of pattern code should be a few KB, not another
dependency.


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

### B2. GRANDEUR counts ornament — DECIDED, build it

**Decision: add ornament terms.** Keep the meter a count; make decoration count
toward it.

#### The trap this has to avoid

Naively adding ornament makes the problem *worse*. Measured on a fresh city:

- GRANDEUR already starts at **0.34** — the seeded ruins contain one span, one
  vault and one giant pier
- Headroom is 0.66, which is **about five player spans**
- The seeded ruins contain **18 ornaments, and 12 of them are cypresses**

So giving every ornament a flat value would push the *starting* score up and cut
the remaining headroom — saturating sooner, not later. The fix has to rebalance
the structural weights at the same time.

#### The design: two halves, each capped

```
structure = clamp( spans       * 0.042
                 + vaults      * 0.036
                 + rises       * 0.025
                 + giant piers * 0.032 , 0, 0.60 )

ornament  = clamp( statues   * 0.026
                 + obelisks  * 0.026      // seeded only, not player-placeable
                 + fountains * 0.022
                 + gates     * 0.022      // the CARVE "Great Gate"
                 + columns   * 0.018      // the ESTABLISH column
                 + lanterns  * 0.005 , 0, 0.40 )

GRANDEUR  = structure + ornament          // sums to at most 1.0
```

Tuned so each cap needs a real city: **~14 spans** to max the structural half,
**~15 statues** to max the ornamental one.

**Neither half can max the meter alone.** Ten spans and no ornament stalls at
0.60. A plaza full of statues and no architecture stalls at 0.40. Grandeur now
requires a city that is both **built and adorned**, which is the point of adding
ornament at all.

Modelled against real cities:

| city | GRANDEUR |
|---|---|
| fresh, seeded ruins only | **0.20** (today: 0.34) |
| a 13-action city | **0.38** (today: 0.88) |
| mid game, built and adorned | 0.79 |
| 14 spans, no ornament at all | 0.60 — the structural cap |
| plaza full of ornament, no architecture | 0.51 |
| large city, both | **1.00** |

The second row is the one that matters. A thirteen-action city currently reads
**0.88** — effectively finished. Under this it reads **0.38**, with the rest of
the game still ahead of it.

#### Two things score zero, deliberately

- **Cypress: 0.** Twelve of the eighteen seeded ornaments are trees, so any
  value at all would let the starting scenery dominate the meter. There is also
  a straight argument for it: grandeur is built magnificence, and a tree is the
  one thing in the world nobody built.
- **Passage: 0.** A door through a wall is circulation, not monument. The
  *Great Gate* is the ceremonial one and it scores.

**Lanterns score only 0.005** because they already feed BELONGING at 0.05 each.
Paying them fully into both meters would let one cheap object drive half the HUD.

#### The cost is smaller than previously stated

An earlier draft of this plan implied changing a stat formula would break saves.
**It would not.** The meters are computed live from world state and GRANDEUR is
stored nowhere — the save holds actions, resources, plates and done-requests.
Changing the formula changes a displayed number on reload. No corruption, no
migration, no crash.

That is the whole cost: an existing city will show a different GRANDEUR than it
did yesterday.

#### Scope

This is the **only** one of the five formulas being touched. ACCESS, SHELTER,
LIGHT and BELONGING stay byte-identical, and so does everything else on the
frozen list.

Verify: fresh city reports GRANDEUR ≈ 0.27 with all other meters unchanged at
the same clock hour, and structures / pockets / navNodes / pop unchanged.

### B3. New building types

Adding catalogue entries is safe as long as existing keys are untouched and
envelopes for existing types do not change. New keys, new geometry, new hints.

---

## Suggested sequence

1. **A0 Named citizens** — a real bug, found in play, and everything it needs exists
2. **A1 Chronicle** — highest payoff per unit of risk, needs no permission
3. **B1 Night** — one narrow, well-understood unfreeze, large visual payoff
4. **A2 Procedural requests** — fixes the real design flaw
5. **A3 Folio** — cheap, makes the goal legible
6. Then reconsider B2 with the game in a better state

---

## Open questions for you

1. **Do we unfreeze the day loop for night?** (I would say yes.)
2. **Do we touch GRANDEUR?** (I would say not yet.)
3. Is the Chronicle interesting to you, or is it a toy? It is the one I would
   build first, but it is a _viewer_, not a mechanic — it adds nothing to play.
4. Should procedural requests keep paying clearance, or become something else
   once the named five are done?
