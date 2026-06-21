export type ImtJovemMode = "nenhum" | "total" | "parcial";

/**
 * IMT — Portugal Continental, Habitação Própria Permanente (HPP).
 * Tabela simplificada com base nos escalões em vigor; valores meramente indicativos.
 */
export function calcularIMTContinentalHPP(price: number): number {
  if (!price || price <= 0 || isNaN(price)) return 0;

  if (price <= 106346) return 0;
  if (price <= 145470) return price * 0.02 - 2126.92;
  if (price <= 198347) return price * 0.05 - 6491.02;
  if (price <= 330539) return price * 0.07 - 10457.96;
  if (price <= 660982) return price * 0.08 - 13763.35;
  if (price <= 1150853) return price * 0.06;
  return price * 0.075;
}

/**
 * IMT — Portugal Continental, Habitação Secundária / Arrendamento.
 * Tabela simplificada (sem isenção no 1.º escalão).
 */
export function calcularIMTContinentalSecundaria(price: number): number {
  if (!price || price <= 0 || isNaN(price)) return 0;

  if (price <= 106346) return price * 0.01;
  if (price <= 145470) return price * 0.02 - 1063.46;
  if (price <= 198347) return price * 0.05 - 5427.56;
  if (price <= 330539) return price * 0.07 - 9394.5;
  if (price <= 660982) return price * 0.08 - 12699.89;
  if (price <= 1150853) return price * 0.06;
  return price * 0.075;
}

export const IMT_JOVEM_LIMITE_ISENCAO_TOTAL = 330539;
export const IMT_JOVEM_LIMITE_BENEFICIO_PARCIAL = 660982;
export const IMT_JOVEM_IDADE_MAXIMA = 35;

/**
 * Valor do imóvel considerado isento no âmbito do IMT Jovem: isenção total até ao
 * 1.º limite; entre os dois limites, a isenção cobre apenas essa fração e o
 * excedente é tributado normalmente; sem benefício a partir do 2.º limite. Em modo
 * "parcial" (apenas um titular elegível), a fração isenta é reduzida a metade.
 */
function valorIsentoImtJovem(price: number, mode: ImtJovemMode): number {
  if (mode === "nenhum" || !price || price <= 0) return 0;
  const isento = price <= IMT_JOVEM_LIMITE_BENEFICIO_PARCIAL ? Math.min(price, IMT_JOVEM_LIMITE_ISENCAO_TOTAL) : 0;
  return mode === "parcial" ? isento / 2 : isento;
}

/**
 * Aplica o benefício IMT Jovem ao IMT base, recorrendo à mesma fórmula (HPP ou
 * secundária) para calcular o imposto correspondente à fração isenta, já que as
 * fórmulas por escalão são progressivas e contínuas nos limiares.
 */
export function aplicarImtJovem(
  price: number,
  imtBase: number,
  mode: ImtJovemMode,
  calcularImt: (price: number) => number
): { imtFinal: number; percentagemBeneficio: number } {
  const isento = valorIsentoImtJovem(price, mode);
  const beneficio = isento > 0 ? calcularImt(isento) : 0;
  const imtFinal = Math.max(0, imtBase - beneficio);
  const percentagemBeneficio = imtBase > 0 ? (beneficio / imtBase) * 100 : 0;
  return { imtFinal, percentagemBeneficio };
}

/** Benefício equivalente do IMT Jovem sobre o Imposto de Selo da compra (taxa fixa de 0,8%). */
export function calcularBeneficioSeloCompra(price: number, mode: ImtJovemMode): number {
  return valorIsentoImtJovem(price, mode) * 0.008;
}
