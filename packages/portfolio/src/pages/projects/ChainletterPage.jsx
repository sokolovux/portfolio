import { getProjectBySlug } from '../../constants/projects.js'
import { createTocItem } from '../../utils/toc.js'
import Divider from '../../components/Divider.jsx'
import ProjectLayout from '../../components/project/ProjectLayout.jsx'

const TOC_ITEMS = [
  createTocItem('Overview'),
  createTocItem('The Problem'),
  createTocItem('Target Audience'),
  createTocItem('Discovery'),
  createTocItem('My Role & Process'),
  createTocItem('Core UX Challenges & Solutions'),
  createTocItem('Tradeoffs & Scope Decisions'),
  createTocItem('Outcomes'),
  createTocItem('Results'),
]

function ChainletterResults({ hero = false }) {
  const listClassName = hero
    ? 'd-flex flex-column gap-2 mb-0 small'
    : 'd-flex flex-column gap-2 mb-0'
  const itemClassName = hero ? undefined : 'lead'

  return (
    <ul className={listClassName}>
      <li className={itemClassName}>
        Shipped an administrator MVP focused on degree upload and verification without blockchain
        literacy.
      </li>
      <li className={itemClassName}>
        Defined plain-language terminology and a two-state collection model for irreversible actions.
      </li>
      <li className={itemClassName}>
        Delivered the core product loop in 7-8 weeks with a tightly scoped MVP cut list.
      </li>
    </ul>
  )
}

export default function ChainletterPage() {
  const meta = getProjectBySlug('chainletter')

  return (
    <ProjectLayout meta={meta} tocItems={TOC_ITEMS} results={<ChainletterResults hero />}>
      <section className="container py-5 d-flex flex-column gap-3">
        <h4 id="overview">Overview</h4>
        <p>
          Chainletter is a blockchain-based platform that allows universities to have their degrees
          and certifications be verifiable to any and all outside organizations with just the
          original file.
        </p>
        <p>
          For this project, I was tasked with redesigning the administrator-facing part of the
          application, the first real MVP for the product, to make it usable, clear and scalable.
          The end goal: help university admins upload student degrees without needing to understand
          anything about blockchain.
        </p>
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <div
              className="project-placeholder-image shadow-lg"
              role="img"
              aria-label="Chainletter overview screen 1"
            />
          </div>
          <div className="col-12 col-md-6">
            <div
              className="project-placeholder-image shadow-lg"
              role="img"
              aria-label="Chainletter overview screen 2"
            />
          </div>
          <div className="col-12 col-md-6">
            <div
              className="project-placeholder-image shadow-lg"
              role="img"
              aria-label="Chainletter overview screen 3"
            />
          </div>
        </div>
      </section>

      <Divider />
      <section className="container py-5 d-flex flex-column gap-3">
        <h4 id="the-problem">The Problem</h4>
        <p>
          The first version of Chainletter had a lot of issues: visually, functionally, and
          structurally.
        </p>
        <div className="d-flex flex-column gap-1">
          <p id="issue-1-ui-design" className="lead">
            Issue #1: UI Design
          </p>
          <p>The UI felt outdated and disconnected. There was no brand consistency and no real design system.</p>
        </div>
        <div className="d-flex flex-column gap-1">
          <p id="issue-2-unintuitive-interactions" className="lead">
            Issue #2: Unintuitive Interactions
          </p>
          <p>Basic interactions were unintuitive and required lots of guesswork.</p>
        </div>
        <div className="d-flex flex-column gap-1">
          <p id="issue-3-microcopy-terminology" className="lead">
            Issue #3: Microcopy & Terminology
          </p>
          <p>Terminology throughout the app was inconsistent and often too technical.</p>
        </div>
        <div className="d-flex flex-column gap-1">
          <p id="issue-4-blockchain-unfamiliarity" className="lead">
            Issue #4: Blockchain Unfamiliarity
          </p>
          <p>
            Blockchain introduced permanent, irreversible actions and the interface did little to
            prepare users for that.
          </p>
        </div>
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <div
              className="project-placeholder-image shadow-lg"
              role="img"
              aria-label="Chainletter legacy UI screen 1"
            />
          </div>
          <div className="col-12 col-md-6">
            <div
              className="project-placeholder-image shadow-lg"
              role="img"
              aria-label="Chainletter legacy UI screen 2"
            />
          </div>
          <div className="col-12 col-md-6">
            <div
              className="project-placeholder-image shadow-lg"
              role="img"
              aria-label="Chainletter legacy UI screen 3"
            />
          </div>
        </div>
      </section>

      <Divider />
      <section className="container py-5 d-flex flex-column gap-3">
        <h4 id="target-audience">Target Audience</h4>
        <p>
          Our MVP was built specifically for university administrators: the people responsible for
          managing and verifying academic records.
        </p>
        <p>
          These are professionals who work within formal institutional systems, follow established
          document workflows, and are accountable for the integrity of official records. They
          don&apos;t need to understand blockchain. They need to trust that the tool is as reliable
          as the documents it&apos;s certifying, and that they won&apos;t accidentally do something
          irreversible.
        </p>
      </section>

      <Divider />
      <section className="container py-5 d-flex flex-column gap-3">
        <h4 id="discovery">Discovery</h4>
        <p>
          The project was early-stage and fast-moving, so we worked with the resources we had. The
          Chainletter team brought deep knowledge of university workflows and procurement cycles,
          which gave us a strong proxy for understanding the user&apos;s environment and expectations.
        </p>
        <p>
          I led two syncs per week with the full team (founder, dev, and ops) to gather feedback,
          pressure-test naming decisions, and align on direction. Those sessions were especially
          useful when it came to terminology and navigating the constraints that blockchain
          introduced. We also did a quick competitor review to understand where the category was and
          where it wasn&apos;t.
        </p>
      </section>

      <Divider />
      <section className="container py-5 d-flex flex-column gap-3">
        <h4 id="my-role-process">My Role & Process</h4>
        <p>
          I led the project as both UX/UI Designer and co-product lead. The whole project took
          around 7-8 weeks.
        </p>
        <p>
          Beyond design, I ran twice-weekly syncs with the founder and dev, translated stakeholder
          and institutional feedback into product decisions, and had final say on terminology and
          interaction patterns. I wasn&apos;t executing a brief. I was helping define what the
          product should be.
        </p>
        <ul className="mb-0">
          <li>Designed all lo-fi and hi-fi screens in Figma, using a Bootstrap UI kit as the base</li>
          <li>Customized the components to align with Chainletter&apos;s brand and accessibility needs</li>
          <li>
            Worked closely with Oleksii (our dev) on implementation: daily asyncs and live calls
          </li>
          <li>Held weekly design reviews with the full team</li>
        </ul>
        <p>
          We intentionally kept things lean and fast-moving, without heavyweight process overhead.
        </p>
      </section>

      <Divider />
      <section className="container py-5 d-flex flex-column gap-3">
        <h4 id="core-ux-challenges-solutions">Core UX Challenges & Solutions</h4>
        <div className="d-flex flex-column gap-3">
          <p id="terminology-mental-models" className="lead">
            1. Terminology & Mental Models
          </p>
          <p>
            The biggest challenge was explaining blockchain interactions to non-technical users
            without using blockchain terminology.
          </p>
          <p>
            You can&apos;t just say &quot;it works like Google Drive&quot; when stamping a collection
            permanently uploads data to the blockchain, but going full crypto-speak wasn&apos;t an
            option either.
          </p>
          <div className="d-flex flex-column gap-2">
            <p id="terminology-solution" className="lead">
              Solution
            </p>
            <ul className="mb-0">
              <li>
                Defined a simple internal glossary as an abstraction on blockchain-related
                terminology (e.g., Collections, Files, Stamps)
              </li>
              <li>Iterated on terminology with the team until it felt clear and trustworthy</li>
              <li>Reinforced concepts with tooltips, contextual help, and warning modals across the UI</li>
            </ul>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <div
                  className="project-placeholder-image shadow-lg"
                  role="img"
                  aria-label="Chainletter terminology screen 1"
                />
              </div>
              <div className="col-12 col-md-6">
                <div
                  className="project-placeholder-image shadow-lg"
                  role="img"
                  aria-label="Chainletter terminology screen 2"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column gap-2">
          <p id="permanent-actions" className="lead">
            2. Permanent Actions
          </p>
          <p>
            The core architectural challenge was separating editable, internal state from the point of
            no return. Quite a few actions within the UI had permanent consequences, and needed to
            be communicated as such in a way that empowers users, not burdens them.
          </p>
          <div className="d-flex flex-column gap-2">
            <p id="two-state-collection-model" className="lead">
              The Core Solution: A Two-State Collection Model
            </p>
            <p>
              The central UX insight (and this was mine, not a technical requirement) was splitting
              the collection flow into two distinct states. Step 1: an internal draft with an editable
              name and description. Step 2: a permanent external record, locked once stamped onto the
              blockchain. This distinction didn&apos;t exist in the original product. Users could
              stumble into permanence without knowing it.
            </p>
            <p>
              Everything else in this section (the modals, the non-editable fields, the copy) was
              built to make that two-state model legible at every level of the interface.
            </p>
          </div>
          <div className="d-flex flex-column gap-2">
            <p id="permanent-actions-additional-solutions" className="lead">
              Additional solutions
            </p>
            <ul className="mb-0">
              <li>Added warning modals and non-editable fields post-stamping</li>
              <li>Used plain, direct language to explain consequences up front</li>
            </ul>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <div
                  className="project-placeholder-image shadow-lg"
                  role="img"
                  aria-label="Chainletter two-state collection screen 1"
                />
              </div>
              <div className="col-12 col-md-6">
                <div
                  className="project-placeholder-image shadow-lg"
                  role="img"
                  aria-label="Chainletter two-state collection screen 2"
                />
              </div>
              <div className="col-12 col-md-6">
                <div
                  className="project-placeholder-image shadow-lg"
                  role="img"
                  aria-label="Chainletter two-state collection screen 3"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column gap-2">
          <p id="file-upload-error-handling" className="lead">
            3. File Upload UX & Error Handling
          </p>
          <p>
            The upload flow was hidden, lacked context on accepted file types, and gave poor feedback
            when something went wrong.
          </p>
          <div className="d-flex flex-column gap-2">
            <p id="file-upload-solution" className="lead">
              Solution
            </p>
            <ul className="mb-0">
              <li>Made the file upload UI always visible and clearly labeled</li>
              <li>Grouped errors into two buckets: shown before upload and after upload</li>
              <li>Displayed error tables in modals so users could understand and fix issues quickly</li>
            </ul>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <div
                  className="project-placeholder-image shadow-lg"
                  role="img"
                  aria-label="Chainletter file upload screen 1"
                />
              </div>
              <div className="col-12 col-md-6">
                <div
                  className="project-placeholder-image shadow-lg"
                  role="img"
                  aria-label="Chainletter file upload screen 2"
                />
              </div>
              <div className="col-12 col-md-6">
                <div
                  className="project-placeholder-image shadow-lg"
                  role="img"
                  aria-label="Chainletter file upload screen 3"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />
      <section className="container py-5 d-flex flex-column gap-3">
        <h4 id="tradeoffs-scope-decisions">Tradeoffs & Scope Decisions</h4>
        <p>To stay on deadline and deliver a solid MVP, we scoped tightly and cut the following:</p>
        <ul className="mb-0">
          <li>Advanced filtering and search across Collections and Files</li>
          <li>Multi-file selection and batch actions</li>
          <li>Admin permission management / user roles</li>
          <li>Settings/account page</li>
        </ul>
        <p>
          We kept focus on the core loop: creating collections, uploading files, stamping and
          verifying them, viewing status clearly, and getting help when needed.
        </p>
      </section>

      <Divider />
      <section className="container py-5 d-flex flex-column gap-3">
        <h4 id="outcomes">Outcomes</h4>
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <div
              className="project-placeholder-image shadow-lg"
              role="img"
              aria-label="Chainletter outcome screen 1"
            />
          </div>
          <div className="col-12 col-md-6">
            <div
              className="project-placeholder-image shadow-lg"
              role="img"
              aria-label="Chainletter outcome screen 2"
            />
          </div>
          <div className="col-12 col-md-6">
            <div
              className="project-placeholder-image shadow-lg"
              role="img"
              aria-label="Chainletter outcome screen 3"
            />
          </div>
          <div className="col-12 col-md-6">
            <div
              className="project-placeholder-image shadow-lg"
              role="img"
              aria-label="Chainletter outcome screen 4"
            />
          </div>
        </div>
      </section>

      <Divider />
      <section className="container py-5 d-flex flex-column gap-3">
        <h4 id="results">Results</h4>
        <ChainletterResults />
      </section>
    </ProjectLayout>
  )
}
