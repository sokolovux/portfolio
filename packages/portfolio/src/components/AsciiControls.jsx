import {
  ASCII_FONTS,
  ASCII_MIRROR_OPTIONS,
  ASCII_PATTERNS,
  DEFAULT_ASCII_CONFIG,
} from '../constants/asciiConfig.js'

function NumberField({ id, label, hint, value, onChange, step, min, max }) {
  return (
    <div className="d-flex flex-column gap-1">
      <label htmlFor={id} className="form-label mb-0">
        {label}
      </label>
      <input
        id={id}
        type="number"
        className="form-control"
        value={value}
        step={step}
        min={min}
        max={max}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      {hint ? <small className="text-muted">{hint}</small> : null}
    </div>
  )
}

function SelectField({ id, label, hint, value, onChange, options }) {
  return (
    <div className="d-flex flex-column gap-1">
      <label htmlFor={id} className="form-label mb-0">
        {label}
      </label>
      <select
        id={id}
        className="form-select"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hint ? <small className="text-muted">{hint}</small> : null}
    </div>
  )
}

function TextField({ id, label, hint, value, onChange }) {
  return (
    <div className="d-flex flex-column gap-1">
      <label htmlFor={id} className="form-label mb-0">
        {label}
      </label>
      <input
        id={id}
        type="text"
        className="form-control"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {hint ? <small className="text-muted">{hint}</small> : null}
    </div>
  )
}

function ColorField({ id, label, value, onChange }) {
  return (
    <div className="d-flex flex-column gap-1">
      <label htmlFor={id} className="form-label mb-0">
        {label}
      </label>
      <input
        id={id}
        type="color"
        className="form-control form-control-color w-100"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}

export default function AsciiControls({ config, onChange, onReset }) {
  function updateField(key, value) {
    onChange({ ...config, [key]: value })
  }

  function updateColor(index, value) {
    const colors = [...config.colors]
    colors[index] = value
    onChange({ ...config, colors })
  }

  return (
    <div className="d-flex flex-column gap-3">
      <div className="row g-3">
        <div className="col-12 col-lg-4 d-flex flex-column gap-3">
          <TextField
            id="ascii-charset"
            label="Character set"
            hint='Default: " .:-=+*%@#"'
            value={config.charset}
            onChange={(value) => updateField('charset', value)}
          />
          <NumberField
            id="ascii-frame-width"
            label="Frame width"
            hint="Default: 96"
            value={config.frameWidth}
            min={1}
            onChange={(value) => updateField('frameWidth', value)}
          />
          <NumberField
            id="ascii-frame-height"
            label="Frame height"
            hint="Default: 28"
            value={config.frameHeight}
            min={1}
            onChange={(value) => updateField('frameHeight', value)}
          />
          <SelectField
            id="ascii-font"
            label="Font"
            hint="Adjust the animation font"
            value={config.fontFamily}
            onChange={(value) => updateField('fontFamily', value)}
            options={ASCII_FONTS}
          />
        </div>

        <div className="col-12 col-lg-4 d-flex flex-column gap-3">
          <SelectField
            id="ascii-pattern"
            label="Pattern"
            hint="Animation presets"
            value={config.pattern}
            onChange={(value) => updateField('pattern', value)}
            options={ASCII_PATTERNS}
          />
          <SelectField
            id="ascii-mirror"
            label="Mirror"
            hint="Mirror your animation"
            value={config.mirrorAxis}
            onChange={(value) => updateField('mirrorAxis', value)}
            options={ASCII_MIRROR_OPTIONS}
          />
          <NumberField
            id="ascii-x-constant"
            label="x Const"
            hint="Default: 0.1"
            value={config.xConstant}
            step={0.01}
            onChange={(value) => updateField('xConstant', value)}
          />
          <NumberField
            id="ascii-y-constant"
            label="y Const"
            hint="Default: 0.1"
            value={config.yConstant}
            step={0.01}
            onChange={(value) => updateField('yConstant', value)}
          />
        </div>

        <div className="col-12 col-lg-4 d-flex flex-column gap-3">
          <NumberField
            id="ascii-speed"
            label="Speed"
            hint="Default: 50 (ms between frames)"
            value={config.animationSpeed}
            min={1}
            onChange={(value) => updateField('animationSpeed', value)}
          />
          <NumberField
            id="ascii-chaos"
            label="Chaos"
            hint="Default: 0, max: 1 (100%)"
            value={config.chaos}
            step={0.01}
            min={0}
            max={1}
            onChange={(value) => updateField('chaos', value)}
          />
          <NumberField
            id="ascii-global-value"
            label="Global value"
            hint="Works sometimes…"
            value={config.globalVal}
            step={0.1}
            min={-100}
            max={100}
            onChange={(value) => updateField('globalVal', value)}
          />
          <NumberField
            id="ascii-frame-multiplier"
            label="Frame multi"
            hint="Default: 0.1"
            value={config.frameMultiplier}
            step={0.01}
            onChange={(value) => updateField('frameMultiplier', value)}
          />
        </div>
      </div>

      <div className="d-flex flex-column gap-2">
        <h2 className="h5 mb-0">Colors</h2>
        <div className="row g-3">
          {config.colors.map((color, index) => (
            <div key={`ascii-color-${index}`} className="col-6 col-md-4 col-lg-2">
              <ColorField
                id={`ascii-color-${index}`}
                label={`Color ${index + 1}`}
                value={color}
                onChange={(value) => updateColor(index, value)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="d-flex flex-row gap-2">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => onReset({ ...DEFAULT_ASCII_CONFIG })}
        >
          Reset defaults
        </button>
      </div>
    </div>
  )
}
