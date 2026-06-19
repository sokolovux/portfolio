export default function BtnCustom({
  children,
  label,
  variant = 'primary',
  className,
  type = 'button',
  ...rest
}) {
  const classes = [
    'btn-custom',
    variant === 'secondary' && 'btn-custom--secondary',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} {...rest}>
      <span className="btn-custom__outer">
        <span className="btn-custom__inner">
          <span className="btn-custom__overlay" aria-hidden="true" />
          <h6 className="btn-custom__label">{label ?? children}</h6>
        </span>
      </span>
    </button>
  )
}
