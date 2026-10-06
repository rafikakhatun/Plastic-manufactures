import { ArrowRight, Menu } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import logoImage from '../../assets/Modern Teal Plastic Manufacturing Logo.png'
import Button from '../ui/Button'

export default function Header({ openMenu }) {
  const nav = [['Materials','/materials'],['Applications','/materials'],['Quality & Documents','/quotation/sample'],['About','/#about'],['Contact','/request-quotation']]
  return <header className="sticky top-0 z-40 border-b border-line/80 bg-white/90 backdrop-blur-xl"><div className="container-shell flex h-[76px] items-center justify-between gap-5">
    <Link to="/" className="shrink-0" aria-label="Plastic Manufactures and Co. home"><img src={logoImage} alt="Plastic Manufactures and Company" className="h-auto w-[170px] object-contain sm:w-[205px]" /></Link>
    <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">{nav.map(([label,to])=><NavLink key={label} to={to} className="text-[13px] font-semibold text-body transition-colors hover:text-teal">{label}</NavLink>)}</nav>
    <div className="hidden lg:block"><Button to="/request-quotation">Get a Professional Quotation <ArrowRight size={16}/></Button></div>
    <button onClick={openMenu} className="grid h-11 w-11 place-items-center rounded-lg border border-line text-ink lg:hidden" aria-label="Open menu"><Menu size={22}/></button>
  </div></header>
}
