import { MessageCircle } from 'lucide-react'
import { openWhatsApp } from '../utils/whatsapp'

export default function WhatsAppButton({
  message,
  label = 'Send WhatsApp',
  className = '',
}) {
  return (
    <button
      type="button"
      className={`whatsapp-button ${className}`}
      onClick={() => openWhatsApp(message)}
    >
      <MessageCircle size={19} aria-hidden="true" />
      {label}
    </button>
  )
}
