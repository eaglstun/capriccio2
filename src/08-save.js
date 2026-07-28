// Save / load — the event-sourced action log
//
// Extracted verbatim from public/assets/index-DCXbw2vV.js,
// lines 28849–28876.
// Identifiers are minifier-mangled; nothing here has been renamed.
// Regenerate with: python3 tools/split_bundle.py --write

function q_(i) {
  const t = {
    v: 1,
    actions: yt.playerActions,
    day: i.day,
    hour: i.hour,
    res: yt.res,
    infill: i.infill,
    plates: yt.plates.slice(-16),
    cityName: yt.cityName,
    doneRequests: [...yt.doneRequests],
    folio: yt.folio,
  };
  try {
    localStorage.setItem(Ch, JSON.stringify(t));
  } catch {}
  yt.dirty = !1;
}
function Y_() {
  try {
    const i = localStorage.getItem(Ch);
    if (!i) return null;
    const t = JSON.parse(i);
    return t.v !== 1 ? null : t;
  } catch {
    return null;
  }
}
