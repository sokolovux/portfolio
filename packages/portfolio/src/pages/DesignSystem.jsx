const GRAY_STEPS = ['100', '200', '300', '400', '500', '600', '700', '800', '900']

const THEME_COLORS = [
  { name: 'Primary', token: '$primary', bgClass: 'bg-primary', textClass: 'text-white' },
  { name: 'Success', token: '$success', bgClass: 'bg-success', textClass: 'text-white' },
  { name: 'Warning', token: '$warning', bgClass: 'bg-warning' },
  { name: 'Danger', token: '$danger', bgClass: 'bg-danger', textClass: 'text-white' },
  { name: 'Info', token: '$info', bgClass: 'bg-info' },
  { name: 'Secondary', token: '$secondary', bgClass: 'bg-secondary', textClass: 'text-white' },
]

const SURFACE_COLORS = [
  { name: 'Body', token: '$body-bg', bgClass: 'bg-body' },
  { name: 'Body secondary', token: '$body-secondary-bg', bgClass: 'bg-body-secondary' },
  { name: 'Body tertiary', token: '$body-tertiary-bg', bgClass: 'bg-body-tertiary' },
]

const BUTTONS = [
  { label: 'Primary CTA', className: 'btn btn-primary' },
  { label: 'Default', className: 'btn btn-outline-secondary' },
  { label: 'Success', className: 'btn btn-outline-success' },
  { label: 'Warning', className: 'btn btn-outline-warning' },
  { label: 'Danger', className: 'btn btn-outline-danger' },
  { label: 'Info', className: 'btn btn-outline-info' },
]

function ColorSwatch({ name, token, bgClass, textClass = '' }) {
  return (
    <div className="col-6 col-md-4 col-lg-3">
      <div className={`rounded p-4 border ${bgClass} ${textClass}`}>{name}</div>
      <p className="small text-muted mt-2 mb-0">{token}</p>
    </div>
  )
}

function GraySwatch({ step }) {
  const needsLightText = Number(step) >= 600

  return (
    <div className="col-6 col-md-4 col-lg">
      <div
        className={`rounded border ds-swatch-gray-${step} p-4 ${needsLightText ? 'text-white' : ''}`}
      >
        {step}
      </div>
      <p className="small text-muted mt-2 mb-0">$gray-{step}</p>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <section className="mb-5 pb-5 border-bottom">
      <h2 className="mb-4">{title}</h2>
      {children}
    </section>
  )
}

export default function DesignSystem() {
  return (
    <div className="container py-5">
      <header className="mb-5">
        <h1>Design system</h1>
        <p className="lead text-muted">
          Bootstrap 5.3 with shared tokens from <code>shared/design/</code>.
        </p>
      </header>

      <Section title="Theme colors">
        <div className="row g-3">
          {THEME_COLORS.map((color) => (
            <ColorSwatch key={color.token} {...color} />
          ))}
        </div>
      </Section>

      <Section title="Surfaces">
        <div className="row g-3">
          {SURFACE_COLORS.map((color) => (
            <ColorSwatch key={color.token} {...color} />
          ))}
        </div>
        <div className="row g-3 mt-1">
          <div className="col-6 col-md-4 col-lg-3">
            <div className="rounded p-4 border bg-body">Border</div>
            <p className="small text-muted mt-2 mb-0">$border-color</p>
          </div>
        </div>
      </Section>

      <Section title="Gray scale">
        <p className="text-muted">Warm neutrals defined in <code>_primitives.scss</code>.</p>
        <div className="row g-3">
          {GRAY_STEPS.map((step) => (
            <GraySwatch key={step} step={step} />
          ))}
        </div>
      </Section>

      <Section title="Typography">
        <div className="d-flex flex-column gap-4">
          <div>
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
            <h5>Heading 5</h5>
            <h6>Heading 6</h6>
          </div>

          <div>
            <p className="lead">Lead — Geist sans-serif, body scale.</p>
            <p>
              Body — The quick brown fox jumps over the lazy dog. Headings use Geist at weight
              500 with negative letter-spacing.
            </p>
            <p className="text-muted">Muted — secondary body color for supporting text.</p>
            <p className="small">Small — supplementary captions and metadata.</p>
          </div>

          <div>
            <p className="display-mono">Display mono — Geist Mono for monospace display text.</p>
            <p className="small text-muted mb-0">.display-mono</p>
          </div>

          <div>
            <p>
              <a href="#colors">Default link</a> — primary red, darkens on hover.
            </p>
            <p className="small text-muted mb-0">$link-color / $link-hover-color</p>
          </div>
        </div>
      </Section>

      <Section title="Buttons">
        <p className="text-muted">
          Pill-shaped outline variants for secondary actions; solid primary for the main CTA.
        </p>
        <div className="d-flex flex-wrap gap-2">
          {BUTTONS.map((button) => (
            <button key={button.label} type="button" className={button.className}>
              {button.label}
            </button>
          ))}
        </div>
        <div className="d-flex flex-wrap gap-2 mt-3">
          {BUTTONS.map((button) => (
            <button key={`${button.label}-disabled`} type="button" className={button.className} disabled>
              {button.label}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Links">
        <div className="d-flex flex-column gap-2">
          <p>
            <a href="#links">Inline link in body text</a>
          </p>
          <a href="#links">Standalone link</a>
          <a href="#links" className="nav-link">
            Nav link
          </a>
        </div>
      </Section>

      <Section title="Fields">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="ds-text" className="form-label">
                Text input
              </label>
              <input id="ds-text" type="text" className="form-control" placeholder="Placeholder" />
            </div>
            <div className="mb-3">
              <label htmlFor="ds-email" className="form-label">
                Email
              </label>
              <input id="ds-email" type="email" className="form-control" placeholder="you@example.com" />
            </div>
            <div className="mb-3">
              <label htmlFor="ds-select" className="form-label">
                Select
              </label>
              <select id="ds-select" className="form-select" defaultValue="">
                <option value="" disabled>
                  Choose an option
                </option>
                <option value="1">Option one</option>
                <option value="2">Option two</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="ds-textarea" className="form-label">
                Textarea
              </label>
              <textarea id="ds-textarea" className="form-control" rows={4} placeholder="Message" />
            </div>
            <div className="form-check mb-3">
              <input id="ds-check" type="checkbox" className="form-check-input" />
              <label htmlFor="ds-check" className="form-check-label">
                Checkbox
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="ds-disabled" className="form-label">
                Disabled
              </label>
              <input
                id="ds-disabled"
                type="text"
                className="form-control"
                defaultValue="Disabled input"
                disabled
              />
            </div>
          </div>
        </div>
      </Section>

      <Section title="Border radius">
        <div className="d-flex flex-wrap gap-3">
          <div className="bg-body-secondary border rounded p-4">Default — 16px</div>
          <div className="bg-body-secondary border rounded-sm p-4">Small — 8px</div>
          <div className="bg-body-secondary border rounded-lg p-4">Large — 32px</div>
          <div className="bg-body-secondary border rounded-pill px-4 py-3">Pill — 120px</div>
        </div>
      </Section>
    </div>
  )
}
