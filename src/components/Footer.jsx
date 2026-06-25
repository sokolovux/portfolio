import BrandLink from './BrandLink.jsx'

export default function Footer() {
  return (
    <footer className="bg-body py-4 border-top">
      <div className="container d-flex flex-row flex-wrap justify-content-between align-items-center gap-3">
        <BrandLink />
        <p className="small text-muted text-center mb-0">
          © {new Date().getFullYear()} Maxim Sokolov
        </p>
      </div>
    </footer>
  )
}
