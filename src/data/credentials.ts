/**
 * Credentials — certifications and achievements, the single source of
 * truth for the Credentials section.
 *
 * Every title, issuer and skill below is printed on the resume. Nothing
 * is inferred: where the resume states no date, `date` is omitted and
 * the card simply does not render one.
 *
 * The one fact not taken from the resume is the SIH date, which is read
 * off the supplied photograph: the backdrop reads "Smart India
 * Hackathon 2023 — #SIH Software Edition — Grand Finale 2023 — 19th to
 * 20th December". The alt text deliberately does not identify any
 * individual in the group, which the source does not confirm.
 *
 * Certificate titles and dates are read off the supplied certificate
 * images themselves, which is why they are more specific than the
 * resume's shorter wording. Nothing is guessed: no score, credential
 * ID or course name appears here that is not printed on the scan.
 *
 * IMAGES AND LINKS ARE OPTIONAL BY DESIGN. Five entries carry an
 * `image`; the two achievements with no supplied scan do not, and no
 * entry has a verification URL yet, so those fields are absent rather
 * than pointed at a file that is not there. The section reads the
 * fields directly — adding an `image` turns on the thumbnail and its
 * lightbox, adding a `url` turns on the "View credential" link.
 * Nothing outside this file needs editing to make either switch.
 */

export type CredentialKind = 'certification' | 'achievement'

export interface CredentialImage {
  /** Base-relative; resolved through asset(). A compressed thumbnail. */
  src: string
  /** Original full-resolution file, loaded only when the lightbox opens. */
  fullSrc: string
  alt: string
  caption: string
  /**
   * Intrinsic size of the original. `src` is a proportional thumbnail
   * of it, so this is the ratio both of them reserve their box with.
   */
  width: number
  height: number
}

export interface Credential {
  id: string
  kind: CredentialKind
  title: string
  /** Awarding body, or the competition the award was given at. */
  issuer: string
  /** Omitted where neither the resume nor a supplied asset states one. */
  date?: string
  /** Skills the certificate names. Certifications only. */
  skills?: string[]
  /** Present only once a real image has been supplied. */
  image?: CredentialImage
  /** Present only once a real verification URL exists. */
  url?: string
}

export const credentials: Credential[] = [
  {
    id: 'oci-ai',
    kind: 'certification',
    title: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
    issuer: 'Oracle University',
    date: 'October 2025',
    skills: ['AI', 'ML', 'GenAI', 'AI agents', 'Agentic workflows'],
    image: {
      src: 'images/thumbs/cert-oracle.jpg',
      fullSrc: 'images/cert-oracle.png',
      alt: 'Oracle University certificate of recognition naming Vaishnavi Sunil Kankarej as an Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate, dated 16 October 2025.',
      caption: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
      width: 1195,
      height: 850,
    },
  },
  {
    id: 'ibm-aiops',
    kind: 'certification',
    title: 'AIOps with IBM Z and LinuxONE',
    issuer: 'IBM Training',
    date: 'September 2026',
    image: {
      src: 'images/thumbs/cert-ibm.jpg',
      fullSrc: 'images/cert-ibm.png',
      alt: 'IBM Training certificate of completion stating that Vaishnavi Kankarej completed the course AIOps with IBM Z and LinuxONE, dated 11 September 2026.',
      caption: 'AIOps with IBM Z and LinuxONE — IBM Training',
      width: 1201,
      height: 834,
    },
  },
  {
    id: 'data-analytics',
    kind: 'certification',
    title: 'Learning Data Analytics: 1 Foundations',
    issuer: 'LinkedIn Learning',
    date: 'August 2025',
    skills: ['Data Analysis', 'Power BI'],
    image: {
      src: 'images/thumbs/cert-linkedin.jpg',
      fullSrc: 'images/cert-linkedin.png',
      alt: 'LinkedIn Learning certificate showing the course Learning Data Analytics: 1 Foundations completed by Vaishnavi Kankarej on 4 August 2025, with Data Analytics listed as the top skill covered.',
      caption: 'Learning Data Analytics: 1 Foundations — LinkedIn Learning',
      width: 1176,
      height: 895,
    },
  },
  {
    id: 'deloitte-data-analytics',
    kind: 'certification',
    title: 'Data Analytics Job Simulation',
    issuer: 'Deloitte',
    date: 'June 2025',
    skills: ['Data Analysis', 'Forensic Technology'],
    image: {
      src: 'images/thumbs/cert-deloitte.jpg',
      fullSrc: 'images/cert-deloitte.png',
      alt: 'Deloitte certificate of completion for the Data Analytics Job Simulation completed by Vaishnavi Kankarej in June 2025, covering practical tasks in data analysis and forensic technology.',
      caption: 'Data Analytics Job Simulation — Deloitte',
      width: 1198,
      height: 808,
    },
  },
  {
    id: 'sih',
    kind: 'achievement',
    title: 'National Finalist',
    issuer: 'Smart India Hackathon (SIH)',
    date: 'December 2023',
    image: {
      src: 'images/sih-final.webp',
      fullSrc: 'images/sih-final.png',
      alt: 'Finalists and officials standing on stage with certificates and trophies in front of a Smart India Hackathon 2023 Grand Finale backdrop.',
      caption: 'Smart India Hackathon 2023 — Grand Finale',
      width: 1072,
      height: 631,
    },
  },
  {
    id: 'defect-detection',
    kind: 'achievement',
    title: '3rd Prize — Defect Detection Competition',
    issuer: 'Technovision, K. K. Wagh Institute of Engineering Education & Research',
    // Year is taken from the trophy in the photograph, which reads
    // "TECHNOVISION 2023"; the certificate itself prints no date.
    date: '2023',
    image: {
      src: 'images/thumbs/achievement-defect-detection.jpg',
      fullSrc: 'images/achievement-defect-detection.png',
      alt: 'Photograph of a Technovision certificate of achievement awarding Vaishnavi Kankarej 3rd Prize in the Defect Detection Competition, beside a gold star trophy engraved Technovision 2023, Defect Detection Competition, 3rd Prize.',
      caption: '3rd Prize — Defect Detection Competition, Technovision 2023',
      width: 1448,
      height: 1086,
    },
  },
  {
    id: 'top-3',
    kind: 'achievement',
    title: 'Top 3 Rank in Department',
    issuer: 'Artificial Intelligence & Data Science Department',
    // No date: the resume states none, and the supplied graphic
    // carries none either.
    image: {
      src: 'images/thumbs/achievement-top-3.jpg',
      fullSrc: 'images/achievement-top-3.png',
      // Described as the illustration it is. Unlike the other entries
      // this is not a scan of an awarded document, so the alt text does
      // not imply one.
      alt: 'Decorative graphic reading "Top 3 in Department — Artificial Intelligence & Data Science Department", shown with a trophy, a third-place medal and a stack of machine learning books.',
      caption: 'Top 3 Rank — Artificial Intelligence & Data Science Department',
      width: 1448,
      height: 1086,
    },
  },
]
