import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    // three.js itself is an unavoidable ~800kB minified; it's isolated into
    // its own lazy-loaded chunk (see HeroScene.tsx / TechCloudCanvas.tsx),
    // so it no longer blocks the main bundle. Raise the warning threshold so
    // it doesn't fire for that known, already-optimized chunk, while still
    // catching accidental bloat in the main app bundle (currently ~354kB).
    chunkSizeWarningLimit: 900,
  },
});
