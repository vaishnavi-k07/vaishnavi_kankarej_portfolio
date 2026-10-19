import { profile } from '../data'
import type { Project } from '../data'
import { asset } from '../lib/asset'
import './ProjectVisual.css'

interface ProjectVisualProps {
  project: Project
}

/**
 * The banner for a project — the same panel on the card and in the
 * detail overlay, so a project never looks like two different things.
 *
 * With a path in `image` it draws the banner; without one it draws the
 * monogram panel instead: the initials, the index and a wash of the
 * accent. Banners are wide graphics whose titles and side panels run to
 * the edge, so they are fitted rather than cropped — the letterboxing
 * sits on the sunken background and reads as a frame.
 */
export default function ProjectVisual({ project }: ProjectVisualProps) {
  if (!project.image) {
    return (
      <div className="pv pv-monogram" aria-hidden="true">
        <span className="pv-monogram-mark">{profile.initials}</span>
        <span className="pv-monogram-index">{project.index}</span>
      </div>
    )
  }

  return (
    <div className="pv">
      <img src={asset(project.image)} alt="" loading="lazy" decoding="async" />
    </div>
  )
}
