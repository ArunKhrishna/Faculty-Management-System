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
    port: 8081, // Set port to 8081 for your frontend
    proxy: {
      '/api': {
        target: 'http://localhost:8081', // Adjust this to your backend's API URL if needed
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
