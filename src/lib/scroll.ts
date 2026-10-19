import Lenis from 'lenis'

/**
 * Smooth scrolling.
 *
 * A single Lenis instance owns the page scroll. It is never created when
 * the visitor prefers reduced motion — in that case every helper here
 * falls back to the browser's own instant scrolling, so the same calls
 * keep working and nothing animates.
 */

let instance: Lenis | null = null

export function startSmoothScroll(): () => void {
  if (instance) return () => {}

  instance = new Lenis({
    lerp: 0.095,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.6,
  })

  let frame = requestAnimationFrame(function loop(time: number) {
    instance?.raf(time)
    frame = requestAnimationFrame(loop)
  })

  return () => {
    cancelAnimationFrame(frame)
    instance?.destroy()
    instance = null
  }
}

export function getSmoothScroll(): Lenis | null {
  return instance
}

/** Pauses/resumes page scrolling — used while the mobile menu is open. */
export function setScrollLocked(locked: boolean): void {
  if (!instance) return
  if (locked) instance.stop()
  else instance.start()
}

/**
 * Scrolls to a section. `offset` is negative to leave room for the
 * fixed header.
 */
export function scrollToTarget(target: string | HTMLElement, offset = 0): void {
  if (instance) {
    instance.scrollTo(target, { offset, duration: 1.2 })
    return
  }

  const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target
  if (!el) return

  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY + offset,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  })
}

export function scrollToTop(): void {
  if (instance) {
    instance.scrollTo(0, { duration: 1.2 })
    return
  }
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  })
}
