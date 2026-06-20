import { promises as fs } from "fs";
import path from "path";

/**
 * Armazenamento de leads — implementação mínima em ficheiro local.
 * Pronta para ser substituída por uma base de dados (ex.: Supabase) ou
 * por um CRM externo, sem alterar a interface usada pela API route.
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
  await ensureFile();
  const leads = await getLeads();
  const newLead: Lead = {
    ...lead,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  leads.unshift(newLead);
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  return newLead;
}

export async function getLeads(): Promise<Lead[]> {
  await ensureFile();
  const raw = await fs.readFile(LEADS_FILE, "utf-8");
  try {
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
