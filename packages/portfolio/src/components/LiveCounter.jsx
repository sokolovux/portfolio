import BtnCustom from './BtnCustom.jsx'
import { useLiveCounter } from '../hooks/useLiveCounter.js'

export default function LiveCounter() {
  const { count, increment, available } = useLiveCounter()

  const displayCount = available && count !== null ? count.toLocaleString() : '…'

  return (
    <div className="d-flex align-items-center gap-3">
      <BtnCustom
        variant="secondary"
        label="Click me"
        type="button"
        onClick={increment}
        disabled={!available || count === null}
        aria-label={
          available && count !== null
            ? `Bump counter, currently ${count}`
            : 'Bump counter, loading'
        }
      />
      <span className="display-mono" aria-live="polite">
        {displayCount}
      </span>
    </div>
  )
}
