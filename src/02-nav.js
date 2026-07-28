// Navigation graph (spatial hash) and the pocket registry
//
// Extracted verbatim from public/assets/index-DCXbw2vV.js,
// lines 26208–26364.
// Identifiers are minifier-mangled; nothing here has been renamed.
// Regenerate with: python3 tools/split_bundle.py --write

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
