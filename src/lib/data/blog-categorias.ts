export interface BlogCategory {
  slug: string;
  title: string;
  description: string;
}

export const blogCategories: BlogCategory[] = [
  { slug: "credito-habitacao", title: "Crédito Habitação", description: "Tudo sobre comprar casa, taxas e aprovação de crédito habitação." },
  { slug: "transferencia-de-credito", title: "Transferência de Crédito", description: "Quando compensa transferir o seu crédito e como funciona o processo." },
  { slug: "credito-construcao", title: "Crédito Construção", description: "Financiamento de obras, construção e remodelação de imóveis." },
  { slug: "credito-pessoal", title: "Crédito Pessoal", description: "Soluções de financiamento pessoal e consolidação de créditos." },
  { slug: "seguros", title: "Seguros", description: "Seguros de vida, multirriscos e proteção associados ao crédito." },
  { slug: "poupanca", title: "Poupança", description: "Estratégias para poupar dinheiro e otimizar as suas finanças." },
  { slug: "investimento", title: "Investimento", description: "Investimento imobiliário e gestão de património." },
  { slug: "fiscalidade", title: "Fiscalidade", description: "IMT, imposto do selo, IRS e benefícios fiscais ligados à habitação." },
  { slug: "mercado-imobiliario", title: "Mercado Imobiliário", description: "Tendências, preços e análises do mercado imobiliário em Portugal." },
  { slug: "banco-de-portugal", title: "Banco de Portugal", description: "Regras, supervisão e regulação do mercado de crédito em Portugal." },
  { slug: "dicas-financeiras", title: "Dicas Financeiras", description: "Conselhos práticos para gerir melhor as suas finanças pessoais." },
];

export function getCategoryBySlug(slug: string) {
  return blogCategories.find((c) => c.slug === slug);
}
