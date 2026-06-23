import { useEffect, useState } from 'react'
import {
  fetchAsciiHeroConfig,
  getFallbackAsciiHeroConfig,
} from '../constants/asciiConfig.js'

export function useAsciiHeroConfig() {
  const [config, setConfig] = useState(getFallbackAsciiHeroConfig)

  useEffect(() => {
    let cancelled = false

    fetchAsciiHeroConfig().then((nextConfig) => {
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
