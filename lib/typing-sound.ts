/**
 * Sonido de tecleo cuando aparecen los titulares.
 *
 * Cada tecla se sintetiza con Web Audio en vez de reproducir un archivo: no
 * hay nada que descargar y cada pulsación sale un poco distinta (tono, fuerza,
 * paneo), que es lo que hace que suene a alguien escribiendo y no a un bucle.
 *
 * Los navegadores no dejan sonar una página hasta que el visitante interactúa
 * con ella, así que el contexto de audio se crea en su primer clic, toque o
 * tecla (`installAudioUnlock`). Antes de eso, `playTyping` no hace nada.
 *
 * La preferencia de silencio se guarda en el navegador del visitante.
 */

const STORAGE_KEY = "codifikai:typing-sound"

/** Tope de teclas por titular: unas pocas bastan para sugerir que se escribe. */
const MAX_KEYS = 8
/** Si ya hay tecleo en cola más allá de esto, el nuevo titular no suma otro. */
const MAX_QUEUE_SECONDS = 0.4

let enabled: boolean | null = null
let ctx: AudioContext | null = null
let master: GainNode | null = null
let noise: AudioBuffer | null = null
let busyUntil = 0
const listeners = new Set<() => void>()

function readPreference(): boolean {
  if (enabled !== null) return enabled
  try {
    enabled = window.localStorage.getItem(STORAGE_KEY) !== "off"
  } catch {
    enabled = true
  }
  return enabled
}

export function isTypingSoundEnabled(): boolean {
  if (typeof window === "undefined") return true
  return readPreference()
}

export function setTypingSoundEnabled(next: boolean) {
  enabled = next
  try {
    window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off")
  } catch {
    // Sin almacenamiento (modo privado): la preferencia vale para esta visita.
  }
  listeners.forEach((notify) => notify())
}

export function subscribeTypingSound(notify: () => void) {
  listeners.add(notify)
  return () => {
    listeners.delete(notify)
  }
}

/** Ruido blanco de un segundo: la materia prima de cada tecla. */
function createNoise(audio: AudioContext): AudioBuffer {
  const buffer = audio.createBuffer(1, audio.sampleRate, audio.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
  return buffer
}

function startContext() {
  if (ctx) {
    if (ctx.state === "suspended") void ctx.resume().catch(() => {})
    return
  }
  const AudioCtor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!AudioCtor) return
  ctx = new AudioCtor()
  master = ctx.createGain()
  // Volumen bajo a propósito: es un detalle de fondo, no un efecto.
  master.gain.value = 0.28
  master.connect(ctx.destination)
  noise = createNoise(ctx)
}

/**
 * Crea el contexto de audio en la primera interacción del visitante. El
 * scroll no cuenta como interacción para el navegador; un clic o un toque sí.
 */
export function installAudioUnlock() {
  if (typeof window === "undefined") return () => {}
  const events = ["pointerdown", "keydown", "touchend"] as const
  // Safari puede crear el contexto suspendido: se sigue escuchando hasta que
  // de verdad esté sonando, y cada interacción vuelve a intentar reanudarlo.
  const unlock = () => {
    startContext()
    if (ctx?.state === "running") {
      events.forEach((type) => window.removeEventListener(type, unlock, true))
    }
  }
  events.forEach((type) => window.addEventListener(type, unlock, true))
  return () => events.forEach((type) => window.removeEventListener(type, unlock, true))
}

const rand = (min: number, max: number) => min + Math.random() * (max - min)

/** Una pulsación: chasquido suave de la tecla más el golpe grave del fondo. */
function key(at: number, space: boolean) {
  if (!ctx || !master || !noise) return
  const strength = rand(0.75, 1)

  let out: AudioNode = master
  if (typeof ctx.createStereoPanner === "function") {
    const pan = ctx.createStereoPanner()
    pan.pan.value = rand(-0.25, 0.25)
    pan.connect(master)
    out = pan
  }

  // Chasquido: ruido filtrado en banda, muy corto.
  const clickLength = space ? rand(0.03, 0.045) : rand(0.018, 0.03)
  const click = ctx.createBufferSource()
  click.buffer = noise
  const band = ctx.createBiquadFilter()
  band.type = "bandpass"
  band.frequency.value = space ? rand(900, 1300) : rand(1500, 2500)
  band.Q.value = rand(0.9, 1.6)
  const clickGain = ctx.createGain()
  clickGain.gain.setValueAtTime(0.0001, at)
  clickGain.gain.exponentialRampToValueAtTime(0.55 * strength, at + 0.002)
  clickGain.gain.exponentialRampToValueAtTime(0.0001, at + clickLength)
  click.connect(band).connect(clickGain).connect(out)
  click.start(at, rand(0, 0.9), clickLength + 0.01)

  // Golpe: el mismo ruido por un pasabajos, algo más largo y más suave.
  const bodyLength = space ? rand(0.07, 0.09) : rand(0.04, 0.06)
  const body = ctx.createBufferSource()
  body.buffer = noise
  const low = ctx.createBiquadFilter()
  low.type = "lowpass"
  low.frequency.value = space ? rand(380, 520) : rand(550, 850)
  const bodyGain = ctx.createGain()
  bodyGain.gain.setValueAtTime(0.0001, at)
  bodyGain.gain.exponentialRampToValueAtTime(0.7 * strength, at + 0.003)
  bodyGain.gain.exponentialRampToValueAtTime(0.0001, at + bodyLength)
  body.connect(low).connect(bodyGain).connect(out)
  body.start(at, rand(0, 0.9), bodyLength + 0.01)
}

/**
 * Teclea el texto de un titular: una pulsación por letra (hasta `MAX_KEYS`),
 * con el ritmo irregular de alguien escribiendo y una pausa en los espacios.
 */
export function playTyping(text: string) {
  if (!ctx || ctx.state !== "running" || !readPreference()) return
  if (typeof document !== "undefined" && document.visibilityState !== "visible") return

  const now = ctx.currentTime
  if (busyUntil - now > MAX_QUEUE_SECONDS) return

  const chars = [...text.replace(/\s+/g, " ").trim()].slice(0, MAX_KEYS)
  let at = Math.max(now + 0.02, busyUntil)
  for (const char of chars) {
    const space = char === " "
    key(at, space)
    at += space ? rand(0.2, 0.28) : rand(0.11, 0.17)
  }
  busyUntil = at
}

/** Dos teclas cortas: confirma que el sonido quedó encendido. */
export function playConfirmation() {
  startContext()
  if (!ctx) return
  if (ctx.state !== "running") {
    const audio = ctx
    void audio
      .resume()
      .then(() => {
        if (audio.state === "running") playConfirmation()
      })
      .catch(() => {})
    return
  }
  const at = ctx.currentTime + 0.03
  key(at, false)
  key(at + 0.14, false)
  busyUntil = Math.max(busyUntil, at + 0.2)
}
