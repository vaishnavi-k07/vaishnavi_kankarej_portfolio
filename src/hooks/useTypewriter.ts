import { useEffect, useState } from 'react'

/**
 * Typewriter timing for the hero's role line.
 *
 * It drives a string, never a layout: the markup around it reserves the
 * longest title's box, so characters appear inside space that is
 * already there. It returns the first title straight away when
 * `animate` is false, which is how prefers-reduced-motion is honoured —
 * the timers are never started in that case.
 *
 * Nothing is written to state during render or synchronously inside an
 * effect; every update comes from a timer the effect owns and clears.
 */

/** A separator no title or name will contain, used to key an array. */
const UNIT = '\u0000'

/**
 * A keystroke, nudged either side of the base speed so the rhythm reads
 * as typing rather than as a metronome.
 */
function jitter(base: number): number {
  return base * (0.82 + Math.random() * 0.38)
}

interface TypedLoopOptions {
  animate: boolean
  typeSpeed?: number
  deleteSpeed?: number
  /** How long a finished word is held before it is deleted. */
  hold?: number
  /** The beat between one word clearing and the next starting. */
  pause?: number
  startDelay?: number
}

/**
 * Types each word, holds it, deletes it and moves on to the next,
 * looping back to the first. With `animate` false it shows the first
 * word and runs nothing.
 */
export function useTypedLoop(
  words: readonly string[],
  {
    animate,
    typeSpeed = 70,
    deleteSpeed = 38,
    hold = 1500,
    pause = 420,
    startDelay = 0,
  }: TypedLoopOptions,
): string {
  const [text, setText] = useState('')

  /* The effect reads the words back out of this, so a fresh array of
     the same titles does not restart the cycle mid-word. */
  const key = words.join(UNIT)

  useEffect(() => {
    const list = key ? key.split(UNIT) : []
    if (!animate || list.length === 0) return

    let timer = 0
    let wordIndex = 0
    let length = 0
    let deleting = false

    const step = () => {
      const word = list[wordIndex]

      if (!deleting) {
        length = Math.min(length + 1, word.length)
        setText(word.slice(0, length))

        if (length === word.length) {
          deleting = true
          timer = window.setTimeout(step, hold)
        } else {
          timer = window.setTimeout(step, jitter(typeSpeed))
        }
        return
      }

      length = Math.max(length - 1, 0)
      setText(word.slice(0, length))

      if (length === 0) {
        deleting = false
        wordIndex = (wordIndex + 1) % list.length
        timer = window.setTimeout(step, pause)
      } else {
        timer = window.setTimeout(step, deleteSpeed)
      }
    }

    timer = window.setTimeout(step, startDelay)
    return () => window.clearTimeout(timer)
  }, [animate, key, typeSpeed, deleteSpeed, hold, pause, startDelay])

  if (!animate) return words[0] ?? ''
  return text
}
