import { Fragment, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import DividerText from '../components/DividerText.jsx'
import TableOfContents from '../components/TableOfContents.jsx'
import { buildTocItems, getSectionDomId } from '../utils/toc.js'
import { scrollToHashTarget } from '../utils/scrollToHash.js'

function PlaceholderImage({ label }) {
  return (
    <div
      className="landing-placeholder-image shadow"
      role="img"
      aria-label={label}
    />
  )
}

function SubsectionBlock({ subsection, parentId, subsectionIndex, level }) {
  const id = subsection.title
    ? getSectionDomId(subsection, parentId)
    : `${parentId}-${subsectionIndex}`
  const HeadingTag = level === 2 ? 'h5' : 'h6'

  return (
    <div className="d-flex flex-column gap-2 mt-3">
      {subsection.title ? (
        <HeadingTag id={id}>
          {subsection.title}
        </HeadingTag>
      ) : null}
      {subsection.paragraphs?.map((paragraph, index) => (
        <p key={`${id}-${index}`}>{paragraph}</p>
      ))}
      {subsection.imageLabel ? (
        <PlaceholderImage label={subsection.imageLabel} />
      ) : null}
      {subsection.subsections?.length > 0 && (
        <div className="d-flex flex-column gap-2">
          {subsection.subsections.map((nested, index) => (
            <SubsectionBlock
              key={nested.title ? getSectionDomId(nested, id) : `${id}-${index}`}
              subsection={nested}
              parentId={id}
              subsectionIndex={index}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function ProjectSection({ section }) {
  const sectionId = getSectionDomId(section)

  return (
    <section className="container py-5 d-flex flex-column gap-3">
      <h4 id={sectionId}>
        <span className="text-highlight">*</span>
        {section.title}
      </h4>
      {section.paragraphs?.map((paragraph, index) => (
        <p key={`${sectionId}-${index}`}>{paragraph}</p>
      ))}
      {section.subsections?.length > 0 && (
        <div className="d-flex flex-column gap-2">
          {section.subsections.map((subsection, index) => (
            <SubsectionBlock
              key={subsection.title ? getSectionDomId(subsection, sectionId) : `${sectionId}-${index}`}
              subsection={subsection}
              parentId={sectionId}
              subsectionIndex={index}
              level={2}
            />
          ))}
        </div>
      )}
      {section.imageLabel ? (
        <PlaceholderImage label={section.imageLabel} />
      ) : null}
    </section>
  )
}

export default function ProjectPage({ project }) {
  const contentRef = useRef(null)
  const { hash } = useLocation()
  const tocItems = buildTocItems(project.sections)

  useEffect(() => {
    if (!hash) return

    scrollToHashTarget(hash.slice(1))
  }, [hash])

  return (
    <>
      <TableOfContents items={tocItems} contentRef={contentRef} />

      <div ref={contentRef}>
        <section className="container py-5 d-flex flex-column gap-3">
          <h2>{project.title}</h2>
          <p className="pb-3">{project.description}</p>
          <div className="border-top row row-cols-2 row-cols-lg-5 g-3">
            {project.landingColumns.map((column) => (
              <div key={column.title} className="col">
                <div className="d-flex flex-column gap-2">
                  <h6>{column.title}</h6>
                  <small>
                    {column.words.map((word, index) => (
                      <Fragment key={`${column.title}-${word}`}>
                        {index > 0 ? <br /> : null}
                        {word}
                      </Fragment>
                    ))}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </section>

        {project.sections.map((section) => (
          <Fragment key={section.title}>
            <div className="container">
              <DividerText />
            </div>
            <ProjectSection section={section} />
          </Fragment>
        ))}
      </div>
    </>
  )
}
