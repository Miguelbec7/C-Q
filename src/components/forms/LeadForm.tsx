"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";
import { TurnstileWidget } from "@/components/widgets/TurnstileWidget";

const leadSchema = z.object({
  name: z.string().min(2, "Indique o seu nome completo"),
  email: z.string().email("Indique um email válido"),
  phone: z.string().min(9, "Indique um contacto telefónico válido"),
  service: z.string().optional(),
  message: z.string().optional(),
  rgpd: z.literal(true, { message: "Tem de aceitar a Política de Privacidade" }),
});

type LeadFormValues = z.infer<typeof leadSchema>;

const SERVICE_OPTIONS = [
  "Crédito Habitação",
  "Transferência de Crédito",
  "Crédito Construção",
  "Crédito Pessoal",
  "Crédito Consolidado",
  "Outro assunto",
];

export function LeadForm({
  defaultService,
  source,
  compact = false,
}: {
  defaultService?: string;
  source?: string;
  compact?: boolean;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "0x4AAAAAAEZ_7GNEAngeqPUs";

  const handleTurnstileSuccess = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: { service: defaultService ?? "" },
  });

  async function onSubmit(values: LeadFormValues) {
    setSubmitError(false);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source, turnstileToken }),
      });
      if (!response.ok) throw new Error("request_failed");
      setSubmitted(true);
      reset();
    } catch {
      setSubmitError(true);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        <p className="font-semibold text-emerald-800">Pedido enviado com sucesso!</p>
        <p className="text-sm text-emerald-700">
          A nossa equipa irá contactá-lo brevemente. Obrigado por confiar na C&amp;Q Finanças &amp; Soluções.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <div>
          <input
            {...register("name")}
            placeholder="Nome completo"
            className="w-full rounded-xl border border-navy-200 px-4 py-2.5 outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-100"
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <input
            {...register("phone")}
            placeholder="Telefone"
            className="w-full rounded-xl border border-navy-200 px-4 py-2.5 outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-100"
          />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="w-full rounded-xl border border-navy-200 px-4 py-2.5 outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-100"
        />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <select
          {...register("service")}
          className="w-full rounded-xl border border-navy-200 px-4 py-2.5 outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-100"
        >
          <option value="">Em que podemos ajudar?</option>
          {SERVICE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <textarea
          {...register("message")}
          placeholder="Mensagem (opcional)"
          rows={3}
          className="w-full rounded-xl border border-navy-200 px-4 py-2.5 outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-100"
        />
      </div>

      <label className="flex items-start gap-2.5 text-xs text-navy-500">
        <input type="checkbox" {...register("rgpd")} className="mt-0.5" />
        Aceito a{" "}
        <a href="/politica-privacidade" className="font-medium text-navy-800 underline">
          Política de Privacidade
        </a>{" "}
        e autorizo o contacto pela C&amp;Q Finanças &amp; Soluções.
      </label>
      {errors.rgpd && <p className="text-xs text-red-600">{errors.rgpd.message}</p>}

      {submitError && (
        <p className="text-xs text-red-600">
          Ocorreu um erro ao enviar o pedido. Tente novamente ou contacte-nos por WhatsApp.
        </p>
      )}

      {siteKey && (
        <TurnstileWidget siteKey={siteKey} onSuccess={handleTurnstileSuccess} />
      )}

      <Button type="submit" disabled={isSubmitting || (!!siteKey && !turnstileToken)} className="w-full">
        {isSubmitting ? "A enviar…" : "Pedir simulação gratuita"}
      </Button>
    </form>
  );
}
