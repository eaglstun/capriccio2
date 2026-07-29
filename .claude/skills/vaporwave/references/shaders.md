# Degradation: CSS, GLSL, three.js

The look lives in the damage layer. These are the effects, cheapest first.

> These snippets are written from the standard techniques, not copy-pasted
> from a running build in this repo. Treat them as sketches to adapt — check
> uniform names and the `ShaderPass`/`EffectComposer` import paths against the
> three.js version actually installed before assuming they compile.

## Cheap wins (CSS only)

**Scanlines** — overlay on top of everything, non-interactive:

```css
.scanlines::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.1) 0px,
    rgba(0, 0, 0, 0.1) 1px,
    transparent 1px,
    transparent 3px
  );
}
```

**Chromatic aberration on text** — two offset shadows, no filter cost:

```css
text-shadow:
  2px 0 0 #01cdfe,
  -2px 0 0 #ff71ce;
```

**Perspective grid floor**:

```css
.grid {
  background-image:
    repeating-linear-gradient(90deg, #ff71ce 0 1px, transparent 1px 40px),
    repeating-linear-gradient(0deg, #ff71ce 0 1px, transparent 1px 40px);
  transform: perspective(300px) rotateX(60deg);
  transform-origin: 50% 0;
}
```

Animate it by translating the Y background-position over ~8s linear infinite.
Slower than you think is right.

**VHS tracking wobble** — a keyframed `clip-path` band that sweeps down the
element every 6–10 seconds, with a small `translateX` on the clipped copy. One
glitch every several seconds reads as a worn tape; constant glitching reads as
a broken website.

## GLSL fragment effects

Assume a full-screen pass with `tDiffuse`, `vUv`, and a `uTime` uniform.

**Chromatic aberration**, radial so it grows toward the edges:

```glsl
vec2 dir = vUv - 0.5;
float amt = uAmount * dot(dir, dir);   // 0.0 center, strongest at corners
vec3 col;
col.r = texture2D(tDiffuse, vUv - dir * amt).r;
col.g = texture2D(tDiffuse, vUv).g;
col.b = texture2D(tDiffuse, vUv + dir * amt).b;
gl_FragColor = vec4(col, 1.0);
```

**Scanlines + rolling bar**:

```glsl
float line = 0.92 + 0.08 * sin(vUv.y * uResolution.y * 3.14159);
float roll = smoothstep(0.0, 0.15, abs(fract(vUv.y - uTime * 0.06) - 0.5));
gl_FragColor.rgb *= line * mix(0.85, 1.0, roll);
```

**Bayer 4×4 dithering**, for the "not enough colors" feel:

```glsl
const mat4 bayer = mat4(
   0.0,  8.0,  2.0, 10.0,
  12.0,  4.0, 14.0,  6.0,
   3.0, 11.0,  1.0,  9.0,
  15.0,  7.0, 13.0,  5.0
) / 16.0;

ivec2 p = ivec2(mod(gl_FragCoord.xy, 4.0));
float threshold = bayer[p.x][p.y] - 0.5;
vec3 quantized = floor(col * levels + threshold) / levels;   // levels ~ 8.0
```

Indexing a `mat4` with a non-constant expression needs GLSL ES 3.00 (WebGL2).
On WebGL1 unroll it into a small `if` ladder or sample a 4×4 texture instead.

**Fade toward paper** rather than desaturating to grey:

```glsl
vec3 paper = vec3(0.949, 0.910, 0.835);   // #F2E8D5
col = mix(col, paper, uFade);             // uFade ~0.15–0.30
```

## PS1 / Saturn crunch (three.js)

Three effects together sell it; any one alone doesn't.

**1. Low internal resolution.** Render to a 320×240 `WebGLRenderTarget` with
`minFilter = magFilter = THREE.NearestFilter`, then draw that to the screen.
Everything downstream inherits the chunk.

**2. Vertex snapping** — the characteristic wobble as geometry jitters between
pixel positions:

```glsl
// vertex shader
vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
vec2 grid = uResolution / uSnap;           // uSnap ~ 2.0 .. 8.0
p.xy = floor(grid * p.xy / p.w) / grid * p.w;
gl_Position = p;
```

**3. Affine texture mapping** — the texture swim on floors and walls. Real
hardware had no perspective correction, so kill it by doing the divide
yourself and handing the rasterizer `w = 1.0`:

```glsl
vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
p.xyz /= p.w;
p.w = 1.0;
gl_Position = p;
```

Be aware of what this costs: with `w` forced to 1 you lose perspective-correct
depth interpolation and correct near-plane clipping, so large polygons close to
the camera will z-fight or clip wrong. It works best on small, heavily
subdivided geometry — which is also what the original hardware ran. If the
scene needs correct depth more than it needs the swim, skip this one and keep
the other two.

## Scene setup for the mood

- `scene.fog = new THREE.FogExp2(0x2b1055, 0.035)` — dense enough that the
  grid dissolves before it reaches the horizon. Match the fog color to the
  bottom of the sky gradient or the seam shows.
- Ground: `GridHelper` with a bright line color on a dark plane, or a single
  large plane with the grid in the fragment shader (cheaper, and lets you fade
  the lines with distance to kill aliasing).
- Materials: `MeshBasicMaterial`, or `MeshStandardMaterial` with `emissive`
  set and almost no light in the scene. Correct lighting is the enemy.
- Bloom: `UnrealBloomPass` with a **low** threshold (~0.2) so pastels bloom
  too. High-threshold bloom only lights the neons and gives you synthwave.
- Sun: a circle with horizontal bands cut out — do it in the fragment shader
  with `step()` on `uv.y`, with the band gaps widening toward the bottom.

## Order of passes

Render → bloom → chromatic aberration → dithering/quantize → scanlines →
vignette. Scanlines want to be near-last so bloom doesn't smear them into
mush, and the vignette last so it darkens everything uniformly.
