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
  // The original build lives in legacy/, and the rename is itself most of the
  // protection: Vite only auto-copies a directory literally called `public`,
  // which is what it used to be — all 925KB of the reference artifact would
  // have gone into dist/ as a static asset, wasteful and deeply confusing.
  // This stays off as well, so nothing gets copied even if a public/ ever
  // reappears.
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
