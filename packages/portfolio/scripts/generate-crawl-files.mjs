import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { PRERENDER_ROUTES } from '../src/constants/projects.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const packageRoot = path.resolve(__dirname, '..')
const distDir = path.join(packageRoot, 'dist')
const publicDir = path.join(packageRoot, 'public')

const SITE_URL = (process.env.VITE_SITE_URL ?? 'https://hisokolov.com').replace(/\/$/, '')

const DISALLOW_PATHS = ['/api/', '/ds', '/ascii-dev']

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function absoluteUrl(route) {
  if (!route || route === '/') {
    return `${SITE_URL}/`
  }

  return `${SITE_URL}${route}`
}

function renderRobotsTxt() {
  const lines = ['User-agent: *', 'Allow: /', '']

  for (const disallowedPath of DISALLOW_PATHS) {
    lines.push(`Disallow: ${disallowedPath}`)
  }

  lines.push('', `Sitemap: ${SITE_URL}/sitemap.xml`)

  return `${lines.join('\n')}\n`
}

function renderSitemapXml() {
  const urlEntries = PRERENDER_ROUTES.map(
    (route) => `  <url>\n    <loc>${escapeXml(absoluteUrl(route))}</loc>\n  </url>`,
  )

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urlEntries,
    '</urlset>',
    '',
  ].join('\n')
}

function writeCrawlFile(relativePath, contents) {
  fs.mkdirSync(distDir, { recursive: true })
  fs.mkdirSync(publicDir, { recursive: true })

  fs.writeFileSync(path.join(distDir, relativePath), contents)
  fs.writeFileSync(path.join(publicDir, relativePath), contents)
}

writeCrawlFile('robots.txt', renderRobotsTxt())
writeCrawlFile('sitemap.xml', renderSitemapXml())

console.log(`generated robots.txt and sitemap.xml (${PRERENDER_ROUTES.length} urls) for ${SITE_URL}`)
