import { useEffect, useId, useRef } from 'react'
import type { CredentialImage } from '../data'
import { asset } from '../lib/asset'
import { setScrollLocked } from '../lib/scroll'
import './Lightbox.css'

interface LightboxProps {
  image: CredentialImage
  onClose: () => void
}

/**
 * Full-size image overlay.
 *
 * Escape, the close button and the backdrop all dismiss it; Tab stays
 * inside while it is open, matching ProjectModal and the mobile menu.
 * The caller restores focus to the thumbnail that opened it.
 *
 * The grid shows a compressed WebP; only here is the full-resolution
 * original requested, so the page never pays for it until asked.
 */
export default function Lightbox({ image, onClose }: LightboxProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const captionId = useId()

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
    <div className="lb" role="dialog" aria-modal="true" aria-labelledby={captionId}>
      <button
        type="button"
        className="lb-scrim"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
      />

      <div className="lb-panel" ref={panelRef}>
        <button type="button" className="lb-close" onClick={onClose} ref={closeRef}>
          <span className="sr-only">Close image</span>
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <figure className="lb-figure">
          <img
            className="lb-image"
            src={asset(image.fullSrc)}
            alt={image.alt}
            width={image.width}
            height={image.height}
          />
          <figcaption className="lb-caption" id={captionId}>
            {image.caption}
          </figcaption>
        </figure>
      </div>
    </div>
  )
}
