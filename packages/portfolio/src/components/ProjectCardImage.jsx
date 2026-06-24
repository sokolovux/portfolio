export default function ProjectCardImage({ title, src, alt, imageLabel, className }) {
  const classes = ['shadow-lg', 'w-100', className].filter(Boolean).join(' ')

  if (src) {
    return (
      <img
        src={src}
        alt={alt ?? imageLabel ?? `${title} project preview`}
        className={`project-card__image img-fluid ${classes}`}
      />
    )
  }

  return (
    <div
      className={`project-card__image ${classes}`}
      role="img"
      aria-label={imageLabel ?? `${title} project preview`}
    />
  )
}
