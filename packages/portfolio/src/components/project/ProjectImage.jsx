export default function ProjectImage({ label, src, alt }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt ?? label ?? 'Project image'}
        className="img-fluid shadow-lg w-100 rounded"
      />
    )
  }

  return (
    <div
      className="landing-placeholder-image shadow-lg"
      role="img"
      aria-label={label}
    />
  )
}
