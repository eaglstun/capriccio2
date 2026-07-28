// Citizens: agent pool, daily routine, pathing
//
// Extracted from public/assets/index-DCXbw2vV.js, bundle lines
// 28494–28848. Statements are verbatim; identifiers are
// renamed via src/renames.json. Imports and exports are generated.
// Regenerate: python3 tools/split_bundle.py --write

// --- generated imports ---
import { BufferAttribute, BufferGeometry, ConeGeometry, CylinderGeometry, DynamicDrawUsage as Lu, InstancedMesh, Object3D, SphereGeometry, Vector3 } from "three";
import { hashString, seededRng } from "./01-materials.js";
import { Co } from "./06-infill.js";
import { defineField } from "./_runtime.js";
// --- end generated imports ---

class Citizens {
  constructor(t, e, n) {
    defineField(this, "world");
    defineField(this, "infill");
    defineField(this, "meshes");
    defineField(this, "agents", []);
    defineField(this, "population", 16);
    defineField(this, "dummy", new Object3D());
    ((this.world = t), (this.infill = e));
    const s = t.mats.figure;
    this.meshes = [Po(0), Po(1), Po(2)].map((r) => {
      const o = new InstancedMesh(r, s, Co);
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
        pos: new Vector3(),
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
      e = this.world.nav.nearest(new Vector3(-18, 0, 28), 20);
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
      n = seededRng(777);
    for (let s = 0; s < this.agents.length; s++) {
      const r = this.agents[s],
        o = s < this.population;
      if (o && !r.active) {
        r.active = !0;
        const a = t.length
          ? t[s % t.length]
          : this.world.nav.nearest(
              new Vector3(-18 + n() * 24 - 12, 0, 28 + n() * 20 - 10),
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
    e = new CylinderGeometry(0.14, 0.26, 1.32, 7);
  e.translate(0, 0.66, 0);
  const n = new SphereGeometry(0.13, 7, 6);
  n.translate(0, 1.46, 0);
  const s = new CylinderGeometry(0.19, 0.14, 0.3, 7);
  if ((s.translate(0, 1.25, 0), t.push(e, s, n), i === 1)) {
    const r = new CylinderGeometry(0.025, 0.03, 1.8, 5);
    (r.rotateX(0.12), r.translate(0.24, 0.9, 0.1), t.push(r));
    const o = new CylinderGeometry(0.05, 0.06, 0.45, 5);
    (o.rotateZ(-1.1), o.translate(0.16, 1.18, 0.06), t.push(o));
  } else if (i === 2) {
    const r = new CylinderGeometry(0.045, 0.06, 0.62, 5);
    (r.rotateZ(-1.35),
      r.rotateY(0.2),
      r.translate(0.3, 1.32, 0.05),
      t.push(r),
      e.rotateZ(-0.06));
    const o = new SphereGeometry(0.14, 6, 5);
    (o.scale(1, 0.75, 1), o.translate(-0.2, 0.82, 0), t.push(o));
  } else {
    const r = new ConeGeometry(0.17, 0.34, 7);
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
  const o = new BufferGeometry();
  return (
    o.setAttribute("position", new BufferAttribute(n, 3)),
    o.setAttribute("normal", new BufferAttribute(s, 3)),
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
    const p = seededRng(hashString(`d${Math.round(l)}:${Math.round(u)}`)),
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
const gameState = {
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
  ((gameState.res.stone = Math.min(2600, gameState.res.stone + i * 18)),
    (gameState.res.timber = Math.min(900, gameState.res.timber + i * 6)));
}
function Fl(i) {
  return gameState.folio
    ? !0
    : gameState.res.stone >= i.stone && gameState.res.timber >= (i.timber || 0);
}
function W_(i) {
  gameState.folio ||
    ((gameState.res.stone -= i.stone),
    (gameState.res.timber -= i.timber || 0),
    (gameState.dirty = !0));
}
function X_() {
  return gameState.folio
    ? 160
    : gameState.res.favor >= 150
      ? 150
      : gameState.res.favor >= 60
        ? 95
        : 55;
}
const Ch = "capriccio-save-v1";

// --- generated exports ---
export { Ch, Citizens, Fl, Po, Rh, V_, W_, X_, gameState };
