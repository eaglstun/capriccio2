// Engraving GLSL — post pass, hatching, masonry, sky, ink, paper
//
// Extracted from legacy/assets/index-DCXbw2vV.js, bundle lines
// 25401–25917. Statements are verbatim; identifiers are
// renamed via src/renames.json. Imports and exports are generated.
// Regenerate: python3 tools/split_bundle.py --write

// --- generated imports ---
import {
  Color,
  DataTexture,
  DepthTexture,
  FloatType,
  LinearFilter,
  Matrix4,
  Mesh,
  NearestFilter,
  NoToneMapping,
  OrthographicCamera,
  PCFShadowMap,
  PlaneGeometry,
  RedFormat,
  RepeatWrapping,
  SRGBColorSpace,
  Scene,
  ShaderMaterial,
  UnsignedIntType,
  Vector2,
  Vector3,
  WebGLRenderTarget,
  WebGLRenderer,
} from "three";
// --- end generated imports ---

const j0 = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;
/**
 * The full-screen post-pass fragment shader, assembled as a string.
 *
 * Runs after the scene renders to an offscreen target and does the work that
 * belongs to the SHEET rather than the stone — see docs/RENDERING.md for why
 * the look is split across two frames of reference.
 *
 * In order: the VHS tracking band (displacement plus RGB channel separation),
 * the hatched sky, depth- and normal-edge ink outlines, neon bloom, graded
 * smog haze, CRT scanlines, paper grain and vignette.
 *
 * Two things it reads that are not colour: the depth texture, for edges and
 * haze, and the ALPHA of the colour target — which every material writes as
 * 1.0 except `figure`, so citizens get their own warm outline. That channel is
 * otherwise unused; see FEATURES.md A7.
 */
function $0() {
  return `
precision highp float;
varying vec2 vUv;

uniform sampler2D tDiffuse;
uniform sampler2D tDepth;
uniform vec2 uResolution;
uniform float uCameraNear;
uniform float uCameraFar;
uniform mat4 uInvProjection;
uniform mat4 uCameraWorld;
uniform vec3 uSunDir;
uniform float uFogDensity;
uniform vec3 uPaper;
uniform vec3 uInk;
uniform float uDusk;
uniform float uDawn;
uniform float uNight;
uniform float uVignette;
uniform float uGrain;
uniform float uLineWeight;
uniform float uTime;
uniform float uChronicle;

float readDepth(vec2 uv) { return texture2D(tDepth, uv).x; }

vec3 viewPos(vec2 uv, float depth) {
  vec4 ndc = vec4(uv * 2.0 - 1.0, depth * 2.0 - 1.0, 1.0);
  vec4 v = uInvProjection * ndc;
  return v.xyz / v.w;
}

float linDepth(float d) {
  float z = d * 2.0 - 1.0;
  return (2.0 * uCameraNear * uCameraFar) / (uCameraFar + uCameraNear - z * (uCameraFar - uCameraNear));
}

float hash21(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

void main() {
  vec2 px = 1.0 / uResolution;

  // VHS tracking: a slow-rolling displacement bar, latent most of the time
  float trackPos = fract(vUv.y + uTime * 0.023);
  float bar = smoothstep(0.0, 0.03, trackPos) * (1.0 - smoothstep(0.03, 0.10, trackPos));
  // in the Chronicle the tape drops a generation: the tracking band's gate
  // opens more often, so the fault the look already owns simply worsens
  float gate = smoothstep(0.58 - uChronicle * 0.24, 0.74 - uChronicle * 0.24,
                          vnoise(vec2(uTime * 0.19, 4.7)));
  float jag = hash21(vec2(floor(vUv.y * 140.0), floor(uTime * 11.0))) - 0.5;
  float tear = bar * gate;
  vec2 suv = vUv + vec2(tear * (0.006 + 0.012 * jag), 0.0);

  float depthC = readDepth(suv);
  vec3 color = texture2D(tDiffuse, suv).rgb;

  // ============ RGB SEPARATION ============
  // inside the tracking bar the signal drops a generation: a tracking
  // error is a TIMING fault, so luma and chroma drift out of alignment
  // and the channels smear apart. R and B pull opposite ways; G nudges
  // back the other way with a small vertical kick, because tracking is a
  // line-sync fault. jag (the per-scanline hash) makes the tear ragged
  // line to line rather than a clean smear. Hard edges on purpose —
  // collage, not crossfade. Samples the displaced suv so separation and
  // displacement agree, and clamps the coords so a large offset does not
  // smear the frame edge across the border.
  float band = step(trackPos, 0.085) * step(0.62, gate);
  if (band > 0.5) {
    float rag = 1.0 + 1.5 * jag;                    // 0.25 .. 1.75
    vec2 clo = px, chi = 1.0 - px;
    color.r = texture2D(tDiffuse, clamp(suv + vec2(px.x *  22.0, 0.0) * rag, clo, chi)).r;
    color.g = texture2D(tDiffuse, clamp(suv + vec2(px.x *  -8.0, px.y * 4.0) * rag, clo, chi)).g;
    color.b = texture2D(tDiffuse, clamp(suv + vec2(px.x * -16.0, 0.0) * rag, clo, chi)).b;
  }

  bool skyC = depthC >= 0.999999;
  float distC = linDepth(depthC);

  vec4 ndcDir = vec4(suv * 2.0 - 1.0, 1.0, 1.0);
  vec4 vDir = uInvProjection * ndcDir;
  vec3 worldDir = normalize((uCameraWorld * vec4(vDir.xyz / vDir.w, 0.0)).xyz);

  // ============ SKY ============
  if (skyC) {
    float elev = worldDir.y;
    // perpetual-sunset gradient: warm horizon through magenta to violet zenith
    vec3 horizonCol = vec3(1.00, 0.64, 0.46);
    vec3 midCol     = vec3(0.93, 0.44, 0.72);
    vec3 zenithCol  = vec3(0.30, 0.21, 0.50);
    vec3 sky = mix(horizonCol, midCol, smoothstep(-0.04, 0.30, elev));
    sky = mix(sky, zenithCol, smoothstep(0.18, 0.75, elev));
    // cool blue-grey morning: the gradient chills before the day bleaches it
    vec3 dawnSky = mix(vec3(0.74, 0.79, 0.88), vec3(0.27, 0.31, 0.47),
                       smoothstep(-0.02, 0.62, elev));
    sky = mix(sky, dawnSky, uDawn * 0.85);
    // by day the gradient relaxes toward the paper; dusk saturates it
    sky = mix(sky, uPaper, (1.0 - max(uDusk, uDawn)) * 0.42);
    float sunDot = dot(worldDir, uSunDir);
    float sunAmt = pow(max(sunDot, 0.0), 18.0);
    // faint horizontal burin lines, denser toward horizon, broken by cloudy noise
    float band = 1.0 - smoothstep(0.02, 0.38, elev);
    float cloud = vnoise(worldDir.xz / max(0.12, abs(worldDir.y)) * 0.35 + vec2(3.7, 9.1));
    cloud = smoothstep(0.35, 0.75, cloud);
    float lineY = sin(vUv.y * uResolution.y * 0.9);
    float lines = smoothstep(0.55, 1.0, lineY * lineY);
    float skyInk = band * cloud * lines * 0.075 * (1.0 - sunAmt * 0.9);
    sky = mix(sky, zenithCol * 0.8, skyInk * 1.3);
    // the banded low sun: gaps widen below its centre, vaporwave-style
    float rel = uSunDir.y - elev;
    float gapW = clamp(rel * 3.2, 0.0, 0.44);
    float stripes = smoothstep(gapW, gapW + 0.07, fract(elev * 30.0));
    float disc = smoothstep(0.9880, 0.9903, sunDot) * stripes;
    vec3 sunCol = mix(vec3(1.00, 0.42, 0.76), vec3(1.00, 0.92, 0.70),
                      smoothstep(0.9903, 0.9968, sunDot));
    // dusk drives the sun violent orange; dawn pales it to chalk
    sunCol = mix(sunCol, vec3(1.04, 0.55, 0.22), uDusk * (1.0 - smoothstep(0.20, 0.40, uSunDir.y)));
    sunCol = mix(sunCol, vec3(0.96, 0.98, 1.02), uDawn * 0.75);
    sky = mix(sky, sunCol, disc);
    vec3 glowCol = mix(vec3(1.0, 0.36, 0.62), vec3(1.05, 0.44, 0.16), uDusk);
    glowCol = mix(glowCol, vec3(0.80, 0.86, 0.96), uDawn * 0.8);
    sky += glowCol * sunAmt * (0.30 + 0.22 * uDusk) * (1.0 - disc);
    // smog strata pooled against the horizon, dirtier than any weather
    float smogT = 1.0 - smoothstep(-0.02, 0.15, elev);
    float smogN = vnoise(vec2(worldDir.x * 2.6 + 11.0, elev * 70.0));
    sky = mix(sky, vec3(0.44, 0.27, 0.38), smogT * (0.30 + 0.28 * smoothstep(0.35, 0.8, smogN)));
    // night: the gradient dies to a cold near-black violet. Everything after
    // this line is hardware — the ring, the satellites, the shafts — and it
    // stays lit; the sky goes out, the machines above it do not.
    vec3 nightSky = mix(vec3(0.11, 0.06, 0.19), vec3(0.015, 0.015, 0.06),
                        smoothstep(-0.02, 0.55, elev));
    sky = mix(sky, nightSky, uNight);
    // the orbital ring: still up there, in pieces
    vec3 ringN = normalize(vec3(0.55, 0.62, -0.42));
    float ringD = dot(worldDir, ringN);
    float ringW = fwidth(ringD) * 1.5 + 0.0018;
    float ringA = 1.0 - smoothstep(ringW, ringW * 3.2, abs(ringD));
    ringA *= smoothstep(0.06, 0.16, elev)
           * (0.35 + 0.65 * smoothstep(0.30, 0.62, vnoise(worldDir.xz * 17.0 + 5.0)));
    sky = mix(sky, vec3(0.97, 0.88, 1.02), ringA * 0.4);
    // satellites: slow points on fixed tracks, perfectly straight — too
    // high and too steady to be birds. Some tumble and flare as a dead
    // panel catches the sun; the derelict ones have gone amber. They are
    // still transmitting; the billboards below are still advertising.
    for (int sk = 0; sk < 9; sk++) {
      float fk = float(sk);
      float sh1 = hash21(vec2(fk * 3.71, 9.23));
      float sh2 = hash21(vec2(fk * 5.13, 2.81));
      vec3 sax = normalize(vec3(sh1 - 0.5, 0.55 + sh2 * 0.45, sh2 - 0.5));
      vec3 su = normalize(cross(sax, vec3(0.0, 1.0, 0.0)));
      vec3 sv = cross(sax, su);
      float sth = uTime * (0.011 + sh2 * 0.013) + sh1 * 40.0;
      vec3 sd = cos(sth) * su + sin(sth) * sv;
      if (sd.y > 0.10) {
        float sdd = dot(worldDir, sd);
        float sw = fwidth(sdd) + 6.0e-6;
        float sdisc = smoothstep(1.0 - sw * 8.0, 1.0 - sw * 2.5, sdd);
        float tumbling = step(0.5, sh2);
        float flare = tumbling * pow(max(sin(uTime * (0.5 + sh1 * 0.8) + fk * 2.1), 0.0), 30.0) * 1.4;
        float derelict = step(0.78, sh1);
        vec3 scol = mix(vec3(1.02, 1.03, 1.10), vec3(0.92, 0.58, 0.34), derelict);
        float samp2 = mix(0.95, 0.40, derelict) * (0.65 + 0.35 * uDusk) + flare;
        // a faint ink ring so the point reads on the pale sheet
        float sring = smoothstep(1.0 - sw * 22.0, 1.0 - sw * 9.0, sdd) * (1.0 - sdisc);
        sky = mix(sky, vec3(0.24, 0.16, 0.36), sring * 0.45 * clamp(samp2 + 0.25, 0.0, 1.0));
        sky = mix(sky, scol * (0.95 + flare * 0.5), sdisc * clamp(samp2, 0.0, 1.0));
      }
    }
    // vertical light shafts rising off the megastructure line
    float az = atan(worldDir.x, worldDir.z);
    float azc = floor(az * 5.093 + 16.0);
    float shR = hash21(vec2(azc, 17.0));
    float shD = abs(fract(az * 5.093 + 16.0) - 0.5);
    float shaft = (1.0 - smoothstep(0.015, 0.075, shD)) * step(0.74, shR);
    shaft *= (1.0 - smoothstep(0.02, 0.40, elev)) * smoothstep(-0.03, 0.02, elev);
    vec3 shaftCol = mix(vec3(0.45, 0.95, 1.0), vec3(1.0, 0.45, 0.85), step(0.5, hash21(vec2(azc, 3.0))));
    sky += shaftCol * shaft * (0.10 + 0.24 * uDusk);
    // dusk warms and darkens the paper sky hard near the sun's side —
    // the violent-orange hour before the artificial lights take over
    vec3 duskTint = mix(vec3(1.0), vec3(1.09, 0.76, 0.58), uDusk * (0.35 + 0.65 * sunAmt) * (1.0 - uNight));
    sky = sky * duskTint;
    sky *= 1.0 - uDusk * 0.22 * (1.0 - sunAmt) * (1.0 - uNight);
    color = sky;
  } else {
    // ============ INK OUTLINES ============
    float r = uLineWeight;                       // kernel radius in pixels
    vec2 o1 = vec2(px.x, 0.0) * r;
    vec2 o2 = vec2(0.0, px.y) * r;

    float dR = linDepth(readDepth(suv + o1));
    float dL = linDepth(readDepth(suv - o1));
    float dU = linDepth(readDepth(suv + o2));
    float dD = linDepth(readDepth(suv - o2));

    // depth edge, scaled by distance so far geometry doesn't light up everywhere
    float dEdge = abs(dR - dL) + abs(dU - dD);
    float depthThresh = 0.02 * distC + 0.045;
    float depthEdge = smoothstep(depthThresh, depthThresh * 2.0, dEdge);

    // normal edge from reconstructed positions (creases, arch intrados)
    vec3 pC = viewPos(suv, depthC);
    float ddRc = readDepth(suv + o1); float ddLc = readDepth(suv - o1);
    float ddUc = readDepth(suv + o2); float ddDc = readDepth(suv - o2);
    vec3 pR = viewPos(suv + o1, ddRc);
    vec3 pL = viewPos(suv - o1, ddLc);
    vec3 pU = viewPos(suv + o2, ddUc);
    vec3 pD = viewPos(suv - o2, ddDc);
    vec3 dx = (abs(linDepth(ddRc) - distC) < abs(distC - linDepth(ddLc))) ? (pR - pC) : (pC - pL);
    vec3 dy = (abs(linDepth(ddUc) - distC) < abs(distC - linDepth(ddDc))) ? (pU - pC) : (pC - pD);
    vec3 nC = normalize(cross(dx, dy));

    vec3 nR = normalize(cross(pR - pC, dy));
    vec3 nU = normalize(cross(dx, pU - pC));
    float nEdge = max(1.0 - abs(dot(nC, nR)), 1.0 - abs(dot(nC, nU)));
    float normalEdge = smoothstep(0.16, 0.45, nEdge) * 0.9;

    float edge = max(depthEdge, normalEdge);

    // ---- soften the line: a wider, fainter ring around it -------------
    // A silhouette is a STEP in depth, so the smoothsteps above never get to
    // feather it — a pixel either straddles the discontinuity or it does not,
    // and the line lands hard-edged at full strength. Widening those two
    // ramps cannot fix that: two pixels out from the boundary both taps sit
    // on the same surface, the gradient is zero, and there is nothing to
    // ramp. Spreading the line needs WIDER TAPS; there is no free version.
    //
    // So the depth edge is run a second time at a larger radius and folded in
    // at reduced strength. Each line keeps its core and gains a band of
    // half-lit pixels either side — a glow rather than true antialiasing,
    // which is the cheaper of the two the brief allowed.
    //
    // COST, stated honestly: four more depth taps, which DOUBLES the four
    // distinct ones this block already samples. (It writes eight, but they
    // are the same four coordinates twice over and any compiler folds them.)
    // Still no second target, no blur pass and no extra draw, and still much
    // cheaper than the alternative: really antialiasing the line means
    // raising the supersample factor past 1.4, which costs the square of
    // whatever it goes to across the WHOLE frame, on top of a pixel ratio
    // already capped at 1.75 — the frame is drawn at up to 2.45x scale as it
    // is. (No backticks in here: this whole shader is a template literal.)
    //
    // GLOW_LEVEL 0.0 removes it entirely and lets the compiler drop the four
    // fetches with it. Raise GLOW_SPREAD for a wider, weaker halo.
    const float GLOW_LEVEL = 0.45;
    const float GLOW_SPREAD = 2.4;
    vec2 g1 = o1 * GLOW_SPREAD;
    vec2 g2 = o2 * GLOW_SPREAD;
    float gEdge = abs(linDepth(readDepth(suv + g1)) - linDepth(readDepth(suv - g1)))
                + abs(linDepth(readDepth(suv + g2)) - linDepth(readDepth(suv - g2)));
    // same threshold as the core, so the halo tracks it with distance instead
    // of blooming out of the far city where the lines are meant to be dying
    edge = max(edge, smoothstep(depthThresh, depthThresh * 2.0, gEdge) * GLOW_LEVEL);

    // ============ CITIZEN MASK ============
    // the figure material writes a marker alpha (0.5) into the otherwise
    // unused alpha channel of the RGBA intermediate; every other material
    // lands 1.0. LinearFilter interpolates it across exactly the edges the
    // outline lives on, so test a band, not equality — and take the min
    // over the same kernel the edges use, so the whole silhouette line
    // reads as the citizen's, not just its inner half.
    float aMin = min(texture2D(tDiffuse, suv).a, min(
      min(texture2D(tDiffuse, suv + o1).a, texture2D(tDiffuse, suv - o1).a),
      min(texture2D(tDiffuse, suv + o2).a, texture2D(tDiffuse, suv - o2).a)));
    float isFig = (aMin > 0.38 && aMin < 0.66) ? 1.0 : 0.0;

    // distance fade (matched exp2 fog) — lines dissolve into haze
    float fogF = 1.0 - exp(-uFogDensity * uFogDensity * distC * distC);
    edge *= (1.0 - fogF * 0.9);
    // near boost: foreground strokes read heavier
    edge *= mix(1.5, 0.8, smoothstep(8.0, 220.0, distC));

    // neon rim light: hot pink up close, dissolving to cyan haze far off
    vec3 rimCol = mix(uInk, vec3(0.36, 0.94, 1.0), smoothstep(30.0, 180.0, distC));
    // the citizens get their own line: warm amber against the cold neon.
    // The only living things in frame, and the outline says so without UI.
    rimCol = mix(rimCol, vec3(1.05, 0.74, 0.34), isFig);
    color = mix(color, rimCol, clamp(edge, 0.0, 1.0) * 0.92);

    // graded haze: the low city drowns in smog-coloured air
    vec3 wpC = (uCameraWorld * vec4(pC, 1.0)).xyz;
    float lowness = 1.0 - smoothstep(-18.0, 34.0, wpC.y);
    // at night the smog stops glowing — a lit haze would wash the dark out
    color = mix(color, vec3(0.50, 0.32, 0.45), fogF * lowness * 0.42 * (1.0 - uNight * 0.7));
  }

  // ============ NEON BLOOM ============
  // cheap two-ring bright-pass: saturated hot pixels bleed outward
  vec3 bloom = vec3(0.0);
  for (int k = 0; k < 8; k++) {
    float ang = float(k) * 0.785398;
    float rad = mod(float(k), 2.0) < 0.5 ? 3.5 : 8.0;
    vec3 bs = texture2D(tDiffuse, suv + vec2(cos(ang), sin(ang)) * px * rad).rgb;
    float mx = max(max(bs.r, bs.g), bs.b);
    float sat = mx - min(min(bs.r, bs.g), bs.b);
    bloom += bs * (smoothstep(0.60, 0.90, mx) * smoothstep(0.24, 0.52, sat));
  }
  // at night the bloom is most of the light: neon, signs and fires bleed
  // harder into a dark that no longer competes with them
  color += bloom * (0.075 + 0.105 * uNight);

  // ============ PAPER ============
  // tube tooth: static CRT scanlines + a coarse chroma wobble
  float g1 = vnoise(vUv * uResolution * 0.5);
  float g2 = vnoise(vUv * uResolution * 0.11 + 57.0);
  float scan = sin(vUv.y * uResolution.y * 1.5708);
  color *= 1.0 - (scan * 0.5 + 0.5) * 0.085 * uGrain;
  color *= 1.0 + (g1 - 0.5) * 0.030 * uGrain;
  color.r *= 1.0 + (g2 - 0.5) * 0.05 * uGrain;
  color.b *= 1.0 - (g2 - 0.5) * 0.05 * uGrain;

  // slight cool phosphor tint multiply + dusk magenta
  vec3 tint = mix(vec3(1.0, 0.975, 1.015), vec3(1.03, 0.91, 1.04), uDusk);
  tint = mix(tint, vec3(0.90, 0.93, 1.06), uNight * 0.45);
  color *= tint;

  // ============ CHRONICLE ============
  // the replay grade: the past is a copy of a copy. Chroma drains, the
  // blacks lift and the whites dim — a generation lost to tape — and the
  // grain and scanlines climb. Ramped 0..1 by the bootstrap on enter and
  // exit; identically zero in normal play, so this whole block is inert.
  float lumC = dot(color, vec3(0.2126, 0.7152, 0.0722));
  color = mix(color, vec3(lumC), uChronicle * 0.5);
  color = mix(color, color * 0.82 + vec3(0.085, 0.078, 0.10), uChronicle);
  color *= 1.0 + (g1 - 0.5) * 0.12 * uChronicle;
  color *= 1.0 - (scan * 0.5 + 0.5) * 0.06 * uChronicle;

  // vignette — the Chronicle closes it in a touch
  vec2 vc = vUv - 0.5;
  float vig = 1.0 - dot(vc, vc) * (uVignette + uChronicle * 0.42);
  color *= vig;

  gl_FragColor = vec4(color, 1.0);
}
`;
}
// 64x64 blue-noise threshold map, built at load by void-and-cluster
// (Ulichney 1993): seed a sparse random pattern, relax it by swapping the
// tightest cluster into the largest void until stable, then rank every
// pixel by removing clusters (dark end) and filling voids (light end).
// Energy is a toroidally wrapped gaussian, so the texture tiles seamlessly.
// Deterministic seed, zero shipped bytes, ~4096 threshold levels — this is
// what replaces the 16-level Bayer lattice in both dither sites.
/**
 * Generate a 64x64 blue-noise threshold texture by void-and-cluster
 * (Ulichney), at load. Procedural — nothing is shipped or fetched.
 *
 * Blue noise is what makes the 1-bit dither read as clustered and organic
 * rather than as a halftone screen: aperiodic, no visible lattice, and many
 * more threshold levels than the 4x4 Bayer matrix it replaced.
 *
 * Implementation note: past half fill, the canonical phase-3 rule ("break the
 * tightest cluster of zeros") is identical to phase 2's "fill the largest
 * void" on a torus, because zero-energy is a constant minus one-energy. One
 * rule serves both phases.
 */
function makeBlueNoiseTexture(size = 64) {
  const N = size * size,
    s2 = 2 * 1.9 * 1.9,
    lut = new Float32Array(N),
    energy = new Float32Array(N),
    on = new Uint8Array(N),
    rank = new Float32Array(N);
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      const dx = Math.min(x, size - x),
        dy = Math.min(y, size - y);
      lut[y * size + x] = Math.exp(-(dx * dx + dy * dy) / s2);
    }
  const splat = (idx, s) => {
    const ix = idx % size,
      iy = (idx / size) | 0;
    for (let dy = 0; dy < size; dy++) {
      const ry = ((iy + dy) % size) * size,
        ly = dy * size;
      for (let dx = 0; dx < size; dx++)
        energy[ry + ((ix + dx) % size)] += s * lut[ly + dx];
    }
  };
  const tightest = () => {
    let hi = -1,
      hv = -1;
    for (let k = 0; k < N; k++)
      if (on[k] && energy[k] > hv) ((hv = energy[k]), (hi = k));
    return hi;
  };
  const largestVoid = () => {
    let lo = -1,
      lv = 1 / 0;
    for (let k = 0; k < N; k++)
      if (!on[k] && energy[k] < lv) ((lv = energy[k]), (lo = k));
    return lo;
  };
  let st = 20260728,
    count = 0;
  const rnd = () => {
    st = (st + 1831565813) | 0;
    let e = Math.imul(st ^ (st >>> 15), 1 | st);
    e = (e + Math.imul(e ^ (e >>> 7), 61 | e)) ^ e;
    return ((e ^ (e >>> 14)) >>> 0) / 4294967296;
  };
  while (count < N >> 3) {
    const k = (rnd() * N) | 0;
    if (!on[k]) ((on[k] = 1), splat(k, 1), count++);
  }
  for (let it = 0; it < 768; it++) {
    const hi = tightest();
    ((on[hi] = 0), splat(hi, -1));
    const lo = largestVoid();
    ((on[lo] = 1), splat(lo, 1));
    if (lo === hi) break;
  }
  const proto = on.slice();
  for (let c = count; c > 0;) {
    const hi = tightest();
    ((on[hi] = 0), splat(hi, -1), (rank[hi] = --c));
  }
  (on.set(proto), energy.fill(0));
  for (let k = 0; k < N; k++) if (on[k]) splat(k, 1);
  // beyond half-full the roles flip on their own: on a torus the energy of
  // the zeros is a constant minus the energy of the ones, so "fill the
  // largest void" and "break the tightest cluster of zeros" are one rule
  for (let c = count; c < N; c++) {
    const lo = largestVoid();
    ((on[lo] = 1), splat(lo, 1), (rank[lo] = c));
  }
  const data = new Float32Array(N);
  for (let k = 0; k < N; k++) data[k] = (rank[k] + 0.5) / N;
  const tex = new DataTexture(data, size, size, RedFormat, FloatType);
  ((tex.wrapS = RepeatWrapping),
    (tex.wrapT = RepeatWrapping),
    (tex.minFilter = NearestFilter),
    (tex.magFilter = NearestFilter),
    (tex.needsUpdate = !0));
  return tex;
}
const blueNoiseTex = makeBlueNoiseTexture();
/**
 * The renderer wrapper: owns the WebGLRenderer, the offscreen target with its
 * depth texture, and the fullscreen quad that runs the post pass.
 *
 * The target is RGBA with a depth texture attached, because the post pass needs
 * both — depth for edges and haze, alpha as the citizen mask.
 */
class J0 {
  renderer: WebGLRenderer;
  target: WebGLRenderTarget;
  postMat: ShaderMaterial;
  postScene: Scene;
  postCam: OrthographicCamera;
  /** Supersample factor: the target is rendered this much larger than the canvas. */
  ss: number;
  paper = new Color("#e9b8d6");
  ink = new Color("#ff3fae");
  fogDensity = 0.0021;
  w = 4;
  h = 4;
  lastDraws = 0;
  lastTris = 0;

  constructor(t: HTMLElement, e: { supersample?: number } = {}) {
    ((this.ss = e.supersample ?? 1.4),
      (this.renderer = new WebGLRenderer({
        antialias: !1,
        powerPreference: "high-performance",
        stencil: !1,
      })),
      (this.renderer.outputColorSpace = SRGBColorSpace),
      (this.renderer.toneMapping = NoToneMapping),
      (this.renderer.shadowMap.enabled = !0),
      (this.renderer.shadowMap.type = PCFShadowMap),
      this.renderer.setClearColor(this.paper, 1),
      (this.renderer.localClippingEnabled = !0),
      t.appendChild(this.renderer.domElement));
    const n = new DepthTexture(4, 4);
    ((n.type = UnsignedIntType),
      (this.target = new WebGLRenderTarget(4, 4, {
        depthTexture: n,
        depthBuffer: !0,
        minFilter: LinearFilter,
        magFilter: LinearFilter,
        colorSpace: SRGBColorSpace,
      })),
      (this.postMat = new ShaderMaterial({
        vertexShader: j0,
        fragmentShader: $0(),
        uniforms: {
          tDiffuse: { value: this.target.texture },
          tDepth: { value: n },
          uResolution: { value: new Vector2(4, 4) },
          uCameraNear: { value: 0.1 },
          uCameraFar: { value: 1e3 },
          uInvProjection: { value: new Matrix4() },
          uCameraWorld: { value: new Matrix4() },
          uSunDir: { value: new Vector3(0.5, 0.6, 0.3).normalize() },
          uFogDensity: { value: this.fogDensity },
          uPaper: { value: new Color(this.paper) },
          uInk: { value: new Color(this.ink) },
          uDusk: { value: 0 },
          uDawn: { value: 0 },
          uNight: { value: 0 },
          uVignette: { value: 0.58 },
          uGrain: { value: 1 },
          uLineWeight: { value: 1 },
          uTime: { value: 0 },
          uChronicle: { value: 0 },
        },
        depthTest: !1,
        depthWrite: !1,
      })),
      (this.postScene = new Scene()),
      (this.postCam = new OrthographicCamera(-1, 1, 1, -1, 0, 1)));
    const s = new Mesh(new PlaneGeometry(2, 2), this.postMat);
    ((s.frustumCulled = !1),
      this.postScene.add(s),
      this.resize(
        t.clientWidth || window.innerWidth,
        t.clientHeight || window.innerHeight,
      ));
  }
  /** Resize the target and update resolution-dependent uniforms, including the
   * dither cell scale so a dither pixel stays the same size on screen. */
  resize(t, e) {
    ((this.w = t), (this.h = e));
    const n = Math.min(window.devicePixelRatio || 1, 1.75);
    (this.renderer.setPixelRatio(1), this.renderer.setSize(t, e, !0));
    const s = Math.round(t * n * this.ss),
      r = Math.round(e * n * this.ss);
    (this.target.setSize(s, r),
      this.postMat.uniforms.uResolution.value.set(s, r),
      (this.postMat.uniforms.uLineWeight.value = Math.max(
        1,
        n * this.ss * 0.78,
      )),
      (engravingUniforms.uPxScale.value = Math.max(
        3,
        Math.round(n * this.ss * 3),
      )));
  }
  /** Dusk factor 0..1 — warms and darkens the sky toward the sun's side. */
  setDusk(t) {
    this.postMat.uniforms.uDusk.value = t;
  }
  /** Dawn factor 0..1 — the same low sun read as cool blue-grey instead. */
  setDawn(t) {
    this.postMat.uniforms.uDawn.value = t;
  }
  /** Night factor 0..1. Kills the sky, lifts the bloom so the neon carries the
   * scene, and stops the smog haze glowing. Separate from dusk on purpose —
   * pushing dusk past its range would have distorted the sunset. */
  setNight(t) {
    this.postMat.uniforms.uNight.value = t;
  }
  setSunDir(t) {
    this.postMat.uniforms.uSunDir.value.copy(t);
  }
  /** Chronicle factor 0..1 — the replay grade. The past is a lower-generation
   * copy: chroma drains, grain climbs, the tracking band misbehaves more.
   * Ramped by the bootstrap on enter/exit; zero in normal play. */
  setChronicle(t) {
    this.postMat.uniforms.uChronicle.value = t;
  }
  /** The paper colour, which is also the clear colour and the sky. */
  setPaper(t) {
    (this.postMat.uniforms.uPaper.value.copy(t),
      this.renderer.setClearColor(t, 1));
  }
  /** Update the per-frame camera/time uniforms and render the scene into the
   * offscreen target, leaving the post quad unrendered. The Chronicle's
   * composer path calls this and then runs the engraved frame through its own
   * chain in place of the plain blit below. */
  renderScene(t, e) {
    const n = this.postMat.uniforms;
    ((n.uTime.value = performance.now() * 0.001),
      (n.uCameraNear.value = e.near),
      (n.uCameraFar.value = e.far),
      n.uInvProjection.value.copy(e.projectionMatrixInverse),
      n.uCameraWorld.value.copy(e.matrixWorld),
      (n.uFogDensity.value = this.fogDensity),
      this.renderer.setRenderTarget(this.target),
      this.renderer.render(t, e),
      (this.lastDraws = this.renderer.info.render.calls),
      (this.lastTris = this.renderer.info.render.triangles),
      this.renderer.setRenderTarget(null));
  }
  /** Render the scene to the offscreen target, then run the post pass to screen. */
  render(t, e) {
    (this.renderScene(t, e),
      this.renderer.render(this.postScene, this.postCam));
  }
  /**
   * Render one frame at an arbitrary resolution and return it as an image.
   *
   * Used by PLATE at 2000px. Renders through the same pipeline, so a plate
   * looks like the game — and because the post pass always outputs alpha 1.0,
   * the citizen mask never reaches the exported PNG.
   */
  snap(t, e, n, s) {
    const r = this.w,
      o = this.h,
      a = e.aspect;
    ((e.aspect = n / s), e.updateProjectionMatrix());
    const c = Math.round(n * this.ss),
      l = Math.round(s * this.ss);
    (this.target.setSize(c, l),
      this.postMat.uniforms.uResolution.value.set(c, l));
    const h = new WebGLRenderTarget(n, s, {
        colorSpace: SRGBColorSpace,
        minFilter: LinearFilter,
        magFilter: LinearFilter,
      }),
      u = this.postMat.uniforms,
      // a plate is a plate: the Chronicle's replay grade never reaches the
      // print. Zeroed for the capture, restored after.
      chronPrev = u.uChronicle.value;
    ((u.uChronicle.value = 0),
      (u.uCameraNear.value = e.near),
      (u.uCameraFar.value = e.far),
      u.uInvProjection.value.copy(e.projectionMatrixInverse),
      u.uCameraWorld.value.copy(e.matrixWorld),
      this.renderer.setRenderTarget(this.target),
      this.renderer.render(t, e),
      this.renderer.setRenderTarget(h),
      this.renderer.render(this.postScene, this.postCam));
    const d = new Uint8Array(n * s * 4);
    (this.renderer.readRenderTargetPixels(h, 0, 0, n, s, d),
      this.renderer.setRenderTarget(null),
      h.dispose());
    const f = document.createElement("canvas");
    ((f.width = n), (f.height = s));
    const m = f.getContext("2d"),
      _ = m.createImageData(n, s);
    for (let g = 0; g < s; g++) {
      const p = (s - 1 - g) * n * 4;
      _.data.set(d.subarray(p, p + n * 4), g * n * 4);
    }
    return (
      m.putImageData(_, 0, 0),
      (e.aspect = a),
      e.updateProjectionMatrix(),
      (u.uChronicle.value = chronPrev),
      this.resize(r, o),
      f.toDataURL("image/png")
    );
  }
}
/**
 * Uniforms SHARED by every engraved material.
 *
 * Shared objects, not copies — so `syncLightUniforms` updates one place and
 * every surface in the world follows. This is what keeps the hatching
 * consistent across dozens of separately-created materials.
 */
const engravingUniforms = {
  uHatchFreq: { value: 3.1 },
  uInkCol: { value: new Color("#2b1a52") },
  uCutting: { value: 0 },
  uHatchGain: { value: 1 },
  uSunDirW: { value: new Vector3(0.5, 0.7, 0.3) },
  uSunLum: { value: 1 },
  uAmbSky: { value: 0.3 },
  uAmbGround: { value: 0.15 },
  uDebugView: { value: 0 },
  // dither cell size in render-target pixels — kept at ~3 screen pixels
  // by J0.resize so the 1-bit cells survive the supersampled downscale.
  // (3, not 2: Atkinson dithered 1px cells on a 512x342 Mac; on a modern
  // viewport 2px cells were proportionally far finer than the original)
  uPxScale: { value: 3 },
  uBlueNoise: { value: blueNoiseTex },
};
// palette by district: each named quarter tints the fabric and the neon
// inside its radius. Hue goes where the name sends it; the value stays
// put (the tint is luminance-preserving in the shader). Re-derived as
// the city grows, so the map of colour moves with the map of people.
/**
 * Up to eight districts, each a position, radius and colour, shared by every
 * engraved material and the neon glow.
 *
 * Refreshed whenever districts re-derive (~8s). Fabric within a district's
 * radius is tinted toward its colour at MATCHED LUMINANCE — hue moves, value
 * does not — which is what lets the palette be maximal without turning muddy.
 */
const districtUniforms = {
  uDistrictPos: {
    value: Array.from({ length: 8 }, () => new Vector3(0, 0, 0)),
  },
  uDistrictCol: { value: Array.from({ length: 8 }, () => new Color(0, 0, 0)) },
};
// the signature word of the name picks the hue: Sodium runs hot, the
// Cistern runs cold, and a player who notices has found something real
const districtHues = {
  Lantern: 0.09,
  Sodium: 0.02,
  Candle: 0.13,
  Cistern: 0.54,
  Runoff: 0.47,
  Well: 0.6,
  Garden: 0.33,
  Laurel: 0.4,
  Green: 0.29,
  Quiet: 0.72,
  Sleeping: 0.78,
  Patient: 0.64,
  Halogen: 0.15,
  Morning: 0.57,
  White: 0.83,
};
/** Fallback hue for a district name not in the table. */
function districtHash(i) {
  let t = 2166136261;
  for (let e = 0; e < i.length; e++)
    ((t ^= i.charCodeAt(e)), (t = Math.imul(t, 16777619)));
  return (t >>> 0) / 4294967296;
}
/**
 * Push the current districts into the shared uniforms.
 *
 * Hue comes from the district's NAME — Ember hot, Cistern cold, and so on — so
 * a quarter always looks the way it is called, and the same name always gets
 * the same colour.
 */
function setDistricts(i) {
  for (let t = 0; t < 8; t++) {
    const e = i?.[t],
      n = districtUniforms.uDistrictPos.value[t];
    if (!e) {
      n.set(0, 0, 0);
      continue;
    }
    const s = e.name.split(" ")[1] ?? e.name,
      r = districtHues[s] ?? districtHash(s);
    (n.set(e.x, e.z, 17 + Math.min(34, e.size * 2.4)),
      districtUniforms.uDistrictCol.value[t].setHSL(r, 0.62, 0.64));
  }
}
/**
 * Collapse the scene's real lights to scalar luminance for the hatcher.
 *
 * Rec.709 luma, pi-normalised. COLOUR IS DISCARDED ON PURPOSE: an engraving
 * has one ink, so light level chooses hatch density rather than hue.
 */
function syncLightUniforms(i, t) {
  const e = (s) => 0.2126 * s.r + 0.7152 * s.g + 0.0722 * s.b;
  engravingUniforms.uSunDirW.value
    .copy(i.position)
    .sub(i.target.position)
    .normalize();
  const n = 1 / Math.PI;
  ((engravingUniforms.uSunLum.value = i.intensity * e(i.color) * n),
    (engravingUniforms.uAmbSky.value = t.intensity * e(t.color) * n),
    (engravingUniforms.uAmbGround.value = t.intensity * e(t.groundColor) * n));
}
const Q0 = `
#include <fog_vertex>
{
  vec4 cwp = vec4(transformed, 1.0);
  #ifdef USE_INSTANCING
    cwp = instanceMatrix * cwp;
  #endif
  cwp = modelMatrix * cwp;
  vWorldPosE = cwp.xyz;
  vec3 cwn = objectNormal;
  #ifdef USE_INSTANCING
    cwn = mat3(instanceMatrix) * cwn;
  #endif
  vWorldNormalE = normalize(mat3(modelMatrix) * cwn);
  vToneE = aTone;
}
`,
  t_ = `
varying vec3 vWorldPosE;
varying vec3 vWorldNormalE;
varying vec2 vToneE;
uniform float uHatchFreq;
uniform vec3 uInkCol;
uniform float uCutting;
uniform float uHatchGain;
uniform vec3 uSunDirW;
uniform float uSunLum;
uniform float uAmbSky;
uniform float uAmbGround;
uniform vec3 uStoneCol;
uniform float uJointAlpha;
uniform float uCourseH;
uniform float uDebugView;
uniform float uLocalGain;
uniform float uDither;
uniform float uCarvable;
uniform float uPxScale;
uniform vec3 uDistrictPos[8];
uniform vec3 uDistrictCol[8];

float eHash21(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}
float eNoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = eHash21(i), b = eHash21(i + vec2(1,0));
  float c = eHash21(i + vec2(0,1)), d = eHash21(i + vec2(1,1));
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}

// blue-noise threshold for the 1-bit era: 64x64 void-and-cluster map
// generated at load. Aperiodic clusters instead of a repeating lattice,
// 4096 levels instead of 16 — the two structural reasons Bayer banded
// and read as a halftone screen rather than a dither.
uniform sampler2D uBlueNoise;
float eBlueNoise(vec2 cell) {
  return texture2D(uBlueNoise, (cell + 0.5) / 64.0).r;
}

float lineAA(float s, float duty) {
  float w = fwidth(s);
  float f = fract(s);
  float d = abs(f - 0.5);
  float hw = duty * 0.5;
  float v = 1.0 - smoothstep(hw - w, hw + w, d);
  // Past Nyquist a hatch stops being lines and becomes a beat pattern against
  // the pixel grid. w is periods per pixel, so w = 0.5 is exactly two pixels
  // per period — the point beyond which there is no line left to draw, only
  // moire. Fade to the flat tone the hatch averages to.
  //
  // This used to cut over at w > 0.62, which is BELOW Nyquist — it let the
  // hatch run a third of an octave into the beating before giving up — and it
  // did so with a hard branch, which draws its own visible arc across the
  // ground where the two regimes meet. A crossfade costs a smoothstep and a
  // mix, has no divergent branch, and takes no extra samples.
  return mix(v, duty * 0.85, smoothstep(0.34, 0.5, w));
}

float hatchLine(vec2 co, vec2 dir, float freq, float duty, float wob) {
  float s = dot(co, dir) * freq;
  s += (eNoise(co * 0.31) - 0.5) * wob;    // hand-cut waviness
  return lineAA(s, duty);
}

float hatchTri(vec3 wp, vec3 aw, vec2 dir, float freq, float duty, float wob) {
  return aw.z * hatchLine(wp.xy, dir, freq, duty, wob)
       + aw.x * hatchLine(wp.zy, dir, freq, duty, wob)
       + aw.y * hatchLine(wp.xz, dir, freq, duty, wob);
}

// distance-adaptive hatching: line spacing tracks viewing distance in powers
// of two (crossfaded like mip levels) so strokes stay engraving-fine up close
// and remain visible far away — while staying anchored to the stone
float hatchAdaptive(vec3 wp, vec3 aw, vec2 dir, float freq, float duty, float wob, float lvA, float lvB, float lf) {
  float a = hatchTri(wp, aw, dir, freq * lvA, duty, wob);
  float b = hatchTri(wp, aw, dir, freq * lvB, duty, wob * 0.5);
  return mix(a, b, lf);
}

// masonry joints + per-block tonal patchwork
vec2 masonry(vec3 wp, vec3 n, float b) {
  vec3 an = abs(n);
  float ink = 0.0;
  float blockTone = 0.0;
  float ch = uCourseH;
  if (an.y > 0.72 && ch > 1.8) {
    // natural ground: sparse engraved flecks + contour lines on any tilt
    vec2 co = wp.xz;
    // 1.0 puts a line every metre. It was 1.6 — a line every 62cm — which is
    // finer than the ground reads at any normal camera height and crosses into
    // the beating range close enough to the eye to be obvious. The terrain is
    // the largest surface in frame and the flattest, so it is where hatch
    // density shows up first; the walls keep theirs.
    float s = dot(co, normalize(vec2(1.0, 0.42))) * 1.0;
    float dash = lineAA(s, 0.2);
    float mask = smoothstep(0.58, 0.78, eNoise(co * 0.16));
    ink = dash * mask * 0.5;
    // contour lines where the ground genuinely tilts (strata edges only)
    float tilt = 1.0 - n.y;
    float cw = fwidth(wp.y) + 0.02;
    float cf = abs(fract(wp.y / 2.3) - 0.5) * 2.3;
    float contour = 1.0 - smoothstep(0.03, 0.03 + cw, cf);
    float cfade = 1.0 - smoothstep(0.25, 0.75, cw);   // dissolve in the distance
    ink = max(ink, contour * smoothstep(0.16, 0.42, tilt) * 0.5 * cfade);
    blockTone = (eNoise(co * 0.05) - 0.5) * 1.4;
  } else if (an.y > 0.72) {
    // pavement grid
    float g = 2.35;
    vec2 co = wp.xz;
    vec2 f = abs(fract(co / g) - 0.5) * g;
    float d = min(f.x, f.y);
    float w = fwidth(wp.x + wp.z) + 0.012;
    ink = 1.0 - smoothstep(0.015, 0.015 + w, d);
    blockTone = eHash21(floor(co / g)) - 0.5;
  } else if (ch < 0.95) {
    // board-formed concrete: shutter seams and form-tie holes.
    // this is the oldest fabric there is now — poured, not laid
    float along = an.x > an.z ? wp.z : wp.x;
    float course = floor(wp.y / ch);
    float fy = abs(fract(wp.y / ch) - 0.5) * ch;
    float wy = fwidth(wp.y) + 0.012;
    float hJoint = 1.0 - smoothstep(0.012, 0.012 + wy, ch * 0.5 - fy);
    ink = hJoint * 0.75;
    // form-tie holes on the pour grid
    float tw = ch * 3.4;
    float th2 = ch * 2.2;
    vec2 tie = vec2((fract(along / tw) - 0.5) * tw, (fract(wp.y / th2) - 0.5) * th2);
    float wx = fwidth(along) + 0.012;
    ink = max(ink, (1.0 - smoothstep(0.055, 0.055 + wx * 2.0, length(tie))) * 0.6);
    // faint pour-lift banding: each lift a slightly different batch
    blockTone = (eHash21(vec2(course, 7.0)) - 0.5) * 0.7;
  } else {
    // corporate panelling: staggered cladding seams, vent slats, corner bolts
    float along = an.x > an.z ? wp.z : wp.x;
    float ph = ch * 2.6;
    float pw = ch * 5.2;
    float row = floor(wp.y / ph);
    float stag = mod(row, 2.0) * pw * 0.5;
    float u = along + stag;
    float fx = abs(fract(u / pw) - 0.5) * pw;
    float fy = abs(fract(wp.y / ph) - 0.5) * ph;
    float wy = fwidth(wp.y) + 0.012;
    float wx = fwidth(along) + 0.012;
    float hSeam = 1.0 - smoothstep(0.02, 0.02 + wy, ph * 0.5 - fy);
    float vSeam = 1.0 - smoothstep(0.016, 0.016 + wx, pw * 0.5 - fx);
    ink = max(hSeam, vSeam * 0.85);
    float pid = eHash21(vec2(floor(u / pw), row));
    // vent slats punched into the occasional panel
    float vent = step(0.78, pid)
      * (1.0 - smoothstep(pw * 0.24, pw * 0.30, fx))
      * (1.0 - smoothstep(ph * 0.20, ph * 0.26, fy));
    ink = max(ink, lineAA(wp.y * 3.6, 0.42) * vent * 0.62);
    // inspection-plate outline on a few others
    float plate = step(0.62, pid) * (1.0 - step(0.78, pid));
    float po = abs(max(fx - pw * 0.17, fy - ph * 0.17));
    ink = max(ink, plate * (1.0 - smoothstep(0.02, 0.02 + wx, po)) * 0.6);
    // corner bolts
    float bolt = 1.0 - smoothstep(0.055, 0.055 + wx, length(vec2(pw * 0.5 - fx, ph * 0.5 - fy) - vec2(0.2)));
    ink = max(ink, bolt * 0.5);
    blockTone = pid - 0.5;
  }
  return vec2(ink, blockTone);
}
`,
  e_ = `
{
  float b = dot(outgoingLight, vec3(0.2126, 0.7152, 0.0722));

  vec3 wn = normalize(vWorldNormalE);
  float ndl = dot(wn, normalize(uSunDirW));
  float ambHere = mix(uAmbGround, uAmbSky, wn.y * 0.5 + 0.5);
  float directLum = max(b - ambHere, 0.0);
  float sunVis = ndl > 0.03 ? clamp(directLum / max(uSunLum * ndl, 1e-4), 0.0, 1.0) : 0.0;

  // exposure: how much sun this surface sees (0 = full shade / cast shadow)
  float bb = sunVis * pow(clamp(ndl, 0.0, 1.0), 0.68);
  bb *= vToneE.x;                        // baked AO pulls pockets into shade
  // ambient rescue: open upward faces in shadow stay a touch lighter than
  // enclosed undersides
  float openness = clamp(ambHere / max(uAmbSky, 1e-4), 0.0, 1.0);

  vec3 aw = pow(abs(wn), vec3(5.0));
  aw /= (aw.x + aw.y + aw.z);

  float freq = uHatchFreq;
  float gain = uHatchGain * uLocalGain;
  float c1 = (1.0 - smoothstep(0.38, 0.58, bb)) * gain;
  float c2 = (1.0 - smoothstep(0.18, 0.38, bb)) * gain;
  float c3 = (1.0 - smoothstep(0.05, 0.18, bb)) * gain;
  c3 *= mix(1.0, 0.82, openness * 0.7);

  // stroke density tracks viewing distance (see hatchAdaptive)
  float distE = distance(cameraPosition, vWorldPosE);
  float llog = log2(88.0 / max(distE, 0.4));
  float lvf = clamp(llog, -1.6, 5.2);
  float lvA = exp2(floor(lvf));
  float lvB = lvA * 2.0;
  float lf = fract(lvf);

  float l0 = hatchTri(vWorldPosE, aw, normalize(vec2(1.0, 0.52)), freq * 0.55, 0.16, 0.6);
  float l1 = hatchAdaptive(vWorldPosE, aw, normalize(vec2(1.0, 0.62)), freq, 0.28, 0.5, lvA, lvB, lf);
  float l2 = hatchAdaptive(vWorldPosE, aw, normalize(vec2(-0.66, 1.0)), freq * 1.07, 0.32, 0.5, lvA, lvB, lf);
  float l3 = hatchAdaptive(vWorldPosE, aw, normalize(vec2(1.0, -0.13)), freq * 1.55, 0.44, 0.35, lvA, lvB, lf);

  // faint tooth on mid-lit stone so nothing reads as smooth plastic
  float ink = l0 * 0.12 * (1.0 - smoothstep(0.55, 0.85, bb)) * uHatchGain;
  ink = max(ink, l1 * min(c1, 1.0) * 0.85);
  ink = 1.0 - (1.0 - ink) * (1.0 - l2 * min(c2, 1.0) * 0.9);
  ink = 1.0 - (1.0 - ink) * (1.0 - l3 * min(c3, 1.0) * 0.93);
  ink = max(ink, min(c3, 1.0) * (0.72 - openness * 0.18));  // deep-shade floor

  vec2 mas = masonry(vWorldPosE, wn, bb);
  float jointFade = 0.35 + 0.65 * smoothstep(0.2, 0.5, bb);
  ink = max(ink, mas.x * uJointAlpha * jointFade);

  float age = vToneE.y;
  vec3 stone = uStoneCol * (0.90 + 0.10 * smoothstep(0.2, 0.9, bb));
  stone *= 1.0 + mas.y * 0.085;
  stone *= mix(vec3(1.0), vec3(0.83, 0.78, 0.92), age * 0.85);

  // palette by district: explode the hue, hold the value. The tint is
  // luminance-matched so the dark/mid/light hierarchy never moves.
  {
    vec3 dAcc = vec3(0.0);
    float dW = 0.0;
    for (int dk = 0; dk < 8; dk++) {
      float dRad = uDistrictPos[dk].z;
      if (dRad > 1.0) {
        float dDist = distance(vWorldPosE.xz, uDistrictPos[dk].xy);
        float w = 1.0 - smoothstep(dRad * 0.55, dRad, dDist);
        dAcc += uDistrictCol[dk] * w;
        dW += w;
      }
    }
    if (dW > 0.001) {
      vec3 dCol = dAcc / dW;
      float sLum = dot(stone, vec3(0.2126, 0.7152, 0.0722));
      float dLum = dot(dCol, vec3(0.2126, 0.7152, 0.0722));
      stone = mix(stone, dCol * (sLum / max(dLum, 0.05)), min(dW, 1.0) * 0.62);
    }
  }

  // carvable fabric: faint setting-out scribes — dashed vertical grooves
  // every 3.6m, each with a raised lit edge beside it, the way a mason
  // marks a face before opening it. Deliberately quiet (CARVE is one tool
  // of seven); the LIT edge is what keeps it legible at night, when a
  // dark groove on dark fabric would vanish. Orthogonal to the era split:
  // this reads on top of the panelling, not instead of it. A carved giant
  // pier is rebuilt with the plain material and stops carrying the marks.
  if (uCarvable > 0.5) {
    vec3 anC = abs(wn);
    if (anC.y < 0.72) {
      float alongC = anC.x > anC.z ? vWorldPosE.z : vWorldPosE.x;
      float dashC = step(0.42, fract(vWorldPosE.y * 0.36 + 0.2));
      float wuC = fwidth(alongC) + 0.02;
      float fuC = abs(fract(alongC / 3.6) - 0.5) * 3.6;
      float grooveC = 1.0 - smoothstep(0.035, 0.035 + wuC, fuC);
      float litC = 1.0 - smoothstep(0.06, 0.06 + wuC, abs(fuC - 0.18));
      float fadeC = 1.0 - smoothstep(0.5, 1.2, wuC);   // dissolve far off
      ink = max(ink, grooveC * dashC * 0.34 * fadeC);
      stone *= 1.0 + litC * dashC * 0.22 * fadeC;
    }
  }

  vec3 engraved = mix(stone, uInkCol, clamp(ink, 0.0, 1.0));

  // section poché: interior of cut solids reads as dark diagonal-lined mass
  if (uCutting > 0.5 && !gl_FrontFacing) {
    float s = (vWorldPosE.x + vWorldPosE.y * 1.3 + vWorldPosE.z) * 5.0;
    float pl = lineAA(s, 0.32);
    engraved = mix(vec3(0.13, 0.09, 0.24), vec3(0.30, 0.20, 0.42), pl);
  }

  // the 1-bit era: end-of-humanity fabric (corporate panelling) renders
  // as blue-noise dither with an Atkinson-shaped response — contrast
  // stretched so highlights blow out and shadows crush, the way the
  // discarded 2/8 error does in the real algorithm. Hard binary output;
  // the fabric boundary IS the style boundary. Old fabric (board-formed
  // concrete, rock, ground) keeps the burin hatching, as does salvage —
  // panel-seamed sheet, but undithered.
  if (uDither > 0.5 && uCutting < 0.5) {
    float dl = dot(engraved, vec3(0.2126, 0.7152, 0.0722));
    dl = clamp((dl - 0.5) * 1.45 + 0.56, 0.0, 1.0);
    float bt = eBlueNoise(floor(gl_FragCoord.xy / uPxScale));
    // diffusion tell: error diffusion sharpens edges because the error a
    // contour rejects lands on its neighbours. A screen can't do that, but
    // biasing the threshold toward the mid wherever luminance is changing
    // makes the clusters bunch along edges the same way — diffusion, not
    // screening. fwidth is per render-target pixel; scale by the cell.
    bt = mix(bt, 0.5, clamp(fwidth(dl) * uPxScale * 2.0, 0.0, 0.75));
    vec3 dPaper = mix(vec3(0.97), uStoneCol, 0.30);
    engraved = dl > bt ? dPaper : uInkCol * 0.92;
  }

  if (uDebugView > 0.5) {
    if (uDebugView < 1.5) engraved = vec3(bb);
    else if (uDebugView < 2.5) engraved = vec3(sunVis);
    else if (uDebugView < 3.5) engraved = vec3(directLum);
    else engraved = vec3(b);
  }

  gl_FragColor = vec4(engraved, diffuseColor.a);
}
`;

// --- generated exports ---
export {
  J0,
  Q0,
  districtUniforms,
  e_,
  engravingUniforms,
  setDistricts,
  syncLightUniforms,
  t_,
};
