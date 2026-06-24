export const PROJECTS = [
  {
    slug: 'voicebox',
    index: '01',
    category: 'Full-time job',
    title: 'Voicebox',
    badges: ['UX/UI', 'Product'],
    overview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    thumbnail: '/work/voicebox.png',
    href: '/work/voicebox',
    role: ['UX', 'UI', 'Engineer'],
    timeline: ['Jan', '2024', 'Present'],
    team: ['Design', 'Product', 'Eng'],
    tools: ['Figma', 'React', 'Node'],
    skills: ['Web', 'Mobile', 'API'],
  },
  {
    slug: 'roomerang',
    index: '02',
    category: 'Project',
    title: 'Roomerang',
    badges: ['UX/UI', 'Mobile'],
    overview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    thumbnail: '/work/roomerang.png',
    href: '/work/roomerang',
    role: ['UX', 'UI', 'Engineer'],
    timeline: ['Jan', '2024', 'Present'],
    team: ['Design', 'Product', 'Eng'],
    tools: ['Figma', 'React', 'Node'],
    skills: ['Web', 'Mobile', 'API'],
  },
  {
    slug: 'chainletter',
    index: '03',
    category: 'Project',
    title: 'Chainletter',
    badges: ['UX/UI', 'Web'],
    overview:
      'Lead UX/UI design for Chainletter, a blockchain credential platform for universities. Co-led product, IA, and UX writing. Shipped in 1.5 months.',
    thumbnail: '/work/chainletter.png',
    href: '/work/chainletter',
    role: ['Lead', 'UX/UI', 'Designer'],
    timeline: ['Feb 2025', 'Mar 2025', '1.5 months'],
    team: ['Full Stack', 'Software', 'Engineer'],
    tools: ['Figma', 'FigJam'],
    skills: ['UX Design', 'Product Strategy', 'UX Writing'],
  },
  {
    slug: 'kyruus-health',
    index: '04',
    category: 'Project',
    title: 'Kyruus Health',
    badges: ['UX/UI', 'Health'],
    overview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    thumbnail: '/work/kyruus-health.png',
    href: '/work/kyruus-health',
    role: ['UX', 'UI', 'Engineer'],
    timeline: ['Jan', '2024', 'Present'],
    team: ['Design', 'Product', 'Eng'],
    tools: ['Figma', 'React', 'Node'],
    skills: ['Web', 'Mobile', 'API'],
  },
]

export function getProjectBySlug(slug) {
  return PROJECTS.find((project) => project.slug === slug)
}

export const PRERENDER_ROUTES = ['/', ...PROJECTS.map((project) => project.href)]
