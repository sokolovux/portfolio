import { useEffect, useRef, useState } from 'react'
import TextScramble from './TextScramble.jsx'

export default function ScrambleInView({
  text,
  once = true,
  threshold = 0.2,
  tag = 'span',
  className,
  style,
  duration,
  charset,
  ...rest
}) {
  const ref = useRef(null)
  const [trigger, setTrigger] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTrigger(true)
          if (once) {
            observer.disconnect()
          }
        } else if (!once) {
          setTrigger(false)
        }
      },
      { threshold }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [once, threshold])

  return (
    <span ref={ref}>
      <TextScramble
        text={text}
        tag={tag}
        className={className}
        style={style}
        duration={duration}
        charset={charset}
        trigger={trigger}
        {...rest}
      />
    </span>
  )
}
