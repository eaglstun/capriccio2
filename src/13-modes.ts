// SECTION (cut plane) and WANDER (first-person) modes
//
// Extracted from public/assets/index-DCXbw2vV.js, bundle lines
// 29574–29709. Statements are verbatim; identifiers are
// renamed via src/renames.json. Imports and exports are generated.
// Regenerate: python3 tools/split_bundle.py --write

// --- generated imports ---
import { Plane, Raycaster, Vector3 } from "three";
import { engravingUniforms } from "./00-shaders";
import { defineField } from "./_runtime";
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
  constructor(t, e) {
    defineField(this, "world");
    defineField(this, "renderer");
    defineField(this, "plane", new Plane(new Vector3(-1, 0, 0), 0));
    defineField(this, "active", !1);
    defineField(this, "axis", "x");
    defineField(this, "offset", 0);
    defineField(this, "flip", 1);
    ((this.world = t), (this.renderer = e));
  }
  /** Enable or disable the cut. */
  set(t) {
    ((this.active = t), (engravingUniforms.uCutting.value = t ? 1 : 0), this.apply());
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
      this.axis === "x" ? new Vector3(-this.flip, 0, 0) : new Vector3(0, 0, -this.flip);
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
  constructor(t, e, n) {
    defineField(this, "world");
    defineField(this, "camera");
    defineField(this, "dom");
    defineField(this, "active", !1);
    defineField(this, "vel", new Vector3());
    defineField(this, "pos", new Vector3());
    defineField(this, "yaw", 0);
    defineField(this, "pitch", 0);
    defineField(this, "keys", new Set());
    defineField(this, "grounded", !1);
    defineField(this, "onExit", null);
    defineField(this, "ray", new Raycaster());
    defineField(this, "boundMove");
    defineField(this, "boundKey");
    defineField(this, "boundKeyUp");
    defineField(this, "boundLockChange");
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
  /** Terrain height under a point, used to keep the walker on the ground. */
  groundAt(t, e, n) {
    (this.ray.set(new Vector3(t, n + 1.4, e), new Vector3(0, -1, 0)), (this.ray.far = 60));
    const s = this.ray.intersectObjects(this.world.raycastTargets(), !1);
    return s.length ? s[0].point.y : -999;
  }
  /** Per-frame walk: apply WASD to velocity, damp it, and follow the ground. */
  update(t) {
    if (!this.active) return;
    const e =
        this.keys.has("ShiftLeft") || this.keys.has("ShiftRight") ? 7.2 : 3.4,
      n = new Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw)).multiplyScalar(-1),
      s = new Vector3(-n.z, 0, n.x),
      r = new Vector3();
    ((this.keys.has("KeyW") || this.keys.has("ArrowUp")) && r.add(n),
      (this.keys.has("KeyS") || this.keys.has("ArrowDown")) && r.sub(n),
      (this.keys.has("KeyD") || this.keys.has("ArrowRight")) && r.add(s),
      (this.keys.has("KeyA") || this.keys.has("ArrowLeft")) && r.sub(s),
      r.lengthSq() > 0 && r.normalize().multiplyScalar(e));
    const o = this.pos.y - 1.7,
      a = this.pos.x + r.x * t,
      c = this.pos.z + r.z * t,
      l = this.groundAt(this.pos.x, this.pos.z, o + 0.6),
      h = this.groundAt(a, c, o + 0.6),
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
    const m = new Vector3(
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
