import { useCallback, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { publishedProjects } from '../data'
import type { Project } from '../data'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useReveal } from '../hooks/useReveal'
import { useHorizontalGallery } from '../hooks/useHorizontalGallery'
import GalleryControls from './GalleryControls'
import SectionTitle from './SectionTitle'
import ProjectModal from './ProjectModal'
import ProjectVisual from './ProjectVisual'
import './Work.css'

/**
 * My Work — a horizontal gallery on the desktop, a plain grid everywhere
 * else.
 *
 * All copy comes from src/data/projects.ts; the cards are the same
 * component in both modes, so hover, focus and the expand arrow behave
 * identically whichever layout is running.
 *
 * Scroll is only ever taken over when it is safe to: a pointer that can
 * hover, a viewport with room for the row, and motion the visitor has
 * not asked us to reduce. Anything else gets the grid and its own
 * natural vertical scroll.
 */
export default function Work() {
  const reduced = useReducedMotion()
  const roomy = useMediaQuery('(min-width: 1024px) and (pointer: fine)')
  const horizontal = roomy && !reduced

  const projects = publishedProjects
  const { sectionRef, trackRef, progress, activeIndex, goTo, pinned } = useHorizontalGallery({
    count: projects.length,
    enabled: horizontal,
  })
  // The cards only carry data-reveal in stacked mode, so the observer
  // has to recollect its targets whenever the layout flips.
  const revealRef = useReveal<HTMLDivElement>(horizontal)

  /* The arrow that opened the overlay, so focus can go back to it. */
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const [openId, setOpenId] = useState<string | null>(null)
  const open = projects.find((project) => project.id === openId) ?? null

  const onOpen = useCallback((project: Project, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger
    setOpenId(project.id)
  }, [])

  const onClose = useCallback(() => {
    setOpenId(null)
    // The card may have scrolled under the pin while the overlay was up;
    // focusing without scrolling keeps the page where the visitor left it.
    triggerRef.current?.focus({ preventScroll: true })
    triggerRef.current = null
  }, [])

  return (
    <section
      id="work"
      className="section work"
      data-gallery={horizontal ? 'horizontal' : 'stacked'}
      ref={sectionRef}
    >
      <div className="gal-inner" ref={revealRef}>
        <div className="container gal-head">
          <header className="section-head">
            {/* No eyebrow here: the heading already says "My Work", and
                the label underneath it only repeated itself. */}
            <SectionTitle lead="My" accent="work" revealIndex={0} />
          </header>

          {horizontal && pinned && (
            <GalleryControls
              count={projects.length}
              activeIndex={activeIndex}
              progress={progress}
              onGo={goTo}
              label="project"
            />
          )}
        </div>

        <div className="gal-viewport">
          <ul className="gal-track" ref={trackRef}>
            {projects.map((project, index) => (
              <li
                key={project.id}
                className="gal-cell"
                data-reveal={horizontal ? undefined : ''}
                style={{ '--i': 2 + index } as CSSProperties}
              >
                <ProjectCard project={project} onOpen={onOpen} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {open && <ProjectModal project={open} onClose={onClose} />}
    </section>
  )
}

/* ------------------------------------------------------------------
   Card
   ------------------------------------------------------------------ */

interface CardProps {
  project: Project
  onOpen: (project: Project, trigger: HTMLButtonElement) => void
}

function ProjectCard({ project, onOpen }: CardProps) {
  return (
    <article className="pc">
      <div className="pc-visual">
        {/* Banner or monogram — ProjectVisual decides from `image`,
            and the overlay draws exactly the same panel. */}
        <ProjectVisual project={project} />

        <button
          type="button"
          className="pc-expand"
          onClick={(event) => onOpen(project, event.currentTarget)}
        >
          <span className="sr-only">{`Open details for ${project.title}`}</span>
          <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
            <path
              d="M7 17L17 7M9 7h8v8"
              stroke="currentColor"
              strokeWidth="1.9"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="pc-body">
        <p className="pc-meta">
          <span className="pc-index">{project.index}</span>
          <span className="pc-category">{project.category}</span>
        </p>

        <h3 className="pc-title">{project.title}</h3>
        <p className="pc-summary">{project.summary}</p>

        <div className="pc-tools">
          <h4 className="pc-tools-head">Tools and features</h4>
          <ul>
            {project.tools.map((tool) => (
              <li key={tool} className="chip">
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}
