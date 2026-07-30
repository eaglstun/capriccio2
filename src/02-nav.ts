// Navigation graph (spatial hash) and the pocket registry
//
// Extracted from public/assets/index-DCXbw2vV.js, bundle lines
// 26208–26364. Statements are verbatim; identifiers are
// renamed via src/renames.json. Imports and exports are generated.
// Regenerate: python3 tools/split_bundle.py --write

// --- generated imports ---
import { Vector3 } from "three";
import { $n, isFlatGround, terrainHeightAt } from "./01-materials";
// --- end generated imports ---

/**
 * The walkable graph the citizens move on.
 *
 * Nodes are points in 3D with weighted links to their neighbours, bucketed
 * into a spatial hash (10-unit cells) so `nearest` doesn't scan everything.
 * Ground nodes come from `seedTerrain`; structures add their own when built,
 * tagged with the id of the structure that created them.
 *
 * NODE INDICES ARE STABLE AND REFERENCED FROM OUTSIDE. Pockets store a
 * `navNode` index, agents store `homeNode`/`workNode`. Nothing may ever splice
 * the array — see `removeStruct`.
 */
class NavGraph {
  /** Every node ever added. Never spliced — indices are external references. */
  nodes = [];
  /** Spatial hash: 10-unit cell key -> node indices in that cell. */
  cell = new Map();
  /** Spatial-hash bucket for a world (x, z). 10-unit cells. */
  key(t, e) {
    return `${Math.round(t / 10)},${Math.round(e / 10)}`;
  }
  /**
   * Add a node at position `t`, owned by structure `e` (-1 = terrain), where
   * `n` marks it as ground. Returns its index — callers keep that index, so it
   * must stay valid for the life of the graph.
   */
  add(t, e = -1, n = !1) {
    const s = this.nodes.length;
    this.nodes.push({ p: t.clone(), links: new Map(), ground: n, structId: e });
    const r = this.key(t.x, t.z);
    let o = this.cell.get(r);
    return (o || ((o = []), this.cell.set(r, o)), o.push(s), s);
  }
  /**
   * Connect two nodes, both ways, with a movement cost.
   *
   * Cost is horizontal distance plus 1.5x the height difference — climbing is
   * penalised, so a citizen prefers a longer flat route to a shorter steep
   * one. `n` scales the whole thing for links that should be discouraged or
   * favoured.
   */
  link(t, e, n = 1) {
    if (t === e || t < 0 || e < 0) return;
    const s = this.nodes[t].p,
      r = this.nodes[e].p,
      o = Math.abs(s.y - r.y),
      a = (s.distanceTo(r) + o * 1.5) * n;
    (this.nodes[t].links.set(e, a), this.nodes[e].links.set(t, a));
  }
  /**
   * Nearest node to point `t` within radius `e`, or -1.
   *
   * Only scans the spatial-hash cells the radius can reach. Vertical distance
   * is weighted 1.6x, so a node on your own floor beats an equidistant one on
   * the storey above — which is what makes multi-level cities path sensibly.
   *
   * `n` is an optional predicate (node, index) => boolean for callers that
   * need a filtered search. Tombstoned nodes (structId -999) are always
   * skipped.
   */
  nearest(t, e = 9, n?) {
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
  /**
   * A* from node `t` to node `e`. Returns the node indices to walk, or [] if
   * unreachable.
   *
   * Straight-line distance to the goal as the heuristic (admissible, since
   * link costs are >= euclidean distance). `s` is g-score, `r` is came-from,
   * `a` is the closed set, `n` is the binary heap below.
   *
   * Capped at 20,000 expansions. On a disconnected or pathological graph this
   * returns [] rather than stalling the frame — a citizen who cannot find a
   * route simply doesn't move, which is invisible; a locked-up tab is not.
   */
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
    for (; n.size > 0 && c++ < 2e4;) {
      const l = n.pop();
      if (l === e) {
        const u = [e];
        let d = e;
        for (; r.has(d);) ((d = r.get(d)), u.push(d));
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
  /**
   * Lay the ground grid: a node every `$n` units across each region in `t`,
   * but only where `isFlatGround` says the slope is walkable.
   *
   * Links go in four directions (E, N, NE, SE — the reverse directions come
   * free because `link` is bidirectional). Two rejections matter:
   *   - a step of more than 2.4 units is a cliff, not a walk
   *   - the midpoint must also be flat, so a link cannot bridge a gully by
   *     connecting the two flat rims across it
   */
  seedTerrain(t) {
    const e = new Map();
    for (const n of t)
      for (let s = n.x0; s <= n.x1; s += $n)
        for (let r = n.z0; r <= n.z1; r += $n) {
          if (!isFlatGround(s, r)) continue;
          const o = `${s},${r}`;
          e.has(o) ||
            e.set(
              o,
              this.add(new Vector3(s, terrainHeightAt(s, r), r), -1, !0),
            );
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
        isFlatGround(f, m) && this.link(s, h);
      }
    }
  }
  /**
   * Detach every node belonging to structure `t` (used by UNDO).
   *
   * TOMBSTONES, DOES NOT SPLICE. The node objects stay in the array at their
   * original indices with structId -999 and no links; `nearest` skips them.
   *
   * That looks wasteful and is deliberate: pockets and agents hold node
   * indices, so removing an element would silently re-point every index above
   * it at the wrong node. Leaking a few dead entries is much cheaper than
   * rewriting every reference in the game.
   */
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
/**
 * Binary min-heap used as A*'s open set.
 *
 * Two parallel arrays — `ids` (node index) and `ks` (priority) — rather than
 * objects, to avoid allocating a wrapper per push in the inner pathfinding
 * loop. push/pop are O(log n); a sorted-array queue would be O(n) per insert
 * and shows up immediately with 46 citizens repathing.
 */
class p_ {
  /** Parallel arrays: node ids, and their priorities. */
  ids = [];
  ks = [];
  get size() {
    return this.ids.length;
  }
  /** Insert id `t` with priority `e`, then sift up to restore the heap. */
  push(t, e) {
    (this.ids.push(t), this.ks.push(e));
    let n = this.ids.length - 1;
    for (; n > 0;) {
      const s = (n - 1) >> 1;
      if (this.ks[s] <= this.ks[n]) break;
      (this.swap(n, s), (n = s));
    }
  }
  /** Remove and return the lowest-priority id: swap the last item in, sift down. */
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

// --- generated exports ---
export { NavGraph };
