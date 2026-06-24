export const PROJECTS = [
  {
    slug: 'voicebox',
    index: '01',
    category: 'Full-time job',
    title: 'Voicebox',
    badges: ['UX/UI', 'Product'],
    overview:
      'Full-time product design across a browser-based voice platform — from design system to core recorder experience.',
    results: [
      'Design system built and maintained across a year-long engagement.',
      'Product featured at NRF and ShopTalk Innovators Showcase.',
      'Contributed to fundraising with AWS and Anthropic as partners.',
    ],
    thumbnail: '/work/voicebox.png',
    href: '/work/voicebox',
    role: ['UX/UI', 'Designer', '& Engineer'],
    timeline: ['2025', '–', 'Present'],
    team: ['Product', '& Engineering'],
    tools: ['Figma', 'Cursor', 'Claude'],
    skills: [
      'UX Design',
      'Design Systems',
      'Mobile-First Design',
      'AI-Assisted Development',
    ],
  },
  {
    slug: 'roomerang',
    index: '02',
    category: 'Project',
    title: 'Roomerang',
    badges: ['UX/UI', 'Full-Stack'],
    overview:
      'Self-initiated NYC-metro roommate marketplace — designed and built end-to-end as a solo product designer and engineer.',
    results: [
      'Conceived, designed, and built the product solo from concept through deployment.',
      'Shipped end-to-end flows for discovery, listings, and roommate matching.',
      'Full stack on React, Supabase, Vercel, and Railway.',
    ],
    thumbnail: '/work/roomerang.png',
    href: '/work/roomerang',
    role: ['Product Designer', '& Engineer'],
    timeline: ['2024', '–', 'Present'],
    team: ['Solo'],
    tools: ['Figma', 'React', 'Vite', 'Supabase', 'Bootstrap', 'Vercel', 'Railway'],
    skills: ['UX Design', 'Full-Stack Development', 'Product Strategy', 'Systems Design'],
  },
  {
    slug: 'chainletter',
    index: '03',
    category: 'Contract',
    title: 'Chainletter',
    badges: ['UX/UI', 'Web'],
    overview:
      'Lead UX/UI redesign of a blockchain credential platform for universities, shipped in 1.5 months.',
    results: [
      'Shipped and piloted at multiple universities.',
      'Replaced legacy UI with an accessible, trust-forward interface.',
      'Product has since expanded into legal, enterprise, and AI artifact verification.',
    ],
    thumbnail: '/work/chainletter.png',
    href: '/work/chainletter',
    role: ['Lead UX/UI Designer'],
    timeline: ['Feb-Mar 2025', '(1.5 months)'],
    team: ['2 people'],
    tools: ['Figma', 'FigJam'],
    skills: ['UX Design', 'Product Strategy', 'Information Architecture', 'UX Writing'],
  },
  {
    slug: 'kyruus-health',
    index: '04',
    category: 'Full-time job',
    title: 'Kyruus Health',
    badges: ['UX/UI', 'Health'],
    overview:
      "Accessibility initiative resolving 60 WCAG 2.1 AA tickets across a healthcare platform's design system.",
    results: [
      '64% reduction in accessibility debt (60 of 93 tickets resolved).',
      'Established repeatable accessibility patterns across the design system.',
      'Improved compliance posture for a regulated healthcare product.',
    ],
    thumbnail: '/work/kyruus-health.png',
    href: '/work/kyruus-health',
    role: ['UX/UI', 'Designer'],
    timeline: ['2023', '–', '2024'],
    team: ['Design', 'System', 'Team'],
    tools: ['Figma', 'Sketch'],
    skills: ['Accessibility Design', 'UX/UI Design', 'Design Systems', 'WCAG 2.1 AA'],
  },
]

export function getProjectBySlug(slug) {
  return PROJECTS.find((project) => project.slug === slug)
}

export const PRERENDER_ROUTES = ['/', ...PROJECTS.map((project) => project.href)]
