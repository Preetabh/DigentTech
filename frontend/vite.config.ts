import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: isSsrBuild ? [react()] : [react(), cloudflare()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: isSsrBuild
    ? undefined
    : {
        rollupOptions: {
          output: {
            manualChunks: {
              vendor: ['react', 'react-dom'],
              motion: ['gsap'],
              icons: ['lucide-react'],
            },
          },
        },
      },
  server: {
    port: 3000,
    open: false,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5050',
        changeOrigin: true,
      },
    },
  },
}));