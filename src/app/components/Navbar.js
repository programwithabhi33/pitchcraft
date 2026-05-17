'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const navLinks = [
  { href: '/#features', label: 'Features' },
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/#faq', label: 'FAQ' },
]

export default function Navbar({ theme = 'dark' }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const isLight = theme === 'light'
  const textColor = isLight ? 'text-zinc-600' : 'text-[#A1A1AA]'
  const hoverTextColor = isLight ? 'hover:text-zinc-900' : 'hover:text-[#F4F4F5]'
  const logoTextColor = isLight ? 'text-zinc-900' : 'text-[#F4F4F5]'
  const bgScrolled = isLight ? 'bg-white/95' : 'bg-[#09090B]/95'
  const btnOutlineClass = isLight ? 'border-zinc-300 text-zinc-700 hover:bg-zinc-100' : 'btn-outline text-[#A1A1AA]'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? `${bgScrolled} backdrop-blur-md border-b border-[#3F3F46]/60 shadow-sm`
        : `bg-transparent`
        }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" id="nav-logo" className="flex items-center gap-2.5 group flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] flex items-center justify-center shadow-[0_0_16px_rgba(124,58,237,0.5)] group-hover:shadow-[0_0_24px_rgba(124,58,237,0.7)] transition-shadow duration-300">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className={`${logoTextColor} font-bold text-lg tracking-tight`}>
            PitchCraft <span className="gradient-text">AI</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              id={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              className={`${textColor} ${hoverTextColor} text-sm font-medium px-4 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-[#18181B] transition-all duration-200`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/auth"
            id="nav-login-btn"
            className={`${btnOutlineClass} border px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer`}
          >
            Log in
          </Link>
          <Link
            href="/auth"
            id="nav-start-btn"
            className="btn-violet text-sm px-5 py-2 block cursor-pointer"
          >
            <span>Get Started</span>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          id="nav-mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-[#A1A1AA] hover:text-[#F4F4F5] p-2 rounded-lg hover:bg-[#18181B] transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className={`md:hidden ${isLight ? 'bg-white/98 border-zinc-200' : 'bg-[#09090B]/98 border-[#3F3F46]/40'} backdrop-blur-md border-b px-4 py-4 space-y-1`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block ${textColor} ${hoverTextColor} text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-black/5 dark:hover:bg-[#18181B] transition-colors`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <Link href="/auth" className={`${btnOutlineClass} border rounded-lg text-sm px-4 py-2.5 text-center font-medium cursor-pointer`}>Log in</Link>
            <Link href="/auth" className="btn-violet text-sm px-4 py-2.5 text-center block cursor-pointer"><span>Get Started</span></Link>
          </div>
        </div>
      )}
    </header>
  )
}
