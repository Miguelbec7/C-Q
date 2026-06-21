"use client";

import { useState } from "react";
import { NumberField, SelectField, ResultStat, HelpTooltip } from "@/components/simulators/SimulatorShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatCurrency, formatPercent } from "@/lib/utils";
import {
  resolverCenarioCompra,
  calcularPrazoMaximo,
  elegivelGarantiaPublica,
} from "@/lib/calculations/capacidade-compra";
import { calcularMontanteMaximo } from "@/lib/calculations/prestacao";
import type { ImtJovemMode } from "@/lib/calculations/imt";
import { siteConfig } from "@/lib/site-config";

const RATE_BY_TYPE: Record<string, string> = { fixa: "4.10", mista: "2.85", variavel: "2.86" };

export function CreditoHabitacaoSimulator() {
  const [netIncome, setNetIncome] = useState("1500");
  const [otherLoans, setOtherLoans] = useState("0");
  const [age, setAge] = useState("30");
  const [capital, setCapital] = useState("20000");
  const [purpose, setPurpose] = useState("hpp");
  const [rateType, setRateType] = useState("mista");
  const [rate, setRate] = useState("2.85");
  const [maxEffort, setMaxEffort] = useState("35");
  const [numTitulares, setNumTitulares] = useState("1");
  const [imtMode, setImtMode] = useState<ImtJovemMode>("nenhum");
  const [gpConfirm, setGpConfirm] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof resolverCenarioCompra> | null>(null);
  const [guaranteeApplied, setGuaranteeApplied] = useState(false);

  function handleCalculate() {
    const income = parseFloat(netIncome.replace(",", "."));
    const other = parseFloat(otherLoans.replace(",", ".")) || 0;
    const ageNum = parseInt(age, 10);
    const cap = parseFloat(capital.replace(",", ".")) || 0;
    const rateNum = parseFloat(rate.replace(",", "."));
    const effort = parseFloat(maxEffort);

    if (isNaN(income) || isNaN(ageNum) || isNaN(rateNum) || isNaN(effort)) return;

    const maxHousingEffort = income * (effort / 100) - other;
    if (maxHousingEffort <= 0) {
      setResult(null);
      return;
    }

    const maxYears = calcularPrazoMaximo(ageNum);
    const months = maxYears * 12;
    const maxLoan = calcularMontanteMaximo(maxHousingEffort, rateNum, months);

    const baseLTV = purpose === "hpp" ? 0.9 : 0.8;
    const baseScenario = resolverCenarioCompra(maxLoan, cap, baseLTV, rateNum, months, income, other, imtMode);

    const annualIncome = income * 14;
    const guaranteeBaseOk = elegivelGarantiaPublica(purpose, ageNum, annualIncome, baseScenario.housePrice);
    const applied = guaranteeBaseOk && gpConfirm;
    setGuaranteeApplied(applied);

    const finalScenario = applied
      ? resolverCenarioCompra(maxLoan, cap, Math.min(1, baseLTV + 0.15), rateNum, months, income, other, imtMode)
      : baseScenario;

    setResult(finalScenario);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <h2 className="text-lg font-semibold text-navy-950">Os seus dados</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <NumberField label="Rendimento líquido mensal do agregado" value={netIncome} onChange={setNetIncome} suffix="€" />
          <NumberField label="Prestações de outros créditos" value={otherLoans} onChange={setOtherLoans} suffix="€" />
          <NumberField label="Idade do titular mais velho" value={age} onChange={setAge} suffix="anos" />
          <SelectField
            label="Número de titulares"
            value={numTitulares}
            onChange={(v) => {
              setNumTitulares(v);
              if (v === "1" && imtMode === "parcial") setImtMode("nenhum");
            }}
            options={[
              { value: "1", label: "1 titular" },
              { value: "2", label: "2 titulares" },
            ]}
          />
          <NumberField label="Capitais próprios disponíveis" value={capital} onChange={setCapital} suffix="€" />
          <SelectField
            label="Finalidade do imóvel"
            value={purpose}
            onChange={setPurpose}
            options={[
              { value: "hpp", label: "Habitação própria permanente" },
              { value: "secundaria", label: "Habitação secundária" },
              { value: "arrendamento", label: "Arrendamento" },
            ]}
          />
          <SelectField
            label="Tipo de taxa de juro"
            value={rateType}
            onChange={(v) => {
              setRateType(v);
              setRate(RATE_BY_TYPE[v]);
            }}
            options={[
              { value: "fixa", label: "Fixa" },
              { value: "mista", label: "Mista" },
              { value: "variavel", label: "Variável" },
            ]}
          />
          <NumberField label="TAN anual estimada" value={rate} onChange={setRate} suffix="%" />
          <SelectField
            label="Taxa de esforço a considerar"
            value={maxEffort}
            onChange={setMaxEffort}
            options={[
              { value: "35", label: "35% — Cenário recomendado C&Q" },
              { value: "40", label: "40% — Cenário limite" },
            ]}
          />
        </div>

        <div className="mt-5 rounded-xl border border-navy-100 bg-navy-50/60 p-4">
          <label className="flex items-start gap-2.5 text-sm text-navy-700">
            <input type="checkbox" checked={gpConfirm} onChange={(e) => setGpConfirm(e.target.checked)} className="mt-0.5" />
            <span className="flex items-start gap-1.5">
              Quero considerar a <strong>Garantia Pública Jovem</strong> (até 35 anos, rendimentos dentro dos limites
              legais e imóvel até 450 000€).
              <HelpTooltip>
                <p className="font-medium text-navy-900">
                  Para beneficiar da garantia pública de até 15% do valor do imóvel tem de cumprir alguns requisitos:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-4">
                  <li>Jovens entre os 18 e os 35 anos;</li>
                  <li>Com rendimentos anuais até ao oitavo escalão (81 199 euros);</li>
                  <li>Não sejam já proprietários;</li>
                  <li>Não tenham já beneficiado da garantia pessoal do Estado;</li>
                  <li>Imóveis até 450 mil euros.</li>
                </ul>
              </HelpTooltip>
            </span>
          </label>
          <div className="mt-4 max-w-xs">
            <SelectField
              label="IMT Jovem"
              value={imtMode}
              onChange={(v) => setImtMode(v as ImtJovemMode)}
              options={[
                { value: "nenhum", label: "Sem IMT Jovem" },
                { value: "total", label: "Isenção total" },
                ...(numTitulares === "2"
                  ? [{ value: "parcial", label: "Benefício parcial (apenas 1 titular elegível)" }]
                  : []),
              ]}
            />
          </div>
        </div>

        <Button className="mt-6 w-full sm:w-auto" onClick={handleCalculate}>
          Calcular capacidade de compra
        </Button>
      </Card>

      <div className="lg:col-span-2">
        {result ? (
          <Card className="sticky top-24 border-navy-200 bg-navy-950 text-white">
            <p className="text-sm text-navy-300">Valor indicativo do imóvel</p>
            <p className="mt-1 text-3xl font-bold text-gold-400">{formatCurrency(result.housePrice)}</p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/5 p-3">
                <p className="text-xs text-navy-300">Prestação estimada</p>
                <p className="mt-1 text-lg font-semibold text-white">{formatCurrency(result.payment)}</p>
              </div>
              <div className="rounded-xl bg-white/5 p-3">
                <p className="text-xs text-navy-300">Taxa de esforço</p>
                <p className="mt-1 text-lg font-semibold text-white">{formatPercent(result.effortPercent, 0)}</p>
              </div>
              <div className="rounded-xl bg-white/5 p-3">
                <p className="text-xs text-navy-300">Empréstimo</p>
                <p className="mt-1 text-lg font-semibold text-white">{formatCurrency(result.loan)}</p>
              </div>
              <div className="rounded-xl bg-white/5 p-3">
                <p className="text-xs text-navy-300">Capitais próprios necessários</p>
                <p className="mt-1 text-lg font-semibold text-white">{formatCurrency(result.capitalNeeded)}</p>
              </div>
            </div>

            {guaranteeApplied && (
              <p className="mt-4 rounded-lg bg-gold-400/15 p-3 text-xs text-gold-300">
                Cenário calculado com Garantia Pública Jovem aplicada (financiamento até 15% adicional do valor do imóvel).
              </p>
            )}

            <Button href={`https://wa.me/${siteConfig.contact.whatsapp}`} external variant="gold" className="mt-5 w-full">
              Falar com um especialista
            </Button>
          </Card>
        ) : (
          <Card className="flex h-full min-h-[260px] items-center justify-center text-center text-sm text-navy-400">
            Preencha os seus dados e clique em &quot;Calcular capacidade de compra&quot; para ver os resultados.
          </Card>
        )}
      </div>
    </div>
  );
}
