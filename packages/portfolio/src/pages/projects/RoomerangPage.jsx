import { getProjectBySlug } from '../../constants/projects.js'
import { createTocItem } from '../../utils/toc.js'
import Divider from '../../components/Divider.jsx'
import ProjectLayout from '../../components/project/ProjectLayout.jsx'

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

const TOC_ITEMS = [
  createTocItem('Overview'),
  createTocItem('Research'),
  createTocItem('Design'),
  createTocItem('Outcome'),
  createTocItem('Results'),
]

function RoomerangResults({ hero = false }) {
  const listClassName = hero
    ? 'd-flex flex-column gap-2 mb-0 small'
    : 'd-flex flex-column gap-2 mb-0'
  const itemClassName = hero ? undefined : 'lead'

  return (
    <ul className={listClassName}>
      <li className={itemClassName}>
        Conceived, designed, and built the product solo from concept through deployment.
      </li>
      <li className={itemClassName}>
        Shipped end-to-end flows for discovery, listings, and roommate matching.
      </li>
      <li className={itemClassName}>Full stack on React, Supabase, Vercel, and Railway.</li>
    </ul>
  )
}

export default function RoomerangPage() {
  const meta = getProjectBySlug('roomerang')

  return (
    <ProjectLayout meta={meta} tocItems={TOC_ITEMS} results={<RoomerangResults hero />}>
      <section className="container py-5 d-flex flex-column gap-3">
        <h4 id="overview">Overview</h4>
        <p>{LOREM}</p>
        <p>{LOREM}</p>
        <div className="landing-placeholder-image border" role="img" aria-label="Roomerang overview" />
        <div className="d-flex flex-column gap-2">
          <p id="context" className="lead">
            Context
          </p>
          <p>{LOREM}</p>
        </div>
      </section>

      <Divider />
      <section className="container py-5 d-flex flex-column gap-3">
        <h4 id="research">Research</h4>
        <p>{LOREM}</p>
        <p>{LOREM}</p>
        <div className="landing-placeholder-image border" role="img" aria-label="Roomerang research" />
      </section>

      <Divider />
      <section className="container py-5 d-flex flex-column gap-3">
        <h4 id="design">Design</h4>
        <p>{LOREM}</p>
        <p>{LOREM}</p>
        <div className="landing-placeholder-image border" role="img" aria-label="Roomerang design" />
      </section>

      <Divider />
      <section className="container py-5 d-flex flex-column gap-3">
        <h4 id="outcome">Outcome</h4>
        <p>{LOREM}</p>
        <p>{LOREM}</p>
        <div className="landing-placeholder-image border" role="img" aria-label="Roomerang outcome" />
      </section>

      <Divider />
      <section className="container py-5 d-flex flex-column gap-3">
        <h4 id="results">Results</h4>
        <RoomerangResults />
      </section>
    </ProjectLayout>
  )
}
