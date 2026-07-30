# The people of CAPRICCIO

Every named citizen, every voice, and how the writing is structured — extracted
from `src/12-requests.js`.

There are **four named characters and two collective voices**, across five
requests. That is the entire cast, and it does more work than its word count
suggests.

---

## The named

### Tullia

The most fully drawn person in the game, and **she never speaks first.**

Marcus opens the game by mentioning her — _"Tullia still talks of gardens up
there"_ — so before she asks you for anything, you know her as someone else's
description of a person who wants something. Then she gets her own request, for
water. Then, on completing it:

> Water crosses the void on stone legs. **Tullia planted the first bed the same
> evening.**

A complete arc in three sentences spread across two mechanics. She wanted a
garden, told Marcus about it, asked you for the water, and planted it the
evening it arrived.

### Marcus, lattice technician

The opening voice, and the only character with a trade attached. He asks for a
way up to the high terrace — the request the title screen names before you have
even begun.

Originally _Marcus, stonecutter_. On the vaporwave branch the name is unchanged
and only the trade drifted: the man survives, the craft does not.

### Livia

Asks for a passage through the great wall, in the most concrete terms anyone
uses:

> _"The great wall makes a half-hour of a hundred metres. A door through it
> would spare old legs."_

And afterwards:

> The passage breathes cool air through the wall. **Livia sits in it at noon.**

You built a shortcut. She uses it as somewhere to sit. That reversal is the best
small joke in the writing.

### The children

Unnamed but recurring, and the only ones who appear in both registers. They race
to the top of the terrace before the mortar dries, they chalk a game board onto
the plaza steps that _stays_, and they have invented seventeen names for the big
pier, **all of which are rude.**

## The collective voices

- **the weavers** — ask for the market hall, because rain spoils the cloth
- **the night watch** — ask for lanterns under the arches

Both are groups rather than individuals, which keeps the named cast small enough
to remember.

---

## The five requests

Each carries its own `thanks` — the line shown on completion. **The ask and the
answer are written as a pair, stored on the same object.**

| id              | reward | asked by                   |
| --------------- | ------ | -------------------------- |
| `reach-terrace` | +70    | Marcus, lattice technician |
| `water-terrace` | +90    | Tullia                     |
| `market-hall`   | +60    | the weavers                |
| `through-wall`  | +50    | Livia                      |
| `evening-light` | +30    | the night watch            |

**reach-terrace** (+70)

> _"The high terrace has been beyond us since the old stair fell. Tullia still
> talks of gardens up there."_ → The way up is open. Children raced to the top
> before the mortar dried.

**water-terrace** (+90)

> _"No water climbs so high. The spring across the great void mocks us every dry
> summer."_ → Water crosses the void on stone legs. Tullia planted the first bed
> the same evening.

**market-hall** (+60)

> _"Rain spoils the cloth every market-day. A roofed hall would change our
> lives."_ → The stalls moved in under the vault within a week. It smells of
> bread and wet stone.

**through-wall** (+50)

> _"The great wall makes a half-hour of a hundred metres. A door through it
> would spare old legs."_ → The passage breathes cool air through the wall.
> Livia sits in it at noon.

**evening-light** (+30)

> _"The under-arches go black after sunset. A few lanterns would make them
> kind."_ → Small lights hum under the arches now. The dark feels inhabited, not
> empty.

## The ambient lines

A **separate** array of eight, cycled by `nextFlavor()` independently of the
requests — not epilogues, just the city talking while nothing is being asked of
you.

> A trader asked the name of the city today. Nobody could quite agree. The
> drones have found the new arches. They roost where the swallows did. Someone
> chalked a game board onto the plaza steps. It stays. Old men argue about which
> arch is oldest. All of them are wrong. A cat has claimed the warmest panel.
> Construction routes around it. The masons hum while they work. The vaults hum
> back. Cable runs appeared between the columns overnight, like laundry lines.
> Children have invented seventeen names for the big pier. All are rude.

**The drone line is the whole thesis in nine words.** _They roost where the
swallows did_ — same behaviour, same place, different creature. It is exactly
what the audio does: the bird calls kept every number (2–4 calls, 2300–3900Hz,
130ms apart, −160Hz slide, daylight only) and changed only the waveform from
sine to square.

---

## How the writing works, for anyone adding to it

Rules the existing five follow. Break them and new content will read as
generated.

**1. Ask for a consequence, never a building.** Nobody says "build a vault".
They say rain spoils the cloth. The player works out that the answer is a market
hall, and that inference is the whole pleasure.

**2. Every ask is a specific physical grievance.** Wet cloth, old legs, a dark
arch, a dry summer. Nothing is abstract and nothing is about the city as an
abstraction.

**3. The thanks is never gratitude.** Not one of the five says thank you. Each
reports **what people did with the thing afterwards** — raced up it, planted a
bed, moved the stalls in, sat in it at noon. The reward for building is watching
it get used.

**4. Names recur across registers.** Tullia is named by Marcus, then speaks,
then appears in her own completion. That crossing is what makes four names feel
like a town.

**5. Sensory, not statistical.** _It smells of bread and wet stone._ No numbers
appear anywhere in the citizen writing.

**6. Nobody is grateful to _you_.** The player is never addressed and never
thanked. Things simply become possible, and people use them. That restraint is
what keeps it from being a quest board.

### Implication for procedural requests

If the mid-game is ever filled by generated requests (see `FEATURES.md`), the
generator must produce **both halves** — an ask and an aftermath — and the
aftermath must describe use, not thanks. A generator that emits "Build 3 vaults"
and "Well done!" would be worse than leaving the mid-game empty.
