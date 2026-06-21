import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { simulators, getSimulatorBySlug } from "@/lib/data/simuladores";
import { SimulatorShell } from "@/components/simulators/SimulatorShell";
import { CreditoHabitacaoSimulator } from "@/components/simulators/CreditoHabitacaoSimulator";
import { CreditoPessoalSimulator } from "@/components/simulators/CreditoPessoalSimulator";
import { PrestacaoMensalSimulator } from "@/components/simulators/PrestacaoMensalSimulator";
import { TaxaEsforcoSimulator } from "@/components/simulators/TaxaEsforcoSimulator";
import { ImtSimulator } from "@/components/simulators/ImtSimulator";
import { ImpostoSeloSimulator } from "@/components/simulators/ImpostoSeloSimulator";
import { PoupancaTransferenciaSimulator } from "@/components/simulators/PoupancaTransferenciaSimulator";
import { ImiSimulator } from "@/components/simulators/ImiSimulator";
import { MaisValiasSimulator } from "@/components/simulators/MaisValiasSimulator";
import { SalarioLiquidoSimulator } from "@/components/simulators/SalarioLiquidoSimulator";
import { buildMetadata } from "@/lib/seo";

const SIMULATOR_COMPONENTS: Record<string, React.ComponentType> = {
  "credito-habitacao": CreditoHabitacaoSimulator,
  "credito-pessoal": CreditoPessoalSimulator,
  "prestacao-mensal": PrestacaoMensalSimulator,
  "taxa-de-esforco": TaxaEsforcoSimulator,
  imt: ImtSimulator,
  "imposto-de-selo": ImpostoSeloSimulator,
  "poupanca-transferencia": PoupancaTransferenciaSimulator,
  imi: ImiSimulator,
  "mais-valias-imoveis": MaisValiasSimulator,
  "salario-liquido": SalarioLiquidoSimulator,
};

export function generateStaticParams() {
  return simulators.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sim = getSimulatorBySlug(slug);
  if (!sim) return {};
  return buildMetadata({
    title: sim.title,
    description: sim.metaDescription,
    path: `/simuladores/${sim.slug}`,
  });
}

export default async function SimuladorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sim = getSimulatorBySlug(slug);
  if (!sim) notFound();

  const SimulatorComponent = SIMULATOR_COMPONENTS[sim.slug];

  return (
    <SimulatorShell title={sim.title} description={sim.description} breadcrumbLabel={sim.shortTitle}>
      <SimulatorComponent />
    </SimulatorShell>
  );
}
