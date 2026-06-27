import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  assetsInclude: ["**/*.lottie"],
  server: {
    // Configure MIME types for .mjs files (required for PDF worker)
    middlewareMode: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  preview: {
    // Ensure .mjs files are served with correct MIME type
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  build: {
    target: "es2020",
    minify: "esbuild",
    esbuild: {
      drop: ["console", "debugger"],
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks (Core optimized)
          vendor: [
            "react",
            "react-dom",
            "react-router-dom",
            "styled-components",
          ],
          // Heavy libraries separated for caching
          "framer-motion": ["framer-motion"],
          "lucide-react": ["lucide-react"],
          "simple-icons": ["simple-icons"],
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "styled-components",
      "framer-motion",
      "lucide-react",
      "simple-icons",
    ],
  },
});
