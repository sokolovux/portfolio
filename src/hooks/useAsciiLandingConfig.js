import { useEffect, useState } from 'react'
import {
  asciiConfigsEqual,
  fetchAsciiLandingConfig,
  getFallbackAsciiConfig,
} from '../constants/asciiConfig.js'

export function useAsciiLandingConfig() {
  const [config, setConfig] = useState(getFallbackAsciiConfig)

  useEffect(() => {
    let cancelled = false

    fetchAsciiLandingConfig().then((nextConfig) => {
      if (!cancelled) {
        setConfig((current) => (asciiConfigsEqual(current, nextConfig) ? current : nextConfig))
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  return config
}
