import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "./",   // ⭐ REQUIRED for deployment (Render / Netlify / GitHub Pages)
  
  plugins: [react()],

  server: {
    host: true,
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173
  }
})
