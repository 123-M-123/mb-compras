import { MetadataRoute } from "next";

// 👇 cambiar si luego usás dominio propio
const baseUrl = "https://mb-compras.vercel.app";

// 👇 FUTURAS categorías / secciones
const staticPages = [
  "",
  "/catalogo",
  "/productos",
  "/ofertas",
  "/envios",
  "/contacto",
  "/nosotros",
];

// 👇 FUTUROS slugs SEO masivos
const categorias = ["bazar", "regalos", "hogar", "decoracion"];
const zonas = ["caba", "flores", "caballito", "almagro"];
const intenciones = ["comprar", "ofertas", "precio", "envio"];

// 👇 genera /bazar-comprar-caba etc
const slugs = categorias.flatMap((cat) =>
  intenciones.flatMap((accion) =>
    zonas.map((zona) => `${cat}-${accion}-${zona}`)
  )
);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const dynamicPages = slugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...pages, ...dynamicPages];
}