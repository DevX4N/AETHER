"use client";

import { useState } from "react";
import { CORE_LAYERS } from "@/lib/types";
import Reveal from "@/components/ui/Reveal";

export default function CoreInspector() {
  const [activeLayer, setActiveLayer] = useState<string>("field");
  const active = CORE_LAYERS.find((l) => l.id === activeLayer) || CORE_LAYERS[0];

  return (
      <section id="technology" className="relative py-32 md:py-48 bg-surface">
      <Reveal direction="left">
      <div className="section-padding">
        <div className="mb-12">
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-foreground-dim mb-4">
            INSPECTOR INTERATIVO
          </div>
          <h2           className="font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-[0.95] font-bold tracking-[-0.03em] uppercase">
            <span className="text-foreground">Especificações</span>
            <br />
            <span className="text-gradient-energy">Do Core</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <div className="space-y-1">
              {CORE_LAYERS.map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`w-full text-left px-4 py-4 border border-border transition-all duration-500 group ${
                    activeLayer === layer.id
                      ? "bg-surface border-border-bright"
                      : "hover:bg-surface/50 hover:border-border-bright/50"
                  }`}
                  aria-label={`Explorar camada: ${layer.name}`}
                  aria-pressed={activeLayer === layer.id}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                        activeLayer === layer.id
                          ? "shadow-[0_0_8px_rgba(184,224,255,0.5)]"
                          : ""
                      }`}
                      style={{
                        backgroundColor:
                          activeLayer === layer.id ? layer.color : "var(--color-border-bright)",
                      }}
                    />
                    <span
                      className={`font-display text-xs tracking-[0.15em] uppercase transition-colors duration-500 ${
                        activeLayer === layer.id
                          ? "text-foreground"
                          : "text-foreground-muted group-hover:text-foreground"
                      }`}
                    >
                      {layer.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="relative aspect-square max-h-[500px] bg-surface border border-border flex items-center justify-center overflow-hidden mb-8">
              {CORE_LAYERS.map((layer) => {
                const isActive = layer.id === activeLayer;
                const index = CORE_LAYERS.findIndex((l) => l.id === layer.id);
                const size = 300 - index * 50;

                return (
                  <div
                    key={layer.id}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-700"
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      borderColor: isActive ? layer.color : `${layer.color}20`,
                      borderWidth: isActive ? "1.5px" : "0.5px",
                      opacity: isActive ? 1 : 0.3,
                      transform: `translate(-50%, -50%) scale(${isActive ? 1 : 0.95})`,
                      boxShadow: isActive
                        ? `0 0 60px ${layer.color}15, inset 0 0 40px ${layer.color}08`
                        : "none",
                    }}
                  />
                );
              })}

              <div
                className="w-3 h-3 rounded-full relative z-10"
                style={{
                  backgroundColor: active.color,
                  boxShadow: `0 0 20px ${active.color}60`,
                }}
              />

              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(184, 224, 255, 0.5) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(184, 224, 255, 0.5) 1px, transparent 1px)
                  `,
                  backgroundSize: "20px 20px",
                }}
              />

              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-foreground-dim" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-foreground-dim" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-foreground-dim" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-foreground-dim" />

              <div className="absolute top-4 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.2em] uppercase text-foreground-dim">
                {active.label}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {active.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="p-4 border border-border bg-surface"
                >
                  <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-foreground-dim mb-2">
                    {metric.label}
                  </div>
                  <div
                    className="font-mono text-sm tracking-[0.1em]"
                    style={{ color: active.color }}
                  >
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 border border-border bg-surface/50">
              <p className="font-display text-sm text-foreground-muted leading-relaxed">
                {active.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
    </section>
  );
}
