import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { workManifestPlugin } from './src/plugins/workManifest'

export default defineConfig({
  plugins: [
    react(),
    workManifestPlugin(),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpg: { quality: 80 },
      jpeg: { quality: 80 },
    }),
  ],
})
