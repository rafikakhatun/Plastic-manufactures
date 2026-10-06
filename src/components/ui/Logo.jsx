import { Link } from 'react-router-dom'

export default function Logo() {
  return <Link to="/" className="group flex items-center gap-3" aria-label="Plastic Manufactures and Co. home">
    <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal text-white shadow-sm transition-transform group-hover:-rotate-6"><span className="text-lg font-extrabold">P</span></span>
    <span className="leading-tight"><strong className="block text-[13px] font-extrabold tracking-[.06em] text-ink">PLASTIC MANUFACTURES</strong><span className="block text-[10px] font-semibold tracking-[.24em] text-body">AND COMPANY</span></span>
  </Link>
}
