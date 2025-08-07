import react from '@vitejs/plugin-react';
import {visualizer} from 'rollup-plugin-visualizer';
import {defineConfig, type PluginOption} from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), visualizer() as PluginOption],
  server: {
    open: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'scheduler'],

          redux: ['@reduxjs/toolkit', 'react-redux'],

          maptiler: ['@maptiler/sdk'],

          utils: ['clsx', 'lucide-react'],
        },
      },
    },
  },
});
