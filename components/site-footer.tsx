import { Crown } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-navy text-cream/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:grid-cols-2">
        <div className="flex items-start gap-3">
          <Crown className="mt-0.5 size-6 shrink-0 text-gold" aria-hidden="true" />
          <p className="font-display text-sm font-semibold uppercase leading-snug">
            Você não pode mudar seu chefe, mas pode <span className="text-gold">mudar</span> a forma como lida com ele.
          </p>
        </div>
        <div className="flex items-start gap-3 sm:justify-end">
          <Crown className="mt-0.5 size-6 shrink-0 text-gold" aria-hidden="true" />
          <p className="font-display text-sm font-semibold uppercase leading-snug">
            Proteja sua mente. Recupere seu poder. Transforme sua realidade.
          </p>
        </div>
      </div>
      <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} Como Lidar com Chefe Narcisista. Todos os direitos reservados.
      </div>
    </footer>
  )
}
