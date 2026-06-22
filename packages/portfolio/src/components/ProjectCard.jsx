import BtnCustom from './BtnCustom.jsx'
import ScrambleInView from './ScrambleInView.jsx'

export default function ProjectCard({
  index,
  category,
  title,
  badges = [],
  description,
  href,
  imageLabel,
}) {
  return (
    <article className="project-card row g-3 g-md-4">
      <div className="col-md-4 d-flex flex-column gap-2">
        <p className="small">
          <ScrambleInView
            text={`${index} / ${category}`}
            className="text-highlight display-mono"
            tag="span"
          />
        </p>
        <h5>{title}</h5>
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
        <small className="text-muted">{description}</small>
        <BtnCustom variant="secondary" label="Read more" href={href} />
      </div>
      <div className="col-md-8">
        <div
          className="project-card__image shadow"
          role="img"
          aria-label={imageLabel ?? `${title} project preview`}
        />
      </div>
    </article>
  )
}
