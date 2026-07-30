import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Custom domain (CNAME) serves the site at the domain root via GitHub Pages /docs.
  // Absolute base keeps JS/CSS/image URLs stable (./ breaks without a trailing slash).
  base: '/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
})
