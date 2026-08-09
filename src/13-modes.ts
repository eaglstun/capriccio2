// SECTION (cut plane) and WANDER (first-person) modes
//
// Extracted from legacy/assets/index-DCXbw2vV.js, bundle lines
// 29574–29709. Statements are verbatim; identifiers are
// renamed via src/renames.json. Imports and exports are generated.
// Regenerate: python3 tools/split_bundle.py --write

// --- generated imports ---
import {
  PerspectiveCamera,
  Plane,
  Raycaster,
  Vector3,
  WebGLRenderer,
} from "three";
import { engravingUniforms } from "./00-shaders";
// --- end generated imports ---

/**
 * SECTION mode: a movable cut plane through the city, rendered as an
 * architectural section.
 *
 * Sets `uCutting` on the materials, which switches the shader to fill the
 * interior of cut solids with dark diagonal hatching — POCHE, the drafting
 * convention for solid matter a section passes through.
 */
class SectionMode {
  world: any;
  renderer: WebGLRenderer;
  plane = new Plane(new Vector3(-1, 0, 0), 0);
  active = !1;
  axis: "x" | "z" = "x";
  offset = 0;
  flip = 1;

  constructor(t: any, e: WebGLRenderer) {
    ((this.world = t), (this.renderer = e));
  }
  /** Enable or disable the cut. */
  set(t) {
    ((this.active = t),
      (engravingUniforms.uCutting.value = t ? 1 : 0),
      this.apply());
  }
  /** Cut along x or z. */
  setAxis(t) {
    ((this.axis = t), this.apply());
  }
  /** Slide the plane along its axis. */
  setOffset(t) {
    ((this.offset = t), this.apply());
  }
  setFlip(t) {
    ((this.flip = t), this.apply());
  }
  /** Push plane, axis, offset and flip into the renderer's clipping state. */
  apply() {
    if (!this.active) {
      this.renderer.clippingPlanes = [];
      return;
    }
    const t =
      this.axis === "x"
        ? new Vector3(-this.flip, 0, 0)
        : new Vector3(0, 0, -this.flip);
    (this.plane.set(t, this.flip * this.offset),
      (this.renderer.clippingPlanes = [this.plane]));
  }
}
/**
 * WANDER mode: drop to street level and walk the city in first person.
 *
 * Pointer-lock mouselook with WASD movement, the camera held at eye height
 * above the terrain. The one mode where the engraving is seen from inside
 * rather than above.
 */
class WanderMode {
  world: any;
  camera: PerspectiveCamera;
  dom: HTMLElement;
  active = !1;
  vel = new Vector3();
  pos = new Vector3();
  yaw = 0;
  pitch = 0;
  /** Held key codes, e.g. "KeyW". */
  keys = new Set<string>();
  grounded = !1;
  onExit: (() => void) | null = null;
  ray = new Raycaster();
  // scratch vectors — update() and groundAt() run every frame and used to
  // allocate six Vector3s a frame between them, which is GC pressure you feel
  // as hitching in first person even though the arithmetic is trivial
  scOrigin = new Vector3();
  scDown = new Vector3(0, -1, 0);
  scFwd = new Vector3();
  scRight = new Vector3();
  scMove = new Vector3();
  scLook = new Vector3();
  // listeners kept as bound fields so enter()/exit() can remove the same
  // references they added
  boundMove: (e: MouseEvent) => void;
  boundKey: (e: KeyboardEvent) => void;
  boundKeyUp: (e: KeyboardEvent) => void;
  boundLockChange: () => void;

  constructor(t: any, e: PerspectiveCamera, n: HTMLElement) {
    ((this.world = t),
      (this.camera = e),
      (this.dom = n),
      (this.boundMove = (s) => this.onMouse(s)),
      (this.boundKey = (s) => {
        (this.keys.add(s.code), s.code === "Space" && s.preventDefault());
      }),
      (this.boundKeyUp = (s) => this.keys.delete(s.code)),
      (this.boundLockChange = () => {
        document.pointerLockElement !== this.dom && this.active && this.exit();
      }));
  }
  /** Enter at position `t`, requesting pointer lock. */
  enter(t, e = 0) {
    ((this.active = !0),
      this.pos.copy(t),
      (this.pos.y += 1.7),
      (this.yaw = e),
      (this.pitch = 0),
      this.vel.set(0, 0, 0),
      document.addEventListener("mousemove", this.boundMove),
      document.addEventListener("keydown", this.boundKey),
      document.addEventListener("keyup", this.boundKeyUp),
      document.addEventListener("pointerlockchange", this.boundLockChange),
      this.dom.requestPointerLock());
  }
  /** Leave and hand the camera back to the orbit controls. */
  exit() {
    ((this.active = !1),
      document.removeEventListener("mousemove", this.boundMove),
      document.removeEventListener("keydown", this.boundKey),
      document.removeEventListener("keyup", this.boundKeyUp),
      document.removeEventListener("pointerlockchange", this.boundLockChange),
      document.pointerLockElement && document.exitPointerLock(),
      this.onExit?.());
  }
  /** Mouselook. Pitch is clamped so the view cannot roll over the top. */
  onMouse(t) {
    this.active &&
      ((this.yaw -= t.movementX * 0.0021),
      (this.pitch -= t.movementY * 0.0019),
      (this.pitch = Math.max(-1.35, Math.min(1.35, this.pitch))));
  }
  /**
   * Terrain height under a point, used to keep the walker on the ground.
   *
   * The ray is always straight down, so it only needs the meshes whose world
   * bounding box spans (t, e) — see World.raycastTargetsUnder. That is an
   * exact filter for a vertical ray, and it is the difference between testing
   * three structures and testing the whole city three times a frame.
   */
  groundAt(t, e, n) {
    (this.scOrigin.set(t, n + 1.4, e),
      this.ray.set(this.scOrigin, this.scDown),
      (this.ray.far = 60));
    const s = this.ray.intersectObjects(
      this.world.raycastTargetsUnder(t, e),
      !1,
    );
    return s.length ? s[0].point.y : -999;
  }
  /** Per-frame walk: apply WASD to velocity, damp it, and follow the ground. */
  update(t) {
    if (!this.active) return;
    const e =
        this.keys.has("ShiftLeft") || this.keys.has("ShiftRight") ? 7.2 : 3.4,
      n = this.scFwd
        .set(Math.sin(this.yaw), 0, Math.cos(this.yaw))
        .multiplyScalar(-1),
      s = this.scRight.set(-n.z, 0, n.x),
      r = this.scMove.set(0, 0, 0);
    ((this.keys.has("KeyW") || this.keys.has("ArrowUp")) && r.add(n),
      (this.keys.has("KeyS") || this.keys.has("ArrowDown")) && r.sub(n),
      (this.keys.has("KeyD") || this.keys.has("ArrowRight")) && r.add(s),
      (this.keys.has("KeyA") || this.keys.has("ArrowLeft")) && r.sub(s));
    const moving = r.lengthSq() > 0;
    moving && r.normalize().multiplyScalar(e);
    const o = this.pos.y - 1.7,
      a = this.pos.x + r.x * t,
      c = this.pos.z + r.z * t,
      l = this.groundAt(this.pos.x, this.pos.z, o + 0.6),
      // standing still means (a, c) IS (pos.x, pos.z) and the query is the
      // same ray from the same origin — reuse it rather than cast it twice
      h = moving ? this.groundAt(a, c, o + 0.6) : l,
      u = h - o;
    h > -900 && u < 0.55
      ? ((this.pos.x = a), (this.pos.z = c))
      : h > -900 &&
        u < 1.1 &&
        ((this.pos.x = this.pos.x + r.x * t * 0.4),
        (this.pos.z = this.pos.z + r.z * t * 0.4));
    const d = this.groundAt(this.pos.x, this.pos.z, o + 0.7),
      f = (d > -900 ? d : l > -900 ? l : o) + 1.7;
    (f < this.pos.y - 0.02
      ? (this.pos.y = Math.max(f, this.pos.y - 9.8 * t * 1.6))
      : (this.pos.y += (f - this.pos.y) * Math.min(1, t * 14)),
      this.camera.position.copy(this.pos));
    const m = this.scLook.set(
      this.pos.x - Math.sin(this.yaw) * Math.cos(this.pitch),
      this.pos.y + Math.sin(this.pitch),
      this.pos.z - Math.cos(this.yaw) * Math.cos(this.pitch),
    );
    this.camera.lookAt(m);
  }
}
const Ph = { "3:2": 3 / 2, "4:5": 4 / 5, "21:9": 21 / 9 };

// --- generated exports ---
export { Ph, SectionMode, WanderMode };
