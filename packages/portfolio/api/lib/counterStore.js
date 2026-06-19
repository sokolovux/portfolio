import { Redis } from '@upstash/redis'

const COUNTER_KEY = 'portfolio:counter'

export function createCounterStore(env = process.env) {
  const url = env.UPSTASH_REDIS_REST_URL
  const token = env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) {
    return null
  }

  const redis = new Redis({ url, token })

  return {
    async get() {
      const count = await redis.get(COUNTER_KEY)
      return Number(count ?? 0)
    },
    async increment() {
      return redis.incr(COUNTER_KEY)
    },
  }
}

export async function handleCounterRequest(method, env = process.env) {
  const store = createCounterStore(env)

  if (!store) {
    return { status: 503, body: { error: 'Counter unavailable' } }
  }

  if (method === 'GET') {
    const count = await store.get()
    return { status: 200, body: { count } }
  }

  if (method === 'POST') {
    const count = await store.increment()
    return { status: 200, body: { count } }
  }

  return { status: 405, body: { error: 'Method not allowed' }, allow: 'GET, POST' }
}
