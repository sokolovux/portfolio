import { getProjectBySlug } from '../../constants/projects.js'
import { createTocItem } from '../../utils/toc.js'
import ProjectImage from '../../components/project/ProjectImage.jsx'
import ProjectLayout from '../../components/project/ProjectLayout.jsx'
import ProjectResultsList, { ProjectResultsItem } from '../../components/project/ProjectResultsList.jsx'
import ProjectSection from '../../components/project/ProjectSection.jsx'
import ProjectSubsection from '../../components/project/ProjectSubsection.jsx'

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
  return (
    <ProjectResultsList hero={hero}>
      <ProjectResultsItem hero={hero}>
        Conceived, designed, and built the product solo from concept through deployment.
      </ProjectResultsItem>
      <ProjectResultsItem hero={hero}>
        Shipped end-to-end flows for discovery, listings, and roommate matching.
      </ProjectResultsItem>
      <ProjectResultsItem hero={hero}>Full stack on React, Supabase, Vercel, and Railway.</ProjectResultsItem>
    </ProjectResultsList>
  )
}

export default function RoomerangPage() {
  const meta = getProjectBySlug('roomerang')

  return (
    <ProjectLayout meta={meta} tocItems={TOC_ITEMS} results={<RoomerangResults hero />}>
      <ProjectSection id="overview" title="Overview">
        <p>{LOREM}</p>
        <p>{LOREM}</p>
        <ProjectImage label="Roomerang overview" />
        <ProjectSubsection id="context" title="Context">
          <p>{LOREM}</p>
        </ProjectSubsection>
      </ProjectSection>
      <ProjectSection id="research" title="Research" dividerBefore>
        <p>{LOREM}</p>
        <p>{LOREM}</p>
        <ProjectImage label="Roomerang research" />
      </ProjectSection>
      <ProjectSection id="design" title="Design" dividerBefore>
        <p>{LOREM}</p>
        <p>{LOREM}</p>
        <ProjectImage label="Roomerang design" />
      </ProjectSection>
      <ProjectSection id="outcome" title="Outcome" dividerBefore>
        <p>{LOREM}</p>
        <p>{LOREM}</p>
        <ProjectImage label="Roomerang outcome" />
      </ProjectSection>
      <ProjectSection id="results" title="Results" dividerBefore>
        <RoomerangResults />
      </ProjectSection>
    </ProjectLayout>
  )
}
