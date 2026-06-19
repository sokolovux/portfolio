// Matches html { scroll-padding-top: 48px } in shared/design/_extensions.scss
const SCROLL_OFFSET = 48

export function scrollToHashTarget(id) {
  const target = document.getElementById(id)
  if (!target) return

  const top = target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET
  window.scrollTo({ top })
}
