import { useLayoutEffect, useRef } from 'react'

export default function ProjectCardImage({
  slug,
  title,
  src,
  alt,
  imageLabel,
  className,
  gradient,
}) {
  const ref = useRef(null)
  const classes = ['border', 'w-100', className].filter(Boolean).join(' ')
  const label = imageLabel ?? `${title} project preview`

  useLayoutEffect(() => {
    if (!ref.current || !gradient) return

    ref.current.style.setProperty('--project-card-gradient-top', gradient.top)
    ref.current.style.setProperty('--project-card-gradient-bottom', gradient.bottom)
  }, [gradient])

  return (
    <div
      ref={ref}
      className={`project-card__image ${classes}`}
      data-project-slug={slug}
      role={src ? undefined : 'img'}
      aria-label={src ? undefined : label}
    >
      {src ? (
        <img
          src={src}
          alt={alt ?? label}
          className="project-card__image-photo"
        />
      ) : null}
    </div>
  )
}
