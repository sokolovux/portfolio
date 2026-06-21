import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { DEFAULT_ASCII_CONFIG } from '../constants/asciiConfig.js'
import { nextAsciiTime, renderAsciiFrame } from '../utils/asciiGenerator.js'

const FIT_BASE_FONT_SIZE_PX = 16
const FALLBACK_MONO_STACK = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
const ASCII_COLOR_COUNT = 5

function frameMatchesConfig(frame, config) {
  return frame.length > 0
    && frame.length === config.frameHeight
    && frame[0].length === config.frameWidth
}

function fitAsciiToShellWidth(shell, pre) {
  const targetWidth = shell.clientWidth

  if (!targetWidth) {
    return
  }

  shell.style.setProperty('--ascii-font-size', `${FIT_BASE_FONT_SIZE_PX}px`)

  let contentWidth = pre.scrollWidth

  if (!contentWidth) {
    return
  }

  let fontSize = FIT_BASE_FONT_SIZE_PX * (targetWidth / contentWidth)
  shell.style.setProperty('--ascii-font-size', `${fontSize}px`)

  contentWidth = pre.scrollWidth

  if (contentWidth && Math.abs(contentWidth - targetWidth) > 1) {
    fontSize *= targetWidth / contentWidth
    shell.style.setProperty('--ascii-font-size', `${fontSize}px`)
  }

  void pre.offsetHeight
  shell.style.height = `${pre.offsetHeight}px`
}

function applyAsciiFontFamily(shell, fontFamily) {
  shell.style.setProperty(
    '--ascii-font-family',
    `"${fontFamily}", ${FALLBACK_MONO_STACK}`,
  )
}

function applyAsciiColors(shell, config) {
  const colors = config.colors ?? DEFAULT_ASCII_CONFIG.colors

  for (let i = 0; i < ASCII_COLOR_COUNT; i += 1) {
    shell.style.setProperty(`--ascii-color-${i}`, colors[i] ?? DEFAULT_ASCII_CONFIG.colors[i])
  }
}

export default function AsciiAnimation({ config = DEFAULT_ASCII_CONFIG }) {
  const [frame, setFrame] = useState([])
  const timeRef = useRef(0)
  const timerRef = useRef(null)
  const shellRef = useRef(null)
  const preRef = useRef(null)
  const configRef = useRef(config)
  const frameRef = useRef(frame)

  configRef.current = config
  frameRef.current = frame

  useEffect(() => {
    const shell = shellRef.current

    if (!shell) {
      return
    }

    applyAsciiFontFamily(shell, config.fontFamily ?? 'Geist Mono')
    applyAsciiColors(shell, config)
  }, [config.fontFamily, config.colors])

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const time = prefersReducedMotion ? 0 : timeRef.current

    setFrame(renderAsciiFrame(config, time))
  }, [config])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      return undefined
    }

    function tick() {
      const activeConfig = configRef.current

      setFrame(renderAsciiFrame(activeConfig, timeRef.current))
      timeRef.current = nextAsciiTime(timeRef.current, activeConfig.frameMultiplier)
      timerRef.current = window.setTimeout(tick, activeConfig.animationSpeed)
    }

    timerRef.current = window.setTimeout(tick, config.animationSpeed)

    return () => {
      window.clearTimeout(timerRef.current)
    }
  }, [config])

  useLayoutEffect(() => {
    const shell = shellRef.current
    const pre = preRef.current

    if (!shell || !pre || !frameMatchesConfig(frame, config)) {
      return
    }

    fitAsciiToShellWidth(shell, pre)
  }, [frame, config.frameWidth, config.frameHeight, config.fontFamily, config.charset])

  useEffect(() => {
    const shell = shellRef.current
    const pre = preRef.current

    if (!shell || !pre) {
      return undefined
    }

    function scheduleFit() {
      window.requestAnimationFrame(() => {
        if (!frameMatchesConfig(frameRef.current, configRef.current)) {
          return
        }

        fitAsciiToShellWidth(shell, pre)
      })
    }

    const observer = new ResizeObserver(scheduleFit)
    observer.observe(shell)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={shellRef} className="ascii-animation-shell w-100 overflow-hidden">
      <pre ref={preRef} className="ascii-animation mb-0" aria-hidden="true">
        {frame.map((row, y) => (
          <Fragment key={y}>
            {row.map((cell, x) => (
              <span key={x} className={`ascii-char-${cell.colorIndex}`}>
                {cell.char}
              </span>
            ))}
            {'\n'}
          </Fragment>
        ))}
      </pre>
    </div>
  )
}
