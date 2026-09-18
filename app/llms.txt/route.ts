import { getAllPosts } from "@/lib/blog"
import { getSiteUrl, siteName } from "@/lib/site"
import { SERVICES } from "@/lib/services"

/**
 * llms.txt: convención emergente (no estándar oficial) para orientar a
 * motores generativos sobre qué contenido del sitio priorizar al resumir o
 * citar. https://llmstxt.org
 */
export async function GET() {
  const site = getSiteUrl()
  const posts = await getAllPosts()

  const serviceLines = SERVICES.map(
    (service) =>
      `- [${service.title.es}](${site}/services/${service.slug}): ${service.seo.description.es}`
  ).join("\n")

  const postLines = posts
    .slice(0, 30)
    .map((post) => `- [${post.title}](${site}/blog/${post.slug}): ${post.description}`)
    .join("\n")

  const body = `# ${siteName}

> Empresa de desarrollo de software e inteligencia artificial aplicada: sistemas de IA empresarial, automatización de procesos, plataformas web y software a medida para empresas en Colombia y LATAM.

## Páginas principales

- [Inicio](${site}/): Qué hace Codifikai y para quién.
- [Servicios](${site}/services): Catálogo completo de servicios y casos de éxito reales con clientes verificables.
- [Sobre nosotros](${site}/about): Equipo fundador y enfoque de trabajo.
- [Blog](${site}/blog): Guías prácticas de IA y automatización para empresas de Colombia.
- [Contacto](${site}/contact): Cómo iniciar un proyecto con Codifikai.

## Servicios

${serviceLines}

## Artículos del blog

${postLines || "- (sin artículos publicados todavía)"}
`

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
