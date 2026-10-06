import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import MobileMenu from './components/layout/MobileMenu'
import MobileStickyBar from './components/layout/MobileStickyBar'
import ExitModal from './components/ui/ExitModal'
import useExitIntent from './hooks/useExitIntent'
import useScrollToTop from './hooks/useScrollToTop'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const hideConversionUi = ['/request-quotation','/request-received'].some(path=>pathname.startsWith(path)) || pathname.startsWith('/quotation/')
  const exitIntent = useExitIntent(hideConversionUi)
  useScrollToTop()

  return <div className="min-h-screen bg-white text-body">
    <Header openMenu={()=>setMenuOpen(true)} />
    <MobileMenu open={menuOpen} close={()=>setMenuOpen(false)} />
    <AppRoutes />
    <Footer />
    {!hideConversionUi && <MobileStickyBar />}
    <ExitModal open={exitIntent.open} close={exitIntent.close} />
  </div>
}
