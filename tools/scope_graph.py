#!/usr/bin/env python3
"""
Cross-file reference graph for src/.

Goal: work out what it would take to turn the lossless split in src/ into real
ES modules — which identifiers cross file boundaries, which come from the
vendor half of the bundle, and where the dependency cycles are.

Method and its limits, stated up front:

  * All 130 top-level declarations in the app section are exactly TWO
    characters. The minifier spends 1-char names on frequent locals, so
    2-char tokens are a decent proxy for top-level references.
  * That is a heuristic, not scope analysis. A 2-char *local* would be a
    false positive. This tool therefore MEASURES that risk (`--shadows`)
    and reports it rather than pretending it doesn't exist.
  * Strings, template literals and comments are masked out before matching,
    so GLSL and UI copy cannot contribute phantom references.

Usage:
    python3 tools/scope_graph.py            # graph + cycles + vendor summary
    python3 tools/scope_graph.py --shadows  # audit shadowing risk
    python3 tools/scope_graph.py --json out.json
"""

import argparse
import json
import pathlib
import re
import sys
from collections import defaultdict

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from jsmask import mask  # noqa: E402

SRC = pathlib.Path("src")
BUNDLE = pathlib.Path("legacy/assets/index-DCXbw2vV.js")
SEAM_LINE = 25400          # vendor is lines 1..SEAM_LINE
IDENT = re.compile(r"(?<![\w$])([A-Za-z_$][\w$]*)")

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

# Column-0 declarations in the vendor half — the authoritative list of names
# the app can legitimately be importing from three.js.
VENDOR_DECL = re.compile(
    r"^(?:async\s+)?(?:class|function|const|let|var)\s+([A-Za-z_$][\w$]*)", re.M)
DECL = re.compile(r"^(?:async\s+)?(?:class|function|const|let|var)\s+([A-Za-z_$][\w$]*)", re.M)
# additional declarators in `const a = 1, b = 2;`
EXTRA_DECL = re.compile(r"^\s{2,}([A-Za-z_$][\w$]*)\s*=", re.M)

JS_GLOBALS = {
    "window", "document", "console", "Math", "JSON", "Object", "Array", "Map",
    "Set", "WeakMap", "WeakSet", "Promise", "Number", "String", "Boolean",
    "Date", "RegExp", "Error", "Symbol", "BigInt", "Infinity", "NaN",
    "undefined", "null", "true", "false", "this", "super", "arguments",
    "localStorage", "sessionStorage", "location", "navigator", "performance",
    "requestAnimationFrame", "cancelAnimationFrame", "setTimeout",
    "setInterval", "clearTimeout", "clearInterval", "fetch", "URL",
    "URLSearchParams", "AudioContext", "Float32Array", "Uint8Array",
    "Uint16Array", "Uint32Array", "Int32Array", "ArrayBuffer", "DataView",
    "structuredClone", "queueMicrotask", "isNaN", "isFinite", "parseInt",
    "parseFloat", "encodeURIComponent", "decodeURIComponent", "Intl", "Blob",
    "Image", "CanvasRenderingContext2D", "devicePixelRatio", "getComputedStyle",
    # keywords that survive the identifier regex
    "if", "else", "for", "while", "do", "return", "break", "continue", "new",
    "typeof", "instanceof", "in", "of", "let", "const", "var", "function",
    "class", "extends", "static", "get", "set", "async", "await", "yield",
    "throw", "try", "catch", "finally", "switch", "case", "default", "delete",
    "void", "export", "import", "from", "as",
}


def load():
    mf = SRC / "manifest.json"
    if not mf.exists():
        sys.exit("src/manifest.json missing — run tools/split_bundle.py --write")
    man = json.loads(mf.read_text())
    files = {}
    for m in man["files"]:
        raw = (SRC / m["file"]).read_text(encoding="utf8")
        files[m["file"]] = {
            "section": m["section"],
            "body": raw[m["header_bytes"]:],
            "start": m["bundle_start_line"],
        }
    return man, files


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--shadows", action="store_true")
    ap.add_argument("--json")
    args = ap.parse_args()

    man, files = load()

    # 1. declared top-level names per file
    owner, decls = {}, defaultdict(list)
    for fn, f in files.items():
        m = mask(f["body"])
        for rx in (DECL, EXTRA_DECL):
            for mo in rx.finditer(m):
                name = mo.group(1)
                if rx is EXTRA_DECL and len(name) != 2:
                    continue          # only trust the 2-char convention here
                if name in JS_GLOBALS:
                    continue
                if name not in owner:
                    owner[name] = fn
                    decls[fn].append(name)
    print(f"top-level names: {len(owner)} across {len(files)} files\n")

    # Names actually declared at column 0 in the vendor half. Checking against
    # this — rather than assuming "2 chars and not ours" — is what keeps
    # object-literal keys and inner locals out of the vendor list.
    vendor_decls = set()
    if BUNDLE.exists():
        vtext = mask("\n".join(
            BUNDLE.read_text(encoding="utf8").split("\n")[:SEAM_LINE]))
        vendor_decls = set(VENDOR_DECL.findall(vtext))
        # continuation declarators: `const a = 1,\n  Ua = 2,` — three.js
        # declares many of its enum constants this way and a column-0 scan
        # alone misses them.
        vendor_decls |= set(re.findall(r"^\s{2}([A-Za-z_$][\w$]{1,3})\s*=\s*[^=]",
                                       vtext, re.M))

    def is_object_key(m, a, b):
        """True if this identifier sits in `{ key: ...}` or `, key: ...` position.

        Object keys are not preceded by '.', so they slip past the lookbehind.
        Ternaries (`x ? y : z`) are excluded because `y` is preceded by '?'.
        """
        after = m[b:]
        if not re.match(r"\s*:", after):
            return False
        before = m[:a].rstrip()
        return before[-1:] in "{,"

    # 2. references per file
    edges = defaultdict(lambda: defaultdict(set))   # consumer -> provider -> names
    vendor_refs = defaultdict(int)
    dropped_keys = defaultdict(int)
    for fn, f in files.items():
        m = mask(f["body"])
        for mo in IDENT.finditer(m):
            name = mo.group(1)
            if name in JS_GLOBALS:
                continue
            a, b = mo.span(1)
            if is_property_access(m, a):
                continue
            prov = owner.get(name)
            if prov is not None:
                if prov != fn and not is_object_key(m, a, b):
                    edges[fn][prov].add(name)
                continue
            # not ours — is it genuinely declared in the vendor half?
            if name in vendor_decls:
                if is_object_key(m, a, b):
                    dropped_keys[name] += 1
                else:
                    vendor_refs[name] += 1

    print("=== cross-file dependencies ===")
    order = [m["file"] for m in man["files"]]
    for fn in order:
        deps = edges.get(fn, {})
        if not deps:
            print(f"  {fn:<22} (none)")
            continue
        tot = sum(len(v) for v in deps.values())
        print(f"  {fn:<22} needs {tot:>3} names from {len(deps)} file(s)")
        for prov, names in sorted(deps.items(), key=lambda kv: -len(kv[1])):
            sample = ", ".join(sorted(names)[:8])
            more = f" +{len(names)-8}" if len(names) > 8 else ""
            print(f"      ← {prov:<22} {len(names):>3}: {sample}{more}")

    # 3. cycles
    print("\n=== dependency cycles ===")
    idx = {f: i for i, f in enumerate(order)}
    back = [(c, p) for c in order for p in edges.get(c, {}) if idx[p] > idx[c]]
    if not back:
        print("  none — dependencies all point backwards; a linear module order works")
    else:
        print(f"  {len(back)} forward reference(s) (consumer declared before provider):")
        for c, p in back:
            names = sorted(edges[c][p])
            print(f"    {c} → {p}  ({len(names)}): {', '.join(names[:10])}")

    # 4. vendor surface
    print(f"\n=== vendor symbols referenced (declared in three.js half) ===")
    top = sorted(vendor_refs.items(), key=lambda kv: -kv[1])
    print(f"  {len(top)} distinct symbols, {sum(vendor_refs.values())} references")
    print("  most used:", ", ".join(f"{n}({c})" for n, c in top[:18]))
    if dropped_keys:
        dk = sorted(dropped_keys.items(), key=lambda kv: -kv[1])
        print(f"  ({len(dk)} name(s) excluded as object-literal keys: "
              + ", ".join(f"{n}x{c}" for n, c in dk[:10]) + ")")

    # 5. shadow audit
    if args.shadows:
        print("\n=== shadowing risk audit ===")
        risky = []
        for fn, f in files.items():
            m = mask(f["body"])
            for mo in re.finditer(r"(?:const|let|var)\s+([A-Za-z_$][\w$]*)|\(\s*([A-Za-z_$][\w$]*)\s*[,)]", m):
                nm = mo.group(1) or mo.group(2)
                if nm and len(nm) == 2 and nm in owner:
                    col = m.rfind("\n", 0, mo.start())
                    indented = mo.start() - col > 1 and m[col + 1] in " \t"
                    if indented:
                        risky.append((fn, nm))
        if not risky:
            print("  none — no 2-char top-level name is ever redeclared in an inner scope.")
            print("  The 2-char heuristic is sound for this bundle.")
        else:
            seen = defaultdict(set)
            for fn, nm in risky:
                seen[nm].add(fn)
            print(f"  {len(seen)} name(s) shadowed somewhere — edges involving these are suspect:")
            for nm, fs in sorted(seen.items())[:25]:
                print(f"    {nm}  declared top-level in {owner[nm]}, shadowed in {len(fs)} file(s)")

    if args.json:
        out = {
            "owner": owner,
            "edges": {c: {p: sorted(v) for p, v in d.items()} for c, d in edges.items()},
            "vendor": dict(sorted(vendor_refs.items(), key=lambda kv: -kv[1])),
        }
        pathlib.Path(args.json).write_text(json.dumps(out, indent=2))
        print(f"\nwrote {args.json}")


if __name__ == "__main__":
    main()
