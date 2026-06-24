export default function ProjectSubsection({ id, title, children }) {
  return (
    <div className="d-flex flex-column gap-2 mt-3">
      {title ? <h6 id={id}>{title}</h6> : null}
      {children}
    </div>
  )
}
