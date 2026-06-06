
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('@google/genai')) return 'genai';
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) return 'vendor';
          if (id.includes('node_modules/motion')) return 'motion';
          if (id.includes('node_modules/lucide-react')) return 'icons';
          if (id.includes('/components/agronCopy.ts')) return 'agronCopy';
        }
      }
    }
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
});
