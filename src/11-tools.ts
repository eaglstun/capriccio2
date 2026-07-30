// Placement tool state machine (multi-stage picking)
//
// Extracted from public/assets/index-DCXbw2vV.js, bundle lines
// 29081–29455. Statements are verbatim; identifiers are
// renamed via src/renames.json. Imports and exports are generated.
// Regenerate: python3 tools/split_bundle.py --write

// --- generated imports ---
import {
  BufferAttribute,
  BufferGeometry,
  Camera,
  CylinderGeometry,
  Mesh,
  Object3D,
  Raycaster,
  TorusGeometry,
} from "three";
import { terrainHeightAt } from "./01-materials";
import { setToneAttribute } from "./03-geometry";
import { buildStructureMesh } from "./04-builders";
import { Fl, W_, X_, gameState } from "./07-citizens";
import { BUILD_CATALOGUE, VAULT_FOOTPRINTS } from "./09-catalogue";
import { BuildOverlays } from "./10-overlays";
// --- end generated imports ---

/**
 * The record a placement commits: exactly the shape the save stores and
 * `applyAction` replays.
 *
 * The per-tool fields differ by `t` — a span carries ax/ay/az/bx/by/bz, a
 * vault carries w/d, an anchor carries topY/style — so the real type is a
 * discriminated union on `t`. Writing that union out is phase-2 work; until
 * then the tool-specific fields are left open and only the fields every
 * action has are named.
 */
interface PlacedAction {
  t: string;
  id: number;
  /** Stamped at commit time (the Chronicle enabler). Absent on old saves. */
  day?: number;
  hour?: number;
  [k: string]: any;
}

class PlacementTool {
  world: any;
  camera: Camera;
  scene: Object3D;
  /** The selected tool key, or null when the tool is put down. */
  tool: string | null = null;
  variant = "";
  /** Multi-click progress: 0 = nothing placed yet, 1 = first point taken. */
  stage = 0;
  firstPoint: any = null;
  firstAnchor = -1;
  ghost: Mesh | null = null;
  ghostOk = !0;
  marker: Mesh;
  ray = new Raycaster();
  onCommit: ((action: any) => void) | null = null;
  onMessage: ((line: string) => void) | null = null;
  lastHover: any = null;
  lastGhostAt = 0;
  ghostMat: any;
  ghostBadMat: any;
  chalk: BuildOverlays;
  // the game clock ({day, hour}), set by the bootstrap. Every committed
  // action is stamped with the moment it was made — the Chronicle enabler.
  // Old saves simply lack the fields; older builds ignore them. See
  // CHRONICLE.md.
  clock: { day: number; hour: number } | null = null;

  constructor(t: any, e: Camera, n: Object3D) {
    ((this.world = t),
      (this.camera = e),
      (this.scene = n),
      (this.ghostMat = t.mats.ghost),
      (this.ghostBadMat = t.mats.ghostBad));
    const s = new CylinderGeometry(0.8, 0.8, 0.35, 16);
    ((this.marker = new Mesh(s, this.ghostMat)),
      (this.marker.visible = !1),
      n.add(this.marker),
      (this.chalk = new BuildOverlays(n)));
  }
  /**
   * Select a tool and its variant (e.g. "span" + "aqueduct"). Passing null
   * puts the tool down. Always resets the multi-click state — switching tools
   * mid-placement must not leave a stale first point behind.
   */
  setTool(t, e?) {
    ((this.tool = t),
      (this.variant = e ?? (t ? BUILD_CATALOGUE[t][0].key : "")),
      this.reset(),
      this.chalk.clearMarks(),
      t === "carve" && this.chalk.markCarvables(this.world),
      (t === "span" || t === "rise") && this.chalk.markAnchors(this.world));
  }
  /** Clear the multi-stage placement state: stage, first point, first anchor. */
  reset() {
    ((this.stage = 0),
      (this.firstPoint = null),
      (this.firstAnchor = -1),
      this.clearGhost(),
      this.chalk.clearLive(),
      (this.marker.visible = this.tool !== null));
  }
  /** Remove the translucent preview mesh and dispose its geometry. */
  clearGhost() {
    this.ghost &&
      (this.ghost.parent?.remove(this.ghost),
      this.ghost.geometry.dispose(),
      (this.ghost = null));
  }
  /**
   * Raycast the pointer into the world. Returns the hit point, the surface it
   * belongs to, and `anchorId` if the ray landed on a pier or column top.
   *
   * Only `world.raycastTargets()` is tested — scene-only decoration is
   * deliberately excluded, which is why the skyline, billboards and overpasses
   * cannot be clicked or built on.
   */
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
  /**
   * Per-frame cursor update: repick, redraw the ghost, and refresh whatever
   * guide the current tool wants (a string to the first point, a footprint
   * rectangle, carvable marks).
   *
   * Also decides whether the ghost shows as valid or invalid, which is the
   * player's only warning before a click is refused.
   */
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
        const a = VAULT_FOOTPRINTS[this.variant] ?? VAULT_FOOTPRINTS.market;
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
  /**
   * Build the action object a click would commit, or null if it is not legal.
   *
   * THIS IS WHERE ALL PLACEMENT RULES LIVE — snapping, minimum and maximum
   * lengths, the clearance-gated span and vault limits, gradient limits on
   * stairs, and which surfaces a given tool may target.
   *
   * It returns a plain object of exactly the shape the save stores and
   * `applyAction` consumes, so what you preview is literally what gets
   * recorded and replayed.
   */
  draftAction(t, e): PlacedAction | null {
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
        const s = VAULT_FOOTPRINTS[this.variant] ?? VAULT_FOOTPRINTS.market,
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
  /** Build the translucent preview from a drafted action, in ghost or ghostBad
   * material depending on validity. */
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
      ((e = new TorusGeometry(l, 0.3, 8, 22, Math.PI)),
        e.rotateY(c + Math.PI / 2));
      const h = new CylinderGeometry(0.28, 0.28, t.h - l, 8);
      (h.translate(-l, -(t.h - l) / 2, 0), h.rotateY(c + Math.PI / 2));
      const u = new CylinderGeometry(0.28, 0.28, t.h - l, 8);
      (u.translate(l, -(t.h - l) / 2, 0),
        u.rotateY(c + Math.PI / 2),
        (e = zl([e, h, u])),
        e.translate(o, terrainHeightAt(o, a) + t.h - l, a));
    } else if (t.t === "designate")
      ((e = new CylinderGeometry(t.r, t.r, 0.4, 28)),
        e.translate(t.x, terrainHeightAt(t.x, t.z) + 0.3, t.z));
    else {
      const r = buildStructureMesh({ ...t, id: 999999 }),
        o = [];
      for (const a of Object.keys(r.pieces))
        for (const c of r.pieces[a]) o.push(c);
      o.length && (e = zl(o));
    }
    if (!e) return !0;
    setToneAttribute(e);
    const n = this.costOf(t),
      s = this.validate(t) && Fl(n);
    return (
      (this.ghost = new Mesh(e, s ? this.ghostMat : this.ghostBadMat)),
      this.scene.add(this.ghost),
      s
    );
  }
  /** Stone and salvage an action would cost. Sandbox mode (`folio`) is free. */
  costOf(t) {
    if (t.t === "carve") return { stone: 30, salvage: 10 };
    if (t.t === "designate") return { stone: 0, salvage: 0 };
    const e = buildStructureMesh({ ...t, id: 999998 });
    return {
      stone: Math.round(e.cost.stone),
      salvage: Math.round(e.cost.salvage),
    };
  }
  /**
   * Final legality check before commit — the length and size limits that
   * depend on CLEARANCE.
   *
   * Spans cap at 55 / 95 / 150 and vaults at 40 / 60 / 75 as clearance passes
   * 60 and 150. This is the mechanism by which answering citizens literally
   * extends your reach; see docs/PROGRESSION.md.
   */
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
      const e = gameState.folio ? 75 : gameState.res.favor >= 60 ? 60 : 40;
      if (t.l > e) return !1;
    }
    return !0;
  }
  /**
   * Commit a click.
   *
   * Spans, stairs and vaults are TWO-STAGE: the first click stores
   * `firstPoint` (snapped to a pier top if the ray hit one) and returns; the
   * second drafts and commits the action. Everything else commits on one
   * click.
   *
   * Returns true if the click was consumed, so the caller knows whether to
   * treat it as a camera drag instead.
   */
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
        ? ((r.id = gameState.nextId++),
          // stamp the moment of creation onto the action — day and hour to
          // one decimal. Backward-compatible both ways: absent on old saves,
          // ignored by older builds, and loadGame gates only on `v`.
          this.clock &&
            ((r.day = this.clock.day),
            (r.hour = Math.round(this.clock.hour * 10) / 10)),
          W_(o),
          r.t === "carve" && (gameState.res.stone += 15),
          gameState.playerActions.push(structuredClone(r)),
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
  const r = new BufferGeometry();
  return (
    r.setAttribute("position", new BufferAttribute(n, 3)),
    r.computeVertexNormals(),
    r
  );
}

// --- generated exports ---
export { PlacementTool };
