export const DEFAULT_ASCII_CONFIG = {
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

export const LANDING_ASCII_CONFIG = {
  charset: "01*",
  frameWidth: 80,
  frameHeight: 2,
  fontFamily: "Geist Mono",
  xConstant: 0.1,
  yConstant: 0.1,
  frameMultiplier: 0.1,
  animationSpeed: 150,
  pattern: "burst",
  chaos: 0,
  mirrorAxis: "none",
  globalVal: 5,
  colors: ["#1c1c1c","#1c1c1c","#ff1500","#1c1c1c","#ff1500"],
}

export const HERO_ASCII_CONFIG = {
  charset: "*01",
  frameWidth: 96,
  frameHeight: 28,
  fontFamily: "Geist Mono",
  xConstant: 0.1,
  yConstant: 0.1,
  frameMultiplier: 0.1,
  animationSpeed: 100,
  pattern: "rise",
  chaos: 0,
  mirrorAxis: "none",
  globalVal: 5,
  colors: ["#fafafa","#fafafa","#fafafa","#fafafa","#fafafa"],
}

function normalizeColors(colors) {
  if (!Array.isArray(colors) || colors.length !== 5) {
    return DEFAULT_ASCII_CONFIG.colors.map((color, index) => normalizeHexColor(color, index))
  }

  return colors.map((color, index) => normalizeHexColor(color, index))
}

export function normalizeHexColor(value, index = 0) {
  const fallback = DEFAULT_ASCII_CONFIG.colors[index] ?? '#000000'

  if (typeof value !== 'string') {
    return fallback
  }

  const hex = value.trim()

  if (/^#[0-9a-fA-F]{6}$/.test(hex)) {
    return hex.toLowerCase()
  }

  if (/^#[0-9a-fA-F]{3}$/.test(hex)) {
    const [, r, g, b] = hex
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase()
  }

  return fallback
}

export function normalizeAsciiConfig(parsed = {}) {
  return {
    ...DEFAULT_ASCII_CONFIG,
    ...parsed,
    colors: normalizeColors(parsed.colors),
  }
}

export function getFallbackAsciiConfig() {
  return normalizeAsciiConfig(LANDING_ASCII_CONFIG)
}

export function getFallbackAsciiHeroConfig() {
  return normalizeAsciiConfig(HERO_ASCII_CONFIG)
}

export function asciiConfigsEqual(left, right) {
  return JSON.stringify(normalizeAsciiConfig(left)) === JSON.stringify(normalizeAsciiConfig(right))
}

async function fetchAsciiConfigFromApi(apiPath, getFallback) {
  try {
    const response = await fetch(apiPath)

    if (!response.ok) {
      return getFallback()
    }

    const data = await response.json()
    return normalizeAsciiConfig(data.config ?? {})
  } catch {
    return getFallback()
  }
}

async function saveAsciiConfigToApi(apiPath, config) {
  const response = await fetch(apiPath, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(normalizeAsciiConfig(config)),
  })

  if (!response.ok) {
    throw new Error('Failed to save ASCII config')
  }

  const data = await response.json()
  return normalizeAsciiConfig(data.config ?? {})
}

export function fetchAsciiLandingConfig() {
  return fetchAsciiConfigFromApi('/api/ascii-config', getFallbackAsciiConfig)
}

export function saveAsciiLandingConfig(config) {
  return saveAsciiConfigToApi('/api/ascii-config', config)
}

export function resetAsciiLandingConfig() {
  return saveAsciiLandingConfig(getFallbackAsciiConfig())
}

export function fetchAsciiHeroConfig() {
  return fetchAsciiConfigFromApi('/api/ascii-config-hero', getFallbackAsciiHeroConfig)
}

export function saveAsciiHeroConfig(config) {
  return saveAsciiConfigToApi('/api/ascii-config-hero', config)
}

export function resetAsciiHeroConfig() {
  return saveAsciiHeroConfig(getFallbackAsciiHeroConfig())
}

export const ASCII_PATTERNS = [
  { value: 'spiralWave', label: 'SpiralWave' },
  { value: 'rippling', label: 'Rippling' },
  { value: 'grid', label: 'Grid' },
  { value: 'centerSpiral', label: 'Center Spiral' },
  { value: 'raySpiral', label: 'Ray Spiral' },
  { value: 'circular', label: 'Circular' },
  { value: 'concentricCircles', label: 'Concentric Circles' },
  { value: 'expanding', label: 'Expanding' },
  { value: 'twirling', label: 'Twirling' },
  { value: 'radialRays', label: 'Radial Rays' },
  { value: 'wavefronts', label: 'Wavefronts' },
  { value: 'diagonalWaves', label: 'Diagonal Waves' },
  { value: 'bounceDiagonals', label: 'Bounce Diagonals' },
  { value: 'pulsating', label: 'Pulsating' },
  { value: 'horizontalWave', label: 'Horizontal Wave' },
  { value: 'verticalWave', label: 'Vertical Wave' },
  { value: 'parabolic', label: 'Parabolic' },
  { value: 'cross', label: 'Cross' },
  { value: 'rise', label: 'Rise' },
  { value: 'burst', label: 'Burst' },
  { value: 'randomBurst', label: 'Random Burst' },
  { value: 'squareWave', label: 'Square Wave' },
  { value: 'mosaic', label: 'Mosaic' },
  { value: 'helix', label: 'Helix' },
  { value: 'spirals', label: 'Spirals' },
  { value: 'swirling', label: 'Swirling' },
]

export const ASCII_MIRROR_OPTIONS = [
  { value: 'none', label: 'None' },
  { value: 'x', label: 'X-axis' },
  { value: 'y', label: 'Y-axis' },
]

export const ASCII_FONTS = [
  { value: 'Geist Mono', label: 'Geist Mono' },
  { value: 'monospace', label: 'Monospace' },
  { value: 'Consolas', label: 'Consolas' },
  { value: 'Lucida Console', label: 'Lucida Console' },
  { value: 'Courier New', label: 'Courier New' },
  { value: 'Roboto Mono', label: 'Roboto Mono' },
  { value: 'Source Code Pro', label: 'Source Code Pro' },
  { value: 'Ubuntu Mono', label: 'Ubuntu Mono' },
  { value: 'Space Mono', label: 'Space Mono' },
  { value: 'Inconsolata', label: 'Inconsolata' },
  { value: 'VT323', label: 'VT323' },
  { value: 'Fira Mono', label: 'Fira Mono' },
]

function formatAsciiConfigExport(constantName, config) {
  return `export const ${constantName} = {
  charset: ${JSON.stringify(config.charset)},
  frameWidth: ${config.frameWidth},
  frameHeight: ${config.frameHeight},
  fontFamily: ${JSON.stringify(config.fontFamily)},
  xConstant: ${config.xConstant},
  yConstant: ${config.yConstant},
  frameMultiplier: ${config.frameMultiplier},
  animationSpeed: ${config.animationSpeed},
  pattern: ${JSON.stringify(config.pattern)},
  chaos: ${config.chaos},
  mirrorAxis: ${JSON.stringify(config.mirrorAxis)},
  globalVal: ${config.globalVal},
  colors: ${JSON.stringify(config.colors)},
}`
}

export function formatAsciiConfigForCode(config) {
  return formatAsciiConfigExport('LANDING_ASCII_CONFIG', config)
}

export function formatAsciiHeroConfigForCode(config) {
  return formatAsciiConfigExport('HERO_ASCII_CONFIG', config)
}
