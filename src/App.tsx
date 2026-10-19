import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Work from './components/Work'
import Skills from './components/Skills'
import Journey from './components/Journey'
import Credentials from './components/Credentials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import { sectionIds } from './data'
import { useActiveSection } from './hooks/useActiveSection'
import { useSmoothScroll } from './hooks/useSmoothScroll'

export default function App() {
  useSmoothScroll()
  const activeId = useActiveSection(sectionIds)

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Header activeId={activeId} />

      <main id="main">
        <Hero />

        <About />

        <Work />

        <Skills />

        <Journey />

        <Credentials />

        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  )
}
