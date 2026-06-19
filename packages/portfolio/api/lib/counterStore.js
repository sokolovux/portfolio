import { Redis } from '@upstash/redis'

const COUNTER_KEY = 'portfolio:counter'

function normalizeEnvValue(value) {
  if (!value) {
    return ''
  }

  const trimmed = String(value).trim()

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim()
  }

  return trimmed
}

function findEnvValue(env, exactKeys, partialMatches) {
  for (const key of exactKeys) {
    const value = normalizeEnvValue(env[key])

    if (value) {
      return value
    }
  }

  for (const [key, rawValue] of Object.entries(env)) {
    if (!partialMatches.some((match) => key.includes(match))) {
      continue
    }

    const value = normalizeEnvValue(rawValue)

    if (value) {
      return value
    }
  }

  return ''
}

export function getRedisEnvDiagnostics(env = process.env) {
  const urlKey =
    ['UPSTASH_REDIS_REST_URL', 'KV_REST_API_URL'].find((key) => normalizeEnvValue(env[key])) ??
    Object.keys(env).find(
      (key) =>
        (key.includes('REDIS_REST_URL') || key.includes('KV_REST_API_URL')) &&
        normalizeEnvValue(env[key])
    ) ??
    null

  const tokenKey =
    ['UPSTASH_REDIS_REST_TOKEN', 'KV_REST_API_TOKEN'].find((key) => normalizeEnvValue(env[key])) ??
    Object.keys(env).find(
      (key) =>
        (key.includes('REDIS_REST_TOKEN') || key.includes('KV_REST_API_TOKEN')) &&
        normalizeEnvValue(env[key])
    ) ??
    null

  return {
    hasUrl: Boolean(urlKey),
    hasToken: Boolean(tokenKey),
    urlKey,
    tokenKey,
  }
}

function getRedisCredentials(env) {
  const url = findEnvValue(env, ['UPSTASH_REDIS_REST_URL', 'KV_REST_API_URL'], [
    'REDIS_REST_URL',
    'KV_REST_API_URL',
  ])

  const token = findEnvValue(env, ['UPSTASH_REDIS_REST_TOKEN', 'KV_REST_API_TOKEN'], [
    'REDIS_REST_TOKEN',
    'KV_REST_API_TOKEN',
  ])

  if (!url || !token) {
    return null
  }

  return { url, token }
}

export function createCounterStore(env = process.env) {
  const credentials = getRedisCredentials(env)

  if (!credentials) {
    return null
  }

  const redis = new Redis(credentials)

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
    return {
      status: 503,
      body: {
        error: 'Counter unavailable',
        diagnostics: getRedisEnvDiagnostics(env),
      },
    }
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
