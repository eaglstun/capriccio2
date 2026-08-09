# Brief 5 for Fable — palette maximalism, and things in the distance

The look is coherent and slightly too coherent. It reads as one duotone idea —
violet stone, mint infill, pink and cyan neon — applied everywhere. The user
wants **more variety and genuine maximalism**, plus two specific additions.

Budget ~30 minutes. Size ceiling 2MB, loose.

---

## Part A — the palette

### The craft note that makes this work

**Maximalism survives on value structure, not hue restraint.** You can let hue
go anywhere as long as the _value_ (lightness) relationships stay disciplined
and the edges stay hard. Mud happens when everything drifts to mid-value at
similar saturation. Keep a clear dark/mid/light hierarchy per region and the
hues can fight all they like.

So: **explode the hues, hold the values.**

### A1. Palette by district — the best hook available

The game already generates districts, and they re-derive as the city grows —
"The Lantern Quarter", "The Ember Quarter". **Give each district its own palette
signature** and let it tint the fabric and neon within its radius.

This is the strongest idea in the brief: it makes the colour variety _mean_
something, it changes as the player builds, and the naming already exists. A
player who notices that the Ember Quarter runs hot and the Cistern Quarter runs
cold has found something real.

If per-district tinting is too invasive, tint by proximity to designations
instead — trade / dwelling / garden / gathering each with a colour temperature.

### A2. More material families

Right now most surfaces are one violet family. Add distinct, nameable ones:

- **rusted steel** — orange-brown oxide, on gantries, containers, wrecks
- **verdigris copper** — the one genuinely aged green, on roofs and pipework
- **sodium vapour** — the orange streetlight; warm, low, and everywhere
- **mercury vapour** — that sickly blue-green, for older working lamps
- **halogen white** — hot, small, for the few things still properly powered
- **toxic bloom** — yellow-green, on the landfill and its runoff
- **ember** — deep red-orange in the trash fires, and only there

Neon should **not** all be the same pink and cyan. Vary hue per sign, per
district, per structure age. Some should be failing — half-lit, wrong colour,
flickering to magenta because a channel died.

### A3. Time of day should move the palette further

Dawn, day, dusk currently shift the sunset gradient. Push it: cool blue-grey
mornings, bleached high day, violent orange dusk, and let the artificial lights
take over as the sun drops. The contrast between daylight palette and night
palette is free variety.

---

## Part B — two specific additions

### B1. Satellites

Things in orbit, visible in the sky. Slow-moving points crossing on fixed
tracks, some steady, some **tumbling** — flaring periodically as a dead solar
panel catches the sun. A few should be obviously derelict.

Cheap: `Points` or small billboarded quads on parametric paths, seeded so they
are stable. Do not let them read as birds — different speed, different altitude,
perfectly straight paths.

This is a good place for a quiet detail: satellites still holding station, still
transmitting to nobody. The billboards on the ground are advertising to nobody;
this is the same joke at 400km.

### B2. Crumbling overpasses in the middle distance

Between the megastructure skyline and the city: **elevated roadway on piers,
collapsed in sections.** Decks ending in mid-air with rebar hanging. Rows of
pillars standing with no deck left on them at all. A section fallen whole and
lying at an angle.

This is the strongest possible reinforcement of the modern-ruin idea, because an
overpass reads instantly as _ours_ — nobody mistakes a highway viaduct for
antiquity. Place several at different distances so they layer with the skyline.

Scene-only geometry, merged, **never in `structGroup`**. Fixed seed.

---

## Frozen — unchanged

`pickPocket`, the five stat formulas, `applyAction`, the pocket model, the save
format, catalogue `key` values, structure envelopes. `legacy/` never edited.
Never run `split_bundle.py --write`; never delete `src/.hand-edited`. No shipped
binary assets or runtime fetches — runtime canvases are fine. Keep the triplanar
hatching and the dither/engraving style split. No hand-renaming.

Verify: `yarn build` green; fresh game reports **24 structures, 48 pockets, 1331
navNodes, 46 pop, kinds 12/34/1/1**. Report draws/tris and bundle size (baseline
844,546 bytes; ~149 draws at boot, ~200 on a grown city).

Serve on **8124 or your own port — 8123 is the ORIGINAL game**, and never put
`?fresh` on it.

## Report back

What changed by file; bundle size; draws/tris; `CAP.status()` confirmed in a
browser; what you chose not to do; screenshots — ideally one at dawn and one at
dusk so the palette range is visible.
