export const PROJECTS = [
  {
    slug: 'voicebox',
    index: '01',
    category: 'Full-time job',
    title: 'Voicebox',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    href: '/work/voicebox',
  },
  {
    slug: 'roomerang',
    index: '02',
    category: 'Project',
    title: 'Roomerang',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    href: '/work/roomerang',
  },
  {
    slug: 'alice',
    index: '03',
    category: 'Project',
    title: 'Alice',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    href: '/work/alice',
  },
  {
    slug: 'mirawell-health',
    index: '04',
    category: 'Project',
    title: 'Mirawell Health',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    href: '/work/mirawell-health',
  },
]

export function getProjectBySlug(slug) {
  return PROJECTS.find((project) => project.slug === slug)
}
