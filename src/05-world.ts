// World: terrain, structures, pockets, water, applyAction
//
// Extracted from legacy/assets/index-DCXbw2vV.js, bundle lines
// 27603–28217. Statements are verbatim; identifiers are
// renamed via src/renames.json. Imports and exports are generated.
// Regenerate: python3 tools/split_bundle.py --write

// --- generated imports ---
import {
  Box3,
  BoxGeometry,
  type Camera,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  CatmullRomCurve3,
  CylinderGeometry,
  DoubleSide,
  Group,
  InstancedMesh,
  Line,
  LineDashedMaterial,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PlaneGeometry,
  RingGeometry,
  Scene,
  SRGBColorSpace,
  TorusGeometry,
  TubeGeometry,
  Vector3,
} from "three";
import {
  Ca,
  Nn,
  Vr,
  f_,
  fr,
  i_,
  isFlatGround,
  lerp,
  seededRng,
  terrainHeightAt,
} from "./01-materials";
import { NavGraph } from "./02-nav";
import {
  CULL_IN,
  CULL_OUT,
  Ji,
  Pa,
  Ri,
  buildTree,
  ec,
  pickStructureLevel,
  setToneAttribute,
  structureFade,
  structureVisible,
} from "./03-geometry";
import { buildStructureMesh } from "./04-builders";
// --- end generated imports ---
import { PlotterSkyline, type PlotBox } from "./25-plotter";
import { carWreck } from "./27-car";

/**
 * A Group that counts its own mutations.
 *
 * `raycastTargets()` wants to cache its flattened array rather than rebuild it
 * on every call, and three.js Object3D fires no events. Counting add/remove
 * here means the cache invalidates itself from any call site — including the
 * module-level scenery functions further down this file — rather than relying
 * on someone remembering to poke a dirty flag.
 */
class CountedGroup extends Group {
  version = 0;
  add(...t: Object3D[]) {
    return (this.version++, super.add(...t));
  }
  remove(...t: Object3D[]) {
    return (this.version++, super.remove(...t));
  }
  clear() {
    return (this.version++, super.clear());
  }
}

class World {
  scene: Scene;
  /** The shared material set built by 01-materials. Shape not yet typed. */
  mats: any;
  glowMat: ReturnType<typeof i_>;
  terrainMesh: Mesh;
  structGroup = new CountedGroup();
  waterGroup = new Group();
  infillGroup = new Group();
  nav = new NavGraph();
  pockets: any[] = [];
  structures = new Map<number, any>();
  /** One entry per structure: its three levels, its sphere, its current level. */
  lodGroups: {
    structId: number;
    meshes: Mesh[][];
    center: Vector3;
    radius: number;
    lod: number;
    fade: number;
    culled?: boolean;
  }[] = [];
  anchors = new Map<string, any>();
  waterSources: any[] = [];
  designations: any[] = [];
  /** Every committed player action, in order — the replayable record. */
  actions: any[] = [];
  onStructureBuilt: ((struct: any) => void) | null = null;
  desigMarks = new Map<any, any>();
  // raycastTargets() cache, invalidated by structGroup.version. `rtBounds[i]`
  // is the world-space box of `rtCache[i]`, used by raycastTargetsUnder.
  rtCache: Object3D[] = [];
  rtBounds: Box3[] = [];
  rtVersion = -1;
  rtTerrain: Mesh | null = null;
  rtUnder: Object3D[] = [];
  // installed by the scenery pass, called once per frame with the clock.
  // `declare` so the property still appears only on first assignment.
  declare sceneTick?: (t: number) => void;
  // the plotted horizon, installed by the same scenery pass. Held so the
  // frame loop can advance the pen and so CAP can replay it.
  declare skylinePlot?: PlotterSkyline;

  constructor(t: Scene, e: any) {
    ((this.scene = t),
      (this.mats = e),
      (this.glowMat = i_()),
      t.add(this.structGroup, this.waterGroup, this.infillGroup));
  }
  /** Build and add the terrain mesh. Once, at world gen. */
  buildTerrain() {
    const t = f_();
    ((this.terrainMesh = new Mesh(t, this.mats.rock)),
      (this.terrainMesh.receiveShadow = !0),
      (this.terrainMesh.castShadow = !0),
      this.scene.add(this.terrainMesh));
  }
  /** Lay the ground nav grid over the buildable regions. */
  seedNav() {
    this.nav.seedTerrain([
      { x0: -140, x1: 40, z0: -44, z1: 120 },
      { x0: -120, x1: 34, z0: -150, z1: -48 },
      { x0: 86, x1: 170, z0: -80, z1: 60 },
      { x0: 40, x1: 84, z0: -140, z1: 140 },
      { x0: -140, x1: 40, z0: -160, z1: -150 },
    ]);
  }
  /**
   * THE HEART OF THE GAME. Apply one action to the world.
   *
   * Every structure in the city — the seeded ruins and everything the player
   * builds — arrives through here, and the save replays its whole action log
   * through this method to rebuild the city on load. Which is why it must stay
   * deterministic: same action, same world, same result, always.
   *
   * Three kinds of action behave differently:
   *
   * - **carve** does not create a structure. It mutates an EXISTING one — it
   *   appends to a wall's `openings` array, or sets `carveAxis` on a giant
   *   pier — and rebuilds that structure's mesh. Returns null.
   * - **designate** does not create a structure either. It records a circle
   *   `{kind, x, z, r}` and stamps the designation onto every unoccupied
   *   pocket inside it.
   * - everything else builds a structure, registers its pockets, and adds its
   *   nav nodes.
   *
   * `e` controls whether the action is also pushed to the render/nav side or
   * only recorded — used when rebuilding in bulk.
   */
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
  /**
   * Turn an action into geometry and register what it produces.
   *
   * Calls the mesh builder for the action type, then walks the parts it
   * returns: pockets get registered, nav points get added and linked, water
   * sources recorded, glow meshes attached.
   *
   * The builder seeds its randomness from the action id, so this is a pure
   * function of the action — the same action always produces the same
   * building.
   */
  buildStruct(t, e = !0) {
    // LEVEL 0 IS THE STRUCTURE. Levels 1 and 2 are pixels and nothing else:
    // every builder emits nav points, pockets, water sources and a cost at
    // every level, and registering those three times would triple the
    // pathfinding graph, count every habitable void three times over, and put
    // the score and the save both out. Only `n` is ever read below the mesh
    // loop — the other two are consumed for `.pieces` and dropped.
    const n = buildStructureMesh(t, 0),
      lodParts = [
        n.pieces,
        buildStructureMesh(t, 1).pieces,
        buildStructureMesh(t, 2).pieces,
      ],
      s = [],
      lodMeshes: Mesh[][] = [[], [], []],
      // carvable surfaces wear the setting-out scribes: walls always
      // (they take any number of openings), giant piers only until their
      // one carve sets carveAxis — rebuildStruct re-enters here with the
      // axis set and the pier reverts to plain stone. Same geometry, same
      // draw count; only the material binding differs.
      o2 =
        t.t === "wall" ||
        (t.t === "anchor" && t.style === "giant" && !t.carveAxis);
    // Every material key any level emits — a level can legitimately have a key
    // the others do not (a span keeps its stone at every level but drops its
    // glow after the first), and iterating level 0's keys alone would silently
    // discard geometry the coarse levels DID build.
    const allKeys = new Set<string>();
    for (const p of lodParts) for (const k of Object.keys(p)) allKeys.add(k);
    for (const a of allKeys) {
      const h =
        a === "glow"
          ? this.glowMat
          : o2 && a === "stone"
            ? this.mats.stoneCarve
            : this.mats[a];
      for (let lv = 0; lv < 3; lv++) {
        const c = lodParts[lv][a];
        if (!c?.length) continue;
        const u = new Mesh(Ul(c), h);
        // `console` is the game boards' paint: flat quads lying on a slab, so
        // they cast nothing and only ever receive
        ((u.castShadow =
          a !== "water" && a !== "glow" && a !== "ember" && a !== "console"),
          (u.receiveShadow = a !== "glow" && a !== "water" && a !== "ember"),
          (u.userData.structId = t.id),
          (u.userData.matKey = a),
          // read by raycastTargets, which must only ever see level 0 — see
          // there for why placement would otherwise drift with the camera
          (u.userData.lod = lv),
          // only the near level starts visible; the first updateLod call
          // corrects every group before anything is drawn
          (u.visible = lv === 0),
          lodMeshes[lv].push(u),
          s.push(u),
          a === "water" ? this.waterGroup.add(u) : this.structGroup.add(u));
      }
    }
    this.registerLod(t.id, lodMeshes);
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
      n.anchorTop &&
        this.anchors.set(t.id, { top: new Vector3(...n.anchorTop) }));
    const o = { action: t, result: n, meshes: s, navIds: r };
    return (this.structures.set(t.id, o), this.onStructureBuilt?.(t.id), o);
  }
  /**
   * Record a habitable void and wire it into the world.
   *
   * Assigns its index, attaches it to the nearest nav node so citizens can
   * reach it, computes its distance to water, and applies any designation
   * whose circle already covers it.
   *
   * Pockets are the game's central abstraction — see docs/SIMULATION.md. Their
   * qualities are set by the builder that emitted them, not here.
   */
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
  /** Emit the terrace pockets a structure creates on the ground around it. */
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
  /** Draw the painted circle showing where an INVITE applies. */
  addDesignationMark(t) {
    const e = t.id ?? -1;
    if (this.desigMarks.has(e)) return;
    const n = new Group(),
      s = new LineDashedMaterial({
        color: "#ff5fc8",
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
        this.mats.salvage,
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
  /**
   * Scatter the initial ground pockets across a region at world gen — the
   * places people can live before the player has built anything.
   *
   * This is why a fresh city already has 48 pockets and 46 citizens: the ruins
   * come inhabited.
   */
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
  /**
   * Rebuild one structure's mesh in place, after a carve changed it.
   *
   * Disposes the old geometry first — three.js will not free GPU buffers on
   * its own, and this runs every time a wall is pierced.
   */
  rebuildStruct(t) {
    const e = this.structures.get(t);
    if (e) {
      for (const n of e.meshes) (n.parent?.remove(n), n.geometry.dispose());
      // drop this structure's LOD group before buildStruct pushes a new one,
      // or a carve would leave the old group pointing at disposed geometry
      this.lodGroups = this.lodGroups.filter((g) => g.structId !== t);
      (this.nav.removeStruct(t),
        (this.pockets = this.pockets.filter((n) => n.structId !== t)),
        this.pockets.forEach((n, s) => {
          n.idx = s;
        }),
        this.structures.delete(t),
        this.buildStruct(e.action, !0));
    }
  }
  /**
   * Clear the world and rebuild it from a list of actions.
   *
   * Used on load and by UNDO (which pops the last action and rebuilds from
   * what remains, rather than trying to reverse a build in place).
   *
   * This is the method a Chronicle replay would drive — see CHRONICLE.md.
   */
  rebuildAll(t) {
    for (const e of this.structures.values())
      for (const n of e.meshes) (n.parent?.remove(n), n.geometry.dispose());
    for (const e of [...this.waterGroup.children]) this.waterGroup.remove(e);
    (this.structures.clear(),
      // the groups hold direct references to meshes just disposed above;
      // leaving them would have updateLod setting .visible on dead objects
      (this.lodGroups = []),
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
  /**
   * The objects the placement tool may hit.
   *
   * Deliberately just the terrain and `structGroup` — scene-only decoration
   * (skyline, billboards, overpasses, landfill) is excluded, which is what
   * stops the player building on the backdrop.
   */
  raycastTargets() {
    if (
      this.rtVersion !== this.structGroup.version ||
      this.rtTerrain !== this.terrainMesh
    ) {
      // matrices may be a frame stale for anything added since the last
      // render; the boxes below are world-space, so force them current first
      this.structGroup.updateMatrixWorld(!0);
      // LEVEL 0 ONLY. Every structure now has three meshes in this group and
      // two of them are coarse. Raycasting the coarse ones would mean the
      // placement tool snapped to whatever the camera happened to be drawing
      // — a span landing at a different height depending how far away you
      // stood — and `.visible` is no help, since three's raycaster tests
      // invisible objects too. Filtering here keeps every ray exact.
      ((this.rtCache = [
        this.terrainMesh,
        ...this.structGroup.children.filter((c) => (c.userData.lod ?? 0) === 0),
      ]),
        (this.rtBounds = this.rtCache.map((t) => new Box3().setFromObject(t))),
        (this.rtVersion = this.structGroup.version),
        (this.rtTerrain = this.terrainMesh));
    }
    return this.rtCache;
  }
  /**
   * Register a structure's three levels and work out the sphere they live in.
   *
   * The sphere is measured from the NEAR level, which is the only one
   * guaranteed to carry every piece — measuring a coarse level would give a
   * radius that shrinks as detail drops, and a group would then flicker
   * between levels purely because choosing one changed the test that chose it.
   */
  registerLod(structId: number, meshes: Mesh[][]) {
    if (!meshes[0].length) return;
    const box = new Box3();
    for (const m of meshes[0]) {
      m.updateMatrixWorld(!0);
      box.expandByObject(m);
    }
    const center = box.getCenter(new Vector3()),
      radius = box.getSize(new Vector3()).length() / 2;
    this.lodGroups.push({ structId, meshes, center, radius, lod: 0, fade: 1 });
  }
  /**
   * Choose a detail level for every structure, by APPARENT SIZE.
   *
   * Not by distance, which is what the citizens use and what would be wrong
   * here. Citizens are all the same size, so distance and screen size are the
   * same number; structures are not. A vault forty metres long and a brazier
   * one metre tall sit at the same distance and want completely different
   * answers. `radius / distance` is the tangent of the angular radius, so one
   * pair of thresholds gives the vault its detail and takes the brazier's
   * away, with no per-kind table to keep in step with the builders.
   *
   * Multiply by `PX` below to read a threshold in pixels of screen radius at
   * a 1080-tall viewport — which is how they were chosen and how to re-tune
   * them. They are checked against squared distance to keep the sqrt out of a
   * loop that runs over every structure in the city every frame.
   */
  updateLod(camera: Camera) {
    const eye = camera.position;
    for (const g of this.lodGroups) {
      const d = Math.max(
        0.001,
        Math.hypot(g.center.x - eye.x, g.center.y - eye.y, g.center.z - eye.z),
      );
      const ang = g.radius / d;
      // hysteresis, same shape as pickLevel in 07-citizens: a level only ends
      // when the size passes the far edge of its band, and only comes back at
      // the near edge, so a structure on a boundary cannot flutter
      const lv = (g.lod = pickStructureLevel(g.lod, ang));
      // The dissolve band. `fade` is 1 above CULL_IN, 0 below CULL_OUT, and
      // ramps between — and it is COMPUTED BUT NOT YET DRAWN WITH. Today the
      // cull is hard at fade === 0; the stipple that should carry the last
      // stretch needs a dither discard in the engraving shader, which is the
      // one piece of this not yet written. `fade` is live and correct, so the
      // shader has something to read the moment it exists.
      //
      // Popping on a pan is already handled without it: CULL_IN and CULL_OUT
      // are a hysteresis pair like the level bands, so a structure sitting
      // exactly on the cutoff cannot flicker as the camera drifts. What is
      // missing is the softness of the transition, not its stability.
      g.fade = structureFade(ang);
      // once gone it has to grow back to CULL_IN to return, and while present
      // it survives down to CULL_OUT — the band is the dead zone, so drifting
      // across the cutoff cannot strobe a structure on and off
      const on = structureVisible(!!g.culled, ang);
      g.culled = !on;
      for (let i = 0; i < 3; i++)
        for (const m of g.meshes[i]) m.visible = on && i === lv;
    }
  }
  /**
   * The subset of `raycastTargets()` that a straight-down ray at (x, z) could
   * possibly hit.
   *
   * For a vertical ray this is an exact broad phase, not an approximation: a
   * mesh whose world bounding box does not span x and z cannot be under the
   * point. WANDER casts three of these per frame, and without it every step
   * tested every structure and every distant ruin in the city.
   *
   * The returned array is reused between calls — read it, don't keep it.
   */
  raycastTargetsUnder(t, e) {
    const n = this.raycastTargets(),
      s = this.rtUnder;
    s.length = 0;
    for (let r = 0; r < n.length; r++) {
      const o = this.rtBounds[r];
      o.min.x <= t &&
        o.max.x >= t &&
        o.min.z <= e &&
        o.max.z >= e &&
        s.push(n[r]);
    }
    return s;
  }
  /**
   * Distance to the nearest water source, or a large sentinel if there is
   * none.
   *
   * Read by `pickPocket` (+0.9 within 45 units) and by the ambient audio,
   * whose water gain falls off with the square of this.
   */
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
  return (
    o.rotateZ(l),
    o.rotateY(c),
    o.translate(n.x, n.y, n.z),
    setToneAttribute(o),
    o
  );
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
  (s.rotateX(Math.PI / 2),
    s.translate(e.x, e.y + 0.35, e.z),
    setToneAttribute(s));
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
  // ---- evidence of life: landfill, billboards, fires, street clutter ----
  // fixed seed, scene-only: none of it enters structGroup or emits pockets
  {
    const q = seededRng(87131),
      dark = [],
      tclt = [],
      fclt = [],
      flames = [],
      panels = [],
      rst = [],
      tox = [];
    // landfill: benched mounds of compacted refuse at the city edge,
    // strata reading as pour-lines, debris scattered on every bench.
    // toxic bloom: the mounds and their runoff are the one yellow-green
    for (const [mx, mz, mr] of [
      [-118, 96, 21],
      [-76, 122, 16],
      [162, 100, 26],
    ]) {
      const my = terrainHeightAt(mx, mz) - 1;
      let rr = mr,
        yy = my;
      // runoff pooled at the toe of the mound
      const pxq = mx + mr * 0.78,
        pzq = mz + mr * 0.42,
        pool = new CylinderGeometry(mr * 0.42, mr * 0.55, 0.22, 14);
      (pool.translate(pxq, terrainHeightAt(pxq, pzq) + 0.16, pzq),
        tox.push(pool));
      while (rr > 4) {
        const bench = new CylinderGeometry(rr * 0.72, rr, 2.7, 18);
        (bench.translate(mx + (q() - 0.5) * 3, yy + 1.35, mz + (q() - 0.5) * 3),
          tox.push(bench));
        for (let k = 0; k < 5; k++) {
          const da = q() * Math.PI * 2,
            db = new BoxGeometry(0.5 + q() * 1.1, 0.3 + q() * 0.5, 0.5 + q());
          (db.rotateY(q() * 3),
            db.translate(
              mx + Math.sin(da) * rr * 0.85,
              yy + 2.7 + q() * 0.3,
              mz + Math.cos(da) * rr * 0.85,
            ),
            (q() < 0.5 ? tclt : fclt).push(db));
        }
        ((yy += 2.7), (rr *= 0.66));
      }
    }
    // one antique column, embedded like spolia — the only Rome left
    {
      const sp = new CylinderGeometry(0.8, 0.86, 7, 12),
        sy = terrainHeightAt(-48, 44);
      (sp.rotateZ(Math.PI / 2 - 0.09),
        sp.rotateY(0.7),
        sp.translate(-48, sy + 0.42, 44),
        g.push(sp));
      const sc = new BoxGeometry(1.9, 1.1, 1.9);
      (sc.rotateY(0.7), sc.translate(-51.2, sy + 0.35, 41.4), g.push(sc));
    }
    // billboards: the ads outlived the customers
    const bcv = document.createElement("canvas");
    ((bcv.width = 1024), (bcv.height = 512));
    const bx = bcv.getContext("2d"),
      cellAt = (ci, bg, fn) => {
        (bx.save(), bx.translate((ci % 2) * 512, Math.floor(ci / 2) * 128));
        ((bx.fillStyle = bg), bx.fillRect(0, 0, 512, 128));
        ((bx.textAlign = "center"), fn(), bx.restore());
      },
      // measure and shrink until the line fits with margin — copy is safe
      // by construction, not by luck. (At the old fixed bold 52px Georgia,
      // EVERYDAY LOW PRICES measured 688px against the 512px cell and
      // GRAND OPENING fit by 20px: the trap stayed armed for the next
      // string.) `mk` builds the font string from a size, so each sign
      // keeps its own face while the fitting is shared. Full fallback
      // stacks throughout: a missing system font falls back silently, and
      // without them the variety would quietly vanish on machines other
      // than the one this was built on.
      fitLine = (s2, col, y, size0, mk, trk = 0) => {
        const cs = bx.letterSpacing !== void 0;
        cs && (bx.letterSpacing = trk + "px");
        let sz = size0;
        for (bx.font = mk(sz); sz > 14 && bx.measureText(s2).width > 512 - 52;)
          bx.font = mk(--sz);
        ((bx.fillStyle = col), bx.fillText(s2, 256, y));
        cs && (bx.letterSpacing = "0px");
      },
      GEO =
        '"Futura", "Century Gothic", "Avenir Next", "URW Gothic", sans-serif',
      AVE = '"Avenir Next", "Futura", "Century Gothic", sans-serif',
      GRO = '"Helvetica Neue", Helvetica, Arial, sans-serif',
      SLB = '"American Typewriter", "Courier New", Courier, monospace',
      FAT = 'Impact, Haettenschweiler, "Arial Narrow", sans-serif',
      SER = 'Georgia, "Times New Roman", serif';
    // seven companies, seven faces: the soda geometric and tracked wide,
    // the estates in the serif they thought looked old-money, the diner on
    // a typewriter slab, the phone company a tight grotesque, the resort
    // thin and airy, the retailer's serif banner, the supermarket fat and
    // condensed. Weight, tracking and case vary as much as family — that
    // jumble is what makes a strip read as a strip.
    (cellAt(0, "#ff5fa8", () => {
      (fitLine("SUNMIST", "#fff6e8", 62, 52, (z) => `600 ${z}px ${GEO}`, 7),
        fitLine(
          "taste the weekend · now in peach",
          "#3c0f2e",
          104,
          25,
          (z) => `italic ${z}px ${SER}`,
        ));
    }),
      cellAt(1, "#22307a", () => {
        (fitLine(
          "MIRAMAR ESTATES",
          "#ffd98a",
          62,
          52,
          (z) => `bold ${z}px ${SER}`,
          2,
        ),
          fitLine(
            "now leasing · move-in ready",
            "#dfe6ff",
            104,
            25,
            (z) => `italic ${z}px ${SER}`,
          ));
      }),
      cellAt(2, "#17c3cf", () => {
        (fitLine(
          "OPEN 24 HOURS",
          "#132437",
          62,
          52,
          (z) => `bold ${z}px ${SLB}`,
        ),
          fitLine(
            "hot meals · cold drinks · exit 12",
            "#123",
            104,
            24,
            (z) => `${z}px ${SLB}`,
          ));
      }),
      cellAt(3, "#f2e6ff", () => {
        (fitLine(
          "Vistaphone",
          "#7a2bd4",
          64,
          58,
          (z) => `bold ${z}px ${GRO}`,
          -1,
        ),
          fitLine(
            "family plans from $9.99 a month",
            "#5a4a7a",
            104,
            25,
            (z) => `${z}px ${GRO}`,
          ));
      }),
      cellAt(4, "#ffb04a", () => {
        (fitLine(
          "AZURE COAST",
          "#ffffff",
          62,
          52,
          (z) => `200 ${z}px ${AVE}`,
          10,
        ),
          fitLine(
            "you deserve a getaway",
            "#7a3c0f",
            104,
            25,
            (z) => `italic 300 ${z}px ${AVE}`,
            2,
          ));
      }),
      cellAt(5, "#efeae2", () => {
        (fitLine(
          "GRAND OPENING",
          "#d42a3e",
          62,
          52,
          (z) => `bold italic ${z}px ${SER}`,
        ),
          fitLine(
            "saturday! free balloons for the kids",
            "#444",
            104,
            25,
            (z) => `${z}px ${GRO}`,
          ));
      }),
      cellAt(6, "#d42a5e", () => {
        (fitLine(
          "EVERYDAY LOW PRICES",
          "#ffffff",
          60,
          56,
          (z) => `bold ${z}px ${FAT}`,
          1,
        ),
          fitLine(
            "friendly · fresh · always",
            "#ffd7e2",
            104,
            25,
            (z) => `${z}px ${GRO}`,
            3,
          ));
      }),
      cellAt(7, "#f5c518", () => {
        bx.fillStyle = "#191420";
        for (let k = -3; k < 14; k++)
          (bx.beginPath(),
            bx.moveTo(k * 44, 128),
            bx.lineTo(k * 44 + 44, 0),
            bx.lineTo(k * 44 + 66, 0),
            bx.lineTo(k * 44 + 22, 128),
            bx.fill());
      }));
    const btex = new CanvasTexture(bcv);
    btex.colorSpace = SRGBColorSpace;
    const addPanel = (px, pz, wq, hq, ci, rot, py) => {
      const pl = new PlaneGeometry(wq, hq),
        uv = pl.attributes.uv,
        col = ci % 2,
        row = Math.floor(ci / 2);
      for (let k = 0; k < uv.count; k++)
        uv.setXY(k, (uv.getX(k) + col) * 0.5, (uv.getY(k) + (3 - row)) * 0.25);
      (pl.rotateY(rot), pl.translate(px, py, pz), panels.push(pl));
    };
    for (const [px, pz, wq, hq, lh, ci, fx, fz] of [
      [-44, 58, 16, 4, 7, 0, -18, 28],
      [30, -24, 13, 3.3, 6, 1, -10, 20],
      [-64, -34, 14, 3.5, 8, 2, -30, -8],
      [52, 64, 13, 3.3, 10, 3, 0, 30],
      [-102, -6, 24, 6, 11, 4, -30, 0],
      [12, 88, 13, 3.3, 6, 5, -18, 28],
      [98, 28, 14, 3.5, 9, 6, 40, 0],
    ]) {
      const gy = terrainHeightAt(px, pz),
        rot = Math.atan2(fx - px, fz - pz),
        py = gy + lh + hq / 2;
      addPanel(px, pz, wq, hq, ci, rot, py);
      const nx = Math.sin(rot),
        nz = Math.cos(rot),
        axx = Math.cos(rot),
        axz = -Math.sin(rot),
        bk = new BoxGeometry(wq + 0.4, hq + 0.4, 0.22);
      (bk.rotateY(rot),
        bk.translate(px - nx * 0.18, py, pz - nz * 0.18),
        dark.push(bk));
      for (const lo of [-wq * 0.33, wq * 0.33]) {
        const leg = new BoxGeometry(0.38, lh + hq * 0.6, 0.38);
        (leg.translate(0, (lh + hq * 0.6) / 2, 0),
          leg.rotateY(rot),
          leg.translate(px + axx * lo - nx * 0.3, gy, pz + axz * lo - nz * 0.3),
          dark.push(leg));
        const brc = new BoxGeometry(0.14, lh * 0.9, 0.14);
        (brc.rotateZ(0.42),
          brc.translate(0, lh * 0.45, 0),
          brc.rotateY(rot),
          brc.translate(
            px + axx * lo * 0.4 - nx * 0.3,
            gy,
            pz + axz * lo * 0.4 - nz * 0.3,
          ),
          dark.push(brc));
      }
    }
    // fires in trash cans, where the citizens gather
    const fm = new MeshBasicMaterial({ color: "#ffb066", fog: !1 });
    fm.toneMapped = !1;
    for (const [fx2, fz2] of [
      [-14, 24],
      [-24, 32],
      [-19, 37],
      [-33, -13],
      [-8, -60],
      [108, -2],
      [46, 36],
    ]) {
      const fy = terrainHeightAt(fx2, fz2),
        can = new CylinderGeometry(0.42, 0.36, 0.95, 9);
      (can.translate(fx2, fy + 0.48, fz2), dark.push(can));
      const fl1 = new BoxGeometry(0.34, 0.5, 0.34);
      (fl1.rotateY(q() * 2),
        fl1.translate(fx2, fy + 1.05, fz2),
        flames.push(fl1));
      const fl2 = new BoxGeometry(0.16, 0.66, 0.16);
      (fl2.rotateY(q() * 2),
        fl2.translate(fx2 + 0.04, fy + 1.2, fz2 - 0.03),
        flames.push(fl2));
    }
    // the rest of what a civilisation leaves: cars, containers, trolleys,
    // pallets, spools, tipped piles, fencing that ends in nothing
    for (const [cx2, cz2, rot2, tip] of [
      [-40, 48, 0.7, 0],
      [8, 52, 2.4, 0.1],
      [-2, 70, 1.1, 0],
      [-60, 42, 3.0, -0.12],
      [26, 20, 5.2, 0],
      [-48, -24, 1.9, 0],
    ]) {
      // one baked wreck per site (27-car), not a shared geometry: Nl() merges
      // by de-indexing and mutating in place, so a shared buffer would be
      // transformed six times over
      const cy2 = terrainHeightAt(cx2, cz2),
        wreck = carWreck();
      // already centred on X/Z and seated on y = 0 by the bake, so the lift
      // the two boxes needed is gone. tip then yaw then place, same order.
      (wreck.rotateZ(tip),
        wreck.rotateY(rot2),
        wreck.translate(cx2, cy2, cz2),
        rst.push(wreck)); // the wrecks oxidised long ago
    }
    for (const [cx2, cz2, ff] of [
      [-58, 10, 0],
      [-54, 14.5, 1],
      [24, -38, 0],
      [-44, -38, 1],
    ]) {
      const cy2 = terrainHeightAt(cx2, cz2),
        box = new BoxGeometry(6, 2.6, 2.4);
      (box.rotateY(q() * 3),
        box.translate(cx2, cy2 + 1.3, cz2),
        (ff ? rst : tclt).push(box));
    }
    for (const [tx2, tz2] of [
      [-30, 22],
      [-8, 40],
      [-26, 44],
      [2, 26],
    ]) {
      const ty2 = terrainHeightAt(tx2, tz2),
        bkt = new BoxGeometry(0.62, 0.5, 0.85),
        hnd = new BoxGeometry(0.6, 0.06, 0.06);
      (bkt.rotateY(q() * 3),
        bkt.translate(tx2, ty2 + 0.62, tz2),
        hnd.rotateY(q() * 3),
        hnd.translate(tx2, ty2 + 1.02, tz2 + 0.3),
        tclt.push(bkt, hnd));
    }
    for (const [px2, pz2] of [
      [-38, 12],
      [-20, 52],
      [16, 38],
      [-52, 30],
    ]) {
      const py2 = terrainHeightAt(px2, pz2);
      for (let k = 0; k < 3; k++) {
        const pal = new BoxGeometry(1.3, 0.13, 1.05);
        (pal.rotateY(q() * 0.5),
          pal.translate(px2, py2 + 0.1 + k * 0.16, pz2),
          tclt.push(pal));
      }
    }
    for (const [sx2, sz2] of [
      [-46, 20],
      [20, 58],
      [-70, 26],
    ]) {
      const sy2 = terrainHeightAt(sx2, sz2),
        s1 = new CylinderGeometry(0.72, 0.72, 0.12, 10),
        s2 = new CylinderGeometry(0.72, 0.72, 0.12, 10),
        ax2 = new CylinderGeometry(0.2, 0.2, 0.62, 8);
      (s1.rotateX(Math.PI / 2),
        s2.rotateX(Math.PI / 2),
        ax2.rotateX(Math.PI / 2),
        s1.translate(sx2, sy2 + 0.72, sz2 - 0.31),
        s2.translate(sx2, sy2 + 0.72, sz2 + 0.31),
        ax2.translate(sx2, sy2 + 0.72, sz2),
        tclt.push(s1, s2, ax2));
    }
    for (const [hx2, hz2, ha, hl] of [
      [-72, 60, 0.4, 16],
      [30, 74, -1.2, 12],
    ]) {
      const dx2 = Math.sin(ha),
        dz2 = Math.cos(ha);
      for (let k = 0; k * 2.2 < hl; k++) {
        const fx3 = hx2 + dx2 * k * 2.2,
          fz3 = hz2 + dz2 * k * 2.2,
          fy3 = terrainHeightAt(fx3, fz3),
          post = new BoxGeometry(0.1, 1.8, 0.1);
        (post.translate(fx3, fy3 + 0.9, fz3), dark.push(post));
        if (k * 2.2 + 2.2 < hl) {
          const rail = new BoxGeometry(0.05, 0.05, 2.2);
          (rail.rotateY(ha),
            rail.translate(fx3 + dx2 * 1.1, fy3 + 1.55, fz3 + dz2 * 1.1),
            dark.push(rail));
        }
      }
    }
    for (const [bx2, bz2, br2] of [
      [-36, 36, 0.2],
      [-33, 39, 0.4],
      [10, 44, 1.3],
      [13, 46, 1.5],
      [40, 8, 2.6],
    ]) {
      const by2 = terrainHeightAt(bx2, bz2),
        bar = new BoxGeometry(2.0, 0.8, 0.5);
      (bar.rotateY(br2), bar.translate(bx2, by2 + 0.4, bz2), g.push(bar));
      addPanel(
        bx2 + Math.sin(br2) * 0.27,
        bz2 + Math.cos(br2) * 0.27,
        1.9,
        0.5,
        7,
        br2,
        by2 + 0.42,
      );
    }
    for (const [tx2, tz2] of [
      [-66, 36],
      [4, 78],
      [-14, 58],
      [34, 28],
    ]) {
      const ty2 = terrainHeightAt(tx2, tz2);
      for (let k = 0; k < 3; k++) {
        const jb = new BoxGeometry(0.7 + q() * 1.2, 0.4 + q() * 0.6, 0.7 + q());
        (jb.rotateY(q() * 3),
          jb.translate(
            tx2 + (q() - 0.5) * 2.4,
            ty2 + 0.25,
            tz2 + (q() - 0.5) * 2.4,
          ),
          tclt.push(jb));
      }
      const tarp = new BoxGeometry(2.4, 0.16, 2.1);
      (tarp.rotateY(q() * 3),
        tarp.rotateZ((q() - 0.5) * 0.2),
        tarp.translate(tx2, ty2 + 0.85, tz2),
        fclt.push(tarp));
    }
    const mD = new Mesh(
      Nl(dark),
      new MeshBasicMaterial({ color: "#241a3e", fog: !0 }),
    );
    ((mD.castShadow = !1), i.scene.add(mD));
    const mR = new Mesh(Nl(rst), i.mats.rust);
    ((mR.castShadow = !0), (mR.receiveShadow = !0), i.scene.add(mR));
    const mX = new Mesh(Nl(tox), i.mats.toxic);
    ((mX.castShadow = !1), (mX.receiveShadow = !0), i.scene.add(mX));
    const mT = new Mesh(Nl(tclt), i.mats.salvage);
    ((mT.castShadow = !0), (mT.receiveShadow = !0), i.scene.add(mT));
    const mF = new Mesh(Nl(fclt), i.mats.fabric);
    ((mF.castShadow = !0), i.scene.add(mF));
    const mFl = new Mesh(Nl(flames), fm);
    ((mFl.castShadow = !1), i.scene.add(mFl));
    const mP = new Mesh(
      ec(
        panels.map((pp) => (pp.index ? pp.toNonIndexed() : pp)),
        !1,
      ),
      new MeshBasicMaterial({ map: btex, fog: !0 }),
    );
    ((mP.material.toneMapped = !1), (mP.castShadow = !1), i.scene.add(mP));
    // the flames breathe; nothing else out here moves
    i.sceneTick = (t2) => {
      fm.color.setRGB(
        1,
        0.62 + 0.14 * Math.sin(t2 * 11) + 0.07 * Math.sin(t2 * 29 + 2),
        0.24 + 0.09 * Math.sin(t2 * 17 + 1),
      );
    };
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
  // ---- the megastructure line: dead arcologies on every horizon ----
  // fixed seed, scene-only scenery: never in structGroup, never raycast,
  // emits no pockets and no nav — the game cannot see it
  //
  // The towers are DRAWN, not built: pen-plotter linework (25-plotter), swept
  // by azimuth so a machine inks the horizon once at load. The geometry below
  // therefore collects placements rather than merging boxes — a unit cube is
  // chained into pen strokes once, and every tower reuses that decomposition.
  //
  // Only the beacons stay solid. They are lights rather than architecture, and
  // they are the one fog-immune accent out there; as linework they would be
  // four hairlines at that distance instead of a point of colour.
  {
    const q = seededRng(20260726),
      plot: PlotBox[] = [],
      xb = [];
    // geometry-space translate/rotate/translate, expressed as one matrix:
    // T(px,0,pz) . Ry(rot) . T(0,yLocal,0). Rotation is about Y, so a point on
    // the Y axis is unmoved by it and this also covers the unrotated bodies.
    const place = (
      w: number,
      h: number,
      d: number,
      yLocal: number,
      rot: number,
      px: number,
      pz: number,
      az: number,
    ) =>
      plot.push({
        w,
        h,
        d,
        az,
        matrix: new Matrix4()
          .makeTranslation(px, 0, pz)
          .multiply(new Matrix4().makeRotationY(rot))
          .multiply(new Matrix4().makeTranslation(0, yLocal, 0)),
      });
    for (const [q0, q1, qn, h0, h1] of [
      [352, 420, 26, 40, 130],
      [430, 545, 22, 90, 260],
    ])
      for (let k = 0; k < qn; k++) {
        const az = ((k + q() * 0.7) / qn) * Math.PI * 2,
          rad = q0 + q() * (q1 - q0),
          px = Math.sin(az) * rad,
          pz = Math.cos(az) * rad,
          w = 16 + q() * 36,
          dp = 14 + q() * 26,
          hg = h0 + q() * (h1 - h0),
          rot = q() * Math.PI;
        place(w, hg, dp, hg / 2 - 40, rot, px, pz, az);
        if (q() < 0.5)
          place(
            w * 0.55,
            hg * 0.38,
            dp * 0.55,
            hg * 1.17 - 40,
            rot,
            px,
            pz,
            az,
          );
        if (q() < 0.45) {
          place(1.8, hg * 0.5, 1.8, hg * 1.24 - 40, rot, px, pz, az);
          const bc = new BoxGeometry(2.6, 2.6, 2.6);
          (bc.translate(px, hg * 1.49 - 40, pz), xb.push(bc));
        }
        if (q() < 0.4) {
          const ns = 1 + Math.floor(q() * 3);
          for (let j = 0; j < ns; j++) {
            const off = (q() - 0.5) * w * 0.6;
            place(
              1.1,
              hg * (0.3 + q() * 0.35),
              1.1,
              hg * 0.45 - 40,
              0,
              px - Math.sin(az) * (dp * 0.5 + 2) + Math.cos(az) * off,
              pz - Math.cos(az) * (dp * 0.5 + 2) - Math.sin(az) * off,
              az,
            );
          }
        }
      }
    for (let k = 0; k < 8; k++) {
      const az = q() * Math.PI * 2,
        rad = 370 + q() * 130;
      // gantries rust apart from the towers they served
      place(
        80 + q() * 70,
        2.6,
        4.5,
        24 + q() * 96,
        az,
        Math.sin(az) * rad,
        Math.cos(az) * rad,
        az,
      );
    }
    const mb = new Mesh(
      Nl(xb),
      new MeshBasicMaterial({ color: "#ff4f9a", fog: !1 }),
    );
    ((mb.castShadow = !1), i.scene.add(mb));
    const fog = i.scene.fog as any;
    ((i.skylinePlot = new PlotterSkyline(plot, {
      fogColor: fog?.color,
      fogDensity: fog?.density,
    })),
      i.scene.add(...i.skylinePlot.group));
    // chain rather than replace: the burning-drum tick was installed above
    const prevTick = i.sceneTick;
    let last = -1;
    i.sceneTick = (t2) => {
      prevTick && prevTick(t2);
      const dt = last < 0 ? 0 : Math.min(0.1, t2 - last);
      last = t2;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      i.skylinePlot!.update(
        dt,
        window.innerWidth * dpr,
        window.innerHeight * dpr,
      );
    };
  }
  // ---- the perimeter apron: a flat plain running out to the haze ----
  // The terrain mesh is 600x600, so playable ground stops at radius 300 (424
  // at the corners) while the megastructure line starts at 352. Without this
  // the world visibly ends, and from a low camera it floats.
  //
  // This ring used to lift into low rolling hills to close the sightline.
  // It does not any more: the plain is FLAT, and the edge is hidden by
  // distance instead of by terrain. FogExp2 at density 0.0021 is ~80% opaque
  // by radius 600 and ~99.8% by 1200, and the camera's far plane is 1200, so
  // a plain reaching 1600 dissolves into haze long before it runs out. That
  // is a horizon rather than a wall, which is the point.
  //
  // GAMEPLAY IS UNCHANGED. This is scene-only, exactly as the hills were —
  // never in `structGroup`, so it is not a raycast target, grows no pockets
  // and seeds no nav. You cannot build on it and citizens cannot reach it.
  {
    const vn2 = (x2, z2, s2) => {
        const xi = Math.floor(x2),
          zi = Math.floor(z2),
          fx2 = x2 - xi,
          fz2 = z2 - zi,
          u2 = fx2 * fx2 * (3 - 2 * fx2),
          v2 = fz2 * fz2 * (3 - 2 * fz2),
          a2 = fr(xi, zi, s2),
          b2 = fr(xi + 1, zi, s2),
          c2 = fr(xi, zi + 1, s2),
          d2 = fr(xi + 1, zi + 1, s2);
        return (
          a2 + (b2 - a2) * u2 + (c2 - a2) * v2 + (a2 - b2 - c2 + d2) * u2 * v2
        );
      },
      APRON_IN = 284,
      APRON_OUT = 1600,
      // The plain settles to y=0, the height the town itself stands on.
      //
      // It has to be faded into rather than butted against. `terrainHeightAt`
      // keeps generating features forever, so at the map edge it still spans
      // -30 (canyon) to +57 (mesa) — an 87-unit spread that would meet a flat
      // plain as a 44-unit cliff the whole way round.
      //
      // The fade runs on distance outside the SQUARE playable plane, not on
      // radius. Radius gets this wrong: the plane reaches 300 along the axes
      // but 424 at its corners, so a radial fade is already most of the way
      // done where the corners emerge and barely started at the edges, and
      // the taper visibly changes width as it goes round. Square distance
      // gives one constant-width border.
      //
      // 200 units adds at most a ~22 degree grade. That is gentler than the
      // 59 degree cliffs `terrainHeightAt` itself produces inside the map, so
      // it does not read as artificial — and it is short enough to keep the
      // far field genuinely flat, which is the whole point. Lengthening it
      // buys a softer ramp at the cost of the flatness that was asked for.
      PLAIN_Y = 0,
      EDGE = 300,
      FADE_LEN = 200,
      ring = new RingGeometry(APRON_IN, APRON_OUT, 200, 64);
    ring.rotateX(-Math.PI / 2);
    const rp = ring.attributes.position;
    for (let k = 0; k < rp.count; k++) {
      const x0 = rp.getX(k),
        z0 = rp.getZ(k),
        r0 = Math.hypot(x0, z0);
      // RingGeometry spaces its rings evenly, which would spend as many
      // vertices on the dead-flat outer half as on the fade. Redistribute
      // them by radius^1.6 so the detail sits where the ground still has
      // shape in it, and the far plain — which needs none — costs almost
      // nothing. Same vertex count, put where it shows.
      const u = (r0 - APRON_IN) / (APRON_OUT - APRON_IN),
        r = APRON_IN + (APRON_OUT - APRON_IN) * Math.pow(u, 1.6),
        k2 = r0 > 0 ? r / r0 : 1,
        x2 = x0 * k2,
        z2 = z0 * k2;
      (rp.setX(k, x2),
        rp.setZ(k, z2),
        // sunk slightly, so that where this underlaps the square terrain
        // plane (which reaches 424 at its corners) the real ground wins
        // instead of z-fighting with it
        rp.setY(
          k,
          lerp(
            terrainHeightAt(x2, z2),
            PLAIN_Y,
            Nn(0, FADE_LEN, Math.max(Math.abs(x2), Math.abs(z2)) - EDGE),
          ) - 0.9,
        ));
    }
    ring.computeVertexNormals();
    const rt = new Float32Array(rp.count * 2);
    for (let k = 0; k < rp.count; k++) {
      ((rt[k * 2] = 1),
        (rt[k * 2 + 1] =
          0.35 + vn2(rp.getX(k) * 0.05, rp.getZ(k) * 0.05, 4443) * 0.3));
    }
    ring.setAttribute("aTone", new BufferAttribute(rt, 2));
    const mApron = new Mesh(ring, i.mats.rock);
    ((mApron.castShadow = !1),
      (mApron.receiveShadow = !0),
      i.scene.add(mApron));
  }
  // ---- crumbling overpasses: the road network, going nowhere ----
  // elevated decks on piers, collapsed in sections. Decks end in mid-air
  // with rebar hanging; rows of pillars stand with no deck left at all;
  // one section fell whole and lies at an angle. Nobody mistakes a
  // highway viaduct for antiquity. Scene-only, fixed seed, merged.
  {
    const q = seededRng(77031),
      conc = [],
      bars = [],
      pipes = [];
    for (const [az, rad] of [
      [0.62, 195],
      [2.55, 232],
      [4.15, 176],
      [5.35, 272],
      [1.62, 252],
    ]) {
      const cx = Math.sin(az) * rad,
        cz = Math.cos(az) * rad,
        da = az + Math.PI / 2 + (q() - 0.5) * 0.6,
        dx = Math.sin(da),
        dz = Math.cos(da),
        lx = dz,
        lz = -dx,
        half = 62 + q() * 55,
        deckY = terrainHeightAt(cx, cz) + 15 + q() * 9,
        spanL = 15,
        deckW = 7.5,
        deckT = 1.1,
        nSp = Math.floor((half * 2) / spanL),
        deckAt = [];
      let alive = q() < 0.75;
      for (let k = 0; k < nSp; k++)
        (q() < (alive ? 0.16 : 0.34) && (alive = !alive), deckAt.push(alive));
      for (let k = 0; k <= nSp; k++) {
        const t2 = -half + k * spanL,
          px = cx + dx * t2,
          pz = cz + dz * t2,
          gy = terrainHeightAt(px, pz),
          ph = deckY - deckT - gy;
        if (ph > 3.5) {
          // piers stand whether or not any deck is left to carry
          const pier = new BoxGeometry(1.8, ph, 2.7);
          (pier.rotateY(da),
            pier.translate(px, gy + ph / 2, pz),
            conc.push(pier));
          const cap = new BoxGeometry(2.3, 0.85, deckW + 1.0);
          (cap.rotateY(da),
            cap.translate(px, deckY - deckT - 0.42, pz),
            conc.push(cap));
        }
        if (k < nSp && deckAt[k]) {
          const mx = cx + dx * (t2 + spanL / 2),
            mz = cz + dz * (t2 + spanL / 2),
            deck = new BoxGeometry(spanL + 0.3, deckT, deckW);
          (deck.rotateY(da),
            deck.translate(mx, deckY - deckT / 2, mz),
            conc.push(deck));
          for (const s2 of [-1, 1]) {
            const par = new BoxGeometry(spanL + 0.3, 0.72, 0.3);
            (par.rotateY(da),
              par.translate(
                mx + lx * s2 * deckW * 0.47,
                deckY + 0.36,
                mz + lz * s2 * deckW * 0.47,
              ),
              conc.push(par));
          }
          // a service main clings to one edge, gone verdigris green
          const pipe = new BoxGeometry(spanL + 0.3, 0.42, 0.42);
          (pipe.rotateY(da),
            pipe.translate(
              mx + lx * deckW * 0.56,
              deckY - deckT - 0.5,
              mz + lz * deckW * 0.56,
            ),
            pipes.push(pipe));
          // rebar hangs where the deck ends in mid-air
          for (const end of [0, 1]) {
            if (end ? deckAt[k + 1] : deckAt[k - 1]) continue;
            const ex = t2 + end * spanL;
            for (let j2 = 0; j2 < 5; j2++) {
              const bar = new BoxGeometry(0.09, 1.5 + q() * 1.6, 0.09);
              (bar.rotateX((q() - 0.5) * 0.8),
                bar.rotateZ((q() - 0.5) * 0.5),
                bar.rotateY(da),
                bar.translate(
                  cx + dx * ex + lx * (j2 - 2) * 1.4,
                  deckY - deckT - 0.7,
                  cz + dz * ex + lz * (j2 - 2) * 1.4,
                ),
                bars.push(bar));
            }
          }
        }
      }
      // one section fell whole and lies at an angle below the line
      const ft = -half + Math.floor(nSp * (0.3 + q() * 0.4)) * spanL,
        fx = cx + dx * ft + lx * 3.2,
        fz = cz + dz * ft + lz * 3.2,
        fy = terrainHeightAt(fx, fz),
        fallen = new BoxGeometry(spanL, deckT, deckW);
      (fallen.rotateZ(0.34 + q() * 0.2),
        fallen.rotateY(da + 0.25),
        fallen.translate(fx, fy + 2.2, fz),
        conc.push(fallen));
    }
    const mC = new Mesh(Nl(conc), i.mats.stoneOld);
    ((mC.castShadow = !1), (mC.receiveShadow = !1), i.scene.add(mC));
    const mB2 = new Mesh(
      Nl(bars),
      new MeshBasicMaterial({ color: "#54301c", fog: !0 }),
    );
    ((mB2.castShadow = !1), i.scene.add(mB2));
    const mV = new Mesh(Nl(pipes), i.mats.verdigris);
    ((mV.castShadow = !1), i.scene.add(mV));
  }
  // ---- three more things nobody came back for ----
  // the outfall (infrastructure still running), the crane (work stopped
  // mid-action), the drained reservoir (the water left, slowly).
  // Scene-only, fixed seed, merged; never in structGroup.
  {
    const q = seededRng(61207),
      oc = [], // concrete → stoneOld (board-formed pour seams)
      orst = [], // rust
      otox = [], // the yellow-green — sludge, crust, pools
      osal = [], // salvage
      odark = [], // near-black: voids, cables, stains-as-line
      ostn = []; // the big stain ribbon, its own dark bile colour
    // a strut between two points — lattice is just repeated boxes
    const strut = (x1, y1, z1, x2, y2, z2, th, arr) => {
      const dx = x2 - x1,
        dy = y2 - y1,
        dz = z2 - z1,
        b = new BoxGeometry(Math.hypot(dx, dy, dz), th, th);
      (b.rotateZ(Math.atan2(dy, Math.hypot(dx, dz))),
        b.rotateY(Math.atan2(-dz, dx)),
        b.translate((x1 + x2) / 2, (y1 + y2) / 2, (z1 + z2) / 2),
        arr.push(b));
    };
    // -- the outfall: a concrete main cantilevered over the canyon rim,
    // still discharging. Nobody is upstream. Something is still pumping.
    {
      const oz = 24,
        ry = terrainHeightAt(37, oz);
      const pipe = new CylinderGeometry(1.5, 1.5, 13, 12);
      (pipe.rotateZ(Math.PI / 2),
        pipe.translate(39.5, ry + 1.7, oz),
        oc.push(pipe));
      const mouth = new CylinderGeometry(1.22, 1.22, 0.5, 12);
      (mouth.rotateZ(Math.PI / 2),
        mouth.translate(45.85, ry + 1.7, oz),
        odark.push(mouth));
      for (const sx of [34.5, 37.8]) {
        const sad = new BoxGeometry(1.6, 1.6, 3.4);
        (sad.translate(sx, ry + 0.5, oz), oc.push(sad));
      }
      // crusted deposits around the mouth — years of it
      for (let k = 0; k < 7; k++) {
        const ca = q() * Math.PI * 2,
          cr = new BoxGeometry(
            0.5 + q() * 0.7,
            0.3 + q() * 0.4,
            0.5 + q() * 0.6,
          );
        (cr.rotateY(q() * 3),
          cr.translate(
            45.6 + q() * 0.8,
            ry + 1.7 + Math.sin(ca) * 1.5,
            oz + Math.cos(ca) * 1.5,
          ),
          otox.push(cr));
      }
      // the discharge: a slow viscous column, straight down to the slope
      const fallH = ry + 1.2 - terrainHeightAt(46, oz),
        col = new BoxGeometry(0.85, fallH, 0.7);
      (col.translate(46, ry + 1.2 - fallH / 2, oz), otox.push(col));
      // service walkway alongside, railings gone — posts remain
      const walk = new BoxGeometry(8.5, 0.16, 1.15);
      (walk.translate(38, ry + 0.92, oz - 2.35), orst.push(walk));
      for (let k = 0; k < 7; k++) {
        const post = new BoxGeometry(0.08, 0.85, 0.08);
        (q() < 0.3 && post.rotateX(0.5 + q() * 0.6),
          post.translate(34.4 + k * 1.25, ry + 1.4, oz - 2.85),
          orst.push(post));
      }
      // the stain: a ribbon draped down the rock face, widening as it
      // falls — this is the part that reads from across the canyon
      const sPos = [],
        sNrm = [];
      let px = 44.6;
      const steps = 9;
      for (let k = 0; k < steps; k++) {
        const xa = px,
          xb = px + (k < 2 ? 1.0 : 1.35),
          wa = 0.55 + (k / steps) * 2.6,
          wb = 0.55 + ((k + 1) / steps) * 2.6,
          ya = terrainHeightAt(xa, oz) + 0.18,
          yb = terrainHeightAt(xb, oz) + 0.18,
          quad = [
            [xa, ya, oz - wa],
            [xb, yb, oz - wb],
            [xa, ya, oz + wa],
            [xa, ya, oz + wa],
            [xb, yb, oz - wb],
            [xb, yb, oz + wb],
          ];
        for (const v of quad) (sPos.push(v[0], v[1], v[2]), sNrm.push(0, 1, 0));
        px = xb;
      }
      const stain = new BufferGeometry();
      (stain.setAttribute(
        "position",
        new BufferAttribute(new Float32Array(sPos), 3),
      ),
        stain.setAttribute(
          "normal",
          new BufferAttribute(new Float32Array(sNrm), 3),
        ),
        ostn.push(stain));
      // pooled at the bottom, going nowhere
      const pool = new CylinderGeometry(3.1, 3.8, 0.26, 12),
        pf = terrainHeightAt(53.5, oz + 1);
      (pool.translate(53.5, pf + 0.18, oz + 1), otox.push(pool));
    }
    // -- the tower crane: load still on the hook. Cranes are how a city
    // gets built; this one stopped mid-sentence.
    {
      const cx = -92,
        cz = 60,
        gy = terrainHeightAt(cx, cz),
        mh = 34,
        s = 0.85,
        jx = Math.SQRT1_2,
        jz = -Math.SQRT1_2; // jib bears toward the city
      // footing
      const foot = new BoxGeometry(3.6, 1.1, 3.6);
      (foot.translate(cx, gy + 0.55, cz), oc.push(foot));
      // mast: four chords, rungs and alternating diagonals
      for (const [ox, oz2] of [
        [-s, -s],
        [s, -s],
        [-s, s],
        [s, s],
      ])
        strut(cx + ox, gy, cz + oz2, cx + ox, gy + mh, cz + oz2, 0.16, orst);
      for (let lv = 0; lv < 13; lv++) {
        const y = gy + 2.2 + lv * 2.45,
          y2 = y + 2.45;
        (strut(cx - s, y, cz - s, cx + s, y, cz - s, 0.09, orst),
          strut(cx - s, y, cz + s, cx + s, y, cz + s, 0.09, orst),
          strut(cx - s, y, cz - s, cx - s, y, cz + s, 0.09, orst),
          strut(cx + s, y, cz - s, cx + s, y, cz + s, 0.09, orst));
        if (lv < 12)
          lv % 2
            ? (strut(cx - s, y, cz - s, cx + s, y2, cz - s, 0.08, orst),
              strut(cx - s, y2, cz + s, cx + s, y, cz + s, 0.08, orst))
            : (strut(cx + s, y, cz - s, cx - s, y2, cz - s, 0.08, orst),
              strut(cx + s, y2, cz + s, cx - s, y, cz + s, 0.08, orst));
      }
      // slew platform, cab, apex
      const ty = gy + mh;
      const slew = new BoxGeometry(2.6, 0.7, 2.6);
      (slew.translate(cx, ty + 0.35, cz), orst.push(slew));
      const cab = new BoxGeometry(1.5, 1.7, 1.9);
      (cab.rotateY(Math.atan2(jx, jz)),
        cab.translate(cx + jx * 1.9, ty + 1.4, cz + jz * 1.9),
        odark.push(cab));
      const apex = { x: cx - jx * 0.6, y: ty + 5.2, z: cz - jz * 0.6 };
      (strut(
        cx - s * 0.9,
        ty + 0.7,
        cz - s * 0.9,
        apex.x,
        apex.y,
        apex.z,
        0.12,
        orst,
      ),
        strut(
          cx + s * 0.9,
          ty + 0.7,
          cz + s * 0.9,
          apex.x,
          apex.y,
          apex.z,
          0.12,
          orst,
        ));
      // jib: 25m of triangular lattice toward the city
      const jl = 25,
        jy = ty + 0.9;
      for (const lat of [-0.55, 0.55])
        strut(
          cx + lat * -jz,
          jy,
          cz + lat * jx,
          cx + jx * jl + lat * -jz,
          jy,
          cz + jz * jl + lat * jx,
          0.11,
          orst,
        );
      strut(
        cx,
        jy + 1.05,
        cz,
        cx + jx * (jl - 2.5),
        jy + 1.05,
        cz + jz * (jl - 2.5),
        0.11,
        orst,
      );
      for (let k = 1; k * 2.3 < jl; k++) {
        const t2 = k * 2.3,
          bx2 = cx + jx * t2,
          bz2 = cz + jz * t2;
        (strut(
          bx2 - 0.55 * -jz,
          jy,
          bz2 - 0.55 * jx,
          bx2,
          jy + 1.05,
          bz2,
          0.07,
          orst,
        ),
          strut(
            bx2 + 0.55 * -jz,
            jy,
            bz2 + 0.55 * jx,
            bx2,
            jy + 1.05,
            bz2,
            0.07,
            orst,
          ),
          strut(
            bx2 - 0.55 * -jz,
            jy,
            bz2 - 0.55 * jx,
            bx2 + 0.55 * -jz,
            jy,
            bz2 + 0.55 * jx,
            0.07,
            orst,
          ));
      }
      // counter-jib and its dead weight
      const bl = 8.5;
      const cdeck = new BoxGeometry(bl, 0.28, 2.0);
      (cdeck.rotateY(Math.atan2(-jx, -jz) + Math.PI / 2),
        cdeck.translate(cx - jx * bl * 0.5, jy + 0.1, cz - jz * bl * 0.5),
        orst.push(cdeck));
      for (let k = 0; k < 3; k++) {
        const cw = new BoxGeometry(0.55, 2.3, 1.7);
        (cw.rotateY(Math.atan2(jx, jz)),
          cw.translate(
            cx - jx * (bl - 1.1 - k * 0.75),
            jy - 1.0,
            cz - jz * (bl - 1.1 - k * 0.75),
          ),
          oc.push(cw));
      }
      (strut(
        apex.x,
        apex.y,
        apex.z,
        cx + jx * (jl - 1),
        jy + 0.2,
        cz + jz * (jl - 1),
        0.07,
        orst,
      ),
        strut(
          apex.x,
          apex.y,
          apex.z,
          cx - jx * (bl - 0.5),
          jy + 0.1,
          cz - jz * (bl - 0.5),
          0.07,
          orst,
        ));
      // the trolley, the cables, and the load — hanging, not landed
      const tt = 16.5,
        hx = cx + jx * tt,
        hz = cz + jz * tt;
      const trol = new BoxGeometry(1.1, 0.35, 1.1);
      (trol.rotateY(Math.atan2(jx, jz)),
        trol.translate(hx, jy - 0.25, hz),
        orst.push(trol));
      const loadY = gy + 3.4;
      (strut(hx - 0.28, jy - 0.4, hz, hx - 0.28, loadY + 0.9, hz, 0.045, odark),
        strut(
          hx + 0.28,
          jy - 0.4,
          hz,
          hx + 0.28,
          loadY + 0.9,
          hz,
          0.045,
          odark,
        ));
      const blk = new BoxGeometry(0.55, 0.8, 0.4);
      (blk.translate(hx, loadY + 0.55, hz), odark.push(blk));
      const pal = new BoxGeometry(1.75, 0.14, 1.35);
      (pal.rotateY(0.4), pal.translate(hx, loadY, hz), osal.push(pal));
      for (let k = 0; k < 7; k++) {
        const bb2 = new BoxGeometry(0.5, 0.5, 0.5);
        (bb2.rotateY(0.4 + (q() - 0.5) * 0.15),
          bb2.translate(
            hx + ((k % 3) - 1) * 0.52,
            loadY + 0.33 + Math.floor(k / 3) * 0.52,
            hz + (Math.floor(k / 3) % 2 ? 0.26 : -0.22),
          ),
          oc.push(bb2));
      }
    }
    // -- the drained reservoir: tide-lines are years, not an event.
    // Everything else here is sudden absence; this one is decline.
    {
      const rx = -24,
        rz = 160,
        seg = 18,
        rad = 24,
        baseY = -3.4,
        topY = 4.3,
        floorY = 0.35;
      for (let k = 0; k < seg; k++) {
        const a = ((k + 0.5) / seg) * Math.PI * 2,
          wx = rx + Math.sin(a) * rad,
          wz = rz + Math.cos(a) * rad,
          wall = new BoxGeometry(9.0, topY - baseY, 1.3);
        (wall.rotateY(a),
          wall.translate(wx, (topY + baseY) / 2, wz),
          oc.push(wall));
        // parapet coping, broken in places
        if (q() < 0.8) {
          const cop = new BoxGeometry(8.6, 0.35, 1.7);
          (cop.rotateY(a), cop.translate(wx, topY + 0.17, wz), oc.push(cop));
        }
      }
      // tide-lines: each ring a level the water held long enough to stain.
      // The spacing tightens near the floor — the last years went slowly.
      let ty2 = 3.3;
      for (let ring = 0; ring < 6; ring++) {
        for (let k = 0; k < seg; k++) {
          const a = ((k + 0.5) / seg) * Math.PI * 2,
            tl = new BoxGeometry(8.2, 0.14 + ring * 0.025, 0.22);
          (tl.rotateY(a),
            tl.translate(
              rx + Math.sin(a) * (rad - 0.85),
              ty2,
              rz + Math.cos(a) * (rad - 0.85),
            ),
            odark.push(tl));
        }
        ty2 -= 0.95 - ring * 0.09;
      }
      // cracked mud floor, and the cracks drawn on it
      const flo = new CylinderGeometry(rad - 0.6, rad - 0.6, 1.1, seg);
      (flo.translate(rx, floorY - 0.55, rz), oc.push(flo));
      for (let k = 0; k < 30; k++) {
        const a = q() * Math.PI * 2,
          r2 = Math.sqrt(q()) * (rad - 3),
          crk = new BoxGeometry(2.2 + q() * 4.2, 0.05, 0.09);
        (crk.rotateY(q() * Math.PI * 2),
          crk.translate(
            rx + Math.sin(a) * r2,
            floorY + 0.035,
            rz + Math.cos(a) * r2,
          ),
          odark.push(crk));
      }
      // the intake tower — absurdly tall now, its waterline doors in the air
      const ix = rx + 7,
        iz = rz - 5;
      const twr = new CylinderGeometry(1.6, 1.9, 8.2, 10);
      (twr.translate(ix, floorY + 4.1, iz), oc.push(twr));
      const cab2 = new BoxGeometry(3.2, 1.7, 3.2);
      (cab2.rotateY(0.3), cab2.translate(ix, floorY + 9.05, iz), oc.push(cab2));
      for (let k = 0; k < 3; k++) {
        const dor = new BoxGeometry(0.7, 1.0, 0.2);
        (dor.rotateY(2.2),
          dor.translate(ix + 1.35, floorY + 2.0 + k * 2.1, iz + 0.6),
          odark.push(dor));
      }
      // and a boat, on its side in the mud, keel to the sky
      const hull2 = new BoxGeometry(3.4, 0.9, 1.3);
      (hull2.rotateZ(1.25),
        hull2.rotateY(0.8),
        hull2.translate(rx - 6, floorY + 0.55, rz + 7),
        osal.push(hull2));
      const keel = new BoxGeometry(3.0, 0.16, 0.16);
      (keel.rotateZ(1.25),
        keel.rotateY(0.8),
        keel.translate(rx - 6.45, floorY + 0.62, rz + 7),
        osal.push(keel));
    }
    const mOC = new Mesh(Nl(oc), i.mats.stoneOld);
    ((mOC.castShadow = !0), (mOC.receiveShadow = !0), i.scene.add(mOC));
    const mOR = new Mesh(Nl(orst), i.mats.rust);
    ((mOR.castShadow = !0), (mOR.receiveShadow = !0), i.scene.add(mOR));
    const mOX = new Mesh(Nl(otox), i.mats.toxic);
    ((mOX.castShadow = !1), (mOX.receiveShadow = !0), i.scene.add(mOX));
    const mOT = new Mesh(Nl(osal), i.mats.salvage);
    ((mOT.castShadow = !0), i.scene.add(mOT));
    const mOD = new Mesh(
      Nl(odark),
      new MeshBasicMaterial({ color: "#241a3e", fog: !0 }),
    );
    ((mOD.castShadow = !1), i.scene.add(mOD));
    const mOS = new Mesh(
      Nl(ostn),
      new MeshBasicMaterial({ color: "#5d6a24", fog: !0 }),
    );
    ((mOS.castShadow = !1), i.scene.add(mOS));
  }
}
function P_(i) {
  const t = new BufferGeometry(),
    e = new Float32Array([
      -0.9, 0, 0.25, 0, 0, 0, -0.75, 0.16, -0.2, 0.9, 0, 0.25, 0.75, 0.16, -0.2,
      0, 0, 0,
    ]);
  (t.setAttribute("position", new BufferAttribute(e, 3)),
    t.computeVertexNormals());
  const n = new MeshBasicMaterial({
      color: "#33245c",
      side: DoubleSide,
      fog: !0,
    }),
    s = 17,
    r = new InstancedMesh(t, n, s);
  ((r.frustumCulled = !1), i.scene.add(r));
  const o = [
      { cx: -30, cz: -20, cy: 42, r: 34 },
      { cx: 55, cz: 10, cy: 26, r: 40 },
      // gulls working the landfill benches
      { cx: -112, cz: 100, cy: terrainHeightAt(-112, 100) + 15, r: 22 },
      { cx: -80, cz: 118, cy: terrainHeightAt(-80, 118) + 11, r: 14 },
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
