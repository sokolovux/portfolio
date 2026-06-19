import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  SCRAMBLE_DEFAULT_DURATION_MS,
  scrambleIntervalForDuration,
} from '../constants/textScramble.js'

const BRAND_TEXT = 'Maxim*Sokolov'
const ASTERISK_HOME = BRAND_TEXT.indexOf('*')

function buildSwapStates() {
  const chars = [...BRAND_TEXT]
  let asteriskPos = ASTERISK_HOME
  const states = [chars.join('')]

  while (asteriskPos > 0) {
    ;[chars[asteriskPos], chars[asteriskPos - 1]] = [
      chars[asteriskPos - 1],
      chars[asteriskPos],
    ]
    asteriskPos -= 1
    states.push(chars.join(''))
  }

  while (asteriskPos < chars.length - 1) {
    ;[chars[asteriskPos], chars[asteriskPos + 1]] = [
      chars[asteriskPos + 1],
      chars[asteriskPos],
    ]
    asteriskPos += 1
    states.push(chars.join(''))
  }

  while (asteriskPos > ASTERISK_HOME) {
    ;[chars[asteriskPos], chars[asteriskPos - 1]] = [
      chars[asteriskPos - 1],
      chars[asteriskPos],
    ]
    asteriskPos -= 1
    states.push(chars.join(''))
  }

  return states
}

const SWAP_STATES = buildSwapStates()
const SWAP_INTERVAL_MS = scrambleIntervalForDuration(SCRAMBLE_DEFAULT_DURATION_MS)

function renderBrandText(text) {
  return [...text].map((char, index) =>
    char === '*' ? (
      <span key={index} className="text-highlight">
        *
      </span>
    ) : (
      char
    )
  )
}

export default function BrandLink() {
  const [step, setStep] = useState(0)
  const [animating, setAnimating] = useState(false)
  const intervalRef = useRef(null)

  function clearAnimation() {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  function reset() {
    clearAnimation()
    setAnimating(false)
    setStep(0)
  }

  function handleMouseEnter() {
    clearAnimation()
    setAnimating(true)
    setStep(0)

    let currentStep = 0

    intervalRef.current = setInterval(() => {
      currentStep += 1

      if (currentStep >= SWAP_STATES.length - 1) {
        reset()
        return
      }

      setStep(currentStep)
    }, SWAP_INTERVAL_MS)
  }

  useEffect(() => () => clearAnimation(), [])

  const displayText = animating ? SWAP_STATES[step] : BRAND_TEXT

  return (
    <Link
      className="h3"
      to="/"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={reset}
    >
      {renderBrandText(displayText)}
    </Link>
  )
}
