import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import eslint from 'vite-plugin-eslint2';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), eslint(), ViteImageOptimizer({})],
  build: {
    assetsInlineLimit: 4096, // 4kb - assets smaller than this will be inlined as base64
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code into separate chunks for better caching
          vendor: ['react', 'react-dom', 'react-router'],
        },
      },
    },
  },
  // Configure asset handling
  assetsInclude: [
    '**/*.png',
    '**/*.jpg',
    '**/*.jpeg',
    '**/*.gif',
    '**/*.webp',
    '**/*.svg',
    '**/*.avif',
  ],
});
