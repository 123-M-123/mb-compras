'use client'

const C = {
  oliveDark: '#4c522b',
  tan:       '#775418',
  goldLight: '#c7ab5e',
  tanLight:  '#e7bd7a',
  white:     '#FFFFFF',
} as const

export default function HeroSection() {
  return (
    <section
      id="inicio"
      style={{
        background: `linear-gradient(135deg, ${C.oliveDark} 0%, ${C.tan} 100%)`,
        padding: '4rem 1.5rem', textAlign: 'center',
        minHeight: '430px', position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <img
          src="/hero-lotus.png"
          alt=""
          aria-hidden="true"
          className="hero-lotus-bg"
          style={{
            width: 'min(980px, 125vw)', maxHeight: '140%',
            objectFit: 'contain', opacity: 0.32,
            filter: 'blur(1.5px)',
            animation: 'heroLotusFloat 13.3s ease-in-out infinite alternate',
          }}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <p suppressHydrationWarning style={{ color: C.goldLight, fontSize: '1.10rem', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 0.5rem', textShadow: '0 4px 14px rgba(0,0,0,0.31)' }}>
          Producto 100% Artesanal
        </p>
        <p suppressHydrationWarning style={{ color: C.goldLight, fontSize: '0.90rem', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 0.5rem', textShadow: '0 4px 14px rgba(0,0,0,0.31)' }}>
          cada diseño está tejido a mano con hilos de calidad.
        </p>
        <p suppressHydrationWarning style={{ color: C.goldLight, fontSize: '0.70rem', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 1rem', textShadow: '0 4px 14px rgba(0,0,0,0.31)' }}>
          pensado para que una pieza original, única y especial.
        </p>
        <p style={{ color: C.tanLight, fontSize: '1rem', maxWidth: 500, margin: '0 auto', lineHeight: 1.6 }}>
          ¨Meraki¨ es una palabra griega que significa hacer algo con pasión, amor, creatividad y alma,
          dejando una huella personal y positiva en todo lo que se hace. Esto es lo que quiero trasmitir
          con mis creaciones. La creatividad es parte de mi esencia y la artesanía es parte de mi vida.
        </p>
      </div>
    </section>
  )
}
