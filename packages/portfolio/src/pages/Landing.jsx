import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard.jsx'
import TextScramble from '../components/TextScramble.jsx'
import { PROJECTS } from '../constants/projects.js'
import { scrollToHashTarget } from '../utils/scrollToHash.js'

const PLAYGROUND_ASPECT_RATIOS = [1.5, 1, 1, 1.5, 1, 1, 1.5, 1, 1.5, 1, 1, 1.5]

const PLAYGROUND_IMAGES = PLAYGROUND_ASPECT_RATIOS.map((aspectRatio, index) => ({
  id: `playground-${index + 1}`,
  label: `Playground experiment ${index + 1}`,
  aspectRatio,
  colSpan: aspectRatio === 1.5 ? 2 : 1,
}))
export default function Landing() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return

    scrollToHashTarget(hash.slice(1))
  }, [hash])

  return (
    <>
      <section className="container py-5 text-left d-flex flex-column gap-4">
        <div className="d-flex flex-column gap-2">
          <img
            src="/landing-hero.png"
            alt="Maxim Sokolov"
            className="landing-hero-image shadow"
          />
          <div className="d-flex flex-column gap-1">
            <TextScramble text="I design & code" tag="h1" />
            <TextScramble text="UX/UI Designer & Engineer" tag="p" className="h5" />
          </div>
          <ul>
            <li>4+ Products Shipped</li>
            <li>6+ years of experience </li>
            <li>Featured on Times Square</li>
            <li>Worked at Mark Cuban supported startup</li>
          </ul>
        </div>
      </section>

      <section id="work" className="container py-5 d-flex flex-column gap-4">        <div className="d-flex flex-column gap-5">
          {PROJECTS.map((project, index, projects) => (
            <ProjectCard
              key={project.href}
              {...project}
              className={index < projects.length - 1 ? 'border-bottom pb-4' : undefined}
            />
          ))}
        </div>
      </section>

      <section id="about" className="container py-5 d-flex flex-column gap-2">        <h4 className="text-highlight">
          Hey, I'm Maxim. <br /> Nice to meet you!
        </h4>
        <h6>
          I'm UX/UI Designer & Engineer.
        </h6>
        <p>
          I started in brand and visual design, moved into UX/UI, then picked up AI codewriting tools and didn't put them down...
        </p>
        <p>
          Today I work across the full stack: from early concepts and discovery to shipped interfaces, discussing design architecture and pushing PRs alongside engineers.
        </p>
        <p>
          Based in NYC. Open to full-time roles and select freelance gigs.
        </p>
      </section>

      <section id="playground" className="container py-5 d-flex flex-column gap-4">        <div className="d-flex flex-column gap-2">
          <h4>
            Playground
          </h4>
          <p>Freelance, experiments, fun and other work.</p>
        </div>
        <div className="playground-grid d-grid gap-3">
          {PLAYGROUND_IMAGES.map((image) => (
            <div
              key={image.id}
              className={image.colSpan === 2 ? 'playground-grid__item--span-2' : undefined}
            >
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
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
