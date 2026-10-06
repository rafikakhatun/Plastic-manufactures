export default function PlaceholderImage({ label, src, tone = 'mint', className = '', eager = false }) {
  const palette = { mint:'from-[#d9f2ee] to-[#a9dcd4]', blue:'from-[#dcebf8] to-[#aacbe6]', peach:'from-[#fde9d9] to-[#f4c59e]', violet:'from-[#ede7fa] to-[#cfc2eb]', slate:'from-[#d9dee4] to-[#8f9eaa]' }
  if (src) {
    return <div className={`relative isolate overflow-hidden bg-surface ${className}`}>
      <img src={src} alt={label} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
    </div>
  }
  return <div role="img" aria-label={`${label} image placeholder`} className={`relative isolate overflow-hidden bg-gradient-to-br ${palette[tone]} ${className}`}>
    <div className="granules absolute inset-0 opacity-75" />
    <span className="absolute bottom-3 left-3 rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-ink backdrop-blur">Image placeholder</span>
  </div>
}
