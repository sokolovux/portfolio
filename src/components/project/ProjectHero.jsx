import { ArrowLeft } from 'lucide-react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../Icon.jsx'
import ProjectCardImage from '../ProjectCardImage.jsx'

const DETAIL_COLUMNS = [
  { key: 'role', title: 'Role' },
  { key: 'timeline', title: 'Timeline' },
  { key: 'team', title: 'Team' },
  { key: 'tools', title: 'Tools' },
]

export default function ProjectHero({ meta, results, heroAfterResults }) {
  return (
    <section className="container py-5 d-flex flex-column gap-3">
      <Link className="nav-link project-back-link d-inline-flex align-items-center gap-2" to="/#work">
        <Icon icon={ArrowLeft} size={20} aria-hidden />
        Back
      </Link>
      <h2>{meta.title}</h2>
      <p>{meta.overview}</p>
      <div className="d-grid gap-2 project-hero-grid">
        {DETAIL_COLUMNS.map((column) => (
          <div key={column.key}>
            <div className="d-flex flex-column gap-2 p-3 bg-body-secondary h-100 rounded-2">
              <h6>{column.title}</h6>
              <small>
                {meta[column.key].map((word, index) => (
                  <Fragment key={`${column.key}-${word}`}>
                    {index > 0 ? <br /> : null}
                    {word}
                  </Fragment>
                ))}
              </small>
            </div>
          </div>
        ))}
        {results ? (
          <div className="project-hero-grid__item--span-full">
            <div className="d-flex flex-column gap-2 p-3 bg-body-secondary h-100 rounded-2">
              <h6>Results</h6>
              {results}
            </div>
          </div>
        ) : null}
        {heroAfterResults ? (
          <div className="project-hero-grid__item--span-full">{heroAfterResults}</div>
        ) : null}
      </div>
      <ProjectCardImage
        slug={meta.slug}
        title={meta.title}
        src={meta.thumbnail}
        alt={`${meta.title} project preview`}
        gradient={meta.gradient}
      />
    </section>
  )
}
