# CAPRICCIO 2

**A city of arches, grown inside its own monuments — and then, the same city at
the end of humanity.**

This repository starts with a 662KB minified JavaScript bundle with no source
map, and ends with a playable reskin of the game inside it. Everything in
between is documented.

---

## The original

**CAPRICCIO was made by [Ethan Mollick](https://www.linkedin.com/in/emollick/)
with Fable**, one of a series of city builders generated in the manner of
particular artists. That one took Giovanni Battista Piranesi, the
eighteenth-century engraver whose imaginary Roman ruins were always grander than
anything that stood. A _capriccio_ is a painting of buildings that never shared
a horizon.

It is a genuinely good game. You raise architecture — piers, spans, stairs,
vaults — and never place a house. The architecture emits **pockets**: habitable
voids scored on shelter, light, outlook and distance to water. Citizens move
into the ones worth living in. You are never asked to build a home, only to make
somewhere worth living.

It shipped as one file. No images, no audio, no fonts, no models — every stone,
citizen and sound generated in code. It fits twice over on a floppy disk.

## What this repository does

Two things.

**1. It reconstructs the game from the build.** No source, no source map, every
identifier minified to one or two characters. `src/` is now 18 readable ES
modules that compile back to a bundle behaving identically to the original.

**2. It reskins that game as the end of humanity.** Same rules — the scoring,
the growth, the save format, the way citizens choose where to live are all
untouched and verified untouched. What changed is the world they happen in.

---

## The invariant

The reconstruction is not a rewrite, and there is a check that proves it:

> Undo the identifier renames, strip the generated import/export blocks and the
> one hoisted declaration, concatenate the files in manifest order — and the
> result is **byte-identical** to the original bundle's app section.

`tools/split_bundle.py` runs that on every write and refuses to emit a partition
it cannot verify. Every rename is therefore provably a pure identifier
substitution rather than something that merely looks right.

The rebuilt bundle came out at **662,197 bytes against the original's 662,267**
— 0.01% — and fresh-game equivalence was checked field by field against the
original running on a separate origin: 24 structures, 48 pockets, 1331 nav
nodes, 46 population, identical pocket-kind distribution, identical draw calls
and triangle count.

## What is frozen, and stays frozen

Every visual pass is checked against these. If any moves, the change is
reverted:

| frozen                       | why                                                   |
| ---------------------------- | ----------------------------------------------------- |
| `pickPocket` scoring weights | it is the growth engine; changing it changes the game |
| the five stat formulas       | ACCESS / SHELTER / LIGHT / BELONGING / GRANDEUR       |
| structure envelopes          | pockets derive from action geometry                   |
| the save format              | an event-sourced action log; old saves must load      |
| catalogue `key` values       | labels and hints are free, keys are not               |
| `public/`                    | the original build, kept pristine as reference        |

---

## Layout

| path                   |                                                                |
| ---------------------- | -------------------------------------------------------------- |
| `public/`              | the original production build, untouched                       |
| `src/`                 | 18 ES modules + the score and runtime shim                     |
| `tools/`               | the splitter, the scope grapher, runtime probes                |
| `deploy/`              | the droplet deploy scripts                                     |
| `about.html`           | colophon and the things worth noticing                         |
| `docs/SIMULATION.md`   | how the game actually works — pockets, agents, growth          |
| `docs/PROGRESSION.md`  | how it plays out: favor tiers, the five requests, the ceilings |
| `docs/CHARACTERS.md`   | the cast, the five requests, and the rules the writing follows |
| `FEATURES.md`          | the current feature plan                                       |
| `CHRONICLE.md`         | the Chronicle: replay, and engraving from the past             |
| `docs/RENDERING.md`    | the engraving renderer, and what the reskin did to it          |
| `docs/AUDIO.md`        | the procedural soundscape                                      |
| `docs/COMMENTS.md`     | every comment that survived minification                       |
| `docs/VENDOR-MAP.md`   | all 48 three.js symbols, identified from evidence              |
| `docs/DEPENDENCIES.md` | the module graph                                               |
| `briefs/`              | the briefs each visual pass was built from                     |

## Running it

```sh
yarn install
yarn dev        # or: yarn build && serve dist/
```

To play the original for comparison, serve `public/` as its own web root. **Note
that `?fresh` deletes the save** — it is a real feature of the game, not a dev
flag, and the saves are per-origin.

---

## The idea

The same game, at the beginning and at the end of humanity.

The surface read is easy — neon, concrete, a sunset that will not end. The part
worth looking for is how little actually changed. The citizens still want
shelter, light, water and somewhere to gather in the evening. Ten thousand
years, and it is the same list.

Some of what shifted, none of which announces itself:

- The birds became drones. Same schedule, same two-to-four calls, same falling
  pitch — a square wave where there used to be a sine.
- Marcus is still Marcus. His trade changed. Tullia still talks about the
  gardens up there.
- **SOULS** never changed, while everything around it went technical.
- A quarter can still be named for candles, one entry away from a quarter named
  for sodium lamps.
- Between the title and the city, two lines appear. They are real comments from
  the sky shader — notes the program wrote to itself about drawing its own
  sunset, which survived only because comments inside string literals are not
  stripped.
- Only sixteen plates survive a save. Engrave a seventeenth and watch which one
  leaves.

The world is dithered as homage. **The plates are the real thing** — true
Atkinson error diffusion, six neighbours at one eighth each and two eighths
discarded, exactly as it ran on a Macintosh in 1984.

---

## Credits

Original CAPRICCIO by **Ethan Mollick**, generated with **Fable**. Score written
in [Strudel](https://strudel.cc), the JavaScript port of Alex McLean's
TidalCycles. Rendering by three.js r180.

This version is built on top of that one: same rules, later century.
