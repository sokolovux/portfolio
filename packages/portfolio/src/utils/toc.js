export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function buildTocItems(sections) {
  const items = []

  for (const section of sections) {
    const sectionId = slugify(section.title)
    items.push({ id: sectionId, title: section.title, level: 1 })

    for (const subsection of section.subsections ?? []) {
      if (!subsection.title) {
        continue
      }

      const subsectionId = `${sectionId}-${slugify(subsection.title)}`
      items.push({ id: subsectionId, title: subsection.title, level: 2 })
    }
  }

  return items
}

export function getSectionDomId(section, parentId = '') {
  const segment = slugify(section.title)
  return parentId ? `${parentId}-${segment}` : segment
}
