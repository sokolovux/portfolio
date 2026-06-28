import { getProjectBySlug } from '../../constants/projects.js'
import { createTocItem } from '../../utils/toc.js'
import Divider from '../../components/Divider.jsx'
import ProjectLayout from '../../components/project/ProjectLayout.jsx'

const TOC_ITEMS = [
  createTocItem('Overview'),
  createTocItem('Product'),
  createTocItem('Brand & marketing'),
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
        Product featured 3x at the{' '}
        <a className="in-text-link" href="https://www.nrf.com/" target="_blank" rel="noopener noreferrer">
          National Retail Foundation
        </a>{' '}
        and funded by{' '}
        <a className="in-text-link" href="https://www.markcuban.com/" target="_blank" rel="noopener noreferrer">
          Mark Cuban
        </a>
        .
      </li>
      <li className={itemClassName}>
        Pilots launched with{' '}
        <a className="in-text-link" href="https://www.miagoaairport.com/" target="_blank" rel="noopener noreferrer">
          GOA International Airport
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
      </li>
      <li className={itemClassName}>
        Redesigned and handed off key features and flows, building trust with customers and investors.
      </li>
      <li className={itemClassName}>
        Design system overhauled and maintained across a year-long engagement, reducing time to market for
        new features and improving the overall look and feel.
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
    <ProjectLayout
      meta={meta}
      tocItems={TOC_ITEMS}
      results={<VoiceboxResults hero />}
      heroAfterResults={
        <div className="alert alert-info mb-0" role="alert">
          <h6 className="alert-heading mb-2">NDA notice</h6>
          <p className="mb-0">
            Due to an NDA, I&apos;m unable to show the majority of design work produced during my time at
            Voicebox. What follows is an overview of the initiatives I led, the decisions that shaped them,
            and the work I&apos;m able to share publicly.
          </p>
        </div>
      }
    >
      <div className="container py-5 d-flex flex-column gap-5">
        <section className="d-flex flex-column gap-4">
          <h4 id="overview">Overview</h4>
          <p>
            <a
              className="in-text-link"
              href="https://voicebox.ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              Voicebox
            </a>{' '}
            is a browser-based voice feedback platform for enterprise, letting brands capture, analyze, and
            act on customer voice across any surface. Deploy it anywhere: website, posters, business cards,
            digital apps. Customers record audio messages in over 100 languages and send them directly to the
            brand.
          </p>
          <p>
            For 13 months I was the sole designer, covering brand identity, marketing, core product UX, and
            front-end implementation. No design team, no inherited handoff process. I built the visual
            language, the product experience, and eventually the style layer of the codebase itself.
            Voicebox is backed by{' '}
            <a
              className="in-text-link"
              href="https://www.markcuban.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mark Cuban
            </a>
            , presented at NRF in Paris, Singapore, and NYC, and officially partnered with{' '}
            <a className="in-text-link" href="https://aws.amazon.com/" target="_blank" rel="noopener noreferrer">
              AWS
            </a>
            ,{' '}
            <a className="in-text-link" href="https://www.box.com/" target="_blank" rel="noopener noreferrer">
              Box
            </a>
            , and{' '}
            <a
              className="in-text-link"
              href="https://www.snowflake.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Snowflake
            </a>
            .
          </p>
        </section>

        <Divider />
        <section className="d-flex flex-column gap-4">
          <h4 id="product">Product</h4>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex flex-column gap-2">
              <h6 id="enterprise-readiness-overhaul">Enterprise-readiness overhaul</h6>
              <p>
                As Voicebox shifted toward enterprise, the existing app wasn&apos;t built for it. Over six
                weeks I audited the IA, identified gaps in how the product handled permissions, sharing,
                deployment, and billing, and designed a new end-to-end experience covering org management,
                plans, and payment flows. Delivered as high-fidelity Figma files with all edge cases defined.
              </p>
            </div>
            <div className="d-flex flex-column gap-2">
              <h6 id="recorder-redesign">Recorder redesign</h6>
              <p>
                The recorder is the core surface of the Voicebox ecosystem, the widget that gets embedded
                everywhere. I redesigned it from the ground up over a month: new layout, integrated contact
                form, improved customization controls, motion and animation specs, and responsive and
                embedding behavior. Also redesigned the in-app recorder customization interface.
              </p>
            </div>
            <div className="d-flex flex-column gap-2">
              <h6 id="actions-ui">Actions UI</h6>
              <p>
                Voicebox Actions routes voice messages into third-party services and triggers automations.
                The legacy UI was generating consistent customer complaints. I identified the failure points
                through customer feedback, iterated on solutions, and delivered high-fidelity Figma files
                covering all edge cases. Once engineering built the skeleton, I came in via Cursor and
                polished the UI directly in the codebase.
              </p>
            </div>
            <div className="d-flex flex-column gap-2">
              <h6 id="sign-in-sign-up-redesign">Sign in / Sign up redesign</h6>
              <p>
                The original auth flow predated the enterprise pivot. I redesigned it to support the full
                setup sequence: account creation, org setup, voicebox configuration, while improving the
                overall look and feel.
              </p>
            </div>
            <div className="d-flex flex-column gap-2">
              <h6 id="accessibility-input-for-snowflake">Accessibility input for Snowflake</h6>
              <p>
                Snowflake required the recorder to support text input alongside audio. I designed the
                keyboard input flow, extending the recorder&apos;s interaction model without disrupting
                existing behavior.
              </p>
            </div>
            <div className="d-flex flex-column gap-2">
              <h6 id="design-system">Design system</h6>
              <p>
                I started by scoping a custom token-based design system to eventually replace Bootstrap.
                After a few months, the team made the call to abandon that path. The custom system
                introduced complexity that wasn&apos;t justified for a team moving fast with full Bootstrap
                familiarity. Instead, I led a codebase cleanup and co-authored a living design.md file with
                the Head of Engineering: a running reference guiding both developers and AI coding agents on
                layout patterns, Bootstrap usage, and style conventions.
              </p>
            </div>
            <div className="d-flex flex-column gap-2">
              <h6 id="front-end-ownership">Front-end ownership</h6>
              <p>
                In my last four months, the workflow shifted. Figma handoffs were introducing ambiguity and
                slowing things down, so I moved to working directly in the codebase via Cursor, adjusting
                the design system in code, fixing UI inconsistencies, overriding Bootstrap components, and
                pushing PRs through review to production. I effectively owned the style layer of the app in
                code.
              </p>
            </div>
          </div>
        </section>

        <Divider />
        <section className="d-flex flex-column gap-4">
          <h4 id="brand-marketing">Brand & marketing</h4>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex flex-column gap-2">
              <h6 id="brand-identity">Brand identity</h6>
              <p>
                I built Voicebox&apos;s visual language from scratch: logo, color system, typography,
                overall design direction. The current logo on{' '}
                <a
                  className="in-text-link"
                  href="https://voicebox.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  voicebox.ai
                </a>{' '}
                evolved from the first version I designed.
              </p>
            </div>
            <div className="d-flex flex-column gap-2">
              <h6 id="marketing-video">Marketing video</h6>
              <p>
                In about a week and a half, I took the product from zero to its first marketing video:
                developed the concept, wrote the storyboard, found and hired a motion designer on Fiverr,
                wrote the brief, and managed it through delivery. The video directly helped land enterprise
                clients and investors.
              </p>
            </div>
            <div className="d-flex flex-column gap-2">
              <h6 id="vbx-to-directory">vbx.to directory</h6>
              <p>
                The founder and I conceived a public directory of business voiceboxes, think Yelp for voice
                feedback. I built the Webflow front-end and worked with an engineer to dynamically populate
                it from our database. Result: 261 live voiceboxes from brands including McDonald&apos;s,
                Alibaba, Audi, Boeing, and Canva.
              </p>
            </div>
            <div className="d-flex flex-column gap-2">
              <h6 id="client-pitch-decks">Client pitch decks</h6>
              <p>
                About 20–30% of my time was spent designing presentations for enterprise sales, pitching
                major retail, hospitality, publishing, and government clients across the US, UAE, and
                Southeast Asia. Specific names are under NDA.
              </p>
            </div>
          </div>
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
