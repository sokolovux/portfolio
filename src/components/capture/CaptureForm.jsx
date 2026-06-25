import BtnCustom from '../BtnCustom.jsx'

const QUALITY_OPTIONS = [
  { value: 'low', label: 'Low (720p, CRF 35)' },
  { value: 'medium', label: 'Medium (1080p, CRF 28)' },
  { value: 'high', label: 'High (1440p, CRF 18)' },
]

const DEFAULT_VALUES = {
  url: '',
  viewportWidth: 1440,
  viewportHeight: 900,
  scrollSpeed: 3,
  holdDuration: 2000,
  waitForLoad: true,
  loadDelay: 1500,
  quality: 'high',
}

export { DEFAULT_VALUES }

export default function CaptureForm({
  values,
  onChange,
  onSubmit,
  disabled,
  error,
}) {
  return (
    <form
      className="d-flex flex-column gap-4"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
    >
      <div>
        <label htmlFor="capture-url" className="form-label">
          URL
        </label>
        <input
          id="capture-url"
          type="url"
          className="form-control"
          value={values.url}
          onChange={(event) => onChange('url', event.target.value)}
          placeholder="https://example.com"
          required
          disabled={disabled}
        />
      </div>

      <div className="row g-3">
        <div className="col-md-6">
          <label htmlFor="capture-width" className="form-label">
            Viewport width
          </label>
          <input
            id="capture-width"
            type="number"
            className="form-control"
            min="320"
            max="3840"
            value={values.viewportWidth}
            onChange={(event) => onChange('viewportWidth', Number(event.target.value))}
            disabled={disabled}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="capture-height" className="form-label">
            Viewport height
          </label>
          <input
            id="capture-height"
            type="number"
            className="form-control"
            min="240"
            max="2160"
            value={values.viewportHeight}
            onChange={(event) => onChange('viewportHeight', Number(event.target.value))}
            disabled={disabled}
          />
        </div>
      </div>

      <div>
        <label htmlFor="capture-speed" className="form-label">
          Scroll speed: {values.scrollSpeed} px per frame
        </label>
        <input
          id="capture-speed"
          type="range"
          className="form-range"
          min="1"
          max="10"
          step="0.5"
          value={values.scrollSpeed}
          onChange={(event) => onChange('scrollSpeed', Number(event.target.value))}
          disabled={disabled}
        />
      </div>

      <div>
        <label htmlFor="capture-hold" className="form-label">
          Hold at top (ms)
        </label>
        <input
          id="capture-hold"
          type="number"
          className="form-control"
          min="0"
          max="30000"
          step="100"
          value={values.holdDuration}
          onChange={(event) => onChange('holdDuration', Number(event.target.value))}
          disabled={disabled}
        />
        <p className="form-text mb-0">
          How long the recording stays on the first screen before scrolling starts.
        </p>
      </div>

      <div className="form-check">
        <input
          id="capture-wait"
          type="checkbox"
          className="form-check-input"
          checked={values.waitForLoad}
          onChange={(event) => onChange('waitForLoad', event.target.checked)}
          disabled={disabled}
        />
        <label htmlFor="capture-wait" className="form-check-label">
          Wait for page load
        </label>
      </div>

      {values.waitForLoad && (
        <div>
          <label htmlFor="capture-delay" className="form-label">
            Load delay (ms)
          </label>
          <input
            id="capture-delay"
            type="number"
            className="form-control"
            min="0"
            max="30000"
            step="100"
            value={values.loadDelay}
            onChange={(event) => onChange('loadDelay', Number(event.target.value))}
            disabled={disabled}
          />
        </div>
      )}

      <fieldset disabled={disabled}>
        <legend className="form-label col-form-label pt-0">Video quality</legend>
        <div className="d-flex flex-column gap-2">
          {QUALITY_OPTIONS.map((option) => (
            <div className="form-check" key={option.value}>
              <input
                id={`capture-quality-${option.value}`}
                type="radio"
                className="form-check-input"
                name="quality"
                value={option.value}
                checked={values.quality === option.value}
                onChange={(event) => onChange('quality', event.target.value)}
              />
              <label htmlFor={`capture-quality-${option.value}`} className="form-check-label">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </fieldset>

      {error && <p className="text-danger mb-0">{error}</p>}

      <BtnCustom
        type="submit"
        label={disabled ? 'Recording…' : 'Start recording'}
        disabled={disabled}
      />
    </form>
  )
}
