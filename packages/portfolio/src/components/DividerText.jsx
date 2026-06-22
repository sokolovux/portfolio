import { useLayoutEffect, useRef, useState } from 'react'

export default function DividerText({ symbol = '/', className }) {
  const containerRef = useRef(null)
  const measureRef = useRef(null)
  const [repeatCount, setRepeatCount] = useState(0)

  useLayoutEffect(() => {
    const container = containerRef.current
    const measure = measureRef.current

    if (!container || !measure) {
      return undefined
    }

    function updateCount() {
      const charWidth = measure.getBoundingClientRect().width
      const containerWidth = container.clientWidth

      if (charWidth > 0) {
        setRepeatCount(Math.ceil(containerWidth / charWidth))
      }
    }

    updateCount()

    const observer = new ResizeObserver(updateCount)
    observer.observe(container)

    return () => {
      observer.disconnect()
    }
  }, [symbol])

  const classes = [
    'divider-text',
    'w-100',
    'mw-100',
    'overflow-hidden',
    'text-nowrap',
    'text-muted',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <h6 ref={containerRef} className={classes} aria-hidden="true">
      <span ref={measureRef} className="divider-text__probe" aria-hidden="true">
        {symbol}
      </span>
      {symbol.repeat(repeatCount)}
    </h6>
  )
}
