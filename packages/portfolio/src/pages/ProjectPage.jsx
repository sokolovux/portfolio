import { Fragment, useEffect, useRef } from 'react'

import { useLocation } from 'react-router-dom'

import DividerText from '../components/DividerText.jsx'

import TableOfContents from '../components/TableOfContents.jsx'

import { buildTocItems, getSectionDomId } from '../utils/toc.js'
import { scrollToHashTarget } from '../utils/scrollToHash.js'



function SubsectionBlock({ subsection, parentId, level }) {

  const id = getSectionDomId(subsection, parentId)

  const HeadingTag = level === 2 ? 'h5' : 'h6'



  return (

    <div className="d-flex flex-column gap-3">

      <HeadingTag id={id} className={level === 3 ? 'small' : undefined}>

        {subsection.title}

      </HeadingTag>

      {subsection.paragraphs?.map((paragraph, index) => (

        <p key={`${id}-${index}`}>{paragraph}</p>

      ))}

      {subsection.subsections?.map((nested) => (

        <SubsectionBlock

          key={getSectionDomId(nested, id)}

          subsection={nested}

          parentId={id}

          level={level + 1}

        />

      ))}

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

      {section.paragraphs.map((paragraph, index) => (

        <p key={`${sectionId}-${index}`}>{paragraph}</p>

      ))}

      {section.subsections?.map((subsection) => (

        <SubsectionBlock

          key={getSectionDomId(subsection, sectionId)}

          subsection={subsection}

          parentId={sectionId}

          level={2}

        />

      ))}

      <div

        className="landing-placeholder-image shadow"

        role="img"

        aria-label={section.imageLabel}

      />

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

          <p className="text-muted">{project.description}</p>

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


