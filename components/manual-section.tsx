import Image from "next/image"
import { CheckCircle2 } from "lucide-react"

const benefits = [
  "Identifique um chefe narcisista rapidamente",
  "Neutralize manipulações e ataques emocionais",
  "Proteja sua mente, seus limites e sua saúde emocional",
  "Saiba como agir estrategicamente",
  "Documente abusos de forma segura e inteligente",
  "Se comunique sem alimentar conflitos",
  "Reconstrua sua confiança e autoestima",
  "Planeje sua saída com segurança e clareza",
]

export function ManualSection() {
  return (
    <section className="bg-cream">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-[0.85fr_1.15fr]">
        <div className="relative mx-auto w-full max-w-xs">
          <div className="overflow-hidden rounded-xl border-4 border-navy/10 shadow-2xl">
            <Image
              src="/images/ebook-cover.png"
              alt="Ebook Como Lidar com Chefe Narcisista"
              width={520}
              height={700}
              className="h-auto w-full"
            />
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold uppercase leading-tight text-foreground text-balance sm:text-3xl">
            O manual estratégico que vai <span className="text-gold-foreground bg-gold px-1.5">mudar tudo.</span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/80">
            Um passo a passo prático e direto para você se proteger, parar de ser vítima e retomar o controle da sua
            vida profissional e emocional.
          </p>

          <ul className="mt-7 grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold-foreground" aria-hidden="true" />
                <span className="text-sm font-medium leading-snug text-foreground text-pretty">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
