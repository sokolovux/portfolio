import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const TOC_CONTAINER_GAP = 32

const LEVEL_OFFSET = {
  1: '',
  2: 'toc-link--level-2',
}

function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState(ids[0] ?? null)
  const visibleRatios = useRef(new Map())

  useEffect(() => {
    if (!ids.length) {
      return undefined
    }

    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)
    visibleRatios.current = new Map()

    function pickActiveFromScroll() {
      const scrollMarker = window.scrollY + window.innerHeight * 0.3
      let current = ids[0]

      for (const id of ids) {
        const element = document.getElementById(id)
        if (element && element.offsetTop <= scrollMarker) {
          current = id
        }
      }

      setActiveId(current)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleRatios.current.set(entry.target.id, entry.intersectionRatio)
          } else {
            visibleRatios.current.delete(entry.target.id)
          }
        })

        if (visibleRatios.current.size > 0) {
          const [bestId] = [...visibleRatios.current.entries()].sort(
            (a, b) => b[1] - a[1],
          )[0]
          setActiveId(bestId)
          return
        }

        pickActiveFromScroll()
      },
      {
        rootMargin: '-20% 0px -65% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    )

    elements.forEach((element) => observer.observe(element))
    pickActiveFromScroll()

    return () => {
      observer.disconnect()
    }
  }, [ids.join('|')])

  return activeId
}

function useTocLayout(navRef, contentRef) {
  const [fits, setFits] = useState(true)

  useLayoutEffect(() => {
    const nav = navRef.current
    if (!nav) {
      return undefined
    }

    function update() {
      const content = contentRef.current
      if (!content) {
        setFits(true)
        return
      }

      const container = content.querySelector('.container') ?? content
      const containerRect = container.getBoundingClientRect()
      const left = containerRect.right + TOC_CONTAINER_GAP
      const tocWidth = nav.offsetWidth || 192

      nav.style.setProperty('--table-of-contents-left', `${left}px`)

      const navRect = nav.getBoundingClientRect()
      const horizontalFits = left + tocWidth <= window.innerWidth
      const verticalFits = navRect.top >= 0 && navRect.bottom <= window.innerHeight

      setFits(horizontalFits && verticalFits)
    }

    update()

    const observer = new ResizeObserver(update)
    observer.observe(nav)

    const content = contentRef.current
    if (content) {
      observer.observe(content)
    }

    window.addEventListener('resize', update)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', update)
      nav.style.removeProperty('--table-of-contents-left')
    }
  }, [navRef, contentRef])

  return fits
}

function TocLink({ id, title, level, isActive }) {
  const { pathname } = useLocation()
  const classes = [
    'toc-link',
    LEVEL_OFFSET[level] ?? '',
    isActive ? 'toc-link--active' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Link
      to={`${pathname}#${id}`}
      className={classes}
      aria-current={isActive ? 'location' : undefined}
    >
      {title}
    </Link>
  )
}

export default function TableOfContents({ items, contentRef }) {
  const navRef = useRef(null)
  const ids = items.map((item) => item.id)
  const activeId = useScrollSpy(ids)
  const fits = useTocLayout(navRef, contentRef)

  if (!items.length) {
    return null
  }

  return (
    <nav
      ref={navRef}
      className={[
        'table-of-contents',
        'd-flex',
        'flex-column',
        'gap-1',
        fits ? '' : 'table-of-contents--hidden',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label="Table of contents"
      aria-hidden={!fits}
    >
      {items.map((item) => (
        <TocLink
          key={item.id}
          id={item.id}
          title={item.title}
          level={item.level}
          isActive={item.id === activeId}
        />
      ))}
    </nav>
  )
}
