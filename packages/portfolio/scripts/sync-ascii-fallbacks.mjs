import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadEnv } from 'vite'
import {
  ASCII_CONFIG_KEY,
  ASCII_HERO_CONFIG_KEY,
  FALLBACK_ASCII_CONFIG,
  FALLBACK_ASCII_HERO_CONFIG,
  normalizeAsciiConfig,
} from '../api/lib/asciiConfigStore.js'
import { createRedis } from '../api/lib/counterStore.js'
import {
  formatAsciiConfigForCode,
  formatAsciiHeroConfigForCode,
} from '../src/constants/asciiConfig.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const packageRoot = path.resolve(__dirname, '..')
const asciiConfigPath = path.join(packageRoot, 'src/constants/asciiConfig.js')

function replaceConfigBlock(source, constantName, replacement) {
  const pattern = new RegExp(`export const ${constantName} = \\{[\\s\\S]*?\\n\\}`, 'm')
  const next = source.replace(pattern, replacement)

  if (next === source) {
    throw new Error(`Could not find ${constantName} in asciiConfig.js`)
  }

  return next
}

async function loadConfigFromRedis(redis, key, fallback) {
  const stored = await redis.get(key)
  return normalizeAsciiConfig(stored ?? {}, fallback)
}

async function main() {
  const env = loadEnv('development', packageRoot, '')
  const redis = createRedis(env)

  if (!redis) {
    console.error('Redis is not configured. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in .env.local')
    process.exit(1)
  }

  const [landingConfig, heroConfig] = await Promise.all([
    loadConfigFromRedis(redis, ASCII_CONFIG_KEY, FALLBACK_ASCII_CONFIG),
    loadConfigFromRedis(redis, ASCII_HERO_CONFIG_KEY, FALLBACK_ASCII_HERO_CONFIG),
  ])

  const source = fs.readFileSync(asciiConfigPath, 'utf-8')
  const next = replaceConfigBlock(
    replaceConfigBlock(source, 'LANDING_ASCII_CONFIG', formatAsciiConfigForCode(landingConfig)),
    'HERO_ASCII_CONFIG',
    formatAsciiHeroConfigForCode(heroConfig),
  )

  fs.writeFileSync(asciiConfigPath, next)
  console.log('Updated LANDING_ASCII_CONFIG and HERO_ASCII_CONFIG in src/constants/asciiConfig.js')
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
