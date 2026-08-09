// Ember particles for the brazier — three-nebula, and RENDER-ONLY.
//
// Written from scratch for B3 (briefs/FABLE-BRIEF-10.md); never in the bundle.
//
// The save is an action log and replay must be deterministic, so nothing in
// this file may touch world state: not pockets, not nav, not infill, not the
// action log, not a stat meter. It READS the world's action list to find
// braziers and it writes pixels. That is the whole contract, and it is why
// the particles are allowed Math.random (via nebula's Span): they are not
// persisted state, any more than the neon flicker is.
//
// Budget rules, per the brief:
// - ONE system with a fixed particle cap, not one system per brazier
// - a small pool of emitters assigned to the nearest on-screen braziers,
//   re-assigned on a slow scan rather than per frame
// - the emission rate follows the night: embers you cannot see still cost,
//   so daylight runs at a trickle
//
// No shipped binary assets: every nebula example loads a sprite PNG, and this
// one instead paints the ember dot onto a runtime canvas and hands the
// GPURenderer a CanvasTexture — the same move as the billboard atlas at the
// end of C_ in 05-world.ts. GPURenderer batches all particles into a single
// THREE.Points, so the whole system costs one draw call.

import {
  AdditiveBlending,
  BufferGeometry,
  Camera,
  CanvasTexture,
  Color as ThreeColor,
  DataTexture,
  FloatType,
  Frustum,
  Group,
  InterleavedBuffer,
  InterleavedBufferAttribute,
  Matrix4,
  Points,
  RGBAFormat,
  Scene,
  ShaderMaterial,
  Sphere,
  Sprite,
  SpriteMaterial,
  Vector2,
  Vector3,
} from "three";
import System, {
  Alpha,
  Body,
  Color,
  Emitter,
  Force,
  GPURenderer,
  Life,
  Position,
  RadialVelocity,
  RandomDrift,
  Radius,
  Rate,
  Scale,
  Span,
  SphereZone,
  Vector3D,
} from "three-nebula";
import { lerp } from "./01-materials";
import { BRAZIER_MOUTH_Y } from "./26-brazier";

// three-nebula takes "THREE" as a constructor argument and only ever
// destructures classes off it. Handing it the real `import * as THREE`
// namespace defeats tree-shaking for ALL of three.js (+278 kB measured), so
// this shim carries exactly the classes nebula's GPURenderer path constructs.
// The list came from grepping the nebula dist for `new X.ClassName`.
const NEBULA_THREE = {
  BufferGeometry,
  CanvasTexture,
  Color: ThreeColor,
  DataTexture,
  FloatType,
  InterleavedBuffer,
  InterleavedBufferAttribute,
  Points,
  RGBAFormat,
  ShaderMaterial,
  Sprite,
  SpriteMaterial,
  Vector2,
  Vector3,
};

/** How many braziers can spark at once. The rest wait their turn. */
const EMITTER_POOL = 8;
/** Hard cap on live particles across every emitter. */
const MAX_PARTICLES = 320;
/** Braziers farther than this from the camera do not spark at all. */
const RANGE = 85;
/** Seconds between brazier scans. Assignment, not emission, runs this slow. */
const SCAN_EVERY = 0.4;

/** The ember dot: white-hot centre falling off to nothing, on a canvas. */
function emberSpriteBody() {
  const cv = document.createElement("canvas");
  cv.width = cv.height = 64;
  const g = cv.getContext("2d");
  const rg = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  (rg.addColorStop(0, "rgba(255,255,255,1)"),
    rg.addColorStop(0.22, "rgba(255,224,150,0.95)"),
    rg.addColorStop(0.55, "rgba(255,128,44,0.4)"),
    rg.addColorStop(1, "rgba(255,60,10,0)"));
  ((g.fillStyle = rg), g.fillRect(0, 0, 64, 64));
  const tex = new CanvasTexture(cv);
  return new Sprite(
    new SpriteMaterial({
      map: tex,
      transparent: !0,
      depthWrite: !1,
      blending: AdditiveBlending,
    }),
  );
}

class EmberSystem {
  system: any;
  emitters: any[] = [];
  group: Group;
  scanIn = 0;
  // scratch objects so the scan allocates nothing per call
  private frustum = new Frustum();
  private mat4 = new Matrix4();
  private sphere = new Sphere(new Vector3(), 2.5);

  constructor(scene: Scene) {
    ((this.group = new Group()), scene.add(this.group));
    this.system = new System();
    this.system.addRenderer(
      new GPURenderer(this.group, NEBULA_THREE, {
        maxParticles: MAX_PARTICLES,
      }),
    );
    const body = emberSpriteBody();
    for (let k = 0; k < EMITTER_POOL; k++) {
      const em = new Emitter();
      (em
        .setRate(new Rate(new Span(1, 2), new Span(0.8, 1.4)))
        .addInitializers([
          // born across the coal bed, not at a single point
          new Position(new SphereZone(0, 0, 0, 0.22)),
          // sparks, not a flame: small enough to stay discrete points, big
          // enough that the 1-bit dither in the post pass cannot eat them.
          // Calibrated by eye against the shader's size*600/depth: 0.4–0.9
          // reads as a drifting mote from five metres. 0.05 vanished
          // entirely; 2.0 fused into a torch blob
          new Radius(0.4, 0.9),
          new Life(0.7, 1.8),
          new Body(body),
          // up and slightly outward, the way heat carries sparks
          new RadialVelocity(1.3, new Vector3D(0, 1, 0), 22),
        ])
        .addBehaviours([
          new Alpha(1, 0),
          new Scale(1, 0.22),
          new Color("#fff3c8", "#ff5a1a"),
          // buoyancy: an upward force, embers accelerate away from the fire.
          // nebula multiplies Force and RandomDrift by 100 internally
          // (normalizeForce), so 0.004 here is 0.4 units/s^2 in the world —
          // the first draft used 0.4 and the sparks left for orbit
          new Force(0, 0.004, 0),
          new RandomDrift(0.005, 0.001, 0.005, 0.5),
        ])
        .emit(),
        this.system.addEmitter(em),
        this.emitters.push(em));
      // parked until the scan hands it a brazier
      em.rate.numPan.a = em.rate.numPan.b = 0;
    }
  }

  /**
   * Per frame. `world` is read for its action list only; `night` is the
   * uNight uniform (0 day → 1 full dark) and drives the emission rate.
   */
  update(dt: number, world: any, camera: Camera, night: number) {
    if ((this.scanIn -= dt) <= 0) {
      this.scanIn = SCAN_EVERY;
      this.assign(world, camera, night);
    }
    this.system.update(Math.min(dt, 0.05));
  }

  /** Hand the emitter pool to the nearest braziers the camera can see. */
  private assign(world: any, camera: Camera, night: number) {
    const near: [number, any][] = [];
    for (const a of world.actions)
      if (a.t === "emb" && a.kind === "brazier") {
        const d = Math.hypot(a.x - camera.position.x, a.z - camera.position.z);
        d < RANGE && near.push([d, a]);
      }
    near.sort((p, q) => p[0] - q[0]);
    this.frustum.setFromProjectionMatrix(
      this.mat4.multiplyMatrices(
        camera.projectionMatrix,
        camera.matrixWorldInverse,
      ),
    );
    // embers only really read after dusk; daylight keeps a token spark
    const t0 = lerp(1.6, 0.13, night),
      t1 = lerp(2.6, 0.24, night);
    let k = 0;
    for (const [, a] of near) {
      if (k >= this.emitters.length) break;
      this.sphere.center.set(a.x, (a.y ?? 0) + 1.4, a.z);
      if (!this.frustum.intersectsSphere(this.sphere)) continue;
      const em = this.emitters[k++];
      ((em.position.x = a.x),
        // just above the heaped coals. Derived from the drum's own measured
        // rim rather than typed in, so a re-bake of 26-brazier that changes
        // the mouth height carries the sparks with it instead of leaving them
        // hanging in the air above a shorter brazier.
        (em.position.y = (a.y ?? 0) + BRAZIER_MOUTH_Y + 0.13),
        (em.position.z = a.z),
        (em.rate.numPan.a = 1),
        (em.rate.numPan.b = 2),
        (em.rate.timePan.a = t0),
        (em.rate.timePan.b = t1));
    }
    for (; k < this.emitters.length; k++) {
      const em = this.emitters[k];
      em.rate.numPan.a = em.rate.numPan.b = 0;
    }
  }

  /** Live particle count — for the console, not the game. */
  count() {
    return this.system.getCount();
  }
}

export { EmberSystem };
