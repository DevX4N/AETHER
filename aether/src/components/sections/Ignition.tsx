"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  { id: "01", label: "BLOQUEIO DE CAMPO", code: "BC-001" },
  { id: "02", label: "INJEÇÃO DE PLASMA", code: "IP-002" },
  { id: "03", label: "ESTABILIZAÇÃO DO CORE", code: "EC-003" },
  { id: "04", label: "SAÍDA DE ENERGIA", code: "SE-004" },
];

export default function Ignition() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heightRef = useRef(0);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    heightRef.current = el.offsetHeight;

    const resizeObserver = new ResizeObserver(() => {
      heightRef.current = el.offsetHeight;
    });
    resizeObserver.observe(el);

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const progress = -rect.top / (heightRef.current - window.innerHeight);
      const clamped = Math.max(0, Math.min(1, progress));
      const stepIndex = Math.floor(clamped * STEPS.length);
      setActiveStep(Math.min(stepIndex, STEPS.length - 1));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="explore"
      className="relative"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-1000"
            style={{
              width: `${200 + activeStep * 100}px`,
              height: `${200 + activeStep * 100}px`,
              background: `radial-gradient(circle, rgba(184, 224, 255, ${
                0.02 + activeStep * 0.02
              }) 0%, transparent 70%)`,
              filter: `blur(${60 - activeStep * 10}px)`,
            }}
          />
        </div>

        <div className="relative z-10 section-padding w-full">
          <div className="mb-20">
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-foreground-dim mb-4">
              INICIALIZAÇÃO
            </div>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[0.95] font-bold tracking-[-0.03em] uppercase">
              <span className="text-foreground">SEQUÊNCIA DE</span>
              <br />
              <span className="text-foreground-muted">IGNIÇÃO</span>
            </h2>
          </div>

          <div className="space-y-1">
            {STEPS.map((step, i) => (
              <div
                key={step.id}
                className={`flex items-center gap-6 py-4 border-t border-border transition-all duration-700 ${
                  i <= activeStep
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                }`}
              >
                <span className="font-mono text-[11px] tracking-[0.2em] text-foreground-dim w-8">
                  {step.id}
                </span>

                <div
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-700 ${
                    i <= activeStep
                      ? "bg-energy-glow shadow-[0_0_12px_rgba(184,224,255,0.5)]"
                      : "bg-border-bright"
                  }`}
                />

                <span
                  className={`font-display text-sm md:text-base tracking-[0.15em] uppercase transition-colors duration-700 ${
                    i <= activeStep ? "text-foreground" : "text-foreground-dim"
                  }`}
                >
                  {step.label}
                </span>

                <span className="font-mono text-[10px] tracking-[0.15em] text-foreground-dim ml-auto hidden md:block">
                  {step.code}
                </span>
              </div>
            ))}
          </div>

          <div
            className={`mt-16 transition-all duration-1000 ${
              activeStep >= STEPS.length - 1
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="font-display text-[clamp(1.2rem,3vw,2.2rem)] leading-[1.1] font-bold tracking-[-0.01em] uppercase max-w-xl">
              <span className="text-foreground">Controle o plasma.</span>
              <br />
              <span className="text-gradient-energy">Controle a energia.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
