import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Relative base keeps the build deployable from any sub-path (GitHub Pages, etc.).
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      // Two pages: the portfolio and the full project archive.
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        projects: fileURLToPath(new URL('./projects.html', import.meta.url)),
      },
    },
  },
});
