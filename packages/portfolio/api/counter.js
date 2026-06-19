import { Redis } from '@upstash/redis'

const COUNTER_KEY = 'portfolio:counter'

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) {
    return null
  }

  return new Redis({ url, token })
}

export default async function handler(req, res) {
  const redis = getRedis()

  if (!redis) {
    return res.status(503).json({ error: 'Counter unavailable' })
  }

  if (req.method === 'GET') {
    const count = await redis.get(COUNTER_KEY)
    return res.status(200).json({ count: Number(count ?? 0) })
  }

  if (req.method === 'POST') {
    const count = await redis.incr(COUNTER_KEY)
    return res.status(200).json({ count })
  }

  res.setHeader('Allow', 'GET, POST')
  return res.status(405).json({ error: 'Method not allowed' })
}
