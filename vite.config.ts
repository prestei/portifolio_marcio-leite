import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // Project site: https://prestei.github.io/portifolio_marcio-leite/
  base: mode === 'production' ? '/portifolio_marcio-leite/' : '/',
  plugins: [react(), tailwindcss()],
}))
