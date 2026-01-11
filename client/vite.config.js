import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
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
            "react-icons": ["react-icons"],
          },
        },
      },
    chunkSizeWarningLimit: 500,
    minify: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "styled-components",
      "framer-motion",
      "react-icons",
    ],
  },
});
