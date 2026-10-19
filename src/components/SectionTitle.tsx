import type { CSSProperties } from 'react'

interface SectionTitleProps {
  /** Opening words, set in low-emphasis light ink. */
  lead: string
  /** Closing/key word, set in the violet accent. */
  accent: string
  /** Stagger index for the shared scroll reveal. Omit to opt out. */
  revealIndex?: number
}

/**
 * The one section heading used across the site.
 *
 * Every major section renders this rather than a bare h2, so size,
 * weight, letter-spacing and the two-tone colour treatment are defined
 * in exactly one place (.section-title in styles/ui.css) and cannot
 * drift apart between sections.
 *
 * The split is editorial, not automatic: the caller decides which word
 * carries the accent, because "last word" is wrong as often as it is
 * right. The two halves are separate spans with a real space between
 * them, so the heading still reads as one phrase to a screen reader.
 */
export default function SectionTitle({ lead, accent, revealIndex }: SectionTitleProps) {
  const reveal =
    revealIndex === undefined
      ? {}
      : { 'data-reveal': '', style: { '--i': revealIndex } as CSSProperties }

  return (
    <h2 className="section-title" {...reveal}>
      <span className="section-title-lead">{lead}</span>{' '}
      <span className="section-title-accent">{accent}</span>
    </h2>
  )
}
