
import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { media } from '../data'
import { asset } from '../lib/asset'
import { useReducedMotion } from '../hooks/useReducedMotion'
import './HeroVideo.css'

/**
 * Hero background video.
 *
 * Behaviour:
 * - Desktop, tablets and mobile: muted autoplay + loop.
 * - Video pauses when the hero is outside the viewport.
 * - Video pauses when the browser tab is hidden.
 * - Reduced motion: poster image only.
 * - Sound plays only when the visitor clicks the sound button.
 * - Sound introduction plays once, then returns to silent looping.
 * - Video source is attached after the first paint.
 * - If playback fails, the poster remains visible.
 */

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const hostRef = useRef<HTMLDivElement>(null)

  const reduced = useReducedMotion()

  // Enable background video on desktop, tablets and mobile.
  const mayPlay = !reduced

  /** Source is attached only after the page has painted. */
  const [armed, setArmed] = useState(false)
  const [failed, setFailed] = useState(false)
  const [soundOn, setSoundOn] = useState(false)

  const posterUrl = asset(media.introPoster)
  const videoUrl = asset(media.introVideo)

  const hasVideo = mayPlay && !failed

  /**
   * Return video to muted looping mode.
   */
  const silence = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.loop = true
    setSoundOn(false)
  }, [])

  /* Attach video source after first paint. */
  useEffect(() => {
    if (!mayPlay) return

    type IdleWindow = Window & {
      requestIdleCallback?: (
        cb: () => void,
        opts?: { timeout: number }
      ) => number
      cancelIdleCallback?: (handle: number) => void
    }

    const w = window as IdleWindow

    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(
        () => setArmed(true),
        { timeout: 1200 }
      )

      return () => w.cancelIdleCallback?.(id)
    }

    const id = window.setTimeout(() => setArmed(true), 200)

    return () => clearTimeout(id)
  }, [mayPlay])

  /* Play video only while hero is visible. */
  useEffect(() => {
    const host = hostRef.current
    const video = videoRef.current

    if (!host || !video || !mayPlay) return

    let inView = true
    let pageVisible = !document.hidden

    const sync = () => {
      if (inView && pageVisible) {
        if (video.paused) {
          void video.play().catch(() => undefined)
        }
        return
      }

      if (soundOn) silence()

      if (!video.paused) {
        video.pause()
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        sync()
      },
      { threshold: 0 }
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
      document.removeEventListener(
        'visibilitychange',
        onVisibility
      )
    }
  }, [mayPlay, armed, soundOn, silence])

  /* Play introduction once with sound, then resume silent looping. */
  useEffect(() => {
    const video = videoRef.current

    if (!video || !hasVideo) return

    const onEnded = () => {
      if (!soundOn) return

      silence()
      void video.play().catch(() => undefined)
    }

    video.addEventListener('ended', onEnded)

    return () => {
      video.removeEventListener('ended', onEnded)
    }
  }, [hasVideo, soundOn, silence])

  /* Toggle video sound. */
  const toggleSound = useCallback(() => {
    const video = videoRef.current

    if (!video) return

    if (soundOn) {
      silence()
      return
    }

    video.muted = false
    video.loop = false
    video.currentTime = 0

    setSoundOn(true)

    void video.play().catch(() => {
      video.muted = true
      video.loop = true
      setSoundOn(false)
    })
  }, [soundOn, silence])

  return (
    <>
      <div
        className="hero-backdrop"
        ref={hostRef}
        aria-hidden="true"
        style={
          { '--poster': `url(${posterUrl})` } as CSSProperties
        }
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

      {/* Sound control */}
      {hasVideo && (
        <button
          type="button"
          className="hero-sound"
          onClick={toggleSound}
          data-on={soundOn ? '' : undefined}
          title={
            soundOn
              ? 'Mute the introduction'
              : 'Hear the introduction'
          }
        >
          <span className="sr-only">
            {soundOn
              ? 'Mute the video introduction'
              : 'Play the video introduction with sound'}
          </span>

          {soundOn ? (
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              aria-hidden="true"
            >
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
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              aria-hidden="true"
            >
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
