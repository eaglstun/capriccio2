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
  ];
  let e = "";
  for (const [n, s] of t) for (; i >= n; ) ((e += s), (i -= n));
  return e || "I";
}

// --- generated exports ---
export { rv };
