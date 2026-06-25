import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { counterApiPlugin } from './vite-plugins/counterApi.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '../..')

export default defineConfig({
  // Vercel CLI writes .env.local at repo root; load env from there in local dev.
  envDir: repoRoot,
  plugins: [react(), counterApiPlugin()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [path.resolve(__dirname, 'node_modules')],
      },
    },
  },
})
