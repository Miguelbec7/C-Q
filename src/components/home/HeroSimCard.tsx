"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const SCENARIOS = [
  {
    type: "Crédito Habitação",
    eyebrow: "Prestação estimada",
    value: "€612",
    unit: "/mês",
    detail: "Taxa mista 3,70% · 30 anos",
    href: "/simuladores/credito-habitacao",
  },
  {
    type: "Transferência de Crédito",
    eyebrow: "Poupança estimada",
    value: "€127",
    unit: "/mês",
    detail: "Ao mudar para melhores condições",
    href: "/simuladores/poupanca-transferencia",
  },
  {
    type: "Crédito Pessoal",
    eyebrow: "Prestação estimada",
    value: "€193",
    unit: "/mês",
    detail: "€10 000 · 60 meses · TAEG 6,5%",
    href: "/simuladores/credito-pessoal",
  },
];

export function HeroSimCard() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % SCENARIOS.length);
        setFading(false);
      }, 300);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  const s = SCENARIOS[index];

  return (
    <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/95 p-4 shadow-premium backdrop-blur">
      <div
        className="transition-opacity duration-300"
        style={{ opacity: fading ? 0 : 1 }}
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-navy-500">
            {s.type}
          </span>
          <span className="text-[10px] text-navy-300">Exemplo ilustrativo</span>
        </div>
        <p className="text-xs font-medium uppercase tracking-wide text-navy-400">{s.eyebrow}</p>
        <p className="mt-1 text-2xl font-bold text-navy-950">
          {s.value}
          <span className="text-sm font-medium text-navy-400">{s.unit}</span>
        </p>
        <p className="mt-1 text-xs text-emerald-600">{s.detail}</p>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-navy-100 pt-3">
        <div className="flex gap-1.5">
          {SCENARIOS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ver cenário ${i + 1}`}
              onClick={() => {
                setFading(false);
                setIndex(i);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-4 bg-navy-950" : "w-1.5 bg-navy-200 hover:bg-navy-400"
              }`}
            />
          ))}
        </div>
        <Link
          href={s.href}
          className="flex items-center gap-1 text-xs font-medium text-gold-700 hover:text-gold-800 transition-colors"
        >
          Simule o seu caso
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
