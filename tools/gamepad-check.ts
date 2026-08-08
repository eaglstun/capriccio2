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
  };
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

{
  pads = [];
  const { host, controls } = makeHost();
  const g = new GamepadInput(host as any);
  pads = [pad({ axes: [1, 0, 0, 0] })];
  wake();
  check("wakes on gamepadconnected", g.present === true);
  g.update(1 / 60);
  check(
    "left stick orbits",
    controls._theta !== 0,
    `theta=${controls._theta.toFixed(4)}`,
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
