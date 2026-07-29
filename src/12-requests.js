// Citizen petitions and their flavour text
//
// Extracted from public/assets/index-DCXbw2vV.js, bundle lines
// 29456–29573. Statements are verbatim; identifiers are
// renamed via src/renames.json. Imports and exports are generated.
// Regenerate: python3 tools/split_bundle.py --write

// --- generated imports ---
import { Vector3 } from "three";
import { Vr } from "./01-materials.js";
import { Th } from "./05-world.js";
import { gameState } from "./07-citizens.js";
import { defineField } from "./_runtime.js";
// --- end generated imports ---
// hand-added: the request generator derives its speaker/wording choices
// deterministically from the request id
import { hashString } from "./01-materials.js";

const j_ = [
    {
      id: "reach-terrace",
      text: "“The high terrace has been beyond us since the old stair fell. Tullia still talks of gardens up there.” — Marcus, lattice technician",
      favor: 70,
      thanks:
        "The way up is open. Children raced to the top before the mortar dried.",
      done: (i) => {
        const t = i.nav.nearest(new Vector3(-18, 0, 28), 24),
          e = i.nav.nearest(Vr.terraceCenter, 40);
        return t < 0 || e < 0 ? !1 : i.nav.path(t, e).length > 0;
      },
    },
    {
      id: "water-terrace",
      text: "“No water climbs so high. The spring across the great void mocks us every dry summer.” — Tullia",
      favor: 90,
      thanks:
        "Water crosses the void on stone legs. Tullia planted the first bed the same evening.",
      // A8. This is the hardest thing in the game and nothing used to help with
      // it: the shortest leg of the crossing is 34 units and the longest 142,
      // against a max span of 55 below 60 clearance — so it cannot be done in
      // one reach at any clearance a player is likely to hold, and nothing said
      // so. The first line gestures at what carries water, the second at legs
      // standing in the gorge. Neither names a tool or a button; the point is
      // to provoke "I could put a pier IN the canyon", not to hand over a
      // recipe. Counted in growth ticks (~2.2s each), so the first arrives
      // after roughly two and a half minutes of the ask going unmet — long
      // enough to have tried and failed, which is when a hint is welcome
      // rather than insulting.
      hints: [
        {
          after: 68,
          text: "“They keep offering to carry it up in pails. Water does not climb — it lies down and travels, if something long enough carries it.” — Tullia",
        },
        {
          after: 164,
          text: "“The old crossing did not leap the gorge. It stood in it — legs in the dark, one short reach to the next.” — Marcus, lattice technician",
        },
      ],
      done: (i) => {
        for (const t of i.waterSources)
          if (t.y > 14 && t.x < 40 && t.z < -40) return !0;
        return !1;
      },
    },
    {
      id: "market-hall",
      text: "“Rain spoils the cloth every market-day. A roofed hall would change our lives.” — the weavers",
      favor: 60,
      thanks:
        "The stalls moved in under the vault within a week. It smells of bread and wet stone.",
      done: (i, t) => {
        for (const e of t.items) {
          if (e.kind !== "stall" || e.stage < 1) continue;
          const n = i.pockets[e.pocketIdx];
          if (
            n &&
            (n.kind === "interior" || n.kind === "under_arch") &&
            n.shelter > 0.7
          )
            return !0;
        }
        return !1;
      },
    },
    {
      id: "through-wall",
      text: "“The great wall makes a half-hour of a hundred metres. A door through it would spare old legs.” — Livia",
      favor: 50,
      thanks:
        "The passage breathes cool air through the wall. Livia sits in it at noon.",
      done: (i) => {
        const t = i.structures.get(Th);
        return !t || t.action.t !== "wall"
          ? !1
          : (t.action.openings ?? []).length > 0;
      },
    },
    {
      id: "evening-light",
      text: "“The under-arches go black after sunset. A few lanterns would make them kind.” — the night watch",
      favor: 30,
      thanks:
        "Small lights hum under the arches now. The dark feels inhabited, not empty.",
      done: (i) => {
        let t = 0;
        for (const e of i.actions)
          e.t === "emb" && e.kind === "lantern" && e.id >= 1e3 && t++;
        return t >= 3;
      },
    },
  ],
  kl = [
    "A trader asked the name of the city today. Nobody could quite agree.",
    "The drones have found the new arches. They roost where the swallows did.",
    "Someone chalked a game board onto the plaza steps. It stays.",
    "Old men argue about which arch is oldest. All of them are wrong.",
    "A cat has claimed the warmest panel. Construction routes around it.",
    "The masons hum while they work. The vaults hum back.",
    "Cable runs appeared between the columns overnight, like laundry lines.",
    "Children have invented seventeen names for the big pier. All are rude.",
  ];
// -------------------------------------------------------- generated requests
// After the five hand-authored petitions are done, the city keeps asking —
// but only when it has something real to ask about. The generator reads
// DEFICIENCIES from world state (a dark cluster of homes, a dry quarter, an
// exposed one, evenings with nowhere to land) and phrases them by the rules
// the hand five follow (docs/CHARACTERS.md): the ask is a specific physical
// grievance, never a building; the aftermath reports what people DID with
// the thing, never gratitude; nobody addresses the player, and nobody says
// thank you.
//
// The save format gains nothing. A generated id encodes its type and rounded
// location, so `doneRequests` retires that grievance at that place
// permanently, and an unfinished one is simply re-derived from the same
// world state after a reload. The speaker falls out of the existing
// hash-the-id derivation for free.

/** Find the densest cluster (>= 3) of OCCUPIED pockets matching `pred` —
 * quality nobody lives with is not a grievance. Returns its centroid,
 * size and kind mix, or null. */
function findCluster(world, pred) {
  const cand = world.pockets.filter((p) => p.occupiedBy >= 0 && pred(p));
  if (cand.length < 3) return null;
  let best = null;
  for (const seed of cand) {
    const near = cand.filter(
      (p) => Math.hypot(p.pos[0] - seed.pos[0], p.pos[2] - seed.pos[2]) < 24,
    );
    (!best || near.length > best.length) && (best = near);
  }
  if (!best || best.length < 3) return null;
  let x = 0,
    y = 0,
    z = 0;
  for (const p of best) ((x += p.pos[0]), (y += p.pos[1]), (z += p.pos[2]));
  const n = best.length;
  return { x: x / n, y: y / n, z: z / n, n, kinds: best.map((p) => p.kind) };
}

/** Two place-phrases for a cluster, from its dominant pocket kind and height
 * — physical features, the way the hand five name places. `locus` is
 * prepositional ("in the low streets"), `place` is the bare noun ("the low
 * streets") for verbs that need an object. */
function locusOf(c) {
  const tally = {};
  for (const k of c.kinds) tally[k] = (tally[k] ?? 0) + 1;
  const top = Object.entries(tally).sort((a, b) => b[1] - a[1])[0][0];
  if (top === "under_arch")
    return { locus: "under the arches", place: "the arches" };
  if (top === "interior")
    return { locus: "in the vaulted rooms", place: "the vaulted rooms" };
  if (top === "deck" || top === "landing")
    return { locus: "along the high walks", place: "the high walks" };
  return c.y > 12
    ? { locus: "up on the new terraces", place: "the new terraces" }
    : { locus: "in the low streets", place: "the low streets" };
}

const lanternsNear = (w, x, z, r) => {
  let n = 0;
  for (const a of w.actions)
    a.t === "emb" &&
      a.kind === "lantern" &&
      a.id >= 1e3 &&
      Math.hypot(a.x - x, a.z - z) < r &&
      n++;
  return n;
};
const ornamentsNear = (w, x, z, r) => {
  let n = 0;
  for (const a of w.actions)
    a.t === "emb" &&
      (a.kind === "statue" || a.kind === "fountain") &&
      a.id >= 1e3 &&
      Math.hypot(a.x - x, a.z - z) < r &&
      n++;
  return n;
};
const waterNear = (w, c) => {
  let n = 0;
  for (const t of w.waterSources)
    Math.hypot(t.x - c.x, t.z - c.z) < 40 && t.y > c.y - 8 && n++;
  return n;
};
const shelteredNear = (w, x, z, r) =>
  w.pockets.filter(
    (p) => p.shelter > 0.7 && Math.hypot(p.pos[0] - x, p.pos[2] - z) < r,
  ).length;
const gatherSpotsNear = (w, x, z, r) =>
  w.pockets.filter(
    (p) =>
      (p.scenic > 0.7 || p.designation === "gathering") &&
      Math.hypot(p.pos[0] - x, p.pos[2] - z) < r,
  ).length;

// Each kind: how to FIND the grievance, who might voice it, three ask /
// aftermath pairs (both halves always written together), a baseline where
// the completion is "more than there was", and the completion test itself.
// Speakers reuse the cast — the named three, the collectives, and the old
// men and the masons, who already exist in the ambient lines.
const GEN_KINDS = [
  {
    key: "dry",
    favor: 45,
    speakers: ["Tullia", "the weavers", "Marcus, lattice technician"],
    find: (w) => findCluster(w, (p) => p.waterDist > 55),
    lines: [
      [
        "Every jar {locus} climbs by hand. My shoulders know each stair by its weight.",
        "Water arrived {locus} and the stairs lost their dread. The jars stay on their shelves now.",
      ],
      [
        "The cisterns {locus} catch nothing but dust. One dry summer would empty us out.",
        "Water runs {locus} now. Basil first — pots of it on every sill within the week.",
      ],
      [
        "We queue an hour at the far spring while our own corner {locus} stays dry.",
        "The queue at the far spring has dissolved. Washing hangs {locus} on any excuse.",
      ],
    ],
    // pocket waterDist is a nav-ish measure, not euclidean, so a source can
    // already sit within euclidean range of a "dry" cluster. The completion
    // is therefore MORE water than there was, not water at all.
    baseline: (w, c) => waterNear(w, c),
    done: (w, c, base) => waterNear(w, c) > base,
  },
  {
    key: "dark",
    favor: 25,
    speakers: ["the night watch", "Livia", "the masons"],
    find: (w) => findCluster(w, (p) => p.light < 0.35),
    lines: [
      [
        "The dark comes early {locus}. We carry embers just to find our own doors.",
        "The lamps hum {locus} now. Someone reads on a step until far too late.",
      ],
      [
        "My rounds go blind {locus} after sunset — a hand on the wall, counting corners.",
        "The watch pass {locus} without counting now. The moths found the lamps first; then the cats.",
      ],
      [
        "The children will not cross {place} after dark. They say it swallows sound.",
        "The children dare each other {locus} at night now. It has stopped swallowing sound.",
      ],
    ],
    baseline: (w, c) => lanternsNear(w, c.x, c.z, 26),
    done: (w, c, base) => lanternsNear(w, c.x, c.z, 26) >= base + 2,
  },
  {
    key: "exposed",
    favor: 35,
    speakers: ["the weavers", "Livia", "the old men"],
    find: (w) => findCluster(w, (p) => p.shelter < 0.25),
    lines: [
      [
        "Rain finds every bed {locus}. We sleep packed into the one dry corner like cargo.",
        "The rain drums on stone above {place} now, and people sleep spread out like owners.",
      ],
      [
        "The wind crosses {place} with nothing to break it. Soup goes cold between pot and mouth.",
        "The wind breaks before it reaches {place} now. Cooking smells linger, which is its own invitation.",
      ],
      [
        "The looms {locus} sit under sailcloth, and the sailcloth has failed twice this month.",
        "The sailcloth came down {locus}. The looms run through weather, and the cloth keeps its colour.",
      ],
    ],
    baseline: (w, c) => shelteredNear(w, c.x, c.z, 26),
    done: (w, c, base) => shelteredNear(w, c.x, c.z, 26) >= base + 1,
  },
  {
    key: "gather",
    favor: 25,
    speakers: ["the old men", "Livia", "Tullia"],
    find: (w) => findCluster(w, (p) => gatherSpotsNear(w, p.pos[0], p.pos[2], 30) === 0),
    lines: [
      [
        "Evenings {locus} have nowhere to land. People stand in doorways, half in and half out.",
        "Evenings land {locus} now. Somebody brings a board and pieces; the same argument every night, gladly.",
      ],
      [
        "The old men have worn a hollow into a broken step {locus}, for want of anywhere better.",
        "The broken step sits empty. The old men hold court {locus} until the light goes.",
      ],
      [
        "There is no place {locus} to put a chair where anyone else would put theirs.",
        "Chairs appeared {locus} within days, and nobody will say who carried the first one out.",
      ],
    ],
    baseline: (w, c) => ornamentsNear(w, c.x, c.z, 22),
    done: (w, c, base) =>
      gatherSpotsNear(w, c.x, c.z, 32) > 0 ||
      ornamentsNear(w, c.x, c.z, 22) > base,
  },
];

class Requests {
  constructor() {
    defineField(this, "active", null);
    defineField(this, "queue");
    defineField(this, "onDone", null);
    defineField(this, "onNew", null);
    defineField(this, "onHint", null);
    // A8 hint pacing: growth ticks the current ask has gone unmet, and how many
    // of its hints have already been spoken. Deliberately NOT saved — hint
    // state is per-session, so a reload can hear them again. Persisting it
    // would mean a save key for a line of dialogue.
    defineField(this, "activeTicks", 0);
    defineField(this, "hintsShown", 0);
    defineField(this, "flavorIdx", 0);
    // generator pacing: `lull` counts quiet growth ticks once the hand five
    // are done, `genOffset` rotates which deficiency is looked for first
    defineField(this, "lull", 0);
    defineField(this, "genOffset", 0);
    this.resync();
  }
  /**
   * Rebuild the queue from the master list, dropping anything already done.
   *
   * There are exactly FIVE hand-authored requests. `doneRequests` persists in
   * the save, so completing one removes it permanently. Once all five are
   * finished the queue empties and the GENERATOR takes over: check() derives
   * further requests from real deficiencies in the world, one at a time.
   * See docs/PROGRESSION.md and the generator above.
   */
  resync() {
    ((this.queue = j_.filter((t) => !gameState.doneRequests.has(t.id))),
      (this.active = this.queue[0] ?? null),
      (this.activeTicks = 0),
      (this.hintsShown = 0));
  }
  /**
   * Test whether the active request is satisfied; if so pay out and advance.
   *
   * Called every growth tick with the world and infill. Each request carries
   * its own `done(world, infill)` predicate, so the completion condition lives
   * with the request rather than here.
   *
   * The payout is clearance (`res.favor`), which is never spent — it is tested
   * against thresholds that raise the maximum span and vault length, and it
   * feeds the growth demand formula. Finishing the first request roughly
   * doubles how large the city can get.
   *
   * The next request is announced on a 9s delay so the completion toast is
   * read before the new ask arrives.
   */
  check(t, e) {
    if (this.active && this.active.done(t, e)) {
      ((gameState.res.favor += this.active.favor),
        gameState.doneRequests.add(this.active.id));
      const n = this.active;
      if (
        ((this.queue = this.queue.filter((s) => s !== n)),
        this.onDone?.(n),
        (this.active = this.queue[0] ?? null),
        (this.lull = 0),
        (this.activeTicks = 0),
        (this.hintsShown = 0),
        this.active)
      ) {
        const s = this.active;
        setTimeout(() => this.onNew?.(s), 9e3);
      }
      return;
    }
    // A8: the ask is still unmet. Count how long it has been so, and let the
    // request speak again if it carries hints and enough has gone by. One at a
    // time, in order, and only as many as it defines — never a loop.
    if (this.active) {
      this.activeTicks++;
      const s = this.active.hints?.[this.hintsShown];
      s &&
        this.activeTicks >= s.after &&
        (this.hintsShown++, this.onHint?.(s.text));
    }
    // the mid-game: once the hand five are finished and nothing is being
    // asked, let the city sit quiet for ~30s of ticks, then look for a real
    // deficiency to voice. No deficiency, no request — silence over filler.
    if (!this.active && this.queue.length === 0 && ++this.lull >= 14) {
      this.lull = 0;
      const n = this.generate(t);
      n && ((this.queue = [n]), (this.active = n), this.onNew?.(n));
    }
  }
  /**
   * Derive one request from the world's worst current deficiency, or null.
   *
   * Rotates the starting deficiency so a city with several problems is asked
   * about them in turn. Wording, speaker and location phrase are all
   * deterministic in the id, so a reload re-derives the identical request.
   */
  generate(t) {
    for (let e = 0; e < GEN_KINDS.length; e++) {
      const n = GEN_KINDS[(e + this.genOffset) % GEN_KINDS.length],
        s = n.find(t);
      if (!s) continue;
      const r = `g:${n.key}:${Math.round(s.x / 8)}:${Math.round(s.z / 8)}`;
      if (gameState.doneRequests.has(r)) continue;
      const o = hashString(r),
        a = locusOf(s),
        fill = (str) =>
          str.replaceAll("{locus}", a.locus).replaceAll("{place}", a.place),
        c = n.lines[o % n.lines.length],
        l = n.speakers[(o >>> 3) % n.speakers.length],
        h = n.baseline(t, s);
      return (
        this.genOffset++,
        {
          id: r,
          text: `“${fill(c[0])}” — ${l}`,
          favor: n.favor,
          thanks: fill(c[1]),
          done: (u) => n.done(u, s, h),
          generated: !0,
        }
      );
    }
    return null;
  }
  /** Cycle to the next ambient citizen line shown between requests. */
  nextFlavor() {
    return (
      (this.flavorIdx = (this.flavorIdx + 1) % kl.length),
      kl[this.flavorIdx]
    );
  }
}

// --- generated exports ---
export { Requests };
