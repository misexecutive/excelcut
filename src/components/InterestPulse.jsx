import { useEffect, useState } from 'react'
import { Activity } from 'lucide-react'

const storageKey = 'excelcut-interest-pulse'

function createInitialPulse() {
  const saved = window.localStorage.getItem(storageKey)
  const parsed = Number.parseInt(saved, 10)

  if (Number.isInteger(parsed) && parsed >= 50 && parsed <= 100) {
    return parsed
  }

  return Math.floor(Math.random() * 51) + 50
}

export default function InterestPulse() {
  const [pulse, setPulse] = useState(() => {
    if (typeof window === 'undefined') {
      return 74
    }

    const initialPulse = createInitialPulse()
    window.localStorage.setItem(storageKey, String(initialPulse))
    return initialPulse
  })
  const [hasChanged, setHasChanged] = useState(false)

  useEffect(() => {
    let timeoutId

    // Real inquiry counts require backend or analytics integration. This is a
    // non-transactional interest pulse, not an actual inquiry counter.
    function scheduleNextChange() {
      const delay = Math.floor(Math.random() * 20000) + 25000

      timeoutId = window.setTimeout(() => {
        setPulse((currentPulse) => {
          const direction = Math.random() > 0.45 ? 1 : -1
          const step = Math.floor(Math.random() * 4) + 1
          const nextPulse = Math.min(100, Math.max(50, currentPulse + direction * step))

          window.localStorage.setItem(storageKey, String(nextPulse))
          return nextPulse
        })
        setHasChanged(true)
        window.setTimeout(() => setHasChanged(false), 650)
        scheduleNextChange()
      }, delay)
    }

    scheduleNextChange()

    return () => window.clearTimeout(timeoutId)
  }, [])

  return (
    <div className={`interest-pulse ${hasChanged ? 'interest-pulse--changed' : ''}`}>
      <span className="interest-pulse__icon">
        <Activity size={17} aria-hidden="true" />
      </span>
      <span>
        <strong>{pulse}</strong> learners are exploring live class details right now
      </span>
    </div>
  )
}
