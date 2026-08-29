"use client";

import { useEffect, useRef, useState } from "react";

const METRICS = [
  { value: "240", unit: "MW", label: "POTÊNCIA NOMINAL" },
  { value: "18", unit: "M", label: "DIÂMETRO DO CORE" },
  { value: "24", unit: "/ 7", label: "OPERAÇÃO CONTÍNUA" },
  { value: "ZERO", unit: "", label: "COMBUSTÃO" },
];

function AnimatedNumber({ target, unit, active }: { target: string; unit: string; active: boolean }) {
  const [display, setDisplay] = useState(target === "ZERO" ? "ZERO" : "0");
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!active || hasAnimated.current) return;
    hasAnimated.current = true;

    if (target === "ZERO") {
      const timeout = setTimeout(() => setDisplay("ZERO"), 30);
      return () => clearTimeout(timeout);
    }

    const num = parseInt(target);
    if (isNaN(num)) {
      const timeout = setTimeout(() => setDisplay(target), 30);
      return () => clearTimeout(timeout);
    }

    let current = 0;
    const step = Math.ceil(num / 40);
    const interval = setInterval(() => {
      current += step;
      if (current >= num) {
        setDisplay(target);
        clearInterval(interval);
      } else {
        setDisplay(String(current));
      }
    }, 30);
    return () => clearInterval(interval);
  }, [target, active]);

  return (
    <span className="font-display text-[clamp(3rem,8vw,7rem)] font-bold leading-none tracking-[-0.03em]">
      {display}
      {unit && (
        <span className="font-mono text-[clamp(1rem,2.5vw,2rem)] font-normal text-energy-glow ml-2">
          {unit}
        </span>
      )}
    </span>
  );
}

export default function ScaleData() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48">
      <div className="section-padding mb-20">
        <div className="line-technical-bright" />
      </div>

      <div className="section-padding">
        <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.85] font-bold tracking-[-0.03em] uppercase mb-20 max-w-4xl">
          <span className="text-foreground">Um core.</span>
          <br />
          <span className="text-foreground-muted">Uma cidade inteira.</span>
        </h2>

        <div className="space-y-16 md:space-y-0 md:grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <div className="border-t border-border pt-8">
              <AnimatedNumber target={METRICS[0].value} unit={METRICS[0].unit} active={active} />
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-foreground-dim mt-3">
                {METRICS[0].label}
              </div>
            </div>
          </div>

          <div className="md:col-span-5 md:pt-24">
            <div className="border-t border-border pt-8">
              <AnimatedNumber target={METRICS[1].value} unit={METRICS[1].unit} active={active} />
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-foreground-dim mt-3">
                {METRICS[1].label}
              </div>
            </div>
          </div>

          <div className="md:col-span-4 md:col-start-2">
            <div className="border-t border-border pt-8">
              <AnimatedNumber target={METRICS[2].value} unit={METRICS[2].unit} active={active} />
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-foreground-dim mt-3">
                {METRICS[2].label}
              </div>
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <div className="border-t border-border pt-8">
              <AnimatedNumber target={METRICS[3].value} unit={METRICS[3].unit} active={active} />
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-foreground-dim mt-3">
                {METRICS[3].label}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-padding mt-20">
        <div className="line-technical" />
      </div>
    </section>
  );
}
