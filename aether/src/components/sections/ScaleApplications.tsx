"use client";

import Reveal from "@/components/ui/Reveal";
import { SCALE_APPLICATIONS } from "@/lib/types";

export default function ScaleApplications() {
  return (
    <section className="relative py-32 md:py-48">
      <div className="section-padding mb-16">
        <div className="line-technical-bright" />
      </div>

      <div className="section-padding mb-20">
        <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.85] font-bold tracking-[-0.03em] uppercase">
          <span className="text-foreground">Construído</span>
          <br />
          <span className="text-foreground-muted">Para Escalar.</span>
        </h2>
      </div>

      <div className="space-y-0">
        {SCALE_APPLICATIONS.map((app, index) => (
          <Reveal key={app.id} direction="left" className="group relative border-t border-border hover:border-border-bright transition-all duration-700">
            <div className="section-padding py-8 md:py-12 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center">
              <div className="md:col-span-3">
                <h3 className="font-display text-lg md:text-xl tracking-[0.15em] uppercase text-foreground group-hover:text-energy-glow transition-colors duration-500">
                  {app.name}
                </h3>
              </div>

              <div className="md:col-span-6">
                <p className="font-display text-sm text-foreground-muted group-hover:text-foreground transition-colors duration-500">
                  {app.description}
                </p>
              </div>

              <div className="md:col-span-3 md:text-right">
                <span className="font-mono text-[11px] tracking-[0.15em] text-foreground-dim group-hover:text-energy-glow transition-colors duration-500">
                  {app.detail}
                </span>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-energy-glow/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
