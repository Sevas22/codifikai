---
title: "Cómo aparecer en ChatGPT, Gemini y Perplexity"
description: "Guía de GEO para empresas de Colombia: cómo hacer que ChatGPT, Gemini y Perplexity encuentren, entiendan y citen tu negocio, y qué rastreadores debes permitir."
date: "2026-10-21"
department: "Colombia"
city: "Colombia"
pillar: "seo-geo"
keywords:
  - "aparecer en ChatGPT"
  - "cómo posicionar mi empresa en IA"
  - "GEO optimización para motores generativos"
  - "aparecer en Perplexity"
  - "visibilidad en asistentes de IA"
author: "Equipo Codifikai"
draft: true
---

Nadie puede garantizarte que ChatGPT, Gemini o Perplexity mencionen tu empresa. Lo que sí puedes hacer es volverla **fácil de encontrar, de entender y de citar**: contenido que responde la pregunta, una identidad consistente en toda la web, fuentes que respalden lo que dices y rastreadores con la puerta abierta. Esa es la base del GEO, y esta guía la desarrolla paso a paso.

## El problema: una respuesta de IA no es una lista de enlaces

En Google, tu página compite con otras nueve en la primera hoja. En un asistente de IA, la respuesta suele nombrar dos o tres opciones. El espacio es mucho menor y la decisión del cliente ocurre dentro de la conversación, antes de que visite ninguna web.

Esto no significa que el SEO haya perdido valor. Significa que además de aparecer, ahora importa **ser la fuente que el sistema elige citar**. Si aún no tienes clara la diferencia entre ambos, empieza por [qué son el SEO, el GEO y el AEO](/blog/seo-geo-aeo-que-son-y-como-se-complementan).

## ¿Cómo obtienen la información los asistentes de IA?

Hay dos caminos, y conviene distinguirlos:

- **Lo que el modelo aprendió durante su entrenamiento.** Es un conocimiento general, con fecha de corte, y no lo controlas.
- **Lo que consulta en la web al responder.** Cuando un asistente busca en internet, abre páginas y cita fuentes. Sobre esto sí puedes influir.

Cada sistema usa sus propios rastreadores. Según la [documentación de OpenAI](https://developers.openai.com/api/docs/bots), **OAI-SearchBot** muestra sitios en la búsqueda de ChatGPT, **GPTBot** recopila contenido que puede usarse para entrenar modelos y **ChatGPT-User** visita páginas cuando una persona lo pide. [Perplexity](https://docs.perplexity.ai/guides/bots) usa **PerplexityBot** para mostrar sitios en su buscador. En el caso de Google, sus respuestas de IA se apoyan en el índice de Búsqueda y, según su [guía oficial](https://developers.google.com/search/docs/appearance/ai-features), no exigen optimizaciones especiales.

## ¿Qué dice la investigación sobre qué contenido se cita más?

El estudio que dio nombre al GEO, [«GEO: Generative Engine Optimization»](https://arxiv.org/abs/2311.09735) (KDD 2024), probó nueve técnicas de redacción y midió cuánta visibilidad ganaba el contenido en respuestas generativas. Sus conclusiones más útiles para una empresa:

1. **Citar fuentes, agregar estadísticas y agregar citas textuales** fueron las técnicas con mejores resultados, con mejoras de hasta el 40% dentro de su experimento.
2. **Repetir palabras clave** casi no mejoró nada. El viejo "relleno" no funciona aquí.
3. **Los sitios peor posicionados en los resultados fueron los que más se beneficiaron.** Para una pyme, es una buena noticia: el contenido claro y bien respaldado puede compensar la falta de autoridad.

Hay que leerlo con cuidado. Fue un experimento con su propio sistema de pruebas y con un subconjunto de consultas en Perplexity. No promete lo mismo en cada asistente ni en cada tema. Úsalo como una guía de redacción, no como una garantía.

## ¿Qué acciones concretas mejoran tu visibilidad?

### 1. Abre cada página con la respuesta

Si alguien pregunta "qué es una auditoría SEO", tu página debe empezar con la definición en una o dos frases. Después viene el detalle. Un asistente que busca una respuesta citable la encuentra de inmediato.

### 2. Escribe en formatos que se puedan citar

Las máquinas extraen mejor lo que está ordenado: definiciones claras, listas numeradas, tablas comparativas y encabezados en forma de pregunta ("¿Cuánto tarda…?", "¿Qué incluye…?"). Evita los párrafos de ocho líneas que mezclan tres ideas.

### 3. Respalda lo que afirmas

Cita la fuente de cada dato técnico o legal, con enlace. Si usas una cifra, que sea verificable. **Nunca inventes estadísticas:** además de deshonesto, es lo primero que se descubre cuando un sistema o una persona contrasta.

### 4. Define quién eres, igual en todas partes

Tu nombre, qué haces, dónde y para quién deben coincidir en tu web, tu ficha de Google Business Profile, tus redes y los directorios. Una página "Quiénes somos" completa y el marcado `Organization` de los [datos estructurados](/blog/datos-estructurados-schema-org-para-empresas) ayudan a que un sistema entienda que todas esas menciones se refieren a la misma empresa.

### 5. Demuestra experiencia real

Autores con nombre, casos documentados con permiso del cliente, certificaciones y reseñas. Lo que se puede comprobar pesa más que cualquier adjetivo. Una frase como "somos líderes" no aporta; un caso explicado, sí.

### 6. Consigue menciones en otras fuentes confiables

Los sistemas contrastan varias fuentes. Si solo hablas tú de ti, tienes menos peso. Trabaja presencia en directorios del sector, cámaras de comercio, medios locales, aliados y publicaciones donde tu experiencia sea relevante.

### 7. Deja entrar a los rastreadores

Es el error más barato de corregir y más frecuente. Revisa tu archivo `robots.txt`, y también el firewall o la CDN, porque algunos bloquean bots por defecto. Un ejemplo de configuración:

```
# Permite que ChatGPT y Perplexity muestren tu sitio en sus resultados
User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

# Decisión aparte: autorizar o no el entrenamiento de modelos
User-agent: GPTBot
Disallow: /
```

Tres aclaraciones antes de copiarlo:

- **Cada rastreador se controla por separado.** Según OpenAI, bloquear GPTBot no te saca de la búsqueda de ChatGPT; eso depende de OAI-SearchBot.
- **Permitir o no el entrenamiento es una decisión de negocio.** No hay una respuesta correcta; depende de tu postura sobre el uso de tu contenido.
- **Los visitantes iniciados por una persona** (ChatGPT-User, Perplexity-User) pueden no seguir robots.txt, según la propia documentación de cada empresa. Google ofrece **Google-Extended** para limitar el uso de tu contenido en el entrenamiento de sus otros sistemas.

Además, procura que el contenido principal esté en el HTML y no escondido detrás de scripts pesados o en PDF escaneados.

## ¿Cómo medir si funciona?

Mide con constancia, sin herramientas costosas:

1. **Define 10 o 15 preguntas** que haría tu cliente ideal, algunas con tu ciudad o tu sector.
2. **Consúltalas cada mes** en ChatGPT, Gemini y Perplexity.
3. **Registra** si apareces, cómo te describen y qué fuentes citan.
4. **Compara la tendencia,** no una respuesta aislada: las respuestas cambian entre intentos.
5. **Revisa tu analítica** para ver visitas que lleguen desde dominios de asistentes.

El método completo, con una plantilla, está en la [auditoría GEO paso a paso](/blog/auditoria-geo-checklist-visibilidad-en-ia).

## ¿Qué errores conviene evitar?

- Llenar la web de texto genérico generado sin revisión humana.
- Bloquear a los rastreadores sin saberlo.
- Tener datos distintos de tu empresa en cada sitio.
- Prometerle a tu equipo resultados en días: los sistemas tardan en volver a visitar tu sitio.
- Contratar a quien garantice apariciones.

## Preguntas frecuentes

### ¿Se puede pagar para aparecer en ChatGPT o Perplexity?

Las menciones orgánicas dentro de una respuesta no se compran. Desconfía de quien ofrezca "insertar tu empresa" en las respuestas. Lo que sí puedes hacer es trabajar tu contenido, tu identidad y tus fuentes.

### ¿Cuánto tarda en notarse?

No hay un plazo fijo. OpenAI indica que un cambio en robots.txt puede tardar unas 24 horas en aplicarse a la búsqueda. Pero permitir el acceso no garantiza aparecer: el resto depende de tu contenido, tu competencia y cuándo vuelvan a visitar tu sitio.

### ¿Sirve crear un archivo llms.txt?

Es una [propuesta](https://llmstxt.org/) para ayudar a los agentes a leer un sitio, no un estándar. Google afirma que sus funciones de IA no necesitan archivos especiales. Puedes publicarlo como complemento, pero no reemplaza un buen contenido.

### ¿Funciona para un negocio local pequeño?

Sí, y la investigación sugiere que los sitios menos posicionados pueden beneficiarse más del contenido bien respaldado. Aun así, combina GEO con [SEO local](/blog/seo-local-colombia-google-business-profile): tu ficha de Google y tus reseñas siguen siendo la base.

### ¿Qué hago si un asistente dice algo incorrecto de mi empresa?

Corrige la fuente. Revisa tu web, tu ficha de Google y los directorios, y publica una página clara con los datos correctos. Además, usa los canales de comentarios de cada asistente. No hay un botón de corrección garantizado.

## Resumen

- No se garantiza aparecer: se trabaja para ser fácil de encontrar, entender y citar.
- Abre con la respuesta, usa listas y tablas, y respalda cada dato con una fuente real.
- Mantén tu identidad idéntica en la web, tu ficha y los directorios.
- Permite a OAI-SearchBot y PerplexityBot en robots.txt, y decide por separado el entrenamiento (GPTBot).
- Mide cada mes con un panel fijo de preguntas y compara tendencias.

En Codifikai trabajamos el [posicionamiento SEO, GEO y AEO](/services/seo-geo) con medición real y sin promesas imposibles. Si quieres saber cómo te ven hoy los asistentes de IA, cuéntanos tu caso.
