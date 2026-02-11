import { useState, useEffect } from 'react'
import InstagramIcon from './InstagramIcon'

export default function Navbar({ onMobileMenuToggle }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`nav-glass fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "scrolled" : ""}`}
      style={{ paddingTop: 'var(--sat)', paddingLeft: 'var(--sal)', paddingRight: 'var(--sar)' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3">
          <img
            src="/logo-b.png"
            alt="BF"
            className="w-9 h-9 md:w-10 md:h-10 rounded-md object-contain flex-shrink-0"
            style={{background: '#FAFAFA'}}
          />
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#galeria"
            className="font-sans text-xs uppercase tracking-widest text-muted hover:text-ink transition-colors duration-300"
          >
            Galeria
          </a>
          <a
            href="#sobre"
            className="font-sans text-xs uppercase tracking-widest text-muted hover:text-ink transition-colors duration-300"
          >
            Sobre
          </a>
          <a
            href="#contato"
            className="font-sans text-xs uppercase tracking-widest text-muted hover:text-ink transition-colors duration-300"
          >
            Contato
          </a>
          <a
            href="https://instagram.com/obrunuaf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-ink transition-colors duration-300"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
        </div>
        {/* Mobile hamburger */}
        <button
          className="md:hidden text-ink p-2"
          onClick={onMobileMenuToggle}
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  )
}
