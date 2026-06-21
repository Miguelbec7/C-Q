"use client";

import { useState } from "react";
import { NumberField, ResultStat } from "@/components/simulators/SimulatorShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";
import { calcularMaisValias } from "@/lib/calculations/mais-valias";

export function MaisValiasSimulator() {
  const [valorVenda, setValorVenda] = useState("300000");
  const [valorAquisicao, setValorAquisicao] = useState("180000");
  const [coeficiente, setCoeficiente] = useState("1.00");
  const [despesas, setDespesas] = useState("0");
  const [reinvestir, setReinvestir] = useState(false);
  const [valorReinvestido, setValorReinvestido] = useState("0");
  const [taxaIrs, setTaxaIrs] = useState("");
  const [result, setResult] = useState<ReturnType<typeof calcularMaisValias> | null>(null);

  function handleCalculate() {
    const venda = parseFloat(valorVenda.replace(",", "."));
    const aquisicao = parseFloat(valorAquisicao.replace(",", "."));
    const coef = parseFloat(coeficiente.replace(",", ".")) || 1;
    const desp = parseFloat(despesas.replace(",", ".")) || 0;
    const reinvestido = parseFloat(valorReinvestido.replace(",", ".")) || 0;
    const taxa = parseFloat(taxaIrs.replace(",", ".")) || 0;
    if (isNaN(venda) || venda <= 0 || isNaN(aquisicao)) return;

    setResult(
      calcularMaisValias({
        valorVenda: venda,
        valorAquisicao: aquisicao,
        coeficiente: coef,
        despesas: desp,
        reinvestir,
        valorReinvestido: reinvestido,
        taxaIrsEstimada: taxa,
      })
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <h2 className="text-lg font-semibold text-navy-950">Dados da venda</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <NumberField label="Valor de venda do imóvel" value={valorVenda} onChange={setValorVenda} suffix="€" />
          <NumberField label="Valor de aquisição" value={valorAquisicao} onChange={setValorAquisicao} suffix="€" />
          <NumberField
            label="Coeficiente de desvalorização da moeda"
            value={coeficiente}
            onChange={setCoeficiente}
            tooltip="Publicado anualmente pela Autoridade Tributária, varia com o ano de aquisição do imóvel. Para aquisições há menos de 2 anos o coeficiente é 1. Consulte a tabela em vigor para o ano da venda."
          />
          <NumberField
            label="Despesas e encargos dedutíveis"
            value={despesas}
            onChange={setDespesas}
            suffix="€"
            tooltip="Obras de valorização comprovadas dos últimos 12 anos, IMT e despesas de escritura pagas na aquisição, comissão de imobiliária na venda, entre outras despesas dedutíveis."
          />
        </div>

        <div className="mt-5 rounded-xl border border-navy-100 bg-navy-50/60 p-4">
          <label className="flex items-start gap-2.5 text-sm text-navy-700">
            <input
              type="checkbox"
              checked={reinvestir}
              onChange={(e) => setReinvestir(e.target.checked)}
              className="mt-0.5"
            />
            <span>
              Pretendo reinvestir o valor de realização noutra habitação própria e permanente (até 36 meses após a
              venda, ou 24 meses antes).
            </span>
          </label>
          {reinvestir && (
            <div className="mt-4 max-w-xs">
              <NumberField label="Valor a reinvestir" value={valorReinvestido} onChange={setValorReinvestido} suffix="€" />
            </div>
          )}
        </div>

        <div className="mt-4 max-w-xs">
          <NumberField
            label="Taxa de IRS marginal estimada (opcional)"
            value={taxaIrs}
            onChange={setTaxaIrs}
            suffix="%"
            placeholder="ex.: 35"
            tooltip="Estimativa ilustrativa apenas. A mais-valia tributável é obrigatoriamente somada aos restantes rendimentos do agregado (englobamento) e tributada à taxa de IRS que resultar do escalão total do agregado."
          />
        </div>

        <Button className="mt-6 w-full sm:w-auto" onClick={handleCalculate}>
          Calcular mais-valia
        </Button>
      </Card>

      <div className="lg:col-span-2">
        {result ? (
          <Card className="sticky top-24">
            <p className="text-sm text-navy-400">Mais-valia tributável (50%)</p>
            <p className="mt-1 text-3xl font-bold text-navy-950">{formatCurrency(result.maisValiaTributavelFinal)}</p>
            {result.fracaoIsentaReinvestimento > 0 && (
              <p className="mt-2 text-sm text-emerald-600">
                {formatCurrency(result.maisValiaTributavel - result.maisValiaTributavelFinal)} isentos com o
                reinvestimento.
              </p>
            )}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <ResultStat label="Mais-valia total" value={formatCurrency(result.maisValia)} />
              {result.impostoEstimado > 0 && (
                <ResultStat label="IRS estimado" value={formatCurrency(result.impostoEstimado)} tone="gold" />
              )}
            </div>
            <p className="mt-4 text-xs text-navy-400">
              Este valor é somado aos restantes rendimentos do agregado e tributado em sede de IRS. Simulação
              meramente indicativa.
            </p>
          </Card>
        ) : (
          <Card className="flex h-full min-h-[200px] items-center justify-center text-center text-sm text-navy-400">
            Preencha os dados para calcular a mais-valia estimada.
          </Card>
        )}
      </div>
    </div>
  );
}
