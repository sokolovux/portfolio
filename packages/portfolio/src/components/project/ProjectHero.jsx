import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import ProjectCardImage from '../ProjectCardImage.jsx'
import ProjectSubsection from './ProjectSubsection.jsx'

const DETAIL_COLUMNS = [
  { key: 'role', title: 'Role' },
  { key: 'timeline', title: 'Timeline' },
  { key: 'team', title: 'Team' },
  { key: 'tools', title: 'Tools' },
  { key: 'skills', title: 'Skills' },
]

export default function ProjectHero({ meta }) {
  return (
    <section className="container py-5 d-flex flex-column gap-3">
      <Link className="nav-link project-back-link" to="/#work">← Back</Link>
      <h2>{meta.title}</h2>
      <p>{meta.overview}</p>
      <ProjectSubsection title="Results">
        <ul className="d-flex flex-column gap-2 mb-0">
          {meta.results.map((result, index) => (
            <li key={`${meta.slug}-result-${index}`}>{result}</li>
          ))}
        </ul>
      </ProjectSubsection>
      <div className="row row-cols-2 row-cols-lg-5 g-2">
        {DETAIL_COLUMNS.map((column) => (
          <div key={column.key} className="col">
            <div className="d-flex flex-column gap-2 p-3 bg-body-secondary h-100 rounded-2">
              <p className="lead">{column.title}</p>
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
      </div>
      <ProjectCardImage
        title={meta.title}
        src={meta.thumbnail}
        alt={`${meta.title} project preview`}
      />
    </section>
  )
}
