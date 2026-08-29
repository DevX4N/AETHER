import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="section-padding py-3 flex items-center justify-between border-b border-border">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-foreground-dim">
          STATUS DO SISTEMA — ONLINE
        </span>
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-foreground-dim">
          REDE DE CORES — 01
        </span>
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-foreground-dim hidden md:block">
          COORDENADAS — 37.7749° N
        </span>
      </div>

      <div className="section-padding py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <Logo size={24} />
            <span className="font-display text-xs tracking-[0.3em] font-medium uppercase">
              AETHER
            </span>
          </div>
          <p className="font-display text-xs text-foreground-muted leading-relaxed">
            Sistemas de Energia Avançada
          </p>
        </div>

        <div className="md:col-span-2 grid grid-cols-2 gap-4">
          {["Tecnologia", "Pesquisa", "Infraestrutura", "Empresa"].map((item) => (
            <a
              key={item}
              href="#"
              className="font-display text-xs tracking-[0.1em] uppercase text-foreground-muted hover:text-foreground transition-colors duration-500"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="md:col-span-1">
          <a
            href="#contact"
            className="font-display text-xs tracking-[0.1em] uppercase text-energy-glow hover:text-foreground transition-colors duration-500"
          >
            Contato
          </a>
        </div>
      </div>

      <div className="section-padding py-4 border-t border-border flex flex-col md:flex-row items-center justify-between gap-2">
        <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-foreground-dim">
          AETHER SYSTEMS — TERRA / 2026
        </span>
        <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-foreground-dim">
          TODOS OS SISTEMAS NOMINAIS
        </span>
      </div>
    </footer>
  );
}
