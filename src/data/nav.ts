export interface NavItem {
  label: string
  href: string
  /** Section id used for active-state tracking. */
  id: string
}

export const navItems: NavItem[] = [
  { label: 'About Me', href: '#about', id: 'about' },
  { label: 'My Work', href: '#work', id: 'work' },
  { label: 'My Skills', href: '#skills', id: 'skills' },
  { label: 'Contact Me', href: '#contact', id: 'contact' },
]

/** Every section the scroll-spy observes, in document order. */
export const sectionIds = ['home', 'about', 'work', 'skills', 'journey', 'credentials', 'contact']

const NAV_IDS = new Set(navItems.map((item) => item.id))

/**
 * Which nav item should read as current for a given section.
 *
 * Three sections have no nav entry of their own — the hero, the journey
 * and the credentials — because the four labels are fixed. Rather than
 * letting the whole nav go dark while two full sections are read, the
 * last entry already passed stays lit: Journey and Credentials both sit
 * under My Skills. Above About there is nothing to light, so the hero
 * returns '' and no link is marked.
 */
export function navIdFor(sectionId: string): string {
  const index = sectionIds.indexOf(sectionId)
  if (index < 0) return ''

  for (let i = index; i >= 0; i -= 1) {
    if (NAV_IDS.has(sectionIds[i])) return sectionIds[i]
  }
  return ''
}
