# How CAPRICCIO gets its engraving look

Source lines ~25400–25900 in the local pretty-printed bundle.

> **This branch (`vaporwave`):** the machinery below is intact but
> re-aimed at the end of humanity. What changed, in `src/00-shaders.js`:
>
> - **Sky** — the paper sky became a perpetual sunset gradient with a
>   banded low sun, smog strata pooled on the horizon, a broken orbital
>   ring, and azimuth-hashed light shafts rising off the megastructure
>   line. The burin-line and cloud machinery survives underneath.
> - **Masonry** — the wall-course branch now draws corporate panelling
>   (staggered seams, vent slats, inspection plates, corner bolts) when
>   `uCourseH >= 0.95`, at panel sizes large enough not to read as
>   ashlar. Materials with `courseH < 0.95` (`stoneOld`) draw
>   **board-formed concrete** — shutter seams, form-tie holes on the
>   pour grid, pour-lift tonal banding. The Roman coursing is gone;
>   the ruins are ours now. The only remaining token of deep antiquity
>   is deliberate spolia: one column embedded near the plaza edge, and
>   roughly one rubble drum in ten (`Pa`).
> - **Ruin geometry** (pass 3) — arches keep their silhouette but shed
>   the Roman dressing: no imposts, no keystone; flat bearing pads, a
>   service conduit over the crown, and bent rebar standing proud of
>   every spalled break (`Hn`). Vault ribs became flat pour-joint bands.
>   Column anchors became stacks with a service deck and a lit aerial.
> - **Scenery** (pass 3, all scene-only, never in `structGroup`):
>   benched landfill mounds with gull orbits, seven billboards still
>   advertising via a runtime `CanvasTexture` atlas (zero shipped
>   bytes), trash-can fires flickered by `world.sceneTick`, wrecked
>   cars, containers, trolleys, pallets, fencing that ends in nothing.
> - **Citizens** — per-instance clothing colour (`setColorAt`) and
>   build (non-uniform instance scale), derived deterministically from
>   the agent index; the figure base material is near-white so the
>   instance colours carry.
> - **Ink outlines** became neon rim light: hot pink near, cyan far.
> - **Paper grain** became CRT scanlines plus chroma wobble, with a new
>   `uTime`-driven VHS tracking bar (rolling displacement + chroma tear;
>   every depth/colour read follows the displaced uv so the tear is whole).
> - **New in the post pass:** an 8-tap two-ring neon bloom keyed on
>   luminance _and_ saturation (paper never blooms, neon does), and a
>   graded haze that reconstructs world height and drowns the low city
>   in smog colour.
> - **Palette now:** post `paper #e9b8d6`, `ink #ff3fae`; material
>   `uInkCol #2b1a52`; stone family in `01-materials.js` is pastel
>   violet/teal. The triplanar hatching is unchanged — it is what keeps
>   this looking hand-made rather than filtered.
> - The megastructure skyline itself is geometry, not sky: three merged
>   scene-only meshes built at the end of `C_` in `src/05-world.js` from
>   a fixed seed, never added to `structGroup`, so raycasting and
>   gameplay cannot see it.
>
> The prose below describes the original engraving and is kept as the
> reference for what the machinery was built to do.

**The GLSL is the most readable code in the entire artifact.** Shaders live in
template strings, and minifiers do not strip comments _inside_ strings — so
the original author's comments survive verbatim. This is the only place in
662KB where you can read intent in the writer's own words:

> `// distance-adaptive hatching: line spacing tracks viewing distance in powers`
> `// of two (crossfaded like mip levels) so strokes stay engraving-fine up close`
> `// and remain visible far away — while staying anchored to the stone`

## Two passes, in two different frames of reference

The look is built from **both** a material-level pass and a screen-space pass,
and the split between them is the point:

|                   | frame        | does                                                              |
| ----------------- | ------------ | ----------------------------------------------------------------- |
| **material hook** | world space  | the hatching and masonry — locked to the stone                    |
| **post pass**     | screen space | sky, ink outlines, paper grain, vignette — locked to the viewport |

That mirrors a real print: the engraved image is _in_ the plate, while the
tooth of the paper and the plate's edge belong to the sheet you're holding.

### The hatching specifically is not a filter

The obvious way to fake an etching is to do the whole thing in screen space.
This does not do that, and the difference is the whole reason it holds up.

The hatching is **injected into three.js's own standard material** — the
vertex chunk begins `#include <fog_vertex>`, meaning it patches the built-in
shader rather than replacing it. The injected code computes:

```glsl
vWorldPosE    // world-space position
vWorldNormalE // world-space normal
vToneE        // per-vertex tone, from a custom `aTone` attribute
```

Both branch on `USE_INSTANCING` and multiply through `instanceMatrix`, so the
effect works correctly on the instanced citizens and props.

Because hatch coordinates are **world-space**, the strokes are anchored to the
stone. Move the camera and the lines stay put on the surface, the way ink sits
on a plate — instead of crawling across the screen like a filter.

## Triplanar hatching

```glsl
float hatchTri(vec3 wp, vec3 aw, vec2 dir, ...) {
  return aw.z * hatchLine(wp.xy, ...)
       + aw.x * hatchLine(wp.zy, ...)
       + aw.y * hatchLine(wp.xz, ...);
}
```

Hatch lines are projected on all three world planes and blended by the squared
normal (`aw`), so any surface at any angle gets clean strokes with no UVs and
no seams. Standard triplanar mapping, applied to line work.

`hatchLine` adds noise to the coordinate before rasterizing:

```glsl
s += (eNoise(co * 0.31) - 0.5) * wob;    // hand-cut waviness
```

That single line is doing a lot of the aesthetic work. Perfectly straight
hatching reads as machine-made; the wobble reads as a burin in a human hand.

## Distance-adaptive stroke density

`hatchAdaptive` evaluates the hatch at two frequencies (`lvA`, `lvB`, powers
of two apart) and crossfades between them by `lf` — mip-mapping, done manually
for line density. Strokes stay fine when you are close and remain visible when
you are far, without the moiré that fixed-frequency hatching produces at
distance.

This is the detail that separates it from a shader-toy effect. Somebody
thought about what happens when you zoom.

## Masonry — three cases by normal

`masonry()` branches on the world normal and returns `(ink, blockTone)`:

| surface                               | treatment                                                                                                                                                     |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| natural ground (`n.y > 0.72`, coarse) | sparse engraved flecks, plus **contour lines only where the ground genuinely tilts** — `smoothstep(0.16, 0.42, tilt)` — that fade out with distance (`cfade`) |
| pavement (`n.y > 0.72`, fine)         | a 2.35-unit grid with per-cell tonal hash                                                                                                                     |
| walls                                 | horizontal courses at `uCourseH`, with per-block tone                                                                                                         |

`blockTone` is driven by `eHash21(floor(co / g))` — a hash per block — so every
individual stone carries slightly different tone. That is why the walls read
as _masonry_ rather than as a tiled texture.

## Lighting is hand-reconstructed for the ink

```js
const lum = c => 0.2126*c.r + 0.7152*c.g + 0.0722*c.b;   // Rec.709 luma
uSunDirW = (sun.position − sun.target).normalize()
uSunLum  = sun.intensity * lum(sun.color)     / π
uAmbSky  = hemi.intensity * lum(hemi.color)   / π
uAmbGround = hemi.intensity * lum(hemi.groundColor) / π
```

The scene's real lights are collapsed to **scalar luminance**, π-normalized,
and fed to the hatcher. Colour is discarded on purpose: an engraving has one
ink. Light level chooses hatch _density_, not hue.

## Palette

| uniform      | value     |                                 |
| ------------ | --------- | ------------------------------- |
| `uInkCol`    | `#241d12` | near-black warm brown — the ink |
| `paper`      | `#efe8d8` | the clear colour, and the sky   |
| `uHatchFreq` | 3.1       | base stroke frequency           |
| `uHatchGain` | 1.0       | stroke strength                 |

The renderer clears to the paper colour and the sky _is_ the paper —
`vec3 sky = uPaper;` — with a comment noting that dusk "warms and darkens the
paper sky a touch near the sun's side." The illusion is that you are looking
at a sheet, not through a window.

Other uniforms: `uCutting` (engaged during CARVE), `uDebugView`.

## The post pass (source ~25470–25542)

Screen space, and structured in three labelled blocks:

### SKY

> `// faint horizontal burin lines, denser toward horizon, broken by cloudy noise`
> `// dusk warms and darkens the paper sky a touch near the sun's side`

The sky is hatched, not shaded — horizontal strokes thickening toward the
horizon, broken up by noise so they don't read as a ruled grid.

### INK OUTLINES

> `// depth edge, scaled by distance so far geometry doesn't light up everywhere`
> `// normal edge from reconstructed positions (creases, arch intrados)`
> `// distance fade (matched exp2 fog) — lines dissolve into haze`
> `// near boost: foreground strokes read heavier`

Two detectors — depth discontinuity for silhouettes, normal discontinuity for
creases and arch intrados — each distance-compensated so distant geometry
doesn't collapse into a tangle of lines. The fade is explicitly matched to the
scene's exp2 fog, so ink and atmosphere dissolve on the same curve.

### PAPER

> `// grain: two frequencies of static screen-space tooth`
> `// slight warm paper tint multiply + dusk warmth`
> `// vignette`

Two octaves of grain, a warm tint multiply, and a vignette. **Static** screen
space is the operative word — the grain belongs to the sheet, not the scene.

## Shading, before the ink

The material pass computes an exposure term before hatching:

> `// exposure: how much sun this surface sees (0 = full shade / cast shadow)`
> `// baked AO pulls pockets into shade`
> `// ambient rescue: open upward faces in shadow stay a touch lighter than`
> `// enclosed undersides`
> `// faint tooth on mid-lit stone so nothing reads as smooth plastic`
> `// deep-shade floor`

"Ambient rescue" solves a real problem: physically-correct shadowing makes an
open courtyard as dark as a sealed cellar, which is wrong to the eye. The fix
distinguishes _facing the sky_ from _enclosed_ — which, in a game about
habitable voids, is also a gameplay distinction.

There is also a **section poché** path:

> `// section poché: interior of cut solids reads as dark diagonal-lined mass`

That is SECTION mode — the drafting convention where a cut through solid
matter is filled with dark diagonal hatching.

## Cost

`CAP.status()` reported **23 draw calls / 557,878 triangles** on a
132-population city — a cheap frame for what it produces. The material hook
adds only noise lookups to the existing standard-material shading; the post
pass is a single full-screen pass doing sky, edges, and paper together rather
than a stack of separate effects.
