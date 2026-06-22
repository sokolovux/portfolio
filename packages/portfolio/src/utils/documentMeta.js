import { DEFAULT_OG_IMAGE, SITE_NAME, absoluteUrl } from '../constants/site.js'

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll('"', '&quot;')
}

export function buildDocumentMeta({
  title,
  description,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  type = 'website',
}) {
  const canonicalUrl = absoluteUrl(path)
  const imageUrl = image.startsWith('http') ? image : absoluteUrl(image)

  return {
    title,
    description,
    path,
    image: imageUrl,
    type,
    canonicalUrl,
  }
}

function serializeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export function renderJsonLdScript(data) {
  if (!data) {
    return ''
  }

  return `<script type="application/ld+json">${serializeJsonLd(data)}</script>`
}

function upsertJsonLd(data) {
  const id = 'route-json-ld'
  let element = document.getElementById(id)

  if (!data) {
    element?.remove()
    return
  }

  if (!element) {
    element = document.createElement('script')
    element.id = id
    element.type = 'application/ld+json'
    document.head.appendChild(element)
  }

  element.textContent = JSON.stringify(data)
}

export function renderHeadTags(meta, jsonLd = null) {
  const {
    title,
    description,
    type,
    canonicalUrl,
    image: imageUrl,
  } = buildDocumentMeta(meta)

  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeAttr(description)}" />`,
    `<link rel="canonical" href="${escapeAttr(canonicalUrl)}" />`,
    `<meta property="og:type" content="${escapeAttr(type)}" />`,
    `<meta property="og:site_name" content="${escapeAttr(SITE_NAME)}" />`,
    `<meta property="og:title" content="${escapeAttr(title)}" />`,
    `<meta property="og:description" content="${escapeAttr(description)}" />`,
    `<meta property="og:url" content="${escapeAttr(canonicalUrl)}" />`,
    `<meta property="og:image" content="${escapeAttr(imageUrl)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(description)}" />`,
    `<meta name="twitter:image" content="${escapeAttr(imageUrl)}" />`,
  ]

  const jsonLdScript = renderJsonLdScript(jsonLd)

  if (jsonLdScript) {
    tags.push(jsonLdScript)
  }

  return tags.join('\n    ')
}

function upsertMeta(attributes) {
  const selector = Object.entries(attributes)
    .map(([key, value]) => `[${key}="${CSS.escape(value)}"]`)
    .join('')

  let element = document.head.querySelector(`meta${selector}`)

  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })
}

function upsertCanonical(href) {
  let element = document.head.querySelector('link[rel="canonical"]')

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'canonical')
    document.head.appendChild(element)
  }

  element.setAttribute('href', href)
}

export function applyDocumentMeta(meta) {
  const {
    title,
    description,
    type,
    canonicalUrl,
    image: imageUrl,
  } = buildDocumentMeta(meta)

  document.title = title
  upsertCanonical(canonicalUrl)
  upsertMeta({ name: 'description', content: description })
  upsertMeta({ property: 'og:type', content: type })
  upsertMeta({ property: 'og:site_name', content: SITE_NAME })
  upsertMeta({ property: 'og:title', content: title })
  upsertMeta({ property: 'og:description', content: description })
  upsertMeta({ property: 'og:url', content: canonicalUrl })
  upsertMeta({ property: 'og:image', content: imageUrl })
  upsertMeta({ name: 'twitter:card', content: 'summary_large_image' })
  upsertMeta({ name: 'twitter:title', content: title })
  upsertMeta({ name: 'twitter:description', content: description })
  upsertMeta({ name: 'twitter:image', content: imageUrl })
}

export function applyJsonLd(data) {
  upsertJsonLd(data)
}
