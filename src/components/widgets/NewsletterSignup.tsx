"use client";

import { useState, useCallback, type FormEvent } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TurnstileWidget } from "@/components/widgets/TurnstileWidget";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "0x4AAAAAAEZ_7GNEAngeqPUs";
  const handleTurnstileSuccess = useCallback((token: string) => setTurnstileToken(token), []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, turnstileToken }),
      });
      if (!response.ok) throw new Error("request_failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 text-sm font-medium text-emerald-700">
        <CheckCircle2 className="h-5 w-5" />
        Subscrição confirmada. Obrigado!
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="O seu email"
            className="w-full rounded-xl border border-navy-200 py-2.5 pl-10 pr-4 outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-100"
          />
        </div>
        <Button type="submit" variant="gold" disabled={status === "loading" || (!!siteKey && !turnstileToken)}>
          {status === "loading" ? "A subscrever…" : "Subscrever"}
        </Button>
      </form>
      {siteKey && status === "idle" && (
        <TurnstileWidget siteKey={siteKey} onSuccess={handleTurnstileSuccess} />
      )}
      {status === "error" && (
        <p className="mt-2 text-xs text-red-300">Ocorreu um erro. Tente novamente.</p>
      )}
    </div>
  );
}
