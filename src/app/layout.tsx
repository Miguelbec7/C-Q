import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { PathAwareShell } from "@/components/layout/PathAwareShell";
import { AnalyticsScripts } from "@/components/widgets/AnalyticsScripts";
import { siteConfig } from "@/lib/site-config";
import { organizationJsonLd } from "@/lib/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: [
    "crédito habitação",
    "intermediário de crédito",
    "transferência de crédito",
    "crédito pessoal",
    "simulação de crédito",
    "Banco de Portugal",
  ],
  verification: siteConfig.integrations.googleSiteVerification
    ? { google: siteConfig.integrations.googleSiteVerification }
    : undefined,
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className={`${inter.variable} ${manrope.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <AnalyticsScripts />
        <PathAwareShell>{children}</PathAwareShell>
      </body>
    </html>
  );
}
