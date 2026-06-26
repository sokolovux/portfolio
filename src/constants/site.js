export const SITE_NAME = 'Maxim Sokolov'

export const SITE_ROLE = 'UX/UI designer & engineer'

export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? 'https://hisokolov.com').replace(/\/$/, '')

export const DEFAULT_OG_IMAGE = '/og-default.png'

export const SITE_LINKEDIN = 'https://www.linkedin.com/in/max-dezine/'
export const SITE_GITHUB = 'https://github.com/sokolovux'

export const SITE_SAME_AS = [SITE_LINKEDIN, SITE_GITHUB].filter(Boolean)

// Base64-encoded so the address is not plain text in HTML or bundled constants.
const SITE_EMAIL_ENCODED = 'bXNAaGlzb2tvbG92LmNvbQ=='

export function getSiteEmail() {
  return atob(SITE_EMAIL_ENCODED)
}

export const HOME_PAGE_META = {
  title: `${SITE_NAME} | ${SITE_ROLE}`,
  description:
    'Portfolio of Maxim Sokolov, a UX/UI designer and engineer building thoughtful product experiences and front-end interfaces.',
  path: '/',
}

export const DEFAULT_PAGE_META = {
  title: SITE_NAME,
  description: HOME_PAGE_META.description,
}

export function absoluteUrl(path) {
  if (!path || path === '/') {
    return `${SITE_URL}/`
  }

  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export function getProjectPageMeta(project) {
  return {
    title: `${project.title} | ${SITE_NAME}`,
    description: project.overview,
    path: project.href,
    type: 'article',
    image: project.ogImage ?? DEFAULT_OG_IMAGE,
  }
}
