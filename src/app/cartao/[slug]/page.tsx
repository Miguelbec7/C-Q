import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Globe, Calculator, Download } from "lucide-react";
import { getTeamMember } from "@/lib/data/team";
import { ProfilePhoto } from "@/components/cartao/ProfilePhoto";
import { QRCodeCanvas } from "@/components/cartao/QRCodeCanvas";
import { siteConfig } from "@/lib/site-config";
import type { Metadata } from "next";

export function generateStaticParams() {
  return [{ slug: "miguel" }, { slug: "daniel" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) return {};
  return {
    title: `${member.name} | C&Q Finanças & Soluções`,
    description: `${member.name} — ${member.title}. Intermediário de Crédito em ${member.location}.`,
    robots: { index: false },
  };
}

export default async function CartaoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) notFound();

  const cardUrl = `${siteConfig.url}/cartao/${slug}`;

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-[#f0f4f8] px-4 py-8">
      <div className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-[0_20px_50px_-12px_rgba(7,17,29,0.22)]">

        {/* Navy header */}
        <div className="relative flex justify-center bg-gradient-to-br from-[#07111d] to-[#1d3650] px-6 pb-20 pt-8">
          <Image
            src="/images/logo-cq-white.png"
            alt="C&Q Finanças & Soluções"
            width={140}
            height={42}
            className="h-10 w-auto"
            priority
          />
        </div>

        {/* Profile — overlaps header */}
        <div className="-mt-16 flex flex-col items-center px-6 pb-6">
          <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-[#d9e3ec] shadow-[0_8px_24px_-6px_rgba(7,17,29,0.20)]">
            <ProfilePhoto src={member.photo} name={member.name} />
          </div>

          <h1 className="mt-4 font-display text-2xl font-bold text-[#07111d]">{member.name}</h1>
          <p className="mt-1 text-sm font-medium text-[#ad8226]">{member.title}</p>
          <p className="mt-0.5 text-xs text-[#5780a3]">C&amp;Q Finanças &amp; Soluções</p>

          <div className="mt-2 flex items-center gap-1.5 text-xs text-[#84a4c0]">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
            <span>{member.location}</span>
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex justify-center gap-5">
            <a
              href={`https://wa.me/${member.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25D366] shadow-sm">
                <WhatsAppIcon className="h-7 w-7 text-white" />
              </span>
              <span className="text-[10px] font-medium text-[#3a6086]">WhatsApp</span>
            </a>

            <a
              href={`tel:${member.phone}`}
              className="flex flex-col items-center gap-1.5"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0c1b2b] shadow-sm">
                <Phone className="h-6 w-6 text-white" />
              </span>
              <span className="text-[10px] font-medium text-[#3a6086]">Ligar</span>
            </a>

            <a
              href={`mailto:${member.email}`}
              className="flex flex-col items-center gap-1.5"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0c1b2b] shadow-sm">
                <Mail className="h-6 w-6 text-white" />
              </span>
              <span className="text-[10px] font-medium text-[#3a6086]">Email</span>
            </a>
          </div>

          {/* Save contact */}
          <a
            href={`/cartao/${slug}/vcard`}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#07111d] py-3 text-sm font-semibold text-[#07111d] transition-colors hover:bg-[#07111d] hover:text-white"
          >
            <Download className="h-4 w-4" />
            Guardar Contacto
          </a>
        </div>

        <div className="mx-6 border-t border-[#d9e3ec]" />

        {/* Links */}
        <div className="flex flex-col gap-3 px-6 py-5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#84a4c0]">
            Links Úteis
          </p>

          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl bg-[#f0f4f8] px-4 py-3 transition-colors hover:bg-[#d9e3ec]"
          >
            <Globe className="h-4 w-4 flex-shrink-0 text-[#ad8226]" />
            <div>
              <p className="text-sm font-medium text-[#07111d]">Website</p>
              <p className="text-xs text-[#5780a3]">cqfinancassolucoes.com</p>
            </div>
          </Link>

          <Link
            href="/simuladores/credito-habitacao"
            className="flex items-center gap-3 rounded-xl bg-[#f0f4f8] px-4 py-3 transition-colors hover:bg-[#d9e3ec]"
          >
            <Calculator className="h-4 w-4 flex-shrink-0 text-[#ad8226]" />
            <div>
              <p className="text-sm font-medium text-[#07111d]">Simuladores Gratuitos</p>
              <p className="text-xs text-[#5780a3]">Crédito Habitação · Pessoal · Consolidado</p>
            </div>
          </Link>
        </div>

        <div className="mx-6 border-t border-[#d9e3ec]" />

        {/* QR Code */}
        <div className="flex flex-col items-center gap-2 py-6">
          <QRCodeCanvas url={cardUrl} />
          <p className="text-xs text-[#84a4c0]">Partilha este cartão</p>
        </div>
      </div>

      <p className="mt-6 text-xs text-[#84a4c0]">
        © C&amp;Q Finanças &amp; Soluções · Intermediários de Crédito
      </p>
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
