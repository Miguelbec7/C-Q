# C&Q Finanças & Soluções — Website

Website institucional, simuladores de crédito e blog da C&Q Finanças & Soluções, construído em
Next.js (App Router) + TypeScript + Tailwind CSS v4, com backoffice de conteúdos sem código via
Decap CMS.

## Stack

- **Next.js 16** (App Router, React 19) — SSG/SSR híbrido, otimizado para Core Web Vitals.
- **Tailwind CSS v4** — tema de marca (azul-marinho + dourado) definido em `src/app/globals.css`.
- **Decap CMS** (`/admin`) — edição de artigos do blog, testemunhos e definições de contacto sem código.
- **Zod + React Hook Form** — validação de formulários de contacto/simulação.
- **MDX** (`next-mdx-remote`) — artigos do blog em `content/blog/*.mdx`.

## Desenvolvimento local

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

```bash
npm run build     # build de produção
npx tsc --noEmit  # verificação de tipos
```

## Estrutura principal

```
src/app/                 páginas (App Router)
src/components/          componentes React organizados por domínio
src/lib/                 cálculos financeiros, SEO, configuração, dados estáticos
content/blog/            artigos do blog (MDX, editável via /admin)
data/                    definições de contacto e testemunhos (JSON, editável via /admin)
public/admin/            configuração do Decap CMS
docs/                    guias de publicação e checklist de produção
_legacy/                 versão anterior do site (calculadora estática), preservada para referência
```

## Documentação

- [`docs/backoffice.md`](docs/backoffice.md) — como usar o backoffice de conteúdos (`/admin`).
- [`docs/deploy-cloudflare.md`](docs/deploy-cloudflare.md) — publicação no Cloudflare Pages.
- [`docs/checklist-producao.md`](docs/checklist-producao.md) — checklist antes de publicar em produção.

## Dados a substituir pelo cliente

Os valores reais de contacto (telefone, WhatsApp, endereço, registo no Banco de Portugal,
parceiros) estão centralizados em `data/site-settings.json` e podem ser editados diretamente em
`/admin`, sem necessidade de alterar código.
