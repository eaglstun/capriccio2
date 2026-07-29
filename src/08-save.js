// Save / load — the event-sourced action log
//
// Extracted from public/assets/index-DCXbw2vV.js, bundle lines
// 28849–28876. Statements are verbatim; identifiers are
// renamed via src/renames.json. Imports and exports are generated.
// Regenerate: python3 tools/split_bundle.py --write

// --- generated imports ---
import { Ch, gameState } from "./07-citizens.js";
// --- end generated imports ---

/**
 * Write the whole game to localStorage under `Ch` ("capriccio-save-v1").
 *
 * The save is an ACTION LOG, not a world snapshot — `actions` is every build
 * the player has made, and `loadGame`'s caller replays them through
 * `World.applyAction` to reconstruct the city. See docs/SIMULATION.md.
 *
 * Two consequences worth knowing:
 *   - Construction must stay deterministic. Every mesh builder seeds its PRNG
 *     from the action id, so a replay rebuilds the identical city.
 *   - The seeded starting ruins are NOT in here. They are regenerated at world
 *     gen and deliberately kept out of the player log, which keeps saves small
 *     and the ruins canonical.
 *
 * `i` carries the frame-local bits the caller owns: {day, hour, infill}, where
 * infill is `InfillSystem.serialize()` — the vernacular buildings, which are
 * procedural and so cannot be derived from the action log alone.
 *
 * Only the last 16 plates survive. That cap is the game's closest thing to a
 * goal: engraving a seventeenth pushes the oldest out of the record forever.
 *
 * Failure is swallowed: a full or disabled localStorage must not take the game
 * down mid-play.
 */
function saveGame(i) {
  const t = {
    v: 1,
    actions: gameState.playerActions,
    day: i.day,
    hour: i.hour,
    res: gameState.res,
    infill: i.infill,
    plates: gameState.plates.slice(-16),
    cityName: gameState.cityName,
    doneRequests: [...gameState.doneRequests],
    folio: gameState.folio,
  };
  try {
    localStorage.setItem(Ch, JSON.stringify(t));
  } catch {}
  gameState.dirty = !1;
}
/**
 * Read the save back, or null if there isn't a usable one.
 *
 * Returns null on all three failure modes — absent, unparseable, or written by
 * a different schema version — so the caller has exactly one case to handle:
 * null means "start fresh". The version gate is a hard equality check rather
 * than a range, so a future format cannot be half-read by this build.
 */
function loadGame() {
  try {
    const i = localStorage.getItem(Ch);
    if (!i) return null;
    const t = JSON.parse(i);
    if (t.v !== 1) return null;
    // A14: the second resource was renamed timber -> salvage. Same field,
    // same economy; migrate saves written before the rename.
    if (t.res && t.res.salvage === undefined && t.res.timber !== undefined)
      ((t.res.salvage = t.res.timber), delete t.res.timber);
    return t;
  } catch {
    return null;
  }
}

// --- generated exports ---
export { loadGame, saveGame };
