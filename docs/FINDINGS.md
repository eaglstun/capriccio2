# Findings

Line numbers refer to the **local pretty-printed** bundle (30,968 lines), not
the deployed one. See `CLAUDE.md`.

---

## Phase 0 — Save format

### It's an action log, not a world snapshot

The single most important architectural fact found so far. On load (line
30739ff) the game does **not** restore a world. It replays one:

```js
for (const t of hn.actions)
  (t.id = t.id ?? yt.nextId++),
  Kt.applyAction(structuredClone(t)),
  ...
```

The city is _reconstructed by re-running every action the player ever took_,
in order. This is event sourcing. Consequences worth noting:

- The world is a pure function of the action log. Building placement must
  therefore be fully deterministic — no randomness in construction, or saves
  would load differently than they were built.
- Save size grows with actions taken, not with city size.
- There is no undo cost problem: truncating the log rebuilds an earlier city.
- Any procedural content that _isn't_ derived from actions has to be
  serialized separately — which is exactly what `infill` is.

### Schema (serializer at line 28849)

```js
{
  v: 1,                  // version; loader rejects anything !== 1
  actions: [...],        // THE WORLD. player action log
  day, hour,             // clock
  res: {...},            // resources; includes .favor
  infill: ...,           // Ne.serialize() — procedural fill not in the log
  plates: [...],         // last 16 ONLY — .slice(-16)
  cityName: "...",
  doneRequests: [...],   // a Set, flattened to array
  folio: ...             // ?
}
```

Action objects carry a type discriminant `t` plus geometry, e.g. a `"wall"`
action has `ax, az, bx, bz, th` (start, end, thickness) — seen at line 28986.

**"Plates" and "folio" are Piranesi vocabulary.** Piranesi published etched
_plates_ collected in _folios_. The `SAVE PLATE` UI string plus `plates`
capped at 16 suggests the game lets you preserve views of your city as
etchings. That is a genuinely elegant piece of theming and worth confirming in
play.

### Useful lever

`?fresh` in the URL wipes the save on load (line 30736):

```text
http://127.0.0.1:8123/?fresh
```

Good for testing a clean boot without clearing localStorage by hand.

---

## Phase 1 — Building catalogue (mostly free)

Found as a clean object literal at line 28877 (`La`). Seven action categories:

### anchor — foundations

| key      | label      | hint                                |
| -------- | ---------- | ----------------------------------- |
| `pier`   | Pier       | a stout foundation for spans        |
| `giant`  | Giant Pier | colossal — its base becomes a place |
| `column` | Column     | a slender commemorative shaft       |

### span — horizontal crossings

| key        | label    | hint                             |
| ---------- | -------- | -------------------------------- |
| `bridge`   | Bridge   | an open crossing on great arches |
| `aqueduct` | Aqueduct | carries water along its back     |
| `arcade`   | Gallery  | a roofed colonnade crossing      |

### rise — vertical circulation

| key          | label      | hint                      |
| ------------ | ---------- | ------------------------- |
| `direct`     | Stair      | the shortest honest climb |
| `ceremonial` | Ceremonial | broad, slow, magnificent  |
| `switchback` | Switchback | folds up the steep face   |

### vault — enclosed halls

| key        | label         | hint                      | footprint (`pr`, line 28947) |
| ---------- | ------------- | ------------------------- | ---------------------------- |
| `court`    | Cloister Hall | intimate — 14 by 20 paces | `w:13 h:9`                   |
| `market`   | Market Hall   | roomy — 18 by 34 paces    | `w:17 h:12`                  |
| `basilica` | Basilica      | vast — 22 by 52 paces     | `w:22 h:17`                  |

### carve — subtractive

| key    | label      | hint                               |
| ------ | ---------- | ---------------------------------- |
| `door` | Passage    | an arched way through wall or pier |
| `gate` | Great Gate | ceremonial breach, 8 paces wide    |

### emb — ornament

| key        | label    | hint                        |
| ---------- | -------- | --------------------------- |
| `statue`   | Statue   | a gilded figure on a plinth |
| `fountain` | Fountain | water for a neighborhood    |
| `lantern`  | Lantern  | warm light after dusk       |
| `cypress`  | Cypress  | a dark green flame          |

### designate — zoning (this is how citizens arrive)

| key         | label     | hint                    |
| ----------- | --------- | ----------------------- |
| `dwelling`  | Dwelling  | invite homes here       |
| `trade`     | Trade     | invite stalls and shops |
| `garden`    | Garden    | invite green things     |
| `gathering` | Gathering | invite idle evenings    |

Note the verb choice: you **designate** and **invite** rather than construct.
You build the architecture; the citizens decide to use it. That matches how
Mollick described the game.

### Open question — the vault hints don't match the constants

`court` is described as "14 by 20 paces" but its footprint is `w:13, h:9`.
`market` says "18 by 34" against `w:17, h:12`; `basilica` says "22 by 52"
against `w:22, h:17`. The width figures are close (13→14, 17→18, 22→22) but
the depth figures are off by more than 2x and not by a consistent ratio.

Possible explanations, none yet verified:

- `pr` is in grid cells and the hint is in "paces" with a per-axis conversion
- `pr` is a footprint while the hint describes interior span
- the flavor text simply was never reconciled with the numbers

Worth resolving by measuring a Basilica in play.
