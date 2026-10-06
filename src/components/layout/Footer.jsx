import { Mail, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import logoImage from '../../assets/Modern Plastic Company Footer Logo.png'
import Button from '../ui/Button'

export default function Footer() {
  return <footer className="bg-ink pb-24 pt-16 text-white md:pb-10"><div className="container-shell grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
    <div><Link to="/" className="inline-block" aria-label="Plastic Manufactures and Co. home"><img src={logoImage} alt="Plastic Manufactures and Company" className="h-auto w-[220px] object-contain" /></Link><p className="mt-5 max-w-md text-sm leading-7 text-white/65">A trusted material partner for converters, manufacturers and industrial buyers—built on generations of polymer expertise.</p><Button to="/request-quotation" className="mt-7">Get a Professional Quotation</Button></div>
    <div><h3 className="text-sm font-bold">Explore</h3><div className="mt-5 grid gap-3 text-sm text-white/65"><Link to="/materials">All materials</Link><Link to="/materials">Applications</Link><Link to="/quotation/sample">Quality & documents</Link></div></div>
    <div><h3 className="text-sm font-bold">Talk to us</h3><div className="mt-5 grid gap-4 text-sm text-white/65"><span className="flex gap-3"><Phone size={17}/> +00 0000 000 000</span><span className="flex gap-3"><Mail size={17}/> sales@plasticmanufactures.com</span></div></div>
  </div><div className="container-shell mt-14 border-t border-white/10 pt-6 text-xs text-white/45">© {new Date().getFullYear()} Plastic Manufactures and Co. All rights reserved.</div></footer>
}
