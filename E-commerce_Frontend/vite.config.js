import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react()
  ],
  base: "./",   // ⭐ REQUIRED for deployment (Render / Netlify / GitHub Pages)
  server: {
    host: true,
    port: 5173
  }
})
