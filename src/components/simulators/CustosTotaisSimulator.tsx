"use client";

import { useState } from "react";
import { NumberField, SelectField } from "@/components/simulators/SimulatorShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";
import {
  getCalculadoraIMT,
  aplicarImtJovem,
  calcularBeneficioSeloCompra,
  type ImtJovemMode,
  type ImtRegion,
} from "@/lib/calculations/imt";
import { calcularImpostoSeloCompra, calcularImpostoSeloCredito } from "@/lib/calculations/imposto-selo";

// Custos bancários típicos — meramente indicativos, variam de instituição para
// instituição; o visitante pode ajustá-los aos valores reais da proposta que tiver.
const DEFAULT_BANK_COSTS = {
  avaliacao: "250",
  formalizacao: "750",
  registoPredial: "15",
  copiaContrato: "43",
  dpa: "20",
};

export function CustosTotaisSimulator() {
  const [price, setPrice] = useState("250000");
  const [region, setRegion] = useState<ImtRegion>("continental");
  const [purpose, setPurpose] = useState("hpp");
  const [numCompradores, setNumCompradores] = useState("1");
  const [imtMode, setImtMode] = useState<ImtJovemMode>("nenhum");
  const [loan, setLoan] = useState("200000");
  const [months, setMonths] = useState("360");
  const [avaliacao, setAvaliacao] = useState(DEFAULT_BANK_COSTS.avaliacao);
  const [formalizacao, setFormalizacao] = useState(DEFAULT_BANK_COSTS.formalizacao);
  const [registoPredial, setRegistoPredial] = useState(DEFAULT_BANK_COSTS.registoPredial);
  const [copiaContrato, setCopiaContrato] = useState(DEFAULT_BANK_COSTS.copiaContrato);
  const [dpa, setDpa] = useState(DEFAULT_BANK_COSTS.dpa);
  const [outros, setOutros] = useState("0");

  const [result, setResult] = useState<{
    imt: number;
    seloCompra: number;
    seloCredito: number;
    custosBancarios: number;
    total: number;
  } | null>(null);

  function num(value: string): number {
    return parseFloat(value.replace(",", ".")) || 0;
  }

  function handleCalculate() {
    const p = num(price);
    if (p <= 0) return;

    const calcularImt = getCalculadoraIMT(region, purpose as "hpp" | "secundaria");
    const imtBase = calcularImt(p);
    const { imtFinal } = aplicarImtJovem(p, imtBase, imtMode, calcularImt, region);

    const seloCompraBase = calcularImpostoSeloCompra(p);
    const seloBeneficio = calcularBeneficioSeloCompra(p, imtMode, region);
    const seloCompra = Math.max(0, seloCompraBase - seloBeneficio);

    const l = num(loan);
    const m = parseInt(months, 10) || 0;
    const seloCredito = calcularImpostoSeloCredito(l, m);

    const custosBancarios = num(avaliacao) + num(formalizacao) + num(registoPredial) + num(copiaContrato) + num(dpa) + num(outros);

    const total = imtFinal + seloCompra + seloCredito + custosBancarios;

    setResult({ imt: imtFinal, seloCompra, seloCredito, custosBancarios, total });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <h2 className="text-lg font-semibold text-navy-950">Dados do imóvel e do crédito</h2>
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
              { value: "total", label: "Isenção total" },
              ...(numCompradores === "2"
                ? [{ value: "parcial", label: "Benefício parcial (apenas 1 comprador elegível)" }]
                : []),
            ]}
          />
          <NumberField label="Montante do financiamento" value={loan} onChange={setLoan} suffix="€" />
          <NumberField label="Prazo do crédito" value={months} onChange={setMonths} suffix="meses" />
        </div>

        <h2 className="mt-7 text-lg font-semibold text-navy-950">Custos do banco</h2>
        <p className="mt-1 text-sm text-navy-400">
          Valores típicos pré-preenchidos — ajuste aos custos reais da proposta do banco em causa.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <NumberField label="Comissão de avaliação" value={avaliacao} onChange={setAvaliacao} suffix="€" />
          <NumberField label="Comissão de formalização" value={formalizacao} onChange={setFormalizacao} suffix="€" />
          <NumberField label="Registo predial / direito de preferência" value={registoPredial} onChange={setRegistoPredial} suffix="€" />
          <NumberField label="Cópia do contrato" value={copiaContrato} onChange={setCopiaContrato} suffix="€" />
          <NumberField label="DPA / distrate" value={dpa} onChange={setDpa} suffix="€" />
          <NumberField label="Outros custos" value={outros} onChange={setOutros} suffix="€" />
        </div>

        <Button className="mt-6 w-full sm:w-auto" onClick={handleCalculate}>
          Calcular custos totais
        </Button>
      </Card>

      <div className="lg:col-span-2">
        {result ? (
          <Card className="sticky top-24 border-navy-200 bg-navy-950 text-white">
            <p className="text-sm text-navy-300">Total estimado de custos associados</p>
            <p className="mt-1 text-3xl font-bold text-gold-400">{formatCurrency(result.total)}</p>

            <div className="mt-5 grid gap-3">
              <div className="rounded-xl bg-white/5 p-3">
                <p className="text-xs text-navy-300">IMT</p>
                <p className="mt-1 text-lg font-semibold text-white">{formatCurrency(result.imt)}</p>
              </div>
              <div className="rounded-xl bg-white/5 p-3">
                <p className="text-xs text-navy-300">Imposto do Selo sobre a compra (0,8%)</p>
                <p className="mt-1 text-lg font-semibold text-white">{formatCurrency(result.seloCompra)}</p>
              </div>
              <div className="rounded-xl bg-white/5 p-3">
                <p className="text-xs text-navy-300">Imposto do Selo sobre o financiamento</p>
                <p className="mt-1 text-lg font-semibold text-white">{formatCurrency(result.seloCredito)}</p>
              </div>
              <div className="rounded-xl bg-white/5 p-3">
                <p className="text-xs text-navy-300">Custos do banco</p>
                <p className="mt-1 text-lg font-semibold text-white">{formatCurrency(result.custosBancarios)}</p>
              </div>
            </div>

            <p className="mt-4 text-xs text-navy-300">
              Valores meramente indicativos. Os custos do banco variam consoante a instituição financeira e a
              proposta concreta — confirme sempre com a nossa equipa antes de avançar.
            </p>
          </Card>
        ) : (
          <Card className="flex h-full min-h-[260px] items-center justify-center text-center text-sm text-navy-400">
            Preencha os dados para calcular o total de custos associados à compra.
          </Card>
        )}
      </div>
    </div>
  );
}
