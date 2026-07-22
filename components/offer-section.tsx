import { BookOpen, BookMarked, Briefcase, FileText, ShieldCheck, Dumbbell, Mail, ListChecks, HeartHandshake } from "lucide-react"

const included = [
  { icon: BookOpen, text: "Sinais claros de manipulação psicológica" },
  { icon: BookMarked, text: "Técnicas práticas para neutralizar provocações" },
  { icon: Briefcase, text: "Como se proteger sem prejudicar sua carreira" },
  { icon: FileText, text: "Como documentar abusos corretamente" },
  { icon: ShieldCheck, text: "Estratégias para manter sua sanidade" },
  { icon: Dumbbell, text: "Exercícios para recuperar sua força mental" },
]

const bonuses = [
  { n: "Bônus 1", icon: Mail, text: "Modelo de e-mail para conversar com o RH", value: "R$27" },
  { n: "Bônus 2", icon: ListChecks, text: "Checklist para identificar manipulação psicológica", value: "R$17" },
  { n: "Bônus 3", icon: HeartHandshake, text: "Plano de recuperação emocional imediato", value: "R$37" },
]

export function OfferSection() {
  return (
    <section id="comprar" className="bg-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-2">
        {/* Included */}
        <div>
          <h2 className="font-display text-2xl font-bold uppercase leading-tight text-foreground sm:text-3xl">
            Dentro do <span className="text-red-accent">manual estratégico</span> você encontra:
          </h2>
          <ul className="mt-7 space-y-4">
            {included.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <Icon className="size-5 shrink-0 text-gold-foreground" aria-hidden="true" />
                <span className="text-sm font-medium text-foreground">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bonuses + price */}
        <div className="overflow-hidden rounded-2xl bg-navy-deep text-cream shadow-xl">
          <div className="px-6 py-6">
            <p className="text-center font-display text-lg font-bold uppercase tracking-wide">
              E você ainda recebe <span className="text-red-accent">3 bônus exclusivos:</span>
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {bonuses.map(({ n, icon: Icon, text, value }) => (
                <div key={n} className="rounded-xl bg-cream/5 p-4 text-center ring-1 ring-cream/10">
                  <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-cream/10">
                    <Icon className="size-5 text-gold" aria-hidden="true" />
                  </div>
                  <p className="mt-3 font-display text-sm font-bold uppercase text-gold">{n}</p>
                  <p className="mt-1 text-xs leading-snug text-cream/85 text-pretty">{text}</p>
                  <p className="mt-3 inline-block rounded bg-gold px-2 py-0.5 font-display text-xs font-bold text-gold-foreground">
                    Valor: {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 bg-red-accent px-6 py-5 sm:flex-row">
            <p className="font-display text-base font-semibold uppercase text-cream">
              Valor total: <span className="line-through opacity-70">R$148</span>
            </p>
            <p className="font-display text-cream">
              <span className="text-sm font-semibold uppercase">Por apenas</span>{" "}
              <span className="text-4xl font-bold">R$67</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
