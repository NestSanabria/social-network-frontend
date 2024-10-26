import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/social-network-frontend/', // Asegúrate de tener esta línea
  build: {
    rollupOptions: {
      input: './src/main.jsx',
      output: {
        entryFileNames: 'index-[hash].js',
      }
    }
  }
});
