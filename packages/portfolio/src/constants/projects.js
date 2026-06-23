import {
  CHAINLETTER_DESCRIPTION,
  CHAINLETTER_LANDING_COLUMNS,
  CHAINLETTER_SECTIONS,
} from './chainletterContent.js'

const LOREM_PARAGRAPHS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
]

function createLandingColumns() {
  return [
    { title: 'Role', words: ['UX', 'UI', 'Engineer'] },
    { title: 'Timeline', words: ['Jan', '2024', 'Present'] },
    { title: 'Team', words: ['Design', 'Product', 'Eng'] },
    { title: 'Tools', words: ['Figma', 'React', 'Node'] },
    { title: 'Skills', words: ['Web', 'Mobile', 'API'] },
  ]
}

function createSubsections() {
  return [
    {
      title: 'Context',
      paragraphs: LOREM_PARAGRAPHS.slice(0, 1),
      subsections: [
        { title: 'Problem Space', paragraphs: LOREM_PARAGRAPHS.slice(0, 1) },
        { title: 'Constraints', paragraphs: LOREM_PARAGRAPHS.slice(0, 1) },
      ],
    },
    {
      title: 'Approach',
      paragraphs: LOREM_PARAGRAPHS.slice(0, 1),
      subsections: [
        { title: 'Methodology', paragraphs: LOREM_PARAGRAPHS.slice(0, 1) },
        { title: 'Timeline', paragraphs: LOREM_PARAGRAPHS.slice(0, 1) },
      ],
    },
  ]
}

function createSections(projectTitle) {
  return [
    {
      title: 'Overview',
      paragraphs: LOREM_PARAGRAPHS,
      imageLabel: `${projectTitle} overview`,
      subsections: createSubsections(),
    },
    {
      title: 'Research',
      paragraphs: LOREM_PARAGRAPHS,
      imageLabel: `${projectTitle} research`,
      subsections: createSubsections(),
    },
    {
      title: 'Design',
      paragraphs: LOREM_PARAGRAPHS,
      imageLabel: `${projectTitle} design`,
      subsections: createSubsections(),
    },
    {
      title: 'Outcome',
      paragraphs: LOREM_PARAGRAPHS,
      imageLabel: `${projectTitle} outcome`,
      subsections: createSubsections(),
    },
  ]
}

export const PROJECTS = [
  {
    slug: 'voicebox',
    index: '01',
    category: 'Full-time job',
    title: 'Voicebox',
    badges: ['UX/UI', 'Product'],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    href: '/work/voicebox',
    landingColumns: createLandingColumns(),
    sections: createSections('Voicebox'),
  },
  {
    slug: 'roomerang',
    index: '02',
    category: 'Project',
    title: 'Roomerang',
    badges: ['UX/UI', 'Mobile'],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    href: '/work/roomerang',
    landingColumns: createLandingColumns(),
    sections: createSections('Roomerang'),
  },
  {
    slug: 'chainletter',
    index: '03',
    category: 'Project',
    title: 'Chainletter',
    badges: ['UX/UI', 'Web'],
    description: CHAINLETTER_DESCRIPTION,
    href: '/work/chainletter',
    landingColumns: CHAINLETTER_LANDING_COLUMNS,
    sections: CHAINLETTER_SECTIONS,
  },
  {
    slug: 'kyruus-health',
    index: '04',
    category: 'Project',
    title: 'Kyruus Health',
    badges: ['UX/UI', 'Health'],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    href: '/work/kyruus-health',
    landingColumns: createLandingColumns(),
    sections: createSections('Kyruus Health'),
  },
]

export function getProjectBySlug(slug) {
  return PROJECTS.find((project) => project.slug === slug)
}

export const PRERENDER_ROUTES = ['/', ...PROJECTS.map((project) => project.href)]
