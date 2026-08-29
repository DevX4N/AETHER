"use client";

import { useEffect, useRef, useState } from "react";
import { CORE_LAYERS } from "@/lib/types";

export default function TheCore() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeLayer, setActiveLayer] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 md:py-48"
    >
      <div className="section-padding w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
        >
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-foreground-dim mb-4">
            ARQUITETURA
          </div>
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] font-bold tracking-[-0.03em] uppercase mb-8">
            <span className="text-foreground">O</span>
            <br />
            <span className="text-gradient-energy">CORE</span>
          </h2>

          <p className="font-display text-sm md:text-base text-foreground-muted leading-relaxed max-w-md mb-12">
            No centro da AETHER está um ambiente de plasma controlado,
            sustentado por um campo eletromagnético dinâmico. Cada camada
            existe para manter o core estável, mensurável e previsível.
          </p>

          <div className="space-y-0">
            {CORE_LAYERS.map((layer, i) => (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(i)}
                className={`w-full text-left flex items-center gap-4 py-4 border-t border-border transition-all duration-500 group ${
                  activeLayer === i ? "opacity-100" : "opacity-60 hover:opacity-80"
                }`}
                aria-label={`Explorar camada: ${layer.name}`}
                aria-pressed={activeLayer === i}
              >
                <div
                  className="w-2 h-2 rounded-full shrink-0 transition-all duration-500"
                  style={{
                    backgroundColor: activeLayer === i ? layer.color : "var(--color-border-bright)",
                    boxShadow: activeLayer === i ? `0 0 10px ${layer.color}50` : "none",
                  }}
                />
                <div className="flex-1">
                  <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-foreground-dim mb-1">
                    {layer.label}
                  </div>
                  <div
                    className="font-display text-sm tracking-[0.05em] transition-colors duration-500"
                    style={{ color: activeLayer === i ? layer.color : "var(--color-foreground-muted)" }}
                  >
                    {layer.name}
                  </div>
                </div>
                <div className="hidden md:flex gap-4">
                  {layer.metrics.slice(0, 2).map((m) => (
                    <div key={m.label} className="text-right">
                      <div className="font-mono text-[8px] tracking-[0.15em] uppercase text-foreground-dim">
                        {m.label}
                      </div>
                      <div
                        className="font-mono text-[11px] tracking-[0.1em]"
                        style={{ color: activeLayer === i ? layer.color : "var(--color-foreground-dim)" }}
                      >
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div
          className={`relative h-[400px] lg:h-[500px] flex items-center justify-center transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          {CORE_LAYERS.map((layer, i) => {
            const isActive = i === activeLayer;
            const size = 300 - i * 50;

            return (
              <div
                key={layer.id}
                className="absolute top-1/2 left-1/2 transition-all duration-700 ease-out"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  transform: `translate(-50%, -50%) scale(${isActive ? 1 : 0.95})`,
                  opacity: isActive ? 1 : 0.3,
                }}
              >
                <div
                  className="absolute inset-0 rounded-full border transition-all duration-700"
                  style={{
                    borderColor: isActive ? layer.color : `${layer.color}33`,
                    borderWidth: isActive ? "1.5px" : "0.5px",
                    boxShadow: isActive
                      ? `0 0 40px ${layer.color}20, inset 0 0 40px ${layer.color}10`
                      : "none",
                  }}
                />
                {isActive && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center z-10">
                      <div
                        className="w-3 h-3 rounded-full mb-3 mx-auto animate-pulse"
                        style={{ backgroundColor: layer.color }}
                      />
                      <div
                        className="font-display text-xs tracking-[0.15em] uppercase"
                        style={{ color: layer.color }}
                      >
                        {layer.name}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
