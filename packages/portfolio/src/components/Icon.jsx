const DEFAULT_SIZE = 20
const DEFAULT_STROKE_WIDTH = 2

function Icon({
  icon: LucideIcon,
  size = DEFAULT_SIZE,
  strokeWidth = DEFAULT_STROKE_WIDTH,
  className,
  ...props
}) {
  return (
    <LucideIcon
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden={props['aria-hidden'] ?? true}
      {...props}
    />
  )
}

export default Icon
