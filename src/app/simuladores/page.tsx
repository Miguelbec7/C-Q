import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { simulators } from "@/lib/data/simuladores";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Simuladores de Crédito Gratuitos",
  description:
    "Simuladores gratuitos de crédito habitação, crédito pessoal, prestação mensal, taxa de esforço, IMT, imposto do selo e poupança na transferência de crédito.",
  path: "/simuladores",
});

export default function SimuladoresPage() {
  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ label: "Simuladores", href: "/simuladores" }]} />
      <div className="bg-navy-950 py-14 sm:py-20">
        <Container>
          <h1 className="max-w-2xl text-balance text-3xl font-bold text-white sm:text-4xl">
            Simuladores gratuitos C&amp;Q
          </h1>
          <p className="mt-4 max-w-2xl text-navy-300">
            Calcule de forma rápida e gratuita a prestação, os impostos e a poupança associados ao seu crédito.
            Resultados imediatos, sem necessidade de registo.
          </p>
        </Container>
      </div>

      <Container className="py-12 sm:py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {simulators.map((sim) => {
            const Icon = sim.icon;
            return (
              <Link
                key={sim.slug}
                href={`/simuladores/${sim.slug}`}
                className="group flex flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-premium-sm transition-all hover:-translate-y-1 hover:shadow-premium"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-navy-950">{sim.title}</h2>
                <p className="mt-2 flex-1 text-sm text-navy-500">{sim.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600">
                  Simular agora
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
