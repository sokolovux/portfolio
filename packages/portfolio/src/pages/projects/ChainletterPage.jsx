import { getProjectBySlug } from '../../constants/projects.js'
import { createTocItem } from '../../utils/toc.js'
import ProjectImage from '../../components/project/ProjectImage.jsx'
import ProjectLayout from '../../components/project/ProjectLayout.jsx'
import ProjectResultsList, { ProjectResultsItem } from '../../components/project/ProjectResultsList.jsx'
import ProjectSection from '../../components/project/ProjectSection.jsx'
import ProjectSubsection from '../../components/project/ProjectSubsection.jsx'

const CL_IMAGE = (number) => `/work/chainletter/cl-${number}.png`

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
  return (
    <ProjectResultsList hero={hero}>
      <ProjectResultsItem hero={hero}>
        Shipped an administrator MVP focused on degree upload and verification without blockchain literacy.
      </ProjectResultsItem>
      <ProjectResultsItem hero={hero}>
        Defined plain-language terminology and a two-state collection model for irreversible actions.
      </ProjectResultsItem>
      <ProjectResultsItem hero={hero}>
        Delivered the core product loop in 7-8 weeks with a tightly scoped MVP cut list.
      </ProjectResultsItem>
    </ProjectResultsList>
  )
}

export default function ChainletterPage() {
  const meta = getProjectBySlug('chainletter')

  return (
    <ProjectLayout meta={meta} tocItems={TOC_ITEMS} results={<ChainletterResults hero />}>
      <ProjectSection id="overview" title="Overview">
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
        <ProjectImage src={CL_IMAGE(1)} alt="Chainletter overview screen 1" label="Chainletter overview screen 1" />
        <ProjectImage src={CL_IMAGE(2)} alt="Chainletter overview screen 2" label="Chainletter overview screen 2" />
        <ProjectImage src={CL_IMAGE(3)} alt="Chainletter overview screen 3" label="Chainletter overview screen 3" />
      </ProjectSection>

      <ProjectSection id="the-problem" title="The Problem" dividerBefore>
        <p>
          The first version of Chainletter had a lot of issues: visually, functionally, and
          structurally.
        </p>
        <ProjectSubsection id="issue-1-ui-design" title="Issue #1: UI Design">
          <p>The UI felt outdated and disconnected. There was no brand consistency and no real design system.</p>
        </ProjectSubsection>
        <ProjectSubsection id="issue-2-unintuitive-interactions" title="Issue #2: Unintuitive Interactions">
          <p>Basic interactions were unintuitive and required lots of guesswork.</p>
        </ProjectSubsection>
        <ProjectSubsection id="issue-3-microcopy-terminology" title="Issue #3: Microcopy & Terminology">
          <p>Terminology throughout the app was inconsistent and often too technical.</p>
        </ProjectSubsection>
        <ProjectSubsection id="issue-4-blockchain-unfamiliarity" title="Issue #4: Blockchain Unfamiliarity">
          <p>
            Blockchain introduced permanent, irreversible actions and the interface did little to
            prepare users for that.
          </p>
        </ProjectSubsection>
        <ProjectImage src={CL_IMAGE(4)} alt="Chainletter legacy UI screen 1" label="Chainletter legacy UI screen 1" />
        <ProjectImage src={CL_IMAGE(5)} alt="Chainletter legacy UI screen 2" label="Chainletter legacy UI screen 2" />
        <ProjectImage src={CL_IMAGE(6)} alt="Chainletter legacy UI screen 3" label="Chainletter legacy UI screen 3" />
      </ProjectSection>

      <ProjectSection id="target-audience" title="Target Audience" dividerBefore>
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
      </ProjectSection>

      <ProjectSection id="discovery" title="Discovery" dividerBefore>
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
      </ProjectSection>

      <ProjectSection id="my-role-process" title="My Role & Process" dividerBefore>
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
      </ProjectSection>

      <ProjectSection id="core-ux-challenges-solutions" title="Core UX Challenges & Solutions" dividerBefore>
        <ProjectSubsection id="terminology-mental-models" title="1. Terminology & Mental Models">
          <p>
            The biggest challenge was explaining blockchain interactions to non-technical users
            without using blockchain terminology.
          </p>
          <p>
            You can&apos;t just say &quot;it works like Google Drive&quot; when stamping a collection
            permanently uploads data to the blockchain, but going full crypto-speak wasn&apos;t an
            option either.
          </p>
          <ProjectSubsection id="terminology-solution" title="Solution">
            <ul className="mb-0">
              <li>
                Defined a simple internal glossary as an abstraction on blockchain-related
                terminology (e.g., Collections, Files, Stamps)
              </li>
              <li>Iterated on terminology with the team until it felt clear and trustworthy</li>
              <li>Reinforced concepts with tooltips, contextual help, and warning modals across the UI</li>
            </ul>
            <ProjectImage src={CL_IMAGE(7)} alt="Chainletter terminology screen 1" label="Chainletter terminology screen 1" />
            <ProjectImage src={CL_IMAGE(8)} alt="Chainletter terminology screen 2" label="Chainletter terminology screen 2" />
          </ProjectSubsection>
        </ProjectSubsection>

        <ProjectSubsection id="permanent-actions" title="2. Permanent Actions">
          <p>
            The core architectural challenge was separating editable, internal state from the point of
            no return. Quite a few actions within the UI had permanent consequences, and needed to
            be communicated as such in a way that empowers users, not burdens them.
          </p>
          <ProjectSubsection id="two-state-collection-model" title="The Core Solution: A Two-State Collection Model">
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
          </ProjectSubsection>
          <ProjectSubsection id="permanent-actions-additional-solutions" title="Additional solutions">
            <ul className="mb-0">
              <li>Added warning modals and non-editable fields post-stamping</li>
              <li>Used plain, direct language to explain consequences up front</li>
            </ul>
            <ProjectImage src={CL_IMAGE(10)} alt="Chainletter two-state collection screen 1" label="Chainletter two-state collection screen 1" />
            <ProjectImage src={CL_IMAGE(11)} alt="Chainletter two-state collection screen 2" label="Chainletter two-state collection screen 2" />
            <ProjectImage src={CL_IMAGE(12)} alt="Chainletter two-state collection screen 3" label="Chainletter two-state collection screen 3" />
          </ProjectSubsection>
        </ProjectSubsection>

        <ProjectSubsection id="file-upload-error-handling" title="3. File Upload UX & Error Handling">
          <p>
            The upload flow was hidden, lacked context on accepted file types, and gave poor feedback
            when something went wrong.
          </p>
          <ProjectSubsection id="file-upload-solution" title="Solution">
            <ul className="mb-0">
              <li>Made the file upload UI always visible and clearly labeled</li>
              <li>Grouped errors into two buckets: shown before upload and after upload</li>
              <li>Displayed error tables in modals so users could understand and fix issues quickly</li>
            </ul>
            <ProjectImage src={CL_IMAGE(13)} alt="Chainletter file upload screen 1" label="Chainletter file upload screen 1" />
            <ProjectImage src={CL_IMAGE(14)} alt="Chainletter file upload screen 2" label="Chainletter file upload screen 2" />
            <ProjectImage src={CL_IMAGE(15)} alt="Chainletter file upload screen 3" label="Chainletter file upload screen 3" />
          </ProjectSubsection>
        </ProjectSubsection>
      </ProjectSection>

      <ProjectSection id="tradeoffs-scope-decisions" title="Tradeoffs & Scope Decisions" dividerBefore>
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
      </ProjectSection>

      <ProjectSection id="outcomes" title="Outcomes" dividerBefore>
        <ProjectImage src={CL_IMAGE(16)} alt="Chainletter outcome screen 1" label="Chainletter outcome screen 1" />
        <ProjectImage src={CL_IMAGE(18)} alt="Chainletter outcome screen 2" label="Chainletter outcome screen 2" />
        <ProjectImage src={CL_IMAGE(19)} alt="Chainletter outcome screen 3" label="Chainletter outcome screen 3" />
        <ProjectImage src={CL_IMAGE(20)} alt="Chainletter outcome screen 4" label="Chainletter outcome screen 4" />
      </ProjectSection>

      <ProjectSection id="results" title="Results" dividerBefore>
        <ChainletterResults />
      </ProjectSection>
    </ProjectLayout>
  )
}
