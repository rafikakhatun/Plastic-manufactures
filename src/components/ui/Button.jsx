import { Link } from 'react-router-dom'

export default function Button({ to, children, variant = 'primary', className = '', ...props }) {
  const styles = variant === 'primary' ? 'bg-cta text-white hover:bg-[#a93608] hover:shadow-lg' : variant === 'dark' ? 'bg-ink text-white hover:bg-teal' : 'border border-line bg-white text-ink hover:border-teal hover:text-teal'
  const classes = `inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-teal/20 ${styles} ${className}`
  return to ? <Link to={to} className={classes} {...props}>{children}</Link> : <button className={classes} {...props}>{children}</button>
}
