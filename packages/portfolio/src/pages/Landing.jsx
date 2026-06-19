import BtnCustom from '../components/BtnCustom.jsx'
import TextScramble from '../components/TextScramble.jsx'

export default function Landing() {
  return (
    <>
      <section className="container py-5 text-left d-flex flex-column gap-3 border-bottom">
        <div className="d-flex flex-column gap-1">
          <TextScramble text="I design & build" tag="h1" />
          <TextScramble text="UX/UI Designer & Engineer" tag="p" className="h5" />
        </div>
        <p className="text-muted">I design and build digital products for brands that give a shit.</p>
        <div className="d-flex flex-wrap gap-2">
          <BtnCustom label="View work" href="#work" />
          <BtnCustom variant="secondary" label="Get in touch" href="#contact" />
        </div>
        <div
          className="landing-placeholder-image"
          role="img"
          aria-label="Placeholder image"
        />
      </section>

      <section id="experience" className="container py-5 d-flex flex-column gap-2 border-bottom">
        <h4>
          <span className="text-highlight">*</span>Experience
        </h4>
        <p>Case studies and projects coming soon.</p>
        <BtnCustom
          variant="secondary"
          label="View full CV"
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
        />
      </section>

      <section id="about" className="container py-5 d-flex flex-column gap-2 border-bottom">
        <h4>
          <span className="text-highlight">*</span>About
        </h4>
        <p>Get in touch.</p>
      </section>

      <section id="work" className="container py-5 d-flex flex-column gap-2 border-bottom">
        <h4>
          <span className="text-highlight">*</span>Work
        </h4>
        <p>Case studies and projects coming soon.</p>
      </section>

      <section id="cv" className="container py-5 d-flex flex-column gap-2 border-bottom">
        <h4>
          <span className="text-highlight">*</span>CV
        </h4>
        <p>Resume coming soon.</p>
      </section>

      <section id="contact" className="container py-5 d-flex flex-column gap-2">
        <h4>
          <span className="text-highlight">*</span>Contact
        </h4>
        <p>Get in touch.</p>
      </section>
    </>
  )
}
