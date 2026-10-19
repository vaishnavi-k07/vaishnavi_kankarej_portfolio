import { useEffect, useId, useRef } from 'react'
import type { Project } from '../data'
import { setScrollLocked } from '../lib/scroll'
import ProjectVisual from './ProjectVisual'
import './ProjectModal.css'

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

/**
 * Project detail overlay.
 *
 * Escape, the close button and the scrim all dismiss it; Tab stays
 * inside while it is open, matching the mobile menu's behaviour. The
 * caller restores focus to the arrow that opened it.
 */
export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()
  const descId = useId()

  /* Escape closes; Tab stays inside the panel. */
  useEffect(() => {
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
  }, [onClose])

  /* Hold the page still behind the overlay. */
  useEffect(() => {
    setScrollLocked(true)
    document.body.style.overflow = 'hidden'
    return () => {
      setScrollLocked(false)
      document.body.style.overflow = ''
    }
  }, [])

  /* Move focus in, so the trap above has something to hold. */
  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  return (
    <div className="pm" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <button
        type="button"
        className="pm-scrim"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
      />

      <div className="pm-panel" ref={panelRef}>
        <button type="button" className="pm-close" onClick={onClose} ref={closeRef}>
          <span className="sr-only">Close project details</span>
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="pm-scroll">
          {/* Same banner the card carries, full-bleed across the panel. */}
          <div className="pm-visual">
            <ProjectVisual project={project} />
          </div>

          <p className="pm-eyebrow">
            <span className="pm-index">{project.index}</span>
            <span className="pm-category">{project.category}</span>
            {project.period && <span className="pm-period">{project.period}</span>}
          </p>

          <h3 className="pm-title" id={titleId}>
            {project.title}
          </h3>
          {project.subtitle && <p className="pm-subtitle">{project.subtitle}</p>}

          <p className="pm-description" id={descId}>
            {project.description}
          </p>

          {project.metric && (
            <p className="pm-metric">
              <span className="pm-metric-value">{project.metric.value}</span>
              <span className="pm-metric-label">{project.metric.label}</span>
            </p>
          )}

          {project.highlights.length > 0 && (
            <section className="pm-block">
              <h4 className="pm-subhead">Highlights</h4>
              <ul className="pm-highlights">
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {project.tools.length > 0 && (
            <section className="pm-block">
              <h4 className="pm-subhead">Tools and features</h4>
              <ul className="pm-tools">
                {project.tools.map((tool) => (
                  <li key={tool} className="chip">
                    {tool}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Only the links that exist. An empty field renders nothing
              at all rather than a disabled control a visitor cannot use:
              paste a URL into projects.ts and the link appears here. */}
          {(project.github || project.demo) && (
            <div className="pm-actions">
              {project.github && (
                <LinkAction href={project.github} label="View on GitHub" primary />
              )}
              {project.demo && <LinkAction href={project.demo} label="View live demo" />}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * An external link in the overlay's action row. Only rendered for a
 * field that holds a real URL — pasting one into projects.ts is the
 * whole change, and nothing here needs editing.
 */
function LinkAction({ href, label, primary }: { href: string; label: string; primary?: boolean }) {
  const className = primary ? 'btn btn-primary' : 'btn'

  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {label}
      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
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
  )
}
