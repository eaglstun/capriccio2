// Save / load — the event-sourced action log
//
// Extracted from public/assets/index-DCXbw2vV.js, bundle lines
// 28849–28876. Statements are verbatim; identifiers are
// renamed via src/renames.json. Imports and exports are generated.
// Regenerate: python3 tools/split_bundle.py --write

// --- generated imports ---
import { Ch, gameState } from "./07-citizens.js";
// --- end generated imports ---

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
function loadGame() {
  try {
    const i = localStorage.getItem(Ch);
    if (!i) return null;
    const t = JSON.parse(i);
    return t.v !== 1 ? null : t;
  } catch {
    return null;
  }
}

// --- generated exports ---
export { loadGame, saveGame };
