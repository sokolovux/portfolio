import { useState } from 'react'
import TextScramble from './TextScramble.jsx'

export default function ScrambleOnHover({
  text,
  tag: Tag = 'span',
  className,
  style,
  duration,
  charset,
  ...rest
}) {
  const [run, setRun] = useState(0)
  const [started, setStarted] = useState(false)

  function handleMouseEnter() {
    setRun((current) => current + 1)
    setStarted(true)
  }

  function handleMouseLeave() {
    setStarted(false)
  }

  if (!started) {
    return (
      <Tag
        className={className}
        style={style}
        onMouseEnter={handleMouseEnter}
        {...rest}
      >
        {text}
      </Tag>
    )
  }

  return (
    <TextScramble
      key={run}
      text={text}
      tag={Tag}
      className={className}
      style={style}
      duration={duration}
      charset={charset}
      trigger
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...rest}
    />
  )
}
