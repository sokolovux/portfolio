import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import TableOfContents from '../TableOfContents.jsx'
import Divider from '../Divider.jsx'
import ProjectHero from './ProjectHero.jsx'
import { scrollToHashTarget } from '../../utils/scrollToHash.js'

export default function ProjectLayout({ meta, tocItems, children }) {
  const contentRef = useRef(null)
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return

    scrollToHashTarget(hash.slice(1))
  }, [hash])

  return (
    <>
      <TableOfContents items={tocItems} contentRef={contentRef} />

      <div ref={contentRef}>
        <ProjectHero meta={meta} />
        <Divider />
        {children}
      </div>
    </>
  )
}
