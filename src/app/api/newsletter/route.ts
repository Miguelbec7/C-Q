import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({ email: z.string().email() });

/**
 * Endpoint pronto para ligar a um fornecedor de email marketing
 * (ex.: Mailchimp, Brevo) através de NEWSLETTER_WEBHOOK_URL.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const webhookUrl = process.env.NEWSLETTER_WEBHOOK_URL;
  if (webhookUrl) {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    }).catch((error) => console.error("Falha ao registar newsletter", error));
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
