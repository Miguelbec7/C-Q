import Link from "next/link";
import { Home, Calculator, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "Página não encontrada",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 py-20 text-center">
      <p className="text-5xl font-bold text-navy-200">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-navy-950 sm:text-3xl">
        Página não encontrada
      </h1>
      <p className="mt-3 max-w-md text-navy-500">
        O endereço que procura não existe ou foi movido. Tente uma das opções abaixo.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-navy-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
        >
          <Home className="h-4 w-4" />
          Página inicial
        </Link>
        <Link
          href="/simuladores/credito-habitacao"
          className="inline-flex items-center gap-2 rounded-xl border-2 border-navy-200 px-5 py-3 text-sm font-semibold text-navy-800 transition-colors hover:border-navy-400"
        >
          <Calculator className="h-4 w-4" />
          Simular crédito
        </Link>
        <a
          href={`https://wa.me/${siteConfig.contact.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
