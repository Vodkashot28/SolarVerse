// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import glsl from "vite-plugin-glsl";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    glsl(), // GLSL shader support
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    // Output to 'dist' so Vercel can serve static assets
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
  // Ensure large 3D and audio assets are correctly processed
  assetsInclude: ["**/*.gltf", "**/*.glb", "**/*.mp3", "**/*.ogg", "**/*.wav"],
});
