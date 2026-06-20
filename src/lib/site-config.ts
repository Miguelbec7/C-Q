import siteSettings from "../../data/site-settings.json";

/**
 * Configuração central do site.
 * Os campos em data/site-settings.json (contacto, registo BdP, redes sociais,
 * parceiros) são editáveis sem código através do backoffice (/admin).
 * TODO(cliente): substituir os restantes valores placeholder (nome de domínio).
 */
export const siteConfig = {
  name: "C&Q Finanças & Soluções",
  shortName: "C&Q Finanças",
  tagline: "Intermediários de Crédito",
  description:
    "A C&Q Finanças & Soluções é uma empresa de intermediação de crédito registada no Banco de Portugal, especializada em crédito habitação, transferência de crédito, crédito pessoal e seguros. Simulação gratuita e acompanhamento personalizado.",
  url: "https://www.cqfinancas.pt", // TODO(cliente): domínio definitivo
  locale: "pt-PT",

  contact: siteSettings.contact,
  banking: siteSettings.banking,
  social: siteSettings.social,
  partners: siteSettings.partners,

  integrations: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID ?? "",
    googleTagManagerId: process.env.NEXT_PUBLIC_GTM_ID ?? "",
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
    googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
