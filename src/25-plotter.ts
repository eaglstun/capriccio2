// The megastructure line, drawn by a machine.
//
// The far arcologies used to be solid boxes in four flat colours. They are now
// pen-plotter linework: no fill, one ink, and the horizon is DRAWN — a pen
// walks it stroke by stroke, lifting between towers, sweeping by azimuth so it
// crosses the skyline rather than growing everywhere at once.
//
// Technique and its measurements come from the `threejs` skill,
// references/vector-display-and-plotter-linework.md. Three things from there
// that this file leans on and that are easy to get wrong:
//
//   1. `chainSegments` is TOPOLOGY-ONLY. A box's 12 crease edges chain the same
//      way at any dimensions, so the Eulerian decomposition is computed ONCE
//      for a unit cube and reused for every tower in the city. Verified on
//      r180: 1x1x1, 37x4.2x0.9 and 16x260x26 give byte-identical stroke arrays.
//   2. Chain BEFORE merging. Merging welds coincident corners between
//      neighbouring bodies and changes the graph. Every box is chained in
//      isolation and the baked buffers are concatenated afterwards.
//   3. Order is frozen at bake time. `aPen` accumulates across the whole city
//      in sorted order; changing the sweep means rebaking, not re-uniforming.
//
// NO POST PASS. This is geometry and blend state, two draw calls, which is why
// it can sit in front of the existing post stack without touching it.
import {
  BufferGeometry,
  BoxGeometry,
  Color,
  DoubleSide,
  EdgesGeometry,
  Float32BufferAttribute,
  GreaterDepth,
  LessEqualDepth,
  Matrix4,
  Mesh,
  ShaderMaterial,
  Vector2,
  Vector3,
} from "three";

/** One body to plot: a unit box scaled by w/h/d then placed by `matrix`. */
interface PlotBox {
  w: number;
  h: number;
  d: number;
  matrix: Matrix4;
  /** sort key — the pen sweeps the horizon in increasing azimuth */
  az: number;
}

/**
 * Segment soup -> array of node-index polylines, each edge used exactly once.
 *
 * Two phases on purpose. Plain greedy covers every edge and still looks wrong:
 * it strands short loops that read as lines twitching on rather than as
 * drawing. Phase 1 emits open trails from odd nodes (each drops the odd count
 * by 2, so it emits the theoretical minimum of odd/2 strokes); phase 2 splices
 * the leftover circuits INTO those trails instead of emitting them.
 *
 * Only phase-2 circuits may be spliced. Splicing an open phase-1 trail welds
 * two strokes together and leaves a gap where the pen teleports — a quiet bug.
 */
function chainSegments(pos: ArrayLike<number>, weld = 1e-4) {
  const q = (v: number) => Math.round(v / weld);
  const nodeOf = new Map<string, number>(),
    nodePos: number[][] = [];
  const idOf = (i: number) => {
    const k = `${q(pos[i])},${q(pos[i + 1])},${q(pos[i + 2])}`;
    let n = nodeOf.get(k);
    if (n === undefined) {
      n = nodePos.length;
      nodeOf.set(k, n);
      nodePos.push([pos[i], pos[i + 1], pos[i + 2]]);
    }
    return n;
  };
  const edges: number[][] = [],
    adj: number[][] = [];
  for (let s = 0; s < pos.length / 6; s++) {
    const a = idOf(s * 6),
      b = idOf(s * 6 + 3);
    if (a === b) continue; // degenerate
    const e = edges.length;
    edges.push([a, b]);
    (adj[a] || (adj[a] = [])).push(e);
    (adj[b] || (adj[b] = [])).push(e);
  }
  const used = new Uint8Array(edges.length);
  const deg = new Int32Array(nodePos.length);
  for (const [a, b] of edges) (deg[a]++, deg[b]++);
  let remaining = edges.length;
  const nextEdge = (n: number) => (adj[n] || []).find((e) => !used[e]);
  const walk = (start: number) => {
    const path = [start];
    let cur = start;
    for (;;) {
      const e = nextEdge(cur);
      if (e === undefined) break;
      ((used[e] = 1), remaining--);
      const [a, b] = edges[e];
      (deg[a]--, deg[b]--);
      ((cur = a === cur ? b : a), path.push(cur));
    }
    return path;
  };
  const strokes: number[][] = [];
  for (let n = 0; n < nodePos.length; n++)
    while (deg[n] % 2 === 1) {
      const t = walk(n);
      if (t.length > 1) strokes.push(t);
    }
  while (remaining > 0) {
    let host = -1,
      at = -1;
    outer: for (let s = 0; s < strokes.length; s++)
      for (let i = 0; i < strokes[s].length; i++)
        if (nextEdge(strokes[s][i]) !== undefined) {
          ((host = s), (at = i));
          break outer;
        }
    if (host >= 0) strokes[host].splice(at, 1, ...walk(strokes[host][at]));
    else {
      const e = edges.findIndex((_, i) => !used[i]); // island with no contact
      const t = walk(edges[e][0]);
      if (t.length > 1) strokes.push(t);
    }
  }
  return { strokes, nodePos };
}

/**
 * The unit-cube decomposition, computed at most once per page load.
 *
 * This is the expensive step (EdgesGeometry + the chain), and point 1 in the
 * header is what makes it a constant rather than per-tower work.
 */
let unitCache: { strokes: number[][]; nodePos: number[][] } | null = null;
function unitBox() {
  if (!unitCache) {
    const eg = new EdgesGeometry(new BoxGeometry(1, 1, 1), 20);
    unitCache = chainSegments(eg.getAttribute("position").array as any);
    eg.dispose();
  }
  return unitCache;
}

// Segments are expanded into SCREEN-SPACE QUADS rather than drawn as GL lines.
//
// Three reasons, all of them forced:
//   - `linewidth` is ignored on every WebGL backend, so GL_LINES is 1px, full
//     stop. The renderer also runs `antialias: false` (00-shaders.ts:534)
//     because it draws into a target, so a 1px line gets stippled by the 1.4x
//     supersample downscale and the per-vertex wobble slides it sub-pixel
//     between frames. That is the broken-looking stroke.
//   - A quad has a CROSS-SECTION, so the fragment shader can fall off across
//     it. That falloff is simultaneously the antialiasing and the beam glow.
//   - Width is set in PIXELS and does not thin with distance, which is tell 3
//     in the reference: a beam does not get thinner far away, and perspective
//     line thinning reads as "3D engine" rather than "display".
//
// 4 verts + 6 indices per segment, vs 2 verts. 576 segments -> 2304 verts,
// which is nothing; this stays one draw call per pass.
const vert = /* glsl */ `
attribute vec3 aOther;     // the segment's other endpoint, object space
attribute float aPen;      // cumulative pen distance along the whole plot
attribute float aSide;     // -1 / +1, which side of the centre line
attribute float aCap;      // -1 at the tail vertex, +1 at the head vertex
uniform float uWobble;     // pen slop, in pixels
uniform float uHalfWidth;  // half the beam width, in pixels
uniform vec2  uViewport;
varying float vPen;
varying float vSide;
varying float vFogDepth;

void main() {
  vec4 mv    = modelViewMatrix * vec4(position, 1.0);
  vec4 clip  = projectionMatrix * mv;
  vec4 oclip = projectionMatrix * modelViewMatrix * vec4(aOther, 1.0);

  // stroke direction in SCREEN space, so both the slop and the width stay in
  // the plane of the paper however the line is oriented in the world
  vec2 d = (oclip.xy / oclip.w - clip.xy / clip.w) * uViewport;
  vec2 dir = length(d) > 1e-6 ? normalize(d) : vec2(1.0, 0.0);
  vec2 perp = vec2(-dir.y, dir.x);

  // two octaves of slop, deterministic in arc length: no texture, no rand.
  // sine rather than hash noise on purpose — a stroke should BEND, and a hash
  // vibrates frame to frame and reads as a bug.
  float w = sin(aPen * 0.70) * 0.6 + sin(aPen * 0.23 + 1.7) * 0.4;

  // widen across, and overshoot along — the cap extension both rounds the ends
  // (tell 5: a pen has mass) and stops the glow being sliced flat at a joint
  vec2 offset = perp * (aSide * uHalfWidth + w * uWobble)
              + dir * (aCap * uHalfWidth);

  // pixels -> NDC is 2/viewport, and clip.xy = ndc * clip.w
  clip.xy += offset * 2.0 / uViewport * clip.w;

  vPen = aPen;
  vSide = aSide;
  vFogDepth = -mv.z;
  gl_Position = clip;
}`;

// FogExp2 is applied by hand: ShaderMaterial gets no fog chunks injected, and
// without this the far towers sit at full strength on top of the haze and the
// horizon stops receding. Density/colour are read off scene.fog at build time.
const frag = /* glsl */ `
uniform float uPen;        // how far the pen has travelled
uniform float uHot;        // length of the bright beam tip
uniform vec3  uInk;
uniform float uGhost;      // brightness of not-yet-drawn line; 0 = invisible
uniform float uOpacity;    // hidden-line pass rides at low opacity
uniform vec3  uFogColor;
uniform float uFogDensity;
uniform float uFogMax;     // ceiling on the haze, so the ink stays bloomable
uniform float uCore;       // beam tightness: higher = harder centre
varying float vPen;
varying float vSide;
varying float vFogDepth;

void main() {
  vec3 ink;
  float a = uOpacity;
  if (vPen > uPen) {
    if (uGhost <= 0.0) discard;      // undrawn and no construction lines
    // faint via ALPHA, not via a dark ink. These fragments write depth like
    // any other, so a darkened-colour ghost would read as a solid hairline
    // rather than as a construction line.
    ink = uInk;
    a *= uGhost;
  } else {
    // uHot is the beam: a short bright head on the drawn end is the difference
    // between a reveal and a plot — it says something is MAKING this line.
    float hot = 1.0 - clamp((uPen - vPen) / uHot, 0.0, 1.0);
    ink = uInk * (1.0 + hot * 3.0);
  }

  // THE BEAM PROFILE — this is both the antialiasing and the glow.
  //
  // vSide runs -1..1 across the quad, so |vSide| is the distance from the
  // centre line in half-widths. A Gaussian across it gives a phosphor-looking
  // falloff whose edge lands on fractional alpha, which is what removes the
  // stipple; a small hard core keeps the stroke from reading as a smudge.
  float d = abs(vSide);
  float beam = exp(-d * d * uCore);
  beam = max(beam, smoothstep(0.42, 0.0, d));
  a *= beam;
  if (a < 0.004) discard;            // keep the depth buffer clean at the rim

  // The haze is CAPPED. Uncapped FogExp2 at this radius desaturates the ink
  // 50-73% toward paper, which drops it under the post pass's bloom gate
  // (00-shaders.ts:366 needs value > 0.60 and saturation > 0.24) and the glow
  // never fires. Depth still reads, because the strokes also thin and dim with
  // the pen order and the towers behind sit lower in the frame.
  float f = 1.0 - exp(-uFogDensity * uFogDensity * vFogDepth * vFogDepth);
  vec3 col = mix(ink, uFogColor, clamp(f, 0.0, 1.0) * uFogMax);

  // hand the wide halo to the existing neon bloom rather than growing the
  // quad: a wide quad would have to write depth too, and would punch a
  // paper-coloured hole in the sky around every stroke
  gl_FragColor = vec4(col, a);
}`;

interface PlotterOpts {
  ink?: string;
  /** world units of pen-up travel between strokes within one tower */
  gap?: number;
  /** extra pen-up travel between towers, so the pauses land where the eye expects */
  towerGap?: number;
  /** world units of pen travel per second */
  speed?: number;
  wobble?: number;
  hot?: number;
  ghost?: number;
  fogColor?: Color;
  fogDensity?: number;
  /** beam width in pixels, constant with depth */
  width?: number;
  /** Gaussian tightness across the beam; higher is harder-edged */
  core?: number;
  /** ceiling on the distance haze, so ink stays bright enough to bloom */
  fogMax?: number;
}

/**
 * A plotted skyline. Build it with the boxes that used to be solid meshes,
 * add it to the scene, and tick `update(dt)` from the frame loop.
 */
class PlotterSkyline {
  group: Mesh[] = [];
  penTotal = 0;
  pen = 0;
  speed: number;
  /** replay forever instead of holding the finished plot */
  loop = false;
  private mats: ShaderMaterial[] = [];

  constructor(boxes: PlotBox[], opts: PlotterOpts = {}) {
    const {
      ink = "#9fe8ff",
      gap = 1.6,
      towerGap = 26,
      // Measured: the 48 bodies bake to ~38.5k world units of pen travel, of
      // which the gaps are only ~1.5k — it is nearly all ink. At 2200/s that
      // draws in ~17s, which is a load-in. The first pass at 260/s took two
      // and a half minutes, so set this from penTotal, never by feel.
      speed = 2200,
      wobble = 1.15,
      // the bright pen-tip must last long enough to see: ~0.15s of travel
      hot = 320,
      ghost = 0.06,
      fogColor = new Color("#2a1f52"),
      fogDensity = 0.0021,
      // Beam width in PIXELS, constant with depth. Kept narrow deliberately:
      // these quads write depth, so their width is also the width of the hole
      // they punch in the post pass's sky. Past ~5px you start seeing the
      // clear colour as a halo instead of the gradient.
      width = 3.2,
      // Gaussian tightness across the width. 5 is a soft phosphor bleed, 12 is
      // nearly a hard line with just an antialiased rim.
      core = 6.5,
      // Haze ceiling. 1.0 is physically-matched FogExp2 and kills the bloom;
      // 0.55 keeps the far towers reading as bright saturated ink.
      fogMax = 0.55,
    } = opts;
    this.speed = speed;

    // Point 3: the sweep is chosen HERE and frozen into aPen. Sorting by
    // azimuth is what makes the pen cross the horizon instead of scribbling
    // everywhere at once.
    const sorted = boxes.slice().sort((a, b) => a.az - b.az);
    const unit = unitBox();

    const position: number[] = [],
      other: number[] = [],
      pen: number[] = [],
      side: number[] = [],
      cap: number[] = [],
      index: number[] = [];
    const v = new Vector3();
    let d = 0;

    // one screen-space quad per segment: verts 0,1 at the tail (side -1/+1),
    // verts 2,3 at the head. The vertex shader does the widening, so both
    // endpoints must know where the other one is.
    const quad = (a: number[], b: number[], penA: number, penB: number) => {
      const base = position.length / 3;
      for (const [p, o, pn, cp] of [
        [a, b, penA, -1],
        [a, b, penA, -1],
        [b, a, penB, 1],
        [b, a, penB, 1],
      ] as const) {
        (position.push(p[0], p[1], p[2]),
          other.push(o[0], o[1], o[2]),
          pen.push(pn as number),
          cap.push(cp as number));
      }
      (side.push(-1, 1, -1, 1),
        index.push(base, base + 1, base + 2, base + 2, base + 1, base + 3));
    };

    for (const box of sorted) {
      d += towerGap; // the pen crosses to the next tower
      // Point 1: reuse the unit decomposition, substituting placed corners.
      const placed = unit.nodePos.map(([x, y, z]) =>
        v
          .set(x * box.w, y * box.h, z * box.d)
          .applyMatrix4(box.matrix)
          .toArray(),
      );
      for (const stroke of unit.strokes) {
        d += gap; // pen-up between strokes on the same tower
        for (let i = 0; i + 1 < stroke.length; i++) {
          const a = placed[stroke[i]],
            b = placed[stroke[i + 1]];
          const len = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]) || 1;
          quad(a, b, d, d + len);
          d += len;
        }
      }
    }
    this.penTotal = d;

    const g = new BufferGeometry();
    (g.setAttribute("position", new Float32BufferAttribute(position, 3)),
      g.setAttribute("aOther", new Float32BufferAttribute(other, 3)),
      g.setAttribute("aPen", new Float32BufferAttribute(pen, 1)),
      g.setAttribute("aSide", new Float32BufferAttribute(side, 1)),
      g.setAttribute("aCap", new Float32BufferAttribute(cap, 1)),
      g.setIndex(index));

    const uniforms = () => ({
      uPen: { value: 0 },
      uHot: { value: hot },
      uInk: { value: new Color(ink) },
      uGhost: { value: ghost },
      uOpacity: { value: 1 },
      uWobble: { value: wobble },
      uViewport: { value: new Vector2(1, 1) },
      uFogColor: { value: fogColor },
      uFogDensity: { value: fogDensity },
      uFogMax: { value: fogMax },
      uHalfWidth: { value: width * 0.5 },
      uCore: { value: core },
    });

    // The drafting convention, and cheaper than correct hidden-line removal:
    // draw the linework TWICE. Once depth-tested normally at full strength,
    // once inverted at low opacity so occluded edges show through faintly the
    // way a drafter's construction lines do. Two draw calls, no render targets.
    //
    // THE VISIBLE PASS MUST WRITE DEPTH, and that is not a detail. The post
    // pass repaints the sky over anything at the far depth value:
    //
    //     bool skyC = depthC >= 0.999999;   // 00-shaders.ts
    //     if (skyC) { ...; color = sky; }
    //
    // With depthWrite off, every stroke above the horizon was painted out and
    // only the ones crossing terrain survived — which is exactly how this
    // first shipped. The solid megastructures never hit it because
    // MeshBasicMaterial writes depth by default.
    //
    // The knock-on: sky is composited in POST, so a stroke over sky blends
    // against the CLEAR colour, not against the gradient. That is fine at 1px
    // (you never see a patch of wrong background, only a slightly shifted ink)
    // but it does rule out additive blending, which would pull paper up into
    // the ink. Additive was the vector-CRT tell anyway; the plotter reading
    // wants crossings to darken, and normal blending is the honest middle
    // here — this engine has no multiply-over-sky to give.
    for (const [depthFunc, opacity, depthWrite, order] of [
      [LessEqualDepth, 1.0, true, 2],
      [GreaterDepth, 0.18, false, 3], // after, so it tests against the above
    ] as const) {
      const m = new ShaderMaterial({
        uniforms: uniforms(),
        vertexShader: vert,
        fragmentShader: frag,
        transparent: true,
        // the quads are expanded in screen space, so winding is whatever the
        // projection makes it — culling would drop half the strokes
        side: DoubleSide,
        depthWrite,
        depthFunc,
      });
      m.uniforms.uOpacity.value = opacity;
      const ls = new Mesh(g, m);
      // scene-only scenery, exactly as the solid megastructures were: never a
      // raycast target, casts nothing, emits no pockets and no nav
      ((ls.castShadow = !1),
        (ls.receiveShadow = !1),
        (ls.frustumCulled = !1),
        (ls.renderOrder = order));
      (this.mats.push(m), this.group.push(ls));
    }
  }

  /** One uniform write per frame over a static buffer — no geometry updates. */
  update(dt: number, viewW: number, viewH: number) {
    this.pen += dt * this.speed;
    if (this.pen > this.penTotal + this.penTotal * 0.08) {
      if (this.loop) this.pen = 0;
      else this.pen = this.penTotal + this.penTotal * 0.08;
    }
    for (const m of this.mats) {
      ((m.uniforms.uPen.value = this.pen),
        m.uniforms.uViewport.value.set(viewW, viewH));
    }
  }

  /** Watch it draw again — CAP.plotter.replay() */
  replay() {
    this.pen = 0;
  }

  /** Skip to the finished plot. */
  finish() {
    this.pen = this.penTotal;
  }

  /**
   * Live tuning from the console, because the look is a taste call and a
   * rebuild per value is not a workflow. CAP.plotter.tune({ width: 4 }).
   *
   * `width` is pixels and doubles as the width of the hole these quads punch
   * in the post pass's sky, so past ~5 the clear colour starts showing as a
   * halo. `fogMax` above ~0.7 drops the ink under the bloom gate and the glow
   * dies. Both are documented at their defaults.
   */
  tune(o: {
    width?: number;
    core?: number;
    ink?: string;
    wobble?: number;
    hot?: number;
    ghost?: number;
    fogMax?: number;
  }) {
    for (const m of this.mats) {
      const u = m.uniforms;
      if (o.width !== undefined) u.uHalfWidth.value = o.width * 0.5;
      if (o.core !== undefined) u.uCore.value = o.core;
      if (o.ink !== undefined) u.uInk.value.set(o.ink);
      if (o.wobble !== undefined) u.uWobble.value = o.wobble;
      if (o.hot !== undefined) u.uHot.value = o.hot;
      if (o.ghost !== undefined) u.uGhost.value = o.ghost;
      if (o.fogMax !== undefined) u.uFogMax.value = o.fogMax;
    }
    return o;
  }
}

export { PlotterSkyline, chainSegments };
export type { PlotBox };
