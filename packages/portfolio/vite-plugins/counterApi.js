import { loadEnv } from 'vite'
import { handleAsciiConfigRequest } from '../api/lib/asciiConfigStore.js'
import { handleCounterRequest } from '../api/lib/counterStore.js'

function sendJson(res, status, body, headers = {}) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')

  for (const [key, value] of Object.entries(headers)) {
    res.setHeader(key, value)
  }

  res.end(JSON.stringify(body))
}

async function readRequestBody(req) {
  const chunks = []

  for await (const chunk of req) {
    chunks.push(chunk)
  }

  if (chunks.length === 0) {
    return null
  }

  return JSON.parse(Buffer.concat(chunks).toString('utf8'))
}

function createAsciiConfigRequest(req, body) {
  return {
    method: req.method,
    headers: {
      authorization: req.headers.authorization ?? '',
    },
    body,
  }
}

export function counterApiPlugin() {
  return {
    name: 'counter-api',
    configureServer(server) {
      const env = loadEnv(server.config.mode, server.config.root, '')

      server.middlewares.use(async (req, res, next) => {
        const { pathname } = new URL(req.url, 'http://localhost')

        if (pathname === '/api/counter') {
          try {
            const result = await handleCounterRequest(req.method, env)
            const headers = result.allow ? { Allow: result.allow } : {}
            sendJson(res, result.status, result.body, headers)
          } catch {
            sendJson(res, 500, { error: 'Counter error' })
          }

          return
        }

        if (pathname === '/api/ascii-config') {
          try {
            const body = req.method === 'PUT' ? await readRequestBody(req) : null
            const result = await handleAsciiConfigRequest(createAsciiConfigRequest(req, body), env)
            const headers = {
              ...(result.allow ? { Allow: result.allow } : {}),
              ...(result.headers ?? {}),
            }
            sendJson(res, result.status, result.body, headers)
          } catch {
            sendJson(res, 500, { error: 'ASCII config error' })
          }

          return
        }

        next()
      })
    },
  }
}
