import { createRedis, getRedisEnvDiagnostics } from './counterStore.js'
import {
  getAsciiDevPassword,
  isAsciiDevAuthRequired,
  unauthorizedAsciiDevResponse,
  verifyAsciiDevAuth,
} from './asciiAuth.js'

export const ASCII_CONFIG_KEY = 'portfolio:ascii-config'
export const ASCII_HERO_CONFIG_KEY = 'portfolio:ascii-config-hero'

function normalizeColors(colors, fallback) {
  if (!Array.isArray(colors) || colors.length !== 5) {
    return [...fallback.colors]
  }

  return colors
}

export function normalizeAsciiConfig(parsed = {}, fallback) {
  return {
    charset: parsed.charset ?? fallback.charset,
    frameWidth: Number(parsed.frameWidth ?? fallback.frameWidth),
    frameHeight: Number(parsed.frameHeight ?? fallback.frameHeight),
    fontFamily: parsed.fontFamily ?? fallback.fontFamily,
    xConstant: Number(parsed.xConstant ?? fallback.xConstant),
    yConstant: Number(parsed.yConstant ?? fallback.yConstant),
    frameMultiplier: Number(parsed.frameMultiplier ?? fallback.frameMultiplier),
    animationSpeed: Number(parsed.animationSpeed ?? fallback.animationSpeed),
    pattern: parsed.pattern ?? fallback.pattern,
    chaos: Number(parsed.chaos ?? fallback.chaos),
    mirrorAxis: parsed.mirrorAxis ?? fallback.mirrorAxis,
    globalVal: Number(parsed.globalVal ?? fallback.globalVal),
    colors: normalizeColors(parsed.colors, fallback),
  }
}

const ASCII_CONFIG_DEFAULTS = {
  charset: ' .:-=+*%@#',
  frameWidth: 96,
  frameHeight: 28,
  fontFamily: 'Geist Mono',
  xConstant: 0.1,
  yConstant: 0.1,
  frameMultiplier: 0.1,
  animationSpeed: 50,
  pattern: 'spiralWave',
  chaos: 0,
  mirrorAxis: 'none',
  globalVal: 5,
  colors: ['#fafafa', '#e2e2e2', '#b0b0b0', '#888888', '#585858'],
}

export const FALLBACK_ASCII_CONFIG = { ...ASCII_CONFIG_DEFAULTS }
export const FALLBACK_ASCII_HERO_CONFIG = { ...ASCII_CONFIG_DEFAULTS }

function createAsciiConfigStore(configKey, env = process.env) {
  const redis = createRedis(env)

  if (!redis) {
    return null
  }

  return {
    async get() {
      return redis.get(configKey)
    },
    async set(config) {
      await redis.set(configKey, config)
      return config
    },
  }
}

async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body
  }

  const chunks = []

  for await (const chunk of req) {
    chunks.push(chunk)
  }

  if (chunks.length === 0) {
    return null
  }

  return JSON.parse(Buffer.concat(chunks).toString('utf8'))
}

async function handleAsciiConfigRequestForKey(req, env, configKey, fallback) {
  const store = createAsciiConfigStore(configKey, env)

  if (!store) {
    return {
      status: 503,
      body: {
        error: 'ASCII config unavailable',
        config: fallback,
        source: 'fallback',
        diagnostics: getRedisEnvDiagnostics(env),
      },
    }
  }

  if (req.method === 'GET') {
    const stored = await store.get()
    const config = normalizeAsciiConfig(stored ?? {}, fallback)

    return {
      status: 200,
      body: {
        config,
        source: stored ? 'redis' : 'fallback',
      },
    }
  }

  if (req.method === 'PUT') {
    if (!verifyAsciiDevAuth(req, env)) {
      return unauthorizedAsciiDevResponse()
    }

    const parsed = req.body ?? await readJsonBody(req)
    const config = normalizeAsciiConfig(parsed ?? {}, fallback)
    await store.set(config)

    return {
      status: 200,
      body: {
        config,
        source: 'redis',
      },
    }
  }

  return {
    status: 405,
    body: { error: 'Method not allowed' },
    allow: 'GET, PUT',
  }
}

export async function handleAsciiConfigRequest(req, env = process.env) {
  return handleAsciiConfigRequestForKey(req, env, ASCII_CONFIG_KEY, FALLBACK_ASCII_CONFIG)
}

export async function handleAsciiHeroConfigRequest(req, env = process.env) {
  return handleAsciiConfigRequestForKey(req, env, ASCII_HERO_CONFIG_KEY, FALLBACK_ASCII_HERO_CONFIG)
}

export function getAsciiDevAuthStatus(env = process.env) {
  return {
    required: isAsciiDevAuthRequired(env),
    configured: Boolean(getAsciiDevPassword(env)),
  }
}
