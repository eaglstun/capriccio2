// Material factory: the onBeforeCompile hook and the stone palette
//
// Extracted verbatim from public/assets/index-DCXbw2vV.js,
// lines 25918–26207.
// Identifiers are minifier-mangled; nothing here has been renamed.
// Regenerate with: python3 tools/split_bundle.py --write

function jn(i = {}) {
  const t = new Ea({ color: 16777215, side: i.side ?? _n, fog: !0 }),
    e = new Ht(i.stone ?? "#e8e0cb");
  return (
    (t.onBeforeCompile = (n) => {
      ((n.uniforms.uHatchFreq = Ge.uHatchFreq),
        (n.uniforms.uInkCol = { value: Ge.uInkCol.value }),
        (n.uniforms.uCutting = Ge.uCutting),
        (n.uniforms.uHatchGain = Ge.uHatchGain),
        (n.uniforms.uSunDirW = Ge.uSunDirW),
        (n.uniforms.uSunLum = Ge.uSunLum),
        (n.uniforms.uAmbSky = Ge.uAmbSky),
        (n.uniforms.uAmbGround = Ge.uAmbGround),
        (n.uniforms.uStoneCol = { value: e }),
        (n.uniforms.uJointAlpha = { value: i.jointAlpha ?? 0.34 }),
        (n.uniforms.uCourseH = { value: i.courseH ?? 1.02 }),
        (n.uniforms.uDebugView = Ge.uDebugView),
        (n.uniforms.uLocalGain = { value: i.gain ?? 1 }),
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
      `engraved|${i.stone ?? ""}|${i.jointAlpha ?? 0.34}|${i.courseH ?? 1.02}|${i.gain ?? 1}`),
    t
  );
}
function n_() {
  const i = jn({ stone: "#e8e0cb", jointAlpha: 0.34, courseH: 1.02 }),
    t = jn({ stone: "#e2d9c0", jointAlpha: 0.42, courseH: 0.88 }),
    e = jn({ stone: "#ded6c2", jointAlpha: 0.4, courseH: 2.3 }),
    n = jn({ stone: "#d3bf9c", jointAlpha: 0.16, courseH: 0.42 }),
    s = jn({ stone: "#eee6d2", jointAlpha: 0.07 }),
    r = jn({ stone: "#6b7a5e", jointAlpha: 0 }),
    o = jn({ stone: "#a2604f", jointAlpha: 0 }),
    a = jn({ stone: "#e7e0cf", jointAlpha: 0.1, courseH: 1.5, gain: 0.34 }),
    c = new Vd({
      color: "#d1a63c",
      emissive: "#7a5a12",
      specular: "#fff3c0",
      shininess: 70,
      fog: !0,
    }),
    l = new yi({ color: "#231d12", fog: !0 }),
    h = new Ea({ color: "#332c22", fog: !0 }),
    u = new yi({
      color: "#5d6c7b",
      transparent: !0,
      opacity: 0.42,
      depthWrite: !1,
      fog: !1,
    }),
    d = new yi({
      color: "#8a4a3a",
      transparent: !0,
      opacity: 0.4,
      depthWrite: !1,
      fog: !1,
    }),
    f = new Ea({
      color: "#9fb6b4",
      fog: !0,
      polygonOffset: !0,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
  return (
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
      stoneOld: t,
      rock: e,
      timber: n,
      plaster: s,
      green: r,
      fabric: o,
      distant: a,
      gold: c,
      window: l,
      figure: h,
      ghost: u,
      ghostBad: d,
      water: f,
    }
  );
}
const Aa = { value: 0 };
function i_() {
  const i = new yi({ color: "#ffcf7a", fog: !1 });
  return ((i.toneMapped = !1), i);
}
function Je(i) {
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
function Ra(i) {
  let t = 2166136261;
  for (let e = 0; e < i.length; e++)
    ((t ^= i.charCodeAt(e)), (t = Math.imul(t, 16777619)));
  return t >>> 0;
}
function Al(i) {
  return i * i * (3 - 2 * i);
}
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
const Xe = (i, t, e) => Math.max(t, Math.min(e, i)),
  zn = (i, t, e) => i + (t - i) * e,
  Nn = (i, t, e) => {
    const n = Xe((e - i) / (t - i), 0, 1);
    return n * n * (3 - 2 * n);
  };
function r_(i, t) {
  return t[Math.floor(i() * t.length) % t.length];
}
const br = 20260726,
  o_ = 60,
  a_ = 21,
  Dr = 20,
  Lr = 26,
  Ca = -26;
function c_(i) {
  return o_ + Math.sin(i * 0.011) * 7;
}
function l_(i, t) {
  let e = (Sr(i * 0.012, t * 0.012, 4, br) - 0.5) * 5.5;
  const n = Math.max(Math.abs(i + 25) / 95, Math.abs(t - 20) / 85),
    s = 1 - Nn(0.72, 1.15, n);
  e = zn(e, 0, s * 0.92);
  const r = Nn(-43, -56, t);
  e += Dr * r;
  const o = Math.max(Math.abs(i + 30) / 85, Math.abs(t + 95) / 48),
    a = (1 - Nn(0.7, 1.1, o)) * r;
  e = zn(e, Dr, a * 0.85);
  const c = Nn(84, 102, i);
  ((e += Lr * c), (e += 9 * Nn(128, 160, i)));
  const l = Math.hypot((i - 126) / 34, (t + 6) / 30);
  e = zn(e, Lr + 3.5, (1 - Nn(0.7, 1.05, l)) * c * 0.9);
  const h = c_(t),
    u = Math.abs(i - h),
    d = a_ + Sr(t * 0.03, 7.7, 3, br + 5) * 6,
    f = 1 - Nn(d * 0.45, d, u),
    m = Ca + (Sr(t * 0.02, 3.3, 3, br + 9) - 0.5) * 4 + t * 0.012;
  return ((e = zn(e, m, Math.pow(f, 1.25))), e);
}
function qt(i, t) {
  const e = l_(i, t),
    n = 2.3,
    s = e / n,
    r = Math.floor(s),
    o = s - r,
    a = Nn(0.47, 0.53, o),
    c = (r + a) * n;
  return zn(e, c, 0.88);
}
function h_(i, t, e = 0.9) {
  const n = qt(i - e, t),
    s = qt(i + e, t),
    r = qt(i, t - e),
    o = qt(i, t + e);
  return new P(n - s, 2 * e, r - o).normalize();
}
function u_(i, t) {
  return 1 - h_(i, t).y;
}
function Ir(i, t) {
  return u_(i, t) < 0.22;
}
const d_ = 300;
function f_() {
  const t = d_ * 2,
    e = new Ai(t, t, 520, 520);
  e.rotateX(-Math.PI / 2);
  const n = e.attributes.position;
  for (let r = 0; r < n.count; r++) {
    const o = n.getX(r),
      a = n.getZ(r);
    n.setY(r, qt(o, a));
  }
  e.computeVertexNormals();
  const s = new Float32Array(n.count * 2);
  for (let r = 0; r < n.count; r++) {
    const o = n.getX(r),
      a = n.getZ(r),
      c = n.getY(r);
    let l = 1;
    (c < -4 && (l = Xe(1 + (c + 4) * 0.012, 0.72, 1)),
      (s[r * 2] = l),
      (s[r * 2 + 1] = 0.35 + Sr(o * 0.05, a * 0.05, 2, br + 21) * 0.3));
  }
  return (e.setAttribute("aTone", new pe(s, 2)), e);
}
const Vr = {
    townPlaza: new P(-18, 0, 26),
    hallSite: new P(-34, 0, -16),
    terraceCenter: new P(-28, Dr, -86),
    terraceEdge: new P(-6, Dr, -62),
    springPool: new P(126, Lr + 3.5, -6),
    massifRim: new P(92, Lr, -10),
  },
  $n = 7;
