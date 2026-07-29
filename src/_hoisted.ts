// Hoisted declarations.
//
// These `function` declarations were hoisted in the original single
// scope, so callers could sit ABOVE them. Splitting into ES modules
// turns that into a forward import — and, where the callee imports
// the caller back, an evaluation cycle that Rollup resolves in the
// wrong order (`Cannot access 'Hud' before initialization`).
//
// Moving them here reproduces the original hoisting. The relocation
// is recorded in manifest.json and undone by the integrity check,
// so byte-identity with the original bundle still holds.
// Regenerate: python3 tools/split_bundle.py --write

/**
 * Format the day number for the HUD.
 *
 * Lives here rather than in the bootstrap module because the HUD calls it from
 * inside a template literal, while bootstrap constructs the HUD — a cycle that
 * ES modules resolve in the wrong order. In the original single scope,
 * function hoisting made position irrelevant; splitting into modules turned
 * that into a real dependency. See the header above.
 */
function rv(i) {
  const t = [
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ] as const;
  let e = "";
  for (const [n, s] of t) for (; i >= n; ) ((e += s), (i -= n));
  return e || "I";
}

// --- generated exports ---
export { rv };
