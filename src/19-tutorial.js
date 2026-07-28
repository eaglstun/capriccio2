// First-run walkthrough — six beats, taught by doing. (Brief 8)
//
// Hand-written for the vaporwave branch; not part of the original bundle.
// It observes the running game through window.CAP and adds no mechanics:
// everything the player builds during it is a real action and persists
// normally. Persistence lives in its own localStorage key,
// "capriccio-tutorial-v1" — the save format is frozen and untouched.
//
// The rules it holds itself to:
//   - action beats advance only when the player performs the action
//   - the camera yields instantly and permanently (per beat) to any drag
//   - no full-screen scrim; the target glows, the world stays lit
//   - a quiet, always-visible skip; one click, no confirm
//   - input is never blocked

import { Vector3 } from "three";

const TUT_KEY = "capriccio-tutorial-v1";
const SAVE_KEY = "capriccio-save-v1";

function eligible() {
  try {
    if (localStorage.getItem(TUT_KEY)) return !1;
    if (localStorage.getItem(SAVE_KEY)) return !1;
  } catch {
    return !1;
  }
  const s = window.CAP?.state;
  return !!s && s.playerActions.length === 0;
}

const REDUCED = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
const COARSE = window.matchMedia?.("(pointer: coarse)").matches ?? !1;

const tutCss = `
#tut { position: fixed; inset: 0; z-index: 40; pointer-events: none;
  font-family: "Avenir Next", "Futura", "Century Gothic", "Helvetica Neue", Arial, sans-serif;
  color: #f4e9ff; }
#tut-card { position: absolute; left: 50%; bottom: 106px; transform: translateX(-50%);
  max-width: 440px; padding: 10px 20px; font-size: 13px; font-style: italic; line-height: 1.6;
  text-align: center; letter-spacing: 0.04em;
  background: rgba(26,16,54,0.86); border: 1px solid #6ff5ea;
  box-shadow: 0 1px 0 rgba(111,245,234,0.25), inset 0 0 0 3px rgba(26,16,54,0.9), inset 0 0 0 4px rgba(111,245,234,0.3);
  opacity: 0; transition: opacity 0.7s; }
#tut.show #tut-card { opacity: 1; }
#tut.left #tut-card { left: 12px; transform: none; bottom: 124px; text-align: left; max-width: 340px; }
#tut-card .dim { opacity: 0.38; transition: opacity 0.5s; }
#tut-skip { position: absolute; right: 12px; bottom: 62px; pointer-events: auto; cursor: pointer;
  font-size: 10.5px; font-style: italic; letter-spacing: 0.18em; opacity: 0.55; padding: 6px 10px; }
#tut-skip:hover { opacity: 0.9; }
#tut-ring { position: absolute; display: none; border: 2px solid #6ff5ea; border-radius: 7px;
  animation: tut-pulse 1.7s ease-in-out infinite; }
#tut-mark { position: absolute; display: none; width: 54px; height: 54px; margin: -27px 0 0 -27px;
  border: 2px solid #6ff5ea; border-radius: 50%;
  animation: tut-pulse 1.7s ease-in-out infinite; }
@keyframes tut-pulse {
  0%, 100% { box-shadow: 0 0 6px rgba(111,245,234,0.45), inset 0 0 6px rgba(111,245,234,0.2); }
  50% { box-shadow: 0 0 18px rgba(111,245,234,0.9), inset 0 0 10px rgba(111,245,234,0.4); }
}
@media (prefers-reduced-motion: reduce) { #tut-ring, #tut-mark { animation: none;
  box-shadow: 0 0 12px rgba(111,245,234,0.7); } }
@media (max-width: 640px) { #tut.left #tut-card { left: 50%; transform: translateX(-50%);
  bottom: 160px; text-align: center; } #tut-card { bottom: 160px; } }
`;

function startWalkthrough() {
  const CAP = window.CAP,
    cam = CAP.camera,
    controls = CAP.controls,
    dom = CAP.engraving.renderer.domElement;

  // --- UI -----------------------------------------------------------------
  const style = document.createElement("style");
  style.textContent = tutCss;
  document.head.appendChild(style);
  const root = document.createElement("div");
  root.id = "tut";
  root.innerHTML = `
    <div id="tut-ring"></div>
    <div id="tut-mark"></div>
    <div id="tut-card"></div>
    <div id="tut-skip">✕ skip the walkthrough</div>`;
  document.body.appendChild(root);
  const card = root.querySelector("#tut-card"),
    ring = root.querySelector("#tut-ring"),
    mark = root.querySelector("#tut-mark"),
    skip = root.querySelector("#tut-skip");

  const timers = new Set();
  function later(fn, ms) {
    const id = setTimeout(() => {
      timers.delete(id);
      fn();
    }, ms);
    timers.add(id);
    return id;
  }

  function say(html, side = !1) {
    root.classList.toggle("left", side);
    card.innerHTML = html;
    root.classList.add("show");
  }
  function hush() {
    root.classList.remove("show");
  }

  let ringEl = null,
    tickCount = 0;
  // debug handle for playtesting; carries no game state
  window.__TUT = {
    get beat() {
      return beat;
    },
    get flight() {
      return flight ? { ...flight } : null;
    },
    get camFree() {
      return camFree;
    },
    get ticks() {
      return tickCount;
    },
  };
  function ringOn(el) {
    ringEl = el;
  }
  function ringOff() {
    ringEl = null;
    ring.style.display = "none";
  }
  let markPos = null; // Vector3 in world space, or null
  function placeRing() {
    // keep the card clear of the variants row when a tool is open
    card.style.bottom =
      CAP.hud.varRow && CAP.hud.varRow.style.display === "block" ? "152px" : "";
    if (ringEl) {
      const r = ringEl.getBoundingClientRect();
      if (r.width > 4 && r.height > 4) {
        ring.style.display = "block";
        ring.style.left = `${r.left - 5}px`;
        ring.style.top = `${r.top - 5}px`;
        ring.style.width = `${r.width + 6}px`;
        ring.style.height = `${r.height + 6}px`;
      } else ring.style.display = "none";
    }
    if (markPos) {
      const v = markPos.clone().project(cam);
      if (v.z < 1 && Math.abs(v.x) < 1.05 && Math.abs(v.y) < 1.05) {
        mark.style.display = "block";
        mark.style.left = `${(v.x * 0.5 + 0.5) * innerWidth}px`;
        mark.style.top = `${(-v.y * 0.5 + 0.5) * innerHeight}px`;
      } else mark.style.display = "none";
    } else mark.style.display = "none";
  }

  // --- camera -------------------------------------------------------------
  // One optional move per beat. Any real drag or wheel cancels it instantly
  // and permanently for that beat; a fresh beat may move once more.
  let flight = null,
    camFree = !1;
  function vantage(tgt, dist, elev) {
    // keep the player's current azimuth — the view turns to face the target
    // without ever swinging around it
    const az = Math.atan2(cam.position.x - tgt.x, cam.position.z - tgt.z);
    return new Vector3(
      tgt.x + Math.sin(az) * dist,
      tgt.y + elev,
      tgt.z + Math.cos(az) * dist,
    );
  }
  function flyTo(tgt, dist, elev, dur = 1.7) {
    if (camFree) return;
    if (REDUCED) {
      cam.position.copy(vantage(tgt, dist, elev));
      controls.target.copy(tgt);
      controls.update();
      return;
    }
    flight = {
      k: 0,
      dur: dur * 1000,
      p0: cam.position.clone(),
      p1: vantage(tgt, dist, elev),
      g0: controls.target.clone(),
      g1: tgt.clone(),
    };
  }
  function yieldCamera() {
    flight = null;
    camFree = !0;
  }

  // --- input observation --------------------------------------------------
  let dragged = !1,
    zoomed = !1,
    down = null;
  const pointers = new Set();
  function onDown(e) {
    pointers.add(e.pointerId);
    down = { x: e.clientX, y: e.clientY };
  }
  function onMove(e) {
    if (!down) return;
    if (Math.hypot(e.clientX - down.x, e.clientY - down.y) > 9) {
      yieldCamera();
      if (pointers.size >= 2) markZoom();
      else markDrag();
    }
  }
  function onUp(e) {
    pointers.delete(e.pointerId);
    if (!pointers.size) down = null;
  }
  function onWheel() {
    yieldCamera();
    markZoom();
  }
  dom.addEventListener("pointerdown", onDown);
  dom.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);
  window.addEventListener("pointercancel", onUp);
  dom.addEventListener("wheel", onWheel, { passive: !0 });

  // --- hooks into the game (wrapped, never replaced) ----------------------
  const prevTool = CAP.hud.cb.onTool;
  CAP.hud.cb.onTool = (i, t) => {
    prevTool(i, t);
    onToolPick(i);
  };
  const prevCommit = CAP.tools.onCommit;
  CAP.tools.onCommit = (a) => {
    prevCommit?.(a);
    onBuilt(a);
  };

  // --- the six beats ------------------------------------------------------
  let beat = 0,
    done = !1,
    anchorAction = null,
    connectAction = null;

  const ZOOM_WORD = COARSE ? "pinch to zoom" : "scroll to zoom";
  function lookLine() {
    return (
      `<span${dragged ? ' class="dim"' : ""}>Drag to look around.</span> ` +
      `<span${zoomed ? ' class="dim"' : ""}>${ZOOM_WORD[0].toUpperCase() + ZOOM_WORD.slice(1)}.</span>`
    );
  }
  function markDrag() {
    if (!dragged) {
      dragged = !0;
      if (beat === 1) {
        say(lookLine());
        maybeLooked();
      }
    }
  }
  function markZoom() {
    if (!zoomed) {
      zoomed = !0;
      if (beat === 1) {
        say(lookLine());
        maybeLooked();
      }
    }
  }
  function maybeLooked() {
    if (beat === 1 && dragged && zoomed) later(() => setBeat(2), 900);
  }

  function onToolPick(i) {
    if (done) return;
    if (beat === 3) {
      if (i === "anchor") {
        ringOff();
        say("Now click open ground to found it.");
      } else if (!anchorAction) {
        say("Everything starts from a pier. Click ESTABLISH.");
        ringOn(CAP.hud.toolBtns.get("anchor"));
      }
    }
    if (beat === 4) {
      if (i === "rise" || i === "span") {
        ringOff();
        say("Click the low place, then the top of your pier — its top will snap.");
      } else if (!connectAction) {
        say("A pier alone is a post. Click RISE — connect it, and it becomes a way through.");
        ringOn(CAP.hud.toolBtns.get("rise"));
      }
    }
  }
  function onBuilt(a) {
    if (done) return;
    if (a.t === "anchor" && !anchorAction) {
      anchorAction = a;
      if (beat === 3) {
        ringOff();
        hush();
        later(() => {
          flyTo(new Vector3(a.x, Math.max(4, a.topY * 0.45), a.z), 52, 24);
        }, 250);
        later(() => setBeat(4), 1400);
      }
    }
    if ((a.t === "rise" || a.t === "span") && !connectAction) {
      connectAction = a;
      if (beat === 4) {
        ringOff();
        hush();
        later(() => setBeat(5), 900);
      }
    }
  }

  function playerPocket() {
    const ps = CAP.world.pockets,
      ids = [connectAction?.id, anchorAction?.id].filter((x) => x != null);
    let pool = ps.filter((p) => ids.includes(p.structId));
    if (!pool.length) pool = ps.filter((p) => p.structId >= 1000);
    if (!pool.length && anchorAction)
      pool = ps
        .filter((p) => p.occupiedBy < 0)
        .sort(
          (a, b) =>
            Math.hypot(a.pos[0] - anchorAction.x, a.pos[2] - anchorAction.z) -
            Math.hypot(b.pos[0] - anchorAction.x, b.pos[2] - anchorAction.z),
        )
        .slice(0, 3);
    if (!pool.length) return null;
    return pool.find((p) => p.occupiedBy >= 0 || inhabited(p)) ?? pool[0];
  }
  function inhabited(p) {
    return (
      p.occupiedBy >= 0 || CAP.infill.items.some((it) => it.pocketIdx === p.idx)
    );
  }

  function setBeat(n) {
    if (done) return;
    beat = n;
    // a new beat may move the camera once more — but an in-progress framing
    // move (e.g. beat 3's flight to the new pier) is left to finish; only the
    // player's own input cancels it
    camFree = !1;
    switch (n) {
      case 1: {
        say(lookLine());
        maybeLooked();
        break;
      }
      case 2: {
        hush();
        flyTo(new Vector3(-18, 6, 30), 74, 30, 1.9);
        later(() => {
          say(
            "It is already inhabited — forty-six citizens, living in ruins somebody else left.",
          );
        }, REDUCED ? 200 : 1600);
        later(() => setBeat(3), 7600);
        break;
      }
      case 3: {
        if (anchorAction) {
          // they found the tool on their own during an earlier beat
          setBeat(4);
          break;
        }
        say("Everything starts from a pier. Click ESTABLISH.");
        ringOn(CAP.hud.toolBtns.get("anchor"));
        break;
      }
      case 4: {
        if (connectAction) {
          setBeat(5);
          break;
        }
        say("A pier alone is a post. Click RISE — connect it, and it becomes a way through.");
        ringOn(CAP.hud.toolBtns.get("rise"));
        break;
      }
      case 5: {
        const p = playerPocket();
        if (p) {
          markPos = new Vector3(p.pos[0], p.pos[1] + 1.4, p.pos[2]);
          flyTo(new Vector3(p.pos[0], p.pos[1] + 1.5, p.pos[2]), 32, 15, 1.8);
        }
        say("Your architecture has made room — a pocket, fit to live in.");
        // hold on it; the moment someone claims it, say the thesis
        const t0 = performance.now();
        const poll = () => {
          if (done || beat !== 5) return;
          const q = playerPocket();
          if (q && inhabited(q)) {
            markPos = new Vector3(q.pos[0], q.pos[1] + 1.4, q.pos[2]);
            say("Someone is already moving in. You did not place that — they chose it.");
            later(() => setBeat(6), 6000);
          } else if (performance.now() - t0 > 7000) {
            say(
              "The citizens will move in on their own. You will not place what comes next — they will choose it.",
            );
            later(() => setBeat(6), 6000);
          } else later(poll, 400);
        };
        later(poll, 2600);
        break;
      }
      case 6: {
        try {
          localStorage.setItem(TUT_KEY, "done");
        } catch {}
        markPos = null;
        const req = CAP.hud.requestEl;
        if (req && req.style.display !== "none") ringOn(req);
        say(
          "Marcus is asking for a way up to the high terrace. That is the first job — the city will ask the rest in time.",
          !0,
        );
        later(() => finish(), 14000);
        break;
      }
    }
  }

  function finish(skipped = !1) {
    if (done) return;
    done = !0;
    try {
      localStorage.setItem(TUT_KEY, skipped ? "skipped" : "done");
    } catch {}
    for (const id of timers) clearTimeout(id);
    timers.clear();
    hush();
    ringOff();
    markPos = null;
    flight = null;
    dom.removeEventListener("pointerdown", onDown);
    dom.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
    window.removeEventListener("pointercancel", onUp);
    dom.removeEventListener("wheel", onWheel);
    setTimeout(() => {
      root.remove();
      style.remove();
    }, 1000);
  }
  skip.onclick = () => finish(!0);

  // --- per-frame ----------------------------------------------------------
  let last = performance.now();
  function tick(now) {
    if (done) return;
    tickCount++;
    const gap = now - last,
      dt = Math.min(gap, 100);
    last = now;
    if (flight) {
      // progress accumulates per-frame time, capped — a stalled or throttled
      // frame advances the move a little; it can never teleport it
      flight.k = Math.min(1, flight.k + dt / flight.dur);
      const k = flight.k,
        s = k * k * (3 - 2 * k);
      cam.position.lerpVectors(flight.p0, flight.p1, s);
      controls.target.lerpVectors(flight.g0, flight.g1, s);
      controls.update();
      if (k >= 1) flight = null;
    } else if (beat === 1 && !camFree && !REDUCED) {
      // the slow establishing drift — killed forever by the first real drag
      const tg = controls.target,
        dx = cam.position.x - tg.x,
        dz = cam.position.z - tg.z,
        r = Math.hypot(dx, dz),
        az = Math.atan2(dx, dz) + 0.00006 * dt;
      cam.position.set(tg.x + Math.sin(az) * r, cam.position.y, tg.z + Math.cos(az) * r);
      controls.update();
    }
    placeRing();
    schedule();
  }
  // the game itself keeps simulating through document.hidden on a timer
  // (17-bootstrap's lc()); the walkthrough must not freeze while it does
  function schedule() {
    if (done) return;
    if (document.hidden) setTimeout(() => tick(performance.now()), 500);
    else requestAnimationFrame(tick);
  }

  schedule();
  setBeat(1);
}

// Arm only on a genuinely fresh game, and only once the player has chosen to
// begin. The veil's BEGIN click is the game's own front door; the walkthrough
// waits behind it, then lets the epigraph finish before speaking.
if (eligible()) {
  const arm = () => {
    const wait = () => {
      const e = document.getElementById("epigraph");
      if (!e || e.style.opacity === "0") setTimeout(startWalkthrough, 500);
      else setTimeout(wait, 250);
    };
    setTimeout(wait, 400);
  };
  document.querySelector("#veil .begin")?.addEventListener("click", arm, { once: !0 });
}
