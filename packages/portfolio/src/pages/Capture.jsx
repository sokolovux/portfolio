import { useEffect, useState } from 'react'
import BtnCustom from '../components/BtnCustom.jsx'
import CaptureForm, { DEFAULT_VALUES } from '../components/capture/CaptureForm.jsx'
import VideoPreview from '../components/capture/VideoPreview.jsx'

const UNLOCKED_KEY = 'folioscroll_unlocked'
const PASSWORD = import.meta.env.VITE_FOLIOSCROLL_PASSWORD

function buildFilename(url) {
  try {
    const hostname = new URL(url).hostname
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')

    return `folioscroll-${hostname}-${date}.mp4`
  } catch {
    return `folioscroll-${Date.now()}.mp4`
  }
}

function parseFilenameFromDisposition(header) {
  if (!header) {
    return null
  }

  const match = header.match(/filename="([^"]+)"/)

  return match?.[1] ?? null
}

export default function Capture() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(UNLOCKED_KEY) === 'true')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [formValues, setFormValues] = useState(DEFAULT_VALUES)
  const [recording, setRecording] = useState(false)
  const [error, setError] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [filename, setFilename] = useState('')

  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl)
      }
    }
  }, [videoUrl])

  function handleUnlock() {
    if (password === PASSWORD && PASSWORD) {
      sessionStorage.setItem(UNLOCKED_KEY, 'true')
      setUnlocked(true)
      setPasswordError(false)
      return
    }

    setPasswordError(true)
  }

  function handleFormChange(field, value) {
    setFormValues((current) => ({ ...current, [field]: value }))
    setError('')
  }

  async function handleSubmit() {
    setRecording(true)
    setError('')

    try {
      const response = await fetch('/api/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        throw new Error(payload.error || 'Recording failed')
      }

      const blob = await response.blob()
      const nextFilename =
        parseFilenameFromDisposition(response.headers.get('Content-Disposition')) ||
        buildFilename(formValues.url)

      if (videoUrl) {
        URL.revokeObjectURL(videoUrl)
      }

      setFilename(nextFilename)
      setVideoUrl(URL.createObjectURL(blob))
    } catch (err) {
      setError(err.message || 'Recording failed')
    } finally {
      setRecording(false)
    }
  }

  function handleReset() {
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl)
    }

    setVideoUrl('')
    setFilename('')
    setError('')
  }

  if (!unlocked) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-5">
            <h1 className="h3 mb-4">Folioscroll</h1>
            <div className="d-flex flex-column gap-3">
              <label htmlFor="folioscroll-password" className="form-label">
                Password
              </label>
              <input
                id="folioscroll-password"
                type="password"
                className="form-control"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                  setPasswordError(false)
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleUnlock()
                  }
                }}
              />
              {passwordError && <p className="text-danger mb-0">Incorrect password.</p>}
              <BtnCustom type="button" label="Unlock" onClick={handleUnlock} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <header className="mb-4">
        <h1 className="h3">Folioscroll</h1>
        <p className="text-muted mb-0">Record a smooth scroll video of any page.</p>
      </header>

      {videoUrl ? (
        <VideoPreview videoUrl={videoUrl} filename={filename} onReset={handleReset} />
      ) : (
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            {recording && (
              <p className="text-muted mb-3" role="status" aria-live="polite">
                Recording…
              </p>
            )}
            <CaptureForm
              values={formValues}
              onChange={handleFormChange}
              onSubmit={handleSubmit}
              disabled={recording}
              error={error}
            />
          </div>
        </div>
      )}
    </div>
  )
}
