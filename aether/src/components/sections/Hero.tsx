"use client";

import dynamic from "next/dynamic";
import UtcClock from "@/components/ui/UtcClock";

const AetherCore = dynamic(() => import("../core/AetherCore"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-32 h-32 rounded-full bg-energy-glow/10 animate-pulse" />
    </div>
  ),
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-energy-glow/[0.03] blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-energy-glow/[0.05] blur-[80px]" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(184, 224, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(184, 224, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="absolute inset-0 z-10" role="presentation" aria-hidden="true">
        <AetherCore />
      </div>

      <div className="relative z-20 section-padding w-full pointer-events-none">
        <div className="absolute top-20 left-[clamp(1.5rem,5vw,8rem)]">
          <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-foreground-dim space-y-1">
            <p>AETHER / CORE-01</p>
            <p>Arquitetura Energética Experimental</p>
            <p className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-energy-glow animate-pulse" />
              Status: ATIVO
            </p>
          </div>
        </div>

        <div className="absolute bottom-24 right-[clamp(1.5rem,5vw,8rem)] hidden md:block">
          <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-foreground-dim text-right space-y-1">
            <p>TELEMETRIA AO VIVO</p>
            <UtcClock />
          </div>
        </div>

        <div className="absolute top-[-40vh] left-[clamp(1.5rem,5vw,8rem)] max-w-3xl">
          <h1 className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.9] font-bold tracking-[-0.03em] uppercase mb-6">
            <span className="block text-foreground">Energia</span>
            <span className="block text-foreground">Sem</span>
            <span className="block text-gradient-energy">Limites.</span>
          </h1>

          <p className="font-display text-sm md:text-base text-foreground-muted leading-relaxed max-w-md mb-8">
            Uma nova geração de sistemas de energia compactos projetados para
            alimentar o que vem a seguir.
          </p>

          <a href="#contact" className="inline-flex items-center gap-3 pointer-events-auto group py-2 px-2 -ml-2">
            <span className="w-8 h-px bg-energy-glow group-hover:w-12 transition-all duration-500" />
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-energy-glow group-hover:text-foreground transition-colors duration-500">
              Falar conosco ↓
            </span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-float">
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-foreground-dim" />
      </div>
    </section>
  );
}
