export function jsonp(url, params = {}, timeout = 8000) {
  return new Promise((resolve, reject) => {
    const callbackName = `excelcutJsonp_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2)}`
    const script = document.createElement('script')
    const targetUrl = new URL(url)
    let timeoutId

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        targetUrl.searchParams.set(key, String(value))
      }
    })

    targetUrl.searchParams.set('callback', callbackName)

    function cleanup() {
      window.clearTimeout(timeoutId)
      delete window[callbackName]
      script.remove()
    }

    window[callbackName] = (data) => {
      cleanup()
      resolve(data)
    }

    script.onerror = () => {
      cleanup()
      reject(new Error('JSONP request failed'))
    }

    timeoutId = window.setTimeout(() => {
      cleanup()
      reject(new Error('JSONP request timed out'))
    }, timeout)

    script.src = targetUrl.toString()
    script.async = true
    document.body.appendChild(script)
  })
}
