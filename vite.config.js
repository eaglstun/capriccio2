import { readFileSync } from "node:fs";
import { defineConfig } from "vite";

// The title screen shows the version, and the changelog page names the same
// number. package.json is the one place it is written down — read it here and
// substitute at build time rather than typing it into the HUD as well, because
// two copies of a version number are one copy too many.
//
// Read rather than imported: JSON import attributes vary by Node version, and
// this config has to run under whatever the CI happens to have.
const { version } = JSON.parse(readFileSync("./package.json", "utf8"));

export default defineConfig({
  define: { __APP_VERSION__: JSON.stringify(version) },
  // public/ holds the ORIGINAL production build — the reference copy of the
  // game. Vite would otherwise copy all 925KB of it into dist/ as a static
  // asset, which would be both wasteful and deeply confusing.
  publicDir: false,
  build: {
    // five pages: the game, about/colophon, how to play, the changelog,
    // and listen. All flat, all siblings.
    rollupOptions: {
      input: {
        main: "index.html",
        about: "about.html",
        howToPlay: "how-to-play.html",
        changelog: "changelog.html",
        listen: "listen.html",
      },
    },
    outDir: "dist",
    emptyOutDir: true,
    target: "es2022",
  },
});
