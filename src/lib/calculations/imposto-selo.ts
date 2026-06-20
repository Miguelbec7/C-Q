/** Imposto de selo sobre a aquisição de imóveis — 0,8% sobre o valor de compra. */
export function calcularImpostoSeloCompra(price: number): number {
  if (!price || price <= 0) return 0;
  return price * 0.008;
}

/**
 * Imposto de selo sobre o crédito — varia com o prazo do contrato:
 * 0,6% para prazo igual ou superior a 5 anos, 0,5% para prazo inferior.
 */
export function calcularImpostoSeloCredito(loan: number, months: number): number {
  if (!loan || loan <= 0) return 0;
  const rate = months >= 60 ? 0.006 : 0.005;
  return loan * rate;
}
