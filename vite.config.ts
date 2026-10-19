import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    // Root-path build by default (Vercel / Netlify / Cloudflare Pages).
    // To deploy under a sub-path instead — e.g. GitHub Pages — set
    // VITE_BASE_PATH=/vaishnavi_kankarej_portfolio/ in the build environment.
    base: env.VITE_BASE_PATH || '/',
    plugins: [react()],
    build: {
      target: 'es2022',
      cssTarget: 'chrome107',
      assetsInlineLimit: 2048,
      chunkSizeWarningLimit: 700,
    },
  }
})
