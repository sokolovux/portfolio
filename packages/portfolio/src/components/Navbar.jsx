import { Link, NavLink } from 'react-router-dom'

function navLinkClass({ isActive }) {
  return isActive ? 'nav-link active' : 'nav-link'
}

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand">
      <div className="container">
        <Link className="h4" to="/">
          Maxim<span className="text-highlight">*</span>Sokolov
        </Link>
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink to="/work" className={navLinkClass}>
              Work
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" end className={navLinkClass}>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}
