import { getProjectBySlug } from '../../constants/projects.js'
import { createTocItem } from '../../utils/toc.js'
import ProjectImage from '../../components/project/ProjectImage.jsx'
import ProjectLayout from '../../components/project/ProjectLayout.jsx'
import ProjectSection from '../../components/project/ProjectSection.jsx'
import ProjectSubsection from '../../components/project/ProjectSubsection.jsx'

const TOC_ITEMS = [
  createTocItem('Overview'),
  createTocItem('The starting point'),
  createTocItem('The core UX challenge'),
  createTocItem('The solution'),
  createTocItem('Outcome'),
]

export default function ChainletterPage() {
  const meta = getProjectBySlug('chainletter')

  return (
    <ProjectLayout meta={meta} tocItems={TOC_ITEMS}>
      <ProjectSection id="overview" title="Overview">
        <p>
          Chainletter enables universities and credential-issuing institutions to distribute diplomas
          and official documents that are permanently verifiable on the blockchain. Once a file is
          recorded, its authenticity can be confirmed forever. No central authority required.
        </p>
        <p>
          I came on as the lead designer, but my role was broader than that. I co-led the product
          alongside the founding engineer, running stakeholder calls, synthesizing feedback from the
          founder, engineer, and finance lead, and making final product decisions. We built the full
          roadmap together and shipped in 1.5 months.
        </p>
      </ProjectSection>
      <ProjectSection id="the-starting-point" title="The starting point" dividerBefore>
        <ProjectSubsection>
          <p>
            This was the product when I joined. A functional but raw interface: terminology
            borrowed directly from the blockchain layer (&quot;Postmarks,&quot; &quot;Pinata
            groups&quot;), a visual language closer to a government IT portal than a tool
            administrators would trust with official documents, and third-party dependencies surfaced
            as footnotes.
          </p>
          <ProjectImage label="Chainletter dashboard before redesign" />
        </ProjectSubsection>
        <ProjectSubsection>
          <p>
            The Groups page was a raw data table with no status, no context, and debug panels
            visible at the bottom.
          </p>
          <ProjectImage label="Chainletter groups table before redesign" />
        </ProjectSubsection>
        <ProjectSubsection>
          <p>
            The product worked. It just didn&apos;t feel like it could be trusted with a graduating
            class&apos;s diplomas.
          </p>
        </ProjectSubsection>
      </ProjectSection>
      <ProjectSection id="the-core-ux-challenge" title="The core UX challenge" dividerBefore>
        <p>
          The primary users were school administrators in their 40s and 50s: people who distribute
          diplomas, not people who think about blockchain. The technology had to disappear entirely.
          If a user had to understand what blockchain meant to use the product, we&apos;d already
          failed.
        </p>
        <p>Three specific problems shaped the design:</p>
        <ProjectSubsection id="permanent-actions-with-no-undo" title="Permanent actions with no undo">
          <p>
            Recording a file on the blockchain is irreversible. A misclick isn&apos;t a mistake you
            fix. It&apos;s a mistake that lives forever. The UI had to make the stakes of each
            action viscerally clear without creating so much friction that the product became
            unusable.
          </p>
        </ProjectSubsection>
        <ProjectSubsection id="terminology-that-alienates" title="Terminology that alienates">
          <p>
            Words like &quot;postmark,&quot; &quot;ledger,&quot; and &quot;Pinata group&quot; are
            accurate but hostile to non-technical users. Every label, tooltip, and confirmation copy
            had to be rewritten in plain language without losing precision.
          </p>
        </ProjectSubsection>
        <ProjectSubsection id="file-upload-error-handling" title="File upload error handling">
          <p>
            Institutions are distributing official documents. A failed or corrupted upload has real
            consequences. Error states needed to be explicit, recoverable, and trust-preserving.
          </p>
        </ProjectSubsection>
      </ProjectSection>
      <ProjectSection id="the-solution" title="The solution" dividerBefore>
        <ProjectSubsection>
          <p>
            Even the login screen set a new tone: warm, direct copy replacing the clinical default.
          </p>
          <ProjectImage label="Chainletter login screen" />
        </ProjectSubsection>
        <ProjectSubsection>
          <p>
            &quot;Postmark groups&quot; became Collections. &quot;Stamps&quot; replaced
            &quot;postmarks,&quot; still accurate, but immediately legible to anyone who has ever
            certified a document. The status system, Not stamped, Stamped (partial), Stamped, gave
            administrators a clear at-a-glance view of where every credential batch stood. The
            Princeton University context here is intentional: the product needed to feel worthy of
            institutional trust.
          </p>
          <ProjectImage label="Chainletter collections dashboard with stamp status" />
        </ProjectSubsection>
        <ProjectSubsection
          id="the-two-step-collection-creation-flow"
          title="The two-step collection creation flow"
        >
          <p>
            This was the most important design decision of the project. Administrators first define
            an internal name and description, visible only to their team. Then a separate external
            identity: the public-facing name, access type, and description that recipients and
            verifiers will see.
          </p>
          <ProjectImage label="Create collection step 1, internal details" />
        </ProjectSubsection>
        <ProjectSubsection>
          <p>
            This separation wasn&apos;t a technical requirement. It was a UX insight: giving
            administrators a private working layer removed the anxiety of getting public-facing
            details wrong before they were ready to commit.
          </p>
          <ProjectImage label="Create collection step 2, external details" />
        </ProjectSubsection>
        <ProjectSubsection
          id="making-permanence-feel-intentional"
          title="Making permanence feel intentional"
        >
          <p>
            Before any collection is recorded on the blockchain, a confirmation modal surfaces the
            stakes plainly: &quot;This collection will exist permanently in Chainletter.&quot; One
            decision point, clearly framed, impossible to miss.
          </p>
          <ProjectImage label="Permanence confirmation modal" />
        </ProjectSubsection>
        <ProjectSubsection id="the-collection-workspace" title="The collection workspace">
          <p>
            The collection detail view separates the work surface (upload zone, file list) from the
            collection&apos;s identity (details panel). Internal and external names are both visible,
            reinforcing the two-layer mental model throughout the workflow, not just during
            creation.
          </p>
          <ProjectImage label="Collection detail empty upload state" />
        </ProjectSubsection>
        <ProjectSubsection id="error-handling" title="Error handling">
          <p>
            When uploads fail, the error state surfaces each file individually with a specific
            reason, duplicate or unknown error, and gives two clear recovery paths: Try again or
            Continue. No vague failure message, no lost progress.
          </p>
          <ProjectImage label="Upload error modal with file breakdown" />
        </ProjectSubsection>
        <ProjectSubsection id="the-stamping-moment" title="The stamping moment">
          <p>
            Even the loading state got attention. Stamping hundreds of files to the blockchain takes
            time. &quot;Give us a moment...&quot; acknowledges the wait without making it feel like
            something went wrong.
          </p>
          <ProjectImage label="Stamping loading state" />
        </ProjectSubsection>
      </ProjectSection>
      <ProjectSection id="outcome" title="Outcome" dividerBefore>
        <p>
          Chainletter shipped and was piloted at multiple universities. The product has since grown
          into Chainletter Labs, now serving legal, enterprise, and AI artifact verification use
          cases, with a developer API and institutional backing.
        </p>
      </ProjectSection>
    </ProjectLayout>
  )
}
