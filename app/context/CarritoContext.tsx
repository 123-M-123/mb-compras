'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type Producto = {
  id_producto: string
  titulo: string
  precio: number
  categoria: string
  etiqueta: string
  descripcion: string
  imagen: string
  stock: number
 // Navegación del modal
  _lista?: Producto[]
  _indice?: number
}

export type ItemCarrito = Producto & { cantidad: number }

type CarritoContextType = {
  carrito: ItemCarrito[]
  carritoOpen: boolean
  modal: Producto | null
  notif: string
  setCarritoOpen: (open: boolean) => void
  setModal: (p: Producto | null) => void
  agregarAlCarrito: (p: Producto) => void
  cambiarCantidad: (id: string, delta: number) => void
  quitarDelCarrito: (id: string) => void
  vaciarCarrito: () => void
  mostrarNotif: (msg: string) => void
}

const CarritoContext = createContext<CarritoContextType | null>(null)

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [carrito,     setCarrito]     = useState<ItemCarrito[]>([])
  const [carritoOpen, setCarritoOpen] = useState(false)
  const [modal,       setModal]       = useState<Producto | null>(null)
  const [notif,       setNotif]       = useState('')

  const agregarAlCarrito = (p: Producto) => {
    setCarrito(prev => {
      const existe = prev.find(i => i.id_producto === p.id_producto)
      return existe
        ? prev.map(i => i.id_producto === p.id_producto ? { ...i, cantidad: i.cantidad + 1 } : i)
        : [...prev, { ...p, cantidad: 1 }]
    })
    mostrarNotif(`${p.titulo} agregado ✓`)
  }

  const cambiarCantidad = (id: string, delta: number) => {
    setCarrito(prev =>
      prev
        .map(i => i.id_producto === id ? { ...i, cantidad: i.cantidad + delta } : i)
        .filter(i => i.cantidad > 0)
    )
  }

  const quitarDelCarrito = (id: string) =>
    setCarrito(prev => prev.filter(i => i.id_producto !== id))

  const vaciarCarrito = () => setCarrito([])

  const mostrarNotif = (msg: string) => {
    setNotif(msg)
    setTimeout(() => setNotif(''), 9000)
  }

  return (
    <CarritoContext.Provider value={{
      carrito, carritoOpen, modal, notif,
      setCarritoOpen, setModal,
      agregarAlCarrito, cambiarCantidad, quitarDelCarrito,
      vaciarCarrito, mostrarNotif,
    }}>
      {children}
    </CarritoContext.Provider>
  )
}

export function useCarrito() {
  const ctx = useContext(CarritoContext)
  if (!ctx) throw new Error('useCarrito must be used inside CarritoProvider')
  return ctx
}
