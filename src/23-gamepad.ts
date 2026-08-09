// Gamepad support — brief A10.
//
// NEW; not part of the reconstructed bundle. Nothing else imports it except
// 17-bootstrap, which constructs one and calls update() from the frame loop.
//
// THE RULE THIS MODULE EXISTS UNDER: a connected pad ADDS a path, it never
// takes one away. Mouse and keyboard keep working identically at all times,
// and a player without a pad must never see that this file shipped — no
// prompt, no hint, no cursor, no reserved space in the HUD. Everything here
// stays dormant until `gamepadconnected` fires.
//
// There is also no second loop. `update(dt)` is called from the existing
// per-frame function; polling `navigator.getGamepads()` anywhere else would
// double-read the sticks and make everything move at twice the speed on
// machines that happen to render fast.
//
// ---------------------------------------------------------------- the map
//
// The brief's layout, with one deliberate change. It proposed the right
// stick for zoom; the right stick is instead the PLACEMENT stick, because
// build tools resolve their target by raycasting from a screen point and a
// pad has no pointer to raycast from. Once a tool is chosen the right stick
// drives an aim point and the triggers keep the zoom.
//
//   BUILD / SECTION / PLATE
//     left stick    orbit the camera
//     right stick   move the aim point, once a tool is chosen — otherwise
//                   the camera's second hand: up/down zoom, left/right pan
//     L2 / R2       zoom out / in
//     A             place at the aim point (a click, at that point exactly)
//     B             cancel — clears the tool, or returns from the Chronicle
//     X             next variant of the current tool
//     Y             next tool
//     L1 / R1       previous / next mode
//
//   WANDER
//     left stick    walk
//     right stick   look
//     L2 or L3      hurry (the SHIFT of the keyboard walk)
//     B             leave WANDER
//
// The aim point is deliberately screen-space rather than world-space. Every
// placement rule in 11-tools — snapping to anchor tops, clearance gating,
// gradient limits — runs off `pick()`, which takes normalized device
// coordinates. Feeding it a stick-driven NDC point means the pad goes
// through the same path the mouse does and inherits all of it for free.

import type { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Vector2 } from "three";

/** Standard-mapping button indices, so the code below reads as names. */
const BTN = {
  A: 0,
  B: 1,
  X: 2,
  Y: 3,
  L1: 4,
  R1: 5,
  L2: 6,
  R2: 7,
  L3: 10,
  R3: 11,
  UP: 12,
  DOWN: 13,
  LEFT: 14,
  RIGHT: 15,
} as const;

const MODES = ["build", "section", "wander", "plate"] as const;
const TOOLS = [
  "anchor",
  "span",
  "rise",
  "vault",
  "carve",
  "emb",
  "designate",
] as const;

// Sticks rest at small nonzero values and drift with wear, so anything under
// the deadzone is nothing. The remainder is rescaled to run 0..1 across what
// is left of the throw — without that, crossing the deadzone edge would jump
// the input to 0.18 rather than easing up from zero. Squaring keeps fine
// control near centre while leaving the full rate available at the rim.
const DEAD = 0.18;
function axis(v: number) {
  const m = Math.abs(v);
  if (m < DEAD) return 0;
  const scaled = (m - DEAD) / (1 - DEAD);
  return Math.sign(v) * scaled * scaled;
}

/**
 * The dolly scale for one frame at input strength `amt` (0..1).
 *
 * READ THIS BEFORE CHANGING THE CONSTANT. OrbitControls' `_dollyIn` and
 * `_dollyOut` both expect a scale BELOW 1 — its own `_getZoomScale` returns
 * `pow(0.95, ...)` — and the direction comes from which of the two you call,
 * not from the sign of the argument. Handing `_dollyIn` a value above 1 zooms
 * OUT, silently and in the wrong direction, which is exactly the mistake the
 * names invite. Anything under 1 here is correct; 0.4 is a 2.5x change per
 * second at full deflection, which crosses the 5..520 distance range in a
 * few seconds without overshooting a target you are trying to settle on.
 */
function dolly(amt: number, dt: number) {
  return Math.pow(0.4, amt * dt);
}

/** A trigger reads as an axis on some pads and a button on others. */
function trigger(pad: Gamepad, i: number) {
  const b = pad.buttons[i];
  return b ? (b.value ?? (b.pressed ? 1 : 0)) : 0;
}

export interface GamepadHost {
  controls: OrbitControls;
  /** The placement tool — hover()/click() both take an NDC Vector2. */
  tool: {
    tool: string | null;
    variant: string;
    hover(p: Vector2): void;
    click(p: Vector2): void;
  };
  hud: { pickTool(t: string | null): void; pickMode(m: string): void };
  wander: {
    active: boolean;
    keys: Set<string>;
    yaw: number;
    pitch: number;
  };
  /** Current mode, read fresh each frame — the HUD can change it too. */
  mode(): string;
  /** True while the Chronicle is open; B returns to the present first. */
  chronicleActive(): boolean;
  closeChronicle(): void;
}

export class GamepadInput {
  host: GamepadHost;
  /** Dormant until a pad connects. Nothing in here runs while false. */
  present = false;
  /** Previous frame's pressed state, so buttons fire once per press. */
  private was: boolean[] = [];
  /** The aim point, in normalized device coordinates. */
  private aim = new Vector2(0, 0);
  private cursor: HTMLElement | null = null;
  /** Which tool the cursor was last shown for, to recentre on a change. */
  private aimedFor: string | null = null;
  /**
   * Set once at construction. OrbitControls r180 exposes no public setter for
   * its angles — only getters — so driving it means the underscore-prefixed
   * methods that feed `_sphericalDelta`, which is what `update()` consumes
   * with damping. Going through them rather than writing camera.position
   * keeps the pad's motion damped exactly like the mouse's.
   *
   * If a three upgrade renames them this flag goes false and orbit-by-pad
   * stops, loudly, in the console — rather than silently doing nothing.
   */
  private canOrbit: boolean;
  /** Same story for `_pan`, kept separate so losing one does not cost both. */
  private canPan: boolean;

  constructor(host: GamepadHost) {
    this.host = host;
    const c = host.controls as any;
    this.canPan = typeof c._pan === "function";
    this.canOrbit =
      typeof c._rotateLeft === "function" &&
      typeof c._rotateUp === "function" &&
      typeof c._dollyIn === "function" &&
      typeof c._dollyOut === "function";
    if (!this.canOrbit)
      console.warn(
        "[gamepad] OrbitControls internals moved; pad orbit is disabled.",
      );
    if (!this.canPan)
      console.warn(
        "[gamepad] OrbitControls._pan is gone; pad panning is disabled.",
      );

    // Some browsers only surface pads that have already been used, so check
    // for one already sitting there as well as listening for the event.
    const seen = () => {
      if (this.present) return;
      ((this.present = true), this.makeCursor());
    };
    window.addEventListener("gamepadconnected", seen);
    if (navigator.getGamepads?.().some(Boolean)) seen();
    window.addEventListener("gamepaddisconnected", () => {
      if (navigator.getGamepads?.().some(Boolean)) return;
      ((this.present = false), this.hideCursor());
    });
  }

  /** The crosshair. Built here rather than in 16-hud so that a player with
   * no pad never has the element in their document at all. */
  private makeCursor() {
    if (this.cursor) return;
    const el = document.createElement("div");
    ((el.id = "padcursor"),
      (el.style.cssText = [
        "position:fixed",
        "left:0",
        "top:0",
        "width:22px",
        "height:22px",
        "margin:-11px 0 0 -11px",
        "pointer-events:none",
        "z-index:40",
        "display:none",
        // the palette's active-tool accent, so the crosshair reads as part
        // of the same HUD; the dark drop-shadow keeps it legible where it
        // crosses bright terrain rather than the city's shadowed fabric
        "color:#ff71ce",
        "filter:drop-shadow(0 0 3px rgba(26,16,54,0.95))",
      ].join(";")),
      (el.innerHTML =
        '<svg viewBox="0 0 22 22" width="22" height="22">' +
        '<path d="M11 1v6M11 15v6M1 11h6M15 11h6" stroke="currentColor"' +
        ' stroke-width="1.4" fill="none"/>' +
        '<circle cx="11" cy="11" r="2.2" stroke="currentColor"' +
        ' stroke-width="1.2" fill="none"/></svg>'),
      document.body.appendChild(el),
      (this.cursor = el));
  }

  private hideCursor() {
    this.cursor && (this.cursor.style.display = "none");
  }

  /** Edge detect: true only on the frame a button goes down. */
  private hit(pad: Gamepad, i: number) {
    const now = !!pad.buttons[i]?.pressed,
      before = this.was[i] ?? false;
    this.was[i] = now;
    return now && !before;
  }

  /** Held state, for the things that repeat every frame. */
  private held(pad: Gamepad, i: number) {
    return !!pad.buttons[i]?.pressed;
  }

  update(dt: number) {
    if (!this.present) return;
    const pad = navigator.getGamepads?.().find(Boolean);
    if (!pad) return;
    // A tab can be hidden for minutes; the catch-up frame would otherwise
    // apply one enormous stick motion at once.
    const t = Math.min(dt, 0.05);

    // Refresh every edge-detect slot this frame, whether or not the branch
    // below reads it. Skipping the ones the current mode ignores would leave
    // stale state behind and fire a phantom press on the mode switch back.
    const down: boolean[] = [];
    for (const i of Object.values(BTN)) down[i] = this.hit(pad, i);

    this.host.wander.active ? this.wander(pad, t) : this.orbit(pad, t, down);

    // B is the one binding that means the same thing everywhere: back out of
    // whatever is currently open, innermost first.
    if (down[BTN.B]) this.back();
  }

  private back() {
    const h = this.host;
    if (h.wander.active) {
      (h.hud.pickMode("build"), this.clearWanderKeys());
      return;
    }
    if (h.chronicleActive()) {
      h.closeChronicle();
      return;
    }
    h.tool.tool && h.hud.pickTool(null);
  }

  // ------------------------------------------------------------- the orbit

  private orbit(pad: Gamepad, t: number, down: boolean[]) {
    const h = this.host,
      c = h.controls as any,
      lx = axis(pad.axes[0] ?? 0),
      ly = axis(pad.axes[1] ?? 0),
      rx = axis(pad.axes[2] ?? 0),
      ry = axis(pad.axes[3] ?? 0);

    // Left stick orbits. Rate is per second so it does not depend on frame
    // rate; 2.2 rad/s is a little under a full turn in three seconds at the
    // rim, which is brisk without being hard to stop on a target.
    if (this.canOrbit && (lx || ly)) {
      (c._rotateLeft(-lx * 2.2 * t), c._rotateUp(-ly * 1.5 * t));
    }

    // Triggers zoom, always.
    const zoom = trigger(pad, BTN.R2) - trigger(pad, BTN.L2);
    if (this.canOrbit && Math.abs(zoom) > 0.05) {
      zoom > 0 ? c._dollyIn(dolly(zoom, t)) : c._dollyOut(dolly(-zoom, t));
    }

    const tool = h.tool.tool;
    if (tool) {
      // A tool is live, so the right stick is the aim point. Recentre when
      // the tool changes: leaving the crosshair wherever the last placement
      // happened is disorienting when the tool it belonged to is gone.
      if (this.aimedFor !== tool) {
        (this.aim.set(0, 0), (this.aimedFor = tool));
      }
      if (rx || ry) {
        // 1.1 NDC per second is a little over half the screen — fast enough
        // to cross it deliberately, slow enough to land on an anchor top.
        (this.aim.set(
          Math.max(-0.98, Math.min(0.98, this.aim.x + rx * 1.1 * t)),
          Math.max(-0.98, Math.min(0.98, this.aim.y - ry * 1.1 * t)),
        ),
          this.drawCursor());
      }
      // Hover every frame regardless of stick motion: the ghost has to keep
      // up with the camera when the LEFT stick moves under a still cursor.
      (this.showCursor(), h.tool.hover(this.aim));
      if (down[BTN.A]) h.tool.click(this.aim);
    } else {
      (this.hideCursor(), (this.aimedFor = null));
      // With no tool selected the right stick is the camera's second hand:
      // up and down zoom, left and right pan. Pushing forward goes in, which
      // is why ry < 0 dollies in.
      if (this.canOrbit && ry) {
        ry < 0 ? c._dollyIn(dolly(-ry, t)) : c._dollyOut(dolly(ry, t));
      }
      // `_pan` takes PIXEL deltas and divides by the distance to the target,
      // so one stick throw covers the same fraction of the screen whether you
      // are up among the skyline or down between the piers. Panning in world
      // units instead would crawl when zoomed out and lurch when zoomed in.
      //
      // Negated because `_pan` follows the mouse's grab-the-world convention —
      // a positive delta pans the camera LEFT. The stick is camera-style, like
      // the orbit above it: push right, the view goes right.
      if (this.canPan && rx) c._pan(-rx * 620 * t, 0);
    }

    (down[BTN.Y] && this.cycleTool(), down[BTN.X] && this.cycleVariant());
    ((down[BTN.L1] || down[BTN.LEFT]) && this.cycleMode(-1),
      (down[BTN.R1] || down[BTN.RIGHT]) && this.cycleMode(1));
  }

  private drawCursor() {
    if (!this.cursor) return;
    // NDC -> pixels. The canvas fills the window, so the viewport is the
    // whole of it; if that ever stops being true this is the line to fix.
    const w = window.innerWidth,
      h = window.innerHeight;
    ((this.cursor.style.left = `${((this.aim.x + 1) / 2) * w}px`),
      (this.cursor.style.top = `${((1 - this.aim.y) / 2) * h}px`));
  }

  private showCursor() {
    if (!this.cursor) return;
    if (this.cursor.style.display !== "block") {
      ((this.cursor.style.display = "block"), this.drawCursor());
    }
  }

  private cycleTool() {
    const cur = this.host.tool.tool,
      i = cur ? TOOLS.indexOf(cur as any) : -1;
    // pickTool toggles a tool OFF when handed the one already selected, so
    // stepping onto the same index would clear the palette instead of moving
    // through it. Wrapping past the end deselects deliberately, which gives
    // the Y button a way back to no-tool without reaching for B.
    const next = i + 1;
    this.host.hud.pickTool(next >= TOOLS.length ? null : TOOLS[next]);
  }

  private cycleVariant() {
    // The variants row is built by the HUD from the catalogue and its only
    // handler is a click, so clicking the next one is both the simplest
    // route and the one that cannot drift out of step with the HUD's idea
    // of which variant is highlighted.
    const row = document.querySelector("#variants");
    if (!row || (row as HTMLElement).style.display === "none") return;
    const vars = [...row.querySelectorAll<HTMLElement>(".var")];
    if (vars.length < 2) return;
    const at = vars.findIndex((v) => v.classList.contains("on"));
    vars[(at + 1) % vars.length].click();
  }

  private cycleMode(dir: number) {
    const at = MODES.indexOf(this.host.mode() as any),
      next = (at + dir + MODES.length) % MODES.length;
    (this.host.hud.pickMode(MODES[next]),
      // pickMode does not clear the walk keys, and a pad that switched out of
      // WANDER mid-stride would leave them held forever.
      MODES[next] !== "wander" && this.clearWanderKeys());
  }

  // ------------------------------------------------------------ the walker

  /**
   * WANDER, which the brief singles out as the mode that most wants a stick.
   *
   * WanderMode reads a Set of KeyboardEvent codes and its own yaw/pitch, so
   * the pad writes into exactly those. It is not a shortcut: it means the pad
   * and the keyboard drive one walker rather than two that disagree, and
   * holding W while pushing the stick does the sane thing.
   */
  private wander(pad: Gamepad, t: number) {
    const w = this.host.wander,
      lx = axis(pad.axes[0] ?? 0),
      ly = axis(pad.axes[1] ?? 0),
      rx = axis(pad.axes[2] ?? 0),
      ry = axis(pad.axes[3] ?? 0);

    // The walk is on/off per direction in WanderMode, so a stick can only
    // set the four keys. A pad-held key is removed the moment the stick
    // returns to centre, which is why these are unconditional assignments
    // rather than adds — but only for the keys the stick is currently
    // claiming, so a hand on the keyboard is never overridden.
    this.setKey(w, "ArrowUp", ly < -0.01);
    this.setKey(w, "ArrowDown", ly > 0.01);
    this.setKey(w, "ArrowLeft", lx < -0.01);
    this.setKey(w, "ArrowRight", lx > 0.01);
    this.setKey(
      w,
      "ShiftLeft",
      trigger(pad, BTN.L2) > 0.4 || this.held(pad, BTN.L3),
    );

    // Look. The rates are per second and roughly match the mouse at its
    // default sensitivity over a full stick throw; pitch is clamped to the
    // same limits WanderMode enforces on the mouse.
    if (rx) w.yaw -= rx * 2.4 * t;
    if (ry) {
      w.pitch = Math.max(-1.35, Math.min(1.35, w.pitch - ry * 1.8 * t));
    }
  }

  /** Only the pad's own keys are ever removed — see the note in wander(). */
  private padKeys = new Set<string>();
  private setKey(w: GamepadHost["wander"], code: string, on: boolean) {
    if (on) {
      (w.keys.add(code), this.padKeys.add(code));
    } else if (this.padKeys.has(code)) {
      (w.keys.delete(code), this.padKeys.delete(code));
    }
  }

  private clearWanderKeys() {
    for (const c of this.padKeys) this.host.wander.keys.delete(c);
    this.padKeys.clear();
  }
}
