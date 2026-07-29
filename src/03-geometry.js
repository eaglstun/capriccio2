// Geometry utilities: merging, primitives, weathering helpers
//
// Extracted from public/assets/index-DCXbw2vV.js, bundle lines
// 26365–26961. Statements are verbatim; identifiers are
// renamed via src/renames.json. Imports and exports are generated.
// Regenerate: python3 tools/split_bundle.py --write

// --- generated imports ---
import { BoxGeometry, BufferAttribute, BufferGeometry, ConeGeometry, CylinderGeometry, ExtrudeGeometry, Matrix4, Path, Quaternion, Shape, Vector3 } from "three";
import { clamp, seededRng, terrainHeightAt } from "./01-materials.js";
import { defineField } from "./_runtime.js";
// --- end generated imports ---

/**
 * Merge many BufferGeometries into one. A local copy of three.js's
 * `mergeGeometries` — vendored so the addon does not need importing.
 *
 * All inputs must share the same attribute set and index-ness or it returns
 * null. This is the single most important function for the draw-call budget:
 * the entire city ends up as a handful of merged meshes rather than hundreds.
 */
function ec(i, t = !1) {
  const e = i[0].index !== null,
    n = new Set(Object.keys(i[0].attributes)),
    s = new Set(Object.keys(i[0].morphAttributes)),
    r = {},
    o = {},
    a = i[0].morphTargetsRelative,
    c = new BufferGeometry();
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
/** Concatenate BufferAttributes of matching type. Helper for the merge above. */
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
    a = new BufferAttribute(o, e, n);
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
const Pl = new Matrix4(),
  Dl = new Quaternion(),
  m_ = new Vector3(1, 1, 1);
/**
 * Accumulates primitives and merges them into a single geometry.
 *
 * The workhorse of every structure builder. You add boxes and cylinders with
 * positions and rotations, then call `merge()` once — so a whole building is
 * one draw call instead of thirty.
 *
 * `age` (0..1) is the weathering parameter carried into the tone attribute, so
 * a builder can hand down "this is old" to everything it adds without passing
 * it to each call.
 */
class MeshBuilder {
  constructor(t = 0) {
    defineField(this, "geoms", []);
    defineField(this, "age");
    this.age = t;
  }
  /** Add a geometry at position `e`, rotated `n` about Y, tone `s`, age `r`. */
  add(t, e, n = 0, s = 1, r = this.age) {
    if (e) {
      const o = Array.isArray(e) ? new Vector3(...e) : e;
      (Dl.setFromAxisAngle(new Vector3(0, 1, 0), n),
        Pl.compose(o, Dl, m_),
        t.applyMatrix4(Pl));
    }
    return (setToneAttribute(t, s, r), this.geoms.push(t), this);
  }
  /** Add a geometry already positioned in local space — no transform applied. */
  addRaw(t, e = 1, n = this.age) {
    return (setToneAttribute(t, e, n), this.geoms.push(t), this);
  }
  /** Add a box of size (t, e, n) at position `s`, rotated `r`, tone `o`. */
  box(t, e, n, s, r = 0, o = 1) {
    const a = new BoxGeometry(t, e, n);
    return (a.translate(0, e / 2, 0), this.add(a, s, r, o));
  }
  /** Add a cylinder: radius `t`, height `e`, at `n`, `s` radial segments,
   * tone `r`, top radius `o` (differs from `t` to make a taper or a cone). */
  cylinder(t, e, n, s = 14, r = 1, o = t) {
    const a = new CylinderGeometry(o, t, e, s);
    return (a.translate(0, e / 2, 0), this.add(a, n, 0, r));
  }
  /** Collapse everything accumulated into one geometry. Call once, at the end. */
  merge() {
    if (this.geoms.length === 0) return new BufferGeometry();
    const t = this.geoms.map((n) => (n.index ? n.toNonIndexed() : n)),
      e = ec(t, !1);
    return (t.forEach((n) => n.dispose()), e);
  }
}
/**
 * Install the custom `aTone` vertex attribute the engraving shader reads.
 *
 * TWO FLOATS PER VERTEX, and every geometry the stone material touches must
 * have it. A missing attribute does not throw — the shader reads garbage and
 * one mesh renders wrong — so all geometry goes through this one helper.
 */
function setToneAttribute(i, t = 1, e = 0) {
  const n = i.attributes.position.count;
  if (!i.attributes.aTone || i.attributes.aTone.count !== n) {
    const s = new Float32Array(n * 2);
    for (let r = 0; r < n; r++) ((s[r * 2] = t), (s[r * 2 + 1] = e));
    i.setAttribute("aTone", new BufferAttribute(s, 2));
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
  return (i.setAttribute("aTone", new BufferAttribute(c, 2)), i);
}
/**
 * THE ARCH GENERATOR. Builds a wall of width `i` and height `t` pierced by the
 * openings in `n`, each `{cx, r, springY}` — centre, radius, springing height.
 *
 * Everything arched in the game comes through here: spans, gates, carved
 * passages, the arcades of the seeded ruins. It builds a `Shape` with holes and
 * extrudes it, so the arch is real geometry rather than a texture.
 *
 * `ruin` (0..1) breaks the top edge down; `rings` adds the raised band around
 * each opening. The silhouette this produces is the game's identity — see
 * FEATURES.md on why arches must stay arches.
 */
function Hn(i, t, e, n, s = {}) {
  const r = s.ruin ?? 0,
    o = s.rng ?? seededRng(1234),
    a = s.rings !== !1,
    c = new Shape(),
    l = i / 2,
    h = (f) => {
      let m = t * 0.1;
      for (const _ of n)
        Math.abs(f - _.cx) < _.r + 3 &&
          (m = Math.max(m, _.springY + _.r + (a ? 1.05 : 0.55)));
      return m;
    };
  const rb = [];
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
      rb.push([A, b]);
      const v = Math.max(h(g), b - r * o() * t * 0.1);
      (c.lineTo(g, v), rb.push([g, v]), (m = g));
    }
    c.lineTo(-l, Math.max(h(-l), t * (1 - r * o() * 0.9)));
  } else (c.lineTo(l, t), c.lineTo(-l, t));
  c.closePath();
  for (const f of n) {
    const m = new Path(),
      { cx: _, r: g, springY: p } = f;
    (m.moveTo(_ - g, 0.001),
      m.lineTo(_ - g, p),
      m.absarc(_, p, g, Math.PI, 0, !0),
      m.lineTo(_ + g, 0.001),
      m.closePath(),
      c.holes.push(m));
  }
  const u = new ExtrudeGeometry(c, {
    depth: e,
    bevelEnabled: !1,
    curveSegments: s.curveSeg ?? 20,
  });
  u.translate(0, 0, -e / 2);
  // rebar at the breaks: bent bars stand proud of every spalled edge
  const rods = [];
  if (r > 0.05)
    for (const [rx, ry] of rb) {
      if (o() < 0.4) continue;
      const rn = 1 + Math.floor(o() * 2);
      for (let rk = 0; rk < rn; rk++) {
        const rlen = 0.5 + o() * 0.95,
          rod = new BoxGeometry(0.05, rlen, 0.05);
        (rod.translate(0, rlen / 2 - 0.18, 0),
          rod.rotateZ((o() - 0.5) * 0.9),
          rod.rotateX((o() - 0.5) * 0.5),
          rod.translate(
            rx + (o() - 0.5) * 0.7,
            ry - 0.04,
            (o() - 0.5) * e * 0.6,
          ),
          rods.push(rod));
      }
    }
  if (!a || !n.length)
    return rods.length
      ? ec([u, ...rods].map((f) => (f.index ? f.toNonIndexed() : f)), !1)
      : u;
  const d = [u, ...rods];
  for (const f of n) {
    const m = Math.min(0.5, Math.max(0.24, f.r * 0.16)),
      _ = e + 0.34,
      g = new Shape();
    (g.moveTo(f.r + m, 0),
      g.absarc(0, 0, f.r + m, 0, Math.PI, !1),
      g.lineTo(-f.r, 0),
      g.absarc(0, 0, f.r, Math.PI, 0, !0),
      g.closePath());
    const p = new ExtrudeGeometry(g, { depth: _, bevelEnabled: !1, curveSegments: 20 });
    (p.translate(f.cx, f.springY, -_ / 2), d.push(p));
    for (const b of [-1, 1]) {
      // flat bearing pad where the rib lands — a poured joint, not an impost
      const v = new BoxGeometry(m * 2.3, 0.2, e + 0.42);
      (v.translate(f.cx + b * (f.r + m * 0.5), f.springY - 0.1, 0), d.push(v));
    }
    // service conduit slung across the face above the crown; no keystone
    const A = new BoxGeometry(Math.min(f.r * 2.4, i - 0.6), 0.13, 0.13);
    (A.translate(f.cx, f.springY + f.r + m + 0.3, e * 0.5 + 0.04), d.push(A));
  }
  return ec(
    d.map((f) => (f.index ? f.toNonIndexed() : f)),
    !1,
  );
}
/**
 * An arcade: `n` evenly spaced arches across width `i`, computed and handed to
 * the arch generator above.
 *
 * `archFrac` is how much of each bay is opening rather than pier (0.72 by
 * default), and `springFrac` how high the arch springs.
 */
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
    r = new Shape();
  (r.moveTo(i, 0),
    r.absarc(0, 0, i, 0, Math.PI, !1),
    r.lineTo(-(i - t), 0),
    r.absarc(0, 0, i - t, Math.PI, 0, !0),
    r.closePath());
  const o = new ExtrudeGeometry(r, { depth: e, bevelEnabled: !1, curveSegments: s });
  if ((o.rotateY(Math.PI / 2), n.ribs !== !1 && e > 7)) {
    const a = [o],
      c = Math.max(2, Math.round(e / 5.5));
    for (let h = 0; h <= c; h++) {
      const u = (e * h) / c,
        d = new Shape();
      // flat pour-joint band, not a protruding rib — segments of a cast tube
      (d.moveTo(i + 0.09, 0),
        d.absarc(0, 0, i + 0.09, 0, Math.PI, !1),
        d.lineTo(-i + 0.1, 0),
        d.absarc(0, 0, i - 0.1, Math.PI, 0, !0),
        d.closePath());
      const f = new ExtrudeGeometry(d, { depth: 1.1, bevelEnabled: !1, curveSegments: 18 });
      (f.rotateY(Math.PI / 2),
        f.translate(Math.min(u, e - 1.1), 0, 0),
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
    o = new Shape();
  (o.moveTo(-r / 2, 0), o.lineTo(r / 2, 0), o.lineTo(0, e), o.closePath());
  const a = new ExtrudeGeometry(o, { depth: s, bevelEnabled: !1 });
  return (a.rotateY(Math.PI / 2), a.translate(-s / 2, 0, 0), a);
}
/** The synthetic palm that replaced the cypress: leaning segmented trunk,
 * drooping fronds. Seeded from `t`. */
function buildTree(i, t) {
  // synthetic palm: the cypress slots survive, the species did not
  const e = new MeshBuilder(),
    n = i * 0.14 * (0.85 + t() * 0.3),
    s = (t() - 0.5) * 0.5;
  let r = 0,
    o = 0;
  const a = 4;
  for (let c = 0; c < a; c++) {
    const l = new CylinderGeometry(n * 0.16, n * 0.21, (i * 0.99) / a, 5);
    (l.translate(0, (i * 0.99) / a / 2, 0),
      l.rotateZ(s * ((c + 1) / a) * 0.55),
      l.translate(r, o, 0),
      e.addRaw(l));
    ((r += Math.sin(s * ((c + 1) / a) * 0.55) * ((i * 0.99) / a) * -1),
      (o += Math.cos(s * ((c + 1) / a) * 0.55) * ((i * 0.99) / a)));
  }
  const c = 5 + Math.floor(t() * 3);
  for (let l = 0; l < c; l++) {
    const h = (l / c) * Math.PI * 2 + t() * 0.6,
      u = 0.42 + t() * 0.3,
      d = new BoxGeometry(i * 0.5, 0.055, 0.3);
    (d.translate(i * 0.25, 0, 0),
      d.rotateZ(-0.45 - u),
      d.rotateY(h),
      d.translate(r, o + 0.05, 0),
      e.addRaw(d));
  }
  const f = new BoxGeometry(0.28, 0.34, 0.28);
  return (f.translate(r, o - 0.05, 0), e.addRaw(f), e.merge());
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
      const _ = new ConeGeometry(0.26 * f * (0.7 + t() * 0.6), (0.7 + t() * 0.9) * f, 5);
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
      const m = new BoxGeometry(0.1, 0.9 + t() * 1.6, 0.1);
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
/**
 * Rubble. Tilted concrete slab fragments with rebar proud of the breaks — and
 * roughly one drum in ten is an antique column drum instead.
 *
 * That tenth piece is SPOLIA: older material reused in newer construction,
 * which is exactly what late antiquity did with the ruins it inherited. It is
 * the only surviving trace of the first era in the fabric.
 */
function Pa(i) {
  // concrete debris: tilted slab fragments, rebar proud of the breaks.
  // one drum in ten is older than everything else here — spolia
  const t = new MeshBuilder(),
    e = i();
  if (e < 0.1) {
    const s = 0.35 + i() * 0.5,
      r = 0.5 + i() * 1.6;
    t.cylinder(s, r, [0, 0, 0], 10, 1, s * (0.86 + i() * 0.1));
  } else if (e < 0.62) {
    const sw = 1.2 + i() * 1.6,
      sd = 0.9 + i() * 1.2,
      sl = new BoxGeometry(sw, 0.22 + i() * 0.12, sd);
    (sl.rotateZ(0.12 + i() * 0.4),
      sl.rotateY(i() * Math.PI),
      sl.translate(0, 0.28, 0),
      t.addRaw(sl));
    const rn = 2 + Math.floor(i() * 2);
    for (let rk = 0; rk < rn; rk++) {
      const rl = 0.4 + i() * 0.7,
        rod = new BoxGeometry(0.045, rl, 0.045);
      (rod.rotateZ((i() - 0.5) * 1.2),
        rod.rotateX((i() - 0.5) * 0.7),
        rod.translate((i() - 0.5) * sw * 0.8, 0.3 + rl * 0.3, (i() - 0.5) * sd * 0.7),
        t.addRaw(rod));
    }
  } else
    e < 0.85
      ? (t.box(0.9, 0.3, 0.9, [0, 0, 0], i()),
        t.box(0.7, 0.35, 0.7, [0.05, 0.3, 0.05], i()))
      : (t.box(0.7 + i() * 1.4, 0.4 + i() * 0.8, 0.6 + i() * 1, [0, 0, 0], i() * Math.PI),
        t.box(0.5, 0.5, 0.45, [0.3, 0.2, -0.2], i()));
  const n = t.merge();
  return (Ri(n, 0, 1.2, 0.86, 1), n);
}
/**
 * The empty accumulator every structure builder fills and returns.
 *
 * `pieces` maps material name -> geometries (so the caller can merge per
 * material), `navPts` are walkable points to add to the graph, `pockets` the
 * habitable voids this structure emits, `water`/`waterSources` any water it
 * carries, and `cost` what it charges the player.
 *
 * A builder's whole contract is: take an action, return one of these.
 */
function newStructureParts() {
  return {
    pieces: {},
    navPts: [],
    pockets: [],
    water: [],
    waterSources: [],
    cost: { stone: 0, salvage: 0 },
  };
}
/** Add geometry `e` to parts `i` under material `t`, installing aTone on the way. */
function Yt(i, t, e) {
  var n;
  (setToneAttribute(e), ((n = i.pieces)[t] || (n[t] = [])).push(e));
}
function Ur(i, t, e, n, s) {
  if (!n) return;
  const r = x_(t, e, s);
  r && Yt(i, "green", r);
}
/** Rotate about Y then translate a geometry in place. Returns it, for chaining. */
function be(i, t, e, n, s = 0) {
  return (s && i.rotateY(s), i.translate(t, e, n), i);
}
const dn = (i, t, e) => new Vector3(i, t, e);
/**
 * A pier, giant pier or column — the foundations everything else springs from.
 *
 * Registers an entry in `world.anchors` carrying its `top` point, and that is
 * what the placement tool snaps spans and stairs to. A span cannot begin in
 * mid-air; it begins on one of these.
 *
 * A giant pier's base is itself habitable ("colossal — its base becomes a
 * place"), so it emits pockets where an ordinary pier does not.
 */
function buildAnchor(i) {
  const t = newStructureParts(),
    e = seededRng(i.id * 7919 + 11),
    n = terrainHeightAt(i.x, i.z),
    s = i.topY - n,
    r = i.age ?? 0.15;
  if (i.style === "column") {
    // a stack, not a column: poured footing, tapered flue, service deck, aerial
    const o = new MeshBuilder(r),
      a = clamp(s * 0.075, 1.1, 2);
    (o.box(a * 3.2, 1.2, a * 3.2, [0, 0, 0]),
      o.box(a * 2.7, 1, a * 2.7, [0, 1.2, 0]),
      o.cylinder(a, s - 4.4, [0, 2.2, 0], 18, 1, a * 0.88),
      o.box(a * 1.6, 1.7, a * 1.6, [0, s - 2.2, 0]),
      o.box(a * 3, 0.5, a * 3, [0, s - 0.5, 0]),
      o.box(0.14, 2.8, 0.14, [a * 1.05, s, 0]),
      o.box(0.9, 0.05, 0.05, [a * 1.05, s + 2.1, 0]));
    for (const cp of [-1, 1])
      (o.box(0.1, 0.6, 0.1, [cp * (a * 1.4), s, a * 1.4]),
        o.box(0.1, 0.6, 0.1, [cp * (a * 1.4), s, -a * 1.4]));
    const c = o.merge();
    (Ri(c, 0, 4, 0.85, 1, r),
      Yt(t, "stone", be(c, i.x, n, i.z)),
      (t.cost.stone = Math.round(s * 3)));
    const g = new CylinderGeometry(a * 1.08, a * 1.08, 0.13, 12);
    (g.translate(i.x, n + s - 0.78, i.z), Yt(t, "glow", g));
    const g2 = new BoxGeometry(0.2, 0.3, 0.2);
    (g2.translate(i.x + a * 1.05, n + s + 2.8, i.z), Yt(t, "glow", g2));
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
      const a = g_(o, o, s + 1.5),
        gg = new MeshBuilder(0);
      for (const gk of [0, 1, 2, 3]) {
        const gth = (gk * Math.PI) / 2,
          gb = new BoxGeometry(o * 0.7, 0.12, 0.06);
        (gb.rotateY(gth),
          gb.translate(
            Math.sin(gth) * (o * 0.5 + 0.08),
            s + 0.2,
            Math.cos(gth) * (o * 0.5 + 0.08),
          ),
          gg.addRaw(gb));
      }
      Yt(t, "glow", be(gg.merge(), i.x, n - 0.5, i.z));
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

// --- generated exports ---
export { Cl, Hn, Il, Ji, Ll, MeshBuilder, Pa, Pl, Ri, Ur, Yt, __, be, buildAnchor, buildTree, dn, ec, newStructureParts, setToneAttribute, v_ };
