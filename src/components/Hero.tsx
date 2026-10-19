import { useEffect, useRef } from 'react'
import { profile } from '../data'
import { asset } from '../lib/asset'
import { scrollToTarget } from '../lib/scroll'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useTypedLoop } from '../hooks/useTypewriter'
import HeroVideo from './HeroVideo'
import './Hero.css'

export default function Hero() {
  const reduced = useReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const nameRef = useRef<HTMLHeadingElement>(null)

  /* ---- gentle cursor drift on the name, desktop only ---- */
  useEffect(() => {
    const name = nameRef.current
    if (!name || reduced || !isDesktop) return
    if (!window.matchMedia('(hover: hover)').matches) return

    let raf = 0

    const onMove = (event: PointerEvent) => {
      const x = event.clientX / window.innerWidth - 0.5
      const y = event.clientY / window.innerHeight - 0.5

      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        name.style.setProperty('--nx', `${(x * 8).toFixed(2)}px`)
        name.style.setProperty('--ny', `${(y * 5).toFixed(2)}px`)
      })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
    }
  }, [reduced, isDesktop])

  const goTo = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
    event.preventDefault()
    const header = document.querySelector<HTMLElement>('.header')
    scrollToTarget(href, -((header?.offsetHeight ?? 72) + 8))
    if (history.replaceState) history.replaceState(null, '', href)
  }

  return (
    <section id="home" className="hero">
      {/* The introduction clip, full-bleed behind everything below. */}
      <HeroVideo />

      <div className="hero-inner">
        {/* All written content lives here, over the empty left side of
            the frame — never across her or the laptop. */}
        <div className="hero-copy">
          <p className="hero-pill hero-reveal" style={{ '--d': '0.1s' } as React.CSSProperties}>
            <span className="hero-pill-dot" aria-hidden="true" />
            {profile.location}
          </p>

          <h1 className="hero-name" ref={nameRef}>
            <span
              className="hero-greeting hero-reveal"
              style={{ '--d': '0.2s' } as React.CSSProperties}
            >
              Hello, I&rsquo;m
            </span>
            {/* The name in full, for assistive technology and for search
                engines — the typed copy below it is decorative. */}
            <span className="sr-only">{profile.name}</span>
            <RevealedName name={profile.name} animate={!reduced} />
          </h1>

          <p className="hero-role hero-reveal" style={{ '--d': '0.68s' } as React.CSSProperties}>
            <span className="sr-only">{profile.roles.join(', ')}</span>
            <RoleTypewriter roles={profile.roles} animate={!reduced} />
          </p>

          <p className="hero-tagline hero-reveal" style={{ '--d': '0.78s' } as React.CSSProperties}>
            {profile.tagline}
          </p>

          <div className="hero-ctas hero-reveal" style={{ '--d': '0.88s' } as React.CSSProperties}>
            <a
              className="btn btn-primary"
              href={asset(profile.resumePath)}
              download={profile.resumeFileName}
            >
              Download Resume
              <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
                <path
                  d="M12 4v12m0 0l-5-5m5 5l5-5M4 20h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <a className="btn" href="#work" onClick={(event) => goTo(event, '#work')}>
              View My Work
            </a>
          </div>
        </div>
      </div>

      <a className="hero-scroll" href="#about" onClick={(event) => goTo(event, '#about')}>
        <span>Scroll</span>
        <span className="hero-scroll-line" aria-hidden="true" />
      </a>
    </section>
  )
}

/** The typing caret. Decorative, so it is never in the accessibility tree. */
function Caret() {
  return <span className="type-caret" aria-hidden="true" />
}

/**
 * The name, revealed a letter at a time: each letter fades up from
 * slightly below, sharpening out of a small blur, on a short stagger
 * that runs straight through "Vaishnavi" into "Kankarej". The whole
 * name has landed inside a second.
 *
 * Hidden from assistive technology — the sr-only name beside it is what
 * gets announced, in full and at once. The letters hold their final
 * boxes from the first frame, opacity and transform being all that
 * changes, so nothing below the name ever moves.
 */
function RevealedName({ name, animate }: { name: string; animate: boolean }) {
  const [first, ...rest] = name.split(' ')
  const last = rest.join(' ')

  if (!animate) {
    return (
      <>
        <span className="hero-name-line" aria-hidden="true">
          {first}
        </span>
        <span className="hero-name-line hero-name-accent" aria-hidden="true">
          {last}
        </span>
      </>
    )
  }

  return (
    <>
      <span className="hero-name-line is-revealing" aria-hidden="true">
        <Letters text={first} />
      </span>
      {/* The stagger carries on where the first line left off, so the
          two lines read as one run rather than as two. */}
      <span className="hero-name-line hero-name-accent is-revealing" aria-hidden="true">
        <Letters text={last} offset={first.length} />
      </span>
    </>
  )
}

/**
 * One span per letter, each carrying its place in the stagger as `--i`.
 * A space becomes a non-breaking one so it keeps its width while the
 * letters around it are still transparent.
 */
function Letters({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <>
      {[...text].map((character, index) => (
        <span
          key={`${index}-${character}`}
          className="hero-name-letter"
          style={{ '--i': offset + index } as React.CSSProperties}
        >
          {character === ' ' ? '\u00A0' : character}
        </span>
      ))}
    </>
  )
}

/**
 * The role line: types a title, holds it, deletes it and moves to the
 * next, looping back to the first. Hidden from assistive technology —
 * the sr-only list beside it names all three at once, so the cycle is
 * never read out as it changes.
 */
function RoleTypewriter({ roles, animate }: { roles: readonly string[]; animate: boolean }) {
  const text = useTypedLoop(roles, { animate, startDelay: 1200 })
  const longest = roles.reduce((a, b) => (a.length >= b.length ? a : b), '')

  return (
    <span className="role-rotator" aria-hidden="true">
      {/* Reserves the width of the longest title so nothing reflows. */}
      <span className="role-sizer">{longest}</span>
      <span className="role-item">
        {text}
        {animate && <Caret />}
      </span>
    </span>
  )
}
