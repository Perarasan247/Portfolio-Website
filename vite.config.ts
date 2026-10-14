import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Relative base keeps the build deployable from any sub-path (GitHub Pages, etc.).
export default defineConfig({
  base: './',
  plugins: [react()],
});
