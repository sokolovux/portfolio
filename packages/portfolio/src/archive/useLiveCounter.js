import { useCallback, useEffect, useState } from 'react'

const POLL_INTERVAL_MS = 3000

async function fetchCount() {
  const response = await fetch('/api/counter')

  if (!response.ok) {
    throw new Error('Failed to fetch counter')
  }

  const data = await response.json()
  return data.count
}

export function useLiveCounter() {
  const [count, setCount] = useState(null)
  const [available, setAvailable] = useState(false)

  const refresh = useCallback(async () => {
    try {
      const nextCount = await fetchCount()
      setCount(nextCount)
      setAvailable(true)
    } catch {
      setAvailable(false)
    }
  }, [])

  useEffect(() => {
    refresh()

    let timeoutId

    const schedulePoll = () => {
      timeoutId = window.setTimeout(() => {
        if (!document.hidden) {
          refresh()
        }
        schedulePoll()
      }, POLL_INTERVAL_MS)
    }

    schedulePoll()

    const onVisibilityChange = () => {
      if (!document.hidden) {
        refresh()
      }
    }

    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      window.clearTimeout(timeoutId)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [refresh])

  const increment = useCallback(() => {
    setCount((current) => (current ?? 0) + 1)

    fetch('/api/counter', { method: 'POST' })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to increment counter')
        }
        return response.json()
      })
      .then((data) => {
        setCount(data.count)
        setAvailable(true)
      })
      .catch(() => {
        refresh()
      })
  }, [refresh])

  return { count, increment, available }
}
