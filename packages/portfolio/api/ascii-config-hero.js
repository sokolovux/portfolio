import { handleAsciiHeroConfigRequest } from './lib/asciiConfigStore.js'

export default async function handler(req, res) {
  try {
    const result = await handleAsciiHeroConfigRequest(req)

    if (result.allow) {
      res.setHeader('Allow', result.allow)
    }

    if (result.headers) {
      for (const [key, value] of Object.entries(result.headers)) {
        res.setHeader(key, value)
      }
    }

    return res.status(result.status).json(result.body)
  } catch {
    return res.status(500).json({ error: 'ASCII config error' })
  }
}
