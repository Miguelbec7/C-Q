# Backoffice de conteúdos (`/admin`)

O site usa [Decap CMS](https://decapcms.org/) como backoffice de conteúdos sem código,
acessível em `https://www.cqfinancas.pt/admin`. Permite à equipa da C&Q editar artigos do
blog, testemunhos e definições de contacto sem tocar em código — cada alteração gera um
commit no repositório GitHub (ou, em modo de fluxo editorial, um pull request para revisão).

## O que pode ser editado em `/admin`

| Secção no backoffice | Ficheiro(s) afetado(s)        | Conteúdo                                                                 |
| --------------------- | ------------------------------ | ------------------------------------------------------------------------- |
| **Artigos do Blog**   | `content/blog/*.mdx`           | Título, categoria, resumo, SEO, imagem de capa, autor, datas, corpo do artigo |
| **Testemunhos**       | `data/testimonials.json`       | Nome, contexto e citação de cada testemunho de cliente                   |
| **Definições do site**| `data/site-settings.json`      | Contacto (telefone, WhatsApp, email, endereço, horário), registo no Banco de Portugal, redes sociais, parceiros |

### O que **não** está no backoffice (e porquê)

As páginas de serviços, os simuladores e as páginas legais (Política de Privacidade, Termos)
permanecem geridos em código-fonte, não no Decap CMS. Isto é deliberado: estes conteúdos têm
estrutura crítica para SEO, cálculos financeiros e conformidade legal, pelo que beneficiam de
revisão em pull request (com possibilidade de testes automáticos) antes de irem para produção,
em vez de edição livre num formulário. Já o blog, os testemunhos e os dados de contacto são
conteúdo "solto" que muda com frequência e não tem esse risco — por isso foram extraídos para
ficheiros JSON/MDX editáveis sem código.

## Autenticação — GitHub OAuth (passo necessário antes de publicar)

O Decap CMS usa o GitHub como "backend" (`public/admin/config.yml`): cada login em `/admin`
autentica via OAuth do GitHub e cada gravação cria um commit no repositório
`Miguelbec7/C-Q`. Isto exige um **provider OAuth** — um pequeno serviço que faz a troca do
código de autorização do GitHub por um token de acesso, porque o GitHub não permite OAuth
diretamente do browser por razões de segurança (client secret não pode ficar exposto).

Atualmente, `public/admin/config.yml` tem:

```yaml
backend:
  name: github
  repo: Miguelbec7/C-Q # TODO(cliente): confirmar organização/repositório definitivo
  branch: main # TODO(cliente): confirmar o branch de produção
  base_url: https://auth.cqfinancas.pt # TODO(cliente): endpoint do provider OAuth GitHub
```

`base_url` é um **placeholder** — `/admin` não vai funcionar em produção até este endpoint
existir. Duas opções para o implementar:

1. **Cloudflare Worker dedicado** (recomendado, já que o site está em Cloudflare Pages) —
   usar o [`decap-cms-oauth-provider`](https://github.com/sterlingwes/decap-proxy) ou
   equivalente, criar uma app OAuth em GitHub (`Settings → Developer settings → OAuth Apps`)
   apontando o "Authorization callback URL" para `https://auth.cqfinancas.pt/callback`, e
   guardar `OAUTH_GITHUB_CLIENT_ID` / `OAUTH_GITHUB_CLIENT_SECRET` (já documentados em
   `.env.example`) como secrets do Worker.
2. **Netlify Identity / serviço gerido equivalente** — alternativa mais rápida de configurar
   mas acrescenta uma dependência fora do Cloudflare.

Até este endpoint estar ativo, `/admin` mostra um erro de autenticação — o site público
(todas as outras páginas) funciona normalmente, pois é gerado de forma estática e não depende
do CMS em runtime.

## Fluxo de edição

1. Aceder a `https://www.cqfinancas.pt/admin` e autenticar com a conta GitHub autorizada.
2. Escolher a coleção (Blog, Testemunhos ou Definições do site).
3. Editar os campos no formulário e gravar.
4. Como `publish_mode: editorial_workflow` está ativo, cada alteração fica em rascunho/revisão
   dentro do próprio Decap CMS antes de ser publicada (commit em `main`) — permite rever antes
   de o conteúdo ir ao ar.
5. Após publicar, o Cloudflare Pages deteta o novo commit e gera um novo deploy automaticamente
   (ver [`docs/deploy-cloudflare.md`](deploy-cloudflare.md)).

## Imagens

Novas imagens carregadas no backoffice (ex.: capa de artigo) são guardadas em
`public/images/blog/` (`media_folder` em `config.yml`) e ficam acessíveis em `/images/blog/...`.
