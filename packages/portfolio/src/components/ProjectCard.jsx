import BtnCustom from './BtnCustom.jsx'
import ProjectCardImage from './ProjectCardImage.jsx'
import ScrambleInView from './ScrambleInView.jsx'

export default function ProjectCard({
  className,
  slug,
  index,
  category,
  title,
  badges = [],
  overview,
  href,
  thumbnail,
  gradient,
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
        <p className="small">{overview}</p>
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
        <ProjectCardImage
          slug={slug}
          title={title}
          src={thumbnail}
          gradient={gradient}
        />
      </div>
    </article>  )
}
