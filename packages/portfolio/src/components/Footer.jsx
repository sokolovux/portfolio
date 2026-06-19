import BrandLink from './BrandLink.jsx'

export default function Footer() {
  return (
    <footer className="bg-body py-4 border-top">
      <div className="container d-flex flex-column align-items-center gap-3">
        <BrandLink />
        <p className="small text-muted text-center">
          © {new Date().getFullYear()} Maxim Sokolov
        </p>
      </div>
    </footer>
  )
}
