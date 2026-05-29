import { useEffect, useState } from 'react'
import { Eye, UsersRound } from 'lucide-react'
import {
  VISITOR_COUNTER_API,
  VISITOR_COUNTER_ENABLED,
} from '../config/visitorCounter'
import { jsonp } from '../utils/jsonp'

const visitorIdKey = 'excelcut_visitor_id'
const visitCountedKey = 'excelcut_visit_counted'

function createVisitorId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID()
  }

  return `visitor_${Date.now()}_${Math.random().toString(36).slice(2)}`
}

function getVisitorId() {
  const savedVisitorId = window.localStorage.getItem(visitorIdKey)

  if (savedVisitorId) {
    return savedVisitorId
  }

  const visitorId = createVisitorId()
  window.localStorage.setItem(visitorIdKey, visitorId)
  return visitorId
}

function formatCount(value) {
  if (!Number.isFinite(value)) {
    return '...'
  }

  return new Intl.NumberFormat('en-IN').format(value)
}

export default function VisitorCounter() {
  const [stats, setStats] = useState(null)
  const [isLoading, setIsLoading] = useState(VISITOR_COUNTER_ENABLED)

  useEffect(() => {
    if (!VISITOR_COUNTER_ENABLED) {
      return undefined
    }

    let isMounted = true
    const alreadyCounted = window.sessionStorage.getItem(visitCountedKey) === '1'
    const action = alreadyCounted ? 'stats' : 'visit'

    if (!alreadyCounted) {
      window.sessionStorage.setItem(visitCountedKey, '1')
    }

    jsonp(VISITOR_COUNTER_API, {
      action,
      visitorId: getVisitorId(),
      pageUrl: window.location.href,
      referrer: document.referrer,
      userAgent: window.navigator.userAgent,
    })
      .then((data) => {
        if (isMounted && data?.ok && data.stats) {
          setStats(data.stats)
        }
      })
      .catch(() => {
        if (!alreadyCounted) {
          window.sessionStorage.removeItem(visitCountedKey)
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  if (!VISITOR_COUNTER_ENABLED) {
    return null
  }

  if (!isLoading && !stats) {
    return null
  }

  return (
    <div className="visitor-counter" aria-label="Website visitor statistics">
      <div className="visitor-counter__item">
        <span className="visitor-counter__icon">
          <Eye size={17} aria-hidden="true" />
        </span>
        <span>
          <small>Total Visits</small>
          <strong>{isLoading ? 'Loading...' : formatCount(stats.totalPageViews)}</strong>
        </span>
      </div>
      <div className="visitor-counter__item">
        <span className="visitor-counter__icon">
          <UsersRound size={17} aria-hidden="true" />
        </span>
        <span>
          <small>Unique Learners Reached</small>
          <strong>{isLoading ? 'Loading...' : formatCount(stats.uniqueVisitors)}</strong>
        </span>
      </div>
      <div className="visitor-counter__item">
        <span className="visitor-counter__icon">
          <UsersRound size={17} aria-hidden="true" />
        </span>
        <span>
          <small>Visitors Today</small>
          <strong>{isLoading ? 'Loading...' : formatCount(stats.todayUniqueVisitors)}</strong>
        </span>
      </div>
    </div>
  )
}
