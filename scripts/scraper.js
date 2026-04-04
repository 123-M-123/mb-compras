const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

const BASE = 'https://regaleriapaz.empretienda.com.ar'

const SECCIONES = [
  {
    id: 'novedades',
    nombre: '🔥 Novedades y Ofertas',
    urls: [`${BASE}/ofertas-semanales`],
  },
  {
    id: 'bolsos',
    nombre: 'Bolsos y Materas',
    urls: [
      `${BASE}/bazar/mates-y-sets/bolsos-materos`,
      `${BASE}/bazar/tela-y-similares/varios`,
      `${BASE}/accesorios-de-mujer`,
    ],
  },
  {
    id: 'bazar',
    nombre: 'Bazar',
    urls: [
      `${BASE}/bazar/aluminio/art-cocina`,
      `${BASE}/bazar/aluminio/sets`,
      `${BASE}/bazar/teflon-y-similares/art-cocina`,
      `${BASE}/bazar/silicona/art-cocina`,
      `${BASE}/bazar/madera-y-similares/art-cocina`,
      `${BASE}/bazar/plastico-y-acrilico/cocina`,
    ],
  },
  {
    id: 'cuencos',
    nombre: 'Cuencos y Tazones',
    urls: [
      `${BASE}/bazar/ceramica/cuencos`,
      `${BASE}/bazar/ceramica/tazones`,
      `${BASE}/bazar/ceramica/chops`,
      `${BASE}/bazar/ceramica/platos`,
      `${BASE}/bazar/vidrio/vasos`,
      `${BASE}/bazar/vidrio/chops-y-pintas`,
    ],
  },
  {
    id: 'deco',
    nombre: 'Decoración',
    urls: [
      `${BASE}/deco`,
      `${BASE}/bazar/acero-y-metal/art-bano`,
      `${BASE}/bazar/plastico-y-acrilico/bano-y-limpieza`,
    ],
  },
  {
    id: 'ceramica',
    nombre: 'Cerámica',
    urls: [
      `${BASE}/bazar/ceramica/tazas`,
      `${BASE}/bazar/ceramica/sets`,
      `${BASE}/bazar/ceramica/varios`,
      `${BASE}/bazar/vidrio/jarras`,
      `${BASE}/bazar/vidrio/sets`,
    ],
  },
]
const LIMITE = 50

async function scrapearPagina(page, url, categoriaId) {
  console.log(`  Scrapeando: ${url}`)
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 })
  await new Promise(resolve => setTimeout(resolve, 6000))

  const productos = await page.evaluate((categoriaId) => {
    const items = []
    const cards = document.querySelectorAll('.products-feed__product-wrapper')

    cards.forEach(card => {
      const img = card.querySelector('.products-feed__product-image')
      const titulo = card.querySelector('.products-feed__product-name a')
      const precioEl = card.querySelector('.products-feed__product-price')
      const link = card.querySelector('.products-feed__product-link')
      const sinStockEl = card.querySelector('.products-feed__product-out-stock')

      if (!img || !titulo || !precioEl) return

      const imagen = img.getAttribute('src')
      const tituloTxt = titulo.textContent.trim()
      const precioTxt = precioEl.textContent.trim()
      const href = link ? link.getAttribute('href') : ''
      const sinStock = !!sinStockEl

      const precioNum = parseFloat(
        precioTxt.replace(/[^0-9,]/g, '').replace(',', '.')
      )
      if (isNaN(precioNum) || precioNum === 0) return

      const id = href.split('/').pop() || Math.random().toString(36).slice(2)

      items.push({
        id_producto: id,
        titulo: tituloTxt,
        precio: precioNum,
        categoria: categoriaId,
        etiqueta: sinStock ? 'Sin stock' : 'Disponible',
        descripcion: tituloTxt,
        imagen,
        stock: sinStock ? 0 : 1,
      })
    })

    return items
  }, categoriaId)

  return productos
}
async function main() {
  console.log('🚀 Iniciando scraper con Puppeteer...\n')

  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36')

  const resultado = { secciones: [] }

  for (const seccion of SECCIONES) {
    console.log(`\n📦 Sección: ${seccion.nombre}`)
    let todos = []

    for (const url of seccion.urls) {
      try {
        const prods = await scrapearPagina(page, url, seccion.id)
        todos = [...todos, ...prods]
        console.log(`  → ${prods.length} productos en esta URL`)
        if (todos.length >= LIMITE) break
      } catch (err) {
        console.log(`  ⚠️ Error en ${url}: ${err.message}`)
      }
    }

    const unicos = todos.filter(
      (p, i, arr) => arr.findIndex(x => x.id_producto === p.id_producto) === i
    )
    const final = unicos.slice(0, LIMITE)

    console.log(`  ✅ ${final.length} productos encontrados`)
    resultado.secciones.push({
      id: seccion.id,
      nombre: seccion.nombre,
      productos: final,
    })
  }

  await browser.close()

  const outputPath = path.join(__dirname, '../content/productos.json')
  fs.writeFileSync(outputPath, JSON.stringify(resultado, null, 2), 'utf-8')
  console.log('\n✅ productos.json generado exitosamente!')
}

main().catch(console.error)