"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Building2, BadgeEuro, ShieldCheck, ArrowRight, TrendingUp } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const REASONS = [
  {
    icon: Building2,
    headline: "10+ bancos comparados para si",
    body: "Analisamos propostas de várias instituições financeiras para encontrar as melhores condições do mercado para o seu perfil.",
  },
  {
    icon: BadgeEuro,
    headline: "Sem custos para o cliente",
    body: "O nosso serviço de intermediação não tem qualquer custo direto — somos remunerados pelas instituições financeiras parceiras.",
  },
  {
    icon: ShieldCheck,
    headline: "Registados no Banco de Portugal",
    body: `Atividade regulada e supervisionada. Intermediário de Crédito ${siteConfig.banking.bdpRegistration} — pode confirmar no site do BdP.`,
  },
];

export function HeroVisual() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActive((i) => (i + 1) % REASONS.length);
        setFading(false);
      }, 300);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  const r = REASONS[active];
  const Icon = r.icon;

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 shadow-premium backdrop-blur-sm lg:max-w-none">

      <div className="flex items-center gap-2.5 border-b border-white/10 pb-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-400/15">
          <TrendingUp className="h-4 w-4 text-gold-400" />
        </div>
        <span className="text-sm font-semibold text-white">Porquê a C&amp;Q Finanças &amp; Soluções?</span>
      </div>

      <div
        className="min-h-[148px] py-6 transition-opacity duration-300"
        style={{ opacity: fading ? 0 : 1 }}
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-400/15">
          <Icon className="h-5 w-5 text-gold-400" />
        </div>
        <p className="mt-4 text-lg font-semibold text-white">{r.headline}</p>
        <p className="mt-2 text-sm leading-relaxed text-navy-300">{r.body}</p>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 pt-5">
        <div className="flex gap-1.5">
          {REASONS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Razão ${i + 1}`}
              onClick={() => { setFading(false); setActive(i); }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active
                  ? "w-6 bg-gold-400"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
        <Link
          href="/sobre"
          className="flex items-center gap-1 text-xs font-medium text-gold-400 transition-colors hover:text-gold-300"
        >
          Sobre nós
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <Link
        href="/simuladores/credito-habitacao"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gold-400 px-5 py-3.5 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-300"
      >
        Simular gratuitamente
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
