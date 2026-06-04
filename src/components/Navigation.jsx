import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = ['PROJECTS', 'BLOG', 'ABOUT', 'RESUME']

/* Minimalist white wordmark SVG */
function Logo() {
  return (
    <svg width="140" height="28" viewBox="0 0 140 28" fill="none" aria-label="CodeNest">
      <text
        x="0"
        y="21"
        fontFamily="Inter, sans-serif"
        fontWeight="800"
        fontSize="22"
        fill="white"
        letterSpacing="-0.5"
      >
        Code<tspan fill="#5ed29c">Nest</tspan>
      </text>
    </svg>
  )
}

export default function Navigation() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6">
        <a href="/" aria-label="CodeNest home">
          <Logo />
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="font-inter text-[16px] font-medium text-white/70 hover:text-brand transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden relative z-50 text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Full-screen mobile overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 bg-dark/95 transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href="#"
            onClick={() => setOpen(false)}
            className="font-inter text-3xl font-extrabold text-white hover:text-brand transition-colors duration-200"
          >
            {link}
          </a>
        ))}
      </div>
    </>
  )
}
