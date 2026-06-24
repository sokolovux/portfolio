import { Fragment, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AsciiAnimation from '../components/AsciiAnimation.jsx'
import Divider from '../components/Divider.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import ScrambleInView from '../components/ScrambleInView.jsx'
import TextScramble from '../components/TextScramble.jsx'
import { PROJECTS } from '../constants/projects.js'
import { useAsciiHeroConfig } from '../hooks/useAsciiHeroConfig.js'
import { scrollToHashTarget } from '../utils/scrollToHash.js'

const PLAYGROUND_ASPECT_RATIOS = [1.5, 1, 1, 1.5, 1, 1, 1.5, 1, 1.5, 1, 1, 1.5]

const PLAYGROUND_IMAGES = PLAYGROUND_ASPECT_RATIOS.map((aspectRatio, index) => ({
  id: `playground-${index + 1}`,
  label: `Playground experiment ${index + 1}`,
  subtitle: `Experiment ${index + 1}`,
  aspectRatio,
  colSpan: aspectRatio === 1.5 ? 2 : 1,
}))
export default function Landing() {
  const { hash } = useLocation()
  const asciiConfig = useAsciiHeroConfig()

  useEffect(() => {
    if (!hash) return

    scrollToHashTarget(hash.slice(1))
  }, [hash])

  return (
    <>
      <section className="container py-5 d-flex flex-column justify-content-center align-items-center text-center landing-hero position-relative">
        <div className="landing-hero__glow" aria-hidden="true" />
        <div className="landing-hero__ascii" aria-hidden="true">
          <AsciiAnimation config={asciiConfig} />
        </div>
        <div className="d-flex flex-column align-items-center gap-3 position-relative z-2">
          <img
            src="/landing-hero.png"
            alt="Maxim Sokolov"
            className="landing-hero-image shadow"
          />
          <div className="d-flex flex-column align-items-center gap-2">
            <TextScramble text="I'm Maxim." tag="h1" className="text-highlight landing-heading" />
            <TextScramble text="I design & ship." tag="h1" className="landing-heading" />
            <TextScramble text="UX/UI Designer & Engineer" tag="p" className="p display-mono mb-1" />
            <div className="d-flex flex-wrap gap-1 justify-content-center">
              <div className="badge">Featured on Times Square</div>
              <div className="badge">4+ products shipped</div>
              <div className="badge">5+ years of experience</div>
            </div>
          </div>
          {/*
          <ul className="mb-0 d-inline-block text-start">
            <li>4+ Products Shipped</li>
            <li>6+ years of experience </li>
            <li>Featured on Times Square</li>
            <li>Worked at Mark Cuban supported startup</li>
          </ul>
          */}
        </div>
      </section>

      <section id="work" className="py-5 d-flex flex-column gap-4">
        <div className="d-flex flex-column gap-5">
          {PROJECTS.map((project) => (
            <Fragment key={project.href}>
              <div className="container">
                <ProjectCard {...project} />
              </div>
              <Divider />
            </Fragment>
          ))}
        </div>
      </section>

      <section id="about" className="py-5 d-flex flex-column gap-2">
        <div className="container d-flex flex-column gap-2">
          <p className="small">
            <ScrambleInView
              text="About"
              className="text-highlight display-mono"
              tag="span"
            />
          </p>
          <h4>
            Nice to meet you! :)
          </h4>
          <p className="pb-1">
            I started in brand and visual design, moved into UX/UI, then picked up AI codewriting tools and didn't put them down...
          </p>
          <p className="pb-1">
            Today I work across the full stack: from early concepts and discovery to shipped interfaces, discussing design architecture and pushing PRs alongside engineers.
          </p>
          <p className="pb-1">
            Based in NYC. Open to full-time roles and select freelance gigs.
          </p>
        </div>
        <Divider />
        <div className="container">
          <div className="d-flex row row-gap-2 mt-3">
            <div className="row row-gap-1">
              <div className="col-2">
                <p className="display-mono">2025-Present</p>
              </div>
              <div className="col-3">
                <p className="display-mono text-highlight">Voicebox</p>
              </div>
              <div className="col-7">
                <p className="">UX/UI Designer & Engineer</p>
              </div>
            </div>
            <div className="row row-gap-1">
              <div className="col-2">
                <p className="display-mono">2024-Present</p>
              </div>
              <div className="col-3">
                <p className="display-mono text-highlight">Freelance</p>
              </div>
              <div className="col-7">
                <p className="">UX/UI & Web Designer</p>
              </div>
            </div>
            <div className="row row-gap-1">
              <div className="col-2">
                <p className="display-mono">2023-24</p>
              </div>
              <div className="col-3">
                <p className="display-mono text-highlight">Kyruus Health</p>
              </div>
              <div className="col-7">
                <p className="">UX/UI Designer</p>
              </div>
            </div>
            <div className="row row-gap-1">
              <div className="col-2">
                <p className="display-mono">2021-22</p>
              </div>
              <div className="col-3">
                <p className="display-mono text-highlight">Starta Accelerator</p>
              </div>
              <div className="col-7">
                <p className="">Visual & Brand Designer</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section id="playground" className="container py-5 d-flex flex-column gap-4">        <div className="d-flex flex-column gap-2">
      <p className="small">
          <ScrambleInView
            text="Playground"
            className="text-highlight display-mono"
            tag="span"
          />
        </p>
        <h4>
        Freelance, fun & other work
        </h4>
      </div>
        <div className="playground-grid d-grid gap-3">
          {PLAYGROUND_IMAGES.map((image) => (
            <div
              key={image.id}
              className={image.colSpan === 2 ? 'playground-grid__item--span-2' : undefined}
            >
              <div className="d-flex flex-column gap-2">
                <div
                  className={[
                    'playground-grid__image',
                    'shadow',
                    image.aspectRatio === 1.5
                      ? 'playground-grid__image--wide'
                      : 'playground-grid__image--square',
                  ].join(' ')}
                  role="img"
                  aria-label={image.label}
                />
                <small className="xs">{image.subtitle}</small>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
