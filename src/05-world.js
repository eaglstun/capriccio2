// World: terrain, structures, pockets, water, applyAction
//
// Extracted from public/assets/index-DCXbw2vV.js, bundle lines
// 27603–28217. Statements are verbatim; identifiers are
// renamed via src/renames.json. Imports and exports are generated.
// Regenerate: python3 tools/split_bundle.py --write

// --- generated imports ---
import { BoxGeometry, BufferAttribute, BufferGeometry, CatmullRomCurve3, CylinderGeometry, DoubleSide, Group, InstancedMesh, Line, LineDashedMaterial, Mesh, MeshBasicMaterial, Object3D, PlaneGeometry, TorusGeometry, TubeGeometry, Vector3 } from "three";
import { Ca, Vr, f_, i_, isFlatGround, seededRng, terrainHeightAt } from "./01-materials.js";
import { NavGraph } from "./02-nav.js";
import { Ji, Pa, Ri, buildTree, setToneAttribute } from "./03-geometry.js";
import { buildStructureMesh } from "./04-builders.js";
import { defineField } from "./_runtime.js";
// --- end generated imports ---

class World {
  constructor(t, e) {
    defineField(this, "scene");
    defineField(this, "mats");
    defineField(this, "glowMat");
    defineField(this, "terrainMesh");
    defineField(this, "structGroup", new Group());
    defineField(this, "waterGroup", new Group());
    defineField(this, "infillGroup", new Group());
    defineField(this, "nav", new NavGraph());
    defineField(this, "pockets", []);
    defineField(this, "structures", new Map());
    defineField(this, "anchors", new Map());
    defineField(this, "waterSources", []);
    defineField(this, "designations", []);
    defineField(this, "actions", []);
    defineField(this, "onStructureBuilt", null);
    defineField(this, "desigMarks", new Map());
    ((this.scene = t),
      (this.mats = e),
      (this.glowMat = i_()),
      t.add(this.structGroup, this.waterGroup, this.infillGroup));
  }
  buildTerrain() {
    const t = f_();
    ((this.terrainMesh = new Mesh(t, this.mats.rock)),
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
    const n = buildStructureMesh(t),
      s = [];
    for (const a of Object.keys(n.pieces)) {
      const c = n.pieces[a];
      if (!c.length) continue;
      const l = Ul(c),
        h = a === "glow" ? this.glowMat : this.mats[a],
        u = new Mesh(l, h);
      ((u.castShadow = a !== "water" && a !== "glow"),
        (u.receiveShadow = a !== "glow" && a !== "water"),
        (u.userData.structId = t.id),
        (u.userData.matKey = a),
        s.push(u),
        a === "water" ? this.waterGroup.add(u) : this.structGroup.add(u));
    }
    for (const a of n.water) {
      const c = A_(a.a, a.b, 1.7),
        l = new Mesh(c, this.mats.water);
      ((l.userData.structId = t.id), this.waterGroup.add(l), s.push(l));
    }
    for (const a of n.waterSources) this.waterSources.push(new Vector3(...a));
    const r = [];
    for (let a = 0; a < n.navPts.length; a++) {
      const c = n.navPts[a];
      r.push(this.nav.add(new Vector3(...c.pos), t.id, !1));
    }
    for (let a = 0; a < n.navPts.length; a++) {
      for (const c of n.navPts[a].links) this.nav.link(r[a], r[c]);
      if (e && n.navPts[a].splice) {
        const c = new Vector3(...n.navPts[a].pos),
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
      n.anchorTop && this.anchors.set(t.id, { top: new Vector3(...n.anchorTop) }));
    const o = { action: t, result: n, meshes: s, navIds: r };
    return (this.structures.set(t.id, o), this.onStructureBuilt?.(t.id), o);
  }
  registerPocket(t, e) {
    const n = new Vector3(...t.pos),
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
    const e = seededRng((t.id ?? 1) * 331 + 7),
      n = t.x ?? (t.ax + t.bx) / 2,
      s = t.z ?? (t.az + t.bz) / 2,
      r = 4 + Math.floor(e() * 3);
    for (let o = 0; o < r; o++) {
      const a = e() * Math.PI * 2,
        c = 10 + e() * 14,
        l = n + Math.sin(a) * c,
        h = s + Math.cos(a) * c;
      if (!isFlatGround(l, h)) continue;
      const u = terrainHeightAt(l, h);
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
    const n = new Group(),
      s = new LineDashedMaterial({
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
      r.push(new Vector3(u, terrainHeightAt(u, d) + 0.35, d));
    }
    const o = new Line(new BufferGeometry().setFromPoints(r), s);
    (o.computeLineDistances(), n.add(o));
    const a = terrainHeightAt(t.x + 1.5, t.z + 1.5),
      c = new Mesh(
        Ul([
          (() => {
            const l = new BoxGeometry(0.14, 2.1, 0.14);
            return (l.translate(t.x + 1.5, a + 1.05, t.z + 1.5), l);
          })(),
          (() => {
            const l = new BoxGeometry(0.85, 0.6, 0.07);
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
    const a = seededRng(o);
    for (let c = 0; c < n; c++) {
      const l = (c / n) * Math.PI * 2 + a() * 0.7,
        h = s + a() * (r - s),
        u = t + Math.sin(l) * h,
        d = e + Math.cos(l) * h;
      if (!isFlatGround(u, d)) continue;
      const f = terrainHeightAt(u, d);
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
      (this.nav = new NavGraph()),
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
    setToneAttribute(c);
    const l = c.attributes.position.count;
    (n.set(c.attributes.position.array, o * 3),
      s.set(c.attributes.normal.array, o * 3),
      r.set(c.attributes.aTone.array, o * 2),
      (o += l),
      c.dispose());
  }
  const a = new BufferGeometry();
  return (
    a.setAttribute("position", new BufferAttribute(n, 3)),
    a.setAttribute("normal", new BufferAttribute(s, 3)),
    a.setAttribute("aTone", new BufferAttribute(r, 2)),
    a
  );
}
function A_(i, t, e) {
  const n = new Vector3(...i),
    s = new Vector3(...t),
    r = n.distanceTo(s),
    o = new BoxGeometry(r, 0.12, e);
  o.translate(r / 2, 0, 0);
  const a = s.clone().sub(n),
    c = Math.atan2(a.x, a.z) - Math.PI / 2,
    l = Math.atan2(a.y, Math.hypot(a.x, a.z));
  return (o.rotateZ(l), o.rotateY(c), o.translate(n.x, n.y, n.z), setToneAttribute(o), o);
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
        y: terrainHeightAt(n, s),
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
        y: terrainHeightAt(n, s),
        z: s,
        rotY: 0,
      });
    }),
    i
  );
}
function C_(i) {
  const t = seededRng(991),
    e = Vr.springPool,
    n = new CylinderGeometry(7.5, 7.5, 0.3, 22);
  (n.translate(e.x, e.y + 0.18, e.z),
    setToneAttribute(n),
    i.waterGroup.add(new Mesh(n, i.mats.water)));
  const s = new TorusGeometry(7.8, 0.55, 6, 22);
  (s.rotateX(Math.PI / 2), s.translate(e.x, e.y + 0.35, e.z), setToneAttribute(s));
  const r = new Mesh(s, i.mats.stoneOld);
  ((r.castShadow = !0), i.structGroup.add(r));
  const o = new BoxGeometry(26, 0.14, 1.6);
  (o.rotateY(Math.atan2(118 - e.x, -6 - e.z) - Math.PI / 2),
    o.translate((e.x + 118) / 2, e.y + 0.42, (e.z + -6) / 2),
    setToneAttribute(o),
    i.waterGroup.add(new Mesh(o, i.mats.water)));
  const a = new Vector3(93, 30.2, -8),
    c = new Vector3(80, Ca + 1, -9),
    l = new PlaneGeometry(2.4, a.y - c.y);
  (l.rotateY(Math.PI / 2 + 0.35),
    l.translate((a.x + c.x) / 2 - 3, (a.y + c.y) / 2, (a.z + c.z) / 2),
    setToneAttribute(l));
  const h = new Mesh(l, i.mats.water);
  i.waterGroup.add(h);
  const u = [];
  for (let E = -140; E <= 140; E += 10) {
    const C = 60 + Math.sin(E * 0.011) * 7;
    u.push(new Vector3(C, Ca + 0.8 + E * 0.012, E));
  }
  const d = new CatmullRomCurve3(u),
    f = new TubeGeometry(d, 48, 2.4, 5);
  (f.scale(1, 0.08, 1), f.dispose());
  const m = D_(u, 4.2);
  (setToneAttribute(m), i.waterGroup.add(new Mesh(m, i.mats.water)));
  const _ = [];
  for (let E = 0; E < 26; E++) _.push([-90 + t() * 130, -38 + t() * 130]);
  for (let E = 0; E < 8; E++) _.push([48 + t() * 26, -80 + t() * 160]);
  const g = [];
  for (const [E, C] of _) {
    const L = Pa(t);
    (L.rotateY(t() * Math.PI * 2),
      L.translate(E, terrainHeightAt(E, C) - 0.15, C),
      setToneAttribute(L, 1, 0.5),
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
      w.translate(y, terrainHeightAt(y, M) - 1, M),
      setToneAttribute(w, 1, 0.6),
      g.push(w));
  }
  const p = Nl(g),
    A = new Mesh(p, i.mats.stoneOld);
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
    const I = terrainHeightAt(E, C);
    (w.translate(E, I - 3, C), Ri(w, I - 3, I + 3, 0.9, 1, 0.6));
    const F = new Mesh(w, i.mats.distant);
    ((F.castShadow = !1), (F.receiveShadow = !1), i.structGroup.add(F));
  }
  const v = [];
  for (let E = 0; E < 4; E++) {
    const C = buildTree(5 + t() * 3.5, t),
      L = e.x - 6 + t() * 12,
      y = e.z + 8 + t() * 6;
    (C.translate(L, terrainHeightAt(L, y), y), setToneAttribute(C), v.push(C));
  }
  const R = new Mesh(Nl(v), i.mats.green);
  ((R.castShadow = !0), i.structGroup.add(R));
}
function P_(i) {
  const t = new BufferGeometry(),
    e = new Float32Array([
      -0.9, 0, 0.25, 0, 0, 0, -0.75, 0.16, -0.2, 0.9, 0, 0.25, 0.75, 0.16, -0.2,
      0, 0, 0,
    ]);
  (t.setAttribute("position", new BufferAttribute(e, 3)), t.computeVertexNormals());
  const n = new MeshBasicMaterial({ color: "#3a3226", side: DoubleSide, fog: !0 }),
    s = 11,
    r = new InstancedMesh(t, n, s);
  ((r.frustumCulled = !1), i.scene.add(r));
  const o = [
      { cx: -30, cz: -20, cy: 42, r: 34 },
      { cx: 55, cz: 10, cy: 26, r: 40 },
    ],
    a = new Object3D(),
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
    (setToneAttribute(c),
      n.set(c.attributes.position.array, o * 3),
      s.set(c.attributes.normal.array, o * 3),
      r.set(c.attributes.aTone.array, o * 2),
      (o += c.attributes.position.count),
      c.dispose());
  const a = new BufferGeometry();
  return (
    a.setAttribute("position", new BufferAttribute(n, 3)),
    a.setAttribute("normal", new BufferAttribute(s, 3)),
    a.setAttribute("aTone", new BufferAttribute(r, 2)),
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
      l = new Vector3(c.z, 0, -c.x).multiplyScalar(t / 2),
      h = o.clone().add(l),
      u = o.clone().sub(l),
      d = a.clone().add(l),
      f = a.clone().sub(l);
    (e.push(h.x, h.y, h.z, d.x, d.y, d.z, u.x, u.y, u.z),
      e.push(u.x, u.y, u.z, d.x, d.y, d.z, f.x, f.y, f.z));
    for (let m = 0; m < 6; m++) n.push(0, 1, 0);
  }
  const s = new BufferGeometry();
  return (
    s.setAttribute("position", new BufferAttribute(new Float32Array(e), 3)),
    s.setAttribute("normal", new BufferAttribute(new Float32Array(n), 3)),
    s
  );
}
const L_ = 7;

// --- generated exports ---
export { Ah, C_, D_, L_, P_, Th, World };
