import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently crossing the middle of the
 * viewport. The observer uses a zero-height band at 50% so exactly one
 * section is active at a time, and costs nothing per scroll frame.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const visible = new Set<string>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }

        const next = ids.find((id) => visible.has(id))
        if (next) setActive(next)
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
    )

    for (const el of elements) observer.observe(el)
    return () => observer.disconnect()
  }, [ids])

  return active
}
