import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { media } from '../data'
import { asset } from '../lib/asset'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useReducedMotion } from '../hooks/useReducedMotion'
import './HeroVideo.css'

/**
 * The hero's background layer: the introduction clip, full-bleed behind
 * the copy. The clip's own room is the same charcoal as --ink, so there
 * is no frame, border or box anywhere in this chain — it simply becomes
 * the page.
 *
 * Behaviour contract:
 *  - landscape viewports: muted autoplay + loop, paused whenever the
 *    hero is off screen or the tab is hidden
 *  - phones, upright tablets and reduced motion: the poster frame only,
 *    never autoplay, and the file is never fetched
 *  - the clip carries about four seconds of spoken introduction, so
 *    sound is never started by the page. The control below the header
 *    starts it, and it plays through exactly once — from the top, so
 *    the introduction is heard in full — before the silent loop
 *    resumes. Scrolling the hero away returns it to silence too, so
 *    speech never follows the visitor down the page.
 *  - the source is attached after first paint, so the poster is what
 *    renders immediately and the clip never blocks the hero
 *  - if playback fails, the poster and --ink keep the hero intact
 */
export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const hostRef = useRef<HTMLDivElement>(null)

  const reduced = useReducedMotion()
  /*
   * The same query the stylesheet uses for the landscape composition.
   * Anywhere else — phones, a tablet held upright, a tall narrow window
   * — the frame would have to be cropped past the point where she and
   * the copy stop fitting side by side, so the still is used instead
   * and nothing is downloaded.
   */
  const isCinematic = useMediaQuery('(min-width: 768px) and (min-aspect-ratio: 5 / 4)')
  const mayPlay = !reduced && isCinematic

  /** Source is attached only once the page has painted. */
  const [armed, setArmed] = useState(false)
  const [failed, setFailed] = useState(false)
  const [soundOn, setSoundOn] = useState(false)

  const posterUrl = asset(media.introPoster)
  const videoUrl = asset(media.introVideo)
  const hasVideo = mayPlay && !failed

  /*
   * `muted` and `loop` are rendered from soundOn, so each of these
   * helpers sets the element and the state together. React then
   * re-renders to exactly the values already on the node, and the
   * property and the prop never disagree.
   */
  const silence = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.loop = true
    setSoundOn(false)
  }, [])

  /* ---- attach the source after first paint ---- */
  useEffect(() => {
    if (!mayPlay) return

    type IdleWindow = Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
      cancelIdleCallback?: (handle: number) => void
    }
    const w = window as IdleWindow

    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setArmed(true), { timeout: 1200 })
      return () => w.cancelIdleCallback?.(id)
    }

    const id = window.setTimeout(() => setArmed(true), 200)
    return () => clearTimeout(id)
  }, [mayPlay])

  /* ---- play only while the hero is actually on screen ---- */
  useEffect(() => {
    const host = hostRef.current
    const video = videoRef.current
    // No <video> is rendered unless mayPlay, so there is nothing to
    // drive in the other case.
    if (!host || !video || !mayPlay) return

    let inView = true
    let pageVisible = !document.hidden

    const sync = () => {
      if (inView && pageVisible) {
        // A refused autoplay simply leaves the poster showing.
        if (video.paused) void video.play().catch(() => undefined)
        return
      }
      // Out of sight: never leave the introduction talking to an empty
      // screen, and never resume it mid-sentence later.
      if (soundOn) silence()
      if (!video.paused) video.pause()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        sync()
      },
      { threshold: 0 },
    )
    observer.observe(host)

    const onVisibility = () => {
      pageVisible = !document.hidden
      sync()
    }
    document.addEventListener('visibilitychange', onVisibility)

    sync()

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [mayPlay, armed, soundOn, silence])

  /* ---- one pass with sound, then back to the silent loop ---- */
  useEffect(() => {
    const video = videoRef.current
    if (!video || !hasVideo) return

    const onEnded = () => {
      if (!soundOn) return
      silence()
      void video.play().catch(() => undefined)
    }

    video.addEventListener('ended', onEnded)
    return () => video.removeEventListener('ended', onEnded)
  }, [hasVideo, soundOn, silence])

  const toggleSound = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    if (soundOn) {
      silence()
      return
    }

    // Rewound first, so the introduction is heard from its opening word
    // rather than wherever the silent loop had got to. Looping is off
    // for this pass — the `ended` handler gives it back to silence.
    video.muted = false
    video.loop = false
    video.currentTime = 0
    setSoundOn(true)

    // Called straight from the click, so the gesture still counts.
    void video.play().catch(() => {
      video.muted = true
      video.loop = true
      setSoundOn(false)
    })
  }, [soundOn, silence])

  return (
    <>
      {/*
       * Decorative: the hero's heading, role, tagline and calls to
       * action already carry everything this clip says, so it is hidden
       * from assistive technology rather than repeating all of it.
       *
       * --poster hands the still to the stylesheet, which paints it on
       * a layer of its own underneath the clip. That still is the
       * fallback the moment the <video> is absent — on phones, under
       * reduced motion, or after a load error.
       */}
      <div
        className="hero-backdrop"
        ref={hostRef}
        aria-hidden="true"
        style={{ '--poster': `url(${posterUrl})` } as CSSProperties}
      >
        {hasVideo && (
          <video
            ref={videoRef}
            className="hero-backdrop-video"
            width={media.introVideoWidth}
            height={media.introVideoHeight}
            poster={posterUrl}
            preload="metadata"
            muted={!soundOn}
            loop={!soundOn}
            autoPlay
            playsInline
            disablePictureInPicture
            onError={() => setFailed(true)}
            src={armed ? videoUrl : undefined}
          />
        )}

        <div className="hero-scrim" />
      </div>

      {/* A sibling of the backdrop, never a child: inside that
          aria-hidden subtree the control would be unreachable. */}
      {hasVideo && (
        <button
          type="button"
          className="hero-sound"
          onClick={toggleSound}
          /*
           * The label says what the next press will do, so there is no
           * aria-pressed as well: together they announce as "mute the
           * introduction, pressed", which reads as a contradiction.
           * data-on carries the state to the stylesheet instead.
           */
          data-on={soundOn ? '' : undefined}
          title={soundOn ? 'Mute the introduction' : 'Hear the introduction'}
        >
          <span className="sr-only">
            {soundOn ? 'Mute the video introduction' : 'Play the video introduction with sound'}
          </span>

          {soundOn ? (
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path
                d="M4 9v6h4l5 4V5L8 9H4zM16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"
                stroke="currentColor"
                strokeWidth="1.7"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path
                d="M4 9v6h4l5 4V5L8 9H4zM17 9.5l4 5M21 9.5l-4 5"
                stroke="currentColor"
                strokeWidth="1.7"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      )}
    </>
  )
}
