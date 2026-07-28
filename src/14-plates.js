// Plates: the etching capture mechanic
//
// Extracted verbatim from public/assets/index-DCXbw2vV.js,
// lines 29710–29756.
// Identifiers are minifier-mangled; nothing here has been renamed.
// Regenerate with: python3 tools/split_bundle.py --write

function renderPlateImage(i, t, e) {
  return new Promise((n) => {
    const s = new Image();
    ((s.onload = () => {
      const r = Math.round(s.height * 0.06),
        o = Math.round(s.height * 0.075),
        a = Math.round(s.height * 0.15),
        c = s.width + o * 2,
        l = s.height + r + a,
        h = document.createElement("canvas");
      ((h.width = c), (h.height = l));
      const u = h.getContext("2d");
      ((u.fillStyle = "#f1ead9"),
        u.fillRect(0, 0, c, l),
        (u.strokeStyle = "rgba(35,29,19,0.75)"),
        (u.lineWidth = Math.max(1.5, s.width / 900)),
        u.strokeRect(o - 6, r - 6, s.width + 12, s.height + 12),
        u.drawImage(s, o, r));
      const d = Math.round(s.height * 0.032);
      ((u.fillStyle = "#2a2318"),
        (u.font = `${d}px "Iowan Old Style", Palatino, Georgia, serif`),
        (u.textAlign = "center"),
        u.fillText(t.toUpperCase(), c / 2, s.height + r + a * 0.45));
      const f = tv(e);
      ((u.font = `italic ${Math.round(d * 0.82)}px "Iowan Old Style", Palatino, Georgia, serif`),
        u.fillText(`— Tav. ${f} —`, c / 2, s.height + r + a * 0.75),
        n(h.toDataURL("image/png")));
    }),
      (s.src = i));
  });
}
function tv(i) {
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
