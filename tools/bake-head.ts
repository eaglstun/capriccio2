// Bake the karaoke-headset mannequin head into a source module.
//
//   node tools/bake-head.ts
//
// WHY BAKE RATHER THAN LOAD. Two reasons, and the second is the practical one.
// CAPRICCIO ships no asset files — every stone, citizen and sound is generated
// in code at load, and the about page says so — and a .glb is an asset. But
// also: Po() is called synchronously from the Citizens constructor, and a glTF
// load is asynchronous, so shipping the file would mean threading a promise
// through the whole population setup. A baked mesh stays a plain function call.
//
// The source is ios/KaraokeVR/GenAssets/mannequin-head-lowpoly.glb, which its
// own glTF node names `tripo_node_...` — it was generated with Tripo3D. At
// 3,998 triangles it carries eyelids, nostrils, lips, ears and a real jaw,
// which is 16% more geometry than the smooth procedural ovoid and immensely
// more face.
//
// What this does to it: trims the bust off below the neck, turns it a quarter
// turn (it faces +X; the citizens face +Z), scales the chin-to-crown height to
// the head the game already had, and sits the chin just clear of the shoulder
// cone. Then it writes positions and indices as base64 — quantised to 16 bits,
// which over this range is a precision of a few microns and about a quarter
// the size of the decimal text.
//
// Normals are NOT baked: computeVertexNormals() at startup costs microseconds
// and saves a third of the payload.

import { readFileSync, writeFileSync } from "node:fs";

const SRC =
  process.env.HOME +
  "/Documents/dev/karaoke-headset/ios/KaraokeVR/GenAssets/mannequin-head-lowpoly.glb";
const OUT = "src/24-citizen-head.ts";

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

// ---- trim the bust ------------------------------------------------------
// The radius-by-height profile has its waist at y = -0.25 (the neck) and
// flares again below into shoulders. Keep a little below the waist so there is
// a stub to tuck inside the citizen's shoulder cone, and drop the rest.
const CUT = -0.3;
const keep = new Map<number, number>();
const pos: number[] = [];
const idx: number[] = [];
for (let t = 0; t < I.length; t += 3) {
  const vs = [I[t], I[t + 1], I[t + 2]];
  // a triangle survives only if all three corners are above the cut, so the
  // trim is a clean edge rather than a fringe of stretched faces
  if (vs.some((v) => P[v * 3 + 1] < CUT)) continue;
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

// ---- orient, scale, seat ------------------------------------------------
// It faces +X — the deep axis is x, and the nose is on the positive side. A
// quarter turn about Y sends +X to +Z, which is where the citizens look
// (dummy.lookAt aims +Z down the direction of travel). Turning it the other
// way put the face on the back of the head, which the 180-degree column of the
// preview catches immediately — that column exists for exactly this.
for (let i = 0; i < pos.length; i += 3) {
  const x = pos[i],
    z = pos[i + 2];
  pos[i] = -z;
  pos[i + 2] = x;
}

let lo = [1e9, 1e9, 1e9],
  hi = [-1e9, -1e9, -1e9];
for (let i = 0; i < pos.length; i += 3)
  for (let k = 0; k < 3; k++) {
    lo[k] = Math.min(lo[k], pos[i + k]);
    hi[k] = Math.max(hi[k], pos[i + k]);
  }

// The head this replaces was a 0.13-radius sphere: 260mm crown to chin. Match
// that so the silhouette does not jump. The chin is not the lowest point any
// more (the neck stub is), so measure from the crown down by the head's own
// proportion — 0.7 of the kept height is chin-to-crown on this mesh.
const kept = hi[1] - lo[1];
const HEAD_H = 0.26;
const k = HEAD_H / (kept * 0.7);
const cx = (lo[0] + hi[0]) / 2,
  cz = (lo[2] + hi[2]) / 2;
// shoulder cone tops out at y = 1.40; put the chin just above it
const CHIN_Y = 1.408;
const chinSrc = hi[1] - kept * 0.7;
for (let i = 0; i < pos.length; i += 3) {
  pos[i] = (pos[i] - cx) * k;
  pos[i + 1] = (pos[i + 1] - chinSrc) * k + CHIN_Y;
  pos[i + 2] = (pos[i + 2] - cz) * k;
}

lo = [1e9, 1e9, 1e9];
hi = [-1e9, -1e9, -1e9];
for (let i = 0; i < pos.length; i += 3)
  for (let kk = 0; kk < 3; kk++) {
    lo[kk] = Math.min(lo[kk], pos[i + kk]);
    hi[kk] = Math.max(hi[kk], pos[i + kk]);
  }
console.log(
  `  placed: x ${lo[0].toFixed(3)}..${hi[0].toFixed(3)}  y ${lo[1].toFixed(3)}..${hi[1].toFixed(3)}  z ${lo[2].toFixed(3)}..${hi[2].toFixed(3)}`,
);

// ---- quantise and emit --------------------------------------------------
const QLO = [lo[0], lo[1], lo[2]];
const QSPAN = [hi[0] - lo[0] || 1, hi[1] - lo[1] || 1, hi[2] - lo[2] || 1];
const qp = new Int16Array(pos.length);
for (let i = 0; i < pos.length; i += 3)
  for (let kk = 0; kk < 3; kk++)
    qp[i + kk] = Math.round(
      ((pos[i + kk] - QLO[kk]) / QSPAN[kk]) * 65535 - 32768,
    );
const qi = new Uint16Array(idx);
const b64 = (t: any) =>
  Buffer.from(t.buffer, t.byteOffset, t.byteLength).toString("base64");

const worst = Math.max(...QSPAN) / 65535;
console.log(`  quantisation error: ${(worst * 1e6).toFixed(1)} microns`);

const out = `// The citizens' head. GENERATED — do not edit by hand.
//
//   node tools/bake-head.ts
//
// Baked from karaoke-headset's ios/KaraokeVR/GenAssets/mannequin-head-lowpoly.glb,
// whose own glTF node is named \`tripo_node_...\`: it was generated with Tripo3D.
// The bust below the neck is trimmed off, it is turned a quarter turn to face
// +Z the way the citizens walk, scaled so the crown-to-chin height matches the
// 260mm sphere it replaces, and seated with the chin just clear of the shoulder
// cone at y = 1.408.
//
// Baked rather than loaded because this project ships no asset files, and
// because Po() runs synchronously inside the Citizens constructor where an
// async glTF load has nowhere to go.
//
// Positions are 16-bit, normalised into the bounding box below — a few microns
// of error on a head measured in centimetres. Normals are recomputed at build
// time rather than stored, which costs microseconds and saves a third of this
// file.

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

/** The head, as a BufferGeometry positioned in citizen-local space. */
export function citizenHead() {
  const qp = new Int16Array(bytes(POS).buffer);
  const p = new Float32Array(VERTS * 3);
  for (let i = 0; i < p.length; i += 3)
    for (let k = 0; k < 3; k++)
      p[i + k] = ((qp[i + k] + 32768) / 65535) * SPAN[k] + LO[k];
  const g = new BufferGeometry();
  return (
    g.setAttribute("position", new BufferAttribute(p, 3)),
    g.setIndex(new BufferAttribute(new Uint16Array(bytes(IDX).buffer), 1)),
    g.computeVertexNormals(),
    g
  );
}

export const CITIZEN_HEAD_TRIS = TRIS;
`;
writeFileSync(OUT, out);
console.log(`  wrote ${OUT}  (${(out.length / 1024).toFixed(0)} KB of source)`);
