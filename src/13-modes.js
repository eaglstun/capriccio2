// SECTION (cut plane) and WANDER (first-person) modes
//
// Extracted verbatim from public/assets/index-DCXbw2vV.js,
// lines 29574–29709.
// Identifiers are minifier-mangled; nothing here has been renamed.
// Regenerate with: python3 tools/split_bundle.py --write

class J_ {
  constructor(t, e) {
    K(this, "world");
    K(this, "renderer");
    K(this, "plane", new Fn(new P(-1, 0, 0), 0));
    K(this, "active", !1);
    K(this, "axis", "x");
    K(this, "offset", 0);
    K(this, "flip", 1);
    ((this.world = t), (this.renderer = e));
  }
  set(t) {
    ((this.active = t), (Ge.uCutting.value = t ? 1 : 0), this.apply());
  }
  setAxis(t) {
    ((this.axis = t), this.apply());
  }
  setOffset(t) {
    ((this.offset = t), this.apply());
  }
  setFlip(t) {
    ((this.flip = t), this.apply());
  }
  apply() {
    if (!this.active) {
      this.renderer.clippingPlanes = [];
      return;
    }
    const t =
      this.axis === "x" ? new P(-this.flip, 0, 0) : new P(0, 0, -this.flip);
    (this.plane.set(t, this.flip * this.offset),
      (this.renderer.clippingPlanes = [this.plane]));
  }
}
class Q_ {
  constructor(t, e, n) {
    K(this, "world");
    K(this, "camera");
    K(this, "dom");
    K(this, "active", !1);
    K(this, "vel", new P());
    K(this, "pos", new P());
    K(this, "yaw", 0);
    K(this, "pitch", 0);
    K(this, "keys", new Set());
    K(this, "grounded", !1);
    K(this, "onExit", null);
    K(this, "ray", new vh());
    K(this, "boundMove");
    K(this, "boundKey");
    K(this, "boundKeyUp");
    K(this, "boundLockChange");
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
  exit() {
    ((this.active = !1),
      document.removeEventListener("mousemove", this.boundMove),
      document.removeEventListener("keydown", this.boundKey),
      document.removeEventListener("keyup", this.boundKeyUp),
      document.removeEventListener("pointerlockchange", this.boundLockChange),
      document.pointerLockElement && document.exitPointerLock(),
      this.onExit?.());
  }
  onMouse(t) {
    this.active &&
      ((this.yaw -= t.movementX * 0.0021),
      (this.pitch -= t.movementY * 0.0019),
      (this.pitch = Math.max(-1.35, Math.min(1.35, this.pitch))));
  }
  groundAt(t, e, n) {
    (this.ray.set(new P(t, n + 1.4, e), new P(0, -1, 0)), (this.ray.far = 60));
    const s = this.ray.intersectObjects(this.world.raycastTargets(), !1);
    return s.length ? s[0].point.y : -999;
  }
  update(t) {
    if (!this.active) return;
    const e =
        this.keys.has("ShiftLeft") || this.keys.has("ShiftRight") ? 7.2 : 3.4,
      n = new P(Math.sin(this.yaw), 0, Math.cos(this.yaw)).multiplyScalar(-1),
      s = new P(-n.z, 0, n.x),
      r = new P();
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
    const m = new P(
      this.pos.x - Math.sin(this.yaw) * Math.cos(this.pitch),
      this.pos.y + Math.sin(this.pitch),
      this.pos.z - Math.cos(this.yaw) * Math.cos(this.pitch),
    );
    this.camera.lookAt(m);
  }
}
const Ph = { "3:2": 3 / 2, "4:5": 4 / 5, "21:9": 21 / 9 };
