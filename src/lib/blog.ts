import generatedPosts from "@/lib/data/blog-posts.generated.json";
import { blogCategories } from "@/lib/data/blog-categorias";

export interface BlogPostFrontmatter {
  title: string;
  category: string;
  excerpt: string;
  seoDescription: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
}

export interface BlogPost extends BlogPostFrontmatter {
  slug: string;
  content: string;
  contentHtml: string;
  readingMinutes: number;
}

// Os artigos vêm pré-processados de content/blog/*.mdx pelo script
// scripts/generate-blog-data.mjs (executado via "prebuild"), em vez de lidos
// do sistema de ficheiros em tempo de execução — necessário para correr em
// ambientes serverless/edge sem fs persistente (ex.: Cloudflare Workers).
const posts = generatedPosts as BlogPost[];

export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return posts.filter((post) => post.category === categorySlug);
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  return posts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, limit);
}

export function getCategoryWithCount() {
  return blogCategories.map((category) => ({
    ...category,
    count: posts.filter((post) => post.category === category.slug).length,
  }));
}
