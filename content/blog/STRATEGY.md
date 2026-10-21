# Estrategia de contenido — Blog Codifikai

Documento de referencia. Las reglas de redacción viven en [`AGENT_INSTRUCTIONS.md`](./AGENT_INSTRUCTIONS.md)
y el calendario en [`TOPICS.md`](./TOPICS.md). Este archivo explica **por qué** el blog se organiza así.

## 1. Objetivo y tesis de posicionamiento

**Objetivo:** que Codifikai sea reconocida —por Google y por los asistentes de IA— como una agencia
colombiana que construye sistemas con IA que operan el negocio (agentes y automatización) y que además
los hace visibles (SEO, GEO y AEO).

**Tesis:** el blog no compite por volumen. Compite por ser **la fuente más clara y verificable** en tres
temas, para que cuando alguien pregunte "qué es el GEO", "cómo implementar un agente de IA" o "qué agencia
de IA contratar en Colombia", Codifikai sea una respuesta citable. Eso exige profundidad, fuentes y
coherencia entre artículos, no más artículos.

**Lo que no prometemos:** posiciones garantizadas, apariciones garantizadas en ChatGPT/Gemini/Perplexity,
ni plazos. Ninguna agencia puede, y decirlo con claridad es parte de la marca.

## 2. Qué se sustituyó y por qué

| Antes | Problema | Ahora |
|---|---|---|
| 3 artículos publicados de 400-600 palabras, centrados en ciudades | Genéricos, sin fuentes ni FAQ, con afirmaciones que no se pueden comprobar ("pocas empresas usan IA", "con base en implementaciones reales") | Se reescribirán conservando la URL (no se pierde lo indexado), con fuentes, FAQ y enlaces a su tema (ver estado en `TOPICS.md`) |
| 18 temas pendientes, uno por municipio | Dispersan la autoridad: 18 artículos que casi no compiten por nada | Mapa de 3 temas con artículo pilar y artículos de apoyo; la zona queda como una capa secundaria |
| 5 borradores (semana 2026-10-12) | Buenos, pero locales y cortos; su tema principal (GEO, agentes) merece ser nacional | Su mejor material se integró en versiones nacionales más profundas. **No se debe fusionar la rama `blog/semana-2026-10-12`.** |
| Regla "600-900 palabras" y "sin links de venta" | Frena la profundidad que premian Google y los asistentes; deja a cada artículo sin salida | Pilares de 1.800-2.200 palabras, apoyos de 1.200-1.700, y cada artículo enlaza a su servicio |

## 3. Los tres temas (pilares)

Cada pilar tiene un artículo pilar (la guía completa), artículos de apoyo que profundizan una pregunta y un
servicio al que lleva. El campo `pillar` del frontmatter conecta el artículo con su tema: ordena los
relacionados y pone el enlace al servicio al final.

### Pilar A — SEO, GEO y AEO → [/services/seo-geo](/services/seo-geo)

| Pieza | Intención | Consulta objetivo |
|---|---|---|
| **Pilar:** SEO, GEO y AEO: qué son y cómo se complementan | Informativa | "qué es GEO", "SEO vs GEO", "qué es AEO" |
| Cómo aparecer en ChatGPT, Gemini y Perplexity | Cómo hacerlo | "aparecer en ChatGPT", "posicionar en IA" |
| Auditoría GEO: checklist de visibilidad en IA | Cómo hacerlo / evaluar | "auditoría GEO", "medir visibilidad en IA" |
| Datos estructurados para empresas | Técnica | "schema para empresas", "datos estructurados" |
| SEO local en Colombia con Google Business Profile | Cómo hacerlo | "SEO local Colombia", "Google Business Profile" |
| SEO B2B industrial (ejemplo: Sogamoso) | Cómo hacerlo / local | "SEO industrial", "SEO B2B Colombia" |

### Pilar B — Agentes de IA → [/services/ai-agents](/services/ai-agents)

| Pieza | Intención | Consulta objetivo |
|---|---|---|
| **Pilar:** Agentes de IA para empresas: guía completa | Informativa | "agentes de IA para empresas", "qué es un agente de IA" |
| Agente de IA, chatbot o automatización: cuál elegir | Comparación | "agente de IA vs chatbot" |
| WhatsApp Business con IA: errores y buenas prácticas | Cómo hacerlo | "WhatsApp Business IA", "chatbot WhatsApp Colombia" |
| Atención al cliente con IA (versión local reescrita) | Cómo hacerlo / local | "atención al cliente con IA" |

### Pilar C — Automatización con IA → [/services/ai-automation](/services/ai-automation)

| Pieza | Intención | Consulta objetivo |
|---|---|---|
| **Pilar:** Automatización de procesos con IA: por dónde empezar | Informativa | "automatización de procesos con IA" |
| Automatización con IA en Chía y Zipaquirá (reescrito) | Local | "automatización IA Chía" |
| Transformación digital en Boyacá (reescrito) | Local | "transformación digital Boyacá" |

### Pieza de decisión (transversal)

**Cómo elegir una agencia de IA y SEO en Colombia: 10 preguntas.** Es el artículo que más cerca está de
la contratación y el que mejor posiciona la marca: demuestra criterio al enseñar a comparar, incluso con
nosotros. Enlaza a los tres pilares.

## 4. Enlaces internos

El enlazado entre artículos es lo que convierte 14 textos en una estructura que los buscadores entienden.

- **Pilar → apoyos:** el pilar enlaza a todos sus artículos de apoyo, con el nombre de la pregunta que responden.
- **Apoyo → pilar:** cada apoyo enlaza a su pilar en el primer tercio del texto, y a uno o dos artículos hermanos.
- **Todo artículo → su servicio:** al menos un enlace en el cuerpo a la página del servicio (la plantilla añade otro al cierre).
- **Entre temas:** los puentes naturales (WhatsApp ↔ agentes ↔ GEO) se enlazan en ambos sentidos.
- **Texto del enlace descriptivo:** "guía de auditoría GEO", nunca "haz clic aquí".
- **Publicar juntos:** un enlace a un artículo en borrador se rompe si se publica solo. Cada pilar se publica con sus apoyos o después de ellos.

## 5. Estándares de calidad (people-first)

Se siguen los criterios de [contenido útil de Google](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
(quién, cómo y por qué) y, para los asistentes de IA, las señales de la
[guía de Google sobre funciones de IA](https://developers.google.com/search/docs/appearance/ai-features):
contenido en texto, indexable, y datos estructurados que coincidan con lo visible.

1. **Respuesta primero.** El primer párrafo responde la pregunta del título en menos de 400 caracteres.
2. **Profundidad real.** Cada artículo aporta algo que el lector no encuentra resumido en cualquier otro sitio: un criterio de decisión, una plantilla, una tabla comparativa, un procedimiento.
3. **Fuentes verificables.** Mínimo una fuente externa por artículo, solo con URL comprobada (documentación oficial, investigación publicada, normas). Cero cifras inventadas.
4. **Experiencia propia.** Antes de publicar, quien revisa añade al menos un elemento de primera mano: un aprendizaje de un proyecto real (con permiso del cliente), una captura de pantalla propia, una decisión técnica explicada. Es lo que más separa un artículo de uno generado en masa.
5. **Autor visible.** Hoy firma "Equipo Codifikai". Lo recomendado es que cada artículo lo firme y revise una persona con nombre (por ejemplo, quien lidera esa área), enlazada a su ficha en `/about`.
6. **Transparencia sobre el uso de IA.** Si un texto se redactó con ayuda de IA, una persona del equipo lo revisa y lo aprueba antes de publicar. Nunca se publica sin esa revisión.
7. **Frescura honesta.** El campo `updated` solo se cambia cuando el texto cambió de verdad. Cambiar fechas sin revisar es justo lo que Google penaliza.

## 6. Estructura de cada artículo

```
Párrafo de apertura: respuesta directa (≤ 400 caracteres)
## El problema real del lector
## ¿Pregunta que se hace el lector?          (encabezados en forma de pregunta)
   listas, tablas comparativas, ejemplos
## Cómo medirlo / qué evitar
## Preguntas frecuentes                      (### pregunta + respuesta de un párrafo)
## Resumen                                   (3-5 puntos + siguiente paso)
```

La sección "Preguntas frecuentes" se convierte automáticamente en marcado `FAQPage` (ver `lib/faq-extract.ts`).
Google dejó de mostrar el resultado enriquecido de FAQ en mayo de 2026; el marcado sigue siendo válido y el texto
sigue siendo la forma más clara de que una persona o un asistente encuentre la respuesta.

## 7. Cadencia sugerida

Dos publicaciones por semana, siempre empezando por un pilar y sus apoyos. Orden recomendado:

| Semana | Publicar | Por qué |
|---|---|---|
| 1 | Pilar A + "Cómo aparecer en ChatGPT, Gemini y Perplexity" | Es el tema más diferencial y el que enlaza el resto de la serie A |
| 2 | "Auditoría GEO" + "Datos estructurados" | Cierran el núcleo técnico de A |
| 3 | Pilar B + "Agente de IA, chatbot o automatización" | Abre el pilar de agentes |
| 4 | "WhatsApp Business con IA" + "Atención al cliente con IA" | Cierra B (y renueva el post más antiguo) |
| 5 | Pilar C + "Automatización en Chía y Zipaquirá" | Abre C |
| 6 | "SEO local en Colombia" + "SEO B2B industrial" | Capa local de A |
| 7 | "Cómo elegir una agencia de IA y SEO" + "Transformación digital en Boyacá" | Pieza de decisión, con los tres pilares ya publicados |

Después se sigue con el banco de [`TOPICS.md`](./TOPICS.md).

## 8. Medición

No hay metas numéricas inventadas: se miden tendencias contra la línea base del primer mes.

- **Google Search Console:** impresiones, clics y posición por artículo y por consulta. El tráfico desde funciones de IA de Google se informa dentro del tipo de búsqueda "Web".
- **Panel GEO mensual:** 10-15 preguntas reales de clientes, consultadas cada mes en ChatGPT, Gemini y Perplexity. Se registra si aparece Codifikai, cómo la describen y qué fuentes citan. El método está en el artículo de auditoría GEO.
- **Analítica:** visitas con origen en asistentes de IA (por ejemplo `chatgpt.com`, `perplexity.ai`) y clics en los botones de WhatsApp desde cada artículo.
- **Negocio:** conversaciones iniciadas desde el blog y cuántas llegaron a diagnóstico.
- **Ritmo de revisión:** cada trimestre se revisan los artículos con más impresiones y se actualizan de verdad (datos, enlaces, capturas).

## 9. Qué no se hace

- Texto en masa generado sin revisión humana.
- Palabras clave repetidas a la fuerza: la investigación sobre GEO ([Aggarwal et al., KDD 2024](https://arxiv.org/abs/2311.09735)) midió que no ayuda en respuestas generativas.
- Cifras, clientes, premios o testimonios inventados.
- Promesas de posicionamiento o de aparecer en un asistente de IA.
- Cambiar la fecha de un artículo sin cambiar su contenido.

## 10. Pendientes técnicos recomendados (fuera de este cambio)

- **Autores con nombre:** ficha de autor enlazada desde cada artículo y marcado `Person`.
- **Imágenes de portada** propias por artículo (hoy ninguno la tiene).
- **Panel de administración:** el generador de borradores y la tabla `blog_posts` siguen limitados a Cundinamarca y Boyacá. Para crear desde el panel artículos nacionales hay que ampliar la restricción de la base de datos y añadir el campo `pillar`.
- **Páginas de tema** (`/blog/tema/seo-geo`, etc.) cuando haya 6 o más artículos por pilar.
