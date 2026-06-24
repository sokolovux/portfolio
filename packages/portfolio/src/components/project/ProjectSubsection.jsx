export default function ProjectSubsection({ id, title, children }) {
  return (
    <div className="d-flex flex-column gap-2">
      {title ? (
        <p id={id} className="lead">
          {title}
        </p>
      ) : null}
      {children}
    </div>
  )
}
