// Plates: the etching capture mechanic
//
// Extracted from public/assets/index-DCXbw2vV.js, bundle lines
// 29710–29756. Statements are verbatim; identifiers are
// renamed via src/renames.json. Imports and exports are generated.
// Regenerate: python3 tools/split_bundle.py --write

// TRUE Atkinson error diffusion, run on the CPU where it can be done
// honestly: the plate is a still, rendered once, so the sequential
// algorithm applies. Each pixel pushes 1/8 of its quantisation error to
// six neighbours and DISCARDS the remaining 2/8 — that discard is why
// Atkinson blows out highlights and crushes shadows; it is the signature.
// The engraver's plate becomes a 1-bit dithered plate: ink #2b1a52 on
// paper #f6e0ef, 1984 printing 1750.
function atkinsonDither(img) {
  const c = document.createElement("canvas"),
    w = (c.width = img.width),
    h = (c.height = img.height),
    g = c.getContext("2d");
  g.drawImage(img, 0, 0);
  const id = g.getImageData(0, 0, w, h),
    d = id.data,
    lum = new Float32Array(w * h);
  for (let i = 0, j = 0; i < lum.length; i++, j += 4)
    lum[i] = (0.2126 * d[j] + 0.7152 * d[j + 1] + 0.0722 * d[j + 2]) / 255;
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const i = y * w + x,
        old = lum[i],
        q = old > 0.5 ? 1 : 0,
        err = (old - q) / 8; // 6 shares leave, 2 are thrown away
      lum[i] = q;
      if (x + 1 < w) lum[i + 1] += err;
      if (x + 2 < w) lum[i + 2] += err;
      if (y + 1 < h) {
        if (x > 0) lum[i + w - 1] += err;
        lum[i + w] += err;
        if (x + 1 < w) lum[i + w + 1] += err;
      }
      if (y + 2 < h) lum[i + 2 * w] += err;
    }
  for (let i = 0, j = 0; i < lum.length; i++, j += 4) {
    const on = lum[i] < 0.5;
    d[j] = on ? 0x2b : 0xf6;
    d[j + 1] = on ? 0x1a : 0xe0;
    d[j + 2] = on ? 0x52 : 0xef;
    d[j + 3] = 255;
  }
  return (g.putImageData(id, 0, 0), c);
}
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
      ((u.fillStyle = "#f6e0ef"),
        u.fillRect(0, 0, c, l),
        (u.strokeStyle = "rgba(43,26,82,0.75)"),
        (u.lineWidth = Math.max(1.5, s.width / 900)),
        u.strokeRect(o - 6, r - 6, s.width + 12, s.height + 12),
        u.drawImage(atkinsonDither(s), o, r));
      const d = Math.round(s.height * 0.032);
      ((u.fillStyle = "#2b1a52"),
        (u.font = `${d}px "Avenir Next", "Futura", "Century Gothic", "Helvetica Neue", Arial, sans-serif`),
        (u.textAlign = "center"),
        u.fillText(t.toUpperCase(), c / 2, s.height + r + a * 0.45));
      const f = tv(e);
      ((u.font = `italic ${Math.round(d * 0.82)}px "Avenir Next", "Futura", "Century Gothic", "Helvetica Neue", Arial, sans-serif`),
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

// --- generated exports ---
export { renderPlateImage, tv };
