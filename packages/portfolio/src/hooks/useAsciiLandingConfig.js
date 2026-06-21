import { useEffect, useState } from 'react'
import {
  fetchAsciiLandingConfig,
  getFallbackAsciiConfig,
} from '../constants/asciiConfig.js'

export function useAsciiLandingConfig() {
  const [config, setConfig] = useState(getFallbackAsciiConfig)

  useEffect(() => {
    let cancelled = false

    fetchAsciiLandingConfig().then((nextConfig) => {
      if (!cancelled) {
        setConfig(nextConfig)
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  return config
}
