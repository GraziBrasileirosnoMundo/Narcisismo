import { Hero } from "@/components/hero"
import { CycleSection } from "@/components/cycle-section"
import { ManualSection } from "@/components/manual-section"
import { OfferSection } from "@/components/offer-section"
import { InvestSection } from "@/components/invest-section"
import { FinalCta } from "@/components/final-cta"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main className="bg-background text-foreground">
      <Hero />
      <CycleSection />
      <ManualSection />
      <OfferSection />
      <InvestSection />
      <FinalCta />
      <SiteFooter />
    </main>
  )
}
