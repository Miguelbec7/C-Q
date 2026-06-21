/**
 * Tabela I de retenção na fonte (Continente, 2026) — trabalho dependente,
 * não casado ou casado com dois titulares. Os dois primeiros escalões acima
 * da isenção usam uma "zona de transição" em que a parcela a abater é uma
 * função do próprio rendimento (R), para suavizar a passagem da isenção
 * total para a tributação normal.
 */
interface Bracket {
  limite: number;
  taxa: number;
  parcela: (r: number) => number;
}

const PARCELA_ADICIONAL_POR_DEPENDENTE = 21.43;

const BRACKETS: Bracket[] = [
  { limite: 920, taxa: 0, parcela: () => 0 },
  { limite: 1042, taxa: 0.125, parcela: (r) => 0.125 * 2.6 * (1273.85 - r) },
  { limite: 1108, taxa: 0.157, parcela: (r) => 0.157 * 1.35 * (1554.83 - r) },
  { limite: 1154, taxa: 0.157, parcela: () => 94.71 },
  { limite: 1212, taxa: 0.212, parcela: () => 158.18 },
  { limite: 1819, taxa: 0.241, parcela: () => 193.33 },
  { limite: 2119, taxa: 0.311, parcela: () => 320.66 },
  { limite: 2499, taxa: 0.349, parcela: () => 401.19 },
  { limite: 3305, taxa: 0.3836, parcela: () => 487.66 },
  { limite: 5547, taxa: 0.3969, parcela: () => 531.62 },
  { limite: 20221, taxa: 0.4495, parcela: () => 823.4 },
  { limite: Infinity, taxa: 0.4717, parcela: () => 1272.31 },
];

export function calcularRetencaoIRS(rendimentoMensal: number, numDependentes: number): number {
  if (!rendimentoMensal || rendimentoMensal <= 0) return 0;
  const bracket = BRACKETS.find((b) => rendimentoMensal <= b.limite) ?? BRACKETS[BRACKETS.length - 1];
  const retencao =
    rendimentoMensal * bracket.taxa - bracket.parcela(rendimentoMensal) - PARCELA_ADICIONAL_POR_DEPENDENTE * numDependentes;
  return Math.max(0, retencao);
}

export const TAXA_SEGURANCA_SOCIAL = 0.11;

export type SubsidioAlimentacaoTipo = "cartao" | "dinheiro";

const TETO_ISENCAO_SUBSIDIO: Record<SubsidioAlimentacaoTipo, number> = {
  cartao: 10.455,
  dinheiro: 6.15,
};

export interface SalarioLiquidoInput {
  salarioBase: number;
  numDependentes: number;
  subsidioDiario: number;
  diasUteis: number;
  tipoSubsidio: SubsidioAlimentacaoTipo;
}

export interface SalarioLiquidoResult {
  salarioBrutoTotal: number;
  segurancaSocial: number;
  retencaoIRS: number;
  subsidioMensal: number;
  salarioLiquido: number;
}

export function calcularSalarioLiquido(input: SalarioLiquidoInput): SalarioLiquidoResult {
  const { salarioBase, numDependentes, subsidioDiario, diasUteis, tipoSubsidio } = input;

  const teto = TETO_ISENCAO_SUBSIDIO[tipoSubsidio];
  const subsidioMensal = subsidioDiario * diasUteis;
  const excessoDiario = Math.max(0, subsidioDiario - teto);
  const excessoMensal = excessoDiario * diasUteis;
  const subsidioIsento = subsidioMensal - excessoMensal;

  const baseTributavel = salarioBase + excessoMensal;
  const segurancaSocial = baseTributavel * TAXA_SEGURANCA_SOCIAL;
  const retencaoIRS = calcularRetencaoIRS(baseTributavel, numDependentes);

  const liquidoBase = baseTributavel - segurancaSocial - retencaoIRS;
  const salarioLiquido = liquidoBase + subsidioIsento;

  return {
    salarioBrutoTotal: salarioBase + subsidioMensal,
    segurancaSocial,
    retencaoIRS,
    subsidioMensal,
    salarioLiquido,
  };
}
