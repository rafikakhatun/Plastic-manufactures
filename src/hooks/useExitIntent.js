import { useEffect, useState } from 'react'
import { trackEvent } from '../utils/analytics'

export default function useExitIntent(disabled) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const handleExit = (event) => {
      if (event.clientY <= 2 && !disabled && !sessionStorage.getItem('exitSeen')) {
        setOpen(true)
        sessionStorage.setItem('exitSeen', '1')
        trackEvent('exit_intent_shown')
      }
    }
    document.addEventListener('mouseout', handleExit)
    return () => document.removeEventListener('mouseout', handleExit)
  }, [disabled])
  return { open, close: () => setOpen(false) }
}
