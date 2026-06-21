import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getServiceBySlug } from "@/lib/data/services";
import { ServicePageContent } from "@/components/services/ServicePageContent";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.title,
    description: service.metaDescription,
    path: `/servicos/${service.slug}`,
    image: service.heroImage,
  });
}

export default async function ServicoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return <ServicePageContent service={service} />;
}
