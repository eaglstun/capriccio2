// Material factory: the onBeforeCompile hook and the stone palette
//
// Extracted from legacy/assets/index-DCXbw2vV.js, bundle lines
// 25918–26207. Statements are verbatim; identifiers are
// renamed via src/renames.json. Imports and exports are generated.
// Regenerate: python3 tools/split_bundle.py --write

// --- generated imports ---
import {
  BufferAttribute,
  Color,
  type ColorRepresentation,
  DoubleSide,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshPhongMaterial,
  PlaneGeometry,
  type Side,
  Vector3,
} from "three";
import {
  Q0,
  TERRACE_H,
  districtUniforms,
  e_,
  engravingUniforms,
  t_,
} from "./00-shaders";
// --- end generated imports ---

/**
 * Build a Lambert material with the engraving shader hooked into it.
 *
 * The whole look is injected via `onBeforeCompile` rather than a custom
 * ShaderMaterial, so the material keeps three.js's own lighting, shadows and
 * fog and only the SURFACE treatment is ours. That is why shadows work at all.
 *
 * `i` carries the per-material knobs — stone colour, joint alpha, course
 * height (`uCourseH`, which also selects the masonry treatment: board-formed
 * concrete below 0.95, corporate panelling above), and whether this material
 * dithers to 1-bit.
 */
/** The per-material knobs described above. All optional; all have defaults. */
interface StoneMaterialOpts {
  side?: Side;
  stone?: ColorRepresentation;
  jointAlpha?: number;
  courseH?: number;
  gain?: number;
  dither?: boolean;
  carvable?: boolean;
}

function createStoneMaterial(i: StoneMaterialOpts = {}) {
  const t = new MeshLambertMaterial({
      color: 16777215,
      side: i.side ?? DoubleSide,
      // Dithered materials opt OUT of three's fog chunk and do their own.
      // fog_fragment runs after opaque_fragment, so it would mix paper into
      // an output that has already been forced to two values — the wash that
      // put a third, fourth and fiftieth level onto the 1-bit era. The
      // engraving shader folds the same FogExp2 term into the luminance it
      // thresholds instead, so distance survives as dither density.
      fog: !i.dither,
    }),
    e = new Color(i.stone ?? "#ead4e6");
  return (
    (t.onBeforeCompile = (n) => {
      ((n.uniforms.uHatchFreq = engravingUniforms.uHatchFreq),
        (n.uniforms.uInkCol = { value: engravingUniforms.uInkCol.value }),
        (n.uniforms.uCutting = engravingUniforms.uCutting),
        (n.uniforms.uHatchGain = engravingUniforms.uHatchGain),
        (n.uniforms.uSunDirW = engravingUniforms.uSunDirW),
        (n.uniforms.uSunLum = engravingUniforms.uSunLum),
        (n.uniforms.uAmbSky = engravingUniforms.uAmbSky),
        (n.uniforms.uAmbGround = engravingUniforms.uAmbGround),
        (n.uniforms.uStoneCol = { value: e }),
        (n.uniforms.uJointAlpha = { value: i.jointAlpha ?? 0.34 }),
        (n.uniforms.uCourseH = { value: i.courseH ?? 1.02 }),
        (n.uniforms.uDebugView = engravingUniforms.uDebugView),
        (n.uniforms.uLocalGain = { value: i.gain ?? 1 }),
        (n.uniforms.uDither = { value: i.dither ? 1 : 0 }),
        (n.uniforms.uCarvable = { value: i.carvable ? 1 : 0 }),
        (n.uniforms.uPxScale = engravingUniforms.uPxScale),
        (n.uniforms.uBlueNoise = engravingUniforms.uBlueNoise),
        (n.uniforms.uDistrictPos = districtUniforms.uDistrictPos),
        (n.uniforms.uDistrictCol = districtUniforms.uDistrictCol),
        // The atmosphere the 1-bit branch folds into the luminance it
        // thresholds. BOUND BY REFERENCE, not copied: J0's resize and its
        // night/chronicle/paper setters write these shared objects, and a
        // copy would freeze every dithered surface at its start-up values.
        //
        // Leaving them unbound is not a soft failure. An unbound uniform
        // reads as zero, and `gl_FragCoord.xy / uResE` then divides by zero —
        // the vignette term goes NaN, the thresholded luminance goes with it,
        // and every dithered material comes out solid ink. That is what a
        // missing line here looks like from the outside: black walls with the
        // post pass's outlines still drawn over them.
        (n.uniforms.uFogDens = engravingUniforms.uFogDens),
        (n.uniforms.uPaperLum = engravingUniforms.uPaperLum),
        (n.uniforms.uNightAmt = engravingUniforms.uNightAmt),
        (n.uniforms.uVigAmt = engravingUniforms.uVigAmt),
        (n.uniforms.uChronAmt = engravingUniforms.uChronAmt),
        (n.uniforms.uResE = engravingUniforms.uResE),
        (n.vertexShader = n.vertexShader
          .replace(
            "#include <common>",
            `#include <common>
attribute vec2 aTone;
varying vec3 vWorldPosE;
varying vec3 vWorldNormalE;
varying vec2 vToneE;`,
          )
          .replace("#include <fog_vertex>", Q0)),
        (n.fragmentShader = n.fragmentShader
          .replace(
            "#include <common>",
            `#include <common>
` + t_,
          )
          .replace("#include <opaque_fragment>", e_)));
    }),
    (t.customProgramCacheKey = () =>
      `engraved|${i.stone ?? ""}|${i.jointAlpha ?? 0.34}|${i.courseH ?? 1.02}|${i.gain ?? 1}|${i.dither ? 1 : 0}|${i.carvable ? 1 : 0}`),
    t
  );
}
/**
 * The material palette — every surface family in the world, built once.
 *
 * stone / stoneOld  end-of-humanity fabric vs first-era concrete
 * rock / salvage / plaster / green / fabric
 * distant           the megastructure skyline
 * rust / verdigris / toxic   the later palette families
 * gold / window / figure / ghost / ghostBad / water
 *
 * `ghost` and `ghostBad` are the placement previews — valid and invalid.
 */
function n_() {
  // style is period: the end-of-humanity fabric (corporate panelling,
  // courseH >= 0.95) renders in the 1984 1-bit dither; the older fabric
  // (board-formed concrete, rock) keeps the c.1750 burin hatching. `salvage`
  // sits between the eras: corporate panel seams (courseH >= 0.95 selects the
  // cladding treatment — sheet dismantled and reused), but hatched, not
  // dithered — old drawing over new material.
  // `distant` is dithered too — the megastructure skyline is the newest
  // thing on the horizon, and the far field going 1-bit doubles as
  // depth arbitration.
  const i = createStoneMaterial({
      stone: "#ead4e6",
      jointAlpha: 0.34,
      courseH: 1.02,
      dither: !0,
    }),
    // same fabric, plus the setting-out scribes: worn by surfaces a CARVE
    // will accept (walls, uncarved giant piers). World.buildStruct swaps
    // this in for their "stone" pieces; a carved giant pier rebuilds with
    // plain stone and stops reading as carvable.
    stoneCarve = createStoneMaterial({
      stone: "#ead4e6",
      jointAlpha: 0.34,
      courseH: 1.02,
      dither: !0,
      carvable: !0,
    }),
    t = createStoneMaterial({
      stone: "#ddc2de",
      jointAlpha: 0.42,
      courseH: 0.88,
    }),
    e = createStoneMaterial({
      stone: "#cdb9d8",
      jointAlpha: 0.4,
      courseH: 2.3,
    }),
    n = createStoneMaterial({
      stone: "#78ccc4",
      jointAlpha: 0.2,
      courseH: 0.96,
    }),
    s = createStoneMaterial({ stone: "#f4e0f0", jointAlpha: 0.07 }),
    r = createStoneMaterial({ stone: "#4fb3a5", jointAlpha: 0 }),
    o = createStoneMaterial({ stone: "#f0619e", jointAlpha: 0 }),
    a = createStoneMaterial({
      stone: "#dcc9e8",
      jointAlpha: 0.1,
      courseH: 1.5,
      gain: 0.34,
      dither: !0,
    }),
    // material families beyond the violet: nameable, placeable, and each
    // holding its own value band so the hues can argue without mud
    rust = createStoneMaterial({
      stone: "#b06a3c",
      jointAlpha: 0.3,
      courseH: 1.1,
    }),
    verdigris = createStoneMaterial({
      stone: "#5fbf9e",
      jointAlpha: 0.24,
      courseH: 0.98,
    }),
    toxic = createStoneMaterial({
      stone: "#b9cf4e",
      jointAlpha: 0.14,
      courseH: 2.5,
    }),
    c = new MeshPhongMaterial({
      color: "#e07ac0",
      emissive: "#6a1d5a",
      specular: "#c0fff6",
      shininess: 70,
      fog: !0,
    }),
    l = new MeshBasicMaterial({ color: "#1c1440", fog: !0 }),
    // near-white base: the citizens' per-instance colours carry the clothing
    // vertexColors is what puts eyes on a citizen. The population is three
    // InstancedMeshes and each instance spends its one colour on clothing, so
    // a dark feature cannot come from instanceColor — it multiplies in
    // underneath instead. Every geometry drawn with this material carries a
    // colour attribute (see O_ in 07-citizens); nothing else uses it.
    h = new MeshLambertMaterial({
      color: "#d8d2e6",
      fog: !0,
      vertexColors: !0,
    }),
    u = new MeshBasicMaterial({
      color: "#35d4e0",
      transparent: !0,
      opacity: 0.42,
      depthWrite: !1,
      fog: !1,
    }),
    d = new MeshBasicMaterial({
      color: "#ff3860",
      transparent: !0,
      opacity: 0.4,
      depthWrite: !1,
      fog: !1,
    }),
    f = new MeshLambertMaterial({
      color: "#8fd8e4",
      fog: !0,
      polygonOffset: !0,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    }),
    // the brazier's coal bed. Deliberately NOT the glow material: glow rolls
    // the neon lottery per 7m cell — pink, mercury, acid — and a fire must
    // never come up cyan. One warm colour, driven by the clock like glow is
    // (see os() in 17-bootstrap), with a slow flicker the neon does not get.
    // the three console game boards' palette — Atari 2600, NES, ZX Spectrum.
    // ONE material for all of it: every hardware hex rides in a `color`
    // attribute on the geometry, the way the citizens' clothing does, so the
    // 2600's eight-step luminance ramp, the NES's two background palettes and
    // the Spectrum's bright pairs together cost one draw call and one stock
    // program. Giving each entry its own createStoneMaterial would have
    // compiled fourteen byte-identical shaders, because `stone` sits in
    // customProgramCacheKey even though it only ever feeds a uniform.
    //
    // No engraving hook, deliberately. All three machines output FLAT
    // quantised colour; running the copperplate hatch over them would fight
    // the exact thing being reproduced. Lambert still puts them inside the
    // city's light, shadow and fog, so a board reads as painted stone at dusk
    // rather than as a hole cut in the picture.
    consoleMat = new MeshLambertMaterial({
      color: "#ffffff",
      fog: !0,
      vertexColors: !0,
    }),
    ember = new MeshBasicMaterial({ color: "#ff9840", fog: !1 });
  ember.toneMapped = !1;
  return (
    // citizens mark themselves in the intermediate target's spare alpha:
    // the figure material writes 0.5 where everything else writes 1.0.
    // The material is opaque and blending is off, so the value changes
    // nothing about how it draws — it simply lands in the RGBA buffer,
    // where the post pass reads it and gives the living things their own
    // outline colour. The post pass always outputs alpha 1.0, so nothing
    // downstream (plate exports included) ever sees the marker.
    (h.onBeforeCompile = (m) => {
      m.fragmentShader = m.fragmentShader.replace(
        "#include <opaque_fragment>",
        `#include <opaque_fragment>
gl_FragColor.a = 0.5;`,
      );
    }),
    (h.customProgramCacheKey = () => "figureAlphaMark"),
    (f.onBeforeCompile = (m) => {
      ((m.uniforms.uTime = Aa),
        (m.vertexShader = m.vertexShader
          .replace(
            "#include <common>",
            `#include <common>
varying vec3 vWpW;`,
          )
          .replace(
            "#include <fog_vertex>",
            `#include <fog_vertex>
vWpW = (modelMatrix * vec4(transformed,1.0)).xyz;`,
          )),
        (m.fragmentShader = m.fragmentShader
          .replace(
            "#include <common>",
            `#include <common>
uniform float uTime;
varying vec3 vWpW;
float wHash(vec2 p){ p=fract(p*vec2(234.34,435.345)); p+=dot(p,p+34.23); return fract(p.x*p.y); }
float wNoise(vec2 p){ vec2 i=floor(p),f=fract(p); vec2 u=f*f*(3.0-2.0*f);
  float a=wHash(i),b=wHash(i+vec2(1,0)),c=wHash(i+vec2(0,1)),d=wHash(i+vec2(1,1));
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y); }`,
          )
          .replace(
            "#include <opaque_fragment>",
            `{
  float flow = wNoise(vWpW.xz * 0.5 + vec2(uTime * 0.05, uTime * 0.02));
  float streak = sin((vWpW.x + vWpW.z) * 1.2 + flow * 2.2 + uTime * 0.11);
  float lines = smoothstep(0.86, 0.99, streak) * 0.05;
  vec3 col = outgoingLight * (1.0 - lines);
  gl_FragColor = vec4(col, diffuseColor.a);
}`,
          )));
    }),
    {
      stone: i,
      stoneCarve,
      stoneOld: t,
      rock: e,
      salvage: n,
      plaster: s,
      green: r,
      fabric: o,
      distant: a,
      rust,
      verdigris,
      toxic,
      gold: c,
      window: l,
      figure: h,
      ghost: u,
      ghostBad: d,
      water: f,
      ember,
      console: consoleMat,
    }
  );
}
const Aa = { value: 0 };
/**
 * The neon glow material.
 *
 * Not one pink and one cyan: every ~7m cell of glow geometry hashes itself a
 * lamp family (pink, cyan, sodium, mercury, halogen, acid green, magenta),
 * then leans toward its district's signature colour. A second hash decides
 * which signs are FAILING — flickering per tick, half-lit, or collapsed to
 * magenta because a channel died.
 *
 * Because the variation is a hash of world position, it costs no extra draw
 * calls, no per-instance attributes, and is stable across frames and reloads.
 */
function i_() {
  // neon is no longer one pink and one cyan. Every ~7m cell of glow
  // geometry hashes itself a lamp family — pink, cyan, sodium orange,
  // mercury blue-green, halogen white, acid green, magenta — then the
  // district palette pulls it toward the quarter's signature. A second
  // hash decides which signs are failing: flickering, half-lit, or
  // collapsed to magenta because a channel died. The base material
  // colour (driven by time of day) survives as pure intensity.
  const i = new MeshBasicMaterial({ color: "#ffa8e0", fog: !1 });
  return (
    (i.toneMapped = !1),
    (i.onBeforeCompile = (t) => {
      ((t.uniforms.uTimeG = Aa),
        (t.uniforms.uDistrictPos = districtUniforms.uDistrictPos),
        (t.uniforms.uDistrictCol = districtUniforms.uDistrictCol),
        (t.vertexShader = t.vertexShader
          .replace(
            "#include <common>",
            `#include <common>
varying vec3 vWpG;`,
          )
          .replace(
            "#include <fog_vertex>",
            `#include <fog_vertex>
vWpG = (modelMatrix * vec4(transformed,1.0)).xyz;`,
          )),
        (t.fragmentShader = t.fragmentShader
          .replace(
            "#include <common>",
            `#include <common>
uniform float uTimeG;
uniform vec3 uDistrictPos[8];
uniform vec3 uDistrictCol[8];
varying vec3 vWpG;
float gHash(vec2 p){ p=fract(p*vec2(234.34,435.345)); p+=dot(p,p+34.23); return fract(p.x*p.y); }`,
          )
          .replace(
            "#include <opaque_fragment>",
            `{
  vec3 cell = floor(vWpG / 7.0);
  float h1 = gHash(cell.xz + cell.y * 7.31);
  float h2 = gHash(cell.zx * 1.73 + cell.y * 3.7 + 11.0);
  vec3 hue =
    h1 < 0.22 ? vec3(1.05, 0.30, 0.76) :   // neon pink
    h1 < 0.42 ? vec3(0.26, 0.95, 1.05) :   // neon cyan
    h1 < 0.56 ? vec3(1.10, 0.60, 0.16) :   // sodium vapour
    h1 < 0.68 ? vec3(0.44, 1.02, 0.80) :   // mercury vapour
    h1 < 0.78 ? vec3(1.02, 1.00, 0.94) :   // halogen white
    h1 < 0.90 ? vec3(0.64, 1.05, 0.28) :   // acid green
                vec3(1.05, 0.26, 1.05);    // magenta
  // failing filaments
  float lit = 1.0;
  if (h2 < 0.10) {
    // flicker: random per tick, mostly on, sometimes gone
    float fl = gHash(vec2(floor(uTimeG * 13.0), h1 * 97.0));
    lit = fl < 0.62 ? 1.0 : 0.12;
  } else if (h2 < 0.19) {
    lit = 0.34;                            // half-lit, limping
  } else if (h2 < 0.27) {
    hue = vec3(1.02, 0.22, 0.92);          // a channel died: stuck magenta
  }
  // the quarter's signature leans on its lamps
  vec3 dAcc = vec3(0.0); float dW = 0.0;
  for (int dk = 0; dk < 8; dk++) {
    float dRad = uDistrictPos[dk].z;
    if (dRad > 1.0) {
      float w = 1.0 - smoothstep(dRad * 0.55, dRad, distance(vWpG.xz, uDistrictPos[dk].xy));
      dAcc += uDistrictCol[dk] * w; dW += w;
    }
  }
  if (dW > 0.001) hue = mix(hue, (dAcc / dW) * 1.35, min(dW, 1.0) * 0.45);
  float inten = max(outgoingLight.r, max(outgoingLight.g, outgoingLight.b));
  gl_FragColor = vec4(hue * inten * lit, diffuseColor.a);
}`,
          )));
    }),
    i
  );
}
/**
 * Deterministic PRNG from a 32-bit seed. Returns a function producing [0, 1).
 *
 * This is the backbone of save replay. Every mesh builder seeds from the
 * action id (`seededRng(id * 7919 + k)`), so replaying the action log rebuilds
 * a byte-identical city. Nothing that renders persisted state may use
 * Math.random().
 */
function seededRng(i) {
  let t = i >>> 0;
  return function () {
    ((t |= 0), (t = (t + 1831565813) | 0));
    let e = Math.imul(t ^ (t >>> 15), 1 | t);
    return (
      (e = (e + Math.imul(e ^ (e >>> 7), 61 | e)) ^ e),
      ((e ^ (e >>> 14)) >>> 0) / 4294967296
    );
  };
}
/** 3D integer hash -> [0, 1). The value-noise lattice sampler. */
function fr(i, t, e = 0) {
  let n =
    (Math.imul(i, 374761393) +
      Math.imul(t, 668265263) +
      Math.imul(e, 2246822519)) |
    0;
  return (
    (n = Math.imul(n ^ (n >>> 13), 1274126177)),
    ((n ^ (n >>> 16)) >>> 0) / 4294967296
  );
}
/** FNV-1a over a string -> uint32. Used to seed PRNGs from stable keys. */
function hashString(i) {
  let t = 2166136261;
  for (let e = 0; e < i.length; e++)
    ((t ^= i.charCodeAt(e)), (t = Math.imul(t, 16777619)));
  return t >>> 0;
}
/** Smoothstep easing curve, 3t^2 - 2t^3. */
function Al(i) {
  return i * i * (3 - 2 * i);
}
/** 2D value noise: bilinear blend of four hashed lattice corners, smoothstepped. */
function s_(i, t, e = 0) {
  const n = Math.floor(i),
    s = Math.floor(t),
    r = i - n,
    o = t - s,
    a = fr(n, s, e),
    c = fr(n + 1, s, e),
    l = fr(n, s + 1, e),
    h = fr(n + 1, s + 1, e),
    u = Al(r),
    d = Al(o);
  return a + (c - a) * u + (l - a) * d + (a - c - l + h) * u * d;
}
/**
 * Fractal brownian motion — `e` octaves of value noise, each half the
 * amplitude and ~twice the frequency. The 2.02 lacunarity rather than exactly
 * 2 keeps octaves from aligning into visible grid artefacts.
 */
function Sr(i, t, e = 4, n = 0) {
  let s = 0.5,
    r = 1,
    o = 0,
    a = 0;
  for (let c = 0; c < e; c++)
    ((o += s * s_(i * r, t * r, n + c * 101)),
      (a += s),
      (s *= 0.5),
      (r *= 2.02));
  return o / a;
}
const clamp = (i, t, e) => Math.max(t, Math.min(e, i)),
  lerp = (i, t, e) => i + (t - i) * e,
  Nn = (i, t, e) => {
    const n = clamp((e - i) / (t - i), 0, 1);
    return n * n * (3 - 2 * n);
  };
/** Pick a random element of `t` using seeded generator `i`. */
function r_(i, t) {
  return t[Math.floor(i() * t.length) % t.length];
}
const br = 20260726,
  o_ = 60,
  a_ = 21,
  Dr = 20,
  Lr = 26,
  Ca = -26;
/** The canyon's centreline x at depth `t` — a slow sine, so it meanders. */
function c_(i) {
  return o_ + Math.sin(i * 0.011) * 7;
}
/**
 * The landform, before terracing. Layered features, each blended in:
 *
 *   1. base fBm, +/-2.75 units of gentle roll
 *   2. the city plain — flattened almost to zero in the middle, so there is
 *      somewhere buildable
 *   3. a plateau to the north (`Dr`), and a shelf raised inside it
 *   4. a mesa to the east (`Lr`), with a rounded summit
 *   5. THE CANYON — carved along the meandering centreline from `c_`, with a
 *      noisy width, dropping to `Ca`. The pow(f, 1.25) makes its walls steep
 *      rather than a smooth valley.
 *
 * All noise is seeded from `br` (a fixed constant), so the world is the same
 * for every player.
 */
function rawTerrainHeight(i, t) {
  let e = (Sr(i * 0.012, t * 0.012, 4, br) - 0.5) * 5.5;
  const n = Math.max(Math.abs(i + 25) / 95, Math.abs(t - 20) / 85),
    s = 1 - Nn(0.72, 1.15, n);
  e = lerp(e, 0, s * 0.92);
  const r = Nn(-43, -56, t);
  e += Dr * r;
  const o = Math.max(Math.abs(i + 30) / 85, Math.abs(t + 95) / 48),
    a = (1 - Nn(0.7, 1.1, o)) * r;
  e = lerp(e, Dr, a * 0.85);
  const c = Nn(84, 102, i);
  ((e += Lr * c), (e += 9 * Nn(128, 160, i)));
  const l = Math.hypot((i - 126) / 34, (t + 6) / 30);
  e = lerp(e, Lr + 3.5, (1 - Nn(0.7, 1.05, l)) * c * 0.9);
  const h = c_(t),
    u = Math.abs(i - h),
    d = a_ + Sr(t * 0.03, 7.7, 3, br + 5) * 6,
    f = 1 - Nn(d * 0.45, d, u),
    m = Ca + (Sr(t * 0.02, 3.3, 3, br + 9) - 0.5) * 4 + t * 0.012;
  return ((e = lerp(e, m, Math.pow(f, 1.25))), e);
}
/**
 * The playable terrain height: `rawTerrainHeight` TERRACED into 2.3-unit steps.
 *
 * The smoothstep across each step boundary rounds the edge slightly, and the
 * result is blended 88% toward the terraced value rather than 100% — so the
 * steps read as strata with a little slump rather than as a staircase.
 *
 * This is the single function most responsible for the Piranesi silhouette,
 * and it is why flat buildable ledges exist at all.
 */
function terrainHeightAt(i, t) {
  const e = rawTerrainHeight(i, t),
    n = TERRACE_H,
    s = e / n,
    r = Math.floor(s),
    o = s - r,
    a = Nn(0.47, 0.53, o),
    c = (r + a) * n;
  return lerp(e, c, 0.88);
}
/** Surface normal by central difference, sampling +/- `e` on both axes. */
function terrainNormalAt(i, t, e = 0.9) {
  const n = terrainHeightAt(i - e, t),
    s = terrainHeightAt(i + e, t),
    r = terrainHeightAt(i, t - e),
    o = terrainHeightAt(i, t + e);
  return new Vector3(n - s, 2 * e, r - o).normalize();
}
/** Slope as 1 - normal.y: 0 is flat, 1 is vertical. */
function terrainSlopeAt(i, t) {
  return 1 - terrainNormalAt(i, t).y;
}
/**
 * Is this walkable/buildable? Slope under 0.22.
 *
 * Used by `NavGraph.seedTerrain` to decide where ground nodes go, so this one
 * threshold determines the whole reachable extent of the map.
 */
function isFlatGround(i, t) {
  return terrainSlopeAt(i, t) < 0.22;
}
const d_ = 300;
/**
 * The terrain mesh: a 600x600 plane at 520x520 segments, displaced by
 * `terrainHeightAt`.
 *
 * ~271k vertices, built once. It is the largest single mesh in the scene and
 * the reason the triangle count sits around 580k.
 */
function f_() {
  const t = d_ * 2,
    e = new PlaneGeometry(t, t, 520, 520);
  e.rotateX(-Math.PI / 2);
  const n = e.attributes.position;
  for (let r = 0; r < n.count; r++) {
    const o = n.getX(r),
      a = n.getZ(r);
    n.setY(r, terrainHeightAt(o, a));
  }
  e.computeVertexNormals();
  const s = new Float32Array(n.count * 2);
  for (let r = 0; r < n.count; r++) {
    const o = n.getX(r),
      a = n.getZ(r),
      c = n.getY(r);
    let l = 1;
    (c < -4 && (l = clamp(1 + (c + 4) * 0.012, 0.72, 1)),
      (s[r * 2] = l),
      (s[r * 2 + 1] = 0.35 + Sr(o * 0.05, a * 0.05, 2, br + 21) * 0.3));
  }
  return (e.setAttribute("aTone", new BufferAttribute(s, 2)), e);
}
const Vr = {
    townPlaza: new Vector3(-18, 0, 26),
    hallSite: new Vector3(-34, 0, -16),
    terraceCenter: new Vector3(-28, Dr, -86),
    terraceEdge: new Vector3(-6, Dr, -62),
    springPool: new Vector3(126, Lr + 3.5, -6),
    massifRim: new Vector3(92, Lr, -10),
  },
  $n = 7;

// --- generated exports ---
export {
  $n,
  Aa,
  Al,
  Ca,
  Dr,
  Nn,
  Vr,
  br,
  clamp,
  f_,
  fr,
  hashString,
  i_,
  isFlatGround,
  lerp,
  n_,
  r_,
  seededRng,
  terrainHeightAt,
};
