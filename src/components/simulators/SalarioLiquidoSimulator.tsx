"use client";

import { useState } from "react";
import { NumberField, SelectField } from "@/components/simulators/SimulatorShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";
import {
  calcularSalarioLiquido,
  TAXA_SEGURANCA_SOCIAL_DEFAULT,
  type SubsidioAlimentacaoTipo,
} from "@/lib/calculations/salario-liquido";

type DuodecimosOpcao = "nenhum" | "ambos" | "ferias" | "natal" | "personalizado";

export function SalarioLiquidoSimulator() {
  const [salarioBase, setSalarioBase] = useState("1200");
  const [retribuicaoExtraordinaria, setRetribuicaoExtraordinaria] = useState("");
  const [outrosRendSujIrsESs, setOutrosRendSujIrsESs] = useState("");
  const [outrosRendSujSoIrs, setOutrosRendSujSoIrs] = useState("");
  const [rendimentosIsentos, setRendimentosIsentos] = useState("");
  const [taxaSegurancaSocial, setTaxaSegurancaSocial] = useState(String(TAXA_SEGURANCA_SOCIAL_DEFAULT * 100));
  const [duodecimosOpcao, setDuodecimosOpcao] = useState<DuodecimosOpcao>("nenhum");
  const [percentagemDuodecimo, setPercentagemDuodecimo] = useState("100");
  const [subsidioFeriasAnual, setSubsidioFeriasAnual] = useState("");
  const [subsidioNatalAnual, setSubsidioNatalAnual] = useState("");
  const [numDependentes, setNumDependentes] = useState("0");
  const [subsidioDiario, setSubsidioDiario] = useState("10.46");
  const [diasUteis, setDiasUteis] = useState("22");
  const [tipoSubsidio, setTipoSubsidio] = useState<SubsidioAlimentacaoTipo>("cartao");
  const [result, setResult] = useState<ReturnType<typeof calcularSalarioLiquido> | null>(null);

  const mostraFerias = duodecimosOpcao === "ambos" || duodecimosOpcao === "ferias" || duodecimosOpcao === "personalizado";
  const mostraNatal = duodecimosOpcao === "ambos" || duodecimosOpcao === "natal" || duodecimosOpcao === "personalizado";

  function handleCalculate() {
    const base = parseFloat(salarioBase.replace(",", "."));
    const dep = parseInt(numDependentes, 10) || 0;
    const subDiario = parseFloat(subsidioDiario.replace(",", ".")) || 0;
    const dias = parseInt(diasUteis, 10) || 0;
    const extraordinaria = parseFloat(retribuicaoExtraordinaria.replace(",", ".")) || 0;
    const outrosIrsESs = parseFloat(outrosRendSujIrsESs.replace(",", ".")) || 0;
    const outrosSoIrs = parseFloat(outrosRendSujSoIrs.replace(",", ".")) || 0;
    const isentos = parseFloat(rendimentosIsentos.replace(",", ".")) || 0;
    const taxaSS = (parseFloat(taxaSegurancaSocial.replace(",", ".")) || TAXA_SEGURANCA_SOCIAL_DEFAULT * 100) / 100;
    if (isNaN(base) || base <= 0) return;

    const percentagem = parseFloat(percentagemDuodecimo.replace(",", ".")) || 0;
    const feriasAnual = parseFloat(subsidioFeriasAnual.replace(",", ".")) || base;
    const natalAnual = parseFloat(subsidioNatalAnual.replace(",", ".")) || base;

    setResult(
      calcularSalarioLiquido({
        salarioBase: base,
        numDependentes: dep,
        subsidioDiario: subDiario,
        diasUteis: dias,
        tipoSubsidio,
        retribuicaoExtraordinaria: extraordinaria,
        outrosRendSujIrsESs: outrosIrsESs,
        outrosRendSujSoIrs: outrosSoIrs,
        rendimentosIsentos: isentos,
        taxaSegurancaSocial: taxaSS,
        subsidioFeriasAnual: feriasAnual,
        subsidioNatalAnual: natalAnual,
        duodecimoPercentagemFerias: mostraFerias ? percentagem : 0,
        duodecimoPercentagemNatal: mostraNatal ? percentagem : 0,
      })
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <h2 className="text-lg font-semibold text-navy-950">Rendimentos</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <NumberField label="Vencimento base" value={salarioBase} onChange={setSalarioBase} suffix="€" />
          <NumberField
            label="Retribuição extraordinária"
            value={retribuicaoExtraordinaria}
            onChange={setRetribuicaoExtraordinaria}
            suffix="€"
            placeholder="0,00"
            tooltip="Prémios, horas extra ou outras remunerações variáveis, sujeitas a IRS e Segurança Social."
          />
          <NumberField
            label="Outros rend. suj. a IRS e SS"
            value={outrosRendSujIrsESs}
            onChange={setOutrosRendSujIrsESs}
            suffix="€"
            placeholder="0,00"
            tooltip="Outros rendimentos sujeitos a retenção de IRS e a desconto para a Segurança Social."
          />
          <NumberField
            label="Outros rendimentos suj. só IRS"
            value={outrosRendSujSoIrs}
            onChange={setOutrosRendSujSoIrs}
            suffix="€"
            placeholder="0,00"
            tooltip="Rendimentos sujeitos a retenção de IRS mas sem desconto para a Segurança Social."
          />
          <NumberField
            label="Rendimentos isentos"
            value={rendimentosIsentos}
            onChange={setRendimentosIsentos}
            suffix="€"
            placeholder="0,00"
            tooltip="Valores isentos de IRS e de Segurança Social, somados diretamente ao salário líquido."
          />
          <NumberField
            label="Taxa de Segurança Social"
            value={taxaSegurancaSocial}
            onChange={setTaxaSegurancaSocial}
            suffix="%"
            tooltip="11% é a taxa padrão para trabalhadores por conta de outrem. Outras taxas podem aplicar-se em regimes especiais."
          />
          <SelectField
            label="Recebe subsídio(s) em duodécimos?"
            value={duodecimosOpcao}
            onChange={(v) => setDuodecimosOpcao(v as DuodecimosOpcao)}
            options={[
              { value: "nenhum", label: "Não" },
              { value: "ambos", label: "Recebo os dois subsídios por inteiro em duodécimos" },
              { value: "ferias", label: "Recebo só o subsídio de férias em duodécimos" },
              { value: "natal", label: "Recebo só o subsídio de Natal em duodécimos" },
              { value: "personalizado", label: "Personalizado (percentagem)" },
            ]}
          />
          {duodecimosOpcao !== "nenhum" && (
            <NumberField
              label="Percentagem paga em duodécimos"
              value={percentagemDuodecimo}
              onChange={setPercentagemDuodecimo}
              suffix="%"
              tooltip="Percentagem do(s) subsídio(s) selecionado(s) que é paga mensalmente, junto com o vencimento, em vez de no pagamento integral de junho/novembro."
            />
          )}
          {mostraFerias && (
            <NumberField
              label="Subsídio de férias (valor anual)"
              value={subsidioFeriasAnual}
              onChange={setSubsidioFeriasAnual}
              suffix="€"
              placeholder={salarioBase || "Igual ao vencimento base"}
              tooltip="Por defeito, igual a um mês de vencimento base. Ajuste se o seu subsídio de férias for diferente."
            />
          )}
          {mostraNatal && (
            <NumberField
              label="Subsídio de Natal (valor anual)"
              value={subsidioNatalAnual}
              onChange={setSubsidioNatalAnual}
              suffix="€"
              placeholder={salarioBase || "Igual ao vencimento base"}
              tooltip="Por defeito, igual a um mês de vencimento base. Ajuste se o seu subsídio de Natal for diferente."
            />
          )}
        </div>

        <h2 className="mt-8 text-lg font-semibold text-navy-950">Dependentes e subsídio de alimentação</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
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
          dois titulares a trabalhar) e na taxa de Segurança Social indicada para trabalhadores por conta de outrem.
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
                <p className="text-xs text-navy-300">Segurança Social ({taxaSegurancaSocial || "0"}%)</p>
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
              {result.duodecimoMensal > 0 && (
                <div className="rounded-xl bg-white/5 p-3">
                  <p className="text-xs text-navy-300">Duodécimo de subsídio(s)</p>
                  <p className="mt-1 text-lg font-semibold text-white">{formatCurrency(result.duodecimoMensal)}</p>
                </div>
              )}
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
