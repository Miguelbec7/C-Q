import type { NextConfig } from "next";

const baseSecurityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

// CSP do site público: permite GTM/GA4/Meta Pixel e o mapa incorporado do Google.
const siteCsp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://elfsightcdn.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://www.facebook.com https://api.anthropic.com https://elfsightcdn.com https://*.elfsight.com",
  "frame-src 'self' https://www.google.com https://www.googletagmanager.com https://*.elfsight.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

// CSP do /admin (Decap CMS): precisa de carregar o bundle via CDN e falar com a API do GitHub.
const adminCsp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com https://cdn.jsdelivr.net",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://api.github.com https://github.com",
  "frame-src 'self' https://github.com",
  "object-src 'none'",
  "base-uri 'self'",
].join("; ");

const nextConfig: NextConfig = {
  // Build standalone necessário para o adaptador @opennextjs/cloudflare (deploy em Cloudflare Workers).
  output: "standalone",
  async headers() {
    return [
      {
        source: "/admin/:path*",
        headers: [...baseSecurityHeaders, { key: "Content-Security-Policy", value: adminCsp }],
      },
      {
        source: "/:path*",
        headers: [...baseSecurityHeaders, { key: "Content-Security-Policy", value: siteCsp }],
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
