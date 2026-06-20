import { ClipboardList, Search, FileCheck2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    icon: ClipboardList,
    title: "1. Conte-nos o seu objetivo",
    description:
      "Preenche um simulador ou formulário com a sua situação financeira e o que pretende: comprar casa, transferir crédito, financiar um projeto.",
  },
  {
    icon: Search,
    title: "2. Comparamos o mercado por si",
    description:
      "A nossa equipa analisa o seu perfil e negoceia com várias instituições financeiras parceiras para encontrar as condições mais vantajosas.",
  },
  {
    icon: FileCheck2,
    title: "3. Acompanhamos até ao fim",
    description:
      "Tratamos da documentação e acompanhamos todo o processo, desde a simulação até à assinatura final, sem custos para si.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-navy-50/60 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Como funciona"
          title="Simples, transparente e sem complicações"
          description="Em três passos, encontra a solução de crédito certa para si — com acompanhamento humano em cada etapa."
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-900 text-gold-400">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-navy-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-500">{step.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
