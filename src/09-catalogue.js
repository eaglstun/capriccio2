// Building catalogue (La) and footprint constants
//
// Extracted from public/assets/index-DCXbw2vV.js, bundle lines
// 28877–28951. Statements are verbatim; identifiers are
// renamed via src/renames.json. Imports and exports are generated.
// Regenerate: python3 tools/split_bundle.py --write

/**
 * Every buildable thing, by tool. Seven categories, 22 entries.
 *
 * `key` is LOAD-BEARING and frozen — it is what the save stores and what
 * `chooseKind` and the builders switch on. Changing one orphans every save
 * that used it. `label` and `hint` are free text and have been rewritten for
 * the later era.
 *
 * Note the verbs: you ESTABLISH, SPAN, RISE, VAULT, CARVE, FURNISH — and
 * INVITE. You never "build a house". See docs/CHARACTERS.md on how the writing
 * works.
 */
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
        // "Aqueduct" kept deliberately: infrastructure words are conservative.
        // Nobody renames the thing that still carries the water.
        key: "aqueduct",
        label: "Aqueduct",
        hint: "carries the water main on its back",
      },
      { key: "arcade", label: "Gallery", hint: "a covered crossing on columns" },
    ],
    rise: [
      { key: "direct", label: "Stair", hint: "the shortest honest climb" },
      {
        key: "ceremonial",
        label: "Grand Stair",
        hint: "broad, slow, unhurried",
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
        label: "Common Hall",
        hint: "intimate — 13 metres across",
      },
      { key: "market", label: "Market Hall", hint: "roomy — 17 metres across" },
      { key: "basilica", label: "Concourse", hint: "vast — 22 metres across" },
    ],
    carve: [
      {
        key: "door",
        label: "Passage",
        hint: "an arched way through wall or pier",
      },
      {
        key: "gate",
        label: "Gate",
        hint: "a full breach, 8 metres wide",
      },
    ],
    emb: [
      { key: "statue", label: "Statue", hint: "a chrome figure on a plinth" },
      { key: "fountain", label: "Fountain", hint: "water for a neighborhood" },
      { key: "lantern", label: "Lantern", hint: "cold light after dusk" },
      { key: "cypress", label: "Cypress", hint: "the shape of one, in polymer" },
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

// --- generated exports ---
export { BUILD_CATALOGUE, VAULT_FOOTPRINTS };
