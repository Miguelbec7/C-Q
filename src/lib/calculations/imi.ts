export type TipoPredio = "urbano" | "rustico";

export const IMI_TAXA_URBANO_MIN = 0.3;
export const IMI_TAXA_URBANO_MAX = 0.45;
export const IMI_TAXA_RUSTICO = 0.8;

/** Dedução fixa do "IMI Familiar" por dependente a cargo, em municípios que tenham aderido ao regime. */
export function deducaoImiFamiliar(numDependentes: number): number {
  if (numDependentes <= 0) return 0;
  if (numDependentes === 1) return 20;
  if (numDependentes === 2) return 40;
  return 70;
}

export interface ImiResult {
  imiBase: number;
  deducao: number;
  imiAnual: number;
  imiMensal: number;
}

export function calcularIMI(vpt: number, taxaPercent: number, numDependentes: number, imiFamiliarAplicavel: boolean): ImiResult {
  if (!vpt || vpt <= 0 || isNaN(vpt) || isNaN(taxaPercent)) {
    return { imiBase: 0, deducao: 0, imiAnual: 0, imiMensal: 0 };
  }
  const imiBase = vpt * (taxaPercent / 100);
  const deducao = imiFamiliarAplicavel ? deducaoImiFamiliar(numDependentes) : 0;
  const imiAnual = Math.max(0, imiBase - deducao);
  return { imiBase, deducao, imiAnual, imiMensal: imiAnual / 12 };
}
