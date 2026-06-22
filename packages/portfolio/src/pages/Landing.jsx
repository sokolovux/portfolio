import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AsciiAnimation from '../components/AsciiAnimation.jsx'
import BtnCustom from '../components/BtnCustom.jsx'
import DividerText from '../components/DividerText.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import TextScramble from '../components/TextScramble.jsx'
import { PROJECTS } from '../constants/projects.js'
import { useAsciiLandingConfig } from '../hooks/useAsciiLandingConfig.js'
import { scrollToHashTarget } from '../utils/scrollToHash.js'

const PLAYGROUND_IMAGES = Array.from({ length: 8 }, (_, index) => ({
  id: `playground-${index + 1}`,
  label: `Playground experiment ${index + 1}`,
}))

export default function Landing() {
  const { hash } = useLocation()
  const asciiConfig = useAsciiLandingConfig()

  useEffect(() => {
    if (!hash) return

    scrollToHashTarget(hash.slice(1))
  }, [hash])

  return (
    <>
      <section className="container py-5 text-left d-flex flex-column gap-4">
        <div className="d-flex flex-column gap-3">
          <div className="d-flex flex-column gap-1">
            <TextScramble text="I design & code" tag="h1" />
            <TextScramble text="UX/UI Designer & Engineer" tag="p" className="h5" />
          </div>
          <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
          <div className="d-flex flex-row gap-2">
            <BtnCustom label="View work" href="#work" />
            <BtnCustom variant="secondary" label="Get in touch" href="#contact" />
          </div>
        </div>
        <AsciiAnimation config={asciiConfig} />
      </section>

      <div className="container">
        <DividerText />
      </div>

      <section id="experience" className="container py-5 d-flex flex-column gap-2">
        <h4>
          <span className="text-highlight">*</span>Experience
        </h4>
        <BtnCustom
          variant="secondary"
          label="View CV"
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
        />
      </section>

      <div className="container">
        <DividerText />
      </div>

      <section id="work" className="container py-5 d-flex flex-column gap-4">
        <h4>
          <span className="text-highlight">*</span>Work
        </h4>
        <div className="d-flex flex-column gap-5">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.href} {...project} />
          ))}
        </div>
      </section>

      <div className="container">
        <DividerText />
      </div>

      <section id="playground" className="container py-5 d-flex flex-column gap-4">
        <h4>
          <span className="text-highlight">*</span>Playground
        </h4>
        <div className="row row-cols-1 row-cols-md-2 g-3">
          {PLAYGROUND_IMAGES.map((image) => (
            <div key={image.id} className="col">
              <div
                className="project-card__image shadow"
                role="img"
                aria-label={image.label}
              />
            </div>
          ))}
        </div>
      </section>

      <div className="container">
        <DividerText />
      </div>

      <section id="about" className="container py-5 d-flex flex-column gap-2">
        <h4>
          <span className="text-highlight">*</span>About
        </h4>
        <div className="d-flex flex-row gap-2">
          <BtnCustom label="Button" />
          <BtnCustom variant="secondary" label="Button" />
        </div>
      </section>

      <div className="container">
        <DividerText />
      </div>

      <section id="contact" className="container py-5 d-flex flex-column gap-2">
        <h4>
          <span className="text-highlight">*</span>Contact
        </h4>
        <p>Get in touch.</p>
      </section>
    </>
  )
}
