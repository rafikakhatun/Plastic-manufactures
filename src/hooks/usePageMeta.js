import { useEffect } from 'react'

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value))
}

export default function usePageMeta({ title, description, canonicalPath, schema }) {
  useEffect(() => {
    const canonicalUrl = new URL(canonicalPath, window.location.origin).href
    document.title = title
    upsertMeta('meta[name="description"]', { name: 'description', content: description })
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title })
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description })
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl })
    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical) }
    canonical.href = canonicalUrl
    const id = 'page-json-ld'
    let script = document.getElementById(id)
    if (!script) { script = document.createElement('script'); script.id = id; script.type = 'application/ld+json'; document.head.appendChild(script) }
    script.textContent = JSON.stringify(schema || { '@context':'https://schema.org', '@type':'Organization', name:'Plastic Manufactures and Co.', url:window.location.origin })
  }, [canonicalPath, description, schema, title])
}
