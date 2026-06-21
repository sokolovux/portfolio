import { useEffect, useState } from 'react'
import {
  ASCII_LANDING_CONFIG_EVENT,
  ASCII_LANDING_CONFIG_STORAGE_KEY,
  loadAsciiLandingConfig,
} from '../constants/asciiConfig.js'

export function useAsciiLandingConfig() {
  const [config, setConfig] = useState(() => loadAsciiLandingConfig())

  useEffect(() => {
    if (import.meta.env.PROD) {
      return undefined
    }

    function syncConfig() {
      setConfig(loadAsciiLandingConfig())
    }

    function onStorage(event) {
      if (event.key === ASCII_LANDING_CONFIG_STORAGE_KEY) {
        syncConfig()
      }
    }

    window.addEventListener(ASCII_LANDING_CONFIG_EVENT, syncConfig)
    window.addEventListener('storage', onStorage)

    return () => {
      window.removeEventListener(ASCII_LANDING_CONFIG_EVENT, syncConfig)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  return config
}
