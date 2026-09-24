import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  turnstileToken: z.string().optional(),
});

const MAX_BODY_BYTES = 2_000;

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
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for") ?? "";
  const valid = await verifyTurnstile(parsed.data.turnstileToken ?? "", ip);
  if (!valid) {
    return NextResponse.json({ error: "captcha_failed" }, { status: 403 });
  }

  const webhookUrl = process.env.NEWSLETTER_WEBHOOK_URL;
  if (webhookUrl) {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: parsed.data.email }),
    }).catch((error) => console.error("Falha ao registar newsletter", error));
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
