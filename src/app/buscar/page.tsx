import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { services } from "@/lib/data/services";
import { simulators } from "@/lib/data/simuladores";
import { getAllPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pesquisa",
  description: "Pesquise artigos, serviços e simuladores no website da C&Q Finanças & Soluções.",
  path: "/buscar",
});

interface SearchResult {
  title: string;
  description: string;
  href: string;
  type: string;
}

function matches(query: string, ...fields: string[]) {
  const q = query.toLowerCase();
  return fields.some((field) => field.toLowerCase().includes(q));
}

function search(query: string): SearchResult[] {
  if (!query.trim()) return [];

  const serviceResults: SearchResult[] = services
    .filter((s) => matches(query, s.title, s.summary))
    .map((s) => ({ title: s.title, description: s.summary, href: `/servicos/${s.slug}`, type: "Serviço" }));

  const simulatorResults: SearchResult[] = simulators
    .filter((s) => matches(query, s.title, s.description))
    .map((s) => ({ title: s.title, description: s.description, href: `/simuladores/${s.slug}`, type: "Simulador" }));

  const postResults: SearchResult[] = getAllPosts()
    .filter((p) => matches(query, p.title, p.excerpt, p.content))
    .map((p) => ({ title: p.title, description: p.excerpt, href: `/blog/${p.slug}`, type: "Artigo" }));

  return [...serviceResults, ...simulatorResults, ...postResults];
}

export default async function BuscarPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = search(q);

  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ label: "Pesquisa", href: "/buscar" }]} />

      <Container className="py-12 sm:py-16">
        <h1 className="text-2xl font-bold text-navy-950">
          {q ? `Resultados para "${q}"` : "Pesquisar no site"}
        </h1>
        <p className="mt-2 text-sm text-navy-500">
          {q
            ? `${results.length} resultado${results.length === 1 ? "" : "s"} encontrado${results.length === 1 ? "" : "s"}.`
            : "Utilize a barra de pesquisa no topo do site para encontrar artigos, serviços e simuladores."}
        </p>

        <div className="mt-8 space-y-4">
          {results.map((result) => (
            <Link
              key={result.href}
              href={result.href}
              className="group flex items-center justify-between rounded-2xl border border-navy-100 p-5 transition-colors hover:border-navy-300"
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-gold-600">
                  {result.type}
                </span>
                <h2 className="mt-1 font-semibold text-navy-950">{result.title}</h2>
                <p className="mt-1 text-sm text-navy-500">{result.description}</p>
              </div>
              <ArrowRight className="h-5 w-5 flex-shrink-0 text-navy-400 transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>

        {q && results.length === 0 && (
          <p className="mt-6 text-navy-500">
            Não encontrámos resultados. Tente outros termos ou{" "}
            <Link href="/contactos" className="font-medium text-navy-900 underline">
              contacte a nossa equipa
            </Link>
            .
          </p>
        )}
      </Container>
    </div>
  );
}
