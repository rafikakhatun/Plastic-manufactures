export const inputClass = 'mt-2 h-12 w-full rounded-lg border border-line bg-white px-3 text-sm text-ink outline-none transition focus:border-teal focus:ring-4 focus:ring-teal/10'

export function Field({ label, required, children }) {
  return <label className="block text-xs font-bold text-ink">{label}{required && <span className="text-cta"> *</span>}{children}</label>
}
export function ErrorText({ message = 'This field is required' }) { return <p className="mt-1 text-[11px] text-cta">{message}</p> }
export function FormSection({ number, title, children }) {
  return <section className="border-b border-line pb-7 last:border-0"><div className="mb-5 flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#d9f2ee] text-xs font-extrabold text-teal">{number}</span><h2 className="text-lg font-extrabold text-ink">{title}</h2></div>{children}</section>
}
