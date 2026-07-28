// Infill: vernacular buildings and the pickPocket growth engine
//
// Extracted verbatim from public/assets/index-DCXbw2vV.js,
// lines 28218–28493.
// Identifiers are minifier-mangled; nothing here has been renamed.
// Regenerate with: python3 tools/split_bundle.py --write

class InfillSystem {
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
        l < 40 && (s += clamp(1 - l / 40, 0, 1));
      }
      const r = Math.hypot(n.pos[0] + 18, n.pos[2] - 28),
        o =
          n.shelter * 1.2 +
          n.light * 0.5 +
          n.scenic * 0.4 +
          clamp(s, 0, 3) * 0.8 +
          clamp(1 - r / 130, 0, 1) * 1.4 +
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
    const e = seededRng(hashString(t.structId + ":" + t.idx));
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
      a = seededRng(hashString(o)),
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
    a = new MeshBuilder(0);
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
      setToneAttribute(l);
      const d = new he(l, h);
      return ((d.castShadow = u), (d.receiveShadow = !0), t.add(d), d);
    },
    c = i.glowMat;
  if (s === "house") {
    const l = 3.6 + r() * 1.6,
      h = 3 + r() * 1.2,
      u = 2.7 + r() * 1.1,
      d = n.height > 7 && r() < 0.45,
      f = new MeshBuilder(0.05);
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
      h = new MeshBuilder(0);
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
    const l = new MeshBuilder(0.1);
    (l.box(3.4, 0.35, 2.4, [0, 0, 0]),
      l.box(2.8, 0.3, 2, [0.4, 0, 2.9]),
      a(l.merge(), o.stoneOld));
    const h = new le(3, 0.5, 2);
    (h.translate(0, 0.4, 0), a(h, o.green, !1));
    const u = new le(2.4, 0.45, 1.6);
    (u.translate(0.4, 0.35, 2.9), a(u, o.green, !1));
    const d = buildTree(2.8 + r() * 1.8, r);
    (d.translate(-1.8, 0, 1.4), a(d, o.green));
    const f = new MeshBuilder(0);
    (f.box(0.1, 2.2, 0.1, [1.8, 0, -0.9]),
      f.box(0.1, 2.2, 0.1, [1.8, 0, 0.9]),
      f.box(0.12, 0.12, 2, [1.8, 2.2, 0]),
      a(f.merge(), o.timber));
  } else if (s === "shrine") {
    const l = new MeshBuilder(0.15);
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
      h = new MeshBuilder(0.08);
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
