'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Producto } from '../context/CarritoContext'

const C = {
  olive:      '#7b833a',
  purple:     '#7201ce',
  purplePale: '#f0edf8',
  goldLight:  '#c7ab5e',
  dark:       '#2C2A24',
  gray:       '#6B6861',
  grayLight:  '#EDE8DF',
  white:      '#FFFFFF',
} as const

const formatARS = (n: number) =>
  n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })

const IconCarrito = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/>
    <circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
)

type Props = {
  producto: Producto
  onVerImagen: () => void
  onAgregar: () => void
}

export default function ProductCard({ producto, onVerImagen, onAgregar }: Props) {
  const [hover, setHover] = useState(false)

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: C.goldLight, borderRadius: 14, overflow: 'hidden',
        border: `5px solid ${hover ? C.purple : C.grayLight}`,
        boxShadow: hover ? '0 10px 32px rgba(114,1,206,0.35)' : '0 4px 14px rgba(0,0,0,0.15)',
        transition: 'all 0.25s ease',
        transform: hover ? 'translateY(-3px)' : 'translateY(0)',
        display: 'flex', flexDirection: 'column',
      }}
    >
      <div onClick={onVerImagen} style={{
        position: 'relative', aspectRatio: '1', background: C.grayLight,
        cursor: 'zoom-in', overflow: 'hidden',
      }}>
        <Image
          src={producto.imagen} alt={producto.titulo} fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
          style={{
            objectFit: 'cover', transition: 'transform 0.35s ease',
            transform: hover ? 'scale(1.07)' : 'scale(1)',
          }}
        />
        <span style={{
          position: 'absolute', top: 8, left: 8,
          background: 'rgba(44,42,36,0.72)', color: '#e0c47a',
          fontSize: '0.65rem', fontWeight: 600, padding: '0.2rem 0.55rem',
          borderRadius: 12, letterSpacing: '0.06em',
        }}>{producto.etiqueta}</span>
      </div>

      <div style={{ padding: '0.85rem 1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ margin: '0 0 0.6rem', fontSize: '0.88rem', fontWeight: 600, color: C.dark, lineHeight: 1.3 }}>
          {producto.titulo}
        </p>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontSize: '1rem', fontWeight: 800, color: C.olive }}>
            {formatARS(producto.precio)}
          </span>
          <button onClick={onAgregar} style={{
            padding: '0.35rem 0.6rem',
            background: hover ? C.purple : C.purplePale,
            border: `1.5px solid ${C.purple}`,
            borderRadius: 8, color: hover ? C.white : C.purple,
            fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '0.25rem',
            transition: 'all 0.2s',
          }}>
            <IconCarrito size={14} /><span>Agregar</span>
          </button>
        </div>
      </div>
    </div>
  )
}
