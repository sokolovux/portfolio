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

// Deployed landing defaults. Bump `version` whenever this changes and you deploy.
export const LANDING_ASCII_CONFIG = {
  version: 1,
  ...DEFAULT_ASCII_CONFIG,
}

function normalizeColors(colors) {
  if (!Array.isArray(colors) || colors.length !== 5) {
    return [...DEFAULT_ASCII_CONFIG.colors]
  }

  return colors
}

function normalizeAsciiConfig(parsed = {}) {
  const { version, ...fields } = parsed

  return {
    ...DEFAULT_ASCII_CONFIG,
    ...fields,
    colors: normalizeColors(fields.colors),
  }
}

function getDeployedAnimationConfig() {
  const { version, ...fields } = LANDING_ASCII_CONFIG

  return normalizeAsciiConfig(fields)
}

export const ASCII_LANDING_CONFIG_STORAGE_KEY = 'portfolio:ascii-landing-config'
export const ASCII_LANDING_CONFIG_EVENT = 'ascii-landing-config-saved'

export function loadAsciiLandingConfig() {
  const deployed = getDeployedAnimationConfig()

  try {
    const raw = localStorage.getItem(ASCII_LANDING_CONFIG_STORAGE_KEY)

    if (!raw) {
      return deployed
    }

    const saved = JSON.parse(raw)

    if (saved.configVersion !== LANDING_ASCII_CONFIG.version) {
      localStorage.removeItem(ASCII_LANDING_CONFIG_STORAGE_KEY)
      return deployed
    }

    return normalizeAsciiConfig({ ...deployed, ...saved.config })
  } catch {
    return deployed
  }
}

export function saveAsciiLandingConfig(config) {
  localStorage.setItem(
    ASCII_LANDING_CONFIG_STORAGE_KEY,
    JSON.stringify({
      configVersion: LANDING_ASCII_CONFIG.version,
      config: normalizeAsciiConfig(config),
    }),
  )
  window.dispatchEvent(new Event(ASCII_LANDING_CONFIG_EVENT))
}

export function clearAsciiLandingConfig() {
  localStorage.removeItem(ASCII_LANDING_CONFIG_STORAGE_KEY)
  window.dispatchEvent(new Event(ASCII_LANDING_CONFIG_EVENT))
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

export function formatAsciiConfigForCode(config) {
  const nextVersion = LANDING_ASCII_CONFIG.version + 1

  return `export const LANDING_ASCII_CONFIG = {
  version: ${nextVersion},
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
