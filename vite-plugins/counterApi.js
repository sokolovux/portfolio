import { loadEnv } from 'vite'
import { handleAsciiConfigRequest, handleAsciiHeroConfigRequest } from '../api/lib/asciiConfigStore.js'
import { handleCaptureRequest } from '../api/lib/captureService.js'
import { handleCounterRequest } from '../api/lib/counterStore.js'

function sendJson(res, status, body, headers = {}) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')

  for (const [key, value] of Object.entries(headers)) {
    res.setHeader(key, value)
  }

  res.end(JSON.stringify(body))
}

function sendBinary(res, status, buffer, headers = {}) {
  res.statusCode = status

  for (const [key, value] of Object.entries(headers)) {
    res.setHeader(key, value)
  }

  res.end(buffer)
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

        if (pathname === '/api/capture') {
          try {
            const body = req.method === 'POST' ? await readRequestBody(req) : null
            const result = await handleCaptureRequest({ method: req.method, body })
            const headers = {
              ...(result.allow ? { Allow: result.allow } : {}),
              ...(result.contentType ? { 'Content-Type': result.contentType } : {}),
              ...(result.filename
                ? { 'Content-Disposition': `attachment; filename="${result.filename}"` }
                : {}),
            }

            if (result.binary) {
              sendBinary(res, result.status, result.binary, headers)
            } else {
              sendJson(res, result.status, result.body, headers)
            }
          } catch {
            sendJson(res, 500, { error: 'Capture error' })
          }

          return
        }

        if (pathname === '/api/ascii-config' || pathname === '/api/ascii-config-hero') {
          try {
            const body = req.method === 'PUT' ? await readRequestBody(req) : null
            const request = createAsciiConfigRequest(req, body)
            const result = pathname === '/api/ascii-config-hero'
              ? await handleAsciiHeroConfigRequest(request, env)
              : await handleAsciiConfigRequest(request, env)
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
