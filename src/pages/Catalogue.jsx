import { Filter, Search, SlidersHorizontal, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import FilterPanel from '../components/materials/FilterPanel'
import MaterialCard from '../components/materials/MaterialCard'
import Button from '../components/ui/Button'
import { catalogueFilterGroups, materials } from '../data/materials'
import usePageMeta from '../hooks/usePageMeta'
import { calculateQuotePricing } from '../utils/pricing'

const matchesPriceRange = (price, range) => {
  if (range === 'Price on request') return !Number.isFinite(price)
  if (!Number.isFinite(price)) return false
  if (range === 'Up to INR 125') return price <= 125
  if (range === 'INR 125 - INR 175') return price > 125 && price <= 175
  return range === 'Above INR 175' && price > 175
}

const matchesText = (material, query) => !query || Object.entries(material)
  .filter(([key]) => key !== 'image')
  .some(([,value]) => String(value).toLowerCase().includes(query.toLowerCase()))

const matchesGroup = (material, group, values) => {
  if (!values.length) return true
  if (group.field === 'demoPrice') return values.some(value=>matchesPriceRange(material.demoPrice,value))
  return values.includes(material[group.field])
}

export default function Catalogue() {
  const [params,setParams] = useSearchParams()
  const [query,setQuery] = useState(params.get('q')||'')
  const [sheet,setSheet] = useState(false)
  const [searchFocused,setSearchFocused] = useState(false)
  const selected = Object.fromEntries(catalogueFilterGroups.map(group=>[group.param,params.getAll(group.param)]))
  const selectedItems = catalogueFilterGroups.flatMap(group=>(selected[group.param]||[]).map(value=>({ ...group,value })))

  const pricedMaterials = useMemo(()=>materials.map(material=>{
    const pricing=calculateQuotePricing({ material:material.slug,grade:material.grade,colour:material.colour,pack:material.pack,qty:25 })
    return { ...material,demoPrice:pricing.status==='demo_priced'?pricing.rate:null }
  }),[])

  const matches = (material,ignoredParam) => matchesText(material,query) && catalogueFilterGroups.every(group=>group.param===ignoredParam||matchesGroup(material,group,selected[group.param]||[]))
  const results = pricedMaterials.filter(material=>matches(material))
  const counts = Object.fromEntries(catalogueFilterGroups.flatMap(group=>group.options.map(option=>[
    `${group.param}:${option}`,
    pricedMaterials.filter(material=>matches(material,group.param)&&matchesGroup(material,group,[option])).length,
  ])))
  const suggestions=query.trim()?pricedMaterials.filter(material=>matchesText(material,query)).slice(0,5):[]

  usePageMeta({ title:'Plastic Materials Catalogue | Plastic Manufactures & Co.',description:'Browse polymer materials by type, grade, colour, packaging, application, certification and demo price range.',canonicalPath:'/materials' })

  const commitParams = next => {next.delete('filter');setParams(next,{replace:true})}
  const updateQuery = value => {setQuery(value);const next=new URLSearchParams(params);value?next.set('q',value):next.delete('q');commitParams(next)}
  const toggle = (param,value) => {const next=new URLSearchParams(params);const values=next.getAll(param);next.delete(param);(values.includes(value)?values.filter(item=>item!==value):[...values,value]).forEach(item=>next.append(param,item));commitParams(next)}
  const clearFilters = () => {const next=new URLSearchParams();if(query)next.set('q',query);setParams(next,{replace:true})}
  const clearAll = () => {setQuery('');setParams({}, { replace:true })}

  return <div className="min-h-screen bg-surface">
    <section className="border-b border-line bg-white py-12"><div className="container-shell"><span className="eyebrow">Material catalogue</span><h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink md:text-5xl">Find the right material</h1><p className="mt-4 max-w-2xl text-body">Explore virgin and recycled polymers by specification, use case and demo price range.</p><div className="relative mt-8 max-w-3xl"><div className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 shadow-sm transition-all focus-within:border-teal focus-within:ring-4 focus-within:ring-teal/10"><Search size={20} className="text-teal"/><input className="h-14 flex-1 bg-transparent outline-none" value={query} onChange={event=>updateQuery(event.target.value)} onFocus={()=>setSearchFocused(true)} onBlur={()=>setTimeout(()=>setSearchFocused(false),120)} autoComplete="off" role="combobox" aria-expanded={searchFocused&&suggestions.length>0} aria-controls="material-suggestions" placeholder="Search materials, grades or applications..."/>{query&&<button type="button" onClick={()=>updateQuery('')} className="rounded-full p-1 text-body transition-colors hover:bg-surface hover:text-ink" aria-label="Clear search"><X size={17}/></button>}</div>{searchFocused&&suggestions.length>0&&<div id="material-suggestions" className="absolute inset-x-0 top-[62px] z-20 overflow-hidden rounded-xl border border-line bg-white py-2 shadow-lift" role="listbox">{suggestions.map(material=><button type="button" key={material.slug} onMouseDown={()=>updateQuery(material.name)} className="flex w-full items-center justify-between px-4 py-3 text-left text-sm transition-colors hover:bg-surface" role="option"><span><strong className="block text-ink">{material.name}</strong><span className="text-xs text-body">{material.family} · {material.grade}</span></span><span className="text-[10px] font-bold uppercase tracking-wider text-teal">Select</span></button>)}</div>}</div></div></section>

    <section className="container-shell py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm font-semibold text-body"><strong className="text-ink">{results.length}</strong> materials found</p><p className="mt-1 text-[11px] text-body">Prices are illustrative frontend demo rates.</p></div><button onClick={()=>setSheet(true)} className="flex items-center gap-2 rounded-lg border border-line bg-white px-4 py-3 text-sm font-bold text-ink shadow-sm transition-all hover:border-teal hover:text-teal lg:hidden"><Filter size={17}/>Filters {selectedItems.length?`(${selectedItems.length})`:''}</button></div>

      {selectedItems.length>0&&<div className="mb-7 flex flex-wrap items-center gap-2 rounded-xl border border-line bg-white p-3"><span className="mr-1 flex items-center gap-2 px-1 text-xs font-bold text-ink"><SlidersHorizontal size={14}/>Active</span>{selectedItems.map(item=><button key={`${item.param}-${item.value}`} onClick={()=>toggle(item.param,item.value)} className="inline-flex items-center gap-1.5 rounded-full bg-[#d9f2ee] px-3 py-1.5 text-xs font-bold text-teal transition-colors hover:bg-teal hover:text-white">{item.value}<X size={13}/></button>)}<button onClick={clearFilters} className="ml-auto px-2 text-xs font-bold text-cta hover:underline">Clear filters</button></div>}

      <div className="grid gap-8 lg:grid-cols-[270px_1fr]"><aside className="hidden self-start rounded-[16px] border border-line bg-white p-5 shadow-sm lg:sticky lg:top-24 lg:block"><div className="mb-6 flex items-center justify-between border-b border-line pb-5"><span className="flex items-center gap-2 font-extrabold text-ink"><SlidersHorizontal size={18} className="text-teal"/>Filter by</span>{selectedItems.length>0&&<button onClick={clearFilters} className="text-xs font-bold text-cta hover:underline">Clear</button>}</div><FilterPanel selected={selected} toggle={toggle} counts={counts}/></aside><div>{results.length?<div className="grid grid-cols-2 gap-3 md:gap-5 xl:grid-cols-3">{results.map(item=><MaterialCard key={item.slug} item={item} compact/>)}</div>:<div className="rounded-2xl border border-line bg-white p-12 text-center shadow-sm"><Search className="mx-auto text-teal" size={36}/><h2 className="mt-4 text-xl font-extrabold text-ink">No materials found</h2><p className="mt-2 text-sm text-body">Try removing a filter or searching with another term.</p><Button onClick={clearAll} variant="secondary" className="mt-6">Clear search and filters</Button></div>}</div></div>
    </section>

    <div className={`fixed inset-0 z-50 lg:hidden ${sheet?'pointer-events-auto':'pointer-events-none'}`}><button className={`absolute inset-0 bg-ink/50 transition-opacity duration-300 ${sheet?'opacity-100':'opacity-0'}`} onClick={()=>setSheet(false)} aria-label="Close filters"/><div className={`absolute bottom-0 max-h-[88vh] w-full overflow-y-auto rounded-t-3xl bg-white p-6 shadow-lift transition-transform duration-500 ${sheet?'translate-y-0':'translate-y-full'}`}><div className="sticky -top-6 z-10 mb-7 flex items-center justify-between border-b border-line bg-white py-5"><div><h2 className="text-xl font-extrabold text-ink">Filter materials</h2><p className="mt-1 text-xs text-body">{selectedItems.length} filters selected</p></div><button onClick={()=>setSheet(false)} className="rounded-full p-2 transition-colors hover:bg-surface" aria-label="Close filters"><X/></button></div><FilterPanel selected={selected} toggle={toggle} counts={counts}/><div className="sticky -bottom-6 mt-8 grid grid-cols-[auto_1fr] gap-3 border-t border-line bg-white py-5"><Button onClick={clearFilters} variant="secondary">Clear</Button><Button onClick={()=>setSheet(false)}>Show {results.length} materials</Button></div></div></div>
  </div>
}
