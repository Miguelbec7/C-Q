import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { blogCategories } from "@/lib/data/blog-categorias";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

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
  readingMinutes: number;
}

function readPostFile(filename: string): BlogPost {
  const slug = filename.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as BlogPostFrontmatter;

  return {
    ...frontmatter,
    coverImage: frontmatter.coverImage || "/images/blog/default-cover.jpg",
    slug,
    content,
    readingMinutes: Math.max(1, Math.ceil(readingTime(content).minutes)),
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  return files
    .map(readPostFile)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return getAllPosts().filter((post) => post.category === categorySlug);
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  return getAllPosts()
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, limit);
}

export function getCategoryWithCount() {
  const posts = getAllPosts();
  return blogCategories.map((category) => ({
    ...category,
    count: posts.filter((post) => post.category === category.slug).length,
  }));
}
