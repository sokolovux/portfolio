import Headroom from 'headroom.js'
import { useEffect, useRef } from 'react'
import BrandLink from './BrandLink.jsx'
import ScrambleOnHover from './ScrambleOnHover.jsx'

const NAV_LINKS = [
  { label: 'Experience', href: '#experience' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'CV', href: '/cv.pdf', target: '_blank', rel: 'noopener noreferrer' },
]

const CONTACT_LINK = { label: 'Contact', href: '#contact' }

export default function Navbar() {
  const navRef = useRef(null)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return undefined

    const headroom = new Headroom(nav, {
      tolerance: { up: 10, down: 10 },
    })
    headroom.init()

    return () => {
      if (headroom.scrollTracker) {
        headroom.destroy()
        return
      }

      if (headroom.initialised) {
        headroom.initialised = false
        Object.keys(headroom.classes).forEach((key) => headroom.removeClass(key))
      }
    }
  }, [])

  return (
    <>
      <nav
        ref={navRef}
        className="navbar navbar-headroom fixed-top bg-body py-3 border-bottom w-100"
      >
        <div className="container d-flex flex-column align-items-start gap-3">
          <BrandLink />
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 w-100">
            <div className="d-flex flex-wrap gap-3">
              {NAV_LINKS.map((link) => (
                <ScrambleOnHover
                  key={link.label}
                  text={link.label}
                  tag="a"
                  className="nav-link"
                  href={link.href}
                  target={link.target}
                  rel={link.rel}
                />
              ))}
            </div>
            <ScrambleOnHover
              text={CONTACT_LINK.label}
              tag="a"
              className="nav-link"
              href={CONTACT_LINK.href}
            />
          </div>
        </div>
      </nav>
      <div className="navbar-spacer" aria-hidden="true" />
    </>
  )
}
