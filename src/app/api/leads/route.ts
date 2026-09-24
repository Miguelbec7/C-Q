import { NextResponse } from "next/server";
import { z } from "zod";
import { saveLead, forwardLeadToWebhook, sendLeadNotificationEmail } from "@/lib/leads-store";

const leadSchema = z.object({
  name: z.string().min(2).max(150),
  email: z.string().email(),
  phone: z.string().min(9).max(20),
  service: z.string().max(100).optional(),
  message: z.string().max(2000).optional(),
  source: z.string().max(100).optional(),
  turnstileToken: z.string().optional(),
});

const MAX_BODY_BYTES = 10_000;

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false; // fail closed — sem segredo configurado, nenhum pedido passa
  if (!token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, response: token, remoteip: ip }),
  });
  const data = await res.json().catch(() => ({ success: false }));
  return data.success === true;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "payload_too_large" }, { status: 413 });
  }

  const body = await request.json().catch(() => null);
  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for") ?? "";
  const token = parsed.data.turnstileToken ?? "";
  const valid = await verifyTurnstile(token, ip);
  if (!valid) {
    return NextResponse.json({ error: "captcha_failed" }, { status: 403 });
  }

  const { turnstileToken: _t, ...leadData } = parsed.data;
  const lead = await saveLead(leadData);
  await Promise.all([forwardLeadToWebhook(lead), sendLeadNotificationEmail(lead)]);

  return NextResponse.json({ ok: true }, { status: 201 });
}
