"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Engineering() {
  const { ref, visible } = useScrollReveal({ threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="relative py-32 md:py-48 bg-surface"
    >
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(184, 224, 255, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(184, 224, 255, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-foreground-dim mb-4">
              ENGENHARIA
            </div>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] font-bold tracking-[-0.03em] uppercase mb-8">
              <span className="text-foreground">Projetado</span>
              <br />
              <span className="text-foreground">Para Conter</span>
              <br />
              <span className="text-gradient-energy">Uma Estrela.</span>
            </h2>

            <p className="font-display text-sm md:text-base text-foreground-muted leading-relaxed max-w-md">
              Energia extrema exige controle extremo. Cada camada da
              arquitetura AETHER existe para manter o core estável, mensurável
              e previsível.
            </p>
          </div>

          <div className="relative">
            <div
              className={`transition-all duration-1000 ${
                visible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-12"
              }`}
            >
              <svg
                viewBox="0 0 400 400"
                className="w-full max-w-md mx-auto"
                fill="none"
                stroke="rgba(184, 224, 255, 0.3)"
                strokeWidth="0.5"
              >
                <circle cx="200" cy="200" r="180" strokeDasharray="4 4" />
                <circle cx="200" cy="200" r="140" />
                <circle cx="200" cy="200" r="100" />
                <circle cx="200" cy="200" r="60" strokeDasharray="2 2" />
                <circle cx="200" cy="200" r="20" fill="rgba(184, 224, 255, 0.15)" />

                <line x1="200" y1="20" x2="200" y2="80" />
                <line x1="200" y1="320" x2="200" y2="380" />
                <line x1="20" y1="200" x2="80" y2="200" />
                <line x1="320" y1="200" x2="380" y2="200" />

                <line x1="70" y1="70" x2="120" y2="120" strokeDasharray="2 4" />
                <line x1="330" y1="70" x2="280" y2="120" strokeDasharray="2 4" />
                <line x1="70" y1="330" x2="120" y2="280" strokeDasharray="2 4" />
                <line x1="330" y1="330" x2="280" y2="280" strokeDasharray="2 4" />

                <text x="200" y="15" textAnchor="middle" fill="rgba(184, 224, 255, 0.4)" fontSize="6" fontFamily="monospace">LIMITE DO CAMPO</text>
                <text x="200" y="395" textAnchor="middle" fill="rgba(184, 224, 255, 0.4)" fontSize="6" fontFamily="monospace">DIÂMETRO: 18M</text>
                <text x="8" y="200" fill="rgba(184, 224, 255, 0.4)" fontSize="6" fontFamily="monospace" transform="rotate(-90 12 200)">CÂMARA DE PLASMA</text>

                <line x1="196" y1="20" x2="204" y2="20" strokeWidth="1" />
                <line x1="196" y1="380" x2="204" y2="380" strokeWidth="1" />
                <line x1="20" y1="196" x2="20" y2="204" strokeWidth="1" />
                <line x1="380" y1="196" x2="380" y2="204" strokeWidth="1" />

                <ellipse cx="200" cy="200" rx="120" ry="40" strokeDasharray="3 3" opacity="0.3" />
                <ellipse cx="200" cy="200" rx="40" ry="120" strokeDasharray="3 3" opacity="0.3" />

                <line x1="194" y1="200" x2="206" y2="200" strokeWidth="1" stroke="rgba(184, 224, 255, 0.6)" />
                <line x1="200" y1="194" x2="200" y2="206" strokeWidth="1" stroke="rgba(184, 224, 255, 0.6)" />
              </svg>

              <div className="absolute top-4 right-4 font-mono text-[9px] tracking-[0.15em] text-foreground-dim text-right space-y-1">
                <p>ESCALA: 1:200</p>
                <p>REV: 04.2.1</p>
                <p>AETHER SYS.</p>
              </div>

              <div className="absolute bottom-4 left-4 font-mono text-[9px] tracking-[0.15em] text-foreground-dim space-y-1">
                <p>FOLHA 01/04</p>
                <p>MONTAGEM DO CORE</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
