"use client";

import { useState, useMemo } from "react";
import { NumberField, SelectField, ResultStat } from "@/components/simulators/SimulatorShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";
import { calcularIMI, type TipoPredio } from "@/lib/calculations/imi";
import { getDistritos, getMunicipiosByDistrito, getMunicipio } from "@/lib/data/imi-municipios";

const TAXA_RUSTICO = "0.80";
const DISTRITOS = getDistritos();

export function ImiSimulator() {
  const [vpt, setVpt] = useState("150000");
  const [distrito, setDistrito] = useState(DISTRITOS[0]);
  const [codigoMunicipio, setCodigoMunicipio] = useState<number>(getMunicipiosByDistrito(DISTRITOS[0])[0]?.codigo ?? 0);
  const [tipoPredio, setTipoPredio] = useState<TipoPredio>("urbano");
  const [taxa, setTaxa] = useState("0.3");
  const [imiFamiliar, setImiFamiliar] = useState(false);
  const [numDependentes, setNumDependentes] = useState("1");
  const [result, setResult] = useState<ReturnType<typeof calcularIMI> | null>(null);

  const concelhos = useMemo(() => getMunicipiosByDistrito(distrito), [distrito]);
  const municipioAtual = useMemo(() => getMunicipio(distrito, codigoMunicipio), [distrito, codigoMunicipio]);
  const taxaIndisponivel = tipoPredio === "urbano" && municipioAtual?.taxa == null;

  function handleDistritoChange(novoDistrito: string) {
    setDistrito(novoDistrito);
    const primeiro = getMunicipiosByDistrito(novoDistrito)[0];
    if (primeiro) {
      setCodigoMunicipio(primeiro.codigo);
      if (tipoPredio === "urbano" && primeiro.taxa != null) setTaxa(String(primeiro.taxa));
    }
  }

  function handleConcelhoChange(codigo: string) {
    const cod = parseInt(codigo, 10);
    setCodigoMunicipio(cod);
    const municipio = getMunicipio(distrito, cod);
    if (tipoPredio === "urbano" && municipio?.taxa != null) setTaxa(String(municipio.taxa));
  }

  function handleTipoPredioChange(novoTipo: TipoPredio) {
    setTipoPredio(novoTipo);
    if (novoTipo === "rustico") {
      setTaxa(TAXA_RUSTICO);
    } else if (municipioAtual?.taxa != null) {
      setTaxa(String(municipioAtual.taxa));
    }
  }

  function handleCalculate() {
    const v = parseFloat(vpt.replace(",", "."));
    const t = parseFloat(taxa.replace(",", "."));
    const dep = parseInt(numDependentes, 10) || 0;
    if (isNaN(v) || v <= 0 || isNaN(t)) return;
    setResult(calcularIMI(v, t, dep, imiFamiliar));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <h2 className="text-lg font-semibold text-navy-950">Dados do imóvel</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <NumberField
            label="Valor Patrimonial Tributário (VPT)"
            value={vpt}
            onChange={setVpt}
            suffix="€"
            tooltip="Valor que consta na caderneta predial do imóvel, usado pela Autoridade Tributária como base para o cálculo do IMI."
          />
          <SelectField
            label="Tipo de prédio"
            value={tipoPredio}
            onChange={(v) => handleTipoPredioChange(v as TipoPredio)}
            options={[
              { value: "urbano", label: "Urbano" },
              { value: "rustico", label: "Rústico" },
            ]}
          />
          <SelectField
            label="Distrito"
            value={distrito}
            onChange={handleDistritoChange}
            options={DISTRITOS.map((d) => ({ value: d, label: d }))}
          />
          <SelectField
            label="Concelho"
            value={String(codigoMunicipio)}
            onChange={handleConcelhoChange}
            options={concelhos.map((m) => ({ value: String(m.codigo), label: m.municipio }))}
          />
          <NumberField
            label="Taxa de IMI do município"
            value={taxa}
            onChange={setTaxa}
            suffix="%"
            disabled={tipoPredio === "rustico"}
            tooltip={
              tipoPredio === "urbano"
                ? "Preenchida automaticamente com a taxa comunicada pelo município à Autoridade Tributária. Cada município define anualmente um valor entre 0,3% e 0,45% para prédios urbanos — pode ajustar manualmente se necessário."
                : "Taxa fixa de 0,8% para prédios rústicos, definida por lei."
            }
          />
        </div>
        {taxaIndisponivel && (
          <p className="mt-3 text-sm text-amber-600">
            O município de {municipioAtual?.municipio} não tem uma taxa única publicada para consulta automática.
            Confirme o valor exato na câmara municipal ou no Portal das Finanças e ajuste o campo acima.
          </p>
        )}

        <div className="mt-5 rounded-xl border border-navy-100 bg-navy-50/60 p-4">
          <label className="flex items-start gap-2.5 text-sm text-navy-700">
            <input
              type="checkbox"
              checked={imiFamiliar}
              onChange={(e) => setImiFamiliar(e.target.checked)}
              className="mt-0.5"
            />
            <span>
              É a minha habitação própria e permanente e quero aplicar a dedução do <strong>IMI Familiar</strong>{" "}
              (por dependente a cargo).
            </span>
          </label>
          {imiFamiliar && municipioAtual?.deducaoFamiliar === false && (
            <p className="mt-2 text-sm text-amber-600">
              O município de {municipioAtual.municipio} não consta como aderente ao regime de IMI Familiar — a
              dedução pode não se aplicar.
            </p>
          )}
          {imiFamiliar && (
            <div className="mt-4 max-w-xs">
              <NumberField label="Número de dependentes a cargo" value={numDependentes} onChange={setNumDependentes} />
            </div>
          )}
        </div>

        <Button className="mt-6 w-full sm:w-auto" onClick={handleCalculate}>
          Calcular IMI
        </Button>
      </Card>

      <div className="lg:col-span-2">
        {result ? (
          <Card className="sticky top-24">
            <p className="text-sm text-navy-400">IMI anual estimado</p>
            <p className="mt-1 text-3xl font-bold text-navy-950">{formatCurrency(result.imiAnual)}</p>
            {result.deducao > 0 && (
              <p className="mt-2 text-sm text-emerald-600">
                Montante antes da dedução: {formatCurrency(result.imiBase)} — já com a dedução de{" "}
                {formatCurrency(result.deducao)} do IMI Familiar.
              </p>
            )}
            <div className="mt-5">
              <ResultStat label="Valor mensal equivalente" value={formatCurrency(result.imiMensal)} />
            </div>

            {result.prestacoes.length > 0 && (
              <div className="mt-5 border-t border-navy-100 pt-4">
                <p className="text-sm font-semibold text-navy-700">Plano de pagamentos</p>
                <div className="mt-2 space-y-1.5">
                  {result.prestacoes.map((prestacao) => (
                    <div key={prestacao.mes} className="flex items-center justify-between text-sm text-navy-600">
                      <span>{prestacao.mes}</span>
                      <span className="font-medium text-navy-900">{formatCurrency(prestacao.valor)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-5 border-t border-navy-100 pt-4">
              <p className="text-sm font-semibold text-navy-700">Notas</p>
              <ul className="mt-2 space-y-2 text-xs leading-relaxed text-navy-400">
                <li>
                  {result.imiAnual <= 100 ? (
                    <>Como o valor de IMI a pagar não excede 100,00€, o pagamento é efetuado numa única prestação, em maio.</>
                  ) : result.imiAnual <= 500 ? (
                    <>
                      Como o valor de IMI a pagar se situa entre 100,00€ e 500,00€, o pagamento pode ser efetuado em
                      duas mensalidades.
                    </>
                  ) : (
                    <>Como o valor de IMI a pagar é superior a 500,00€, o pagamento pode ser efetuado em três mensalidades.</>
                  )}{" "}
                  Despacho n.º 000-A/2019, n.º 2, alínea d). O número de prestações depende do valor final do
                  imposto: até 100€ paga-se tudo em maio; entre 100€ e 500€ paga-se em 2 prestações (maio e
                  novembro); mais de 500€ paga-se em 3 prestações (maio, agosto e novembro).
                </li>
                <li>
                  Nem todas as Câmaras Municipais atribuem deduções por agregado familiar. E, nos casos de se tratar
                  de prédios rústicos, as deduções por agregado não se aplicam.
                </li>
              </ul>
            </div>
          </Card>
        ) : (
          <Card className="flex h-full min-h-[200px] items-center justify-center text-center text-sm text-navy-400">
            Preencha os dados para calcular o IMI estimado.
          </Card>
        )}
      </div>
    </div>
  );
}
