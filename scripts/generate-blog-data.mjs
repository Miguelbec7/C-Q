import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const OUTPUT_FILE = path.join(process.cwd(), "src", "lib", "data", "blog-posts.generated.json");

// O HTML é compilado em build-time (em vez de em runtime com next-mdx-remote)
// porque o Cloudflare Workers bloqueia geração de código a partir de strings
// (new Function/eval), que é como o MDXRemote compila Markdown no servidor.
const markdownToHtml = unified().use(remarkParse).use(remarkRehype).use(rehypeStringify);

function readPost(filename) {
  const slug = filename.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
  const { data, content } = matter(raw);

  return {
    ...data,
    coverImage: data.coverImage || "/images/blog/default-cover.jpg",
    slug,
    content,
    contentHtml: String(markdownToHtml.processSync(content)),
    readingMinutes: Math.max(1, Math.ceil(readingTime(content).minutes)),
  };
}

const files = fs.existsSync(BLOG_DIR) ? fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx")) : [];
const posts = files
  .map(readPost)
  .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2) + "\n", "utf-8");
console.log(`Dados do blog gerados: ${posts.length} artigo(s) em ${path.relative(process.cwd(), OUTPUT_FILE)}`);
