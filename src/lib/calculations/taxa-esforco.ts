export interface TaxaEsforcoResult {
  effortPercent: number;
  level: "saudavel" | "elevada" | "preocupante";
  label: string;
  message: string;
}

export function calcularTaxaEsforco(
  netIncome: number,
  otherLoans: number,
  newPayment: number
): TaxaEsforcoResult {
  const effortPercent = netIncome > 0 ? ((otherLoans + newPayment) / netIncome) * 100 : 0;

  if (effortPercent >= 45) {
    return {
      effortPercent,
      level: "preocupante",
      label: "Taxa de esforço preocupante",
      message:
        "A taxa de esforço é elevada. Qualquer imprevisto pode impactar a capacidade de cumprir a prestação. Recomendamos uma análise detalhada com a C&Q antes de avançar.",
    };
  }

  if (effortPercent >= 35) {
    return {
      effortPercent,
      level: "elevada",
      label: "Taxa de esforço elevada",
      message:
        "A taxa de esforço encontra-se num nível mais exigente. É importante avaliar a margem financeira e a estabilidade dos rendimentos.",
    };
  }

  return {
    effortPercent,
    level: "saudavel",
    label: "Taxa de esforço saudável",
    message:
      "A relação entre rendimentos e encargos mensais mantém-se globalmente equilibrada.",
  };
}
