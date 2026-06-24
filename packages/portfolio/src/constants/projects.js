export const PROJECTS = [
  {
    slug: 'voicebox',
    index: '01',
    category: 'Full-time job',
    title: 'Voicebox',
    badges: ['UX/UI', 'Design Systems', 'Design Engineering', 'Web Design', 'Branding'],
    overview:
      'Full-time design role, covering UX/UI, design systems, design engineering, web and branding projects.',
    href: '/work/voicebox',
    role: ['UX/UI Designer & Engineer', "Brand & Marketing Designer"],
    timeline: ['May 2025 – June 2026', '(1 year)'],
    team: ['5-6 people'],
    tools: ['Figma', 'FigJam','Cursor', 'Claude'],
  },
  {
    slug: 'roomerang',
    index: '02',
    category: 'Project',
    title: 'Roomerang',
    badges: ['UX/UI', 'Design Engineering', 'Web Design', 'Branding'],
    overview:
      'Self-initiated NYC-metro roommate marketplace — designed and built end-to-end as a solo product designer and engineer.',
    href: '/work/roomerang',
    role: ['UX/UI Designer & Engineer'],
    timeline: ['May 2026 - Present', '(1 month)'],
    team: ['Solo'],
    tools: ['Figma', 'Supabase', 'Vercel', 'Cursor', 'Claude'],
  },
  {
    slug: 'chainletter',
    index: '03',
    category: 'Contract',
    title: 'Chainletter',
    badges: ['UX/UI'],
    overview:
      'Lead UX/UI redesign of a blockchain credential platform for universities, shipped in 1.5 months.',
    href: '/work/chainletter',
    role: ['Lead UX/UI Designer'],
    timeline: ['Feb - Mar 2025', '(1.5 months)'],
    team: ['5 people'],
    tools: ['Figma', 'FigJam'],
  },
  {
    slug: 'kyruus-health',
    index: '04',
    category: 'Full-time job',
    title: 'Kyruus Health',
    badges: ['UX/UI', 'Accessibility'],
    overview:
      "Accessibility initiative resolving 60 WCAG 2.1 AA tickets across a healthcare platform's design system.",
    href: '/work/kyruus-health',
    role: ['UX/UI Designer'],
    timeline: ['July 2023 - Oct 2024', '(1 year)'],
    team: ['3 people'],
    tools: ['Figma', 'FigJam'],
  },
]

export function getProjectBySlug(slug) {
  return PROJECTS.find((project) => project.slug === slug)
}

export const PRERENDER_ROUTES = ['/', ...PROJECTS.map((project) => project.href)]
