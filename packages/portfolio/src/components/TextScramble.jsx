import { useEffect, useState } from 'react'
import {
  SCRAMBLE_DEFAULT_DURATION_MS,
  scrambleIntervalForDuration,
} from '../constants/textScramble.js'

const DEFAULT_CHARSET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'

function randomChar(charset) {
  return charset[Math.floor(Math.random() * charset.length)]
}

function initialScramble(text, charset) {
  return [...text].map(() => randomChar(charset))
}

function unresolvedFlags(length) {
  return Array.from({ length }, () => false)
}

function resolvedFlags(resolveAt, elapsed) {
  return resolveAt.map((resolveTime) => elapsed >= resolveTime)
}

function createResolveSchedule(length, duration) {
  return Array.from({ length }, () => Math.random() * duration)
}

function buildDisplayText(text, charset, elapsed, resolveAt, chars, rescramble) {
  return [...text]
    .map((char, index) => {
      if (elapsed >= resolveAt[index]) {
        return char
      }
      if (rescramble || chars[index] === undefined) {
        return randomChar(charset)
      }
      return chars[index]
    })
    .join('')
}

export default function TextScramble({
  text,
  trigger = true,
  duration = SCRAMBLE_DEFAULT_DURATION_MS,
  charset = DEFAULT_CHARSET,
  className,
  style,
  tag: Tag = 'span',
  ...rest
}) {
  const [frame, setFrame] = useState(() => ({
    displayText: text,
    resolved: Array.from({ length: text.length }, () => true),
  }))

  useEffect(() => {
    if (!trigger) {
      setFrame({
        displayText: text,
        resolved: Array.from({ length: text.length }, () => true),
      })
      return undefined
    }

    let frameId = null
    let startTime = null
    let lastScrambleTime = null
    let chars = initialScramble(text, charset)
    const resolveAt = createResolveSchedule(text.length, duration)
    const scrambleInterval = scrambleIntervalForDuration(duration)

    const animate = (timestamp) => {
      if (startTime === null) {
        startTime = timestamp
      }

      const elapsed = timestamp - startTime
      const length = text.length

      if (length === 0 || elapsed >= duration) {
        setFrame({
          displayText: text,
          resolved: Array.from({ length }, () => true),
        })
        return
      }

      const rescramble =
        lastScrambleTime === null || timestamp - lastScrambleTime >= scrambleInterval

      if (rescramble) {
        lastScrambleTime = timestamp
      }

      const nextDisplay = buildDisplayText(
        text,
        charset,
        elapsed,
        resolveAt,
        chars,
        rescramble
      )
      chars = [...nextDisplay]
      setFrame({
        displayText: nextDisplay,
        resolved: resolvedFlags(resolveAt, elapsed),
      })
      frameId = requestAnimationFrame(animate)
    }

    chars = initialScramble(text, charset)
    setFrame({
      displayText: chars.join(''),
      resolved: unresolvedFlags(text.length),
    })
    frameId = requestAnimationFrame(animate)

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId)
      }
    }
  }, [text, trigger, duration, charset])

  return (
    <Tag className={className} style={style} {...rest}>
      {[...frame.displayText].map((char, index) => (
        <span
          key={index}
          className={frame.resolved[index] ? undefined : 'text-scramble-glyph'}
        >
          {char}
        </span>
      ))}
    </Tag>
  )
}
