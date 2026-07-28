// Boot sequence, input wiring, quality meters, window.CAP
//
// Extracted verbatim from public/assets/index-DCXbw2vV.js,
// lines 30393–30967.
// Identifiers are minifier-mangled; nothing here has been renamed.
// Regenerate with: python3 tools/split_bundle.py --write

function rv(i) {
  const t = [
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let e = "";
  for (const [n, s] of t) for (; i >= n; ) ((e += s), (i -= n));
  return e || "I";
}
const Qe = document.getElementById("app"),
  Is = window.matchMedia?.("(pointer: coarse)").matches ?? !1,
  ke = new J0(Qe, { supersample: Is ? 1.05 : 1.4 }),
  us = ke.renderer,
  je = new ih();
je.fog = new Xa(ke.paper.getHex(), ke.fogDensity);
const ie = new un(46, 2, 0.4, 1200);
ie.position.set(46, 33, 88);
const Te = new O0(ie, us.domElement);
Te.target.set(-24, 7, -8);
Te.enableDamping = !0;
Te.dampingFactor = 0.09;
Te.maxPolarAngle = Math.PI * 0.49;
Te.minDistance = 5;
Te.maxDistance = 520;
Te.update();
const Pe = new Zd("#fff4e0", 3.5);
Pe.castShadow = !0;
Pe.shadow.mapSize.set(Is ? 2048 : 4096, Is ? 2048 : 4096);
Pe.shadow.camera.left = -240;
Pe.shadow.camera.right = 240;
Pe.shadow.camera.top = 240;
Pe.shadow.camera.bottom = -240;
Pe.shadow.camera.near = 10;
Pe.shadow.camera.far = 900;
Pe.shadow.bias = -3e-4;
Pe.shadow.normalBias = 0.35;
je.add(Pe);
je.add(Pe.target);
const Nr = new qd("#dfe3dd", "#8d8064", 0.6);
je.add(Nr);
const ic = n_();
for (const i of Object.values(ic)) i.clipShadows = !0;
const Kt = new T_(je, ic);
Kt.buildTerrain();
Kt.seedNav();
for (const i of Ah()) Kt.applyAction(i);
Kt.seedGroundPockets(-18, 30, 14, 12, 34);
Kt.seedGroundPockets(-24, -80, 12, 10, 30, 77);
C_(Kt);
const ov = P_(Kt),
  Ne = new I_(Kt),
  ei = new F_(Kt, Ne, je),
  oi = new $_(),
  Lh = new ev();
window.addEventListener("pointerdown", () => Lh.start(), { once: !0 });
const te = { hour: 9.1, day: 1, speed: 15 / 570, paused: !1 };
function os(i) {
  const t = Xe((i - 5.5) / 15, 0, 1),
    e = zn(2.05, -2.05, t),
    n = 0.09 + Math.sin(Math.PI * t) * 0.43,
    s = new P(
      Math.sin(e) * Math.cos(n),
      Math.sin(n),
      Math.cos(e) * Math.cos(n),
    );
  (Pe.position.copy(s.multiplyScalar(420)), Pe.target.position.set(0, 0, 0));
  const r = 1 - Math.sin(Math.PI * t),
    o = Nn(0.45, 0.95, r);
  (Pe.color.setStyle(o > 0.4 ? "#ffdba6" : "#fff4e0"),
    (Pe.intensity = zn(3.5, 2.55, o)),
    (Nr.intensity = zn(0.6, 0.42, o)),
    ke.setDusk(o),
    ke.setSunDir(Pe.position.clone().normalize()),
    wh(Pe, Nr));
  const a = Kt.glowMat,
    c = 0.3 + o * 1.25;
  a.color.setRGB(1.05 * c + 0.1, 0.74 * c + 0.08, 0.36 * c + 0.04);
}
os(te.hour);
let fn = "build",
  Fr = !1;
const Or = { pos: new P(), target: new P() },
  Mn = new Z_(Kt, ie, je),
  Qn = new J_(Kt, us),
  ni = new Q_(Kt, ie, us.domElement),
  Us = { aspect: "3:2", fov: 42 },
  fe = new sv({
    onTool: (i, t) => {
      (Mn.setTool(i, t),
        Is && (Te.enableRotate = i === null),
        i && fe.toast(av(i), 3400));
    },
    onMode: (i) => cv(i),
    onUndo: () => rc(),
    onSection: (i) => {
      (i.axis !== void 0 && Qn.setAxis(i.axis),
        i.offset !== void 0 && Qn.setOffset(i.offset),
        i.flip !== void 0 && Qn.setFlip(i.flip));
    },
    onPlate: (i) => {
      (i.aspect && ((Us.aspect = i.aspect), sc()),
        i.fov &&
          ((Us.fov = i.fov), (ie.fov = i.fov), ie.updateProjectionMatrix()),
        i.hour && ((te.hour = i.hour), os(i.hour)));
    },
    onEngrave: () => Uh(),
    onBegin: () => {
      te.paused = !1;
    },
    onFolio: () => {
      ((yt.folio = !yt.folio),
        (yt.dirty = !0),
        fe.toast(
          yt.folio
            ? "Resources are off — build freely."
            : "Resources restored — stone must be won again.",
        ));
    },
    onAnew: () => {
      ((oc = !0),
        localStorage.removeItem("capriccio-save-v1"),
        location.reload());
    },
  });
function av(i) {
  switch (i) {
    case "anchor":
      return "Click anywhere to found a pier. Build spans and stairs from it.";
    case "span":
      return "Click a start point (pier tops snap), then an end point.";
    case "rise":
      return "Click the low place, then the high place.";
    case "vault":
      return "Click one end of the hall, then the other.";
    case "carve":
      return "Click a wall to cut an arched passage through it.";
    case "emb":
      return "Click to place. Small things make districts feel owned.";
    case "designate":
      return "Paint an invitation. The citizens decide the rest.";
  }
}
function cv(i) {
  if (
    (fn === "wander" && i !== "wander" && ni.active && ni.exit(),
    (fn = i),
    Mn.setTool(null),
    i === "section")
  ) {
    const t = Te.target.clone().sub(ie.position),
      e = Math.abs(t.x) >= Math.abs(t.z) ? "x" : "z",
      n = (e === "x" ? t.x : t.z) < 0 ? 1 : -1,
      s = Math.round(e === "x" ? Te.target.x : Te.target.z);
    (Qn.setAxis(e),
      Qn.setFlip(n),
      Qn.setOffset(s),
      fe.syncSection(e, s),
      fe.toast(
        "The section cuts where you look. Slide to move the blade.",
        4200,
      ));
  }
  (Qn.set(i === "section"),
    (Te.enabled = i !== "wander"),
    fe.setWanderHint(!1),
    (Fr = !1),
    i === "plate"
      ? ((ie.fov = Us.fov), ie.updateProjectionMatrix(), sc())
      : ((ie.fov = 46), ie.updateProjectionMatrix()),
    i === "wander" && (fe.toast("Click a place to stand.", 5e3), (Fr = !0)));
}
if (Is) {
  const i = fe.modeBtns.get("wander");
  i && (i.style.display = "none");
}
ni.onExit = () => {
  (ie.position.copy(Or.pos),
    Te.target.copy(Or.target),
    (ie.fov = 46),
    ie.updateProjectionMatrix(),
    (Te.enabled = !0),
    fe.setWanderHint(!1),
    fe.pickMode("build"));
};
function sc() {
  fe.updateFrame(Ph[Us.aspect], Qe.clientWidth, Qe.clientHeight);
}
const On = { x: 0, y: 0, t: 0, down: !1 };
us.domElement.addEventListener("pointerdown", (i) => {
  ((On.x = i.clientX),
    (On.y = i.clientY),
    (On.t = performance.now()),
    (On.down = !0));
});
us.domElement.addEventListener("pointerup", (i) => {
  if (!On.down) return;
  On.down = !1;
  const t = Math.hypot(i.clientX - On.x, i.clientY - On.y),
    e = performance.now() - On.t;
  if (t > 7 || e > 450) return;
  const n = new at(
    (i.clientX / Qe.clientWidth) * 2 - 1,
    -(i.clientY / Qe.clientHeight) * 2 + 1,
  );
  if (Fr) {
    const s = Mn.pick(n);
    if (s) {
      (Or.pos.copy(ie.position),
        Or.target.copy(Te.target),
        (Te.enabled = !1),
        (Fr = !1),
        fe.setWanderHint(!0));
      const r = new P(-18, s.p.y, 28).sub(s.p);
      ni.enter(s.p, Math.atan2(r.x, r.z));
    }
    return;
  }
  (fn === "build" || fn === "section") && Mn.click(n);
});
us.domElement.addEventListener("pointermove", (i) => {
  if (fn !== "build" && fn !== "section") return;
  const t = new at(
    (i.clientX / Qe.clientWidth) * 2 - 1,
    -(i.clientY / Qe.clientHeight) * 2 + 1,
  );
  Mn.hover(t);
});
window.addEventListener("keydown", (i) => {
  if (i.code === "Escape") {
    if (fn === "wander") return;
    (Mn.setTool(null), fe.pickTool(null));
  }
  ((i.ctrlKey || i.metaKey) && i.code === "KeyZ" && rc(),
    i.code === "KeyP" &&
      !i.ctrlKey &&
      !i.metaKey &&
      fn !== "wander" &&
      Uh(fn !== "plate"));
});
Mn.onMessage = (i) => fe.toast(i);
Mn.onCommit = (i) => {
  yt.dirty = !0;
  const t = {
    anchor: "The pier is founded.",
    span: "The span leaps.",
    rise: "The stair climbs.",
    vault: "The vault closes overhead.",
    carve: "The wall is pierced.",
    emb: "It is placed.",
    designate: "The invitation is painted.",
  };
  fe.toast(t[i.t] ?? "Built.");
};
function rc() {
  const i = yt.playerActions.pop();
  if (!i) {
    fe.toast("Nothing to undo.");
    return;
  }
  const t = Mn.costOf(i);
  ((yt.res.stone += t.stone), (yt.res.timber += t.timber));
  const e = Ne.serialize();
  (Ne.clear(),
    Kt.rebuildAll([...Ah(), ...yt.playerActions]),
    Kt.seedGroundPockets(-18, 30, 14, 12, 34),
    Kt.seedGroundPockets(-24, -80, 12, 10, 30, 77),
    Ih(e),
    ei.sync(),
    fe.toast("Unbuilt. The stone returns to the yard."));
}
function Ih(i) {
  Ne.restore(i, (t) => {
    const e = Number(t.split(":")[0]),
      n = t.split(":")[1],
      s = Kt.pockets.filter((o) => o.structId === e && o.occupiedBy < 0);
    return s.length
      ? (s.find(
          (o) =>
            (n === "stall" &&
              (o.kind === "under_arch" || o.kind === "interior")) ||
            (n === "garden" && o.light > 0.6) ||
            n === "house",
        ) ?? s[0])
      : null;
  });
}
async function Uh(i = !1) {
  const t = i
      ? (Qe.clientWidth || 3) / Math.max(Qe.clientHeight, 2)
      : Ph[Us.aspect],
    e = 2e3,
    n = Math.round(e / t);
  (fe.toast("The burin bites the copper…", 2500),
    await new Promise((l) => setTimeout(l, 30)));
  const s = ke.snap(je, ie, e, n),
    r = yt.plates.length + 1,
    a = `${bi.length ? bi[0].name : yt.cityName} · day ${te.day}`,
    c = await Dh(s, a, r);
  (yt.plates.push({
    cam: [...ie.position.toArray(), ...Te.target.toArray()],
    hour: te.hour,
    caption: a,
    n: r,
  }),
    fe.showPlate(c, `capriccio-plate-${String(r).padStart(2, "0")}.png`),
    (yt.res.favor += 6),
    (yt.dirty = !0));
}
let bi = [];
function lv() {
  const i = Kt.pockets.filter((a) => a.occupiedBy >= 0),
    t = i.length ? i.filter((a) => a.navNode >= 0).length / i.length : 0.3,
    e = i.length ? i.reduce((a, c) => a + c.shelter, 0) / i.length : 0.3,
    n = i.length ? i.reduce((a, c) => a + c.light, 0) / i.length : 0.5,
    s = Kt.actions.filter((a) => a.t === "emb" && a.kind === "lantern").length,
    r = Xe(bi.length * 0.18 + s * 0.05 + Ne.items.length * 0.015, 0, 1);
  let o = 0;
  for (const [, a] of Kt.structures) {
    const c = a.action;
    (c.t === "span" && (o += 0.14),
      c.t === "vault" && (o += 0.12),
      c.t === "rise" && (o += 0.08),
      c.t === "anchor" && c.style === "giant" && (o += 0.08));
  }
  fe.updateQuals({
    ACCESS: t,
    SHELTER: e,
    LIGHT: n,
    BELONGING: r,
    GRANDEUR: Xe(o, 0, 1),
  });
}
let oc = !1;
function ac() {
  oc || q_({ day: te.day, hour: te.hour, infill: Ne.serialize() });
}
new URLSearchParams(location.search).has("fresh") &&
  localStorage.removeItem("capriccio-save-v1");
const hn = Y_();
if (hn) {
  ((yt.playerActions = hn.actions), (yt.nextId = 1e3 + hn.actions.length + 5));
  for (const t of hn.actions)
    ((t.id = t.id ?? yt.nextId++),
      Kt.applyAction(structuredClone(t)),
      (yt.nextId = Math.max(yt.nextId, (t.id ?? 0) + 1)));
  ((yt.res = hn.res),
    (yt.plates = hn.plates ?? []),
    (yt.doneRequests = new Set(hn.doneRequests ?? [])),
    (yt.folio = hn.folio ?? !1),
    (te.day = hn.day),
    (te.hour = hn.hour),
    Ih(hn.infill ?? []),
    oi.resync(),
    os(te.hour));
  const i = document.querySelector("#veil .begin");
  i && (i.textContent = "CONTINUE");
} else {
  const i = [
    ["house", 6],
    ["stall", 2],
    ["garden", 1],
  ];
  for (const [t, e] of i)
    for (let n = 0; n < e; n++) {
      const s = Kt.pockets.filter(
        (r) =>
          r.occupiedBy < 0 &&
          r.kind === "terrace_p" &&
          Math.hypot(r.pos[0] + 18, r.pos[2] - 30) < 46,
      )[0];
      s && Ne.spawn(s, t, !0);
    }
}
ei.sync();
{
  const i = document.querySelector("#veil"),
    t = document.createElement("div");
  ((t.textContent = yt.folio
    ? "(playing without resources)"
    : "or play without resources"),
    (t.style.cssText =
      "margin-top:14px;font-size:11px;letter-spacing:0.12em;opacity:0.6;cursor:pointer;font-style:italic"),
    (t.onclick = () => {
      ((yt.folio = !0),
        (yt.dirty = !0),
        (t.textContent = "(playing without resources)"),
        document.querySelector("#veil .begin")?.click());
    }),
    i.appendChild(t));
  const e = document.createElement("div");
  ((e.textContent = hn ? "or begin anew (erases the saved city)" : ""),
    (e.style.cssText =
      "margin-top:9px;font-size:11px;letter-spacing:0.12em;opacity:0.55;cursor:pointer;font-style:italic"),
    (e.onclick = () => {
      ((oc = !0),
        localStorage.removeItem("capriccio-save-v1"),
        location.reload());
    }),
    i.appendChild(e));
}
oi.onDone = (i) => {
  (fe.toast(i.thanks + `  (+${i.favor} favor)`, 7e3), fe.setRequest(null));
};
oi.onNew = (i) => fe.setRequest(i.text);
oi.active && fe.setRequest(oi.active.text);
Kt.onStructureBuilt = () => {};
let Ns = performance.now(),
  Do = 0,
  Lo = 0;
te.paused = !0;
function Nh(i) {
  const t = Math.min(i, 120) / 1e3;
  if (((Aa.value += t), ov(Aa.value), !te.paused)) {
    ((te.hour += t * te.speed),
      te.hour > 20.5 && ((te.hour = 5.6), te.day++, (yt.dirty = !0)),
      os(te.hour),
      V_(t * te.speed),
      ei.update(t, te.hour),
      ni.active && ni.update(t),
      (Lo += t),
      Lo > 2.2 &&
        ((Lo = 0),
        Ne.grow(
          te.hour,
          10 +
            yt.res.favor * 0.28 +
            Kt.pockets.filter((n) => n.kind !== "terrace_p").length * 0.12,
        ),
        oi.check(Kt, Ne),
        ei.sync()),
      (Do += t),
      Do > 8 && ((Do = 0), (bi = Rh(Kt, Ne)), lv(), yt.dirty && ac()));
    const e = ie.position;
    Lh.update(t, {
      dusk: ke.postMat.uniforms.uDusk.value,
      waterDist: Kt.waterDistAt(e),
      constructing: Ne.items.some((n) => n.stage < 1),
      hour: te.hour,
    });
  }
  (ni.active || Te.update(),
    fe.updateResources(ei.population),
    fe.updateClock(te.day, te.hour),
    fe.updateLabels(bi, ie, (fn === "build" || fn === "section") && !Mn.tool));
}
function cc() {
  const i = performance.now();
  (Nh(i - Ns),
    (Ns = i),
    ke.render(je, ie),
    document.hidden || requestAnimationFrame(cc));
}
function lc() {
  if (document.hidden) {
    const i = performance.now();
    (Nh(i - Ns), (Ns = i), ke.render(je, ie), setTimeout(lc, 500));
  }
}
document.addEventListener("visibilitychange", () => {
  ((Ns = performance.now()),
    document.hidden ? (ac(), lc()) : requestAnimationFrame(cc));
});
function Fh() {
  const i = Qe.clientWidth || window.innerWidth,
    t = Qe.clientHeight || window.innerHeight;
  ((ie.aspect = i / t),
    ie.updateProjectionMatrix(),
    ke.resize(i, t),
    fn === "plate" && sc());
}
window.addEventListener("resize", Fh);
new ResizeObserver(Fh).observe(Qe);
ie.aspect =
  (Qe.clientWidth || window.innerWidth) /
  (Qe.clientHeight || window.innerHeight);
ie.updateProjectionMatrix();
requestAnimationFrame(cc);
document.hidden && lc();
window.CAP = {
  scene: je,
  camera: ie,
  controls: Te,
  engraving: ke,
  mats: ic,
  shared: Ge,
  world: Kt,
  time: te,
  SPOTS: Vr,
  hemi: Nr,
  sunLight: Pe,
  syncLightModel: wh,
  tools: Mn,
  hud: fe,
  infill: Ne,
  citizens: ei,
  requests: oi,
  state: yt,
  wander: ni,
  section: Qn,
  undo: rc,
  doSave: ac,
  async plateTest() {
    const i = ke.snap(je, ie, 800, 533);
    return (await Dh(i, "test plate · day 1", 1)).length;
  },
  snap(i = 1100, t = 660) {
    return ke.snap(je, ie, i, t);
  },
  async post(i, t = 1100, e = 660) {
    const n = ke.snap(je, ie, t, e);
    return (
      await fetch(`http://localhost:8992/shot?name=${i}`, {
        method: "POST",
        body: n,
      })
    ).text();
  },
  cam(i, t, e, n = 0, s = 4, r = 0) {
    (ie.position.set(i, t, e), Te.target.set(n, s, r), Te.update());
  },
  hour(i) {
    ((te.hour = i), os(i));
  },
  begin() {
    ((te.paused = !1),
      (document.querySelector("#veil").style.display = "none"));
  },
  act(i) {
    return (
      (i.id = i.id ?? yt.nextId++),
      yt.playerActions.push(structuredClone(i)),
      Kt.applyAction(i)
    );
  },
  grow(i = 20) {
    for (let t = 0; t < i; t++) {
      Ne.grow(12, 999);
      for (let e = 0; e < 9; e++) Ne.grow(12, 0);
    }
    return (ei.sync(), (bi = Rh(Kt, Ne)), Ne.items.length);
  },
  skip(i) {
    for (te.hour += i; te.hour > 20.5; ) ((te.hour -= 14.9), te.day++);
    os(te.hour);
  },
  pathTest(i, t, e, n) {
    const s = Kt.nav.nearest(new P(i, 0, t), 40),
      r = Kt.nav.nearest(new P(e, 0, n), 40);
    return s < 0 || r < 0
      ? { a: s, b: r, len: -1 }
      : { a: s, b: r, len: Kt.nav.path(s, r).length };
  },
  status() {
    return {
      structures: Kt.structures.size,
      pockets: Kt.pockets.length,
      occupied: Kt.pockets.filter((i) => i.occupiedBy >= 0).length,
      infill: Ne.items.length,
      navNodes: Kt.nav.nodes.length,
      pop: ei.population,
      res: { ...yt.res },
      request: oi.active?.id ?? null,
      districts: bi.map((i) => i.name),
      draws: ke.lastDraws,
      tris: ke.lastTris,
    };
  },
};
