import { Navigate, useParams } from 'react-router-dom'
import { getProjectBySlug } from '../constants/projects.js'
import ProjectPage from './ProjectPage.jsx'

export default function ProjectRoute() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) {
    return <Navigate to="/" replace />
  }

  return <ProjectPage project={project} />
}
