import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LeadForm } from "@/components/forms/LeadForm";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { getCategoryBySlug } from "@/lib/data/blog-categorias";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.seoDescription,
    path: `/blog/${post.slug}`,
    image: post.coverImage,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const category = getCategoryBySlug(post.category);
  const related = getRelatedPosts(post);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription,
    image: `${siteConfig.url}${post.coverImage}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: siteConfig.name },
  };

  return (
    <div className="bg-white">
      <Breadcrumbs
        items={[
          { label: "Blog", href: "/blog" },
          ...(category ? [{ label: category.title, href: `/blog/categoria/${category.slug}` }] : []),
          { label: post.title, href: `/blog/${post.slug}` },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <div className="bg-navy-950 py-14 sm:py-20">
        <Container className="max-w-3xl">
          {category && (
            <Link
              href={`/blog/categoria/${category.slug}`}
              className="text-xs font-semibold uppercase tracking-wide text-gold-400"
            >
              {category.title}
            </Link>
          )}
          <h1 className="mt-3 text-balance text-3xl font-bold text-white sm:text-4xl">{post.title}</h1>
          <p className="mt-4 text-sm text-navy-300">
            {post.author} · {new Date(post.publishedAt).toLocaleDateString("pt-PT")} · {post.readingMinutes} min de leitura
          </p>
        </Container>
      </div>

      <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[2fr_1fr]">
        <article>
          <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-2xl">
            <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
          </div>
          <div className="prose prose-navy max-w-none prose-headings:font-bold prose-headings:text-navy-950 prose-a:text-navy-900 prose-a:underline">
            <MDXRemote source={post.content} />
          </div>
        </article>

        <aside className="space-y-8">
          <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-premium-sm">
            <h2 className="text-base font-semibold text-navy-950">Peça uma simulação gratuita</h2>
            <p className="mt-1 text-sm text-navy-500">
              Fale com a nossa equipa, sem qualquer compromisso.
            </p>
            <div className="mt-5">
              <LeadForm source={`blog:${post.slug}`} compact />
            </div>
          </div>

          {related.length > 0 && (
            <div>
              <h2 className="text-base font-semibold text-navy-950">Artigos relacionados</h2>
              <ul className="mt-4 space-y-4">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/blog/${item.slug}`} className="text-sm font-medium text-navy-800 hover:text-gold-600">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </Container>
    </div>
  );
}
