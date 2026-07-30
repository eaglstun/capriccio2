---
name: vaporwave
description:
  Reference for building things that look and feel vaporwave — the
  washed-pastel, mall-nostalgia, Windows-95-and-Greek-statuary aesthetic. Use
  when asked for a vaporwave (or synthwave / outrun / mallsoft / Y2K) look in
  UI, CSS, poster art, 3D scenes, shaders, or copy; when picking neon/pastel
  palettes and retro type; or when judging whether something reads as the real
  thing or as a pile of clichés.
---

# Vaporwave

An aesthetic of **nostalgia for a commercial future that never arrived**. It
looks back at 1984–1999 corporate optimism — mall atriums, software boxes, hold
music, stock 3D renders — and plays it back slowed down, half-broken, and too
pink. Irony and sincerity at the same time; that tension is the whole point.
Strip either one and you get a cheap gradient.

| file                     | contents                                                     |
| ------------------------ | ------------------------------------------------------------ |
| `references/palettes.md` | named palettes with hex, mixing ratios, CSS gradients        |
| `references/shaders.md`  | GLSL + three.js: scanlines, chromatic aberration, PS1 wobble |
| `references/canon.md`    | the source material, neighboring genres, further reading     |

## The one rule that matters

**A washed-out base with one screaming neon accent.** Not neon everywhere.

The single most common failure is cranking saturation across the whole frame.
Real vaporwave is mostly _faded_ — sun-bleached pastel, dead-mall beige, VHS
grey — and then one or two elements scream. The bleached majority is what makes
the neon read as neon. Aim for roughly **70% desaturated / 25% pastel / 5%
fluorescent**.

Second rule: **empty space is not wasted space.** One floating object, centered,
with room around it beats six objects arranged cleverly.

## Building the look

**Color.** Pink/cyan is the signature pairing (`#FF71CE` + `#01CDFE`), usually
over a purple-to-orange gradient sky. Add mint `#05FFA1` sparingly. Ground the
whole thing on a grey that is genuinely grey — `#C0C0C0`, the Windows 95 button
face — or a warm dead-mall cream. See `references/palettes.md`.

**Composition.** Center-weighted and symmetrical. A horizon line low in the
frame, a perspective grid receding to it, a gradient sky above, one hero object
floating dead center. Checkerboard floors. Sun as a solid disc with horizontal
slits cut through it.

**Objects.** Greco-Roman plaster busts (Helios, Venus, Michelangelo's David),
palm trees, dolphins, marble columns, CRT monitors, cassettes, VHS tapes,
Windows 95 dialog boxes, product photography of consumer goods lit like a sacred
object. Low-poly and slightly wrong is better than well-modeled.

**Type.** Set English in a bold grotesque (Arial, Helvetica) or in Times New
Roman for the corporate-memo register. Then set the _decorative_ layer in
Japanese katakana or in fullwidth Latin — `ｖａｐｏｒｗａｖｅ` — which is
Unicode's Halfwidth and Fullwidth Forms block, U+FF01–U+FF5E. Wide letter
spacing on everything. Chrome bevels and drop shadows are period-correct.

> Fullwidth characters are read aloud one at a time by screen readers and break
> text search. Use them for display only, and keep a plain-text `aria-label` on
> anything a user actually needs to read.

**Texture.** Everything sits behind at least one layer of degradation: VHS
tracking lines, chromatic aberration, scanlines, JPEG artifacts, dithering,
interlacing. The image should feel like a copy of a copy.

**Motion.** Slow. Slower than feels right. The audio signature of the genre is
pitched-down, chopped, looping samples that never resolve, and the visual motion
should match — 15–20 second drifts, endless loops, no easing that implies
snappiness. Nothing here is in a hurry.

**Copy.** Corporate voice with the meaning removed. Product names, license
agreements, hold-music politeness, mission statements about nothing.
"UNLIMITED", "NOW WITH", "SATISFACTION GUARANTEED", "PLEASE WAIT".

## In a browser

CSS that carries most of the weight:

```css
background: linear-gradient(180deg, #2b1055 0%, #7597de 55%, #ff9a8b 100%);
text-shadow:
  2px 0 #01cdfe,
  -2px 0 #ff71ce; /* cheap chromatic aberration */
letter-spacing: 0.35em;
font-family: "MS Sans Serif", Tahoma, Verdana, sans-serif;
image-rendering: pixelated; /* keep upscales crunchy */
```

A scanline overlay is a repeating-linear-gradient at 2–4px with ~8% black,
`pointer-events: none`, on top of everything. The perspective grid is a
`repeating-linear-gradient` pair on an element with
`transform: perspective(300px) rotateX(60deg)`.

## In 3D (three.js)

The project this skill lives in runs three.js, so:

- Exponential fog (`FogExp2`) in a magenta or deep purple, dense enough to eat
  the horizon. Fog is doing more work than any light.
- `GridHelper` on the ground plane with an emissive-bright line color and a dark
  base — then let bloom smear it.
- Emissive materials rather than lit ones. `MeshBasicMaterial` and
  `emissiveIntensity` beat physically correct shading; nothing here should look
  correctly lit.
- `UnrealBloomPass` with a low threshold so pastels bloom too, not just neons.
- For PS1 crunch: render to a small target (320×240) and upscale with nearest
  filtering, snap vertices to a coarse grid in the vertex shader, and disable
  perspective-correct interpolation to get affine texture swim.

Snippets for all of it are in `references/shaders.md`.

## Neighbors — don't blend them by accident

| genre                | reads as                                                            |
| -------------------- | ------------------------------------------------------------------- |
| **vaporwave**        | pastel, ironic, static, consumerist, daytime mall                   |
| **synthwave/outrun** | dark, sincere, heroic, driving, neon-on-black, night highway        |
| **mallsoft**         | vaporwave with the people removed — reverb, empty atrium, muzak     |
| **Frutiger Aero**    | 2004–2008 optimism: glossy, wet, blue-green, bubbles, Windows Vista |
| **Y2K / cybercore**  | chrome, inflatable shapes, silver-blue, translucent plastic         |

Asking for "vaporwave" and delivering black-background neon-grid Outrun is the
most common mix-up. Vaporwave is _daylight_. If your background is black, check
that's what was wanted.

## Failure modes

- **Cliché stacking.** Bust + palm + dolphin + grid + katakana + checkerboard in
  one frame reads as a parody of the genre. Pick two motifs. Leave space.
- **Full saturation.** See rule one. If nothing in the frame is faded, nothing
  in the frame pops.
- **Too clean.** Modern flat design with a pink-purple gradient is not
  vaporwave, it's a 2019 SaaS landing page. It needs the degradation layer and
  the period-wrong UI chrome.
- **Fast motion.** Snappy 200ms transitions break the spell instantly.
- **Katakana as decoration you didn't check.** If you place Japanese text,
  either use a real word that means something defensible or use an obviously
  decorative string. Machine-mangled kana reads as careless to anyone who reads
  Japanese, and the joke isn't on them.
- **Ironic detachment only.** The genre works because it's genuinely
  affectionate about the junk it's mocking. Contempt alone looks thin.
