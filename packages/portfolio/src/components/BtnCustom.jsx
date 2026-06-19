export default function BtnCustom({
  children,
  label,
  variant = 'primary',
  className,
  type = 'button',
  href,
  ...rest
}) {
  const classes = [
    'btn-custom',
    variant === 'secondary' && 'btn-custom--secondary',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const Tag = href ? 'a' : 'button'

  return (
    <Tag
      type={href ? undefined : type}
      href={href}
      className={classes}
      {...rest}
    >
      <span className="btn-custom__outer">
        <span className="btn-custom__inner">
          <span className="btn-custom__overlay" aria-hidden="true" />
          <h6 className="btn-custom__label">{label ?? children}</h6>
        </span>
      </span>
    </Tag>
  )
}
