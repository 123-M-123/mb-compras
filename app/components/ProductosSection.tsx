'use client'

import { useState, useEffect } from 'react'
import { Producto, useCarrito } from '../context/CarritoContext'
import ProductCard from './ProductCard'

const C = {
  olive:      '#7b833a',
  purple:     '#7201ce',
  purplePale: '#f0edf8',
  dark:       '#2C2A24',
  gray:       '#6B6861',
  grayLight:  '#EDE8DF',
  gold:       '#fffb28',
  white:      '#FFFFFF',
} as const

export default function ProductosSection() {
  const { agregarAlCarrito, setModal } = useCarrito()
  const [productos,       setProductos]       = useState<Producto[]>([])
  const [cargando,        setCargando]        = useState(true)
  const [errorMsg,        setErrorMsg]        = useState<string | null>(null)
  const [categoriaActiva, setCategoriaActiva] = useState('Todos')
  const [etiquetaActiva,  setEtiquetaActiva]  = useState('Todas')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/products')
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data: Producto[] = await res.json()
        setProductos(data)
      } catch (err) {
        setErrorMsg(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setCargando(false)
      }
    }
    fetchData()
  }, [])

  const categorias = ['Todos', ...Array.from(new Set(productos.map(p => p.categoria)))]

  const etiquetas = [
    'Todas',
    ...Array.from(new Set(
      productos
        .filter(p => categoriaActiva === 'Todos' || p.categoria === categoriaActiva)
        .map(p => p.etiqueta)
    )).sort(),
  ]

  const productosFiltrados = productos.filter(p => {
    const okCat  = categoriaActiva === 'Todos' || p.categoria === categoriaActiva
    const okEtiq = etiquetaActiva  === 'Todas' || p.etiqueta  === etiquetaActiva
    return okCat && okEtiq
  })

  const handleCategoriaChange = (cat: string) => {
    setCategoriaActiva(cat)
    setEtiquetaActiva('Todas')
  }

  return (
    <main id="productos" style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1.5rem' }}>

      {/* Filtro categoría */}
      <div style={{ marginBottom: '1rem' }}>
        <p style={{ fontSize: '1.0rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: C.dark, marginBottom: '0.6rem' }}>
          Categoría
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {categorias.map(cat => (
            <button key={cat} onClick={() => handleCategoriaChange(cat)} style={{
              padding: '0.4rem 1.1rem', borderRadius: 20,
              border: `1.5px solid ${C.purple}`,
              background: categoriaActiva === cat ? C.white : C.purple,
              color: categoriaActiva === cat ? C.purple : C.white,
              fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer',
              textTransform: 'uppercase',
              boxShadow: '0 3px 8px rgba(114,1,206,0.25)',
            }}>{cat}</button>
          ))}
        </div>
      </div>

      {/* Filtro etiqueta */}
      {categoriaActiva !== 'Todos' && etiquetas.length > 2 && (
        <div style={{ marginBottom: '1.75rem' }}>
          <p style={{ fontSize: '0.9rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: C.dark, marginBottom: '0.6rem' }}>
            Estilo
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {etiquetas.map(et => (
              <button key={et} onClick={() => setEtiquetaActiva(et)} style={{
                padding: '0.3rem 0.9rem', borderRadius: 20,
                border: `1.5px solid ${etiquetaActiva === et ? C.purple : C.grayLight}`,
                background: etiquetaActiva === et ? C.purplePale : C.white,
                color: etiquetaActiva === et ? C.purple : C.gray,
                fontSize: '0.78rem', fontWeight: etiquetaActiva === et ? 700 : 400, cursor: 'pointer',
              }}>{et}</button>
            ))}
          </div>
        </div>
      )}

      {/* Cargando */}
      {cargando && (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <div style={{
            width: 48, height: 48,
            border: `3px solid ${C.grayLight}`, borderTop: `3px solid ${C.gold}`,
            borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem',
          }} />
          <p style={{ color: C.dark }}>Cargando productos…</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Error */}
      {errorMsg && (
        <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 10, padding: '1rem 1.5rem', color: '#991b1b', textAlign: 'center' }}>
          ⚠️ {errorMsg}
        </div>
      )}

      {/* Contador */}
      {!cargando && !errorMsg && (
        <p style={{ color: C.dark, fontSize: '0.88rem', fontWeight: 600, marginBottom: '1.5rem' }}>
          {productosFiltrados.length} producto{productosFiltrados.length !== 1 ? 's' : ''}
          {categoriaActiva !== 'Todos' && ` en ${categoriaActiva}`}
          {etiquetaActiva !== 'Todas' && ` · ${etiquetaActiva}`}
        </p>
      )}

      {/* Grilla */}
      {!cargando && !errorMsg && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1.5rem' }}>
          {productosFiltrados.map(p => (
            <ProductCard
              key={p.id_producto}
              producto={p}
              onVerImagen={() => setModal(p)}
              onAgregar={() => agregarAlCarrito(p)}
            />
          ))}
        </div>
      )}

      {/* Sin resultados */}
      {!cargando && !errorMsg && productosFiltrados.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <p style={{ fontSize: '2rem' }}>🔍</p>
          <p style={{ color: C.gray }}>No hay productos con ese filtro.</p>
          <button onClick={() => { setCategoriaActiva('Todos'); setEtiquetaActiva('Todas') }} style={{
            marginTop: '1rem', padding: '0.5rem 1.5rem',
            background: C.olive, color: C.white, border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600,
          }}>Ver todos</button>
        </div>
      )}
    </main>
  )
}
