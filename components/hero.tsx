import Image from "next/image"
import { ShieldCheck, HeartPulse, TrendingUp } from "lucide-react"
import { CtaButton } from "@/components/cta-button"

const miniBenefits = [
  { icon: ShieldCheck, label: "Proteja sua\nsaúde mental" },
  { icon: HeartPulse, label: "Fortaleça sua\nautoestima" },
  { icon: TrendingUp, label: "Recupere o controle\nda sua carreira" },
]

export function Hero() {
  return (
    <section className="bg-navy-deep text-cream">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:gap-8 md:py-20">
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Para quem tem um chefe narcisista
          </p>
          <h1 className="mt-5 font-display text-3xl font-bold uppercase leading-[1.05] text-balance sm:text-4xl lg:text-5xl">
            As preocupações do trabalho não te deixam em paz?
          </h1>
          <p className="mt-4 font-display text-3xl font-bold uppercase leading-[1.05] text-gold text-balance sm:text-4xl lg:text-5xl">
            Chega de sofrer em silêncio.
          </p>
          <p className="mt-6 max-w-md text-base leading-relaxed text-cream/80">
            Aprenda a identificar manipulação psicológica, se proteger emocionalmente e recuperar o controle da sua
            mente e da sua vida.
          </p>

          <div className="mt-8">
            <CtaButton href="https://buy.stripe.com/28E9ATbTI33z6rv6Z76c000">
              Quero recuperar meu controle agora
            </CtaButton>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-cream/10 pt-6">
            {miniBenefits.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <Icon className="size-6 shrink-0 text-gold" aria-hidden="true" />
                <span className="whitespace-pre-line text-sm font-medium leading-tight text-cream/90">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="overflow-hidden rounded-2xl border-4 border-cream/10 shadow-2xl">
            <Image
              src="/images/ebook-cover.png"
              alt="Capa do ebook Como Lidar com Chefe Narcisista"
              width={640}
              height={860}
              className="h-auto w-full"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
