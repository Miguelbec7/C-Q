import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Termos e Condições",
  description: "Termos e Condições de utilização do website da C&Q Finanças & Soluções.",
  path: "/termos",
});

export default function TermosPage() {
  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ label: "Termos e Condições", href: "/termos" }]} />
      <Container className="max-w-3xl py-14 sm:py-20">
        <h1 className="text-3xl font-bold text-navy-950">Termos e Condições</h1>
        <p className="mt-2 text-sm text-navy-400">Última atualização: a definir pelo cliente.</p>

        {/* TODO(cliente): rever e validar este texto com um(a) jurista antes de publicar. */}
        <div className="prose prose-navy mt-8 max-w-none space-y-6 text-navy-600">
          <section>
            <h2 className="text-xl font-semibold text-navy-950">1. Objeto</h2>
            <p className="mt-2 leading-relaxed">
              Os presentes Termos e Condições regulam o acesso e utilização do website da{" "}
              {siteConfig.name}, incluindo os simuladores de crédito e os formulários de contacto
              disponibilizados.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">2. Natureza do serviço</h2>
            <p className="mt-2 leading-relaxed">
              A {siteConfig.shortName} atua como Intermediário de Crédito registado no Banco de
              Portugal ({siteConfig.banking.bdpRegistration}), prestando serviços de intermediação de
              crédito e seguros junto de instituições financeiras parceiras.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">3. Simuladores</h2>
            <p className="mt-2 leading-relaxed">
              Os resultados apresentados pelos simuladores disponíveis neste website têm carácter
              meramente indicativo e não constituem uma proposta de crédito vinculativa. As condições
              finais dependem da análise de crédito efetuada pela instituição financeira.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">4. Propriedade intelectual</h2>
            <p className="mt-2 leading-relaxed">
              Todo o conteúdo deste website, incluindo textos, imagens, logótipos e código, é propriedade
              da {siteConfig.name} ou dos seus licenciadores, sendo proibida a reprodução sem autorização
              prévia.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">5. Limitação de responsabilidade</h2>
            <p className="mt-2 leading-relaxed">
              A {siteConfig.shortName} não se responsabiliza por decisões tomadas exclusivamente com
              base em resultados de simuladores, recomendando sempre o contacto com um especialista
              antes de qualquer decisão financeira.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">6. Lei aplicável</h2>
            <p className="mt-2 leading-relaxed">
              Os presentes Termos e Condições são regidos pela lei portuguesa, sendo competente o foro
              da comarca de Lisboa para a resolução de qualquer litígio.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">7. Contacto</h2>
            <p className="mt-2 leading-relaxed">
              Para qualquer esclarecimento sobre estes Termos e Condições, contacte-nos através de{" "}
              {siteConfig.contact.email}.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
