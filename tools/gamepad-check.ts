// Drives the real src/23-gamepad.ts with a synthetic pad and a fake DOM.
//
//   node tools/gamepad-check.ts
//
// Node 24 strips the types itself, so there is nothing to install and no
// test framework in the project to add one to. This exists because the pad
// is the one input in the game that cannot be exercised by hand without the
// hardware plugged in, and because two of these assertions — the zoom
// direction and the wander key handoff — caught real inversions during the
// first pass. Run it after touching 23-gamepad; it exits nonzero on failure.
//
// What it CANNOT tell you is whether the thing feels right: stick rates,
// deadzone and aim speed are numbers only a hand on a real pad can judge.

const listeners: Record<string, Function[]> = {};
let pads: any[] = [];

const el = () => ({
  id: "",
  style: { cssText: "", display: "", left: "", top: "" },
  innerHTML: "",
  classList: { contains: () => false, add() {}, remove() {} },
  click() {},
});

(globalThis as any).window = {
  addEventListener: (k: string, f: Function) => {
    (listeners[k] ??= []).push(f);
  },
  innerWidth: 1000,
  innerHeight: 800,
};
Object.defineProperty(globalThis, "navigator", {
  value: { getGamepads: () => pads },
  configurable: true,
  writable: true,
});
(globalThis as any).document = {
  createElement: el,
  body: { appendChild() {} },
  querySelector: () => null,
};

// Imported after the globals above exist: 23-gamepad's constructor touches
// window and navigator, so a static import at the top would run first and
// throw. Relative to this file, so it works wherever the repo is checked out.
const { GamepadInput } = await import("../src/23-gamepad.ts");

// --- fakes -----------------------------------------------------------------

function makeControls() {
  return {
    _theta: 0,
    _phi: 0,
    _scaleAcc: 1,
    _rotateLeft(a: number) {
      this._theta -= a;
    },
    _rotateUp(a: number) {
      this._phi -= a;
    },
    _dollyIn(s: number) {
      this._scaleAcc *= s;
    },
    _dollyOut(s: number) {
      this._scaleAcc /= s;
    },
    // Mirrors the real _pan closely enough to check direction and clamping.
    // Verified against three r180 in this exact pose: a POSITIVE deltaX moves
    // the target LEFT, and with screenSpacePanning cleared a POSITIVE deltaY
    // moves it FORWARD along the ground. Both are the grab-the-world
    // convention the mouse uses, and both are what the pad has to invert.
    // The fake camera looks down -Z, so "forward" is -Z and "right" is +X.
    screenSpacePanning: true,
    target: { x: 0, y: 0, z: 0 },
    // The camera the pad yaws around. Sat back down +z looking toward the
    // origin, so "forward" is -z and "right" is +x.
    object: { position: { x: 0, y: 90, z: 200 } },
    /** Records whether the pad cleared screenSpacePanning for its call. */
    _sspDuringPan: null as boolean | null,
    _pan(dx: number, dy: number) {
      this._sspDuringPan = this.screenSpacePanning;
      // Pan moves the eye and the look-at point together — that rigidity is
      // what the bootstrap's CAM_LIMIT clamp relies on, so model both.
      ((this.target.x -= dx), (this.target.z -= dy));
      ((this.object.position.x -= dx), (this.object.position.z -= dy));
      camLimit(this);
    },
  };
}

/**
 * What 17-bootstrap does after every OrbitControls.update(): hold the EYE
 * inside CAM_LIMIT and carry the target by the same delta.
 */
const CAM_LIMIT = 560;
function camLimit(c: any) {
  const p = c.object.position,
    r = Math.hypot(p.x, p.z);
  if (r <= CAM_LIMIT) return;
  const k = CAM_LIMIT / r,
    dx = p.x * k - p.x,
    dz = p.z * k - p.z;
  ((p.x += dx), (p.z += dz), (c.target.x += dx), (c.target.z += dz));
}

function makeHost() {
  const controls = makeControls();
  const calls: string[] = [];

  return {
    calls,
    controls,

    host: {
      controls: controls as any,

      tool: {
        tool: null as string | null,
        variant: "",
        hover(p: any) {
          calls.push(`hover:${p.x.toFixed(2)},${p.y.toFixed(2)}`);
        },
        click(p: any) {
          calls.push(`click:${p.x.toFixed(2)},${p.y.toFixed(2)}`);
        },
      },
      hud: {
        pickTool(t: string | null) {
          calls.push(`pickTool:${t}`);
        },
        pickMode(m: string) {
          calls.push(`pickMode:${m}`);
        },
      },
      wander: { active: false, keys: new Set<string>(), yaw: 0, pitch: 0 },
      mode: () => "build",
      chronicleActive: () => false,
      closeChronicle() {
        calls.push("closeChronicle");
      },
    },
  };
}

/** A standard-mapping pad with all inputs at rest. */
function pad(over: any = {}) {
  return {
    axes: [0, 0, 0, 0],
    buttons: Array.from({ length: 17 }, () => ({ pressed: false, value: 0 })),
    ...over,
  };
}

let fails = 0;
function check(name: string, ok: boolean, detail = "") {
  ok || fails++;
  console.log(
    `${ok ? "  ok  " : "FAIL  "}${name}${detail ? " — " + detail : ""}`,
  );
}

// --- 1. dormant with no pad -------------------------------------------------

{
  pads = [];
  const { host, controls, calls } = makeHost();
  const g = new GamepadInput(host as any);
  check("starts dormant with no pad", g.present === false);
  // even a pad reporting full stick deflection must be ignored while dormant
  pads = [pad({ axes: [1, 1, 1, 1] })];
  for (let i = 0; i < 10; i++) g.update(1 / 60);
  check(
    "dormant ignores a pad that never fired gamepadconnected",
    controls._theta === 0 && calls.length === 0,
    `theta=${controls._theta} calls=${calls.length}`,
  );
}

// --- 2. wakes on gamepadconnected ------------------------------------------

const wake = () => listeners["gamepadconnected"]?.forEach((f) => f());

/** Wake a fresh pad holding `axes` and run it for `frames` frames. */
const drive = (axes: number[], frames = 60, tool: string | null = null) => {
  pads = [];
  const h = makeHost();
  const g = new GamepadInput(h.host as any);
  h.host.tool.tool = tool;
  pads = [pad({ axes })];
  wake();
  for (let i = 0; i < frames; i++) g.update(1 / 60);
  return h;
};

{
  pads = [];
  const { host, controls } = makeHost();
  const g = new GamepadInput(host as any);
  pads = [pad({ axes: [1, 0, 0, 0] })];
  wake();
  check("wakes on gamepadconnected", g.present === true);
  g.update(1 / 60);
  check(
    "left stick turns the view",
    controls.target.x !== 0 || controls.target.z !== 200,
    `target x=${controls.target.x.toFixed(2)} z=${controls.target.z.toFixed(2)}`,
  );
}

// --- 2b. the left stick yaws about the CAMERA, not about the target --------

{
  // the eye must not budge, however far you turn
  const { controls } = drive([1, 0, 0, 0], 600);
  const p = controls.object.position;
  check(
    "yawing on the spot never moves the eye",
    Math.hypot(p.x - 0, p.z - 200) < 1e-9,
    `camera x=${p.x.toFixed(6)} z=${p.z.toFixed(6)} (started 0, 200)`,
  );
}

{
  // and the thing it looks at must swing round the eye at constant distance
  const h0 = makeHost();
  const r0 = Math.hypot(
    h0.controls.target.x - h0.controls.object.position.x,
    h0.controls.target.z - h0.controls.object.position.z,
  );
  const { controls } = drive([1, 0, 0, 0], 600);
  const r1 = Math.hypot(
    controls.target.x - controls.object.position.x,
    controls.target.z - controls.object.position.z,
  );
  check(
    "the look-at point orbits the eye at a fixed distance",
    Math.abs(r1 - r0) < 1e-9,
    `${r0.toFixed(4)} -> ${r1.toFixed(4)}`,
  );
}

{
  // a full turn has to come back to where it started, or the yaw is lossy
  const perFrame = 2.2 / 60;
  const frames = Math.round((2 * Math.PI) / perFrame);
  const { controls } = drive([1, 0, 0, 0], frames);
  // The whole-frame count cannot land exactly on 2pi, so the residual is the
  // leftover fraction of one frame's turn swept at radius 200 — a couple of
  // units. Anything much larger would mean the yaw is losing angle each step.
  const slack = 200 * perFrame;
  check(
    "a full revolution returns the view to its heading",
    Math.hypot(controls.target.x, controls.target.z) < slack,
    `off by ${Math.hypot(controls.target.x, controls.target.z).toFixed(2)}, one frame sweeps ${slack.toFixed(2)}`,
  );
}

{
  // pitch is deliberately still a target-pivot orbit, so it must still be
  // going through the controls rather than through the new yaw
  const { controls } = drive([0, 1, 0, 0]);
  check(
    "up and down still pitch about the target",
    controls._phi !== 0 && controls.target.x === 0,
    `phi=${controls._phi.toFixed(4)}`,
  );
}

// --- 3. zoom direction — the bug that was nearly shipped --------------------

{
  pads = [];
  const { host, controls } = makeHost();
  const g = new GamepadInput(host as any);
  const rt = pad();
  rt.buttons[7] = { pressed: true, value: 1 }; // R2
  pads = [rt];
  wake();
  for (let i = 0; i < 60; i++) g.update(1 / 60);
  // _dollyIn must SHRINK the accumulated radius scale: OrbitControls does
  // radius *= _scale, so zooming in means a scale below 1.
  check(
    "R2 zooms IN (radius scale < 1)",
    controls._scaleAcc < 1,
    `scale=${controls._scaleAcc.toFixed(3)}`,
  );
}

{
  pads = [];
  const { host, controls } = makeHost();
  const g = new GamepadInput(host as any);
  const lt = pad();
  lt.buttons[6] = { pressed: true, value: 1 }; // L2
  pads = [lt];
  wake();
  for (let i = 0; i < 60; i++) g.update(1 / 60);
  check(
    "L2 zooms OUT (radius scale > 1)",
    controls._scaleAcc > 1,
    `scale=${controls._scaleAcc.toFixed(3)}`,
  );
}

// --- 3b. right stick walks the camera: strafe, forward/back, and the clamp --

{
  const { controls } = drive([0, 0, 1, 0]); // right stick pushed right
  check(
    "right stick right strafes the view RIGHT (+x)",
    controls.target.x > 0 && controls.object.position.x > 0,
    `target x=${controls.target.x.toFixed(1)} camera x=${controls.object.position.x.toFixed(1)}`,
  );
}

{
  const { controls } = drive([0, 0, -1, 0]);
  check(
    "right stick left strafes the view LEFT (-x)",
    controls.target.x < 0,
    `target x=${controls.target.x.toFixed(1)}`,
  );
}

{
  // the whole point of the change: forward must MOVE the camera over the
  // ground, not shorten the orbit radius
  const { controls } = drive([0, 0, 0, -1]); // stick pushed forward
  check(
    "right stick forward MOVES forward (-z), and does not zoom",
    controls.target.z < 0 && controls._scaleAcc === 1,
    `target z=${controls.target.z.toFixed(1)} zoomScale=${controls._scaleAcc}`,
  );
}

{
  const { controls } = drive([0, 0, 0, 1]);
  check(
    "right stick back MOVES back (+z)",
    controls.target.z > 0,
    `target z=${controls.target.z.toFixed(1)}`,
  );
}

{
  // screen-space panning would lift the target into the air on a pitched
  // camera instead of sliding it along the ground
  const { controls } = drive([0, 0, 0, -1], 3);
  check(
    "the forward pan is taken along the GROUND, not screen-up",
    controls._sspDuringPan === false,
    `screenSpacePanning during _pan = ${controls._sspDuringPan}`,
  );
  check(
    "screenSpacePanning is restored afterwards, for the mouse",
    controls.screenSpacePanning === true,
    `left as ${controls.screenSpacePanning}`,
  );
}

{
  // shove in one direction far longer than it takes to leave the map, then
  // diagonally, since the limit is a radius and not a box. The bound is on
  // the EYE now, not the look-at point — you may look anywhere, you may not
  // travel off the map.
  const eyeR = (c: any) => Math.hypot(c.object.position.x, c.object.position.z);

  const { controls } = drive([0, 0, 1, 0], 2400);
  check(
    "panning cannot carry the eye off the playable terrain",
    eyeR(controls) <= CAM_LIMIT + 1e-6,
    `camera radius=${eyeR(controls).toFixed(1)} (limit ${CAM_LIMIT})`,
  );
  const d = drive([0, 0, 0.9, -0.9], 2400).controls;
  check(
    "the limit holds on a diagonal too, not just on an axis",
    eyeR(d) <= CAM_LIMIT + 1e-6,
    `camera radius=${eyeR(d).toFixed(1)}`,
  );
}

{
  // the reason the bound moved: turning on the spot sweeps the look-at point
  // far outside any sane cap, so a cap on the TARGET would have fired
  // mid-turn and dragged the eye with it
  const { controls } = drive([1, 0, 0, 0], 600);
  const far = Math.hypot(controls.target.x, controls.target.z);
  check(
    "turning is never bounded — the look-at point may leave the map",
    far > CAM_LIMIT * 0.3,
    `look-at reached radius ${far.toFixed(1)} while the eye stayed put`,
  );
}

{
  // and once pinned at the limit you must still be able to come back
  const h = drive([0, 0, 1, 0], 2400);
  const g2 = new GamepadInput(h.host as any);
  pads = [pad({ axes: [0, 0, -1, 0] })];
  wake();
  const before = h.controls.target.x;
  for (let i = 0; i < 60; i++) g2.update(1 / 60);
  check(
    "the limit is a wall, not a trap — inward panning still works",
    h.controls.target.x < before - 1,
    `x went ${before.toFixed(1)} -> ${h.controls.target.x.toFixed(1)}`,
  );
}

{
  // once a tool is up the right stick belongs to the crosshair, so panning
  // must stop dead — otherwise aiming would drag the whole city along
  const { controls } = drive([0, 0, 1, 0], 60, "anchor");
  check(
    "a selected tool takes the right stick back from the pan",
    controls.target.x === 0 && controls.target.z === 0,
    `target x=${controls.target.x} z=${controls.target.z}`,
  );
}

// --- 4. aim point: only with a tool, clamped, and A clicks it ---------------

{
  pads = [];
  const { host, calls } = makeHost();
  const g = new GamepadInput(host as any);
  pads = [pad({ axes: [0, 0, 1, 0] })];
  wake();
  g.update(1 / 60);
  check(
    "no hover while no tool is selected",
    !calls.some((c) => c.startsWith("hover")),
  );

  host.tool.tool = "anchor";
  for (let i = 0; i < 600; i++) g.update(1 / 60); // shove right for 10s
  const last = calls.filter((c) => c.startsWith("hover")).pop()!;
  const x = parseFloat(last.split(":")[1].split(",")[0]);
  check("aim clamps inside the viewport", x <= 0.98 && x > 0.9, `x=${x}`);
}

{
  pads = [];
  const { host, calls } = makeHost();
  const g = new GamepadInput(host as any);
  host.tool.tool = "anchor";
  const a = pad();
  a.buttons[0] = { pressed: true, value: 1 };
  pads = [a];
  wake();
  g.update(1 / 60);
  g.update(1 / 60);
  g.update(1 / 60);
  const clicks = calls.filter((c) => c.startsWith("click"));
  check(
    "A commits exactly once per press, not once per frame",
    clicks.length === 1,
    `${clicks.length} clicks`,
  );
}

// --- 5. wander: stick writes the walk keys, and releases only its own -------

{
  pads = [];
  const { host } = makeHost();
  const g = new GamepadInput(host as any);
  host.wander.active = true;
  pads = [pad({ axes: [0, -1, 0, 0] })]; // stick forward
  wake();
  g.update(1 / 60);
  check("stick forward walks", host.wander.keys.has("ArrowUp"));

  // a hand on the keyboard at the same time must survive the stick centring
  host.wander.keys.add("KeyW");
  pads = [pad()];
  g.update(1 / 60);
  check(
    "centring releases the pad's key but not the keyboard's",
    !host.wander.keys.has("ArrowUp") && host.wander.keys.has("KeyW"),
    [...host.wander.keys].join(","),
  );
}

{
  pads = [];
  const { host } = makeHost();
  const g = new GamepadInput(host as any);
  host.wander.active = true;
  pads = [pad({ axes: [0, 0, 1, 0] })];
  wake();
  const before = host.wander.yaw;
  g.update(1 / 60);
  check("right stick looks", host.wander.yaw !== before);
}

// --- 6. B backs out ---------------------------------------------------------

{
  pads = [];
  const { host, calls } = makeHost();
  const g = new GamepadInput(host as any);
  host.tool.tool = "span";
  const b = pad();
  b.buttons[1] = { pressed: true, value: 1 };
  pads = [b];
  wake();
  g.update(1 / 60);
  check("B clears the tool", calls.includes("pickTool:null"));
}

console.log(fails ? `\n${fails} FAILED` : "\nall passed");
process.exit(fails ? 1 : 0);
