import { handleCounterRequest } from './lib/counterStore.js'

export default async function handler(req, res) {
  try {
    const result = await handleCounterRequest(req.method)

    if (result.allow) {
      res.setHeader('Allow', result.allow)
    }

    return res.status(result.status).json(result.body)
  } catch {
    return res.status(500).json({ error: 'Counter error' })
  }
}
