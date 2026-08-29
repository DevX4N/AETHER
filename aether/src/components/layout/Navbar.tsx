"use client";

import { useState, useEffect } from "react";
import Logo from "@/components/ui/Logo";

const NAV_ITEMS = [
  { label: "Tecnologia", href: "#technology" },
  { label: "Empresa", href: "#about" },
  { label: "Contato", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="section-padding h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <div className="transition-transform duration-500 group-hover:rotate-[30deg]">
            <Logo />
          </div>
          <span className="font-display text-sm tracking-[0.3em] font-medium uppercase text-foreground">
            AETHER
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-display text-xs tracking-[0.15em] uppercase text-foreground-muted hover:text-foreground transition-colors duration-500 relative group py-2"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-energy-glow group-hover:w-full transition-all duration-500" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-energy-glow hover:text-foreground transition-colors duration-500 flex items-center gap-2 group py-2 px-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-energy-glow group-hover:bg-foreground transition-colors duration-500" />
            FALAR CONOSCO
          </a>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
          >
            <span className={`w-5 h-px bg-foreground transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
            <span className={`w-5 h-px bg-foreground transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border">
          <div className="section-padding py-6 space-y-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block font-display text-sm tracking-[0.15em] uppercase text-foreground-muted hover:text-foreground transition-colors duration-500 py-2"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
