export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function createTocItem(title) {
  return {
    id: slugify(title),
    title,
    level: 1,
  }
}
