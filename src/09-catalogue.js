// Building catalogue (La) and footprint constants
//
// Extracted verbatim from public/assets/index-DCXbw2vV.js,
// lines 28877–28951.
// Identifiers are minifier-mangled; nothing here has been renamed.
// Regenerate with: python3 tools/split_bundle.py --write

const BUILD_CATALOGUE = {
    anchor: [
      { key: "pier", label: "Pier", hint: "a stout foundation for spans" },
      {
        key: "giant",
        label: "Giant Pier",
        hint: "colossal — its base becomes a place",
      },
      { key: "column", label: "Column", hint: "a slender commemorative shaft" },
    ],
    span: [
      {
        key: "bridge",
        label: "Bridge",
        hint: "an open crossing on great arches",
      },
      {
        key: "aqueduct",
        label: "Aqueduct",
        hint: "carries water along its back",
      },
      { key: "arcade", label: "Gallery", hint: "a roofed colonnade crossing" },
    ],
    rise: [
      { key: "direct", label: "Stair", hint: "the shortest honest climb" },
      {
        key: "ceremonial",
        label: "Ceremonial",
        hint: "broad, slow, magnificent",
      },
      {
        key: "switchback",
        label: "Switchback",
        hint: "folds up the steep face",
      },
    ],
    vault: [
      {
        key: "court",
        label: "Cloister Hall",
        hint: "intimate — 14 by 20 paces",
      },
      { key: "market", label: "Market Hall", hint: "roomy — 18 by 34 paces" },
      { key: "basilica", label: "Basilica", hint: "vast — 22 by 52 paces" },
    ],
    carve: [
      {
        key: "door",
        label: "Passage",
        hint: "an arched way through wall or pier",
      },
      {
        key: "gate",
        label: "Great Gate",
        hint: "ceremonial breach, 8 paces wide",
      },
    ],
    emb: [
      { key: "statue", label: "Statue", hint: "a gilded figure on a plinth" },
      { key: "fountain", label: "Fountain", hint: "water for a neighborhood" },
      { key: "lantern", label: "Lantern", hint: "warm light after dusk" },
      { key: "cypress", label: "Cypress", hint: "a dark green flame" },
    ],
    designate: [
      { key: "dwelling", label: "Dwelling", hint: "invite homes here" },
      { key: "trade", label: "Trade", hint: "invite stalls and shops" },
      { key: "garden", label: "Garden", hint: "invite green things" },
      { key: "gathering", label: "Gathering", hint: "invite idle evenings" },
    ],
  },
  VAULT_FOOTPRINTS = {
    court: { w: 13, h: 9 },
    market: { w: 17, h: 12 },
    basilica: { w: 22, h: 17 },
  };
