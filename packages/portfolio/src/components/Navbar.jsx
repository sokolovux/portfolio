import Headroom from 'headroom.js'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import BrandLink from './BrandLink.jsx'
import ScrambleOnHover from './ScrambleOnHover.jsx'
import SocialLinks from './SocialLinks.jsx'

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
        <div className="container d-flex flex-column align-items-start gap-2">
          <BrandLink />
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 w-100">
            <div className="d-flex flex-wrap gap-3">
              <div>
                <ScrambleOnHover text="Work" tag={Link} className="nav-link" to="/#work" />
              </div>
              <div>
                <ScrambleOnHover
                  text="CV"
                  tag="a"
                  className="nav-link"
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </div>
              <div>
                <ScrambleOnHover text="About" tag={Link} className="nav-link" to="/#about" />
              </div>
              <div>
                <ScrambleOnHover text="Playground" tag={Link} className="nav-link" to="/#playground" />
              </div>
            </div>
            <SocialLinks />
          </div>
        </div>
      </nav>
      <div className="navbar-spacer" aria-hidden="true" />
    </>
  )
}
