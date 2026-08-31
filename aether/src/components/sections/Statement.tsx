"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Statement() {
  const { ref, visible } = useScrollReveal({ threshold: 0.3 });
  const sectionInset = "clamp(1.5rem, 5vw, 8rem)";

  return (
    <section
      ref={ref}
      className="relative py-32 md:py-48 min-h-[60vh]"
    >
      <div className="section-padding relative w-full min-h-[60vh]">
        <div
          className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2
            className="font-display text-[clamp(2rem,6vw,5rem)] leading-[0.9] font-bold tracking-[-0.03em] uppercase max-w-[min(90vw,44rem)]"
            style={{ marginLeft: sectionInset, marginTop: sectionInset }}
          >
            <span className="block text-foreground">O futuro</span>
            <span className="block text-foreground">vai exigir</span>
            <span className="block text-foreground-muted">mais energia.</span>
          </h2>
        </div>

        <div
          className={`absolute bottom-[-1.5rem] md:bottom-[-2.25rem] right-0 w-full md:w-auto transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2
            className="font-display text-[clamp(2rem,6vw,5rem)] leading-[0.9] font-bold tracking-[-0.03em] uppercase max-w-[min(90vw,52rem)] ml-auto text-right"
            style={{ marginRight: sectionInset, marginBottom: "clamp(1rem, 2vw, 2.5rem)" }}
          >
            <span className="block text-foreground">Nós estamos</span>
            <span className="block text-foreground">construindo</span>
            <span className="block text-gradient-energy">uma forma melhor.</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
