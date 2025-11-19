// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import glsl from "vite-plugin-glsl";
// Optional: bundle visualizer for analysis
import { visualizer } from "rollup-plugin-visualizer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    glsl(), // GLSL shader support
    visualizer({ filename: "stats.html", open: false }), // generates bundle stats
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

    // Performance optimizations
    chunkSizeWarningLimit: 1000, // raise limit to 1MB before warnings
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries into separate chunks
          react: ["react", "react-dom"],
          ton: ["@tonconnect/ui-react"],
          icons: ["lucide-react"],
          motion: ["framer-motion"],
        },
      },
    },
  },
  // Ensure large 3D and audio assets are correctly processed
  assetsInclude: ["**/*.gltf", "**/*.glb", "**/*.mp3", "**/*.ogg", "**/*.wav"],
});
