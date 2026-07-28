#!/usr/bin/env python3
"""Fingerprint the CODE in src/, ignoring comments and whitespace.

Documenting a codebase means adding thousands of lines that must not change
what the program does. The byte-identical check in split_bundle.py cannot help
here — comments are new bytes by definition, and src/ is hand-edited anyway.

So this is the equivalent guarantee for a commenting pass:

    strip every comment, normalise whitespace, hash what remains.

If the fingerprint is unchanged, the only thing that changed was commentary.
If it moved, a comment edit touched real code and needs looking at.

    python3 tools/code_fingerprint.py --save     # record the baseline
    python3 tools/code_fingerprint.py            # compare against it

String and template contents are preserved exactly — a `//` inside a GLSL
template literal is program text, not a comment, and removing it would change
the shaders.
"""

import argparse
import hashlib
import json
import pathlib
import re
import sys

SRC = pathlib.Path("src")
BASELINE = pathlib.Path("tools/.code-fingerprint.json")


def strip_comments(text):
    """Remove // and /* */ comments. Leave string and template contents alone."""
    out = []
    i, n = 0, len(text)
    while i < n:
        c = text[i]
        nxt = text[i + 1] if i + 1 < n else ""

        if c == "/" and nxt == "/":
            j = text.find("\n", i)
            i = n if j < 0 else j          # drop through end of line
            continue
        if c == "/" and nxt == "*":
            j = text.find("*/", i + 2)
            i = n if j < 0 else j + 2
            out.append(" ")                # keep tokens apart
            continue
        if c in "'\"":
            q, j = c, i + 1
            while j < n:
                if text[j] == "\\":
                    j += 2
                    continue
                if text[j] == q:
                    j += 1
                    break
                j += 1
            out.append(text[i:j])
            i = j
            continue
        if c == "`":
            j = i + 1
            while j < n:
                if text[j] == "\\":
                    j += 2
                    continue
                if text[j] == "`":
                    j += 1
                    break
                j += 1
            out.append(text[i:j])          # template contents verbatim
            i = j
            continue
        out.append(c)
        i += 1
    return "".join(out)


def fingerprint(path):
    code = strip_comments(path.read_text(encoding="utf8"))
    # collapse all runs of whitespace so reflowing a line is invisible too
    code = re.sub(r"\s+", " ", code).strip()
    return hashlib.sha256(code.encode("utf8")).hexdigest()[:16], len(code)


def collect():
    return {p.name: fingerprint(p) for p in sorted(SRC.glob("*.js"))}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--save", action="store_true", help="record the current state as the baseline")
    args = ap.parse_args()

    now = collect()

    if args.save:
        BASELINE.write_text(json.dumps(now, indent=2))
        total = sum(v[1] for v in now.values())
        print(f"baseline saved: {len(now)} files, {total:,} chars of code")
        return

    if not BASELINE.exists():
        sys.exit("no baseline — run with --save first")

    was = {k: tuple(v) for k, v in json.loads(BASELINE.read_text()).items()}
    changed, added, removed = [], [], []
    for name, val in now.items():
        if name not in was:
            added.append(name)
        elif was[name][0] != val[0]:
            changed.append((name, was[name], val))
    for name in was:
        if name not in now:
            removed.append(name)

    for name in added:
        print(f"  NEW FILE   {name}")
    for name in removed:
        print(f"  REMOVED    {name}")
    for name, old, new in changed:
        delta = new[1] - old[1]
        print(f"  CODE CHANGED  {name}   {old[0]} -> {new[0]}   ({delta:+d} chars)")

    if changed:
        print(f"\nFAIL: {len(changed)} file(s) had real code change, not just comments.")
        sys.exit(1)
    print(f"PASS: code identical across {len(now)} files — only comments changed.")


if __name__ == "__main__":
    main()
