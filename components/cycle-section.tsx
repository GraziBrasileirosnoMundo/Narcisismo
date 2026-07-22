import { Brain, MoonStar, HeartPulse, BatteryLow, HelpCircle, Cloud, TriangleAlert } from "lucide-react"

const pains = [
  { icon: Brain, label: "Preocupações constantes com o trabalho" },
  { icon: MoonStar, label: "Dificuldade para desligar a mente, mesmo fora do expediente" },
  { icon: HeartPulse, label: "Ansiedade antes de falar ou ter contato com seu chefe" },
  { icon: BatteryLow, label: "Cansaço mental e emocional que não passa" },
  { icon: HelpCircle, label: "Dúvidas sobre seu valor e sua capacidade" },
  { icon: Cloud, label: "Pensamentos que se repetem o dia todo na sua mente" },
]

export function CycleSection() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-center font-display text-2xl font-bold uppercase tracking-tight text-foreground sm:text-3xl">
          Você se vê preso(a) neste <span className="text-red-accent">ciclo?</span>
        </h2>

        <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {pains.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 text-center shadow-sm"
            >
              <Icon className="size-8 text-red-accent" aria-hidden="true" />
              <p className="text-sm font-medium leading-snug text-card-foreground text-pretty">{label}</p>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-10 flex max-w-3xl items-start justify-center gap-3">
          <TriangleAlert className="mt-0.5 size-7 shrink-0 text-red-accent" aria-hidden="true" />
          <p className="text-base font-semibold leading-relaxed text-foreground text-balance">
            Isso não é frescura. É manipulação psicológica no ambiente de trabalho.{" "}
            <span className="text-red-accent">E você não precisa continuar assim.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
