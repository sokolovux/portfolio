import { loadEnv } from 'vite'
import { handleCounterRequest } from '../api/lib/counterStore.js'

function sendJson(res, status, body, headers = {}) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')

  for (const [key, value] of Object.entries(headers)) {
    res.setHeader(key, value)
  }

  res.end(JSON.stringify(body))
}

export function counterApiPlugin() {
  return {
    name: 'counter-api',
    configureServer(server) {
      const env = loadEnv(server.config.mode, server.config.root, '')

      server.middlewares.use(async (req, res, next) => {
        const { pathname } = new URL(req.url, 'http://localhost')

        if (pathname !== '/api/counter') {
          next()
          return
        }

        try {
          const result = await handleCounterRequest(req.method, env)
          const headers = result.allow ? { Allow: result.allow } : {}
          sendJson(res, result.status, result.body, headers)
        } catch {
          sendJson(res, 500, { error: 'Counter error' })
        }
      })
    },
  }
}
