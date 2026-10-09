import { ArrowRight, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import logoImage from '../../assets/Glossy Plastic Manufactures Co. Logo.png'
import Button from '../ui/Button'

export default function MobileMenu({ open, close }) {
  return <div className={`fixed inset-0 z-50 lg:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
    <button aria-label="Close menu overlay" onClick={close} className={`absolute inset-0 bg-ink/50 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} />
    <div className={`absolute right-0 top-0 h-full w-[86%] max-w-sm bg-white p-6 shadow-2xl transition-transform duration-500 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex items-center justify-between gap-4"><Link to="/" onClick={close} className="min-w-0" aria-label="Plastic Manufactures and Co. home"><img src={logoImage} alt="Plastic Manufactures and Company" className="h-auto w-[180px] max-w-full object-contain" /></Link><button onClick={close} className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-surface" aria-label="Close menu"><X/></button></div>
      <nav className="mt-12 space-y-1">{['Materials','Applications','Quality & Documents','About','Contact'].map((label,index)=><Link onClick={close} key={label} to={index < 2 ? '/materials' : index === 2 ? '/quotation/sample' : index === 4 ? '/request-quotation' : '/'} className="flex items-center justify-between border-b border-line py-4 text-base font-bold text-ink">{label}<ArrowRight size={18}/></Link>)}</nav>
      <Button onClick={close} to="/request-quotation" className="mt-8 w-full">Get a Professional Quotation</Button>
    </div>
  </div>
}
