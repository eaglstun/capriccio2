#!/usr/bin/env python3
"""
Split the CAPRICCIO production bundle into readable source files.

The bundle has no source map and 100% mangled identifiers, so this is a
LOSSLESS CUT, not a rewrite. Nothing is renamed and nothing is reordered.
Correctness is enforced by reassembly: concatenating the emitted files in
manifest order must reproduce the original app section byte for byte.

Two things make this non-trivial:

  1. GLSL lives in template literals and its lines start at column 0, so
     naive "top-level statement starts at column 0" detection would cut
     straight through the shaders. We track string/template/comment state.

  2. Vendor (three.js r180 + OrbitControls) occupies lines 1..SEAM-1 and must
     not be split up — it is a dependency, not source.

Usage:
    python3 tools/split_bundle.py --analyse     # report only, writes nothing
    python3 tools/split_bundle.py --write       # emit src/
"""

import argparse
import json
import pathlib
import re
import sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from jsmask import mask  # noqa: E402

BUNDLE = pathlib.Path("public/assets/index-DCXbw2vV.js")
OUT = pathlib.Path("src")
RENAMES = OUT / "renames.json"

# Names that are ALSO declared in an inner scope somewhere (from
# scope_graph.py --shadows). A blind global rename on these would corrupt the
# shadowing scope, so the tool refuses to rename them without --force-shadowed.
SHADOWED = {"Ch", "Co", "Fr", "Kt", "Pe", "Pl", "Qe", "Th", "bi",
            "cc", "ct", "gt", "je", "lc"}

# First app declaration: `const j0 = ` — the post-pass fullscreen vertex
# shader. Everything before is three.js and OrbitControls.
SEAM_MARKER = re.compile(r"^const j0 = `$")

# Section boundaries, as ANCHORS rather than fuzzy signatures: each entry is
# a regex matched against the FIRST LINE of a top-level statement. When one
# matches, a new section begins there and every following statement belongs to
# it until the next anchor. This is deterministic and auditable — the boundary
# list is a claim about the code that can be checked by eye.
#
# Anchors were identified by reading each block; see SECTION_TITLES for what
# each one turned out to be.
ANCHORS = [
    (r"^const j0 = `$",            "shaders"),
    (r"^function jn\(i = \{\}\) \{", "materials"),
    (r"^class Rl \{",              "nav"),
    (r"^function ec\(i, t = !1\)", "geometry"),
    (r"^function M_\(i\) \{",      "builders"),
    (r"^class T_ \{",              "world"),
    (r"^class I_ \{",              "infill"),
    (r"^class F_ \{",              "citizens"),
    (r"^function q_\(i\) \{",      "save"),
    (r"^const La = \{",            "catalogue"),
    (r"^class K_ \{",              "overlays"),
    (r"^class Z_ \{",              "tools"),
    (r"^const j_ = \[",            "requests"),
    (r"^class J_ \{",              "modes"),
    (r"^function Dh\(i, t, e\)",   "plates"),
    (r"^class ev \{",              "audio"),
    (r"^const nv = `$",            "hud"),
    (r"^function rv\(i\) \{",      "bootstrap"),
]

SECTION_TITLES = {
    "shaders":   "Engraving GLSL — post pass, hatching, masonry, sky, ink, paper",
    "materials": "Material factory: the onBeforeCompile hook and the stone palette",
    "nav":       "Navigation graph (spatial hash) and the pocket registry",
    "geometry":  "Geometry utilities: merging, primitives, weathering helpers",
    "builders":  "Structure mesh builders — span, rise, vault, wall, ornament. "
                 "Each seeds its PRNG from the action id (Je(id*7919+k)), which "
                 "is what makes replay deterministic.",
    "world":     "World: terrain, structures, pockets, water, applyAction",
    "infill":    "Infill: vernacular buildings and the pickPocket growth engine",
    "citizens":  "Citizens: agent pool, daily routine, pathing",
    "save":      "Save / load — the event-sourced action log",
    "catalogue": "Building catalogue (La) and footprint constants",
    "overlays":  "Build overlays: dashed guides, carvable marks",
    "tools":     "Placement tool state machine (multi-stage picking)",
    "requests":  "Citizen petitions and their flavour text",
    "modes":     "SECTION (cut plane) and WANDER (first-person) modes",
    "plates":    "Plates: the etching capture mechanic",
    "audio":     "Procedural soundscape (Web Audio) — no samples ship",
    "hud":       "HUD: stylesheet and the UI class",
    "bootstrap": "Boot sequence, input wiring, quality meters, window.CAP",
}


def scan_top_level(text):
    """Yield (start_offset, end_offset) for each top-level statement.

    Tracks strings, template literals (including ${} nesting), regex-ish
    slashes and comments so that column-0 lines inside GLSL template
    literals are not mistaken for statement boundaries.
    """
    i, n = 0, len(text)
    depth = 0           # (), [], {} nesting
    tmpl = []           # stack of template-literal ${ } depths
    starts = [0]
    while i < n:
        c = text[i]
        nxt = text[i + 1] if i + 1 < n else ""

        # comments
        if c == "/" and nxt == "/":
            j = text.find("\n", i)
            i = n if j < 0 else j
            continue
        if c == "/" and nxt == "*":
            j = text.find("*/", i + 2)
            i = n if j < 0 else j + 2
            continue

        # plain strings
        if c in "'\"":
            q, i = c, i + 1
            while i < n:
                if text[i] == "\\":
                    i += 2
                    continue
                if text[i] == q:
                    i += 1
                    break
                i += 1
            continue

        # template literals
        if c == "`":
            i += 1
            while i < n:
                if text[i] == "\\":
                    i += 2
                    continue
                if text[i] == "`":
                    i += 1
                    break
                if text[i] == "$" and i + 1 < n and text[i + 1] == "{":
                    # nested expression: recurse by tracking braces
                    i += 2
                    d = 1
                    while i < n and d:
                        if text[i] == "{":
                            d += 1
                        elif text[i] == "}":
                            d -= 1
                        elif text[i] in "'\"`":
                            q = text[i]
                            i += 1
                            while i < n and text[i] != q:
                                i += 2 if text[i] == "\\" else 1
                        i += 1
                    continue
                i += 1
            continue

        if c in "([{":
            depth += 1
        elif c in ")]}":
            depth -= 1
            if depth == 0:
                # statement may end here; consume trailing ; and newline
                j = i + 1
                while j < n and text[j] in " \t;":
                    j += 1
                if j < n and text[j] == "\n":
                    starts.append(j + 1)
                    i = j + 1
                    continue
        elif c == ";" and depth == 0:
            j = i + 1
            while j < n and text[j] in " \t":
                j += 1
            if j < n and text[j] == "\n":
                starts.append(j + 1)
                i = j + 1
                continue
        i += 1

    starts.append(n)
    out = []
    for a, b in zip(starts, starts[1:]):
        if text[a:b].strip():
            out.append((a, b))
    return out


ANCHORS_C = [(re.compile(p), n) for p, n in ANCHORS]
IDENT_RX = re.compile(r"(?<![.\w$])([A-Za-z_$][\w$]*)")


def substitute(text, mapping):
    """Replace identifiers per `mapping`, never inside strings or comments.

    Operates on masked text to find positions, then splices the ORIGINAL text
    so string contents (GLSL uniforms, localStorage keys, UI copy) are
    untouched. Skips property accesses via the lookbehind on `.`.
    """
    if not mapping:
        return text, []
    m = mask(text)
    out, last, shorthand = [], 0, []
    for mo in IDENT_RX.finditer(m):
        name = mo.group(1)
        new = mapping.get(name)
        if new is None:
            continue
        a, b = mo.span(1)
        # shorthand-property detection: `{ x }` / `, x ,` — renaming these
        # would silently change a property KEY, which the inverse check
        # cannot catch. Report them.
        before = m[:a].rstrip()[-1:] if m[:a].strip() else ""
        after = m[b:].lstrip()[:1]
        if before in "{," and after in ",}":
            shorthand.append(name)
        out.append(text[last:a])
        out.append(new)
        last = b
    out.append(text[last:])
    return "".join(out), shorthand


def load_renames(force_shadowed=False):
    if not RENAMES.exists():
        return {}
    raw = json.loads(RENAMES.read_text())
    mapping = {k: v for k, v in raw.items() if not k.startswith("//")}
    bad = sorted(set(mapping) & SHADOWED)
    if bad and not force_shadowed:
        sys.exit(
            f"refusing to rename shadowed names: {bad}\n"
            "These 2-char names are also declared in inner scopes; a global\n"
            "rename would corrupt those scopes. Verify each occurrence by hand,\n"
            "then re-run with --force-shadowed if you are certain."
        )
    dupes = [v for v in mapping.values() if list(mapping.values()).count(v) > 1]
    if dupes:
        sys.exit(f"duplicate target names in renames.json: {sorted(set(dupes))}")
    return mapping


def anchor_of(chunk):
    """Return the section name if this statement opens a new section."""
    first = chunk.strip().split("\n", 1)[0]
    for rx, name in ANCHORS_C:
        if rx.match(first):
            return name
    return None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--write", action="store_true")
    ap.add_argument("--analyse", action="store_true")
    ap.add_argument("--force-shadowed", action="store_true",
                    help="allow renaming names that are shadowed in inner scopes")
    args = ap.parse_args()
    if not (args.write or args.analyse):
        args.analyse = True

    if not BUNDLE.exists():
        sys.exit(f"bundle not found: {BUNDLE}")
    text = BUNDLE.read_text(encoding="utf8")
    lines = text.split("\n")

    seam_line = next((i for i, ln in enumerate(lines) if SEAM_MARKER.match(ln)), None)
    if seam_line is None:
        sys.exit("seam marker not found — bundle changed?")
    seam_off = sum(len(l) + 1 for l in lines[:seam_line])

    vendor, app = text[:seam_off], text[seam_off:]
    print(f"bundle     {len(text):>9} bytes  {len(lines):>6} lines")
    print(f"vendor     {len(vendor):>9} bytes  {seam_line:>6} lines  (three.js r180 + OrbitControls)")
    print(f"app        {len(app):>9} bytes  {len(lines)-seam_line:>6} lines  seam at line {seam_line+1}")

    stmts = scan_top_level(app)
    print(f"\ntop-level statements in app: {len(stmts)}")

    # Walk statements in order. An anchor opens a new section; every
    # statement after it belongs to that section until the next anchor.
    sections, cur, seen = [], None, []
    for a, b in stmts:
        kind = anchor_of(app[a:b])
        if kind:
            seen.append(kind)
            cur = {"kind": kind, "start": a, "end": b, "n": 1}
            sections.append(cur)
        elif cur is None:
            sys.exit("first statement is not an anchor — seam is wrong")
        else:
            cur["end"] = b
            cur["n"] += 1

    missing = [n for _, n in ANCHORS if n not in seen]
    if missing:
        sys.exit(f"anchors never matched: {missing} — bundle changed?")

    print(f"contiguous sections: {len(sections)}\n")
    print(f"{'#':>3}  {'section':<12} {'lines':>7}  {'bytes':>8}  stmts")
    for idx, s in enumerate(sections):
        nl = app[s["start"]:s["end"]].count("\n")
        print(f"{idx:>3}  {s['kind']:<12} {nl:>7}  {s['end']-s['start']:>8}  {s['n']}")

    if not args.write:
        print("\n(analysis only — pass --write to emit src/)")
        return

    OUT.mkdir(exist_ok=True)
    renames = load_renames(args.force_shadowed)
    if renames:
        print(f"\napplying {len(renames)} rename(s) from {RENAMES}")
    manifest = []
    counters = {}
    shorthand_hits = []
    for s in sections:
        k = s["kind"]
        counters[k] = counters.get(k, 0) + 1
        seq = counters[k]
        stem = f"{len(manifest):02d}-{k}" + (f"-{seq}" if seq > 1 else "")
        path = OUT / f"{stem}.js"
        body = app[s["start"]:s["end"]]
        start_line = seam_line + app[:s["start"]].count("\n") + 1
        header = (
            f"// {SECTION_TITLES.get(k, k)}\n"
            f"//\n"
            f"// Extracted verbatim from public/assets/index-DCXbw2vV.js,\n"
            f"// lines {start_line}–{start_line + body.count(chr(10)) - 1}.\n"
            f"// Identifiers are minifier-mangled; nothing here has been renamed.\n"
            f"// Regenerate with: python3 tools/split_bundle.py --write\n\n"
        )
        renamed, shorthand = substitute(body, renames)
        if shorthand:
            shorthand_hits.extend((path.name, n) for n in set(shorthand))
        path.write_text(header + renamed, encoding="utf8")
        manifest.append({
            "file": path.name, "section": k,
            "bundle_start_line": start_line,
            "bytes": len(renamed), "statements": s["n"],
            "header_bytes": len(header),
        })

    (OUT / "manifest.json").write_text(json.dumps({
        "source": str(BUNDLE), "seam_line": seam_line + 1,
        "vendor_lines": seam_line, "app_bytes": len(app),
        "files": manifest,
    }, indent=2), encoding="utf8")

    # ---- integrity check ----
    # With renames applied, byte-identity only holds after undoing them. So we
    # apply the INVERSE map and compare. This proves every rename was a pure
    # identifier substitution and nothing structural changed.
    inverse = {v: k for k, v in renames.items()}
    rebuilt = []
    for m in manifest:
        raw = (OUT / m["file"]).read_text(encoding="utf8")
        body = raw[m["header_bytes"]:]
        if inverse:
            body, _ = substitute(body, inverse)
        rebuilt.append(body)
    rebuilt = "".join(rebuilt)
    ok = rebuilt == app
    print(f"\nwrote {len(manifest)} files to {OUT}/")
    if shorthand_hits:
        print("\nWARNING — renamed in shorthand-property position (changes a KEY,")
        print("which the inverse check cannot detect). Verify by hand:")
        for fn, n in sorted(set(shorthand_hits)):
            print(f"    {fn}: {n}")
    label = "byte-identical after inverse rename" if inverse else "byte-identical to app section"
    print(f"REASSEMBLY CHECK: {'PASS — ' + label if ok else 'FAIL'}")
    if not ok:
        a = next((i for i, (x, y) in enumerate(zip(rebuilt, app)) if x != y), min(len(rebuilt), len(app)))
        print(f"  first divergence at app offset {a}")
        print(f"  expected: {app[a:a+80]!r}")
        print(f"  got     : {rebuilt[a:a+80]!r}")
        sys.exit(1)


if __name__ == "__main__":
    main()
