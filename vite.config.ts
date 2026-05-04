import { defineConfig, Plugin, ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import fs from 'node:fs'
import path from 'node:path'

function workManifestPlugin(): Plugin {
  const virtualModuleId = 'virtual:work-manifest'
  const resolvedId = '\0' + virtualModuleId

  function buildManifest(): Record<string, string[]> {
    const workDir = path.resolve(process.cwd(), 'public/work')
    const manifest: Record<string, string[]> = {}
    if (!fs.existsSync(workDir)) return manifest
    const files = fs.readdirSync(workDir)
      .filter(f => /\.(png|jpg|jpeg|webp|gif)$/i.test(f))
      .sort()
    for (const file of files) {
      const prefix = file.split(/[-_]/)[0].toLowerCase()
      if (!manifest[prefix]) manifest[prefix] = []
      manifest[prefix].push(`/work/${file}`)
    }
    return manifest
  }

  return {
    name: 'work-manifest',
    resolveId(id) {
      if (id === virtualModuleId) return resolvedId
    },
    load(id) {
      if (id === resolvedId) {
        return `export default ${JSON.stringify(buildManifest())}`
      }
    },
    configureServer(server: ViteDevServer) {
      const workDir = path.resolve(process.cwd(), 'public/work')
      if (!fs.existsSync(workDir)) return
      const watcher = fs.watch(workDir, () => {
        const mod = server.moduleGraph.getModuleById(resolvedId)
        if (mod) server.moduleGraph.invalidateModule(mod)
        server.ws.send({ type: 'full-reload' })
      })
      return () => watcher.close()
    },
  }
}

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
