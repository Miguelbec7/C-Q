"use client";

import { useState } from "react";
import { NumberField, SelectField } from "@/components/simulators/SimulatorShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";
import { calcularSalarioLiquido, type SubsidioAlimentacaoTipo } from "@/lib/calculations/salario-liquido";

export function SalarioLiquidoSimulator() {
  const [salarioBase, setSalarioBase] = useState("1200");
  const [numDependentes, setNumDependentes] = useState("0");
  const [subsidioDiario, setSubsidioDiario] = useState("10.46");
  const [diasUteis, setDiasUteis] = useState("22");
  const [tipoSubsidio, setTipoSubsidio] = useState<SubsidioAlimentacaoTipo>("cartao");
  const [result, setResult] = useState<ReturnType<typeof calcularSalarioLiquido> | null>(null);

  function handleCalculate() {
    const base = parseFloat(salarioBase.replace(",", "."));
    const dep = parseInt(numDependentes, 10) || 0;
    const subDiario = parseFloat(subsidioDiario.replace(",", ".")) || 0;
    const dias = parseInt(diasUteis, 10) || 0;
    if (isNaN(base) || base <= 0) return;

    setResult(
      calcularSalarioLiquido({
        salarioBase: base,
        numDependentes: dep,
        subsidioDiario: subDiario,
        diasUteis: dias,
        tipoSubsidio,
      })
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <h2 className="text-lg font-semibold text-navy-950">Os seus dados</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <NumberField label="Salário base bruto mensal" value={salarioBase} onChange={setSalarioBase} suffix="€" />
          <NumberField
            label="Número de dependentes a cargo"
            value={numDependentes}
            onChange={setNumDependentes}
            tooltip="Reduz a retenção de IRS em 21,43€ por dependente, de acordo com a tabela de retenção na fonte em vigor."
          />
          <NumberField label="Subsídio de alimentação diário" value={subsidioDiario} onChange={setSubsidioDiario} suffix="€" />
          <NumberField label="Dias de trabalho por mês" value={diasUteis} onChange={setDiasUteis} suffix="dias" />
          <SelectField
            label="Forma de pagamento do subsídio"
            value={tipoSubsidio}
            onChange={(v) => setTipoSubsidio(v as SubsidioAlimentacaoTipo)}
            options={[
              { value: "cartao", label: "Cartão / voucher refeição (isento até 10,46€/dia)" },
              { value: "dinheiro", label: "Dinheiro / transferência (isento até 6,15€/dia)" },
            ]}
          />
        </div>

        <p className="mt-4 text-xs text-navy-400">
          Cálculo com base na Tabela I de retenção na fonte de IRS para o Continente em 2026 (não casado ou casado com
          dois titulares a trabalhar) e na taxa de Segurança Social de 11% para trabalhadores por conta de outrem.
        </p>

        <Button className="mt-6 w-full sm:w-auto" onClick={handleCalculate}>
          Calcular salário líquido
        </Button>
      </Card>

      <div className="lg:col-span-2">
        {result ? (
          <Card className="sticky top-24 border-navy-200 bg-navy-950 text-white">
            <p className="text-sm text-navy-300">Salário líquido mensal estimado</p>
            <p className="mt-1 text-3xl font-bold text-gold-400">{formatCurrency(result.salarioLiquido)}</p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/5 p-3">
                <p className="text-xs text-navy-300">Salário bruto total</p>
                <p className="mt-1 text-lg font-semibold text-white">{formatCurrency(result.salarioBrutoTotal)}</p>
              </div>
              <div className="rounded-xl bg-white/5 p-3">
                <p className="text-xs text-navy-300">Segurança Social (11%)</p>
                <p className="mt-1 text-lg font-semibold text-white">{formatCurrency(result.segurancaSocial)}</p>
              </div>
              <div className="rounded-xl bg-white/5 p-3">
                <p className="text-xs text-navy-300">Retenção de IRS</p>
                <p className="mt-1 text-lg font-semibold text-white">{formatCurrency(result.retencaoIRS)}</p>
              </div>
              <div className="rounded-xl bg-white/5 p-3">
                <p className="text-xs text-navy-300">Subsídio de alimentação</p>
                <p className="mt-1 text-lg font-semibold text-white">{formatCurrency(result.subsidioMensal)}</p>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="flex h-full min-h-[260px] items-center justify-center text-center text-sm text-navy-400">
            Preencha os seus dados e clique em &quot;Calcular salário líquido&quot; para ver o resultado.
          </Card>
        )}
      </div>
    </div>
  );
}
