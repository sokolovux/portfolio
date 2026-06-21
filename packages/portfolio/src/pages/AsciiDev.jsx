import { useEffect, useState } from 'react'
import AsciiAnimation from '../components/AsciiAnimation.jsx'
import AsciiControls from '../components/AsciiControls.jsx'
import {
  fetchAsciiLandingConfig,
  formatAsciiConfigForCode,
  getFallbackAsciiConfig,
  resetAsciiLandingConfig,
  saveAsciiLandingConfig,
} from '../constants/asciiConfig.js'

export default function AsciiDev() {
  const [config, setConfig] = useState(getFallbackAsciiConfig)
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState(false)
  const configSnippet = formatAsciiConfigForCode(config)

  useEffect(() => {
    fetchAsciiLandingConfig().then(setConfig)
  }, [])

  async function saveToLanding() {
    setSaveError(false)

    try {
      const nextConfig = await saveAsciiLandingConfig(config)
      setConfig(nextConfig)
      setSaved(true)
      window.setTimeout(() => setSaved(false), 2000)
    } catch {
      setSaveError(true)
    }
  }

  async function restoreDefaults() {
    setSaveError(false)

    try {
      const nextConfig = await resetAsciiLandingConfig()
      setConfig(nextConfig)
    } catch {
      setSaveError(true)
    }
  }

  async function copyConfig() {
    await navigator.clipboard.writeText(configSnippet)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container py-5 d-flex flex-column gap-4">
      <header className="d-flex flex-column gap-2">
        <h1>ASCII dev</h1>
        <p className="text-muted mb-0">
          Save writes the live landing animation to Redis for all visitors. This page is
          password-protected in production via <code>ASCII_DEV_PASSWORD</code>.
        </p>
        {saveError ? (
          <p className="text-muted mb-0">Save failed. Check your password and try again.</p>
        ) : null}
      </header>

      <AsciiAnimation config={config} />

      <div className="d-flex flex-row flex-wrap gap-2">
        <button type="button" className="btn btn-primary" onClick={saveToLanding}>
          {saved ? 'Saved' : 'Save'}
        </button>
        <button type="button" className="btn btn-outline-secondary" onClick={restoreDefaults}>
          Restore defaults
        </button>
      </div>

      <AsciiControls config={config} onChange={setConfig} onReset={setConfig} />

      <div className="d-flex flex-column gap-2">
        <div className="d-flex flex-row align-items-center gap-2">
          <h2 className="h5 mb-0">Git fallback snippet</h2>
          <button type="button" className="btn btn-outline-secondary" onClick={copyConfig}>
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <p className="text-muted mb-0">
          Optional backup if Redis is unavailable. Update <code>LANDING_ASCII_CONFIG</code> in{' '}
          <code>asciiConfig.js</code>.
        </p>
        <textarea
          className="form-control font-monospace"
          readOnly
          rows={14}
          value={configSnippet}
          aria-label="ASCII git fallback snippet"
        />
      </div>
    </div>
  )
}
