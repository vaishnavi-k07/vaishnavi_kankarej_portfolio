import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { navIdFor, navItems, profile } from '../data'
import { asset } from '../lib/asset'
import { scrollToTarget } from '../lib/scroll'
import { useScrolled } from '../hooks/useScrolled'
import MobileMenu from './MobileMenu'
import './Header.css'

interface HeaderProps {
  /** Section id currently in view, from the scroll-spy. */
  activeId: string
}

export default function Header({ activeId }: HeaderProps) {
  /* Sections without a nav entry of their own keep the last entry lit
     rather than leaving the whole bar dark; see navIdFor. */
  const currentId = navIdFor(activeId)
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useScrolled(32)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuId = useId()

  /** Anchor clicks are handled here so Lenis owns the motion and the
   *  landing position clears the fixed header. */
  const goToSection = useCallback((href: string) => {
    const header = document.querySelector<HTMLElement>('.header')
    const offset = -((header?.offsetHeight ?? 72) + 8)
    scrollToTarget(href, offset)
    if (history.replaceState) history.replaceState(null, '', href)
  }, [])

  const handleNavClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      // Let modified clicks (new tab, etc.) behave normally.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
      event.preventDefault()
      setMenuOpen(false)
      goToSection(href)
    },
    [goToSection],
  )

  // Close the menu if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    if (!menuOpen) return
    const query = window.matchMedia('(min-width: 901px)')
    const onChange = () => query.matches && setMenuOpen(false)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [menuOpen])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    toggleRef.current?.focus()
  }, [])

  return (
    <header className="header" data-scrolled={scrolled || undefined}>
      <div className="header-inner container">
        <a
          className="logo"
          href="#home"
          onClick={(event) => handleNavClick(event, '#home')}
          aria-label={`${profile.name} — back to top`}
        >
          <span className="logo-mark" aria-hidden="true">
            {profile.initials}
          </span>
          <span className="logo-text">
            <span className="logo-name">{profile.name}</span>
            <span className="logo-role">{profile.role}</span>
          </span>
        </a>

        <nav className="nav" aria-label="Primary">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className="nav-link"
                  aria-current={currentId === item.id ? 'page' : undefined}
                  onClick={(event) => handleNavClick(event, item.href)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <a
            className="btn btn-sm resume-btn"
            href={asset(profile.resumePath)}
            download={profile.resumeFileName}
          >
            Resume
          </a>

          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
            <span className="menu-toggle-bars" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <MobileMenu
        id={menuId}
        open={menuOpen}
        activeId={currentId}
        onClose={closeMenu}
        onNavigate={handleNavClick}
      />
    </header>
  )
}
