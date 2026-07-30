# Brief 7 — the dither gets honest, and three new things in the world

---

# Part A — fix the realtime dither

## The diagnosis

Both dither sites use a **4×4 Bayer matrix** — `eBayer4` in the material hook
and `bayer4` in the post-pass style slab. That cannot look like Atkinson, for
two structural reasons:

1. **Sixteen threshold levels.** A 4×4 matrix holds 16 values. Every tone is
   rounded into one of sixteen buckets, which is why it bands.
2. **A fixed lattice that cannot see the image.** Bayer repeats the same 4-pixel
   grid everywhere. Atkinson's signature is _irregular clusters that follow
   image content_, because each pixel's error is pushed into its actual
   neighbours. A content-blind matrix produces a halftone screen, not a dither.

## What real Atkinson does — for reference

Raster order, per pixel:

```
old  = value + accumulated error
new  = old > threshold ? 1 : 0
err  = (old - new) / 8

          *   +1/8  +1/8
   +1/8  +1/8  +1/8
          +1/8
```

Offsets `(x+1,y) (x+2,y) (x−1,y+1) (x,y+1) (x+1,y+1) (x,y+2)`. **Six shares
leave, two eighths are discarded** — only ¾ of the error propagates. That leak
is why highlights blow to paper and shadows crush to ink. Floyd–Steinberg by
contrast conserves all of it (7/16, 3/16, 5/16, 1/16) and looks muddier.

Three visual tells of the real thing: aperiodic clusters with no repeating
structure; short serpentine "worms" in midtones where error walks forward along
the scan; and large flat areas snapping to pure paper or pure ink, giving clean
voids rather than an even fuzz.

## The fix

**A1. Replace Bayer with blue noise.** Generate a 64×64 blue-noise threshold
texture at load — void-and-cluster, or iterative energy minimisation, whatever
you trust. Procedural, zero shipped bytes, tiles seamlessly, 256 levels instead
of 16, no visible lattice. This is the single biggest improvement available and
it gets the first of the three tells.

If a texture is unwelcome, interleaved gradient noise is a one-liner that still
beats Bayer comfortably:

```glsl
float ign(vec2 p){ return fract(52.9829189 * fract(0.06711056*p.x + 0.00583715*p.y)); }
```

Prefer real blue noise; use IGN only if the texture proves awkward.

**A2. Bias the threshold by local luminance gradient** so clusters bunch along
edges the way error diffusion does. That buys the edge-enhancement tell and is
what makes it read as _diffusion_ rather than _screening_.

**A3. Coarsen the cell.** `uPxScale` is 2. Atkinson ran at one pixel on a
512×342 screen; on a 1500px viewport, 2px cells are proportionally far finer
than a real Mac. Try 3, look at it, decide.

**A4. Keep the contrast curve.** `(dl - 0.5) * 1.45 + 0.56` is already doing the
¾-conservation blowout correctly. Do not touch it.

## What NOT to do

- **No ping-pong error buffer.** It looks tempting and it is wrong: a fragment
  shader resolves every pixel simultaneously against last frame's data, which is
  a simultaneous relaxation, not a raster scan. It needs several static frames
  to converge and this scene never holds still — citizens walk, neon flickers,
  satellites cross, the tracking bar rolls. You would get permanent smear.
- **Do not touch the plate dither.** `14-plates.js` runs true Atkinson on the
  CPU and it is correct. **The realtime is an homage; the plates are the genuine
  article.** That division is deliberate and it is the point: the world you move
  through is rendered in a stylistic cousin, and the sixteen images that survive
  are the real 1984 algorithm.

---

# Part B — three new scenery items

Each does a **different job**. Do not let them collapse into more clutter.

## B1. The outfall — infrastructure still running

A large concrete pipe cantilevered over the canyon edge, **still discharging**.
Slow viscous sludge, toxic yellow-green (the `toxic` material family already
exists), staining the rock face below in a long streak that widens as it falls.
Crusted deposits around the mouth. A service walkway alongside it, railings
gone.

The horror is that it still works. Nobody is upstream. Something is still
pumping.

Place it on the canyon rim where it is visible from the default camera. The
stain should read from a distance.

## B2. A tower crane, load still hanging — work stopped mid-action

Lattice mast, horizontal jib, counterweight, and **the hook still down with a
pallet of blocks suspended on it**. Slight rotation drift, or none — your call,
but the load must be hanging, not landed.

Cranes are how a city gets built. This one stopped mid-sentence. It is the
clearest possible statement that people left rather than finished, and it costs
almost nothing in geometry — lattice is repeated boxes.

## B3. A drained reservoir — the water left, slowly

A sunken basin with **tide-lines stepping down the sides**, each ring marking a
level the water sat at long enough to stain. Cracked polygonal mud floor.
Something stranded at the bottom — a small boat, a vehicle, an intake tower now
absurdly tall on dry ground.

Two reasons this earns its place. It is **formally different** — everything
added so far is vertical, and a large sunken negative space gives the eye
somewhere to fall. And it tells **slow time**: the tide-lines are years, not an
event. Most of this world reads as sudden absence; this one reads as decline.

## Placement and cost

Scene-only, merged, **never in `structGroup`**, fixed seed. Reuse the existing
material families (`toxic`, `rust`, `verdigris`, concrete). Report the draw
delta — baseline is ~138 at boot, ~206 on a grown city.

---

## Frozen — unchanged

`pickPocket`, the five stat formulas, `applyAction`, the pocket model, the save
format, catalogue `key` values, structure envelopes. `public/` never edited.
Never run `split_bundle.py --write`; never delete `src/.hand-edited`. No shipped
binary assets or runtime fetches. Keep the triplanar hatching. No hand-renaming.

Verify: `yarn build` green; fresh game reports **24 structures, 48 pockets, 1331
navNodes, 46 pop, kinds 12/34/1/1**. Serve on **8124 or your own port — 8123 is
the ORIGINAL**, never `?fresh` on it.

Report: what changed by file; which noise you used and why; bundle size;
draws/tris; `CAP.status()` confirmed; screenshots — including a close crop of
the dither so the change from Bayer is visible, and the outfall from the default
camera.
