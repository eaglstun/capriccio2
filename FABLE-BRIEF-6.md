# Brief 6 — language drift, and what the game is now for

Read `PROGRESSION.md` first. It documents how the original plays out, and the
mechanics are frozen, so it describes ours too.

---

## Part A — the vocabulary has not drifted enough

Plenty of the text is still antique: **Basilica**, **Cloister Hall**,
**colonnade**, **Great Gate**, **ceremonial**, **Aqueduct**, **ADORN**,
**FAVOR**, **Tav.**, and district words like **Candle** and **Cistern**.

### The rule — drift unevenly, do not replace

Do not run a thesaurus over it. Real language does not modernise uniformly:
**words tied to dead institutions die; words tied to surviving human facts
persist.** A civilisation that lost its monasteries loses "cloister". It keeps
"stair", because stairs never stopped.

So sort every term into three piles.

**Retire — the institution is gone:**

- **Cloister Hall** — monastic. There are no monasteries.
- **Basilica** — a Roman civic hall, then a church. Both institutions are gone.
- **colonnade** (in the Gallery hint) — an architectural-history word.
- **Great Gate**, **ceremonial** — courtly. Nobody processes anywhere now.
- **ADORN** — the grandest verb on the bar and the one nobody would still use.

**Keep — the thing survives, so the word does:**

- **Pier, Column, Bridge, Stair, Switchback, Gallery, Passage, Garden** —
  plain, current, still true.
- **Cistern** — cisterns are exactly what you would still have.
- **Aqueduct** — arguable. It reads ancient but describes precisely what the
  thing does, and infrastructure words are conservative. Your call; if you keep
  it, the hint should be modern.
- **INVITE** — the thesis verb. Never change it.
- **SOULS** — leave it. Everything around it has gone technical; that one warm
  archaic word surviving in the corner of the HUD is the best single detail in
  the interface. **Deliberately untouched.**

**Decide, and say what you decided:**

- **FAVOR** — courtly, and mechanically it is now closer to _standing_,
  _credit_, or _clearance_. See Part B before choosing.
- **Tav.** — Piranesi's _Tavola_, plate numbering. Keeping it says the
  recording convention outlived the culture that invented it, which is a good
  joke. Replacing it loses the engraver. Lean toward keeping.
- **District words** — Candle and Lantern are pre-electric. Some should drift
  (Sodium, Halogen, Relay, Substation, Transfer, Ash, Runoff), and **one or two
  should not** — a quarter still called the Candle Quarter, long after candles,
  is exactly how real place-names work.

Keys are frozen. Labels, hints, verbs and captions are free.

---

## Part B — what the goal quietly becomes

**Approved by the user. Build it.**

### The original's goal

Attract people, and give them things to use. You build architecture, citizens
find uses for it, the town grows, five requests guide you, plates fund further
building. It is a game about a place filling up.

### What is already different here, without changing a line

Three mechanics that read differently at the end of humanity:

1. **Population caps at 132 and no more arrive.** In the original that is a
   town reaching capacity. Here it is a final census.
2. **GRANDEUR saturates after about seven spans and never moves again.** A
   scoring quirk becomes a statement: magnificence has a ceiling now.
3. **The save keeps `plates.slice(-16)`.** Sixteen plates. The rest fall off
   the end, permanently.

### The proposal

**The goal shifts from building the city to choosing what survives of it.**

That third mechanic is the whole thing and it is already implemented. At the
end of humanity the city cannot be saved — population is capped, grandeur is
capped, the requests run out. But **sixteen images can be.** The folio is the
only artefact that persists, and it is finite.

So: the player is not a founder. The player is the last person recording.

**This needs almost no mechanical change**, which is exactly why it is worth
doing:

- Make the plate limit **visible**. Show the folio as sixteen slots, filling.
  When a seventeenth plate is engraved, show which one it pushes out. That
  single UI change converts a storage detail into the central decision of the
  game.
- Let the plate caption carry the weight it already has — district, day
  number, plate number.
- Reconsider **FAVOR** in this light. If plates are the point, favor is what
  the record buys you: _standing_, _credit_, _clearance_, _warrant_. Something
  that means "you are permitted to build further because you documented what
  was here."
- The title-screen text can shift from "RAISE the great architecture" toward
  something about what is left. **One line, not a paragraph.** The current
  copy is good and should not be replaced wholesale.

### What must not happen

- **No fail state, no timer, no collapse.** The original has no ending, and
  imposing doom would be a much worse and much more obvious idea than the one
  above. The restraint is the point.
- **No change to any frozen system** — this proposal is deliberately designed
  to require none.
- Do not over-explain it in the UI. If a player has to be told the folio only
  holds sixteen, it has been written badly. They should discover it by filling
  it.

---

## Frozen — unchanged

`pickPocket`, the five stat formulas, `applyAction`, the pocket model, the save
format, catalogue `key` values, structure envelopes. `public/` never edited.
Never run `split_bundle.py --write`; never delete `src/.hand-edited`. No shipped
binary assets or runtime fetches. Keep the triplanar hatching and the
dither/engraving split. No hand-renaming.

Verify: `yarn build` green; fresh game reports **24 structures, 48 pockets,
1331 navNodes, 46 pop, kinds 12/34/1/1**. Serve on **8124 or your own port —
8123 is the ORIGINAL**, never `?fresh` on it.
