import { handleCaptureRequest } from './lib/captureService.js'

function parseRequestBody(req) {
  if (!req.body) {
    return null
  }

  if (typeof req.body === 'string') {
    return JSON.parse(req.body)
  }

  return req.body
}

export default async function handler(req, res) {
  try {
    const result = await handleCaptureRequest({
      method: req.method,
      body: parseRequestBody(req),
    })

    if (result.allow) {
      res.setHeader('Allow', result.allow)
    }

    if (result.binary) {
      res.setHeader('Content-Type', result.contentType)
      res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`)

      return res.status(result.status).send(result.binary)
    }

    return res.status(result.status).json(result.body)
  } catch {
    return res.status(500).json({ error: 'Capture error' })
  }
}
