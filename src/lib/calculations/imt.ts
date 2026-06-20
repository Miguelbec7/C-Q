export type ImtJovemMode = "nenhum" | "total" | "parcial";

/**
 * IMT — Portugal Continental, Habitação Própria Permanente (HPP).
 * Tabela simplificada com base nos escalões em vigor; valores meramente indicativos.
 */
export function calcularIMTContinentalHPP(price: number): number {
  if (!price || price <= 0 || isNaN(price)) return 0;

  if (price <= 101917) return 0;
  if (price <= 139412) return price * 0.02 - 2038.34;
  if (price <= 190086) return price * 0.05 - 6220.7;
  if (price <= 316772) return price * 0.07 - 10022.42;
  if (price <= 633453) return price * 0.08 - 13190.14;
  if (price <= 1102920) return price * 0.06;
  return price * 0.075;
}

/**
 * IMT — Portugal Continental, Habitação Secundária / Arrendamento.
 * Tabela simplificada (sem isenção no 1.º escalão).
 */
export function calcularIMTContinentalSecundaria(price: number): number {
  if (!price || price <= 0 || isNaN(price)) return 0;

  if (price <= 101917) return price * 0.01;
  if (price <= 139412) return price * 0.02 - 1019.17;
  if (price <= 190086) return price * 0.05 - 5201.53;
  if (price <= 316772) return price * 0.07 - 9003.25;
  if (price <= 633453) return price * 0.08 - 12170.97;
  if (price <= 1102920) return price * 0.06;
  return price * 0.075;
}

export function aplicarImtJovem(
  imtBase: number,
  mode: ImtJovemMode
): { imtFinal: number; percentagemBeneficio: number } {
  if (mode === "total") return { imtFinal: 0, percentagemBeneficio: 100 };
  if (mode === "parcial") return { imtFinal: imtBase * 0.5, percentagemBeneficio: 50 };
  return { imtFinal: imtBase, percentagemBeneficio: 0 };
}

export const IMT_JOVEM_LIMITE_ISENCAO_TOTAL = 316772;
export const IMT_JOVEM_LIMITE_BENEFICIO_PARCIAL = 633453;
export const IMT_JOVEM_IDADE_MAXIMA = 35;
