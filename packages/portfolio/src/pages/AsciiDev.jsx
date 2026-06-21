import { useState } from 'react'
import AsciiAnimation from '../components/AsciiAnimation.jsx'
import AsciiControls from '../components/AsciiControls.jsx'
import {
  clearAsciiLandingConfig,
  formatAsciiConfigForCode,
  loadAsciiLandingConfig,
  saveAsciiLandingConfig,
} from '../constants/asciiConfig.js'

export default function AsciiDev() {
  const [config, setConfig] = useState(() => loadAsciiLandingConfig())
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)
  const configSnippet = formatAsciiConfigForCode(config)

  function saveToLanding() {
    saveAsciiLandingConfig(config)
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2000)
  }

  function useDeployedConfig() {
    clearAsciiLandingConfig()
    setConfig(loadAsciiLandingConfig())
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
          Save updates landing immediately in this browser. To ship the same look to all
          visitors, copy the snippet into <code>LANDING_ASCII_CONFIG</code>, bump{' '}
          <code>version</code>, commit, and deploy.
        </p>
      </header>

      <AsciiAnimation config={config} />

      <div className="d-flex flex-row flex-wrap gap-2">
        <button type="button" className="btn btn-primary" onClick={saveToLanding}>
          {saved ? 'Saved' : 'Save'}
        </button>
        <button type="button" className="btn btn-outline-secondary" onClick={useDeployedConfig}>
          Use deployed config
        </button>
      </div>

      <AsciiControls config={config} onChange={setConfig} onReset={setConfig} />

      <div className="d-flex flex-column gap-2">
        <div className="d-flex flex-row align-items-center gap-2">
          <h2 className="h5 mb-0">Deploy snippet</h2>
          <button type="button" className="btn btn-outline-secondary" onClick={copyConfig}>
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <textarea
          className="form-control font-monospace"
          readOnly
          rows={15}
          value={configSnippet}
          aria-label="ASCII deploy snippet"
        />
      </div>
    </div>
  )
}
