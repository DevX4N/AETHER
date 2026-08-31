"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Statement() {
  const { ref, visible } = useScrollReveal({ threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="relative py-32 md:py-48 min-h-[60vh]"
    >
      <div className="section-padding w-full h-full relative">
        <div
          className={`absolute top-0 left-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-display text-[clamp(2rem,6vw,5rem)] leading-[0.9] font-bold tracking-[-0.03em] uppercase max-w-4xl">
            <span className="block text-foreground">O futuro</span>
            <span className="block text-foreground">vai exigir</span>
            <span className="block text-foreground-muted">mais energia.</span>
          </h2>
        </div>

        <div
          className={`absolute bottom-0 right-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-display text-[clamp(2rem,6vw,5rem)] leading-[0.9] font-bold tracking-[-0.03em] uppercase max-w-4xl text-right">
            <span className="block text-foreground">Nós estamos</span>
            <span className="block text-foreground">construindo</span>
            <span className="block text-gradient-energy">uma forma melhor.</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
