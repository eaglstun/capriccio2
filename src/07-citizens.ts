// Citizens: agent pool, daily routine, pathing
//
// Extracted from public/assets/index-DCXbw2vV.js, bundle lines
// 28494–28848. Statements are verbatim; identifiers are
// renamed via src/renames.json. Imports and exports are generated.
// Regenerate: python3 tools/split_bundle.py --write

// --- generated imports ---
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  ConeGeometry,
  CylinderGeometry,
  DynamicDrawUsage as Lu,
  InstancedMesh,
  Mesh,
  Object3D,
  OctahedronGeometry,
  SphereGeometry,
  Vector3,
} from "three";
import { hashString, r_, seededRng } from "./01-materials";
import { Co } from "./06-infill";
import { citizenHead } from "./24-citizen-head";
// --- end generated imports ---

/**
 * The population: a fixed pool of agents walking the nav graph.
 *
 * Drawn as InstancedMeshes so the whole population costs a fixed number of
 * draw calls regardless of size: three body variants (chosen by agent index
 * % 3) times two levels of detail, so six. Which level an agent lands in is
 * decided per frame from its distance to the camera — see the tail of
 * update() — and a mesh with no instances in it draws nothing.
 * `dummy` is a scratch Object3D used to compose each instance matrix — the
 * standard three.js instancing pattern, and the reason there is no Object3D
 * per citizen.
 *
 * The pool is allocated once at `Co` slots and never grows or shrinks;
 * citizens are switched on and off via `active`. No allocation at runtime, no
 * GC churn in the frame loop.
 */
class Citizens {
  world: any;
  infill: any;
  /** Six InstancedMeshes, indexed `lod * 3 + variant`. */
  meshes: InstancedMesh[];
  agents: any[] = [];
  population = 16;
  /** Scratch object for composing instance matrices; never added to a scene. */
  dummy = new Object3D();
  // the current speaker: index of the one agent voicing the active
  // request, or -1 when nobody is asking. Derived by the caller from the
  // request id (never stored — the save format is frozen), so a reload
  // produces the same Marcus. See setSpeaker().
  speaker = -1;
  marker: Mesh;
  speakerCol = new Color("#ff71ce");
  // A4 ambient life: per-agent glance targets, rebuilt with the agent list.
  // `declare` so the property still appears only on first assignment.
  declare look: any[];

  constructor(t: any, e: any, n: Object3D) {
    ((this.world = t), (this.infill = e));
    // a small floating mark over the speaker's head. It shares the world's
    // glow material, so it dims to a lamp at dusk like everything else lit —
    // findable once framed, not a quest beacon across the map.
    this.marker = new Mesh(new OctahedronGeometry(0.34, 0), t.glowMat);
    ((this.marker.scale.y = 1.6),
      (this.marker.visible = !1),
      n.add(this.marker));
    const s = t.mats.figure;
    // Six meshes, indexed lod*3 + variant. Two levels doubles the draw calls
    // from three to six, which is nothing, and an InstancedMesh that draws
    // zero instances costs nothing either — so when the whole population is
    // far away the three near meshes sit at count 0 and are skipped.
    this.meshes = [
      Po(0, 0),
      Po(1, 0),
      Po(2, 0),
      Po(0, 1),
      Po(1, 1),
      Po(2, 1),
    ].map((r) => {
      const o = new InstancedMesh(r, s, Co);
      return (
        o.instanceMatrix.setUsage(Lu),
        (o.castShadow = !0),
        (o.count = 0),
        (o.frustumCulled = !1),
        n.add(o),
        o
      );
    });
    for (let r = 0; r < Co; r++)
      this.agents.push({
        active: !1,
        pos: new Vector3(),
        path: [],
        seg: 0,
        segT: 0,
        speed: 1.15 + Math.random() * 0.5,
        state: "home",
        homeNode: -1,
        workNode: -1,
        offset: Math.random() * 1.6 - 0.8,
        bob: Math.random() * 7,
        // starts far: the first frame is a wide shot, not a close-up
        lod: 1,
      });
    // a population, not a uniform: clothing colour and build derived
    // deterministically from the agent index — render-side only
    this.look = [];
    const lk = seededRng(9091),
      hues = [0.86, 0.55, 0.72, 0.62, 0.09, 0.33, 0.94, 0.5];
    for (let r = 0; r < Co; r++) {
      const c = new Color();
      lk() < 0.06
        ? c.setHSL(0.07, 0.95, 0.58) // one hi-vis jacket in twenty
        : c.setHSL(
            (hues[Math.floor(lk() * hues.length)] + (lk() - 0.5) * 0.06 + 1) %
              1,
            0.18 + lk() * 0.5,
            0.26 + lk() * 0.4,
          );
      this.look.push({
        col: c,
        sx: 0.88 + lk() * 0.3,
        sy: 0.88 + lk() * 0.26,
      });
    }
  }
  /**
   * Mark agent `t` as the current speaker, or clear with -1.
   *
   * One speaker, one marker, tied to the active request. When the last
   * request completes nobody is marked — the empty state is deliberate.
   * The speaker stays an ordinary agent in every other way: same routine,
   * same route, only the colour and the mark over their head.
   */
  setSpeaker(t) {
    ((this.speaker = t), t < 0 && (this.marker.visible = !1));
  }
  /** The agent currently speaking, or null. */
  speakerAgent() {
    const t = this.agents[this.speaker];
    return t && t.active ? t : null;
  }
  /** Nav nodes citizens live at: every FINISHED house. Homes are houses only. */
  spawnPoints() {
    const t = [];
    for (const e of this.infill.items) {
      if (e.kind !== "house" || e.stage < 1) continue;
      const n = this.world.pockets[e.pocketIdx];
      n && n.navNode >= 0 && t.push(n.navNode);
    }
    return t;
  }
  /** Nav nodes citizens work at: finished stalls, workshops and gardens. */
  workPoints() {
    const t = [];
    for (const e of this.infill.items)
      if (
        (e.kind === "stall" || e.kind === "workshop" || e.kind === "garden") &&
        e.stage >= 1
      ) {
        const n = this.world.pockets[e.pocketIdx];
        n && n.navNode >= 0 && t.push(n.navNode);
      }
    return t;
  }
  /**
   * Where citizens congregate in the evening: the town centre, anywhere
   * explicitly designated `gathering`, and — the interesting one — every
   * pocket with `scenic > 0.7`.
   *
   * That is the only use of `scenic` outside pocket selection. It is computed
   * for every pocket and never shown in the HUD, but it decides where people
   * choose to spend their evenings. A view is not scored; it is visited.
   */
  gatherPoints() {
    const t = [],
      e = this.world.nav.nearest(new Vector3(-18, 0, 28), 20);
    e >= 0 && t.push(e);
    for (const n of this.world.pockets)
      (n.scenic > 0.7 && n.navNode >= 0 && t.push(n.navNode),
        n.designation === "gathering" && n.navNode >= 0 && t.push(n.navNode));
    return t;
  }
  /**
   * Reconcile the active population against available housing. Called after
   * the world changes.
   *
   * population = min(poolSize, 14 + infill.capacity), and capacity is
   * `finished houses x4 + 8` — so the pool cap is a hard ceiling on the city.
   *
   * Newly activated agents are assigned a home (round-robin over houses) and a
   * work node (strided by 7 so neighbours don't all commute to the same
   * stall). Agents above the population line are simply switched off; their
   * slots are reused unchanged next time the city grows.
   */
  sync() {
    this.population = Math.min(Co, 14 + this.infill.capacity);
    const t = this.spawnPoints(),
      e = this.workPoints(),
      n = seededRng(777);
    for (let s = 0; s < this.agents.length; s++) {
      const r = this.agents[s],
        o = s < this.population;
      if (o && !r.active) {
        r.active = !0;
        const a = t.length
          ? t[s % t.length]
          : this.world.nav.nearest(
              new Vector3(-18 + n() * 24 - 12, 0, 28 + n() * 20 - 10),
              30,
            );
        ((r.homeNode = a),
          (r.workNode = e.length ? e[(s * 7) % e.length] : a),
          a >= 0 && r.pos.copy(this.world.nav.nodes[a].p),
          (r.state = "home"),
          (r.path = []));
      } else o || (r.active = !1);
    }
  }
  /**
   * Send agent `t` to nav node `e`, if a route exists.
   *
   * Paths are stored as cloned Vector3s rather than node indices, so the agent
   * keeps walking a sensible line even if the graph is edited mid-journey —
   * an undone structure tombstones its nodes, and a path holding indices would
   * start reading dead entries.
   *
   * A path of fewer than two points is discarded: there is nowhere to walk.
   */
  goto(t, e) {
    if (e < 0) return;
    const n = this.world.nav.nearest(t.pos, 16);
    if (n < 0) return;
    const s = this.world.nav.path(n, e);
    s.length < 2 ||
      ((t.path = s.map((r) => this.world.nav.nodes[r].p.clone())),
      (t.seg = 0),
      (t.segT = 0));
  }
  /**
   * Advance every citizen. `t` is delta seconds, `e` is the hour.
   *
   * THE DAILY ROUTINE. Each agent has a personal `offset` of about +/-0.8h
   * added to the clock, so the population doesn't move in lockstep — some
   * leave early, some linger:
   *
   *   07.4-11.0   home  -> towork
   *   12.0-16.6   work  -> wander   (small chance per second)
   *   16.8-19.4   work/wander -> gather
   *   19.6-06.0   anything -> tohome
   *   otherwise   a rare idle stroll to a linked neighbour
   *
   * `towork`/`tohome` are the walking states; on arriving with an empty path
   * they settle into `work`/`home`.
   *
   * Movement walks the path segment by segment, `segT` being progress along
   * the current one, so speed is even regardless of segment length.
   *
   * Two touches that sell it: `bob` runs ~7x faster while walking and lifts
   * the body slightly, and STANDING agents are nudged off the node by a
   * sin/cos of their own offset — otherwise everyone at a gathering point
   * would occupy exactly the same spot.
   */
  update(t, e, cam?) {
    const n = this.workPoints(),
      s = this.gatherPoints(),
      r = Math.random,
      // o counts agents PER VARIANT and is what work-node assignment strides
      // over; it has to keep counting the way it always did or citizens would
      // be reassigned to different workplaces the moment they changed level.
      o = [0, 0, 0],
      // cnt is the write cursor per mesh, which is a different thing entirely
      cnt = [0, 0, 0, 0, 0, 0];
    // ---- ambient life. PRESENTATION ONLY — nothing here touches routine,
    // pockets or growth; it only changes how a standing body is posed.
    //   - gathered agents pair off with their nearest standing neighbour
    //     (within 7m) and face each other: a conversation
    //   - agents standing at a finished stall form a queue behind it,
    //     spaced down a line and facing the counter
    //   - everyone else standing idles — a slow look around, instead of
    //     holding one heading like a chess piece
    const stallNodes = new Set();
    for (const it of this.infill.items)
      if (it.kind === "stall" && it.stage >= 1) {
        const pk = this.world.pockets[it.pocketIdx];
        pk && pk.navNode >= 0 && stallNodes.add(pk.navNode);
      }
    const talk = new Map(),
      qRank = new Map(); // workNode -> next place in that stall's queue
    {
      const standing = [];
      for (const c of this.agents)
        c.active &&
          c.path.length === 0 &&
          c.state === "gather" &&
          standing.push(c);
      for (let i = 0; i < standing.length; i++) {
        const c = standing[i];
        if (talk.has(c)) continue;
        let bj = -1,
          bd = 49; // pair only within 7m
        for (let j = i + 1; j < standing.length; j++) {
          const b = standing[j];
          if (talk.has(b)) continue;
          const d = (c.pos.x - b.pos.x) ** 2 + (c.pos.z - b.pos.z) ** 2;
          d < bd && ((bd = d), (bj = j));
        }
        bj >= 0 && (talk.set(c, standing[bj]), talk.set(standing[bj], c));
      }
    }
    // where a standing agent's scatter-nudge puts it — used both to place a
    // body and to aim its talking partner at it
    const sX = (c) => c.pos.x + Math.sin(c.offset * 37.7) * 2.1,
      sZ = (c) => c.pos.z + Math.cos(c.offset * 51.3) * 2.1;
    let a = -1;
    for (const c of this.agents) {
      if ((a++, !c.active)) continue;
      const l = a % 3,
        u = o[l],
        d = e + c.offset;
      if (c.path.length === 0) {
        if (d > 7.4 && d < 11 && c.state === "home")
          ((c.state = "towork"),
            this.goto(
              c,
              c.workNode >= 0
                ? c.workNode
                : n.length
                  ? n[(u * 3) % n.length]
                  : c.homeNode,
            ));
        else if (d > 12 && d < 16.6 && c.state === "work" && r() < t * 0.02) {
          c.state = "wander";
          const f = s.length ? s[Math.floor(r() * s.length)] : c.homeNode;
          this.goto(c, f);
        } else if (
          d > 16.8 &&
          d < 19.4 &&
          (c.state === "work" || c.state === "wander")
        ) {
          c.state = "gather";
          const f = s.length ? s[Math.floor(r() * s.length)] : c.homeNode;
          this.goto(c, f);
        } else if (
          (d > 19.6 || d < 6) &&
          c.state !== "home" &&
          c.state !== "tohome"
        )
          ((c.state = "tohome"), this.goto(c, c.homeNode));
        else if (c.state === "towork") c.state = "work";
        else if (c.state === "tohome") c.state = "home";
        else if (r() < t * 0.004) {
          const f = this.world.nav.nearest(c.pos, 14);
          if (f >= 0) {
            const m = [...this.world.nav.nodes[f].links.keys()];
            m.length && this.goto(c, m[Math.floor(r() * m.length)]);
          }
        }
      }
      if (c.path.length >= 2) {
        const f = c.path[c.seg],
          m = c.path[c.seg + 1],
          _ = f.distanceTo(m);
        ((c.segT += (c.speed * t) / Math.max(_, 0.01)),
          c.segT >= 1
            ? (c.seg++,
              (c.segT = 0),
              c.seg >= c.path.length - 1 &&
                (c.pos.copy(c.path[c.path.length - 1]), (c.path = [])))
            : c.pos.lerpVectors(f, m, c.segT));
      }
      c.bob += t * (c.path.length ? 9 : 1.2);
      this.dummy.position.copy(c.pos);
      // where a standing body should aim itself, if anywhere in particular
      let faceX = null,
        faceZ = null;
      if (!c.path.length) {
        if (c.state === "work" && stallNodes.has(c.workNode)) {
          // the stall queue: file back from the counter along a direction
          // hashed off the nav node, everyone facing the stall
          const k = qRank.get(c.workNode) ?? 0;
          qRank.set(c.workNode, k + 1);
          const qa = (c.workNode * 2.399) % (Math.PI * 2),
            qd = 1.1 + 0.78 * k;
          ((this.dummy.position.x +=
            Math.sin(qa) * qd + Math.sin(c.offset * 9.1) * 0.14),
            (this.dummy.position.z +=
              Math.cos(qa) * qd + Math.cos(c.offset * 9.1) * 0.14),
            (faceX = c.pos.x),
            (faceZ = c.pos.z));
        } else {
          ((this.dummy.position.x += Math.sin(c.offset * 37.7) * 2.1),
            (this.dummy.position.z += Math.cos(c.offset * 51.3) * 2.1));
          const p = talk.get(c);
          p && ((faceX = sX(p)), (faceZ = sZ(p)));
        }
      }
      this.dummy.position.y += c.path.length
        ? Math.abs(Math.sin(c.bob)) * 0.06
        : 0;
      if (c.path.length >= 2) {
        const f = c.path[Math.min(c.seg + 1, c.path.length - 1)];
        this.dummy.lookAt(f.x, this.dummy.position.y, f.z);
      } else if (faceX !== null)
        // face the partner or the counter, with the small sway of somebody
        // actually talking, or actually waiting
        this.dummy.rotation.set(
          0,
          Math.atan2(
            faceX - this.dummy.position.x,
            faceZ - this.dummy.position.z,
          ) +
            Math.sin(c.bob * 0.6) * 0.07,
          0,
        );
      else
        // idle: look around slowly instead of holding one heading
        this.dummy.rotation.set(
          0,
          c.offset * 23.1 + Math.sin(c.bob * 0.31) * 0.5,
          0,
        );
      const lk = this.look[a];
      if (a === this.speaker) {
        // the speaker reads as someone: HUD magenta, and the mark turning
        // slowly overhead, riding their walk
        const mk = this.marker;
        ((mk.visible = !0),
          mk.position.set(
            this.dummy.position.x,
            this.dummy.position.y + 2.15 + Math.sin(c.bob * 0.35) * 0.12,
            this.dummy.position.z,
          ),
          (mk.rotation.y += t * 1.4));
      }
      (this.dummy.scale.set(lk.sx, lk.sy, lk.sx), this.dummy.updateMatrix());
      // Level chosen HERE rather than at the top of the loop, because the
      // position is only final now — ambient life nudges standing agents by
      // up to 2.1m after the fact.
      //
      // Two thresholds, not one. An agent sitting exactly on a single
      // boundary would swap build every time it breathed; NEAR and FAR leave
      // a 5m dead band, so a level only changes when an agent has committed
      // to crossing it. The head is 260mm, so at a 1080-tall viewport it is
      // about 22px at NEAR and 18px at FAR — the range where a face stops
      // being resolvable at all.
      if (cam) {
        const dx = this.dummy.position.x - cam.position.x,
          dy = this.dummy.position.y - cam.position.y,
          dz = this.dummy.position.z - cam.position.z,
          d2 = dx * dx + dy * dy + dz * dz;
        c.lod = c.lod ? (d2 < NEAR_D2 ? 0 : 1) : d2 > FAR_D2 ? 1 : 0;
      } else c.lod = 0;
      const mi = c.lod * 3 + l,
        h = this.meshes[mi],
        w = cnt[mi]++;
      (h.setMatrixAt(w, this.dummy.matrix),
        h.setColorAt(w, a === this.speaker ? this.speakerCol : lk.col),
        (o[l] = u + 1));
    }
    for (let c = 0; c < this.meshes.length; c++)
      ((this.meshes[c].count = cnt[c]),
        (this.meshes[c].instanceMatrix.needsUpdate = !0),
        this.meshes[c].instanceColor &&
          (this.meshes[c].instanceColor.needsUpdate = !0));
  }
}
/** Head centre, and the height the sculpt is scaled to fill. */
const HEAD_Y = 1.46,
  HEAD_H = 0.26;

/**
 * The head. The geometry lives in 24-citizen-head, baked from
 * karaoke-headset's Tripo-generated mannequin — see tools/bake-head.ts for
 * what was done to it and why it is baked rather than loaded.
 *
 * Kept as a named function here because it is what Po and the model inspector
 * both reach for, and because the previous two attempts at this — flat marks,
 * then a gaussian-displaced sphere — both lived behind this same name.
 */
function headGeometry() {
  return citizenHead();
}

/**
 * A cap over the back and top of the skull, for the hooded variant.
 *
 * DELIBERATELY A CAP AND NOT A HOOD. An earlier version extended the cone
 * itself down over the head to the shoulders, and a point above a fully
 * enclosed head with a recessed face is a silhouette this game is not going
 * anywhere near. The three things that produced it are all avoided here on
 * purpose: this is ROUNDED rather than pointed and is a separate piece from
 * the cone, it STOPS above the nape rather than draping to the shoulders, and
 * the face and jaw stay completely open.
 *
 * Built as an ellipsoid a few millimetres proud of the skull with the front
 * cut away — keep a triangle only if it faces up and back. That cut is what
 * leaves the face open, and moving CUT toward -1 grows the cap forward over
 * the brow, which is the direction NOT to take it.
 *
 * About 120 triangles on geometry every instance shares.
 */
function skullCap(seg: number) {
  // the baked skull runs 1.408 (chin) to 1.668 (crown), 264mm across and
  // 342mm deep; sit just outside that
  // 26x18 rather than 14x10. The rim is a per-triangle cut, so its raggedness
  // is the size of one triangle — the only way to smooth it without snapping
  // vertices to the cut line is to make the triangles smaller. This takes the
  // cap from 136 to 545, which against ~3,200 for the citizen is
  // not worth being clever about.
  const CY = 1.545,
    g = new SphereGeometry(1, seg, Math.round(seg * 0.7));
  g.scale(0.143, 0.142, 0.183);
  const p = g.attributes.position,
    idx = g.index!,
    // up and back: the direction the cap covers
    NX = 0,
    NY = 0.38,
    NZ = -0.925,
    CUT = -0.3,
    keep: number[] = [];
  for (let f = 0; f < idx.count; f += 3) {
    const a = idx.getX(f),
      b = idx.getX(f + 1),
      c = idx.getX(f + 2);
    let dx = 0,
      dy = 0,
      dz = 0;
    for (const v of [a, b, c])
      ((dx += p.getX(v)), (dy += p.getY(v)), (dz += p.getZ(v)));
    const l = Math.hypot(dx, dy, dz) || 1;
    if ((dx * NX + dy * NY + dz * NZ) / l > CUT) keep.push(a, b, c);
  }
  return (g.setIndex(keep), g.translate(0, CY, -0.008), g);
}

/**
 * One citizen silhouette, at one level of detail.
 *
 * `lod` 0 is the near build with the baked face; 1 is the far one, where the
 * head becomes an ellipsoid matching the same bounding box. Matching the box
 * matters more than it sounds: the two have to occupy the same silhouette or
 * the swap reads as a pop rather than as detail arriving.
 */
/**
 * The far head: an ellipsoid on the SAME bounding box as the baked one.
 *
 * The baked skull runs 1.408 to 1.668 and measures 264 x 260 x 342mm, so this
 * matches those extents rather than being a round ball. Sharing the silhouette
 * is what stops the level swap reading as a pop — at the distance it happens,
 * the outline is essentially all that is left of a citizen, so if the outline
 * matches, nothing visibly changes.
 */
/**
 * Level thresholds, as squared distances so the frame loop never takes a root.
 *
 * 21m in, 26m out. At a 1080-tall viewport the 260mm head is about 22px at the
 * near bound and 18px at the far one, which is where the face stops resolving.
 * The orbit camera normally sits 100-500m out, so in practice the whole
 * population is far and the near meshes draw nothing; WANDER is what brings
 * the detail in, which is the one place anybody is close enough to see it.
 */
const NEAR_D2 = 21 * 21,
  FAR_D2 = 26 * 26;

function farHead() {
  const g = new SphereGeometry(1, 8, 6);
  // Crown matched to the baked head at 1.668, but the base carried down to
  // 1.37 — INSIDE the shoulder cone, whose top is at 1.40. The baked head has
  // a neck stub filling that notch; an ellipsoid tapering to a point above a
  // 190mm-wide cone leaves a visible gap and the head reads as floating.
  // Stretching it down is free, where a neck would be another twenty faces.
  return (g.scale(0.132, 0.15, 0.171), g.translate(0, 1.52, 0), g);
}

function Po(i, lod = 0) {
  // how many trailing geometries are headwear rather than body
  let cloth = 0;
  const t = [],
    e = new CylinderGeometry(0.14, 0.26, 1.32, 7);
  e.translate(0, 0.66, 0);
  // At the far level the 3,108-triangle face is spent on something a few
  // pixels tall. An 8x6 ellipsoid on the same bounds is 84 triangles and,
  // past about 25 metres, indistinguishable.
  const n = lod ? farHead() : headGeometry();
  const s = new CylinderGeometry(0.19, 0.14, 0.3, 7);
  if ((s.translate(0, 1.25, 0), t.push(e, s, n), i === 1)) {
    const r = new CylinderGeometry(0.025, 0.03, 1.8, 5);
    (r.rotateX(0.12), r.translate(0.24, 0.9, 0.1), t.push(r));
    const o = new CylinderGeometry(0.05, 0.06, 0.45, 5);
    (o.rotateZ(-1.1), o.translate(0.16, 1.18, 0.06), t.push(o));
  } else if (i === 2) {
    const r = new CylinderGeometry(0.045, 0.06, 0.62, 5);
    (r.rotateZ(-1.35),
      r.rotateY(0.2),
      r.translate(0.3, 1.32, 0.05),
      t.push(r),
      e.rotateZ(-0.06));
    const o = new SphereGeometry(0.14, 6, 5);
    (o.scale(1, 0.75, 1), o.translate(-0.2, 0.82, 0), t.push(o));
  } else {
    // The cone, leaned back off the crown. Pivoted about its BASE — moved so
    // the base sits at the origin, leaned, then seated — because rotating it
    // where it stands swings the base forward through the forehead as the
    // point goes back. 0.3 radians, about 17 degrees.
    //
    // 110mm wide, not the 150mm it was upright: leaning raises the front of
    // the base ring to where the skull has narrowed, and a wider ring pushes
    // past the brow and reads as a flap across the forehead.
    const r = new ConeGeometry(0.11, 0.32, 7);
    (r.translate(0, 0.16, 0),
      r.rotateX(-0.3),
      r.translate(0, 1.6, -0.025),
      t.push(r));
    t.push(skullCap(lod ? 10 : 26));
    // the cone and the cap are ONE garment, so they share a tint — and the
    // tint is what makes them read as worn rather than as more skull. Left at
    // 1 the cap is the same tone as the head it covers and simply looks like
    // a bigger head, which is what "too much of the back of the head is
    // showing" actually was.
    cloth = 2;
  }
  // Every piece is untinted except the headwear, which is darker so it reads
  // as cloth over the skull rather than as part of it.
  const tints = t.map(() => 1);
  for (let q = 0; q < cloth; q++) tints[tints.length - 1 - q] = 0.55;
  return O_(t, tints);
}
/**
 * Merge to one non-indexed buffer, carrying a flat tint per source geometry.
 *
 * The tint becomes a vertex colour, which is the only way to get a DARK mark
 * on a citizen: the whole population is three InstancedMeshes and each
 * instance already spends its one colour on clothing, so features cannot be
 * coloured per instance. Vertex colour multiplies underneath that, so a mark
 * at 0.2 comes out dark against whatever the citizen happens to be wearing
 * rather than fighting it.
 *
 * Costs three floats per vertex on a geometry that is shared by every
 * instance — not per citizen — plus the multiply three already does when
 * vertexColors is on.
 */
function O_(i, tints?: number[]) {
  let t = 0;
  const e = i.map((a) => a.toNonIndexed());
  for (const a of e) t += a.attributes.position.count;
  const n = new Float32Array(t * 3),
    s = new Float32Array(t * 3),
    c = new Float32Array(t * 3);
  let r = 0;
  for (let k = 0; k < e.length; k++) {
    const a = e[k],
      cnt = a.attributes.position.count,
      tint = tints?.[k] ?? 1;
    (n.set(a.attributes.position.array, r * 3),
      s.set(a.attributes.normal.array, r * 3),
      c.fill(tint, r * 3, (r + cnt) * 3),
      (r += cnt),
      a.dispose());
  }
  const o = new BufferGeometry();
  return (
    o.setAttribute("position", new BufferAttribute(n, 3)),
    o.setAttribute("normal", new BufferAttribute(s, 3)),
    o.setAttribute("color", new BufferAttribute(c, 3)),
    o
  );
}
// District names drift where the technology drifted and refuse where it
// didn't. The light words went technical (Sodium, Halogen); the water and
// garden words name things that never stopped existing. "Candle" stays on
// purpose — a quarter still called the Candle Quarter, long after candles,
// is how real place-names behave.
const z_ = ["Lantern", "Sodium", "Candle"],
  k_ = ["Cistern", "Runoff", "Well"],
  B_ = ["Garden", "Laurel", "Green"],
  H_ = ["Quiet", "Sleeping", "Patient"],
  G_ = ["Halogen", "Morning", "White"];
function Rh(i, t) {
  const e = t.items.filter((c) => c.stage >= 1);
  if (e.length < 2) return [];
  const n = e.map((c, l) => l),
    s = (c) => (n[c] === c ? c : (n[c] = s(n[c]))),
    r = (c, l) => {
      n[s(c)] = s(l);
    };
  for (let c = 0; c < e.length; c++) {
    const l = i.pockets[e[c].pocketIdx];
    if (l)
      for (let h = c + 1; h < e.length; h++) {
        const u = i.pockets[e[h].pocketIdx];
        if (!u) continue;
        Math.hypot(l.pos[0] - u.pos[0], l.pos[2] - u.pos[2]) +
          Math.abs(l.pos[1] - u.pos[1]) * 1.5 <
          26 && r(c, h);
      }
  }
  const o = new Map();
  for (let c = 0; c < e.length; c++) {
    const l = s(c);
    let h = o.get(l);
    (h || ((h = []), o.set(l, h)), h.push(c));
  }
  const a = [];
  for (const c of o.values()) {
    if (c.length < 3) continue;
    let l = 0,
      h = 0,
      u = 0;
    const d = new Map();
    let f = 0,
      m = 0,
      _ = 0,
      g = 0;
    for (const R of c) {
      const E = e[R],
        C = i.pockets[E.pocketIdx];
      ((l += C.pos[0]),
        (h += C.pos[1]),
        (u += C.pos[2]),
        d.set(C.kind, (d.get(C.kind) ?? 0) + 1),
        E.kind === "garden" && m++,
        C.waterDist < 35 && _++,
        C.light < 0.5 && g++);
    }
    ((l /= c.length), (h /= c.length), (u /= c.length));
    for (const R of i.actions)
      R.t === "emb" &&
        R.kind === "lantern" &&
        Math.hypot(R.x - l, R.z - u) < 24 &&
        f++;
    const p = seededRng(hashString(`d${Math.round(l)}:${Math.round(u)}`)),
      A = [...d.entries()].sort((R, E) => E[1] - R[1])[0][0];
    let b = "Quarter";
    A === "under_arch"
      ? (b = "Underpass")
      : A === "landing"
        ? (b = "Stairs")
        : A === "interior"
          ? (b = "Vaults")
          : A === "deck"
            ? (b = h > 12 ? "High Row" : "Bridge Row")
            : h > 14 && (b = "Terrace");
    let v = H_;
    (f >= 2
      ? (v = z_)
      : m >= 2
        ? (v = B_)
        : _ > c.length / 2
          ? (v = k_)
          : g < c.length / 3 && (v = G_),
      a.push({
        name: `The ${r_(p, v)} ${b}`,
        x: l,
        y: h + 7,
        z: u,
        size: c.length,
      }));
  }
  return (a.sort((c, l) => l.size - c.size), a.slice(0, 7));
}
const gameState = {
  res: { stone: 700, salvage: 160, favor: 12 },
  playerActions: [],
  nextId: 1e3,
  plates: [],
  cityName: "CAPRICCIO",
  doneRequests: new Set(),
  dirty: !1,
  folio: !1,
};
/** Both resources accrue on their own, per game-hour, and stop dead at a cap.
 * No building produces them and no amount of play changes the rate — which is
 * a pacing device, not an oversight. A9 makes the rate and the cap legible in
 * the HUD, which imports these rather than repeating the numbers, so the two
 * cannot drift apart. */
const STONE_RATE = 18,
  SALVAGE_RATE = 6,
  STONE_CAP = 2600,
  SALVAGE_CAP = 900;
function V_(i) {
  ((gameState.res.stone = Math.min(
    STONE_CAP,
    gameState.res.stone + i * STONE_RATE,
  )),
    (gameState.res.salvage = Math.min(
      SALVAGE_CAP,
      gameState.res.salvage + i * SALVAGE_RATE,
    )));
}
function Fl(i) {
  return gameState.folio
    ? !0
    : gameState.res.stone >= i.stone &&
        gameState.res.salvage >= (i.salvage || 0);
}
function W_(i) {
  gameState.folio ||
    ((gameState.res.stone -= i.stone),
    (gameState.res.salvage -= i.salvage || 0),
    (gameState.dirty = !0));
}
function X_() {
  return gameState.folio
    ? 160
    : gameState.res.favor >= 150
      ? 150
      : gameState.res.favor >= 60
        ? 95
        : 55;
}
const Ch = "capriccio-save-v1";

// --- generated exports ---
export {
  Ch,
  FAR_D2,
  NEAR_D2,
  headGeometry,
  Citizens,
  Fl,
  Po,
  Rh,
  SALVAGE_CAP,
  SALVAGE_RATE,
  STONE_CAP,
  STONE_RATE,
  V_,
  W_,
  X_,
  gameState,
};
