"use client";

import { useState } from "react";
import { NumberField, ResultStat } from "@/components/simulators/SimulatorShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";
import { calcularPrestacao } from "@/lib/calculations/prestacao";

export function PrestacaoMensalSimulator({ ctaSlot }: { ctaSlot?: React.ReactNode }) {
  const [principal, setPrincipal] = useState("150000");
  const [rate, setRate] = useState("3.50");
  const [months, setMonths] = useState("360");
  const [result, setResult] = useState<ReturnType<typeof calcularPrestacao> | null>(null);

  function handleCalculate() {
    const p = parseFloat(principal.replace(",", "."));
    const r = parseFloat(rate.replace(",", "."));
    const m = parseInt(months, 10);
    if (isNaN(p) || isNaN(r) || isNaN(m) || m <= 0) return;
    setResult(calcularPrestacao(p, r, m));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <h2 className="text-lg font-semibold text-navy-950">Dados do crédito</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <NumberField label="Montante do crédito" value={principal} onChange={setPrincipal} suffix="€" />
          <NumberField label="Taxa anual (TAN)" value={rate} onChange={setRate} suffix="%" />
          <NumberField label="Prazo" value={months} onChange={setMonths} suffix="meses" />
        </div>
        <Button className="mt-6 w-full sm:w-auto" onClick={handleCalculate}>
          Calcular prestação
        </Button>
      </Card>

      <div className="lg:col-span-2">
        {result ? (
          <Card className="sticky top-24">
            <p className="text-sm text-navy-400">Prestação mensal estimada</p>
            <p className="mt-1 text-3xl font-bold text-navy-950">{formatCurrency(result.payment)}</p>
            <div className="mt-5 grid gap-3">
              <ResultStat label="Total pago no contrato" value={formatCurrency(result.totalPaid)} />
              <ResultStat label="Total de juros" value={formatCurrency(result.totalInterest)} tone="gold" />
            </div>
            {ctaSlot}
          </Card>
        ) : (
          <Card className="flex h-full min-h-[200px] items-center justify-center text-center text-sm text-navy-400">
            Preencha os dados e calcule a sua prestação estimada.
          </Card>
        )}
      </div>
    </div>
  );
}
