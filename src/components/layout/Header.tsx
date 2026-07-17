"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SearchBox } from "@/components/widgets/SearchBox";
import { services } from "@/lib/data/services";
import { simulators } from "@/lib/data/simuladores";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Intermediário de Crédito", href: "/intermediario-de-credito" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-navy-100/70 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/logo-mark.png"
            alt=""
            width={48}
            height={30}
            priority
            className="h-8 w-auto sm:h-9"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-[13px] font-bold text-navy-950 sm:text-lg">
              C&amp;Q Finanças &amp; Soluções
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-gold-600">
              Intermediários de Crédito
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:ml-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy-900",
                pathname === link.href && "bg-navy-50 text-navy-900"
              )}
            >
              {link.label}
            </Link>
          ))}

          <DropdownNav
            label="Serviços"
            items={services.map((s) => ({ label: s.shortTitle, href: `/servicos/${s.slug}` }))}
            basePath="/servicos"
          />
          <DropdownNav
            label="Simuladores"
            items={simulators.map((s) => ({ label: s.shortTitle, href: `/simuladores/${s.slug}` }))}
            basePath="/simuladores"
          />

          <Link
            href="/blog"
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy-900",
              pathname?.startsWith("/blog") && "bg-navy-50 text-navy-900"
            )}
          >
            Blog
          </Link>
          <Link
            href="/contactos"
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy-900",
              pathname === "/contactos" && "bg-navy-50 text-navy-900"
            )}
          >
            Contactos
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <SearchBox />
          <Button
            href={`https://wa.me/${siteConfig.contact.whatsapp}`}
            external
            variant="whatsapp"
            size="sm"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </Button>
          <Button href="/simuladores/credito-habitacao" variant="gold" size="sm">
            Simular Gratuitamente
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full p-2 text-navy-900 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-navy-100 bg-white px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-navy-800 hover:bg-navy-50"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <MobileGroup label="Serviços" items={services.map((s) => ({ label: s.title, href: `/servicos/${s.slug}` }))} onNavigate={() => setOpen(false)} />
            <MobileGroup label="Simuladores" items={simulators.map((s) => ({ label: s.title, href: `/simuladores/${s.slug}` }))} onNavigate={() => setOpen(false)} />
            <Link href="/blog" className="rounded-lg px-3 py-2.5 text-sm font-medium text-navy-800 hover:bg-navy-50" onClick={() => setOpen(false)}>
              Blog
            </Link>
            <Link href="/contactos" className="rounded-lg px-3 py-2.5 text-sm font-medium text-navy-800 hover:bg-navy-50" onClick={() => setOpen(false)}>
              Contactos
            </Link>
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <Button href={`https://wa.me/${siteConfig.contact.whatsapp}`} external variant="whatsapp">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </Button>
            <Button href="/simuladores/credito-habitacao" variant="gold">
              Simular Gratuitamente
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

function DropdownNav({
  label,
  items,
  basePath,
}: {
  label: string;
  items: { label: string; href: string }[];
  basePath: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = pathname?.startsWith(basePath);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={cn(
          "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy-900",
          isActive && "bg-navy-50 text-navy-900"
        )}
      >
        {label}
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      {open && (
        <div className="absolute left-0 top-full w-64 pt-2">
          <div className="grid gap-1 rounded-2xl border border-navy-100 bg-white p-2 shadow-premium">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy-900"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileGroup({
  label,
  items,
  onNavigate,
}: {
  label: string;
  items: { label: string; href: string }[];
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-navy-800 hover:bg-navy-50"
      >
        {label}
        <ChevronDown className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")} />
      </button>
      {expanded && (
        <div className="ml-3 flex flex-col gap-1 border-l border-navy-100 pl-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className="rounded-lg px-3 py-2 text-sm text-navy-600 hover:bg-navy-50"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
