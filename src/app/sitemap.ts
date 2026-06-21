import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { services } from "@/lib/data/services";
import { simulators } from "@/lib/data/simuladores";
import { blogCategories } from "@/lib/data/blog-categorias";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const { url } = siteConfig;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${url}/sobre`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${url}/contactos`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${url}/intermediario-de-credito`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${url}/servicos`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${url}/simuladores`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${url}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${url}/politica-privacidade`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${url}/termos`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${url}/servicos/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const simulatorRoutes: MetadataRoute.Sitemap = simulators.map((simulator) => ({
    url: `${url}/simuladores/${simulator.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = blogCategories.map((category) => ({
    url: `${url}/blog/categoria/${category.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${url}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...simulatorRoutes, ...categoryRoutes, ...postRoutes];
}
