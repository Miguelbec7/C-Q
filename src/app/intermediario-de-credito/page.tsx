import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Intermediário de Crédito",
  description:
    "Informação legal sobre a atividade de intermediário de crédito da C&Q Finanças & Soluções, nos termos do Decreto-Lei n.º 81-C/2017.",
  path: "/intermediario-de-credito",
});

export default function IntermediarioDeCreditoPage() {
  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ label: "Intermediário de Crédito", href: "/intermediario-de-credito" }]} />
      <Container className="max-w-3xl py-14 sm:py-20">
        <h1 className="text-3xl font-bold text-navy-950">Intermediário de Crédito</h1>

        <div className="prose prose-navy mt-8 max-w-none space-y-6 text-navy-600">
          <section>
            <h2 className="text-xl font-semibold text-navy-950">Identificação do Intermediário</h2>
            <p className="mt-2 leading-relaxed">
              Denominação do intermediário de crédito: &ldquo;{siteConfig.name}&rdquo;, marca registada
              propriedade da {siteConfig.name}, Lda. (doravante, &ldquo;{siteConfig.name}&rdquo;).
            </p>
            <p className="mt-2 leading-relaxed">
              Sede: {siteConfig.contact.address.street}, {siteConfig.contact.address.postalCode}{" "}
              {siteConfig.contact.address.city}
              <br />
              NIPC: {siteConfig.banking.nipc}
              <br />
              Telefone: {siteConfig.contact.phoneDisplay} (dias úteis, das 09h00 às 18h00)
              <br />
              E-mail: {siteConfig.contact.email}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">Registo no Banco de Portugal</h2>
            <p className="mt-2 leading-relaxed">
              A {siteConfig.name} encontra-se registada como intermediário de crédito junto do Banco de
              Portugal sob o número {siteConfig.banking.bdpRegistration}.
            </p>
            <p className="mt-2 leading-relaxed">
              Este registo pode ser confirmado através da seguinte hiperligação:{" "}
              <a
                href={siteConfig.banking.bdpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gold-600 hover:underline"
              >
                {siteConfig.banking.bdpUrl}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">Natureza da Atividade</h2>
            <p className="mt-2 leading-relaxed">
              A {siteConfig.name} exerce a sua atividade como intermediário de crédito vinculado sem
              exclusividade.
            </p>
            <p className="mt-2 leading-relaxed">
              A {siteConfig.name} não concede crédito, exercendo a sua atividade como mero intermediário
              de crédito vinculado nos termos dispostos na lei.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">Entidades Mutuantes Parceiras</h2>
            <p className="mt-2 leading-relaxed">
              A {siteConfig.name} mantém contratos de vinculação com as seguintes entidades mutuantes,
              atuando sob nome e responsabilidade dos mutuantes com quem mantém vínculo:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed">
              {siteConfig.partners.map((partner) => (
                <li key={partner.name}>{partner.name}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">Serviços Autorizados</h2>
            <p className="mt-2 leading-relaxed">A {siteConfig.name} está autorizada a prestar os seguintes serviços:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed">
              <li>Apresentação ou proposta de contratos de crédito a consumidores;</li>
              <li>
                Assistência a consumidores, mediante a realização de atos preparatórios ou de outros
                trabalhos de gestão pré-contratual relativamente a contratos de crédito que não tenham
                sido por si apresentados ou propostos;
              </li>
              <li>Celebração de contratos de crédito com consumidores em nome dos mutuantes;</li>
              <li>Serviços de consultoria.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">Responsabilidade Civil</h2>
            <p className="mt-2 leading-relaxed">
              A entidade que garante a responsabilidade civil pela atividade de intermediação de crédito
              hipotecário e crédito aos consumidores é a Zurich Insurance Europe AG - Sucursal em Portugal
              com a apólice nº 010033277 e 010032971 válidas de 16/06/2026 até 16/06/2027 e de 12/06/2026
              até 12/06/2027.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">Custo dos Serviços</h2>
            <p className="mt-2 leading-relaxed">
              Os serviços prestados, nos termos da legislação aplicável, são gratuitos para o consumidor.
            </p>
            <p className="mt-2 leading-relaxed">
              Está vedada à {siteConfig.name} a receção e entrega de quaisquer valores relacionados com a
              formação, a execução e o cumprimento antecipado dos contratos de crédito, nos termos do
              artigo 46º do regime jurídico dos intermediários de crédito, aprovado pelo Decreto-Lei n.º
              81-C/2017, de 7 de julho.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">Supervisão</h2>
            <p className="mt-2 leading-relaxed">
              A atividade de intermediação de crédito desenvolvida pela {siteConfig.name} está sujeita à
              supervisão do Banco de Portugal e à legislação aplicável, nomeadamente ao regime jurídico que
              define os requisitos de acesso e de exercício da atividade de intermediário de crédito e da
              prestação de serviços de consultoria relativamente a contratos de crédito estabelecido no
              Decreto-Lei n.º 81-C/2017, de 7 de julho.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">Comissões e Incentivos</h2>
            <p className="mt-2 leading-relaxed">
              A informação sobre os montantes recebidos pela {siteConfig.name} pela prestação dos serviços
              de intermediação de Crédito Habitação a título de comissões e outros incentivos será
              prestada na ficha de informação normalizada europeia (FINE) prevista na legislação aplicável
              àquele tipo de contratos de crédito.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">Reclamações</h2>
            <p className="mt-2 leading-relaxed">
              A apresentação de qualquer reclamação no âmbito da atividade de intermediação de crédito
              poderá ser endereçada:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed">
              <li>
                À {siteConfig.name}, através do preenchimento do livro de reclamações em formato físico
                disponível na sede ou em formato eletrónico disponível em{" "}
                <a
                  href="https://www.livroreclamacoes.pt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-gold-600 hover:underline"
                >
                  www.livroreclamacoes.pt
                </a>
                ;
              </li>
              <li>
                Diretamente ao Banco de Portugal, através de correio eletrónico, de carta ou formulário
                disponível no Portal do Cliente Bancário, em{" "}
                <a
                  href="https://www.clientebancario.bportugal.pt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-gold-600 hover:underline"
                >
                  www.clientebancario.bportugal.pt
                </a>
                .
              </li>
            </ul>
            <p className="mt-2 leading-relaxed">
              Qualquer que seja o canal que utilize para apresentar a sua reclamação, deve inserir os seus
              dados, identificar a entidade em causa e descrever, de forma clara e exata, os factos que
              justificam a reclamação.
            </p>
            <p className="mt-2 leading-relaxed">A apresentação de reclamações não tem custos.</p>
            <p className="mt-2 leading-relaxed">
              O Banco de Portugal analisa todas as reclamações que lhe sejam remetidas, independentemente
              de as mesmas terem sido apresentadas no livro de reclamações da instituição visada, no livro
              de reclamações eletrónico, ou enviadas diretamente ao Banco de Portugal através do Portal do
              Cliente Bancário.
            </p>
            <p className="mt-2 leading-relaxed">
              Deve dirigir a sua queixa/reclamação diretamente à entidade mutuante responsável pelo produto
              ou serviço no caso de esta estar relacionada com a aquisição de algum serviço intermediado.
            </p>
            <p className="mt-2 leading-relaxed">
              A {siteConfig.name} não pode responder a reclamações relativas a produtos ou serviços das
              entidades mutuantes nem é responsável por quaisquer queixas/reclamações dessa natureza.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">Resolução Alternativa de Litígios</h2>
            <p className="mt-2 leading-relaxed">
              Os contratos de prestação de serviços celebrados através dos Websites são regulados pela Lei
              Portuguesa. Qualquer litígio resultante ou relacionado com esses contratos está sujeito à
              jurisdição exclusiva dos tribunais Portugueses.
            </p>
            <p className="mt-2 leading-relaxed">
              A {siteConfig.name} aderiu aos seguintes meios de resolução alternativa de litígios:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed">
              <li>Centro Nacional de Informação e Arbitragem de Conflitos de Consumo - CNIACC</li>
              <li>Centro de Arbitragem de Conflitos de Consumo de Lisboa – CACCL</li>
            </ul>
            <p className="mt-2 leading-relaxed">
              Se os serviços forem concluídos através dos Websites, informa-se, de acordo com o
              Regulamento n.º 524/2013 do Parlamento Europeu e do Conselho de 21 de maio de 2013, que tem a
              faculdade de resolver qualquer litígio de forma extrajudicial através do acesso à plataforma
              eletrónica de resolução de conflitos em linha:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gold-600 hover:underline"
              >
                ec.europa.eu/consumers/odr/
              </a>
              .
            </p>
            <p className="mt-2 leading-relaxed">
              Pode consultar a lista atualizada das Entidades de Resolução Alternativa de Litígios
              disponíveis ao abrigo do artigo 17.º da Lei n.º 144/2015, de 8 de setembro, no Portal do
              Consumidor:{" "}
              <a
                href="https://www.consumidor.gov.pt"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gold-600 hover:underline"
              >
                www.consumidor.gov.pt
              </a>
              .
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
