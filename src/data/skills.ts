import type { SkillIconKey } from '../lib/skillIcons'

/**
 * Skills — the single source of truth for the Tech Stack grid.
 *
 * Six categories, in the order the grid shows them. The filter pills
 * and their counts are derived from this array at render time, so
 * adding or removing an entry here is the whole change.
 *
 * There are no proficiency figures anywhere: nothing in the source
 * material supports a number.
 *
 * `icon` is a key into src/lib/skillIcons.tsx. A skill with no brand
 * logo in Simple Icons carries `mono` instead and is drawn as a
 * monogram tile — Matplotlib, Seaborn, XGBoost, NLTK, AWS, Power BI
 * and Excel have no mark in the set, and no logo is ever borrowed from
 * an unrelated brand to fill the gap.
 */

export interface Skill {
  name: string
  /** Brand logo, where the skill has one. */
  icon?: SkillIconKey
  /** Monogram drawn when there is no logo. 2–4 characters. */
  mono?: string
}

export interface SkillGroup {
  id: string
  category: string
  /** Short line under the category heading. */
  note: string
  items: Skill[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    category: 'Programming Languages',
    note: 'Core programming foundation',
    items: [
      { name: 'Python', icon: 'python' },
      { name: 'C', icon: 'c' },
      { name: 'C++', icon: 'cpp' },
      { name: 'Java', icon: 'java' },
    ],
  },
  {
    id: 'ml-ds',
    category: 'Machine Learning & Data Science',
    note: 'Modelling, analysis and visualisation',
    items: [
      { name: 'NumPy', icon: 'numpy' },
      { name: 'Pandas', icon: 'pandas' },
      { name: 'Scikit-learn', icon: 'sklearn' },
      { name: 'Matplotlib', mono: 'MPL' },
      { name: 'Seaborn', mono: 'SNS' },
      { name: 'XGBoost', mono: 'XGB' },
    ],
  },
  {
    id: 'dl-nlp',
    category: 'Deep Learning & NLP',
    note: 'Neural networks and language models',
    items: [
      { name: 'PyTorch', icon: 'pytorch' },
      { name: 'TensorFlow', icon: 'tensorflow' },
      { name: 'Hugging Face Transformers', icon: 'huggingface' },
      { name: 'NLTK', mono: 'NLTK' },
      { name: 'spaCy', icon: 'spacy' },
      { name: 'MuRIL', mono: 'MUR' },
      { name: 'DistilBERT', mono: 'DB' },
    ],
  },
  {
    id: 'genai',
    category: 'Generative AI & LLM Engineering',
    note: 'Retrieval, prompting and embeddings',
    items: [
      { name: 'Generative AI', mono: 'GAI' },
      { name: 'LLMs', mono: 'LLM' },
      { name: 'RAG', mono: 'RAG' },
      { name: 'Prompt Engineering', mono: 'PE' },
      { name: 'LangChain', icon: 'langchain' },
      { name: 'Gemini API', icon: 'gemini' },
      { name: 'Sentence Transformers', mono: 'ST' },
      { name: 'ChromaDB', mono: 'CDB' },
    ],
  },
  {
    id: 'backend',
    category: 'Backend & Databases',
    note: 'Serving models and storing data',
    items: [
      { name: 'FastAPI', icon: 'fastapi' },
      { name: 'Flask', icon: 'flask' },
      { name: 'Django', icon: 'django' },
      { name: 'REST APIs', mono: 'API' },
      { name: 'MySQL', icon: 'mysql' },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'MongoDB', icon: 'mongodb' },
    ],
  },
  {
    id: 'tools',
    category: 'Tools & Deployment',
    note: 'Shipping, versioning and reporting',
    items: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'Docker', icon: 'docker' },
      { name: 'AWS', mono: 'AWS' },
      { name: 'CI/CD', mono: 'CI' },
      { name: 'Power BI', mono: 'BI' },
      { name: 'Excel', mono: 'XL' },
    ],
  },
]
