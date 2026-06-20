# Checklist antes de publicar em produção

Lista de verificação a percorrer antes de divulgar o site ao público.

## Conteúdo e dados reais

- [ ] Substituir todos os marcadores `TODO(cliente)` no código (procurar por
      `TODO(cliente)` em todo o repositório) por valores reais.
- [ ] Confirmar número de registo no Banco de Portugal e URL de verificação
      (`data/site-settings.json` → `banking.bdpRegistration` / `banking.bdpUrl`).
- [ ] Confirmar NIPC da empresa (`data/site-settings.json` → `banking.nipc`).
- [ ] Substituir telefone, WhatsApp, email e endereço placeholder
      (`data/site-settings.json` → `contact`).
- [ ] Confirmar URL de incorporação do Google Maps (`contact.mapsEmbedUrl`).
- [ ] Substituir testemunhos de exemplo por testemunhos reais de clientes
      (`data/testimonials.json`).
- [ ] Substituir nomes de instituições parceiras de exemplo pelas parcerias reais
      (`data/site-settings.json` → `partners`).
- [ ] Rever a equipa indicada na página `/sobre` (atualmente placeholders).
- [ ] Confirmar domínio definitivo em `src/lib/site-config.ts` (`url`).
- [ ] Rever textos de **Política de Privacidade** (`/politica-privacidade`) e
      **Termos e Condições** (`/termos`) com um(a) jurista — atualmente são placeholders
      genéricos RGPD/Termos, sinalizados no código.

## Integrações e variáveis de ambiente

- [ ] Configurar `NEXT_PUBLIC_GA_ID` (Google Analytics 4).
- [ ] Configurar `NEXT_PUBLIC_GTM_ID` (Google Tag Manager), se aplicável.
- [ ] Configurar `NEXT_PUBLIC_META_PIXEL_ID` (Meta Pixel), se aplicável.
- [ ] Configurar `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (Google Search Console).
- [ ] Configurar `LEADS_WEBHOOK_URL` para encaminhar leads dos formulários para o CRM.
- [ ] Configurar `NEWSLETTER_WEBHOOK_URL` para o fornecedor de email marketing.
- [ ] Configurar `ANTHROPIC_API_KEY` se o chat IA deve usar respostas geradas (caso contrário
      funciona com respostas estáticas).
- [ ] Definir `BACKOFFICE_USER` / `BACKOFFICE_PASSWORD` (Basic Auth do painel de leads interno).
- [ ] Configurar `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` (anti-spam nos
      formulários de contacto/simulação).
- [ ] Configurar o provider OAuth do GitHub para o backoffice (`OAUTH_GITHUB_CLIENT_ID`,
      `OAUTH_GITHUB_CLIENT_SECRET`) e o endpoint `base_url` em `public/admin/config.yml`
      (ver [`docs/backoffice.md`](backoffice.md)).

## Performance e qualidade

- [ ] Correr `npx tsc --noEmit` sem erros.
- [ ] Correr `npm run build` sem erros nem avisos críticos.
- [ ] Correr auditoria Lighthouse (Performance, Acessibilidade, SEO, Boas práticas) em
      páginas-chave (`/`, `/servicos/[slug]`, `/simuladores/[slug]`, `/blog/[slug]`) e confirmar
      tempos de carregamento abaixo de 2s em ligação 4G simulada.
- [ ] Verificar imagens reais (capas de blog, equipa, hero) substituem os placeholders e estão
      otimizadas (formatos AVIF/WebP, dimensões adequadas).

## SEO

- [ ] Confirmar `sitemap.xml` (`/sitemap.xml`) lista todas as páginas esperadas.
- [ ] Confirmar `robots.txt` (`/robots.txt`) aponta para o sitemap e bloqueia `/admin`, `/api`,
      `/backoffice`.
- [ ] Submeter o domínio e o sitemap no Google Search Console.
- [ ] Validar dados estruturados (JSON-LD) com o
      [Rich Results Test](https://search.google.com/test/rich-results) (Organization, FAQPage,
      Article, BreadcrumbList).

## Segurança

- [ ] Confirmar headers de segurança ativos (`Content-Security-Policy`,
      `Strict-Transport-Security`, `X-Frame-Options`, etc. — definidos em `next.config.ts`).
- [ ] Confirmar que `/admin` só é acessível após autenticação OAuth funcional (não deixar o
      backend de CMS exposto sem provider OAuth configurado).
- [ ] Confirmar `BACKOFFICE_USER`/`BACKOFFICE_PASSWORD` não são valores de demonstração.
- [ ] Rever política de cookies/RGPD (`CookieBanner`) e textos legais associados.

## Pós-lançamento

- [ ] Confirmar deploys automáticos do Cloudflare Pages a partir de `main`
      (ver [`docs/deploy-cloudflare.md`](deploy-cloudflare.md)).
- [ ] Configurar alertas/monitorização de uptime.
- [ ] Agendar revisão periódica de conteúdo do blog (novas categorias, novos artigos).
