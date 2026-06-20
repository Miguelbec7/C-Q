import { CheckCircle2, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LeadForm } from "@/components/forms/LeadForm";
import type { ServiceContent } from "@/lib/data/services";
import { siteConfig } from "@/lib/site-config";
import { faqJsonLd } from "@/lib/seo";

export function ServicePageContent({ service }: { service: ServiceContent }) {
  const Icon = service.icon;

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(service.faqs)) }}
      />
      <Breadcrumbs items={[{ label: "Serviços", href: "/servicos" }, { label: service.shortTitle, href: "#" }]} />

      <section className="bg-navy-950 py-14 sm:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center justify-center rounded-xl bg-white/10 p-3 text-gold-400">
              <Icon className="h-7 w-7" />
            </div>
            <h1 className="mt-5 text-balance text-3xl font-bold text-white sm:text-4xl">{service.title}</h1>
            <p className="mt-4 max-w-xl text-balance text-navy-300">{service.summary}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="#contacto" variant="gold">
                Simular Gratuitamente
              </Button>
              <Button href={`https://wa.me/${siteConfig.contact.whatsapp}`} external variant="whatsapp">
                <MessageCircle className="h-4 w-4" />
                Falar no WhatsApp
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Container className="grid gap-12 py-12 sm:py-16 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="space-y-4 text-balance leading-relaxed text-navy-700">
            {service.intro.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <h2 className="mt-10 text-2xl font-bold text-navy-950">Benefícios</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {service.benefits.map((benefit) => (
              <Card key={benefit.title} className="shadow-none">
                <CheckCircle2 className="h-5 w-5 text-gold-600" />
                <h3 className="mt-3 font-semibold text-navy-950">{benefit.title}</h3>
                <p className="mt-1.5 text-sm text-navy-500">{benefit.description}</p>
              </Card>
            ))}
          </div>

          <h2 className="mt-10 text-2xl font-bold text-navy-950">Como funciona o processo</h2>
          <ol className="mt-5 space-y-5">
            {service.process.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-navy-900 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-navy-950">{step.title}</h3>
                  <p className="mt-1 text-sm text-navy-500">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>

          <h2 className="mt-10 text-2xl font-bold text-navy-950">Perguntas frequentes</h2>
          <div className="mt-5">
            <Accordion items={service.faqs} />
          </div>
        </div>

        <div id="contacto" className="lg:col-span-1">
          <Card className="sticky top-24 border-navy-200">
            <h3 className="text-lg font-semibold text-navy-950">Pedir simulação gratuita</h3>
            <p className="mt-1 text-sm text-navy-500">Resposta rápida da nossa equipa, sem compromisso.</p>
            <div className="mt-5">
              <LeadForm defaultService={service.title} source={`servico:${service.slug}`} compact />
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}
