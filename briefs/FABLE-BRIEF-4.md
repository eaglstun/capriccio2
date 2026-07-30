# Brief 4 for Fable — the score grows, and the image argues with itself

Two independent pieces. Do the music first; it is the clearer win.

Budget: ~30 minutes. Size ceiling 2MB and **loose** — do not cut something good
to save bytes.

---

# Part A — the music has to go somewhere

Right now `src/18-music.js` loops four chords at ~67bpm, with a square arpeggio
while the city is building. It is a good bed and it never develops.

## A1. Drums, entering at about 30 seconds

**Nothing percussive for the first ~30s.** The pads establish alone, exactly as
now. Then drums arrive and the piece has a second act.

Use the arrangement vocabulary from `~/.claude/skills/guitar/formats/drums.md` —
bass drum, snare, hi-hats, ride, floor toms, crash, fills; subdivisions on
quarters / eighths / sixteenths; `half-time` as an annotation. Suggested shape,
not a script:

| from  | layer                                                                         |
| ----- | ----------------------------------------------------------------------------- |
| 0:00  | pads only — _(no drums)_                                                      |
| ~0:30 | hi-hats on eighths, soft bass drum on quarters                                |
| ~1:00 | snare on 2 and 4, bass drum pattern opens up                                  |
| ~1:30 | ride, occasional floor-tom fill at phrase ends                                |
| dusk  | drop to **half-time** — the filter already closes at dusk; let the kit follow |

Slow, patient, tape-saturated. This is not a dance track. A fill should arrive
about once every eight bars, not every bar.

## A2. The harmony should develop — use the theory

Read `~/.claude/skills/guitar/references/theory.md`. It is written for guitar
charts, but the harmonic content applies directly.

The existing loop is **Am9 – Fmaj9 – Cmaj9 – Gadd9** — that is **i – VI – III –
VII in A minor**, the relative minor of C major. Stay in that key. Everything
below is colour inside it, not modulation.

From the reference, the techniques that will earn the most here:

- **sus2 / sus4** — suspend the 3rd so the chord hovers, neither major nor
  minor. `Asus2` and `Asus4` in the opening minutes make the bed feel unresolved
  and patient. `Esus4` wants to resolve and can pull into a section change.
- **add9** — the 9th without a 7th. Warmth without jazz weight, and it stacks
  cleanly under a beat. `Fadd9`, `Cadd9`.
- **Modal interchange** — a **D major** where the diatonic chord would be Dm
  borrows from A Dorian. One bright chord in a minor key is the most emotionally
  effective single move available to you here, and vaporwave lives on exactly
  that kind of unearned major lift. Use it **once**, late.

Vary the loop across the build rather than adding chords everywhere: bars 1–8
plain, 9–16 with suspensions, later passes with the borrowed major. **The
listener should not be able to say when it changed.**

## A3. Layers, not volume

Build by **adding voices**, not by turning things up:

- a slow counter-melody, one note per bar, high and thin
- an octave-doubled pad an octave down as the drums arrive, for weight
- light detuned unison on the lead pad only after the second section
- keep the construction arpeggio doing its existing job — it is bound to the sim
  and must stay bound

Still **synthesized only** — no `samples()`, no fetches. The existing sound
effects (wind, drones, bell, chisels) are a separate system; do not touch their
bindings.

---

# Part B — competing rendering styles

Currently one coherent look. The user wants **visual maximalism**: several
image-making styles arguing for the same screen.

## B1. The organising idea — style _is_ period

Do not pick styles arbitrarily. Each one is a moment in the history of making
pictures, which is the game's whole thesis:

| technique                                      | era                               |
| ---------------------------------------------- | --------------------------------- |
| copperplate engraving — the triplanar hatching | c. 1750, Piranesi's actual medium |
| **1-bit Atkinson dither**                      | **1984, the Macintosh**           |
| CRT scanlines, chroma bleed, VHS tracking      | 1980s–90s                         |
| neon bloom, realtime post                      | now                               |

Three of those already exist in `00-shaders.js`. **Add the dither and then
arbitrate between all four.** The rendering technique becomes the timeline.

## B2. Atkinson dithering — and the honest constraint

Atkinson is **error diffusion**: each pixel pushes 1/8 of its quantisation error
to six neighbours, and _discards the remaining 2/8_. That discard is why it
blows out highlights and crushes shadows — it is the signature.

**It is sequential, so a fragment shader cannot do it properly.** Do not pretend
otherwise. Options, in the order I would try them:

1. **Ordered dither with an Atkinson-shaped response.** Bayer or blue-noise
   threshold — parallel, one cheap pass — with the contrast curve tuned to mimic
   the 6/8 error retention. Not Atkinson; reads as Atkinson.
2. **True Atkinson on the PLATE captures.** Plates are stills rendered once at
   2000px, so the real algorithm can run honestly on the CPU there. The
   engraver's plate becomes a 1-bit dithered plate. **This is the best fit in
   the codebase** and I would do it even if nothing else in Part B happens.
3. Multi-pass wavefront diffusion — real, far too expensive, do not.

Say which you used. Do not claim true Atkinson if you shipped ordered dither.

## B3. Arbitration — hard edges, and meaning

Maximalism dies without crisp boundaries. Four styles cross-faded is mush; four
styles with sharp edges is deliberate collage. Prefer, in order:

1. **By fabric.** `uCourseH` already separates first-era material from
   end-of-humanity material — the rule you invented in pass 2. Render the old
   fabric in engraving and the new in dither. The two eras then render in two
   eras' _techniques_, and the boundary already means something.
2. **By screen region** — drifting slabs with hard edges, driven by the VHS
   tracking machinery that already displaces bands. Extend it from displacing
   pixels to switching styles.
3. **By depth** — far field dithered, near field hatched.

Keep the triplanar hatching present somewhere in every frame. It is the thing
that makes this look hand-made rather than filtered.

---

## Frozen — unchanged

`pickPocket`, the five stat formulas, `applyAction`, the pocket model, the save
format, catalogue `key` values, structure envelopes. `public/` never edited.
Never run `split_bundle.py --write`; never delete `src/.hand-edited`. No shipped
binary assets or runtime fetches (runtime canvases are fine). No hand-renaming.

Verify after each block: `yarn build` green; fresh game reports **24 structures,
48 pockets, 1331 navNodes, 46 pop, kinds 12/34/1/1**. Report draws/tris.

**Listen to the music before claiming it works** — a Strudel pattern that throws
at scheduler time fails silently to the eye. And do not claim it renders if you
have not looked at it.
