import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { getSmoothScroll } from '../lib/scroll'

interface Options {
  /** Number of cards; the snap steps are derived from it. */
  count: number
  /** False disables the whole thing and leaves the DOM in normal flow. */
  enabled: boolean
}

interface Gallery {
  sectionRef: React.RefObject<HTMLElement | null>
  trackRef: React.RefObject<HTMLUListElement | null>
  /** 0–1 along the pinned run; drives the progress rail. */
  progress: number
  /** Index of the card currently in front. */
  activeIndex: number
  /** Scrolls to a card. No-op until the ScrollTrigger exists. */
  goTo: (index: number) => void
  /** True once the pin is actually live, so the UI can commit to it. */
  pinned: boolean
}

/**
 * Fraction of the pinned run spent holding before the track moves.
 *
 * The section pins at top:top, so the heading and the whole first card
 * are on screen and still the moment it locks. Nothing slides sideways
 * until this much of the run has been scrolled through, which is what
 * stops the first panel being cut off mid-read.
 */
const LEAD_IN = 0.22

/** Same idea at the far end: the last card is fully shown, then held. */
const LEAD_OUT = 0.14

/**
 * Pins the section and runs the card track along X as the page is
 * scrolled, using GSAP ScrollTrigger over the existing Lenis scroll.
 *
 * The run is a scrubbed timeline in three parts — hold, travel, hold —
 * rather than a bare tween, so the first and last cards are each read
 * in full before and after the sideways movement. The scroll distance
 * is padded by the same proportions, so a card still costs about one
 * card's worth of scrolling.
 *
 * GSAP is imported dynamically and only when `enabled` is true, so it
 * stays out of the initial bundle and is never fetched at all on
 * phones, on touch devices, or under reduced motion — the cases that
 * fall back to a plain vertical grid.
 *
 * The pin has a finite end, so once the last card is through, the page
 * carries on scrolling normally. The visitor is never held.
 */
export function useHorizontalGallery({ count, enabled }: Options): Gallery {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)
  /** Set by the effect; `goTo` reads it without re-subscribing. */
  const triggerRef = useRef<{ start: number; end: number } | null>(null)

  const [progress, setProgress] = useState(0)
  const [pinned, setPinned] = useState(false)

  /* Timeline seconds are arbitrary; only their ratio matters under
     scrub. Travel is 1, so the holds read directly as fractions. */
  const TOTAL = LEAD_IN + 1 + LEAD_OUT

  /**
   * Where each card sits along the whole run, holds included. Derived
   * rather than stored, and used for three things that must agree: the
   * snap targets, the counter, and where an arrow scrolls to.
   */
  const stops = useMemo(
    () =>
      count < 2
        ? [0]
        : Array.from({ length: count }, (_, i) => (LEAD_IN + i / (count - 1)) / TOTAL),
    [count, TOTAL],
  )

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!enabled || !section || !track || count < 2) return

    let cleanup: (() => void) | undefined
    let cancelled = false

    void (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (cancelled) return

      gsap.registerPlugin(ScrollTrigger)

      /* Lenis drives the scroll position, so ScrollTrigger has to be
         told when it moves — otherwise the pin lags the page. */
      const lenis = getSmoothScroll()
      const onLenisScroll = () => ScrollTrigger.update()
      lenis?.on('scroll', onLenisScroll)

      /** How far the track has to travel to show its last card. */
      const distance = () => Math.max(0, track.scrollWidth - section.clientWidth)

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          // Padded by the two holds, so a card still costs roughly one
          // card's worth of scrolling despite the pauses at each end.
          end: () => `+=${Math.round(distance() * TOTAL)}`,
          pin: true,
          scrub: 1,
          // The holds are snap targets too, so the run can settle with
          // the first or last card squarely on screen.
          snap: {
            snapTo: [0, ...stops, 1],
            duration: { min: 0.15, max: 0.4 },
            delay: 0.04,
            ease: 'power1.inOut',
          },
          invalidateOnRefresh: true,
          onUpdate: (self) => setProgress(self.progress),
          onRefresh: (self) => {
            triggerRef.current = { start: self.start, end: self.end }
          },
        },
      })

      timeline
        // Hold: pinned, heading and card 01 fully readable, nothing moves.
        .to(track, { x: 0, duration: LEAD_IN })
        .to(track, { x: () => -distance(), ease: 'none', duration: 1 })
        // Hold: the last card is fully revealed before the pin releases.
        .to(track, { x: () => -distance(), duration: LEAD_OUT })

      const trigger = timeline.scrollTrigger
      if (trigger) triggerRef.current = { start: trigger.start, end: trigger.end }
      setPinned(true)

      cleanup = () => {
        lenis?.off('scroll', onLenisScroll)
        trigger?.kill()
        timeline.kill()
        triggerRef.current = null
        setPinned(false)
        setProgress(0)
      }
    })()

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [enabled, count, stops, TOTAL])

  const goTo = useCallback(
    (index: number) => {
      const bounds = triggerRef.current
      if (!bounds || count < 2) return

      const clamped = Math.min(Math.max(index, 0), count - 1)
      // Through the stops, so an arrow lands on the card itself rather
      // than somewhere inside one of the holds.
      const target = bounds.start + (bounds.end - bounds.start) * stops[clamped]

      const lenis = getSmoothScroll()
      if (lenis) lenis.scrollTo(target, { duration: 0.8 })
      else window.scrollTo({ top: target, behavior: 'smooth' })
    },
    [count, stops],
  )

  /* Nearest stop, so the counter names the card actually in front even
     while the run is sitting in one of the holds. */
  const activeIndex = stops.reduce(
    (best, stop, i) => (Math.abs(stop - progress) < Math.abs(stops[best] - progress) ? i : best),
    0,
  )

  return { sectionRef, trackRef, progress, activeIndex, goTo, pinned }
}
