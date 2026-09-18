# Instrucciones para generar un artículo de blog nuevo

Este documento es la guía que debe seguir cualquier agente (o persona) que redacte un
artículo nuevo para `content/blog/`. El objetivo del blog es posicionamiento SEO/GEO en
**Cundinamarca y Boyacá**, no volumen de contenido genérico.

## Flujo de trabajo (borrador + aprobación humana — obligatorio)

1. Elegir el primer tema en estado `pendiente` de [`TOPICS.md`](./TOPICS.md).
2. Crear una rama nueva (no escribir directo sobre `main`).
3. Redactar el artículo en `content/blog/posts/<slug-en-minusculas-con-guiones>.md`
   (**dentro de la subcarpeta `posts/`** — `TOPICS.md` y este archivo viven un nivel arriba,
   en `content/blog/`, y no deben tocarse salvo para actualizar el estado del tema) siguiendo
   el esquema de frontmatter de abajo, con `draft: true`.
4. Actualizar el estado del tema en `TOPICS.md` a `en revisión`.
5. Abrir un Pull Request y notificar a un humano para revisión. **Nunca publicar
   (`draft: false`) ni hacer merge a `main` sin aprobación humana explícita.**
6. Cuando el humano aprueba y hace merge, cambiar `draft: false` como parte de ese mismo PR
   (o en un commit posterior si el humano lo pide) y actualizar `TOPICS.md` a `publicado`.

## Esquema de frontmatter (obligatorio, ver `lib/blog.ts`)

```yaml
---
title: "Título del artículo (30-60 caracteres, con la palabra clave o la ciudad al inicio: Google corta los más largos)"
description: "Meta descripción de 120-155 caracteres, con intención de búsqueda clara"
date: "YYYY-MM-DD"
department: "Cundinamarca" | "Boyacá"
city: "Ciudad o municipio específico (o varios separados por coma)"
keywords:
  - "keyword principal"
  - "2-4 keywords secundarias"
author: "Equipo Codifikai"
draft: true
---
```

## Reglas de contenido

- **Idioma**: español de Colombia. El blog no se traduce al inglés (el mercado objetivo es
  hispanohablante local).
- **Extensión**: 600-900 palabras.
- **Estructura**: un `##` de apertura con el problema real del lector, 2-4 secciones `##`
  con contenido accionable, y un cierre breve que conecte con el siguiente paso (sin forzar
  un link de venta dentro del texto — el CTA final ya lo agrega la plantilla de la página).
- **Localización real**: mencionar la ciudad/departamento objetivo de forma natural al menos
  2-3 veces en el cuerpo del texto, no solo en el frontmatter.
- **Prohibido inventar datos**: no fabricar estadísticas, encuestas, cifras de clientes,
  nombres de empresas reales, ni testimonios. Si se necesita un dato duro, se omite o se
  deja como pendiente para que un humano lo agregue con fuente verificada.
- **Tono**: directo, práctico, sin superlativos vacíos ("líder", "revolucionario",
  "innovador") ni relleno. Cada sección debe darle al lector algo accionable, no solo
  describir conceptos.
- **Sin autopromoción excesiva**: el artículo debe ser útil incluso si el lector nunca
  contrata a Codifikai. La mención de Codifikai va solo en el cierre, en una frase, no
  repetida a lo largo del texto.

## Después de escribir

- Verificar que el `slug` del archivo no choque con uno existente en `content/blog/posts/`.
- Verificar que `date` sea la fecha real de creación del borrador (no una fecha futura).
- Confirmar que el tema quedó marcado en `TOPICS.md`.
