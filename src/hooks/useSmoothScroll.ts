import { useEffect } from 'react'
import { startSmoothScroll } from '../lib/scroll'
import { useReducedMotion } from './useReducedMotion'

/** Starts Lenis for the lifetime of the app, unless motion is reduced. */
export function useSmoothScroll(): void {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    return startSmoothScroll()
  }, [reduced])
}
