import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: siteConfig.url },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        item: `${siteConfig.url}${item.href}`,
      })),
    ],
  };

  return (
    <nav aria-label="Breadcrumb" className="border-b border-navy-100 bg-navy-50/60">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto flex max-w-7xl items-center gap-1.5 px-5 py-3 text-xs text-navy-500 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-1 hover:text-navy-900">
          <Home className="h-3.5 w-3.5" />
          Início
        </Link>
        {items.map((item, index) => (
          <span key={item.href} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5" />
            {index === items.length - 1 ? (
              <span className="font-medium text-navy-800">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-navy-900">
                {item.label}
              </Link>
            )}
          </span>
        ))}
      </div>
    </nav>
  );
}
