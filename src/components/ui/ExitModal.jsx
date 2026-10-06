import { Sparkles, X } from 'lucide-react'
import Button from './Button'

export default function ExitModal({ open, close }) {
  return <div className={`fixed inset-0 z-[60] place-items-center bg-ink/60 p-5 backdrop-blur-sm ${open ? 'hidden md:grid' : 'hidden'}`}>
    <div className="relative max-w-xl rounded-[22px] bg-white p-10 text-center shadow-2xl">
      <button onClick={close} className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-surface" aria-label="Close"><X size={19} /></button>
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#fde9d9] text-cta"><Sparkles /></span>
      <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-ink">Before you go—need a material quote?</h2>
      <p className="mt-4 leading-7 text-body">Tell us your specification and we’ll prepare a clear, professional quotation for your team.</p>
      <Button to="/request-quotation" onClick={close} className="mt-7 w-full">Get a Professional Quotation</Button>
      <button onClick={close} className="mt-4 text-sm font-semibold text-body">No thanks, I’m just browsing</button>
    </div>
  </div>
}
