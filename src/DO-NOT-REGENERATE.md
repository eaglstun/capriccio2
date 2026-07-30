# STOP — do not run `split_bundle.py --write` on this branch

`src/` was originally _generated_ from `public/assets/index-DCXbw2vV.js` by
`tools/split_bundle.py`. It is no longer generated, for three reasons now:

1. Files `00`–`17` were **hand-edited** for the vaporwave reskin.
2. `18-music.ts` and `19-tutorial.ts` are **new** — never in the bundle.
3. The whole tree is now **TypeScript**. Every module is `.ts`, with class
   fields, type annotations and named interfaces the splitter cannot emit.

Running the splitter would rewrite `00`–`17` from the original bundle as
JavaScript and **destroy every visual, audio and type change**, silently and
instantly. The integrity check would then happily report PASS, because it would
be verifying the regenerated files against the original — exactly as designed.

Worse than before: the emitted files would be `.js`, so the `.ts` originals
would be orphaned rather than overwritten, and the build would keep working
while silently running regenerated code.

The marker file `src/.hand-edited` makes the tool refuse. Do not delete it.

If you need to re-derive the split (e.g. to compare against the original), do it
on a branch that has no reskin, or into a different output directory.
