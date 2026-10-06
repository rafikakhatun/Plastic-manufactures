import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import PlaceholderImage from '../ui/PlaceholderImage'

export default function MaterialCard({ item, compact = false }) {
  return <article className="group flex h-full flex-col overflow-hidden rounded-[14px] border border-line bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-teal/40 hover:shadow-lift">
    <Link to={`/materials/${item.slug}`}><PlaceholderImage label={item.imageAlt || item.name} src={item.image} tone={item.tone} className={`${compact ? 'h-36' : 'h-52'} transition-transform duration-700 group-hover:scale-[1.03]`}/></Link>
    <div className={`${compact ? 'p-4' : 'p-5'} flex flex-1 flex-col`}><p className="mb-2 text-[10px] font-bold uppercase tracking-[.18em] text-teal">{item.type} · {item.code}</p><Link to={`/materials/${item.slug}`} className="text-lg font-extrabold tracking-tight text-ink transition-colors hover:text-teal">{item.name}</Link>{!compact && <p className="mt-2 text-sm leading-6 text-body">{item.description}</p>}
      <div className="mt-auto flex items-center justify-between border-t border-line pt-4"><span className="text-xs font-semibold text-body">7-day delivery</span><Link to={`/request-quotation?material=${item.slug}`} className="flex items-center gap-1 text-xs font-extrabold text-cta">{compact ? 'Quote' : 'Request quotation'} <ArrowRight size={14}/></Link></div>
    </div>
  </article>
}
