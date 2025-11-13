import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  // --- CRITICAL ADDITION: PROXY CONFIGURATION ---
  server: {
    port: 5173, // Ensure this matches your Vite development port
    proxy: {
      // Redirects all requests starting with /api (e.g., /api/dashboard/summary)
      // to the Express server running on port 3001.
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false, // Set to true if using HTTPS for backend
      },
    },
  },
  // --- END PROXY CONFIGURATION ---
})