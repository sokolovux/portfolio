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

function KyruusHealthResults({ hero = false }) {
  return (
    <ProjectResultsList hero={hero}>
      <ProjectResultsItem hero={hero}>
        64% reduction in accessibility debt (60 of 93 tickets resolved).
      </ProjectResultsItem>
      <ProjectResultsItem hero={hero}>
        Established repeatable accessibility patterns across the design system.
      </ProjectResultsItem>
      <ProjectResultsItem hero={hero}>
        Improved compliance posture for a regulated healthcare product.
      </ProjectResultsItem>
    </ProjectResultsList>
  )
}

export default function KyruusHealthPage() {
  const meta = getProjectBySlug('kyruus-health')

  return (
    <ProjectLayout meta={meta} tocItems={TOC_ITEMS} results={<KyruusHealthResults hero />}>
      <ProjectSection id="overview" title="Overview">
        <p>{LOREM}</p>
        <p>{LOREM}</p>
        <ProjectImage label="Kyruus Health overview" />
        <ProjectSubsection id="context" title="Context">
          <p>{LOREM}</p>
        </ProjectSubsection>
      </ProjectSection>
      <ProjectSection id="research" title="Research" dividerBefore>
        <p>{LOREM}</p>
        <p>{LOREM}</p>
        <ProjectImage label="Kyruus Health research" />
      </ProjectSection>
      <ProjectSection id="design" title="Design" dividerBefore>
        <p>{LOREM}</p>
        <p>{LOREM}</p>
        <ProjectImage label="Kyruus Health design" />
      </ProjectSection>
      <ProjectSection id="outcome" title="Outcome" dividerBefore>
        <p>{LOREM}</p>
        <p>{LOREM}</p>
        <ProjectImage label="Kyruus Health outcome" />
      </ProjectSection>
      <ProjectSection id="results" title="Results" dividerBefore>
        <KyruusHealthResults />
      </ProjectSection>
    </ProjectLayout>
  )
}
