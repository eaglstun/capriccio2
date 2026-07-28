import { defineConfig } from "vite";

export default defineConfig({
  // public/ holds the ORIGINAL production build — the reference copy of the
  // game. Vite would otherwise copy all 925KB of it into dist/ as a static
  // asset, which would be both wasteful and deeply confusing.
  publicDir: false,
  build: {
    outDir: "dist",
    emptyOutDir: true,
    target: "es2022",
  },
});
