import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

const Home = lazy(() => import('../pages/Home'))
const Catalogue = lazy(() => import('../pages/Catalogue'))
const ProductDetail = lazy(() => import('../pages/ProductDetail'))
const RequestQuotation = lazy(() => import('../pages/RequestQuotation'))
const RequestReceived = lazy(() => import('../pages/RequestReceived'))
const Quotation = lazy(() => import('../pages/Quotation'))
const NotFound = lazy(() => import('../pages/NotFound'))

export default function AppRoutes() {
  return <Suspense fallback={<div className="grid min-h-[55vh] place-items-center bg-surface"><div className="h-10 w-10 animate-spin rounded-full border-4 border-line border-t-teal" aria-label="Loading page" /></div>}><Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/materials" element={<Catalogue/>}/>
    <Route path="/materials/:slug" element={<ProductDetail/>}/>
    <Route path="/request-quotation" element={<RequestQuotation/>}/>
    <Route path="/request-received" element={<RequestReceived/>}/>
    <Route path="/quotation/:id" element={<Quotation/>}/>
    <Route path="*" element={<NotFound/>}/>
  </Routes></Suspense>
}
