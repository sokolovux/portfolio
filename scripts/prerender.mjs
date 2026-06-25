import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { PRERENDER_ROUTES } from '../src/constants/projects.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '../dist')
const templatePath = path.join(distDir, 'index.html')
const rootMarker = '<div id="root"></div>'

function routeToFilePath(route) {
  if (route === '/') {
    return path.join(distDir, 'index.html')
  }

  return path.join(distDir, route.slice(1), 'index.html')
}

function injectAppHtml(template, appHtml) {
  if (!template.includes(rootMarker)) {
    throw new Error('Expected prerender template to contain an empty #root element.')
  }

  return template.replace(rootMarker, `<div id="root">${appHtml}</div>`)
}

function injectHead(template, headHtml) {
  if (!headHtml) {
    return template
  }

  return template.replace('</head>', `    ${headHtml}\n  </head>`)
}

const baseTemplate = fs.readFileSync(templatePath, 'utf-8').replace(/<title>[\s\S]*?<\/title>\s*/i, '')
const { render } = await import(pathToFileURL(path.join(distDir, 'server/entry-server.js')).href)

for (const route of PRERENDER_ROUTES) {
  const { html, head } = render(route)
  const pageHtml = injectHead(injectAppHtml(baseTemplate, html), head)
  const filePath = routeToFilePath(route)

  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, pageHtml)
  console.log(`prerendered ${route} -> ${path.relative(distDir, filePath)}`)
}
