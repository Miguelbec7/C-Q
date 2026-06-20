import { ShieldCheck, Handshake, Clock3, BadgeEuro } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Registados no Banco de Portugal",
    description:
      "Atuamos com total transparência e cumprimento regulatório como intermediários de crédito autorizados.",
  },
  {
    icon: Handshake,
    title: "Independência na negociação",
    description:
      "Não estamos limitados a uma única instituição financeira — comparamos propostas para defender o seu interesse.",
  },
  {
    icon: BadgeEuro,
    title: "Sem custos para o cliente",
    description:
      "Na maioria das soluções, o nosso serviço de intermediação não tem qualquer custo direto para quem procura crédito.",
  },
  {
    icon: Clock3,
    title: "Acompanhamento próximo",
    description:
      "Um especialista dedicado acompanha o seu processo do início ao fim, com resposta rápida a todas as questões.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Porquê a C&Q Finanças"
          title="A confiança de quem negoceia em seu nome"
          description="Mais do que comparar taxas, ajudamos a tomar a melhor decisão financeira com segurança e clareza."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div key={reason.title} className="rounded-2xl border border-navy-100 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-50 text-gold-600">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold text-navy-950">{reason.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-500">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
