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
  type ImtJovemMode,
} from "@/lib/calculations/imt";

export function ImtSimulator() {
  const [price, setPrice] = useState("250000");
  const [purpose, setPurpose] = useState("hpp");
  const [imtMode, setImtMode] = useState<ImtJovemMode>("nenhum");
  const [result, setResult] = useState<{ base: number; final: number } | null>(null);

  function handleCalculate() {
    const p = parseFloat(price.replace(",", "."));
    if (isNaN(p) || p <= 0) return;
    const calcularImt = purpose === "hpp" ? calcularIMTContinentalHPP : calcularIMTContinentalSecundaria;
    const base = calcularImt(p);
    const { imtFinal } = aplicarImtJovem(p, base, imtMode, calcularImt);
    setResult({ base, final: imtFinal });
  }

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
            label="IMT Jovem"
            value={imtMode}
            onChange={(v) => setImtMode(v as ImtJovemMode)}
            options={[
              { value: "nenhum", label: "Sem IMT Jovem" },
              { value: "total", label: "Isenção total (até ~316 772€)" },
              { value: "parcial", label: "Benefício parcial (apenas 1 titular elegível)" },
            ]}
          />
        </div>
        <Button className="mt-6 w-full sm:w-auto" onClick={handleCalculate}>
          Calcular IMT
        </Button>
      </Card>

      <div className="lg:col-span-2">
        {result ? (
          <Card className="sticky top-24">
            <p className="text-sm text-navy-400">IMT a pagar (estimado)</p>
            <p className="mt-1 text-3xl font-bold text-navy-950">{formatCurrency(result.final)}</p>
            {result.final !== result.base && (
              <p className="mt-2 text-sm text-emerald-600">
                Poupança de {formatCurrency(result.base - result.final)} com o IMT Jovem.
              </p>
            )}
            <div className="mt-5">
              <ResultStat label="IMT sem benefícios" value={formatCurrency(result.base)} />
            </div>
          </Card>
        ) : (
          <Card className="flex h-full min-h-[200px] items-center justify-center text-center text-sm text-navy-400">
            Preencha os dados para calcular o IMT estimado.
          </Card>
        )}
      </div>
    </div>
  );
}
