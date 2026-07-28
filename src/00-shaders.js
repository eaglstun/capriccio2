// Engraving GLSL — post pass, hatching, masonry, sky, ink, paper
//
// Extracted verbatim from public/assets/index-DCXbw2vV.js,
// lines 25401–25917.
// Identifiers are minifier-mangled; nothing here has been renamed.
// Regenerate with: python3 tools/split_bundle.py --write

const j0 = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;
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
uniform float uVignette;
uniform float uGrain;
uniform float uLineWeight;

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
  float depthC = readDepth(vUv);
  vec3 color = texture2D(tDiffuse, vUv).rgb;

  bool skyC = depthC >= 0.999999;
  float distC = linDepth(depthC);

  vec4 ndcDir = vec4(vUv * 2.0 - 1.0, 1.0, 1.0);
  vec4 vDir = uInvProjection * ndcDir;
  vec3 worldDir = normalize((uCameraWorld * vec4(vDir.xyz / vDir.w, 0.0)).xyz);

  // ============ SKY ============
  if (skyC) {
    vec3 sky = uPaper;
    float elev = worldDir.y;
    // faint horizontal burin lines, denser toward horizon, broken by cloudy noise
    float band = 1.0 - smoothstep(0.02, 0.38, elev);
    float cloud = vnoise(worldDir.xz / max(0.12, abs(worldDir.y)) * 0.35 + vec2(3.7, 9.1));
    cloud = smoothstep(0.35, 0.75, cloud);
    float sunAmt = pow(max(dot(worldDir, uSunDir), 0.0), 18.0);
    float lineY = sin(vUv.y * uResolution.y * 0.9);
    float lines = smoothstep(0.55, 1.0, lineY * lineY);
    float skyInk = band * cloud * lines * 0.075 * (1.0 - sunAmt * 0.9);
    // dusk warms and darkens the paper sky a touch near the sun's side
    vec3 duskTint = mix(vec3(1.0), vec3(1.0, 0.93, 0.82), uDusk * (0.35 + 0.65 * sunAmt));
    sky = sky * duskTint * (1.0 - skyInk);
    sky *= 1.0 - uDusk * 0.16 * (1.0 - sunAmt);
    color = sky;
  } else {
    // ============ INK OUTLINES ============
    float r = uLineWeight;                       // kernel radius in pixels
    vec2 o1 = vec2(px.x, 0.0) * r;
    vec2 o2 = vec2(0.0, px.y) * r;

    float dR = linDepth(readDepth(vUv + o1));
    float dL = linDepth(readDepth(vUv - o1));
    float dU = linDepth(readDepth(vUv + o2));
    float dD = linDepth(readDepth(vUv - o2));

    // depth edge, scaled by distance so far geometry doesn't light up everywhere
    float dEdge = abs(dR - dL) + abs(dU - dD);
    float depthThresh = 0.02 * distC + 0.045;
    float depthEdge = smoothstep(depthThresh, depthThresh * 2.0, dEdge);

    // normal edge from reconstructed positions (creases, arch intrados)
    vec3 pC = viewPos(vUv, depthC);
    float ddRc = readDepth(vUv + o1); float ddLc = readDepth(vUv - o1);
    float ddUc = readDepth(vUv + o2); float ddDc = readDepth(vUv - o2);
    vec3 pR = viewPos(vUv + o1, ddRc);
    vec3 pL = viewPos(vUv - o1, ddLc);
    vec3 pU = viewPos(vUv + o2, ddUc);
    vec3 pD = viewPos(vUv - o2, ddDc);
    vec3 dx = (abs(linDepth(ddRc) - distC) < abs(distC - linDepth(ddLc))) ? (pR - pC) : (pC - pL);
    vec3 dy = (abs(linDepth(ddUc) - distC) < abs(distC - linDepth(ddDc))) ? (pU - pC) : (pC - pD);
    vec3 nC = normalize(cross(dx, dy));

    vec3 nR = normalize(cross(pR - pC, dy));
    vec3 nU = normalize(cross(dx, pU - pC));
    float nEdge = max(1.0 - abs(dot(nC, nR)), 1.0 - abs(dot(nC, nU)));
    float normalEdge = smoothstep(0.16, 0.45, nEdge) * 0.9;

    float edge = max(depthEdge, normalEdge);

    // distance fade (matched exp2 fog) — lines dissolve into haze
    float fogF = 1.0 - exp(-uFogDensity * uFogDensity * distC * distC);
    edge *= (1.0 - fogF * 0.9);
    // near boost: foreground strokes read heavier
    edge *= mix(1.5, 0.8, smoothstep(8.0, 220.0, distC));

    color = mix(color, uInk, clamp(edge, 0.0, 1.0) * 0.92);
  }

  // ============ PAPER ============
  // grain: two frequencies of static screen-space tooth
  float g1 = vnoise(vUv * uResolution * 0.5);
  float g2 = vnoise(vUv * uResolution * 0.11 + 57.0);
  float grain = (g1 - 0.5) * 0.055 + (g2 - 0.5) * 0.035;
  color *= 1.0 + grain * uGrain;

  // slight warm paper tint multiply + dusk warmth
  vec3 tint = mix(vec3(1.0, 0.985, 0.94), vec3(1.0, 0.94, 0.85), uDusk);
  color *= tint;

  // vignette
  vec2 vc = vUv - 0.5;
  float vig = 1.0 - dot(vc, vc) * uVignette;
  color *= vig;

  gl_FragColor = vec4(color, 1.0);
}
`;
}
class J0 {
  constructor(t, e = {}) {
    K(this, "renderer");
    K(this, "target");
    K(this, "postMat");
    K(this, "postScene");
    K(this, "postCam");
    K(this, "ss");
    K(this, "paper", new Ht("#efe8d8"));
    K(this, "ink", new Ht("#231d13"));
    K(this, "fogDensity", 0.0021);
    K(this, "w", 4);
    K(this, "h", 4);
    K(this, "lastDraws", 0);
    K(this, "lastTris", 0);
    ((this.ss = e.supersample ?? 1.4),
      (this.renderer = new N0({
        antialias: !1,
        powerPreference: "high-performance",
        stencil: !1,
      })),
      (this.renderer.outputColorSpace = Ve),
      (this.renderer.toneMapping = kn),
      (this.renderer.shadowMap.enabled = !0),
      (this.renderer.shadowMap.type = Ua),
      this.renderer.setClearColor(this.paper, 1),
      (this.renderer.localClippingEnabled = !0),
      t.appendChild(this.renderer.domElement));
    const n = new Ka(4, 4);
    ((n.type = si),
      (this.target = new Gn(4, 4, {
        depthTexture: n,
        depthBuffer: !0,
        minFilter: Ze,
        magFilter: Ze,
        colorSpace: Ve,
      })),
      (this.postMat = new Vn({
        vertexShader: j0,
        fragmentShader: $0(),
        uniforms: {
          tDiffuse: { value: this.target.texture },
          tDepth: { value: n },
          uResolution: { value: new at(4, 4) },
          uCameraNear: { value: 0.1 },
          uCameraFar: { value: 1e3 },
          uInvProjection: { value: new se() },
          uCameraWorld: { value: new se() },
          uSunDir: { value: new P(0.5, 0.6, 0.3).normalize() },
          uFogDensity: { value: this.fogDensity },
          uPaper: { value: new Ht(this.paper) },
          uInk: { value: new Ht(this.ink) },
          uDusk: { value: 0 },
          uVignette: { value: 0.42 },
          uGrain: { value: 1 },
          uLineWeight: { value: 1 },
        },
        depthTest: !1,
        depthWrite: !1,
      })),
      (this.postScene = new ih()),
      (this.postCam = new Ja(-1, 1, 1, -1, 0, 1)));
    const s = new he(new Ai(2, 2), this.postMat);
    ((s.frustumCulled = !1),
      this.postScene.add(s),
      this.resize(
        t.clientWidth || window.innerWidth,
        t.clientHeight || window.innerHeight,
      ));
  }
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
      )));
  }
  setDusk(t) {
    this.postMat.uniforms.uDusk.value = t;
  }
  setSunDir(t) {
    this.postMat.uniforms.uSunDir.value.copy(t);
  }
  setPaper(t) {
    (this.postMat.uniforms.uPaper.value.copy(t),
      this.renderer.setClearColor(t, 1));
  }
  render(t, e) {
    const n = this.postMat.uniforms;
    ((n.uCameraNear.value = e.near),
      (n.uCameraFar.value = e.far),
      n.uInvProjection.value.copy(e.projectionMatrixInverse),
      n.uCameraWorld.value.copy(e.matrixWorld),
      (n.uFogDensity.value = this.fogDensity),
      this.renderer.setRenderTarget(this.target),
      this.renderer.render(t, e),
      (this.lastDraws = this.renderer.info.render.calls),
      (this.lastTris = this.renderer.info.render.triangles),
      this.renderer.setRenderTarget(null),
      this.renderer.render(this.postScene, this.postCam));
  }
  snap(t, e, n, s) {
    const r = this.w,
      o = this.h,
      a = e.aspect;
    ((e.aspect = n / s), e.updateProjectionMatrix());
    const c = Math.round(n * this.ss),
      l = Math.round(s * this.ss);
    (this.target.setSize(c, l),
      this.postMat.uniforms.uResolution.value.set(c, l));
    const h = new Gn(n, s, { colorSpace: Ve, minFilter: Ze, magFilter: Ze }),
      u = this.postMat.uniforms;
    ((u.uCameraNear.value = e.near),
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
      this.resize(r, o),
      f.toDataURL("image/png")
    );
  }
}
const engravingUniforms = {
  uHatchFreq: { value: 3.1 },
  uInkCol: { value: new Ht("#241d12") },
  uCutting: { value: 0 },
  uHatchGain: { value: 1 },
  uSunDirW: { value: new P(0.5, 0.7, 0.3) },
  uSunLum: { value: 1 },
  uAmbSky: { value: 0.3 },
  uAmbGround: { value: 0.15 },
  uDebugView: { value: 0 },
};
function syncLightUniforms(i, t) {
  const e = (s) => 0.2126 * s.r + 0.7152 * s.g + 0.0722 * s.b;
  engravingUniforms.uSunDirW.value.copy(i.position).sub(i.target.position).normalize();
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

float lineAA(float s, float duty) {
  float w = fwidth(s);
  if (w > 0.62) return duty * 0.85;        // too dense on screen → flat tone, no moiré
  float f = fract(s);
  float d = abs(f - 0.5);
  float hw = duty * 0.5;
  float v = 1.0 - smoothstep(hw - w, hw + w, d);
  return v;
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
    float s = dot(co, normalize(vec2(1.0, 0.42))) * 1.6;
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
  } else {
    // wall courses
    float along = an.x > an.z ? wp.z : wp.x;
    float course = floor(wp.y / ch);
    float fy = abs(fract(wp.y / ch) - 0.5) * ch;
    float wy = fwidth(wp.y) + 0.012;
    float hJoint = 1.0 - smoothstep(0.014, 0.014 + wy, ch * 0.5 - fy);
    float stag = mod(course, 2.0) * 1.05;
    float vx = abs(fract((along + stag) / 2.1) - 0.5) * 2.1;
    float wx = fwidth(along) + 0.012;
    float vJoint = 1.0 - smoothstep(0.012, 0.012 + wx, vx);
    ink = max(hJoint, vJoint * 0.8);
    blockTone = eHash21(vec2(course, floor((along + stag) / 2.1))) - 0.5;
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
  stone *= mix(vec3(1.0), vec3(0.88, 0.83, 0.72), age * 0.85);

  vec3 engraved = mix(stone, uInkCol, clamp(ink, 0.0, 1.0));

  // section poché: interior of cut solids reads as dark diagonal-lined mass
  if (uCutting > 0.5 && !gl_FrontFacing) {
    float s = (vWorldPosE.x + vWorldPosE.y * 1.3 + vWorldPosE.z) * 5.0;
    float pl = lineAA(s, 0.32);
    engraved = mix(vec3(0.16, 0.13, 0.10), vec3(0.32, 0.28, 0.22), pl);
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
