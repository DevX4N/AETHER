"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function CtaFinal() {
  const { ref, visible } = useScrollReveal({ threshold: 0.3 });

  return (
    <section
      ref={ref}
      id="contact"
      className="relative py-32 md:py-48"
    >
      <div className="section-padding">
        <div className="line-technical-bright mb-20" />

        <div
          className={`transition-all duration-1000 ${
            visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.85] font-bold tracking-[-0.03em] uppercase mb-8">
            <span className="block text-foreground">Alimente</span>
            <span className="block text-gradient-energy">O Próximo.</span>
          </h2>

          <p className="font-display text-sm md:text-base text-foreground-muted leading-relaxed max-w-md mb-12">
            A próxima geração de infraestrutura começa no core.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-6">
            <a
              href="#"
              className="group relative inline-flex items-center gap-3 px-8 py-5 border border-energy-glow/30 hover:border-energy-glow transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-energy-glow/0 group-hover:bg-energy-glow/[0.05] transition-all duration-500" />
              <span className="relative font-display text-sm tracking-[0.15em] uppercase text-foreground">
                Entrar na AETHER
              </span>
              <span className="relative text-energy-glow group-hover:translate-x-1 transition-transform duration-500">
                →
              </span>
            </a>

            <a
              href="#explore"
              className="group inline-flex items-center gap-3 py-4 px-2"
            >
              <span className="w-6 h-px bg-foreground-dim group-hover:w-10 group-hover:bg-energy-glow transition-all duration-500" />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-foreground-muted group-hover:text-energy-glow transition-colors duration-500">
                Explorar a tecnologia
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
