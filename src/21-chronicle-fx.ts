// The Chronicle's look and motion — the view half of src/20-chronicle.ts
//
// Written from scratch for FABLE-BRIEF-9.md. This was never in the bundle.
//
// The engine (20-chronicle) owns the safety: one infill snapshot, autosave
// suppressed, the action log read but never written. This module owns what the
// player SEES and DOES while inside:
//
//   - `uChronicle`, ramped 0..1 on the post shader that already exists — the
//     primary mechanism. The past is a lower-generation copy of the same tape,
//     spoken in the vocabulary the tracking band already established.
//   - a `postprocessing` chain (depth of field, vignette, grain) mounted ONLY
//     while the Chronicle is open, composited after the engraving pass and
//     disposed on exit. It never runs in the normal loop and never touches
//     `snap()` — plates have their own identity.
//   - `three-nebula` stone dust as each action lands, during playback only.
//     Render-only and bounded: a particle can never touch world state,
//     pockets, nav or the log, and the pool is capped and cleared on exit.
//   - playback at three speeds, and coalesced scrub input, because every
//     scrub is a full world rebuild and pointer-move fires far faster than
//     the world can be rebuilt.

import {
  BoxGeometry,
  CanvasTexture,
  LinearSRGBColorSpace,
  Mesh,
  MeshLambertMaterial,
  Sprite,
  SpriteMaterial,
  Vector3,
} from "three";
import {
  DepthOfFieldEffect,
  EffectComposer,
  EffectPass,
  NoiseEffect,
  RenderPass,
  VignetteEffect,
} from "postprocessing";
import System, {
  Alpha,
  Body,
  Emitter,
  Gravity,
  Life,
  Mass,
  PointZone,
  Position,
  RadialVelocity,
  Radius,
  Rate,
  Scale,
  Span,
  SpriteRenderer,
  Vector3D,
} from "three-nebula";
import { terrainHeightAt } from "./01-materials";

// three-nebula's renderers take "the THREE namespace" but only ever reach for
// five constructors. Handing it exactly those keeps the bundle honest about
// what it actually uses.
const NEBULA_THREE = {
  Mesh,
  BoxGeometry,
  MeshLambertMaterial,
  Sprite,
  SpriteMaterial,
};

/** How long the replay grade takes to ramp in or out, ms. */
const RAMP_MS = 900;
/** Coalescing window for drag input: at most one rebuild per this many ms. */
const SCRUB_MS = 80;
/** Concurrent dust emitters — the fixed pool the brief demands. */
const MAX_BURSTS = 8;

export class ChronicleView {
  /** True while the playback timer is walking the index forward. */
  playing = false;
  speedIdx = 0;
  /** ms of real time per action applied. Three speeds, not a slider. */
  speeds = [
    { label: "×1", ms: 640 },
    { label: "×2", ms: 300 },
    { label: "×4", ms: 130 },
  ];
  /** Called after any position/playback change so the HUD can follow. */
  onSync: () => void = () => {};

  private deps: any;
  /** Current uChronicle value, eased toward active ? 1 : 0 every frame. */
  private amount = 0;
  private acc = 0;
  /** Latest drag target not yet applied, or null. */
  private pending: number | null = null;
  private lastScrubAt = 0;
  private composer: any = null;
  private fxPass: any = null;
  private dof: any = null;
  private fxW = 0;
  private fxH = 0;
  private prevColorSpace: any = null;
  private dust: any = null;
  private dustSprite: any = null;
  /** The DoF focus target — the structure currently being replayed. */
  private focus = new Vector3();

  constructor(deps: any) {
    this.deps = deps;
  }

  get speedLabel(): string {
    return this.speeds[this.speedIdx].label;
  }

  /** The bootstrap opened the Chronicle: mount the chain, aim the focus. */
  opened(): void {
    this.playing = false;
    this.acc = 0;
    this.pending = null;
    this.focusOn(this.deps.chronicle.index);
    this.mountComposer();
  }

  /** About to exit: stop playback and take the dust with us. Called BEFORE
   * `chronicle.exit()` so no burst outlives the visit. */
  closing(): void {
    this.playing = false;
    this.pending = null;
    this.clearDust();
  }

  /** Exited: tear the chain down. The uChronicle ramp-out continues on its
   * own — `frame` keeps easing toward 0 after `active` goes false. */
  closed(): void {
    this.unmountComposer();
  }

  /** Drag input from the scrub bar. Coalesced: stored here, applied by
   * `frame` at most once per SCRUB_MS. Dragging also pauses playback —
   * the hand on the bar outranks the timer. */
  requestScrub(k: number): void {
    this.playing = false;
    this.pending = k;
  }

  togglePlay(): void {
    const chron = this.deps.chronicle;
    if (!chron.active) return;
    if (!this.playing && this.pending === null && chron.index >= chron.length) {
      // play pressed at the present: start over from before the first stone
      chron.scrubTo(0);
      this.focusOn(chron.index);
    }
    this.playing = !this.playing;
    this.acc = 0;
    this.onSync();
  }

  cycleSpeed(): void {
    this.speedIdx = (this.speedIdx + 1) % this.speeds.length;
    this.onSync();
  }

  /**
   * Per-frame work, called from the bootstrap loop with the frame delta in ms
   * whether or not the Chronicle is open (the ramp-out needs the tail).
   *
   * At most ONE `scrubTo` happens per frame — either the coalesced drag
   * target or a single playback step, never both and never several. A scrub
   * is a full world rebuild; this is the throttle the brief asks for.
   */
  frame(dtMs: number): void {
    const chron = this.deps.chronicle;
    const step = dtMs / RAMP_MS;
    const want = chron.active ? 1 : 0;
    this.amount += Math.max(-step, Math.min(step, want - this.amount));
    this.deps.ke.setChronicle(this.amount);
    if (!chron.active) return;
    const now = performance.now();
    if (this.pending !== null && now - this.lastScrubAt >= SCRUB_MS) {
      const k = this.pending;
      this.pending = null;
      this.lastScrubAt = now;
      chron.scrubTo(k);
      this.focusOn(chron.index);
      this.onSync();
    } else if (this.playing) {
      this.acc += dtMs;
      if (this.acc >= this.speeds[this.speedIdx].ms) {
        this.acc = 0;
        if (chron.index >= chron.length) this.playing = false;
        else {
          chron.scrubTo(chron.index + 1);
          this.focusOn(chron.index);
          // dust marks the action landing — playback only, never on drag
          const a = this.deps.actionAt(chron.index);
          const p = a && this.actionPos(a);
          if (p) this.burst(p[0], p[1], p[2]);
        }
        this.onSync();
      }
    }
    if (this.dust) this.dust.update(Math.min(dtMs, 120) / 1000);
  }

  /**
   * The frame's final render. Outside the Chronicle this is exactly
   * `ke.render` — the composer path cannot run in the normal loop because it
   * does not exist then.
   */
  render(scene: any, camera: any): void {
    const ke = this.deps.ke;
    if (this.composer && this.deps.chronicle.active) {
      ke.renderScene(scene, camera);
      if (this.fxW !== ke.w || this.fxH !== ke.h) {
        this.composer.setSize(ke.w, ke.h);
        this.fxW = ke.w;
        this.fxH = ke.h;
      }
      // the scene's own depth, not the quad's: the DoF must focus on the
      // replayed stone, and the quad is 2cm from an orthographic camera
      this.fxPass.setDepthTexture(ke.target.depthTexture);
      this.composer.render();
    } else ke.render(scene, camera);
  }

  /** Aim the depth of field at position `k`'s newest structure. */
  private focusOn(k: number): void {
    const a = this.deps.actionAt(k);
    const p = a && this.actionPos(a);
    if (p) this.focus.set(p[0], p[1] + 6, p[2]);
    else this.focus.copy(this.deps.focusFallback());
  }

  /** A representative world position for an action, or null. */
  private actionPos(a: any): number[] | null {
    if (typeof a.ax === "number")
      return [(a.ax + a.bx) / 2, Math.min(a.ay, a.by), (a.az + a.bz) / 2];
    if (a.t === "carve") {
      const s = this.deps.world.structures.get(a.target);
      return s ? this.actionPos(s.action) : null;
    }
    if (typeof a.x === "number")
      return [
        a.x,
        typeof a.y === "number" ? a.y : terrainHeightAt(a.x, a.z),
        a.z,
      ];
    return null;
  }

  /**
   * The Chronicle-only chain: shallow depth of field on the structure being
   * replayed, a vignette, and grain. Three effects; growth here is the
   * signal to stop.
   *
   * The colour-space dance: the engraving quad's output is already
   * display-ready (a raw ShaderMaterial, no colorspace chunk), but with
   * `outputColorSpace` at sRGB the composer tags its buffers sRGB — a
   * hardware encode on write, decode on read, and a final re-encode to
   * screen, netting one extra encode that washes the whole frame out. The
   * game itself never relies on `outputColorSpace` (everything on screen
   * goes through that raw quad), so it is set to linear for the visit and
   * restored on exit; the composer then carries the quad's values through
   * untouched.
   */
  private mountComposer(): void {
    const ke = this.deps.ke,
      renderer = ke.renderer;
    this.prevColorSpace = renderer.outputColorSpace;
    renderer.outputColorSpace = LinearSRGBColorSpace;
    const composer = new EffectComposer(renderer);
    // the composer's RenderPass clears via its own ClearPass, but it also
    // switches the renderer's autoClear off globally — which the normal
    // scene-to-target pass depends on. Put it back.
    renderer.autoClear = true;
    composer.addPass(new RenderPass(ke.postScene, ke.postCam));
    this.dof = new DepthOfFieldEffect(this.deps.camera, {
      focusRange: 26,
      bokehScale: 2.2,
    });
    this.dof.target = this.focus;
    const vignette = new VignetteEffect({ offset: 0.3, darkness: 0.5 });
    const noise = new NoiseEffect({ premultiply: true });
    noise.blendMode.opacity.value = 0.45;
    this.fxPass = new EffectPass(this.deps.camera, this.dof, vignette, noise);
    composer.addPass(this.fxPass);
    composer.setSize(ke.w, ke.h);
    this.fxW = ke.w;
    this.fxH = ke.h;
    this.composer = composer;
  }

  private unmountComposer(): void {
    if (!this.composer) return;
    this.composer.dispose();
    this.composer = this.fxPass = this.dof = null;
    this.deps.ke.renderer.outputColorSpace = this.prevColorSpace;
    this.deps.ke.renderer.autoClear = true;
  }

  /** One puff of stone dust at the base of a structure as it lands. */
  private burst(x: number, y: number, z: number): void {
    if (!this.dust) {
      this.dust = new System();
      this.dust.addRenderer(new SpriteRenderer(this.deps.scene, NEBULA_THREE));
    }
    if (this.dust.emitters.length >= MAX_BURSTS) return; // fixed pool
    const e = new Emitter();
    e.setRate(new Rate(new Span(7, 12), new Span(0.02)))
      .setInitializers([
        new Position(new PointZone(x, y + 0.4, z)),
        new Mass(1),
        new Radius(0.5, 1.2),
        new Life(0.5, 1.1),
        new Body(this.dustBody()),
        new RadialVelocity(5.5, new Vector3D(0, 1, 0), 72),
      ])
      .setBehaviours([new Alpha(0.5, 0), new Scale(0.7, 2.4), new Gravity(2.6)])
      .emit(1);
    this.dust.addEmitter(e);
  }

  /** The particle sprite: a soft radial puff painted at load. Procedural —
   * nothing is shipped or fetched. */
  private dustBody(): any {
    if (this.dustSprite) return this.dustSprite;
    const c = document.createElement("canvas");
    c.width = c.height = 32;
    const g = c.getContext("2d");
    const grad = g.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, "rgba(233,216,228,0.85)");
    grad.addColorStop(0.55, "rgba(216,196,214,0.4)");
    grad.addColorStop(1, "rgba(216,196,214,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 32, 32);
    this.dustSprite = new Sprite(
      new SpriteMaterial({
        map: new CanvasTexture(c),
        transparent: true,
        depthWrite: false,
      }),
    );
    return this.dustSprite;
  }

  /** Kill every live particle so its sprite leaves the scene, then drop the
   * whole system. Nothing survives the visit. */
  private clearDust(): void {
    if (!this.dust) return;
    for (const em of [...this.dust.emitters]) {
      for (const p of em.particles) p.age = p.life + 1;
      em.update(0.016);
    }
    this.dust.destroy();
    this.dust = null;
  }
}
