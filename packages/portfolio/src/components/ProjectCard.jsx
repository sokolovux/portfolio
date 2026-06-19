import BtnCustom from './BtnCustom.jsx'
import ScrambleInView from './ScrambleInView.jsx'

export default function ProjectCard({
  index,
  category,
  title,
  description,
  href,
  imageLabel,
}) {
  return (
    <article className="project-card row g-3 g-md-4">
      <div className="col-md-6 d-flex flex-column gap-2">
        <p className="small">
          <ScrambleInView
            text={`${index} / ${category}`}
            className="text-highlight display-mono"
            tag="span"
          />
        </p>
        <h5>{title}</h5>
        <small className="text-muted">{description}</small>
        <BtnCustom variant="secondary" label="View project" href={href} />
      </div>
      <div className="col-md-6">
        <div
          className="project-card__image"
          role="img"
          aria-label={imageLabel ?? `${title} project preview`}
        />
      </div>
    </article>
  )
}
