import { useEffect, useRef, useState } from 'react'
import { getSiteEmail, SITE_GITHUB, SITE_LINKEDIN } from '../constants/site.js'
import ScrambleOnHover from './ScrambleOnHover.jsx'

const COPIED_LABEL = 'Copied!'
const EMAIL_LABEL = 'Email'
const COPY_RESET_MS = 2000

function EmailLink() {
  const [label, setLabel] = useState(EMAIL_LABEL)
  const resetTimeoutRef = useRef(null)

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current)
      }
    }
  }, [])

  async function handleClick(event) {
    event.preventDefault()

    try {
      await navigator.clipboard.writeText(getSiteEmail())
    } catch {
      return
    }

    setLabel(COPIED_LABEL)

    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current)
    }

    resetTimeoutRef.current = setTimeout(() => {
      setLabel(EMAIL_LABEL)
      resetTimeoutRef.current = null
    }, COPY_RESET_MS)
  }

  if (label === COPIED_LABEL) {
    return (
      <a
        className="nav-link"
        href="#"
        aria-live="polite"
        onClick={(event) => event.preventDefault()}
      >
        {COPIED_LABEL}
      </a>
    )
  }

  return (
    <ScrambleOnHover
      text={label}
      tag="a"
      className="nav-link"
      href="#"
      aria-label="Copy email to clipboard"
      onClick={handleClick}
    />
  )
}

export default function SocialLinks({ className = 'd-flex flex-wrap gap-3' }) {
  return (
    <div className={className}>
      <div>
        <EmailLink />
      </div>
      <div>
        <ScrambleOnHover
          text="LinkedIn"
          tag="a"
          className="nav-link"
          href={SITE_LINKEDIN}
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
      <div>
        <ScrambleOnHover
          text="GitHub"
          tag="a"
          className="nav-link"
          href={SITE_GITHUB}
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </div>
  )
}
