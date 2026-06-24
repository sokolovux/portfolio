export default function PlaygroundImage({ src, alt, imageLabel, wide = false, className }) {
  const shapeClass = wide ? 'playground-grid__image--wide' : 'playground-grid__image--square'
  const classes = ['playground-grid__image', shapeClass, 'shadow', 'w-100', className]
    .filter(Boolean)
    .join(' ')

  if (src) {
    return (
      <img
        src={src}
        alt={alt ?? imageLabel ?? 'Playground image'}
        className={`img-fluid ${classes}`}
      />
    )
  }

  return (
    <div
      className={classes}
      role="img"
      aria-label={imageLabel ?? alt ?? 'Playground image'}
    />
  )
}
