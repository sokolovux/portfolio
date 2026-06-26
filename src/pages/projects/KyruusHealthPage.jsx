import { getProjectBySlug } from '../../constants/projects.js'
import { createTocItem } from '../../utils/toc.js'
import Divider from '../../components/Divider.jsx'
import ProjectLayout from '../../components/project/ProjectLayout.jsx'

const TOC_ITEMS = [
  createTocItem('Overview'),
  createTocItem('The challenge'),
  createTocItem('My process'),
  createTocItem('Scope and results'),
  createTocItem('SignaturePad replacement'),
  createTocItem('Results'),
]

function KyruusHealthResults({ hero = false }) {
  const listClassName = hero
    ? 'd-flex flex-column gap-2 mb-0 small'
    : 'd-flex flex-column gap-2 mb-0'
  const itemClassName = hero ? undefined : 'lead'

  return (
    <ul className={listClassName}>
      <li className={itemClassName}>
        Resolved all 69 audit tickets within a 3-month window, solo in a 400+ person organization
        with no dedicated accessibility team.
      </li>
      <li className={itemClassName}>
        Handed off 60 dev-ready tickets to engineering; 40%+ were implemented during my tenure.
      </li>
      <li className={itemClassName}>
        Delivered the largest single accessibility improvement in Kyruus Health&apos;s history.
      </li>
      <li className={itemClassName}>
        Moved the Pre-Visit product meaningfully closer to full WCAG 2.1 AA compliance, from
        significant access barriers to a product that works for screen-reader users, keyboard-only
        users, and users with mobility impairments.
      </li>
      <li className={itemClassName}>
        Established a repeatable remediation process, documentation system, and cross-functional
        workflow that the team could build on after my departure.
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
          <p>
            Kyruus Health is a Boston-based healthcare technology company serving over 400 employees.
            Their flagship product, Pre-Visit, is a patient check-in application used by healthcare
            providers across the US. In 2023, an external accessibility audit conducted by an audit
            firm identified 69 issues across the product, ranging from critical access blocks to
            moderate usability gaps, against WCAG 2.1 AA standards.
          </p>
          <p>
            I was the sole designer tasked with resolving the entire audit over a 3-month period,
            working across design, engineering, and legal in a 400+ person organization to move the
            needle on what became the largest accessibility improvement in the company&apos;s history.
          </p>
          <img
            src="/work/kyruus-health/kh-logo.png"
            alt="Kyruus Health logo"
            className="img-fluid border w-100"
          />
        </section>

        <Divider />
        <section className="d-flex flex-column gap-4">
          <h4 id="the-challenge">The challenge</h4>
          <p>
            Kyruus had committed to WCAG 2.1 AA compliance following an external audit by an audit
            firm. The audit surfaced 69 issues across the
            Pre-Visit product: 8 critical access blocks, 21 significant barriers, and 24 moderate
            friction points, spanning every major user flow in the application.
          </p>
          <p>
            The challenge wasn&apos;t just the volume. I was operating as the only person dedicated
            to this initiative in a company of over 400. There was no accessibility team, no
            established remediation process, and the product was mid-migration from one design system
            (M2) to another (MUI/M3), which added constraint to every solution. Every ticket required
            coordinating with developers and cross-referencing with both the audit firm and, in some
            cases, the legal team.
          </p>
          <p>
            My job was to translate 69 external audit findings into actionable, dev-ready design
            decisions, scoped, prioritized, and documented, while maintaining alignment across
            engineering, legal, and product.
          </p>
        </section>

        <Divider />
        <section className="d-flex flex-column gap-4">
          <h4 id="my-process">My process</h4>
          <p>
            Because I was working alone at scale, I needed a repeatable process I could apply
            consistently across all 69 tickets in a short window. I built a tracking system in Google
            Sheets, carrying over all audit data from the audit firm&apos;s platform, where I documented every
            ticket&apos;s status, my notes, communications, and decisions throughout the initiative.
          </p>
          <p>For each ticket, I followed five steps:</p>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex flex-column gap-2">
              <h6 id="ticket-analysis">1. Ticket analysis and WCAG guideline review</h6>
              <p>
                Review the ticket against the relevant WCAG criterion, coordinate with the audit
                firm for clarification on requirements and intent.
              </p>
            </div>
            <div className="d-flex flex-column gap-2">
              <h6 id="current-solution-assessment">2. Current solution assessment</h6>
              <p>
                Examine the existing implementation from both a user-facing and code perspective, in
                collaboration with the dev team.
              </p>
            </div>
            <div className="d-flex flex-column gap-2">
              <h6 id="technical-legal-constraints">3. Identify technical and legal constraints</h6>
              <p>
                Map what&apos;s feasible given the MUI migration, development scope, and any legal
                considerations (HIPAA compliance being a recurring factor in a healthcare product).
              </p>
            </div>
            <div className="d-flex flex-column gap-2">
              <h6 id="research-iteration-proposal">4. Research, iteration, and proposal</h6>
              <p>
                Iterate on solutions, pressure-test with devs and the design team, and produce a final
                dev-ready ticket with designs where required.
              </p>
            </div>
            <div className="d-flex flex-column gap-2">
              <h6 id="documentation-tracking">5. Documentation and tracking</h6>
              <p>
                Record all decisions, communications, and outcomes in Jira and Sheets for full team
                visibility and future reference.
              </p>
            </div>
          </div>
          <img
            src="/work/kyruus-health/kh-table.png"
            alt="Kyruus Health accessibility remediation tracking spreadsheet"
            className="img-fluid border w-100"
          />
        </section>

        <Divider />
        <section className="d-flex flex-column gap-4">
          <h4 id="scope-and-results">Scope and results</h4>
          <p>
            Over 3 months, I worked through all 69 audit tickets, analyzing, scoping, designing, and
            handing off to the development team. The work spanned the full complexity spectrum: from
            quick wins like color contrast adjustments, alt-text revisions, and ARIA label additions,
            to medium-complexity tickets requiring new component designs, restructured flows, and
            cross-functional alignment.
          </p>
          <p>A few notable tickets beyond the quick-win category:</p>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex flex-column gap-2">
              <h6 id="medication-buttons">Taking / not taking medication buttons (E-408, E-409)</h6>
              <p>
                Two related critical-impact tickets: the medication status buttons weren&apos;t
                identifiable as selectable objects by screen readers, and their selected state was
                communicated by color alone, invisible to users who can&apos;t distinguish color. I
                explored edge cases and potential flows in Figma before creating dev-ready tickets
                addressing both the ARIA role issue and a visible state indicator to replace color-only
                feedback.
              </p>
            </div>
            <div className="d-flex flex-column gap-2">
              <h6 id="race-field-chips">Race field and chips (E-291, E-426)</h6>
              <p>
                Two critical tickets around a custom race-selection component. The &quot;Race&quot;
                label wasn&apos;t identified as a selectable object by screen readers, and the resulting
                chip selections weren&apos;t structured as buttons, leaving screen-reader users with no
                way to interact with or remove them. I worked with the team to restructure the
                component as an accessible input pattern.
              </p>
            </div>
            <div className="d-flex flex-column gap-2">
              <h6 id="modal-restructure">Modal restructure (E-264, E-413)</h6>
              <p>
                The Terms of Use modal and the check-in flow&apos;s modal carousel both had focus
                management issues: screen reader and keyboard focus wasn&apos;t being directed correctly
                on open. I collaborated with engineering on a restructured modal component using the
                MUI M2 base, styled toward M3 specifications, to resolve the focus behavior across
                both tickets simultaneously.
              </p>
            </div>
          </div>
        </section>

        <Divider />
        <section className="d-flex flex-column gap-4">
          <h4 id="signaturepad-replacement">SignaturePad replacement</h4>
          <p>
            Of all the tickets in the audit, the SignaturePad replacement was the most complex and
            the most impactful. It was a critical-severity ticket, meaning it represented a total block
            of access, and it affected nearly every user flow in the product.
          </p>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex flex-column gap-2">
              <h6 id="the-problem">The problem</h6>
              <p>
                The on-screen signing component, SignaturePad, required users to drag a finger or
                pointer across the screen to produce a signature. This made it completely inaccessible
                to screen-reader users, keyboard-only users, and anyone with a mobility impairment or
                condition affecting fine motor control.
              </p>
              <p>
                Since a signature was required to complete nearly every flow in the Pre-Visit
                application (consent forms, patient intake, insurance verification), this wasn&apos;t a
                niche edge case. It was a gate that blocked a significant portion of users from using
                the product at all.
              </p>
              <img
                src="/work/kyruus-health/kh-1.png"
                alt="Current SignaturePad flows"
                className="img-fluid border w-100"
              />
              <img
                src="/work/kyruus-health/kh-2.png"
                alt="SignaturePad in Pre-Visit consent and intake flows"
                className="img-fluid border w-100"
              />
            </div>

            <div className="d-flex flex-column gap-2">
              <h6 id="research-four-options">Research: four options</h6>
              <p>
                The audit firm pointed us toward DocuSign as a reference for
                accessible e-signature patterns. After reviewing DocuSign and other e-signature tools,
                we identified four candidate approaches:
              </p>
              <div className="d-flex flex-column gap-3">
                <div className="ps-3 py-2 border-start d-flex flex-column gap-1">
                  <h6 id="option-1-draw">Option 1: Draw (current)</h6>
                  <p>
                    The existing solution. Inaccessible to screen-reader users, keyboard-only users,
                    and those with motor disabilities. Could not stand alone as the only option.
                  </p>
                </div>
                <div className="ps-3 py-2 border-start d-flex flex-column gap-1">
                  <h6 id="option-2-upload">Option 2: Upload image</h6>
                  <p>
                    Allowed users to upload a photo of a handwritten signature. Added significant
                    friction, requiring a user to draw on paper, photograph it, and upload, and did
                    nothing to solve the core problem for users who couldn&apos;t draw a signature in
                    the first place.
                  </p>
                </div>
                <div className="ps-3 py-2 border-start d-flex flex-column gap-1">
                  <h6 id="option-3-checkbox">Option 3: Checkbox</h6>
                  <p>
                    A simple &quot;I agree&quot; checkbox, familiar from Terms &amp; Conditions flows
                    across the web. Detectable by screen readers and operable by keyboard. Promising,
                    but we had no clarity on whether this met HIPAA compliance requirements for a
                    legally binding signature in a healthcare context. Flagged for legal review.
                  </p>
                </div>
                <div className="ps-3 py-2 border-start d-flex flex-column gap-1">
                  <h6 id="option-4-type">Option 4: Type</h6>
                  <p>
                    A text input where users type their full name, which is then rendered as a
                    handwritten-style signature. Recommended directly by the audit firm. Fully
                    accessible if the input field is screen-reader compatible. Also flagged for legal
                    review before proceeding.
                  </p>
                </div>
              </div>
              <div className="row g-3">
                <div className="col-md-6">
                  <img
                    src="/work/kyruus-health/kh-3.png"
                    alt="Option 1: Draw e-signature reference"
                    className="img-fluid border w-100"
                  />
                </div>
                <div className="col-md-6">
                  <img
                    src="/work/kyruus-health/kh-4.png"
                    alt="Option 2: Upload image e-signature reference"
                    className="img-fluid border w-100"
                  />
                </div>
                <div className="col-md-6">
                  <img
                    src="/work/kyruus-health/kh-5.png"
                    alt="Option 3: Checkbox e-signature reference"
                    className="img-fluid border w-100"
                  />
                </div>
                <div className="col-md-6">
                  <img
                    src="/work/kyruus-health/kh-6.png"
                    alt="Option 4: Type e-signature reference"
                    className="img-fluid border w-100"
                  />
                </div>
              </div>
            </div>

            <div className="d-flex flex-column gap-2">
              <h6 id="legal-review">Legal review</h6>
              <p>
                Both the Checkbox and Type options required legal sign-off before we could move forward,
                specifically on whether each method constituted a valid, HIPAA-compliant e-signature
                in a healthcare context.
              </p>
              <p>
                I prepared a presentation outlining both options, their accessibility rationale, and
                the technical feasibility of each, and presented it to the legal team. After review,
                legal approved the Type option and ruled out the Checkbox, which did not meet HIPAA
                compliance requirements for a binding signature.
              </p>
            </div>

            <div className="d-flex flex-column gap-2">
              <h6 id="design">Design</h6>
              <p>
                With the Type solution approved, the next challenge was implementation within the
                constraints of the ongoing MUI migration. All components had to stay within the MUI
                framework, with slight visual modifications if deemed necessary.
              </p>
              <p>
                MUI offered two components with tab-like switching behavior: Tab and Button Group. I
                explored both, testing different layouts and placements within the signature UI. I
                ultimately chose Tab, positioned above the signature area as it followed the natural reading
                pattern from top to bottom and thus created a better visual hierarchy:
              </p>
              <img
                src="/work/kyruus-health/kh-7.png"
                alt="SignaturePad Tab and Button Group layout exploration"
                className="img-fluid border w-100"
              />
              <img
                src="/work/kyruus-health/kh-8.png"
                alt="SignaturePad design iterations and layout exploration"
                className="img-fluid border w-100"
              />
            </div>

            <div className="d-flex flex-column gap-2">
              <h6 id="solution">Solution</h6>
              <p>
                The final solution presented users with a Tab group component between Draw and Type
                modes, positioned directly above the signature area. The Type input field was fully
                screen-reader accessible and keyboard operable. With some visual customization to align
                the MUI component with the existing application style, the ticket was ready for
                engineering handoff.
              </p>
              <p>
                The result: a signature component that maintained the existing Draw experience for
                users who preferred it, while providing a fully accessible Type alternative, removing
                a critical access block from the most user-critical component in the entire product.
              </p>
              <img
                src="/work/kyruus-health/kh-9.png"
                alt="Final SignaturePad solution, Draw mode"
                className="img-fluid border w-100"
              />
              <img
                src="/work/kyruus-health/kh-10.png"
                alt="Final SignaturePad solution, Type mode"
                className="img-fluid border w-100"
              />
            </div>
          </div>
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
