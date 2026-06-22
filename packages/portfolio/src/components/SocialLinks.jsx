import { useEffect, useRef, useState } from 'react'
import { getSiteEmail, SITE_GITHUB, SITE_LINKEDIN } from '../constants/site.js'
import ScrambleOnHover from './ScrambleOnHover.jsx'

const EXTERNAL_LINKS = [
  { label: 'LinkedIn', href: SITE_LINKEDIN },
  { label: 'GitHub', href: SITE_GITHUB },
]

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

export default function SocialLinks({ id, className = 'd-flex flex-wrap gap-3' }) {
  return (
    <div id={id} className={className}>
      <EmailLink />
      {EXTERNAL_LINKS.map((link) => (
        <ScrambleOnHover
          key={link.label}
          text={link.label}
          tag="a"
          className="nav-link"
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
        />
      ))}
    </div>
  )
}
