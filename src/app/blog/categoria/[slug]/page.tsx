import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { blogCategories, getCategoryBySlug } from "@/lib/data/blog-categorias";
import { getPostsByCategory } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return blogCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return buildMetadata({
    title: `Blog · ${category.title}`,
    description: category.description,
    path: `/blog/categoria/${category.slug}`,
  });
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const posts = getPostsByCategory(slug);

  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: category.title, href: `/blog/categoria/${slug}` }]} />

      <div className="bg-navy-950 py-14 sm:py-20">
        <Container>
          <h1 className="max-w-2xl text-balance text-3xl font-bold text-white sm:text-4xl">
            {category.title}
          </h1>
          <p className="mt-4 max-w-2xl text-navy-300">{category.description}</p>
        </Container>
      </div>

      <Container className="py-12 sm:py-16">
        {posts.length === 0 ? (
          <p className="text-navy-500">Ainda não existem artigos publicados nesta categoria.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-premium-sm transition-all hover:-translate-y-1 hover:shadow-premium"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1024px) 30vw, 90vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="text-lg font-semibold text-navy-950">{post.title}</h2>
                  <p className="mt-2 flex-1 text-sm text-navy-500">{post.excerpt}</p>
                  <p className="mt-4 text-xs text-navy-400">{post.readingMinutes} min de leitura</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
