/**
 * Education and experience, verbatim from the resume.
 * Source of truth: Vaishnavi_OverLeaf_resume (3).pdf (repo root).
 *
 * Ordered oldest first, so the rail reads as a progression and finishes
 * on the internship — the strongest and most recent entry. Nothing here
 * is inferred: the resume gives no location for Cognifyz Technologies,
 * so that entry simply has none.
 */

export type TimelineType = 'education' | 'experience'

export interface TimelineEntry {
  id: string
  type: TimelineType
  title: string
  org: string
  /** Omitted where the resume does not state one. */
  location?: string
  start: string
  /** 'Present' for anything ongoing. */
  end: string
  bullets: string[]
  /** Trailing figure the resume prints beside the entry, e.g. a grade. */
  meta?: string
}

export const journey: TimelineEntry[] = [
  {
    id: 'ssc',
    type: 'education',
    title: 'Secondary School Certificate (SSC)',
    org: 'Chandak Kanya Vidyalay',
    location: 'Sinnar',
    start: '2021',
    end: '2021',
    bullets: [],
    meta: '100%',
  },
  {
    id: 'hsc',
    type: 'education',
    title: 'Higher Secondary Certificate (HSC)',
    org: 'G.M.D Arts, B.W Commerce and Science College',
    location: 'Sinnar',
    start: '2021',
    end: '2023',
    bullets: [],
    meta: '82%',
  },
  {
    id: 'btech',
    type: 'education',
    title: 'B.Tech in Artificial Intelligence & Data Science',
    org: 'K.K. Wagh Institute of Engineering Education & Research',
    location: 'Nashik',
    start: '2023',
    end: 'Present',
    bullets: [],
    meta: 'CGPA 9.1',
  },
  {
    id: 'cognifyz',
    type: 'experience',
    title: 'Artificial Intelligence Intern',
    org: 'Cognifyz Technologies',
    start: 'Jan 2026',
    end: 'Mar 2026',
    bullets: [
      'Developed AI/ML solutions using Python for data preprocessing, modeling, and evaluation.',
      'Integrated AI solutions with REST APIs and backend applications.',
      'Technologies: Python, ML, GenAI, LLMs, RAG, Prompt Engineering, FastAPI, Git/GitHub.',
    ],
  },
]
