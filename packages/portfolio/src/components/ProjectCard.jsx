import BtnCustom from './BtnCustom.jsx'
import ScrambleInView from './ScrambleInView.jsx'

export default function ProjectCard({
  className,
  index,
  category,
  title,
  badges = [],
  description,
  href,
  imageLabel,
}) {
  const classes = ['project-card', 'row', 'g-3', 'g-md-4', className].filter(Boolean).join(' ')

  return (
    <article className={classes}>      <div className="col-md-4 d-flex flex-column gap-2">
        <p className="small">
          <ScrambleInView
            text={`${index} / ${category}`}
            className="text-highlight display-mono"
            tag="span"
          />
        </p>
        <ScrambleInView text={title} tag="h5" />
        <small className="text-muted">{description}</small>
        {badges.length > 0 && (
          <div className="d-flex flex-wrap gap-1">
            {badges.map((badge, badgeIndex) => (
              <span
                key={`${badge}-${badgeIndex}`}
                className="badge"
              >
                {badge}
              </span>
            ))}
          </div>
        )}
        <BtnCustom variant="secondary" label="Read more" className="mt-auto" href={href} />
      </div>
      <div className="col-md-8">
        <div
          className="project-card__image shadow"
          role="img"
          aria-label={imageLabel ?? `${title} project preview`}
        />
      </div>
    </article>  )
}
