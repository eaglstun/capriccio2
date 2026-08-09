// Bake the wrecked car into a source module.
//
//   node tools/bake-car.ts
//
// The same argument as tools/bake-head.ts and tools/bake-brazier.ts. CAPRICCIO
// ships no asset files — about.html says so — and the street-clutter pass runs
// synchronously inside the scenery build with nowhere to await a glTF load. So
// the mesh arrives as base64 in a source file and decodes in a function call.
//
// SOURCE. genassets/car-wreck.glb, generated with Tripo3D (text_to_model,
// v3.1-20260211) and then decimated with `highpoly_to_lowpoly` at
// face_limit 4000. genassets/ is gitignored — it is the input to this bake,
// not part of the build. Re-generating will not reproduce this mesh byte for
// byte; generative models are not deterministic across runs, which is why the
// .glb is kept rather than the prompt alone.
//
// WHY THE DECIMATION STEP EXISTS. The raw generate came back at 1,455,316
// triangles and 762,821 vertices. That is unusable twice over: six wrecks
// would be 8.7M triangles of background scenery, and 762k vertices overflows
// the Uint16 index buffer this bake format uses. `highpoly_to_lowpoly` was
// chosen over `convert_model` + face_limit because the gen-3d reference
// records the latter as too blunt for thin features, and a stripped car is
// almost entirely thin features — window frames, torn panels, bare hubs.
// Result: 6,279 triangles, 9,514 vertices.
//
// WHAT THIS DOES TO IT, in order:
//
//  1. Nothing to trim. Unlike the brazier there is no lid to cut off; the
//     prompt asked for exterior only and no ground plane, and the bounds come
//     back clean (X 0.40, Y 0.35, Z 1.00 — length already down +Z, which is
//     the axis the hand built hull used).
//  2. Centres X and Z on the origin and seats the lowest vertex on y = 0, so
//     the caller can drop it at terrainHeightAt() with no fudge.
//  3. Scales uniformly to CAR_LEN along Z — 4.3, the length of the
//     BoxGeometry hull it replaces, so the six placements and their rotations
//     keep working untouched.
//
// Positions are 16-bit, normalised into the bounding box below. Normals are
// recomputed at load rather than stored, which costs microseconds and saves a
// third of this file.
import { readFileSync, writeFileSync } from "node:fs";

const SRC = "genassets/car-wreck.glb";
const OUT = "src/27-car.ts";

// the hand built wreck: BoxGeometry(1.9, 0.6, 4.3) hull + a cab on top
const CAR_LEN = 4.3;

// ---- glTF binary: a 12-byte header, then length-prefixed JSON and BIN chunks
const buf = readFileSync(SRC);
if (buf.readUInt32LE(0) !== 0x46546c67) throw new Error("not a glb");
let off = 12,
  json: any = null,
  bin: Buffer | null = null;
while (off < buf.length) {
  const len = buf.readUInt32LE(off),
    type = buf.readUInt32LE(off + 4),
    body = buf.subarray(off + 8, off + 8 + len);
  if (type === 0x4e4f534a) json = JSON.parse(body.toString("utf8"));
  else if (type === 0x004e4942) bin = body;
  off += 8 + len;
  if (off % 4) off += 4 - (off % 4);
}

const CT: any = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array,
};
const NC: any = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 };
function read(ai: number) {
  const a = json.accessors[ai],
    bv = json.bufferViews[a.bufferView],
    TA = CT[a.componentType],
    n = NC[a.type],
    st = (bv.byteOffset ?? 0) + (a.byteOffset ?? 0),
    out = new Float32Array(a.count * n),
    src = new TA(bin!.buffer, bin!.byteOffset + st, a.count * n);
  for (let i = 0; i < out.length; i++) out[i] = src[i];
  return out;
}

let best: any = null;
for (const m of json.meshes)
  for (const p of m.primitives) {
    const c = json.accessors[p.attributes.POSITION].count;
    if (!best || c > best.c) best = { p, c };
  }
const P = read(best.p.attributes.POSITION);
const I = Array.from(read(best.p.indices));
console.log(`  source: ${P.length / 3} verts, ${I.length / 3} tris`);

if (P.length / 3 > 65535)
  throw new Error(
    `${P.length / 3} verts overflows the Uint16 index buffer — ` +
      `decimate further with highpoly_to_lowpoly before baking`,
  );

const pos = Array.from(P);
const idx = I.slice();

function bounds(p: number[]) {
  const lo = [1e9, 1e9, 1e9],
    hi = [-1e9, -1e9, -1e9];
  for (let i = 0; i < p.length; i += 3)
    for (let k = 0; k < 3; k++) {
      lo[k] = Math.min(lo[k], p[i + k]);
      hi[k] = Math.max(hi[k], p[i + k]);
    }
  return { lo, hi };
}

// ---- centre, seat, scale ------------------------------------------------
{
  const { lo, hi } = bounds(pos);
  const cx = (lo[0] + hi[0]) / 2,
    cz = (lo[2] + hi[2]) / 2;
  const k = CAR_LEN / (hi[2] - lo[2]);
  for (let i = 0; i < pos.length; i += 3) {
    pos[i] = (pos[i] - cx) * k;
    pos[i + 1] = (pos[i + 1] - lo[1]) * k;
    pos[i + 2] = (pos[i + 2] - cz) * k;
  }
}
const { lo, hi } = bounds(pos);
console.log(
  `  placed: ${(hi[0] - lo[0]).toFixed(2)} wide, ` +
    `${(hi[1] - lo[1]).toFixed(2)} tall, ${(hi[2] - lo[2]).toFixed(2)} long`,
);

// ---- quantise and emit --------------------------------------------------
const QLO = [lo[0], lo[1], lo[2]];
const QSPAN = [hi[0] - lo[0] || 1, hi[1] - lo[1] || 1, hi[2] - lo[2] || 1];
const qp = new Int16Array(pos.length);
for (let i = 0; i < pos.length; i += 3)
  for (let k = 0; k < 3; k++)
    qp[i + k] = Math.round(((pos[i + k] - QLO[k]) / QSPAN[k]) * 65535 - 32768);
const qi = new Uint16Array(idx);
const b64 = (t: any) =>
  Buffer.from(t.buffer, t.byteOffset, t.byteLength).toString("base64");

const worst = Math.max(...QSPAN) / 65535;
console.log(`  quantisation error: ${(worst * 1e6).toFixed(1)} microns`);

const out = `// A wrecked car. GENERATED — do not edit by hand.
//
//   node tools/bake-car.ts
//
// Baked from genassets/car-wreck.glb, generated with Tripo3D — its one glTF
// node is named \\\`tripo_node_...\\\`. Decimated from 1.46M triangles with
// \\\`highpoly_to_lowpoly\\\` before baking; the raw generate overflowed the
// Uint16 index buffer this format uses. Centred on X and Z, seated on y = 0,
// and scaled uniformly to ${CAR_LEN}m long — the length of the BoxGeometry hull
// it replaces, so the existing placements and rotations still land.
//
// Baked rather than loaded because this project ships no asset files, and
// because the street-clutter pass runs synchronously with nowhere to await a
// loader.
//
// Positions are 16-bit, normalised into the bounding box below — well under a
// millimetre on a car-sized object. Normals are recomputed at load rather than
// stored, which costs microseconds and saves a third of this file.

import { BufferAttribute, BufferGeometry } from "three";

const TRIS = ${idx.length / 3};
const VERTS = ${pos.length / 3};
const LO = [${QLO.map((v) => v.toFixed(6)).join(", ")}];
const SPAN = [${QSPAN.map((v) => v.toFixed(6)).join(", ")}];

/** Length along +Z, in world units — what the placements were written for. */
export const CAR_LENGTH = ${CAR_LEN};

const POS = "${b64(qp)}";
const IDX = "${b64(qi)}";

function bytes(s: string) {
  const bin = atob(s),
    out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

/**
 * One wrecked car, in local space: centred on X and Z, sitting on y = 0, nose
 * down +Z. ${idx.length / 3} triangles.
 *
 * A fresh BufferGeometry every call — the scenery pass transforms and merges
 * each copy, which mutates the buffer, so callers must not share one.
 */
export function carWreck() {
  const q = new Int16Array(bytes(POS).buffer);
  const p = new Float32Array(VERTS * 3);
  for (let i = 0; i < p.length; i += 3)
    for (let k = 0; k < 3; k++)
      p[i + k] = ((q[i + k] + 32768) / 65535) * SPAN[k] + LO[k];
  const g = new BufferGeometry();
  return (
    g.setAttribute("position", new BufferAttribute(p, 3)),
    g.setIndex(new BufferAttribute(new Uint16Array(bytes(IDX).buffer), 1)),
    g.computeVertexNormals(),
    g
  );
}
`;
writeFileSync(OUT, out);
console.log(`  wrote ${OUT} (${(out.length / 1024).toFixed(0)} KB)`);
