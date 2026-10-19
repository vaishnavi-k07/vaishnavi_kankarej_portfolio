/**
 * Resolves a path inside /public against Vite's configured base.
 *
 * Every asset reference in the data layer is stored base-relative
 * ('videos/intro.mp4', not '/videos/intro.mp4') and passed through here,
 * so changing VITE_BASE_PATH is genuinely a one-line change — nothing
 * else in the codebase hardcodes a deploy path.
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL || '/'
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}
