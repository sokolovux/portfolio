import BrandLink from './BrandLink.jsx'
import ScrambleOnHover from './ScrambleOnHover.jsx'

const NAV_LINKS = [
  { label: 'Experience', href: '#experience' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'CV', href: '/cv.pdf', target: '_blank', rel: 'noopener noreferrer' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  return (
    <nav className="navbar sticky-top bg-body py-3 border-bottom">
      <div className="container d-flex flex-column align-items-start gap-2">
        <BrandLink />
        <div className="d-flex flex-wrap gap-3 w-100">
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
      </div>
    </nav>
  )
}
