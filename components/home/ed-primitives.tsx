"use client"

/**
 * Primitivas del lenguaje editorial del home.
 *
 * Todo el movimiento pasa por aquí para que respetar `prefers-reduced-motion`
 * sea una decisión única y no una que haya que recordar en cada sección.
 */

import * as React from "react"
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionValue,
} from "framer-motion"

import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/* Salvaguarda de visibilidad                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Todo lo que se revela con scroll arranca invisible, así que si
 * `IntersectionObserver` no entrega callbacks el contenido se quedaría oculto para
 * siempre. Pasa en pestañas en segundo plano, vistas incrustadas y algunos
 * navegadores que lo suspenden.
 *
 * Se sondea una sola vez por sesión con un marcador propio: si en 900 ms no
 * hubo callback, se considera poco fiable y las secciones se muestran sin
 * animación en vez de desaparecer.
 */
const observerProbe = {
  healthy: null as boolean | null,
  subscribers: new Set<(healthy: boolean) => void>(),
  started: false,
}

function startObserverProbe() {
  if (observerProbe.started || typeof window === "undefined") return
  observerProbe.started = true

  const marker = document.createElement("div")
  marker.setAttribute("aria-hidden", "true")
  marker.style.cssText =
    "position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none"
  document.body.appendChild(marker)

  let settled = false
  const settle = (healthy: boolean) => {
    if (settled) return
    settled = true
    window.clearTimeout(timer)
    observer.disconnect()
    marker.remove()
    observerProbe.healthy = healthy
    observerProbe.subscribers.forEach((notify) => notify(healthy))
    observerProbe.subscribers.clear()
  }

  const observer = new IntersectionObserver(() => settle(true))
  observer.observe(marker)
  const timer = window.setTimeout(() => settle(false), 900)
}

/** `true` cuando el observer no responde y hay que mostrar el contenido igual. */
function useObserverUnavailable() {
  const [unavailable, setUnavailable] = React.useState(false)

  React.useEffect(() => {
    if (observerProbe.healthy === true) return
    if (observerProbe.healthy === false) {
      setUnavailable(true)
      return
    }
    const notify = (healthy: boolean) => {
      if (!healthy) setUnavailable(true)
    }
    observerProbe.subscribers.add(notify)
    startObserverProbe()
    return () => {
      observerProbe.subscribers.delete(notify)
    }
  }, [])

  return unavailable
}

/* -------------------------------------------------------------------------- */
/* Reveal                                                                      */
/* -------------------------------------------------------------------------- */

type RevealProps = {
  children: React.ReactNode
  className?: string
  /** Retraso en segundos; se usa para escalonar hijos de una misma fila. */
  delay?: number
  /** Distancia inicial en píxeles. `0` deja solo el fundido. */
  y?: number
  as?: "div" | "section" | "li" | "article" | "header" | "footer"
}

export function Reveal({ children, className, delay = 0, y = 28, as = "div" }: RevealProps) {
  const reduced = useReducedMotion()
  const observerDown = useObserverUnavailable()
  const MotionTag = motion[as]
  const still = reduced || observerDown

  return (
    <MotionTag
      className={className}
      initial={still ? false : { opacity: 0, y }}
      // Sin observer fiable, animate toma el relevo y deja la fila a la vista.
      animate={observerDown && !reduced ? { opacity: 1, y: 0 } : undefined}
      whileInView={still ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}

/* -------------------------------------------------------------------------- */
/* Titular con revelado palabra a palabra                                      */
/* -------------------------------------------------------------------------- */

type WordRevealProps = {
  /** Texto plano; se parte por espacios y cada palabra sube tras su máscara. */
  text: string
  className?: string
  delay?: number
  /** Marca visual del acento: palabras que se pintan con el color de marca. */
  accentWords?: string[]
}

export function WordReveal({ text, className, delay = 0, accentWords = [] }: WordRevealProps) {
  const reduced = useReducedMotion()
  const observerDown = useObserverUnavailable()
  const still = reduced || observerDown
  const words = text.split(" ").filter(Boolean)
  const accent = new Set(accentWords.map((w) => w.toLowerCase()))

  return (
    <span className={cn("inline", className)}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom pb-[0.08em]">
          <motion.span
            className={cn(
              "inline-block",
              accent.has(word.toLowerCase().replace(/[.,]/g, "")) && "text-ed-accent"
            )}
            initial={still ? false : { y: "110%" }}
            animate={observerDown && !reduced ? { y: "0%" } : undefined}
            whileInView={still ? undefined : { y: "0%" }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.055,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/* Micro-etiqueta numerada                                                     */
/* -------------------------------------------------------------------------- */

export function EdLabel({
  index,
  children,
  className,
}: {
  index?: number
  children: React.ReactNode
  className?: string
}) {
  return (
    <span className={cn("ed-label inline-flex items-center gap-3", className)}>
      {typeof index === "number" ? (
        <span className="text-ed-accent tabular-nums">
          {String(index).padStart(2, "0")}
        </span>
      ) : null}
      <span className="h-px w-6 bg-ed-rule-strong" aria-hidden />
      <span>{children}</span>
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/* Regla horizontal que se dibuja al entrar                                    */
/* -------------------------------------------------------------------------- */

export function DrawnRule({ className }: { className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" })
  const observerDown = useObserverUnavailable()

  return (
    <div
      ref={ref}
      data-visible={inView || observerDown ? "true" : "false"}
      className={cn("ed-rule-draw h-px w-full bg-ed-rule-strong", className)}
      aria-hidden
    />
  )
}

/* -------------------------------------------------------------------------- */
/* Contador animado                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Anima un valor como "150+", "4.2x" o "11" conservando prefijo y sufijo.
 * Si el texto no contiene número, se pinta tal cual.
 */
export function Counter({ value, className }: { value: string; className?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" })
  const reduced = useReducedMotion()
  const [display, setDisplay] = React.useState<string | null>(null)

  const match = value.match(/^(\D*)([\d.,]+)(.*)$/)

  React.useEffect(() => {
    if (!match || !inView || reduced) return
    const [, prefix, rawNumber, suffix] = match
    const decimals = rawNumber.includes(".") ? rawNumber.split(".")[1].length : 0
    const target = Number.parseFloat(rawNumber.replace(/,/g, ""))
    if (Number.isNaN(target)) return

    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(`${prefix}${latest.toFixed(decimals)}${suffix}`),
      onComplete: () => setDisplay(value),
    })
    return () => controls.stop()
  }, [inView, match, reduced, value])

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {display ?? value}
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/* Marquesina                                                                  */
/* -------------------------------------------------------------------------- */

export function Marquee({
  items,
  className,
  durationSeconds = 44,
  reverse = false,
  separator = "✦",
}: {
  items: string[]
  className?: string
  durationSeconds?: number
  reverse?: boolean
  separator?: string
}) {
  // La pista se duplica para que el bucle a -50% sea continuo.
  const doubled = [...items, ...items]

  return (
    <div
      className={cn("ed-marquee relative flex overflow-hidden", className)}
      role="presentation"
      aria-hidden
    >
      <div
        className="ed-marquee-track flex w-max shrink-0 items-center"
        data-direction={reverse ? "reverse" : "forward"}
        style={{ ["--ed-marquee-duration" as string]: `${durationSeconds}s` }}
      >
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center">
            <span className="ed-label whitespace-nowrap px-6 text-ed-ink-soft">{item}</span>
            <span className="text-ed-accent/50 text-[0.6rem]">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Puntero magnético                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Devuelve valores de desplazamiento que siguen al cursor dentro del elemento.
 * Se apaga solo con `prefers-reduced-motion` y en dispositivos táctiles.
 */
export function useMagnetic(strength = 0.35) {
  const ref = React.useRef<HTMLElement | null>(null)
  const reduced = useReducedMotion()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 220, damping: 18, mass: 0.4 })
  const y = useSpring(rawY, { stiffness: 220, damping: 18, mass: 0.4 })

  React.useEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    if (window.matchMedia("(hover: none)").matches) return

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      rawX.set((event.clientX - (rect.left + rect.width / 2)) * strength)
      rawY.set((event.clientY - (rect.top + rect.height / 2)) * strength)
    }
    const onLeave = () => {
      rawX.set(0)
      rawY.set(0)
    }

    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerleave", onLeave)
    return () => {
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerleave", onLeave)
    }
  }, [rawX, rawY, reduced, strength])

  return { ref, x: x as MotionValue<number>, y: y as MotionValue<number> }
}

/* -------------------------------------------------------------------------- */
/* Cabecera de sección                                                         */
/* -------------------------------------------------------------------------- */

export function SectionHeading({
  index,
  label,
  title,
  lead,
  className,
  align = "left",
}: {
  index: number
  label: string
  title: string
  lead?: string
  className?: string
  align?: "left" | "wide"
}) {
  return (
    <header className={cn("relative", className)}>
      <Reveal y={16}>
        <EdLabel index={index}>{label}</EdLabel>
      </Reveal>
      <h2
        className={cn(
          "ed-display mt-7 text-ed-ink",
          align === "wide"
            ? "text-[clamp(2.5rem,7vw,6rem)]"
            : "max-w-[22ch] text-[clamp(2.25rem,5.2vw,4.5rem)]"
        )}
      >
        <WordReveal text={title} />
      </h2>
      {lead ? (
        <Reveal delay={0.12} y={18}>
          <p className="mt-7 max-w-[52ch] text-pretty text-[0.975rem] leading-relaxed text-ed-ink-soft sm:text-base">
            {lead}
          </p>
        </Reveal>
      ) : null}
    </header>
  )
}

/* -------------------------------------------------------------------------- */
/* Contenedor de sección                                                       */
/* -------------------------------------------------------------------------- */

export function EdSection({
  id,
  children,
  className,
  bleed = false,
  tone = "light",
}: {
  id: string
  children: React.ReactNode
  className?: string
  bleed?: boolean
  /** "dark" invierte los tokens `ed-*` para toda la sección. */
  tone?: "light" | "dark"
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 py-[var(--ed-section-y)]",
        tone === "dark" && "ed-dark",
        className
      )}
    >
      <div className={cn(bleed ? "w-full" : "mx-auto w-full max-w-[80rem] px-[var(--ed-gutter)]")}>
        {children}
      </div>
    </section>
  )
}
