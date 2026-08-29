"use client";

import { useEffect, useRef, useState } from "react";

const STAGES = [
  {
    name: "PLASMA",
    temp: "120M K",
    detail: "Ambiente de fusão contido",
    code: "ESTÁGIO-01",
  },
  {
    name: "TRANSFERÊNCIA TÉRMICA",
    temp: "3.200 K",
    detail: "Troca de calor via interface cerâmica",
    code: "ESTÁGIO-02",
  },
  {
    name: "CONVERSÃO DE ENERGIA",
    temp: "94,2%",
    detail: "Conversão eletromagnética direta",
    code: "ESTÁGIO-03",
  },
  {
    name: "SAÍDA PARA REDE",
    temp: "240 MW",
    detail: "Entrega contínua de energia",
    code: "ESTÁGIO-04",
  },
];

const GRID_OPACITIES = [
  0.75, 0.05, 0.42, 0.05, 0.88, 0.05, 0.31, 0.05, 0.67, 0.05, 0.91, 0.05,
  0.05, 0.54, 0.05, 0.83, 0.05, 0.39, 0.72, 0.05, 0.05, 0.61, 0.05, 0.48,
  0.85, 0.05, 0.05, 0.33, 0.78, 0.05, 0.56, 0.05, 0.05, 0.69, 0.05, 0.44,
  0.05, 0.82, 0.05, 0.37, 0.64, 0.05, 0.05, 0.51, 0.87, 0.05, 0.41, 0.05,
];

export default function EnergyFlow() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heightRef = useRef(0);
  const [activeStage, setActiveStage] = useState(-1);
  const [flowProgress, setFlowProgress] = useState(0);

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
      setFlowProgress(clamped);
      const stageIndex = Math.floor(clamped * STAGES.length);
      setActiveStage(Math.min(stageIndex, STAGES.length - 1));
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
      className="relative"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="section-padding w-full">
          <div className="mb-20">
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-foreground-dim mb-4">
              ARQUITETURA DE ENERGIA
            </div>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] font-bold tracking-[-0.03em] uppercase">
              <span className="text-foreground">FLUXO DE</span>
              <br />
              <span className="text-gradient-energy">ENERGIA</span>
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px hidden md:block">
              <div className="h-full bg-border" />
              <div
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-energy-glow to-energy transition-all duration-300"
                style={{ height: `${flowProgress * 100}%` }}
              />
            </div>

            <div className="space-y-0">
              {STAGES.map((stage, i) => {
                const isActive = i === activeStage;
                const isPast = i < activeStage;

                return (
                  <div
                    key={stage.name}
                    className={`relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-12 border-b border-border transition-all duration-700 ${
                      isActive || isPast ? "opacity-100" : "opacity-30"
                    }`}
                  >
                    <div className="md:col-span-1 flex items-start gap-4 md:gap-0">
                      <div className="relative md:pl-12">
                        <div
                          className={`w-2 h-2 rounded-full transition-all duration-700 ${
                            isActive
                              ? "bg-energy-glow shadow-[0_0_20px_rgba(184,224,255,0.6)]"
                              : isPast
                              ? "bg-energy-glow/50"
                              : "bg-border-bright"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="md:col-span-4">
                      <div className="font-mono text-[10px] tracking-[0.2em] text-foreground-dim mb-2">
                        {stage.code}
                      </div>
                      <h3
                        className={`font-display text-lg md:text-xl tracking-[0.1em] uppercase transition-colors duration-700 ${
                          isActive ? "text-foreground" : "text-foreground-muted"
                        }`}
                      >
                        {stage.name}
                      </h3>
                    </div>

                    <div className="md:col-span-4">
                      <p
                        className={`font-display text-sm transition-colors duration-700 ${
                          isActive ? "text-foreground-muted" : "text-foreground-dim"
                        }`}
                      >
                        {stage.detail}
                      </p>
                    </div>

                    <div className="md:col-span-3 md:text-right">
                      <div
                        className={`font-mono text-sm tracking-[0.15em] transition-all duration-700 ${
                          isActive ? "text-energy-glow" : "text-foreground-dim"
                        }`}
                      >
                        {stage.temp}
                      </div>
                    </div>

                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-px bg-energy-glow shadow-[0_0_8px_rgba(184,224,255,0.4)] hidden md:block" />
                    )}
                  </div>
                );
              })}
            </div>

            <div
              className={`mt-16 transition-all duration-1000 ${
                activeStage >= STAGES.length - 1
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="relative h-32 overflow-hidden">
                <div
                  className="absolute inset-0 grid grid-cols-12 grid-rows-4 gap-px"
                  style={{ opacity: 0.15 }}
                >
                  {GRID_OPACITIES.map((opacity, i) => (
                    <div
                      key={i}
                      className="bg-energy-glow transition-opacity duration-1000"
                      style={{
                        opacity,
                        transitionDelay: `${i * 20}ms`,
                      }}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-foreground-dim">
                    REDE / CONECTADA
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
