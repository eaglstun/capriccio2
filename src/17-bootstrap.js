// Boot sequence, input wiring, quality meters, window.CAP
//
// Extracted from public/assets/index-DCXbw2vV.js, bundle lines
// 30393–30951. Statements are verbatim; identifiers are
// renamed via src/renames.json. Imports and exports are generated.
// Regenerate: python3 tools/split_bundle.py --write

// --- generated imports ---
import { Color, DirectionalLight, FogExp2, HemisphereLight, PerspectiveCamera, Scene, Vector2, Vector3 } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { J0, engravingUniforms, setDistricts, syncLightUniforms } from "./00-shaders.js";
import { Aa, Nn, Vr, clamp, hashString, lerp, n_, terrainHeightAt } from "./01-materials.js";
import { Ah, C_, P_, World } from "./05-world.js";
import { InfillSystem } from "./06-infill.js";
import { Citizens, Rh, V_, gameState } from "./07-citizens.js";
import { loadGame, saveGame } from "./08-save.js";
import { PlacementTool } from "./11-tools.js";
import { Requests } from "./12-requests.js";
import { Ph, SectionMode, WanderMode } from "./13-modes.js";
import { renderPlateImage } from "./14-plates.js";
import { Soundscape } from "./15-audio.js";
import { Hud } from "./16-hud.js";
import { score } from "./18-music.js";
// --- end generated imports ---

const Qe = document.getElementById("app"),
  Is = window.matchMedia?.("(pointer: coarse)").matches ?? !1,
  ke = new J0(Qe, { supersample: Is ? 1.05 : 1.4 }),
  us = ke.renderer,
  je = new Scene();
je.fog = new FogExp2(ke.paper.getHex(), ke.fogDensity);
const ie = new PerspectiveCamera(46, 2, 0.4, 1200);
ie.position.set(46, 33, 88);
const Te = new OrbitControls(ie, us.domElement);
Te.target.set(-24, 7, -8);
Te.enableDamping = !0;
Te.dampingFactor = 0.09;
Te.maxPolarAngle = Math.PI * 0.49;
Te.minDistance = 5;
Te.maxDistance = 520;
Te.update();
const Pe = new DirectionalLight("#ffe9f2", 3.5);
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
const Nr = new HemisphereLight("#d8cdf0", "#8d6f9e", 0.6);
je.add(Nr);
const ic = n_();
for (const i of Object.values(ic)) i.clipShadows = !0;
const Kt = new World(je, ic);
Kt.buildTerrain();
Kt.seedNav();
for (const i of Ah()) Kt.applyAction(i);
Kt.seedGroundPockets(-18, 30, 14, 12, 34);
Kt.seedGroundPockets(-24, -80, 12, 10, 30, 77);
C_(Kt);
const ov = P_(Kt),
  Ne = new InfillSystem(Kt),
  ei = new Citizens(Kt, Ne, je),
  oi = new Requests(),
  Lh = new Soundscape();
window.addEventListener(
  "pointerdown",
  () => {
    (Lh.start(), score.start());
  },
  { once: !0 },
);
const te = { hour: 9.1, day: 1, speed: 15 / 570, paused: !1 };
const dc_dusk = new Color("#ff8c46"),      // violent orange
  dc_dawn = new Color("#dbe2f2"),          // chalk-pale morning sun
  dc_hemi = new Color("#d8cdf0"),
  dc_hemiDawn = new Color("#c3cfe6"),
  dc_paperDay = new Color("#f0ddeb"),      // bleached high day
  dc_paperDusk = new Color("#eb9f76"),     // the hot sheet
  dc_paperDawn = new Color("#bfc8d8"),     // cool blue-grey
  dc_paperNight = new Color("#221a30"),    // the sheet gone cold and dark
  dc_hemiNight = new Color("#4a4666");
// The clock runs 5.6 → 29.6 (= 5.6 next morning); hours past 20.5 are the
// night, which the frame loop drives at NIGHT_RATE so dark is an event, not
// a wait. os() takes the raw hour, so it must accept the whole 5.6–29.6 range.
const NIGHT_START = 20.5,
  DAY_END = 29.6,
  NIGHT_HOURS = DAY_END - NIGHT_START, // 9.1
  NIGHT_RATE = 2.5;
/**
 * Set every light and sky uniform for hour `i`. The whole time-of-day system.
 *
 * `t` normalises the daylight span to 0..1 and drives the sun's arc. The low-sun
 * factor then SPLITS IN TWO: the same low angle reads as cool blue-grey before
 * noon and violent orange after, so one calculation gives two different hours.
 *
 * Past 20.5 a separate night branch takes over — sun below the horizon,
 * ambient collapsed, paper and fog going cold, and the glow material lifted so
 * lanterns, signs and fires become the only real light. The day loop was
 * unfrozen specifically for this; see FEATURES.md B1.
 */
function os(i) {
  const t = clamp((i - 5.5) / 15, 0, 1),
    // night phase: 0 at 20.5, 1 at 29.6 (which is 5.6 tomorrow)
    u = clamp((i - NIGHT_START) / NIGHT_HOURS, 0, 1),
    // full dark plateaus through the middle of the night and releases
    // into dawn before the wrap, so both boundaries are seamless
    nightAmt = Nn(0, 0.14, u) * (1 - Nn(0.8, 0.97, u)),
    // by night the sun keeps rotating the long way round, landing exactly
    // on the dawn azimuth (2.05 - 2π ≡ 2.05) as the clock wraps
    e = u > 0 ? -2.05 - u * (2 * Math.PI - 4.1) : lerp(2.05, -2.05, t),
    n =
      0.09 +
      Math.sin(Math.PI * t) * 0.43 -
      // below the horizon in the middle of the night, back up for dawn
      Math.sin(Math.PI * u) * 0.55,
    s = new Vector3(
      Math.sin(e) * Math.cos(n),
      Math.sin(n),
      Math.cos(e) * Math.cos(n),
    );
  (Pe.position.copy(s.multiplyScalar(420)), Pe.target.position.set(0, 0, 0));
  // the low-sun factor splits in two: the same sun angle is a cool
  // blue-grey morning before noon and a violent orange dusk after it.
  // Between them the day bleaches. Free variety, twice a day.
  const r = 1 - Math.sin(Math.PI * t),
    o = Nn(0.45, 0.95, r),
    // through the night dusk hands over to dawn late — the last quarter —
    // which keeps the birds (gated on dusk < 0.55) silent until the
    // pre-dawn chorus, and lands duskAmt/dawnAmt exactly on their 5.6
    // values as the clock wraps
    hv = u > 0 ? 1 - Nn(0.72, 0.98, u) : Nn(0.42, 0.58, t),
    duskAmt = o * hv,
    dawnAmt = o * (1 - hv);
  (Pe.color.set("#fff3ec"),
    Pe.color.lerp(dc_dusk, Nn(0.2, 0.8, duskAmt)),
    Pe.color.lerp(dc_dawn, Nn(0.2, 0.8, dawnAmt)),
    (Pe.intensity = lerp(3.5, 2.55, o) * (1 - nightAmt)),
    // ambient down hard: enough to read silhouettes, no more
    (Nr.intensity = lerp(lerp(0.6, 0.42, o), 0.08, nightAmt)),
    Nr.color.copy(dc_hemi).lerp(dc_hemiDawn, dawnAmt).lerp(dc_hemiNight, nightAmt),
    ke.setDusk(duskAmt),
    ke.setDawn(dawnAmt),
    ke.setNight(nightAmt),
    ke.setSunDir(Pe.position.clone().normalize()),
    syncLightUniforms(Pe, Nr));
  // paper follows the hour — blue-grey morning, bleached high day, hot
  // dusk, cold dark night — and the fog agrees with the sheet
  const pc = dc_paperDay
    .clone()
    .lerp(dc_paperDusk, duskAmt)
    .lerp(dc_paperDawn, dawnAmt)
    .lerp(dc_paperNight, nightAmt);
  (ke.setPaper(pc), je.fog.color.copy(pc));
  // artificial light takes over as the sun drops — harder at dusk, and at
  // night it is the only real light there is
  const a = Kt.glowMat,
    c = 0.3 + duskAmt * 1.5 + dawnAmt * 0.9 + nightAmt * 1.5;
  a.color.setRGB(1.05 * c + 0.12, 0.42 * c + 0.06, 0.85 * c + 0.12);
}
os(te.hour);
let fn = "build",
  Fr = !1;
// One shared camera ease — the request panel and the folio slots both fly
// the camera rather than cutting it. Smoothstepped, ~2s, and any real drag
// or wheel cancels it instantly: the player always outranks the machine.
let Sf = null;
/**
 * Ease the camera to position `i` looking at `t` over `e` seconds.
 *
 * Cancelled instantly by any pointerdown or wheel on the canvas — the player's
 * input always wins, and a camera that fights the mouse is worse than no
 * camera move at all. Shared by the request-click, the folio revisit and the
 * tutorial.
 */
function flyCam(i, t, e = 1.9) {
  Sf = {
    k: 0,
    dur: e * 1000,
    p0: ie.position.clone(),
    p1: i.clone(),
    g0: Te.target.clone(),
    g1: t.clone(),
  };
}
// --- the current speaker -------------------------------------------------
// Whoever is voicing the active request. DERIVED from the request id, never
// stored — the save format is frozen, and hashing the id means a reload
// produces the same Marcus, and any future request gets a speaker for free.
// Modulo 14 because population is never below the base 14, so the speaker
// is always an active, walking citizen. The "voice:" salt is not decoration:
// it is the one prefix under which all five request ids land on five
// DIFFERENT citizens — Marcus and Tullia must not share a body.
let Uv = "";
/**
 * Decide which citizen is currently speaking, from the active request.
 *
 * `hashString("voice:" + request.id) % 14` — DERIVED, never stored, because the
 * save format is frozen and a reload must produce the same Marcus. Modulo 14
 * because population never drops below the base 14, so the speaker is always an
 * active, walking citizen.
 *
 * The "voice:" salt is load-bearing: unsalted, reach-terrace and water-terrace
 * both hashed to the same agent, so Marcus and Tullia were one person.
 *
 * With no active request this clears the speaker — which is how "when the
 * citizens stop asking, nobody is marked" falls out rather than being coded.
 */
function syncSpeaker() {
  const i = oi.active;
  if (!i) {
    (ei.setSpeaker(-1), (Uv = ""));
    return;
  }
  (ei.setSpeaker(hashString("voice:" + i.id) % 14),
    (Uv = (i.text.match(/—\s*(.*)$/s)?.[1] ?? "").trim()));
}
const Or = { pos: new Vector3(), target: new Vector3() },
  Mn = new PlacementTool(Kt, ie, je),
  Qn = new SectionMode(Kt, us),
  ni = new WanderMode(Kt, ie, us.domElement),
  Us = { aspect: "3:2", fov: 42 },
  fe = new Hud({
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
      // interstitial: the sky shader's own notes to itself, shown once,
      // skippable by click or any key, never blocking the running world
      const i = document.createElement("div");
      ((i.id = "epigraph"),
        (i.innerHTML =
          "<div>faint horizontal burin lines, denser toward horizon, broken by cloudy noise</div>" +
          "<div>dusk warms and darkens the paper sky a touch near the sun's side</div>"),
        document.body.appendChild(i));
      let t = !1;
      const e = () => {
        t ||
          ((t = !0),
          (i.style.opacity = "0"),
          (i.style.pointerEvents = "none"),
          window.removeEventListener("keydown", e, !0),
          setTimeout(() => i.remove(), 1200));
      };
      (i.addEventListener("pointerdown", e),
        window.addEventListener("keydown", e, !0),
        setTimeout(e, 3e3));
    },
    onFolio: () => {
      ((gameState.folio = !gameState.folio),
        (gameState.dirty = !0),
        fe.toast(
          gameState.folio
            ? "Resources are off — build freely."
            : "Resources restored — stone must be won again.",
        ));
    },
    onAnew: () => {
      ((oc = !0),
        localStorage.removeItem("capriccio-save-v1"),
        location.reload());
    },
    // click the request and the camera goes to the citizen who spoke —
    // keeping the player's azimuth, so the view turns to face them rather
    // than swinging around the city
    onRequestClick: () => {
      const i = ei.speakerAgent();
      if (!i) return;
      const t = i.pos.clone();
      t.y += 1.3;
      const e = Math.atan2(ie.position.x - t.x, ie.position.z - t.z);
      flyCam(
        new Vector3(t.x + Math.sin(e) * 24, t.y + 11, t.z + Math.cos(e) * 24),
        t,
      );
    },
    // a folio slot returns the camera to exactly the plate's stored pose
    onPlateSlot: (i) => {
      i?.cam?.length === 6 &&
        flyCam(
          new Vector3(i.cam[0], i.cam[1], i.cam[2]),
          new Vector3(i.cam[3], i.cam[4], i.cam[5]),
          2.2,
        );
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
  ((Sf = null), // the player's hand cancels any camera flight
    (On.x = i.clientX),
    (On.y = i.clientY),
    (On.t = performance.now()),
    (On.down = !0));
});
us.domElement.addEventListener(
  "wheel",
  () => {
    Sf = null;
  },
  { passive: !0 },
);
us.domElement.addEventListener("pointerup", (i) => {
  if (!On.down) return;
  On.down = !1;
  const t = Math.hypot(i.clientX - On.x, i.clientY - On.y),
    e = performance.now() - On.t;
  if (t > 7 || e > 450) return;
  const n = new Vector2(
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
      const r = new Vector3(-18, s.p.y, 28).sub(s.p);
      ni.enter(s.p, Math.atan2(r.x, r.z));
    }
    return;
  }
  (fn === "build" || fn === "section") && Mn.click(n);
});
us.domElement.addEventListener("pointermove", (i) => {
  if (fn !== "build" && fn !== "section") return;
  const t = new Vector2(
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
// the placement tool stamps day/hour onto each committed action (the
// Chronicle enabler) — hand it the live clock
Mn.clock = te;
Mn.onMessage = (i) => fe.toast(i);
Mn.onCommit = (i) => {
  gameState.dirty = !0;
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
/**
 * UNDO. Pops the last player action and rebuilds the world from what remains.
 *
 * Rebuilding rather than reversing is the only tractable approach: a structure
 * emits pockets, nav nodes and water sources, and unpicking those in place
 * would be far more fragile than replaying a shorter log.
 */
function rc() {
  const i = gameState.playerActions.pop();
  if (!i) {
    fe.toast("Nothing to undo.");
    return;
  }
  const t = Mn.costOf(i);
  ((gameState.res.stone += t.stone), (gameState.res.timber += t.timber));
  const e = Ne.serialize();
  (Ne.clear(),
    Kt.rebuildAll([...Ah(), ...gameState.playerActions]),
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
  (fe.toast("The laser bites the substrate…", 2500),
    await new Promise((l) => setTimeout(l, 30)));
  const s = ke.snap(je, ie, e, n),
    r = gameState.plates.length + 1,
    a = `${bi.length ? bi[0].name : gameState.cityName} · day ${te.day}`,
    c = await renderPlateImage(s, a, r);
  gameState.plates.push({
    cam: [...ie.position.toArray(), ...Te.target.toArray()],
    hour: te.hour,
    caption: a,
    n: r,
  });
  // the save keeps plates.slice(-16); past sixteen, each new plate pushes
  // the oldest out of the record. Show which one.
  const l =
    gameState.plates.length > 16
      ? gameState.plates[gameState.plates.length - 17]
      : null;
  (fe.showPlate(c, `capriccio-plate-${String(r).padStart(2, "0")}.png`, l),
    fe.updateFolio(gameState.plates.slice(-16)),
    (gameState.res.favor += 6),
    (gameState.dirty = !0));
}
let bi = [];
/**
 * Compute the five HUD meters. Runs every ~8s, not every frame.
 *
 * ACCESS, SHELTER and LIGHT read ONLY OCCUPIED pockets — quality nobody lives
 * in counts for nothing, which is the game's central scoring idea. BELONGING
 * counts districts, lanterns and infill. GRANDEUR is two independently capped
 * halves, structure and ornament, so neither maxes it alone.
 *
 * See docs/SIMULATION.md for the derivations and FEATURES.md B2 for why
 * GRANDEUR was rebalanced.
 */
function updateQualityMeters() {
  const i = Kt.pockets.filter((a) => a.occupiedBy >= 0),
    t = i.length ? i.filter((a) => a.navNode >= 0).length / i.length : 0.3,
    e = i.length ? i.reduce((a, c) => a + c.shelter, 0) / i.length : 0.3,
    n = i.length ? i.reduce((a, c) => a + c.light, 0) / i.length : 0.5,
    s = Kt.actions.filter((a) => a.t === "emb" && a.kind === "lantern").length,
    r = clamp(bi.length * 0.18 + s * 0.05 + Ne.items.length * 0.015, 0, 1);
  // GRANDEUR is two independently capped halves — structure (0.60) and
  // ornament (0.40) — so neither maxes the meter alone: grandeur requires a
  // city that is both built and adorned. Cypress scores 0 (12 of the 18
  // seeded ornaments are trees; any value lets starting scenery dominate —
  // and a tree is the one thing here nobody built). Passage scores 0: a
  // door is circulation, not monument; the 8m Gate is the ceremonial one.
  // Lanterns score almost nothing because they already feed BELONGING.
  let o = 0;
  for (const [, a] of Kt.structures) {
    const c = a.action;
    (c.t === "span" && (o += 0.042),
      c.t === "vault" && (o += 0.036),
      c.t === "rise" && (o += 0.025),
      c.t === "anchor" && c.style === "giant" && (o += 0.032));
  }
  let orn = 0;
  for (const a of Kt.actions) {
    (a.t === "emb" &&
      (a.kind === "statue" && (orn += 0.026),
      a.kind === "obelisk" && (orn += 0.026),
      a.kind === "fountain" && (orn += 0.022),
      a.kind === "lantern" && (orn += 0.005)),
      a.t === "carve" && a.w >= 8 && (orn += 0.022),
      a.t === "anchor" && a.style === "column" && (orn += 0.018));
  }
  fe.updateQuals({
    ACCESS: t,
    SHELTER: e,
    LIGHT: n,
    BELONGING: r,
    GRANDEUR: clamp(o, 0, 0.6) + clamp(orn, 0, 0.4),
  });
}
let oc = !1;
function ac() {
  oc || saveGame({ day: te.day, hour: te.hour, infill: Ne.serialize() });
}
new URLSearchParams(location.search).has("fresh") &&
  (localStorage.removeItem("capriccio-save-v1"),
  // ?fresh also re-arms the first-run walkthrough (brief 8) — the one
  // sanctioned point of contact between the two keys
  localStorage.removeItem("capriccio-tutorial-v1"));
const hn = loadGame();
if (hn) {
  ((gameState.playerActions = hn.actions), (gameState.nextId = 1e3 + hn.actions.length + 5));
  for (const t of hn.actions)
    ((t.id = t.id ?? gameState.nextId++),
      Kt.applyAction(structuredClone(t)),
      (gameState.nextId = Math.max(gameState.nextId, (t.id ?? 0) + 1)));
  ((gameState.res = hn.res),
    (gameState.plates = hn.plates ?? []),
    (gameState.doneRequests = new Set(hn.doneRequests ?? [])),
    (gameState.folio = hn.folio ?? !1),
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
fe.updateFolio(gameState.plates.slice(-16));
{
  const i = document.querySelector("#veil"),
    t = document.createElement("div");
  ((t.textContent = gameState.folio
    ? "(playing without resources)"
    : "or play without resources"),
    (t.style.cssText =
      "margin-top:14px;font-size:11px;letter-spacing:0.12em;opacity:0.6;cursor:pointer;font-style:italic"),
    (t.onclick = () => {
      ((gameState.folio = !0),
        (gameState.dirty = !0),
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
// The handover: on completion the marker leaves the speaker at once — they
// go back into the crowd — and the next speaker is marked only when their
// request is announced, after the existing 9s delay. When the last request
// is done nobody is marked at all; the empty state is the point.
oi.onDone = (i) => {
  (fe.toast(i.thanks + `  (+${i.favor} clearance)`, 7e3),
    fe.setRequest(null),
    ei.setSpeaker(-1),
    (Uv = ""));
};
oi.onNew = (i) => {
  (fe.setRequest(i.text), syncSpeaker());
};
oi.active && (fe.setRequest(oi.active.text), syncSpeaker());
Kt.onStructureBuilt = () => {};
let Ns = performance.now(),
  Do = 0,
  Lo = 0;
te.paused = !0;
/** Derive district names and positions from what has been built nearby. Names
 * come from a pool that has drifted unevenly — Sodium and Halogen arrived,
 * Candle refused to leave. */
function Nh(i) {
  const t = Math.min(i, 120) / 1e3;
  if (((Aa.value += t), ov(Aa.value), Kt.sceneTick && Kt.sceneTick(Aa.value), !te.paused)) {
    // the dark hours run at NIGHT_RATE — a full day is ~11.7 real minutes,
    // ~2.3 of them night — and the day turns over at the 29.6 → 5.6 wrap
    const hourDelta =
      t * te.speed * (te.hour > NIGHT_START ? NIGHT_RATE : 1);
    ((te.hour += hourDelta),
      te.hour >= DAY_END && ((te.hour -= 24), te.day++, (gameState.dirty = !0)),
      os(te.hour),
      V_(hourDelta),
      ei.update(t, te.hour),
      ni.active && ni.update(t),
      (Lo += t),
      Lo > 2.2 &&
        ((Lo = 0),
        Ne.grow(
          te.hour,
          10 +
            gameState.res.favor * 0.28 +
            Kt.pockets.filter((n) => n.kind !== "terrace_p").length * 0.12,
        ),
        oi.check(Kt, Ne),
        ei.sync()),
      (Do += t),
      Do > 8 && ((Do = 0), (bi = Rh(Kt, Ne)), setDistricts(bi), updateQualityMeters(), gameState.dirty && ac()));
    const e = ie.position,
      Vv = {
        dusk: ke.postMat.uniforms.uDusk.value,
        waterDist: Kt.waterDistAt(e),
        constructing: Ne.items.some((n) => n.stage < 1),
        hour: te.hour,
        // the score reads the city's size to choose its track — the same
        // way the wind and the bell already read the sim
        pop: ei.population,
      };
    (Lh.update(t, Vv), score.update(t, Vv));
  }
  if (Sf) {
    ((Sf.k = Math.min(1, Sf.k + (t * 1000) / Sf.dur)));
    const n = Sf.k,
      r = n * n * (3 - 2 * n);
    (ie.position.lerpVectors(Sf.p0, Sf.p1, r),
      Te.target.lerpVectors(Sf.g0, Sf.g1, r),
      n >= 1 && (Sf = null));
  }
  // one world-space name, because there is only ever one speaker — the
  // district-label system carries it
  const Rv = ei.speakerAgent(),
    Ev =
      Rv && Uv
        ? [...bi, { x: Rv.pos.x, y: Rv.pos.y + 3.1, z: Rv.pos.z, name: Uv }]
        : bi;
  // keep the eye above the ground: the orbit can otherwise dip below the
  // plateau or the mesa and show the underside of the world. Clamp after
  // damping so OrbitControls never fights the correction.
  if (!ni.active) {
    Te.update();
    const Wv = terrainHeightAt(ie.position.x, ie.position.z) + 1.7;
    ie.position.y < Wv && ((ie.position.y = Wv), ie.lookAt(Te.target));
  }
  (fe.updateResources(ei.population),
    fe.updateClock(te.day, te.hour % 24),
    fe.updateLabels(Ev, ie, (fn === "build" || fn === "section") && !Mn.tool));
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
  shared: engravingUniforms,
  world: Kt,
  time: te,
  SPOTS: Vr,
  hemi: Nr,
  sunLight: Pe,
  syncLightModel: syncLightUniforms,
  tools: Mn,
  hud: fe,
  infill: Ne,
  citizens: ei,
  requests: oi,
  // the agent voicing the active request, or null — derived, never stored
  speaker: () => ei.speakerAgent(),
  state: gameState,
  score,
  wander: ni,
  section: Qn,
  undo: rc,
  doSave: ac,
  engrave(i = !0) {
    return Uh(i);
  },
  async plateTest() {
    const i = ke.snap(je, ie, 800, 533);
    return (await renderPlateImage(i, "test plate · day 1", 1)).length;
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
      (i.id = i.id ?? gameState.nextId++),
      // same stamp the placement tool applies — CAP.act is the other door
      (i.day = i.day ?? te.day),
      (i.hour = i.hour ?? Math.round(te.hour * 10) / 10),
      gameState.playerActions.push(structuredClone(i)),
      Kt.applyAction(i)
    );
  },
  grow(i = 20) {
    for (let t = 0; t < i; t++) {
      Ne.grow(12, 999);
      for (let e = 0; e < 9; e++) Ne.grow(12, 0);
    }
    return (ei.sync(), (bi = Rh(Kt, Ne)), setDistricts(bi), Ne.items.length);
  },
  skip(i) {
    for (te.hour += i; te.hour >= DAY_END; ) ((te.hour -= 24), te.day++);
    os(te.hour);
  },
  pathTest(i, t, e, n) {
    const s = Kt.nav.nearest(new Vector3(i, 0, t), 40),
      r = Kt.nav.nearest(new Vector3(e, 0, n), 40);
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
      res: { ...gameState.res },
      request: oi.active?.id ?? null,
      districts: bi.map((i) => i.name),
      draws: ke.lastDraws,
      tris: ke.lastTris,
    };
  },
};

// --- generated exports ---
export { Do, Fr, Lo, Ne, Or, Te, Us, ac, av, bi, cc, ei, fe, ic, ie, je, ke, ni, oc, oi, os, ov, rc, sc, te, us };
