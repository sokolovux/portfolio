import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes.jsx'
import { renderHeadTags } from './utils/documentMeta.js'
import { getRouteMeta } from './utils/getRouteMeta.js'
import { getRouteJsonLd } from './utils/structuredData.js'

export function render(url) {
  const html = renderToString(
    <StrictMode>
      <MemoryRouter initialEntries={[url]}>
        <AppRoutes />
      </MemoryRouter>
    </StrictMode>,
  )

  return {
    html,
    head: renderHeadTags(getRouteMeta(url), getRouteJsonLd(url)),
  }
}
