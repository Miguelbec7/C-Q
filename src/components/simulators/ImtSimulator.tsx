"use client";

import { useState } from "react";
import { NumberField, SelectField, ResultStat } from "@/components/simulators/SimulatorShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";
import {
  calcularIMTContinentalHPP,
  calcularIMTContinentalSecundaria,
  aplicarImtJovem,
  calcularBeneficioSeloCompra,
  type ImtJovemMode,
} from "@/lib/calculations/imt";
import { calcularImpostoSeloCompra } from "@/lib/calculations/imposto-selo";

export function ImtSimulator() {
  const [price, setPrice] = useState("250000");
  const [purpose, setPurpose] = useState("hpp");
  const [numCompradores, setNumCompradores] = useState("1");
  const [imtMode, setImtMode] = useState<ImtJovemMode>("nenhum");
  const [result, setResult] = useState<{
    imtBase: number;
    imtFinal: number;
    seloBase: number;
    seloFinal: number;
  } | null>(null);

  function handleCalculate() {
    const p = parseFloat(price.replace(",", "."));
    if (isNaN(p) || p <= 0) return;

    const calcularImt = purpose === "hpp" ? calcularIMTContinentalHPP : calcularIMTContinentalSecundaria;
    const imtBase = calcularImt(p);
    const { imtFinal } = aplicarImtJovem(p, imtBase, imtMode, calcularImt);

    const seloBase = calcularImpostoSeloCompra(p);
    const seloBeneficio = calcularBeneficioSeloCompra(p, imtMode);
    const seloFinal = Math.max(0, seloBase - seloBeneficio);

    setResult({ imtBase, imtFinal, seloBase, seloFinal });
  }

  const totalFinal = result ? result.imtFinal + result.seloFinal : 0;
  const totalBase = result ? result.imtBase + result.seloBase : 0;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <h2 className="text-lg font-semibold text-navy-950">Dados do imóvel</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
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
              { value: "total", label: "Isenção total (até 330 539€)" },
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
                <p className="mt-2">
                  Para isenção total, o imóvel não pode custar mais do que 330 539€. Imóveis entre 330 539€ e
                  660 982€ têm isenção parcial de IMT e Imposto do Selo. Acima de 660 982€ paga-se IMT e Imposto
                  do Selo na totalidade.
                </p>
              </>
            }
          />
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
      </div>
    </div>
  );
}
