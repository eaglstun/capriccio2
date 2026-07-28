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
from collections import defaultdict
import json
import pathlib
import re
import sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from jsmask import mask  # noqa: E402

BUNDLE = pathlib.Path("public/assets/index-DCXbw2vV.js")
OUT = pathlib.Path("src")
RENAMES = OUT / "renames.json"
VENDOR_IMPORTS = OUT / "vendor-imports.json"

# Generated blocks are delimited so the integrity check can strip them exactly
# and still prove byte-identity with the original.
GEN_OPEN = "// --- generated imports ---\n"
GEN_CLOSE = "// --- end generated imports ---\n\n"
EXP_OPEN = "\n// --- generated exports ---\n"

DECL_RX = re.compile(
    r"^(?:async\s+)?(?:class|function|const|let|var)\s+([A-Za-z_$][\w$]*)", re.M)
CONT_RX = re.compile(r"^\s{2}([A-Za-z_$][\w$]*)\s*=\s*[^=]", re.M)


def declared_names(stmt, masked):
    """Names a single top-level statement introduces.

    A `const a = 1,\\n  b = 2;` statement declares both. But a 2-space-indented
    `x = ...` inside a function body is a LOCAL, not a declaration — prettier
    indents both identically. So continuation declarators are only accepted
    when the statement is a const/let/var AND the line sits at bracket depth 0
    within that statement.
    """
    out = []
    mo = DECL_RX.match(masked)
    if mo:
        out.append(mo.group(1))
    if not re.match(r"^(?:const|let|var)\b", masked):
        return out
    for cm in CONT_RX.finditer(masked):
        depth = (masked[:cm.start()].count("(") - masked[:cm.start()].count(")")
                 + masked[:cm.start()].count("[") - masked[:cm.start()].count("]")
                 + masked[:cm.start()].count("{") - masked[:cm.start()].count("}"))
        if depth == 0 and cm.group(1) not in out:
            out.append(cm.group(1))
    return out

JS_KEYWORDS = {
    "if", "else", "for", "while", "do", "return", "break", "continue", "new",
    "typeof", "instanceof", "in", "of", "let", "const", "var", "function",
    "class", "extends", "static", "get", "set", "async", "await", "yield",
    "throw", "try", "catch", "finally", "switch", "case", "default", "delete",
    "void", "this", "super", "arguments", "true", "false", "null", "undefined",
    "export", "import", "from", "as", "Math", "JSON", "Object", "Array", "Map",
    "Set", "Promise", "Number", "String", "Boolean", "Date", "RegExp", "Error",
    "Symbol", "Infinity", "NaN", "window", "document", "console", "localStorage",
    "location", "navigator", "performance", "requestAnimationFrame", "setTimeout",
    "setInterval", "clearTimeout", "clearInterval", "fetch", "URL", "Image",
    "URLSearchParams", "AudioContext", "Float32Array", "Uint8Array", "Blob",
    "Uint16Array", "Uint32Array", "Int32Array", "ArrayBuffer", "structuredClone",
    "isNaN", "isFinite", "parseInt", "parseFloat", "devicePixelRatio",
    "encodeURIComponent", "decodeURIComponent", "getComputedStyle", "WeakMap",
}

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
IDENT_RX = re.compile(r"(?<![\w$])([A-Za-z_$][\w$]*)")

def is_property_access(masked, start):
    r"""True if the identifier at `start` is a `.prop` access.

    NOT a property access when preceded by `...` — spread syntax also ends in
    a dot, and a naive `(?<![.\w$])` lookbehind silently skips every
    spread-referenced identifier. That bug left `...yt` unrenamed while every
    other `yt` became `gameState`, and the rebuilt game threw
    `ReferenceError: yt is not defined` from CAP.status().
    """
    before = masked[:start]
    if not before.endswith("."):
        return False
    return not before.endswith("...")


# Statements hoisted out of their section into src/_hoisted.js.
#
# In one flat scope a `function` declaration is hoisted, so position does not
# matter. Splitting into ES modules turns that free hoisting into a real
# dependency — and where the reference points FORWARD it becomes an import
# cycle. `16-hud.js` calls `rv()` (declared later, in the bootstrap section)
# from inside a template literal; bootstrap in turn constructs `new Hud(...)`
# at top level. Rollup has to pick an evaluation order for the cycle, picks
# bootstrap first, and the game dies with
#
#     ReferenceError: Cannot access 'Hud' before initialization
#
# Relocating the function reproduces the hoisting the original relied on.
# The relocation is RECORDED in the manifest and UNDONE by the integrity
# check, so byte-identity with the original still holds.
RELOCATE = [re.compile(r"^function rv\(i\) \{")]
HOISTED = "_hoisted.js"


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
        if is_property_access(m, a):
            continue
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
    ap.add_argument("--force-overwrite", action="store_true",
                    help="overwrite src/ even if it has been hand-edited")
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
            cur = {"kind": kind, "start": a, "end": b, "n": 1, "spans": [(a, b)]}
            sections.append(cur)
        elif cur is None:
            sys.exit("first statement is not an anchor — seam is wrong")
        else:
            cur["end"] = b
            cur["n"] += 1
            cur["spans"].append((a, b))

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
    if (OUT / ".hand-edited").exists() and not args.force_overwrite:
        sys.exit(
            f"refusing to write: {OUT}/.hand-edited exists.\n"
            f"{OUT}/ has been modified by hand and is no longer a pure function of\n"
            "the bundle. Regenerating would overwrite those edits and the integrity\n"
            "check would still PASS, because it verifies the regenerated files.\n"
            f"See {OUT}/DO-NOT-REGENERATE.md. Use --force-overwrite only if you\n"
            "genuinely intend to discard the hand edits."
        )
    renames = load_renames(args.force_shadowed)
    if renames:
        print(f"\napplying {len(renames)} rename(s) from {RENAMES}")
    shorthand_hits = []

    # ---- pass 1: rename each section, record its declarations ----
    parts = []
    counters = {}
    for i, s in enumerate(sections):
        k = s["kind"]
        counters[k] = counters.get(k, 0) + 1
        seq = counters[k]
        stem = f"{i:02d}-{k}" + (f"-{seq}" if seq > 1 else "")
        keep, reloc, pos = [], [], 0
        for (sa, sb) in s["spans"]:
            stmt = app[sa:sb]
            if any(rx.match(stmt.lstrip()) for rx in RELOCATE):
                reloc.append({"offset": pos, "text": stmt})
                continue
            keep.append(stmt)
            pos += len(stmt)
        body = "".join(keep)
        renamed, shorthand = substitute(body, renames)
        if shorthand:
            shorthand_hits.extend((stem, n) for n in set(shorthand))
        m = mask(renamed)
        names = []
        for (a, b) in s["spans"]:
            raw_stmt = app[a:b]
            if any(rx.match(raw_stmt.lstrip()) for rx in RELOCATE):
                continue          # moved to _hoisted.js; it exports these
            st, _ = substitute(raw_stmt, renames)
            for nm in declared_names(st, mask(st)):
                if nm not in names:
                    names.append(nm)
        parts.append({
            "stem": stem, "kind": k, "body": renamed, "masked": m,
            "decls": names, "stmts": s["n"], "reloc": reloc,
            "start_line": seam_line + app[:s["start"]].count("\n") + 1,
        })

    owner = {}
    for p in parts:
        for nm in p["decls"]:
            owner.setdefault(nm, p["stem"])
    for p in parts:
        for r in p["reloc"]:
            for nm in declared_names(r["text"], mask(r["text"])):
                owner[substitute(nm, renames)[0]] = HOISTED[:-3]

    vspec = json.loads(VENDOR_IMPORTS.read_text()) if VENDOR_IMPORTS.exists() else {}
    vmodule = {n: mod for mod, ns in vspec.get("modules", {}).items() for n in ns}
    valias = vspec.get("aliases", {})

    # ---- collect relocated statements into _hoisted.js ----
    hoisted_pieces, hoist_index = [], {}
    for p in parts:
        for r in p["reloc"]:
            rtext, _ = substitute(r["text"], renames)
            hoist_index[(p["stem"], r["offset"])] = (
                sum(len(x) for x in hoisted_pieces), len(rtext))
            hoisted_pieces.append(rtext)
    hoisted_body = "".join(hoisted_pieces)
    hoisted_names = []
    for piece in hoisted_pieces:
        hoisted_names += declared_names(piece, mask(piece))

    # ---- pass 2: resolve references, emit imports/exports ----
    manifest = []
    for p in parts:
        needs = defaultdict(set)     # module or file -> names
        for mo in IDENT_RX.finditer(p["masked"]):
            nm = mo.group(1)
            if nm in p["decls"] or nm in JS_KEYWORDS:
                continue
            if is_property_access(p["masked"], mo.start(1)):
                continue
            prov = owner.get(nm)
            if prov:
                needs[f"./{prov}.js"].add(nm)
            elif nm in vmodule:
                needs[vmodule[nm]].add(nm)
            elif nm in valias:
                needs[valias[nm]["module"]].add(
                    f'{valias[nm]["name"]} as {nm}')

        imports = ""
        if needs:
            lines = []
            for mod in sorted(needs, key=lambda x: (not x.startswith("three"), x)):
                ns = ", ".join(sorted(needs[mod]))
                lines.append(f'import {{ {ns} }} from "{mod}";')
            imports = GEN_OPEN + "\n".join(lines) + "\n" + GEN_CLOSE

        exported = sorted(n for n in p["decls"]
                          if any(n in q["masked"] for q in parts if q is not p))
        exports = ""
        if exported:
            exports = EXP_OPEN + f"export {{ {', '.join(exported)} }};\n"

        header = (
            f"// {SECTION_TITLES.get(p['kind'], p['kind'])}\n"
            f"//\n"
            f"// Extracted from public/assets/index-DCXbw2vV.js, bundle lines\n"
            f"// {p['start_line']}–{p['start_line'] + p['body'].count(chr(10)) - 1}. "
            f"Statements are verbatim; identifiers are\n"
            f"// renamed via src/renames.json. Imports and exports are generated.\n"
            f"// Regenerate: python3 tools/split_bundle.py --write\n\n"
        )
        path = OUT / f"{p['stem']}.js"
        path.write_text(header + imports + p["body"] + exports, encoding="utf8")
        manifest.append({
            "file": path.name, "section": p["kind"],
            "bundle_start_line": p["start_line"],
            "bytes": len(p["body"]), "statements": p["stmts"],
            "header_bytes": len(header),
            "prologue_bytes": len(imports),
            "epilogue_bytes": len(exports),
            "imports": {m: sorted(v) for m, v in needs.items()},
            "exports": exported,
            "relocated": [
                {"offset": r["offset"],
                 "hoisted_start": hoist_index[(p["stem"], r["offset"])][0],
                 "hoisted_len": hoist_index[(p["stem"], r["offset"])][1]}
                for r in p["reloc"]
            ],
        })

    # ---- emit _hoisted.js ----
    if hoisted_body:
        hm = mask(hoisted_body)
        hneeds = defaultdict(set)
        for mo in IDENT_RX.finditer(hm):
            nm = mo.group(1)
            if nm in hoisted_names or nm in JS_KEYWORDS:
                continue
            if is_property_access(hm, mo.start(1)):
                continue
            prov = owner.get(nm)
            if prov and prov != HOISTED[:-3]:
                hneeds[f"./{prov}.js"].add(nm)
            elif nm in vmodule:
                hneeds[vmodule[nm]].add(nm)
        himp = ""
        if hneeds:
            himp = GEN_OPEN + "\n".join(
                f'import {{ {", ".join(sorted(v))} }} from "{m}";'
                for m in sorted(hneeds)) + "\n" + GEN_CLOSE
        hhead = (
            "// Hoisted declarations.\n"
            "//\n"
            "// These `function` declarations were hoisted in the original single\n"
            "// scope, so callers could sit ABOVE them. Splitting into ES modules\n"
            "// turns that into a forward import — and, where the callee imports\n"
            "// the caller back, an evaluation cycle that Rollup resolves in the\n"
            "// wrong order (`Cannot access 'Hud' before initialization`).\n"
            "//\n"
            "// Moving them here reproduces the original hoisting. The relocation\n"
            "// is recorded in manifest.json and undone by the integrity check,\n"
            "// so byte-identity with the original bundle still holds.\n"
            "// Regenerate: python3 tools/split_bundle.py --write\n\n"
        )
        hexp = EXP_OPEN + f"export {{ {', '.join(hoisted_names)} }};\n"
        (OUT / HOISTED).write_text(hhead + himp + hoisted_body + hexp, encoding="utf8")
        print(f"hoisted {len(hoisted_pieces)} statement(s) -> src/{HOISTED}: "
              + ", ".join(hoisted_names))

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
        start = m["header_bytes"] + m.get("prologue_bytes", 0)
        end = len(raw) - m.get("epilogue_bytes", 0)
        body = raw[start:end]
        if m.get("relocated"):
            hraw = (OUT / HOISTED).read_text(encoding="utf8")
            hbody = hraw[hraw.index(EXP_OPEN) - 0:] if False else hraw
            hstart = hraw.index(GEN_CLOSE) + len(GEN_CLOSE) if GEN_CLOSE in hraw \
                else hraw.index("\n\n") + 2
            hcode = hraw[hstart:hraw.index(EXP_OPEN)]
            for r in sorted(m["relocated"], key=lambda x: -x["offset"]):
                piece = hcode[r["hoisted_start"]:r["hoisted_start"] + r["hoisted_len"]]
                body = body[:r["offset"]] + piece + body[r["offset"]:]
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
