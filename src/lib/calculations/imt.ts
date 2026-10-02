export type ImtJovemMode = "nenhum" | "total" | "parcial";
export type ImtRegion = "continental" | "autonoma";

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

/**
 * IMT — Regiões Autónomas (Açores/Madeira), Habitação Própria Permanente (HPP).
 * Por decreto legislativo regional, os escalões são 25% mais largos do que no
 * Continente (mesmas taxas marginais, limiares superiores).
 */
export function calcularIMTRegiaoAutonomaHPP(price: number): number {
  if (!price || price <= 0 || isNaN(price)) return 0;

  if (price <= 132933) return 0;
  if (price <= 181838) return price * 0.02 - 2658.66;
  if (price <= 247934) return price * 0.05 - 8113.8;
  if (price <= 413174) return price * 0.07 - 13072.48;
  if (price <= 826228) return price * 0.08 - 17204.22;
  if (price <= 1438566) return price * 0.06;
  return price * 0.075;
}

/**
 * IMT — Regiões Autónomas (Açores/Madeira), Habitação Secundária / Arrendamento.
 */
export function calcularIMTRegiaoAutonomaSecundaria(price: number): number {
  if (!price || price <= 0 || isNaN(price)) return 0;

  if (price <= 132933) return price * 0.01;
  if (price <= 181838) return price * 0.02 - 1329.33;
  if (price <= 247934) return price * 0.05 - 6784.47;
  if (price <= 413174) return price * 0.07 - 11743.15;
  if (price <= 792414) return price * 0.08 - 15874.89;
  if (price <= 1438566) return price * 0.06;
  return price * 0.075;
}

/** Devolve a função de cálculo de IMT correta consoante região e finalidade. */
export function getCalculadoraIMT(region: ImtRegion, purpose: "hpp" | "secundaria"): (price: number) => number {
  if (region === "autonoma") {
    return purpose === "hpp" ? calcularIMTRegiaoAutonomaHPP : calcularIMTRegiaoAutonomaSecundaria;
  }
  return purpose === "hpp" ? calcularIMTContinentalHPP : calcularIMTContinentalSecundaria;
}

export const IMT_JOVEM_LIMITE_ISENCAO_TOTAL_CONTINENTAL = 330539;
export const IMT_JOVEM_LIMITE_BENEFICIO_PARCIAL_CONTINENTAL = 660982;
export const IMT_JOVEM_LIMITE_ISENCAO_TOTAL_AUTONOMA = 413174;
export const IMT_JOVEM_LIMITE_BENEFICIO_PARCIAL_AUTONOMA = 826228;

// Mantidos por compatibilidade com código existente (equivalem aos limites continentais).
export const IMT_JOVEM_LIMITE_ISENCAO_TOTAL = IMT_JOVEM_LIMITE_ISENCAO_TOTAL_CONTINENTAL;
export const IMT_JOVEM_LIMITE_BENEFICIO_PARCIAL = IMT_JOVEM_LIMITE_BENEFICIO_PARCIAL_CONTINENTAL;
export const IMT_JOVEM_IDADE_MAXIMA = 35;

function limitesImtJovem(region: ImtRegion): { isencaoTotal: number; beneficioParcial: number } {
  return region === "autonoma"
    ? { isencaoTotal: IMT_JOVEM_LIMITE_ISENCAO_TOTAL_AUTONOMA, beneficioParcial: IMT_JOVEM_LIMITE_BENEFICIO_PARCIAL_AUTONOMA }
    : { isencaoTotal: IMT_JOVEM_LIMITE_ISENCAO_TOTAL_CONTINENTAL, beneficioParcial: IMT_JOVEM_LIMITE_BENEFICIO_PARCIAL_CONTINENTAL };
}

/**
 * Valor do imóvel considerado isento no âmbito do IMT Jovem: isenção total até ao
 * 1.º limite; entre os dois limites, a isenção cobre apenas essa fração e o
 * excedente é tributado normalmente; sem benefício a partir do 2.º limite. Em modo
 * "parcial" (apenas um titular elegível), a fração isenta é reduzida a metade.
 */
function valorIsentoImtJovem(price: number, mode: ImtJovemMode, region: ImtRegion = "continental"): number {
  if (mode === "nenhum" || !price || price <= 0) return 0;
  const { isencaoTotal, beneficioParcial } = limitesImtJovem(region);
  const isento = price <= beneficioParcial ? Math.min(price, isencaoTotal) : 0;
  return mode === "parcial" ? isento / 2 : isento;
}

/**
 * Aplica o benefício IMT Jovem ao IMT base, recorrendo à mesma fórmula (HPP ou
 * secundária, Continente ou Região Autónoma) para calcular o imposto correspondente
 * à fração isenta, já que as fórmulas por escalão são progressivas e contínuas nos
 * limiares.
 */
export function aplicarImtJovem(
  price: number,
  imtBase: number,
  mode: ImtJovemMode,
  calcularImt: (price: number) => number,
  region: ImtRegion = "continental"
): { imtFinal: number; percentagemBeneficio: number } {
  const isento = valorIsentoImtJovem(price, mode, region);
  const beneficio = isento > 0 ? calcularImt(isento) : 0;
  const imtFinal = Math.max(0, imtBase - beneficio);
  const percentagemBeneficio = imtBase > 0 ? (beneficio / imtBase) * 100 : 0;
  return { imtFinal, percentagemBeneficio };
}

/** Benefício equivalente do IMT Jovem sobre o Imposto de Selo da compra (taxa fixa de 0,8%, igual em todo o país). */
export function calcularBeneficioSeloCompra(price: number, mode: ImtJovemMode, region: ImtRegion = "continental"): number {
  return valorIsentoImtJovem(price, mode, region) * 0.008;
}
