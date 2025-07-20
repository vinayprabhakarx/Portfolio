import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          vendor: ['react', 'react-dom', 'react-router-dom', 'styled-components'],
          
          // Third-party libraries
          'lottie-web': ['lottie-web'],
          'framer-motion': ['framer-motion'],
          'react-icons': ['react-icons'],
          
          // Custom chunks for pages
          hero: ['./src/pages/Hero.jsx'],
          about: ['./src/pages/About.jsx'],
          projects: ['./src/pages/Projects.jsx'],
          contact: ['./src/pages/Contact.jsx'],
          blog: ['./src/pages/Blog.jsx'],
          resume: ['./src/pages/Resume.jsx']
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
    include: ['react', 'react-dom', 'react-router-dom', 'styled-components', 'framer-motion', 'lottie-web', 'react-icons'],
  },
});
