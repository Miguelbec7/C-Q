/**
 * Configuração central do site.
 * TODO(cliente): substituir todos os valores placeholder pelos dados reais da C&Q Finanças.
 */
export const siteConfig = {
  name: "C&Q Finanças & Soluções",
  shortName: "C&Q Finanças",
  tagline: "Intermediários de Crédito",
  description:
    "A C&Q Finanças & Soluções é uma empresa de intermediação de crédito registada no Banco de Portugal, especializada em crédito habitação, transferência de crédito, crédito pessoal e seguros. Simulação gratuita e acompanhamento personalizado.",
  url: "https://www.cqfinancas.pt", // TODO(cliente): domínio definitivo
  locale: "pt-PT",

  contact: {
    phone: "+351 210 000 000", // TODO(cliente): número real
    phoneDisplay: "210 000 000",
    whatsapp: "351910000000", // TODO(cliente): nº WhatsApp Business (formato internacional sem "+")
    email: "geral@cqfinancas.com",
    address: {
      street: "Av. da República, 100", // TODO(cliente)
      postalCode: "1050-000",
      city: "Lisboa",
      country: "Portugal",
    },
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d-9.1500!3d38.7300!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zQ-VTSyBGaW5hbmNhcw!5e0!3m2!1spt-PT!2spt!4v0", // TODO(cliente)
    schedule: [
      { days: "Segunda a Sexta", hours: "09:00 – 19:00" },
      { days: "Sábado", hours: "10:00 – 13:00 (mediante marcação)" },
    ],
  },

  banking: {
    bdpRegistration: "n.º XXXXX", // TODO(cliente): nº de registo no Banco de Portugal
    bdpUrl: "https://www.bportugal.pt/intermediariocreditohabitacao",
    nipc: "PT 500 000 000", // TODO(cliente)
  },

  social: {
    instagram: "https://instagram.com/cqfinancas",
    facebook: "https://facebook.com/cqfinancas",
    linkedin: "https://linkedin.com/company/cqfinancas",
  },

  partners: [
    { name: "Banco A", logo: "/images/partners/placeholder-1.svg" },
    { name: "Banco B", logo: "/images/partners/placeholder-2.svg" },
    { name: "Banco C", logo: "/images/partners/placeholder-3.svg" },
    { name: "Banco D", logo: "/images/partners/placeholder-4.svg" },
    { name: "Banco E", logo: "/images/partners/placeholder-5.svg" },
    { name: "Banco F", logo: "/images/partners/placeholder-6.svg" },
  ],

  integrations: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID ?? "",
    googleTagManagerId: process.env.NEXT_PUBLIC_GTM_ID ?? "",
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
    googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
