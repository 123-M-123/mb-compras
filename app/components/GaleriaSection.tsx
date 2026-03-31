'use client'

const C = {
  offWhite: '#99783f',
  dark:     '#2C2A24',
  grayLight:'#EDE8DF',
} as const

type CarruselProps = {
  titulo: string
  imagenes: string[]
  duracion: number
}

function Carrusel({ titulo, imagenes, duracion }: CarruselProps) {
  const doble = [...imagenes, ...imagenes]
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <h3 style={{
        textAlign: 'center', marginBottom: '1rem',
        color: C.dark, fontSize: '1.2rem',
        letterSpacing: '0.12em', textTransform: 'uppercase',
      }}>{titulo}</h3>
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        <div style={{ display: 'flex', width: 'max-content', animation: `scrollX ${duracion}s linear infinite` }}>
          {doble.map((src, i) => (
            <div key={i} style={{
              width: 350, height: 350, marginRight: '1rem',
              borderRadius: 12, overflow: 'hidden', flexShrink: 0, background: C.grayLight,
            }}>
              <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const modelos = Array.from({ length: 12 }, (_, i) => `/uploads/imagenes/modelo-${i + 1}.jpg`)
const aros    = ['WA0011','WA0012','WA0013','WA0014','WA0015','WA0016','WA0017','WA0018','WA0019','WA0020','WA0021','WA0022','WA0023','WA0024','WA0025','WA0026','WA0027','WA0028','WA0029','WA0030','WA0031','WA0032','WA0033','WA0034','WA0035'].map(n => `/uploads/imagenes/IMG-20260317-${n}.jpg`)
const chokers = ['WA0002','WA0003','WA0004','WA0005','WA0006','WA0008','WA0009','WA0010','WA0011','WA0012','WA0013','WA0014'].map(n => `/uploads/imagenes/IMG-20260320-${n}.jpg`)
const souvenirs = Array.from({ length: 8 }, (_, i) => `/uploads/imagenes/souvenir-${i + 1}.jpg`)

export default function GaleriaSection() {
  return (
    <section id="galeria" style={{ padding: '2rem 0', background: C.offWhite }}>
      <Carrusel titulo="Como quedarían en vos" imagenes={modelos}   duracion={75} />
      <Carrusel titulo="Aros"                   imagenes={aros}      duracion={85} />
      <Carrusel titulo="Chokers"                imagenes={chokers}   duracion={50} />
      <Carrusel titulo="Souvenirs"              imagenes={souvenirs} duracion={60} />
    </section>
  )
}
