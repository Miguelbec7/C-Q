"use client";

import { useState } from "react";
import { NumberField, SelectField, ResultStat } from "@/components/simulators/SimulatorShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";
import {
  calcularIMTContinentalHPP,
  calcularIMTContinentalSecundaria,
  calcularIMTRegiaoAutonomaHPP,
  calcularIMTRegiaoAutonomaSecundaria,
  aplicarImtJovem,
  calcularBeneficioSeloCompra,
  type ImtJovemMode,
  type ImtRegion,
} from "@/lib/calculations/imt";
import { calcularImpostoSeloCompra, calcularImpostoSeloCredito } from "@/lib/calculations/imposto-selo";

export function ImtSimulator() {
  const [price, setPrice] = useState("250000");
  const [region, setRegion] = useState<ImtRegion>("continental");
  const [purpose, setPurpose] = useState("hpp");
  const [numCompradores, setNumCompradores] = useState("1");
  const [imtMode, setImtMode] = useState<ImtJovemMode>("nenhum");
  const [loan, setLoan] = useState("200000");
  const [months, setMonths] = useState("360");
  const [result, setResult] = useState<{
    imtBase: number;
    imtFinal: number;
    seloBase: number;
    seloFinal: number;
    seloCredito: number;
    seloCreditoRate: number;
  } | null>(null);

  function handleCalculate() {
    const p = parseFloat(price.replace(",", "."));
    if (isNaN(p) || p <= 0) return;

    const calcularImt =
      region === "autonoma"
        ? purpose === "hpp"
          ? calcularIMTRegiaoAutonomaHPP
          : calcularIMTRegiaoAutonomaSecundaria
        : purpose === "hpp"
          ? calcularIMTContinentalHPP
          : calcularIMTContinentalSecundaria;
    const imtBase = calcularImt(p);
    const { imtFinal } = aplicarImtJovem(p, imtBase, imtMode, calcularImt, region);

    const seloBase = calcularImpostoSeloCompra(p);
    const seloBeneficio = calcularBeneficioSeloCompra(p, imtMode, region);
    const seloFinal = Math.max(0, seloBase - seloBeneficio);

    const l = parseFloat(loan.replace(",", ".")) || 0;
    const m = parseInt(months, 10) || 0;
    const seloCredito = calcularImpostoSeloCredito(l, m);
    const seloCreditoRate = m >= 60 ? 0.006 : 0.005;

    setResult({ imtBase, imtFinal, seloBase, seloFinal, seloCredito, seloCreditoRate });
  }

  const totalFinal = result ? result.imtFinal + result.seloFinal : 0;
  const totalBase = result ? result.imtBase + result.seloBase : 0;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <h2 className="text-lg font-semibold text-navy-950">Dados do imóvel</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <SelectField
            label="Local do imóvel"
            value={region}
            onChange={(v) => setRegion(v as ImtRegion)}
            options={[
              { value: "continental", label: "Portugal Continental" },
              { value: "autonoma", label: "Regiões Autónomas (Açores/Madeira)" },
            ]}
          />
          <NumberField label="Valor de compra do imóvel" value={price} onChange={setPrice} suffix="€" />
          <SelectField
            label="Finalidade"
            value={purpose}
            onChange={setPurpose}
            options={[
              { value: "hpp", label: "Habitação própria permanente" },
              { value: "secundaria", label: "Habitação secundária / Arrendamento" },
            ]}
          />
          <SelectField
            label="Número de compradores"
            value={numCompradores}
            onChange={(v) => {
              setNumCompradores(v);
              if (v === "1" && imtMode === "parcial") setImtMode("nenhum");
            }}
            options={[
              { value: "1", label: "1 comprador" },
              { value: "2", label: "2 compradores" },
            ]}
          />
          <SelectField
            label="IMT Jovem"
            value={imtMode}
            onChange={(v) => setImtMode(v as ImtJovemMode)}
            options={[
              { value: "nenhum", label: "Sem IMT Jovem" },
              {
                value: "total",
                label: `Isenção total (até ${region === "autonoma" ? "413 174€" : "330 539€"})`,
              },
              ...(numCompradores === "2"
                ? [{ value: "parcial", label: "Benefício parcial (apenas 1 comprador elegível)" }]
                : []),
            ]}
            tooltip={
              <>
                <p className="font-medium text-navy-900">
                  Para beneficiar da isenção do IMT e Imposto do Selo não pode:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-4">
                  <li>Ter mais de 35 anos;</li>
                  <li>Ser considerado dependente para efeitos de IRS;</li>
                  <li>Ser proprietário de uma habitação;</li>
                  <li>Ser proprietário de uma parcela de uma habitação;</li>
                  <li>Ter tido uma habitação, ou uma parcela de uma habitação, nos últimos três anos.</li>
                </ul>
                {region === "autonoma" ? (
                  <p className="mt-2">
                    Nas Regiões Autónomas, para isenção total, o imóvel não pode custar mais do que 413 174€.
                    Imóveis entre 413 174€ e 826 228€ têm isenção parcial de IMT e Imposto do Selo. Acima de
                    826 228€ paga-se IMT e Imposto do Selo na totalidade.
                  </p>
                ) : (
                  <p className="mt-2">
                    Para isenção total, o imóvel não pode custar mais do que 330 539€. Imóveis entre 330 539€ e
                    660 982€ têm isenção parcial de IMT e Imposto do Selo. Acima de 660 982€ paga-se IMT e Imposto
                    do Selo na totalidade.
                  </p>
                )}
              </>
            }
          />
          <NumberField label="Montante do financiamento" value={loan} onChange={setLoan} suffix="€" />
          <NumberField label="Prazo do crédito" value={months} onChange={setMonths} suffix="meses" />
        </div>
        <Button className="mt-6 w-full sm:w-auto" onClick={handleCalculate}>
          Calcular IMT e Imposto do Selo
        </Button>
      </Card>

      <div className="lg:col-span-2">
        {result ? (
          <Card className="sticky top-24">
            <p className="text-sm text-navy-400">Total a pagar (IMT + Imposto do Selo)</p>
            <p className="mt-1 text-3xl font-bold text-navy-950">{formatCurrency(totalFinal)}</p>
            {totalFinal !== totalBase && (
              <p className="mt-2 text-sm text-emerald-600">
                Poupança de {formatCurrency(totalBase - totalFinal)} com o IMT Jovem.
              </p>
            )}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <ResultStat label="Valor de IMT" value={formatCurrency(result.imtFinal)} />
              <ResultStat label="Imposto do Selo (0,8%)" value={formatCurrency(result.seloFinal)} />
            </div>
            {totalFinal !== totalBase && (
              <p className="mt-4 text-xs text-navy-400">
                Sem benefícios: IMT {formatCurrency(result.imtBase)} + Imposto do Selo{" "}
                {formatCurrency(result.seloBase)} = {formatCurrency(totalBase)}.
              </p>
            )}
          </Card>
        ) : (
          <Card className="flex h-full min-h-[200px] items-center justify-center text-center text-sm text-navy-400">
            Preencha os dados para calcular o IMT e o Imposto do Selo estimados.
          </Card>
        )}

        {result && result.seloCredito > 0 && (
          <Card className="mt-4 border-gold-200 bg-gold-50">
            <p className="text-sm text-navy-500">
              Imposto do Selo sobre o financiamento ({(result.seloCreditoRate * 100).toFixed(1).replace(".", ",")}%)
            </p>
            <p className="mt-1 text-2xl font-bold text-navy-950">{formatCurrency(result.seloCredito)}</p>
            <p className="mt-2 text-xs text-navy-400">
              Incide sobre o montante do crédito, à parte do imposto do selo sobre a compra — soma-se aos custos
              pagos na escritura.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
