import type { CSSProperties } from 'react'
import { focusAreas, profile } from '../data'
import { useReveal } from '../hooks/useReveal'
import SectionTitle from './SectionTitle'
import './About.css'

/**
 * About Me: the bio on the left, what I work on beside it.
 *
 * Every word comes from src/data/profile.ts — nothing is written into
 * this file.
 *
 * The two columns are top-aligned, so their reveals start together
 * rather than one trailing the other: each runs its own stagger from
 * COLUMN_BEAT and cascades down independently. Stacked below 1024px
 * that still reads correctly, since each block reveals as it reaches
 * the viewport and the delays are only 70ms apart.
 */

/** Beat both columns begin on, after the eyebrow and heading. */
const COLUMN_BEAT = 2

export default function About() {
  const root = useReveal<HTMLElement>()

  const beat = (offset: number) => ({ '--i': COLUMN_BEAT + offset }) as CSSProperties

  return (
    <section id="about" className="section about" ref={root}>
      <div className="container">
        <header className="section-head">
          <p className="eyebrow" data-reveal style={{ '--i': 0 } as CSSProperties}>
            About Me
          </p>
          <SectionTitle lead="Who I" accent="am" revealIndex={1} />
        </header>

        <div className="about-grid">
          <div className="about-bio">
            {profile.bio.map((paragraph, index) => (
              <p
                key={paragraph.slice(0, 32)}
                className="about-para"
                data-reveal
                style={beat(index)}
              >
                {paragraph}
              </p>
            ))}

            <p className="about-closing" data-reveal style={beat(profile.bio.length)}>
              {profile.bioClosing}
            </p>
          </div>

          <div className="about-work">
            <h3 className="about-subhead" data-reveal style={beat(0)}>
              What I work on
            </h3>

            <ul className="about-focus">
              {focusAreas.map((area, index) => (
                <li key={area.label} data-reveal style={beat(1 + index)}>
                  <span className="about-focus-label">{area.label}</span>
                  <span className="about-focus-detail">{area.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
