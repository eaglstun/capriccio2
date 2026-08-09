import { defineConfig } from "vite";

export default defineConfig({
  // public/ holds the ORIGINAL production build — the reference copy of the
  // game. Vite would otherwise copy all 925KB of it into dist/ as a static
  // asset, which would be both wasteful and deeply confusing.
  publicDir: false,
  build: {
    // five pages: the game, about/colophon, how to play, the changelog,
    // and /listen
    rollupOptions: {
      input: {
        main: "index.html",
        about: "about.html",
        howToPlay: "how-to-play.html",
        changelog: "changelog.html",
        // a directory entry, not listen.html: nginx's `try_files $uri $uri/`
        // serves dist/listen/index.html at the clean URL /listen
        listen: "listen/index.html",
      },
    },
    outDir: "dist",
    emptyOutDir: true,
    target: "es2022",
  },
});
