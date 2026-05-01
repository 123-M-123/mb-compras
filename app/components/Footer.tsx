'use client'
import { ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <>
      {/* FOOTER CLIENTE (normal, baja con el contenido) */}
      <footer
        style={{
          background: '#4A0606',
          textAlign: 'center',
          padding: '1rem',
          borderTop: '3px solid #EF7F1A',
        }}
      >
        <p
          style={{
            fontSize: '0.80rem',
            color: '#ffbd77', 
            fontWeight: 700,
            lineHeight: '1.4',
          }}
        >
         MB Compras | Bazar & Regalos
        </p>

        <p
          style={{
            fontSize: '0.75rem',
            color: '#ffbd77', opacity: 0.75,
            lineHeight: '1.4',
          }}
        >
         📍 Flores, CABA &nbsp;|&nbsp; 📅 Entregas viernes y sábados
        </p>

        <p
          style={{
            fontSize: '0.75rem',
            color: '#ffbd77', opacity: 0.75,
            lineHeight: '1.4',
          }}
        >
          © {new Date().getFullYear()} Todos los derechos reservados
        </p>
      </footer>

      {/* ESPACIO RESERVADO para que no tape contenido */}
      <div style={{ height: '75px' }} />

      {/* FOOTER TU MARCA (fijo abajo SIEMPRE) */}
      <footer
        style={{
          background: '#4A0606',
          textAlign: 'center',
          padding: '0.9rem 1rem',
          borderTop: 'none',
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          zIndex: 300,
        }}
      >
       <p
  style={{
    fontSize: '0.75rem',
    fontWeight: 700,
    lineHeight: '1.4',
    margin: 0,
  }}
>
  <a
    href="https://tienda-de-tiendas.vercel.app"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      color: '#EF7F1A', 
      textDecoration: 'underline',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px', // espacio fino entre texto e icono
    }}
  >
    <span>Diseño y Desarrollo web: Tienda de Tiendas</span>
    <ExternalLink size={13} strokeWidth={2} />
  </a>
</p>
        <p
          style={{
            fontSize: '0.8rem',
            lineHeight: '1.4',
            margin: 0,
          }}
        >
          <a
            href="https://tienda-de-tiendas.vercel.app"
            style={{
              color: '#EF7F1A', opacity: 0.75,
              textDecoration: 'none',
            }}
          >
            Promo Micro Emp 50% off hasta Dic 2026
          </a>
        </p>

        <p
          style={{
            fontSize: '0.75rem',
            lineHeight: '1.4',
            margin: 0,
          }}
        >
          <a
            href="mailto:marcosrenemarti@gmail.com"
            style={{
              color: '#EF7F1A', opacity: 0.75,
              textDecoration: 'none',
            }}
          >
            Tené tu Web en 2 días ✉️ Contacto
          </a>
        </p>
      </footer>
    </>
  )
}