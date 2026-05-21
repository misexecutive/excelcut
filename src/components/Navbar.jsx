import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/advanced-excel', label: 'Advanced Excel' },
  { to: '/power-bi', label: 'Power BI' },
  { to: '/apps-script', label: 'Apps Script' },
  { to: '/student-reviews', label: 'Student Reviews' },
  { to: '/send-query', label: 'Send Query' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Primary navigation">
        <Link to="/" className="brand" onClick={() => setIsOpen(false)}>
          <span>EC</span>
          <strong>ExcelCut</strong>
        </Link>

        <button
          type="button"
          className="menu-button"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`nav-links ${isOpen ? 'nav-links--open' : ''}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}
