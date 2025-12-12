import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [
    react()
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer()
      ]
    }
  },
  base: "./",   // ⭐ REQUIRED for deployment (Render / Netlify / GitHub Pages)
  server: {
    host: true,
    port: 5173
  }
})
