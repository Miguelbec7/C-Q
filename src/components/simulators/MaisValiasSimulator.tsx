"use client";

import { useState } from "react";
import { NumberField, SelectField, ResultStat } from "@/components/simulators/SimulatorShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";
import {
  calcularMaisValias,
  getCoeficienteSugerido,
  type SituacaoImovel,
} from "@/lib/calculations/mais-valias";

const SIM_NAO = [
  { value: "sim", label: "Sim" },
  { value: "nao", label: "Não" },
];

const MESES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const SITUACAO_OPTIONS: { value: SituacaoImovel; label: string }[] = [
  { value: "hpp_12_mais", label: "Era a minha habitação própria e permanente há, pelo menos, 12 meses" },
  { value: "hpp_menos_12", label: "Era a minha habitação própria e permanente há menos de 12 meses" },
  { value: "segunda_arrendamento", label: "Era a minha segunda habitação e vou reinvestir em arrendamento a rendas moderadas" },
  { value: "segunda_sem_reinvestir", label: "Era a minha segunda habitação e não vou reinvestir em arrendamento a rendas moderadas" },
];

function currentYear() {
  return new Date().getFullYear();
}

export function MaisValiasSimulator() {
  const [valorAquisicao, setValorAquisicao] = useState("180000");
  const [anoAquisicao, setAnoAquisicao] = useState("2021");
  const [mesAquisicao, setMesAquisicao] = useState("Junho");
  const [valorVenda, setValorVenda] = useState("300000");
  const [anoVenda, setAnoVenda] = useState(String(currentYear()));
  const [mesVenda, setMesVenda] = useState("Junho");
  const [coeficiente, setCoeficiente] = useState("1.16");

  const [temDespesas, setTemDespesas] = useState(false);
  const [despesas, setDespesas] = useState("0");

  const [vendaParaEntidadePublica, setVendaParaEntidadePublica] = useState(false);
  const [situacaoImovel, setSituacaoImovel] = useState<SituacaoImovel>("hpp_12_mais");

  const [reinvestir, setReinvestir] = useState(false);
  const [valorReinvestido, setValorReinvestido] = useState("0");

  const [amortizarCredito, setAmortizarCredito] = useState(false);
  const [valorAmortizado, setValorAmortizado] = useState("0");

  const [apoioEstado, setApoioEstado] = useState(false);
  const [valorApoioEstado, setValorApoioEstado] = useState("0");
  const [vptImovelAlienado, setVptImovelAlienado] = useState("0");

  const [declaracaoConjunta, setDeclaracaoConjunta] = useState(false);
  const [rendimentoColetavel, setRendimentoColetavel] = useState("15000");

  const [coeficienteIndisponivel, setCoeficienteIndisponivel] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof calcularMaisValias> | null>(null);
  const [activeTab, setActiveTab] = useState<"maisvalia" | "irs">("maisvalia");

  function handleAnoChange(novoAnoAquisicao: string, novoAnoVenda: string) {
    const aq = parseInt(novoAnoAquisicao, 10);
    const vd = parseInt(novoAnoVenda, 10);
    if (isNaN(aq) || isNaN(vd)) return;
    const sugerido = getCoeficienteSugerido(aq, vd);
    setCoeficienteIndisponivel(sugerido === null);
    if (sugerido !== null) setCoeficiente(String(sugerido));
  }

  function handleCalculate() {
    const aquisicao = parseFloat(valorAquisicao.replace(",", "."));
    const venda = parseFloat(valorVenda.replace(",", "."));
    const coef = parseFloat(coeficiente.replace(",", ".")) || 1;
    const desp = temDespesas ? parseFloat(despesas.replace(",", ".")) || 0 : 0;
    if (isNaN(aquisicao) || isNaN(venda) || venda <= 0) return;

    setResult(
      calcularMaisValias({
        valorAquisicao: aquisicao,
        valorVenda: venda,
        coeficiente: coef,
        despesas: desp,
        vendaParaEntidadePublica,
        situacaoImovel,
        reinvestir: situacaoImovel === "hpp_12_mais" && reinvestir,
        valorReinvestido: parseFloat(valorReinvestido.replace(",", ".")) || 0,
        amortizarCredito,
        valorAmortizado: parseFloat(valorAmortizado.replace(",", ".")) || 0,
        apoioEstadoSuperiorA30: apoioEstado,
        valorApoioEstado: parseFloat(valorApoioEstado.replace(",", ".")) || 0,
        vptImovelAlienado: parseFloat(vptImovelAlienado.replace(",", ".")) || 0,
        declaracaoConjunta,
        rendimentoColetavelSemMaisValia: parseFloat(rendimentoColetavel.replace(",", ".")) || 0,
      })
    );
    setActiveTab("maisvalia");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <h2 className="text-lg font-semibold text-navy-950">Cálculo da mais-valia</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <NumberField label="Valor de Aquisição" value={valorAquisicao} onChange={setValorAquisicao} suffix="€" />
          <NumberField
            label="Ano de aquisição"
            value={anoAquisicao}
            step="1"
            onChange={(v) => {
              setAnoAquisicao(v);
              handleAnoChange(v, anoVenda);
            }}
          />
          <SelectField label="Mês de aquisição" value={mesAquisicao} onChange={setMesAquisicao} options={MESES.map((m) => ({ value: m, label: m }))} />

          <NumberField
            label="Valor de Venda"
            value={valorVenda}
            onChange={setValorVenda}
            suffix="€"
            tooltip="Valor de realização — o preço pelo qual vendeu o imóvel."
          />
          <NumberField
            label="Ano de venda"
            value={anoVenda}
            step="1"
            onChange={(v) => {
              setAnoVenda(v);
              handleAnoChange(anoAquisicao, v);
            }}
          />
          <SelectField label="Mês de venda" value={mesVenda} onChange={setMesVenda} options={MESES.map((m) => ({ value: m, label: m }))} />

          <NumberField
            label="Coeficiente de desvalorização da moeda"
            value={coeficiente}
            onChange={setCoeficiente}
            tooltip="Sugerido automaticamente a partir do ano de aquisição e de venda (tabela da Portaria mais recente, ou 1 se faltarem menos de 24 meses entre aquisição e venda). Pode ajustar manualmente."
          />
        </div>
        {coeficienteIndisponivel && (
          <p className="mt-3 text-sm text-amber-600">
            Não temos o coeficiente exato para este ano de aquisição na nossa tabela resumida. Confirme o valor na
            Portaria oficial em vigor e ajuste o campo acima.
          </p>
        )}

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <SelectField
            label="Teve despesas e encargos (obras, IMT, Imposto do Selo, outros)?"
            value={temDespesas ? "sim" : "nao"}
            onChange={(v) => setTemDespesas(v === "sim")}
            options={SIM_NAO}
            tooltip="Obras de valorização comprovadas dos últimos 12 anos, IMT e despesas de escritura pagas na aquisição, comissão de imobiliária na venda, certificado energético, entre outras despesas dedutíveis devidamente faturadas."
          />
          {temDespesas && (
            <NumberField label="Valor das despesas e encargos" value={despesas} onChange={setDespesas} suffix="€" />
          )}
        </div>

        <div className="mt-5">
          <SelectField
            label="A venda foi feita ao Estado, Regiões Autónomas, entidades públicas empresariais na área da habitação ou autarquias locais?"
            value={vendaParaEntidadePublica ? "sim" : "nao"}
            onChange={(v) => setVendaParaEntidadePublica(v === "sim")}
            options={SIM_NAO}
          />
        </div>

        <div className="mt-5">
          <SelectField
            label="O imóvel era a sua habitação própria e permanente ou segunda habitação?"
            value={situacaoImovel}
            onChange={(v) => setSituacaoImovel(v as SituacaoImovel)}
            options={SITUACAO_OPTIONS}
          />
        </div>

        {situacaoImovel === "segunda_arrendamento" && (
          <p className="mt-3 text-sm text-amber-600">
            Este regime depende de condições específicas e não está, em regra, abrangido pela isenção geral por
            reinvestimento (essa exige habitação própria e permanente há pelo menos 12 meses). Nesta simulação a
            mais-valia é tratada como tributável; recomendamos confirmar o seu caso com um especialista.
          </p>
        )}

        {situacaoImovel === "hpp_12_mais" && (
          <div className="mt-5 rounded-xl border border-navy-100 bg-navy-50/60 p-4">
            <SelectField
              label="Pretende reinvestir o valor de realização noutra habitação própria e permanente?"
              value={reinvestir ? "sim" : "nao"}
              onChange={(v) => setReinvestir(v === "sim")}
              options={SIM_NAO}
              tooltip="Reinvestimento até 24 meses antes ou 36 meses depois da venda, numa nova habitação própria e permanente, dá direito a isenção total ou parcial (art. 10º, n.º 5 do CIRS)."
            />
            {reinvestir && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <NumberField label="Valor a reinvestir" value={valorReinvestido} onChange={setValorReinvestido} suffix="€" />
                <SelectField
                  label="Pretende amortizar o crédito habitação com o valor da mais-valia?"
                  value={amortizarCredito ? "sim" : "nao"}
                  onChange={(v) => setAmortizarCredito(v === "sim")}
                  options={SIM_NAO}
                  tooltip="O valor usado para amortizar o empréstimo do imóvel vendido é deduzido ao valor de venda antes de se calcular quanto falta reinvestir."
                />
                {amortizarCredito && (
                  <NumberField label="Valor a amortizar" value={valorAmortizado} onChange={setValorAmortizado} suffix="€" />
                )}
                <SelectField
                  label="Beneficiou de apoio não reembolsável do Estado (>30% do VPT) para este imóvel?"
                  value={apoioEstado ? "sim" : "nao"}
                  onChange={(v) => setApoioEstado(v === "sim")}
                  options={SIM_NAO}
                  tooltip="Se recebeu apoio público não reembolsável superior a 30% do VPT para aquisição, construção ou obras no imóvel vendido, a parte financiada pelo Estado não pode beneficiar da isenção por reinvestimento (art. 10º, n.º 7 do CIRS). Só responda Sim se tiver confirmação documental."
                />
                {apoioEstado && (
                  <>
                    <NumberField label="Valor do apoio recebido" value={valorApoioEstado} onChange={setValorApoioEstado} suffix="€" />
                    <NumberField label="VPT do imóvel alienado" value={vptImovelAlienado} onChange={setVptImovelAlienado} suffix="€" />
                  </>
                )}
              </div>
            )}
          </div>
        )}

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <SelectField
            label="Tem declaração fiscal conjunta?"
            value={declaracaoConjunta ? "sim" : "nao"}
            onChange={(v) => setDeclaracaoConjunta(v === "sim")}
            options={SIM_NAO}
            tooltip="Casados ou unidos de facto com tributação conjunta aplicam o quociente conjugal: o rendimento coletável é dividido por 2 para determinar a taxa, e a coleta final é depois duplicada."
          />
          <NumberField
            label="Rendimento Anual Coletável para IRS (sem a mais-valia)"
            value={rendimentoColetavel}
            onChange={setRendimentoColetavel}
            suffix="€"
            tooltip="Rendimento coletável bruto do agregado, sem contar com esta mais-valia, usado para determinar o escalão de IRS aplicável."
          />
        </div>

        <Button className="mt-6 w-full sm:w-auto" onClick={handleCalculate}>
          Calcular mais-valia
        </Button>
      </Card>

      <div className="lg:col-span-2">
        {result ? (
          <Card className="sticky top-24">
            <p className="text-sm text-navy-400">Imposto a pagar aproximadamente</p>
            <p className="mt-1 text-3xl font-bold text-navy-950">
              {result.isentoTotal ? "Isento" : formatCurrency(result.impostoEstimado)}
            </p>
            {result.isentoTotal && (
              <p className="mt-2 text-sm text-emerald-600">
                Venda isenta por ser feita ao Estado, Regiões Autónomas, entidades públicas empresariais na área da
                habitação ou autarquias locais.
              </p>
            )}
            {!result.isentoTotal && result.fracaoIsenta > 0 && (
              <p className="mt-2 text-sm text-emerald-600">
                {formatCurrency(result.maisValiaTributavel - result.maisValiaTributavelFinal)} isentos com o
                reinvestimento.
              </p>
            )}

            <div className="mt-5 flex gap-2 rounded-xl bg-navy-50 p-1">
              <button
                type="button"
                onClick={() => setActiveTab("maisvalia")}
                className={`flex-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeTab === "maisvalia" ? "bg-white text-navy-950 shadow-sm" : "text-navy-500"
                }`}
              >
                Mais-valia
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("irs")}
                className={`flex-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeTab === "irs" ? "bg-white text-navy-950 shadow-sm" : "text-navy-500"
                }`}
              >
                Imposto em sede de IRS
              </button>
            </div>

            {activeTab === "maisvalia" ? (
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-navy-500">Valor de venda</span><span className="font-medium text-navy-900">{formatCurrency(parseFloat(valorVenda.replace(",", ".")) || 0)}</span></div>
                <div className="flex justify-between"><span className="text-navy-500">Mais-valia</span><span className="font-medium text-navy-900">{formatCurrency(result.maisValia)}</span></div>
                <div className="flex justify-between"><span className="text-navy-500">Parte tributável (50%)</span><span className="font-medium text-navy-900">{formatCurrency(result.maisValiaTributavel)}</span></div>
                <div className="flex justify-between"><span className="text-navy-500">Parte tributável final</span><span className="font-medium text-navy-900">{formatCurrency(result.maisValiaTributavelFinal)}</span></div>
              </div>
            ) : (
              <div className="mt-4 space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-3">
                  <ResultStat label="Rendimento coletável sem mais-valia" value={formatCurrency(result.rendimentoColetavelComMaisValia - result.maisValiaTributavelFinal)} />
                  <ResultStat label="Rendimento coletável com mais-valia" value={formatCurrency(result.rendimentoColetavelComMaisValia)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <ResultStat label="Coleta sem mais-valia" value={formatCurrency(result.coletaSemMaisValia)} />
                  <ResultStat label="Coleta com mais-valia" value={formatCurrency(result.coletaComMaisValia)} />
                </div>
                <ResultStat label="Imposto a pagar (diferença)" value={formatCurrency(result.impostoEstimado)} tone="gold" />
              </div>
            )}

            <p className="mt-4 text-xs text-navy-400">
              A mais-valia tributável é obrigatoriamente somada aos restantes rendimentos do agregado (englobamento)
              e tributada à taxa de IRS resultante do escalão total do agregado. Simulação meramente indicativa.
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
