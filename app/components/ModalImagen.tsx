'use client'

import Image from 'next/image'
import { useCarrito } from '../context/CarritoContext'

const C = {
  olive:     '#7b833a',
  purple:    '#7201ce',
  dark:      '#2C2A24',
  gray:      '#6B6861',
  grayLight: '#EDE8DF',
  white:     '#FFFFFF',
} as const

const formatARS = (n: number) =>
  n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })

const IconCarrito = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/>
    <circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
)

export default function ModalImagen() {
  const { modal, setModal, agregarAlCarrito } = useCarrito()
  if (!modal) return null

  return (
    <div onClick={() => setModal(null)} style={{
      position: 'fixed', inset: 0, background: 'rgba(20,18,14,0.88)',
      zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: C.white, borderRadius: 16, overflow: 'hidden',
        maxWidth: 480, width: '100%', boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
      }}>
        <div style={{ position: 'relative', aspectRatio: '1', width: '100%' }}>
          <Image src={modal.imagen} alt={modal.titulo} fill sizes="480px" style={{ objectFit: 'cover' }} />
          <button onClick={() => setModal(null)} style={{
            position: 'absolute', top: 10, right: 10,
            background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%',
            width: 32, height: 32, color: '#fff', fontSize: '1rem',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>✕</button>
        </div>
        <div style={{ padding: '1.25rem 1.5rem' }}>
          <h3 style={{ margin: '0 0 0.3rem', fontSize: '1.1rem', fontWeight: 700, color: C.dark }}>{modal.titulo}</h3>
          <p style={{ margin: '0 0 0.4rem', color: C.gray, fontSize: '0.85rem' }}>{modal.descripcion}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
            <span style={{ fontSize: '1.3rem', fontWeight: 800, color: C.olive }}>{formatARS(modal.precio)}</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => setModal(null)} style={{
                padding: '0.5rem 1rem', border: `1px solid ${C.grayLight}`,
                borderRadius: 8, background: C.white, color: C.gray, cursor: 'pointer', fontSize: '0.85rem',
              }}>Cerrar</button>
              <button onClick={() => { agregarAlCarrito(modal); setModal(null) }} style={{
                padding: '0.5rem 1.25rem', border: 'none', borderRadius: 8,
                background: C.purple, color: C.white, cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700,
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <IconCarrito size={15} /> Agregar
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
