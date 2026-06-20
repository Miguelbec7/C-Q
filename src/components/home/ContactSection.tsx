import { Phone, Mail, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/lib/site-config";

export function ContactSection() {
  return (
    <section className="bg-navy-50/60 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Contacto"
          title="Peça já a sua simulação gratuita"
          description="Preencha o formulário e um especialista C&Q entra em contacto consigo em breve."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold-600" />
                <div>
                  <p className="font-semibold text-navy-950">Telefone</p>
                  <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="text-sm text-navy-500 hover:text-navy-900">
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold-600" />
                <div>
                  <p className="font-semibold text-navy-950">Email</p>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-sm text-navy-500 hover:text-navy-900">
                    {siteConfig.contact.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold-600" />
                <div>
                  <p className="font-semibold text-navy-950">Horário</p>
                  {siteConfig.contact.schedule.map((slot) => (
                    <p key={slot.days} className="text-sm text-navy-500">
                      {slot.days}: {slot.hours}
                    </p>
                  ))}
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-premium-sm lg:col-span-3">
            <LeadForm source="homepage" />
          </div>
        </div>
      </Container>
    </section>
  );
}
