// Geometry utilities: merging, primitives, weathering helpers
//
// Extracted verbatim from public/assets/index-DCXbw2vV.js,
// lines 26365–26961.
// Identifiers are minifier-mangled; nothing here has been renamed.
// Regenerate with: python3 tools/split_bundle.py --write

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
class MeshBuilder {
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
    return (setToneAttribute(t, s, r), this.geoms.push(t), this);
  }
  addRaw(t, e = 1, n = this.age) {
    return (setToneAttribute(t, e, n), this.geoms.push(t), this);
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
function setToneAttribute(i, t = 1, e = 0) {
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
    o = s.rng ?? seededRng(1234),
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
  const s = new MeshBuilder(),
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
    c = new MeshBuilder();
  for (let l = 0; l < r; l++) {
    const h = n.solid === !1 ? o : o * (l + 1);
    c.box(a + 0.02, h, i, [a * (l + 0.5), n.solid === !1 ? o * l : 0, 0]);
  }
  return c.merge();
}
function __(i, t = 1.05, e = 0.28) {
  const n = new MeshBuilder();
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
function buildTree(i, t) {
  const e = new MeshBuilder(),
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
  const l = new MeshBuilder(),
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
  const t = new MeshBuilder(),
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
function newStructureParts() {
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
  (setToneAttribute(e), ((n = i.pieces)[t] || (n[t] = [])).push(e));
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
function buildAnchor(i) {
  const t = newStructureParts(),
    e = seededRng(i.id * 7919 + 11),
    n = terrainHeightAt(i.x, i.z),
    s = i.topY - n,
    r = i.age ?? 0.15;
  if (i.style === "column") {
    const o = new MeshBuilder(r),
      a = clamp(s * 0.075, 1.1, 2);
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
        c = new MeshBuilder(r);
      (c.box(o * 1.18, 1.2, o * 1.18, [0, -0.5, 0]),
        Yt(t, "stone", be(c.merge(), i.x, n, i.z, 0)));
      const l = Hn(o, s + 1, o, [{ cx: 0, r: 2.1, springY: 3.1 }], { rng: e });
      (be(l, i.x, n + 0.4, i.z, a), Yt(t, "stone", l));
      const h = new MeshBuilder(r);
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
          terrainHeightAt(i.x + u * (o / 2 + 2.5), i.z + d * (o / 2 + 2.5)),
          i.z + d * (o / 2 + 2.5),
        ],
        m = [
          i.x - u * (o / 2 + 2.5),
          terrainHeightAt(i.x - u * (o / 2 + 2.5), i.z - d * (o / 2 + 2.5)),
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
