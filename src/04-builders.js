// Structure mesh builders — span, rise, vault, wall, ornament. Each seeds its PRNG from the action id (Je(id*7919+k)), which is what makes replay deterministic.
//
// Extracted verbatim from public/assets/index-DCXbw2vV.js,
// lines 26962–27602.
// Identifiers are minifier-mangled; nothing here has been renamed.
// Regenerate with: python3 tools/split_bundle.py --write

function buildSpan(i) {
  const t = Ci(),
    e = Je(i.id * 7919 + 23),
    n = i.age ?? 0.07,
    s = dn(i.ax, i.ay, i.az),
    r = dn(i.bx, i.by, i.bz),
    o = dn(r.x - s.x, 0, r.z - s.z),
    a = Math.hypot(o.x, o.z);
  if (a < 4) return t;
  const c = o.clone().multiplyScalar(1 / a),
    l = Math.atan2(c.x, c.z),
    h = i.width,
    u = (w) => zn(s.y, r.y, w / a),
    d = (w) => {
      const I = s.x + c.x * w,
        F = s.z + c.z * w;
      return qt(I, F);
    };
  let f = 1 / 0;
  for (let w = 0; w <= a; w += 3) f = Math.min(f, d(w));
  const m = Math.min(s.y, r.y),
    _ = m - f,
    g = Xe(_ * 0.62, 7, 15),
    p = Math.max(1, Math.round(a / g)),
    A = a / p,
    b = Xe(A * 0.24, 1.5, 4.5),
    v = (A - b) / 2;
  for (let w = 0; w < p; w++) {
    const I = A * w,
      F = A * (w + 1),
      B = (I + F) / 2,
      k = u(B) - 1.12;
    let G = 1 / 0;
    for (let Lt = I; Lt <= F; Lt += 2) G = Math.min(G, d(Lt));
    const Y = k - G + 2;
    if (Y < 3.2) continue;
    const H = Y - v - 0.55,
      ct = Hn(
        A + 0.08,
        Y,
        h * 0.86,
        H > 1.2 ? [{ cx: 0, r: v, springY: H }] : [],
        { rng: e, ruin: i.ruin ?? 0 },
      );
    ct.rotateY(l - Math.PI / 2);
    const pt = s.x + c.x * B,
      gt = s.z + c.z * B;
    if (
      (ct.translate(pt, G - 2, gt),
      Ri(ct, G - 2, G + 4, 0.85, 1, n),
      Yt(t, "stone", ct),
      Ur(t, ct, e, n > 0.25, 2),
      k - G > 34)
    ) {
      const Lt = Ji(A + 0.06, 9, h * 0.78, 2, { rng: e, springFrac: 0.5 });
      (Lt.rotateY(l - Math.PI / 2),
        Lt.translate(pt, G - 2 + Y - 9 - 0.01, gt),
        Yt(t, "stone", Lt));
    }
  }
  const R = Math.max(2, Math.round(a / 7)),
    E = new oe(n);
  for (let w = 0; w < R; w++) {
    const I = (a * w) / R,
      F = (a * (w + 1)) / R,
      B = u((I + F) / 2);
    (E.box(F - I + 0.05, 1.15, h, [(I + F) / 2 - a / 2, B - 1.15, 0]),
      E.box(F - I + 0.05, 0.3, h + 0.55, [(I + F) / 2 - a / 2, B - 1.45, 0]));
  }
  const C = i.kind === "aqueduct",
    L = C ? 1.45 : 1;
  for (const w of [-1, 1])
    for (let I = 0; I < R; I++) {
      const F = (a * I) / R,
        B = (a * (I + 1)) / R,
        k = u((F + B) / 2);
      E.box(B - F + 0.05, L, C ? 0.6 : 0.35, [
        (F + B) / 2 - a / 2,
        k,
        w * (h / 2 - 0.3),
      ]);
    }
  const y = E.merge();
  if (
    (y.rotateY(l - Math.PI / 2),
    y.translate((s.x + r.x) / 2, 0, (s.z + r.z) / 2),
    Yt(t, "stone", y),
    i.kind === "arcade")
  ) {
    const w = Ji(a, 6.5, 0.9, Math.max(2, Math.round(a / 4.5)), {
        rng: e,
        springFrac: 0.6,
      }),
      I = w.clone(),
      F = h / 2 - 1.1;
    (w.rotateY(l - Math.PI / 2), I.rotateY(l - Math.PI / 2));
    const B = Math.cos(l),
      k = -Math.sin(l);
    (w.translate((s.x + r.x) / 2 + B * F, m, (s.z + r.z) / 2 + k * F),
      I.translate((s.x + r.x) / 2 - B * F, m, (s.z + r.z) / 2 - k * F),
      Yt(t, "stone", w),
      Yt(t, "stone", I));
    const G = new oe(n);
    G.box(a, 0.7, h, [0, 6.5, 0]);
    const Y = G.merge();
    (Y.rotateY(l - Math.PI / 2),
      Y.translate((s.x + r.x) / 2, m, (s.z + r.z) / 2),
      Yt(t, "stone", Y));
  }
  if (C) {
    (t.water.push({ a: [s.x, s.y + 0.55, s.z], b: [r.x, r.y + 0.55, r.z] }),
      t.waterSources.push([r.x, r.y, r.z]),
      t.waterSources.push([s.x, s.y, s.z]));
    const w = s.y <= r.y ? s : r,
      I = qt(w.x, w.z);
    if (w.y - I < 4) {
      const F = new oe(n);
      F.box(5.4, 1.1, 5.4, [0, 0, 0]);
      const B = F.merge();
      (be(B, w.x, I, w.z, 0), Yt(t, "stone", B));
      const k = new Fe(1.9, 1.9, 0.16, 14);
      (k.translate(w.x, I + 1.02, w.z),
        Yt(t, "water", k),
        t.pockets.push({
          kind: "terrace_p",
          pos: [w.x + 5, I, w.z + 2],
          rotY: 0,
          area: 26,
          height: 99,
          shelter: 0.15,
          light: 0.9,
          scenic: 0.6,
        }));
    }
  }
  const M = Math.max(2, Math.round(a / 11));
  for (let w = 0; w <= M; w++) {
    const I = (a * w) / M;
    t.navPts.push({
      pos: [s.x + c.x * I, u(I), s.z + c.z * I],
      links: w > 0 ? [w - 1] : [],
      splice: w === 0 || w === M,
    });
  }
  for (let w = 0; w < p; w++) {
    const I = A * (w + 0.5),
      F = s.x + c.x * I,
      B = s.z + c.z * I,
      k = qt(F, B),
      G = u(I) - 1.15 - k;
    G > 3.2 &&
      G < 60 &&
      t.pockets.push({
        kind: "under_arch",
        pos: [F, k, B],
        rotY: l,
        area: Math.min(A, 12) * Math.min(h, 9),
        height: Math.min(G, 12),
        shelter: 0.95,
        light: 0.45,
        scenic: 0.5,
      });
  }
  if (h >= 6)
    for (let w = 1; w < M; w++) {
      const I = (a * w) / M;
      w % 2 !== 0 &&
        t.pockets.push({
          kind: "deck",
          pos: [s.x + c.x * I, u(I), s.z + c.z * I],
          rotY: l,
          area: 5 * (h - 4),
          height: 99,
          shelter: 0.15,
          light: 0.95,
          scenic: 0.85,
        });
    }
  return ((t.cost.stone = Math.round(a * Math.max(4, _) * 0.09)), t);
}
function buildRise(i) {
  const t = Ci(),
    e = Je(i.id * 7919 + 37),
    n = i.age ?? 0.07;
  let s = dn(i.ax, i.ay, i.az),
    r = dn(i.bx, i.by, i.bz);
  if (r.y < s.y) {
    const A = s;
    ((s = r), (r = A));
  }
  const o = r.y - s.y,
    a = dn(r.x - s.x, 0, r.z - s.z),
    c = Math.hypot(a.x, a.z);
  if (o < 1.2) return t;
  const l = c > 0.5 ? a.clone().multiplyScalar(1 / c) : dn(1, 0, 0),
    h = Math.atan2(l.x, l.z),
    u = i.style === "ceremonial" ? 11 : 6,
    d = i.style === "ceremonial" ? 1.9 : 1.5,
    f = o * d,
    m = i.style === "switchback" || c < f * 0.72,
    _ = new oe(n),
    g = [],
    p = [];
  if (m) {
    const A = dn(l.z, 0, -l.x),
      v = Math.max(2, Math.ceil(o / 5)),
      R = o / v,
      E = Xe(R * 1.55, 6, 14),
      C = c / v;
    let L = s.y,
      y = dn(s.x, 0, s.z),
      M = 1;
    t.navPts.push({ pos: [s.x, s.y, s.z], links: [], splice: !0 });
    for (let w = 0; w < v; w++) {
      const I = A.clone().multiplyScalar(M),
        F = Math.atan2(I.x, I.z),
        B = y.clone().add(I.clone().multiplyScalar(-E / 2)),
        k = Ll(5.2, R, E);
      (k.rotateY(F - Math.PI / 2),
        k.translate(B.x, L, B.z),
        Ue(k, 1, n),
        Yt(t, "stone", k));
      const G = Math.min(qt(B.x, B.z), qt(y.x, y.z)) - 1,
        Y = L - G;
      if (Y > 0.4) {
        let gt;
        if (Y > 6.5)
          gt = Hn(
            E,
            Y + 0.2,
            4.6,
            [{ cx: 0, r: Math.min(E * 0.3, Y * 0.32), springY: Y * 0.42 }],
            { rng: e },
          );
        else {
          const Lt = new oe(n);
          (Lt.box(E, Y + 0.2, 4.6, [0, 0, 0]), (gt = Lt.merge()));
        }
        (gt.rotateY(F - Math.PI / 2),
          gt.translate(y.x, G, y.z),
          Ue(gt, 1, n),
          Yt(t, "stone", gt),
          Y > 6.5 &&
            t.pockets.push({
              kind: "undercroft",
              pos: [y.x + I.x * 1, G + 1, y.z + I.z * 1],
              rotY: F,
              area: E * 3,
              height: Y * 0.5,
              shelter: 0.85,
              light: 0.4,
              scenic: 0.45,
            }));
      }
      const H = y.clone().add(I.clone().multiplyScalar(E / 2)),
        ct = new oe(n);
      ct.box(4.4, L + R - qt(H.x, H.z) + 1, 4.6, [0, 0, 0]);
      const pt = ct.merge();
      (pt.translate(H.x, qt(H.x, H.z) - 1, H.z),
        Yt(t, "stone", pt),
        (L += R),
        t.navPts.push({
          pos: [H.x, L, H.z],
          links: [t.navPts.length - 1],
          splice: !1,
        }),
        w % 2 === 1 &&
          t.pockets.push({
            kind: "landing",
            pos: [H.x, L, H.z],
            rotY: F,
            area: 12,
            height: 99,
            shelter: 0.25,
            light: 0.85,
            scenic: 0.75,
          }),
        (y = H.clone().add(l.clone().multiplyScalar(C))),
        y.add(I.clone().multiplyScalar(-E / 2)),
        (M *= -1));
    }
    t.navPts.push({
      pos: [r.x, r.y, r.z],
      links: [t.navPts.length - 1],
      splice: !0,
    });
  } else {
    const A = Math.max(1, Math.ceil(o / 6)),
      b = o / A,
      v = Math.min((c - (A - 1) * 4) / A, b * 2.4);
    let R = 0,
      E = 0;
    g.push({ pos: [0, 0, 0], links: [], splice: !0 });
    for (let y = 0; y < A; y++) {
      const M = Ll(u, b, v);
      (M.translate(R, E, 0),
        _.addRaw(M),
        (R += v),
        (E += b),
        y < A - 1 &&
          (_.box(4, 1, u, [R + 2, E - 1, 0]),
          _.box(4, E, u, [R + 2, -0.2, 0]),
          g.push({ pos: [R + 2, E, 0], links: [g.length - 1], splice: !1 }),
          u >= 8 &&
            p.push({
              kind: "landing",
              pos: [R + 2, E, 0],
              rotY: 0,
              area: 4 * u - 20,
              height: 99,
              shelter: 0.2,
              light: 0.9,
              scenic: 0.7,
            }),
          (R += 4)));
    }
    if (o > 7 && c > 12) {
      const y = Hn(
        Math.min(c * 0.5, 14),
        o * 0.52,
        u * 0.9,
        [{ cx: 0, r: Math.min(c * 0.5, 14) * 0.22, springY: o * 0.2 }],
        { rng: e },
      );
      (y.rotateY(-Math.PI / 2), y.rotateY(Math.PI));
      const M = R * 0.72;
      (y.rotateY(Math.PI / 2),
        y.translate(M, 0, 0),
        _.addRaw(y),
        p.push({
          kind: "undercroft",
          pos: [M, 0, u / 2 + 1.2],
          rotY: 0,
          area: 20,
          height: 4,
          shelter: 0.85,
          light: 0.35,
          scenic: 0.4,
        }));
    }
    if (i.style === "ceremonial")
      for (const y of [-1, 1]) {
        const M = __(R, 1);
        (M.translate(0, 0, y * (u / 2 - 0.2)),
          _.addRaw(M),
          _.box(1.8, 2.2, 1.8, [-1.2, 0, y * (u / 2 + 0.4)]));
      }
    g.push({ pos: [R, E, 0], links: [g.length - 1], splice: !0 });
    const C = _.merge();
    (Ri(C, 0, 3, 0.88, 1, n),
      C.rotateY(h - Math.PI / 2),
      C.translate(s.x, s.y, s.z),
      Yt(t, "stone", C));
    const L = (y) => {
      const M = y[0] * Math.sin(h) - y[2] * Math.cos(h),
        w = y[0] * Math.cos(h) + y[2] * Math.sin(h);
      return [s.x + M, s.y + y[1], s.z + w];
    };
    ((t.navPts = g.map((y) => ({ ...y, pos: L(y.pos) }))),
      (t.pockets = p.map((y) => ({ ...y, pos: L(y.pos), rotY: y.rotY + h }))));
  }
  return ((t.cost.stone = Math.round(o * u * 0.9)), t);
}
function buildVault(i) {
  const t = Ci(),
    e = Je(i.id * 7919 + 53),
    n = i.age ?? 0.07,
    s = i.ruin ?? 0,
    r = qt(i.x, i.z),
    { w: o, l: a, h: c } = i,
    l = Math.max(2, Math.round(a / 6.2)),
    h = i.rotY - Math.PI / 2,
    u = s > 0.15 ? a * Xe(0.72 - s * 0.35, 0.3, 0.8) : a + 1;
  for (const v of [-1, 1]) {
    const R = Math.sin(i.rotY + Math.PI / 2) * (o / 2) * v,
      E = Math.cos(i.rotY + Math.PI / 2) * (o / 2) * v;
    if (s > 0.15 && u < a - 4) {
      const C = Math.min(u + 2, a),
        L = Math.max(1, Math.round((l * C) / a)),
        y = Ji(C, c, 1.5, L, { rng: e, ruin: 0.06, springFrac: 0.52 }),
        M = -(a - C) / 2;
      (be(
        y,
        i.x + Math.sin(i.rotY) * M + R,
        r,
        i.z + Math.cos(i.rotY) * M + E,
        h,
      ),
        Yt(t, "stone", y));
      const w = a - C,
        I = Math.max(1, l - L),
        F = Ji(w, c, 1.5, I, {
          rng: e,
          ruin: Xe(s * 1.35, 0, 0.95),
          springFrac: 0.52,
        }),
        B = C / 2;
      (be(
        F,
        i.x + Math.sin(i.rotY) * B + R,
        r,
        i.z + Math.cos(i.rotY) * B + E,
        h,
      ),
        Yt(t, "stone", F),
        Ur(t, F, e, !0, Math.ceil(w / 7)));
    } else {
      const C = Ji(a, c, 1.5, l, {
        rng: e,
        ruin: s * (v > 0 ? 1 : 0.5),
        springFrac: 0.52,
      });
      (be(C, i.x + R, r, i.z + E, h),
        Yt(t, "stone", C),
        Ur(t, C, e, s > 0.2 || n > 0.3, Math.ceil(a / 8)));
    }
  }
  for (const v of [-1, 1]) {
    const R = Hn(
      o + 1.5,
      c + (s > 0.3 && v > 0 ? -c * 0.3 : 2.5),
      1.6,
      [{ cx: 0, r: o * 0.27, springY: c * 0.42 }],
      { rng: e, ruin: s * 0.7 },
    );
    (be(
      R,
      i.x + Math.sin(i.rotY) * (a / 2) * v,
      r,
      i.z + Math.cos(i.rotY) * (a / 2) * v,
      i.rotY,
    ),
      Yt(t, "stone", R));
  }
  const d = s > 0.15 ? a * Xe(0.72 - s * 0.35, 0.3, 0.8) : a + 1,
    f = v_(o / 2 + 0.9, 1, d);
  (f.translate(-d / 2, 0, 0),
    be(
      f,
      i.x - Math.sin(i.rotY) * ((a - d) * 0.5),
      r + c,
      i.z - Math.cos(i.rotY) * ((a - d) * 0.5),
      h,
    ),
    Yt(t, "stone", f));
  const m = new oe(n);
  m.box(a + 3, 0.9, o + 3, [0, -0.9, 0]);
  const _ = m.merge();
  if ((be(_, i.x, r, i.z, h), Yt(t, "stone", _), s > 0.2))
    for (let v = 0; v < Math.round(s * 8); v++) {
      const R = (e() - 0.5) * (a * 0.7),
        E = (e() - 0.5) * (o * 0.6),
        C = Pa(e),
        L = i.x + Math.sin(i.rotY) * R + Math.sin(i.rotY + Math.PI / 2) * E,
        y = i.z + Math.cos(i.rotY) * R + Math.cos(i.rotY + Math.PI / 2) * E;
      (be(C, L, r, y, e() * 3), Yt(t, "stoneOld", C));
    }
  const g = Math.sin(i.rotY),
    p = Math.cos(i.rotY),
    A = [];
  for (let v = -a / 2 - 4; v <= a / 2 + 4.01; v += (a + 8) / 4)
    A.push([i.x + g * v, r, i.z + p * v]);
  A.forEach((v, R) =>
    t.navPts.push({
      pos: v,
      links: R > 0 ? [R - 1] : [],
      splice: R === 0 || R === A.length - 1,
    }),
  );
  const b = Math.max(2, Math.floor(a / 7));
  for (let v = 0; v < b; v++) {
    const R = -a / 2 + (a / b) * (v + 0.5);
    for (const E of [-1, 1]) {
      const C = (o / 2 - 2.4) * E,
        L = i.x + g * R + Math.sin(i.rotY + Math.PI / 2) * C,
        y = i.z + p * R + Math.cos(i.rotY + Math.PI / 2) * C,
        M = R + a / 2 < d;
      t.pockets.push({
        kind: "interior",
        pos: [L, r, y],
        rotY: i.rotY + (E > 0 ? Math.PI / 2 : -Math.PI / 2),
        area: (a / b) * 4,
        height: c,
        shelter: M ? 1 : 0.4,
        light: M ? 0.3 : 0.8,
        scenic: 0.55,
      });
    }
  }
  return ((t.cost.stone = Math.round(o * a * 0.32 + c * (o + a) * 0.22)), t);
}
function buildWall(i) {
  const t = Ci(),
    e = Je(i.id * 7919 + 71),
    n = i.age ?? 0.3,
    s = dn(i.ax, 0, i.az),
    r = dn(i.bx, 0, i.bz),
    o = dn(r.x - s.x, 0, r.z - s.z),
    a = Math.hypot(o.x, o.z),
    c = o.multiplyScalar(1 / a),
    l = Math.atan2(c.x, c.z),
    h = Math.min(qt(s.x, s.z), qt(r.x, r.z)) - 1.5,
    u = [];
  for (const m of i.openings ?? [])
    u.push({ cx: m.s - a / 2, r: m.w / 2, springY: m.h - m.w / 2 });
  const d = Hn(a, i.h, i.th, u, { rng: e, ruin: n > 0.4 ? 0.12 : 0 });
  (d.rotateY(l - Math.PI / 2),
    d.translate((s.x + r.x) / 2, h, (s.z + r.z) / 2),
    Ri(d, h, h + 4, 0.86, 1, n),
    Yt(t, "stone", d),
    Ur(t, d, e, n > 0.3, Math.ceil(a / 9)));
  const f = Math.floor(a / 9);
  for (let m = 1; m < f; m++) {
    const _ = (a * m) / f;
    if ((i.openings ?? []).some((C) => Math.abs(C.s - _) < C.w / 2 + 1.5))
      continue;
    const p = s.x + c.x * _,
      A = s.z + c.z * _,
      b = new oe(n);
    (b.box(2.2, i.h * 0.75, 1.9, [0, 0, 0]),
      b.box(1.8, i.h * 0.22, 1.4, [0, i.h * 0.75, 0.2]));
    const v = b.merge(),
      R = Math.cos(l),
      E = -Math.sin(l);
    (be(
      v,
      p + R * (i.th / 2 + 0.8),
      qt(p, A) - 0.5,
      A + E * (i.th / 2 + 0.8),
      l,
    ),
      Yt(t, "stone", v));
  }
  for (const m of i.openings ?? []) {
    const _ = m.s,
      g = s.x + c.x * _,
      p = s.z + c.z * _,
      A = Math.cos(l),
      b = -Math.sin(l),
      v = qt(g + A * (i.th / 2 + 2), p + b * (i.th / 2 + 2)),
      R = qt(g - A * (i.th / 2 + 2), p - b * (i.th / 2 + 2)),
      E = t.navPts.length;
    (t.navPts.push({
      pos: [g + A * (i.th / 2 + 2), v, p + b * (i.th / 2 + 2)],
      links: [],
      splice: !0,
    }),
      t.navPts.push({
        pos: [g - A * (i.th / 2 + 2), R, p - b * (i.th / 2 + 2)],
        links: [E],
        splice: !0,
      }),
      t.pockets.push({
        kind: "undercroft",
        pos: [g, Math.min(v, R), p],
        rotY: l,
        area: m.w * i.th,
        height: m.h,
        shelter: 0.9,
        light: 0.4,
        scenic: 0.35,
      }));
  }
  return ((t.cost.stone = Math.round(a * i.h * 0.11)), t);
}
function buildOrnament(i) {
  const t = Ci(),
    e = Je(i.id * 7919 + 87),
    n = i.y;
  if (i.kind === "cypress") {
    const s = nc(5.5 + e() * 4, e);
    (be(s, i.x, n, i.z, i.rotY), Yt(t, "green", s));
  } else if (i.kind === "statue") {
    const s = new oe(0.1);
    (s.box(1.6, 1.9, 1.6, [0, 0, 0]), s.box(1.25, 0.32, 1.25, [0, 1.9, 0]));
    const r = s.merge();
    (be(r, i.x, n, i.z, i.rotY), Yt(t, "stone", r));
    const o = new oe(0);
    (o.box(0.55, 1.5, 0.42, [0, 0, 0]),
      o.cylinder(0.2, 0.34, [0, 1.55, 0], 8),
      o.box(0.85, 0.2, 0.3, [0, 1.1, 0]));
    const a = o.merge();
    (be(a, i.x, n + 2.22, i.z, i.rotY + e()),
      Yt(t, "gold", a),
      t.pockets.push({
        kind: "niche",
        pos: [i.x + 2, n, i.z],
        rotY: i.rotY,
        area: 4,
        height: 3,
        shelter: 0.1,
        light: 0.9,
        scenic: 0.9,
      }));
  } else if (i.kind === "fountain") {
    const s = new oe(0.05);
    (s.cylinder(2.3, 0.9, [0, 0, 0], 14),
      s.cylinder(0.4, 1.7, [0, 0.4, 0], 8),
      s.cylinder(1.1, 0.25, [0, 1.7, 0], 10));
    const r = s.merge();
    (be(r, i.x, n, i.z, 0), Yt(t, "stone", r));
    const o = new Fe(2.05, 2.05, 0.12, 16);
    (o.translate(i.x, n + 0.82, i.z),
      Yt(t, "water", o),
      t.waterSources.push([i.x, n, i.z]));
  } else if (i.kind === "lantern") {
    const s = new oe(0);
    (s.cylinder(0.09, 3.4, [0, 0, 0], 6), s.box(0.5, 0.08, 0.5, [0, 3.4, 0]));
    const r = s.merge();
    (be(r, i.x, n, i.z, 0), Yt(t, "timber", r));
    const o = new le(0.34, 0.4, 0.34);
    (o.translate(i.x, n + 3.15, i.z), Yt(t, "glow", o));
  } else if (i.kind === "obelisk") {
    const s = new oe(0.1);
    (s.box(2.4, 1.1, 2.4, [0, 0, 0]),
      s.cylinder(0.85, 9, [0, 1.1, 0], 4, 1, 0.5));
    const r = s.merge();
    (be(r, i.x, n, i.z, Math.PI / 4), Yt(t, "stone", r));
    const o = new ls(0.52, 1, 4);
    (o.translate(i.x, n + 10.4, i.z), Yt(t, "gold", o));
  }
  return ((t.cost.stone = 4), t);
}
function buildStructureMesh(i) {
  switch (i.t) {
    case "anchor":
      return buildAnchor(i);
    case "span":
      return buildSpan(i);
    case "rise":
      return buildRise(i);
    case "vault":
      return buildVault(i);
    case "wall":
      return buildWall(i);
    case "emb":
      return buildOrnament(i);
    default:
      return Ci();
  }
}
