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
class Requests {
  constructor() {
    defineField(this, "active", null);
    defineField(this, "queue");
    defineField(this, "onDone", null);
    defineField(this, "onNew", null);
    defineField(this, "flavorIdx", 0);
    this.resync();
  }
  /**
   * Rebuild the queue from the master list, dropping anything already done.
   *
   * There are exactly FIVE requests in the game, ever. `doneRequests` persists
   * in the save, so completing one removes it permanently. Once all five are
   * finished the queue is empty and the only remaining source of clearance is
   * engraving plates. See docs/PROGRESSION.md.
   */
  resync() {
    ((this.queue = j_.filter((t) => !gameState.doneRequests.has(t.id))),
      (this.active = this.queue[0] ?? null));
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
        this.active)
      ) {
        const s = this.active;
        setTimeout(() => this.onNew?.(s), 9e3);
      }
    }
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
