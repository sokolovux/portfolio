import { getProjectBySlug } from '../constants/projects.js'
import {
  DEFAULT_PAGE_META,
  getProjectPageMeta,
  HOME_PAGE_META,
} from '../constants/site.js'

export function getRouteMeta(pathname) {
  if (pathname === '/') {
    return HOME_PAGE_META
  }

  if (pathname === '/capture') {
    return {
      title: 'Folioscroll',
      description: 'Internal scroll capture tool.',
      path: '/capture',
      robots: 'noindex, nofollow',
    }
  }

  const projectSlug = pathname.match(/^\/work\/([^/]+)$/)?.[1]

  if (projectSlug) {
    const project = getProjectBySlug(projectSlug)

    if (project) {
      return getProjectPageMeta(project)
    }
  }

  return {
    ...DEFAULT_PAGE_META,
    path: pathname,
  }
}
