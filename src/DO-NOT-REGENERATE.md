# STOP — do not run `split_bundle.py --write` on this branch

`src/` was originally *generated* from `public/assets/index-DCXbw2vV.js` by
`tools/split_bundle.py`. On the `vaporwave` branch it is no longer generated:
files `00`–`17` have been **hand-edited** for the reskin, and `18-music.js` is
new.

Running the splitter would rewrite `00`–`17` from the original bundle and
**destroy every visual and audio change**, silently and instantly. The
integrity check would then happily report PASS, because it would be verifying
the regenerated files against the original — exactly as designed.

The marker file `src/.hand-edited` makes the tool refuse. Do not delete it.

If you need to re-derive the split (e.g. to compare against the original),
do it on a branch that has no reskin, or into a different output directory.
