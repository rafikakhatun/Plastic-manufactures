import Button from '../components/ui/Button'
import usePageMeta from '../hooks/usePageMeta'

export default function NotFound() {
  usePageMeta({ title:'Page Not Found | Plastic Manufactures & Co.', description:'The requested page could not be found.', canonicalPath:'/404' })
  return <div className="grid min-h-[60vh] place-items-center p-5 text-center"><div><h1 className="text-7xl font-extrabold text-ink">404</h1><p className="mt-4 text-body">The page you requested could not be found.</p><Button to="/" className="mt-7">Back to home</Button></div></div>
}
