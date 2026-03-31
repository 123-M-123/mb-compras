'use client'

import { CarritoProvider, useCarrito } from './context/CarritoContext'
import Header from './components/Header'
import HeroSection from '@/app/components/HeroSection'
import ProductosSection from '@/app/components/ProductosSection'
import GaleriaSection from '@/app/components/GaleriaSection'
import CuidadosSection from '@/app/components/CuidadosSection'
import CarritoPanel from '@/app/components/CarritoPanel'
import ModalImagen from '@/app/components/ModalImagen'

function Toast() {
  const { notif } = useCarrito()
  if (!notif) return null
  return (
    <div className="toast">
      {notif}
    </div>
  )
}

function Footer() {
  return (
    <footer className="footer-section">
      <p>
        <span className="footer-brand">Meraki Bijú</span> — Hecho con amor
      </p>
      <p className="footer-copy">
        © {new Date().getFullYear()} Todos los derechos reservados
      </p>
    </footer>
  )
}

function AppContent() {
  return (
    <div suppressHydrationWarning className="app-content">
      <Header />
      <HeroSection />
      <ProductosSection />
      <GaleriaSection />
      <CuidadosSection />
      <Footer />
      <CarritoPanel />
      <ModalImagen />
      <Toast />
    </div>
  )
}

export default function Home() {
  return (
    <CarritoProvider>
      <AppContent />
    </CarritoProvider>
  )
}
