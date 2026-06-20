import { getLeads } from "@/lib/leads-store";

export const dynamic = "force-dynamic";

export default async function LeadsBackofficePage() {
  const leads = await getLeads();

  return (
    <div className="min-h-screen bg-navy-50 p-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold text-navy-950">Leads recebidas ({leads.length})</h1>
        <p className="mt-1 text-sm text-navy-500">
          Vista mínima para validação local. Em produção, substituir por integração com CRM/Supabase.
        </p>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-navy-100 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-navy-100 text-navy-700">
              <tr>
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Telefone</th>
                <th className="px-4 py-3">Serviço</th>
                <th className="px-4 py-3">Origem</th>
                <th className="px-4 py-3">Mensagem</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-t border-navy-100">
                  <td className="px-4 py-3 whitespace-nowrap text-navy-500">
                    {new Date(lead.createdAt).toLocaleString("pt-PT")}
                  </td>
                  <td className="px-4 py-3 font-medium text-navy-900">{lead.name}</td>
                  <td className="px-4 py-3">{lead.email}</td>
                  <td className="px-4 py-3">{lead.phone}</td>
                  <td className="px-4 py-3">{lead.service || "—"}</td>
                  <td className="px-4 py-3">{lead.source || "—"}</td>
                  <td className="px-4 py-3 max-w-xs truncate">{lead.message || "—"}</td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-navy-400">
                    Ainda sem leads registadas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
