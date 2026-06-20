import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/lib/data/services";

export function ServicesShowcase() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Os nossos serviços"
          title="Soluções de crédito para cada etapa da sua vida"
          description="Comparamos as condições de várias instituições financeiras parceiras para encontrar a solução mais vantajosa para si."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.slug}
                href={`/servicos/${service.slug}`}
                className="group flex flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-premium-sm transition-all hover:-translate-y-1 hover:shadow-premium"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-navy-950">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm text-navy-500">{service.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600">
                  Saber mais
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/servicos"
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy-900 hover:text-gold-600"
          >
            Ver todos os serviços
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
