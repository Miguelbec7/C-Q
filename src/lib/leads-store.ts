import { promises as fs } from "fs";
import path from "path";

/**
 * Armazenamento de leads — implementação mínima em ficheiro local, só para
 * desenvolvimento/validação (ver /backoffice/leads). Em ambientes sem sistema de
 * ficheiros persistente (ex.: Cloudflare Workers), a escrita falha silenciosamente
 * e a entrega real do lead continua a acontecer via forwardLeadToWebhook() e/ou
 * sendLeadNotificationEmail(). Pronta para ser substituída por uma base de dados
 * (ex.: Supabase) ou por um CRM externo, sem alterar a interface usada pela API route.
 */
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  service?: string;
  message?: string;
  source?: string;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), ".data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

async function ensureFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(LEADS_FILE);
  } catch {
    await fs.writeFile(LEADS_FILE, "[]", "utf-8");
  }
}

export async function saveLead(lead: Omit<Lead, "id" | "createdAt">): Promise<Lead> {
  const newLead: Lead = {
    ...lead,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  try {
    await ensureFile();
    const leads = await getLeads();
    leads.unshift(newLead);
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (error) {
    console.error("Armazenamento local de leads indisponível neste ambiente", error);
  }

  return newLead;
}

export async function getLeads(): Promise<Lead[]> {
  try {
    await ensureFile();
    const raw = await fs.readFile(LEADS_FILE, "utf-8");
    return JSON.parse(raw) as Lead[];
  } catch {
    return [];
  }
}

export async function forwardLeadToWebhook(lead: Lead): Promise<void> {
  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  if (!webhookUrl) return;

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  }).catch((error) => console.error("Falha ao reencaminhar lead para webhook", error));
}

export async function sendLeadNotificationEmail(lead: Lead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyTo = process.env.LEADS_NOTIFICATION_EMAIL;
  if (!apiKey || !notifyTo) return;

  const lines = [
    `Nome: ${lead.name}`,
    `Email: ${lead.email}`,
    `Telefone: ${lead.phone}`,
    lead.service ? `Serviço: ${lead.service}` : null,
    lead.source ? `Origem: ${lead.source}` : null,
    lead.message ? `Mensagem: ${lead.message}` : null,
  ].filter(Boolean);

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL || "C&Q Finanças <leads@cqfinancas.com>",
      to: notifyTo,
      subject: `Novo contacto no site: ${lead.name}`,
      text: lines.join("\n"),
    }),
  }).catch((error) => console.error("Falha ao enviar email de notificação de lead", error));
}
