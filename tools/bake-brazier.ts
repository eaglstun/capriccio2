// Bake the brazier's salvaged drum and tripod into a source module.
//
//   node tools/bake-brazier.ts
//
// The same argument as tools/bake-head.ts, for the same two reasons. CAPRICCIO
// ships no asset files — about.html says so — and buildOrnament() is called
// synchronously while a structure is assembled, with nowhere to await a glTF
// load. So the mesh arrives as base64 in a source file and decodes in a
// function call.
//
// SOURCE. genassets/brazier.glb, generated with Tripo3D (text_to_model,
// v3.1-20260211, geometry only — no texture, no PBR: the game paints it with
// its own `salvage` material and the engraving shader, so a baked-in colour
// would be thrown away). genassets/ is gitignored — it is the input to this
// bake, not part of the build. Re-generating it will not reproduce this mesh
// byte for byte; generative models are not deterministic across runs, which is
// why the .glb is kept rather than the prompt alone.
//
// At 2,813 triangles it carries riveted seams, a rolled rim, punched vent
// slits and a welded angle-iron tripod with a cross-brace — where the hand
// built version was three boxes, two cylinders and a pair of bars.
//
// WHAT THIS DOES TO IT, in order:
//
//  1. Trims the lid. Tripo read "crossed reinforcing bars laid across the open
//     mouth" as a warped plate covering it. The drum has to be OPEN: the coal
//     bed is procedural and is heaped up through the mouth. The rolled rim
//     tops out at y = 0.437 in source units and the plate sits above it from
//     0.454 up, so everything above 0.445 goes.
//  2. Centres the drum axis on x = z = 0 and seats the feet on y = 0.
//  3. Scales UNIFORMLY so the whole thing stands 1.31m — the height the hand
//     built brazier stood, so it occupies the same slot in the skyline.
//
// Note what is NOT done: the drum is not stretched to the old silhouette. The
// hand built one was a 1.12m-wide barrel, which is half again wider than any
// real oil drum; this one lands near 0.6m, which is an actual 55-gallon drum.
// So the mouth moved, and rather than re-guess the magic numbers that sat on
// top of it, the bake MEASURES the mouth and exports it. The coal bed, the
// vent glow and the ember emitter all read those constants — see
// BRAZIER_MOUTH_Y / BRAZIER_MOUTH_R below.
//
// Positions are 16-bit, normalised into the emitted bounding box: over a
// 1.3-metre object that is a precision of about twenty microns. Normals are
// recomputed at load rather than stored — microseconds, and a third of the
// file.

import { readFileSync, writeFileSync } from "node:fs";

const SRC = "genassets/brazier.glb";
const OUT = "src/26-brazier.ts";

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

// ---- trim the lid -------------------------------------------------------
// A triangle survives only if all three corners are below the cut, so the trim
// is a clean edge around the rim rather than a fringe of stretched faces
// reaching up towards a plate that is no longer there.
const CUT = 0.445;
const keep = new Map<number, number>();
const pos: number[] = [];
const idx: number[] = [];
for (let t = 0; t < I.length; t += 3) {
  const vs = [I[t], I[t + 1], I[t + 2]];
  if (vs.some((v) => P[v * 3 + 1] > CUT)) continue;
  for (const v of vs) {
    let n = keep.get(v);
    if (n === undefined) {
      n = pos.length / 3;
      keep.set(v, n);
      pos.push(P[v * 3], P[v * 3 + 1], P[v * 3 + 2]);
    }
    idx.push(n);
  }
}
console.log(`  trimmed: ${pos.length / 3} verts, ${idx.length / 3} tris`);

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
  // the hand built brazier: legs 0.74, drum to 1.24, rim capping it at 1.31
  const HEIGHT = 1.31;
  const k = HEIGHT / (hi[1] - lo[1]);
  for (let i = 0; i < pos.length; i += 3) {
    pos[i] = (pos[i] - cx) * k;
    pos[i + 1] = (pos[i + 1] - lo[1]) * k;
    pos[i + 2] = (pos[i + 2] - cz) * k;
  }
}

const { lo, hi } = bounds(pos);
console.log(
  `  placed: x ${lo[0].toFixed(3)}..${hi[0].toFixed(3)}  y ${lo[1].toFixed(3)}..${hi[1].toFixed(3)}  z ${lo[2].toFixed(3)}..${hi[2].toFixed(3)}`,
);

// ---- measure the mouth --------------------------------------------------
// Everything that used to be a magic number over the drum is derived from
// this instead: the coal bed, the glow in the vent slits, the crossed bars,
// and the height the ember system spawns sparks at. Re-bake with a different
// drum and they all follow it rather than drifting off it.
const MOUTH_Y = hi[1];
let mouthR = 0;
for (let i = 0; i < pos.length; i += 3)
  if (pos[i + 1] > MOUTH_Y - 0.04)
    mouthR = Math.max(mouthR, Math.hypot(pos[i], pos[i + 2]));
// the widest point of the drum wall, below the rim — where the vents are cut
let drumR = 0;
for (let i = 0; i < pos.length; i += 3)
  if (pos[i + 1] > 0.75 && pos[i + 1] < MOUTH_Y - 0.12)
    drumR = Math.max(drumR, Math.hypot(pos[i], pos[i + 2]));
console.log(
  `  mouth: y ${MOUTH_Y.toFixed(3)}  r ${mouthR.toFixed(3)}   drum r ${drumR.toFixed(3)}`,
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

const out = `// The brazier's drum and tripod. GENERATED — do not edit by hand.
//
//   node tools/bake-brazier.ts
//
// Baked from genassets/brazier.glb, generated with Tripo3D — its one glTF node
// is named \`tripo_node_...\`. The lid Tripo put over the mouth is trimmed off
// (the coal bed heaps up through it), the drum axis is centred, the feet are
// seated on y = 0, and the whole thing is scaled uniformly to stand 1.31m —
// the height the hand built brazier stood.
//
// Baked rather than loaded because this project ships no asset files, and
// because buildOrnament() assembles a structure synchronously with nowhere to
// await a loader.
//
// Positions are 16-bit, normalised into the bounding box below — about twenty
// microns of error on a 1.3m object. Normals are recomputed at load rather
// than stored, which costs microseconds and saves a third of this file.

import { BufferAttribute, BufferGeometry } from "three";

const TRIS = ${idx.length / 3};
const VERTS = ${pos.length / 3};
const LO = [${QLO.map((v) => v.toFixed(6)).join(", ")}];
const SPAN = [${QSPAN.map((v) => v.toFixed(6)).join(", ")}];

const POS = "${b64(qp)}";
const IDX = "${b64(qi)}";

function bytes(s: string) {
  const bin = atob(s),
    out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

/**
 * The salvaged drum on its tripod, in structure-local space: axis on the
 * origin, feet on y = 0, mouth at BRAZIER_MOUTH_Y.
 *
 * Metal only. The fire is not here — the coal bed, the glow in the vent slits
 * and the crossed bars over the mouth are all built in code by buildOrnament,
 * because they are a different material and the mouth measurements below are
 * what position them.
 */
export function brazierFrame() {
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

/** Where the drum's rim ends and the fire begins. Measured, not chosen. */
export const BRAZIER_MOUTH_Y = ${MOUTH_Y.toFixed(4)};
/** Radius of the rolled rim at the mouth — what the coal bed has to plug. */
export const BRAZIER_MOUTH_R = ${mouthR.toFixed(4)};
/** Radius of the drum wall below the rim, where the vent slits are cut. */
export const BRAZIER_DRUM_R = ${drumR.toFixed(4)};
/** Overall height, feet to rim. */
export const BRAZIER_HEIGHT = ${hi[1].toFixed(4)};

export const BRAZIER_TRIS = TRIS;
`;
writeFileSync(OUT, out);
console.log(`  wrote ${OUT}  (${(out.length / 1024).toFixed(0)} KB of source)`);
