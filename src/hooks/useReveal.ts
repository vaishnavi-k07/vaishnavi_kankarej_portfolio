import { useEffect, useRef } from 'react'
import { useReducedMotion } from './useReducedMotion'

const REVEALED = 'is-revealed'

/**
 * One observer for the whole page rather than one per element. Reveals
 * are one-way, so each target is dropped the moment it fires and the
 * observer costs nothing on the way back up.
 */
let shared: IntersectionObserver | null = null

function getObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === 'undefined') return null

  shared ??= new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add(REVEALED)
        observer.unobserve(entry.target)
      }
    },
    // Fires a little before the element is fully in view, so the motion
    // reads as the page settling rather than as a delayed pop.
    { rootMargin: '0px 0px -10% 0px', threshold: 0 },
  )

  return shared
}

/**
 * Staggered scroll reveal for one block of markup.
 *
 * Attach the returned ref to a container; every descendant carrying
 * `data-reveal` is revealed as it enters the viewport. Order the
 * stagger by setting `--i` on each of those elements — the styles in
 * base.css turn it into a transition delay.
 *
 * Nothing here moves layout: the transition is opacity and transform
 * only, so the space each element occupies is reserved from first
 * paint. Under reduced motion, or with no IntersectionObserver to be
 * had, every target is revealed immediately instead.
 *
 * Targets are collected once per run. If a section can add or remove
 * them later — say a layout switch that reveals a different set — pass
 * something that changes with it as `resetKey`, or the new elements are
 * never observed and stay at opacity 0.
 */
export function useReveal<T extends HTMLElement>(resetKey?: unknown) {
  const ref = useRef<T>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const targets = root.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = reduced ? null : getObserver()

    if (!observer) {
      for (const target of targets) target.classList.add(REVEALED)
      return
    }

    for (const target of targets) observer.observe(target)
    return () => {
      for (const target of targets) observer.unobserve(target)
    }
  }, [reduced, resetKey])

  return ref
}
