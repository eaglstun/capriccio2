// Infill: vernacular buildings and the pickPocket growth engine
//
// Extracted from legacy/assets/index-DCXbw2vV.js, bundle lines
// 28218–28493. Statements are verbatim; identifiers are
// renamed via src/renames.json. Imports and exports are generated.
// Regenerate: python3 tools/split_bundle.py --write

// --- generated imports ---
import { BoxGeometry, CylinderGeometry, Group, Mesh, Vector3 } from "three";
import { clamp, hashString, seededRng } from "./01-materials";
import { Il, MeshBuilder, buildTree, setToneAttribute } from "./03-geometry";
import { L_ } from "./05-world";
// --- end generated imports ---

class InfillSystem {
  world: any;
  /** Every grown building, finished or still rising. */
  items: any[] = [];
  counters = new Map<string, number>();
  capacity = 0;

  constructor(t: any) {
    this.world = t;
  }
  /**
   * One growth tick. Called every ~2.2s from the frame loop.
   *
   * `t` is the hour; `e` is DEMAND, computed by the caller as
   *   10 + clearance(favor) * 0.28 + (pockets that aren't terrace_p) * 0.12
   *
   * Two things happen. First every unfinished building rises a little —
   * `stage` runs 0..1 and drives `scale.y` from 0.18 to 1, so a building
   * visibly grows out of the ground. Then, maybe, one new one starts.
   *
   * The two gates on starting are the whole pacing of the game:
   *   - at most TWO buildings under construction at once, so the city grows
   *     at a legible pace instead of erupting
   *   - nothing starts unless demand exceeds `items.length * 0.9`
   *
   * That second one is why a fresh city stalls at ~16 buildings and looks
   * finished when it isn't. It is waiting for clearance, which comes from
   * completing citizen requests. See docs/PROGRESSION.md.
   */
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
  /**
   * Choose where the city builds next: the highest-scoring vacant, reachable
   * pocket — or null if nothing is good enough.
   *
   * The score, term by term:
   *   shelter x1.2      roofed beats exposed
   *   light   x0.5
   *   scenic  x0.4      the outlook value, which is never shown in the HUD
   *   neighbours x0.8   sum of (1 - dist/40) over existing infill within 40u,
   *                     capped at 3. This is what makes growth CLUMP into
   *                     districts instead of scattering evenly.
   *   centre  x1.4      proximity to (-18, 28); the city pulls inward
   *   water   +0.9 within 45u, +0.3 within 90u
   *   designation +2.4  <- larger than shelter, light and scenic combined
   *   under_arch  +0.5  a small thumb on the scale for the Piranesi shape
   *
   * DESIGNATION DOMINATES ON PURPOSE. INVITE is the player's one direct lever
   * on where life appears; everything else is influence.
   *
   * The 1.6 floor means genuinely poor ground is never built on at all —
   * growth stalls rather than sprawling into the wasteland.
   */
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
  /**
   * Decide what kind of building goes in a pocket.
   *
   * A designation is an instruction and is obeyed exactly:
   *   garden -> garden, trade -> stall, dwelling -> house, gathering -> shrine
   *
   * Undesignated pockets fall through to a roll seeded from
   * `hashString(structId + ":" + idx)` — DETERMINISTIC, derived from the
   * pocket's own identity rather than from Math.random(). It has to be: the
   * save replays the action log, and a city that rebuilt itself with different
   * buildings each load would not be the same city.
   *
   * The remaining rules read the space: niches are too small for anything but
   * a shrine, decks near water lean garden, arches suit stalls and workshops,
   * interiors suit trade and worship, and bright well-watered ground can grow
   * something green.
   */
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
  /**
   * Build a `e`-kind building in pocket `t`. Pass `n` true to skip construction
   * and appear finished immediately (the save-restore path).
   *
   * The key is `structId:kind:counter` — stable, unique, and reproducible,
   * which is what lets `restore` match saved buildings back to their pockets.
   * That same key seeds the PRNG, so a rebuilt building is identical down to
   * its jitter.
   *
   * Two nested groups: the outer one carries position and rotation, the inner
   * one is scaled on Y as the building rises. Scaling the outer group would
   * drag the scaffold up with it.
   *
   * Marks the pocket occupied by index into `items`.
   */
  spawn(t, e, n = !1) {
    const s = `${t.structId}:${e}`,
      r = (this.counters.get(s) ?? 0) + 1;
    this.counters.set(s, r);
    const o = `${s}:${r}`,
      a = seededRng(hashString(o)),
      c = new Group(),
      l = new Group();
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
  /**
   * Complete a building: full height, scaffold removed and its geometry
   * disposed (three.js will not free GPU buffers on its own).
   *
   * Then two side effects that matter more than they look.
   *
   * CAPACITY = completed houses x4 + 8, and population is
   * `min(132, 14 + capacity)`. Only HOUSES count — stalls, gardens and shrines
   * add nothing. So 28 finished houses maxes the city permanently and every
   * house after that is scenery.
   *
   * A finished GARDEN pushes a new water source at its position. Since
   * `pickPocket` pays +0.9 for water within 45 units, planting a garden makes
   * its whole neighbourhood more attractive to build in. It is the only
   * feedback loop in the system where one building changes the terms for the
   * next.
   */
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
        this.world.waterSources.push(new Vector3(...e.pos)));
  }
  /**
   * The infill state for the save file — four fields per building.
   *
   * No geometry and no transform: the mesh is regenerated from `kind` and the
   * pocket it sits in, and the jitter comes back identical because it is
   * seeded from `key`. This is why the save stays a few KB.
   */
  serialize() {
    return this.items.map((t) => ({
      key: t.key,
      kind: t.kind,
      stage: t.stage,
      pocketIdx: t.pocketIdx,
    }));
  }
  /**
   * Rebuild saved infill. `e` is a lookup from saved key back to a live
   * pocket, supplied by the caller (the pockets themselves are regenerated
   * from the replayed action log, so the mapping has to be recomputed).
   *
   * Skips anything whose pocket has vanished or is already taken — a saved
   * building whose supporting structure was undone simply does not come back.
   * Buildings caught mid-construction resume at their saved stage.
   */
  restore(t, e) {
    for (const n of t) {
      const s = e(n.key);
      if (!s || s.occupiedBy >= 0) continue;
      const r = this.spawn(s, n.kind, n.stage >= 1);
      ((r.stage = n.stage),
        n.stage < 1 && (r.building.scale.y = 0.18 + n.stage * 0.82));
    }
  }
  /** Remove every building and dispose its geometry. Used by "begin anew". */
  clear() {
    for (const t of this.items)
      (t.group.parent?.remove(t.group),
        t.group.traverse((e) => {
          e.geometry && e.geometry.dispose();
        }));
    ((this.items = []), this.counters.clear(), (this.capacity = 0));
  }
}
/**
 * The scaffold that stands around a building while it goes up: four corner
 * poles, rails, a diagonal brace and a plank. Removed and disposed by
 * `finish`.
 *
 * Sized to the building kind — houses and workshops get a bigger frame than
 * stalls, and gardens get a short one since there is no wall to climb.
 */
function U_(i, t, e) {
  const n = new Group(),
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
  const c = new BoxGeometry(Math.hypot(s, o * 0.55) * 0.96, 0.08, 0.08);
  (c.rotateZ(Math.atan2(o * 0.55, s)),
    c.translate(0, o * 0.28, r / 2 + 0.02),
    a.addRaw(c),
    a.box(s * 0.9, 0.07, 0.8, [0, o * 0.56, r / 2 - 0.5]));
  const l = new Mesh(a.merge(), i.mats.salvage);
  return ((l.castShadow = !0), n.add(l), n);
}
/**
 * Build the actual mesh for one infill building.
 *
 * `i` world, `t` group to add into, `e` an array that collects window meshes
 * for the caller, `n` the pocket, `s` the kind, `r` the seeded PRNG.
 *
 * Every dimension and every roll comes from `r`, which the caller seeded from
 * the building's stable key — so this function is a pure function of (kind,
 * pocket, key) and reproduces exactly on reload.
 *
 * Branches per kind below: house, stall, workshop, shrine, garden.
 */
function N_(i, t, e, n, s, r) {
  const o = i.mats,
    a = (l, h, u = !0) => {
      setToneAttribute(l);
      const d = new Mesh(l, h);
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
      a(f.merge(), r() < 0.4 ? o.plaster : o.salvage));
    // flat shanty roof: slab, tank, dish, aerial — the gable went with the era
    const m0 = d ? u * 1.85 : u,
      m1 = l * (d ? 0.9 : 1),
      m2 = h * (d ? 0.9 : 1),
      m = new MeshBuilder(0);
    (m.box(m1 + 0.34, 0.16 + r() * 0.1, m2 + 0.34, [
      d ? 0.1 : 0,
      m0,
      d ? -0.05 : 0,
    ]),
      m.box(0.7, 0.45, 0.55, [m1 * 0.24, m0 + 0.16, -m2 * 0.2]),
      a(m.merge(), o.salvage));
    if (r() < 0.7) {
      const mt = new CylinderGeometry(0.42, 0.42, 0.85, 8);
      (mt.translate(-m1 * 0.26, m0 + 0.6, m2 * 0.18), a(mt, o.plaster));
    }
    if (r() < 0.65) {
      const md = new CylinderGeometry(0.5, 0.5, 0.07, 10);
      (md.rotateX(1.1),
        md.rotateY(r() * Math.PI * 2),
        md.translate(m1 * 0.3, m0 + 0.55, m2 * 0.28),
        a(md, o.plaster, !1));
    }
    const ma = new BoxGeometry(0.06, 1.7, 0.06);
    (ma.translate(-m1 * 0.34, m0 + 0.95, -m2 * 0.3), a(ma, o.salvage, !1));
    const mg = new BoxGeometry(0.14, 0.16, 0.14);
    (mg.translate(-m1 * 0.34, m0 + 1.85, -m2 * 0.3), a(mg, c, !1));
    if (r() < 0.5) {
      const mp = new BoxGeometry(1.7, 0.05, 1.2);
      (mp.rotateZ(0.14),
        mp.translate(l * 0.2, m0 + 0.3, h / 2 + 0.35),
        a(mp, o.fabric, !1));
    }
    const _ = new BoxGeometry(0.9, 1.8, 0.12);
    (_.translate(l * 0.15, 0.9, h / 2 + 0.03), a(_, o.fabric, !1));
    const g = d ? 3 : 2;
    for (let p = 0; p < g; p++) {
      const A = new BoxGeometry(0.55, 0.7, 0.1);
      (A.translate(
        -l / 2 + 0.8 + (p * (l - 1.4)) / Math.max(1, g - 1),
        p < 2 ? 1.6 : u + 1.4,
        h / 2 + 0.04,
      ),
        e.push(a(A, c, !1)));
    }
    if (r() < 0.4) {
      const p = new BoxGeometry(2.4, 0.03, 0.03);
      (p.translate(l / 2 + 1.1, u * 0.8, 0), a(p, o.salvage, !1));
      for (let A = 0; A < 3; A++) {
        const b = new BoxGeometry(0.3, 0.4, 0.02);
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
    (h.box(l, 0.75, 1.7, [0, 0.05, 0]), a(h.merge(), o.salvage));
    const u = new BoxGeometry(l + 0.5, 0.08, 2.3);
    (u.rotateZ((r() - 0.5) * 0.06),
      u.rotateX(-0.18),
      u.translate(0, 2.35, 0.25),
      a(u, o.fabric, !0));
    for (let f = 0; f < 3; f++) {
      const m = new BoxGeometry(0.4 + r() * 0.3, 0.3 + r() * 0.25, 0.35);
      (m.translate(-l * 0.3 + f * l * 0.3, 0.95, 0.2 - r() * 0.4),
        a(m, f === 1 ? o.green : o.plaster, !1));
    }
    const d = new BoxGeometry(1.5, 0.32, 0.09);
    (d.rotateX(-0.18), d.translate(0, 2.62, 0.6), e.push(a(d, c, !1)));
    const d2 = new BoxGeometry(0.24, 0.3, 0.24);
    (d2.translate(l * 0.4, 2.1, 0.8), a(d2, c, !1));
  } else if (s === "garden") {
    const l = new MeshBuilder(0.1);
    (l.box(3.4, 0.35, 2.4, [0, 0, 0]),
      l.box(2.8, 0.3, 2, [0.4, 0, 2.9]),
      a(l.merge(), o.stoneOld));
    const h = new BoxGeometry(3, 0.5, 2);
    (h.translate(0, 0.4, 0), a(h, o.green, !1));
    const u = new BoxGeometry(2.4, 0.45, 1.6);
    (u.translate(0.4, 0.35, 2.9), a(u, o.green, !1));
    const d = buildTree(2.8 + r() * 1.8, r);
    (d.translate(-1.8, 0, 1.4), a(d, o.green));
    const f = new MeshBuilder(0);
    (f.box(0.1, 2.2, 0.1, [1.8, 0, -0.9]),
      f.box(0.1, 2.2, 0.1, [1.8, 0, 0.9]),
      f.box(0.12, 0.12, 2, [1.8, 2.2, 0]),
      a(f.merge(), o.salvage));
  } else if (s === "shrine") {
    const l = new MeshBuilder(0.15);
    (l.box(1.7, 0.5, 1.4, [0, 0, 0]),
      l.box(0.24, 2, 0.24, [-0.6, 0.5, -0.45]),
      l.box(0.24, 2, 0.24, [0.6, 0.5, -0.45]),
      l.box(0.24, 2, 0.24, [-0.6, 0.5, 0.45]),
      l.box(0.24, 2, 0.24, [0.6, 0.5, 0.45]),
      l.box(1.8, 0.4, 1.5, [0, 2.5, 0]),
      a(l.merge(), o.stone));
    const h = new CylinderGeometry(0.16, 0.22, 1.1, 7);
    (h.translate(0, 1.1, 0), a(h, o.gold, !1));
    const h2 = new BoxGeometry(1.6, 0.07, 0.07);
    (h2.translate(0, 2.42, 0.52), a(h2, c, !1));
    const u = new BoxGeometry(0.2, 0.26, 0.2);
    (u.translate(0.55, 0.65, 0.3), e.push(a(u, c, !1)));
  } else {
    const l = 3.8 + r() * 1.4,
      h = new MeshBuilder(0.08);
    (h.box(l, 3, 3.4, [0, 0, 0]), a(h.merge(), o.stoneOld));
    const u = new MeshBuilder(0);
    (u.box(l + 0.3, 0.22, 3.7, [0, 3, 0]),
      u.box(1.2, 0.6, 0.9, [-l * 0.2, 3.22, 0.5]),
      a(u.merge(), o.salvage));
    const u2 = new CylinderGeometry(0.55, 0.62, 0.35, 9);
    (u2.translate(l * 0.05, 3.4, -0.5), a(u2, o.plaster, !1));
    const d = new BoxGeometry(0.5, 1.8, 0.5);
    (d.translate(l * 0.3, 3.4, -0.8), a(d, o.stoneOld));
    const d0 = new BoxGeometry(0.14, 0.14, 0.14);
    (d0.translate(l * 0.3, 4.4, -0.8), a(d0, c, !1));
    const f = new BoxGeometry(2.2, 0.08, 1.8);
    (f.rotateX(-0.15), f.translate(-l / 2 - 1, 2.3, 0.4), a(f, o.fabric));
    const m = new BoxGeometry(0.7, 0.6, 0.1);
    (m.translate(0, 1.7, 1.75), e.push(a(m, c, !1)));
  }
}
const Co = 132;

// --- generated exports ---
export { Co, InfillSystem };
