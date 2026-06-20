# Publicação no Cloudflare Pages

O site (Next.js 16, App Router) está pronto para publicação no
[Cloudflare Pages](https://pages.cloudflare.com/), que oferece CDN global, certificado SSL
automático e deploys automáticos a partir do GitHub.

## 1. Criar o projeto no Cloudflare Pages

1. Painel Cloudflare → **Workers & Pages** → **Create application** → **Pages** →
   **Connect to Git**.
2. Selecionar o repositório `Miguelbec7/C-Q` e o branch de produção (`main`).
3. Configuração de build:

   | Campo                  | Valor          |
   | ----------------------- | -------------- |
   | Framework preset        | Next.js        |
   | Build command            | `npm run build` |
   | Build output directory   | `.next`        |
   | Root directory            | `/`            |

   > O preset "Next.js" do Cloudflare Pages usa o adaptador
   > [`@cloudflare/next-on-pages`](https://github.com/cloudflare/next-on-pages) automaticamente
   > para suportar SSR/rotas dinâmicas (simuladores, formulários, blog) além das páginas
   > estáticas.

## 2. Variáveis de ambiente

Definir em **Settings → Environment variables** (produção e preview), com base em
`.env.example`:

```
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
LEADS_WEBHOOK_URL=
NEWSLETTER_WEBHOOK_URL=
ANTHROPIC_API_KEY=
BACKOFFICE_USER=
BACKOFFICE_PASSWORD=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
OAUTH_GITHUB_CLIENT_ID=
OAUTH_GITHUB_CLIENT_SECRET=
```

Os valores `NEXT_PUBLIC_*` ficam vazios até o cliente fornecer os IDs reais de
Analytics/GTM/Meta Pixel — o site funciona sem eles (integrações ficam simplesmente inativas).
`BACKOFFICE_USER`/`BACKOFFICE_PASSWORD` protegem o painel de leads (ver
`docs/checklist-producao.md`) e devem ser definidos **antes** de publicar.

## 3. Domínio personalizado

1. **Custom domains** → adicionar `cqfinancas.pt` e `www.cqfinancas.pt`.
2. Apontar o DNS (se o domínio já estiver na Cloudflare, isto é automático; caso contrário,
   seguir as instruções de CNAME apresentadas pela Cloudflare).
3. Confirmar `siteConfig.url` em `src/lib/site-config.ts` corresponde ao domínio definitivo
   (atualmente `https://www.cqfinancas.pt`, marcado como `TODO(cliente)`).

## 4. Deploys automáticos

- Cada `git push` para `main` dispara um deploy de produção.
- Cada pull request gera um deploy de preview com URL único, útil para validar alterações
  (incluindo as publicadas via Decap CMS em modo `editorial_workflow`) antes de irem para `main`.

## 5. Provider OAuth para o Decap CMS

O backoffice (`/admin`) depende de um endpoint OAuth separado (`auth.cqfinancas.pt`) — ver
[`docs/backoffice.md`](backoffice.md) para detalhes. Recomenda-se publicar esse endpoint como
um Cloudflare Worker independente, com o respetivo subdomínio configurado também na Cloudflare.
