import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { InstagramIcon, FacebookIcon, LinkedinIcon } from "@/components/icons/SocialIcons";
import { Container } from "@/components/ui/Container";
import { services } from "@/lib/data/services";
import { simulators } from "@/lib/data/simuladores";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-navy-100 bg-navy-950 text-navy-100">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/logo-mark-white.png"
                alt=""
                width={48}
                height={30}
                className="h-9 w-auto"
              />
              <span className="flex flex-col leading-tight">
                <span className="font-display text-lg font-bold text-white">C&amp;Q Finanças</span>
                <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-gold-400">
                  Intermediários de Crédito
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-300">
              {siteConfig.description}
            </p>
            <p className="mt-4 text-xs text-navy-400">
              Intermediário de Crédito registado no Banco de Portugal, {siteConfig.banking.bdpRegistration}.
            </p>
            <div className="mt-5 flex gap-3">
              <SocialIcon href={siteConfig.social.instagram} label="Instagram">
                <InstagramIcon className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href={siteConfig.social.facebook} label="Facebook">
                <FacebookIcon className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href={siteConfig.social.linkedin} label="LinkedIn">
                <LinkedinIcon className="h-4 w-4" />
              </SocialIcon>
            </div>
          </div>

          <FooterColumn
            title="Serviços"
            links={services.map((s) => ({ label: s.shortTitle, href: `/servicos/${s.slug}` }))}
          />
          <FooterColumn
            title="Simuladores"
            links={simulators.map((s) => ({ label: s.shortTitle, href: `/simuladores/${s.slug}` }))}
          />

          <div>
            <h3 className="text-sm font-semibold text-white">Contactos</h3>
            <ul className="mt-4 space-y-3 text-sm text-navy-300">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-400" />
                <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="hover:text-white">
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-400" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-400" />
                <span>
                  {siteConfig.contact.address.street}
                  <br />
                  {siteConfig.contact.address.postalCode} {siteConfig.contact.address.city}
                </span>
              </li>
            </ul>
            <Link
              href="/blog"
              className="mt-5 inline-block text-sm font-medium text-gold-400 hover:text-gold-300"
            >
              Ler o blog →
            </Link>
          </div>
        </div>

        <div className="mt-12 border-t border-navy-800 pt-6 text-[11px] leading-relaxed text-navy-500">
          <p>
            {siteConfig.name} marca registada da {siteConfig.name}, Lda, com sede na{" "}
            {siteConfig.contact.address.street}, {siteConfig.contact.address.postalCode}{" "}
            {siteConfig.contact.address.city}, registado como intermediário de crédito junto do Banco de
            Portugal sob o {siteConfig.banking.bdpRegistration} (telefone n.º{" "}
            {siteConfig.contact.phoneDisplay}; email {siteConfig.contact.email}), registo que pode ser
            confirmado através da hiperligação{" "}
            <a href={siteConfig.banking.bdpUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-navy-300">
              {siteConfig.banking.bdpUrl}
            </a>
            , intermediário de crédito vinculado sem exclusividade, com contratos com as entidades
            mutuantes: {siteConfig.partners.map((p) => p.name).join("; ")}. Autorizado a prestar serviços
            de apresentação ou proposta de contratos de crédito a consumidores, assistência a consumidores,
            mediante a realização de atos preparatórios ou de outros trabalhos de gestão pré-contratual
            relativamente a contratos de crédito que não tenham sido por si apresentados ou propostos e
            autorização para serviços de consultoria. Atividade sujeita à supervisão do Banco de Portugal.
            Seguros de responsabilidade civil junto da Zurich Insurance Europe AG - Sucursal em Portugal
            com a apólice nº 010033277 e 010032971 válidas de 16/06/2026 até 16/06/2027 e de 12/06/2026 até
            12/06/2027. Os serviços prestados, nos termos da legislação aplicável, são gratuitos para o
            consumidor.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-navy-800 pt-6 text-xs text-navy-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <div className="flex gap-5">
            <Link href="/intermediario-de-credito" className="hover:text-white">
              Intermediário de Crédito
            </Link>
            <Link href="/politica-privacidade" className="hover:text-white">
              Política de Privacidade
            </Link>
            <Link href="/termos" className="hover:text-white">
              Termos e Condições
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-sm text-navy-300">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-800 text-navy-100 transition-colors hover:bg-gold-400 hover:text-navy-950"
    >
      {children}
    </a>
  );
}
