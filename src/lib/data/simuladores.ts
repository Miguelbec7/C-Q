import type { LucideIcon } from "lucide-react";
import {
  Home,
  Wallet,
  Calculator,
  Gauge,
  Landmark,
  Stamp,
  PiggyBank,
  Building2,
  TrendingUp,
  Banknote,
} from "lucide-react";

export interface SimulatorMeta {
  slug: string;
  icon: LucideIcon;
  title: string;
  shortTitle: string;
  description: string;
  metaDescription: string;
}

export const simulators: SimulatorMeta[] = [
  {
    slug: "credito-habitacao",
    icon: Home,
    title: "Simulador de Comprar Casa",
    shortTitle: "Comprar Casa",
    description: "Descubra quanto pode pedir ao banco e qual a prestação estimada para a sua casa.",
    metaDescription: "Simulador gratuito para comprar casa. Calcule o valor de imóvel, prestação e taxa de esforço estimados pela C&Q Finanças.",
  },
  {
    slug: "credito-pessoal",
    icon: Wallet,
    title: "Simulador de Crédito Pessoal",
    shortTitle: "Crédito Pessoal",
    description: "Calcule a prestação mensal estimada para o seu crédito pessoal.",
    metaDescription: "Simule o seu crédito pessoal gratuitamente e descubra a prestação mensal estimada com a C&Q Finanças.",
  },
  {
    slug: "prestacao-mensal",
    icon: Calculator,
    title: "Simulador de Prestação Mensal",
    shortTitle: "Prestação Mensal",
    description: "Calcule a prestação mensal de qualquer crédito a partir do montante, taxa e prazo.",
    metaDescription: "Calculadora de prestação mensal de crédito. Insira montante, taxa e prazo e obtenha o valor estimado da prestação.",
  },
  {
    slug: "taxa-de-esforco",
    icon: Gauge,
    title: "Simulador de Taxa de Esforço",
    shortTitle: "Taxa de Esforço",
    description: "Avalie se os seus encargos mensais estão dentro de um nível saudável face ao rendimento.",
    metaDescription: "Calcule a sua taxa de esforço gratuitamente e saiba se está dentro dos limites recomendados para aprovação de crédito.",
  },
  {
    slug: "imt",
    icon: Landmark,
    title: "Simulador de IMT",
    shortTitle: "IMT",
    description: "Calcule o Imposto Municipal sobre Transmissões Onerosas de Imóveis para a sua compra.",
    metaDescription: "Calculadora de IMT 2026 para habitação própria permanente e secundária. Simule gratuitamente com a C&Q Finanças.",
  },
  {
    slug: "imposto-de-selo",
    icon: Stamp,
    title: "Simulador de Imposto do Selo",
    shortTitle: "Imposto do Selo",
    description: "Calcule o imposto do selo sobre a aquisição e sobre o crédito habitação.",
    metaDescription: "Calcule o imposto do selo sobre a compra de imóvel e sobre o crédito habitação com o simulador gratuito da C&Q Finanças.",
  },
  {
    slug: "poupanca-transferencia",
    icon: PiggyBank,
    title: "Poupança na Transferência de Crédito",
    shortTitle: "Poupança na Transferência",
    description: "Compare o seu crédito atual com uma nova proposta e veja quanto pode poupar.",
    metaDescription: "Simule a poupança ao transferir o seu crédito habitação para outra instituição. Calculadora gratuita da C&Q Finanças.",
  },
  {
    slug: "imi",
    icon: Building2,
    title: "Simulador de IMI",
    shortTitle: "IMI",
    description: "Calcule o Imposto Municipal sobre Imóveis anual estimado para o seu imóvel.",
    metaDescription: "Calculadora de IMI 2026. Calcule o imposto municipal sobre imóveis a partir do VPT e da taxa do município, com a C&Q Finanças.",
  },
  {
    slug: "mais-valias-imoveis",
    icon: TrendingUp,
    title: "Simulador de Mais-Valias Imobiliárias",
    shortTitle: "Mais-Valias",
    description: "Calcule a mais-valia tributável na venda de um imóvel e o impacto do reinvestimento.",
    metaDescription: "Simulador de mais-valias na venda de imóveis. Calcule a mais-valia tributável em IRS com a C&Q Finanças.",
  },
  {
    slug: "salario-liquido",
    icon: Banknote,
    title: "Simulador de Salário Líquido",
    shortTitle: "Salário Líquido",
    description: "Calcule o seu salário líquido mensal a partir do salário base, com retenção de IRS e Segurança Social.",
    metaDescription: "Calculadora de salário líquido 2026. Simule o seu vencimento líquido com a tabela de retenção de IRS em vigor, com a C&Q Finanças.",
  },
];

export function getSimulatorBySlug(slug: string) {
  return simulators.find((sim) => sim.slug === slug);
}
