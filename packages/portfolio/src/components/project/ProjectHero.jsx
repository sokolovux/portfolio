import { Fragment } from 'react'
import ProjectCardImage from '../ProjectCardImage.jsx'

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
      <h2>{meta.title}</h2>
      <p>{meta.overview}</p>
      <div className="row row-cols-2 row-cols-lg-5 g-2">
        {DETAIL_COLUMNS.map((column) => (
          <div key={column.key} className="col">
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
      </div>
      <ProjectCardImage
        title={meta.title}
        src={meta.thumbnail}
        alt={`${meta.title} project preview`}
      />
    </section>
  )
}
