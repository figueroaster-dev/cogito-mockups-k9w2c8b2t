/* Main App Component - Handles routing (using react-router-dom), query client and other providers - use this file to add all routes */
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Index from './pages/Index'
import Sales from './pages/Sales'
import Finance from './pages/Finance'
import Help from './pages/Help'
import Roadmap from './pages/Roadmap'
import Validacao from './pages/Validacao'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'

const App = () => (
  <BrowserRouter>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" richColors />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/help" element={<Help />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/validacao" element={<Validacao />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </BrowserRouter>
)

export default App
