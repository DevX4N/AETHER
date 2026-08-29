"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import dynamic from "next/dynamic";

const AetherCore = dynamic(() => import("../core/AetherCore"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-24 h-24 rounded-full bg-energy-glow/10 animate-pulse" />
    </div>
  ),
});

export default function FinalCore() {
  const { ref, visible } = useScrollReveal({ threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="relative py-32 md:py-48 min-h-screen flex items-center"
    >
      <div className="section-padding w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative h-[300px] md:h-[400px]">
          <div
            className={`transition-all duration-1000 ${
              visible ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <div className="w-full h-full scale-75" role="presentation" aria-hidden="true">
              <AetherCore />
            </div>
          </div>

          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-energy-glow/10 transition-all duration-1000 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
            style={{
              animation: "orbit 20s linear infinite",
            }}
          />
        </div>

        <div
          className={`transition-all duration-1000 delay-200 ${
            visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
        >
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-foreground-dim mb-4">
            STATUS FINAL
          </div>

          <h2 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-[0.95] font-bold tracking-[-0.03em] uppercase mb-12">
            <span className="text-foreground">AETHER</span>
            <br />
            <span className="text-gradient-energy">CORE 01</span>
          </h2>

          <div className="space-y-0">
            {[
              { label: "STATUS", value: "ESTÁVEL", color: "var(--color-energy-glow)" },
              { label: "SAÍDA", value: "NOMINAL", color: "var(--color-energy-glow)" },
              { label: "TEMPERATURA", value: "CONTROLADA", color: "var(--color-plasma)" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between py-4 border-t border-border"
              >
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-foreground-dim">
                  {item.label}
                </span>
                <div className="flex items-center gap-2">
                  <div
                    className="w-1 h-1 rounded-full animate-pulse"
                    style={{ backgroundColor: item.color }}
                  />
                  <span
                    className="font-mono text-xs tracking-[0.15em] uppercase"
                    style={{ color: item.color }}
                  >
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 font-display text-sm text-foreground-muted leading-relaxed max-w-sm">
            O objeto transmite silêncio e precisão. Uma estrela, contida e
            controlada. Pronta.
          </p>
        </div>
      </div>
    </section>
  );
}
