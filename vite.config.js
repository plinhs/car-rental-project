import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: process.env.PORT || 5173,
    strictPort: true,
  },
  preview: {
    allowedHosts: [
      "car-rental-project-imkh.onrender.com", 
      ".onrender.com"
    ],
  },
});
