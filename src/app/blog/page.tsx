import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { NewsletterSignup } from "@/components/widgets/NewsletterSignup";
import { getAllPosts } from "@/lib/blog";
import { getCategoryWithCount } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Artigos sobre crédito habitação, transferência de crédito, fiscalidade e finanças pessoais pela equipa da C&Q Finanças & Soluções.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getCategoryWithCount().filter((c) => c.count > 0);

  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }]} />

      <div className="bg-navy-950 py-14 sm:py-20">
        <Container>
          <h1 className="max-w-2xl text-balance text-3xl font-bold text-white sm:text-4xl">
            Blog C&amp;Q Finanças
          </h1>
          <p className="mt-4 max-w-2xl text-navy-300">
            Artigos práticos sobre crédito, fiscalidade e finanças pessoais para o ajudar a decidir
            com mais confiança.
          </p>
          <div className="mt-8 max-w-md rounded-2xl bg-white/5 p-5">
            <p className="text-sm font-medium text-white">Receba novos artigos por email</p>
            <div className="mt-3">
              <NewsletterSignup />
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-12 sm:py-16">
        <div className="flex flex-wrap gap-2">
          <Link
            href="/blog"
            className="rounded-full bg-navy-900 px-4 py-1.5 text-sm font-medium text-white"
          >
            Todos
          </Link>
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/blog/categoria/${category.slug}`}
              className="rounded-full border border-navy-200 px-4 py-1.5 text-sm font-medium text-navy-700 hover:border-navy-400"
            >
              {category.title} ({category.count})
            </Link>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                <span className="text-xs font-semibold uppercase tracking-wide text-gold-600">
                  {categories.find((c) => c.slug === post.category)?.title ?? post.category}
                </span>
                <h2 className="mt-2 text-lg font-semibold text-navy-950">{post.title}</h2>
                <p className="mt-2 flex-1 text-sm text-navy-500">{post.excerpt}</p>
                <p className="mt-4 text-xs text-navy-400">{post.readingMinutes} min de leitura</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
