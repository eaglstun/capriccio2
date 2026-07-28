# How CAPRICCIO plays out

The arc of the original game, traced from source. The vaporwave branch does not
change any of it — every number below is frozen and verified identical.

## The shape in one paragraph

You start cramped. Favor unlocks how far you can build, and favor comes almost
entirely from five citizen requests. Complete them and the city's growth
ceiling roughly quadruples. After that the requests are gone forever and the
only remaining source is publishing plates. Population caps at 132. There is no
ending, no failure, and no score.

---

## Favor is the progression system, and it is never spent

Favor is only ever _tested against thresholds_. Nothing deducts it.

**It sets your maximum span length** (`X_()` in `07-citizens.js`):

| favor             | max span |
| ----------------- | -------- |
| under 60          | 55       |
| 60 or more        | 95       |
| 150 or more       | **150**  |
| sandbox (`folio`) | 160      |

**And your maximum vault length** (`11-tools.js`):

| favor      | max vault |
| ---------- | --------- |
| under 60   | 40        |
| 60 or more | 60        |
| sandbox    | 75        |

So the early game is deliberately short-reach: you cannot bridge far and you
cannot roof anything large. Earning favor is what extends your arm.

## Favor also, quietly, sets how big the city can get

Every 2.2 seconds the growth tick runs (`17-bootstrap.js`):

```js
demand = 10 + favor × 0.28 + (pockets that aren't terrace_p) × 0.12
```

and `InfillSystem.grow` refuses to build anything unless

```js
demand > items.length × 0.9
```

**This is the single most consequential formula in the game and it is invisible
to the player.**

| favor            | demand | city stalls at roughly |
| ---------------- | ------ | ---------------------- |
| 12 (start)       | ~15    | **16 buildings**       |
| 82 (one request) | ~34    | ~37 buildings          |
| 312 (all five)   | ~97    | ~107 buildings         |

At starting favor the city grows to about sixteen buildings and then stops,
apparently finished. It is not finished. It is waiting.

## The five requests are the whole campaign

There are exactly five, ever — a fixed array filtered against `doneRequests`,
which persists in the save. Once done they never return.

| id              | favor |
| --------------- | ----- |
| `reach-terrace` | 70    |
| `water-terrace` | 90    |
| `market-hall`   | 60    |
| `through-wall`  | 50    |
| `evening-light` | 30    |

**300 favor total.** The first one alone crosses the 60 threshold, upgrading
spans 55→95, vaults 40→60, and more than doubling the growth ceiling. The
second crosses 150.

They arrive one at a time; a new one appears 9 seconds after the last completes.

## After the campaign: plates, forever

Once the five are done, the only remaining source of favor is **engraving a
plate: +6 each, unlimited.**

Which is a quietly perfect piece of design. The citizens stop asking you for
things, and the only way to keep growing is to _publish views of your own
city_. Your standing as an artist becomes the thing that lets you build. That
is, precisely, how Piranesi funded Piranesi.

## The ceilings

- **Population** = `min(132, 22 + completed houses × 4)`. Twenty-eight houses
  maxes it; every house after that is scenery.
- **GRANDEUR** = spans ×0.14 + vaults ×0.12 + stairs ×0.08 + giant piers ×0.08,
  clamped to 1. **About seven spans maxes it permanently** — after that the
  meter cannot respond to anything you do.
- **Plates kept in the save: `plates.slice(-16)`.** Sixteen. The rest fall off
  the end.
- **The clock never leaves 5.6–20.5**, so there is no night.

## There is no ending

No win state, no fail state, no score screen, no collapse. Five requests form a
soft arc, then it is an open garden until the agent pool fills.

## Two design observations

**SHELTER is the hard stat.** Infill grows on `terrace_p` pockets, which have
shelter ~0.11. Interiors have ~0.78 but fill more slowly. So a city left to
itself scores terribly on shelter — everyone is living outdoors — and the only
fix is deliberately vaulting over the places people already live.

**GRANDEUR is the shallow one.** Ornament contributes nothing: statues,
fountains, lanterns, cypresses, columns, passages and gates are all worth
exactly zero. Only spans, vaults, stairs and giant piers count, and it saturates
early.
