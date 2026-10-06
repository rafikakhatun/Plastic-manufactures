import { ArrowRight, CheckCircle2, ClipboardList, FileCheck2, Layers3, Search, Sparkles, Truck } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MaterialCard from '../components/materials/MaterialCard'
import Button from '../components/ui/Button'
import PlaceholderImage from '../components/ui/PlaceholderImage'
import { applications } from '../data/applications'
import { materials } from '../data/materials'
import usePageMeta from '../hooks/usePageMeta'

export default function Home() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  usePageMeta({ title:'Plastic Manufactures & Co. | Industrial Polymer Materials', description:'Virgin and recycled polymer granules for manufacturers, with professional quotation support.', canonicalPath:'/' })
  const submit = (event) => { event.preventDefault(); navigate(`/materials?q=${encodeURIComponent(search)}`) }
  return <>
    {/* Hero section */}
    <section className="relative overflow-hidden bg-surface py-16 md:py-24 lg:py-28"><div className="hero-orb left-[-8rem] top-[-8rem] bg-[#d9f2ee]"/><div className="hero-orb bottom-[-9rem] right-[-7rem] bg-[#fde9d9]"/><div className="container-shell relative grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
      <div className="animate-rise"><span className="eyebrow"><Sparkles size={14}/> Industrial materials. Professional service.</span><h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-[-.045em] text-ink sm:text-5xl lg:text-[64px]">The right plastic material, <span className="text-teal">specified with confidence.</span></h1><p className="mt-6 max-w-2xl text-base leading-8 text-body md:text-lg">Virgin and recycled polymer granules, matched to your process, colour and performance needs—delivered in as little as seven days.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button to="/request-quotation" className="min-h-14 px-7">Get a Professional Quotation <ArrowRight size={18}/></Button><Button to="/materials" variant="secondary" className="min-h-14 px-7">Browse materials</Button></div><div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-body">{['All grades & colours','Flexible pack sizes','Technical support'].map(item=><span key={item} className="flex items-center gap-2"><CheckCircle2 className="text-teal" size={17}/>{item}</span>)}</div></div>
      <div className="relative animate-rise-delay"><PlaceholderImage label={materials[7].imageAlt} src={materials[7].image} eager tone="blue" className="h-[380px] rounded-[28px] shadow-lift md:h-[500px]"/><div className="absolute -bottom-5 left-4 rounded-2xl bg-white p-4 shadow-lift md:-left-8 md:p-5"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#d9f2ee] text-teal"><Truck size={22}/></span><div><strong className="block text-sm text-ink">Delivery in 7 days</strong><span className="text-xs text-body">Across all major grades</span></div></div></div></div>
    </div></section>

    {/* Material search */}
    <section className="relative z-10 bg-white py-10"><div className="container-shell"><form onSubmit={submit} className="mx-auto flex max-w-4xl flex-col gap-3 rounded-2xl border border-line bg-white p-3 shadow-soft sm:flex-row"><label className="flex flex-1 items-center gap-3 px-3"><Search className="text-teal" size={21}/><input value={search} onChange={event=>setSearch(event.target.value)} className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-body/60" placeholder="Search by polymer, grade or application…" aria-label="Search materials"/></label><Button type="submit" className="sm:px-8">Search materials</Button></form></div></section>

    {/* Featured catalogue */}
    <section className="section-space bg-white"><div className="container-shell"><div className="section-heading"><div><span className="eyebrow">Materials for every process</span><h2>Explore our material range</h2><p>From high-volume commodity polymers to specialist engineering grades.</p></div><Button to="/materials" variant="secondary" className="hidden md:inline-flex">View all materials <ArrowRight size={17}/></Button></div><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{materials.slice(0,3).map(item=><MaterialCard key={item.slug} item={item}/>)}</div><Button to="/materials" variant="secondary" className="mt-6 w-full md:hidden">View all materials</Button></div></section>

    {/* Downstream application examples */}
    <section className="bg-surface py-16 md:py-20"><div className="container-shell">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink md:text-3xl">Made with our granules</h2>
        <p className="mt-3 text-sm leading-7 text-body md:text-base">From packaging and pipework to automotive components and everyday products, our polymer materials support a wide range of manufacturing applications.</p>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
        {applications.map(application=><article key={application.title} className="group flex h-full flex-col overflow-hidden rounded-[14px] border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-teal/30 hover:shadow-soft">
          <div className="aspect-[4/3] overflow-hidden bg-surface">
            <img src={application.image} alt={application.imageAlt} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.025]" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <span className={`mb-4 h-1 w-10 rounded-full ${application.accent}`} aria-hidden="true" />
            <h3 className="text-base font-extrabold text-ink">{application.title}</h3>
            <p className="mt-2 text-xs leading-6 text-body">{application.description}</p>
          </div>
        </article>)}
      </div>
    </div></section>

    {/* Three-step quotation journey */}
    <section className="border-y border-line bg-white py-14 md:py-20"><div className="container-shell">
      <h2 className="text-center text-2xl font-extrabold tracking-tight text-ink md:text-3xl">From enquiry to quotation in three steps</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3 md:gap-5">
        {[
          ['1',Layers3,'Choose your material','Pick type, grade, colour and pack size.','bg-[#d9f2ee]'],
          ['2',ClipboardList,'Tell us your need','Quantity, delivery location, required date and contact details.','bg-[#fde9d9]'],
          ['3',FileCheck2,'Receive your quotation','A branded quotation by email and PDF, with validity period and terms.','bg-[#ede7fa]'],
        ].map(([number,Icon,title,text,colour])=><article key={number} className={`group rounded-[14px] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft md:p-7 ${colour}`}>
          <div className="flex items-center justify-between"><span className="text-2xl font-medium text-cta">{number}</span><span className="grid h-10 w-10 place-items-center rounded-xl bg-white/55 text-teal transition-transform duration-300 group-hover:scale-105"><Icon size={20} strokeWidth={1.8}/></span></div>
          <h3 className="mt-3 text-sm font-extrabold text-ink md:text-base">{title}</h3>
          <p className="mt-2 text-xs leading-5 text-body">{text}</p>
        </article>)}
      </div>
      <p className="mt-6 text-center text-[11px] text-body">Technical data sheets, COA and SDS available per grade.</p>
    </div></section>
    <section id="about" className="section-space bg-teal text-white"><div className="container-shell flex flex-col items-start justify-between gap-8 md:flex-row md:items-center"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-white/65">Your next material, sourced with confidence</p><h2 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight md:text-4xl">Tell us what you need. We’ll turn it into a professional quotation.</h2></div><Button to="/request-quotation" variant="secondary" className="shrink-0 border-white bg-white px-6 text-ink hover:border-white hover:bg-surface hover:text-teal">Start your quotation <ArrowRight size={18}/></Button></div></section>
  </>
}
