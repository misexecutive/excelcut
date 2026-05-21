const phoneNumber = '918384882675'

export function createWhatsAppLink(message) {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
}

export function openWhatsApp(message) {
  const encodedMessage = encodeURIComponent(message)
  const universalLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
  const appLink = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`
  const isMobile = /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(
    window.navigator.userAgent,
  )

  if (!isMobile) {
    window.open(universalLink, '_blank', 'noopener,noreferrer')
    return
  }

  window.location.href = appLink
  window.setTimeout(() => {
    window.location.href = universalLink
  }, 900)
}
