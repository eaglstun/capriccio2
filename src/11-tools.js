// Placement tool state machine (multi-stage picking)
//
// Extracted verbatim from public/assets/index-DCXbw2vV.js,
// lines 29081–29455.
// Identifiers are minifier-mangled; nothing here has been renamed.
// Regenerate with: python3 tools/split_bundle.py --write

class PlacementTool {
  constructor(t, e, n) {
    K(this, "world");
    K(this, "camera");
    K(this, "scene");
    K(this, "tool", null);
    K(this, "variant", "");
    K(this, "stage", 0);
    K(this, "firstPoint", null);
    K(this, "firstAnchor", -1);
    K(this, "ghost", null);
    K(this, "ghostOk", !0);
    K(this, "marker");
    K(this, "ray", new vh());
    K(this, "onCommit", null);
    K(this, "onMessage", null);
    K(this, "lastHover", null);
    K(this, "lastGhostAt", 0);
    K(this, "ghostMat");
    K(this, "ghostBadMat");
    K(this, "chalk");
    ((this.world = t),
      (this.camera = e),
      (this.scene = n),
      (this.ghostMat = t.mats.ghost),
      (this.ghostBadMat = t.mats.ghostBad));
    const s = new Fe(0.8, 0.8, 0.35, 16);
    ((this.marker = new he(s, this.ghostMat)),
      (this.marker.visible = !1),
      n.add(this.marker),
      (this.chalk = new BuildOverlays(n)));
  }
  setTool(t, e) {
    ((this.tool = t),
      (this.variant = e ?? (t ? BUILD_CATALOGUE[t][0].key : "")),
      this.reset(),
      this.chalk.clearMarks(),
      t === "carve" && this.chalk.markCarvables(this.world),
      (t === "span" || t === "rise") && this.chalk.markAnchors(this.world));
  }
  reset() {
    ((this.stage = 0),
      (this.firstPoint = null),
      (this.firstAnchor = -1),
      this.clearGhost(),
      this.chalk.clearLive(),
      (this.marker.visible = this.tool !== null));
  }
  clearGhost() {
    this.ghost &&
      (this.ghost.parent?.remove(this.ghost),
      this.ghost.geometry.dispose(),
      (this.ghost = null));
  }
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
  draftAction(t, e) {
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
      ((e = new Hr(l, 0.3, 8, 22, Math.PI)), e.rotateY(c + Math.PI / 2));
      const h = new Fe(0.28, 0.28, t.h - l, 8);
      (h.translate(-l, -(t.h - l) / 2, 0), h.rotateY(c + Math.PI / 2));
      const u = new Fe(0.28, 0.28, t.h - l, 8);
      (u.translate(l, -(t.h - l) / 2, 0),
        u.rotateY(c + Math.PI / 2),
        (e = zl([e, h, u])),
        e.translate(o, terrainHeightAt(o, a) + t.h - l, a));
    } else if (t.t === "designate")
      ((e = new Fe(t.r, t.r, 0.4, 28)),
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
      (this.ghost = new he(e, s ? this.ghostMat : this.ghostBadMat)),
      this.scene.add(this.ghost),
      s
    );
  }
  costOf(t) {
    if (t.t === "carve") return { stone: 30, timber: 10 };
    if (t.t === "designate") return { stone: 0, timber: 0 };
    const e = buildStructureMesh({ ...t, id: 999998 });
    return {
      stone: Math.round(e.cost.stone),
      timber: Math.round(e.cost.timber),
    };
  }
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
  const r = new ve();
  return (
    r.setAttribute("position", new pe(n, 3)),
    r.computeVertexNormals(),
    r
  );
}
