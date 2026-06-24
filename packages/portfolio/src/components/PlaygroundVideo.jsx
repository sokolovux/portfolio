export default function PlaygroundVideo({ src, ariaLabel, wide = false, className }) {
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

  return (
    <video
      className={classes}
      autoPlay
      loop
      muted
      playsInline
      aria-label={ariaLabel ?? 'Playground video'}
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}
