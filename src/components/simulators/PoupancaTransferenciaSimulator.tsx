"use client";

import { useState } from "react";
import { NumberField } from "@/components/simulators/SimulatorShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";
import { calcularPrestacao } from "@/lib/calculations/prestacao";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

export function PoupancaTransferenciaSimulator() {
  const [currentPrincipal, setCurrentPrincipal] = useState("150000");
  const [currentRate, setCurrentRate] = useState("3.20");
  const [currentMonths, setCurrentMonths] = useState("300");
  const [newRate, setNewRate] = useState("2.40");
  const [newMonths, setNewMonths] = useState("300");

  const [result, setResult] = useState<{
    diffMensal: number;
    diffTotal: number;
    novoPayment: number;
    atualPayment: number;
  } | null>(null);

  function handleCalculate() {
    const principal = parseFloat(currentPrincipal.replace(",", "."));
    const cRate = parseFloat(currentRate.replace(",", "."));
    const cMonths = parseInt(currentMonths, 10);
    const nRate = parseFloat(newRate.replace(",", "."));
    const nMonths = parseInt(newMonths, 10);

    if (isNaN(principal) || isNaN(cRate) || isNaN(cMonths) || isNaN(nRate) || isNaN(nMonths)) return;

    const atual = calcularPrestacao(principal, cRate, cMonths);
    const novo = calcularPrestacao(principal, nRate, nMonths);

    setResult({
      diffMensal: novo.payment - atual.payment,
      diffTotal: novo.totalInterest - atual.totalInterest,
      novoPayment: novo.payment,
      atualPayment: atual.payment,
    });
  }

  const isSaving = result ? result.diffMensal < 0 : false;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <h2 className="text-lg font-semibold text-navy-950">1. Situação atual</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <NumberField label="Montante em dívida" value={currentPrincipal} onChange={setCurrentPrincipal} suffix="€" />
          <NumberField label="TAN anual atual" value={currentRate} onChange={setCurrentRate} suffix="%" />
          <NumberField label="Prazo remanescente" value={currentMonths} onChange={setCurrentMonths} suffix="meses" />
        </div>

        <h2 className="mt-6 text-lg font-semibold text-navy-950">2. Nova proposta (simulação C&amp;Q)</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <NumberField label="Nova TAN anual" value={newRate} onChange={setNewRate} suffix="%" />
          <NumberField label="Novo prazo" value={newMonths} onChange={setNewMonths} suffix="meses" />
        </div>

        <Button className="mt-6 w-full sm:w-auto" onClick={handleCalculate}>
          Calcular poupança
        </Button>
      </Card>

      <div className="lg:col-span-2">
        {result ? (
          <Card
            className={cn(
              "sticky top-24 border-2",
              isSaving ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"
            )}
          >
            <p className="text-sm opacity-80">
              {isSaving ? "Poupança mensal estimada" : "Aumento de prestação estimado"}
            </p>
            <p className={cn("mt-1 text-3xl font-bold", isSaving ? "text-emerald-700" : "text-red-700")}>
              {formatCurrency(Math.abs(result.diffMensal))}
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className="text-navy-400 line-through">{formatCurrency(result.atualPayment)}</span>
              <span className="font-semibold text-navy-900">{formatCurrency(result.novoPayment)}</span>
            </div>

            <div className="mt-4 border-t border-black/5 pt-4">
              <p className="text-xs uppercase tracking-wide text-navy-400">Juros totais do contrato</p>
              <p className={cn("mt-1 font-semibold", result.diffTotal < 0 ? "text-emerald-700" : "text-red-700")}>
                {result.diffTotal < 0 ? "Poupa " : "Paga mais "}
                {formatCurrency(Math.abs(result.diffTotal))} em juros
              </p>
            </div>

            <Button href={`https://wa.me/${siteConfig.contact.whatsapp}`} external variant="primary" className="mt-5 w-full">
              Quero esta poupança
            </Button>
          </Card>
        ) : (
          <Card className="flex h-full min-h-[260px] items-center justify-center text-center text-sm text-navy-400">
            Preencha os dados das duas situações para calcular o impacto da transferência.
          </Card>
        )}
      </div>
    </div>
  );
}
