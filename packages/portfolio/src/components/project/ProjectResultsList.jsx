export function ProjectResultsItem({ hero = false, children }) {
  return <li className={hero ? undefined : 'lead'}>{children}</li>
}

export default function ProjectResultsList({ hero = false, children }) {
  const listClassName = ['d-flex', 'flex-column', 'gap-2', 'mb-0', hero ? 'small' : null]
    .filter(Boolean)
    .join(' ')

  return <ul className={listClassName}>{children}</ul>
}
