/**
 * Identity and contact details.
 * Source of truth: Vaishnavi_OverLeaf_resume (3).pdf (repo root).
 * Nothing here is inferred — every value appears in the resume.
 */

export interface SocialLink {
  label: string
  href: string
  handle: string
}

export const profile = {
  name: 'Vaishnavi Kankarej',
  initials: 'VK',

  /** Primary position title. */
  role: 'AI/ML Engineer',

  /** Typed through in the hero, in this order, then looped. */
  roles: ['AI/ML Engineer', 'Generative AI Engineer', 'Python Developer'],

  /** One-line value proposition for the hero. */
  tagline:
    'Transforming data into insights and ideas into intelligent applications through machine learning, NLP, and Generative AI.',

  /** Verbatim professional summary from the resume. */
  summary:
    'Motivated undergraduate with a strong foundation in Python, Machine Learning, and Generative AI, with hands-on experience developing AI and data-driven applications. Strong problem-solving, analytical, communication, and teamwork skills, with a passion for learning emerging technologies and building practical solutions.',

  location: 'Nashik, Maharashtra, India',

  /**
   * About Me, first person. Supplied copy — kept verbatim, so it states
   * no degree, institute or CGPA. The timeline in journey.ts carries
   * those facts instead.
   */
  bio: [
    "I'm Vaishnavi Kankarej, passionate about Artificial Intelligence, Machine Learning, and building intelligent solutions that address real-world challenges.",
    "With a strong foundation in programming, analytical thinking, and problem-solving, I'm driven by curiosity and a continuous desire to learn. I enjoy exploring emerging technologies, understanding complex problems, and transforming innovative ideas into practical solutions.",
    'I believe that meaningful innovation comes from curiosity, creativity, and continuous growth. My goal is to push the boundaries of AI, develop impactful technologies, and contribute to a smarter, more intelligent future.',
  ],

  /** Closing line of the About section, set apart from the paragraphs. */
  bioClosing: 'Driven by curiosity. Powered by innovation. Focused on impact.',
  email: 'vaishnavikankarej07@gmail.com',
  phone: '+91 7776907270',
  /** tel: href — digits only, no spaces. */
  phoneHref: '+917776907270',

  /** Base-relative; resolved through asset(). */
  resumePath: 'Vaishnavi_Kankarej_Resume.pdf',
  resumeFileName: 'Vaishnavi_Kankarej_Resume.pdf',
} as const

/**
 * NOTE: the GitHub URL printed in the resume PDF (github.com/vaishnavi-kankarej)
 * returns 404. The live account is vaishnavi-k07 — verified 2026-10-16 — so the
 * working URL is used here. The PDF itself is left untouched.
 */
/**
 * What I work on. Each area, and each detail under it, is drawn from
 * the resume's Technical Skills, Projects and Experience sections —
 * nothing is added beyond what those state.
 */
export interface FocusArea {
  label: string
  detail: string
}

export const focusAreas: FocusArea[] = [
  {
    label: 'Machine Learning',
    detail:
      'Data preprocessing, modeling and evaluation in Python, with scikit-learn, PyTorch and TensorFlow.',
  },
  {
    label: 'Generative AI & LLMs',
    detail:
      'RAG pipelines, prompt engineering and LLM integration — chunking, embeddings and retrieval over source documents.',
  },
  {
    label: 'Natural Language Processing',
    detail:
      'Entity extraction and sentiment analysis, including MuRIL-based NER across seven real-estate entities.',
  },
  {
    label: 'Data Science',
    detail:
      'EDA, data cleaning, feature engineering and validation, with MySQL and PostgreSQL behind the applications.',
  },
]

export const socials: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/vaishnavi-k07',
    handle: 'vaishnavi-k07',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/vaishnavi-kankarej/',
    handle: 'vaishnavi-kankarej',
  },
]

/**
 * Hero / about media. All base-relative.
 *
 * The intro clip is the hero's background: 1280x720, 8s, with a spoken
 * introduction running from about 2.9s to 6.9s. It is played muted, and
 * the hero's sound control is the only thing that ever unmutes it. The
 * poster is its exact first frame, so there is no visible swap when
 * playback starts.
 */
export const media = {
  introVideo: 'videos/intro-video-final.mp4',
  /** 16:9 — the hero reserves this ratio so nothing shifts. */
  introVideoWidth: 1280,
  introVideoHeight: 720,
  introVideoDuration: 8,
  introPoster: 'images/vaishnavi-poster.webp',
  portrait: 'images/vaishnavi-profile.webp',
} as const
