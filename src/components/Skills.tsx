import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { skillGroups } from '../data'
import type { Skill, SkillGroup } from '../data'
import { skillIcons } from '../lib/skillIcons'
import type { SkillIcon } from '../lib/skillIcons'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useReveal } from '../hooks/useReveal'
import SectionTitle from './SectionTitle'
import './Skills.css'

const ALL = 'all'
const EASE = [0.16, 1, 0.3, 1] as const

/**
 * One flat list of cells drives the grid. A category heading is a cell
 * that spans the full row, a skill is a tile, and both sit as direct
 * children of the same AnimatePresence — which is what lets Framer
 * animate a filter change as one rearrangement rather than as several
 * independent lists appearing and disappearing.
 */
type Cell =
  | { kind: 'head'; key: string; group: SkillGroup }
  | { kind: 'tile'; key: string; skill: Skill }

function buildCells(groups: SkillGroup[]): Cell[] {
  return groups.flatMap((group): Cell[] => [
    { kind: 'head', key: 'head-' + group.id, group },
    ...group.items.map((skill): Cell => ({ kind: 'tile', key: skill.name, skill })),
  ])
}

/**
 * Tech Stack — an interactive icon grid over the groups in
 * src/data/skills.ts.
 *
 * Nothing here invents a skill or a number. The grid is the whole
 * display: there are no proficiency bars or percentages, because the
 * source material supports none.
 *
 * Motion is layered so the section still works without any of it. The
 * heading uses the existing CSS reveal; the tiles use Framer layout
 * animation. Under prefers-reduced-motion every duration drops to zero
 * and the layout prop comes off, so filtering swaps instantly and the
 * backdrop stops drifting — the filter itself keeps working either
 * way, since it is plain React state behind real buttons.
 */
export default function Skills() {
  const root = useReveal<HTMLElement>()
  const gridRef = useRef<HTMLUListElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const reduced = useReducedMotion()
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const inView = useInView(gridRef, { once: true, margin: '0px 0px -10% 0px' })

  const [active, setActive] = useState<string>(ALL)

  const filters = useMemo(
    () => [
      { id: ALL, label: 'All', count: skillGroups.reduce((n, g) => n + g.items.length, 0) },
      ...skillGroups.map((g) => ({ id: g.id, label: g.category, count: g.items.length })),
    ],
    [],
  )

  const shown = useMemo(
    () => (active === ALL ? skillGroups : skillGroups.filter((g) => g.id === active)),
    [active],
  )

  const cells = useMemo(() => buildCells(shown), [shown])
  const shownCount = shown.reduce((n, g) => n + g.items.length, 0)

  /**
   * Cursor parallax on the backdrop glow — desktop pointers only, and
   * never under reduced motion. The handler writes two custom
   * properties inside a rAF, so a fast pointer costs one style write
   * per frame and the compositor does the rest.
   */
  useEffect(() => {
    const section = root.current
    const glow = glowRef.current
    if (!section || !glow || reduced || !finePointer) return

    let frame = 0
    let x = 0
    let y = 0

    const apply = () => {
      frame = 0
      glow.style.setProperty('--px', x.toFixed(2) + 'px')
      glow.style.setProperty('--py', y.toFixed(2) + 'px')
    }

    const onMove = (event: PointerEvent) => {
      const box = section.getBoundingClientRect()
      // Tiny on purpose: a drift, not a parallax layer.
      x = ((event.clientX - box.left) / box.width - 0.5) * 36
      y = ((event.clientY - box.top) / box.height - 0.5) * 24
      frame ||= requestAnimationFrame(apply)
    }

    const onLeave = () => {
      x = 0
      y = 0
      frame ||= requestAnimationFrame(apply)
    }

    section.addEventListener('pointermove', onMove)
    section.addEventListener('pointerleave', onLeave)
    return () => {
      section.removeEventListener('pointermove', onMove)
      section.removeEventListener('pointerleave', onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [reduced, finePointer, root])

  const motionTransition = (index: number) => ({
    duration: reduced ? 0 : 0.45,
    // Capped, so the last tile of a long category is never left behind.
    delay: reduced ? 0 : Math.min(index * 0.018, 0.5),
    ease: EASE,
  })

  return (
    <section id="skills" className="section skills" ref={root}>
      <div className="skills-glow" aria-hidden="true" ref={glowRef} />

      <div className="container skills-inner">
        <header className="section-head">
          <p className="eyebrow" data-reveal style={{ '--i': 0 } as CSSProperties}>
            My Skills
          </p>
          <SectionTitle lead="Tech" accent="stack" revealIndex={1} />
          <p data-reveal style={{ '--i': 2 } as CSSProperties}>
            The tools and areas I have actually built with. Filter by category, or browse the
            whole stack.
          </p>
        </header>

        <div
          className="skill-filters"
          role="group"
          aria-label="Filter skills by category"
          data-reveal
          style={{ '--i': 3 } as CSSProperties}
        >
          {filters.map((filter) => {
            const isActive = filter.id === active
            return (
              <button
                key={filter.id}
                type="button"
                className="skill-pill"
                aria-pressed={isActive}
                onClick={() => setActive(filter.id)}
              >
                {isActive && (
                  <motion.span
                    className="skill-pill-bg"
                    layoutId="skill-pill-bg"
                    aria-hidden="true"
                    transition={{ duration: reduced ? 0 : 0.4, ease: EASE }}
                  />
                )}
                <span className="skill-pill-label">
                  {filter.label}
                  <span className="skill-pill-count">{filter.count}</span>
                </span>
              </button>
            )
          })}
        </div>

        <p className="sr-only" aria-live="polite">
          {active === ALL
            ? 'Showing all ' + shownCount + ' skills.'
            : 'Showing ' + shownCount + ' skills in ' + (shown[0]?.category ?? '') + '.'}
        </p>

        <motion.ul className="skill-grid" ref={gridRef} aria-label="Skills, grouped by category">
          <AnimatePresence mode="popLayout">
            {cells.map((cell, index) =>
              cell.kind === 'head' ? (
                <motion.li
                  key={cell.key}
                  className="skill-grid-head"
                  role="presentation"
                  layout={!reduced}
                  initial={{ opacity: 0, y: 14 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                  exit={{ opacity: 0, transition: { duration: reduced ? 0 : 0.18 } }}
                  transition={motionTransition(index)}
                >
                  <h3>{cell.group.category}</h3>
                  <p>{cell.group.note}</p>
                </motion.li>
              ) : (
                <motion.li
                  key={cell.key}
                  /* No tabIndex: a tile does nothing when activated, and
                     fifty of them in the tab order buries the controls
                     that do. Touch and hover still light the logo. */
                  className="skill-tile"
                  layout={!reduced}
                  initial={{ opacity: 0, y: 18 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                  exit={{ opacity: 0, scale: 0.94, transition: { duration: reduced ? 0 : 0.18 } }}
                  transition={motionTransition(index)}
                >
                  <SkillMark skill={cell.skill} />
                  <span className="skill-tile-name">{cell.skill.name}</span>
                </motion.li>
              ),
            )}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  )
}

/**
 * A brand logo where one exists, a monogram where none does. The
 * official brand hex is handed to CSS as --logo and only applied on
 * hover or focus; tiles whose brand colour would be unreadable here
 * carry no hex and reveal in the site accent instead.
 */
function SkillMark({ skill }: { skill: Skill }) {
  if (skill.icon) {
    // Annotated, so the registry union collapses to one shape: entries
    // without a brand colour are still valid SkillIcons.
    const { Icon, color }: SkillIcon = skillIcons[skill.icon]
    return (
      <span
        className="skill-tile-mark"
        aria-hidden="true"
        style={color ? ({ '--logo': color } as CSSProperties) : undefined}
      >
        <Icon />
      </span>
    )
  }

  return (
    <span className="skill-tile-mark skill-tile-mono" aria-hidden="true">
      {skill.mono ?? skill.name.slice(0, 2).toUpperCase()}
    </span>
  )
}
