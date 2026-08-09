// Look at a procedural model without a browser.
//
//   node tools/model-preview.ts out.ppm            # the three citizens, 3/4 view
//   node tools/model-preview.ts out.ppm --head     # framed on the head
//
// Then: sips -s format png out.ppm --out out.png
//
// WHY THIS EXISTS. Every model in this project is built in code — there are no
// asset files to open in a viewer, and the only way to see one has been to
// build the site and look at the game. That is a slow loop, and it is not
// available at all without a browser. This rasterises a BufferGeometry
// straight from the module that defines it, so geometry can be checked before
// it ships.
//
// It is deliberately dependency-free: a z-buffered triangle rasteriser in
// about a hundred lines, no headless-gl, no puppeteer, no native build. It
// draws position + normal + optional vertex colour, which is exactly what this
// project's merged geometries carry. It is NOT a renderer — no shadows, no
// post pass, no dither, none of the engraved surface treatment. It answers
// "is the shape right", not "does it look right".

import { writeFileSync } from "node:fs";

const out = process.argv[2] ?? "preview.ppm";
const headMode = process.argv.includes("--head");

const { Po } = await import("../src/07-citizens.ts");

// ---------------------------------------------------------------- maths

type V3 = [number, number, number];
const sub = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const cross = (a: V3, b: V3): V3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const dot = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const norm = (a: V3): V3 => {
  const l = Math.hypot(...a) || 1;
  return [a[0] / l, a[1] / l, a[2] / l];
};

/** World -> camera. Rows of the basis, so this is the inverse of the pose. */
function viewOf(eye: V3, target: V3): (p: V3) => V3 {
  const f = norm(sub(target, eye));
  const r = norm(cross(f, [0, 1, 0]));
  const u = cross(r, f);
  return (p: V3) => {
    const d = sub(p, eye);
    return [dot(d, r), dot(d, u), dot(d, f)];
  };
}

// ---------------------------------------------------------------- render

const BG: V3 = [0.09, 0.06, 0.19];
const KEY = norm([0.5, 0.85, 0.45] as V3);

/**
 * Draw one geometry into an RGB float buffer with its own z-buffer.
 *
 * Triangles come in as non-indexed position triples, which is what O_()
 * produces after merging — every three vertices are a face, no index to
 * follow. Shading is Lambert against one key light plus a violet fill, so
 * that surfaces facing away are readable rather than black.
 */
function draw(
  geo: any,
  W: number,
  H: number,
  eye: V3,
  target: V3,
  fov: number,
  px: Float32Array,
  zb: Float32Array,
  ox: number,
  oy: number,
  tileW: number,
  tileH: number,
) {
  const pos = geo.attributes.position.array as Float32Array;
  const nrm = geo.attributes.normal.array as Float32Array;
  const col = geo.attributes.color?.array as Float32Array | undefined;
  const toView = viewOf(eye, target);
  const focal = tileH / 2 / Math.tan((fov * Math.PI) / 360);

  for (let t = 0; t < pos.length / 9; t++) {
    const vs: { s: [number, number, number]; n: V3; c: V3 }[] = [];
    let behind = false;
    for (let k = 0; k < 3; k++) {
      const i = t * 9 + k * 3;
      const v = toView([pos[i], pos[i + 1], pos[i + 2]]);
      if (v[2] <= 0.02) behind = true;
      vs.push({
        s: [
          ox + tileW / 2 + (v[0] / v[2]) * focal,
          oy + tileH / 2 - (v[1] / v[2]) * focal,
          v[2],
        ],
        n: [nrm[i], nrm[i + 1], nrm[i + 2]],
        c: col ? [col[i], col[i + 1], col[i + 2]] : [1, 1, 1],
      });
    }
    if (behind) continue;

    const [A, B, C] = vs.map((v) => v.s);
    const area = (B[0] - A[0]) * (C[1] - A[1]) - (C[0] - A[0]) * (B[1] - A[1]);
    if (area >= 0) continue; // back-facing, in this handedness
    const x0 = Math.max(ox, Math.floor(Math.min(A[0], B[0], C[0])));
    const x1 = Math.min(ox + tileW - 1, Math.ceil(Math.max(A[0], B[0], C[0])));
    const y0 = Math.max(oy, Math.floor(Math.min(A[1], B[1], C[1])));
    const y1 = Math.min(oy + tileH - 1, Math.ceil(Math.max(A[1], B[1], C[1])));

    for (let y = y0; y <= y1; y++)
      for (let x = x0; x <= x1; x++) {
        const pxc = x + 0.5,
          pyc = y + 0.5;
        let w0 =
          ((B[0] - A[0]) * (pyc - A[1]) - (pxc - A[0]) * (B[1] - A[1])) / area;
        let w1 =
          ((C[0] - B[0]) * (pyc - B[1]) - (pxc - B[0]) * (C[1] - B[1])) / area;
        let w2 = 1 - w0 - w1;
        // barycentric of P against (A,B,C): the edge functions above give the
        // weight of the OPPOSITE vertex, so relabel rather than reorder
        const bC = w0,
          bA = w1,
          bB = w2;
        if (bA < 0 || bB < 0 || bC < 0) continue;
        const z = bA * A[2] + bB * B[2] + bC * C[2];
        const idx = y * W + x;
        if (z >= zb[idx]) continue;
        zb[idx] = z;
        const n = norm([
          bA * vs[0].n[0] + bB * vs[1].n[0] + bC * vs[2].n[0],
          bA * vs[0].n[1] + bB * vs[1].n[1] + bC * vs[2].n[1],
          bA * vs[0].n[2] + bB * vs[1].n[2] + bC * vs[2].n[2],
        ]);
        const lam = Math.max(0, dot(n, KEY));
        const fill = 0.22 + 0.18 * (n[1] * 0.5 + 0.5);
        const c: V3 = [
          bA * vs[0].c[0] + bB * vs[1].c[0] + bC * vs[2].c[0],
          bA * vs[0].c[1] + bB * vs[1].c[1] + bC * vs[2].c[1],
          bA * vs[0].c[2] + bB * vs[1].c[2] + bC * vs[2].c[2],
        ];
        // a violet key and a cyan fill, so it reads like the game's palette
        // rather than like a grey clay render
        const shade = lam * 0.95 + fill;
        px[idx * 3] = c[0] * shade * 1.0;
        px[idx * 3 + 1] = c[1] * shade * 0.92 + fill * 0.1;
        px[idx * 3 + 2] = c[2] * shade * 1.05 + fill * 0.18;
      }
  }
}

// ---------------------------------------------------------------- sheet

const TILE = headMode ? 300 : 260;
const YAWS = headMode ? [0, 0.5, 1.1, Math.PI] : [0.6, Math.PI * 0.75];
const VARIANTS = [0, 1, 2];
const W = TILE * YAWS.length,
  H = TILE * VARIANTS.length;

const px = new Float32Array(W * H * 3);
const zb = new Float32Array(W * H).fill(Infinity);
for (let i = 0; i < W * H; i++) {
  px[i * 3] = BG[0];
  px[i * 3 + 1] = BG[1];
  px[i * 3 + 2] = BG[2];
}

// the figures stand on y=0 and reach about 1.6; the head sphere is centred at
// 1.46 with radius 0.13, so framing it means a very short lens very close in
const target: V3 = headMode ? [0, 1.46, 0] : [0, 0.85, 0];
const dist = headMode ? 0.72 : 3.4;
const eyeY = headMode ? 1.5 : 1.15;

for (let vi = 0; vi < VARIANTS.length; vi++) {
  const geo = Po(VARIANTS[vi]);
  for (let ai = 0; ai < YAWS.length; ai++) {
    const a = YAWS[ai];
    const eye: V3 = [Math.sin(a) * dist, eyeY, Math.cos(a) * dist];
    draw(
      geo,
      W,
      H,
      eye,
      target,
      headMode ? 34 : 30,
      px,
      zb,
      ai * TILE,
      vi * TILE,
      TILE,
      TILE,
    );
  }
}

const buf = Buffer.alloc(W * H * 3);
for (let i = 0; i < W * H * 3; i++)
  buf[i] = Math.max(
    0,
    Math.min(255, Math.round(Math.pow(px[i], 1 / 2.2) * 255)),
  );
writeFileSync(out, Buffer.concat([Buffer.from(`P6\n${W} ${H}\n255\n`), buf]));
console.log(
  `${out}  ${W}x${H}  ${VARIANTS.length} variants x ${YAWS.length} angles${headMode ? "  (head)" : ""}`,
);
