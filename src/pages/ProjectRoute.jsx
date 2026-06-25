import { Navigate, useParams } from 'react-router-dom'
import { getProjectBySlug } from '../constants/projects.js'
import { getProjectPage } from './projectPages.js'

export default function ProjectRoute() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)
  const ProjectPage = getProjectPage(slug)

  if (!project || !ProjectPage) {
    return <Navigate to="/" replace />
  }

  return <ProjectPage />
}
