import { Brain, MoonStar, Smile, TrendingUp, ShieldCheck, Lock, Zap } from "lucide-react"
import { CtaButton } from "@/components/cta-button"

const gains = [
  { icon: Brain, label: "Menos ansiedade e preocupação" },
  { icon: MoonStar, label: "Mais noites de sono" },
  { icon: Smile, label: "Mais confiança e autoestima" },
  { icon: TrendingUp, label: "Melhor desempenho e oportunidades" },
  { icon: ShieldCheck, label: "Proteção emocional todos os dias" },
]

export function InvestSection() {
  return (
    <section className="bg-navy text-cream">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase leading-tight text-balance sm:text-3xl">
              Investir em você hoje custa <span className="text-gold">muito menos</span> do que continuar se
              destruindo.
            </h2>

            <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-5 sm:gap-2">
              {gains.map(({ icon: Icon, label }) => (
                <li key={label} className="flex flex-col items-center gap-2 text-center">
                  <Icon className="size-7 text-gold" aria-hidden="true" />
                  <span className="text-xs font-medium leading-tight text-cream/85 text-pretty">{label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-cream/5 p-7 text-center ring-1 ring-cream/10">
            <p className="font-display text-lg font-semibold uppercase text-cream/70">
              De <span className="line-through">R$148</span>
            </p>
            <p className="font-display text-base font-semibold uppercase text-cream/80">Por apenas</p>
            <p className="mt-1 font-display text-6xl font-bold text-gold">R$67</p>

            <div className="mt-6">
              <CtaButton className="w-full" href="https://buy.stripe.com/28E9ATbTI33z6rv6Z76c000">
                Quero me proteger agora
              </CtaButton>
            </div>

            <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-cream/80">
              <li className="flex items-center gap-1.5">
                <Lock className="size-4 text-gold" aria-hidden="true" /> Pagamento único
              </li>
              <li className="flex items-center gap-1.5">
                <Zap className="size-4 text-gold" aria-hidden="true" /> Acesso imediato
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-gold" aria-hidden="true" /> Ambiente 100% seguro
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
