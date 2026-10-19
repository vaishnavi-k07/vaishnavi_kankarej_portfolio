import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { profile, socials } from '../data'
import { useReveal } from '../hooks/useReveal'
import SectionTitle from './SectionTitle'
import './Contact.css'

type CopyState = 'idle' | 'copied' | 'failed'

/**
 * Contact Me.
 *
 * Deliberately no form. There is no backend to receive one, and a form
 * that silently goes nowhere — or worse, says "Message sent!" — would
 * be a lie told to a recruiter. A mailto link is honest, works in every
 * client, and is one tap on a phone. The copy button covers the case
 * where the visitor would rather paste the address somewhere else.
 *
 * Every detail shown here comes from the resume: the address, the
 * phone number, the location and the two profile links. Nothing is
 * placeholdered — a channel that does not exist is simply absent.
 */
export default function Contact() {
  const root = useReveal<HTMLElement>()
  const [copyState, setCopyState] = useState<CopyState>('idle')
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copyEmail = useCallback(async () => {
    window.clearTimeout(timer.current)
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopyState('copied')
    } catch {
      // Blocked clipboard, insecure origin, or an old browser. Say so
      // rather than claiming a copy that did not happen — the address
      // is on screen and selectable either way.
      setCopyState('failed')
    }
    timer.current = window.setTimeout(() => setCopyState('idle'), 2600)
  }, [])

  const mailto = `mailto:${profile.email}`

  return (
    <section id="contact" className="section contact" ref={root}>
      <div className="container">
        <header className="section-head">
          <p className="eyebrow" data-reveal style={{ '--i': 0 } as CSSProperties}>
            Contact Me
          </p>
          <SectionTitle lead="Get in" accent="touch" revealIndex={1} />
          <p data-reveal style={{ '--i': 2 } as CSSProperties}>
            I am open to internships, graduate AI/ML roles and interesting
            collaborations. The quickest way to reach me is email — I read everything
            and reply.
          </p>
        </header>

        <div className="contact-grid">
          <div className="contact-primary" data-reveal style={{ '--i': 3 } as CSSProperties}>
            <p className="contact-label">Email</p>

            <a className="contact-email" href={mailto}>
              {profile.email}
            </a>

            <div className="contact-actions">
              <a className="btn btn-primary" href={mailto}>
                Send an email
              </a>

              <button type="button" className="btn" onClick={copyEmail}>
                {copyState === 'copied'
                  ? 'Copied'
                  : copyState === 'failed'
                    ? 'Press Ctrl+C'
                    : 'Copy email'}
              </button>
            </div>

            <p className="contact-copy-note" role="status">
              {copyState === 'copied' && 'Email address copied to your clipboard.'}
              {copyState === 'failed' && 'Could not copy automatically — select the address above.'}
            </p>
          </div>

          <ul className="contact-details" data-reveal style={{ '--i': 4 } as CSSProperties}>
            <ContactRow label="Phone" icon={<PhoneIcon />}>
              <a href={`tel:${profile.phoneHref}`}>{profile.phone}</a>
            </ContactRow>

            <ContactRow label="Location" icon={<PinIcon />}>
              <span>{profile.location}</span>
            </ContactRow>
          </ul>

          <ul className="contact-socials" data-reveal style={{ '--i': 5 } as CSSProperties}>
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  className="contact-social"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="contact-social-icon" aria-hidden="true">
                    <SocialIcon label={social.label} />
                  </span>
                  <span className="contact-social-text">
                    <span className="contact-social-label">{social.label}</span>
                    <span className="contact-social-handle">{social.handle}</span>
                  </span>
                  <span className="contact-social-arrow" aria-hidden="true">
                    &#8599;
                  </span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function ContactRow({
  label,
  icon,
  children,
}: {
  label: string
  icon: ReactNode
  children: ReactNode
}) {
  return (
    <li className="contact-row">
      <span className="contact-row-icon" aria-hidden="true">
        {icon}
      </span>
      <span className="contact-row-text">
        <span className="contact-row-label">{label}</span>
        {children}
      </span>
    </li>
  )
}

/** Brand marks for the two profiles the resume lists. */
function SocialIcon({ label }: { label: string }) {
  if (label === 'LinkedIn') {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M12 .3a12 12 0 0 0-3.79 23.4c.6.1.82-.26.82-.58v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .3z" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.37 2.3.57 3.5.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.2 2.4.57 3.5a1 1 0 0 1-.25 1l-2.2 2.3z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  )
}
