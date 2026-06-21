/** Fração da mais-valia sujeita a englobamento e tributação em IRS (residentes). */
export const PERCENTAGEM_TRIBUTAVEL_RESIDENTES = 0.5;

export interface MaisValiasInput {
  valorVenda: number;
  valorAquisicao: number;
  coeficiente: number;
  despesas: number;
  reinvestir: boolean;
  valorReinvestido: number;
  taxaIrsEstimada: number;
}

export interface MaisValiasResult {
  maisValia: number;
  maisValiaTributavel: number;
  fracaoIsentaReinvestimento: number;
  maisValiaTributavelFinal: number;
  impostoEstimado: number;
}

export function calcularMaisValias(input: MaisValiasInput): MaisValiasResult {
  const { valorVenda, valorAquisicao, coeficiente, despesas, reinvestir, valorReinvestido, taxaIrsEstimada } = input;

  const valorAquisicaoCorrigido = valorAquisicao * coeficiente;
  const maisValia = Math.max(0, valorVenda - valorAquisicaoCorrigido - despesas);
  const maisValiaTributavel = maisValia * PERCENTAGEM_TRIBUTAVEL_RESIDENTES;

  const fracaoIsentaReinvestimento =
    reinvestir && valorVenda > 0 ? Math.min(1, Math.max(0, valorReinvestido / valorVenda)) : 0;

  const maisValiaTributavelFinal = maisValiaTributavel * (1 - fracaoIsentaReinvestimento);
  const impostoEstimado = maisValiaTributavelFinal * (taxaIrsEstimada / 100);

  return {
    maisValia,
    maisValiaTributavel,
    fracaoIsentaReinvestimento,
    maisValiaTributavelFinal,
    impostoEstimado,
  };
}
