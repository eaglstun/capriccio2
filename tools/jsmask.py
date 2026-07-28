#!/usr/bin/env python3
"""Mask JS string/comment contents, preserving length and newlines.

Shared by split_bundle.py and scope_graph.py. Every identifier operation in
this project must run against masked text, because the bundle embeds GLSL,
CSS and UI copy in template literals — matching identifiers in there would
corrupt shader uniform names and localStorage keys.

CRITICAL: `${...}` interpolations inside template literals are LIVE CODE and
must NOT be masked. Blanking them hides real identifier references. That bug
cost a build: `16-hud.js` calls `rv(t)` only from inside

    `day ${rv(t)} · ${n[s]}`

so the reference was invisible, no import was generated, and the rebuilt game
threw `ReferenceError: rv is not defined` at runtime.

Structure: `skip_*` helpers each consume EXACTLY ONE construct and return the
index just past it. Anything that consumes more than one construct per call
will over-blank — an earlier version did exactly that and silently erased most
of the file.
"""


def mask(text):
    out = list(text)
    n = len(text)

    def blank(a, b):
        for k in range(max(a, 0), min(b, n)):
            if out[k] != "\n":
                out[k] = " "

    def skip_line_comment(i):
        j = text.find("\n", i)
        j = n if j < 0 else j
        blank(i, j)
        return j

    def skip_block_comment(i):
        j = text.find("*/", i + 2)
        j = n if j < 0 else j + 2
        blank(i, j)
        return j

    def skip_string(i):
        q, j = text[i], i + 1
        while j < n:
            if text[j] == "\\":
                j += 2
                continue
            if text[j] == q:
                j += 1
                break
            j += 1
        blank(i + 1, j - 1)
        return j

    def skip_template(i):
        """i is at the opening backtick. Blanks literal text, keeps ${} code."""
        j = i + 1
        seg = j
        while j < n:
            c = text[j]
            if c == "\\":
                j += 2
                continue
            if c == "`":
                blank(seg, j)
                return j + 1
            if c == "$" and j + 1 < n and text[j + 1] == "{":
                blank(seg, j)
                j = skip_interpolation(j + 1)   # points at '{'
                seg = j
                continue
            j += 1
        blank(seg, n)
        return n

    def skip_interpolation(i):
        """i is at the '{' of a `${`. Returns index just past its '}'."""
        depth, j = 0, i
        while j < n:
            c = text[j]
            if c in "'\"":
                j = skip_string(j)
                continue
            if c == "`":
                j = skip_template(j)
                continue
            if c == "/" and j + 1 < n and text[j + 1] == "/":
                j = skip_line_comment(j)
                continue
            if c == "/" and j + 1 < n and text[j + 1] == "*":
                j = skip_block_comment(j)
                continue
            if c == "{":
                depth += 1
            elif c == "}":
                depth -= 1
                if depth == 0:
                    return j + 1
            j += 1
        return n

    i = 0
    while i < n:
        c = text[i]
        nxt = text[i + 1] if i + 1 < n else ""
        if c == "/" and nxt == "/":
            i = skip_line_comment(i)
        elif c == "/" and nxt == "*":
            i = skip_block_comment(i)
        elif c in "'\"":
            i = skip_string(i)
        elif c == "`":
            i = skip_template(i)
        else:
            i += 1
    return "".join(out)
