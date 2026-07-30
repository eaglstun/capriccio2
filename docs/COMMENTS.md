# Every comment that survived the build

The bundle was minified, which strips comments — but **not comments inside
string literals**. CAPRICCIO's GLSL lives in JS template strings, so the shader
comments came through untouched.

43 comment lines survive in 662KB. Ten belong to three.js. Two are false
positives. **Thirty-one are the game's own** — and thirty of those are in the
shaders.

This is the only place in the entire artifact where intent is stated rather than
inferred. Everything else in this repo's documentation is reverse- engineered;
this file is quotation.

Line numbers refer to the local pretty-printed bundle.

---

## The sky (25470–25482)

```glsl
// ============ SKY ============
// faint horizontal burin lines, denser toward horizon, broken by cloudy noise
// dusk warms and darkens the paper sky a touch near the sun's side
```

The sky is _hatched_, not shaded — horizontal burin strokes that thicken toward
the horizon. A **burin** is the lozenge-tipped steel tool an engraver pushes
through copper.

## Ink outlines (25488–25525)

```glsl
// ============ INK OUTLINES ============
// kernel radius in pixels
// depth edge, scaled by distance so far geometry doesn't light up everywhere
// normal edge from reconstructed positions (creases, arch intrados)
// distance fade (matched exp2 fog) — lines dissolve into haze
// near boost: foreground strokes read heavier
```

Two edge detectors — depth discontinuity and normal discontinuity — with
distance compensation on both, so distant geometry doesn't turn into a mess of
lines. The fade is deliberately matched to the scene's exp2 fog so ink and
atmosphere dissolve together.

**Intrados** is the architectural term for the inner curve of an arch. Not a
graphics word.

## Paper (25531–25542)

```glsl
// ============ PAPER ============
// grain: two frequencies of static screen-space tooth
// slight warm paper tint multiply + dusk warmth
// vignette
```

**Tooth** is the papermaker's word for a sheet's surface texture — the roughness
that holds ink. Note _static_ screen-space: the grain is fixed to the viewport,
like looking at a physical print, while the hatching underneath is locked to
world space. Two different frames of reference, deliberately.

## Hatching (25767–25789)

```glsl
// too dense on screen → flat tone, no moiré
// hand-cut waviness
// distance-adaptive hatching: line spacing tracks viewing distance in powers
// of two (crossfaded like mip levels) so strokes stay engraving-fine up close
// and remain visible far away — while staying anchored to the stone
```

The most technically substantial comment in the bundle, and it states the whole
thesis: fine up close, visible far away, **anchored to the stone**. That last
clause is the difference between an engraving and a filter.

"Hand-cut waviness" is one line of noise added to the hatch coordinate. It is
the difference between a machine ruling and a person cutting.

## Masonry (25796–25827)

```glsl
// masonry joints + per-block tonal patchwork
// natural ground: sparse engraved flecks + contour lines on any tilt
// contour lines where the ground genuinely tilts (strata edges only)
// dissolve in the distance
// pavement grid
// wall courses
```

Three surface treatments by normal. Note the restraint in _"where the ground
genuinely tilts (strata edges only)"_ — contour lines everywhere would read as a
topographic map; contour lines only on real slopes read as geological strata.

## Light and shade (25853–25901)

```glsl
// exposure: how much sun this surface sees (0 = full shade / cast shadow)
// baked AO pulls pockets into shade
// ambient rescue: open upward faces in shadow stay a touch lighter than
// enclosed undersides
// stroke density tracks viewing distance (see hatchAdaptive)
// faint tooth on mid-lit stone so nothing reads as smooth plastic
// deep-shade floor
// section poché: interior of cut solids reads as dark diagonal-lined mass
```

**"Ambient rescue"** is a lovely piece of naming for a real problem: a
physically-correct shadow makes an open courtyard as dark as a sealed cellar,
which is wrong to the eye. The fix distinguishes _facing the sky_ from
_enclosed_.

**"so nothing reads as smooth plastic"** is the entire non-photorealistic
rendering problem stated in six words.

**Poché** is the drafting term for the solid fill shown where a section cut
passes through a wall — the black or hatched mass in an architectural section.
That comment is the SECTION mode, and it is named correctly.

## The one non-shader comment (29988)

```js
// stack: modes row sits above the full-width scrollable palette
```

A note about HUD layout. The lone survivor outside the shaders, and it is about
a flexbox.

---

## What the vocabulary shows

Across thirty-one comments the working vocabulary is:

> burin · tooth · intrados · poché · strata · courses · patchwork · moiré ·
> hand-cut · flecks · haze

That is the register of a printmaker and an architectural draughtsman, not of a
graphics programmer. Someone reasoning about copper, paper and stone, and using
shaders as the means.

Worth remembering what these are: **the comments a model wrote to itself** while
building this. Nobody was going to read them. They were stripped from every
other file in the bundle and survived here only by the accident of living inside
a string.

---

## Appendix — three.js comments (not the game's)

For completeness, the ten surviving vendor comments, all in three.js shader
chunks:

```text
16833  Rodrigues' axis-angle rotation
16945  RH coordinate system; PMREM face-indexing convention
16954  ( 1, v, u ) pos x
16959  ( -u, 1, -v ) pos y
16963  ( -u, v, 1 ) pos z
16968  ( -1, v, -u ) neg x
16973  ( -u, -1, v ) neg y
16977  ( u, v, -1 ) neg z
```

Lines 11702 and 11950 (`validated`,) are false positives — string fragments, not
comments.
