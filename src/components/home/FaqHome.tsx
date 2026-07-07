import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { faqJsonLd } from "@/lib/seo";

const faqs = [
  {
    question: "O serviço da C&Q Finanças & Soluções tem custos?",
    answer:
      "O nosso serviço de intermediação não tem qualquer custo direto para o cliente — somos remunerados pelas instituições financeiras parceiras.",
  },
  {
    question: "A C&Q Finanças & Soluções é uma entidade autorizada?",
    answer:
      "Sim. Somos um Intermediário de Crédito registado no Banco de Portugal, o que garante o cumprimento de todas as obrigações legais e regulatórias.",
  },
  {
    question: "Trabalham com vários bancos ou apenas um?",
    answer:
      "Trabalhamos com múltiplas instituições financeiras parceiras, o que nos permite comparar propostas e negociar em seu nome.",
  },
  {
    question: "Quanto tempo demora a simulação?",
    answer:
      "A simulação online é imediata. Após o envio do pedido, a nossa equipa entra em contacto, normalmente no prazo de 1 dia útil, para uma análise mais detalhada.",
  },
  {
    question: "Posso falar com um especialista antes de decidir?",
    answer:
      "Sim, pode contactar-nos por WhatsApp, telefone ou email, sem qualquer compromisso, para esclarecer dúvidas antes de avançar.",
  },
];

export function FaqHome() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="Perguntas frequentes" title="Ainda tem dúvidas?" />
        <Accordion items={faqs} className="mt-10" />
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />
    </section>
  );
}
