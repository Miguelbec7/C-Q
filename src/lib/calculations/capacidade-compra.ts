import { calcularIMTContinentalHPP, type ImtJovemMode, aplicarImtJovem, calcularBeneficioSeloCompra } from "./imt";
import { calcularImpostoSeloCompra, calcularImpostoSeloCredito } from "./imposto-selo";

export interface CustosBreakdown {
  custosTotais: number;
  commissionAval: number;
  commissionFormal: number;
  direitoPref: number;
  copiaContrato: number;
  dpa: number;
  seloCredito: number;
  imtFinal: number;
  seloCompra: number;
}

export interface CenarioCompraResult {
  housePrice: number;
  loan: number;
  payment: number;
  entry: number;
  costs: number;
  capitalNeeded: number;
  shortage: number;
  effortPercent: number;
  costBreakdown: CustosBreakdown;
}

function calcularCustos(price: number, loan: number, months: number, imtMode: ImtJovemMode): CustosBreakdown {
  const commissionAval = 250;
  const commissionFormal = 750;
  const direitoPref = 15;
  const copiaContrato = 43;
  const dpa = 20;

  const seloCredito = calcularImpostoSeloCredito(loan, months);
  const imtBase = calcularIMTContinentalHPP(price);
  const { imtFinal } = aplicarImtJovem(price, imtBase, imtMode, calcularIMTContinentalHPP);
  const seloCompraTotal = calcularImpostoSeloCompra(price);
  const seloCompra = Math.max(0, seloCompraTotal - calcularBeneficioSeloCompra(price, imtMode));

  const custosTotais =
    commissionAval + commissionFormal + direitoPref + copiaContrato + dpa + seloCredito + imtFinal + seloCompra;

  return {
    custosTotais,
    commissionAval,
    commissionFormal,
    direitoPref,
    copiaContrato,
    dpa,
    seloCredito,
    imtFinal,
    seloCompra,
  };
}

/**
 * Resolve, por bissecção, o valor de imóvel mais alto que o capital disponível
 * consegue suportar dado um financiamento máximo e um LTV máximo.
 */
export function resolverCenarioCompra(
  maxLoan: number,
  capital: number,
  ltvMax: number,
  rate: number,
  months: number,
  netIncome: number,
  otherLoans: number,
  imtMode: ImtJovemMode
): CenarioCompraResult {
  function isFeasible(price: number): boolean {
    if (price <= 0) return false;
    const loan = Math.min(maxLoan, ltvMax * price);
    if (loan <= 0) return false;
    const costData = calcularCustos(price, loan, months, imtMode);
    const entry = Math.max(0, price - loan);
    const capitalNeeded = entry + costData.custosTotais;
    return capital >= capitalNeeded;
  }

  let low = 0;
  let high = (maxLoan + capital) * 3;
  for (let i = 0; i < 50; i++) {
    const mid = (low + high) / 2;
    if (isFeasible(mid)) low = mid;
    else high = mid;
  }

  const housePrice = low;
  let loan = Math.min(maxLoan, ltvMax * housePrice);
  if (!isFinite(loan) || loan < 0) loan = 0;

  const costData = calcularCustos(housePrice, loan, months, imtMode);
  const costs = costData.custosTotais;
  const entry = Math.max(0, housePrice - loan);
  const capitalNeeded = entry + costs;
  const shortage = Math.max(0, capitalNeeded - capital);

  const monthlyRate = rate / 100 / 12;
  let payment: number;
  if (monthlyRate === 0) {
    payment = months > 0 ? loan / months : 0;
  } else {
    const factor = Math.pow(1 + monthlyRate, months);
    payment = (loan * monthlyRate * factor) / (factor - 1);
  }

  const effortPercent = netIncome > 0 ? ((otherLoans + payment) / netIncome) * 100 : 0;

  return { housePrice, loan, payment, entry, costs, capitalNeeded, shortage, effortPercent, costBreakdown: costData };
}

export function calcularPrazoMaximo(age: number): number {
  let baseYears: number;
  if (age < 30) baseYears = 40;
  else if (age <= 35) baseYears = 37;
  else baseYears = 35;

  return Math.max(5, Math.min(baseYears, 75 - age));
}

export function elegivelGarantiaPublica(
  purpose: string,
  age: number,
  annualIncome: number,
  housePrice: number
): boolean {
  return (
    purpose === "hpp" &&
    age >= 18 &&
    age <= 35 &&
    annualIncome <= 81199 &&
    housePrice <= 450000
  );
}
