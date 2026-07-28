// Build overlays: dashed guides, carvable marks
//
// Extracted verbatim from public/assets/index-DCXbw2vV.js,
// lines 28952–29080.
// Identifiers are minifier-mangled; nothing here has been renamed.
// Regenerate with: python3 tools/split_bundle.py --write

class BuildOverlays {
  constructor(t) {
    K(this, "marks", new rn());
    K(this, "live", new rn());
    K(this, "dashMat");
    K(this, "stringMat");
    (t.add(this.marks, this.live),
      (this.dashMat = new gh({
        color: "#8f4a34",
        transparent: !0,
        opacity: 0.6,
        dashSize: 0.6,
        gapSize: 0.45,
      })),
      (this.stringMat = new Ya({
        color: "#6d3f2e",
        transparent: !0,
        opacity: 0.65,
      })));
  }
  dashedLine(t) {
    const e = new ve().setFromPoints(t),
      n = new yr(e, this.dashMat);
    return (n.computeLineDistances(), n);
  }
  clearMarks() {
    Ol(this.marks);
  }
  clearLive() {
    Ol(this.live);
  }
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
        for (const l of [-1, 1]) {
          const h = [];
          for (let u = 2; u <= s - 2; u += 5) {
            const d = n.ax + r * u + a * l * (n.th / 2 + 0.3),
              f = n.az + o * u + c * l * (n.th / 2 + 0.3);
            h.push(new P(d, qt(d, f) + 1.35, f));
          }
          h.length > 1 && this.marks.add(this.dashedLine(h));
        }
      } else if (
        e.action.t === "anchor" &&
        e.action.style === "giant" &&
        !e.action.carveAxis
      ) {
        const n = e.action,
          s = 5.2,
          r = [];
        for (const [o, a] of [
          [-s, -s],
          [s, -s],
          [s, s],
          [-s, s],
          [-s, -s],
        ])
          r.push(new P(n.x + o, qt(n.x + o, n.z + a) + 1.35, n.z + a));
        this.marks.add(this.dashedLine(r));
      }
  }
  markAnchors(t) {
    this.clearMarks();
    for (const [, e] of t.anchors) {
      const n = [];
      for (let s = 0; s <= 26; s++) {
        const r = (s / 26) * Math.PI * 2;
        n.push(
          new P(
            e.top.x + Math.cos(r) * 2.6,
            e.top.y + 0.25,
            e.top.z + Math.sin(r) * 2.6,
          ),
        );
      }
      (this.marks.add(this.dashedLine(n)),
        this.marks.add(
          this.dashedLine([
            e.top.clone().add(new P(0, 0.25, 0)),
            e.top.clone().add(new P(0, 2.6, 0)),
          ]),
        ));
    }
  }
  string(t, e) {
    this.clearLive();
    const n = new ve().setFromPoints([
      t.clone().add(new P(0, 0.6, 0)),
      e.clone().add(new P(0, 0.6, 0)),
    ]);
    this.live.add(new yr(n, this.stringMat));
  }
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
      d.push(new P(_, qt(_, g) + 0.45, g));
    }
    this.live.add(this.dashedLine(d));
    const f = new ve().setFromPoints([
      new P(t, qt(t, e) + 0.5, e),
      new P(n, qt(n, s) + 0.5, s),
    ]);
    this.live.add(new yr(f, this.stringMat));
  }
}
function Ol(i) {
  for (const t of [...i.children]) (i.remove(t), t.geometry?.dispose());
}
