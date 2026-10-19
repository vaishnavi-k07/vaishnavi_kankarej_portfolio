import { useEffect, useRef } from 'react'
import { navItems, profile, socials } from '../data'
import { asset } from '../lib/asset'
import { setScrollLocked } from '../lib/scroll'
import './MobileMenu.css'

interface MobileMenuProps {
  id: string
  open: boolean
  activeId: string
  onClose: () => void
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>, href: string) => void
}

export default function MobileMenu({ id, open, activeId, onClose, onNavigate }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  /* Escape closes; Tab stays inside the panel while it is open. */
  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      )
      if (!focusable || focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  /* Hold the page still behind the panel. */
  useEffect(() => {
    setScrollLocked(open)
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      setScrollLocked(false)
      document.body.style.overflow = ''
    }
  }, [open])

  /* Move focus into the panel when it opens. */
  useEffect(() => {
    if (!open) return
    const firstLink = panelRef.current?.querySelector<HTMLElement>('a[href]')
    firstLink?.focus()
  }, [open])

  return (
    <div className="mobile-menu" data-open={open || undefined} aria-hidden={!open}>
      <button
        type="button"
        className="mobile-menu-scrim"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        id={id}
        className="mobile-menu-panel"
        role="dialog"
        aria-modal={open}
        aria-label="Site menu"
        inert={!open}
      >
        <nav aria-label="Mobile">
          <ul className="mobile-menu-list">
            {navItems.map((item, index) => (
              <li key={item.id} style={{ '--i': index } as React.CSSProperties}>
                <a
                  href={item.href}
                  aria-current={activeId === item.id ? 'page' : undefined}
                  onClick={(event) => onNavigate(event, item.href)}
                >
                  <span className="mobile-menu-index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mobile-menu-foot">
          <a
            className="btn btn-primary"
            href={asset(profile.resumePath)}
            download={profile.resumeFileName}
          >
            Download Resume
          </a>

          <ul className="mobile-menu-socials">
            {socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  {social.label}
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${profile.email}`}>Email</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
