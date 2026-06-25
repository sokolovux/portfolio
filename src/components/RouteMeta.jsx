import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { applyDocumentMeta, applyJsonLd } from '../utils/documentMeta.js'
import { getRouteMeta } from '../utils/getRouteMeta.js'
import { getRouteJsonLd } from '../utils/structuredData.js'

export default function RouteMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    applyDocumentMeta(getRouteMeta(pathname))
    applyJsonLd(getRouteJsonLd(pathname))
  }, [pathname])

  return null
}
