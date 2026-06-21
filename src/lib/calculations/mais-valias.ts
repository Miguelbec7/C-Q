/** Fração da mais-valia sujeita a englobamento e tributação em IRS (residentes). */
export const PERCENTAGEM_TRIBUTAVEL_RESIDENTES = 0.5;

export type SituacaoImovel = "hpp_12_mais" | "hpp_menos_12" | "segunda_arrendamento" | "segunda_sem_reinvestir";

/**
 * Coeficientes de desvalorização da moeda por ano de aquisição, conforme a Portaria
 * n.º 382/2025/1 (alienações em 2025 — a mais recente publicada). Para alienações em
 * 2026 a Portaria equivalente ainda não tinha sido publicada à data desta versão;
 * tabela resumida aos anos mais relevantes — para anos não listados, o valor exato
 * deve ser confirmado na Portaria oficial e inserido manualmente.
 */
export const COEFICIENTES_DESVALORIZACAO: Record<number, number> = {
  1980: 12.68,
  1985: 4.48,
  1990: 2.69,
  1995: 1.84,
  2000: 1.67,
  2005: 1.4,
  2010: 1.28,
  2015: 1.2,
  2016: 1.19,
  2017: 1.18,
  2018: 1.17,
  2019: 1.17,
  2020: 1.17,
  2021: 1.16,
  2022: 1.06,
  2023: 1.02,
  2024: 1.0,
};

/**
 * Sugere o coeficiente a aplicar. Devolve `1` sem necessidade de tabela quando
 * faltam menos de 24 meses entre aquisição e venda (art. 50º do CIRS dispensa
 * correção monetária nesse caso). Devolve `null` quando o ano de aquisição não
 * consta da tabela resumida acima, sinalizando que o valor deve ser confirmado
 * e inserido manualmente.
 */
export function getCoeficienteSugerido(anoAquisicao: number, anoVenda: number): number | null {
  if (anoVenda - anoAquisicao < 2) return 1;
  return COEFICIENTES_DESVALORIZACAO[anoAquisicao] ?? null;
}

interface EscalaoIrs {
  limite: number;
  taxa: number;
  parcela: number;
}

/** Tabela do art. 68º do CIRS — escalões gerais de IRS 2026 (taxa normal e parcela a abater). */
export const ESCALOES_IRS_2026: EscalaoIrs[] = [
  { limite: 8342, taxa: 0.125, parcela: 0 },
  { limite: 12587, taxa: 0.157, parcela: 268.52 },
  { limite: 17838, taxa: 0.212, parcela: 894.6 },
  { limite: 23089, taxa: 0.241, parcela: 1271.41 },
  { limite: 29397, taxa: 0.311, parcela: 2908.84 },
  { limite: 43090, taxa: 0.349, parcela: 4159.68 },
  { limite: 46566, taxa: 0.431, parcela: 7822.39 },
  { limite: 86634, taxa: 0.446, parcela: 8503.03 },
  { limite: Infinity, taxa: 0.48, parcela: 11000 },
];

/**
 * Coleta de IRS sobre um rendimento coletável, aplicando o quociente conjugal
 * (art. 69º do CIRS) quando há declaração conjunta: divide o rendimento por 2,
 * aplica o escalão correspondente e duplica o resultado.
 */
export function calcularColeta(rendimentoColetavel: number, declaracaoConjunta: boolean): number {
  if (!rendimentoColetavel || rendimentoColetavel <= 0) return 0;
  const base = declaracaoConjunta ? rendimentoColetavel / 2 : rendimentoColetavel;
  const escalao = ESCALOES_IRS_2026.find((e) => base <= e.limite) ?? ESCALOES_IRS_2026[ESCALOES_IRS_2026.length - 1];
  const coletaBase = base * escalao.taxa - escalao.parcela;
  const coleta = declaracaoConjunta ? coletaBase * 2 : coletaBase;
  return Math.max(0, coleta);
}

export interface MaisValiasInput {
  valorAquisicao: number;
  valorVenda: number;
  coeficiente: number;
  despesas: number;
  vendaParaEntidadePublica: boolean;
  situacaoImovel: SituacaoImovel;
  reinvestir: boolean;
  valorReinvestido: number;
  amortizarCredito: boolean;
  valorAmortizado: number;
  apoioEstadoSuperiorA30: boolean;
  valorApoioEstado: number;
  vptImovelAlienado: number;
  declaracaoConjunta: boolean;
  rendimentoColetavelSemMaisValia: number;
}

export interface MaisValiasResult {
  maisValia: number;
  maisValiaTributavel: number;
  isentoTotal: boolean;
  elegivelReinvestimento: boolean;
  valorAReinvestir: number;
  fracaoIsenta: number;
  maisValiaTributavelFinal: number;
  rendimentoColetavelComMaisValia: number;
  coletaSemMaisValia: number;
  coletaComMaisValia: number;
  impostoEstimado: number;
}

export function calcularMaisValias(input: MaisValiasInput): MaisValiasResult {
  const {
    valorAquisicao,
    valorVenda,
    coeficiente,
    despesas,
    vendaParaEntidadePublica,
    situacaoImovel,
    reinvestir,
    valorReinvestido,
    amortizarCredito,
    valorAmortizado,
    apoioEstadoSuperiorA30,
    valorApoioEstado,
    vptImovelAlienado,
    declaracaoConjunta,
    rendimentoColetavelSemMaisValia,
  } = input;

  const valorAquisicaoCorrigido = valorAquisicao * coeficiente;
  const maisValia = Math.max(0, valorVenda - valorAquisicaoCorrigido - despesas);
  const maisValiaTributavel = maisValia * PERCENTAGEM_TRIBUTAVEL_RESIDENTES;

  const isentoTotal = vendaParaEntidadePublica;
  // Isenção por reinvestimento só está prevista para HPP há pelo menos 12 meses (art. 10º, n.º 5 CIRS);
  // não há isenção deste tipo para segunda habitação.
  const elegivelReinvestimento = !isentoTotal && situacaoImovel === "hpp_12_mais" && reinvestir;

  // O valor a reinvestir é o valor de realização líquido da amortização do empréstimo
  // contraído para o imóvel vendido (art. 10º, n.º 5, al. a) CIRS).
  const valorAReinvestir = Math.max(0, valorVenda - (amortizarCredito ? valorAmortizado : 0));

  let fracaoIsenta = 0;
  if (elegivelReinvestimento && valorAReinvestir > 0) {
    fracaoIsenta = Math.min(1, Math.max(0, valorReinvestido / valorAReinvestir));
    if (apoioEstadoSuperiorA30 && vptImovelAlienado > 0) {
      // art. 10º, n.º 7 CIRS: a parte financiada por apoio público não reembolsável
      // superior a 30% do VPT não pode beneficiar da isenção por reinvestimento.
      const fracaoReinvestivel = Math.max(0, 1 - valorApoioEstado / vptImovelAlienado);
      fracaoIsenta = Math.min(fracaoIsenta, fracaoReinvestivel);
    }
  }

  const maisValiaTributavelFinal = isentoTotal ? 0 : maisValiaTributavel * (1 - fracaoIsenta);

  const rendimentoColetavelComMaisValia = rendimentoColetavelSemMaisValia + maisValiaTributavelFinal;
  const coletaSemMaisValia = calcularColeta(rendimentoColetavelSemMaisValia, declaracaoConjunta);
  const coletaComMaisValia = calcularColeta(rendimentoColetavelComMaisValia, declaracaoConjunta);
  const impostoEstimado = isentoTotal ? 0 : Math.max(0, coletaComMaisValia - coletaSemMaisValia);

  return {
    maisValia,
    maisValiaTributavel,
    isentoTotal,
    elegivelReinvestimento,
    valorAReinvestir,
    fracaoIsenta,
    maisValiaTributavelFinal,
    rendimentoColetavelComMaisValia,
    coletaSemMaisValia,
    coletaComMaisValia,
    impostoEstimado,
  };
}
