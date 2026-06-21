export type TipoPredio = "urbano" | "rustico";

export const IMI_TAXA_URBANO_MIN = 0.3;
export const IMI_TAXA_URBANO_MAX = 0.45;
export const IMI_TAXA_RUSTICO = 0.8;

/** Dedução fixa do "IMI Familiar" por agregado, segundo o art. 112.º-A do Código do IMI. */
export function deducaoImiFamiliar(numDependentes: number): number {
  if (numDependentes <= 0) return 0;
  if (numDependentes === 1) return 30;
  if (numDependentes === 2) return 70;
  return 140;
}

export interface PrestacaoIMI {
  mes: string;
  valor: number;
}

export interface ImiResult {
  imiBase: number;
  deducao: number;
  imiAnual: number;
  imiMensal: number;
  prestacoes: PrestacaoIMI[];
}

/** Plano de pagamento por escalões do valor final de IMI (Despacho 000-A/2019 n.º 2 d)). */
export function calcularPrestacoesIMI(imiAnual: number): PrestacaoIMI[] {
  if (imiAnual <= 0) return [];
  if (imiAnual <= 100) {
    return [{ mes: "Maio", valor: imiAnual }];
  }
  if (imiAnual <= 500) {
    const valor = imiAnual / 2;
    return [
      { mes: "Maio", valor },
      { mes: "Novembro", valor },
    ];
  }
  const valor = imiAnual / 3;
  return [
    { mes: "Maio", valor },
    { mes: "Agosto", valor },
    { mes: "Novembro", valor },
  ];
}

export function calcularIMI(vpt: number, taxaPercent: number, numDependentes: number, imiFamiliarAplicavel: boolean): ImiResult {
  if (!vpt || vpt <= 0 || isNaN(vpt) || isNaN(taxaPercent)) {
    return { imiBase: 0, deducao: 0, imiAnual: 0, imiMensal: 0, prestacoes: [] };
  }
  const imiBase = vpt * (taxaPercent / 100);
  const deducao = imiFamiliarAplicavel ? deducaoImiFamiliar(numDependentes) : 0;
  const imiAnual = Math.max(0, imiBase - deducao);
  return { imiBase, deducao, imiAnual, imiMensal: imiAnual / 12, prestacoes: calcularPrestacoesIMI(imiAnual) };
}
