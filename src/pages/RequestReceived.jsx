import { ArrowRight, Check } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import Button from '../components/ui/Button'
import usePageMeta from '../hooks/usePageMeta'

export default function RequestReceived() {
  const [params] = useSearchParams(); const ref=params.get('ref')||'PMC-SAMPLE'
  usePageMeta({ title:'Quotation Request Received | Plastic Manufactures & Co.', description:'Your professional quotation request has been received.', canonicalPath:'/request-received' })
  return <main className="grid min-h-[70vh] place-items-center bg-surface px-5 py-16"><div className="w-full max-w-2xl rounded-[22px] border border-line bg-white p-7 text-center shadow-soft md:p-12"><span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#d9f2ee] text-teal"><Check size={38}/></span><span className="eyebrow mt-7">Request received</span><h1 className="mt-5 text-3xl font-extrabold tracking-tight text-ink md:text-4xl">Thank you. We’re on it.</h1><p className="mx-auto mt-4 max-w-lg leading-7 text-body">Your requirement has been recorded. Our material team will review the details and follow up with your professional quotation.</p><div className="mx-auto mt-7 max-w-sm rounded-xl bg-surface p-5"><span className="text-xs font-bold uppercase tracking-wider text-body">Reference number</span><strong className="mt-2 block text-xl text-ink">{ref}</strong></div><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Button to={`/quotation/${ref}`}>View sample quotation <ArrowRight size={17}/></Button><Button to="/" variant="secondary">Back to home</Button></div></div></main>
}
