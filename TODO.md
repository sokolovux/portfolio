# Site TODO

## SEO & AEO

Currently the portfolio is a client-side SPA with no metadata strategy, crawl infrastructure, or structured data. The resources app is passcode-gated and not intended for indexing.

### Crawlability & rendering

- [ ] Prerender or SSR key routes (`/`, `/work/:slug`) so crawlers get full HTML without relying on JS
- [ ] Ensure hero text is crawlable on first paint — `TextScramble` currently renders random characters until the animation completes
- [ ] Add `public/robots.txt` (allow portfolio, disallow resources if applicable)
- [ ] Add `public/sitemap.xml` with `/` and all `/work/:slug` URLs

### Per-page metadata

- [ ] Per-route `<title>` and `<meta name="description">` (home + each project page)
- [ ] Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`)
- [ ] Twitter card tags
- [ ] Canonical URLs per route
- [ ] Default OG image asset in `public/`

### Structured data (AEO)

- [ ] JSON-LD `Person` schema on the home page (name, role, URL, sameAs links)
- [ ] JSON-LD `CreativeWork` / `WebPage` schema on project pages
- [ ] Replace placeholder lorem ipsum with real, factual copy (bio, project summaries) that answer engines can cite

### Content & URL structure

- [ ] Flesh out project pages (`/work/:slug`) with real case study content
- [ ] Decide whether landing sections (Experience, About, Contact) stay as hash anchors or become separate indexable routes
- [ ] Add favicon and other static assets under `public/`

### Resources app

- [ ] Confirm `robots.txt` / meta robots blocks indexing of the passcode-gated resources site

## Performance

- [ ] Do a comprehensive performance/speed checkup of the site

## Domain

- [ ] Reroute the maximsokolov.com domain to hisokolov.com
