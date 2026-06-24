import { useEffect, useRef } from 'react'

export default function PlaygroundVideo({ src, ariaLabel, wide = false, className }) {
  const videoRef = useRef(null)
  const shapeClass = wide ? 'playground-grid__image--wide' : 'playground-grid__image--square'
  const classes = [
    'playground-grid__image',
    shapeClass,
    'shadow',
    'w-100',
    'object-fit-cover',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const restart = () => {
      video.currentTime = 0
      video.play().catch(() => {})
    }

    video.addEventListener('ended', restart)
    return () => video.removeEventListener('ended', restart)
  }, [src])

  return (
    <video
      ref={videoRef}
      className={classes}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      aria-label={ariaLabel ?? 'Playground video'}
    />
  )
}
