import AsciiAnimation from './AsciiAnimation.jsx'
import BrandLink from './BrandLink.jsx'
import { useAsciiLandingConfig } from '../hooks/useAsciiLandingConfig.js'

export default function Footer() {
  const asciiConfig = useAsciiLandingConfig()

  return (
    <footer className="bg-body py-4 border-top">
      <div className="container pb-5 d-flex flex-column gap-4">
        <div className="d-flex flex-row flex-wrap justify-content-between align-items-center gap-3">
          <BrandLink />
          <p className="small text-muted text-center mb-0">
            © {new Date().getFullYear()} Maxim Sokolov
          </p>
        </div>
        <AsciiAnimation config={asciiConfig} />
      </div>
    </footer>
  )
}
