// CAPRICCIO introspection helpers.
//
// Paste any single expression below into the devtools console (or run via
// the browser javascript_tool) against http://127.0.0.1:8123.
//
// Why this file exists: the bundle is minified to death, but the build
// exposes `window.CAP`. Every question about the running game is better
// answered here than by reading source.
//
// Two gotchas learned the hard way:
//   1. Don't stringify three.js objects raw — a Scene serializes to megabytes
//      and will blow the output limit. Use CAPX.clip below.
//   2. Don't dump function .toString() bodies; the content filter flags them.

globalThis.CAPX = {
  // ---- safe serializer: collapses three.js objects to short tags ----
  clip(o, space = 2) {
    return JSON.stringify(
      o,
      (k, v) => {
        if (v && v.isObject3D) return "[Object3D:" + v.type + "]";
        if (v && v.isVector3)
          return { x: +v.x.toFixed(2), y: +v.y.toFixed(2), z: +v.z.toFixed(2) };
        if (v && v.isBufferGeometry) return "[Geometry]";
        if (v && v.isMaterial) return "[Material:" + (v.type || "") + "]";
        if (v && v.isTexture) return "[Texture]";
        return v;
      },
      space,
    );
  },

  // ---- structural probe: keys + prototype methods + collection sizes ----
  probe(v) {
    if (!v || typeof v !== "object") return v;
    const proto = Object.getPrototypeOf(v);
    const methods =
      proto && proto !== Object.prototype
        ? Object.getOwnPropertyNames(proto).filter((n) => n !== "constructor")
        : [];
    return {
      ctor: v.constructor && v.constructor.name,
      keys: Object.keys(v).slice(0, 30),
      methods: methods.slice(0, 30),
      collections: Object.fromEntries(
        Object.entries(v)
          .filter(
            (e) =>
              e[1] instanceof Map || e[1] instanceof Set || Array.isArray(e[1]),
          )
          .map((e) => [
            e[0],
            e[1].size !== undefined ? e[1].size : e[1].length,
          ]),
      ),
    };
  },

  // ---- numeric summary ----
  num(a) {
    if (!a.length) return null;
    return {
      min: +Math.min(...a).toFixed(2),
      max: +Math.max(...a).toFixed(2),
      mean: +(a.reduce((s, x) => s + x, 0) / a.length).toFixed(2),
    };
  },

  tally(arr, fn) {
    return arr.reduce((m, x) => {
      const k = fn(x);
      m[k] = (m[k] || 0) + 1;
      return m;
    }, {});
  },

  vals(m) {
    return m instanceof Map ? [...m.values()] : m instanceof Set ? [...m] : m;
  },

  // ---- one-shot snapshot of the whole simulation ----
  snapshot() {
    const w = CAP.world,
      c = CAP.citizens;
    const pockets = CAPX.vals(w.pockets),
      structs = CAPX.vals(w.structures);
    const live = c.agents.filter((a) => a.active);
    return {
      time: { ...CAP.time, hour: +CAP.time.hour.toFixed(2) },
      res: CAP.state.res,
      playerActions: CAP.state.playerActions.length,
      agents: {
        pool: c.agents.length,
        active: live.length,
        population: c.population,
        states: CAPX.tally(live, (a) => a.state),
      },
      pockets: {
        count: pockets.length,
        kinds: CAPX.tally(pockets, (p) => p.kind),
        occupied: pockets.filter((p) => p.occupiedBy >= 0).length,
        designated: pockets.filter((p) => p.designation).length,
        withWater: pockets.filter((p) => p.waterDist < 1e8).length,
        shelter: CAPX.num(pockets.map((p) => p.shelter)),
        light: CAPX.num(pockets.map((p) => p.light)),
        scenic: CAPX.num(pockets.map((p) => p.scenic)),
        area: CAPX.num(pockets.map((p) => p.area)),
      },
      structures: {
        count: structs.length,
        types: CAPX.tally(structs, (s) => s.action.t),
      },
      request: CAP.requests.active && CAP.requests.active.text,
      queued: CAP.requests.queue.length,
    };
  },

  // ---- diff two snapshots: the fastest way to learn what an action does ----
  //   const before = CAPX.snapshot();  /* do a thing */  CAPX.diff(before);
  diff(before, after) {
    after = after || CAPX.snapshot();
    const walk = (a, b, path = "") => {
      const out = {};
      for (const k of new Set([
        ...Object.keys(a || {}),
        ...Object.keys(b || {}),
      ])) {
        const av = a && a[k],
          bv = b && b[k];
        if (av && bv && typeof av === "object" && typeof bv === "object") {
          const sub = walk(av, bv, path + k + ".");
          if (Object.keys(sub).length) out[k] = sub;
        } else if (av !== bv) {
          out[k] =
            typeof av === "number" && typeof bv === "number"
              ? `${av} → ${bv}  (${bv - av >= 0 ? "+" : ""}${+(bv - av).toFixed(3)})`
              : `${JSON.stringify(av)} → ${JSON.stringify(bv)}`;
        }
      }
      return out;
    };
    return walk(before, after);
  },

  // ---- pocket occupancy detail ----
  occupancy() {
    return CAPX.vals(CAP.world.pockets)
      .filter((p) => p.occupiedBy >= 0)
      .map((p) => ({
        kind: p.kind,
        by: p.occupiedBy,
        desig: p.designation,
        shelter: p.shelter,
        light: p.light,
        scenic: p.scenic,
        water: p.waterDist < 1e8 ? +p.waterDist.toFixed(1) : null,
      }));
  },

  // ---- the save blob, as the game would write it ----
  save() {
    CAP.doSave && CAP.doSave();
    const raw = localStorage.getItem("capriccio-save-v1");
    if (!raw) return null;
    const v = JSON.parse(raw);
    return {
      bytes: raw.length,
      totalActions: v.actions.length,
      actionTypes: [...new Set(v.actions.map((a) => a.t))],
      keys: Object.keys(v),
      firstActions: v.actions.slice(0, 5),
      res: v.res,
      day: v.day,
      hour: v.hour,
      folio: v.folio,
      plates: v.plates && v.plates.length,
    };
  },
};

("CAPX ready — try CAPX.snapshot()");
