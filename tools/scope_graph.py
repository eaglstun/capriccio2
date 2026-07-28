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

SRC = pathlib.Path("src")
IDENT = re.compile(r"(?<![.\w$])([A-Za-z_$][\w$]*)")
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


def mask(text):
    """Blank out string/template/comment contents, preserving length."""
    out = list(text)
    i, n = 0, len(text)
    while i < n:
        c = text[i]
        nxt = text[i + 1] if i + 1 < n else ""
        if c == "/" and nxt == "/":
            j = text.find("\n", i)
            j = n if j < 0 else j
            for k in range(i, j):
                out[k] = " "
            i = j
            continue
        if c == "/" and nxt == "*":
            j = text.find("*/", i + 2)
            j = n if j < 0 else j + 2
            for k in range(i, j):
                if out[k] != "\n":
                    out[k] = " "
            i = j
            continue
        if c in "'\"`":
            q = c
            j = i + 1
            while j < n:
                if text[j] == "\\":
                    j += 2
                    continue
                if text[j] == q:
                    j += 1
                    break
                j += 1
            for k in range(i + 1, min(j - 1, n)):
                if out[k] != "\n":
                    out[k] = " "
            i = j
            continue
        i += 1
    return "".join(out)


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

    # 2. references per file
    edges = defaultdict(lambda: defaultdict(set))   # consumer -> provider -> names
    vendor_refs = defaultdict(int)
    for fn, f in files.items():
        m = mask(f["body"])
        for mo in IDENT.finditer(m):
            name = mo.group(1)
            if name in JS_GLOBALS or len(name) > 2:
                continue
            prov = owner.get(name)
            if prov is None:
                if len(name) == 2:
                    vendor_refs[name] += 1     # declared in the vendor half
                continue
            if prov != fn:
                edges[fn][prov].add(name)

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
