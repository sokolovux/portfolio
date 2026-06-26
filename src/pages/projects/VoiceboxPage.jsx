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

function VoiceboxResults({ hero = false }) {
  const listClassName = hero
    ? 'd-flex flex-column gap-2 mb-0 small'
    : 'd-flex flex-column gap-2 mb-0'
  const itemClassName = hero ? undefined : 'lead'

  return (
    <ul className={listClassName}>
      <li className={itemClassName}>
        <small>
          Product was chosen to be featured 3x at the{' '}
          <a className="in-text-link" href="https://www.nrf.com/" target="_blank" rel="noopener noreferrer">
            National Retail Foundation
          </a>{' '}
          and was funded by{' '}
          <a className="in-text-link" href="https://www.markcuban.com/" target="_blank" rel="noopener noreferrer">
            Mark Cuban
          </a>
          .
        </small>
      </li>
      <li className={itemClassName}>
        <small>
          Pilot was launched with the{' '}
          <a className="in-text-link" href="https://www.miagoaairport.com/" target="_blank" rel="noopener noreferrer">
            GOA Internaional Airport
          </a>
          ,{' '}
          <a className="in-text-link" href="https://www.snowflake.com/" target="_blank" rel="noopener noreferrer">
            Snowflake
          </a>
          ,{' '}
          <a className="in-text-link" href="https://www.numerosmotors.com/" target="_blank" rel="noopener noreferrer">
            Numeros Motors
          </a>
          , and a select group of book publishers.
        </small>
      </li>
      <li className={itemClassName}>
        Redesigned and handed off key features and flows to the engineering team, building trust with
        customers and investors.
      </li>
      <li className={itemClassName}>
        Design system overhauled and maintained across a year-long engagement, reducing the average
        time to market for new features and significantly improving the look and feel of the app.
      </li>
      <li className={itemClassName}>
        Designed and shipped the brand identity and marketing materials for the product.
      </li>
    </ul>
  )
}

export default function VoiceboxPage() {
  const meta = getProjectBySlug('voicebox')

  return (
    <ProjectLayout meta={meta} tocItems={TOC_ITEMS} results={<VoiceboxResults hero />}>
      <div className="container py-5 d-flex flex-column gap-5">
        <section className="d-flex flex-column gap-4">
          <h4 id="overview">Overview</h4>
          <p>{LOREM}</p>
          <p>{LOREM}</p>
          <div className="landing-placeholder-image border" role="img" aria-label="Voicebox overview" />
          <div className="d-flex flex-column gap-3">
            <div className="d-flex flex-column gap-2">
              <h6 id="context">Context</h6>
              <p>{LOREM}</p>
              <div className="ps-3 py-2 border-start d-flex flex-column gap-1">
                <h6 id="problem-space">Problem space</h6>
                <p>{LOREM}</p>
              </div>
              <div className="ps-3 py-2 border-start d-flex flex-column gap-1">
                <h6 id="constraints">Constraints</h6>
                <p>{LOREM}</p>
              </div>
            </div>
            <div className="d-flex flex-column gap-2">
              <h6 id="approach">Approach</h6>
              <p>{LOREM}</p>
              <div className="ps-3 py-2 border-start d-flex flex-column gap-1">
                <h6 id="methodology">Methodology</h6>
                <p>{LOREM}</p>
              </div>
              <div className="ps-3 py-2 border-start d-flex flex-column gap-1">
                <h6 id="timeline">Timeline</h6>
                <p>{LOREM}</p>
              </div>
            </div>
          </div>
        </section>

        <Divider />
        <section className="d-flex flex-column gap-4">
          <h4 id="research">Research</h4>
          <p>{LOREM}</p>
          <p>{LOREM}</p>
          <div className="landing-placeholder-image border" role="img" aria-label="Voicebox research" />
          <div className="d-flex flex-column gap-3">
            <div className="d-flex flex-column gap-2">
              <h6 id="research-context">Context</h6>
              <p>{LOREM}</p>
            </div>
          </div>
        </section>

        <Divider />
        <section className="d-flex flex-column gap-4">
          <h4 id="design">Design</h4>
          <p>{LOREM}</p>
          <p>{LOREM}</p>
          <div className="landing-placeholder-image border" role="img" aria-label="Voicebox design" />
        </section>

        <Divider />
        <section className="d-flex flex-column gap-4">
          <h4 id="outcome">Outcome</h4>
          <p>{LOREM}</p>
          <p>{LOREM}</p>
          <div className="landing-placeholder-image border" role="img" aria-label="Voicebox outcome" />
        </section>

        <Divider />
        <section className="d-flex flex-column gap-4">
          <h4 id="results">Results</h4>
          <VoiceboxResults />
        </section>
      </div>
    </ProjectLayout>
  )
}
