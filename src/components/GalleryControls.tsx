import type { CSSProperties } from 'react'

interface GalleryControlsProps {
  count: number
  activeIndex: number
  /** 0–1 along the pinned run; drives the progress rail. */
  progress: number
  onGo: (index: number) => void
  /**
   * Singular noun for the items being paged, e.g. 'project' or
   * 'credential'. Used only in the text announced to screen readers
   * and on the arrow buttons, so each gallery says what it is paging.
   */
  label: string
}

const pad = (n: number) => String(n).padStart(2, '0')

/** Capitalised for the start of the announced sentence. */
function sentenceCase(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

/**
 * Counter, progress rail and arrows for a pinned horizontal gallery.
 *
 * Shared by My Work and Credentials so the two read identically. The
 * caller only renders this once the pin is actually live, which is why
 * nothing here has a stacked-mode state to worry about.
 */
export default function GalleryControls({
  count,
  activeIndex,
  progress,
  onGo,
  label,
}: GalleryControlsProps) {
  return (
    <div className="gal-controls">
      {/* Not a live region: under scrub this changes on almost every
          frame, and announcing each step buries everything else. The
          sentence below is read when the counter is reached instead. */}
      <p className="gal-counter">
        <span className="gal-counter-now">{pad(activeIndex + 1)}</span>
        <span className="gal-counter-sep" aria-hidden="true">
          /
        </span>
        <span className="gal-counter-total">{pad(count)}</span>
        <span className="sr-only">
          {sentenceCase(label)} {activeIndex + 1} of {count}. The list continues sideways as
          you scroll.
        </span>
      </p>

      <div className="gal-rail" aria-hidden="true">
        <span className="gal-rail-fill" style={{ '--p': progress } as CSSProperties} />
      </div>

      <div className="gal-paging">
        <button
          type="button"
          className="btn-icon gal-page-btn"
          onClick={() => onGo(activeIndex - 1)}
          disabled={activeIndex === 0}
        >
          <span className="sr-only">Previous {label}</span>
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path
              d="M15 5l-7 7 7 7"
              stroke="currentColor"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          type="button"
          className="btn-icon gal-page-btn"
          onClick={() => onGo(activeIndex + 1)}
          disabled={activeIndex === count - 1}
        >
          <span className="sr-only">Next {label}</span>
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path
              d="M9 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
