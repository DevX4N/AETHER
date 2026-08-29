export interface CoreLayer {
  id: string;
  name: string;
  label: string;
  description: string;
  metrics: { label: string; value: string }[];
  color: string;
}

export const CORE_LAYERS: CoreLayer[] = [
  {
    id: "field",
    name: "Campo Magnético",
    label: "01 — Campo Magnético",
    description:
      "Sistema de contenção eletromagnética dinâmico mantendo a estabilidade do plasma em frequência de 2,4 THz.",
    metrics: [
      { label: "Status", value: "ESTÁVEL" },
      { label: "Frequência", value: "2,4 THz" },
      { label: "Campo", value: "ATIVO" },
      { label: "Padrão", value: "TOROIDAL" },
    ],
    color: "#B8E0FF",
  },
  {
    id: "plasma",
    name: "Câmera de Plasma",
    label: "02 — Câmera de Plasma",
    description:
      "Ambiente de fusão controlado sustentando plasma a 120 milhões de Kelvin em configuração toroidal.",
    metrics: [
      { label: "Status", value: "CONTIDO" },
      { label: "Temperatura", value: "120M K" },
      { label: "Densidade", value: "10²⁰ m⁻³" },
      { label: "Confinamento", value: "ATIVO" },
    ],
    color: "#FFF8E7",
  },
  {
    id: "shield",
    name: "Escudo Térmico",
    label: "03 — Escudo Térmico",
    description:
      "Compósito cerâmico multicamadas suportando gradientes térmicos extremos.",
    metrics: [
      { label: "Status", value: "NOMINAL" },
      { label: "Camadas", value: "12" },
      { label: "Temp. Pico", value: "3.200 K" },
      { label: "Integridade", value: "99,97%" },
    ],
    color: "#FFD699",
  },
  {
    id: "extraction",
    name: "Extração de Energia",
    label: "04 — Anel de Extração",
    description:
      "Sistema de conversão direta de energia transformando saída térmica em energia elétrica utilizável.",
    metrics: [
      { label: "Status", value: "ATIVO" },
      { label: "Eficiência", value: "94,2%" },
      { label: "Saída", value: "240 MW" },
      { label: "Rede", value: "CONECTADA" },
    ],
    color: "#E8F4FF",
  },
];

export const SCALE_APPLICATIONS = [
  {
    id: "cities",
    name: "CIDADES",
    description:
      "Alimentando infraestrutura urbana com cores de emissão zero.",
    detail: "1 CORE AETHER alimenta 180.000 residências",
  },
  {
    id: "datacenters",
    name: "CENTROS DE DADOS",
    description:
      "Energia contínua de alta densidade para infraestrutura de computação.",
    detail: "Disponibilidade 24/7 sem cadeia de suprimentos de combustível",
  },
  {
    id: "industry",
    name: "INDÚSTRIA",
    description:
      "Energia de grau industrial para manufatura pesada.",
    detail: "Acoplamento térmico direto para calor de processo",
  },
  {
    id: "space",
    name: "SISTEMAS ESPACIAIS",
    description:
      "Geração de energia compacta para missões orbitais e deep space.",
    detail: "Core de 18m cabe em fairing de payload padrão",
  },
  {
    id: "remote",
    name: "INFRAESTRUTURA REMOTA",
    description:
      "Energia autônoma para instalações isoladas.",
    detail: "Ciclo de manutenção de 5 anos, autorregulável",
  },
];
