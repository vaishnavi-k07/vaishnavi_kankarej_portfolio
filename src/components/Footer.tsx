import { navItems, profile, socials } from '../data'
import { scrollToTarget } from '../lib/scroll'
import './Footer.css'

/** Resolved once at module load rather than on every render. */
const YEAR = new Date().getFullYear()

export default function Footer() {
  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
    event.preventDefault()
    const header = document.querySelector<HTMLElement>('.header')
    scrollToTarget(href, -((header?.offsetHeight ?? 72) + 8))
    if (history.replaceState) history.replaceState(null, '', href)
  }

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="logo-mark" aria-hidden="true">
            {profile.initials}
          </span>
          <div>
            <p className="footer-name">{profile.name}</p>
            <p className="footer-meta">
              {profile.role} · {profile.location}
            </p>
          </div>
        </div>

        <nav className="footer-nav" aria-label="Footer">
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={item.href} onClick={(event) => handleNavClick(event, item.href)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="footer-socials">
          {socials.map((social) => (
            <li key={social.label}>
              <a href={social.href} target="_blank" rel="noopener noreferrer">
                {social.label}
                <span className="footer-social-arrow" aria-hidden="true">
                  ↗
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${profile.email}`}>Email</a>
          </li>
        </ul>
      </div>

      <div className="container footer-base">
        <p>
          © {YEAR} {profile.name}
        </p>
        <p className="footer-colophon">Built with React, Vite and GSAP</p>
      </div>
    </footer>
  )
}
