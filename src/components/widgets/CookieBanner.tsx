"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "cq-cookie-consent";

type Consent = "accepted" | "rejected";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  function setConsent(value: Consent) {
    window.localStorage.setItem(STORAGE_KEY, value);
    window.dispatchEvent(new CustomEvent("cq-cookie-consent", { detail: value }));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-navy-100 bg-white/95 p-4 backdrop-blur-md sm:p-5">
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Cookie className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold-600" />
          <p className="text-sm text-navy-600">
            Utilizamos cookies para melhorar a sua experiência, analisar tráfego e personalizar conteúdo,
            em conformidade com o RGPD. Consulte a nossa{" "}
            <Link href="/politica-privacidade" className="font-medium text-navy-900 underline">
              Política de Privacidade
            </Link>
            .
          </p>
        </div>
        <div className="flex w-full gap-2 sm:w-auto">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none" onClick={() => setConsent("rejected")}>
            Rejeitar
          </Button>
          <Button variant="primary" size="sm" className="flex-1 sm:flex-none" onClick={() => setConsent("accepted")}>
            Aceitar todos
          </Button>
        </div>
      </div>
    </div>
  );
}

export function getCookieConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(STORAGE_KEY) as Consent | null;
}
