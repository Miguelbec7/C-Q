"use client";

import { useState } from "react";
import { NumberField, ResultStat } from "@/components/simulators/SimulatorShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";
import { calcularImpostoSeloCompra, calcularImpostoSeloCredito } from "@/lib/calculations/imposto-selo";

export function ImpostoSeloSimulator() {
  const [price, setPrice] = useState("250000");
  const [loan, setLoan] = useState("200000");
  const [months, setMonths] = useState("360");
  const [result, setResult] = useState<{ compra: number; credito: number } | null>(null);

  function handleCalculate() {
    const p = parseFloat(price.replace(",", "."));
    const l = parseFloat(loan.replace(",", ".")) || 0;
    const m = parseInt(months, 10) || 0;
    if (isNaN(p)) return;
    setResult({
      compra: calcularImpostoSeloCompra(p),
      credito: calcularImpostoSeloCredito(l, m),
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <h2 className="text-lg font-semibold text-navy-950">Dados da operação</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <NumberField label="Valor de compra do imóvel" value={price} onChange={setPrice} suffix="€" />
          <NumberField label="Montante do crédito" value={loan} onChange={setLoan} suffix="€" />
          <NumberField label="Prazo do crédito" value={months} onChange={setMonths} suffix="meses" />
        </div>
        <Button className="mt-6 w-full sm:w-auto" onClick={handleCalculate}>
          Calcular imposto do selo
        </Button>
      </Card>

      <div className="lg:col-span-2">
        {result ? (
          <Card className="sticky top-24">
            <p className="text-sm text-navy-400">Imposto do selo total estimado</p>
            <p className="mt-1 text-3xl font-bold text-navy-950">{formatCurrency(result.compra + result.credito)}</p>
            <div className="mt-5 grid gap-3">
              <ResultStat label="Selo sobre a compra (0,8%)" value={formatCurrency(result.compra)} />
              <ResultStat label="Selo sobre o crédito" value={formatCurrency(result.credito)} tone="gold" />
            </div>
          </Card>
        ) : (
          <Card className="flex h-full min-h-[200px] items-center justify-center text-center text-sm text-navy-400">
            Preencha os dados para calcular o imposto do selo estimado.
          </Card>
        )}
      </div>
    </div>
  );
}
