// Save / load — the event-sourced action log
//
// Extracted verbatim from public/assets/index-DCXbw2vV.js,
// lines 28849–28876.
// Identifiers are minifier-mangled; nothing here has been renamed.
// Regenerate with: python3 tools/split_bundle.py --write

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
    doneRequests: [...yt.doneRequests],
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
