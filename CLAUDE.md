# CLAUDE.md — Vaishnavi Kankarej Portfolio
## Primary objective

Build a polished personal portfolio for **Vaishnavi Kankarej** that follows the **same overall visual direction, composition, interaction feel, and browsing experience** as https://www.redoyanulhaque.me/ as closely as practical, while using original implementation and Vaishnavi's own content.

**The main intended change from the reference is the hero character:** replace the robot/robot animation with Vaishnavi's supplied personal AI introduction video. Keep the result professional, recruiter-friendly, responsive, and technically credible. Do not turn this into a completely different editorial layout or generic portfolio template. The reference website should guide the visual language and experience; the supplied video and Vaishnavi's verified information should personalize it.

Do not stop at a plan or mockup. Inspect the current repository and assets, implement the website in the existing project, and verify it.

## 1. Start by inspecting the project and reference

Before editing:
1. Inspect the repository tree, hidden files, README, package manifest/lockfile, entry points, components, styles, public assets, and scripts.
2. Identify the framework, package manager, current conventions, and available build/lint/test commands. Preserve the existing stack where possible.
3. Search the whole project for the supplied resume PDF, profile photo, AI introduction video, and SIH achievement photo. Discover exact filenames and extensions instead of assuming them. Inspect image thumbnails and video metadata when available.
4. Inspect the reference website in a browser if browser tooling is available. Study the first viewport and its navigation, hero composition, background/character placement, typography, spacing, section transitions, project presentation, interactions, and responsive behavior. Use the live reference, not guesses. If browser inspection is unavailable, state that limitation at the end and implement from the reference URL and this brief.
5. Do not copy source code, private assets, text, or branding from the reference. Recreate the visual pattern and interaction style with original code and Vaishnavi's own content.
6. After a short implementation plan, start making changes without waiting for approval unless a genuinely blocking issue exists.

## 2. Design goal: closely inspired by the reference

The finished page should immediately feel like a close design adaptation of the reference, with the user's own identity and video in place of the robot.

Prioritize:
- A dark, polished, futuristic developer portfolio aesthetic.
- Similar first-screen balance and visual hierarchy to the reference: concise introduction, clear role, prominent animated visual, and direct actions.
- A strong hero focal point occupying the space that the robot animation occupies in the reference. Use Vaishnavi's own video in that role.
- Similar levels of interaction and animation ambition, without unnecessary effects.
- Carefully tuned typography, spacing, content width, alignment, borders, background treatment, and hover/scroll behavior.
- A professional feel appropriate for AI/ML engineering recruitment, not a flashy gaming page or generic landing-page template.
- Responsive adaptation to desktop, laptop, tablet, and phone.

Use the reference's visual rhythm as the starting point. Do not replace the whole concept with a standard two-column résumé template unless the existing reference composition strongly calls for it. Keep the website's major structure and overall feel close to the reference, but implement all sections using Vaishnavi's information and portfolio needs.

### Color and visual language
Inspect the live reference and reproduce a close, accessible palette. Likely direction: deep charcoal/black background, high-contrast light text, restrained neon/cyan accents, thin borders, subtle glow, and smooth transitions. Do not introduce unrelated bright palettes or excessive glassmorphism. Keep body text readable and ensure contrast.

### Hero visual
- Replace the reference robot with the supplied AI intro video. The video is the main visual substitution; do not add a robot alongside it.
- Use the actual supplied video, not a generated placeholder or stock person.
- Make the video look integrated into the hero, not like a generic rectangular video player. Use a well-considered crop/frame, background blending, subtle glow or edge lighting if appropriate, and the reference's visual balance.
- Preserve the person's face, gestures, and composition; never crop off meaningful content.
- Keep the headline and CTAs visible and readable.
- Use a poster frame and a graceful fallback if video playback fails.
- If the video has speech, never autoplay sound. Default to muted autoplay only if it makes sense visually. Provide a clearly labelled user-initiated sound/play control if useful. Do not repeatedly play spoken dialogue in a way that feels intrusive.
- If the clip is a clean silent loop, muted autoplay + loop + playsInline is acceptable.
- Respect `prefers-reduced-motion`: disable autoplay/continuous movement and show the poster or a still frame.
- Use conservative loading (`preload="metadata"` or appropriate lazy loading), reserve aspect-ratio space, and prevent layout shift.
- Do not let video failure hide the hero text, navigation, or CTAs.

## 3. User information and source of truth

Use the supplied resume and local assets as the source of truth. Do not change the resume itself.

### Identity
- Name: **Vaishnavi Kankarej**
- Location: Nashik, Maharashtra, India
- Email: vaishnavikankarej07@gmail.com
- Phone: +91 7776907270
- Main Position Title: AI/ML Engineer. 
- Positioning: AI/ML Engineer / AI & Machine Learning developer; undergraduate building practical AI, ML, GenAI, NLP, and data-driven applications.
- Professional summary: Motivated undergraduate with a strong foundation in Python, Machine Learning, and Generative AI, with hands-on experience developing AI and data-driven applications. Strong problem-solving, analytical, communication, and teamwork skills, with a passion for learning emerging technologies and building practical solutions.

### External profiles
- GitHub: https://github.com/vaishnavi-k07
- LinkedIn: https://www.linkedin.com/in/vaishnavi-kankarej/
- Student Score Predictor repository: https://github.com/vaishnavi-k07/ML_project

### Education
- B.Tech in Artificial Intelligence & Data Science, K.K. Wagh Institute of Engineering Education & Research, Nashik — 2023–Present; CGPA 9.1.
- HSC, G.M.D Arts, B.W Commerce and Science College, Sinnar — 2021–2023; 82%.
- SSC, Chandak Kanya Vidyalay, Sinnar — 2021; 100%.

### Experience
**Artificial Intelligence Intern — Cognifyz Technologies | Jan–Mar 2026**
- Developed AI/ML solutions using Python for data preprocessing, modeling, and evaluation.
- Integrated AI solutions with REST APIs and backend applications.
- Technologies: Python, ML, GenAI, LLMs, RAG, Prompt Engineering, FastAPI, Git/GitHub.

### Projects
Build attractive project cards and detail views. Keep projects in one data-driven configuration file so they are easy to edit.

**1. EstateIQ — Real Estate Intelligence System | Jun–Sep 2026**
- AI-driven real-estate lead intelligence system that converts customer voice conversations into structured requirements and actionable lead insights.
- Reported 97% F1-score in extracting 7 key real-estate entities using MuRIL-based NER.
- Implemented sentiment analysis and explainable lead prioritization.
- Stack: Python, NLP, MuRIL, spaCy, DistilBERT, XGBoost, SHAP, PostgreSQL, Flask, Streamlit, Docker.
- Consider a custom visual pipeline: voice conversation → transcript/NER → sentiment and intent → explainable lead prioritization.
- Keep 97% F1-score explicitly tied to extraction of the 7 real-estate entities with MuRIL-based NER; never label it general accuracy.

**2. RAG-Based IT Troubleshooting Assistant | Oct–Dec 2025**
- Developed a RAG assistant using Gemini to provide solutions from technical documents.
- Implemented document chunking, embeddings, and ChromaDB for relevant information retrieval.
- Built a Streamlit interface with source references for grounded responses.
- Stack: Python, RAG, LangChain, Gemini API, Sentence Transformers, ChromaDB, PyMuPDF.

**3. FinTrack — Smart Expense Manager | Feb–Apr 2025**
- Database-driven expense tracker for recording and categorizing expenses.
- CRUD operations and SQL queries using MySQL.
- Structured expense tracking and budgeting insights.
- Stack: MySQL, SQL, Flask, Python, HTML, CSS.

**4. Student Score Predictor — Machine Learning Project**
- A machine-learning web application that predicts student scores from input data.
- Repository: https://github.com/vaishnavi-k07/ML_project
- Demo: https://student-score-predictor-hj4u.onrender.com/predictdata
- If repository README/code is accessible, use verified implementation details only. Do not invent metrics, dataset size, model performance, or deployment statistics.
- Show both the valid repository and demo links.

**5 and 6. Future projects**
- Reserve two future project slots in the same configuration file.
- Do not invent project names, technologies, results, or links.
- Keep these hidden until populated or use quiet “Coming soon” cards only if they fit naturally and do not make the portfolio appear incomplete.

### Skills
Present curated categories rather than fake progress bars or a word cloud. Use only these skills unless local project files verify more:
- Languages: Python, C, C++.
- AI/ML: Artificial Intelligence, Machine Learning, Deep Learning, NLP, LLMs, Generative AI, RAG.
- Data science: EDA, data cleaning, feature engineering, data validation.
- Frameworks/libraries: NumPy, Pandas, Matplotlib, scikit-learn, PyTorch, TensorFlow, Hugging Face.
- Databases: MySQL, PostgreSQL, MongoDB, stored procedures, query optimization, database design.
- Web/APIs: Django, Flask, REST APIs, HTML5, CSS3.
- Cloud/tools: AWS, CI/CD, Docker, Git, GitHub, Power BI, MS Excel.
- Project/internship technologies: MuRIL, spaCy, DistilBERT, XGBoost, SHAP, LangChain, Gemini API, Sentence Transformers, ChromaDB, PyMuPDF, FastAPI, prompt engineering.

### Certifications
- Oracle Cloud Infrastructure AI Foundations — Oracle; skills: AI, ML, GenAI, AI agents, agentic workflows.
- Data Analytics — LinkedIn Learning Community; skills: Data Analysis, Power BI.
- AIOps with IBM Z and LinuxONE - IBM 
- Data analytics Job Simulation - Deloitte 

### Achievements
- 1. Top 3 in Department
Consistently ranked among the top three students in the AI & Data Science Department through strong academic performance.
- 2. National Finalist — Smart India Hackathon (SIH)
Qualified for the Grand Finale at VVCE, Mysuru, in December 2023, competing at the national level with an innovative solution.
- 3. 3rd Prize — Defect Detection Competition
Secured third place by identifying and correcting code errors, demonstrating debugging skills and logical problem-solving.
- Use the local `SIH_final` image as the supplied achievement photograph. Inspect its actual file and dimensions. Use a lightbox/gallery if appropriate.
- Caption “Smart India Hackathon 2023 — Grand Finale” only if supported by the image or supplied resume/source material.
- Do not identify Vaishnavi's exact position in a group photo unless confirmed.

## 4. Navigation and sections

Keep the reference's navigation style as close as practical, while ensuring these exact labels are available:
1. **About Me**
2. **My Work**
3. **My Skills**
4. **Contact Me**

Include a prominent **Download Resume** action in the hero and/or header.

Recommended page content:
1. Header/nav and mobile menu.
2. Hero with name, role, one-line value proposition, intro video, and CTAs.
3. About Me, education snapshot, and internship.
4. My Work: EstateIQ, RAG Troubleshooting Assistant, FinTrack, Student Score Predictor.
5. My Skills: curated groups.
6. Experience/Education if not sufficiently represented above.
7. Certifications and achievements, including SIH photo.
8. Contact Me: email, LinkedIn, GitHub, copy-email interaction.
9. Footer and back-to-top.

Use the reference's section order and visual presentation when possible, but don't omit the content needed for a complete recruiter-facing portfolio.

## 5. Interaction and motion

Recreate the *kind* of polish and interaction seen in the reference with original code:
- Smooth scrolling and active navigation state.
- Restrained hover effects, subtle cursor response/parallax where appropriate, and scroll reveals.
- Keep main content visible if JavaScript or animation fails.
- Project cards with functional click/tap details (modal, drawer, expandable section, or detail page), keyboard support, and valid links.
- SIH photo lightbox with close button, accessible labels, and Escape-to-close.
- Copy-email button with success/failure feedback.
- Working mobile menu with keyboard focus, Escape-to-close where practical, and no overflow.
- Use `IntersectionObserver` or equivalent efficient techniques where appropriate.
- Respect `prefers-reduced-motion` and touch devices. No continuous resource-heavy animations across the entire page.
- A short intro transition is acceptable only if skippable and never blocks content.
- Do not add fake terminal output, fake stats, or fake backend features.
- If using WebGL/Three.js, lazy-load it, keep it light, and provide a still fallback. Do not add heavy 3D just to imitate the robot: the user's own video is the main replacement.

## 6. Resume and asset paths

Find the real resume file and copy it to a stable public path such as `public/Vaishnavi_Kankarej_Resume.pdf`. Do not invent a path or link to a file that does not exist. The download must work in development and production.

Find and use the supplied portrait, video, and SIH photo. Suggested stable paths, to use only after discovering actual files:
- `public/videos/vaishnavi-intro.mp4`
- `public/images/vaishnavi-poster.webp`
- `public/images/vaishnavi-profile.webp`
- `public/images/sih-final.jpg`
- `public/Vaishnavi_Kankarej_Resume.pdf`

If a suggested asset is missing, do not create a broken reference. Use a graceful fallback and report the missing file. Preserve source assets.

## 7. Engineering constraints

- Preserve the existing framework and package manager if practical.
- If starting from scratch, React + TypeScript + Vite is acceptable. Choose one styling strategy (existing Tailwind or CSS modules/global CSS) and stay consistent.
- Use reusable components and a clean data/config file for projects, skills, links, and timeline entries.
- Use semantic HTML, logical headings, meaningful alt text, accessible names, keyboard support, and visible focus indicators.
- Add page title, meta description, theme color, social preview metadata if practical, and a favicon/initials treatment if feasible.
- Optimize images/video, lazy-load below-the-fold content, and avoid unnecessary layout shifts.
- Ensure responsive layouts at phone, tablet, laptop, and wide desktop widths.
- Avoid dead buttons. Don't build a contact form that pretends to send. A mailto CTA is fine.
- Do not expose secrets, API keys, or credentials in client-side code.
- Use safe external-link attributes when opening a new tab.
- Keep the console clean and avoid unnecessary dependencies.
- Do not edit the resume content.

## 8. Acceptance checklist

Before finishing, verify:
- The overall look and first-screen composition closely follow the reference, with Vaishnavi's own video replacing the robot.
- The result remains professional and readable, not an unrelated template.
- The supplied video, portrait, SIH photo, and resume are correctly discovered and integrated.
- Video is responsive, doesn't crop the face/gesture, doesn't autoplay audio, and has a poster/fallback.
- The four required navigation labels work.
- Download Resume points to the actual resume and works.
- Project details work and Student Score Predictor includes both GitHub and demo links.
- The two future projects are configurable from one data source.
- Education, internship, skills, certifications, and achievements are accurately presented.
- SIH image has meaningful alt text and accessible enlargement if a lightbox is used.
- Copy email, mobile menu, reduced-motion behavior, and project details work.
- No broken paths, dead CTAs, placeholder text, or avoidable console errors.
- Responsive layout works at narrow phone, tablet, laptop, and wide desktop widths.
- Run available build/lint/test commands and fix relevant errors.

## 9. Final report

When done, report:
1. What was implemented.
2. Key files changed.
3. Actual asset filenames found and where they were placed.
4. The command to run locally.
5. Build/lint/test commands actually run and their real outcomes.
6. Any missing asset or remaining limitation.

Do not claim a build, test, or browser inspection was successful unless you actually performed it. **Implement the site; do not stop after a plan.**
