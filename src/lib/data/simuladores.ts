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

export interface SimulatorFaq {
  question: string;
  answer: string;
}

export interface SimulatorMeta {
  slug: string;
  icon: LucideIcon;
  title: string;
  shortTitle: string;
  description: string;
  metaDescription: string;
  faqs?: SimulatorFaq[];
}

export const simulators: SimulatorMeta[] = [
  {
    slug: "credito-habitacao",
    icon: Home,
    title: "Que casa consigo comprar?",
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
    faqs: [
      {
        question: "O que é a mais-valia na venda de imóveis?",
        answer:
          "A mais-valia imobiliária corresponde ao lucro obtido com a venda de um imóvel — a diferença entre o valor de venda e o valor de aquisição, ajustado pelo coeficiente de desvalorização da moeda e pelas despesas dedutíveis.",
      },
      {
        question: "Quando se aplica imposto sobre mais-valias de imóveis?",
        answer:
          "O imposto aplica-se sempre que há lucro na venda. 50% desse lucro é somado aos restantes rendimentos do agregado e tributado em sede de IRS (englobamento obrigatório), salvo isenção aplicável.",
      },
      {
        question: "Posso ficar isento de pagar imposto sobre mais-valias?",
        answer:
          "Sim, se o imóvel foi adquirido antes de 1 de janeiro de 1989, ou se era a sua habitação própria e permanente há pelo menos 12 meses e reinvestiu o valor de realização numa nova habitação própria e permanente, entre 24 meses antes e 36 meses depois da venda. A isenção é proporcional ao valor reinvestido. Na venda de uma segunda habitação não há, em regra, direito a esta isenção.",
      },
      {
        question: "Que despesas posso deduzir ao calcular as mais-valias?",
        answer:
          "Obras de valorização dos últimos 12 anos, IMT e Imposto do Selo pagos na aquisição, registo predial, escritura, comissões de imobiliária e certificado energético, desde que comprovados por fatura em nome do vendedor.",
      },
      {
        question: "Como declarar as mais-valias no IRS?",
        answer:
          "As mais-valias imobiliárias são declaradas no Anexo G da declaração de IRS. Imóveis adquiridos antes de 1989 são declarados no Anexo G1, relativo às transações isentas.",
      },
    ],
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
