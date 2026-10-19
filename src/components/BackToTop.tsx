import { scrollToTop } from '../lib/scroll'
import { useScrolled } from '../hooks/useScrolled'
import './BackToTop.css'

export default function BackToTop() {
  const visible = useScrolled(900)

  return (
    <button
      type="button"
      className="back-to-top btn-icon"
      data-visible={visible || undefined}
      onClick={scrollToTop}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <span className="sr-only">Back to top</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 19V5M5 12l7-7 7 7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
