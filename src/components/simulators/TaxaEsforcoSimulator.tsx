"use client";

import { useState } from "react";
import { NumberField } from "@/components/simulators/SimulatorShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatPercent } from "@/lib/utils";
import { calcularTaxaEsforco } from "@/lib/calculations/taxa-esforco";
import { cn } from "@/lib/utils";

const TONE_CLASSES: Record<string, string> = {
  saudavel: "border-emerald-200 bg-emerald-50 text-emerald-700",
  elevada: "border-amber-200 bg-amber-50 text-amber-700",
  preocupante: "border-red-200 bg-red-50 text-red-700",
};

export function TaxaEsforcoSimulator() {
  const [income, setIncome] = useState("1800");
  const [otherLoans, setOtherLoans] = useState("150");
  const [newPayment, setNewPayment] = useState("500");
  const [result, setResult] = useState<ReturnType<typeof calcularTaxaEsforco> | null>(null);

  function handleCalculate() {
    const i = parseFloat(income.replace(",", "."));
    const o = parseFloat(otherLoans.replace(",", ".")) || 0;
    const n = parseFloat(newPayment.replace(",", ".")) || 0;
    if (isNaN(i) || i <= 0) return;
    setResult(calcularTaxaEsforco(i, o, n));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <h2 className="text-lg font-semibold text-navy-950">Os seus rendimentos e encargos</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <NumberField label="Rendimento líquido mensal do agregado" value={income} onChange={setIncome} suffix="€" />
          <NumberField label="Outras prestações de crédito" value={otherLoans} onChange={setOtherLoans} suffix="€" />
          <NumberField label="Prestação do novo crédito" value={newPayment} onChange={setNewPayment} suffix="€" />
        </div>
        <Button className="mt-6 w-full sm:w-auto" onClick={handleCalculate}>
          Calcular taxa de esforço
        </Button>
      </Card>

      <div className="lg:col-span-2">
        {result ? (
          <Card className={cn("sticky top-24 border-2", TONE_CLASSES[result.level])}>
            <p className="text-sm opacity-80">A sua taxa de esforço estimada</p>
            <p className="mt-1 text-4xl font-bold">{formatPercent(result.effortPercent, 0)}</p>
            <p className="mt-3 text-sm font-semibold">{result.label}</p>
            <p className="mt-1 text-sm leading-relaxed opacity-90">{result.message}</p>
            <div className="mt-4 text-xs opacity-70">
              Referência: até 35% saudável · 35–45% elevada · acima de 45% preocupante.
            </div>
          </Card>
        ) : (
          <Card className="flex h-full min-h-[200px] items-center justify-center text-center text-sm text-navy-400">
            Preencha os dados para calcular a sua taxa de esforço.
          </Card>
        )}
      </div>
    </div>
  );
}
