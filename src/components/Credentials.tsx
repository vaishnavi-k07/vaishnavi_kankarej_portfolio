import { useCallback, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { credentials } from '../data'
import type { Credential } from '../data'
import { asset } from '../lib/asset'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useReveal } from '../hooks/useReveal'
import { useHorizontalGallery } from '../hooks/useHorizontalGallery'
import GalleryControls from './GalleryControls'
import SectionTitle from './SectionTitle'
import Lightbox from './Lightbox'
import './Credentials.css'

const KIND_LABEL: Record<Credential['kind'], string> = {
  certification: 'Certification',
  achievement: 'Achievement',
}

/**
 * Certifications and achievements, rendered from src/data/credentials.ts.
 *
 * The same pinned horizontal gallery as My Work: the shell, counter,
 * rail and arrows come from src/styles/gallery.css, useHorizontalGallery
 * and GalleryControls, so the two sections move identically and there
 * is one copy of that behaviour to maintain.
 *
 * Scroll is only ever taken over when it is safe to: a pointer that can
 * hover, a viewport at least 1024px wide, and motion the visitor has
 * not asked us to reduce. Anything else gets a plain responsive grid
 * with its own natural vertical scroll, and the pin has a finite end
 * either way, so the page always carries on past the last card.
 *
 * Every optional field in the data file is a switch this component
 * reads at render time:
 *   image - draws a thumbnail that opens the lightbox; absent, the card
 *           is simply text, never a broken frame
 *   url   - draws a "View credential" external link; absent, nothing
 *   date  - drawn when stated, omitted when no source gives one
 */
export default function Credentials() {
  const reduced = useReducedMotion()
  const roomy = useMediaQuery('(min-width: 1024px) and (pointer: fine)')
  const horizontal = roomy && !reduced

  const { sectionRef, trackRef, progress, activeIndex, goTo, pinned } = useHorizontalGallery({
    count: credentials.length,
    enabled: horizontal,
  })
  // The cards only carry data-reveal in stacked mode, so the observer
  // has to recollect its targets whenever the layout flips.
  const revealRef = useReveal<HTMLDivElement>(horizontal)

  /* The thumbnail that opened the lightbox, so focus can go back to it. */
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const [openId, setOpenId] = useState<string | null>(null)
  const open = credentials.find((item) => item.id === openId) ?? null

  const onOpen = useCallback((id: string, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger
    setOpenId(id)
  }, [])

  const onClose = useCallback(() => {
    setOpenId(null)
    // The card may have scrolled under the pin while the lightbox was
    // up; focusing without scrolling keeps the page where it was left.
    triggerRef.current?.focus({ preventScroll: true })
    triggerRef.current = null
  }, [])

  return (
    <section
      id="credentials"
      className="section credentials"
      data-gallery={horizontal ? 'horizontal' : 'stacked'}
      ref={sectionRef}
    >
      <div className="gal-inner" ref={revealRef}>
        <div className="container gal-head">
          <header className="section-head">
            <p className="eyebrow" data-reveal style={{ '--i': 0 } as CSSProperties}>
              Credentials
            </p>
            <SectionTitle lead="Certifications &" accent="achievements" revealIndex={1} />
          </header>

          {horizontal && pinned && (
            <GalleryControls
              count={credentials.length}
              activeIndex={activeIndex}
              progress={progress}
              onGo={goTo}
              label="credential"
            />
          )}
        </div>

        <div className="gal-viewport">
          <ul className="gal-track" ref={trackRef}>
            {credentials.map((item, index) => (
              <li
                key={item.id}
                className="gal-cell"
                data-reveal={horizontal ? undefined : ''}
                style={{ '--i': 2 + index } as CSSProperties}
              >
                <CredentialCard item={item} onOpen={onOpen} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {open?.image && <Lightbox image={open.image} onClose={onClose} />}
    </section>
  )
}

/* ------------------------------------------------------------------
   Card
   ------------------------------------------------------------------ */

interface CardProps {
  item: Credential
  onOpen: (id: string, trigger: HTMLButtonElement) => void
}

function CredentialCard({ item, onOpen }: CardProps) {
  return (
    <article className="cred-card" data-kind={item.kind}>
      {item.image && (
        <button
          type="button"
          className="cred-thumb"
          aria-label={`Enlarge: ${item.image.caption}`}
          onClick={(event) => onOpen(item.id, event.currentTarget)}
        >
          <img
            src={asset(item.image.src)}
            alt={item.image.alt}
            width={item.image.width}
            height={item.image.height}
            loading="lazy"
            decoding="async"
          />
          <span className="cred-thumb-hint" aria-hidden="true">
            <ExpandIcon />
            View
          </span>
        </button>
      )}

      <div className="cred-body">
        <p className="cred-kind">{KIND_LABEL[item.kind]}</p>

        <h3 className="cred-title">{item.title}</h3>

        <p className="cred-issuer">
          {item.issuer}
          {item.date && (
            <>
              <span className="cred-dot" aria-hidden="true">
                &middot;
              </span>
              {item.date}
            </>
          )}
        </p>

        {item.skills && item.skills.length > 0 && (
          <ul className="cred-skills">
            {item.skills.map((skill) => (
              <li key={skill} className="chip">
                {skill}
              </li>
            ))}
          </ul>
        )}

        {item.url && (
          <a className="cred-link" href={item.url} target="_blank" rel="noopener noreferrer">
            View credential
            <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
              <path
                d="M7 17L17 7M9 7h8v8"
                stroke="currentColor"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
      </div>
    </article>
  )
}

function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
      <path
        d="M9 4H4v5M15 4h5v5M15 20h5v-5M9 20H4v-5"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
