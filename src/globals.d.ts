// Deliberate globals.
//
// `window.CAP` is the debug/introspection API the bootstrap installs — the one
// documented in the capriccio skill and used from the devtools console. It is a
// real feature, not leftover scaffolding, so it is declared rather than cast
// away at each use.
//
// `window.__TUT` is the tutorial's own escape hatch, used to drive the
// walkthrough from outside during testing.
//
// `__APP_VERSION__` is not a runtime global at all — Vite's `define` replaces
// it with a string literal at build time, from package.json. Declared here so
// the compiler knows it exists; there is nothing to look it up on.

export {};

declare global {
  interface Window {
    CAP: any;
    __TUT: any;
  }
  const __APP_VERSION__: string;
}
