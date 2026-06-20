import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Política de Privacidade",
  description: "Política de Privacidade e proteção de dados pessoais da C&Q Finanças & Soluções.",
  path: "/politica-privacidade",
});

export default function PoliticaPrivacidadePage() {
  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ label: "Política de Privacidade", href: "/politica-privacidade" }]} />
      <Container className="max-w-3xl py-14 sm:py-20">
        <h1 className="text-3xl font-bold text-navy-950">Política de Privacidade</h1>
        <p className="mt-2 text-sm text-navy-400">Última atualização: a definir pelo cliente.</p>

        {/* TODO(cliente): rever e validar este texto com um(a) jurista antes de publicar. */}
        <div className="prose prose-navy mt-8 max-w-none space-y-6 text-navy-600">
          <section>
            <h2 className="text-xl font-semibold text-navy-950">1. Responsável pelo tratamento</h2>
            <p className="mt-2 leading-relaxed">
              A {siteConfig.name}, com o NIPC {siteConfig.banking.nipc}, é a responsável pelo tratamento
              dos dados pessoais recolhidos através deste website, enquanto Intermediário de Crédito
              registado no Banco de Portugal ({siteConfig.banking.bdpRegistration}).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">2. Dados recolhidos</h2>
            <p className="mt-2 leading-relaxed">
              Recolhemos os dados que nos fornece através dos formulários de contacto e simulação
              (nome, email, telefone e informação financeira relevante para a simulação), bem como
              dados de navegação recolhidos através de cookies, mediante o seu consentimento.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">3. Finalidade do tratamento</h2>
            <p className="mt-2 leading-relaxed">
              Os dados são utilizados para responder aos seus pedidos de simulação e contacto,
              para a prestação do serviço de intermediação de crédito e, quando autorizado, para
              comunicações de marketing direto.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">4. Partilha de dados</h2>
            <p className="mt-2 leading-relaxed">
              Os seus dados poderão ser partilhados com instituições de crédito e seguradoras parceiras,
              exclusivamente para efeitos de análise e apresentação de propostas de crédito ou seguro,
              nos termos da sua autorização.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">5. Os seus direitos</h2>
            <p className="mt-2 leading-relaxed">
              Tem o direito de acesso, rectificação, eliminação, limitação e oposição ao tratamento dos
              seus dados pessoais, bem como o direito de portabilidade, nos termos do Regulamento Geral
              de Proteção de Dados (RGPD). Pode exercer estes direitos através do email{" "}
              <a href={`mailto:${siteConfig.contact.email}`} className="text-navy-900 underline">
                {siteConfig.contact.email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">6. Cookies</h2>
            <p className="mt-2 leading-relaxed">
              Este website utiliza cookies essenciais ao seu funcionamento e, mediante consentimento,
              cookies de análise e marketing. Pode gerir as suas preferências através do painel de
              cookies disponível no website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">7. Contacto</h2>
            <p className="mt-2 leading-relaxed">
              Para qualquer questão relacionada com esta Política de Privacidade, contacte-nos através
              de {siteConfig.contact.email} ou {siteConfig.contact.phoneDisplay}.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
