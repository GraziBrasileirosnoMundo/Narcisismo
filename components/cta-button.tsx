import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function CtaButton({
  children,
  className,
  href = "#comprar",
}: {
  children: React.ReactNode
  className?: string
  href?: string
}) {
  const isExternal = href.startsWith("http")

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={cn(
        "group inline-flex items-center justify-between gap-4 rounded-md bg-gold px-6 py-4 text-left font-display text-lg font-bold uppercase tracking-wide text-gold-foreground shadow-lg transition-transform hover:-translate-y-0.5 hover:brightness-105 sm:px-8 sm:text-xl",
        className,
      )}
    >
      <span className="text-pretty">{children}</span>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold-foreground/15">
        <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </a>
  )
}
