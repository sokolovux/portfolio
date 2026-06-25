import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { counterApiPlugin } from './vite-plugins/counterApi.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  envDir: __dirname,
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
