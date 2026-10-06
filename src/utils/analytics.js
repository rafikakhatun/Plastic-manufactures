export function trackEvent(eventName, parameters = {}) {
  if (typeof window === 'undefined') return
  if (typeof window.gtag === 'function') window.gtag('event', eventName, parameters)
  window.dispatchEvent(new CustomEvent('pmc:analytics', { detail: { eventName, parameters } }))
}
