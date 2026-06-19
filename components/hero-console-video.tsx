import Image from "next/image"

const HERO_BANNER_SRC = "/images/hero/codifikai-banner.png"

export function HeroConsoleVideo() {
  return (
    <div className="relative aspect-video w-full overflow-hidden bg-[#060d18]">
      <Image
        src={HERO_BANNER_SRC}
        alt="CodifikAI — Soluciones digitales que transforman ideas en resultados"
        fill
        className="object-cover object-center"
        sizes="(max-width: 1024px) 100vw, 560px"
        priority
      />
    </div>
  )
}
