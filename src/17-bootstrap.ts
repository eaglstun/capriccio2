// Boot sequence, input wiring, quality meters, window.CAP
//
// Extracted from public/assets/index-DCXbw2vV.js, bundle lines
// 30393–30951. Statements are verbatim; identifiers are
// renamed via src/renames.json. Imports and exports are generated.
// Regenerate: python3 tools/split_bundle.py --write

// --- generated imports ---
import {
  Color,
  DirectionalLight,
  FogExp2,
  HemisphereLight,
  PerspectiveCamera,
  Scene,
  Vector2,
  Vector3,
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {
  J0,
  engravingUniforms,
  setDistricts,
  syncLightUniforms,
} from "./00-shaders";
import {
  Aa,
  Nn,
  Vr,
  clamp,
  hashString,
  lerp,
  n_,
  terrainHeightAt,
} from "./01-materials";
import { Ah, C_, P_, World } from "./05-world";
import { InfillSystem } from "./06-infill";
import { Citizens, Rh, V_, gameState } from "./07-citizens";
import { loadGame, saveGame } from "./08-save";
import { PlacementTool } from "./11-tools";
import { Requests } from "./12-requests";
import { Ph, SectionMode, WanderMode } from "./13-modes";
import { renderPlateImage } from "./14-plates";
import { Soundscape } from "./15-audio";
import { Hud } from "./16-hud";
import { score } from "./18-music";
import { Chronicle } from "./20-chronicle";
import { ChronicleView } from "./21-chronicle-fx";
import { EmberSystem } from "./22-embers";
import { GamepadInput } from "./23-gamepad";
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
// Keep the look-at point over real ground. The terrain plane reaches 300 along
// its axes and 424 at its corners; past that is the flat scenery apron, and
// panning out there leaves you staring at empty plain with the city behind
// you. 380 sits between the two — clear of the whole buildable area, still
// short of the edge in every direction.
//
// This caps the TARGET, not the eye: the orbit radius rides on top of it, so
// the camera can still get roughly 900 out and look back at the skyline.
// OrbitControls applies it inside update(), which means it holds for the mouse
// and the gamepad alike rather than being enforced per input device.
Te.maxTargetRadius = 380;
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
// the braziers' sparks. Render-only — reads the action list, writes pixels
const emberFx = new EmberSystem(je);
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
const dc_dusk = new Color("#ff8c46"), // violent orange
  dc_dawn = new Color("#dbe2f2"), // chalk-pale morning sun
  dc_hemi = new Color("#d8cdf0"),
  dc_hemiDawn = new Color("#c3cfe6"),
  dc_paperDay = new Color("#f0ddeb"), // bleached high day
  dc_paperDusk = new Color("#eb9f76"), // the hot sheet
  dc_paperDawn = new Color("#bfc8d8"), // cool blue-grey
  dc_paperNight = new Color("#221a30"), // the sheet gone cold and dark
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
    Nr.color
      .copy(dc_hemi)
      .lerp(dc_hemiDawn, dawnAmt)
      .lerp(dc_hemiNight, nightAmt),
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
  // the coal bed keeps its own clock: dimmer through the day, lifting hard
  // at night like the neon does, but warm — and with a slow two-sine
  // flicker no neon tube gets. os() runs every tick, so the flicker lives
  // here rather than in a shader.
  const emberMat = Kt.mats.ember;
  if (emberMat) {
    const fl = 0.9 + 0.1 * Math.sin(Aa.value * 9.3) * Math.sin(Aa.value * 23.7),
      ek = (0.55 + duskAmt * 0.5 + nightAmt * 1.05) * fl;
    emberMat.color.setRGB(ek + 0.25, 0.42 * ek + 0.08, 0.1 * ek + 0.02);
  }
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
    // the Chronicle: entered from the folio, because they are one idea
    onChronicle: (open) => (open ? openChronicle() : closeChronicle()),
    onChronicleScrub: (k) => chronicleView.requestScrub(k),
    onChroniclePlay: () => chronicleView.togglePlay(),
    onChronicleSpeed: () => chronicleView.cycleSpeed(),
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
    // leaving PLATE always returns from the past first
    (i !== "plate" && closeChronicle(),
    fn === "wander" && i !== "wander" && ni.active && ni.exit(),
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
    if (chronicle.active) {
      // exiting returns to the present, always
      closeChronicle();
      return;
    }
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
  if (chronicle.active) {
    // popping the log mid-replay would leave the Chronicle's index pointing
    // into a history that no longer exists. One door at a time.
    fe.toast("Return to the present first.");
    return;
  }
  const i = gameState.playerActions.pop();
  if (!i) {
    fe.toast("Nothing to undo.");
    return;
  }
  const t = Mn.costOf(i);
  ((gameState.res.stone += t.stone), (gameState.res.salvage += t.salvage));
  const e = Ne.serialize();
  (rebuildFromActions([...Ah(), ...gameState.playerActions]),
    Ih(e),
    ei.sync(),
    fe.toast("Unbuilt. The stone returns to the yard."));
}
/**
 * Clear and rebuild the world from `actions`, ground pockets included.
 *
 * Infill is cleared but deliberately NOT restored — that is the caller's, and
 * the two callers want different things. UNDO restores it immediately; the
 * Chronicle leaves it out for the whole replay and puts it back only on exit.
 *
 * Both seeded ground-pocket calls belong to this sequence. Rebuilding without
 * them leaves the terrain with no pockets to grow into, so they must not drift
 * apart from the rebuild.
 */
function rebuildFromActions(actions) {
  (Ne.clear(),
    Kt.rebuildAll(actions),
    Kt.seedGroundPockets(-18, 30, 14, 12, 34),
    Kt.seedGroundPockets(-24, -80, 12, 10, 30, 77));
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
/**
 * The Chronicle. Given the rebuild sequence above, it owns only the safety:
 * one infill snapshot on entry, autosave suppressed for the visit, and the
 * player's action log read but never written.
 */
const chronicle = new Chronicle({
  state: gameState,
  seedActions: Ah,
  rebuild: rebuildFromActions,
  restoreInfill: Ih,
  serializeInfill: () => Ne.serialize(),
  citizens: ei,
  // `oc` is the same flag "start anew" uses to stop a queued autosave from
  // rewriting a save that is on its way out.
  setSaveSuppressed: (on) => {
    oc = on;
  },
});
/**
 * The view half: the replay grade on the post shader, the Chronicle-only
 * composer chain, playback, coalesced scrubbing, and the dust. Everything in
 * it is render-only — the engine above is the only thing that touches state.
 */
const chronicleView = new ChronicleView({
  ke,
  scene: je,
  camera: ie,
  chronicle,
  world: Kt,
  actionAt: (k) => gameState.playerActions[k - 1] ?? null,
  focusFallback: () => Te.target,
});
chronicleView.onSync = () =>
  fe.syncChronicle(
    chronicle.index,
    chronicle.captionAt(chronicle.index),
    chronicleView.playing,
    chronicleView.speedLabel,
  );
// set by Uh when a plate is engraved from inside the visit — see closeChronicle
let chronPlateTaken = !1;
function openChronicle() {
  if (chronicle.active) return;
  if (!gameState.playerActions.length) {
    fe.toast("The chronicle begins with your first stone.");
    return;
  }
  (chronicle.enter(),
    chronicleView.opened(),
    fe.setChronicle(!0, chronicle.length),
    chronicleView.onSync());
}
function closeChronicle() {
  if (!chronicle.active) return;
  (chronicleView.closing(), chronicle.exit());
  // a plate engraved inside the visit is a real edit, but exit() restored the
  // dirty flag to its entry value — re-mark it, or the plate would sit
  // unsaved until some unrelated event happened to dirty the game.
  chronPlateTaken && ((gameState.dirty = !0), (chronPlateTaken = !1));
  (chronicleView.closed(), fe.setChronicle(!1));
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
    // engraved from inside the Chronicle, a plate is a RECONSTRUCTION: it
    // shows the city as it stood then, so it must claim the historical
    // moment — the action's own day where stamped, an ordinal where not —
    // never the present day, and it must say quietly what it is. It is
    // captioned with the city's name, not a district's: districts are
    // derived from the present and the past cannot borrow them.
    past = chronicle.active,
    a = past
      ? `${gameState.cityName} · ${chronicle.captionAt(chronicle.index)} · reconstruction`
      : `${bi.length ? bi[0].name : gameState.cityName} · day ${te.day}`,
    c = await renderPlateImage(s, a, r);
  const plate = {
    cam: [...ie.position.toArray(), ...Te.target.toArray()],
    hour: te.hour,
    caption: a,
    n: r,
  } as any;
  past && ((plate.recon = !0), (chronPlateTaken = !0));
  gameState.plates.push(plate);
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
    // the brazier counts beside the lantern here: a fire someone keeps fed
    // is at least the neighbour a lamp is (brief 10, and the same weight)
    s = Kt.actions.filter(
      (a) => a.t === "emb" && (a.kind === "lantern" || a.kind === "brazier"),
    ).length,
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
      a.kind === "lantern" && (orn += 0.005),
      // brazier scores like the lantern: it already feeds BELONGING.
      // Fallen column and game board score 0 by the cypress's rule —
      // grandeur belongs to things somebody raised
      a.kind === "brazier" && (orn += 0.005)),
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
// The periodic autosave serialises the whole city and JSON.stringifies it into
// localStorage — synchronous, and long enough to cost a frame. Orbiting you
// never see it; in WANDER it lands as a hitch every eight seconds. Push it to
// idle time. `ac()` itself stays synchronous for the page-hide path, which has
// no idle time left to spend.
let ocIdle = 0;
function acIdle() {
  if (oc || ocIdle) return;
  const t = (window as any).requestIdleCallback;
  ocIdle = t
    ? t(() => ((ocIdle = 0), ac()), { timeout: 2000 })
    : setTimeout(() => ((ocIdle = 0), ac()), 0);
}
new URLSearchParams(location.search).has("fresh") &&
  (localStorage.removeItem("capriccio-save-v1"),
  // ?fresh also re-arms the first-run walkthrough (brief 8) — the one
  // sanctioned point of contact between the two keys
  localStorage.removeItem("capriccio-tutorial-v1"));
const hn = loadGame();
if (hn) {
  ((gameState.playerActions = hn.actions),
    (gameState.nextId = 1e3 + hn.actions.length + 5));
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
  const i = document.querySelector<HTMLElement>("#veil .begin");
  i && (i.textContent = "CONTINUE");
} else {
  const i = [
    ["house", 6],
    ["stall", 2],
    ["garden", 1],
  ] as const;
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
  const i = document.querySelector<HTMLElement>("#veil"),
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
        document.querySelector<HTMLElement>("#veil .begin")?.click());
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
// A8: a hint speaks as a citizen, through the same channel the thanks lines
// use, and is left up longer than a build toast because it is meant to be read
// rather than glanced at. The ask itself stays in the request box untouched.
oi.onHint = (i) => {
  fe.toast(i, 11e3);
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
  // Poll the pad first: it writes into the walk keys, the orbit's spherical
  // delta and the placement hover, all of which are read further down this
  // same frame. Polling after them would run the whole pad a frame late.
  padInput.update(t);
  if (
    ((Aa.value += t),
    ov(Aa.value),
    Kt.sceneTick && Kt.sceneTick(Aa.value),
    // the Chronicle stands outside time: while it is open the clock, the
    // resource accrual, the infill growth, the request checks and the
    // meters all hold still. This is a state-safety line, not a flourish —
    // Ne.grow would build vernacular into a replayed city and oi.check
    // would complete requests against a past that is not the present,
    // and doneRequests survives the visit.
    !te.paused && !chronicle.active)
  ) {
    // the dark hours run at NIGHT_RATE — a full day is ~11.7 real minutes,
    // ~2.3 of them night — and the day turns over at the 29.6 → 5.6 wrap
    const hourDelta = t * te.speed * (te.hour > NIGHT_START ? NIGHT_RATE : 1);
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
      Do > 8 &&
        ((Do = 0),
        (bi = Rh(Kt, Ne)),
        setDistricts(bi),
        updateQualityMeters(),
        gameState.dirty && acIdle()));
  }
  // the soundscape and the score keep playing INSIDE the Chronicle — they
  // only read the sim, and the city's music over its own bones is right —
  // but they hear whatever world is currently standing.
  if (!te.paused) {
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
  // the Chronicle's own frame: the uChronicle ramp (both directions), the
  // coalesced scrub application, playback stepping, and the dust.
  chronicleView.frame(t * 1e3);
  // outside the pause gate so fires keep sparking through the chronicle and
  // the start veil. Render-only: it reads the action list and writes pixels
  emberFx.update(t, Kt, ie, ke.postMat.uniforms.uNight.value);
  if (Sf) {
    Sf.k = Math.min(1, Sf.k + (t * 1000) / Sf.dur);
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
    // outside the Chronicle this is exactly ke.render; inside, the same
    // engraved frame continues into the Chronicle-only composer chain
    chronicleView.render(je, ie),
    document.hidden || requestAnimationFrame(cc));
}
function lc() {
  if (document.hidden) {
    const i = performance.now();
    (Nh(i - Ns), (Ns = i), chronicleView.render(je, ie), setTimeout(lc, 500));
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
// Gamepad (brief A10). Constructed unconditionally but dormant until a pad
// connects — see 23-gamepad. It is handed accessors rather than values
// because `fn` is reassigned by cv() and the pad must read the live mode,
// not the one that happened to be current at construction.
const padInput = new GamepadInput({
  controls: Te,
  tool: Mn,
  hud: fe,
  wander: ni,
  mode: () => fn,
  chronicleActive: () => chronicle.active,
  closeChronicle,
});
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
  chronicle,
  // the UI/view layer over the engine: open/close as the folio button would,
  // and the view object itself for playback and speed
  chronicleView,
  chronicleOpen: openChronicle,
  chronicleClose: closeChronicle,
  // the brazier particle system — render-only; exposed so its budget can be
  // checked from the console (CAP.embers.count())
  embers: emberFx,
  /**
   * The round-trip test CHRONICLE.md calls non-optional: snapshot the city,
   * scrub to before the first stone and back to the present, exit, and assert
   * nothing moved.
   *
   * Compares only city state. `draws`/`tris` are per-frame render counters and
   * `districts` is recomputed on an 8-second timer, so including them would
   * fail for reasons that have nothing to do with the replay.
   */
  chronicleRoundTrip() {
    const cityState = () => {
      const kinds = {};
      for (const p of Kt.pockets) kinds[p.kind] = (kinds[p.kind] ?? 0) + 1;
      const s = this.status();
      return {
        structures: s.structures,
        pockets: s.pockets,
        occupied: s.occupied,
        infill: s.infill,
        navNodes: s.navNodes,
        pop: s.pop,
        res: s.res,
        actions: gameState.playerActions.length,
        kinds,
      };
    };
    const before = cityState();
    (chronicle.enter(),
      chronicle.scrubTo(0),
      chronicle.scrubTo(chronicle.length),
      chronicle.exit());
    const after = cityState(),
      ok = JSON.stringify(before) === JSON.stringify(after);
    return { ok, before, after };
  },
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
      (document.querySelector<HTMLElement>("#veil").style.display = "none"));
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
    for (te.hour += i; te.hour >= DAY_END;) ((te.hour -= 24), te.day++);
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
export {
  Do,
  Fr,
  Lo,
  Ne,
  Or,
  Te,
  Us,
  ac,
  av,
  bi,
  cc,
  ei,
  fe,
  ic,
  ie,
  je,
  ke,
  ni,
  oc,
  oi,
  os,
  ov,
  rc,
  sc,
  te,
  us,
};
