'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useCarrito } from '../context/CarritoContext'

const C = {
  oliveDark:  '#4c522b',
  gold:       '#fffb28',
  purple:     '#7201ce',
  purpleLight:'#7c42fa',
  tanLight:   '#e7bd7a',
} as const

const formatARS = (n: number) =>
  n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })

const IconCarrito = ({ size = 20 }: { size?: number }) => (
  <svg className="icon-carrito" width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="9" cy="21" r="1"/>
    <circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
)

export default function Header() {
  const { carrito, setCarritoOpen } = useCarrito()
  const totalCarrito    = carrito.reduce((s, i) => s + i.precio * i.cantidad, 0)
  const cantidadCarrito = carrito.reduce((s, i) => s + i.cantidad, 0)

  const [menuOpen, setMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('meraki:dark')
    const isDark = saved === '1' || (saved === null && window.matchMedia('(prefers-color-scheme: dark)').matches)
    setDarkMode(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  function toggleDark() {
    const next = !darkMode
    setDarkMode(next)
    localStorage.setItem('meraki:dark', next ? '1' : '0')
    document.documentElement.classList.toggle('dark', next)
  }

  function handleNavClick(e: React.MouseEvent, id: string) {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 240
    window.scrollTo({ top: y, behavior: 'smooth' })
   
  }

  return (
    <header>
      <div className="header-inner">
        {/* Redes */}
        <div className="social-links">
          <a href="https://www.instagram.com/me_ra_k_i?igsh=Z2Yydnk1cmVraW1s" target="_blank" rel="noopener noreferrer" className="social-instagram">
            <svg viewBox="0 0 24 24" aria-hidden>
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" />
            </svg>
            <span>Seguime</span>
          </a>
          <a href="https://wa.me/5491168075600" target="_blank" rel="noopener noreferrer" className="social-whatsapp">
           {/* Reemplazar el <svg> actual de WhatsApp por este */}
<svg viewBox="0 0 24 24" width="30" height="30" className="whatsapp-force-visible" aria-hidden>
  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.857L.057 23.428a.75.75 0 0 0 .915.915l5.571-1.476A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.726 9.726 0 0 1-4.953-1.354l-.355-.211-3.667.971.988-3.607-.231-.371A9.725 9.725 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
</svg>

            <span>Escríbime</span>
          </a>
        </div>

        {/* Logo */}
        <div className="logo-wrap">
          <Image src="/uploads/imagenes/logo.png" alt="Meraki Bijú" width={260} height={100} priority
            style={{
              objectFit: 'contain',
              display: 'block',
              filter: 'drop-shadow(0 0 4px rgba(255, 250, 170, 0.55)) drop-shadow(0 0 10px rgba(255, 220, 90, 0.35))',
              animation: 'heroLogoBreath 10s ease-in-out infinite alternate',
            }}
          />
        </div>

        {/* Carrito */}
        <button className="cart-btn" onClick={() => setCarritoOpen(true)}>
          <IconCarrito size={18} />
          {cantidadCarrito > 0 && <span className="cart-badge">{cantidadCarrito}</span>}
          {cantidadCarrito > 0 && <span style={{ color: C.purpleLight, fontSize: '0.75rem', marginLeft: 6 }}>{formatARS(totalCarrito)}</span>}
        </button>
      </div>

      {/* Nav */}
      <nav>
        <div style={{ padding: '.35rem 1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
  className="menu-toggle"
  onClick={() => setMenuOpen(!menuOpen)}
  aria-expanded={menuOpen}
>
  ☰
</button>

<div className={`nav-links ${menuOpen ? 'open' : ''}`}>
  <a href="#inicio" onClick={(e) => handleNavClick(e, 'inicio')}>Inicio</a>
  <a href="#productos" onClick={(e) => handleNavClick(e, 'productos')}>Productos</a>
  <a href="#galeria" onClick={(e) => handleNavClick(e, 'galeria')}>Galería</a>
  <a href="#cuidados" onClick={(e) => handleNavClick(e, 'cuidados')}>Cuidados</a>
</div>
          <button className="dark-toggle" onClick={toggleDark}>{darkMode ? '☀️ Claro' : '🌙 Oscuro'}</button>
        </div>
      </nav>
    </header>
  )
}
