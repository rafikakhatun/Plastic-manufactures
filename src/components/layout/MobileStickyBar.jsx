import Button from '../ui/Button'

export default function MobileStickyBar() {
  return <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-line bg-white/95 p-3 backdrop-blur md:hidden"><Button to="/request-quotation" className="w-full">Get a Professional Quotation</Button></div>
}
