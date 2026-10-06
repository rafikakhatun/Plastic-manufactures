import { AlertTriangle, ArrowLeft, Download, Mail } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import logoImage from '../assets/Modern Teal Plastic Manufacturing Logo.png'
import Button from '../components/ui/Button'
import { materials } from '../data/materials'
import usePageMeta from '../hooks/usePageMeta'
import { trackEvent } from '../utils/analytics'
import { calculateQuotePricing, formatPrice } from '../utils/pricing'
import { downloadQuotationPdf } from '../utils/quotationPdf'

export default function Quotation() {
  const { id } = useParams()
  const [quoteTime] = useState(() => Date.now())
  const stored = readStoredQuote()
  const item = materials.find(material => material.slug === stored?.material || material.name.toLowerCase() === String(stored?.material || '').toLowerCase()) || materials[0]
  // Recalculate from the current form values so older saved quotations also receive demo pricing.
  const pricing = calculateQuotePricing({
    material:item.slug,
    grade:stored?.grade || item.grade,
    colour:stored?.colour || item.colour,
    pack:stored?.pack || item.pack,
    qty:stored?.qty || 1000,
  })
  const isPriced = pricing.status === 'demo_priced'
  const validUntil = isPriced ? new Date(pricing.validUntil).toLocaleDateString('en-GB') : new Date(quoteTime + 3 * 864e5).toLocaleDateString('en-GB')
  const quote = {
    ref:id || 'PMC-SAMPLE', company:stored?.company || 'Customer Company', name:stored?.name || 'Procurement Team',
    email:stored?.email || 'To be confirmed', location:stored?.location || 'To be confirmed', requiredDate:stored?.date || 'To be confirmed',
    material:item.name, colour:stored?.colour || item.colour, pack:stored?.pack || item.pack, qty:stored?.qty || '1,000',
    rate:isPriced ? formatPrice(pricing.rate, pricing) : 'To be confirmed', date:new Date(quoteTime).toLocaleDateString('en-GB'),
    validUntil, pricing,
  }
  usePageMeta({ title:`Quotation ${quote.ref} | Plastic Manufactures & Co.`, description:'Professional material quotation preview.', canonicalPath:`/quotation/${quote.ref}` })

  const downloadPdf = () => {
    trackEvent('download_quote', { quotation_id:quote.ref, pricing_status:pricing.status })
    downloadQuotationPdf(quote)
  }

  return <main className="bg-surface py-10 md:py-16"><div className="container-shell">
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-body"><ArrowLeft size={16}/>Back to home</Link><div className="flex gap-2"><Button onClick={downloadPdf} variant="secondary"><Download size={16}/>Download PDF</Button><Button onClick={()=>alert('Email delivery will be enabled when the approved email service is connected.')}><Mail size={16}/>Send by email</Button></div></div>
    <article className="mx-auto max-w-5xl rounded-[18px] border border-line bg-white p-6 shadow-soft md:p-12">
      {pricing.isDemo && <div className="mb-8 flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-900"><AlertTriangle className="mt-0.5 shrink-0" size={19}/><div><strong className="block text-sm">Demo pricing preview — not for commercial use</strong><p className="mt-1 text-xs leading-5">Rates are sample frontend values and must be replaced with client-approved commercial data before launch.</p></div></div>}
      <div className="flex flex-col justify-between gap-8 border-b-2 border-ink pb-8 md:flex-row"><Link to="/" className="self-start" aria-label="Plastic Manufactures and Co. home"><img src={logoImage} alt="Plastic Manufactures and Company" className="h-auto w-[210px] object-contain md:w-[250px]"/></Link><div className="md:text-right"><h1 className="text-3xl font-extrabold uppercase tracking-[.08em] text-ink">Quotation</h1><p className="mt-3 text-sm text-body">No. <strong className="text-ink">{quote.ref}</strong></p></div></div>
      <div className="grid gap-8 border-b border-line py-8 md:grid-cols-2"><div><span className="quote-label">Prepared for</span><strong className="mt-2 block text-lg text-ink">{quote.company}</strong><p className="mt-1 text-sm text-body">Attn: {quote.name}</p><p className="mt-1 text-sm text-body">{quote.email}</p></div><div className="md:text-right"><span className="quote-label">Quotation details</span><p className="mt-2 text-sm text-body">Date: {quote.date}</p><p className="mt-1 text-sm text-body">Valid until: {quote.validUntil}</p><p className="mt-1 text-sm text-body">Delivery: {quote.location}</p></div></div>
      <div className="mt-8 overflow-x-auto"><table className="w-full min-w-[680px] text-left text-sm"><thead className="bg-ink text-white"><tr>{['Material','Colour','Pack','Quantity','Rate'].map(label=><th className="px-4 py-4" key={label}>{label}</th>)}</tr></thead><tbody><tr className="border-b border-line">{[quote.material,quote.colour,quote.pack,`${quote.qty} kg`,`${quote.rate}${isPriced ? '/kg' : ''}`].map(value=><td className="px-4 py-5 text-body" key={value}>{value}</td>)}</tr></tbody></table></div>
      <div className="mt-10 grid gap-8 md:grid-cols-[1fr_340px]"><div><h2 className="text-sm font-extrabold text-ink">Terms & notes</h2><ul className="mt-4 space-y-2 text-xs leading-6 text-body"><li>• Rates are subject to final confirmation and material availability.</li><li>• Delivery target is within seven days of order confirmation.</li><li>• Payment, freight and applicable taxes will be confirmed separately.</li></ul></div><div className="rounded-xl bg-surface p-5">{isPriced ? <><PriceRow label="Materials subtotal" value={formatPrice(pricing.materialSubtotal,pricing)}/><PriceRow label="Freight" value={formatPrice(pricing.freight,pricing)}/><PriceRow label={`Tax (${pricing.taxPercent}%)`} value={formatPrice(pricing.tax,pricing)}/><div className="mt-4 flex justify-between border-t border-line pt-4 text-lg font-extrabold text-ink"><span>Demo total</span><span>{formatPrice(pricing.total,pricing)}</span></div></> : <><PriceRow label="Subtotal" value="To be confirmed"/><div className="mt-4 flex justify-between border-t border-line pt-4 text-lg font-extrabold text-ink"><span>Total</span><span>To be confirmed</span></div></>}</div></div>
      {isPriced ? <div className="mt-10 rounded-xl bg-amber-50 p-5 text-sm leading-6 text-amber-900"><strong>Demo calculation:</strong> This preview demonstrates automated frontend pricing. It is not a valid commercial offer.</div> : <div className="mt-10 rounded-xl bg-[#d9f2ee] p-5 text-sm leading-6 text-teal"><strong>Manual review:</strong> {pricing.reason || 'Our team will confirm the current material rate before issuing the final commercial quotation.'}</div>}
    </article>
  </div></main>
}

function PriceRow({ label, value }) {
  return <div className="mb-3 flex justify-between gap-4 text-sm text-body"><span>{label}</span><strong className="text-right text-ink">{value}</strong></div>
}

function readStoredQuote() {
  try {
    return JSON.parse(sessionStorage.getItem('quote') || 'null')
  } catch {
    return null
  }
}
