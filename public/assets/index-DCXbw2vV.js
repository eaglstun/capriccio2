var Vh = Object.defineProperty;
var Wh = (i, t, e) =>
  t in i
    ? Vh(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (i[t] = e);
var K = (i, t, e) => Wh(i, typeof t != "symbol" ? t + "" : t, e);
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) n(s);
  new MutationObserver((s) => {
    for (const r of s)
      if (r.type === "childList")
        for (const o of r.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && n(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function e(s) {
    const r = {};
    return (
      s.integrity && (r.integrity = s.integrity),
      s.referrerPolicy && (r.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (r.credentials = "include")
        : s.crossOrigin === "anonymous"
          ? (r.credentials = "omit")
          : (r.credentials = "same-origin"),
      r
    );
  }
  function n(s) {
    if (s.ep) return;
    s.ep = !0;
    const r = e(s);
    fetch(s.href, r);
  }
})();
/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */ const Ia = "180",
  Zi = { ROTATE: 0, DOLLY: 1, PAN: 2 },
  qi = { ROTATE: 0, PAN: 1, DOLLY_PAN: 2, DOLLY_ROTATE: 3 },
  Xh = 0,
  gc = 1,
  qh = 2,
  Ua = 1,
  Yh = 2,
  Un = 3,
  ii = 0,
  $e = 1,
  _n = 2,
  ti = 0,
  ji = 1,
  _c = 2,
  vc = 3,
  xc = 4,
  Kh = 5,
  gi = 100,
  Zh = 101,
  jh = 102,
  $h = 103,
  Jh = 104,
  Qh = 200,
  tu = 201,
  eu = 202,
  nu = 203,
  Io = 204,
  Uo = 205,
  iu = 206,
  su = 207,
  ru = 208,
  ou = 209,
  au = 210,
  cu = 211,
  lu = 212,
  hu = 213,
  uu = 214,
  No = 0,
  Fo = 1,
  Oo = 2,
  Qi = 3,
  zo = 4,
  ko = 5,
  Bo = 6,
  Ho = 7,
  zr = 0,
  du = 1,
  fu = 2,
  kn = 0,
  pu = 1,
  mu = 2,
  gu = 3,
  _u = 4,
  vu = 5,
  xu = 6,
  yu = 7,
  Bl = 300,
  ts = 301,
  es = 302,
  Go = 303,
  Vo = 304,
  kr = 306,
  Wo = 1e3,
  vi = 1001,
  Xo = 1002,
  on = 1003,
  Mu = 1004,
  ks = 1005,
  Ze = 1006,
  qr = 1007,
  xi = 1008,
  Tn = 1009,
  Hl = 1010,
  Gl = 1011,
  ws = 1012,
  Na = 1013,
  si = 1014,
  En = 1015,
  Fs = 1016,
  Fa = 1017,
  Oa = 1018,
  Ts = 1020,
  Vl = 35902,
  Wl = 35899,
  Xl = 1021,
  ql = 1022,
  xn = 1023,
  As = 1026,
  Rs = 1027,
  za = 1028,
  ka = 1029,
  Yl = 1030,
  Ba = 1031,
  Ha = 1033,
  mr = 33776,
  gr = 33777,
  _r = 33778,
  vr = 33779,
  qo = 35840,
  Yo = 35841,
  Ko = 35842,
  Zo = 35843,
  jo = 36196,
  $o = 37492,
  Jo = 37496,
  Qo = 37808,
  ta = 37809,
  ea = 37810,
  na = 37811,
  ia = 37812,
  sa = 37813,
  ra = 37814,
  oa = 37815,
  aa = 37816,
  ca = 37817,
  la = 37818,
  ha = 37819,
  ua = 37820,
  da = 37821,
  fa = 36492,
  pa = 36494,
  ma = 36495,
  ga = 36283,
  _a = 36284,
  va = 36285,
  xa = 36286,
  Su = 3200,
  bu = 3201,
  Ga = 0,
  Eu = 1,
  Jn = "",
  Ve = "srgb",
  ns = "srgb-linear",
  Er = "linear",
  ce = "srgb",
  Di = 7680,
  yc = 519,
  wu = 512,
  Tu = 513,
  Au = 514,
  Kl = 515,
  Ru = 516,
  Cu = 517,
  Pu = 518,
  Du = 519,
  Mc = 35044,
  Lu = 35048,
  Sc = "300 es",
  wn = 2e3,
  wr = 2001;
class Ei {
  addEventListener(t, e) {
    this._listeners === void 0 && (this._listeners = {});
    const n = this._listeners;
    (n[t] === void 0 && (n[t] = []), n[t].indexOf(e) === -1 && n[t].push(e));
  }
  hasEventListener(t, e) {
    const n = this._listeners;
    return n === void 0 ? !1 : n[t] !== void 0 && n[t].indexOf(e) !== -1;
  }
  removeEventListener(t, e) {
    const n = this._listeners;
    if (n === void 0) return;
    const s = n[t];
    if (s !== void 0) {
      const r = s.indexOf(e);
      r !== -1 && s.splice(r, 1);
    }
  }
  dispatchEvent(t) {
    const e = this._listeners;
    if (e === void 0) return;
    const n = e[t.type];
    if (n !== void 0) {
      t.target = this;
      const s = n.slice(0);
      for (let r = 0, o = s.length; r < o; r++) s[r].call(this, t);
      t.target = null;
    }
  }
}
const Oe = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "0a",
    "0b",
    "0c",
    "0d",
    "0e",
    "0f",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "1a",
    "1b",
    "1c",
    "1d",
    "1e",
    "1f",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "2a",
    "2b",
    "2c",
    "2d",
    "2e",
    "2f",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "3a",
    "3b",
    "3c",
    "3d",
    "3e",
    "3f",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "4a",
    "4b",
    "4c",
    "4d",
    "4e",
    "4f",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "59",
    "5a",
    "5b",
    "5c",
    "5d",
    "5e",
    "5f",
    "60",
    "61",
    "62",
    "63",
    "64",
    "65",
    "66",
    "67",
    "68",
    "69",
    "6a",
    "6b",
    "6c",
    "6d",
    "6e",
    "6f",
    "70",
    "71",
    "72",
    "73",
    "74",
    "75",
    "76",
    "77",
    "78",
    "79",
    "7a",
    "7b",
    "7c",
    "7d",
    "7e",
    "7f",
    "80",
    "81",
    "82",
    "83",
    "84",
    "85",
    "86",
    "87",
    "88",
    "89",
    "8a",
    "8b",
    "8c",
    "8d",
    "8e",
    "8f",
    "90",
    "91",
    "92",
    "93",
    "94",
    "95",
    "96",
    "97",
    "98",
    "99",
    "9a",
    "9b",
    "9c",
    "9d",
    "9e",
    "9f",
    "a0",
    "a1",
    "a2",
    "a3",
    "a4",
    "a5",
    "a6",
    "a7",
    "a8",
    "a9",
    "aa",
    "ab",
    "ac",
    "ad",
    "ae",
    "af",
    "b0",
    "b1",
    "b2",
    "b3",
    "b4",
    "b5",
    "b6",
    "b7",
    "b8",
    "b9",
    "ba",
    "bb",
    "bc",
    "bd",
    "be",
    "bf",
    "c0",
    "c1",
    "c2",
    "c3",
    "c4",
    "c5",
    "c6",
    "c7",
    "c8",
    "c9",
    "ca",
    "cb",
    "cc",
    "cd",
    "ce",
    "cf",
    "d0",
    "d1",
    "d2",
    "d3",
    "d4",
    "d5",
    "d6",
    "d7",
    "d8",
    "d9",
    "da",
    "db",
    "dc",
    "dd",
    "de",
    "df",
    "e0",
    "e1",
    "e2",
    "e3",
    "e4",
    "e5",
    "e6",
    "e7",
    "e8",
    "e9",
    "ea",
    "eb",
    "ec",
    "ed",
    "ee",
    "ef",
    "f0",
    "f1",
    "f2",
    "f3",
    "f4",
    "f5",
    "f6",
    "f7",
    "f8",
    "f9",
    "fa",
    "fb",
    "fc",
    "fd",
    "fe",
    "ff",
  ],
  xr = Math.PI / 180,
  ya = 180 / Math.PI;
function as() {
  const i = (Math.random() * 4294967295) | 0,
    t = (Math.random() * 4294967295) | 0,
    e = (Math.random() * 4294967295) | 0,
    n = (Math.random() * 4294967295) | 0;
  return (
    Oe[i & 255] +
    Oe[(i >> 8) & 255] +
    Oe[(i >> 16) & 255] +
    Oe[(i >> 24) & 255] +
    "-" +
    Oe[t & 255] +
    Oe[(t >> 8) & 255] +
    "-" +
    Oe[((t >> 16) & 15) | 64] +
    Oe[(t >> 24) & 255] +
    "-" +
    Oe[(e & 63) | 128] +
    Oe[(e >> 8) & 255] +
    "-" +
    Oe[(e >> 16) & 255] +
    Oe[(e >> 24) & 255] +
    Oe[n & 255] +
    Oe[(n >> 8) & 255] +
    Oe[(n >> 16) & 255] +
    Oe[(n >> 24) & 255]
  ).toLowerCase();
}
function Xt(i, t, e) {
  return Math.max(t, Math.min(e, i));
}
function Iu(i, t) {
  return ((i % t) + t) % t;
}
function Yr(i, t, e) {
  return (1 - e) * i + e * t;
}
function fs(i, t) {
  switch (t.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return i / 4294967295;
    case Uint16Array:
      return i / 65535;
    case Uint8Array:
      return i / 255;
    case Int32Array:
      return Math.max(i / 2147483647, -1);
    case Int16Array:
      return Math.max(i / 32767, -1);
    case Int8Array:
      return Math.max(i / 127, -1);
    default:
      throw new Error("Invalid component type.");
  }
}
function Ye(i, t) {
  switch (t.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return Math.round(i * 4294967295);
    case Uint16Array:
      return Math.round(i * 65535);
    case Uint8Array:
      return Math.round(i * 255);
    case Int32Array:
      return Math.round(i * 2147483647);
    case Int16Array:
      return Math.round(i * 32767);
    case Int8Array:
      return Math.round(i * 127);
    default:
      throw new Error("Invalid component type.");
  }
}
const Uu = { DEG2RAD: xr };
class at {
  constructor(t = 0, e = 0) {
    ((at.prototype.isVector2 = !0), (this.x = t), (this.y = e));
  }
  get width() {
    return this.x;
  }
  set width(t) {
    this.x = t;
  }
  get height() {
    return this.y;
  }
  set height(t) {
    this.y = t;
  }
  set(t, e) {
    return ((this.x = t), (this.y = e), this);
  }
  setScalar(t) {
    return ((this.x = t), (this.y = t), this);
  }
  setX(t) {
    return ((this.x = t), this);
  }
  setY(t) {
    return ((this.y = t), this);
  }
  setComponent(t, e) {
    switch (t) {
      case 0:
        this.x = e;
        break;
      case 1:
        this.y = e;
        break;
      default:
        throw new Error("index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(t) {
    return ((this.x = t.x), (this.y = t.y), this);
  }
  add(t) {
    return ((this.x += t.x), (this.y += t.y), this);
  }
  addScalar(t) {
    return ((this.x += t), (this.y += t), this);
  }
  addVectors(t, e) {
    return ((this.x = t.x + e.x), (this.y = t.y + e.y), this);
  }
  addScaledVector(t, e) {
    return ((this.x += t.x * e), (this.y += t.y * e), this);
  }
  sub(t) {
    return ((this.x -= t.x), (this.y -= t.y), this);
  }
  subScalar(t) {
    return ((this.x -= t), (this.y -= t), this);
  }
  subVectors(t, e) {
    return ((this.x = t.x - e.x), (this.y = t.y - e.y), this);
  }
  multiply(t) {
    return ((this.x *= t.x), (this.y *= t.y), this);
  }
  multiplyScalar(t) {
    return ((this.x *= t), (this.y *= t), this);
  }
  divide(t) {
    return ((this.x /= t.x), (this.y /= t.y), this);
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  applyMatrix3(t) {
    const e = this.x,
      n = this.y,
      s = t.elements;
    return (
      (this.x = s[0] * e + s[3] * n + s[6]),
      (this.y = s[1] * e + s[4] * n + s[7]),
      this
    );
  }
  min(t) {
    return (
      (this.x = Math.min(this.x, t.x)),
      (this.y = Math.min(this.y, t.y)),
      this
    );
  }
  max(t) {
    return (
      (this.x = Math.max(this.x, t.x)),
      (this.y = Math.max(this.y, t.y)),
      this
    );
  }
  clamp(t, e) {
    return (
      (this.x = Xt(this.x, t.x, e.x)),
      (this.y = Xt(this.y, t.y, e.y)),
      this
    );
  }
  clampScalar(t, e) {
    return ((this.x = Xt(this.x, t, e)), (this.y = Xt(this.y, t, e)), this);
  }
  clampLength(t, e) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Xt(n, t, e));
  }
  floor() {
    return ((this.x = Math.floor(this.x)), (this.y = Math.floor(this.y)), this);
  }
  ceil() {
    return ((this.x = Math.ceil(this.x)), (this.y = Math.ceil(this.y)), this);
  }
  round() {
    return ((this.x = Math.round(this.x)), (this.y = Math.round(this.y)), this);
  }
  roundToZero() {
    return ((this.x = Math.trunc(this.x)), (this.y = Math.trunc(this.y)), this);
  }
  negate() {
    return ((this.x = -this.x), (this.y = -this.y), this);
  }
  dot(t) {
    return this.x * t.x + this.y * t.y;
  }
  cross(t) {
    return this.x * t.y - this.y * t.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  angleTo(t) {
    const e = Math.sqrt(this.lengthSq() * t.lengthSq());
    if (e === 0) return Math.PI / 2;
    const n = this.dot(t) / e;
    return Math.acos(Xt(n, -1, 1));
  }
  distanceTo(t) {
    return Math.sqrt(this.distanceToSquared(t));
  }
  distanceToSquared(t) {
    const e = this.x - t.x,
      n = this.y - t.y;
    return e * e + n * n;
  }
  manhattanDistanceTo(t) {
    return Math.abs(this.x - t.x) + Math.abs(this.y - t.y);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, e) {
    return (
      (this.x += (t.x - this.x) * e),
      (this.y += (t.y - this.y) * e),
      this
    );
  }
  lerpVectors(t, e, n) {
    return (
      (this.x = t.x + (e.x - t.x) * n),
      (this.y = t.y + (e.y - t.y) * n),
      this
    );
  }
  equals(t) {
    return t.x === this.x && t.y === this.y;
  }
  fromArray(t, e = 0) {
    return ((this.x = t[e]), (this.y = t[e + 1]), this);
  }
  toArray(t = [], e = 0) {
    return ((t[e] = this.x), (t[e + 1] = this.y), t);
  }
  fromBufferAttribute(t, e) {
    return ((this.x = t.getX(e)), (this.y = t.getY(e)), this);
  }
  rotateAround(t, e) {
    const n = Math.cos(e),
      s = Math.sin(e),
      r = this.x - t.x,
      o = this.y - t.y;
    return (
      (this.x = r * n - o * s + t.x),
      (this.y = r * s + o * n + t.y),
      this
    );
  }
  random() {
    return ((this.x = Math.random()), (this.y = Math.random()), this);
  }
  *[Symbol.iterator]() {
    (yield this.x, yield this.y);
  }
}
class ri {
  constructor(t = 0, e = 0, n = 0, s = 1) {
    ((this.isQuaternion = !0),
      (this._x = t),
      (this._y = e),
      (this._z = n),
      (this._w = s));
  }
  static slerpFlat(t, e, n, s, r, o, a) {
    let c = n[s + 0],
      l = n[s + 1],
      h = n[s + 2],
      u = n[s + 3];
    const d = r[o + 0],
      f = r[o + 1],
      m = r[o + 2],
      _ = r[o + 3];
    if (a === 0) {
      ((t[e + 0] = c), (t[e + 1] = l), (t[e + 2] = h), (t[e + 3] = u));
      return;
    }
    if (a === 1) {
      ((t[e + 0] = d), (t[e + 1] = f), (t[e + 2] = m), (t[e + 3] = _));
      return;
    }
    if (u !== _ || c !== d || l !== f || h !== m) {
      let g = 1 - a;
      const p = c * d + l * f + h * m + u * _,
        A = p >= 0 ? 1 : -1,
        b = 1 - p * p;
      if (b > Number.EPSILON) {
        const R = Math.sqrt(b),
          E = Math.atan2(R, p * A);
        ((g = Math.sin(g * E) / R), (a = Math.sin(a * E) / R));
      }
      const v = a * A;
      if (
        ((c = c * g + d * v),
        (l = l * g + f * v),
        (h = h * g + m * v),
        (u = u * g + _ * v),
        g === 1 - a)
      ) {
        const R = 1 / Math.sqrt(c * c + l * l + h * h + u * u);
        ((c *= R), (l *= R), (h *= R), (u *= R));
      }
    }
    ((t[e] = c), (t[e + 1] = l), (t[e + 2] = h), (t[e + 3] = u));
  }
  static multiplyQuaternionsFlat(t, e, n, s, r, o) {
    const a = n[s],
      c = n[s + 1],
      l = n[s + 2],
      h = n[s + 3],
      u = r[o],
      d = r[o + 1],
      f = r[o + 2],
      m = r[o + 3];
    return (
      (t[e] = a * m + h * u + c * f - l * d),
      (t[e + 1] = c * m + h * d + l * u - a * f),
      (t[e + 2] = l * m + h * f + a * d - c * u),
      (t[e + 3] = h * m - a * u - c * d - l * f),
      t
    );
  }
  get x() {
    return this._x;
  }
  set x(t) {
    ((this._x = t), this._onChangeCallback());
  }
  get y() {
    return this._y;
  }
  set y(t) {
    ((this._y = t), this._onChangeCallback());
  }
  get z() {
    return this._z;
  }
  set z(t) {
    ((this._z = t), this._onChangeCallback());
  }
  get w() {
    return this._w;
  }
  set w(t) {
    ((this._w = t), this._onChangeCallback());
  }
  set(t, e, n, s) {
    return (
      (this._x = t),
      (this._y = e),
      (this._z = n),
      (this._w = s),
      this._onChangeCallback(),
      this
    );
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(t) {
    return (
      (this._x = t.x),
      (this._y = t.y),
      (this._z = t.z),
      (this._w = t.w),
      this._onChangeCallback(),
      this
    );
  }
  setFromEuler(t, e = !0) {
    const n = t._x,
      s = t._y,
      r = t._z,
      o = t._order,
      a = Math.cos,
      c = Math.sin,
      l = a(n / 2),
      h = a(s / 2),
      u = a(r / 2),
      d = c(n / 2),
      f = c(s / 2),
      m = c(r / 2);
    switch (o) {
      case "XYZ":
        ((this._x = d * h * u + l * f * m),
          (this._y = l * f * u - d * h * m),
          (this._z = l * h * m + d * f * u),
          (this._w = l * h * u - d * f * m));
        break;
      case "YXZ":
        ((this._x = d * h * u + l * f * m),
          (this._y = l * f * u - d * h * m),
          (this._z = l * h * m - d * f * u),
          (this._w = l * h * u + d * f * m));
        break;
      case "ZXY":
        ((this._x = d * h * u - l * f * m),
          (this._y = l * f * u + d * h * m),
          (this._z = l * h * m + d * f * u),
          (this._w = l * h * u - d * f * m));
        break;
      case "ZYX":
        ((this._x = d * h * u - l * f * m),
          (this._y = l * f * u + d * h * m),
          (this._z = l * h * m - d * f * u),
          (this._w = l * h * u + d * f * m));
        break;
      case "YZX":
        ((this._x = d * h * u + l * f * m),
          (this._y = l * f * u + d * h * m),
          (this._z = l * h * m - d * f * u),
          (this._w = l * h * u - d * f * m));
        break;
      case "XZY":
        ((this._x = d * h * u - l * f * m),
          (this._y = l * f * u - d * h * m),
          (this._z = l * h * m + d * f * u),
          (this._w = l * h * u + d * f * m));
        break;
      default:
        console.warn(
          "THREE.Quaternion: .setFromEuler() encountered an unknown order: " +
            o,
        );
    }
    return (e === !0 && this._onChangeCallback(), this);
  }
  setFromAxisAngle(t, e) {
    const n = e / 2,
      s = Math.sin(n);
    return (
      (this._x = t.x * s),
      (this._y = t.y * s),
      (this._z = t.z * s),
      (this._w = Math.cos(n)),
      this._onChangeCallback(),
      this
    );
  }
  setFromRotationMatrix(t) {
    const e = t.elements,
      n = e[0],
      s = e[4],
      r = e[8],
      o = e[1],
      a = e[5],
      c = e[9],
      l = e[2],
      h = e[6],
      u = e[10],
      d = n + a + u;
    if (d > 0) {
      const f = 0.5 / Math.sqrt(d + 1);
      ((this._w = 0.25 / f),
        (this._x = (h - c) * f),
        (this._y = (r - l) * f),
        (this._z = (o - s) * f));
    } else if (n > a && n > u) {
      const f = 2 * Math.sqrt(1 + n - a - u);
      ((this._w = (h - c) / f),
        (this._x = 0.25 * f),
        (this._y = (s + o) / f),
        (this._z = (r + l) / f));
    } else if (a > u) {
      const f = 2 * Math.sqrt(1 + a - n - u);
      ((this._w = (r - l) / f),
        (this._x = (s + o) / f),
        (this._y = 0.25 * f),
        (this._z = (c + h) / f));
    } else {
      const f = 2 * Math.sqrt(1 + u - n - a);
      ((this._w = (o - s) / f),
        (this._x = (r + l) / f),
        (this._y = (c + h) / f),
        (this._z = 0.25 * f));
    }
    return (this._onChangeCallback(), this);
  }
  setFromUnitVectors(t, e) {
    let n = t.dot(e) + 1;
    return (
      n < 1e-8
        ? ((n = 0),
          Math.abs(t.x) > Math.abs(t.z)
            ? ((this._x = -t.y), (this._y = t.x), (this._z = 0), (this._w = n))
            : ((this._x = 0), (this._y = -t.z), (this._z = t.y), (this._w = n)))
        : ((this._x = t.y * e.z - t.z * e.y),
          (this._y = t.z * e.x - t.x * e.z),
          (this._z = t.x * e.y - t.y * e.x),
          (this._w = n)),
      this.normalize()
    );
  }
  angleTo(t) {
    return 2 * Math.acos(Math.abs(Xt(this.dot(t), -1, 1)));
  }
  rotateTowards(t, e) {
    const n = this.angleTo(t);
    if (n === 0) return this;
    const s = Math.min(1, e / n);
    return (this.slerp(t, s), this);
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return (
      (this._x *= -1),
      (this._y *= -1),
      (this._z *= -1),
      this._onChangeCallback(),
      this
    );
  }
  dot(t) {
    return this._x * t._x + this._y * t._y + this._z * t._z + this._w * t._w;
  }
  lengthSq() {
    return (
      this._x * this._x +
      this._y * this._y +
      this._z * this._z +
      this._w * this._w
    );
  }
  length() {
    return Math.sqrt(
      this._x * this._x +
        this._y * this._y +
        this._z * this._z +
        this._w * this._w,
    );
  }
  normalize() {
    let t = this.length();
    return (
      t === 0
        ? ((this._x = 0), (this._y = 0), (this._z = 0), (this._w = 1))
        : ((t = 1 / t),
          (this._x = this._x * t),
          (this._y = this._y * t),
          (this._z = this._z * t),
          (this._w = this._w * t)),
      this._onChangeCallback(),
      this
    );
  }
  multiply(t) {
    return this.multiplyQuaternions(this, t);
  }
  premultiply(t) {
    return this.multiplyQuaternions(t, this);
  }
  multiplyQuaternions(t, e) {
    const n = t._x,
      s = t._y,
      r = t._z,
      o = t._w,
      a = e._x,
      c = e._y,
      l = e._z,
      h = e._w;
    return (
      (this._x = n * h + o * a + s * l - r * c),
      (this._y = s * h + o * c + r * a - n * l),
      (this._z = r * h + o * l + n * c - s * a),
      (this._w = o * h - n * a - s * c - r * l),
      this._onChangeCallback(),
      this
    );
  }
  slerp(t, e) {
    if (e === 0) return this;
    if (e === 1) return this.copy(t);
    const n = this._x,
      s = this._y,
      r = this._z,
      o = this._w;
    let a = o * t._w + n * t._x + s * t._y + r * t._z;
    if (
      (a < 0
        ? ((this._w = -t._w),
          (this._x = -t._x),
          (this._y = -t._y),
          (this._z = -t._z),
          (a = -a))
        : this.copy(t),
      a >= 1)
    )
      return ((this._w = o), (this._x = n), (this._y = s), (this._z = r), this);
    const c = 1 - a * a;
    if (c <= Number.EPSILON) {
      const f = 1 - e;
      return (
        (this._w = f * o + e * this._w),
        (this._x = f * n + e * this._x),
        (this._y = f * s + e * this._y),
        (this._z = f * r + e * this._z),
        this.normalize(),
        this
      );
    }
    const l = Math.sqrt(c),
      h = Math.atan2(l, a),
      u = Math.sin((1 - e) * h) / l,
      d = Math.sin(e * h) / l;
    return (
      (this._w = o * u + this._w * d),
      (this._x = n * u + this._x * d),
      (this._y = s * u + this._y * d),
      (this._z = r * u + this._z * d),
      this._onChangeCallback(),
      this
    );
  }
  slerpQuaternions(t, e, n) {
    return this.copy(t).slerp(e, n);
  }
  random() {
    const t = 2 * Math.PI * Math.random(),
      e = 2 * Math.PI * Math.random(),
      n = Math.random(),
      s = Math.sqrt(1 - n),
      r = Math.sqrt(n);
    return this.set(
      s * Math.sin(t),
      s * Math.cos(t),
      r * Math.sin(e),
      r * Math.cos(e),
    );
  }
  equals(t) {
    return (
      t._x === this._x &&
      t._y === this._y &&
      t._z === this._z &&
      t._w === this._w
    );
  }
  fromArray(t, e = 0) {
    return (
      (this._x = t[e]),
      (this._y = t[e + 1]),
      (this._z = t[e + 2]),
      (this._w = t[e + 3]),
      this._onChangeCallback(),
      this
    );
  }
  toArray(t = [], e = 0) {
    return (
      (t[e] = this._x),
      (t[e + 1] = this._y),
      (t[e + 2] = this._z),
      (t[e + 3] = this._w),
      t
    );
  }
  fromBufferAttribute(t, e) {
    return (
      (this._x = t.getX(e)),
      (this._y = t.getY(e)),
      (this._z = t.getZ(e)),
      (this._w = t.getW(e)),
      this._onChangeCallback(),
      this
    );
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(t) {
    return ((this._onChangeCallback = t), this);
  }
  _onChangeCallback() {}
  *[Symbol.iterator]() {
    (yield this._x, yield this._y, yield this._z, yield this._w);
  }
}
class P {
  constructor(t = 0, e = 0, n = 0) {
    ((P.prototype.isVector3 = !0), (this.x = t), (this.y = e), (this.z = n));
  }
  set(t, e, n) {
    return (
      n === void 0 && (n = this.z),
      (this.x = t),
      (this.y = e),
      (this.z = n),
      this
    );
  }
  setScalar(t) {
    return ((this.x = t), (this.y = t), (this.z = t), this);
  }
  setX(t) {
    return ((this.x = t), this);
  }
  setY(t) {
    return ((this.y = t), this);
  }
  setZ(t) {
    return ((this.z = t), this);
  }
  setComponent(t, e) {
    switch (t) {
      case 0:
        this.x = e;
        break;
      case 1:
        this.y = e;
        break;
      case 2:
        this.z = e;
        break;
      default:
        throw new Error("index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(t) {
    return ((this.x = t.x), (this.y = t.y), (this.z = t.z), this);
  }
  add(t) {
    return ((this.x += t.x), (this.y += t.y), (this.z += t.z), this);
  }
  addScalar(t) {
    return ((this.x += t), (this.y += t), (this.z += t), this);
  }
  addVectors(t, e) {
    return (
      (this.x = t.x + e.x),
      (this.y = t.y + e.y),
      (this.z = t.z + e.z),
      this
    );
  }
  addScaledVector(t, e) {
    return (
      (this.x += t.x * e),
      (this.y += t.y * e),
      (this.z += t.z * e),
      this
    );
  }
  sub(t) {
    return ((this.x -= t.x), (this.y -= t.y), (this.z -= t.z), this);
  }
  subScalar(t) {
    return ((this.x -= t), (this.y -= t), (this.z -= t), this);
  }
  subVectors(t, e) {
    return (
      (this.x = t.x - e.x),
      (this.y = t.y - e.y),
      (this.z = t.z - e.z),
      this
    );
  }
  multiply(t) {
    return ((this.x *= t.x), (this.y *= t.y), (this.z *= t.z), this);
  }
  multiplyScalar(t) {
    return ((this.x *= t), (this.y *= t), (this.z *= t), this);
  }
  multiplyVectors(t, e) {
    return (
      (this.x = t.x * e.x),
      (this.y = t.y * e.y),
      (this.z = t.z * e.z),
      this
    );
  }
  applyEuler(t) {
    return this.applyQuaternion(bc.setFromEuler(t));
  }
  applyAxisAngle(t, e) {
    return this.applyQuaternion(bc.setFromAxisAngle(t, e));
  }
  applyMatrix3(t) {
    const e = this.x,
      n = this.y,
      s = this.z,
      r = t.elements;
    return (
      (this.x = r[0] * e + r[3] * n + r[6] * s),
      (this.y = r[1] * e + r[4] * n + r[7] * s),
      (this.z = r[2] * e + r[5] * n + r[8] * s),
      this
    );
  }
  applyNormalMatrix(t) {
    return this.applyMatrix3(t).normalize();
  }
  applyMatrix4(t) {
    const e = this.x,
      n = this.y,
      s = this.z,
      r = t.elements,
      o = 1 / (r[3] * e + r[7] * n + r[11] * s + r[15]);
    return (
      (this.x = (r[0] * e + r[4] * n + r[8] * s + r[12]) * o),
      (this.y = (r[1] * e + r[5] * n + r[9] * s + r[13]) * o),
      (this.z = (r[2] * e + r[6] * n + r[10] * s + r[14]) * o),
      this
    );
  }
  applyQuaternion(t) {
    const e = this.x,
      n = this.y,
      s = this.z,
      r = t.x,
      o = t.y,
      a = t.z,
      c = t.w,
      l = 2 * (o * s - a * n),
      h = 2 * (a * e - r * s),
      u = 2 * (r * n - o * e);
    return (
      (this.x = e + c * l + o * u - a * h),
      (this.y = n + c * h + a * l - r * u),
      (this.z = s + c * u + r * h - o * l),
      this
    );
  }
  project(t) {
    return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(
      t.projectionMatrix,
    );
  }
  unproject(t) {
    return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(
      t.matrixWorld,
    );
  }
  transformDirection(t) {
    const e = this.x,
      n = this.y,
      s = this.z,
      r = t.elements;
    return (
      (this.x = r[0] * e + r[4] * n + r[8] * s),
      (this.y = r[1] * e + r[5] * n + r[9] * s),
      (this.z = r[2] * e + r[6] * n + r[10] * s),
      this.normalize()
    );
  }
  divide(t) {
    return ((this.x /= t.x), (this.y /= t.y), (this.z /= t.z), this);
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  min(t) {
    return (
      (this.x = Math.min(this.x, t.x)),
      (this.y = Math.min(this.y, t.y)),
      (this.z = Math.min(this.z, t.z)),
      this
    );
  }
  max(t) {
    return (
      (this.x = Math.max(this.x, t.x)),
      (this.y = Math.max(this.y, t.y)),
      (this.z = Math.max(this.z, t.z)),
      this
    );
  }
  clamp(t, e) {
    return (
      (this.x = Xt(this.x, t.x, e.x)),
      (this.y = Xt(this.y, t.y, e.y)),
      (this.z = Xt(this.z, t.z, e.z)),
      this
    );
  }
  clampScalar(t, e) {
    return (
      (this.x = Xt(this.x, t, e)),
      (this.y = Xt(this.y, t, e)),
      (this.z = Xt(this.z, t, e)),
      this
    );
  }
  clampLength(t, e) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Xt(n, t, e));
  }
  floor() {
    return (
      (this.x = Math.floor(this.x)),
      (this.y = Math.floor(this.y)),
      (this.z = Math.floor(this.z)),
      this
    );
  }
  ceil() {
    return (
      (this.x = Math.ceil(this.x)),
      (this.y = Math.ceil(this.y)),
      (this.z = Math.ceil(this.z)),
      this
    );
  }
  round() {
    return (
      (this.x = Math.round(this.x)),
      (this.y = Math.round(this.y)),
      (this.z = Math.round(this.z)),
      this
    );
  }
  roundToZero() {
    return (
      (this.x = Math.trunc(this.x)),
      (this.y = Math.trunc(this.y)),
      (this.z = Math.trunc(this.z)),
      this
    );
  }
  negate() {
    return ((this.x = -this.x), (this.y = -this.y), (this.z = -this.z), this);
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, e) {
    return (
      (this.x += (t.x - this.x) * e),
      (this.y += (t.y - this.y) * e),
      (this.z += (t.z - this.z) * e),
      this
    );
  }
  lerpVectors(t, e, n) {
    return (
      (this.x = t.x + (e.x - t.x) * n),
      (this.y = t.y + (e.y - t.y) * n),
      (this.z = t.z + (e.z - t.z) * n),
      this
    );
  }
  cross(t) {
    return this.crossVectors(this, t);
  }
  crossVectors(t, e) {
    const n = t.x,
      s = t.y,
      r = t.z,
      o = e.x,
      a = e.y,
      c = e.z;
    return (
      (this.x = s * c - r * a),
      (this.y = r * o - n * c),
      (this.z = n * a - s * o),
      this
    );
  }
  projectOnVector(t) {
    const e = t.lengthSq();
    if (e === 0) return this.set(0, 0, 0);
    const n = t.dot(this) / e;
    return this.copy(t).multiplyScalar(n);
  }
  projectOnPlane(t) {
    return (Kr.copy(this).projectOnVector(t), this.sub(Kr));
  }
  reflect(t) {
    return this.sub(Kr.copy(t).multiplyScalar(2 * this.dot(t)));
  }
  angleTo(t) {
    const e = Math.sqrt(this.lengthSq() * t.lengthSq());
    if (e === 0) return Math.PI / 2;
    const n = this.dot(t) / e;
    return Math.acos(Xt(n, -1, 1));
  }
  distanceTo(t) {
    return Math.sqrt(this.distanceToSquared(t));
  }
  distanceToSquared(t) {
    const e = this.x - t.x,
      n = this.y - t.y,
      s = this.z - t.z;
    return e * e + n * n + s * s;
  }
  manhattanDistanceTo(t) {
    return (
      Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z)
    );
  }
  setFromSpherical(t) {
    return this.setFromSphericalCoords(t.radius, t.phi, t.theta);
  }
  setFromSphericalCoords(t, e, n) {
    const s = Math.sin(e) * t;
    return (
      (this.x = s * Math.sin(n)),
      (this.y = Math.cos(e) * t),
      (this.z = s * Math.cos(n)),
      this
    );
  }
  setFromCylindrical(t) {
    return this.setFromCylindricalCoords(t.radius, t.theta, t.y);
  }
  setFromCylindricalCoords(t, e, n) {
    return (
      (this.x = t * Math.sin(e)),
      (this.y = n),
      (this.z = t * Math.cos(e)),
      this
    );
  }
  setFromMatrixPosition(t) {
    const e = t.elements;
    return ((this.x = e[12]), (this.y = e[13]), (this.z = e[14]), this);
  }
  setFromMatrixScale(t) {
    const e = this.setFromMatrixColumn(t, 0).length(),
      n = this.setFromMatrixColumn(t, 1).length(),
      s = this.setFromMatrixColumn(t, 2).length();
    return ((this.x = e), (this.y = n), (this.z = s), this);
  }
  setFromMatrixColumn(t, e) {
    return this.fromArray(t.elements, e * 4);
  }
  setFromMatrix3Column(t, e) {
    return this.fromArray(t.elements, e * 3);
  }
  setFromEuler(t) {
    return ((this.x = t._x), (this.y = t._y), (this.z = t._z), this);
  }
  setFromColor(t) {
    return ((this.x = t.r), (this.y = t.g), (this.z = t.b), this);
  }
  equals(t) {
    return t.x === this.x && t.y === this.y && t.z === this.z;
  }
  fromArray(t, e = 0) {
    return ((this.x = t[e]), (this.y = t[e + 1]), (this.z = t[e + 2]), this);
  }
  toArray(t = [], e = 0) {
    return ((t[e] = this.x), (t[e + 1] = this.y), (t[e + 2] = this.z), t);
  }
  fromBufferAttribute(t, e) {
    return (
      (this.x = t.getX(e)),
      (this.y = t.getY(e)),
      (this.z = t.getZ(e)),
      this
    );
  }
  random() {
    return (
      (this.x = Math.random()),
      (this.y = Math.random()),
      (this.z = Math.random()),
      this
    );
  }
  randomDirection() {
    const t = Math.random() * Math.PI * 2,
      e = Math.random() * 2 - 1,
      n = Math.sqrt(1 - e * e);
    return (
      (this.x = n * Math.cos(t)),
      (this.y = e),
      (this.z = n * Math.sin(t)),
      this
    );
  }
  *[Symbol.iterator]() {
    (yield this.x, yield this.y, yield this.z);
  }
}
const Kr = new P(),
  bc = new ri();
class Vt {
  constructor(t, e, n, s, r, o, a, c, l) {
    ((Vt.prototype.isMatrix3 = !0),
      (this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1]),
      t !== void 0 && this.set(t, e, n, s, r, o, a, c, l));
  }
  set(t, e, n, s, r, o, a, c, l) {
    const h = this.elements;
    return (
      (h[0] = t),
      (h[1] = s),
      (h[2] = a),
      (h[3] = e),
      (h[4] = r),
      (h[5] = c),
      (h[6] = n),
      (h[7] = o),
      (h[8] = l),
      this
    );
  }
  identity() {
    return (this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this);
  }
  copy(t) {
    const e = this.elements,
      n = t.elements;
    return (
      (e[0] = n[0]),
      (e[1] = n[1]),
      (e[2] = n[2]),
      (e[3] = n[3]),
      (e[4] = n[4]),
      (e[5] = n[5]),
      (e[6] = n[6]),
      (e[7] = n[7]),
      (e[8] = n[8]),
      this
    );
  }
  extractBasis(t, e, n) {
    return (
      t.setFromMatrix3Column(this, 0),
      e.setFromMatrix3Column(this, 1),
      n.setFromMatrix3Column(this, 2),
      this
    );
  }
  setFromMatrix4(t) {
    const e = t.elements;
    return (
      this.set(e[0], e[4], e[8], e[1], e[5], e[9], e[2], e[6], e[10]),
      this
    );
  }
  multiply(t) {
    return this.multiplyMatrices(this, t);
  }
  premultiply(t) {
    return this.multiplyMatrices(t, this);
  }
  multiplyMatrices(t, e) {
    const n = t.elements,
      s = e.elements,
      r = this.elements,
      o = n[0],
      a = n[3],
      c = n[6],
      l = n[1],
      h = n[4],
      u = n[7],
      d = n[2],
      f = n[5],
      m = n[8],
      _ = s[0],
      g = s[3],
      p = s[6],
      A = s[1],
      b = s[4],
      v = s[7],
      R = s[2],
      E = s[5],
      C = s[8];
    return (
      (r[0] = o * _ + a * A + c * R),
      (r[3] = o * g + a * b + c * E),
      (r[6] = o * p + a * v + c * C),
      (r[1] = l * _ + h * A + u * R),
      (r[4] = l * g + h * b + u * E),
      (r[7] = l * p + h * v + u * C),
      (r[2] = d * _ + f * A + m * R),
      (r[5] = d * g + f * b + m * E),
      (r[8] = d * p + f * v + m * C),
      this
    );
  }
  multiplyScalar(t) {
    const e = this.elements;
    return (
      (e[0] *= t),
      (e[3] *= t),
      (e[6] *= t),
      (e[1] *= t),
      (e[4] *= t),
      (e[7] *= t),
      (e[2] *= t),
      (e[5] *= t),
      (e[8] *= t),
      this
    );
  }
  determinant() {
    const t = this.elements,
      e = t[0],
      n = t[1],
      s = t[2],
      r = t[3],
      o = t[4],
      a = t[5],
      c = t[6],
      l = t[7],
      h = t[8];
    return (
      e * o * h - e * a * l - n * r * h + n * a * c + s * r * l - s * o * c
    );
  }
  invert() {
    const t = this.elements,
      e = t[0],
      n = t[1],
      s = t[2],
      r = t[3],
      o = t[4],
      a = t[5],
      c = t[6],
      l = t[7],
      h = t[8],
      u = h * o - a * l,
      d = a * c - h * r,
      f = l * r - o * c,
      m = e * u + n * d + s * f;
    if (m === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const _ = 1 / m;
    return (
      (t[0] = u * _),
      (t[1] = (s * l - h * n) * _),
      (t[2] = (a * n - s * o) * _),
      (t[3] = d * _),
      (t[4] = (h * e - s * c) * _),
      (t[5] = (s * r - a * e) * _),
      (t[6] = f * _),
      (t[7] = (n * c - l * e) * _),
      (t[8] = (o * e - n * r) * _),
      this
    );
  }
  transpose() {
    let t;
    const e = this.elements;
    return (
      (t = e[1]),
      (e[1] = e[3]),
      (e[3] = t),
      (t = e[2]),
      (e[2] = e[6]),
      (e[6] = t),
      (t = e[5]),
      (e[5] = e[7]),
      (e[7] = t),
      this
    );
  }
  getNormalMatrix(t) {
    return this.setFromMatrix4(t).invert().transpose();
  }
  transposeIntoArray(t) {
    const e = this.elements;
    return (
      (t[0] = e[0]),
      (t[1] = e[3]),
      (t[2] = e[6]),
      (t[3] = e[1]),
      (t[4] = e[4]),
      (t[5] = e[7]),
      (t[6] = e[2]),
      (t[7] = e[5]),
      (t[8] = e[8]),
      this
    );
  }
  setUvTransform(t, e, n, s, r, o, a) {
    const c = Math.cos(r),
      l = Math.sin(r);
    return (
      this.set(
        n * c,
        n * l,
        -n * (c * o + l * a) + o + t,
        -s * l,
        s * c,
        -s * (-l * o + c * a) + a + e,
        0,
        0,
        1,
      ),
      this
    );
  }
  scale(t, e) {
    return (this.premultiply(Zr.makeScale(t, e)), this);
  }
  rotate(t) {
    return (this.premultiply(Zr.makeRotation(-t)), this);
  }
  translate(t, e) {
    return (this.premultiply(Zr.makeTranslation(t, e)), this);
  }
  makeTranslation(t, e) {
    return (
      t.isVector2
        ? this.set(1, 0, t.x, 0, 1, t.y, 0, 0, 1)
        : this.set(1, 0, t, 0, 1, e, 0, 0, 1),
      this
    );
  }
  makeRotation(t) {
    const e = Math.cos(t),
      n = Math.sin(t);
    return (this.set(e, -n, 0, n, e, 0, 0, 0, 1), this);
  }
  makeScale(t, e) {
    return (this.set(t, 0, 0, 0, e, 0, 0, 0, 1), this);
  }
  equals(t) {
    const e = this.elements,
      n = t.elements;
    for (let s = 0; s < 9; s++) if (e[s] !== n[s]) return !1;
    return !0;
  }
  fromArray(t, e = 0) {
    for (let n = 0; n < 9; n++) this.elements[n] = t[n + e];
    return this;
  }
  toArray(t = [], e = 0) {
    const n = this.elements;
    return (
      (t[e] = n[0]),
      (t[e + 1] = n[1]),
      (t[e + 2] = n[2]),
      (t[e + 3] = n[3]),
      (t[e + 4] = n[4]),
      (t[e + 5] = n[5]),
      (t[e + 6] = n[6]),
      (t[e + 7] = n[7]),
      (t[e + 8] = n[8]),
      t
    );
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
const Zr = new Vt();
function Zl(i) {
  for (let t = i.length - 1; t >= 0; --t) if (i[t] >= 65535) return !0;
  return !1;
}
function Tr(i) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", i);
}
function Nu() {
  const i = Tr("canvas");
  return ((i.style.display = "block"), i);
}
const Ec = {};
function Cs(i) {
  i in Ec || ((Ec[i] = !0), console.warn(i));
}
function Fu(i, t, e) {
  return new Promise(function (n, s) {
    function r() {
      switch (i.clientWaitSync(t, i.SYNC_FLUSH_COMMANDS_BIT, 0)) {
        case i.WAIT_FAILED:
          s();
          break;
        case i.TIMEOUT_EXPIRED:
          setTimeout(r, e);
          break;
        default:
          n();
      }
    }
    setTimeout(r, e);
  });
}
const wc = new Vt().set(
    0.4123908,
    0.3575843,
    0.1804808,
    0.212639,
    0.7151687,
    0.0721923,
    0.0193308,
    0.1191948,
    0.9505322,
  ),
  Tc = new Vt().set(
    3.2409699,
    -1.5373832,
    -0.4986108,
    -0.9692436,
    1.8759675,
    0.0415551,
    0.0556301,
    -0.203977,
    1.0569715,
  );
function Ou() {
  const i = {
      enabled: !0,
      workingColorSpace: ns,
      spaces: {},
      convert: function (s, r, o) {
        return (
          this.enabled === !1 ||
            r === o ||
            !r ||
            !o ||
            (this.spaces[r].transfer === ce &&
              ((s.r = Bn(s.r)), (s.g = Bn(s.g)), (s.b = Bn(s.b))),
            this.spaces[r].primaries !== this.spaces[o].primaries &&
              (s.applyMatrix3(this.spaces[r].toXYZ),
              s.applyMatrix3(this.spaces[o].fromXYZ)),
            this.spaces[o].transfer === ce &&
              ((s.r = $i(s.r)), (s.g = $i(s.g)), (s.b = $i(s.b)))),
          s
        );
      },
      workingToColorSpace: function (s, r) {
        return this.convert(s, this.workingColorSpace, r);
      },
      colorSpaceToWorking: function (s, r) {
        return this.convert(s, r, this.workingColorSpace);
      },
      getPrimaries: function (s) {
        return this.spaces[s].primaries;
      },
      getTransfer: function (s) {
        return s === Jn ? Er : this.spaces[s].transfer;
      },
      getToneMappingMode: function (s) {
        return (
          this.spaces[s].outputColorSpaceConfig.toneMappingMode || "standard"
        );
      },
      getLuminanceCoefficients: function (s, r = this.workingColorSpace) {
        return s.fromArray(this.spaces[r].luminanceCoefficients);
      },
      define: function (s) {
        Object.assign(this.spaces, s);
      },
      _getMatrix: function (s, r, o) {
        return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ);
      },
      _getDrawingBufferColorSpace: function (s) {
        return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace;
      },
      _getUnpackColorSpace: function (s = this.workingColorSpace) {
        return this.spaces[s].workingColorSpaceConfig.unpackColorSpace;
      },
      fromWorkingColorSpace: function (s, r) {
        return (
          Cs(
            "THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().",
          ),
          i.workingToColorSpace(s, r)
        );
      },
      toWorkingColorSpace: function (s, r) {
        return (
          Cs(
            "THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().",
          ),
          i.colorSpaceToWorking(s, r)
        );
      },
    },
    t = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06],
    e = [0.2126, 0.7152, 0.0722],
    n = [0.3127, 0.329];
  return (
    i.define({
      [ns]: {
        primaries: t,
        whitePoint: n,
        transfer: Er,
        toXYZ: wc,
        fromXYZ: Tc,
        luminanceCoefficients: e,
        workingColorSpaceConfig: { unpackColorSpace: Ve },
        outputColorSpaceConfig: { drawingBufferColorSpace: Ve },
      },
      [Ve]: {
        primaries: t,
        whitePoint: n,
        transfer: ce,
        toXYZ: wc,
        fromXYZ: Tc,
        luminanceCoefficients: e,
        outputColorSpaceConfig: { drawingBufferColorSpace: Ve },
      },
    }),
    i
  );
}
const ee = Ou();
function Bn(i) {
  return i < 0.04045
    ? i * 0.0773993808
    : Math.pow(i * 0.9478672986 + 0.0521327014, 2.4);
}
function $i(i) {
  return i < 0.0031308 ? i * 12.92 : 1.055 * Math.pow(i, 0.41666) - 0.055;
}
let Li;
class zu {
  static getDataURL(t, e = "image/png") {
    if (/^data:/i.test(t.src) || typeof HTMLCanvasElement > "u") return t.src;
    let n;
    if (t instanceof HTMLCanvasElement) n = t;
    else {
      (Li === void 0 && (Li = Tr("canvas")),
        (Li.width = t.width),
        (Li.height = t.height));
      const s = Li.getContext("2d");
      (t instanceof ImageData
        ? s.putImageData(t, 0, 0)
        : s.drawImage(t, 0, 0, t.width, t.height),
        (n = Li));
    }
    return n.toDataURL(e);
  }
  static sRGBToLinear(t) {
    if (
      (typeof HTMLImageElement < "u" && t instanceof HTMLImageElement) ||
      (typeof HTMLCanvasElement < "u" && t instanceof HTMLCanvasElement) ||
      (typeof ImageBitmap < "u" && t instanceof ImageBitmap)
    ) {
      const e = Tr("canvas");
      ((e.width = t.width), (e.height = t.height));
      const n = e.getContext("2d");
      n.drawImage(t, 0, 0, t.width, t.height);
      const s = n.getImageData(0, 0, t.width, t.height),
        r = s.data;
      for (let o = 0; o < r.length; o++) r[o] = Bn(r[o] / 255) * 255;
      return (n.putImageData(s, 0, 0), e);
    } else if (t.data) {
      const e = t.data.slice(0);
      for (let n = 0; n < e.length; n++)
        e instanceof Uint8Array || e instanceof Uint8ClampedArray
          ? (e[n] = Math.floor(Bn(e[n] / 255) * 255))
          : (e[n] = Bn(e[n]));
      return { data: e, width: t.width, height: t.height };
    } else
      return (
        console.warn(
          "THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.",
        ),
        t
      );
  }
}
let ku = 0;
class Va {
  constructor(t = null) {
    ((this.isSource = !0),
      Object.defineProperty(this, "id", { value: ku++ }),
      (this.uuid = as()),
      (this.data = t),
      (this.dataReady = !0),
      (this.version = 0));
  }
  getSize(t) {
    const e = this.data;
    return (
      typeof HTMLVideoElement < "u" && e instanceof HTMLVideoElement
        ? t.set(e.videoWidth, e.videoHeight, 0)
        : e instanceof VideoFrame
          ? t.set(e.displayHeight, e.displayWidth, 0)
          : e !== null
            ? t.set(e.width, e.height, e.depth || 0)
            : t.set(0, 0, 0),
      t
    );
  }
  set needsUpdate(t) {
    t === !0 && this.version++;
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == "string";
    if (!e && t.images[this.uuid] !== void 0) return t.images[this.uuid];
    const n = { uuid: this.uuid, url: "" },
      s = this.data;
    if (s !== null) {
      let r;
      if (Array.isArray(s)) {
        r = [];
        for (let o = 0, a = s.length; o < a; o++)
          s[o].isDataTexture ? r.push(jr(s[o].image)) : r.push(jr(s[o]));
      } else r = jr(s);
      n.url = r;
    }
    return (e || (t.images[this.uuid] = n), n);
  }
}
function jr(i) {
  return (typeof HTMLImageElement < "u" && i instanceof HTMLImageElement) ||
    (typeof HTMLCanvasElement < "u" && i instanceof HTMLCanvasElement) ||
    (typeof ImageBitmap < "u" && i instanceof ImageBitmap)
    ? zu.getDataURL(i)
    : i.data
      ? {
          data: Array.from(i.data),
          width: i.width,
          height: i.height,
          type: i.data.constructor.name,
        }
      : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}
let Bu = 0;
const $r = new P();
class We extends Ei {
  constructor(
    t = We.DEFAULT_IMAGE,
    e = We.DEFAULT_MAPPING,
    n = vi,
    s = vi,
    r = Ze,
    o = xi,
    a = xn,
    c = Tn,
    l = We.DEFAULT_ANISOTROPY,
    h = Jn,
  ) {
    (super(),
      (this.isTexture = !0),
      Object.defineProperty(this, "id", { value: Bu++ }),
      (this.uuid = as()),
      (this.name = ""),
      (this.source = new Va(t)),
      (this.mipmaps = []),
      (this.mapping = e),
      (this.channel = 0),
      (this.wrapS = n),
      (this.wrapT = s),
      (this.magFilter = r),
      (this.minFilter = o),
      (this.anisotropy = l),
      (this.format = a),
      (this.internalFormat = null),
      (this.type = c),
      (this.offset = new at(0, 0)),
      (this.repeat = new at(1, 1)),
      (this.center = new at(0, 0)),
      (this.rotation = 0),
      (this.matrixAutoUpdate = !0),
      (this.matrix = new Vt()),
      (this.generateMipmaps = !0),
      (this.premultiplyAlpha = !1),
      (this.flipY = !0),
      (this.unpackAlignment = 4),
      (this.colorSpace = h),
      (this.userData = {}),
      (this.updateRanges = []),
      (this.version = 0),
      (this.onUpdate = null),
      (this.renderTarget = null),
      (this.isRenderTargetTexture = !1),
      (this.isArrayTexture = !!(t && t.depth && t.depth > 1)),
      (this.pmremVersion = 0));
  }
  get width() {
    return this.source.getSize($r).x;
  }
  get height() {
    return this.source.getSize($r).y;
  }
  get depth() {
    return this.source.getSize($r).z;
  }
  get image() {
    return this.source.data;
  }
  set image(t = null) {
    this.source.data = t;
  }
  updateMatrix() {
    this.matrix.setUvTransform(
      this.offset.x,
      this.offset.y,
      this.repeat.x,
      this.repeat.y,
      this.rotation,
      this.center.x,
      this.center.y,
    );
  }
  addUpdateRange(t, e) {
    this.updateRanges.push({ start: t, count: e });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return (
      (this.name = t.name),
      (this.source = t.source),
      (this.mipmaps = t.mipmaps.slice(0)),
      (this.mapping = t.mapping),
      (this.channel = t.channel),
      (this.wrapS = t.wrapS),
      (this.wrapT = t.wrapT),
      (this.magFilter = t.magFilter),
      (this.minFilter = t.minFilter),
      (this.anisotropy = t.anisotropy),
      (this.format = t.format),
      (this.internalFormat = t.internalFormat),
      (this.type = t.type),
      this.offset.copy(t.offset),
      this.repeat.copy(t.repeat),
      this.center.copy(t.center),
      (this.rotation = t.rotation),
      (this.matrixAutoUpdate = t.matrixAutoUpdate),
      this.matrix.copy(t.matrix),
      (this.generateMipmaps = t.generateMipmaps),
      (this.premultiplyAlpha = t.premultiplyAlpha),
      (this.flipY = t.flipY),
      (this.unpackAlignment = t.unpackAlignment),
      (this.colorSpace = t.colorSpace),
      (this.renderTarget = t.renderTarget),
      (this.isRenderTargetTexture = t.isRenderTargetTexture),
      (this.isArrayTexture = t.isArrayTexture),
      (this.userData = JSON.parse(JSON.stringify(t.userData))),
      (this.needsUpdate = !0),
      this
    );
  }
  setValues(t) {
    for (const e in t) {
      const n = t[e];
      if (n === void 0) {
        console.warn(
          `THREE.Texture.setValues(): parameter '${e}' has value of undefined.`,
        );
        continue;
      }
      const s = this[e];
      if (s === void 0) {
        console.warn(
          `THREE.Texture.setValues(): property '${e}' does not exist.`,
        );
        continue;
      }
      (s && n && s.isVector2 && n.isVector2) ||
      (s && n && s.isVector3 && n.isVector3) ||
      (s && n && s.isMatrix3 && n.isMatrix3)
        ? s.copy(n)
        : (this[e] = n);
    }
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == "string";
    if (!e && t.textures[this.uuid] !== void 0) return t.textures[this.uuid];
    const n = {
      metadata: { version: 4.7, type: "Texture", generator: "Texture.toJSON" },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(t).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment,
    };
    return (
      Object.keys(this.userData).length > 0 && (n.userData = this.userData),
      e || (t.textures[this.uuid] = n),
      n
    );
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  transformUv(t) {
    if (this.mapping !== Bl) return t;
    if ((t.applyMatrix3(this.matrix), t.x < 0 || t.x > 1))
      switch (this.wrapS) {
        case Wo:
          t.x = t.x - Math.floor(t.x);
          break;
        case vi:
          t.x = t.x < 0 ? 0 : 1;
          break;
        case Xo:
          Math.abs(Math.floor(t.x) % 2) === 1
            ? (t.x = Math.ceil(t.x) - t.x)
            : (t.x = t.x - Math.floor(t.x));
          break;
      }
    if (t.y < 0 || t.y > 1)
      switch (this.wrapT) {
        case Wo:
          t.y = t.y - Math.floor(t.y);
          break;
        case vi:
          t.y = t.y < 0 ? 0 : 1;
          break;
        case Xo:
          Math.abs(Math.floor(t.y) % 2) === 1
            ? (t.y = Math.ceil(t.y) - t.y)
            : (t.y = t.y - Math.floor(t.y));
          break;
      }
    return (this.flipY && (t.y = 1 - t.y), t);
  }
  set needsUpdate(t) {
    t === !0 && (this.version++, (this.source.needsUpdate = !0));
  }
  set needsPMREMUpdate(t) {
    t === !0 && this.pmremVersion++;
  }
}
We.DEFAULT_IMAGE = null;
We.DEFAULT_MAPPING = Bl;
We.DEFAULT_ANISOTROPY = 1;
class Ee {
  constructor(t = 0, e = 0, n = 0, s = 1) {
    ((Ee.prototype.isVector4 = !0),
      (this.x = t),
      (this.y = e),
      (this.z = n),
      (this.w = s));
  }
  get width() {
    return this.z;
  }
  set width(t) {
    this.z = t;
  }
  get height() {
    return this.w;
  }
  set height(t) {
    this.w = t;
  }
  set(t, e, n, s) {
    return ((this.x = t), (this.y = e), (this.z = n), (this.w = s), this);
  }
  setScalar(t) {
    return ((this.x = t), (this.y = t), (this.z = t), (this.w = t), this);
  }
  setX(t) {
    return ((this.x = t), this);
  }
  setY(t) {
    return ((this.y = t), this);
  }
  setZ(t) {
    return ((this.z = t), this);
  }
  setW(t) {
    return ((this.w = t), this);
  }
  setComponent(t, e) {
    switch (t) {
      case 0:
        this.x = e;
        break;
      case 1:
        this.y = e;
        break;
      case 2:
        this.z = e;
        break;
      case 3:
        this.w = e;
        break;
      default:
        throw new Error("index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(t) {
    return (
      (this.x = t.x),
      (this.y = t.y),
      (this.z = t.z),
      (this.w = t.w !== void 0 ? t.w : 1),
      this
    );
  }
  add(t) {
    return (
      (this.x += t.x),
      (this.y += t.y),
      (this.z += t.z),
      (this.w += t.w),
      this
    );
  }
  addScalar(t) {
    return ((this.x += t), (this.y += t), (this.z += t), (this.w += t), this);
  }
  addVectors(t, e) {
    return (
      (this.x = t.x + e.x),
      (this.y = t.y + e.y),
      (this.z = t.z + e.z),
      (this.w = t.w + e.w),
      this
    );
  }
  addScaledVector(t, e) {
    return (
      (this.x += t.x * e),
      (this.y += t.y * e),
      (this.z += t.z * e),
      (this.w += t.w * e),
      this
    );
  }
  sub(t) {
    return (
      (this.x -= t.x),
      (this.y -= t.y),
      (this.z -= t.z),
      (this.w -= t.w),
      this
    );
  }
  subScalar(t) {
    return ((this.x -= t), (this.y -= t), (this.z -= t), (this.w -= t), this);
  }
  subVectors(t, e) {
    return (
      (this.x = t.x - e.x),
      (this.y = t.y - e.y),
      (this.z = t.z - e.z),
      (this.w = t.w - e.w),
      this
    );
  }
  multiply(t) {
    return (
      (this.x *= t.x),
      (this.y *= t.y),
      (this.z *= t.z),
      (this.w *= t.w),
      this
    );
  }
  multiplyScalar(t) {
    return ((this.x *= t), (this.y *= t), (this.z *= t), (this.w *= t), this);
  }
  applyMatrix4(t) {
    const e = this.x,
      n = this.y,
      s = this.z,
      r = this.w,
      o = t.elements;
    return (
      (this.x = o[0] * e + o[4] * n + o[8] * s + o[12] * r),
      (this.y = o[1] * e + o[5] * n + o[9] * s + o[13] * r),
      (this.z = o[2] * e + o[6] * n + o[10] * s + o[14] * r),
      (this.w = o[3] * e + o[7] * n + o[11] * s + o[15] * r),
      this
    );
  }
  divide(t) {
    return (
      (this.x /= t.x),
      (this.y /= t.y),
      (this.z /= t.z),
      (this.w /= t.w),
      this
    );
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  setAxisAngleFromQuaternion(t) {
    this.w = 2 * Math.acos(t.w);
    const e = Math.sqrt(1 - t.w * t.w);
    return (
      e < 1e-4
        ? ((this.x = 1), (this.y = 0), (this.z = 0))
        : ((this.x = t.x / e), (this.y = t.y / e), (this.z = t.z / e)),
      this
    );
  }
  setAxisAngleFromRotationMatrix(t) {
    let e, n, s, r;
    const c = t.elements,
      l = c[0],
      h = c[4],
      u = c[8],
      d = c[1],
      f = c[5],
      m = c[9],
      _ = c[2],
      g = c[6],
      p = c[10];
    if (
      Math.abs(h - d) < 0.01 &&
      Math.abs(u - _) < 0.01 &&
      Math.abs(m - g) < 0.01
    ) {
      if (
        Math.abs(h + d) < 0.1 &&
        Math.abs(u + _) < 0.1 &&
        Math.abs(m + g) < 0.1 &&
        Math.abs(l + f + p - 3) < 0.1
      )
        return (this.set(1, 0, 0, 0), this);
      e = Math.PI;
      const b = (l + 1) / 2,
        v = (f + 1) / 2,
        R = (p + 1) / 2,
        E = (h + d) / 4,
        C = (u + _) / 4,
        L = (m + g) / 4;
      return (
        b > v && b > R
          ? b < 0.01
            ? ((n = 0), (s = 0.707106781), (r = 0.707106781))
            : ((n = Math.sqrt(b)), (s = E / n), (r = C / n))
          : v > R
            ? v < 0.01
              ? ((n = 0.707106781), (s = 0), (r = 0.707106781))
              : ((s = Math.sqrt(v)), (n = E / s), (r = L / s))
            : R < 0.01
              ? ((n = 0.707106781), (s = 0.707106781), (r = 0))
              : ((r = Math.sqrt(R)), (n = C / r), (s = L / r)),
        this.set(n, s, r, e),
        this
      );
    }
    let A = Math.sqrt(
      (g - m) * (g - m) + (u - _) * (u - _) + (d - h) * (d - h),
    );
    return (
      Math.abs(A) < 0.001 && (A = 1),
      (this.x = (g - m) / A),
      (this.y = (u - _) / A),
      (this.z = (d - h) / A),
      (this.w = Math.acos((l + f + p - 1) / 2)),
      this
    );
  }
  setFromMatrixPosition(t) {
    const e = t.elements;
    return (
      (this.x = e[12]),
      (this.y = e[13]),
      (this.z = e[14]),
      (this.w = e[15]),
      this
    );
  }
  min(t) {
    return (
      (this.x = Math.min(this.x, t.x)),
      (this.y = Math.min(this.y, t.y)),
      (this.z = Math.min(this.z, t.z)),
      (this.w = Math.min(this.w, t.w)),
      this
    );
  }
  max(t) {
    return (
      (this.x = Math.max(this.x, t.x)),
      (this.y = Math.max(this.y, t.y)),
      (this.z = Math.max(this.z, t.z)),
      (this.w = Math.max(this.w, t.w)),
      this
    );
  }
  clamp(t, e) {
    return (
      (this.x = Xt(this.x, t.x, e.x)),
      (this.y = Xt(this.y, t.y, e.y)),
      (this.z = Xt(this.z, t.z, e.z)),
      (this.w = Xt(this.w, t.w, e.w)),
      this
    );
  }
  clampScalar(t, e) {
    return (
      (this.x = Xt(this.x, t, e)),
      (this.y = Xt(this.y, t, e)),
      (this.z = Xt(this.z, t, e)),
      (this.w = Xt(this.w, t, e)),
      this
    );
  }
  clampLength(t, e) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Xt(n, t, e));
  }
  floor() {
    return (
      (this.x = Math.floor(this.x)),
      (this.y = Math.floor(this.y)),
      (this.z = Math.floor(this.z)),
      (this.w = Math.floor(this.w)),
      this
    );
  }
  ceil() {
    return (
      (this.x = Math.ceil(this.x)),
      (this.y = Math.ceil(this.y)),
      (this.z = Math.ceil(this.z)),
      (this.w = Math.ceil(this.w)),
      this
    );
  }
  round() {
    return (
      (this.x = Math.round(this.x)),
      (this.y = Math.round(this.y)),
      (this.z = Math.round(this.z)),
      (this.w = Math.round(this.w)),
      this
    );
  }
  roundToZero() {
    return (
      (this.x = Math.trunc(this.x)),
      (this.y = Math.trunc(this.y)),
      (this.z = Math.trunc(this.z)),
      (this.w = Math.trunc(this.w)),
      this
    );
  }
  negate() {
    return (
      (this.x = -this.x),
      (this.y = -this.y),
      (this.z = -this.z),
      (this.w = -this.w),
      this
    );
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w;
  }
  lengthSq() {
    return (
      this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    );
  }
  length() {
    return Math.sqrt(
      this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w,
    );
  }
  manhattanLength() {
    return (
      Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
    );
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, e) {
    return (
      (this.x += (t.x - this.x) * e),
      (this.y += (t.y - this.y) * e),
      (this.z += (t.z - this.z) * e),
      (this.w += (t.w - this.w) * e),
      this
    );
  }
  lerpVectors(t, e, n) {
    return (
      (this.x = t.x + (e.x - t.x) * n),
      (this.y = t.y + (e.y - t.y) * n),
      (this.z = t.z + (e.z - t.z) * n),
      (this.w = t.w + (e.w - t.w) * n),
      this
    );
  }
  equals(t) {
    return t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w;
  }
  fromArray(t, e = 0) {
    return (
      (this.x = t[e]),
      (this.y = t[e + 1]),
      (this.z = t[e + 2]),
      (this.w = t[e + 3]),
      this
    );
  }
  toArray(t = [], e = 0) {
    return (
      (t[e] = this.x),
      (t[e + 1] = this.y),
      (t[e + 2] = this.z),
      (t[e + 3] = this.w),
      t
    );
  }
  fromBufferAttribute(t, e) {
    return (
      (this.x = t.getX(e)),
      (this.y = t.getY(e)),
      (this.z = t.getZ(e)),
      (this.w = t.getW(e)),
      this
    );
  }
  random() {
    return (
      (this.x = Math.random()),
      (this.y = Math.random()),
      (this.z = Math.random()),
      (this.w = Math.random()),
      this
    );
  }
  *[Symbol.iterator]() {
    (yield this.x, yield this.y, yield this.z, yield this.w);
  }
}
class Hu extends Ei {
  constructor(t = 1, e = 1, n = {}) {
    (super(),
      (n = Object.assign(
        {
          generateMipmaps: !1,
          internalFormat: null,
          minFilter: Ze,
          depthBuffer: !0,
          stencilBuffer: !1,
          resolveDepthBuffer: !0,
          resolveStencilBuffer: !0,
          depthTexture: null,
          samples: 0,
          count: 1,
          depth: 1,
          multiview: !1,
        },
        n,
      )),
      (this.isRenderTarget = !0),
      (this.width = t),
      (this.height = e),
      (this.depth = n.depth),
      (this.scissor = new Ee(0, 0, t, e)),
      (this.scissorTest = !1),
      (this.viewport = new Ee(0, 0, t, e)));
    const s = { width: t, height: e, depth: n.depth },
      r = new We(s);
    this.textures = [];
    const o = n.count;
    for (let a = 0; a < o; a++)
      ((this.textures[a] = r.clone()),
        (this.textures[a].isRenderTargetTexture = !0),
        (this.textures[a].renderTarget = this));
    (this._setTextureOptions(n),
      (this.depthBuffer = n.depthBuffer),
      (this.stencilBuffer = n.stencilBuffer),
      (this.resolveDepthBuffer = n.resolveDepthBuffer),
      (this.resolveStencilBuffer = n.resolveStencilBuffer),
      (this._depthTexture = null),
      (this.depthTexture = n.depthTexture),
      (this.samples = n.samples),
      (this.multiview = n.multiview));
  }
  _setTextureOptions(t = {}) {
    const e = {
      minFilter: Ze,
      generateMipmaps: !1,
      flipY: !1,
      internalFormat: null,
    };
    (t.mapping !== void 0 && (e.mapping = t.mapping),
      t.wrapS !== void 0 && (e.wrapS = t.wrapS),
      t.wrapT !== void 0 && (e.wrapT = t.wrapT),
      t.wrapR !== void 0 && (e.wrapR = t.wrapR),
      t.magFilter !== void 0 && (e.magFilter = t.magFilter),
      t.minFilter !== void 0 && (e.minFilter = t.minFilter),
      t.format !== void 0 && (e.format = t.format),
      t.type !== void 0 && (e.type = t.type),
      t.anisotropy !== void 0 && (e.anisotropy = t.anisotropy),
      t.colorSpace !== void 0 && (e.colorSpace = t.colorSpace),
      t.flipY !== void 0 && (e.flipY = t.flipY),
      t.generateMipmaps !== void 0 && (e.generateMipmaps = t.generateMipmaps),
      t.internalFormat !== void 0 && (e.internalFormat = t.internalFormat));
    for (let n = 0; n < this.textures.length; n++)
      this.textures[n].setValues(e);
  }
  get texture() {
    return this.textures[0];
  }
  set texture(t) {
    this.textures[0] = t;
  }
  set depthTexture(t) {
    (this._depthTexture !== null && (this._depthTexture.renderTarget = null),
      t !== null && (t.renderTarget = this),
      (this._depthTexture = t));
  }
  get depthTexture() {
    return this._depthTexture;
  }
  setSize(t, e, n = 1) {
    if (this.width !== t || this.height !== e || this.depth !== n) {
      ((this.width = t), (this.height = e), (this.depth = n));
      for (let s = 0, r = this.textures.length; s < r; s++)
        ((this.textures[s].image.width = t),
          (this.textures[s].image.height = e),
          (this.textures[s].image.depth = n),
          (this.textures[s].isArrayTexture = this.textures[s].image.depth > 1));
      this.dispose();
    }
    (this.viewport.set(0, 0, t, e), this.scissor.set(0, 0, t, e));
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    ((this.width = t.width),
      (this.height = t.height),
      (this.depth = t.depth),
      this.scissor.copy(t.scissor),
      (this.scissorTest = t.scissorTest),
      this.viewport.copy(t.viewport),
      (this.textures.length = 0));
    for (let e = 0, n = t.textures.length; e < n; e++) {
      ((this.textures[e] = t.textures[e].clone()),
        (this.textures[e].isRenderTargetTexture = !0),
        (this.textures[e].renderTarget = this));
      const s = Object.assign({}, t.textures[e].image);
      this.textures[e].source = new Va(s);
    }
    return (
      (this.depthBuffer = t.depthBuffer),
      (this.stencilBuffer = t.stencilBuffer),
      (this.resolveDepthBuffer = t.resolveDepthBuffer),
      (this.resolveStencilBuffer = t.resolveStencilBuffer),
      t.depthTexture !== null && (this.depthTexture = t.depthTexture.clone()),
      (this.samples = t.samples),
      this
    );
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class Gn extends Hu {
  constructor(t = 1, e = 1, n = {}) {
    (super(t, e, n), (this.isWebGLRenderTarget = !0));
  }
}
class jl extends We {
  constructor(t = null, e = 1, n = 1, s = 1) {
    (super(null),
      (this.isDataArrayTexture = !0),
      (this.image = { data: t, width: e, height: n, depth: s }),
      (this.magFilter = on),
      (this.minFilter = on),
      (this.wrapR = vi),
      (this.generateMipmaps = !1),
      (this.flipY = !1),
      (this.unpackAlignment = 1),
      (this.layerUpdates = new Set()));
  }
  addLayerUpdate(t) {
    this.layerUpdates.add(t);
  }
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}
class Gu extends We {
  constructor(t = null, e = 1, n = 1, s = 1) {
    (super(null),
      (this.isData3DTexture = !0),
      (this.image = { data: t, width: e, height: n, depth: s }),
      (this.magFilter = on),
      (this.minFilter = on),
      (this.wrapR = vi),
      (this.generateMipmaps = !1),
      (this.flipY = !1),
      (this.unpackAlignment = 1));
  }
}
class wi {
  constructor(
    t = new P(1 / 0, 1 / 0, 1 / 0),
    e = new P(-1 / 0, -1 / 0, -1 / 0),
  ) {
    ((this.isBox3 = !0), (this.min = t), (this.max = e));
  }
  set(t, e) {
    return (this.min.copy(t), this.max.copy(e), this);
  }
  setFromArray(t) {
    this.makeEmpty();
    for (let e = 0, n = t.length; e < n; e += 3)
      this.expandByPoint(pn.fromArray(t, e));
    return this;
  }
  setFromBufferAttribute(t) {
    this.makeEmpty();
    for (let e = 0, n = t.count; e < n; e++)
      this.expandByPoint(pn.fromBufferAttribute(t, e));
    return this;
  }
  setFromPoints(t) {
    this.makeEmpty();
    for (let e = 0, n = t.length; e < n; e++) this.expandByPoint(t[e]);
    return this;
  }
  setFromCenterAndSize(t, e) {
    const n = pn.copy(e).multiplyScalar(0.5);
    return (this.min.copy(t).sub(n), this.max.copy(t).add(n), this);
  }
  setFromObject(t, e = !1) {
    return (this.makeEmpty(), this.expandByObject(t, e));
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return (this.min.copy(t.min), this.max.copy(t.max), this);
  }
  makeEmpty() {
    return (
      (this.min.x = this.min.y = this.min.z = 1 / 0),
      (this.max.x = this.max.y = this.max.z = -1 / 0),
      this
    );
  }
  isEmpty() {
    return (
      this.max.x < this.min.x ||
      this.max.y < this.min.y ||
      this.max.z < this.min.z
    );
  }
  getCenter(t) {
    return this.isEmpty()
      ? t.set(0, 0, 0)
      : t.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(t) {
    return this.isEmpty() ? t.set(0, 0, 0) : t.subVectors(this.max, this.min);
  }
  expandByPoint(t) {
    return (this.min.min(t), this.max.max(t), this);
  }
  expandByVector(t) {
    return (this.min.sub(t), this.max.add(t), this);
  }
  expandByScalar(t) {
    return (this.min.addScalar(-t), this.max.addScalar(t), this);
  }
  expandByObject(t, e = !1) {
    t.updateWorldMatrix(!1, !1);
    const n = t.geometry;
    if (n !== void 0) {
      const r = n.getAttribute("position");
      if (e === !0 && r !== void 0 && t.isInstancedMesh !== !0)
        for (let o = 0, a = r.count; o < a; o++)
          (t.isMesh === !0
            ? t.getVertexPosition(o, pn)
            : pn.fromBufferAttribute(r, o),
            pn.applyMatrix4(t.matrixWorld),
            this.expandByPoint(pn));
      else
        (t.boundingBox !== void 0
          ? (t.boundingBox === null && t.computeBoundingBox(),
            Bs.copy(t.boundingBox))
          : (n.boundingBox === null && n.computeBoundingBox(),
            Bs.copy(n.boundingBox)),
          Bs.applyMatrix4(t.matrixWorld),
          this.union(Bs));
    }
    const s = t.children;
    for (let r = 0, o = s.length; r < o; r++) this.expandByObject(s[r], e);
    return this;
  }
  containsPoint(t) {
    return (
      t.x >= this.min.x &&
      t.x <= this.max.x &&
      t.y >= this.min.y &&
      t.y <= this.max.y &&
      t.z >= this.min.z &&
      t.z <= this.max.z
    );
  }
  containsBox(t) {
    return (
      this.min.x <= t.min.x &&
      t.max.x <= this.max.x &&
      this.min.y <= t.min.y &&
      t.max.y <= this.max.y &&
      this.min.z <= t.min.z &&
      t.max.z <= this.max.z
    );
  }
  getParameter(t, e) {
    return e.set(
      (t.x - this.min.x) / (this.max.x - this.min.x),
      (t.y - this.min.y) / (this.max.y - this.min.y),
      (t.z - this.min.z) / (this.max.z - this.min.z),
    );
  }
  intersectsBox(t) {
    return (
      t.max.x >= this.min.x &&
      t.min.x <= this.max.x &&
      t.max.y >= this.min.y &&
      t.min.y <= this.max.y &&
      t.max.z >= this.min.z &&
      t.min.z <= this.max.z
    );
  }
  intersectsSphere(t) {
    return (
      this.clampPoint(t.center, pn),
      pn.distanceToSquared(t.center) <= t.radius * t.radius
    );
  }
  intersectsPlane(t) {
    let e, n;
    return (
      t.normal.x > 0
        ? ((e = t.normal.x * this.min.x), (n = t.normal.x * this.max.x))
        : ((e = t.normal.x * this.max.x), (n = t.normal.x * this.min.x)),
      t.normal.y > 0
        ? ((e += t.normal.y * this.min.y), (n += t.normal.y * this.max.y))
        : ((e += t.normal.y * this.max.y), (n += t.normal.y * this.min.y)),
      t.normal.z > 0
        ? ((e += t.normal.z * this.min.z), (n += t.normal.z * this.max.z))
        : ((e += t.normal.z * this.max.z), (n += t.normal.z * this.min.z)),
      e <= -t.constant && n >= -t.constant
    );
  }
  intersectsTriangle(t) {
    if (this.isEmpty()) return !1;
    (this.getCenter(ps),
      Hs.subVectors(this.max, ps),
      Ii.subVectors(t.a, ps),
      Ui.subVectors(t.b, ps),
      Ni.subVectors(t.c, ps),
      Wn.subVectors(Ui, Ii),
      Xn.subVectors(Ni, Ui),
      li.subVectors(Ii, Ni));
    let e = [
      0,
      -Wn.z,
      Wn.y,
      0,
      -Xn.z,
      Xn.y,
      0,
      -li.z,
      li.y,
      Wn.z,
      0,
      -Wn.x,
      Xn.z,
      0,
      -Xn.x,
      li.z,
      0,
      -li.x,
      -Wn.y,
      Wn.x,
      0,
      -Xn.y,
      Xn.x,
      0,
      -li.y,
      li.x,
      0,
    ];
    return !Jr(e, Ii, Ui, Ni, Hs) ||
      ((e = [1, 0, 0, 0, 1, 0, 0, 0, 1]), !Jr(e, Ii, Ui, Ni, Hs))
      ? !1
      : (Gs.crossVectors(Wn, Xn),
        (e = [Gs.x, Gs.y, Gs.z]),
        Jr(e, Ii, Ui, Ni, Hs));
  }
  clampPoint(t, e) {
    return e.copy(t).clamp(this.min, this.max);
  }
  distanceToPoint(t) {
    return this.clampPoint(t, pn).distanceTo(t);
  }
  getBoundingSphere(t) {
    return (
      this.isEmpty()
        ? t.makeEmpty()
        : (this.getCenter(t.center),
          (t.radius = this.getSize(pn).length() * 0.5)),
      t
    );
  }
  intersect(t) {
    return (
      this.min.max(t.min),
      this.max.min(t.max),
      this.isEmpty() && this.makeEmpty(),
      this
    );
  }
  union(t) {
    return (this.min.min(t.min), this.max.max(t.max), this);
  }
  applyMatrix4(t) {
    return this.isEmpty()
      ? this
      : (Cn[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t),
        Cn[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t),
        Cn[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t),
        Cn[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t),
        Cn[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t),
        Cn[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t),
        Cn[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t),
        Cn[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t),
        this.setFromPoints(Cn),
        this);
  }
  translate(t) {
    return (this.min.add(t), this.max.add(t), this);
  }
  equals(t) {
    return t.min.equals(this.min) && t.max.equals(this.max);
  }
  toJSON() {
    return { min: this.min.toArray(), max: this.max.toArray() };
  }
  fromJSON(t) {
    return (this.min.fromArray(t.min), this.max.fromArray(t.max), this);
  }
}
const Cn = [
    new P(),
    new P(),
    new P(),
    new P(),
    new P(),
    new P(),
    new P(),
    new P(),
  ],
  pn = new P(),
  Bs = new wi(),
  Ii = new P(),
  Ui = new P(),
  Ni = new P(),
  Wn = new P(),
  Xn = new P(),
  li = new P(),
  ps = new P(),
  Hs = new P(),
  Gs = new P(),
  hi = new P();
function Jr(i, t, e, n, s) {
  for (let r = 0, o = i.length - 3; r <= o; r += 3) {
    hi.fromArray(i, r);
    const a =
        s.x * Math.abs(hi.x) + s.y * Math.abs(hi.y) + s.z * Math.abs(hi.z),
      c = t.dot(hi),
      l = e.dot(hi),
      h = n.dot(hi);
    if (Math.max(-Math.max(c, l, h), Math.min(c, l, h)) > a) return !1;
  }
  return !0;
}
const Vu = new wi(),
  ms = new P(),
  Qr = new P();
class cs {
  constructor(t = new P(), e = -1) {
    ((this.isSphere = !0), (this.center = t), (this.radius = e));
  }
  set(t, e) {
    return (this.center.copy(t), (this.radius = e), this);
  }
  setFromPoints(t, e) {
    const n = this.center;
    e !== void 0 ? n.copy(e) : Vu.setFromPoints(t).getCenter(n);
    let s = 0;
    for (let r = 0, o = t.length; r < o; r++)
      s = Math.max(s, n.distanceToSquared(t[r]));
    return ((this.radius = Math.sqrt(s)), this);
  }
  copy(t) {
    return (this.center.copy(t.center), (this.radius = t.radius), this);
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return (this.center.set(0, 0, 0), (this.radius = -1), this);
  }
  containsPoint(t) {
    return t.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(t) {
    return t.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(t) {
    const e = this.radius + t.radius;
    return t.center.distanceToSquared(this.center) <= e * e;
  }
  intersectsBox(t) {
    return t.intersectsSphere(this);
  }
  intersectsPlane(t) {
    return Math.abs(t.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(t, e) {
    const n = this.center.distanceToSquared(t);
    return (
      e.copy(t),
      n > this.radius * this.radius &&
        (e.sub(this.center).normalize(),
        e.multiplyScalar(this.radius).add(this.center)),
      e
    );
  }
  getBoundingBox(t) {
    return this.isEmpty()
      ? (t.makeEmpty(), t)
      : (t.set(this.center, this.center), t.expandByScalar(this.radius), t);
  }
  applyMatrix4(t) {
    return (
      this.center.applyMatrix4(t),
      (this.radius = this.radius * t.getMaxScaleOnAxis()),
      this
    );
  }
  translate(t) {
    return (this.center.add(t), this);
  }
  expandByPoint(t) {
    if (this.isEmpty()) return (this.center.copy(t), (this.radius = 0), this);
    ms.subVectors(t, this.center);
    const e = ms.lengthSq();
    if (e > this.radius * this.radius) {
      const n = Math.sqrt(e),
        s = (n - this.radius) * 0.5;
      (this.center.addScaledVector(ms, s / n), (this.radius += s));
    }
    return this;
  }
  union(t) {
    return t.isEmpty()
      ? this
      : this.isEmpty()
        ? (this.copy(t), this)
        : (this.center.equals(t.center) === !0
            ? (this.radius = Math.max(this.radius, t.radius))
            : (Qr.subVectors(t.center, this.center).setLength(t.radius),
              this.expandByPoint(ms.copy(t.center).add(Qr)),
              this.expandByPoint(ms.copy(t.center).sub(Qr))),
          this);
  }
  equals(t) {
    return t.center.equals(this.center) && t.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    return { radius: this.radius, center: this.center.toArray() };
  }
  fromJSON(t) {
    return ((this.radius = t.radius), this.center.fromArray(t.center), this);
  }
}
const Pn = new P(),
  to = new P(),
  Vs = new P(),
  qn = new P(),
  eo = new P(),
  Ws = new P(),
  no = new P();
class Br {
  constructor(t = new P(), e = new P(0, 0, -1)) {
    ((this.origin = t), (this.direction = e));
  }
  set(t, e) {
    return (this.origin.copy(t), this.direction.copy(e), this);
  }
  copy(t) {
    return (this.origin.copy(t.origin), this.direction.copy(t.direction), this);
  }
  at(t, e) {
    return e.copy(this.origin).addScaledVector(this.direction, t);
  }
  lookAt(t) {
    return (this.direction.copy(t).sub(this.origin).normalize(), this);
  }
  recast(t) {
    return (this.origin.copy(this.at(t, Pn)), this);
  }
  closestPointToPoint(t, e) {
    e.subVectors(t, this.origin);
    const n = e.dot(this.direction);
    return n < 0
      ? e.copy(this.origin)
      : e.copy(this.origin).addScaledVector(this.direction, n);
  }
  distanceToPoint(t) {
    return Math.sqrt(this.distanceSqToPoint(t));
  }
  distanceSqToPoint(t) {
    const e = Pn.subVectors(t, this.origin).dot(this.direction);
    return e < 0
      ? this.origin.distanceToSquared(t)
      : (Pn.copy(this.origin).addScaledVector(this.direction, e),
        Pn.distanceToSquared(t));
  }
  distanceSqToSegment(t, e, n, s) {
    (to.copy(t).add(e).multiplyScalar(0.5),
      Vs.copy(e).sub(t).normalize(),
      qn.copy(this.origin).sub(to));
    const r = t.distanceTo(e) * 0.5,
      o = -this.direction.dot(Vs),
      a = qn.dot(this.direction),
      c = -qn.dot(Vs),
      l = qn.lengthSq(),
      h = Math.abs(1 - o * o);
    let u, d, f, m;
    if (h > 0)
      if (((u = o * c - a), (d = o * a - c), (m = r * h), u >= 0))
        if (d >= -m)
          if (d <= m) {
            const _ = 1 / h;
            ((u *= _),
              (d *= _),
              (f = u * (u + o * d + 2 * a) + d * (o * u + d + 2 * c) + l));
          } else
            ((d = r),
              (u = Math.max(0, -(o * d + a))),
              (f = -u * u + d * (d + 2 * c) + l));
        else
          ((d = -r),
            (u = Math.max(0, -(o * d + a))),
            (f = -u * u + d * (d + 2 * c) + l));
      else
        d <= -m
          ? ((u = Math.max(0, -(-o * r + a))),
            (d = u > 0 ? -r : Math.min(Math.max(-r, -c), r)),
            (f = -u * u + d * (d + 2 * c) + l))
          : d <= m
            ? ((u = 0),
              (d = Math.min(Math.max(-r, -c), r)),
              (f = d * (d + 2 * c) + l))
            : ((u = Math.max(0, -(o * r + a))),
              (d = u > 0 ? r : Math.min(Math.max(-r, -c), r)),
              (f = -u * u + d * (d + 2 * c) + l));
    else
      ((d = o > 0 ? -r : r),
        (u = Math.max(0, -(o * d + a))),
        (f = -u * u + d * (d + 2 * c) + l));
    return (
      n && n.copy(this.origin).addScaledVector(this.direction, u),
      s && s.copy(to).addScaledVector(Vs, d),
      f
    );
  }
  intersectSphere(t, e) {
    Pn.subVectors(t.center, this.origin);
    const n = Pn.dot(this.direction),
      s = Pn.dot(Pn) - n * n,
      r = t.radius * t.radius;
    if (s > r) return null;
    const o = Math.sqrt(r - s),
      a = n - o,
      c = n + o;
    return c < 0 ? null : a < 0 ? this.at(c, e) : this.at(a, e);
  }
  intersectsSphere(t) {
    return t.radius < 0
      ? !1
      : this.distanceSqToPoint(t.center) <= t.radius * t.radius;
  }
  distanceToPlane(t) {
    const e = t.normal.dot(this.direction);
    if (e === 0) return t.distanceToPoint(this.origin) === 0 ? 0 : null;
    const n = -(this.origin.dot(t.normal) + t.constant) / e;
    return n >= 0 ? n : null;
  }
  intersectPlane(t, e) {
    const n = this.distanceToPlane(t);
    return n === null ? null : this.at(n, e);
  }
  intersectsPlane(t) {
    const e = t.distanceToPoint(this.origin);
    return e === 0 || t.normal.dot(this.direction) * e < 0;
  }
  intersectBox(t, e) {
    let n, s, r, o, a, c;
    const l = 1 / this.direction.x,
      h = 1 / this.direction.y,
      u = 1 / this.direction.z,
      d = this.origin;
    return (
      l >= 0
        ? ((n = (t.min.x - d.x) * l), (s = (t.max.x - d.x) * l))
        : ((n = (t.max.x - d.x) * l), (s = (t.min.x - d.x) * l)),
      h >= 0
        ? ((r = (t.min.y - d.y) * h), (o = (t.max.y - d.y) * h))
        : ((r = (t.max.y - d.y) * h), (o = (t.min.y - d.y) * h)),
      n > o ||
      r > s ||
      ((r > n || isNaN(n)) && (n = r),
      (o < s || isNaN(s)) && (s = o),
      u >= 0
        ? ((a = (t.min.z - d.z) * u), (c = (t.max.z - d.z) * u))
        : ((a = (t.max.z - d.z) * u), (c = (t.min.z - d.z) * u)),
      n > c || a > s) ||
      ((a > n || n !== n) && (n = a), (c < s || s !== s) && (s = c), s < 0)
        ? null
        : this.at(n >= 0 ? n : s, e)
    );
  }
  intersectsBox(t) {
    return this.intersectBox(t, Pn) !== null;
  }
  intersectTriangle(t, e, n, s, r) {
    (eo.subVectors(e, t), Ws.subVectors(n, t), no.crossVectors(eo, Ws));
    let o = this.direction.dot(no),
      a;
    if (o > 0) {
      if (s) return null;
      a = 1;
    } else if (o < 0) ((a = -1), (o = -o));
    else return null;
    qn.subVectors(this.origin, t);
    const c = a * this.direction.dot(Ws.crossVectors(qn, Ws));
    if (c < 0) return null;
    const l = a * this.direction.dot(eo.cross(qn));
    if (l < 0 || c + l > o) return null;
    const h = -a * qn.dot(no);
    return h < 0 ? null : this.at(h / o, r);
  }
  applyMatrix4(t) {
    return (
      this.origin.applyMatrix4(t),
      this.direction.transformDirection(t),
      this
    );
  }
  equals(t) {
    return t.origin.equals(this.origin) && t.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class se {
  constructor(t, e, n, s, r, o, a, c, l, h, u, d, f, m, _, g) {
    ((se.prototype.isMatrix4 = !0),
      (this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
      t !== void 0 && this.set(t, e, n, s, r, o, a, c, l, h, u, d, f, m, _, g));
  }
  set(t, e, n, s, r, o, a, c, l, h, u, d, f, m, _, g) {
    const p = this.elements;
    return (
      (p[0] = t),
      (p[4] = e),
      (p[8] = n),
      (p[12] = s),
      (p[1] = r),
      (p[5] = o),
      (p[9] = a),
      (p[13] = c),
      (p[2] = l),
      (p[6] = h),
      (p[10] = u),
      (p[14] = d),
      (p[3] = f),
      (p[7] = m),
      (p[11] = _),
      (p[15] = g),
      this
    );
  }
  identity() {
    return (this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this);
  }
  clone() {
    return new se().fromArray(this.elements);
  }
  copy(t) {
    const e = this.elements,
      n = t.elements;
    return (
      (e[0] = n[0]),
      (e[1] = n[1]),
      (e[2] = n[2]),
      (e[3] = n[3]),
      (e[4] = n[4]),
      (e[5] = n[5]),
      (e[6] = n[6]),
      (e[7] = n[7]),
      (e[8] = n[8]),
      (e[9] = n[9]),
      (e[10] = n[10]),
      (e[11] = n[11]),
      (e[12] = n[12]),
      (e[13] = n[13]),
      (e[14] = n[14]),
      (e[15] = n[15]),
      this
    );
  }
  copyPosition(t) {
    const e = this.elements,
      n = t.elements;
    return ((e[12] = n[12]), (e[13] = n[13]), (e[14] = n[14]), this);
  }
  setFromMatrix3(t) {
    const e = t.elements;
    return (
      this.set(
        e[0],
        e[3],
        e[6],
        0,
        e[1],
        e[4],
        e[7],
        0,
        e[2],
        e[5],
        e[8],
        0,
        0,
        0,
        0,
        1,
      ),
      this
    );
  }
  extractBasis(t, e, n) {
    return (
      t.setFromMatrixColumn(this, 0),
      e.setFromMatrixColumn(this, 1),
      n.setFromMatrixColumn(this, 2),
      this
    );
  }
  makeBasis(t, e, n) {
    return (
      this.set(
        t.x,
        e.x,
        n.x,
        0,
        t.y,
        e.y,
        n.y,
        0,
        t.z,
        e.z,
        n.z,
        0,
        0,
        0,
        0,
        1,
      ),
      this
    );
  }
  extractRotation(t) {
    const e = this.elements,
      n = t.elements,
      s = 1 / Fi.setFromMatrixColumn(t, 0).length(),
      r = 1 / Fi.setFromMatrixColumn(t, 1).length(),
      o = 1 / Fi.setFromMatrixColumn(t, 2).length();
    return (
      (e[0] = n[0] * s),
      (e[1] = n[1] * s),
      (e[2] = n[2] * s),
      (e[3] = 0),
      (e[4] = n[4] * r),
      (e[5] = n[5] * r),
      (e[6] = n[6] * r),
      (e[7] = 0),
      (e[8] = n[8] * o),
      (e[9] = n[9] * o),
      (e[10] = n[10] * o),
      (e[11] = 0),
      (e[12] = 0),
      (e[13] = 0),
      (e[14] = 0),
      (e[15] = 1),
      this
    );
  }
  makeRotationFromEuler(t) {
    const e = this.elements,
      n = t.x,
      s = t.y,
      r = t.z,
      o = Math.cos(n),
      a = Math.sin(n),
      c = Math.cos(s),
      l = Math.sin(s),
      h = Math.cos(r),
      u = Math.sin(r);
    if (t.order === "XYZ") {
      const d = o * h,
        f = o * u,
        m = a * h,
        _ = a * u;
      ((e[0] = c * h),
        (e[4] = -c * u),
        (e[8] = l),
        (e[1] = f + m * l),
        (e[5] = d - _ * l),
        (e[9] = -a * c),
        (e[2] = _ - d * l),
        (e[6] = m + f * l),
        (e[10] = o * c));
    } else if (t.order === "YXZ") {
      const d = c * h,
        f = c * u,
        m = l * h,
        _ = l * u;
      ((e[0] = d + _ * a),
        (e[4] = m * a - f),
        (e[8] = o * l),
        (e[1] = o * u),
        (e[5] = o * h),
        (e[9] = -a),
        (e[2] = f * a - m),
        (e[6] = _ + d * a),
        (e[10] = o * c));
    } else if (t.order === "ZXY") {
      const d = c * h,
        f = c * u,
        m = l * h,
        _ = l * u;
      ((e[0] = d - _ * a),
        (e[4] = -o * u),
        (e[8] = m + f * a),
        (e[1] = f + m * a),
        (e[5] = o * h),
        (e[9] = _ - d * a),
        (e[2] = -o * l),
        (e[6] = a),
        (e[10] = o * c));
    } else if (t.order === "ZYX") {
      const d = o * h,
        f = o * u,
        m = a * h,
        _ = a * u;
      ((e[0] = c * h),
        (e[4] = m * l - f),
        (e[8] = d * l + _),
        (e[1] = c * u),
        (e[5] = _ * l + d),
        (e[9] = f * l - m),
        (e[2] = -l),
        (e[6] = a * c),
        (e[10] = o * c));
    } else if (t.order === "YZX") {
      const d = o * c,
        f = o * l,
        m = a * c,
        _ = a * l;
      ((e[0] = c * h),
        (e[4] = _ - d * u),
        (e[8] = m * u + f),
        (e[1] = u),
        (e[5] = o * h),
        (e[9] = -a * h),
        (e[2] = -l * h),
        (e[6] = f * u + m),
        (e[10] = d - _ * u));
    } else if (t.order === "XZY") {
      const d = o * c,
        f = o * l,
        m = a * c,
        _ = a * l;
      ((e[0] = c * h),
        (e[4] = -u),
        (e[8] = l * h),
        (e[1] = d * u + _),
        (e[5] = o * h),
        (e[9] = f * u - m),
        (e[2] = m * u - f),
        (e[6] = a * h),
        (e[10] = _ * u + d));
    }
    return (
      (e[3] = 0),
      (e[7] = 0),
      (e[11] = 0),
      (e[12] = 0),
      (e[13] = 0),
      (e[14] = 0),
      (e[15] = 1),
      this
    );
  }
  makeRotationFromQuaternion(t) {
    return this.compose(Wu, t, Xu);
  }
  lookAt(t, e, n) {
    const s = this.elements;
    return (
      nn.subVectors(t, e),
      nn.lengthSq() === 0 && (nn.z = 1),
      nn.normalize(),
      Yn.crossVectors(n, nn),
      Yn.lengthSq() === 0 &&
        (Math.abs(n.z) === 1 ? (nn.x += 1e-4) : (nn.z += 1e-4),
        nn.normalize(),
        Yn.crossVectors(n, nn)),
      Yn.normalize(),
      Xs.crossVectors(nn, Yn),
      (s[0] = Yn.x),
      (s[4] = Xs.x),
      (s[8] = nn.x),
      (s[1] = Yn.y),
      (s[5] = Xs.y),
      (s[9] = nn.y),
      (s[2] = Yn.z),
      (s[6] = Xs.z),
      (s[10] = nn.z),
      this
    );
  }
  multiply(t) {
    return this.multiplyMatrices(this, t);
  }
  premultiply(t) {
    return this.multiplyMatrices(t, this);
  }
  multiplyMatrices(t, e) {
    const n = t.elements,
      s = e.elements,
      r = this.elements,
      o = n[0],
      a = n[4],
      c = n[8],
      l = n[12],
      h = n[1],
      u = n[5],
      d = n[9],
      f = n[13],
      m = n[2],
      _ = n[6],
      g = n[10],
      p = n[14],
      A = n[3],
      b = n[7],
      v = n[11],
      R = n[15],
      E = s[0],
      C = s[4],
      L = s[8],
      y = s[12],
      M = s[1],
      w = s[5],
      I = s[9],
      F = s[13],
      B = s[2],
      k = s[6],
      G = s[10],
      Y = s[14],
      H = s[3],
      ct = s[7],
      pt = s[11],
      gt = s[15];
    return (
      (r[0] = o * E + a * M + c * B + l * H),
      (r[4] = o * C + a * w + c * k + l * ct),
      (r[8] = o * L + a * I + c * G + l * pt),
      (r[12] = o * y + a * F + c * Y + l * gt),
      (r[1] = h * E + u * M + d * B + f * H),
      (r[5] = h * C + u * w + d * k + f * ct),
      (r[9] = h * L + u * I + d * G + f * pt),
      (r[13] = h * y + u * F + d * Y + f * gt),
      (r[2] = m * E + _ * M + g * B + p * H),
      (r[6] = m * C + _ * w + g * k + p * ct),
      (r[10] = m * L + _ * I + g * G + p * pt),
      (r[14] = m * y + _ * F + g * Y + p * gt),
      (r[3] = A * E + b * M + v * B + R * H),
      (r[7] = A * C + b * w + v * k + R * ct),
      (r[11] = A * L + b * I + v * G + R * pt),
      (r[15] = A * y + b * F + v * Y + R * gt),
      this
    );
  }
  multiplyScalar(t) {
    const e = this.elements;
    return (
      (e[0] *= t),
      (e[4] *= t),
      (e[8] *= t),
      (e[12] *= t),
      (e[1] *= t),
      (e[5] *= t),
      (e[9] *= t),
      (e[13] *= t),
      (e[2] *= t),
      (e[6] *= t),
      (e[10] *= t),
      (e[14] *= t),
      (e[3] *= t),
      (e[7] *= t),
      (e[11] *= t),
      (e[15] *= t),
      this
    );
  }
  determinant() {
    const t = this.elements,
      e = t[0],
      n = t[4],
      s = t[8],
      r = t[12],
      o = t[1],
      a = t[5],
      c = t[9],
      l = t[13],
      h = t[2],
      u = t[6],
      d = t[10],
      f = t[14],
      m = t[3],
      _ = t[7],
      g = t[11],
      p = t[15];
    return (
      m *
        (+r * c * u -
          s * l * u -
          r * a * d +
          n * l * d +
          s * a * f -
          n * c * f) +
      _ *
        (+e * c * f -
          e * l * d +
          r * o * d -
          s * o * f +
          s * l * h -
          r * c * h) +
      g *
        (+e * l * u -
          e * a * f -
          r * o * u +
          n * o * f +
          r * a * h -
          n * l * h) +
      p *
        (-s * a * h - e * c * u + e * a * d + s * o * u - n * o * d + n * c * h)
    );
  }
  transpose() {
    const t = this.elements;
    let e;
    return (
      (e = t[1]),
      (t[1] = t[4]),
      (t[4] = e),
      (e = t[2]),
      (t[2] = t[8]),
      (t[8] = e),
      (e = t[6]),
      (t[6] = t[9]),
      (t[9] = e),
      (e = t[3]),
      (t[3] = t[12]),
      (t[12] = e),
      (e = t[7]),
      (t[7] = t[13]),
      (t[13] = e),
      (e = t[11]),
      (t[11] = t[14]),
      (t[14] = e),
      this
    );
  }
  setPosition(t, e, n) {
    const s = this.elements;
    return (
      t.isVector3
        ? ((s[12] = t.x), (s[13] = t.y), (s[14] = t.z))
        : ((s[12] = t), (s[13] = e), (s[14] = n)),
      this
    );
  }
  invert() {
    const t = this.elements,
      e = t[0],
      n = t[1],
      s = t[2],
      r = t[3],
      o = t[4],
      a = t[5],
      c = t[6],
      l = t[7],
      h = t[8],
      u = t[9],
      d = t[10],
      f = t[11],
      m = t[12],
      _ = t[13],
      g = t[14],
      p = t[15],
      A = u * g * l - _ * d * l + _ * c * f - a * g * f - u * c * p + a * d * p,
      b = m * d * l - h * g * l - m * c * f + o * g * f + h * c * p - o * d * p,
      v = h * _ * l - m * u * l + m * a * f - o * _ * f - h * a * p + o * u * p,
      R = m * u * c - h * _ * c - m * a * d + o * _ * d + h * a * g - o * u * g,
      E = e * A + n * b + s * v + r * R;
    if (E === 0)
      return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const C = 1 / E;
    return (
      (t[0] = A * C),
      (t[1] =
        (_ * d * r -
          u * g * r -
          _ * s * f +
          n * g * f +
          u * s * p -
          n * d * p) *
        C),
      (t[2] =
        (a * g * r -
          _ * c * r +
          _ * s * l -
          n * g * l -
          a * s * p +
          n * c * p) *
        C),
      (t[3] =
        (u * c * r -
          a * d * r -
          u * s * l +
          n * d * l +
          a * s * f -
          n * c * f) *
        C),
      (t[4] = b * C),
      (t[5] =
        (h * g * r -
          m * d * r +
          m * s * f -
          e * g * f -
          h * s * p +
          e * d * p) *
        C),
      (t[6] =
        (m * c * r -
          o * g * r -
          m * s * l +
          e * g * l +
          o * s * p -
          e * c * p) *
        C),
      (t[7] =
        (o * d * r -
          h * c * r +
          h * s * l -
          e * d * l -
          o * s * f +
          e * c * f) *
        C),
      (t[8] = v * C),
      (t[9] =
        (m * u * r -
          h * _ * r -
          m * n * f +
          e * _ * f +
          h * n * p -
          e * u * p) *
        C),
      (t[10] =
        (o * _ * r -
          m * a * r +
          m * n * l -
          e * _ * l -
          o * n * p +
          e * a * p) *
        C),
      (t[11] =
        (h * a * r -
          o * u * r -
          h * n * l +
          e * u * l +
          o * n * f -
          e * a * f) *
        C),
      (t[12] = R * C),
      (t[13] =
        (h * _ * s -
          m * u * s +
          m * n * d -
          e * _ * d -
          h * n * g +
          e * u * g) *
        C),
      (t[14] =
        (m * a * s -
          o * _ * s -
          m * n * c +
          e * _ * c +
          o * n * g -
          e * a * g) *
        C),
      (t[15] =
        (o * u * s -
          h * a * s +
          h * n * c -
          e * u * c -
          o * n * d +
          e * a * d) *
        C),
      this
    );
  }
  scale(t) {
    const e = this.elements,
      n = t.x,
      s = t.y,
      r = t.z;
    return (
      (e[0] *= n),
      (e[4] *= s),
      (e[8] *= r),
      (e[1] *= n),
      (e[5] *= s),
      (e[9] *= r),
      (e[2] *= n),
      (e[6] *= s),
      (e[10] *= r),
      (e[3] *= n),
      (e[7] *= s),
      (e[11] *= r),
      this
    );
  }
  getMaxScaleOnAxis() {
    const t = this.elements,
      e = t[0] * t[0] + t[1] * t[1] + t[2] * t[2],
      n = t[4] * t[4] + t[5] * t[5] + t[6] * t[6],
      s = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
    return Math.sqrt(Math.max(e, n, s));
  }
  makeTranslation(t, e, n) {
    return (
      t.isVector3
        ? this.set(1, 0, 0, t.x, 0, 1, 0, t.y, 0, 0, 1, t.z, 0, 0, 0, 1)
        : this.set(1, 0, 0, t, 0, 1, 0, e, 0, 0, 1, n, 0, 0, 0, 1),
      this
    );
  }
  makeRotationX(t) {
    const e = Math.cos(t),
      n = Math.sin(t);
    return (this.set(1, 0, 0, 0, 0, e, -n, 0, 0, n, e, 0, 0, 0, 0, 1), this);
  }
  makeRotationY(t) {
    const e = Math.cos(t),
      n = Math.sin(t);
    return (this.set(e, 0, n, 0, 0, 1, 0, 0, -n, 0, e, 0, 0, 0, 0, 1), this);
  }
  makeRotationZ(t) {
    const e = Math.cos(t),
      n = Math.sin(t);
    return (this.set(e, -n, 0, 0, n, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this);
  }
  makeRotationAxis(t, e) {
    const n = Math.cos(e),
      s = Math.sin(e),
      r = 1 - n,
      o = t.x,
      a = t.y,
      c = t.z,
      l = r * o,
      h = r * a;
    return (
      this.set(
        l * o + n,
        l * a - s * c,
        l * c + s * a,
        0,
        l * a + s * c,
        h * a + n,
        h * c - s * o,
        0,
        l * c - s * a,
        h * c + s * o,
        r * c * c + n,
        0,
        0,
        0,
        0,
        1,
      ),
      this
    );
  }
  makeScale(t, e, n) {
    return (this.set(t, 0, 0, 0, 0, e, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this);
  }
  makeShear(t, e, n, s, r, o) {
    return (this.set(1, n, r, 0, t, 1, o, 0, e, s, 1, 0, 0, 0, 0, 1), this);
  }
  compose(t, e, n) {
    const s = this.elements,
      r = e._x,
      o = e._y,
      a = e._z,
      c = e._w,
      l = r + r,
      h = o + o,
      u = a + a,
      d = r * l,
      f = r * h,
      m = r * u,
      _ = o * h,
      g = o * u,
      p = a * u,
      A = c * l,
      b = c * h,
      v = c * u,
      R = n.x,
      E = n.y,
      C = n.z;
    return (
      (s[0] = (1 - (_ + p)) * R),
      (s[1] = (f + v) * R),
      (s[2] = (m - b) * R),
      (s[3] = 0),
      (s[4] = (f - v) * E),
      (s[5] = (1 - (d + p)) * E),
      (s[6] = (g + A) * E),
      (s[7] = 0),
      (s[8] = (m + b) * C),
      (s[9] = (g - A) * C),
      (s[10] = (1 - (d + _)) * C),
      (s[11] = 0),
      (s[12] = t.x),
      (s[13] = t.y),
      (s[14] = t.z),
      (s[15] = 1),
      this
    );
  }
  decompose(t, e, n) {
    const s = this.elements;
    let r = Fi.set(s[0], s[1], s[2]).length();
    const o = Fi.set(s[4], s[5], s[6]).length(),
      a = Fi.set(s[8], s[9], s[10]).length();
    (this.determinant() < 0 && (r = -r),
      (t.x = s[12]),
      (t.y = s[13]),
      (t.z = s[14]),
      mn.copy(this));
    const l = 1 / r,
      h = 1 / o,
      u = 1 / a;
    return (
      (mn.elements[0] *= l),
      (mn.elements[1] *= l),
      (mn.elements[2] *= l),
      (mn.elements[4] *= h),
      (mn.elements[5] *= h),
      (mn.elements[6] *= h),
      (mn.elements[8] *= u),
      (mn.elements[9] *= u),
      (mn.elements[10] *= u),
      e.setFromRotationMatrix(mn),
      (n.x = r),
      (n.y = o),
      (n.z = a),
      this
    );
  }
  makePerspective(t, e, n, s, r, o, a = wn, c = !1) {
    const l = this.elements,
      h = (2 * r) / (e - t),
      u = (2 * r) / (n - s),
      d = (e + t) / (e - t),
      f = (n + s) / (n - s);
    let m, _;
    if (c) ((m = r / (o - r)), (_ = (o * r) / (o - r)));
    else if (a === wn) ((m = -(o + r) / (o - r)), (_ = (-2 * o * r) / (o - r)));
    else if (a === wr) ((m = -o / (o - r)), (_ = (-o * r) / (o - r)));
    else
      throw new Error(
        "THREE.Matrix4.makePerspective(): Invalid coordinate system: " + a,
      );
    return (
      (l[0] = h),
      (l[4] = 0),
      (l[8] = d),
      (l[12] = 0),
      (l[1] = 0),
      (l[5] = u),
      (l[9] = f),
      (l[13] = 0),
      (l[2] = 0),
      (l[6] = 0),
      (l[10] = m),
      (l[14] = _),
      (l[3] = 0),
      (l[7] = 0),
      (l[11] = -1),
      (l[15] = 0),
      this
    );
  }
  makeOrthographic(t, e, n, s, r, o, a = wn, c = !1) {
    const l = this.elements,
      h = 2 / (e - t),
      u = 2 / (n - s),
      d = -(e + t) / (e - t),
      f = -(n + s) / (n - s);
    let m, _;
    if (c) ((m = 1 / (o - r)), (_ = o / (o - r)));
    else if (a === wn) ((m = -2 / (o - r)), (_ = -(o + r) / (o - r)));
    else if (a === wr) ((m = -1 / (o - r)), (_ = -r / (o - r)));
    else
      throw new Error(
        "THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + a,
      );
    return (
      (l[0] = h),
      (l[4] = 0),
      (l[8] = 0),
      (l[12] = d),
      (l[1] = 0),
      (l[5] = u),
      (l[9] = 0),
      (l[13] = f),
      (l[2] = 0),
      (l[6] = 0),
      (l[10] = m),
      (l[14] = _),
      (l[3] = 0),
      (l[7] = 0),
      (l[11] = 0),
      (l[15] = 1),
      this
    );
  }
  equals(t) {
    const e = this.elements,
      n = t.elements;
    for (let s = 0; s < 16; s++) if (e[s] !== n[s]) return !1;
    return !0;
  }
  fromArray(t, e = 0) {
    for (let n = 0; n < 16; n++) this.elements[n] = t[n + e];
    return this;
  }
  toArray(t = [], e = 0) {
    const n = this.elements;
    return (
      (t[e] = n[0]),
      (t[e + 1] = n[1]),
      (t[e + 2] = n[2]),
      (t[e + 3] = n[3]),
      (t[e + 4] = n[4]),
      (t[e + 5] = n[5]),
      (t[e + 6] = n[6]),
      (t[e + 7] = n[7]),
      (t[e + 8] = n[8]),
      (t[e + 9] = n[9]),
      (t[e + 10] = n[10]),
      (t[e + 11] = n[11]),
      (t[e + 12] = n[12]),
      (t[e + 13] = n[13]),
      (t[e + 14] = n[14]),
      (t[e + 15] = n[15]),
      t
    );
  }
}
const Fi = new P(),
  mn = new se(),
  Wu = new P(0, 0, 0),
  Xu = new P(1, 1, 1),
  Yn = new P(),
  Xs = new P(),
  nn = new P(),
  Ac = new se(),
  Rc = new ri();
class yn {
  constructor(t = 0, e = 0, n = 0, s = yn.DEFAULT_ORDER) {
    ((this.isEuler = !0),
      (this._x = t),
      (this._y = e),
      (this._z = n),
      (this._order = s));
  }
  get x() {
    return this._x;
  }
  set x(t) {
    ((this._x = t), this._onChangeCallback());
  }
  get y() {
    return this._y;
  }
  set y(t) {
    ((this._y = t), this._onChangeCallback());
  }
  get z() {
    return this._z;
  }
  set z(t) {
    ((this._z = t), this._onChangeCallback());
  }
  get order() {
    return this._order;
  }
  set order(t) {
    ((this._order = t), this._onChangeCallback());
  }
  set(t, e, n, s = this._order) {
    return (
      (this._x = t),
      (this._y = e),
      (this._z = n),
      (this._order = s),
      this._onChangeCallback(),
      this
    );
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(t) {
    return (
      (this._x = t._x),
      (this._y = t._y),
      (this._z = t._z),
      (this._order = t._order),
      this._onChangeCallback(),
      this
    );
  }
  setFromRotationMatrix(t, e = this._order, n = !0) {
    const s = t.elements,
      r = s[0],
      o = s[4],
      a = s[8],
      c = s[1],
      l = s[5],
      h = s[9],
      u = s[2],
      d = s[6],
      f = s[10];
    switch (e) {
      case "XYZ":
        ((this._y = Math.asin(Xt(a, -1, 1))),
          Math.abs(a) < 0.9999999
            ? ((this._x = Math.atan2(-h, f)), (this._z = Math.atan2(-o, r)))
            : ((this._x = Math.atan2(d, l)), (this._z = 0)));
        break;
      case "YXZ":
        ((this._x = Math.asin(-Xt(h, -1, 1))),
          Math.abs(h) < 0.9999999
            ? ((this._y = Math.atan2(a, f)), (this._z = Math.atan2(c, l)))
            : ((this._y = Math.atan2(-u, r)), (this._z = 0)));
        break;
      case "ZXY":
        ((this._x = Math.asin(Xt(d, -1, 1))),
          Math.abs(d) < 0.9999999
            ? ((this._y = Math.atan2(-u, f)), (this._z = Math.atan2(-o, l)))
            : ((this._y = 0), (this._z = Math.atan2(c, r))));
        break;
      case "ZYX":
        ((this._y = Math.asin(-Xt(u, -1, 1))),
          Math.abs(u) < 0.9999999
            ? ((this._x = Math.atan2(d, f)), (this._z = Math.atan2(c, r)))
            : ((this._x = 0), (this._z = Math.atan2(-o, l))));
        break;
      case "YZX":
        ((this._z = Math.asin(Xt(c, -1, 1))),
          Math.abs(c) < 0.9999999
            ? ((this._x = Math.atan2(-h, l)), (this._y = Math.atan2(-u, r)))
            : ((this._x = 0), (this._y = Math.atan2(a, f))));
        break;
      case "XZY":
        ((this._z = Math.asin(-Xt(o, -1, 1))),
          Math.abs(o) < 0.9999999
            ? ((this._x = Math.atan2(d, l)), (this._y = Math.atan2(a, r)))
            : ((this._x = Math.atan2(-h, f)), (this._y = 0)));
        break;
      default:
        console.warn(
          "THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " +
            e,
        );
    }
    return ((this._order = e), n === !0 && this._onChangeCallback(), this);
  }
  setFromQuaternion(t, e, n) {
    return (
      Ac.makeRotationFromQuaternion(t),
      this.setFromRotationMatrix(Ac, e, n)
    );
  }
  setFromVector3(t, e = this._order) {
    return this.set(t.x, t.y, t.z, e);
  }
  reorder(t) {
    return (Rc.setFromEuler(this), this.setFromQuaternion(Rc, t));
  }
  equals(t) {
    return (
      t._x === this._x &&
      t._y === this._y &&
      t._z === this._z &&
      t._order === this._order
    );
  }
  fromArray(t) {
    return (
      (this._x = t[0]),
      (this._y = t[1]),
      (this._z = t[2]),
      t[3] !== void 0 && (this._order = t[3]),
      this._onChangeCallback(),
      this
    );
  }
  toArray(t = [], e = 0) {
    return (
      (t[e] = this._x),
      (t[e + 1] = this._y),
      (t[e + 2] = this._z),
      (t[e + 3] = this._order),
      t
    );
  }
  _onChange(t) {
    return ((this._onChangeCallback = t), this);
  }
  _onChangeCallback() {}
  *[Symbol.iterator]() {
    (yield this._x, yield this._y, yield this._z, yield this._order);
  }
}
yn.DEFAULT_ORDER = "XYZ";
class Wa {
  constructor() {
    this.mask = 1;
  }
  set(t) {
    this.mask = ((1 << t) | 0) >>> 0;
  }
  enable(t) {
    this.mask |= (1 << t) | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(t) {
    this.mask ^= (1 << t) | 0;
  }
  disable(t) {
    this.mask &= ~((1 << t) | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(t) {
    return (this.mask & t.mask) !== 0;
  }
  isEnabled(t) {
    return (this.mask & ((1 << t) | 0)) !== 0;
  }
}
let qu = 0;
const Cc = new P(),
  Oi = new ri(),
  Dn = new se(),
  qs = new P(),
  gs = new P(),
  Yu = new P(),
  Ku = new ri(),
  Pc = new P(1, 0, 0),
  Dc = new P(0, 1, 0),
  Lc = new P(0, 0, 1),
  Ic = { type: "added" },
  Zu = { type: "removed" },
  zi = { type: "childadded", child: null },
  io = { type: "childremoved", child: null };
class Re extends Ei {
  constructor() {
    (super(),
      (this.isObject3D = !0),
      Object.defineProperty(this, "id", { value: qu++ }),
      (this.uuid = as()),
      (this.name = ""),
      (this.type = "Object3D"),
      (this.parent = null),
      (this.children = []),
      (this.up = Re.DEFAULT_UP.clone()));
    const t = new P(),
      e = new yn(),
      n = new ri(),
      s = new P(1, 1, 1);
    function r() {
      n.setFromEuler(e, !1);
    }
    function o() {
      e.setFromQuaternion(n, void 0, !1);
    }
    (e._onChange(r),
      n._onChange(o),
      Object.defineProperties(this, {
        position: { configurable: !0, enumerable: !0, value: t },
        rotation: { configurable: !0, enumerable: !0, value: e },
        quaternion: { configurable: !0, enumerable: !0, value: n },
        scale: { configurable: !0, enumerable: !0, value: s },
        modelViewMatrix: { value: new se() },
        normalMatrix: { value: new Vt() },
      }),
      (this.matrix = new se()),
      (this.matrixWorld = new se()),
      (this.matrixAutoUpdate = Re.DEFAULT_MATRIX_AUTO_UPDATE),
      (this.matrixWorldAutoUpdate = Re.DEFAULT_MATRIX_WORLD_AUTO_UPDATE),
      (this.matrixWorldNeedsUpdate = !1),
      (this.layers = new Wa()),
      (this.visible = !0),
      (this.castShadow = !1),
      (this.receiveShadow = !1),
      (this.frustumCulled = !0),
      (this.renderOrder = 0),
      (this.animations = []),
      (this.customDepthMaterial = void 0),
      (this.customDistanceMaterial = void 0),
      (this.userData = {}));
  }
  onBeforeShadow() {}
  onAfterShadow() {}
  onBeforeRender() {}
  onAfterRender() {}
  applyMatrix4(t) {
    (this.matrixAutoUpdate && this.updateMatrix(),
      this.matrix.premultiply(t),
      this.matrix.decompose(this.position, this.quaternion, this.scale));
  }
  applyQuaternion(t) {
    return (this.quaternion.premultiply(t), this);
  }
  setRotationFromAxisAngle(t, e) {
    this.quaternion.setFromAxisAngle(t, e);
  }
  setRotationFromEuler(t) {
    this.quaternion.setFromEuler(t, !0);
  }
  setRotationFromMatrix(t) {
    this.quaternion.setFromRotationMatrix(t);
  }
  setRotationFromQuaternion(t) {
    this.quaternion.copy(t);
  }
  rotateOnAxis(t, e) {
    return (Oi.setFromAxisAngle(t, e), this.quaternion.multiply(Oi), this);
  }
  rotateOnWorldAxis(t, e) {
    return (Oi.setFromAxisAngle(t, e), this.quaternion.premultiply(Oi), this);
  }
  rotateX(t) {
    return this.rotateOnAxis(Pc, t);
  }
  rotateY(t) {
    return this.rotateOnAxis(Dc, t);
  }
  rotateZ(t) {
    return this.rotateOnAxis(Lc, t);
  }
  translateOnAxis(t, e) {
    return (
      Cc.copy(t).applyQuaternion(this.quaternion),
      this.position.add(Cc.multiplyScalar(e)),
      this
    );
  }
  translateX(t) {
    return this.translateOnAxis(Pc, t);
  }
  translateY(t) {
    return this.translateOnAxis(Dc, t);
  }
  translateZ(t) {
    return this.translateOnAxis(Lc, t);
  }
  localToWorld(t) {
    return (this.updateWorldMatrix(!0, !1), t.applyMatrix4(this.matrixWorld));
  }
  worldToLocal(t) {
    return (
      this.updateWorldMatrix(!0, !1),
      t.applyMatrix4(Dn.copy(this.matrixWorld).invert())
    );
  }
  lookAt(t, e, n) {
    t.isVector3 ? qs.copy(t) : qs.set(t, e, n);
    const s = this.parent;
    (this.updateWorldMatrix(!0, !1),
      gs.setFromMatrixPosition(this.matrixWorld),
      this.isCamera || this.isLight
        ? Dn.lookAt(gs, qs, this.up)
        : Dn.lookAt(qs, gs, this.up),
      this.quaternion.setFromRotationMatrix(Dn),
      s &&
        (Dn.extractRotation(s.matrixWorld),
        Oi.setFromRotationMatrix(Dn),
        this.quaternion.premultiply(Oi.invert())));
  }
  add(t) {
    if (arguments.length > 1) {
      for (let e = 0; e < arguments.length; e++) this.add(arguments[e]);
      return this;
    }
    return t === this
      ? (console.error(
          "THREE.Object3D.add: object can't be added as a child of itself.",
          t,
        ),
        this)
      : (t && t.isObject3D
          ? (t.removeFromParent(),
            (t.parent = this),
            this.children.push(t),
            t.dispatchEvent(Ic),
            (zi.child = t),
            this.dispatchEvent(zi),
            (zi.child = null))
          : console.error(
              "THREE.Object3D.add: object not an instance of THREE.Object3D.",
              t,
            ),
        this);
  }
  remove(t) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++) this.remove(arguments[n]);
      return this;
    }
    const e = this.children.indexOf(t);
    return (
      e !== -1 &&
        ((t.parent = null),
        this.children.splice(e, 1),
        t.dispatchEvent(Zu),
        (io.child = t),
        this.dispatchEvent(io),
        (io.child = null)),
      this
    );
  }
  removeFromParent() {
    const t = this.parent;
    return (t !== null && t.remove(this), this);
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(t) {
    return (
      this.updateWorldMatrix(!0, !1),
      Dn.copy(this.matrixWorld).invert(),
      t.parent !== null &&
        (t.parent.updateWorldMatrix(!0, !1), Dn.multiply(t.parent.matrixWorld)),
      t.applyMatrix4(Dn),
      t.removeFromParent(),
      (t.parent = this),
      this.children.push(t),
      t.updateWorldMatrix(!1, !0),
      t.dispatchEvent(Ic),
      (zi.child = t),
      this.dispatchEvent(zi),
      (zi.child = null),
      this
    );
  }
  getObjectById(t) {
    return this.getObjectByProperty("id", t);
  }
  getObjectByName(t) {
    return this.getObjectByProperty("name", t);
  }
  getObjectByProperty(t, e) {
    if (this[t] === e) return this;
    for (let n = 0, s = this.children.length; n < s; n++) {
      const o = this.children[n].getObjectByProperty(t, e);
      if (o !== void 0) return o;
    }
  }
  getObjectsByProperty(t, e, n = []) {
    this[t] === e && n.push(this);
    const s = this.children;
    for (let r = 0, o = s.length; r < o; r++)
      s[r].getObjectsByProperty(t, e, n);
    return n;
  }
  getWorldPosition(t) {
    return (
      this.updateWorldMatrix(!0, !1),
      t.setFromMatrixPosition(this.matrixWorld)
    );
  }
  getWorldQuaternion(t) {
    return (
      this.updateWorldMatrix(!0, !1),
      this.matrixWorld.decompose(gs, t, Yu),
      t
    );
  }
  getWorldScale(t) {
    return (
      this.updateWorldMatrix(!0, !1),
      this.matrixWorld.decompose(gs, Ku, t),
      t
    );
  }
  getWorldDirection(t) {
    this.updateWorldMatrix(!0, !1);
    const e = this.matrixWorld.elements;
    return t.set(e[8], e[9], e[10]).normalize();
  }
  raycast() {}
  traverse(t) {
    t(this);
    const e = this.children;
    for (let n = 0, s = e.length; n < s; n++) e[n].traverse(t);
  }
  traverseVisible(t) {
    if (this.visible === !1) return;
    t(this);
    const e = this.children;
    for (let n = 0, s = e.length; n < s; n++) e[n].traverseVisible(t);
  }
  traverseAncestors(t) {
    const e = this.parent;
    e !== null && (t(e), e.traverseAncestors(t));
  }
  updateMatrix() {
    (this.matrix.compose(this.position, this.quaternion, this.scale),
      (this.matrixWorldNeedsUpdate = !0));
  }
  updateMatrixWorld(t) {
    (this.matrixAutoUpdate && this.updateMatrix(),
      (this.matrixWorldNeedsUpdate || t) &&
        (this.matrixWorldAutoUpdate === !0 &&
          (this.parent === null
            ? this.matrixWorld.copy(this.matrix)
            : this.matrixWorld.multiplyMatrices(
                this.parent.matrixWorld,
                this.matrix,
              )),
        (this.matrixWorldNeedsUpdate = !1),
        (t = !0)));
    const e = this.children;
    for (let n = 0, s = e.length; n < s; n++) e[n].updateMatrixWorld(t);
  }
  updateWorldMatrix(t, e) {
    const n = this.parent;
    if (
      (t === !0 && n !== null && n.updateWorldMatrix(!0, !1),
      this.matrixAutoUpdate && this.updateMatrix(),
      this.matrixWorldAutoUpdate === !0 &&
        (this.parent === null
          ? this.matrixWorld.copy(this.matrix)
          : this.matrixWorld.multiplyMatrices(
              this.parent.matrixWorld,
              this.matrix,
            )),
      e === !0)
    ) {
      const s = this.children;
      for (let r = 0, o = s.length; r < o; r++) s[r].updateWorldMatrix(!1, !0);
    }
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == "string",
      n = {};
    e &&
      ((t = {
        geometries: {},
        materials: {},
        textures: {},
        images: {},
        shapes: {},
        skeletons: {},
        animations: {},
        nodes: {},
      }),
      (n.metadata = {
        version: 4.7,
        type: "Object",
        generator: "Object3D.toJSON",
      }));
    const s = {};
    ((s.uuid = this.uuid),
      (s.type = this.type),
      this.name !== "" && (s.name = this.name),
      this.castShadow === !0 && (s.castShadow = !0),
      this.receiveShadow === !0 && (s.receiveShadow = !0),
      this.visible === !1 && (s.visible = !1),
      this.frustumCulled === !1 && (s.frustumCulled = !1),
      this.renderOrder !== 0 && (s.renderOrder = this.renderOrder),
      Object.keys(this.userData).length > 0 && (s.userData = this.userData),
      (s.layers = this.layers.mask),
      (s.matrix = this.matrix.toArray()),
      (s.up = this.up.toArray()),
      this.matrixAutoUpdate === !1 && (s.matrixAutoUpdate = !1),
      this.isInstancedMesh &&
        ((s.type = "InstancedMesh"),
        (s.count = this.count),
        (s.instanceMatrix = this.instanceMatrix.toJSON()),
        this.instanceColor !== null &&
          (s.instanceColor = this.instanceColor.toJSON())),
      this.isBatchedMesh &&
        ((s.type = "BatchedMesh"),
        (s.perObjectFrustumCulled = this.perObjectFrustumCulled),
        (s.sortObjects = this.sortObjects),
        (s.drawRanges = this._drawRanges),
        (s.reservedRanges = this._reservedRanges),
        (s.geometryInfo = this._geometryInfo.map((a) => ({
          ...a,
          boundingBox: a.boundingBox ? a.boundingBox.toJSON() : void 0,
          boundingSphere: a.boundingSphere ? a.boundingSphere.toJSON() : void 0,
        }))),
        (s.instanceInfo = this._instanceInfo.map((a) => ({ ...a }))),
        (s.availableInstanceIds = this._availableInstanceIds.slice()),
        (s.availableGeometryIds = this._availableGeometryIds.slice()),
        (s.nextIndexStart = this._nextIndexStart),
        (s.nextVertexStart = this._nextVertexStart),
        (s.geometryCount = this._geometryCount),
        (s.maxInstanceCount = this._maxInstanceCount),
        (s.maxVertexCount = this._maxVertexCount),
        (s.maxIndexCount = this._maxIndexCount),
        (s.geometryInitialized = this._geometryInitialized),
        (s.matricesTexture = this._matricesTexture.toJSON(t)),
        (s.indirectTexture = this._indirectTexture.toJSON(t)),
        this._colorsTexture !== null &&
          (s.colorsTexture = this._colorsTexture.toJSON(t)),
        this.boundingSphere !== null &&
          (s.boundingSphere = this.boundingSphere.toJSON()),
        this.boundingBox !== null &&
          (s.boundingBox = this.boundingBox.toJSON())));
    function r(a, c) {
      return (a[c.uuid] === void 0 && (a[c.uuid] = c.toJSON(t)), c.uuid);
    }
    if (this.isScene)
      (this.background &&
        (this.background.isColor
          ? (s.background = this.background.toJSON())
          : this.background.isTexture &&
            (s.background = this.background.toJSON(t).uuid)),
        this.environment &&
          this.environment.isTexture &&
          this.environment.isRenderTargetTexture !== !0 &&
          (s.environment = this.environment.toJSON(t).uuid));
    else if (this.isMesh || this.isLine || this.isPoints) {
      s.geometry = r(t.geometries, this.geometry);
      const a = this.geometry.parameters;
      if (a !== void 0 && a.shapes !== void 0) {
        const c = a.shapes;
        if (Array.isArray(c))
          for (let l = 0, h = c.length; l < h; l++) {
            const u = c[l];
            r(t.shapes, u);
          }
        else r(t.shapes, c);
      }
    }
    if (
      (this.isSkinnedMesh &&
        ((s.bindMode = this.bindMode),
        (s.bindMatrix = this.bindMatrix.toArray()),
        this.skeleton !== void 0 &&
          (r(t.skeletons, this.skeleton), (s.skeleton = this.skeleton.uuid))),
      this.material !== void 0)
    )
      if (Array.isArray(this.material)) {
        const a = [];
        for (let c = 0, l = this.material.length; c < l; c++)
          a.push(r(t.materials, this.material[c]));
        s.material = a;
      } else s.material = r(t.materials, this.material);
    if (this.children.length > 0) {
      s.children = [];
      for (let a = 0; a < this.children.length; a++)
        s.children.push(this.children[a].toJSON(t).object);
    }
    if (this.animations.length > 0) {
      s.animations = [];
      for (let a = 0; a < this.animations.length; a++) {
        const c = this.animations[a];
        s.animations.push(r(t.animations, c));
      }
    }
    if (e) {
      const a = o(t.geometries),
        c = o(t.materials),
        l = o(t.textures),
        h = o(t.images),
        u = o(t.shapes),
        d = o(t.skeletons),
        f = o(t.animations),
        m = o(t.nodes);
      (a.length > 0 && (n.geometries = a),
        c.length > 0 && (n.materials = c),
        l.length > 0 && (n.textures = l),
        h.length > 0 && (n.images = h),
        u.length > 0 && (n.shapes = u),
        d.length > 0 && (n.skeletons = d),
        f.length > 0 && (n.animations = f),
        m.length > 0 && (n.nodes = m));
    }
    return ((n.object = s), n);
    function o(a) {
      const c = [];
      for (const l in a) {
        const h = a[l];
        (delete h.metadata, c.push(h));
      }
      return c;
    }
  }
  clone(t) {
    return new this.constructor().copy(this, t);
  }
  copy(t, e = !0) {
    if (
      ((this.name = t.name),
      this.up.copy(t.up),
      this.position.copy(t.position),
      (this.rotation.order = t.rotation.order),
      this.quaternion.copy(t.quaternion),
      this.scale.copy(t.scale),
      this.matrix.copy(t.matrix),
      this.matrixWorld.copy(t.matrixWorld),
      (this.matrixAutoUpdate = t.matrixAutoUpdate),
      (this.matrixWorldAutoUpdate = t.matrixWorldAutoUpdate),
      (this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate),
      (this.layers.mask = t.layers.mask),
      (this.visible = t.visible),
      (this.castShadow = t.castShadow),
      (this.receiveShadow = t.receiveShadow),
      (this.frustumCulled = t.frustumCulled),
      (this.renderOrder = t.renderOrder),
      (this.animations = t.animations.slice()),
      (this.userData = JSON.parse(JSON.stringify(t.userData))),
      e === !0)
    )
      for (let n = 0; n < t.children.length; n++) {
        const s = t.children[n];
        this.add(s.clone());
      }
    return this;
  }
}
Re.DEFAULT_UP = new P(0, 1, 0);
Re.DEFAULT_MATRIX_AUTO_UPDATE = !0;
Re.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
const gn = new P(),
  Ln = new P(),
  so = new P(),
  In = new P(),
  ki = new P(),
  Bi = new P(),
  Uc = new P(),
  ro = new P(),
  oo = new P(),
  ao = new P(),
  co = new Ee(),
  lo = new Ee(),
  ho = new Ee();
class vn {
  constructor(t = new P(), e = new P(), n = new P()) {
    ((this.a = t), (this.b = e), (this.c = n));
  }
  static getNormal(t, e, n, s) {
    (s.subVectors(n, e), gn.subVectors(t, e), s.cross(gn));
    const r = s.lengthSq();
    return r > 0 ? s.multiplyScalar(1 / Math.sqrt(r)) : s.set(0, 0, 0);
  }
  static getBarycoord(t, e, n, s, r) {
    (gn.subVectors(s, e), Ln.subVectors(n, e), so.subVectors(t, e));
    const o = gn.dot(gn),
      a = gn.dot(Ln),
      c = gn.dot(so),
      l = Ln.dot(Ln),
      h = Ln.dot(so),
      u = o * l - a * a;
    if (u === 0) return (r.set(0, 0, 0), null);
    const d = 1 / u,
      f = (l * c - a * h) * d,
      m = (o * h - a * c) * d;
    return r.set(1 - f - m, m, f);
  }
  static containsPoint(t, e, n, s) {
    return this.getBarycoord(t, e, n, s, In) === null
      ? !1
      : In.x >= 0 && In.y >= 0 && In.x + In.y <= 1;
  }
  static getInterpolation(t, e, n, s, r, o, a, c) {
    return this.getBarycoord(t, e, n, s, In) === null
      ? ((c.x = 0),
        (c.y = 0),
        "z" in c && (c.z = 0),
        "w" in c && (c.w = 0),
        null)
      : (c.setScalar(0),
        c.addScaledVector(r, In.x),
        c.addScaledVector(o, In.y),
        c.addScaledVector(a, In.z),
        c);
  }
  static getInterpolatedAttribute(t, e, n, s, r, o) {
    return (
      co.setScalar(0),
      lo.setScalar(0),
      ho.setScalar(0),
      co.fromBufferAttribute(t, e),
      lo.fromBufferAttribute(t, n),
      ho.fromBufferAttribute(t, s),
      o.setScalar(0),
      o.addScaledVector(co, r.x),
      o.addScaledVector(lo, r.y),
      o.addScaledVector(ho, r.z),
      o
    );
  }
  static isFrontFacing(t, e, n, s) {
    return (gn.subVectors(n, e), Ln.subVectors(t, e), gn.cross(Ln).dot(s) < 0);
  }
  set(t, e, n) {
    return (this.a.copy(t), this.b.copy(e), this.c.copy(n), this);
  }
  setFromPointsAndIndices(t, e, n, s) {
    return (this.a.copy(t[e]), this.b.copy(t[n]), this.c.copy(t[s]), this);
  }
  setFromAttributeAndIndices(t, e, n, s) {
    return (
      this.a.fromBufferAttribute(t, e),
      this.b.fromBufferAttribute(t, n),
      this.c.fromBufferAttribute(t, s),
      this
    );
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return (this.a.copy(t.a), this.b.copy(t.b), this.c.copy(t.c), this);
  }
  getArea() {
    return (
      gn.subVectors(this.c, this.b),
      Ln.subVectors(this.a, this.b),
      gn.cross(Ln).length() * 0.5
    );
  }
  getMidpoint(t) {
    return t
      .addVectors(this.a, this.b)
      .add(this.c)
      .multiplyScalar(1 / 3);
  }
  getNormal(t) {
    return vn.getNormal(this.a, this.b, this.c, t);
  }
  getPlane(t) {
    return t.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(t, e) {
    return vn.getBarycoord(t, this.a, this.b, this.c, e);
  }
  getInterpolation(t, e, n, s, r) {
    return vn.getInterpolation(t, this.a, this.b, this.c, e, n, s, r);
  }
  containsPoint(t) {
    return vn.containsPoint(t, this.a, this.b, this.c);
  }
  isFrontFacing(t) {
    return vn.isFrontFacing(this.a, this.b, this.c, t);
  }
  intersectsBox(t) {
    return t.intersectsTriangle(this);
  }
  closestPointToPoint(t, e) {
    const n = this.a,
      s = this.b,
      r = this.c;
    let o, a;
    (ki.subVectors(s, n), Bi.subVectors(r, n), ro.subVectors(t, n));
    const c = ki.dot(ro),
      l = Bi.dot(ro);
    if (c <= 0 && l <= 0) return e.copy(n);
    oo.subVectors(t, s);
    const h = ki.dot(oo),
      u = Bi.dot(oo);
    if (h >= 0 && u <= h) return e.copy(s);
    const d = c * u - h * l;
    if (d <= 0 && c >= 0 && h <= 0)
      return ((o = c / (c - h)), e.copy(n).addScaledVector(ki, o));
    ao.subVectors(t, r);
    const f = ki.dot(ao),
      m = Bi.dot(ao);
    if (m >= 0 && f <= m) return e.copy(r);
    const _ = f * l - c * m;
    if (_ <= 0 && l >= 0 && m <= 0)
      return ((a = l / (l - m)), e.copy(n).addScaledVector(Bi, a));
    const g = h * m - f * u;
    if (g <= 0 && u - h >= 0 && f - m >= 0)
      return (
        Uc.subVectors(r, s),
        (a = (u - h) / (u - h + (f - m))),
        e.copy(s).addScaledVector(Uc, a)
      );
    const p = 1 / (g + _ + d);
    return (
      (o = _ * p),
      (a = d * p),
      e.copy(n).addScaledVector(ki, o).addScaledVector(Bi, a)
    );
  }
  equals(t) {
    return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c);
  }
}
const $l = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074,
  },
  Kn = { h: 0, s: 0, l: 0 },
  Ys = { h: 0, s: 0, l: 0 };
function uo(i, t, e) {
  return (
    e < 0 && (e += 1),
    e > 1 && (e -= 1),
    e < 1 / 6
      ? i + (t - i) * 6 * e
      : e < 1 / 2
        ? t
        : e < 2 / 3
          ? i + (t - i) * 6 * (2 / 3 - e)
          : i
  );
}
class Ht {
  constructor(t, e, n) {
    return (
      (this.isColor = !0),
      (this.r = 1),
      (this.g = 1),
      (this.b = 1),
      this.set(t, e, n)
    );
  }
  set(t, e, n) {
    if (e === void 0 && n === void 0) {
      const s = t;
      s && s.isColor
        ? this.copy(s)
        : typeof s == "number"
          ? this.setHex(s)
          : typeof s == "string" && this.setStyle(s);
    } else this.setRGB(t, e, n);
    return this;
  }
  setScalar(t) {
    return ((this.r = t), (this.g = t), (this.b = t), this);
  }
  setHex(t, e = Ve) {
    return (
      (t = Math.floor(t)),
      (this.r = ((t >> 16) & 255) / 255),
      (this.g = ((t >> 8) & 255) / 255),
      (this.b = (t & 255) / 255),
      ee.colorSpaceToWorking(this, e),
      this
    );
  }
  setRGB(t, e, n, s = ee.workingColorSpace) {
    return (
      (this.r = t),
      (this.g = e),
      (this.b = n),
      ee.colorSpaceToWorking(this, s),
      this
    );
  }
  setHSL(t, e, n, s = ee.workingColorSpace) {
    if (((t = Iu(t, 1)), (e = Xt(e, 0, 1)), (n = Xt(n, 0, 1)), e === 0))
      this.r = this.g = this.b = n;
    else {
      const r = n <= 0.5 ? n * (1 + e) : n + e - n * e,
        o = 2 * n - r;
      ((this.r = uo(o, r, t + 1 / 3)),
        (this.g = uo(o, r, t)),
        (this.b = uo(o, r, t - 1 / 3)));
    }
    return (ee.colorSpaceToWorking(this, s), this);
  }
  setStyle(t, e = Ve) {
    function n(r) {
      r !== void 0 &&
        parseFloat(r) < 1 &&
        console.warn(
          "THREE.Color: Alpha component of " + t + " will be ignored.",
        );
    }
    let s;
    if ((s = /^(\w+)\(([^\)]*)\)/.exec(t))) {
      let r;
      const o = s[1],
        a = s[2];
      switch (o) {
        case "rgb":
        case "rgba":
          if (
            (r =
              /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
                a,
              ))
          )
            return (
              n(r[4]),
              this.setRGB(
                Math.min(255, parseInt(r[1], 10)) / 255,
                Math.min(255, parseInt(r[2], 10)) / 255,
                Math.min(255, parseInt(r[3], 10)) / 255,
                e,
              )
            );
          if (
            (r =
              /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
                a,
              ))
          )
            return (
              n(r[4]),
              this.setRGB(
                Math.min(100, parseInt(r[1], 10)) / 100,
                Math.min(100, parseInt(r[2], 10)) / 100,
                Math.min(100, parseInt(r[3], 10)) / 100,
                e,
              )
            );
          break;
        case "hsl":
        case "hsla":
          if (
            (r =
              /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
                a,
              ))
          )
            return (
              n(r[4]),
              this.setHSL(
                parseFloat(r[1]) / 360,
                parseFloat(r[2]) / 100,
                parseFloat(r[3]) / 100,
                e,
              )
            );
          break;
        default:
          console.warn("THREE.Color: Unknown color model " + t);
      }
    } else if ((s = /^\#([A-Fa-f\d]+)$/.exec(t))) {
      const r = s[1],
        o = r.length;
      if (o === 3)
        return this.setRGB(
          parseInt(r.charAt(0), 16) / 15,
          parseInt(r.charAt(1), 16) / 15,
          parseInt(r.charAt(2), 16) / 15,
          e,
        );
      if (o === 6) return this.setHex(parseInt(r, 16), e);
      console.warn("THREE.Color: Invalid hex color " + t);
    } else if (t && t.length > 0) return this.setColorName(t, e);
    return this;
  }
  setColorName(t, e = Ve) {
    const n = $l[t.toLowerCase()];
    return (
      n !== void 0
        ? this.setHex(n, e)
        : console.warn("THREE.Color: Unknown color " + t),
      this
    );
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(t) {
    return ((this.r = t.r), (this.g = t.g), (this.b = t.b), this);
  }
  copySRGBToLinear(t) {
    return ((this.r = Bn(t.r)), (this.g = Bn(t.g)), (this.b = Bn(t.b)), this);
  }
  copyLinearToSRGB(t) {
    return ((this.r = $i(t.r)), (this.g = $i(t.g)), (this.b = $i(t.b)), this);
  }
  convertSRGBToLinear() {
    return (this.copySRGBToLinear(this), this);
  }
  convertLinearToSRGB() {
    return (this.copyLinearToSRGB(this), this);
  }
  getHex(t = Ve) {
    return (
      ee.workingToColorSpace(ze.copy(this), t),
      Math.round(Xt(ze.r * 255, 0, 255)) * 65536 +
        Math.round(Xt(ze.g * 255, 0, 255)) * 256 +
        Math.round(Xt(ze.b * 255, 0, 255))
    );
  }
  getHexString(t = Ve) {
    return ("000000" + this.getHex(t).toString(16)).slice(-6);
  }
  getHSL(t, e = ee.workingColorSpace) {
    ee.workingToColorSpace(ze.copy(this), e);
    const n = ze.r,
      s = ze.g,
      r = ze.b,
      o = Math.max(n, s, r),
      a = Math.min(n, s, r);
    let c, l;
    const h = (a + o) / 2;
    if (a === o) ((c = 0), (l = 0));
    else {
      const u = o - a;
      switch (((l = h <= 0.5 ? u / (o + a) : u / (2 - o - a)), o)) {
        case n:
          c = (s - r) / u + (s < r ? 6 : 0);
          break;
        case s:
          c = (r - n) / u + 2;
          break;
        case r:
          c = (n - s) / u + 4;
          break;
      }
      c /= 6;
    }
    return ((t.h = c), (t.s = l), (t.l = h), t);
  }
  getRGB(t, e = ee.workingColorSpace) {
    return (
      ee.workingToColorSpace(ze.copy(this), e),
      (t.r = ze.r),
      (t.g = ze.g),
      (t.b = ze.b),
      t
    );
  }
  getStyle(t = Ve) {
    ee.workingToColorSpace(ze.copy(this), t);
    const e = ze.r,
      n = ze.g,
      s = ze.b;
    return t !== Ve
      ? `color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`
      : `rgb(${Math.round(e * 255)},${Math.round(n * 255)},${Math.round(s * 255)})`;
  }
  offsetHSL(t, e, n) {
    return (this.getHSL(Kn), this.setHSL(Kn.h + t, Kn.s + e, Kn.l + n));
  }
  add(t) {
    return ((this.r += t.r), (this.g += t.g), (this.b += t.b), this);
  }
  addColors(t, e) {
    return (
      (this.r = t.r + e.r),
      (this.g = t.g + e.g),
      (this.b = t.b + e.b),
      this
    );
  }
  addScalar(t) {
    return ((this.r += t), (this.g += t), (this.b += t), this);
  }
  sub(t) {
    return (
      (this.r = Math.max(0, this.r - t.r)),
      (this.g = Math.max(0, this.g - t.g)),
      (this.b = Math.max(0, this.b - t.b)),
      this
    );
  }
  multiply(t) {
    return ((this.r *= t.r), (this.g *= t.g), (this.b *= t.b), this);
  }
  multiplyScalar(t) {
    return ((this.r *= t), (this.g *= t), (this.b *= t), this);
  }
  lerp(t, e) {
    return (
      (this.r += (t.r - this.r) * e),
      (this.g += (t.g - this.g) * e),
      (this.b += (t.b - this.b) * e),
      this
    );
  }
  lerpColors(t, e, n) {
    return (
      (this.r = t.r + (e.r - t.r) * n),
      (this.g = t.g + (e.g - t.g) * n),
      (this.b = t.b + (e.b - t.b) * n),
      this
    );
  }
  lerpHSL(t, e) {
    (this.getHSL(Kn), t.getHSL(Ys));
    const n = Yr(Kn.h, Ys.h, e),
      s = Yr(Kn.s, Ys.s, e),
      r = Yr(Kn.l, Ys.l, e);
    return (this.setHSL(n, s, r), this);
  }
  setFromVector3(t) {
    return ((this.r = t.x), (this.g = t.y), (this.b = t.z), this);
  }
  applyMatrix3(t) {
    const e = this.r,
      n = this.g,
      s = this.b,
      r = t.elements;
    return (
      (this.r = r[0] * e + r[3] * n + r[6] * s),
      (this.g = r[1] * e + r[4] * n + r[7] * s),
      (this.b = r[2] * e + r[5] * n + r[8] * s),
      this
    );
  }
  equals(t) {
    return t.r === this.r && t.g === this.g && t.b === this.b;
  }
  fromArray(t, e = 0) {
    return ((this.r = t[e]), (this.g = t[e + 1]), (this.b = t[e + 2]), this);
  }
  toArray(t = [], e = 0) {
    return ((t[e] = this.r), (t[e + 1] = this.g), (t[e + 2] = this.b), t);
  }
  fromBufferAttribute(t, e) {
    return (
      (this.r = t.getX(e)),
      (this.g = t.getY(e)),
      (this.b = t.getZ(e)),
      this
    );
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    (yield this.r, yield this.g, yield this.b);
  }
}
const ze = new Ht();
Ht.NAMES = $l;
let ju = 0;
class Ti extends Ei {
  constructor() {
    (super(),
      (this.isMaterial = !0),
      Object.defineProperty(this, "id", { value: ju++ }),
      (this.uuid = as()),
      (this.name = ""),
      (this.type = "Material"),
      (this.blending = ji),
      (this.side = ii),
      (this.vertexColors = !1),
      (this.opacity = 1),
      (this.transparent = !1),
      (this.alphaHash = !1),
      (this.blendSrc = Io),
      (this.blendDst = Uo),
      (this.blendEquation = gi),
      (this.blendSrcAlpha = null),
      (this.blendDstAlpha = null),
      (this.blendEquationAlpha = null),
      (this.blendColor = new Ht(0, 0, 0)),
      (this.blendAlpha = 0),
      (this.depthFunc = Qi),
      (this.depthTest = !0),
      (this.depthWrite = !0),
      (this.stencilWriteMask = 255),
      (this.stencilFunc = yc),
      (this.stencilRef = 0),
      (this.stencilFuncMask = 255),
      (this.stencilFail = Di),
      (this.stencilZFail = Di),
      (this.stencilZPass = Di),
      (this.stencilWrite = !1),
      (this.clippingPlanes = null),
      (this.clipIntersection = !1),
      (this.clipShadows = !1),
      (this.shadowSide = null),
      (this.colorWrite = !0),
      (this.precision = null),
      (this.polygonOffset = !1),
      (this.polygonOffsetFactor = 0),
      (this.polygonOffsetUnits = 0),
      (this.dithering = !1),
      (this.alphaToCoverage = !1),
      (this.premultipliedAlpha = !1),
      (this.forceSinglePass = !1),
      (this.allowOverride = !0),
      (this.visible = !0),
      (this.toneMapped = !0),
      (this.userData = {}),
      (this.version = 0),
      (this._alphaTest = 0));
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(t) {
    (this._alphaTest > 0 != t > 0 && this.version++, (this._alphaTest = t));
  }
  onBeforeRender() {}
  onBeforeCompile() {}
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(t) {
    if (t !== void 0)
      for (const e in t) {
        const n = t[e];
        if (n === void 0) {
          console.warn(
            `THREE.Material: parameter '${e}' has value of undefined.`,
          );
          continue;
        }
        const s = this[e];
        if (s === void 0) {
          console.warn(
            `THREE.Material: '${e}' is not a property of THREE.${this.type}.`,
          );
          continue;
        }
        s && s.isColor
          ? s.set(n)
          : s && s.isVector3 && n && n.isVector3
            ? s.copy(n)
            : (this[e] = n);
      }
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == "string";
    e && (t = { textures: {}, images: {} });
    const n = {
      metadata: {
        version: 4.7,
        type: "Material",
        generator: "Material.toJSON",
      },
    };
    ((n.uuid = this.uuid),
      (n.type = this.type),
      this.name !== "" && (n.name = this.name),
      this.color && this.color.isColor && (n.color = this.color.getHex()),
      this.roughness !== void 0 && (n.roughness = this.roughness),
      this.metalness !== void 0 && (n.metalness = this.metalness),
      this.sheen !== void 0 && (n.sheen = this.sheen),
      this.sheenColor &&
        this.sheenColor.isColor &&
        (n.sheenColor = this.sheenColor.getHex()),
      this.sheenRoughness !== void 0 &&
        (n.sheenRoughness = this.sheenRoughness),
      this.emissive &&
        this.emissive.isColor &&
        (n.emissive = this.emissive.getHex()),
      this.emissiveIntensity !== void 0 &&
        this.emissiveIntensity !== 1 &&
        (n.emissiveIntensity = this.emissiveIntensity),
      this.specular &&
        this.specular.isColor &&
        (n.specular = this.specular.getHex()),
      this.specularIntensity !== void 0 &&
        (n.specularIntensity = this.specularIntensity),
      this.specularColor &&
        this.specularColor.isColor &&
        (n.specularColor = this.specularColor.getHex()),
      this.shininess !== void 0 && (n.shininess = this.shininess),
      this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat),
      this.clearcoatRoughness !== void 0 &&
        (n.clearcoatRoughness = this.clearcoatRoughness),
      this.clearcoatMap &&
        this.clearcoatMap.isTexture &&
        (n.clearcoatMap = this.clearcoatMap.toJSON(t).uuid),
      this.clearcoatRoughnessMap &&
        this.clearcoatRoughnessMap.isTexture &&
        (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(t).uuid),
      this.clearcoatNormalMap &&
        this.clearcoatNormalMap.isTexture &&
        ((n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(t).uuid),
        (n.clearcoatNormalScale = this.clearcoatNormalScale.toArray())),
      this.sheenColorMap &&
        this.sheenColorMap.isTexture &&
        (n.sheenColorMap = this.sheenColorMap.toJSON(t).uuid),
      this.sheenRoughnessMap &&
        this.sheenRoughnessMap.isTexture &&
        (n.sheenRoughnessMap = this.sheenRoughnessMap.toJSON(t).uuid),
      this.dispersion !== void 0 && (n.dispersion = this.dispersion),
      this.iridescence !== void 0 && (n.iridescence = this.iridescence),
      this.iridescenceIOR !== void 0 &&
        (n.iridescenceIOR = this.iridescenceIOR),
      this.iridescenceThicknessRange !== void 0 &&
        (n.iridescenceThicknessRange = this.iridescenceThicknessRange),
      this.iridescenceMap &&
        this.iridescenceMap.isTexture &&
        (n.iridescenceMap = this.iridescenceMap.toJSON(t).uuid),
      this.iridescenceThicknessMap &&
        this.iridescenceThicknessMap.isTexture &&
        (n.iridescenceThicknessMap =
          this.iridescenceThicknessMap.toJSON(t).uuid),
      this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy),
      this.anisotropyRotation !== void 0 &&
        (n.anisotropyRotation = this.anisotropyRotation),
      this.anisotropyMap &&
        this.anisotropyMap.isTexture &&
        (n.anisotropyMap = this.anisotropyMap.toJSON(t).uuid),
      this.map && this.map.isTexture && (n.map = this.map.toJSON(t).uuid),
      this.matcap &&
        this.matcap.isTexture &&
        (n.matcap = this.matcap.toJSON(t).uuid),
      this.alphaMap &&
        this.alphaMap.isTexture &&
        (n.alphaMap = this.alphaMap.toJSON(t).uuid),
      this.lightMap &&
        this.lightMap.isTexture &&
        ((n.lightMap = this.lightMap.toJSON(t).uuid),
        (n.lightMapIntensity = this.lightMapIntensity)),
      this.aoMap &&
        this.aoMap.isTexture &&
        ((n.aoMap = this.aoMap.toJSON(t).uuid),
        (n.aoMapIntensity = this.aoMapIntensity)),
      this.bumpMap &&
        this.bumpMap.isTexture &&
        ((n.bumpMap = this.bumpMap.toJSON(t).uuid),
        (n.bumpScale = this.bumpScale)),
      this.normalMap &&
        this.normalMap.isTexture &&
        ((n.normalMap = this.normalMap.toJSON(t).uuid),
        (n.normalMapType = this.normalMapType),
        (n.normalScale = this.normalScale.toArray())),
      this.displacementMap &&
        this.displacementMap.isTexture &&
        ((n.displacementMap = this.displacementMap.toJSON(t).uuid),
        (n.displacementScale = this.displacementScale),
        (n.displacementBias = this.displacementBias)),
      this.roughnessMap &&
        this.roughnessMap.isTexture &&
        (n.roughnessMap = this.roughnessMap.toJSON(t).uuid),
      this.metalnessMap &&
        this.metalnessMap.isTexture &&
        (n.metalnessMap = this.metalnessMap.toJSON(t).uuid),
      this.emissiveMap &&
        this.emissiveMap.isTexture &&
        (n.emissiveMap = this.emissiveMap.toJSON(t).uuid),
      this.specularMap &&
        this.specularMap.isTexture &&
        (n.specularMap = this.specularMap.toJSON(t).uuid),
      this.specularIntensityMap &&
        this.specularIntensityMap.isTexture &&
        (n.specularIntensityMap = this.specularIntensityMap.toJSON(t).uuid),
      this.specularColorMap &&
        this.specularColorMap.isTexture &&
        (n.specularColorMap = this.specularColorMap.toJSON(t).uuid),
      this.envMap &&
        this.envMap.isTexture &&
        ((n.envMap = this.envMap.toJSON(t).uuid),
        this.combine !== void 0 && (n.combine = this.combine)),
      this.envMapRotation !== void 0 &&
        (n.envMapRotation = this.envMapRotation.toArray()),
      this.envMapIntensity !== void 0 &&
        (n.envMapIntensity = this.envMapIntensity),
      this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity),
      this.refractionRatio !== void 0 &&
        (n.refractionRatio = this.refractionRatio),
      this.gradientMap &&
        this.gradientMap.isTexture &&
        (n.gradientMap = this.gradientMap.toJSON(t).uuid),
      this.transmission !== void 0 && (n.transmission = this.transmission),
      this.transmissionMap &&
        this.transmissionMap.isTexture &&
        (n.transmissionMap = this.transmissionMap.toJSON(t).uuid),
      this.thickness !== void 0 && (n.thickness = this.thickness),
      this.thicknessMap &&
        this.thicknessMap.isTexture &&
        (n.thicknessMap = this.thicknessMap.toJSON(t).uuid),
      this.attenuationDistance !== void 0 &&
        this.attenuationDistance !== 1 / 0 &&
        (n.attenuationDistance = this.attenuationDistance),
      this.attenuationColor !== void 0 &&
        (n.attenuationColor = this.attenuationColor.getHex()),
      this.size !== void 0 && (n.size = this.size),
      this.shadowSide !== null && (n.shadowSide = this.shadowSide),
      this.sizeAttenuation !== void 0 &&
        (n.sizeAttenuation = this.sizeAttenuation),
      this.blending !== ji && (n.blending = this.blending),
      this.side !== ii && (n.side = this.side),
      this.vertexColors === !0 && (n.vertexColors = !0),
      this.opacity < 1 && (n.opacity = this.opacity),
      this.transparent === !0 && (n.transparent = !0),
      this.blendSrc !== Io && (n.blendSrc = this.blendSrc),
      this.blendDst !== Uo && (n.blendDst = this.blendDst),
      this.blendEquation !== gi && (n.blendEquation = this.blendEquation),
      this.blendSrcAlpha !== null && (n.blendSrcAlpha = this.blendSrcAlpha),
      this.blendDstAlpha !== null && (n.blendDstAlpha = this.blendDstAlpha),
      this.blendEquationAlpha !== null &&
        (n.blendEquationAlpha = this.blendEquationAlpha),
      this.blendColor &&
        this.blendColor.isColor &&
        (n.blendColor = this.blendColor.getHex()),
      this.blendAlpha !== 0 && (n.blendAlpha = this.blendAlpha),
      this.depthFunc !== Qi && (n.depthFunc = this.depthFunc),
      this.depthTest === !1 && (n.depthTest = this.depthTest),
      this.depthWrite === !1 && (n.depthWrite = this.depthWrite),
      this.colorWrite === !1 && (n.colorWrite = this.colorWrite),
      this.stencilWriteMask !== 255 &&
        (n.stencilWriteMask = this.stencilWriteMask),
      this.stencilFunc !== yc && (n.stencilFunc = this.stencilFunc),
      this.stencilRef !== 0 && (n.stencilRef = this.stencilRef),
      this.stencilFuncMask !== 255 &&
        (n.stencilFuncMask = this.stencilFuncMask),
      this.stencilFail !== Di && (n.stencilFail = this.stencilFail),
      this.stencilZFail !== Di && (n.stencilZFail = this.stencilZFail),
      this.stencilZPass !== Di && (n.stencilZPass = this.stencilZPass),
      this.stencilWrite === !0 && (n.stencilWrite = this.stencilWrite),
      this.rotation !== void 0 &&
        this.rotation !== 0 &&
        (n.rotation = this.rotation),
      this.polygonOffset === !0 && (n.polygonOffset = !0),
      this.polygonOffsetFactor !== 0 &&
        (n.polygonOffsetFactor = this.polygonOffsetFactor),
      this.polygonOffsetUnits !== 0 &&
        (n.polygonOffsetUnits = this.polygonOffsetUnits),
      this.linewidth !== void 0 &&
        this.linewidth !== 1 &&
        (n.linewidth = this.linewidth),
      this.dashSize !== void 0 && (n.dashSize = this.dashSize),
      this.gapSize !== void 0 && (n.gapSize = this.gapSize),
      this.scale !== void 0 && (n.scale = this.scale),
      this.dithering === !0 && (n.dithering = !0),
      this.alphaTest > 0 && (n.alphaTest = this.alphaTest),
      this.alphaHash === !0 && (n.alphaHash = !0),
      this.alphaToCoverage === !0 && (n.alphaToCoverage = !0),
      this.premultipliedAlpha === !0 && (n.premultipliedAlpha = !0),
      this.forceSinglePass === !0 && (n.forceSinglePass = !0),
      this.wireframe === !0 && (n.wireframe = !0),
      this.wireframeLinewidth > 1 &&
        (n.wireframeLinewidth = this.wireframeLinewidth),
      this.wireframeLinecap !== "round" &&
        (n.wireframeLinecap = this.wireframeLinecap),
      this.wireframeLinejoin !== "round" &&
        (n.wireframeLinejoin = this.wireframeLinejoin),
      this.flatShading === !0 && (n.flatShading = !0),
      this.visible === !1 && (n.visible = !1),
      this.toneMapped === !1 && (n.toneMapped = !1),
      this.fog === !1 && (n.fog = !1),
      Object.keys(this.userData).length > 0 && (n.userData = this.userData));
    function s(r) {
      const o = [];
      for (const a in r) {
        const c = r[a];
        (delete c.metadata, o.push(c));
      }
      return o;
    }
    if (e) {
      const r = s(t.textures),
        o = s(t.images);
      (r.length > 0 && (n.textures = r), o.length > 0 && (n.images = o));
    }
    return n;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    ((this.name = t.name),
      (this.blending = t.blending),
      (this.side = t.side),
      (this.vertexColors = t.vertexColors),
      (this.opacity = t.opacity),
      (this.transparent = t.transparent),
      (this.blendSrc = t.blendSrc),
      (this.blendDst = t.blendDst),
      (this.blendEquation = t.blendEquation),
      (this.blendSrcAlpha = t.blendSrcAlpha),
      (this.blendDstAlpha = t.blendDstAlpha),
      (this.blendEquationAlpha = t.blendEquationAlpha),
      this.blendColor.copy(t.blendColor),
      (this.blendAlpha = t.blendAlpha),
      (this.depthFunc = t.depthFunc),
      (this.depthTest = t.depthTest),
      (this.depthWrite = t.depthWrite),
      (this.stencilWriteMask = t.stencilWriteMask),
      (this.stencilFunc = t.stencilFunc),
      (this.stencilRef = t.stencilRef),
      (this.stencilFuncMask = t.stencilFuncMask),
      (this.stencilFail = t.stencilFail),
      (this.stencilZFail = t.stencilZFail),
      (this.stencilZPass = t.stencilZPass),
      (this.stencilWrite = t.stencilWrite));
    const e = t.clippingPlanes;
    let n = null;
    if (e !== null) {
      const s = e.length;
      n = new Array(s);
      for (let r = 0; r !== s; ++r) n[r] = e[r].clone();
    }
    return (
      (this.clippingPlanes = n),
      (this.clipIntersection = t.clipIntersection),
      (this.clipShadows = t.clipShadows),
      (this.shadowSide = t.shadowSide),
      (this.colorWrite = t.colorWrite),
      (this.precision = t.precision),
      (this.polygonOffset = t.polygonOffset),
      (this.polygonOffsetFactor = t.polygonOffsetFactor),
      (this.polygonOffsetUnits = t.polygonOffsetUnits),
      (this.dithering = t.dithering),
      (this.alphaTest = t.alphaTest),
      (this.alphaHash = t.alphaHash),
      (this.alphaToCoverage = t.alphaToCoverage),
      (this.premultipliedAlpha = t.premultipliedAlpha),
      (this.forceSinglePass = t.forceSinglePass),
      (this.visible = t.visible),
      (this.toneMapped = t.toneMapped),
      (this.userData = JSON.parse(JSON.stringify(t.userData))),
      this
    );
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  set needsUpdate(t) {
    t === !0 && this.version++;
  }
}
class yi extends Ti {
  constructor(t) {
    (super(),
      (this.isMeshBasicMaterial = !0),
      (this.type = "MeshBasicMaterial"),
      (this.color = new Ht(16777215)),
      (this.map = null),
      (this.lightMap = null),
      (this.lightMapIntensity = 1),
      (this.aoMap = null),
      (this.aoMapIntensity = 1),
      (this.specularMap = null),
      (this.alphaMap = null),
      (this.envMap = null),
      (this.envMapRotation = new yn()),
      (this.combine = zr),
      (this.reflectivity = 1),
      (this.refractionRatio = 0.98),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.wireframeLinecap = "round"),
      (this.wireframeLinejoin = "round"),
      (this.fog = !0),
      this.setValues(t));
  }
  copy(t) {
    return (
      super.copy(t),
      this.color.copy(t.color),
      (this.map = t.map),
      (this.lightMap = t.lightMap),
      (this.lightMapIntensity = t.lightMapIntensity),
      (this.aoMap = t.aoMap),
      (this.aoMapIntensity = t.aoMapIntensity),
      (this.specularMap = t.specularMap),
      (this.alphaMap = t.alphaMap),
      (this.envMap = t.envMap),
      this.envMapRotation.copy(t.envMapRotation),
      (this.combine = t.combine),
      (this.reflectivity = t.reflectivity),
      (this.refractionRatio = t.refractionRatio),
      (this.wireframe = t.wireframe),
      (this.wireframeLinewidth = t.wireframeLinewidth),
      (this.wireframeLinecap = t.wireframeLinecap),
      (this.wireframeLinejoin = t.wireframeLinejoin),
      (this.fog = t.fog),
      this
    );
  }
}
const Ae = new P(),
  Ks = new at();
let $u = 0;
class pe {
  constructor(t, e, n = !1) {
    if (Array.isArray(t))
      throw new TypeError(
        "THREE.BufferAttribute: array should be a Typed Array.",
      );
    ((this.isBufferAttribute = !0),
      Object.defineProperty(this, "id", { value: $u++ }),
      (this.name = ""),
      (this.array = t),
      (this.itemSize = e),
      (this.count = t !== void 0 ? t.length / e : 0),
      (this.normalized = n),
      (this.usage = Mc),
      (this.updateRanges = []),
      (this.gpuType = En),
      (this.version = 0));
  }
  onUploadCallback() {}
  set needsUpdate(t) {
    t === !0 && this.version++;
  }
  setUsage(t) {
    return ((this.usage = t), this);
  }
  addUpdateRange(t, e) {
    this.updateRanges.push({ start: t, count: e });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(t) {
    return (
      (this.name = t.name),
      (this.array = new t.array.constructor(t.array)),
      (this.itemSize = t.itemSize),
      (this.count = t.count),
      (this.normalized = t.normalized),
      (this.usage = t.usage),
      (this.gpuType = t.gpuType),
      this
    );
  }
  copyAt(t, e, n) {
    ((t *= this.itemSize), (n *= e.itemSize));
    for (let s = 0, r = this.itemSize; s < r; s++)
      this.array[t + s] = e.array[n + s];
    return this;
  }
  copyArray(t) {
    return (this.array.set(t), this);
  }
  applyMatrix3(t) {
    if (this.itemSize === 2)
      for (let e = 0, n = this.count; e < n; e++)
        (Ks.fromBufferAttribute(this, e),
          Ks.applyMatrix3(t),
          this.setXY(e, Ks.x, Ks.y));
    else if (this.itemSize === 3)
      for (let e = 0, n = this.count; e < n; e++)
        (Ae.fromBufferAttribute(this, e),
          Ae.applyMatrix3(t),
          this.setXYZ(e, Ae.x, Ae.y, Ae.z));
    return this;
  }
  applyMatrix4(t) {
    for (let e = 0, n = this.count; e < n; e++)
      (Ae.fromBufferAttribute(this, e),
        Ae.applyMatrix4(t),
        this.setXYZ(e, Ae.x, Ae.y, Ae.z));
    return this;
  }
  applyNormalMatrix(t) {
    for (let e = 0, n = this.count; e < n; e++)
      (Ae.fromBufferAttribute(this, e),
        Ae.applyNormalMatrix(t),
        this.setXYZ(e, Ae.x, Ae.y, Ae.z));
    return this;
  }
  transformDirection(t) {
    for (let e = 0, n = this.count; e < n; e++)
      (Ae.fromBufferAttribute(this, e),
        Ae.transformDirection(t),
        this.setXYZ(e, Ae.x, Ae.y, Ae.z));
    return this;
  }
  set(t, e = 0) {
    return (this.array.set(t, e), this);
  }
  getComponent(t, e) {
    let n = this.array[t * this.itemSize + e];
    return (this.normalized && (n = fs(n, this.array)), n);
  }
  setComponent(t, e, n) {
    return (
      this.normalized && (n = Ye(n, this.array)),
      (this.array[t * this.itemSize + e] = n),
      this
    );
  }
  getX(t) {
    let e = this.array[t * this.itemSize];
    return (this.normalized && (e = fs(e, this.array)), e);
  }
  setX(t, e) {
    return (
      this.normalized && (e = Ye(e, this.array)),
      (this.array[t * this.itemSize] = e),
      this
    );
  }
  getY(t) {
    let e = this.array[t * this.itemSize + 1];
    return (this.normalized && (e = fs(e, this.array)), e);
  }
  setY(t, e) {
    return (
      this.normalized && (e = Ye(e, this.array)),
      (this.array[t * this.itemSize + 1] = e),
      this
    );
  }
  getZ(t) {
    let e = this.array[t * this.itemSize + 2];
    return (this.normalized && (e = fs(e, this.array)), e);
  }
  setZ(t, e) {
    return (
      this.normalized && (e = Ye(e, this.array)),
      (this.array[t * this.itemSize + 2] = e),
      this
    );
  }
  getW(t) {
    let e = this.array[t * this.itemSize + 3];
    return (this.normalized && (e = fs(e, this.array)), e);
  }
  setW(t, e) {
    return (
      this.normalized && (e = Ye(e, this.array)),
      (this.array[t * this.itemSize + 3] = e),
      this
    );
  }
  setXY(t, e, n) {
    return (
      (t *= this.itemSize),
      this.normalized && ((e = Ye(e, this.array)), (n = Ye(n, this.array))),
      (this.array[t + 0] = e),
      (this.array[t + 1] = n),
      this
    );
  }
  setXYZ(t, e, n, s) {
    return (
      (t *= this.itemSize),
      this.normalized &&
        ((e = Ye(e, this.array)),
        (n = Ye(n, this.array)),
        (s = Ye(s, this.array))),
      (this.array[t + 0] = e),
      (this.array[t + 1] = n),
      (this.array[t + 2] = s),
      this
    );
  }
  setXYZW(t, e, n, s, r) {
    return (
      (t *= this.itemSize),
      this.normalized &&
        ((e = Ye(e, this.array)),
        (n = Ye(n, this.array)),
        (s = Ye(s, this.array)),
        (r = Ye(r, this.array))),
      (this.array[t + 0] = e),
      (this.array[t + 1] = n),
      (this.array[t + 2] = s),
      (this.array[t + 3] = r),
      this
    );
  }
  onUpload(t) {
    return ((this.onUploadCallback = t), this);
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const t = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized,
    };
    return (
      this.name !== "" && (t.name = this.name),
      this.usage !== Mc && (t.usage = this.usage),
      t
    );
  }
}
class Jl extends pe {
  constructor(t, e, n) {
    super(new Uint16Array(t), e, n);
  }
}
class Ql extends pe {
  constructor(t, e, n) {
    super(new Uint32Array(t), e, n);
  }
}
class we extends pe {
  constructor(t, e, n) {
    super(new Float32Array(t), e, n);
  }
}
let Ju = 0;
const ln = new se(),
  fo = new Re(),
  Hi = new P(),
  sn = new wi(),
  _s = new wi(),
  Ie = new P();
class ve extends Ei {
  constructor() {
    (super(),
      (this.isBufferGeometry = !0),
      Object.defineProperty(this, "id", { value: Ju++ }),
      (this.uuid = as()),
      (this.name = ""),
      (this.type = "BufferGeometry"),
      (this.index = null),
      (this.indirect = null),
      (this.attributes = {}),
      (this.morphAttributes = {}),
      (this.morphTargetsRelative = !1),
      (this.groups = []),
      (this.boundingBox = null),
      (this.boundingSphere = null),
      (this.drawRange = { start: 0, count: 1 / 0 }),
      (this.userData = {}));
  }
  getIndex() {
    return this.index;
  }
  setIndex(t) {
    return (
      Array.isArray(t)
        ? (this.index = new (Zl(t) ? Ql : Jl)(t, 1))
        : (this.index = t),
      this
    );
  }
  setIndirect(t) {
    return ((this.indirect = t), this);
  }
  getIndirect() {
    return this.indirect;
  }
  getAttribute(t) {
    return this.attributes[t];
  }
  setAttribute(t, e) {
    return ((this.attributes[t] = e), this);
  }
  deleteAttribute(t) {
    return (delete this.attributes[t], this);
  }
  hasAttribute(t) {
    return this.attributes[t] !== void 0;
  }
  addGroup(t, e, n = 0) {
    this.groups.push({ start: t, count: e, materialIndex: n });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(t, e) {
    ((this.drawRange.start = t), (this.drawRange.count = e));
  }
  applyMatrix4(t) {
    const e = this.attributes.position;
    e !== void 0 && (e.applyMatrix4(t), (e.needsUpdate = !0));
    const n = this.attributes.normal;
    if (n !== void 0) {
      const r = new Vt().getNormalMatrix(t);
      (n.applyNormalMatrix(r), (n.needsUpdate = !0));
    }
    const s = this.attributes.tangent;
    return (
      s !== void 0 && (s.transformDirection(t), (s.needsUpdate = !0)),
      this.boundingBox !== null && this.computeBoundingBox(),
      this.boundingSphere !== null && this.computeBoundingSphere(),
      this
    );
  }
  applyQuaternion(t) {
    return (ln.makeRotationFromQuaternion(t), this.applyMatrix4(ln), this);
  }
  rotateX(t) {
    return (ln.makeRotationX(t), this.applyMatrix4(ln), this);
  }
  rotateY(t) {
    return (ln.makeRotationY(t), this.applyMatrix4(ln), this);
  }
  rotateZ(t) {
    return (ln.makeRotationZ(t), this.applyMatrix4(ln), this);
  }
  translate(t, e, n) {
    return (ln.makeTranslation(t, e, n), this.applyMatrix4(ln), this);
  }
  scale(t, e, n) {
    return (ln.makeScale(t, e, n), this.applyMatrix4(ln), this);
  }
  lookAt(t) {
    return (
      fo.lookAt(t),
      fo.updateMatrix(),
      this.applyMatrix4(fo.matrix),
      this
    );
  }
  center() {
    return (
      this.computeBoundingBox(),
      this.boundingBox.getCenter(Hi).negate(),
      this.translate(Hi.x, Hi.y, Hi.z),
      this
    );
  }
  setFromPoints(t) {
    const e = this.getAttribute("position");
    if (e === void 0) {
      const n = [];
      for (let s = 0, r = t.length; s < r; s++) {
        const o = t[s];
        n.push(o.x, o.y, o.z || 0);
      }
      this.setAttribute("position", new we(n, 3));
    } else {
      const n = Math.min(t.length, e.count);
      for (let s = 0; s < n; s++) {
        const r = t[s];
        e.setXYZ(s, r.x, r.y, r.z || 0);
      }
      (t.length > e.count &&
        console.warn(
          "THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.",
        ),
        (e.needsUpdate = !0));
    }
    return this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new wi());
    const t = this.attributes.position,
      e = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      (console.error(
        "THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",
        this,
      ),
        this.boundingBox.set(
          new P(-1 / 0, -1 / 0, -1 / 0),
          new P(1 / 0, 1 / 0, 1 / 0),
        ));
      return;
    }
    if (t !== void 0) {
      if ((this.boundingBox.setFromBufferAttribute(t), e))
        for (let n = 0, s = e.length; n < s; n++) {
          const r = e[n];
          (sn.setFromBufferAttribute(r),
            this.morphTargetsRelative
              ? (Ie.addVectors(this.boundingBox.min, sn.min),
                this.boundingBox.expandByPoint(Ie),
                Ie.addVectors(this.boundingBox.max, sn.max),
                this.boundingBox.expandByPoint(Ie))
              : (this.boundingBox.expandByPoint(sn.min),
                this.boundingBox.expandByPoint(sn.max)));
        }
    } else this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) ||
      isNaN(this.boundingBox.min.y) ||
      isNaN(this.boundingBox.min.z)) &&
      console.error(
        'THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',
        this,
      );
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new cs());
    const t = this.attributes.position,
      e = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      (console.error(
        "THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",
        this,
      ),
        this.boundingSphere.set(new P(), 1 / 0));
      return;
    }
    if (t) {
      const n = this.boundingSphere.center;
      if ((sn.setFromBufferAttribute(t), e))
        for (let r = 0, o = e.length; r < o; r++) {
          const a = e[r];
          (_s.setFromBufferAttribute(a),
            this.morphTargetsRelative
              ? (Ie.addVectors(sn.min, _s.min),
                sn.expandByPoint(Ie),
                Ie.addVectors(sn.max, _s.max),
                sn.expandByPoint(Ie))
              : (sn.expandByPoint(_s.min), sn.expandByPoint(_s.max)));
        }
      sn.getCenter(n);
      let s = 0;
      for (let r = 0, o = t.count; r < o; r++)
        (Ie.fromBufferAttribute(t, r),
          (s = Math.max(s, n.distanceToSquared(Ie))));
      if (e)
        for (let r = 0, o = e.length; r < o; r++) {
          const a = e[r],
            c = this.morphTargetsRelative;
          for (let l = 0, h = a.count; l < h; l++)
            (Ie.fromBufferAttribute(a, l),
              c && (Hi.fromBufferAttribute(t, l), Ie.add(Hi)),
              (s = Math.max(s, n.distanceToSquared(Ie))));
        }
      ((this.boundingSphere.radius = Math.sqrt(s)),
        isNaN(this.boundingSphere.radius) &&
          console.error(
            'THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',
            this,
          ));
    }
  }
  computeTangents() {
    const t = this.index,
      e = this.attributes;
    if (
      t === null ||
      e.position === void 0 ||
      e.normal === void 0 ||
      e.uv === void 0
    ) {
      console.error(
        "THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)",
      );
      return;
    }
    const n = e.position,
      s = e.normal,
      r = e.uv;
    this.hasAttribute("tangent") === !1 &&
      this.setAttribute("tangent", new pe(new Float32Array(4 * n.count), 4));
    const o = this.getAttribute("tangent"),
      a = [],
      c = [];
    for (let L = 0; L < n.count; L++) ((a[L] = new P()), (c[L] = new P()));
    const l = new P(),
      h = new P(),
      u = new P(),
      d = new at(),
      f = new at(),
      m = new at(),
      _ = new P(),
      g = new P();
    function p(L, y, M) {
      (l.fromBufferAttribute(n, L),
        h.fromBufferAttribute(n, y),
        u.fromBufferAttribute(n, M),
        d.fromBufferAttribute(r, L),
        f.fromBufferAttribute(r, y),
        m.fromBufferAttribute(r, M),
        h.sub(l),
        u.sub(l),
        f.sub(d),
        m.sub(d));
      const w = 1 / (f.x * m.y - m.x * f.y);
      isFinite(w) &&
        (_.copy(h)
          .multiplyScalar(m.y)
          .addScaledVector(u, -f.y)
          .multiplyScalar(w),
        g
          .copy(u)
          .multiplyScalar(f.x)
          .addScaledVector(h, -m.x)
          .multiplyScalar(w),
        a[L].add(_),
        a[y].add(_),
        a[M].add(_),
        c[L].add(g),
        c[y].add(g),
        c[M].add(g));
    }
    let A = this.groups;
    A.length === 0 && (A = [{ start: 0, count: t.count }]);
    for (let L = 0, y = A.length; L < y; ++L) {
      const M = A[L],
        w = M.start,
        I = M.count;
      for (let F = w, B = w + I; F < B; F += 3)
        p(t.getX(F + 0), t.getX(F + 1), t.getX(F + 2));
    }
    const b = new P(),
      v = new P(),
      R = new P(),
      E = new P();
    function C(L) {
      (R.fromBufferAttribute(s, L), E.copy(R));
      const y = a[L];
      (b.copy(y),
        b.sub(R.multiplyScalar(R.dot(y))).normalize(),
        v.crossVectors(E, y));
      const w = v.dot(c[L]) < 0 ? -1 : 1;
      o.setXYZW(L, b.x, b.y, b.z, w);
    }
    for (let L = 0, y = A.length; L < y; ++L) {
      const M = A[L],
        w = M.start,
        I = M.count;
      for (let F = w, B = w + I; F < B; F += 3)
        (C(t.getX(F + 0)), C(t.getX(F + 1)), C(t.getX(F + 2)));
    }
  }
  computeVertexNormals() {
    const t = this.index,
      e = this.getAttribute("position");
    if (e !== void 0) {
      let n = this.getAttribute("normal");
      if (n === void 0)
        ((n = new pe(new Float32Array(e.count * 3), 3)),
          this.setAttribute("normal", n));
      else for (let d = 0, f = n.count; d < f; d++) n.setXYZ(d, 0, 0, 0);
      const s = new P(),
        r = new P(),
        o = new P(),
        a = new P(),
        c = new P(),
        l = new P(),
        h = new P(),
        u = new P();
      if (t)
        for (let d = 0, f = t.count; d < f; d += 3) {
          const m = t.getX(d + 0),
            _ = t.getX(d + 1),
            g = t.getX(d + 2);
          (s.fromBufferAttribute(e, m),
            r.fromBufferAttribute(e, _),
            o.fromBufferAttribute(e, g),
            h.subVectors(o, r),
            u.subVectors(s, r),
            h.cross(u),
            a.fromBufferAttribute(n, m),
            c.fromBufferAttribute(n, _),
            l.fromBufferAttribute(n, g),
            a.add(h),
            c.add(h),
            l.add(h),
            n.setXYZ(m, a.x, a.y, a.z),
            n.setXYZ(_, c.x, c.y, c.z),
            n.setXYZ(g, l.x, l.y, l.z));
        }
      else
        for (let d = 0, f = e.count; d < f; d += 3)
          (s.fromBufferAttribute(e, d + 0),
            r.fromBufferAttribute(e, d + 1),
            o.fromBufferAttribute(e, d + 2),
            h.subVectors(o, r),
            u.subVectors(s, r),
            h.cross(u),
            n.setXYZ(d + 0, h.x, h.y, h.z),
            n.setXYZ(d + 1, h.x, h.y, h.z),
            n.setXYZ(d + 2, h.x, h.y, h.z));
      (this.normalizeNormals(), (n.needsUpdate = !0));
    }
  }
  normalizeNormals() {
    const t = this.attributes.normal;
    for (let e = 0, n = t.count; e < n; e++)
      (Ie.fromBufferAttribute(t, e),
        Ie.normalize(),
        t.setXYZ(e, Ie.x, Ie.y, Ie.z));
  }
  toNonIndexed() {
    function t(a, c) {
      const l = a.array,
        h = a.itemSize,
        u = a.normalized,
        d = new l.constructor(c.length * h);
      let f = 0,
        m = 0;
      for (let _ = 0, g = c.length; _ < g; _++) {
        a.isInterleavedBufferAttribute
          ? (f = c[_] * a.data.stride + a.offset)
          : (f = c[_] * h);
        for (let p = 0; p < h; p++) d[m++] = l[f++];
      }
      return new pe(d, h, u);
    }
    if (this.index === null)
      return (
        console.warn(
          "THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.",
        ),
        this
      );
    const e = new ve(),
      n = this.index.array,
      s = this.attributes;
    for (const a in s) {
      const c = s[a],
        l = t(c, n);
      e.setAttribute(a, l);
    }
    const r = this.morphAttributes;
    for (const a in r) {
      const c = [],
        l = r[a];
      for (let h = 0, u = l.length; h < u; h++) {
        const d = l[h],
          f = t(d, n);
        c.push(f);
      }
      e.morphAttributes[a] = c;
    }
    e.morphTargetsRelative = this.morphTargetsRelative;
    const o = this.groups;
    for (let a = 0, c = o.length; a < c; a++) {
      const l = o[a];
      e.addGroup(l.start, l.count, l.materialIndex);
    }
    return e;
  }
  toJSON() {
    const t = {
      metadata: {
        version: 4.7,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON",
      },
    };
    if (
      ((t.uuid = this.uuid),
      (t.type = this.type),
      this.name !== "" && (t.name = this.name),
      Object.keys(this.userData).length > 0 && (t.userData = this.userData),
      this.parameters !== void 0)
    ) {
      const c = this.parameters;
      for (const l in c) c[l] !== void 0 && (t[l] = c[l]);
      return t;
    }
    t.data = { attributes: {} };
    const e = this.index;
    e !== null &&
      (t.data.index = {
        type: e.array.constructor.name,
        array: Array.prototype.slice.call(e.array),
      });
    const n = this.attributes;
    for (const c in n) {
      const l = n[c];
      t.data.attributes[c] = l.toJSON(t.data);
    }
    const s = {};
    let r = !1;
    for (const c in this.morphAttributes) {
      const l = this.morphAttributes[c],
        h = [];
      for (let u = 0, d = l.length; u < d; u++) {
        const f = l[u];
        h.push(f.toJSON(t.data));
      }
      h.length > 0 && ((s[c] = h), (r = !0));
    }
    r &&
      ((t.data.morphAttributes = s),
      (t.data.morphTargetsRelative = this.morphTargetsRelative));
    const o = this.groups;
    o.length > 0 && (t.data.groups = JSON.parse(JSON.stringify(o)));
    const a = this.boundingSphere;
    return (a !== null && (t.data.boundingSphere = a.toJSON()), t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    ((this.index = null),
      (this.attributes = {}),
      (this.morphAttributes = {}),
      (this.groups = []),
      (this.boundingBox = null),
      (this.boundingSphere = null));
    const e = {};
    this.name = t.name;
    const n = t.index;
    n !== null && this.setIndex(n.clone());
    const s = t.attributes;
    for (const l in s) {
      const h = s[l];
      this.setAttribute(l, h.clone(e));
    }
    const r = t.morphAttributes;
    for (const l in r) {
      const h = [],
        u = r[l];
      for (let d = 0, f = u.length; d < f; d++) h.push(u[d].clone(e));
      this.morphAttributes[l] = h;
    }
    this.morphTargetsRelative = t.morphTargetsRelative;
    const o = t.groups;
    for (let l = 0, h = o.length; l < h; l++) {
      const u = o[l];
      this.addGroup(u.start, u.count, u.materialIndex);
    }
    const a = t.boundingBox;
    a !== null && (this.boundingBox = a.clone());
    const c = t.boundingSphere;
    return (
      c !== null && (this.boundingSphere = c.clone()),
      (this.drawRange.start = t.drawRange.start),
      (this.drawRange.count = t.drawRange.count),
      (this.userData = t.userData),
      this
    );
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
const Nc = new se(),
  ui = new Br(),
  Zs = new cs(),
  Fc = new P(),
  js = new P(),
  $s = new P(),
  Js = new P(),
  po = new P(),
  Qs = new P(),
  Oc = new P(),
  tr = new P();
class he extends Re {
  constructor(t = new ve(), e = new yi()) {
    (super(),
      (this.isMesh = !0),
      (this.type = "Mesh"),
      (this.geometry = t),
      (this.material = e),
      (this.morphTargetDictionary = void 0),
      (this.morphTargetInfluences = void 0),
      (this.count = 1),
      this.updateMorphTargets());
  }
  copy(t, e) {
    return (
      super.copy(t, e),
      t.morphTargetInfluences !== void 0 &&
        (this.morphTargetInfluences = t.morphTargetInfluences.slice()),
      t.morphTargetDictionary !== void 0 &&
        (this.morphTargetDictionary = Object.assign(
          {},
          t.morphTargetDictionary,
        )),
      (this.material = Array.isArray(t.material)
        ? t.material.slice()
        : t.material),
      (this.geometry = t.geometry),
      this
    );
  }
  updateMorphTargets() {
    const e = this.geometry.morphAttributes,
      n = Object.keys(e);
    if (n.length > 0) {
      const s = e[n[0]];
      if (s !== void 0) {
        ((this.morphTargetInfluences = []), (this.morphTargetDictionary = {}));
        for (let r = 0, o = s.length; r < o; r++) {
          const a = s[r].name || String(r);
          (this.morphTargetInfluences.push(0),
            (this.morphTargetDictionary[a] = r));
        }
      }
    }
  }
  getVertexPosition(t, e) {
    const n = this.geometry,
      s = n.attributes.position,
      r = n.morphAttributes.position,
      o = n.morphTargetsRelative;
    e.fromBufferAttribute(s, t);
    const a = this.morphTargetInfluences;
    if (r && a) {
      Qs.set(0, 0, 0);
      for (let c = 0, l = r.length; c < l; c++) {
        const h = a[c],
          u = r[c];
        h !== 0 &&
          (po.fromBufferAttribute(u, t),
          o ? Qs.addScaledVector(po, h) : Qs.addScaledVector(po.sub(e), h));
      }
      e.add(Qs);
    }
    return e;
  }
  raycast(t, e) {
    const n = this.geometry,
      s = this.material,
      r = this.matrixWorld;
    s !== void 0 &&
      (n.boundingSphere === null && n.computeBoundingSphere(),
      Zs.copy(n.boundingSphere),
      Zs.applyMatrix4(r),
      ui.copy(t.ray).recast(t.near),
      !(
        Zs.containsPoint(ui.origin) === !1 &&
        (ui.intersectSphere(Zs, Fc) === null ||
          ui.origin.distanceToSquared(Fc) > (t.far - t.near) ** 2)
      ) &&
        (Nc.copy(r).invert(),
        ui.copy(t.ray).applyMatrix4(Nc),
        !(n.boundingBox !== null && ui.intersectsBox(n.boundingBox) === !1) &&
          this._computeIntersections(t, e, ui)));
  }
  _computeIntersections(t, e, n) {
    let s;
    const r = this.geometry,
      o = this.material,
      a = r.index,
      c = r.attributes.position,
      l = r.attributes.uv,
      h = r.attributes.uv1,
      u = r.attributes.normal,
      d = r.groups,
      f = r.drawRange;
    if (a !== null)
      if (Array.isArray(o))
        for (let m = 0, _ = d.length; m < _; m++) {
          const g = d[m],
            p = o[g.materialIndex],
            A = Math.max(g.start, f.start),
            b = Math.min(
              a.count,
              Math.min(g.start + g.count, f.start + f.count),
            );
          for (let v = A, R = b; v < R; v += 3) {
            const E = a.getX(v),
              C = a.getX(v + 1),
              L = a.getX(v + 2);
            ((s = er(this, p, t, n, l, h, u, E, C, L)),
              s &&
                ((s.faceIndex = Math.floor(v / 3)),
                (s.face.materialIndex = g.materialIndex),
                e.push(s)));
          }
        }
      else {
        const m = Math.max(0, f.start),
          _ = Math.min(a.count, f.start + f.count);
        for (let g = m, p = _; g < p; g += 3) {
          const A = a.getX(g),
            b = a.getX(g + 1),
            v = a.getX(g + 2);
          ((s = er(this, o, t, n, l, h, u, A, b, v)),
            s && ((s.faceIndex = Math.floor(g / 3)), e.push(s)));
        }
      }
    else if (c !== void 0)
      if (Array.isArray(o))
        for (let m = 0, _ = d.length; m < _; m++) {
          const g = d[m],
            p = o[g.materialIndex],
            A = Math.max(g.start, f.start),
            b = Math.min(
              c.count,
              Math.min(g.start + g.count, f.start + f.count),
            );
          for (let v = A, R = b; v < R; v += 3) {
            const E = v,
              C = v + 1,
              L = v + 2;
            ((s = er(this, p, t, n, l, h, u, E, C, L)),
              s &&
                ((s.faceIndex = Math.floor(v / 3)),
                (s.face.materialIndex = g.materialIndex),
                e.push(s)));
          }
        }
      else {
        const m = Math.max(0, f.start),
          _ = Math.min(c.count, f.start + f.count);
        for (let g = m, p = _; g < p; g += 3) {
          const A = g,
            b = g + 1,
            v = g + 2;
          ((s = er(this, o, t, n, l, h, u, A, b, v)),
            s && ((s.faceIndex = Math.floor(g / 3)), e.push(s)));
        }
      }
  }
}
function Qu(i, t, e, n, s, r, o, a) {
  let c;
  if (
    (t.side === $e
      ? (c = n.intersectTriangle(o, r, s, !0, a))
      : (c = n.intersectTriangle(s, r, o, t.side === ii, a)),
    c === null)
  )
    return null;
  (tr.copy(a), tr.applyMatrix4(i.matrixWorld));
  const l = e.ray.origin.distanceTo(tr);
  return l < e.near || l > e.far
    ? null
    : { distance: l, point: tr.clone(), object: i };
}
function er(i, t, e, n, s, r, o, a, c, l) {
  (i.getVertexPosition(a, js),
    i.getVertexPosition(c, $s),
    i.getVertexPosition(l, Js));
  const h = Qu(i, t, e, n, js, $s, Js, Oc);
  if (h) {
    const u = new P();
    (vn.getBarycoord(Oc, js, $s, Js, u),
      s && (h.uv = vn.getInterpolatedAttribute(s, a, c, l, u, new at())),
      r && (h.uv1 = vn.getInterpolatedAttribute(r, a, c, l, u, new at())),
      o &&
        ((h.normal = vn.getInterpolatedAttribute(o, a, c, l, u, new P())),
        h.normal.dot(n.direction) > 0 && h.normal.multiplyScalar(-1)));
    const d = { a, b: c, c: l, normal: new P(), materialIndex: 0 };
    (vn.getNormal(js, $s, Js, d.normal), (h.face = d), (h.barycoord = u));
  }
  return h;
}
class le extends ve {
  constructor(t = 1, e = 1, n = 1, s = 1, r = 1, o = 1) {
    (super(),
      (this.type = "BoxGeometry"),
      (this.parameters = {
        width: t,
        height: e,
        depth: n,
        widthSegments: s,
        heightSegments: r,
        depthSegments: o,
      }));
    const a = this;
    ((s = Math.floor(s)), (r = Math.floor(r)), (o = Math.floor(o)));
    const c = [],
      l = [],
      h = [],
      u = [];
    let d = 0,
      f = 0;
    (m("z", "y", "x", -1, -1, n, e, t, o, r, 0),
      m("z", "y", "x", 1, -1, n, e, -t, o, r, 1),
      m("x", "z", "y", 1, 1, t, n, e, s, o, 2),
      m("x", "z", "y", 1, -1, t, n, -e, s, o, 3),
      m("x", "y", "z", 1, -1, t, e, n, s, r, 4),
      m("x", "y", "z", -1, -1, t, e, -n, s, r, 5),
      this.setIndex(c),
      this.setAttribute("position", new we(l, 3)),
      this.setAttribute("normal", new we(h, 3)),
      this.setAttribute("uv", new we(u, 2)));
    function m(_, g, p, A, b, v, R, E, C, L, y) {
      const M = v / C,
        w = R / L,
        I = v / 2,
        F = R / 2,
        B = E / 2,
        k = C + 1,
        G = L + 1;
      let Y = 0,
        H = 0;
      const ct = new P();
      for (let pt = 0; pt < G; pt++) {
        const gt = pt * w - F;
        for (let Lt = 0; Lt < k; Lt++) {
          const $t = Lt * M - I;
          ((ct[_] = $t * A),
            (ct[g] = gt * b),
            (ct[p] = B),
            l.push(ct.x, ct.y, ct.z),
            (ct[_] = 0),
            (ct[g] = 0),
            (ct[p] = E > 0 ? 1 : -1),
            h.push(ct.x, ct.y, ct.z),
            u.push(Lt / C),
            u.push(1 - pt / L),
            (Y += 1));
        }
      }
      for (let pt = 0; pt < L; pt++)
        for (let gt = 0; gt < C; gt++) {
          const Lt = d + gt + k * pt,
            $t = d + gt + k * (pt + 1),
            re = d + (gt + 1) + k * (pt + 1),
            Jt = d + (gt + 1) + k * pt;
          (c.push(Lt, $t, Jt), c.push($t, re, Jt), (H += 6));
        }
      (a.addGroup(f, H, y), (f += H), (d += Y));
    }
  }
  copy(t) {
    return (
      super.copy(t),
      (this.parameters = Object.assign({}, t.parameters)),
      this
    );
  }
  static fromJSON(t) {
    return new le(
      t.width,
      t.height,
      t.depth,
      t.widthSegments,
      t.heightSegments,
      t.depthSegments,
    );
  }
}
function is(i) {
  const t = {};
  for (const e in i) {
    t[e] = {};
    for (const n in i[e]) {
      const s = i[e][n];
      s &&
      (s.isColor ||
        s.isMatrix3 ||
        s.isMatrix4 ||
        s.isVector2 ||
        s.isVector3 ||
        s.isVector4 ||
        s.isTexture ||
        s.isQuaternion)
        ? s.isRenderTargetTexture
          ? (console.warn(
              "UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().",
            ),
            (t[e][n] = null))
          : (t[e][n] = s.clone())
        : Array.isArray(s)
          ? (t[e][n] = s.slice())
          : (t[e][n] = s);
    }
  }
  return t;
}
function He(i) {
  const t = {};
  for (let e = 0; e < i.length; e++) {
    const n = is(i[e]);
    for (const s in n) t[s] = n[s];
  }
  return t;
}
function td(i) {
  const t = [];
  for (let e = 0; e < i.length; e++) t.push(i[e].clone());
  return t;
}
function th(i) {
  const t = i.getRenderTarget();
  return t === null
    ? i.outputColorSpace
    : t.isXRRenderTarget === !0
      ? t.texture.colorSpace
      : ee.workingColorSpace;
}
const ed = { clone: is, merge: He };
var nd = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,
  id = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class Vn extends Ti {
  constructor(t) {
    (super(),
      (this.isShaderMaterial = !0),
      (this.type = "ShaderMaterial"),
      (this.defines = {}),
      (this.uniforms = {}),
      (this.uniformsGroups = []),
      (this.vertexShader = nd),
      (this.fragmentShader = id),
      (this.linewidth = 1),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.fog = !1),
      (this.lights = !1),
      (this.clipping = !1),
      (this.forceSinglePass = !0),
      (this.extensions = { clipCullDistance: !1, multiDraw: !1 }),
      (this.defaultAttributeValues = {
        color: [1, 1, 1],
        uv: [0, 0],
        uv1: [0, 0],
      }),
      (this.index0AttributeName = void 0),
      (this.uniformsNeedUpdate = !1),
      (this.glslVersion = null),
      t !== void 0 && this.setValues(t));
  }
  copy(t) {
    return (
      super.copy(t),
      (this.fragmentShader = t.fragmentShader),
      (this.vertexShader = t.vertexShader),
      (this.uniforms = is(t.uniforms)),
      (this.uniformsGroups = td(t.uniformsGroups)),
      (this.defines = Object.assign({}, t.defines)),
      (this.wireframe = t.wireframe),
      (this.wireframeLinewidth = t.wireframeLinewidth),
      (this.fog = t.fog),
      (this.lights = t.lights),
      (this.clipping = t.clipping),
      (this.extensions = Object.assign({}, t.extensions)),
      (this.glslVersion = t.glslVersion),
      this
    );
  }
  toJSON(t) {
    const e = super.toJSON(t);
    ((e.glslVersion = this.glslVersion), (e.uniforms = {}));
    for (const s in this.uniforms) {
      const o = this.uniforms[s].value;
      o && o.isTexture
        ? (e.uniforms[s] = { type: "t", value: o.toJSON(t).uuid })
        : o && o.isColor
          ? (e.uniforms[s] = { type: "c", value: o.getHex() })
          : o && o.isVector2
            ? (e.uniforms[s] = { type: "v2", value: o.toArray() })
            : o && o.isVector3
              ? (e.uniforms[s] = { type: "v3", value: o.toArray() })
              : o && o.isVector4
                ? (e.uniforms[s] = { type: "v4", value: o.toArray() })
                : o && o.isMatrix3
                  ? (e.uniforms[s] = { type: "m3", value: o.toArray() })
                  : o && o.isMatrix4
                    ? (e.uniforms[s] = { type: "m4", value: o.toArray() })
                    : (e.uniforms[s] = { value: o });
    }
    (Object.keys(this.defines).length > 0 && (e.defines = this.defines),
      (e.vertexShader = this.vertexShader),
      (e.fragmentShader = this.fragmentShader),
      (e.lights = this.lights),
      (e.clipping = this.clipping));
    const n = {};
    for (const s in this.extensions) this.extensions[s] === !0 && (n[s] = !0);
    return (Object.keys(n).length > 0 && (e.extensions = n), e);
  }
}
class eh extends Re {
  constructor() {
    (super(),
      (this.isCamera = !0),
      (this.type = "Camera"),
      (this.matrixWorldInverse = new se()),
      (this.projectionMatrix = new se()),
      (this.projectionMatrixInverse = new se()),
      (this.coordinateSystem = wn),
      (this._reversedDepth = !1));
  }
  get reversedDepth() {
    return this._reversedDepth;
  }
  copy(t, e) {
    return (
      super.copy(t, e),
      this.matrixWorldInverse.copy(t.matrixWorldInverse),
      this.projectionMatrix.copy(t.projectionMatrix),
      this.projectionMatrixInverse.copy(t.projectionMatrixInverse),
      (this.coordinateSystem = t.coordinateSystem),
      this
    );
  }
  getWorldDirection(t) {
    return super.getWorldDirection(t).negate();
  }
  updateMatrixWorld(t) {
    (super.updateMatrixWorld(t),
      this.matrixWorldInverse.copy(this.matrixWorld).invert());
  }
  updateWorldMatrix(t, e) {
    (super.updateWorldMatrix(t, e),
      this.matrixWorldInverse.copy(this.matrixWorld).invert());
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const Zn = new P(),
  zc = new at(),
  kc = new at();
class un extends eh {
  constructor(t = 50, e = 1, n = 0.1, s = 2e3) {
    (super(),
      (this.isPerspectiveCamera = !0),
      (this.type = "PerspectiveCamera"),
      (this.fov = t),
      (this.zoom = 1),
      (this.near = n),
      (this.far = s),
      (this.focus = 10),
      (this.aspect = e),
      (this.view = null),
      (this.filmGauge = 35),
      (this.filmOffset = 0),
      this.updateProjectionMatrix());
  }
  copy(t, e) {
    return (
      super.copy(t, e),
      (this.fov = t.fov),
      (this.zoom = t.zoom),
      (this.near = t.near),
      (this.far = t.far),
      (this.focus = t.focus),
      (this.aspect = t.aspect),
      (this.view = t.view === null ? null : Object.assign({}, t.view)),
      (this.filmGauge = t.filmGauge),
      (this.filmOffset = t.filmOffset),
      this
    );
  }
  setFocalLength(t) {
    const e = (0.5 * this.getFilmHeight()) / t;
    ((this.fov = ya * 2 * Math.atan(e)), this.updateProjectionMatrix());
  }
  getFocalLength() {
    const t = Math.tan(xr * 0.5 * this.fov);
    return (0.5 * this.getFilmHeight()) / t;
  }
  getEffectiveFOV() {
    return ya * 2 * Math.atan(Math.tan(xr * 0.5 * this.fov) / this.zoom);
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  getViewBounds(t, e, n) {
    (Zn.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse),
      e.set(Zn.x, Zn.y).multiplyScalar(-t / Zn.z),
      Zn.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse),
      n.set(Zn.x, Zn.y).multiplyScalar(-t / Zn.z));
  }
  getViewSize(t, e) {
    return (this.getViewBounds(t, zc, kc), e.subVectors(kc, zc));
  }
  setViewOffset(t, e, n, s, r, o) {
    ((this.aspect = t / e),
      this.view === null &&
        (this.view = {
          enabled: !0,
          fullWidth: 1,
          fullHeight: 1,
          offsetX: 0,
          offsetY: 0,
          width: 1,
          height: 1,
        }),
      (this.view.enabled = !0),
      (this.view.fullWidth = t),
      (this.view.fullHeight = e),
      (this.view.offsetX = n),
      (this.view.offsetY = s),
      (this.view.width = r),
      (this.view.height = o),
      this.updateProjectionMatrix());
  }
  clearViewOffset() {
    (this.view !== null && (this.view.enabled = !1),
      this.updateProjectionMatrix());
  }
  updateProjectionMatrix() {
    const t = this.near;
    let e = (t * Math.tan(xr * 0.5 * this.fov)) / this.zoom,
      n = 2 * e,
      s = this.aspect * n,
      r = -0.5 * s;
    const o = this.view;
    if (this.view !== null && this.view.enabled) {
      const c = o.fullWidth,
        l = o.fullHeight;
      ((r += (o.offsetX * s) / c),
        (e -= (o.offsetY * n) / l),
        (s *= o.width / c),
        (n *= o.height / l));
    }
    const a = this.filmOffset;
    (a !== 0 && (r += (t * a) / this.getFilmWidth()),
      this.projectionMatrix.makePerspective(
        r,
        r + s,
        e,
        e - n,
        t,
        this.far,
        this.coordinateSystem,
        this.reversedDepth,
      ),
      this.projectionMatrixInverse.copy(this.projectionMatrix).invert());
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return (
      (e.object.fov = this.fov),
      (e.object.zoom = this.zoom),
      (e.object.near = this.near),
      (e.object.far = this.far),
      (e.object.focus = this.focus),
      (e.object.aspect = this.aspect),
      this.view !== null && (e.object.view = Object.assign({}, this.view)),
      (e.object.filmGauge = this.filmGauge),
      (e.object.filmOffset = this.filmOffset),
      e
    );
  }
}
const Gi = -90,
  Vi = 1;
class sd extends Re {
  constructor(t, e, n) {
    (super(),
      (this.type = "CubeCamera"),
      (this.renderTarget = n),
      (this.coordinateSystem = null),
      (this.activeMipmapLevel = 0));
    const s = new un(Gi, Vi, t, e);
    ((s.layers = this.layers), this.add(s));
    const r = new un(Gi, Vi, t, e);
    ((r.layers = this.layers), this.add(r));
    const o = new un(Gi, Vi, t, e);
    ((o.layers = this.layers), this.add(o));
    const a = new un(Gi, Vi, t, e);
    ((a.layers = this.layers), this.add(a));
    const c = new un(Gi, Vi, t, e);
    ((c.layers = this.layers), this.add(c));
    const l = new un(Gi, Vi, t, e);
    ((l.layers = this.layers), this.add(l));
  }
  updateCoordinateSystem() {
    const t = this.coordinateSystem,
      e = this.children.concat(),
      [n, s, r, o, a, c] = e;
    for (const l of e) this.remove(l);
    if (t === wn)
      (n.up.set(0, 1, 0),
        n.lookAt(1, 0, 0),
        s.up.set(0, 1, 0),
        s.lookAt(-1, 0, 0),
        r.up.set(0, 0, -1),
        r.lookAt(0, 1, 0),
        o.up.set(0, 0, 1),
        o.lookAt(0, -1, 0),
        a.up.set(0, 1, 0),
        a.lookAt(0, 0, 1),
        c.up.set(0, 1, 0),
        c.lookAt(0, 0, -1));
    else if (t === wr)
      (n.up.set(0, -1, 0),
        n.lookAt(-1, 0, 0),
        s.up.set(0, -1, 0),
        s.lookAt(1, 0, 0),
        r.up.set(0, 0, 1),
        r.lookAt(0, 1, 0),
        o.up.set(0, 0, -1),
        o.lookAt(0, -1, 0),
        a.up.set(0, -1, 0),
        a.lookAt(0, 0, 1),
        c.up.set(0, -1, 0),
        c.lookAt(0, 0, -1));
    else
      throw new Error(
        "THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " +
          t,
      );
    for (const l of e) (this.add(l), l.updateMatrixWorld());
  }
  update(t, e) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: n, activeMipmapLevel: s } = this;
    this.coordinateSystem !== t.coordinateSystem &&
      ((this.coordinateSystem = t.coordinateSystem),
      this.updateCoordinateSystem());
    const [r, o, a, c, l, h] = this.children,
      u = t.getRenderTarget(),
      d = t.getActiveCubeFace(),
      f = t.getActiveMipmapLevel(),
      m = t.xr.enabled;
    t.xr.enabled = !1;
    const _ = n.texture.generateMipmaps;
    ((n.texture.generateMipmaps = !1),
      t.setRenderTarget(n, 0, s),
      t.render(e, r),
      t.setRenderTarget(n, 1, s),
      t.render(e, o),
      t.setRenderTarget(n, 2, s),
      t.render(e, a),
      t.setRenderTarget(n, 3, s),
      t.render(e, c),
      t.setRenderTarget(n, 4, s),
      t.render(e, l),
      (n.texture.generateMipmaps = _),
      t.setRenderTarget(n, 5, s),
      t.render(e, h),
      t.setRenderTarget(u, d, f),
      (t.xr.enabled = m),
      (n.texture.needsPMREMUpdate = !0));
  }
}
class nh extends We {
  constructor(t = [], e = ts, n, s, r, o, a, c, l, h) {
    (super(t, e, n, s, r, o, a, c, l, h),
      (this.isCubeTexture = !0),
      (this.flipY = !1));
  }
  get images() {
    return this.image;
  }
  set images(t) {
    this.image = t;
  }
}
class rd extends Gn {
  constructor(t = 1, e = {}) {
    (super(t, t, e), (this.isWebGLCubeRenderTarget = !0));
    const n = { width: t, height: t, depth: 1 },
      s = [n, n, n, n, n, n];
    ((this.texture = new nh(s)),
      this._setTextureOptions(e),
      (this.texture.isRenderTargetTexture = !0));
  }
  fromEquirectangularTexture(t, e) {
    ((this.texture.type = e.type),
      (this.texture.colorSpace = e.colorSpace),
      (this.texture.generateMipmaps = e.generateMipmaps),
      (this.texture.minFilter = e.minFilter),
      (this.texture.magFilter = e.magFilter));
    const n = {
        uniforms: { tEquirect: { value: null } },
        vertexShader: `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,
        fragmentShader: `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`,
      },
      s = new le(5, 5, 5),
      r = new Vn({
        name: "CubemapFromEquirect",
        uniforms: is(n.uniforms),
        vertexShader: n.vertexShader,
        fragmentShader: n.fragmentShader,
        side: $e,
        blending: ti,
      });
    r.uniforms.tEquirect.value = e;
    const o = new he(s, r),
      a = e.minFilter;
    return (
      e.minFilter === xi && (e.minFilter = Ze),
      new sd(1, 10, this).update(t, o),
      (e.minFilter = a),
      o.geometry.dispose(),
      o.material.dispose(),
      this
    );
  }
  clear(t, e = !0, n = !0, s = !0) {
    const r = t.getRenderTarget();
    for (let o = 0; o < 6; o++) (t.setRenderTarget(this, o), t.clear(e, n, s));
    t.setRenderTarget(r);
  }
}
class rn extends Re {
  constructor() {
    (super(), (this.isGroup = !0), (this.type = "Group"));
  }
}
const od = { type: "move" };
class mo {
  constructor() {
    ((this._targetRay = null), (this._grip = null), (this._hand = null));
  }
  getHandSpace() {
    return (
      this._hand === null &&
        ((this._hand = new rn()),
        (this._hand.matrixAutoUpdate = !1),
        (this._hand.visible = !1),
        (this._hand.joints = {}),
        (this._hand.inputState = { pinching: !1 })),
      this._hand
    );
  }
  getTargetRaySpace() {
    return (
      this._targetRay === null &&
        ((this._targetRay = new rn()),
        (this._targetRay.matrixAutoUpdate = !1),
        (this._targetRay.visible = !1),
        (this._targetRay.hasLinearVelocity = !1),
        (this._targetRay.linearVelocity = new P()),
        (this._targetRay.hasAngularVelocity = !1),
        (this._targetRay.angularVelocity = new P())),
      this._targetRay
    );
  }
  getGripSpace() {
    return (
      this._grip === null &&
        ((this._grip = new rn()),
        (this._grip.matrixAutoUpdate = !1),
        (this._grip.visible = !1),
        (this._grip.hasLinearVelocity = !1),
        (this._grip.linearVelocity = new P()),
        (this._grip.hasAngularVelocity = !1),
        (this._grip.angularVelocity = new P())),
      this._grip
    );
  }
  dispatchEvent(t) {
    return (
      this._targetRay !== null && this._targetRay.dispatchEvent(t),
      this._grip !== null && this._grip.dispatchEvent(t),
      this._hand !== null && this._hand.dispatchEvent(t),
      this
    );
  }
  connect(t) {
    if (t && t.hand) {
      const e = this._hand;
      if (e) for (const n of t.hand.values()) this._getHandJoint(e, n);
    }
    return (this.dispatchEvent({ type: "connected", data: t }), this);
  }
  disconnect(t) {
    return (
      this.dispatchEvent({ type: "disconnected", data: t }),
      this._targetRay !== null && (this._targetRay.visible = !1),
      this._grip !== null && (this._grip.visible = !1),
      this._hand !== null && (this._hand.visible = !1),
      this
    );
  }
  update(t, e, n) {
    let s = null,
      r = null,
      o = null;
    const a = this._targetRay,
      c = this._grip,
      l = this._hand;
    if (t && e.session.visibilityState !== "visible-blurred") {
      if (l && t.hand) {
        o = !0;
        for (const _ of t.hand.values()) {
          const g = e.getJointPose(_, n),
            p = this._getHandJoint(l, _);
          (g !== null &&
            (p.matrix.fromArray(g.transform.matrix),
            p.matrix.decompose(p.position, p.rotation, p.scale),
            (p.matrixWorldNeedsUpdate = !0),
            (p.jointRadius = g.radius)),
            (p.visible = g !== null));
        }
        const h = l.joints["index-finger-tip"],
          u = l.joints["thumb-tip"],
          d = h.position.distanceTo(u.position),
          f = 0.02,
          m = 0.005;
        l.inputState.pinching && d > f + m
          ? ((l.inputState.pinching = !1),
            this.dispatchEvent({
              type: "pinchend",
              handedness: t.handedness,
              target: this,
            }))
          : !l.inputState.pinching &&
            d <= f - m &&
            ((l.inputState.pinching = !0),
            this.dispatchEvent({
              type: "pinchstart",
              handedness: t.handedness,
              target: this,
            }));
      } else
        c !== null &&
          t.gripSpace &&
          ((r = e.getPose(t.gripSpace, n)),
          r !== null &&
            (c.matrix.fromArray(r.transform.matrix),
            c.matrix.decompose(c.position, c.rotation, c.scale),
            (c.matrixWorldNeedsUpdate = !0),
            r.linearVelocity
              ? ((c.hasLinearVelocity = !0),
                c.linearVelocity.copy(r.linearVelocity))
              : (c.hasLinearVelocity = !1),
            r.angularVelocity
              ? ((c.hasAngularVelocity = !0),
                c.angularVelocity.copy(r.angularVelocity))
              : (c.hasAngularVelocity = !1)));
      a !== null &&
        ((s = e.getPose(t.targetRaySpace, n)),
        s === null && r !== null && (s = r),
        s !== null &&
          (a.matrix.fromArray(s.transform.matrix),
          a.matrix.decompose(a.position, a.rotation, a.scale),
          (a.matrixWorldNeedsUpdate = !0),
          s.linearVelocity
            ? ((a.hasLinearVelocity = !0),
              a.linearVelocity.copy(s.linearVelocity))
            : (a.hasLinearVelocity = !1),
          s.angularVelocity
            ? ((a.hasAngularVelocity = !0),
              a.angularVelocity.copy(s.angularVelocity))
            : (a.hasAngularVelocity = !1),
          this.dispatchEvent(od)));
    }
    return (
      a !== null && (a.visible = s !== null),
      c !== null && (c.visible = r !== null),
      l !== null && (l.visible = o !== null),
      this
    );
  }
  _getHandJoint(t, e) {
    if (t.joints[e.jointName] === void 0) {
      const n = new rn();
      ((n.matrixAutoUpdate = !1),
        (n.visible = !1),
        (t.joints[e.jointName] = n),
        t.add(n));
    }
    return t.joints[e.jointName];
  }
}
class Xa {
  constructor(t, e = 25e-5) {
    ((this.isFogExp2 = !0),
      (this.name = ""),
      (this.color = new Ht(t)),
      (this.density = e));
  }
  clone() {
    return new Xa(this.color, this.density);
  }
  toJSON() {
    return {
      type: "FogExp2",
      name: this.name,
      color: this.color.getHex(),
      density: this.density,
    };
  }
}
class ih extends Re {
  constructor() {
    (super(),
      (this.isScene = !0),
      (this.type = "Scene"),
      (this.background = null),
      (this.environment = null),
      (this.fog = null),
      (this.backgroundBlurriness = 0),
      (this.backgroundIntensity = 1),
      (this.backgroundRotation = new yn()),
      (this.environmentIntensity = 1),
      (this.environmentRotation = new yn()),
      (this.overrideMaterial = null),
      typeof __THREE_DEVTOOLS__ < "u" &&
        __THREE_DEVTOOLS__.dispatchEvent(
          new CustomEvent("observe", { detail: this }),
        ));
  }
  copy(t, e) {
    return (
      super.copy(t, e),
      t.background !== null && (this.background = t.background.clone()),
      t.environment !== null && (this.environment = t.environment.clone()),
      t.fog !== null && (this.fog = t.fog.clone()),
      (this.backgroundBlurriness = t.backgroundBlurriness),
      (this.backgroundIntensity = t.backgroundIntensity),
      this.backgroundRotation.copy(t.backgroundRotation),
      (this.environmentIntensity = t.environmentIntensity),
      this.environmentRotation.copy(t.environmentRotation),
      t.overrideMaterial !== null &&
        (this.overrideMaterial = t.overrideMaterial.clone()),
      (this.matrixAutoUpdate = t.matrixAutoUpdate),
      this
    );
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return (
      this.fog !== null && (e.object.fog = this.fog.toJSON()),
      this.backgroundBlurriness > 0 &&
        (e.object.backgroundBlurriness = this.backgroundBlurriness),
      this.backgroundIntensity !== 1 &&
        (e.object.backgroundIntensity = this.backgroundIntensity),
      (e.object.backgroundRotation = this.backgroundRotation.toArray()),
      this.environmentIntensity !== 1 &&
        (e.object.environmentIntensity = this.environmentIntensity),
      (e.object.environmentRotation = this.environmentRotation.toArray()),
      e
    );
  }
}
class ad extends We {
  constructor(t = null, e = 1, n = 1, s, r, o, a, c, l = on, h = on, u, d) {
    (super(null, o, a, c, l, h, s, r, u, d),
      (this.isDataTexture = !0),
      (this.image = { data: t, width: e, height: n }),
      (this.generateMipmaps = !1),
      (this.flipY = !1),
      (this.unpackAlignment = 1));
  }
}
class Bc extends pe {
  constructor(t, e, n, s = 1) {
    (super(t, e, n),
      (this.isInstancedBufferAttribute = !0),
      (this.meshPerAttribute = s));
  }
  copy(t) {
    return (super.copy(t), (this.meshPerAttribute = t.meshPerAttribute), this);
  }
  toJSON() {
    const t = super.toJSON();
    return (
      (t.meshPerAttribute = this.meshPerAttribute),
      (t.isInstancedBufferAttribute = !0),
      t
    );
  }
}
const Wi = new se(),
  Hc = new se(),
  nr = [],
  Gc = new wi(),
  cd = new se(),
  vs = new he(),
  xs = new cs();
class sh extends he {
  constructor(t, e, n) {
    (super(t, e),
      (this.isInstancedMesh = !0),
      (this.instanceMatrix = new Bc(new Float32Array(n * 16), 16)),
      (this.instanceColor = null),
      (this.morphTexture = null),
      (this.count = n),
      (this.boundingBox = null),
      (this.boundingSphere = null));
    for (let s = 0; s < n; s++) this.setMatrixAt(s, cd);
  }
  computeBoundingBox() {
    const t = this.geometry,
      e = this.count;
    (this.boundingBox === null && (this.boundingBox = new wi()),
      t.boundingBox === null && t.computeBoundingBox(),
      this.boundingBox.makeEmpty());
    for (let n = 0; n < e; n++)
      (this.getMatrixAt(n, Wi),
        Gc.copy(t.boundingBox).applyMatrix4(Wi),
        this.boundingBox.union(Gc));
  }
  computeBoundingSphere() {
    const t = this.geometry,
      e = this.count;
    (this.boundingSphere === null && (this.boundingSphere = new cs()),
      t.boundingSphere === null && t.computeBoundingSphere(),
      this.boundingSphere.makeEmpty());
    for (let n = 0; n < e; n++)
      (this.getMatrixAt(n, Wi),
        xs.copy(t.boundingSphere).applyMatrix4(Wi),
        this.boundingSphere.union(xs));
  }
  copy(t, e) {
    return (
      super.copy(t, e),
      this.instanceMatrix.copy(t.instanceMatrix),
      t.morphTexture !== null && (this.morphTexture = t.morphTexture.clone()),
      t.instanceColor !== null &&
        (this.instanceColor = t.instanceColor.clone()),
      (this.count = t.count),
      t.boundingBox !== null && (this.boundingBox = t.boundingBox.clone()),
      t.boundingSphere !== null &&
        (this.boundingSphere = t.boundingSphere.clone()),
      this
    );
  }
  getColorAt(t, e) {
    e.fromArray(this.instanceColor.array, t * 3);
  }
  getMatrixAt(t, e) {
    e.fromArray(this.instanceMatrix.array, t * 16);
  }
  getMorphAt(t, e) {
    const n = e.morphTargetInfluences,
      s = this.morphTexture.source.data.data,
      r = n.length + 1,
      o = t * r + 1;
    for (let a = 0; a < n.length; a++) n[a] = s[o + a];
  }
  raycast(t, e) {
    const n = this.matrixWorld,
      s = this.count;
    if (
      ((vs.geometry = this.geometry),
      (vs.material = this.material),
      vs.material !== void 0 &&
        (this.boundingSphere === null && this.computeBoundingSphere(),
        xs.copy(this.boundingSphere),
        xs.applyMatrix4(n),
        t.ray.intersectsSphere(xs) !== !1))
    )
      for (let r = 0; r < s; r++) {
        (this.getMatrixAt(r, Wi),
          Hc.multiplyMatrices(n, Wi),
          (vs.matrixWorld = Hc),
          vs.raycast(t, nr));
        for (let o = 0, a = nr.length; o < a; o++) {
          const c = nr[o];
          ((c.instanceId = r), (c.object = this), e.push(c));
        }
        nr.length = 0;
      }
  }
  setColorAt(t, e) {
    (this.instanceColor === null &&
      (this.instanceColor = new Bc(
        new Float32Array(this.instanceMatrix.count * 3).fill(1),
        3,
      )),
      e.toArray(this.instanceColor.array, t * 3));
  }
  setMatrixAt(t, e) {
    e.toArray(this.instanceMatrix.array, t * 16);
  }
  setMorphAt(t, e) {
    const n = e.morphTargetInfluences,
      s = n.length + 1;
    this.morphTexture === null &&
      (this.morphTexture = new ad(
        new Float32Array(s * this.count),
        s,
        this.count,
        za,
        En,
      ));
    const r = this.morphTexture.source.data.data;
    let o = 0;
    for (let l = 0; l < n.length; l++) o += n[l];
    const a = this.geometry.morphTargetsRelative ? 1 : 1 - o,
      c = s * t;
    ((r[c] = a), r.set(n, c + 1));
  }
  updateMorphTargets() {}
  dispose() {
    (this.dispatchEvent({ type: "dispose" }),
      this.morphTexture !== null &&
        (this.morphTexture.dispose(), (this.morphTexture = null)));
  }
}
const go = new P(),
  ld = new P(),
  hd = new Vt();
class Fn {
  constructor(t = new P(1, 0, 0), e = 0) {
    ((this.isPlane = !0), (this.normal = t), (this.constant = e));
  }
  set(t, e) {
    return (this.normal.copy(t), (this.constant = e), this);
  }
  setComponents(t, e, n, s) {
    return (this.normal.set(t, e, n), (this.constant = s), this);
  }
  setFromNormalAndCoplanarPoint(t, e) {
    return (this.normal.copy(t), (this.constant = -e.dot(this.normal)), this);
  }
  setFromCoplanarPoints(t, e, n) {
    const s = go.subVectors(n, e).cross(ld.subVectors(t, e)).normalize();
    return (this.setFromNormalAndCoplanarPoint(s, t), this);
  }
  copy(t) {
    return (this.normal.copy(t.normal), (this.constant = t.constant), this);
  }
  normalize() {
    const t = 1 / this.normal.length();
    return (this.normal.multiplyScalar(t), (this.constant *= t), this);
  }
  negate() {
    return ((this.constant *= -1), this.normal.negate(), this);
  }
  distanceToPoint(t) {
    return this.normal.dot(t) + this.constant;
  }
  distanceToSphere(t) {
    return this.distanceToPoint(t.center) - t.radius;
  }
  projectPoint(t, e) {
    return e.copy(t).addScaledVector(this.normal, -this.distanceToPoint(t));
  }
  intersectLine(t, e) {
    const n = t.delta(go),
      s = this.normal.dot(n);
    if (s === 0)
      return this.distanceToPoint(t.start) === 0 ? e.copy(t.start) : null;
    const r = -(t.start.dot(this.normal) + this.constant) / s;
    return r < 0 || r > 1 ? null : e.copy(t.start).addScaledVector(n, r);
  }
  intersectsLine(t) {
    const e = this.distanceToPoint(t.start),
      n = this.distanceToPoint(t.end);
    return (e < 0 && n > 0) || (n < 0 && e > 0);
  }
  intersectsBox(t) {
    return t.intersectsPlane(this);
  }
  intersectsSphere(t) {
    return t.intersectsPlane(this);
  }
  coplanarPoint(t) {
    return t.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4(t, e) {
    const n = e || hd.getNormalMatrix(t),
      s = this.coplanarPoint(go).applyMatrix4(t),
      r = this.normal.applyMatrix3(n).normalize();
    return ((this.constant = -s.dot(r)), this);
  }
  translate(t) {
    return ((this.constant -= t.dot(this.normal)), this);
  }
  equals(t) {
    return t.normal.equals(this.normal) && t.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const di = new cs(),
  ud = new at(0.5, 0.5),
  ir = new P();
class qa {
  constructor(
    t = new Fn(),
    e = new Fn(),
    n = new Fn(),
    s = new Fn(),
    r = new Fn(),
    o = new Fn(),
  ) {
    this.planes = [t, e, n, s, r, o];
  }
  set(t, e, n, s, r, o) {
    const a = this.planes;
    return (
      a[0].copy(t),
      a[1].copy(e),
      a[2].copy(n),
      a[3].copy(s),
      a[4].copy(r),
      a[5].copy(o),
      this
    );
  }
  copy(t) {
    const e = this.planes;
    for (let n = 0; n < 6; n++) e[n].copy(t.planes[n]);
    return this;
  }
  setFromProjectionMatrix(t, e = wn, n = !1) {
    const s = this.planes,
      r = t.elements,
      o = r[0],
      a = r[1],
      c = r[2],
      l = r[3],
      h = r[4],
      u = r[5],
      d = r[6],
      f = r[7],
      m = r[8],
      _ = r[9],
      g = r[10],
      p = r[11],
      A = r[12],
      b = r[13],
      v = r[14],
      R = r[15];
    if (
      (s[0].setComponents(l - o, f - h, p - m, R - A).normalize(),
      s[1].setComponents(l + o, f + h, p + m, R + A).normalize(),
      s[2].setComponents(l + a, f + u, p + _, R + b).normalize(),
      s[3].setComponents(l - a, f - u, p - _, R - b).normalize(),
      n)
    )
      (s[4].setComponents(c, d, g, v).normalize(),
        s[5].setComponents(l - c, f - d, p - g, R - v).normalize());
    else if (
      (s[4].setComponents(l - c, f - d, p - g, R - v).normalize(), e === wn)
    )
      s[5].setComponents(l + c, f + d, p + g, R + v).normalize();
    else if (e === wr) s[5].setComponents(c, d, g, v).normalize();
    else
      throw new Error(
        "THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " +
          e,
      );
    return this;
  }
  intersectsObject(t) {
    if (t.boundingSphere !== void 0)
      (t.boundingSphere === null && t.computeBoundingSphere(),
        di.copy(t.boundingSphere).applyMatrix4(t.matrixWorld));
    else {
      const e = t.geometry;
      (e.boundingSphere === null && e.computeBoundingSphere(),
        di.copy(e.boundingSphere).applyMatrix4(t.matrixWorld));
    }
    return this.intersectsSphere(di);
  }
  intersectsSprite(t) {
    di.center.set(0, 0, 0);
    const e = ud.distanceTo(t.center);
    return (
      (di.radius = 0.7071067811865476 + e),
      di.applyMatrix4(t.matrixWorld),
      this.intersectsSphere(di)
    );
  }
  intersectsSphere(t) {
    const e = this.planes,
      n = t.center,
      s = -t.radius;
    for (let r = 0; r < 6; r++) if (e[r].distanceToPoint(n) < s) return !1;
    return !0;
  }
  intersectsBox(t) {
    const e = this.planes;
    for (let n = 0; n < 6; n++) {
      const s = e[n];
      if (
        ((ir.x = s.normal.x > 0 ? t.max.x : t.min.x),
        (ir.y = s.normal.y > 0 ? t.max.y : t.min.y),
        (ir.z = s.normal.z > 0 ? t.max.z : t.min.z),
        s.distanceToPoint(ir) < 0)
      )
        return !1;
    }
    return !0;
  }
  containsPoint(t) {
    const e = this.planes;
    for (let n = 0; n < 6; n++) if (e[n].distanceToPoint(t) < 0) return !1;
    return !0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class Ya extends Ti {
  constructor(t) {
    (super(),
      (this.isLineBasicMaterial = !0),
      (this.type = "LineBasicMaterial"),
      (this.color = new Ht(16777215)),
      (this.map = null),
      (this.linewidth = 1),
      (this.linecap = "round"),
      (this.linejoin = "round"),
      (this.fog = !0),
      this.setValues(t));
  }
  copy(t) {
    return (
      super.copy(t),
      this.color.copy(t.color),
      (this.map = t.map),
      (this.linewidth = t.linewidth),
      (this.linecap = t.linecap),
      (this.linejoin = t.linejoin),
      (this.fog = t.fog),
      this
    );
  }
}
const Ar = new P(),
  Rr = new P(),
  Vc = new se(),
  ys = new Br(),
  sr = new cs(),
  _o = new P(),
  Wc = new P();
class yr extends Re {
  constructor(t = new ve(), e = new Ya()) {
    (super(),
      (this.isLine = !0),
      (this.type = "Line"),
      (this.geometry = t),
      (this.material = e),
      (this.morphTargetDictionary = void 0),
      (this.morphTargetInfluences = void 0),
      this.updateMorphTargets());
  }
  copy(t, e) {
    return (
      super.copy(t, e),
      (this.material = Array.isArray(t.material)
        ? t.material.slice()
        : t.material),
      (this.geometry = t.geometry),
      this
    );
  }
  computeLineDistances() {
    const t = this.geometry;
    if (t.index === null) {
      const e = t.attributes.position,
        n = [0];
      for (let s = 1, r = e.count; s < r; s++)
        (Ar.fromBufferAttribute(e, s - 1),
          Rr.fromBufferAttribute(e, s),
          (n[s] = n[s - 1]),
          (n[s] += Ar.distanceTo(Rr)));
      t.setAttribute("lineDistance", new we(n, 1));
    } else
      console.warn(
        "THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.",
      );
    return this;
  }
  raycast(t, e) {
    const n = this.geometry,
      s = this.matrixWorld,
      r = t.params.Line.threshold,
      o = n.drawRange;
    if (
      (n.boundingSphere === null && n.computeBoundingSphere(),
      sr.copy(n.boundingSphere),
      sr.applyMatrix4(s),
      (sr.radius += r),
      t.ray.intersectsSphere(sr) === !1)
    )
      return;
    (Vc.copy(s).invert(), ys.copy(t.ray).applyMatrix4(Vc));
    const a = r / ((this.scale.x + this.scale.y + this.scale.z) / 3),
      c = a * a,
      l = this.isLineSegments ? 2 : 1,
      h = n.index,
      d = n.attributes.position;
    if (h !== null) {
      const f = Math.max(0, o.start),
        m = Math.min(h.count, o.start + o.count);
      for (let _ = f, g = m - 1; _ < g; _ += l) {
        const p = h.getX(_),
          A = h.getX(_ + 1),
          b = rr(this, t, ys, c, p, A, _);
        b && e.push(b);
      }
      if (this.isLineLoop) {
        const _ = h.getX(m - 1),
          g = h.getX(f),
          p = rr(this, t, ys, c, _, g, m - 1);
        p && e.push(p);
      }
    } else {
      const f = Math.max(0, o.start),
        m = Math.min(d.count, o.start + o.count);
      for (let _ = f, g = m - 1; _ < g; _ += l) {
        const p = rr(this, t, ys, c, _, _ + 1, _);
        p && e.push(p);
      }
      if (this.isLineLoop) {
        const _ = rr(this, t, ys, c, m - 1, f, m - 1);
        _ && e.push(_);
      }
    }
  }
  updateMorphTargets() {
    const e = this.geometry.morphAttributes,
      n = Object.keys(e);
    if (n.length > 0) {
      const s = e[n[0]];
      if (s !== void 0) {
        ((this.morphTargetInfluences = []), (this.morphTargetDictionary = {}));
        for (let r = 0, o = s.length; r < o; r++) {
          const a = s[r].name || String(r);
          (this.morphTargetInfluences.push(0),
            (this.morphTargetDictionary[a] = r));
        }
      }
    }
  }
}
function rr(i, t, e, n, s, r, o) {
  const a = i.geometry.attributes.position;
  if (
    (Ar.fromBufferAttribute(a, s),
    Rr.fromBufferAttribute(a, r),
    e.distanceSqToSegment(Ar, Rr, _o, Wc) > n)
  )
    return;
  _o.applyMatrix4(i.matrixWorld);
  const l = t.ray.origin.distanceTo(_o);
  if (!(l < t.near || l > t.far))
    return {
      distance: l,
      point: Wc.clone().applyMatrix4(i.matrixWorld),
      index: o,
      face: null,
      faceIndex: null,
      barycoord: null,
      object: i,
    };
}
class Ka extends We {
  constructor(t, e, n = si, s, r, o, a = on, c = on, l, h = As, u = 1) {
    if (h !== As && h !== Rs)
      throw new Error(
        "DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat",
      );
    const d = { width: t, height: e, depth: u };
    (super(d, s, r, o, a, c, h, n, l),
      (this.isDepthTexture = !0),
      (this.flipY = !1),
      (this.generateMipmaps = !1),
      (this.compareFunction = null));
  }
  copy(t) {
    return (
      super.copy(t),
      (this.source = new Va(Object.assign({}, t.image))),
      (this.compareFunction = t.compareFunction),
      this
    );
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return (
      this.compareFunction !== null &&
        (e.compareFunction = this.compareFunction),
      e
    );
  }
}
class rh extends We {
  constructor(t = null) {
    (super(), (this.sourceTexture = t), (this.isExternalTexture = !0));
  }
  copy(t) {
    return (super.copy(t), (this.sourceTexture = t.sourceTexture), this);
  }
}
class Fe extends ve {
  constructor(
    t = 1,
    e = 1,
    n = 1,
    s = 32,
    r = 1,
    o = !1,
    a = 0,
    c = Math.PI * 2,
  ) {
    (super(),
      (this.type = "CylinderGeometry"),
      (this.parameters = {
        radiusTop: t,
        radiusBottom: e,
        height: n,
        radialSegments: s,
        heightSegments: r,
        openEnded: o,
        thetaStart: a,
        thetaLength: c,
      }));
    const l = this;
    ((s = Math.floor(s)), (r = Math.floor(r)));
    const h = [],
      u = [],
      d = [],
      f = [];
    let m = 0;
    const _ = [],
      g = n / 2;
    let p = 0;
    (A(),
      o === !1 && (t > 0 && b(!0), e > 0 && b(!1)),
      this.setIndex(h),
      this.setAttribute("position", new we(u, 3)),
      this.setAttribute("normal", new we(d, 3)),
      this.setAttribute("uv", new we(f, 2)));
    function A() {
      const v = new P(),
        R = new P();
      let E = 0;
      const C = (e - t) / n;
      for (let L = 0; L <= r; L++) {
        const y = [],
          M = L / r,
          w = M * (e - t) + t;
        for (let I = 0; I <= s; I++) {
          const F = I / s,
            B = F * c + a,
            k = Math.sin(B),
            G = Math.cos(B);
          ((R.x = w * k),
            (R.y = -M * n + g),
            (R.z = w * G),
            u.push(R.x, R.y, R.z),
            v.set(k, C, G).normalize(),
            d.push(v.x, v.y, v.z),
            f.push(F, 1 - M),
            y.push(m++));
        }
        _.push(y);
      }
      for (let L = 0; L < s; L++)
        for (let y = 0; y < r; y++) {
          const M = _[y][L],
            w = _[y + 1][L],
            I = _[y + 1][L + 1],
            F = _[y][L + 1];
          ((t > 0 || y !== 0) && (h.push(M, w, F), (E += 3)),
            (e > 0 || y !== r - 1) && (h.push(w, I, F), (E += 3)));
        }
      (l.addGroup(p, E, 0), (p += E));
    }
    function b(v) {
      const R = m,
        E = new at(),
        C = new P();
      let L = 0;
      const y = v === !0 ? t : e,
        M = v === !0 ? 1 : -1;
      for (let I = 1; I <= s; I++)
        (u.push(0, g * M, 0), d.push(0, M, 0), f.push(0.5, 0.5), m++);
      const w = m;
      for (let I = 0; I <= s; I++) {
        const B = (I / s) * c + a,
          k = Math.cos(B),
          G = Math.sin(B);
        ((C.x = y * G),
          (C.y = g * M),
          (C.z = y * k),
          u.push(C.x, C.y, C.z),
          d.push(0, M, 0),
          (E.x = k * 0.5 + 0.5),
          (E.y = G * 0.5 * M + 0.5),
          f.push(E.x, E.y),
          m++);
      }
      for (let I = 0; I < s; I++) {
        const F = R + I,
          B = w + I;
        (v === !0 ? h.push(B, B + 1, F) : h.push(B + 1, B, F), (L += 3));
      }
      (l.addGroup(p, L, v === !0 ? 1 : 2), (p += L));
    }
  }
  copy(t) {
    return (
      super.copy(t),
      (this.parameters = Object.assign({}, t.parameters)),
      this
    );
  }
  static fromJSON(t) {
    return new Fe(
      t.radiusTop,
      t.radiusBottom,
      t.height,
      t.radialSegments,
      t.heightSegments,
      t.openEnded,
      t.thetaStart,
      t.thetaLength,
    );
  }
}
class ls extends Fe {
  constructor(t = 1, e = 1, n = 32, s = 1, r = !1, o = 0, a = Math.PI * 2) {
    (super(0, t, e, n, s, r, o, a),
      (this.type = "ConeGeometry"),
      (this.parameters = {
        radius: t,
        height: e,
        radialSegments: n,
        heightSegments: s,
        openEnded: r,
        thetaStart: o,
        thetaLength: a,
      }));
  }
  static fromJSON(t) {
    return new ls(
      t.radius,
      t.height,
      t.radialSegments,
      t.heightSegments,
      t.openEnded,
      t.thetaStart,
      t.thetaLength,
    );
  }
}
class An {
  constructor() {
    ((this.type = "Curve"),
      (this.arcLengthDivisions = 200),
      (this.needsUpdate = !1),
      (this.cacheArcLengths = null));
  }
  getPoint() {
    console.warn("THREE.Curve: .getPoint() not implemented.");
  }
  getPointAt(t, e) {
    const n = this.getUtoTmapping(t);
    return this.getPoint(n, e);
  }
  getPoints(t = 5) {
    const e = [];
    for (let n = 0; n <= t; n++) e.push(this.getPoint(n / t));
    return e;
  }
  getSpacedPoints(t = 5) {
    const e = [];
    for (let n = 0; n <= t; n++) e.push(this.getPointAt(n / t));
    return e;
  }
  getLength() {
    const t = this.getLengths();
    return t[t.length - 1];
  }
  getLengths(t = this.arcLengthDivisions) {
    if (
      this.cacheArcLengths &&
      this.cacheArcLengths.length === t + 1 &&
      !this.needsUpdate
    )
      return this.cacheArcLengths;
    this.needsUpdate = !1;
    const e = [];
    let n,
      s = this.getPoint(0),
      r = 0;
    e.push(0);
    for (let o = 1; o <= t; o++)
      ((n = this.getPoint(o / t)), (r += n.distanceTo(s)), e.push(r), (s = n));
    return ((this.cacheArcLengths = e), e);
  }
  updateArcLengths() {
    ((this.needsUpdate = !0), this.getLengths());
  }
  getUtoTmapping(t, e = null) {
    const n = this.getLengths();
    let s = 0;
    const r = n.length;
    let o;
    e ? (o = e) : (o = t * n[r - 1]);
    let a = 0,
      c = r - 1,
      l;
    for (; a <= c; )
      if (((s = Math.floor(a + (c - a) / 2)), (l = n[s] - o), l < 0)) a = s + 1;
      else if (l > 0) c = s - 1;
      else {
        c = s;
        break;
      }
    if (((s = c), n[s] === o)) return s / (r - 1);
    const h = n[s],
      d = n[s + 1] - h,
      f = (o - h) / d;
    return (s + f) / (r - 1);
  }
  getTangent(t, e) {
    let s = t - 1e-4,
      r = t + 1e-4;
    (s < 0 && (s = 0), r > 1 && (r = 1));
    const o = this.getPoint(s),
      a = this.getPoint(r),
      c = e || (o.isVector2 ? new at() : new P());
    return (c.copy(a).sub(o).normalize(), c);
  }
  getTangentAt(t, e) {
    const n = this.getUtoTmapping(t);
    return this.getTangent(n, e);
  }
  computeFrenetFrames(t, e = !1) {
    const n = new P(),
      s = [],
      r = [],
      o = [],
      a = new P(),
      c = new se();
    for (let f = 0; f <= t; f++) {
      const m = f / t;
      s[f] = this.getTangentAt(m, new P());
    }
    ((r[0] = new P()), (o[0] = new P()));
    let l = Number.MAX_VALUE;
    const h = Math.abs(s[0].x),
      u = Math.abs(s[0].y),
      d = Math.abs(s[0].z);
    (h <= l && ((l = h), n.set(1, 0, 0)),
      u <= l && ((l = u), n.set(0, 1, 0)),
      d <= l && n.set(0, 0, 1),
      a.crossVectors(s[0], n).normalize(),
      r[0].crossVectors(s[0], a),
      o[0].crossVectors(s[0], r[0]));
    for (let f = 1; f <= t; f++) {
      if (
        ((r[f] = r[f - 1].clone()),
        (o[f] = o[f - 1].clone()),
        a.crossVectors(s[f - 1], s[f]),
        a.length() > Number.EPSILON)
      ) {
        a.normalize();
        const m = Math.acos(Xt(s[f - 1].dot(s[f]), -1, 1));
        r[f].applyMatrix4(c.makeRotationAxis(a, m));
      }
      o[f].crossVectors(s[f], r[f]);
    }
    if (e === !0) {
      let f = Math.acos(Xt(r[0].dot(r[t]), -1, 1));
      ((f /= t), s[0].dot(a.crossVectors(r[0], r[t])) > 0 && (f = -f));
      for (let m = 1; m <= t; m++)
        (r[m].applyMatrix4(c.makeRotationAxis(s[m], f * m)),
          o[m].crossVectors(s[m], r[m]));
    }
    return { tangents: s, normals: r, binormals: o };
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return ((this.arcLengthDivisions = t.arcLengthDivisions), this);
  }
  toJSON() {
    const t = {
      metadata: { version: 4.7, type: "Curve", generator: "Curve.toJSON" },
    };
    return (
      (t.arcLengthDivisions = this.arcLengthDivisions),
      (t.type = this.type),
      t
    );
  }
  fromJSON(t) {
    return ((this.arcLengthDivisions = t.arcLengthDivisions), this);
  }
}
class Za extends An {
  constructor(
    t = 0,
    e = 0,
    n = 1,
    s = 1,
    r = 0,
    o = Math.PI * 2,
    a = !1,
    c = 0,
  ) {
    (super(),
      (this.isEllipseCurve = !0),
      (this.type = "EllipseCurve"),
      (this.aX = t),
      (this.aY = e),
      (this.xRadius = n),
      (this.yRadius = s),
      (this.aStartAngle = r),
      (this.aEndAngle = o),
      (this.aClockwise = a),
      (this.aRotation = c));
  }
  getPoint(t, e = new at()) {
    const n = e,
      s = Math.PI * 2;
    let r = this.aEndAngle - this.aStartAngle;
    const o = Math.abs(r) < Number.EPSILON;
    for (; r < 0; ) r += s;
    for (; r > s; ) r -= s;
    (r < Number.EPSILON && (o ? (r = 0) : (r = s)),
      this.aClockwise === !0 && !o && (r === s ? (r = -s) : (r = r - s)));
    const a = this.aStartAngle + t * r;
    let c = this.aX + this.xRadius * Math.cos(a),
      l = this.aY + this.yRadius * Math.sin(a);
    if (this.aRotation !== 0) {
      const h = Math.cos(this.aRotation),
        u = Math.sin(this.aRotation),
        d = c - this.aX,
        f = l - this.aY;
      ((c = d * h - f * u + this.aX), (l = d * u + f * h + this.aY));
    }
    return n.set(c, l);
  }
  copy(t) {
    return (
      super.copy(t),
      (this.aX = t.aX),
      (this.aY = t.aY),
      (this.xRadius = t.xRadius),
      (this.yRadius = t.yRadius),
      (this.aStartAngle = t.aStartAngle),
      (this.aEndAngle = t.aEndAngle),
      (this.aClockwise = t.aClockwise),
      (this.aRotation = t.aRotation),
      this
    );
  }
  toJSON() {
    const t = super.toJSON();
    return (
      (t.aX = this.aX),
      (t.aY = this.aY),
      (t.xRadius = this.xRadius),
      (t.yRadius = this.yRadius),
      (t.aStartAngle = this.aStartAngle),
      (t.aEndAngle = this.aEndAngle),
      (t.aClockwise = this.aClockwise),
      (t.aRotation = this.aRotation),
      t
    );
  }
  fromJSON(t) {
    return (
      super.fromJSON(t),
      (this.aX = t.aX),
      (this.aY = t.aY),
      (this.xRadius = t.xRadius),
      (this.yRadius = t.yRadius),
      (this.aStartAngle = t.aStartAngle),
      (this.aEndAngle = t.aEndAngle),
      (this.aClockwise = t.aClockwise),
      (this.aRotation = t.aRotation),
      this
    );
  }
}
class dd extends Za {
  constructor(t, e, n, s, r, o) {
    (super(t, e, n, n, s, r, o),
      (this.isArcCurve = !0),
      (this.type = "ArcCurve"));
  }
}
function ja() {
  let i = 0,
    t = 0,
    e = 0,
    n = 0;
  function s(r, o, a, c) {
    ((i = r),
      (t = a),
      (e = -3 * r + 3 * o - 2 * a - c),
      (n = 2 * r - 2 * o + a + c));
  }
  return {
    initCatmullRom: function (r, o, a, c, l) {
      s(o, a, l * (a - r), l * (c - o));
    },
    initNonuniformCatmullRom: function (r, o, a, c, l, h, u) {
      let d = (o - r) / l - (a - r) / (l + h) + (a - o) / h,
        f = (a - o) / h - (c - o) / (h + u) + (c - a) / u;
      ((d *= h), (f *= h), s(o, a, d, f));
    },
    calc: function (r) {
      const o = r * r,
        a = o * r;
      return i + t * r + e * o + n * a;
    },
  };
}
const or = new P(),
  vo = new ja(),
  xo = new ja(),
  yo = new ja();
class oh extends An {
  constructor(t = [], e = !1, n = "centripetal", s = 0.5) {
    (super(),
      (this.isCatmullRomCurve3 = !0),
      (this.type = "CatmullRomCurve3"),
      (this.points = t),
      (this.closed = e),
      (this.curveType = n),
      (this.tension = s));
  }
  getPoint(t, e = new P()) {
    const n = e,
      s = this.points,
      r = s.length,
      o = (r - (this.closed ? 0 : 1)) * t;
    let a = Math.floor(o),
      c = o - a;
    this.closed
      ? (a += a > 0 ? 0 : (Math.floor(Math.abs(a) / r) + 1) * r)
      : c === 0 && a === r - 1 && ((a = r - 2), (c = 1));
    let l, h;
    this.closed || a > 0
      ? (l = s[(a - 1) % r])
      : (or.subVectors(s[0], s[1]).add(s[0]), (l = or));
    const u = s[a % r],
      d = s[(a + 1) % r];
    if (
      (this.closed || a + 2 < r
        ? (h = s[(a + 2) % r])
        : (or.subVectors(s[r - 1], s[r - 2]).add(s[r - 1]), (h = or)),
      this.curveType === "centripetal" || this.curveType === "chordal")
    ) {
      const f = this.curveType === "chordal" ? 0.5 : 0.25;
      let m = Math.pow(l.distanceToSquared(u), f),
        _ = Math.pow(u.distanceToSquared(d), f),
        g = Math.pow(d.distanceToSquared(h), f);
      (_ < 1e-4 && (_ = 1),
        m < 1e-4 && (m = _),
        g < 1e-4 && (g = _),
        vo.initNonuniformCatmullRom(l.x, u.x, d.x, h.x, m, _, g),
        xo.initNonuniformCatmullRom(l.y, u.y, d.y, h.y, m, _, g),
        yo.initNonuniformCatmullRom(l.z, u.z, d.z, h.z, m, _, g));
    } else
      this.curveType === "catmullrom" &&
        (vo.initCatmullRom(l.x, u.x, d.x, h.x, this.tension),
        xo.initCatmullRom(l.y, u.y, d.y, h.y, this.tension),
        yo.initCatmullRom(l.z, u.z, d.z, h.z, this.tension));
    return (n.set(vo.calc(c), xo.calc(c), yo.calc(c)), n);
  }
  copy(t) {
    (super.copy(t), (this.points = []));
    for (let e = 0, n = t.points.length; e < n; e++) {
      const s = t.points[e];
      this.points.push(s.clone());
    }
    return (
      (this.closed = t.closed),
      (this.curveType = t.curveType),
      (this.tension = t.tension),
      this
    );
  }
  toJSON() {
    const t = super.toJSON();
    t.points = [];
    for (let e = 0, n = this.points.length; e < n; e++) {
      const s = this.points[e];
      t.points.push(s.toArray());
    }
    return (
      (t.closed = this.closed),
      (t.curveType = this.curveType),
      (t.tension = this.tension),
      t
    );
  }
  fromJSON(t) {
    (super.fromJSON(t), (this.points = []));
    for (let e = 0, n = t.points.length; e < n; e++) {
      const s = t.points[e];
      this.points.push(new P().fromArray(s));
    }
    return (
      (this.closed = t.closed),
      (this.curveType = t.curveType),
      (this.tension = t.tension),
      this
    );
  }
}
function Xc(i, t, e, n, s) {
  const r = (n - t) * 0.5,
    o = (s - e) * 0.5,
    a = i * i,
    c = i * a;
  return (
    (2 * e - 2 * n + r + o) * c + (-3 * e + 3 * n - 2 * r - o) * a + r * i + e
  );
}
function fd(i, t) {
  const e = 1 - i;
  return e * e * t;
}
function pd(i, t) {
  return 2 * (1 - i) * i * t;
}
function md(i, t) {
  return i * i * t;
}
function bs(i, t, e, n) {
  return fd(i, t) + pd(i, e) + md(i, n);
}
function gd(i, t) {
  const e = 1 - i;
  return e * e * e * t;
}
function _d(i, t) {
  const e = 1 - i;
  return 3 * e * e * i * t;
}
function vd(i, t) {
  return 3 * (1 - i) * i * i * t;
}
function xd(i, t) {
  return i * i * i * t;
}
function Es(i, t, e, n, s) {
  return gd(i, t) + _d(i, e) + vd(i, n) + xd(i, s);
}
class ah extends An {
  constructor(t = new at(), e = new at(), n = new at(), s = new at()) {
    (super(),
      (this.isCubicBezierCurve = !0),
      (this.type = "CubicBezierCurve"),
      (this.v0 = t),
      (this.v1 = e),
      (this.v2 = n),
      (this.v3 = s));
  }
  getPoint(t, e = new at()) {
    const n = e,
      s = this.v0,
      r = this.v1,
      o = this.v2,
      a = this.v3;
    return (n.set(Es(t, s.x, r.x, o.x, a.x), Es(t, s.y, r.y, o.y, a.y)), n);
  }
  copy(t) {
    return (
      super.copy(t),
      this.v0.copy(t.v0),
      this.v1.copy(t.v1),
      this.v2.copy(t.v2),
      this.v3.copy(t.v3),
      this
    );
  }
  toJSON() {
    const t = super.toJSON();
    return (
      (t.v0 = this.v0.toArray()),
      (t.v1 = this.v1.toArray()),
      (t.v2 = this.v2.toArray()),
      (t.v3 = this.v3.toArray()),
      t
    );
  }
  fromJSON(t) {
    return (
      super.fromJSON(t),
      this.v0.fromArray(t.v0),
      this.v1.fromArray(t.v1),
      this.v2.fromArray(t.v2),
      this.v3.fromArray(t.v3),
      this
    );
  }
}
class yd extends An {
  constructor(t = new P(), e = new P(), n = new P(), s = new P()) {
    (super(),
      (this.isCubicBezierCurve3 = !0),
      (this.type = "CubicBezierCurve3"),
      (this.v0 = t),
      (this.v1 = e),
      (this.v2 = n),
      (this.v3 = s));
  }
  getPoint(t, e = new P()) {
    const n = e,
      s = this.v0,
      r = this.v1,
      o = this.v2,
      a = this.v3;
    return (
      n.set(
        Es(t, s.x, r.x, o.x, a.x),
        Es(t, s.y, r.y, o.y, a.y),
        Es(t, s.z, r.z, o.z, a.z),
      ),
      n
    );
  }
  copy(t) {
    return (
      super.copy(t),
      this.v0.copy(t.v0),
      this.v1.copy(t.v1),
      this.v2.copy(t.v2),
      this.v3.copy(t.v3),
      this
    );
  }
  toJSON() {
    const t = super.toJSON();
    return (
      (t.v0 = this.v0.toArray()),
      (t.v1 = this.v1.toArray()),
      (t.v2 = this.v2.toArray()),
      (t.v3 = this.v3.toArray()),
      t
    );
  }
  fromJSON(t) {
    return (
      super.fromJSON(t),
      this.v0.fromArray(t.v0),
      this.v1.fromArray(t.v1),
      this.v2.fromArray(t.v2),
      this.v3.fromArray(t.v3),
      this
    );
  }
}
class ch extends An {
  constructor(t = new at(), e = new at()) {
    (super(),
      (this.isLineCurve = !0),
      (this.type = "LineCurve"),
      (this.v1 = t),
      (this.v2 = e));
  }
  getPoint(t, e = new at()) {
    const n = e;
    return (
      t === 1
        ? n.copy(this.v2)
        : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(t).add(this.v1)),
      n
    );
  }
  getPointAt(t, e) {
    return this.getPoint(t, e);
  }
  getTangent(t, e = new at()) {
    return e.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(t, e) {
    return this.getTangent(t, e);
  }
  copy(t) {
    return (super.copy(t), this.v1.copy(t.v1), this.v2.copy(t.v2), this);
  }
  toJSON() {
    const t = super.toJSON();
    return ((t.v1 = this.v1.toArray()), (t.v2 = this.v2.toArray()), t);
  }
  fromJSON(t) {
    return (
      super.fromJSON(t),
      this.v1.fromArray(t.v1),
      this.v2.fromArray(t.v2),
      this
    );
  }
}
class Md extends An {
  constructor(t = new P(), e = new P()) {
    (super(),
      (this.isLineCurve3 = !0),
      (this.type = "LineCurve3"),
      (this.v1 = t),
      (this.v2 = e));
  }
  getPoint(t, e = new P()) {
    const n = e;
    return (
      t === 1
        ? n.copy(this.v2)
        : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(t).add(this.v1)),
      n
    );
  }
  getPointAt(t, e) {
    return this.getPoint(t, e);
  }
  getTangent(t, e = new P()) {
    return e.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(t, e) {
    return this.getTangent(t, e);
  }
  copy(t) {
    return (super.copy(t), this.v1.copy(t.v1), this.v2.copy(t.v2), this);
  }
  toJSON() {
    const t = super.toJSON();
    return ((t.v1 = this.v1.toArray()), (t.v2 = this.v2.toArray()), t);
  }
  fromJSON(t) {
    return (
      super.fromJSON(t),
      this.v1.fromArray(t.v1),
      this.v2.fromArray(t.v2),
      this
    );
  }
}
class lh extends An {
  constructor(t = new at(), e = new at(), n = new at()) {
    (super(),
      (this.isQuadraticBezierCurve = !0),
      (this.type = "QuadraticBezierCurve"),
      (this.v0 = t),
      (this.v1 = e),
      (this.v2 = n));
  }
  getPoint(t, e = new at()) {
    const n = e,
      s = this.v0,
      r = this.v1,
      o = this.v2;
    return (n.set(bs(t, s.x, r.x, o.x), bs(t, s.y, r.y, o.y)), n);
  }
  copy(t) {
    return (
      super.copy(t),
      this.v0.copy(t.v0),
      this.v1.copy(t.v1),
      this.v2.copy(t.v2),
      this
    );
  }
  toJSON() {
    const t = super.toJSON();
    return (
      (t.v0 = this.v0.toArray()),
      (t.v1 = this.v1.toArray()),
      (t.v2 = this.v2.toArray()),
      t
    );
  }
  fromJSON(t) {
    return (
      super.fromJSON(t),
      this.v0.fromArray(t.v0),
      this.v1.fromArray(t.v1),
      this.v2.fromArray(t.v2),
      this
    );
  }
}
class hh extends An {
  constructor(t = new P(), e = new P(), n = new P()) {
    (super(),
      (this.isQuadraticBezierCurve3 = !0),
      (this.type = "QuadraticBezierCurve3"),
      (this.v0 = t),
      (this.v1 = e),
      (this.v2 = n));
  }
  getPoint(t, e = new P()) {
    const n = e,
      s = this.v0,
      r = this.v1,
      o = this.v2;
    return (
      n.set(bs(t, s.x, r.x, o.x), bs(t, s.y, r.y, o.y), bs(t, s.z, r.z, o.z)),
      n
    );
  }
  copy(t) {
    return (
      super.copy(t),
      this.v0.copy(t.v0),
      this.v1.copy(t.v1),
      this.v2.copy(t.v2),
      this
    );
  }
  toJSON() {
    const t = super.toJSON();
    return (
      (t.v0 = this.v0.toArray()),
      (t.v1 = this.v1.toArray()),
      (t.v2 = this.v2.toArray()),
      t
    );
  }
  fromJSON(t) {
    return (
      super.fromJSON(t),
      this.v0.fromArray(t.v0),
      this.v1.fromArray(t.v1),
      this.v2.fromArray(t.v2),
      this
    );
  }
}
class uh extends An {
  constructor(t = []) {
    (super(),
      (this.isSplineCurve = !0),
      (this.type = "SplineCurve"),
      (this.points = t));
  }
  getPoint(t, e = new at()) {
    const n = e,
      s = this.points,
      r = (s.length - 1) * t,
      o = Math.floor(r),
      a = r - o,
      c = s[o === 0 ? o : o - 1],
      l = s[o],
      h = s[o > s.length - 2 ? s.length - 1 : o + 1],
      u = s[o > s.length - 3 ? s.length - 1 : o + 2];
    return (n.set(Xc(a, c.x, l.x, h.x, u.x), Xc(a, c.y, l.y, h.y, u.y)), n);
  }
  copy(t) {
    (super.copy(t), (this.points = []));
    for (let e = 0, n = t.points.length; e < n; e++) {
      const s = t.points[e];
      this.points.push(s.clone());
    }
    return this;
  }
  toJSON() {
    const t = super.toJSON();
    t.points = [];
    for (let e = 0, n = this.points.length; e < n; e++) {
      const s = this.points[e];
      t.points.push(s.toArray());
    }
    return t;
  }
  fromJSON(t) {
    (super.fromJSON(t), (this.points = []));
    for (let e = 0, n = t.points.length; e < n; e++) {
      const s = t.points[e];
      this.points.push(new at().fromArray(s));
    }
    return this;
  }
}
var Cr = Object.freeze({
  __proto__: null,
  ArcCurve: dd,
  CatmullRomCurve3: oh,
  CubicBezierCurve: ah,
  CubicBezierCurve3: yd,
  EllipseCurve: Za,
  LineCurve: ch,
  LineCurve3: Md,
  QuadraticBezierCurve: lh,
  QuadraticBezierCurve3: hh,
  SplineCurve: uh,
});
class Sd extends An {
  constructor() {
    (super(),
      (this.type = "CurvePath"),
      (this.curves = []),
      (this.autoClose = !1));
  }
  add(t) {
    this.curves.push(t);
  }
  closePath() {
    const t = this.curves[0].getPoint(0),
      e = this.curves[this.curves.length - 1].getPoint(1);
    if (!t.equals(e)) {
      const n = t.isVector2 === !0 ? "LineCurve" : "LineCurve3";
      this.curves.push(new Cr[n](e, t));
    }
    return this;
  }
  getPoint(t, e) {
    const n = t * this.getLength(),
      s = this.getCurveLengths();
    let r = 0;
    for (; r < s.length; ) {
      if (s[r] >= n) {
        const o = s[r] - n,
          a = this.curves[r],
          c = a.getLength(),
          l = c === 0 ? 0 : 1 - o / c;
        return a.getPointAt(l, e);
      }
      r++;
    }
    return null;
  }
  getLength() {
    const t = this.getCurveLengths();
    return t[t.length - 1];
  }
  updateArcLengths() {
    ((this.needsUpdate = !0),
      (this.cacheLengths = null),
      this.getCurveLengths());
  }
  getCurveLengths() {
    if (this.cacheLengths && this.cacheLengths.length === this.curves.length)
      return this.cacheLengths;
    const t = [];
    let e = 0;
    for (let n = 0, s = this.curves.length; n < s; n++)
      ((e += this.curves[n].getLength()), t.push(e));
    return ((this.cacheLengths = t), t);
  }
  getSpacedPoints(t = 40) {
    const e = [];
    for (let n = 0; n <= t; n++) e.push(this.getPoint(n / t));
    return (this.autoClose && e.push(e[0]), e);
  }
  getPoints(t = 12) {
    const e = [];
    let n;
    for (let s = 0, r = this.curves; s < r.length; s++) {
      const o = r[s],
        a = o.isEllipseCurve
          ? t * 2
          : o.isLineCurve || o.isLineCurve3
            ? 1
            : o.isSplineCurve
              ? t * o.points.length
              : t,
        c = o.getPoints(a);
      for (let l = 0; l < c.length; l++) {
        const h = c[l];
        (n && n.equals(h)) || (e.push(h), (n = h));
      }
    }
    return (
      this.autoClose &&
        e.length > 1 &&
        !e[e.length - 1].equals(e[0]) &&
        e.push(e[0]),
      e
    );
  }
  copy(t) {
    (super.copy(t), (this.curves = []));
    for (let e = 0, n = t.curves.length; e < n; e++) {
      const s = t.curves[e];
      this.curves.push(s.clone());
    }
    return ((this.autoClose = t.autoClose), this);
  }
  toJSON() {
    const t = super.toJSON();
    ((t.autoClose = this.autoClose), (t.curves = []));
    for (let e = 0, n = this.curves.length; e < n; e++) {
      const s = this.curves[e];
      t.curves.push(s.toJSON());
    }
    return t;
  }
  fromJSON(t) {
    (super.fromJSON(t), (this.autoClose = t.autoClose), (this.curves = []));
    for (let e = 0, n = t.curves.length; e < n; e++) {
      const s = t.curves[e];
      this.curves.push(new Cr[s.type]().fromJSON(s));
    }
    return this;
  }
}
class Ma extends Sd {
  constructor(t) {
    (super(),
      (this.type = "Path"),
      (this.currentPoint = new at()),
      t && this.setFromPoints(t));
  }
  setFromPoints(t) {
    this.moveTo(t[0].x, t[0].y);
    for (let e = 1, n = t.length; e < n; e++) this.lineTo(t[e].x, t[e].y);
    return this;
  }
  moveTo(t, e) {
    return (this.currentPoint.set(t, e), this);
  }
  lineTo(t, e) {
    const n = new ch(this.currentPoint.clone(), new at(t, e));
    return (this.curves.push(n), this.currentPoint.set(t, e), this);
  }
  quadraticCurveTo(t, e, n, s) {
    const r = new lh(this.currentPoint.clone(), new at(t, e), new at(n, s));
    return (this.curves.push(r), this.currentPoint.set(n, s), this);
  }
  bezierCurveTo(t, e, n, s, r, o) {
    const a = new ah(
      this.currentPoint.clone(),
      new at(t, e),
      new at(n, s),
      new at(r, o),
    );
    return (this.curves.push(a), this.currentPoint.set(r, o), this);
  }
  splineThru(t) {
    const e = [this.currentPoint.clone()].concat(t),
      n = new uh(e);
    return (this.curves.push(n), this.currentPoint.copy(t[t.length - 1]), this);
  }
  arc(t, e, n, s, r, o) {
    const a = this.currentPoint.x,
      c = this.currentPoint.y;
    return (this.absarc(t + a, e + c, n, s, r, o), this);
  }
  absarc(t, e, n, s, r, o) {
    return (this.absellipse(t, e, n, n, s, r, o), this);
  }
  ellipse(t, e, n, s, r, o, a, c) {
    const l = this.currentPoint.x,
      h = this.currentPoint.y;
    return (this.absellipse(t + l, e + h, n, s, r, o, a, c), this);
  }
  absellipse(t, e, n, s, r, o, a, c) {
    const l = new Za(t, e, n, s, r, o, a, c);
    if (this.curves.length > 0) {
      const u = l.getPoint(0);
      u.equals(this.currentPoint) || this.lineTo(u.x, u.y);
    }
    this.curves.push(l);
    const h = l.getPoint(1);
    return (this.currentPoint.copy(h), this);
  }
  copy(t) {
    return (super.copy(t), this.currentPoint.copy(t.currentPoint), this);
  }
  toJSON() {
    const t = super.toJSON();
    return ((t.currentPoint = this.currentPoint.toArray()), t);
  }
  fromJSON(t) {
    return (
      super.fromJSON(t),
      this.currentPoint.fromArray(t.currentPoint),
      this
    );
  }
}
class ss extends Ma {
  constructor(t) {
    (super(t), (this.uuid = as()), (this.type = "Shape"), (this.holes = []));
  }
  getPointsHoles(t) {
    const e = [];
    for (let n = 0, s = this.holes.length; n < s; n++)
      e[n] = this.holes[n].getPoints(t);
    return e;
  }
  extractPoints(t) {
    return { shape: this.getPoints(t), holes: this.getPointsHoles(t) };
  }
  copy(t) {
    (super.copy(t), (this.holes = []));
    for (let e = 0, n = t.holes.length; e < n; e++) {
      const s = t.holes[e];
      this.holes.push(s.clone());
    }
    return this;
  }
  toJSON() {
    const t = super.toJSON();
    ((t.uuid = this.uuid), (t.holes = []));
    for (let e = 0, n = this.holes.length; e < n; e++) {
      const s = this.holes[e];
      t.holes.push(s.toJSON());
    }
    return t;
  }
  fromJSON(t) {
    (super.fromJSON(t), (this.uuid = t.uuid), (this.holes = []));
    for (let e = 0, n = t.holes.length; e < n; e++) {
      const s = t.holes[e];
      this.holes.push(new Ma().fromJSON(s));
    }
    return this;
  }
}
function bd(i, t, e = 2) {
  const n = t && t.length,
    s = n ? t[0] * e : i.length;
  let r = dh(i, 0, s, e, !0);
  const o = [];
  if (!r || r.next === r.prev) return o;
  let a, c, l;
  if ((n && (r = Rd(i, t, r, e)), i.length > 80 * e)) {
    ((a = 1 / 0), (c = 1 / 0));
    let h = -1 / 0,
      u = -1 / 0;
    for (let d = e; d < s; d += e) {
      const f = i[d],
        m = i[d + 1];
      (f < a && (a = f), m < c && (c = m), f > h && (h = f), m > u && (u = m));
    }
    ((l = Math.max(h - a, u - c)), (l = l !== 0 ? 32767 / l : 0));
  }
  return (Ps(r, o, e, a, c, l, 0), o);
}
function dh(i, t, e, n, s) {
  let r;
  if (s === kd(i, t, e, n) > 0)
    for (let o = t; o < e; o += n) r = qc((o / n) | 0, i[o], i[o + 1], r);
  else
    for (let o = e - n; o >= t; o -= n) r = qc((o / n) | 0, i[o], i[o + 1], r);
  return (r && rs(r, r.next) && (Ls(r), (r = r.next)), r);
}
function Mi(i, t) {
  if (!i) return i;
  t || (t = i);
  let e = i,
    n;
  do
    if (
      ((n = !1), !e.steiner && (rs(e, e.next) || Me(e.prev, e, e.next) === 0))
    ) {
      if ((Ls(e), (e = t = e.prev), e === e.next)) break;
      n = !0;
    } else e = e.next;
  while (n || e !== t);
  return t;
}
function Ps(i, t, e, n, s, r, o) {
  if (!i) return;
  !o && r && Id(i, n, s, r);
  let a = i;
  for (; i.prev !== i.next; ) {
    const c = i.prev,
      l = i.next;
    if (r ? wd(i, n, s, r) : Ed(i)) {
      (t.push(c.i, i.i, l.i), Ls(i), (i = l.next), (a = l.next));
      continue;
    }
    if (((i = l), i === a)) {
      o
        ? o === 1
          ? ((i = Td(Mi(i), t)), Ps(i, t, e, n, s, r, 2))
          : o === 2 && Ad(i, t, e, n, s, r)
        : Ps(Mi(i), t, e, n, s, r, 1);
      break;
    }
  }
}
function Ed(i) {
  const t = i.prev,
    e = i,
    n = i.next;
  if (Me(t, e, n) >= 0) return !1;
  const s = t.x,
    r = e.x,
    o = n.x,
    a = t.y,
    c = e.y,
    l = n.y,
    h = Math.min(s, r, o),
    u = Math.min(a, c, l),
    d = Math.max(s, r, o),
    f = Math.max(a, c, l);
  let m = n.next;
  for (; m !== t; ) {
    if (
      m.x >= h &&
      m.x <= d &&
      m.y >= u &&
      m.y <= f &&
      Ms(s, a, r, c, o, l, m.x, m.y) &&
      Me(m.prev, m, m.next) >= 0
    )
      return !1;
    m = m.next;
  }
  return !0;
}
function wd(i, t, e, n) {
  const s = i.prev,
    r = i,
    o = i.next;
  if (Me(s, r, o) >= 0) return !1;
  const a = s.x,
    c = r.x,
    l = o.x,
    h = s.y,
    u = r.y,
    d = o.y,
    f = Math.min(a, c, l),
    m = Math.min(h, u, d),
    _ = Math.max(a, c, l),
    g = Math.max(h, u, d),
    p = Sa(f, m, t, e, n),
    A = Sa(_, g, t, e, n);
  let b = i.prevZ,
    v = i.nextZ;
  for (; b && b.z >= p && v && v.z <= A; ) {
    if (
      (b.x >= f &&
        b.x <= _ &&
        b.y >= m &&
        b.y <= g &&
        b !== s &&
        b !== o &&
        Ms(a, h, c, u, l, d, b.x, b.y) &&
        Me(b.prev, b, b.next) >= 0) ||
      ((b = b.prevZ),
      v.x >= f &&
        v.x <= _ &&
        v.y >= m &&
        v.y <= g &&
        v !== s &&
        v !== o &&
        Ms(a, h, c, u, l, d, v.x, v.y) &&
        Me(v.prev, v, v.next) >= 0)
    )
      return !1;
    v = v.nextZ;
  }
  for (; b && b.z >= p; ) {
    if (
      b.x >= f &&
      b.x <= _ &&
      b.y >= m &&
      b.y <= g &&
      b !== s &&
      b !== o &&
      Ms(a, h, c, u, l, d, b.x, b.y) &&
      Me(b.prev, b, b.next) >= 0
    )
      return !1;
    b = b.prevZ;
  }
  for (; v && v.z <= A; ) {
    if (
      v.x >= f &&
      v.x <= _ &&
      v.y >= m &&
      v.y <= g &&
      v !== s &&
      v !== o &&
      Ms(a, h, c, u, l, d, v.x, v.y) &&
      Me(v.prev, v, v.next) >= 0
    )
      return !1;
    v = v.nextZ;
  }
  return !0;
}
function Td(i, t) {
  let e = i;
  do {
    const n = e.prev,
      s = e.next.next;
    (!rs(n, s) &&
      ph(n, e, e.next, s) &&
      Ds(n, s) &&
      Ds(s, n) &&
      (t.push(n.i, e.i, s.i), Ls(e), Ls(e.next), (e = i = s)),
      (e = e.next));
  } while (e !== i);
  return Mi(e);
}
function Ad(i, t, e, n, s, r) {
  let o = i;
  do {
    let a = o.next.next;
    for (; a !== o.prev; ) {
      if (o.i !== a.i && Fd(o, a)) {
        let c = mh(o, a);
        ((o = Mi(o, o.next)),
          (c = Mi(c, c.next)),
          Ps(o, t, e, n, s, r, 0),
          Ps(c, t, e, n, s, r, 0));
        return;
      }
      a = a.next;
    }
    o = o.next;
  } while (o !== i);
}
function Rd(i, t, e, n) {
  const s = [];
  for (let r = 0, o = t.length; r < o; r++) {
    const a = t[r] * n,
      c = r < o - 1 ? t[r + 1] * n : i.length,
      l = dh(i, a, c, n, !1);
    (l === l.next && (l.steiner = !0), s.push(Nd(l)));
  }
  s.sort(Cd);
  for (let r = 0; r < s.length; r++) e = Pd(s[r], e);
  return e;
}
function Cd(i, t) {
  let e = i.x - t.x;
  if (e === 0 && ((e = i.y - t.y), e === 0)) {
    const n = (i.next.y - i.y) / (i.next.x - i.x),
      s = (t.next.y - t.y) / (t.next.x - t.x);
    e = n - s;
  }
  return e;
}
function Pd(i, t) {
  const e = Dd(i, t);
  if (!e) return t;
  const n = mh(e, i);
  return (Mi(n, n.next), Mi(e, e.next));
}
function Dd(i, t) {
  let e = t;
  const n = i.x,
    s = i.y;
  let r = -1 / 0,
    o;
  if (rs(i, e)) return e;
  do {
    if (rs(i, e.next)) return e.next;
    if (s <= e.y && s >= e.next.y && e.next.y !== e.y) {
      const u = e.x + ((s - e.y) * (e.next.x - e.x)) / (e.next.y - e.y);
      if (
        u <= n &&
        u > r &&
        ((r = u), (o = e.x < e.next.x ? e : e.next), u === n)
      )
        return o;
    }
    e = e.next;
  } while (e !== t);
  if (!o) return null;
  const a = o,
    c = o.x,
    l = o.y;
  let h = 1 / 0;
  e = o;
  do {
    if (
      n >= e.x &&
      e.x >= c &&
      n !== e.x &&
      fh(s < l ? n : r, s, c, l, s < l ? r : n, s, e.x, e.y)
    ) {
      const u = Math.abs(s - e.y) / (n - e.x);
      Ds(e, i) &&
        (u < h || (u === h && (e.x > o.x || (e.x === o.x && Ld(o, e))))) &&
        ((o = e), (h = u));
    }
    e = e.next;
  } while (e !== a);
  return o;
}
function Ld(i, t) {
  return Me(i.prev, i, t.prev) < 0 && Me(t.next, i, i.next) < 0;
}
function Id(i, t, e, n) {
  let s = i;
  do
    (s.z === 0 && (s.z = Sa(s.x, s.y, t, e, n)),
      (s.prevZ = s.prev),
      (s.nextZ = s.next),
      (s = s.next));
  while (s !== i);
  ((s.prevZ.nextZ = null), (s.prevZ = null), Ud(s));
}
function Ud(i) {
  let t,
    e = 1;
  do {
    let n = i,
      s;
    i = null;
    let r = null;
    for (t = 0; n; ) {
      t++;
      let o = n,
        a = 0;
      for (let l = 0; l < e && (a++, (o = o.nextZ), !!o); l++);
      let c = e;
      for (; a > 0 || (c > 0 && o); )
        (a !== 0 && (c === 0 || !o || n.z <= o.z)
          ? ((s = n), (n = n.nextZ), a--)
          : ((s = o), (o = o.nextZ), c--),
          r ? (r.nextZ = s) : (i = s),
          (s.prevZ = r),
          (r = s));
      n = o;
    }
    ((r.nextZ = null), (e *= 2));
  } while (t > 1);
  return i;
}
function Sa(i, t, e, n, s) {
  return (
    (i = ((i - e) * s) | 0),
    (t = ((t - n) * s) | 0),
    (i = (i | (i << 8)) & 16711935),
    (i = (i | (i << 4)) & 252645135),
    (i = (i | (i << 2)) & 858993459),
    (i = (i | (i << 1)) & 1431655765),
    (t = (t | (t << 8)) & 16711935),
    (t = (t | (t << 4)) & 252645135),
    (t = (t | (t << 2)) & 858993459),
    (t = (t | (t << 1)) & 1431655765),
    i | (t << 1)
  );
}
function Nd(i) {
  let t = i,
    e = i;
  do ((t.x < e.x || (t.x === e.x && t.y < e.y)) && (e = t), (t = t.next));
  while (t !== i);
  return e;
}
function fh(i, t, e, n, s, r, o, a) {
  return (
    (s - o) * (t - a) >= (i - o) * (r - a) &&
    (i - o) * (n - a) >= (e - o) * (t - a) &&
    (e - o) * (r - a) >= (s - o) * (n - a)
  );
}
function Ms(i, t, e, n, s, r, o, a) {
  return !(i === o && t === a) && fh(i, t, e, n, s, r, o, a);
}
function Fd(i, t) {
  return (
    i.next.i !== t.i &&
    i.prev.i !== t.i &&
    !Od(i, t) &&
    ((Ds(i, t) &&
      Ds(t, i) &&
      zd(i, t) &&
      (Me(i.prev, i, t.prev) || Me(i, t.prev, t))) ||
      (rs(i, t) && Me(i.prev, i, i.next) > 0 && Me(t.prev, t, t.next) > 0))
  );
}
function Me(i, t, e) {
  return (t.y - i.y) * (e.x - t.x) - (t.x - i.x) * (e.y - t.y);
}
function rs(i, t) {
  return i.x === t.x && i.y === t.y;
}
function ph(i, t, e, n) {
  const s = cr(Me(i, t, e)),
    r = cr(Me(i, t, n)),
    o = cr(Me(e, n, i)),
    a = cr(Me(e, n, t));
  return !!(
    (s !== r && o !== a) ||
    (s === 0 && ar(i, e, t)) ||
    (r === 0 && ar(i, n, t)) ||
    (o === 0 && ar(e, i, n)) ||
    (a === 0 && ar(e, t, n))
  );
}
function ar(i, t, e) {
  return (
    t.x <= Math.max(i.x, e.x) &&
    t.x >= Math.min(i.x, e.x) &&
    t.y <= Math.max(i.y, e.y) &&
    t.y >= Math.min(i.y, e.y)
  );
}
function cr(i) {
  return i > 0 ? 1 : i < 0 ? -1 : 0;
}
function Od(i, t) {
  let e = i;
  do {
    if (
      e.i !== i.i &&
      e.next.i !== i.i &&
      e.i !== t.i &&
      e.next.i !== t.i &&
      ph(e, e.next, i, t)
    )
      return !0;
    e = e.next;
  } while (e !== i);
  return !1;
}
function Ds(i, t) {
  return Me(i.prev, i, i.next) < 0
    ? Me(i, t, i.next) >= 0 && Me(i, i.prev, t) >= 0
    : Me(i, t, i.prev) < 0 || Me(i, i.next, t) < 0;
}
function zd(i, t) {
  let e = i,
    n = !1;
  const s = (i.x + t.x) / 2,
    r = (i.y + t.y) / 2;
  do
    (e.y > r != e.next.y > r &&
      e.next.y !== e.y &&
      s < ((e.next.x - e.x) * (r - e.y)) / (e.next.y - e.y) + e.x &&
      (n = !n),
      (e = e.next));
  while (e !== i);
  return n;
}
function mh(i, t) {
  const e = ba(i.i, i.x, i.y),
    n = ba(t.i, t.x, t.y),
    s = i.next,
    r = t.prev;
  return (
    (i.next = t),
    (t.prev = i),
    (e.next = s),
    (s.prev = e),
    (n.next = e),
    (e.prev = n),
    (r.next = n),
    (n.prev = r),
    n
  );
}
function qc(i, t, e, n) {
  const s = ba(i, t, e);
  return (
    n
      ? ((s.next = n.next), (s.prev = n), (n.next.prev = s), (n.next = s))
      : ((s.prev = s), (s.next = s)),
    s
  );
}
function Ls(i) {
  ((i.next.prev = i.prev),
    (i.prev.next = i.next),
    i.prevZ && (i.prevZ.nextZ = i.nextZ),
    i.nextZ && (i.nextZ.prevZ = i.prevZ));
}
function ba(i, t, e) {
  return {
    i,
    x: t,
    y: e,
    prev: null,
    next: null,
    z: 0,
    prevZ: null,
    nextZ: null,
    steiner: !1,
  };
}
function kd(i, t, e, n) {
  let s = 0;
  for (let r = t, o = e - n; r < e; r += n)
    ((s += (i[o] - i[r]) * (i[r + 1] + i[o + 1])), (o = r));
  return s;
}
class Bd {
  static triangulate(t, e, n = 2) {
    return bd(t, e, n);
  }
}
class Yi {
  static area(t) {
    const e = t.length;
    let n = 0;
    for (let s = e - 1, r = 0; r < e; s = r++)
      n += t[s].x * t[r].y - t[r].x * t[s].y;
    return n * 0.5;
  }
  static isClockWise(t) {
    return Yi.area(t) < 0;
  }
  static triangulateShape(t, e) {
    const n = [],
      s = [],
      r = [];
    (Yc(t), Kc(n, t));
    let o = t.length;
    e.forEach(Yc);
    for (let c = 0; c < e.length; c++)
      (s.push(o), (o += e[c].length), Kc(n, e[c]));
    const a = Bd.triangulate(n, s);
    for (let c = 0; c < a.length; c += 3) r.push(a.slice(c, c + 3));
    return r;
  }
}
function Yc(i) {
  const t = i.length;
  t > 2 && i[t - 1].equals(i[0]) && i.pop();
}
function Kc(i, t) {
  for (let e = 0; e < t.length; e++) (i.push(t[e].x), i.push(t[e].y));
}
class Si extends ve {
  constructor(
    t = new ss([
      new at(0.5, 0.5),
      new at(-0.5, 0.5),
      new at(-0.5, -0.5),
      new at(0.5, -0.5),
    ]),
    e = {},
  ) {
    (super(),
      (this.type = "ExtrudeGeometry"),
      (this.parameters = { shapes: t, options: e }),
      (t = Array.isArray(t) ? t : [t]));
    const n = this,
      s = [],
      r = [];
    for (let a = 0, c = t.length; a < c; a++) {
      const l = t[a];
      o(l);
    }
    (this.setAttribute("position", new we(s, 3)),
      this.setAttribute("uv", new we(r, 2)),
      this.computeVertexNormals());
    function o(a) {
      const c = [],
        l = e.curveSegments !== void 0 ? e.curveSegments : 12,
        h = e.steps !== void 0 ? e.steps : 1,
        u = e.depth !== void 0 ? e.depth : 1;
      let d = e.bevelEnabled !== void 0 ? e.bevelEnabled : !0,
        f = e.bevelThickness !== void 0 ? e.bevelThickness : 0.2,
        m = e.bevelSize !== void 0 ? e.bevelSize : f - 0.1,
        _ = e.bevelOffset !== void 0 ? e.bevelOffset : 0,
        g = e.bevelSegments !== void 0 ? e.bevelSegments : 3;
      const p = e.extrudePath,
        A = e.UVGenerator !== void 0 ? e.UVGenerator : Hd;
      let b,
        v = !1,
        R,
        E,
        C,
        L;
      (p &&
        ((b = p.getSpacedPoints(h)),
        (v = !0),
        (d = !1),
        (R = p.computeFrenetFrames(h, !1)),
        (E = new P()),
        (C = new P()),
        (L = new P())),
        d || ((g = 0), (f = 0), (m = 0), (_ = 0)));
      const y = a.extractPoints(l);
      let M = y.shape;
      const w = y.holes;
      if (!Yi.isClockWise(M)) {
        M = M.reverse();
        for (let et = 0, J = w.length; et < J; et++) {
          const $ = w[et];
          Yi.isClockWise($) && (w[et] = $.reverse());
        }
      }
      function F(et) {
        const $ = 10000000000000001e-36;
        let j = et[0];
        for (let ut = 1; ut <= et.length; ut++) {
          const it = ut % et.length,
            dt = et[it],
            kt = dt.x - j.x,
            zt = dt.y - j.y,
            T = kt * kt + zt * zt,
            x = Math.max(
              Math.abs(dt.x),
              Math.abs(dt.y),
              Math.abs(j.x),
              Math.abs(j.y),
            ),
            z = $ * x * x;
          if (T <= z) {
            (et.splice(it, 1), ut--);
            continue;
          }
          j = dt;
        }
      }
      (F(M), w.forEach(F));
      const B = w.length,
        k = M;
      for (let et = 0; et < B; et++) {
        const J = w[et];
        M = M.concat(J);
      }
      function G(et, J, $) {
        return (
          J || console.error("THREE.ExtrudeGeometry: vec does not exist"),
          et.clone().addScaledVector(J, $)
        );
      }
      const Y = M.length;
      function H(et, J, $) {
        let j, ut, it;
        const dt = et.x - J.x,
          kt = et.y - J.y,
          zt = $.x - et.x,
          T = $.y - et.y,
          x = dt * dt + kt * kt,
          z = dt * T - kt * zt;
        if (Math.abs(z) > Number.EPSILON) {
          const X = Math.sqrt(x),
            tt = Math.sqrt(zt * zt + T * T),
            q = J.x - kt / X,
            Ct = J.y + dt / X,
            ht = $.x - T / tt,
            Tt = $.y + zt / tt,
            At = ((ht - q) * T - (Tt - Ct) * zt) / (dt * T - kt * zt);
          ((j = q + dt * At - et.x), (ut = Ct + kt * At - et.y));
          const st = j * j + ut * ut;
          if (st <= 2) return new at(j, ut);
          it = Math.sqrt(st / 2);
        } else {
          let X = !1;
          (dt > Number.EPSILON
            ? zt > Number.EPSILON && (X = !0)
            : dt < -Number.EPSILON
              ? zt < -Number.EPSILON && (X = !0)
              : Math.sign(kt) === Math.sign(T) && (X = !0),
            X
              ? ((j = -kt), (ut = dt), (it = Math.sqrt(x)))
              : ((j = dt), (ut = kt), (it = Math.sqrt(x / 2))));
        }
        return new at(j / it, ut / it);
      }
      const ct = [];
      for (
        let et = 0, J = k.length, $ = J - 1, j = et + 1;
        et < J;
        et++, $++, j++
      )
        ($ === J && ($ = 0),
          j === J && (j = 0),
          (ct[et] = H(k[et], k[$], k[j])));
      const pt = [];
      let gt,
        Lt = ct.concat();
      for (let et = 0, J = B; et < J; et++) {
        const $ = w[et];
        gt = [];
        for (
          let j = 0, ut = $.length, it = ut - 1, dt = j + 1;
          j < ut;
          j++, it++, dt++
        )
          (it === ut && (it = 0),
            dt === ut && (dt = 0),
            (gt[j] = H($[j], $[it], $[dt])));
        (pt.push(gt), (Lt = Lt.concat(gt)));
      }
      let $t;
      if (g === 0) $t = Yi.triangulateShape(k, w);
      else {
        const et = [],
          J = [];
        for (let $ = 0; $ < g; $++) {
          const j = $ / g,
            ut = f * Math.cos((j * Math.PI) / 2),
            it = m * Math.sin((j * Math.PI) / 2) + _;
          for (let dt = 0, kt = k.length; dt < kt; dt++) {
            const zt = G(k[dt], ct[dt], it);
            (Dt(zt.x, zt.y, -ut), j === 0 && et.push(zt));
          }
          for (let dt = 0, kt = B; dt < kt; dt++) {
            const zt = w[dt];
            gt = pt[dt];
            const T = [];
            for (let x = 0, z = zt.length; x < z; x++) {
              const X = G(zt[x], gt[x], it);
              (Dt(X.x, X.y, -ut), j === 0 && T.push(X));
            }
            j === 0 && J.push(T);
          }
        }
        $t = Yi.triangulateShape(et, J);
      }
      const re = $t.length,
        Jt = m + _;
      for (let et = 0; et < Y; et++) {
        const J = d ? G(M[et], Lt[et], Jt) : M[et];
        v
          ? (C.copy(R.normals[0]).multiplyScalar(J.x),
            E.copy(R.binormals[0]).multiplyScalar(J.y),
            L.copy(b[0]).add(C).add(E),
            Dt(L.x, L.y, L.z))
          : Dt(J.x, J.y, 0);
      }
      for (let et = 1; et <= h; et++)
        for (let J = 0; J < Y; J++) {
          const $ = d ? G(M[J], Lt[J], Jt) : M[J];
          v
            ? (C.copy(R.normals[et]).multiplyScalar($.x),
              E.copy(R.binormals[et]).multiplyScalar($.y),
              L.copy(b[et]).add(C).add(E),
              Dt(L.x, L.y, L.z))
            : Dt($.x, $.y, (u / h) * et);
        }
      for (let et = g - 1; et >= 0; et--) {
        const J = et / g,
          $ = f * Math.cos((J * Math.PI) / 2),
          j = m * Math.sin((J * Math.PI) / 2) + _;
        for (let ut = 0, it = k.length; ut < it; ut++) {
          const dt = G(k[ut], ct[ut], j);
          Dt(dt.x, dt.y, u + $);
        }
        for (let ut = 0, it = w.length; ut < it; ut++) {
          const dt = w[ut];
          gt = pt[ut];
          for (let kt = 0, zt = dt.length; kt < zt; kt++) {
            const T = G(dt[kt], gt[kt], j);
            v ? Dt(T.x, T.y + b[h - 1].y, b[h - 1].x + $) : Dt(T.x, T.y, u + $);
          }
        }
      }
      (Z(), nt());
      function Z() {
        const et = s.length / 3;
        if (d) {
          let J = 0,
            $ = Y * J;
          for (let j = 0; j < re; j++) {
            const ut = $t[j];
            wt(ut[2] + $, ut[1] + $, ut[0] + $);
          }
          ((J = h + g * 2), ($ = Y * J));
          for (let j = 0; j < re; j++) {
            const ut = $t[j];
            wt(ut[0] + $, ut[1] + $, ut[2] + $);
          }
        } else {
          for (let J = 0; J < re; J++) {
            const $ = $t[J];
            wt($[2], $[1], $[0]);
          }
          for (let J = 0; J < re; J++) {
            const $ = $t[J];
            wt($[0] + Y * h, $[1] + Y * h, $[2] + Y * h);
          }
        }
        n.addGroup(et, s.length / 3 - et, 0);
      }
      function nt() {
        const et = s.length / 3;
        let J = 0;
        (St(k, J), (J += k.length));
        for (let $ = 0, j = w.length; $ < j; $++) {
          const ut = w[$];
          (St(ut, J), (J += ut.length));
        }
        n.addGroup(et, s.length / 3 - et, 1);
      }
      function St(et, J) {
        let $ = et.length;
        for (; --$ >= 0; ) {
          const j = $;
          let ut = $ - 1;
          ut < 0 && (ut = et.length - 1);
          for (let it = 0, dt = h + g * 2; it < dt; it++) {
            const kt = Y * it,
              zt = Y * (it + 1),
              T = J + j + kt,
              x = J + ut + kt,
              z = J + ut + zt,
              X = J + j + zt;
            Zt(T, x, z, X);
          }
        }
      }
      function Dt(et, J, $) {
        (c.push(et), c.push(J), c.push($));
      }
      function wt(et, J, $) {
        (me(et), me(J), me($));
        const j = s.length / 3,
          ut = A.generateTopUV(n, s, j - 3, j - 2, j - 1);
        (D(ut[0]), D(ut[1]), D(ut[2]));
      }
      function Zt(et, J, $, j) {
        (me(et), me(J), me(j), me(J), me($), me(j));
        const ut = s.length / 3,
          it = A.generateSideWallUV(n, s, ut - 6, ut - 3, ut - 2, ut - 1);
        (D(it[0]), D(it[1]), D(it[3]), D(it[1]), D(it[2]), D(it[3]));
      }
      function me(et) {
        (s.push(c[et * 3 + 0]), s.push(c[et * 3 + 1]), s.push(c[et * 3 + 2]));
      }
      function D(et) {
        (r.push(et.x), r.push(et.y));
      }
    }
  }
  copy(t) {
    return (
      super.copy(t),
      (this.parameters = Object.assign({}, t.parameters)),
      this
    );
  }
  toJSON() {
    const t = super.toJSON(),
      e = this.parameters.shapes,
      n = this.parameters.options;
    return Gd(e, n, t);
  }
  static fromJSON(t, e) {
    const n = [];
    for (let r = 0, o = t.shapes.length; r < o; r++) {
      const a = e[t.shapes[r]];
      n.push(a);
    }
    const s = t.options.extrudePath;
    return (
      s !== void 0 && (t.options.extrudePath = new Cr[s.type]().fromJSON(s)),
      new Si(n, t.options)
    );
  }
}
const Hd = {
  generateTopUV: function (i, t, e, n, s) {
    const r = t[e * 3],
      o = t[e * 3 + 1],
      a = t[n * 3],
      c = t[n * 3 + 1],
      l = t[s * 3],
      h = t[s * 3 + 1];
    return [new at(r, o), new at(a, c), new at(l, h)];
  },
  generateSideWallUV: function (i, t, e, n, s, r) {
    const o = t[e * 3],
      a = t[e * 3 + 1],
      c = t[e * 3 + 2],
      l = t[n * 3],
      h = t[n * 3 + 1],
      u = t[n * 3 + 2],
      d = t[s * 3],
      f = t[s * 3 + 1],
      m = t[s * 3 + 2],
      _ = t[r * 3],
      g = t[r * 3 + 1],
      p = t[r * 3 + 2];
    return Math.abs(a - h) < Math.abs(o - l)
      ? [new at(o, 1 - c), new at(l, 1 - u), new at(d, 1 - m), new at(_, 1 - p)]
      : [
          new at(a, 1 - c),
          new at(h, 1 - u),
          new at(f, 1 - m),
          new at(g, 1 - p),
        ];
  },
};
function Gd(i, t, e) {
  if (((e.shapes = []), Array.isArray(i)))
    for (let n = 0, s = i.length; n < s; n++) {
      const r = i[n];
      e.shapes.push(r.uuid);
    }
  else e.shapes.push(i.uuid);
  return (
    (e.options = Object.assign({}, t)),
    t.extrudePath !== void 0 &&
      (e.options.extrudePath = t.extrudePath.toJSON()),
    e
  );
}
class Ai extends ve {
  constructor(t = 1, e = 1, n = 1, s = 1) {
    (super(),
      (this.type = "PlaneGeometry"),
      (this.parameters = {
        width: t,
        height: e,
        widthSegments: n,
        heightSegments: s,
      }));
    const r = t / 2,
      o = e / 2,
      a = Math.floor(n),
      c = Math.floor(s),
      l = a + 1,
      h = c + 1,
      u = t / a,
      d = e / c,
      f = [],
      m = [],
      _ = [],
      g = [];
    for (let p = 0; p < h; p++) {
      const A = p * d - o;
      for (let b = 0; b < l; b++) {
        const v = b * u - r;
        (m.push(v, -A, 0), _.push(0, 0, 1), g.push(b / a), g.push(1 - p / c));
      }
    }
    for (let p = 0; p < c; p++)
      for (let A = 0; A < a; A++) {
        const b = A + l * p,
          v = A + l * (p + 1),
          R = A + 1 + l * (p + 1),
          E = A + 1 + l * p;
        (f.push(b, v, E), f.push(v, R, E));
      }
    (this.setIndex(f),
      this.setAttribute("position", new we(m, 3)),
      this.setAttribute("normal", new we(_, 3)),
      this.setAttribute("uv", new we(g, 2)));
  }
  copy(t) {
    return (
      super.copy(t),
      (this.parameters = Object.assign({}, t.parameters)),
      this
    );
  }
  static fromJSON(t) {
    return new Ai(t.width, t.height, t.widthSegments, t.heightSegments);
  }
}
class Pr extends ve {
  constructor(
    t = 1,
    e = 32,
    n = 16,
    s = 0,
    r = Math.PI * 2,
    o = 0,
    a = Math.PI,
  ) {
    (super(),
      (this.type = "SphereGeometry"),
      (this.parameters = {
        radius: t,
        widthSegments: e,
        heightSegments: n,
        phiStart: s,
        phiLength: r,
        thetaStart: o,
        thetaLength: a,
      }),
      (e = Math.max(3, Math.floor(e))),
      (n = Math.max(2, Math.floor(n))));
    const c = Math.min(o + a, Math.PI);
    let l = 0;
    const h = [],
      u = new P(),
      d = new P(),
      f = [],
      m = [],
      _ = [],
      g = [];
    for (let p = 0; p <= n; p++) {
      const A = [],
        b = p / n;
      let v = 0;
      p === 0 && o === 0
        ? (v = 0.5 / e)
        : p === n && c === Math.PI && (v = -0.5 / e);
      for (let R = 0; R <= e; R++) {
        const E = R / e;
        ((u.x = -t * Math.cos(s + E * r) * Math.sin(o + b * a)),
          (u.y = t * Math.cos(o + b * a)),
          (u.z = t * Math.sin(s + E * r) * Math.sin(o + b * a)),
          m.push(u.x, u.y, u.z),
          d.copy(u).normalize(),
          _.push(d.x, d.y, d.z),
          g.push(E + v, 1 - b),
          A.push(l++));
      }
      h.push(A);
    }
    for (let p = 0; p < n; p++)
      for (let A = 0; A < e; A++) {
        const b = h[p][A + 1],
          v = h[p][A],
          R = h[p + 1][A],
          E = h[p + 1][A + 1];
        ((p !== 0 || o > 0) && f.push(b, v, E),
          (p !== n - 1 || c < Math.PI) && f.push(v, R, E));
      }
    (this.setIndex(f),
      this.setAttribute("position", new we(m, 3)),
      this.setAttribute("normal", new we(_, 3)),
      this.setAttribute("uv", new we(g, 2)));
  }
  copy(t) {
    return (
      super.copy(t),
      (this.parameters = Object.assign({}, t.parameters)),
      this
    );
  }
  static fromJSON(t) {
    return new Pr(
      t.radius,
      t.widthSegments,
      t.heightSegments,
      t.phiStart,
      t.phiLength,
      t.thetaStart,
      t.thetaLength,
    );
  }
}
class Hr extends ve {
  constructor(t = 1, e = 0.4, n = 12, s = 48, r = Math.PI * 2) {
    (super(),
      (this.type = "TorusGeometry"),
      (this.parameters = {
        radius: t,
        tube: e,
        radialSegments: n,
        tubularSegments: s,
        arc: r,
      }),
      (n = Math.floor(n)),
      (s = Math.floor(s)));
    const o = [],
      a = [],
      c = [],
      l = [],
      h = new P(),
      u = new P(),
      d = new P();
    for (let f = 0; f <= n; f++)
      for (let m = 0; m <= s; m++) {
        const _ = (m / s) * r,
          g = (f / n) * Math.PI * 2;
        ((u.x = (t + e * Math.cos(g)) * Math.cos(_)),
          (u.y = (t + e * Math.cos(g)) * Math.sin(_)),
          (u.z = e * Math.sin(g)),
          a.push(u.x, u.y, u.z),
          (h.x = t * Math.cos(_)),
          (h.y = t * Math.sin(_)),
          d.subVectors(u, h).normalize(),
          c.push(d.x, d.y, d.z),
          l.push(m / s),
          l.push(f / n));
      }
    for (let f = 1; f <= n; f++)
      for (let m = 1; m <= s; m++) {
        const _ = (s + 1) * f + m - 1,
          g = (s + 1) * (f - 1) + m - 1,
          p = (s + 1) * (f - 1) + m,
          A = (s + 1) * f + m;
        (o.push(_, g, A), o.push(g, p, A));
      }
    (this.setIndex(o),
      this.setAttribute("position", new we(a, 3)),
      this.setAttribute("normal", new we(c, 3)),
      this.setAttribute("uv", new we(l, 2)));
  }
  copy(t) {
    return (
      super.copy(t),
      (this.parameters = Object.assign({}, t.parameters)),
      this
    );
  }
  static fromJSON(t) {
    return new Hr(t.radius, t.tube, t.radialSegments, t.tubularSegments, t.arc);
  }
}
class $a extends ve {
  constructor(
    t = new hh(new P(-1, -1, 0), new P(-1, 1, 0), new P(1, 1, 0)),
    e = 64,
    n = 1,
    s = 8,
    r = !1,
  ) {
    (super(),
      (this.type = "TubeGeometry"),
      (this.parameters = {
        path: t,
        tubularSegments: e,
        radius: n,
        radialSegments: s,
        closed: r,
      }));
    const o = t.computeFrenetFrames(e, r);
    ((this.tangents = o.tangents),
      (this.normals = o.normals),
      (this.binormals = o.binormals));
    const a = new P(),
      c = new P(),
      l = new at();
    let h = new P();
    const u = [],
      d = [],
      f = [],
      m = [];
    (_(),
      this.setIndex(m),
      this.setAttribute("position", new we(u, 3)),
      this.setAttribute("normal", new we(d, 3)),
      this.setAttribute("uv", new we(f, 2)));
    function _() {
      for (let b = 0; b < e; b++) g(b);
      (g(r === !1 ? e : 0), A(), p());
    }
    function g(b) {
      h = t.getPointAt(b / e, h);
      const v = o.normals[b],
        R = o.binormals[b];
      for (let E = 0; E <= s; E++) {
        const C = (E / s) * Math.PI * 2,
          L = Math.sin(C),
          y = -Math.cos(C);
        ((c.x = y * v.x + L * R.x),
          (c.y = y * v.y + L * R.y),
          (c.z = y * v.z + L * R.z),
          c.normalize(),
          d.push(c.x, c.y, c.z),
          (a.x = h.x + n * c.x),
          (a.y = h.y + n * c.y),
          (a.z = h.z + n * c.z),
          u.push(a.x, a.y, a.z));
      }
    }
    function p() {
      for (let b = 1; b <= e; b++)
        for (let v = 1; v <= s; v++) {
          const R = (s + 1) * (b - 1) + (v - 1),
            E = (s + 1) * b + (v - 1),
            C = (s + 1) * b + v,
            L = (s + 1) * (b - 1) + v;
          (m.push(R, E, L), m.push(E, C, L));
        }
    }
    function A() {
      for (let b = 0; b <= e; b++)
        for (let v = 0; v <= s; v++)
          ((l.x = b / e), (l.y = v / s), f.push(l.x, l.y));
    }
  }
  copy(t) {
    return (
      super.copy(t),
      (this.parameters = Object.assign({}, t.parameters)),
      this
    );
  }
  toJSON() {
    const t = super.toJSON();
    return ((t.path = this.parameters.path.toJSON()), t);
  }
  static fromJSON(t) {
    return new $a(
      new Cr[t.path.type]().fromJSON(t.path),
      t.tubularSegments,
      t.radius,
      t.radialSegments,
      t.closed,
    );
  }
}
class Vd extends Ti {
  constructor(t) {
    (super(),
      (this.isMeshPhongMaterial = !0),
      (this.type = "MeshPhongMaterial"),
      (this.color = new Ht(16777215)),
      (this.specular = new Ht(1118481)),
      (this.shininess = 30),
      (this.map = null),
      (this.lightMap = null),
      (this.lightMapIntensity = 1),
      (this.aoMap = null),
      (this.aoMapIntensity = 1),
      (this.emissive = new Ht(0)),
      (this.emissiveIntensity = 1),
      (this.emissiveMap = null),
      (this.bumpMap = null),
      (this.bumpScale = 1),
      (this.normalMap = null),
      (this.normalMapType = Ga),
      (this.normalScale = new at(1, 1)),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      (this.specularMap = null),
      (this.alphaMap = null),
      (this.envMap = null),
      (this.envMapRotation = new yn()),
      (this.combine = zr),
      (this.reflectivity = 1),
      (this.refractionRatio = 0.98),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.wireframeLinecap = "round"),
      (this.wireframeLinejoin = "round"),
      (this.flatShading = !1),
      (this.fog = !0),
      this.setValues(t));
  }
  copy(t) {
    return (
      super.copy(t),
      this.color.copy(t.color),
      this.specular.copy(t.specular),
      (this.shininess = t.shininess),
      (this.map = t.map),
      (this.lightMap = t.lightMap),
      (this.lightMapIntensity = t.lightMapIntensity),
      (this.aoMap = t.aoMap),
      (this.aoMapIntensity = t.aoMapIntensity),
      this.emissive.copy(t.emissive),
      (this.emissiveMap = t.emissiveMap),
      (this.emissiveIntensity = t.emissiveIntensity),
      (this.bumpMap = t.bumpMap),
      (this.bumpScale = t.bumpScale),
      (this.normalMap = t.normalMap),
      (this.normalMapType = t.normalMapType),
      this.normalScale.copy(t.normalScale),
      (this.displacementMap = t.displacementMap),
      (this.displacementScale = t.displacementScale),
      (this.displacementBias = t.displacementBias),
      (this.specularMap = t.specularMap),
      (this.alphaMap = t.alphaMap),
      (this.envMap = t.envMap),
      this.envMapRotation.copy(t.envMapRotation),
      (this.combine = t.combine),
      (this.reflectivity = t.reflectivity),
      (this.refractionRatio = t.refractionRatio),
      (this.wireframe = t.wireframe),
      (this.wireframeLinewidth = t.wireframeLinewidth),
      (this.wireframeLinecap = t.wireframeLinecap),
      (this.wireframeLinejoin = t.wireframeLinejoin),
      (this.flatShading = t.flatShading),
      (this.fog = t.fog),
      this
    );
  }
}
class Ea extends Ti {
  constructor(t) {
    (super(),
      (this.isMeshLambertMaterial = !0),
      (this.type = "MeshLambertMaterial"),
      (this.color = new Ht(16777215)),
      (this.map = null),
      (this.lightMap = null),
      (this.lightMapIntensity = 1),
      (this.aoMap = null),
      (this.aoMapIntensity = 1),
      (this.emissive = new Ht(0)),
      (this.emissiveIntensity = 1),
      (this.emissiveMap = null),
      (this.bumpMap = null),
      (this.bumpScale = 1),
      (this.normalMap = null),
      (this.normalMapType = Ga),
      (this.normalScale = new at(1, 1)),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      (this.specularMap = null),
      (this.alphaMap = null),
      (this.envMap = null),
      (this.envMapRotation = new yn()),
      (this.combine = zr),
      (this.reflectivity = 1),
      (this.refractionRatio = 0.98),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.wireframeLinecap = "round"),
      (this.wireframeLinejoin = "round"),
      (this.flatShading = !1),
      (this.fog = !0),
      this.setValues(t));
  }
  copy(t) {
    return (
      super.copy(t),
      this.color.copy(t.color),
      (this.map = t.map),
      (this.lightMap = t.lightMap),
      (this.lightMapIntensity = t.lightMapIntensity),
      (this.aoMap = t.aoMap),
      (this.aoMapIntensity = t.aoMapIntensity),
      this.emissive.copy(t.emissive),
      (this.emissiveMap = t.emissiveMap),
      (this.emissiveIntensity = t.emissiveIntensity),
      (this.bumpMap = t.bumpMap),
      (this.bumpScale = t.bumpScale),
      (this.normalMap = t.normalMap),
      (this.normalMapType = t.normalMapType),
      this.normalScale.copy(t.normalScale),
      (this.displacementMap = t.displacementMap),
      (this.displacementScale = t.displacementScale),
      (this.displacementBias = t.displacementBias),
      (this.specularMap = t.specularMap),
      (this.alphaMap = t.alphaMap),
      (this.envMap = t.envMap),
      this.envMapRotation.copy(t.envMapRotation),
      (this.combine = t.combine),
      (this.reflectivity = t.reflectivity),
      (this.refractionRatio = t.refractionRatio),
      (this.wireframe = t.wireframe),
      (this.wireframeLinewidth = t.wireframeLinewidth),
      (this.wireframeLinecap = t.wireframeLinecap),
      (this.wireframeLinejoin = t.wireframeLinejoin),
      (this.flatShading = t.flatShading),
      (this.fog = t.fog),
      this
    );
  }
}
class Wd extends Ti {
  constructor(t) {
    (super(),
      (this.isMeshDepthMaterial = !0),
      (this.type = "MeshDepthMaterial"),
      (this.depthPacking = Su),
      (this.map = null),
      (this.alphaMap = null),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      this.setValues(t));
  }
  copy(t) {
    return (
      super.copy(t),
      (this.depthPacking = t.depthPacking),
      (this.map = t.map),
      (this.alphaMap = t.alphaMap),
      (this.displacementMap = t.displacementMap),
      (this.displacementScale = t.displacementScale),
      (this.displacementBias = t.displacementBias),
      (this.wireframe = t.wireframe),
      (this.wireframeLinewidth = t.wireframeLinewidth),
      this
    );
  }
}
class Xd extends Ti {
  constructor(t) {
    (super(),
      (this.isMeshDistanceMaterial = !0),
      (this.type = "MeshDistanceMaterial"),
      (this.map = null),
      (this.alphaMap = null),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      this.setValues(t));
  }
  copy(t) {
    return (
      super.copy(t),
      (this.map = t.map),
      (this.alphaMap = t.alphaMap),
      (this.displacementMap = t.displacementMap),
      (this.displacementScale = t.displacementScale),
      (this.displacementBias = t.displacementBias),
      this
    );
  }
}
class gh extends Ya {
  constructor(t) {
    (super(),
      (this.isLineDashedMaterial = !0),
      (this.type = "LineDashedMaterial"),
      (this.scale = 1),
      (this.dashSize = 3),
      (this.gapSize = 1),
      this.setValues(t));
  }
  copy(t) {
    return (
      super.copy(t),
      (this.scale = t.scale),
      (this.dashSize = t.dashSize),
      (this.gapSize = t.gapSize),
      this
    );
  }
}
class _h extends Re {
  constructor(t, e = 1) {
    (super(),
      (this.isLight = !0),
      (this.type = "Light"),
      (this.color = new Ht(t)),
      (this.intensity = e));
  }
  dispose() {}
  copy(t, e) {
    return (
      super.copy(t, e),
      this.color.copy(t.color),
      (this.intensity = t.intensity),
      this
    );
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return (
      (e.object.color = this.color.getHex()),
      (e.object.intensity = this.intensity),
      this.groundColor !== void 0 &&
        (e.object.groundColor = this.groundColor.getHex()),
      this.distance !== void 0 && (e.object.distance = this.distance),
      this.angle !== void 0 && (e.object.angle = this.angle),
      this.decay !== void 0 && (e.object.decay = this.decay),
      this.penumbra !== void 0 && (e.object.penumbra = this.penumbra),
      this.shadow !== void 0 && (e.object.shadow = this.shadow.toJSON()),
      this.target !== void 0 && (e.object.target = this.target.uuid),
      e
    );
  }
}
class qd extends _h {
  constructor(t, e, n) {
    (super(t, n),
      (this.isHemisphereLight = !0),
      (this.type = "HemisphereLight"),
      this.position.copy(Re.DEFAULT_UP),
      this.updateMatrix(),
      (this.groundColor = new Ht(e)));
  }
  copy(t, e) {
    return (super.copy(t, e), this.groundColor.copy(t.groundColor), this);
  }
}
const Mo = new se(),
  Zc = new P(),
  jc = new P();
class Yd {
  constructor(t) {
    ((this.camera = t),
      (this.intensity = 1),
      (this.bias = 0),
      (this.normalBias = 0),
      (this.radius = 1),
      (this.blurSamples = 8),
      (this.mapSize = new at(512, 512)),
      (this.mapType = Tn),
      (this.map = null),
      (this.mapPass = null),
      (this.matrix = new se()),
      (this.autoUpdate = !0),
      (this.needsUpdate = !1),
      (this._frustum = new qa()),
      (this._frameExtents = new at(1, 1)),
      (this._viewportCount = 1),
      (this._viewports = [new Ee(0, 0, 1, 1)]));
  }
  getViewportCount() {
    return this._viewportCount;
  }
  getFrustum() {
    return this._frustum;
  }
  updateMatrices(t) {
    const e = this.camera,
      n = this.matrix;
    (Zc.setFromMatrixPosition(t.matrixWorld),
      e.position.copy(Zc),
      jc.setFromMatrixPosition(t.target.matrixWorld),
      e.lookAt(jc),
      e.updateMatrixWorld(),
      Mo.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse),
      this._frustum.setFromProjectionMatrix(
        Mo,
        e.coordinateSystem,
        e.reversedDepth,
      ),
      e.reversedDepth
        ? n.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 1, 0, 0, 0, 0, 1)
        : n.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1),
      n.multiply(Mo));
  }
  getViewport(t) {
    return this._viewports[t];
  }
  getFrameExtents() {
    return this._frameExtents;
  }
  dispose() {
    (this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose());
  }
  copy(t) {
    return (
      (this.camera = t.camera.clone()),
      (this.intensity = t.intensity),
      (this.bias = t.bias),
      (this.radius = t.radius),
      (this.autoUpdate = t.autoUpdate),
      (this.needsUpdate = t.needsUpdate),
      (this.normalBias = t.normalBias),
      (this.blurSamples = t.blurSamples),
      this.mapSize.copy(t.mapSize),
      this
    );
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    const t = {};
    return (
      this.intensity !== 1 && (t.intensity = this.intensity),
      this.bias !== 0 && (t.bias = this.bias),
      this.normalBias !== 0 && (t.normalBias = this.normalBias),
      this.radius !== 1 && (t.radius = this.radius),
      (this.mapSize.x !== 512 || this.mapSize.y !== 512) &&
        (t.mapSize = this.mapSize.toArray()),
      (t.camera = this.camera.toJSON(!1).object),
      delete t.camera.matrix,
      t
    );
  }
}
class Ja extends eh {
  constructor(t = -1, e = 1, n = 1, s = -1, r = 0.1, o = 2e3) {
    (super(),
      (this.isOrthographicCamera = !0),
      (this.type = "OrthographicCamera"),
      (this.zoom = 1),
      (this.view = null),
      (this.left = t),
      (this.right = e),
      (this.top = n),
      (this.bottom = s),
      (this.near = r),
      (this.far = o),
      this.updateProjectionMatrix());
  }
  copy(t, e) {
    return (
      super.copy(t, e),
      (this.left = t.left),
      (this.right = t.right),
      (this.top = t.top),
      (this.bottom = t.bottom),
      (this.near = t.near),
      (this.far = t.far),
      (this.zoom = t.zoom),
      (this.view = t.view === null ? null : Object.assign({}, t.view)),
      this
    );
  }
  setViewOffset(t, e, n, s, r, o) {
    (this.view === null &&
      (this.view = {
        enabled: !0,
        fullWidth: 1,
        fullHeight: 1,
        offsetX: 0,
        offsetY: 0,
        width: 1,
        height: 1,
      }),
      (this.view.enabled = !0),
      (this.view.fullWidth = t),
      (this.view.fullHeight = e),
      (this.view.offsetX = n),
      (this.view.offsetY = s),
      (this.view.width = r),
      (this.view.height = o),
      this.updateProjectionMatrix());
  }
  clearViewOffset() {
    (this.view !== null && (this.view.enabled = !1),
      this.updateProjectionMatrix());
  }
  updateProjectionMatrix() {
    const t = (this.right - this.left) / (2 * this.zoom),
      e = (this.top - this.bottom) / (2 * this.zoom),
      n = (this.right + this.left) / 2,
      s = (this.top + this.bottom) / 2;
    let r = n - t,
      o = n + t,
      a = s + e,
      c = s - e;
    if (this.view !== null && this.view.enabled) {
      const l = (this.right - this.left) / this.view.fullWidth / this.zoom,
        h = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      ((r += l * this.view.offsetX),
        (o = r + l * this.view.width),
        (a -= h * this.view.offsetY),
        (c = a - h * this.view.height));
    }
    (this.projectionMatrix.makeOrthographic(
      r,
      o,
      a,
      c,
      this.near,
      this.far,
      this.coordinateSystem,
      this.reversedDepth,
    ),
      this.projectionMatrixInverse.copy(this.projectionMatrix).invert());
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return (
      (e.object.zoom = this.zoom),
      (e.object.left = this.left),
      (e.object.right = this.right),
      (e.object.top = this.top),
      (e.object.bottom = this.bottom),
      (e.object.near = this.near),
      (e.object.far = this.far),
      this.view !== null && (e.object.view = Object.assign({}, this.view)),
      e
    );
  }
}
class Kd extends Yd {
  constructor() {
    (super(new Ja(-5, 5, 5, -5, 0.5, 500)),
      (this.isDirectionalLightShadow = !0));
  }
}
class Zd extends _h {
  constructor(t, e) {
    (super(t, e),
      (this.isDirectionalLight = !0),
      (this.type = "DirectionalLight"),
      this.position.copy(Re.DEFAULT_UP),
      this.updateMatrix(),
      (this.target = new Re()),
      (this.shadow = new Kd()));
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(t) {
    return (
      super.copy(t),
      (this.target = t.target.clone()),
      (this.shadow = t.shadow.clone()),
      this
    );
  }
}
class jd extends un {
  constructor(t = []) {
    (super(),
      (this.isArrayCamera = !0),
      (this.isMultiViewCamera = !1),
      (this.cameras = t));
  }
}
const $c = new se();
class vh {
  constructor(t, e, n = 0, s = 1 / 0) {
    ((this.ray = new Br(t, e)),
      (this.near = n),
      (this.far = s),
      (this.camera = null),
      (this.layers = new Wa()),
      (this.params = {
        Mesh: {},
        Line: { threshold: 1 },
        LOD: {},
        Points: { threshold: 1 },
        Sprite: {},
      }));
  }
  set(t, e) {
    this.ray.set(t, e);
  }
  setFromCamera(t, e) {
    e.isPerspectiveCamera
      ? (this.ray.origin.setFromMatrixPosition(e.matrixWorld),
        this.ray.direction
          .set(t.x, t.y, 0.5)
          .unproject(e)
          .sub(this.ray.origin)
          .normalize(),
        (this.camera = e))
      : e.isOrthographicCamera
        ? (this.ray.origin
            .set(t.x, t.y, (e.near + e.far) / (e.near - e.far))
            .unproject(e),
          this.ray.direction.set(0, 0, -1).transformDirection(e.matrixWorld),
          (this.camera = e))
        : console.error("THREE.Raycaster: Unsupported camera type: " + e.type);
  }
  setFromXRController(t) {
    return (
      $c.identity().extractRotation(t.matrixWorld),
      this.ray.origin.setFromMatrixPosition(t.matrixWorld),
      this.ray.direction.set(0, 0, -1).applyMatrix4($c),
      this
    );
  }
  intersectObject(t, e = !0, n = []) {
    return (wa(t, this, n, e), n.sort(Jc), n);
  }
  intersectObjects(t, e = !0, n = []) {
    for (let s = 0, r = t.length; s < r; s++) wa(t[s], this, n, e);
    return (n.sort(Jc), n);
  }
}
function Jc(i, t) {
  return i.distance - t.distance;
}
function wa(i, t, e, n) {
  let s = !0;
  if (
    (i.layers.test(t.layers) && i.raycast(t, e) === !1 && (s = !1),
    s === !0 && n === !0)
  ) {
    const r = i.children;
    for (let o = 0, a = r.length; o < a; o++) wa(r[o], t, e, !0);
  }
}
class Qc {
  constructor(t = 1, e = 0, n = 0) {
    ((this.radius = t), (this.phi = e), (this.theta = n));
  }
  set(t, e, n) {
    return ((this.radius = t), (this.phi = e), (this.theta = n), this);
  }
  copy(t) {
    return (
      (this.radius = t.radius),
      (this.phi = t.phi),
      (this.theta = t.theta),
      this
    );
  }
  makeSafe() {
    return ((this.phi = Xt(this.phi, 1e-6, Math.PI - 1e-6)), this);
  }
  setFromVector3(t) {
    return this.setFromCartesianCoords(t.x, t.y, t.z);
  }
  setFromCartesianCoords(t, e, n) {
    return (
      (this.radius = Math.sqrt(t * t + e * e + n * n)),
      this.radius === 0
        ? ((this.theta = 0), (this.phi = 0))
        : ((this.theta = Math.atan2(t, n)),
          (this.phi = Math.acos(Xt(e / this.radius, -1, 1)))),
      this
    );
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class $d extends Ei {
  constructor(t, e = null) {
    (super(),
      (this.object = t),
      (this.domElement = e),
      (this.enabled = !0),
      (this.state = -1),
      (this.keys = {}),
      (this.mouseButtons = { LEFT: null, MIDDLE: null, RIGHT: null }),
      (this.touches = { ONE: null, TWO: null }));
  }
  connect(t) {
    if (t === void 0) {
      console.warn("THREE.Controls: connect() now requires an element.");
      return;
    }
    (this.domElement !== null && this.disconnect(), (this.domElement = t));
  }
  disconnect() {}
  dispose() {}
  update() {}
}
function tl(i, t, e, n) {
  const s = Jd(n);
  switch (e) {
    case Xl:
      return i * t;
    case za:
      return ((i * t) / s.components) * s.byteLength;
    case ka:
      return ((i * t) / s.components) * s.byteLength;
    case Yl:
      return ((i * t * 2) / s.components) * s.byteLength;
    case Ba:
      return ((i * t * 2) / s.components) * s.byteLength;
    case ql:
      return ((i * t * 3) / s.components) * s.byteLength;
    case xn:
      return ((i * t * 4) / s.components) * s.byteLength;
    case Ha:
      return ((i * t * 4) / s.components) * s.byteLength;
    case mr:
    case gr:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case _r:
    case vr:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case Yo:
    case Zo:
      return (Math.max(i, 16) * Math.max(t, 8)) / 4;
    case qo:
    case Ko:
      return (Math.max(i, 8) * Math.max(t, 8)) / 2;
    case jo:
    case $o:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case Jo:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case Qo:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case ta:
      return Math.floor((i + 4) / 5) * Math.floor((t + 3) / 4) * 16;
    case ea:
      return Math.floor((i + 4) / 5) * Math.floor((t + 4) / 5) * 16;
    case na:
      return Math.floor((i + 5) / 6) * Math.floor((t + 4) / 5) * 16;
    case ia:
      return Math.floor((i + 5) / 6) * Math.floor((t + 5) / 6) * 16;
    case sa:
      return Math.floor((i + 7) / 8) * Math.floor((t + 4) / 5) * 16;
    case ra:
      return Math.floor((i + 7) / 8) * Math.floor((t + 5) / 6) * 16;
    case oa:
      return Math.floor((i + 7) / 8) * Math.floor((t + 7) / 8) * 16;
    case aa:
      return Math.floor((i + 9) / 10) * Math.floor((t + 4) / 5) * 16;
    case ca:
      return Math.floor((i + 9) / 10) * Math.floor((t + 5) / 6) * 16;
    case la:
      return Math.floor((i + 9) / 10) * Math.floor((t + 7) / 8) * 16;
    case ha:
      return Math.floor((i + 9) / 10) * Math.floor((t + 9) / 10) * 16;
    case ua:
      return Math.floor((i + 11) / 12) * Math.floor((t + 9) / 10) * 16;
    case da:
      return Math.floor((i + 11) / 12) * Math.floor((t + 11) / 12) * 16;
    case fa:
    case pa:
    case ma:
      return Math.ceil(i / 4) * Math.ceil(t / 4) * 16;
    case ga:
    case _a:
      return Math.ceil(i / 4) * Math.ceil(t / 4) * 8;
    case va:
    case xa:
      return Math.ceil(i / 4) * Math.ceil(t / 4) * 16;
  }
  throw new Error(`Unable to determine texture byte length for ${e} format.`);
}
function Jd(i) {
  switch (i) {
    case Tn:
    case Hl:
      return { byteLength: 1, components: 1 };
    case ws:
    case Gl:
    case Fs:
      return { byteLength: 2, components: 1 };
    case Fa:
    case Oa:
      return { byteLength: 2, components: 4 };
    case si:
    case Na:
    case En:
      return { byteLength: 4, components: 1 };
    case Vl:
    case Wl:
      return { byteLength: 4, components: 3 };
  }
  throw new Error(`Unknown texture type ${i}.`);
}
typeof __THREE_DEVTOOLS__ < "u" &&
  __THREE_DEVTOOLS__.dispatchEvent(
    new CustomEvent("register", { detail: { revision: Ia } }),
  );
typeof window < "u" &&
  (window.__THREE__
    ? console.warn("WARNING: Multiple instances of Three.js being imported.")
    : (window.__THREE__ = Ia));
/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */ function xh() {
  let i = null,
    t = !1,
    e = null,
    n = null;
  function s(r, o) {
    (e(r, o), (n = i.requestAnimationFrame(s)));
  }
  return {
    start: function () {
      t !== !0 && e !== null && ((n = i.requestAnimationFrame(s)), (t = !0));
    },
    stop: function () {
      (i.cancelAnimationFrame(n), (t = !1));
    },
    setAnimationLoop: function (r) {
      e = r;
    },
    setContext: function (r) {
      i = r;
    },
  };
}
function Qd(i) {
  const t = new WeakMap();
  function e(a, c) {
    const l = a.array,
      h = a.usage,
      u = l.byteLength,
      d = i.createBuffer();
    (i.bindBuffer(c, d), i.bufferData(c, l, h), a.onUploadCallback());
    let f;
    if (l instanceof Float32Array) f = i.FLOAT;
    else if (typeof Float16Array < "u" && l instanceof Float16Array)
      f = i.HALF_FLOAT;
    else if (l instanceof Uint16Array)
      a.isFloat16BufferAttribute ? (f = i.HALF_FLOAT) : (f = i.UNSIGNED_SHORT);
    else if (l instanceof Int16Array) f = i.SHORT;
    else if (l instanceof Uint32Array) f = i.UNSIGNED_INT;
    else if (l instanceof Int32Array) f = i.INT;
    else if (l instanceof Int8Array) f = i.BYTE;
    else if (l instanceof Uint8Array) f = i.UNSIGNED_BYTE;
    else if (l instanceof Uint8ClampedArray) f = i.UNSIGNED_BYTE;
    else
      throw new Error(
        "THREE.WebGLAttributes: Unsupported buffer data format: " + l,
      );
    return {
      buffer: d,
      type: f,
      bytesPerElement: l.BYTES_PER_ELEMENT,
      version: a.version,
      size: u,
    };
  }
  function n(a, c, l) {
    const h = c.array,
      u = c.updateRanges;
    if ((i.bindBuffer(l, a), u.length === 0)) i.bufferSubData(l, 0, h);
    else {
      u.sort((f, m) => f.start - m.start);
      let d = 0;
      for (let f = 1; f < u.length; f++) {
        const m = u[d],
          _ = u[f];
        _.start <= m.start + m.count + 1
          ? (m.count = Math.max(m.count, _.start + _.count - m.start))
          : (++d, (u[d] = _));
      }
      u.length = d + 1;
      for (let f = 0, m = u.length; f < m; f++) {
        const _ = u[f];
        i.bufferSubData(l, _.start * h.BYTES_PER_ELEMENT, h, _.start, _.count);
      }
      c.clearUpdateRanges();
    }
    c.onUploadCallback();
  }
  function s(a) {
    return (a.isInterleavedBufferAttribute && (a = a.data), t.get(a));
  }
  function r(a) {
    a.isInterleavedBufferAttribute && (a = a.data);
    const c = t.get(a);
    c && (i.deleteBuffer(c.buffer), t.delete(a));
  }
  function o(a, c) {
    if (
      (a.isInterleavedBufferAttribute && (a = a.data), a.isGLBufferAttribute)
    ) {
      const h = t.get(a);
      (!h || h.version < a.version) &&
        t.set(a, {
          buffer: a.buffer,
          type: a.type,
          bytesPerElement: a.elementSize,
          version: a.version,
        });
      return;
    }
    const l = t.get(a);
    if (l === void 0) t.set(a, e(a, c));
    else if (l.version < a.version) {
      if (l.size !== a.array.byteLength)
        throw new Error(
          "THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.",
        );
      (n(l.buffer, a, c), (l.version = a.version));
    }
  }
  return { get: s, remove: r, update: o };
}
var tf = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,
  ef = `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,
  nf = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,
  sf = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,
  rf = `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,
  of = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,
  af = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,
  cf = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,
  lf = `#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,
  hf = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,
  uf = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,
  df = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,
  ff = `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,
  pf = `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,
  mf = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,
  gf = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,
  _f = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,
  vf = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,
  xf = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,
  yf = `#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,
  Mf = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,
  Sf = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,
  bf = `#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,
  Ef = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,
  wf = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,
  Tf = `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,
  Af = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,
  Rf = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,
  Cf = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,
  Pf = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,
  Df = "gl_FragColor = linearToOutputTexel( gl_FragColor );",
  Lf = `vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,
  If = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,
  Uf = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,
  Nf = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,
  Ff = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,
  Of = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,
  zf = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,
  kf = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`,
  Bf = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,
  Hf = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,
  Gf = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,
  Vf = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,
  Wf = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,
  Xf = `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,
  qf = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,
  Yf = `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,
  Kf = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,
  Zf = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,
  jf = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,
  $f = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,
  Jf = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,
  Qf = `struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,
  tp = `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,
  ep = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,
  np = `#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,
  ip = `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,
  sp = `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,
  rp = `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,
  op = `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,
  ap = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,
  cp = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`,
  lp = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,
  hp = `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,
  up = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,
  dp = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,
  fp = `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,
  pp = `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,
  mp = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,
  gp = `#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,
  _p = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,
  vp = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,
  xp = `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,
  yp = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,
  Mp = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,
  Sp = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,
  bp = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,
  Ep = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,
  wp = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,
  Tp = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,
  Ap = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,
  Rp = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,
  Cp = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,
  Pp = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,
  Dp = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,
  Lp = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,
  Ip = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,
  Up = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,
  Np = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,
  Fp = `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,
  Op = `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,
  zp = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,
  kp = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,
  Bp = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,
  Hp = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,
  Gp = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,
  Vp = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,
  Wp = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,
  Xp = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,
  qp = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,
  Yp = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,
  Kp = `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,
  Zp = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,
  jp = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,
  $p = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,
  Jp = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,
  Qp = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;
const tm = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,
  em = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  nm = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,
  im = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  sm = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,
  rm = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  om = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,
  am = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,
  cm = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,
  lm = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,
  hm = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,
  um = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  dm = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,
  fm = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
  pm = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,
  mm = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  gm = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  _m = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  vm = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,
  xm = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  ym = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,
  Mm = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,
  Sm = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  bm = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  Em = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,
  wm = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  Tm = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  Am = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  Rm = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,
  Cm = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
  Pm = `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  Dm = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,
  Lm = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,
  Im = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,
  Wt = {
    alphahash_fragment: tf,
    alphahash_pars_fragment: ef,
    alphamap_fragment: nf,
    alphamap_pars_fragment: sf,
    alphatest_fragment: rf,
    alphatest_pars_fragment: of,
    aomap_fragment: af,
    aomap_pars_fragment: cf,
    batching_pars_vertex: lf,
    batching_vertex: hf,
    begin_vertex: uf,
    beginnormal_vertex: df,
    bsdfs: ff,
    iridescence_fragment: pf,
    bumpmap_pars_fragment: mf,
    clipping_planes_fragment: gf,
    clipping_planes_pars_fragment: _f,
    clipping_planes_pars_vertex: vf,
    clipping_planes_vertex: xf,
    color_fragment: yf,
    color_pars_fragment: Mf,
    color_pars_vertex: Sf,
    color_vertex: bf,
    common: Ef,
    cube_uv_reflection_fragment: wf,
    defaultnormal_vertex: Tf,
    displacementmap_pars_vertex: Af,
    displacementmap_vertex: Rf,
    emissivemap_fragment: Cf,
    emissivemap_pars_fragment: Pf,
    colorspace_fragment: Df,
    colorspace_pars_fragment: Lf,
    envmap_fragment: If,
    envmap_common_pars_fragment: Uf,
    envmap_pars_fragment: Nf,
    envmap_pars_vertex: Ff,
    envmap_physical_pars_fragment: Yf,
    envmap_vertex: Of,
    fog_vertex: zf,
    fog_pars_vertex: kf,
    fog_fragment: Bf,
    fog_pars_fragment: Hf,
    gradientmap_pars_fragment: Gf,
    lightmap_pars_fragment: Vf,
    lights_lambert_fragment: Wf,
    lights_lambert_pars_fragment: Xf,
    lights_pars_begin: qf,
    lights_toon_fragment: Kf,
    lights_toon_pars_fragment: Zf,
    lights_phong_fragment: jf,
    lights_phong_pars_fragment: $f,
    lights_physical_fragment: Jf,
    lights_physical_pars_fragment: Qf,
    lights_fragment_begin: tp,
    lights_fragment_maps: ep,
    lights_fragment_end: np,
    logdepthbuf_fragment: ip,
    logdepthbuf_pars_fragment: sp,
    logdepthbuf_pars_vertex: rp,
    logdepthbuf_vertex: op,
    map_fragment: ap,
    map_pars_fragment: cp,
    map_particle_fragment: lp,
    map_particle_pars_fragment: hp,
    metalnessmap_fragment: up,
    metalnessmap_pars_fragment: dp,
    morphinstance_vertex: fp,
    morphcolor_vertex: pp,
    morphnormal_vertex: mp,
    morphtarget_pars_vertex: gp,
    morphtarget_vertex: _p,
    normal_fragment_begin: vp,
    normal_fragment_maps: xp,
    normal_pars_fragment: yp,
    normal_pars_vertex: Mp,
    normal_vertex: Sp,
    normalmap_pars_fragment: bp,
    clearcoat_normal_fragment_begin: Ep,
    clearcoat_normal_fragment_maps: wp,
    clearcoat_pars_fragment: Tp,
    iridescence_pars_fragment: Ap,
    opaque_fragment: Rp,
    packing: Cp,
    premultiplied_alpha_fragment: Pp,
    project_vertex: Dp,
    dithering_fragment: Lp,
    dithering_pars_fragment: Ip,
    roughnessmap_fragment: Up,
    roughnessmap_pars_fragment: Np,
    shadowmap_pars_fragment: Fp,
    shadowmap_pars_vertex: Op,
    shadowmap_vertex: zp,
    shadowmask_pars_fragment: kp,
    skinbase_vertex: Bp,
    skinning_pars_vertex: Hp,
    skinning_vertex: Gp,
    skinnormal_vertex: Vp,
    specularmap_fragment: Wp,
    specularmap_pars_fragment: Xp,
    tonemapping_fragment: qp,
    tonemapping_pars_fragment: Yp,
    transmission_fragment: Kp,
    transmission_pars_fragment: Zp,
    uv_pars_fragment: jp,
    uv_pars_vertex: $p,
    uv_vertex: Jp,
    worldpos_vertex: Qp,
    background_vert: tm,
    background_frag: em,
    backgroundCube_vert: nm,
    backgroundCube_frag: im,
    cube_vert: sm,
    cube_frag: rm,
    depth_vert: om,
    depth_frag: am,
    distanceRGBA_vert: cm,
    distanceRGBA_frag: lm,
    equirect_vert: hm,
    equirect_frag: um,
    linedashed_vert: dm,
    linedashed_frag: fm,
    meshbasic_vert: pm,
    meshbasic_frag: mm,
    meshlambert_vert: gm,
    meshlambert_frag: _m,
    meshmatcap_vert: vm,
    meshmatcap_frag: xm,
    meshnormal_vert: ym,
    meshnormal_frag: Mm,
    meshphong_vert: Sm,
    meshphong_frag: bm,
    meshphysical_vert: Em,
    meshphysical_frag: wm,
    meshtoon_vert: Tm,
    meshtoon_frag: Am,
    points_vert: Rm,
    points_frag: Cm,
    shadow_vert: Pm,
    shadow_frag: Dm,
    sprite_vert: Lm,
    sprite_frag: Im,
  },
  mt = {
    common: {
      diffuse: { value: new Ht(16777215) },
      opacity: { value: 1 },
      map: { value: null },
      mapTransform: { value: new Vt() },
      alphaMap: { value: null },
      alphaMapTransform: { value: new Vt() },
      alphaTest: { value: 0 },
    },
    specularmap: {
      specularMap: { value: null },
      specularMapTransform: { value: new Vt() },
    },
    envmap: {
      envMap: { value: null },
      envMapRotation: { value: new Vt() },
      flipEnvMap: { value: -1 },
      reflectivity: { value: 1 },
      ior: { value: 1.5 },
      refractionRatio: { value: 0.98 },
    },
    aomap: {
      aoMap: { value: null },
      aoMapIntensity: { value: 1 },
      aoMapTransform: { value: new Vt() },
    },
    lightmap: {
      lightMap: { value: null },
      lightMapIntensity: { value: 1 },
      lightMapTransform: { value: new Vt() },
    },
    bumpmap: {
      bumpMap: { value: null },
      bumpMapTransform: { value: new Vt() },
      bumpScale: { value: 1 },
    },
    normalmap: {
      normalMap: { value: null },
      normalMapTransform: { value: new Vt() },
      normalScale: { value: new at(1, 1) },
    },
    displacementmap: {
      displacementMap: { value: null },
      displacementMapTransform: { value: new Vt() },
      displacementScale: { value: 1 },
      displacementBias: { value: 0 },
    },
    emissivemap: {
      emissiveMap: { value: null },
      emissiveMapTransform: { value: new Vt() },
    },
    metalnessmap: {
      metalnessMap: { value: null },
      metalnessMapTransform: { value: new Vt() },
    },
    roughnessmap: {
      roughnessMap: { value: null },
      roughnessMapTransform: { value: new Vt() },
    },
    gradientmap: { gradientMap: { value: null } },
    fog: {
      fogDensity: { value: 25e-5 },
      fogNear: { value: 1 },
      fogFar: { value: 2e3 },
      fogColor: { value: new Ht(16777215) },
    },
    lights: {
      ambientLightColor: { value: [] },
      lightProbe: { value: [] },
      directionalLights: {
        value: [],
        properties: { direction: {}, color: {} },
      },
      directionalLightShadows: {
        value: [],
        properties: {
          shadowIntensity: 1,
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {},
        },
      },
      directionalShadowMap: { value: [] },
      directionalShadowMatrix: { value: [] },
      spotLights: {
        value: [],
        properties: {
          color: {},
          position: {},
          direction: {},
          distance: {},
          coneCos: {},
          penumbraCos: {},
          decay: {},
        },
      },
      spotLightShadows: {
        value: [],
        properties: {
          shadowIntensity: 1,
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {},
        },
      },
      spotLightMap: { value: [] },
      spotShadowMap: { value: [] },
      spotLightMatrix: { value: [] },
      pointLights: {
        value: [],
        properties: { color: {}, position: {}, decay: {}, distance: {} },
      },
      pointLightShadows: {
        value: [],
        properties: {
          shadowIntensity: 1,
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {},
          shadowCameraNear: {},
          shadowCameraFar: {},
        },
      },
      pointShadowMap: { value: [] },
      pointShadowMatrix: { value: [] },
      hemisphereLights: {
        value: [],
        properties: { direction: {}, skyColor: {}, groundColor: {} },
      },
      rectAreaLights: {
        value: [],
        properties: { color: {}, position: {}, width: {}, height: {} },
      },
      ltc_1: { value: null },
      ltc_2: { value: null },
    },
    points: {
      diffuse: { value: new Ht(16777215) },
      opacity: { value: 1 },
      size: { value: 1 },
      scale: { value: 1 },
      map: { value: null },
      alphaMap: { value: null },
      alphaMapTransform: { value: new Vt() },
      alphaTest: { value: 0 },
      uvTransform: { value: new Vt() },
    },
    sprite: {
      diffuse: { value: new Ht(16777215) },
      opacity: { value: 1 },
      center: { value: new at(0.5, 0.5) },
      rotation: { value: 0 },
      map: { value: null },
      mapTransform: { value: new Vt() },
      alphaMap: { value: null },
      alphaMapTransform: { value: new Vt() },
      alphaTest: { value: 0 },
    },
  },
  bn = {
    basic: {
      uniforms: He([
        mt.common,
        mt.specularmap,
        mt.envmap,
        mt.aomap,
        mt.lightmap,
        mt.fog,
      ]),
      vertexShader: Wt.meshbasic_vert,
      fragmentShader: Wt.meshbasic_frag,
    },
    lambert: {
      uniforms: He([
        mt.common,
        mt.specularmap,
        mt.envmap,
        mt.aomap,
        mt.lightmap,
        mt.emissivemap,
        mt.bumpmap,
        mt.normalmap,
        mt.displacementmap,
        mt.fog,
        mt.lights,
        { emissive: { value: new Ht(0) } },
      ]),
      vertexShader: Wt.meshlambert_vert,
      fragmentShader: Wt.meshlambert_frag,
    },
    phong: {
      uniforms: He([
        mt.common,
        mt.specularmap,
        mt.envmap,
        mt.aomap,
        mt.lightmap,
        mt.emissivemap,
        mt.bumpmap,
        mt.normalmap,
        mt.displacementmap,
        mt.fog,
        mt.lights,
        {
          emissive: { value: new Ht(0) },
          specular: { value: new Ht(1118481) },
          shininess: { value: 30 },
        },
      ]),
      vertexShader: Wt.meshphong_vert,
      fragmentShader: Wt.meshphong_frag,
    },
    standard: {
      uniforms: He([
        mt.common,
        mt.envmap,
        mt.aomap,
        mt.lightmap,
        mt.emissivemap,
        mt.bumpmap,
        mt.normalmap,
        mt.displacementmap,
        mt.roughnessmap,
        mt.metalnessmap,
        mt.fog,
        mt.lights,
        {
          emissive: { value: new Ht(0) },
          roughness: { value: 1 },
          metalness: { value: 0 },
          envMapIntensity: { value: 1 },
        },
      ]),
      vertexShader: Wt.meshphysical_vert,
      fragmentShader: Wt.meshphysical_frag,
    },
    toon: {
      uniforms: He([
        mt.common,
        mt.aomap,
        mt.lightmap,
        mt.emissivemap,
        mt.bumpmap,
        mt.normalmap,
        mt.displacementmap,
        mt.gradientmap,
        mt.fog,
        mt.lights,
        { emissive: { value: new Ht(0) } },
      ]),
      vertexShader: Wt.meshtoon_vert,
      fragmentShader: Wt.meshtoon_frag,
    },
    matcap: {
      uniforms: He([
        mt.common,
        mt.bumpmap,
        mt.normalmap,
        mt.displacementmap,
        mt.fog,
        { matcap: { value: null } },
      ]),
      vertexShader: Wt.meshmatcap_vert,
      fragmentShader: Wt.meshmatcap_frag,
    },
    points: {
      uniforms: He([mt.points, mt.fog]),
      vertexShader: Wt.points_vert,
      fragmentShader: Wt.points_frag,
    },
    dashed: {
      uniforms: He([
        mt.common,
        mt.fog,
        {
          scale: { value: 1 },
          dashSize: { value: 1 },
          totalSize: { value: 2 },
        },
      ]),
      vertexShader: Wt.linedashed_vert,
      fragmentShader: Wt.linedashed_frag,
    },
    depth: {
      uniforms: He([mt.common, mt.displacementmap]),
      vertexShader: Wt.depth_vert,
      fragmentShader: Wt.depth_frag,
    },
    normal: {
      uniforms: He([
        mt.common,
        mt.bumpmap,
        mt.normalmap,
        mt.displacementmap,
        { opacity: { value: 1 } },
      ]),
      vertexShader: Wt.meshnormal_vert,
      fragmentShader: Wt.meshnormal_frag,
    },
    sprite: {
      uniforms: He([mt.sprite, mt.fog]),
      vertexShader: Wt.sprite_vert,
      fragmentShader: Wt.sprite_frag,
    },
    background: {
      uniforms: {
        uvTransform: { value: new Vt() },
        t2D: { value: null },
        backgroundIntensity: { value: 1 },
      },
      vertexShader: Wt.background_vert,
      fragmentShader: Wt.background_frag,
    },
    backgroundCube: {
      uniforms: {
        envMap: { value: null },
        flipEnvMap: { value: -1 },
        backgroundBlurriness: { value: 0 },
        backgroundIntensity: { value: 1 },
        backgroundRotation: { value: new Vt() },
      },
      vertexShader: Wt.backgroundCube_vert,
      fragmentShader: Wt.backgroundCube_frag,
    },
    cube: {
      uniforms: {
        tCube: { value: null },
        tFlip: { value: -1 },
        opacity: { value: 1 },
      },
      vertexShader: Wt.cube_vert,
      fragmentShader: Wt.cube_frag,
    },
    equirect: {
      uniforms: { tEquirect: { value: null } },
      vertexShader: Wt.equirect_vert,
      fragmentShader: Wt.equirect_frag,
    },
    distanceRGBA: {
      uniforms: He([
        mt.common,
        mt.displacementmap,
        {
          referencePosition: { value: new P() },
          nearDistance: { value: 1 },
          farDistance: { value: 1e3 },
        },
      ]),
      vertexShader: Wt.distanceRGBA_vert,
      fragmentShader: Wt.distanceRGBA_frag,
    },
    shadow: {
      uniforms: He([
        mt.lights,
        mt.fog,
        { color: { value: new Ht(0) }, opacity: { value: 1 } },
      ]),
      vertexShader: Wt.shadow_vert,
      fragmentShader: Wt.shadow_frag,
    },
  };
bn.physical = {
  uniforms: He([
    bn.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatMapTransform: { value: new Vt() },
      clearcoatNormalMap: { value: null },
      clearcoatNormalMapTransform: { value: new Vt() },
      clearcoatNormalScale: { value: new at(1, 1) },
      clearcoatRoughness: { value: 0 },
      clearcoatRoughnessMap: { value: null },
      clearcoatRoughnessMapTransform: { value: new Vt() },
      dispersion: { value: 0 },
      iridescence: { value: 0 },
      iridescenceMap: { value: null },
      iridescenceMapTransform: { value: new Vt() },
      iridescenceIOR: { value: 1.3 },
      iridescenceThicknessMinimum: { value: 100 },
      iridescenceThicknessMaximum: { value: 400 },
      iridescenceThicknessMap: { value: null },
      iridescenceThicknessMapTransform: { value: new Vt() },
      sheen: { value: 0 },
      sheenColor: { value: new Ht(0) },
      sheenColorMap: { value: null },
      sheenColorMapTransform: { value: new Vt() },
      sheenRoughness: { value: 1 },
      sheenRoughnessMap: { value: null },
      sheenRoughnessMapTransform: { value: new Vt() },
      transmission: { value: 0 },
      transmissionMap: { value: null },
      transmissionMapTransform: { value: new Vt() },
      transmissionSamplerSize: { value: new at() },
      transmissionSamplerMap: { value: null },
      thickness: { value: 0 },
      thicknessMap: { value: null },
      thicknessMapTransform: { value: new Vt() },
      attenuationDistance: { value: 0 },
      attenuationColor: { value: new Ht(0) },
      specularColor: { value: new Ht(1, 1, 1) },
      specularColorMap: { value: null },
      specularColorMapTransform: { value: new Vt() },
      specularIntensity: { value: 1 },
      specularIntensityMap: { value: null },
      specularIntensityMapTransform: { value: new Vt() },
      anisotropyVector: { value: new at() },
      anisotropyMap: { value: null },
      anisotropyMapTransform: { value: new Vt() },
    },
  ]),
  vertexShader: Wt.meshphysical_vert,
  fragmentShader: Wt.meshphysical_frag,
};
const lr = { r: 0, b: 0, g: 0 },
  fi = new yn(),
  Um = new se();
function Nm(i, t, e, n, s, r, o) {
  const a = new Ht(0);
  let c = r === !0 ? 0 : 1,
    l,
    h,
    u = null,
    d = 0,
    f = null;
  function m(b) {
    let v = b.isScene === !0 ? b.background : null;
    return (
      v && v.isTexture && (v = (b.backgroundBlurriness > 0 ? e : t).get(v)),
      v
    );
  }
  function _(b) {
    let v = !1;
    const R = m(b);
    R === null ? p(a, c) : R && R.isColor && (p(R, 1), (v = !0));
    const E = i.xr.getEnvironmentBlendMode();
    (E === "additive"
      ? n.buffers.color.setClear(0, 0, 0, 1, o)
      : E === "alpha-blend" && n.buffers.color.setClear(0, 0, 0, 0, o),
      (i.autoClear || v) &&
        (n.buffers.depth.setTest(!0),
        n.buffers.depth.setMask(!0),
        n.buffers.color.setMask(!0),
        i.clear(i.autoClearColor, i.autoClearDepth, i.autoClearStencil)));
  }
  function g(b, v) {
    const R = m(v);
    R && (R.isCubeTexture || R.mapping === kr)
      ? (h === void 0 &&
          ((h = new he(
            new le(1, 1, 1),
            new Vn({
              name: "BackgroundCubeMaterial",
              uniforms: is(bn.backgroundCube.uniforms),
              vertexShader: bn.backgroundCube.vertexShader,
              fragmentShader: bn.backgroundCube.fragmentShader,
              side: $e,
              depthTest: !1,
              depthWrite: !1,
              fog: !1,
              allowOverride: !1,
            }),
          )),
          h.geometry.deleteAttribute("normal"),
          h.geometry.deleteAttribute("uv"),
          (h.onBeforeRender = function (E, C, L) {
            this.matrixWorld.copyPosition(L.matrixWorld);
          }),
          Object.defineProperty(h.material, "envMap", {
            get: function () {
              return this.uniforms.envMap.value;
            },
          }),
          s.update(h)),
        fi.copy(v.backgroundRotation),
        (fi.x *= -1),
        (fi.y *= -1),
        (fi.z *= -1),
        R.isCubeTexture &&
          R.isRenderTargetTexture === !1 &&
          ((fi.y *= -1), (fi.z *= -1)),
        (h.material.uniforms.envMap.value = R),
        (h.material.uniforms.flipEnvMap.value =
          R.isCubeTexture && R.isRenderTargetTexture === !1 ? -1 : 1),
        (h.material.uniforms.backgroundBlurriness.value =
          v.backgroundBlurriness),
        (h.material.uniforms.backgroundIntensity.value = v.backgroundIntensity),
        h.material.uniforms.backgroundRotation.value.setFromMatrix4(
          Um.makeRotationFromEuler(fi),
        ),
        (h.material.toneMapped = ee.getTransfer(R.colorSpace) !== ce),
        (u !== R || d !== R.version || f !== i.toneMapping) &&
          ((h.material.needsUpdate = !0),
          (u = R),
          (d = R.version),
          (f = i.toneMapping)),
        h.layers.enableAll(),
        b.unshift(h, h.geometry, h.material, 0, 0, null))
      : R &&
        R.isTexture &&
        (l === void 0 &&
          ((l = new he(
            new Ai(2, 2),
            new Vn({
              name: "BackgroundMaterial",
              uniforms: is(bn.background.uniforms),
              vertexShader: bn.background.vertexShader,
              fragmentShader: bn.background.fragmentShader,
              side: ii,
              depthTest: !1,
              depthWrite: !1,
              fog: !1,
              allowOverride: !1,
            }),
          )),
          l.geometry.deleteAttribute("normal"),
          Object.defineProperty(l.material, "map", {
            get: function () {
              return this.uniforms.t2D.value;
            },
          }),
          s.update(l)),
        (l.material.uniforms.t2D.value = R),
        (l.material.uniforms.backgroundIntensity.value = v.backgroundIntensity),
        (l.material.toneMapped = ee.getTransfer(R.colorSpace) !== ce),
        R.matrixAutoUpdate === !0 && R.updateMatrix(),
        l.material.uniforms.uvTransform.value.copy(R.matrix),
        (u !== R || d !== R.version || f !== i.toneMapping) &&
          ((l.material.needsUpdate = !0),
          (u = R),
          (d = R.version),
          (f = i.toneMapping)),
        l.layers.enableAll(),
        b.unshift(l, l.geometry, l.material, 0, 0, null));
  }
  function p(b, v) {
    (b.getRGB(lr, th(i)), n.buffers.color.setClear(lr.r, lr.g, lr.b, v, o));
  }
  function A() {
    (h !== void 0 && (h.geometry.dispose(), h.material.dispose(), (h = void 0)),
      l !== void 0 &&
        (l.geometry.dispose(), l.material.dispose(), (l = void 0)));
  }
  return {
    getClearColor: function () {
      return a;
    },
    setClearColor: function (b, v = 1) {
      (a.set(b), (c = v), p(a, c));
    },
    getClearAlpha: function () {
      return c;
    },
    setClearAlpha: function (b) {
      ((c = b), p(a, c));
    },
    render: _,
    addToRenderList: g,
    dispose: A,
  };
}
function Fm(i, t) {
  const e = i.getParameter(i.MAX_VERTEX_ATTRIBS),
    n = {},
    s = d(null);
  let r = s,
    o = !1;
  function a(M, w, I, F, B) {
    let k = !1;
    const G = u(F, I, w);
    (r !== G && ((r = G), l(r.object)),
      (k = f(M, F, I, B)),
      k && m(M, F, I, B),
      B !== null && t.update(B, i.ELEMENT_ARRAY_BUFFER),
      (k || o) &&
        ((o = !1),
        v(M, w, I, F),
        B !== null && i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, t.get(B).buffer)));
  }
  function c() {
    return i.createVertexArray();
  }
  function l(M) {
    return i.bindVertexArray(M);
  }
  function h(M) {
    return i.deleteVertexArray(M);
  }
  function u(M, w, I) {
    const F = I.wireframe === !0;
    let B = n[M.id];
    B === void 0 && ((B = {}), (n[M.id] = B));
    let k = B[w.id];
    k === void 0 && ((k = {}), (B[w.id] = k));
    let G = k[F];
    return (G === void 0 && ((G = d(c())), (k[F] = G)), G);
  }
  function d(M) {
    const w = [],
      I = [],
      F = [];
    for (let B = 0; B < e; B++) ((w[B] = 0), (I[B] = 0), (F[B] = 0));
    return {
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: w,
      enabledAttributes: I,
      attributeDivisors: F,
      object: M,
      attributes: {},
      index: null,
    };
  }
  function f(M, w, I, F) {
    const B = r.attributes,
      k = w.attributes;
    let G = 0;
    const Y = I.getAttributes();
    for (const H in Y)
      if (Y[H].location >= 0) {
        const pt = B[H];
        let gt = k[H];
        if (
          (gt === void 0 &&
            (H === "instanceMatrix" &&
              M.instanceMatrix &&
              (gt = M.instanceMatrix),
            H === "instanceColor" && M.instanceColor && (gt = M.instanceColor)),
          pt === void 0 || pt.attribute !== gt || (gt && pt.data !== gt.data))
        )
          return !0;
        G++;
      }
    return r.attributesNum !== G || r.index !== F;
  }
  function m(M, w, I, F) {
    const B = {},
      k = w.attributes;
    let G = 0;
    const Y = I.getAttributes();
    for (const H in Y)
      if (Y[H].location >= 0) {
        let pt = k[H];
        pt === void 0 &&
          (H === "instanceMatrix" &&
            M.instanceMatrix &&
            (pt = M.instanceMatrix),
          H === "instanceColor" && M.instanceColor && (pt = M.instanceColor));
        const gt = {};
        ((gt.attribute = pt),
          pt && pt.data && (gt.data = pt.data),
          (B[H] = gt),
          G++);
      }
    ((r.attributes = B), (r.attributesNum = G), (r.index = F));
  }
  function _() {
    const M = r.newAttributes;
    for (let w = 0, I = M.length; w < I; w++) M[w] = 0;
  }
  function g(M) {
    p(M, 0);
  }
  function p(M, w) {
    const I = r.newAttributes,
      F = r.enabledAttributes,
      B = r.attributeDivisors;
    ((I[M] = 1),
      F[M] === 0 && (i.enableVertexAttribArray(M), (F[M] = 1)),
      B[M] !== w && (i.vertexAttribDivisor(M, w), (B[M] = w)));
  }
  function A() {
    const M = r.newAttributes,
      w = r.enabledAttributes;
    for (let I = 0, F = w.length; I < F; I++)
      w[I] !== M[I] && (i.disableVertexAttribArray(I), (w[I] = 0));
  }
  function b(M, w, I, F, B, k, G) {
    G === !0
      ? i.vertexAttribIPointer(M, w, I, B, k)
      : i.vertexAttribPointer(M, w, I, F, B, k);
  }
  function v(M, w, I, F) {
    _();
    const B = F.attributes,
      k = I.getAttributes(),
      G = w.defaultAttributeValues;
    for (const Y in k) {
      const H = k[Y];
      if (H.location >= 0) {
        let ct = B[Y];
        if (
          (ct === void 0 &&
            (Y === "instanceMatrix" &&
              M.instanceMatrix &&
              (ct = M.instanceMatrix),
            Y === "instanceColor" && M.instanceColor && (ct = M.instanceColor)),
          ct !== void 0)
        ) {
          const pt = ct.normalized,
            gt = ct.itemSize,
            Lt = t.get(ct);
          if (Lt === void 0) continue;
          const $t = Lt.buffer,
            re = Lt.type,
            Jt = Lt.bytesPerElement,
            Z = re === i.INT || re === i.UNSIGNED_INT || ct.gpuType === Na;
          if (ct.isInterleavedBufferAttribute) {
            const nt = ct.data,
              St = nt.stride,
              Dt = ct.offset;
            if (nt.isInstancedInterleavedBuffer) {
              for (let wt = 0; wt < H.locationSize; wt++)
                p(H.location + wt, nt.meshPerAttribute);
              M.isInstancedMesh !== !0 &&
                F._maxInstanceCount === void 0 &&
                (F._maxInstanceCount = nt.meshPerAttribute * nt.count);
            } else
              for (let wt = 0; wt < H.locationSize; wt++) g(H.location + wt);
            i.bindBuffer(i.ARRAY_BUFFER, $t);
            for (let wt = 0; wt < H.locationSize; wt++)
              b(
                H.location + wt,
                gt / H.locationSize,
                re,
                pt,
                St * Jt,
                (Dt + (gt / H.locationSize) * wt) * Jt,
                Z,
              );
          } else {
            if (ct.isInstancedBufferAttribute) {
              for (let nt = 0; nt < H.locationSize; nt++)
                p(H.location + nt, ct.meshPerAttribute);
              M.isInstancedMesh !== !0 &&
                F._maxInstanceCount === void 0 &&
                (F._maxInstanceCount = ct.meshPerAttribute * ct.count);
            } else
              for (let nt = 0; nt < H.locationSize; nt++) g(H.location + nt);
            i.bindBuffer(i.ARRAY_BUFFER, $t);
            for (let nt = 0; nt < H.locationSize; nt++)
              b(
                H.location + nt,
                gt / H.locationSize,
                re,
                pt,
                gt * Jt,
                (gt / H.locationSize) * nt * Jt,
                Z,
              );
          }
        } else if (G !== void 0) {
          const pt = G[Y];
          if (pt !== void 0)
            switch (pt.length) {
              case 2:
                i.vertexAttrib2fv(H.location, pt);
                break;
              case 3:
                i.vertexAttrib3fv(H.location, pt);
                break;
              case 4:
                i.vertexAttrib4fv(H.location, pt);
                break;
              default:
                i.vertexAttrib1fv(H.location, pt);
            }
        }
      }
    }
    A();
  }
  function R() {
    L();
    for (const M in n) {
      const w = n[M];
      for (const I in w) {
        const F = w[I];
        for (const B in F) (h(F[B].object), delete F[B]);
        delete w[I];
      }
      delete n[M];
    }
  }
  function E(M) {
    if (n[M.id] === void 0) return;
    const w = n[M.id];
    for (const I in w) {
      const F = w[I];
      for (const B in F) (h(F[B].object), delete F[B]);
      delete w[I];
    }
    delete n[M.id];
  }
  function C(M) {
    for (const w in n) {
      const I = n[w];
      if (I[M.id] === void 0) continue;
      const F = I[M.id];
      for (const B in F) (h(F[B].object), delete F[B]);
      delete I[M.id];
    }
  }
  function L() {
    (y(), (o = !0), r !== s && ((r = s), l(r.object)));
  }
  function y() {
    ((s.geometry = null), (s.program = null), (s.wireframe = !1));
  }
  return {
    setup: a,
    reset: L,
    resetDefaultState: y,
    dispose: R,
    releaseStatesOfGeometry: E,
    releaseStatesOfProgram: C,
    initAttributes: _,
    enableAttribute: g,
    disableUnusedAttributes: A,
  };
}
function Om(i, t, e) {
  let n;
  function s(l) {
    n = l;
  }
  function r(l, h) {
    (i.drawArrays(n, l, h), e.update(h, n, 1));
  }
  function o(l, h, u) {
    u !== 0 && (i.drawArraysInstanced(n, l, h, u), e.update(h, n, u));
  }
  function a(l, h, u) {
    if (u === 0) return;
    t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n, l, 0, h, 0, u);
    let f = 0;
    for (let m = 0; m < u; m++) f += h[m];
    e.update(f, n, 1);
  }
  function c(l, h, u, d) {
    if (u === 0) return;
    const f = t.get("WEBGL_multi_draw");
    if (f === null) for (let m = 0; m < l.length; m++) o(l[m], h[m], d[m]);
    else {
      f.multiDrawArraysInstancedWEBGL(n, l, 0, h, 0, d, 0, u);
      let m = 0;
      for (let _ = 0; _ < u; _++) m += h[_] * d[_];
      e.update(m, n, 1);
    }
  }
  ((this.setMode = s),
    (this.render = r),
    (this.renderInstances = o),
    (this.renderMultiDraw = a),
    (this.renderMultiDrawInstances = c));
}
function zm(i, t, e, n) {
  let s;
  function r() {
    if (s !== void 0) return s;
    if (t.has("EXT_texture_filter_anisotropic") === !0) {
      const C = t.get("EXT_texture_filter_anisotropic");
      s = i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else s = 0;
    return s;
  }
  function o(C) {
    return !(
      C !== xn &&
      n.convert(C) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT)
    );
  }
  function a(C) {
    const L =
      C === Fs &&
      (t.has("EXT_color_buffer_half_float") || t.has("EXT_color_buffer_float"));
    return !(
      C !== Tn &&
      n.convert(C) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE) &&
      C !== En &&
      !L
    );
  }
  function c(C) {
    if (C === "highp") {
      if (
        i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.HIGH_FLOAT).precision >
          0 &&
        i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.HIGH_FLOAT).precision >
          0
      )
        return "highp";
      C = "mediump";
    }
    return C === "mediump" &&
      i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.MEDIUM_FLOAT).precision >
        0 &&
      i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.MEDIUM_FLOAT).precision >
        0
      ? "mediump"
      : "lowp";
  }
  let l = e.precision !== void 0 ? e.precision : "highp";
  const h = c(l);
  h !== l &&
    (console.warn(
      "THREE.WebGLRenderer:",
      l,
      "not supported, using",
      h,
      "instead.",
    ),
    (l = h));
  const u = e.logarithmicDepthBuffer === !0,
    d = e.reversedDepthBuffer === !0 && t.has("EXT_clip_control"),
    f = i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),
    m = i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
    _ = i.getParameter(i.MAX_TEXTURE_SIZE),
    g = i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),
    p = i.getParameter(i.MAX_VERTEX_ATTRIBS),
    A = i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),
    b = i.getParameter(i.MAX_VARYING_VECTORS),
    v = i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),
    R = m > 0,
    E = i.getParameter(i.MAX_SAMPLES);
  return {
    isWebGL2: !0,
    getMaxAnisotropy: r,
    getMaxPrecision: c,
    textureFormatReadable: o,
    textureTypeReadable: a,
    precision: l,
    logarithmicDepthBuffer: u,
    reversedDepthBuffer: d,
    maxTextures: f,
    maxVertexTextures: m,
    maxTextureSize: _,
    maxCubemapSize: g,
    maxAttributes: p,
    maxVertexUniforms: A,
    maxVaryings: b,
    maxFragmentUniforms: v,
    vertexTextures: R,
    maxSamples: E,
  };
}
function km(i) {
  const t = this;
  let e = null,
    n = 0,
    s = !1,
    r = !1;
  const o = new Fn(),
    a = new Vt(),
    c = { value: null, needsUpdate: !1 };
  ((this.uniform = c),
    (this.numPlanes = 0),
    (this.numIntersection = 0),
    (this.init = function (u, d) {
      const f = u.length !== 0 || d || n !== 0 || s;
      return ((s = d), (n = u.length), f);
    }),
    (this.beginShadows = function () {
      ((r = !0), h(null));
    }),
    (this.endShadows = function () {
      r = !1;
    }),
    (this.setGlobalState = function (u, d) {
      e = h(u, d, 0);
    }),
    (this.setState = function (u, d, f) {
      const m = u.clippingPlanes,
        _ = u.clipIntersection,
        g = u.clipShadows,
        p = i.get(u);
      if (!s || m === null || m.length === 0 || (r && !g)) r ? h(null) : l();
      else {
        const A = r ? 0 : n,
          b = A * 4;
        let v = p.clippingState || null;
        ((c.value = v), (v = h(m, d, b, f)));
        for (let R = 0; R !== b; ++R) v[R] = e[R];
        ((p.clippingState = v),
          (this.numIntersection = _ ? this.numPlanes : 0),
          (this.numPlanes += A));
      }
    }));
  function l() {
    (c.value !== e && ((c.value = e), (c.needsUpdate = n > 0)),
      (t.numPlanes = n),
      (t.numIntersection = 0));
  }
  function h(u, d, f, m) {
    const _ = u !== null ? u.length : 0;
    let g = null;
    if (_ !== 0) {
      if (((g = c.value), m !== !0 || g === null)) {
        const p = f + _ * 4,
          A = d.matrixWorldInverse;
        (a.getNormalMatrix(A),
          (g === null || g.length < p) && (g = new Float32Array(p)));
        for (let b = 0, v = f; b !== _; ++b, v += 4)
          (o.copy(u[b]).applyMatrix4(A, a),
            o.normal.toArray(g, v),
            (g[v + 3] = o.constant));
      }
      ((c.value = g), (c.needsUpdate = !0));
    }
    return ((t.numPlanes = _), (t.numIntersection = 0), g);
  }
}
function Bm(i) {
  let t = new WeakMap();
  function e(o, a) {
    return (a === Go ? (o.mapping = ts) : a === Vo && (o.mapping = es), o);
  }
  function n(o) {
    if (o && o.isTexture) {
      const a = o.mapping;
      if (a === Go || a === Vo)
        if (t.has(o)) {
          const c = t.get(o).texture;
          return e(c, o.mapping);
        } else {
          const c = o.image;
          if (c && c.height > 0) {
            const l = new rd(c.height);
            return (
              l.fromEquirectangularTexture(i, o),
              t.set(o, l),
              o.addEventListener("dispose", s),
              e(l.texture, o.mapping)
            );
          } else return null;
        }
    }
    return o;
  }
  function s(o) {
    const a = o.target;
    a.removeEventListener("dispose", s);
    const c = t.get(a);
    c !== void 0 && (t.delete(a), c.dispose());
  }
  function r() {
    t = new WeakMap();
  }
  return { get: n, dispose: r };
}
const Ki = 4,
  el = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582],
  _i = 20,
  So = new Ja(),
  nl = new Ht();
let bo = null,
  Eo = 0,
  wo = 0,
  To = !1;
const mi = (1 + Math.sqrt(5)) / 2,
  Xi = 1 / mi,
  il = [
    new P(-mi, Xi, 0),
    new P(mi, Xi, 0),
    new P(-Xi, 0, mi),
    new P(Xi, 0, mi),
    new P(0, mi, -Xi),
    new P(0, mi, Xi),
    new P(-1, 1, -1),
    new P(1, 1, -1),
    new P(-1, 1, 1),
    new P(1, 1, 1),
  ],
  Hm = new P();
class sl {
  constructor(t) {
    ((this._renderer = t),
      (this._pingPongRenderTarget = null),
      (this._lodMax = 0),
      (this._cubeSize = 0),
      (this._lodPlanes = []),
      (this._sizeLods = []),
      (this._sigmas = []),
      (this._blurMaterial = null),
      (this._cubemapMaterial = null),
      (this._equirectMaterial = null),
      this._compileMaterial(this._blurMaterial));
  }
  fromScene(t, e = 0, n = 0.1, s = 100, r = {}) {
    const { size: o = 256, position: a = Hm } = r;
    ((bo = this._renderer.getRenderTarget()),
      (Eo = this._renderer.getActiveCubeFace()),
      (wo = this._renderer.getActiveMipmapLevel()),
      (To = this._renderer.xr.enabled),
      (this._renderer.xr.enabled = !1),
      this._setSize(o));
    const c = this._allocateTargets();
    return (
      (c.depthBuffer = !0),
      this._sceneToCubeUV(t, n, s, c, a),
      e > 0 && this._blur(c, 0, 0, e),
      this._applyPMREM(c),
      this._cleanup(c),
      c
    );
  }
  fromEquirectangular(t, e = null) {
    return this._fromTexture(t, e);
  }
  fromCubemap(t, e = null) {
    return this._fromTexture(t, e);
  }
  compileCubemapShader() {
    this._cubemapMaterial === null &&
      ((this._cubemapMaterial = al()),
      this._compileMaterial(this._cubemapMaterial));
  }
  compileEquirectangularShader() {
    this._equirectMaterial === null &&
      ((this._equirectMaterial = ol()),
      this._compileMaterial(this._equirectMaterial));
  }
  dispose() {
    (this._dispose(),
      this._cubemapMaterial !== null && this._cubemapMaterial.dispose(),
      this._equirectMaterial !== null && this._equirectMaterial.dispose());
  }
  _setSize(t) {
    ((this._lodMax = Math.floor(Math.log2(t))),
      (this._cubeSize = Math.pow(2, this._lodMax)));
  }
  _dispose() {
    (this._blurMaterial !== null && this._blurMaterial.dispose(),
      this._pingPongRenderTarget !== null &&
        this._pingPongRenderTarget.dispose());
    for (let t = 0; t < this._lodPlanes.length; t++)
      this._lodPlanes[t].dispose();
  }
  _cleanup(t) {
    (this._renderer.setRenderTarget(bo, Eo, wo),
      (this._renderer.xr.enabled = To),
      (t.scissorTest = !1),
      hr(t, 0, 0, t.width, t.height));
  }
  _fromTexture(t, e) {
    (t.mapping === ts || t.mapping === es
      ? this._setSize(
          t.image.length === 0
            ? 16
            : t.image[0].width || t.image[0].image.width,
        )
      : this._setSize(t.image.width / 4),
      (bo = this._renderer.getRenderTarget()),
      (Eo = this._renderer.getActiveCubeFace()),
      (wo = this._renderer.getActiveMipmapLevel()),
      (To = this._renderer.xr.enabled),
      (this._renderer.xr.enabled = !1));
    const n = e || this._allocateTargets();
    return (
      this._textureToCubeUV(t, n),
      this._applyPMREM(n),
      this._cleanup(n),
      n
    );
  }
  _allocateTargets() {
    const t = 3 * Math.max(this._cubeSize, 112),
      e = 4 * this._cubeSize,
      n = {
        magFilter: Ze,
        minFilter: Ze,
        generateMipmaps: !1,
        type: Fs,
        format: xn,
        colorSpace: ns,
        depthBuffer: !1,
      },
      s = rl(t, e, n);
    if (
      this._pingPongRenderTarget === null ||
      this._pingPongRenderTarget.width !== t ||
      this._pingPongRenderTarget.height !== e
    ) {
      (this._pingPongRenderTarget !== null && this._dispose(),
        (this._pingPongRenderTarget = rl(t, e, n)));
      const { _lodMax: r } = this;
      (({
        sizeLods: this._sizeLods,
        lodPlanes: this._lodPlanes,
        sigmas: this._sigmas,
      } = Gm(r)),
        (this._blurMaterial = Vm(r, t, e)));
    }
    return s;
  }
  _compileMaterial(t) {
    const e = new he(this._lodPlanes[0], t);
    this._renderer.compile(e, So);
  }
  _sceneToCubeUV(t, e, n, s, r) {
    const c = new un(90, 1, e, n),
      l = [1, -1, 1, 1, 1, 1],
      h = [1, 1, 1, -1, -1, -1],
      u = this._renderer,
      d = u.autoClear,
      f = u.toneMapping;
    (u.getClearColor(nl),
      (u.toneMapping = kn),
      (u.autoClear = !1),
      u.state.buffers.depth.getReversed() &&
        (u.setRenderTarget(s), u.clearDepth(), u.setRenderTarget(null)));
    const _ = new yi({
        name: "PMREM.Background",
        side: $e,
        depthWrite: !1,
        depthTest: !1,
      }),
      g = new he(new le(), _);
    let p = !1;
    const A = t.background;
    A
      ? A.isColor && (_.color.copy(A), (t.background = null), (p = !0))
      : (_.color.copy(nl), (p = !0));
    for (let b = 0; b < 6; b++) {
      const v = b % 3;
      v === 0
        ? (c.up.set(0, l[b], 0),
          c.position.set(r.x, r.y, r.z),
          c.lookAt(r.x + h[b], r.y, r.z))
        : v === 1
          ? (c.up.set(0, 0, l[b]),
            c.position.set(r.x, r.y, r.z),
            c.lookAt(r.x, r.y + h[b], r.z))
          : (c.up.set(0, l[b], 0),
            c.position.set(r.x, r.y, r.z),
            c.lookAt(r.x, r.y, r.z + h[b]));
      const R = this._cubeSize;
      (hr(s, v * R, b > 2 ? R : 0, R, R),
        u.setRenderTarget(s),
        p && u.render(g, c),
        u.render(t, c));
    }
    (g.geometry.dispose(),
      g.material.dispose(),
      (u.toneMapping = f),
      (u.autoClear = d),
      (t.background = A));
  }
  _textureToCubeUV(t, e) {
    const n = this._renderer,
      s = t.mapping === ts || t.mapping === es;
    s
      ? (this._cubemapMaterial === null && (this._cubemapMaterial = al()),
        (this._cubemapMaterial.uniforms.flipEnvMap.value =
          t.isRenderTargetTexture === !1 ? -1 : 1))
      : this._equirectMaterial === null && (this._equirectMaterial = ol());
    const r = s ? this._cubemapMaterial : this._equirectMaterial,
      o = new he(this._lodPlanes[0], r),
      a = r.uniforms;
    a.envMap.value = t;
    const c = this._cubeSize;
    (hr(e, 0, 0, 3 * c, 2 * c), n.setRenderTarget(e), n.render(o, So));
  }
  _applyPMREM(t) {
    const e = this._renderer,
      n = e.autoClear;
    e.autoClear = !1;
    const s = this._lodPlanes.length;
    for (let r = 1; r < s; r++) {
      const o = Math.sqrt(
          this._sigmas[r] * this._sigmas[r] -
            this._sigmas[r - 1] * this._sigmas[r - 1],
        ),
        a = il[(s - r - 1) % il.length];
      this._blur(t, r - 1, r, o, a);
    }
    e.autoClear = n;
  }
  _blur(t, e, n, s, r) {
    const o = this._pingPongRenderTarget;
    (this._halfBlur(t, o, e, n, s, "latitudinal", r),
      this._halfBlur(o, t, n, n, s, "longitudinal", r));
  }
  _halfBlur(t, e, n, s, r, o, a) {
    const c = this._renderer,
      l = this._blurMaterial;
    o !== "latitudinal" &&
      o !== "longitudinal" &&
      console.error(
        "blur direction must be either latitudinal or longitudinal!",
      );
    const h = 3,
      u = new he(this._lodPlanes[s], l),
      d = l.uniforms,
      f = this._sizeLods[n] - 1,
      m = isFinite(r) ? Math.PI / (2 * f) : (2 * Math.PI) / (2 * _i - 1),
      _ = r / m,
      g = isFinite(r) ? 1 + Math.floor(h * _) : _i;
    g > _i &&
      console.warn(
        `sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${_i}`,
      );
    const p = [];
    let A = 0;
    for (let C = 0; C < _i; ++C) {
      const L = C / _,
        y = Math.exp((-L * L) / 2);
      (p.push(y), C === 0 ? (A += y) : C < g && (A += 2 * y));
    }
    for (let C = 0; C < p.length; C++) p[C] = p[C] / A;
    ((d.envMap.value = t.texture),
      (d.samples.value = g),
      (d.weights.value = p),
      (d.latitudinal.value = o === "latitudinal"),
      a && (d.poleAxis.value = a));
    const { _lodMax: b } = this;
    ((d.dTheta.value = m), (d.mipInt.value = b - n));
    const v = this._sizeLods[s],
      R = 3 * v * (s > b - Ki ? s - b + Ki : 0),
      E = 4 * (this._cubeSize - v);
    (hr(e, R, E, 3 * v, 2 * v), c.setRenderTarget(e), c.render(u, So));
  }
}
function Gm(i) {
  const t = [],
    e = [],
    n = [];
  let s = i;
  const r = i - Ki + 1 + el.length;
  for (let o = 0; o < r; o++) {
    const a = Math.pow(2, s);
    e.push(a);
    let c = 1 / a;
    (o > i - Ki ? (c = el[o - i + Ki - 1]) : o === 0 && (c = 0), n.push(c));
    const l = 1 / (a - 2),
      h = -l,
      u = 1 + l,
      d = [h, h, u, h, u, u, h, h, u, u, h, u],
      f = 6,
      m = 6,
      _ = 3,
      g = 2,
      p = 1,
      A = new Float32Array(_ * m * f),
      b = new Float32Array(g * m * f),
      v = new Float32Array(p * m * f);
    for (let E = 0; E < f; E++) {
      const C = ((E % 3) * 2) / 3 - 1,
        L = E > 2 ? 0 : -1,
        y = [
          C,
          L,
          0,
          C + 2 / 3,
          L,
          0,
          C + 2 / 3,
          L + 1,
          0,
          C,
          L,
          0,
          C + 2 / 3,
          L + 1,
          0,
          C,
          L + 1,
          0,
        ];
      (A.set(y, _ * m * E), b.set(d, g * m * E));
      const M = [E, E, E, E, E, E];
      v.set(M, p * m * E);
    }
    const R = new ve();
    (R.setAttribute("position", new pe(A, _)),
      R.setAttribute("uv", new pe(b, g)),
      R.setAttribute("faceIndex", new pe(v, p)),
      t.push(R),
      s > Ki && s--);
  }
  return { lodPlanes: t, sizeLods: e, sigmas: n };
}
function rl(i, t, e) {
  const n = new Gn(i, t, e);
  return (
    (n.texture.mapping = kr),
    (n.texture.name = "PMREM.cubeUv"),
    (n.scissorTest = !0),
    n
  );
}
function hr(i, t, e, n, s) {
  (i.viewport.set(t, e, n, s), i.scissor.set(t, e, n, s));
}
function Vm(i, t, e) {
  const n = new Float32Array(_i),
    s = new P(0, 1, 0);
  return new Vn({
    name: "SphericalGaussianBlur",
    defines: {
      n: _i,
      CUBEUV_TEXEL_WIDTH: 1 / t,
      CUBEUV_TEXEL_HEIGHT: 1 / e,
      CUBEUV_MAX_MIP: `${i}.0`,
    },
    uniforms: {
      envMap: { value: null },
      samples: { value: 1 },
      weights: { value: n },
      latitudinal: { value: !1 },
      dTheta: { value: 0 },
      mipInt: { value: 0 },
      poleAxis: { value: s },
    },
    vertexShader: Qa(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,
    blending: ti,
    depthTest: !1,
    depthWrite: !1,
  });
}
function ol() {
  return new Vn({
    name: "EquirectangularToCubeUV",
    uniforms: { envMap: { value: null } },
    vertexShader: Qa(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,
    blending: ti,
    depthTest: !1,
    depthWrite: !1,
  });
}
function al() {
  return new Vn({
    name: "CubemapToCubeUV",
    uniforms: { envMap: { value: null }, flipEnvMap: { value: -1 } },
    vertexShader: Qa(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,
    blending: ti,
    depthTest: !1,
    depthWrite: !1,
  });
}
function Qa() {
  return `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`;
}
function Wm(i) {
  let t = new WeakMap(),
    e = null;
  function n(a) {
    if (a && a.isTexture) {
      const c = a.mapping,
        l = c === Go || c === Vo,
        h = c === ts || c === es;
      if (l || h) {
        let u = t.get(a);
        const d = u !== void 0 ? u.texture.pmremVersion : 0;
        if (a.isRenderTargetTexture && a.pmremVersion !== d)
          return (
            e === null && (e = new sl(i)),
            (u = l ? e.fromEquirectangular(a, u) : e.fromCubemap(a, u)),
            (u.texture.pmremVersion = a.pmremVersion),
            t.set(a, u),
            u.texture
          );
        if (u !== void 0) return u.texture;
        {
          const f = a.image;
          return (l && f && f.height > 0) || (h && f && s(f))
            ? (e === null && (e = new sl(i)),
              (u = l ? e.fromEquirectangular(a) : e.fromCubemap(a)),
              (u.texture.pmremVersion = a.pmremVersion),
              t.set(a, u),
              a.addEventListener("dispose", r),
              u.texture)
            : null;
        }
      }
    }
    return a;
  }
  function s(a) {
    let c = 0;
    const l = 6;
    for (let h = 0; h < l; h++) a[h] !== void 0 && c++;
    return c === l;
  }
  function r(a) {
    const c = a.target;
    c.removeEventListener("dispose", r);
    const l = t.get(c);
    l !== void 0 && (t.delete(c), l.dispose());
  }
  function o() {
    ((t = new WeakMap()), e !== null && (e.dispose(), (e = null)));
  }
  return { get: n, dispose: o };
}
function Xm(i) {
  const t = {};
  function e(n) {
    if (t[n] !== void 0) return t[n];
    let s;
    switch (n) {
      case "WEBGL_depth_texture":
        s =
          i.getExtension("WEBGL_depth_texture") ||
          i.getExtension("MOZ_WEBGL_depth_texture") ||
          i.getExtension("WEBKIT_WEBGL_depth_texture");
        break;
      case "EXT_texture_filter_anisotropic":
        s =
          i.getExtension("EXT_texture_filter_anisotropic") ||
          i.getExtension("MOZ_EXT_texture_filter_anisotropic") ||
          i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
        break;
      case "WEBGL_compressed_texture_s3tc":
        s =
          i.getExtension("WEBGL_compressed_texture_s3tc") ||
          i.getExtension("MOZ_WEBGL_compressed_texture_s3tc") ||
          i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
        break;
      case "WEBGL_compressed_texture_pvrtc":
        s =
          i.getExtension("WEBGL_compressed_texture_pvrtc") ||
          i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
        break;
      default:
        s = i.getExtension(n);
    }
    return ((t[n] = s), s);
  }
  return {
    has: function (n) {
      return e(n) !== null;
    },
    init: function () {
      (e("EXT_color_buffer_float"),
        e("WEBGL_clip_cull_distance"),
        e("OES_texture_float_linear"),
        e("EXT_color_buffer_half_float"),
        e("WEBGL_multisampled_render_to_texture"),
        e("WEBGL_render_shared_exponent"));
    },
    get: function (n) {
      const s = e(n);
      return (
        s === null &&
          Cs("THREE.WebGLRenderer: " + n + " extension not supported."),
        s
      );
    },
  };
}
function qm(i, t, e, n) {
  const s = {},
    r = new WeakMap();
  function o(u) {
    const d = u.target;
    d.index !== null && t.remove(d.index);
    for (const m in d.attributes) t.remove(d.attributes[m]);
    (d.removeEventListener("dispose", o), delete s[d.id]);
    const f = r.get(d);
    (f && (t.remove(f), r.delete(d)),
      n.releaseStatesOfGeometry(d),
      d.isInstancedBufferGeometry === !0 && delete d._maxInstanceCount,
      e.memory.geometries--);
  }
  function a(u, d) {
    return (
      s[d.id] === !0 ||
        (d.addEventListener("dispose", o),
        (s[d.id] = !0),
        e.memory.geometries++),
      d
    );
  }
  function c(u) {
    const d = u.attributes;
    for (const f in d) t.update(d[f], i.ARRAY_BUFFER);
  }
  function l(u) {
    const d = [],
      f = u.index,
      m = u.attributes.position;
    let _ = 0;
    if (f !== null) {
      const A = f.array;
      _ = f.version;
      for (let b = 0, v = A.length; b < v; b += 3) {
        const R = A[b + 0],
          E = A[b + 1],
          C = A[b + 2];
        d.push(R, E, E, C, C, R);
      }
    } else if (m !== void 0) {
      const A = m.array;
      _ = m.version;
      for (let b = 0, v = A.length / 3 - 1; b < v; b += 3) {
        const R = b + 0,
          E = b + 1,
          C = b + 2;
        d.push(R, E, E, C, C, R);
      }
    } else return;
    const g = new (Zl(d) ? Ql : Jl)(d, 1);
    g.version = _;
    const p = r.get(u);
    (p && t.remove(p), r.set(u, g));
  }
  function h(u) {
    const d = r.get(u);
    if (d) {
      const f = u.index;
      f !== null && d.version < f.version && l(u);
    } else l(u);
    return r.get(u);
  }
  return { get: a, update: c, getWireframeAttribute: h };
}
function Ym(i, t, e) {
  let n;
  function s(d) {
    n = d;
  }
  let r, o;
  function a(d) {
    ((r = d.type), (o = d.bytesPerElement));
  }
  function c(d, f) {
    (i.drawElements(n, f, r, d * o), e.update(f, n, 1));
  }
  function l(d, f, m) {
    m !== 0 && (i.drawElementsInstanced(n, f, r, d * o, m), e.update(f, n, m));
  }
  function h(d, f, m) {
    if (m === 0) return;
    t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n, f, 0, r, d, 0, m);
    let g = 0;
    for (let p = 0; p < m; p++) g += f[p];
    e.update(g, n, 1);
  }
  function u(d, f, m, _) {
    if (m === 0) return;
    const g = t.get("WEBGL_multi_draw");
    if (g === null) for (let p = 0; p < d.length; p++) l(d[p] / o, f[p], _[p]);
    else {
      g.multiDrawElementsInstancedWEBGL(n, f, 0, r, d, 0, _, 0, m);
      let p = 0;
      for (let A = 0; A < m; A++) p += f[A] * _[A];
      e.update(p, n, 1);
    }
  }
  ((this.setMode = s),
    (this.setIndex = a),
    (this.render = c),
    (this.renderInstances = l),
    (this.renderMultiDraw = h),
    (this.renderMultiDrawInstances = u));
}
function Km(i) {
  const t = { geometries: 0, textures: 0 },
    e = { frame: 0, calls: 0, triangles: 0, points: 0, lines: 0 };
  function n(r, o, a) {
    switch ((e.calls++, o)) {
      case i.TRIANGLES:
        e.triangles += a * (r / 3);
        break;
      case i.LINES:
        e.lines += a * (r / 2);
        break;
      case i.LINE_STRIP:
        e.lines += a * (r - 1);
        break;
      case i.LINE_LOOP:
        e.lines += a * r;
        break;
      case i.POINTS:
        e.points += a * r;
        break;
      default:
        console.error("THREE.WebGLInfo: Unknown draw mode:", o);
        break;
    }
  }
  function s() {
    ((e.calls = 0), (e.triangles = 0), (e.points = 0), (e.lines = 0));
  }
  return {
    memory: t,
    render: e,
    programs: null,
    autoReset: !0,
    reset: s,
    update: n,
  };
}
function Zm(i, t, e) {
  const n = new WeakMap(),
    s = new Ee();
  function r(o, a, c) {
    const l = o.morphTargetInfluences,
      h =
        a.morphAttributes.position ||
        a.morphAttributes.normal ||
        a.morphAttributes.color,
      u = h !== void 0 ? h.length : 0;
    let d = n.get(a);
    if (d === void 0 || d.count !== u) {
      let M = function () {
        (L.dispose(), n.delete(a), a.removeEventListener("dispose", M));
      };
      var f = M;
      d !== void 0 && d.texture.dispose();
      const m = a.morphAttributes.position !== void 0,
        _ = a.morphAttributes.normal !== void 0,
        g = a.morphAttributes.color !== void 0,
        p = a.morphAttributes.position || [],
        A = a.morphAttributes.normal || [],
        b = a.morphAttributes.color || [];
      let v = 0;
      (m === !0 && (v = 1), _ === !0 && (v = 2), g === !0 && (v = 3));
      let R = a.attributes.position.count * v,
        E = 1;
      R > t.maxTextureSize &&
        ((E = Math.ceil(R / t.maxTextureSize)), (R = t.maxTextureSize));
      const C = new Float32Array(R * E * 4 * u),
        L = new jl(C, R, E, u);
      ((L.type = En), (L.needsUpdate = !0));
      const y = v * 4;
      for (let w = 0; w < u; w++) {
        const I = p[w],
          F = A[w],
          B = b[w],
          k = R * E * 4 * w;
        for (let G = 0; G < I.count; G++) {
          const Y = G * y;
          (m === !0 &&
            (s.fromBufferAttribute(I, G),
            (C[k + Y + 0] = s.x),
            (C[k + Y + 1] = s.y),
            (C[k + Y + 2] = s.z),
            (C[k + Y + 3] = 0)),
            _ === !0 &&
              (s.fromBufferAttribute(F, G),
              (C[k + Y + 4] = s.x),
              (C[k + Y + 5] = s.y),
              (C[k + Y + 6] = s.z),
              (C[k + Y + 7] = 0)),
            g === !0 &&
              (s.fromBufferAttribute(B, G),
              (C[k + Y + 8] = s.x),
              (C[k + Y + 9] = s.y),
              (C[k + Y + 10] = s.z),
              (C[k + Y + 11] = B.itemSize === 4 ? s.w : 1)));
        }
      }
      ((d = { count: u, texture: L, size: new at(R, E) }),
        n.set(a, d),
        a.addEventListener("dispose", M));
    }
    if (o.isInstancedMesh === !0 && o.morphTexture !== null)
      c.getUniforms().setValue(i, "morphTexture", o.morphTexture, e);
    else {
      let m = 0;
      for (let g = 0; g < l.length; g++) m += l[g];
      const _ = a.morphTargetsRelative ? 1 : 1 - m;
      (c.getUniforms().setValue(i, "morphTargetBaseInfluence", _),
        c.getUniforms().setValue(i, "morphTargetInfluences", l));
    }
    (c.getUniforms().setValue(i, "morphTargetsTexture", d.texture, e),
      c.getUniforms().setValue(i, "morphTargetsTextureSize", d.size));
  }
  return { update: r };
}
function jm(i, t, e, n) {
  let s = new WeakMap();
  function r(c) {
    const l = n.render.frame,
      h = c.geometry,
      u = t.get(c, h);
    if (
      (s.get(u) !== l && (t.update(u), s.set(u, l)),
      c.isInstancedMesh &&
        (c.hasEventListener("dispose", a) === !1 &&
          c.addEventListener("dispose", a),
        s.get(c) !== l &&
          (e.update(c.instanceMatrix, i.ARRAY_BUFFER),
          c.instanceColor !== null && e.update(c.instanceColor, i.ARRAY_BUFFER),
          s.set(c, l))),
      c.isSkinnedMesh)
    ) {
      const d = c.skeleton;
      s.get(d) !== l && (d.update(), s.set(d, l));
    }
    return u;
  }
  function o() {
    s = new WeakMap();
  }
  function a(c) {
    const l = c.target;
    (l.removeEventListener("dispose", a),
      e.remove(l.instanceMatrix),
      l.instanceColor !== null && e.remove(l.instanceColor));
  }
  return { update: r, dispose: o };
}
const yh = new We(),
  cl = new Ka(1, 1),
  Mh = new jl(),
  Sh = new Gu(),
  bh = new nh(),
  ll = [],
  hl = [],
  ul = new Float32Array(16),
  dl = new Float32Array(9),
  fl = new Float32Array(4);
function hs(i, t, e) {
  const n = i[0];
  if (n <= 0 || n > 0) return i;
  const s = t * e;
  let r = ll[s];
  if ((r === void 0 && ((r = new Float32Array(s)), (ll[s] = r)), t !== 0)) {
    n.toArray(r, 0);
    for (let o = 1, a = 0; o !== t; ++o) ((a += e), i[o].toArray(r, a));
  }
  return r;
}
function De(i, t) {
  if (i.length !== t.length) return !1;
  for (let e = 0, n = i.length; e < n; e++) if (i[e] !== t[e]) return !1;
  return !0;
}
function Le(i, t) {
  for (let e = 0, n = t.length; e < n; e++) i[e] = t[e];
}
function Gr(i, t) {
  let e = hl[t];
  e === void 0 && ((e = new Int32Array(t)), (hl[t] = e));
  for (let n = 0; n !== t; ++n) e[n] = i.allocateTextureUnit();
  return e;
}
function $m(i, t) {
  const e = this.cache;
  e[0] !== t && (i.uniform1f(this.addr, t), (e[0] = t));
}
function Jm(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y) &&
      (i.uniform2f(this.addr, t.x, t.y), (e[0] = t.x), (e[1] = t.y));
  else {
    if (De(e, t)) return;
    (i.uniform2fv(this.addr, t), Le(e, t));
  }
}
function Qm(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) &&
      (i.uniform3f(this.addr, t.x, t.y, t.z),
      (e[0] = t.x),
      (e[1] = t.y),
      (e[2] = t.z));
  else if (t.r !== void 0)
    (e[0] !== t.r || e[1] !== t.g || e[2] !== t.b) &&
      (i.uniform3f(this.addr, t.r, t.g, t.b),
      (e[0] = t.r),
      (e[1] = t.g),
      (e[2] = t.b));
  else {
    if (De(e, t)) return;
    (i.uniform3fv(this.addr, t), Le(e, t));
  }
}
function tg(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) &&
      (i.uniform4f(this.addr, t.x, t.y, t.z, t.w),
      (e[0] = t.x),
      (e[1] = t.y),
      (e[2] = t.z),
      (e[3] = t.w));
  else {
    if (De(e, t)) return;
    (i.uniform4fv(this.addr, t), Le(e, t));
  }
}
function eg(i, t) {
  const e = this.cache,
    n = t.elements;
  if (n === void 0) {
    if (De(e, t)) return;
    (i.uniformMatrix2fv(this.addr, !1, t), Le(e, t));
  } else {
    if (De(e, n)) return;
    (fl.set(n), i.uniformMatrix2fv(this.addr, !1, fl), Le(e, n));
  }
}
function ng(i, t) {
  const e = this.cache,
    n = t.elements;
  if (n === void 0) {
    if (De(e, t)) return;
    (i.uniformMatrix3fv(this.addr, !1, t), Le(e, t));
  } else {
    if (De(e, n)) return;
    (dl.set(n), i.uniformMatrix3fv(this.addr, !1, dl), Le(e, n));
  }
}
function ig(i, t) {
  const e = this.cache,
    n = t.elements;
  if (n === void 0) {
    if (De(e, t)) return;
    (i.uniformMatrix4fv(this.addr, !1, t), Le(e, t));
  } else {
    if (De(e, n)) return;
    (ul.set(n), i.uniformMatrix4fv(this.addr, !1, ul), Le(e, n));
  }
}
function sg(i, t) {
  const e = this.cache;
  e[0] !== t && (i.uniform1i(this.addr, t), (e[0] = t));
}
function rg(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y) &&
      (i.uniform2i(this.addr, t.x, t.y), (e[0] = t.x), (e[1] = t.y));
  else {
    if (De(e, t)) return;
    (i.uniform2iv(this.addr, t), Le(e, t));
  }
}
function og(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) &&
      (i.uniform3i(this.addr, t.x, t.y, t.z),
      (e[0] = t.x),
      (e[1] = t.y),
      (e[2] = t.z));
  else {
    if (De(e, t)) return;
    (i.uniform3iv(this.addr, t), Le(e, t));
  }
}
function ag(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) &&
      (i.uniform4i(this.addr, t.x, t.y, t.z, t.w),
      (e[0] = t.x),
      (e[1] = t.y),
      (e[2] = t.z),
      (e[3] = t.w));
  else {
    if (De(e, t)) return;
    (i.uniform4iv(this.addr, t), Le(e, t));
  }
}
function cg(i, t) {
  const e = this.cache;
  e[0] !== t && (i.uniform1ui(this.addr, t), (e[0] = t));
}
function lg(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y) &&
      (i.uniform2ui(this.addr, t.x, t.y), (e[0] = t.x), (e[1] = t.y));
  else {
    if (De(e, t)) return;
    (i.uniform2uiv(this.addr, t), Le(e, t));
  }
}
function hg(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) &&
      (i.uniform3ui(this.addr, t.x, t.y, t.z),
      (e[0] = t.x),
      (e[1] = t.y),
      (e[2] = t.z));
  else {
    if (De(e, t)) return;
    (i.uniform3uiv(this.addr, t), Le(e, t));
  }
}
function ug(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) &&
      (i.uniform4ui(this.addr, t.x, t.y, t.z, t.w),
      (e[0] = t.x),
      (e[1] = t.y),
      (e[2] = t.z),
      (e[3] = t.w));
  else {
    if (De(e, t)) return;
    (i.uniform4uiv(this.addr, t), Le(e, t));
  }
}
function dg(i, t, e) {
  const n = this.cache,
    s = e.allocateTextureUnit();
  n[0] !== s && (i.uniform1i(this.addr, s), (n[0] = s));
  let r;
  (this.type === i.SAMPLER_2D_SHADOW
    ? ((cl.compareFunction = Kl), (r = cl))
    : (r = yh),
    e.setTexture2D(t || r, s));
}
function fg(i, t, e) {
  const n = this.cache,
    s = e.allocateTextureUnit();
  (n[0] !== s && (i.uniform1i(this.addr, s), (n[0] = s)),
    e.setTexture3D(t || Sh, s));
}
function pg(i, t, e) {
  const n = this.cache,
    s = e.allocateTextureUnit();
  (n[0] !== s && (i.uniform1i(this.addr, s), (n[0] = s)),
    e.setTextureCube(t || bh, s));
}
function mg(i, t, e) {
  const n = this.cache,
    s = e.allocateTextureUnit();
  (n[0] !== s && (i.uniform1i(this.addr, s), (n[0] = s)),
    e.setTexture2DArray(t || Mh, s));
}
function gg(i) {
  switch (i) {
    case 5126:
      return $m;
    case 35664:
      return Jm;
    case 35665:
      return Qm;
    case 35666:
      return tg;
    case 35674:
      return eg;
    case 35675:
      return ng;
    case 35676:
      return ig;
    case 5124:
    case 35670:
      return sg;
    case 35667:
    case 35671:
      return rg;
    case 35668:
    case 35672:
      return og;
    case 35669:
    case 35673:
      return ag;
    case 5125:
      return cg;
    case 36294:
      return lg;
    case 36295:
      return hg;
    case 36296:
      return ug;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return dg;
    case 35679:
    case 36299:
    case 36307:
      return fg;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return pg;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return mg;
  }
}
function _g(i, t) {
  i.uniform1fv(this.addr, t);
}
function vg(i, t) {
  const e = hs(t, this.size, 2);
  i.uniform2fv(this.addr, e);
}
function xg(i, t) {
  const e = hs(t, this.size, 3);
  i.uniform3fv(this.addr, e);
}
function yg(i, t) {
  const e = hs(t, this.size, 4);
  i.uniform4fv(this.addr, e);
}
function Mg(i, t) {
  const e = hs(t, this.size, 4);
  i.uniformMatrix2fv(this.addr, !1, e);
}
function Sg(i, t) {
  const e = hs(t, this.size, 9);
  i.uniformMatrix3fv(this.addr, !1, e);
}
function bg(i, t) {
  const e = hs(t, this.size, 16);
  i.uniformMatrix4fv(this.addr, !1, e);
}
function Eg(i, t) {
  i.uniform1iv(this.addr, t);
}
function wg(i, t) {
  i.uniform2iv(this.addr, t);
}
function Tg(i, t) {
  i.uniform3iv(this.addr, t);
}
function Ag(i, t) {
  i.uniform4iv(this.addr, t);
}
function Rg(i, t) {
  i.uniform1uiv(this.addr, t);
}
function Cg(i, t) {
  i.uniform2uiv(this.addr, t);
}
function Pg(i, t) {
  i.uniform3uiv(this.addr, t);
}
function Dg(i, t) {
  i.uniform4uiv(this.addr, t);
}
function Lg(i, t, e) {
  const n = this.cache,
    s = t.length,
    r = Gr(e, s);
  De(n, r) || (i.uniform1iv(this.addr, r), Le(n, r));
  for (let o = 0; o !== s; ++o) e.setTexture2D(t[o] || yh, r[o]);
}
function Ig(i, t, e) {
  const n = this.cache,
    s = t.length,
    r = Gr(e, s);
  De(n, r) || (i.uniform1iv(this.addr, r), Le(n, r));
  for (let o = 0; o !== s; ++o) e.setTexture3D(t[o] || Sh, r[o]);
}
function Ug(i, t, e) {
  const n = this.cache,
    s = t.length,
    r = Gr(e, s);
  De(n, r) || (i.uniform1iv(this.addr, r), Le(n, r));
  for (let o = 0; o !== s; ++o) e.setTextureCube(t[o] || bh, r[o]);
}
function Ng(i, t, e) {
  const n = this.cache,
    s = t.length,
    r = Gr(e, s);
  De(n, r) || (i.uniform1iv(this.addr, r), Le(n, r));
  for (let o = 0; o !== s; ++o) e.setTexture2DArray(t[o] || Mh, r[o]);
}
function Fg(i) {
  switch (i) {
    case 5126:
      return _g;
    case 35664:
      return vg;
    case 35665:
      return xg;
    case 35666:
      return yg;
    case 35674:
      return Mg;
    case 35675:
      return Sg;
    case 35676:
      return bg;
    case 5124:
    case 35670:
      return Eg;
    case 35667:
    case 35671:
      return wg;
    case 35668:
    case 35672:
      return Tg;
    case 35669:
    case 35673:
      return Ag;
    case 5125:
      return Rg;
    case 36294:
      return Cg;
    case 36295:
      return Pg;
    case 36296:
      return Dg;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return Lg;
    case 35679:
    case 36299:
    case 36307:
      return Ig;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return Ug;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return Ng;
  }
}
class Og {
  constructor(t, e, n) {
    ((this.id = t),
      (this.addr = n),
      (this.cache = []),
      (this.type = e.type),
      (this.setValue = gg(e.type)));
  }
}
class zg {
  constructor(t, e, n) {
    ((this.id = t),
      (this.addr = n),
      (this.cache = []),
      (this.type = e.type),
      (this.size = e.size),
      (this.setValue = Fg(e.type)));
  }
}
class kg {
  constructor(t) {
    ((this.id = t), (this.seq = []), (this.map = {}));
  }
  setValue(t, e, n) {
    const s = this.seq;
    for (let r = 0, o = s.length; r !== o; ++r) {
      const a = s[r];
      a.setValue(t, e[a.id], n);
    }
  }
}
const Ao = /(\w+)(\])?(\[|\.)?/g;
function pl(i, t) {
  (i.seq.push(t), (i.map[t.id] = t));
}
function Bg(i, t, e) {
  const n = i.name,
    s = n.length;
  for (Ao.lastIndex = 0; ; ) {
    const r = Ao.exec(n),
      o = Ao.lastIndex;
    let a = r[1];
    const c = r[2] === "]",
      l = r[3];
    if ((c && (a = a | 0), l === void 0 || (l === "[" && o + 2 === s))) {
      pl(e, l === void 0 ? new Og(a, i, t) : new zg(a, i, t));
      break;
    } else {
      let u = e.map[a];
      (u === void 0 && ((u = new kg(a)), pl(e, u)), (e = u));
    }
  }
}
class Mr {
  constructor(t, e) {
    ((this.seq = []), (this.map = {}));
    const n = t.getProgramParameter(e, t.ACTIVE_UNIFORMS);
    for (let s = 0; s < n; ++s) {
      const r = t.getActiveUniform(e, s),
        o = t.getUniformLocation(e, r.name);
      Bg(r, o, this);
    }
  }
  setValue(t, e, n, s) {
    const r = this.map[e];
    r !== void 0 && r.setValue(t, n, s);
  }
  setOptional(t, e, n) {
    const s = e[n];
    s !== void 0 && this.setValue(t, n, s);
  }
  static upload(t, e, n, s) {
    for (let r = 0, o = e.length; r !== o; ++r) {
      const a = e[r],
        c = n[a.id];
      c.needsUpdate !== !1 && a.setValue(t, c.value, s);
    }
  }
  static seqWithValue(t, e) {
    const n = [];
    for (let s = 0, r = t.length; s !== r; ++s) {
      const o = t[s];
      o.id in e && n.push(o);
    }
    return n;
  }
}
function ml(i, t, e) {
  const n = i.createShader(t);
  return (i.shaderSource(n, e), i.compileShader(n), n);
}
const Hg = 37297;
let Gg = 0;
function Vg(i, t) {
  const e = i.split(`
`),
    n = [],
    s = Math.max(t - 6, 0),
    r = Math.min(t + 6, e.length);
  for (let o = s; o < r; o++) {
    const a = o + 1;
    n.push(`${a === t ? ">" : " "} ${a}: ${e[o]}`);
  }
  return n.join(`
`);
}
const gl = new Vt();
function Wg(i) {
  ee._getMatrix(gl, ee.workingColorSpace, i);
  const t = `mat3( ${gl.elements.map((e) => e.toFixed(4))} )`;
  switch (ee.getTransfer(i)) {
    case Er:
      return [t, "LinearTransferOETF"];
    case ce:
      return [t, "sRGBTransferOETF"];
    default:
      return (
        console.warn("THREE.WebGLProgram: Unsupported color space: ", i),
        [t, "LinearTransferOETF"]
      );
  }
}
function _l(i, t, e) {
  const n = i.getShaderParameter(t, i.COMPILE_STATUS),
    r = (i.getShaderInfoLog(t) || "").trim();
  if (n && r === "") return "";
  const o = /ERROR: 0:(\d+)/.exec(r);
  if (o) {
    const a = parseInt(o[1]);
    return (
      e.toUpperCase() +
      `

` +
      r +
      `

` +
      Vg(i.getShaderSource(t), a)
    );
  } else return r;
}
function Xg(i, t) {
  const e = Wg(t);
  return [
    `vec4 ${i}( vec4 value ) {`,
    `	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,
    "}",
  ].join(`
`);
}
function qg(i, t) {
  let e;
  switch (t) {
    case pu:
      e = "Linear";
      break;
    case mu:
      e = "Reinhard";
      break;
    case gu:
      e = "Cineon";
      break;
    case _u:
      e = "ACESFilmic";
      break;
    case xu:
      e = "AgX";
      break;
    case yu:
      e = "Neutral";
      break;
    case vu:
      e = "Custom";
      break;
    default:
      (console.warn("THREE.WebGLProgram: Unsupported toneMapping:", t),
        (e = "Linear"));
  }
  return (
    "vec3 " + i + "( vec3 color ) { return " + e + "ToneMapping( color ); }"
  );
}
const ur = new P();
function Yg() {
  ee.getLuminanceCoefficients(ur);
  const i = ur.x.toFixed(4),
    t = ur.y.toFixed(4),
    e = ur.z.toFixed(4);
  return [
    "float luminance( const in vec3 rgb ) {",
    `	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,
    "	return dot( weights, rgb );",
    "}",
  ].join(`
`);
}
function Kg(i) {
  return [
    i.extensionClipCullDistance
      ? "#extension GL_ANGLE_clip_cull_distance : require"
      : "",
    i.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : "",
  ].filter(Ss).join(`
`);
}
function Zg(i) {
  const t = [];
  for (const e in i) {
    const n = i[e];
    n !== !1 && t.push("#define " + e + " " + n);
  }
  return t.join(`
`);
}
function jg(i, t) {
  const e = {},
    n = i.getProgramParameter(t, i.ACTIVE_ATTRIBUTES);
  for (let s = 0; s < n; s++) {
    const r = i.getActiveAttrib(t, s),
      o = r.name;
    let a = 1;
    (r.type === i.FLOAT_MAT2 && (a = 2),
      r.type === i.FLOAT_MAT3 && (a = 3),
      r.type === i.FLOAT_MAT4 && (a = 4),
      (e[o] = {
        type: r.type,
        location: i.getAttribLocation(t, o),
        locationSize: a,
      }));
  }
  return e;
}
function Ss(i) {
  return i !== "";
}
function vl(i, t) {
  const e =
    t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps;
  return i
    .replace(/NUM_DIR_LIGHTS/g, t.numDirLights)
    .replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights)
    .replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps)
    .replace(/NUM_SPOT_LIGHT_COORDS/g, e)
    .replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights)
    .replace(/NUM_POINT_LIGHTS/g, t.numPointLights)
    .replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights)
    .replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows)
    .replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps)
    .replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows)
    .replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows);
}
function xl(i, t) {
  return i
    .replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes)
    .replace(
      /UNION_CLIPPING_PLANES/g,
      t.numClippingPlanes - t.numClipIntersection,
    );
}
const $g = /^[ \t]*#include +<([\w\d./]+)>/gm;
function Ta(i) {
  return i.replace($g, Qg);
}
const Jg = new Map();
function Qg(i, t) {
  let e = Wt[t];
  if (e === void 0) {
    const n = Jg.get(t);
    if (n !== void 0)
      ((e = Wt[n]),
        console.warn(
          'THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',
          t,
          n,
        ));
    else throw new Error("Can not resolve #include <" + t + ">");
  }
  return Ta(e);
}
const t0 =
  /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function yl(i) {
  return i.replace(t0, e0);
}
function e0(i, t, e, n) {
  let s = "";
  for (let r = parseInt(t); r < parseInt(e); r++)
    s += n
      .replace(/\[\s*i\s*\]/g, "[ " + r + " ]")
      .replace(/UNROLLED_LOOP_INDEX/g, r);
  return s;
}
function Ml(i) {
  let t = `precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;
  return (
    i.precision === "highp"
      ? (t += `
#define HIGH_PRECISION`)
      : i.precision === "mediump"
        ? (t += `
#define MEDIUM_PRECISION`)
        : i.precision === "lowp" &&
          (t += `
#define LOW_PRECISION`),
    t
  );
}
function n0(i) {
  let t = "SHADOWMAP_TYPE_BASIC";
  return (
    i.shadowMapType === Ua
      ? (t = "SHADOWMAP_TYPE_PCF")
      : i.shadowMapType === Yh
        ? (t = "SHADOWMAP_TYPE_PCF_SOFT")
        : i.shadowMapType === Un && (t = "SHADOWMAP_TYPE_VSM"),
    t
  );
}
function i0(i) {
  let t = "ENVMAP_TYPE_CUBE";
  if (i.envMap)
    switch (i.envMapMode) {
      case ts:
      case es:
        t = "ENVMAP_TYPE_CUBE";
        break;
      case kr:
        t = "ENVMAP_TYPE_CUBE_UV";
        break;
    }
  return t;
}
function s0(i) {
  let t = "ENVMAP_MODE_REFLECTION";
  if (i.envMap)
    switch (i.envMapMode) {
      case es:
        t = "ENVMAP_MODE_REFRACTION";
        break;
    }
  return t;
}
function r0(i) {
  let t = "ENVMAP_BLENDING_NONE";
  if (i.envMap)
    switch (i.combine) {
      case zr:
        t = "ENVMAP_BLENDING_MULTIPLY";
        break;
      case du:
        t = "ENVMAP_BLENDING_MIX";
        break;
      case fu:
        t = "ENVMAP_BLENDING_ADD";
        break;
    }
  return t;
}
function o0(i) {
  const t = i.envMapCubeUVHeight;
  if (t === null) return null;
  const e = Math.log2(t) - 2,
    n = 1 / t;
  return {
    texelWidth: 1 / (3 * Math.max(Math.pow(2, e), 112)),
    texelHeight: n,
    maxMip: e,
  };
}
function a0(i, t, e, n) {
  const s = i.getContext(),
    r = e.defines;
  let o = e.vertexShader,
    a = e.fragmentShader;
  const c = n0(e),
    l = i0(e),
    h = s0(e),
    u = r0(e),
    d = o0(e),
    f = Kg(e),
    m = Zg(r),
    _ = s.createProgram();
  let g,
    p,
    A = e.glslVersion
      ? "#version " +
        e.glslVersion +
        `
`
      : "";
  (e.isRawShaderMaterial
    ? ((g = [
        "#define SHADER_TYPE " + e.shaderType,
        "#define SHADER_NAME " + e.shaderName,
        m,
      ].filter(Ss).join(`
`)),
      g.length > 0 &&
        (g += `
`),
      (p = [
        "#define SHADER_TYPE " + e.shaderType,
        "#define SHADER_NAME " + e.shaderName,
        m,
      ].filter(Ss).join(`
`)),
      p.length > 0 &&
        (p += `
`))
    : ((g = [
        Ml(e),
        "#define SHADER_TYPE " + e.shaderType,
        "#define SHADER_NAME " + e.shaderName,
        m,
        e.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
        e.batching ? "#define USE_BATCHING" : "",
        e.batchingColor ? "#define USE_BATCHING_COLOR" : "",
        e.instancing ? "#define USE_INSTANCING" : "",
        e.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
        e.instancingMorph ? "#define USE_INSTANCING_MORPH" : "",
        e.useFog && e.fog ? "#define USE_FOG" : "",
        e.useFog && e.fogExp2 ? "#define FOG_EXP2" : "",
        e.map ? "#define USE_MAP" : "",
        e.envMap ? "#define USE_ENVMAP" : "",
        e.envMap ? "#define " + h : "",
        e.lightMap ? "#define USE_LIGHTMAP" : "",
        e.aoMap ? "#define USE_AOMAP" : "",
        e.bumpMap ? "#define USE_BUMPMAP" : "",
        e.normalMap ? "#define USE_NORMALMAP" : "",
        e.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
        e.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
        e.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
        e.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
        e.anisotropy ? "#define USE_ANISOTROPY" : "",
        e.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
        e.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
        e.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
        e.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
        e.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
        e.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
        e.specularMap ? "#define USE_SPECULARMAP" : "",
        e.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
        e.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
        e.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
        e.metalnessMap ? "#define USE_METALNESSMAP" : "",
        e.alphaMap ? "#define USE_ALPHAMAP" : "",
        e.alphaHash ? "#define USE_ALPHAHASH" : "",
        e.transmission ? "#define USE_TRANSMISSION" : "",
        e.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
        e.thicknessMap ? "#define USE_THICKNESSMAP" : "",
        e.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
        e.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
        e.mapUv ? "#define MAP_UV " + e.mapUv : "",
        e.alphaMapUv ? "#define ALPHAMAP_UV " + e.alphaMapUv : "",
        e.lightMapUv ? "#define LIGHTMAP_UV " + e.lightMapUv : "",
        e.aoMapUv ? "#define AOMAP_UV " + e.aoMapUv : "",
        e.emissiveMapUv ? "#define EMISSIVEMAP_UV " + e.emissiveMapUv : "",
        e.bumpMapUv ? "#define BUMPMAP_UV " + e.bumpMapUv : "",
        e.normalMapUv ? "#define NORMALMAP_UV " + e.normalMapUv : "",
        e.displacementMapUv
          ? "#define DISPLACEMENTMAP_UV " + e.displacementMapUv
          : "",
        e.metalnessMapUv ? "#define METALNESSMAP_UV " + e.metalnessMapUv : "",
        e.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + e.roughnessMapUv : "",
        e.anisotropyMapUv
          ? "#define ANISOTROPYMAP_UV " + e.anisotropyMapUv
          : "",
        e.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + e.clearcoatMapUv : "",
        e.clearcoatNormalMapUv
          ? "#define CLEARCOAT_NORMALMAP_UV " + e.clearcoatNormalMapUv
          : "",
        e.clearcoatRoughnessMapUv
          ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + e.clearcoatRoughnessMapUv
          : "",
        e.iridescenceMapUv
          ? "#define IRIDESCENCEMAP_UV " + e.iridescenceMapUv
          : "",
        e.iridescenceThicknessMapUv
          ? "#define IRIDESCENCE_THICKNESSMAP_UV " + e.iridescenceThicknessMapUv
          : "",
        e.sheenColorMapUv
          ? "#define SHEEN_COLORMAP_UV " + e.sheenColorMapUv
          : "",
        e.sheenRoughnessMapUv
          ? "#define SHEEN_ROUGHNESSMAP_UV " + e.sheenRoughnessMapUv
          : "",
        e.specularMapUv ? "#define SPECULARMAP_UV " + e.specularMapUv : "",
        e.specularColorMapUv
          ? "#define SPECULAR_COLORMAP_UV " + e.specularColorMapUv
          : "",
        e.specularIntensityMapUv
          ? "#define SPECULAR_INTENSITYMAP_UV " + e.specularIntensityMapUv
          : "",
        e.transmissionMapUv
          ? "#define TRANSMISSIONMAP_UV " + e.transmissionMapUv
          : "",
        e.thicknessMapUv ? "#define THICKNESSMAP_UV " + e.thicknessMapUv : "",
        e.vertexTangents && e.flatShading === !1 ? "#define USE_TANGENT" : "",
        e.vertexColors ? "#define USE_COLOR" : "",
        e.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
        e.vertexUv1s ? "#define USE_UV1" : "",
        e.vertexUv2s ? "#define USE_UV2" : "",
        e.vertexUv3s ? "#define USE_UV3" : "",
        e.pointsUvs ? "#define USE_POINTS_UV" : "",
        e.flatShading ? "#define FLAT_SHADED" : "",
        e.skinning ? "#define USE_SKINNING" : "",
        e.morphTargets ? "#define USE_MORPHTARGETS" : "",
        e.morphNormals && e.flatShading === !1
          ? "#define USE_MORPHNORMALS"
          : "",
        e.morphColors ? "#define USE_MORPHCOLORS" : "",
        e.morphTargetsCount > 0
          ? "#define MORPHTARGETS_TEXTURE_STRIDE " + e.morphTextureStride
          : "",
        e.morphTargetsCount > 0
          ? "#define MORPHTARGETS_COUNT " + e.morphTargetsCount
          : "",
        e.doubleSided ? "#define DOUBLE_SIDED" : "",
        e.flipSided ? "#define FLIP_SIDED" : "",
        e.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
        e.shadowMapEnabled ? "#define " + c : "",
        e.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
        e.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
        e.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
        e.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
        "uniform mat4 modelMatrix;",
        "uniform mat4 modelViewMatrix;",
        "uniform mat4 projectionMatrix;",
        "uniform mat4 viewMatrix;",
        "uniform mat3 normalMatrix;",
        "uniform vec3 cameraPosition;",
        "uniform bool isOrthographic;",
        "#ifdef USE_INSTANCING",
        "	attribute mat4 instanceMatrix;",
        "#endif",
        "#ifdef USE_INSTANCING_COLOR",
        "	attribute vec3 instanceColor;",
        "#endif",
        "#ifdef USE_INSTANCING_MORPH",
        "	uniform sampler2D morphTexture;",
        "#endif",
        "attribute vec3 position;",
        "attribute vec3 normal;",
        "attribute vec2 uv;",
        "#ifdef USE_UV1",
        "	attribute vec2 uv1;",
        "#endif",
        "#ifdef USE_UV2",
        "	attribute vec2 uv2;",
        "#endif",
        "#ifdef USE_UV3",
        "	attribute vec2 uv3;",
        "#endif",
        "#ifdef USE_TANGENT",
        "	attribute vec4 tangent;",
        "#endif",
        "#if defined( USE_COLOR_ALPHA )",
        "	attribute vec4 color;",
        "#elif defined( USE_COLOR )",
        "	attribute vec3 color;",
        "#endif",
        "#ifdef USE_SKINNING",
        "	attribute vec4 skinIndex;",
        "	attribute vec4 skinWeight;",
        "#endif",
        `
`,
      ].filter(Ss).join(`
`)),
      (p = [
        Ml(e),
        "#define SHADER_TYPE " + e.shaderType,
        "#define SHADER_NAME " + e.shaderName,
        m,
        e.useFog && e.fog ? "#define USE_FOG" : "",
        e.useFog && e.fogExp2 ? "#define FOG_EXP2" : "",
        e.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
        e.map ? "#define USE_MAP" : "",
        e.matcap ? "#define USE_MATCAP" : "",
        e.envMap ? "#define USE_ENVMAP" : "",
        e.envMap ? "#define " + l : "",
        e.envMap ? "#define " + h : "",
        e.envMap ? "#define " + u : "",
        d ? "#define CUBEUV_TEXEL_WIDTH " + d.texelWidth : "",
        d ? "#define CUBEUV_TEXEL_HEIGHT " + d.texelHeight : "",
        d ? "#define CUBEUV_MAX_MIP " + d.maxMip + ".0" : "",
        e.lightMap ? "#define USE_LIGHTMAP" : "",
        e.aoMap ? "#define USE_AOMAP" : "",
        e.bumpMap ? "#define USE_BUMPMAP" : "",
        e.normalMap ? "#define USE_NORMALMAP" : "",
        e.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
        e.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
        e.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
        e.anisotropy ? "#define USE_ANISOTROPY" : "",
        e.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
        e.clearcoat ? "#define USE_CLEARCOAT" : "",
        e.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
        e.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
        e.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
        e.dispersion ? "#define USE_DISPERSION" : "",
        e.iridescence ? "#define USE_IRIDESCENCE" : "",
        e.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
        e.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
        e.specularMap ? "#define USE_SPECULARMAP" : "",
        e.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
        e.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
        e.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
        e.metalnessMap ? "#define USE_METALNESSMAP" : "",
        e.alphaMap ? "#define USE_ALPHAMAP" : "",
        e.alphaTest ? "#define USE_ALPHATEST" : "",
        e.alphaHash ? "#define USE_ALPHAHASH" : "",
        e.sheen ? "#define USE_SHEEN" : "",
        e.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
        e.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
        e.transmission ? "#define USE_TRANSMISSION" : "",
        e.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
        e.thicknessMap ? "#define USE_THICKNESSMAP" : "",
        e.vertexTangents && e.flatShading === !1 ? "#define USE_TANGENT" : "",
        e.vertexColors || e.instancingColor || e.batchingColor
          ? "#define USE_COLOR"
          : "",
        e.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
        e.vertexUv1s ? "#define USE_UV1" : "",
        e.vertexUv2s ? "#define USE_UV2" : "",
        e.vertexUv3s ? "#define USE_UV3" : "",
        e.pointsUvs ? "#define USE_POINTS_UV" : "",
        e.gradientMap ? "#define USE_GRADIENTMAP" : "",
        e.flatShading ? "#define FLAT_SHADED" : "",
        e.doubleSided ? "#define DOUBLE_SIDED" : "",
        e.flipSided ? "#define FLIP_SIDED" : "",
        e.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
        e.shadowMapEnabled ? "#define " + c : "",
        e.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
        e.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
        e.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
        e.decodeVideoTextureEmissive
          ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE"
          : "",
        e.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
        e.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
        "uniform mat4 viewMatrix;",
        "uniform vec3 cameraPosition;",
        "uniform bool isOrthographic;",
        e.toneMapping !== kn ? "#define TONE_MAPPING" : "",
        e.toneMapping !== kn ? Wt.tonemapping_pars_fragment : "",
        e.toneMapping !== kn ? qg("toneMapping", e.toneMapping) : "",
        e.dithering ? "#define DITHERING" : "",
        e.opaque ? "#define OPAQUE" : "",
        Wt.colorspace_pars_fragment,
        Xg("linearToOutputTexel", e.outputColorSpace),
        Yg(),
        e.useDepthPacking ? "#define DEPTH_PACKING " + e.depthPacking : "",
        `
`,
      ].filter(Ss).join(`
`))),
    (o = Ta(o)),
    (o = vl(o, e)),
    (o = xl(o, e)),
    (a = Ta(a)),
    (a = vl(a, e)),
    (a = xl(a, e)),
    (o = yl(o)),
    (a = yl(a)),
    e.isRawShaderMaterial !== !0 &&
      ((A = `#version 300 es
`),
      (g =
        [
          f,
          "#define attribute in",
          "#define varying out",
          "#define texture2D texture",
        ].join(`
`) +
        `
` +
        g),
      (p =
        [
          "#define varying in",
          e.glslVersion === Sc
            ? ""
            : "layout(location = 0) out highp vec4 pc_fragColor;",
          e.glslVersion === Sc ? "" : "#define gl_FragColor pc_fragColor",
          "#define gl_FragDepthEXT gl_FragDepth",
          "#define texture2D texture",
          "#define textureCube texture",
          "#define texture2DProj textureProj",
          "#define texture2DLodEXT textureLod",
          "#define texture2DProjLodEXT textureProjLod",
          "#define textureCubeLodEXT textureLod",
          "#define texture2DGradEXT textureGrad",
          "#define texture2DProjGradEXT textureProjGrad",
          "#define textureCubeGradEXT textureGrad",
        ].join(`
`) +
        `
` +
        p)));
  const b = A + g + o,
    v = A + p + a,
    R = ml(s, s.VERTEX_SHADER, b),
    E = ml(s, s.FRAGMENT_SHADER, v);
  (s.attachShader(_, R),
    s.attachShader(_, E),
    e.index0AttributeName !== void 0
      ? s.bindAttribLocation(_, 0, e.index0AttributeName)
      : e.morphTargets === !0 && s.bindAttribLocation(_, 0, "position"),
    s.linkProgram(_));
  function C(w) {
    if (i.debug.checkShaderErrors) {
      const I = s.getProgramInfoLog(_) || "",
        F = s.getShaderInfoLog(R) || "",
        B = s.getShaderInfoLog(E) || "",
        k = I.trim(),
        G = F.trim(),
        Y = B.trim();
      let H = !0,
        ct = !0;
      if (s.getProgramParameter(_, s.LINK_STATUS) === !1)
        if (((H = !1), typeof i.debug.onShaderError == "function"))
          i.debug.onShaderError(s, _, R, E);
        else {
          const pt = _l(s, R, "vertex"),
            gt = _l(s, E, "fragment");
          console.error(
            "THREE.WebGLProgram: Shader Error " +
              s.getError() +
              " - VALIDATE_STATUS " +
              s.getProgramParameter(_, s.VALIDATE_STATUS) +
              `

Material Name: ` +
              w.name +
              `
Material Type: ` +
              w.type +
              `

Program Info Log: ` +
              k +
              `
` +
              pt +
              `
` +
              gt,
          );
        }
      else
        k !== ""
          ? console.warn("THREE.WebGLProgram: Program Info Log:", k)
          : (G === "" || Y === "") && (ct = !1);
      ct &&
        (w.diagnostics = {
          runnable: H,
          programLog: k,
          vertexShader: { log: G, prefix: g },
          fragmentShader: { log: Y, prefix: p },
        });
    }
    (s.deleteShader(R), s.deleteShader(E), (L = new Mr(s, _)), (y = jg(s, _)));
  }
  let L;
  this.getUniforms = function () {
    return (L === void 0 && C(this), L);
  };
  let y;
  this.getAttributes = function () {
    return (y === void 0 && C(this), y);
  };
  let M = e.rendererExtensionParallelShaderCompile === !1;
  return (
    (this.isReady = function () {
      return (M === !1 && (M = s.getProgramParameter(_, Hg)), M);
    }),
    (this.destroy = function () {
      (n.releaseStatesOfProgram(this),
        s.deleteProgram(_),
        (this.program = void 0));
    }),
    (this.type = e.shaderType),
    (this.name = e.shaderName),
    (this.id = Gg++),
    (this.cacheKey = t),
    (this.usedTimes = 1),
    (this.program = _),
    (this.vertexShader = R),
    (this.fragmentShader = E),
    this
  );
}
let c0 = 0;
class l0 {
  constructor() {
    ((this.shaderCache = new Map()), (this.materialCache = new Map()));
  }
  update(t) {
    const e = t.vertexShader,
      n = t.fragmentShader,
      s = this._getShaderStage(e),
      r = this._getShaderStage(n),
      o = this._getShaderCacheForMaterial(t);
    return (
      o.has(s) === !1 && (o.add(s), s.usedTimes++),
      o.has(r) === !1 && (o.add(r), r.usedTimes++),
      this
    );
  }
  remove(t) {
    const e = this.materialCache.get(t);
    for (const n of e)
      (n.usedTimes--, n.usedTimes === 0 && this.shaderCache.delete(n.code));
    return (this.materialCache.delete(t), this);
  }
  getVertexShaderID(t) {
    return this._getShaderStage(t.vertexShader).id;
  }
  getFragmentShaderID(t) {
    return this._getShaderStage(t.fragmentShader).id;
  }
  dispose() {
    (this.shaderCache.clear(), this.materialCache.clear());
  }
  _getShaderCacheForMaterial(t) {
    const e = this.materialCache;
    let n = e.get(t);
    return (n === void 0 && ((n = new Set()), e.set(t, n)), n);
  }
  _getShaderStage(t) {
    const e = this.shaderCache;
    let n = e.get(t);
    return (n === void 0 && ((n = new h0(t)), e.set(t, n)), n);
  }
}
class h0 {
  constructor(t) {
    ((this.id = c0++), (this.code = t), (this.usedTimes = 0));
  }
}
function u0(i, t, e, n, s, r, o) {
  const a = new Wa(),
    c = new l0(),
    l = new Set(),
    h = [],
    u = s.logarithmicDepthBuffer,
    d = s.vertexTextures;
  let f = s.precision;
  const m = {
    MeshDepthMaterial: "depth",
    MeshDistanceMaterial: "distanceRGBA",
    MeshNormalMaterial: "normal",
    MeshBasicMaterial: "basic",
    MeshLambertMaterial: "lambert",
    MeshPhongMaterial: "phong",
    MeshToonMaterial: "toon",
    MeshStandardMaterial: "physical",
    MeshPhysicalMaterial: "physical",
    MeshMatcapMaterial: "matcap",
    LineBasicMaterial: "basic",
    LineDashedMaterial: "dashed",
    PointsMaterial: "points",
    ShadowMaterial: "shadow",
    SpriteMaterial: "sprite",
  };
  function _(y) {
    return (l.add(y), y === 0 ? "uv" : `uv${y}`);
  }
  function g(y, M, w, I, F) {
    const B = I.fog,
      k = F.geometry,
      G = y.isMeshStandardMaterial ? I.environment : null,
      Y = (y.isMeshStandardMaterial ? e : t).get(y.envMap || G),
      H = Y && Y.mapping === kr ? Y.image.height : null,
      ct = m[y.type];
    y.precision !== null &&
      ((f = s.getMaxPrecision(y.precision)),
      f !== y.precision &&
        console.warn(
          "THREE.WebGLProgram.getParameters:",
          y.precision,
          "not supported, using",
          f,
          "instead.",
        ));
    const pt =
        k.morphAttributes.position ||
        k.morphAttributes.normal ||
        k.morphAttributes.color,
      gt = pt !== void 0 ? pt.length : 0;
    let Lt = 0;
    (k.morphAttributes.position !== void 0 && (Lt = 1),
      k.morphAttributes.normal !== void 0 && (Lt = 2),
      k.morphAttributes.color !== void 0 && (Lt = 3));
    let $t, re, Jt, Z;
    if (ct) {
      const ne = bn[ct];
      (($t = ne.vertexShader), (re = ne.fragmentShader));
    } else
      (($t = y.vertexShader),
        (re = y.fragmentShader),
        c.update(y),
        (Jt = c.getVertexShaderID(y)),
        (Z = c.getFragmentShaderID(y)));
    const nt = i.getRenderTarget(),
      St = i.state.buffers.depth.getReversed(),
      Dt = F.isInstancedMesh === !0,
      wt = F.isBatchedMesh === !0,
      Zt = !!y.map,
      me = !!y.matcap,
      D = !!Y,
      et = !!y.aoMap,
      J = !!y.lightMap,
      $ = !!y.bumpMap,
      j = !!y.normalMap,
      ut = !!y.displacementMap,
      it = !!y.emissiveMap,
      dt = !!y.metalnessMap,
      kt = !!y.roughnessMap,
      zt = y.anisotropy > 0,
      T = y.clearcoat > 0,
      x = y.dispersion > 0,
      z = y.iridescence > 0,
      X = y.sheen > 0,
      tt = y.transmission > 0,
      q = zt && !!y.anisotropyMap,
      Ct = T && !!y.clearcoatMap,
      ht = T && !!y.clearcoatNormalMap,
      Tt = T && !!y.clearcoatRoughnessMap,
      At = z && !!y.iridescenceMap,
      st = z && !!y.iridescenceThicknessMap,
      xt = X && !!y.sheenColorMap,
      Ft = X && !!y.sheenRoughnessMap,
      Pt = !!y.specularMap,
      _t = !!y.specularColorMap,
      Gt = !!y.specularIntensityMap,
      U = tt && !!y.transmissionMap,
      lt = tt && !!y.thicknessMap,
      ft = !!y.gradientMap,
      bt = !!y.alphaMap,
      rt = y.alphaTest > 0,
      Q = !!y.alphaHash,
      Rt = !!y.extensions;
    let Bt = kn;
    y.toneMapped &&
      (nt === null || nt.isXRRenderTarget === !0) &&
      (Bt = i.toneMapping);
    const ge = {
      shaderID: ct,
      shaderType: y.type,
      shaderName: y.name,
      vertexShader: $t,
      fragmentShader: re,
      defines: y.defines,
      customVertexShaderID: Jt,
      customFragmentShaderID: Z,
      isRawShaderMaterial: y.isRawShaderMaterial === !0,
      glslVersion: y.glslVersion,
      precision: f,
      batching: wt,
      batchingColor: wt && F._colorsTexture !== null,
      instancing: Dt,
      instancingColor: Dt && F.instanceColor !== null,
      instancingMorph: Dt && F.morphTexture !== null,
      supportsVertexTextures: d,
      outputColorSpace:
        nt === null
          ? i.outputColorSpace
          : nt.isXRRenderTarget === !0
            ? nt.texture.colorSpace
            : ns,
      alphaToCoverage: !!y.alphaToCoverage,
      map: Zt,
      matcap: me,
      envMap: D,
      envMapMode: D && Y.mapping,
      envMapCubeUVHeight: H,
      aoMap: et,
      lightMap: J,
      bumpMap: $,
      normalMap: j,
      displacementMap: d && ut,
      emissiveMap: it,
      normalMapObjectSpace: j && y.normalMapType === Eu,
      normalMapTangentSpace: j && y.normalMapType === Ga,
      metalnessMap: dt,
      roughnessMap: kt,
      anisotropy: zt,
      anisotropyMap: q,
      clearcoat: T,
      clearcoatMap: Ct,
      clearcoatNormalMap: ht,
      clearcoatRoughnessMap: Tt,
      dispersion: x,
      iridescence: z,
      iridescenceMap: At,
      iridescenceThicknessMap: st,
      sheen: X,
      sheenColorMap: xt,
      sheenRoughnessMap: Ft,
      specularMap: Pt,
      specularColorMap: _t,
      specularIntensityMap: Gt,
      transmission: tt,
      transmissionMap: U,
      thicknessMap: lt,
      gradientMap: ft,
      opaque:
        y.transparent === !1 && y.blending === ji && y.alphaToCoverage === !1,
      alphaMap: bt,
      alphaTest: rt,
      alphaHash: Q,
      combine: y.combine,
      mapUv: Zt && _(y.map.channel),
      aoMapUv: et && _(y.aoMap.channel),
      lightMapUv: J && _(y.lightMap.channel),
      bumpMapUv: $ && _(y.bumpMap.channel),
      normalMapUv: j && _(y.normalMap.channel),
      displacementMapUv: ut && _(y.displacementMap.channel),
      emissiveMapUv: it && _(y.emissiveMap.channel),
      metalnessMapUv: dt && _(y.metalnessMap.channel),
      roughnessMapUv: kt && _(y.roughnessMap.channel),
      anisotropyMapUv: q && _(y.anisotropyMap.channel),
      clearcoatMapUv: Ct && _(y.clearcoatMap.channel),
      clearcoatNormalMapUv: ht && _(y.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: Tt && _(y.clearcoatRoughnessMap.channel),
      iridescenceMapUv: At && _(y.iridescenceMap.channel),
      iridescenceThicknessMapUv: st && _(y.iridescenceThicknessMap.channel),
      sheenColorMapUv: xt && _(y.sheenColorMap.channel),
      sheenRoughnessMapUv: Ft && _(y.sheenRoughnessMap.channel),
      specularMapUv: Pt && _(y.specularMap.channel),
      specularColorMapUv: _t && _(y.specularColorMap.channel),
      specularIntensityMapUv: Gt && _(y.specularIntensityMap.channel),
      transmissionMapUv: U && _(y.transmissionMap.channel),
      thicknessMapUv: lt && _(y.thicknessMap.channel),
      alphaMapUv: bt && _(y.alphaMap.channel),
      vertexTangents: !!k.attributes.tangent && (j || zt),
      vertexColors: y.vertexColors,
      vertexAlphas:
        y.vertexColors === !0 &&
        !!k.attributes.color &&
        k.attributes.color.itemSize === 4,
      pointsUvs: F.isPoints === !0 && !!k.attributes.uv && (Zt || bt),
      fog: !!B,
      useFog: y.fog === !0,
      fogExp2: !!B && B.isFogExp2,
      flatShading: y.flatShading === !0 && y.wireframe === !1,
      sizeAttenuation: y.sizeAttenuation === !0,
      logarithmicDepthBuffer: u,
      reversedDepthBuffer: St,
      skinning: F.isSkinnedMesh === !0,
      morphTargets: k.morphAttributes.position !== void 0,
      morphNormals: k.morphAttributes.normal !== void 0,
      morphColors: k.morphAttributes.color !== void 0,
      morphTargetsCount: gt,
      morphTextureStride: Lt,
      numDirLights: M.directional.length,
      numPointLights: M.point.length,
      numSpotLights: M.spot.length,
      numSpotLightMaps: M.spotLightMap.length,
      numRectAreaLights: M.rectArea.length,
      numHemiLights: M.hemi.length,
      numDirLightShadows: M.directionalShadowMap.length,
      numPointLightShadows: M.pointShadowMap.length,
      numSpotLightShadows: M.spotShadowMap.length,
      numSpotLightShadowsWithMaps: M.numSpotLightShadowsWithMaps,
      numLightProbes: M.numLightProbes,
      numClippingPlanes: o.numPlanes,
      numClipIntersection: o.numIntersection,
      dithering: y.dithering,
      shadowMapEnabled: i.shadowMap.enabled && w.length > 0,
      shadowMapType: i.shadowMap.type,
      toneMapping: Bt,
      decodeVideoTexture:
        Zt &&
        y.map.isVideoTexture === !0 &&
        ee.getTransfer(y.map.colorSpace) === ce,
      decodeVideoTextureEmissive:
        it &&
        y.emissiveMap.isVideoTexture === !0 &&
        ee.getTransfer(y.emissiveMap.colorSpace) === ce,
      premultipliedAlpha: y.premultipliedAlpha,
      doubleSided: y.side === _n,
      flipSided: y.side === $e,
      useDepthPacking: y.depthPacking >= 0,
      depthPacking: y.depthPacking || 0,
      index0AttributeName: y.index0AttributeName,
      extensionClipCullDistance:
        Rt &&
        y.extensions.clipCullDistance === !0 &&
        n.has("WEBGL_clip_cull_distance"),
      extensionMultiDraw:
        ((Rt && y.extensions.multiDraw === !0) || wt) &&
        n.has("WEBGL_multi_draw"),
      rendererExtensionParallelShaderCompile: n.has(
        "KHR_parallel_shader_compile",
      ),
      customProgramCacheKey: y.customProgramCacheKey(),
    };
    return (
      (ge.vertexUv1s = l.has(1)),
      (ge.vertexUv2s = l.has(2)),
      (ge.vertexUv3s = l.has(3)),
      l.clear(),
      ge
    );
  }
  function p(y) {
    const M = [];
    if (
      (y.shaderID
        ? M.push(y.shaderID)
        : (M.push(y.customVertexShaderID), M.push(y.customFragmentShaderID)),
      y.defines !== void 0)
    )
      for (const w in y.defines) (M.push(w), M.push(y.defines[w]));
    return (
      y.isRawShaderMaterial === !1 &&
        (A(M, y), b(M, y), M.push(i.outputColorSpace)),
      M.push(y.customProgramCacheKey),
      M.join()
    );
  }
  function A(y, M) {
    (y.push(M.precision),
      y.push(M.outputColorSpace),
      y.push(M.envMapMode),
      y.push(M.envMapCubeUVHeight),
      y.push(M.mapUv),
      y.push(M.alphaMapUv),
      y.push(M.lightMapUv),
      y.push(M.aoMapUv),
      y.push(M.bumpMapUv),
      y.push(M.normalMapUv),
      y.push(M.displacementMapUv),
      y.push(M.emissiveMapUv),
      y.push(M.metalnessMapUv),
      y.push(M.roughnessMapUv),
      y.push(M.anisotropyMapUv),
      y.push(M.clearcoatMapUv),
      y.push(M.clearcoatNormalMapUv),
      y.push(M.clearcoatRoughnessMapUv),
      y.push(M.iridescenceMapUv),
      y.push(M.iridescenceThicknessMapUv),
      y.push(M.sheenColorMapUv),
      y.push(M.sheenRoughnessMapUv),
      y.push(M.specularMapUv),
      y.push(M.specularColorMapUv),
      y.push(M.specularIntensityMapUv),
      y.push(M.transmissionMapUv),
      y.push(M.thicknessMapUv),
      y.push(M.combine),
      y.push(M.fogExp2),
      y.push(M.sizeAttenuation),
      y.push(M.morphTargetsCount),
      y.push(M.morphAttributeCount),
      y.push(M.numDirLights),
      y.push(M.numPointLights),
      y.push(M.numSpotLights),
      y.push(M.numSpotLightMaps),
      y.push(M.numHemiLights),
      y.push(M.numRectAreaLights),
      y.push(M.numDirLightShadows),
      y.push(M.numPointLightShadows),
      y.push(M.numSpotLightShadows),
      y.push(M.numSpotLightShadowsWithMaps),
      y.push(M.numLightProbes),
      y.push(M.shadowMapType),
      y.push(M.toneMapping),
      y.push(M.numClippingPlanes),
      y.push(M.numClipIntersection),
      y.push(M.depthPacking));
  }
  function b(y, M) {
    (a.disableAll(),
      M.supportsVertexTextures && a.enable(0),
      M.instancing && a.enable(1),
      M.instancingColor && a.enable(2),
      M.instancingMorph && a.enable(3),
      M.matcap && a.enable(4),
      M.envMap && a.enable(5),
      M.normalMapObjectSpace && a.enable(6),
      M.normalMapTangentSpace && a.enable(7),
      M.clearcoat && a.enable(8),
      M.iridescence && a.enable(9),
      M.alphaTest && a.enable(10),
      M.vertexColors && a.enable(11),
      M.vertexAlphas && a.enable(12),
      M.vertexUv1s && a.enable(13),
      M.vertexUv2s && a.enable(14),
      M.vertexUv3s && a.enable(15),
      M.vertexTangents && a.enable(16),
      M.anisotropy && a.enable(17),
      M.alphaHash && a.enable(18),
      M.batching && a.enable(19),
      M.dispersion && a.enable(20),
      M.batchingColor && a.enable(21),
      M.gradientMap && a.enable(22),
      y.push(a.mask),
      a.disableAll(),
      M.fog && a.enable(0),
      M.useFog && a.enable(1),
      M.flatShading && a.enable(2),
      M.logarithmicDepthBuffer && a.enable(3),
      M.reversedDepthBuffer && a.enable(4),
      M.skinning && a.enable(5),
      M.morphTargets && a.enable(6),
      M.morphNormals && a.enable(7),
      M.morphColors && a.enable(8),
      M.premultipliedAlpha && a.enable(9),
      M.shadowMapEnabled && a.enable(10),
      M.doubleSided && a.enable(11),
      M.flipSided && a.enable(12),
      M.useDepthPacking && a.enable(13),
      M.dithering && a.enable(14),
      M.transmission && a.enable(15),
      M.sheen && a.enable(16),
      M.opaque && a.enable(17),
      M.pointsUvs && a.enable(18),
      M.decodeVideoTexture && a.enable(19),
      M.decodeVideoTextureEmissive && a.enable(20),
      M.alphaToCoverage && a.enable(21),
      y.push(a.mask));
  }
  function v(y) {
    const M = m[y.type];
    let w;
    if (M) {
      const I = bn[M];
      w = ed.clone(I.uniforms);
    } else w = y.uniforms;
    return w;
  }
  function R(y, M) {
    let w;
    for (let I = 0, F = h.length; I < F; I++) {
      const B = h[I];
      if (B.cacheKey === M) {
        ((w = B), ++w.usedTimes);
        break;
      }
    }
    return (w === void 0 && ((w = new a0(i, M, y, r)), h.push(w)), w);
  }
  function E(y) {
    if (--y.usedTimes === 0) {
      const M = h.indexOf(y);
      ((h[M] = h[h.length - 1]), h.pop(), y.destroy());
    }
  }
  function C(y) {
    c.remove(y);
  }
  function L() {
    c.dispose();
  }
  return {
    getParameters: g,
    getProgramCacheKey: p,
    getUniforms: v,
    acquireProgram: R,
    releaseProgram: E,
    releaseShaderCache: C,
    programs: h,
    dispose: L,
  };
}
function d0() {
  let i = new WeakMap();
  function t(o) {
    return i.has(o);
  }
  function e(o) {
    let a = i.get(o);
    return (a === void 0 && ((a = {}), i.set(o, a)), a);
  }
  function n(o) {
    i.delete(o);
  }
  function s(o, a, c) {
    i.get(o)[a] = c;
  }
  function r() {
    i = new WeakMap();
  }
  return { has: t, get: e, remove: n, update: s, dispose: r };
}
function f0(i, t) {
  return i.groupOrder !== t.groupOrder
    ? i.groupOrder - t.groupOrder
    : i.renderOrder !== t.renderOrder
      ? i.renderOrder - t.renderOrder
      : i.material.id !== t.material.id
        ? i.material.id - t.material.id
        : i.z !== t.z
          ? i.z - t.z
          : i.id - t.id;
}
function Sl(i, t) {
  return i.groupOrder !== t.groupOrder
    ? i.groupOrder - t.groupOrder
    : i.renderOrder !== t.renderOrder
      ? i.renderOrder - t.renderOrder
      : i.z !== t.z
        ? t.z - i.z
        : i.id - t.id;
}
function bl() {
  const i = [];
  let t = 0;
  const e = [],
    n = [],
    s = [];
  function r() {
    ((t = 0), (e.length = 0), (n.length = 0), (s.length = 0));
  }
  function o(u, d, f, m, _, g) {
    let p = i[t];
    return (
      p === void 0
        ? ((p = {
            id: u.id,
            object: u,
            geometry: d,
            material: f,
            groupOrder: m,
            renderOrder: u.renderOrder,
            z: _,
            group: g,
          }),
          (i[t] = p))
        : ((p.id = u.id),
          (p.object = u),
          (p.geometry = d),
          (p.material = f),
          (p.groupOrder = m),
          (p.renderOrder = u.renderOrder),
          (p.z = _),
          (p.group = g)),
      t++,
      p
    );
  }
  function a(u, d, f, m, _, g) {
    const p = o(u, d, f, m, _, g);
    f.transmission > 0
      ? n.push(p)
      : f.transparent === !0
        ? s.push(p)
        : e.push(p);
  }
  function c(u, d, f, m, _, g) {
    const p = o(u, d, f, m, _, g);
    f.transmission > 0
      ? n.unshift(p)
      : f.transparent === !0
        ? s.unshift(p)
        : e.unshift(p);
  }
  function l(u, d) {
    (e.length > 1 && e.sort(u || f0),
      n.length > 1 && n.sort(d || Sl),
      s.length > 1 && s.sort(d || Sl));
  }
  function h() {
    for (let u = t, d = i.length; u < d; u++) {
      const f = i[u];
      if (f.id === null) break;
      ((f.id = null),
        (f.object = null),
        (f.geometry = null),
        (f.material = null),
        (f.group = null));
    }
  }
  return {
    opaque: e,
    transmissive: n,
    transparent: s,
    init: r,
    push: a,
    unshift: c,
    finish: h,
    sort: l,
  };
}
function p0() {
  let i = new WeakMap();
  function t(n, s) {
    const r = i.get(n);
    let o;
    return (
      r === void 0
        ? ((o = new bl()), i.set(n, [o]))
        : s >= r.length
          ? ((o = new bl()), r.push(o))
          : (o = r[s]),
      o
    );
  }
  function e() {
    i = new WeakMap();
  }
  return { get: t, dispose: e };
}
function m0() {
  const i = {};
  return {
    get: function (t) {
      if (i[t.id] !== void 0) return i[t.id];
      let e;
      switch (t.type) {
        case "DirectionalLight":
          e = { direction: new P(), color: new Ht() };
          break;
        case "SpotLight":
          e = {
            position: new P(),
            direction: new P(),
            color: new Ht(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0,
          };
          break;
        case "PointLight":
          e = { position: new P(), color: new Ht(), distance: 0, decay: 0 };
          break;
        case "HemisphereLight":
          e = { direction: new P(), skyColor: new Ht(), groundColor: new Ht() };
          break;
        case "RectAreaLight":
          e = {
            color: new Ht(),
            position: new P(),
            halfWidth: new P(),
            halfHeight: new P(),
          };
          break;
      }
      return ((i[t.id] = e), e);
    },
  };
}
function g0() {
  const i = {};
  return {
    get: function (t) {
      if (i[t.id] !== void 0) return i[t.id];
      let e;
      switch (t.type) {
        case "DirectionalLight":
          e = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new at(),
          };
          break;
        case "SpotLight":
          e = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new at(),
          };
          break;
        case "PointLight":
          e = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new at(),
            shadowCameraNear: 1,
            shadowCameraFar: 1e3,
          };
          break;
      }
      return ((i[t.id] = e), e);
    },
  };
}
let _0 = 0;
function v0(i, t) {
  return (
    (t.castShadow ? 2 : 0) -
    (i.castShadow ? 2 : 0) +
    (t.map ? 1 : 0) -
    (i.map ? 1 : 0)
  );
}
function x0(i) {
  const t = new m0(),
    e = g0(),
    n = {
      version: 0,
      hash: {
        directionalLength: -1,
        pointLength: -1,
        spotLength: -1,
        rectAreaLength: -1,
        hemiLength: -1,
        numDirectionalShadows: -1,
        numPointShadows: -1,
        numSpotShadows: -1,
        numSpotMaps: -1,
        numLightProbes: -1,
      },
      ambient: [0, 0, 0],
      probe: [],
      directional: [],
      directionalShadow: [],
      directionalShadowMap: [],
      directionalShadowMatrix: [],
      spot: [],
      spotLightMap: [],
      spotShadow: [],
      spotShadowMap: [],
      spotLightMatrix: [],
      rectArea: [],
      rectAreaLTC1: null,
      rectAreaLTC2: null,
      point: [],
      pointShadow: [],
      pointShadowMap: [],
      pointShadowMatrix: [],
      hemi: [],
      numSpotLightShadowsWithMaps: 0,
      numLightProbes: 0,
    };
  for (let l = 0; l < 9; l++) n.probe.push(new P());
  const s = new P(),
    r = new se(),
    o = new se();
  function a(l) {
    let h = 0,
      u = 0,
      d = 0;
    for (let y = 0; y < 9; y++) n.probe[y].set(0, 0, 0);
    let f = 0,
      m = 0,
      _ = 0,
      g = 0,
      p = 0,
      A = 0,
      b = 0,
      v = 0,
      R = 0,
      E = 0,
      C = 0;
    l.sort(v0);
    for (let y = 0, M = l.length; y < M; y++) {
      const w = l[y],
        I = w.color,
        F = w.intensity,
        B = w.distance,
        k = w.shadow && w.shadow.map ? w.shadow.map.texture : null;
      if (w.isAmbientLight) ((h += I.r * F), (u += I.g * F), (d += I.b * F));
      else if (w.isLightProbe) {
        for (let G = 0; G < 9; G++)
          n.probe[G].addScaledVector(w.sh.coefficients[G], F);
        C++;
      } else if (w.isDirectionalLight) {
        const G = t.get(w);
        if ((G.color.copy(w.color).multiplyScalar(w.intensity), w.castShadow)) {
          const Y = w.shadow,
            H = e.get(w);
          ((H.shadowIntensity = Y.intensity),
            (H.shadowBias = Y.bias),
            (H.shadowNormalBias = Y.normalBias),
            (H.shadowRadius = Y.radius),
            (H.shadowMapSize = Y.mapSize),
            (n.directionalShadow[f] = H),
            (n.directionalShadowMap[f] = k),
            (n.directionalShadowMatrix[f] = w.shadow.matrix),
            A++);
        }
        ((n.directional[f] = G), f++);
      } else if (w.isSpotLight) {
        const G = t.get(w);
        (G.position.setFromMatrixPosition(w.matrixWorld),
          G.color.copy(I).multiplyScalar(F),
          (G.distance = B),
          (G.coneCos = Math.cos(w.angle)),
          (G.penumbraCos = Math.cos(w.angle * (1 - w.penumbra))),
          (G.decay = w.decay),
          (n.spot[_] = G));
        const Y = w.shadow;
        if (
          (w.map &&
            ((n.spotLightMap[R] = w.map),
            R++,
            Y.updateMatrices(w),
            w.castShadow && E++),
          (n.spotLightMatrix[_] = Y.matrix),
          w.castShadow)
        ) {
          const H = e.get(w);
          ((H.shadowIntensity = Y.intensity),
            (H.shadowBias = Y.bias),
            (H.shadowNormalBias = Y.normalBias),
            (H.shadowRadius = Y.radius),
            (H.shadowMapSize = Y.mapSize),
            (n.spotShadow[_] = H),
            (n.spotShadowMap[_] = k),
            v++);
        }
        _++;
      } else if (w.isRectAreaLight) {
        const G = t.get(w);
        (G.color.copy(I).multiplyScalar(F),
          G.halfWidth.set(w.width * 0.5, 0, 0),
          G.halfHeight.set(0, w.height * 0.5, 0),
          (n.rectArea[g] = G),
          g++);
      } else if (w.isPointLight) {
        const G = t.get(w);
        if (
          (G.color.copy(w.color).multiplyScalar(w.intensity),
          (G.distance = w.distance),
          (G.decay = w.decay),
          w.castShadow)
        ) {
          const Y = w.shadow,
            H = e.get(w);
          ((H.shadowIntensity = Y.intensity),
            (H.shadowBias = Y.bias),
            (H.shadowNormalBias = Y.normalBias),
            (H.shadowRadius = Y.radius),
            (H.shadowMapSize = Y.mapSize),
            (H.shadowCameraNear = Y.camera.near),
            (H.shadowCameraFar = Y.camera.far),
            (n.pointShadow[m] = H),
            (n.pointShadowMap[m] = k),
            (n.pointShadowMatrix[m] = w.shadow.matrix),
            b++);
        }
        ((n.point[m] = G), m++);
      } else if (w.isHemisphereLight) {
        const G = t.get(w);
        (G.skyColor.copy(w.color).multiplyScalar(F),
          G.groundColor.copy(w.groundColor).multiplyScalar(F),
          (n.hemi[p] = G),
          p++);
      }
    }
    (g > 0 &&
      (i.has("OES_texture_float_linear") === !0
        ? ((n.rectAreaLTC1 = mt.LTC_FLOAT_1), (n.rectAreaLTC2 = mt.LTC_FLOAT_2))
        : ((n.rectAreaLTC1 = mt.LTC_HALF_1), (n.rectAreaLTC2 = mt.LTC_HALF_2))),
      (n.ambient[0] = h),
      (n.ambient[1] = u),
      (n.ambient[2] = d));
    const L = n.hash;
    (L.directionalLength !== f ||
      L.pointLength !== m ||
      L.spotLength !== _ ||
      L.rectAreaLength !== g ||
      L.hemiLength !== p ||
      L.numDirectionalShadows !== A ||
      L.numPointShadows !== b ||
      L.numSpotShadows !== v ||
      L.numSpotMaps !== R ||
      L.numLightProbes !== C) &&
      ((n.directional.length = f),
      (n.spot.length = _),
      (n.rectArea.length = g),
      (n.point.length = m),
      (n.hemi.length = p),
      (n.directionalShadow.length = A),
      (n.directionalShadowMap.length = A),
      (n.pointShadow.length = b),
      (n.pointShadowMap.length = b),
      (n.spotShadow.length = v),
      (n.spotShadowMap.length = v),
      (n.directionalShadowMatrix.length = A),
      (n.pointShadowMatrix.length = b),
      (n.spotLightMatrix.length = v + R - E),
      (n.spotLightMap.length = R),
      (n.numSpotLightShadowsWithMaps = E),
      (n.numLightProbes = C),
      (L.directionalLength = f),
      (L.pointLength = m),
      (L.spotLength = _),
      (L.rectAreaLength = g),
      (L.hemiLength = p),
      (L.numDirectionalShadows = A),
      (L.numPointShadows = b),
      (L.numSpotShadows = v),
      (L.numSpotMaps = R),
      (L.numLightProbes = C),
      (n.version = _0++));
  }
  function c(l, h) {
    let u = 0,
      d = 0,
      f = 0,
      m = 0,
      _ = 0;
    const g = h.matrixWorldInverse;
    for (let p = 0, A = l.length; p < A; p++) {
      const b = l[p];
      if (b.isDirectionalLight) {
        const v = n.directional[u];
        (v.direction.setFromMatrixPosition(b.matrixWorld),
          s.setFromMatrixPosition(b.target.matrixWorld),
          v.direction.sub(s),
          v.direction.transformDirection(g),
          u++);
      } else if (b.isSpotLight) {
        const v = n.spot[f];
        (v.position.setFromMatrixPosition(b.matrixWorld),
          v.position.applyMatrix4(g),
          v.direction.setFromMatrixPosition(b.matrixWorld),
          s.setFromMatrixPosition(b.target.matrixWorld),
          v.direction.sub(s),
          v.direction.transformDirection(g),
          f++);
      } else if (b.isRectAreaLight) {
        const v = n.rectArea[m];
        (v.position.setFromMatrixPosition(b.matrixWorld),
          v.position.applyMatrix4(g),
          o.identity(),
          r.copy(b.matrixWorld),
          r.premultiply(g),
          o.extractRotation(r),
          v.halfWidth.set(b.width * 0.5, 0, 0),
          v.halfHeight.set(0, b.height * 0.5, 0),
          v.halfWidth.applyMatrix4(o),
          v.halfHeight.applyMatrix4(o),
          m++);
      } else if (b.isPointLight) {
        const v = n.point[d];
        (v.position.setFromMatrixPosition(b.matrixWorld),
          v.position.applyMatrix4(g),
          d++);
      } else if (b.isHemisphereLight) {
        const v = n.hemi[_];
        (v.direction.setFromMatrixPosition(b.matrixWorld),
          v.direction.transformDirection(g),
          _++);
      }
    }
  }
  return { setup: a, setupView: c, state: n };
}
function El(i) {
  const t = new x0(i),
    e = [],
    n = [];
  function s(h) {
    ((l.camera = h), (e.length = 0), (n.length = 0));
  }
  function r(h) {
    e.push(h);
  }
  function o(h) {
    n.push(h);
  }
  function a() {
    t.setup(e);
  }
  function c(h) {
    t.setupView(e, h);
  }
  const l = {
    lightsArray: e,
    shadowsArray: n,
    camera: null,
    lights: t,
    transmissionRenderTarget: {},
  };
  return {
    init: s,
    state: l,
    setupLights: a,
    setupLightsView: c,
    pushLight: r,
    pushShadow: o,
  };
}
function y0(i) {
  let t = new WeakMap();
  function e(s, r = 0) {
    const o = t.get(s);
    let a;
    return (
      o === void 0
        ? ((a = new El(i)), t.set(s, [a]))
        : r >= o.length
          ? ((a = new El(i)), o.push(a))
          : (a = o[r]),
      a
    );
  }
  function n() {
    t = new WeakMap();
  }
  return { get: e, dispose: n };
}
const M0 = `void main() {
	gl_Position = vec4( position, 1.0 );
}`,
  S0 = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;
function b0(i, t, e) {
  let n = new qa();
  const s = new at(),
    r = new at(),
    o = new Ee(),
    a = new Wd({ depthPacking: bu }),
    c = new Xd(),
    l = {},
    h = e.maxTextureSize,
    u = { [ii]: $e, [$e]: ii, [_n]: _n },
    d = new Vn({
      defines: { VSM_SAMPLES: 8 },
      uniforms: {
        shadow_pass: { value: null },
        resolution: { value: new at() },
        radius: { value: 4 },
      },
      vertexShader: M0,
      fragmentShader: S0,
    }),
    f = d.clone();
  f.defines.HORIZONTAL_PASS = 1;
  const m = new ve();
  m.setAttribute(
    "position",
    new pe(new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]), 3),
  );
  const _ = new he(m, d),
    g = this;
  ((this.enabled = !1),
    (this.autoUpdate = !0),
    (this.needsUpdate = !1),
    (this.type = Ua));
  let p = this.type;
  this.render = function (E, C, L) {
    if (
      g.enabled === !1 ||
      (g.autoUpdate === !1 && g.needsUpdate === !1) ||
      E.length === 0
    )
      return;
    const y = i.getRenderTarget(),
      M = i.getActiveCubeFace(),
      w = i.getActiveMipmapLevel(),
      I = i.state;
    (I.setBlending(ti),
      I.buffers.depth.getReversed() === !0
        ? I.buffers.color.setClear(0, 0, 0, 0)
        : I.buffers.color.setClear(1, 1, 1, 1),
      I.buffers.depth.setTest(!0),
      I.setScissorTest(!1));
    const F = p !== Un && this.type === Un,
      B = p === Un && this.type !== Un;
    for (let k = 0, G = E.length; k < G; k++) {
      const Y = E[k],
        H = Y.shadow;
      if (H === void 0) {
        console.warn("THREE.WebGLShadowMap:", Y, "has no shadow.");
        continue;
      }
      if (H.autoUpdate === !1 && H.needsUpdate === !1) continue;
      s.copy(H.mapSize);
      const ct = H.getFrameExtents();
      if (
        (s.multiply(ct),
        r.copy(H.mapSize),
        (s.x > h || s.y > h) &&
          (s.x > h &&
            ((r.x = Math.floor(h / ct.x)),
            (s.x = r.x * ct.x),
            (H.mapSize.x = r.x)),
          s.y > h &&
            ((r.y = Math.floor(h / ct.y)),
            (s.y = r.y * ct.y),
            (H.mapSize.y = r.y))),
        H.map === null || F === !0 || B === !0)
      ) {
        const gt = this.type !== Un ? { minFilter: on, magFilter: on } : {};
        (H.map !== null && H.map.dispose(),
          (H.map = new Gn(s.x, s.y, gt)),
          (H.map.texture.name = Y.name + ".shadowMap"),
          H.camera.updateProjectionMatrix());
      }
      (i.setRenderTarget(H.map), i.clear());
      const pt = H.getViewportCount();
      for (let gt = 0; gt < pt; gt++) {
        const Lt = H.getViewport(gt);
        (o.set(r.x * Lt.x, r.y * Lt.y, r.x * Lt.z, r.y * Lt.w),
          I.viewport(o),
          H.updateMatrices(Y, gt),
          (n = H.getFrustum()),
          v(C, L, H.camera, Y, this.type));
      }
      (H.isPointLightShadow !== !0 && this.type === Un && A(H, L),
        (H.needsUpdate = !1));
    }
    ((p = this.type), (g.needsUpdate = !1), i.setRenderTarget(y, M, w));
  };
  function A(E, C) {
    const L = t.update(_);
    (d.defines.VSM_SAMPLES !== E.blurSamples &&
      ((d.defines.VSM_SAMPLES = E.blurSamples),
      (f.defines.VSM_SAMPLES = E.blurSamples),
      (d.needsUpdate = !0),
      (f.needsUpdate = !0)),
      E.mapPass === null && (E.mapPass = new Gn(s.x, s.y)),
      (d.uniforms.shadow_pass.value = E.map.texture),
      (d.uniforms.resolution.value = E.mapSize),
      (d.uniforms.radius.value = E.radius),
      i.setRenderTarget(E.mapPass),
      i.clear(),
      i.renderBufferDirect(C, null, L, d, _, null),
      (f.uniforms.shadow_pass.value = E.mapPass.texture),
      (f.uniforms.resolution.value = E.mapSize),
      (f.uniforms.radius.value = E.radius),
      i.setRenderTarget(E.map),
      i.clear(),
      i.renderBufferDirect(C, null, L, f, _, null));
  }
  function b(E, C, L, y) {
    let M = null;
    const w =
      L.isPointLight === !0 ? E.customDistanceMaterial : E.customDepthMaterial;
    if (w !== void 0) M = w;
    else if (
      ((M = L.isPointLight === !0 ? c : a),
      (i.localClippingEnabled &&
        C.clipShadows === !0 &&
        Array.isArray(C.clippingPlanes) &&
        C.clippingPlanes.length !== 0) ||
        (C.displacementMap && C.displacementScale !== 0) ||
        (C.alphaMap && C.alphaTest > 0) ||
        (C.map && C.alphaTest > 0) ||
        C.alphaToCoverage === !0)
    ) {
      const I = M.uuid,
        F = C.uuid;
      let B = l[I];
      B === void 0 && ((B = {}), (l[I] = B));
      let k = B[F];
      (k === void 0 &&
        ((k = M.clone()), (B[F] = k), C.addEventListener("dispose", R)),
        (M = k));
    }
    if (
      ((M.visible = C.visible),
      (M.wireframe = C.wireframe),
      y === Un
        ? (M.side = C.shadowSide !== null ? C.shadowSide : C.side)
        : (M.side = C.shadowSide !== null ? C.shadowSide : u[C.side]),
      (M.alphaMap = C.alphaMap),
      (M.alphaTest = C.alphaToCoverage === !0 ? 0.5 : C.alphaTest),
      (M.map = C.map),
      (M.clipShadows = C.clipShadows),
      (M.clippingPlanes = C.clippingPlanes),
      (M.clipIntersection = C.clipIntersection),
      (M.displacementMap = C.displacementMap),
      (M.displacementScale = C.displacementScale),
      (M.displacementBias = C.displacementBias),
      (M.wireframeLinewidth = C.wireframeLinewidth),
      (M.linewidth = C.linewidth),
      L.isPointLight === !0 && M.isMeshDistanceMaterial === !0)
    ) {
      const I = i.properties.get(M);
      I.light = L;
    }
    return M;
  }
  function v(E, C, L, y, M) {
    if (E.visible === !1) return;
    if (
      E.layers.test(C.layers) &&
      (E.isMesh || E.isLine || E.isPoints) &&
      (E.castShadow || (E.receiveShadow && M === Un)) &&
      (!E.frustumCulled || n.intersectsObject(E))
    ) {
      E.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse, E.matrixWorld);
      const F = t.update(E),
        B = E.material;
      if (Array.isArray(B)) {
        const k = F.groups;
        for (let G = 0, Y = k.length; G < Y; G++) {
          const H = k[G],
            ct = B[H.materialIndex];
          if (ct && ct.visible) {
            const pt = b(E, ct, y, M);
            (E.onBeforeShadow(i, E, C, L, F, pt, H),
              i.renderBufferDirect(L, null, F, pt, E, H),
              E.onAfterShadow(i, E, C, L, F, pt, H));
          }
        }
      } else if (B.visible) {
        const k = b(E, B, y, M);
        (E.onBeforeShadow(i, E, C, L, F, k, null),
          i.renderBufferDirect(L, null, F, k, E, null),
          E.onAfterShadow(i, E, C, L, F, k, null));
      }
    }
    const I = E.children;
    for (let F = 0, B = I.length; F < B; F++) v(I[F], C, L, y, M);
  }
  function R(E) {
    E.target.removeEventListener("dispose", R);
    for (const L in l) {
      const y = l[L],
        M = E.target.uuid;
      M in y && (y[M].dispose(), delete y[M]);
    }
  }
}
const E0 = {
  [No]: Fo,
  [Oo]: Bo,
  [zo]: Ho,
  [Qi]: ko,
  [Fo]: No,
  [Bo]: Oo,
  [Ho]: zo,
  [ko]: Qi,
};
function w0(i, t) {
  function e() {
    let U = !1;
    const lt = new Ee();
    let ft = null;
    const bt = new Ee(0, 0, 0, 0);
    return {
      setMask: function (rt) {
        ft !== rt && !U && (i.colorMask(rt, rt, rt, rt), (ft = rt));
      },
      setLocked: function (rt) {
        U = rt;
      },
      setClear: function (rt, Q, Rt, Bt, ge) {
        (ge === !0 && ((rt *= Bt), (Q *= Bt), (Rt *= Bt)),
          lt.set(rt, Q, Rt, Bt),
          bt.equals(lt) === !1 && (i.clearColor(rt, Q, Rt, Bt), bt.copy(lt)));
      },
      reset: function () {
        ((U = !1), (ft = null), bt.set(-1, 0, 0, 0));
      },
    };
  }
  function n() {
    let U = !1,
      lt = !1,
      ft = null,
      bt = null,
      rt = null;
    return {
      setReversed: function (Q) {
        if (lt !== Q) {
          const Rt = t.get("EXT_clip_control");
          (Q
            ? Rt.clipControlEXT(Rt.LOWER_LEFT_EXT, Rt.ZERO_TO_ONE_EXT)
            : Rt.clipControlEXT(Rt.LOWER_LEFT_EXT, Rt.NEGATIVE_ONE_TO_ONE_EXT),
            (lt = Q));
          const Bt = rt;
          ((rt = null), this.setClear(Bt));
        }
      },
      getReversed: function () {
        return lt;
      },
      setTest: function (Q) {
        Q ? nt(i.DEPTH_TEST) : St(i.DEPTH_TEST);
      },
      setMask: function (Q) {
        ft !== Q && !U && (i.depthMask(Q), (ft = Q));
      },
      setFunc: function (Q) {
        if ((lt && (Q = E0[Q]), bt !== Q)) {
          switch (Q) {
            case No:
              i.depthFunc(i.NEVER);
              break;
            case Fo:
              i.depthFunc(i.ALWAYS);
              break;
            case Oo:
              i.depthFunc(i.LESS);
              break;
            case Qi:
              i.depthFunc(i.LEQUAL);
              break;
            case zo:
              i.depthFunc(i.EQUAL);
              break;
            case ko:
              i.depthFunc(i.GEQUAL);
              break;
            case Bo:
              i.depthFunc(i.GREATER);
              break;
            case Ho:
              i.depthFunc(i.NOTEQUAL);
              break;
            default:
              i.depthFunc(i.LEQUAL);
          }
          bt = Q;
        }
      },
      setLocked: function (Q) {
        U = Q;
      },
      setClear: function (Q) {
        rt !== Q && (lt && (Q = 1 - Q), i.clearDepth(Q), (rt = Q));
      },
      reset: function () {
        ((U = !1), (ft = null), (bt = null), (rt = null), (lt = !1));
      },
    };
  }
  function s() {
    let U = !1,
      lt = null,
      ft = null,
      bt = null,
      rt = null,
      Q = null,
      Rt = null,
      Bt = null,
      ge = null;
    return {
      setTest: function (ne) {
        U || (ne ? nt(i.STENCIL_TEST) : St(i.STENCIL_TEST));
      },
      setMask: function (ne) {
        lt !== ne && !U && (i.stencilMask(ne), (lt = ne));
      },
      setFunc: function (ne, Rn, Sn) {
        (ft !== ne || bt !== Rn || rt !== Sn) &&
          (i.stencilFunc(ne, Rn, Sn), (ft = ne), (bt = Rn), (rt = Sn));
      },
      setOp: function (ne, Rn, Sn) {
        (Q !== ne || Rt !== Rn || Bt !== Sn) &&
          (i.stencilOp(ne, Rn, Sn), (Q = ne), (Rt = Rn), (Bt = Sn));
      },
      setLocked: function (ne) {
        U = ne;
      },
      setClear: function (ne) {
        ge !== ne && (i.clearStencil(ne), (ge = ne));
      },
      reset: function () {
        ((U = !1),
          (lt = null),
          (ft = null),
          (bt = null),
          (rt = null),
          (Q = null),
          (Rt = null),
          (Bt = null),
          (ge = null));
      },
    };
  }
  const r = new e(),
    o = new n(),
    a = new s(),
    c = new WeakMap(),
    l = new WeakMap();
  let h = {},
    u = {},
    d = new WeakMap(),
    f = [],
    m = null,
    _ = !1,
    g = null,
    p = null,
    A = null,
    b = null,
    v = null,
    R = null,
    E = null,
    C = new Ht(0, 0, 0),
    L = 0,
    y = !1,
    M = null,
    w = null,
    I = null,
    F = null,
    B = null;
  const k = i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let G = !1,
    Y = 0;
  const H = i.getParameter(i.VERSION);
  H.indexOf("WebGL") !== -1
    ? ((Y = parseFloat(/^WebGL (\d)/.exec(H)[1])), (G = Y >= 1))
    : H.indexOf("OpenGL ES") !== -1 &&
      ((Y = parseFloat(/^OpenGL ES (\d)/.exec(H)[1])), (G = Y >= 2));
  let ct = null,
    pt = {};
  const gt = i.getParameter(i.SCISSOR_BOX),
    Lt = i.getParameter(i.VIEWPORT),
    $t = new Ee().fromArray(gt),
    re = new Ee().fromArray(Lt);
  function Jt(U, lt, ft, bt) {
    const rt = new Uint8Array(4),
      Q = i.createTexture();
    (i.bindTexture(U, Q),
      i.texParameteri(U, i.TEXTURE_MIN_FILTER, i.NEAREST),
      i.texParameteri(U, i.TEXTURE_MAG_FILTER, i.NEAREST));
    for (let Rt = 0; Rt < ft; Rt++)
      U === i.TEXTURE_3D || U === i.TEXTURE_2D_ARRAY
        ? i.texImage3D(lt, 0, i.RGBA, 1, 1, bt, 0, i.RGBA, i.UNSIGNED_BYTE, rt)
        : i.texImage2D(
            lt + Rt,
            0,
            i.RGBA,
            1,
            1,
            0,
            i.RGBA,
            i.UNSIGNED_BYTE,
            rt,
          );
    return Q;
  }
  const Z = {};
  ((Z[i.TEXTURE_2D] = Jt(i.TEXTURE_2D, i.TEXTURE_2D, 1)),
    (Z[i.TEXTURE_CUBE_MAP] = Jt(
      i.TEXTURE_CUBE_MAP,
      i.TEXTURE_CUBE_MAP_POSITIVE_X,
      6,
    )),
    (Z[i.TEXTURE_2D_ARRAY] = Jt(i.TEXTURE_2D_ARRAY, i.TEXTURE_2D_ARRAY, 1, 1)),
    (Z[i.TEXTURE_3D] = Jt(i.TEXTURE_3D, i.TEXTURE_3D, 1, 1)),
    r.setClear(0, 0, 0, 1),
    o.setClear(1),
    a.setClear(0),
    nt(i.DEPTH_TEST),
    o.setFunc(Qi),
    $(!1),
    j(gc),
    nt(i.CULL_FACE),
    et(ti));
  function nt(U) {
    h[U] !== !0 && (i.enable(U), (h[U] = !0));
  }
  function St(U) {
    h[U] !== !1 && (i.disable(U), (h[U] = !1));
  }
  function Dt(U, lt) {
    return u[U] !== lt
      ? (i.bindFramebuffer(U, lt),
        (u[U] = lt),
        U === i.DRAW_FRAMEBUFFER && (u[i.FRAMEBUFFER] = lt),
        U === i.FRAMEBUFFER && (u[i.DRAW_FRAMEBUFFER] = lt),
        !0)
      : !1;
  }
  function wt(U, lt) {
    let ft = f,
      bt = !1;
    if (U) {
      ((ft = d.get(lt)), ft === void 0 && ((ft = []), d.set(lt, ft)));
      const rt = U.textures;
      if (ft.length !== rt.length || ft[0] !== i.COLOR_ATTACHMENT0) {
        for (let Q = 0, Rt = rt.length; Q < Rt; Q++)
          ft[Q] = i.COLOR_ATTACHMENT0 + Q;
        ((ft.length = rt.length), (bt = !0));
      }
    } else ft[0] !== i.BACK && ((ft[0] = i.BACK), (bt = !0));
    bt && i.drawBuffers(ft);
  }
  function Zt(U) {
    return m !== U ? (i.useProgram(U), (m = U), !0) : !1;
  }
  const me = {
    [gi]: i.FUNC_ADD,
    [Zh]: i.FUNC_SUBTRACT,
    [jh]: i.FUNC_REVERSE_SUBTRACT,
  };
  ((me[$h] = i.MIN), (me[Jh] = i.MAX));
  const D = {
    [Qh]: i.ZERO,
    [tu]: i.ONE,
    [eu]: i.SRC_COLOR,
    [Io]: i.SRC_ALPHA,
    [au]: i.SRC_ALPHA_SATURATE,
    [ru]: i.DST_COLOR,
    [iu]: i.DST_ALPHA,
    [nu]: i.ONE_MINUS_SRC_COLOR,
    [Uo]: i.ONE_MINUS_SRC_ALPHA,
    [ou]: i.ONE_MINUS_DST_COLOR,
    [su]: i.ONE_MINUS_DST_ALPHA,
    [cu]: i.CONSTANT_COLOR,
    [lu]: i.ONE_MINUS_CONSTANT_COLOR,
    [hu]: i.CONSTANT_ALPHA,
    [uu]: i.ONE_MINUS_CONSTANT_ALPHA,
  };
  function et(U, lt, ft, bt, rt, Q, Rt, Bt, ge, ne) {
    if (U === ti) {
      _ === !0 && (St(i.BLEND), (_ = !1));
      return;
    }
    if ((_ === !1 && (nt(i.BLEND), (_ = !0)), U !== Kh)) {
      if (U !== g || ne !== y) {
        if (
          ((p !== gi || v !== gi) &&
            (i.blendEquation(i.FUNC_ADD), (p = gi), (v = gi)),
          ne)
        )
          switch (U) {
            case ji:
              i.blendFuncSeparate(
                i.ONE,
                i.ONE_MINUS_SRC_ALPHA,
                i.ONE,
                i.ONE_MINUS_SRC_ALPHA,
              );
              break;
            case _c:
              i.blendFunc(i.ONE, i.ONE);
              break;
            case vc:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case xc:
              i.blendFuncSeparate(
                i.DST_COLOR,
                i.ONE_MINUS_SRC_ALPHA,
                i.ZERO,
                i.ONE,
              );
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", U);
              break;
          }
        else
          switch (U) {
            case ji:
              i.blendFuncSeparate(
                i.SRC_ALPHA,
                i.ONE_MINUS_SRC_ALPHA,
                i.ONE,
                i.ONE_MINUS_SRC_ALPHA,
              );
              break;
            case _c:
              i.blendFuncSeparate(i.SRC_ALPHA, i.ONE, i.ONE, i.ONE);
              break;
            case vc:
              console.error(
                "THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true",
              );
              break;
            case xc:
              console.error(
                "THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true",
              );
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", U);
              break;
          }
        ((A = null),
          (b = null),
          (R = null),
          (E = null),
          C.set(0, 0, 0),
          (L = 0),
          (g = U),
          (y = ne));
      }
      return;
    }
    ((rt = rt || lt),
      (Q = Q || ft),
      (Rt = Rt || bt),
      (lt !== p || rt !== v) &&
        (i.blendEquationSeparate(me[lt], me[rt]), (p = lt), (v = rt)),
      (ft !== A || bt !== b || Q !== R || Rt !== E) &&
        (i.blendFuncSeparate(D[ft], D[bt], D[Q], D[Rt]),
        (A = ft),
        (b = bt),
        (R = Q),
        (E = Rt)),
      (Bt.equals(C) === !1 || ge !== L) &&
        (i.blendColor(Bt.r, Bt.g, Bt.b, ge), C.copy(Bt), (L = ge)),
      (g = U),
      (y = !1));
  }
  function J(U, lt) {
    U.side === _n ? St(i.CULL_FACE) : nt(i.CULL_FACE);
    let ft = U.side === $e;
    (lt && (ft = !ft),
      $(ft),
      U.blending === ji && U.transparent === !1
        ? et(ti)
        : et(
            U.blending,
            U.blendEquation,
            U.blendSrc,
            U.blendDst,
            U.blendEquationAlpha,
            U.blendSrcAlpha,
            U.blendDstAlpha,
            U.blendColor,
            U.blendAlpha,
            U.premultipliedAlpha,
          ),
      o.setFunc(U.depthFunc),
      o.setTest(U.depthTest),
      o.setMask(U.depthWrite),
      r.setMask(U.colorWrite));
    const bt = U.stencilWrite;
    (a.setTest(bt),
      bt &&
        (a.setMask(U.stencilWriteMask),
        a.setFunc(U.stencilFunc, U.stencilRef, U.stencilFuncMask),
        a.setOp(U.stencilFail, U.stencilZFail, U.stencilZPass)),
      it(U.polygonOffset, U.polygonOffsetFactor, U.polygonOffsetUnits),
      U.alphaToCoverage === !0
        ? nt(i.SAMPLE_ALPHA_TO_COVERAGE)
        : St(i.SAMPLE_ALPHA_TO_COVERAGE));
  }
  function $(U) {
    M !== U && (U ? i.frontFace(i.CW) : i.frontFace(i.CCW), (M = U));
  }
  function j(U) {
    (U !== Xh
      ? (nt(i.CULL_FACE),
        U !== w &&
          (U === gc
            ? i.cullFace(i.BACK)
            : U === qh
              ? i.cullFace(i.FRONT)
              : i.cullFace(i.FRONT_AND_BACK)))
      : St(i.CULL_FACE),
      (w = U));
  }
  function ut(U) {
    U !== I && (G && i.lineWidth(U), (I = U));
  }
  function it(U, lt, ft) {
    U
      ? (nt(i.POLYGON_OFFSET_FILL),
        (F !== lt || B !== ft) && (i.polygonOffset(lt, ft), (F = lt), (B = ft)))
      : St(i.POLYGON_OFFSET_FILL);
  }
  function dt(U) {
    U ? nt(i.SCISSOR_TEST) : St(i.SCISSOR_TEST);
  }
  function kt(U) {
    (U === void 0 && (U = i.TEXTURE0 + k - 1),
      ct !== U && (i.activeTexture(U), (ct = U)));
  }
  function zt(U, lt, ft) {
    ft === void 0 && (ct === null ? (ft = i.TEXTURE0 + k - 1) : (ft = ct));
    let bt = pt[ft];
    (bt === void 0 && ((bt = { type: void 0, texture: void 0 }), (pt[ft] = bt)),
      (bt.type !== U || bt.texture !== lt) &&
        (ct !== ft && (i.activeTexture(ft), (ct = ft)),
        i.bindTexture(U, lt || Z[U]),
        (bt.type = U),
        (bt.texture = lt)));
  }
  function T() {
    const U = pt[ct];
    U !== void 0 &&
      U.type !== void 0 &&
      (i.bindTexture(U.type, null), (U.type = void 0), (U.texture = void 0));
  }
  function x() {
    try {
      i.compressedTexImage2D(...arguments);
    } catch (U) {
      console.error("THREE.WebGLState:", U);
    }
  }
  function z() {
    try {
      i.compressedTexImage3D(...arguments);
    } catch (U) {
      console.error("THREE.WebGLState:", U);
    }
  }
  function X() {
    try {
      i.texSubImage2D(...arguments);
    } catch (U) {
      console.error("THREE.WebGLState:", U);
    }
  }
  function tt() {
    try {
      i.texSubImage3D(...arguments);
    } catch (U) {
      console.error("THREE.WebGLState:", U);
    }
  }
  function q() {
    try {
      i.compressedTexSubImage2D(...arguments);
    } catch (U) {
      console.error("THREE.WebGLState:", U);
    }
  }
  function Ct() {
    try {
      i.compressedTexSubImage3D(...arguments);
    } catch (U) {
      console.error("THREE.WebGLState:", U);
    }
  }
  function ht() {
    try {
      i.texStorage2D(...arguments);
    } catch (U) {
      console.error("THREE.WebGLState:", U);
    }
  }
  function Tt() {
    try {
      i.texStorage3D(...arguments);
    } catch (U) {
      console.error("THREE.WebGLState:", U);
    }
  }
  function At() {
    try {
      i.texImage2D(...arguments);
    } catch (U) {
      console.error("THREE.WebGLState:", U);
    }
  }
  function st() {
    try {
      i.texImage3D(...arguments);
    } catch (U) {
      console.error("THREE.WebGLState:", U);
    }
  }
  function xt(U) {
    $t.equals(U) === !1 && (i.scissor(U.x, U.y, U.z, U.w), $t.copy(U));
  }
  function Ft(U) {
    re.equals(U) === !1 && (i.viewport(U.x, U.y, U.z, U.w), re.copy(U));
  }
  function Pt(U, lt) {
    let ft = l.get(lt);
    ft === void 0 && ((ft = new WeakMap()), l.set(lt, ft));
    let bt = ft.get(U);
    bt === void 0 && ((bt = i.getUniformBlockIndex(lt, U.name)), ft.set(U, bt));
  }
  function _t(U, lt) {
    const bt = l.get(lt).get(U);
    c.get(lt) !== bt &&
      (i.uniformBlockBinding(lt, bt, U.__bindingPointIndex), c.set(lt, bt));
  }
  function Gt() {
    (i.disable(i.BLEND),
      i.disable(i.CULL_FACE),
      i.disable(i.DEPTH_TEST),
      i.disable(i.POLYGON_OFFSET_FILL),
      i.disable(i.SCISSOR_TEST),
      i.disable(i.STENCIL_TEST),
      i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),
      i.blendEquation(i.FUNC_ADD),
      i.blendFunc(i.ONE, i.ZERO),
      i.blendFuncSeparate(i.ONE, i.ZERO, i.ONE, i.ZERO),
      i.blendColor(0, 0, 0, 0),
      i.colorMask(!0, !0, !0, !0),
      i.clearColor(0, 0, 0, 0),
      i.depthMask(!0),
      i.depthFunc(i.LESS),
      o.setReversed(!1),
      i.clearDepth(1),
      i.stencilMask(4294967295),
      i.stencilFunc(i.ALWAYS, 0, 4294967295),
      i.stencilOp(i.KEEP, i.KEEP, i.KEEP),
      i.clearStencil(0),
      i.cullFace(i.BACK),
      i.frontFace(i.CCW),
      i.polygonOffset(0, 0),
      i.activeTexture(i.TEXTURE0),
      i.bindFramebuffer(i.FRAMEBUFFER, null),
      i.bindFramebuffer(i.DRAW_FRAMEBUFFER, null),
      i.bindFramebuffer(i.READ_FRAMEBUFFER, null),
      i.useProgram(null),
      i.lineWidth(1),
      i.scissor(0, 0, i.canvas.width, i.canvas.height),
      i.viewport(0, 0, i.canvas.width, i.canvas.height),
      (h = {}),
      (ct = null),
      (pt = {}),
      (u = {}),
      (d = new WeakMap()),
      (f = []),
      (m = null),
      (_ = !1),
      (g = null),
      (p = null),
      (A = null),
      (b = null),
      (v = null),
      (R = null),
      (E = null),
      (C = new Ht(0, 0, 0)),
      (L = 0),
      (y = !1),
      (M = null),
      (w = null),
      (I = null),
      (F = null),
      (B = null),
      $t.set(0, 0, i.canvas.width, i.canvas.height),
      re.set(0, 0, i.canvas.width, i.canvas.height),
      r.reset(),
      o.reset(),
      a.reset());
  }
  return {
    buffers: { color: r, depth: o, stencil: a },
    enable: nt,
    disable: St,
    bindFramebuffer: Dt,
    drawBuffers: wt,
    useProgram: Zt,
    setBlending: et,
    setMaterial: J,
    setFlipSided: $,
    setCullFace: j,
    setLineWidth: ut,
    setPolygonOffset: it,
    setScissorTest: dt,
    activeTexture: kt,
    bindTexture: zt,
    unbindTexture: T,
    compressedTexImage2D: x,
    compressedTexImage3D: z,
    texImage2D: At,
    texImage3D: st,
    updateUBOMapping: Pt,
    uniformBlockBinding: _t,
    texStorage2D: ht,
    texStorage3D: Tt,
    texSubImage2D: X,
    texSubImage3D: tt,
    compressedTexSubImage2D: q,
    compressedTexSubImage3D: Ct,
    scissor: xt,
    viewport: Ft,
    reset: Gt,
  };
}
function T0(i, t, e, n, s, r, o) {
  const a = t.has("WEBGL_multisampled_render_to_texture")
      ? t.get("WEBGL_multisampled_render_to_texture")
      : null,
    c =
      typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent),
    l = new at(),
    h = new WeakMap();
  let u;
  const d = new WeakMap();
  let f = !1;
  try {
    f =
      typeof OffscreenCanvas < "u" &&
      new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {}
  function m(T, x) {
    return f ? new OffscreenCanvas(T, x) : Tr("canvas");
  }
  function _(T, x, z) {
    let X = 1;
    const tt = zt(T);
    if (
      ((tt.width > z || tt.height > z) &&
        (X = z / Math.max(tt.width, tt.height)),
      X < 1)
    )
      if (
        (typeof HTMLImageElement < "u" && T instanceof HTMLImageElement) ||
        (typeof HTMLCanvasElement < "u" && T instanceof HTMLCanvasElement) ||
        (typeof ImageBitmap < "u" && T instanceof ImageBitmap) ||
        (typeof VideoFrame < "u" && T instanceof VideoFrame)
      ) {
        const q = Math.floor(X * tt.width),
          Ct = Math.floor(X * tt.height);
        u === void 0 && (u = m(q, Ct));
        const ht = x ? m(q, Ct) : u;
        return (
          (ht.width = q),
          (ht.height = Ct),
          ht.getContext("2d").drawImage(T, 0, 0, q, Ct),
          console.warn(
            "THREE.WebGLRenderer: Texture has been resized from (" +
              tt.width +
              "x" +
              tt.height +
              ") to (" +
              q +
              "x" +
              Ct +
              ").",
          ),
          ht
        );
      } else
        return (
          "data" in T &&
            console.warn(
              "THREE.WebGLRenderer: Image in DataTexture is too big (" +
                tt.width +
                "x" +
                tt.height +
                ").",
            ),
          T
        );
    return T;
  }
  function g(T) {
    return T.generateMipmaps;
  }
  function p(T) {
    i.generateMipmap(T);
  }
  function A(T) {
    return T.isWebGLCubeRenderTarget
      ? i.TEXTURE_CUBE_MAP
      : T.isWebGL3DRenderTarget
        ? i.TEXTURE_3D
        : T.isWebGLArrayRenderTarget || T.isCompressedArrayTexture
          ? i.TEXTURE_2D_ARRAY
          : i.TEXTURE_2D;
  }
  function b(T, x, z, X, tt = !1) {
    if (T !== null) {
      if (i[T] !== void 0) return i[T];
      console.warn(
        "THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" +
          T +
          "'",
      );
    }
    let q = x;
    if (
      (x === i.RED &&
        (z === i.FLOAT && (q = i.R32F),
        z === i.HALF_FLOAT && (q = i.R16F),
        z === i.UNSIGNED_BYTE && (q = i.R8)),
      x === i.RED_INTEGER &&
        (z === i.UNSIGNED_BYTE && (q = i.R8UI),
        z === i.UNSIGNED_SHORT && (q = i.R16UI),
        z === i.UNSIGNED_INT && (q = i.R32UI),
        z === i.BYTE && (q = i.R8I),
        z === i.SHORT && (q = i.R16I),
        z === i.INT && (q = i.R32I)),
      x === i.RG &&
        (z === i.FLOAT && (q = i.RG32F),
        z === i.HALF_FLOAT && (q = i.RG16F),
        z === i.UNSIGNED_BYTE && (q = i.RG8)),
      x === i.RG_INTEGER &&
        (z === i.UNSIGNED_BYTE && (q = i.RG8UI),
        z === i.UNSIGNED_SHORT && (q = i.RG16UI),
        z === i.UNSIGNED_INT && (q = i.RG32UI),
        z === i.BYTE && (q = i.RG8I),
        z === i.SHORT && (q = i.RG16I),
        z === i.INT && (q = i.RG32I)),
      x === i.RGB_INTEGER &&
        (z === i.UNSIGNED_BYTE && (q = i.RGB8UI),
        z === i.UNSIGNED_SHORT && (q = i.RGB16UI),
        z === i.UNSIGNED_INT && (q = i.RGB32UI),
        z === i.BYTE && (q = i.RGB8I),
        z === i.SHORT && (q = i.RGB16I),
        z === i.INT && (q = i.RGB32I)),
      x === i.RGBA_INTEGER &&
        (z === i.UNSIGNED_BYTE && (q = i.RGBA8UI),
        z === i.UNSIGNED_SHORT && (q = i.RGBA16UI),
        z === i.UNSIGNED_INT && (q = i.RGBA32UI),
        z === i.BYTE && (q = i.RGBA8I),
        z === i.SHORT && (q = i.RGBA16I),
        z === i.INT && (q = i.RGBA32I)),
      x === i.RGB &&
        (z === i.UNSIGNED_INT_5_9_9_9_REV && (q = i.RGB9_E5),
        z === i.UNSIGNED_INT_10F_11F_11F_REV && (q = i.R11F_G11F_B10F)),
      x === i.RGBA)
    ) {
      const Ct = tt ? Er : ee.getTransfer(X);
      (z === i.FLOAT && (q = i.RGBA32F),
        z === i.HALF_FLOAT && (q = i.RGBA16F),
        z === i.UNSIGNED_BYTE && (q = Ct === ce ? i.SRGB8_ALPHA8 : i.RGBA8),
        z === i.UNSIGNED_SHORT_4_4_4_4 && (q = i.RGBA4),
        z === i.UNSIGNED_SHORT_5_5_5_1 && (q = i.RGB5_A1));
    }
    return (
      (q === i.R16F ||
        q === i.R32F ||
        q === i.RG16F ||
        q === i.RG32F ||
        q === i.RGBA16F ||
        q === i.RGBA32F) &&
        t.get("EXT_color_buffer_float"),
      q
    );
  }
  function v(T, x) {
    let z;
    return (
      T
        ? x === null || x === si || x === Ts
          ? (z = i.DEPTH24_STENCIL8)
          : x === En
            ? (z = i.DEPTH32F_STENCIL8)
            : x === ws &&
              ((z = i.DEPTH24_STENCIL8),
              console.warn(
                "DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.",
              ))
        : x === null || x === si || x === Ts
          ? (z = i.DEPTH_COMPONENT24)
          : x === En
            ? (z = i.DEPTH_COMPONENT32F)
            : x === ws && (z = i.DEPTH_COMPONENT16),
      z
    );
  }
  function R(T, x) {
    return g(T) === !0 ||
      (T.isFramebufferTexture && T.minFilter !== on && T.minFilter !== Ze)
      ? Math.log2(Math.max(x.width, x.height)) + 1
      : T.mipmaps !== void 0 && T.mipmaps.length > 0
        ? T.mipmaps.length
        : T.isCompressedTexture && Array.isArray(T.image)
          ? x.mipmaps.length
          : 1;
  }
  function E(T) {
    const x = T.target;
    (x.removeEventListener("dispose", E),
      L(x),
      x.isVideoTexture && h.delete(x));
  }
  function C(T) {
    const x = T.target;
    (x.removeEventListener("dispose", C), M(x));
  }
  function L(T) {
    const x = n.get(T);
    if (x.__webglInit === void 0) return;
    const z = T.source,
      X = d.get(z);
    if (X) {
      const tt = X[x.__cacheKey];
      (tt.usedTimes--,
        tt.usedTimes === 0 && y(T),
        Object.keys(X).length === 0 && d.delete(z));
    }
    n.remove(T);
  }
  function y(T) {
    const x = n.get(T);
    i.deleteTexture(x.__webglTexture);
    const z = T.source,
      X = d.get(z);
    (delete X[x.__cacheKey], o.memory.textures--);
  }
  function M(T) {
    const x = n.get(T);
    if (
      (T.depthTexture && (T.depthTexture.dispose(), n.remove(T.depthTexture)),
      T.isWebGLCubeRenderTarget)
    )
      for (let X = 0; X < 6; X++) {
        if (Array.isArray(x.__webglFramebuffer[X]))
          for (let tt = 0; tt < x.__webglFramebuffer[X].length; tt++)
            i.deleteFramebuffer(x.__webglFramebuffer[X][tt]);
        else i.deleteFramebuffer(x.__webglFramebuffer[X]);
        x.__webglDepthbuffer && i.deleteRenderbuffer(x.__webglDepthbuffer[X]);
      }
    else {
      if (Array.isArray(x.__webglFramebuffer))
        for (let X = 0; X < x.__webglFramebuffer.length; X++)
          i.deleteFramebuffer(x.__webglFramebuffer[X]);
      else i.deleteFramebuffer(x.__webglFramebuffer);
      if (
        (x.__webglDepthbuffer && i.deleteRenderbuffer(x.__webglDepthbuffer),
        x.__webglMultisampledFramebuffer &&
          i.deleteFramebuffer(x.__webglMultisampledFramebuffer),
        x.__webglColorRenderbuffer)
      )
        for (let X = 0; X < x.__webglColorRenderbuffer.length; X++)
          x.__webglColorRenderbuffer[X] &&
            i.deleteRenderbuffer(x.__webglColorRenderbuffer[X]);
      x.__webglDepthRenderbuffer &&
        i.deleteRenderbuffer(x.__webglDepthRenderbuffer);
    }
    const z = T.textures;
    for (let X = 0, tt = z.length; X < tt; X++) {
      const q = n.get(z[X]);
      (q.__webglTexture &&
        (i.deleteTexture(q.__webglTexture), o.memory.textures--),
        n.remove(z[X]));
    }
    n.remove(T);
  }
  let w = 0;
  function I() {
    w = 0;
  }
  function F() {
    const T = w;
    return (
      T >= s.maxTextures &&
        console.warn(
          "THREE.WebGLTextures: Trying to use " +
            T +
            " texture units while this GPU supports only " +
            s.maxTextures,
        ),
      (w += 1),
      T
    );
  }
  function B(T) {
    const x = [];
    return (
      x.push(T.wrapS),
      x.push(T.wrapT),
      x.push(T.wrapR || 0),
      x.push(T.magFilter),
      x.push(T.minFilter),
      x.push(T.anisotropy),
      x.push(T.internalFormat),
      x.push(T.format),
      x.push(T.type),
      x.push(T.generateMipmaps),
      x.push(T.premultiplyAlpha),
      x.push(T.flipY),
      x.push(T.unpackAlignment),
      x.push(T.colorSpace),
      x.join()
    );
  }
  function k(T, x) {
    const z = n.get(T);
    if (
      (T.isVideoTexture && dt(T),
      T.isRenderTargetTexture === !1 &&
        T.isExternalTexture !== !0 &&
        T.version > 0 &&
        z.__version !== T.version)
    ) {
      const X = T.image;
      if (X === null)
        console.warn(
          "THREE.WebGLRenderer: Texture marked for update but no image data found.",
        );
      else if (X.complete === !1)
        console.warn(
          "THREE.WebGLRenderer: Texture marked for update but image is incomplete",
        );
      else {
        Z(z, T, x);
        return;
      }
    } else
      T.isExternalTexture &&
        (z.__webglTexture = T.sourceTexture ? T.sourceTexture : null);
    e.bindTexture(i.TEXTURE_2D, z.__webglTexture, i.TEXTURE0 + x);
  }
  function G(T, x) {
    const z = n.get(T);
    if (
      T.isRenderTargetTexture === !1 &&
      T.version > 0 &&
      z.__version !== T.version
    ) {
      Z(z, T, x);
      return;
    }
    e.bindTexture(i.TEXTURE_2D_ARRAY, z.__webglTexture, i.TEXTURE0 + x);
  }
  function Y(T, x) {
    const z = n.get(T);
    if (
      T.isRenderTargetTexture === !1 &&
      T.version > 0 &&
      z.__version !== T.version
    ) {
      Z(z, T, x);
      return;
    }
    e.bindTexture(i.TEXTURE_3D, z.__webglTexture, i.TEXTURE0 + x);
  }
  function H(T, x) {
    const z = n.get(T);
    if (T.version > 0 && z.__version !== T.version) {
      nt(z, T, x);
      return;
    }
    e.bindTexture(i.TEXTURE_CUBE_MAP, z.__webglTexture, i.TEXTURE0 + x);
  }
  const ct = { [Wo]: i.REPEAT, [vi]: i.CLAMP_TO_EDGE, [Xo]: i.MIRRORED_REPEAT },
    pt = {
      [on]: i.NEAREST,
      [Mu]: i.NEAREST_MIPMAP_NEAREST,
      [ks]: i.NEAREST_MIPMAP_LINEAR,
      [Ze]: i.LINEAR,
      [qr]: i.LINEAR_MIPMAP_NEAREST,
      [xi]: i.LINEAR_MIPMAP_LINEAR,
    },
    gt = {
      [wu]: i.NEVER,
      [Du]: i.ALWAYS,
      [Tu]: i.LESS,
      [Kl]: i.LEQUAL,
      [Au]: i.EQUAL,
      [Pu]: i.GEQUAL,
      [Ru]: i.GREATER,
      [Cu]: i.NOTEQUAL,
    };
  function Lt(T, x) {
    if (
      (x.type === En &&
        t.has("OES_texture_float_linear") === !1 &&
        (x.magFilter === Ze ||
          x.magFilter === qr ||
          x.magFilter === ks ||
          x.magFilter === xi ||
          x.minFilter === Ze ||
          x.minFilter === qr ||
          x.minFilter === ks ||
          x.minFilter === xi) &&
        console.warn(
          "THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.",
        ),
      i.texParameteri(T, i.TEXTURE_WRAP_S, ct[x.wrapS]),
      i.texParameteri(T, i.TEXTURE_WRAP_T, ct[x.wrapT]),
      (T === i.TEXTURE_3D || T === i.TEXTURE_2D_ARRAY) &&
        i.texParameteri(T, i.TEXTURE_WRAP_R, ct[x.wrapR]),
      i.texParameteri(T, i.TEXTURE_MAG_FILTER, pt[x.magFilter]),
      i.texParameteri(T, i.TEXTURE_MIN_FILTER, pt[x.minFilter]),
      x.compareFunction &&
        (i.texParameteri(T, i.TEXTURE_COMPARE_MODE, i.COMPARE_REF_TO_TEXTURE),
        i.texParameteri(T, i.TEXTURE_COMPARE_FUNC, gt[x.compareFunction])),
      t.has("EXT_texture_filter_anisotropic") === !0)
    ) {
      if (
        x.magFilter === on ||
        (x.minFilter !== ks && x.minFilter !== xi) ||
        (x.type === En && t.has("OES_texture_float_linear") === !1)
      )
        return;
      if (x.anisotropy > 1 || n.get(x).__currentAnisotropy) {
        const z = t.get("EXT_texture_filter_anisotropic");
        (i.texParameterf(
          T,
          z.TEXTURE_MAX_ANISOTROPY_EXT,
          Math.min(x.anisotropy, s.getMaxAnisotropy()),
        ),
          (n.get(x).__currentAnisotropy = x.anisotropy));
      }
    }
  }
  function $t(T, x) {
    let z = !1;
    T.__webglInit === void 0 &&
      ((T.__webglInit = !0), x.addEventListener("dispose", E));
    const X = x.source;
    let tt = d.get(X);
    tt === void 0 && ((tt = {}), d.set(X, tt));
    const q = B(x);
    if (q !== T.__cacheKey) {
      (tt[q] === void 0 &&
        ((tt[q] = { texture: i.createTexture(), usedTimes: 0 }),
        o.memory.textures++,
        (z = !0)),
        tt[q].usedTimes++);
      const Ct = tt[T.__cacheKey];
      (Ct !== void 0 &&
        (tt[T.__cacheKey].usedTimes--, Ct.usedTimes === 0 && y(x)),
        (T.__cacheKey = q),
        (T.__webglTexture = tt[q].texture));
    }
    return z;
  }
  function re(T, x, z) {
    return Math.floor(Math.floor(T / z) / x);
  }
  function Jt(T, x, z, X) {
    const q = T.updateRanges;
    if (q.length === 0)
      e.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, x.width, x.height, z, X, x.data);
    else {
      q.sort((st, xt) => st.start - xt.start);
      let Ct = 0;
      for (let st = 1; st < q.length; st++) {
        const xt = q[Ct],
          Ft = q[st],
          Pt = xt.start + xt.count,
          _t = re(Ft.start, x.width, 4),
          Gt = re(xt.start, x.width, 4);
        Ft.start <= Pt + 1 &&
        _t === Gt &&
        re(Ft.start + Ft.count - 1, x.width, 4) === _t
          ? (xt.count = Math.max(xt.count, Ft.start + Ft.count - xt.start))
          : (++Ct, (q[Ct] = Ft));
      }
      q.length = Ct + 1;
      const ht = i.getParameter(i.UNPACK_ROW_LENGTH),
        Tt = i.getParameter(i.UNPACK_SKIP_PIXELS),
        At = i.getParameter(i.UNPACK_SKIP_ROWS);
      i.pixelStorei(i.UNPACK_ROW_LENGTH, x.width);
      for (let st = 0, xt = q.length; st < xt; st++) {
        const Ft = q[st],
          Pt = Math.floor(Ft.start / 4),
          _t = Math.ceil(Ft.count / 4),
          Gt = Pt % x.width,
          U = Math.floor(Pt / x.width),
          lt = _t,
          ft = 1;
        (i.pixelStorei(i.UNPACK_SKIP_PIXELS, Gt),
          i.pixelStorei(i.UNPACK_SKIP_ROWS, U),
          e.texSubImage2D(i.TEXTURE_2D, 0, Gt, U, lt, ft, z, X, x.data));
      }
      (T.clearUpdateRanges(),
        i.pixelStorei(i.UNPACK_ROW_LENGTH, ht),
        i.pixelStorei(i.UNPACK_SKIP_PIXELS, Tt),
        i.pixelStorei(i.UNPACK_SKIP_ROWS, At));
    }
  }
  function Z(T, x, z) {
    let X = i.TEXTURE_2D;
    ((x.isDataArrayTexture || x.isCompressedArrayTexture) &&
      (X = i.TEXTURE_2D_ARRAY),
      x.isData3DTexture && (X = i.TEXTURE_3D));
    const tt = $t(T, x),
      q = x.source;
    e.bindTexture(X, T.__webglTexture, i.TEXTURE0 + z);
    const Ct = n.get(q);
    if (q.version !== Ct.__version || tt === !0) {
      e.activeTexture(i.TEXTURE0 + z);
      const ht = ee.getPrimaries(ee.workingColorSpace),
        Tt = x.colorSpace === Jn ? null : ee.getPrimaries(x.colorSpace),
        At =
          x.colorSpace === Jn || ht === Tt ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      (i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, x.flipY),
        i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, x.premultiplyAlpha),
        i.pixelStorei(i.UNPACK_ALIGNMENT, x.unpackAlignment),
        i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, At));
      let st = _(x.image, !1, s.maxTextureSize);
      st = kt(x, st);
      const xt = r.convert(x.format, x.colorSpace),
        Ft = r.convert(x.type);
      let Pt = b(x.internalFormat, xt, Ft, x.colorSpace, x.isVideoTexture);
      Lt(X, x);
      let _t;
      const Gt = x.mipmaps,
        U = x.isVideoTexture !== !0,
        lt = Ct.__version === void 0 || tt === !0,
        ft = q.dataReady,
        bt = R(x, st);
      if (x.isDepthTexture)
        ((Pt = v(x.format === Rs, x.type)),
          lt &&
            (U
              ? e.texStorage2D(i.TEXTURE_2D, 1, Pt, st.width, st.height)
              : e.texImage2D(
                  i.TEXTURE_2D,
                  0,
                  Pt,
                  st.width,
                  st.height,
                  0,
                  xt,
                  Ft,
                  null,
                )));
      else if (x.isDataTexture)
        if (Gt.length > 0) {
          U &&
            lt &&
            e.texStorage2D(i.TEXTURE_2D, bt, Pt, Gt[0].width, Gt[0].height);
          for (let rt = 0, Q = Gt.length; rt < Q; rt++)
            ((_t = Gt[rt]),
              U
                ? ft &&
                  e.texSubImage2D(
                    i.TEXTURE_2D,
                    rt,
                    0,
                    0,
                    _t.width,
                    _t.height,
                    xt,
                    Ft,
                    _t.data,
                  )
                : e.texImage2D(
                    i.TEXTURE_2D,
                    rt,
                    Pt,
                    _t.width,
                    _t.height,
                    0,
                    xt,
                    Ft,
                    _t.data,
                  ));
          x.generateMipmaps = !1;
        } else
          U
            ? (lt && e.texStorage2D(i.TEXTURE_2D, bt, Pt, st.width, st.height),
              ft && Jt(x, st, xt, Ft))
            : e.texImage2D(
                i.TEXTURE_2D,
                0,
                Pt,
                st.width,
                st.height,
                0,
                xt,
                Ft,
                st.data,
              );
      else if (x.isCompressedTexture)
        if (x.isCompressedArrayTexture) {
          U &&
            lt &&
            e.texStorage3D(
              i.TEXTURE_2D_ARRAY,
              bt,
              Pt,
              Gt[0].width,
              Gt[0].height,
              st.depth,
            );
          for (let rt = 0, Q = Gt.length; rt < Q; rt++)
            if (((_t = Gt[rt]), x.format !== xn))
              if (xt !== null)
                if (U) {
                  if (ft)
                    if (x.layerUpdates.size > 0) {
                      const Rt = tl(_t.width, _t.height, x.format, x.type);
                      for (const Bt of x.layerUpdates) {
                        const ge = _t.data.subarray(
                          (Bt * Rt) / _t.data.BYTES_PER_ELEMENT,
                          ((Bt + 1) * Rt) / _t.data.BYTES_PER_ELEMENT,
                        );
                        e.compressedTexSubImage3D(
                          i.TEXTURE_2D_ARRAY,
                          rt,
                          0,
                          0,
                          Bt,
                          _t.width,
                          _t.height,
                          1,
                          xt,
                          ge,
                        );
                      }
                      x.clearLayerUpdates();
                    } else
                      e.compressedTexSubImage3D(
                        i.TEXTURE_2D_ARRAY,
                        rt,
                        0,
                        0,
                        0,
                        _t.width,
                        _t.height,
                        st.depth,
                        xt,
                        _t.data,
                      );
                } else
                  e.compressedTexImage3D(
                    i.TEXTURE_2D_ARRAY,
                    rt,
                    Pt,
                    _t.width,
                    _t.height,
                    st.depth,
                    0,
                    _t.data,
                    0,
                    0,
                  );
              else
                console.warn(
                  "THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()",
                );
            else
              U
                ? ft &&
                  e.texSubImage3D(
                    i.TEXTURE_2D_ARRAY,
                    rt,
                    0,
                    0,
                    0,
                    _t.width,
                    _t.height,
                    st.depth,
                    xt,
                    Ft,
                    _t.data,
                  )
                : e.texImage3D(
                    i.TEXTURE_2D_ARRAY,
                    rt,
                    Pt,
                    _t.width,
                    _t.height,
                    st.depth,
                    0,
                    xt,
                    Ft,
                    _t.data,
                  );
        } else {
          U &&
            lt &&
            e.texStorage2D(i.TEXTURE_2D, bt, Pt, Gt[0].width, Gt[0].height);
          for (let rt = 0, Q = Gt.length; rt < Q; rt++)
            ((_t = Gt[rt]),
              x.format !== xn
                ? xt !== null
                  ? U
                    ? ft &&
                      e.compressedTexSubImage2D(
                        i.TEXTURE_2D,
                        rt,
                        0,
                        0,
                        _t.width,
                        _t.height,
                        xt,
                        _t.data,
                      )
                    : e.compressedTexImage2D(
                        i.TEXTURE_2D,
                        rt,
                        Pt,
                        _t.width,
                        _t.height,
                        0,
                        _t.data,
                      )
                  : console.warn(
                      "THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()",
                    )
                : U
                  ? ft &&
                    e.texSubImage2D(
                      i.TEXTURE_2D,
                      rt,
                      0,
                      0,
                      _t.width,
                      _t.height,
                      xt,
                      Ft,
                      _t.data,
                    )
                  : e.texImage2D(
                      i.TEXTURE_2D,
                      rt,
                      Pt,
                      _t.width,
                      _t.height,
                      0,
                      xt,
                      Ft,
                      _t.data,
                    ));
        }
      else if (x.isDataArrayTexture)
        if (U) {
          if (
            (lt &&
              e.texStorage3D(
                i.TEXTURE_2D_ARRAY,
                bt,
                Pt,
                st.width,
                st.height,
                st.depth,
              ),
            ft)
          )
            if (x.layerUpdates.size > 0) {
              const rt = tl(st.width, st.height, x.format, x.type);
              for (const Q of x.layerUpdates) {
                const Rt = st.data.subarray(
                  (Q * rt) / st.data.BYTES_PER_ELEMENT,
                  ((Q + 1) * rt) / st.data.BYTES_PER_ELEMENT,
                );
                e.texSubImage3D(
                  i.TEXTURE_2D_ARRAY,
                  0,
                  0,
                  0,
                  Q,
                  st.width,
                  st.height,
                  1,
                  xt,
                  Ft,
                  Rt,
                );
              }
              x.clearLayerUpdates();
            } else
              e.texSubImage3D(
                i.TEXTURE_2D_ARRAY,
                0,
                0,
                0,
                0,
                st.width,
                st.height,
                st.depth,
                xt,
                Ft,
                st.data,
              );
        } else
          e.texImage3D(
            i.TEXTURE_2D_ARRAY,
            0,
            Pt,
            st.width,
            st.height,
            st.depth,
            0,
            xt,
            Ft,
            st.data,
          );
      else if (x.isData3DTexture)
        U
          ? (lt &&
              e.texStorage3D(
                i.TEXTURE_3D,
                bt,
                Pt,
                st.width,
                st.height,
                st.depth,
              ),
            ft &&
              e.texSubImage3D(
                i.TEXTURE_3D,
                0,
                0,
                0,
                0,
                st.width,
                st.height,
                st.depth,
                xt,
                Ft,
                st.data,
              ))
          : e.texImage3D(
              i.TEXTURE_3D,
              0,
              Pt,
              st.width,
              st.height,
              st.depth,
              0,
              xt,
              Ft,
              st.data,
            );
      else if (x.isFramebufferTexture) {
        if (lt)
          if (U) e.texStorage2D(i.TEXTURE_2D, bt, Pt, st.width, st.height);
          else {
            let rt = st.width,
              Q = st.height;
            for (let Rt = 0; Rt < bt; Rt++)
              (e.texImage2D(i.TEXTURE_2D, Rt, Pt, rt, Q, 0, xt, Ft, null),
                (rt >>= 1),
                (Q >>= 1));
          }
      } else if (Gt.length > 0) {
        if (U && lt) {
          const rt = zt(Gt[0]);
          e.texStorage2D(i.TEXTURE_2D, bt, Pt, rt.width, rt.height);
        }
        for (let rt = 0, Q = Gt.length; rt < Q; rt++)
          ((_t = Gt[rt]),
            U
              ? ft && e.texSubImage2D(i.TEXTURE_2D, rt, 0, 0, xt, Ft, _t)
              : e.texImage2D(i.TEXTURE_2D, rt, Pt, xt, Ft, _t));
        x.generateMipmaps = !1;
      } else if (U) {
        if (lt) {
          const rt = zt(st);
          e.texStorage2D(i.TEXTURE_2D, bt, Pt, rt.width, rt.height);
        }
        ft && e.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, xt, Ft, st);
      } else e.texImage2D(i.TEXTURE_2D, 0, Pt, xt, Ft, st);
      (g(x) && p(X), (Ct.__version = q.version), x.onUpdate && x.onUpdate(x));
    }
    T.__version = x.version;
  }
  function nt(T, x, z) {
    if (x.image.length !== 6) return;
    const X = $t(T, x),
      tt = x.source;
    e.bindTexture(i.TEXTURE_CUBE_MAP, T.__webglTexture, i.TEXTURE0 + z);
    const q = n.get(tt);
    if (tt.version !== q.__version || X === !0) {
      e.activeTexture(i.TEXTURE0 + z);
      const Ct = ee.getPrimaries(ee.workingColorSpace),
        ht = x.colorSpace === Jn ? null : ee.getPrimaries(x.colorSpace),
        Tt =
          x.colorSpace === Jn || Ct === ht ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      (i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, x.flipY),
        i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, x.premultiplyAlpha),
        i.pixelStorei(i.UNPACK_ALIGNMENT, x.unpackAlignment),
        i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, Tt));
      const At = x.isCompressedTexture || x.image[0].isCompressedTexture,
        st = x.image[0] && x.image[0].isDataTexture,
        xt = [];
      for (let Q = 0; Q < 6; Q++)
        (!At && !st
          ? (xt[Q] = _(x.image[Q], !0, s.maxCubemapSize))
          : (xt[Q] = st ? x.image[Q].image : x.image[Q]),
          (xt[Q] = kt(x, xt[Q])));
      const Ft = xt[0],
        Pt = r.convert(x.format, x.colorSpace),
        _t = r.convert(x.type),
        Gt = b(x.internalFormat, Pt, _t, x.colorSpace),
        U = x.isVideoTexture !== !0,
        lt = q.__version === void 0 || X === !0,
        ft = tt.dataReady;
      let bt = R(x, Ft);
      Lt(i.TEXTURE_CUBE_MAP, x);
      let rt;
      if (At) {
        U &&
          lt &&
          e.texStorage2D(i.TEXTURE_CUBE_MAP, bt, Gt, Ft.width, Ft.height);
        for (let Q = 0; Q < 6; Q++) {
          rt = xt[Q].mipmaps;
          for (let Rt = 0; Rt < rt.length; Rt++) {
            const Bt = rt[Rt];
            x.format !== xn
              ? Pt !== null
                ? U
                  ? ft &&
                    e.compressedTexSubImage2D(
                      i.TEXTURE_CUBE_MAP_POSITIVE_X + Q,
                      Rt,
                      0,
                      0,
                      Bt.width,
                      Bt.height,
                      Pt,
                      Bt.data,
                    )
                  : e.compressedTexImage2D(
                      i.TEXTURE_CUBE_MAP_POSITIVE_X + Q,
                      Rt,
                      Gt,
                      Bt.width,
                      Bt.height,
                      0,
                      Bt.data,
                    )
                : console.warn(
                    "THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()",
                  )
              : U
                ? ft &&
                  e.texSubImage2D(
                    i.TEXTURE_CUBE_MAP_POSITIVE_X + Q,
                    Rt,
                    0,
                    0,
                    Bt.width,
                    Bt.height,
                    Pt,
                    _t,
                    Bt.data,
                  )
                : e.texImage2D(
                    i.TEXTURE_CUBE_MAP_POSITIVE_X + Q,
                    Rt,
                    Gt,
                    Bt.width,
                    Bt.height,
                    0,
                    Pt,
                    _t,
                    Bt.data,
                  );
          }
        }
      } else {
        if (((rt = x.mipmaps), U && lt)) {
          rt.length > 0 && bt++;
          const Q = zt(xt[0]);
          e.texStorage2D(i.TEXTURE_CUBE_MAP, bt, Gt, Q.width, Q.height);
        }
        for (let Q = 0; Q < 6; Q++)
          if (st) {
            U
              ? ft &&
                e.texSubImage2D(
                  i.TEXTURE_CUBE_MAP_POSITIVE_X + Q,
                  0,
                  0,
                  0,
                  xt[Q].width,
                  xt[Q].height,
                  Pt,
                  _t,
                  xt[Q].data,
                )
              : e.texImage2D(
                  i.TEXTURE_CUBE_MAP_POSITIVE_X + Q,
                  0,
                  Gt,
                  xt[Q].width,
                  xt[Q].height,
                  0,
                  Pt,
                  _t,
                  xt[Q].data,
                );
            for (let Rt = 0; Rt < rt.length; Rt++) {
              const ge = rt[Rt].image[Q].image;
              U
                ? ft &&
                  e.texSubImage2D(
                    i.TEXTURE_CUBE_MAP_POSITIVE_X + Q,
                    Rt + 1,
                    0,
                    0,
                    ge.width,
                    ge.height,
                    Pt,
                    _t,
                    ge.data,
                  )
                : e.texImage2D(
                    i.TEXTURE_CUBE_MAP_POSITIVE_X + Q,
                    Rt + 1,
                    Gt,
                    ge.width,
                    ge.height,
                    0,
                    Pt,
                    _t,
                    ge.data,
                  );
            }
          } else {
            U
              ? ft &&
                e.texSubImage2D(
                  i.TEXTURE_CUBE_MAP_POSITIVE_X + Q,
                  0,
                  0,
                  0,
                  Pt,
                  _t,
                  xt[Q],
                )
              : e.texImage2D(
                  i.TEXTURE_CUBE_MAP_POSITIVE_X + Q,
                  0,
                  Gt,
                  Pt,
                  _t,
                  xt[Q],
                );
            for (let Rt = 0; Rt < rt.length; Rt++) {
              const Bt = rt[Rt];
              U
                ? ft &&
                  e.texSubImage2D(
                    i.TEXTURE_CUBE_MAP_POSITIVE_X + Q,
                    Rt + 1,
                    0,
                    0,
                    Pt,
                    _t,
                    Bt.image[Q],
                  )
                : e.texImage2D(
                    i.TEXTURE_CUBE_MAP_POSITIVE_X + Q,
                    Rt + 1,
                    Gt,
                    Pt,
                    _t,
                    Bt.image[Q],
                  );
            }
          }
      }
      (g(x) && p(i.TEXTURE_CUBE_MAP),
        (q.__version = tt.version),
        x.onUpdate && x.onUpdate(x));
    }
    T.__version = x.version;
  }
  function St(T, x, z, X, tt, q) {
    const Ct = r.convert(z.format, z.colorSpace),
      ht = r.convert(z.type),
      Tt = b(z.internalFormat, Ct, ht, z.colorSpace),
      At = n.get(x),
      st = n.get(z);
    if (((st.__renderTarget = x), !At.__hasExternalTextures)) {
      const xt = Math.max(1, x.width >> q),
        Ft = Math.max(1, x.height >> q);
      tt === i.TEXTURE_3D || tt === i.TEXTURE_2D_ARRAY
        ? e.texImage3D(tt, q, Tt, xt, Ft, x.depth, 0, Ct, ht, null)
        : e.texImage2D(tt, q, Tt, xt, Ft, 0, Ct, ht, null);
    }
    (e.bindFramebuffer(i.FRAMEBUFFER, T),
      it(x)
        ? a.framebufferTexture2DMultisampleEXT(
            i.FRAMEBUFFER,
            X,
            tt,
            st.__webglTexture,
            0,
            ut(x),
          )
        : (tt === i.TEXTURE_2D ||
            (tt >= i.TEXTURE_CUBE_MAP_POSITIVE_X &&
              tt <= i.TEXTURE_CUBE_MAP_NEGATIVE_Z)) &&
          i.framebufferTexture2D(i.FRAMEBUFFER, X, tt, st.__webglTexture, q),
      e.bindFramebuffer(i.FRAMEBUFFER, null));
  }
  function Dt(T, x, z) {
    if ((i.bindRenderbuffer(i.RENDERBUFFER, T), x.depthBuffer)) {
      const X = x.depthTexture,
        tt = X && X.isDepthTexture ? X.type : null,
        q = v(x.stencilBuffer, tt),
        Ct = x.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT,
        ht = ut(x);
      (it(x)
        ? a.renderbufferStorageMultisampleEXT(
            i.RENDERBUFFER,
            ht,
            q,
            x.width,
            x.height,
          )
        : z
          ? i.renderbufferStorageMultisample(
              i.RENDERBUFFER,
              ht,
              q,
              x.width,
              x.height,
            )
          : i.renderbufferStorage(i.RENDERBUFFER, q, x.width, x.height),
        i.framebufferRenderbuffer(i.FRAMEBUFFER, Ct, i.RENDERBUFFER, T));
    } else {
      const X = x.textures;
      for (let tt = 0; tt < X.length; tt++) {
        const q = X[tt],
          Ct = r.convert(q.format, q.colorSpace),
          ht = r.convert(q.type),
          Tt = b(q.internalFormat, Ct, ht, q.colorSpace),
          At = ut(x);
        z && it(x) === !1
          ? i.renderbufferStorageMultisample(
              i.RENDERBUFFER,
              At,
              Tt,
              x.width,
              x.height,
            )
          : it(x)
            ? a.renderbufferStorageMultisampleEXT(
                i.RENDERBUFFER,
                At,
                Tt,
                x.width,
                x.height,
              )
            : i.renderbufferStorage(i.RENDERBUFFER, Tt, x.width, x.height);
      }
    }
    i.bindRenderbuffer(i.RENDERBUFFER, null);
  }
  function wt(T, x) {
    if (x && x.isWebGLCubeRenderTarget)
      throw new Error(
        "Depth Texture with cube render targets is not supported",
      );
    if (
      (e.bindFramebuffer(i.FRAMEBUFFER, T),
      !(x.depthTexture && x.depthTexture.isDepthTexture))
    )
      throw new Error(
        "renderTarget.depthTexture must be an instance of THREE.DepthTexture",
      );
    const X = n.get(x.depthTexture);
    ((X.__renderTarget = x),
      (!X.__webglTexture ||
        x.depthTexture.image.width !== x.width ||
        x.depthTexture.image.height !== x.height) &&
        ((x.depthTexture.image.width = x.width),
        (x.depthTexture.image.height = x.height),
        (x.depthTexture.needsUpdate = !0)),
      k(x.depthTexture, 0));
    const tt = X.__webglTexture,
      q = ut(x);
    if (x.depthTexture.format === As)
      it(x)
        ? a.framebufferTexture2DMultisampleEXT(
            i.FRAMEBUFFER,
            i.DEPTH_ATTACHMENT,
            i.TEXTURE_2D,
            tt,
            0,
            q,
          )
        : i.framebufferTexture2D(
            i.FRAMEBUFFER,
            i.DEPTH_ATTACHMENT,
            i.TEXTURE_2D,
            tt,
            0,
          );
    else if (x.depthTexture.format === Rs)
      it(x)
        ? a.framebufferTexture2DMultisampleEXT(
            i.FRAMEBUFFER,
            i.DEPTH_STENCIL_ATTACHMENT,
            i.TEXTURE_2D,
            tt,
            0,
            q,
          )
        : i.framebufferTexture2D(
            i.FRAMEBUFFER,
            i.DEPTH_STENCIL_ATTACHMENT,
            i.TEXTURE_2D,
            tt,
            0,
          );
    else throw new Error("Unknown depthTexture format");
  }
  function Zt(T) {
    const x = n.get(T),
      z = T.isWebGLCubeRenderTarget === !0;
    if (x.__boundDepthTexture !== T.depthTexture) {
      const X = T.depthTexture;
      if ((x.__depthDisposeCallback && x.__depthDisposeCallback(), X)) {
        const tt = () => {
          (delete x.__boundDepthTexture,
            delete x.__depthDisposeCallback,
            X.removeEventListener("dispose", tt));
        };
        (X.addEventListener("dispose", tt), (x.__depthDisposeCallback = tt));
      }
      x.__boundDepthTexture = X;
    }
    if (T.depthTexture && !x.__autoAllocateDepthBuffer) {
      if (z)
        throw new Error(
          "target.depthTexture not supported in Cube render targets",
        );
      const X = T.texture.mipmaps;
      X && X.length > 0
        ? wt(x.__webglFramebuffer[0], T)
        : wt(x.__webglFramebuffer, T);
    } else if (z) {
      x.__webglDepthbuffer = [];
      for (let X = 0; X < 6; X++)
        if (
          (e.bindFramebuffer(i.FRAMEBUFFER, x.__webglFramebuffer[X]),
          x.__webglDepthbuffer[X] === void 0)
        )
          ((x.__webglDepthbuffer[X] = i.createRenderbuffer()),
            Dt(x.__webglDepthbuffer[X], T, !1));
        else {
          const tt = T.stencilBuffer
              ? i.DEPTH_STENCIL_ATTACHMENT
              : i.DEPTH_ATTACHMENT,
            q = x.__webglDepthbuffer[X];
          (i.bindRenderbuffer(i.RENDERBUFFER, q),
            i.framebufferRenderbuffer(i.FRAMEBUFFER, tt, i.RENDERBUFFER, q));
        }
    } else {
      const X = T.texture.mipmaps;
      if (
        (X && X.length > 0
          ? e.bindFramebuffer(i.FRAMEBUFFER, x.__webglFramebuffer[0])
          : e.bindFramebuffer(i.FRAMEBUFFER, x.__webglFramebuffer),
        x.__webglDepthbuffer === void 0)
      )
        ((x.__webglDepthbuffer = i.createRenderbuffer()),
          Dt(x.__webglDepthbuffer, T, !1));
      else {
        const tt = T.stencilBuffer
            ? i.DEPTH_STENCIL_ATTACHMENT
            : i.DEPTH_ATTACHMENT,
          q = x.__webglDepthbuffer;
        (i.bindRenderbuffer(i.RENDERBUFFER, q),
          i.framebufferRenderbuffer(i.FRAMEBUFFER, tt, i.RENDERBUFFER, q));
      }
    }
    e.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function me(T, x, z) {
    const X = n.get(T);
    (x !== void 0 &&
      St(
        X.__webglFramebuffer,
        T,
        T.texture,
        i.COLOR_ATTACHMENT0,
        i.TEXTURE_2D,
        0,
      ),
      z !== void 0 && Zt(T));
  }
  function D(T) {
    const x = T.texture,
      z = n.get(T),
      X = n.get(x);
    T.addEventListener("dispose", C);
    const tt = T.textures,
      q = T.isWebGLCubeRenderTarget === !0,
      Ct = tt.length > 1;
    if (
      (Ct ||
        (X.__webglTexture === void 0 && (X.__webglTexture = i.createTexture()),
        (X.__version = x.version),
        o.memory.textures++),
      q)
    ) {
      z.__webglFramebuffer = [];
      for (let ht = 0; ht < 6; ht++)
        if (x.mipmaps && x.mipmaps.length > 0) {
          z.__webglFramebuffer[ht] = [];
          for (let Tt = 0; Tt < x.mipmaps.length; Tt++)
            z.__webglFramebuffer[ht][Tt] = i.createFramebuffer();
        } else z.__webglFramebuffer[ht] = i.createFramebuffer();
    } else {
      if (x.mipmaps && x.mipmaps.length > 0) {
        z.__webglFramebuffer = [];
        for (let ht = 0; ht < x.mipmaps.length; ht++)
          z.__webglFramebuffer[ht] = i.createFramebuffer();
      } else z.__webglFramebuffer = i.createFramebuffer();
      if (Ct)
        for (let ht = 0, Tt = tt.length; ht < Tt; ht++) {
          const At = n.get(tt[ht]);
          At.__webglTexture === void 0 &&
            ((At.__webglTexture = i.createTexture()), o.memory.textures++);
        }
      if (T.samples > 0 && it(T) === !1) {
        ((z.__webglMultisampledFramebuffer = i.createFramebuffer()),
          (z.__webglColorRenderbuffer = []),
          e.bindFramebuffer(i.FRAMEBUFFER, z.__webglMultisampledFramebuffer));
        for (let ht = 0; ht < tt.length; ht++) {
          const Tt = tt[ht];
          ((z.__webglColorRenderbuffer[ht] = i.createRenderbuffer()),
            i.bindRenderbuffer(i.RENDERBUFFER, z.__webglColorRenderbuffer[ht]));
          const At = r.convert(Tt.format, Tt.colorSpace),
            st = r.convert(Tt.type),
            xt = b(
              Tt.internalFormat,
              At,
              st,
              Tt.colorSpace,
              T.isXRRenderTarget === !0,
            ),
            Ft = ut(T);
          (i.renderbufferStorageMultisample(
            i.RENDERBUFFER,
            Ft,
            xt,
            T.width,
            T.height,
          ),
            i.framebufferRenderbuffer(
              i.FRAMEBUFFER,
              i.COLOR_ATTACHMENT0 + ht,
              i.RENDERBUFFER,
              z.__webglColorRenderbuffer[ht],
            ));
        }
        (i.bindRenderbuffer(i.RENDERBUFFER, null),
          T.depthBuffer &&
            ((z.__webglDepthRenderbuffer = i.createRenderbuffer()),
            Dt(z.__webglDepthRenderbuffer, T, !0)),
          e.bindFramebuffer(i.FRAMEBUFFER, null));
      }
    }
    if (q) {
      (e.bindTexture(i.TEXTURE_CUBE_MAP, X.__webglTexture),
        Lt(i.TEXTURE_CUBE_MAP, x));
      for (let ht = 0; ht < 6; ht++)
        if (x.mipmaps && x.mipmaps.length > 0)
          for (let Tt = 0; Tt < x.mipmaps.length; Tt++)
            St(
              z.__webglFramebuffer[ht][Tt],
              T,
              x,
              i.COLOR_ATTACHMENT0,
              i.TEXTURE_CUBE_MAP_POSITIVE_X + ht,
              Tt,
            );
        else
          St(
            z.__webglFramebuffer[ht],
            T,
            x,
            i.COLOR_ATTACHMENT0,
            i.TEXTURE_CUBE_MAP_POSITIVE_X + ht,
            0,
          );
      (g(x) && p(i.TEXTURE_CUBE_MAP), e.unbindTexture());
    } else if (Ct) {
      for (let ht = 0, Tt = tt.length; ht < Tt; ht++) {
        const At = tt[ht],
          st = n.get(At);
        let xt = i.TEXTURE_2D;
        ((T.isWebGL3DRenderTarget || T.isWebGLArrayRenderTarget) &&
          (xt = T.isWebGL3DRenderTarget ? i.TEXTURE_3D : i.TEXTURE_2D_ARRAY),
          e.bindTexture(xt, st.__webglTexture),
          Lt(xt, At),
          St(z.__webglFramebuffer, T, At, i.COLOR_ATTACHMENT0 + ht, xt, 0),
          g(At) && p(xt));
      }
      e.unbindTexture();
    } else {
      let ht = i.TEXTURE_2D;
      if (
        ((T.isWebGL3DRenderTarget || T.isWebGLArrayRenderTarget) &&
          (ht = T.isWebGL3DRenderTarget ? i.TEXTURE_3D : i.TEXTURE_2D_ARRAY),
        e.bindTexture(ht, X.__webglTexture),
        Lt(ht, x),
        x.mipmaps && x.mipmaps.length > 0)
      )
        for (let Tt = 0; Tt < x.mipmaps.length; Tt++)
          St(z.__webglFramebuffer[Tt], T, x, i.COLOR_ATTACHMENT0, ht, Tt);
      else St(z.__webglFramebuffer, T, x, i.COLOR_ATTACHMENT0, ht, 0);
      (g(x) && p(ht), e.unbindTexture());
    }
    T.depthBuffer && Zt(T);
  }
  function et(T) {
    const x = T.textures;
    for (let z = 0, X = x.length; z < X; z++) {
      const tt = x[z];
      if (g(tt)) {
        const q = A(T),
          Ct = n.get(tt).__webglTexture;
        (e.bindTexture(q, Ct), p(q), e.unbindTexture());
      }
    }
  }
  const J = [],
    $ = [];
  function j(T) {
    if (T.samples > 0) {
      if (it(T) === !1) {
        const x = T.textures,
          z = T.width,
          X = T.height;
        let tt = i.COLOR_BUFFER_BIT;
        const q = T.stencilBuffer
            ? i.DEPTH_STENCIL_ATTACHMENT
            : i.DEPTH_ATTACHMENT,
          Ct = n.get(T),
          ht = x.length > 1;
        if (ht)
          for (let At = 0; At < x.length; At++)
            (e.bindFramebuffer(
              i.FRAMEBUFFER,
              Ct.__webglMultisampledFramebuffer,
            ),
              i.framebufferRenderbuffer(
                i.FRAMEBUFFER,
                i.COLOR_ATTACHMENT0 + At,
                i.RENDERBUFFER,
                null,
              ),
              e.bindFramebuffer(i.FRAMEBUFFER, Ct.__webglFramebuffer),
              i.framebufferTexture2D(
                i.DRAW_FRAMEBUFFER,
                i.COLOR_ATTACHMENT0 + At,
                i.TEXTURE_2D,
                null,
                0,
              ));
        e.bindFramebuffer(
          i.READ_FRAMEBUFFER,
          Ct.__webglMultisampledFramebuffer,
        );
        const Tt = T.texture.mipmaps;
        Tt && Tt.length > 0
          ? e.bindFramebuffer(i.DRAW_FRAMEBUFFER, Ct.__webglFramebuffer[0])
          : e.bindFramebuffer(i.DRAW_FRAMEBUFFER, Ct.__webglFramebuffer);
        for (let At = 0; At < x.length; At++) {
          if (
            (T.resolveDepthBuffer &&
              (T.depthBuffer && (tt |= i.DEPTH_BUFFER_BIT),
              T.stencilBuffer &&
                T.resolveStencilBuffer &&
                (tt |= i.STENCIL_BUFFER_BIT)),
            ht)
          ) {
            i.framebufferRenderbuffer(
              i.READ_FRAMEBUFFER,
              i.COLOR_ATTACHMENT0,
              i.RENDERBUFFER,
              Ct.__webglColorRenderbuffer[At],
            );
            const st = n.get(x[At]).__webglTexture;
            i.framebufferTexture2D(
              i.DRAW_FRAMEBUFFER,
              i.COLOR_ATTACHMENT0,
              i.TEXTURE_2D,
              st,
              0,
            );
          }
          (i.blitFramebuffer(0, 0, z, X, 0, 0, z, X, tt, i.NEAREST),
            c === !0 &&
              ((J.length = 0),
              ($.length = 0),
              J.push(i.COLOR_ATTACHMENT0 + At),
              T.depthBuffer &&
                T.resolveDepthBuffer === !1 &&
                (J.push(q),
                $.push(q),
                i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, $)),
              i.invalidateFramebuffer(i.READ_FRAMEBUFFER, J)));
        }
        if (
          (e.bindFramebuffer(i.READ_FRAMEBUFFER, null),
          e.bindFramebuffer(i.DRAW_FRAMEBUFFER, null),
          ht)
        )
          for (let At = 0; At < x.length; At++) {
            (e.bindFramebuffer(
              i.FRAMEBUFFER,
              Ct.__webglMultisampledFramebuffer,
            ),
              i.framebufferRenderbuffer(
                i.FRAMEBUFFER,
                i.COLOR_ATTACHMENT0 + At,
                i.RENDERBUFFER,
                Ct.__webglColorRenderbuffer[At],
              ));
            const st = n.get(x[At]).__webglTexture;
            (e.bindFramebuffer(i.FRAMEBUFFER, Ct.__webglFramebuffer),
              i.framebufferTexture2D(
                i.DRAW_FRAMEBUFFER,
                i.COLOR_ATTACHMENT0 + At,
                i.TEXTURE_2D,
                st,
                0,
              ));
          }
        e.bindFramebuffer(
          i.DRAW_FRAMEBUFFER,
          Ct.__webglMultisampledFramebuffer,
        );
      } else if (T.depthBuffer && T.resolveDepthBuffer === !1 && c) {
        const x = T.stencilBuffer
          ? i.DEPTH_STENCIL_ATTACHMENT
          : i.DEPTH_ATTACHMENT;
        i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, [x]);
      }
    }
  }
  function ut(T) {
    return Math.min(s.maxSamples, T.samples);
  }
  function it(T) {
    const x = n.get(T);
    return (
      T.samples > 0 &&
      t.has("WEBGL_multisampled_render_to_texture") === !0 &&
      x.__useRenderToTexture !== !1
    );
  }
  function dt(T) {
    const x = o.render.frame;
    h.get(T) !== x && (h.set(T, x), T.update());
  }
  function kt(T, x) {
    const z = T.colorSpace,
      X = T.format,
      tt = T.type;
    return (
      T.isCompressedTexture === !0 ||
        T.isVideoTexture === !0 ||
        (z !== ns &&
          z !== Jn &&
          (ee.getTransfer(z) === ce
            ? (X !== xn || tt !== Tn) &&
              console.warn(
                "THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.",
              )
            : console.error(
                "THREE.WebGLTextures: Unsupported texture color space:",
                z,
              ))),
      x
    );
  }
  function zt(T) {
    return (
      typeof HTMLImageElement < "u" && T instanceof HTMLImageElement
        ? ((l.width = T.naturalWidth || T.width),
          (l.height = T.naturalHeight || T.height))
        : typeof VideoFrame < "u" && T instanceof VideoFrame
          ? ((l.width = T.displayWidth), (l.height = T.displayHeight))
          : ((l.width = T.width), (l.height = T.height)),
      l
    );
  }
  ((this.allocateTextureUnit = F),
    (this.resetTextureUnits = I),
    (this.setTexture2D = k),
    (this.setTexture2DArray = G),
    (this.setTexture3D = Y),
    (this.setTextureCube = H),
    (this.rebindTextures = me),
    (this.setupRenderTarget = D),
    (this.updateRenderTargetMipmap = et),
    (this.updateMultisampleRenderTarget = j),
    (this.setupDepthRenderbuffer = Zt),
    (this.setupFrameBufferTexture = St),
    (this.useMultisampledRTT = it));
}
function A0(i, t) {
  function e(n, s = Jn) {
    let r;
    const o = ee.getTransfer(s);
    if (n === Tn) return i.UNSIGNED_BYTE;
    if (n === Fa) return i.UNSIGNED_SHORT_4_4_4_4;
    if (n === Oa) return i.UNSIGNED_SHORT_5_5_5_1;
    if (n === Vl) return i.UNSIGNED_INT_5_9_9_9_REV;
    if (n === Wl) return i.UNSIGNED_INT_10F_11F_11F_REV;
    if (n === Hl) return i.BYTE;
    if (n === Gl) return i.SHORT;
    if (n === ws) return i.UNSIGNED_SHORT;
    if (n === Na) return i.INT;
    if (n === si) return i.UNSIGNED_INT;
    if (n === En) return i.FLOAT;
    if (n === Fs) return i.HALF_FLOAT;
    if (n === Xl) return i.ALPHA;
    if (n === ql) return i.RGB;
    if (n === xn) return i.RGBA;
    if (n === As) return i.DEPTH_COMPONENT;
    if (n === Rs) return i.DEPTH_STENCIL;
    if (n === za) return i.RED;
    if (n === ka) return i.RED_INTEGER;
    if (n === Yl) return i.RG;
    if (n === Ba) return i.RG_INTEGER;
    if (n === Ha) return i.RGBA_INTEGER;
    if (n === mr || n === gr || n === _r || n === vr)
      if (o === ce)
        if (((r = t.get("WEBGL_compressed_texture_s3tc_srgb")), r !== null)) {
          if (n === mr) return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (n === gr) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (n === _r) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (n === vr) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else return null;
      else if (((r = t.get("WEBGL_compressed_texture_s3tc")), r !== null)) {
        if (n === mr) return r.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (n === gr) return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (n === _r) return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (n === vr) return r.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else return null;
    if (n === qo || n === Yo || n === Ko || n === Zo)
      if (((r = t.get("WEBGL_compressed_texture_pvrtc")), r !== null)) {
        if (n === qo) return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (n === Yo) return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (n === Ko) return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (n === Zo) return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else return null;
    if (n === jo || n === $o || n === Jo)
      if (((r = t.get("WEBGL_compressed_texture_etc")), r !== null)) {
        if (n === jo || n === $o)
          return o === ce ? r.COMPRESSED_SRGB8_ETC2 : r.COMPRESSED_RGB8_ETC2;
        if (n === Jo)
          return o === ce
            ? r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC
            : r.COMPRESSED_RGBA8_ETC2_EAC;
      } else return null;
    if (
      n === Qo ||
      n === ta ||
      n === ea ||
      n === na ||
      n === ia ||
      n === sa ||
      n === ra ||
      n === oa ||
      n === aa ||
      n === ca ||
      n === la ||
      n === ha ||
      n === ua ||
      n === da
    )
      if (((r = t.get("WEBGL_compressed_texture_astc")), r !== null)) {
        if (n === Qo)
          return o === ce
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR
            : r.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (n === ta)
          return o === ce
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR
            : r.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (n === ea)
          return o === ce
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR
            : r.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (n === na)
          return o === ce
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR
            : r.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (n === ia)
          return o === ce
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR
            : r.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (n === sa)
          return o === ce
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR
            : r.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (n === ra)
          return o === ce
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR
            : r.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (n === oa)
          return o === ce
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR
            : r.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (n === aa)
          return o === ce
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR
            : r.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (n === ca)
          return o === ce
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR
            : r.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (n === la)
          return o === ce
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR
            : r.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (n === ha)
          return o === ce
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR
            : r.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (n === ua)
          return o === ce
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR
            : r.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (n === da)
          return o === ce
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR
            : r.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else return null;
    if (n === fa || n === pa || n === ma)
      if (((r = t.get("EXT_texture_compression_bptc")), r !== null)) {
        if (n === fa)
          return o === ce
            ? r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT
            : r.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (n === pa) return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (n === ma) return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else return null;
    if (n === ga || n === _a || n === va || n === xa)
      if (((r = t.get("EXT_texture_compression_rgtc")), r !== null)) {
        if (n === ga) return r.COMPRESSED_RED_RGTC1_EXT;
        if (n === _a) return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (n === va) return r.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (n === xa) return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else return null;
    return n === Ts ? i.UNSIGNED_INT_24_8 : i[n] !== void 0 ? i[n] : null;
  }
  return { convert: e };
}
const R0 = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`,
  C0 = `
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;
class P0 {
  constructor() {
    ((this.texture = null),
      (this.mesh = null),
      (this.depthNear = 0),
      (this.depthFar = 0));
  }
  init(t, e) {
    if (this.texture === null) {
      const n = new rh(t.texture);
      ((t.depthNear !== e.depthNear || t.depthFar !== e.depthFar) &&
        ((this.depthNear = t.depthNear), (this.depthFar = t.depthFar)),
        (this.texture = n));
    }
  }
  getMesh(t) {
    if (this.texture !== null && this.mesh === null) {
      const e = t.cameras[0].viewport,
        n = new Vn({
          vertexShader: R0,
          fragmentShader: C0,
          uniforms: {
            depthColor: { value: this.texture },
            depthWidth: { value: e.z },
            depthHeight: { value: e.w },
          },
        });
      this.mesh = new he(new Ai(20, 20), n);
    }
    return this.mesh;
  }
  reset() {
    ((this.texture = null), (this.mesh = null));
  }
  getDepthTexture() {
    return this.texture;
  }
}
class D0 extends Ei {
  constructor(t, e) {
    super();
    const n = this;
    let s = null,
      r = 1,
      o = null,
      a = "local-floor",
      c = 1,
      l = null,
      h = null,
      u = null,
      d = null,
      f = null,
      m = null;
    const _ = typeof XRWebGLBinding < "u",
      g = new P0(),
      p = {},
      A = e.getContextAttributes();
    let b = null,
      v = null;
    const R = [],
      E = [],
      C = new at();
    let L = null;
    const y = new un();
    y.viewport = new Ee();
    const M = new un();
    M.viewport = new Ee();
    const w = [y, M],
      I = new jd();
    let F = null,
      B = null;
    ((this.cameraAutoUpdate = !0),
      (this.enabled = !1),
      (this.isPresenting = !1),
      (this.getController = function (Z) {
        let nt = R[Z];
        return (
          nt === void 0 && ((nt = new mo()), (R[Z] = nt)),
          nt.getTargetRaySpace()
        );
      }),
      (this.getControllerGrip = function (Z) {
        let nt = R[Z];
        return (
          nt === void 0 && ((nt = new mo()), (R[Z] = nt)),
          nt.getGripSpace()
        );
      }),
      (this.getHand = function (Z) {
        let nt = R[Z];
        return (
          nt === void 0 && ((nt = new mo()), (R[Z] = nt)),
          nt.getHandSpace()
        );
      }));
    function k(Z) {
      const nt = E.indexOf(Z.inputSource);
      if (nt === -1) return;
      const St = R[nt];
      St !== void 0 &&
        (St.update(Z.inputSource, Z.frame, l || o),
        St.dispatchEvent({ type: Z.type, data: Z.inputSource }));
    }
    function G() {
      (s.removeEventListener("select", k),
        s.removeEventListener("selectstart", k),
        s.removeEventListener("selectend", k),
        s.removeEventListener("squeeze", k),
        s.removeEventListener("squeezestart", k),
        s.removeEventListener("squeezeend", k),
        s.removeEventListener("end", G),
        s.removeEventListener("inputsourceschange", Y));
      for (let Z = 0; Z < R.length; Z++) {
        const nt = E[Z];
        nt !== null && ((E[Z] = null), R[Z].disconnect(nt));
      }
      ((F = null), (B = null), g.reset());
      for (const Z in p) delete p[Z];
      (t.setRenderTarget(b),
        (f = null),
        (d = null),
        (u = null),
        (s = null),
        (v = null),
        Jt.stop(),
        (n.isPresenting = !1),
        t.setPixelRatio(L),
        t.setSize(C.width, C.height, !1),
        n.dispatchEvent({ type: "sessionend" }));
    }
    ((this.setFramebufferScaleFactor = function (Z) {
      ((r = Z),
        n.isPresenting === !0 &&
          console.warn(
            "THREE.WebXRManager: Cannot change framebuffer scale while presenting.",
          ));
    }),
      (this.setReferenceSpaceType = function (Z) {
        ((a = Z),
          n.isPresenting === !0 &&
            console.warn(
              "THREE.WebXRManager: Cannot change reference space type while presenting.",
            ));
      }),
      (this.getReferenceSpace = function () {
        return l || o;
      }),
      (this.setReferenceSpace = function (Z) {
        l = Z;
      }),
      (this.getBaseLayer = function () {
        return d !== null ? d : f;
      }),
      (this.getBinding = function () {
        return (u === null && _ && (u = new XRWebGLBinding(s, e)), u);
      }),
      (this.getFrame = function () {
        return m;
      }),
      (this.getSession = function () {
        return s;
      }),
      (this.setSession = async function (Z) {
        if (((s = Z), s !== null)) {
          if (
            ((b = t.getRenderTarget()),
            s.addEventListener("select", k),
            s.addEventListener("selectstart", k),
            s.addEventListener("selectend", k),
            s.addEventListener("squeeze", k),
            s.addEventListener("squeezestart", k),
            s.addEventListener("squeezeend", k),
            s.addEventListener("end", G),
            s.addEventListener("inputsourceschange", Y),
            A.xrCompatible !== !0 && (await e.makeXRCompatible()),
            (L = t.getPixelRatio()),
            t.getSize(C),
            _ && "createProjectionLayer" in XRWebGLBinding.prototype)
          ) {
            let St = null,
              Dt = null,
              wt = null;
            A.depth &&
              ((wt = A.stencil ? e.DEPTH24_STENCIL8 : e.DEPTH_COMPONENT24),
              (St = A.stencil ? Rs : As),
              (Dt = A.stencil ? Ts : si));
            const Zt = {
              colorFormat: e.RGBA8,
              depthFormat: wt,
              scaleFactor: r,
            };
            ((u = this.getBinding()),
              (d = u.createProjectionLayer(Zt)),
              s.updateRenderState({ layers: [d] }),
              t.setPixelRatio(1),
              t.setSize(d.textureWidth, d.textureHeight, !1),
              (v = new Gn(d.textureWidth, d.textureHeight, {
                format: xn,
                type: Tn,
                depthTexture: new Ka(
                  d.textureWidth,
                  d.textureHeight,
                  Dt,
                  void 0,
                  void 0,
                  void 0,
                  void 0,
                  void 0,
                  void 0,
                  St,
                ),
                stencilBuffer: A.stencil,
                colorSpace: t.outputColorSpace,
                samples: A.antialias ? 4 : 0,
                resolveDepthBuffer: d.ignoreDepthValues === !1,
                resolveStencilBuffer: d.ignoreDepthValues === !1,
              })));
          } else {
            const St = {
              antialias: A.antialias,
              alpha: !0,
              depth: A.depth,
              stencil: A.stencil,
              framebufferScaleFactor: r,
            };
            ((f = new XRWebGLLayer(s, e, St)),
              s.updateRenderState({ baseLayer: f }),
              t.setPixelRatio(1),
              t.setSize(f.framebufferWidth, f.framebufferHeight, !1),
              (v = new Gn(f.framebufferWidth, f.framebufferHeight, {
                format: xn,
                type: Tn,
                colorSpace: t.outputColorSpace,
                stencilBuffer: A.stencil,
                resolveDepthBuffer: f.ignoreDepthValues === !1,
                resolveStencilBuffer: f.ignoreDepthValues === !1,
              })));
          }
          ((v.isXRRenderTarget = !0),
            this.setFoveation(c),
            (l = null),
            (o = await s.requestReferenceSpace(a)),
            Jt.setContext(s),
            Jt.start(),
            (n.isPresenting = !0),
            n.dispatchEvent({ type: "sessionstart" }));
        }
      }),
      (this.getEnvironmentBlendMode = function () {
        if (s !== null) return s.environmentBlendMode;
      }),
      (this.getDepthTexture = function () {
        return g.getDepthTexture();
      }));
    function Y(Z) {
      for (let nt = 0; nt < Z.removed.length; nt++) {
        const St = Z.removed[nt],
          Dt = E.indexOf(St);
        Dt >= 0 && ((E[Dt] = null), R[Dt].disconnect(St));
      }
      for (let nt = 0; nt < Z.added.length; nt++) {
        const St = Z.added[nt];
        let Dt = E.indexOf(St);
        if (Dt === -1) {
          for (let Zt = 0; Zt < R.length; Zt++)
            if (Zt >= E.length) {
              (E.push(St), (Dt = Zt));
              break;
            } else if (E[Zt] === null) {
              ((E[Zt] = St), (Dt = Zt));
              break;
            }
          if (Dt === -1) break;
        }
        const wt = R[Dt];
        wt && wt.connect(St);
      }
    }
    const H = new P(),
      ct = new P();
    function pt(Z, nt, St) {
      (H.setFromMatrixPosition(nt.matrixWorld),
        ct.setFromMatrixPosition(St.matrixWorld));
      const Dt = H.distanceTo(ct),
        wt = nt.projectionMatrix.elements,
        Zt = St.projectionMatrix.elements,
        me = wt[14] / (wt[10] - 1),
        D = wt[14] / (wt[10] + 1),
        et = (wt[9] + 1) / wt[5],
        J = (wt[9] - 1) / wt[5],
        $ = (wt[8] - 1) / wt[0],
        j = (Zt[8] + 1) / Zt[0],
        ut = me * $,
        it = me * j,
        dt = Dt / (-$ + j),
        kt = dt * -$;
      if (
        (nt.matrixWorld.decompose(Z.position, Z.quaternion, Z.scale),
        Z.translateX(kt),
        Z.translateZ(dt),
        Z.matrixWorld.compose(Z.position, Z.quaternion, Z.scale),
        Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),
        wt[10] === -1)
      )
        (Z.projectionMatrix.copy(nt.projectionMatrix),
          Z.projectionMatrixInverse.copy(nt.projectionMatrixInverse));
      else {
        const zt = me + dt,
          T = D + dt,
          x = ut - kt,
          z = it + (Dt - kt),
          X = ((et * D) / T) * zt,
          tt = ((J * D) / T) * zt;
        (Z.projectionMatrix.makePerspective(x, z, X, tt, zt, T),
          Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert());
      }
    }
    function gt(Z, nt) {
      (nt === null
        ? Z.matrixWorld.copy(Z.matrix)
        : Z.matrixWorld.multiplyMatrices(nt.matrixWorld, Z.matrix),
        Z.matrixWorldInverse.copy(Z.matrixWorld).invert());
    }
    this.updateCamera = function (Z) {
      if (s === null) return;
      let nt = Z.near,
        St = Z.far;
      (g.texture !== null &&
        (g.depthNear > 0 && (nt = g.depthNear),
        g.depthFar > 0 && (St = g.depthFar)),
        (I.near = M.near = y.near = nt),
        (I.far = M.far = y.far = St),
        (F !== I.near || B !== I.far) &&
          (s.updateRenderState({ depthNear: I.near, depthFar: I.far }),
          (F = I.near),
          (B = I.far)),
        (I.layers.mask = Z.layers.mask | 6),
        (y.layers.mask = I.layers.mask & 3),
        (M.layers.mask = I.layers.mask & 5));
      const Dt = Z.parent,
        wt = I.cameras;
      gt(I, Dt);
      for (let Zt = 0; Zt < wt.length; Zt++) gt(wt[Zt], Dt);
      (wt.length === 2
        ? pt(I, y, M)
        : I.projectionMatrix.copy(y.projectionMatrix),
        Lt(Z, I, Dt));
    };
    function Lt(Z, nt, St) {
      (St === null
        ? Z.matrix.copy(nt.matrixWorld)
        : (Z.matrix.copy(St.matrixWorld),
          Z.matrix.invert(),
          Z.matrix.multiply(nt.matrixWorld)),
        Z.matrix.decompose(Z.position, Z.quaternion, Z.scale),
        Z.updateMatrixWorld(!0),
        Z.projectionMatrix.copy(nt.projectionMatrix),
        Z.projectionMatrixInverse.copy(nt.projectionMatrixInverse),
        Z.isPerspectiveCamera &&
          ((Z.fov = ya * 2 * Math.atan(1 / Z.projectionMatrix.elements[5])),
          (Z.zoom = 1)));
    }
    ((this.getCamera = function () {
      return I;
    }),
      (this.getFoveation = function () {
        if (!(d === null && f === null)) return c;
      }),
      (this.setFoveation = function (Z) {
        ((c = Z),
          d !== null && (d.fixedFoveation = Z),
          f !== null && f.fixedFoveation !== void 0 && (f.fixedFoveation = Z));
      }),
      (this.hasDepthSensing = function () {
        return g.texture !== null;
      }),
      (this.getDepthSensingMesh = function () {
        return g.getMesh(I);
      }),
      (this.getCameraTexture = function (Z) {
        return p[Z];
      }));
    let $t = null;
    function re(Z, nt) {
      if (((h = nt.getViewerPose(l || o)), (m = nt), h !== null)) {
        const St = h.views;
        f !== null &&
          (t.setRenderTargetFramebuffer(v, f.framebuffer),
          t.setRenderTarget(v));
        let Dt = !1;
        St.length !== I.cameras.length && ((I.cameras.length = 0), (Dt = !0));
        for (let D = 0; D < St.length; D++) {
          const et = St[D];
          let J = null;
          if (f !== null) J = f.getViewport(et);
          else {
            const j = u.getViewSubImage(d, et);
            ((J = j.viewport),
              D === 0 &&
                (t.setRenderTargetTextures(
                  v,
                  j.colorTexture,
                  j.depthStencilTexture,
                ),
                t.setRenderTarget(v)));
          }
          let $ = w[D];
          ($ === void 0 &&
            (($ = new un()),
            $.layers.enable(D),
            ($.viewport = new Ee()),
            (w[D] = $)),
            $.matrix.fromArray(et.transform.matrix),
            $.matrix.decompose($.position, $.quaternion, $.scale),
            $.projectionMatrix.fromArray(et.projectionMatrix),
            $.projectionMatrixInverse.copy($.projectionMatrix).invert(),
            $.viewport.set(J.x, J.y, J.width, J.height),
            D === 0 &&
              (I.matrix.copy($.matrix),
              I.matrix.decompose(I.position, I.quaternion, I.scale)),
            Dt === !0 && I.cameras.push($));
        }
        const wt = s.enabledFeatures;
        if (
          wt &&
          wt.includes("depth-sensing") &&
          s.depthUsage == "gpu-optimized" &&
          _
        ) {
          u = n.getBinding();
          const D = u.getDepthInformation(St[0]);
          D && D.isValid && D.texture && g.init(D, s.renderState);
        }
        if (wt && wt.includes("camera-access") && _) {
          (t.state.unbindTexture(), (u = n.getBinding()));
          for (let D = 0; D < St.length; D++) {
            const et = St[D].camera;
            if (et) {
              let J = p[et];
              J || ((J = new rh()), (p[et] = J));
              const $ = u.getCameraImage(et);
              J.sourceTexture = $;
            }
          }
        }
      }
      for (let St = 0; St < R.length; St++) {
        const Dt = E[St],
          wt = R[St];
        Dt !== null && wt !== void 0 && wt.update(Dt, nt, l || o);
      }
      ($t && $t(Z, nt),
        nt.detectedPlanes &&
          n.dispatchEvent({ type: "planesdetected", data: nt }),
        (m = null));
    }
    const Jt = new xh();
    (Jt.setAnimationLoop(re),
      (this.setAnimationLoop = function (Z) {
        $t = Z;
      }),
      (this.dispose = function () {}));
  }
}
const pi = new yn(),
  L0 = new se();
function I0(i, t) {
  function e(g, p) {
    (g.matrixAutoUpdate === !0 && g.updateMatrix(), p.value.copy(g.matrix));
  }
  function n(g, p) {
    (p.color.getRGB(g.fogColor.value, th(i)),
      p.isFog
        ? ((g.fogNear.value = p.near), (g.fogFar.value = p.far))
        : p.isFogExp2 && (g.fogDensity.value = p.density));
  }
  function s(g, p, A, b, v) {
    p.isMeshBasicMaterial || p.isMeshLambertMaterial
      ? r(g, p)
      : p.isMeshToonMaterial
        ? (r(g, p), u(g, p))
        : p.isMeshPhongMaterial
          ? (r(g, p), h(g, p))
          : p.isMeshStandardMaterial
            ? (r(g, p), d(g, p), p.isMeshPhysicalMaterial && f(g, p, v))
            : p.isMeshMatcapMaterial
              ? (r(g, p), m(g, p))
              : p.isMeshDepthMaterial
                ? r(g, p)
                : p.isMeshDistanceMaterial
                  ? (r(g, p), _(g, p))
                  : p.isMeshNormalMaterial
                    ? r(g, p)
                    : p.isLineBasicMaterial
                      ? (o(g, p), p.isLineDashedMaterial && a(g, p))
                      : p.isPointsMaterial
                        ? c(g, p, A, b)
                        : p.isSpriteMaterial
                          ? l(g, p)
                          : p.isShadowMaterial
                            ? (g.color.value.copy(p.color),
                              (g.opacity.value = p.opacity))
                            : p.isShaderMaterial && (p.uniformsNeedUpdate = !1);
  }
  function r(g, p) {
    ((g.opacity.value = p.opacity),
      p.color && g.diffuse.value.copy(p.color),
      p.emissive &&
        g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),
      p.map && ((g.map.value = p.map), e(p.map, g.mapTransform)),
      p.alphaMap &&
        ((g.alphaMap.value = p.alphaMap), e(p.alphaMap, g.alphaMapTransform)),
      p.bumpMap &&
        ((g.bumpMap.value = p.bumpMap),
        e(p.bumpMap, g.bumpMapTransform),
        (g.bumpScale.value = p.bumpScale),
        p.side === $e && (g.bumpScale.value *= -1)),
      p.normalMap &&
        ((g.normalMap.value = p.normalMap),
        e(p.normalMap, g.normalMapTransform),
        g.normalScale.value.copy(p.normalScale),
        p.side === $e && g.normalScale.value.negate()),
      p.displacementMap &&
        ((g.displacementMap.value = p.displacementMap),
        e(p.displacementMap, g.displacementMapTransform),
        (g.displacementScale.value = p.displacementScale),
        (g.displacementBias.value = p.displacementBias)),
      p.emissiveMap &&
        ((g.emissiveMap.value = p.emissiveMap),
        e(p.emissiveMap, g.emissiveMapTransform)),
      p.specularMap &&
        ((g.specularMap.value = p.specularMap),
        e(p.specularMap, g.specularMapTransform)),
      p.alphaTest > 0 && (g.alphaTest.value = p.alphaTest));
    const A = t.get(p),
      b = A.envMap,
      v = A.envMapRotation;
    (b &&
      ((g.envMap.value = b),
      pi.copy(v),
      (pi.x *= -1),
      (pi.y *= -1),
      (pi.z *= -1),
      b.isCubeTexture &&
        b.isRenderTargetTexture === !1 &&
        ((pi.y *= -1), (pi.z *= -1)),
      g.envMapRotation.value.setFromMatrix4(L0.makeRotationFromEuler(pi)),
      (g.flipEnvMap.value =
        b.isCubeTexture && b.isRenderTargetTexture === !1 ? -1 : 1),
      (g.reflectivity.value = p.reflectivity),
      (g.ior.value = p.ior),
      (g.refractionRatio.value = p.refractionRatio)),
      p.lightMap &&
        ((g.lightMap.value = p.lightMap),
        (g.lightMapIntensity.value = p.lightMapIntensity),
        e(p.lightMap, g.lightMapTransform)),
      p.aoMap &&
        ((g.aoMap.value = p.aoMap),
        (g.aoMapIntensity.value = p.aoMapIntensity),
        e(p.aoMap, g.aoMapTransform)));
  }
  function o(g, p) {
    (g.diffuse.value.copy(p.color),
      (g.opacity.value = p.opacity),
      p.map && ((g.map.value = p.map), e(p.map, g.mapTransform)));
  }
  function a(g, p) {
    ((g.dashSize.value = p.dashSize),
      (g.totalSize.value = p.dashSize + p.gapSize),
      (g.scale.value = p.scale));
  }
  function c(g, p, A, b) {
    (g.diffuse.value.copy(p.color),
      (g.opacity.value = p.opacity),
      (g.size.value = p.size * A),
      (g.scale.value = b * 0.5),
      p.map && ((g.map.value = p.map), e(p.map, g.uvTransform)),
      p.alphaMap &&
        ((g.alphaMap.value = p.alphaMap), e(p.alphaMap, g.alphaMapTransform)),
      p.alphaTest > 0 && (g.alphaTest.value = p.alphaTest));
  }
  function l(g, p) {
    (g.diffuse.value.copy(p.color),
      (g.opacity.value = p.opacity),
      (g.rotation.value = p.rotation),
      p.map && ((g.map.value = p.map), e(p.map, g.mapTransform)),
      p.alphaMap &&
        ((g.alphaMap.value = p.alphaMap), e(p.alphaMap, g.alphaMapTransform)),
      p.alphaTest > 0 && (g.alphaTest.value = p.alphaTest));
  }
  function h(g, p) {
    (g.specular.value.copy(p.specular),
      (g.shininess.value = Math.max(p.shininess, 1e-4)));
  }
  function u(g, p) {
    p.gradientMap && (g.gradientMap.value = p.gradientMap);
  }
  function d(g, p) {
    ((g.metalness.value = p.metalness),
      p.metalnessMap &&
        ((g.metalnessMap.value = p.metalnessMap),
        e(p.metalnessMap, g.metalnessMapTransform)),
      (g.roughness.value = p.roughness),
      p.roughnessMap &&
        ((g.roughnessMap.value = p.roughnessMap),
        e(p.roughnessMap, g.roughnessMapTransform)),
      p.envMap && (g.envMapIntensity.value = p.envMapIntensity));
  }
  function f(g, p, A) {
    ((g.ior.value = p.ior),
      p.sheen > 0 &&
        (g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),
        (g.sheenRoughness.value = p.sheenRoughness),
        p.sheenColorMap &&
          ((g.sheenColorMap.value = p.sheenColorMap),
          e(p.sheenColorMap, g.sheenColorMapTransform)),
        p.sheenRoughnessMap &&
          ((g.sheenRoughnessMap.value = p.sheenRoughnessMap),
          e(p.sheenRoughnessMap, g.sheenRoughnessMapTransform))),
      p.clearcoat > 0 &&
        ((g.clearcoat.value = p.clearcoat),
        (g.clearcoatRoughness.value = p.clearcoatRoughness),
        p.clearcoatMap &&
          ((g.clearcoatMap.value = p.clearcoatMap),
          e(p.clearcoatMap, g.clearcoatMapTransform)),
        p.clearcoatRoughnessMap &&
          ((g.clearcoatRoughnessMap.value = p.clearcoatRoughnessMap),
          e(p.clearcoatRoughnessMap, g.clearcoatRoughnessMapTransform)),
        p.clearcoatNormalMap &&
          ((g.clearcoatNormalMap.value = p.clearcoatNormalMap),
          e(p.clearcoatNormalMap, g.clearcoatNormalMapTransform),
          g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),
          p.side === $e && g.clearcoatNormalScale.value.negate())),
      p.dispersion > 0 && (g.dispersion.value = p.dispersion),
      p.iridescence > 0 &&
        ((g.iridescence.value = p.iridescence),
        (g.iridescenceIOR.value = p.iridescenceIOR),
        (g.iridescenceThicknessMinimum.value = p.iridescenceThicknessRange[0]),
        (g.iridescenceThicknessMaximum.value = p.iridescenceThicknessRange[1]),
        p.iridescenceMap &&
          ((g.iridescenceMap.value = p.iridescenceMap),
          e(p.iridescenceMap, g.iridescenceMapTransform)),
        p.iridescenceThicknessMap &&
          ((g.iridescenceThicknessMap.value = p.iridescenceThicknessMap),
          e(p.iridescenceThicknessMap, g.iridescenceThicknessMapTransform))),
      p.transmission > 0 &&
        ((g.transmission.value = p.transmission),
        (g.transmissionSamplerMap.value = A.texture),
        g.transmissionSamplerSize.value.set(A.width, A.height),
        p.transmissionMap &&
          ((g.transmissionMap.value = p.transmissionMap),
          e(p.transmissionMap, g.transmissionMapTransform)),
        (g.thickness.value = p.thickness),
        p.thicknessMap &&
          ((g.thicknessMap.value = p.thicknessMap),
          e(p.thicknessMap, g.thicknessMapTransform)),
        (g.attenuationDistance.value = p.attenuationDistance),
        g.attenuationColor.value.copy(p.attenuationColor)),
      p.anisotropy > 0 &&
        (g.anisotropyVector.value.set(
          p.anisotropy * Math.cos(p.anisotropyRotation),
          p.anisotropy * Math.sin(p.anisotropyRotation),
        ),
        p.anisotropyMap &&
          ((g.anisotropyMap.value = p.anisotropyMap),
          e(p.anisotropyMap, g.anisotropyMapTransform))),
      (g.specularIntensity.value = p.specularIntensity),
      g.specularColor.value.copy(p.specularColor),
      p.specularColorMap &&
        ((g.specularColorMap.value = p.specularColorMap),
        e(p.specularColorMap, g.specularColorMapTransform)),
      p.specularIntensityMap &&
        ((g.specularIntensityMap.value = p.specularIntensityMap),
        e(p.specularIntensityMap, g.specularIntensityMapTransform)));
  }
  function m(g, p) {
    p.matcap && (g.matcap.value = p.matcap);
  }
  function _(g, p) {
    const A = t.get(p).light;
    (g.referencePosition.value.setFromMatrixPosition(A.matrixWorld),
      (g.nearDistance.value = A.shadow.camera.near),
      (g.farDistance.value = A.shadow.camera.far));
  }
  return { refreshFogUniforms: n, refreshMaterialUniforms: s };
}
function U0(i, t, e, n) {
  let s = {},
    r = {},
    o = [];
  const a = i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);
  function c(A, b) {
    const v = b.program;
    n.uniformBlockBinding(A, v);
  }
  function l(A, b) {
    let v = s[A.id];
    v === void 0 &&
      (m(A), (v = h(A)), (s[A.id] = v), A.addEventListener("dispose", g));
    const R = b.program;
    n.updateUBOMapping(A, R);
    const E = t.render.frame;
    r[A.id] !== E && (d(A), (r[A.id] = E));
  }
  function h(A) {
    const b = u();
    A.__bindingPointIndex = b;
    const v = i.createBuffer(),
      R = A.__size,
      E = A.usage;
    return (
      i.bindBuffer(i.UNIFORM_BUFFER, v),
      i.bufferData(i.UNIFORM_BUFFER, R, E),
      i.bindBuffer(i.UNIFORM_BUFFER, null),
      i.bindBufferBase(i.UNIFORM_BUFFER, b, v),
      v
    );
  }
  function u() {
    for (let A = 0; A < a; A++) if (o.indexOf(A) === -1) return (o.push(A), A);
    return (
      console.error(
        "THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.",
      ),
      0
    );
  }
  function d(A) {
    const b = s[A.id],
      v = A.uniforms,
      R = A.__cache;
    i.bindBuffer(i.UNIFORM_BUFFER, b);
    for (let E = 0, C = v.length; E < C; E++) {
      const L = Array.isArray(v[E]) ? v[E] : [v[E]];
      for (let y = 0, M = L.length; y < M; y++) {
        const w = L[y];
        if (f(w, E, y, R) === !0) {
          const I = w.__offset,
            F = Array.isArray(w.value) ? w.value : [w.value];
          let B = 0;
          for (let k = 0; k < F.length; k++) {
            const G = F[k],
              Y = _(G);
            typeof G == "number" || typeof G == "boolean"
              ? ((w.__data[0] = G),
                i.bufferSubData(i.UNIFORM_BUFFER, I + B, w.__data))
              : G.isMatrix3
                ? ((w.__data[0] = G.elements[0]),
                  (w.__data[1] = G.elements[1]),
                  (w.__data[2] = G.elements[2]),
                  (w.__data[3] = 0),
                  (w.__data[4] = G.elements[3]),
                  (w.__data[5] = G.elements[4]),
                  (w.__data[6] = G.elements[5]),
                  (w.__data[7] = 0),
                  (w.__data[8] = G.elements[6]),
                  (w.__data[9] = G.elements[7]),
                  (w.__data[10] = G.elements[8]),
                  (w.__data[11] = 0))
                : (G.toArray(w.__data, B),
                  (B += Y.storage / Float32Array.BYTES_PER_ELEMENT));
          }
          i.bufferSubData(i.UNIFORM_BUFFER, I, w.__data);
        }
      }
    }
    i.bindBuffer(i.UNIFORM_BUFFER, null);
  }
  function f(A, b, v, R) {
    const E = A.value,
      C = b + "_" + v;
    if (R[C] === void 0)
      return (
        typeof E == "number" || typeof E == "boolean"
          ? (R[C] = E)
          : (R[C] = E.clone()),
        !0
      );
    {
      const L = R[C];
      if (typeof E == "number" || typeof E == "boolean") {
        if (L !== E) return ((R[C] = E), !0);
      } else if (L.equals(E) === !1) return (L.copy(E), !0);
    }
    return !1;
  }
  function m(A) {
    const b = A.uniforms;
    let v = 0;
    const R = 16;
    for (let C = 0, L = b.length; C < L; C++) {
      const y = Array.isArray(b[C]) ? b[C] : [b[C]];
      for (let M = 0, w = y.length; M < w; M++) {
        const I = y[M],
          F = Array.isArray(I.value) ? I.value : [I.value];
        for (let B = 0, k = F.length; B < k; B++) {
          const G = F[B],
            Y = _(G),
            H = v % R,
            ct = H % Y.boundary,
            pt = H + ct;
          ((v += ct),
            pt !== 0 && R - pt < Y.storage && (v += R - pt),
            (I.__data = new Float32Array(
              Y.storage / Float32Array.BYTES_PER_ELEMENT,
            )),
            (I.__offset = v),
            (v += Y.storage));
        }
      }
    }
    const E = v % R;
    return (E > 0 && (v += R - E), (A.__size = v), (A.__cache = {}), this);
  }
  function _(A) {
    const b = { boundary: 0, storage: 0 };
    return (
      typeof A == "number" || typeof A == "boolean"
        ? ((b.boundary = 4), (b.storage = 4))
        : A.isVector2
          ? ((b.boundary = 8), (b.storage = 8))
          : A.isVector3 || A.isColor
            ? ((b.boundary = 16), (b.storage = 12))
            : A.isVector4
              ? ((b.boundary = 16), (b.storage = 16))
              : A.isMatrix3
                ? ((b.boundary = 48), (b.storage = 48))
                : A.isMatrix4
                  ? ((b.boundary = 64), (b.storage = 64))
                  : A.isTexture
                    ? console.warn(
                        "THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.",
                      )
                    : console.warn(
                        "THREE.WebGLRenderer: Unsupported uniform value type.",
                        A,
                      ),
      b
    );
  }
  function g(A) {
    const b = A.target;
    b.removeEventListener("dispose", g);
    const v = o.indexOf(b.__bindingPointIndex);
    (o.splice(v, 1), i.deleteBuffer(s[b.id]), delete s[b.id], delete r[b.id]);
  }
  function p() {
    for (const A in s) i.deleteBuffer(s[A]);
    ((o = []), (s = {}), (r = {}));
  }
  return { bind: c, update: l, dispose: p };
}
class N0 {
  constructor(t = {}) {
    const {
      canvas: e = Nu(),
      context: n = null,
      depth: s = !0,
      stencil: r = !1,
      alpha: o = !1,
      antialias: a = !1,
      premultipliedAlpha: c = !0,
      preserveDrawingBuffer: l = !1,
      powerPreference: h = "default",
      failIfMajorPerformanceCaveat: u = !1,
      reversedDepthBuffer: d = !1,
    } = t;
    this.isWebGLRenderer = !0;
    let f;
    if (n !== null) {
      if (
        typeof WebGLRenderingContext < "u" &&
        n instanceof WebGLRenderingContext
      )
        throw new Error(
          "THREE.WebGLRenderer: WebGL 1 is not supported since r163.",
        );
      f = n.getContextAttributes().alpha;
    } else f = o;
    const m = new Uint32Array(4),
      _ = new Int32Array(4);
    let g = null,
      p = null;
    const A = [],
      b = [];
    ((this.domElement = e),
      (this.debug = { checkShaderErrors: !0, onShaderError: null }),
      (this.autoClear = !0),
      (this.autoClearColor = !0),
      (this.autoClearDepth = !0),
      (this.autoClearStencil = !0),
      (this.sortObjects = !0),
      (this.clippingPlanes = []),
      (this.localClippingEnabled = !1),
      (this.toneMapping = kn),
      (this.toneMappingExposure = 1),
      (this.transmissionResolutionScale = 1));
    const v = this;
    let R = !1;
    this._outputColorSpace = Ve;
    let E = 0,
      C = 0,
      L = null,
      y = -1,
      M = null;
    const w = new Ee(),
      I = new Ee();
    let F = null;
    const B = new Ht(0);
    let k = 0,
      G = e.width,
      Y = e.height,
      H = 1,
      ct = null,
      pt = null;
    const gt = new Ee(0, 0, G, Y),
      Lt = new Ee(0, 0, G, Y);
    let $t = !1;
    const re = new qa();
    let Jt = !1,
      Z = !1;
    const nt = new se(),
      St = new P(),
      Dt = new Ee(),
      wt = {
        background: null,
        fog: null,
        environment: null,
        overrideMaterial: null,
        isScene: !0,
      };
    let Zt = !1;
    function me() {
      return L === null ? H : 1;
    }
    let D = n;
    function et(S, N) {
      return e.getContext(S, N);
    }
    try {
      const S = {
        alpha: !0,
        depth: s,
        stencil: r,
        antialias: a,
        premultipliedAlpha: c,
        preserveDrawingBuffer: l,
        powerPreference: h,
        failIfMajorPerformanceCaveat: u,
      };
      if (
        ("setAttribute" in e &&
          e.setAttribute("data-engine", `three.js r${Ia}`),
        e.addEventListener("webglcontextlost", ft, !1),
        e.addEventListener("webglcontextrestored", bt, !1),
        e.addEventListener("webglcontextcreationerror", rt, !1),
        D === null)
      ) {
        const N = "webgl2";
        if (((D = et(N, S)), D === null))
          throw et(N)
            ? new Error(
                "Error creating WebGL context with your selected attributes.",
              )
            : new Error("Error creating WebGL context.");
      }
    } catch (S) {
      throw (console.error("THREE.WebGLRenderer: " + S.message), S);
    }
    let J,
      $,
      j,
      ut,
      it,
      dt,
      kt,
      zt,
      T,
      x,
      z,
      X,
      tt,
      q,
      Ct,
      ht,
      Tt,
      At,
      st,
      xt,
      Ft,
      Pt,
      _t,
      Gt;
    function U() {
      ((J = new Xm(D)),
        J.init(),
        (Pt = new A0(D, J)),
        ($ = new zm(D, J, t, Pt)),
        (j = new w0(D, J)),
        $.reversedDepthBuffer && d && j.buffers.depth.setReversed(!0),
        (ut = new Km(D)),
        (it = new d0()),
        (dt = new T0(D, J, j, it, $, Pt, ut)),
        (kt = new Bm(v)),
        (zt = new Wm(v)),
        (T = new Qd(D)),
        (_t = new Fm(D, T)),
        (x = new qm(D, T, ut, _t)),
        (z = new jm(D, x, T, ut)),
        (st = new Zm(D, $, dt)),
        (ht = new km(it)),
        (X = new u0(v, kt, zt, J, $, _t, ht)),
        (tt = new I0(v, it)),
        (q = new p0()),
        (Ct = new y0(J)),
        (At = new Nm(v, kt, zt, j, z, f, c)),
        (Tt = new b0(v, z, $)),
        (Gt = new U0(D, ut, $, j)),
        (xt = new Om(D, J, ut)),
        (Ft = new Ym(D, J, ut)),
        (ut.programs = X.programs),
        (v.capabilities = $),
        (v.extensions = J),
        (v.properties = it),
        (v.renderLists = q),
        (v.shadowMap = Tt),
        (v.state = j),
        (v.info = ut));
    }
    U();
    const lt = new D0(v, D);
    ((this.xr = lt),
      (this.getContext = function () {
        return D;
      }),
      (this.getContextAttributes = function () {
        return D.getContextAttributes();
      }),
      (this.forceContextLoss = function () {
        const S = J.get("WEBGL_lose_context");
        S && S.loseContext();
      }),
      (this.forceContextRestore = function () {
        const S = J.get("WEBGL_lose_context");
        S && S.restoreContext();
      }),
      (this.getPixelRatio = function () {
        return H;
      }),
      (this.setPixelRatio = function (S) {
        S !== void 0 && ((H = S), this.setSize(G, Y, !1));
      }),
      (this.getSize = function (S) {
        return S.set(G, Y);
      }),
      (this.setSize = function (S, N, V = !0) {
        if (lt.isPresenting) {
          console.warn(
            "THREE.WebGLRenderer: Can't change size while VR device is presenting.",
          );
          return;
        }
        ((G = S),
          (Y = N),
          (e.width = Math.floor(S * H)),
          (e.height = Math.floor(N * H)),
          V === !0 && ((e.style.width = S + "px"), (e.style.height = N + "px")),
          this.setViewport(0, 0, S, N));
      }),
      (this.getDrawingBufferSize = function (S) {
        return S.set(G * H, Y * H).floor();
      }),
      (this.setDrawingBufferSize = function (S, N, V) {
        ((G = S),
          (Y = N),
          (H = V),
          (e.width = Math.floor(S * V)),
          (e.height = Math.floor(N * V)),
          this.setViewport(0, 0, S, N));
      }),
      (this.getCurrentViewport = function (S) {
        return S.copy(w);
      }),
      (this.getViewport = function (S) {
        return S.copy(gt);
      }),
      (this.setViewport = function (S, N, V, W) {
        (S.isVector4 ? gt.set(S.x, S.y, S.z, S.w) : gt.set(S, N, V, W),
          j.viewport(w.copy(gt).multiplyScalar(H).round()));
      }),
      (this.getScissor = function (S) {
        return S.copy(Lt);
      }),
      (this.setScissor = function (S, N, V, W) {
        (S.isVector4 ? Lt.set(S.x, S.y, S.z, S.w) : Lt.set(S, N, V, W),
          j.scissor(I.copy(Lt).multiplyScalar(H).round()));
      }),
      (this.getScissorTest = function () {
        return $t;
      }),
      (this.setScissorTest = function (S) {
        j.setScissorTest(($t = S));
      }),
      (this.setOpaqueSort = function (S) {
        ct = S;
      }),
      (this.setTransparentSort = function (S) {
        pt = S;
      }),
      (this.getClearColor = function (S) {
        return S.copy(At.getClearColor());
      }),
      (this.setClearColor = function () {
        At.setClearColor(...arguments);
      }),
      (this.getClearAlpha = function () {
        return At.getClearAlpha();
      }),
      (this.setClearAlpha = function () {
        At.setClearAlpha(...arguments);
      }),
      (this.clear = function (S = !0, N = !0, V = !0) {
        let W = 0;
        if (S) {
          let O = !1;
          if (L !== null) {
            const ot = L.texture.format;
            O = ot === Ha || ot === Ba || ot === ka;
          }
          if (O) {
            const ot = L.texture.type,
              vt =
                ot === Tn ||
                ot === si ||
                ot === ws ||
                ot === Ts ||
                ot === Fa ||
                ot === Oa,
              Et = At.getClearColor(),
              Mt = At.getClearAlpha(),
              Nt = Et.r,
              Ot = Et.g,
              It = Et.b;
            vt
              ? ((m[0] = Nt),
                (m[1] = Ot),
                (m[2] = It),
                (m[3] = Mt),
                D.clearBufferuiv(D.COLOR, 0, m))
              : ((_[0] = Nt),
                (_[1] = Ot),
                (_[2] = It),
                (_[3] = Mt),
                D.clearBufferiv(D.COLOR, 0, _));
          } else W |= D.COLOR_BUFFER_BIT;
        }
        (N && (W |= D.DEPTH_BUFFER_BIT),
          V &&
            ((W |= D.STENCIL_BUFFER_BIT),
            this.state.buffers.stencil.setMask(4294967295)),
          D.clear(W));
      }),
      (this.clearColor = function () {
        this.clear(!0, !1, !1);
      }),
      (this.clearDepth = function () {
        this.clear(!1, !0, !1);
      }),
      (this.clearStencil = function () {
        this.clear(!1, !1, !0);
      }),
      (this.dispose = function () {
        (e.removeEventListener("webglcontextlost", ft, !1),
          e.removeEventListener("webglcontextrestored", bt, !1),
          e.removeEventListener("webglcontextcreationerror", rt, !1),
          At.dispose(),
          q.dispose(),
          Ct.dispose(),
          it.dispose(),
          kt.dispose(),
          zt.dispose(),
          z.dispose(),
          _t.dispose(),
          Gt.dispose(),
          X.dispose(),
          lt.dispose(),
          lt.removeEventListener("sessionstart", Sn),
          lt.removeEventListener("sessionend", hc),
          ai.stop());
      }));
    function ft(S) {
      (S.preventDefault(),
        console.log("THREE.WebGLRenderer: Context Lost."),
        (R = !0));
    }
    function bt() {
      (console.log("THREE.WebGLRenderer: Context Restored."), (R = !1));
      const S = ut.autoReset,
        N = Tt.enabled,
        V = Tt.autoUpdate,
        W = Tt.needsUpdate,
        O = Tt.type;
      (U(),
        (ut.autoReset = S),
        (Tt.enabled = N),
        (Tt.autoUpdate = V),
        (Tt.needsUpdate = W),
        (Tt.type = O));
    }
    function rt(S) {
      console.error(
        "THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",
        S.statusMessage,
      );
    }
    function Q(S) {
      const N = S.target;
      (N.removeEventListener("dispose", Q), Rt(N));
    }
    function Rt(S) {
      (Bt(S), it.remove(S));
    }
    function Bt(S) {
      const N = it.get(S).programs;
      N !== void 0 &&
        (N.forEach(function (V) {
          X.releaseProgram(V);
        }),
        S.isShaderMaterial && X.releaseShaderCache(S));
    }
    this.renderBufferDirect = function (S, N, V, W, O, ot) {
      N === null && (N = wt);
      const vt = O.isMesh && O.matrixWorld.determinant() < 0,
        Et = Oh(S, N, V, W, O);
      j.setMaterial(W, vt);
      let Mt = V.index,
        Nt = 1;
      if (W.wireframe === !0) {
        if (((Mt = x.getWireframeAttribute(V)), Mt === void 0)) return;
        Nt = 2;
      }
      const Ot = V.drawRange,
        It = V.attributes.position;
      let jt = Ot.start * Nt,
        ae = (Ot.start + Ot.count) * Nt;
      (ot !== null &&
        ((jt = Math.max(jt, ot.start * Nt)),
        (ae = Math.min(ae, (ot.start + ot.count) * Nt))),
        Mt !== null
          ? ((jt = Math.max(jt, 0)), (ae = Math.min(ae, Mt.count)))
          : It != null &&
            ((jt = Math.max(jt, 0)), (ae = Math.min(ae, It.count))));
      const Se = ae - jt;
      if (Se < 0 || Se === 1 / 0) return;
      _t.setup(O, W, Et, V, Mt);
      let _e,
        de = xt;
      if (
        (Mt !== null && ((_e = T.get(Mt)), (de = Ft), de.setIndex(_e)),
        O.isMesh)
      )
        W.wireframe === !0
          ? (j.setLineWidth(W.wireframeLinewidth * me()), de.setMode(D.LINES))
          : de.setMode(D.TRIANGLES);
      else if (O.isLine) {
        let Ut = W.linewidth;
        (Ut === void 0 && (Ut = 1),
          j.setLineWidth(Ut * me()),
          O.isLineSegments
            ? de.setMode(D.LINES)
            : O.isLineLoop
              ? de.setMode(D.LINE_LOOP)
              : de.setMode(D.LINE_STRIP));
      } else
        O.isPoints
          ? de.setMode(D.POINTS)
          : O.isSprite && de.setMode(D.TRIANGLES);
      if (O.isBatchedMesh)
        if (O._multiDrawInstances !== null)
          (Cs(
            "THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection.",
          ),
            de.renderMultiDrawInstances(
              O._multiDrawStarts,
              O._multiDrawCounts,
              O._multiDrawCount,
              O._multiDrawInstances,
            ));
        else if (J.get("WEBGL_multi_draw"))
          de.renderMultiDraw(
            O._multiDrawStarts,
            O._multiDrawCounts,
            O._multiDrawCount,
          );
        else {
          const Ut = O._multiDrawStarts,
            xe = O._multiDrawCounts,
            Qt = O._multiDrawCount,
            tn = Mt ? T.get(Mt).bytesPerElement : 1,
            Pi = it.get(W).currentProgram.getUniforms();
          for (let en = 0; en < Qt; en++)
            (Pi.setValue(D, "_gl_DrawID", en), de.render(Ut[en] / tn, xe[en]));
        }
      else if (O.isInstancedMesh) de.renderInstances(jt, Se, O.count);
      else if (V.isInstancedBufferGeometry) {
        const Ut = V._maxInstanceCount !== void 0 ? V._maxInstanceCount : 1 / 0,
          xe = Math.min(V.instanceCount, Ut);
        de.renderInstances(jt, Se, xe);
      } else de.render(jt, Se);
    };
    function ge(S, N, V) {
      S.transparent === !0 && S.side === _n && S.forceSinglePass === !1
        ? ((S.side = $e),
          (S.needsUpdate = !0),
          zs(S, N, V),
          (S.side = ii),
          (S.needsUpdate = !0),
          zs(S, N, V),
          (S.side = _n))
        : zs(S, N, V);
    }
    ((this.compile = function (S, N, V = null) {
      (V === null && (V = S),
        (p = Ct.get(V)),
        p.init(N),
        b.push(p),
        V.traverseVisible(function (O) {
          O.isLight &&
            O.layers.test(N.layers) &&
            (p.pushLight(O), O.castShadow && p.pushShadow(O));
        }),
        S !== V &&
          S.traverseVisible(function (O) {
            O.isLight &&
              O.layers.test(N.layers) &&
              (p.pushLight(O), O.castShadow && p.pushShadow(O));
          }),
        p.setupLights());
      const W = new Set();
      return (
        S.traverse(function (O) {
          if (!(O.isMesh || O.isPoints || O.isLine || O.isSprite)) return;
          const ot = O.material;
          if (ot)
            if (Array.isArray(ot))
              for (let vt = 0; vt < ot.length; vt++) {
                const Et = ot[vt];
                (ge(Et, V, O), W.add(Et));
              }
            else (ge(ot, V, O), W.add(ot));
        }),
        (p = b.pop()),
        W
      );
    }),
      (this.compileAsync = function (S, N, V = null) {
        const W = this.compile(S, N, V);
        return new Promise((O) => {
          function ot() {
            if (
              (W.forEach(function (vt) {
                it.get(vt).currentProgram.isReady() && W.delete(vt);
              }),
              W.size === 0)
            ) {
              O(S);
              return;
            }
            setTimeout(ot, 10);
          }
          J.get("KHR_parallel_shader_compile") !== null
            ? ot()
            : setTimeout(ot, 10);
        });
      }));
    let ne = null;
    function Rn(S) {
      ne && ne(S);
    }
    function Sn() {
      ai.stop();
    }
    function hc() {
      ai.start();
    }
    const ai = new xh();
    (ai.setAnimationLoop(Rn),
      typeof self < "u" && ai.setContext(self),
      (this.setAnimationLoop = function (S) {
        ((ne = S), lt.setAnimationLoop(S), S === null ? ai.stop() : ai.start());
      }),
      lt.addEventListener("sessionstart", Sn),
      lt.addEventListener("sessionend", hc),
      (this.render = function (S, N) {
        if (N !== void 0 && N.isCamera !== !0) {
          console.error(
            "THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.",
          );
          return;
        }
        if (R === !0) return;
        if (
          (S.matrixWorldAutoUpdate === !0 && S.updateMatrixWorld(),
          N.parent === null &&
            N.matrixWorldAutoUpdate === !0 &&
            N.updateMatrixWorld(),
          lt.enabled === !0 &&
            lt.isPresenting === !0 &&
            (lt.cameraAutoUpdate === !0 && lt.updateCamera(N),
            (N = lt.getCamera())),
          S.isScene === !0 && S.onBeforeRender(v, S, N, L),
          (p = Ct.get(S, b.length)),
          p.init(N),
          b.push(p),
          nt.multiplyMatrices(N.projectionMatrix, N.matrixWorldInverse),
          re.setFromProjectionMatrix(nt, wn, N.reversedDepth),
          (Z = this.localClippingEnabled),
          (Jt = ht.init(this.clippingPlanes, Z)),
          (g = q.get(S, A.length)),
          g.init(),
          A.push(g),
          lt.enabled === !0 && lt.isPresenting === !0)
        ) {
          const ot = v.xr.getDepthSensingMesh();
          ot !== null && Wr(ot, N, -1 / 0, v.sortObjects);
        }
        (Wr(S, N, 0, v.sortObjects),
          g.finish(),
          v.sortObjects === !0 && g.sort(ct, pt),
          (Zt =
            lt.enabled === !1 ||
            lt.isPresenting === !1 ||
            lt.hasDepthSensing() === !1),
          Zt && At.addToRenderList(g, S),
          this.info.render.frame++,
          Jt === !0 && ht.beginShadows());
        const V = p.state.shadowsArray;
        (Tt.render(V, S, N),
          Jt === !0 && ht.endShadows(),
          this.info.autoReset === !0 && this.info.reset());
        const W = g.opaque,
          O = g.transmissive;
        if ((p.setupLights(), N.isArrayCamera)) {
          const ot = N.cameras;
          if (O.length > 0)
            for (let vt = 0, Et = ot.length; vt < Et; vt++) {
              const Mt = ot[vt];
              dc(W, O, S, Mt);
            }
          Zt && At.render(S);
          for (let vt = 0, Et = ot.length; vt < Et; vt++) {
            const Mt = ot[vt];
            uc(g, S, Mt, Mt.viewport);
          }
        } else
          (O.length > 0 && dc(W, O, S, N), Zt && At.render(S), uc(g, S, N));
        (L !== null &&
          C === 0 &&
          (dt.updateMultisampleRenderTarget(L), dt.updateRenderTargetMipmap(L)),
          S.isScene === !0 && S.onAfterRender(v, S, N),
          _t.resetDefaultState(),
          (y = -1),
          (M = null),
          b.pop(),
          b.length > 0
            ? ((p = b[b.length - 1]),
              Jt === !0 && ht.setGlobalState(v.clippingPlanes, p.state.camera))
            : (p = null),
          A.pop(),
          A.length > 0 ? (g = A[A.length - 1]) : (g = null));
      }));
    function Wr(S, N, V, W) {
      if (S.visible === !1) return;
      if (S.layers.test(N.layers)) {
        if (S.isGroup) V = S.renderOrder;
        else if (S.isLOD) S.autoUpdate === !0 && S.update(N);
        else if (S.isLight) (p.pushLight(S), S.castShadow && p.pushShadow(S));
        else if (S.isSprite) {
          if (!S.frustumCulled || re.intersectsSprite(S)) {
            W && Dt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(nt);
            const vt = z.update(S),
              Et = S.material;
            Et.visible && g.push(S, vt, Et, V, Dt.z, null);
          }
        } else if (
          (S.isMesh || S.isLine || S.isPoints) &&
          (!S.frustumCulled || re.intersectsObject(S))
        ) {
          const vt = z.update(S),
            Et = S.material;
          if (
            (W &&
              (S.boundingSphere !== void 0
                ? (S.boundingSphere === null && S.computeBoundingSphere(),
                  Dt.copy(S.boundingSphere.center))
                : (vt.boundingSphere === null && vt.computeBoundingSphere(),
                  Dt.copy(vt.boundingSphere.center)),
              Dt.applyMatrix4(S.matrixWorld).applyMatrix4(nt)),
            Array.isArray(Et))
          ) {
            const Mt = vt.groups;
            for (let Nt = 0, Ot = Mt.length; Nt < Ot; Nt++) {
              const It = Mt[Nt],
                jt = Et[It.materialIndex];
              jt && jt.visible && g.push(S, vt, jt, V, Dt.z, It);
            }
          } else Et.visible && g.push(S, vt, Et, V, Dt.z, null);
        }
      }
      const ot = S.children;
      for (let vt = 0, Et = ot.length; vt < Et; vt++) Wr(ot[vt], N, V, W);
    }
    function uc(S, N, V, W) {
      const O = S.opaque,
        ot = S.transmissive,
        vt = S.transparent;
      (p.setupLightsView(V),
        Jt === !0 && ht.setGlobalState(v.clippingPlanes, V),
        W && j.viewport(w.copy(W)),
        O.length > 0 && Os(O, N, V),
        ot.length > 0 && Os(ot, N, V),
        vt.length > 0 && Os(vt, N, V),
        j.buffers.depth.setTest(!0),
        j.buffers.depth.setMask(!0),
        j.buffers.color.setMask(!0),
        j.setPolygonOffset(!1));
    }
    function dc(S, N, V, W) {
      if ((V.isScene === !0 ? V.overrideMaterial : null) !== null) return;
      p.state.transmissionRenderTarget[W.id] === void 0 &&
        (p.state.transmissionRenderTarget[W.id] = new Gn(1, 1, {
          generateMipmaps: !0,
          type:
            J.has("EXT_color_buffer_half_float") ||
            J.has("EXT_color_buffer_float")
              ? Fs
              : Tn,
          minFilter: xi,
          samples: 4,
          stencilBuffer: r,
          resolveDepthBuffer: !1,
          resolveStencilBuffer: !1,
          colorSpace: ee.workingColorSpace,
        }));
      const ot = p.state.transmissionRenderTarget[W.id],
        vt = W.viewport || w;
      ot.setSize(
        vt.z * v.transmissionResolutionScale,
        vt.w * v.transmissionResolutionScale,
      );
      const Et = v.getRenderTarget(),
        Mt = v.getActiveCubeFace(),
        Nt = v.getActiveMipmapLevel();
      (v.setRenderTarget(ot),
        v.getClearColor(B),
        (k = v.getClearAlpha()),
        k < 1 && v.setClearColor(16777215, 0.5),
        v.clear(),
        Zt && At.render(V));
      const Ot = v.toneMapping;
      v.toneMapping = kn;
      const It = W.viewport;
      if (
        (W.viewport !== void 0 && (W.viewport = void 0),
        p.setupLightsView(W),
        Jt === !0 && ht.setGlobalState(v.clippingPlanes, W),
        Os(S, V, W),
        dt.updateMultisampleRenderTarget(ot),
        dt.updateRenderTargetMipmap(ot),
        J.has("WEBGL_multisampled_render_to_texture") === !1)
      ) {
        let jt = !1;
        for (let ae = 0, Se = N.length; ae < Se; ae++) {
          const _e = N[ae],
            de = _e.object,
            Ut = _e.geometry,
            xe = _e.material,
            Qt = _e.group;
          if (xe.side === _n && de.layers.test(W.layers)) {
            const tn = xe.side;
            ((xe.side = $e),
              (xe.needsUpdate = !0),
              fc(de, V, W, Ut, xe, Qt),
              (xe.side = tn),
              (xe.needsUpdate = !0),
              (jt = !0));
          }
        }
        jt === !0 &&
          (dt.updateMultisampleRenderTarget(ot),
          dt.updateRenderTargetMipmap(ot));
      }
      (v.setRenderTarget(Et, Mt, Nt),
        v.setClearColor(B, k),
        It !== void 0 && (W.viewport = It),
        (v.toneMapping = Ot));
    }
    function Os(S, N, V) {
      const W = N.isScene === !0 ? N.overrideMaterial : null;
      for (let O = 0, ot = S.length; O < ot; O++) {
        const vt = S[O],
          Et = vt.object,
          Mt = vt.geometry,
          Nt = vt.group;
        let Ot = vt.material;
        (Ot.allowOverride === !0 && W !== null && (Ot = W),
          Et.layers.test(V.layers) && fc(Et, N, V, Mt, Ot, Nt));
      }
    }
    function fc(S, N, V, W, O, ot) {
      (S.onBeforeRender(v, N, V, W, O, ot),
        S.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse, S.matrixWorld),
        S.normalMatrix.getNormalMatrix(S.modelViewMatrix),
        O.onBeforeRender(v, N, V, W, S, ot),
        O.transparent === !0 && O.side === _n && O.forceSinglePass === !1
          ? ((O.side = $e),
            (O.needsUpdate = !0),
            v.renderBufferDirect(V, N, W, O, S, ot),
            (O.side = ii),
            (O.needsUpdate = !0),
            v.renderBufferDirect(V, N, W, O, S, ot),
            (O.side = _n))
          : v.renderBufferDirect(V, N, W, O, S, ot),
        S.onAfterRender(v, N, V, W, O, ot));
    }
    function zs(S, N, V) {
      N.isScene !== !0 && (N = wt);
      const W = it.get(S),
        O = p.state.lights,
        ot = p.state.shadowsArray,
        vt = O.state.version,
        Et = X.getParameters(S, O.state, ot, N, V),
        Mt = X.getProgramCacheKey(Et);
      let Nt = W.programs;
      ((W.environment = S.isMeshStandardMaterial ? N.environment : null),
        (W.fog = N.fog),
        (W.envMap = (S.isMeshStandardMaterial ? zt : kt).get(
          S.envMap || W.environment,
        )),
        (W.envMapRotation =
          W.environment !== null && S.envMap === null
            ? N.environmentRotation
            : S.envMapRotation),
        Nt === void 0 &&
          (S.addEventListener("dispose", Q),
          (Nt = new Map()),
          (W.programs = Nt)));
      let Ot = Nt.get(Mt);
      if (Ot !== void 0) {
        if (W.currentProgram === Ot && W.lightsStateVersion === vt)
          return (mc(S, Et), Ot);
      } else
        ((Et.uniforms = X.getUniforms(S)),
          S.onBeforeCompile(Et, v),
          (Ot = X.acquireProgram(Et, Mt)),
          Nt.set(Mt, Ot),
          (W.uniforms = Et.uniforms));
      const It = W.uniforms;
      return (
        ((!S.isShaderMaterial && !S.isRawShaderMaterial) ||
          S.clipping === !0) &&
          (It.clippingPlanes = ht.uniform),
        mc(S, Et),
        (W.needsLights = kh(S)),
        (W.lightsStateVersion = vt),
        W.needsLights &&
          ((It.ambientLightColor.value = O.state.ambient),
          (It.lightProbe.value = O.state.probe),
          (It.directionalLights.value = O.state.directional),
          (It.directionalLightShadows.value = O.state.directionalShadow),
          (It.spotLights.value = O.state.spot),
          (It.spotLightShadows.value = O.state.spotShadow),
          (It.rectAreaLights.value = O.state.rectArea),
          (It.ltc_1.value = O.state.rectAreaLTC1),
          (It.ltc_2.value = O.state.rectAreaLTC2),
          (It.pointLights.value = O.state.point),
          (It.pointLightShadows.value = O.state.pointShadow),
          (It.hemisphereLights.value = O.state.hemi),
          (It.directionalShadowMap.value = O.state.directionalShadowMap),
          (It.directionalShadowMatrix.value = O.state.directionalShadowMatrix),
          (It.spotShadowMap.value = O.state.spotShadowMap),
          (It.spotLightMatrix.value = O.state.spotLightMatrix),
          (It.spotLightMap.value = O.state.spotLightMap),
          (It.pointShadowMap.value = O.state.pointShadowMap),
          (It.pointShadowMatrix.value = O.state.pointShadowMatrix)),
        (W.currentProgram = Ot),
        (W.uniformsList = null),
        Ot
      );
    }
    function pc(S) {
      if (S.uniformsList === null) {
        const N = S.currentProgram.getUniforms();
        S.uniformsList = Mr.seqWithValue(N.seq, S.uniforms);
      }
      return S.uniformsList;
    }
    function mc(S, N) {
      const V = it.get(S);
      ((V.outputColorSpace = N.outputColorSpace),
        (V.batching = N.batching),
        (V.batchingColor = N.batchingColor),
        (V.instancing = N.instancing),
        (V.instancingColor = N.instancingColor),
        (V.instancingMorph = N.instancingMorph),
        (V.skinning = N.skinning),
        (V.morphTargets = N.morphTargets),
        (V.morphNormals = N.morphNormals),
        (V.morphColors = N.morphColors),
        (V.morphTargetsCount = N.morphTargetsCount),
        (V.numClippingPlanes = N.numClippingPlanes),
        (V.numIntersection = N.numClipIntersection),
        (V.vertexAlphas = N.vertexAlphas),
        (V.vertexTangents = N.vertexTangents),
        (V.toneMapping = N.toneMapping));
    }
    function Oh(S, N, V, W, O) {
      (N.isScene !== !0 && (N = wt), dt.resetTextureUnits());
      const ot = N.fog,
        vt = W.isMeshStandardMaterial ? N.environment : null,
        Et =
          L === null
            ? v.outputColorSpace
            : L.isXRRenderTarget === !0
              ? L.texture.colorSpace
              : ns,
        Mt = (W.isMeshStandardMaterial ? zt : kt).get(W.envMap || vt),
        Nt =
          W.vertexColors === !0 &&
          !!V.attributes.color &&
          V.attributes.color.itemSize === 4,
        Ot = !!V.attributes.tangent && (!!W.normalMap || W.anisotropy > 0),
        It = !!V.morphAttributes.position,
        jt = !!V.morphAttributes.normal,
        ae = !!V.morphAttributes.color;
      let Se = kn;
      W.toneMapped &&
        (L === null || L.isXRRenderTarget === !0) &&
        (Se = v.toneMapping);
      const _e =
          V.morphAttributes.position ||
          V.morphAttributes.normal ||
          V.morphAttributes.color,
        de = _e !== void 0 ? _e.length : 0,
        Ut = it.get(W),
        xe = p.state.lights;
      if (Jt === !0 && (Z === !0 || S !== M)) {
        const Be = S === M && W.id === y;
        ht.setState(W, S, Be);
      }
      let Qt = !1;
      W.version === Ut.__version
        ? ((Ut.needsLights && Ut.lightsStateVersion !== xe.state.version) ||
            Ut.outputColorSpace !== Et ||
            (O.isBatchedMesh && Ut.batching === !1) ||
            (!O.isBatchedMesh && Ut.batching === !0) ||
            (O.isBatchedMesh &&
              Ut.batchingColor === !0 &&
              O.colorTexture === null) ||
            (O.isBatchedMesh &&
              Ut.batchingColor === !1 &&
              O.colorTexture !== null) ||
            (O.isInstancedMesh && Ut.instancing === !1) ||
            (!O.isInstancedMesh && Ut.instancing === !0) ||
            (O.isSkinnedMesh && Ut.skinning === !1) ||
            (!O.isSkinnedMesh && Ut.skinning === !0) ||
            (O.isInstancedMesh &&
              Ut.instancingColor === !0 &&
              O.instanceColor === null) ||
            (O.isInstancedMesh &&
              Ut.instancingColor === !1 &&
              O.instanceColor !== null) ||
            (O.isInstancedMesh &&
              Ut.instancingMorph === !0 &&
              O.morphTexture === null) ||
            (O.isInstancedMesh &&
              Ut.instancingMorph === !1 &&
              O.morphTexture !== null) ||
            Ut.envMap !== Mt ||
            (W.fog === !0 && Ut.fog !== ot) ||
            (Ut.numClippingPlanes !== void 0 &&
              (Ut.numClippingPlanes !== ht.numPlanes ||
                Ut.numIntersection !== ht.numIntersection)) ||
            Ut.vertexAlphas !== Nt ||
            Ut.vertexTangents !== Ot ||
            Ut.morphTargets !== It ||
            Ut.morphNormals !== jt ||
            Ut.morphColors !== ae ||
            Ut.toneMapping !== Se ||
            Ut.morphTargetsCount !== de) &&
          (Qt = !0)
        : ((Qt = !0), (Ut.__version = W.version));
      let tn = Ut.currentProgram;
      Qt === !0 && (tn = zs(W, N, O));
      let Pi = !1,
        en = !1,
        ds = !1;
      const ye = tn.getUniforms(),
        an = Ut.uniforms;
      if (
        (j.useProgram(tn.program) && ((Pi = !0), (en = !0), (ds = !0)),
        W.id !== y && ((y = W.id), (en = !0)),
        Pi || M !== S)
      ) {
        (j.buffers.depth.getReversed() &&
          S.reversedDepth !== !0 &&
          ((S._reversedDepth = !0), S.updateProjectionMatrix()),
          ye.setValue(D, "projectionMatrix", S.projectionMatrix),
          ye.setValue(D, "viewMatrix", S.matrixWorldInverse));
        const qe = ye.map.cameraPosition;
        (qe !== void 0 &&
          qe.setValue(D, St.setFromMatrixPosition(S.matrixWorld)),
          $.logarithmicDepthBuffer &&
            ye.setValue(
              D,
              "logDepthBufFC",
              2 / (Math.log(S.far + 1) / Math.LN2),
            ),
          (W.isMeshPhongMaterial ||
            W.isMeshToonMaterial ||
            W.isMeshLambertMaterial ||
            W.isMeshBasicMaterial ||
            W.isMeshStandardMaterial ||
            W.isShaderMaterial) &&
            ye.setValue(D, "isOrthographic", S.isOrthographicCamera === !0),
          M !== S && ((M = S), (en = !0), (ds = !0)));
      }
      if (O.isSkinnedMesh) {
        (ye.setOptional(D, O, "bindMatrix"),
          ye.setOptional(D, O, "bindMatrixInverse"));
        const Be = O.skeleton;
        Be &&
          (Be.boneTexture === null && Be.computeBoneTexture(),
          ye.setValue(D, "boneTexture", Be.boneTexture, dt));
      }
      O.isBatchedMesh &&
        (ye.setOptional(D, O, "batchingTexture"),
        ye.setValue(D, "batchingTexture", O._matricesTexture, dt),
        ye.setOptional(D, O, "batchingIdTexture"),
        ye.setValue(D, "batchingIdTexture", O._indirectTexture, dt),
        ye.setOptional(D, O, "batchingColorTexture"),
        O._colorsTexture !== null &&
          ye.setValue(D, "batchingColorTexture", O._colorsTexture, dt));
      const cn = V.morphAttributes;
      if (
        ((cn.position !== void 0 ||
          cn.normal !== void 0 ||
          cn.color !== void 0) &&
          st.update(O, V, tn),
        (en || Ut.receiveShadow !== O.receiveShadow) &&
          ((Ut.receiveShadow = O.receiveShadow),
          ye.setValue(D, "receiveShadow", O.receiveShadow)),
        W.isMeshGouraudMaterial &&
          W.envMap !== null &&
          ((an.envMap.value = Mt),
          (an.flipEnvMap.value =
            Mt.isCubeTexture && Mt.isRenderTargetTexture === !1 ? -1 : 1)),
        W.isMeshStandardMaterial &&
          W.envMap === null &&
          N.environment !== null &&
          (an.envMapIntensity.value = N.environmentIntensity),
        en &&
          (ye.setValue(D, "toneMappingExposure", v.toneMappingExposure),
          Ut.needsLights && zh(an, ds),
          ot && W.fog === !0 && tt.refreshFogUniforms(an, ot),
          tt.refreshMaterialUniforms(
            an,
            W,
            H,
            Y,
            p.state.transmissionRenderTarget[S.id],
          ),
          Mr.upload(D, pc(Ut), an, dt)),
        W.isShaderMaterial &&
          W.uniformsNeedUpdate === !0 &&
          (Mr.upload(D, pc(Ut), an, dt), (W.uniformsNeedUpdate = !1)),
        W.isSpriteMaterial && ye.setValue(D, "center", O.center),
        ye.setValue(D, "modelViewMatrix", O.modelViewMatrix),
        ye.setValue(D, "normalMatrix", O.normalMatrix),
        ye.setValue(D, "modelMatrix", O.matrixWorld),
        W.isShaderMaterial || W.isRawShaderMaterial)
      ) {
        const Be = W.uniformsGroups;
        for (let qe = 0, Xr = Be.length; qe < Xr; qe++) {
          const ci = Be[qe];
          (Gt.update(ci, tn), Gt.bind(ci, tn));
        }
      }
      return tn;
    }
    function zh(S, N) {
      ((S.ambientLightColor.needsUpdate = N),
        (S.lightProbe.needsUpdate = N),
        (S.directionalLights.needsUpdate = N),
        (S.directionalLightShadows.needsUpdate = N),
        (S.pointLights.needsUpdate = N),
        (S.pointLightShadows.needsUpdate = N),
        (S.spotLights.needsUpdate = N),
        (S.spotLightShadows.needsUpdate = N),
        (S.rectAreaLights.needsUpdate = N),
        (S.hemisphereLights.needsUpdate = N));
    }
    function kh(S) {
      return (
        S.isMeshLambertMaterial ||
        S.isMeshToonMaterial ||
        S.isMeshPhongMaterial ||
        S.isMeshStandardMaterial ||
        S.isShadowMaterial ||
        (S.isShaderMaterial && S.lights === !0)
      );
    }
    ((this.getActiveCubeFace = function () {
      return E;
    }),
      (this.getActiveMipmapLevel = function () {
        return C;
      }),
      (this.getRenderTarget = function () {
        return L;
      }),
      (this.setRenderTargetTextures = function (S, N, V) {
        const W = it.get(S);
        ((W.__autoAllocateDepthBuffer = S.resolveDepthBuffer === !1),
          W.__autoAllocateDepthBuffer === !1 && (W.__useRenderToTexture = !1),
          (it.get(S.texture).__webglTexture = N),
          (it.get(S.depthTexture).__webglTexture = W.__autoAllocateDepthBuffer
            ? void 0
            : V),
          (W.__hasExternalTextures = !0));
      }),
      (this.setRenderTargetFramebuffer = function (S, N) {
        const V = it.get(S);
        ((V.__webglFramebuffer = N),
          (V.__useDefaultFramebuffer = N === void 0));
      }));
    const Bh = D.createFramebuffer();
    ((this.setRenderTarget = function (S, N = 0, V = 0) {
      ((L = S), (E = N), (C = V));
      let W = !0,
        O = null,
        ot = !1,
        vt = !1;
      if (S) {
        const Mt = it.get(S);
        if (Mt.__useDefaultFramebuffer !== void 0)
          (j.bindFramebuffer(D.FRAMEBUFFER, null), (W = !1));
        else if (Mt.__webglFramebuffer === void 0) dt.setupRenderTarget(S);
        else if (Mt.__hasExternalTextures)
          dt.rebindTextures(
            S,
            it.get(S.texture).__webglTexture,
            it.get(S.depthTexture).__webglTexture,
          );
        else if (S.depthBuffer) {
          const It = S.depthTexture;
          if (Mt.__boundDepthTexture !== It) {
            if (
              It !== null &&
              it.has(It) &&
              (S.width !== It.image.width || S.height !== It.image.height)
            )
              throw new Error(
                "WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.",
              );
            dt.setupDepthRenderbuffer(S);
          }
        }
        const Nt = S.texture;
        (Nt.isData3DTexture ||
          Nt.isDataArrayTexture ||
          Nt.isCompressedArrayTexture) &&
          (vt = !0);
        const Ot = it.get(S).__webglFramebuffer;
        (S.isWebGLCubeRenderTarget
          ? (Array.isArray(Ot[N]) ? (O = Ot[N][V]) : (O = Ot[N]), (ot = !0))
          : S.samples > 0 && dt.useMultisampledRTT(S) === !1
            ? (O = it.get(S).__webglMultisampledFramebuffer)
            : Array.isArray(Ot)
              ? (O = Ot[V])
              : (O = Ot),
          w.copy(S.viewport),
          I.copy(S.scissor),
          (F = S.scissorTest));
      } else
        (w.copy(gt).multiplyScalar(H).floor(),
          I.copy(Lt).multiplyScalar(H).floor(),
          (F = $t));
      if (
        (V !== 0 && (O = Bh),
        j.bindFramebuffer(D.FRAMEBUFFER, O) && W && j.drawBuffers(S, O),
        j.viewport(w),
        j.scissor(I),
        j.setScissorTest(F),
        ot)
      ) {
        const Mt = it.get(S.texture);
        D.framebufferTexture2D(
          D.FRAMEBUFFER,
          D.COLOR_ATTACHMENT0,
          D.TEXTURE_CUBE_MAP_POSITIVE_X + N,
          Mt.__webglTexture,
          V,
        );
      } else if (vt) {
        const Mt = N;
        for (let Nt = 0; Nt < S.textures.length; Nt++) {
          const Ot = it.get(S.textures[Nt]);
          D.framebufferTextureLayer(
            D.FRAMEBUFFER,
            D.COLOR_ATTACHMENT0 + Nt,
            Ot.__webglTexture,
            V,
            Mt,
          );
        }
      } else if (S !== null && V !== 0) {
        const Mt = it.get(S.texture);
        D.framebufferTexture2D(
          D.FRAMEBUFFER,
          D.COLOR_ATTACHMENT0,
          D.TEXTURE_2D,
          Mt.__webglTexture,
          V,
        );
      }
      y = -1;
    }),
      (this.readRenderTargetPixels = function (S, N, V, W, O, ot, vt, Et = 0) {
        if (!(S && S.isWebGLRenderTarget)) {
          console.error(
            "THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.",
          );
          return;
        }
        let Mt = it.get(S).__webglFramebuffer;
        if ((S.isWebGLCubeRenderTarget && vt !== void 0 && (Mt = Mt[vt]), Mt)) {
          j.bindFramebuffer(D.FRAMEBUFFER, Mt);
          try {
            const Nt = S.textures[Et],
              Ot = Nt.format,
              It = Nt.type;
            if (!$.textureFormatReadable(Ot)) {
              console.error(
                "THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.",
              );
              return;
            }
            if (!$.textureTypeReadable(It)) {
              console.error(
                "THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.",
              );
              return;
            }
            N >= 0 &&
              N <= S.width - W &&
              V >= 0 &&
              V <= S.height - O &&
              (S.textures.length > 1 && D.readBuffer(D.COLOR_ATTACHMENT0 + Et),
              D.readPixels(N, V, W, O, Pt.convert(Ot), Pt.convert(It), ot));
          } finally {
            const Nt = L !== null ? it.get(L).__webglFramebuffer : null;
            j.bindFramebuffer(D.FRAMEBUFFER, Nt);
          }
        }
      }),
      (this.readRenderTargetPixelsAsync = async function (
        S,
        N,
        V,
        W,
        O,
        ot,
        vt,
        Et = 0,
      ) {
        if (!(S && S.isWebGLRenderTarget))
          throw new Error(
            "THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.",
          );
        let Mt = it.get(S).__webglFramebuffer;
        if ((S.isWebGLCubeRenderTarget && vt !== void 0 && (Mt = Mt[vt]), Mt))
          if (N >= 0 && N <= S.width - W && V >= 0 && V <= S.height - O) {
            j.bindFramebuffer(D.FRAMEBUFFER, Mt);
            const Nt = S.textures[Et],
              Ot = Nt.format,
              It = Nt.type;
            if (!$.textureFormatReadable(Ot))
              throw new Error(
                "THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.",
              );
            if (!$.textureTypeReadable(It))
              throw new Error(
                "THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.",
              );
            const jt = D.createBuffer();
            (D.bindBuffer(D.PIXEL_PACK_BUFFER, jt),
              D.bufferData(D.PIXEL_PACK_BUFFER, ot.byteLength, D.STREAM_READ),
              S.textures.length > 1 && D.readBuffer(D.COLOR_ATTACHMENT0 + Et),
              D.readPixels(N, V, W, O, Pt.convert(Ot), Pt.convert(It), 0));
            const ae = L !== null ? it.get(L).__webglFramebuffer : null;
            j.bindFramebuffer(D.FRAMEBUFFER, ae);
            const Se = D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE, 0);
            return (
              D.flush(),
              await Fu(D, Se, 4),
              D.bindBuffer(D.PIXEL_PACK_BUFFER, jt),
              D.getBufferSubData(D.PIXEL_PACK_BUFFER, 0, ot),
              D.deleteBuffer(jt),
              D.deleteSync(Se),
              ot
            );
          } else
            throw new Error(
              "THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.",
            );
      }),
      (this.copyFramebufferToTexture = function (S, N = null, V = 0) {
        const W = Math.pow(2, -V),
          O = Math.floor(S.image.width * W),
          ot = Math.floor(S.image.height * W),
          vt = N !== null ? N.x : 0,
          Et = N !== null ? N.y : 0;
        (dt.setTexture2D(S, 0),
          D.copyTexSubImage2D(D.TEXTURE_2D, V, 0, 0, vt, Et, O, ot),
          j.unbindTexture());
      }));
    const Hh = D.createFramebuffer(),
      Gh = D.createFramebuffer();
    ((this.copyTextureToTexture = function (
      S,
      N,
      V = null,
      W = null,
      O = 0,
      ot = null,
    ) {
      ot === null &&
        (O !== 0
          ? (Cs(
              "WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels.",
            ),
            (ot = O),
            (O = 0))
          : (ot = 0));
      let vt, Et, Mt, Nt, Ot, It, jt, ae, Se;
      const _e = S.isCompressedTexture ? S.mipmaps[ot] : S.image;
      if (V !== null)
        ((vt = V.max.x - V.min.x),
          (Et = V.max.y - V.min.y),
          (Mt = V.isBox3 ? V.max.z - V.min.z : 1),
          (Nt = V.min.x),
          (Ot = V.min.y),
          (It = V.isBox3 ? V.min.z : 0));
      else {
        const cn = Math.pow(2, -O);
        ((vt = Math.floor(_e.width * cn)),
          (Et = Math.floor(_e.height * cn)),
          S.isDataArrayTexture
            ? (Mt = _e.depth)
            : S.isData3DTexture
              ? (Mt = Math.floor(_e.depth * cn))
              : (Mt = 1),
          (Nt = 0),
          (Ot = 0),
          (It = 0));
      }
      W !== null
        ? ((jt = W.x), (ae = W.y), (Se = W.z))
        : ((jt = 0), (ae = 0), (Se = 0));
      const de = Pt.convert(N.format),
        Ut = Pt.convert(N.type);
      let xe;
      (N.isData3DTexture
        ? (dt.setTexture3D(N, 0), (xe = D.TEXTURE_3D))
        : N.isDataArrayTexture || N.isCompressedArrayTexture
          ? (dt.setTexture2DArray(N, 0), (xe = D.TEXTURE_2D_ARRAY))
          : (dt.setTexture2D(N, 0), (xe = D.TEXTURE_2D)),
        D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL, N.flipY),
        D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL, N.premultiplyAlpha),
        D.pixelStorei(D.UNPACK_ALIGNMENT, N.unpackAlignment));
      const Qt = D.getParameter(D.UNPACK_ROW_LENGTH),
        tn = D.getParameter(D.UNPACK_IMAGE_HEIGHT),
        Pi = D.getParameter(D.UNPACK_SKIP_PIXELS),
        en = D.getParameter(D.UNPACK_SKIP_ROWS),
        ds = D.getParameter(D.UNPACK_SKIP_IMAGES);
      (D.pixelStorei(D.UNPACK_ROW_LENGTH, _e.width),
        D.pixelStorei(D.UNPACK_IMAGE_HEIGHT, _e.height),
        D.pixelStorei(D.UNPACK_SKIP_PIXELS, Nt),
        D.pixelStorei(D.UNPACK_SKIP_ROWS, Ot),
        D.pixelStorei(D.UNPACK_SKIP_IMAGES, It));
      const ye = S.isDataArrayTexture || S.isData3DTexture,
        an = N.isDataArrayTexture || N.isData3DTexture;
      if (S.isDepthTexture) {
        const cn = it.get(S),
          Be = it.get(N),
          qe = it.get(cn.__renderTarget),
          Xr = it.get(Be.__renderTarget);
        (j.bindFramebuffer(D.READ_FRAMEBUFFER, qe.__webglFramebuffer),
          j.bindFramebuffer(D.DRAW_FRAMEBUFFER, Xr.__webglFramebuffer));
        for (let ci = 0; ci < Mt; ci++)
          (ye &&
            (D.framebufferTextureLayer(
              D.READ_FRAMEBUFFER,
              D.COLOR_ATTACHMENT0,
              it.get(S).__webglTexture,
              O,
              It + ci,
            ),
            D.framebufferTextureLayer(
              D.DRAW_FRAMEBUFFER,
              D.COLOR_ATTACHMENT0,
              it.get(N).__webglTexture,
              ot,
              Se + ci,
            )),
            D.blitFramebuffer(
              Nt,
              Ot,
              vt,
              Et,
              jt,
              ae,
              vt,
              Et,
              D.DEPTH_BUFFER_BIT,
              D.NEAREST,
            ));
        (j.bindFramebuffer(D.READ_FRAMEBUFFER, null),
          j.bindFramebuffer(D.DRAW_FRAMEBUFFER, null));
      } else if (O !== 0 || S.isRenderTargetTexture || it.has(S)) {
        const cn = it.get(S),
          Be = it.get(N);
        (j.bindFramebuffer(D.READ_FRAMEBUFFER, Hh),
          j.bindFramebuffer(D.DRAW_FRAMEBUFFER, Gh));
        for (let qe = 0; qe < Mt; qe++)
          (ye
            ? D.framebufferTextureLayer(
                D.READ_FRAMEBUFFER,
                D.COLOR_ATTACHMENT0,
                cn.__webglTexture,
                O,
                It + qe,
              )
            : D.framebufferTexture2D(
                D.READ_FRAMEBUFFER,
                D.COLOR_ATTACHMENT0,
                D.TEXTURE_2D,
                cn.__webglTexture,
                O,
              ),
            an
              ? D.framebufferTextureLayer(
                  D.DRAW_FRAMEBUFFER,
                  D.COLOR_ATTACHMENT0,
                  Be.__webglTexture,
                  ot,
                  Se + qe,
                )
              : D.framebufferTexture2D(
                  D.DRAW_FRAMEBUFFER,
                  D.COLOR_ATTACHMENT0,
                  D.TEXTURE_2D,
                  Be.__webglTexture,
                  ot,
                ),
            O !== 0
              ? D.blitFramebuffer(
                  Nt,
                  Ot,
                  vt,
                  Et,
                  jt,
                  ae,
                  vt,
                  Et,
                  D.COLOR_BUFFER_BIT,
                  D.NEAREST,
                )
              : an
                ? D.copyTexSubImage3D(xe, ot, jt, ae, Se + qe, Nt, Ot, vt, Et)
                : D.copyTexSubImage2D(xe, ot, jt, ae, Nt, Ot, vt, Et));
        (j.bindFramebuffer(D.READ_FRAMEBUFFER, null),
          j.bindFramebuffer(D.DRAW_FRAMEBUFFER, null));
      } else
        an
          ? S.isDataTexture || S.isData3DTexture
            ? D.texSubImage3D(xe, ot, jt, ae, Se, vt, Et, Mt, de, Ut, _e.data)
            : N.isCompressedArrayTexture
              ? D.compressedTexSubImage3D(
                  xe,
                  ot,
                  jt,
                  ae,
                  Se,
                  vt,
                  Et,
                  Mt,
                  de,
                  _e.data,
                )
              : D.texSubImage3D(xe, ot, jt, ae, Se, vt, Et, Mt, de, Ut, _e)
          : S.isDataTexture
            ? D.texSubImage2D(D.TEXTURE_2D, ot, jt, ae, vt, Et, de, Ut, _e.data)
            : S.isCompressedTexture
              ? D.compressedTexSubImage2D(
                  D.TEXTURE_2D,
                  ot,
                  jt,
                  ae,
                  _e.width,
                  _e.height,
                  de,
                  _e.data,
                )
              : D.texSubImage2D(D.TEXTURE_2D, ot, jt, ae, vt, Et, de, Ut, _e);
      (D.pixelStorei(D.UNPACK_ROW_LENGTH, Qt),
        D.pixelStorei(D.UNPACK_IMAGE_HEIGHT, tn),
        D.pixelStorei(D.UNPACK_SKIP_PIXELS, Pi),
        D.pixelStorei(D.UNPACK_SKIP_ROWS, en),
        D.pixelStorei(D.UNPACK_SKIP_IMAGES, ds),
        ot === 0 && N.generateMipmaps && D.generateMipmap(xe),
        j.unbindTexture());
    }),
      (this.initRenderTarget = function (S) {
        it.get(S).__webglFramebuffer === void 0 && dt.setupRenderTarget(S);
      }),
      (this.initTexture = function (S) {
        (S.isCubeTexture
          ? dt.setTextureCube(S, 0)
          : S.isData3DTexture
            ? dt.setTexture3D(S, 0)
            : S.isDataArrayTexture || S.isCompressedArrayTexture
              ? dt.setTexture2DArray(S, 0)
              : dt.setTexture2D(S, 0),
          j.unbindTexture());
      }),
      (this.resetState = function () {
        ((E = 0), (C = 0), (L = null), j.reset(), _t.reset());
      }),
      typeof __THREE_DEVTOOLS__ < "u" &&
        __THREE_DEVTOOLS__.dispatchEvent(
          new CustomEvent("observe", { detail: this }),
        ));
  }
  get coordinateSystem() {
    return wn;
  }
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(t) {
    this._outputColorSpace = t;
    const e = this.getContext();
    ((e.drawingBufferColorSpace = ee._getDrawingBufferColorSpace(t)),
      (e.unpackColorSpace = ee._getUnpackColorSpace()));
  }
}
const wl = { type: "change" },
  tc = { type: "start" },
  Eh = { type: "end" },
  dr = new Br(),
  Tl = new Fn(),
  F0 = Math.cos(70 * Uu.DEG2RAD),
  Ce = new P(),
  Ke = 2 * Math.PI,
  ue = {
    NONE: -1,
    ROTATE: 0,
    DOLLY: 1,
    PAN: 2,
    TOUCH_ROTATE: 3,
    TOUCH_PAN: 4,
    TOUCH_DOLLY_PAN: 5,
    TOUCH_DOLLY_ROTATE: 6,
  },
  Ro = 1e-6;
class O0 extends $d {
  constructor(t, e = null) {
    (super(t, e),
      (this.state = ue.NONE),
      (this.target = new P()),
      (this.cursor = new P()),
      (this.minDistance = 0),
      (this.maxDistance = 1 / 0),
      (this.minZoom = 0),
      (this.maxZoom = 1 / 0),
      (this.minTargetRadius = 0),
      (this.maxTargetRadius = 1 / 0),
      (this.minPolarAngle = 0),
      (this.maxPolarAngle = Math.PI),
      (this.minAzimuthAngle = -1 / 0),
      (this.maxAzimuthAngle = 1 / 0),
      (this.enableDamping = !1),
      (this.dampingFactor = 0.05),
      (this.enableZoom = !0),
      (this.zoomSpeed = 1),
      (this.enableRotate = !0),
      (this.rotateSpeed = 1),
      (this.keyRotateSpeed = 1),
      (this.enablePan = !0),
      (this.panSpeed = 1),
      (this.screenSpacePanning = !0),
      (this.keyPanSpeed = 7),
      (this.zoomToCursor = !1),
      (this.autoRotate = !1),
      (this.autoRotateSpeed = 2),
      (this.keys = {
        LEFT: "ArrowLeft",
        UP: "ArrowUp",
        RIGHT: "ArrowRight",
        BOTTOM: "ArrowDown",
      }),
      (this.mouseButtons = {
        LEFT: Zi.ROTATE,
        MIDDLE: Zi.DOLLY,
        RIGHT: Zi.PAN,
      }),
      (this.touches = { ONE: qi.ROTATE, TWO: qi.DOLLY_PAN }),
      (this.target0 = this.target.clone()),
      (this.position0 = this.object.position.clone()),
      (this.zoom0 = this.object.zoom),
      (this._domElementKeyEvents = null),
      (this._lastPosition = new P()),
      (this._lastQuaternion = new ri()),
      (this._lastTargetPosition = new P()),
      (this._quat = new ri().setFromUnitVectors(t.up, new P(0, 1, 0))),
      (this._quatInverse = this._quat.clone().invert()),
      (this._spherical = new Qc()),
      (this._sphericalDelta = new Qc()),
      (this._scale = 1),
      (this._panOffset = new P()),
      (this._rotateStart = new at()),
      (this._rotateEnd = new at()),
      (this._rotateDelta = new at()),
      (this._panStart = new at()),
      (this._panEnd = new at()),
      (this._panDelta = new at()),
      (this._dollyStart = new at()),
      (this._dollyEnd = new at()),
      (this._dollyDelta = new at()),
      (this._dollyDirection = new P()),
      (this._mouse = new at()),
      (this._performCursorZoom = !1),
      (this._pointers = []),
      (this._pointerPositions = {}),
      (this._controlActive = !1),
      (this._onPointerMove = k0.bind(this)),
      (this._onPointerDown = z0.bind(this)),
      (this._onPointerUp = B0.bind(this)),
      (this._onContextMenu = Y0.bind(this)),
      (this._onMouseWheel = V0.bind(this)),
      (this._onKeyDown = W0.bind(this)),
      (this._onTouchStart = X0.bind(this)),
      (this._onTouchMove = q0.bind(this)),
      (this._onMouseDown = H0.bind(this)),
      (this._onMouseMove = G0.bind(this)),
      (this._interceptControlDown = K0.bind(this)),
      (this._interceptControlUp = Z0.bind(this)),
      this.domElement !== null && this.connect(this.domElement),
      this.update());
  }
  connect(t) {
    (super.connect(t),
      this.domElement.addEventListener("pointerdown", this._onPointerDown),
      this.domElement.addEventListener("pointercancel", this._onPointerUp),
      this.domElement.addEventListener("contextmenu", this._onContextMenu),
      this.domElement.addEventListener("wheel", this._onMouseWheel, {
        passive: !1,
      }),
      this.domElement
        .getRootNode()
        .addEventListener("keydown", this._interceptControlDown, {
          passive: !0,
          capture: !0,
        }),
      (this.domElement.style.touchAction = "none"));
  }
  disconnect() {
    (this.domElement.removeEventListener("pointerdown", this._onPointerDown),
      this.domElement.removeEventListener("pointermove", this._onPointerMove),
      this.domElement.removeEventListener("pointerup", this._onPointerUp),
      this.domElement.removeEventListener("pointercancel", this._onPointerUp),
      this.domElement.removeEventListener("wheel", this._onMouseWheel),
      this.domElement.removeEventListener("contextmenu", this._onContextMenu),
      this.stopListenToKeyEvents(),
      this.domElement
        .getRootNode()
        .removeEventListener("keydown", this._interceptControlDown, {
          capture: !0,
        }),
      (this.domElement.style.touchAction = "auto"));
  }
  dispose() {
    this.disconnect();
  }
  getPolarAngle() {
    return this._spherical.phi;
  }
  getAzimuthalAngle() {
    return this._spherical.theta;
  }
  getDistance() {
    return this.object.position.distanceTo(this.target);
  }
  listenToKeyEvents(t) {
    (t.addEventListener("keydown", this._onKeyDown),
      (this._domElementKeyEvents = t));
  }
  stopListenToKeyEvents() {
    this._domElementKeyEvents !== null &&
      (this._domElementKeyEvents.removeEventListener(
        "keydown",
        this._onKeyDown,
      ),
      (this._domElementKeyEvents = null));
  }
  saveState() {
    (this.target0.copy(this.target),
      this.position0.copy(this.object.position),
      (this.zoom0 = this.object.zoom));
  }
  reset() {
    (this.target.copy(this.target0),
      this.object.position.copy(this.position0),
      (this.object.zoom = this.zoom0),
      this.object.updateProjectionMatrix(),
      this.dispatchEvent(wl),
      this.update(),
      (this.state = ue.NONE));
  }
  update(t = null) {
    const e = this.object.position;
    (Ce.copy(e).sub(this.target),
      Ce.applyQuaternion(this._quat),
      this._spherical.setFromVector3(Ce),
      this.autoRotate &&
        this.state === ue.NONE &&
        this._rotateLeft(this._getAutoRotationAngle(t)),
      this.enableDamping
        ? ((this._spherical.theta +=
            this._sphericalDelta.theta * this.dampingFactor),
          (this._spherical.phi +=
            this._sphericalDelta.phi * this.dampingFactor))
        : ((this._spherical.theta += this._sphericalDelta.theta),
          (this._spherical.phi += this._sphericalDelta.phi)));
    let n = this.minAzimuthAngle,
      s = this.maxAzimuthAngle;
    (isFinite(n) &&
      isFinite(s) &&
      (n < -Math.PI ? (n += Ke) : n > Math.PI && (n -= Ke),
      s < -Math.PI ? (s += Ke) : s > Math.PI && (s -= Ke),
      n <= s
        ? (this._spherical.theta = Math.max(
            n,
            Math.min(s, this._spherical.theta),
          ))
        : (this._spherical.theta =
            this._spherical.theta > (n + s) / 2
              ? Math.max(n, this._spherical.theta)
              : Math.min(s, this._spherical.theta))),
      (this._spherical.phi = Math.max(
        this.minPolarAngle,
        Math.min(this.maxPolarAngle, this._spherical.phi),
      )),
      this._spherical.makeSafe(),
      this.enableDamping === !0
        ? this.target.addScaledVector(this._panOffset, this.dampingFactor)
        : this.target.add(this._panOffset),
      this.target.sub(this.cursor),
      this.target.clampLength(this.minTargetRadius, this.maxTargetRadius),
      this.target.add(this.cursor));
    let r = !1;
    if (
      (this.zoomToCursor && this._performCursorZoom) ||
      this.object.isOrthographicCamera
    )
      this._spherical.radius = this._clampDistance(this._spherical.radius);
    else {
      const o = this._spherical.radius;
      ((this._spherical.radius = this._clampDistance(
        this._spherical.radius * this._scale,
      )),
        (r = o != this._spherical.radius));
    }
    if (
      (Ce.setFromSpherical(this._spherical),
      Ce.applyQuaternion(this._quatInverse),
      e.copy(this.target).add(Ce),
      this.object.lookAt(this.target),
      this.enableDamping === !0
        ? ((this._sphericalDelta.theta *= 1 - this.dampingFactor),
          (this._sphericalDelta.phi *= 1 - this.dampingFactor),
          this._panOffset.multiplyScalar(1 - this.dampingFactor))
        : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)),
      this.zoomToCursor && this._performCursorZoom)
    ) {
      let o = null;
      if (this.object.isPerspectiveCamera) {
        const a = Ce.length();
        o = this._clampDistance(a * this._scale);
        const c = a - o;
        (this.object.position.addScaledVector(this._dollyDirection, c),
          this.object.updateMatrixWorld(),
          (r = !!c));
      } else if (this.object.isOrthographicCamera) {
        const a = new P(this._mouse.x, this._mouse.y, 0);
        a.unproject(this.object);
        const c = this.object.zoom;
        ((this.object.zoom = Math.max(
          this.minZoom,
          Math.min(this.maxZoom, this.object.zoom / this._scale),
        )),
          this.object.updateProjectionMatrix(),
          (r = c !== this.object.zoom));
        const l = new P(this._mouse.x, this._mouse.y, 0);
        (l.unproject(this.object),
          this.object.position.sub(l).add(a),
          this.object.updateMatrixWorld(),
          (o = Ce.length()));
      } else
        (console.warn(
          "WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.",
        ),
          (this.zoomToCursor = !1));
      o !== null &&
        (this.screenSpacePanning
          ? this.target
              .set(0, 0, -1)
              .transformDirection(this.object.matrix)
              .multiplyScalar(o)
              .add(this.object.position)
          : (dr.origin.copy(this.object.position),
            dr.direction.set(0, 0, -1).transformDirection(this.object.matrix),
            Math.abs(this.object.up.dot(dr.direction)) < F0
              ? this.object.lookAt(this.target)
              : (Tl.setFromNormalAndCoplanarPoint(this.object.up, this.target),
                dr.intersectPlane(Tl, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const o = this.object.zoom;
      ((this.object.zoom = Math.max(
        this.minZoom,
        Math.min(this.maxZoom, this.object.zoom / this._scale),
      )),
        o !== this.object.zoom &&
          (this.object.updateProjectionMatrix(), (r = !0)));
    }
    return (
      (this._scale = 1),
      (this._performCursorZoom = !1),
      r ||
      this._lastPosition.distanceToSquared(this.object.position) > Ro ||
      8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > Ro ||
      this._lastTargetPosition.distanceToSquared(this.target) > Ro
        ? (this.dispatchEvent(wl),
          this._lastPosition.copy(this.object.position),
          this._lastQuaternion.copy(this.object.quaternion),
          this._lastTargetPosition.copy(this.target),
          !0)
        : !1
    );
  }
  _getAutoRotationAngle(t) {
    return t !== null
      ? (Ke / 60) * this.autoRotateSpeed * t
      : (Ke / 60 / 60) * this.autoRotateSpeed;
  }
  _getZoomScale(t) {
    const e = Math.abs(t * 0.01);
    return Math.pow(0.95, this.zoomSpeed * e);
  }
  _rotateLeft(t) {
    this._sphericalDelta.theta -= t;
  }
  _rotateUp(t) {
    this._sphericalDelta.phi -= t;
  }
  _panLeft(t, e) {
    (Ce.setFromMatrixColumn(e, 0),
      Ce.multiplyScalar(-t),
      this._panOffset.add(Ce));
  }
  _panUp(t, e) {
    (this.screenSpacePanning === !0
      ? Ce.setFromMatrixColumn(e, 1)
      : (Ce.setFromMatrixColumn(e, 0), Ce.crossVectors(this.object.up, Ce)),
      Ce.multiplyScalar(t),
      this._panOffset.add(Ce));
  }
  _pan(t, e) {
    const n = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const s = this.object.position;
      Ce.copy(s).sub(this.target);
      let r = Ce.length();
      ((r *= Math.tan(((this.object.fov / 2) * Math.PI) / 180)),
        this._panLeft((2 * t * r) / n.clientHeight, this.object.matrix),
        this._panUp((2 * e * r) / n.clientHeight, this.object.matrix));
    } else
      this.object.isOrthographicCamera
        ? (this._panLeft(
            (t * (this.object.right - this.object.left)) /
              this.object.zoom /
              n.clientWidth,
            this.object.matrix,
          ),
          this._panUp(
            (e * (this.object.top - this.object.bottom)) /
              this.object.zoom /
              n.clientHeight,
            this.object.matrix,
          ))
        : (console.warn(
            "WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.",
          ),
          (this.enablePan = !1));
  }
  _dollyOut(t) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera
      ? (this._scale /= t)
      : (console.warn(
          "WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.",
        ),
        (this.enableZoom = !1));
  }
  _dollyIn(t) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera
      ? (this._scale *= t)
      : (console.warn(
          "WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.",
        ),
        (this.enableZoom = !1));
  }
  _updateZoomParameters(t, e) {
    if (!this.zoomToCursor) return;
    this._performCursorZoom = !0;
    const n = this.domElement.getBoundingClientRect(),
      s = t - n.left,
      r = e - n.top,
      o = n.width,
      a = n.height;
    ((this._mouse.x = (s / o) * 2 - 1),
      (this._mouse.y = -(r / a) * 2 + 1),
      this._dollyDirection
        .set(this._mouse.x, this._mouse.y, 1)
        .unproject(this.object)
        .sub(this.object.position)
        .normalize());
  }
  _clampDistance(t) {
    return Math.max(this.minDistance, Math.min(this.maxDistance, t));
  }
  _handleMouseDownRotate(t) {
    this._rotateStart.set(t.clientX, t.clientY);
  }
  _handleMouseDownDolly(t) {
    (this._updateZoomParameters(t.clientX, t.clientX),
      this._dollyStart.set(t.clientX, t.clientY));
  }
  _handleMouseDownPan(t) {
    this._panStart.set(t.clientX, t.clientY);
  }
  _handleMouseMoveRotate(t) {
    (this._rotateEnd.set(t.clientX, t.clientY),
      this._rotateDelta
        .subVectors(this._rotateEnd, this._rotateStart)
        .multiplyScalar(this.rotateSpeed));
    const e = this.domElement;
    (this._rotateLeft((Ke * this._rotateDelta.x) / e.clientHeight),
      this._rotateUp((Ke * this._rotateDelta.y) / e.clientHeight),
      this._rotateStart.copy(this._rotateEnd),
      this.update());
  }
  _handleMouseMoveDolly(t) {
    (this._dollyEnd.set(t.clientX, t.clientY),
      this._dollyDelta.subVectors(this._dollyEnd, this._dollyStart),
      this._dollyDelta.y > 0
        ? this._dollyOut(this._getZoomScale(this._dollyDelta.y))
        : this._dollyDelta.y < 0 &&
          this._dollyIn(this._getZoomScale(this._dollyDelta.y)),
      this._dollyStart.copy(this._dollyEnd),
      this.update());
  }
  _handleMouseMovePan(t) {
    (this._panEnd.set(t.clientX, t.clientY),
      this._panDelta
        .subVectors(this._panEnd, this._panStart)
        .multiplyScalar(this.panSpeed),
      this._pan(this._panDelta.x, this._panDelta.y),
      this._panStart.copy(this._panEnd),
      this.update());
  }
  _handleMouseWheel(t) {
    (this._updateZoomParameters(t.clientX, t.clientY),
      t.deltaY < 0
        ? this._dollyIn(this._getZoomScale(t.deltaY))
        : t.deltaY > 0 && this._dollyOut(this._getZoomScale(t.deltaY)),
      this.update());
  }
  _handleKeyDown(t) {
    let e = !1;
    switch (t.code) {
      case this.keys.UP:
        (t.ctrlKey || t.metaKey || t.shiftKey
          ? this.enableRotate &&
            this._rotateUp(
              (Ke * this.keyRotateSpeed) / this.domElement.clientHeight,
            )
          : this.enablePan && this._pan(0, this.keyPanSpeed),
          (e = !0));
        break;
      case this.keys.BOTTOM:
        (t.ctrlKey || t.metaKey || t.shiftKey
          ? this.enableRotate &&
            this._rotateUp(
              (-Ke * this.keyRotateSpeed) / this.domElement.clientHeight,
            )
          : this.enablePan && this._pan(0, -this.keyPanSpeed),
          (e = !0));
        break;
      case this.keys.LEFT:
        (t.ctrlKey || t.metaKey || t.shiftKey
          ? this.enableRotate &&
            this._rotateLeft(
              (Ke * this.keyRotateSpeed) / this.domElement.clientHeight,
            )
          : this.enablePan && this._pan(this.keyPanSpeed, 0),
          (e = !0));
        break;
      case this.keys.RIGHT:
        (t.ctrlKey || t.metaKey || t.shiftKey
          ? this.enableRotate &&
            this._rotateLeft(
              (-Ke * this.keyRotateSpeed) / this.domElement.clientHeight,
            )
          : this.enablePan && this._pan(-this.keyPanSpeed, 0),
          (e = !0));
        break;
    }
    e && (t.preventDefault(), this.update());
  }
  _handleTouchStartRotate(t) {
    if (this._pointers.length === 1) this._rotateStart.set(t.pageX, t.pageY);
    else {
      const e = this._getSecondPointerPosition(t),
        n = 0.5 * (t.pageX + e.x),
        s = 0.5 * (t.pageY + e.y);
      this._rotateStart.set(n, s);
    }
  }
  _handleTouchStartPan(t) {
    if (this._pointers.length === 1) this._panStart.set(t.pageX, t.pageY);
    else {
      const e = this._getSecondPointerPosition(t),
        n = 0.5 * (t.pageX + e.x),
        s = 0.5 * (t.pageY + e.y);
      this._panStart.set(n, s);
    }
  }
  _handleTouchStartDolly(t) {
    const e = this._getSecondPointerPosition(t),
      n = t.pageX - e.x,
      s = t.pageY - e.y,
      r = Math.sqrt(n * n + s * s);
    this._dollyStart.set(0, r);
  }
  _handleTouchStartDollyPan(t) {
    (this.enableZoom && this._handleTouchStartDolly(t),
      this.enablePan && this._handleTouchStartPan(t));
  }
  _handleTouchStartDollyRotate(t) {
    (this.enableZoom && this._handleTouchStartDolly(t),
      this.enableRotate && this._handleTouchStartRotate(t));
  }
  _handleTouchMoveRotate(t) {
    if (this._pointers.length == 1) this._rotateEnd.set(t.pageX, t.pageY);
    else {
      const n = this._getSecondPointerPosition(t),
        s = 0.5 * (t.pageX + n.x),
        r = 0.5 * (t.pageY + n.y);
      this._rotateEnd.set(s, r);
    }
    this._rotateDelta
      .subVectors(this._rotateEnd, this._rotateStart)
      .multiplyScalar(this.rotateSpeed);
    const e = this.domElement;
    (this._rotateLeft((Ke * this._rotateDelta.x) / e.clientHeight),
      this._rotateUp((Ke * this._rotateDelta.y) / e.clientHeight),
      this._rotateStart.copy(this._rotateEnd));
  }
  _handleTouchMovePan(t) {
    if (this._pointers.length === 1) this._panEnd.set(t.pageX, t.pageY);
    else {
      const e = this._getSecondPointerPosition(t),
        n = 0.5 * (t.pageX + e.x),
        s = 0.5 * (t.pageY + e.y);
      this._panEnd.set(n, s);
    }
    (this._panDelta
      .subVectors(this._panEnd, this._panStart)
      .multiplyScalar(this.panSpeed),
      this._pan(this._panDelta.x, this._panDelta.y),
      this._panStart.copy(this._panEnd));
  }
  _handleTouchMoveDolly(t) {
    const e = this._getSecondPointerPosition(t),
      n = t.pageX - e.x,
      s = t.pageY - e.y,
      r = Math.sqrt(n * n + s * s);
    (this._dollyEnd.set(0, r),
      this._dollyDelta.set(
        0,
        Math.pow(this._dollyEnd.y / this._dollyStart.y, this.zoomSpeed),
      ),
      this._dollyOut(this._dollyDelta.y),
      this._dollyStart.copy(this._dollyEnd));
    const o = (t.pageX + e.x) * 0.5,
      a = (t.pageY + e.y) * 0.5;
    this._updateZoomParameters(o, a);
  }
  _handleTouchMoveDollyPan(t) {
    (this.enableZoom && this._handleTouchMoveDolly(t),
      this.enablePan && this._handleTouchMovePan(t));
  }
  _handleTouchMoveDollyRotate(t) {
    (this.enableZoom && this._handleTouchMoveDolly(t),
      this.enableRotate && this._handleTouchMoveRotate(t));
  }
  _addPointer(t) {
    this._pointers.push(t.pointerId);
  }
  _removePointer(t) {
    delete this._pointerPositions[t.pointerId];
    for (let e = 0; e < this._pointers.length; e++)
      if (this._pointers[e] == t.pointerId) {
        this._pointers.splice(e, 1);
        return;
      }
  }
  _isTrackingPointer(t) {
    for (let e = 0; e < this._pointers.length; e++)
      if (this._pointers[e] == t.pointerId) return !0;
    return !1;
  }
  _trackPointer(t) {
    let e = this._pointerPositions[t.pointerId];
    (e === void 0 &&
      ((e = new at()), (this._pointerPositions[t.pointerId] = e)),
      e.set(t.pageX, t.pageY));
  }
  _getSecondPointerPosition(t) {
    const e =
      t.pointerId === this._pointers[0] ? this._pointers[1] : this._pointers[0];
    return this._pointerPositions[e];
  }
  _customWheelEvent(t) {
    const e = t.deltaMode,
      n = { clientX: t.clientX, clientY: t.clientY, deltaY: t.deltaY };
    switch (e) {
      case 1:
        n.deltaY *= 16;
        break;
      case 2:
        n.deltaY *= 100;
        break;
    }
    return (t.ctrlKey && !this._controlActive && (n.deltaY *= 10), n);
  }
}
function z0(i) {
  this.enabled !== !1 &&
    (this._pointers.length === 0 &&
      (this.domElement.setPointerCapture(i.pointerId),
      this.domElement.addEventListener("pointermove", this._onPointerMove),
      this.domElement.addEventListener("pointerup", this._onPointerUp)),
    !this._isTrackingPointer(i) &&
      (this._addPointer(i),
      i.pointerType === "touch"
        ? this._onTouchStart(i)
        : this._onMouseDown(i)));
}
function k0(i) {
  this.enabled !== !1 &&
    (i.pointerType === "touch" ? this._onTouchMove(i) : this._onMouseMove(i));
}
function B0(i) {
  switch ((this._removePointer(i), this._pointers.length)) {
    case 0:
      (this.domElement.releasePointerCapture(i.pointerId),
        this.domElement.removeEventListener("pointermove", this._onPointerMove),
        this.domElement.removeEventListener("pointerup", this._onPointerUp),
        this.dispatchEvent(Eh),
        (this.state = ue.NONE));
      break;
    case 1:
      const t = this._pointers[0],
        e = this._pointerPositions[t];
      this._onTouchStart({ pointerId: t, pageX: e.x, pageY: e.y });
      break;
  }
}
function H0(i) {
  let t;
  switch (i.button) {
    case 0:
      t = this.mouseButtons.LEFT;
      break;
    case 1:
      t = this.mouseButtons.MIDDLE;
      break;
    case 2:
      t = this.mouseButtons.RIGHT;
      break;
    default:
      t = -1;
  }
  switch (t) {
    case Zi.DOLLY:
      if (this.enableZoom === !1) return;
      (this._handleMouseDownDolly(i), (this.state = ue.DOLLY));
      break;
    case Zi.ROTATE:
      if (i.ctrlKey || i.metaKey || i.shiftKey) {
        if (this.enablePan === !1) return;
        (this._handleMouseDownPan(i), (this.state = ue.PAN));
      } else {
        if (this.enableRotate === !1) return;
        (this._handleMouseDownRotate(i), (this.state = ue.ROTATE));
      }
      break;
    case Zi.PAN:
      if (i.ctrlKey || i.metaKey || i.shiftKey) {
        if (this.enableRotate === !1) return;
        (this._handleMouseDownRotate(i), (this.state = ue.ROTATE));
      } else {
        if (this.enablePan === !1) return;
        (this._handleMouseDownPan(i), (this.state = ue.PAN));
      }
      break;
    default:
      this.state = ue.NONE;
  }
  this.state !== ue.NONE && this.dispatchEvent(tc);
}
function G0(i) {
  switch (this.state) {
    case ue.ROTATE:
      if (this.enableRotate === !1) return;
      this._handleMouseMoveRotate(i);
      break;
    case ue.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseMoveDolly(i);
      break;
    case ue.PAN:
      if (this.enablePan === !1) return;
      this._handleMouseMovePan(i);
      break;
  }
}
function V0(i) {
  this.enabled === !1 ||
    this.enableZoom === !1 ||
    this.state !== ue.NONE ||
    (i.preventDefault(),
    this.dispatchEvent(tc),
    this._handleMouseWheel(this._customWheelEvent(i)),
    this.dispatchEvent(Eh));
}
function W0(i) {
  this.enabled !== !1 && this._handleKeyDown(i);
}
function X0(i) {
  switch ((this._trackPointer(i), this._pointers.length)) {
    case 1:
      switch (this.touches.ONE) {
        case qi.ROTATE:
          if (this.enableRotate === !1) return;
          (this._handleTouchStartRotate(i), (this.state = ue.TOUCH_ROTATE));
          break;
        case qi.PAN:
          if (this.enablePan === !1) return;
          (this._handleTouchStartPan(i), (this.state = ue.TOUCH_PAN));
          break;
        default:
          this.state = ue.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case qi.DOLLY_PAN:
          if (this.enableZoom === !1 && this.enablePan === !1) return;
          (this._handleTouchStartDollyPan(i),
            (this.state = ue.TOUCH_DOLLY_PAN));
          break;
        case qi.DOLLY_ROTATE:
          if (this.enableZoom === !1 && this.enableRotate === !1) return;
          (this._handleTouchStartDollyRotate(i),
            (this.state = ue.TOUCH_DOLLY_ROTATE));
          break;
        default:
          this.state = ue.NONE;
      }
      break;
    default:
      this.state = ue.NONE;
  }
  this.state !== ue.NONE && this.dispatchEvent(tc);
}
function q0(i) {
  switch ((this._trackPointer(i), this.state)) {
    case ue.TOUCH_ROTATE:
      if (this.enableRotate === !1) return;
      (this._handleTouchMoveRotate(i), this.update());
      break;
    case ue.TOUCH_PAN:
      if (this.enablePan === !1) return;
      (this._handleTouchMovePan(i), this.update());
      break;
    case ue.TOUCH_DOLLY_PAN:
      if (this.enableZoom === !1 && this.enablePan === !1) return;
      (this._handleTouchMoveDollyPan(i), this.update());
      break;
    case ue.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === !1 && this.enableRotate === !1) return;
      (this._handleTouchMoveDollyRotate(i), this.update());
      break;
    default:
      this.state = ue.NONE;
  }
}
function Y0(i) {
  this.enabled !== !1 && i.preventDefault();
}
function K0(i) {
  i.key === "Control" &&
    ((this._controlActive = !0),
    this.domElement
      .getRootNode()
      .addEventListener("keyup", this._interceptControlUp, {
        passive: !0,
        capture: !0,
      }));
}
function Z0(i) {
  i.key === "Control" &&
    ((this._controlActive = !1),
    this.domElement
      .getRootNode()
      .removeEventListener("keyup", this._interceptControlUp, {
        passive: !0,
        capture: !0,
      }));
}
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
const Ge = {
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
function wh(i, t) {
  const e = (s) => 0.2126 * s.r + 0.7152 * s.g + 0.0722 * s.b;
  Ge.uSunDirW.value.copy(i.position).sub(i.target.position).normalize();
  const n = 1 / Math.PI;
  ((Ge.uSunLum.value = i.intensity * e(i.color) * n),
    (Ge.uAmbSky.value = t.intensity * e(t.color) * n),
    (Ge.uAmbGround.value = t.intensity * e(t.groundColor) * n));
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
class Rl {
  constructor() {
    K(this, "nodes", []);
    K(this, "cell", new Map());
  }
  key(t, e) {
    return `${Math.round(t / 10)},${Math.round(e / 10)}`;
  }
  add(t, e = -1, n = !1) {
    const s = this.nodes.length;
    this.nodes.push({ p: t.clone(), links: new Map(), ground: n, structId: e });
    const r = this.key(t.x, t.z);
    let o = this.cell.get(r);
    return (o || ((o = []), this.cell.set(r, o)), o.push(s), s);
  }
  link(t, e, n = 1) {
    if (t === e || t < 0 || e < 0) return;
    const s = this.nodes[t].p,
      r = this.nodes[e].p,
      o = Math.abs(s.y - r.y),
      a = (s.distanceTo(r) + o * 1.5) * n;
    (this.nodes[t].links.set(e, a), this.nodes[e].links.set(t, a));
  }
  nearest(t, e = 9, n) {
    let s = -1,
      r = e * e;
    const o = Math.round(t.x / 10),
      a = Math.round(t.z / 10),
      c = Math.ceil(e / 10);
    for (let l = o - c; l <= o + c; l++)
      for (let h = a - c; h <= a + c; h++) {
        const u = this.cell.get(`${l},${h}`);
        if (u)
          for (const d of u) {
            const f = this.nodes[d];
            if (f.structId === -999 || (n && !n(f, d))) continue;
            const m = f.p.x - t.x,
              _ = f.p.z - t.z,
              g = (f.p.y - t.y) * 1.6,
              p = m * m + _ * _ + g * g;
            p < r && ((r = p), (s = d));
          }
      }
    return s;
  }
  path(t, e) {
    if (t < 0 || e < 0) return [];
    if (t === e) return [t];
    const n = new p_(),
      s = new Map(),
      r = new Map(),
      o = this.nodes[e].p;
    (s.set(t, 0), n.push(t, o.distanceTo(this.nodes[t].p)));
    const a = new Set();
    let c = 0;
    for (; n.size > 0 && c++ < 2e4; ) {
      const l = n.pop();
      if (l === e) {
        const u = [e];
        let d = e;
        for (; r.has(d); ) ((d = r.get(d)), u.push(d));
        return u.reverse();
      }
      if (a.has(l)) continue;
      a.add(l);
      const h = s.get(l);
      for (const [u, d] of this.nodes[l].links) {
        if (a.has(u)) continue;
        const f = h + d;
        f < (s.get(u) ?? 1 / 0) &&
          (s.set(u, f),
          r.set(u, l),
          n.push(u, f + o.distanceTo(this.nodes[u].p)));
      }
    }
    return [];
  }
  seedTerrain(t) {
    const e = new Map();
    for (const n of t)
      for (let s = n.x0; s <= n.x1; s += $n)
        for (let r = n.z0; r <= n.z1; r += $n) {
          if (!Ir(s, r)) continue;
          const o = `${s},${r}`;
          e.has(o) || e.set(o, this.add(new P(s, qt(s, r), r), -1, !0));
        }
    for (const [n, s] of e) {
      const [r, o] = n.split(",").map(Number);
      for (const [a, c] of [
        [$n, 0],
        [0, $n],
        [$n, $n],
        [$n, -$n],
      ]) {
        const l = `${r + a},${o + c}`,
          h = e.get(l);
        if (h === void 0) continue;
        const u = this.nodes[s].p,
          d = this.nodes[h].p;
        if (Math.abs(u.y - d.y) > 2.4) continue;
        const f = (u.x + d.x) / 2,
          m = (u.z + d.z) / 2;
        Ir(f, m) && this.link(s, h);
      }
    }
  }
  removeStruct(t) {
    for (let e = 0; e < this.nodes.length; e++) {
      const n = this.nodes[e];
      if (n.structId === t) {
        for (const s of n.links.keys()) this.nodes[s].links.delete(e);
        (n.links.clear(), (n.structId = -999));
      }
    }
  }
}
class p_ {
  constructor() {
    K(this, "ids", []);
    K(this, "ks", []);
  }
  get size() {
    return this.ids.length;
  }
  push(t, e) {
    (this.ids.push(t), this.ks.push(e));
    let n = this.ids.length - 1;
    for (; n > 0; ) {
      const s = (n - 1) >> 1;
      if (this.ks[s] <= this.ks[n]) break;
      (this.swap(n, s), (n = s));
    }
  }
  pop() {
    const t = this.ids[0],
      e = this.ids.length - 1;
    (this.swap(0, e), this.ids.pop(), this.ks.pop());
    let n = 0;
    for (;;) {
      const s = n * 2 + 1,
        r = s + 1;
      let o = n;
      if (
        (s < this.ids.length && this.ks[s] < this.ks[o] && (o = s),
        r < this.ids.length && this.ks[r] < this.ks[o] && (o = r),
        o === n)
      )
        break;
      (this.swap(n, o), (n = o));
    }
    return t;
  }
  swap(t, e) {
    (([this.ids[t], this.ids[e]] = [this.ids[e], this.ids[t]]),
      ([this.ks[t], this.ks[e]] = [this.ks[e], this.ks[t]]));
  }
}
function ec(i, t = !1) {
  const e = i[0].index !== null,
    n = new Set(Object.keys(i[0].attributes)),
    s = new Set(Object.keys(i[0].morphAttributes)),
    r = {},
    o = {},
    a = i[0].morphTargetsRelative,
    c = new ve();
  let l = 0;
  for (let h = 0; h < i.length; ++h) {
    const u = i[h];
    let d = 0;
    if (e !== (u.index !== null))
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
            h +
            ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.",
        ),
        null
      );
    for (const f in u.attributes) {
      if (!n.has(f))
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
              h +
              '. All geometries must have compatible attributes; make sure "' +
              f +
              '" attribute exists among all geometries, or in none of them.',
          ),
          null
        );
      (r[f] === void 0 && (r[f] = []), r[f].push(u.attributes[f]), d++);
    }
    if (d !== n.size)
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
            h +
            ". Make sure all geometries have the same number of attributes.",
        ),
        null
      );
    if (a !== u.morphTargetsRelative)
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
            h +
            ". .morphTargetsRelative must be consistent throughout all geometries.",
        ),
        null
      );
    for (const f in u.morphAttributes) {
      if (!s.has(f))
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
              h +
              ".  .morphAttributes must be consistent throughout all geometries.",
          ),
          null
        );
      (o[f] === void 0 && (o[f] = []), o[f].push(u.morphAttributes[f]));
    }
    if (t) {
      let f;
      if (e) f = u.index.count;
      else if (u.attributes.position !== void 0)
        f = u.attributes.position.count;
      else
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
              h +
              ". The geometry must have either an index or a position attribute",
          ),
          null
        );
      (c.addGroup(l, f, h), (l += f));
    }
  }
  if (e) {
    let h = 0;
    const u = [];
    for (let d = 0; d < i.length; ++d) {
      const f = i[d].index;
      for (let m = 0; m < f.count; ++m) u.push(f.getX(m) + h);
      h += i[d].attributes.position.count;
    }
    c.setIndex(u);
  }
  for (const h in r) {
    const u = Cl(r[h]);
    if (!u)
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " +
            h +
            " attribute.",
        ),
        null
      );
    c.setAttribute(h, u);
  }
  for (const h in o) {
    const u = o[h][0].length;
    if (u === 0) break;
    ((c.morphAttributes = c.morphAttributes || {}),
      (c.morphAttributes[h] = []));
    for (let d = 0; d < u; ++d) {
      const f = [];
      for (let _ = 0; _ < o[h].length; ++_) f.push(o[h][_][d]);
      const m = Cl(f);
      if (!m)
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " +
              h +
              " morphAttribute.",
          ),
          null
        );
      c.morphAttributes[h].push(m);
    }
  }
  return c;
}
function Cl(i) {
  let t,
    e,
    n,
    s = -1,
    r = 0;
  for (let l = 0; l < i.length; ++l) {
    const h = i[l];
    if ((t === void 0 && (t = h.array.constructor), t !== h.array.constructor))
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.",
        ),
        null
      );
    if ((e === void 0 && (e = h.itemSize), e !== h.itemSize))
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.",
        ),
        null
      );
    if ((n === void 0 && (n = h.normalized), n !== h.normalized))
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.",
        ),
        null
      );
    if ((s === -1 && (s = h.gpuType), s !== h.gpuType))
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.",
        ),
        null
      );
    r += h.count * e;
  }
  const o = new t(r),
    a = new pe(o, e, n);
  let c = 0;
  for (let l = 0; l < i.length; ++l) {
    const h = i[l];
    if (h.isInterleavedBufferAttribute) {
      const u = c / e;
      for (let d = 0, f = h.count; d < f; d++)
        for (let m = 0; m < e; m++) {
          const _ = h.getComponent(d, m);
          a.setComponent(d + u, m, _);
        }
    } else o.set(h.array, c);
    c += h.count * e;
  }
  return (s !== void 0 && (a.gpuType = s), a);
}
const Pl = new se(),
  Dl = new ri(),
  m_ = new P(1, 1, 1);
class oe {
  constructor(t = 0) {
    K(this, "geoms", []);
    K(this, "age");
    this.age = t;
  }
  add(t, e, n = 0, s = 1, r = this.age) {
    if (e) {
      const o = Array.isArray(e) ? new P(...e) : e;
      (Dl.setFromAxisAngle(new P(0, 1, 0), n),
        Pl.compose(o, Dl, m_),
        t.applyMatrix4(Pl));
    }
    return (Ue(t, s, r), this.geoms.push(t), this);
  }
  addRaw(t, e = 1, n = this.age) {
    return (Ue(t, e, n), this.geoms.push(t), this);
  }
  box(t, e, n, s, r = 0, o = 1) {
    const a = new le(t, e, n);
    return (a.translate(0, e / 2, 0), this.add(a, s, r, o));
  }
  cylinder(t, e, n, s = 14, r = 1, o = t) {
    const a = new Fe(o, t, e, s);
    return (a.translate(0, e / 2, 0), this.add(a, n, 0, r));
  }
  merge() {
    if (this.geoms.length === 0) return new ve();
    const t = this.geoms.map((n) => (n.index ? n.toNonIndexed() : n)),
      e = ec(t, !1);
    return (t.forEach((n) => n.dispose()), e);
  }
}
function Ue(i, t = 1, e = 0) {
  const n = i.attributes.position.count;
  if (!i.attributes.aTone || i.attributes.aTone.count !== n) {
    const s = new Float32Array(n * 2);
    for (let r = 0; r < n; r++) ((s[r * 2] = t), (s[r * 2 + 1] = e));
    i.setAttribute("aTone", new pe(s, 2));
  }
  return i;
}
function Ri(i, t, e, n, s, r = 0) {
  const o = i.attributes.position,
    a = o.count,
    c = new Float32Array(a * 2);
  for (let l = 0; l < a; l++) {
    const h = o.getY(l),
      u = Math.max(0, Math.min(1, (h - t) / (e - t)));
    ((c[l * 2] = n + (s - n) * u), (c[l * 2 + 1] = r));
  }
  return (i.setAttribute("aTone", new pe(c, 2)), i);
}
function Hn(i, t, e, n, s = {}) {
  const r = s.ruin ?? 0,
    o = s.rng ?? Je(1234),
    a = s.rings !== !1,
    c = new ss(),
    l = i / 2,
    h = (f) => {
      let m = t * 0.1;
      for (const _ of n)
        Math.abs(f - _.cx) < _.r + 3 &&
          (m = Math.max(m, _.springY + _.r + (a ? 1.05 : 0.55)));
      return m;
    };
  if ((c.moveTo(-l, 0), c.lineTo(l, 0), r > 0.01)) {
    const f = Math.max(3, Math.round(i / 2.2));
    let m = l;
    c.lineTo(l, Math.max(h(l), t * (1 - r * o() * 0.9)));
    for (let _ = 1; _ <= f; _++) {
      const g = l - (i * _) / f,
        p = r * (0.15 + o() * 0.85),
        A = m - (m - g) * 0.4,
        b = Math.max(h(A), t * Math.max(0.12, 1 - p));
      c.lineTo(A, b);
      const v = Math.max(h(g), b - r * o() * t * 0.1);
      (c.lineTo(g, v), (m = g));
    }
    c.lineTo(-l, Math.max(h(-l), t * (1 - r * o() * 0.9)));
  } else (c.lineTo(l, t), c.lineTo(-l, t));
  c.closePath();
  for (const f of n) {
    const m = new Ma(),
      { cx: _, r: g, springY: p } = f;
    (m.moveTo(_ - g, 0.001),
      m.lineTo(_ - g, p),
      m.absarc(_, p, g, Math.PI, 0, !0),
      m.lineTo(_ + g, 0.001),
      m.closePath(),
      c.holes.push(m));
  }
  const u = new Si(c, {
    depth: e,
    bevelEnabled: !1,
    curveSegments: s.curveSeg ?? 20,
  });
  if ((u.translate(0, 0, -e / 2), !a || !n.length)) return u;
  const d = [u];
  for (const f of n) {
    const m = Math.min(0.5, Math.max(0.24, f.r * 0.16)),
      _ = e + 0.34,
      g = new ss();
    (g.moveTo(f.r + m, 0),
      g.absarc(0, 0, f.r + m, 0, Math.PI, !1),
      g.lineTo(-f.r, 0),
      g.absarc(0, 0, f.r, Math.PI, 0, !0),
      g.closePath());
    const p = new Si(g, { depth: _, bevelEnabled: !1, curveSegments: 20 });
    (p.translate(f.cx, f.springY, -_ / 2), d.push(p));
    for (const b of [-1, 1]) {
      const v = new le(m * 2.6, 0.55, e + 0.5);
      (v.translate(f.cx + b * (f.r + m * 0.5), f.springY - 0.28, 0), d.push(v));
    }
    const A = new le(Math.min(0.85, f.r * 0.3), m * 2.1, e + 0.46);
    (A.translate(f.cx, f.springY + f.r + m * 0.35, 0), d.push(A));
  }
  return ec(
    d.map((f) => (f.index ? f.toNonIndexed() : f)),
    !1,
  );
}
function Ji(i, t, e, n, s = {}) {
  const r = i / n,
    o = (r * (s.archFrac ?? 0.72)) / 2,
    a = Math.min(t - o - 0.4, t * (s.springFrac ?? 0.55)),
    c = [];
  for (let l = 0; l < n; l++)
    c.push({ cx: -i / 2 + r * (l + 0.5), r: o, springY: a });
  return Hn(i, t, e, c, s);
}
function g_(i, t, e, n = {}) {
  const s = new oe(),
    r = Math.min(1.2, e * 0.08),
    o = Math.min(0.9, e * 0.06);
  (n.base !== !1 && s.box(i * 1.18, r, t * 1.18, [0, 0, 0]),
    s.box(i, e - (n.cap !== !1 ? o : 0), t, [0, n.base !== !1 ? r : 0, 0]),
    n.cap !== !1 && s.box(i * 1.14, o, t * 1.14, [0, e - o, 0]));
  const a = s.merge();
  return (Ri(a, 0, Math.min(3, e * 0.4), 0.82, 1), a);
}
function Ll(i, t, e, n = {}) {
  const r = Math.max(2, Math.round(t / 0.32)),
    o = t / r,
    a = e / r,
    c = new oe();
  for (let l = 0; l < r; l++) {
    const h = n.solid === !1 ? o : o * (l + 1);
    c.box(a + 0.02, h, i, [a * (l + 0.5), n.solid === !1 ? o * l : 0, 0]);
  }
  return c.merge();
}
function __(i, t = 1.05, e = 0.28) {
  const n = new oe();
  return (
    n.box(i, t - 0.12, e * 0.82, [i / 2, 0, 0]),
    n.box(i, 0.12, e, [i / 2, t - 0.12, 0]),
    n.merge()
  );
}
function v_(i, t, e, n = {}) {
  const s = n.curveSeg ?? 22,
    r = new ss();
  (r.moveTo(i, 0),
    r.absarc(0, 0, i, 0, Math.PI, !1),
    r.lineTo(-(i - t), 0),
    r.absarc(0, 0, i - t, Math.PI, 0, !0),
    r.closePath());
  const o = new Si(r, { depth: e, bevelEnabled: !1, curveSegments: s });
  if ((o.rotateY(Math.PI / 2), n.ribs !== !1 && e > 7)) {
    const a = [o],
      c = Math.max(2, Math.round(e / 5.5));
    for (let h = 0; h <= c; h++) {
      const u = (e * h) / c,
        d = new ss();
      (d.moveTo(i + 0.22, 0),
        d.absarc(0, 0, i + 0.22, 0, Math.PI, !1),
        d.lineTo(-i + 0.1, 0),
        d.absarc(0, 0, i - 0.1, Math.PI, 0, !0),
        d.closePath());
      const f = new Si(d, { depth: 0.55, bevelEnabled: !1, curveSegments: 18 });
      (f.rotateY(Math.PI / 2),
        f.translate(Math.min(u, e - 0.55), 0, 0),
        a.push(f));
    }
    return ec(
      a.map((h) => (h.index ? h.toNonIndexed() : h)),
      !1,
    );
  }
  return o;
}
function Il(i, t, e, n = 0.25) {
  const s = i + n * 2,
    r = t + n * 2,
    o = new ss();
  (o.moveTo(-r / 2, 0), o.lineTo(r / 2, 0), o.lineTo(0, e), o.closePath());
  const a = new Si(o, { depth: s, bevelEnabled: !1 });
  return (a.rotateY(Math.PI / 2), a.translate(-s / 2, 0, 0), a);
}
function nc(i, t) {
  const e = new oe(),
    n = i * 0.14 * (0.85 + t() * 0.3);
  e.cylinder(n * 0.24, i * 0.1, [0, 0, 0], 6);
  const s = new ls(n, i * 0.92, 7);
  return (s.translate(0, i * 0.1 + i * 0.46, 0), e.addRaw(s), e.merge());
}
function x_(i, t, e) {
  const n = i.attributes.position;
  if (!n || n.count < 12) return null;
  const s = 2.6,
    r = new Map();
  let o = -1 / 0,
    a = 1 / 0;
  for (let u = 0; u < n.count; u++) {
    const d = n.getX(u),
      f = n.getY(u),
      m = n.getZ(u);
    ((o = Math.max(o, f)), (a = Math.min(a, f)));
    const _ = `${Math.round(d / s)},${Math.round(m / s)}`,
      g = r.get(_);
    (!g || f > g[1]) && r.set(_, [d, f, m]);
  }
  if (o - a < 3) return null;
  const c = [...r.values()].filter((u) => u[1] > a + (o - a) * 0.45);
  if (!c.length) return null;
  const l = new oe(),
    h = Math.min(e, c.length);
  for (let u = 0; u < h; u++) {
    const d = c[Math.floor(t() * c.length)],
      f = 0.5 + t() * 0.9;
    for (let m = 0; m < 2 + Math.floor(t() * 2); m++) {
      const _ = new ls(0.26 * f * (0.7 + t() * 0.6), (0.7 + t() * 0.9) * f, 5);
      (_.rotateZ((t() - 0.5) * 0.9),
        _.rotateX((t() - 0.5) * 0.5),
        _.translate(
          d[0] + (t() - 0.5) * 1.1,
          d[1] + 0.25 * f,
          d[2] + (t() - 0.5) * 1.1,
        ),
        l.addRaw(_));
    }
    if (t() < 0.55) {
      const m = new le(0.1, 0.9 + t() * 1.6, 0.1);
      (m.translate(
        d[0] + (t() - 0.5) * 0.8,
        d[1] - 0.5,
        d[2] + (t() - 0.5) * 0.8,
      ),
        l.addRaw(m));
    }
  }
  return l.merge();
}
function Pa(i) {
  const t = new oe(),
    e = i();
  if (e < 0.45) {
    const s = 0.35 + i() * 0.5,
      r = 0.5 + i() * 2.2;
    t.cylinder(s, r, [0, 0, 0], 10, 1, s * (0.86 + i() * 0.1));
  } else
    e < 0.75
      ? t.box(
          0.7 + i() * 1.4,
          0.4 + i() * 0.8,
          0.6 + i() * 1,
          [0, 0, 0],
          i() * Math.PI,
        )
      : (t.box(0.9, 0.3, 0.9, [0, 0, 0], i()),
        t.box(0.7, 0.35, 0.7, [0.05, 0.3, 0.05], i()));
  const n = t.merge();
  return (Ri(n, 0, 1.2, 0.86, 1), n);
}
function Ci() {
  return {
    pieces: {},
    navPts: [],
    pockets: [],
    water: [],
    waterSources: [],
    cost: { stone: 0, timber: 0 },
  };
}
function Yt(i, t, e) {
  var n;
  (Ue(e), ((n = i.pieces)[t] || (n[t] = [])).push(e));
}
function Ur(i, t, e, n, s) {
  if (!n) return;
  const r = x_(t, e, s);
  r && Yt(i, "green", r);
}
function be(i, t, e, n, s = 0) {
  return (s && i.rotateY(s), i.translate(t, e, n), i);
}
const dn = (i, t, e) => new P(i, t, e);
function y_(i) {
  const t = Ci(),
    e = Je(i.id * 7919 + 11),
    n = qt(i.x, i.z),
    s = i.topY - n,
    r = i.age ?? 0.15;
  if (i.style === "column") {
    const o = new oe(r),
      a = Xe(s * 0.075, 1.1, 2);
    (o.box(a * 3.2, 1.2, a * 3.2, [0, 0, 0]),
      o.box(a * 2.7, 1, a * 2.7, [0, 1.2, 0]),
      o.cylinder(a, s - 4.4, [0, 2.2, 0], 18, 1, a * 0.88),
      o.box(a * 2.6, 0.7, a * 2.6, [0, s - 2.2, 0]),
      o.box(a * 3, 1.5, a * 3, [0, s - 1.5, 0]));
    const c = o.merge();
    (Ri(c, 0, 4, 0.85, 1, r),
      Yt(t, "stone", be(c, i.x, n, i.z)),
      (t.cost.stone = Math.round(s * 3)));
  } else {
    const o = i.style === "giant" ? 9 : 4.6;
    if (i.style === "giant" && i.carveAxis) {
      const a = i.carveAxis === "x" ? Math.PI / 2 : 0,
        c = new oe(r);
      (c.box(o * 1.18, 1.2, o * 1.18, [0, -0.5, 0]),
        Yt(t, "stone", be(c.merge(), i.x, n, i.z, 0)));
      const l = Hn(o, s + 1, o, [{ cx: 0, r: 2.1, springY: 3.1 }], { rng: e });
      (be(l, i.x, n + 0.4, i.z, a), Yt(t, "stone", l));
      const h = new oe(r);
      (h.box(o * 1.14, 0.9, o * 1.14, [0, 0, 0]),
        Yt(t, "stone", be(h.merge(), i.x, i.topY - 0.9, i.z, 0)));
      for (const _ of i.carveAxis === "x" ? [0, 2] : [1, 3]) {
        const g = Hn(
            o * 0.94,
            s * 0.55,
            0.7,
            [{ cx: 0, r: o * 0.26, springY: s * 0.3 }],
            { rng: e },
          ),
          p = (_ * Math.PI) / 2;
        (be(
          g,
          i.x + Math.sin(p) * (o / 2 + 0.1),
          n,
          i.z + Math.cos(p) * (o / 2 + 0.1),
          p,
        ),
          Yt(t, "stone", g));
      }
      const u = i.carveAxis === "x" ? 1 : 0,
        d = i.carveAxis === "x" ? 0 : 1,
        f = [
          i.x + u * (o / 2 + 2.5),
          qt(i.x + u * (o / 2 + 2.5), i.z + d * (o / 2 + 2.5)),
          i.z + d * (o / 2 + 2.5),
        ],
        m = [
          i.x - u * (o / 2 + 2.5),
          qt(i.x - u * (o / 2 + 2.5), i.z - d * (o / 2 + 2.5)),
          i.z - d * (o / 2 + 2.5),
        ];
      (t.navPts.push({ pos: f, links: [], splice: !0 }),
        t.navPts.push({ pos: m, links: [0], splice: !0 }),
        t.pockets.push({
          kind: "undercroft",
          pos: [i.x, n, i.z],
          rotY: a,
          area: o * 4,
          height: 5,
          shelter: 1,
          light: 0.35,
          scenic: 0.5,
        }));
    } else {
      const a = g_(o, o, s + 1.5);
      if ((be(a, i.x, n - 0.5, i.z), Yt(t, "stone", a), i.style === "giant")) {
        for (let c = 0; c < 4; c++) {
          const l = Hn(
              o * 0.94,
              s * 0.55,
              0.7,
              [{ cx: 0, r: o * 0.26, springY: s * 0.3 }],
              { rng: e },
            ),
            h = (c * Math.PI) / 2;
          (be(
            l,
            i.x + Math.sin(h) * (o / 2 + 0.1),
            n,
            i.z + Math.cos(h) * (o / 2 + 0.1),
            h,
          ),
            Yt(t, "stone", l));
        }
        t.pockets.push({
          kind: "niche",
          pos: [i.x + o / 2 + 1.5, n, i.z],
          rotY: Math.PI / 2,
          area: 6,
          height: 3,
          shelter: 0.6,
          light: 0.6,
          scenic: 0.4,
        });
      }
    }
    t.cost.stone = Math.round(s * (i.style === "giant" ? 6 : 3));
  }
  return (
    (t.anchorTop = [i.x, i.topY, i.z]),
    t.navPts.push({ pos: [i.x, i.topY, i.z], links: [], splice: !0 }),
    t
  );
}
function M_(i) {
  const t = Ci(),
    e = Je(i.id * 7919 + 23),
    n = i.age ?? 0.07,
    s = dn(i.ax, i.ay, i.az),
    r = dn(i.bx, i.by, i.bz),
    o = dn(r.x - s.x, 0, r.z - s.z),
    a = Math.hypot(o.x, o.z);
  if (a < 4) return t;
  const c = o.clone().multiplyScalar(1 / a),
    l = Math.atan2(c.x, c.z),
    h = i.width,
    u = (w) => zn(s.y, r.y, w / a),
    d = (w) => {
      const I = s.x + c.x * w,
        F = s.z + c.z * w;
      return qt(I, F);
    };
  let f = 1 / 0;
  for (let w = 0; w <= a; w += 3) f = Math.min(f, d(w));
  const m = Math.min(s.y, r.y),
    _ = m - f,
    g = Xe(_ * 0.62, 7, 15),
    p = Math.max(1, Math.round(a / g)),
    A = a / p,
    b = Xe(A * 0.24, 1.5, 4.5),
    v = (A - b) / 2;
  for (let w = 0; w < p; w++) {
    const I = A * w,
      F = A * (w + 1),
      B = (I + F) / 2,
      k = u(B) - 1.12;
    let G = 1 / 0;
    for (let Lt = I; Lt <= F; Lt += 2) G = Math.min(G, d(Lt));
    const Y = k - G + 2;
    if (Y < 3.2) continue;
    const H = Y - v - 0.55,
      ct = Hn(
        A + 0.08,
        Y,
        h * 0.86,
        H > 1.2 ? [{ cx: 0, r: v, springY: H }] : [],
        { rng: e, ruin: i.ruin ?? 0 },
      );
    ct.rotateY(l - Math.PI / 2);
    const pt = s.x + c.x * B,
      gt = s.z + c.z * B;
    if (
      (ct.translate(pt, G - 2, gt),
      Ri(ct, G - 2, G + 4, 0.85, 1, n),
      Yt(t, "stone", ct),
      Ur(t, ct, e, n > 0.25, 2),
      k - G > 34)
    ) {
      const Lt = Ji(A + 0.06, 9, h * 0.78, 2, { rng: e, springFrac: 0.5 });
      (Lt.rotateY(l - Math.PI / 2),
        Lt.translate(pt, G - 2 + Y - 9 - 0.01, gt),
        Yt(t, "stone", Lt));
    }
  }
  const R = Math.max(2, Math.round(a / 7)),
    E = new oe(n);
  for (let w = 0; w < R; w++) {
    const I = (a * w) / R,
      F = (a * (w + 1)) / R,
      B = u((I + F) / 2);
    (E.box(F - I + 0.05, 1.15, h, [(I + F) / 2 - a / 2, B - 1.15, 0]),
      E.box(F - I + 0.05, 0.3, h + 0.55, [(I + F) / 2 - a / 2, B - 1.45, 0]));
  }
  const C = i.kind === "aqueduct",
    L = C ? 1.45 : 1;
  for (const w of [-1, 1])
    for (let I = 0; I < R; I++) {
      const F = (a * I) / R,
        B = (a * (I + 1)) / R,
        k = u((F + B) / 2);
      E.box(B - F + 0.05, L, C ? 0.6 : 0.35, [
        (F + B) / 2 - a / 2,
        k,
        w * (h / 2 - 0.3),
      ]);
    }
  const y = E.merge();
  if (
    (y.rotateY(l - Math.PI / 2),
    y.translate((s.x + r.x) / 2, 0, (s.z + r.z) / 2),
    Yt(t, "stone", y),
    i.kind === "arcade")
  ) {
    const w = Ji(a, 6.5, 0.9, Math.max(2, Math.round(a / 4.5)), {
        rng: e,
        springFrac: 0.6,
      }),
      I = w.clone(),
      F = h / 2 - 1.1;
    (w.rotateY(l - Math.PI / 2), I.rotateY(l - Math.PI / 2));
    const B = Math.cos(l),
      k = -Math.sin(l);
    (w.translate((s.x + r.x) / 2 + B * F, m, (s.z + r.z) / 2 + k * F),
      I.translate((s.x + r.x) / 2 - B * F, m, (s.z + r.z) / 2 - k * F),
      Yt(t, "stone", w),
      Yt(t, "stone", I));
    const G = new oe(n);
    G.box(a, 0.7, h, [0, 6.5, 0]);
    const Y = G.merge();
    (Y.rotateY(l - Math.PI / 2),
      Y.translate((s.x + r.x) / 2, m, (s.z + r.z) / 2),
      Yt(t, "stone", Y));
  }
  if (C) {
    (t.water.push({ a: [s.x, s.y + 0.55, s.z], b: [r.x, r.y + 0.55, r.z] }),
      t.waterSources.push([r.x, r.y, r.z]),
      t.waterSources.push([s.x, s.y, s.z]));
    const w = s.y <= r.y ? s : r,
      I = qt(w.x, w.z);
    if (w.y - I < 4) {
      const F = new oe(n);
      F.box(5.4, 1.1, 5.4, [0, 0, 0]);
      const B = F.merge();
      (be(B, w.x, I, w.z, 0), Yt(t, "stone", B));
      const k = new Fe(1.9, 1.9, 0.16, 14);
      (k.translate(w.x, I + 1.02, w.z),
        Yt(t, "water", k),
        t.pockets.push({
          kind: "terrace_p",
          pos: [w.x + 5, I, w.z + 2],
          rotY: 0,
          area: 26,
          height: 99,
          shelter: 0.15,
          light: 0.9,
          scenic: 0.6,
        }));
    }
  }
  const M = Math.max(2, Math.round(a / 11));
  for (let w = 0; w <= M; w++) {
    const I = (a * w) / M;
    t.navPts.push({
      pos: [s.x + c.x * I, u(I), s.z + c.z * I],
      links: w > 0 ? [w - 1] : [],
      splice: w === 0 || w === M,
    });
  }
  for (let w = 0; w < p; w++) {
    const I = A * (w + 0.5),
      F = s.x + c.x * I,
      B = s.z + c.z * I,
      k = qt(F, B),
      G = u(I) - 1.15 - k;
    G > 3.2 &&
      G < 60 &&
      t.pockets.push({
        kind: "under_arch",
        pos: [F, k, B],
        rotY: l,
        area: Math.min(A, 12) * Math.min(h, 9),
        height: Math.min(G, 12),
        shelter: 0.95,
        light: 0.45,
        scenic: 0.5,
      });
  }
  if (h >= 6)
    for (let w = 1; w < M; w++) {
      const I = (a * w) / M;
      w % 2 !== 0 &&
        t.pockets.push({
          kind: "deck",
          pos: [s.x + c.x * I, u(I), s.z + c.z * I],
          rotY: l,
          area: 5 * (h - 4),
          height: 99,
          shelter: 0.15,
          light: 0.95,
          scenic: 0.85,
        });
    }
  return ((t.cost.stone = Math.round(a * Math.max(4, _) * 0.09)), t);
}
function S_(i) {
  const t = Ci(),
    e = Je(i.id * 7919 + 37),
    n = i.age ?? 0.07;
  let s = dn(i.ax, i.ay, i.az),
    r = dn(i.bx, i.by, i.bz);
  if (r.y < s.y) {
    const A = s;
    ((s = r), (r = A));
  }
  const o = r.y - s.y,
    a = dn(r.x - s.x, 0, r.z - s.z),
    c = Math.hypot(a.x, a.z);
  if (o < 1.2) return t;
  const l = c > 0.5 ? a.clone().multiplyScalar(1 / c) : dn(1, 0, 0),
    h = Math.atan2(l.x, l.z),
    u = i.style === "ceremonial" ? 11 : 6,
    d = i.style === "ceremonial" ? 1.9 : 1.5,
    f = o * d,
    m = i.style === "switchback" || c < f * 0.72,
    _ = new oe(n),
    g = [],
    p = [];
  if (m) {
    const A = dn(l.z, 0, -l.x),
      v = Math.max(2, Math.ceil(o / 5)),
      R = o / v,
      E = Xe(R * 1.55, 6, 14),
      C = c / v;
    let L = s.y,
      y = dn(s.x, 0, s.z),
      M = 1;
    t.navPts.push({ pos: [s.x, s.y, s.z], links: [], splice: !0 });
    for (let w = 0; w < v; w++) {
      const I = A.clone().multiplyScalar(M),
        F = Math.atan2(I.x, I.z),
        B = y.clone().add(I.clone().multiplyScalar(-E / 2)),
        k = Ll(5.2, R, E);
      (k.rotateY(F - Math.PI / 2),
        k.translate(B.x, L, B.z),
        Ue(k, 1, n),
        Yt(t, "stone", k));
      const G = Math.min(qt(B.x, B.z), qt(y.x, y.z)) - 1,
        Y = L - G;
      if (Y > 0.4) {
        let gt;
        if (Y > 6.5)
          gt = Hn(
            E,
            Y + 0.2,
            4.6,
            [{ cx: 0, r: Math.min(E * 0.3, Y * 0.32), springY: Y * 0.42 }],
            { rng: e },
          );
        else {
          const Lt = new oe(n);
          (Lt.box(E, Y + 0.2, 4.6, [0, 0, 0]), (gt = Lt.merge()));
        }
        (gt.rotateY(F - Math.PI / 2),
          gt.translate(y.x, G, y.z),
          Ue(gt, 1, n),
          Yt(t, "stone", gt),
          Y > 6.5 &&
            t.pockets.push({
              kind: "undercroft",
              pos: [y.x + I.x * 1, G + 1, y.z + I.z * 1],
              rotY: F,
              area: E * 3,
              height: Y * 0.5,
              shelter: 0.85,
              light: 0.4,
              scenic: 0.45,
            }));
      }
      const H = y.clone().add(I.clone().multiplyScalar(E / 2)),
        ct = new oe(n);
      ct.box(4.4, L + R - qt(H.x, H.z) + 1, 4.6, [0, 0, 0]);
      const pt = ct.merge();
      (pt.translate(H.x, qt(H.x, H.z) - 1, H.z),
        Yt(t, "stone", pt),
        (L += R),
        t.navPts.push({
          pos: [H.x, L, H.z],
          links: [t.navPts.length - 1],
          splice: !1,
        }),
        w % 2 === 1 &&
          t.pockets.push({
            kind: "landing",
            pos: [H.x, L, H.z],
            rotY: F,
            area: 12,
            height: 99,
            shelter: 0.25,
            light: 0.85,
            scenic: 0.75,
          }),
        (y = H.clone().add(l.clone().multiplyScalar(C))),
        y.add(I.clone().multiplyScalar(-E / 2)),
        (M *= -1));
    }
    t.navPts.push({
      pos: [r.x, r.y, r.z],
      links: [t.navPts.length - 1],
      splice: !0,
    });
  } else {
    const A = Math.max(1, Math.ceil(o / 6)),
      b = o / A,
      v = Math.min((c - (A - 1) * 4) / A, b * 2.4);
    let R = 0,
      E = 0;
    g.push({ pos: [0, 0, 0], links: [], splice: !0 });
    for (let y = 0; y < A; y++) {
      const M = Ll(u, b, v);
      (M.translate(R, E, 0),
        _.addRaw(M),
        (R += v),
        (E += b),
        y < A - 1 &&
          (_.box(4, 1, u, [R + 2, E - 1, 0]),
          _.box(4, E, u, [R + 2, -0.2, 0]),
          g.push({ pos: [R + 2, E, 0], links: [g.length - 1], splice: !1 }),
          u >= 8 &&
            p.push({
              kind: "landing",
              pos: [R + 2, E, 0],
              rotY: 0,
              area: 4 * u - 20,
              height: 99,
              shelter: 0.2,
              light: 0.9,
              scenic: 0.7,
            }),
          (R += 4)));
    }
    if (o > 7 && c > 12) {
      const y = Hn(
        Math.min(c * 0.5, 14),
        o * 0.52,
        u * 0.9,
        [{ cx: 0, r: Math.min(c * 0.5, 14) * 0.22, springY: o * 0.2 }],
        { rng: e },
      );
      (y.rotateY(-Math.PI / 2), y.rotateY(Math.PI));
      const M = R * 0.72;
      (y.rotateY(Math.PI / 2),
        y.translate(M, 0, 0),
        _.addRaw(y),
        p.push({
          kind: "undercroft",
          pos: [M, 0, u / 2 + 1.2],
          rotY: 0,
          area: 20,
          height: 4,
          shelter: 0.85,
          light: 0.35,
          scenic: 0.4,
        }));
    }
    if (i.style === "ceremonial")
      for (const y of [-1, 1]) {
        const M = __(R, 1);
        (M.translate(0, 0, y * (u / 2 - 0.2)),
          _.addRaw(M),
          _.box(1.8, 2.2, 1.8, [-1.2, 0, y * (u / 2 + 0.4)]));
      }
    g.push({ pos: [R, E, 0], links: [g.length - 1], splice: !0 });
    const C = _.merge();
    (Ri(C, 0, 3, 0.88, 1, n),
      C.rotateY(h - Math.PI / 2),
      C.translate(s.x, s.y, s.z),
      Yt(t, "stone", C));
    const L = (y) => {
      const M = y[0] * Math.sin(h) - y[2] * Math.cos(h),
        w = y[0] * Math.cos(h) + y[2] * Math.sin(h);
      return [s.x + M, s.y + y[1], s.z + w];
    };
    ((t.navPts = g.map((y) => ({ ...y, pos: L(y.pos) }))),
      (t.pockets = p.map((y) => ({ ...y, pos: L(y.pos), rotY: y.rotY + h }))));
  }
  return ((t.cost.stone = Math.round(o * u * 0.9)), t);
}
function b_(i) {
  const t = Ci(),
    e = Je(i.id * 7919 + 53),
    n = i.age ?? 0.07,
    s = i.ruin ?? 0,
    r = qt(i.x, i.z),
    { w: o, l: a, h: c } = i,
    l = Math.max(2, Math.round(a / 6.2)),
    h = i.rotY - Math.PI / 2,
    u = s > 0.15 ? a * Xe(0.72 - s * 0.35, 0.3, 0.8) : a + 1;
  for (const v of [-1, 1]) {
    const R = Math.sin(i.rotY + Math.PI / 2) * (o / 2) * v,
      E = Math.cos(i.rotY + Math.PI / 2) * (o / 2) * v;
    if (s > 0.15 && u < a - 4) {
      const C = Math.min(u + 2, a),
        L = Math.max(1, Math.round((l * C) / a)),
        y = Ji(C, c, 1.5, L, { rng: e, ruin: 0.06, springFrac: 0.52 }),
        M = -(a - C) / 2;
      (be(
        y,
        i.x + Math.sin(i.rotY) * M + R,
        r,
        i.z + Math.cos(i.rotY) * M + E,
        h,
      ),
        Yt(t, "stone", y));
      const w = a - C,
        I = Math.max(1, l - L),
        F = Ji(w, c, 1.5, I, {
          rng: e,
          ruin: Xe(s * 1.35, 0, 0.95),
          springFrac: 0.52,
        }),
        B = C / 2;
      (be(
        F,
        i.x + Math.sin(i.rotY) * B + R,
        r,
        i.z + Math.cos(i.rotY) * B + E,
        h,
      ),
        Yt(t, "stone", F),
        Ur(t, F, e, !0, Math.ceil(w / 7)));
    } else {
      const C = Ji(a, c, 1.5, l, {
        rng: e,
        ruin: s * (v > 0 ? 1 : 0.5),
        springFrac: 0.52,
      });
      (be(C, i.x + R, r, i.z + E, h),
        Yt(t, "stone", C),
        Ur(t, C, e, s > 0.2 || n > 0.3, Math.ceil(a / 8)));
    }
  }
  for (const v of [-1, 1]) {
    const R = Hn(
      o + 1.5,
      c + (s > 0.3 && v > 0 ? -c * 0.3 : 2.5),
      1.6,
      [{ cx: 0, r: o * 0.27, springY: c * 0.42 }],
      { rng: e, ruin: s * 0.7 },
    );
    (be(
      R,
      i.x + Math.sin(i.rotY) * (a / 2) * v,
      r,
      i.z + Math.cos(i.rotY) * (a / 2) * v,
      i.rotY,
    ),
      Yt(t, "stone", R));
  }
  const d = s > 0.15 ? a * Xe(0.72 - s * 0.35, 0.3, 0.8) : a + 1,
    f = v_(o / 2 + 0.9, 1, d);
  (f.translate(-d / 2, 0, 0),
    be(
      f,
      i.x - Math.sin(i.rotY) * ((a - d) * 0.5),
      r + c,
      i.z - Math.cos(i.rotY) * ((a - d) * 0.5),
      h,
    ),
    Yt(t, "stone", f));
  const m = new oe(n);
  m.box(a + 3, 0.9, o + 3, [0, -0.9, 0]);
  const _ = m.merge();
  if ((be(_, i.x, r, i.z, h), Yt(t, "stone", _), s > 0.2))
    for (let v = 0; v < Math.round(s * 8); v++) {
      const R = (e() - 0.5) * (a * 0.7),
        E = (e() - 0.5) * (o * 0.6),
        C = Pa(e),
        L = i.x + Math.sin(i.rotY) * R + Math.sin(i.rotY + Math.PI / 2) * E,
        y = i.z + Math.cos(i.rotY) * R + Math.cos(i.rotY + Math.PI / 2) * E;
      (be(C, L, r, y, e() * 3), Yt(t, "stoneOld", C));
    }
  const g = Math.sin(i.rotY),
    p = Math.cos(i.rotY),
    A = [];
  for (let v = -a / 2 - 4; v <= a / 2 + 4.01; v += (a + 8) / 4)
    A.push([i.x + g * v, r, i.z + p * v]);
  A.forEach((v, R) =>
    t.navPts.push({
      pos: v,
      links: R > 0 ? [R - 1] : [],
      splice: R === 0 || R === A.length - 1,
    }),
  );
  const b = Math.max(2, Math.floor(a / 7));
  for (let v = 0; v < b; v++) {
    const R = -a / 2 + (a / b) * (v + 0.5);
    for (const E of [-1, 1]) {
      const C = (o / 2 - 2.4) * E,
        L = i.x + g * R + Math.sin(i.rotY + Math.PI / 2) * C,
        y = i.z + p * R + Math.cos(i.rotY + Math.PI / 2) * C,
        M = R + a / 2 < d;
      t.pockets.push({
        kind: "interior",
        pos: [L, r, y],
        rotY: i.rotY + (E > 0 ? Math.PI / 2 : -Math.PI / 2),
        area: (a / b) * 4,
        height: c,
        shelter: M ? 1 : 0.4,
        light: M ? 0.3 : 0.8,
        scenic: 0.55,
      });
    }
  }
  return ((t.cost.stone = Math.round(o * a * 0.32 + c * (o + a) * 0.22)), t);
}
function E_(i) {
  const t = Ci(),
    e = Je(i.id * 7919 + 71),
    n = i.age ?? 0.3,
    s = dn(i.ax, 0, i.az),
    r = dn(i.bx, 0, i.bz),
    o = dn(r.x - s.x, 0, r.z - s.z),
    a = Math.hypot(o.x, o.z),
    c = o.multiplyScalar(1 / a),
    l = Math.atan2(c.x, c.z),
    h = Math.min(qt(s.x, s.z), qt(r.x, r.z)) - 1.5,
    u = [];
  for (const m of i.openings ?? [])
    u.push({ cx: m.s - a / 2, r: m.w / 2, springY: m.h - m.w / 2 });
  const d = Hn(a, i.h, i.th, u, { rng: e, ruin: n > 0.4 ? 0.12 : 0 });
  (d.rotateY(l - Math.PI / 2),
    d.translate((s.x + r.x) / 2, h, (s.z + r.z) / 2),
    Ri(d, h, h + 4, 0.86, 1, n),
    Yt(t, "stone", d),
    Ur(t, d, e, n > 0.3, Math.ceil(a / 9)));
  const f = Math.floor(a / 9);
  for (let m = 1; m < f; m++) {
    const _ = (a * m) / f;
    if ((i.openings ?? []).some((C) => Math.abs(C.s - _) < C.w / 2 + 1.5))
      continue;
    const p = s.x + c.x * _,
      A = s.z + c.z * _,
      b = new oe(n);
    (b.box(2.2, i.h * 0.75, 1.9, [0, 0, 0]),
      b.box(1.8, i.h * 0.22, 1.4, [0, i.h * 0.75, 0.2]));
    const v = b.merge(),
      R = Math.cos(l),
      E = -Math.sin(l);
    (be(
      v,
      p + R * (i.th / 2 + 0.8),
      qt(p, A) - 0.5,
      A + E * (i.th / 2 + 0.8),
      l,
    ),
      Yt(t, "stone", v));
  }
  for (const m of i.openings ?? []) {
    const _ = m.s,
      g = s.x + c.x * _,
      p = s.z + c.z * _,
      A = Math.cos(l),
      b = -Math.sin(l),
      v = qt(g + A * (i.th / 2 + 2), p + b * (i.th / 2 + 2)),
      R = qt(g - A * (i.th / 2 + 2), p - b * (i.th / 2 + 2)),
      E = t.navPts.length;
    (t.navPts.push({
      pos: [g + A * (i.th / 2 + 2), v, p + b * (i.th / 2 + 2)],
      links: [],
      splice: !0,
    }),
      t.navPts.push({
        pos: [g - A * (i.th / 2 + 2), R, p - b * (i.th / 2 + 2)],
        links: [E],
        splice: !0,
      }),
      t.pockets.push({
        kind: "undercroft",
        pos: [g, Math.min(v, R), p],
        rotY: l,
        area: m.w * i.th,
        height: m.h,
        shelter: 0.9,
        light: 0.4,
        scenic: 0.35,
      }));
  }
  return ((t.cost.stone = Math.round(a * i.h * 0.11)), t);
}
function w_(i) {
  const t = Ci(),
    e = Je(i.id * 7919 + 87),
    n = i.y;
  if (i.kind === "cypress") {
    const s = nc(5.5 + e() * 4, e);
    (be(s, i.x, n, i.z, i.rotY), Yt(t, "green", s));
  } else if (i.kind === "statue") {
    const s = new oe(0.1);
    (s.box(1.6, 1.9, 1.6, [0, 0, 0]), s.box(1.25, 0.32, 1.25, [0, 1.9, 0]));
    const r = s.merge();
    (be(r, i.x, n, i.z, i.rotY), Yt(t, "stone", r));
    const o = new oe(0);
    (o.box(0.55, 1.5, 0.42, [0, 0, 0]),
      o.cylinder(0.2, 0.34, [0, 1.55, 0], 8),
      o.box(0.85, 0.2, 0.3, [0, 1.1, 0]));
    const a = o.merge();
    (be(a, i.x, n + 2.22, i.z, i.rotY + e()),
      Yt(t, "gold", a),
      t.pockets.push({
        kind: "niche",
        pos: [i.x + 2, n, i.z],
        rotY: i.rotY,
        area: 4,
        height: 3,
        shelter: 0.1,
        light: 0.9,
        scenic: 0.9,
      }));
  } else if (i.kind === "fountain") {
    const s = new oe(0.05);
    (s.cylinder(2.3, 0.9, [0, 0, 0], 14),
      s.cylinder(0.4, 1.7, [0, 0.4, 0], 8),
      s.cylinder(1.1, 0.25, [0, 1.7, 0], 10));
    const r = s.merge();
    (be(r, i.x, n, i.z, 0), Yt(t, "stone", r));
    const o = new Fe(2.05, 2.05, 0.12, 16);
    (o.translate(i.x, n + 0.82, i.z),
      Yt(t, "water", o),
      t.waterSources.push([i.x, n, i.z]));
  } else if (i.kind === "lantern") {
    const s = new oe(0);
    (s.cylinder(0.09, 3.4, [0, 0, 0], 6), s.box(0.5, 0.08, 0.5, [0, 3.4, 0]));
    const r = s.merge();
    (be(r, i.x, n, i.z, 0), Yt(t, "timber", r));
    const o = new le(0.34, 0.4, 0.34);
    (o.translate(i.x, n + 3.15, i.z), Yt(t, "glow", o));
  } else if (i.kind === "obelisk") {
    const s = new oe(0.1);
    (s.box(2.4, 1.1, 2.4, [0, 0, 0]),
      s.cylinder(0.85, 9, [0, 1.1, 0], 4, 1, 0.5));
    const r = s.merge();
    (be(r, i.x, n, i.z, Math.PI / 4), Yt(t, "stone", r));
    const o = new ls(0.52, 1, 4);
    (o.translate(i.x, n + 10.4, i.z), Yt(t, "gold", o));
  }
  return ((t.cost.stone = 4), t);
}
function Da(i) {
  switch (i.t) {
    case "anchor":
      return y_(i);
    case "span":
      return M_(i);
    case "rise":
      return S_(i);
    case "vault":
      return b_(i);
    case "wall":
      return E_(i);
    case "emb":
      return w_(i);
    default:
      return Ci();
  }
}
class T_ {
  constructor(t, e) {
    K(this, "scene");
    K(this, "mats");
    K(this, "glowMat");
    K(this, "terrainMesh");
    K(this, "structGroup", new rn());
    K(this, "waterGroup", new rn());
    K(this, "infillGroup", new rn());
    K(this, "nav", new Rl());
    K(this, "pockets", []);
    K(this, "structures", new Map());
    K(this, "anchors", new Map());
    K(this, "waterSources", []);
    K(this, "designations", []);
    K(this, "actions", []);
    K(this, "onStructureBuilt", null);
    K(this, "desigMarks", new Map());
    ((this.scene = t),
      (this.mats = e),
      (this.glowMat = i_()),
      t.add(this.structGroup, this.waterGroup, this.infillGroup));
  }
  buildTerrain() {
    const t = f_();
    ((this.terrainMesh = new he(t, this.mats.rock)),
      (this.terrainMesh.receiveShadow = !0),
      (this.terrainMesh.castShadow = !0),
      this.scene.add(this.terrainMesh));
  }
  seedNav() {
    this.nav.seedTerrain([
      { x0: -140, x1: 40, z0: -44, z1: 120 },
      { x0: -120, x1: 34, z0: -150, z1: -48 },
      { x0: 86, x1: 170, z0: -80, z1: 60 },
      { x0: 40, x1: 84, z0: -140, z1: 140 },
      { x0: -140, x1: 40, z0: -160, z1: -150 },
    ]);
  }
  applyAction(t, e = !0) {
    if ((this.actions.push(t), t.t === "carve")) {
      const n = this.structures.get(t.target);
      if (n && n.action.t === "wall") {
        const s = n.action;
        ((s.openings = [...(s.openings ?? []), { s: t.s, w: t.w, h: t.h }]),
          this.rebuildStruct(t.target));
      } else
        n &&
          n.action.t === "anchor" &&
          n.action.style === "giant" &&
          ((n.action.carveAxis = t.s < 0.5 ? "x" : "z"),
          this.rebuildStruct(t.target));
      return null;
    }
    if (t.t === "designate") {
      this.designations.push({ kind: t.kind, x: t.x, z: t.z, r: t.r });
      for (const n of this.pockets)
        n.occupiedBy < 0 &&
          !n.designation &&
          Math.hypot(n.pos[0] - t.x, n.pos[2] - t.z) < t.r &&
          (n.designation = t.kind);
      return (
        this.seedGroundPockets(
          t.x,
          t.z,
          5,
          3,
          Math.max(5, t.r - 3),
          1009 + (t.id % 997),
        ),
        this.addDesignationMark(t),
        null
      );
    }
    return this.buildStruct(t, e);
  }
  buildStruct(t, e = !0) {
    const n = Da(t),
      s = [];
    for (const a of Object.keys(n.pieces)) {
      const c = n.pieces[a];
      if (!c.length) continue;
      const l = Ul(c),
        h = a === "glow" ? this.glowMat : this.mats[a],
        u = new he(l, h);
      ((u.castShadow = a !== "water" && a !== "glow"),
        (u.receiveShadow = a !== "glow" && a !== "water"),
        (u.userData.structId = t.id),
        (u.userData.matKey = a),
        s.push(u),
        a === "water" ? this.waterGroup.add(u) : this.structGroup.add(u));
    }
    for (const a of n.water) {
      const c = A_(a.a, a.b, 1.7),
        l = new he(c, this.mats.water);
      ((l.userData.structId = t.id), this.waterGroup.add(l), s.push(l));
    }
    for (const a of n.waterSources) this.waterSources.push(new P(...a));
    const r = [];
    for (let a = 0; a < n.navPts.length; a++) {
      const c = n.navPts[a];
      r.push(this.nav.add(new P(...c.pos), t.id, !1));
    }
    for (let a = 0; a < n.navPts.length; a++) {
      for (const c of n.navPts[a].links) this.nav.link(r[a], r[c]);
      if (e && n.navPts[a].splice) {
        const c = new P(...n.navPts[a].pos),
          l = new Set(r);
        for (let h = 0; h < 2; h++) {
          const u = this.nav.nearest(c, 10, (d, f) => !l.has(f));
          if (u >= 0) (this.nav.link(r[a], u), l.add(u));
          else break;
        }
      }
    }
    for (const a of n.pockets) this.registerPocket(a, t.id);
    ((t.t === "span" ||
      t.t === "vault" ||
      t.t === "rise" ||
      t.t === "anchor") &&
      this.emitGroundPockets(t),
      n.anchorTop && this.anchors.set(t.id, { top: new P(...n.anchorTop) }));
    const o = { action: t, result: n, meshes: s, navIds: r };
    return (this.structures.set(t.id, o), this.onStructureBuilt?.(t.id), o);
  }
  registerPocket(t, e) {
    const n = new P(...t.pos),
      s = this.nav.nearest(n, 14);
    let r = 1e9;
    for (const a of this.waterSources) r = Math.min(r, a.distanceTo(n));
    let o = null;
    for (const a of this.designations)
      Math.hypot(a.x - n.x, a.z - n.z) < a.r && (o = a.kind);
    this.pockets.push({
      ...t,
      idx: this.pockets.length,
      structId: e,
      navNode: s,
      occupiedBy: -1,
      waterDist: r,
      designation: o,
    });
  }
  emitGroundPockets(t) {
    const e = Je((t.id ?? 1) * 331 + 7),
      n = t.x ?? (t.ax + t.bx) / 2,
      s = t.z ?? (t.az + t.bz) / 2,
      r = 4 + Math.floor(e() * 3);
    for (let o = 0; o < r; o++) {
      const a = e() * Math.PI * 2,
        c = 10 + e() * 14,
        l = n + Math.sin(a) * c,
        h = s + Math.cos(a) * c;
      if (!Ir(l, h)) continue;
      const u = qt(l, h);
      this.pockets.some(
        (d) =>
          Math.hypot(d.pos[0] - l, d.pos[2] - h) < 7 &&
          Math.abs(d.pos[1] - u) < 3,
      ) ||
        this.registerPocket(
          {
            kind: "terrace_p",
            pos: [l, u, h],
            rotY: e() * Math.PI * 2,
            area: 30,
            height: 99,
            shelter: 0.1,
            light: 0.9,
            scenic: 0.3 + e() * 0.3,
          },
          t.id,
        );
    }
  }
  addDesignationMark(t) {
    const e = t.id ?? -1;
    if (this.desigMarks.has(e)) return;
    const n = new rn(),
      s = new gh({
        color: "#8f4a34",
        transparent: !0,
        opacity: 0.32,
        dashSize: 0.9,
        gapSize: 0.7,
      }),
      r = [];
    for (let l = 0; l <= 40; l++) {
      const h = (l / 40) * Math.PI * 2,
        u = t.x + Math.cos(h) * t.r * 0.85,
        d = t.z + Math.sin(h) * t.r * 0.85;
      r.push(new P(u, qt(u, d) + 0.35, d));
    }
    const o = new yr(new ve().setFromPoints(r), s);
    (o.computeLineDistances(), n.add(o));
    const a = qt(t.x + 1.5, t.z + 1.5),
      c = new he(
        Ul([
          (() => {
            const l = new le(0.14, 2.1, 0.14);
            return (l.translate(t.x + 1.5, a + 1.05, t.z + 1.5), l);
          })(),
          (() => {
            const l = new le(0.85, 0.6, 0.07);
            return (l.translate(t.x + 1.5, a + 1.75, t.z + 1.55), l);
          })(),
        ]),
        this.mats.timber,
      );
    ((c.castShadow = !0),
      n.add(c),
      this.infillGroup.add(n),
      this.desigMarks.set(e, n));
  }
  clearDesignationMarks() {
    for (const t of this.desigMarks.values())
      (t.parent?.remove(t),
        t.traverse((e) => {
          e.geometry?.dispose();
        }));
    this.desigMarks.clear();
  }
  seedGroundPockets(t, e, n, s, r, o = 55) {
    const a = Je(o);
    for (let c = 0; c < n; c++) {
      const l = (c / n) * Math.PI * 2 + a() * 0.7,
        h = s + a() * (r - s),
        u = t + Math.sin(l) * h,
        d = e + Math.cos(l) * h;
      if (!Ir(u, d)) continue;
      const f = qt(u, d);
      this.pockets.some(
        (m) =>
          Math.hypot(m.pos[0] - u, m.pos[2] - d) < 6.5 &&
          Math.abs(m.pos[1] - f) < 3,
      ) ||
        this.registerPocket(
          {
            kind: "terrace_p",
            pos: [u, f, d],
            rotY: l + Math.PI + (a() - 0.5) * 0.5,
            area: 30,
            height: 99,
            shelter: 0.12,
            light: 0.9,
            scenic: 0.3 + a() * 0.3,
          },
          -1,
        );
    }
  }
  rebuildStruct(t) {
    const e = this.structures.get(t);
    if (e) {
      for (const n of e.meshes) (n.parent?.remove(n), n.geometry.dispose());
      (this.nav.removeStruct(t),
        (this.pockets = this.pockets.filter((n) => n.structId !== t)),
        this.pockets.forEach((n, s) => {
          n.idx = s;
        }),
        this.structures.delete(t),
        this.buildStruct(e.action, !0));
    }
  }
  rebuildAll(t) {
    for (const e of this.structures.values())
      for (const n of e.meshes) (n.parent?.remove(n), n.geometry.dispose());
    for (const e of [...this.waterGroup.children]) this.waterGroup.remove(e);
    (this.structures.clear(),
      (this.pockets = []),
      this.anchors.clear(),
      (this.waterSources = [Vr.springPool.clone()]),
      (this.designations = []),
      this.clearDesignationMarks(),
      (this.nav = new Rl()),
      this.seedNav(),
      (this.actions = []));
    for (const e of t) this.applyAction(structuredClone(e));
  }
  raycastTargets() {
    return [this.terrainMesh, ...this.structGroup.children];
  }
  waterDistAt(t) {
    let e = 1e9;
    for (const n of this.waterSources) e = Math.min(e, n.distanceTo(t));
    return e;
  }
}
function Ul(i) {
  if (i.length === 1) return i[0];
  const t = { pos: 0 },
    e = i.map((c) => (c.index ? c.toNonIndexed() : c));
  for (const c of e) t.pos += c.attributes.position.count;
  const n = new Float32Array(t.pos * 3),
    s = new Float32Array(t.pos * 3),
    r = new Float32Array(t.pos * 2);
  let o = 0;
  for (const c of e) {
    Ue(c);
    const l = c.attributes.position.count;
    (n.set(c.attributes.position.array, o * 3),
      s.set(c.attributes.normal.array, o * 3),
      r.set(c.attributes.aTone.array, o * 2),
      (o += l),
      c.dispose());
  }
  const a = new ve();
  return (
    a.setAttribute("position", new pe(n, 3)),
    a.setAttribute("normal", new pe(s, 3)),
    a.setAttribute("aTone", new pe(r, 2)),
    a
  );
}
function A_(i, t, e) {
  const n = new P(...i),
    s = new P(...t),
    r = n.distanceTo(s),
    o = new le(r, 0.12, e);
  o.translate(r / 2, 0, 0);
  const a = s.clone().sub(n),
    c = Math.atan2(a.x, a.z) - Math.PI / 2,
    l = Math.atan2(a.y, Math.hypot(a.x, a.z));
  return (o.rotateZ(l), o.rotateY(c), o.translate(n.x, n.y, n.z), Ue(o), o);
}
const Th = 12,
  R_ = 31;
function Ah() {
  const i = [];
  return (
    i.push({
      t: "wall",
      id: Th,
      ax: -88,
      az: -44,
      bx: 30,
      bz: -44,
      h: 23,
      th: 3.2,
      age: 0.55,
      openings: [],
    }),
    i.push({
      t: "vault",
      id: 13,
      x: -38,
      z: -14,
      w: 21,
      l: 44,
      h: 15,
      rotY: 0.28,
      age: 0.6,
      ruin: 0.5,
    }),
    i.push({
      t: "anchor",
      id: 14,
      x: -2,
      z: -36,
      topY: 23.5,
      style: "giant",
      age: 0.5,
    }),
    i.push({
      t: "anchor",
      id: 15,
      x: -14,
      z: 34,
      topY: 13,
      style: "column",
      age: 0.4,
    }),
    i.push({
      t: "emb",
      id: 16,
      kind: "fountain",
      x: -22,
      y: 0,
      z: 28,
      rotY: 0,
    }),
    i.push({ t: "emb", id: 17, kind: "obelisk", x: 22, y: 0, z: 8, rotY: 0 }),
    i.push({
      t: "anchor",
      id: R_,
      x: 93,
      z: -8,
      topY: 30.2,
      style: "pier",
      age: 0.55,
    }),
    i.push({
      t: "span",
      id: 32,
      kind: "aqueduct",
      width: 4.2,
      ax: 118,
      ay: 30.8,
      az: -6,
      bx: 93,
      by: 30.2,
      bz: -8,
      age: 0.55,
    }),
    [
      [-44, 44],
      [-52, 38],
      [12, 44],
      [-70, 6],
      [-64, -30],
      [18, -28],
      [-36, -70],
      [-20, -76],
      [122, -22],
      [134, 4],
      [-90, 30],
      [-8, 62],
    ].forEach(([n, s], r) => {
      i.push({
        t: "emb",
        id: 40 + r,
        kind: "cypress",
        x: n,
        y: qt(n, s),
        z: s,
        rotY: r,
      });
    }),
    [
      [-28, 24],
      [-16, 22],
      [-26, 36],
      [-10, 30],
    ].forEach(([n, s], r) => {
      i.push({
        t: "emb",
        id: 60 + r,
        kind: "lantern",
        x: n,
        y: qt(n, s),
        z: s,
        rotY: 0,
      });
    }),
    i
  );
}
function C_(i) {
  const t = Je(991),
    e = Vr.springPool,
    n = new Fe(7.5, 7.5, 0.3, 22);
  (n.translate(e.x, e.y + 0.18, e.z),
    Ue(n),
    i.waterGroup.add(new he(n, i.mats.water)));
  const s = new Hr(7.8, 0.55, 6, 22);
  (s.rotateX(Math.PI / 2), s.translate(e.x, e.y + 0.35, e.z), Ue(s));
  const r = new he(s, i.mats.stoneOld);
  ((r.castShadow = !0), i.structGroup.add(r));
  const o = new le(26, 0.14, 1.6);
  (o.rotateY(Math.atan2(118 - e.x, -6 - e.z) - Math.PI / 2),
    o.translate((e.x + 118) / 2, e.y + 0.42, (e.z + -6) / 2),
    Ue(o),
    i.waterGroup.add(new he(o, i.mats.water)));
  const a = new P(93, 30.2, -8),
    c = new P(80, Ca + 1, -9),
    l = new Ai(2.4, a.y - c.y);
  (l.rotateY(Math.PI / 2 + 0.35),
    l.translate((a.x + c.x) / 2 - 3, (a.y + c.y) / 2, (a.z + c.z) / 2),
    Ue(l));
  const h = new he(l, i.mats.water);
  i.waterGroup.add(h);
  const u = [];
  for (let E = -140; E <= 140; E += 10) {
    const C = 60 + Math.sin(E * 0.011) * 7;
    u.push(new P(C, Ca + 0.8 + E * 0.012, E));
  }
  const d = new oh(u),
    f = new $a(d, 48, 2.4, 5);
  (f.scale(1, 0.08, 1), f.dispose());
  const m = D_(u, 4.2);
  (Ue(m), i.waterGroup.add(new he(m, i.mats.water)));
  const _ = [];
  for (let E = 0; E < 26; E++) _.push([-90 + t() * 130, -38 + t() * 130]);
  for (let E = 0; E < 8; E++) _.push([48 + t() * 26, -80 + t() * 160]);
  const g = [];
  for (const [E, C] of _) {
    const L = Pa(t);
    (L.rotateY(t() * Math.PI * 2),
      L.translate(E, qt(E, C) - 0.15, C),
      Ue(L, 1, 0.5),
      g.push(L));
  }
  for (let E = 0; E < 14; E++) {
    const C = t() * Math.PI * 2,
      L = 200 + t() * 80,
      y = Math.sin(C) * L,
      M = Math.cos(C) * L;
    if (y > 40 && y < 110) continue;
    const w = Pa(t);
    (w.scale(3 + t() * 4, 3.5 + t() * 5, 3 + t() * 4),
      w.translate(y, qt(y, M) - 1, M),
      Ue(w, 1, 0.6),
      g.push(w));
  }
  const p = Nl(g),
    A = new he(p, i.mats.stoneOld);
  ((A.castShadow = !0), (A.receiveShadow = !0), i.structGroup.add(A));
  const b = [
    [-232, 128, 0.9, 130, 44],
    [-168, -208, 2.3, 96, 38],
    [212, 176, -0.7, 110, 40],
  ];
  for (const [E, C, L, y, M] of b) {
    const w = Ji(y, M, 5, Math.max(3, Math.round(y / 22)), {
      rng: t,
      ruin: 0.55,
    });
    w.rotateY(L);
    const I = qt(E, C);
    (w.translate(E, I - 3, C), Ri(w, I - 3, I + 3, 0.9, 1, 0.6));
    const F = new he(w, i.mats.distant);
    ((F.castShadow = !1), (F.receiveShadow = !1), i.structGroup.add(F));
  }
  const v = [];
  for (let E = 0; E < 4; E++) {
    const C = nc(5 + t() * 3.5, t),
      L = e.x - 6 + t() * 12,
      y = e.z + 8 + t() * 6;
    (C.translate(L, qt(L, y), y), Ue(C), v.push(C));
  }
  const R = new he(Nl(v), i.mats.green);
  ((R.castShadow = !0), i.structGroup.add(R));
}
function P_(i) {
  const t = new ve(),
    e = new Float32Array([
      -0.9, 0, 0.25, 0, 0, 0, -0.75, 0.16, -0.2, 0.9, 0, 0.25, 0.75, 0.16, -0.2,
      0, 0, 0,
    ]);
  (t.setAttribute("position", new pe(e, 3)), t.computeVertexNormals());
  const n = new yi({ color: "#3a3226", side: _n, fog: !0 }),
    s = 11,
    r = new sh(t, n, s);
  ((r.frustumCulled = !1), i.scene.add(r));
  const o = [
      { cx: -30, cz: -20, cy: 42, r: 34 },
      { cx: 55, cz: 10, cy: 26, r: 40 },
    ],
    a = new Re(),
    c = [];
  for (let l = 0; l < s; l++) c.push(Math.random() * 100);
  return (l) => {
    for (let h = 0; h < s; h++) {
      const u = o[h % o.length],
        d = 0.09 + (h % 3) * 0.013,
        f = l * d + c[h];
      (a.position.set(
        u.cx + Math.sin(f) * (u.r + (h % 4) * 4),
        u.cy + Math.sin(f * 2.3 + c[h]) * 4 + (h % 5),
        u.cz + Math.cos(f) * (u.r + (h % 4) * 4),
      ),
        a.rotation.set(0, f + Math.PI / 2, 0));
      const m = 0.6 + Math.abs(Math.sin(l * 7 + c[h])) * 0.55;
      (a.scale.set(1.1, m, 1.1), a.updateMatrix(), r.setMatrixAt(h, a.matrix));
    }
    r.instanceMatrix.needsUpdate = !0;
  };
}
function Nl(i) {
  let t = 0;
  const e = i.map((c) => (c.index ? c.toNonIndexed() : c));
  for (const c of e) t += c.attributes.position.count;
  const n = new Float32Array(t * 3),
    s = new Float32Array(t * 3),
    r = new Float32Array(t * 2);
  let o = 0;
  for (const c of e)
    (Ue(c),
      n.set(c.attributes.position.array, o * 3),
      s.set(c.attributes.normal.array, o * 3),
      r.set(c.attributes.aTone.array, o * 2),
      (o += c.attributes.position.count),
      c.dispose());
  const a = new ve();
  return (
    a.setAttribute("position", new pe(n, 3)),
    a.setAttribute("normal", new pe(s, 3)),
    a.setAttribute("aTone", new pe(r, 2)),
    a
  );
}
function D_(i, t) {
  const e = [],
    n = [];
  for (let r = 0; r < i.length - 1; r++) {
    const o = i[r],
      a = i[r + 1],
      c = a.clone().sub(o).normalize(),
      l = new P(c.z, 0, -c.x).multiplyScalar(t / 2),
      h = o.clone().add(l),
      u = o.clone().sub(l),
      d = a.clone().add(l),
      f = a.clone().sub(l);
    (e.push(h.x, h.y, h.z, d.x, d.y, d.z, u.x, u.y, u.z),
      e.push(u.x, u.y, u.z, d.x, d.y, d.z, f.x, f.y, f.z));
    for (let m = 0; m < 6; m++) n.push(0, 1, 0);
  }
  const s = new ve();
  return (
    s.setAttribute("position", new pe(new Float32Array(e), 3)),
    s.setAttribute("normal", new pe(new Float32Array(n), 3)),
    s
  );
}
const L_ = 7;
class I_ {
  constructor(t) {
    K(this, "world");
    K(this, "items", []);
    K(this, "counters", new Map());
    K(this, "capacity", 0);
    this.world = t;
  }
  grow(t, e) {
    for (const o of this.items)
      o.stage < 1 &&
        ((o.stage = Math.min(1, o.stage + (1 / L_) * 0.12)),
        (o.building.scale.y = 0.18 + o.stage * 0.82),
        o.stage >= 1 && this.finish(o));
    if (
      this.items.filter((o) => o.stage < 1).length >= 2 ||
      e <= this.items.length * 0.9
    )
      return;
    const s = this.pickPocket();
    if (!s) return;
    const r = this.chooseKind(s);
    this.spawn(s, r);
  }
  pickPocket() {
    let t = null,
      e = -1;
    for (const n of this.world.pockets) {
      if (n.occupiedBy >= 0 || n.navNode < 0) continue;
      let s = 0;
      for (const a of this.items) {
        const c = this.world.pockets[a.pocketIdx];
        if (!c) continue;
        const l = Math.hypot(c.pos[0] - n.pos[0], c.pos[2] - n.pos[2]);
        l < 40 && (s += Xe(1 - l / 40, 0, 1));
      }
      const r = Math.hypot(n.pos[0] + 18, n.pos[2] - 28),
        o =
          n.shelter * 1.2 +
          n.light * 0.5 +
          n.scenic * 0.4 +
          Xe(s, 0, 3) * 0.8 +
          Xe(1 - r / 130, 0, 1) * 1.4 +
          (n.waterDist < 45 ? 0.9 : n.waterDist < 90 ? 0.3 : 0) +
          (n.designation ? 2.4 : 0) +
          (n.kind === "under_arch" ? 0.5 : 0);
      o > e && ((e = o), (t = n));
    }
    return e > 1.6 ? t : null;
  }
  chooseKind(t) {
    if (t.designation === "garden") return "garden";
    if (t.designation === "trade") return "stall";
    if (t.designation === "dwelling") return "house";
    if (t.designation === "gathering") return "shrine";
    const e = Je(Ra(t.structId + ":" + t.idx));
    return t.kind === "niche"
      ? "shrine"
      : t.kind === "deck"
        ? e() < 0.5 && t.waterDist < 60
          ? "garden"
          : "house"
        : t.kind === "under_arch"
          ? e() < 0.45
            ? "stall"
            : e() < 0.5
              ? "workshop"
              : "house"
          : t.kind === "interior"
            ? e() < 0.55
              ? "stall"
              : "shrine"
            : t.light > 0.7 && t.waterDist < 50 && e() < 0.3
              ? "garden"
              : e() < 0.75
                ? "house"
                : "workshop";
  }
  spawn(t, e, n = !1) {
    const s = `${t.structId}:${e}`,
      r = (this.counters.get(s) ?? 0) + 1;
    this.counters.set(s, r);
    const o = `${s}:${r}`,
      a = Je(Ra(o)),
      c = new rn(),
      l = new rn();
    c.add(l);
    const h = [];
    (N_(this.world, l, h, t, e, a),
      c.position.set(t.pos[0], t.pos[1], t.pos[2]),
      (c.rotation.y = t.rotY + (a() - 0.5) * 0.4),
      this.world.infillGroup.add(c));
    let u = null;
    n || ((u = U_(this.world, e, a)), c.add(u), (l.scale.y = 0.18));
    const d = {
      key: o,
      pocketIdx: t.idx,
      kind: e,
      stage: n ? 1 : 0.02,
      group: c,
      building: l,
      scaffold: u,
      windows: h,
    };
    return (
      (t.occupiedBy = this.items.length),
      this.items.push(d),
      n && this.finish(d),
      d
    );
  }
  finish(t) {
    ((t.building.scale.y = 1),
      t.scaffold &&
        (t.scaffold.parent?.remove(t.scaffold),
        t.scaffold.traverse((n) => {
          n.geometry && n.geometry.dispose();
        }),
        (t.scaffold = null)));
    const e = this.world.pockets[t.pocketIdx];
    ((this.capacity =
      this.items.filter((n) => n.stage >= 1 && n.kind === "house").length * 4 +
      8),
      e &&
        t.kind === "garden" &&
        this.world.waterSources.push(new P(...e.pos)));
  }
  serialize() {
    return this.items.map((t) => ({
      key: t.key,
      kind: t.kind,
      stage: t.stage,
      pocketIdx: t.pocketIdx,
    }));
  }
  restore(t, e) {
    for (const n of t) {
      const s = e(n.key);
      if (!s || s.occupiedBy >= 0) continue;
      const r = this.spawn(s, n.kind, n.stage >= 1);
      ((r.stage = n.stage),
        n.stage < 1 && (r.building.scale.y = 0.18 + n.stage * 0.82));
    }
  }
  clear() {
    for (const t of this.items)
      (t.group.parent?.remove(t.group),
        t.group.traverse((e) => {
          e.geometry && e.geometry.dispose();
        }));
    ((this.items = []), this.counters.clear(), (this.capacity = 0));
  }
}
function U_(i, t, e) {
  const n = new rn(),
    s = t === "house" || t === "workshop" ? 5.4 : 3.6,
    r = t === "house" || t === "workshop" ? 4.6 : 3,
    o = t === "garden" ? 1.6 : 3.6 + e() * 1.2,
    a = new oe(0);
  for (const h of [-1, 1])
    for (const u of [-1, 1])
      a.box(0.11, o, 0.11, [(h * s) / 2, 0, (u * r) / 2]);
  (a.box(s, 0.09, 0.09, [0, o * 0.55, -r / 2]),
    a.box(s, 0.09, 0.09, [0, o * 0.55, r / 2]),
    a.box(0.09, 0.09, r, [-s / 2, o * 0.55, 0]));
  const c = new le(Math.hypot(s, o * 0.55) * 0.96, 0.08, 0.08);
  (c.rotateZ(Math.atan2(o * 0.55, s)),
    c.translate(0, o * 0.28, r / 2 + 0.02),
    a.addRaw(c),
    a.box(s * 0.9, 0.07, 0.8, [0, o * 0.56, r / 2 - 0.5]));
  const l = new he(a.merge(), i.mats.timber);
  return ((l.castShadow = !0), n.add(l), n);
}
function N_(i, t, e, n, s, r) {
  const o = i.mats,
    a = (l, h, u = !0) => {
      Ue(l);
      const d = new he(l, h);
      return ((d.castShadow = u), (d.receiveShadow = !0), t.add(d), d);
    },
    c = i.glowMat;
  if (s === "house") {
    const l = 3.6 + r() * 1.6,
      h = 3 + r() * 1.2,
      u = 2.7 + r() * 1.1,
      d = n.height > 7 && r() < 0.45,
      f = new oe(0.05);
    (f.box(l, u, h, [0, 0, 0]),
      d && f.box(l * 0.86, u * 0.85, h * 0.86, [0.1, u, -0.05]),
      a(f.merge(), r() < 0.4 ? o.plaster : o.timber));
    const m = Il(l * (d ? 0.9 : 1), h * (d ? 0.9 : 1), 1.1 + r() * 0.4);
    (m.translate(0.05, d ? u * 1.85 : u, 0), a(m, o.timber));
    const _ = new le(0.9, 1.8, 0.12);
    (_.translate(l * 0.15, 0.9, h / 2 + 0.03), a(_, o.fabric, !1));
    const g = d ? 3 : 2;
    for (let p = 0; p < g; p++) {
      const A = new le(0.55, 0.7, 0.1);
      (A.translate(
        -l / 2 + 0.8 + (p * (l - 1.4)) / Math.max(1, g - 1),
        p < 2 ? 1.6 : u + 1.4,
        h / 2 + 0.04,
      ),
        e.push(a(A, c, !1)));
    }
    if (r() < 0.4) {
      const p = new le(2.4, 0.03, 0.03);
      (p.translate(l / 2 + 1.1, u * 0.8, 0), a(p, o.timber, !1));
      for (let A = 0; A < 3; A++) {
        const b = new le(0.3, 0.4, 0.02);
        (b.translate(l / 2 + 0.5 + A * 0.7, u * 0.8 - 0.22, 0),
          a(b, A === 1 ? o.fabric : o.plaster, !1));
      }
    }
  } else if (s === "stall") {
    const l = 2.6 + r() * 1.2,
      h = new oe(0);
    for (const f of [-1, 1])
      for (const m of [-1, 1])
        h.box(0.14, 2.3, 0.14, [f * l * 0.45, 0, m * 0.9]);
    (h.box(l, 0.75, 1.7, [0, 0.05, 0]), a(h.merge(), o.timber));
    const u = new le(l + 0.5, 0.08, 2.3);
    (u.rotateZ((r() - 0.5) * 0.06),
      u.rotateX(-0.18),
      u.translate(0, 2.35, 0.25),
      a(u, o.fabric, !0));
    for (let f = 0; f < 3; f++) {
      const m = new le(0.4 + r() * 0.3, 0.3 + r() * 0.25, 0.35);
      (m.translate(-l * 0.3 + f * l * 0.3, 0.95, 0.2 - r() * 0.4),
        a(m, f === 1 ? o.green : o.plaster, !1));
    }
    const d = new le(0.24, 0.3, 0.24);
    (d.translate(l * 0.4, 2.1, 0.8), e.push(a(d, c, !1)));
  } else if (s === "garden") {
    const l = new oe(0.1);
    (l.box(3.4, 0.35, 2.4, [0, 0, 0]),
      l.box(2.8, 0.3, 2, [0.4, 0, 2.9]),
      a(l.merge(), o.stoneOld));
    const h = new le(3, 0.5, 2);
    (h.translate(0, 0.4, 0), a(h, o.green, !1));
    const u = new le(2.4, 0.45, 1.6);
    (u.translate(0.4, 0.35, 2.9), a(u, o.green, !1));
    const d = nc(2.8 + r() * 1.8, r);
    (d.translate(-1.8, 0, 1.4), a(d, o.green));
    const f = new oe(0);
    (f.box(0.1, 2.2, 0.1, [1.8, 0, -0.9]),
      f.box(0.1, 2.2, 0.1, [1.8, 0, 0.9]),
      f.box(0.12, 0.12, 2, [1.8, 2.2, 0]),
      a(f.merge(), o.timber));
  } else if (s === "shrine") {
    const l = new oe(0.15);
    (l.box(1.7, 0.5, 1.4, [0, 0, 0]),
      l.box(0.24, 2, 0.24, [-0.6, 0.5, -0.45]),
      l.box(0.24, 2, 0.24, [0.6, 0.5, -0.45]),
      l.box(0.24, 2, 0.24, [-0.6, 0.5, 0.45]),
      l.box(0.24, 2, 0.24, [0.6, 0.5, 0.45]),
      l.box(1.8, 0.4, 1.5, [0, 2.5, 0]),
      a(l.merge(), o.stone));
    const h = new Fe(0.16, 0.22, 1.1, 7);
    (h.translate(0, 1.1, 0), a(h, o.gold, !1));
    const u = new le(0.2, 0.26, 0.2);
    (u.translate(0.55, 0.65, 0.3), e.push(a(u, c, !1)));
  } else {
    const l = 3.8 + r() * 1.4,
      h = new oe(0.08);
    (h.box(l, 3, 3.4, [0, 0, 0]), a(h.merge(), o.stoneOld));
    const u = Il(l, 3.4, 0.9);
    (u.translate(0, 3, 0), a(u, o.timber));
    const d = new le(0.5, 1.8, 0.5);
    (d.translate(l * 0.3, 3.4, -0.8), a(d, o.stoneOld));
    const f = new le(2.2, 0.08, 1.8);
    (f.rotateX(-0.15), f.translate(-l / 2 - 1, 2.3, 0.4), a(f, o.fabric));
    const m = new le(0.7, 0.6, 0.1);
    (m.translate(0, 1.7, 1.75), e.push(a(m, c, !1)));
  }
}
const Co = 132;
class F_ {
  constructor(t, e, n) {
    K(this, "world");
    K(this, "infill");
    K(this, "meshes");
    K(this, "agents", []);
    K(this, "population", 16);
    K(this, "dummy", new Re());
    ((this.world = t), (this.infill = e));
    const s = t.mats.figure;
    this.meshes = [Po(0), Po(1), Po(2)].map((r) => {
      const o = new sh(r, s, Co);
      return (
        o.instanceMatrix.setUsage(Lu),
        (o.castShadow = !0),
        (o.count = 0),
        (o.frustumCulled = !1),
        n.add(o),
        o
      );
    });
    for (let r = 0; r < Co; r++)
      this.agents.push({
        active: !1,
        pos: new P(),
        path: [],
        seg: 0,
        segT: 0,
        speed: 1.15 + Math.random() * 0.5,
        state: "home",
        homeNode: -1,
        workNode: -1,
        offset: Math.random() * 1.6 - 0.8,
        bob: Math.random() * 7,
      });
  }
  spawnPoints() {
    const t = [];
    for (const e of this.infill.items) {
      if (e.kind !== "house" || e.stage < 1) continue;
      const n = this.world.pockets[e.pocketIdx];
      n && n.navNode >= 0 && t.push(n.navNode);
    }
    return t;
  }
  workPoints() {
    const t = [];
    for (const e of this.infill.items)
      if (
        (e.kind === "stall" || e.kind === "workshop" || e.kind === "garden") &&
        e.stage >= 1
      ) {
        const n = this.world.pockets[e.pocketIdx];
        n && n.navNode >= 0 && t.push(n.navNode);
      }
    return t;
  }
  gatherPoints() {
    const t = [],
      e = this.world.nav.nearest(new P(-18, 0, 28), 20);
    e >= 0 && t.push(e);
    for (const n of this.world.pockets)
      (n.scenic > 0.7 && n.navNode >= 0 && t.push(n.navNode),
        n.designation === "gathering" && n.navNode >= 0 && t.push(n.navNode));
    return t;
  }
  sync() {
    this.population = Math.min(Co, 14 + this.infill.capacity);
    const t = this.spawnPoints(),
      e = this.workPoints(),
      n = Je(777);
    for (let s = 0; s < this.agents.length; s++) {
      const r = this.agents[s],
        o = s < this.population;
      if (o && !r.active) {
        r.active = !0;
        const a = t.length
          ? t[s % t.length]
          : this.world.nav.nearest(
              new P(-18 + n() * 24 - 12, 0, 28 + n() * 20 - 10),
              30,
            );
        ((r.homeNode = a),
          (r.workNode = e.length ? e[(s * 7) % e.length] : a),
          a >= 0 && r.pos.copy(this.world.nav.nodes[a].p),
          (r.state = "home"),
          (r.path = []));
      } else o || (r.active = !1);
    }
  }
  goto(t, e) {
    if (e < 0) return;
    const n = this.world.nav.nearest(t.pos, 16);
    if (n < 0) return;
    const s = this.world.nav.path(n, e);
    s.length < 2 ||
      ((t.path = s.map((r) => this.world.nav.nodes[r].p.clone())),
      (t.seg = 0),
      (t.segT = 0));
  }
  update(t, e) {
    const n = this.workPoints(),
      s = this.gatherPoints(),
      r = Math.random,
      o = [0, 0, 0];
    let a = -1;
    for (const c of this.agents) {
      if ((a++, !c.active)) continue;
      const l = a % 3,
        h = this.meshes[l],
        u = o[l],
        d = e + c.offset;
      if (c.path.length === 0) {
        if (d > 7.4 && d < 11 && c.state === "home")
          ((c.state = "towork"),
            this.goto(
              c,
              c.workNode >= 0
                ? c.workNode
                : n.length
                  ? n[(u * 3) % n.length]
                  : c.homeNode,
            ));
        else if (d > 12 && d < 16.6 && c.state === "work" && r() < t * 0.02) {
          c.state = "wander";
          const f = s.length ? s[Math.floor(r() * s.length)] : c.homeNode;
          this.goto(c, f);
        } else if (
          d > 16.8 &&
          d < 19.4 &&
          (c.state === "work" || c.state === "wander")
        ) {
          c.state = "gather";
          const f = s.length ? s[Math.floor(r() * s.length)] : c.homeNode;
          this.goto(c, f);
        } else if (
          (d > 19.6 || d < 6) &&
          c.state !== "home" &&
          c.state !== "tohome"
        )
          ((c.state = "tohome"), this.goto(c, c.homeNode));
        else if (c.state === "towork") c.state = "work";
        else if (c.state === "tohome") c.state = "home";
        else if (r() < t * 0.004) {
          const f = this.world.nav.nearest(c.pos, 14);
          if (f >= 0) {
            const m = [...this.world.nav.nodes[f].links.keys()];
            m.length && this.goto(c, m[Math.floor(r() * m.length)]);
          }
        }
      }
      if (c.path.length >= 2) {
        const f = c.path[c.seg],
          m = c.path[c.seg + 1],
          _ = f.distanceTo(m);
        ((c.segT += (c.speed * t) / Math.max(_, 0.01)),
          c.segT >= 1
            ? (c.seg++,
              (c.segT = 0),
              c.seg >= c.path.length - 1 &&
                (c.pos.copy(c.path[c.path.length - 1]), (c.path = [])))
            : c.pos.lerpVectors(f, m, c.segT));
      }
      if (
        ((c.bob += t * (c.path.length ? 9 : 1.2)),
        this.dummy.position.copy(c.pos),
        c.path.length ||
          ((this.dummy.position.x += Math.sin(c.offset * 37.7) * 2.1),
          (this.dummy.position.z += Math.cos(c.offset * 51.3) * 2.1)),
        (this.dummy.position.y += c.path.length
          ? Math.abs(Math.sin(c.bob)) * 0.06
          : 0),
        c.path.length >= 2)
      ) {
        const f = c.path[Math.min(c.seg + 1, c.path.length - 1)];
        this.dummy.lookAt(f.x, this.dummy.position.y, f.z);
      } else this.dummy.rotation.set(0, c.offset * 23.1, 0);
      (this.dummy.updateMatrix(),
        h.setMatrixAt(u, this.dummy.matrix),
        (o[l] = u + 1));
    }
    for (let c = 0; c < 3; c++)
      ((this.meshes[c].count = o[c]),
        (this.meshes[c].instanceMatrix.needsUpdate = !0));
  }
}
function Po(i) {
  const t = [],
    e = new Fe(0.14, 0.26, 1.32, 7);
  e.translate(0, 0.66, 0);
  const n = new Pr(0.13, 7, 6);
  n.translate(0, 1.46, 0);
  const s = new Fe(0.19, 0.14, 0.3, 7);
  if ((s.translate(0, 1.25, 0), t.push(e, s, n), i === 1)) {
    const r = new Fe(0.025, 0.03, 1.8, 5);
    (r.rotateX(0.12), r.translate(0.24, 0.9, 0.1), t.push(r));
    const o = new Fe(0.05, 0.06, 0.45, 5);
    (o.rotateZ(-1.1), o.translate(0.16, 1.18, 0.06), t.push(o));
  } else if (i === 2) {
    const r = new Fe(0.045, 0.06, 0.62, 5);
    (r.rotateZ(-1.35),
      r.rotateY(0.2),
      r.translate(0.3, 1.32, 0.05),
      t.push(r),
      e.rotateZ(-0.06));
    const o = new Pr(0.14, 6, 5);
    (o.scale(1, 0.75, 1), o.translate(-0.2, 0.82, 0), t.push(o));
  } else {
    const r = new ls(0.17, 0.34, 7);
    (r.translate(0, 1.52, -0.02), t.push(r));
  }
  return O_(t);
}
function O_(i) {
  let t = 0;
  const e = i.map((a) => a.toNonIndexed());
  for (const a of e) t += a.attributes.position.count;
  const n = new Float32Array(t * 3),
    s = new Float32Array(t * 3);
  let r = 0;
  for (const a of e)
    (n.set(a.attributes.position.array, r * 3),
      s.set(a.attributes.normal.array, r * 3),
      (r += a.attributes.position.count),
      a.dispose());
  const o = new ve();
  return (
    o.setAttribute("position", new pe(n, 3)),
    o.setAttribute("normal", new pe(s, 3)),
    o
  );
}
const z_ = ["Lantern", "Ember", "Candle"],
  k_ = ["Cistern", "Spring", "Well"],
  B_ = ["Garden", "Laurel", "Green"],
  H_ = ["Quiet", "Sleeping", "Patient"],
  G_ = ["Bright", "Morning", "White"];
function Rh(i, t) {
  const e = t.items.filter((c) => c.stage >= 1);
  if (e.length < 2) return [];
  const n = e.map((c, l) => l),
    s = (c) => (n[c] === c ? c : (n[c] = s(n[c]))),
    r = (c, l) => {
      n[s(c)] = s(l);
    };
  for (let c = 0; c < e.length; c++) {
    const l = i.pockets[e[c].pocketIdx];
    if (l)
      for (let h = c + 1; h < e.length; h++) {
        const u = i.pockets[e[h].pocketIdx];
        if (!u) continue;
        Math.hypot(l.pos[0] - u.pos[0], l.pos[2] - u.pos[2]) +
          Math.abs(l.pos[1] - u.pos[1]) * 1.5 <
          26 && r(c, h);
      }
  }
  const o = new Map();
  for (let c = 0; c < e.length; c++) {
    const l = s(c);
    let h = o.get(l);
    (h || ((h = []), o.set(l, h)), h.push(c));
  }
  const a = [];
  for (const c of o.values()) {
    if (c.length < 3) continue;
    let l = 0,
      h = 0,
      u = 0;
    const d = new Map();
    let f = 0,
      m = 0,
      _ = 0,
      g = 0;
    for (const R of c) {
      const E = e[R],
        C = i.pockets[E.pocketIdx];
      ((l += C.pos[0]),
        (h += C.pos[1]),
        (u += C.pos[2]),
        d.set(C.kind, (d.get(C.kind) ?? 0) + 1),
        E.kind === "garden" && m++,
        C.waterDist < 35 && _++,
        C.light < 0.5 && g++);
    }
    ((l /= c.length), (h /= c.length), (u /= c.length));
    for (const R of i.actions)
      R.t === "emb" &&
        R.kind === "lantern" &&
        Math.hypot(R.x - l, R.z - u) < 24 &&
        f++;
    const p = Je(Ra(`d${Math.round(l)}:${Math.round(u)}`)),
      A = [...d.entries()].sort((R, E) => E[1] - R[1])[0][0];
    let b = "Quarter";
    A === "under_arch"
      ? (b = "Undercroft")
      : A === "landing"
        ? (b = "Stairs")
        : A === "interior"
          ? (b = "Vaults")
          : A === "deck"
            ? (b = h > 12 ? "High Row" : "Bridge Row")
            : h > 14 && (b = "Terrace");
    let v = H_;
    (f >= 2
      ? (v = z_)
      : m >= 2
        ? (v = B_)
        : _ > c.length / 2
          ? (v = k_)
          : g < c.length / 3 && (v = G_),
      a.push({
        name: `The ${r_(p, v)} ${b}`,
        x: l,
        y: h + 7,
        z: u,
        size: c.length,
      }));
  }
  return (a.sort((c, l) => l.size - c.size), a.slice(0, 7));
}
const yt = {
  res: { stone: 700, timber: 160, favor: 12 },
  playerActions: [],
  nextId: 1e3,
  plates: [],
  cityName: "CAPRICCIO",
  doneRequests: new Set(),
  dirty: !1,
  folio: !1,
};
function V_(i) {
  ((yt.res.stone = Math.min(2600, yt.res.stone + i * 18)),
    (yt.res.timber = Math.min(900, yt.res.timber + i * 6)));
}
function Fl(i) {
  return yt.folio
    ? !0
    : yt.res.stone >= i.stone && yt.res.timber >= (i.timber || 0);
}
function W_(i) {
  yt.folio ||
    ((yt.res.stone -= i.stone),
    (yt.res.timber -= i.timber || 0),
    (yt.dirty = !0));
}
function X_() {
  return yt.folio
    ? 160
    : yt.res.favor >= 150
      ? 150
      : yt.res.favor >= 60
        ? 95
        : 55;
}
const Ch = "capriccio-save-v1";
function q_(i) {
  const t = {
    v: 1,
    actions: yt.playerActions,
    day: i.day,
    hour: i.hour,
    res: yt.res,
    infill: i.infill,
    plates: yt.plates.slice(-16),
    cityName: yt.cityName,
    doneRequests: [...yt.doneRequests],
    folio: yt.folio,
  };
  try {
    localStorage.setItem(Ch, JSON.stringify(t));
  } catch {}
  yt.dirty = !1;
}
function Y_() {
  try {
    const i = localStorage.getItem(Ch);
    if (!i) return null;
    const t = JSON.parse(i);
    return t.v !== 1 ? null : t;
  } catch {
    return null;
  }
}
const La = {
    anchor: [
      { key: "pier", label: "Pier", hint: "a stout foundation for spans" },
      {
        key: "giant",
        label: "Giant Pier",
        hint: "colossal — its base becomes a place",
      },
      { key: "column", label: "Column", hint: "a slender commemorative shaft" },
    ],
    span: [
      {
        key: "bridge",
        label: "Bridge",
        hint: "an open crossing on great arches",
      },
      {
        key: "aqueduct",
        label: "Aqueduct",
        hint: "carries water along its back",
      },
      { key: "arcade", label: "Gallery", hint: "a roofed colonnade crossing" },
    ],
    rise: [
      { key: "direct", label: "Stair", hint: "the shortest honest climb" },
      {
        key: "ceremonial",
        label: "Ceremonial",
        hint: "broad, slow, magnificent",
      },
      {
        key: "switchback",
        label: "Switchback",
        hint: "folds up the steep face",
      },
    ],
    vault: [
      {
        key: "court",
        label: "Cloister Hall",
        hint: "intimate — 14 by 20 paces",
      },
      { key: "market", label: "Market Hall", hint: "roomy — 18 by 34 paces" },
      { key: "basilica", label: "Basilica", hint: "vast — 22 by 52 paces" },
    ],
    carve: [
      {
        key: "door",
        label: "Passage",
        hint: "an arched way through wall or pier",
      },
      {
        key: "gate",
        label: "Great Gate",
        hint: "ceremonial breach, 8 paces wide",
      },
    ],
    emb: [
      { key: "statue", label: "Statue", hint: "a gilded figure on a plinth" },
      { key: "fountain", label: "Fountain", hint: "water for a neighborhood" },
      { key: "lantern", label: "Lantern", hint: "warm light after dusk" },
      { key: "cypress", label: "Cypress", hint: "a dark green flame" },
    ],
    designate: [
      { key: "dwelling", label: "Dwelling", hint: "invite homes here" },
      { key: "trade", label: "Trade", hint: "invite stalls and shops" },
      { key: "garden", label: "Garden", hint: "invite green things" },
      { key: "gathering", label: "Gathering", hint: "invite idle evenings" },
    ],
  },
  pr = {
    court: { w: 13, h: 9 },
    market: { w: 17, h: 12 },
    basilica: { w: 22, h: 17 },
  };
class K_ {
  constructor(t) {
    K(this, "marks", new rn());
    K(this, "live", new rn());
    K(this, "dashMat");
    K(this, "stringMat");
    (t.add(this.marks, this.live),
      (this.dashMat = new gh({
        color: "#8f4a34",
        transparent: !0,
        opacity: 0.6,
        dashSize: 0.6,
        gapSize: 0.45,
      })),
      (this.stringMat = new Ya({
        color: "#6d3f2e",
        transparent: !0,
        opacity: 0.65,
      })));
  }
  dashedLine(t) {
    const e = new ve().setFromPoints(t),
      n = new yr(e, this.dashMat);
    return (n.computeLineDistances(), n);
  }
  clearMarks() {
    Ol(this.marks);
  }
  clearLive() {
    Ol(this.live);
  }
  markCarvables(t) {
    this.clearMarks();
    for (const [, e] of t.structures)
      if (e.action.t === "wall") {
        const n = e.action,
          s = Math.hypot(n.bx - n.ax, n.bz - n.az),
          r = (n.bx - n.ax) / s,
          o = (n.bz - n.az) / s,
          a = Math.cos(Math.atan2(r, o)),
          c = -Math.sin(Math.atan2(r, o));
        for (const l of [-1, 1]) {
          const h = [];
          for (let u = 2; u <= s - 2; u += 5) {
            const d = n.ax + r * u + a * l * (n.th / 2 + 0.3),
              f = n.az + o * u + c * l * (n.th / 2 + 0.3);
            h.push(new P(d, qt(d, f) + 1.35, f));
          }
          h.length > 1 && this.marks.add(this.dashedLine(h));
        }
      } else if (
        e.action.t === "anchor" &&
        e.action.style === "giant" &&
        !e.action.carveAxis
      ) {
        const n = e.action,
          s = 5.2,
          r = [];
        for (const [o, a] of [
          [-s, -s],
          [s, -s],
          [s, s],
          [-s, s],
          [-s, -s],
        ])
          r.push(new P(n.x + o, qt(n.x + o, n.z + a) + 1.35, n.z + a));
        this.marks.add(this.dashedLine(r));
      }
  }
  markAnchors(t) {
    this.clearMarks();
    for (const [, e] of t.anchors) {
      const n = [];
      for (let s = 0; s <= 26; s++) {
        const r = (s / 26) * Math.PI * 2;
        n.push(
          new P(
            e.top.x + Math.cos(r) * 2.6,
            e.top.y + 0.25,
            e.top.z + Math.sin(r) * 2.6,
          ),
        );
      }
      (this.marks.add(this.dashedLine(n)),
        this.marks.add(
          this.dashedLine([
            e.top.clone().add(new P(0, 0.25, 0)),
            e.top.clone().add(new P(0, 2.6, 0)),
          ]),
        ));
    }
  }
  string(t, e) {
    this.clearLive();
    const n = new ve().setFromPoints([
      t.clone().add(new P(0, 0.6, 0)),
      e.clone().add(new P(0, 0.6, 0)),
    ]);
    this.live.add(new yr(n, this.stringMat));
  }
  footprint(t, e, n, s, r) {
    this.clearLive();
    const o = Math.hypot(n - t, s - e);
    if (o < 2) return;
    const a = (n - t) / o,
      l = (s - e) / o,
      h = -a,
      u = [
        [t + (l * r) / 2, e + (h * r) / 2],
        [n + (l * r) / 2, s + (h * r) / 2],
        [n - (l * r) / 2, s - (h * r) / 2],
        [t - (l * r) / 2, e - (h * r) / 2],
      ],
      d = [];
    for (let m = 0; m <= 4; m++) {
      const [_, g] = u[m % 4];
      d.push(new P(_, qt(_, g) + 0.45, g));
    }
    this.live.add(this.dashedLine(d));
    const f = new ve().setFromPoints([
      new P(t, qt(t, e) + 0.5, e),
      new P(n, qt(n, s) + 0.5, s),
    ]);
    this.live.add(new yr(f, this.stringMat));
  }
}
function Ol(i) {
  for (const t of [...i.children]) (i.remove(t), t.geometry?.dispose());
}
class Z_ {
  constructor(t, e, n) {
    K(this, "world");
    K(this, "camera");
    K(this, "scene");
    K(this, "tool", null);
    K(this, "variant", "");
    K(this, "stage", 0);
    K(this, "firstPoint", null);
    K(this, "firstAnchor", -1);
    K(this, "ghost", null);
    K(this, "ghostOk", !0);
    K(this, "marker");
    K(this, "ray", new vh());
    K(this, "onCommit", null);
    K(this, "onMessage", null);
    K(this, "lastHover", null);
    K(this, "lastGhostAt", 0);
    K(this, "ghostMat");
    K(this, "ghostBadMat");
    K(this, "chalk");
    ((this.world = t),
      (this.camera = e),
      (this.scene = n),
      (this.ghostMat = t.mats.ghost),
      (this.ghostBadMat = t.mats.ghostBad));
    const s = new Fe(0.8, 0.8, 0.35, 16);
    ((this.marker = new he(s, this.ghostMat)),
      (this.marker.visible = !1),
      n.add(this.marker),
      (this.chalk = new K_(n)));
  }
  setTool(t, e) {
    ((this.tool = t),
      (this.variant = e ?? (t ? La[t][0].key : "")),
      this.reset(),
      this.chalk.clearMarks(),
      t === "carve" && this.chalk.markCarvables(this.world),
      (t === "span" || t === "rise") && this.chalk.markAnchors(this.world));
  }
  reset() {
    ((this.stage = 0),
      (this.firstPoint = null),
      (this.firstAnchor = -1),
      this.clearGhost(),
      this.chalk.clearLive(),
      (this.marker.visible = this.tool !== null));
  }
  clearGhost() {
    this.ghost &&
      (this.ghost.parent?.remove(this.ghost),
      this.ghost.geometry.dispose(),
      (this.ghost = null));
  }
  pick(t) {
    this.ray.setFromCamera(t, this.camera);
    const e = this.ray.intersectObjects(this.world.raycastTargets(), !1);
    if (!e.length) return null;
    const n = e[0],
      s = n.point.clone(),
      r = n.object.userData.structId ?? -1;
    let o = -1,
      a = 7;
    for (const [c, l] of this.world.anchors) {
      const h = l.top.distanceTo(s),
        u = Math.hypot(l.top.x - s.x, l.top.z - s.z);
      u < 6 && h < 26 && u < a && ((a = u), (o = c));
    }
    return { p: s, anchorId: o, structId: r };
  }
  hover(t) {
    if (!this.tool) {
      this.marker.visible = !1;
      return;
    }
    const e = this.pick(t);
    if (!e) {
      ((this.marker.visible = !1), this.clearGhost(), this.chalk.clearLive());
      return;
    }
    let n = e.p;
    (e.anchorId >= 0 &&
      (this.tool === "span" || this.tool === "rise") &&
      (n = this.world.anchors.get(e.anchorId).top.clone()),
      (this.lastHover = n.clone()),
      this.marker.position.copy(n),
      (this.marker.visible = !0));
    let s = !1;
    if (this.tool === "carve") {
      const a =
        e.structId >= 0
          ? this.world.structures.get(e.structId)?.action
          : void 0;
      s = !(
        a &&
        (a.t === "wall" ||
          (a.t === "anchor" && a.style === "giant" && !a.carveAxis))
      );
    }
    if (
      ((this.marker.material = s ? this.ghostBadMat : this.ghostMat),
      this.marker.scale.setScalar(s ? 0.55 : 1),
      this.stage === 1 && this.firstPoint)
    )
      if (this.tool === "vault") {
        const a = pr[this.variant] ?? pr.market;
        this.chalk.footprint(
          this.firstPoint.x,
          this.firstPoint.z,
          n.x,
          n.z,
          a.w,
        );
      } else this.chalk.string(this.firstPoint, n);
    const r = performance.now();
    if (r - this.lastGhostAt < 90) return;
    this.lastGhostAt = r;
    const o = this.draftAction(n, e);
    if (o) {
      const a = this.showGhost(o);
      this.ghostOk = a;
    } else this.clearGhost();
  }
  draftAction(t, e) {
    switch (this.tool) {
      case "anchor": {
        const s =
          t.y +
          (this.variant === "giant" ? 22 : this.variant === "column" ? 13 : 12);
        return {
          t: "anchor",
          id: -1,
          x: t.x,
          z: t.z,
          topY: s,
          style: this.variant,
        };
      }
      case "span":
        return this.stage === 0 || !this.firstPoint
          ? null
          : {
              t: "span",
              id: -1,
              kind: this.variant,
              width:
                this.variant === "aqueduct"
                  ? 4.5
                  : this.variant === "arcade"
                    ? 7
                    : 6.5,
              ax: this.firstPoint.x,
              ay: this.firstPoint.y,
              az: this.firstPoint.z,
              bx: t.x,
              by: t.y,
              bz: t.z,
            };
      case "rise":
        return this.stage === 0 || !this.firstPoint
          ? null
          : {
              t: "rise",
              id: -1,
              style: this.variant,
              ax: this.firstPoint.x,
              ay: this.firstPoint.y,
              az: this.firstPoint.z,
              bx: t.x,
              by: t.y,
              bz: t.z,
            };
      case "vault": {
        if (this.stage === 0 || !this.firstPoint) return null;
        const s = pr[this.variant] ?? pr.market,
          r = t.x - this.firstPoint.x,
          o = t.z - this.firstPoint.z,
          a = Math.max(12, Math.hypot(r, o)),
          c = Math.atan2(r, o);
        return {
          t: "vault",
          id: -1,
          x: (t.x + this.firstPoint.x) / 2,
          z: (t.z + this.firstPoint.z) / 2,
          w: s.w,
          l: a,
          h: s.h,
          rotY: c,
        };
      }
      case "emb":
        return {
          t: "emb",
          id: -1,
          kind: this.variant,
          x: t.x,
          y: t.y,
          z: t.z,
          rotY: 0,
        };
      case "carve": {
        if (e.structId < 0) return null;
        const s = this.world.structures.get(e.structId);
        if (!s) return null;
        if (s.action.t === "wall") {
          const r = s.action,
            o = t.x - r.ax,
            a = t.z - r.az,
            c = Math.hypot(r.bx - r.ax, r.bz - r.az),
            l = (r.bx - r.ax) / c,
            h = (r.bz - r.az) / c,
            u = Math.max(4, Math.min(c - 4, o * l + a * h)),
            d = this.variant === "gate" ? 8 : 4.5,
            f = this.variant === "gate" ? 11 : 6.5;
          return { t: "carve", id: -1, target: e.structId, s: u, w: d, h: f };
        }
        if (
          s.action.t === "anchor" &&
          s.action.style === "giant" &&
          !s.action.carveAxis
        ) {
          const r = Math.abs(t.x - s.action.x) > Math.abs(t.z - s.action.z);
          return {
            t: "carve",
            id: -1,
            target: e.structId,
            s: r ? 0 : 1,
            w: 4.2,
            h: 5.2,
          };
        }
        return null;
      }
      case "designate":
        return {
          t: "designate",
          id: -1,
          kind: this.variant,
          x: t.x,
          z: t.z,
          r: 13,
        };
    }
    return null;
  }
  showGhost(t) {
    this.clearGhost();
    let e = null;
    if (t.t === "carve") {
      const r = this.world.structures.get(t.target);
      let o, a, c;
      if (r.action.t === "wall") {
        const d = r.action,
          f = Math.hypot(d.bx - d.ax, d.bz - d.az),
          m = (d.bx - d.ax) / f,
          _ = (d.bz - d.az) / f;
        ((o = d.ax + m * t.s), (a = d.az + _ * t.s), (c = Math.atan2(m, _)));
      } else {
        const d = r.action;
        ((o = d.x), (a = d.z), (c = t.s < 0.5 ? Math.PI / 2 : 0));
      }
      const l = t.w / 2 + 0.35;
      ((e = new Hr(l, 0.3, 8, 22, Math.PI)), e.rotateY(c + Math.PI / 2));
      const h = new Fe(0.28, 0.28, t.h - l, 8);
      (h.translate(-l, -(t.h - l) / 2, 0), h.rotateY(c + Math.PI / 2));
      const u = new Fe(0.28, 0.28, t.h - l, 8);
      (u.translate(l, -(t.h - l) / 2, 0),
        u.rotateY(c + Math.PI / 2),
        (e = zl([e, h, u])),
        e.translate(o, qt(o, a) + t.h - l, a));
    } else if (t.t === "designate")
      ((e = new Fe(t.r, t.r, 0.4, 28)),
        e.translate(t.x, qt(t.x, t.z) + 0.3, t.z));
    else {
      const r = Da({ ...t, id: 999999 }),
        o = [];
      for (const a of Object.keys(r.pieces))
        for (const c of r.pieces[a]) o.push(c);
      o.length && (e = zl(o));
    }
    if (!e) return !0;
    Ue(e);
    const n = this.costOf(t),
      s = this.validate(t) && Fl(n);
    return (
      (this.ghost = new he(e, s ? this.ghostMat : this.ghostBadMat)),
      this.scene.add(this.ghost),
      s
    );
  }
  costOf(t) {
    if (t.t === "carve") return { stone: 30, timber: 10 };
    if (t.t === "designate") return { stone: 0, timber: 0 };
    const e = Da({ ...t, id: 999998 });
    return {
      stone: Math.round(e.cost.stone),
      timber: Math.round(e.cost.timber),
    };
  }
  validate(t) {
    if (t.t === "span") {
      const e = Math.hypot(t.bx - t.ax, t.bz - t.az);
      if (e < 8 || e > X_() || Math.abs(t.by - t.ay) / e > 0.14) return !1;
    }
    if (t.t === "rise") {
      const e = Math.abs(t.by - t.ay);
      if (e < 2 || e > 40) return !1;
    }
    if (t.t === "vault") {
      const e = yt.folio ? 75 : yt.res.favor >= 60 ? 60 : 40;
      if (t.l > e) return !1;
    }
    return !0;
  }
  click(t) {
    if (!this.tool) return !1;
    const e = this.pick(t);
    if (!e) return !1;
    let n = e.p;
    if (
      (e.anchorId >= 0 &&
        (this.tool === "span" || this.tool === "rise") &&
        (n = this.world.anchors.get(e.anchorId).top.clone()),
      (this.tool === "span" || this.tool === "rise" || this.tool === "vault") &&
        this.stage === 0)
    )
      return (
        (this.firstPoint = n.clone()),
        (this.firstAnchor = e.anchorId),
        (this.stage = 1),
        !0
      );
    const r = this.draftAction(n, e);
    if (!r)
      return (
        this.tool === "carve" &&
          this.onMessage?.(
            "Carving wants solid masonry — the great wall, or an uncut giant pier.",
          ),
        !1
      );
    const o = this.costOf(r);
    return this.validate(r)
      ? Fl(o)
        ? ((r.id = yt.nextId++),
          W_(o),
          r.t === "carve" && (yt.res.stone += 15),
          yt.playerActions.push(structuredClone(r)),
          this.world.applyAction(r),
          this.onCommit?.(r),
          this.reset(),
          this.tool === "carve" && this.chalk.markCarvables(this.world),
          !0)
        : (this.onMessage?.(`Not enough stone (${o.stone} needed).`), !0)
      : (this.onMessage?.("The masons shake their heads — this cannot stand."),
        !0);
  }
}
function zl(i) {
  let t = 0;
  const e = i.map((o) => (o.index ? o.toNonIndexed() : o));
  for (const o of e) t += o.attributes.position.count;
  const n = new Float32Array(t * 3);
  let s = 0;
  for (const o of e)
    (n.set(o.attributes.position.array, s * 3),
      (s += o.attributes.position.count),
      o.dispose());
  const r = new ve();
  return (
    r.setAttribute("position", new pe(n, 3)),
    r.computeVertexNormals(),
    r
  );
}
const j_ = [
    {
      id: "reach-terrace",
      text: "“The high terrace has been beyond us since the old stair fell. Tullia still talks of gardens up there.” — Marcus, stonecutter",
      favor: 70,
      thanks:
        "The way up is open. Children raced to the top before the mortar dried.",
      done: (i) => {
        const t = i.nav.nearest(new P(-18, 0, 28), 24),
          e = i.nav.nearest(Vr.terraceCenter, 40);
        return t < 0 || e < 0 ? !1 : i.nav.path(t, e).length > 0;
      },
    },
    {
      id: "water-terrace",
      text: "“No water climbs so high. The spring across the great void mocks us every dry summer.” — Tullia",
      favor: 90,
      thanks:
        "Water crosses the void on stone legs. Tullia planted the first bed the same evening.",
      done: (i) => {
        for (const t of i.waterSources)
          if (t.y > 14 && t.x < 40 && t.z < -40) return !0;
        return !1;
      },
    },
    {
      id: "market-hall",
      text: "“Rain spoils the cloth every market-day. A roofed hall would change our lives.” — the weavers",
      favor: 60,
      thanks:
        "The stalls moved in under the vault within a week. It smells of bread and wet stone.",
      done: (i, t) => {
        for (const e of t.items) {
          if (e.kind !== "stall" || e.stage < 1) continue;
          const n = i.pockets[e.pocketIdx];
          if (
            n &&
            (n.kind === "interior" || n.kind === "under_arch") &&
            n.shelter > 0.7
          )
            return !0;
        }
        return !1;
      },
    },
    {
      id: "through-wall",
      text: "“The great wall makes a half-hour of a hundred paces. A door through it would spare old legs.” — Livia",
      favor: 50,
      thanks:
        "The passage breathes cool air through the wall. Livia sits in it at noon.",
      done: (i) => {
        const t = i.structures.get(Th);
        return !t || t.action.t !== "wall"
          ? !1
          : (t.action.openings ?? []).length > 0;
      },
    },
    {
      id: "evening-light",
      text: "“The under-arches go black after sunset. A few lanterns would make them kind.” — the night watch",
      favor: 30,
      thanks:
        "Small lights swing under the arches now. The dark feels inhabited, not empty.",
      done: (i) => {
        let t = 0;
        for (const e of i.actions)
          e.t === "emb" && e.kind === "lantern" && e.id >= 1e3 && t++;
        return t >= 3;
      },
    },
  ],
  kl = [
    "A trader asked the name of the city today. Nobody could quite agree.",
    "The swallows have found the new arches. They approve.",
    "Someone chalked a game board onto the plaza steps. It stays.",
    "Old men argue about which arch is oldest. All of them are wrong.",
    "A cat has claimed the warmest stone. Construction routes around it.",
    "The masons hum while they work. The vaults hum back.",
    "Laundry lines appeared between the columns overnight, like rigging.",
    "Children have invented seventeen names for the big pier. All are rude.",
  ];
class $_ {
  constructor() {
    K(this, "active", null);
    K(this, "queue");
    K(this, "onDone", null);
    K(this, "onNew", null);
    K(this, "flavorIdx", 0);
    this.resync();
  }
  resync() {
    ((this.queue = j_.filter((t) => !yt.doneRequests.has(t.id))),
      (this.active = this.queue[0] ?? null));
  }
  check(t, e) {
    if (this.active && this.active.done(t, e)) {
      ((yt.res.favor += this.active.favor),
        yt.doneRequests.add(this.active.id));
      const n = this.active;
      if (
        ((this.queue = this.queue.filter((s) => s !== n)),
        this.onDone?.(n),
        (this.active = this.queue[0] ?? null),
        this.active)
      ) {
        const s = this.active;
        setTimeout(() => this.onNew?.(s), 9e3);
      }
    }
  }
  nextFlavor() {
    return (
      (this.flavorIdx = (this.flavorIdx + 1) % kl.length),
      kl[this.flavorIdx]
    );
  }
}
class J_ {
  constructor(t, e) {
    K(this, "world");
    K(this, "renderer");
    K(this, "plane", new Fn(new P(-1, 0, 0), 0));
    K(this, "active", !1);
    K(this, "axis", "x");
    K(this, "offset", 0);
    K(this, "flip", 1);
    ((this.world = t), (this.renderer = e));
  }
  set(t) {
    ((this.active = t), (Ge.uCutting.value = t ? 1 : 0), this.apply());
  }
  setAxis(t) {
    ((this.axis = t), this.apply());
  }
  setOffset(t) {
    ((this.offset = t), this.apply());
  }
  setFlip(t) {
    ((this.flip = t), this.apply());
  }
  apply() {
    if (!this.active) {
      this.renderer.clippingPlanes = [];
      return;
    }
    const t =
      this.axis === "x" ? new P(-this.flip, 0, 0) : new P(0, 0, -this.flip);
    (this.plane.set(t, this.flip * this.offset),
      (this.renderer.clippingPlanes = [this.plane]));
  }
}
class Q_ {
  constructor(t, e, n) {
    K(this, "world");
    K(this, "camera");
    K(this, "dom");
    K(this, "active", !1);
    K(this, "vel", new P());
    K(this, "pos", new P());
    K(this, "yaw", 0);
    K(this, "pitch", 0);
    K(this, "keys", new Set());
    K(this, "grounded", !1);
    K(this, "onExit", null);
    K(this, "ray", new vh());
    K(this, "boundMove");
    K(this, "boundKey");
    K(this, "boundKeyUp");
    K(this, "boundLockChange");
    ((this.world = t),
      (this.camera = e),
      (this.dom = n),
      (this.boundMove = (s) => this.onMouse(s)),
      (this.boundKey = (s) => {
        (this.keys.add(s.code), s.code === "Space" && s.preventDefault());
      }),
      (this.boundKeyUp = (s) => this.keys.delete(s.code)),
      (this.boundLockChange = () => {
        document.pointerLockElement !== this.dom && this.active && this.exit();
      }));
  }
  enter(t, e = 0) {
    ((this.active = !0),
      this.pos.copy(t),
      (this.pos.y += 1.7),
      (this.yaw = e),
      (this.pitch = 0),
      this.vel.set(0, 0, 0),
      document.addEventListener("mousemove", this.boundMove),
      document.addEventListener("keydown", this.boundKey),
      document.addEventListener("keyup", this.boundKeyUp),
      document.addEventListener("pointerlockchange", this.boundLockChange),
      this.dom.requestPointerLock());
  }
  exit() {
    ((this.active = !1),
      document.removeEventListener("mousemove", this.boundMove),
      document.removeEventListener("keydown", this.boundKey),
      document.removeEventListener("keyup", this.boundKeyUp),
      document.removeEventListener("pointerlockchange", this.boundLockChange),
      document.pointerLockElement && document.exitPointerLock(),
      this.onExit?.());
  }
  onMouse(t) {
    this.active &&
      ((this.yaw -= t.movementX * 0.0021),
      (this.pitch -= t.movementY * 0.0019),
      (this.pitch = Math.max(-1.35, Math.min(1.35, this.pitch))));
  }
  groundAt(t, e, n) {
    (this.ray.set(new P(t, n + 1.4, e), new P(0, -1, 0)), (this.ray.far = 60));
    const s = this.ray.intersectObjects(this.world.raycastTargets(), !1);
    return s.length ? s[0].point.y : -999;
  }
  update(t) {
    if (!this.active) return;
    const e =
        this.keys.has("ShiftLeft") || this.keys.has("ShiftRight") ? 7.2 : 3.4,
      n = new P(Math.sin(this.yaw), 0, Math.cos(this.yaw)).multiplyScalar(-1),
      s = new P(-n.z, 0, n.x),
      r = new P();
    ((this.keys.has("KeyW") || this.keys.has("ArrowUp")) && r.add(n),
      (this.keys.has("KeyS") || this.keys.has("ArrowDown")) && r.sub(n),
      (this.keys.has("KeyD") || this.keys.has("ArrowRight")) && r.add(s),
      (this.keys.has("KeyA") || this.keys.has("ArrowLeft")) && r.sub(s),
      r.lengthSq() > 0 && r.normalize().multiplyScalar(e));
    const o = this.pos.y - 1.7,
      a = this.pos.x + r.x * t,
      c = this.pos.z + r.z * t,
      l = this.groundAt(this.pos.x, this.pos.z, o + 0.6),
      h = this.groundAt(a, c, o + 0.6),
      u = h - o;
    h > -900 && u < 0.55
      ? ((this.pos.x = a), (this.pos.z = c))
      : h > -900 &&
        u < 1.1 &&
        ((this.pos.x = this.pos.x + r.x * t * 0.4),
        (this.pos.z = this.pos.z + r.z * t * 0.4));
    const d = this.groundAt(this.pos.x, this.pos.z, o + 0.7),
      f = (d > -900 ? d : l > -900 ? l : o) + 1.7;
    (f < this.pos.y - 0.02
      ? (this.pos.y = Math.max(f, this.pos.y - 9.8 * t * 1.6))
      : (this.pos.y += (f - this.pos.y) * Math.min(1, t * 14)),
      this.camera.position.copy(this.pos));
    const m = new P(
      this.pos.x - Math.sin(this.yaw) * Math.cos(this.pitch),
      this.pos.y + Math.sin(this.pitch),
      this.pos.z - Math.cos(this.yaw) * Math.cos(this.pitch),
    );
    this.camera.lookAt(m);
  }
}
const Ph = { "3:2": 3 / 2, "4:5": 4 / 5, "21:9": 21 / 9 };
function Dh(i, t, e) {
  return new Promise((n) => {
    const s = new Image();
    ((s.onload = () => {
      const r = Math.round(s.height * 0.06),
        o = Math.round(s.height * 0.075),
        a = Math.round(s.height * 0.15),
        c = s.width + o * 2,
        l = s.height + r + a,
        h = document.createElement("canvas");
      ((h.width = c), (h.height = l));
      const u = h.getContext("2d");
      ((u.fillStyle = "#f1ead9"),
        u.fillRect(0, 0, c, l),
        (u.strokeStyle = "rgba(35,29,19,0.75)"),
        (u.lineWidth = Math.max(1.5, s.width / 900)),
        u.strokeRect(o - 6, r - 6, s.width + 12, s.height + 12),
        u.drawImage(s, o, r));
      const d = Math.round(s.height * 0.032);
      ((u.fillStyle = "#2a2318"),
        (u.font = `${d}px "Iowan Old Style", Palatino, Georgia, serif`),
        (u.textAlign = "center"),
        u.fillText(t.toUpperCase(), c / 2, s.height + r + a * 0.45));
      const f = tv(e);
      ((u.font = `italic ${Math.round(d * 0.82)}px "Iowan Old Style", Palatino, Georgia, serif`),
        u.fillText(`— Tav. ${f} —`, c / 2, s.height + r + a * 0.75),
        n(h.toDataURL("image/png")));
    }),
      (s.src = i));
  });
}
function tv(i) {
  const t = [
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let e = "";
  for (const [n, s] of t) for (; i >= n; ) ((e += s), (i -= n));
  return e || "I";
}
class ev {
  constructor() {
    K(this, "ctx", null);
    K(this, "master");
    K(this, "windGain");
    K(this, "waterGain");
    K(this, "birdTimer", 0);
    K(this, "chiselTimer", 0);
    K(this, "lastBellHour", -1);
    K(this, "t", 0);
  }
  start() {
    if (this.ctx) return;
    const t = new AudioContext();
    ((this.ctx = t),
      (this.master = t.createGain()),
      (this.master.gain.value = 0.32),
      this.master.connect(t.destination));
    const e = this.noiseSource(8),
      n = t.createBiquadFilter();
    ((n.type = "bandpass"),
      (n.frequency.value = 480),
      (n.Q.value = 0.6),
      (this.windGain = t.createGain()),
      (this.windGain.gain.value = 0.05),
      e.connect(n).connect(this.windGain).connect(this.master));
    const s = t.createOscillator();
    s.frequency.value = 0.07;
    const r = t.createGain();
    ((r.gain.value = 130), s.connect(r).connect(n.frequency), s.start());
    const o = this.noiseSource(4),
      a = t.createBiquadFilter();
    ((a.type = "highpass"), (a.frequency.value = 1400));
    const c = t.createBiquadFilter();
    ((c.type = "lowpass"),
      (c.frequency.value = 5200),
      (this.waterGain = t.createGain()),
      (this.waterGain.gain.value = 0),
      o.connect(a).connect(c).connect(this.waterGain).connect(this.master));
  }
  noiseSource(t) {
    const e = this.ctx,
      n = e.createBuffer(1, e.sampleRate * t, e.sampleRate),
      s = n.getChannelData(0);
    let r = 0,
      o = 0,
      a = 0;
    for (let l = 0; l < s.length; l++) {
      const h = Math.random() * 2 - 1;
      ((r = 0.997 * r + 0.029 * h),
        (o = 0.985 * o + 0.032 * h),
        (a = 0.95 * a + 0.048 * h),
        (s[l] = (r + o + a + h * 0.05) * 0.28));
    }
    const c = e.createBufferSource();
    return ((c.buffer = n), (c.loop = !0), c.start(), c);
  }
  blip(t, e, n, s = "sine", r = 0) {
    const o = this.ctx,
      a = o.createOscillator();
    ((a.type = s),
      (a.frequency.value = t),
      r && a.frequency.linearRampToValueAtTime(t + r, o.currentTime + e));
    const c = o.createGain();
    (c.gain.setValueAtTime(0, o.currentTime),
      c.gain.linearRampToValueAtTime(n, o.currentTime + 0.02),
      c.gain.exponentialRampToValueAtTime(1e-4, o.currentTime + e),
      a.connect(c).connect(this.master),
      a.start(),
      a.stop(o.currentTime + e + 0.05));
  }
  bell() {
    const t = this.ctx;
    for (const [e, n, s] of [
      [392, 0.1, 2.6],
      [587, 0.05, 1.9],
      [988, 0.022, 1.1],
    ]) {
      const r = t.createOscillator();
      r.frequency.value = e * (1 + (Math.random() - 0.5) * 0.004);
      const o = t.createGain();
      (o.gain.setValueAtTime(n, t.currentTime),
        o.gain.exponentialRampToValueAtTime(1e-4, t.currentTime + s),
        r.connect(o).connect(this.master),
        r.start(),
        r.stop(t.currentTime + s + 0.1));
    }
  }
  chisel() {
    const t = this.ctx,
      e = t.createBuffer(1, t.sampleRate * 0.03, t.sampleRate),
      n = e.getChannelData(0);
    for (let a = 0; a < n.length; a++)
      n[a] = (Math.random() * 2 - 1) * Math.exp(-a / (n.length * 0.18));
    const s = t.createBufferSource();
    s.buffer = e;
    const r = t.createBiquadFilter();
    ((r.type = "bandpass"),
      (r.frequency.value = 2400 + Math.random() * 1800),
      (r.Q.value = 6));
    const o = t.createGain();
    ((o.gain.value = 0.1),
      s.connect(r).connect(o).connect(this.master),
      s.start());
  }
  update(t, e) {
    if (!this.ctx) return;
    ((this.t += t), (this.windGain.gain.value = 0.04 + e.dusk * 0.035));
    const n = Math.max(0, 1 - e.waterDist / 55);
    if (
      ((this.waterGain.gain.value = n * n * 0.16),
      (this.birdTimer -= t),
      this.birdTimer <= 0 &&
        ((this.birdTimer = 3.5 + Math.random() * 8),
        e.dusk < 0.55 && Math.random() < 0.8))
    ) {
      const r = 2300 + Math.random() * 1600,
        o = 2 + Math.floor(Math.random() * 3);
      for (let a = 0; a < o; a++)
        setTimeout(
          () => this.blip(r + Math.random() * 300, 0.09, 0.016, "sine", -160),
          a * 130 + Math.random() * 60,
        );
    }
    ((this.chiselTimer -= t),
      e.constructing &&
        this.chiselTimer <= 0 &&
        ((this.chiselTimer = 0.55 + Math.random() * 0.5), this.chisel()));
    const s = Math.floor(e.hour);
    s !== this.lastBellHour &&
      [8, 12, 18].includes(s) &&
      ((this.lastBellHour = s), this.bell());
  }
}
const nv = `
#hud { position: fixed; inset: 0; pointer-events: none; z-index: 10;
  font-family: "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif;
  color: #2a2318; user-select: none; }
#hud * { box-sizing: border-box; }
.panel { background: rgba(241,234,217,0.93); border: 1px solid #2a2318;
  box-shadow: 0 1px 0 rgba(42,35,24,0.25), inset 0 0 0 3px rgba(241,234,217,0.9), inset 0 0 0 4px rgba(42,35,24,0.35);
  pointer-events: auto; }
#topbar { position: absolute; top: 10px; left: 50%; transform: translateX(-50%);
  padding: 5px 22px 6px; text-align: center; }
#cityname { font-size: 19px; letter-spacing: 0.34em; font-weight: 600; }
#daytime { font-size: 11.5px; letter-spacing: 0.18em; font-style: italic; opacity: 0.85; margin-top: 1px;}
#resources { position: absolute; top: 10px; left: 10px; padding: 7px 14px; font-size: 13px;
  letter-spacing: 0.06em; line-height: 1.75; }
#resources .num { display: inline-block; min-width: 44px; text-align: right; font-variant-numeric: tabular-nums; }
#resources .lbl { opacity: 0.75; font-size: 11px; letter-spacing: 0.14em; }
#quals { position: absolute; top: 10px; right: 10px; padding: 7px 14px; font-size: 11px;
  letter-spacing: 0.12em; line-height: 1.9; text-align: right; }
.qbar { display: inline-block; width: 64px; height: 5px; border: 1px solid #2a2318; margin-left: 8px;
  vertical-align: middle; position: relative; }
.qbar i { position: absolute; inset: 0; right: auto; background: #2a2318; opacity: 0.75; }
#palette { position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%);
  display: flex; gap: 0; }
.tool { padding: 9px 15px 7px; cursor: pointer; text-align: center; border-right: none !important; }
.tool:last-child { border-right: 1px solid #2a2318 !important; }
.tool svg { display: block; margin: 0 auto 3px; width: 30px; height: 26px; }
.tool .tl { font-size: 10.5px; letter-spacing: 0.2em; }
.tool.on { background: #2a2318; color: #f1ead9; }
.tool.on svg * { stroke: #f1ead9 !important; fill: none; }
#variants { position: absolute; bottom: 86px; left: 50%; transform: translateX(-50%);
  display: none; }
#variants .var { padding: 7px 16px; cursor: pointer; display: inline-block; }
#variants .var .vl { font-size: 12.5px; letter-spacing: 0.1em; }
#variants .var .vh { font-size: 10.5px; font-style: italic; opacity: 0.7; margin-top: 1px; }
#variants .var.on { background: #2a2318; color: #f1ead9; }
#request { position: absolute; bottom: 12px; left: 12px; max-width: 340px; padding: 10px 16px;
  font-size: 12.5px; font-style: italic; line-height: 1.5; }
#request .who { font-style: normal; font-size: 10.5px; letter-spacing: 0.16em; opacity: 0.7; margin-top: 4px; }
#modes { position: absolute; bottom: 12px; right: 12px; display: flex; }
.mode { padding: 9px 13px 8px; cursor: pointer; font-size: 10.5px; letter-spacing: 0.18em; border-right: none !important; }
.mode:last-child { border-right: 1px solid #2a2318 !important; }
.mode.on { background: #2a2318; color: #f1ead9; }
#undo { position: absolute; top: 156px; left: 10px; padding: 6px 13px; font-size: 10.5px;
  letter-spacing: 0.18em; cursor: pointer; }
#toast { position: absolute; top: 74px; left: 50%; transform: translateX(-50%); padding: 9px 22px;
  font-size: 13px; font-style: italic; opacity: 0; transition: opacity 0.6s; max-width: 480px; text-align: center; }
#sectionctl { position: absolute; top: 120px; right: 10px; width: 190px; padding: 10px 14px; display: none;
  font-size: 11px; letter-spacing: 0.1em; }
#sectionctl input[type=range] { width: 100%; accent-color: #2a2318; }
#sectionctl .btnrow { display: flex; gap: 6px; margin-top: 6px; }
#sectionctl button, #platectl button { background: none; border: 1px solid #2a2318; font-family: inherit;
  font-size: 10px; letter-spacing: 0.14em; padding: 4px 8px; cursor: pointer; color: #2a2318; flex: 1; }
#sectionctl button.on, #platectl button.on { background: #2a2318; color: #f1ead9; }
#platectl { position: absolute; top: 120px; right: 10px; width: 210px; padding: 10px 14px; display: none;
  font-size: 11px; letter-spacing: 0.1em; }
#platectl input[type=range] { width: 100%; accent-color: #2a2318; }
#platectl .btnrow { display: flex; gap: 6px; margin: 6px 0; }
#platectl .engrave { width: 100%; padding: 8px; font-size: 11px; margin-top: 4px; }
#wanderhint { position: absolute; bottom: 14px; left: 50%; transform: translateX(-50%); padding: 7px 18px;
  font-size: 11px; letter-spacing: 0.15em; display: none; font-style: italic; }
#platemark { position: absolute; inset: 9px; border: 1px solid rgba(42,35,24,0.35); pointer-events: none; }
#platemark::after { content: ''; position: absolute; inset: 3px; border: 1px solid rgba(42,35,24,0.16); }
#labels { position: absolute; inset: 0; overflow: hidden; }
.dlabel { position: absolute; transform: translate(-50%, -50%); font-size: 13px; font-style: italic;
  letter-spacing: 0.22em; color: #2a2318; text-shadow: 0 0 6px rgba(241,234,217,0.9), 0 0 2px rgba(241,234,217,1);
  white-space: nowrap; transition: opacity 1.2s; }
#frame { position: absolute; inset: 0; display: none; pointer-events: none; }
#frame .bar { position: absolute; background: rgba(28,23,15,0.88); }
#veil { position: fixed; inset: 0; background: #ece5d3; z-index: 50; display: flex; flex-direction: column;
  align-items: center; justify-content: center; transition: opacity 1.4s; pointer-events: auto; }
#veil h1 { font-size: 44px; letter-spacing: 0.5em; font-weight: 500; margin: 0 0 6px 0.5em; }
#veil .sub { font-style: italic; font-size: 15px; opacity: 0.8; letter-spacing: 0.06em; }
#veil .rule { width: 220px; border-bottom: 1px solid #2a2318; margin: 22px 0; position: relative; }
#veil .hint { font-size: 12px; letter-spacing: 0.14em; opacity: 0.65; line-height: 2; text-align: center; }
#veil .begin { margin-top: 26px; border: 1px solid #2a2318; padding: 10px 38px; font-size: 13px;
  letter-spacing: 0.3em; cursor: pointer; background: none; font-family: inherit; color: #2a2318; }
#veil .begin:hover { background: #2a2318; color: #ece5d3; }

@media (max-width: 1020px) {
  #quals { display: none; }
  .tool { padding: 7px 9px 5px; }
  .tool svg { width: 24px; height: 21px; }
  .tool .tl { font-size: 8.5px; letter-spacing: 0.12em; }
  .mode { padding: 8px 9px 7px; font-size: 9.5px; }
  #request { max-width: 240px; font-size: 11px; padding: 8px 12px; }
  #cityname { font-size: 15px; }
  #resources { font-size: 11.5px; padding: 5px 10px; line-height: 1.6; }
  #resources .num { min-width: 34px; }
  #undo { top: 162px; }
  #variants .var { padding: 6px 10px; }
  #variants .var .vh { display: none; }
}
@media (max-width: 640px) {
  #request { display: none !important; }
  #topbar { display: none; }
  .tool svg { width: 20px; height: 18px; }
  #platemark { inset: 5px; }
  /* stack: modes row sits above the full-width scrollable palette */
  #palette { left: 0; right: 0; transform: none; overflow-x: auto; justify-content: flex-start; }
  #modes { bottom: 64px; right: 50%; transform: translateX(50%); }
  #variants { bottom: 132px; width: 94vw; overflow-x: auto; white-space: nowrap; }
}
`,
  iv = {
    anchor: `<svg viewBox="0 0 30 26"><g stroke="#2a2318" stroke-width="1.4" fill="none">
    <path d="M11 24 V6 h8 v18 M8 24 h14 M9 6 h12 M11 3 h8 v3 h-8 z"/></g></svg>`,
    span: `<svg viewBox="0 0 30 26"><g stroke="#2a2318" stroke-width="1.4" fill="none">
    <path d="M2 8 h26 M2 5 h26 M4 8 v4 a4 4 0 0 0 8 0 v-4 M12 8 v4 a4 4 0 0 0 8 0 v-4 M20 8 v4 a4 4 0 0 0 8 0 v-4 M4 12 v12 M28 12 v12"/></g></svg>`,
    rise: `<svg viewBox="0 0 30 26"><g stroke="#2a2318" stroke-width="1.4" fill="none">
    <path d="M2 24 h7 v-5 h7 v-5 h7 v-5 h5 M2 24 v-2 h5 v-5 h7 v-5 h7 v-5 h7"/></g></svg>`,
    vault: `<svg viewBox="0 0 30 26"><g stroke="#2a2318" stroke-width="1.4" fill="none">
    <path d="M3 24 V12 a12 9 0 0 1 24 0 V24 M8 24 V14 a7 6 0 0 1 14 0 V24"/></g></svg>`,
    carve: `<svg viewBox="0 0 30 26"><g stroke="#2a2318" stroke-width="1.4" fill="none">
    <path d="M3 3 h24 v21 h-24 z M11 24 V14 a4 4 0 0 1 8 0 V24"/>
    <path d="M6 6 l4 4 M24 6 l-4 4" stroke-dasharray="1.5 1.5"/></g></svg>`,
    emb: `<svg viewBox="0 0 30 26"><g stroke="#2a2318" stroke-width="1.4" fill="none">
    <path d="M11 24 h8 M12 21 h6 M13 21 V13 M17 21 V13 M15 13 m-3 0 a3 4.5 0 1 1 6 0 a3 4.5 0 1 1 -6 0 M15 5 v-2"/></g></svg>`,
    designate: `<svg viewBox="0 0 30 26"><g stroke="#2a2318" stroke-width="1.4" fill="none">
    <path d="M5 21 c4 -3 7 1 10 -1 s6 -4 10 -2 M5 21 c0 2 2 3 4 3 s16 -1 16 -4" />
    <path d="M20 4 l4 4 -10 10 -5 1 1 -5 z"/></g></svg>`,
  };
class sv {
  constructor(t) {
    K(this, "cb");
    K(this, "root");
    K(this, "toolBtns", new Map());
    K(this, "modeBtns", new Map());
    K(this, "varRow");
    K(this, "toastEl");
    K(this, "requestEl");
    K(this, "labelsEl");
    K(this, "sectionCtl");
    K(this, "plateCtl");
    K(this, "wanderHint");
    K(this, "frameEl");
    K(this, "veil");
    K(this, "resStone");
    K(this, "resTimber");
    K(this, "resFavor");
    K(this, "resPop");
    K(this, "dayEl");
    K(this, "qualBars", new Map());
    K(this, "toastTimer", 0);
    this.cb = t;
    const e = document.createElement("style");
    ((e.textContent = nv),
      document.head.appendChild(e),
      (this.root = document.createElement("div")),
      (this.root.id = "hud"),
      document.body.appendChild(this.root),
      this.build());
  }
  build() {
    const t = this.root;
    t.innerHTML = `
      <div id="platemark"></div>
      <div id="labels"></div>
      <div id="topbar" class="panel"><div id="cityname">CAPRICCIO</div><div id="daytime">day I · morning</div></div>
      <div id="resources" class="panel">
        <div><span class="num" id="r-stone">0</span> <span class="lbl">STONE</span></div>
        <div><span class="num" id="r-timber">0</span> <span class="lbl">TIMBER</span></div>
        <div><span class="num" id="r-favor">0</span> <span class="lbl">FAVOR</span></div>
        <div><span class="num" id="r-pop">0</span> <span class="lbl">SOULS</span></div>
        <div id="folio-line" title="No costs, no span limits — build freely."
          style="margin-top:3px; font-size:10px; letter-spacing:0.16em; opacity:0.6; cursor:pointer; font-style:italic">✦ play without resources</div>
        <div id="anew-line" title="Erase this city and begin again."
          style="margin-top:2px; font-size:10px; letter-spacing:0.16em; opacity:0.5; cursor:pointer; font-style:italic">⟳ begin anew</div>
      </div>
      <div id="undo" class="panel">UNDO</div>
      <div id="quals" class="panel"></div>
      <div id="toast" class="panel"></div>
      <div id="request" class="panel" style="display:none"></div>
      <div id="variants" class="panel"></div>
      <div id="palette"></div>
      <div id="modes"></div>
      <div id="sectionctl" class="panel">
        <div style="letter-spacing:0.2em; margin-bottom:4px">SECTION</div>
        <input type="range" id="sec-off" min="-150" max="150" value="0" step="1"/>
        <div class="btnrow">
          <button id="sec-x" class="on">E–W</button><button id="sec-z">N–S</button><button id="sec-flip">FLIP</button>
        </div>
      </div>
      <div id="platectl" class="panel">
        <div style="letter-spacing:0.2em; margin-bottom:4px">PLATE</div>
        <div class="btnrow"><button data-a="3:2" class="on">3:2</button><button data-a="4:5">4:5</button><button data-a="21:9">21:9</button></div>
        <div>LENS <input type="range" id="plate-fov" min="22" max="70" value="42"/></div>
        <div>HOUR <input type="range" id="plate-hour" min="5.6" max="20.4" value="16.2" step="0.1"/></div>
        <button class="engrave" id="plate-go">ENGRAVE THIS PLATE</button>
      </div>
      <div id="wanderhint" class="panel">W A S D walk · SHIFT hurry · ESC return</div>
      <div id="frame"><div class="bar" id="fb-t"></div><div class="bar" id="fb-b"></div><div class="bar" id="fb-l"></div><div class="bar" id="fb-r"></div></div>
      <div id="veil">
        <h1>CAPRICCIO</h1>
        <div class="sub">a city of arches, grown inside its own monuments</div>
        <div class="rule"></div>
        <div class="hint">
          RAISE the great architecture — piers, spans, stairs, vaults.<br/>
          The citizens will find their own uses for what you leave them.<br/>
          Bring a way, and water, to the high terrace.
        </div>
        <button class="begin">BEGIN</button>
      </div>
    `;
    const e = t.querySelector("#palette"),
      n = [
        ["anchor", "ESTABLISH"],
        ["span", "SPAN"],
        ["rise", "RISE"],
        ["vault", "VAULT"],
        ["carve", "CARVE"],
        ["emb", "ADORN"],
        ["designate", "INVITE"],
      ];
    for (const [m, _] of n) {
      const g = document.createElement("div");
      ((g.className = "tool panel"),
        (g.innerHTML = `${iv[m]}<div class="tl">${_}</div>`),
        (g.onclick = () => this.pickTool(m)),
        e.appendChild(g),
        this.toolBtns.set(m, g));
    }
    const s = t.querySelector("#modes");
    for (const [m, _] of [
      ["build", "BUILD"],
      ["section", "SECTION"],
      ["wander", "WANDER"],
      ["plate", "PLATE"],
    ]) {
      const g = document.createElement("div");
      ((g.className = "mode panel" + (m === "build" ? " on" : "")),
        (g.textContent = _),
        (g.onclick = () => this.pickMode(m)),
        s.appendChild(g),
        this.modeBtns.set(m, g));
    }
    ((this.varRow = t.querySelector("#variants")),
      (this.toastEl = t.querySelector("#toast")),
      (this.requestEl = t.querySelector("#request")),
      (this.labelsEl = t.querySelector("#labels")),
      (this.sectionCtl = t.querySelector("#sectionctl")),
      (this.plateCtl = t.querySelector("#platectl")),
      (this.wanderHint = t.querySelector("#wanderhint")),
      (this.frameEl = t.querySelector("#frame")),
      (this.veil = t.querySelector("#veil")),
      (this.resStone = t.querySelector("#r-stone")),
      (this.resTimber = t.querySelector("#r-timber")),
      (this.resFavor = t.querySelector("#r-favor")),
      (this.resPop = t.querySelector("#r-pop")),
      (this.dayEl = t.querySelector("#daytime")));
    const r = t.querySelector("#quals");
    for (const m of ["ACCESS", "SHELTER", "LIGHT", "BELONGING", "GRANDEUR"]) {
      const _ = document.createElement("div");
      ((_.innerHTML = `${m}<span class="qbar"><i style="width:30%"></i></span>`),
        r.appendChild(_),
        this.qualBars.set(m, _.querySelector("i")));
    }
    ((t.querySelector("#undo").onclick = () => this.cb.onUndo()),
      (t.querySelector("#folio-line").onclick = () => this.cb.onFolio()));
    const o = t.querySelector("#anew-line");
    let a = 0;
    o.onclick = () => {
      const m = Date.now();
      if (m - a < 5e3) {
        this.cb.onAnew();
        return;
      }
      ((a = m),
        (o.textContent = "⟳ click again to erase the city"),
        setTimeout(() => {
          ((o.textContent = "⟳ begin anew"), (a = 0));
        }, 5e3));
    };
    const c = t.querySelector("#sec-off");
    c.oninput = () => this.cb.onSection({ offset: Number(c.value) });
    const l = t.querySelector("#sec-x"),
      h = t.querySelector("#sec-z");
    ((l.onclick = () => {
      (l.classList.add("on"),
        h.classList.remove("on"),
        this.cb.onSection({ axis: "x" }));
    }),
      (h.onclick = () => {
        (h.classList.add("on"),
          l.classList.remove("on"),
          this.cb.onSection({ axis: "z" }));
      }));
    let u = 1;
    t.querySelector("#sec-flip").onclick = () => {
      ((u *= -1), this.cb.onSection({ flip: u }));
    };
    for (const m of this.plateCtl.querySelectorAll("button[data-a]"))
      m.onclick = () => {
        (this.plateCtl
          .querySelectorAll("button[data-a]")
          .forEach((_) => _.classList.remove("on")),
          m.classList.add("on"),
          this.cb.onPlate({ aspect: m.dataset.a }));
      };
    const d = t.querySelector("#plate-fov");
    d.oninput = () => this.cb.onPlate({ fov: Number(d.value) });
    const f = t.querySelector("#plate-hour");
    ((f.oninput = () => this.cb.onPlate({ hour: Number(f.value) })),
      (t.querySelector("#plate-go").onclick = () => this.cb.onEngrave()),
      (t.querySelector("#veil .begin").onclick = () => {
        ((this.veil.style.opacity = "0"),
          setTimeout(() => {
            this.veil.style.display = "none";
          }, 1500),
          this.cb.onBegin());
      }));
  }
  pickTool(t) {
    const e = [...this.toolBtns.entries()].find(([, n]) =>
      n.classList.contains("on"),
    )?.[0];
    for (const n of this.toolBtns.values()) n.classList.remove("on");
    if (e === t || t === null) {
      ((this.varRow.style.display = "none"), this.cb.onTool(null, ""));
      return;
    }
    (this.toolBtns.get(t).classList.add("on"),
      this.showVariants(t),
      this.cb.onTool(t, La[t][0].key));
  }
  showVariants(t) {
    ((this.varRow.style.display = "block"),
      (this.varRow.innerHTML = ""),
      La[t].forEach((e, n) => {
        const s = document.createElement("div");
        ((s.className = "var" + (n === 0 ? " on" : "")),
          (s.innerHTML = `<div class="vl">${e.label}</div><div class="vh">${e.hint}</div>`),
          (s.onclick = () => {
            (this.varRow
              .querySelectorAll(".var")
              .forEach((r) => r.classList.remove("on")),
              s.classList.add("on"),
              this.cb.onTool(t, e.key));
          }),
          this.varRow.appendChild(s));
      }));
  }
  pickMode(t) {
    for (const n of this.modeBtns.values()) n.classList.remove("on");
    (this.modeBtns.get(t).classList.add("on"),
      (this.sectionCtl.style.display = t === "section" ? "block" : "none"),
      (this.plateCtl.style.display = t === "plate" ? "block" : "none"),
      (this.frameEl.style.display = t === "plate" ? "block" : "none"));
    const e = t === "build" || t === "section";
    if (
      ((this.root.querySelector("#palette").style.display = e
        ? "flex"
        : "none"),
      !e)
    ) {
      this.varRow.style.display = "none";
      for (const n of this.toolBtns.values()) n.classList.remove("on");
    }
    this.cb.onMode(t);
  }
  toast(t, e = 4200) {
    ((this.toastEl.textContent = t),
      (this.toastEl.style.opacity = "1"),
      clearTimeout(this.toastTimer),
      (this.toastTimer = window.setTimeout(() => {
        this.toastEl.style.opacity = "0";
      }, e)));
  }
  setRequest(t) {
    if (!t) {
      this.requestEl.style.display = "none";
      return;
    }
    this.requestEl.style.display = "block";
    const e = t.match(/^(.*?)(—[^—]*)$/s);
    this.requestEl.innerHTML = e
      ? `${e[1].trim()}<div class="who">${e[2].trim()}</div>`
      : t;
  }
  setWanderHint(t) {
    this.wanderHint.style.display = t ? "block" : "none";
  }
  updateResources(t) {
    (yt.folio
      ? ((this.resStone.textContent = "∞"), (this.resTimber.textContent = "∞"))
      : ((this.resStone.textContent = String(Math.floor(yt.res.stone))),
        (this.resTimber.textContent = String(Math.floor(yt.res.timber)))),
      (this.resFavor.textContent = String(Math.floor(yt.res.favor))),
      (this.resPop.textContent = String(t)));
    const e = this.root.querySelector("#folio-line");
    e &&
      (e.textContent = yt.folio
        ? "✦ resources are off — restore them"
        : "✦ play without resources");
  }
  updateClock(t, e) {
    const n = [
        "night",
        "dawn",
        "morning",
        "midday",
        "afternoon",
        "evening",
        "dusk",
      ],
      s =
        e < 6
          ? 0
          : e < 7.5
            ? 1
            : e < 11.5
              ? 2
              : e < 14
                ? 3
                : e < 17.5
                  ? 4
                  : e < 19.5
                    ? 5
                    : 6;
    this.dayEl.textContent = `day ${rv(t)} · ${n[s]}`;
  }
  updateQuals(t) {
    for (const [e, n] of Object.entries(t)) {
      const s = this.qualBars.get(e);
      s && (s.style.width = `${Math.round(n * 100)}%`);
    }
  }
  syncSection(t, e) {
    const n = this.root.querySelector("#sec-off");
    n && (n.value = String(e));
    const s = this.root.querySelector("#sec-x"),
      r = this.root.querySelector("#sec-z");
    s &&
      r &&
      (s.classList.toggle("on", t === "x"),
      r.classList.toggle("on", t === "z"));
  }
  showPlate(t, e) {
    const n = document.createElement("div");
    n.style.cssText = `position:fixed;inset:0;z-index:60;background:rgba(28,23,15,0.78);
      display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;pointer-events:auto`;
    const s = document.createElement("img");
    ((s.src = t),
      (s.style.cssText =
        "max-width:88vw;max-height:78vh;box-shadow:0 8px 40px rgba(0,0,0,0.5)"),
      n.appendChild(s));
    const r = document.createElement("div");
    r.style.cssText = "display:flex;gap:10px";
    const o = (a) => {
      const c = document.createElement("button");
      return (
        (c.textContent = a),
        (c.style.cssText = `background:#f1ead9;border:1px solid #2a2318;color:#2a2318;
        font-family:inherit;font-size:11px;letter-spacing:0.22em;padding:9px 22px;cursor:pointer`),
        r.appendChild(c),
        c
      );
    };
    ((o("SAVE PLATE").onclick = () => {
      const a = document.createElement("a");
      ((a.href = t), (a.download = e), a.click());
    }),
      (o("CLOSE").onclick = () => n.remove()),
      n.appendChild(r),
      (n.onclick = (a) => {
        a.target === n && n.remove();
      }),
      this.root.appendChild(n));
  }
  updateFrame(t, e, n) {
    const s = e / n;
    let r = 0,
      o = 0;
    (s > t ? (r = (e - n * t) / 2) : (o = (n - e / t) / 2),
      (this.root.querySelector("#fb-t").style.cssText =
        `top:0;left:0;right:0;height:${o}px`),
      (this.root.querySelector("#fb-b").style.cssText =
        `bottom:0;left:0;right:0;height:${o}px`),
      (this.root.querySelector("#fb-l").style.cssText =
        `top:0;bottom:0;left:0;width:${r}px`),
      (this.root.querySelector("#fb-r").style.cssText =
        `top:0;bottom:0;right:0;width:${r}px`));
  }
  updateLabels(t, e, n) {
    if (((this.labelsEl.innerHTML = ""), !n)) return;
    const s = new P();
    for (const r of t) {
      if (
        (s.set(r.x, r.y, r.z).project(e),
        s.z > 1 || s.x < -0.95 || s.x > 0.95 || s.y < -0.95 || s.y > 0.95)
      )
        continue;
      const o = document.createElement("div");
      ((o.className = "dlabel"),
        (o.textContent = r.name),
        (o.style.left = `${(s.x * 0.5 + 0.5) * 100}%`),
        (o.style.top = `${(-s.y * 0.5 + 0.5) * 100}%`));
      const a = e.position.distanceTo(new P(r.x, r.y, r.z));
      ((o.style.opacity = String(Math.max(0, Math.min(0.85, 1.6 - a / 220)))),
        this.labelsEl.appendChild(o));
    }
  }
}
function rv(i) {
  const t = [
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let e = "";
  for (const [n, s] of t) for (; i >= n; ) ((e += s), (i -= n));
  return e || "I";
}
const Qe = document.getElementById("app"),
  Is = window.matchMedia?.("(pointer: coarse)").matches ?? !1,
  ke = new J0(Qe, { supersample: Is ? 1.05 : 1.4 }),
  us = ke.renderer,
  je = new ih();
je.fog = new Xa(ke.paper.getHex(), ke.fogDensity);
const ie = new un(46, 2, 0.4, 1200);
ie.position.set(46, 33, 88);
const Te = new O0(ie, us.domElement);
Te.target.set(-24, 7, -8);
Te.enableDamping = !0;
Te.dampingFactor = 0.09;
Te.maxPolarAngle = Math.PI * 0.49;
Te.minDistance = 5;
Te.maxDistance = 520;
Te.update();
const Pe = new Zd("#fff4e0", 3.5);
Pe.castShadow = !0;
Pe.shadow.mapSize.set(Is ? 2048 : 4096, Is ? 2048 : 4096);
Pe.shadow.camera.left = -240;
Pe.shadow.camera.right = 240;
Pe.shadow.camera.top = 240;
Pe.shadow.camera.bottom = -240;
Pe.shadow.camera.near = 10;
Pe.shadow.camera.far = 900;
Pe.shadow.bias = -3e-4;
Pe.shadow.normalBias = 0.35;
je.add(Pe);
je.add(Pe.target);
const Nr = new qd("#dfe3dd", "#8d8064", 0.6);
je.add(Nr);
const ic = n_();
for (const i of Object.values(ic)) i.clipShadows = !0;
const Kt = new T_(je, ic);
Kt.buildTerrain();
Kt.seedNav();
for (const i of Ah()) Kt.applyAction(i);
Kt.seedGroundPockets(-18, 30, 14, 12, 34);
Kt.seedGroundPockets(-24, -80, 12, 10, 30, 77);
C_(Kt);
const ov = P_(Kt),
  Ne = new I_(Kt),
  ei = new F_(Kt, Ne, je),
  oi = new $_(),
  Lh = new ev();
window.addEventListener("pointerdown", () => Lh.start(), { once: !0 });
const te = { hour: 9.1, day: 1, speed: 15 / 570, paused: !1 };
function os(i) {
  const t = Xe((i - 5.5) / 15, 0, 1),
    e = zn(2.05, -2.05, t),
    n = 0.09 + Math.sin(Math.PI * t) * 0.43,
    s = new P(
      Math.sin(e) * Math.cos(n),
      Math.sin(n),
      Math.cos(e) * Math.cos(n),
    );
  (Pe.position.copy(s.multiplyScalar(420)), Pe.target.position.set(0, 0, 0));
  const r = 1 - Math.sin(Math.PI * t),
    o = Nn(0.45, 0.95, r);
  (Pe.color.setStyle(o > 0.4 ? "#ffdba6" : "#fff4e0"),
    (Pe.intensity = zn(3.5, 2.55, o)),
    (Nr.intensity = zn(0.6, 0.42, o)),
    ke.setDusk(o),
    ke.setSunDir(Pe.position.clone().normalize()),
    wh(Pe, Nr));
  const a = Kt.glowMat,
    c = 0.3 + o * 1.25;
  a.color.setRGB(1.05 * c + 0.1, 0.74 * c + 0.08, 0.36 * c + 0.04);
}
os(te.hour);
let fn = "build",
  Fr = !1;
const Or = { pos: new P(), target: new P() },
  Mn = new Z_(Kt, ie, je),
  Qn = new J_(Kt, us),
  ni = new Q_(Kt, ie, us.domElement),
  Us = { aspect: "3:2", fov: 42 },
  fe = new sv({
    onTool: (i, t) => {
      (Mn.setTool(i, t),
        Is && (Te.enableRotate = i === null),
        i && fe.toast(av(i), 3400));
    },
    onMode: (i) => cv(i),
    onUndo: () => rc(),
    onSection: (i) => {
      (i.axis !== void 0 && Qn.setAxis(i.axis),
        i.offset !== void 0 && Qn.setOffset(i.offset),
        i.flip !== void 0 && Qn.setFlip(i.flip));
    },
    onPlate: (i) => {
      (i.aspect && ((Us.aspect = i.aspect), sc()),
        i.fov &&
          ((Us.fov = i.fov), (ie.fov = i.fov), ie.updateProjectionMatrix()),
        i.hour && ((te.hour = i.hour), os(i.hour)));
    },
    onEngrave: () => Uh(),
    onBegin: () => {
      te.paused = !1;
    },
    onFolio: () => {
      ((yt.folio = !yt.folio),
        (yt.dirty = !0),
        fe.toast(
          yt.folio
            ? "Resources are off — build freely."
            : "Resources restored — stone must be won again.",
        ));
    },
    onAnew: () => {
      ((oc = !0),
        localStorage.removeItem("capriccio-save-v1"),
        location.reload());
    },
  });
function av(i) {
  switch (i) {
    case "anchor":
      return "Click anywhere to found a pier. Build spans and stairs from it.";
    case "span":
      return "Click a start point (pier tops snap), then an end point.";
    case "rise":
      return "Click the low place, then the high place.";
    case "vault":
      return "Click one end of the hall, then the other.";
    case "carve":
      return "Click a wall to cut an arched passage through it.";
    case "emb":
      return "Click to place. Small things make districts feel owned.";
    case "designate":
      return "Paint an invitation. The citizens decide the rest.";
  }
}
function cv(i) {
  if (
    (fn === "wander" && i !== "wander" && ni.active && ni.exit(),
    (fn = i),
    Mn.setTool(null),
    i === "section")
  ) {
    const t = Te.target.clone().sub(ie.position),
      e = Math.abs(t.x) >= Math.abs(t.z) ? "x" : "z",
      n = (e === "x" ? t.x : t.z) < 0 ? 1 : -1,
      s = Math.round(e === "x" ? Te.target.x : Te.target.z);
    (Qn.setAxis(e),
      Qn.setFlip(n),
      Qn.setOffset(s),
      fe.syncSection(e, s),
      fe.toast(
        "The section cuts where you look. Slide to move the blade.",
        4200,
      ));
  }
  (Qn.set(i === "section"),
    (Te.enabled = i !== "wander"),
    fe.setWanderHint(!1),
    (Fr = !1),
    i === "plate"
      ? ((ie.fov = Us.fov), ie.updateProjectionMatrix(), sc())
      : ((ie.fov = 46), ie.updateProjectionMatrix()),
    i === "wander" && (fe.toast("Click a place to stand.", 5e3), (Fr = !0)));
}
if (Is) {
  const i = fe.modeBtns.get("wander");
  i && (i.style.display = "none");
}
ni.onExit = () => {
  (ie.position.copy(Or.pos),
    Te.target.copy(Or.target),
    (ie.fov = 46),
    ie.updateProjectionMatrix(),
    (Te.enabled = !0),
    fe.setWanderHint(!1),
    fe.pickMode("build"));
};
function sc() {
  fe.updateFrame(Ph[Us.aspect], Qe.clientWidth, Qe.clientHeight);
}
const On = { x: 0, y: 0, t: 0, down: !1 };
us.domElement.addEventListener("pointerdown", (i) => {
  ((On.x = i.clientX),
    (On.y = i.clientY),
    (On.t = performance.now()),
    (On.down = !0));
});
us.domElement.addEventListener("pointerup", (i) => {
  if (!On.down) return;
  On.down = !1;
  const t = Math.hypot(i.clientX - On.x, i.clientY - On.y),
    e = performance.now() - On.t;
  if (t > 7 || e > 450) return;
  const n = new at(
    (i.clientX / Qe.clientWidth) * 2 - 1,
    -(i.clientY / Qe.clientHeight) * 2 + 1,
  );
  if (Fr) {
    const s = Mn.pick(n);
    if (s) {
      (Or.pos.copy(ie.position),
        Or.target.copy(Te.target),
        (Te.enabled = !1),
        (Fr = !1),
        fe.setWanderHint(!0));
      const r = new P(-18, s.p.y, 28).sub(s.p);
      ni.enter(s.p, Math.atan2(r.x, r.z));
    }
    return;
  }
  (fn === "build" || fn === "section") && Mn.click(n);
});
us.domElement.addEventListener("pointermove", (i) => {
  if (fn !== "build" && fn !== "section") return;
  const t = new at(
    (i.clientX / Qe.clientWidth) * 2 - 1,
    -(i.clientY / Qe.clientHeight) * 2 + 1,
  );
  Mn.hover(t);
});
window.addEventListener("keydown", (i) => {
  if (i.code === "Escape") {
    if (fn === "wander") return;
    (Mn.setTool(null), fe.pickTool(null));
  }
  ((i.ctrlKey || i.metaKey) && i.code === "KeyZ" && rc(),
    i.code === "KeyP" &&
      !i.ctrlKey &&
      !i.metaKey &&
      fn !== "wander" &&
      Uh(fn !== "plate"));
});
Mn.onMessage = (i) => fe.toast(i);
Mn.onCommit = (i) => {
  yt.dirty = !0;
  const t = {
    anchor: "The pier is founded.",
    span: "The span leaps.",
    rise: "The stair climbs.",
    vault: "The vault closes overhead.",
    carve: "The wall is pierced.",
    emb: "It is placed.",
    designate: "The invitation is painted.",
  };
  fe.toast(t[i.t] ?? "Built.");
};
function rc() {
  const i = yt.playerActions.pop();
  if (!i) {
    fe.toast("Nothing to undo.");
    return;
  }
  const t = Mn.costOf(i);
  ((yt.res.stone += t.stone), (yt.res.timber += t.timber));
  const e = Ne.serialize();
  (Ne.clear(),
    Kt.rebuildAll([...Ah(), ...yt.playerActions]),
    Kt.seedGroundPockets(-18, 30, 14, 12, 34),
    Kt.seedGroundPockets(-24, -80, 12, 10, 30, 77),
    Ih(e),
    ei.sync(),
    fe.toast("Unbuilt. The stone returns to the yard."));
}
function Ih(i) {
  Ne.restore(i, (t) => {
    const e = Number(t.split(":")[0]),
      n = t.split(":")[1],
      s = Kt.pockets.filter((o) => o.structId === e && o.occupiedBy < 0);
    return s.length
      ? (s.find(
          (o) =>
            (n === "stall" &&
              (o.kind === "under_arch" || o.kind === "interior")) ||
            (n === "garden" && o.light > 0.6) ||
            n === "house",
        ) ?? s[0])
      : null;
  });
}
async function Uh(i = !1) {
  const t = i
      ? (Qe.clientWidth || 3) / Math.max(Qe.clientHeight, 2)
      : Ph[Us.aspect],
    e = 2e3,
    n = Math.round(e / t);
  (fe.toast("The burin bites the copper…", 2500),
    await new Promise((l) => setTimeout(l, 30)));
  const s = ke.snap(je, ie, e, n),
    r = yt.plates.length + 1,
    a = `${bi.length ? bi[0].name : yt.cityName} · day ${te.day}`,
    c = await Dh(s, a, r);
  (yt.plates.push({
    cam: [...ie.position.toArray(), ...Te.target.toArray()],
    hour: te.hour,
    caption: a,
    n: r,
  }),
    fe.showPlate(c, `capriccio-plate-${String(r).padStart(2, "0")}.png`),
    (yt.res.favor += 6),
    (yt.dirty = !0));
}
let bi = [];
function lv() {
  const i = Kt.pockets.filter((a) => a.occupiedBy >= 0),
    t = i.length ? i.filter((a) => a.navNode >= 0).length / i.length : 0.3,
    e = i.length ? i.reduce((a, c) => a + c.shelter, 0) / i.length : 0.3,
    n = i.length ? i.reduce((a, c) => a + c.light, 0) / i.length : 0.5,
    s = Kt.actions.filter((a) => a.t === "emb" && a.kind === "lantern").length,
    r = Xe(bi.length * 0.18 + s * 0.05 + Ne.items.length * 0.015, 0, 1);
  let o = 0;
  for (const [, a] of Kt.structures) {
    const c = a.action;
    (c.t === "span" && (o += 0.14),
      c.t === "vault" && (o += 0.12),
      c.t === "rise" && (o += 0.08),
      c.t === "anchor" && c.style === "giant" && (o += 0.08));
  }
  fe.updateQuals({
    ACCESS: t,
    SHELTER: e,
    LIGHT: n,
    BELONGING: r,
    GRANDEUR: Xe(o, 0, 1),
  });
}
let oc = !1;
function ac() {
  oc || q_({ day: te.day, hour: te.hour, infill: Ne.serialize() });
}
new URLSearchParams(location.search).has("fresh") &&
  localStorage.removeItem("capriccio-save-v1");
const hn = Y_();
if (hn) {
  ((yt.playerActions = hn.actions), (yt.nextId = 1e3 + hn.actions.length + 5));
  for (const t of hn.actions)
    ((t.id = t.id ?? yt.nextId++),
      Kt.applyAction(structuredClone(t)),
      (yt.nextId = Math.max(yt.nextId, (t.id ?? 0) + 1)));
  ((yt.res = hn.res),
    (yt.plates = hn.plates ?? []),
    (yt.doneRequests = new Set(hn.doneRequests ?? [])),
    (yt.folio = hn.folio ?? !1),
    (te.day = hn.day),
    (te.hour = hn.hour),
    Ih(hn.infill ?? []),
    oi.resync(),
    os(te.hour));
  const i = document.querySelector("#veil .begin");
  i && (i.textContent = "CONTINUE");
} else {
  const i = [
    ["house", 6],
    ["stall", 2],
    ["garden", 1],
  ];
  for (const [t, e] of i)
    for (let n = 0; n < e; n++) {
      const s = Kt.pockets.filter(
        (r) =>
          r.occupiedBy < 0 &&
          r.kind === "terrace_p" &&
          Math.hypot(r.pos[0] + 18, r.pos[2] - 30) < 46,
      )[0];
      s && Ne.spawn(s, t, !0);
    }
}
ei.sync();
{
  const i = document.querySelector("#veil"),
    t = document.createElement("div");
  ((t.textContent = yt.folio
    ? "(playing without resources)"
    : "or play without resources"),
    (t.style.cssText =
      "margin-top:14px;font-size:11px;letter-spacing:0.12em;opacity:0.6;cursor:pointer;font-style:italic"),
    (t.onclick = () => {
      ((yt.folio = !0),
        (yt.dirty = !0),
        (t.textContent = "(playing without resources)"),
        document.querySelector("#veil .begin")?.click());
    }),
    i.appendChild(t));
  const e = document.createElement("div");
  ((e.textContent = hn ? "or begin anew (erases the saved city)" : ""),
    (e.style.cssText =
      "margin-top:9px;font-size:11px;letter-spacing:0.12em;opacity:0.55;cursor:pointer;font-style:italic"),
    (e.onclick = () => {
      ((oc = !0),
        localStorage.removeItem("capriccio-save-v1"),
        location.reload());
    }),
    i.appendChild(e));
}
oi.onDone = (i) => {
  (fe.toast(i.thanks + `  (+${i.favor} favor)`, 7e3), fe.setRequest(null));
};
oi.onNew = (i) => fe.setRequest(i.text);
oi.active && fe.setRequest(oi.active.text);
Kt.onStructureBuilt = () => {};
let Ns = performance.now(),
  Do = 0,
  Lo = 0;
te.paused = !0;
function Nh(i) {
  const t = Math.min(i, 120) / 1e3;
  if (((Aa.value += t), ov(Aa.value), !te.paused)) {
    ((te.hour += t * te.speed),
      te.hour > 20.5 && ((te.hour = 5.6), te.day++, (yt.dirty = !0)),
      os(te.hour),
      V_(t * te.speed),
      ei.update(t, te.hour),
      ni.active && ni.update(t),
      (Lo += t),
      Lo > 2.2 &&
        ((Lo = 0),
        Ne.grow(
          te.hour,
          10 +
            yt.res.favor * 0.28 +
            Kt.pockets.filter((n) => n.kind !== "terrace_p").length * 0.12,
        ),
        oi.check(Kt, Ne),
        ei.sync()),
      (Do += t),
      Do > 8 && ((Do = 0), (bi = Rh(Kt, Ne)), lv(), yt.dirty && ac()));
    const e = ie.position;
    Lh.update(t, {
      dusk: ke.postMat.uniforms.uDusk.value,
      waterDist: Kt.waterDistAt(e),
      constructing: Ne.items.some((n) => n.stage < 1),
      hour: te.hour,
    });
  }
  (ni.active || Te.update(),
    fe.updateResources(ei.population),
    fe.updateClock(te.day, te.hour),
    fe.updateLabels(bi, ie, (fn === "build" || fn === "section") && !Mn.tool));
}
function cc() {
  const i = performance.now();
  (Nh(i - Ns),
    (Ns = i),
    ke.render(je, ie),
    document.hidden || requestAnimationFrame(cc));
}
function lc() {
  if (document.hidden) {
    const i = performance.now();
    (Nh(i - Ns), (Ns = i), ke.render(je, ie), setTimeout(lc, 500));
  }
}
document.addEventListener("visibilitychange", () => {
  ((Ns = performance.now()),
    document.hidden ? (ac(), lc()) : requestAnimationFrame(cc));
});
function Fh() {
  const i = Qe.clientWidth || window.innerWidth,
    t = Qe.clientHeight || window.innerHeight;
  ((ie.aspect = i / t),
    ie.updateProjectionMatrix(),
    ke.resize(i, t),
    fn === "plate" && sc());
}
window.addEventListener("resize", Fh);
new ResizeObserver(Fh).observe(Qe);
ie.aspect =
  (Qe.clientWidth || window.innerWidth) /
  (Qe.clientHeight || window.innerHeight);
ie.updateProjectionMatrix();
requestAnimationFrame(cc);
document.hidden && lc();
window.CAP = {
  scene: je,
  camera: ie,
  controls: Te,
  engraving: ke,
  mats: ic,
  shared: Ge,
  world: Kt,
  time: te,
  SPOTS: Vr,
  hemi: Nr,
  sunLight: Pe,
  syncLightModel: wh,
  tools: Mn,
  hud: fe,
  infill: Ne,
  citizens: ei,
  requests: oi,
  state: yt,
  wander: ni,
  section: Qn,
  undo: rc,
  doSave: ac,
  async plateTest() {
    const i = ke.snap(je, ie, 800, 533);
    return (await Dh(i, "test plate · day 1", 1)).length;
  },
  snap(i = 1100, t = 660) {
    return ke.snap(je, ie, i, t);
  },
  async post(i, t = 1100, e = 660) {
    const n = ke.snap(je, ie, t, e);
    return (
      await fetch(`http://localhost:8992/shot?name=${i}`, {
        method: "POST",
        body: n,
      })
    ).text();
  },
  cam(i, t, e, n = 0, s = 4, r = 0) {
    (ie.position.set(i, t, e), Te.target.set(n, s, r), Te.update());
  },
  hour(i) {
    ((te.hour = i), os(i));
  },
  begin() {
    ((te.paused = !1),
      (document.querySelector("#veil").style.display = "none"));
  },
  act(i) {
    return (
      (i.id = i.id ?? yt.nextId++),
      yt.playerActions.push(structuredClone(i)),
      Kt.applyAction(i)
    );
  },
  grow(i = 20) {
    for (let t = 0; t < i; t++) {
      Ne.grow(12, 999);
      for (let e = 0; e < 9; e++) Ne.grow(12, 0);
    }
    return (ei.sync(), (bi = Rh(Kt, Ne)), Ne.items.length);
  },
  skip(i) {
    for (te.hour += i; te.hour > 20.5; ) ((te.hour -= 14.9), te.day++);
    os(te.hour);
  },
  pathTest(i, t, e, n) {
    const s = Kt.nav.nearest(new P(i, 0, t), 40),
      r = Kt.nav.nearest(new P(e, 0, n), 40);
    return s < 0 || r < 0
      ? { a: s, b: r, len: -1 }
      : { a: s, b: r, len: Kt.nav.path(s, r).length };
  },
  status() {
    return {
      structures: Kt.structures.size,
      pockets: Kt.pockets.length,
      occupied: Kt.pockets.filter((i) => i.occupiedBy >= 0).length,
      infill: Ne.items.length,
      navNodes: Kt.nav.nodes.length,
      pop: ei.population,
      res: { ...yt.res },
      request: oi.active?.id ?? null,
      districts: bi.map((i) => i.name),
      draws: ke.lastDraws,
      tris: ke.lastTris,
    };
  },
};
