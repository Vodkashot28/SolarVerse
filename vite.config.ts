import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import glsl from "vite-plugin-glsl";

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
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
  assetsInclude: ["**/*.gltf", "**/*.glb", "**/*.mp3", "**/*.ogg", "**/*.wav"],
});

