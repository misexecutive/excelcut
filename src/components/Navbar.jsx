import { MessageCircle, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import ThemeSwitcher from './ThemeSwitcher'
import { generalQueryMessage } from '../data/courses'
import { createWhatsAppLink } from '../utils/whatsapp'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/advanced-excel', label: 'Advanced Excel' },
  { to: '/power-bi', label: 'Power BI' },
  { to: '/apps-script', label: 'Apps Script' },
  { to: '/student-reviews', label: 'Learner Info' },
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
          <ThemeSwitcher />
          <a
            className="nav-cta"
            href={createWhatsAppLink(generalQueryMessage)}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={17} aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      </nav>
    </header>
  )
}
