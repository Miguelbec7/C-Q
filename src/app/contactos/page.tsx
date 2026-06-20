import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contactos",
  description:
    "Contacte a C&Q Finanças por telefone, email ou WhatsApp. Peça já a sua simulação de crédito gratuita e sem compromisso.",
  path: "/contactos",
});

export default function ContactosPage() {
  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ label: "Contactos", href: "/contactos" }]} />

      <div className="bg-navy-950 py-14 sm:py-20">
        <Container>
          <h1 className="max-w-2xl text-balance text-3xl font-bold text-white sm:text-4xl">
            Vamos falar sobre o seu crédito
          </h1>
          <p className="mt-4 max-w-2xl text-navy-300">
            Tire dúvidas, peça uma simulação ou agende uma conversa com a nossa equipa — sem
            compromisso.
          </p>
        </Container>
      </div>

      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-2">
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl bg-[#25D366]/10 p-5 transition-colors hover:bg-[#25D366]/15"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white">
                <MessageCircle className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-navy-950">Falar no WhatsApp</p>
                <p className="text-sm text-navy-500">Resposta rápida, sem compromisso.</p>
              </div>
            </a>

            <ul className="space-y-5 rounded-2xl border border-navy-100 p-6">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold-600" />
                <div>
                  <p className="font-semibold text-navy-950">Telefone</p>
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                    className="text-sm text-navy-500 hover:text-navy-900"
                  >
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold-600" />
                <div>
                  <p className="font-semibold text-navy-950">Email</p>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-sm text-navy-500 hover:text-navy-900"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold-600" />
                <div>
                  <p className="font-semibold text-navy-950">Endereço</p>
                  <p className="text-sm text-navy-500">
                    {siteConfig.contact.address.street}
                    <br />
                    {siteConfig.contact.address.postalCode} {siteConfig.contact.address.city}
                  </p>
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

            <div className="overflow-hidden rounded-2xl border border-navy-100">
              <iframe
                src={siteConfig.contact.mapsEmbedUrl}
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização da C&Q Finanças"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-premium-sm lg:col-span-3">
            <h2 className="text-lg font-semibold text-navy-950">Pedir simulação ou esclarecimento</h2>
            <p className="mt-1 text-sm text-navy-500">
              Responde-nos com a sua situação e entraremos em contacto brevemente.
            </p>
            <div className="mt-6">
              <LeadForm source="contactos" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
