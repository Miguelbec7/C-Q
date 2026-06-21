# Publicação no Cloudflare Workers

O site (Next.js 16, App Router, com rotas dinâmicas como simuladores, formulários e
backoffice) é publicado no **Cloudflare Workers** através do adaptador
[`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare) — não através do preset
automático "Next.js" do painel do Cloudflare Pages.

> **Porquê Workers + OpenNext em vez do preset Pages?** O preset "Next.js" do Cloudflare
> Pages usa o adaptador `@cloudflare/next-on-pages`, hoje descontinuado e com suporte
> limitado a funcionalidades recentes do App Router (ex.: Server Actions, alguns padrões
> de cache). O `@opennextjs/cloudflare` é o adaptador atualmente recomendado pela própria
> equipa do Next.js/OpenNext para correr a aplicação completa (SSR, rotas API, middleware)
> em Cloudflare Workers, com melhor compatibilidade e manutenção ativa. Os scripts
> `cf:build`/`cf:preview`/`cf:deploy` já estão configurados no `package.json` para usar
> este caminho.

## 1. Pré-requisitos

- Conta Cloudflare com acesso a **Workers & Pages**.
- `npx wrangler login` (autentica a CLI local com a conta Cloudflare — **passo manual,
  requer credenciais do cliente**; não pode ser feito a partir deste ambiente de
  desenvolvimento).
- Variáveis de ambiente reais preenchidas (ver secção 3).

## 2. Build e deploy

```bash
npm run cf:build     # gera .next, depois converte para .open-next/worker.js + assets
npm run cf:preview   # build + corre localmente num runtime Workers simulado (wrangler dev)
npm run cf:deploy    # build + publica no Cloudflare (wrangler deploy)
```

A configuração do Worker está em `wrangler.jsonc` (nome do projeto, ficheiro de entrada
`.open-next/worker.js`, flag `nodejs_compat`, binding de assets estáticos). O
`open-next.config.ts` usa a configuração por omissão — o site não precisa de cache
incremental (R2) nem de Durable Objects, porque nenhuma página usa `revalidate`/ISR;
todo o conteúdo dinâmico (blog, simuladores) é gerado em build-time ou pedido em tempo
real sem necessidade de cache adicional.

> Nota técnica: o conteúdo do blog é pré-processado em build-time
> (`scripts/generate-blog-data.mjs`, a correr automaticamente via `prebuild`/`predev`)
> para JSON e HTML estático, em vez de ser lido do sistema de ficheiros ou compilado via
> `eval`/`new Function` em tempo de execução — ambos os padrões são bloqueados pelo
> isolamento de segurança do runtime Workers. Esta abordagem é também mais rápida, já
> que elimina qualquer compilação de Markdown a cada pedido.

## 3. Variáveis de ambiente

Os segredos (chaves de API, credenciais) **não** devem ir no `wrangler.jsonc`. Definir
com `wrangler secret put <NOME>` (pede o valor de forma interativa, ou ler de stdin) ou
no painel: **Workers & Pages → cq-financas → Settings → Variables and Secrets**.

```bash
npx wrangler secret put ANTHROPIC_API_KEY
npx wrangler secret put BACKOFFICE_USER
npx wrangler secret put BACKOFFICE_PASSWORD
npx wrangler secret put LEADS_WEBHOOK_URL
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put RESEND_FROM_EMAIL
npx wrangler secret put LEADS_NOTIFICATION_EMAIL
npx wrangler secret put NEWSLETTER_WEBHOOK_URL
npx wrangler secret put TURNSTILE_SECRET_KEY
npx wrangler secret put OAUTH_GITHUB_CLIENT_ID
npx wrangler secret put OAUTH_GITHUB_CLIENT_SECRET
```

`RESEND_API_KEY`, `RESEND_FROM_EMAIL` e `LEADS_NOTIFICATION_EMAIL` ativam o aviso por
email a cada lead novo (ver `sendLeadNotificationEmail` em `src/lib/leads-store.ts`):
criar conta gratuita em [resend.com](https://resend.com), verificar o domínio de envio
(ex.: `cqfinancassolucoes.com`), e definir `RESEND_FROM_EMAIL` com um remetente nesse
domínio (ex.: `C&Q Finanças <leads@cqfinancassolucoes.com>`) e `LEADS_NOTIFICATION_EMAIL`
com o email que deve receber os avisos. Sem estas 3 variáveis definidas, o envio fica
simplesmente inativo (sem erro visível para o utilizador).

Variáveis públicas (`NEXT_PUBLIC_*`) são embutidas no build do Next.js, pelo que devem
estar disponíveis no ambiente **no momento do `npm run cf:build`** (ex.: num ficheiro
`.env.production.local` não commitado, ou exportadas no shell/CI antes do build):

```
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
```

Ficam vazias até o cliente fornecer os IDs reais de Analytics/GTM/Meta Pixel — o site
funciona sem eles (integrações ficam simplesmente inativas).
`BACKOFFICE_USER`/`BACKOFFICE_PASSWORD` protegem o painel de leads (ver
`docs/checklist-producao.md`) e devem ser definidos **antes** de publicar.

## 4. Domínio personalizado

1. **Workers & Pages → cq-financas → Settings → Domains & Routes** → **Add Custom
   Domain** → adicionar `cqfinancassolucoes.com` e `www.cqfinancassolucoes.com`.
2. Como o domínio já está registado na própria conta Cloudflare, o DNS é configurado
   automaticamente ao adicionar o Custom Domain.
3. Confirmar que `siteConfig.url` em `src/lib/site-config.ts` corresponde ao domínio
   definitivo (atualmente `https://cqfinancassolucoes.com`).

## 5. Deploys automáticos a partir do GitHub

A Cloudflare suporta deploys automáticos para Workers ligados a um repositório Git
(**Workers Builds**), de forma semelhante ao que o Pages oferecia:

1. **Workers & Pages → cq-financas → Settings → Builds** → **Connect to Git**.
2. Selecionar o repositório `Miguelbec7/C-Q` e o branch de produção (`main`).
3. Build command: `npm run cf:build`. Deploy command: `npx wrangler deploy`.

Cada `git push` para `main` passa a disparar um deploy de produção automaticamente; pull
requests podem gerar deploys de preview, úteis para validar alterações (incluindo as
publicadas via Decap CMS em modo `editorial_workflow`) antes de irem para `main`.

Alternativa sem integração Git: correr `npm run cf:deploy` manualmente (ou num pipeline
de CI à escolha) sempre que se quiser publicar uma nova versão.

## 6. Provider OAuth para o Decap CMS

O backoffice (`/admin`) usa um provider OAuth incorporado no próprio site (rotas
`/api/decap-oauth/auth` e `/api/decap-oauth/callback`, no mesmo Worker) — ver
[`docs/backoffice.md`](backoffice.md) para os passos de configuração (criar a OAuth App no
GitHub e definir os secrets `OAUTH_GITHUB_CLIENT_ID`/`OAUTH_GITHUB_CLIENT_SECRET`).

## 7. Limitações conhecidas do runtime Workers

O Cloudflare Workers não tem sistema de ficheiros persistente nem permite `eval`/`new
Function` em tempo de execução (restrições de segurança do isolamento V8). O código da
aplicação já foi adaptado a estas restrições:

- Os dados do blog são gerados em build-time para JSON (ver secção 2) em vez de lidos do
  disco em tempo de execução.
- O armazenamento local de leads em `.data/leads.json` (`src/lib/leads-store.ts`) é
  **apenas para desenvolvimento local** — em produção falha silenciosamente (fica
  registado em log, sem quebrar o pedido) porque não existe sistema de ficheiros no
  Worker. A entrega real de leads em produção é feita via `LEADS_WEBHOOK_URL`
  (webhook HTTP para o CRM do cliente) e/ou `RESEND_API_KEY`/`RESEND_FROM_EMAIL`/
  `LEADS_NOTIFICATION_EMAIL` (aviso por email via Resend), ambos por `fetch`, não pelo
  sistema de ficheiros. Ver secção 3 para os detalhes de configuração.
