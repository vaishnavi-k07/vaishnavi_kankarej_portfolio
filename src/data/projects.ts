/**
 * Projects — the single source of truth for the My Work gallery and
 * the project detail overlay. All copy lives here; no component writes
 * project text of its own.
 *
 * Facts come from the resume; the Student Score Predictor entry was
 * verified against the public repository on 2026-10-16. No metric,
 * dataset or result appears here that is not stated in one of those.
 *
 * LINKS ARE INTENTIONALLY EMPTY. Per the owner's instruction, no
 * repository links are published yet, so every `github` and `demo` is
 * ''. The detail overlay reads those fields directly: while a field is
 * empty it renders a disabled "Add GitHub link" control, and the moment
 * a real URL is pasted in, the same control becomes a working external
 * link. Nothing outside this file needs editing to make that switch.
 *
 * Verified URLs are parked in each entry's `verifiedLinks` comment,
 * ready to paste into the field above them.
 */

export type ProjectStatus = 'live' | 'coming-soon'

export interface Project {
  id: string
  /** Display number on the card, zero-padded. */
  index: string
  title: string
  /** Short qualifier shown under the title. */
  subtitle: string
  /** Discipline label shown on the card, e.g. 'AI / LLM'. */
  category: string
  period: string
  /** Tech stack — the card's "Tools and features" list. */
  tools: string[]
  /**
   * Banner path inside /public, base-relative. Empty means there is no
   * banner yet: the card draws its own monogram panel instead. Never
   * point this at a mock-up or a stock screenshot.
   */
  image: string
  /** One sentence, shown on the card. */
  summary: string
  /** Full paragraph, shown in the detail overlay. */
  description: string
  /** Detail bullets, shown in the overlay. */
  highlights: string[]
  /** Headline figure shown on the card — must stay precisely worded. */
  metric?: { value: string; label: string }
  /** '' renders the disabled placeholder; a URL renders a real link. */
  github: string
  demo: string
  status: ProjectStatus
}

export const projects: Project[] = [
  {
    id: 'estateiq',
    index: '01',
    title: 'EstateIQ',
    subtitle: 'Real Estate Intelligence System',
    category: 'AI / NLP',
    period: 'Jun – Sep 2026',
    tools: [
      'Python',
      'MuRIL',
      'spaCy',
      'DistilBERT',
      'XGBoost',
      'SHAP',
      'PostgreSQL',
      'FastAPI',
      'React',
      'TypeScript',
      'Docker',
    ],
    image: 'images/projects/estateiq.jpg',
    summary:
      'An AI-driven real-estate lead intelligence system that turns customer voice conversations into structured requirements and actionable lead insights.',
    description:
      'An AI-driven lead intelligence system for real estate, built to convert customer voice conversations into structured requirements and actionable lead insights. A MuRIL-based named-entity recognition model extracts seven key real-estate entities, reaching a 97% F1-score on that extraction. Sentiment analysis and explainable lead prioritization then rank what comes out, with SHAP attached so a score can be inspected rather than taken on trust.',
    highlights: [
      'Built an AI-driven real-estate lead intelligence system to convert customer voice conversations into structured requirements and actionable lead insights.',
      'Achieved 97% F1-score in extracting 7 key real-estate entities by implementing MuRIL-based NER.',
      'Implemented sentiment analysis and explainable lead prioritization.',
    ],
    metric: {
      value: '97%',
      // Precise wording matters: this is entity-extraction F1, not general accuracy.
      label: 'F1-score extracting 7 key real-estate entities (MuRIL-based NER)',
    },
    github: '',
    demo: '',
    // verifiedLinks: github.com/vaishnavi-k07/FYP_EstateIQ · github.com/vaishnavi-k07/EstateIQ
    status: 'live',
  },
  {
    id: 'rag-it-assistant',
    index: '02',
    title: 'RAG-Based IT Troubleshooting Assistant',
    subtitle: 'Retrieval-Augmented Generation',
    category: 'AI / LLM',
    period: 'Oct – Dec 2025',
    tools: [
      'Python',
      'RAG',
      'LangChain',
      'Gemini API',
      'Sentence Transformers',
      'ChromaDB',
      'PyMuPDF',
    ],
    image: 'images/projects/rag-it-assistant.jpg',
    summary:
      'A retrieval-augmented assistant that answers IT troubleshooting questions from technical documents, with source references attached to every response.',
    description:
      "A retrieval-augmented assistant that answers IT troubleshooting questions from technical documents rather than from the model's own memory. Documents are chunked and embedded into ChromaDB, and Gemini composes an answer from whatever retrieval returns. The Streamlit interface carries the source references behind every response, so an answer can always be traced back to the document it came from.",
    highlights: [
      'Developed a RAG-based assistant using Gemini to provide solutions from technical documents.',
      'Implemented document chunking, embeddings, and ChromaDB for relevant information retrieval.',
      'Built a Streamlit interface with source references for reliable responses.',
    ],
    github: '',
    demo: '',
    // verifiedLinks: none — no public repository for this project yet.
    status: 'live',
  },
  {
    id: 'student-score-predictor',
    index: '03',
    title: 'Student Score Predictor',
    subtitle: 'Machine Learning web application',
    category: 'AI / ML',
    period: 'Machine Learning project',
    tools: ['Python', 'scikit-learn', 'Pandas', 'NumPy', 'Flask', 'HTML', 'CSS'],
    image: 'images/projects/student-score-predictor.jpg',
    summary:
      "A deployed machine-learning web app that predicts a student's maths score from their background and reading and writing results.",
    description:
      "A deployed machine-learning web application that predicts a student's maths score from their background and their reading and writing results. Gender, race/ethnicity, parental level of education, lunch type, test preparation course, reading score and writing score go in; a scikit-learn preprocessing and prediction pipeline runs behind a Flask interface and returns the predicted score.",
    highlights: [
      "Predicts a student's maths score from gender, race/ethnicity, parental level of education, lunch type, test preparation course, reading score and writing score.",
      'Wraps a scikit-learn preprocessing and prediction pipeline behind a Flask web interface.',
      'Deployed as a live web application.',
    ],
    github: '',
    demo: '',
    // verifiedLinks (both returned HTTP 200 on 2026-10-16):
    //   github → https://github.com/vaishnavi-k07/ML_project
    //   demo   → https://student-score-predictor-hj4u.onrender.com/predictdata
    status: 'live',
  },
  {
    id: 'fintrack',
    index: '04',
    title: 'FinTrack',
    subtitle: 'Smart Expense Manager',
    category: 'Data / SQL',
    period: 'Feb – Apr 2025',
    tools: ['MySQL', 'SQL server', 'Flask', 'Python', 'HTML', 'CSS'],
    image: 'images/projects/fintrack.jpg',
    summary:
      'A database-driven expense manager for recording and categorizing expenses, built around SQL queries and CRUD operations.',
    description:
      'A database-driven expense manager for recording and categorizing expenses. CRUD operations and SQL queries over MySQL handle the records, and the structure that imposes is what makes the expense tracking and budgeting insights possible.',
    highlights: [
      'Developed a database-driven expense tracker for recording and categorizing expenses.',
      'Implemented CRUD operations and SQL queries using MySQL.',
      'Enabled structured expense tracking and budgeting insights.',
    ],
    github: '',
    demo: '',
    // verifiedLinks: none — the Expense_Tracker repository is currently empty (0 KB).
    status: 'live',
  },

  /* ---------------------------------------------------------------
     Reserved slots. These render nothing while status is
     'coming-soon' — flip to 'live' and fill in the real details.
     Do not invent names, technologies, results or links.
     --------------------------------------------------------------- */
  {
    id: 'future-1',
    index: '05',
    title: '',
    subtitle: '',
    category: '',
    period: '',
    tools: [],
    image: '',
    summary: '',
    description: '',
    highlights: [],
    github: '',
    demo: '',
    status: 'coming-soon',
  },
  {
    id: 'future-2',
    index: '06',
    title: '',
    subtitle: '',
    category: '',
    period: '',
    tools: [],
    image: '',
    summary: '',
    description: '',
    highlights: [],
    github: '',
    demo: '',
    status: 'coming-soon',
  },
]

/** Only these are rendered. Future slots stay out of the DOM until populated. */
export const publishedProjects = projects.filter((p) => p.status === 'live')
