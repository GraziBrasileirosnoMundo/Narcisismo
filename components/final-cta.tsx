import Image from "next/image"

export function FinalCta() {
  return (
    <section className="relative bg-navy-deep text-cream">
      <div className="grid md:grid-cols-3">
        <div className="relative min-h-52 md:min-h-full">
          <Image
            src="/images/stressed-woman.png"
            alt="Mulher estressada e ansiosa no trabalho"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-3 px-6 py-14 text-center">
          <p className="font-display text-xl font-bold uppercase leading-tight text-balance sm:text-2xl">
            Cada dia nesse ambiente tóxico aumenta seu desgaste, sua ansiedade e sua dor.
          </p>
          <p className="mt-3 font-display text-2xl font-bold uppercase leading-tight text-gold text-balance sm:text-3xl">
            Escolha mudar agora. Escolha sua paz.
          </p>
        </div>

        <div className="relative min-h-52 md:min-h-full">
          <Image
            src="/images/calm-woman.png"
            alt="Mulher tranquila e confiante"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </div>
    </section>
  )
}
