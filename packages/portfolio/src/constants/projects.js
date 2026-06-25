/** @typedef {{ top: string, bottom: string }} ProjectCardGradient */

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
    gradient: {
      top: '#FAFAFA',
      bottom: '#F5F5F5',
    },
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
    gradient: {
      top: '#E73F37',
      bottom: '#E4281F',
    },
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
      'Lead UX/UI redesign of Chainletter\'s university admin MVP so degree verification works for staff who do not need to understand blockchain.',
    href: '/work/chainletter',
    gradient: {
      top: '#797CD3',
      bottom: '#6468CC',
    },
    role: ['Lead UX/UI Designer', 'Co-product lead'],
    timeline: ['Feb - Apr 2025', '(7-8 weeks)'],
    team: ['5 people'],
    tools: ['Figma', 'FigJam', "ChatGPT", "Claude"],
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
    gradient: {
      top: '#6FB4A1',
      bottom: '#5FAB96',
    },
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
