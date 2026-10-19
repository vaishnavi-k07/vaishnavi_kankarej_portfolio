import type { CSSProperties } from 'react'
import { journey } from '../data'
import type { TimelineEntry } from '../data'
import { useReveal } from '../hooks/useReveal'
import SectionTitle from './SectionTitle'
import './Journey.css'

/**
 * The education and experience rail, rendered from src/data/journey.ts
 * in the order that file sets — oldest first, finishing on the
 * internship.
 *
 * An ordered list, because the sequence is the point: assistive
 * technology announces it as "list, 4 items" and reads each entry in
 * turn. The rail and its node dots are drawn by the stylesheet and are
 * decorative, so nothing structural depends on them.
 */
export default function Journey() {
  const root = useReveal<HTMLElement>()

  return (
    <section id="journey" className="section journey" ref={root}>
      <div className="container">
        <header className="section-head">
          <p className="eyebrow" data-reveal style={{ '--i': 0 } as CSSProperties}>
            Experience &amp; Education
          </p>
          <SectionTitle lead="My" accent="journey" revealIndex={1} />
        </header>

        <ol className="timeline">
          {journey.map((entry, index) => (
            <li
              key={entry.id}
              className="timeline-item"
              data-type={entry.type}
              data-reveal
              style={{ '--i': 2 + index } as CSSProperties}
            >
              <span className="timeline-node" aria-hidden="true">
                <TypeIcon type={entry.type} />
              </span>

              <div className="timeline-body">
                <p className="timeline-period">
                  <PeriodText entry={entry} />
                </p>

                <h3 className="timeline-title">{entry.title}</h3>

                <p className="timeline-org">
                  {entry.org}
                  {entry.location && (
                    <>
                      <span className="timeline-dot" aria-hidden="true">
                        &middot;
                      </span>
                      {entry.location}
                    </>
                  )}
                </p>

                {entry.meta && (
                  <p className="timeline-meta">
                    <span className="chip">{entry.meta}</span>
                  </p>
                )}

                {entry.bullets.length > 0 && (
                  <ul className="timeline-points">
                    {entry.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/**
 * A single year where the resume prints one, a range otherwise. The
 * visible dash is decorative; the full range is spelled out for screen
 * readers so "2021 – 2023" is never announced as a subtraction.
 */
function PeriodText({ entry }: { entry: TimelineEntry }) {
  if (entry.start === entry.end) return <>{entry.start}</>

  return (
    <>
      <span aria-hidden="true">
        {entry.start} &ndash; {entry.end}
      </span>
      <span className="sr-only">
        {entry.start} to {entry.end}
      </span>
    </>
  )
}

/** Decorative: the entry's type is already clear from its content. */
function TypeIcon({ type }: { type: TimelineEntry['type'] }) {
  if (type === 'education') {
    return (
      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
        <path
          d="M12 4 2 9l10 5 10-5-10-5zM5 11.5V16c0 1.7 3.1 3 7 3s7-1.3 7-3v-4.5"
          stroke="currentColor"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path
        d="M3 8h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8zM9 8V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
