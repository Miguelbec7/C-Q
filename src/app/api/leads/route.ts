import { NextResponse } from "next/server";
import { z } from "zod";
import { saveLead, forwardLeadToWebhook } from "@/lib/leads-store";

const leadSchema = z.object({
  name: z.string().min(2).max(150),
  email: z.string().email(),
  phone: z.string().min(9).max(20),
  service: z.string().max(100).optional(),
  message: z.string().max(2000).optional(),
  source: z.string().max(100).optional(),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const lead = await saveLead(parsed.data);
  await forwardLeadToWebhook(lead);

  return NextResponse.json({ ok: true }, { status: 201 });
}
