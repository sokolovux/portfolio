import { getProjectBySlug } from '../constants/projects.js'
import {
  DEFAULT_OG_IMAGE,
  HOME_PAGE_META,
  SITE_NAME,
  SITE_ROLE,
  SITE_SAME_AS,
  absoluteUrl,
  getProjectPageMeta,
} from '../constants/site.js'

function buildPersonReference() {
  return {
    '@type': 'Person',
    name: SITE_NAME,
    url: absoluteUrl('/'),
  }
}

export function buildPersonJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_NAME,
    url: absoluteUrl('/'),
    jobTitle: SITE_ROLE,
    description: HOME_PAGE_META.description,
    image: absoluteUrl(DEFAULT_OG_IMAGE),
  }

  const sameAs = SITE_SAME_AS.filter(Boolean)

  if (sameAs.length > 0) {
    schema.sameAs = sameAs
  }

  return schema
}

export function buildCreativeWorkJsonLd(project) {
  const meta = getProjectPageMeta(project)

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: meta.description,
    url: absoluteUrl(meta.path),
    image: meta.image.startsWith('http') ? meta.image : absoluteUrl(meta.image),
    author: buildPersonReference(),
    creator: buildPersonReference(),
  }
}

export function getRouteJsonLd(pathname) {
  if (pathname === '/') {
    return buildPersonJsonLd()
  }

  const projectSlug = pathname.match(/^\/work\/([^/]+)$/)?.[1]

  if (projectSlug) {
    const project = getProjectBySlug(projectSlug)

    if (project) {
      return buildCreativeWorkJsonLd(project)
    }
  }

  return null
}
