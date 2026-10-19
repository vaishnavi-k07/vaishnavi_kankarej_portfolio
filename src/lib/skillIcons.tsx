import type { IconType } from 'react-icons'
import {
  SiC,
  SiCplusplus,
  SiDjango,
  SiDocker,
  SiFastapi,
  SiFlask,
  SiGit,
  SiGithub,
  SiGooglegemini,
  SiHuggingface,
  SiLangchain,
  SiMongodb,
  SiMysql,
  SiNumpy,
  SiOpenjdk,
  SiPandas,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiScikitlearn,
  SiSpacy,
  SiTensorflow,
} from 'react-icons/si'

/**
 * Brand logos for the skill grid.
 *
 * Only skills with a genuine Simple Icons logo appear here. Everything
 * else — Machine Learning, RAG, Query Optimization and the rest — has
 * no logo to use and is drawn as a monogram tile instead; see the
 * `mono` field in src/data/skills.ts. Nothing is substituted: Matplotlib
 * does not borrow the Plotly mark, and no logo stands in for a concept.
 *
 * `color` is the brand's official hex, revealed on hover. It is omitted
 * where that hex is too dark to read on this background (Pandas #150458,
 * Django #092E20, GitHub #181717, LangChain #1C3C3C) or where the brand
 * mark is plain black; those tiles reveal in the site accent instead,
 * rather than in a colour the brand does not use.
 */

export interface SkillIcon {
  Icon: IconType
  color?: string
}

export const skillIcons = {
  python: { Icon: SiPython, color: '#3776AB' },
  c: { Icon: SiC, color: '#A8B9CC' },
  cpp: { Icon: SiCplusplus, color: '#00599C' },
  java: { Icon: SiOpenjdk, color: '#437291' },

  pytorch: { Icon: SiPytorch, color: '#EE4C2C' },
  tensorflow: { Icon: SiTensorflow, color: '#FF6F00' },
  sklearn: { Icon: SiScikitlearn, color: '#F7931E' },

  huggingface: { Icon: SiHuggingface, color: '#FFD21E' },
  langchain: { Icon: SiLangchain },
  gemini: { Icon: SiGooglegemini, color: '#8E75B2' },
  spacy: { Icon: SiSpacy, color: '#09A3D5' },

  numpy: { Icon: SiNumpy, color: '#4DABCF' },
  pandas: { Icon: SiPandas },
  mysql: { Icon: SiMysql, color: '#4479A1' },
  postgresql: { Icon: SiPostgresql, color: '#4169E1' },
  mongodb: { Icon: SiMongodb, color: '#47A248' },
  django: { Icon: SiDjango },
  flask: { Icon: SiFlask },
  fastapi: { Icon: SiFastapi, color: '#009688' },

  docker: { Icon: SiDocker, color: '#2496ED' },
  git: { Icon: SiGit, color: '#F05032' },
  github: { Icon: SiGithub },
} satisfies Record<string, SkillIcon>

export type SkillIconKey = keyof typeof skillIcons
