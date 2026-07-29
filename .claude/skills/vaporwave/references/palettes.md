# Palettes

Pick **one** palette per piece. Mixing two is how things start looking muddy.

Ratios throughout assume the rule from `SKILL.md`: mostly faded, a little
pastel, a very little fluorescent.

## 1. Mall Pink — the signature

The pairing most people mean by "vaporwave". Pink and cyan at full strength
over a bleached grey base.

| role        | hex       | notes                                  |
| ----------- | --------- | -------------------------------------- |
| neon pink   | `#FF71CE` | the accent — use on ~5% of the surface |
| cyan        | `#01CDFE` | second accent, pairs with the pink     |
| mint        | `#05FFA1` | third; sparingly, it fights the others |
| lavender    | `#B967FF` | mid-tone, good for large shapes        |
| pale yellow | `#FFFB96` | highlight, sun disc                    |
| base grey   | `#C0C0C0` | the Windows 95 button face             |

## 2. Sunset Gradient

For skies, hero backgrounds, and anything that needs a vertical sweep.

```css
background: linear-gradient(180deg, #2b1055 0%, #7597de 55%, #ff9a8b 100%);
/* alternative, hotter */
background: linear-gradient(135deg, #ff3cac 0%, #784ba0 50%, #2b86c5 100%);
```

Put the grid horizon at the seam between the second and third stop, not at the
bottom of the frame.

## 3. Dead Mall

Mallsoft. Daylight through a skylight onto beige tile. Almost no neon — the
restraint is the effect.

| role          | hex                                         |
| ------------- | ------------------------------------------- |
| tile beige    | `#E8DCC8`                                   |
| warm grey     | `#B7AFA3`                                   |
| dusty rose    | `#D9A5A0`                                   |
| planter green | `#7C9082`                                   |
| shadow        | `#5C5651`                                   |
| one accent    | `#FF6EC7` (a single lit sign, nothing more) |

## 4. Windows 95 Chrome

Period-correct UI. These are the real system values, so a dialog built from
them reads instantly.

| role               | hex                         |
| ------------------ | --------------------------- |
| 3D face            | `#C0C0C0`                   |
| 3D highlight       | `#FFFFFF`                   |
| 3D shadow          | `#808080`                   |
| 3D dark shadow     | `#000000`                   |
| active title bar   | `#000080`                   |
| title bar gradient | `#000080` → `#1084D0`       |
| desktop teal       | `#008080`                   |
| selection          | `#000080` on `#FFFFFF` text |

Bevel recipe: 1px `#FFFFFF` top/left, 1px `#808080` bottom/right, then 1px
`#000000` outside that on bottom/right.

## 5. Laserwave (leaning synthwave)

Darker and more sincere. Use when the ask is closer to outrun — but check
first, since vaporwave proper is daylight.

| role          | hex       |
| ------------- | --------- |
| deep purple   | `#2E1A47` |
| near-black    | `#180C2E` |
| hot magenta   | `#EB4A9B` |
| electric blue | `#40C4FF` |
| amber sun     | `#FFB347` |

## Desaturating correctly

Do not just lower saturation — that goes grey and dead. Shift toward the
paper/plastic the original would have faded onto:

- Toward warm cream (`#F2E8D5`) for anything print, mall, or 1980s.
- Toward cool grey-blue (`#D6DCE4`) for anything CRT, software, or corporate.

In CSS, a `filter: saturate(0.7) sepia(0.15)` over a too-hot image gets most
of the way there. In GLSL, mix toward the paper color rather than toward
luminance.

## Checking contrast

Pastel-on-pastel is the aesthetic and also unreadable. For any text a user
must actually read, keep 4.5:1 against its background and let the decorative
type be the low-contrast layer. A pink `#FF71CE` on cyan `#01CDFE` looks
correct and fails badly — reserve that combination for ornament.
