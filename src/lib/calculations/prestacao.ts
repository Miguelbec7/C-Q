export interface PrestacaoResult {
  payment: number;
  totalPaid: number;
  totalInterest: number;
}

/** Calcula a prestação mensal (sistema de prestações constantes) e os juros totais. */
export function calcularPrestacao(
  principal: number,
  annualRatePercent: number,
  months: number
): PrestacaoResult {
  const monthlyRate = annualRatePercent / 100 / 12;
  let payment: number;

  if (monthlyRate === 0) {
    payment = principal / months;
  } else {
    const factor = Math.pow(1 + monthlyRate, months);
    payment = (principal * monthlyRate * factor) / (factor - 1);
  }

  const totalPaid = payment * months;
  const totalInterest = totalPaid - principal;

  return { payment, totalPaid, totalInterest };
}

/** Calcula o montante máximo financiável dada uma prestação disponível. */
export function calcularMontanteMaximo(
  maxPayment: number,
  annualRatePercent: number,
  months: number
): number {
  const monthlyRate = annualRatePercent / 100 / 12;
  if (monthlyRate === 0) return maxPayment * months;
  const factor = Math.pow(1 + monthlyRate, months);
  return (maxPayment * (factor - 1)) / (monthlyRate * factor);
}
