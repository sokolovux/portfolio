import { useLiveCounter } from '../hooks/useLiveCounter.js'

export default function LiveCounter() {
  const { count, increment, available } = useLiveCounter()

  if (!available) {
    return null
  }

  const displayCount = count ?? '…'

  return (
    <div className="d-flex align-items-center gap-2">
      <button
        type="button"
        className="btn btn-outline-secondary btn-sm"
        onClick={increment}
        disabled={count === null}
        aria-label={`Bump counter, currently ${displayCount}`}
      >
        Bump
      </button>
      <span className="small text-muted" aria-live="polite">
        {typeof displayCount === 'number' ? displayCount.toLocaleString() : displayCount}
      </span>
    </div>
  )
}
