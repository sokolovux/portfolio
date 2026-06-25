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

function KyruusHealthResults({ hero = false }) {
  const listClassName = hero
    ? 'd-flex flex-column gap-2 mb-0 small'
    : 'd-flex flex-column gap-2 mb-0'
  const itemClassName = hero ? undefined : 'lead'

  return (
    <ul className={listClassName}>
      <li className={itemClassName}>64% reduction in accessibility debt (60 of 93 tickets resolved).</li>
      <li className={itemClassName}>
        Established repeatable accessibility patterns across the design system.
      </li>
      <li className={itemClassName}>
        Improved compliance posture for a regulated healthcare product.
      </li>
    </ul>
  )
}

export default function KyruusHealthPage() {
  const meta = getProjectBySlug('kyruus-health')

  return (
    <ProjectLayout meta={meta} tocItems={TOC_ITEMS} results={<KyruusHealthResults hero />}>
      <div className="container py-5 d-flex flex-column gap-5">
        <section className="d-flex flex-column gap-4">
          <h4 id="overview">Overview</h4>
          <p>{LOREM}</p>
          <p>{LOREM}</p>
          <div className="landing-placeholder-image shadow-lg" role="img" aria-label="Kyruus Health overview" />
          <div className="d-flex flex-column gap-3">
            <div className="d-flex flex-column gap-2">
              <h6 id="context">Context</h6>
              <p>{LOREM}</p>
            </div>
          </div>
        </section>

        <Divider />
        <section className="d-flex flex-column gap-4">
          <h4 id="research">Research</h4>
          <p>{LOREM}</p>
          <p>{LOREM}</p>
          <div className="landing-placeholder-image shadow-lg" role="img" aria-label="Kyruus Health research" />
        </section>

        <Divider />
        <section className="d-flex flex-column gap-4">
          <h4 id="design">Design</h4>
          <p>{LOREM}</p>
          <p>{LOREM}</p>
          <div className="landing-placeholder-image shadow-lg" role="img" aria-label="Kyruus Health design" />
        </section>

        <Divider />
        <section className="d-flex flex-column gap-4">
          <h4 id="outcome">Outcome</h4>
          <p>{LOREM}</p>
          <p>{LOREM}</p>
          <div className="landing-placeholder-image shadow-lg" role="img" aria-label="Kyruus Health outcome" />
        </section>

        <Divider />
        <section className="d-flex flex-column gap-4">
          <h4 id="results">Results</h4>
          <KyruusHealthResults />
        </section>
      </div>
    </ProjectLayout>
  )
}
