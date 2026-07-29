// Deliberate globals.
//
// `window.CAP` is the debug/introspection API the bootstrap installs — the one
// documented in the capriccio skill and used from the devtools console. It is a
// real feature, not leftover scaffolding, so it is declared rather than cast
// away at each use.
//
// `window.__TUT` is the tutorial's own escape hatch, used to drive the
// walkthrough from outside during testing.

export {};

declare global {
  interface Window {
    CAP: any;
    __TUT: any;
  }
}
