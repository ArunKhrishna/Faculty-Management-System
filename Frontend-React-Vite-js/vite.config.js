import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 3000, // Set port to 3000 to avoid conflict with backend on 8081
    proxy: {
      '/api': {
        target: 'http://localhost:8081', // Adjust this to your backend's API URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
