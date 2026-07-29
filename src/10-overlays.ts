// Build overlays: dashed guides, carvable marks
//
// Extracted from public/assets/index-DCXbw2vV.js, bundle lines
// 28952–29080. Statements are verbatim; identifiers are
// renamed via src/renames.json. Imports and exports are generated.
// Regenerate: python3 tools/split_bundle.py --write

// --- generated imports ---
import { BufferGeometry, Group, Line, LineBasicMaterial, LineDashedMaterial, Vector3 } from "three";
import { terrainHeightAt } from "./01-materials";
// --- end generated imports ---

class BuildOverlays {
  /** Persistent setting-out scribes on carvable surfaces (A12). */
  marks = new Group();
  /** The guide for the tool currently in hand; cleared every placement. */
  live = new Group();
  dashMat: LineDashedMaterial;
  carveMat: LineDashedMaterial;
  stringMat: LineBasicMaterial;

  constructor(t: Object3D) {
    (t.add(this.marks, this.live),
      (this.dashMat = new LineDashedMaterial({
        color: "#ff5fc8",
        transparent: !0,
        opacity: 0.6,
        dashSize: 0.6,
        gapSize: 0.45,
      })),
      // the CARVE guide is emphatic where the always-on scribes are quiet:
      // hotter, near-opaque, denser dashes — context has one tool selected,
      // so the volume is earned here and nowhere else
      (this.carveMat = new LineDashedMaterial({
        color: "#ffd24a",
        transparent: !0,
        opacity: 0.95,
        dashSize: 1.0,
        gapSize: 0.35,
      })),
      (this.stringMat = new LineBasicMaterial({
        color: "#2ec8d4",
        transparent: !0,
        opacity: 0.65,
      })));
  }
  /** A dashed line through points `t`. computeLineDistances is required or the
   * dash pattern silently does nothing. */
  dashedLine(t, e = this.dashMat) {
    const n = new Line(new BufferGeometry().setFromPoints(t), e);
    return (n.computeLineDistances(), n);
  }
  /** Drop the persistent marks layer (carvable faces, anchor tops). */
  clearMarks() {
    Ol(this.marks);
  }
  /** Drop the live layer — the preview that follows the cursor. */
  clearLive() {
    Ol(this.live);
  }
  /**
   * Show where CARVE can cut: dashes along both faces of every wall, spaced
   * every 5 units and inset past the wall thickness so they float just clear
   * of the surface rather than z-fighting with it.
   */
  markCarvables(t) {
    this.clearMarks();
    for (const [, e] of t.structures)
      if (e.action.t === "wall") {
        const n = e.action,
          s = Math.hypot(n.bx - n.ax, n.bz - n.az),
          r = (n.bx - n.ax) / s,
          o = (n.bz - n.az) / s,
          a = Math.cos(Math.atan2(r, o)),
          c = -Math.sin(Math.atan2(r, o));
        for (const l of [-1, 1])
          // two rails, ankle and lintel height, so the marked face reads
          // as a FACE rather than a line on the ground
          for (const m of [1.35, 5.6]) {
            const h = [];
            for (let u = 2; u <= s - 2; u += 5) {
              const d = n.ax + r * u + a * l * (n.th / 2 + 0.3),
                f = n.az + o * u + c * l * (n.th / 2 + 0.3);
              h.push(new Vector3(d, terrainHeightAt(d, f) + m, f));
            }
            h.length > 1 && this.marks.add(this.dashedLine(h, this.carveMat));
          }
      } else if (
        e.action.t === "anchor" &&
        e.action.style === "giant" &&
        !e.action.carveAxis
      ) {
        const n = e.action,
          s = 5.2;
        for (const m of [1.35, 5.6]) {
          const r = [];
          for (const [o, a] of [
            [-s, -s],
            [s, -s],
            [s, s],
            [-s, s],
            [-s, -s],
          ])
            r.push(new Vector3(n.x + o, terrainHeightAt(n.x + o, n.z + a) + m, n.z + a));
          this.marks.add(this.dashedLine(r, this.carveMat));
        }
      }
  }
  /** Ring the top of every pier and column — the snap targets a span can start
   * or end on. */
  markAnchors(t) {
    this.clearMarks();
    for (const [, e] of t.anchors) {
      const n = [];
      for (let s = 0; s <= 26; s++) {
        const r = (s / 26) * Math.PI * 2;
        n.push(
          new Vector3(
            e.top.x + Math.cos(r) * 2.6,
            e.top.y + 0.25,
            e.top.z + Math.sin(r) * 2.6,
          ),
        );
      }
      (this.marks.add(this.dashedLine(n)),
        this.marks.add(
          this.dashedLine([
            e.top.clone().add(new Vector3(0, 0.25, 0)),
            e.top.clone().add(new Vector3(0, 2.6, 0)),
          ]),
        ));
    }
  }
  /** The taut line drawn between a span's first click and the cursor. */
  string(t, e) {
    this.clearLive();
    const n = new BufferGeometry().setFromPoints([
      t.clone().add(new Vector3(0, 0.6, 0)),
      e.clone().add(new Vector3(0, 0.6, 0)),
    ]);
    this.live.add(new Line(n, this.stringMat));
  }
  /** The rectangle a vault would occupy, drawn on the ground before you commit. */
  footprint(t, e, n, s, r) {
    this.clearLive();
    const o = Math.hypot(n - t, s - e);
    if (o < 2) return;
    const a = (n - t) / o,
      l = (s - e) / o,
      h = -a,
      u = [
        [t + (l * r) / 2, e + (h * r) / 2],
        [n + (l * r) / 2, s + (h * r) / 2],
        [n - (l * r) / 2, s - (h * r) / 2],
        [t - (l * r) / 2, e - (h * r) / 2],
      ],
      d = [];
    for (let m = 0; m <= 4; m++) {
      const [_, g] = u[m % 4];
      d.push(new Vector3(_, terrainHeightAt(_, g) + 0.45, g));
    }
    this.live.add(this.dashedLine(d));
    const f = new BufferGeometry().setFromPoints([
      new Vector3(t, terrainHeightAt(t, e) + 0.5, e),
      new Vector3(n, terrainHeightAt(n, s) + 0.5, s),
    ]);
    this.live.add(new Line(f, this.stringMat));
  }
}
function Ol(i) {
  for (const t of [...i.children]) (i.remove(t), t.geometry?.dispose());
}

// --- generated exports ---
export { BuildOverlays, Ol };
