import ProjectSection from './ProjectSection.jsx'

export default function ProjectResults({ meta }) {
  return (
    <ProjectSection id="results" title="Results" dividerBefore>
      <ul className="d-flex flex-column gap-2 mb-0">
        {meta.results.map((result, index) => (
          <li key={`${meta.slug}-result-${index}`} className="lead">{result}</li>
        ))}
      </ul>
    </ProjectSection>
  )
}
